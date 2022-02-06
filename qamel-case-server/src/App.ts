import App from "express";
import buildSchema from "type-graphql";
import { User } from "graphql/resolvers/User";
import { ApolloServer, gql } from "apollo-server-express";

import { config } from "dotenv-safe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function init () {

	config();
	const users = await prisma.user.findMany();
	console.log(users);
	const schema = await buildSchema({
    	resolvers: [
    		User
    	],
  	});

	const apollo = new ApolloServer({
		schema
	});

	const app = App();
	await apollo.start();	
	apollo.applyMiddleware({app});
	app.listen(process.env.SERVER_PORT, function (){
		console.log(`Server started on port ${process.env.SERVER_PORT}`);
	});

}





try  {
	init();
} catch(error) {
	console.log('Erro encontrado: ', error)
}
