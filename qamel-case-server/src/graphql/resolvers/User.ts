import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { User as UserEntity } from "../entities/User";
import { client } from "../../utils/PrismaClient";
import { client as redis} from "../../utils/RedisClient";
import { v4 as uuid } from "uuid";
import { sg } from "../../utils/SendGridClient";
import argon2 from "argon2";


@ObjectType()
class UserType {
	@Field()
	username: string

	@Field()
	email: string
}

@ObjectType()
class ErrorType {
	@Field(() => String, { nullable: true })
	title: string
	@Field(() => String, { nullable: true })
	message: string
}


@ObjectType()
class res {
	@Field(() => UserType, { nullable: true })
	user?: UserType
	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType
	@Field((() => String), { nullable: true })
	id?: String
}

@Resolver()
export class User {
	
	@Query(() => [UserEntity])
	async getAllUsers() {
		const users = await client.user.findMany();
		return users;
	}
	

	@Query(() => res)
	async checkToken(
		@Arg('token') token: string
	) {
		const uid = Number(await redis.get(token));
		if (uid) {
			const user = await client.user.findUnique({
				where: {
					id: uid
				}
			}); 
			if (user)  {
			    return {
					user:  {
						username: user.username,
						email: user.email,
					}
				};

		    }
			redis.del(token);
			return {
				user: null,
				error: {
						title: 'Session error', 
						message: 'Unable to login automatically, please login again'
				}
			};
		}	
		else {
			return {
				 error: { 
					title: 'Invalid token',
					message: 'No token found or expired token detected!' 
				} 
			};
		}
	}






	
	@Query(() => res)
	async login(
		@Arg('username') username: string,
		@Arg('password') password: string
	) {
		
		const resultuser = await client.user.findUnique({
			where: {
				username
			},
		})
		const resultmail = !resultuser ? await client.user.findUnique({
			where: {
				email: username
			},
		}) : null;
		const result = [resultuser, resultmail].find(value => value);

		if (result) {
			if (await argon2.verify(result.password, password)) {
				const { username, email } = result;
				const gen = uuid();
				await redis.set(gen, result.id);
				return {
					user: {
						username,
						email,
					},
					id: gen
					
				};
			} 
			else {
				return {
					error: {
						title: 'Wrong Password',
						message: 'Incorrect password!' 
					} 
				};
			}
		} 
		else {
			return {
				error: {
					 title: 'No users found',
					 message: 'No users found with passed email or username!' 
					} 
				};
		}
	}






	@Mutation(() => res)
	async register(
		@Arg('username') username: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		const hPass = await argon2.hash(password);
		try {
			const { id } = await client.user.create({
				data: {
					username,
					email,
					password: hPass,
				}
			});
			const gen = uuid();
			redis.set(gen, id, 'EX', 60 * 60 * 24 * 7);
			const mail = {
				to: email,
				from: process.env.SENDGRID_EMAIL,
				subject: 'Bem vindo ao qamel case!',
				text: 'Você conseguiu se cadastrar no qamel case!',
				html: `<strong>Bem vindo ao qamel case <s>${username}</s>. Espero que aproveite ao máximo o website!!!</strong>`,
			  }
			try {
				const result = await sg.send(mail);
				console.log(result);
			}
			catch (error) {
				console.log(error);
			}
			return {
				id: gen,
				error : {
					message: null
				}
			}
			
		} catch (error) {
			console.log(error);
			return {
				error : {
					title: 'Register error',
					message: '500 - Internal error when creating user, contact the administrator'
				}
			};
		}

	}




	@Query(() => Boolean)
	async checkUser(
		@Arg('id') id: string
	) {
		const resultuser = await client.user.findUnique({
			where: {
				username: id
			},
		})
		const resultmail = !resultuser ? await client.user.findUnique({
			where: {
				email: id
			},
		}) : null;

		const result = [resultuser, resultmail].find(value => value);
		if (result) {
			return false;
		} else {
			return true;
		}

	}


	@Mutation(() => String)
	async logout(
		@Arg('token') token: string
	) {
		await redis.del(token);
		return 'OK'
	}

}



