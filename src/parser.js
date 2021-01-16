import cheerio from 'cheerio'

const getTranslation = html => {
  const $ = cheerio.load(html)
  const mainWord = $('.hwblk')
    .first()
    .text()

  const type = $('.gramcat .pos')
    .first()
    .text()

  const meanings = []
  let meaning = []

  $('.superentry').each((i, superEntry) => {
    $(superEntry)
      .find('.senses')
      .first()
      .find('.sense')
      .each((i, def) => {
        const cleaned = $(def)
          .text()
          .trim()

        meaning.push(`\`${i + 1} - \`${cleaned}`)
      })
    meanings.push(meaning.join('\n'))
    meaning = []
  })

  return {
    mainWord,
    type,
    meanings
  }
}

export {
  getTranslation
}
