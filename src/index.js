import Telegraf from 'telegraf';
import cheerio from 'cheerio';
import request from 'request';

const bot = new Telegraf(process.env.BOT_TOKEN);
const ITA = 'ita';
const SPA = 'spa';
const useInst = `Utilización:\n - Para traducir del Español al Italiano escribe: \`spa palabra_en_español\`\n - Para traducir del Italiano al Español escribe: \`ita palabra_en_italiano\``;

const getWordFromQuery = query => query.replace(/^\w+\s/, '');

const getWordUrl = (isoA3, word) => {
  if (isoA3 === ITA) {
    return `http://www.grandidizionari.it/Dizionario_Italiano-Spagnolo/parola/${word.substring(0, 1).toUpperCase()}/${word}.aspx?query=${word}`;
  }
  
  return `http://www.grandidizionari.it/Dizionario_Spagnolo-Italiano/parola/${word.substring(0, 1).toUpperCase()}/${word}.aspx?query=${word}`;
}

bot.start(ctx => ctx.replyWithMarkdown(useInst));

bot.use(ctx => {
  if (ctx.message) {
    const query = ctx.message.text.toLowerCase();
    const isoA3 = query.substring(0, 3);

    console.log(`${new Date()}\n${query}`);

    if (![ITA, SPA].includes(isoA3)) return ctx.replyWithMarkdown(useInst);

    const word = getWordFromQuery(query);
    const url = getWordUrl(isoA3, word);
    
    request({
      url,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res, body) => {
        const $ = cheerio.load(body);
        const mainWord = $('.lemma').text();
        const desc = $('desc').text();
        const meanings = [];

        $('accezione').each((i, def) => {
          const cleaned = $(def)
            .text()
            .trim()
            .replace(/\n/, ' ')
            .replace(/\s+/, ' ')
            .replace(/(^\d+\s)/, '\`$1- \`');

          meanings.push(cleaned);
        });

        if (!meanings.length) return ctx.reply('No se encontró ningún resultado.');

        ctx.replyWithMarkdown(`*${mainWord}*\n${desc}\n${meanings.join('\n')}`);
      }
    );
  }
});

bot.startPolling();
