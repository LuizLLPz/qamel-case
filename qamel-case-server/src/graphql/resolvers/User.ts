import { Resolver, Query, Mutation, Arg, ObjectType, Field} from "type-graphql";
import {User as UserEntity} from "../entities/User";
import { client } from "../../utils/PrismaClient";
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
	@Field()
	title: string
	@Field()
	message: string
}


@ObjectType()
class res {
@Field(() => UserType, {nullable: true})
    user?: UserType
    @Field(() => ErrorType, {nullable: true})
    error? : ErrorType
}

@Resolver()
export class User {


	@Query(() => UserEntity)  
	usuarioTeste () {
	
		return {username : 'John Doe', email : 'johndoe@example.com'};

	}

	@Query(() => [UserEntity])
	async getAllUsers() {
		const users = await client.user.findMany();
		return users;
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
		const resultmain = resultuser ? await client.user.findUnique({
  			where: {
    			email: username
  			},
		}): null;

		const result = [resultuser, resultmain].find(value => value);
		
		if (result) {
			if (await argon2.verify(result.password, password)) {
				const {username, email} = result
				return {user : {
					username,
					email
				}} 
			} else {
				return {error: {title: 'Wrong Password', message: 'Incorrect password!'}};
			}
		} else {
			return {error: {title: 'No users found', message: 'No users found with passed email or username!'}};
		}
	} 


	@Mutation(() => String)
	async register(
		@Arg('username') username: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		const hPass = await argon2.hash(password);
		await client.user.create({
			data: {
				username,
				email,
				password: hPass,
			}
		});
		return 'OK'
	}

}



