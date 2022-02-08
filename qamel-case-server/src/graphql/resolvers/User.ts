import { Resolver, Query } from "type-graphql";
import {User as UserEntity} from "../entities/User";
import { client } from "../../utils/PrismaClient";

@Resolver()
export class User {

	@Query(() => UserEntity)  
	usuarioTeste () {
	
		return {name : 'John Doe', email : 'johndoe@example.com'};

	}

	@Query(() => [UserEntity])
	async getAllUsers() {
		const users = await client.user.findMany();
		return users;
	}

}



