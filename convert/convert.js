
import fs from 'fs';
import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';


async function convert(){
	let filename = "contacts.txt"
	fs.readFile(filename,  'utf8', (error,content) => {
		if(error){ throw error; }
				
		let contentData = JSON.parse(content);
		console.log(contentData)
	
	let schema = buildSchema(`
		type Query{
			contact: [Contact]
		},
		 type Contact {
      		name: String,
      		picture: String,
      	  carrier: String
    }`);
	
    let rootData = {contact: () => {
    	return contentData
    } }
  
	let app = express();
	app.use('/graphql', express_graphql({
		schema: schema,
		rootValue: rootData,
		graphiql: true,
		
	}));
	app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));

  	});
}

export default convert;