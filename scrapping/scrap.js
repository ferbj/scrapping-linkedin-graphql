import puppeteer from 'puppeteer';
import fs from 'fs';

require("dotenv").config();

  async function scrap(){
        const browser =  await puppeteer.launch({ headless: false });
        const page =  await browser.newPage();
        await page.goto('https://www.linkedin.com/login')

        const username = '#username';
        const password = '#password';
        const button = '.btn__primary--large';
        await page.waitForSelector(username);
        await page.type(username, process.env.ID);
        await page.waitForSelector(password);
        await page.type(password, process.env.PASS);
        await page.waitForSelector(button);
        await page.click(button);

        await page.goto('https://www.linkedin.com/mynetwork/invite-connect/connections/', { waitUntil: 'networkidle2' });
        let data =  await page.evaluate(() =>
            [...document.querySelectorAll('.mn-connection-card')].map(e => {
                let name = e.querySelector('span[class="mn-connection-card__name t-16 t-black t-bold"]').innerText
                let picture = e.querySelector('div[class="presence-entity presence-entity--size-5 ember-view"] > img').src
                let carrier = e.querySelector('span[class="mn-connection-card__occupation t-14 t-black--light t-normal"]').innerText
            return {
                name,
                picture,
                carrier,
            }

        })
    );

    console.log(data);
    let convert = JSON.stringify(data, null, 2);

    fs.writeFile('contacts.txt', convert, function (err) {
        if (err) throw err;
        console.log('Guardado');

    });
   
}

export default scrap;