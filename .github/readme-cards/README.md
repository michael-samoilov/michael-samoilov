# Profile banner and cards

These files build the images in `assets/` that the profile README shows: the banner with the daily commit chart, and the four project cards, each in a light and a dark version.

## Rebuild the images

1. Clone `my151-public`, `snippets-public`, and `Alphabet-draft`.
2. In this folder, count the commits per day:

   ```bash
   python3 daily.py ../../../my151-public ../../../snippets-public ../../../Alphabet-draft
   ```

3. Render the images into `assets/`. This step needs Node.js and Playwright with Chromium:

   ```bash
   node render.cjs
   ```

4. Commit the changed files in `assets/` and `daily.json`.

To change a card's words, edit `cards.html`. The screenshots load from the public repositories, so a new screenshot there appears in the next rebuild.

The banner caption names the months that the chart covers. Update it in `cards.html` when the range changes.
