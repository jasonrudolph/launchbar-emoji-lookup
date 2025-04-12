const assert = require("assert");
const fs = require("fs");
const path = require("path");
const {
  EmojiDatabase,
} = require("../emoji-lookup.lbaction/Contents/Scripts/emoji-database.js");
const {
  getDictionary,
} = require("../emoji-lookup.lbaction/Contents/Scripts/emoji-dictionary.js");
const emojilibDataPath = path.join(
  __dirname,
  "../emoji-lookup.lbaction/Contents/vendor/emojilib/emoji-en-US.json"
);

describe("EmojiDatabase", () => {
  describe("#getMatches", () => {
    let database;

    beforeEach(() => {
      const nameAndKeywordsByChar = JSON.parse(
        fs.readFileSync(emojilibDataPath)
      );
      const dictionary = getDictionary(nameAndKeywordsByChar);
      database = new EmojiDatabase({ dictionary });
    });

    it("finds emojis by name", () => {
      let matches = database.getMatches("tho");
      assert.equal(
        matches.filter((name) => name == "thought_balloon").length,
        1
      );

      matches = database.getMatches("balloo");
      assert.equal(
        matches.filter((name) => name == "thought_balloon").length,
        1
      );
    });

    it("finds emojis by keyword", () => {
      let matches = database.getMatches("bubble");
      assert.equal(
        matches.filter((name) => name == "thought_balloon").length,
        1
      );

      matches = database.getMatches("think");
      assert.equal(
        matches.filter((name) => name == "thought_balloon").length,
        1
      );
    });

    it("finds emojis by multi-word search term", () => {
      let matches = database.getMatches("finger up");
      assert(matches.find((name) => name == "index_pointing_up"));
      assert(matches.find((name) => name == "backhand_index_pointing_up"));
      assert(!matches.find((name) => name == "backhand_index_pointing_down"));
    });
  });
});
