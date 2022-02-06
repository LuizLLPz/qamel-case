import { Resolver, Query } from "type-graphql";
import {User as UserEntity} from "../entities/User";

@Resolver()
export class User {

	@Query(() => UserEntity)  
	usuarioTeste () {
	
		return {name : 15, email : 'johndoe@example.com'};

	}



}



