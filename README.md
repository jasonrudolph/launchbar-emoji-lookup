# Emoji Lookup for Launchbar

A [Launchbar][] action to find the perfect emoji by name or keyword. :mag_right:

![demo](https://cloud.githubusercontent.com/assets/2988/11998040/0d5c0abc-aa5c-11e5-9279-6b679ebeb275.gif)

## Installation

Download the latest version at https://github.com/jasonrudolph/launchbar-emoji-lookup/releases/latest.

## Shout-outs

This Launchbar action is inspired by the wonderfully-handy [emoji.muan.co](http://emoji.muan.co). :raised_hands:

The emoji keywords are brought to you by the fantastic resource that is [muan/emojilib](https://github.com/muan/emojilib). :books:

If Launchbar isn't your thing, be sure to check out [muan/mojibar](https://github.com/muan/mojibar) or [carlosgaldino/alfred-emoji-workflow](https://github.com/carlosgaldino/alfred-emoji-workflow). :tophat:

## What about Launchbar's built-in emoji action?

Launchbar's [built-in emoji action][] is great when you already know the name of the emoji you're looking for. :dart:

Sometimes you don't know the exact name, but you know a keyword or synonym. With this action, whether you know the exact name or you only know a keyword, you can quickly track down the emoji you want. :ok_hand:

## TODO

- [ ] Don't display the keywords in the result list
    - The current implementation displays the keywords in the result list so that Launchbar will automatically filter the list by keyword as you type
    - In order to remove the keywords from the result list and retain the ability to filter by keyword, the action probably to needs handle the filtering on its own (with a [suggestions script](https://developer.obdev.at/launchbar-developer-documentation/#suggestions-script)?) instead of relying on Launchbar's default filtering
- [ ] Add ability to lookup emoji [by category](https://github.com/jasonrudolph/launchbar-emoji-lookup/blob/d25677084e514772a151161c163f8520bac652ee/emoji-lookup.lbaction/Contents/vendor/emojilib-1.1.0/emojis.json#L5)
- [ ] Add support for the [new emojis that Apple launched in 2015](http://www.engadget.com/2015/10/21/os-x-10-11-1-and-ios-9-1/) /cc [muan/emojilib#24](https://github.com/muan/emojilib/issues/24)

[launchbar]: https://www.obdev.at/products/launchbar
[built-in emoji action]: https://cloud.githubusercontent.com/assets/2988/11998255/1d4e026a-aa64-11e5-9b41-98e2244c2696.png
