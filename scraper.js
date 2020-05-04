const puppeteer = require('puppeteer');

async function scrapeSite(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.Box-row');

  const repositories = await page.$$('.Box-row');

  let noRepo = [];

  for (const repository of repositories) {
    const title = await repository.$eval('h1', h1 => h1.innerText);

    let description;

    if (await repository.$('p', p => p.innerText)) {
      description = await repository.$eval('p', p => p.innerText);
    } else {
      description = "No description available";
    }
    // const description = await repository.$eval('p', p => p.innerText);

    let language;

    if (await repository.$('span[itemprop="programmingLanguage"]')) {
      language = "Written primarily in " + await repository.$eval('span[itemprop="programmingLanguage"]', span => span.innerText);
    } else {
      language = "NA";
      noRepo.push(title);
    }

    const userNames = await repository.$$eval('a[class="d-inline-block"]', hrefs => hrefs.map((a) => {
      return a.href.replace('https://github.com/', ' ');
    }));

    console.log(`\n${title}\n===========================\n${description}\n\n${language}\n\nPrimary Contributors:${userNames}\n---------------------------`);
  };

  const javaScript = await page.$eval('span[itemprop="programmingLanguage"]', span => span.innerText);

  console.log(`\nThere are ${javaScript.length} Javascript repositories.\n`);


  if (noRepo.length === 1) {
    console.log(`The follow repositories do not specify a programming language:${noRepo + '.'}`)
  } else {
    const last = noRepo.pop();
    console.log(`The following repositories do not specify a programming language:${noRepo.join(", ") + ', and' + last + '.'}`);
  }

  // console.log('These repositories do not specify a programming language:')
  // noRepo.forEach(function(repo) {
  //   console.log(repo)
  // })
  // console.log(repositories.length);

  await browser.close();
}

scrapeSite('https://github.com/trending?since=weekly');

module.exports = {
  scrapeSite
};

