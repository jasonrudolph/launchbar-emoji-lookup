class EmojiDatabase {
  constructor ({dictionary}) {
    this.dictionary = dictionary
    this.index = getSearchIndexFrom(dictionary)
  }

  // Returns the names of the emojis that match the given search term.
  //
  // query - A String containing one or more search terms.
  //
  // Returns an Array of Strings.
  getMatches (query) {
    const isMatch = (searchTerm) => searchTerm.startsWith(query)
    const indexedSearchTerms = Object.keys(this.index)
    const matchedSearchTerms = indexedSearchTerms.filter(isMatch)

    let matchedEmojiNames = []
    for (let i = 0; i < matchedSearchTerms.length; i++) {
      const matchedSearchTerm = matchedSearchTerms[i]
      matchedEmojiNames.push(...this.index[matchedSearchTerm])
    }
    const uniqueMatchedEmojiNames = new Set(matchedEmojiNames)

    return Array.from(uniqueMatchedEmojiNames)
  }
}

// Returns an Object describing supported search terms and the emojis that are
//   matched by those search terms. Each key is a String representing a search
//   term. Each value is an Array of Strings representing the names of the
//   emojis that match the search term.
function getSearchIndexFrom (dictionary) {
  var searchIndex = {}

  var emojiNames = Object.keys(dictionary)
  emojiNames.forEach(function (name) {
    // Use each word in an emoji's name as a search term. For example, the
    // 'hourglass_flowing_sand' emoji has three search terms derived from its
    // name: 'hourglass', 'flowing', and 'sand'.
    var nameParts = name.split('_')

    // Use each keyword as a search term.
    var keywords = dictionary[name]['keywords']

    var searchTerms = nameParts.concat(keywords)
    searchTerms.forEach(function (term) {
      if (!searchIndex.hasOwnProperty(term)) {
        searchIndex[term] = []
      }
      searchIndex[term].push(name)
    })
  })

  return searchIndex
}

if (typeof module !== 'undefined') { module.exports.EmojiDatabase = EmojiDatabase }
