const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const out = path.resolve(__dirname, '../../assets');
const page = 'file://' + path.resolve(__dirname, 'cards.html');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'daily.json'), 'utf8'));
const launch = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] } : {};
const jobs = [[3, ['hero']], [2, ['card-my151', 'card-snippets', 'card-alphabet', 'card-vocab']]];

(async () => {
  const browser = await chromium.launch(launch);
  for (const theme of ['light', 'dark']) {
    for (const [scale, ids] of jobs) {
      const context = await browser.newContext({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: scale });
      const tab = await context.newPage();
      await tab.goto(`${page}?theme=${theme}`, { waitUntil: 'networkidle' });
      await tab.evaluate(d => window.drawWave(d), data);
      await tab.evaluate(() => document.fonts.ready);
      for (const id of ids) {
        await tab.locator('#' + id).screenshot({ path: path.join(out, `${id}-${theme}.png`), omitBackground: true });
      }
      await context.close();
    }
  }
  await browser.close();
  console.log('wrote', fs.readdirSync(out).length, 'files to', out);
})();
