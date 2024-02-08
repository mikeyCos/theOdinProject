"use strict";
(self["webpackChunkmodule_webpack_starter"] = self["webpackChunkmodule_webpack_starter"] || []).push([["index"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf */ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  /* https://fonts.google.com/specimen/Roboto+Condensed */
  font-family: 'Roboto Condensed';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  font-weight: 600;
  font-style: normal;
}

*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: aqua;
  font-family: 'Roboto Condensed', Arial;
  font-family: 'Roboto Condensed';
  font-family: Arial;
}`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;EACE,uDAAuD;EACvD,+BAA+B;EAC/B,4CAA2E;EAC3E,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;EACtB,sCAAsC;EACtC,+BAA+B;EAC/B,kBAAkB;AACpB","sourcesContent":["@font-face {\n  /* https://fonts.google.com/specimen/Roboto+Condensed */\n  font-family: 'Roboto Condensed';\n  src: url(./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf);\n  font-weight: 600;\n  font-style: normal;\n}\n\n*, *::before, *::after {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: aqua;\n  font-family: 'Roboto Condensed', Arial;\n  font-family: 'Roboto Condensed';\n  font-family: Arial;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



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

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



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

/***/ "./src/components/test.js":
/*!********************************!*\
  !*** ./src/components/test.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_icons_sharp_home_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/sharp_home.svg */ "./src/assets/icons/sharp_home.svg");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  print() {
    console.log('print() running from test.js');
    console.log('testing...');
  },
  render() {
    const div = document.createElement('div');
    const paragraph = document.createElement('p');
    const foo = "test";

    const icon = new Image();
    icon.src = _assets_icons_sharp_home_svg__WEBPACK_IMPORTED_MODULE_0__;
    paragraph.textContent = 'Lorem ipsum something something...';

    div.appendChild(icon);
    div.appendChild(paragraph);
    return div;
  },
});


/***/ }),

/***/ "./src/containers/knight_travails.js":
/*!*******************************************!*\
  !*** ./src/containers/knight_travails.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/containers/node.js");
/* harmony import */ var _linked_list_linked_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linked-list/linked-list */ "./src/containers/linked-list/linked-list.js");



const checkArguments = (start, end) => {
  //  need to check if arguments are array types
  const err = new Error();
  if (!start && !end) {
    err.message = 'Undefined arguments.';
  } else if (!start && end) {
    err.message = 'Undefined start argument.';
  } else if (start && !end) {
    err.message = 'Undefined end argument.';
  }

  if (err.message) throw err;
};

const moveKnight = (start, count, direction) => {
  //  what if knight goes off the board?
  //  knight can move 1 or 2 squares left/up or right/down
  //  count defines how many squares the knight will move horizontally/vertically
  //  direction defines which direction the knight will move, left/up or right/down
  let u = start;
  for (let i = 0; i < count; i += 1) {
    u = direction ? (u += 1) : (u -= 1);
  }
  if (u < 0 || u > 7) return null;
  return u;
};

const memo = [];
const generatePossibleMoves = (startX, startY, endX, endY) => {
  //  generates all legal moves for a knight
  if (startX === endX && startY === endY) {
    // console.log('startX === endX && startY === endY');
    // return { end: [endX, endY] };
  }

  if (memo.find((item) => item.start[0] === startX && item.start[1] === startY))
    return memo.find((item) => item.start[0] === startX && item.start[1] === startY);

  const obj = { start: [startX, startY] };
  const moves = [];

  for (let i = 0; i < 2; i += 1) {
    //  vertical and horizontal moves
    //  moves 1-2 squares left/up or right/down
    for (let j = 0; j < 2; j += 1) {
      const vertDir = i % 2 !== 0; // true => up, false => down
      const horDir = j % 2 === 0; // true => right, false => left
      const newMoveV = [moveKnight(startX, 1, horDir), moveKnight(startY, 2, vertDir)];
      const newMoveH = [moveKnight(startX, 2, horDir), moveKnight(startY, 1, vertDir)];

      if (newMoveV.every((element) => element !== null)) {
        const objMove = { start: newMoveV };
        moves.push(objMove);
      }

      if (newMoveH.every((element) => element !== null)) {
        const objMove = { start: newMoveH };
        moves.push(objMove);
      }
    }
  }

  const midpoint = Math.floor(moves.length / 2);
  let movesLeftHalf = moves.slice(0, midpoint);
  let movesRightHalf = moves.slice(midpoint);

  memo.push(obj);

  movesLeftHalf = movesLeftHalf.map((item) =>
    generatePossibleMoves(item.start[0], item.start[1], endX, endY),
  );

  movesRightHalf = movesRightHalf.map((item) =>
    generatePossibleMoves(item.start[0], item.start[1], endX, endY),
  );

  obj.possibleMoves = movesLeftHalf.concat(movesRightHalf);
  return obj;
};

const findShortestPath = (root, endX, endY) => {
  // performs BFS to find object with it's value equal to endX/Y
  const shortestPaths = [];
  const queue = [];
  const visited = [];
  const startNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](root.start, 0, root.possibleMoves, null);
  let depth = 0;
  queue.push(startNode);
  while (queue.length > 0) {
    const dequeue = queue.shift();

    visited.push(dequeue);
    if (dequeue.value[0] === endX && dequeue.value[1] === endY) {
      // if dequeue's value equals end push dequeue into an array
      shortestPaths.push(dequeue);
      depth = dequeue.depth;
    }

    if (!queue.some((obj) => obj.depth === dequeue.depth) && depth > 0) {
      // if there are no more items in the queue with dequeue's depth
      // and depth is greater than 0
      console.log(dequeue);
      return shortestPaths;
    }

    dequeue.possibleMoves.forEach((item) => {
      // check if node has been visited
      if (
        !visited.some((obj) => obj.value[0] === item.start[0] && obj.value[1] === item.start[1])
      ) {
        const newNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](item.start, dequeue.depth + 1, item.possibleMoves, dequeue);
        queue.push(newNode);
      }
    });
  }

  // no shortest path
  return null;
};

const printPath = (paths) => {
  /*
  => You made it in 3 moves!  Here's your path:
  [3,3]
  [4,5]
  [2,4]
  [4,3]
  */
  const phrase =
    paths.length === 1 ? `is only ${paths.length} permutation` : `are ${paths.length} permutations`;

  console.log(`There ${phrase}.`);
  if (paths) {
    paths.forEach((path) => {
      const numMoves = path.depth;
      // const coordinates = []; // per project spec
      const linkedList = new _linked_list_linked_list__WEBPACK_IMPORTED_MODULE_1__["default"]();
      let node = path;
      while (node) {
        linkedList.prepend(node.value);
        // coordinates.unshift(node.value); // per project spec
        node = node.previous;
      }

      console.log(`=> You made it in ${numMoves} moves! Here is the shortest path:`);
      console.log(linkedList.toString());
      // coordinates.forEach((coordinate) => console.log(`[${coordinate}]`)); // per project spec
    });
  }
};

const knightMoves = (start, end) => {
  const startX = start[0];
  const startY = start[1];
  const endX = end[0];
  const endY = end[1];
  if (startX === endX && startY === endY) {
    console.log(
      'The starting and ending squares have the same coordinates. Use a different start or end.',
    );
  } else {
    const possibleMoves = generatePossibleMoves(startX, startY, endX, endY);
    const shortestPath = findShortestPath(possibleMoves, endX, endY);
    printPath(shortestPath);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);


/***/ }),

/***/ "./src/containers/linked-list/linked-list.js":
/*!***************************************************!*\
  !*** ./src/containers/linked-list/linked-list.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkedList)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/containers/linked-list/node.js");


class LinkedList {
  #head = null;

  #tail = null;

  #size = 0;

  append(value) {
    // adds a new node containing value to the end of the list
    const node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](value);
    if (this.#size === 0) {
      this.#head = node;
    } else {
      const tmp = this.#tail;
      tmp.next = node;
    }
    this.#tail = node;
    this.#size += 1;
  }

  prepend(value) {
    // adds a new node containing value to the start of the list
    const tmp = this.#head;
    const newNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](value, tmp);
    this.#head = newNode;
    if (this.#size === 0) this.#tail = newNode;
    this.#size += 1;
  }

  size() {
    // returns the total number of nodes in the list
    return this.#size;
  }

  head() {
    // returns the first node in the list
    return this.#head;
  }

  tail() {
    // returns the last node in the list
    return this.#tail;
  }

  atIndex(n) {
    // returns the node at the given index
    let node = !this.#head ? 'Linked List is empty' : this.#head;
    let index = 0;
    while (node) {
      if (index === n) {
        break;
      } else if (!node.next) {
        node = `No node found at index ${n}`;
        break;
      }
      node = node.next;
      index += 1;
    }
    return node;
  }

  pop() {
    // removes the last element from the list
    if (this.#size > 0) {
      if (this.#size > 1) {
        const beforeLast = this.atIndex(this.#size - 2);
        beforeLast.next = null;
        this.#tail = beforeLast;
      } else {
        this.#tail = null;
        this.#head = null;
        delete this.atIndex(0);
      }
      this.#size -= 1;
    }
  }

  contains(query) {
    // returns true if the passed in value is in the list and otherwise returns false.
    return this.find(query) !== null;
  }

  find(query) {
    // returns the index of the node containing value, or null if not found
    let node = this.#head;
    let index = 0;
    while (node) {
      if (node.value === query) {
        return index;
      }

      node = node.next;
      index += 1;
    }
    return null;
  }

  toString() {
    // represents your LinkedList objects as strings,
    // so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    let node = this.#head;
    let string = node ? '' : null;
    while (node) {
      if (!node.next) {
        string += `[${node.value}]`;
        return string;
      }
      string += `[${node.value}] -> `;
      node = node.next;
    }
    return string;
  }

  // Extra Credit Tip: When you insert or remove a node,
  // consider how it will affect the existing nodes.
  // Some of the nodes will need their nextNode link updated.
  insertAt(value, index) {
    // inserts a new node with the provided value at the given index
    if (index <= this.#size && index >= 0) {
      // checks if the index is within the linked list's size
      // index can never be less than 0
      // index can never be greater than the linked list's size
      if (index === 0) {
        // insert node at the beginning of the list
        this.prepend(value);
      } else if (index === this.#size) {
        // insert node at the end of the list
        this.append(value);
      } else {
        // insert nodes in between nodes
        const left = this.atIndex(index - 1);
        const right = this.atIndex(index);
        const newNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](value, right);
        left.next = newNode;
        this.#size += 1;
      }
    }
  }

  removeAt(index) {
    // that removes the node at the given index
    if (index < this.#size && index >= 0) {
      // checks if the index is within the linked list's size
      // index can never be less than 0
      // index can never be greater than the linked list's size
      if (index + 1 === this.#size) {
        this.pop();
        return;
      }

      if (this.#size > 1 && index === 0) {
        this.#head = this.atIndex(index + 1);
      } else {
        const left = this.atIndex(index - 1);
        const right = this.atIndex(index + 1);
        left.next = right;
      }

      this.#size -= 1;
    }
  }
}


/***/ }),

/***/ "./src/containers/linked-list/node.js":
/*!********************************************!*\
  !*** ./src/containers/linked-list/node.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Node)
/* harmony export */ });
class Node {
  constructor(value, next) {
    this.value = !value ? null : value;
    this.next = !next ? null : next;
  }
}


/***/ }),

/***/ "./src/containers/node.js":
/*!********************************!*\
  !*** ./src/containers/node.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Node)
/* harmony export */ });
class Node {
  constructor(value, depth, possibleMoves, previous) {
    this.value = value;
    this.depth = depth;
    this.possibleMoves = possibleMoves;
    this.previous = previous;
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers_knight_travails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers/knight_travails */ "./src/containers/knight_travails.js");
/* harmony import */ var _components_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/test */ "./src/components/test.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");




window.knightMoves = _containers_knight_travails__WEBPACK_IMPORTED_MODULE_0__["default"];

_components_test__WEBPACK_IMPORTED_MODULE_1__["default"].print();
document.body.appendChild(_components_test__WEBPACK_IMPORTED_MODULE_1__["default"].render());


/***/ }),

/***/ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf":
/*!*****************************************************************************!*\
  !*** ./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ff190f979bb05ae7bee6.ttf";

/***/ }),

/***/ "./src/assets/icons/sharp_home.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/sharp_home.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "97a5076a0efd36487580.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw2Q0FBSTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BLZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0xlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1B1RDtBQUNsQjtBQUNoQjs7QUFFckIscUJBQXFCLG1FQUFXOztBQUVoQyx3REFBSTtBQUNKLDBCQUEwQix3REFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LmNzcz9jZmU0Iiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3Rlc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2tuaWdodF90cmF2YWlscy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvbGlua2VkLWxpc3QvbGlua2VkLWxpc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2xpbmtlZC1saXN0L25vZGUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL25vZGUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx1REFBdUQ7RUFDdkQsK0JBQStCO0VBQy9CLDRDQUEyRTtFQUMzRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsc0NBQXNDO0VBQ3RDLCtCQUErQjtFQUMvQixrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIHNyYzogdXJsKC4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgSWNvbiBmcm9tICcuLi9hc3NldHMvaWNvbnMvc2hhcnBfaG9tZS5zdmcnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByaW50KCkge1xuICAgIGNvbnNvbGUubG9nKCdwcmludCgpIHJ1bm5pbmcgZnJvbSB0ZXN0LmpzJyk7XG4gICAgY29uc29sZS5sb2coJ3Rlc3RpbmcuLi4nKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCBmb28gPSBcInRlc3RcIjtcblxuICAgIGNvbnN0IGljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBpY29uLnNyYyA9IEljb247XG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gJ0xvcmVtIGlwc3VtIHNvbWV0aGluZyBzb21ldGhpbmcuLi4nO1xuXG4gICAgZGl2LmFwcGVuZENoaWxkKGljb24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuICAgIHJldHVybiBkaXY7XG4gIH0sXG59O1xuIiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcbmltcG9ydCBMaW5rZWRMaXN0IGZyb20gJy4vbGlua2VkLWxpc3QvbGlua2VkLWxpc3QnO1xuXG5jb25zdCBjaGVja0FyZ3VtZW50cyA9IChzdGFydCwgZW5kKSA9PiB7XG4gIC8vICBuZWVkIHRvIGNoZWNrIGlmIGFyZ3VtZW50cyBhcmUgYXJyYXkgdHlwZXNcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKCk7XG4gIGlmICghc3RhcnQgJiYgIWVuZCkge1xuICAgIGVyci5tZXNzYWdlID0gJ1VuZGVmaW5lZCBhcmd1bWVudHMuJztcbiAgfSBlbHNlIGlmICghc3RhcnQgJiYgZW5kKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSAnVW5kZWZpbmVkIHN0YXJ0IGFyZ3VtZW50Lic7XG4gIH0gZWxzZSBpZiAoc3RhcnQgJiYgIWVuZCkge1xuICAgIGVyci5tZXNzYWdlID0gJ1VuZGVmaW5lZCBlbmQgYXJndW1lbnQuJztcbiAgfVxuXG4gIGlmIChlcnIubWVzc2FnZSkgdGhyb3cgZXJyO1xufTtcblxuY29uc3QgbW92ZUtuaWdodCA9IChzdGFydCwgY291bnQsIGRpcmVjdGlvbikgPT4ge1xuICAvLyAgd2hhdCBpZiBrbmlnaHQgZ29lcyBvZmYgdGhlIGJvYXJkP1xuICAvLyAga25pZ2h0IGNhbiBtb3ZlIDEgb3IgMiBzcXVhcmVzIGxlZnQvdXAgb3IgcmlnaHQvZG93blxuICAvLyAgY291bnQgZGVmaW5lcyBob3cgbWFueSBzcXVhcmVzIHRoZSBrbmlnaHQgd2lsbCBtb3ZlIGhvcml6b250YWxseS92ZXJ0aWNhbGx5XG4gIC8vICBkaXJlY3Rpb24gZGVmaW5lcyB3aGljaCBkaXJlY3Rpb24gdGhlIGtuaWdodCB3aWxsIG1vdmUsIGxlZnQvdXAgb3IgcmlnaHQvZG93blxuICBsZXQgdSA9IHN0YXJ0O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpICs9IDEpIHtcbiAgICB1ID0gZGlyZWN0aW9uID8gKHUgKz0gMSkgOiAodSAtPSAxKTtcbiAgfVxuICBpZiAodSA8IDAgfHwgdSA+IDcpIHJldHVybiBudWxsO1xuICByZXR1cm4gdTtcbn07XG5cbmNvbnN0IG1lbW8gPSBbXTtcbmNvbnN0IGdlbmVyYXRlUG9zc2libGVNb3ZlcyA9IChzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkgPT4ge1xuICAvLyAgZ2VuZXJhdGVzIGFsbCBsZWdhbCBtb3ZlcyBmb3IgYSBrbmlnaHRcbiAgaWYgKHN0YXJ0WCA9PT0gZW5kWCAmJiBzdGFydFkgPT09IGVuZFkpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc3RhcnRYID09PSBlbmRYICYmIHN0YXJ0WSA9PT0gZW5kWScpO1xuICAgIC8vIHJldHVybiB7IGVuZDogW2VuZFgsIGVuZFldIH07XG4gIH1cblxuICBpZiAobWVtby5maW5kKChpdGVtKSA9PiBpdGVtLnN0YXJ0WzBdID09PSBzdGFydFggJiYgaXRlbS5zdGFydFsxXSA9PT0gc3RhcnRZKSlcbiAgICByZXR1cm4gbWVtby5maW5kKChpdGVtKSA9PiBpdGVtLnN0YXJ0WzBdID09PSBzdGFydFggJiYgaXRlbS5zdGFydFsxXSA9PT0gc3RhcnRZKTtcblxuICBjb25zdCBvYmogPSB7IHN0YXJ0OiBbc3RhcnRYLCBzdGFydFldIH07XG4gIGNvbnN0IG1vdmVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpICs9IDEpIHtcbiAgICAvLyAgdmVydGljYWwgYW5kIGhvcml6b250YWwgbW92ZXNcbiAgICAvLyAgbW92ZXMgMS0yIHNxdWFyZXMgbGVmdC91cCBvciByaWdodC9kb3duXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHZlcnREaXIgPSBpICUgMiAhPT0gMDsgLy8gdHJ1ZSA9PiB1cCwgZmFsc2UgPT4gZG93blxuICAgICAgY29uc3QgaG9yRGlyID0gaiAlIDIgPT09IDA7IC8vIHRydWUgPT4gcmlnaHQsIGZhbHNlID0+IGxlZnRcbiAgICAgIGNvbnN0IG5ld01vdmVWID0gW21vdmVLbmlnaHQoc3RhcnRYLCAxLCBob3JEaXIpLCBtb3ZlS25pZ2h0KHN0YXJ0WSwgMiwgdmVydERpcildO1xuICAgICAgY29uc3QgbmV3TW92ZUggPSBbbW92ZUtuaWdodChzdGFydFgsIDIsIGhvckRpciksIG1vdmVLbmlnaHQoc3RhcnRZLCAxLCB2ZXJ0RGlyKV07XG5cbiAgICAgIGlmIChuZXdNb3ZlVi5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCAhPT0gbnVsbCkpIHtcbiAgICAgICAgY29uc3Qgb2JqTW92ZSA9IHsgc3RhcnQ6IG5ld01vdmVWIH07XG4gICAgICAgIG1vdmVzLnB1c2gob2JqTW92ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdNb3ZlSC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCAhPT0gbnVsbCkpIHtcbiAgICAgICAgY29uc3Qgb2JqTW92ZSA9IHsgc3RhcnQ6IG5ld01vdmVIIH07XG4gICAgICAgIG1vdmVzLnB1c2gob2JqTW92ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWlkcG9pbnQgPSBNYXRoLmZsb29yKG1vdmVzLmxlbmd0aCAvIDIpO1xuICBsZXQgbW92ZXNMZWZ0SGFsZiA9IG1vdmVzLnNsaWNlKDAsIG1pZHBvaW50KTtcbiAgbGV0IG1vdmVzUmlnaHRIYWxmID0gbW92ZXMuc2xpY2UobWlkcG9pbnQpO1xuXG4gIG1lbW8ucHVzaChvYmopO1xuXG4gIG1vdmVzTGVmdEhhbGYgPSBtb3Zlc0xlZnRIYWxmLm1hcCgoaXRlbSkgPT5cbiAgICBnZW5lcmF0ZVBvc3NpYmxlTW92ZXMoaXRlbS5zdGFydFswXSwgaXRlbS5zdGFydFsxXSwgZW5kWCwgZW5kWSksXG4gICk7XG5cbiAgbW92ZXNSaWdodEhhbGYgPSBtb3Zlc1JpZ2h0SGFsZi5tYXAoKGl0ZW0pID0+XG4gICAgZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKGl0ZW0uc3RhcnRbMF0sIGl0ZW0uc3RhcnRbMV0sIGVuZFgsIGVuZFkpLFxuICApO1xuXG4gIG9iai5wb3NzaWJsZU1vdmVzID0gbW92ZXNMZWZ0SGFsZi5jb25jYXQobW92ZXNSaWdodEhhbGYpO1xuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgZmluZFNob3J0ZXN0UGF0aCA9IChyb290LCBlbmRYLCBlbmRZKSA9PiB7XG4gIC8vIHBlcmZvcm1zIEJGUyB0byBmaW5kIG9iamVjdCB3aXRoIGl0J3MgdmFsdWUgZXF1YWwgdG8gZW5kWC9ZXG4gIGNvbnN0IHNob3J0ZXN0UGF0aHMgPSBbXTtcbiAgY29uc3QgcXVldWUgPSBbXTtcbiAgY29uc3QgdmlzaXRlZCA9IFtdO1xuICBjb25zdCBzdGFydE5vZGUgPSBuZXcgTm9kZShyb290LnN0YXJ0LCAwLCByb290LnBvc3NpYmxlTW92ZXMsIG51bGwpO1xuICBsZXQgZGVwdGggPSAwO1xuICBxdWV1ZS5wdXNoKHN0YXJ0Tm9kZSk7XG4gIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGVxdWV1ZSA9IHF1ZXVlLnNoaWZ0KCk7XG5cbiAgICB2aXNpdGVkLnB1c2goZGVxdWV1ZSk7XG4gICAgaWYgKGRlcXVldWUudmFsdWVbMF0gPT09IGVuZFggJiYgZGVxdWV1ZS52YWx1ZVsxXSA9PT0gZW5kWSkge1xuICAgICAgLy8gaWYgZGVxdWV1ZSdzIHZhbHVlIGVxdWFscyBlbmQgcHVzaCBkZXF1ZXVlIGludG8gYW4gYXJyYXlcbiAgICAgIHNob3J0ZXN0UGF0aHMucHVzaChkZXF1ZXVlKTtcbiAgICAgIGRlcHRoID0gZGVxdWV1ZS5kZXB0aDtcbiAgICB9XG5cbiAgICBpZiAoIXF1ZXVlLnNvbWUoKG9iaikgPT4gb2JqLmRlcHRoID09PSBkZXF1ZXVlLmRlcHRoKSAmJiBkZXB0aCA+IDApIHtcbiAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGl0ZW1zIGluIHRoZSBxdWV1ZSB3aXRoIGRlcXVldWUncyBkZXB0aFxuICAgICAgLy8gYW5kIGRlcHRoIGlzIGdyZWF0ZXIgdGhhbiAwXG4gICAgICBjb25zb2xlLmxvZyhkZXF1ZXVlKTtcbiAgICAgIHJldHVybiBzaG9ydGVzdFBhdGhzO1xuICAgIH1cblxuICAgIGRlcXVldWUucG9zc2libGVNb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBjaGVjayBpZiBub2RlIGhhcyBiZWVuIHZpc2l0ZWRcbiAgICAgIGlmIChcbiAgICAgICAgIXZpc2l0ZWQuc29tZSgob2JqKSA9PiBvYmoudmFsdWVbMF0gPT09IGl0ZW0uc3RhcnRbMF0gJiYgb2JqLnZhbHVlWzFdID09PSBpdGVtLnN0YXJ0WzFdKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZShpdGVtLnN0YXJ0LCBkZXF1ZXVlLmRlcHRoICsgMSwgaXRlbS5wb3NzaWJsZU1vdmVzLCBkZXF1ZXVlKTtcbiAgICAgICAgcXVldWUucHVzaChuZXdOb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIG5vIHNob3J0ZXN0IHBhdGhcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBwcmludFBhdGggPSAocGF0aHMpID0+IHtcbiAgLypcbiAgPT4gWW91IG1hZGUgaXQgaW4gMyBtb3ZlcyEgIEhlcmUncyB5b3VyIHBhdGg6XG4gIFszLDNdXG4gIFs0LDVdXG4gIFsyLDRdXG4gIFs0LDNdXG4gICovXG4gIGNvbnN0IHBocmFzZSA9XG4gICAgcGF0aHMubGVuZ3RoID09PSAxID8gYGlzIG9ubHkgJHtwYXRocy5sZW5ndGh9IHBlcm11dGF0aW9uYCA6IGBhcmUgJHtwYXRocy5sZW5ndGh9IHBlcm11dGF0aW9uc2A7XG5cbiAgY29uc29sZS5sb2coYFRoZXJlICR7cGhyYXNlfS5gKTtcbiAgaWYgKHBhdGhzKSB7XG4gICAgcGF0aHMuZm9yRWFjaCgocGF0aCkgPT4ge1xuICAgICAgY29uc3QgbnVtTW92ZXMgPSBwYXRoLmRlcHRoO1xuICAgICAgLy8gY29uc3QgY29vcmRpbmF0ZXMgPSBbXTsgLy8gcGVyIHByb2plY3Qgc3BlY1xuICAgICAgY29uc3QgbGlua2VkTGlzdCA9IG5ldyBMaW5rZWRMaXN0KCk7XG4gICAgICBsZXQgbm9kZSA9IHBhdGg7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBsaW5rZWRMaXN0LnByZXBlbmQobm9kZS52YWx1ZSk7XG4gICAgICAgIC8vIGNvb3JkaW5hdGVzLnVuc2hpZnQobm9kZS52YWx1ZSk7IC8vIHBlciBwcm9qZWN0IHNwZWNcbiAgICAgICAgbm9kZSA9IG5vZGUucHJldmlvdXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGA9PiBZb3UgbWFkZSBpdCBpbiAke251bU1vdmVzfSBtb3ZlcyEgSGVyZSBpcyB0aGUgc2hvcnRlc3QgcGF0aDpgKTtcbiAgICAgIGNvbnNvbGUubG9nKGxpbmtlZExpc3QudG9TdHJpbmcoKSk7XG4gICAgICAvLyBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiBjb25zb2xlLmxvZyhgWyR7Y29vcmRpbmF0ZX1dYCkpOyAvLyBwZXIgcHJvamVjdCBzcGVjXG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGtuaWdodE1vdmVzID0gKHN0YXJ0LCBlbmQpID0+IHtcbiAgY29uc3Qgc3RhcnRYID0gc3RhcnRbMF07XG4gIGNvbnN0IHN0YXJ0WSA9IHN0YXJ0WzFdO1xuICBjb25zdCBlbmRYID0gZW5kWzBdO1xuICBjb25zdCBlbmRZID0gZW5kWzFdO1xuICBpZiAoc3RhcnRYID09PSBlbmRYICYmIHN0YXJ0WSA9PT0gZW5kWSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ1RoZSBzdGFydGluZyBhbmQgZW5kaW5nIHNxdWFyZXMgaGF2ZSB0aGUgc2FtZSBjb29yZGluYXRlcy4gVXNlIGEgZGlmZmVyZW50IHN0YXJ0IG9yIGVuZC4nLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcG9zc2libGVNb3ZlcyA9IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSk7XG4gICAgY29uc3Qgc2hvcnRlc3RQYXRoID0gZmluZFNob3J0ZXN0UGF0aChwb3NzaWJsZU1vdmVzLCBlbmRYLCBlbmRZKTtcbiAgICBwcmludFBhdGgoc2hvcnRlc3RQYXRoKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQga25pZ2h0TW92ZXM7XG4iLCJpbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rZWRMaXN0IHtcbiAgI2hlYWQgPSBudWxsO1xuXG4gICN0YWlsID0gbnVsbDtcblxuICAjc2l6ZSA9IDA7XG5cbiAgYXBwZW5kKHZhbHVlKSB7XG4gICAgLy8gYWRkcyBhIG5ldyBub2RlIGNvbnRhaW5pbmcgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgIGNvbnN0IG5vZGUgPSBuZXcgTm9kZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuI3NpemUgPT09IDApIHtcbiAgICAgIHRoaXMuI2hlYWQgPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0bXAgPSB0aGlzLiN0YWlsO1xuICAgICAgdG1wLm5leHQgPSBub2RlO1xuICAgIH1cbiAgICB0aGlzLiN0YWlsID0gbm9kZTtcbiAgICB0aGlzLiNzaXplICs9IDE7XG4gIH1cblxuICBwcmVwZW5kKHZhbHVlKSB7XG4gICAgLy8gYWRkcyBhIG5ldyBub2RlIGNvbnRhaW5pbmcgdmFsdWUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBsaXN0XG4gICAgY29uc3QgdG1wID0gdGhpcy4jaGVhZDtcbiAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUsIHRtcCk7XG4gICAgdGhpcy4jaGVhZCA9IG5ld05vZGU7XG4gICAgaWYgKHRoaXMuI3NpemUgPT09IDApIHRoaXMuI3RhaWwgPSBuZXdOb2RlO1xuICAgIHRoaXMuI3NpemUgKz0gMTtcbiAgfVxuXG4gIHNpemUoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI3NpemU7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIC8vIHJldHVybnMgdGhlIGZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICByZXR1cm4gdGhpcy4jaGVhZDtcbiAgfVxuXG4gIHRhaWwoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgbGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI3RhaWw7XG4gIH1cblxuICBhdEluZGV4KG4pIHtcbiAgICAvLyByZXR1cm5zIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBpbmRleFxuICAgIGxldCBub2RlID0gIXRoaXMuI2hlYWQgPyAnTGlua2VkIExpc3QgaXMgZW1wdHknIDogdGhpcy4jaGVhZDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAoaW5kZXggPT09IG4pIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKCFub2RlLm5leHQpIHtcbiAgICAgICAgbm9kZSA9IGBObyBub2RlIGZvdW5kIGF0IGluZGV4ICR7bn1gO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHBvcCgpIHtcbiAgICAvLyByZW1vdmVzIHRoZSBsYXN0IGVsZW1lbnQgZnJvbSB0aGUgbGlzdFxuICAgIGlmICh0aGlzLiNzaXplID4gMCkge1xuICAgICAgaWYgKHRoaXMuI3NpemUgPiAxKSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZUxhc3QgPSB0aGlzLmF0SW5kZXgodGhpcy4jc2l6ZSAtIDIpO1xuICAgICAgICBiZWZvcmVMYXN0Lm5leHQgPSBudWxsO1xuICAgICAgICB0aGlzLiN0YWlsID0gYmVmb3JlTGFzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuI3RhaWwgPSBudWxsO1xuICAgICAgICB0aGlzLiNoZWFkID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuYXRJbmRleCgwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuI3NpemUgLT0gMTtcbiAgICB9XG4gIH1cblxuICBjb250YWlucyhxdWVyeSkge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIGluIHZhbHVlIGlzIGluIHRoZSBsaXN0IGFuZCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAgICByZXR1cm4gdGhpcy5maW5kKHF1ZXJ5KSAhPT0gbnVsbDtcbiAgfVxuXG4gIGZpbmQocXVlcnkpIHtcbiAgICAvLyByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbm9kZSBjb250YWluaW5nIHZhbHVlLCBvciBudWxsIGlmIG5vdCBmb3VuZFxuICAgIGxldCBub2RlID0gdGhpcy4jaGVhZDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAobm9kZS52YWx1ZSA9PT0gcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuXG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgaW5kZXggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICAvLyByZXByZXNlbnRzIHlvdXIgTGlua2VkTGlzdCBvYmplY3RzIGFzIHN0cmluZ3MsXG4gICAgLy8gc28geW91IGNhbiBwcmludCB0aGVtIG91dCBhbmQgcHJldmlldyB0aGVtIGluIHRoZSBjb25zb2xlLlxuICAgIC8vIFRoZSBmb3JtYXQgc2hvdWxkIGJlOiAoIHZhbHVlICkgLT4gKCB2YWx1ZSApIC0+ICggdmFsdWUgKSAtPiBudWxsXG4gICAgbGV0IG5vZGUgPSB0aGlzLiNoZWFkO1xuICAgIGxldCBzdHJpbmcgPSBub2RlID8gJycgOiBudWxsO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAoIW5vZGUubmV4dCkge1xuICAgICAgICBzdHJpbmcgKz0gYFske25vZGUudmFsdWV9XWA7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICB9XG4gICAgICBzdHJpbmcgKz0gYFske25vZGUudmFsdWV9XSAtPiBgO1xuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIC8vIEV4dHJhIENyZWRpdCBUaXA6IFdoZW4geW91IGluc2VydCBvciByZW1vdmUgYSBub2RlLFxuICAvLyBjb25zaWRlciBob3cgaXQgd2lsbCBhZmZlY3QgdGhlIGV4aXN0aW5nIG5vZGVzLlxuICAvLyBTb21lIG9mIHRoZSBub2RlcyB3aWxsIG5lZWQgdGhlaXIgbmV4dE5vZGUgbGluayB1cGRhdGVkLlxuICBpbnNlcnRBdCh2YWx1ZSwgaW5kZXgpIHtcbiAgICAvLyBpbnNlcnRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUgYXQgdGhlIGdpdmVuIGluZGV4XG4gICAgaWYgKGluZGV4IDw9IHRoaXMuI3NpemUgJiYgaW5kZXggPj0gMCkge1xuICAgICAgLy8gY2hlY2tzIGlmIHRoZSBpbmRleCBpcyB3aXRoaW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgLy8gaW5kZXggY2FuIG5ldmVyIGJlIGxlc3MgdGhhbiAwXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgZ3JlYXRlciB0aGFuIHRoZSBsaW5rZWQgbGlzdCdzIHNpemVcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAvLyBpbnNlcnQgbm9kZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0XG4gICAgICAgIHRoaXMucHJlcGVuZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLiNzaXplKSB7XG4gICAgICAgIC8vIGluc2VydCBub2RlIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgdGhpcy5hcHBlbmQodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW5zZXJ0IG5vZGVzIGluIGJldHdlZW4gbm9kZXNcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuYXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuYXRJbmRleChpbmRleCk7XG4gICAgICAgIGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSwgcmlnaHQpO1xuICAgICAgICBsZWZ0Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB0aGlzLiNzaXplICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQXQoaW5kZXgpIHtcbiAgICAvLyB0aGF0IHJlbW92ZXMgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIGluZGV4XG4gICAgaWYgKGluZGV4IDwgdGhpcy4jc2l6ZSAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAvLyBjaGVja3MgaWYgdGhlIGluZGV4IGlzIHdpdGhpbiB0aGUgbGlua2VkIGxpc3QncyBzaXplXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgbGVzcyB0aGFuIDBcbiAgICAgIC8vIGluZGV4IGNhbiBuZXZlciBiZSBncmVhdGVyIHRoYW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgaWYgKGluZGV4ICsgMSA9PT0gdGhpcy4jc2l6ZSkge1xuICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiNzaXplID4gMSAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLiNoZWFkID0gdGhpcy5hdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5hdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5hdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICAgIGxlZnQubmV4dCA9IHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNzaXplIC09IDE7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IodmFsdWUsIG5leHQpIHtcbiAgICB0aGlzLnZhbHVlID0gIXZhbHVlID8gbnVsbCA6IHZhbHVlO1xuICAgIHRoaXMubmV4dCA9ICFuZXh0ID8gbnVsbCA6IG5leHQ7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSwgZGVwdGgsIHBvc3NpYmxlTW92ZXMsIHByZXZpb3VzKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZGVwdGggPSBkZXB0aDtcbiAgICB0aGlzLnBvc3NpYmxlTW92ZXMgPSBwb3NzaWJsZU1vdmVzO1xuICAgIHRoaXMucHJldmlvdXMgPSBwcmV2aW91cztcbiAgfVxufVxuIiwiaW1wb3J0IGtuaWdodE1vdmVzIGZyb20gJy4vY29udGFpbmVycy9rbmlnaHRfdHJhdmFpbHMnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLi9jb21wb25lbnRzL3Rlc3QnO1xuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbndpbmRvdy5rbmlnaHRNb3ZlcyA9IGtuaWdodE1vdmVzO1xuXG50ZXN0LnByaW50KCk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3QucmVuZGVyKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9