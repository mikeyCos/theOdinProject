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

/***/ "./src/containers/mergesort.js":
/*!*************************************!*\
  !*** ./src/containers/mergesort.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mergeSort = (arr) => {
  // console.log(arr);
  if (arr.length <= 1) return arr;
  const midPoint = Math.floor(arr.length / 2);

  const left = arr.slice(0, midPoint);
  const right = arr.slice(midPoint);
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  const sortedArr = [];

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < sortedLeft.length && j < sortedRight.length) {
    if (sortedLeft[i] < sortedRight[j]) {
      sortedArr[k] = sortedLeft[i];
      i += 1;
    } else if (sortedLeft[i] > sortedRight[j]) {
      sortedArr[k] = sortedRight[j];
      j += 1;
    } else {
      sortedArr[k] = sortedRight[j];
      i += 1;
      j += 1;
    }
    k += 1;
  }

  for (; i < sortedLeft.length; i += 1) {
    sortedArr[k] = sortedLeft[i];
    k += 1;
  }

  for (; j < sortedRight.length; j += 1) {
    sortedArr[k] = sortedRight[j];
    k += 1;
  }

  return sortedArr;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeSort);


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
  constructor(data) {
    this.leftNode = null;
    this.rightNode = null;
    this.data = data !== null ? data : null;
  }
}


/***/ }),

/***/ "./src/containers/tree.js":
/*!********************************!*\
  !*** ./src/containers/tree.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _mergesort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergesort */ "./src/containers/mergesort.js");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node */ "./src/containers/node.js");



class Tree {
  // Accepts an array when initialized.
  // The Tree class should have a root attribute, which uses the return value of buildTree
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  #setRoot = (node) => {
    this.root = node;
  };

  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  #sortedArrayToBST = (arr, start, end) => {
    if (start > end) return null;

    const midPoint = Math.floor((start + end) / 2);
    const rootNode = new _node__WEBPACK_IMPORTED_MODULE_1__["default"](arr[midPoint]);
    rootNode.leftNode = this.#sortedArrayToBST(arr, start, midPoint - 1);
    rootNode.rightNode = this.#sortedArrayToBST(arr, midPoint + 1, end);
    // const childNodeOne = sortedArrayToBST(arr, start, midPoint - 1);
    // const childNodeTwo = sortedArrayToBST(arr, midPoint + 1, end);

    // if (childNodeOne) {
    //   if (rootNode.data < childNodeOne.data) {
    //     rootNode.rightNode = childNodeOne;
    //   } else if (rootNode.data > childNodeOne.data) {
    //     rootNode.leftNode = childNodeOne;
    //   }
    // }
    // console.log(rootNode);
    // if (childNodeTwo) {
    //   if (rootNode.data < childNodeTwo.data) {
    //     rootNode.rightNode = childNodeTwo;
    //   } else if (rootNode.data > childNodeTwo.data) {
    //     rootNode.leftNode = childNodeTwo;
    //   }
    // }

    return rootNode;
  };

  buildTree = (arr) => {
    // Takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
    // Turns it into a balanced binary tree full of Node objects appropriately placed
    // (don’t forget to sort and remove duplicates!).
    // The buildTree function should return the level-0 root node.
    const sortedArr = (0,_mergesort__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
    return this.#sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
    // return sortedArrayToBST(arr, 0, arr.length - 1);
  };

  insertNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    const newNode = new _node__WEBPACK_IMPORTED_MODULE_1__["default"](value);
    if (this.root === null) {
      this.#setRoot(newNode);
    } else {
      let node = this.root;
      while (node) {
        if (node.data < value) {
          // go right
          if (node.rightNode === null) {
            node.rightNode = newNode;
          } else {
            node = node.rightNode;
          }
        } else if (node.data > value) {
          // go left
          if (node.leftNode === null) {
            node.leftNode = newNode;
          } else {
            node = node.leftNode;
          }
        } else {
          // duplicate found
          break;
        }
      }
    }
  };

  find = (value, node = this.root) => {
    // Accepts a value and returns the node with the given value.
    let nextNode = node;
    if (nextNode === null) return null;
    if (nextNode.data === value) return nextNode;

    if (node.data > value) nextNode = this.find(value, node.leftNode);
    if (node.data < value) nextNode = this.find(value, node.rightNode);
    return nextNode;
  };

  #predecessor = (value, node = this.root) => {
    // returns predecessor node of given value
    // how to refactor this?
    let nextNode = node;
    if (nextNode === null) return null;
    if (
      (nextNode.leftNode && nextNode.leftNode.data === value) ||
      (nextNode.rightNode && nextNode.rightNode.data === value)
    ) {
      return nextNode;
    }

    if (node.data > value) nextNode = this.#predecessor(value, nextNode.leftNode);
    if (node.data < value) nextNode = this.#predecessor(value, nextNode.rightNode);

    return nextNode;
    // if (this.root.data === value) return this.root;
    // let node = this.root;
    // while (node) {
    //   if (
    //     (node.leftNode && node.leftNode.data === value) ||
    //     (node.rightNode && node.rightNode.data === value)
    //   ) {
    //     break;
    //   }

    //   if (node.data > value) {
    //     // go left
    //     node = node.leftNode;
    //   } else if (node.data < value) {
    //     // go right
    //     node = node.rightNode;
    //   }
    // }
    // return node;
  };

  deleteNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    // There will be several cases for delete, such as when a node has children or not.
    const targetNode = this.find(value);
    if (targetNode) {
      const { leftNode } = targetNode;
      const { rightNode } = targetNode;
      const parentNode = this.#predecessor(value);
      console.log(parentNode);
      if (leftNode && rightNode) {
        // has 2 children
        console.log(`targetNode has 2 children`);
        let successor = targetNode.rightNode;
        while (successor) {
          if (!successor.leftNode) break;
          successor = successor.leftNode;
        }
        console.log(successor);
        // successor.leftNode = leftNode;
        // const parentSuccessor = this.#predecessor(successor.data);

        // const tmp = parentSuccessor;
        // tmp.leftNode = null;
        // successor.rightNode = tmp;
        // console.log(parentSuccessor);
        // console.log(successor);
        // console.log(tmp);
        // if (parentNode.rightNode && parentNode.rightNode.data === value) {
        //   parentNode.rightNode = successor;
        // }

        // if (parentNode.leftNode && parentNode.leftNode.data === value) {
        //   parentNode.leftNode = successor;
        // }
      } else if (leftNode || rightNode) {
        // has 1 child
        console.log(`targetNode has 1 child`);
        // if (parentNode.rightNode && parentNode.rightNode.data === value)
        //   parentNode.rightNode = !leftNode ? rightNode : leftNode;
        // if (parentNode.leftNode && parentNode.leftNode.data === value)
        //   parentNode.leftNode = !rightNode ? leftNode : rightNode;
      } else {
        // leaf node, no children
        console.log(`targetNode has no children`);
        // if (parentNode.rightNode && parentNode.rightNode.data === value) parentNode.rightNode = null;
        // if (parentNode.leftNode && parentNode.leftNode.data === value) parentNode.leftNode = null;
        // if (this.root.data === value) this.root = null;
      }
    }
    this.prettyPrint(this.root);
  };

  levelOrder = (callback) => {
    // Accepts a random OPTIONAL callback function as its parameter
    // Traverse the tree in breadth-first level order and provide each node as an argument to the callback.
    // The callback will perform an operation on each node following the order in which they are traversed.
    // The method should return an array of values if no callback is given as an argument.
    // You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    const arr = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length > 0) {
      const dequeue = queue.splice(0, 1)[0];
      if (callback) {
        callback(dequeue);
      } else {
        arr.push(dequeue.data);
      }

      if (dequeue.leftNode) queue.push(dequeue.leftNode);
      if (dequeue.rightNode) queue.push(dequeue.rightNode);
    }

    return callback ? undefined : arr;
  };

  inOrder = (callback, node = this.root, arr = []) => {
    // left => root => right
    // elements of the array will be in order
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      this.inOrder(callback, node.leftNode, arr);
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
      this.inOrder(callback, node.rightNode, arr);
    }

    return callback ? undefined : arr;
  };

  preOrder = (callback, node = this.root, arr = []) => {
    // root => left => right
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }

      this.preOrder(callback, node.leftNode, arr);
      this.preOrder(callback, node.rightNode, arr);
    }

    return callback ? undefined : arr;
  };

  postOrder = (callback, node = this.root, arr = []) => {
    // left => right => root
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      this.postOrder(callback, node.leftNode, arr);
      this.postOrder(callback, node.rightNode, arr);
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
    }

    return callback ? undefined : arr;
  };

  height = (node) => {
    // Accepts a node and returns its height.
    // Height is defined as the number of edges in the longest path from a given node to a leaf node.
  };

  depth = (node) => {
    // Accepts a node and returns its depth.
    // Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    let nextNode = this.root;
    let depthNum = 0;
    while (nextNode) {
      if (nextNode.data !== node.data) {
        depthNum += 1;
        if (nextNode.data > node.data) {
          // go left
          nextNode = nextNode.leftNode;
        } else {
          // go right
          nextNode = nextNode.rightNode;
        }
      } else {
        break;
      }
    }

    return depthNum;
  };

  isBalanced = () => {
    // Checks if the tree is balanced.
    // A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
  };

  rebalance = () => {
    // Rebalances an unbalanced tree.
    // You’ll want to use a traversal method to provide a new array to the buildTree function.
  };

  // root = buildTree(sortedArray, 0, sortedArray.length - 1);
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers/tree */ "./src/containers/tree.js");
/* harmony import */ var _components_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/test */ "./src/components/test.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");




window.Tree = _containers_tree__WEBPACK_IMPORTED_MODULE_0__["default"];
window.foo = new _containers_tree__WEBPACK_IMPORTED_MODULE_0__["default"]([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// window.foo = window.Tree([1, 3, 4, 4, 5, 7, 7, 8, 9, 9, 23, 67, 324, 6345]);
window.bar = new _containers_tree__WEBPACK_IMPORTED_MODULE_0__["default"]([20, 30, 32, 34, 36, 40, 50, 70, 60, 65, 80, 75, 85]);

// window.foo.prettyPrint(window.foo.root);
window.bar.prettyPrint(window.bar.root);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NkNBQUk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0RBQVM7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQUk7QUFDNUI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxXQUFXO0FBQ3pCLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5VHFDO0FBQ0E7QUFDaEI7O0FBRXJCLGNBQWMsd0RBQUk7QUFDbEIsaUJBQWlCLHdEQUFJO0FBQ3JCO0FBQ0EsaUJBQWlCLHdEQUFJOztBQUVyQjtBQUNBOztBQUVBLHdEQUFJO0FBQ0osMEJBQTBCLHdEQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGVzdC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvbWVyZ2Vzb3J0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9ub2RlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy90cmVlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBmb250LWZhbWlseTogQXJpYWw7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdURBQXVEO0VBQ3ZELCtCQUErQjtFQUMvQiw0Q0FBMkU7RUFDM0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHNDQUFzQztFQUN0QywrQkFBK0I7RUFDL0Isa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBzcmM6IHVybCguL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0Zik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBmb250LWZhbWlseTogQXJpYWw7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IEljb24gZnJvbSAnLi4vYXNzZXRzL2ljb25zL3NoYXJwX2hvbWUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcmludCgpIHtcbiAgICBjb25zb2xlLmxvZygncHJpbnQoKSBydW5uaW5nIGZyb20gdGVzdC5qcycpO1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0aW5nLi4uJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgZm9vID0gXCJ0ZXN0XCI7XG5cbiAgICBjb25zdCBpY29uID0gbmV3IEltYWdlKCk7XG4gICAgaWNvbi5zcmMgPSBJY29uO1xuICAgIHBhcmFncmFwaC50ZXh0Q29udGVudCA9ICdMb3JlbSBpcHN1bSBzb21ldGhpbmcgc29tZXRoaW5nLi4uJztcblxuICAgIGRpdi5hcHBlbmRDaGlsZChpY29uKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcbiAgICByZXR1cm4gZGl2O1xuICB9LFxufTtcbiIsImNvbnN0IG1lcmdlU29ydCA9IChhcnIpID0+IHtcbiAgLy8gY29uc29sZS5sb2coYXJyKTtcbiAgaWYgKGFyci5sZW5ndGggPD0gMSkgcmV0dXJuIGFycjtcbiAgY29uc3QgbWlkUG9pbnQgPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKTtcblxuICBjb25zdCBsZWZ0ID0gYXJyLnNsaWNlKDAsIG1pZFBvaW50KTtcbiAgY29uc3QgcmlnaHQgPSBhcnIuc2xpY2UobWlkUG9pbnQpO1xuICBjb25zdCBzb3J0ZWRMZWZ0ID0gbWVyZ2VTb3J0KGxlZnQpO1xuICBjb25zdCBzb3J0ZWRSaWdodCA9IG1lcmdlU29ydChyaWdodCk7XG4gIGNvbnN0IHNvcnRlZEFyciA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgbGV0IGogPSAwO1xuICBsZXQgayA9IDA7XG5cbiAgd2hpbGUgKGkgPCBzb3J0ZWRMZWZ0Lmxlbmd0aCAmJiBqIDwgc29ydGVkUmlnaHQubGVuZ3RoKSB7XG4gICAgaWYgKHNvcnRlZExlZnRbaV0gPCBzb3J0ZWRSaWdodFtqXSkge1xuICAgICAgc29ydGVkQXJyW2tdID0gc29ydGVkTGVmdFtpXTtcbiAgICAgIGkgKz0gMTtcbiAgICB9IGVsc2UgaWYgKHNvcnRlZExlZnRbaV0gPiBzb3J0ZWRSaWdodFtqXSkge1xuICAgICAgc29ydGVkQXJyW2tdID0gc29ydGVkUmlnaHRbal07XG4gICAgICBqICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRlZEFycltrXSA9IHNvcnRlZFJpZ2h0W2pdO1xuICAgICAgaSArPSAxO1xuICAgICAgaiArPSAxO1xuICAgIH1cbiAgICBrICs9IDE7XG4gIH1cblxuICBmb3IgKDsgaSA8IHNvcnRlZExlZnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRMZWZ0W2ldO1xuICAgIGsgKz0gMTtcbiAgfVxuXG4gIGZvciAoOyBqIDwgc29ydGVkUmlnaHQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRSaWdodFtqXTtcbiAgICBrICs9IDE7XG4gIH1cblxuICByZXR1cm4gc29ydGVkQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VTb3J0O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmxlZnROb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpZ2h0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgbWVyZ2VTb3J0IGZyb20gJy4vbWVyZ2Vzb3J0JztcbmltcG9ydCBOb2RlIGZyb20gJy4vbm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuICAvLyBBY2NlcHRzIGFuIGFycmF5IHdoZW4gaW5pdGlhbGl6ZWQuXG4gIC8vIFRoZSBUcmVlIGNsYXNzIHNob3VsZCBoYXZlIGEgcm9vdCBhdHRyaWJ1dGUsIHdoaWNoIHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWVcbiAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgdGhpcy5yb290ID0gdGhpcy5idWlsZFRyZWUoYXJyKTtcbiAgfVxuXG4gICNzZXRSb290ID0gKG5vZGUpID0+IHtcbiAgICB0aGlzLnJvb3QgPSBub2RlO1xuICB9O1xuXG4gIHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9ICcnLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQobm9kZS5yaWdodE5vZGUsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilIIgICAnIDogJyAgICAnfWAsIGZhbHNlKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUlOKUgOKUgCAnIDogJ+KUjOKUgOKUgCAnfSR7bm9kZS5kYXRhfWApO1xuICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQobm9kZS5sZWZ0Tm9kZSwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJyAgICAnIDogJ+KUgiAgICd9YCwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gICNzb3J0ZWRBcnJheVRvQlNUID0gKGFyciwgc3RhcnQsIGVuZCkgPT4ge1xuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBtaWRQb2ludCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpO1xuICAgIGNvbnN0IHJvb3ROb2RlID0gbmV3IE5vZGUoYXJyW21pZFBvaW50XSk7XG4gICAgcm9vdE5vZGUubGVmdE5vZGUgPSB0aGlzLiNzb3J0ZWRBcnJheVRvQlNUKGFyciwgc3RhcnQsIG1pZFBvaW50IC0gMSk7XG4gICAgcm9vdE5vZGUucmlnaHROb2RlID0gdGhpcy4jc29ydGVkQXJyYXlUb0JTVChhcnIsIG1pZFBvaW50ICsgMSwgZW5kKTtcbiAgICAvLyBjb25zdCBjaGlsZE5vZGVPbmUgPSBzb3J0ZWRBcnJheVRvQlNUKGFyciwgc3RhcnQsIG1pZFBvaW50IC0gMSk7XG4gICAgLy8gY29uc3QgY2hpbGROb2RlVHdvID0gc29ydGVkQXJyYXlUb0JTVChhcnIsIG1pZFBvaW50ICsgMSwgZW5kKTtcblxuICAgIC8vIGlmIChjaGlsZE5vZGVPbmUpIHtcbiAgICAvLyAgIGlmIChyb290Tm9kZS5kYXRhIDwgY2hpbGROb2RlT25lLmRhdGEpIHtcbiAgICAvLyAgICAgcm9vdE5vZGUucmlnaHROb2RlID0gY2hpbGROb2RlT25lO1xuICAgIC8vICAgfSBlbHNlIGlmIChyb290Tm9kZS5kYXRhID4gY2hpbGROb2RlT25lLmRhdGEpIHtcbiAgICAvLyAgICAgcm9vdE5vZGUubGVmdE5vZGUgPSBjaGlsZE5vZGVPbmU7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUubG9nKHJvb3ROb2RlKTtcbiAgICAvLyBpZiAoY2hpbGROb2RlVHdvKSB7XG4gICAgLy8gICBpZiAocm9vdE5vZGUuZGF0YSA8IGNoaWxkTm9kZVR3by5kYXRhKSB7XG4gICAgLy8gICAgIHJvb3ROb2RlLnJpZ2h0Tm9kZSA9IGNoaWxkTm9kZVR3bztcbiAgICAvLyAgIH0gZWxzZSBpZiAocm9vdE5vZGUuZGF0YSA+IGNoaWxkTm9kZVR3by5kYXRhKSB7XG4gICAgLy8gICAgIHJvb3ROb2RlLmxlZnROb2RlID0gY2hpbGROb2RlVHdvO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIHJldHVybiByb290Tm9kZTtcbiAgfTtcblxuICBidWlsZFRyZWUgPSAoYXJyKSA9PiB7XG4gICAgLy8gVGFrZXMgYW4gYXJyYXkgb2YgZGF0YSAoZS5nLiwgWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0XSlcbiAgICAvLyBUdXJucyBpdCBpbnRvIGEgYmFsYW5jZWQgYmluYXJ5IHRyZWUgZnVsbCBvZiBOb2RlIG9iamVjdHMgYXBwcm9wcmlhdGVseSBwbGFjZWRcbiAgICAvLyAoZG9u4oCZdCBmb3JnZXQgdG8gc29ydCBhbmQgcmVtb3ZlIGR1cGxpY2F0ZXMhKS5cbiAgICAvLyBUaGUgYnVpbGRUcmVlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gdGhlIGxldmVsLTAgcm9vdCBub2RlLlxuICAgIGNvbnN0IHNvcnRlZEFyciA9IG1lcmdlU29ydChhcnIpO1xuICAgIHJldHVybiB0aGlzLiNzb3J0ZWRBcnJheVRvQlNUKHNvcnRlZEFyciwgMCwgc29ydGVkQXJyLmxlbmd0aCAtIDEpO1xuICAgIC8vIHJldHVybiBzb3J0ZWRBcnJheVRvQlNUKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpO1xuICB9O1xuXG4gIGluc2VydE5vZGUgPSAodmFsdWUpID0+IHtcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGVzZSBtZXRob2RzIHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBhbmQgbWFuaXB1bGF0ZSB0aGUgbm9kZXMgYW5kIHRoZWlyIGNvbm5lY3Rpb25zLlxuICAgIGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMucm9vdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy4jc2V0Um9vdChuZXdOb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5vZGUgPSB0aGlzLnJvb3Q7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5kYXRhIDwgdmFsdWUpIHtcbiAgICAgICAgICAvLyBnbyByaWdodFxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yaWdodE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5yaWdodE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSB7XG4gICAgICAgICAgLy8gZ28gbGVmdFxuICAgICAgICAgIGlmIChub2RlLmxlZnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmxlZnROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGR1cGxpY2F0ZSBmb3VuZFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZpbmQgPSAodmFsdWUsIG5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyBBY2NlcHRzIGEgdmFsdWUgYW5kIHJldHVybnMgdGhlIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgbGV0IG5leHROb2RlID0gbm9kZTtcbiAgICBpZiAobmV4dE5vZGUgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGlmIChuZXh0Tm9kZS5kYXRhID09PSB2YWx1ZSkgcmV0dXJuIG5leHROb2RlO1xuXG4gICAgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuZmluZCh2YWx1ZSwgbm9kZS5sZWZ0Tm9kZSk7XG4gICAgaWYgKG5vZGUuZGF0YSA8IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuZmluZCh2YWx1ZSwgbm9kZS5yaWdodE5vZGUpO1xuICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgfTtcblxuICAjcHJlZGVjZXNzb3IgPSAodmFsdWUsIG5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyByZXR1cm5zIHByZWRlY2Vzc29yIG5vZGUgb2YgZ2l2ZW4gdmFsdWVcbiAgICAvLyBob3cgdG8gcmVmYWN0b3IgdGhpcz9cbiAgICBsZXQgbmV4dE5vZGUgPSBub2RlO1xuICAgIGlmIChuZXh0Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKFxuICAgICAgKG5leHROb2RlLmxlZnROb2RlICYmIG5leHROb2RlLmxlZnROb2RlLmRhdGEgPT09IHZhbHVlKSB8fFxuICAgICAgKG5leHROb2RlLnJpZ2h0Tm9kZSAmJiBuZXh0Tm9kZS5yaWdodE5vZGUuZGF0YSA9PT0gdmFsdWUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmV4dE5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuI3ByZWRlY2Vzc29yKHZhbHVlLCBuZXh0Tm9kZS5sZWZ0Tm9kZSk7XG4gICAgaWYgKG5vZGUuZGF0YSA8IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuI3ByZWRlY2Vzc29yKHZhbHVlLCBuZXh0Tm9kZS5yaWdodE5vZGUpO1xuXG4gICAgcmV0dXJuIG5leHROb2RlO1xuICAgIC8vIGlmICh0aGlzLnJvb3QuZGF0YSA9PT0gdmFsdWUpIHJldHVybiB0aGlzLnJvb3Q7XG4gICAgLy8gbGV0IG5vZGUgPSB0aGlzLnJvb3Q7XG4gICAgLy8gd2hpbGUgKG5vZGUpIHtcbiAgICAvLyAgIGlmIChcbiAgICAvLyAgICAgKG5vZGUubGVmdE5vZGUgJiYgbm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkgfHxcbiAgICAvLyAgICAgKG5vZGUucmlnaHROb2RlICYmIG5vZGUucmlnaHROb2RlLmRhdGEgPT09IHZhbHVlKVxuICAgIC8vICAgKSB7XG4gICAgLy8gICAgIGJyZWFrO1xuICAgIC8vICAgfVxuXG4gICAgLy8gICBpZiAobm9kZS5kYXRhID4gdmFsdWUpIHtcbiAgICAvLyAgICAgLy8gZ28gbGVmdFxuICAgIC8vICAgICBub2RlID0gbm9kZS5sZWZ0Tm9kZTtcbiAgICAvLyAgIH0gZWxzZSBpZiAobm9kZS5kYXRhIDwgdmFsdWUpIHtcbiAgICAvLyAgICAgLy8gZ28gcmlnaHRcbiAgICAvLyAgICAgbm9kZSA9IG5vZGUucmlnaHROb2RlO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBkZWxldGVOb2RlID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gb2YgdGhlc2UgbWV0aG9kcyBzaG91bGQgdHJhdmVyc2UgdGhlIHRyZWUgYW5kIG1hbmlwdWxhdGUgdGhlIG5vZGVzIGFuZCB0aGVpciBjb25uZWN0aW9ucy5cbiAgICAvLyBUaGVyZSB3aWxsIGJlIHNldmVyYWwgY2FzZXMgZm9yIGRlbGV0ZSwgc3VjaCBhcyB3aGVuIGEgbm9kZSBoYXMgY2hpbGRyZW4gb3Igbm90LlxuICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0aGlzLmZpbmQodmFsdWUpO1xuICAgIGlmICh0YXJnZXROb2RlKSB7XG4gICAgICBjb25zdCB7IGxlZnROb2RlIH0gPSB0YXJnZXROb2RlO1xuICAgICAgY29uc3QgeyByaWdodE5vZGUgfSA9IHRhcmdldE5vZGU7XG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy4jcHJlZGVjZXNzb3IodmFsdWUpO1xuICAgICAgY29uc29sZS5sb2cocGFyZW50Tm9kZSk7XG4gICAgICBpZiAobGVmdE5vZGUgJiYgcmlnaHROb2RlKSB7XG4gICAgICAgIC8vIGhhcyAyIGNoaWxkcmVuXG4gICAgICAgIGNvbnNvbGUubG9nKGB0YXJnZXROb2RlIGhhcyAyIGNoaWxkcmVuYCk7XG4gICAgICAgIGxldCBzdWNjZXNzb3IgPSB0YXJnZXROb2RlLnJpZ2h0Tm9kZTtcbiAgICAgICAgd2hpbGUgKHN1Y2Nlc3Nvcikge1xuICAgICAgICAgIGlmICghc3VjY2Vzc29yLmxlZnROb2RlKSBicmVhaztcbiAgICAgICAgICBzdWNjZXNzb3IgPSBzdWNjZXNzb3IubGVmdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coc3VjY2Vzc29yKTtcbiAgICAgICAgLy8gc3VjY2Vzc29yLmxlZnROb2RlID0gbGVmdE5vZGU7XG4gICAgICAgIC8vIGNvbnN0IHBhcmVudFN1Y2Nlc3NvciA9IHRoaXMuI3ByZWRlY2Vzc29yKHN1Y2Nlc3Nvci5kYXRhKTtcblxuICAgICAgICAvLyBjb25zdCB0bXAgPSBwYXJlbnRTdWNjZXNzb3I7XG4gICAgICAgIC8vIHRtcC5sZWZ0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8vIHN1Y2Nlc3Nvci5yaWdodE5vZGUgPSB0bXA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhcmVudFN1Y2Nlc3Nvcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN1Y2Nlc3Nvcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRtcCk7XG4gICAgICAgIC8vIGlmIChwYXJlbnROb2RlLnJpZ2h0Tm9kZSAmJiBwYXJlbnROb2RlLnJpZ2h0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAvLyAgIHBhcmVudE5vZGUucmlnaHROb2RlID0gc3VjY2Vzc29yO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYgKHBhcmVudE5vZGUubGVmdE5vZGUgJiYgcGFyZW50Tm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAvLyAgIHBhcmVudE5vZGUubGVmdE5vZGUgPSBzdWNjZXNzb3I7XG4gICAgICAgIC8vIH1cbiAgICAgIH0gZWxzZSBpZiAobGVmdE5vZGUgfHwgcmlnaHROb2RlKSB7XG4gICAgICAgIC8vIGhhcyAxIGNoaWxkXG4gICAgICAgIGNvbnNvbGUubG9nKGB0YXJnZXROb2RlIGhhcyAxIGNoaWxkYCk7XG4gICAgICAgIC8vIGlmIChwYXJlbnROb2RlLnJpZ2h0Tm9kZSAmJiBwYXJlbnROb2RlLnJpZ2h0Tm9kZS5kYXRhID09PSB2YWx1ZSlcbiAgICAgICAgLy8gICBwYXJlbnROb2RlLnJpZ2h0Tm9kZSA9ICFsZWZ0Tm9kZSA/IHJpZ2h0Tm9kZSA6IGxlZnROb2RlO1xuICAgICAgICAvLyBpZiAocGFyZW50Tm9kZS5sZWZ0Tm9kZSAmJiBwYXJlbnROb2RlLmxlZnROb2RlLmRhdGEgPT09IHZhbHVlKVxuICAgICAgICAvLyAgIHBhcmVudE5vZGUubGVmdE5vZGUgPSAhcmlnaHROb2RlID8gbGVmdE5vZGUgOiByaWdodE5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsZWFmIG5vZGUsIG5vIGNoaWxkcmVuXG4gICAgICAgIGNvbnNvbGUubG9nKGB0YXJnZXROb2RlIGhhcyBubyBjaGlsZHJlbmApO1xuICAgICAgICAvLyBpZiAocGFyZW50Tm9kZS5yaWdodE5vZGUgJiYgcGFyZW50Tm9kZS5yaWdodE5vZGUuZGF0YSA9PT0gdmFsdWUpIHBhcmVudE5vZGUucmlnaHROb2RlID0gbnVsbDtcbiAgICAgICAgLy8gaWYgKHBhcmVudE5vZGUubGVmdE5vZGUgJiYgcGFyZW50Tm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkgcGFyZW50Tm9kZS5sZWZ0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8vIGlmICh0aGlzLnJvb3QuZGF0YSA9PT0gdmFsdWUpIHRoaXMucm9vdCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHJldHR5UHJpbnQodGhpcy5yb290KTtcbiAgfTtcblxuICBsZXZlbE9yZGVyID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBPUFRJT05BTCBjYWxsYmFjayBmdW5jdGlvbiBhcyBpdHMgcGFyYW1ldGVyXG4gICAgLy8gVHJhdmVyc2UgdGhlIHRyZWUgaW4gYnJlYWR0aC1maXJzdCBsZXZlbCBvcmRlciBhbmQgcHJvdmlkZSBlYWNoIG5vZGUgYXMgYW4gYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrLlxuICAgIC8vIFRoZSBjYWxsYmFjayB3aWxsIHBlcmZvcm0gYW4gb3BlcmF0aW9uIG9uIGVhY2ggbm9kZSBmb2xsb3dpbmcgdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgYXJlIHRyYXZlcnNlZC5cbiAgICAvLyBUaGUgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxuICAgIC8vIFlvdSB3aWxsIHdhbnQgdG8gdXNlIGFuIGFycmF5IGFjdGluZyBhcyBhIHF1ZXVlIHRvIGtlZXAgdHJhY2sgb2YgYWxsIHRoZSBjaGlsZCBub2RlcyB0aGF0IHlvdSBoYXZlIHlldCB0byB0cmF2ZXJzZSBhbmQgdG8gYWRkIG5ldyBvbmVzIHRvIHRoZSBsaXN0XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICBpZiAodGhpcy5yb290KSBxdWV1ZS5wdXNoKHRoaXMucm9vdCk7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRlcXVldWUgPSBxdWV1ZS5zcGxpY2UoMCwgMSlbMF07XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soZGVxdWV1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChkZXF1ZXVlLmRhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVxdWV1ZS5sZWZ0Tm9kZSkgcXVldWUucHVzaChkZXF1ZXVlLmxlZnROb2RlKTtcbiAgICAgIGlmIChkZXF1ZXVlLnJpZ2h0Tm9kZSkgcXVldWUucHVzaChkZXF1ZXVlLnJpZ2h0Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gdW5kZWZpbmVkIDogYXJyO1xuICB9O1xuXG4gIGluT3JkZXIgPSAoY2FsbGJhY2ssIG5vZGUgPSB0aGlzLnJvb3QsIGFyciA9IFtdKSA9PiB7XG4gICAgLy8gbGVmdCA9PiByb290ID0+IHJpZ2h0XG4gICAgLy8gZWxlbWVudHMgb2YgdGhlIGFycmF5IHdpbGwgYmUgaW4gb3JkZXJcbiAgICAvLyBBY2NlcHRzIGEgcmFuZG9tIG9wdGlvbmFsIGNhbGxiYWNrIGFzIGEgcGFyYW1ldGVyLlxuICAgIC8vIFRyYXZlcnNlIHRoZSB0cmVlIGluIHRoZWlyIHJlc3BlY3RpdmUgZGVwdGgtZmlyc3Qgb3JkZXIgYW5kIHlpZWxkIGVhY2ggbm9kZSB0byB0aGUgcHJvdmlkZWQgY2FsbGJhY2suXG4gICAgLy8gUmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cblxuICAgIGlmIChub2RlKSB7XG4gICAgICB0aGlzLmluT3JkZXIoY2FsbGJhY2ssIG5vZGUubGVmdE5vZGUsIGFycik7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChub2RlLmRhdGEpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbk9yZGVyKGNhbGxiYWNrLCBub2RlLnJpZ2h0Tm9kZSwgYXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FsbGJhY2sgPyB1bmRlZmluZWQgOiBhcnI7XG4gIH07XG5cbiAgcHJlT3JkZXIgPSAoY2FsbGJhY2ssIG5vZGUgPSB0aGlzLnJvb3QsIGFyciA9IFtdKSA9PiB7XG4gICAgLy8gcm9vdCA9PiBsZWZ0ID0+IHJpZ2h0XG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBvcHRpb25hbCBjYWxsYmFjayBhcyBhIHBhcmFtZXRlci5cbiAgICAvLyBUcmF2ZXJzZSB0aGUgdHJlZSBpbiB0aGVpciByZXNwZWN0aXZlIGRlcHRoLWZpcnN0IG9yZGVyIGFuZCB5aWVsZCBlYWNoIG5vZGUgdG8gdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuICAgIC8vIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2gobm9kZS5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmVPcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0Tm9kZSwgYXJyKTtcbiAgICAgIHRoaXMucHJlT3JkZXIoY2FsbGJhY2ssIG5vZGUucmlnaHROb2RlLCBhcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcbiAgfTtcblxuICBwb3N0T3JkZXIgPSAoY2FsbGJhY2ssIG5vZGUgPSB0aGlzLnJvb3QsIGFyciA9IFtdKSA9PiB7XG4gICAgLy8gbGVmdCA9PiByaWdodCA9PiByb290XG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBvcHRpb25hbCBjYWxsYmFjayBhcyBhIHBhcmFtZXRlci5cbiAgICAvLyBUcmF2ZXJzZSB0aGUgdHJlZSBpbiB0aGVpciByZXNwZWN0aXZlIGRlcHRoLWZpcnN0IG9yZGVyIGFuZCB5aWVsZCBlYWNoIG5vZGUgdG8gdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuICAgIC8vIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgdGhpcy5wb3N0T3JkZXIoY2FsbGJhY2ssIG5vZGUubGVmdE5vZGUsIGFycik7XG4gICAgICB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodE5vZGUsIGFycik7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChub2RlLmRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcbiAgfTtcblxuICBoZWlnaHQgPSAobm9kZSkgPT4ge1xuICAgIC8vIEFjY2VwdHMgYSBub2RlIGFuZCByZXR1cm5zIGl0cyBoZWlnaHQuXG4gICAgLy8gSGVpZ2h0IGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBpbiB0aGUgbG9uZ2VzdCBwYXRoIGZyb20gYSBnaXZlbiBub2RlIHRvIGEgbGVhZiBub2RlLlxuICB9O1xuXG4gIGRlcHRoID0gKG5vZGUpID0+IHtcbiAgICAvLyBBY2NlcHRzIGEgbm9kZSBhbmQgcmV0dXJucyBpdHMgZGVwdGguXG4gICAgLy8gRGVwdGggaXMgZGVmaW5lZCBhcyB0aGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBwYXRoIGZyb20gYSBnaXZlbiBub2RlIHRvIHRoZSB0cmVl4oCZcyByb290IG5vZGUuXG4gICAgbGV0IG5leHROb2RlID0gdGhpcy5yb290O1xuICAgIGxldCBkZXB0aE51bSA9IDA7XG4gICAgd2hpbGUgKG5leHROb2RlKSB7XG4gICAgICBpZiAobmV4dE5vZGUuZGF0YSAhPT0gbm9kZS5kYXRhKSB7XG4gICAgICAgIGRlcHRoTnVtICs9IDE7XG4gICAgICAgIGlmIChuZXh0Tm9kZS5kYXRhID4gbm9kZS5kYXRhKSB7XG4gICAgICAgICAgLy8gZ28gbGVmdFxuICAgICAgICAgIG5leHROb2RlID0gbmV4dE5vZGUubGVmdE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZ28gcmlnaHRcbiAgICAgICAgICBuZXh0Tm9kZSA9IG5leHROb2RlLnJpZ2h0Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlcHRoTnVtO1xuICB9O1xuXG4gIGlzQmFsYW5jZWQgPSAoKSA9PiB7XG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB0cmVlIGlzIGJhbGFuY2VkLlxuICAgIC8vIEEgYmFsYW5jZWQgdHJlZSBpcyBvbmUgd2hlcmUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBoZWlnaHRzIG9mIHRoZSBsZWZ0IHN1YnRyZWUgYW5kIHRoZSByaWdodCBzdWJ0cmVlIG9mIGV2ZXJ5IG5vZGUgaXMgbm90IG1vcmUgdGhhbiAxLlxuICB9O1xuXG4gIHJlYmFsYW5jZSA9ICgpID0+IHtcbiAgICAvLyBSZWJhbGFuY2VzIGFuIHVuYmFsYW5jZWQgdHJlZS5cbiAgICAvLyBZb3XigJlsbCB3YW50IHRvIHVzZSBhIHRyYXZlcnNhbCBtZXRob2QgdG8gcHJvdmlkZSBhIG5ldyBhcnJheSB0byB0aGUgYnVpbGRUcmVlIGZ1bmN0aW9uLlxuICB9O1xuXG4gIC8vIHJvb3QgPSBidWlsZFRyZWUoc29ydGVkQXJyYXksIDAsIHNvcnRlZEFycmF5Lmxlbmd0aCAtIDEpO1xufVxuIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi9jb250YWluZXJzL3RyZWUnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLi9jb21wb25lbnRzL3Rlc3QnO1xuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbndpbmRvdy5UcmVlID0gVHJlZTtcbndpbmRvdy5mb28gPSBuZXcgVHJlZShbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjRdKTtcbi8vIHdpbmRvdy5mb28gPSB3aW5kb3cuVHJlZShbMSwgMywgNCwgNCwgNSwgNywgNywgOCwgOSwgOSwgMjMsIDY3LCAzMjQsIDYzNDVdKTtcbndpbmRvdy5iYXIgPSBuZXcgVHJlZShbMjAsIDMwLCAzMiwgMzQsIDM2LCA0MCwgNTAsIDcwLCA2MCwgNjUsIDgwLCA3NSwgODVdKTtcblxuLy8gd2luZG93LmZvby5wcmV0dHlQcmludCh3aW5kb3cuZm9vLnJvb3QpO1xud2luZG93LmJhci5wcmV0dHlQcmludCh3aW5kb3cuYmFyLnJvb3QpO1xuXG50ZXN0LnByaW50KCk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3QucmVuZGVyKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9