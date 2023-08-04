(self["webpackChunkrestaurant_page"] = self["webpackChunkrestaurant_page"] || []).push([["index"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf */ "./src/assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf */ "./src/assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Teko/Teko-Light.ttf */ "./src/assets/fonts/Teko/Teko-Light.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Teko/Teko-Medium.ttf */ "./src/assets/fonts/Teko/Teko-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Teko/Teko-Regular.ttf */ "./src/assets/fonts/Teko/Teko-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
    font-family: 'Nunito Sans';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_1___});
}

@font-face {
    font-family: 'Teko';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_2___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_3___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}

:root {
    /* color palette */
    /* https://coolors.co/320e3b-e56399-7f96ff-a6cfd5-dbfcff */
    --background-color-primary: #F3FCF0;
    --background-color-secondary: #FFD23F;
    --accent-color-primary: #EE4266;
    --accent-color-secondary: #1F271B;
    --accent-color-tertiary: #540D6E;
    --font-family-primary: 'Teko', arial, sans-serif;
    --font-family-secondary: 'Nunito Sans', arial, sans-serif;
    --padding-container: 0.5rem;
}

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    max-width: 100vw;
    background-color: var(--background-color-primary);
    display: grid;
    grid-template-rows: min-content 1fr min-content;
}

#navbar {
    position: fixed;
    top: 0;
    right: 0;
    min-width: 100%;
    z-index: 1;
}

#navbar > .container {
    display: grid;
    justify-content: end;
    position: relative;
    background-color: var(--accent-color-primary);
    box-shadow: 0px 1px 5px 0.5px black;
}

.links {
    display: none;
    grid-auto-rows: min-content;
    list-style: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    gap: 0.5rem;
    background-color: var(--background-color-secondary);
}

.links > li > a {
    display: block;
    text-decoration: none;
    font-size: 2rem;
    font-family: var(--font-family-secondary);
    font-weight: 700;
    color: var(--accent-color-secondary);
    text-transform: uppercase;
    padding: 0.25rem 1rem;
}

.links > li > a:hover {
    background-color: var(--accent-color-secondary);
    color: var(--background-color-primary);
    padding: 0.5rem;
}

.links > li > a.active {
    color: var(--accent-color-primary);
}

.menu {
    border: none;
    background: none;
    position: relative;
    z-index: 1;
    padding: 0.5rem;
}

.menu > img {
    max-width: 32px;
}

#hero > .container {
    position: relative;
    display: grid;
    min-height: 100vh;
    box-shadow: 0px 1px 10px 2px black;
}

#hero > .container > .hero-text > h1 {
    font-size: clamp(3.5rem, 18vw, 10rem);
    color: var(--accent-color-primary);
    letter-spacing: 1.5vw;
}

#hero > .container > #carousel > .container {
    display: grid;
    min-height: 100%;
}

#hero > .container > #carousel > .container > button {
    position: absolute;
    align-self: center;
    border: none;
    background: none;
    display: grid;
}

#hero > .container > #carousel > .container > button:hover {
    background-color: rgba(0, 0, 0, 0.3);
}

#hero > .container > #carousel > .container > button:last-of-type {
    right: 0;
}

#hero > .container > #carousel > .container > button > img {
    width: clamp(2rem, 5vw, 5rem);
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(2%) hue-rotate(64deg) brightness(108%) contrast(101%);
}

#hero > .container > .hero-text {
    position: absolute;
    min-width: 100%;
    align-self: center;
    text-align: center;
}

#hero > .container > #carousel > .container > .carousel-item > img {
    max-width: 100%;
    min-height: 100%;
    object-fit: cover;
}

h1, h2, h3, h5 {
    font-family: var(--font-family-primary);
    color: var(--accent-color-secondary);
    text-transform: uppercase;
}

#content {
    min-height: 100vh;
}

#content > * {
    scroll-margin-top: 2rem;
    display: grid;
    row-gap: 1rem;
}

#content > * > h1 {
    text-align: center;
    padding: 1rem;
    margin-bottom: -2rem;
    margin-top: 1rem;
    font-size: clamp(2.5rem, 5vw, 4rem);
}

#content > * > *:not(h1) > .container {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    font-family: var(--font-family-secondary);

    border: 9px solid transparent;
    outline-offset: -20px;
    outline-style: auto;
}

#content > * > *:not(h1) > .container > * {
    padding: 1rem;
    background-color: var(--background-color-secondary);
    border: 2px solid black;
}

footer {
    padding: 1rem;
    background-color: var(--accent-color-primary);
    box-shadow: 0px 4px 7px 3px black;
}

footer > .container {
    display: flex;
    justify-content: center;
}

footer > .container > h5 {
    letter-spacing: 2px;
}

@media screen and (min-width: 768px) {
    .links {
        display: grid;
        grid-template-columns: repeat(4, max-content);
        list-style: none;
        width: 100vw;
        height: min-content;
        top: 0;
    }

    .menu {
        /* display: none; */
    }
}`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;IACI,0BAA0B;IAC1B;+CAC+F;AACnG;;AAEA;IACI,mBAAmB;IACnB;;+CAE+C;AACnD;;AAEA;IACI,kBAAkB;IAClB,0DAA0D;IAC1D,mCAAmC;IACnC,qCAAqC;IACrC,+BAA+B;IAC/B,iCAAiC;IACjC,gCAAgC;IAChC,gDAAgD;IAChD,yDAAyD;IACzD,2BAA2B;AAC/B;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,iDAAiD;IACjD,aAAa;IACb,+CAA+C;AACnD;;AAEA;IACI,eAAe;IACf,MAAM;IACN,QAAQ;IACR,eAAe;IACf,UAAU;AACd;;AAEA;IACI,aAAa;IACb,oBAAoB;IACpB,kBAAkB;IAClB,6CAA6C;IAC7C,mCAAmC;AACvC;;AAEA;IACI,aAAa;IACb,2BAA2B;IAC3B,gBAAgB;IAChB,eAAe;IACf,WAAW;IACX,YAAY;IACZ,MAAM;IACN,WAAW;IACX,mDAAmD;AACvD;;AAEA;IACI,cAAc;IACd,qBAAqB;IACrB,eAAe;IACf,yCAAyC;IACzC,gBAAgB;IAChB,oCAAoC;IACpC,yBAAyB;IACzB,qBAAqB;AACzB;;AAEA;IACI,+CAA+C;IAC/C,sCAAsC;IACtC,eAAe;AACnB;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;IAClB,UAAU;IACV,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,iBAAiB;IACjB,kCAAkC;AACtC;;AAEA;IACI,qCAAqC;IACrC,kCAAkC;IAClC,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,YAAY;IACZ,gBAAgB;IAChB,aAAa;AACjB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,QAAQ;AACZ;;AAEA;IACI,6BAA6B;IAC7B,0HAA0H;AAC9H;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,uCAAuC;IACvC,oCAAoC;IACpC,yBAAyB;AAC7B;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,uBAAuB;IACvB,aAAa;IACb,aAAa;AACjB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,oBAAoB;IACpB,gBAAgB;IAChB,mCAAmC;AACvC;;AAEA;IACI,aAAa;IACb,SAAS;IACT,aAAa;IACb,yCAAyC;;IAEzC,6BAA6B;IAC7B,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mDAAmD;IACnD,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,6CAA6C;IAC7C,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI;QACI,aAAa;QACb,6CAA6C;QAC7C,gBAAgB;QAChB,YAAY;QACZ,mBAAmB;QACnB,MAAM;IACV;;IAEA;QACI,mBAAmB;IACvB;AACJ","sourcesContent":["@font-face {\n    font-family: 'Nunito Sans';\n    src: url('./assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC\\,opsz\\,wdth\\,wght.ttf'),\n        url('./assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC\\,opsz\\,wdth\\,wght.ttf');\n}\n\n@font-face {\n    font-family: 'Teko';\n    src: url('./assets/fonts/Teko/Teko-Light.ttf'),\n        url('./assets/fonts/Teko/Teko-Medium.ttf'),\n        url('./assets/fonts/Teko/Teko-Regular.ttf');\n}\n\n:root {\n    /* color palette */\n    /* https://coolors.co/320e3b-e56399-7f96ff-a6cfd5-dbfcff */\n    --background-color-primary: #F3FCF0;\n    --background-color-secondary: #FFD23F;\n    --accent-color-primary: #EE4266;\n    --accent-color-secondary: #1F271B;\n    --accent-color-tertiary: #540D6E;\n    --font-family-primary: 'Teko', arial, sans-serif;\n    --font-family-secondary: 'Nunito Sans', arial, sans-serif;\n    --padding-container: 0.5rem;\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    min-height: 100vh;\n    max-width: 100vw;\n    background-color: var(--background-color-primary);\n    display: grid;\n    grid-template-rows: min-content 1fr min-content;\n}\n\n#navbar {\n    position: fixed;\n    top: 0;\n    right: 0;\n    min-width: 100%;\n    z-index: 1;\n}\n\n#navbar > .container {\n    display: grid;\n    justify-content: end;\n    position: relative;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 1px 5px 0.5px black;\n}\n\n.links {\n    display: none;\n    grid-auto-rows: min-content;\n    list-style: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    gap: 0.5rem;\n    background-color: var(--background-color-secondary);\n}\n\n.links > li > a {\n    display: block;\n    text-decoration: none;\n    font-size: 2rem;\n    font-family: var(--font-family-secondary);\n    font-weight: 700;\n    color: var(--accent-color-secondary);\n    text-transform: uppercase;\n    padding: 0.25rem 1rem;\n}\n\n.links > li > a:hover {\n    background-color: var(--accent-color-secondary);\n    color: var(--background-color-primary);\n    padding: 0.5rem;\n}\n\n.links > li > a.active {\n    color: var(--accent-color-primary);\n}\n\n.menu {\n    border: none;\n    background: none;\n    position: relative;\n    z-index: 1;\n    padding: 0.5rem;\n}\n\n.menu > img {\n    max-width: 32px;\n}\n\n#hero > .container {\n    position: relative;\n    display: grid;\n    min-height: 100vh;\n    box-shadow: 0px 1px 10px 2px black;\n}\n\n#hero > .container > .hero-text > h1 {\n    font-size: clamp(3.5rem, 18vw, 10rem);\n    color: var(--accent-color-primary);\n    letter-spacing: 1.5vw;\n}\n\n#hero > .container > #carousel > .container {\n    display: grid;\n    min-height: 100%;\n}\n\n#hero > .container > #carousel > .container > button {\n    position: absolute;\n    align-self: center;\n    border: none;\n    background: none;\n    display: grid;\n}\n\n#hero > .container > #carousel > .container > button:hover {\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n#hero > .container > #carousel > .container > button:last-of-type {\n    right: 0;\n}\n\n#hero > .container > #carousel > .container > button > img {\n    width: clamp(2rem, 5vw, 5rem);\n    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(2%) hue-rotate(64deg) brightness(108%) contrast(101%);\n}\n\n#hero > .container > .hero-text {\n    position: absolute;\n    min-width: 100%;\n    align-self: center;\n    text-align: center;\n}\n\n#hero > .container > #carousel > .container > .carousel-item > img {\n    max-width: 100%;\n    min-height: 100%;\n    object-fit: cover;\n}\n\nh1, h2, h3, h5 {\n    font-family: var(--font-family-primary);\n    color: var(--accent-color-secondary);\n    text-transform: uppercase;\n}\n\n#content {\n    min-height: 100vh;\n}\n\n#content > * {\n    scroll-margin-top: 2rem;\n    display: grid;\n    row-gap: 1rem;\n}\n\n#content > * > h1 {\n    text-align: center;\n    padding: 1rem;\n    margin-bottom: -2rem;\n    margin-top: 1rem;\n    font-size: clamp(2.5rem, 5vw, 4rem);\n}\n\n#content > * > *:not(h1) > .container {\n    display: grid;\n    gap: 1rem;\n    padding: 1rem;\n    font-family: var(--font-family-secondary);\n\n    border: 9px solid transparent;\n    outline-offset: -20px;\n    outline-style: auto;\n}\n\n#content > * > *:not(h1) > .container > * {\n    padding: 1rem;\n    background-color: var(--background-color-secondary);\n    border: 2px solid black;\n}\n\nfooter {\n    padding: 1rem;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 4px 7px 3px black;\n}\n\nfooter > .container {\n    display: flex;\n    justify-content: center;\n}\n\nfooter > .container > h5 {\n    letter-spacing: 2px;\n}\n\n@media screen and (min-width: 768px) {\n    .links {\n        display: grid;\n        grid-template-columns: repeat(4, max-content);\n        list-style: none;\n        width: 100vw;\n        height: min-content;\n        top: 0;\n    }\n\n    .menu {\n        /* display: none; */\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/about.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/about.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#about-main > .container > p,
#history > .container > .item > :last-child {
    font-size: clamp(1rem, 5vw, 2.25rem);
}

#about > #history > .container > .item > h3 {
    font-size: clamp(1.5rem, 10vw, 2.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/about.css"],"names":[],"mappings":"AAAA;;IAEI,oCAAoC;AACxC;;AAEA;IACI,sCAAsC;AAC1C","sourcesContent":["#about-main > .container > p,\n#history > .container > .item > :last-child {\n    font-size: clamp(1rem, 5vw, 2.25rem);\n}\n\n#about > #history > .container > .item > h3 {\n    font-size: clamp(1.5rem, 10vw, 2.5rem);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/contact.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/contact.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `label > .asterik {
    color: red;
}

#form > .container >:first-child {
    font-size: clamp(1rem, 5vw, 1.5rem);
    text-decoration: underline;
}

#form > .container > .form-item {
    display: grid;
}

#form > .container > .form-item > label {
    font-size: clamp(1.5rem, 10vw, 2rem);
    font-weight: 700;
    text-transform: uppercase;
}

/* selects inputs and textarea */
#form > .container > .form-item > *:nth-child(n + 2) {
    font-size: clam(1rem, 10vw, 2rem);
    border-radius: 0.35rem;
    outline: none;
    border-color: transparent;
    padding: 0.5rem;
}

#form > .container > .form-item > *:nth-child(n + 2)::placeholder {
    text-transform: uppercase;
    text-indent: 5%;
}

#form > .container > .form-item > *:nth-child(n + 2):focus {
    border: 4px solid var(--accent-color-secondary);
    padding: 0.75rem;
}

#form > .container > .form-item:last-child {
    border: none;
    background: none;
    justify-self: center;
    margin-bottom: 1rem;
}

#form > .container > .form-item:last-child > button {
    padding: 0.75rem 4rem;
    border: none;
    border-radius: 2rem;
    background-color: var(--accent-color-primary);
    box-shadow: 0px 1px 2px 0px black;
}

#form > .container > .form-item:last-child > button:active {
    box-shadow: 0px 2px 3px 1px black
}

@media screen and (min-width: 768px) {
    #form > .container {
        grid-template-columns: repeat(2, 1fr);
    }

    #form > .container > label {
        grid-area: 1 / span 2;
    }

    #form > .container > .form-item:first-of-type {
        grid-area: 2 / span 2;
    }

    #form > .container > .form-item:nth-of-type(4) {
        grid-area: 4 / span 2
    }

    #form > .container > .form-item:last-of-type {
        grid-area: 5 / span 2;
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/contact.css"],"names":[],"mappings":"AAAA;IACI,UAAU;AACd;;AAEA;IACI,mCAAmC;IACnC,0BAA0B;AAC9B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,oCAAoC;IACpC,gBAAgB;IAChB,yBAAyB;AAC7B;;AAEA,gCAAgC;AAChC;IACI,iCAAiC;IACjC,sBAAsB;IACtB,aAAa;IACb,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,+CAA+C;IAC/C,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,oBAAoB;IACpB,mBAAmB;AACvB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,mBAAmB;IACnB,6CAA6C;IAC7C,iCAAiC;AACrC;;AAEA;IACI;AACJ;;AAEA;IACI;QACI,qCAAqC;IACzC;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI;IACJ;;IAEA;QACI,qBAAqB;IACzB;AACJ","sourcesContent":["label > .asterik {\n    color: red;\n}\n\n#form > .container >:first-child {\n    font-size: clamp(1rem, 5vw, 1.5rem);\n    text-decoration: underline;\n}\n\n#form > .container > .form-item {\n    display: grid;\n}\n\n#form > .container > .form-item > label {\n    font-size: clamp(1.5rem, 10vw, 2rem);\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n/* selects inputs and textarea */\n#form > .container > .form-item > *:nth-child(n + 2) {\n    font-size: clam(1rem, 10vw, 2rem);\n    border-radius: 0.35rem;\n    outline: none;\n    border-color: transparent;\n    padding: 0.5rem;\n}\n\n#form > .container > .form-item > *:nth-child(n + 2)::placeholder {\n    text-transform: uppercase;\n    text-indent: 5%;\n}\n\n#form > .container > .form-item > *:nth-child(n + 2):focus {\n    border: 4px solid var(--accent-color-secondary);\n    padding: 0.75rem;\n}\n\n#form > .container > .form-item:last-child {\n    border: none;\n    background: none;\n    justify-self: center;\n    margin-bottom: 1rem;\n}\n\n#form > .container > .form-item:last-child > button {\n    padding: 0.75rem 4rem;\n    border: none;\n    border-radius: 2rem;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 1px 2px 0px black;\n}\n\n#form > .container > .form-item:last-child > button:active {\n    box-shadow: 0px 2px 3px 1px black\n}\n\n@media screen and (min-width: 768px) {\n    #form > .container {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    #form > .container > label {\n        grid-area: 1 / span 2;\n    }\n\n    #form > .container > .form-item:first-of-type {\n        grid-area: 2 / span 2;\n    }\n\n    #form > .container > .form-item:nth-of-type(4) {\n        grid-area: 4 / span 2\n    }\n\n    #form > .container > .form-item:last-of-type {\n        grid-area: 5 / span 2;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/home.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/home.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#home > *:not(h1) > .container {
    text-align: center;
    font-size: clamp(1rem, 5vw, 2rem);
}

#home > #hours > .container > ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5vw;
}

#home > #hours > .container > ul > :nth-child(2n - 1 ) {
    text-align: right;
}

#home > #hours > .container > ul > :nth-child(2n) {
    text-align: left;
}`, "",{"version":3,"sources":["webpack://./src/styles/home.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,iCAAiC;AACrC;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,qCAAqC;IACrC,eAAe;AACnB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["#home > *:not(h1) > .container {\n    text-align: center;\n    font-size: clamp(1rem, 5vw, 2rem);\n}\n\n#home > #hours > .container > ul {\n    list-style: none;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 5vw;\n}\n\n#home > #hours > .container > ul > :nth-child(2n - 1 ) {\n    text-align: right;\n}\n\n#home > #hours > .container > ul > :nth-child(2n) {\n    text-align: left;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/menu.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/menu.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#menu > #menu-main > .container > * {
    display: grid;
    row-gap: 1rem;
}

#menu > #menu-main > .container > * > h2 {
    font-size: clamp(1.5rem, 10vw, 2rem);
}

#menu > #menu-main > .container > * > .item {
    padding: 0.5rem;
}

#menu > #menu-main > .container > * > .item > p:first-child {
    text-transform: capitalize;
    font-style: italic;
    font-weight: 700;
    position: relative;
    margin-bottom: 1rem;
}

#menu > #menu-main > .container > * > .item > p:first-child::after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: ' ';
    width: 75%;
    border-bottom: 3px dotted black;
}

#menu > #menu-main > .container > * > .item > p:nth-child(n + 2) {
    text-align: end;
    text-wrap: balance;
    font-weight: 300;
    position: relative;
}

@media screen and (min-width: 768px) {
    #content > #menu > *:not(h1) > .container {
        grid-template-columns: repeat(3, 1fr);
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/menu.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,aAAa;AACjB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,0BAA0B;IAC1B,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,SAAS;IACT,YAAY;IACZ,UAAU;IACV,+BAA+B;AACnC;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI;QACI,qCAAqC;IACzC;AACJ","sourcesContent":["#menu > #menu-main > .container > * {\n    display: grid;\n    row-gap: 1rem;\n}\n\n#menu > #menu-main > .container > * > h2 {\n    font-size: clamp(1.5rem, 10vw, 2rem);\n}\n\n#menu > #menu-main > .container > * > .item {\n    padding: 0.5rem;\n}\n\n#menu > #menu-main > .container > * > .item > p:first-child {\n    text-transform: capitalize;\n    font-style: italic;\n    font-weight: 700;\n    position: relative;\n    margin-bottom: 1rem;\n}\n\n#menu > #menu-main > .container > * > .item > p:first-child::after {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    content: ' ';\n    width: 75%;\n    border-bottom: 3px dotted black;\n}\n\n#menu > #menu-main > .container > * > .item > p:nth-child(n + 2) {\n    text-align: end;\n    text-wrap: balance;\n    font-weight: 300;\n    position: relative;\n}\n\n@media screen and (min-width: 768px) {\n    #content > #menu > *:not(h1) > .container {\n        grid-template-columns: repeat(3, 1fr);\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/about.css":
/*!******************************!*\
  !*** ./src/styles/about.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_about_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./about.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/about.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_about_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_about_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_about_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_about_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/contact.css":
/*!********************************!*\
  !*** ./src/styles/contact.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_contact_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./contact.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/contact.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_contact_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_contact_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_contact_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_contact_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/home.css":
/*!*****************************!*\
  !*** ./src/styles/home.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./home.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/home.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/menu.css":
/*!*****************************!*\
  !*** ./src/styles/menu.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_menu_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./menu.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/menu.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_menu_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_menu_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_menu_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_menu_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/icons sync \\.svg$":
/*!****************************************************!*\
  !*** ./src/assets/icons/ sync nonrecursive \.svg$ ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./chevron_left.svg": "./src/assets/icons/chevron_left.svg",
	"./chevron_right.svg": "./src/assets/icons/chevron_right.svg",
	"./menu.svg": "./src/assets/icons/menu.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/icons sync \\.svg$";

/***/ }),

/***/ "./src/assets/images sync \\.jpg$":
/*!*****************************************************!*\
  !*** ./src/assets/images/ sync nonrecursive \.jpg$ ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./dough0.jpg": "./src/assets/images/dough0.jpg",
	"./pizza0.jpg": "./src/assets/images/pizza0.jpg",
	"./pizza1.jpg": "./src/assets/images/pizza1.jpg",
	"./pizza2.jpg": "./src/assets/images/pizza2.jpg",
	"./pizza3.jpg": "./src/assets/images/pizza3.jpg",
	"./pizza4.jpg": "./src/assets/images/pizza4.jpg",
	"./pizza5.jpg": "./src/assets/images/pizza5.jpg",
	"./pizza6.jpg": "./src/assets/images/pizza6.jpg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/images sync \\.jpg$";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _modules_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/header.js */ "./src/modules/header.js");
/* harmony import */ var _modules_home_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/home.js */ "./src/modules/home.js");
/* harmony import */ var _modules_about_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/about.js */ "./src/modules/about.js");
/* harmony import */ var _modules_menu_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menu.js */ "./src/modules/menu.js");
/* harmony import */ var _modules_contact_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/contact.js */ "./src/modules/contact.js");
/* harmony import */ var _modules_footer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/footer.js */ "./src/modules/footer.js");








const home = (function() {
    const build = {
        header: _modules_header_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        home: _modules_home_js__WEBPACK_IMPORTED_MODULE_2__["default"],
        about: _modules_about_js__WEBPACK_IMPORTED_MODULE_3__["default"],
        menu: _modules_menu_js__WEBPACK_IMPORTED_MODULE_4__["default"],
        contact: _modules_contact_js__WEBPACK_IMPORTED_MODULE_5__["default"],
        footer: _modules_footer_js__WEBPACK_IMPORTED_MODULE_6__["default"],
    }

    const content = {
        activeTab: null,
        init: function() {
            build.header();
            this.cacheDOM();
            this.bindEvents();
            this.render();
            build.footer();

        },
        cacheDOM: function() {
            this.contentContainer = document.querySelector('#content');
            this.navBar = document.querySelector('#navbar');
            this.navItems = Array.from(this.navBar.querySelectorAll('.container ul li a'));
        },
        render: function(key) {
            let content;
            if (!key) {
                content = build.home();
            } else {
                this.contentContainer.firstChild.remove();
                content = build[key]();
            }
            this.setActiveTab(content);
            this.contentContainer.appendChild(content);
        },
        bindEvents: function() {
            this.switchTab = this.switchTab.bind(this);
            this.navItems.forEach(item => item.addEventListener('click', this.switchTab));
        },
        switchTab: function(e) {
            for (const key in build) {
                if (e.target.classList.contains(key) && !e.target.classList.contains('active')) {
                    this.activeTab.classList.remove('active');
                    this.render(key);
                }
            }
        },
        setActiveTab: function(content) {
            this.navItems.find(item => {
                if (item.className === content.id) {
                    this.activeTab = item;
                    item.classList.add('active');
                }
            });
        },
    }

    content.init();
})();

/***/ }),

/***/ "./src/modules/about.js":
/*!******************************!*\
  !*** ./src/modules/about.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildAbout)
/* harmony export */ });
/* harmony import */ var _styles_about_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/about.css */ "./src/styles/about.css");


function buildAbout() {
    console.log(`about.js running`);
    const aboutContainer = document.createElement('div');
    aboutContainer.id = 'about';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('About');
    header.appendChild(headerText);
    aboutContainer.appendChild(header);
    
    aboutContainer.appendChild(aboutMain.render());
    aboutContainer.appendChild(aboutHistory.render());
    return aboutContainer;
}

const aboutMain = {
    render: function() {
        const text = 'Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Magna eget est lorem ipsum dolor sit. Arcu felis bibendum ut tristique et. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Viverra orci sagittis eu volutpat odio. Id nibh tortor id aliquet. Faucibus nisl tincidunt eget nullam. Egestas quis ipsum suspendisse ultrices. Suspendisse potenti nullam ac tortor vitae purus faucibus. Tincidunt eget nullam non nisi est sit.';
        const aboutMainWrapper = document.createElement('div');
        aboutMainWrapper.id = 'about-main';

        const aboutMainContainer = document.createElement('div');
        aboutMainContainer.classList.add('container');

        const aboutMainParagraph = document.createElement('p');
        const aboutMainParagraphText = document.createTextNode(text);
        aboutMainParagraph.appendChild(aboutMainParagraphText);
        aboutMainContainer.appendChild(aboutMainParagraph);
        aboutMainWrapper.appendChild(aboutMainContainer);

        return aboutMainWrapper;
    }
}

const aboutHistory = {
    render: function() {
        const historyWrapper = document.createElement('div');
        historyWrapper.id = 'history';

        const historyMainContainer = document.createElement('div');
        historyMainContainer.classList.add('container');

        for (let key in this.history) {
            const historyContainer = document.createElement('div');
            historyContainer.classList.add('item');
            const historyHeading = document.createElement('h3');
            const historyHeadingText = document.createTextNode(`${key}, ${this.history[key][0]}`);
            historyHeading.appendChild(historyHeadingText);

            const historyParagraph = document.createElement('p');
            const historyParagraphText = document.createTextNode(this.history[key][1]);
            historyParagraph.appendChild(historyParagraphText);

            historyContainer.appendChild(historyHeading);
            historyContainer.appendChild(historyParagraph);
            historyMainContainer.appendChild(historyContainer);
        }

        historyWrapper.appendChild(historyMainContainer);

        return historyWrapper;
    },
    history: {
        2013: ['Twilight Strand', 'Coming from Ascalon, we strived to feed thousands of exiles with familiar dishes. We started cooking pizzas on a small food cart with a homemade pizza oven, and pulled our service across The Mud Flats.'],
        2014: ['Wetlands', 'Our first food truck hit the zone offering more food choices widely known to locals.'],
        2015: ['Sarn Encampment', 'Our open-concept restaurant opened up to the undead, Blackguard soliders and passing exiles.'],
    },
}

/***/ }),

/***/ "./src/modules/contact.js":
/*!********************************!*\
  !*** ./src/modules/contact.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildContact)
/* harmony export */ });
/* harmony import */ var _styles_contact_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/contact.css */ "./src/styles/contact.css");


function buildContact() {
    console.log(`contact.js running`);
    const contactContainer = document.createElement('div');
    contactContainer.id = 'contact';
    
    const header = document.createElement('h1');
    const headerText = document.createTextNode('Contact');
    header.appendChild(headerText);
    contactContainer.appendChild(header);

    contactContainer.appendChild(form.render());
    return contactContainer;
}

const form = {
    render: function() {
        const formElement = document.createElement('form');
        formElement.id = 'form'

        const formWrapper = document.createElement('div');
        formWrapper.classList.add('container');

        const formNoteLabel = document.createElement('label');
        const formNoteLabelText = document.createTextNode(' Indicates required field');
        const formNoteSpan = document.createElement('span');
        const formNoteSpanText = document.createTextNode('*');
        formNoteSpan.classList.add('asterik');

        formNoteSpan.appendChild(formNoteSpanText);
        formNoteLabel.appendChild(formNoteSpan);
        formNoteLabel.appendChild(formNoteLabelText);
        formWrapper.appendChild(formNoteLabel);
        for (let inputs in this.attributes) {
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');

            if (inputs !== 'submit') {
                const label = document.createElement('label');
                const labelText = document.createTextNode(`${inputs} `);
                const span = document.createElement('span');
                span.classList.add('asterik');
                const spanText = document.createTextNode('*');
                label.htmlFor = inputs;
                label.appendChild(labelText);
                span.appendChild(spanText);
                label.appendChild(span);
                formItem.appendChild(label);

                if (inputs !== 'message') {
                    const input = document.createElement('input');
                    input.id = inputs;
                    Object.assign(input, this.attributes[inputs]);
                    formItem.appendChild(input);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.id = inputs;
                    for (let attr in this.attributes[inputs]) {
                        textArea.setAttribute(attr, this.attributes[inputs][attr]);
                    }
                    formItem.appendChild(textArea);
                }
            } else {
                const submitButton = document.createElement('button');
                submitButton.id = inputs;
                const submitButtonText = document.createTextNode('Submit');
                Object.assign(submitButton, this.attributes[inputs]);
                submitButton.appendChild(submitButtonText);
                formItem.appendChild(submitButton);
            }

            formWrapper.appendChild(formItem);
        }

        formElement.appendChild(formWrapper);
        return formElement;
    },
    attributes: {
        name: {
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'full name',
            required: 'required',
        },
        email: {
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: 'email@address.com',
            required: 'required',
        },
        phone: {
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: 'XXX-XXX-XXXX',
            required: 'required',
        },
        message: {
            id: 'message',
            name: 'message',
            type: 'text',
            placeholder: 'your message here (500 characters max)',
            required: 'required',
        },
        submit: {
            type: 'submit',
        },
    }
}

/***/ }),

/***/ "./src/modules/footer.js":
/*!*******************************!*\
  !*** ./src/modules/footer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFooter)
/* harmony export */ });
function buildFooter() {
    const footerWrapper = document.createElement('footer');

    const footerContainer = document.createElement('div');
    footerContainer.classList.add('container');

    const footerHeader = document.createElement('h5');
    const footerText = document.createTextNode('Placeholder');
    
    footerHeader.appendChild(footerText);
    footerContainer.appendChild(footerHeader);
    footerWrapper.appendChild(footerContainer);

    document.body.appendChild(footerWrapper);
}

/***/ }),

/***/ "./src/modules/header.js":
/*!*******************************!*\
  !*** ./src/modules/header.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHeader)
/* harmony export */ });
/* harmony import */ var _images_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images.js */ "./src/modules/images.js");


const assets = {
    icons: (0,_images_js__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
    images: (0,_images_js__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/images sync \\.jpg$")),
}

const navLinks = ['home', 'about', 'menu', 'contact'];

function buildHeader() {
    console.log(`navbar.js running`); //for debugging
    const headerElement = document.createElement('header');
    const heroWrapper = document.createElement('div');

    const heroTextWrapper = document.createElement('div');
    heroTextWrapper.classList.add('hero-text');
    const heading = document.createElement('h1');
    const headingText = document.createTextNode(`Exile's Pizza`);
    heroWrapper.id = 'hero';

    const heroContainer = document.createElement('div');
    heroContainer.classList.add('container');

    heroTextWrapper.appendChild(heading);
    heroWrapper.appendChild(heroContainer);
    heading.appendChild(headingText);
    heroContainer.appendChild(heroTextWrapper);
    heroContainer.appendChild(imageCarousel.render());
    headerElement.appendChild(heroWrapper);

    headerElement.insertBefore(nav.render(), heroWrapper);
    document.body.insertBefore(headerElement, document.body.firstChild);

    
}

const nav = {
    render: function() {
        const navElement = document.createElement('nav');
        const navContainer = document.createElement('div');

        navElement.id = 'navbar';
        navContainer.classList.add('container');
    
        const navList = document.createElement('ul');
        navList.classList.add('links');

        navLinks.forEach(item => {
            const navItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = `#${item}`;
            anchor.classList.add(item);
    
            const navItemText = document.createTextNode(item);
            anchor.appendChild(navItemText);
            navItem.appendChild(anchor);
            navList.appendChild(navItem);
        })

        
        const navMenu = document.createElement('button');
        navMenu.setAttribute('aria-pressed', false);
        const navMenuImg = new Image();
        navMenuImg.src = assets.icons.images['menu.svg'];
        navMenu.appendChild(navMenuImg);
        navMenu.classList.add('menu');
        navContainer.appendChild(navMenu);

        navContainer.appendChild(navList);
        navElement.appendChild(navContainer);
        this.cacheDOM(navMenu, navList);
        this.bindEvents();
        return navElement;
    },
    cacheDOM: function(btn, ul) {
        console.log(btn);
        this.button = btn;
        this.menu = ul;
    },
    bindEvents: function() {
        this.toggleMenu = this.toggleMenu.bind(this);
        this.button.addEventListener('click', this.toggleMenu);
        this.menu.addEventListener('click', this.toggleMenu);
        // this.getWindowWidth = this.getWindowWidth.bind(this);
        // window.addEventListener('resize', this.getWindowWidth);
    },
    removeEvents: function() {
        this.button.removeEventListener('click', this.toggleMenu);
        this.menu.removeEventListener('click', this.toggleMenu);
    },
    toggleMenu: function() {
        let isPressed = JSON.parse(this.button.getAttribute('aria-pressed')) == true || false;
        this.button.setAttribute('aria-pressed', !isPressed);
        let display;
        isPressed ? display = 'none' : display = 'grid';
        this.menu.style.display = display;
    },
    getWindowWidth: function() {
        console.log(window.innerWidth);
        return window.innerWidth;
    },
}


//images slideshow
const imageCarousel = {
    render: function() {
        const carouselWrapper = document.createElement('div');
        carouselWrapper.id = 'carousel';
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('container');

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        const carouselImg = document.createElement('img');
        carouselImg.src = assets.images.images['pizza0.jpg'];

        const buttonBack = document.createElement('button');
        buttonBack.classList.add('btn-carousel', 'back');
        const imageBack = document.createElement('img');
        imageBack.src = assets.icons.images['chevron_left.svg'];
        buttonBack.appendChild(imageBack);

        const buttonForward = document.createElement('button');
        buttonForward.classList.add('btn-carousel', 'forward');
        const imageForward = document.createElement('img');
        imageForward.src = assets.icons.images['chevron_right.svg'];
        buttonForward.appendChild(imageForward);
        this.cacheDOM(carouselImg, buttonBack, buttonForward);

        carouselContainer.appendChild(buttonBack);
        carouselContainer.appendChild(buttonForward);

        carouselItem.appendChild(carouselImg);
        carouselContainer.appendChild(carouselItem);
        carouselWrapper.appendChild(carouselContainer);
        this.bindEvents();
        return carouselWrapper;
    },
    cacheDOM: function(image, ...buttons) {
        this.carouselImg = image;
        this.buttons = buttons;
    },
    bindEvents: function() {
        this.changeImage = this.changeImage.bind(this);
        [...this.buttons].forEach(button => button.addEventListener('click', this.changeImage));
    },
    changeImage: function(e) {
        console.log(`changeImage running`);
        let direction = e.target.parentElement.className.split(' ')[1];
        let imageIndex;
        for (let key in assets.images.images) {
            if (assets.images.images[key] === this.carouselImg.src) {
                imageIndex = Object.keys(assets.images.images).indexOf(key);
                break;
            }
        }

        let newIndex;        
        if (direction === 'forward') {
            if (imageIndex < Object.keys(assets.images.images).length - 1) {
                newIndex = imageIndex + 1;
            } else {
                newIndex = 0;
            }
        } else {
            if (imageIndex > 0) {
                newIndex = imageIndex - 1;
            } else {
                newIndex = Object.keys(assets.images.images).length - 1;
            }
        }

        this.carouselImg.src = assets.images.images[Object.keys(assets.images.images)[newIndex]];
    },
}

/***/ }),

/***/ "./src/modules/home.js":
/*!*****************************!*\
  !*** ./src/modules/home.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHome)
/* harmony export */ });
/* harmony import */ var _styles_home_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/home.css */ "./src/styles/home.css");


function buildHome() {
    console.log('buildHome running');
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Still sane?');
    header.appendChild(headerText);
    
    homeContainer.appendChild(header);
    homeContainer.appendChild(statement.render());
    homeContainer.appendChild(openHours.render());
    homeContainer.appendChild(location.render());
    return homeContainer;
}

//mission/welcome statement
const statement = {
    render: function() {
        const statementWrapper = document.createElement('div');
        statementWrapper.id = 'statement';

        const statementContainer = document.createElement('div');
        statementContainer.classList.add('container');

        const statementHeader = document.createElement('h2');
        const statementHeaderText = document.createTextNode('Placeholder');
        statementHeader.appendChild(statementHeaderText);

        const statementParagraph = document.createElement('p');
        const statementParagraphText = document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin. Enim diam vulputate ut pharetra sit amet. Vel turpis nunc eget lorem.');
        statementParagraph.appendChild(statementParagraphText);

        statementContainer.appendChild(statementHeader);
        statementContainer.appendChild(statementParagraph);
        statementWrapper.appendChild(statementContainer);

        return statementWrapper;
    },
}

//hours of operation
const openHours = {
    hours: {
        Monday: '9AM - 9PM',
        Tuesday: '9AM - 9PM',
        Wednesday: '9AM - 9PM',
        Thursday: '9AM - 9PM',
        Friday: '9AM - 9PM',
        Saturday: '10AM - 10PM',
        Sunday: 'Closed'
    },
    render: function() {
        const hoursWrapper = document.createElement('div');
        hoursWrapper.id = 'hours';

        const hoursContainer = document.createElement('div');
        hoursContainer.classList.add('container');

        const hoursHeader = document.createElement('h2');
        const hoursHeaderText = document.createTextNode('Hours');
        hoursHeader.appendChild(hoursHeaderText);

        const hoursList = document.createElement('ul');
        for (let key in this.hours) {
            let day = document.createElement('li');
            let dayText = document.createTextNode(key);
            day.appendChild(dayText);
            hoursList.appendChild(day);

            let hours = document.createElement('li');
            let hoursText = document.createTextNode(this.hours[key]);
            hours.appendChild(hoursText);
            hoursList.appendChild(hours);
        }

        hoursWrapper.appendChild(hoursContainer);
        hoursContainer.appendChild(hoursHeader);
        hoursContainer.appendChild(hoursList);
        return hoursWrapper;
    }
}

//location
const location = {
    render: function() {
        const locationWrapper = document.createElement('div');
        locationWrapper.id = 'location';

        const locationContainer = document.createElement('div');
        locationContainer.classList.add('container');

        const locationHeader = document.createElement('h2');
        const locationHeaderText = document.createTextNode('Address');
        locationHeader.appendChild(locationHeaderText);

        const locationParagraph = document.createElement('p');
        const locationParagraphText = document.createTextNode('1234 NW Placholder Rd. State, QQ 56789');
        locationParagraph.appendChild(locationParagraphText);
        locationContainer.appendChild(locationHeader);
        locationContainer.appendChild(locationParagraph);
        locationWrapper.appendChild(locationContainer);

        return locationWrapper;
    }
}

/***/ }),

/***/ "./src/modules/images.js":
/*!*******************************!*\
  !*** ./src/modules/images.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ importAll)
/* harmony export */ });
// https://webpack.js.org/guides/dependency-management/
// imports all images
// returns an object and array of images
function importAll(r) {
    let images = {};
    let imagesArr = []
    r.keys().map(item => {
        images[item.replace('./', '')] = r(item);
        imagesArr.push(item.replace('./', ''));
    });
    return { images, imagesArr };
}

/***/ }),

/***/ "./src/modules/menu.js":
/*!*****************************!*\
  !*** ./src/modules/menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMenu)
/* harmony export */ });
/* harmony import */ var _styles_menu_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/menu.css */ "./src/styles/menu.css");


function buildMenu() {
    console.log(`menu.js running`);
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Menu');
    header.appendChild(headerText);
    menuContainer.appendChild(header);

    menuContainer.appendChild(menu.render());
    return menuContainer;
}

const food = (dish, details, price) => {
    const foodName = dish;
    const foodDetails = details;
    const foodPrice = price;
    
    return {
        get dish() {
            return foodName;
        },
        get details() {
            return foodDetails;
        },
        get price() {
            return foodPrice;
        },
    }
}

const menu = {
    test: 'test',
    food: {
        pizzas: [
            food('rhoa', 'tomato sauce, mozzarella, oregano, roasted rhoa', '15.00'),
            food('pepperoni', 'tomato sauce, mozzarella, oregano, pepperoni', '10.00'),
            food('juicy one', 'ranch suace, mozzarella, parsley, BBQ beast', '12.00'),
        ],
        salads: [
            food('weta', 'romaine lettuce, cucumber, sunflower seeds, tomatoes, weta', '5.00'),
            food('perandus crunch', 'green cabbage, butterhead lettuce, almonds, croutons', '9.00'),
        ],
        desserts: [
            food(`alva's sacrifice`, 'vanilla ice cream, Atzoatl syrup, walnuts', '7.00'),
            food('the delve bar', 'azurite, oreos, dark chocolate chips, almonds', '6.00'),
        ],
    },
    render: function() {
        const foodWrapper = document.createElement('div');
        foodWrapper.id = 'menu-main';
        const foodContainer = document.createElement('div');
        foodContainer.classList.add('container');

        for (let item in this.food) {
            const menuSection = document.createElement('div');
            const menuSectionHeader = document.createElement(('h2'));
            const menuSectionHeaderText = document.createTextNode(item);
            menuSection.classList.add(item);
            menuSectionHeader.appendChild(menuSectionHeaderText);
            menuSection.appendChild(menuSectionHeader);

            this.food[item].map(food => { 
                const menuItemContainer = document.createElement('div');
                menuItemContainer.classList.add('item');
                for (let info in food) {
                    const menuItemParagraph = document.createElement('p');
                    const menuItemParagraphText = document.createTextNode(food[info])
                    menuItemParagraph.appendChild(menuItemParagraphText);
                    menuItemContainer.appendChild(menuItemParagraph)
                };
                menuSection.appendChild(menuItemContainer);
            });
            foodContainer.appendChild(menuSection)
        }
        foodWrapper.appendChild(foodContainer);
        return foodWrapper;
    }
}
//Pizzas
//Signature Pizzas
//Sides

/***/ }),

/***/ "./src/assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf":
/*!*********************************************************************************************!*\
  !*** ./src/assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7f24c0208b4b0e7af738.ttf";

/***/ }),

/***/ "./src/assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf":
/*!**************************************************************************************!*\
  !*** ./src/assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "61b71ee93d55d9bddead.ttf";

/***/ }),

/***/ "./src/assets/fonts/Teko/Teko-Light.ttf":
/*!**********************************************!*\
  !*** ./src/assets/fonts/Teko/Teko-Light.ttf ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7e9da4aa6dd421f07584.ttf";

/***/ }),

/***/ "./src/assets/fonts/Teko/Teko-Medium.ttf":
/*!***********************************************!*\
  !*** ./src/assets/fonts/Teko/Teko-Medium.ttf ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c810f95c127da691d308.ttf";

/***/ }),

/***/ "./src/assets/fonts/Teko/Teko-Regular.ttf":
/*!************************************************!*\
  !*** ./src/assets/fonts/Teko/Teko-Regular.ttf ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3419209fb7c5d9f70ce3.ttf";

/***/ }),

/***/ "./src/assets/icons/chevron_left.svg":
/*!*******************************************!*\
  !*** ./src/assets/icons/chevron_left.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3a58c5da8019cc78bea5.svg";

/***/ }),

/***/ "./src/assets/icons/chevron_right.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/chevron_right.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "43d657784c67c9d0a993.svg";

/***/ }),

/***/ "./src/assets/icons/menu.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/menu.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "132af47f7c9ff9c54b7b.svg";

/***/ }),

/***/ "./src/assets/images/dough0.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/dough0.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1806dd4489130190f3d7.jpg";

/***/ }),

/***/ "./src/assets/images/pizza0.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza0.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b0bf6eb81fd3cbdb791f.jpg";

/***/ }),

/***/ "./src/assets/images/pizza1.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza1.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e03b0d35a1cbacd654d2.jpg";

/***/ }),

/***/ "./src/assets/images/pizza2.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza2.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1b48a821e2e8c53cb82f.jpg";

/***/ }),

/***/ "./src/assets/images/pizza3.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza3.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bd0bed048e1020c2ab52.jpg";

/***/ }),

/***/ "./src/assets/images/pizza4.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza4.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7e403e6453360388445a.jpg";

/***/ }),

/***/ "./src/assets/images/pizza5.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza5.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "17b5f893b49e0f7c338c.jpg";

/***/ }),

/***/ "./src/assets/images/pizza6.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/pizza6.jpg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e26300c7a4ed29907ca4.jpg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QyxpT0FBNkY7QUFDekksNENBQTRDLCtPQUFvRztBQUNoSiw0Q0FBNEMsaUpBQXFEO0FBQ2pHLDRDQUE0QyxtSkFBc0Q7QUFDbEcsNENBQTRDLHFKQUF1RDtBQUNuRyw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1DQUFtQztBQUNsRCxjQUFjLG1DQUFtQztBQUNqRDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsY0FBYyxtQ0FBbUM7QUFDakQsY0FBYyxtQ0FBbUM7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE9BQU8sT0FBTyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFB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QUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixLQUFLO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoTDRCOztBQUViO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhO0FBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYNEI7O0FBRWI7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvYWJvdXQuY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvY29udGFjdC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9ob21lLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL21lbnUuY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9hYm91dC5jc3M/ZDExNyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2NvbnRhY3QuY3NzPzI5NjIiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9ob21lLmNzcz80YjUxIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvbWVudS5jc3M/NzAwYSIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2Fzc2V0cy9pbWFnZXMvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLmpwZyQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2Fib3V0LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2NvbnRhY3QuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvZm9vdGVyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9ob21lLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2ltYWdlcy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9tZW51LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLVZhcmlhYmxlRm9udF9ZVExDLG9wc3osd2R0aCx3Z2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL051bml0b19TYW5zL051bml0b1NhbnMtSXRhbGljLVZhcmlhYmxlRm9udF9ZVExDLG9wc3osd2R0aCx3Z2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1MaWdodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9UZWtvL1Rla28tTWVkaXVtLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiAnTnVuaXRvIFNhbnMnO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiAnVGVrbyc7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fX30pO1xufVxuXG46cm9vdCB7XG4gICAgLyogY29sb3IgcGFsZXR0ZSAqL1xuICAgIC8qIGh0dHBzOi8vY29vbG9ycy5jby8zMjBlM2ItZTU2Mzk5LTdmOTZmZi1hNmNmZDUtZGJmY2ZmICovXG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnk6ICNGM0ZDRjA7XG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXNlY29uZGFyeTogI0ZGRDIzRjtcbiAgICAtLWFjY2VudC1jb2xvci1wcmltYXJ5OiAjRUU0MjY2O1xuICAgIC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeTogIzFGMjcxQjtcbiAgICAtLWFjY2VudC1jb2xvci10ZXJ0aWFyeTogIzU0MEQ2RTtcbiAgICAtLWZvbnQtZmFtaWx5LXByaW1hcnk6ICdUZWtvJywgYXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgLS1mb250LWZhbWlseS1zZWNvbmRhcnk6ICdOdW5pdG8gU2FucycsIGFyaWFsLCBzYW5zLXNlcmlmO1xuICAgIC0tcGFkZGluZy1jb250YWluZXI6IDAuNXJlbTtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgbWF4LXdpZHRoOiAxMDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XG59XG5cbiNuYXZiYXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA1cHggMC41cHggYmxhY2s7XG59XG5cbi5saW5rcyB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQ7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHRvcDogMDtcbiAgICBnYXA6IDAuNXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXNlY29uZGFyeSk7XG59XG5cbi5saW5rcyA+IGxpID4gYSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcbn1cblxuLmxpbmtzID4gbGkgPiBhOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi5saW5rcyA+IGxpID4gYS5hY3RpdmUge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG59XG5cbi5tZW51IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi5tZW51ID4gaW1nIHtcbiAgICBtYXgtd2lkdGg6IDMycHg7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAxMHB4IDJweCBibGFjaztcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDMuNXJlbSwgMTh2dywgMTByZW0pO1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDEuNXZ3O1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgZGlzcGxheTogZ3JpZDtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSB7XG4gICAgcmlnaHQ6IDA7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24gPiBpbWcge1xuICAgIHdpZHRoOiBjbGFtcCgycmVtLCA1dncsIDVyZW0pO1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoMTAwJSkgc2VwaWEoMyUpIHNhdHVyYXRlKDIlKSBodWUtcm90YXRlKDY0ZGVnKSBicmlnaHRuZXNzKDEwOCUpIGNvbnRyYXN0KDEwMSUpO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiAuY2Fyb3VzZWwtaXRlbSA+IGltZyB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG59XG5cbmgxLCBoMiwgaDMsIGg1IHtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbiNjb250ZW50IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuI2NvbnRlbnQgPiAqIHtcbiAgICBzY3JvbGwtbWFyZ2luLXRvcDogMnJlbTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHJvdy1nYXA6IDFyZW07XG59XG5cbiNjb250ZW50ID4gKiA+IGgxIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAtMnJlbTtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMi41cmVtLCA1dncsIDRyZW0pO1xufVxuXG4jY29udGVudCA+ICogPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdhcDogMXJlbTtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xuXG4gICAgYm9yZGVyOiA5cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgb3V0bGluZS1vZmZzZXQ6IC0yMHB4O1xuICAgIG91dGxpbmUtc3R5bGU6IGF1dG87XG59XG5cbiNjb250ZW50ID4gKiA+ICo6bm90KGgxKSA+IC5jb250YWluZXIgPiAqIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcbn1cblxuZm9vdGVyIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDdweCAzcHggYmxhY2s7XG59XG5cbmZvb3RlciA+IC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbmZvb3RlciA+IC5jb250YWluZXIgPiBoNSB7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAubGlua3Mge1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCBtYXgtY29udGVudCk7XG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiBtaW4tY29udGVudDtcbiAgICAgICAgdG9wOiAwO1xuICAgIH1cblxuICAgIC5tZW51IHtcbiAgICAgICAgLyogZGlzcGxheTogbm9uZTsgKi9cbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksMEJBQTBCO0lBQzFCOytDQUMrRjtBQUNuRzs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQjs7K0NBRStDO0FBQ25EOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLDBEQUEwRDtJQUMxRCxtQ0FBbUM7SUFDbkMscUNBQXFDO0lBQ3JDLCtCQUErQjtJQUMvQixpQ0FBaUM7SUFDakMsZ0NBQWdDO0lBQ2hDLGdEQUFnRDtJQUNoRCx5REFBeUQ7SUFDekQsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGlEQUFpRDtJQUNqRCxhQUFhO0lBQ2IsK0NBQStDO0FBQ25EOztBQUVBO0lBQ0ksZUFBZTtJQUNmLE1BQU07SUFDTixRQUFRO0lBQ1IsZUFBZTtJQUNmLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLDZDQUE2QztJQUM3QyxtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsMkJBQTJCO0lBQzNCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7SUFDWixNQUFNO0lBQ04sV0FBVztJQUNYLG1EQUFtRDtBQUN2RDs7QUFFQTtJQUNJLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIsZUFBZTtJQUNmLHlDQUF5QztJQUN6QyxnQkFBZ0I7SUFDaEIsb0NBQW9DO0lBQ3BDLHlCQUF5QjtJQUN6QixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSwrQ0FBK0M7SUFDL0Msc0NBQXNDO0lBQ3RDLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxxQ0FBcUM7SUFDckMsa0NBQWtDO0lBQ2xDLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLFFBQVE7QUFDWjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QiwwSEFBMEg7QUFDOUg7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QyxvQ0FBb0M7SUFDcEMseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsZ0JBQWdCO0lBQ2hCLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYixTQUFTO0lBQ1QsYUFBYTtJQUNiLHlDQUF5Qzs7SUFFekMsNkJBQTZCO0lBQzdCLHFCQUFxQjtJQUNyQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbURBQW1EO0lBQ25ELHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2Q0FBNkM7SUFDN0MsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJO1FBQ0ksYUFBYTtRQUNiLDZDQUE2QztRQUM3QyxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixNQUFNO0lBQ1Y7O0lBRUE7UUFDSSxtQkFBbUI7SUFDdkI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLVZhcmlhYmxlRm9udF9ZVExDXFxcXCxvcHN6XFxcXCx3ZHRoXFxcXCx3Z2h0LnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLUl0YWxpYy1WYXJpYWJsZUZvbnRfWVRMQ1xcXFwsb3BzelxcXFwsd2R0aFxcXFwsd2dodC50dGYnKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnVGVrbyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9UZWtvL1Rla28tTGlnaHQudHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1NZWRpdW0udHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1SZWd1bGFyLnR0ZicpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAgIC8qIGNvbG9yIHBhbGV0dGUgKi9cXG4gICAgLyogaHR0cHM6Ly9jb29sb3JzLmNvLzMyMGUzYi1lNTYzOTktN2Y5NmZmLWE2Y2ZkNS1kYmZjZmYgKi9cXG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnk6ICNGM0ZDRjA7XFxuICAgIC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnk6ICNGRkQyM0Y7XFxuICAgIC0tYWNjZW50LWNvbG9yLXByaW1hcnk6ICNFRTQyNjY7XFxuICAgIC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeTogIzFGMjcxQjtcXG4gICAgLS1hY2NlbnQtY29sb3ItdGVydGlhcnk6ICM1NDBENkU7XFxuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1Rla28nLCBhcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgLS1mb250LWZhbWlseS1zZWNvbmRhcnk6ICdOdW5pdG8gU2FucycsIGFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAtLXBhZGRpbmctY29udGFpbmVyOiAwLjVyZW07XFxufVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgbWF4LXdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XFxufVxcblxcbiNuYXZiYXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XFxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggNXB4IDAuNXB4IGJsYWNrO1xcbn1cXG5cXG4ubGlua3Mge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQ7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgdG9wOiAwO1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xcbn1cXG5cXG4ubGlua3MgPiBsaSA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbi5saW5rcyA+IGxpID4gYS5hY3RpdmUge1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbn1cXG5cXG4ubWVudSB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbi5tZW51ID4gaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAzMnB4O1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDEwcHggMnB4IGJsYWNrO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDEge1xcbiAgICBmb250LXNpemU6IGNsYW1wKDMuNXJlbSwgMTh2dywgMTByZW0pO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpsYXN0LW9mLXR5cGUge1xcbiAgICByaWdodDogMDtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbiA+IGltZyB7XFxuICAgIHdpZHRoOiBjbGFtcCgycmVtLCA1dncsIDVyZW0pO1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDEwMCUpIHNlcGlhKDMlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSg2NGRlZykgYnJpZ2h0bmVzcygxMDglKSBjb250cmFzdCgxMDElKTtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWluLXdpZHRoOiAxMDAlO1xcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IC5jYXJvdXNlbC1pdGVtID4gaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuXFxuaDEsIGgyLCBoMywgaDUge1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI2NvbnRlbnQgPiAqIHtcXG4gICAgc2Nyb2xsLW1hcmdpbi10b3A6IDJyZW07XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbiNjb250ZW50ID4gKiA+IGgxIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAtMnJlbTtcXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgyLjVyZW0sIDV2dywgNHJlbSk7XFxufVxcblxcbiNjb250ZW50ID4gKiA+ICo6bm90KGgxKSA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBnYXA6IDFyZW07XFxuICAgIHBhZGRpbmc6IDFyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xcblxcbiAgICBib3JkZXI6IDlweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgb3V0bGluZS1vZmZzZXQ6IC0yMHB4O1xcbiAgICBvdXRsaW5lLXN0eWxlOiBhdXRvO1xcbn1cXG5cXG4jY29udGVudCA+ICogPiAqOm5vdChoMSkgPiAuY29udGFpbmVyID4gKiB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCA3cHggM3B4IGJsYWNrO1xcbn1cXG5cXG5mb290ZXIgPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmZvb3RlciA+IC5jb250YWluZXIgPiBoNSB7XFxuICAgIGxldHRlci1zcGFjaW5nOiAycHg7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgIC5saW5rcyB7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgbWF4LWNvbnRlbnQpO1xcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgICAgIHdpZHRoOiAxMDB2dztcXG4gICAgICAgIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICAgICAgICB0b3A6IDA7XFxuICAgIH1cXG5cXG4gICAgLm1lbnUge1xcbiAgICAgICAgLyogZGlzcGxheTogbm9uZTsgKi9cXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNhYm91dC1tYWluID4gLmNvbnRhaW5lciA+IHAsXG4jaGlzdG9yeSA+IC5jb250YWluZXIgPiAuaXRlbSA+IDpsYXN0LWNoaWxkIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMi4yNXJlbSk7XG59XG5cbiNhYm91dCA+ICNoaXN0b3J5ID4gLmNvbnRhaW5lciA+IC5pdGVtID4gaDMge1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAxMHZ3LCAyLjVyZW0pO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9hYm91dC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7O0lBRUksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksc0NBQXNDO0FBQzFDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNhYm91dC1tYWluID4gLmNvbnRhaW5lciA+IHAsXFxuI2hpc3RvcnkgPiAuY29udGFpbmVyID4gLml0ZW0gPiA6bGFzdC1jaGlsZCB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgNXZ3LCAyLjI1cmVtKTtcXG59XFxuXFxuI2Fib3V0ID4gI2hpc3RvcnkgPiAuY29udGFpbmVyID4gLml0ZW0gPiBoMyB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAxMHZ3LCAyLjVyZW0pO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGxhYmVsID4gLmFzdGVyaWsge1xuICAgIGNvbG9yOiByZWQ7XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+OmZpcnN0LWNoaWxkIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMS41cmVtKTtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSB7XG4gICAgZGlzcGxheTogZ3JpZDtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+IGxhYmVsIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMTB2dywgMnJlbSk7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4vKiBzZWxlY3RzIGlucHV0cyBhbmQgdGV4dGFyZWEgKi9cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiAqOm50aC1jaGlsZChuICsgMikge1xuICAgIGZvbnQtc2l6ZTogY2xhbSgxcmVtLCAxMHZ3LCAycmVtKTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjM1cmVtO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiAqOm50aC1jaGlsZChuICsgMik6OnBsYWNlaG9sZGVyIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIHRleHQtaW5kZW50OiA1JTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKTpmb2N1cyB7XG4gICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b24ge1xuICAgIHBhZGRpbmc6IDAuNzVyZW0gNHJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4IGJsYWNrO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b246YWN0aXZlIHtcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAxcHggYmxhY2tcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAjZm9ybSA+IC5jb250YWluZXIge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIH1cblxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IGxhYmVsIHtcbiAgICAgICAgZ3JpZC1hcmVhOiAxIC8gc3BhbiAyO1xuICAgIH1cblxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAgIGdyaWQtYXJlYTogMiAvIHNwYW4gMjtcbiAgICB9XG5cbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOm50aC1vZi10eXBlKDQpIHtcbiAgICAgICAgZ3JpZC1hcmVhOiA0IC8gc3BhbiAyXG4gICAgfVxuXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LW9mLXR5cGUge1xuICAgICAgICBncmlkLWFyZWE6IDUgLyBzcGFuIDI7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jb250YWN0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLG1DQUFtQztJQUNuQywwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGdCQUFnQjtJQUNoQix5QkFBeUI7QUFDN0I7O0FBRUEsZ0NBQWdDO0FBQ2hDO0lBQ0ksaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLCtDQUErQztJQUMvQyxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQiw2Q0FBNkM7SUFDN0MsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0k7QUFDSjs7QUFFQTtJQUNJO1FBQ0kscUNBQXFDO0lBQ3pDOztJQUVBO1FBQ0kscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0kscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0k7SUFDSjs7SUFFQTtRQUNJLHFCQUFxQjtJQUN6QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImxhYmVsID4gLmFzdGVyaWsge1xcbiAgICBjb2xvcjogcmVkO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPjpmaXJzdC1jaGlsZCB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgNXZ3LCAxLjVyZW0pO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiBsYWJlbCB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAxMHZ3LCAycmVtKTtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLyogc2VsZWN0cyBpbnB1dHMgYW5kIHRleHRhcmVhICovXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKSB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbSgxcmVtLCAxMHZ3LCAycmVtKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpOjpwbGFjZWhvbGRlciB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIHRleHQtaW5kZW50OiA1JTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKTpmb2N1cyB7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b24ge1xcbiAgICBwYWRkaW5nOiAwLjc1cmVtIDRyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAwcHggYmxhY2s7XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCA+IGJ1dHRvbjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAxcHggYmxhY2tcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICAgIH1cXG5cXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gbGFiZWwge1xcbiAgICAgICAgZ3JpZC1hcmVhOiAxIC8gc3BhbiAyO1xcbiAgICB9XFxuXFxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06Zmlyc3Qtb2YtdHlwZSB7XFxuICAgICAgICBncmlkLWFyZWE6IDIgLyBzcGFuIDI7XFxuICAgIH1cXG5cXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpudGgtb2YtdHlwZSg0KSB7XFxuICAgICAgICBncmlkLWFyZWE6IDQgLyBzcGFuIDJcXG4gICAgfVxcblxcbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3Qtb2YtdHlwZSB7XFxuICAgICAgICBncmlkLWFyZWE6IDUgLyBzcGFuIDI7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjaG9tZSA+ICo6bm90KGgxKSA+IC5jb250YWluZXIge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMnJlbSk7XG59XG5cbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICBjb2x1bW4tZ2FwOiA1dnc7XG59XG5cbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgybiAtIDEgKSB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgybikge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2hvbWUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2hvbWUgPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMnJlbSk7XFxufVxcblxcbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgY29sdW1uLWdhcDogNXZ3O1xcbn1cXG5cXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCA+IDpudGgtY2hpbGQoMm4gLSAxICkge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwgPiA6bnRoLWNoaWxkKDJuKSB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgcm93LWdhcDogMXJlbTtcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiBoMiB7XG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDEwdncsIDJyZW0pO1xufVxuXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtIHtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmZpcnN0LWNoaWxkIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6Zmlyc3QtY2hpbGQ6OmFmdGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgY29udGVudDogJyAnO1xuICAgIHdpZHRoOiA3NSU7XG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IGRvdHRlZCBibGFjaztcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6bnRoLWNoaWxkKG4gKyAyKSB7XG4gICAgdGV4dC1hbGlnbjogZW5kO1xuICAgIHRleHQtd3JhcDogYmFsYW5jZTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAjY29udGVudCA+ICNtZW51ID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDBCQUEwQjtJQUMxQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsT0FBTztJQUNQLFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtJQUNWLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO1FBQ0kscUNBQXFDO0lBQ3pDO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICoge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IGgyIHtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDEwdncsIDJyZW0pO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtIHtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6Zmlyc3QtY2hpbGQ6OmFmdGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgd2lkdGg6IDc1JTtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IGRvdHRlZCBibGFjaztcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6bnRoLWNoaWxkKG4gKyAyKSB7XFxuICAgIHRleHQtYWxpZ246IGVuZDtcXG4gICAgdGV4dC13cmFwOiBiYWxhbmNlO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNjb250ZW50ID4gI21lbnUgPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Fib3V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYWJvdXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NvbnRhY3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jb250YWN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVudS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vbWVudS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWVudS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2RvdWdoMC5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL2RvdWdoMC5qcGdcIixcblx0XCIuL3BpenphMC5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMC5qcGdcIixcblx0XCIuL3BpenphMS5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMS5qcGdcIixcblx0XCIuL3BpenphMi5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMi5qcGdcIixcblx0XCIuL3BpenphMy5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMy5qcGdcIixcblx0XCIuL3BpenphNC5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphNC5qcGdcIixcblx0XCIuL3BpenphNS5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphNS5qcGdcIixcblx0XCIuL3BpenphNi5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphNi5qcGdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ltYWdlcyBzeW5jIFxcXFwuanBnJFwiOyIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IGJ1aWxkSGVhZGVyIGZyb20gJy4vbW9kdWxlcy9oZWFkZXIuanMnO1xuaW1wb3J0IGJ1aWxkSG9tZSBmcm9tICcuL21vZHVsZXMvaG9tZS5qcyc7XG5pbXBvcnQgYnVpbGRBYm91dCBmcm9tICcuL21vZHVsZXMvYWJvdXQuanMnO1xuaW1wb3J0IGJ1aWxkTWVudSBmcm9tICcuL21vZHVsZXMvbWVudS5qcyc7XG5pbXBvcnQgYnVpbGRDb250YWN0IGZyb20gJy4vbW9kdWxlcy9jb250YWN0LmpzJztcbmltcG9ydCBidWlsZEZvb3RlciBmcm9tICcuL21vZHVsZXMvZm9vdGVyLmpzJztcblxuY29uc3QgaG9tZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBidWlsZCA9IHtcbiAgICAgICAgaGVhZGVyOiBidWlsZEhlYWRlcixcbiAgICAgICAgaG9tZTogYnVpbGRIb21lLFxuICAgICAgICBhYm91dDogYnVpbGRBYm91dCxcbiAgICAgICAgbWVudTogYnVpbGRNZW51LFxuICAgICAgICBjb250YWN0OiBidWlsZENvbnRhY3QsXG4gICAgICAgIGZvb3RlcjogYnVpbGRGb290ZXIsXG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgICAgYWN0aXZlVGFiOiBudWxsLFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJ1aWxkLmhlYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5jYWNoZURPTSgpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgYnVpbGQuZm9vdGVyKCk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKTtcbiAgICAgICAgICAgIHRoaXMubmF2QmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hdmJhcicpO1xuICAgICAgICAgICAgdGhpcy5uYXZJdGVtcyA9IEFycmF5LmZyb20odGhpcy5uYXZCYXIucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lciB1bCBsaSBhJykpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZC5ob21lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lci5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYihjb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5hdkl0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zd2l0Y2hUYWIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3dpdGNoVGFiOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidWlsZCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoa2V5KSAmJiAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldEFjdGl2ZVRhYjogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5uYXZJdGVtcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTmFtZSA9PT0gY29udGVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgY29udGVudC5pbml0KCk7XG59KSgpOyIsImltcG9ydCAnLi4vc3R5bGVzL2Fib3V0LmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQWJvdXQoKSB7XG4gICAgY29uc29sZS5sb2coYGFib3V0LmpzIHJ1bm5pbmdgKTtcbiAgICBjb25zdCBhYm91dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFib3V0Q29udGFpbmVyLmlkID0gJ2Fib3V0JztcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdBYm91dCcpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBhYm91dENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIFxuICAgIGFib3V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGFib3V0TWFpbi5yZW5kZXIoKSk7XG4gICAgYWJvdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoYWJvdXRIaXN0b3J5LnJlbmRlcigpKTtcbiAgICByZXR1cm4gYWJvdXRDb250YWluZXI7XG59XG5cbmNvbnN0IGFib3V0TWFpbiA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gJ1Zhcml1cyBtb3JiaSBlbmltIG51bmMgZmF1Y2lidXMgYSBwZWxsZW50ZXNxdWUgc2l0IGFtZXQgcG9ydHRpdG9yLiBNYWduYSBlZ2V0IGVzdCBsb3JlbSBpcHN1bSBkb2xvciBzaXQuIEFyY3UgZmVsaXMgYmliZW5kdW0gdXQgdHJpc3RpcXVlIGV0LiBUZW1wdXMgaW1wZXJkaWV0IG51bGxhIG1hbGVzdWFkYSBwZWxsZW50ZXNxdWUgZWxpdCBlZ2V0IGdyYXZpZGEgY3VtLiBWaXZlcnJhIG9yY2kgc2FnaXR0aXMgZXUgdm9sdXRwYXQgb2Rpby4gSWQgbmliaCB0b3J0b3IgaWQgYWxpcXVldC4gRmF1Y2lidXMgbmlzbCB0aW5jaWR1bnQgZWdldCBudWxsYW0uIEVnZXN0YXMgcXVpcyBpcHN1bSBzdXNwZW5kaXNzZSB1bHRyaWNlcy4gU3VzcGVuZGlzc2UgcG90ZW50aSBudWxsYW0gYWMgdG9ydG9yIHZpdGFlIHB1cnVzIGZhdWNpYnVzLiBUaW5jaWR1bnQgZWdldCBudWxsYW0gbm9uIG5pc2kgZXN0IHNpdC4nO1xuICAgICAgICBjb25zdCBhYm91dE1haW5XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFib3V0TWFpbldyYXBwZXIuaWQgPSAnYWJvdXQtbWFpbic7XG5cbiAgICAgICAgY29uc3QgYWJvdXRNYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFib3V0TWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBhYm91dE1haW5QYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IGFib3V0TWFpblBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgYWJvdXRNYWluUGFyYWdyYXBoLmFwcGVuZENoaWxkKGFib3V0TWFpblBhcmFncmFwaFRleHQpO1xuICAgICAgICBhYm91dE1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoYWJvdXRNYWluUGFyYWdyYXBoKTtcbiAgICAgICAgYWJvdXRNYWluV3JhcHBlci5hcHBlbmRDaGlsZChhYm91dE1haW5Db250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhYm91dE1haW5XcmFwcGVyO1xuICAgIH1cbn1cblxuY29uc3QgYWJvdXRIaXN0b3J5ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGhpc3RvcnlXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhpc3RvcnlXcmFwcGVyLmlkID0gJ2hpc3RvcnknO1xuXG4gICAgICAgIGNvbnN0IGhpc3RvcnlNYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhpc3RvcnlNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmhpc3RvcnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhpc3RvcnlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaXRlbScpO1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeUhlYWRpbmdUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7a2V5fSwgJHt0aGlzLmhpc3Rvcnlba2V5XVswXX1gKTtcbiAgICAgICAgICAgIGhpc3RvcnlIZWFkaW5nLmFwcGVuZENoaWxkKGhpc3RvcnlIZWFkaW5nVGV4dCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5UGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuaGlzdG9yeVtrZXldWzFdKTtcbiAgICAgICAgICAgIGhpc3RvcnlQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoaGlzdG9yeVBhcmFncmFwaFRleHQpO1xuXG4gICAgICAgICAgICBoaXN0b3J5Q29udGFpbmVyLmFwcGVuZENoaWxkKGhpc3RvcnlIZWFkaW5nKTtcbiAgICAgICAgICAgIGhpc3RvcnlDb250YWluZXIuYXBwZW5kQ2hpbGQoaGlzdG9yeVBhcmFncmFwaCk7XG4gICAgICAgICAgICBoaXN0b3J5TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChoaXN0b3J5Q29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhpc3RvcnlXcmFwcGVyLmFwcGVuZENoaWxkKGhpc3RvcnlNYWluQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gaGlzdG9yeVdyYXBwZXI7XG4gICAgfSxcbiAgICBoaXN0b3J5OiB7XG4gICAgICAgIDIwMTM6IFsnVHdpbGlnaHQgU3RyYW5kJywgJ0NvbWluZyBmcm9tIEFzY2Fsb24sIHdlIHN0cml2ZWQgdG8gZmVlZCB0aG91c2FuZHMgb2YgZXhpbGVzIHdpdGggZmFtaWxpYXIgZGlzaGVzLiBXZSBzdGFydGVkIGNvb2tpbmcgcGl6emFzIG9uIGEgc21hbGwgZm9vZCBjYXJ0IHdpdGggYSBob21lbWFkZSBwaXp6YSBvdmVuLCBhbmQgcHVsbGVkIG91ciBzZXJ2aWNlIGFjcm9zcyBUaGUgTXVkIEZsYXRzLiddLFxuICAgICAgICAyMDE0OiBbJ1dldGxhbmRzJywgJ091ciBmaXJzdCBmb29kIHRydWNrIGhpdCB0aGUgem9uZSBvZmZlcmluZyBtb3JlIGZvb2QgY2hvaWNlcyB3aWRlbHkga25vd24gdG8gbG9jYWxzLiddLFxuICAgICAgICAyMDE1OiBbJ1Nhcm4gRW5jYW1wbWVudCcsICdPdXIgb3Blbi1jb25jZXB0IHJlc3RhdXJhbnQgb3BlbmVkIHVwIHRvIHRoZSB1bmRlYWQsIEJsYWNrZ3VhcmQgc29saWRlcnMgYW5kIHBhc3NpbmcgZXhpbGVzLiddLFxuICAgIH0sXG59IiwiaW1wb3J0ICcuLi9zdHlsZXMvY29udGFjdC5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZENvbnRhY3QoKSB7XG4gICAgY29uc29sZS5sb2coYGNvbnRhY3QuanMgcnVubmluZ2ApO1xuICAgIGNvbnN0IGNvbnRhY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWN0Q29udGFpbmVyLmlkID0gJ2NvbnRhY3QnO1xuICAgIFxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDb250YWN0Jyk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIGNvbnRhY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnRhY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybS5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGNvbnRhY3RDb250YWluZXI7XG59XG5cbmNvbnN0IGZvcm0gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGZvcm1FbGVtZW50LmlkID0gJ2Zvcm0nXG5cbiAgICAgICAgY29uc3QgZm9ybVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9ybVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgZm9ybU5vdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGNvbnN0IGZvcm1Ob3RlTGFiZWxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyBJbmRpY2F0ZXMgcmVxdWlyZWQgZmllbGQnKTtcbiAgICAgICAgY29uc3QgZm9ybU5vdGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBmb3JtTm90ZVNwYW5UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyonKTtcbiAgICAgICAgZm9ybU5vdGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2FzdGVyaWsnKTtcblxuICAgICAgICBmb3JtTm90ZVNwYW4uYXBwZW5kQ2hpbGQoZm9ybU5vdGVTcGFuVGV4dCk7XG4gICAgICAgIGZvcm1Ob3RlTGFiZWwuYXBwZW5kQ2hpbGQoZm9ybU5vdGVTcGFuKTtcbiAgICAgICAgZm9ybU5vdGVMYWJlbC5hcHBlbmRDaGlsZChmb3JtTm90ZUxhYmVsVGV4dCk7XG4gICAgICAgIGZvcm1XcmFwcGVyLmFwcGVuZENoaWxkKGZvcm1Ob3RlTGFiZWwpO1xuICAgICAgICBmb3IgKGxldCBpbnB1dHMgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybS1pdGVtJyk7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dHMgIT09ICdzdWJtaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2lucHV0c30gYCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2FzdGVyaWsnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcqJyk7XG4gICAgICAgICAgICAgICAgbGFiZWwuaHRtbEZvciA9IGlucHV0cztcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChsYWJlbFRleHQpO1xuICAgICAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoc3BhblRleHQpO1xuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnB1dHMgIT09ICdtZXNzYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmlkID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0LCB0aGlzLmF0dHJpYnV0ZXNbaW5wdXRzXSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHRBcmVhLmlkID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBhdHRyIGluIHRoaXMuYXR0cmlidXRlc1tpbnB1dHNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QXJlYS5zZXRBdHRyaWJ1dGUoYXR0ciwgdGhpcy5hdHRyaWJ1dGVzW2lucHV0c11bYXR0cl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5pZCA9IGlucHV0cztcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdXR0b25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1N1Ym1pdCcpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3VibWl0QnV0dG9uLCB0aGlzLmF0dHJpYnV0ZXNbaW5wdXRzXSk7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvblRleHQpO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1XcmFwcGVyLmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1XcmFwcGVyKTtcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xuICAgIH0sXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdmdWxsIG5hbWUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICBpZDogJ2VtYWlsJyxcbiAgICAgICAgICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgICAgICAgICB0eXBlOiAnZW1haWwnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdlbWFpbEBhZGRyZXNzLmNvbScsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgcGhvbmU6IHtcbiAgICAgICAgICAgIGlkOiAncGhvbmUnLFxuICAgICAgICAgICAgbmFtZTogJ3Bob25lJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZWwnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdYWFgtWFhYLVhYWFgnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIGlkOiAnbWVzc2FnZScsXG4gICAgICAgICAgICBuYW1lOiAnbWVzc2FnZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3lvdXIgbWVzc2FnZSBoZXJlICg1MDAgY2hhcmFjdGVycyBtYXgpJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICB9LFxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZvb3RlcigpIHtcbiAgICBjb25zdCBmb290ZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG5cbiAgICBjb25zdCBmb290ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb290ZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBmb290ZXJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgIGNvbnN0IGZvb3RlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnUGxhY2Vob2xkZXInKTtcbiAgICBcbiAgICBmb290ZXJIZWFkZXIuYXBwZW5kQ2hpbGQoZm9vdGVyVGV4dCk7XG4gICAgZm9vdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3RlckhlYWRlcik7XG4gICAgZm9vdGVyV3JhcHBlci5hcHBlbmRDaGlsZChmb290ZXJDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXJXcmFwcGVyKTtcbn0iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4vaW1hZ2VzLmpzJztcblxuY29uc3QgYXNzZXRzID0ge1xuICAgIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi9hc3NldHMvaWNvbnMvJywgZmFsc2UsIC9cXC5zdmckLykpLFxuICAgIGltYWdlczogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vYXNzZXRzL2ltYWdlcy8nLCBmYWxzZSwgL1xcLmpwZyQvKSksXG59XG5cbmNvbnN0IG5hdkxpbmtzID0gWydob21lJywgJ2Fib3V0JywgJ21lbnUnLCAnY29udGFjdCddO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcigpIHtcbiAgICBjb25zb2xlLmxvZyhgbmF2YmFyLmpzIHJ1bm5pbmdgKTsgLy9mb3IgZGVidWdnaW5nXG4gICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IGhlcm9XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBoZXJvVGV4dFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZXJvVGV4dFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGVyby10ZXh0Jyk7XG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGluZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgRXhpbGUncyBQaXp6YWApO1xuICAgIGhlcm9XcmFwcGVyLmlkID0gJ2hlcm8nO1xuXG4gICAgY29uc3QgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlcm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICBoZXJvVGV4dFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgaGVyb1dyYXBwZXIuYXBwZW5kQ2hpbGQoaGVyb0NvbnRhaW5lcik7XG4gICAgaGVhZGluZy5hcHBlbmRDaGlsZChoZWFkaW5nVGV4dCk7XG4gICAgaGVyb0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZXJvVGV4dFdyYXBwZXIpO1xuICAgIGhlcm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW1hZ2VDYXJvdXNlbC5yZW5kZXIoKSk7XG4gICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZXJvV3JhcHBlcik7XG5cbiAgICBoZWFkZXJFbGVtZW50Lmluc2VydEJlZm9yZShuYXYucmVuZGVyKCksIGhlcm9XcmFwcGVyKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShoZWFkZXJFbGVtZW50LCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuXG4gICAgXG59XG5cbmNvbnN0IG5hdiA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgIGNvbnN0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIG5hdkVsZW1lbnQuaWQgPSAnbmF2YmFyJztcbiAgICAgICAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgIFxuICAgICAgICBjb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgbmF2TGlzdC5jbGFzc0xpc3QuYWRkKCdsaW5rcycpO1xuXG4gICAgICAgIG5hdkxpbmtzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGFuY2hvci5ocmVmID0gYCMke2l0ZW19YDtcbiAgICAgICAgICAgIGFuY2hvci5jbGFzc0xpc3QuYWRkKGl0ZW0pO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgbmF2SXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChuYXZJdGVtVGV4dCk7XG4gICAgICAgICAgICBuYXZJdGVtLmFwcGVuZENoaWxkKGFuY2hvcik7XG4gICAgICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkl0ZW0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIG5hdk1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IG5hdk1lbnVJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgbmF2TWVudUltZy5zcmMgPSBhc3NldHMuaWNvbnMuaW1hZ2VzWydtZW51LnN2ZyddO1xuICAgICAgICBuYXZNZW51LmFwcGVuZENoaWxkKG5hdk1lbnVJbWcpO1xuICAgICAgICBuYXZNZW51LmNsYXNzTGlzdC5hZGQoJ21lbnUnKTtcbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5hdk1lbnUpO1xuXG4gICAgICAgIG5hdkNvbnRhaW5lci5hcHBlbmRDaGlsZChuYXZMaXN0KTtcbiAgICAgICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZDb250YWluZXIpO1xuICAgICAgICB0aGlzLmNhY2hlRE9NKG5hdk1lbnUsIG5hdkxpc3QpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgcmV0dXJuIG5hdkVsZW1lbnQ7XG4gICAgfSxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oYnRuLCB1bCkge1xuICAgICAgICBjb25zb2xlLmxvZyhidG4pO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ0bjtcbiAgICAgICAgdGhpcy5tZW51ID0gdWw7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50b2dnbGVNZW51ID0gdGhpcy50b2dnbGVNZW51LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVNZW51KTtcbiAgICAgICAgdGhpcy5tZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVNZW51KTtcbiAgICAgICAgLy8gdGhpcy5nZXRXaW5kb3dXaWR0aCA9IHRoaXMuZ2V0V2luZG93V2lkdGguYmluZCh0aGlzKTtcbiAgICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZ2V0V2luZG93V2lkdGgpO1xuICAgIH0sXG4gICAgcmVtb3ZlRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU1lbnUpO1xuICAgICAgICB0aGlzLm1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU1lbnUpO1xuICAgIH0sXG4gICAgdG9nZ2xlTWVudTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBpc1ByZXNzZWQgPSBKU09OLnBhcnNlKHRoaXMuYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJykpID09IHRydWUgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgIWlzUHJlc3NlZCk7XG4gICAgICAgIGxldCBkaXNwbGF5O1xuICAgICAgICBpc1ByZXNzZWQgPyBkaXNwbGF5ID0gJ25vbmUnIDogZGlzcGxheSA9ICdncmlkJztcbiAgICAgICAgdGhpcy5tZW51LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIH0sXG4gICAgZ2V0V2luZG93V2lkdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB9LFxufVxuXG5cbi8vaW1hZ2VzIHNsaWRlc2hvd1xuY29uc3QgaW1hZ2VDYXJvdXNlbCA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBjYXJvdXNlbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2Fyb3VzZWxXcmFwcGVyLmlkID0gJ2Nhcm91c2VsJztcbiAgICAgICAgY29uc3QgY2Fyb3VzZWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2Fyb3VzZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgY2Fyb3VzZWxJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhcm91c2VsSXRlbS5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC1pdGVtJyk7XG5cbiAgICAgICAgY29uc3QgY2Fyb3VzZWxJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgY2Fyb3VzZWxJbWcuc3JjID0gYXNzZXRzLmltYWdlcy5pbWFnZXNbJ3BpenphMC5qcGcnXTtcblxuICAgICAgICBjb25zdCBidXR0b25CYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkJhY2suY2xhc3NMaXN0LmFkZCgnYnRuLWNhcm91c2VsJywgJ2JhY2snKTtcbiAgICAgICAgY29uc3QgaW1hZ2VCYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltYWdlQmFjay5zcmMgPSBhc3NldHMuaWNvbnMuaW1hZ2VzWydjaGV2cm9uX2xlZnQuc3ZnJ107XG4gICAgICAgIGJ1dHRvbkJhY2suYXBwZW5kQ2hpbGQoaW1hZ2VCYWNrKTtcblxuICAgICAgICBjb25zdCBidXR0b25Gb3J3YXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkZvcndhcmQuY2xhc3NMaXN0LmFkZCgnYnRuLWNhcm91c2VsJywgJ2ZvcndhcmQnKTtcbiAgICAgICAgY29uc3QgaW1hZ2VGb3J3YXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltYWdlRm9yd2FyZC5zcmMgPSBhc3NldHMuaWNvbnMuaW1hZ2VzWydjaGV2cm9uX3JpZ2h0LnN2ZyddO1xuICAgICAgICBidXR0b25Gb3J3YXJkLmFwcGVuZENoaWxkKGltYWdlRm9yd2FyZCk7XG4gICAgICAgIHRoaXMuY2FjaGVET00oY2Fyb3VzZWxJbWcsIGJ1dHRvbkJhY2ssIGJ1dHRvbkZvcndhcmQpO1xuXG4gICAgICAgIGNhcm91c2VsQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkJhY2spO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Gb3J3YXJkKTtcblxuICAgICAgICBjYXJvdXNlbEl0ZW0uYXBwZW5kQ2hpbGQoY2Fyb3VzZWxJbWcpO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJvdXNlbEl0ZW0pO1xuICAgICAgICBjYXJvdXNlbFdyYXBwZXIuYXBwZW5kQ2hpbGQoY2Fyb3VzZWxDb250YWluZXIpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgcmV0dXJuIGNhcm91c2VsV3JhcHBlcjtcbiAgICB9LFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihpbWFnZSwgLi4uYnV0dG9ucykge1xuICAgICAgICB0aGlzLmNhcm91c2VsSW1nID0gaW1hZ2U7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSA9IHRoaXMuY2hhbmdlSW1hZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgWy4uLnRoaXMuYnV0dG9uc10uZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jaGFuZ2VJbWFnZSkpO1xuICAgIH0sXG4gICAgY2hhbmdlSW1hZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGNoYW5nZUltYWdlIHJ1bm5pbmdgKTtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJylbMV07XG4gICAgICAgIGxldCBpbWFnZUluZGV4O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXNzZXRzLmltYWdlcy5pbWFnZXMpIHtcbiAgICAgICAgICAgIGlmIChhc3NldHMuaW1hZ2VzLmltYWdlc1trZXldID09PSB0aGlzLmNhcm91c2VsSW1nLnNyYykge1xuICAgICAgICAgICAgICAgIGltYWdlSW5kZXggPSBPYmplY3Qua2V5cyhhc3NldHMuaW1hZ2VzLmltYWdlcykuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0luZGV4OyAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgICAgICAgICAgaWYgKGltYWdlSW5kZXggPCBPYmplY3Qua2V5cyhhc3NldHMuaW1hZ2VzLmltYWdlcykubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaW1hZ2VJbmRleCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbWFnZUluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaW1hZ2VJbmRleCAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gT2JqZWN0LmtleXMoYXNzZXRzLmltYWdlcy5pbWFnZXMpLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhcm91c2VsSW1nLnNyYyA9IGFzc2V0cy5pbWFnZXMuaW1hZ2VzW09iamVjdC5rZXlzKGFzc2V0cy5pbWFnZXMuaW1hZ2VzKVtuZXdJbmRleF1dO1xuICAgIH0sXG59IiwiaW1wb3J0ICcuLi9zdHlsZXMvaG9tZS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhvbWUoKSB7XG4gICAgY29uc29sZS5sb2coJ2J1aWxkSG9tZSBydW5uaW5nJyk7XG4gICAgY29uc3QgaG9tZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhvbWVDb250YWluZXIuaWQgPSAnaG9tZSc7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU3RpbGwgc2FuZT8nKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgXG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50LnJlbmRlcigpKTtcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wZW5Ib3Vycy5yZW5kZXIoKSk7XG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbi5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGhvbWVDb250YWluZXI7XG59XG5cbi8vbWlzc2lvbi93ZWxjb21lIHN0YXRlbWVudFxuY29uc3Qgc3RhdGVtZW50ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlbWVudFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhdGVtZW50V3JhcHBlci5pZCA9ICdzdGF0ZW1lbnQnO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3Qgc3RhdGVtZW50SGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdQbGFjZWhvbGRlcicpO1xuICAgICAgICBzdGF0ZW1lbnRIZWFkZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50SGVhZGVyVGV4dCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50UGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBzdGF0ZW1lbnRQYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBJZCBuaWJoIHRvcnRvciBpZCBhbGlxdWV0IGxlY3R1cyBwcm9pbi4gRW5pbSBkaWFtIHZ1bHB1dGF0ZSB1dCBwaGFyZXRyYSBzaXQgYW1ldC4gVmVsIHR1cnBpcyBudW5jIGVnZXQgbG9yZW0uJyk7XG4gICAgICAgIHN0YXRlbWVudFBhcmFncmFwaC5hcHBlbmRDaGlsZChzdGF0ZW1lbnRQYXJhZ3JhcGhUZXh0KTtcblxuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50SGVhZGVyKTtcbiAgICAgICAgc3RhdGVtZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXRlbWVudFBhcmFncmFwaCk7XG4gICAgICAgIHN0YXRlbWVudFdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50Q29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc3RhdGVtZW50V3JhcHBlcjtcbiAgICB9LFxufVxuXG4vL2hvdXJzIG9mIG9wZXJhdGlvblxuY29uc3Qgb3BlbkhvdXJzID0ge1xuICAgIGhvdXJzOiB7XG4gICAgICAgIE1vbmRheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFR1ZXNkYXk6ICc5QU0gLSA5UE0nLFxuICAgICAgICBXZWRuZXNkYXk6ICc5QU0gLSA5UE0nLFxuICAgICAgICBUaHVyc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIEZyaWRheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFNhdHVyZGF5OiAnMTBBTSAtIDEwUE0nLFxuICAgICAgICBTdW5kYXk6ICdDbG9zZWQnXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBob3Vyc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91cnNXcmFwcGVyLmlkID0gJ2hvdXJzJztcblxuICAgICAgICBjb25zdCBob3Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBob3Vyc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGNvbnN0IGhvdXJzSGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdIb3VycycpO1xuICAgICAgICBob3Vyc0hlYWRlci5hcHBlbmRDaGlsZChob3Vyc0hlYWRlclRleHQpO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmhvdXJzKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGxldCBkYXlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoa2V5KTtcbiAgICAgICAgICAgIGRheS5hcHBlbmRDaGlsZChkYXlUZXh0KTtcbiAgICAgICAgICAgIGhvdXJzTGlzdC5hcHBlbmRDaGlsZChkYXkpO1xuXG4gICAgICAgICAgICBsZXQgaG91cnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgbGV0IGhvdXJzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuaG91cnNba2V5XSk7XG4gICAgICAgICAgICBob3Vycy5hcHBlbmRDaGlsZChob3Vyc1RleHQpO1xuICAgICAgICAgICAgaG91cnNMaXN0LmFwcGVuZENoaWxkKGhvdXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXJzV3JhcHBlci5hcHBlbmRDaGlsZChob3Vyc0NvbnRhaW5lcik7XG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJzSGVhZGVyKTtcbiAgICAgICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91cnNMaXN0KTtcbiAgICAgICAgcmV0dXJuIGhvdXJzV3JhcHBlcjtcbiAgICB9XG59XG5cbi8vbG9jYXRpb25cbmNvbnN0IGxvY2F0aW9uID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsb2NhdGlvbldyYXBwZXIuaWQgPSAnbG9jYXRpb24nO1xuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvY2F0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25IZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0FkZHJlc3MnKTtcbiAgICAgICAgbG9jYXRpb25IZWFkZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25IZWFkZXJUZXh0KTtcblxuICAgICAgICBjb25zdCBsb2NhdGlvblBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25QYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJzEyMzQgTlcgUGxhY2hvbGRlciBSZC4gU3RhdGUsIFFRIDU2Nzg5Jyk7XG4gICAgICAgIGxvY2F0aW9uUGFyYWdyYXBoLmFwcGVuZENoaWxkKGxvY2F0aW9uUGFyYWdyYXBoVGV4dCk7XG4gICAgICAgIGxvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvY2F0aW9uSGVhZGVyKTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25QYXJhZ3JhcGgpO1xuICAgICAgICBsb2NhdGlvbldyYXBwZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25Db250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBsb2NhdGlvbldyYXBwZXI7XG4gICAgfVxufSIsIi8vIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvZ3VpZGVzL2RlcGVuZGVuY3ktbWFuYWdlbWVudC9cbi8vIGltcG9ydHMgYWxsIGltYWdlc1xuLy8gcmV0dXJucyBhbiBvYmplY3QgYW5kIGFycmF5IG9mIGltYWdlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcbiAgICBsZXQgaW1hZ2VzID0ge307XG4gICAgbGV0IGltYWdlc0FyciA9IFtdXG4gICAgci5rZXlzKCkubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpbWFnZXNbaXRlbS5yZXBsYWNlKCcuLycsICcnKV0gPSByKGl0ZW0pO1xuICAgICAgICBpbWFnZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyBpbWFnZXMsIGltYWdlc0FyciB9O1xufSIsImltcG9ydCAnLi4vc3R5bGVzL21lbnUuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNZW51KCkge1xuICAgIGNvbnNvbGUubG9nKGBtZW51LmpzIHJ1bm5pbmdgKTtcbiAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudUNvbnRhaW5lci5pZCA9ICdtZW51JztcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdNZW51Jyk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIG1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIG1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQobWVudS5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIG1lbnVDb250YWluZXI7XG59XG5cbmNvbnN0IGZvb2QgPSAoZGlzaCwgZGV0YWlscywgcHJpY2UpID0+IHtcbiAgICBjb25zdCBmb29kTmFtZSA9IGRpc2g7XG4gICAgY29uc3QgZm9vZERldGFpbHMgPSBkZXRhaWxzO1xuICAgIGNvbnN0IGZvb2RQcmljZSA9IHByaWNlO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGdldCBkaXNoKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvb2ROYW1lO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgZGV0YWlscygpIHtcbiAgICAgICAgICAgIHJldHVybiBmb29kRGV0YWlscztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHByaWNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvb2RQcmljZTtcbiAgICAgICAgfSxcbiAgICB9XG59XG5cbmNvbnN0IG1lbnUgPSB7XG4gICAgdGVzdDogJ3Rlc3QnLFxuICAgIGZvb2Q6IHtcbiAgICAgICAgcGl6emFzOiBbXG4gICAgICAgICAgICBmb29kKCdyaG9hJywgJ3RvbWF0byBzYXVjZSwgbW96emFyZWxsYSwgb3JlZ2Fubywgcm9hc3RlZCByaG9hJywgJzE1LjAwJyksXG4gICAgICAgICAgICBmb29kKCdwZXBwZXJvbmknLCAndG9tYXRvIHNhdWNlLCBtb3p6YXJlbGxhLCBvcmVnYW5vLCBwZXBwZXJvbmknLCAnMTAuMDAnKSxcbiAgICAgICAgICAgIGZvb2QoJ2p1aWN5IG9uZScsICdyYW5jaCBzdWFjZSwgbW96emFyZWxsYSwgcGFyc2xleSwgQkJRIGJlYXN0JywgJzEyLjAwJyksXG4gICAgICAgIF0sXG4gICAgICAgIHNhbGFkczogW1xuICAgICAgICAgICAgZm9vZCgnd2V0YScsICdyb21haW5lIGxldHR1Y2UsIGN1Y3VtYmVyLCBzdW5mbG93ZXIgc2VlZHMsIHRvbWF0b2VzLCB3ZXRhJywgJzUuMDAnKSxcbiAgICAgICAgICAgIGZvb2QoJ3BlcmFuZHVzIGNydW5jaCcsICdncmVlbiBjYWJiYWdlLCBidXR0ZXJoZWFkIGxldHR1Y2UsIGFsbW9uZHMsIGNyb3V0b25zJywgJzkuMDAnKSxcbiAgICAgICAgXSxcbiAgICAgICAgZGVzc2VydHM6IFtcbiAgICAgICAgICAgIGZvb2QoYGFsdmEncyBzYWNyaWZpY2VgLCAndmFuaWxsYSBpY2UgY3JlYW0sIEF0em9hdGwgc3lydXAsIHdhbG51dHMnLCAnNy4wMCcpLFxuICAgICAgICAgICAgZm9vZCgndGhlIGRlbHZlIGJhcicsICdhenVyaXRlLCBvcmVvcywgZGFyayBjaG9jb2xhdGUgY2hpcHMsIGFsbW9uZHMnLCAnNi4wMCcpLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9vZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9vZFdyYXBwZXIuaWQgPSAnbWVudS1tYWluJztcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb29kQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5mb29kKSB7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbWVudVNlY3Rpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCgnaDInKSk7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbkhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgIG1lbnVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICBtZW51U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChtZW51U2VjdGlvbkhlYWRlclRleHQpO1xuICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudVNlY3Rpb25IZWFkZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmZvb2RbaXRlbV0ubWFwKGZvb2QgPT4geyBcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmZvIGluIGZvb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVudUl0ZW1QYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10pXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtUGFyYWdyYXBoLmFwcGVuZENoaWxkKG1lbnVJdGVtUGFyYWdyYXBoVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVJdGVtUGFyYWdyYXBoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudUl0ZW1Db250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb29kQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVTZWN0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGZvb2RXcmFwcGVyLmFwcGVuZENoaWxkKGZvb2RDb250YWluZXIpO1xuICAgICAgICByZXR1cm4gZm9vZFdyYXBwZXI7XG4gICAgfVxufVxuLy9QaXp6YXNcbi8vU2lnbmF0dXJlIFBpenphc1xuLy9TaWRlcyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==