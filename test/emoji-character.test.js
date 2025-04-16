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
  "../emoji-lookup.lbaction/Contents/vendor/emojilib/emoji-en-US.json",
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
    it("returns path for single-codepoint emoji", () => {
      const character = new EmojiCharacter({
        name: "collision",
        metadata: dictionary["collision"],
        resourcesPath: "/path/to/resources/",
      })
      assert.equal(
        character.launchbarItemIcon(),
        "/path/to/resources/unicode/1f4a5.png"
      )
    })

    it("returns path for multi-codepoint emoji ", () => {
      const character = new EmojiCharacter({
        name: "woman_detective",
        metadata: dictionary["woman_detective"],
        resourcesPath: "/path/to/resources/",
      })
      assert.equal(
        character.launchbarItemIcon(),
        "/path/to/resources/unicode/1f575-2640.png"
      )
    })

    it("returns path to image file on disk for every emoji in the dictionary", () => {
      const characters = Object.keys(dictionary).map((name) => {
        return new EmojiCharacter({
          name: name,
          metadata: dictionary[name],
          resourcesPath: "emoji-lookup.lbaction/Contents/Resources/",
        })
      })

      const charactersWithMissingImages = characters.filter((character) => {
        return !fs.existsSync(character.launchbarItemIcon())
      })

      // TODO: Figure out why these image files are missing, add the missing files, and remove this list 🕵️
      const knownCharacterNamesWithMissingImages = [
        "couple_with_heart_woman_man",
        "face exhaling",
        "face in clouds",
        "face with spiral eyes",
        "family_man_woman_boy",
        "female_sign",
        "flag_ascension_island",
        "flag_bouvet_island",
        "flag_ceuta_melilla",
        "flag_clipperton_island",
        "flag_diego_garcia",
        "flag_heard_mcdonald_islands",
        "flag_st_martin",
        "flag_svalbard_jan_mayen",
        "flag_tristan_da_cunha",
        "flag_u_s_outlying_islands",
        "heart on fire",
        "kiss_woman_man",
        "male_sign",
        "man beard",
        "man in tuxedo",
        "man with veil",
        "medical_symbol",
        "mending heart",
        "transgender flag",
        "woman beard",
        "woman in tuxedo",
        "woman with veil",
      ]

      const nameAndPaths = charactersWithMissingImages.map(
        (character) => `${character.name} (${character.launchbarItemIcon()})`
      )
      assert.strictEqual(
        knownCharacterNamesWithMissingImages.length,
        nameAndPaths.length,
        `Missing image file for ${nameAndPaths.join(", ")}`,
      )
    })
  })
})
