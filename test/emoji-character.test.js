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
  })
})
