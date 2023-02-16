const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeMorgen(linkske) {
  const response = await fetch(linkske);
  const body = await response.text();
  const $ = cheerio.load(body);
  const paragraphs = $('p.artstyle__paragraph');

  const output = [];

  // Add each paragraph to the output array
  paragraphs.each((i, el) => {
      output.push($(el).text());
  });

  // Write the output array to a text file
  fs.writeFileSync('output.txt', output.join('\n'));
}

scrapeMorgen('https://www.demorgen.be/snelnieuws/frustratie-over-minder-lesuren-aardrijkskunde-en-geschiedenis-dit-is-een-catastrofe~b6d7699e');