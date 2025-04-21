/* global Action */

class EmojiCharacter {
  constructor({ name, metadata }) {
    this.name = name
    this.data = metadata
  }

  get character() {
    return this.data["char"]
  }

  get humanizedName() {
    const words = this.name.split("_").filter((word) => word.length > 0)
    return words
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(" ")
  }

  get keywords() {
    return this.data["keywords"]
  }

  toLaunchbarItem() {
    return {
      title: this.launchbarItemTitle(),
      label: this.launchbarItemLabel(),
      action: "paste",
      actionArgument: this.characterOrHumanizedName(),
      icon: this.launchbarItemIcon(),
    }
  }

  launchbarItemTitle() {
    return this.humanizedName
  }

  launchbarItemLabel() {
    return ""
  }

  launchbarItemIcon() {
    return this.character
  }

  characterOrHumanizedName() {
    if (this.character != null) {
      return this.character
    } else {
      return this.humanizedName
    }
  }
}

if (typeof module !== "undefined") {
  module.exports.EmojiCharacter = EmojiCharacter
}
