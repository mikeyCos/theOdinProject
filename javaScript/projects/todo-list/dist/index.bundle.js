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

.overlay_main_content  {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 400ms ease-in-out;
}

.overlay_main_content.dim {
    opacity: 1;
    transition: opacity 400ms ease-in-out;
}

#main_content {
    /* position: relative; */
    padding: 3.25rem;
}

/* #main_content::after {
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    position: absolute;
    opacity: 0;
    transition: all 300ms ease-in-out;
}

#main_content.dim::after {
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 300ms ease-in-out;
} */

@media screen and (min-width:768px) {
    #content {
        position: static;
        display: grid;
        grid-template-columns: 40% 1fr;
    }

    #main_content.dim::after {
        /* opacity: 0; */
    }
}`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;IACI,yBAAyB;IACzB,4CAA2D;AAC/D;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,qBAAqB;IACrB,qCAAqC;AACzC;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,eAAe;IACf,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,wBAAwB;IACxB,gBAAgB;AACpB;;AAEA;;;;;;;;;;;;;;;;;;;;;;;GAuBG;;AAEH;IACI;QACI,gBAAgB;QAChB,aAAa;QACb,8BAA8B;IAClC;;IAEA;QACI,gBAAgB;IACpB;AACJ","sourcesContent":["@font-face {\n    font-family: 'Bebas Neue';\n    src: url('./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf');\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n:root {\n    /* custom variables */\n    --text-color-primary: rgb(32, 32, 32);\n}\n\nbody {\n    min-height: 100vh;\n}\n\n#todo_app {\n    min-height: inherit;\n    display: grid;\n    grid-template-rows: min-content 1fr;\n}\n\n#content {\n    position: relative;\n}\n\n#content {\n    display: grid;\n}\n\n.overlay_main_content  {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 0;\n    transition: opacity 400ms ease-in-out;\n}\n\n.overlay_main_content.dim {\n    opacity: 1;\n    transition: opacity 400ms ease-in-out;\n}\n\n#main_content {\n    /* position: relative; */\n    padding: 3.25rem;\n}\n\n/* #main_content::after {\n    content: '';\n    height: 100%;\n    width: 100%;\n    top: 0;\n    right: 0;\n    z-index: -1;\n    position: absolute;\n    opacity: 0;\n    transition: all 300ms ease-in-out;\n}\n\n#main_content.dim::after {\n    content: '';\n    height: 100%;\n    width: 100%;\n    top: 0;\n    right: 0;\n    z-index: -1;\n    position: absolute;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 1;\n    transition: opacity 300ms ease-in-out;\n} */\n\n@media screen and (min-width:768px) {\n    #content {\n        position: static;\n        display: grid;\n        grid-template-columns: 40% 1fr;\n    }\n\n    #main_content.dim::after {\n        /* opacity: 0; */\n    }\n}"],"sourceRoot":""}]);
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

header > #navbar > * > .container > button {
    background: transparent;
    border: none;
}

.input_search {
    width: 100%;
    border: none;
}

header > #navbar > * > .container > * > img {
    width: clamp(1.65rem, 4vw, 1.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;IACI,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,wBAAwB;AAC5B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,qBAAqB;AACzB;;AAEA;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,kCAAkC;AACtC","sourcesContent":["header {\n    background-color: lightcoral;\n}\n\nheader > #navbar {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.40rem 0.35rem;\n}\n\nheader > #navbar > * > .container {\n    display: flex;\n    column-gap: 0.25rem;\n}\n\nheader > #navbar > * > .container > * {\n    display: flex;\n    align-items: center;\n    border-radius: 0.2rem;\n}\n\nheader > #navbar > * > .container > button {\n    background: transparent;\n    border: none;\n}\n\n.input_search {\n    width: 100%;\n    border: none;\n}\n\nheader > #navbar > * > .container > * > img {\n    width: clamp(1.65rem, 4vw, 1.5rem);\n}"],"sourceRoot":""}]);
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
#main_content > div > div > .nav_projects > .btn_add_project {
    
}

#main_content > div > div > .nav_projects > .btn_add_project > .btn_img_wrapper {
    
}

#main_content > div > div > .nav_projects > .btn_add_project > .btn_img_wrapper > img,
#main_content > div > div > .projects_list > div > * > .nav_project > img {

}

/* selects projects_list */
#main_content > div > div > .projects_list > div > * > .nav_project {

}

`, "",{"version":3,"sources":["webpack://./src/styles/projects.css"],"names":[],"mappings":"AAAA,uDAAuD;AACvD;;AAEA;;AAEA;;AAEA;;AAEA;;;AAGA;;AAEA,0BAA0B;AAC1B;;AAEA","sourcesContent":["/* styles for list of projects on the content section */\n#main_content > div > div > .nav_projects > .btn_add_project {\n    \n}\n\n#main_content > div > div > .nav_projects > .btn_add_project > .btn_img_wrapper {\n    \n}\n\n#main_content > div > div > .nav_projects > .btn_add_project > .btn_img_wrapper > img,\n#main_content > div > div > .projects_list > div > * > .nav_project > img {\n\n}\n\n/* selects projects_list */\n#main_content > div > div > .projects_list > div > * > .nav_project {\n\n}\n\n"],"sourceRoot":""}]);
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
    display: grid;
    list-style: none;
}

.projects_list > * > * {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.projects_list > * > *:hover span {
    visibility: visible;
}

.projects_list > * > * > span {
    justify-self: end;
    visibility: hidden;
}

.projects_list > * > * > .nav_project {
    display: grid;
    grid-template-columns: 20px 1fr 1fr;
    align-items: center;
}

.btn_add_project,
.btn_delete_project {
    display: grid;
    background: transparent;
    border: none;
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
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
}`, "",{"version":3,"sources":["webpack://./src/styles/projects_list.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,qCAAqC;AACzC;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mCAAmC;IACnC,mBAAmB;AACvB;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,kCAAkC;IAClC,oBAAoB;AACxB;;AAEA;;;IAGI,kCAAkC;AACtC;;AAEA;IACI,aAAa;IACb,sCAAsC;IACtC,mBAAmB;AACvB","sourcesContent":[".projects_list > * {\n    display: grid;\n    list-style: none;\n}\n\n.projects_list > * > * {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n}\n\n.projects_list > * > *:hover span {\n    visibility: visible;\n}\n\n.projects_list > * > * > span {\n    justify-self: end;\n    visibility: hidden;\n}\n\n.projects_list > * > * > .nav_project {\n    display: grid;\n    grid-template-columns: 20px 1fr 1fr;\n    align-items: center;\n}\n\n.btn_add_project,\n.btn_delete_project {\n    display: grid;\n    background: transparent;\n    border: none;\n}\n\n.nav_project > img {\n    width: clamp(1.15rem, 4vw, 1.5rem);\n    justify-self: center;\n}\n\n.btn_add_project > img,\n.btn_add_project > .btn_img_wrapper > img,\n.btn_delete_project > img {\n    width: clamp(1.45rem, 4vw, 1.5rem);\n}\n\n.btn_add_project {\n    display: grid;\n    grid-template-columns: min-content 1fr;\n    align-items: center;\n}"],"sourceRoot":""}]);
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
}

#projects_container > *:first-child > .btn_add_project {
    justify-self: end;
}

@media screen and (min-width:768px) {
    #sidebar {
        visibility: visible;
        position: static;
    }

    #sidebar.show {
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
}`, "",{"version":3,"sources":["webpack://./src/styles/sidebar.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,WAAW;IACX,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,4BAA4B;IAC5B,iCAAiC;AACrC;;AAEA;IACI,mBAAmB;IACnB,yBAAyB;IACzB,uCAAuC;AAC3C;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,oCAAoC;IACpC,6CAA6C;IAC7C,UAAU;AACd;;AAEA;;IAEI,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI;QACI,mBAAmB;QACnB,gBAAgB;IACpB;;IAEA;QACI,cAAc;QACd,2CAA2C;IAC/C;;IAEA;QACI,aAAa;IACjB;;IAEA;QACI,WAAW;QACX,6CAA6C;IACjD;AACJ;;AAEA;IACI;QACI,4BAA4B;IAChC;;IAEA;QACI,yBAAyB;IAC7B;AACJ","sourcesContent":["#sidebar {\n    height: 100%;\n    width: 100%;\n    /* z-index: 1; */\n    position: absolute;\n    visibility: hidden;\n}\n\n#sidebar.hide {\n    visibility: hidden;\n    transform: translateX(-100%);\n    transition: all 300ms ease-in-out;\n}\n\n#sidebar.show {\n    visibility: visible;\n    transform: translateX(0%);\n    transition: transform 300ms ease-in-out;\n}\n\n#sidebar > .container {\n    height: inherit;\n    display: flex;\n    flex-direction: column;\n    row-gap: 1rem;\n    padding: 1.25rem;\n    background-color: rgb(245, 245, 245);\n    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    width: 65%;\n}\n\n.nav_project,\n.nav_projects {\n    text-decoration: none;\n    column-gap: 0.75rem;\n}\n\n#projects_container > *:first-child {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    align-items: center;\n}\n\n#projects_container > *:first-child > .btn_add_project {\n    justify-self: end;\n}\n\n@media screen and (min-width:768px) {\n    #sidebar {\n        visibility: visible;\n        position: static;\n    }\n\n    #sidebar.show {\n        display: block;\n        animation: slide-in-right 300ms ease-in-out;\n    }\n\n    #sidebar.hide {\n        display: none;\n    }\n\n    #sidebar > .container {\n        width: 100%;\n        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    }\n}\n\n@keyframes slide-in-right {\n    0% {\n        transform: translateX(-100%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `.btn_add_task {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
}

.btn_add_task > .btn_img_wrapper {
    display: flex;
}

.btn_add_task > .btn_img_wrapper > img {
    width: clamp(1.45rem, 4vw, 1.5rem);
}

.tasks_list {
    list-style: none;
}

.task_list_item > .container {
    display: grid;
}

.task_list_item > .container > button {
    background: transparent;
    border: none;
    border: 2px solid black;
}

.task_list_item > .container > button > img {
    width: clamp(1.45rem, 4vw, 1.5rem);
}

.priority_1 {
    /* background-color: #ffa500; */
}

.priority_2 {

}

.priority_3 {

}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_list.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sCAAsC;IACtC,mBAAmB;AACvB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,uBAAuB;AAC3B;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,+BAA+B;AACnC;;AAEA;;AAEA;;AAEA;;AAEA","sourcesContent":[".btn_add_task {\n    display: grid;\n    grid-template-columns: min-content 1fr;\n    align-items: center;\n}\n\n.btn_add_task > .btn_img_wrapper {\n    display: flex;\n}\n\n.btn_add_task > .btn_img_wrapper > img {\n    width: clamp(1.45rem, 4vw, 1.5rem);\n}\n\n.tasks_list {\n    list-style: none;\n}\n\n.task_list_item > .container {\n    display: grid;\n}\n\n.task_list_item > .container > button {\n    background: transparent;\n    border: none;\n    border: 2px solid black;\n}\n\n.task_list_item > .container > button > img {\n    width: clamp(1.45rem, 4vw, 1.5rem);\n}\n\n.priority_1 {\n    /* background-color: #ffa500; */\n}\n\n.priority_2 {\n\n}\n\n.priority_3 {\n\n}"],"sourceRoot":""}]);
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
    dimOverlay: function(e) {
        if (e.classList.contains('hide')) {
            this.overlay.classList.remove('dim');
        } else if (!e.classList.contains('hide')) {
            this.overlay.classList.add('dim');
        }
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
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('dim', this.sidebar);
        }
    },
    publish: function(e) {
        e.stopImmediatePropagation();
        this.toggleSidebar();
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('content', e.currentTarget);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUIscUZBQXFGLDZFQUFpQjtBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkVBQWlCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQSxvREFBb0QsNkVBQWlCO0FBQ3JFLGlEQUFpRCw2RUFBaUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsYUFBYTtBQUNiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfbGlzdC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcHAuY3NzP2E2NzIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzP2U2OGIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0cy5jc3M/MWFhYSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzPzYxYzUiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcz8xMmQyIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvc2lkZWJhci5jc3M/NDgxNiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2xpc3QuY3NzPzcxNTEiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgXFwuc3ZnJCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2ljb25zLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5zdmckIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL2J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL21haW4uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvbW9kYWxfcmVtb3ZlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdF90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0c19mb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzX2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Rhc2tzX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvdGFza3NfbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbnRhaW5lcnMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3V0aWxpdGllcy9pbXBvcnQtYWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9CZWJhc19OZXVlL0JlYmFzTmV1ZS1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdCZWJhcyBOZXVlJztcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuOnJvb3Qge1xuICAgIC8qIGN1c3RvbSB2YXJpYWJsZXMgKi9cbiAgICAtLXRleHQtY29sb3ItcHJpbWFyeTogcmdiKDMyLCAzMiwgMzIpO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuI3RvZG9fYXBwIHtcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XG59XG5cbiNjb250ZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNjb250ZW50IHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQgIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgNDAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbi5vdmVybGF5X21haW5fY29udGVudC5kaW0ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSA0MDBtcyBlYXNlLWluLW91dDtcbn1cblxuI21haW5fY29udGVudCB7XG4gICAgLyogcG9zaXRpb246IHJlbGF0aXZlOyAqL1xuICAgIHBhZGRpbmc6IDMuMjVyZW07XG59XG5cbi8qICNtYWluX2NvbnRlbnQ6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IC0xO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IGFsbCAzMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI21haW5fY29udGVudC5kaW06OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IC0xO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDMwMG1zIGVhc2UtaW4tb3V0O1xufSAqL1xuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XG4gICAgI2NvbnRlbnQge1xuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDQwJSAxZnI7XG4gICAgfVxuXG4gICAgI21haW5fY29udGVudC5kaW06OmFmdGVyIHtcbiAgICAgICAgLyogb3BhY2l0eTogMDsgKi9cbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHlCQUF5QjtJQUN6Qiw0Q0FBMkQ7QUFDL0Q7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7SUFDWixvQ0FBb0M7SUFDcEMsVUFBVTtJQUNWLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLFVBQVU7SUFDVixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIsZ0JBQWdCO0FBQ3BCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRzs7QUFFSDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYiw4QkFBOEI7SUFDbEM7O0lBRUE7UUFDSSxnQkFBZ0I7SUFDcEI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdCZWJhcyBOZXVlJztcXG4gICAgc3JjOiB1cmwoJy4vYXNzZXRzL2ZvbnRzL0JlYmFzX05ldWUvQmViYXNOZXVlLVJlZ3VsYXIudHRmJyk7XFxufVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbjpyb290IHtcXG4gICAgLyogY3VzdG9tIHZhcmlhYmxlcyAqL1xcbiAgICAtLXRleHQtY29sb3ItcHJpbWFyeTogcmdiKDMyLCAzMiwgMzIpO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxufVxcblxcbiN0b2RvX2FwcCB7XFxuICAgIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMWZyO1xcbn1cXG5cXG4jY29udGVudCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQgIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgNDAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5vdmVybGF5X21haW5fY29udGVudC5kaW0ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDQwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jbWFpbl9jb250ZW50IHtcXG4gICAgLyogcG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbiAgICBwYWRkaW5nOiAzLjI1cmVtO1xcbn1cXG5cXG4vKiAjbWFpbl9jb250ZW50OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAtMTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNtYWluX2NvbnRlbnQuZGltOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAtMTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMzAwbXMgZWFzZS1pbi1vdXQ7XFxufSAqL1xcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgI2NvbnRlbnQge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDQwJSAxZnI7XFxuICAgIH1cXG5cXG4gICAgI21haW5fY29udGVudC5kaW06OmFmdGVyIHtcXG4gICAgICAgIC8qIG9wYWNpdHk6IDA7ICovXFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBoZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Y29yYWw7XG59XG5cbmhlYWRlciA+ICNuYXZiYXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDAuNDByZW0gMC4zNXJlbTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGNvbHVtbi1nYXA6IDAuMjVyZW07XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG4uaW5wdXRfc2VhcmNoIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICogPiBpbWcge1xuICAgIHdpZHRoOiBjbGFtcCgxLjY1cmVtLCA0dncsIDEuNXJlbSk7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2hlYWRlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRjb3JhbDtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcGFkZGluZzogMC40MHJlbSAwLjM1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAwLjI1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uaW5wdXRfc2VhcmNoIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gKiA+IGltZyB7XFxuICAgIHdpZHRoOiBjbGFtcCgxLjY1cmVtLCA0dncsIDEuNXJlbSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciBsaXN0IG9mIHByb2plY3RzIG9uIHRoZSBjb250ZW50IHNlY3Rpb24gKi9cbiNtYWluX2NvbnRlbnQgPiBkaXYgPiBkaXYgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgXG59XG5cbiNtYWluX2NvbnRlbnQgPiBkaXYgPiBkaXYgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCA+IC5idG5faW1nX3dyYXBwZXIge1xuICAgIFxufVxuXG4jbWFpbl9jb250ZW50ID4gZGl2ID4gZGl2ID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3QgPiAuYnRuX2ltZ193cmFwcGVyID4gaW1nLFxuI21haW5fY29udGVudCA+IGRpdiA+IGRpdiA+IC5wcm9qZWN0c19saXN0ID4gZGl2ID4gKiA+IC5uYXZfcHJvamVjdCA+IGltZyB7XG5cbn1cblxuLyogc2VsZWN0cyBwcm9qZWN0c19saXN0ICovXG4jbWFpbl9jb250ZW50ID4gZGl2ID4gZGl2ID4gLnByb2plY3RzX2xpc3QgPiBkaXYgPiAqID4gLm5hdl9wcm9qZWN0IHtcblxufVxuXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHVEQUF1RDtBQUN2RDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUEsMEJBQTBCO0FBQzFCOztBQUVBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlcyBmb3IgbGlzdCBvZiBwcm9qZWN0cyBvbiB0aGUgY29udGVudCBzZWN0aW9uICovXFxuI21haW5fY29udGVudCA+IGRpdiA+IGRpdiA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgXFxufVxcblxcbiNtYWluX2NvbnRlbnQgPiBkaXYgPiBkaXYgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCA+IC5idG5faW1nX3dyYXBwZXIge1xcbiAgICBcXG59XFxuXFxuI21haW5fY29udGVudCA+IGRpdiA+IGRpdiA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0ID4gLmJ0bl9pbWdfd3JhcHBlciA+IGltZyxcXG4jbWFpbl9jb250ZW50ID4gZGl2ID4gZGl2ID4gLnByb2plY3RzX2xpc3QgPiBkaXYgPiAqID4gLm5hdl9wcm9qZWN0ID4gaW1nIHtcXG5cXG59XFxuXFxuLyogc2VsZWN0cyBwcm9qZWN0c19saXN0ICovXFxuI21haW5fY29udGVudCA+IGRpdiA+IGRpdiA+IC5wcm9qZWN0c19saXN0ID4gZGl2ID4gKiA+IC5uYXZfcHJvamVjdCB7XFxuXFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2Zvcm1fcHJvamVjdCB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1pbi13aWR0aDogNzB2dztcbiAgICBtaW4taGVpZ2h0OiA1MHZoO1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG4jZm9ybV9wcm9qZWN0OjpiYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4jZm9ybV9wcm9qZWN0ID4gI2Zvcm0ge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcbiAgICAgICAgJ2hlYWQgaGVhZCdcbiAgICAgICAgJ2lucHV0IGlucHV0J1xuICAgICAgICAnLiBidXR0b25zJ1xuICAgIDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWluLXdpZHRoOiBpbmhlcml0O1xuICAgIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50O1xufVxuXG4vKiBpbXBhY3RzIGZvcm1faXRlbSBmb3IgdGFza3NfZm9ybSAqL1xuLmZvcm1faXRlbSB7XG4gICAgZ3JpZC1hcmVhOiBpbnB1dDtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4uZm9ybV9idXR0b25zIHtcbiAgICBncmlkLWFyZWE6IGJ1dHRvbnM7XG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XG59XG5cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYjs7OztJQUlBO0lBQ0Esa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsMkJBQTJCO0FBQy9COztBQUVBLHFDQUFxQztBQUNyQztJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlCQUFpQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZm9ybV9wcm9qZWN0IHtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBtaW4td2lkdGg6IDcwdnc7XFxuICAgIG1pbi1oZWlnaHQ6IDUwdmg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuI2Zvcm1fcHJvamVjdDo6YmFja2Ryb3Age1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcblxcbiNmb3JtX3Byb2plY3QgPiAjZm9ybSB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcbiAgICAgICAgJ2hlYWQgaGVhZCdcXG4gICAgICAgICdpbnB1dCBpbnB1dCdcXG4gICAgICAgICcuIGJ1dHRvbnMnXFxuICAgIDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtaW4td2lkdGg6IGluaGVyaXQ7XFxuICAgIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGdyaWQtYXV0by1yb3dzOiBtaW4tY29udGVudDtcXG59XFxuXFxuLyogaW1wYWN0cyBmb3JtX2l0ZW0gZm9yIHRhc2tzX2Zvcm0gKi9cXG4uZm9ybV9pdGVtIHtcXG4gICAgZ3JpZC1hcmVhOiBpbnB1dDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuLmZvcm1fYnV0dG9ucyB7XFxuICAgIGdyaWQtYXJlYTogYnV0dG9ucztcXG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLnByb2plY3RzX2xpc3QgPiAqIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICoge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gKjpob3ZlciBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gc3BhbiB7XG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjBweCAxZnIgMWZyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5idG5fYWRkX3Byb2plY3QsXG4uYnRuX2RlbGV0ZV9wcm9qZWN0IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbn1cblxuLm5hdl9wcm9qZWN0ID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMS4xNXJlbSwgNHZ3LCAxLjVyZW0pO1xuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xufVxuXG4uYnRuX2FkZF9wcm9qZWN0ID4gaW1nLFxuLmJ0bl9hZGRfcHJvamVjdCA+IC5idG5faW1nX3dyYXBwZXIgPiBpbWcsXG4uYnRuX2RlbGV0ZV9wcm9qZWN0ID4gaW1nIHtcbiAgICB3aWR0aDogY2xhbXAoMS40NXJlbSwgNHZ3LCAxLjVyZW0pO1xufVxuXG4uYnRuX2FkZF9wcm9qZWN0IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1DQUFtQztJQUNuQyxtQkFBbUI7QUFDdkI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0NBQWtDO0lBQ2xDLG9CQUFvQjtBQUN4Qjs7QUFFQTs7O0lBR0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQkFBbUI7QUFDdkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnByb2plY3RzX2xpc3QgPiAqIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICo6aG92ZXIgc3BhbiB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiBzcGFuIHtcXG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IC5uYXZfcHJvamVjdCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjBweCAxZnIgMWZyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYnRuX2FkZF9wcm9qZWN0LFxcbi5idG5fZGVsZXRlX3Byb2plY3Qge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4ubmF2X3Byb2plY3QgPiBpbWcge1xcbiAgICB3aWR0aDogY2xhbXAoMS4xNXJlbSwgNHZ3LCAxLjVyZW0pO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJ0bl9hZGRfcHJvamVjdCA+IGltZyxcXG4uYnRuX2FkZF9wcm9qZWN0ID4gLmJ0bl9pbWdfd3JhcHBlciA+IGltZyxcXG4uYnRuX2RlbGV0ZV9wcm9qZWN0ID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDEuNDVyZW0sIDR2dywgMS41cmVtKTtcXG59XFxuXFxuLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNzaWRlYmFyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLyogei1pbmRleDogMTsgKi9cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4jc2lkZWJhci5oaWRlIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNzaWRlYmFyLnNob3cge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNzaWRlYmFyID4gLmNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAxcmVtO1xuICAgIHBhZGRpbmc6IDEuMjVyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUpO1xuICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcbiAgICB3aWR0aDogNjUlO1xufVxuXG4ubmF2X3Byb2plY3QsXG4ubmF2X3Byb2plY3RzIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5idG5fYWRkX3Byb2plY3Qge1xuICAgIGp1c3RpZnktc2VsZjogZW5kO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XG4gICAgI3NpZGViYXIge1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgIH1cblxuICAgICNzaWRlYmFyLnNob3cge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAjc2lkZWJhci5oaWRlIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAjc2lkZWJhciA+IC5jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuQGtleWZyYW1lcyBzbGlkZS1pbi1yaWdodCB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc2lkZWJhci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLHVDQUF1QztBQUMzQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsb0NBQW9DO0lBQ3BDLDZDQUE2QztJQUM3QyxVQUFVO0FBQ2Q7O0FBRUE7O0lBRUkscUJBQXFCO0lBQ3JCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIsZ0JBQWdCO0lBQ3BCOztJQUVBO1FBQ0ksY0FBYztRQUNkLDJDQUEyQztJQUMvQzs7SUFFQTtRQUNJLGFBQWE7SUFDakI7O0lBRUE7UUFDSSxXQUFXO1FBQ1gsNkNBQTZDO0lBQ2pEO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLDRCQUE0QjtJQUNoQzs7SUFFQTtRQUNJLHlCQUF5QjtJQUM3QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNzaWRlYmFyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgLyogei1pbmRleDogMTsgKi9cXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbiNzaWRlYmFyLmhpZGUge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAzMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI3NpZGViYXIuc2hvdyB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI3NpZGViYXIgPiAuY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSk7XFxuICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcXG4gICAgd2lkdGg6IDY1JTtcXG59XFxuXFxuLm5hdl9wcm9qZWN0LFxcbi5uYXZfcHJvamVjdHMge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgI3NpZGViYXIge1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIuc2hvdyB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIuaGlkZSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lciB7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLWluLXJpZ2h0IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAuYnRuX2FkZF90YXNrIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5idG5fYWRkX3Rhc2sgPiAuYnRuX2ltZ193cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uYnRuX2FkZF90YXNrID4gLmJ0bl9pbWdfd3JhcHBlciA+IGltZyB7XG4gICAgd2lkdGg6IGNsYW1wKDEuNDVyZW0sIDR2dywgMS41cmVtKTtcbn1cblxuLnRhc2tzX2xpc3Qge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIgPiBidXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IGJ1dHRvbiA+IGltZyB7XG4gICAgd2lkdGg6IGNsYW1wKDEuNDVyZW0sIDR2dywgMS41cmVtKTtcbn1cblxuLnByaW9yaXR5XzEge1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6ICNmZmE1MDA7ICovXG59XG5cbi5wcmlvcml0eV8yIHtcblxufVxuXG4ucHJpb3JpdHlfMyB7XG5cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFza3NfbGlzdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmJ0bl9hZGRfdGFzayB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgMWZyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYnRuX2FkZF90YXNrID4gLmJ0bl9pbWdfd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5idG5fYWRkX3Rhc2sgPiAuYnRuX2ltZ193cmFwcGVyID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDEuNDVyZW0sIDR2dywgMS41cmVtKTtcXG59XFxuXFxuLnRhc2tzX2xpc3Qge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gYnV0dG9uID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDEuNDVyZW0sIDR2dywgMS41cmVtKTtcXG59XFxuXFxuLnByaW9yaXR5XzEge1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhNTAwOyAqL1xcbn1cXG5cXG4ucHJpb3JpdHlfMiB7XFxuXFxufVxcblxcbi5wcmlvcml0eV8zIHtcXG5cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaGVhZGVyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaGVhZGVyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0cy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19mb3JtLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfZm9ybS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfbGlzdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2xpc3QuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpZGViYXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaWRlYmFyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19saXN0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfbGlzdC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCBidWlsZEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyJztcbmltcG9ydCBidWlsZFNpZGVCYXIgZnJvbSAnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhcic7XG5pbXBvcnQgYnVpbGRNYWluIGZyb20gJy4vY29tcG9uZW50cy9tYWluJztcbmltcG9ydCB7IHNldFByb2plY3RzIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UnO1xuaW1wb3J0IGJ1aWxkT3ZlcmxheSBmcm9tICcuL2NvbXBvbmVudHMvb3ZlcmxheSc7XG5pbXBvcnQgJy4vYXBwLmNzcyc7XG5cbmNvbnN0IGFwcENvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYnVpbGQgPSB7XG4gICAgICAgIGhlYWRlcjogYnVpbGRIZWFkZXIsXG4gICAgICAgIHNpZGViYXI6IGJ1aWxkU2lkZUJhcixcbiAgICAgICAgb3ZlcmxheTogYnVpbGRPdmVybGF5LFxuICAgICAgICBtYWluOiBidWlsZE1haW4sXG4gICAgfVxuXG4gICAgY29uc3QgYXBwID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFByb2plY3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFwcFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGFwcENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFwcFdyYXBwZXIuaWQgPSAndG9kb19hcHAnO1xuICAgICAgICAgICAgYXBwQ29udGVudC5pZCA9ICdjb250ZW50JztcblxuICAgICAgICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZC5oZWFkZXIoKSk7XG4gICAgICAgICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLm92ZXJsYXkoKSk7XG4gICAgICAgICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLnNpZGViYXIoKSk7XG4gICAgICAgICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLm1haW4oKSk7XG4gICAgICAgICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGFwcENvbnRlbnQpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcFdyYXBwZXIpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9LFxuICAgIH1cblxuICAgIGFwcC5pbml0KCk7XG59KSgpO1xuXG4vL21haW5cbiAgICAvLyAxLiB2aWV3IGFsbCBwcm9qZWN0c1xuICAgIC8vIDIuIHZpZXcgYWxsIHRvZG9zIGluIGVhY2ggcHJvamVjdFxuICAgIC8vIDMuIGV4cGFuZCBhIHNpbmdsZSB0b2RvIHRvIHNlZS9lZGl0IGl0cyBkZXRhaWxzXG4gICAgLy8gNC4gZGVsZXRlIGEgdG9kb1xuXG4gICAgLy8gdG9kbyBsaXN0IGl0ZW1cbiAgICAgICAgLy8gY3JlYXRlIGl0ZW0gYnV0dG9uXG4gICAgICAgIC8vIHJlbmRlcnMgZm9ybVxuICAgICAgICAgICAgLy8gdGl0bGUsIHJlcXVpcmVkXG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvblxuICAgICAgICAgICAgLy8gZHVlIGRhdGVcbiAgICAgICAgICAgICAgICAvL3JlbmRlcnMgZm9ybVxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG9kYXksIHRvbW9ycm93LCBubyBkYXRlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FuY2VsIGFuZCBzYXZlIGJ1dHRvblxuICAgICAgICAgICAgLy8gcHJvamVjdCBsYWJlbC90YWdcbiAgICAgICAgICAgIC8vIHN1Ym1pdFxuICAgICAgICAvLyBkZWxldGVcbiAgICAgICAgLy8gY29tcGxldGVcbiAgICAgICAgLy8gcmVvcmRlciB0b2RvIGxpc3QgaXRlbVxuICAgICAgICAvLyBjaGFuZ2UgcHJpb3JpdHlcbiAgICAvLyBjcmVhdGUgbmV3IHRvZG8gbGlzdCBpdGVtXG5cbi8vIHRvZG8gbGlzdCBPQkpFQ1RcbiAgICAvLyB0aXRsZVxuICAgIC8vIGRlc2NyaXB0aW9uXG4gICAgICAgIC8vIHN1YnRhc2tcbiAgICAvLyByZW1pbmRlclxuICAgIC8vIGR1ZSBkYXRlXG4gICAgLy8gdGltZVxuICAgIC8vIHByaW9pcnR5XG5cbi8vIHdlYnBhY2sgZXh0ZXJuYWwgbGlicmFyeTogZGF0ZS1mbnNcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2FkZC5zdmdcIixcblx0XCIuL2NoZWNrX3NtYWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmdcIixcblx0XCIuL2NoZXZyb25fbGVmdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9sZWZ0LnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9yaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9yaWdodC5zdmdcIixcblx0XCIuL2NpcmNsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Z1wiLFxuXHRcIi4vY29nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jb2cuc3ZnXCIsXG5cdFwiLi9kYXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kYXRlLnN2Z1wiLFxuXHRcIi4vZGVsZXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kZWxldGUuc3ZnXCIsXG5cdFwiLi9lZGl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9lZGl0LnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLXdoaXRlLnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmsuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLnN2Z1wiLFxuXHRcIi4vaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaG9tZS5zdmdcIixcblx0XCIuL2luYm94LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIixcblx0XCIuL21hZ25pZnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21hZ25pZnkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIixcblx0XCIuL3RvZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgcmVjdXJzaXZlIFxcXFwuc3ZnJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hZGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2FkZC5zdmdcIixcblx0XCIuL2NoZWNrX3NtYWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmdcIixcblx0XCIuL2NoZXZyb25fbGVmdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9sZWZ0LnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9yaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9yaWdodC5zdmdcIixcblx0XCIuL2NpcmNsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Z1wiLFxuXHRcIi4vY29nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jb2cuc3ZnXCIsXG5cdFwiLi9kYXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kYXRlLnN2Z1wiLFxuXHRcIi4vZGVsZXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kZWxldGUuc3ZnXCIsXG5cdFwiLi9lZGl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9lZGl0LnN2Z1wiLFxuXHRcIi4vaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaG9tZS5zdmdcIixcblx0XCIuL2luYm94LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIixcblx0XCIuL21hZ25pZnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21hZ25pZnkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIixcblx0XCIuL3RvZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwiLy8gbW9kdWxlIHRoYXQgd2lsbCBjcmVhdGUgYnV0dG9uc1xuICAgIC8vIGFkZCBwcm9qZWN0L3Rhc2tcbiAgICAvLyBkZWxldGUgcHJvamVjdC90YXNrXG4gICAgLy8gZWRpdCB0YXNrXG4gICAgaW1wb3J0IEljb25BZGQgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2FkZC5zdmcnO1xuICAgIGltcG9ydCBJY29uRGVsZXRlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9kZWxldGUuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkVkaXQgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2VkaXQuc3ZnJztcbiAgICBpbXBvcnQgSWNvblJhZGlvIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Zyc7XG4gICAgaW1wb3J0IEljb25EYXRlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9kYXRlLnN2Zyc7XG4gICAgLy8gcmV0dXJucyBhIGJ1dHRvbiBlbGVtZW50IHRvIGNyZWF0ZSBhIHByb2plY3QvdGFza1xuICAgIC8vIGlmIHNwYW5UZXh0IHByb3ZpZGVkLCB0aGVuIGEgc3BhbiBlbGVtZW50IGlzIGNyZWF0ZWRcbiAgICBjb25zdCBpY29ucyA9IHsgYWRkOiBJY29uQWRkLCBkZWxldGU6IEljb25EZWxldGUsIGVkaXQ6IEljb25FZGl0LCByYWRpbzogSWNvblJhZGlvLCBkYXRlOiBJY29uRGF0ZSB9O1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRCdXR0b24odHlwZSwgbmFtZSwgdGV4dCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLCBidXR0b25BdHRyaWJ1dGVzKHR5cGUsIG5hbWUpKTsgICAgXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltYWdlLnNyYyA9IGljb25zW3R5cGVdO1xuICAgIFxuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnYnRuX2ltZ193cmFwcGVyJyk7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGJ1dHRvbkF0dHJpYnV0ZXMgPSAodHlwZSwgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSB7XG4gICAgICAgICAgICAvLyBjbGFzc05hbWU6IGJ0bl9kZWxldGVfcHJvamVjdFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBgYnRuXyR7dHlwZX1fJHtuYW1lfWAsXG4gICAgICAgICAgICB0eXBlOiBgYnV0dG9uYCxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH0iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uL3V0aWxpdGllcy9pbXBvcnQtYWxsJztcbmltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJzsgLy8gY29ubmVjdCAuYnRuX2hvbWUgdG8gbWFpbkNvbnRlbnQuc3dpdGNoQ29udGVudFxuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfZm9ybSc7XG5pbXBvcnQgJy4uL3N0eWxlcy9oZWFkZXIuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIZWFkZXIoYXBwLCBjb250ZW50KSB7XG4gICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyLnJlbmRlcigpKTtcbiAgICBoZWFkZXIuY2FjaGVET00oaGVhZGVyRWxlbWVudCk7XG4gICAgaGVhZGVyLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gaGVhZGVyRWxlbWVudDtcbn1cblxuY29uc3QgYXNzZXRzID0ge1xuICAgIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi9hc3NldHMvaWNvbnMnLCB0cnVlLCAvXFwuc3ZnJC8pKSxcbn1cblxuY29uc3QgaGVhZGVyID0ge1xuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5idG5NZW51ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5idG5fbWVudScpO1xuICAgICAgICB0aGlzLmJ0bkhvbWUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9ob21lJyk7XG4gICAgICAgIHRoaXMuYnRuQWRkVGFzayA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF90YXNrJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wdWJsaXNoKTtcbiAgICAgICAgdGhpcy5idG5Ib21lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wdWJsaXNoKTsgLy8gdGVzdGluZ1xuICAgICAgICB0aGlzLmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFRhc2tzRm9ybSk7XG4gICAgfSxcbiAgICBoZWFkZXJDb250ZW50OiB7XG4gICAgICAgIGhlYWRlckxlZnQ6IFtcbiAgICAgICAgICAgIHtlbGVtZW50OiAnYnV0dG9uJywgY2xhc3M6ICdidG5fbWVudScsIGNoaWxkRWxlbWVudDogJ2ltZycsIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydtZW51LnN2ZyddfSxcbiAgICAgICAgICAgIHtlbGVtZW50OiAnYnV0dG9uJywgY2xhc3M6ICdidG5faG9tZScsIGNoaWxkRWxlbWVudDogJ2ltZycsIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydob21lLnN2ZyddfSxcbiAgICAgICAgICAgIHtlbGVtZW50OiAnaW5wdXQnLCBjbGFzczogJ2lucHV0X3NlYXJjaCcsIHBsYWNlaG9sZGVyOiAnU2VhcmNoJ31cbiAgICAgICAgXSxcbiAgICAgICAgaGVhZGVyUmlnaHQ6IFtcbiAgICAgICAgICAgIHtlbGVtZW50OiAnYnV0dG9uJywgY2xhc3M6ICdidG5fYWRkX3Rhc2snLCBjaGlsZEVsZW1lbnQ6ICdpbWcnLCBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1snYWRkLnN2ZyddfSxcbiAgICAgICAgICAgIC8vIHtlbGVtZW50OiAnYnV0dG9uJywgY2xhc3M6ICdidC1zZXR0aW5nc24nLCBjaGlsZEVsZW1lbnQ6ICdpbWcsIHNyYzogbnVsbH0sXG4gICAgICAgICAgICB7ZWxlbWVudDogJ2EnLCBjbGFzczogJ2dpdGh1YicsIGNoaWxkRWxlbWVudDogJ2ltZycsIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydnaXRodWItbWFyay9naXRodWItbWFyay13aGl0ZS5zdmcnXSwgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9taWtleUNvcy90aGVPZGluUHJvamVjdC90cmVlL21haW4vamF2YVNjcmlwdC9wcm9qZWN0cy90b2RvLWxpc3QnLCB0YXJnZXQ6ICdfYmxhbmsnfVxuICAgICAgICBdLFxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmlkID0gJ25hdmJhcic7XG5cbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBpbiB0aGlzLmhlYWRlckNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbGV0IHdyYXBwZXJDbGFzcztcbiAgICAgICAgICAgIHNlY3Rpb24gPT09ICdoZWFkZXJMZWZ0JyA/IHdyYXBwZXJDbGFzcyA9ICduYXZfbGVmdCcgOiB3cmFwcGVyQ2xhc3MgPSAnbmF2X3JpZ2h0JztcbiAgICAgICAgICAgIGhlYWRlcldyYXBwZXIuY2xhc3NMaXN0LmFkZCh3cmFwcGVyQ2xhc3MpO1xuICAgICAgICAgICAgaGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICB0aGlzLmhlYWRlckNvbnRlbnRbc2VjdGlvbl0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaGVhZGVySXRlbS5jbGFzc0xpc3QuYWRkKGl0ZW0uY2xhc3MpO1xuICAgICAgICAgICAgICAgIGlmICgncGxhY2Vob2xkZXInIGluIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVySXRlbS5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgaXRlbS5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uY2hpbGRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUljb24uc3JjID0gaXRlbS5zcmM7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoZWFkZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVySXRlbSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXJDb250YWluZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyV3JhcHBlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnQ7XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBjbGFzc05hbWUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgbGV0IHN1YnNjcmliZXI7XG4gICAgICAgIGlmIChjbGFzc05hbWUuaW5jbHVkZXMoJ2hvbWUnKSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlciA9ICdjb250ZW50JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIgPSAnc2lkZWJhcidcbiAgICAgICAgfVxuICAgICAgICBwdWJTdWIucHVibGlzaChzdWJzY3JpYmVyLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG59IiwiaW1wb3J0IGJ1aWxkUHJvamVjdHMgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0cyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0VGFza3MgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0X3Rhc2tzJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBtYWluLmlkID0gJ21haW5fY29udGVudCc7XG4gICAgbWFpbkNvbnRlbnQuY2FjaGVET00obWFpbik7XG4gICAgbWFpbkNvbnRlbnQucmVuZGVyKCk7XG4gICAgbWFpbkNvbnRlbnQuYmluZEV2ZW50cygpO1xuXG4gICAgcHViU3ViLnN1YnNjcmliZSgnY29udGVudCcsIG1haW5Db250ZW50LnN3aXRjaENvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG1haW47XG59XG5cbmNvbnN0IGJ1aWxkID0ge1xuICAgIHByb2plY3RzOiBidWlsZFByb2plY3RzLFxuICAgIHByb2plY3Q6IGJ1aWxkUHJvamVjdFRhc2tzLFxufVxuXG5leHBvcnQgY29uc3QgbWFpbkNvbnRlbnQgPSB7XG4gICAgYWN0aXZlQ29udGVudDogbnVsbCxcbiAgICBhY3RpdmVUYWI6IG51bGwsXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLm1haW4gPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMubWFpbk92ZXJsYXkgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLm92ZXJsYXlfbWFpbl9jb250ZW50Jyk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGtleSwgdXVpZCkge1xuICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFsncHJvamVjdCddKHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYWluLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKHV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlQ29udGVudChjb250ZW50KTtcbiAgICAgICAgdGhpcy5tYWluLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoQ29udGVudCA9IHRoaXMuc3dpdGNoQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIH0sXG4gICAgc3dpdGNoQ29udGVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgY2xhc3NTdWJzdHJpbmcgPSBlLmNsYXNzTmFtZS5pbmNsdWRlcygnZGVsZXRlJykgPyBlLmNsYXNzTmFtZS5zdWJzdHJpbmcoZS5jbGFzc05hbWUuaW5kZXhPZignXycpICsgMSwgZS5jbGFzc05hbWUubGFzdEluZGV4T2YoJ18nKSkgOiBlLmNsYXNzTmFtZS5zdWJzdHJpbmcoZS5jbGFzc05hbWUubGFzdEluZGV4T2YoJ18nKSArIDEpO1xuICAgICAgICBsZXQgdXVpZCA9IGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnV1aWQgfHwgZS5kYXRhc2V0LmluYm94VXVpZDtcbiAgICAgICAgbGV0IHJlbmRlcktleSA9IE9iamVjdC5rZXlzKGJ1aWxkKS5maW5kKGtleSA9PiBrZXkgPT09IGNsYXNzU3Vic3RyaW5nKTtcbiAgICAgICAgbGV0IGFyZ3MgPSBbJ3Byb2plY3QnLCB1dWlkXTtcblxuICAgICAgICBpZiAocmVuZGVyS2V5ICYmIHV1aWQpIHtcbiAgICAgICAgICAgIC8vIHJlbmRlcnMgcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYihlKTtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSByZW5kZXJLZXk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlbmRlcktleSAmJiAhdXVpZCkge1xuICAgICAgICAgICAgLy8gaWYgaG9tZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcnMgdGhlIHRvZGF5IHNlY3Rpb25cbiAgICAgICAgICAgIGFyZ3NbMV0gPSBwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkO1xuICAgICAgICB9IGVsc2UgaWYgKGNsYXNzU3Vic3RyaW5nID09PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgLy8gaWYgYSBwcm9qZWN0IGlzIHRoZSBjb250ZW50IGFuZCBpcyBkZWxldGVkLFxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcnMgdGhlIGluYm94IHNlY3Rpb25cbiAgICAgICAgICAgIGFyZ3NbMV0gPSBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS51dWlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIoZSk7XG4gICAgICAgICAgICBhcmdzWzBdID0gJ3Byb2plY3RzJztcbiAgICAgICAgfVxuICAgICAgICBtYWluQ29udGVudC5yZW5kZXIoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgfSxcbiAgICBzZXRBY3RpdmVUYWI6IGZ1bmN0aW9uKHRhYikge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgfSxcbiAgICBzZXRBY3RpdmVDb250ZW50OiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLmFjdGl2ZUNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0sXG59IiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3QtY29udHJvbGxlcic7XG5cbi8vIG1pbWljcyBhbGVydCBib3ggY29uZmlybWluZyB0YXNrL3Byb2plY3QgcmVtb3ZhbFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNb2RhbFJlbW92ZShvYmopIHtcbiAgICBjb25zb2xlLmxvZyhgYnVpbGRNb2RhbFJlbW92ZSgpIGlzIHJ1bm5pbmcgZnJvbSBtbW9kYWxfcmVtb3ZlLmpzYCk7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgXG4gICAgY29uc29sZS5sb2cob2JqKVxuICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAnbW9kYWwnO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybV9yZW1vdmFsJyk7XG5cbiAgICBjb25zdCBtb2RhbCA9IGJ1aWxkTW9kYWwoZGlhbG9nRWxlbWVudCwgZm9ybSwgb2JqKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKG1vZGFsLnJlbmRlcigpKTtcbiAgICBtb2RhbC5jYWNoZURPTSgpO1xuICAgIG1vZGFsLmJpbmRFdmVudHMoKTtcblxuICAgIGRpYWxvZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaWFsb2dFbGVtZW50KTtkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xufVxuXG5jb25zdCBidWlsZE1vZGFsID0gKGRpYWxvZ0VsZW1lbnQsIGZvcm0sIG9iaikgPT4ge1xuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgZGlhbG9nRWxlbWVudCxcbiAgICAgICAgZm9ybSxcbiAgICAgICAgdHlwZTogb2JqLnR5cGUsXG4gICAgICAgIG9iaixcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIG1vZGFsKHN0YXRlKSxcbiAgICApXG5cbn1cblxuY29uc3QgbW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gICAgZGlhbG9nRWxlbWVudDogc3RhdGUuZGlhbG9nRWxlbWVudCxcbiAgICBmb3JtOiBzdGF0ZS5mb3JtLFxuICAgIHR5cGU6IHN0YXRlLnR5cGUsXG4gICAgc2VsZWN0aW9uOiBzdGF0ZS5vYmosXG4gICAgYnV0dG9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHRleHQ6ICdDYW5jZWwnLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHRleHQ6ICdEZWxldGUnLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9zdWJtaXRfcmVtb3ZlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX2NhbmNlbCcpO1xuICAgICAgICB0aGlzLmJ0bkRlbGV0ZSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF9yZW1vdmUnKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZUZvcm0gPSB0aGlzLmNsb3NlRm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWwgPSB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0Rm9ybSk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUZvcm0pO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gRGVsZXRlP1xuICAgICAgICAvLyBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHByb2plY3RcbiAgICAgICAgLy8gQ2FuY2VsIGFuZCBkZWxldGUgYnV0dG9uc1xuXG4gICAgICAgIC8vIE5lZWQgcHJvamVjdC50aXRsZSBhbmQgdGFzay5uYW1lXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgICBjb25zdCBjb25maXJtYXRpb25NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB1bmlxdWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdEZWxldGU/J1xuICAgICAgICBjb25maXJtYXRpb25NZXNzYWdlLnRleHRDb250ZW50ID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYDtcbiAgICAgICAgdW5pcXVlVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuc2VsZWN0aW9uLnRpdGxlID8gdGhpcy5zZWxlY3Rpb24udGl0bGUgOiB0aGlzLnNlbGVjdGlvbi5uYW1lO1xuICAgICAgICBjb25maXJtYXRpb25NZXNzYWdlLmFwcGVuZENoaWxkKHVuaXF1ZVRleHQpXG4gICAgICAgIC8vIDxwPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPHNwYW4+JHt0aGlzLnRleHR9PC9zcGFuPj88L3A+XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25maXJtYXRpb25NZXNzYWdlKTtcblxuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCksIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBpdGVtLnRleHQ7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG4gICAgc3VibWl0Rm9ybTogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICd0YXNrJykge1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVRhc2snLCB0aGlzLnNlbGVjdGlvbi51dWlkVGFzayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGlvbi51dWlkKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVQcm9qZWN0JywgdGhpcy5zZWxlY3Rpb24udXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZUZvcm0oKTtcbiAgICB9LFxuICAgIGNsb3NlRm9ybTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKVxuICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfSxcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjbG9zZU1vZGFsIHJ1bm5pbmcgZnJvbSBtb2RhbF9yZW1vdmUuanNgKTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSAnbW9kYWwnKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxufSkiLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkT3ZlcmxheSgpIHtcbiAgICByZXR1cm4gb3ZlcmxheS5yZW5kZXIoKTtcbn1cblxuY29uc3Qgb3ZlcmxheSA9IHtcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IGNvbnRhaW5lcjtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5X21haW5fY29udGVudCcpO1xuICAgICAgICB0aGlzLmNhY2hlRE9NKG92ZXJsYXkpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgICAgICByZXR1cm4gb3ZlcmxheTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpbU92ZXJsYXkgPSB0aGlzLmRpbU92ZXJsYXkuYmluZCh0aGlzKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgnZGltJywgb3ZlcmxheS5kaW1PdmVybGF5KTtcbiAgICB9LFxuICAgIGRpbU92ZXJsYXk6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdkaW0nKTtcbiAgICAgICAgfSBlbHNlIGlmICghZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2RpbScpO1xuICAgICAgICB9XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfZm9ybSc7XG5pbXBvcnQgeyB0YXNrc0xpc3QgfSBmcm9tICcuLi9jb21wb25lbnRzL3Rhc2tzX2xpc3QnO1xuXG4vLyByZW5kZXJzIGEgcHJvamVjdCdzIHBhZ2UgYW5kIGl0J3MgdGFza3Ncbi8vIHdoZW4gd2UgYXJlIGF0IGEgcHJvamVjdCdzIHBhZ2VcbiAgICAvLyB3ZSBkZWxldGUgaXQgZnJvbSB0aGVyZSBvciBmcm9tIHRoZSBzaWRlYmFyXG4gICAgICAgIC8vIGNoYW5nZSBjb250ZW50IHRvIGhvbWVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdFRhc2tzKHV1aWQpIHtcbiAgICBjb25zb2xlLmxvZyhgdGFza3MuanMgcnVubmluZ2ApOyAvLyBmb3IgZGVidWdnaW5nXG4gICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWN0aXZlKHV1aWQpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0Q29udHJvbGxlci5maW5kKHV1aWQpO1xuICAgIHByb2plY3RUYXNrcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICBjb25zdCBjb250ZW50ID0gcHJvamVjdFRhc2tzLnJlbmRlcigpO1xuICAgIHByb2plY3RUYXNrcy5jYWNoZURPTShjb250ZW50KTtcbiAgICBwcm9qZWN0VGFza3MuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBjb250ZW50O1xufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFRhc2tzID0ge1xuICAgIHByb2plY3Q6IG51bGwsXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnByb2plY3RUYXNrc0NvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgICAgICB0aGlzLnVsTGlzdCA9IHRoaXMucHJvamVjdFRhc2tzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50YXNrc19saXN0Jyk7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IHRoaXMudWxMaXN0LmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuYnRuQWRkVGFzayA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3IoJy5idG5fYWRkX3Rhc2snKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFRhc2tzRm9ybSk7XG4gICAgICAgIC8vIHRoaXMgd2lsbCBuZWVkIHRvIGdlbmVyYXRlIGEgZm9ybVxuICAgICAgICAgICAgLy8gcmVtb3ZlcyB0aGUgYnV0dG9uXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcmVuZGVyKCkgaW4gcHJvamVjdF90YXNrcy5qcyBpcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICAgICAgLy8gY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpOyAvLyByZW5hbWU/XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgndGFza3NfbGlzdCcpO1xuXG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcblxuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRhc2tzTGlzdC5pbml0KCkpOyAvLyBzb21ldGhpbmcgZmlzaGluZyBpcyBnb2luZyBvblxuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbignYWRkJywgJ3Rhc2snLCAnQWRkIHRhc2snKSk7XG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RzQ29udGFpbmVyXG4gICAgfSxcbn0iLCJpbXBvcnQgeyBidWlsZExpc3QgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzX2xpc3QnO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzX2Zvcm0nO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3QtY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdHMoKSB7XG4gICAgY29uc29sZS5sb2coYHByb2plY3RzLmpzIHJ1bm5pbmdgKTtcblxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ1BST0pFQ1RTJztcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdHMucmVuZGVyKCkpO1xuICAgIFxuICAgIHByb2plY3RzLmNhY2hlRE9NKHByb2plY3RzQ29udGFpbmVyKTtcbiAgICBwcm9qZWN0cy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbn1cblxuY29uc3QgcHJvamVjdHMgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfcHJvamVjdCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkUHJvamVjdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYW5jaG9yV3JhcHBlci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdHMnKTtcblxuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAncHJvamVjdCcsICdBZGQgcHJvamVjdCcpKTsgICAgICAgIFxuICAgICAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnY29udGVudCcsIHBhcmVudENvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZCgnY29udGVudCcpLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoJ2NvbnRlbnQnKS5pbml0KCk7XG4gICAgICAgIHJldHVybiBwYXJlbnRDb250YWluZXI7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzcyc7XG5cbi8vIHJlbmRlcnMgYSBmb3JtIHRvIGNyZWF0ZSBhIHByb2plY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdEZvcm0oKSB7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAnZm9ybV9wcm9qZWN0JztcbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm1Qcm9qZWN0LnJlbmRlcigpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gICAgZm9ybVByb2plY3QuY2FjaGVET00oKTtcbiAgICBmb3JtUHJvamVjdC5iaW5kRXZlbnRzKCk7XG59XG5cbmNvbnN0IGZvcm1Qcm9qZWN0ID0ge1xuICAgIGZvcm1DaGlsZHJlbjoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIG5hbWU6ICd0aXRsZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIFByb2plY3QgVGl0bGUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBmb3JtQnV0dG9uczoge1xuICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF9wcm9qZWN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybV9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNmb3JtIGlucHV0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwgPSB0aGlzLnJlbW92ZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgdGhpcy5yZW1vdmVNb2RhbClcbiAgICAgICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZU1vZGFsKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0Rm9ybSk7XG4gICAgfSxcbiAgICAvLyB0YWtlIGEgbG9vayBhdCByZXN0YXVyYW50IHByb2plY3QncyBjb250YWN0IG1vZHVsZVxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBjb25zdCBmb3JtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgZm9ybUJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9ybUJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnZm9ybV9idXR0b25zJyk7XG4gICAgICAgIGZvcm1FbGVtZW50LmlkID0gJ2Zvcm0nO1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcik7XG5cbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIHRoaXMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybV9pdGVtJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5oYXNPd25Qcm9wZXJ0eSgncmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSwgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXSk7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBmb3JtQ2hpbGQ7XG4gICAgICAgICAgICAgICAgbGFiZWwuaHRtbEZvciA9IHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uaWQ7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGJ0biBpbiB0aGlzLmZvcm1CdXR0b25zKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJ1dHRvbiwgdGhpcy5mb3JtQnV0dG9uc1tidG5dKTtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBidG47XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUJ1dHRvbnMpO1xuXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudFxuICAgIH0sXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0RJQUxPRycpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gb3B0aW9uYWwsIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgICAgLy8gaWYgZm9ybSBpcyB2YWxpZFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gYWRkUHJvamVjdCgpXG4gICAgICAgIC8vIGFkZFByb2plY3QodGhpcy5mb3JtSW5wdXRzKTtcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuYWRkUHJvamVjdCh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAvLyBidWlsZExpc3QubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBtb2R1bGUucmVuZGVyKCkpXG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKCdzaWRlYmFyJykucmVuZGVyKCk7IC8vIHdpbGwgcmVuZGVyIG9ubHkgdGhlIHNpZGViYXJcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3NpZGViYXInKTtcbiAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkTW9kYWxSZW1vdmUgZnJvbSAnLi9tb2RhbF9yZW1vdmUnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0IEljb25JbmJveCBmcm9tICcuLi9hc3NldHMvaWNvbnMvaW5ib3guc3ZnJztcbmltcG9ydCBJY29uVG9kYXkgZnJvbSAnLi4vYXNzZXRzL2ljb25zL3RvZGF5LnN2Zyc7XG5pbXBvcnQgSWNvblByb2plY3QgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2NpcmNsZS5zdmcnO1xuaW1wb3J0ICcuLi9zdHlsZXMvcHJvamVjdHMuY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzJztcblxuLy8gY29uc3QgaWNvbnMgPSB7aW5ib3g6IEljb25JbmJveCwgdG9kYXk6IEljb25Ub2RheSB9O1xuXG5jb25zdCBidWlsZFByb2plY3RzTGlzdCA9ICh0eXBlLCBjb250YWluZXIsIGFycmF5KSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFycmF5LFxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgcHJvamVjdHNMaXN0KHN0YXRlKSxcbiAgICAgICAgc2V0SWNvbnMoc3RhdGUpLFxuICAgICAgICApXG59XG5cbi8vIHJlbmFtZSB0byBidWlsZFByb2plY3RzTGlzdCAoPylcbmV4cG9ydCBjb25zdCBidWlsZExpc3QgPSB7XG4gICAgbW9kdWxlczogW10sXG4gICAgYWRkOiBmdW5jdGlvbiAodHlwZSwgY29udGFpbmVyLCBhcnJheSkge1xuICAgICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIHRoZSBtb2R1bGUgZXhpc3RzIGFscmVhZHlcbiAgICAgICAgLy8gaWYgbW9kdWxlIGV4aXN0cywgdGhlbiB1cGRhdGUgaXQncyBjb250YWluZXJcbiAgICAgICAgLy8gcHJldmVudHMgc2ltaWxhciBtb2R1bGVzIHRvIGJlIGFkZGVkXG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXMuc29tZShtb2R1bGUgPT4gbW9kdWxlLnR5cGUgPT09IHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmQodHlwZSkuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVzID0gWy4uLnRoaXMubW9kdWxlcywgYnVpbGRQcm9qZWN0c0xpc3QodHlwZSwgY29udGFpbmVyLCBhcnJheSldO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChtb2R1bGUgPT4gbW9kdWxlLnR5cGUgPT09IHR5cGUpO1xuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdHNMaXN0ID0gKHN0YXRlKSA9PiAoe1xuICAgIHJlbW92ZVNlbGVjdGlvbjogbnVsbCxcbiAgICBhcnJheTogc3RhdGUuYXJyYXksXG4gICAgdHlwZTogc3RhdGUudHlwZSxcbiAgICBjb250YWluZXI6IHN0YXRlLmNvbnRhaW5lcixcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdHNfbGlzdCcpO1xuXG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSlcbiAgICAgICAgdGhpcy5jYWNoZURPTShsaXN0KTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3QpO1xuXG4gICAgfSxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSAgeyAgICBcbiAgICAgICAgdGhpcy51bExpc3QgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IHRoaXMudWxMaXN0LmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0SXRlbXMgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEFuY2hvcnMgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaSBhJyk7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdCA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fZGVsZXRlX3Byb2plY3QnKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVByb2plY3QgPSB0aGlzLnJlbW92ZVByb2plY3QuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wdWJsaXNoID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcyk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3JlbW92ZVByb2plY3QnLCB0aGlzLnJlbW92ZVByb2plY3QpO1xuICAgICAgICB0aGlzLmJ0bkRlbGV0ZVByb2plY3QuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVQcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzLmZvckVhY2goIHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvckltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgYW5jaG9yU3Bhbi50ZXh0Q29udGVudCA9IHRoaXMuYXJyYXlbaV0udGl0bGU7XG4gICAgICAgICAgICBhbmNob3IuaHJlZiA9IGAjJHt0aGlzLmFycmF5W2ldLnRpdGxlfTtgXG5cbiAgICAgICAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkJywgdGhpcy5hcnJheVtpXS51dWlkKTtcbiAgICAgICAgICAgIGFuY2hvci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdCcpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuaWNvbnMpLmZpbmQoYSA9PiBhID09PSB0aGlzLmFycmF5W2ldLnRpdGxlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgYW5jaG9ySW1nLnNyYyA9IHRoaXMuaWNvbnNbT2JqZWN0LmtleXModGhpcy5pY29ucykuZmluZChhID0+IGEgPT09IHRoaXMuYXJyYXlbaV0udGl0bGUudG9Mb3dlckNhc2UoKSldXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuY2hvckltZy5zcmMgPSB0aGlzLmljb25zWydjaXJjbGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGFuY2hvckltZyk7XG4gICAgICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoYW5jaG9yU3Bhbik7XG4gICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChhbmNob3IpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSAhPT0gJ21pc2MnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gYnVpbGRCdXR0b24oJ2RlbGV0ZScsICdwcm9qZWN0Jyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmJveC11dWlkJywgcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZCk7XG4gICAgICAgICAgICAgICAgYnV0dG9uU3Bhbi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGJ1dHRvblNwYW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0SXRlbXMuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy51bExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW1zKTtcbiAgICAgICAgICAgIC8vIGNoYW5nZXMgY29udGVudCB0byB0aGUgbmV3bHkgcHJvamVjdCBpcyBhZGRlZFxuICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdHNMaXN0SXRlbXMubGVuZ3RoIDwgdGhpcy5hcnJheS5sZW5ndGggJiYgdGhpcy50eXBlID09PSAnc2lkZWJhcicpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIFsuLi5saXN0SXRlbXMuY2hpbGRyZW5dLnNwbGljZSgtMSkucG9wKCkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhY2hlRE9NKHRoaXMudWxMaXN0KTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0SXRlbXM7XG4gICAgfSxcbiAgICByZW1vdmVQcm9qZWN0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnVpbGRMaXN0Lm1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgIG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IGxpc3RJdGVtO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFVVSUQgPSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQ7XG4gICAgICAgICAgICBidWlsZE1vZGFsUmVtb3ZlKHByb2plY3RDb250cm9sbGVyLmZpbmQocHJvamVjdFVVSUQpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50eXBlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVtb3ZlU2VsZWN0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgIC8vIE9SIHRoZSBwcm9qZWN0J3MgdXVpZCB3ZSB3YW50IHRvIHJlbW92ZSBpcyB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBhY3RpdmUgcHJvamVjdCdzIHV1aWRcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY29udGVudCB0byB0aGUgaW5ib3hcblxuICAgICAgICAgICAgaWYgKHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKSA9PT0gdW5kZWZpbmVkIHx8IGUgPT09IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS51dWlkKSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2NvbnRlbnQnLCB0aGlzLnJlbW92ZVNlbGVjdGlvbi5sYXN0Q2hpbGQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5yZW1vdmUoZSk7XG4gICAgICAgICAgICBidWlsZExpc3QubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBtb2R1bGUucmVuZGVyKCkpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24gPSBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBwdWJsaXNoKCkgcnVubmluZyBmcm9tIHByb2plY3RzX2lzdC5qc2ApOyAvLyBmb3IgZGVidWdnaW5nXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgbGV0IHByb2plY3RVVUlEID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQudXVpZFxuICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2lkZWJhcid8fCB0aGlzLnR5cGUgPT09ICdtaXNjJykge1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3NpZGViYXInKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJDYWNoZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudWxMaXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RJdGVtcyA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0QW5jaG9ycyA9IG51bGw7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdCA9IG51bGw7XG4gICAgfSxcbn0pXG5cbmNvbnN0IHNldEljb25zID0gKHN0YXRlKSA9PiB7XG4gICAgbGV0IGljb25zID0ge31cblxuICAgIGlmIChzdGF0ZS50eXBlID09PSAnbWlzYycpIHtcbiAgICAgICAgaWNvbnMuaWNvbnMgPSB7IGluYm94OiBJY29uSW5ib3gsIHRvZGF5OiBJY29uVG9kYXkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpY29ucy5pY29ucyA9IHsgY2lyY2xlOiBJY29uUHJvamVjdCB9O1xuICAgIH1cbiAgICByZXR1cm4gaWNvbnM7XG59IiwiaW1wb3J0IGltcG9ydEFsbCBmcm9tICcuLi8uLi91dGlsaXRpZXMvaW1wb3J0LWFsbCc7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0Rm9ybSBmcm9tICcuLi9wcm9qZWN0c19mb3JtJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgYnVpbGRMaXN0IH0gZnJvbSAnLi4vcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9zaWRlYmFyLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkU2lkZWJhcihjb250ZW50KSB7XG4gICAgY29uc3Qgc2lkZWJhcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzaWRlYmFyV3JhcHBlci5pZCA9ICdzaWRlYmFyJztcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICBzaWRlYmFyV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2lkZWJhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIHNpZGViYXJXcmFwcGVyLmFwcGVuZENoaWxkKHNpZGViYXIucmVuZGVyKCkpO1xuICAgIHNpZGViYXIuY2FjaGVET00oc2lkZWJhcldyYXBwZXIpO1xuICAgIHNpZGViYXIuYmluZEV2ZW50cygpO1xuXG4gICAgcHViU3ViLnN1YnNjcmliZSgnc2lkZWJhcicsIHNpZGViYXIudG9nZ2xlU2lkZWJhcik7XG4gICAgcmV0dXJuIHNpZGViYXJXcmFwcGVyO1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gICAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uLy4uL2Fzc2V0cy9pY29ucycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbn1cblxuY29uc3Qgc2lkZWJhciA9IHtcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluX2NvbnRlbnQnKSkpXG4gICAgICAgIHRoaXMuc2lkZWJhciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9IHRoaXMuc2lkZWJhci5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl93cmFwcGVyJyk7XG4gICAgICAgIC8vIG5lZWQgdG8gYXBwZW5kIGxpc3RfcHJvamVjdHMgdG8gdGhpcy5wcm9qZWN0c0NvbnRhaW5lclxuXG4gICAgICAgIHRoaXMucHJvamVjdHNDb250YWluZXIgPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignI3Byb2plY3RzX2NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmFuY2hvclByb2plY3RzID0gdGhpcy5wcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubmF2X3Byb2plY3RzJyk7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF9wcm9qZWN0Jyk7XG4gICAgICAgIC8vIHRoaXMuYW5jaG9ySW5ib3ggPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLm5hdl9pbmJveCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2lkZWJhciA9IHRoaXMudG9nZ2xlU2lkZWJhci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnB1Ymxpc2ggPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idG5BZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRQcm9qZWN0Rm9ybSk7XG4gICAgICAgIHRoaXMuYW5jaG9yUHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gsIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5zaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVTaWRlYmFyKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnN0IHNpZGViYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHNpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRNaXNjUHJvamVjdHMoKTtcbiAgICAgICAgY29uc3QgbmF2TWlzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidWlsZExpc3QuYWRkKCdtaXNjJywgbmF2TWlzYywgcHJvamVjdENvbnRyb2xsZXIubWlzYyk7XG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKGBtaXNjYCkuaW5pdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdHNBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgLy8gc2lkZWJhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl93cmFwcGVyJyk7XG4gICAgICAgIHNpZGViYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmlkID0gJ3Byb2plY3RzX2NvbnRhaW5lcic7XG4gICAgICAgIG5hdk1pc2MuY2xhc3NMaXN0LmFkZCgncHJvamVjdHNfbWlzY19jb250YWluZXInKTtcblxuICAgICAgICBwcm9qZWN0c0FuY2hvci50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICAgIHByb2plY3RzQW5jaG9yLmhyZWYgPSAnI3Byb2plY3RzJztcbiAgICAgICAgcHJvamVjdHNBbmNob3IuY2xhc3NMaXN0LmFkZCgnbmF2X3Byb2plY3RzJylcblxuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKHByb2plY3RzQW5jaG9yKTtcbiAgICAgICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbignYWRkJywgJ3Byb2plY3QnKSk7XG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvcldyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkTGlzdC5hZGQoJ3NpZGViYXInLCBwcm9qZWN0c0NvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZChgc2lkZWJhcmApLmluaXQoKTtcblxuICAgICAgICBzaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hdk1pc2MpO1xuICAgICAgICBzaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RzQ29udGFpbmVyKTtcbiAgICAgICAgLy8gc2lkZWJhcldyYXBwZXIuYXBwZW5kQ2hpbGQoc2lkZWJhckNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBzaWRlYmFyQ29udGFpbmVyO1xuICAgICAgICAvLyByZXR1cm4gc2lkZWJhcldyYXBwZXI7XG4gICAgfSxcbiAgICB0b2dnbGVTaWRlYmFyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLnNpZGViYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVNpZGViYXIoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnZGltJywgdGhpcy5zaWRlYmFyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnRvZ2dsZVNpZGViYXIoKTtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2NvbnRlbnQnLCBlLmN1cnJlbnRUYXJnZXQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcblxuY29uc3QgYnVpbGRUYXNrRm9ybSA9ICh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCkgPT4ge1xuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgdHlwZSxcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIGlmIChidXR0b24uaGFzQXR0cmlidXRlKCdyb2xlJykpIHtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5idXR0b24gPSBidXR0b247XG4gICAgICAgIHN0YXRlLmJ1dHRvblBhcmVudCA9IGJ1dHRvblBhcmVudDtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGZvcm1UYXNrKHN0YXRlKSxcbiAgICAgICAgICAgIG5vbk1vZGFsKHN0YXRlKSxcbiAgICAgICAgICAgIGZvcm1JbnB1dHMoc3RhdGUpLFxuICAgICAgICApXG4gICAgfVxuXG4gICAgc3RhdGUuZGlhbG9nRWxlbWVudCA9IGRpYWxvZ0VsZW1lbnQ7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBmb3JtVGFzayhzdGF0ZSksXG4gICAgICAgIG1vZGFsKHN0YXRlKSxcbiAgICAgICAgZm9ybUlucHV0cyhzdGF0ZSksXG4gICAgKVxufVxuXG5leHBvcnQgY29uc3QgYnVpbGRGb3JtID0ge1xuICAgIHNlY3Rpb25zOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uICh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAvLyBpZiBzZWN0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMsIHVwZGF0ZSBpdCdzIGNvbnRhaW5lclxuICAgICAgICAvLyBwcmV2ZW50cyBzaW1pbGFyIHNlY3Rpb25zIHRvIGJlIGFkZGVkXG4gICAgICAgIGlmICh0aGlzLmZpbmQodHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZCh0eXBlKS5jbG9zZUZvcm0oKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSBbLi4udGhpcy5zZWN0aW9ucywgYnVpbGRUYXNrRm9ybSh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCldO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMuc3BsaWNlKHRoaXMuc2VjdGlvbnMuaW5kZXhPZih0aGlzLmZpbmQodHlwZSkpLCAxKTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnMuZmluZChzZWN0aW9uID0+IHNlY3Rpb24udHlwZSA9PT0gdHlwZSk7XG4gICAgfVxufVxuXG4vLyByZW5kZXJzIGEgZm9ybSB0byBjcmVhdGUgYSB0YXNrXG4gICAgLy8gb25lIG5lZWRzIHRvIGJlIGEgZGlhbG9nIGVsZW1lbnRcbiAgICAvLyBvbmUgbmVlZHMgdG8gYmUgYSBub24tZGlhbG9nIGVsZW1lbnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVGFza3NGb3JtKGUpIHtcbiAgICBjb25zdCBidXR0b24gPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgYnV0dG9uUGFyZW50ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fdGFzaycpO1xuICAgIGlmICghYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpICYmIGJ1dHRvblBhcmVudC50YWdOYW1lICE9PSAnTEknKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICAgICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LmlkID0gJ21vZGFsJztcbiAgICAgICAgYnVpbGRGb3JtLmFkZCgnbW9kYWwnLCBmb3JtLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZGlhbG9nRWxlbWVudCk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChidWlsZEZvcm0uZmluZChgbW9kYWxgKS5yZW5kZXIoKSk7XG4gICAgICAgIGJ1aWxkRm9ybS5maW5kKGBtb2RhbGApLmNhY2hlRE9NKCk7XG4gICAgICAgIGJ1aWxkRm9ybS5maW5kKGBtb2RhbGApLmJpbmRFdmVudHMoKTtcbiAgICAgICAgZGlhbG9nRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaWFsb2dFbGVtZW50KTtcbiAgICAgICAgZGlhbG9nRWxlbWVudC5zaG93TW9kYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlLmN1cnJlbnRUYXJnZXQucmVwbGFjZVdpdGgoZm9ybSk7XG4gICAgICAgIGJ1aWxkRm9ybS5hZGQoJ2RlZmF1bHQnLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudClcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLnJlbmRlcigpKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYGRlZmF1bHRgKS5jYWNoZURPTSgpO1xuICAgICAgICBidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLmJpbmRFdmVudHMoKTtcbiAgICB9XG59XG5cbmNvbnN0IGZvcm1UYXNrID0gKHN0YXRlKSA9PiAoe1xuICAgIHR5cGU6IHN0YXRlLnR5cGUsXG4gICAgZm9ybTogc3RhdGUuZm9ybSxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2FuY2VsJyk7XG4gICAgICAgIHRoaXMuYnRuU3VibWl0ID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fc3VibWl0X3Rhc2snKSB8fCB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl91cGRhdGVfdGFzaycpO1xuICAgICAgICB0aGlzLmZvcm1JbnB1dHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfaW5wdXQnKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZUZvcm0gPSB0aGlzLmNsb3NlRm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlRm9ybSk7XG4gICAgICAgIGlmICh0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCA9IHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdW5CaW5kRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBmb3JtQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtQnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdmb3JtX2J1dHRvbnMnKTtcbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIHRoaXMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybV9pdGVtJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5oYXNPd25Qcm9wZXJ0eSgnZWxlbWVudCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBsYWJlbC5odG1sRm9yID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzLmlkO1xuICAgICAgICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzLnBsYWNlaG9sZGVyO1xuXG4gICAgICAgICAgICAgICAgLy8gaWRlYSwgbWFrZSBzZXBhcmF0ZSBtb2R1bGUgZm9yIG9wdGlvbnMgYnV0dG9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gNDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybUNoaWxkID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IHByb2plY3RDb250cm9sbGVyLnByb2plY3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaTsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucy5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLm9wdGlvbnMuYXR0cmlidXRlcyhpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZENoaWxkKHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgYnRuIGluIHRoaXMuZm9ybUJ1dHRvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnV0dG9uLCB0aGlzLmZvcm1CdXR0b25zW2J0bl0pO1xuICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IGJ0bjtcblxuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgZm9ybUJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQnV0dG9ucyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG4gICAgc3VibWl0Rm9ybTogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLmFkZFRhc2sodGhpcy5mb3JtSW5wdXRzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgncmVzZXRPbGRUYXNrJywgdGhpcy5idXR0b24pOyAvLyB0ZXN0aW5nXG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kKHRoaXMubGlzdEl0ZW0uZGF0YXNldC51dWlkUHJvaikudXBkYXRlVGFzayh0aGlzLmxpc3RJdGVtLmRhdGFzZXQudXVpZCwgdGhpcy5mb3JtSW5wdXRzKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2VGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjbG9zZUZvcm0oKSBmcm9tIHRhc2tzX2Zyb20uanMgaXMgcnVubmluZ2ApOyAvLyBmb3IgZGVidWdnaW5nXG4gICAgICAgIGlmICghdGhpcy5kaWFsb2dFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0ucmVwbGFjZVdpdGgodGhpcy5idXR0b24pO1xuICAgICAgICAgICAgYnVpbGRGb3JtLnJlbW92ZSh0aGlzLnR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXNldE9sZFRhc2snKTsgLy8gdGVzdGluZ1xuICAgIH1cbn0pO1xuXG5jb25zdCBub25Nb2RhbCA9IChzdGF0ZSkgPT4gKHtcbiAgICBidXR0b246IHN0YXRlLmJ1dHRvbixcbiAgICBwYXJlbnRCdXR0b246IHN0YXRlLmJ1dHRvblBhcmVudCxcbn0pO1xuXG5jb25zdCBtb2RhbCA9IChzdGF0ZSkgPT4gKHtcbiAgICBkaWFsb2dFbGVtZW50OiBzdGF0ZS5kaWFsb2dFbGVtZW50LFxuICAgIGNsb3NlTW9kYWw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSAnbW9kYWwnKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGJ1aWxkRm9ybS5yZW1vdmUodGhpcy50eXBlKTtcbiAgICB9LFxufSk7XG5cbmNvbnN0IGZvcm1JbnB1dHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrSXRlbSA9IHN0YXRlLmJ1dHRvbiA/IHN0YXRlLmJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcudGFza19saXN0X2l0ZW0nKSA6IG51bGw7XG4gICAgY29uc3QgcHJvamVjdCA9IHRhc2tJdGVtID8gcHJvamVjdENvbnRyb2xsZXIuZmluZCh0YXNrSXRlbS5kYXRhc2V0LnV1aWRQcm9qKSA6IG51bGw7XG4gICAgY29uc3QgdGFzayA9IHRhc2tJdGVtPyBwcm9qZWN0LmZpbmRUYXNrKHRhc2tJdGVtLmRhdGFzZXQudXVpZCkgOiBudWxsO1xuICAgIFxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGZvcm1DaGlsZCBpbiBpbnB1dHMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZXQgYXR0cmlidXRlcyA9IGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgLy8gZmluZHMgdGFzaydzIGtleSBlcXVhbCB0byBpbnB1dCdzIGlkXG4gICAgICAgICAgICBsZXQga2V5ID0gT2JqZWN0LmtleXModGFzaykuZmluZChpdGVtID0+IGl0ZW0gPT09IGF0dHJpYnV0ZXMuaWQpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMgJiYga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dHMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgIT09ICdkdWVEYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB7IHZhbHVlOiB0YXNrW2tleV0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0geyB2YWx1ZTogbmV3IERhdGUodGFza1trZXldKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlciA9IHRhc2tba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogbnVtYmVyIH0sIHsgdGV4dDogdGV4dCB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dHMgPSB7XG4gICAgICAgIGZvcm1DaGlsZHJlbjoge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVGFzayBuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdEZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHVlRGF0ZToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2R1ZV9kYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0R1ZSBEYXRlJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHVlVGltZToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2R1ZV90aW1lJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0aW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1RpbWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmlvcml0eToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdzZWxlY3QnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ29wdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGZ1bmN0aW9uKHByaW9yaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQcmlvcml0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYFByaW9yaXR5ICR7cHJpb3JpdHl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IG5ld1ByaW9yaXR5LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ld1ByaW9yaXR5LCB7IHNlbGVjdGVkOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ByaW9yaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0U2VsZWN0ZWQgcGFyYW1ldGVyIE1ETlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MT3B0aW9uRWxlbWVudC9PcHRpb24jcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmlvcml0eSA9PT0gND8gT2JqZWN0LmFzc2lnbihuZXdQcmlvcml0eSwgeyBzZWxlY3RlZDogdHJ1ZX0sIHsgZGVmYXVsdFNlbGVjdGVkIDogdHJ1ZX0pIDogbmV3UHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb2plY3Q6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnc2VsZWN0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAncHJvamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncHJvamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJvamVjdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ29wdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzW2ldLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcHJvamVjdENvbnRyb2xsZXIuYWxsUHJvamVjdHNbaV0udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYnV0dG9uICYmIHByb2plY3RDb250cm9sbGVyLmZpbmQoc3RhdGUuYnV0dG9uLmZpcnN0Q2hpbGQuZGF0YXNldC51dWlkUHJvaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci5maW5kKHN0YXRlLmJ1dHRvbi5maXJzdENoaWxkLmRhdGFzZXQudXVpZFByb2opKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0Q29udHJvbGxlci5maW5kKHN0YXRlLmJ1dHRvbi5maXJzdENoaWxkLmRhdGFzZXQudXVpZFByb2opLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzW2ldLnV1aWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvamVjdCwgeyBzZWxlY3RlZDogdHJ1ZSB9LCB7IGRlZmF1bHRTZWxlY3RlZCA6IHRydWV9KSA6IHByb2plY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIuYWxsUHJvamVjdHNbaV0udXVpZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9qZWN0LCB7IHNlbGVjdGVkOiB0cnVlIH0sIHsgZGVmYXVsdFNlbGVjdGVkIDogdHJ1ZX0pIDogcHJvamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1CdXR0b25zOiB7XG4gICAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fY2FuY2VsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgYnV0dG9uIGNsaWNrZWQgaGFzICdyb2xlJyBhdHRyaWJ1dGVcbiAgICAgICAgLy8gYXNzaWduIGZvcm1DaGlsZHJlbiB3aXRoIGEgc2F2ZS1idXR0b25cbiAgICAgICAgLy8gYXNzaWduIGZvcm1UYXNrIHdpdGggYSBjb250ZW50IHByb3BlcnR5L2luaXQgZnVuY3Rpb25cbiAgICAvLyBvdGhlcndpc2UsIFxuICAgICAgICAvLyBhc3NpZ24gZm9ybUNoaWxkcmVuIHdpdGggb25seSBhIGFkZC1idXR0b25cbiAgICBpZiAoc3RhdGUuYnV0dG9uICYmIHN0YXRlLmJ1dHRvbi5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSkge1xuICAgICAgICBjb25zdCBpbnB1dHNFZGl0ID0ge1xuICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgc2F2ZToge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl91cGRhdGVfdGFzaycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wOiB7XG4gICAgICAgICAgICAgICAgbGlzdEl0ZW06IHN0YXRlLmJ1dHRvbi5maXJzdENoaWxkLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpO1xuICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0cy5mb3JtQnV0dG9ucywgaW5wdXRzRWRpdC5idXR0b24pO1xuICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0cywgaW5wdXRzRWRpdC5wcm9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbnB1dHNBZGQgPSB7XG4gICAgICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fc3VibWl0X3Rhc2snLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5wdXRzLmZvcm1CdXR0b25zLCBpbnB1dHNBZGQpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRzO1xufSIsImltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRNb2RhbFJlbW92ZSBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsX3JlbW92ZSc7XG5pbXBvcnQgYnVpbGRUYXNrc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19mb3JtJztcbmltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCAnLi4vc3R5bGVzL3Rhc2tzX2xpc3QuY3NzJztcblxuZXhwb3J0IGNvbnN0IHRhc2tzTGlzdCA9IHtcbiAgICByZW1vdmVTZWxlY3Rpb246IG51bGwsXG4gICAgYnRuRGVsZXRlVGFzazogW10sXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXNldE9sZFRhc2sgPSB0aGlzLnJlc2V0T2xkVGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlbW92ZVRhc2sgPSB0aGlzLnJlbW92ZVRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgnYWRkVGFzaycsIHRoaXMucmVuZGVyKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlVGFzaycsIHRoaXMucmVuZGVyKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgncmVzZXRPbGRUYXNrJywgdGhpcy5yZXNldE9sZFRhc2spO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdyZW1vdmVUYXNrJywgdGhpcy5yZW1vdmVUYXNrKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpXG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMucHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGFzaylcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RDb250YWluZXI7XG4gICAgfSxcbiAgICBvbGRUYXNrOiBudWxsLFxuICAgIHByb2plY3Q6IG51bGwsXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSB0aGlzLmxpc3RDb250YWluZXI7XG4gICAgICAgIC8vIHRoaXMuYnRuRGVsZXRlVGFzayA9IHRoaXMubGlzdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuX2RlbGV0ZV90YXNrJyk7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0SXRlbXMgPSB0aGlzLmxpc3RDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZWRpdFRhc2sgPSB0aGlzLmVkaXRUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29tcGxldGVUYXNrID0gdGhpcy5jb21wbGV0ZVRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgYXJncy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoJ2RlbGV0ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZVRhc2ssIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNvbXBsZXRlVGFzaylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmVkaXRUYXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoaXMgd2lsbCBuZWVkIHRvIGdlbmVyYXRlIGEgZm9ybVxuICAgICAgICAgICAgLy8gcmVtb3ZlcyB0aGUgYnV0dG9uXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKHRhc2spIHtcbiAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tSYWRpbyA9IGJ1aWxkQnV0dG9uKCdyYWRpbycsICd0YXNrJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRhc2tBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIGxpc3RJdGVtV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZCcsIHRhc2sudXVpZFRhc2spO1xuICAgICAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQtcHJvaicsIHRhc2sudXVpZFByb2opO1xuICAgICAgICAgICAgbGlzdEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gICAgICAgICAgICB0YXNrQ29udGVudC5jbGFzc0xpc3QuYWRkKCd0YXNrX2xpc3RfaXRlbV9jb250ZW50Jyk7XG4gICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrX2xpc3RfaXRlbScpO1xuICAgICAgICAgICAgdGFza0FjdGlvbnMuY2xhc3NMaXN0LmFkZCgndGFza19hY3Rpb25zJyk7XG4gICAgICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrX25hbWUnKTtcbiAgICAgICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuXG4gICAgICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCd0YXNrX3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eSAke3Rhc2sucHJpb3JpdHl9YDtcblxuICAgICAgICAgICAgdGFza1JhZGlvLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoYHByaW9yaXR5XyR7dGFzay5wcmlvcml0eX1gKVxuXG4gICAgICAgICAgICBsaXN0SXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUmFkaW8pO1xuICAgICAgICAgICAgdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGFzay5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0YXNrX2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFzay5kdWVfZGF0ZSAhPT0gdW5kZWZpbmVkIHx8IHRhc2suZHVlX3RpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVUaW1lV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRlVGltZVRleHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGAke3Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGAxLTItMTAwMCAke3Rhc2suZHVlX3RpbWV9YClcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJvcGVydGllcyA9IHsgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJywgaG91cjEyOiB0cnVlIH1cbiAgICAgICAgICAgICAgICBpZiAodGFzay5kdWVfZGF0ZSAmJiAhdGFzay5kdWVfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZVRleHQgPSBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRhc2suZHVlX2RhdGUgJiYgdGFzay5kdWVfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZVRleHQgPSB0aW1lLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZVRleHQgPSBgJHtkYXRlLnRvRGF0ZVN0cmluZygpfSAke3RpbWUudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgdGltZVByb3BlcnRpZXMpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGVUaW1lV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd0YXNrX2R1ZV9kYXRlX3RpbWUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVUaW1lQnV0dG9uID0gYnVpbGRCdXR0b24oJ2RhdGUnLCAndGFzaycsIGRhdGVUaW1lVGV4dClcbiAgICAgICAgICAgICAgICBkYXRlVGltZVdyYXBwZXIuYXBwZW5kQ2hpbGQoZGF0ZVRpbWVCdXR0b24pO1xuICAgICAgICAgICAgICAgIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKGRhdGVUaW1lV3JhcHBlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKHByaW9yaXR5KTtcblxuICAgICAgICAgICAgY29uc3QgYnV0dG9uRGVsZXRlID0gYnVpbGRCdXR0b24oJ2RlbGV0ZScsICd0YXNrJyk7XG4gICAgICAgICAgICBjb25zdCBidXR0b25FZGl0ID0gYnVpbGRCdXR0b24oJ2VkaXQnLCAndGFzaycpO1xuICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uRGVsZXRlKTtcbiAgICAgICAgICAgIHRhc2tBY3Rpb25zLmFwcGVuZENoaWxkKGJ1dHRvbkVkaXQpO1xuXG4gICAgICAgICAgICBsaXN0SXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrQ29udGVudCk7XG4gICAgICAgICAgICBsaXN0SXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrQWN0aW9ucyk7XG4gICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChsaXN0SXRlbUNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGxpc3RJdGVtV3JhcHBlci5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgICAgICAgICAvLyB0aGlzLmJ0bkRlbGV0ZVRhc2sucHVzaChidXR0b24pXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoYnV0dG9uRGVsZXRlLCB0YXNrUmFkaW8sIGxpc3RJdGVtV3JhcHBlcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vbGRUYXNrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRoaXMub2xkVGFzayA9ICR7dGhpcy5vbGRUYXNrfWApO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0SXRlbVdyYXBwZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZFRhc2sucmVwbGFjZVdpdGgobGlzdEl0ZW1XcmFwcGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZFRhc2sgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdXBkYXRpbmcgdGFza1xuICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gb25seSBhcHBlbmQgYXQgdGhhdCB0YXNrJ3MgaW5kZXhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3aGVuIHRoZSB0YXNrIGZvcm0gaW5zaWRlIHRoZSBsaXN0IGlzIG9wZW4gYW5kIGEgbmV3IHRhc2sgaXMgYWRkZWRcbiAgICAgICAgICAgIC8vIHRoZSB0YXNrIGxpc3QgZ3Jvd3Mgd2hpbGUgdGhlIHRhc2sgZm9ybSBpcyBvcGVuXG4gICAgfSxcbiAgICBjb21wbGV0ZVRhc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coYGNvbXBsZXRldGFzaygpIHJ1bm5pbmcgZnJvbSB0YXNrc19saXN0LmpzYCk7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgfSxcbiAgICByZW1vdmVUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGByZW1vdmVUYXNrKCkgaW4gdGFza3NfbGlzdC5qcyBpcyBydW5uaW5nYClcbiAgICAgICAgLy8gY3JlYXRlIGEgbW9kYWwgdG8gY29uZmlybSByZW1vdmFsXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICAgICAgICBsZXQgdXVpZFRhc2sgPSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQ7XG4gICAgICAgICAgICBidWlsZE1vZGFsUmVtb3ZlKHRoaXMucHJvamVjdC5maW5kVGFzayh1dWlkVGFzaykpOyAgXG4gICAgICAgIC8vIH0gZWxzZSBpZiAoZSkge1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVtb3ZlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnByb2plY3QucmVtb3ZlVGFzayhlKTtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdC5yZW1vdmVUYXNrKHRoaXMucmVtb3ZlU2VsZWN0aW9uLmRhdGFzZXQudXVpZCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbi5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgKHRoaXMucHJvamVjdC50aXRsZSAhPT0gJ1RvZGF5Jykge1xuICAgICAgICAgICAgICAgIHRoaXMub2xkVGFzay5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMub2xkVGFzayA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVkaXRUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBlZGl0VGFzaygpIGZyb20gdGFza3NfbGlzdC5qcyBpcyBydW5uaW5nYCk7XG4gICAgICAgIHRoaXMub2xkVGFzayA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgYnVpbGRUYXNrc0Zvcm0oZSk7XG4gICAgfSxcbiAgICByZXNldE9sZFRhc2s6IGZ1bmN0aW9uKG9sZFRhc2spIHtcbiAgICAgICAgY29uc29sZS5sb2coYHJlc2V0T2xkVGFzaygpIGZyb20gdGFza3NfbGlzdC5qcyBpcyBydW5uaW5nYCk7XG4gICAgICAgIGlmICh0aGlzLm9sZFRhc2spIHtcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICB0aGlzLm9sZFRhc2sgPSBudWxsXG4gICAgICAgIH0gZWxzZSBpZiAob2xkVGFzaykge1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gb2xkVGFzaztcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuL3B1YnN1Yic7XG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuLi9zdG9yYWdlL3N0b3JhZ2UnO1xuXG5jb25zdCBnZXRGb3JtVmFsdWVzID0gKGlucHV0cykgPT4ge1xuICAgIC8vIHRhc2tzIGlzIGVtcHR5IHdpdGggbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IG9iaiA9IHt9XG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4geyBcbiAgICAgICAgaWYgKGlucHV0LmlkID09PSAncHJpb3JpdHknKSB7XG4gICAgICAgICAgICBvYmpbaW5wdXQuaWRdID0gcGFyc2VJbnQoaW5wdXQudmFsdWUuc2xpY2UoaW5wdXQudmFsdWUubGVuZ3RoIC0gMSwgaW5wdXQudmFsdWUubGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuaWQgPT09ICdkdWVfZGF0ZScgJiYgaW5wdXQudmFsdWUubGVuZ3RoID09PSAwICYmIFsuLi5pbnB1dHNdLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSAnZHVlX3RpbWUnKS52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHRpbWUgaGFzIGEgdmFsdWUgYW5kIGRhdGUgZG9lcyBub3QgaGF2ZSBhIHZhbHVlXG4gICAgICAgICAgICAgICAgLy8gZGF0ZSBzZXQgdG8gdG9kYXkncyBkYXRlXG4gICAgICAgICAgICBvYmpbaW5wdXQuaWRdID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBvYmpbaW5wdXQuaWRdID0gaW5wdXQudmFsdWVcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG9iailcbiAgICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBidWlsZFByb2plY3QgPSAodGFza3MpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIHRhc2tzLFxuICAgICAgICB1dWlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLFxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgcHJvamVjdChzdGF0ZSksXG4gICAgKVxufVxuXG4vLyBjcmVhdGVzIGEgcHJvamVjdCBvYmplY3RcbiAgICAvLyB0YXNrcyBwcm9wZXJ0eSBjcmVhdGVkIHVwb24gb2JqZWN0IGNyZWF0aW9uXG5jb25zdCBwcm9qZWN0ID0gKHN0YXRlKSA9PiAoe1xuICAgIHR5cGU6ICdwcm9qZWN0JyxcbiAgICBhY3RpdmU6IGZhbHNlLCAvLyB0aGVyZSBjYW4gb25seSBiZSBvbmUgcHJvamVjdCBhY3RpdmVcbiAgICB1dWlkOiBzdGF0ZS51dWlkLFxuICAgIHRhc2tzOiBzdGF0ZS50YXNrcyB8fCBbXSxcbiAgICBhZGRUYXNrOiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgICAgLy8gbmVlZCB0byBhbGxvdyB1c2VyIHRvIHBpY2sgd2hhdCBwcm9qZWN0IHRvIGFzc2lnbiB0aGUgbmV3bHkvZWRpdGVkIHRhc2tcbiAgICAgICAgICAgIC8vIHB1c2hlcyB0YXNrIHRvIHJlc3BlY3RpdmUgcHJvamVjdFxuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gT2JqZWN0LmFzc2lnbih0YXNrKHRoaXMudXVpZCksIGZvcm1WYWx1ZXMpO1xuXG4gICAgICAgIGlmIChmb3JtVmFsdWVzLnByb2plY3QgJiYgZm9ybVZhbHVlcy5wcm9qZWN0ICE9PSBuZXdUYXNrLnV1aWRQcm9qKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbmV3IHV1aWQgcHJvajogJHtmb3JtVmFsdWVzLnByb2plY3R9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgb2xkIHV1aWQgcHJvajogJHtuZXdUYXNrLnV1aWRQcm9qfWApO1xuICAgICAgICAgICAgbmV3VGFzay51dWlkUHJvaiA9IGZvcm1WYWx1ZXMucHJvamVjdDtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQoZm9ybVZhbHVlcy5wcm9qZWN0KS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGAke25ld1Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYWRkVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci50b2RheSlcbiAgICAgICAgLy8gcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICByZW1vdmVUYXNrOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIC8vIGlmIHRoZSByZW1vdmUgdGFzayBpcyBpbiB0b2RheVxuICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IGZyb20gdG9kYXkgQU5EIGl0J3MgcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgIC8vIGlmIHRoZSB0YXNrJ3MgZGF0ZSBpbiB0b2RheSBpcyBlZGl0ZWQgXG4gICAgICAgICAgICAvLyByZW1vdmUgaXQgZnJvbSBvbmx5IHRvZGF5XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLmZpbmRUYXNrKHV1aWQpO1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICAgICAgICAvLyByZW1vdmVzIHRhc2sgaW4gcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRhc2sudXVpZFByb2opO1xuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLnV1aWRUYXNrID09PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGFza3Muc3BsaWNlKHByb2plY3QudGFza3MuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWxsUHJvamVjdHMoKTtcbiAgICAgICAgLy8gcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVUYXNrOiBmdW5jdGlvbih1dWlkLCBpbnB1dHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHVwZGF0ZVRhc2soKSBmcm9tIHByb2plY3QtY29udHJvbGxlci5qcyBpcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGdldEZvcm1WYWx1ZXMoaW5wdXRzKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IE9iamVjdC5hc3NpZ24odGhpcy5maW5kVGFzayh1dWlkKSwgZm9ybVZhbHVlcyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coZm9ybVZhbHVlcylcbiAgICAgICAgY29uc29sZS5sb2cobmV3VGFzay5kdWVfZGF0ZSk7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIC8vIGlmIHRoZSBwcm9qZWN0IGlzIGNoYW5nZSBmb3IgYSB0YXNrXG4gICAgICAgIGlmIChmb3JtVmFsdWVzLnByb2plY3QgJiYgZm9ybVZhbHVlcy5wcm9qZWN0ICE9PSBuZXdUYXNrLnV1aWRQcm9qKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhc2sobmV3VGFzay51dWlkVGFzayk7XG4gICAgICAgICAgICBuZXdUYXNrLnV1aWRQcm9qID0gZm9ybVZhbHVlcy5wcm9qZWN0O1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZmluZChmb3JtVmFsdWVzLnByb2plY3QpLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgncmVtb3ZlVGFzaycpO1xuICAgICAgICAgICAgaWYgKHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS50aXRsZSA9PT0gJ1RvZGF5Jykge1xuICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVUYXNrJywgbmV3VGFzayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnRpdGxlID09PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGAke25ld1Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgncmVtb3ZlVGFzaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICAvLyBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIGZpbmRUYXNrOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LnV1aWRUYXNrID09PSB1dWlkKTtcbiAgICB9LFxufSlcblxuXG5leHBvcnQgY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSB7XG4gICAgaW5ib3g6IFtPYmplY3QuYXNzaWduKGJ1aWxkUHJvamVjdCgpLCB7dGl0bGU6ICdJbmJveCcsfSldLCAvLyB3aWxsIGhvbGQgdGFza3MgYXNzaWduZWQgdG8gdGhlICdpbmJveCdcbiAgICB0b2RheTogW09iamVjdC5hc3NpZ24oYnVpbGRQcm9qZWN0KCksIHt0aXRsZTogJ1RvZGF5J30pXSxcbiAgICBtaXNjOiBudWxsLFxuICAgIHByb2plY3RzOiBudWxsLFxuICAgIGFsbFByb2plY3RzOiBbXSxcbiAgICBhZGRQcm9qZWN0OiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGdldEZvcm1WYWx1ZXMoaW5wdXRzKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKE9iamVjdC5hc3NpZ24oYnVpbGRQcm9qZWN0KCksIGZvcm1WYWx1ZXMpKTtcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpXG4gICAgICAgIC8vIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZih0aGlzLmZpbmQodXVpZCkpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICAvLyBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QudXVpZCA9PT0gdXVpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbFByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LnV1aWQgPT09IHV1aWQpO1xuICAgIH0sXG4gICAgc2V0QWN0aXZlOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzZXRBY3RpdmUoKSBpcyBydW5uaW5nIGZyb20gcHJvamVjdC1jb250cm9sbGVyLmpzYCkgLy8gZm9yIGRlYnVnZ2luZ1xuICAgICAgICBpZiAodGhpcy5maW5kQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZEFjdGl2ZSgpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmluZCh1dWlkKS5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG4gICAgZmluZEFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWxsUHJvamVjdHMpXG4gICAgICAgIGlmICghdGhpcy5hbGxQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5hY3RpdmUgPT09IHRydWUpKSB7XG4gICAgICAgICAgICB0aGlzLmluYm94WzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmJveDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFsbFByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmFjdGl2ZSA9PT0gdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldEFsbFByb2plY3RzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hbGxQcm9qZWN0cyA9IHRoaXMuaW5ib3guY29uY2F0KHRoaXMucHJvamVjdHMsIHRoaXMudG9kYXkpO1xuICAgICAgICB0aGlzLnNvcnQoKVxuICAgICAgICBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIHNldE1pc2NQcm9qZWN0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubWlzYyA9IHRoaXMuaW5ib3guY29uY2F0KHRoaXMudG9kYXkpXG4gICAgfSxcbiAgICBzb3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB0aGlzLmFsbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC50YXNrcy5sZW5ndGggPiAwICYmIHByb2plY3QudGl0bGUgIT09ICdUb2RheScpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXNrRGF0ZSA9IG5ldyBEYXRlKGAke3Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50b2RheVswXS5maW5kVGFzayh0YXNrLnV1aWRUYXNrKSAmJiB0YXNrRGF0ZSA9PSB0b2RheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheVswXS50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kYXkpXG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9iaiwgYnVpbGRQcm9qZWN0KG9iai50YXNrcykpO1xuICAgICAgICAgICAgb2JqLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay51dWlkUHJvaiA9IG9iai51dWlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5pbmJveFswXSwgYnVpbGRQcm9qZWN0KHRoaXMuaW5ib3hbMF0udGFza3MpKTtcbiAgICAgICAgdGhpcy5pbmJveFswXS50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgdGFzay51dWlkUHJvaiA9IHRoaXMuaW5ib3hbMF0udXVpZDtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpO1xuICAgIH1cbn1cblxuY29uc3QgdGFzayA9ICh1dWlkKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9ICd0YXNrJztcbiAgICBjb25zdCB1dWlkVGFzayA9IGNyeXB0by5yYW5kb21VVUlEKCk7XG4gICAgY29uc3QgdXVpZFByb2ogPSB1dWlkO1xuICAgIHJldHVybiB7IHV1aWRUYXNrLCB1dWlkUHJvaiwgdHlwZSB9O1xufSIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG4gICAgc3Vic2NyaWJlcnM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oc3Vic2NyaWJlciwgaGFuZGxlcikge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSA9IHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gfHwgW107XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0ucHVzaChoYW5kbGVyKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihzdWJzY3JpYmVyLCAgaGFuZGxlcikge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl1baV0gPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oc3Vic2NyaWJlciwgZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcblxuLy8gZ2V0SXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuZXhwb3J0IGZ1bmN0aW9uIHNldFByb2plY3RzKCkge1xuICAgIGNvbnNvbGUubG9nKGBzZXRQcm9qZWN0cygpIHJ1bm5pbmcgZnJvbSBzdG9yYWdlLmpzYCk7XG4gICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIDogW107XG4gICAgcHJvamVjdENvbnRyb2xsZXIuaW5ib3ggPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luYm94JykpIDogcHJvamVjdENvbnRyb2xsZXIuaW5ib3g7XG4gICAgLy8gcHJvamVjdENvbnRyb2xsZXIudG9kYXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXknKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5JykpIDogcHJvamVjdENvbnRyb2xsZXIudG9kYXk7XG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci50b2RheSk7XG4gICAgcHJvamVjdENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cyk7XG59XG5cbi8vIHNldEl0ZW0gaW4gbG9jYWxTdG9yYWdlXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlKCkge1xuICAgIGNvbnNvbGUubG9nKGBwb3B1bGF0ZVN0b3JhZ2UoKSBydW5uaW5nIGZyb20gc3RvcmFnZS5qc2ApO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luYm94JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIuaW5ib3gpKTtcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kYXknLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0Q29udHJvbGxlci50b2RheSkpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSk7XG59IiwiLy8gcmV0dXJucyBhbiBvYmplY3QgYW5kIGFycmF5IG9mIGZpbGUgdHlwZXNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XG4gICAgbGV0IGZpbGVzID0ge307XG4gICAgbGV0IGZpbGVzQXJyID0gW107XG4gICAgci5rZXlzKCkubWFwKGl0ZW0gPT4ge1xuICAgICAgICBmaWxlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgICAgIGZpbGVzQXJyLnB1c2goaXRlbS5yZXBsYWNlKCcuLycsICcnKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBmaWxlcywgZmlsZXNBcnIgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==