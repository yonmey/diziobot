# Diziobot 🤖 📖
A Telegram bot who translates from Spanish to Italian (and viceversa)

----

### How to use it?
The bot will answer with the instructions when you write it any text.

To translate a text from Spanish to Italian use:

`spa word_to_translate` 🇪🇸 📖 🇮🇹

To translate a text from Italian to Spanish use:

`ita word_to_translate` 🇮🇹 📖 🇪🇸

### How does it translates the words?
The bot parses the `WordReference` website to find the results. The translation sense depends on the first keyword (`ita` or `spa`).

##### Used libraries
- [telegraf](https://github.com/telegraf/telegraf)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [request](https://github.com/request/request)