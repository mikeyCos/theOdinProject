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

.links > li > a:not(.github):hover {
    background-color: var(--accent-color-secondary);
    color: var(--background-color-primary);
    transform: translateX(10%);
    transition: all 200ms ease-in-out;
}

.links > li > a.active {
    color: var(--accent-color-primary);
}

.links > li > a.github > img {
    max-width: 64px;
    width: 3vw;
    min-width: 24px;
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
        grid-template-columns: repeat(5, min-content);
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

    .links > li > a.github {
        display: inline-grid;
        display: -moz-inline-grid;
    }

    .links > li > a:not(.github):hover {
        background-color: transparent;
        transform: scale(1.25);
        transition: all 200ms ease-in-out;
    }

    .links > li > a:hover {
        transform: scale(1.25);
        transition: all 200ms ease-in-out;
    }

    .links > li > a:not(.github):after {
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
}`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n    font-family: 'Nunito Sans';\n    src: url('./assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC\\,opsz\\,wdth\\,wght.ttf'),\n        url('./assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC\\,opsz\\,wdth\\,wght.ttf');\n}\n\n@font-face {\n    font-family: 'Teko';\n    src: url('./assets/fonts/Teko/Teko-Light.ttf'),\n        url('./assets/fonts/Teko/Teko-Medium.ttf'),\n        url('./assets/fonts/Teko/Teko-Regular.ttf');\n}\n\n:root {\n    /* color palette */\n    /* https://coolors.co/320e3b-e56399-7f96ff-a6cfd5-dbfcff */\n    --background-color-primary: #F3FCF0;\n    --background-color-secondary: #FFD23F;\n    --accent-color-primary: #EE4266;\n    --accent-color-secondary: #1F271B;\n    --accent-color-tertiary: #540D6E;\n    --font-family-primary: 'Teko', arial, sans-serif;\n    --font-family-secondary: 'Nunito Sans', arial, sans-serif;\n    --padding-container: 0.5rem;\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    min-height: 100vh;\n    background-color: var(--background-color-primary);\n    display: grid;\n    grid-template-rows: min-content 1fr min-content;\n}\n\n#navbar {\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 100%;\n    z-index: 1;\n    animation: slide-right 400ms ease-in;\n}\n\n#navbar > .container {\n    display: grid;\n    grid-template-columns: max-content 1fr;\n    position: relative;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 1px 5px 0.5px black;\n}\n\n#navbar > .container > #logo {\n    padding: 1rem;\n}\n\n#navbar > .container > #logo > a {\n    font-family: var(--font-family-primary);\n    text-transform: uppercase;\n    font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n.links {\n    display: none;\n    grid-auto-rows: min-content;\n    list-style: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    gap: 0.5rem;\n    background-color: var(--background-color-secondary);\n    padding-top: 1rem;\n    align-items: center;\n}\n\n.links.active {\n    display: grid;\n    animation: slide-left 200ms ease;\n}\n\n.links > li > a {\n    display: block;\n    text-decoration: none;\n    font-size: clamp(1.5rem, 2vw, 2.25rem);\n    font-family: var(--font-family-secondary);\n    font-weight: 700;\n    color: var(--accent-color-secondary);\n    text-transform: uppercase;\n    padding: 0.25rem 1rem;\n}\n\n.links > li > a:not(.github):hover {\n    background-color: var(--accent-color-secondary);\n    color: var(--background-color-primary);\n    transform: translateX(10%);\n    transition: all 200ms ease-in-out;\n}\n\n.links > li > a.active {\n    color: var(--accent-color-primary);\n}\n\n.links > li > a.github > img {\n    max-width: 64px;\n    width: 3vw;\n    min-width: 24px;\n}\n\n.btn-menu {\n    justify-self: end;\n    border: none;\n    background: none;\n    position: relative;\n    z-index: 1;\n    padding: 0.5rem;\n}\n\n.btn-menu > img {\n    max-width: 32px;\n}\n\n#hero > .container {\n    position: relative;\n    display: grid;\n    min-height: 100vh;\n    box-shadow: 0px 1px 10px 2px black;\n}\n\n#hero > .container > .hero-text {\n    position: absolute;\n    justify-self: center;\n    align-self: center;\n}\n\n#hero > .container > .hero-text > h1::before {\n    position: absolute;\n    left: 0;\n    right: -2%;\n    bottom: -2%;\n    min-width: 100%;\n    align-self: center;\n    content: 'Exile\\'s Pizza';\n    font-family: var(--font-family-primary);\n    font-size: clamp(3.5rem, 18vw, 10rem);\n    color: var(--accent-color-primary);\n    letter-spacing: 1.5vw;\n    text-align: center;\n}\n\n#hero > .container > .hero-text > h1 {\n    font-size: clamp(3.5rem, 18vw, 10rem);\n    color: var(--background-color-secondary);\n    letter-spacing: 1.5vw;\n    text-align: center;\n    position: relative;\n    text-shadow: \n            0px 0px var(--background-color-primary),\n            2px -2px var(--background-color-primary);\n    transition: 400ms;\n}\n\n#hero > .container > .hero-text > h1:hover::before {\n    -webkit-mask: repeating-linear-gradient(45deg, transparent 0 3px, rgba(0, 0, 0, 0.8) 0 6px);\n    mask: repeating-linear-gradient(45deg, transparent 0 3px, rgba(0, 0, 0, 0.8) 0 6px);\n}\n#hero > .container > .hero-text > h1:hover {\n    text-shadow: \n            0px 0px var(--accent-color-secondary),\n            1px 1px var(--accent-color-secondary),\n            2px 2px var(--accent-color-secondary),\n            3px 3px var(--accent-color-secondary),\n            4px 4px var(--accent-color-secondary),\n            5px 5px var(--accent-color-secondary),\n            6px 6px var(--accent-color-secondary),\n            7px 7px var(--accent-color-secondary),\n            8px 8px var(--accent-color-secondary),\n            9px 9px var(--accent-color-secondary),\n            10px 10px var(--accent-color-secondary);\n    transition: 500ms;\n}\n\n#hero > .container > #carousel > .container {\n    display: grid;\n    min-height: 100%;\n}\n\n#hero > .container > #carousel > .container > button {\n    position: absolute;\n    align-self: center;\n    border: none;\n    background: none;\n    display: grid;\n}\n\n#hero > .container > #carousel > .container > button:hover {\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n#hero > .container > #carousel > .container > button:last-of-type {\n    right: 0;\n}\n\n#hero > .container > #carousel > .container > button > img {\n    width: clamp(2rem, 5vw, 5rem);\n    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(2%) hue-rotate(64deg) brightness(108%) contrast(101%);\n}\n\n#hero > .container > #carousel > .container > .carousel-item > img {\n    max-width: 100%;\n    min-height: 100%;\n    object-fit: cover;\n}\n\nh1, h2, h3, h5 {\n    font-family: var(--font-family-primary);\n    color: var(--accent-color-secondary);\n    text-transform: uppercase;\n    font-size: clamp(2rem, 5vw, 3rem);\n}\n\n#content {\n    min-height: 100vh;\n}\n\n#content > * {\n    scroll-margin-top: 5rem;\n    display: grid;\n    row-gap: 1rem;\n}\n\n#content > * > h1 {\n    text-align: center;\n    padding: 1rem;\n    margin-bottom: -2rem;\n    margin-top: 1rem;\n    font-size: clamp(3rem, 5vw, 5rem);\n\n    animation: slide-up 100ms ease-in;\n}\n\n#content > * > *:not(h1) > .container {\n    display: grid;\n    gap: 1rem;\n    padding: 1rem;\n    font-family: var(--font-family-secondary);\n\n    border: 9px solid transparent;\n    outline-offset: -20px;\n    outline-style: auto;\n    font-size: clamp(1rem, 5vw, 1.30rem);\n\n    animation: slide-up 200ms ease-in;\n}\n\n#content > * > *:not(h1) > .container > * {\n    padding: 1rem;\n    background-color: var(--background-color-secondary);\n    border: 2px solid black;\n}\n\nfooter {\n    padding: 1rem;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 4px 7px 3px black;\n}\n\nfooter > .container {\n    display: flex;\n    justify-content: center;\n}\n\nfooter > .container > h5 {\n    letter-spacing: 2px;\n    font-size: clamp(1rem, 3vw, 1.5rem);\n}\n\n@media screen and (min-width: 768px) {\n    #navbar {\n        animation: slide-left 200ms ease-in;\n    }\n\n    .links {\n        display: grid;\n        justify-content: end;\n        align-content: center;\n        grid-template-columns: repeat(5, min-content);\n        position: static;\n        padding-top: 0;\n        padding-right: 2rem;\n        grid-auto-rows: 1fr;\n        gap: 2rem;\n    }\n\n    .links > li > a {\n        padding: 0;\n        position: relative;\n        display: flex;\n        justify-items: center;\n    }\n\n    .links > li > a.github {\n        display: inline-grid;\n        display: -moz-inline-grid;\n    }\n\n    .links > li > a:not(.github):hover {\n        background-color: transparent;\n        transform: scale(1.25);\n        transition: all 200ms ease-in-out;\n    }\n\n    .links > li > a:hover {\n        transform: scale(1.25);\n        transition: all 200ms ease-in-out;\n    }\n\n    .links > li > a:not(.github):after {\n        position: absolute;\n        bottom: -10%;\n        content: '';\n        width: 100%;\n        height: 0.2rem;\n        background-color: var(--accent-color-secondary);\n        transform: scaleX(0);\n        transition: all 200ms ease-in-out;\n    }\n\n    .links > li > a:hover:after {\n        transform: scaleX(1) scaleY(1.5);\n    }\n\n    .btn-menu {\n        display: none;\n    }\n}\n\n@keyframes slide-right {\n    0% {\n        transform: translateX(-200%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}\n\n@keyframes slide-left {\n    0% {\n        transform: translateX(200%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}\n\n@keyframes slide-up {\n    0% {\n        transform: translateY(100%);\n    }\n    \n    100% {\n        transform: translateY(0%);\n    }\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `@media screen and (min-width: 768px) {
    #about > #history > .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/about.css"],"names":[],"mappings":"AAAA;IACI;QACI,aAAa;QACb,qCAAqC;IACzC;AACJ","sourcesContent":["@media screen and (min-width: 768px) {\n    #about > #history > .container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n    }\n}"],"sourceRoot":""}]);
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
    text-decoration: underline;
}

#form > .container > .form-item {
    display: grid;
}

#form > .container > .form-item > label {
    font-weight: 700;
    text-transform: uppercase;
}

/* selects inputs and textarea */
#form > .container > .form-item > *:nth-child(n + 2) {
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
}`, "",{"version":3,"sources":["webpack://./src/styles/contact.css"],"names":[],"mappings":"AAAA;IACI,UAAU;AACd;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,gBAAgB;IAChB,yBAAyB;AAC7B;;AAEA,gCAAgC;AAChC;IACI,sBAAsB;IACtB,aAAa;IACb,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,+CAA+C;IAC/C,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,oBAAoB;IACpB,mBAAmB;AACvB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,mBAAmB;IACnB,6CAA6C;IAC7C,iCAAiC;IACjC,yCAAyC;IACzC,gBAAgB;IAChB,oCAAoC;IACpC,yBAAyB;AAC7B;;AAEA;IACI;AACJ;;AAEA;IACI;QACI,qCAAqC;IACzC;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI;IACJ;;IAEA;QACI,qBAAqB;IACzB;AACJ","sourcesContent":["label > .asterik {\n    color: red;\n}\n\n#form > .container >:first-child {\n    text-decoration: underline;\n}\n\n#form > .container > .form-item {\n    display: grid;\n}\n\n#form > .container > .form-item > label {\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n/* selects inputs and textarea */\n#form > .container > .form-item > *:nth-child(n + 2) {\n    border-radius: 0.35rem;\n    outline: none;\n    border-color: transparent;\n    padding: 0.5rem;\n}\n\n#form > .container > .form-item > *:nth-child(n + 2)::placeholder {\n    text-transform: uppercase;\n    text-indent: 5%;\n}\n\n#form > .container > .form-item > *:nth-child(n + 2):focus {\n    border: 4px solid var(--accent-color-secondary);\n    padding: 0.75rem;\n}\n\n#form > .container > .form-item:last-child {\n    border: none;\n    background: none;\n    justify-self: center;\n    margin-bottom: 1rem;\n}\n\n#form > .container > .form-item:last-child > button {\n    padding: 0.75rem 4rem;\n    border: none;\n    border-radius: 2rem;\n    background-color: var(--accent-color-primary);\n    box-shadow: 0px 1px 2px 0px black;\n    font-family: var(--font-family-secondary);\n    font-weight: 700;\n    font-size: clamp(1.25rem, 1vw, 2rem);\n    text-transform: uppercase;\n}\n\n#form > .container > .form-item:last-child > button:active {\n    box-shadow: 0px 2px 3px 1px black\n}\n\n@media screen and (min-width: 768px) {\n    #form > .container {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    #form > .container > label {\n        grid-area: 1 / span 2;\n    }\n\n    #form > .container > .form-item:first-of-type {\n        grid-area: 2 / span 2;\n    }\n\n    #form > .container > .form-item:nth-of-type(4) {\n        grid-area: 4 / span 2\n    }\n\n    #form > .container > .form-item:last-of-type {\n        grid-area: 5 / span 2;\n    }\n}"],"sourceRoot":""}]);
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

/***/ "./src/assets/github-mark sync \\.svg$":
/*!**********************************************************!*\
  !*** ./src/assets/github-mark/ sync nonrecursive \.svg$ ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./github-mark-white.svg": "./src/assets/github-mark/github-mark-white.svg",
	"./github-mark.svg": "./src/assets/github-mark/github-mark.svg"
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
webpackContext.id = "./src/assets/github-mark sync \\.svg$";

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
    github: (0,_images_js__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/github-mark sync \\.svg$")),
    images: (0,_images_js__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/images sync \\.jpg$")),
}

const navLinks = ['home', 'about', 'menu', 'contact', 'github-mark.svg'];

function buildHeader() {
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
            let href;
            let className;
    
            if (item.includes('svg')) {
                const githubIcon = document.createElement('img');
                anchor.setAttribute('target', '_blank');
                githubIcon.src = assets.github.images[item];
                anchor.appendChild(githubIcon);
                href = 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/restaurant-page';
                className = 'github';
            } else {
                const navItemText = document.createTextNode(item);
                anchor.appendChild(navItemText);
                href = `#${item}`;
                className = item;
            }
            anchor.href = href;
            anchor.classList.add(className);

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

/***/ "./src/assets/github-mark/github-mark-white.svg":
/*!******************************************************!*\
  !*** ./src/assets/github-mark/github-mark-white.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "97ed8e7eef60d61ca469.svg";

/***/ }),

/***/ "./src/assets/github-mark/github-mark.svg":
/*!************************************************!*\
  !*** ./src/assets/github-mark/github-mark.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6fa18895f6e6c7772cab.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QyxpT0FBNkY7QUFDekksNENBQTRDLCtPQUFvRztBQUNoSiw0Q0FBNEMsaUpBQXFEO0FBQ2pHLDRDQUE0QyxtSkFBc0Q7QUFDbEcsNENBQTRDLHFKQUF1RDtBQUNuRyw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1DQUFtQztBQUNsRCxjQUFjLG1DQUFtQztBQUNqRDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsY0FBYyxtQ0FBbUM7QUFDakQsY0FBYyxtQ0FBbUM7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsWUFBWSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksT0FBTyxPQUFPLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxh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QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRTRCOztBQUVkO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsSUFBSSxJQUFJLHFCQUFxQjtBQUMvRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRStCOztBQUVoQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxRQUFRO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5R2U7QUFDZjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZG9DOztBQUVwQztBQUNBLFdBQVcsc0RBQVMsQ0FBQyxzREFBb0Q7QUFDekUsWUFBWSxzREFBUyxDQUFDLDREQUF5RDtBQUMvRSxZQUFZLHNEQUFTLENBQUMsdURBQXFEO0FBQzNFOztBQUVBOztBQUVlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7O0FBR1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQ3JNNEI7O0FBRWI7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhO0FBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYNEI7O0FBRWI7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9hYm91dC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9jb250YWN0LmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2hvbWUuY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvbWVudS5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2Fib3V0LmNzcz9kMTE3Iiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvY29udGFjdC5jc3M/Mjk2MiIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2hvbWUuY3NzPzRiNTEiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9tZW51LmNzcz83MDBhIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2Fzc2V0cy9naXRodWItbWFyay8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvYXNzZXRzL2ljb25zLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5zdmckIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9hc3NldHMvaW1hZ2VzLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5qcGckIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9hYm91dC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9jb250YWN0LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvaG9tZS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvbWVudS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvTnVuaXRvX1NhbnMvTnVuaXRvU2Fucy1WYXJpYWJsZUZvbnRfWVRMQyxvcHN6LHdkdGgsd2dodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLUl0YWxpYy1WYXJpYWJsZUZvbnRfWVRMQyxvcHN6LHdkdGgsd2dodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9UZWtvL1Rla28tTGlnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9UZWtvL1Rla28tUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogJ051bml0byBTYW5zJztcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogJ1Rla28nO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KTtcbn1cblxuOnJvb3Qge1xuICAgIC8qIGNvbG9yIHBhbGV0dGUgKi9cbiAgICAvKiBodHRwczovL2Nvb2xvcnMuY28vMzIwZTNiLWU1NjM5OS03Zjk2ZmYtYTZjZmQ1LWRiZmNmZiAqL1xuICAgIC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5OiAjRjNGQ0YwO1xuICAgIC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnk6ICNGRkQyM0Y7XG4gICAgLS1hY2NlbnQtY29sb3ItcHJpbWFyeTogI0VFNDI2NjtcbiAgICAtLWFjY2VudC1jb2xvci1zZWNvbmRhcnk6ICMxRjI3MUI7XG4gICAgLS1hY2NlbnQtY29sb3ItdGVydGlhcnk6ICM1NDBENkU7XG4gICAgLS1mb250LWZhbWlseS1wcmltYXJ5OiAnVGVrbycsIGFyaWFsLCBzYW5zLXNlcmlmO1xuICAgIC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5OiAnTnVuaXRvIFNhbnMnLCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgICAtLXBhZGRpbmctY29udGFpbmVyOiAwLjVyZW07XG59XG5cbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG59XG5cbmJvZHkge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeSk7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmciBtaW4tY29udGVudDtcbn1cblxuI25hdmJhciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB6LWluZGV4OiAxO1xuICAgIGFuaW1hdGlvbjogc2xpZGUtcmlnaHQgNDAwbXMgZWFzZS1pbjtcbn1cblxuI25hdmJhciA+IC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDVweCAwLjVweCBibGFjaztcbn1cblxuI25hdmJhciA+IC5jb250YWluZXIgPiAjbG9nbyB7XG4gICAgcGFkZGluZzogMXJlbTtcbn1cblxuI25hdmJhciA+IC5jb250YWluZXIgPiAjbG9nbyA+IGEge1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCA1dncsIDNyZW0pO1xufVxuXG4ubGlua3Mge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50O1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB0b3A6IDA7XG4gICAgZ2FwOiAwLjVyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIHBhZGRpbmctdG9wOiAxcmVtO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5saW5rcy5hY3RpdmUge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgYW5pbWF0aW9uOiBzbGlkZS1sZWZ0IDIwMG1zIGVhc2U7XG59XG5cbi5saW5rcyA+IGxpID4gYSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDIuMjVyZW0pO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgcGFkZGluZzogMC4yNXJlbSAxcmVtO1xufVxuXG4ubGlua3MgPiBsaSA+IGE6bm90KC5naXRodWIpOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbi5saW5rcyA+IGxpID4gYS5hY3RpdmUge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG59XG5cbi5saW5rcyA+IGxpID4gYS5naXRodWIgPiBpbWcge1xuICAgIG1heC13aWR0aDogNjRweDtcbiAgICB3aWR0aDogM3Z3O1xuICAgIG1pbi13aWR0aDogMjRweDtcbn1cblxuLmJ0bi1tZW51IHtcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi5idG4tbWVudSA+IGltZyB7XG4gICAgbWF4LXdpZHRoOiAzMnB4O1xufVxuXG4jaGVybyA+IC5jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMTBweCAycHggYmxhY2s7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+IC5oZXJvLXRleHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+IC5oZXJvLXRleHQgPiBoMTo6YmVmb3JlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogLTIlO1xuICAgIGJvdHRvbTogLTIlO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgY29udGVudDogJ0V4aWxlXFxcXCdzIFBpenphJztcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG4gICAgZm9udC1zaXplOiBjbGFtcCgzLjVyZW0sIDE4dncsIDEwcmVtKTtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xuICAgIGxldHRlci1zcGFjaW5nOiAxLjV2dztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+IC5oZXJvLXRleHQgPiBoMSB7XG4gICAgZm9udC1zaXplOiBjbGFtcCgzLjVyZW0sIDE4dncsIDEwcmVtKTtcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIGxldHRlci1zcGFjaW5nOiAxLjV2dztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRleHQtc2hhZG93OiBcbiAgICAgICAgICAgIDBweCAwcHggdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KSxcbiAgICAgICAgICAgIDJweCAtMnB4IHZhcigtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeSk7XG4gICAgdHJhbnNpdGlvbjogNDAwbXM7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+IC5oZXJvLXRleHQgPiBoMTpob3Zlcjo6YmVmb3JlIHtcbiAgICAtd2Via2l0LW1hc2s6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDAgM3B4LCByZ2JhKDAsIDAsIDAsIDAuOCkgMCA2cHgpO1xuICAgIG1hc2s6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDAgM3B4LCByZ2JhKDAsIDAsIDAsIDAuOCkgMCA2cHgpO1xufVxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOmhvdmVyIHtcbiAgICB0ZXh0LXNoYWRvdzogXG4gICAgICAgICAgICAwcHggMHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgMXB4IDFweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDJweCAycHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICAzcHggM3B4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgNHB4IDRweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDVweCA1cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICA2cHggNnB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgN3B4IDdweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDhweCA4cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICA5cHggOXB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgMTBweCAxMHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIHRyYW5zaXRpb246IDUwMG1zO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgZGlzcGxheTogZ3JpZDtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSB7XG4gICAgcmlnaHQ6IDA7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24gPiBpbWcge1xuICAgIHdpZHRoOiBjbGFtcCgycmVtLCA1dncsIDVyZW0pO1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoMTAwJSkgc2VwaWEoMyUpIHNhdHVyYXRlKDIlKSBodWUtcm90YXRlKDY0ZGVnKSBicmlnaHRuZXNzKDEwOCUpIGNvbnRyYXN0KDEwMSUpO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gLmNhcm91c2VsLWl0ZW0gPiBpbWcge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuXG5oMSwgaDIsIGgzLCBoNSB7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgNXZ3LCAzcmVtKTtcbn1cblxuI2NvbnRlbnQge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuXG4jY29udGVudCA+ICoge1xuICAgIHNjcm9sbC1tYXJnaW4tdG9wOiA1cmVtO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgcm93LWdhcDogMXJlbTtcbn1cblxuI2NvbnRlbnQgPiAqID4gaDEge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG1hcmdpbi1ib3R0b206IC0ycmVtO1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgZm9udC1zaXplOiBjbGFtcCgzcmVtLCA1dncsIDVyZW0pO1xuXG4gICAgYW5pbWF0aW9uOiBzbGlkZS11cCAxMDBtcyBlYXNlLWluO1xufVxuXG4jY29udGVudCA+ICogPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdhcDogMXJlbTtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xuXG4gICAgYm9yZGVyOiA5cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgb3V0bGluZS1vZmZzZXQ6IC0yMHB4O1xuICAgIG91dGxpbmUtc3R5bGU6IGF1dG87XG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMzByZW0pO1xuXG4gICAgYW5pbWF0aW9uOiBzbGlkZS11cCAyMDBtcyBlYXNlLWluO1xufVxuXG4jY29udGVudCA+ICogPiAqOm5vdChoMSkgPiAuY29udGFpbmVyID4gKiB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG59XG5cbmZvb3RlciB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDRweCA3cHggM3B4IGJsYWNrO1xufVxuXG5mb290ZXIgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5mb290ZXIgPiAuY29udGFpbmVyID4gaDUge1xuICAgIGxldHRlci1zcGFjaW5nOiAycHg7XG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAzdncsIDEuNXJlbSk7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgI25hdmJhciB7XG4gICAgICAgIGFuaW1hdGlvbjogc2xpZGUtbGVmdCAyMDBtcyBlYXNlLWluO1xuICAgIH1cblxuICAgIC5saW5rcyB7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZW5kO1xuICAgICAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIG1pbi1jb250ZW50KTtcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDJyZW07XG4gICAgICAgIGdyaWQtYXV0by1yb3dzOiAxZnI7XG4gICAgICAgIGdhcDogMnJlbTtcbiAgICB9XG5cbiAgICAubGlua3MgPiBsaSA+IGEge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgICB9XG5cbiAgICAubGlua3MgPiBsaSA+IGEuZ2l0aHViIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWdyaWQ7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otaW5saW5lLWdyaWQ7XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhOm5vdCguZ2l0aHViKTpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhOmhvdmVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjI1KTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICAgIC5saW5rcyA+IGxpID4gYTpub3QoLmdpdGh1Yik6YWZ0ZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogLTEwJTtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDAuMnJlbTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDApO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhOmhvdmVyOmFmdGVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMSkgc2NhbGVZKDEuNSk7XG4gICAgfVxuXG4gICAgLmJ0bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgc2xpZGUtcmlnaHQge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMDAlKTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgc2xpZGUtbGVmdCB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjAwJSk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLXVwIHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgICB9XG4gICAgXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLDBCQUEwQjtJQUMxQjsrQ0FDK0Y7QUFDbkc7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkI7OytDQUUrQztBQUNuRDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQiwwREFBMEQ7SUFDMUQsbUNBQW1DO0lBQ25DLHFDQUFxQztJQUNyQywrQkFBK0I7SUFDL0IsaUNBQWlDO0lBQ2pDLGdDQUFnQztJQUNoQyxnREFBZ0Q7SUFDaEQseURBQXlEO0lBQ3pELDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsVUFBVTtBQUNkOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGlEQUFpRDtJQUNqRCxhQUFhO0lBQ2IsK0NBQStDO0FBQ25EOztBQUVBO0lBQ0ksZUFBZTtJQUNmLE1BQU07SUFD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QTZDO0lBQzdDLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0k7UUFDSSxtQ0FBbUM7SUFDdkM7O0lBRUE7UUFDSSxhQUFhO1FBQ2Isb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQiw2Q0FBNkM7UUFDN0MsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLFNBQVM7SUFDYjs7SUFFQTtRQUNJLFVBQVU7UUFDVixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLHFCQUFxQjtJQUN6Qjs7SUFFQTtRQUNJLG9CQUFvQjtRQUNwQix5QkFBeUI7SUFDN0I7O0lBRUE7UUFDSSw2QkFBNkI7UUFDN0Isc0JBQXNCO1FBQ3RCLGlDQUFpQztJQUNyQzs7SUFFQTtRQUNJLHNCQUFzQjtRQUN0QixpQ0FBaUM7SUFDckM7O0lBRUE7UUFDSSxrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLFdBQVc7UUFDWCxXQUFXO1FBQ1gsY0FBYztRQUNkLCtDQUErQztRQUMvQyxvQkFBb0I7UUFDcEIsaUNBQWlDO0lBQ3JDOztJQUVBO1FBQ0ksZ0NBQWdDO0lBQ3BDOztJQUVBO1FBQ0ksYUFBYTtJQUNqQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSw0QkFBNEI7SUFDaEM7O0lBRUE7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksMkJBQTJCO0lBQy9COztJQUVBO1FBQ0kseUJBQXlCO0lBQzdCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLDJCQUEyQjtJQUMvQjs7SUFFQTtRQUNJLHlCQUF5QjtJQUM3QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ051bml0byBTYW5zJztcXG4gICAgc3JjOiB1cmwoJy4vYXNzZXRzL2ZvbnRzL051bml0b19TYW5zL051bml0b1NhbnMtVmFyaWFibGVGb250X1lUTENcXFxcLG9wc3pcXFxcLHdkdGhcXFxcLHdnaHQudHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL051bml0b19TYW5zL051bml0b1NhbnMtSXRhbGljLVZhcmlhYmxlRm9udF9ZVExDXFxcXCxvcHN6XFxcXCx3ZHRoXFxcXCx3Z2h0LnR0ZicpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdUZWtvJztcXG4gICAgc3JjOiB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1MaWdodC50dGYnKSxcXG4gICAgICAgIHVybCgnLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLU1lZGl1bS50dGYnKSxcXG4gICAgICAgIHVybCgnLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLVJlZ3VsYXIudHRmJyk7XFxufVxcblxcbjpyb290IHtcXG4gICAgLyogY29sb3IgcGFsZXR0ZSAqL1xcbiAgICAvKiBodHRwczovL2Nvb2xvcnMuY28vMzIwZTNiLWU1NjM5OS03Zjk2ZmYtYTZjZmQ1LWRiZmNmZiAqL1xcbiAgICAtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeTogI0YzRkNGMDtcXG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXNlY29uZGFyeTogI0ZGRDIzRjtcXG4gICAgLS1hY2NlbnQtY29sb3ItcHJpbWFyeTogI0VFNDI2NjtcXG4gICAgLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5OiAjMUYyNzFCO1xcbiAgICAtLWFjY2VudC1jb2xvci10ZXJ0aWFyeTogIzU0MEQ2RTtcXG4gICAgLS1mb250LWZhbWlseS1wcmltYXJ5OiAnVGVrbycsIGFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAtLWZvbnQtZmFtaWx5LXNlY29uZGFyeTogJ051bml0byBTYW5zJywgYXJpYWwsIHNhbnMtc2VyaWY7XFxuICAgIC0tcGFkZGluZy1jb250YWluZXI6IDAuNXJlbTtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmciBtaW4tY29udGVudDtcXG59XFxuXFxuI25hdmJhciB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIGFuaW1hdGlvbjogc2xpZGUtcmlnaHQgNDAwbXMgZWFzZS1pbjtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XFxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggNXB4IDAuNXB4IGJsYWNrO1xcbn1cXG5cXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICNsb2dvIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAjbG9nbyA+IGEge1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCA1dncsIDNyZW0pO1xcbn1cXG5cXG4ubGlua3Mge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQ7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgdG9wOiAwO1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmxpbmtzLmFjdGl2ZSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGFuaW1hdGlvbjogc2xpZGUtbGVmdCAyMDBtcyBlYXNlO1xcbn1cXG5cXG4ubGlua3MgPiBsaSA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAyLjI1cmVtKTtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXNlY29uZGFyeSk7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgcGFkZGluZzogMC4yNXJlbSAxcmVtO1xcbn1cXG5cXG4ubGlua3MgPiBsaSA+IGE6bm90KC5naXRodWIpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAlKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ubGlua3MgPiBsaSA+IGEuYWN0aXZlIHtcXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhLmdpdGh1YiA+IGltZyB7XFxuICAgIG1heC13aWR0aDogNjRweDtcXG4gICAgd2lkdGg6IDN2dztcXG4gICAgbWluLXdpZHRoOiAyNHB4O1xcbn1cXG5cXG4uYnRuLW1lbnUge1xcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuLmJ0bi1tZW51ID4gaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAzMnB4O1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDEwcHggMnB4IGJsYWNrO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6OmJlZm9yZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IC0yJTtcXG4gICAgYm90dG9tOiAtMiU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgICBjb250ZW50OiAnRXhpbGVcXFxcJ3MgUGl6emEnO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMy41cmVtLCAxOHZ3LCAxMHJlbSk7XFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XFxuICAgIGxldHRlci1zcGFjaW5nOiAxLjV2dztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDEge1xcbiAgICBmb250LXNpemU6IGNsYW1wKDMuNXJlbSwgMTh2dywgMTByZW0pO1xcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0ZXh0LXNoYWRvdzogXFxuICAgICAgICAgICAgMHB4IDBweCB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpLFxcbiAgICAgICAgICAgIDJweCAtMnB4IHZhcigtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeSk7XFxuICAgIHRyYW5zaXRpb246IDQwMG1zO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6aG92ZXI6OmJlZm9yZSB7XFxuICAgIC13ZWJraXQtbWFzazogcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg0NWRlZywgdHJhbnNwYXJlbnQgMCAzcHgsIHJnYmEoMCwgMCwgMCwgMC44KSAwIDZweCk7XFxuICAgIG1hc2s6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDAgM3B4LCByZ2JhKDAsIDAsIDAsIDAuOCkgMCA2cHgpO1xcbn1cXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6aG92ZXIge1xcbiAgICB0ZXh0LXNoYWRvdzogXFxuICAgICAgICAgICAgMHB4IDBweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICAxcHggMXB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDJweCAycHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgM3B4IDNweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICA0cHggNHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDVweCA1cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgNnB4IDZweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICA3cHggN3B4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDhweCA4cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgOXB4IDlweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICAxMHB4IDEwcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIHRyYW5zaXRpb246IDUwMG1zO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgbWluLWhlaWdodDogMTAwJTtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b246bGFzdC1vZi10eXBlIHtcXG4gICAgcmlnaHQ6IDA7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24gPiBpbWcge1xcbiAgICB3aWR0aDogY2xhbXAoMnJlbSwgNXZ3LCA1cmVtKTtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDApIHNhdHVyYXRlKDEwMCUpIGludmVydCgxMDAlKSBzZXBpYSgzJSkgc2F0dXJhdGUoMiUpIGh1ZS1yb3RhdGUoNjRkZWcpIGJyaWdodG5lc3MoMTA4JSkgY29udHJhc3QoMTAxJSk7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiAuY2Fyb3VzZWwtaXRlbSA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgbWluLWhlaWdodDogMTAwJTtcXG4gICAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcblxcbmgxLCBoMiwgaDMsIGg1IHtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgNXZ3LCAzcmVtKTtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI2NvbnRlbnQgPiAqIHtcXG4gICAgc2Nyb2xsLW1hcmdpbi10b3A6IDVyZW07XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbiNjb250ZW50ID4gKiA+IGgxIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAtMnJlbTtcXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgzcmVtLCA1dncsIDVyZW0pO1xcblxcbiAgICBhbmltYXRpb246IHNsaWRlLXVwIDEwMG1zIGVhc2UtaW47XFxufVxcblxcbiNjb250ZW50ID4gKiA+ICo6bm90KGgxKSA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBnYXA6IDFyZW07XFxuICAgIHBhZGRpbmc6IDFyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xcblxcbiAgICBib3JkZXI6IDlweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgb3V0bGluZS1vZmZzZXQ6IC0yMHB4O1xcbiAgICBvdXRsaW5lLXN0eWxlOiBhdXRvO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMS4zMHJlbSk7XFxuXFxuICAgIGFuaW1hdGlvbjogc2xpZGUtdXAgMjAwbXMgZWFzZS1pbjtcXG59XFxuXFxuI2NvbnRlbnQgPiAqID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciA+ICoge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XFxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggN3B4IDNweCBibGFjaztcXG59XFxuXFxuZm9vdGVyID4gLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5mb290ZXIgPiAuY29udGFpbmVyID4gaDUge1xcbiAgICBsZXR0ZXItc3BhY2luZzogMnB4O1xcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDN2dywgMS41cmVtKTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgI25hdmJhciB7XFxuICAgICAgICBhbmltYXRpb246IHNsaWRlLWxlZnQgMjAwbXMgZWFzZS1pbjtcXG4gICAgfVxcblxcbiAgICAubGlua3Mge1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgICAgICAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgbWluLWNvbnRlbnQpO1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIHBhZGRpbmctdG9wOiAwO1xcbiAgICAgICAgcGFkZGluZy1yaWdodDogMnJlbTtcXG4gICAgICAgIGdyaWQtYXV0by1yb3dzOiAxZnI7XFxuICAgICAgICBnYXA6IDJyZW07XFxuICAgIH1cXG5cXG4gICAgLmxpbmtzID4gbGkgPiBhIHtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYS5naXRodWIge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWdyaWQ7XFxuICAgICAgICBkaXNwbGF5OiAtbW96LWlubGluZS1ncmlkO1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYTpub3QoLmdpdGh1Yik6aG92ZXIge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYTpob3ZlciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYTpub3QoLmdpdGh1Yik6YWZ0ZXIge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgYm90dG9tOiAtMTAlO1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgIGhlaWdodDogMC4ycmVtO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gICAgfVxcblxcbiAgICAubGlua3MgPiBsaSA+IGE6aG92ZXI6YWZ0ZXIge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMSkgc2NhbGVZKDEuNSk7XFxuICAgIH1cXG5cXG4gICAgLmJ0bi1tZW51IHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBzbGlkZS1yaWdodCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjAwJSk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGUtbGVmdCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMDAlKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBzbGlkZS11cCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcXG4gICAgfVxcbiAgICBcXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAjYWJvdXQgPiAjaGlzdG9yeSA+IC5jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvYWJvdXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0k7UUFDSSxhQUFhO1FBQ2IscUNBQXFDO0lBQ3pDO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgI2Fib3V0ID4gI2hpc3RvcnkgPiAuY29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgbGFiZWwgPiAuYXN0ZXJpayB7XG4gICAgY29sb3I6IHJlZDtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID46Zmlyc3QtY2hpbGQge1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtIHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gbGFiZWwge1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLyogc2VsZWN0cyBpbnB1dHMgYW5kIHRleHRhcmVhICovXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpIHtcbiAgICBib3JkZXItcmFkaXVzOiAwLjM1cmVtO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiAqOm50aC1jaGlsZChuICsgMik6OnBsYWNlaG9sZGVyIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIHRleHQtaW5kZW50OiA1JTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKTpmb2N1cyB7XG4gICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b24ge1xuICAgIHBhZGRpbmc6IDAuNzVyZW0gNHJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4IGJsYWNrO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjI1cmVtLCAxdncsIDJyZW0pO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCA+IGJ1dHRvbjphY3RpdmUge1xuICAgIGJveC1zaGFkb3c6IDBweCAycHggM3B4IDFweCBibGFja1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICNmb3JtID4gLmNvbnRhaW5lciB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gICAgfVxuXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gbGFiZWwge1xuICAgICAgICBncmlkLWFyZWE6IDEgLyBzcGFuIDI7XG4gICAgfVxuXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpmaXJzdC1vZi10eXBlIHtcbiAgICAgICAgZ3JpZC1hcmVhOiAyIC8gc3BhbiAyO1xuICAgIH1cblxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bnRoLW9mLXR5cGUoNCkge1xuICAgICAgICBncmlkLWFyZWE6IDQgLyBzcGFuIDJcbiAgICB9XG5cbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3Qtb2YtdHlwZSB7XG4gICAgICAgIGdyaWQtYXJlYTogNSAvIHNwYW4gMjtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2NvbnRhY3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQix5QkFBeUI7QUFDN0I7O0FBRUEsZ0NBQWdDO0FBQ2hDO0lBQ0ksc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksK0NBQStDO0lBQy9DLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLDZDQUE2QztJQUM3QyxpQ0FBaUM7SUFDakMseUNBQXlDO0lBQ3pDLGdCQUFnQjtJQUNoQixvQ0FBb0M7SUFDcEMseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0k7QUFDSjs7QUFFQTtJQUNJO1FBQ0kscUNBQXFDO0lBQ3pDOztJQUVBO1FBQ0kscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0kscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0k7SUFDSjs7SUFFQTtRQUNJLHFCQUFxQjtJQUN6QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImxhYmVsID4gLmFzdGVyaWsge1xcbiAgICBjb2xvcjogcmVkO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPjpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+IGxhYmVsIHtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLyogc2VsZWN0cyBpbnB1dHMgYW5kIHRleHRhcmVhICovXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKSB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+ICo6bnRoLWNoaWxkKG4gKyAyKTo6cGxhY2Vob2xkZXIge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICB0ZXh0LWluZGVudDogNSU7XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiAqOm50aC1jaGlsZChuICsgMik6Zm9jdXMge1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgcGFkZGluZzogMC43NXJlbTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkID4gYnV0dG9uIHtcXG4gICAgcGFkZGluZzogMC43NXJlbSA0cmVtO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4IGJsYWNrO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjI1cmVtLCAxdncsIDJyZW0pO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b246YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAzcHggMXB4IGJsYWNrXFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNmb3JtID4gLmNvbnRhaW5lciB7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgICB9XFxuXFxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IGxhYmVsIHtcXG4gICAgICAgIGdyaWQtYXJlYTogMSAvIHNwYW4gMjtcXG4gICAgfVxcblxcbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmZpcnN0LW9mLXR5cGUge1xcbiAgICAgICAgZ3JpZC1hcmVhOiAyIC8gc3BhbiAyO1xcbiAgICB9XFxuXFxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bnRoLW9mLXR5cGUoNCkge1xcbiAgICAgICAgZ3JpZC1hcmVhOiA0IC8gc3BhbiAyXFxuICAgIH1cXG5cXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LW9mLXR5cGUge1xcbiAgICAgICAgZ3JpZC1hcmVhOiA1IC8gc3BhbiAyO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2hvbWUgPiAqOm5vdChoMSkgPiAuY29udGFpbmVyID4gaDIsXG4jaG9tZSA+ICo6bGFzdC1jaGlsZCA+IC5jb250YWluZXIgPiBwIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICBjb2x1bW4tZ2FwOiA1dnc7XG59XG5cbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgybiAtIDEgKSB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgybikge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgI2hvbWUge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIH1cblxuICAgICNob21lID4gaDEsXG4gICAgI2hvbWUgPiAjc3RhdGVtZW50IHtcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gMjtcbiAgICB9XG5cbiAgICAjaG9tZSA+ICNsb2NhdGlvbiA+IC5jb250YWluZXIge1xuICAgICAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50O1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaG9tZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7O0lBRUksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJO1FBQ0kscUNBQXFDO0lBQ3pDOztJQUVBOztRQUVJLG1CQUFtQjtJQUN2Qjs7SUFFQTtRQUNJLGdCQUFnQjtRQUNoQiwrQkFBK0I7SUFDbkM7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjaG9tZSA+ICo6bm90KGgxKSA+IC5jb250YWluZXIgPiBoMixcXG4jaG9tZSA+ICo6bGFzdC1jaGlsZCA+IC5jb250YWluZXIgPiBwIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICAgIGNvbHVtbi1nYXA6IDV2dztcXG59XFxuXFxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwgPiA6bnRoLWNoaWxkKDJuIC0gMSApIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgybikge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgICAjaG9tZSB7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgICB9XFxuXFxuICAgICNob21lID4gaDEsXFxuICAgICNob21lID4gI3N0YXRlbWVudCB7XFxuICAgICAgICBncmlkLWNvbHVtbjogc3BhbiAyO1xcbiAgICB9XFxuXFxuICAgICNob21lID4gI2xvY2F0aW9uID4gLmNvbnRhaW5lciB7XFxuICAgICAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudDtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHJvdy1nYXA6IDFyZW07XG59XG5cbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0ge1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6Zmlyc3QtY2hpbGQge1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpsYXN0LWNoaWxkID4gc3VwIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDAuNjVyZW0sIDJ2dywgMC45NXJlbSk7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgcGFkZGluZzogMC4xNXJlbTtcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6Zmlyc3QtY2hpbGQ6OmFmdGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgY29udGVudDogJyAnO1xuICAgIHdpZHRoOiA3NSU7XG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IGRvdHRlZCBibGFjaztcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6bnRoLWNoaWxkKG4gKyAyKSB7XG4gICAgdGV4dC1hbGlnbjogZW5kO1xuICAgIHRleHQtd3JhcDogYmFsYW5jZTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAjY29udGVudCA+ICNtZW51ID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDBCQUEwQjtJQUMxQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1Q0FBdUM7SUFDdkMsMEJBQTBCO0lBQzFCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixPQUFPO0lBQ1AsU0FBUztJQUNULFlBQVk7SUFDWixVQUFVO0lBQ1YsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0k7UUFDSSxxQ0FBcUM7SUFDekM7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0ge1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmZpcnN0LWNoaWxkIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpsYXN0LWNoaWxkID4gc3VwIHtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgwLjY1cmVtLCAydncsIDAuOTVyZW0pO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gICAgcGFkZGluZzogMC4xNXJlbTtcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6Zmlyc3QtY2hpbGQ6OmFmdGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgd2lkdGg6IDc1JTtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IGRvdHRlZCBibGFjaztcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6bnRoLWNoaWxkKG4gKyAyKSB7XFxuICAgIHRleHQtYWxpZ246IGVuZDtcXG4gICAgdGV4dC13cmFwOiBiYWxhbmNlO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNjb250ZW50ID4gI21lbnUgPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Fib3V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYWJvdXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NvbnRhY3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jb250YWN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWVudS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLXdoaXRlLnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvZ2l0aHViLW1hcmsgc3luYyBcXFxcLnN2ZyRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vbWVudS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWVudS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2RvdWdoMC5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL2RvdWdoMC5qcGdcIixcblx0XCIuL3BpenphMC5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMC5qcGdcIixcblx0XCIuL3BpenphMS5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMS5qcGdcIixcblx0XCIuL3BpenphMi5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMi5qcGdcIixcblx0XCIuL3BpenphMy5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphMy5qcGdcIixcblx0XCIuL3BpenphNC5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphNC5qcGdcIixcblx0XCIuL3BpenphNS5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphNS5qcGdcIixcblx0XCIuL3BpenphNi5qcGdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3BpenphNi5qcGdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ltYWdlcyBzeW5jIFxcXFwuanBnJFwiOyIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IGJ1aWxkSGVhZGVyIGZyb20gJy4vbW9kdWxlcy9oZWFkZXIuanMnO1xuaW1wb3J0IGJ1aWxkSG9tZSBmcm9tICcuL21vZHVsZXMvaG9tZS5qcyc7XG5pbXBvcnQgYnVpbGRBYm91dCBmcm9tICcuL21vZHVsZXMvYWJvdXQuanMnO1xuaW1wb3J0IGJ1aWxkTWVudSBmcm9tICcuL21vZHVsZXMvbWVudS5qcyc7XG5pbXBvcnQgYnVpbGRDb250YWN0IGZyb20gJy4vbW9kdWxlcy9jb250YWN0LmpzJztcbmltcG9ydCBidWlsZEZvb3RlciBmcm9tICcuL21vZHVsZXMvZm9vdGVyLmpzJztcblxuY29uc3QgaG9tZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBidWlsZCA9IHtcbiAgICAgICAgaGVhZGVyOiBidWlsZEhlYWRlcixcbiAgICAgICAgaG9tZTogYnVpbGRIb21lLFxuICAgICAgICBhYm91dDogYnVpbGRBYm91dCxcbiAgICAgICAgbWVudTogYnVpbGRNZW51LFxuICAgICAgICBjb250YWN0OiBidWlsZENvbnRhY3QsXG4gICAgICAgIGZvb3RlcjogYnVpbGRGb290ZXIsXG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgICAgYWN0aXZlVGFiOiBudWxsLFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJ1aWxkLmhlYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5jYWNoZURPTSgpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgYnVpbGQuZm9vdGVyKCk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKTtcbiAgICAgICAgICAgIHRoaXMubmF2QmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hdmJhcicpO1xuICAgICAgICAgICAgdGhpcy5uYXZJdGVtcyA9IEFycmF5LmZyb20odGhpcy5uYXZCYXIucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lciB1bCBsaSBhJykpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZC5ob21lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lci5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYihjb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5hdkl0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zd2l0Y2hUYWIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3dpdGNoVGFiOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidWlsZCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoa2V5KSAmJiAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldEFjdGl2ZVRhYjogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5uYXZJdGVtcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTmFtZSA9PT0gY29udGVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgY29udGVudC5pbml0KCk7XG59KSgpOyIsImltcG9ydCAnLi4vc3R5bGVzL2Fib3V0LmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQWJvdXQoKSB7XG4gICAgY29uc3QgYWJvdXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhYm91dENvbnRhaW5lci5pZCA9ICdhYm91dCc7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQWJvdXQnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgYWJvdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBcbiAgICBhYm91dENvbnRhaW5lci5hcHBlbmRDaGlsZChhYm91dE1haW4ucmVuZGVyKCkpO1xuICAgIGFib3V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGFib3V0SGlzdG9yeS5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGFib3V0Q29udGFpbmVyO1xufVxuXG5jb25zdCBhYm91dE1haW4gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9ICdWYXJpdXMgbW9yYmkgZW5pbSBudW5jIGZhdWNpYnVzIGEgcGVsbGVudGVzcXVlIHNpdCBhbWV0IHBvcnR0aXRvci4gTWFnbmEgZWdldCBlc3QgbG9yZW0gaXBzdW0gZG9sb3Igc2l0LiBBcmN1IGZlbGlzIGJpYmVuZHVtIHV0IHRyaXN0aXF1ZSBldC4gVGVtcHVzIGltcGVyZGlldCBudWxsYSBtYWxlc3VhZGEgcGVsbGVudGVzcXVlIGVsaXQgZWdldCBncmF2aWRhIGN1bS4gVml2ZXJyYSBvcmNpIHNhZ2l0dGlzIGV1IHZvbHV0cGF0IG9kaW8uIElkIG5pYmggdG9ydG9yIGlkIGFsaXF1ZXQuIEZhdWNpYnVzIG5pc2wgdGluY2lkdW50IGVnZXQgbnVsbGFtLiBFZ2VzdGFzIHF1aXMgaXBzdW0gc3VzcGVuZGlzc2UgdWx0cmljZXMuIFN1c3BlbmRpc3NlIHBvdGVudGkgbnVsbGFtIGFjIHRvcnRvciB2aXRhZSBwdXJ1cyBmYXVjaWJ1cy4gVGluY2lkdW50IGVnZXQgbnVsbGFtIG5vbiBuaXNpIGVzdCBzaXQuJztcbiAgICAgICAgY29uc3QgYWJvdXRNYWluV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhYm91dE1haW5XcmFwcGVyLmlkID0gJ2Fib3V0LW1haW4nO1xuXG4gICAgICAgIGNvbnN0IGFib3V0TWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhYm91dE1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgYWJvdXRNYWluUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBhYm91dE1haW5QYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICAgIGFib3V0TWFpblBhcmFncmFwaC5hcHBlbmRDaGlsZChhYm91dE1haW5QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgYWJvdXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGFib3V0TWFpblBhcmFncmFwaCk7XG4gICAgICAgIGFib3V0TWFpbldyYXBwZXIuYXBwZW5kQ2hpbGQoYWJvdXRNYWluQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gYWJvdXRNYWluV3JhcHBlcjtcbiAgICB9XG59XG5cbmNvbnN0IGFib3V0SGlzdG9yeSA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBoaXN0b3J5V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXN0b3J5V3JhcHBlci5pZCA9ICdoaXN0b3J5JztcblxuICAgICAgICBjb25zdCBoaXN0b3J5TWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXN0b3J5TWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoaXN0b3J5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlIZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2tleX0sICR7dGhpcy5oaXN0b3J5W2tleV1bMF19YCk7XG4gICAgICAgICAgICBoaXN0b3J5SGVhZGluZy5hcHBlbmRDaGlsZChoaXN0b3J5SGVhZGluZ1RleHQpO1xuXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5UGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeVBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmhpc3Rvcnlba2V5XVsxXSk7XG4gICAgICAgICAgICBoaXN0b3J5UGFyYWdyYXBoLmFwcGVuZENoaWxkKGhpc3RvcnlQYXJhZ3JhcGhUZXh0KTtcblxuICAgICAgICAgICAgaGlzdG9yeUNvbnRhaW5lci5hcHBlbmRDaGlsZChoaXN0b3J5SGVhZGluZyk7XG4gICAgICAgICAgICBoaXN0b3J5Q29udGFpbmVyLmFwcGVuZENoaWxkKGhpc3RvcnlQYXJhZ3JhcGgpO1xuICAgICAgICAgICAgaGlzdG9yeU1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoaGlzdG9yeUNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBoaXN0b3J5V3JhcHBlci5hcHBlbmRDaGlsZChoaXN0b3J5TWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGhpc3RvcnlXcmFwcGVyO1xuICAgIH0sXG4gICAgaGlzdG9yeToge1xuICAgICAgICAyMDEzOiBbJ1R3aWxpZ2h0IFN0cmFuZCcsICdDb21pbmcgZnJvbSBBc2NhbG9uLCB3ZSBzdHJpdmVkIHRvIGZlZWQgdGhvdXNhbmRzIG9mIGV4aWxlcyB3aXRoIGZhbWlsaWFyIGRpc2hlcy4gV2Ugc3RhcnRlZCBjb29raW5nIHBpenphcyBvbiBhIHNtYWxsIGZvb2QgY2FydCB3aXRoIGEgaG9tZW1hZGUgcGl6emEgb3ZlbiwgYW5kIHB1bGxlZCBvdXIgc2VydmljZSBhY3Jvc3MgVGhlIE11ZCBGbGF0cy4nXSxcbiAgICAgICAgMjAxNDogWydXZXRsYW5kcycsICdPdXIgZmlyc3QgZm9vZCB0cnVjayBoaXQgdGhlIHpvbmUgb2ZmZXJpbmcgbW9yZSBmb29kIGNob2ljZXMgd2lkZWx5IGtub3duIHRvIGxvY2Fscy4nXSxcbiAgICAgICAgMjAxNTogWydTYXJuIEVuY2FtcG1lbnQnLCAnT3VyIG9wZW4tY29uY2VwdCByZXN0YXVyYW50IG9wZW5lZCB1cCB0byB0aGUgdW5kZWFkLCBCbGFja2d1YXJkIHNvbGlkZXJzIGFuZCBwYXNzaW5nIGV4aWxlcy4nXSxcbiAgICB9LFxufSIsImltcG9ydCAnLi4vc3R5bGVzL2NvbnRhY3QuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRDb250YWN0KCkge1xuICAgIGNvbnN0IGNvbnRhY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWN0Q29udGFpbmVyLmlkID0gJ2NvbnRhY3QnO1xuICAgIFxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDb250YWN0Jyk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIGNvbnRhY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnRhY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybS5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGNvbnRhY3RDb250YWluZXI7XG59XG5cbmNvbnN0IGZvcm0gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGZvcm1FbGVtZW50LmlkID0gJ2Zvcm0nXG5cbiAgICAgICAgY29uc3QgZm9ybVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9ybVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgZm9ybU5vdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGNvbnN0IGZvcm1Ob3RlTGFiZWxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyBJbmRpY2F0ZXMgcmVxdWlyZWQgZmllbGQnKTtcbiAgICAgICAgY29uc3QgZm9ybU5vdGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBmb3JtTm90ZVNwYW5UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyonKTtcbiAgICAgICAgZm9ybU5vdGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2FzdGVyaWsnKTtcblxuICAgICAgICBmb3JtTm90ZVNwYW4uYXBwZW5kQ2hpbGQoZm9ybU5vdGVTcGFuVGV4dCk7XG4gICAgICAgIGZvcm1Ob3RlTGFiZWwuYXBwZW5kQ2hpbGQoZm9ybU5vdGVTcGFuKTtcbiAgICAgICAgZm9ybU5vdGVMYWJlbC5hcHBlbmRDaGlsZChmb3JtTm90ZUxhYmVsVGV4dCk7XG4gICAgICAgIGZvcm1XcmFwcGVyLmFwcGVuZENoaWxkKGZvcm1Ob3RlTGFiZWwpO1xuICAgICAgICBmb3IgKGxldCBpbnB1dHMgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybS1pdGVtJyk7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dHMgIT09ICdzdWJtaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2lucHV0c30gYCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2FzdGVyaWsnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcqJyk7XG4gICAgICAgICAgICAgICAgbGFiZWwuaHRtbEZvciA9IGlucHV0cztcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChsYWJlbFRleHQpO1xuICAgICAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoc3BhblRleHQpO1xuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnB1dHMgIT09ICdtZXNzYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmlkID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0LCB0aGlzLmF0dHJpYnV0ZXNbaW5wdXRzXSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHRBcmVhLmlkID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBhdHRyIGluIHRoaXMuYXR0cmlidXRlc1tpbnB1dHNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QXJlYS5zZXRBdHRyaWJ1dGUoYXR0ciwgdGhpcy5hdHRyaWJ1dGVzW2lucHV0c11bYXR0cl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5pZCA9IGlucHV0cztcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdXR0b25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1N1Ym1pdCcpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3VibWl0QnV0dG9uLCB0aGlzLmF0dHJpYnV0ZXNbaW5wdXRzXSk7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvblRleHQpO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1XcmFwcGVyLmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1XcmFwcGVyKTtcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xuICAgIH0sXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdmdWxsIG5hbWUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICBpZDogJ2VtYWlsJyxcbiAgICAgICAgICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgICAgICAgICB0eXBlOiAnZW1haWwnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdlbWFpbEBhZGRyZXNzLmNvbScsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgcGhvbmU6IHtcbiAgICAgICAgICAgIGlkOiAncGhvbmUnLFxuICAgICAgICAgICAgbmFtZTogJ3Bob25lJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZWwnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdYWFgtWFhYLVhYWFgnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIGlkOiAnbWVzc2FnZScsXG4gICAgICAgICAgICBuYW1lOiAnbWVzc2FnZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3lvdXIgbWVzc2FnZSBoZXJlICg1MDAgY2hhcmFjdGVycyBtYXgpJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICB9LFxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZvb3RlcigpIHtcbiAgICBjb25zdCBmb290ZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG5cbiAgICBjb25zdCBmb290ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb290ZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBmb290ZXJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgIGNvbnN0IGZvb3RlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnUGxhY2Vob2xkZXInKTtcbiAgICBcbiAgICBmb290ZXJIZWFkZXIuYXBwZW5kQ2hpbGQoZm9vdGVyVGV4dCk7XG4gICAgZm9vdGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3RlckhlYWRlcik7XG4gICAgZm9vdGVyV3JhcHBlci5hcHBlbmRDaGlsZChmb290ZXJDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXJXcmFwcGVyKTtcbn0iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4vaW1hZ2VzLmpzJztcblxuY29uc3QgYXNzZXRzID0ge1xuICAgIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi9hc3NldHMvaWNvbnMvJywgZmFsc2UsIC9cXC5zdmckLykpLFxuICAgIGdpdGh1YjogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vYXNzZXRzL2dpdGh1Yi1tYXJrJywgZmFsc2UsIC9cXC5zdmckLykpLFxuICAgIGltYWdlczogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vYXNzZXRzL2ltYWdlcy8nLCBmYWxzZSwgL1xcLmpwZyQvKSksXG59XG5cbmNvbnN0IG5hdkxpbmtzID0gWydob21lJywgJ2Fib3V0JywgJ21lbnUnLCAnY29udGFjdCcsICdnaXRodWItbWFyay5zdmcnXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIZWFkZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IGhlcm9XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBoZXJvVGV4dFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZXJvVGV4dFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGVyby10ZXh0Jyk7XG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGluZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgRXhpbGUncyBQaXp6YWApO1xuICAgIGhlcm9XcmFwcGVyLmlkID0gJ2hlcm8nO1xuXG4gICAgY29uc3QgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlcm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICBoZXJvVGV4dFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgaGVyb1dyYXBwZXIuYXBwZW5kQ2hpbGQoaGVyb0NvbnRhaW5lcik7XG4gICAgaGVhZGluZy5hcHBlbmRDaGlsZChoZWFkaW5nVGV4dCk7XG4gICAgaGVyb0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZXJvVGV4dFdyYXBwZXIpO1xuICAgIGhlcm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW1hZ2VDYXJvdXNlbC5yZW5kZXIoKSk7XG4gICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZXJvV3JhcHBlcik7XG5cbiAgICBoZWFkZXJFbGVtZW50Lmluc2VydEJlZm9yZShuYXYucmVuZGVyKCksIGhlcm9XcmFwcGVyKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShoZWFkZXJFbGVtZW50LCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xufVxuXG5jb25zdCBuYXYgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgICAgICBjb25zdCBuYXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBuYXZFbGVtZW50LmlkID0gJ25hdmJhcic7XG4gICAgICAgIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG5hdkxpc3QuY2xhc3NMaXN0LmFkZCgnbGlua3MnKTtcblxuICAgICAgICBuYXZMaW5rcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbmF2SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBsZXQgaHJlZjtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWU7XG4gICAgXG4gICAgICAgICAgICBpZiAoaXRlbS5pbmNsdWRlcygnc3ZnJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgICAgICAgICAgICAgIGdpdGh1Ykljb24uc3JjID0gYXNzZXRzLmdpdGh1Yi5pbWFnZXNbaXRlbV07XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGdpdGh1Ykljb24pO1xuICAgICAgICAgICAgICAgIGhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL21pa2V5Q29zL3RoZU9kaW5Qcm9qZWN0L3RyZWUvbWFpbi9qYXZhU2NyaXB0L3Byb2plY3RzL3Jlc3RhdXJhbnQtcGFnZSc7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2dpdGh1Yic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKG5hdkl0ZW1UZXh0KTtcbiAgICAgICAgICAgICAgICBocmVmID0gYCMke2l0ZW19YDtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5jaG9yLmhyZWYgPSBocmVmO1xuICAgICAgICAgICAgYW5jaG9yLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgbmF2SXRlbS5hcHBlbmRDaGlsZChhbmNob3IpO1xuICAgICAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZJdGVtKTtcbiAgICAgICAgfSlcblxuXG4gICAgICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9nby5pZCA9ICdsb2dvJztcbiAgICAgICAgY29uc3QgbG9nb0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGNvbnN0IGxvZ29MaW5rVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBFeGlsZSdzIFBpenphYCk7XG4gICAgICAgIGxvZ29MaW5rLmFwcGVuZENoaWxkKGxvZ29MaW5rVGV4dCk7XG4gICAgICAgIGxvZ28uYXBwZW5kQ2hpbGQobG9nb0xpbmspO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG5cbiAgICAgICAgY29uc3QgbmF2TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuYXZNZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgZmFsc2UpO1xuICAgICAgICBjb25zdCBuYXZNZW51SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIG5hdk1lbnVJbWcuc3JjID0gYXNzZXRzLmljb25zLmltYWdlc1snbWVudS5zdmcnXTtcbiAgICAgICAgbmF2TWVudS5hcHBlbmRDaGlsZChuYXZNZW51SW1nKTtcbiAgICAgICAgbmF2TWVudS5jbGFzc0xpc3QuYWRkKCdidG4tbWVudScpO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobmF2TWVudSk7XG5cbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5hdkxpc3QpO1xuICAgICAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY2FjaGVET00obmF2TWVudSwgbmF2TGlzdCk7XG4gICAgICAgIHRoaXMuZ2V0V2luZG93V2lkdGgoKTtcbiAgICAgICAgdGhpcy53YXRjaFNjcmVlbigpO1xuICAgICAgICByZXR1cm4gbmF2RWxlbWVudDtcbiAgICB9LFxuICAgIHdhdGNoU2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nZXRXaW5kb3dXaWR0aCA9IHRoaXMuZ2V0V2luZG93V2lkdGguYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZ2V0V2luZG93V2lkdGgpO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGJ0biwgdWwpIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidG47XG4gICAgICAgIHRoaXMubWVudSA9IHVsO1xuICAgICAgICB0aGlzLnRvZ2dsZU1lbnUgPSB0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICByZW1vdmVFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICB0b2dnbGVNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGlzUHJlc3NlZCA9IEpTT04ucGFyc2UodGhpcy5idXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnKSkgPT0gdHJ1ZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5idXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAhaXNQcmVzc2VkKTtcbiAgICAgICAgaXNQcmVzc2VkID8gdGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpIDogdGhpcy5tZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0sXG4gICAgZ2V0V2luZG93V2lkdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cbi8vaW1hZ2VzIHNsaWRlc2hvd1xuY29uc3QgaW1hZ2VDYXJvdXNlbCA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBjYXJvdXNlbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2Fyb3VzZWxXcmFwcGVyLmlkID0gJ2Nhcm91c2VsJztcbiAgICAgICAgY29uc3QgY2Fyb3VzZWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2Fyb3VzZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgY2Fyb3VzZWxJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhcm91c2VsSXRlbS5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC1pdGVtJyk7XG5cbiAgICAgICAgY29uc3QgY2Fyb3VzZWxJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgY2Fyb3VzZWxJbWcuc3JjID0gYXNzZXRzLmltYWdlcy5pbWFnZXNbJ3BpenphMC5qcGcnXTtcblxuICAgICAgICBjb25zdCBidXR0b25CYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkJhY2suY2xhc3NMaXN0LmFkZCgnYnRuLWNhcm91c2VsJywgJ2JhY2snKTtcbiAgICAgICAgY29uc3QgaW1hZ2VCYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltYWdlQmFjay5zcmMgPSBhc3NldHMuaWNvbnMuaW1hZ2VzWydjaGV2cm9uX2xlZnQuc3ZnJ107XG4gICAgICAgIGJ1dHRvbkJhY2suYXBwZW5kQ2hpbGQoaW1hZ2VCYWNrKTtcblxuICAgICAgICBjb25zdCBidXR0b25Gb3J3YXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkZvcndhcmQuY2xhc3NMaXN0LmFkZCgnYnRuLWNhcm91c2VsJywgJ2ZvcndhcmQnKTtcbiAgICAgICAgY29uc3QgaW1hZ2VGb3J3YXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltYWdlRm9yd2FyZC5zcmMgPSBhc3NldHMuaWNvbnMuaW1hZ2VzWydjaGV2cm9uX3JpZ2h0LnN2ZyddO1xuICAgICAgICBidXR0b25Gb3J3YXJkLmFwcGVuZENoaWxkKGltYWdlRm9yd2FyZCk7XG4gICAgICAgIHRoaXMuY2FjaGVET00oY2Fyb3VzZWxJbWcsIGJ1dHRvbkJhY2ssIGJ1dHRvbkZvcndhcmQpO1xuXG4gICAgICAgIGNhcm91c2VsQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkJhY2spO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Gb3J3YXJkKTtcblxuICAgICAgICBjYXJvdXNlbEl0ZW0uYXBwZW5kQ2hpbGQoY2Fyb3VzZWxJbWcpO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJvdXNlbEl0ZW0pO1xuICAgICAgICBjYXJvdXNlbFdyYXBwZXIuYXBwZW5kQ2hpbGQoY2Fyb3VzZWxDb250YWluZXIpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgcmV0dXJuIGNhcm91c2VsV3JhcHBlcjtcbiAgICB9LFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihpbWFnZSwgLi4uYnV0dG9ucykge1xuICAgICAgICB0aGlzLmNhcm91c2VsSW1nID0gaW1hZ2U7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSA9IHRoaXMuY2hhbmdlSW1hZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgWy4uLnRoaXMuYnV0dG9uc10uZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jaGFuZ2VJbWFnZSkpO1xuICAgIH0sXG4gICAgY2hhbmdlSW1hZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJylbMV07XG4gICAgICAgIGxldCBpbWFnZUluZGV4O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXNzZXRzLmltYWdlcy5pbWFnZXMpIHtcbiAgICAgICAgICAgIGlmIChhc3NldHMuaW1hZ2VzLmltYWdlc1trZXldID09PSB0aGlzLmNhcm91c2VsSW1nLnNyYykge1xuICAgICAgICAgICAgICAgIGltYWdlSW5kZXggPSBPYmplY3Qua2V5cyhhc3NldHMuaW1hZ2VzLmltYWdlcykuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0luZGV4OyAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgICAgICAgICAgaWYgKGltYWdlSW5kZXggPCBPYmplY3Qua2V5cyhhc3NldHMuaW1hZ2VzLmltYWdlcykubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaW1hZ2VJbmRleCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbWFnZUluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaW1hZ2VJbmRleCAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gT2JqZWN0LmtleXMoYXNzZXRzLmltYWdlcy5pbWFnZXMpLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhcm91c2VsSW1nLnNyYyA9IGFzc2V0cy5pbWFnZXMuaW1hZ2VzW09iamVjdC5rZXlzKGFzc2V0cy5pbWFnZXMuaW1hZ2VzKVtuZXdJbmRleF1dO1xuICAgIH0sXG59IiwiaW1wb3J0ICcuLi9zdHlsZXMvaG9tZS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhvbWUoKSB7XG4gICAgY29uc3QgaG9tZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhvbWVDb250YWluZXIuaWQgPSAnaG9tZSc7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU3RpbGwgc2FuZT8nKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgXG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50LnJlbmRlcigpKTtcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wZW5Ib3Vycy5yZW5kZXIoKSk7XG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbi5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGhvbWVDb250YWluZXI7XG59XG5cbi8vbWlzc2lvbi93ZWxjb21lIHN0YXRlbWVudFxuY29uc3Qgc3RhdGVtZW50ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlbWVudFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhdGVtZW50V3JhcHBlci5pZCA9ICdzdGF0ZW1lbnQnO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3Qgc3RhdGVtZW50SGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdQbGFjZWhvbGRlcicpO1xuICAgICAgICBzdGF0ZW1lbnRIZWFkZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50SGVhZGVyVGV4dCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50UGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBzdGF0ZW1lbnRQYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBJZCBuaWJoIHRvcnRvciBpZCBhbGlxdWV0IGxlY3R1cyBwcm9pbi4gRW5pbSBkaWFtIHZ1bHB1dGF0ZSB1dCBwaGFyZXRyYSBzaXQgYW1ldC4gVmVsIHR1cnBpcyBudW5jIGVnZXQgbG9yZW0uJyk7XG4gICAgICAgIHN0YXRlbWVudFBhcmFncmFwaC5hcHBlbmRDaGlsZChzdGF0ZW1lbnRQYXJhZ3JhcGhUZXh0KTtcblxuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50SGVhZGVyKTtcbiAgICAgICAgc3RhdGVtZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXRlbWVudFBhcmFncmFwaCk7XG4gICAgICAgIHN0YXRlbWVudFdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50Q29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc3RhdGVtZW50V3JhcHBlcjtcbiAgICB9LFxufVxuXG4vL2hvdXJzIG9mIG9wZXJhdGlvblxuY29uc3Qgb3BlbkhvdXJzID0ge1xuICAgIGhvdXJzOiB7XG4gICAgICAgIE1vbmRheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFR1ZXNkYXk6ICc5QU0gLSA5UE0nLFxuICAgICAgICBXZWRuZXNkYXk6ICc5QU0gLSA5UE0nLFxuICAgICAgICBUaHVyc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIEZyaWRheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFNhdHVyZGF5OiAnMTBBTSAtIDEwUE0nLFxuICAgICAgICBTdW5kYXk6ICdDbG9zZWQnXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBob3Vyc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91cnNXcmFwcGVyLmlkID0gJ2hvdXJzJztcblxuICAgICAgICBjb25zdCBob3Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBob3Vyc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGNvbnN0IGhvdXJzSGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdIb3VycycpO1xuICAgICAgICBob3Vyc0hlYWRlci5hcHBlbmRDaGlsZChob3Vyc0hlYWRlclRleHQpO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmhvdXJzKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGxldCBkYXlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoa2V5KTtcbiAgICAgICAgICAgIGRheS5hcHBlbmRDaGlsZChkYXlUZXh0KTtcbiAgICAgICAgICAgIGhvdXJzTGlzdC5hcHBlbmRDaGlsZChkYXkpO1xuXG4gICAgICAgICAgICBsZXQgaG91cnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgbGV0IGhvdXJzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuaG91cnNba2V5XSk7XG4gICAgICAgICAgICBob3Vycy5hcHBlbmRDaGlsZChob3Vyc1RleHQpO1xuICAgICAgICAgICAgaG91cnNMaXN0LmFwcGVuZENoaWxkKGhvdXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXJzV3JhcHBlci5hcHBlbmRDaGlsZChob3Vyc0NvbnRhaW5lcik7XG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJzSGVhZGVyKTtcbiAgICAgICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91cnNMaXN0KTtcbiAgICAgICAgcmV0dXJuIGhvdXJzV3JhcHBlcjtcbiAgICB9XG59XG5cbi8vbG9jYXRpb25cbmNvbnN0IGxvY2F0aW9uID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsb2NhdGlvbldyYXBwZXIuaWQgPSAnbG9jYXRpb24nO1xuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvY2F0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25IZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0FkZHJlc3MnKTtcbiAgICAgICAgbG9jYXRpb25IZWFkZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25IZWFkZXJUZXh0KTtcblxuICAgICAgICBjb25zdCBsb2NhdGlvblBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25QYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJzEyMzQgTlcgUGxhY2hvbGRlciBSZC4gU3RhdGUsIFFRIDU2Nzg5Jyk7XG4gICAgICAgIGxvY2F0aW9uUGFyYWdyYXBoLmFwcGVuZENoaWxkKGxvY2F0aW9uUGFyYWdyYXBoVGV4dCk7XG4gICAgICAgIGxvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvY2F0aW9uSGVhZGVyKTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25QYXJhZ3JhcGgpO1xuICAgICAgICBsb2NhdGlvbldyYXBwZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25Db250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBsb2NhdGlvbldyYXBwZXI7XG4gICAgfVxufSIsIi8vIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvZ3VpZGVzL2RlcGVuZGVuY3ktbWFuYWdlbWVudC9cbi8vIGltcG9ydHMgYWxsIGltYWdlc1xuLy8gcmV0dXJucyBhbiBvYmplY3QgYW5kIGFycmF5IG9mIGltYWdlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcbiAgICBsZXQgaW1hZ2VzID0ge307XG4gICAgbGV0IGltYWdlc0FyciA9IFtdXG4gICAgci5rZXlzKCkubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpbWFnZXNbaXRlbS5yZXBsYWNlKCcuLycsICcnKV0gPSByKGl0ZW0pO1xuICAgICAgICBpbWFnZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyBpbWFnZXMsIGltYWdlc0FyciB9O1xufSIsImltcG9ydCAnLi4vc3R5bGVzL21lbnUuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNZW51KCkge1xuICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51Q29udGFpbmVyLmlkID0gJ21lbnUnO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ01lbnUnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgbWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgbWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZW51LnJlbmRlcigpKTtcbiAgICByZXR1cm4gbWVudUNvbnRhaW5lcjtcbn1cblxuY29uc3QgZm9vZCA9IChkaXNoLCBkZXRhaWxzLCBwcmljZSkgPT4ge1xuICAgIGNvbnN0IGZvb2ROYW1lID0gZGlzaDtcbiAgICBjb25zdCBmb29kRGV0YWlscyA9IGRldGFpbHM7XG4gICAgY29uc3QgZm9vZFByaWNlID0gcHJpY2U7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGRpc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZE5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBkZXRhaWxzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvb2REZXRhaWxzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcHJpY2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZFByaWNlO1xuICAgICAgICB9LFxuICAgIH1cbn1cblxuY29uc3QgbWVudSA9IHtcbiAgICB0ZXN0OiAndGVzdCcsXG4gICAgZm9vZDoge1xuICAgICAgICBwaXp6YXM6IFtcbiAgICAgICAgICAgIGZvb2QoJ3Job2EnLCAndG9tYXRvIHNhdWNlLCBtb3p6YXJlbGxhLCBvcmVnYW5vLCByb2FzdGVkIHJob2EnLCAnMTUuMDAnKSxcbiAgICAgICAgICAgIGZvb2QoJ3BlcHBlcm9uaScsICd0b21hdG8gc2F1Y2UsIG1venphcmVsbGEsIG9yZWdhbm8sIHBlcHBlcm9uaScsICcxMC4wMCcpLFxuICAgICAgICAgICAgZm9vZCgnanVpY3kgb25lJywgJ3JhbmNoIHN1YWNlLCBtb3p6YXJlbGxhLCBwYXJzbGV5LCBCQlEgYmVhc3QnLCAnMTIuMDAnKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2FsYWRzOiBbXG4gICAgICAgICAgICBmb29kKCd3ZXRhJywgJ3JvbWFpbmUgbGV0dHVjZSwgY3VjdW1iZXIsIHN1bmZsb3dlciBzZWVkcywgdG9tYXRvZXMsIHdldGEnLCAnNS4wMCcpLFxuICAgICAgICAgICAgZm9vZCgncGVyYW5kdXMgY3J1bmNoJywgJ2dyZWVuIGNhYmJhZ2UsIGJ1dHRlcmhlYWQgbGV0dHVjZSwgYWxtb25kcywgY3JvdXRvbnMnLCAnOS4wMCcpLFxuICAgICAgICBdLFxuICAgICAgICBkZXNzZXJ0czogW1xuICAgICAgICAgICAgZm9vZChgYWx2YSdzIHNhY3JpZmljZWAsICd2YW5pbGxhIGljZSBjcmVhbSwgQXR6b2F0bCBzeXJ1cCwgd2FsbnV0cycsICc3LjAwJyksXG4gICAgICAgICAgICBmb29kKCd0aGUgZGVsdmUgYmFyJywgJ2F6dXJpdGUsIG9yZW9zLCBkYXJrIGNob2NvbGF0ZSBjaGlwcywgYWxtb25kcycsICc2LjAwJyksXG4gICAgICAgIF0sXG4gICAgICAgIGFwcGV0aXplcnM6IFtcbiAgICAgICAgICAgIGZvb2QoJ2JyZWFkc3RpY2snLCBudWxsLCcyLjAwJyksXG4gICAgICAgICAgICBmb29kKCd3YWZmbGUgZnJpZXMnLCBudWxsLCAnNC45OScpLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9vZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9vZFdyYXBwZXIuaWQgPSAnbWVudS1tYWluJztcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb29kQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5mb29kKSB7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbWVudVNlY3Rpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCgnaDInKSk7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbkhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgIG1lbnVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICBtZW51U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChtZW51U2VjdGlvbkhlYWRlclRleHQpO1xuICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudVNlY3Rpb25IZWFkZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmZvb2RbaXRlbV0ubWFwKGZvb2QgPT4geyBcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmZvIGluIGZvb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvb2RbaW5mb10gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVJdGVtUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobWVudUl0ZW1QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVJdGVtUGFyYWdyYXBoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8gPT09ICdwcmljZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNlbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGhUZXh0Lm5vZGVWYWx1ZSA9IGZvb2RbaW5mb10uc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNlbnRzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10uc3BsaXQoJy4nKVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1DZW50cy5hcHBlbmRDaGlsZChtZW51SXRlbUNlbnRzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobWVudUl0ZW1DZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudUl0ZW1Db250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb29kQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVTZWN0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGZvb2RXcmFwcGVyLmFwcGVuZENoaWxkKGZvb2RDb250YWluZXIpO1xuICAgICAgICByZXR1cm4gZm9vZFdyYXBwZXI7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==