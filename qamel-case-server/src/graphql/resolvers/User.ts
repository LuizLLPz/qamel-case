import { Resolver, Query } from "type-graphql";
import {User as UserEntity} from "../entities/User";

@Resolver()
export class User {

	@Query(() => UserEntity)  
	usuarioTeste () {
	
		return {name : 'John Doe', email : 'johndoe@example.com'};

	}



}



