import "reflect-metadata";
import App from "express";
import { buildSchema } from "type-graphql";
import { User } from "./graphql/resolvers/User";
import { Post } from "./graphql/resolvers/Post";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { config } from "dotenv-safe";


async function init () {

	config();
	const schema = await buildSchema({
    	resolvers: [
    		User,
			Post
    	],
    	emitSchemaFile: true,
    	validate: false,
  	});
  	const apollo = new ApolloServer({
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground({
					settings: {
							'request.credentials': 'include',
					},
			})],
		  schema, 

	});
  	await apollo.start();
	const app = App();
	app.listen(process.env.SERVER_PORT, function (){
		console.log(`Server started on port ${process.env.SERVER_PORT}`);
	});
	apollo.applyMiddleware({app, cors: {origin: 'http://localhost:3000'}});

}





try  {
	init();
} catch(error) {
	console.log('Erro encontrado: ', error)
}
