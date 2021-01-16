import config from './config'

const getWordFromQuery = query => query.replace(/^\w+\s/, '')

const getWordUrl = (isoA3, word) => {
  let sense = 'esit'
  if (isoA3 === config.itaISOA3) sense = 'ites'
  return `https://www.wordreference.com/${sense}/${word}`
}

const formatTranslation = translation =>
    `*${translation.mainWord}*\n_${translation.type}_\n\n${translation.meanings.join(
        '\n-----------------------------------------------------\n'
    )}`

export {
  getWordFromQuery,
  getWordUrl,
  formatTranslation
}
