import "reflect-metadata";
import App from "express";
import { buildSchema } from "type-graphql";
import { User } from "./graphql/resolvers/User";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv-safe";


async function init () {

	config();
	const schema = await buildSchema({
    	resolvers: [
    		User
    	],
    	emitSchemaFile: true,
    	validate: false,
  	});
  	const apollo = new ApolloServer({schema})
  	await apollo.start();
	const app = App();
	app.listen(process.env.SERVER_PORT, function (){
		console.log(`Server started on port ${process.env.SERVER_PORT}`);
	});
	apollo.applyMiddleware({app});

}





try  {
	init();
} catch(error) {
	console.log('Erro encontrado: ', error)
}
