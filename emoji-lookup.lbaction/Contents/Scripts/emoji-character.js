/* global Action */

class EmojiCharacter {
  constructor ({name, metadata, resourcesPath}) {
    this.name = name
    this.data = metadata
    this.resourcesPath = resourcesPath || (Action.path + '/Contents/Resources/')
  }

  get character () {
    return this.data['char']
  }

  get tag () {
    return ':' + this.name + ':'
  }

  get keywords () {
    return this.data['keywords']
  }

  // Returns an Array of Strings.
  get unicodeCodePoints () {
    if (this.character == null) {
      return []
    } else {
      // Most emojis have only a single codepoint, but some have more.
      //
      // Country flags use two codepoints, determined by the ISO 3166-1
      // two-character country code. For example, the US flag emoji is:
      // U+1F1FA (for "U") followed by U+1F1F8 (for "S").
      //
      // Many of the people emojis are made up of several codepoints. For
      // example, the female sleuth with no skin tone is made up of the
      // following five codepoints:
      // - U+1F575 Sleuth
      // - U+FE0F  Variation selector 16 (http://emojipedia.org/variation-selector-16/)
      // - U+200D  Zero-width joiner
      // - U+2640  Female sign ♀
      // - U+FE0F  Variation selector 16 (http://emojipedia.org/variation-selector-16/)
      //
      // For our purposes, we don't care about the variation selector or the
      // zero-width joiner, so we'll discard them (if present) and get the
      // remaining codepoints.
      const VARIATION_SELECTOR_16 = '\ufe0f'
      const ZERO_WIDTH_JOINER = '\u200d'

      var parts = [...this.character]
      var relevantParts = parts.filter(
        (part) => (part !== VARIATION_SELECTOR_16 && part !== ZERO_WIDTH_JOINER)
      )

      var codePointHexValues = relevantParts.map(
        (part) => part.codePointAt(0).toString(16)
      )

      return codePointHexValues
    }
  }

  toLaunchbarItem () {
    return {
      title: this.launchbarItemTitle(),
      label: this.launchbarItemLabel(),
      action: 'paste',
      actionArgument: this.characterOrTag(),
      icon: this.launchbarIcon()
    }
  }

  launchbarItemTitle () {
    return this.tag
  }

  launchbarItemLabel () {
    if (this.isUnicode()) {
      return ''
    } else {
      return 'custom'
    }
  }

  launchbarIcon () {
    if (this.isUnicode()) {
      var iconFileBasename = this.unicodeCodePoints.join('-')
      return this.resourcesPath + 'unicode/' + iconFileBasename + '.png'
    } else {
      return this.resourcesPath + this.name + '.png'
    }
  }

  characterOrTag () {
    if (this.character != null) {
      return this.character
    } else {
      return this.tag
    }
  }

  isUnicode () {
    return this.unicodeCodePoints.length > 0
  }
}

if (typeof module !== 'undefined') { module.exports.EmojiCharacter = EmojiCharacter }
