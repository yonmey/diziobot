require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_telegraf__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_telegraf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_telegraf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_request__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_request__);




const bot = new __WEBPACK_IMPORTED_MODULE_0_telegraf___default.a(process.env.BOT_TOKEN);
const ITA = 'ita';
const SPA = 'spa';
const useInst = `Utilización:\n - Para traducir del Español al Italiano escribe: \`spa palabra_en_español\`\n - Para traducir del Italiano al Español escribe: \`ita palabra_en_italiano\``;

const getWordFromQuery = query => query.replace(/^\w+\s/, '');

const getWordUrl = (isoA3, word) => {
  let sense = 'esit';
  if (isoA3 === ITA) sense = 'ites';
  return `http://www.wordreference.com/${sense}/${word}`;
};

bot.start(ctx => ctx.replyWithMarkdown(useInst));

bot.use(ctx => {
  if (ctx.message) {
    const query = ctx.message.text.toLowerCase();
    const isoA3 = query.substring(0, 3);

    console.log(`${new Date()}\n${query}`);

    if (![ITA, SPA].includes(isoA3)) return ctx.replyWithMarkdown(useInst);

    const word = getWordFromQuery(query);
    const url = getWordUrl(isoA3, word);

    __WEBPACK_IMPORTED_MODULE_2_request___default()({
      url,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res, body) => {
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body);
      const mainWord = $('.hwblk').first().text();
      const type = $('.gramcat .pos').first().text();
      const meanings = [];

      $('.senses').first().find('.sense').each((i, def) => {
        const cleaned = $(def).text().trim();

        meanings.push(`\`${i + 1} - \`${cleaned}`);
      });

      if (!meanings.length) return ctx.reply('No se encontró ningún resultado.');

      ctx.replyWithMarkdown(`*${mainWord}*\n_${type}_\n\n${meanings.join('\n')}`);
    });
  }
});

bot.startPolling();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("telegraf");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map