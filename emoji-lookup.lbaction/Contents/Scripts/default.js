/* global Action, File, include, LaunchBar */
/* global EmojiDatabase, EmojiCharacter */

include('emoji-character.js')
include('emoji-database.js')

// Determine the list of emojis that match the given search term. If the given
// search term is empty, return all available emojis. If the given search term
// is non-empty, return all emojis where the emoji name or one of its keywords
// starts with the search term.
//
// argument - A String search term.
//
// Returns an Array of Objects.
function runWithString (argument) {
  var dictionary = getEmojiDictionary()
  var database = new EmojiDatabase({dictionary})

  var emojiNames = []
  if (argument.length > 0) {
    emojiNames = database.getMatches(argument)
  } else {
    emojiNames = Object.keys(dictionary)
  }

  return emojiNames.sort().map(function (name) {
    var character = new EmojiCharacter(name, dictionary[name])
    return character.toLaunchbarItem()
  })
}

function paste (character) {
  LaunchBar.paste(character)
}

// Returns an Object describing all the supported emojis. Each key is a String
//   representing the name of an emoji. Each value is an Object containing the
//   metadata for that emoji (e.g., the emoji character, the emoji's keywords).
function getEmojiDictionary () {
  const path = Action.path + '/Contents/vendor/emojilib/emojis.json'
  return File.readJSON(path)
}
