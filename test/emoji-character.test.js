const assert = require('assert')
const fs = require('fs')
const path = require('path')
const {EmojiCharacter} = require('../emoji-lookup.lbaction/Contents/Scripts/emoji-character.js')
const {getDictionary} = require('../emoji-lookup.lbaction/Contents/Scripts/emoji-dictionary.js')
const emojilibDataPath = path.join(__dirname, '../emoji-lookup.lbaction/Contents/vendor/emojilib/emoji-en-US.json')

describe('EmojiCharacter', () => {
  let dictionary

  beforeEach(() => {
    const nameAndKeywordsByChar = JSON.parse(fs.readFileSync(emojilibDataPath))
    dictionary = getDictionary(nameAndKeywordsByChar)
  })

  describe('#humanizedName', () => {
    it('returns name in title-case(ish)', () => {
      let character = new EmojiCharacter({
        name: 'grinning_face_with_sweat',
        metadata: dictionary['grinning_face_with_sweat'],
        resourcesPath: '/path/to/resources/'
      })
      assert.equal(character.humanizedName, 'Grinning Face With Sweat')

      character = new EmojiCharacter({
        name: 'keycap_',
        metadata: dictionary['keycap_'],
        resourcesPath: '/path/to/resources/'
      })
      assert.equal(character.humanizedName, 'Keycap')
    })
  })

  describe('#launchbarIcon', () => {
    it('returns path for single-codepoint emoji', () => {
      const character = new EmojiCharacter({
        name: 'collision',
        metadata: dictionary['collision'],
        resourcesPath: '/path/to/resources/'
      })
      assert.equal(character.launchbarIcon(), '/path/to/resources/unicode/1f4a5.png')
    })

    it('returns path for multi-codepoint emoji ', () => {
      const character = new EmojiCharacter({
        name: 'woman_detective',
        metadata: dictionary['woman_detective'],
        resourcesPath: '/path/to/resources/'
      })
      assert.equal(character.launchbarIcon(), '/path/to/resources/unicode/1f575-2640.png')
    })

    it('returns path to image file on disk for every emoji in the dictionary', () => {
      const characters = Object.keys(dictionary).map((name) => {
        return new EmojiCharacter({
          name: name,
          metadata: dictionary[name],
          resourcesPath: 'emoji-lookup.lbaction/Contents/Resources/'
        })
      })
      const charactersWithMissingImages = characters.filter((character) => {
        return !fs.existsSync(character.launchbarIcon())
      })

      const nameAndPaths = charactersWithMissingImages.map((character) => `${character.name} (${character.launchbarIcon()})`)
      assert.strictEqual(0, nameAndPaths.length, `Missing image file for ${nameAndPaths.join(', ')}`
      )
    })
  })
})
