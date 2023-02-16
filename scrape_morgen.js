const cheerio = require('cheerio');
const request = require('request');

/* @scousie ➜ /workspaces/scousie.github.io (main) $ npm install request
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
*/

// URL of the website you want to scrape
const url = 'https://www.demorgen.be/snelnieuws/frustratie-over-minder-lesuren-aardrijkskunde-en-geschiedenis-dit-is-een-catastrofe~b6d7699e/';

// Make a request to the website
request(url, (error, response, html) => {
  // Check for errors and status code
  if (!error && response.statusCode == 200) {
    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Select all the paragraphs with the 'artstyle__paragraph' class
    const paragraphs = $('p.artstyle__paragraph');

    // Loop through the paragraphs and log the text content of each one
    paragraphs.each((i, el) => {
      console.log($(el).text());
    });
  }
});

/* @scousie ➜ /workspaces/scousie.github.io (main) $ npm install request
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
*/