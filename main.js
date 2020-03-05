import scrap from './scrapping/scrap'
import convert from './convert/convert'
async function init(){
	try {
		await scrap();
		await convert();
	} catch(e) {
		// statements
		console.log(e);
	}
	
}

init();
