# puppeteer-scraper
puppeteer scraper that pulls github trending repositories 

PART 1

Create a directory

1. Need to install NPM
  npm init -y to create an empty package.json

2. Then install Puppeteer, a Node library which provides API to control headless Chrome/Chromium over the DevTools Protocol. Created by the Chrome developmental team at Google.

Anything, well most things, you can do manually in the browser can be recreated via Puppeteer.
  generate ss and pdfs
  automate form submission, UI testing, keyboard input
  create an automated testing environment
  and
  crawl pages and thus scraping

  and to do scraping, i used (below)

For my use of it, I employed asynchronous functions.

Synchronous means each operation must wait for the previous one to complete while asynchronous means an operation can occur while another operation is still being processed.

In JavaScript, all code is due to the single-threaded nature of it. However, asynchronous operations not part of the program are processed outside of the main thread because they are controlled by native code (like browser APIs), but callbacks part of the program will still be executed synchronously.
 Asynchronous functions are different from synchronous functions in that the functions are running simultaneously. Synchronous functions have to wait for functions up top to complete before moving onto other functions.

  npm install puppeteer

3. Create a JavaScript file.
  touch scrapers.js

4. Head into scrapers.js and add the Puppeteer dependency at the top of the file.
  const puppeteer = require('puppeteer');

5. Create an async function that takes a url as an argument.
  Will have a lot of await statements.

  browser is the puppeteer starting up. Having the argument set to { headless: false } will launch Chrome/Chromium and show us in real time what puppeteer is doing. Conversely, setting nothing will default as true.

  page is the open page. Then we use a goto function with a url you choose to start everything off.

  We use the waitForSelector function to wait for a particular thing on the page to show up. In this case, we are waiting for puppeteer to find the class .Box-row which is the overarching selector for  every single repository on the page.

  Now that we have verified that .Box-row does exist on the page.

  $ is document.querySelector
  $$ is document.querySelectorAll

  I set a variable 'repositories' to get all of the elements marked with .Box-row.

  Use a 'for...of' loop because 'forEach' loops aren't asynchronous. With it, we can crawl into each repository to begin to scrape individual data.
  I also thought of using let repository = repositories[i] which would also do the trick and i wouldnt have all the subsequent logic statements all in the same function.

  $eval is a querySelector that takes an a selector as an argument and then define that tag.

  Set it to a variable that we can call in our console.log statement.

  Getting repository titles and descriptions pretty straight forward because every repository on the page has them.

  Not every repository specified a programming language so I needed an if/else statement to handle it. I also used the else statement to push repositories that had no language into the empty noRepo array I had defined before the for...of loop to be called on later.

  For getting the usernames out of the icon links, I used $$eval which is the equivalent of querySelectorAll to get into the image element via its class name and retrieved its alt attribute with a little logic added onto it.

  console.log to output the way the coding challenge wanted.

  Some simple logic and console.log to answer the other two questions programatically.

  browser.close() to end the puppeteer function.

  Run the script with node scraper.js

PART 2
1. Create server folder and index.js file.

2. Install Express and body-parser for API. https://expressjs.com/en/starter/hello-world.html
Express will start a server and list on port 3000 for connections.
  npm install express
  npm install body-parser

3. Database - mySql or PostgresSQL
