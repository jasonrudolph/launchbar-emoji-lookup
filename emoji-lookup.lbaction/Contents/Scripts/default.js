class EmojiCharacter {
  constructor(name, metadata) {
    this.name = name;
    this.data = metadata;
  }

  get character() {
    return this.data['char'];
  }

  get code() {
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
      actionArgument: this.characterOrCode(),
      icon: this.launchbarIcon()
    }
  }

  launchbarItemTitle() {
    return this.code + ' (' + this.keywords.join(', ') + ')';
  }

  launchbarIcon() {
    return this.unicodeCodePoint + '.png';
  }

  characterOrCode() {
    if (this.character != null) {
      return this.character;
    } else {
      return this.code;
    }
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
  path = Action.path + '/Contents/vendor/emojilib-1.1.0/emojis.json';
  return File.readJSON(path);
}
