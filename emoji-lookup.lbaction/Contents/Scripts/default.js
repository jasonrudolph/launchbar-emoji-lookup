/* global Action, File, include, LaunchBar */
/* global EmojiCharacter, EmojiDatabase, getDictionary */

include('emoji-character.js')
include('emoji-database.js')
include('emoji-dictionary.js')

// Determine the list of emojis that match the given search term. If the given
// search term is empty, return all available emojis. If the given search term
// is non-empty, return all emojis where the emoji name or one of its keywords
// starts with the search term.
//
// argument - A String search term.
//
// Returns an Array of Objects.
function runWithString (argument) {
  const dictionary = getEmojiDictionary()
  const database = new EmojiDatabase({dictionary})

  let emojiNames
  if (argument.length > 0) {
    emojiNames = database.getMatches(argument)
  } else {
    emojiNames = Object.keys(dictionary)
  }

  return emojiNames.sort().map(function (name) {
    const character = new EmojiCharacter({name, metadata: dictionary[name]})
    return character.toLaunchbarItem()
  })
}

function paste (character) {
  LaunchBar.paste(character)
}

function getEmojiDictionary () {
  const path = Action.path + '/Contents/vendor/emojilib/emoji-en-US.json'
  const nameAndKeywordsByChar = File.readJSON(path)
  return getDictionary(nameAndKeywordsByChar)
}
