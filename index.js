//Web page scraping and handling data demonstration.
//Intro to Web Scraping with Puppeteer https://www.youtube.com/watch?v=S67gyqnYHmI&ab_channel=TraversyMedia

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.bfro.net/GDB/');

  // Wait for the table to load
  await page.waitForSelector('table.countytbl');

  // Scrape the data from the table
  const data = await page.evaluate(() => {
    const table = document.querySelector('table.countytbl');
    const rows = table.querySelectorAll('tr');
    const results = [];

    // Loop through each row of the table (excluding the header row)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.querySelectorAll('td');

      // Extract the data from each cell in the row
      const state = cells[0].querySelector('a').textContent;
      const numListings = cells[1].querySelector('span').textContent;
      const mostRecentReport = cells[2].querySelector('span').textContent;
      const lastPosted = cells[3].querySelector('span').textContent;

      // Store the data as an object
      results.push({
        state,
        numListings,
        mostRecentReport,
        lastPosted,
      });
    }

    return results;
  });

  console.log(data);

  await browser.close();
})();

//here be text