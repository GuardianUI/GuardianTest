"use strict";
const { test } = require("./fixtures/DappTest");
const utils = require("./utils");
Object.defineProperty(test, '__esModule', { value: true });
Object.defineProperty(utils, '__esModule', { value: true });
module.exports = {
    test,
    utils
};
