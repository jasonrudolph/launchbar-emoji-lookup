const assert = require("assert")
const fs = require("fs")
const path = require("path")
const {
  getDictionary,
} = require("../emoji-lookup.lbaction/Contents/Scripts/emoji-dictionary.js")
const emojilibDataPath = path.join(
  __dirname,
  "../emoji-lookup.lbaction/Contents/vendor/emojilib/emoji-en-US.json",
)

describe("getDictionary", () => {
  const nameAndKeywordsByChar = JSON.parse(fs.readFileSync(emojilibDataPath))

  it("handles single-word emoji names", () => {
    // Verify that emojilib has the test character registered under the expected name
    assert.equal(nameAndKeywordsByChar["🥷"][0], "ninja")

    const dictionary = getDictionary(nameAndKeywordsByChar)

    const object = dictionary["ninja"]
    assert.ok(object)
    assert.equal(object.char, "🥷")

    const keywords = object.keywords
    assert.ok(keywords.includes("ninjutsu"))
    assert.ok(keywords.includes("skills"))
  })

  it("handles multi-word emoji names when the words are separated with underscores", () => {
    // Verify that emojilib has the test character registered under the expected name
    assert.equal(nameAndKeywordsByChar["🙃"][0], "upside_down_face")

    const dictionary = getDictionary(nameAndKeywordsByChar)

    const object = dictionary["upside_down_face"]
    assert.ok(object)
    assert.equal(object.char, "🙃")

    const keywords = object.keywords
    assert.ok(keywords.includes("silly"))
    assert.ok(keywords.includes("flipped"))
  })

  it("handles multi-word emoji names when the words are separated with spaces", () => {
    // Verify that emojilib has the test character registered under the expected name
    assert.equal(nameAndKeywordsByChar["🫠"][0], "melting face")

    const dictionary = getDictionary(nameAndKeywordsByChar)

    const object = dictionary["melting_face"]
    assert.ok(object)
    assert.equal(object.char, "🫠")

    const keywords = object.keywords
    assert.ok(keywords.includes("hot"))
    assert.ok(keywords.includes("heat"))
  })
})
