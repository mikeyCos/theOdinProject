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
    github: (0,_images_js__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/github-mark sync \\.svg$")),
    images: (0,_images_js__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/images sync \\.jpg$")),
}

const navLinks = ['home', 'about', 'menu', 'contact', 'github-mark.svg'];
// assets.github.images['github-mark.svg']

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
            let href;
            let className;
    
            if (item.includes('svg')) {
                const githubIcon = document.createElement('img');
                anchor.setAttribute('target', '_blank');
                console.log(item)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QyxpT0FBNkY7QUFDekksNENBQTRDLCtPQUFvRztBQUNoSiw0Q0FBNEMsaUpBQXFEO0FBQ2pHLDRDQUE0QyxtSkFBc0Q7QUFDbEcsNENBQTRDLHFKQUF1RDtBQUNuRyw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1DQUFtQztBQUNsRCxjQUFjLG1DQUFtQztBQUNqRDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsY0FBYyxtQ0FBbUM7QUFDakQsY0FBYyxtQ0FBbUM7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsWUFBWSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksT0FBTyxPQUFPLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxPQUFPLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssZUFBZSxPQUFPLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxjQUFjLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLHFDQUFxQyxpQ0FBaUMsNE1BQTRNLEdBQUcsZ0JBQWdCLDBCQUEwQixnS0FBZ0ssR0FBRyxXQUFXLG9JQUFvSSw0Q0FBNEMsc0NBQXNDLHdDQUF3Qyx1Q0FBdUMsdURBQXVELGdFQUFnRSxrQ0FBa0MsR0FBRyw0QkFBNEIsNkJBQTZCLGdCQUFnQixpQkFBaUIsR0FBRyxVQUFVLHdCQUF3Qix3REFBd0Qsb0JBQW9CLHNEQUFzRCxHQUFHLGFBQWEsc0JBQXNCLGFBQWEsZUFBZSxrQkFBa0IsaUJBQWlCLDJDQUEyQyxHQUFHLDBCQUEwQixvQkFBb0IsNkNBQTZDLHlCQUF5QixvREFBb0QsMENBQTBDLEdBQUcsa0NBQWtDLG9CQUFvQixHQUFHLHNDQUFzQyw4Q0FBOEMsZ0NBQWdDLDBDQUEwQyxHQUFHLFlBQVksb0JBQW9CLGtDQUFrQyx1QkFBdUIsc0JBQXNCLGtCQUFrQixtQkFBbUIsYUFBYSxrQkFBa0IsMERBQTBELHdCQUF3QiwwQkFBMEIsR0FBRyxtQkFBbUIsb0JBQW9CLHVDQUF1QyxHQUFHLHFCQUFxQixxQkFBcUIsNEJBQTRCLDZDQUE2QyxnREFBZ0QsdUJBQXVCLDJDQUEyQyxnQ0FBZ0MsNEJBQTRCLEdBQUcsd0NBQXdDLHNEQUFzRCw2Q0FBNkMsaUNBQWlDLHdDQUF3QyxHQUFHLDRCQUE0Qix5Q0FBeUMsR0FBRyxrQ0FBa0Msc0JBQXNCLGlCQUFpQixzQkFBc0IsR0FBRyxlQUFlLHdCQUF3QixtQkFBbUIsdUJBQXVCLHlCQUF5QixpQkFBaUIsc0JBQXNCLEdBQUcscUJBQXFCLHNCQUFzQixHQUFHLHdCQUF3Qix5QkFBeUIsb0JBQW9CLHdCQUF3Qix5Q0FBeUMsR0FBRyxxQ0FBcUMseUJBQXlCLDJCQUEyQix5QkFBeUIsR0FBRyxrREFBa0QseUJBQXlCLGNBQWMsaUJBQWlCLGtCQUFrQixzQkFBc0IseUJBQXlCLGlDQUFpQyw4Q0FBOEMsNENBQTRDLHlDQUF5Qyw0QkFBNEIseUJBQXlCLEdBQUcsMENBQTBDLDRDQUE0QywrQ0FBK0MsNEJBQTRCLHlCQUF5Qix5QkFBeUIsZ0lBQWdJLHdCQUF3QixHQUFHLHdEQUF3RCxrR0FBa0csMEZBQTBGLEdBQUcsOENBQThDLGlsQkFBaWxCLHdCQUF3QixHQUFHLGlEQUFpRCxvQkFBb0IsdUJBQXVCLEdBQUcsMERBQTBELHlCQUF5Qix5QkFBeUIsbUJBQW1CLHVCQUF1QixvQkFBb0IsR0FBRyxnRUFBZ0UsMkNBQTJDLEdBQUcsdUVBQXVFLGVBQWUsR0FBRyxnRUFBZ0Usb0NBQW9DLGlJQUFpSSxHQUFHLHdFQUF3RSxzQkFBc0IsdUJBQXVCLHdCQUF3QixHQUFHLG9CQUFvQiw4Q0FBOEMsMkNBQTJDLGdDQUFnQyx3Q0FBd0MsR0FBRyxjQUFjLHdCQUF3QixHQUFHLGtCQUFrQiw4QkFBOEIsb0JBQW9CLG9CQUFvQixHQUFHLHVCQUF1Qix5QkFBeUIsb0JBQW9CLDJCQUEyQix1QkFBdUIsd0NBQXdDLDBDQUEwQyxHQUFHLDJDQUEyQyxvQkFBb0IsZ0JBQWdCLG9CQUFvQixnREFBZ0Qsc0NBQXNDLDRCQUE0QiwwQkFBMEIsMkNBQTJDLDBDQUEwQyxHQUFHLCtDQUErQyxvQkFBb0IsMERBQTBELDhCQUE4QixHQUFHLFlBQVksb0JBQW9CLG9EQUFvRCx3Q0FBd0MsR0FBRyx5QkFBeUIsb0JBQW9CLDhCQUE4QixHQUFHLDhCQUE4QiwwQkFBMEIsMENBQTBDLEdBQUcsMENBQTBDLGVBQWUsOENBQThDLE9BQU8sZ0JBQWdCLHdCQUF3QiwrQkFBK0IsZ0NBQWdDLHdEQUF3RCwyQkFBMkIseUJBQXlCLDhCQUE4Qiw4QkFBOEIsb0JBQW9CLE9BQU8seUJBQXlCLHFCQUFxQiw2QkFBNkIsd0JBQXdCLGdDQUFnQyxPQUFPLGdDQUFnQywrQkFBK0Isb0NBQW9DLE9BQU8sNENBQTRDLHdDQUF3QyxpQ0FBaUMsNENBQTRDLE9BQU8sK0JBQStCLGlDQUFpQyw0Q0FBNEMsT0FBTyw0Q0FBNEMsNkJBQTZCLHVCQUF1QixzQkFBc0Isc0JBQXNCLHlCQUF5QiwwREFBMEQsK0JBQStCLDRDQUE0QyxPQUFPLHFDQUFxQywyQ0FBMkMsT0FBTyxtQkFBbUIsd0JBQXdCLE9BQU8sR0FBRyw0QkFBNEIsVUFBVSx1Q0FBdUMsT0FBTyxjQUFjLG9DQUFvQyxPQUFPLEdBQUcsMkJBQTJCLFVBQVUsc0NBQXNDLE9BQU8sY0FBYyxvQ0FBb0MsT0FBTyxHQUFHLHlCQUF5QixVQUFVLHNDQUFzQyxPQUFPLGtCQUFrQixvQ0FBb0MsT0FBTyxHQUFHLG1CQUFtQjtBQUM5blg7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuWXZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxPQUFPLHdGQUF3RixZQUFZLE9BQU8sS0FBSyxLQUFLLFVBQVUsWUFBWSxPQUFPLHFHQUFxRywrQ0FBK0MsS0FBSywwQ0FBMEMsc0NBQXNDLHdCQUF3QixnREFBZ0QsT0FBTyxLQUFLLG1CQUFtQjtBQUMxZTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCdkM7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8seUZBQXlGLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxZQUFZLE1BQU0sWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssWUFBWSxNQUFNLDJDQUEyQyxpQkFBaUIsR0FBRyxzQ0FBc0MsK0NBQStDLG1DQUFtQyxHQUFHLHFDQUFxQyxvQkFBb0IsR0FBRyw2Q0FBNkMsK0NBQStDLHlCQUF5QixnQ0FBZ0MsR0FBRyw2RkFBNkYsNENBQTRDLCtCQUErQixvQkFBb0IsZ0NBQWdDLHNCQUFzQixHQUFHLHVFQUF1RSxnQ0FBZ0Msc0JBQXNCLEdBQUcsZ0VBQWdFLHNEQUFzRCx1QkFBdUIsR0FBRyxnREFBZ0QsbUJBQW1CLHVCQUF1QiwyQkFBMkIsMEJBQTBCLEdBQUcseURBQXlELDRCQUE0QixtQkFBbUIsMEJBQTBCLG9EQUFvRCx3Q0FBd0MsZ0RBQWdELHVCQUF1QiwyQ0FBMkMsZ0NBQWdDLEdBQUcsZ0VBQWdFLDBDQUEwQywwQ0FBMEMsMEJBQTBCLGdEQUFnRCxPQUFPLG9DQUFvQyxnQ0FBZ0MsT0FBTyx1REFBdUQsZ0NBQWdDLE9BQU8sd0RBQXdELHNDQUFzQyxzREFBc0QsZ0NBQWdDLE9BQU8sR0FBRyxtQkFBbUI7QUFDOXFGO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZ2QztBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sdUZBQXVGLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLEtBQUssWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE1BQU0sc0dBQXNHLHlCQUF5QixHQUFHLHNDQUFzQyx1QkFBdUIsb0JBQW9CLDRDQUE0QyxzQkFBc0IsR0FBRyw0REFBNEQsd0JBQXdCLEdBQUcsdURBQXVELHVCQUF1QixHQUFHLDBDQUEwQyxhQUFhLGdEQUFnRCxPQUFPLDZDQUE2Qyw4QkFBOEIsT0FBTyx3Q0FBd0MsMkJBQTJCLDBDQUEwQyxPQUFPLEdBQUcsbUJBQW1CO0FBQ2hrQztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDdkM7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNGQUFzRixVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksTUFBTSw4REFBOEQsb0JBQW9CLG9CQUFvQixHQUFHLGlEQUFpRCxzQkFBc0IsR0FBRyxpRUFBaUUsaUNBQWlDLHlCQUF5Qix1QkFBdUIseUJBQXlCLDBCQUEwQixHQUFHLHNFQUFzRSw4Q0FBOEMsaUNBQWlDLHVCQUF1QixHQUFHLHdFQUF3RSx5QkFBeUIsY0FBYyxnQkFBZ0IsbUJBQW1CLGlCQUFpQixzQ0FBc0MsR0FBRyxzRUFBc0Usc0JBQXNCLHlCQUF5Qix1QkFBdUIseUJBQXlCLEdBQUcsMENBQTBDLGlEQUFpRCxnREFBZ0QsT0FBTyxHQUFHLG1CQUFtQjtBQUN4L0M7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDbEQxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXNHO0FBQ3RHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJZ0Q7QUFDeEUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLHNGQUFPLFVBQVUsc0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBd0c7QUFDeEc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyx3RkFBTzs7OztBQUlrRDtBQUMxRSxPQUFPLGlFQUFlLHdGQUFPLElBQUksd0ZBQU8sVUFBVSx3RkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFxRztBQUNyRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHFGQUFPOzs7O0FBSStDO0FBQ3ZFLE9BQU8saUVBQWUscUZBQU8sSUFBSSxxRkFBTyxVQUFVLHFGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXFHO0FBQ3JHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMscUZBQU87Ozs7QUFJK0M7QUFDdkUsT0FBTyxpRUFBZSxxRkFBTyxJQUFJLHFGQUFPLFVBQVUscUZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JxQjtBQUN5QjtBQUNKO0FBQ0U7QUFDRjtBQUNNO0FBQ0Y7O0FBRTlDO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQVc7QUFDM0IsY0FBYyx3REFBUztBQUN2QixlQUFlLHlEQUFVO0FBQ3pCLGNBQWMsd0RBQVM7QUFDdkIsaUJBQWlCLDJEQUFZO0FBQzdCLGdCQUFnQiwwREFBVztBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FNEI7O0FBRWQ7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLElBQUksSUFBSSxxQkFBcUI7QUFDL0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7O0FDckUrQjs7QUFFaEI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxRQUFRO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvR2U7QUFDZjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZG9DOztBQUVwQztBQUNBLFdBQVcsc0RBQVMsQ0FBQyxzREFBb0Q7QUFDekUsWUFBWSxzREFBUyxDQUFDLDREQUF5RDtBQUMvRSxZQUFZLHNEQUFTLENBQUMsdURBQXFEO0FBQzNFOztBQUVBO0FBQ0E7O0FBRWU7QUFDZixzQ0FBc0M7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQzFNNEI7O0FBRWI7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzR0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGFBQWE7QUFDYjs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0Qjs7QUFFYjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvYWJvdXQuY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvY29udGFjdC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9ob21lLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL21lbnUuY3NzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9hYm91dC5jc3M/ZDExNyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzL2NvbnRhY3QuY3NzPzI5NjIiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlcy9ob21lLmNzcz80YjUxIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMvbWVudS5jc3M/NzAwYSIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9hc3NldHMvZ2l0aHViLW1hcmsvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvYXNzZXRzL2ltYWdlcy8gc3luYyBub25yZWN1cnNpdmUgXFwuanBnJCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvYWJvdXQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvaGVhZGVyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvaW1hZ2VzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL21lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL051bml0b19TYW5zL051bml0b1NhbnMtVmFyaWFibGVGb250X1lUTEMsb3Bzeix3ZHRoLHdnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvTnVuaXRvX1NhbnMvTnVuaXRvU2Fucy1JdGFsaWMtVmFyaWFibGVGb250X1lUTEMsb3Bzeix3ZHRoLHdnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLUxpZ2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvVGVrby9UZWtvLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdUZWtvJztcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19ffSk7XG59XG5cbjpyb290IHtcbiAgICAvKiBjb2xvciBwYWxldHRlICovXG4gICAgLyogaHR0cHM6Ly9jb29sb3JzLmNvLzMyMGUzYi1lNTYzOTktN2Y5NmZmLWE2Y2ZkNS1kYmZjZmYgKi9cbiAgICAtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeTogI0YzRkNGMDtcbiAgICAtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5OiAjRkZEMjNGO1xuICAgIC0tYWNjZW50LWNvbG9yLXByaW1hcnk6ICNFRTQyNjY7XG4gICAgLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5OiAjMUYyNzFCO1xuICAgIC0tYWNjZW50LWNvbG9yLXRlcnRpYXJ5OiAjNTQwRDZFO1xuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1Rla28nLCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgICAtLWZvbnQtZmFtaWx5LXNlY29uZGFyeTogJ051bml0byBTYW5zJywgYXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgLS1wYWRkaW5nLWNvbnRhaW5lcjogMC41cmVtO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XG59XG5cbiNuYXZiYXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgei1pbmRleDogMTtcbiAgICBhbmltYXRpb246IHNsaWRlLXJpZ2h0IDQwMG1zIGVhc2UtaW47XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA1cHggMC41cHggYmxhY2s7XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gI2xvZ28ge1xuICAgIHBhZGRpbmc6IDFyZW07XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gI2xvZ28gPiBhIHtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgNXZ3LCAzcmVtKTtcbn1cblxuLmxpbmtzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGdyaWQtYXV0by1yb3dzOiBtaW4tY29udGVudDtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIGdhcDogMC41cmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubGlua3MuYWN0aXZlIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGFuaW1hdGlvbjogc2xpZGUtbGVmdCAyMDBtcyBlYXNlO1xufVxuXG4ubGlua3MgPiBsaSA+IGEge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAyLjI1cmVtKTtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcbn1cblxuLmxpbmtzID4gbGkgPiBhOm5vdCguZ2l0aHViKTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeSk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwJSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4ubGlua3MgPiBsaSA+IGEuYWN0aXZlIHtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xufVxuXG4ubGlua3MgPiBsaSA+IGEuZ2l0aHViID4gaW1nIHtcbiAgICBtYXgtd2lkdGg6IDY0cHg7XG4gICAgd2lkdGg6IDN2dztcbiAgICBtaW4td2lkdGg6IDI0cHg7XG59XG5cbi5idG4tbWVudSB7XG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG4uYnRuLW1lbnUgPiBpbWcge1xuICAgIG1heC13aWR0aDogMzJweDtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDEwcHggMnB4IGJsYWNrO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6OmJlZm9yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IC0yJTtcbiAgICBib3R0b206IC0yJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGNvbnRlbnQ6ICdFeGlsZVxcXFwncyBQaXp6YSc7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMy41cmVtLCAxOHZ3LCAxMHJlbSk7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1wcmltYXJ5KTtcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDEge1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMy41cmVtLCAxOHZ3LCAxMHJlbSk7XG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LXNoYWRvdzogXG4gICAgICAgICAgICAwcHggMHB4IHZhcigtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeSksXG4gICAgICAgICAgICAycHggLTJweCB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xuICAgIHRyYW5zaXRpb246IDQwMG1zO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAuaGVyby10ZXh0ID4gaDE6aG92ZXI6OmJlZm9yZSB7XG4gICAgLXdlYmtpdC1tYXNrOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCAwIDNweCwgcmdiYSgwLCAwLCAwLCAwLjgpIDAgNnB4KTtcbiAgICBtYXNrOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCAwIDNweCwgcmdiYSgwLCAwLCAwLCAwLjgpIDAgNnB4KTtcbn1cbiNoZXJvID4gLmNvbnRhaW5lciA+IC5oZXJvLXRleHQgPiBoMTpob3ZlciB7XG4gICAgdGV4dC1zaGFkb3c6IFxuICAgICAgICAgICAgMHB4IDBweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDFweCAxcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICAycHggMnB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgM3B4IDNweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDRweCA0cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICA1cHggNXB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgNnB4IDZweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDdweCA3cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXG4gICAgICAgICAgICA4cHggOHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxuICAgICAgICAgICAgOXB4IDlweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcbiAgICAgICAgICAgIDEwcHggMTBweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KTtcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpsYXN0LW9mLXR5cGUge1xuICAgIHJpZ2h0OiAwO1xufVxuXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMnJlbSwgNXZ3LCA1cmVtKTtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDEwMCUpIHNlcGlhKDMlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSg2NGRlZykgYnJpZ2h0bmVzcygxMDglKSBjb250cmFzdCgxMDElKTtcbn1cblxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciA+IC5jYXJvdXNlbC1pdGVtID4gaW1nIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuaDEsIGgyLCBoMywgaDUge1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDV2dywgM3JlbSk7XG59XG5cbiNjb250ZW50IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuI2NvbnRlbnQgPiAqIHtcbiAgICBzY3JvbGwtbWFyZ2luLXRvcDogNXJlbTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHJvdy1nYXA6IDFyZW07XG59XG5cbiNjb250ZW50ID4gKiA+IGgxIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAtMnJlbTtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoM3JlbSwgNXZ3LCA1cmVtKTtcblxuICAgIGFuaW1hdGlvbjogc2xpZGUtdXAgMTAwbXMgZWFzZS1pbjtcbn1cblxuI2NvbnRlbnQgPiAqID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBnYXA6IDFyZW07XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcblxuICAgIGJvcmRlcjogOXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIG91dGxpbmUtb2Zmc2V0OiAtMjBweDtcbiAgICBvdXRsaW5lLXN0eWxlOiBhdXRvO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgNXZ3LCAxLjMwcmVtKTtcblxuICAgIGFuaW1hdGlvbjogc2xpZGUtdXAgMjAwbXMgZWFzZS1pbjtcbn1cblxuI2NvbnRlbnQgPiAqID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciA+ICoge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG5mb290ZXIge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xuICAgIGJveC1zaGFkb3c6IDBweCA0cHggN3B4IDNweCBibGFjaztcbn1cblxuZm9vdGVyID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuZm9vdGVyID4gLmNvbnRhaW5lciA+IGg1IHtcbiAgICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgM3Z3LCAxLjVyZW0pO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICNuYXZiYXIge1xuICAgICAgICBhbmltYXRpb246IHNsaWRlLWxlZnQgMjAwbXMgZWFzZS1pbjtcbiAgICB9XG5cbiAgICAubGlua3Mge1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICAgICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCBtaW4tY29udGVudCk7XG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAycmVtO1xuICAgICAgICBncmlkLWF1dG8tcm93czogMWZyO1xuICAgICAgICBnYXA6IDJyZW07XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhIHtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmxpbmtzID4gbGkgPiBhLmdpdGh1YiB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICAgICAgICBkaXNwbGF5OiAtbW96LWlubGluZS1ncmlkO1xuICAgIH1cblxuICAgIC5saW5rcyA+IGxpID4gYTpub3QoLmdpdGh1Yik6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjI1KTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICAgIC5saW5rcyA+IGxpID4gYTpob3ZlciB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yNSk7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAubGlua3MgPiBsaSA+IGE6bm90KC5naXRodWIpOmFmdGVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3R0b206IC0xMCU7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAwLjJyZW07XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICAgIC5saW5rcyA+IGxpID4gYTpob3ZlcjphZnRlciB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpIHNjYWxlWSgxLjUpO1xuICAgIH1cblxuICAgIC5idG4tbWVudSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLXJpZ2h0IHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjAwJSk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLWxlZnQge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwMCUpO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgIH1cbn1cblxuQGtleWZyYW1lcyBzbGlkZS11cCB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XG4gICAgfVxuICAgIFxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSwwQkFBMEI7SUFDMUI7K0NBQytGO0FBQ25HOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25COzsrQ0FFK0M7QUFDbkQ7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsMERBQTBEO0lBQzFELG1DQUFtQztJQUNuQyxxQ0FBcUM7SUFDckMsK0JBQStCO0lBQy9CLGlDQUFp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SSwyQkFBMkI7SUFDL0I7O0lBRUE7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLVZhcmlhYmxlRm9udF9ZVExDXFxcXCxvcHN6XFxcXCx3ZHRoXFxcXCx3Z2h0LnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9OdW5pdG9fU2Fucy9OdW5pdG9TYW5zLUl0YWxpYy1WYXJpYWJsZUZvbnRfWVRMQ1xcXFwsb3BzelxcXFwsd2R0aFxcXFwsd2dodC50dGYnKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnVGVrbyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9UZWtvL1Rla28tTGlnaHQudHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1NZWRpdW0udHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1Rla28vVGVrby1SZWd1bGFyLnR0ZicpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAgIC8qIGNvbG9yIHBhbGV0dGUgKi9cXG4gICAgLyogaHR0cHM6Ly9jb29sb3JzLmNvLzMyMGUzYi1lNTYzOTktN2Y5NmZmLWE2Y2ZkNS1kYmZjZmYgKi9cXG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnk6ICNGM0ZDRjA7XFxuICAgIC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnk6ICNGRkQyM0Y7XFxuICAgIC0tYWNjZW50LWNvbG9yLXByaW1hcnk6ICNFRTQyNjY7XFxuICAgIC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeTogIzFGMjcxQjtcXG4gICAgLS1hY2NlbnQtY29sb3ItdGVydGlhcnk6ICM1NDBENkU7XFxuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1Rla28nLCBhcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgLS1mb250LWZhbWlseS1zZWNvbmRhcnk6ICdOdW5pdG8gU2FucycsIGFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAtLXBhZGRpbmctY29udGFpbmVyOiAwLjVyZW07XFxufVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XFxufVxcblxcbiNuYXZiYXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBhbmltYXRpb246IHNsaWRlLXJpZ2h0IDQwMG1zIGVhc2UtaW47XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDVweCAwLjVweCBibGFjaztcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAjbG9nbyB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gI2xvZ28gPiBhIHtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgNXZ3LCAzcmVtKTtcXG59XFxuXFxuLmxpbmtzIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50O1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHRvcDogMDtcXG4gICAgZ2FwOiAwLjVyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgcGFkZGluZy10b3A6IDFyZW07XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5saW5rcy5hY3RpdmUge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBhbmltYXRpb246IHNsaWRlLWxlZnQgMjAwbXMgZWFzZTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMi4yNXJlbSk7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1zZWNvbmRhcnkpO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhOm5vdCguZ2l0aHViKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwJSk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhLmFjdGl2ZSB7XFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XFxufVxcblxcbi5saW5rcyA+IGxpID4gYS5naXRodWIgPiBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDY0cHg7XFxuICAgIHdpZHRoOiAzdnc7XFxuICAgIG1pbi13aWR0aDogMjRweDtcXG59XFxuXFxuLmJ0bi1tZW51IHtcXG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbi5idG4tbWVudSA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMzJweDtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAxMHB4IDJweCBibGFjaztcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOjpiZWZvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAtMiU7XFxuICAgIGJvdHRvbTogLTIlO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgY29udGVudDogJ0V4aWxlXFxcXCdzIFBpenphJztcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDMuNXJlbSwgMTh2dywgMTByZW0pO1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMS41dnc7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxIHtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgzLjVyZW0sIDE4dncsIDEwcmVtKTtcXG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3Itc2Vjb25kYXJ5KTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDEuNXZ3O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdGV4dC1zaGFkb3c6IFxcbiAgICAgICAgICAgIDBweCAwcHggdmFyKC0tYmFja2dyb3VuZC1jb2xvci1wcmltYXJ5KSxcXG4gICAgICAgICAgICAycHggLTJweCB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICB0cmFuc2l0aW9uOiA0MDBtcztcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOmhvdmVyOjpiZWZvcmUge1xcbiAgICAtd2Via2l0LW1hc2s6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDAgM3B4LCByZ2JhKDAsIDAsIDAsIDAuOCkgMCA2cHgpO1xcbiAgICBtYXNrOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCAwIDNweCwgcmdiYSgwLCAwLCAwLCAwLjgpIDAgNnB4KTtcXG59XFxuI2hlcm8gPiAuY29udGFpbmVyID4gLmhlcm8tdGV4dCA+IGgxOmhvdmVyIHtcXG4gICAgdGV4dC1zaGFkb3c6IFxcbiAgICAgICAgICAgIDBweCAwcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgMXB4IDFweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICAycHggMnB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDNweCAzcHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgNHB4IDRweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICA1cHggNXB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDZweCA2cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgN3B4IDdweCB2YXIoLS1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KSxcXG4gICAgICAgICAgICA4cHggOHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpLFxcbiAgICAgICAgICAgIDlweCA5cHggdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSksXFxuICAgICAgICAgICAgMTBweCAxMHB4IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcXG59XFxuXFxuI2hlcm8gPiAuY29udGFpbmVyID4gI2Nhcm91c2VsID4gLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNoZXJvID4gLmNvbnRhaW5lciA+ICNjYXJvdXNlbCA+IC5jb250YWluZXIgPiBidXR0b24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSB7XFxuICAgIHJpZ2h0OiAwO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gYnV0dG9uID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDJyZW0sIDV2dywgNXJlbSk7XFxuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoMTAwJSkgc2VwaWEoMyUpIHNhdHVyYXRlKDIlKSBodWUtcm90YXRlKDY0ZGVnKSBicmlnaHRuZXNzKDEwOCUpIGNvbnRyYXN0KDEwMSUpO1xcbn1cXG5cXG4jaGVybyA+IC5jb250YWluZXIgPiAjY2Fyb3VzZWwgPiAuY29udGFpbmVyID4gLmNhcm91c2VsLWl0ZW0gPiBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG5cXG5oMSwgaDIsIGgzLCBoNSB7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDV2dywgM3JlbSk7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxufVxcblxcbiNjb250ZW50ID4gKiB7XFxuICAgIHNjcm9sbC1tYXJnaW4tdG9wOiA1cmVtO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4jY29udGVudCA+ICogPiBoMSB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogLTJyZW07XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoM3JlbSwgNXZ3LCA1cmVtKTtcXG5cXG4gICAgYW5pbWF0aW9uOiBzbGlkZS11cCAxMDBtcyBlYXNlLWluO1xcbn1cXG5cXG4jY29udGVudCA+ICogPiAqOm5vdChoMSkgPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ2FwOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcXG5cXG4gICAgYm9yZGVyOiA5cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIG91dGxpbmUtb2Zmc2V0OiAtMjBweDtcXG4gICAgb3V0bGluZS1zdHlsZTogYXV0bztcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCA1dncsIDEuMzByZW0pO1xcblxcbiAgICBhbmltYXRpb246IHNsaWRlLXVwIDIwMG1zIGVhc2UtaW47XFxufVxcblxcbiNjb250ZW50ID4gKiA+ICo6bm90KGgxKSA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDdweCAzcHggYmxhY2s7XFxufVxcblxcbmZvb3RlciA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZm9vdGVyID4gLmNvbnRhaW5lciA+IGg1IHtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAzdncsIDEuNXJlbSk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNuYXZiYXIge1xcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZS1sZWZ0IDIwMG1zIGVhc2UtaW47XFxuICAgIH1cXG5cXG4gICAgLmxpbmtzIHtcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIG1pbi1jb250ZW50KTtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDJyZW07XFxuICAgICAgICBncmlkLWF1dG8tcm93czogMWZyO1xcbiAgICAgICAgZ2FwOiAycmVtO1xcbiAgICB9XFxuXFxuICAgIC5saW5rcyA+IGxpID4gYSB7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICAubGlua3MgPiBsaSA+IGEuZ2l0aHViIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ncmlkO1xcbiAgICAgICAgZGlzcGxheTogLW1vei1pbmxpbmUtZ3JpZDtcXG4gICAgfVxcblxcbiAgICAubGlua3MgPiBsaSA+IGE6bm90KC5naXRodWIpOmhvdmVyIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjI1KTtcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gICAgfVxcblxcbiAgICAubGlua3MgPiBsaSA+IGE6aG92ZXIge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjI1KTtcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gICAgfVxcblxcbiAgICAubGlua3MgPiBsaSA+IGE6bm90KC5naXRodWIpOmFmdGVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIGJvdHRvbTogLTEwJTtcXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBoZWlnaHQ6IDAuMnJlbTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoMCk7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIH1cXG5cXG4gICAgLmxpbmtzID4gbGkgPiBhOmhvdmVyOmFmdGVyIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpIHNjYWxlWSgxLjUpO1xcbiAgICB9XFxuXFxuICAgIC5idG4tbWVudSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGUtcmlnaHQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwMCUpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLWxlZnQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjAwJSk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGUtdXAge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XFxuICAgIH1cXG4gICAgXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNhYm91dC1tYWluID4gLmNvbnRhaW5lciA+IHAsXG4jaGlzdG9yeSA+IC5jb250YWluZXIgPiAuaXRlbSA+IDpsYXN0LWNoaWxkIHtcbiAgICAvKiBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMS4yNXJlbSk7ICovXG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgI2Fib3V0ID4gI2hpc3RvcnkgPiAuY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgICB9XG5cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvYWJvdXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOztJQUVJLDBDQUEwQztBQUM5Qzs7QUFFQTtJQUNJO1FBQ0ksYUFBYTtRQUNiLHFDQUFxQztJQUN6Qzs7QUFFSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjYWJvdXQtbWFpbiA+IC5jb250YWluZXIgPiBwLFxcbiNoaXN0b3J5ID4gLmNvbnRhaW5lciA+IC5pdGVtID4gOmxhc3QtY2hpbGQge1xcbiAgICAvKiBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMS4yNXJlbSk7ICovXFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAgICNhYm91dCA+ICNoaXN0b3J5ID4gLmNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gICAgfVxcblxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGxhYmVsID4gLmFzdGVyaWsge1xuICAgIGNvbG9yOiByZWQ7XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+OmZpcnN0LWNoaWxkIHtcbiAgICAvKiBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMS4yNXJlbSk7ICovXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiBsYWJlbCB7XG4gICAgLyogZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDEwdncsIDJyZW0pOyAqL1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLyogc2VsZWN0cyBpbnB1dHMgYW5kIHRleHRhcmVhICovXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpIHtcbiAgICAvKiBmb250LXNpemU6IGNsYW0oMXJlbSwgMTB2dywgMnJlbSk7ICovXG4gICAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpOjpwbGFjZWhvbGRlciB7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB0ZXh0LWluZGVudDogNSU7XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiAqOm50aC1jaGlsZChuICsgMik6Zm9jdXMge1xuICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpO1xuICAgIHBhZGRpbmc6IDAuNzVyZW07XG59XG5cbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkID4gYnV0dG9uIHtcbiAgICBwYWRkaW5nOiAwLjc1cmVtIDRyZW07XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yLXByaW1hcnkpO1xuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4IDBweCBibGFjaztcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Vjb25kYXJ5KTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS4yNXJlbSwgMXZ3LCAycmVtKTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOmxhc3QtY2hpbGQgPiBidXR0b246YWN0aXZlIHtcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAxcHggYmxhY2tcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAjZm9ybSA+IC5jb250YWluZXIge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIH1cblxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IGxhYmVsIHtcbiAgICAgICAgZ3JpZC1hcmVhOiAxIC8gc3BhbiAyO1xuICAgIH1cblxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAgIGdyaWQtYXJlYTogMiAvIHNwYW4gMjtcbiAgICB9XG5cbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOm50aC1vZi10eXBlKDQpIHtcbiAgICAgICAgZ3JpZC1hcmVhOiA0IC8gc3BhbiAyXG4gICAgfVxuXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LW9mLXR5cGUge1xuICAgICAgICBncmlkLWFyZWE6IDUgLyBzcGFuIDI7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jb250YWN0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLDBDQUEwQztJQUMxQywwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksMENBQTBDO0lBQzFDLGdCQUFnQjtJQUNoQix5QkFBeUI7QUFDN0I7O0FBRUEsZ0NBQWdDO0FBQ2hDO0lBQ0ksdUNBQXVDO0lBQ3ZDLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLCtDQUErQztJQUMvQyxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQiw2Q0FBNkM7SUFDN0MsaUNBQWlDO0lBQ2pDLHlDQUF5QztJQUN6QyxnQkFBZ0I7SUFDaEIsb0NBQW9DO0lBQ3BDLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLHFDQUFxQztJQUN6Qzs7SUFFQTtRQUNJLHFCQUFxQjtJQUN6Qjs7SUFFQTtRQUNJLHFCQUFxQjtJQUN6Qjs7SUFFQTtRQUNJO0lBQ0o7O0lBRUE7UUFDSSxxQkFBcUI7SUFDekI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJsYWJlbCA+IC5hc3RlcmlrIHtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID46Zmlyc3QtY2hpbGQge1xcbiAgICAvKiBmb250LXNpemU6IGNsYW1wKDFyZW0sIDV2dywgMS4yNXJlbSk7ICovXFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbSA+IGxhYmVsIHtcXG4gICAgLyogZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDEwdncsIDJyZW0pOyAqL1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG5cXG4vKiBzZWxlY3RzIGlucHV0cyBhbmQgdGV4dGFyZWEgKi9cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpIHtcXG4gICAgLyogZm9udC1zaXplOiBjbGFtKDFyZW0sIDEwdncsIDJyZW0pOyAqL1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjM1cmVtO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW0gPiAqOm50aC1jaGlsZChuICsgMik6OnBsYWNlaG9sZGVyIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgdGV4dC1pbmRlbnQ6IDUlO1xcbn1cXG5cXG4jZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtID4gKjpudGgtY2hpbGQobiArIDIpOmZvY3VzIHtcXG4gICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tYWNjZW50LWNvbG9yLXNlY29uZGFyeSk7XFxuICAgIHBhZGRpbmc6IDAuNzVyZW07XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbiNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1jaGlsZCA+IGJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDAuNzVyZW0gNHJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAycmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3ItcHJpbWFyeSk7XFxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4IDBweCBibGFjaztcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXNlY29uZGFyeSk7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS4yNXJlbSwgMXZ3LCAycmVtKTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpsYXN0LWNoaWxkID4gYnV0dG9uOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggM3B4IDFweCBibGFja1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgICAjZm9ybSA+IC5jb250YWluZXIge1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgfVxcblxcbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiBsYWJlbCB7XFxuICAgICAgICBncmlkLWFyZWE6IDEgLyBzcGFuIDI7XFxuICAgIH1cXG5cXG4gICAgI2Zvcm0gPiAuY29udGFpbmVyID4gLmZvcm0taXRlbTpmaXJzdC1vZi10eXBlIHtcXG4gICAgICAgIGdyaWQtYXJlYTogMiAvIHNwYW4gMjtcXG4gICAgfVxcblxcbiAgICAjZm9ybSA+IC5jb250YWluZXIgPiAuZm9ybS1pdGVtOm50aC1vZi10eXBlKDQpIHtcXG4gICAgICAgIGdyaWQtYXJlYTogNCAvIHNwYW4gMlxcbiAgICB9XFxuXFxuICAgICNmb3JtID4gLmNvbnRhaW5lciA+IC5mb3JtLWl0ZW06bGFzdC1vZi10eXBlIHtcXG4gICAgICAgIGdyaWQtYXJlYTogNSAvIHNwYW4gMjtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNob21lID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciA+IGgyLFxuI2hvbWUgPiAqOmxhc3QtY2hpbGQgPiAuY29udGFpbmVyID4gcCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gICAgY29sdW1uLWdhcDogNXZ3O1xufVxuXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCA+IDpudGgtY2hpbGQoMm4gLSAxICkge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCA+IDpudGgtY2hpbGQoMm4pIHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICNob21lIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICB9XG5cbiAgICAjaG9tZSA+IGgxLFxuICAgICNob21lID4gI3N0YXRlbWVudCB7XG4gICAgICAgIGdyaWQtY29sdW1uOiBzcGFuIDI7XG4gICAgfVxuXG4gICAgI2hvbWUgPiAjbG9jYXRpb24gPiAuY29udGFpbmVyIHtcbiAgICAgICAgbWluLWhlaWdodDogMTAwJTtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudDtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2hvbWUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOztJQUVJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSTtRQUNJLHFDQUFxQztJQUN6Qzs7SUFFQTs7UUFFSSxtQkFBbUI7SUFDdkI7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsK0JBQStCO0lBQ25DO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2hvbWUgPiAqOm5vdChoMSkgPiAuY29udGFpbmVyID4gaDIsXFxuI2hvbWUgPiAqOmxhc3QtY2hpbGQgPiAuY29udGFpbmVyID4gcCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2hvbWUgPiAjaG91cnMgPiAuY29udGFpbmVyID4gdWwge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgICBjb2x1bW4tZ2FwOiA1dnc7XFxufVxcblxcbiNob21lID4gI2hvdXJzID4gLmNvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgybiAtIDEgKSB7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbn1cXG5cXG4jaG9tZSA+ICNob3VycyA+IC5jb250YWluZXIgPiB1bCA+IDpudGgtY2hpbGQoMm4pIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgI2hvbWUge1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgfVxcblxcbiAgICAjaG9tZSA+IGgxLFxcbiAgICAjaG9tZSA+ICNzdGF0ZW1lbnQge1xcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gMjtcXG4gICAgfVxcblxcbiAgICAjaG9tZSA+ICNsb2NhdGlvbiA+IC5jb250YWluZXIge1xcbiAgICAgICAgbWluLWhlaWdodDogMTAwJTtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQ7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICByb3ctZ2FwOiAxcmVtO1xufVxuXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtIHtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmZpcnN0LWNoaWxkIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6bGFzdC1jaGlsZCA+IHN1cCB7XG4gICAgZm9udC1zaXplOiBjbGFtcCgwLjY1cmVtLCAydncsIDAuOTVyZW0pO1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIHBhZGRpbmc6IDAuMTVyZW07XG59XG5cbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmZpcnN0LWNoaWxkOjphZnRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGNvbnRlbnQ6ICcgJztcbiAgICB3aWR0aDogNzUlO1xuICAgIGJvcmRlci1ib3R0b206IDNweCBkb3R0ZWQgYmxhY2s7XG59XG5cbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOm50aC1jaGlsZChuICsgMikge1xuICAgIHRleHQtYWxpZ246IGVuZDtcbiAgICB0ZXh0LXdyYXA6IGJhbGFuY2U7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgI2NvbnRlbnQgPiAjbWVudSA+ICo6bm90KGgxKSA+IC5jb250YWluZXIge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbWVudS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSwwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksdUNBQXVDO0lBQ3ZDLDBCQUEwQjtJQUMxQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsT0FBTztJQUNQLFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtJQUNWLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO1FBQ0kscUNBQXFDO0lBQ3pDO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICoge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtIHtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jbWVudSA+ICNtZW51LW1haW4gPiAuY29udGFpbmVyID4gKiA+IC5pdGVtID4gcDpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuI21lbnUgPiAjbWVudS1tYWluID4gLmNvbnRhaW5lciA+ICogPiAuaXRlbSA+IHA6bGFzdC1jaGlsZCA+IHN1cCB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMC42NXJlbSwgMnZ3LCAwLjk1cmVtKTtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICAgIHBhZGRpbmc6IDAuMTVyZW07XFxufVxcblxcbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOmZpcnN0LWNoaWxkOjphZnRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBjb250ZW50OiAnICc7XFxuICAgIHdpZHRoOiA3NSU7XFxuICAgIGJvcmRlci1ib3R0b206IDNweCBkb3R0ZWQgYmxhY2s7XFxufVxcblxcbiNtZW51ID4gI21lbnUtbWFpbiA+IC5jb250YWluZXIgPiAqID4gLml0ZW0gPiBwOm50aC1jaGlsZChuICsgMikge1xcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XFxuICAgIHRleHQtd3JhcDogYmFsYW5jZTtcXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgICAjY29udGVudCA+ICNtZW51ID4gKjpub3QoaDEpID4gLmNvbnRhaW5lciB7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hYm91dC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Fib3V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jb250YWN0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY29udGFjdC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZW51LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwidmFyIG1hcCA9IHtcblx0XCIuL2dpdGh1Yi1tYXJrLXdoaXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9naXRodWItbWFyay9naXRodWItbWFyay13aGl0ZS5zdmdcIixcblx0XCIuL2dpdGh1Yi1tYXJrLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9naXRodWItbWFyay9naXRodWItbWFyay5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2dpdGh1Yi1tYXJrIHN5bmMgXFxcXC5zdmckXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2NoZXZyb25fbGVmdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9sZWZ0LnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9yaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9yaWdodC5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2Fzc2V0cy9pY29ucyBzeW5jIFxcXFwuc3ZnJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9kb3VnaDAuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9kb3VnaDAuanBnXCIsXG5cdFwiLi9waXp6YTAuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTAuanBnXCIsXG5cdFwiLi9waXp6YTEuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTEuanBnXCIsXG5cdFwiLi9waXp6YTIuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTIuanBnXCIsXG5cdFwiLi9waXp6YTMuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTMuanBnXCIsXG5cdFwiLi9waXp6YTQuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTQuanBnXCIsXG5cdFwiLi9waXp6YTUuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTUuanBnXCIsXG5cdFwiLi9waXp6YTYuanBnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9waXp6YTYuanBnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMgc3luYyBcXFxcLmpwZyRcIjsiLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCBidWlsZEhlYWRlciBmcm9tICcuL21vZHVsZXMvaGVhZGVyLmpzJztcbmltcG9ydCBidWlsZEhvbWUgZnJvbSAnLi9tb2R1bGVzL2hvbWUuanMnO1xuaW1wb3J0IGJ1aWxkQWJvdXQgZnJvbSAnLi9tb2R1bGVzL2Fib3V0LmpzJztcbmltcG9ydCBidWlsZE1lbnUgZnJvbSAnLi9tb2R1bGVzL21lbnUuanMnO1xuaW1wb3J0IGJ1aWxkQ29udGFjdCBmcm9tICcuL21vZHVsZXMvY29udGFjdC5qcyc7XG5pbXBvcnQgYnVpbGRGb290ZXIgZnJvbSAnLi9tb2R1bGVzL2Zvb3Rlci5qcyc7XG5cbmNvbnN0IGhvbWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYnVpbGQgPSB7XG4gICAgICAgIGhlYWRlcjogYnVpbGRIZWFkZXIsXG4gICAgICAgIGhvbWU6IGJ1aWxkSG9tZSxcbiAgICAgICAgYWJvdXQ6IGJ1aWxkQWJvdXQsXG4gICAgICAgIG1lbnU6IGJ1aWxkTWVudSxcbiAgICAgICAgY29udGFjdDogYnVpbGRDb250YWN0LFxuICAgICAgICBmb290ZXI6IGJ1aWxkRm9vdGVyLFxuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnQgPSB7XG4gICAgICAgIGFjdGl2ZVRhYjogbnVsbCxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBidWlsZC5oZWFkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVET00oKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGJ1aWxkLmZvb3RlcigpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLm5hdkJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYXZiYXInKTtcbiAgICAgICAgICAgIHRoaXMubmF2SXRlbXMgPSBBcnJheS5mcm9tKHRoaXMubmF2QmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXIgdWwgbGkgYScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGxldCBjb250ZW50O1xuICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYnVpbGQuaG9tZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRDb250YWluZXIuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYnVpbGRba2V5XSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIoY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hUYWIgPSB0aGlzLnN3aXRjaFRhYi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5uYXZJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3dpdGNoVGFiKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN3aXRjaFRhYjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnVpbGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGtleSkgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXRBY3RpdmVUYWI6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubmF2SXRlbXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGFzc05hbWUgPT09IGNvbnRlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cblxuICAgIGNvbnRlbnQuaW5pdCgpO1xufSkoKTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9hYm91dC5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEFib3V0KCkge1xuICAgIGNvbnNvbGUubG9nKGBhYm91dC5qcyBydW5uaW5nYCk7XG4gICAgY29uc3QgYWJvdXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhYm91dENvbnRhaW5lci5pZCA9ICdhYm91dCc7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQWJvdXQnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgYWJvdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBcbiAgICBhYm91dENvbnRhaW5lci5hcHBlbmRDaGlsZChhYm91dE1haW4ucmVuZGVyKCkpO1xuICAgIGFib3V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGFib3V0SGlzdG9yeS5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGFib3V0Q29udGFpbmVyO1xufVxuXG5jb25zdCBhYm91dE1haW4gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9ICdWYXJpdXMgbW9yYmkgZW5pbSBudW5jIGZhdWNpYnVzIGEgcGVsbGVudGVzcXVlIHNpdCBhbWV0IHBvcnR0aXRvci4gTWFnbmEgZWdldCBlc3QgbG9yZW0gaXBzdW0gZG9sb3Igc2l0LiBBcmN1IGZlbGlzIGJpYmVuZHVtIHV0IHRyaXN0aXF1ZSBldC4gVGVtcHVzIGltcGVyZGlldCBudWxsYSBtYWxlc3VhZGEgcGVsbGVudGVzcXVlIGVsaXQgZWdldCBncmF2aWRhIGN1bS4gVml2ZXJyYSBvcmNpIHNhZ2l0dGlzIGV1IHZvbHV0cGF0IG9kaW8uIElkIG5pYmggdG9ydG9yIGlkIGFsaXF1ZXQuIEZhdWNpYnVzIG5pc2wgdGluY2lkdW50IGVnZXQgbnVsbGFtLiBFZ2VzdGFzIHF1aXMgaXBzdW0gc3VzcGVuZGlzc2UgdWx0cmljZXMuIFN1c3BlbmRpc3NlIHBvdGVudGkgbnVsbGFtIGFjIHRvcnRvciB2aXRhZSBwdXJ1cyBmYXVjaWJ1cy4gVGluY2lkdW50IGVnZXQgbnVsbGFtIG5vbiBuaXNpIGVzdCBzaXQuJztcbiAgICAgICAgY29uc3QgYWJvdXRNYWluV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhYm91dE1haW5XcmFwcGVyLmlkID0gJ2Fib3V0LW1haW4nO1xuXG4gICAgICAgIGNvbnN0IGFib3V0TWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhYm91dE1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgYWJvdXRNYWluUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBhYm91dE1haW5QYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICAgIGFib3V0TWFpblBhcmFncmFwaC5hcHBlbmRDaGlsZChhYm91dE1haW5QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgYWJvdXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGFib3V0TWFpblBhcmFncmFwaCk7XG4gICAgICAgIGFib3V0TWFpbldyYXBwZXIuYXBwZW5kQ2hpbGQoYWJvdXRNYWluQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gYWJvdXRNYWluV3JhcHBlcjtcbiAgICB9XG59XG5cbmNvbnN0IGFib3V0SGlzdG9yeSA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBoaXN0b3J5V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXN0b3J5V3JhcHBlci5pZCA9ICdoaXN0b3J5JztcblxuICAgICAgICBjb25zdCBoaXN0b3J5TWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXN0b3J5TWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoaXN0b3J5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlIZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2tleX0sICR7dGhpcy5oaXN0b3J5W2tleV1bMF19YCk7XG4gICAgICAgICAgICBoaXN0b3J5SGVhZGluZy5hcHBlbmRDaGlsZChoaXN0b3J5SGVhZGluZ1RleHQpO1xuXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5UGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeVBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmhpc3Rvcnlba2V5XVsxXSk7XG4gICAgICAgICAgICBoaXN0b3J5UGFyYWdyYXBoLmFwcGVuZENoaWxkKGhpc3RvcnlQYXJhZ3JhcGhUZXh0KTtcblxuICAgICAgICAgICAgaGlzdG9yeUNvbnRhaW5lci5hcHBlbmRDaGlsZChoaXN0b3J5SGVhZGluZyk7XG4gICAgICAgICAgICBoaXN0b3J5Q29udGFpbmVyLmFwcGVuZENoaWxkKGhpc3RvcnlQYXJhZ3JhcGgpO1xuICAgICAgICAgICAgaGlzdG9yeU1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoaGlzdG9yeUNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBoaXN0b3J5V3JhcHBlci5hcHBlbmRDaGlsZChoaXN0b3J5TWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGhpc3RvcnlXcmFwcGVyO1xuICAgIH0sXG4gICAgaGlzdG9yeToge1xuICAgICAgICAyMDEzOiBbJ1R3aWxpZ2h0IFN0cmFuZCcsICdDb21pbmcgZnJvbSBBc2NhbG9uLCB3ZSBzdHJpdmVkIHRvIGZlZWQgdGhvdXNhbmRzIG9mIGV4aWxlcyB3aXRoIGZhbWlsaWFyIGRpc2hlcy4gV2Ugc3RhcnRlZCBjb29raW5nIHBpenphcyBvbiBhIHNtYWxsIGZvb2QgY2FydCB3aXRoIGEgaG9tZW1hZGUgcGl6emEgb3ZlbiwgYW5kIHB1bGxlZCBvdXIgc2VydmljZSBhY3Jvc3MgVGhlIE11ZCBGbGF0cy4nXSxcbiAgICAgICAgMjAxNDogWydXZXRsYW5kcycsICdPdXIgZmlyc3QgZm9vZCB0cnVjayBoaXQgdGhlIHpvbmUgb2ZmZXJpbmcgbW9yZSBmb29kIGNob2ljZXMgd2lkZWx5IGtub3duIHRvIGxvY2Fscy4nXSxcbiAgICAgICAgMjAxNTogWydTYXJuIEVuY2FtcG1lbnQnLCAnT3VyIG9wZW4tY29uY2VwdCByZXN0YXVyYW50IG9wZW5lZCB1cCB0byB0aGUgdW5kZWFkLCBCbGFja2d1YXJkIHNvbGlkZXJzIGFuZCBwYXNzaW5nIGV4aWxlcy4nXSxcbiAgICB9LFxufSIsImltcG9ydCAnLi4vc3R5bGVzL2NvbnRhY3QuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRDb250YWN0KCkge1xuICAgIGNvbnNvbGUubG9nKGBjb250YWN0LmpzIHJ1bm5pbmdgKTtcbiAgICBjb25zdCBjb250YWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFjdENvbnRhaW5lci5pZCA9ICdjb250YWN0JztcbiAgICBcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQ29udGFjdCcpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBjb250YWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBjb250YWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0ucmVuZGVyKCkpO1xuICAgIHJldHVybiBjb250YWN0Q29udGFpbmVyO1xufVxuXG5jb25zdCBmb3JtID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBmb3JtRWxlbWVudC5pZCA9ICdmb3JtJ1xuXG4gICAgICAgIGNvbnN0IGZvcm1XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvcm1XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IGZvcm1Ob3RlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBjb25zdCBmb3JtTm90ZUxhYmVsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgSW5kaWNhdGVzIHJlcXVpcmVkIGZpZWxkJyk7XG4gICAgICAgIGNvbnN0IGZvcm1Ob3RlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZm9ybU5vdGVTcGFuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcqJyk7XG4gICAgICAgIGZvcm1Ob3RlU3Bhbi5jbGFzc0xpc3QuYWRkKCdhc3RlcmlrJyk7XG5cbiAgICAgICAgZm9ybU5vdGVTcGFuLmFwcGVuZENoaWxkKGZvcm1Ob3RlU3BhblRleHQpO1xuICAgICAgICBmb3JtTm90ZUxhYmVsLmFwcGVuZENoaWxkKGZvcm1Ob3RlU3Bhbik7XG4gICAgICAgIGZvcm1Ob3RlTGFiZWwuYXBwZW5kQ2hpbGQoZm9ybU5vdGVMYWJlbFRleHQpO1xuICAgICAgICBmb3JtV3JhcHBlci5hcHBlbmRDaGlsZChmb3JtTm90ZUxhYmVsKTtcbiAgICAgICAgZm9yIChsZXQgaW5wdXRzIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgY29uc3QgZm9ybUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGZvcm1JdGVtLmNsYXNzTGlzdC5hZGQoJ2Zvcm0taXRlbScpO1xuXG4gICAgICAgICAgICBpZiAoaW5wdXRzICE9PSAnc3VibWl0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtpbnB1dHN9IGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdhc3RlcmlrJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnKicpO1xuICAgICAgICAgICAgICAgIGxhYmVsLmh0bWxGb3IgPSBpbnB1dHM7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQobGFiZWxUZXh0KTtcbiAgICAgICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKHNwYW5UZXh0KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRzICE9PSAnbWVzc2FnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5pZCA9IGlucHV0cztcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dCwgdGhpcy5hdHRyaWJ1dGVzW2lucHV0c10pO1xuICAgICAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0QXJlYS5pZCA9IGlucHV0cztcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYXR0ciBpbiB0aGlzLmF0dHJpYnV0ZXNbaW5wdXRzXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFyZWEuc2V0QXR0cmlidXRlKGF0dHIsIHRoaXMuYXR0cmlidXRlc1tpbnB1dHNdW2F0dHJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaWQgPSBpbnB1dHM7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdTdWJtaXQnKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHN1Ym1pdEJ1dHRvbiwgdGhpcy5hdHRyaWJ1dGVzW2lucHV0c10pO1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b25UZXh0KTtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3JtV3JhcHBlci5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtV3JhcHBlcik7XG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudDtcbiAgICB9LFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnZnVsbCBuYW1lJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICB9LFxuICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgaWQ6ICdlbWFpbCcsXG4gICAgICAgICAgICBuYW1lOiAnZW1haWwnLFxuICAgICAgICAgICAgdHlwZTogJ2VtYWlsJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnZW1haWxAYWRkcmVzcy5jb20nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIHBob25lOiB7XG4gICAgICAgICAgICBpZDogJ3Bob25lJyxcbiAgICAgICAgICAgIG5hbWU6ICdwaG9uZScsXG4gICAgICAgICAgICB0eXBlOiAndGVsJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnWFhYLVhYWC1YWFhYJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICBpZDogJ21lc3NhZ2UnLFxuICAgICAgICAgICAgbmFtZTogJ21lc3NhZ2UnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICd5b3VyIG1lc3NhZ2UgaGVyZSAoNTAwIGNoYXJhY3RlcnMgbWF4KScsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0OiB7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgfSxcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb290ZXIoKSB7XG4gICAgY29uc3QgZm9vdGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuXG4gICAgY29uc3QgZm9vdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZm9vdGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgZm9vdGVySGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICBjb25zdCBmb290ZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1BsYWNlaG9sZGVyJyk7XG4gICAgXG4gICAgZm9vdGVySGVhZGVyLmFwcGVuZENoaWxkKGZvb3RlclRleHQpO1xuICAgIGZvb3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXJIZWFkZXIpO1xuICAgIGZvb3RlcldyYXBwZXIuYXBwZW5kQ2hpbGQoZm9vdGVyQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyV3JhcHBlcik7XG59IiwiaW1wb3J0IGltcG9ydEFsbCBmcm9tICcuL2ltYWdlcy5qcyc7XG5cbmNvbnN0IGFzc2V0cyA9IHtcbiAgICBpY29uczogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vYXNzZXRzL2ljb25zLycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbiAgICBnaXRodWI6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9naXRodWItbWFyaycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbiAgICBpbWFnZXM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pbWFnZXMvJywgZmFsc2UsIC9cXC5qcGckLykpLFxufVxuXG5jb25zdCBuYXZMaW5rcyA9IFsnaG9tZScsICdhYm91dCcsICdtZW51JywgJ2NvbnRhY3QnLCAnZ2l0aHViLW1hcmsuc3ZnJ107XG4vLyBhc3NldHMuZ2l0aHViLmltYWdlc1snZ2l0aHViLW1hcmsuc3ZnJ11cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIZWFkZXIoKSB7XG4gICAgY29uc29sZS5sb2coYG5hdmJhci5qcyBydW5uaW5nYCk7IC8vZm9yIGRlYnVnZ2luZ1xuICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBoZXJvV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3QgaGVyb1RleHRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVyb1RleHRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hlcm8tdGV4dCcpO1xuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRpbmdUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYEV4aWxlJ3MgUGl6emFgKTtcbiAgICBoZXJvV3JhcHBlci5pZCA9ICdoZXJvJztcblxuICAgIGNvbnN0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZXJvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgaGVyb1RleHRXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICAgIGhlcm9XcmFwcGVyLmFwcGVuZENoaWxkKGhlcm9Db250YWluZXIpO1xuICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQoaGVhZGluZ1RleHQpO1xuICAgIGhlcm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaGVyb1RleHRXcmFwcGVyKTtcbiAgICBoZXJvQ29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlQ2Fyb3VzZWwucmVuZGVyKCkpO1xuICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVyb1dyYXBwZXIpO1xuXG4gICAgaGVhZGVyRWxlbWVudC5pbnNlcnRCZWZvcmUobmF2LnJlbmRlcigpLCBoZXJvV3JhcHBlcik7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoaGVhZGVyRWxlbWVudCwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcbn1cblxuY29uc3QgbmF2ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICAgICAgY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgbmF2RWxlbWVudC5pZCA9ICduYXZiYXInO1xuICAgICAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IG5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBuYXZMaXN0LmNsYXNzTGlzdC5hZGQoJ2xpbmtzJyk7XG5cbiAgICAgICAgbmF2TGlua3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgbGV0IGhyZWY7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lO1xuICAgIFxuICAgICAgICAgICAgaWYgKGl0ZW0uaW5jbHVkZXMoJ3N2ZycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgICAgICAgICAgIGdpdGh1Ykljb24uc3JjID0gYXNzZXRzLmdpdGh1Yi5pbWFnZXNbaXRlbV07XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGdpdGh1Ykljb24pO1xuICAgICAgICAgICAgICAgIGhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL21pa2V5Q29zL3RoZU9kaW5Qcm9qZWN0L3RyZWUvbWFpbi9qYXZhU2NyaXB0L3Byb2plY3RzL3Jlc3RhdXJhbnQtcGFnZSc7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2dpdGh1Yic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKG5hdkl0ZW1UZXh0KTtcbiAgICAgICAgICAgICAgICBocmVmID0gYCMke2l0ZW19YDtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5jaG9yLmhyZWYgPSBocmVmO1xuICAgICAgICAgICAgYW5jaG9yLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgbmF2SXRlbS5hcHBlbmRDaGlsZChhbmNob3IpO1xuICAgICAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZJdGVtKTtcbiAgICAgICAgfSlcblxuXG4gICAgICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9nby5pZCA9ICdsb2dvJztcbiAgICAgICAgY29uc3QgbG9nb0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGNvbnN0IGxvZ29MaW5rVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBFeGlsZSdzIFBpenphYCk7XG4gICAgICAgIGxvZ29MaW5rLmFwcGVuZENoaWxkKGxvZ29MaW5rVGV4dCk7XG4gICAgICAgIGxvZ28uYXBwZW5kQ2hpbGQobG9nb0xpbmspO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG5cbiAgICAgICAgY29uc3QgbmF2TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuYXZNZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgZmFsc2UpO1xuICAgICAgICBjb25zdCBuYXZNZW51SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIG5hdk1lbnVJbWcuc3JjID0gYXNzZXRzLmljb25zLmltYWdlc1snbWVudS5zdmcnXTtcbiAgICAgICAgbmF2TWVudS5hcHBlbmRDaGlsZChuYXZNZW51SW1nKTtcbiAgICAgICAgbmF2TWVudS5jbGFzc0xpc3QuYWRkKCdidG4tbWVudScpO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobmF2TWVudSk7XG5cbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5hdkxpc3QpO1xuICAgICAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY2FjaGVET00obmF2TWVudSwgbmF2TGlzdCk7XG4gICAgICAgIHRoaXMuZ2V0V2luZG93V2lkdGgoKTtcbiAgICAgICAgdGhpcy53YXRjaFNjcmVlbigpO1xuICAgICAgICByZXR1cm4gbmF2RWxlbWVudDtcbiAgICB9LFxuICAgIHdhdGNoU2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nZXRXaW5kb3dXaWR0aCA9IHRoaXMuZ2V0V2luZG93V2lkdGguYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZ2V0V2luZG93V2lkdGgpO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGJ0biwgdWwpIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidG47XG4gICAgICAgIHRoaXMubWVudSA9IHVsO1xuICAgICAgICB0aGlzLnRvZ2dsZU1lbnUgPSB0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICByZW1vdmVFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICB0b2dnbGVNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGlzUHJlc3NlZCA9IEpTT04ucGFyc2UodGhpcy5idXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnKSkgPT0gdHJ1ZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5idXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAhaXNQcmVzc2VkKTtcbiAgICAgICAgaXNQcmVzc2VkID8gdGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpIDogdGhpcy5tZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0sXG4gICAgZ2V0V2luZG93V2lkdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfSxcbn1cblxuLy9pbWFnZXMgc2xpZGVzaG93XG5jb25zdCBpbWFnZUNhcm91c2VsID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNhcm91c2VsV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXJvdXNlbFdyYXBwZXIuaWQgPSAnY2Fyb3VzZWwnO1xuICAgICAgICBjb25zdCBjYXJvdXNlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBjYXJvdXNlbEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2Fyb3VzZWxJdGVtLmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLWl0ZW0nKTtcblxuICAgICAgICBjb25zdCBjYXJvdXNlbEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBjYXJvdXNlbEltZy5zcmMgPSBhc3NldHMuaW1hZ2VzLmltYWdlc1sncGl6emEwLmpwZyddO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uQmFjay5jbGFzc0xpc3QuYWRkKCdidG4tY2Fyb3VzZWwnLCAnYmFjaycpO1xuICAgICAgICBjb25zdCBpbWFnZUJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2VCYWNrLnNyYyA9IGFzc2V0cy5pY29ucy5pbWFnZXNbJ2NoZXZyb25fbGVmdC5zdmcnXTtcbiAgICAgICAgYnV0dG9uQmFjay5hcHBlbmRDaGlsZChpbWFnZUJhY2spO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkZvcndhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uRm9yd2FyZC5jbGFzc0xpc3QuYWRkKCdidG4tY2Fyb3VzZWwnLCAnZm9yd2FyZCcpO1xuICAgICAgICBjb25zdCBpbWFnZUZvcndhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2VGb3J3YXJkLnNyYyA9IGFzc2V0cy5pY29ucy5pbWFnZXNbJ2NoZXZyb25fcmlnaHQuc3ZnJ107XG4gICAgICAgIGJ1dHRvbkZvcndhcmQuYXBwZW5kQ2hpbGQoaW1hZ2VGb3J3YXJkKTtcbiAgICAgICAgdGhpcy5jYWNoZURPTShjYXJvdXNlbEltZywgYnV0dG9uQmFjaywgYnV0dG9uRm9yd2FyZCk7XG5cbiAgICAgICAgY2Fyb3VzZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uQmFjayk7XG4gICAgICAgIGNhcm91c2VsQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkZvcndhcmQpO1xuXG4gICAgICAgIGNhcm91c2VsSXRlbS5hcHBlbmRDaGlsZChjYXJvdXNlbEltZyk7XG4gICAgICAgIGNhcm91c2VsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcm91c2VsSXRlbSk7XG4gICAgICAgIGNhcm91c2VsV3JhcHBlci5hcHBlbmRDaGlsZChjYXJvdXNlbENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICByZXR1cm4gY2Fyb3VzZWxXcmFwcGVyO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGltYWdlLCAuLi5idXR0b25zKSB7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxJbWcgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNoYW5nZUltYWdlID0gdGhpcy5jaGFuZ2VJbWFnZS5iaW5kKHRoaXMpO1xuICAgICAgICBbLi4udGhpcy5idXR0b25zXS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNoYW5nZUltYWdlKSk7XG4gICAgfSxcbiAgICBjaGFuZ2VJbWFnZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgY2hhbmdlSW1hZ2UgcnVubmluZ2ApO1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKVsxXTtcbiAgICAgICAgbGV0IGltYWdlSW5kZXg7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhc3NldHMuaW1hZ2VzLmltYWdlcykge1xuICAgICAgICAgICAgaWYgKGFzc2V0cy5pbWFnZXMuaW1hZ2VzW2tleV0gPT09IHRoaXMuY2Fyb3VzZWxJbWcuc3JjKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VJbmRleCA9IE9iamVjdC5rZXlzKGFzc2V0cy5pbWFnZXMuaW1hZ2VzKS5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3SW5kZXg7ICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgICAgICAgICBpZiAoaW1hZ2VJbmRleCA8IE9iamVjdC5rZXlzKGFzc2V0cy5pbWFnZXMuaW1hZ2VzKS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpbWFnZUluZGV4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGltYWdlSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpbWFnZUluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBPYmplY3Qua2V5cyhhc3NldHMuaW1hZ2VzLmltYWdlcykubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxJbWcuc3JjID0gYXNzZXRzLmltYWdlcy5pbWFnZXNbT2JqZWN0LmtleXMoYXNzZXRzLmltYWdlcy5pbWFnZXMpW25ld0luZGV4XV07XG4gICAgfSxcbn0iLCJpbXBvcnQgJy4uL3N0eWxlcy9ob21lLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG9tZSgpIHtcbiAgICBjb25zb2xlLmxvZygnYnVpbGRIb21lIHJ1bm5pbmcnKTtcbiAgICBjb25zdCBob21lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaG9tZUNvbnRhaW5lci5pZCA9ICdob21lJztcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdTdGlsbCBzYW5lPycpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0ZW1lbnQucmVuZGVyKCkpO1xuICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQob3BlbkhvdXJzLnJlbmRlcigpKTtcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvY2F0aW9uLnJlbmRlcigpKTtcbiAgICByZXR1cm4gaG9tZUNvbnRhaW5lcjtcbn1cblxuLy9taXNzaW9uL3dlbGNvbWUgc3RhdGVtZW50XG5jb25zdCBzdGF0ZW1lbnQgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc3RhdGVtZW50V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGF0ZW1lbnRXcmFwcGVyLmlkID0gJ3N0YXRlbWVudCc7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXRlbWVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGF0ZW1lbnRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBjb25zdCBzdGF0ZW1lbnRIZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1BsYWNlaG9sZGVyJyk7XG4gICAgICAgIHN0YXRlbWVudEhlYWRlci5hcHBlbmRDaGlsZChzdGF0ZW1lbnRIZWFkZXJUZXh0KTtcblxuICAgICAgICBjb25zdCBzdGF0ZW1lbnRQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlbWVudFBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIElkIG5pYmggdG9ydG9yIGlkIGFsaXF1ZXQgbGVjdHVzIHByb2luLiBFbmltIGRpYW0gdnVscHV0YXRlIHV0IHBoYXJldHJhIHNpdCBhbWV0LiBWZWwgdHVycGlzIG51bmMgZWdldCBsb3JlbS4nKTtcbiAgICAgICAgc3RhdGVtZW50UGFyYWdyYXBoLmFwcGVuZENoaWxkKHN0YXRlbWVudFBhcmFncmFwaFRleHQpO1xuXG4gICAgICAgIHN0YXRlbWVudENvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0ZW1lbnRIZWFkZXIpO1xuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50UGFyYWdyYXBoKTtcbiAgICAgICAgc3RhdGVtZW50V3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZW1lbnRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBzdGF0ZW1lbnRXcmFwcGVyO1xuICAgIH0sXG59XG5cbi8vaG91cnMgb2Ygb3BlcmF0aW9uXG5jb25zdCBvcGVuSG91cnMgPSB7XG4gICAgaG91cnM6IHtcbiAgICAgICAgTW9uZGF5OiAnOUFNIC0gOVBNJyxcbiAgICAgICAgVHVlc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFdlZG5lc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFRodXJzZGF5OiAnOUFNIC0gOVBNJyxcbiAgICAgICAgRnJpZGF5OiAnOUFNIC0gOVBNJyxcbiAgICAgICAgU2F0dXJkYXk6ICcxMEFNIC0gMTBQTScsXG4gICAgICAgIFN1bmRheTogJ0Nsb3NlZCdcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGhvdXJzV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3Vyc1dyYXBwZXIuaWQgPSAnaG91cnMnO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgaG91cnNIZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0hvdXJzJyk7XG4gICAgICAgIGhvdXJzSGVhZGVyLmFwcGVuZENoaWxkKGhvdXJzSGVhZGVyVGV4dCk7XG5cbiAgICAgICAgY29uc3QgaG91cnNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuaG91cnMpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgbGV0IGRheVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShrZXkpO1xuICAgICAgICAgICAgZGF5LmFwcGVuZENoaWxkKGRheVRleHQpO1xuICAgICAgICAgICAgaG91cnNMaXN0LmFwcGVuZENoaWxkKGRheSk7XG5cbiAgICAgICAgICAgIGxldCBob3VycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBsZXQgaG91cnNUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5ob3Vyc1trZXldKTtcbiAgICAgICAgICAgIGhvdXJzLmFwcGVuZENoaWxkKGhvdXJzVGV4dCk7XG4gICAgICAgICAgICBob3Vyc0xpc3QuYXBwZW5kQ2hpbGQoaG91cnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaG91cnNXcmFwcGVyLmFwcGVuZENoaWxkKGhvdXJzQ29udGFpbmVyKTtcbiAgICAgICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91cnNIZWFkZXIpO1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZChob3Vyc0xpc3QpO1xuICAgICAgICByZXR1cm4gaG91cnNXcmFwcGVyO1xuICAgIH1cbn1cblxuLy9sb2NhdGlvblxuY29uc3QgbG9jYXRpb24gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvY2F0aW9uV3JhcHBlci5pZCA9ICdsb2NhdGlvbic7XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbkhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQWRkcmVzcycpO1xuICAgICAgICBsb2NhdGlvbkhlYWRlci5hcHBlbmRDaGlsZChsb2NhdGlvbkhlYWRlclRleHQpO1xuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBsb2NhdGlvblBhcmFncmFwaFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnMTIzNCBOVyBQbGFjaG9sZGVyIFJkLiBTdGF0ZSwgUVEgNTY3ODknKTtcbiAgICAgICAgbG9jYXRpb25QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobG9jYXRpb25QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25IZWFkZXIpO1xuICAgICAgICBsb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvblBhcmFncmFwaCk7XG4gICAgICAgIGxvY2F0aW9uV3JhcHBlci5hcHBlbmRDaGlsZChsb2NhdGlvbkNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uV3JhcHBlcjtcbiAgICB9XG59IiwiLy8gaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9ndWlkZXMvZGVwZW5kZW5jeS1tYW5hZ2VtZW50L1xuLy8gaW1wb3J0cyBhbGwgaW1hZ2VzXG4vLyByZXR1cm5zIGFuIG9iamVjdCBhbmQgYXJyYXkgb2YgaW1hZ2VzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbXBvcnRBbGwocikge1xuICAgIGxldCBpbWFnZXMgPSB7fTtcbiAgICBsZXQgaW1hZ2VzQXJyID0gW11cbiAgICByLmtleXMoKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGltYWdlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgICAgIGltYWdlc0Fyci5wdXNoKGl0ZW0ucmVwbGFjZSgnLi8nLCAnJykpO1xuICAgIH0pO1xuICAgIHJldHVybiB7IGltYWdlcywgaW1hZ2VzQXJyIH07XG59IiwiaW1wb3J0ICcuLi9zdHlsZXMvbWVudS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1lbnUoKSB7XG4gICAgY29uc29sZS5sb2coYG1lbnUuanMgcnVubmluZ2ApO1xuICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51Q29udGFpbmVyLmlkID0gJ21lbnUnO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ01lbnUnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgbWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgbWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZW51LnJlbmRlcigpKTtcbiAgICByZXR1cm4gbWVudUNvbnRhaW5lcjtcbn1cblxuY29uc3QgZm9vZCA9IChkaXNoLCBkZXRhaWxzLCBwcmljZSkgPT4ge1xuICAgIGNvbnN0IGZvb2ROYW1lID0gZGlzaDtcbiAgICBjb25zdCBmb29kRGV0YWlscyA9IGRldGFpbHM7XG4gICAgY29uc3QgZm9vZFByaWNlID0gcHJpY2U7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGRpc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZE5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBkZXRhaWxzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvb2REZXRhaWxzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcHJpY2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZFByaWNlO1xuICAgICAgICB9LFxuICAgIH1cbn1cblxuY29uc3QgbWVudSA9IHtcbiAgICB0ZXN0OiAndGVzdCcsXG4gICAgZm9vZDoge1xuICAgICAgICBwaXp6YXM6IFtcbiAgICAgICAgICAgIGZvb2QoJ3Job2EnLCAndG9tYXRvIHNhdWNlLCBtb3p6YXJlbGxhLCBvcmVnYW5vLCByb2FzdGVkIHJob2EnLCAnMTUuMDAnKSxcbiAgICAgICAgICAgIGZvb2QoJ3BlcHBlcm9uaScsICd0b21hdG8gc2F1Y2UsIG1venphcmVsbGEsIG9yZWdhbm8sIHBlcHBlcm9uaScsICcxMC4wMCcpLFxuICAgICAgICAgICAgZm9vZCgnanVpY3kgb25lJywgJ3JhbmNoIHN1YWNlLCBtb3p6YXJlbGxhLCBwYXJzbGV5LCBCQlEgYmVhc3QnLCAnMTIuMDAnKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2FsYWRzOiBbXG4gICAgICAgICAgICBmb29kKCd3ZXRhJywgJ3JvbWFpbmUgbGV0dHVjZSwgY3VjdW1iZXIsIHN1bmZsb3dlciBzZWVkcywgdG9tYXRvZXMsIHdldGEnLCAnNS4wMCcpLFxuICAgICAgICAgICAgZm9vZCgncGVyYW5kdXMgY3J1bmNoJywgJ2dyZWVuIGNhYmJhZ2UsIGJ1dHRlcmhlYWQgbGV0dHVjZSwgYWxtb25kcywgY3JvdXRvbnMnLCAnOS4wMCcpLFxuICAgICAgICBdLFxuICAgICAgICBkZXNzZXJ0czogW1xuICAgICAgICAgICAgZm9vZChgYWx2YSdzIHNhY3JpZmljZWAsICd2YW5pbGxhIGljZSBjcmVhbSwgQXR6b2F0bCBzeXJ1cCwgd2FsbnV0cycsICc3LjAwJyksXG4gICAgICAgICAgICBmb29kKCd0aGUgZGVsdmUgYmFyJywgJ2F6dXJpdGUsIG9yZW9zLCBkYXJrIGNob2NvbGF0ZSBjaGlwcywgYWxtb25kcycsICc2LjAwJyksXG4gICAgICAgIF0sXG4gICAgICAgIGFwcGV0aXplcnM6IFtcbiAgICAgICAgICAgIGZvb2QoJ2JyZWFkc3RpY2snLCBudWxsLCcyLjAwJyksXG4gICAgICAgICAgICBmb29kKCd3YWZmbGUgZnJpZXMnLCBudWxsLCAnNC45OScpLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9vZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9vZFdyYXBwZXIuaWQgPSAnbWVudS1tYWluJztcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb29kQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5mb29kKSB7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbWVudVNlY3Rpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCgnaDInKSk7XG4gICAgICAgICAgICBjb25zdCBtZW51U2VjdGlvbkhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgIG1lbnVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICBtZW51U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChtZW51U2VjdGlvbkhlYWRlclRleHQpO1xuICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudVNlY3Rpb25IZWFkZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmZvb2RbaXRlbV0ubWFwKGZvb2QgPT4geyBcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmZvIGluIGZvb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvb2RbaW5mb10gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVJdGVtUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobWVudUl0ZW1QYXJhZ3JhcGhUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVJdGVtUGFyYWdyYXBoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8gPT09ICdwcmljZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNlbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGhUZXh0Lm5vZGVWYWx1ZSA9IGZvb2RbaW5mb10uc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51SXRlbUNlbnRzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvb2RbaW5mb10uc3BsaXQoJy4nKVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1DZW50cy5hcHBlbmRDaGlsZChtZW51SXRlbUNlbnRzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1QYXJhZ3JhcGguYXBwZW5kQ2hpbGQobWVudUl0ZW1DZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWVudVNlY3Rpb24uYXBwZW5kQ2hpbGQobWVudUl0ZW1Db250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb29kQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVTZWN0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGZvb2RXcmFwcGVyLmFwcGVuZENoaWxkKGZvb2RDb250YWluZXIpO1xuICAgICAgICByZXR1cm4gZm9vZFdyYXBwZXI7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==