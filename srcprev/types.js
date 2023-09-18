const COUNTRIES = require("./countries").COUNTRIES;

/**
 * @typedef {import('./countries').Country} Country
 */

/**
 * @typedef {Country} SelectMenuOption
 */

/**
 * @type {SelectMenuOption}
 */
const selectMenuOption = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
