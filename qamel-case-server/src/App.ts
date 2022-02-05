import App from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { config } from "dotenv-safe";

async function init () {
	config();
	const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  	# This "Book" type defines the queryable fields for every book in our data source.
  	type Pergunta {
    	titulo: String
    	respostas: [String]
  	}

  	type Query {
    	perguntas: [Pergunta]
  	}
	
	
	`;

	const Pergunta = [
		{
		  titulo: 'Qual o nome do seu melhor amigo de infância?',
		  respostas: [],
		},
		{
		  titulo: 'Qual sua cor favorita?',
		  respostas: [],
		},
	  ];
	const resolvers = {
		Query: {
		  perguntas: () => Pergunta,
		},
	  };

	const apollo = new ApolloServer({typeDefs, resolvers});
	const app = App();
	await apollo.start();	
	apollo.applyMiddleware({app});
	app.listen(4000, function (){
		console.log('Servidor iniciado na porta 4000');
	});

}





try  {
	init();
} catch(error) {
	console.log('Erro encontrado: ', error)
}
