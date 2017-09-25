const assert = require('assert')
const fs = require('fs')
const path = require('path')
const {EmojiDatabase} = require('../emoji-lookup.lbaction/Contents/Scripts/emoji-database.js')
const dictionaryPath = path.join(__dirname, '../emoji-lookup.lbaction/Contents/vendor/emojilib/emojis.json')

describe('EmojiDatabase', () => {
  describe('#getMatches', () => {
    let database

    beforeEach(() => {
      const dictionary = JSON.parse(fs.readFileSync(dictionaryPath))
      database = new EmojiDatabase({dictionary})
    })

    it('finds emojis by name', () => {
      let matches = database.getMatches('gri')
      assert.equal(matches.filter((name) => name == 'grimacing').length, 1)

      matches = database.getMatches('grimacing')
      assert.equal(matches.filter((name) => name == 'grimacing').length, 1)
    })

    it('finds emojis by keyword', () => {
      let matches = database.getMatches('face')
      assert.equal(matches.filter((name) => name == 'grimacing').length, 1)

      matches = database.getMatches('teeth')
      assert.equal(matches.filter((name) => name == 'grimacing').length, 1)
    })
  })
})
