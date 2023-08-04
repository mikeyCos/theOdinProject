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
    background-color: var(--background-color-primary);
    display: grid;
    grid-template-rows: min-content 1fr min-content;
}

#navbar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 1;
    animation: slide-right 400ms ease-in;
}

#navbar > .container {
    display: grid;
    grid-template-columns: max-content 1fr;
    position: relative;
    background-color: var(--accent-color-primary);
    box-shadow: 0px 1px 5px 0.5px black;
}

#navbar > .container > #logo {
    padding: 1rem;
}

#navbar > .container > #logo > a {
    font-family: var(--font-family-primary);
    text-transform: uppercase;
    font-size: clamp(1.5rem, 5vw, 3rem);
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
    padding-top: 1rem;
    align-items: center;
}

.links.active {
    display: grid;
    animation: slide-left 200ms ease;
}

.links > li > a {
    display: block;
    text-decoration: none;
    font-size: clamp(1.5rem, 2vw, 2.25rem);
    font-family: var(--font-family-secondary);
    font-weight: 700;
    color: var(--accent-color-secondary);
    text-transform: uppercase;
    padding: 0.25rem 1rem;
}

.links > li > a:hover {
    background-color: var(--accent-color-secondary);
    color: var(--background-color-primary);
    transform: translateX(10%);
    transition: all 200ms ease-in-out;
}

.links > li > a.active {
    color: var(--accent-color-primary);
}

.btn-menu {
    justify-self: end;
    border: none;
    background: none;
    position: relative;
    z-index: 1;
    padding: 0.5rem;
}

.btn-menu > img {
    max-width: 32px;
}

#hero > .container {
    position: relative;
    display: grid;
    min-height: 100vh;
    box-shadow: 0px 1px 10px 2px black;
}

#hero > .container > .hero-text {
    position: absolute;
    justify-self: center;
    align-self: center;
}

#hero > .container > .hero-text > h1::before {
    position: absolute;
    left: 0;
    right: -2%;
    bottom: -2%;
    min-width: 100%;
    align-self: center;
    content: 'Exile\\'s Pizza';
    font-family: var(--font-family-primary);
    font-size: clamp(3.5rem, 18vw, 10rem);
    color: var(--accent-color-primary);
    letter-spacing: 1.5vw;
    text-align: center;
}

#hero > .container > .hero-text > h1 {
    font-size: clamp(3.5rem, 18vw, 10rem);
    color: var(--background-color-secondary);
    letter-spacing: 1.5vw;
    text-align: center;
    position: relative;
    text-shadow: 
            0px 0px var(--background-color-primary),
            2px -2px var(--background-color-primary);
    transition: 400ms;
}

#hero > .container > .hero-text > h1:hover::before {
    -webkit-mask: repeating-linear-gradient(45deg, transparent 0 3px, rgba(0, 0, 0, 0.8) 0 6px);
    mask: repeating-linear-gradient(45deg, transparent 0 3px, rgba(0, 0, 0, 0.8) 0 6px);
}
#hero > .container > .hero-text > h1:hover {
    text-shadow: 
            0px 0px var(--accent-color-secondary),
            1px 1px var(--accent-color-secondary),
            2px 2px var(--accent-color-secondary),
            3px 3px var(--accent-color-secondary),
            4px 4px var(--accent-color-secondary),
            5px 5px var(--accent-color-secondary),
            6px 6px var(--accent-color-secondary),
            7px 7px var(--accent-color-secondary),
            8px 8px var(--accent-color-secondary),
            9px 9px var(--accent-color-secondary),
            10px 10px var(--accent-color-secondary);
    transition: 500ms;
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

#hero > .container > #carousel > .container > .carousel-item > img {
    max-width: 100%;
    min-height: 100%;
    object-fit: cover;
}

h1, h2, h3, h5 {
    font-family: var(--font-family-primary);
    color: var(--accent-color-secondary);
    text-transform: uppercase;
    font-size: clamp(2rem, 5vw, 3rem);
}

#content {
    min-height: 100vh;
}

#content > * {
    scroll-margin-top: 5rem;
    display: grid;
    row-gap: 1rem;
}

#content > * > h1 {
    text-align: center;
    padding: 1rem;
    margin-bottom: -2rem;
    margin-top: 1rem;
    font-size: clamp(3rem, 5vw, 5rem);

    animation: slide-up 100ms ease-in;
}

#content > * > *:not(h1) > .container {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    font-family: var(--font-family-secondary);

    border: 9px solid transparent;
    outline-offset: -20px;
    outline-style: auto;
    font-size: clamp(1rem, 5vw, 1.30rem);

    animation: slide-up 200ms ease-in;
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
    font-size: clamp(1rem, 3vw, 1.5rem);
}

@media screen and (min-width: 768px) {
    #navbar {
        animation: slide-left 200ms ease-in;
    }

    .links {
        display: grid;
        justify-content: end;
        align-content: center;
        grid-template-columns: repeat(4, min-content);
        position: static;
        padding-top: 0;
        padding-right: 2rem;
        grid-auto-rows: 1fr;
        gap: 2rem;
    }

    .links > li > a {
        padding: 0;
        position: relative;
        display: flex;
        justify-items: center;
    }

    .links > li > a:hover {
        background-color: transparent;
        transform: scale(1.25);
        transition: all 200ms ease-in-out;
    }

    .links > li > a:after {
        position: absolute;
        bottom: -10%;
        content: '';
        width: 100%;
        height: 0.2rem;
        background-color: var(--accent-color-secondary);
        transform: scaleX(0);
        transition: all 200ms ease-in-out;
    }

    .links > li > a:hover:after {
        transform: scaleX(1) scaleY(1.5);
    }

    .btn-menu {
        display: none;
    }
}

@keyframes slide-right {
    0% {
        transform: translateX(-200%);
    }

    100% {
        transform: translateX(0%);
    }
}

@keyframes slide-left {
    0% {
        transform: translateX(200%);
    }

    100% {
        transform: translateX(0%);
    }
}

@keyframes slide-up {
    0% {
        transform: translateY(100%);
    }
    
    100% {
        transform: translateY(0%);
    }
}`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n    font-family: 'Nunito Sans';\n    src: url('./assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC\\,opsz\\,wdth\\,wght.ttf'),\n        url('./assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC\\,opsz\\,wdth\\,wght.ttf');\n}\n\n@font-face {\n    font-family: 'Teko';\n    src: url('./assets/fonts/Teko/Teko-Light.ttf'),\n        url('./assets/fonts/Teko/Teko-Medium.ttf'),\n        url('./assets/fonts/Teko/Teko-Regular.ttf');\n}\n\n:root {\n    /* color palette */\n    /* https://coolors.co/320e3b-e56399-7f96ff-a6cfd5-dbfcff */\n    --background-color-primary: #F3FCF0;\n    --background-color-secondary: #FFD23F;\n    --accent-color-primary: #EE4266;\n    --accent-color-secondary: #1F271B;\n    --accent-color-tertiary: #540D6E;\n    --font-family-primary: 'Teko', arial, sans-serif;\n    --font-family-secondary: 'Nunito Sans', arial, sans-serif;\n    --padding-container: 0.5rem;\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    min-height: 100vh;\n    background-color: var(--background-color-primary);\n    display: grid;\n    grid-template-rows: min-content 1fr min-content;\n}\n\n#navbar {\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 100%;\n    z-index: 1;\n    animation: slide-right 400ms ease-in;\n}\n\n#navbar > .container {\n    display: grid;\n    grid-template-columns: max-content 1fr;\n    position: relative;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 1px 5px 0.5px black;\n}\n\n#navbar > .container > #logo {\n    padding: 1rem;\n}\n\n#navbar > .container > #logo > a {\n    font-family: var(--font-family-primary);\n    text-transform: uppercase;\n    font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n.links {\n    display: none;\n    grid-auto-rows: min-content;\n    list-style: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    gap: 0.5rem;\n    background-color: var(--background-color-secondary);\n    padding-top: 1rem;\n    align-items: center;\n}\n\n.links.active {\n    display: grid;\n    animation: slide-left 200ms ease;\n}\n\n.links > li > a {\n    display: block;\n    text-decoration: none;\n    font-size: clamp(1.5rem, 2vw, 2.25rem);\n    font-family: var(--font-family-secondary);\n    font-weight: 700;\n    color: var(--accent-color-secondary);\n    text-transform: uppercase;\n    padding: 0.25rem 1rem;\n}\n\n.links > li > a:hover {\n    background-color: var(--accent-color-secondary);\n    color: var(--background-color-primary);\n    transform: translateX(10%);\n    transition: all 200ms ease-in-out;\n}\n\n.links > li > a.active {\n    color: var(--accent-color-primary);\n}\n\n.btn-menu {\n    justify-self: end;\n    border: none;\n    background: none;\n    position: relative;\n    z-index: 1;\n    padding: 0.5rem;\n}\n\n.btn-menu > img {\n    max-width: 32px;\n}\n\n#hero > .container {\n    position: relative;\n    display: grid;\n    min-height: 100vh;\n    box-shadow: 0px 1px 10px 2px black;\n}\n\n#hero > .container > .hero-text {\n    position: absolute;\n    justify-self: center;\n    align-self: center;\n}\n\n#hero > .container > .hero-text > h1::before {\n    position: absolute;\n    left: 0;\n    right: -2%;\n    bottom: -2%;\n    min-width: 100%;\n    align-self: center;\n    content: 'Exile\\'s Pizza';\n    font-family: var(--font-family-primary);\n    font-size: clamp(3.5rem, 18vw, 10rem);\n    color: var(--accent-color-primary);\n    letter-spacing: 1.5vw;\n    text-align: center;\n}\n\n#hero > .container > .hero-text > h1 {\n    font-size: clamp(3.5rem, 18vw, 10rem);\n    color: var(--background-color-secondary);\n    letter-spacing: 1.5vw;\n    text-align: center;\n    position: relative;\n    text-shadow: \n            0px 0px var(--background-color-primary),\n            2px -2px var(--background-color-primary);\n    transition: 400ms;\n}\n\n#hero > .container > .hero-text > h1:hover::before {\n    -webkit-mask: repeating-linear-gradient(45deg, transparent 0 3px, rgba(0, 0, 0, 0.8) 0 6px);\n    mask: repeating-linear-gradient(45deg, transparent 0 3px, rgba(0, 0, 0, 0.8) 0 6px);\n}\n#hero > .container > .hero-text > h1:hover {\n    text-shadow: \n            0px 0px var(--accent-color-secondary),\n            1px 1px var(--accent-color-secondary),\n            2px 2px var(--accent-color-secondary),\n            3px 3px var(--accent-color-secondary),\n            4px 4px var(--accent-color-secondary),\n            5px 5px var(--accent-color-secondary),\n            6px 6px var(--accent-color-secondary),\n            7px 7px var(--accent-color-secondary),\n            8px 8px var(--accent-color-secondary),\n            9px 9px var(--accent-color-secondary),\n            10px 10px var(--accent-color-secondary);\n    transition: 500ms;\n}\n\n#hero > .container > #carousel > .container {\n    display: grid;\n    min-height: 100%;\n}\n\n#hero > .container > #carousel > .container > button {\n    position: absolute;\n    align-self: center;\n    border: none;\n    background: none;\n    display: grid;\n}\n\n#hero > .container > #carousel > .container > button:hover {\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n#hero > .container > #carousel > .container > button:last-of-type {\n    right: 0;\n}\n\n#hero > .container > #carousel > .container > button > img {\n    width: clamp(2rem, 5vw, 5rem);\n    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(2%) hue-rotate(64deg) brightness(108%) contrast(101%);\n}\n\n#hero > .container > #carousel > .container > .carousel-item > img {\n    max-width: 100%;\n    min-height: 100%;\n    object-fit: cover;\n}\n\nh1, h2, h3, h5 {\n    font-family: var(--font-family-primary);\n    color: var(--accent-color-secondary);\n    text-transform: uppercase;\n    font-size: clamp(2rem, 5vw, 3rem);\n}\n\n#content {\n    min-height: 100vh;\n}\n\n#content > * {\n    scroll-margin-top: 5rem;\n    display: grid;\n    row-gap: 1rem;\n}\n\n#content > * > h1 {\n    text-align: center;\n    padding: 1rem;\n    margin-bottom: -2rem;\n    margin-top: 1rem;\n    font-size: clamp(3rem, 5vw, 5rem);\n\n    animation: slide-up 100ms ease-in;\n}\n\n#content > * > *:not(h1) > .container {\n    display: grid;\n    gap: 1rem;\n    padding: 1rem;\n    font-family: var(--font-family-secondary);\n\n    border: 9px solid transparent;\n    outline-offset: -20px;\n    outline-style: auto;\n    font-size: clamp(1rem, 5vw, 1.30rem);\n\n    animation: slide-up 200ms ease-in;\n}\n\n#content > * > *:not(h1) > .container > * {\n    padding: 1rem;\n    background-color: var(--background-color-secondary);\n    border: 2px solid black;\n}\n\nfooter {\n    padding: 1rem;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 4px 7px 3px black;\n}\n\nfooter > .container {\n    display: flex;\n    justify-content: center;\n}\n\nfooter > .container > h5 {\n    letter-spacing: 2px;\n    font-size: clamp(1rem, 3vw, 1.5rem);\n}\n\n@media screen and (min-width: 768px) {\n    #navbar {\n        animation: slide-left 200ms ease-in;\n    }\n\n    .links {\n        display: grid;\n        justify-content: end;\n        align-content: center;\n        grid-template-columns: repeat(4, min-content);\n        position: static;\n        padding-top: 0;\n        padding-right: 2rem;\n        grid-auto-rows: 1fr;\n        gap: 2rem;\n    }\n\n    .links > li > a {\n        padding: 0;\n        position: relative;\n        display: flex;\n        justify-items: center;\n    }\n\n    .links > li > a:hover {\n        background-color: transparent;\n        transform: scale(1.25);\n        transition: all 200ms ease-in-out;\n    }\n\n    .links > li > a:after {\n        position: absolute;\n        bottom: -10%;\n        content: '';\n        width: 100%;\n        height: 0.2rem;\n        background-color: var(--accent-color-secondary);\n        transform: scaleX(0);\n        transition: all 200ms ease-in-out;\n    }\n\n    .links > li > a:hover:after {\n        transform: scaleX(1) scaleY(1.5);\n    }\n\n    .btn-menu {\n        display: none;\n    }\n}\n\n@keyframes slide-right {\n    0% {\n        transform: translateX(-200%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}\n\n@keyframes slide-left {\n    0% {\n        transform: translateX(200%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}\n\n@keyframes slide-up {\n    0% {\n        transform: translateY(100%);\n    }\n    \n    100% {\n        transform: translateY(0%);\n    }\n}"],"sourceRoot":""}]);
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
    /* font-size: clamp(1rem, 5vw, 1.25rem); */
}

@media screen and (min-width: 768px) {
    #about > #history > .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

}`, "",{"version":3,"sources":["webpack://./src/styles/about.css"],"names":[],"mappings":"AAAA;;IAEI,0CAA0C;AAC9C;;AAEA;IACI;QACI,aAAa;QACb,qCAAqC;IACzC;;AAEJ","sourcesContent":["#about-main > .container > p,\n#history > .container > .item > :last-child {\n    /* font-size: clamp(1rem, 5vw, 1.25rem); */\n}\n\n@media screen and (min-width: 768px) {\n    #about > #history > .container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n    }\n\n}"],"sourceRoot":""}]);
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
    /* font-size: clamp(1rem, 5vw, 1.25rem); */
    text-decoration: underline;
}

#form > .container > .form-item {
    display: grid;
}

#form > .container > .form-item > label {
    /* font-size: clamp(1.5rem, 10vw, 2rem); */
    font-weight: 700;
    text-transform: uppercase;
}

/* selects inputs and textarea */
#form > .container > .form-item > *:nth-child(n + 2) {
    /* font-size: clam(1rem, 10vw, 2rem); */
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
    font-family: var(--font-family-secondary);
    font-weight: 700;
    font-size: clamp(1.25rem, 1vw, 2rem);
    text-transform: uppercase;
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
}`, "",{"version":3,"sources":["webpack://./src/styles/contact.css"],"names":[],"mappings":"AAAA;IACI,UAAU;AACd;;AAEA;IACI,0CAA0C;IAC1C,0BAA0B;AAC9B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,0CAA0C;IAC1C,gBAAgB;IAChB,yBAAyB;AAC7B;;AAEA,gCAAgC;AAChC;IACI,uCAAuC;IACvC,sBAAsB;IACtB,aAAa;IACb,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,+CAA+C;IAC/C,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,oBAAoB;IACpB,mBAAmB;AACvB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,mBAAmB;IACnB,6CAA6C;IAC7C,iCAAiC;IACjC,yCAAyC;IACzC,gBAAgB;IAChB,oCAAoC;IACpC,yBAAyB;AAC7B;;AAEA;IACI;AACJ;;AAEA;IACI;QACI,qCAAqC;IACzC;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI;IACJ;;IAEA;QACI,qBAAqB;IACzB;AACJ","sourcesContent":["label > .asterik {\n    color: red;\n}\n\n#form > .container >:first-child {\n    /* font-size: clamp(1rem, 5vw, 1.25rem); */\n    text-decoration: underline;\n}\n\n#form > .container > .form-item {\n    display: grid;\n}\n\n#form > .container > .form-item > label {\n    /* font-size: clamp(1.5rem, 10vw, 2rem); */\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n/* selects inputs and textarea */\n#form > .container > .form-item > *:nth-child(n + 2) {\n    /* font-size: clam(1rem, 10vw, 2rem); */\n    border-radius: 0.35rem;\n    outline: none;\n    border-color: transparent;\n    padding: 0.5rem;\n}\n\n#form > .container > .form-item > *:nth-child(n + 2)::placeholder {\n    text-transform: uppercase;\n    text-indent: 5%;\n}\n\n#form > .container > .form-item > *:nth-child(n + 2):focus {\n    border: 4px solid var(--accent-color-secondary);\n    padding: 0.75rem;\n}\n\n#form > .container > .form-item:last-child {\n    border: none;\n    background: none;\n    justify-self: center;\n    margin-bottom: 1rem;\n}\n\n#form > .container > .form-item:last-child > button {\n    padding: 0.75rem 4rem;\n    border: none;\n    border-radius: 2rem;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 1px 2px 0px black;\n    font-family: var(--font-family-secondary);\n    font-weight: 700;\n    font-size: clamp(1.25rem, 1vw, 2rem);\n    text-transform: uppercase;\n}\n\n#form > .container > .form-item:last-child > button:active {\n    box-shadow: 0px 2px 3px 1px black\n}\n\n@media screen and (min-width: 768px) {\n    #form > .container {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    #form > .container > label {\n        grid-area: 1 / span 2;\n    }\n\n    #form > .container > .form-item:first-of-type {\n        grid-area: 2 / span 2;\n    }\n\n    #form > .container > .form-item:nth-of-type(4) {\n        grid-area: 4 / span 2\n    }\n\n    #form > .container > .form-item:last-of-type {\n        grid-area: 5 / span 2;\n    }\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `#home > *:not(h1) > .container > h2,
#home > *:last-child > .container > p {
    text-align: center;
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
}

@media screen and (min-width: 768px) {
    #home {
        grid-template-columns: repeat(2, 1fr);
    }

    #home > h1,
    #home > #statement {
        grid-column: span 2;
    }

    #home > #location > .container {
        min-height: 100%;
        grid-template-rows: min-content;
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/home.css"],"names":[],"mappings":"AAAA;;IAEI,kBAAkB;AACtB;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,qCAAqC;IACrC,eAAe;AACnB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI;QACI,qCAAqC;IACzC;;IAEA;;QAEI,mBAAmB;IACvB;;IAEA;QACI,gBAAgB;QAChB,+BAA+B;IACnC;AACJ","sourcesContent":["#home > *:not(h1) > .container > h2,\n#home > *:last-child > .container > p {\n    text-align: center;\n}\n\n#home > #hours > .container > ul {\n    list-style: none;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 5vw;\n}\n\n#home > #hours > .container > ul > :nth-child(2n - 1 ) {\n    text-align: right;\n}\n\n#home > #hours > .container > ul > :nth-child(2n) {\n    text-align: left;\n}\n\n@media screen and (min-width: 768px) {\n    #home {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    #home > h1,\n    #home > #statement {\n        grid-column: span 2;\n    }\n\n    #home > #location > .container {\n        min-height: 100%;\n        grid-template-rows: min-content;\n    }\n}"],"sourceRoot":""}]);
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

#menu > #menu-main > .container > * > .item > p:last-child > sup {
    font-size: clamp(0.65rem, 2vw, 0.95rem);
    text-decoration: underline;
    padding: 0.15rem;
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
}`, "",{"version":3,"sources":["webpack://./src/styles/menu.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,aAAa;AACjB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,0BAA0B;IAC1B,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,uCAAuC;IACvC,0BAA0B;IAC1B,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,SAAS;IACT,YAAY;IACZ,UAAU;IACV,+BAA+B;AACnC;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI;QACI,qCAAqC;IACzC;AACJ","sourcesContent":["#menu > #menu-main > .container > * {\n    display: grid;\n    row-gap: 1rem;\n}\n\n#menu > #menu-main > .container > * > .item {\n    padding: 0.5rem;\n}\n\n#menu > #menu-main > .container > * > .item > p:first-child {\n    text-transform: capitalize;\n    font-style: italic;\n    font-weight: 700;\n    position: relative;\n    margin-bottom: 1rem;\n}\n\n#menu > #menu-main > .container > * > .item > p:last-child > sup {\n    font-size: clamp(0.65rem, 2vw, 0.95rem);\n    text-decoration: underline;\n    padding: 0.15rem;\n}\n\n#menu > #menu-main > .container > * > .item > p:first-child::after {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    content: ' ';\n    width: 75%;\n    border-bottom: 3px dotted black;\n}\n\n#menu > #menu-main > .container > * > .item > p:nth-child(n + 2) {\n    text-align: end;\n    text-wrap: balance;\n    font-weight: 300;\n    position: relative;\n}\n\n@media screen and (min-width: 768px) {\n    #content > #menu > *:not(h1) > .container {\n        grid-template-columns: repeat(3, 1fr);\n    }\n}"],"sourceRoot":""}]);
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
            const historyHeading = document.createElement('h2');
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

        const logo = document.createElement('div');
        logo.id = 'logo';
        const logoLink = document.createElement('a');
        const logoLinkText = document.createTextNode(`Exile's Pizza`);
        logoLink.appendChild(logoLinkText);
        logo.appendChild(logoLink);
        navContainer.appendChild(logo);

        const navMenu = document.createElement('button');
        navMenu.setAttribute('aria-pressed', false);
        const navMenuImg = new Image();
        navMenuImg.src = assets.icons.images['menu.svg'];
        navMenu.appendChild(navMenuImg);
        navMenu.classList.add('btn-menu');
        navContainer.appendChild(navMenu);

        navContainer.appendChild(navList);
        navElement.appendChild(navContainer);
        this.cacheDOM(navMenu, navList);
        this.getWindowWidth();
        this.watchScreen();
        return navElement;
    },
    watchScreen: function() {
        this.getWindowWidth = this.getWindowWidth.bind(this);
        window.addEventListener('resize', this.getWindowWidth);
    },
    cacheDOM: function(btn, ul) {
        this.button = btn;
        this.menu = ul;
        this.toggleMenu = this.toggleMenu.bind(this);
    },
    bindEvents: function() {
        this.button.addEventListener('click', this.toggleMenu);
        this.menu.addEventListener('click', this.toggleMenu);
    },
    removeEvents: function() {
        this.button.removeEventListener('click', this.toggleMenu);
        this.menu.removeEventListener('click', this.toggleMenu);
    },
    toggleMenu: function() {
        let isPressed = JSON.parse(this.button.getAttribute('aria-pressed')) == true || false;
        this.button.setAttribute('aria-pressed', !isPressed);
        isPressed ? this.menu.classList.remove('active') : this.menu.classList.add('active');
    },
    getWindowWidth: function() {
        console.log(window.innerWidth);
        if (window.innerWidth > 768) {
            this.removeEvents();
        } else {
            this.bindEvents();
        }
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
        appetizers: [
            food('breadstick', null,'2.00'),
            food('waffle fries', null, '4.99'),
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
                    if (food[info] !== null) {
                        const menuItemParagraph = document.createElement('p');
                        let menuItemParagraphText = document.createTextNode(food[info]);
                        menuItemParagraph.appendChild(menuItemParagraphText);
                        menuItemContainer.appendChild(menuItemParagraph)
                        if (info === 'price') {
                            const menuItemCents = document.createElement('sup');
                            menuItemParagraphText.nodeValue = food[info].split('.')[0];
                            const menuItemCentsText = document.createTextNode(food[info].split('.')[1]);
                            menuItemCents.appendChild(menuItemCentsText);
                            menuItemParagraph.appendChild(menuItemCents);
                        }
                        
                    }
                };
                menuSection.appendChild(menuItemContainer);
            });
            foodContainer.appendChild(menuSection)
        }
        foodWrapper.appendChild(foodContainer);
        return foodWrapper;
    }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QyxpT0FBNkY7QUFDekksNENBQTRDLCtPQUFvRztBQUNoSiw0Q0FBNEMsaUpBQXFEO0FBQ2pHLDRDQUE0QyxtSkFBc0Q7QUFDbEcsNENBQTRDLHFKQUF1RDtBQUNuRyw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1DQUFtQztBQUNsRCxjQUFjLG1DQUFtQztBQUNqRDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsY0FBYyxtQ0FBbUM7QUFDakQsY0FBYyxtQ0FBbUM7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE9BQU8sT0FBTyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxPQUFPLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssZUFBZSxPQUFP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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEw0Qjs7QUFFYjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNHQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsYUFBYTtBQUNiOzs7Ozs7Ozs7Ozs7Ozs7O0FDWDRCOztBQUViO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9hYm91dC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9jb250YWN0LmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2hvbWUuY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvbWVudS5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2Fib3V0LmNzcz9kMTE3Iiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvY29udGFjdC5jc3M/Mjk2MiIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2hvbWUuY3NzPzRiNTEiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9tZW51LmNzcz83MDBhIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvYXNzZXRzL2ltYWdlcy8gc3luYyBub25yZWN1cnNpdmUgXFwuanBnJCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvYWJvdXQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvaGVhZGVyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvaW1hZ2VzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL21lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL051bml0b19TYW5zL051bml0b1NhbnMtVmFyaWFibGVGb250X1lUTEMsb3Bzeix3ZHRoLHdnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvTnVuaXRvX1NhbnMvTnVuaXRvU2Fucy1JdGFsaWMtVmFyaWFibGVGb250X1lUTEMsb3Bzeix3ZHRoLHdnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLUxpZ2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdUZWtvJztcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19ffSk7XG59XG5cbjpyb290IHtcbiAgICAvKiBjb2xvciBwYWxldHRlICovXG4gICAgLyogaHR0cHM6Ly9jb29sb3JzLmNvLzMyMGUzYi1lNTYzOTktN2Y5NmZmLWE2Y2ZkNS1kYmZjZmYgKi9cbiAgICAtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeTogI0YzRkNGMDtcbiAgICAtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5OiAjRkZEMjNGO1xuICAgIC0tYWNjZW50LWNvbG9yLXByaW1hcnk6ICNFRTQyNjY7XG4gICAgLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5OiAjMUYyNzFCO1xuICAgIC0tYWNjZW50LWNvbG9yLXRlcnRpYXJ5OiAjNTQwRDZFO1xuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1Rla28nLCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgICAtLWZvbnQtZmFtaWx5LXNlY29uZGFyeTogJ051bml0byBTYW5zJywgYXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgLS1wYWRkaW5nLWNvbnRhaW5lcjogMC41cmVtO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XG59XG5cbiNuYXZiYXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgei1pbmRleDogMTtcbiAgICBhbmltYXRpb246IHNsaWRlLXJpZ2h0IDQwMG1zIGVhc2UtaW47XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA1cHggMC41cHggYmxhY2s7XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gI2xvZ28ge1xuICAgIHBhZGRpbmc6IDFyZW07XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gI2xvZ28gPiBhIHtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgNXZ3LCAzcmVtKTtcbn1cblxuLmxpbmtzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGdyaWQtYXV0by1yb3dzOiBtaW4tY29udGVudDtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIGdhcDogMC41cmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubGlua3MuYWN0aXZlIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGFuaW1hdGlvbjogc2xpZGUtbGVmdCAyMDBtcyBlYXNlO1xufVxuXG4ubGlua3MgPiBsaSA+IGEge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAyLjI1cmVtKTtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcbn1cblxuLmxpbmtzID4gbGkgPiBhOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbi5saW5rcyA+IGxpID4gYS5hY3RpdmUge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG59XG5cbi5idG4tbWVudSB7XG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG4uYnRuLW1lbnUgPiBpbWcge1xuICAgIG1heC13aWR0aDogMzJweDtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDEwcHggMnB4IGJsYWNrO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6OmJlZm9yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IC0yJTtcbiAgICBib3R0b206IC0yJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGNvbnRlbnQ6ICdFeGlsZVxcXFwncyBQaXp6YSc7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMy41cmVtLCAxOHZ3LCAxMHJlbSk7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDEge1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMy41cmVtLCAxOHZ3LCAxMHJlbSk7XG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LXNoYWRvdzogXG4gICAgICAgICAgICAwcHggMHB4IHZhcigtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeSksXG4gICAgICAgICAgICAycHggLTJweCB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xuICAgIHRyYW5zaXRpb246IDQwMG1zO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6aG92ZXI6OmJlZm9yZSB7XG4gICAgLXdlYmtpdC1tYXNrOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCAwIDNweCwgcmdiYSgwLCAwLCAwLCAwLjgpIDAgNnB4KTtcbiAgICBtYXNrOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCAwIDNweCwgcmdiYSgwLCAwLCAwLCAwLjgpIDAgNnB4KTtcbn1cbiNoZXJvID4gLmNvbnRhaW5lciA+IC5oZXJvLXRleHQgPiBoMTpob3ZlciB7XG4gICAgdGV4dC1zaGFkb3c6IFxuICAgICAgICAgICAgMHB4IDBweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDFweCAxcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICAycHggMnB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgM3B4IDNweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDRweCA0cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICA1cHggNXB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgNnB4IDZweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDdweCA3cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICA4cHggOHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgOXB4IDlweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDEwcHggMTBweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpsYXN0LW9mLXR5cGUge1xuICAgIHJpZ2h0OiAwO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMnJlbSwgNXZ3LCA1cmVtKTtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDEwMCUpIHNlcGlhKDMlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSg2NGRlZykgYnJpZ2h0bmVzcygxMDglKSBjb250cmFzdCgxMDElKTtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IC5jYXJvdXNlbC1pdGVtID4gaW1nIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuaDEsIGgyLCBoMywgaDUge1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDV2dywgM3JlbSk7XG59XG5cbiNjb250ZW50IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuI2NvbnRlbnQgPiAqIHtcbiAgICBzY3JvbGwtbWFyZ2luLXRvcDogNXJlbTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHJvdy1nYXA6IDFyZW07XG59XG5cbiNjb250ZW50ID4gKiA+IGgxIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAtMnJlbTtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoM3JlbSwgNXZ3LCA1cmVtKTtcblxuICAgIGFuaW1hdGlvbjogc2xpZGUtdXAgMTAwbXMgZWFzZS1pbjtcbn1cblxuI2NvbnRlbnQgPiAqID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBnYXA6IDFyZW07XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcblxuICAgIGJvcmRlcjogOXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIG91dGxpbmUtb2Zmc2V0OiAtMjBweDtcbiAgICBvdXRsaW5lLXN0eWxlOiBhdXRvO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgNXZ3LCAxLjMwcmVtKTtcblxuICAgIGFuaW1hdGlvbjogc2xpZGUtdXAgMjAwbXMgZWFzZS1pbjtcbn1cblxuI2NvbnRlbnQgPiAqID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciA+ICoge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG5mb290ZXIge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xuICAgIGJveC1zaGFkb3c6IDBweCA0cHggN3B4IDNweCBibGFjaztcbn1cblxuZm9vdGVyID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuZm9vdGVyID4gLmNvbnRhaW5lciA+IGg1IHtcbiAgICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgM3Z3LCAxLjVyZW0pO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICNuYXZiYXIge1xuICAgICAgICBhbmltYXRpb246IHNsaWRlLWxlZnQgMjAwbXMgZWFzZS1pbjtcbiAgICB9XG5cbiAgICAubGlua3Mge1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICAgICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCBtaW4tY29udGVudCk7XG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAycmVtO1xuICAgICAgICBncmlkLWF1dG8tcm93czogMWZyO1xuICAgICAgICBnYXA6IDJyZW07XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhIHtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yNSk7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAubGlua3MgPiBsaSA+IGE6YWZ0ZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogLTEwJTtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDAuMnJlbTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDApO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhOmhvdmVyOmFmdGVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMSkgc2NhbGVZKDEuNSk7XG4gICAgfVxuXG4gICAgLmJ0bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgc2xpZGUtcmlnaHQge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMDAlKTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgc2xpZGUtbGVmdCB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjAwJSk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLXVwIHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgICB9XG4gICAgXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLDBCQUEwQjtJQUMxQjsrQ0FDK0Y7QUFDbkc7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkI7OytDQUUrQztBQUNuRDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQiwwREFBMEQ7SUFDMUQsbUNBQW1DO0lBQ25DLHFDQUFxQztJQUNyQywrQkFBK0I7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dG8gU2Fucyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLVZhcmlhYmxlRm9udF9ZVExDXFxcXCxvcHN6XFxcXCx3ZHRoXFxcXCx3Z2h0LnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLUl0YWxpYy1WYXJpYWJsZUZvbnRfWVRMQ1xcXFwsb3BzelxcXFwsd2R0aFxcXFwsd2dodC50dGYnKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnVGVrbyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9UZWtvL1Rla28tTGlnaHQudHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1NZWRpdW0udHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1SZWd1bGFyLnR0ZicpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAgIC8qIGNvbG9yIHBhbGV0dGUgKi9cXG4gICAgLyogaHR0cHM6Ly9jb29sb3JzLmNvLzMyMGUzYi1lNTYzOTktN2Y5NmZmLWE2Y2ZkNS1kYmZjZmYgKi9cXG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnk6ICNGM0ZDRjA7XFxuICAgIC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnk6ICNGRkQyM0Y7XFxuICAgIC0tYWNjZW50LWNvbG9yLXByaW1hcnk6ICNFRTQyNjY7XFxuICAgIC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeTogIzFGMjcxQjtcXG4gICAgLS1hY2NlbnQtY29sb3ItdGVydGlhcnk6ICM1NDBENkU7XFxuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1Rla28nLCBhcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgLS1mb250LWZhbWlseS1zZWNvbmRhcnk6ICdOdW5pdG8gU2FucycsIGFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAtLXBhZGRpbmctY29udGFpbmVyOiAwLjVyZW07XFxufVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XFxufVxcblxcbiNuYXZiYXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBhbmltYXRpb246IHNsaWRlLXJpZ2h0IDQwMG1zIGVhc2UtaW47XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDVweCAwLjVweCBibGFjaztcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAjbG9nbyB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gI2xvZ28gPiBhIHtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgNXZ3LCAzcmVtKTtcXG59XFxuXFxuLmxpbmtzIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50O1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHRvcDogMDtcXG4gICAgZ2FwOiAwLjVyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgcGFkZGluZy10b3A6IDFyZW07XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5saW5rcy5hY3RpdmUge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBhbmltYXRpb246IHNsaWRlLWxlZnQgMjAwbXMgZWFzZTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMi4yNXJlbSk7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAlKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ubGlua3MgPiBsaSA+IGEuYWN0aXZlIHtcXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmJ0bi1tZW51IHtcXG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbi5idG4tbWVudSA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMzJweDtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAxMHB4IDJweCBibGFjaztcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOjpiZWZvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAtMiU7XFxuICAgIGJvdHRvbTogLTIlO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgY29udGVudDogJ0V4aWxlXFxcXCdzIFBpenphJztcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDMuNXJlbSwgMTh2dywgMTByZW0pO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxIHtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgzLjVyZW0sIDE4dncsIDEwcmVtKTtcXG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDEuNXZ3O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdGV4dC1zaGFkb3c6IFxcbiAgICAgICAgICAgIDBweCAwcHggdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KSxcXG4gICAgICAgICAgICAycHggLTJweCB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICB0cmFuc2l0aW9uOiA0MDBtcztcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOmhvdmVyOjpiZWZvcmUge1xcbiAgICAtd2Via2l0LW1hc2s6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDAgM3B4LCByZ2JhKDAsIDAsIDAsIDAuOCkgMCA2cHgpO1xcbiAgICBtYXNrOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCAwIDNweCwgcmdiYSgwLCAwLCAwLCAwLjgpIDAgNnB4KTtcXG59XFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOmhvdmVyIHtcXG4gICAgdGV4dC1zaGFkb3c6IFxcbiAgICAgICAgICAgIDBweCAwcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgMXB4IDFweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICAycHggMnB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDNweCAzcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgNHB4IDRweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICA1cHggNXB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDZweCA2cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgN3B4IDdweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICA4cHggOHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDlweCA5cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgMTBweCAxMHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSB7XFxuICAgIHJpZ2h0OiAwO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDJyZW0sIDV2dywgNXJlbSk7XFxuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoMTAwJSkgc2VwaWEoMyUpIHNhdHVyYXRlKDIlKSBodWUtcm90YXRlKDY0ZGVnKSBicmlnaHRuZXNzKDEwOCUpIGNvbnRyYXN0KDEwMSUpO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gLmNhcm91c2VsLWl0ZW0gPiBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG5cXG5oMSwgaDIsIGgzLCBoNSB7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDV2dywgM3JlbSk7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxufVxcblxcbiNjb250ZW50ID4gKiB7XFxuICAgIHNjcm9sbC1tYXJnaW4tdG9wOiA1cmVtO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4jY29udGVudCA+ICogPiBoMSB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogLTJyZW07XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoM3JlbSwgNXZ3LCA1cmVtKTtcXG5cXG4gICAgYW5pbWF0aW9uOiBzbGlkZS11cCAxMDBtcyBlYXNlLWluO1xcbn1cXG5cXG4jY29udGVudCA+ICogPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ2FwOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcXG5cXG4gICAgYm9yZGVyOiA5cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIG91dGxpbmUtb2Zmc2V0OiAtMjBweDtcXG4gICAgb3V0bGluZS1zdHlsZTogYXV0bztcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMzByZW0pO1xcblxcbiAgICBhbmltYXRpb246IHNsaWRlLXVwIDIwMG1zIGVhc2UtaW47XFxufVxcblxcbiNjb250ZW50ID4gKiA+ICo6bm90KGgxKSA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDdweCAzcHggYmxhY2s7XFxufVxcblxcbmZvb3RlciA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZm9vdGVyID4gLmNvbnRhaW5lciA+IGg1IHtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAzdncsIDEuNXJlbSk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNuYXZiYXIge1xcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZS1sZWZ0IDIwMG1zIGVhc2UtaW47XFxuICAgIH1cXG5cXG4gICAgLmxpbmtzIHtcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbi1jb250ZW50KTtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDJyZW07XFxuICAgICAgICBncmlkLWF1dG8tcm93czogMWZyO1xcbiAgICAgICAgZ2FwOiAycmVtO1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYSB7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICAubGlua3MgPiBsaSA+IGE6aG92ZXIge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYTphZnRlciB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICBib3R0b206IC0xMCU7XFxuICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgaGVpZ2h0OiAwLjJyZW07XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDApO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYTpob3ZlcjphZnRlciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKSBzY2FsZVkoMS41KTtcXG4gICAgfVxcblxcbiAgICAuYnRuLW1lbnUge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLXJpZ2h0IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMDAlKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBzbGlkZS1sZWZ0IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwMCUpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLXVwIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xcbiAgICB9XFxuICAgIFxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjYWJvdXQtbWFpbiA+IC5jb250YWluZXIgPiBwLFxuI2hpc3RvcnkgPiAuY29udGFpbmVyID4gLml0ZW0gPiA6bGFzdC1jaGlsZCB7XG4gICAgLyogZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMjVyZW0pOyAqL1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICNhYm91dCA+ICNoaXN0b3J5ID4gLmNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gICAgfVxuXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2Fib3V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7SUFFSSwwQ0FBMEM7QUFDOUM7O0FBRUE7SUFDSTtRQUNJLGFBQWE7UUFDYixxQ0FBcUM7SUFDekM7O0FBRUpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2Fib3V0LW1haW4gPiAuY29udGFpbmVyID4gcCxcXG4jaGlzdG9yeSA+IC5jb250YWluZXIgPiAuaXRlbSA+IDpsYXN0LWNoaWxkIHtcXG4gICAgLyogZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMjVyZW0pOyAqL1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgICAjYWJvdXQgPiAjaGlzdG9yeSA+IC5jb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgIH1cXG5cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBsYWJlbCA+IC5hc3RlcmlrIHtcbiAgICBjb2xvcjogcmVkO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPjpmaXJzdC1jaGlsZCB7XG4gICAgLyogZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMjVyZW0pOyAqL1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtIHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gbGFiZWwge1xuICAgIC8qIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAxMHZ3LCAycmVtKTsgKi9cbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi8qIHNlbGVjdHMgaW5wdXRzIGFuZCB0ZXh0YXJlYSAqL1xuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKSB7XG4gICAgLyogZm9udC1zaXplOiBjbGFtKDFyZW0sIDEwdncsIDJyZW0pOyAqL1xuICAgIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKTo6cGxhY2Vob2xkZXIge1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgdGV4dC1pbmRlbnQ6IDUlO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpOmZvY3VzIHtcbiAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCA+IGJ1dHRvbiB7XG4gICAgcGFkZGluZzogMC43NXJlbSA0cmVtO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAycmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAwcHggYmxhY2s7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXNlY29uZGFyeSk7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBmb250LXNpemU6IGNsYW1wKDEuMjVyZW0sIDF2dywgMnJlbSk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkID4gYnV0dG9uOmFjdGl2ZSB7XG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAzcHggMXB4IGJsYWNrXG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgI2Zvcm0gPiAuY29udGFpbmVyIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICB9XG5cbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiBsYWJlbCB7XG4gICAgICAgIGdyaWQtYXJlYTogMSAvIHNwYW4gMjtcbiAgICB9XG5cbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmZpcnN0LW9mLXR5cGUge1xuICAgICAgICBncmlkLWFyZWE6IDIgLyBzcGFuIDI7XG4gICAgfVxuXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpudGgtb2YtdHlwZSg0KSB7XG4gICAgICAgIGdyaWQtYXJlYTogNCAvIHNwYW4gMlxuICAgIH1cblxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1vZi10eXBlIHtcbiAgICAgICAgZ3JpZC1hcmVhOiA1IC8gc3BhbiAyO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvY29udGFjdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSwwQ0FBMEM7SUFDMUMsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLDBDQUEwQztJQUMxQyxnQkFBZ0I7SUFDaEIseUJBQXlCO0FBQzdCOztBQUVBLGdDQUFnQztBQUNoQztJQUNJLHVDQUF1QztJQUN2QyxzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLHlCQUF5QjtJQUN6QixlQUFlO0FBQ25COztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSwrQ0FBK0M7SUFDL0MsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsNkNBQTZDO0lBQzdDLGlDQUFpQztJQUNqQyx5Q0FBeUM7SUFDekMsZ0JBQWdCO0lBQ2hCLG9DQUFvQztJQUNwQyx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0k7UUFDSSxxQ0FBcUM7SUFDekM7O0lBRUE7UUFDSSxxQkFBcUI7SUFDekI7O0lBRUE7UUFDSSxxQkFBcUI7SUFDekI7O0lBRUE7UUFDSTtJQUNKOztJQUVBO1FBQ0kscUJBQXFCO0lBQ3pCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wibGFiZWwgPiAuYXN0ZXJpayB7XFxuICAgIGNvbG9yOiByZWQ7XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+OmZpcnN0LWNoaWxkIHtcXG4gICAgLyogZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMjVyZW0pOyAqL1xcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiBsYWJlbCB7XFxuICAgIC8qIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAxMHZ3LCAycmVtKTsgKi9cXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLyogc2VsZWN0cyBpbnB1dHMgYW5kIHRleHRhcmVhICovXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKSB7XFxuICAgIC8qIGZvbnQtc2l6ZTogY2xhbSgxcmVtLCAxMHZ3LCAycmVtKTsgKi9cXG4gICAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpOjpwbGFjZWhvbGRlciB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIHRleHQtaW5kZW50OiA1JTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKTpmb2N1cyB7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b24ge1xcbiAgICBwYWRkaW5nOiAwLjc1cmVtIDRyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAwcHggYmxhY2s7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDEuMjVyZW0sIDF2dywgMnJlbSk7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCA+IGJ1dHRvbjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAxcHggYmxhY2tcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICAgIH1cXG5cXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gbGFiZWwge1xcbiAgICAgICAgZ3JpZC1hcmVhOiAxIC8gc3BhbiAyO1xcbiAgICB9XFxuXFxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06Zmlyc3Qtb2YtdHlwZSB7XFxuICAgICAgICBncmlkLWFyZWE6IDIgLyBzcGFuIDI7XFxuICAgIH1cXG5cXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpudGgtb2YtdHlwZSg0KSB7XFxuICAgICAgICBncmlkLWFyZWE6IDQgLyBzcGFuIDJcXG4gICAgfVxcblxcbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3Qtb2YtdHlwZSB7XFxuICAgICAgICBncmlkLWFyZWE6IDUgLyBzcGFuIDI7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjaG9tZSA+ICo6bm90KGgxKSA+IC5jb250YWluZXIgPiBoMixcbiNob21lID4gKjpsYXN0LWNoaWxkID4gLmNvbnRhaW5lciA+IHAge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIGNvbHVtbi1nYXA6IDV2dztcbn1cblxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwgPiA6bnRoLWNoaWxkKDJuIC0gMSApIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwgPiA6bnRoLWNoaWxkKDJuKSB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAjaG9tZSB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gICAgfVxuXG4gICAgI2hvbWUgPiBoMSxcbiAgICAjaG9tZSA+ICNzdGF0ZW1lbnQge1xuICAgICAgICBncmlkLWNvbHVtbjogc3BhbiAyO1xuICAgIH1cblxuICAgICNob21lID4gI2xvY2F0aW9uID4gLmNvbnRhaW5lciB7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQ7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9ob21lLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7SUFFSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxlQUFlO0FBQ25COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0k7UUFDSSxxQ0FBcUM7SUFDekM7O0lBRUE7O1FBRUksbUJBQW1CO0lBQ3ZCOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLCtCQUErQjtJQUNuQztBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNob21lID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciA+IGgyLFxcbiNob21lID4gKjpsYXN0LWNoaWxkID4gLmNvbnRhaW5lciA+IHAge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgY29sdW1uLWdhcDogNXZ3O1xcbn1cXG5cXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCA+IDpudGgtY2hpbGQoMm4gLSAxICkge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwgPiA6bnRoLWNoaWxkKDJuKSB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNob21lIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICAgIH1cXG5cXG4gICAgI2hvbWUgPiBoMSxcXG4gICAgI2hvbWUgPiAjc3RhdGVtZW50IHtcXG4gICAgICAgIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxuICAgIH1cXG5cXG4gICAgI2hvbWUgPiAjbG9jYXRpb24gPiAuY29udGFpbmVyIHtcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50O1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgcm93LWdhcDogMXJlbTtcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSB7XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpmaXJzdC1jaGlsZCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmxhc3QtY2hpbGQgPiBzdXAge1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMC42NXJlbSwgMnZ3LCAwLjk1cmVtKTtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICBwYWRkaW5nOiAwLjE1cmVtO1xufVxuXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpmaXJzdC1jaGlsZDo6YWZ0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBjb250ZW50OiAnICc7XG4gICAgd2lkdGg6IDc1JTtcbiAgICBib3JkZXItYm90dG9tOiAzcHggZG90dGVkIGJsYWNrO1xufVxuXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpudGgtY2hpbGQobiArIDIpIHtcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XG4gICAgdGV4dC13cmFwOiBiYWxhbmNlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICNjb250ZW50ID4gI21lbnUgPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL21lbnUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksMEJBQTBCO0lBQzFCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QywwQkFBMEI7SUFDMUIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxTQUFTO0lBQ1QsWUFBWTtJQUNaLFVBQVU7SUFDViwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSTtRQUNJLHFDQUFxQztJQUN6QztBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcm93LWdhcDogMXJlbTtcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6Zmlyc3QtY2hpbGQge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmxhc3QtY2hpbGQgPiBzdXAge1xcbiAgICBmb250LXNpemU6IGNsYW1wKDAuNjVyZW0sIDJ2dywgMC45NXJlbSk7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgICBwYWRkaW5nOiAwLjE1cmVtO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpmaXJzdC1jaGlsZDo6YWZ0ZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgY29udGVudDogJyAnO1xcbiAgICB3aWR0aDogNzUlO1xcbiAgICBib3JkZXItYm90dG9tOiAzcHggZG90dGVkIGJsYWNrO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpudGgtY2hpbGQobiArIDIpIHtcXG4gICAgdGV4dC1hbGlnbjogZW5kO1xcbiAgICB0ZXh0LXdyYXA6IGJhbGFuY2U7XFxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgI2NvbnRlbnQgPiAjbWVudSA+ICo6bm90KGgxKSA+IC5jb250YWluZXIge1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYWJvdXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hYm91dC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY29udGFjdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NvbnRhY3QuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZW51LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVudS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsInZhciBtYXAgPSB7XG5cdFwiLi9jaGV2cm9uX2xlZnQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fbGVmdC5zdmdcIixcblx0XCIuL2NoZXZyb25fcmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fcmlnaHQuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyBcXFxcLnN2ZyRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZG91Z2gwLmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvZG91Z2gwLmpwZ1wiLFxuXHRcIi4vcGl6emEwLmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emEwLmpwZ1wiLFxuXHRcIi4vcGl6emExLmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emExLmpwZ1wiLFxuXHRcIi4vcGl6emEyLmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emEyLmpwZ1wiLFxuXHRcIi4vcGl6emEzLmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emEzLmpwZ1wiLFxuXHRcIi4vcGl6emE0LmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emE0LmpwZ1wiLFxuXHRcIi4vcGl6emE1LmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emE1LmpwZ1wiLFxuXHRcIi4vcGl6emE2LmpwZ1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGl6emE2LmpwZ1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaW1hZ2VzIHN5bmMgXFxcXC5qcGckXCI7IiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5pbXBvcnQgYnVpbGRIZWFkZXIgZnJvbSAnLi9tb2R1bGVzL2hlYWRlci5qcyc7XG5pbXBvcnQgYnVpbGRIb21lIGZyb20gJy4vbW9kdWxlcy9ob21lLmpzJztcbmltcG9ydCBidWlsZEFib3V0IGZyb20gJy4vbW9kdWxlcy9hYm91dC5qcyc7XG5pbXBvcnQgYnVpbGRNZW51IGZyb20gJy4vbW9kdWxlcy9tZW51LmpzJztcbmltcG9ydCBidWlsZENvbnRhY3QgZnJvbSAnLi9tb2R1bGVzL2NvbnRhY3QuanMnO1xuaW1wb3J0IGJ1aWxkRm9vdGVyIGZyb20gJy4vbW9kdWxlcy9mb290ZXIuanMnO1xuXG5jb25zdCBob21lID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJ1aWxkID0ge1xuICAgICAgICBoZWFkZXI6IGJ1aWxkSGVhZGVyLFxuICAgICAgICBob21lOiBidWlsZEhvbWUsXG4gICAgICAgIGFib3V0OiBidWlsZEFib3V0LFxuICAgICAgICBtZW51OiBidWlsZE1lbnUsXG4gICAgICAgIGNvbnRhY3Q6IGJ1aWxkQ29udGFjdCxcbiAgICAgICAgZm9vdGVyOiBidWlsZEZvb3RlcixcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZW50ID0ge1xuICAgICAgICBhY3RpdmVUYWI6IG51bGwsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYnVpbGQuaGVhZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlRE9NKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICBidWlsZC5mb290ZXIoKTtcblxuICAgICAgICB9LFxuICAgICAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpO1xuICAgICAgICAgICAgdGhpcy5uYXZCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmF2YmFyJyk7XG4gICAgICAgICAgICB0aGlzLm5hdkl0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLm5hdkJhci5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyIHVsIGxpIGEnKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IGJ1aWxkLmhvbWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IGJ1aWxkW2tleV0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKGNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoVGFiID0gdGhpcy5zd2l0Y2hUYWIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubmF2SXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN3aXRjaFRhYikpO1xuICAgICAgICB9LFxuICAgICAgICBzd2l0Y2hUYWI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhrZXkpICYmICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0QWN0aXZlVGFiOiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLm5hdkl0ZW1zLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NOYW1lID09PSBjb250ZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBjb250ZW50LmluaXQoKTtcbn0pKCk7IiwiaW1wb3J0ICcuLi9zdHlsZXMvYWJvdXQuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRBYm91dCgpIHtcbiAgICBjb25zb2xlLmxvZyhgYWJvdXQuanMgcnVubmluZ2ApO1xuICAgIGNvbnN0IGFib3V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWJvdXRDb250YWluZXIuaWQgPSAnYWJvdXQnO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0Fib3V0Jyk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIGFib3V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgXG4gICAgYWJvdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoYWJvdXRNYWluLnJlbmRlcigpKTtcbiAgICBhYm91dENvbnRhaW5lci5hcHBlbmRDaGlsZChhYm91dEhpc3RvcnkucmVuZGVyKCkpO1xuICAgIHJldHVybiBhYm91dENvbnRhaW5lcjtcbn1cblxuY29uc3QgYWJvdXRNYWluID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSAnVmFyaXVzIG1vcmJpIGVuaW0gbnVuYyBmYXVjaWJ1cyBhIHBlbGxlbnRlc3F1ZSBzaXQgYW1ldCBwb3J0dGl0b3IuIE1hZ25hIGVnZXQgZXN0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdC4gQXJjdSBmZWxpcyBiaWJlbmR1bSB1dCB0cmlzdGlxdWUgZXQuIFRlbXB1cyBpbXBlcmRpZXQgbnVsbGEgbWFsZXN1YWRhIHBlbGxlbnRlc3F1ZSBlbGl0IGVnZXQgZ3JhdmlkYSBjdW0uIFZpdmVycmEgb3JjaSBzYWdpdHRpcyBldSB2b2x1dHBhdCBvZGlvLiBJZCBuaWJoIHRvcnRvciBpZCBhbGlxdWV0LiBGYXVjaWJ1cyBuaXNsIHRpbmNpZHVudCBlZ2V0IG51bGxhbS4gRWdlc3RhcyBxdWlzIGlwc3VtIHN1c3BlbmRpc3NlIHVsdHJpY2VzLiBTdXNwZW5kaXNzZSBwb3RlbnRpIG51bGxhbSBhYyB0b3J0b3Igdml0YWUgcHVydXMgZmF1Y2lidXMuIFRpbmNpZHVudCBlZ2V0IG51bGxhbSBub24gbmlzaSBlc3Qgc2l0Lic7XG4gICAgICAgIGNvbnN0IGFib3V0TWFpbldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWJvdXRNYWluV3JhcHBlci5pZCA9ICdhYm91dC1tYWluJztcblxuICAgICAgICBjb25zdCBhYm91dE1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWJvdXRNYWluQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IGFib3V0TWFpblBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgYWJvdXRNYWluUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgICBhYm91dE1haW5QYXJhZ3JhcGguYXBwZW5kQ2hpbGQoYWJvdXRNYWluUGFyYWdyYXBoVGV4dCk7XG4gICAgICAgIGFib3V0TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhYm91dE1haW5QYXJhZ3JhcGgpO1xuICAgICAgICBhYm91dE1haW5XcmFwcGVyLmFwcGVuZENoaWxkKGFib3V0TWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGFib3V0TWFpbldyYXBwZXI7XG4gICAgfVxufVxuXG5jb25zdCBhYm91dEhpc3RvcnkgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgaGlzdG9yeVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGlzdG9yeVdyYXBwZXIuaWQgPSAnaGlzdG9yeSc7XG5cbiAgICAgICAgY29uc3QgaGlzdG9yeU1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGlzdG9yeU1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuaGlzdG9yeSkge1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGlzdG9yeUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpdGVtJyk7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5SGVhZGluZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtrZXl9LCAke3RoaXMuaGlzdG9yeVtrZXldWzBdfWApO1xuICAgICAgICAgICAgaGlzdG9yeUhlYWRpbmcuYXBwZW5kQ2hpbGQoaGlzdG9yeUhlYWRpbmdUZXh0KTtcblxuICAgICAgICAgICAgY29uc3QgaGlzdG9yeVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlQYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5oaXN0b3J5W2tleV1bMV0pO1xuICAgICAgICAgICAgaGlzdG9yeVBhcmFncmFwaC5hcHBlbmRDaGlsZChoaXN0b3J5UGFyYWdyYXBoVGV4dCk7XG5cbiAgICAgICAgICAgIGhpc3RvcnlDb250YWluZXIuYXBwZW5kQ2hpbGQoaGlzdG9yeUhlYWRpbmcpO1xuICAgICAgICAgICAgaGlzdG9yeUNvbnRhaW5lci5hcHBlbmRDaGlsZChoaXN0b3J5UGFyYWdyYXBoKTtcbiAgICAgICAgICAgIGhpc3RvcnlNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGhpc3RvcnlDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGlzdG9yeVdyYXBwZXIuYXBwZW5kQ2hpbGQoaGlzdG9yeU1haW5Db250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBoaXN0b3J5V3JhcHBlcjtcbiAgICB9LFxuICAgIGhpc3Rvcnk6IHtcbiAgICAgICAgMjAxMzogWydUd2lsaWdodCBTdHJhbmQnLCAnQ29taW5nIGZyb20gQXNjYWxvbiwgd2Ugc3RyaXZlZCB0byBmZWVkIHRob3VzYW5kcyBvZiBleGlsZXMgd2l0aCBmYW1pbGlhciBkaXNoZXMuIFdlIHN0YXJ0ZWQgY29va2luZyBwaXp6YXMgb24gYSBzbWFsbCBmb29kIGNhcnQgd2l0aCBhIGhvbWVtYWRlIHBpenphIG92ZW4sIGFuZCBwdWxsZWQgb3VyIHNlcnZpY2UgYWNyb3NzIFRoZSBNdWQgRmxhdHMuJ10sXG4gICAgICAgIDIwMTQ6IFsnV2V0bGFuZHMnLCAnT3VyIGZpcnN0IGZvb2QgdHJ1Y2sgaGl0IHRoZSB6b25lIG9mZmVyaW5nIG1vcmUgZm9vZCBjaG9pY2VzIHdpZGVseSBrbm93biB0byBsb2NhbHMuJ10sXG4gICAgICAgIDIwMTU6IFsnU2FybiBFbmNhbXBtZW50JywgJ091ciBvcGVuLWNvbmNlcHQgcmVzdGF1cmFudCBvcGVuZWQgdXAgdG8gdGhlIHVuZGVhZCwgQmxhY2tndWFyZCBzb2xpZGVycyBhbmQgcGFzc2luZyBleGlsZXMuJ10sXG4gICAgfSxcbn0iLCJpbXBvcnQgJy4uL3N0eWxlcy9jb250YWN0LmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQ29udGFjdCgpIHtcbiAgICBjb25zb2xlLmxvZyhgY29udGFjdC5qcyBydW5uaW5nYCk7XG4gICAgY29uc3QgY29udGFjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhY3RDb250YWluZXIuaWQgPSAnY29udGFjdCc7XG4gICAgXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0NvbnRhY3QnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgY29udGFjdENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29udGFjdENvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtLnJlbmRlcigpKTtcbiAgICByZXR1cm4gY29udGFjdENvbnRhaW5lcjtcbn1cblxuY29uc3QgZm9ybSA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybUVsZW1lbnQuaWQgPSAnZm9ybSdcblxuICAgICAgICBjb25zdCBmb3JtV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBmb3JtTm90ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgY29uc3QgZm9ybU5vdGVMYWJlbFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnIEluZGljYXRlcyByZXF1aXJlZCBmaWVsZCcpO1xuICAgICAgICBjb25zdCBmb3JtTm90ZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGZvcm1Ob3RlU3BhblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnKicpO1xuICAgICAgICBmb3JtTm90ZVNwYW4uY2xhc3NMaXN0LmFkZCgnYXN0ZXJpaycpO1xuXG4gICAgICAgIGZvcm1Ob3RlU3Bhbi5hcHBlbmRDaGlsZChmb3JtTm90ZVNwYW5UZXh0KTtcbiAgICAgICAgZm9ybU5vdGVMYWJlbC5hcHBlbmRDaGlsZChmb3JtTm90ZVNwYW4pO1xuICAgICAgICBmb3JtTm90ZUxhYmVsLmFwcGVuZENoaWxkKGZvcm1Ob3RlTGFiZWxUZXh0KTtcbiAgICAgICAgZm9ybVdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybU5vdGVMYWJlbCk7XG4gICAgICAgIGZvciAobGV0IGlucHV0cyBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKCdmb3JtLWl0ZW0nKTtcblxuICAgICAgICAgICAgaWYgKGlucHV0cyAhPT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7aW5wdXRzfSBgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnYXN0ZXJpaycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyonKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5odG1sRm9yID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGxhYmVsVGV4dCk7XG4gICAgICAgICAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChzcGFuVGV4dCk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0cyAhPT0gJ21lc3NhZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuaWQgPSBpbnB1dHM7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaW5wdXQsIHRoaXMuYXR0cmlidXRlc1tpbnB1dHNdKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFyZWEuaWQgPSBpbnB1dHM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGF0dHIgaW4gdGhpcy5hdHRyaWJ1dGVzW2lucHV0c10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBcmVhLnNldEF0dHJpYnV0ZShhdHRyLCB0aGlzLmF0dHJpYnV0ZXNbaW5wdXRzXVthdHRyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmlkID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU3VibWl0Jyk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdWJtaXRCdXR0b24sIHRoaXMuYXR0cmlidXRlc1tpbnB1dHNdKTtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uVGV4dCk7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9ybVdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybUl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybVdyYXBwZXIpO1xuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnQ7XG4gICAgfSxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2Z1bGwgbmFtZScsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIGlkOiAnZW1haWwnLFxuICAgICAgICAgICAgbmFtZTogJ2VtYWlsJyxcbiAgICAgICAgICAgIHR5cGU6ICdlbWFpbCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2VtYWlsQGFkZHJlc3MuY29tJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICB9LFxuICAgICAgICBwaG9uZToge1xuICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICBuYW1lOiAncGhvbmUnLFxuICAgICAgICAgICAgdHlwZTogJ3RlbCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1hYWC1YWFgtWFhYWCcsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgaWQ6ICdtZXNzYWdlJyxcbiAgICAgICAgICAgIG5hbWU6ICdtZXNzYWdlJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAneW91ciBtZXNzYWdlIGhlcmUgKDUwMCBjaGFyYWN0ZXJzIG1heCknLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdDoge1xuICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgIH0sXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRm9vdGVyKCkge1xuICAgIGNvbnN0IGZvb3RlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKTtcblxuICAgIGNvbnN0IGZvb3RlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvb3RlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgIGNvbnN0IGZvb3RlckhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XG4gICAgY29uc3QgZm9vdGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdQbGFjZWhvbGRlcicpO1xuICAgIFxuICAgIGZvb3RlckhlYWRlci5hcHBlbmRDaGlsZChmb290ZXJUZXh0KTtcbiAgICBmb290ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVySGVhZGVyKTtcbiAgICBmb290ZXJXcmFwcGVyLmFwcGVuZENoaWxkKGZvb3RlckNvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3RlcldyYXBwZXIpO1xufSIsImltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi9pbWFnZXMuanMnO1xuXG5jb25zdCBhc3NldHMgPSB7XG4gICAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pY29ucy8nLCBmYWxzZSwgL1xcLnN2ZyQvKSksXG4gICAgaW1hZ2VzOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi9hc3NldHMvaW1hZ2VzLycsIGZhbHNlLCAvXFwuanBnJC8pKSxcbn1cblxuY29uc3QgbmF2TGlua3MgPSBbJ2hvbWUnLCAnYWJvdXQnLCAnbWVudScsICdjb250YWN0J107XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSGVhZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKGBuYXZiYXIuanMgcnVubmluZ2ApOyAvL2ZvciBkZWJ1Z2dpbmdcbiAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgaGVyb1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbnN0IGhlcm9UZXh0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlcm9UZXh0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoZXJvLXRleHQnKTtcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBFeGlsZSdzIFBpenphYCk7XG4gICAgaGVyb1dyYXBwZXIuaWQgPSAnaGVybyc7XG5cbiAgICBjb25zdCBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVyb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgIGhlcm9UZXh0V3JhcHBlci5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICBoZXJvV3JhcHBlci5hcHBlbmRDaGlsZChoZXJvQ29udGFpbmVyKTtcbiAgICBoZWFkaW5nLmFwcGVuZENoaWxkKGhlYWRpbmdUZXh0KTtcbiAgICBoZXJvQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlcm9UZXh0V3JhcHBlcik7XG4gICAgaGVyb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbWFnZUNhcm91c2VsLnJlbmRlcigpKTtcbiAgICBoZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlcm9XcmFwcGVyKTtcblxuICAgIGhlYWRlckVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5hdi5yZW5kZXIoKSwgaGVyb1dyYXBwZXIpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGhlYWRlckVsZW1lbnQsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG59XG5cbmNvbnN0IG5hdiA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgIGNvbnN0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIG5hdkVsZW1lbnQuaWQgPSAnbmF2YmFyJztcbiAgICAgICAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgIFxuICAgICAgICBjb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgbmF2TGlzdC5jbGFzc0xpc3QuYWRkKCdsaW5rcycpO1xuXG4gICAgICAgIG5hdkxpbmtzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGFuY2hvci5ocmVmID0gYCMke2l0ZW19YDtcbiAgICAgICAgICAgIGFuY2hvci5jbGFzc0xpc3QuYWRkKGl0ZW0pO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgbmF2SXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChuYXZJdGVtVGV4dCk7XG4gICAgICAgICAgICBuYXZJdGVtLmFwcGVuZENoaWxkKGFuY2hvcik7XG4gICAgICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkl0ZW0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9nby5pZCA9ICdsb2dvJztcbiAgICAgICAgY29uc3QgbG9nb0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGNvbnN0IGxvZ29MaW5rVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBFeGlsZSdzIFBpenphYCk7XG4gICAgICAgIGxvZ29MaW5rLmFwcGVuZENoaWxkKGxvZ29MaW5rVGV4dCk7XG4gICAgICAgIGxvZ28uYXBwZW5kQ2hpbGQobG9nb0xpbmspO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG5cbiAgICAgICAgY29uc3QgbmF2TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuYXZNZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgZmFsc2UpO1xuICAgICAgICBjb25zdCBuYXZNZW51SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIG5hdk1lbnVJbWcuc3JjID0gYXNzZXRzLmljb25zLmltYWdlc1snbWVudS5zdmcnXTtcbiAgICAgICAgbmF2TWVudS5hcHBlbmRDaGlsZChuYXZNZW51SW1nKTtcbiAgICAgICAgbmF2TWVudS5jbGFzc0xpc3QuYWRkKCdidG4tbWVudScpO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobmF2TWVudSk7XG5cbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5hdkxpc3QpO1xuICAgICAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY2FjaGVET00obmF2TWVudSwgbmF2TGlzdCk7XG4gICAgICAgIHRoaXMuZ2V0V2luZG93V2lkdGgoKTtcbiAgICAgICAgdGhpcy53YXRjaFNjcmVlbigpO1xuICAgICAgICByZXR1cm4gbmF2RWxlbWVudDtcbiAgICB9LFxuICAgIHdhdGNoU2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nZXRXaW5kb3dXaWR0aCA9IHRoaXMuZ2V0V2luZG93V2lkdGguYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZ2V0V2luZG93V2lkdGgpO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGJ0biwgdWwpIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidG47XG4gICAgICAgIHRoaXMubWVudSA9IHVsO1xuICAgICAgICB0aGlzLnRvZ2dsZU1lbnUgPSB0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICByZW1vdmVFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICB0b2dnbGVNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGlzUHJlc3NlZCA9IEpTT04ucGFyc2UodGhpcy5idXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnKSkgPT0gdHJ1ZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5idXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAhaXNQcmVzc2VkKTtcbiAgICAgICAgaXNQcmVzc2VkID8gdGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpIDogdGhpcy5tZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0sXG4gICAgZ2V0V2luZG93V2lkdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfSxcbn1cblxuLy9pbWFnZXMgc2xpZGVzaG93XG5jb25zdCBpbWFnZUNhcm91c2VsID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNhcm91c2VsV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXJvdXNlbFdyYXBwZXIuaWQgPSAnY2Fyb3VzZWwnO1xuICAgICAgICBjb25zdCBjYXJvdXNlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBjYXJvdXNlbEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2Fyb3VzZWxJdGVtLmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLWl0ZW0nKTtcblxuICAgICAgICBjb25zdCBjYXJvdXNlbEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBjYXJvdXNlbEltZy5zcmMgPSBhc3NldHMuaW1hZ2VzLmltYWdlc1sncGl6emEwLmpwZyddO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uQmFjay5jbGFzc0xpc3QuYWRkKCdidG4tY2Fyb3VzZWwnLCAnYmFjaycpO1xuICAgICAgICBjb25zdCBpbWFnZUJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2VCYWNrLnNyYyA9IGFzc2V0cy5pY29ucy5pbWFnZXNbJ2NoZXZyb25fbGVmdC5zdmcnXTtcbiAgICAgICAgYnV0dG9uQmFjay5hcHBlbmRDaGlsZChpbWFnZUJhY2spO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkZvcndhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uRm9yd2FyZC5jbGFzc0xpc3QuYWRkKCdidG4tY2Fyb3VzZWwnLCAnZm9yd2FyZCcpO1xuICAgICAgICBjb25zdCBpbWFnZUZvcndhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2VGb3J3YXJkLnNyYyA9IGFzc2V0cy5pY29ucy5pbWFnZXNbJ2NoZXZyb25fcmlnaHQuc3ZnJ107XG4gICAgICAgIGJ1dHRvbkZvcndhcmQuYXBwZW5kQ2hpbGQoaW1hZ2VGb3J3YXJkKTtcbiAgICAgICAgdGhpcy5jYWNoZURPTShjYXJvdXNlbEltZywgYnV0dG9uQmFjaywgYnV0dG9uRm9yd2FyZCk7XG5cbiAgICAgICAgY2Fyb3VzZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uQmFjayk7XG4gICAgICAgIGNhcm91c2VsQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkZvcndhcmQpO1xuXG4gICAgICAgIGNhcm91c2VsSXRlbS5hcHBlbmRDaGlsZChjYXJvdXNlbEltZyk7XG4gICAgICAgIGNhcm91c2VsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcm91c2VsSXRlbSk7XG4gICAgICAgIGNhcm91c2VsV3JhcHBlci5hcHBlbmRDaGlsZChjYXJvdXNlbENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICByZXR1cm4gY2Fyb3VzZWxXcmFwcGVyO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGltYWdlLCAuLi5idXR0b25zKSB7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxJbWcgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNoYW5nZUltYWdlID0gdGhpcy5jaGFuZ2VJbWFnZS5iaW5kKHRoaXMpO1xuICAgICAgICBbLi4udGhpcy5idXR0b25zXS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNoYW5nZUltYWdlKSk7XG4gICAgfSxcbiAgICBjaGFuZ2VJbWFnZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgY2hhbmdlSW1hZ2UgcnVubmluZ2ApO1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKVsxXTtcbiAgICAgICAgbGV0IGltYWdlSW5kZXg7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhc3NldHMuaW1hZ2VzLmltYWdlcykge1xuICAgICAgICAgICAgaWYgKGFzc2V0cy5pbWFnZXMuaW1hZ2VzW2tleV0gPT09IHRoaXMuY2Fyb3VzZWxJbWcuc3JjKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VJbmRleCA9IE9iamVjdC5rZXlzKGFzc2V0cy5pbWFnZXMuaW1hZ2VzKS5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3SW5kZXg7ICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgICAgICAgICBpZiAoaW1hZ2VJbmRleCA8IE9iamVjdC5rZXlzKGFzc2V0cy5pbWFnZXMuaW1hZ2VzKS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpbWFnZUluZGV4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGltYWdlSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpbWFnZUluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBPYmplY3Qua2V5cyhhc3NldHMuaW1hZ2VzLmltYWdlcykubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxJbWcuc3JjID0gYXNzZXRzLmltYWdlcy5pbWFnZXNbT2JqZWN0LmtleXMoYXNzZXRzLmltYWdlcy5pbWFnZXMpW25ld0luZGV4XV07XG4gICAgfSxcbn0iLCJpbXBvcnQgJy4uL3N0eWxlcy9ob21lLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG9tZSgpIHtcbiAgICBjb25zb2xlLmxvZygnYnVpbGRIb21lIHJ1bm5pbmcnKTtcbiAgICBjb25zdCBob21lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaG9tZUNvbnRhaW5lci5pZCA9ICdob21lJztcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdTdGlsbCBzYW5lPycpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0ZW1lbnQucmVuZGVyKCkpO1xuICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQob3BlbkhvdXJzLnJlbmRlcigpKTtcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvY2F0aW9uLnJlbmRlcigpKTtcbiAgICByZXR1cm4gaG9tZUNvbnRhaW5lcjtcbn1cblxuLy9taXNzaW9uL3dlbGNvbWUgc3RhdGVtZW50XG5jb25zdCBzdGF0ZW1lbnQgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc3RhdGVtZW50V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGF0ZW1lbnRXcmFwcGVyLmlkID0gJ3N0YXRlbWVudCc7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXRlbWVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGF0ZW1lbnRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBjb25zdCBzdGF0ZW1lbnRIZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1BsYWNlaG9sZGVyJyk7XG4gICAgICAgIHN0YXRlbWVudEhlYWRlci5hcHBlbmRDaGlsZChzdGF0ZW1lbnRIZWFkZXJUZXh0KTtcblxuICAgICAgICBjb25zdCBzdGF0ZW1lbnRQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlbWVudFBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIElkIG5pYmggdG9ydG9yIGlkIGFsaXF1ZXQgbGVjdHVzIHByb2luLiBFbmltIGRpYW0gdnVscHV0YXRlIHV0IHBoYXJldHJhIHNpdCBhbWV0LiBWZWwgdHVycGlzIG51bmMgZWdldCBsb3JlbS4nKTtcbiAgICAgICAgc3RhdGVtZW50UGFyYWdyYXBoLmFwcGVuZENoaWxkKHN0YXRlbWVudFBhcmFncmFwaFRleHQpO1xuXG4gICAgICAgIHN0YXRlbWVudENvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0ZW1lbnRIZWFkZXIpO1xuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50UGFyYWdyYXBoKTtcbiAgICAgICAgc3RhdGVtZW50V3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZW1lbnRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBzdGF0ZW1lbnRXcmFwcGVyO1xuICAgIH0sXG59XG5cbi8vaG91cnMgb2Ygb3BlcmF0aW9uXG5jb25zdCBvcGVuSG91cnMgPSB7XG4gICAgaG91cnM6IHtcbiAgICAgICAgTW9uZGF5OiAnOUFNIC0gOVBNJyxcbiAgICAgICAgVHVlc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFdlZG5lc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFRodXJzZGF5OiAnOUFNIC0gOVBNJyxcbiAgICAgICAgRnJpZGF5OiAnOUFNIC0gOVBNJyxcbiAgICAgICAgU2F0dXJkYXk6ICcxMEFNIC0gMTBQTScsXG4gICAgICAgIFN1bmRheTogJ0Nsb3NlZCdcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGhvdXJzV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3Vyc1dyYXBwZXIuaWQgPSAnaG91cnMnO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgaG91cnNIZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0hvdXJzJyk7XG4gICAgICAgIGhvdXJzSGVhZGVyLmFwcGVuZENoaWxkKGhvdXJzSGVhZGVyVGV4dCk7XG5cbiAgICAgICAgY29uc3QgaG91cnNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuaG91cnMpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgbGV0IGRheVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShrZXkpO1xuICAgICAgICAgICAgZGF5LmFwcGVuZENoaWxkKGRheVRleHQpO1xuICAgICAgICAgICAgaG91cnNMaXN0LmFwcGVuZENoaWxkKGRheSk7XG5cbiAgICAgICAgICAgIGxldCBob3VycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBsZXQgaG91cnNUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5ob3Vyc1trZXldKTtcbiAgICAgICAgICAgIGhvdXJzLmFwcGVuZENoaWxkKGhvdXJzVGV4dCk7XG4gICAgICAgICAgICBob3Vyc0xpc3QuYXBwZW5kQ2hpbGQoaG91cnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaG91cnNXcmFwcGVyLmFwcGVuZENoaWxkKGhvdXJzQ29udGFpbmVyKTtcbiAgICAgICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91cnNIZWFkZXIpO1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZChob3Vyc0xpc3QpO1xuICAgICAgICByZXR1cm4gaG91cnNXcmFwcGVyO1xuICAgIH1cbn1cblxuLy9sb2NhdGlvblxuY29uc3QgbG9jYXRpb24gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvY2F0aW9uV3JhcHBlci5pZCA9ICdsb2NhdGlvbic7XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbkhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQWRkcmVzcycpO1xuICAgICAgICBsb2NhdGlvbkhlYWRlci5hcHBlbmRDaGlsZChsb2NhdGlvbkhlYWRlclRleHQpO1xuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBsb2NhdGlvblBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnMTIzNCBOVyBQbGFjaG9sZGVyIFJkLiBTdGF0ZSwgUVEgNTY3ODknKTtcbiAgICAgICAgbG9jYXRpb25QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobG9jYXRpb25QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25IZWFkZXIpO1xuICAgICAgICBsb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvblBhcmFncmFwaCk7XG4gICAgICAgIGxvY2F0aW9uV3JhcHBlci5hcHBlbmRDaGlsZChsb2NhdGlvbkNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uV3JhcHBlcjtcbiAgICB9XG59IiwiLy8gaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9ndWlkZXMvZGVwZW5kZW5jeS1tYW5hZ2VtZW50L1xuLy8gaW1wb3J0cyBhbGwgaW1hZ2VzXG4vLyByZXR1cm5zIGFuIG9iamVjdCBhbmQgYXJyYXkgb2YgaW1hZ2VzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbXBvcnRBbGwocikge1xuICAgIGxldCBpbWFnZXMgPSB7fTtcbiAgICBsZXQgaW1hZ2VzQXJyID0gW11cbiAgICByLmtleXMoKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGltYWdlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgICAgIGltYWdlc0Fyci5wdXNoKGl0ZW0ucmVwbGFjZSgnLi8nLCAnJykpO1xuICAgIH0pO1xuICAgIHJldHVybiB7IGltYWdlcywgaW1hZ2VzQXJyIH07XG59IiwiaW1wb3J0ICcuLi9zdHlsZXMvbWVudS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1lbnUoKSB7XG4gICAgY29uc29sZS5sb2coYG1lbnUuanMgcnVubmluZ2ApO1xuICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51Q29udGFpbmVyLmlkID0gJ21lbnUnO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ01lbnUnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgbWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgbWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZW51LnJlbmRlcigpKTtcbiAgICByZXR1cm4gbWVudUNvbnRhaW5lcjtcbn1cblxuY29uc3QgZm9vZCA9IChkaXNoLCBkZXRhaWxzLCBwcmljZSkgPT4ge1xuICAgIGNvbnN0IGZvb2ROYW1lID0gZGlzaDtcbiAgICBjb25zdCBmb29kRGV0YWlscyA9IGRldGFpbHM7XG4gICAgY29uc3QgZm9vZFByaWNlID0gcHJpY2U7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGRpc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZE5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBkZXRhaWxzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvb2REZXRhaWxzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcHJpY2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZFByaWNlO1xuICAgICAgICB9LFxuICAgIH1cbn1cblxuY29uc3QgbWVudSA9IHtcbiAgICB0ZXN0OiAndGVzdCcsXG4gICAgZm9vZDoge1xuICAgICAgICBwaXp6YXM6IFtcbiAgICAgICAgICAgIGZvb2QoJ3Job2EnLCAndG9tYXRvIHNhdWNlLCBtb3p6YXJlbGxhLCBvcmVnYW5vLCByb2FzdGVkIHJob2EnLCAnMTUuMDAnKSxcbiAgICAgICAgICAgIGZvb2QoJ3BlcHBlcm9uaScsICd0b21hdG8gc2F1Y2UsIG1venphcmVsbGEsIG9yZWdhbm8sIHBlcHBlcm9uaScsICcxMC4wMCcpLFxuICAgICAgICAgICAgZm9vZCgnanVpY3kgb25lJywgJ3JhbmNoIHN1YWNlLCBtb3p6YXJlbGxhLCBwYXJzbGV5LCBCQlEgYmVhc3QnLCAnMTIuMDAnKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2FsYWRzOiBbXG4gICAgICAgICAgICBmb29kKCd3ZXRhJywgJ3JvbWFpbmUgbGV0dHVjZSwgY3VjdW1iZXIsIHN1bmZsb3dlciBzZWVkcywgdG9tYXRvZXMsIHdldGEnLCAnNS4wMCcpLFxuICAgICAgICAgICAgZm9vZCgncGVyYW5kdXMgY3J1bmNoJywgJ2dyZWVuIGNhYmJhZ2UsIGJ1dHRlcmhlYWQgbGV0dHVjZSwgYWxtb25kcywgY3JvdXRvbnMnLCAnOS4wMCcpLFxuICAgICAgICBdLFxuICAgICAgICBkZXNzZXJ0czogW1xuICAgICAgICAgICAgZm9vZChgYWx2YSdzIHNhY3JpZmljZWAsICd2YW5pbGxhIGljZSBjcmVhbSwgQXR6b2F0bCBzeXJ1cCwgd2FsbnV0cycsICc3LjAwJyksXG4gICAgICAgICAgICBmb29kKCd0aGUgZGVsdmUgYmFyJywgJ2F6dXJpdGUsIG9yZW9zLCBkYXJrIGNob2NvbGF0ZSBjaGlwcywgYWxtb25kcycsICc2LjAwJyksXG4gICAgICAgIF0sXG4gICAgICAgIGFwcGV0aXplcnM6IFtcbiAgICAgICAgICAgIGZvb2QoJ2JyZWFkc3RpY2snLCBudWxsLCcyLjAwJyksXG4gICAgICAgICAgICBmb29kKCd3YWZmbGUgZnJpZXMnLCBudWxsLCAnNC45OScpLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9vZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9vZFdyYXBwZXIuaWQgPSAnbWVudS1tYWluJztcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb29kQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5mb29kKSB7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbWVudVNlY3Rpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCgnaDInKSk7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbkhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgIG1lbnVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICBtZW51U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChtZW51U2VjdGlvbkhlYWRlclRleHQpO1xuICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudVNlY3Rpb25IZWFkZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmZvb2RbaXRlbV0ubWFwKGZvb2QgPT4geyBcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmZvIGluIGZvb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvb2RbaW5mb10gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVJdGVtUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobWVudUl0ZW1QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVJdGVtUGFyYWdyYXBoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8gPT09ICdwcmljZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNlbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGhUZXh0Lm5vZGVWYWx1ZSA9IGZvb2RbaW5mb10uc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNlbnRzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10uc3BsaXQoJy4nKVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1DZW50cy5hcHBlbmRDaGlsZChtZW51SXRlbUNlbnRzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobWVudUl0ZW1DZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudUl0ZW1Db250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb29kQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVTZWN0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGZvb2RXcmFwcGVyLmFwcGVuZENoaWxkKGZvb2RDb250YWluZXIpO1xuICAgICAgICByZXR1cm4gZm9vZFdyYXBwZXI7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==