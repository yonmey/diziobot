import axios from 'axios'
import { Telegraf } from 'telegraf'
import { getTranslation } from './parser'
import { formatTranslation, getWordFromQuery, getWordUrl } from './utils'
import config from './config'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => ctx.replyWithMarkdown(config.instructions))

bot.use(async ctx => {
  if (ctx.message) {
    const query = ctx.message.text.toLowerCase()
    const isoA3 = query.substring(0, 3)

    console.log(`=-=-=-=-=-=-=\n${new Date()}\n${query}\n=-=-=-=-=-=-=\n`)

    if (![config.itaISOA3, config.spaISOA3].includes(isoA3)) {
      return ctx.replyWithMarkdown(config.instructions)
    }

    const word = getWordFromQuery(query)
    const url = getWordUrl(isoA3, word)
    const body = await axios.get(url)

    const translation = getTranslation(body.data)
    if (!translation.meanings.length) {
      return ctx.replyWithMarkdown(config.noResult)
    };

    const result = formatTranslation(translation)

    ctx.replyWithMarkdown(result)
  }
})

bot.startPolling()

export default (req, res) => bot.handleUpdate(req.body, res)
