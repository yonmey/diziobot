import Telegraf from 'telegraf';
import cheerio from 'cheerio';
import request from 'request';

const bot = new Telegraf(process.env.BOT_TOKEN);
const ITA = 'ita';
const SPA = 'spa';
const useInst = `Utilización:\n - Para traducir del Español al Italiano escribe: \`spa palabra_en_español\`\n - Para traducir del Italiano al Español escribe: \`ita palabra_en_italiano\``;

const getWordFromQuery = query => query.replace(/^\w+\s/, '');

const getWordUrl = (isoA3, word) => {
  let sense = 'esit';
  if (isoA3 === ITA) sense = 'ites';
  return `https://www.wordreference.com/${sense}/${word}`;
};

bot.start(ctx => ctx.replyWithMarkdown(useInst));

bot.use(ctx => {
  if (ctx.message) {
    const query = ctx.message.text.toLowerCase();
    const isoA3 = query.substring(0, 3);

    console.log(`${new Date()}\n${query}`);

    if (![ITA, SPA].includes(isoA3)) {
      ctx.replyWithMarkdown(useInst);
      return;
    }

    const word = getWordFromQuery(query);
    const url = getWordUrl(isoA3, word);

    request(
      {
        url,
        headers: {
          'User-Agent': 'request'
        }
      },
      (err, res, body) => {
        const $ = cheerio.load(body);
        const mainWord = $('.hwblk')
          .first()
          .text();
        const type = $('.gramcat .pos')
          .first()
          .text();
        const meanings = [];
        let meaning = [];

        $('.superentry').each((i, superEntry) => {
          $(superEntry)
            .find('.senses')
            .first()
            .find('.sense')
            .each((i, def) => {
              const cleaned = $(def)
                .text()
                .trim();

              meaning.push(`\`${i + 1} - \`${cleaned}`);
            });
          meanings.push(meaning.join('\n'));
          meaning = [];
        });

        if (!meanings.length) return;

        ctx.replyWithMarkdown(
          `*${mainWord}*\n_${type}_\n\n${meanings.join(
            '\n-----------------------------------------------------\n'
          )}`
        );
      }
    );
  }
});

bot.startPolling();
