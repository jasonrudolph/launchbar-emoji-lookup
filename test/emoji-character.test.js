const assert = require('assert')
const fs = require('fs')
const path = require('path')
const {EmojiCharacter} = require('../emoji-lookup.lbaction/Contents/Scripts/emoji-character.js')
const dictionaryPath = path.join(__dirname, '../emoji-lookup.lbaction/Contents/vendor/emojilib/emojis.json')

describe('EmojiCharacter', () => {
  let dictionary

  beforeEach(() => {
    dictionary = JSON.parse(fs.readFileSync(dictionaryPath))
  })

  describe('#launchbarIcon', () => {
    it('returns path for single-codepoint emoji', () => {
      const character = new EmojiCharacter({
        name: 'boom',
        metadata: dictionary['boom'],
        resourcesPath: '/path/to/resources/'
      })
      assert.equal(character.launchbarIcon(), '/path/to/resources/unicode/1f4a5.png')
    })

    it('returns path for multi-codepoint emoji ', () => {
      const character = new EmojiCharacter({
        name: 'female_detective',
        metadata: dictionary['female_detective'],
        resourcesPath: '/path/to/resources/'
      })
      assert.equal(character.launchbarIcon(), '/path/to/resources/unicode/1f575-2640.png')
    })
  })
})
