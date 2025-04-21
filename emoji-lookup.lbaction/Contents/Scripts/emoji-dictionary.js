// Translates the data from muan/emojilib for use as a "dictionary" of emojis.
//
// Returns an Object describing all the supported emojis. Each key is a String
//   representing the snake_case name of the emoji. Each value is an Object
//   containing the metadata for that emoji (i.e., the emoji character and the
//   emoji's keywords). Example:
//
//   {
//     "grinning_face_with_sweat": {
//       "char": "😅",
//       "keywords": ["face", "hot", "happy", "laugh", "sweat", "smile", "relief"]
//     },
//     "man_dancing": {
//       "char": "🕺",
//       "keywords": ["male", "boy", "fun", "dancer"]
//     }
//   }
function getDictionary(nameAndKeywordsByChar) {
  const dictionary = {}
  for (const char in nameAndKeywordsByChar) {
    const name = nameAndKeywordsByChar[char][0].replace(/\s+/g, "_")
    const keywords = nameAndKeywordsByChar[char].slice(1)
    dictionary[name] = { char: char, keywords: keywords }
  }
  return dictionary
}

if (typeof module !== "undefined") {
  module.exports = { getDictionary }
}
