const assert = require("assert")
const fs = require("fs")
const path = require("path")
const {
  EmojiCharacter,
} = require("../emoji-lookup.lbaction/Contents/Scripts/emoji-character.js")
const {
  getDictionary,
} = require("../emoji-lookup.lbaction/Contents/Scripts/emoji-dictionary.js")
const emojilibDataPath = path.join(
  __dirname,
  "../emoji-lookup.lbaction/Contents/vendor/emojilib/emoji-en-US.json"
)

describe("EmojiCharacter", () => {
  let dictionary

  beforeEach(() => {
    const nameAndKeywordsByChar = JSON.parse(fs.readFileSync(emojilibDataPath))
    dictionary = getDictionary(nameAndKeywordsByChar)
  })

  describe("#humanizedName", () => {
    it("returns name in title-case(ish)", () => {
      let character = new EmojiCharacter({
        name: "grinning_face_with_sweat",
        metadata: dictionary["grinning_face_with_sweat"],
        resourcesPath: "/path/to/resources/",
      })
      assert.equal(character.humanizedName, "Grinning Face With Sweat")

      character = new EmojiCharacter({
        name: "keycap_",
        metadata: dictionary["keycap_"],
        resourcesPath: "/path/to/resources/",
      })
      assert.equal(character.humanizedName, "Keycap")
    })
  })

  describe("#launchbarItemIcon", () => {
    it("returns icon for single-codepoint emoji", () => {
      const character = new EmojiCharacter({
        name: "collision",
        metadata: dictionary["collision"],
        resourcesPath: "/path/to/resources/",
      })
      assert.equal(character.launchbarItemIcon(), "💥")
    })

    it("returns icon for multi-codepoint emoji ", () => {
      const character = new EmojiCharacter({
        name: "woman_detective",
        metadata: dictionary["woman_detective"],
        resourcesPath: "/path/to/resources/",
      })
      assert.equal(character.launchbarItemIcon(), "🕵️‍♀️")
    })
  })
})
