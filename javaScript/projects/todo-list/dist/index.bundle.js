(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/app.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/app.css ***!
  \***********************************************************/
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



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf */ "./src/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
    font-family: 'Bebas Neue';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    /* custom variables */
    --text-color-primary: rgb(32, 32, 32);
}

body {
    min-height: 100vh;
}

#todo_app {
    min-height: inherit;
    display: grid;
    grid-template-rows: min-content 1fr;
}

#content {
    position: relative;
}

#content {
    display: grid;
}

.overlay_main_content {
    pointer-events: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
}

.overlay_main_content.dim {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
}

#main_content {
    flex: 1;
    padding: 5% 5% 0% 5%;
    display: grid;
}

#main_content > :first-child {
    display: grid;
    grid-auto-rows: min-content 1fr;
    justify-self: center;
    width: 100%;
}

/* general styles for similar elements existing on different modules */
button {
    background: transparent;
    border: none;
}

button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
}

@media screen and (min-width:768px) {
    #main_content {
        padding: 5% 10% 0% 10%;
    }

    #main_content > :first-child {
        width: 70%;
    }

    #content {
        position: static;
        display: flex;
    }


}`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;IACI,yBAAyB;IACzB,4CAA2D;AAC/D;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,qBAAqB;IACrB,qCAAqC;AACzC;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,oBAAoB;IACpB,eAAe;IACf,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,OAAO;IACP,oBAAoB;IACpB,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,oBAAoB;IACpB,WAAW;AACf;;AAEA,sEAAsE;AACtE;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI;QACI,sBAAsB;IAC1B;;IAEA;QACI,UAAU;IACd;;IAEA;QACI,gBAAgB;QAChB,aAAa;IACjB;;;AAGJ","sourcesContent":["@font-face {\n    font-family: 'Bebas Neue';\n    src: url('./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf');\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n:root {\n    /* custom variables */\n    --text-color-primary: rgb(32, 32, 32);\n}\n\nbody {\n    min-height: 100vh;\n}\n\n#todo_app {\n    min-height: inherit;\n    display: grid;\n    grid-template-rows: min-content 1fr;\n}\n\n#content {\n    position: relative;\n}\n\n#content {\n    display: grid;\n}\n\n.overlay_main_content {\n    pointer-events: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 0;\n    transition: opacity 200ms ease-in-out;\n}\n\n.overlay_main_content.dim {\n    opacity: 1;\n    transition: opacity 200ms ease-in-out;\n}\n\n#main_content {\n    flex: 1;\n    padding: 5% 5% 0% 5%;\n    display: grid;\n}\n\n#main_content > :first-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n    justify-self: center;\n    width: 100%;\n}\n\n/* general styles for similar elements existing on different modules */\nbutton {\n    background: transparent;\n    border: none;\n}\n\nbutton:hover {\n    cursor: pointer;\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n@media screen and (min-width:768px) {\n    #main_content {\n        padding: 5% 10% 0% 10%;\n    }\n\n    #main_content > :first-child {\n        width: 70%;\n    }\n\n    #content {\n        position: static;\n        display: flex;\n    }\n\n\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/header.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/header.css ***!
  \*********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `header {
    background-color: lightcoral;
}

header > #navbar {
    display: flex;
    justify-content: space-between;
    padding: 0.40rem 0.35rem;
}

header > #navbar > * > .container {
    display: flex;
    column-gap: 0.25rem;
}

header > #navbar > * > .container > * {
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
}

.input_search {
    width: 100%;
    border: none;
}

header > #navbar > * > .container > * > img {
    width: clamp(1.65rem, 4vw, 1.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;IACI,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,wBAAwB;AAC5B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,qBAAqB;AACzB;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,kCAAkC;AACtC","sourcesContent":["header {\n    background-color: lightcoral;\n}\n\nheader > #navbar {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.40rem 0.35rem;\n}\n\nheader > #navbar > * > .container {\n    display: flex;\n    column-gap: 0.25rem;\n}\n\nheader > #navbar > * > .container > * {\n    display: flex;\n    align-items: center;\n    border-radius: 0.2rem;\n}\n\n.input_search {\n    width: 100%;\n    border: none;\n}\n\nheader > #navbar > * > .container > * > img {\n    width: clamp(1.65rem, 4vw, 1.5rem);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/projects.css ***!
  \***********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `/* styles for list of projects on the content section */
/* #main_content > div > div > .nav_projects > .btn_add_project {
    
} */

.projects >:last-child {
    display: grid;
    grid-auto-rows: min-content 1fr;
}

.projects >:last-child > .nav_projects {
    justify-self: end;
}

.projects >:last-child > .nav_projects > .btn_add_project {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    justify-items: flex-start;
    min-width: 100%;
}`, "",{"version":3,"sources":["webpack://./src/styles/projects.css"],"names":[],"mappings":"AAAA,uDAAuD;AACvD;;GAEG;;AAEH;IACI,aAAa;IACb,+BAA+B;AACnC;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,sCAAsC;IACtC,mBAAmB;IACnB,yBAAyB;IACzB,eAAe;AACnB","sourcesContent":["/* styles for list of projects on the content section */\n/* #main_content > div > div > .nav_projects > .btn_add_project {\n    \n} */\n\n.projects >:last-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n}\n\n.projects >:last-child > .nav_projects {\n    justify-self: end;\n}\n\n.projects >:last-child > .nav_projects > .btn_add_project {\n    display: grid;\n    grid-template-columns: min-content 1fr;\n    align-items: center;\n    justify-items: flex-start;\n    min-width: 100%;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_form.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/projects_form.css ***!
  \****************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `#form_project {
    margin: auto;
    min-width: 70vw;
    min-height: 50vh;
    border-radius: 0.75rem;
    border: none;
}

#form_project::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

#form_project > #form {
    padding: 1rem;
    display: grid;
    grid-template-areas: 
        'head head'
        'input input'
        '. buttons'
    ;
    position: relative;
    min-width: inherit;
    min-height: inherit;
    grid-auto-rows: min-content;
}

/* impacts form_item for tasks_form */
.form_item {
    grid-area: input;
    display: grid;
}

.form_buttons {
    grid-area: buttons;
    justify-self: end;
}

`, "",{"version":3,"sources":["webpack://./src/styles/projects_form.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,eAAe;IACf,gBAAgB;IAChB,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,aAAa;IACb;;;;IAIA;IACA,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;IACnB,2BAA2B;AAC/B;;AAEA,qCAAqC;AACrC;IACI,gBAAgB;IAChB,aAAa;AACjB;;AAEA;IACI,kBAAkB;IAClB,iBAAiB;AACrB","sourcesContent":["#form_project {\n    margin: auto;\n    min-width: 70vw;\n    min-height: 50vh;\n    border-radius: 0.75rem;\n    border: none;\n}\n\n#form_project::backdrop {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n#form_project > #form {\n    padding: 1rem;\n    display: grid;\n    grid-template-areas: \n        'head head'\n        'input input'\n        '. buttons'\n    ;\n    position: relative;\n    min-width: inherit;\n    min-height: inherit;\n    grid-auto-rows: min-content;\n}\n\n/* impacts form_item for tasks_form */\n.form_item {\n    grid-area: input;\n    display: grid;\n}\n\n.form_buttons {\n    grid-area: buttons;\n    justify-self: end;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_list.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/projects_list.css ***!
  \****************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `.projects_list > * {
    /* display: grid; */
    display: flex;
    flex-direction: column;
    list-style: none;
}

.projects_list > * > * {
    display: flex;
    border-radius: 0.75rem;
    align-items: center;
}

.projects_list > * > li:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.projects_list > * > li:hover span {
    visibility: visible;
}

.projects_list > * > * > span {
    visibility: hidden;
}

.projects_list > * > * > .nav_project {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.5rem 1rem;
}

.projects_list > * > * > .nav_project > span {
    flex: 1;
}

.btn_add_project,
.btn_delete_project {
    /* display: grid;
    background: transparent;
    border: none; */
}

.nav_project > img {
    width: clamp(1.15rem, 4vw, 1.5rem);
    justify-self: center;
}

.btn_add_project > img,
.btn_add_project > .btn_img_wrapper > img,
.btn_delete_project > img {
    width: clamp(1.45rem, 4vw, 1.5rem);
}

.btn_add_project {
    /* display: grid; */
    /* grid-template-columns: min-content 1fr; */
    /* align-items: center; */
}`, "",{"version":3,"sources":["webpack://./src/styles/projects_list.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;IACnB,aAAa;IACb,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,oBAAoB;AACxB;;AAEA;IACI,OAAO;AACX;;AAEA;;IAEI;;mBAEe;AACnB;;AAEA;IACI,kCAAkC;IAClC,oBAAoB;AACxB;;AAEA;;;IAGI,kCAAkC;AACtC;;AAEA;IACI,mBAAmB;IACnB,4CAA4C;IAC5C,yBAAyB;AAC7B","sourcesContent":[".projects_list > * {\n    /* display: grid; */\n    display: flex;\n    flex-direction: column;\n    list-style: none;\n}\n\n.projects_list > * > * {\n    display: flex;\n    border-radius: 0.75rem;\n    align-items: center;\n}\n\n.projects_list > * > li:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\n\n.projects_list > * > li:hover span {\n    visibility: visible;\n}\n\n.projects_list > * > * > span {\n    visibility: hidden;\n}\n\n.projects_list > * > * > .nav_project {\n    display: flex;\n    align-items: center;\n    flex: 1;\n    padding: 0.5rem 1rem;\n}\n\n.projects_list > * > * > .nav_project > span {\n    flex: 1;\n}\n\n.btn_add_project,\n.btn_delete_project {\n    /* display: grid;\n    background: transparent;\n    border: none; */\n}\n\n.nav_project > img {\n    width: clamp(1.15rem, 4vw, 1.5rem);\n    justify-self: center;\n}\n\n.btn_add_project > img,\n.btn_add_project > .btn_img_wrapper > img,\n.btn_delete_project > img {\n    width: clamp(1.45rem, 4vw, 1.5rem);\n}\n\n.btn_add_project {\n    /* display: grid; */\n    /* grid-template-columns: min-content 1fr; */\n    /* align-items: center; */\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/sidebar.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/sidebar.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `#sidebar {
    height: 100%;
    width: 100%;
    /* z-index: 1; */
    position: absolute;
    visibility: hidden;
}

#sidebar.hide {
    visibility: hidden;
    transform: translateX(-100%);
    transition: all 300ms ease-in-out;
}

#sidebar.show {
    visibility: visible;
    transform: translateX(0%);
    transition: transform 300ms ease-in-out;
}

#sidebar > .container {
    height: inherit;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 1.25rem;
    background-color: rgb(245, 245, 245);
    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);
    width: 65%;
}

.nav_project,
.nav_projects {
    text-decoration: none;
    column-gap: 0.75rem;
}

#projects_container > *:first-child {
    display: flex;
    align-items: center;
}

#projects_container > *:first-child > .nav_projects {
    flex: 1;
    padding: 0.5rem 1rem;
}

#projects_container > *:first-child {
    border-radius: 0.75rem;
}

#projects_container > *:first-child:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

#sidebar > .container:hover .btn_add_project {
    visibility: visible;
}

#projects_container > *:first-child > .btn_add_project {
    visibility: hidden;
    justify-self: end;
}

@media screen and (min-width:768px) {
    #sidebar {
        visibility: visible;
        position: static;
        width: inherit;
    }

    #sidebar.show {
        width: 30%;
        display: block;
        animation: slide-in-right 300ms ease-in-out;
    }

    #sidebar.hide {
        display: none;
    }

    #sidebar > .container {
        width: 100%;
        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);
    }
}

@keyframes slide-in-right {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/sidebar.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,WAAW;IACX,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,4BAA4B;IAC5B,iCAAiC;AACrC;;AAEA;IACI,mBAAmB;IACnB,yBAAyB;IACzB,uCAAuC;AAC3C;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,oCAAoC;IACpC,6CAA6C;IAC7C,UAAU;AACd;;AAEA;;IAEI,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,OAAO;IACP,oBAAoB;AACxB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,iBAAiB;AACrB;;AAEA;IACI;QACI,mBAAmB;QACnB,gBAAgB;QAChB,cAAc;IAClB;;IAEA;QACI,UAAU;QACV,cAAc;QACd,2CAA2C;IAC/C;;IAEA;QACI,aAAa;IACjB;;IAEA;QACI,WAAW;QACX,6CAA6C;IACjD;AACJ;;AAEA;IACI;QACI,4BAA4B;IAChC;;IAEA;QACI,yBAAyB;IAC7B;AACJ","sourcesContent":["#sidebar {\n    height: 100%;\n    width: 100%;\n    /* z-index: 1; */\n    position: absolute;\n    visibility: hidden;\n}\n\n#sidebar.hide {\n    visibility: hidden;\n    transform: translateX(-100%);\n    transition: all 300ms ease-in-out;\n}\n\n#sidebar.show {\n    visibility: visible;\n    transform: translateX(0%);\n    transition: transform 300ms ease-in-out;\n}\n\n#sidebar > .container {\n    height: inherit;\n    display: flex;\n    flex-direction: column;\n    row-gap: 1rem;\n    padding: 1.25rem;\n    background-color: rgb(245, 245, 245);\n    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    width: 65%;\n}\n\n.nav_project,\n.nav_projects {\n    text-decoration: none;\n    column-gap: 0.75rem;\n}\n\n#projects_container > *:first-child {\n    display: flex;\n    align-items: center;\n}\n\n#projects_container > *:first-child > .nav_projects {\n    flex: 1;\n    padding: 0.5rem 1rem;\n}\n\n#projects_container > *:first-child {\n    border-radius: 0.75rem;\n}\n\n#projects_container > *:first-child:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\n\n#sidebar > .container:hover .btn_add_project {\n    visibility: visible;\n}\n\n#projects_container > *:first-child > .btn_add_project {\n    visibility: hidden;\n    justify-self: end;\n}\n\n@media screen and (min-width:768px) {\n    #sidebar {\n        visibility: visible;\n        position: static;\n        width: inherit;\n    }\n\n    #sidebar.show {\n        width: 30%;\n        display: block;\n        animation: slide-in-right 300ms ease-in-out;\n    }\n\n    #sidebar.hide {\n        display: none;\n    }\n\n    #sidebar > .container {\n        width: 100%;\n        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    }\n}\n\n@keyframes slide-in-right {\n    0% {\n        transform: translateX(-100%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_form.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_form.css ***!
  \*************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `#modal::backdrop  {
    background-color: rgba(0, 0, 0, 0.5);
}

#modal {
    margin: auto;
    min-width: 70vw;
    min-height: 50vh;
    border-radius: 0.75rem;
    border: none;
}

#modal .form_task.modal {
    padding: 1rem;
    display: grid;
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_form.css"],"names":[],"mappings":"AAAA;IACI,oCAAoC;AACxC;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,gBAAgB;IAChB,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,aAAa;AACjB","sourcesContent":["#modal::backdrop  {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n#modal {\n    margin: auto;\n    min-width: 70vw;\n    min-height: 50vh;\n    border-radius: 0.75rem;\n    border: none;\n}\n\n#modal .form_task.modal {\n    padding: 1rem;\n    display: grid;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_list.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_list.css ***!
  \*************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `
.tasks_list {
    /* width: 60%; */
}

.tasks_list > :first-child {
    row-gap: 1rem;
}

.tasks_list > :first-child {
    display: flex;
    flex-direction: column;
    flex: 1;
    list-style: none;
}

div[role=button]:hover {
    cursor: pointer;
}

.task_list_item > .container {
    display: flex;
    border-bottom: 2px solid rgba(66, 66, 66, 0.5);
    padding: 1rem 0.25rem;
    column-gap: 0.5rem;
}

.task_list_item > .container > .btn_radio_task,
.task_actions > *,
.task_list_item > .container > .task_list_item_content > .task_due_date_time > * {
    /* border: 2px solid black; */
}

.btn_radio_task {
    display: flex;
}

.task_list_item_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 0.15rem;
}

.task_list_item_content > .task_name {
    margin-bottom: 0.5rem;
}

div[role=button]:hover .task_actions{
    visibility: visible;
}

.task_actions {
    display: flex;
    align-items: flex-start;
    visibility: hidden;
}

.btn_date_task {
    display: flex;
    align-items: center;
}

.priority_1 {
    /* background-color: #ffa500; */
}

.priority_2 {

}

.priority_3 {

}

.btn_add_task {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    justify-items: flex-start;
}

.btn_add_task > .btn_img_wrapper {
    display: flex;
}

.btn_add_task > .btn_img_wrapper > img {
    width: clamp(1.45rem, 4vw, 1.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_list.css"],"names":[],"mappings":";AACA;IACI,gBAAgB;AACpB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8CAA8C;IAC9C,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;;;IAGI,6BAA6B;AACjC;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,OAAO;IACP,aAAa;IACb,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,+BAA+B;AACnC;;AAEA;;AAEA;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sCAAsC;IACtC,mBAAmB;IACnB,yBAAyB;AAC7B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,kCAAkC;AACtC","sourcesContent":["\n.tasks_list {\n    /* width: 60%; */\n}\n\n.tasks_list > :first-child {\n    row-gap: 1rem;\n}\n\n.tasks_list > :first-child {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    list-style: none;\n}\n\ndiv[role=button]:hover {\n    cursor: pointer;\n}\n\n.task_list_item > .container {\n    display: flex;\n    border-bottom: 2px solid rgba(66, 66, 66, 0.5);\n    padding: 1rem 0.25rem;\n    column-gap: 0.5rem;\n}\n\n.task_list_item > .container > .btn_radio_task,\n.task_actions > *,\n.task_list_item > .container > .task_list_item_content > .task_due_date_time > * {\n    /* border: 2px solid black; */\n}\n\n.btn_radio_task {\n    display: flex;\n}\n\n.task_list_item_content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.15rem;\n}\n\n.task_list_item_content > .task_name {\n    margin-bottom: 0.5rem;\n}\n\ndiv[role=button]:hover .task_actions{\n    visibility: visible;\n}\n\n.task_actions {\n    display: flex;\n    align-items: flex-start;\n    visibility: hidden;\n}\n\n.btn_date_task {\n    display: flex;\n    align-items: center;\n}\n\n.priority_1 {\n    /* background-color: #ffa500; */\n}\n\n.priority_2 {\n\n}\n\n.priority_3 {\n\n}\n\n.btn_add_task {\n    display: grid;\n    grid-template-columns: min-content 1fr;\n    align-items: center;\n    justify-items: flex-start;\n}\n\n.btn_add_task > .btn_img_wrapper {\n    display: flex;\n}\n\n.btn_add_task > .btn_img_wrapper > img {\n    width: clamp(1.45rem, 4vw, 1.5rem);\n}"],"sourceRoot":""}]);
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

/***/ "./src/app.css":
/*!*********************!*\
  !*** ./src/app.css ***!
  \*********************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/app.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/header.css":
/*!*******************************!*\
  !*** ./src/styles/header.css ***!
  \*******************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./header.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/header.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/projects.css":
/*!*********************************!*\
  !*** ./src/styles/projects.css ***!
  \*********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./projects.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/projects_form.css":
/*!**************************************!*\
  !*** ./src/styles/projects_form.css ***!
  \**************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./projects_form.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_form.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/projects_list.css":
/*!**************************************!*\
  !*** ./src/styles/projects_list.css ***!
  \**************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./projects_list.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_list.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/sidebar.css":
/*!********************************!*\
  !*** ./src/styles/sidebar.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./sidebar.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/sidebar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tasks_form.css":
/*!***********************************!*\
  !*** ./src/styles/tasks_form.css ***!
  \***********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tasks_form.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_form.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tasks_list.css":
/*!***********************************!*\
  !*** ./src/styles/tasks_list.css ***!
  \***********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tasks_list.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_list.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/header */ "./src/components/header.js");
/* harmony import */ var _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/sidebar/sidebar */ "./src/components/sidebar/sidebar.js");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main */ "./src/components/main.js");
/* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/storage */ "./src/storage/storage.js");
/* harmony import */ var _components_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/overlay */ "./src/components/overlay.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.css */ "./src/app.css");







const appController = (function() {
    const build = {
        header: _components_header__WEBPACK_IMPORTED_MODULE_0__["default"],
        sidebar: _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_1__["default"],
        overlay: _components_overlay__WEBPACK_IMPORTED_MODULE_4__["default"],
        main: _components_main__WEBPACK_IMPORTED_MODULE_2__["default"],
    }

    const app = {
        init: function() {
            ;(0,_storage_storage__WEBPACK_IMPORTED_MODULE_3__.setProjects)();
            this.render();
        },
        cacheDOM: function() {

        },
        render: function() {
            const appWrapper = document.createElement('div');
            const appContent = document.createElement('div');
            appWrapper.id = 'todo_app';
            appContent.id = 'content';

            appWrapper.appendChild(build.header());
            appContent.appendChild(build.overlay());
            appContent.appendChild(build.sidebar());
            appContent.appendChild(build.main());
            appWrapper.appendChild(appContent);

            document.body.appendChild(appWrapper);
        },
        bindEvents: function() {

        },
    }

    app.init();
})();

//main
    // 1. view all projects
    // 2. view all todos in each project
    // 3. expand a single todo to see/edit its details
    // 4. delete a todo

    // todo list item
        // create item button
        // renders form
            // title, required
            // description
            // due date
                //renders form
                    // default values
                        // today, tomorrow, no date
                    // calendar
                    // time
                    // cancel and save button
            // project label/tag
            // submit
        // delete
        // complete
        // reorder todo list item
        // change priority
    // create new todo list item

// todo list OBJECT
    // title
    // description
        // subtask
    // reminder
    // due date
    // time
    // prioirty

// webpack external library: date-fns


/***/ }),

/***/ "./src/assets/icons sync recursive \\.svg$":
/*!***************************************!*\
  !*** ./src/assets/icons/ sync \.svg$ ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./add.svg": "./src/assets/icons/add.svg",
	"./check_small.svg": "./src/assets/icons/check_small.svg",
	"./chevron_left.svg": "./src/assets/icons/chevron_left.svg",
	"./chevron_right.svg": "./src/assets/icons/chevron_right.svg",
	"./circle.svg": "./src/assets/icons/circle.svg",
	"./cog.svg": "./src/assets/icons/cog.svg",
	"./date.svg": "./src/assets/icons/date.svg",
	"./delete.svg": "./src/assets/icons/delete.svg",
	"./edit.svg": "./src/assets/icons/edit.svg",
	"./github-mark/github-mark-white.svg": "./src/assets/icons/github-mark/github-mark-white.svg",
	"./github-mark/github-mark.svg": "./src/assets/icons/github-mark/github-mark.svg",
	"./home.svg": "./src/assets/icons/home.svg",
	"./inbox.svg": "./src/assets/icons/inbox.svg",
	"./magnify.svg": "./src/assets/icons/magnify.svg",
	"./menu.svg": "./src/assets/icons/menu.svg",
	"./radio_button_unchecked.svg": "./src/assets/icons/radio_button_unchecked.svg",
	"./today.svg": "./src/assets/icons/today.svg"
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
webpackContext.id = "./src/assets/icons sync recursive \\.svg$";

/***/ }),

/***/ "./src/assets/icons sync \\.svg$":
/*!****************************************************!*\
  !*** ./src/assets/icons/ sync nonrecursive \.svg$ ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./add.svg": "./src/assets/icons/add.svg",
	"./check_small.svg": "./src/assets/icons/check_small.svg",
	"./chevron_left.svg": "./src/assets/icons/chevron_left.svg",
	"./chevron_right.svg": "./src/assets/icons/chevron_right.svg",
	"./circle.svg": "./src/assets/icons/circle.svg",
	"./cog.svg": "./src/assets/icons/cog.svg",
	"./date.svg": "./src/assets/icons/date.svg",
	"./delete.svg": "./src/assets/icons/delete.svg",
	"./edit.svg": "./src/assets/icons/edit.svg",
	"./home.svg": "./src/assets/icons/home.svg",
	"./inbox.svg": "./src/assets/icons/inbox.svg",
	"./magnify.svg": "./src/assets/icons/magnify.svg",
	"./menu.svg": "./src/assets/icons/menu.svg",
	"./radio_button_unchecked.svg": "./src/assets/icons/radio_button_unchecked.svg",
	"./today.svg": "./src/assets/icons/today.svg"
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

/***/ "./src/components/buttons.js":
/*!***********************************!*\
  !*** ./src/components/buttons.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildButton)
/* harmony export */ });
/* harmony import */ var _assets_icons_add_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/add.svg */ "./src/assets/icons/add.svg");
/* harmony import */ var _assets_icons_delete_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/icons/delete.svg */ "./src/assets/icons/delete.svg");
/* harmony import */ var _assets_icons_edit_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/icons/edit.svg */ "./src/assets/icons/edit.svg");
/* harmony import */ var _assets_icons_radio_button_unchecked_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/icons/radio_button_unchecked.svg */ "./src/assets/icons/radio_button_unchecked.svg");
/* harmony import */ var _assets_icons_date_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/date.svg */ "./src/assets/icons/date.svg");
// module that will create buttons
    // add project/task
    // delete project/task
    // edit task
    
    
    
    
    
    // returns a button element to create a project/task
    // if spanText provided, then a span element is created
    const icons = { add: _assets_icons_add_svg__WEBPACK_IMPORTED_MODULE_0__, delete: _assets_icons_delete_svg__WEBPACK_IMPORTED_MODULE_1__, edit: _assets_icons_edit_svg__WEBPACK_IMPORTED_MODULE_2__, radio: _assets_icons_radio_button_unchecked_svg__WEBPACK_IMPORTED_MODULE_3__, date: _assets_icons_date_svg__WEBPACK_IMPORTED_MODULE_4__ };

    function buildButton(type, name, text) {
        const button = Object.assign(document.createElement('button'), buttonAttributes(type, name));    
        const image = new Image();
        image.src = icons[type];
    
        if (text) {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('btn_img_wrapper');
            imageWrapper.appendChild(image);
            const span = document.createElement('span');
            span.textContent = text;
            button.appendChild(imageWrapper);
            button.appendChild(span);
        } else {
            button.appendChild(image);
        }
    
        return button;
    }
    
    const buttonAttributes = (type, name) => {
        const button = {
            // className: btn_delete_project
            className: `btn_${type}_${name}`,
            type: `button`,
        }
        return button;
    }

/***/ }),

/***/ "./src/components/header.js":
/*!**********************************!*\
  !*** ./src/components/header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHeader)
/* harmony export */ });
/* harmony import */ var _utilities_import_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/import-all */ "./src/utilities/import-all.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _styles_header_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/header.css */ "./src/styles/header.css");

 // connect .btn_home to mainContent.switchContent



function buildHeader(app, content) {
    const headerElement = document.createElement('header');
    headerElement.appendChild(header.render());
    header.cacheDOM(headerElement);
    header.bindEvents();
    return headerElement;
}

const assets = {
    icons: (0,_utilities_import_all__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync recursive \\.svg$")),
}

const header = {
    cacheDOM: function(container) {
        this.btnMenu = container.querySelector('.btn_menu');
        this.btnHome = container.querySelector('.btn_home');
        this.btnAddTask = container.querySelector('.btn_add_task');
    },
    bindEvents: function() {
        this.btnMenu.addEventListener('click', this.publish);
        this.btnHome.addEventListener('click', this.publish); // testing
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },
    headerContent: {
        headerLeft: [
            {element: 'button', class: 'btn_menu', childElement: 'img', src: assets.icons.files['menu.svg']},
            {element: 'button', class: 'btn_home', childElement: 'img', src: assets.icons.files['home.svg']},
            {element: 'input', class: 'input_search', placeholder: 'Search'}
        ],
        headerRight: [
            {element: 'button', class: 'btn_add_task', childElement: 'img', src: assets.icons.files['add.svg']},
            // {element: 'button', class: 'bt-settingsn', childElement: 'img, src: null},
            {element: 'a', class: 'github', childElement: 'img', src: assets.icons.files['github-mark/github-mark-white.svg'], href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list', target: '_blank'}
        ],
    },
    render: function() {
        const headerElement = document.createElement('nav');
        headerElement.id = 'navbar';

        for (let section in this.headerContent) {
            const headerWrapper = document.createElement('div');
            const headerContainer = document.createElement('div');
            let wrapperClass;
            section === 'headerLeft' ? wrapperClass = 'nav_left' : wrapperClass = 'nav_right';
            headerWrapper.classList.add(wrapperClass);
            headerContainer.classList.add('container');

            this.headerContent[section].forEach((item) => {
                const headerItem = document.createElement(item.element);
                headerItem.classList.add(item.class);
                if ('placeholder' in item) {
                    headerItem.setAttribute('placeholder', item.placeholder);
                } else {
                    const itemIcon = document.createElement(item.childElement);
                    itemIcon.src = item.src;
                    headerItem.appendChild(itemIcon);
                }
                headerContainer.appendChild(headerItem);
                headerWrapper.appendChild(headerContainer);
            })
            headerElement.appendChild(headerWrapper);
        }
        return headerElement;
    },
    publish: function(e) {
        let className = e.target.parentElement.className;
        let subscriber;
        if (className.includes('home')) {
            subscriber = 'content';
        } else {
            subscriber = 'sidebar'
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__.pubSub.publish(subscriber, e.target.parentElement);
    }
}

/***/ }),

/***/ "./src/components/main.js":
/*!********************************!*\
  !*** ./src/components/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMain),
/* harmony export */   mainContent: () => (/* binding */ mainContent)
/* harmony export */ });
/* harmony import */ var _components_projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/projects */ "./src/components/projects.js");
/* harmony import */ var _components_project_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/project_tasks */ "./src/components/project_tasks.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");





function buildMain() {
    const main = document.createElement('main');
    main.id = 'main_content';
    mainContent.cacheDOM(main);
    mainContent.render();
    mainContent.bindEvents();

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.subscribe('content', mainContent.switchContent);

    return main;
}

const build = {
    projects: _components_projects__WEBPACK_IMPORTED_MODULE_0__["default"],
    project: _components_project_tasks__WEBPACK_IMPORTED_MODULE_1__["default"],
}

const mainContent = {
    activeContent: null,
    activeTab: null,
    cacheDOM: function(container) {
        this.main = container;
        this.mainOverlay = container.querySelector('.overlay_main_content');
    },
    render: function(key, uuid) {
        let content;
        if (!key) {
            content = build['project'](_containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.today[0].uuid);
        } else {
            this.main.lastChild.remove();
            content = build[key](uuid);
        }
        this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        let classSubstring = e.className.includes('delete') ? e.className.substring(e.className.indexOf('_') + 1, e.className.lastIndexOf('_')) : e.className.substring(e.className.lastIndexOf('_') + 1);
        let uuid = e.parentElement.dataset.uuid || e.dataset.inboxUuid;
        let renderKey = Object.keys(build).find(key => key === classSubstring);
        let args = ['project', uuid];

        if (renderKey && uuid) {
            // renders respective project
            this.setActiveTab(e);
            args[0] = renderKey;
        } else if (!renderKey && !uuid) {
            // if home button is clicked
                // renders the today section
            args[1] = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.today[0].uuid;
        } else if (classSubstring === 'delete') {
            // if a project is the content and is deleted,
                // renders the inbox section
            args[1] = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.inbox[0].uuid;
        } else {
            this.setActiveTab(e);
            args[0] = 'projects';
        }
        mainContent.render(args[0], args[1]);
    },
    setActiveTab: function(tab) {
        if (this.activeTab) {
            this.activeTab.classList.remove('active');
        }
        tab.classList.add('active');
        this.activeTab = tab;
    },
    setActiveContent: function(content) {
        if (this.activeContent) {
            this.activeContent.classList.remove('active');
        }
        content.classList.add('active');
        this.activeContent = content;
    },
}

/***/ }),

/***/ "./src/components/modal_remove.js":
/*!****************************************!*\
  !*** ./src/components/modal_remove.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildModalRemove)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");



// mimics alert box confirming task/project removal
function buildModalRemove(obj) {
    console.log(`buildModalRemove() is running from mmodal_remove.js`);
    const dialogElement = document.createElement('dialog');
    const form = document.createElement('form');
    
    console.log(obj)
    dialogElement.id = 'modal';
    form.classList.add('form_removal');

    const modal = buildModal(dialogElement, form, obj);
    form.appendChild(modal.render());
    modal.cacheDOM();
    modal.bindEvents();

    dialogElement.appendChild(form);
    document.body.appendChild(dialogElement);dialogElement.showModal();
}

const buildModal = (dialogElement, form, obj) => {
    let state = {
        dialogElement,
        form,
        type: obj.type,
        obj,
    }

    return Object.assign(
        {},
        modal(state),
    )

}

const modal = (state) => ({
    dialogElement: state.dialogElement,
    form: state.form,
    type: state.type,
    selection: state.obj,
    buttons: [
        {
            element: 'button',
            text: 'Cancel',
            attributes: {
                className: 'btn_cancel',
                type: 'button',
            }
        },
        {
            element: 'button',
            text: 'Delete',
            attributes: {
                className: 'btn_submit_remove',
                type: 'submit',
            }
        }
    ],
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnDelete = this.form.querySelector('.btn_submit_remove');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        this.dialogElement.addEventListener('click', this.closeModal);
    },
    render: function() {
        // Delete?
        // Are you sure you want to delete project
        // Cancel and delete buttons

        // Need project.title and task.name
        const container = document.createElement('div');
        const header = document.createElement('h4');
        const confirmationMessage = document.createElement('p');
        const uniqueText = document.createElement('span');

        header.textContent = 'Delete?'
        confirmationMessage.textContent = `Are you sure you want to delete `;
        uniqueText.textContent = this.selection.title ? this.selection.title : this.selection.name;
        confirmationMessage.appendChild(uniqueText)
        // <p>Are you sure you want to delete <span>${this.text}</span>?</p>

        container.appendChild(header);
        container.appendChild(confirmationMessage);

        this.buttons.forEach(item => {
            
            const button = Object.assign(document.createElement(item.element), item.attributes);
            button.textContent = item.text;
            container.appendChild(button);
        })

        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        if (this.type === 'task') {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask', this.selection.uuidTask);
        } else {
            console.log(this.selection);
            console.log(this.selection.uuid);
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeProject', this.selection.uuid);
        }
        this.closeForm();
    },
    closeForm: function(e) {
        this.dialogElement.close()
        this.removeModal();
    },
    closeModal: function(e) {
        console.log(`closeModal running from modal_remove.js`);
        if (e.target.id === 'modal') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    }
})

/***/ }),

/***/ "./src/components/overlay.js":
/*!***********************************!*\
  !*** ./src/components/overlay.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildOverlay)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");


function buildOverlay() {
    return overlay.render();
}

const overlay = {
    cacheDOM: function(container) {
        this.overlay = container;
    },
    render: function() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay_main_content');
        this.cacheDOM(overlay);
        this.bindEvents();

        return overlay;
    },
    bindEvents: function() {
        this.dimOverlay = this.dimOverlay.bind(this);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe('dim', overlay.dimOverlay);
    
    },
    unbindEvents: function() {
        // pubSub.unsubscribe('dim', overlay.dimOverlay);
    },
    dimOverlay: function(e) {
        if (e.classList.contains('hide') || window.innerWidth > 768) {
            this.overlay.classList.remove('dim');
        } else if (!e.classList.contains('hide')) {
            this.overlay.classList.add('dim');
        }
    },
    watchScreen: function() {
        // this.getWindowWidth = this.getWindowWidth.bind(this);
    },
}

/***/ }),

/***/ "./src/components/project_tasks.js":
/*!*****************************************!*\
  !*** ./src/components/project_tasks.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildProjectTasks),
/* harmony export */   projectTasks: () => (/* binding */ projectTasks)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _components_tasks_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tasks_list */ "./src/components/tasks_list.js");






// renders a project's page and it's tasks
// when we are at a project's page
    // we delete it from there or from the sidebar
        // change content to home
function buildProjectTasks(uuid) {
    console.log(`tasks.js running`); // for debugging
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.setActive(uuid);
    const project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(uuid);
    projectTasks.project = project;
    const content = projectTasks.render();
    projectTasks.cacheDOM(content);
    projectTasks.bindEvents();
    return content;
}

const projectTasks = {
    project: null,
    cacheDOM: function(container) {
        this.projectTasksContainer = container
        this.ulList = this.projectTasksContainer.querySelector('.tasks_list');
        this.listContainer = this.ulList.firstChild;
        this.btnAddTask = this.ulList.querySelector('.btn_add_task');
    },
    bindEvents: function() {
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_3__["default"]);
        // this will need to generate a form
            // removes the button
    },
    render: function() {
        console.log(`render() in project_tasks.js is running`); // for debugging
        const projectsContainer = document.createElement('div');
        const header = document.createElement('h1');
        const list = document.createElement('ul');

        // const taskList = document.createElement('div');
        const listItem = document.createElement('li'); // rename?
        
        projectsContainer.classList.add('task');
        list.classList.add('tasks_list');

        header.textContent = this.project.title;

        projectsContainer.appendChild(header);

        listItem.appendChild(_components_tasks_list__WEBPACK_IMPORTED_MODULE_4__.tasksList.init()); // something fishing is going on
        listItem.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_2__["default"])('add', 'task', 'Add task'));
        list.appendChild(listItem);

        projectsContainer.appendChild(list);


        return projectsContainer
    },
}

/***/ }),

/***/ "./src/components/projects.js":
/*!************************************!*\
  !*** ./src/components/projects.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildProjects)
/* harmony export */ });
/* harmony import */ var _components_projects_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_projects_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/projects_form */ "./src/components/projects_form.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _styles_projects_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/projects.css */ "./src/styles/projects.css");






function buildProjects() {
    console.log(`projects.js running`);

    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects');

    const header = document.createElement('h1');
    header.textContent = 'PROJECTS';

    projectsContainer.appendChild(header);
    projectsContainer.appendChild(projects.render());
    
    projects.cacheDOM(projectsContainer);
    projects.bindEvents();

    return projectsContainer
}

const projects = {
    cacheDOM: function(container) {
        this.btnAddProject = container.querySelector('.btn_add_project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', _components_projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },
    render: function() {
        const parentContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        anchorWrapper.classList.add('nav_projects');

        anchorWrapper.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('add', 'project', 'Add project'));        
        parentContainer.appendChild(anchorWrapper);

        _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.add('content', parentContainer, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.projects);
        _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.find('content').clearCache();
        _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.find('content').init();
        return parentContainer;
    },
}

/***/ }),

/***/ "./src/components/projects_form.js":
/*!*****************************************!*\
  !*** ./src/components/projects_form.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildProjectForm)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_projects_form_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/projects_form.css */ "./src/styles/projects_form.css");





// renders a form to create a project
function buildProjectForm() {
    const dialogElement = document.createElement('dialog');
    dialogElement.id = 'form_project';
    dialogElement.appendChild(formProject.render());
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
    formProject.cacheDOM();
    formProject.bindEvents();
}

const formProject = {
    formChildren: {
        name: {
            id: 'title',
            name: 'title',
            type: 'text',
            placeholder: 'Enter Project Title',
            required: 'required',
        },
    },
    formButtons: {
        cancel: {
            className: 'btn_cancel',
            type: 'button',
        },
        add: {
            className: 'btn_submit_project',
            type: 'submit',
        },
    },
    cacheDOM: function() {
        this.dialogElement = document.querySelector('#form_project');
        this.btnCancel = document.querySelector('.btn_cancel');
        this.btnSubmit = document.querySelector('.btn_submit_project');
        this.form = document.querySelector('#form');
        this.formInputs = document.querySelectorAll('#form input');
    },
    bindEvents: function() {
        this.closeModal = this.closeModal.bind(this);
        this.removeModal = this.removeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.dialogElement.addEventListener('click', this.closeModal);
        this.dialogElement.addEventListener('cancel', this.removeModal)
        this.btnCancel.addEventListener('click', this.removeModal);
        this.form.addEventListener('submit', this.submitForm);
    },
    // take a look at restaurant project's contact module
    render: function() {
        const formElement = document.createElement('form');
        const formHeader = document.createElement('h2');
        const formButtons = document.createElement('div');
        formButtons.classList.add('form_buttons');
        formElement.id = 'form';
        formHeader.textContent = 'Add Project';
        formElement.appendChild(formHeader);

        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form_item');
            if (this.formChildren[formChild].hasOwnProperty('required')) {
                const label = document.createElement('label');
                const input = Object.assign(document.createElement('input'), this.formChildren[formChild]);
                label.textContent = formChild;
                label.htmlFor = this.formChildren[formChild].id;
                formItem.appendChild(label);
                formItem.appendChild(input);
            }
            formElement.appendChild(formItem);
        }

        for (let btn in this.formButtons) {
            const button = document.createElement('button');
            const span = document.createElement('span');
            Object.assign(button, this.formButtons[btn]);
            span.textContent = btn;

            button.appendChild(span);
            formButtons.appendChild(button);
        }
        formElement.appendChild(formButtons);

        return formElement
    },
    closeModal: function(e) {
        if (e.target.tagName === 'DIALOG') {
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    },
    submitForm: function(e) {
        e.preventDefault();
        // optional, form validation
            // if form is valid
                // then addProject()
        // addProject(this.formInputs);
        _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.addProject(this.formInputs);
        // buildList.modules.forEach(module => module.render())
        _components_projects_list__WEBPACK_IMPORTED_MODULE_1__.buildList.find('sidebar').render(); // will render only the sidebar
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubSub.publish('sidebar');
        this.removeModal();
    }
}

/***/ }),

/***/ "./src/components/projects_list.js":
/*!*****************************************!*\
  !*** ./src/components/projects_list.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildList: () => (/* binding */ buildList)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons */ "./src/components/buttons.js");
/* harmony import */ var _modal_remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal_remove */ "./src/components/modal_remove.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/inbox.svg */ "./src/assets/icons/inbox.svg");
/* harmony import */ var _assets_icons_today_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/icons/today.svg */ "./src/assets/icons/today.svg");
/* harmony import */ var _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/icons/circle.svg */ "./src/assets/icons/circle.svg");
/* harmony import */ var _styles_projects_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/projects.css */ "./src/styles/projects.css");
/* harmony import */ var _styles_projects_list_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/projects_list.css */ "./src/styles/projects_list.css");










// const icons = {inbox: IconInbox, today: IconToday };

const buildProjectsList = (type, container, array) => {
    let state = {
        container,
        type,
        array,
    }

    return Object.assign(
        {},
        projectsList(state),
        setIcons(state),
        )
}

// rename to buildProjectsList (?)
const buildList = {
    modules: [],
    add: function (type, container, array) {
        // need to check if the module exists already
        // if module exists, then update it's container
        // prevents similar modules to be added
        if (this.modules.some(module => module.type === type)) {
            this.find(type).container = container;
        } else {
            this.modules = [...this.modules, buildProjectsList(type, container, array)];
        }
    },
    find: function(type) {
        return this.modules.find(module => module.type === type);
    }
}

const projectsList = (state) => ({
    removeSelection: null,
    array: state.array,
    type: state.type,
    container: state.container,
    init: function() {
        const projectsContainer = document.createElement('div');
        const list = document.createElement('ul');
    
        projectsContainer.classList.add('projects');
        list.classList.add('projects_list');

        list.appendChild(this.render())
        this.cacheDOM(list);
        this.bindEvents();
        this.container.appendChild(list);

    },
    cacheDOM: function(container)  {    
        this.ulList = container;
        this.listContainer = this.ulList.firstChild;
        this.projectsListItems = this.ulList.querySelectorAll('li');
        this.projectsListAnchors = this.ulList.querySelectorAll('li a');
        this.btnDeleteProject = this.ulList.querySelectorAll('.btn_delete_project');
    },
    bindEvents: function() {
        this.removeProject = this.removeProject.bind(this);
        this.publish = this.publish.bind(this);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.subscribe('removeProject', this.removeProject);
        this.btnDeleteProject.forEach(button => {
            button.addEventListener('click', this.removeProject);
        });

        this.projectsListAnchors.forEach( project => {
            project.addEventListener('click', this.publish);
        });
    },
    render: function() {
        const listItems = document.createElement('div');
        for (let i = 0; i < this.array.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            const anchorImg = new Image();
            anchorSpan.textContent = this.array[i].title;
            anchor.href = `#${this.array[i].title};`

            listItem.setAttribute('data-uuid', this.array[i].uuid);
            anchor.classList.add('nav_project');
            const buttonSpan = document.createElement('span');

            if (Object.keys(this.icons).find(a => a === this.array[i].title.toLowerCase())) {
                anchorImg.src = this.icons[Object.keys(this.icons).find(a => a === this.array[i].title.toLowerCase())]
            } else {
                anchorImg.src = this.icons['circle'];
            }
            
            anchor.appendChild(anchorImg);
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);

            if (state.type !== 'misc') {
                const deleteButton = (0,_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('delete', 'project');
                deleteButton.setAttribute('data-inbox-uuid', _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox[0].uuid);
                buttonSpan.appendChild(deleteButton);
                listItem.appendChild(buttonSpan);
            }

            listItems.appendChild(listItem);
        }

        if (this.listContainer) {
            this.listContainer.remove();
            this.ulList.appendChild(listItems);
            // changes content to the newly project is added
            if (this.projectsListItems.length < this.array.length && this.type === 'sidebar') {
                _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', [...listItems.children].splice(-1).pop().firstChild);
            }
            this.cacheDOM(this.ulList);
            this.bindEvents();
        }
        return listItems;
    },
    removeProject: function(e) {
        if (e instanceof MouseEvent) {
            const listItem = e.target.parentElement.parentElement.parentElement;
            
            buildList.modules.forEach(module => {
                module.removeSelection = listItem;
            })
            this.removeSelection = listItem;
            const projectUUID = listItem.dataset.uuid;
            (0,_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.find(projectUUID));
            console.log(this);
            console.log(this.type);
            console.log(this.removeSelection)
        } else {
            // if there is no active project
            // OR the project's uuid we want to remove is the same as the current active project's uuid
            // update the content to the inbox

            if (_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive() === undefined || e === _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive().uuid) {
                _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', this.removeSelection.lastChild.firstChild);
            }
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.remove(e);
            buildList.modules.forEach(module => module.render());

            this.removeSelection.remove();
            buildList.modules.forEach(module => module.removeSelection = null);
        }
    },
    publish: function(e) {
        e.preventDefault();
        console.log(`publish() running from projects_ist.js`); // for debugging
        let className = e.target.parentElement.className;
        let projectUUID = e.target.parentElement.parentElement.dataset.uuid
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', e.target.parentElement);
        if (this.type === 'sidebar'|| this.type === 'misc') {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('sidebar');
        }
    },
    clearCache: function() {
        this.ulList = null;
        this.listContainer = null;
        this.projectsListItems = null;
        this.projectsListAnchors = null;
        this.btnDeleteProject = null;
    },
})

const setIcons = (state) => {
    let icons = {}

    if (state.type === 'misc') {
        icons.icons = { inbox: _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__, today: _assets_icons_today_svg__WEBPACK_IMPORTED_MODULE_5__ };
    } else {
        icons.icons = { circle: _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__ };
    }
    return icons;
}

/***/ }),

/***/ "./src/components/sidebar/sidebar.js":
/*!*******************************************!*\
  !*** ./src/components/sidebar/sidebar.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildSidebar)
/* harmony export */ });
/* harmony import */ var _utilities_import_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/import-all */ "./src/utilities/import-all.js");
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons */ "./src/components/buttons.js");
/* harmony import */ var _projects_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projects_form */ "./src/components/projects_form.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_sidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/sidebar.css */ "./src/styles/sidebar.css");








function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';

    if (window.innerWidth > 768) {
        sidebarWrapper.classList.add('show');
    } else {
        sidebarWrapper.classList.add('hide');
    }

    sidebarWrapper.appendChild(sidebar.render());
    sidebar.cacheDOM(sidebarWrapper);
    sidebar.bindEvents();

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.subscribe('sidebar', sidebar.toggleSidebar);
    return sidebarWrapper;
}

const assets = {
    icons: (0,_utilities_import_all__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
}

const sidebar = {
    cacheDOM: function(container) {
        // window.addEventListener('load', (e) => console.log(document.querySelector('#main_content')))
        this.sidebar = container;
        this.sidebarWrapper = this.sidebar.querySelector('.sidebar_wrapper');
        // need to append list_projects to this.projectsContainer

        this.projectsContainer = this.sidebar.querySelector('#projects_container');
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects');
        this.btnAddProject = container.querySelector('.btn_add_project');
        // this.anchorInbox = this.sidebar.querySelector('.nav_inbox');
    },
    bindEvents: function() {
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.publish = this.publish.bind(this);
        this.btnAddProject.addEventListener('click', _projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.anchorProjects.addEventListener('click', this.publish, { capture: true });
        this.sidebar.addEventListener('click', this.toggleSidebar);
        
        this.callDimOverlay = this.callDimOverlay.bind(this);
        window.addEventListener('resize', this.callDimOverlay);
    },
    render: function() {
        // const sidebarWrapper = document.createElement('div');
        const sidebarContainer = document.createElement('div');

        _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.setMiscProjects();
        const navMisc = document.createElement('div');
        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.add('misc', navMisc, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.misc);
        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find(`misc`).init();

        const projectsContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const projectsAnchor = document.createElement('a');

        // sidebarWrapper.classList.add('sidebar_wrapper');
        sidebarContainer.classList.add('container');
        projectsContainer.id = 'projects_container';
        navMisc.classList.add('projects_misc_container');

        projectsAnchor.textContent = 'Projects';
        projectsAnchor.href = '#projects';
        projectsAnchor.classList.add('nav_projects')

        anchorWrapper.appendChild(projectsAnchor);
        anchorWrapper.appendChild((0,_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('add', 'project'));
        projectsContainer.appendChild(anchorWrapper);

        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.add('sidebar', projectsContainer, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.projects);
        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find(`sidebar`).init();

        sidebarContainer.appendChild(navMisc);
        sidebarContainer.appendChild(projectsContainer);
        // sidebarWrapper.appendChild(sidebarContainer);
        return sidebarContainer;
        // return sidebarWrapper;
    },
    toggleSidebar: function(e) {
        if (e instanceof MouseEvent) {
            if (e.target === this.sidebar) {
                this.toggleSidebar();
            } 
        } else {
            if (this.sidebar.classList.contains('show')) {
                this.sidebar.classList.remove('show');
                this.sidebar.classList.add('hide');
            } else {
                this.sidebar.classList.remove('hide');
                this.sidebar.classList.add('show');
            }
            // pubSub.publish('dim', this.sidebar);
            this.callDimOverlay()
        }
    },
    publish: function(e) {
        e.stopImmediatePropagation();
        this.toggleSidebar();
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('content', e.currentTarget);
    },
    callDimOverlay: function() {
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('dim', this.sidebar);
    },

}

/***/ }),

/***/ "./src/components/tasks_form.js":
/*!**************************************!*\
  !*** ./src/components/tasks_form.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildForm: () => (/* binding */ buildForm),
/* harmony export */   "default": () => (/* binding */ buildTasksForm)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _styles_tasks_form_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/tasks_form.css */ "./src/styles/tasks_form.css");




const buildTaskForm = (type, form, button, buttonParent, dialogElement) => {
    let state = {
        form,
        type,
    }

    if (type === 'default') {
        if (button.hasAttribute('role')) {
        }
        state.button = button;
        state.buttonParent = buttonParent;
        return Object.assign(
            {},
            formTask(state),
            nonModal(state),
            formInputs(state),
        )
    }

    state.dialogElement = dialogElement;
    return Object.assign(
        {},
        formTask(state),
        modal(state),
        formInputs(state),
    )
}

const buildForm = {
    sections: [],
    add: function (type, form, button, buttonParent, dialogElement) {
        // if section type already exists, update it's container
        // prevents similar sections to be added
        if (this.find(type)) {
            this.find(type).closeForm();
            this.remove(type);
        }
        this.sections = [...this.sections, buildTaskForm(type, form, button, buttonParent, dialogElement)];
    },
    remove: function(type) {
        this.sections.splice(this.sections.indexOf(this.find(type)), 1);
    },
    find: function(type) {
        return this.sections.find(section => section.type === type);
    }
}

// renders a form to create a task
    // one needs to be a dialog element
    // one needs to be a non-dialog element
function buildTasksForm(e) {
    const button = e.currentTarget;
    const buttonParent = button.parentElement;
    const form = document.createElement('form');
    form.classList.add('form_task');
    if (!button.hasAttribute('role') && buttonParent.tagName !== 'LI') {
        form.classList.add('modal');
        const dialogElement = document.createElement('dialog');
        dialogElement.id = 'modal';
        buildForm.add('modal', form, undefined, undefined, dialogElement);

        form.appendChild(buildForm.find(`modal`).render());
        buildForm.find(`modal`).cacheDOM();
        buildForm.find(`modal`).bindEvents();
        dialogElement.appendChild(form);
        document.body.appendChild(dialogElement);
        dialogElement.showModal();
    } else {
        e.currentTarget.replaceWith(form);
        buildForm.add('default', form, button, buttonParent)
        form.appendChild(buildForm.find(`default`).render());
        buildForm.find(`default`).cacheDOM();
        buildForm.find(`default`).bindEvents();
    }
}

const formTask = (state) => ({
    type: state.type,
    form: state.form,
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnSubmit = this.form.querySelector('.btn_submit_task') || this.form.querySelector('.btn_update_task');
        this.formInputs = this.form.querySelectorAll('.task_input');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        if (this.dialogElement) {
            this.closeModal = this.closeModal.bind(this);
            this.dialogElement.addEventListener('click', this.closeModal);
        }
    },
    unBindEvent: function() {
        this.form.removeEventListener('submit', this.submitForm);
    },
    render: function() {
        const container = document.createElement('div');
        const formButtons = document.createElement('div');
        formButtons.classList.add('form_buttons');
        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form_item');
            if (this.formChildren[formChild].hasOwnProperty('element')) {
                const label = document.createElement('label');
                const item = Object.assign(
                    document.createElement(this.formChildren[formChild].element),
                    this.formChildren[formChild].attributes
                );

                label.htmlFor = this.formChildren[formChild].attributes.id;
                label.textContent = this.formChildren[formChild].attributes.placeholder;

                // idea, make separate module for options button
                if (this.formChildren[formChild].options) {
                    let length = 4;
                    let i = 1;
                    if (formChild === 'project') {
                        length = _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.projects.length;
                        i = 0;
                    }
                    for (i; i <= length; i++) {
                        const selectOption = Object.assign(
                            document.createElement(this.formChildren[formChild].options.element),
                            this.formChildren[formChild].options.attributes(i)
                        )

                        item.appendChild(selectOption);
                    }
                }

                formItem.appendChild(label);
                formItem.appendChild(item);
            }
            container.appendChild(formItem);
        }

        for (let btn in this.formButtons) {
            const button = document.createElement('button');
            const span = document.createElement('span');
            Object.assign(button, this.formButtons[btn]);
            span.textContent = btn;

            button.appendChild(span);
            formButtons.appendChild(button);
        }

        container.appendChild(formButtons);
        
        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        if (!this.listItem) {
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().addTask(this.formInputs);
            if (this.dialogElement) {
                this.closeForm();
            } else {
                this.form.reset();
            }
        } else {
            this.closeForm();
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('resetOldTask', this.button); // testing
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(this.listItem.dataset.uuidProj).updateTask(this.listItem.dataset.uuid, this.formInputs);
        }
    },
    closeForm: function(e) {
        console.log(`closeForm() from tasks_from.js is running`); // for debugging
        if (!this.dialogElement) {
            this.form.replaceWith(this.button);
            buildForm.remove(this.type);
        } else {
            this.removeModal();
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('resetOldTask'); // testing
    }
});

const nonModal = (state) => ({
    button: state.button,
    parentButton: state.buttonParent,
});

const modal = (state) => ({
    dialogElement: state.dialogElement,
    closeModal: function(e) {
        if (e.target.id === 'modal') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
        buildForm.remove(this.type);
    },
});

const formInputs = (state) => {
    const taskItem = state.button ? state.button.querySelector('.task_list_item') : null;
    const project = taskItem ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(taskItem.dataset.uuidProj) : null;
    const task = taskItem? project.findTask(taskItem.dataset.uuid) : null;
    
    const init = () => {
        for (let formChild in inputs.formChildren) {
            let attributes = inputs.formChildren[formChild].attributes;
            // finds task's key equal to input's id
            let key = Object.keys(task).find(item => item === attributes.id);
            if (attributes && key) {
                if (!inputs.formChildren[formChild].options) {
                    let value;
                    if (formChild !== 'dueDate') {
                        value = { value: task[key] };
                    } else {
                        value = { value: new Date(task[key]).toISOString().split('T')[0] }
                    }
                    Object.assign(attributes, value);
                } else {
                    const text = key;
                    const number = task[key];
                    Object.assign(
                        inputs.formChildren[formChild].options,
                        { value: number }, { text: text }
                    )
                }
            }
        }
    }

    const inputs = {
        formChildren: {
            name: {
                element: 'input',
                attributes: {
                    id: 'name',
                    className: 'task_input',
                    name: 'name',
                    type: 'text',
                    placeholder: 'Task name',
                    required: 'required',
                }
            },
            description: {
                element: 'textarea',
                attributes: {
                    id: 'description',
                    className: 'task_input',
                    name: 'description',
                    placeholder: 'Description'
                }
            },
            dueDate: {
                element: 'input',
                attributes: {
                    id: 'due_date',
                    className: 'task_input',
                    name: 'date',
                    type: 'date',
                    placeholder: 'Due Date',
                }
            },
            dueTime: {
                element: 'input',
                attributes: {
                    id: 'due_time',
                    className: 'task_input',
                    name: 'time',
                    type: 'time',
                    placeholder: 'Time'
                },
            },
            priority: {
                element: 'select',
                attributes: {
                    id: 'priority',
                    className: 'task_input',
                    name: 'priority',
                    placeholder: 'Priority',
                },
                options: {
                    element: 'option',
                    attributes: function(priority) {
                        const newPriority = {
                            value: priority,
                            text: `Priority ${priority}`,
                        }
                        if (this.value) {
                            if (this.value === newPriority.value) {
                                return Object.assign(newPriority, { selected: true })
                            } else {
                                return newPriority
                            }
                        } else {
                            // defaultSelected parameter MDN
                            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option#parameters
                            return priority === 4? Object.assign(newPriority, { selected: true}, { defaultSelected : true}) : newPriority;
                        }
                    }
                },
            },
            project: {
                element: 'select',
                attributes: {
                    id: 'project',
                    className: 'task_input',
                    name: 'project',
                    placeholder: 'Project'
                },
                options: {
                    element: 'option',
                    attributes: function(i) {
                        const project = {
                            value: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].uuid,
                            text: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].title,
                        }
                        if (state.button && _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(state.button.firstChild.dataset.uuidProj)) {
                            console.log(_containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(state.button.firstChild.dataset.uuidProj))
                            return _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(state.button.firstChild.dataset.uuidProj).uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].uuid ?
                            Object.assign(project, { selected: true }, { defaultSelected : true}) : project;
                        } else {
                            return _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].uuid ?
                            Object.assign(project, { selected: true }, { defaultSelected : true}) : project;
                        }
                    }
                }
            },
        },
        formButtons: {
            cancel: {
                className: 'btn_cancel',
                type: 'button',
            },
        }
    }

    // if the button clicked has 'role' attribute
        // assign formChildren with a save-button
        // assign formTask with a content property/init function
    // otherwise, 
        // assign formChildren with only a add-button
    if (state.button && state.button.hasAttribute('role')) {
        const inputsEdit = {
            button: {
                save: {
                className: 'btn_update_task',
                type: 'submit',
                },
            },
            prop: {
                listItem: state.button.firstChild,
            }
        }

        init();
        Object.assign(inputs.formButtons, inputsEdit.button);
        Object.assign(inputs, inputsEdit.prop);
    } else {
        const inputsAdd = {
            add: {
                className: 'btn_submit_task',
                type: 'submit',
            },
        }

        Object.assign(inputs.formButtons, inputsAdd);
    }
    return inputs;
}

/***/ }),

/***/ "./src/components/tasks_list.js":
/*!**************************************!*\
  !*** ./src/components/tasks_list.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tasksList: () => (/* binding */ tasksList)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_modal_remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/modal_remove */ "./src/components/modal_remove.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_tasks_list_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/tasks_list.css */ "./src/styles/tasks_list.css");







const tasksList = {
    removeSelection: null,
    btnDeleteTask: [],
    init: function() {
        this.render = this.render.bind(this);
        this.resetOldTask = this.resetOldTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('addTask', this.render);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('updateTask', this.render);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('resetOldTask', this.resetOldTask);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('removeTask', this.removeTask);
        this.project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive()
        this.listContainer = this.render();
        this.project.tasks.forEach(task => {
            this.render(task)
        });
        return this.listContainer;
    },
    oldTask: null,
    project: null,
    cacheDOM: function() {
        this.listContainer = this.listContainer;
        // this.btnDeleteTask = this.listContainer.querySelectorAll('.btn_delete_task');
        this.projectsListItems = this.listContainer.querySelectorAll('li');
    },
    bindEvents: function(...args) {
        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        args.forEach(element => {
            if (element.getAttribute('type')) {
                if (element.className.includes('delete')) {
                    element.addEventListener('click', this.removeTask, true);
                } else {
                    element.addEventListener('click', this.completeTask)
                }
            } else {
                element.addEventListener('click', this.editTask);
            }
        });
        // this will need to generate a form
            // removes the button
    },
    render: function(task) {
        if (task) {
            const listItemWrapper = document.createElement('div');
            const listItemContainer = document.createElement('div');
            const listItem = document.createElement('li');
            const taskContent = document.createElement('div');
            const taskName = document.createElement('h3');
            const priority = document.createElement('p');
            const taskRadio = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('radio', 'task');
            
            const taskActions = document.createElement('div');

            listItemWrapper.setAttribute('role', 'button');
            listItem.setAttribute('data-uuid', task.uuidTask);
            listItem.setAttribute('data-uuid-proj', task.uuidProj);
            listItemContainer.classList.add('container');
            taskContent.classList.add('task_list_item_content');
            listItem.classList.add('task_list_item');
            taskActions.classList.add('task_actions');
            taskName.classList.add('task_name');
            taskName.textContent = task.name;

            priority.classList.add('task_priority');
            priority.textContent = `Priority ${task.priority}`;

            taskRadio.firstElementChild.classList.add(`priority_${task.priority}`)

            listItemContainer.appendChild(taskRadio);
            taskContent.appendChild(taskName);
            
            if (task.description !== undefined) {
                const taskDescription = document.createElement('p');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = task.description;
                taskContent.appendChild(taskDescription);
            }

            if (task.due_date !== undefined || task.due_time !== undefined) {
                const dateTimeWrapper = document.createElement('div');
                let dateTimeText;
                const date = new Date(`${task.due_date}T00:00:00`);
                const time = new Date(`1-2-1000 ${task.due_time}`)
                const timeProperties = { hour: 'numeric', minute: 'numeric', hour12: true }
                if (task.due_date && !task.due_time) {
                    dateTimeText = date.toDateString();
                } else if (!task.due_date && task.due_time) {
                    dateTimeText = time.toLocaleString('en-us', timeProperties);
                } else {
                    dateTimeText = `${date.toDateString()} ${time.toLocaleString('en-us', timeProperties)}`;
                }
                dateTimeWrapper.classList.add('task_due_date_time')
                const dateTimeButton = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('date', 'task', dateTimeText)
                dateTimeWrapper.appendChild(dateTimeButton);
                taskContent.appendChild(dateTimeWrapper);
            }

            // taskContent.appendChild(priority);

            const buttonDelete = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('delete', 'task');
            const buttonEdit = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('edit', 'task');
            taskActions.appendChild(buttonDelete);
            taskActions.appendChild(buttonEdit);

            listItemContainer.appendChild(taskContent);
            listItemContainer.appendChild(taskActions);
            listItem.appendChild(listItemContainer);

            listItemWrapper.appendChild(listItem);
            // this.btnDeleteTask.push(button)
            this.bindEvents(buttonDelete, taskRadio, listItemWrapper);

            if (!this.oldTask) {
                console.log(`this.oldTask = ${this.oldTask}`);
                this.listContainer.appendChild(listItemWrapper);
            } else {
                this.oldTask.replaceWith(listItemWrapper);
                this.oldTask = null;
            }
            // updating task
                // need to only append at that task's index
        } else {
            return document.createElement('div');
        }
        // when the task form inside the list is open and a new task is added
            // the task list grows while the task form is open
    },
    completeTask: function(e) {
        e.stopImmediatePropagation();
        console.log(`completetask() running from tasks_list.js`);
        const listItem = e.currentTarget.parentElement.parentElement;
        this.removeSelection = listItem;
        this.removeTask();
    },
    removeTask: function(e) {
        console.log(`removeTask() in tasks_list.js is running`)
        // create a modal to confirm removal
        console.log(e);
        if (e instanceof MouseEvent) {
            e.stopImmediatePropagation();
            const listItem = e.currentTarget.parentElement.parentElement.parentElement;
            this.removeSelection = listItem;
            let uuidTask = listItem.dataset.uuid;
            (0,_components_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(this.project.findTask(uuidTask));  
        // } else if (e) {
        } else if (this.removeSelection) {
            // this.project.removeTask(e);
            this.project.removeTask(this.removeSelection.dataset.uuid);
            this.removeSelection.parentElement.remove();
            this.removeSelection = null;
        } else {
            // if (this.project.title !== 'Today') {
                this.oldTask.remove();
            // }
            this.oldTask = null;
        }
    },
    editTask: function(e) {
        console.log(`editTask() from tasks_list.js is running`);
        this.oldTask = e.currentTarget;
        (0,_components_tasks_form__WEBPACK_IMPORTED_MODULE_3__["default"])(e);
    },
    resetOldTask: function(oldTask) {
        console.log(`resetOldTask() from tasks_list.js is running`);
        if (this.oldTask) {
            // debugger
            this.oldTask = null
        } else if (oldTask) {
            this.oldTask = oldTask;
        }
    }
}

/***/ }),

/***/ "./src/containers/project-controller.js":
/*!**********************************************!*\
  !*** ./src/containers/project-controller.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectController: () => (/* binding */ projectController)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/storage */ "./src/storage/storage.js");



const getFormValues = (inputs) => {
    // tasks is empty with local storage
    const obj = {}
    inputs.forEach(input => { 
        if (input.id === 'priority') {
            obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length));
        } else if (input.id === 'due_date' && input.value.length === 0 && [...inputs].find(item => item.id === 'due_time').value.length !== 0) {
            // if time has a value and date does not have a value
                // date set to today's date
            obj[input.id] = new Date().toISOString().split('T')[0];
        } else if (input.value.length !== 0) {
            obj[input.id] = input.value
        }
    });
    console.log(obj)
    return obj;
}

const buildProject = (tasks) => {
    let state = {
        tasks,
        uuid: crypto.randomUUID(),
    }

    return Object.assign(
        {},
        project(state),
    )
}

// creates a project object
    // tasks property created upon object creation
const project = (state) => ({
    type: 'project',
    active: false, // there can only be one project active
    uuid: state.uuid,
    tasks: state.tasks || [],
    addTask: function(inputs) {
        // need to allow user to pick what project to assign the newly/edited task
            // pushes task to respective project
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(task(this.uuid), formValues);

        if (formValues.project && formValues.project !== newTask.uuidProj) {
            console.log(`new uuid proj: ${formValues.project}`);
            console.log(`old uuid proj: ${newTask.uuidProj}`);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
            if (new Date(`${newTask.due_date}T00:00:00`).toDateString() === new Date().toDateString()) {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('addTask', newTask);
            }
        } else {
            this.tasks.push(newTask);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('addTask', newTask);
        }
        projectController.setAllProjects();
        console.log(projectController.today)
        // populateStorage();
    },
    removeTask: function(uuid) {
        // if the remove task is in today
            // remove it from today AND it's respective project
        // if the task's date in today is edited 
            // remove it from only today
        const task = this.findTask(uuid);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        // removes task in respective project
        // console.log(task.uuidProj);
        projectController.allProjects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.uuidTask === uuid) {
                    project.tasks.splice(project.tasks.indexOf(task), 1);
                }
            })
        })
        projectController.setAllProjects();
        // populateStorage();
    },
    updateTask: function(uuid, inputs) {
        console.log(`updateTask() from project-controller.js is running`); // for debugging
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(this.findTask(uuid), formValues);

        console.log(formValues)
        console.log(newTask.due_date);
        debugger
        // if the project is change for a task
        if (formValues.project && formValues.project !== newTask.uuidProj) {
            this.removeTask(newTask.uuidTask);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask');
            if (projectController.findActive().title === 'Today') {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('updateTask', newTask);
            } else {

            }
        } else {
            if (projectController.findActive().title === 'Today') {
                if (new Date(`${newTask.due_date}T00:00:00`).toDateString() === new Date().toDateString()) {
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('updateTask', newTask);
                } else {
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask');
                }
            } else {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('updateTask', newTask);
            }
        }
        projectController.setAllProjects();
        // populateStorage();
    },
    findTask: function(uuid) {
        return this.tasks.find(element => element.uuidTask === uuid);
    },
})


const projectController = {
    inbox: [Object.assign(buildProject(), {title: 'Inbox',})], // will hold tasks assigned to the 'inbox'
    today: [Object.assign(buildProject(), {title: 'Today'})],
    misc: null,
    projects: null,
    allProjects: [],
    addProject: function(inputs) {
        const formValues = getFormValues(inputs);
        this.projects.push(Object.assign(buildProject(), formValues));
        this.setAllProjects()
        // populateStorage();
    },
    remove: function(uuid) {
        this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
        this.setAllProjects();
        // populateStorage();
    },
    find: function(uuid) {
        // return this.projects.find(project => project.uuid === uuid);
        return this.allProjects.find(project => project.uuid === uuid);
    },
    setActive: function(uuid) {
        console.log(`setActive() is running from project-controller.js`) // for debugging
        if (this.findActive()) {
            this.findActive().active = false;
        }
        this.find(uuid).active = true;
    },
    findActive: function() {
        console.log(this.allProjects)
        if (!this.allProjects.find(project => project.active === true)) {
            this.inbox[0].active = true;
            return this.inbox;
        } else {
            return this.allProjects.find(project => project.active === true);
        }
    },
    setAllProjects: function() {
        this.allProjects = this.inbox.concat(this.projects, this.today);
        this.sort()
        ;(0,_storage_storage__WEBPACK_IMPORTED_MODULE_1__.populateStorage)();
    },
    setMiscProjects: function() {
        this.misc = this.inbox.concat(this.today)
    },
    sort: function() {
        const today = new Date().toDateString();
        this.allProjects.forEach(project => {
            if (project.tasks.length > 0 && project.title !== 'Today') {
                project.tasks.forEach(task => {
                    let taskDate = new Date(`${task.due_date}T00:00:00`).toDateString();
                    if (!this.today[0].findTask(task.uuidTask) && taskDate == today) {
                        this.today[0].tasks.push(task);
                    }
                })
            }
        });
        console.log(this.today)
    },
    init: function() {
        this.projects.forEach(obj => {
            Object.assign(obj, buildProject(obj.tasks));
            obj.tasks.forEach(task => {
                task.uuidProj = obj.uuid;
            });
        });

        Object.assign(this.inbox[0], buildProject(this.inbox[0].tasks));
        this.inbox[0].tasks.forEach(task => {
            task.uuidProj = this.inbox[0].uuid;
        })
        this.setAllProjects();
    }
}

const task = (uuid) => {
    const type = 'task';
    const uuidTask = crypto.randomUUID();
    const uuidProj = uuid;
    return { uuidTask, uuidProj, type };
}

/***/ }),

/***/ "./src/containers/pubsub.js":
/*!**********************************!*\
  !*** ./src/containers/pubsub.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pubSub: () => (/* binding */ pubSub)
/* harmony export */ });
const pubSub = {
    subscribers: {},
    subscribe: function(subscriber, handler) {
        if (this.subscribers[subscriber]) {
            delete this.subscribers[subscriber];
        }
        this.subscribers[subscriber] = this.subscribers[subscriber] || [];
        this.subscribers[subscriber].push(handler);
    },
    unsubscribe: function(subscriber,  handler) {
        if (this.subscribers[subscriber]) {
            for (let i = 0; i < this.subscribers[subscriber].length; i++) {
                if (this.subscribers[subscriber][i] === handler) {
                    this.subscribers[subscriber].splice(i, 1);
                    break;
                }
            }
        }
    },
    publish: function(subscriber, data) {
        if (this.subscribers[subscriber]) {
            this.subscribers[subscriber].forEach(function(handler) {
                handler(data);
            })
        }
    }
}

/***/ }),

/***/ "./src/storage/storage.js":
/*!********************************!*\
  !*** ./src/storage/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateStorage: () => (/* binding */ populateStorage),
/* harmony export */   setProjects: () => (/* binding */ setProjects)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");


// getItem from localStorage
function setProjects() {
    console.log(`setProjects() running from storage.js`);
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox = localStorage.getItem('inbox') ? JSON.parse(localStorage.getItem('inbox')) : _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox;
    // projectController.today = localStorage.getItem('today') ? JSON.parse(localStorage.getItem('today')) : projectController.today;
    // console.log(projectController.projects);
    // console.log(projectController.allProjects);
    // console.log(projectController.today);
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.init();
    // console.log(projectController.projects);
    // console.log(projectController.allProjects);
}

// setItem in localStorage
function populateStorage() {
    console.log(`populateStorage() running from storage.js`);
    localStorage.setItem('projects', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects));
    localStorage.setItem('inbox', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox));
    // localStorage.setItem('today', JSON.stringify(projectController.today));
    // console.log(localStorage.getItem('projects'));
    // console.log(localStorage.getItem('inbox'));
}

/***/ }),

/***/ "./src/utilities/import-all.js":
/*!*************************************!*\
  !*** ./src/utilities/import-all.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ importAll)
/* harmony export */ });
// returns an object and array of file types
function importAll(r) {
    let files = {};
    let filesArr = [];
    r.keys().map(item => {
        files[item.replace('./', '')] = r(item);
        filesArr.push(item.replace('./', ''));
    });

    return { files, filesArr }
}

/***/ }),

/***/ "./src/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf":
/*!***********************************************************!*\
  !*** ./src/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "12e3683f9192436a7be8.ttf";

/***/ }),

/***/ "./src/assets/icons/add.svg":
/*!**********************************!*\
  !*** ./src/assets/icons/add.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c6ca9afee1a32f56188e.svg";

/***/ }),

/***/ "./src/assets/icons/check_small.svg":
/*!******************************************!*\
  !*** ./src/assets/icons/check_small.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "fa7f0c89c7517f202b90.svg";

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

/***/ "./src/assets/icons/circle.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/circle.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d6e68359dd6b541f7c70.svg";

/***/ }),

/***/ "./src/assets/icons/cog.svg":
/*!**********************************!*\
  !*** ./src/assets/icons/cog.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "21a2bc942cb9bc7cfffa.svg";

/***/ }),

/***/ "./src/assets/icons/date.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/date.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4f56e04d5596f51f140b.svg";

/***/ }),

/***/ "./src/assets/icons/delete.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/delete.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "eac1a29b0fcadff53187.svg";

/***/ }),

/***/ "./src/assets/icons/edit.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/edit.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9c8f3ce5c9c3fc997861.svg";

/***/ }),

/***/ "./src/assets/icons/github-mark/github-mark-white.svg":
/*!************************************************************!*\
  !*** ./src/assets/icons/github-mark/github-mark-white.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "97ed8e7eef60d61ca469.svg";

/***/ }),

/***/ "./src/assets/icons/github-mark/github-mark.svg":
/*!******************************************************!*\
  !*** ./src/assets/icons/github-mark/github-mark.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6fa18895f6e6c7772cab.svg";

/***/ }),

/***/ "./src/assets/icons/home.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/home.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f8c7c536d6f704fbe961.svg";

/***/ }),

/***/ "./src/assets/icons/inbox.svg":
/*!************************************!*\
  !*** ./src/assets/icons/inbox.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1d45cd0dc21654a08f74.svg";

/***/ }),

/***/ "./src/assets/icons/magnify.svg":
/*!**************************************!*\
  !*** ./src/assets/icons/magnify.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "54ff7732bb1a5ff166c6.svg";

/***/ }),

/***/ "./src/assets/icons/menu.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/menu.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "132af47f7c9ff9c54b7b.svg";

/***/ }),

/***/ "./src/assets/icons/radio_button_unchecked.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/radio_button_unchecked.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6bfeb430abd13c4c8a64.svg";

/***/ }),

/***/ "./src/assets/icons/today.svg":
/*!************************************!*\
  !*** ./src/assets/icons/today.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e0e385e1ed83a44ce819.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/app.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVEscURBQVMsbUNBQW1DLDZFQUFpQjtBQUNyRSxRQUFRLHFEQUFTOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFNO0FBQ2QsS0FBSztBQUNMO0FBQ0EsUUFBUSxzREFBTTtBQUNkLEtBQUs7O0FBRUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSDhDO0FBQ3VCO0FBQ3BDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJxRTs7QUFFckU7QUFDTztBQUNQO0FBQ0EsSUFBSSw2RUFBaUI7QUFDckIsSUFBSSw2RUFBaUIscUZBQXFGLDZFQUFpQjtBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkVBQWlCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQSxvREFBb0QsNkVBQWlCO0FBQ3JFLGlEQUFpRCw2RUFBaUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsYUFBYTtBQUNiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL2hlYWRlci5jc3M/ZTY4YiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzLmNzcz8xYWFhIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3M/NjFjNSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzPzEyZDIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9zaWRlYmFyLmNzcz80ODE2Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3M/OThlOCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2xpc3QuY3NzPzcxNTEiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgXFwuc3ZnJCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2ljb25zLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5zdmckIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL2J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL21haW4uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvbW9kYWxfcmVtb3ZlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdF90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0c19mb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzX2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Rhc2tzX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvdGFza3NfbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbnRhaW5lcnMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3V0aWxpdGllcy9pbXBvcnQtYWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9CZWJhc19OZXVlL0JlYmFzTmV1ZS1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdCZWJhcyBOZXVlJztcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuOnJvb3Qge1xuICAgIC8qIGN1c3RvbSB2YXJpYWJsZXMgKi9cbiAgICAtLXRleHQtY29sb3ItcHJpbWFyeTogcmdiKDMyLCAzMiwgMzIpO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuI3RvZG9fYXBwIHtcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XG59XG5cbiNjb250ZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNjb250ZW50IHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuLm92ZXJsYXlfbWFpbl9jb250ZW50LmRpbSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4jbWFpbl9jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDUlIDUlIDAlIDUlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbiNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLyogZ2VuZXJhbCBzdHlsZXMgZm9yIHNpbWlsYXIgZWxlbWVudHMgZXhpc3Rpbmcgb24gZGlmZmVyZW50IG1vZHVsZXMgKi9cbmJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG5idXR0b246aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcbiAgICAjbWFpbl9jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogNSUgMTAlIDAlIDEwJTtcbiAgICB9XG5cbiAgICAjbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgd2lkdGg6IDcwJTtcbiAgICB9XG5cbiAgICAjY29udGVudCB7XG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuXG5cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9hcHAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0kseUJBQXlCO0lBQ3pCLDRDQUEyRDtBQUMvRDs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsVUFBVTtBQUNkOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLG9CQUFvQjtJQUNwQixlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7SUFDWixvQ0FBb0M7SUFDcEMsVUFBVTtJQUNWLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLFVBQVU7SUFDVixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxPQUFPO0lBQ1Asb0JBQW9CO0lBQ3BCLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsK0JBQStCO0lBQy9CLG9CQUFvQjtJQUNwQixXQUFXO0FBQ2Y7O0FBRUEsc0VBQXNFO0FBQ3RFO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0k7UUFDSSxzQkFBc0I7SUFDMUI7O0lBRUE7UUFDSSxVQUFVO0lBQ2Q7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsYUFBYTtJQUNqQjs7O0FBR0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnQmViYXMgTmV1ZSc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9CZWJhc19OZXVlL0JlYmFzTmV1ZS1SZWd1bGFyLnR0ZicpO1xcbn1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG46cm9vdCB7XFxuICAgIC8qIGN1c3RvbSB2YXJpYWJsZXMgKi9cXG4gICAgLS10ZXh0LWNvbG9yLXByaW1hcnk6IHJnYigzMiwgMzIsIDMyKTtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jdG9kb19hcHAge1xcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuLm92ZXJsYXlfbWFpbl9jb250ZW50IHtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQuZGltIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI21haW5fY29udGVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIHBhZGRpbmc6IDUlIDUlIDAlIDUlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4vKiBnZW5lcmFsIHN0eWxlcyBmb3Igc2ltaWxhciBlbGVtZW50cyBleGlzdGluZyBvbiBkaWZmZXJlbnQgbW9kdWxlcyAqL1xcbmJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XFxuICAgICNtYWluX2NvbnRlbnQge1xcbiAgICAgICAgcGFkZGluZzogNSUgMTAlIDAlIDEwJTtcXG4gICAgfVxcblxcbiAgICAjbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgIHdpZHRoOiA3MCU7XFxuICAgIH1cXG5cXG4gICAgI2NvbnRlbnQge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIH1cXG5cXG5cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBoZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Y29yYWw7XG59XG5cbmhlYWRlciA+ICNuYXZiYXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDAuNDByZW0gMC4zNXJlbTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGNvbHVtbi1nYXA6IDAuMjVyZW07XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG59XG5cbi5pbnB1dF9zZWFyY2gge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gKiA+IGltZyB7XG4gICAgd2lkdGg6IGNsYW1wKDEuNjVyZW0sIDR2dywgMS41cmVtKTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRjb3JhbDtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcGFkZGluZzogMC40MHJlbSAwLjM1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAwLjI1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG5cXG4uaW5wdXRfc2VhcmNoIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gKiA+IGltZyB7XFxuICAgIHdpZHRoOiBjbGFtcCgxLjY1cmVtLCA0dncsIDEuNXJlbSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciBsaXN0IG9mIHByb2plY3RzIG9uIHRoZSBjb250ZW50IHNlY3Rpb24gKi9cbi8qICNtYWluX2NvbnRlbnQgPiBkaXYgPiBkaXYgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgXG59ICovXG5cbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbn1cblxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xuICAgIGp1c3RpZnktc2VsZjogZW5kO1xufVxuXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCAxZnI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIG1pbi13aWR0aDogMTAwJTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHVEQUF1RDtBQUN2RDs7R0FFRzs7QUFFSDtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsZUFBZTtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIGxpc3Qgb2YgcHJvamVjdHMgb24gdGhlIGNvbnRlbnQgc2VjdGlvbiAqL1xcbi8qICNtYWluX2NvbnRlbnQgPiBkaXYgPiBkaXYgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgIFxcbn0gKi9cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXFxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcXG59XFxuXFxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCAxZnI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjZm9ybV9wcm9qZWN0IHtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbWluLXdpZHRoOiA3MHZ3O1xuICAgIG1pbi1oZWlnaHQ6IDUwdmg7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbiNmb3JtX3Byb2plY3Q6OmJhY2tkcm9wIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbiNmb3JtX3Byb2plY3QgPiAjZm9ybSB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxuICAgICAgICAnaGVhZCBoZWFkJ1xuICAgICAgICAnaW5wdXQgaW5wdXQnXG4gICAgICAgICcuIGJ1dHRvbnMnXG4gICAgO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtaW4td2lkdGg6IGluaGVyaXQ7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQ7XG59XG5cbi8qIGltcGFjdHMgZm9ybV9pdGVtIGZvciB0YXNrc19mb3JtICovXG4uZm9ybV9pdGVtIHtcbiAgICBncmlkLWFyZWE6IGlucHV0O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbi5mb3JtX2J1dHRvbnMge1xuICAgIGdyaWQtYXJlYTogYnV0dG9ucztcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcbn1cblxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiOzs7O0lBSUE7SUFDQSxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQiwyQkFBMkI7QUFDL0I7O0FBRUEscUNBQXFDO0FBQ3JDO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsaUJBQWlCO0FBQ3JCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNmb3JtX3Byb2plY3Qge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIG1pbi13aWR0aDogNzB2dztcXG4gICAgbWluLWhlaWdodDogNTB2aDtcXG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4jZm9ybV9wcm9qZWN0OjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxuI2Zvcm1fcHJvamVjdCA+ICNmb3JtIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXFxuICAgICAgICAnaGVhZCBoZWFkJ1xcbiAgICAgICAgJ2lucHV0IGlucHV0J1xcbiAgICAgICAgJy4gYnV0dG9ucydcXG4gICAgO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1pbi13aWR0aDogaW5oZXJpdDtcXG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4vKiBpbXBhY3RzIGZvcm1faXRlbSBmb3IgdGFza3NfZm9ybSAqL1xcbi5mb3JtX2l0ZW0ge1xcbiAgICBncmlkLWFyZWE6IGlucHV0O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zIHtcXG4gICAgZ3JpZC1hcmVhOiBidXR0b25zO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAucHJvamVjdHNfbGlzdCA+ICoge1xuICAgIC8qIGRpc3BsYXk6IGdyaWQ7ICovXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICoge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpob3ZlciBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gc3BhbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IC5uYXZfcHJvamVjdCA+IHNwYW4ge1xuICAgIGZsZXg6IDE7XG59XG5cbi5idG5fYWRkX3Byb2plY3QsXG4uYnRuX2RlbGV0ZV9wcm9qZWN0IHtcbiAgICAvKiBkaXNwbGF5OiBncmlkO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTsgKi9cbn1cblxuLm5hdl9wcm9qZWN0ID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMS4xNXJlbSwgNHZ3LCAxLjVyZW0pO1xuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xufVxuXG4uYnRuX2FkZF9wcm9qZWN0ID4gaW1nLFxuLmJ0bl9hZGRfcHJvamVjdCA+IC5idG5faW1nX3dyYXBwZXIgPiBpbWcsXG4uYnRuX2RlbGV0ZV9wcm9qZWN0ID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMS40NXJlbSwgNHZ3LCAxLjVyZW0pO1xufVxuXG4uYnRuX2FkZF9wcm9qZWN0IHtcbiAgICAvKiBkaXNwbGF5OiBncmlkOyAqL1xuICAgIC8qIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyOyAqL1xuICAgIC8qIGFsaWduLWl0ZW1zOiBjZW50ZXI7ICovXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxPQUFPO0FBQ1g7O0FBRUE7O0lBRUk7O21CQUVlO0FBQ25COztBQUVBO0lBQ0ksa0NBQWtDO0lBQ2xDLG9CQUFvQjtBQUN4Qjs7QUFFQTs7O0lBR0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLDRDQUE0QztJQUM1Qyx5QkFBeUI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnByb2plY3RzX2xpc3QgPiAqIHtcXG4gICAgLyogZGlzcGxheTogZ3JpZDsgKi9cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpob3ZlciBzcGFuIHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IHNwYW4ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4OiAxO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IC5uYXZfcHJvamVjdCA+IHNwYW4ge1xcbiAgICBmbGV4OiAxO1xcbn1cXG5cXG4uYnRuX2FkZF9wcm9qZWN0LFxcbi5idG5fZGVsZXRlX3Byb2plY3Qge1xcbiAgICAvKiBkaXNwbGF5OiBncmlkO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lOyAqL1xcbn1cXG5cXG4ubmF2X3Byb2plY3QgPiBpbWcge1xcbiAgICB3aWR0aDogY2xhbXAoMS4xNXJlbSwgNHZ3LCAxLjVyZW0pO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJ0bl9hZGRfcHJvamVjdCA+IGltZyxcXG4uYnRuX2FkZF9wcm9qZWN0ID4gLmJ0bl9pbWdfd3JhcHBlciA+IGltZyxcXG4uYnRuX2RlbGV0ZV9wcm9qZWN0ID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDEuNDVyZW0sIDR2dywgMS41cmVtKTtcXG59XFxuXFxuLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgIC8qIGRpc3BsYXk6IGdyaWQ7ICovXFxuICAgIC8qIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyOyAqL1xcbiAgICAvKiBhbGlnbi1pdGVtczogY2VudGVyOyAqL1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNzaWRlYmFyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLyogei1pbmRleDogMTsgKi9cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4jc2lkZWJhci5oaWRlIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNzaWRlYmFyLnNob3cge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNzaWRlYmFyID4gLmNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAxcmVtO1xuICAgIHBhZGRpbmc6IDEuMjVyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUpO1xuICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcbiAgICB3aWR0aDogNjUlO1xufVxuXG4ubmF2X3Byb2plY3QsXG4ubmF2X3Byb2plY3RzIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzIHtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQ6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuI3NpZGViYXIgPiAuY29udGFpbmVyOmhvdmVyIC5idG5fYWRkX3Byb2plY3Qge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkID4gLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIGp1c3RpZnktc2VsZjogZW5kO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XG4gICAgI3NpZGViYXIge1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICB9XG5cbiAgICAjc2lkZWJhci5zaG93IHtcbiAgICAgICAgd2lkdGg6IDMwJTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgfVxuXG4gICAgI3NpZGViYXIuaGlkZSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgI3NpZGViYXIgPiAuY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgc2xpZGUtaW4tcmlnaHQge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6Qix1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLG9DQUFvQztJQUNwQyw2Q0FBNkM7SUFDN0MsVUFBVTtBQUNkOztBQUVBOztJQUVJLHFCQUFxQjtJQUNyQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksT0FBTztJQUNQLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSTtRQUNJLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsY0FBYztJQUNsQjs7SUFFQTtRQUNJLFVBQVU7UUFDVixjQUFjO1FBQ2QsMkNBQTJDO0lBQy9DOztJQUVBO1FBQ0ksYUFBYTtJQUNqQjs7SUFFQTtRQUNJLFdBQVc7UUFDWCw2Q0FBNkM7SUFDakQ7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksNEJBQTRCO0lBQ2hDOztJQUVBO1FBQ0kseUJBQXlCO0lBQzdCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI3NpZGViYXIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAvKiB6LWluZGV4OiAxOyAqL1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuI3NpZGViYXIuaGlkZSB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jc2lkZWJhci5zaG93IHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDMwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jc2lkZWJhciA+IC5jb250YWluZXIge1xcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDFyZW07XFxuICAgIHBhZGRpbmc6IDEuMjVyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1KTtcXG4gICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xcbiAgICB3aWR0aDogNjUlO1xcbn1cXG5cXG4ubmF2X3Byb2plY3QsXFxuLm5hdl9wcm9qZWN0cyB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xcbiAgICBmbGV4OiAxO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuI3NpZGViYXIgPiAuY29udGFpbmVyOmhvdmVyIC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XFxuICAgICNzaWRlYmFyIHtcXG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICAgICAgd2lkdGg6IGluaGVyaXQ7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIuc2hvdyB7XFxuICAgICAgICB3aWR0aDogMzAlO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBhbmltYXRpb246IHNsaWRlLWluLXJpZ2h0IDMwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyLmhpZGUge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcblxcbiAgICAjc2lkZWJhciA+IC5jb250YWluZXIge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBib3gtc2hhZG93OiAxcHggNHB4IDVweCAtMXB4IHJnYmEoMCwgMCwgMCwgMSk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBzbGlkZS1pbi1yaWdodCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI21vZGFsOjpiYWNrZHJvcCAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuI21vZGFsIHtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbWluLXdpZHRoOiA3MHZ3O1xuICAgIG1pbi1oZWlnaHQ6IDUwdmg7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbiNtb2RhbCAuZm9ybV90YXNrLm1vZGFsIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtBQUNqQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjbW9kYWw6OmJhY2tkcm9wICB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxuI21vZGFsIHtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBtaW4td2lkdGg6IDcwdnc7XFxuICAgIG1pbi1oZWlnaHQ6IDUwdmg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuI21vZGFsIC5mb3JtX3Rhc2subW9kYWwge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYFxuLnRhc2tzX2xpc3Qge1xuICAgIC8qIHdpZHRoOiA2MCU7ICovXG59XG5cbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcbiAgICByb3ctZ2FwOiAxcmVtO1xufVxuXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXg6IDE7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDY2LCA2NiwgNjYsIDAuNSk7XG4gICAgcGFkZGluZzogMXJlbSAwLjI1cmVtO1xuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fcmFkaW9fdGFzayxcbi50YXNrX2FjdGlvbnMgPiAqLFxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC50YXNrX2xpc3RfaXRlbV9jb250ZW50ID4gLnRhc2tfZHVlX2RhdGVfdGltZSA+ICoge1xuICAgIC8qIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrOyAqL1xufVxuXG4uYnRuX3JhZGlvX3Rhc2sge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbi50YXNrX2xpc3RfaXRlbV9jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjE1cmVtO1xufVxuXG4udGFza19saXN0X2l0ZW1fY29udGVudCA+IC50YXNrX25hbWUge1xuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciAudGFza19hY3Rpb25ze1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi50YXNrX2FjdGlvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uYnRuX2RhdGVfdGFzayB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucHJpb3JpdHlfMSB7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogI2ZmYTUwMDsgKi9cbn1cblxuLnByaW9yaXR5XzIge1xuXG59XG5cbi5wcmlvcml0eV8zIHtcblxufVxuXG4uYnRuX2FkZF90YXNrIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1pdGVtczogZmxleC1zdGFydDtcbn1cblxuLmJ0bl9hZGRfdGFzayA+IC5idG5faW1nX3dyYXBwZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5idG5fYWRkX3Rhc2sgPiAuYnRuX2ltZ193cmFwcGVyID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMS40NXJlbSwgNHZ3LCAxLjVyZW0pO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4Q0FBOEM7SUFDOUMscUJBQXFCO0lBQ3JCLGtCQUFrQjtBQUN0Qjs7QUFFQTs7O0lBR0ksNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLE9BQU87SUFDUCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLCtCQUErQjtBQUNuQzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUJBQW1CO0lBQ25CLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuLnRhc2tzX2xpc3Qge1xcbiAgICAvKiB3aWR0aDogNjAlOyAqL1xcbn1cXG5cXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XFxuICAgIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleDogMTtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDY2LCA2NiwgNjYsIDAuNSk7XFxuICAgIHBhZGRpbmc6IDFyZW0gMC4yNXJlbTtcXG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9yYWRpb190YXNrLFxcbi50YXNrX2FjdGlvbnMgPiAqLFxcbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIgPiAudGFza19saXN0X2l0ZW1fY29udGVudCA+IC50YXNrX2R1ZV9kYXRlX3RpbWUgPiAqIHtcXG4gICAgLyogYm9yZGVyOiAycHggc29saWQgYmxhY2s7ICovXFxufVxcblxcbi5idG5fcmFkaW9fdGFzayB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbV9jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC4xNXJlbTtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtX2NvbnRlbnQgPiAudGFza19uYW1lIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIC50YXNrX2FjdGlvbnN7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi50YXNrX2FjdGlvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uYnRuX2RhdGVfdGFzayB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wcmlvcml0eV8xIHtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogI2ZmYTUwMDsgKi9cXG59XFxuXFxuLnByaW9yaXR5XzIge1xcblxcbn1cXG5cXG4ucHJpb3JpdHlfMyB7XFxuXFxufVxcblxcbi5idG5fYWRkX3Rhc2sge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IDFmcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmJ0bl9hZGRfdGFzayA+IC5idG5faW1nX3dyYXBwZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uYnRuX2FkZF90YXNrID4gLmJ0bl9pbWdfd3JhcHBlciA+IGltZyB7XFxuICAgIHdpZHRoOiBjbGFtcCgxLjQ1cmVtLCA0dncsIDEuNXJlbSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0cy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfZm9ybS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2Zvcm0uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2xpc3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19saXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaWRlYmFyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2lkZWJhci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfZm9ybS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2Zvcm0uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2xpc3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19saXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IGJ1aWxkSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xuaW1wb3J0IGJ1aWxkU2lkZUJhciBmcm9tICcuL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyJztcbmltcG9ydCBidWlsZE1haW4gZnJvbSAnLi9jb21wb25lbnRzL21haW4nO1xuaW1wb3J0IHsgc2V0UHJvamVjdHMgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XG5pbXBvcnQgYnVpbGRPdmVybGF5IGZyb20gJy4vY29tcG9uZW50cy9vdmVybGF5JztcbmltcG9ydCAnLi9hcHAuY3NzJztcblxuY29uc3QgYXBwQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBidWlsZCA9IHtcbiAgICAgICAgaGVhZGVyOiBidWlsZEhlYWRlcixcbiAgICAgICAgc2lkZWJhcjogYnVpbGRTaWRlQmFyLFxuICAgICAgICBvdmVybGF5OiBidWlsZE92ZXJsYXksXG4gICAgICAgIG1haW46IGJ1aWxkTWFpbixcbiAgICB9XG5cbiAgICBjb25zdCBhcHAgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0UHJvamVjdHMoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXBwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgYXBwQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXBwV3JhcHBlci5pZCA9ICd0b2RvX2FwcCc7XG4gICAgICAgICAgICBhcHBDb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuXG4gICAgICAgICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkLmhlYWRlcigpKTtcbiAgICAgICAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQub3ZlcmxheSgpKTtcbiAgICAgICAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQuc2lkZWJhcigpKTtcbiAgICAgICAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQubWFpbigpKTtcbiAgICAgICAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwQ29udGVudCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwV3JhcHBlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgYXBwLmluaXQoKTtcbn0pKCk7XG5cbi8vbWFpblxuICAgIC8vIDEuIHZpZXcgYWxsIHByb2plY3RzXG4gICAgLy8gMi4gdmlldyBhbGwgdG9kb3MgaW4gZWFjaCBwcm9qZWN0XG4gICAgLy8gMy4gZXhwYW5kIGEgc2luZ2xlIHRvZG8gdG8gc2VlL2VkaXQgaXRzIGRldGFpbHNcbiAgICAvLyA0LiBkZWxldGUgYSB0b2RvXG5cbiAgICAvLyB0b2RvIGxpc3QgaXRlbVxuICAgICAgICAvLyBjcmVhdGUgaXRlbSBidXR0b25cbiAgICAgICAgLy8gcmVuZGVycyBmb3JtXG4gICAgICAgICAgICAvLyB0aXRsZSwgcmVxdWlyZWRcbiAgICAgICAgICAgIC8vIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAvLyBkdWUgZGF0ZVxuICAgICAgICAgICAgICAgIC8vcmVuZGVycyBmb3JtXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b2RheSwgdG9tb3Jyb3csIG5vIGRhdGVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGltZVxuICAgICAgICAgICAgICAgICAgICAvLyBjYW5jZWwgYW5kIHNhdmUgYnV0dG9uXG4gICAgICAgICAgICAvLyBwcm9qZWN0IGxhYmVsL3RhZ1xuICAgICAgICAgICAgLy8gc3VibWl0XG4gICAgICAgIC8vIGRlbGV0ZVxuICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAvLyByZW9yZGVyIHRvZG8gbGlzdCBpdGVtXG4gICAgICAgIC8vIGNoYW5nZSBwcmlvcml0eVxuICAgIC8vIGNyZWF0ZSBuZXcgdG9kbyBsaXN0IGl0ZW1cblxuLy8gdG9kbyBsaXN0IE9CSkVDVFxuICAgIC8vIHRpdGxlXG4gICAgLy8gZGVzY3JpcHRpb25cbiAgICAgICAgLy8gc3VidGFza1xuICAgIC8vIHJlbWluZGVyXG4gICAgLy8gZHVlIGRhdGVcbiAgICAvLyB0aW1lXG4gICAgLy8gcHJpb2lydHlcblxuLy8gd2VicGFjayBleHRlcm5hbCBsaWJyYXJ5OiBkYXRlLWZuc1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FkZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvYWRkLnN2Z1wiLFxuXHRcIi4vY2hlY2tfc21hbGwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZWNrX3NtYWxsLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vY2lyY2xlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NvZy5zdmdcIixcblx0XCIuL2RhdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RhdGUuc3ZnXCIsXG5cdFwiLi9kZWxldGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIixcblx0XCIuL2VkaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCIsXG5cdFwiLi9naXRodWItbWFyay9naXRodWItbWFyay13aGl0ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCIsXG5cdFwiLi9naXRodWItbWFyay9naXRodWItbWFyay5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmsuc3ZnXCIsXG5cdFwiLi9ob21lLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9ob21lLnN2Z1wiLFxuXHRcIi4vaW5ib3guc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2luYm94LnN2Z1wiLFxuXHRcIi4vbWFnbmlmeS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWFnbmlmeS5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCIsXG5cdFwiLi9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiLFxuXHRcIi4vdG9kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3RvZGF5LnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyByZWN1cnNpdmUgXFxcXC5zdmckXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FkZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvYWRkLnN2Z1wiLFxuXHRcIi4vY2hlY2tfc21hbGwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZWNrX3NtYWxsLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vY2lyY2xlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NvZy5zdmdcIixcblx0XCIuL2RhdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RhdGUuc3ZnXCIsXG5cdFwiLi9kZWxldGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIixcblx0XCIuL2VkaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCIsXG5cdFwiLi9ob21lLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9ob21lLnN2Z1wiLFxuXHRcIi4vaW5ib3guc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2luYm94LnN2Z1wiLFxuXHRcIi4vbWFnbmlmeS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWFnbmlmeS5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCIsXG5cdFwiLi9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiLFxuXHRcIi4vdG9kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3RvZGF5LnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyBcXFxcLnN2ZyRcIjsiLCIvLyBtb2R1bGUgdGhhdCB3aWxsIGNyZWF0ZSBidXR0b25zXG4gICAgLy8gYWRkIHByb2plY3QvdGFza1xuICAgIC8vIGRlbGV0ZSBwcm9qZWN0L3Rhc2tcbiAgICAvLyBlZGl0IHRhc2tcbiAgICBpbXBvcnQgSWNvbkFkZCBmcm9tICcuLi9hc3NldHMvaWNvbnMvYWRkLnN2Zyc7XG4gICAgaW1wb3J0IEljb25EZWxldGUgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmcnO1xuICAgIGltcG9ydCBJY29uRWRpdCBmcm9tICcuLi9hc3NldHMvaWNvbnMvZWRpdC5zdmcnO1xuICAgIGltcG9ydCBJY29uUmFkaW8gZnJvbSAnLi4vYXNzZXRzL2ljb25zL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkRhdGUgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2RhdGUuc3ZnJztcbiAgICAvLyByZXR1cm5zIGEgYnV0dG9uIGVsZW1lbnQgdG8gY3JlYXRlIGEgcHJvamVjdC90YXNrXG4gICAgLy8gaWYgc3BhblRleHQgcHJvdmlkZWQsIHRoZW4gYSBzcGFuIGVsZW1lbnQgaXMgY3JlYXRlZFxuICAgIGNvbnN0IGljb25zID0geyBhZGQ6IEljb25BZGQsIGRlbGV0ZTogSWNvbkRlbGV0ZSwgZWRpdDogSWNvbkVkaXQsIHJhZGlvOiBJY29uUmFkaW8sIGRhdGU6IEljb25EYXRlIH07XG5cbiAgICBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEJ1dHRvbih0eXBlLCBuYW1lLCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksIGJ1dHRvbkF0dHJpYnV0ZXModHlwZSwgbmFtZSkpOyAgICBcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaWNvbnNbdHlwZV07XG4gICAgXG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdidG5faW1nX3dyYXBwZXInKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYnV0dG9uQXR0cmlidXRlcyA9ICh0eXBlLCBuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHtcbiAgICAgICAgICAgIC8vIGNsYXNzTmFtZTogYnRuX2RlbGV0ZV9wcm9qZWN0XG4gICAgICAgICAgICBjbGFzc05hbWU6IGBidG5fJHt0eXBlfV8ke25hbWV9YCxcbiAgICAgICAgICAgIHR5cGU6IGBidXR0b25gLFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfSIsImltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vdXRpbGl0aWVzL2ltcG9ydC1hbGwnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInOyAvLyBjb25uZWN0IC5idG5faG9tZSB0byBtYWluQ29udGVudC5zd2l0Y2hDb250ZW50XG5pbXBvcnQgYnVpbGRUYXNrc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19mb3JtJztcbmltcG9ydCAnLi4vc3R5bGVzL2hlYWRlci5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcihhcHAsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXIucmVuZGVyKCkpO1xuICAgIGhlYWRlci5jYWNoZURPTShoZWFkZXJFbGVtZW50KTtcbiAgICBoZWFkZXIuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gICAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pY29ucycsIHRydWUsIC9cXC5zdmckLykpLFxufVxuXG5jb25zdCBoZWFkZXIgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmJ0bk1lbnUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9tZW51Jyk7XG4gICAgICAgIHRoaXMuYnRuSG9tZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2hvbWUnKTtcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5idG5fYWRkX3Rhc2snKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gpO1xuICAgICAgICB0aGlzLmJ0bkhvbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gpOyAvLyB0ZXN0aW5nXG4gICAgICAgIHRoaXMuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkVGFza3NGb3JtKTtcbiAgICB9LFxuICAgIGhlYWRlckNvbnRlbnQ6IHtcbiAgICAgICAgaGVhZGVyTGVmdDogW1xuICAgICAgICAgICAge2VsZW1lbnQ6ICdidXR0b24nLCBjbGFzczogJ2J0bl9tZW51JywgY2hpbGRFbGVtZW50OiAnaW1nJywgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ21lbnUuc3ZnJ119LFxuICAgICAgICAgICAge2VsZW1lbnQ6ICdidXR0b24nLCBjbGFzczogJ2J0bl9ob21lJywgY2hpbGRFbGVtZW50OiAnaW1nJywgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ2hvbWUuc3ZnJ119LFxuICAgICAgICAgICAge2VsZW1lbnQ6ICdpbnB1dCcsIGNsYXNzOiAnaW5wdXRfc2VhcmNoJywgcGxhY2Vob2xkZXI6ICdTZWFyY2gnfVxuICAgICAgICBdLFxuICAgICAgICBoZWFkZXJSaWdodDogW1xuICAgICAgICAgICAge2VsZW1lbnQ6ICdidXR0b24nLCBjbGFzczogJ2J0bl9hZGRfdGFzaycsIGNoaWxkRWxlbWVudDogJ2ltZycsIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydhZGQuc3ZnJ119LFxuICAgICAgICAgICAgLy8ge2VsZW1lbnQ6ICdidXR0b24nLCBjbGFzczogJ2J0LXNldHRpbmdzbicsIGNoaWxkRWxlbWVudDogJ2ltZywgc3JjOiBudWxsfSxcbiAgICAgICAgICAgIHtlbGVtZW50OiAnYScsIGNsYXNzOiAnZ2l0aHViJywgY2hpbGRFbGVtZW50OiAnaW1nJywgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLXdoaXRlLnN2ZyddLCBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL21pa2V5Q29zL3RoZU9kaW5Qcm9qZWN0L3RyZWUvbWFpbi9qYXZhU2NyaXB0L3Byb2plY3RzL3RvZG8tbGlzdCcsIHRhcmdldDogJ19ibGFuayd9XG4gICAgICAgIF0sXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuaWQgPSAnbmF2YmFyJztcblxuICAgICAgICBmb3IgKGxldCBzZWN0aW9uIGluIHRoaXMuaGVhZGVyQ29udGVudCkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsZXQgd3JhcHBlckNsYXNzO1xuICAgICAgICAgICAgc2VjdGlvbiA9PT0gJ2hlYWRlckxlZnQnID8gd3JhcHBlckNsYXNzID0gJ25hdl9sZWZ0JyA6IHdyYXBwZXJDbGFzcyA9ICduYXZfcmlnaHQnO1xuICAgICAgICAgICAgaGVhZGVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKHdyYXBwZXJDbGFzcyk7XG4gICAgICAgICAgICBoZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyQ29udGVudFtzZWN0aW9uXS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICBoZWFkZXJJdGVtLmNsYXNzTGlzdC5hZGQoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICAgICAgaWYgKCdwbGFjZWhvbGRlcicgaW4gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJJdGVtLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBpdGVtLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5jaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSWNvbi5zcmMgPSBpdGVtLnNyYztcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVySXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhlYWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJJdGVtKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlckNvbnRhaW5lcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJXcmFwcGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVyRWxlbWVudDtcbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICBsZXQgc3Vic2NyaWJlcjtcbiAgICAgICAgaWYgKGNsYXNzTmFtZS5pbmNsdWRlcygnaG9tZScpKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyID0gJ2NvbnRlbnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3Vic2NyaWJlciA9ICdzaWRlYmFyJ1xuICAgICAgICB9XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKHN1YnNjcmliZXIsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbn0iLCJpbXBvcnQgYnVpbGRQcm9qZWN0cyBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzJztcbmltcG9ydCBidWlsZFByb2plY3RUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RfdGFza3MnO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3QtY29udHJvbGxlcic7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWFpbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgIG1haW4uaWQgPSAnbWFpbl9jb250ZW50JztcbiAgICBtYWluQ29udGVudC5jYWNoZURPTShtYWluKTtcbiAgICBtYWluQ29udGVudC5yZW5kZXIoKTtcbiAgICBtYWluQ29udGVudC5iaW5kRXZlbnRzKCk7XG5cbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdjb250ZW50JywgbWFpbkNvbnRlbnQuc3dpdGNoQ29udGVudCk7XG5cbiAgICByZXR1cm4gbWFpbjtcbn1cblxuY29uc3QgYnVpbGQgPSB7XG4gICAgcHJvamVjdHM6IGJ1aWxkUHJvamVjdHMsXG4gICAgcHJvamVjdDogYnVpbGRQcm9qZWN0VGFza3MsXG59XG5cbmV4cG9ydCBjb25zdCBtYWluQ29udGVudCA9IHtcbiAgICBhY3RpdmVDb250ZW50OiBudWxsLFxuICAgIGFjdGl2ZVRhYjogbnVsbCxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMubWFpbiA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5tYWluT3ZlcmxheSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheV9tYWluX2NvbnRlbnQnKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oa2V5LCB1dWlkKSB7XG4gICAgICAgIGxldCBjb250ZW50O1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgY29udGVudCA9IGJ1aWxkWydwcm9qZWN0J10ocHJvamVjdENvbnRyb2xsZXIudG9kYXlbMF0udXVpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1haW4ubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29udGVudCA9IGJ1aWxkW2tleV0odXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVDb250ZW50KGNvbnRlbnQpO1xuICAgICAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zd2l0Y2hDb250ZW50ID0gdGhpcy5zd2l0Y2hDb250ZW50LmJpbmQodGhpcyk7XG4gICAgfSxcbiAgICBzd2l0Y2hDb250ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBjbGFzc1N1YnN0cmluZyA9IGUuY2xhc3NOYW1lLmluY2x1ZGVzKCdkZWxldGUnKSA/IGUuY2xhc3NOYW1lLnN1YnN0cmluZyhlLmNsYXNzTmFtZS5pbmRleE9mKCdfJykgKyAxLCBlLmNsYXNzTmFtZS5sYXN0SW5kZXhPZignXycpKSA6IGUuY2xhc3NOYW1lLnN1YnN0cmluZyhlLmNsYXNzTmFtZS5sYXN0SW5kZXhPZignXycpICsgMSk7XG4gICAgICAgIGxldCB1dWlkID0gZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQudXVpZCB8fCBlLmRhdGFzZXQuaW5ib3hVdWlkO1xuICAgICAgICBsZXQgcmVuZGVyS2V5ID0gT2JqZWN0LmtleXMoYnVpbGQpLmZpbmQoa2V5ID0+IGtleSA9PT0gY2xhc3NTdWJzdHJpbmcpO1xuICAgICAgICBsZXQgYXJncyA9IFsncHJvamVjdCcsIHV1aWRdO1xuXG4gICAgICAgIGlmIChyZW5kZXJLZXkgJiYgdXVpZCkge1xuICAgICAgICAgICAgLy8gcmVuZGVycyByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKGUpO1xuICAgICAgICAgICAgYXJnc1swXSA9IHJlbmRlcktleTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVuZGVyS2V5ICYmICF1dWlkKSB7XG4gICAgICAgICAgICAvLyBpZiBob21lIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVycyB0aGUgdG9kYXkgc2VjdGlvblxuICAgICAgICAgICAgYXJnc1sxXSA9IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY2xhc3NTdWJzdHJpbmcgPT09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAvLyBpZiBhIHByb2plY3QgaXMgdGhlIGNvbnRlbnQgYW5kIGlzIGRlbGV0ZWQsXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVycyB0aGUgaW5ib3ggc2VjdGlvblxuICAgICAgICAgICAgYXJnc1sxXSA9IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYihlKTtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSAncHJvamVjdHMnO1xuICAgICAgICB9XG4gICAgICAgIG1haW5Db250ZW50LnJlbmRlcihhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICB9LFxuICAgIHNldEFjdGl2ZVRhYjogZnVuY3Rpb24odGFiKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVRhYikge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYjtcbiAgICB9LFxuICAgIHNldEFjdGl2ZUNvbnRlbnQ6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuYWN0aXZlQ29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcblxuLy8gbWltaWNzIGFsZXJ0IGJveCBjb25maXJtaW5nIHRhc2svcHJvamVjdCByZW1vdmFsXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1vZGFsUmVtb3ZlKG9iaikge1xuICAgIGNvbnNvbGUubG9nKGBidWlsZE1vZGFsUmVtb3ZlKCkgaXMgcnVubmluZyBmcm9tIG1tb2RhbF9yZW1vdmUuanNgKTtcbiAgICBjb25zdCBkaWFsb2dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGlhbG9nJyk7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhvYmopXG4gICAgZGlhbG9nRWxlbWVudC5pZCA9ICdtb2RhbCc7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtX3JlbW92YWwnKTtcblxuICAgIGNvbnN0IG1vZGFsID0gYnVpbGRNb2RhbChkaWFsb2dFbGVtZW50LCBmb3JtLCBvYmopO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobW9kYWwucmVuZGVyKCkpO1xuICAgIG1vZGFsLmNhY2hlRE9NKCk7XG4gICAgbW9kYWwuYmluZEV2ZW50cygpO1xuXG4gICAgZGlhbG9nRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO2RpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG59XG5cbmNvbnN0IGJ1aWxkTW9kYWwgPSAoZGlhbG9nRWxlbWVudCwgZm9ybSwgb2JqKSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBkaWFsb2dFbGVtZW50LFxuICAgICAgICBmb3JtLFxuICAgICAgICB0eXBlOiBvYmoudHlwZSxcbiAgICAgICAgb2JqLFxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgbW9kYWwoc3RhdGUpLFxuICAgIClcblxufVxuXG5jb25zdCBtb2RhbCA9IChzdGF0ZSkgPT4gKHtcbiAgICBkaWFsb2dFbGVtZW50OiBzdGF0ZS5kaWFsb2dFbGVtZW50LFxuICAgIGZvcm06IHN0YXRlLmZvcm0sXG4gICAgdHlwZTogc3RhdGUudHlwZSxcbiAgICBzZWxlY3Rpb246IHN0YXRlLm9iaixcbiAgICBidXR0b25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCcsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgdGV4dDogJ0RlbGV0ZScsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF9yZW1vdmUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXSxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2FuY2VsJyk7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fc3VibWl0X3JlbW92ZScpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlRm9ybSA9IHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbCA9IHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlRm9ybSk7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBEZWxldGU/XG4gICAgICAgIC8vIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgcHJvamVjdFxuICAgICAgICAvLyBDYW5jZWwgYW5kIGRlbGV0ZSBidXR0b25zXG5cbiAgICAgICAgLy8gTmVlZCBwcm9qZWN0LnRpdGxlIGFuZCB0YXNrLm5hbWVcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1hdGlvbk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHVuaXF1ZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0RlbGV0ZT8nXG4gICAgICAgIGNvbmZpcm1hdGlvbk1lc3NhZ2UudGV4dENvbnRlbnQgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBgO1xuICAgICAgICB1bmlxdWVUZXh0LnRleHRDb250ZW50ID0gdGhpcy5zZWxlY3Rpb24udGl0bGUgPyB0aGlzLnNlbGVjdGlvbi50aXRsZSA6IHRoaXMuc2VsZWN0aW9uLm5hbWU7XG4gICAgICAgIGNvbmZpcm1hdGlvbk1lc3NhZ2UuYXBwZW5kQ2hpbGQodW5pcXVlVGV4dClcbiAgICAgICAgLy8gPHA+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSA8c3Bhbj4ke3RoaXMudGV4dH08L3NwYW4+PzwvcD5cblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbmZpcm1hdGlvbk1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KSwgaXRlbS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3Rhc2snKSB7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgncmVtb3ZlVGFzaycsIHRoaXMuc2VsZWN0aW9uLnV1aWRUYXNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0aW9uLnV1aWQpO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVByb2plY3QnLCB0aGlzLnNlbGVjdGlvbi51dWlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgIH0sXG4gICAgY2xvc2VGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpXG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9LFxuICAgIGNsb3NlTW9kYWw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGNsb3NlTW9kYWwgcnVubmluZyBmcm9tIG1vZGFsX3JlbW92ZS5qc2ApO1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdtb2RhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG59KSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRPdmVybGF5KCkge1xuICAgIHJldHVybiBvdmVybGF5LnJlbmRlcigpO1xufVxuXG5jb25zdCBvdmVybGF5ID0ge1xuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gY29udGFpbmVyO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXlfbWFpbl9jb250ZW50Jyk7XG4gICAgICAgIHRoaXMuY2FjaGVET00ob3ZlcmxheSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIHJldHVybiBvdmVybGF5O1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGltT3ZlcmxheSA9IHRoaXMuZGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdkaW0nLCBvdmVybGF5LmRpbU92ZXJsYXkpO1xuICAgIFxuICAgIH0sXG4gICAgdW5iaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gcHViU3ViLnVuc3Vic2NyaWJlKCdkaW0nLCBvdmVybGF5LmRpbU92ZXJsYXkpO1xuICAgIH0sXG4gICAgZGltT3ZlcmxheTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSB8fCB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2RpbScpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlLmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnZGltJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdhdGNoU2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gdGhpcy5nZXRXaW5kb3dXaWR0aCA9IHRoaXMuZ2V0V2luZG93V2lkdGguYmluZCh0aGlzKTtcbiAgICB9LFxufSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRUYXNrc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19mb3JtJztcbmltcG9ydCB7IHRhc2tzTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfbGlzdCc7XG5cbi8vIHJlbmRlcnMgYSBwcm9qZWN0J3MgcGFnZSBhbmQgaXQncyB0YXNrc1xuLy8gd2hlbiB3ZSBhcmUgYXQgYSBwcm9qZWN0J3MgcGFnZVxuICAgIC8vIHdlIGRlbGV0ZSBpdCBmcm9tIHRoZXJlIG9yIGZyb20gdGhlIHNpZGViYXJcbiAgICAgICAgLy8gY2hhbmdlIGNvbnRlbnQgdG8gaG9tZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcm9qZWN0VGFza3ModXVpZCkge1xuICAgIGNvbnNvbGUubG9nKGB0YXNrcy5qcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBY3RpdmUodXVpZCk7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RDb250cm9sbGVyLmZpbmQodXVpZCk7XG4gICAgcHJvamVjdFRhc2tzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBwcm9qZWN0VGFza3MucmVuZGVyKCk7XG4gICAgcHJvamVjdFRhc2tzLmNhY2hlRE9NKGNvbnRlbnQpO1xuICAgIHByb2plY3RUYXNrcy5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0VGFza3MgPSB7XG4gICAgcHJvamVjdDogbnVsbCxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMucHJvamVjdFRhc2tzQ29udGFpbmVyID0gY29udGFpbmVyXG4gICAgICAgIHRoaXMudWxMaXN0ID0gdGhpcy5wcm9qZWN0VGFza3NDb250YWluZXIucXVlcnlTZWxlY3RvcignLnRhc2tzX2xpc3QnKTtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy51bExpc3QuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfdGFzaycpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkVGFza3NGb3JtKTtcbiAgICAgICAgLy8gdGhpcyB3aWxsIG5lZWQgdG8gZ2VuZXJhdGUgYSBmb3JtXG4gICAgICAgICAgICAvLyByZW1vdmVzIHRoZSBidXR0b25cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGByZW5kZXIoKSBpbiBwcm9qZWN0X3Rhc2tzLmpzIGlzIHJ1bm5pbmdgKTsgLy8gZm9yIGRlYnVnZ2luZ1xuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICAgICAgICAvLyBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7IC8vIHJlbmFtZT9cbiAgICAgICAgXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCd0YXNrc19saXN0Jyk7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGFza3NMaXN0LmluaXQoKSk7IC8vIHNvbWV0aGluZyBmaXNoaW5nIGlzIGdvaW5nIG9uXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAndGFzaycsICdBZGQgdGFzaycpKTtcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG5cbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdCk7XG5cblxuICAgICAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbiAgICB9LFxufSIsImltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9idXR0b25zJztcbmltcG9ydCBidWlsZFByb2plY3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfZm9ybSc7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdHMoKSB7XG4gICAgY29uc29sZS5sb2coYHByb2plY3RzLmpzIHJ1bm5pbmdgKTtcblxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ1BST0pFQ1RTJztcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdHMucmVuZGVyKCkpO1xuICAgIFxuICAgIHByb2plY3RzLmNhY2hlRE9NKHByb2plY3RzQ29udGFpbmVyKTtcbiAgICBwcm9qZWN0cy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbn1cblxuY29uc3QgcHJvamVjdHMgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfcHJvamVjdCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkUHJvamVjdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYW5jaG9yV3JhcHBlci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdHMnKTtcblxuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAncHJvamVjdCcsICdBZGQgcHJvamVjdCcpKTsgICAgICAgIFxuICAgICAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnY29udGVudCcsIHBhcmVudENvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZCgnY29udGVudCcpLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoJ2NvbnRlbnQnKS5pbml0KCk7XG4gICAgICAgIHJldHVybiBwYXJlbnRDb250YWluZXI7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzcyc7XG5cbi8vIHJlbmRlcnMgYSBmb3JtIHRvIGNyZWF0ZSBhIHByb2plY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdEZvcm0oKSB7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAnZm9ybV9wcm9qZWN0JztcbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm1Qcm9qZWN0LnJlbmRlcigpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gICAgZm9ybVByb2plY3QuY2FjaGVET00oKTtcbiAgICBmb3JtUHJvamVjdC5iaW5kRXZlbnRzKCk7XG59XG5cbmNvbnN0IGZvcm1Qcm9qZWN0ID0ge1xuICAgIGZvcm1DaGlsZHJlbjoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIG5hbWU6ICd0aXRsZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIFByb2plY3QgVGl0bGUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBmb3JtQnV0dG9uczoge1xuICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF9wcm9qZWN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybV9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNmb3JtIGlucHV0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwgPSB0aGlzLnJlbW92ZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgdGhpcy5yZW1vdmVNb2RhbClcbiAgICAgICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZU1vZGFsKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0Rm9ybSk7XG4gICAgfSxcbiAgICAvLyB0YWtlIGEgbG9vayBhdCByZXN0YXVyYW50IHByb2plY3QncyBjb250YWN0IG1vZHVsZVxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBjb25zdCBmb3JtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgZm9ybUJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9ybUJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnZm9ybV9idXR0b25zJyk7XG4gICAgICAgIGZvcm1FbGVtZW50LmlkID0gJ2Zvcm0nO1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcik7XG5cbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIHRoaXMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybV9pdGVtJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5oYXNPd25Qcm9wZXJ0eSgncmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSwgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXSk7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBmb3JtQ2hpbGQ7XG4gICAgICAgICAgICAgICAgbGFiZWwuaHRtbEZvciA9IHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uaWQ7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGJ0biBpbiB0aGlzLmZvcm1CdXR0b25zKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJ1dHRvbiwgdGhpcy5mb3JtQnV0dG9uc1tidG5dKTtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBidG47XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUJ1dHRvbnMpO1xuXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudFxuICAgIH0sXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0RJQUxPRycpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gb3B0aW9uYWwsIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgICAgLy8gaWYgZm9ybSBpcyB2YWxpZFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gYWRkUHJvamVjdCgpXG4gICAgICAgIC8vIGFkZFByb2plY3QodGhpcy5mb3JtSW5wdXRzKTtcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuYWRkUHJvamVjdCh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAvLyBidWlsZExpc3QubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBtb2R1bGUucmVuZGVyKCkpXG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKCdzaWRlYmFyJykucmVuZGVyKCk7IC8vIHdpbGwgcmVuZGVyIG9ubHkgdGhlIHNpZGViYXJcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3NpZGViYXInKTtcbiAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkTW9kYWxSZW1vdmUgZnJvbSAnLi9tb2RhbF9yZW1vdmUnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0IEljb25JbmJveCBmcm9tICcuLi9hc3NldHMvaWNvbnMvaW5ib3guc3ZnJztcbmltcG9ydCBJY29uVG9kYXkgZnJvbSAnLi4vYXNzZXRzL2ljb25zL3RvZGF5LnN2Zyc7XG5pbXBvcnQgSWNvblByb2plY3QgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2NpcmNsZS5zdmcnO1xuaW1wb3J0ICcuLi9zdHlsZXMvcHJvamVjdHMuY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzJztcblxuLy8gY29uc3QgaWNvbnMgPSB7aW5ib3g6IEljb25JbmJveCwgdG9kYXk6IEljb25Ub2RheSB9O1xuXG5jb25zdCBidWlsZFByb2plY3RzTGlzdCA9ICh0eXBlLCBjb250YWluZXIsIGFycmF5KSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFycmF5LFxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgcHJvamVjdHNMaXN0KHN0YXRlKSxcbiAgICAgICAgc2V0SWNvbnMoc3RhdGUpLFxuICAgICAgICApXG59XG5cbi8vIHJlbmFtZSB0byBidWlsZFByb2plY3RzTGlzdCAoPylcbmV4cG9ydCBjb25zdCBidWlsZExpc3QgPSB7XG4gICAgbW9kdWxlczogW10sXG4gICAgYWRkOiBmdW5jdGlvbiAodHlwZSwgY29udGFpbmVyLCBhcnJheSkge1xuICAgICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIHRoZSBtb2R1bGUgZXhpc3RzIGFscmVhZHlcbiAgICAgICAgLy8gaWYgbW9kdWxlIGV4aXN0cywgdGhlbiB1cGRhdGUgaXQncyBjb250YWluZXJcbiAgICAgICAgLy8gcHJldmVudHMgc2ltaWxhciBtb2R1bGVzIHRvIGJlIGFkZGVkXG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXMuc29tZShtb2R1bGUgPT4gbW9kdWxlLnR5cGUgPT09IHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmQodHlwZSkuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVzID0gWy4uLnRoaXMubW9kdWxlcywgYnVpbGRQcm9qZWN0c0xpc3QodHlwZSwgY29udGFpbmVyLCBhcnJheSldO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChtb2R1bGUgPT4gbW9kdWxlLnR5cGUgPT09IHR5cGUpO1xuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdHNMaXN0ID0gKHN0YXRlKSA9PiAoe1xuICAgIHJlbW92ZVNlbGVjdGlvbjogbnVsbCxcbiAgICBhcnJheTogc3RhdGUuYXJyYXksXG4gICAgdHlwZTogc3RhdGUudHlwZSxcbiAgICBjb250YWluZXI6IHN0YXRlLmNvbnRhaW5lcixcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdHNfbGlzdCcpO1xuXG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSlcbiAgICAgICAgdGhpcy5jYWNoZURPTShsaXN0KTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3QpO1xuXG4gICAgfSxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSAgeyAgICBcbiAgICAgICAgdGhpcy51bExpc3QgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IHRoaXMudWxMaXN0LmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0SXRlbXMgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEFuY2hvcnMgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaSBhJyk7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdCA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fZGVsZXRlX3Byb2plY3QnKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVByb2plY3QgPSB0aGlzLnJlbW92ZVByb2plY3QuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wdWJsaXNoID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcyk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3JlbW92ZVByb2plY3QnLCB0aGlzLnJlbW92ZVByb2plY3QpO1xuICAgICAgICB0aGlzLmJ0bkRlbGV0ZVByb2plY3QuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVQcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzLmZvckVhY2goIHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvckltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgYW5jaG9yU3Bhbi50ZXh0Q29udGVudCA9IHRoaXMuYXJyYXlbaV0udGl0bGU7XG4gICAgICAgICAgICBhbmNob3IuaHJlZiA9IGAjJHt0aGlzLmFycmF5W2ldLnRpdGxlfTtgXG5cbiAgICAgICAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkJywgdGhpcy5hcnJheVtpXS51dWlkKTtcbiAgICAgICAgICAgIGFuY2hvci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdCcpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuaWNvbnMpLmZpbmQoYSA9PiBhID09PSB0aGlzLmFycmF5W2ldLnRpdGxlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgYW5jaG9ySW1nLnNyYyA9IHRoaXMuaWNvbnNbT2JqZWN0LmtleXModGhpcy5pY29ucykuZmluZChhID0+IGEgPT09IHRoaXMuYXJyYXlbaV0udGl0bGUudG9Mb3dlckNhc2UoKSldXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuY2hvckltZy5zcmMgPSB0aGlzLmljb25zWydjaXJjbGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGFuY2hvckltZyk7XG4gICAgICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoYW5jaG9yU3Bhbik7XG4gICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChhbmNob3IpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSAhPT0gJ21pc2MnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gYnVpbGRCdXR0b24oJ2RlbGV0ZScsICdwcm9qZWN0Jyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmJveC11dWlkJywgcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZCk7XG4gICAgICAgICAgICAgICAgYnV0dG9uU3Bhbi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGJ1dHRvblNwYW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0SXRlbXMuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy51bExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW1zKTtcbiAgICAgICAgICAgIC8vIGNoYW5nZXMgY29udGVudCB0byB0aGUgbmV3bHkgcHJvamVjdCBpcyBhZGRlZFxuICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdHNMaXN0SXRlbXMubGVuZ3RoIDwgdGhpcy5hcnJheS5sZW5ndGggJiYgdGhpcy50eXBlID09PSAnc2lkZWJhcicpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIFsuLi5saXN0SXRlbXMuY2hpbGRyZW5dLnNwbGljZSgtMSkucG9wKCkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhY2hlRE9NKHRoaXMudWxMaXN0KTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0SXRlbXM7XG4gICAgfSxcbiAgICByZW1vdmVQcm9qZWN0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnVpbGRMaXN0Lm1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgIG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IGxpc3RJdGVtO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFVVSUQgPSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQ7XG4gICAgICAgICAgICBidWlsZE1vZGFsUmVtb3ZlKHByb2plY3RDb250cm9sbGVyLmZpbmQocHJvamVjdFVVSUQpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50eXBlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVtb3ZlU2VsZWN0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgIC8vIE9SIHRoZSBwcm9qZWN0J3MgdXVpZCB3ZSB3YW50IHRvIHJlbW92ZSBpcyB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBhY3RpdmUgcHJvamVjdCdzIHV1aWRcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY29udGVudCB0byB0aGUgaW5ib3hcblxuICAgICAgICAgICAgaWYgKHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKSA9PT0gdW5kZWZpbmVkIHx8IGUgPT09IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS51dWlkKSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2NvbnRlbnQnLCB0aGlzLnJlbW92ZVNlbGVjdGlvbi5sYXN0Q2hpbGQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5yZW1vdmUoZSk7XG4gICAgICAgICAgICBidWlsZExpc3QubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBtb2R1bGUucmVuZGVyKCkpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24gPSBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBwdWJsaXNoKCkgcnVubmluZyBmcm9tIHByb2plY3RzX2lzdC5qc2ApOyAvLyBmb3IgZGVidWdnaW5nXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgbGV0IHByb2plY3RVVUlEID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQudXVpZFxuICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2lkZWJhcid8fCB0aGlzLnR5cGUgPT09ICdtaXNjJykge1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3NpZGViYXInKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJDYWNoZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudWxMaXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RJdGVtcyA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0QW5jaG9ycyA9IG51bGw7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdCA9IG51bGw7XG4gICAgfSxcbn0pXG5cbmNvbnN0IHNldEljb25zID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IGljb25zID0ge31cblxuICAgIGlmIChzdGF0ZS50eXBlID09PSAnbWlzYycpIHtcbiAgICAgICAgaWNvbnMuaWNvbnMgPSB7IGluYm94OiBJY29uSW5ib3gsIHRvZGF5OiBJY29uVG9kYXkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpY29ucy5pY29ucyA9IHsgY2lyY2xlOiBJY29uUHJvamVjdCB9O1xuICAgIH1cbiAgICByZXR1cm4gaWNvbnM7XG59IiwiaW1wb3J0IGltcG9ydEFsbCBmcm9tICcuLi8uLi91dGlsaXRpZXMvaW1wb3J0LWFsbCc7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0Rm9ybSBmcm9tICcuLi9wcm9qZWN0c19mb3JtJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgYnVpbGRMaXN0IH0gZnJvbSAnLi4vcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9zaWRlYmFyLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkU2lkZWJhcihjb250ZW50KSB7XG4gICAgY29uc3Qgc2lkZWJhcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzaWRlYmFyV3JhcHBlci5pZCA9ICdzaWRlYmFyJztcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICBzaWRlYmFyV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2lkZWJhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIHNpZGViYXJXcmFwcGVyLmFwcGVuZENoaWxkKHNpZGViYXIucmVuZGVyKCkpO1xuICAgIHNpZGViYXIuY2FjaGVET00oc2lkZWJhcldyYXBwZXIpO1xuICAgIHNpZGViYXIuYmluZEV2ZW50cygpO1xuXG4gICAgcHViU3ViLnN1YnNjcmliZSgnc2lkZWJhcicsIHNpZGViYXIudG9nZ2xlU2lkZWJhcik7XG4gICAgcmV0dXJuIHNpZGViYXJXcmFwcGVyO1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gICAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uLy4uL2Fzc2V0cy9pY29ucycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbn1cblxuY29uc3Qgc2lkZWJhciA9IHtcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluX2NvbnRlbnQnKSkpXG4gICAgICAgIHRoaXMuc2lkZWJhciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9IHRoaXMuc2lkZWJhci5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl93cmFwcGVyJyk7XG4gICAgICAgIC8vIG5lZWQgdG8gYXBwZW5kIGxpc3RfcHJvamVjdHMgdG8gdGhpcy5wcm9qZWN0c0NvbnRhaW5lclxuXG4gICAgICAgIHRoaXMucHJvamVjdHNDb250YWluZXIgPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignI3Byb2plY3RzX2NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmFuY2hvclByb2plY3RzID0gdGhpcy5wcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubmF2X3Byb2plY3RzJyk7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF9wcm9qZWN0Jyk7XG4gICAgICAgIC8vIHRoaXMuYW5jaG9ySW5ib3ggPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLm5hdl9pbmJveCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2lkZWJhciA9IHRoaXMudG9nZ2xlU2lkZWJhci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnB1Ymxpc2ggPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idG5BZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRQcm9qZWN0Rm9ybSk7XG4gICAgICAgIHRoaXMuYW5jaG9yUHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gsIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5zaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVTaWRlYmFyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FsbERpbU92ZXJsYXkgPSB0aGlzLmNhbGxEaW1PdmVybGF5LmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNhbGxEaW1PdmVybGF5KTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnN0IHNpZGViYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHNpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRNaXNjUHJvamVjdHMoKTtcbiAgICAgICAgY29uc3QgbmF2TWlzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidWlsZExpc3QuYWRkKCdtaXNjJywgbmF2TWlzYywgcHJvamVjdENvbnRyb2xsZXIubWlzYyk7XG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKGBtaXNjYCkuaW5pdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdHNBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgLy8gc2lkZWJhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl93cmFwcGVyJyk7XG4gICAgICAgIHNpZGViYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmlkID0gJ3Byb2plY3RzX2NvbnRhaW5lcic7XG4gICAgICAgIG5hdk1pc2MuY2xhc3NMaXN0LmFkZCgncHJvamVjdHNfbWlzY19jb250YWluZXInKTtcblxuICAgICAgICBwcm9qZWN0c0FuY2hvci50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICAgIHByb2plY3RzQW5jaG9yLmhyZWYgPSAnI3Byb2plY3RzJztcbiAgICAgICAgcHJvamVjdHNBbmNob3IuY2xhc3NMaXN0LmFkZCgnbmF2X3Byb2plY3RzJylcblxuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKHByb2plY3RzQW5jaG9yKTtcbiAgICAgICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbignYWRkJywgJ3Byb2plY3QnKSk7XG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvcldyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkTGlzdC5hZGQoJ3NpZGViYXInLCBwcm9qZWN0c0NvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZChgc2lkZWJhcmApLmluaXQoKTtcblxuICAgICAgICBzaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hdk1pc2MpO1xuICAgICAgICBzaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RzQ29udGFpbmVyKTtcbiAgICAgICAgLy8gc2lkZWJhcldyYXBwZXIuYXBwZW5kQ2hpbGQoc2lkZWJhckNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBzaWRlYmFyQ29udGFpbmVyO1xuICAgICAgICAvLyByZXR1cm4gc2lkZWJhcldyYXBwZXI7XG4gICAgfSxcbiAgICB0b2dnbGVTaWRlYmFyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLnNpZGViYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVNpZGViYXIoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwdWJTdWIucHVibGlzaCgnZGltJywgdGhpcy5zaWRlYmFyKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbERpbU92ZXJsYXkoKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlU2lkZWJhcigpO1xuICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIGUuY3VycmVudFRhcmdldCk7XG4gICAgfSxcbiAgICBjYWxsRGltT3ZlcmxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdkaW0nLCB0aGlzLnNpZGViYXIpO1xuICAgIH0sXG5cbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCAnLi4vc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzJ1xuXG5jb25zdCBidWlsZFRhc2tGb3JtID0gKHR5cGUsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50LCBkaWFsb2dFbGVtZW50KSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBmb3JtLFxuICAgICAgICB0eXBlLFxuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgaWYgKGJ1dHRvbi5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSkge1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgc3RhdGUuYnV0dG9uUGFyZW50ID0gYnV0dG9uUGFyZW50O1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgZm9ybVRhc2soc3RhdGUpLFxuICAgICAgICAgICAgbm9uTW9kYWwoc3RhdGUpLFxuICAgICAgICAgICAgZm9ybUlucHV0cyhzdGF0ZSksXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0ZS5kaWFsb2dFbGVtZW50ID0gZGlhbG9nRWxlbWVudDtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIGZvcm1UYXNrKHN0YXRlKSxcbiAgICAgICAgbW9kYWwoc3RhdGUpLFxuICAgICAgICBmb3JtSW5wdXRzKHN0YXRlKSxcbiAgICApXG59XG5cbmV4cG9ydCBjb25zdCBidWlsZEZvcm0gPSB7XG4gICAgc2VjdGlvbnM6IFtdLFxuICAgIGFkZDogZnVuY3Rpb24gKHR5cGUsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50LCBkaWFsb2dFbGVtZW50KSB7XG4gICAgICAgIC8vIGlmIHNlY3Rpb24gdHlwZSBhbHJlYWR5IGV4aXN0cywgdXBkYXRlIGl0J3MgY29udGFpbmVyXG4gICAgICAgIC8vIHByZXZlbnRzIHNpbWlsYXIgc2VjdGlvbnMgdG8gYmUgYWRkZWRcbiAgICAgICAgaWYgKHRoaXMuZmluZCh0eXBlKSkge1xuICAgICAgICAgICAgdGhpcy5maW5kKHR5cGUpLmNsb3NlRm9ybSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUodHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IFsuLi50aGlzLnNlY3Rpb25zLCBidWlsZFRhc2tGb3JtKHR5cGUsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50LCBkaWFsb2dFbGVtZW50KV07XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9ucy5zcGxpY2UodGhpcy5zZWN0aW9ucy5pbmRleE9mKHRoaXMuZmluZCh0eXBlKSksIDEpO1xuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9ucy5maW5kKHNlY3Rpb24gPT4gc2VjdGlvbi50eXBlID09PSB0eXBlKTtcbiAgICB9XG59XG5cbi8vIHJlbmRlcnMgYSBmb3JtIHRvIGNyZWF0ZSBhIHRhc2tcbiAgICAvLyBvbmUgbmVlZHMgdG8gYmUgYSBkaWFsb2cgZWxlbWVudFxuICAgIC8vIG9uZSBuZWVkcyB0byBiZSBhIG5vbi1kaWFsb2cgZWxlbWVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRUYXNrc0Zvcm0oZSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGUuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCBidXR0b25QYXJlbnQgPSBidXR0b24ucGFyZW50RWxlbWVudDtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybV90YXNrJyk7XG4gICAgaWYgKCFidXR0b24uaGFzQXR0cmlidXRlKCdyb2xlJykgJiYgYnV0dG9uUGFyZW50LnRhZ05hbWUgIT09ICdMSScpIHtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xuICAgICAgICBjb25zdCBkaWFsb2dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGlhbG9nJyk7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAnbW9kYWwnO1xuICAgICAgICBidWlsZEZvcm0uYWRkKCdtb2RhbCcsIGZvcm0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBkaWFsb2dFbGVtZW50KTtcblxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1aWxkRm9ybS5maW5kKGBtb2RhbGApLnJlbmRlcigpKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuY2FjaGVET00oKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuYmluZEV2ZW50cygpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGUuY3VycmVudFRhcmdldC5yZXBsYWNlV2l0aChmb3JtKTtcbiAgICAgICAgYnVpbGRGb3JtLmFkZCgnZGVmYXVsdCcsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50KVxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkucmVuZGVyKCkpO1xuICAgICAgICBidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLmNhY2hlRE9NKCk7XG4gICAgICAgIGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkuYmluZEV2ZW50cygpO1xuICAgIH1cbn1cblxuY29uc3QgZm9ybVRhc2sgPSAoc3RhdGUpID0+ICh7XG4gICAgdHlwZTogc3RhdGUudHlwZSxcbiAgICBmb3JtOiBzdGF0ZS5mb3JtLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5TdWJtaXQgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9zdWJtaXRfdGFzaycpIHx8IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX3VwZGF0ZV90YXNrJyk7XG4gICAgICAgIHRoaXMuZm9ybUlucHV0cyA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcudGFza19pbnB1dCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlRm9ybSA9IHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VGb3JtKTtcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1bkJpbmRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGZvcm1CdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fYnV0dG9ucycpO1xuICAgICAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gdGhpcy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKCdmb3JtX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmhhc093blByb3BlcnR5KCdlbGVtZW50JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGxhYmVsLmh0bWxGb3IgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMuaWQ7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMucGxhY2Vob2xkZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBpZGVhLCBtYWtlIHNlcGFyYXRlIG1vZHVsZSBmb3Igb3B0aW9ucyBidXR0b25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSA0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5vcHRpb25zLmVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucy5hdHRyaWJ1dGVzKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBidG4gaW4gdGhpcy5mb3JtQnV0dG9ucykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihidXR0b24sIHRoaXMuZm9ybUJ1dHRvbnNbYnRuXSk7XG4gICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYnRuO1xuXG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBmb3JtQnV0dG9ucy5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkuYWRkVGFzayh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUZvcm0oKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXNldE9sZFRhc2snLCB0aGlzLmJ1dHRvbik7IC8vIHRlc3RpbmdcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQodGhpcy5saXN0SXRlbS5kYXRhc2V0LnV1aWRQcm9qKS51cGRhdGVUYXNrKHRoaXMubGlzdEl0ZW0uZGF0YXNldC51dWlkLCB0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGNsb3NlRm9ybSgpIGZyb20gdGFza3NfZnJvbS5qcyBpcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgaWYgKCF0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5yZXBsYWNlV2l0aCh0aGlzLmJ1dHRvbik7XG4gICAgICAgICAgICBidWlsZEZvcm0ucmVtb3ZlKHRoaXMudHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Jlc2V0T2xkVGFzaycpOyAvLyB0ZXN0aW5nXG4gICAgfVxufSk7XG5cbmNvbnN0IG5vbk1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGJ1dHRvbjogc3RhdGUuYnV0dG9uLFxuICAgIHBhcmVudEJ1dHRvbjogc3RhdGUuYnV0dG9uUGFyZW50LFxufSk7XG5cbmNvbnN0IG1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdtb2RhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgYnVpbGRGb3JtLnJlbW92ZSh0aGlzLnR5cGUpO1xuICAgIH0sXG59KTtcblxuY29uc3QgZm9ybUlucHV0cyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRhc2tJdGVtID0gc3RhdGUuYnV0dG9uID8gc3RhdGUuYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy50YXNrX2xpc3RfaXRlbScpIDogbnVsbDtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGFza0l0ZW0gPyBwcm9qZWN0Q29udHJvbGxlci5maW5kKHRhc2tJdGVtLmRhdGFzZXQudXVpZFByb2opIDogbnVsbDtcbiAgICBjb25zdCB0YXNrID0gdGFza0l0ZW0/IHByb2plY3QuZmluZFRhc2sodGFza0l0ZW0uZGF0YXNldC51dWlkKSA6IG51bGw7XG4gICAgXG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIGlucHV0cy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzID0gaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAvLyBmaW5kcyB0YXNrJ3Mga2V5IGVxdWFsIHRvIGlucHV0J3MgaWRcbiAgICAgICAgICAgIGxldCBrZXkgPSBPYmplY3Qua2V5cyh0YXNrKS5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gYXR0cmlidXRlcy5pZCk7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1DaGlsZCAhPT0gJ2R1ZURhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHsgdmFsdWU6IHRhc2tba2V5XSB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB7IHZhbHVlOiBuZXcgRGF0ZSh0YXNrW2tleV0pLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyID0gdGFza1trZXldO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBudW1iZXIgfSwgeyB0ZXh0OiB0ZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlucHV0cyA9IHtcbiAgICAgICAgZm9ybUNoaWxkcmVuOiB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdUYXNrIG5hbWUnLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAndGV4dGFyZWEnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkdWVEYXRlOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZHVlX2RhdGUnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRHVlIERhdGUnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkdWVUaW1lOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZHVlX3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGltZScsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVGltZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW9yaXR5OiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJpb3JpdHknLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnb3B0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogZnVuY3Rpb24ocHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ByaW9yaXR5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcmlvcml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgUHJpb3JpdHkgJHtwcmlvcml0eX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gbmV3UHJpb3JpdHkudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3UHJpb3JpdHksIHsgc2VsZWN0ZWQ6IHRydWUgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3UHJpb3JpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRTZWxlY3RlZCBwYXJhbWV0ZXIgTUROXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxPcHRpb25FbGVtZW50L09wdGlvbiNwYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaW9yaXR5ID09PSA0PyBPYmplY3QuYXNzaWduKG5ld1ByaW9yaXR5LCB7IHNlbGVjdGVkOiB0cnVlfSwgeyBkZWZhdWx0U2VsZWN0ZWQgOiB0cnVlfSkgOiBuZXdQcmlvcml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdzZWxlY3QnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdQcm9qZWN0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnb3B0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHJvamVjdENvbnRyb2xsZXIuYWxsUHJvamVjdHNbaV0udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0c1tpXS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5idXR0b24gJiYgcHJvamVjdENvbnRyb2xsZXIuZmluZChzdGF0ZS5idXR0b24uZmlyc3RDaGlsZC5kYXRhc2V0LnV1aWRQcm9qKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLmZpbmQoc3RhdGUuYnV0dG9uLmZpcnN0Q2hpbGQuZGF0YXNldC51dWlkUHJvaikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3RDb250cm9sbGVyLmZpbmQoc3RhdGUuYnV0dG9uLmZpcnN0Q2hpbGQuZGF0YXNldC51dWlkUHJvaikudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIuYWxsUHJvamVjdHNbaV0udXVpZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9qZWN0LCB7IHNlbGVjdGVkOiB0cnVlIH0sIHsgZGVmYXVsdFNlbGVjdGVkIDogdHJ1ZX0pIDogcHJvamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS51dWlkID09PSBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0c1tpXS51dWlkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb2plY3QsIHsgc2VsZWN0ZWQ6IHRydWUgfSwgeyBkZWZhdWx0U2VsZWN0ZWQgOiB0cnVlfSkgOiBwcm9qZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybUJ1dHRvbnM6IHtcbiAgICAgICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBidXR0b24gY2xpY2tlZCBoYXMgJ3JvbGUnIGF0dHJpYnV0ZVxuICAgICAgICAvLyBhc3NpZ24gZm9ybUNoaWxkcmVuIHdpdGggYSBzYXZlLWJ1dHRvblxuICAgICAgICAvLyBhc3NpZ24gZm9ybVRhc2sgd2l0aCBhIGNvbnRlbnQgcHJvcGVydHkvaW5pdCBmdW5jdGlvblxuICAgIC8vIG90aGVyd2lzZSwgXG4gICAgICAgIC8vIGFzc2lnbiBmb3JtQ2hpbGRyZW4gd2l0aCBvbmx5IGEgYWRkLWJ1dHRvblxuICAgIGlmIChzdGF0ZS5idXR0b24gJiYgc3RhdGUuYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgICAgIGNvbnN0IGlucHV0c0VkaXQgPSB7XG4gICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBzYXZlOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3VwZGF0ZV90YXNrJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3A6IHtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbTogc3RhdGUuYnV0dG9uLmZpcnN0Q2hpbGQsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5wdXRzLmZvcm1CdXR0b25zLCBpbnB1dHNFZGl0LmJ1dHRvbik7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5wdXRzLCBpbnB1dHNFZGl0LnByb3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlucHV0c0FkZCA9IHtcbiAgICAgICAgICAgIGFkZDoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9zdWJtaXRfdGFzaycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMuZm9ybUJ1dHRvbnMsIGlucHV0c0FkZCk7XG4gICAgfVxuICAgIHJldHVybiBpbnB1dHM7XG59IiwiaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3QtY29udHJvbGxlcic7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9idXR0b25zJztcbmltcG9ydCBidWlsZE1vZGFsUmVtb3ZlIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWxfcmVtb3ZlJztcbmltcG9ydCBidWlsZFRhc2tzRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3Rhc2tzX2Zvcm0nO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0ICcuLi9zdHlsZXMvdGFza3NfbGlzdC5jc3MnO1xuXG5leHBvcnQgY29uc3QgdGFza3NMaXN0ID0ge1xuICAgIHJlbW92ZVNlbGVjdGlvbjogbnVsbCxcbiAgICBidG5EZWxldGVUYXNrOiBbXSxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc2V0T2xkVGFzayA9IHRoaXMucmVzZXRPbGRUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdhZGRUYXNrJywgdGhpcy5yZW5kZXIpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVUYXNrJywgdGhpcy5yZW5kZXIpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdyZXNldE9sZFRhc2snLCB0aGlzLnJlc2V0T2xkVGFzayk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3JlbW92ZVRhc2snLCB0aGlzLnJlbW92ZVRhc2spO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKClcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0LnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0YXNrKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdENvbnRhaW5lcjtcbiAgICB9LFxuICAgIG9sZFRhc2s6IG51bGwsXG4gICAgcHJvamVjdDogbnVsbCxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IHRoaXMubGlzdENvbnRhaW5lcjtcbiAgICAgICAgLy8gdGhpcy5idG5EZWxldGVUYXNrID0gdGhpcy5saXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fZGVsZXRlX3Rhc2snKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RJdGVtcyA9IHRoaXMubGlzdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICB0aGlzLnJlbW92ZVRhc2sgPSB0aGlzLnJlbW92ZVRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lZGl0VGFzayA9IHRoaXMuZWRpdFRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZVRhc2sgPSB0aGlzLmNvbXBsZXRlVGFzay5iaW5kKHRoaXMpO1xuICAgICAgICBhcmdzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSkge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygnZGVsZXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlVGFzaywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY29tcGxldGVUYXNrKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZWRpdFRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcyB3aWxsIG5lZWQgdG8gZ2VuZXJhdGUgYSBmb3JtXG4gICAgICAgICAgICAvLyByZW1vdmVzIHRoZSBidXR0b25cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24odGFzaykge1xuICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgY29uc3QgdGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgY29uc3QgdGFza1JhZGlvID0gYnVpbGRCdXR0b24oJ3JhZGlvJywgJ3Rhc2snKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdGFza0FjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgbGlzdEl0ZW1XcmFwcGVyLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkJywgdGFzay51dWlkVGFzayk7XG4gICAgICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZC1wcm9qJywgdGFzay51dWlkUHJvaik7XG4gICAgICAgICAgICBsaXN0SXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgICAgICAgICAgIHRhc2tDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfbGlzdF9pdGVtX2NvbnRlbnQnKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfbGlzdF9pdGVtJyk7XG4gICAgICAgICAgICB0YXNrQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCd0YXNrX2FjdGlvbnMnKTtcbiAgICAgICAgICAgIHRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfbmFtZScpO1xuICAgICAgICAgICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG5cbiAgICAgICAgICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfcHJpb3JpdHknKTtcbiAgICAgICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gYFByaW9yaXR5ICR7dGFzay5wcmlvcml0eX1gO1xuXG4gICAgICAgICAgICB0YXNrUmFkaW8uZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChgcHJpb3JpdHlfJHt0YXNrLnByaW9yaXR5fWApXG5cbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tSYWRpbyk7XG4gICAgICAgICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0YXNrLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfZGVzY3JpcHRpb24nKTtcbiAgICAgICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YXNrLmR1ZV9kYXRlICE9PSB1bmRlZmluZWQgfHwgdGFzay5kdWVfdGltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVRpbWVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGVUaW1lVGV4dDtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoYCR7dGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoYDEtMi0xMDAwICR7dGFzay5kdWVfdGltZX1gKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcm9wZXJ0aWVzID0geyBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfVxuICAgICAgICAgICAgICAgIGlmICh0YXNrLmR1ZV9kYXRlICYmICF0YXNrLmR1ZV90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lVGV4dCA9IGRhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGFzay5kdWVfZGF0ZSAmJiB0YXNrLmR1ZV90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lVGV4dCA9IHRpbWUudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgdGltZVByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lVGV4dCA9IGAke2RhdGUudG9EYXRlU3RyaW5nKCl9ICR7dGltZS50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB0aW1lUHJvcGVydGllcyl9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfZHVlX2RhdGVfdGltZScpXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVRpbWVCdXR0b24gPSBidWlsZEJ1dHRvbignZGF0ZScsICd0YXNrJywgZGF0ZVRpbWVUZXh0KVxuICAgICAgICAgICAgICAgIGRhdGVUaW1lV3JhcHBlci5hcHBlbmRDaGlsZChkYXRlVGltZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQoZGF0ZVRpbWVXcmFwcGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuXG4gICAgICAgICAgICBjb25zdCBidXR0b25EZWxldGUgPSBidWlsZEJ1dHRvbignZGVsZXRlJywgJ3Rhc2snKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkVkaXQgPSBidWlsZEJ1dHRvbignZWRpdCcsICd0YXNrJyk7XG4gICAgICAgICAgICB0YXNrQWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25EZWxldGUpO1xuICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uRWRpdCk7XG5cbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDb250ZW50KTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tBY3Rpb25zKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RJdGVtQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgbGlzdEl0ZW1XcmFwcGVyLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgICAgICAgIC8vIHRoaXMuYnRuRGVsZXRlVGFzay5wdXNoKGJ1dHRvbilcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cyhidXR0b25EZWxldGUsIHRhc2tSYWRpbywgbGlzdEl0ZW1XcmFwcGVyKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9sZFRhc2spIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGhpcy5vbGRUYXNrID0gJHt0aGlzLm9sZFRhc2t9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub2xkVGFzay5yZXBsYWNlV2l0aChsaXN0SXRlbVdyYXBwZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMub2xkVGFzayA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB1cGRhdGluZyB0YXNrXG4gICAgICAgICAgICAgICAgLy8gbmVlZCB0byBvbmx5IGFwcGVuZCBhdCB0aGF0IHRhc2sncyBpbmRleFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdoZW4gdGhlIHRhc2sgZm9ybSBpbnNpZGUgdGhlIGxpc3QgaXMgb3BlbiBhbmQgYSBuZXcgdGFzayBpcyBhZGRlZFxuICAgICAgICAgICAgLy8gdGhlIHRhc2sgbGlzdCBncm93cyB3aGlsZSB0aGUgdGFzayBmb3JtIGlzIG9wZW5cbiAgICB9LFxuICAgIGNvbXBsZXRlVGFzazogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhgY29tcGxldGV0YXNrKCkgcnVubmluZyBmcm9tIHRhc2tzX2xpc3QuanNgKTtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IGxpc3RJdGVtO1xuICAgICAgICB0aGlzLnJlbW92ZVRhc2soKTtcbiAgICB9LFxuICAgIHJlbW92ZVRhc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHJlbW92ZVRhc2soKSBpbiB0YXNrc19saXN0LmpzIGlzIHJ1bm5pbmdgKVxuICAgICAgICAvLyBjcmVhdGUgYSBtb2RhbCB0byBjb25maXJtIHJlbW92YWxcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgICAgIGxldCB1dWlkVGFzayA9IGxpc3RJdGVtLmRhdGFzZXQudXVpZDtcbiAgICAgICAgICAgIGJ1aWxkTW9kYWxSZW1vdmUodGhpcy5wcm9qZWN0LmZpbmRUYXNrKHV1aWRUYXNrKSk7ICBcbiAgICAgICAgLy8gfSBlbHNlIGlmIChlKSB7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdmVTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIHRoaXMucHJvamVjdC5yZW1vdmVUYXNrKGUpO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0LnJlbW92ZVRhc2sodGhpcy5yZW1vdmVTZWxlY3Rpb24uZGF0YXNldC51dWlkKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5wcm9qZWN0LnRpdGxlICE9PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWRpdFRhc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGVkaXRUYXNrKCkgZnJvbSB0YXNrc19saXN0LmpzIGlzIHJ1bm5pbmdgKTtcbiAgICAgICAgdGhpcy5vbGRUYXNrID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBidWlsZFRhc2tzRm9ybShlKTtcbiAgICB9LFxuICAgIHJlc2V0T2xkVGFzazogZnVuY3Rpb24ob2xkVGFzaykge1xuICAgICAgICBjb25zb2xlLmxvZyhgcmVzZXRPbGRUYXNrKCkgZnJvbSB0YXNrc19saXN0LmpzIGlzIHJ1bm5pbmdgKTtcbiAgICAgICAgaWYgKHRoaXMub2xkVGFzaykge1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIHRoaXMub2xkVGFzayA9IG51bGxcbiAgICAgICAgfSBlbHNlIGlmIChvbGRUYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm9sZFRhc2sgPSBvbGRUYXNrO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4vcHVic3ViJztcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4uL3N0b3JhZ2Uvc3RvcmFnZSc7XG5cbmNvbnN0IGdldEZvcm1WYWx1ZXMgPSAoaW5wdXRzKSA9PiB7XG4gICAgLy8gdGFza3MgaXMgZW1wdHkgd2l0aCBsb2NhbCBzdG9yYWdlXG4gICAgY29uc3Qgb2JqID0ge31cbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7IFxuICAgICAgICBpZiAoaW5wdXQuaWQgPT09ICdwcmlvcml0eScpIHtcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBwYXJzZUludChpbnB1dC52YWx1ZS5zbGljZShpbnB1dC52YWx1ZS5sZW5ndGggLSAxLCBpbnB1dC52YWx1ZS5sZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5pZCA9PT0gJ2R1ZV9kYXRlJyAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPT09IDAgJiYgWy4uLmlucHV0c10uZmluZChpdGVtID0+IGl0ZW0uaWQgPT09ICdkdWVfdGltZScpLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgdGltZSBoYXMgYSB2YWx1ZSBhbmQgZGF0ZSBkb2VzIG5vdCBoYXZlIGEgdmFsdWVcbiAgICAgICAgICAgICAgICAvLyBkYXRlIHNldCB0byB0b2RheSdzIGRhdGVcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBpbnB1dC52YWx1ZVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cob2JqKVxuICAgIHJldHVybiBvYmo7XG59XG5cbmNvbnN0IGJ1aWxkUHJvamVjdCA9ICh0YXNrcykgPT4ge1xuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgdGFza3MsXG4gICAgICAgIHV1aWQ6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBwcm9qZWN0KHN0YXRlKSxcbiAgICApXG59XG5cbi8vIGNyZWF0ZXMgYSBwcm9qZWN0IG9iamVjdFxuICAgIC8vIHRhc2tzIHByb3BlcnR5IGNyZWF0ZWQgdXBvbiBvYmplY3QgY3JlYXRpb25cbmNvbnN0IHByb2plY3QgPSAoc3RhdGUpID0+ICh7XG4gICAgdHlwZTogJ3Byb2plY3QnLFxuICAgIGFjdGl2ZTogZmFsc2UsIC8vIHRoZXJlIGNhbiBvbmx5IGJlIG9uZSBwcm9qZWN0IGFjdGl2ZVxuICAgIHV1aWQ6IHN0YXRlLnV1aWQsXG4gICAgdGFza3M6IHN0YXRlLnRhc2tzIHx8IFtdLFxuICAgIGFkZFRhc2s6IGZ1bmN0aW9uKGlucHV0cykge1xuICAgICAgICAvLyBuZWVkIHRvIGFsbG93IHVzZXIgdG8gcGljayB3aGF0IHByb2plY3QgdG8gYXNzaWduIHRoZSBuZXdseS9lZGl0ZWQgdGFza1xuICAgICAgICAgICAgLy8gcHVzaGVzIHRhc2sgdG8gcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKGlucHV0cyk7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBPYmplY3QuYXNzaWduKHRhc2sodGhpcy51dWlkKSwgZm9ybVZhbHVlcyk7XG5cbiAgICAgICAgaWYgKGZvcm1WYWx1ZXMucHJvamVjdCAmJiBmb3JtVmFsdWVzLnByb2plY3QgIT09IG5ld1Rhc2sudXVpZFByb2opIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBuZXcgdXVpZCBwcm9qOiAke2Zvcm1WYWx1ZXMucHJvamVjdH1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBvbGQgdXVpZCBwcm9qOiAke25ld1Rhc2sudXVpZFByb2p9YCk7XG4gICAgICAgICAgICBuZXdUYXNrLnV1aWRQcm9qID0gZm9ybVZhbHVlcy5wcm9qZWN0O1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZmluZChmb3JtVmFsdWVzLnByb2plY3QpLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgICAgICBpZiAobmV3IERhdGUoYCR7bmV3VGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdhZGRUYXNrJywgbmV3VGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYWRkVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLnNldEFsbFByb2plY3RzKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLnRvZGF5KVxuICAgICAgICAvLyBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZVRhc2s6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgLy8gaWYgdGhlIHJlbW92ZSB0YXNrIGlzIGluIHRvZGF5XG4gICAgICAgICAgICAvLyByZW1vdmUgaXQgZnJvbSB0b2RheSBBTkQgaXQncyByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgLy8gaWYgdGhlIHRhc2sncyBkYXRlIGluIHRvZGF5IGlzIGVkaXRlZCBcbiAgICAgICAgICAgIC8vIHJlbW92ZSBpdCBmcm9tIG9ubHkgdG9kYXlcbiAgICAgICAgY29uc3QgdGFzayA9IHRoaXMuZmluZFRhc2sodXVpZCk7XG4gICAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGFza3MuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgICAgIC8vIHJlbW92ZXMgdGFzayBpbiByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFzay51dWlkUHJvaik7XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2sudXVpZFRhc2sgPT09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdC50YXNrcy5zcGxpY2UocHJvamVjdC50YXNrcy5pbmRleE9mKHRhc2spLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICAvLyBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVRhc2s6IGZ1bmN0aW9uKHV1aWQsIGlucHV0cykge1xuICAgICAgICBjb25zb2xlLmxvZyhgdXBkYXRlVGFzaygpIGZyb20gcHJvamVjdC1jb250cm9sbGVyLmpzIGlzIHJ1bm5pbmdgKTsgLy8gZm9yIGRlYnVnZ2luZ1xuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gT2JqZWN0LmFzc2lnbih0aGlzLmZpbmRUYXNrKHV1aWQpLCBmb3JtVmFsdWVzKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtVmFsdWVzKVxuICAgICAgICBjb25zb2xlLmxvZyhuZXdUYXNrLmR1ZV9kYXRlKTtcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAgLy8gaWYgdGhlIHByb2plY3QgaXMgY2hhbmdlIGZvciBhIHRhc2tcbiAgICAgICAgaWYgKGZvcm1WYWx1ZXMucHJvamVjdCAmJiBmb3JtVmFsdWVzLnByb2plY3QgIT09IG5ld1Rhc2sudXVpZFByb2opIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFzayhuZXdUYXNrLnV1aWRUYXNrKTtcbiAgICAgICAgICAgIG5ld1Rhc2sudXVpZFByb2ogPSBmb3JtVmFsdWVzLnByb2plY3Q7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kKGZvcm1WYWx1ZXMucHJvamVjdCkudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJyk7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnRpdGxlID09PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudGl0bGUgPT09ICdUb2RheScpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYCR7bmV3VGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLnNldEFsbFByb2plY3RzKCk7XG4gICAgICAgIC8vIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgZmluZFRhc2s6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3MuZmluZChlbGVtZW50ID0+IGVsZW1lbnQudXVpZFRhc2sgPT09IHV1aWQpO1xuICAgIH0sXG59KVxuXG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0Q29udHJvbGxlciA9IHtcbiAgICBpbmJveDogW09iamVjdC5hc3NpZ24oYnVpbGRQcm9qZWN0KCksIHt0aXRsZTogJ0luYm94Jyx9KV0sIC8vIHdpbGwgaG9sZCB0YXNrcyBhc3NpZ25lZCB0byB0aGUgJ2luYm94J1xuICAgIHRvZGF5OiBbT2JqZWN0LmFzc2lnbihidWlsZFByb2plY3QoKSwge3RpdGxlOiAnVG9kYXknfSldLFxuICAgIG1pc2M6IG51bGwsXG4gICAgcHJvamVjdHM6IG51bGwsXG4gICAgYWxsUHJvamVjdHM6IFtdLFxuICAgIGFkZFByb2plY3Q6IGZ1bmN0aW9uKGlucHV0cykge1xuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2goT2JqZWN0LmFzc2lnbihidWlsZFByb2plY3QoKSwgZm9ybVZhbHVlcykpO1xuICAgICAgICB0aGlzLnNldEFsbFByb2plY3RzKClcbiAgICAgICAgLy8gcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UodGhpcy5wcm9qZWN0cy5pbmRleE9mKHRoaXMuZmluZCh1dWlkKSksIDEpO1xuICAgICAgICB0aGlzLnNldEFsbFByb2plY3RzKCk7XG4gICAgICAgIC8vIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24odXVpZCkge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC51dWlkID09PSB1dWlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsUHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QudXVpZCA9PT0gdXVpZCk7XG4gICAgfSxcbiAgICBzZXRBY3RpdmU6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHNldEFjdGl2ZSgpIGlzIHJ1bm5pbmcgZnJvbSBwcm9qZWN0LWNvbnRyb2xsZXIuanNgKSAvLyBmb3IgZGVidWdnaW5nXG4gICAgICAgIGlmICh0aGlzLmZpbmRBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5maW5kQWN0aXZlKCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maW5kKHV1aWQpLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcbiAgICBmaW5kQWN0aXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxQcm9qZWN0cylcbiAgICAgICAgaWYgKCF0aGlzLmFsbFByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmFjdGl2ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5ib3hbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluYm94O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxsUHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuYWN0aXZlID09PSB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0QWxsUHJvamVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmFsbFByb2plY3RzID0gdGhpcy5pbmJveC5jb25jYXQodGhpcy5wcm9qZWN0cywgdGhpcy50b2RheSk7XG4gICAgICAgIHRoaXMuc29ydCgpXG4gICAgICAgIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgc2V0TWlzY1Byb2plY3RzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5taXNjID0gdGhpcy5pbmJveC5jb25jYXQodGhpcy50b2RheSlcbiAgICB9LFxuICAgIHNvcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuYWxsUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LnRhc2tzLmxlbmd0aCA+IDAgJiYgcHJvamVjdC50aXRsZSAhPT0gJ1RvZGF5Jykge1xuICAgICAgICAgICAgICAgIHByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tEYXRlID0gbmV3IERhdGUoYCR7dGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRvZGF5WzBdLmZpbmRUYXNrKHRhc2sudXVpZFRhc2spICYmIHRhc2tEYXRlID09IHRvZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZGF5WzBdLnRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RheSlcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqLCBidWlsZFByb2plY3Qob2JqLnRhc2tzKSk7XG4gICAgICAgICAgICBvYmoudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgICAgICB0YXNrLnV1aWRQcm9qID0gb2JqLnV1aWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmluYm94WzBdLCBidWlsZFByb2plY3QodGhpcy5pbmJveFswXS50YXNrcykpO1xuICAgICAgICB0aGlzLmluYm94WzBdLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICB0YXNrLnV1aWRQcm9qID0gdGhpcy5pbmJveFswXS51dWlkO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNldEFsbFByb2plY3RzKCk7XG4gICAgfVxufVxuXG5jb25zdCB0YXNrID0gKHV1aWQpID0+IHtcbiAgICBjb25zdCB0eXBlID0gJ3Rhc2snO1xuICAgIGNvbnN0IHV1aWRUYXNrID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcbiAgICBjb25zdCB1dWlkUHJvaiA9IHV1aWQ7XG4gICAgcmV0dXJuIHsgdXVpZFRhc2ssIHV1aWRQcm9qLCB0eXBlIH07XG59IiwiZXhwb3J0IGNvbnN0IHB1YlN1YiA9IHtcbiAgICBzdWJzY3JpYmVyczoge30sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbihzdWJzY3JpYmVyLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdID0gdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSB8fCBbXTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5wdXNoKGhhbmRsZXIpO1xuICAgIH0sXG4gICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKHN1YnNjcmliZXIsICBoYW5kbGVyKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXVtpXSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihzdWJzY3JpYmVyLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuXG4vLyBnZXRJdGVtIGZyb20gbG9jYWxTdG9yYWdlXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvamVjdHMoKSB7XG4gICAgY29uc29sZS5sb2coYHNldFByb2plY3RzKCkgcnVubmluZyBmcm9tIHN0b3JhZ2UuanNgKTtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgOiBbXTtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5pbmJveCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmJveCcpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSkgOiBwcm9qZWN0Q29udHJvbGxlci5pbmJveDtcbiAgICAvLyBwcm9qZWN0Q29udHJvbGxlci50b2RheSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RheScpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXknKSkgOiBwcm9qZWN0Q29udHJvbGxlci50b2RheTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyk7XG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdENvbnRyb2xsZXIuYWxsUHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLnRvZGF5KTtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5pbml0KCk7XG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzKTtcbn1cblxuLy8gc2V0SXRlbSBpbiBsb2NhbFN0b3JhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gICAgY29uc29sZS5sb2coYHBvcHVsYXRlU3RvcmFnZSgpIHJ1bm5pbmcgZnJvbSBzdG9yYWdlLmpzYCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5ib3gnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0Q29udHJvbGxlci5pbmJveCkpO1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RheScsIEpTT04uc3RyaW5naWZ5KHByb2plY3RDb250cm9sbGVyLnRvZGF5KSk7XG4gICAgLy8gY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmJveCcpKTtcbn0iLCIvLyByZXR1cm5zIGFuIG9iamVjdCBhbmQgYXJyYXkgb2YgZmlsZSB0eXBlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcbiAgICBsZXQgZmlsZXMgPSB7fTtcbiAgICBsZXQgZmlsZXNBcnIgPSBbXTtcbiAgICByLmtleXMoKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGZpbGVzW2l0ZW0ucmVwbGFjZSgnLi8nLCAnJyldID0gcihpdGVtKTtcbiAgICAgICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGZpbGVzLCBmaWxlc0FyciB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9