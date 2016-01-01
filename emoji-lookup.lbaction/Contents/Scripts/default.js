class EmojiCharacter {
  constructor(name, metadata) {
    this.name = name;
    this.data = metadata;
  }

  get character() {
    return this.data['char'];
  }

  get tag() {
    return ':' + this.name + ':';
  }

  get keywords() {
    return this.data['keywords'];
  }

  get unicodeCodePoint() {
    if (this.character == null) {
      return null;
    } else {
      var codePointDecimalValue = this.character.codePointAt(0);
      var codePointHexValue = codePointDecimalValue.toString(16);
      return codePointHexValue;
    }
  }

  toLaunchbarItem() {
    return {
      title: this.launchbarItemTitle(),
      action: 'paste',
      actionArgument: this.characterOrTag(),
      icon: this.launchbarIcon()
    }
  }

  launchbarItemTitle() {
    return this.tag + ' (' + this.keywords.join(', ') + ')';
  }

  launchbarIcon() {
    var resourcesPath = Action.path + '/Contents/Resources/';
    if (this.isUnicode()) {
      return resourcesPath + 'unicode/' + this.unicodeCodePoint + '.png';
    } else {
      return resourcesPath + this.name + '.png'
    }
  }

  characterOrTag() {
    if (this.character != null) {
      return this.character;
    } else {
      return this.tag;
    }
  }

  isUnicode() {
    return this.unicodeCodePoint != null;
  }
}

function run() {
  var output = [];

  var emojiIndex = getEmojiIndex();
  var emojiNames = emojiIndex['keys'];
  emojiNames.forEach(function(name) {
    var character = new EmojiCharacter(name, emojiIndex[name]);
    output.push(character.toLaunchbarItem());
  });

  return output;
}

function paste(character) {
  LaunchBar.paste(character);
}

function getEmojiIndex() {
  path = Action.path + '/Contents/vendor/emojilib/emojis.json';
  return File.readJSON(path);
}
