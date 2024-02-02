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

/***/ "./src/containers/binary-search-tree/binary-search-tree.js":
/*!*****************************************************************!*\
  !*** ./src/containers/binary-search-tree/binary-search-tree.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _merge_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merge-sort */ "./src/containers/binary-search-tree/merge-sort.js");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node */ "./src/containers/binary-search-tree/node.js");



class Tree {
  // Accepts an array when initialized.
  // The Tree class should have a root attribute, which uses the return value of buildTree
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
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
    const sortedArr = (0,_merge_sort__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
    return this.#sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
    // return sortedArrayToBST(arr, 0, arr.length - 1);
  };

  insertNode = (value, node = this.root) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    if (value === undefined) throw new Error('Argument undefined');
    let newNode = node;
    if (node === null) {
      newNode = new _node__WEBPACK_IMPORTED_MODULE_1__["default"](value);
      if (!this.root) this.root = newNode;
      return newNode;
    }

    if (node.data < value) {
      newNode.rightNode = this.insertNode(value, node.rightNode);
    } else if (node.data > value) {
      newNode.leftNode = this.insertNode(value, node.leftNode);
    }

    return newNode;
    // iterative approach
    // const newNode = new Node(value);
    // if (this.root === null) {
    //   this.#setRoot(newNode);
    // } else {
    //   let node = this.root;
    //   while (node) {
    //     if (node.data < value) {
    //       // go right
    //       if (node.rightNode === null) {
    //         node.rightNode = newNode;
    //       } else {
    //         node = node.rightNode;
    //       }
    //     } else if (node.data > value) {
    //       // go left
    //       if (node.leftNode === null) {
    //         node.leftNode = newNode;
    //       } else {
    //         node = node.leftNode;
    //       }
    //     } else {
    //       // duplicate found
    //       break;
    //     }
    //   }
    // }
  };

  find = (value, node = this.root) => {
    // Accepts a value and returns the node with the given value.
    if (value === undefined) throw new Error('Argument undefined');
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
  };

  deleteNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    // There will be several cases for delete, such as when a node has children or not.
    if (value === undefined) throw new Error('Argument undefined');
    const targetNode = this.find(value);
    if (targetNode) {
      const { leftNode } = targetNode;
      const { rightNode } = targetNode;
      const parentNode = this.#predecessor(value);

      if (leftNode && rightNode) {
        // has 2 children
        let successor = rightNode;
        while (successor) {
          // finds successor
          if (!successor.leftNode) break;
          successor = successor.leftNode;
        }

        const successorRightNode = successor.rightNode;
        const parentSuccessor = this.#predecessor(successor.data);
        parentSuccessor.leftNode = null;
        if (!successor.leftNode && successor.rightNode) {
          if (parentSuccessor.data === value) {
            // if parentSuccessor is the node to delete
            successor.rightNode = successorRightNode;
          } else {
            parentSuccessor.leftNode = successorRightNode;
            successor.rightNode = rightNode;
          }
        }

        if (!successor.leftNode && !successor.rightNode) {
          // if successor is a leaf node
          successor.rightNode = parentSuccessor.data === value ? null : rightNode;
          // if parentSuccessor is the node to delete
          //  set the successor's rightNode to null
        }

        successor.leftNode = leftNode;

        if (parentNode.rightNode && parentNode.rightNode.data === value) {
          // if node to delete is to the right of the parentNode
          parentNode.rightNode = successor;
        } else if (parentNode.leftNode && parentNode.leftNode.data === value) {
          // if node to delete is to the left of the parentNode
          parentNode.leftNode = successor;
        } else {
          // node to delete is the root node
          this.root = successor;
        }
      } else if (leftNode || rightNode) {
        // node to delete has 1 child
        if (parentNode.rightNode && parentNode.rightNode.data === value) {
          parentNode.rightNode = !leftNode ? rightNode : leftNode;
        } else if (parentNode.leftNode && parentNode.leftNode.data === value) {
          parentNode.leftNode = !rightNode ? leftNode : rightNode;
        } else {
          this.root = !rightNode ? leftNode : rightNode;
        }
        // if (this.root.data === value) this.root = !rightNode ? leftNode : rightNode;
      } else if (!rightNode && !leftNode) {
        // node to delete is a leaf node, no children
        if (parentNode.rightNode && parentNode.rightNode.data === value) {
          parentNode.rightNode = null;
        } else if (parentNode.leftNode && parentNode.leftNode.data === value) {
          parentNode.leftNode = null;
        } else {
          // (this.root.data === value)
          this.root = null;
        }
      }
    } else {
      throw new Error('Value does not exist in tree.');
    }
  };

  levelOrder = (callback, arr = [], queue = [this.root]) => {
    // Accepts a random OPTIONAL callback function as its parameter
    // Traverse the tree in breadth-first level order and provide each node as an argument to the callback.
    // The callback will perform an operation on each node following the order in which they are traversed.
    // The method should return an array of values if no callback is given as an argument.
    // You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    if (this.root === null || queue.length === 0) return arr;
    const dequeue = queue.shift();
    if (callback) {
      callback(dequeue);
    } else {
      arr.push(dequeue.data);
    }

    if (dequeue.leftNode) queue.push(dequeue.leftNode);
    if (dequeue.rightNode) queue.push(dequeue.rightNode);

    this.levelOrder(callback, arr, queue);
    return callback ? undefined : arr;

    // iterative approach
    // const arr = [];
    // const queue = [];
    // if (this.root) queue.push(this.root);
    // while (queue.length > 0) {
    //   const dequeue = queue.splice(0, 1)[0];
    //   if (callback) {
    //     callback(dequeue);
    //   } else {
    //     arr.push(dequeue.data);
    //   }
    //   if (dequeue.leftNode) queue.push(dequeue.leftNode);
    //   if (dequeue.rightNode) queue.push(dequeue.rightNode);
    // }
    // return callback ? undefined : arr;
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
    if (node === null) return -1;
    if (!(node instanceof _node__WEBPACK_IMPORTED_MODULE_1__["default"])) return new Error('Incorrect parameter type.');

    const leftNodeHeight = this.height(node.leftNode);
    const rightNodeHeight = this.height(node.rightNode);

    return Math.max(leftNodeHeight, rightNodeHeight) + 1;
  };

  depth = (node, nextNode = this.root) => {
    // Accepts a node and returns its depth.
    // Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    if (node === null || node === undefined) return new Error('Invalid parameter.');
    if (nextNode.data === node.data) return 0;
    if (!(node instanceof _node__WEBPACK_IMPORTED_MODULE_1__["default"])) return new Error('Incorrect parameter type.');
    let depthNum = 0;
    if (node.data < nextNode.data) depthNum = this.depth(node, nextNode.leftNode) + 1;
    if (node.data > nextNode.data) depthNum = this.depth(node, nextNode.rightNode) + 1;

    return depthNum;
  };

  isBalanced = (node = this.root) => {
    // Checks if the tree is balanced.
    // A balanced tree is one where the difference between heights of the left subtree
    // and the right subtree of every node is not more than 1.
    if (node === null) {
      return true;
    }
    const leftSubtreeHeight = this.height(node.leftNode);
    const rightSubtreeHeight = this.height(node.rightNode);
    const difference = leftSubtreeHeight - rightSubtreeHeight;
    if (difference <= 1 && difference >= -1) {
      return this.isBalanced(node.leftNode) && this.isBalanced(node.rightNode);
    }
    return false;
  };

  rebalance = () => {
    // Rebalances an unbalanced tree.
    // You’ll want to use a traversal method to provide a new array to the buildTree function.
    if (!this.isBalanced()) {
      const sortedArray = this.inOrder();
      this.root = this.buildTree(sortedArray);
    }
  };
}


/***/ }),

/***/ "./src/containers/binary-search-tree/merge-sort.js":
/*!*********************************************************!*\
  !*** ./src/containers/binary-search-tree/merge-sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mergeSort = (arr) => {
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

/***/ "./src/containers/binary-search-tree/node.js":
/*!***************************************************!*\
  !*** ./src/containers/binary-search-tree/node.js ***!
  \***************************************************/
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

/***/ "./src/containers/knight_travails.js":
/*!*******************************************!*\
  !*** ./src/containers/knight_travails.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _linked_list_linked_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linked-list/linked-list */ "./src/containers/linked-list/linked-list.js");
/* harmony import */ var _binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary-search-tree/binary-search-tree */ "./src/containers/binary-search-tree/binary-search-tree.js");


/*
Its basic move is two steps forward and one step to the side
or one step forward and two steps to the side. It can face any direction.

You can think of the board as having 2-dimensional coordinates.
Your function would therefore look like:
knightMoves([0,0],[1,2]) == [[0,0],[1,2]]

1. Think about the rules of the board and knight, and make sure to follow them.
2. For every square there is a number of possible moves,
choose a data structure that will allow you to work with them.
Don’t allow any moves to go off the board.
3. Decide which search algorithm is best to use for this case.
Hint: one of them could be a potentially infinite series.
4. Use the chosen search algorithm to find the shortest path between 
the starting square (or node) and the ending square.
Output what that full path looks like, e.g.:
> knightMoves([3,3],[4,3])
  => You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]
*/
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

const move = (start, count, direction) => {
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

let memo = [];

const generatePossibleMoves = (startX, startY, endX, endY) => {
  //   generates all legal moves for a knight
  //   how to get all possible moves from [startX, startY] to [endX, endY]?
  //   ignore already visited squares?
  //   recursive function?
  console.log(`startX: ${startX}, startY: ${startY}`);

  // create a node for startX-startY?
  // with a possibleMoves property?
  // console.log(memo.find((item) => item.startX === startX && item.startY === startY));
  if (memo.find((item) => item.startX === startX && item.startY === startY)) return [];
  const obj = { startX, startY };
  // if (startX === endX && startY === endY) return [];
  // if ((startX === null && startY === null) || (startX === undefined && startY === undefined))
  //   return [];
  // console.table(memo);
  // if (memo.find((item) => item[0] === startX && item[1] === startY)) return possibleMoves;

  let moves = [];

  for (let i = 0; i < 2; i += 1) {
    //  vertical and horizontal moves
    //  moves 1-2 squares left/up or right/down
    for (let j = 0; j < 2; j += 1) {
      const vertDir = i % 2 !== 0; // true => up, false => down
      const horDir = j % 2 === 0; // true => right, false => left
      const newMoveV = [move(startX, 1, horDir), move(startY, 2, vertDir)];
      const newMoveH = [move(startX, 2, horDir), move(startY, 1, vertDir)];
      // if newMoveV or newMoveH exists in memo
      //  do not push it into moves
      // const testA = memo.find((item) => item[0] === newMoveV[0] && item[1] === newMoveV[1]);
      // const testB = memo.find((item) => item[0] === newMoveH[0] && item[1] === newMoveH[1]);

      if (newMoveV.every((element) => element !== null)) {
        moves.push(newMoveV);
      }
      if (newMoveH.every((element) => element !== null)) {
        moves.push(newMoveH);
      }
    }
  }

  console.log(moves);
  obj.possible_moves = moves;
  memo.push(obj);
  console.log(obj);
  // need to generate possible moves for each possible move
  moves.forEach((item) => {
    generatePossibleMoves(item[0], item[1], endX, endY);
  });
  /*
  knightMoves([3, 3],[0, 0])
  0: [3, 3] => [[4, 1], [5, 2], [2, 1], [1, 2], [4, 5], [5, 4], [2, 5], [1, 4]]
  1: [4, 1] => [[6, 0], [2, 0], [5, 3], [6, 2], [3, 3], [2, 2]]
    0: [6, 0] => [[7, 2], [5, 2], [4, 1]]
      0: [7, 2] => [[6, 0], [5, 1], [6, 4], [5, 3]]
        0: [6, 0] => []
        1: [5, 1] => [[7, 0], [3, 0], [6, 3], [7, 2], [4, 3], [3, 2]]
          0: [7, 0] => [[6, 2], [5, 1]]
            0: [6, 2] => [[7, 0], [5, 0], [4, 1], [7, 4], [5, 4], [4, 3]]
            1: [5, 0] => ...
    1: [4, 1] => ...
    2: [6, 5] => ...
    3: [4, 5] => ...
    4: [3, 4] => ...
    5: [3, 2] => ...
    6: [7, 4] => ...
    7: [7, 2] => ...
  2: [5, 2] => ...
  3: [2, 1] => ...
  4: [1, 2] => ...
  5: [4, 5] => ...
  6: [5, 4] => ...
  7: [2, 5] => ...
  8: [1, 4] => ...
  */
  memo = [];
  return moves;
};

const knightMoves = (start, end) => {
  //  shows the shortest possible way to get from one square to another
  //  by outputting all squares the knight will stop on along the way.
  const startX = start[0];
  const startY = start[1];
  const endX = end[0];
  const endY = end[1];

  //  All possible moves need to be generated from the starting location
  //  Board size = 8 x 8
  //  Knight MUST stay on the board
  //    KnightLocation at [-1,2] is off the board
  //    KnightLocation <= [7, 7] && KnightLocation >= [0, 0]
  //  Start is a knight's original location
  //    The starting location will be the root node for a data structure
  //  End is a knight's final location
  //    The location the knight needs to get to from the starting location
  //  Generate an array possible moves from the starting location
  //    At most, there are 8 possible moves from a starting location
  //    At least, there are 2 possible moves from a starting location
  //  The generated possible moves are now new starting locations
  //    Recursively generate all possible from subsequent moves
  //    But until when?
  //    What is the base case?

  const possibleMoves = generatePossibleMoves(startX, startY, endX, endY);
  console.log(possibleMoves);

  // possibleMoves = possibleMoves.map((item) => {
  //   const foo = generatePossibleMoves(item[0], item[1], endX, endY);
  //   return foo;
  // });
  // console.log(possibleMoves);

  possibleMoves.forEach((item) => console.log(item));
  // possibleMoves = possibleMoves.map((item) => {
  //   const foo = generatePossibleMoves(item[0], item[1], endX, endY);
  //   return foo;
  // });
  // console.log(possibleMoves);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);

const adjacencyMatrix = [
  /*
  [0, 1, 2, 3, 4, 5, 6, 7] */
  [0, 0, 0, 0, 0, 0, 1, 0], // 7
  [0, 0, 0, 0, 0, 1, 0, 1], // 6
  [0, 0, 0, 0, 1, 0, 1, 0], // 5
  [0, 0, 0, 1, 0, 1, 0, 0], // 4
  [0, 0, 1, 0, 1, 0, 0, 0], // 3
  [0, 1, 0, 1, 0, 0, 0, 0], // 2
  [1, 0, 1, 0, 0, 0, 0, 0], // 1
  [0, 1, 0, 0, 0, 0, 0, 0], // 0
];

const adjacencyList = [[1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6]];
// knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]
/*

knights legal moves
**O   O**     O   O  
O       O   O**   **O

O*    *O    O      O
 *    *     *      *
 O    O     *O    O*

*/


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
      if (node.value.every((item, i) => item === query[i])) {
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
      string += `( ${node.value} ) -> `;
      if (!node.next) {
        string += `null`;
        break;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxXQUFXO0FBQ3pCLGNBQWMsWUFBWTtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcEtlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTHVEO0FBQ2xCO0FBQ2hCOztBQUVyQixxQkFBcUIsbUVBQVc7O0FBRWhDLHdEQUFJO0FBQ0osMEJBQTBCLHdEQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGVzdC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvYmluYXJ5LXNlYXJjaC10cmVlL2JpbmFyeS1zZWFyY2gtdHJlZS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvYmluYXJ5LXNlYXJjaC10cmVlL21lcmdlLXNvcnQuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2JpbmFyeS1zZWFyY2gtdHJlZS9ub2RlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9rbmlnaHRfdHJhdmFpbHMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2xpbmtlZC1saXN0L2xpbmtlZC1saXN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9saW5rZWQtbGlzdC9ub2RlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBmb250LWZhbWlseTogQXJpYWw7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdURBQXVEO0VBQ3ZELCtCQUErQjtFQUMvQiw0Q0FBMkU7RUFDM0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHNDQUFzQztFQUN0QywrQkFBK0I7RUFDL0Isa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBzcmM6IHVybCguL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0Zik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBmb250LWZhbWlseTogQXJpYWw7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IEljb24gZnJvbSAnLi4vYXNzZXRzL2ljb25zL3NoYXJwX2hvbWUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcmludCgpIHtcbiAgICBjb25zb2xlLmxvZygncHJpbnQoKSBydW5uaW5nIGZyb20gdGVzdC5qcycpO1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0aW5nLi4uJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgZm9vID0gXCJ0ZXN0XCI7XG5cbiAgICBjb25zdCBpY29uID0gbmV3IEltYWdlKCk7XG4gICAgaWNvbi5zcmMgPSBJY29uO1xuICAgIHBhcmFncmFwaC50ZXh0Q29udGVudCA9ICdMb3JlbSBpcHN1bSBzb21ldGhpbmcgc29tZXRoaW5nLi4uJztcblxuICAgIGRpdi5hcHBlbmRDaGlsZChpY29uKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcbiAgICByZXR1cm4gZGl2O1xuICB9LFxufTtcbiIsImltcG9ydCBtZXJnZVNvcnQgZnJvbSAnLi9tZXJnZS1zb3J0JztcbmltcG9ydCBOb2RlIGZyb20gJy4vbm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuICAvLyBBY2NlcHRzIGFuIGFycmF5IHdoZW4gaW5pdGlhbGl6ZWQuXG4gIC8vIFRoZSBUcmVlIGNsYXNzIHNob3VsZCBoYXZlIGEgcm9vdCBhdHRyaWJ1dGUsIHdoaWNoIHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWVcbiAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgdGhpcy5yb290ID0gdGhpcy5idWlsZFRyZWUoYXJyKTtcbiAgfVxuXG4gIHByZXR0eVByaW50ID0gKG5vZGUgPSB0aGlzLnJvb3QsIHByZWZpeCA9ICcnLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQobm9kZS5yaWdodE5vZGUsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilIIgICAnIDogJyAgICAnfWAsIGZhbHNlKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUlOKUgOKUgCAnIDogJ+KUjOKUgOKUgCAnfSR7bm9kZS5kYXRhfWApO1xuICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQobm9kZS5sZWZ0Tm9kZSwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJyAgICAnIDogJ+KUgiAgICd9YCwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gICNzb3J0ZWRBcnJheVRvQlNUID0gKGFyciwgc3RhcnQsIGVuZCkgPT4ge1xuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBtaWRQb2ludCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpO1xuICAgIGNvbnN0IHJvb3ROb2RlID0gbmV3IE5vZGUoYXJyW21pZFBvaW50XSk7XG4gICAgcm9vdE5vZGUubGVmdE5vZGUgPSB0aGlzLiNzb3J0ZWRBcnJheVRvQlNUKGFyciwgc3RhcnQsIG1pZFBvaW50IC0gMSk7XG4gICAgcm9vdE5vZGUucmlnaHROb2RlID0gdGhpcy4jc29ydGVkQXJyYXlUb0JTVChhcnIsIG1pZFBvaW50ICsgMSwgZW5kKTtcbiAgICAvLyBjb25zdCBjaGlsZE5vZGVPbmUgPSBzb3J0ZWRBcnJheVRvQlNUKGFyciwgc3RhcnQsIG1pZFBvaW50IC0gMSk7XG4gICAgLy8gY29uc3QgY2hpbGROb2RlVHdvID0gc29ydGVkQXJyYXlUb0JTVChhcnIsIG1pZFBvaW50ICsgMSwgZW5kKTtcblxuICAgIC8vIGlmIChjaGlsZE5vZGVPbmUpIHtcbiAgICAvLyAgIGlmIChyb290Tm9kZS5kYXRhIDwgY2hpbGROb2RlT25lLmRhdGEpIHtcbiAgICAvLyAgICAgcm9vdE5vZGUucmlnaHROb2RlID0gY2hpbGROb2RlT25lO1xuICAgIC8vICAgfSBlbHNlIGlmIChyb290Tm9kZS5kYXRhID4gY2hpbGROb2RlT25lLmRhdGEpIHtcbiAgICAvLyAgICAgcm9vdE5vZGUubGVmdE5vZGUgPSBjaGlsZE5vZGVPbmU7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUubG9nKHJvb3ROb2RlKTtcbiAgICAvLyBpZiAoY2hpbGROb2RlVHdvKSB7XG4gICAgLy8gICBpZiAocm9vdE5vZGUuZGF0YSA8IGNoaWxkTm9kZVR3by5kYXRhKSB7XG4gICAgLy8gICAgIHJvb3ROb2RlLnJpZ2h0Tm9kZSA9IGNoaWxkTm9kZVR3bztcbiAgICAvLyAgIH0gZWxzZSBpZiAocm9vdE5vZGUuZGF0YSA+IGNoaWxkTm9kZVR3by5kYXRhKSB7XG4gICAgLy8gICAgIHJvb3ROb2RlLmxlZnROb2RlID0gY2hpbGROb2RlVHdvO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIHJldHVybiByb290Tm9kZTtcbiAgfTtcblxuICBidWlsZFRyZWUgPSAoYXJyKSA9PiB7XG4gICAgLy8gVGFrZXMgYW4gYXJyYXkgb2YgZGF0YSAoZS5nLiwgWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0XSlcbiAgICAvLyBUdXJucyBpdCBpbnRvIGEgYmFsYW5jZWQgYmluYXJ5IHRyZWUgZnVsbCBvZiBOb2RlIG9iamVjdHMgYXBwcm9wcmlhdGVseSBwbGFjZWRcbiAgICAvLyAoZG9u4oCZdCBmb3JnZXQgdG8gc29ydCBhbmQgcmVtb3ZlIGR1cGxpY2F0ZXMhKS5cbiAgICAvLyBUaGUgYnVpbGRUcmVlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gdGhlIGxldmVsLTAgcm9vdCBub2RlLlxuICAgIGNvbnN0IHNvcnRlZEFyciA9IG1lcmdlU29ydChhcnIpO1xuICAgIHJldHVybiB0aGlzLiNzb3J0ZWRBcnJheVRvQlNUKHNvcnRlZEFyciwgMCwgc29ydGVkQXJyLmxlbmd0aCAtIDEpO1xuICAgIC8vIHJldHVybiBzb3J0ZWRBcnJheVRvQlNUKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpO1xuICB9O1xuXG4gIGluc2VydE5vZGUgPSAodmFsdWUsIG5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGVzZSBtZXRob2RzIHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBhbmQgbWFuaXB1bGF0ZSB0aGUgbm9kZXMgYW5kIHRoZWlyIGNvbm5lY3Rpb25zLlxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IHVuZGVmaW5lZCcpO1xuICAgIGxldCBuZXdOb2RlID0gbm9kZTtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlKTtcbiAgICAgIGlmICghdGhpcy5yb290KSB0aGlzLnJvb3QgPSBuZXdOb2RlO1xuICAgICAgcmV0dXJuIG5ld05vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZGF0YSA8IHZhbHVlKSB7XG4gICAgICBuZXdOb2RlLnJpZ2h0Tm9kZSA9IHRoaXMuaW5zZXJ0Tm9kZSh2YWx1ZSwgbm9kZS5yaWdodE5vZGUpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5kYXRhID4gdmFsdWUpIHtcbiAgICAgIG5ld05vZGUubGVmdE5vZGUgPSB0aGlzLmluc2VydE5vZGUodmFsdWUsIG5vZGUubGVmdE5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdOb2RlO1xuICAgIC8vIGl0ZXJhdGl2ZSBhcHByb2FjaFxuICAgIC8vIGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSk7XG4gICAgLy8gaWYgKHRoaXMucm9vdCA9PT0gbnVsbCkge1xuICAgIC8vICAgdGhpcy4jc2V0Um9vdChuZXdOb2RlKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgbGV0IG5vZGUgPSB0aGlzLnJvb3Q7XG4gICAgLy8gICB3aGlsZSAobm9kZSkge1xuICAgIC8vICAgICBpZiAobm9kZS5kYXRhIDwgdmFsdWUpIHtcbiAgICAvLyAgICAgICAvLyBnbyByaWdodFxuICAgIC8vICAgICAgIGlmIChub2RlLnJpZ2h0Tm9kZSA9PT0gbnVsbCkge1xuICAgIC8vICAgICAgICAgbm9kZS5yaWdodE5vZGUgPSBuZXdOb2RlO1xuICAgIC8vICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBub2RlID0gbm9kZS5yaWdodE5vZGU7XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSB7XG4gICAgLy8gICAgICAgLy8gZ28gbGVmdFxuICAgIC8vICAgICAgIGlmIChub2RlLmxlZnROb2RlID09PSBudWxsKSB7XG4gICAgLy8gICAgICAgICBub2RlLmxlZnROb2RlID0gbmV3Tm9kZTtcbiAgICAvLyAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgbm9kZSA9IG5vZGUubGVmdE5vZGU7XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIC8vIGR1cGxpY2F0ZSBmb3VuZFxuICAgIC8vICAgICAgIGJyZWFrO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9O1xuXG4gIGZpbmQgPSAodmFsdWUsIG5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyBBY2NlcHRzIGEgdmFsdWUgYW5kIHJldHVybnMgdGhlIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgdW5kZWZpbmVkJyk7XG4gICAgbGV0IG5leHROb2RlID0gbm9kZTtcbiAgICBpZiAobmV4dE5vZGUgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGlmIChuZXh0Tm9kZS5kYXRhID09PSB2YWx1ZSkgcmV0dXJuIG5leHROb2RlO1xuXG4gICAgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuZmluZCh2YWx1ZSwgbm9kZS5sZWZ0Tm9kZSk7XG4gICAgaWYgKG5vZGUuZGF0YSA8IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuZmluZCh2YWx1ZSwgbm9kZS5yaWdodE5vZGUpO1xuICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgfTtcblxuICAjcHJlZGVjZXNzb3IgPSAodmFsdWUsIG5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyByZXR1cm5zIHByZWRlY2Vzc29yIG5vZGUgb2YgZ2l2ZW4gdmFsdWVcbiAgICAvLyBob3cgdG8gcmVmYWN0b3IgdGhpcz9cbiAgICBsZXQgbmV4dE5vZGUgPSBub2RlO1xuICAgIGlmIChuZXh0Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKFxuICAgICAgKG5leHROb2RlLmxlZnROb2RlICYmIG5leHROb2RlLmxlZnROb2RlLmRhdGEgPT09IHZhbHVlKSB8fFxuICAgICAgKG5leHROb2RlLnJpZ2h0Tm9kZSAmJiBuZXh0Tm9kZS5yaWdodE5vZGUuZGF0YSA9PT0gdmFsdWUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmV4dE5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuI3ByZWRlY2Vzc29yKHZhbHVlLCBuZXh0Tm9kZS5sZWZ0Tm9kZSk7XG4gICAgaWYgKG5vZGUuZGF0YSA8IHZhbHVlKSBuZXh0Tm9kZSA9IHRoaXMuI3ByZWRlY2Vzc29yKHZhbHVlLCBuZXh0Tm9kZS5yaWdodE5vZGUpO1xuXG4gICAgcmV0dXJuIG5leHROb2RlO1xuICB9O1xuXG4gIGRlbGV0ZU5vZGUgPSAodmFsdWUpID0+IHtcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGVzZSBtZXRob2RzIHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBhbmQgbWFuaXB1bGF0ZSB0aGUgbm9kZXMgYW5kIHRoZWlyIGNvbm5lY3Rpb25zLlxuICAgIC8vIFRoZXJlIHdpbGwgYmUgc2V2ZXJhbCBjYXNlcyBmb3IgZGVsZXRlLCBzdWNoIGFzIHdoZW4gYSBub2RlIGhhcyBjaGlsZHJlbiBvciBub3QuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgdW5kZWZpbmVkJyk7XG4gICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHRoaXMuZmluZCh2YWx1ZSk7XG4gICAgaWYgKHRhcmdldE5vZGUpIHtcbiAgICAgIGNvbnN0IHsgbGVmdE5vZGUgfSA9IHRhcmdldE5vZGU7XG4gICAgICBjb25zdCB7IHJpZ2h0Tm9kZSB9ID0gdGFyZ2V0Tm9kZTtcbiAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLiNwcmVkZWNlc3Nvcih2YWx1ZSk7XG5cbiAgICAgIGlmIChsZWZ0Tm9kZSAmJiByaWdodE5vZGUpIHtcbiAgICAgICAgLy8gaGFzIDIgY2hpbGRyZW5cbiAgICAgICAgbGV0IHN1Y2Nlc3NvciA9IHJpZ2h0Tm9kZTtcbiAgICAgICAgd2hpbGUgKHN1Y2Nlc3Nvcikge1xuICAgICAgICAgIC8vIGZpbmRzIHN1Y2Nlc3NvclxuICAgICAgICAgIGlmICghc3VjY2Vzc29yLmxlZnROb2RlKSBicmVhaztcbiAgICAgICAgICBzdWNjZXNzb3IgPSBzdWNjZXNzb3IubGVmdE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdWNjZXNzb3JSaWdodE5vZGUgPSBzdWNjZXNzb3IucmlnaHROb2RlO1xuICAgICAgICBjb25zdCBwYXJlbnRTdWNjZXNzb3IgPSB0aGlzLiNwcmVkZWNlc3NvcihzdWNjZXNzb3IuZGF0YSk7XG4gICAgICAgIHBhcmVudFN1Y2Nlc3Nvci5sZWZ0Tm9kZSA9IG51bGw7XG4gICAgICAgIGlmICghc3VjY2Vzc29yLmxlZnROb2RlICYmIHN1Y2Nlc3Nvci5yaWdodE5vZGUpIHtcbiAgICAgICAgICBpZiAocGFyZW50U3VjY2Vzc29yLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBpZiBwYXJlbnRTdWNjZXNzb3IgaXMgdGhlIG5vZGUgdG8gZGVsZXRlXG4gICAgICAgICAgICBzdWNjZXNzb3IucmlnaHROb2RlID0gc3VjY2Vzc29yUmlnaHROb2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRTdWNjZXNzb3IubGVmdE5vZGUgPSBzdWNjZXNzb3JSaWdodE5vZGU7XG4gICAgICAgICAgICBzdWNjZXNzb3IucmlnaHROb2RlID0gcmlnaHROb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3VjY2Vzc29yLmxlZnROb2RlICYmICFzdWNjZXNzb3IucmlnaHROb2RlKSB7XG4gICAgICAgICAgLy8gaWYgc3VjY2Vzc29yIGlzIGEgbGVhZiBub2RlXG4gICAgICAgICAgc3VjY2Vzc29yLnJpZ2h0Tm9kZSA9IHBhcmVudFN1Y2Nlc3Nvci5kYXRhID09PSB2YWx1ZSA/IG51bGwgOiByaWdodE5vZGU7XG4gICAgICAgICAgLy8gaWYgcGFyZW50U3VjY2Vzc29yIGlzIHRoZSBub2RlIHRvIGRlbGV0ZVxuICAgICAgICAgIC8vICBzZXQgdGhlIHN1Y2Nlc3NvcidzIHJpZ2h0Tm9kZSB0byBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBzdWNjZXNzb3IubGVmdE5vZGUgPSBsZWZ0Tm9kZTtcblxuICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodE5vZGUgJiYgcGFyZW50Tm9kZS5yaWdodE5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAvLyBpZiBub2RlIHRvIGRlbGV0ZSBpcyB0byB0aGUgcmlnaHQgb2YgdGhlIHBhcmVudE5vZGVcbiAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Tm9kZSA9IHN1Y2Nlc3NvcjtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJlbnROb2RlLmxlZnROb2RlICYmIHBhcmVudE5vZGUubGVmdE5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAvLyBpZiBub2RlIHRvIGRlbGV0ZSBpcyB0byB0aGUgbGVmdCBvZiB0aGUgcGFyZW50Tm9kZVxuICAgICAgICAgIHBhcmVudE5vZGUubGVmdE5vZGUgPSBzdWNjZXNzb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm9kZSB0byBkZWxldGUgaXMgdGhlIHJvb3Qgbm9kZVxuICAgICAgICAgIHRoaXMucm9vdCA9IHN1Y2Nlc3NvcjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsZWZ0Tm9kZSB8fCByaWdodE5vZGUpIHtcbiAgICAgICAgLy8gbm9kZSB0byBkZWxldGUgaGFzIDEgY2hpbGRcbiAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHROb2RlICYmIHBhcmVudE5vZGUucmlnaHROb2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5yaWdodE5vZGUgPSAhbGVmdE5vZGUgPyByaWdodE5vZGUgOiBsZWZ0Tm9kZTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJlbnROb2RlLmxlZnROb2RlICYmIHBhcmVudE5vZGUubGVmdE5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBwYXJlbnROb2RlLmxlZnROb2RlID0gIXJpZ2h0Tm9kZSA/IGxlZnROb2RlIDogcmlnaHROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm9vdCA9ICFyaWdodE5vZGUgPyBsZWZ0Tm9kZSA6IHJpZ2h0Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAodGhpcy5yb290LmRhdGEgPT09IHZhbHVlKSB0aGlzLnJvb3QgPSAhcmlnaHROb2RlID8gbGVmdE5vZGUgOiByaWdodE5vZGU7XG4gICAgICB9IGVsc2UgaWYgKCFyaWdodE5vZGUgJiYgIWxlZnROb2RlKSB7XG4gICAgICAgIC8vIG5vZGUgdG8gZGVsZXRlIGlzIGEgbGVhZiBub2RlLCBubyBjaGlsZHJlblxuICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodE5vZGUgJiYgcGFyZW50Tm9kZS5yaWdodE5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Tm9kZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyZW50Tm9kZS5sZWZ0Tm9kZSAmJiBwYXJlbnROb2RlLmxlZnROb2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Tm9kZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gKHRoaXMucm9vdC5kYXRhID09PSB2YWx1ZSlcbiAgICAgICAgICB0aGlzLnJvb3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgZG9lcyBub3QgZXhpc3QgaW4gdHJlZS4nKTtcbiAgICB9XG4gIH07XG5cbiAgbGV2ZWxPcmRlciA9IChjYWxsYmFjaywgYXJyID0gW10sIHF1ZXVlID0gW3RoaXMucm9vdF0pID0+IHtcbiAgICAvLyBBY2NlcHRzIGEgcmFuZG9tIE9QVElPTkFMIGNhbGxiYWNrIGZ1bmN0aW9uIGFzIGl0cyBwYXJhbWV0ZXJcbiAgICAvLyBUcmF2ZXJzZSB0aGUgdHJlZSBpbiBicmVhZHRoLWZpcnN0IGxldmVsIG9yZGVyIGFuZCBwcm92aWRlIGVhY2ggbm9kZSBhcyBhbiBhcmd1bWVudCB0byB0aGUgY2FsbGJhY2suXG4gICAgLy8gVGhlIGNhbGxiYWNrIHdpbGwgcGVyZm9ybSBhbiBvcGVyYXRpb24gb24gZWFjaCBub2RlIGZvbGxvd2luZyB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSBhcmUgdHJhdmVyc2VkLlxuICAgIC8vIFRoZSBtZXRob2Qgc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXG4gICAgLy8gWW91IHdpbGwgd2FudCB0byB1c2UgYW4gYXJyYXkgYWN0aW5nIGFzIGEgcXVldWUgdG8ga2VlcCB0cmFjayBvZiBhbGwgdGhlIGNoaWxkIG5vZGVzIHRoYXQgeW91IGhhdmUgeWV0IHRvIHRyYXZlcnNlIGFuZCB0byBhZGQgbmV3IG9uZXMgdG8gdGhlIGxpc3RcbiAgICBpZiAodGhpcy5yb290ID09PSBudWxsIHx8IHF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGFycjtcbiAgICBjb25zdCBkZXF1ZXVlID0gcXVldWUuc2hpZnQoKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKGRlcXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChkZXF1ZXVlLmRhdGEpO1xuICAgIH1cblxuICAgIGlmIChkZXF1ZXVlLmxlZnROb2RlKSBxdWV1ZS5wdXNoKGRlcXVldWUubGVmdE5vZGUpO1xuICAgIGlmIChkZXF1ZXVlLnJpZ2h0Tm9kZSkgcXVldWUucHVzaChkZXF1ZXVlLnJpZ2h0Tm9kZSk7XG5cbiAgICB0aGlzLmxldmVsT3JkZXIoY2FsbGJhY2ssIGFyciwgcXVldWUpO1xuICAgIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcblxuICAgIC8vIGl0ZXJhdGl2ZSBhcHByb2FjaFxuICAgIC8vIGNvbnN0IGFyciA9IFtdO1xuICAgIC8vIGNvbnN0IHF1ZXVlID0gW107XG4gICAgLy8gaWYgKHRoaXMucm9vdCkgcXVldWUucHVzaCh0aGlzLnJvb3QpO1xuICAgIC8vIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgLy8gICBjb25zdCBkZXF1ZXVlID0gcXVldWUuc3BsaWNlKDAsIDEpWzBdO1xuICAgIC8vICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgLy8gICAgIGNhbGxiYWNrKGRlcXVldWUpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgYXJyLnB1c2goZGVxdWV1ZS5kYXRhKTtcbiAgICAvLyAgIH1cbiAgICAvLyAgIGlmIChkZXF1ZXVlLmxlZnROb2RlKSBxdWV1ZS5wdXNoKGRlcXVldWUubGVmdE5vZGUpO1xuICAgIC8vICAgaWYgKGRlcXVldWUucmlnaHROb2RlKSBxdWV1ZS5wdXNoKGRlcXVldWUucmlnaHROb2RlKTtcbiAgICAvLyB9XG4gICAgLy8gcmV0dXJuIGNhbGxiYWNrID8gdW5kZWZpbmVkIDogYXJyO1xuICB9O1xuXG4gIGluT3JkZXIgPSAoY2FsbGJhY2ssIG5vZGUgPSB0aGlzLnJvb3QsIGFyciA9IFtdKSA9PiB7XG4gICAgLy8gbGVmdCA9PiByb290ID0+IHJpZ2h0XG4gICAgLy8gZWxlbWVudHMgb2YgdGhlIGFycmF5IHdpbGwgYmUgaW4gb3JkZXJcbiAgICAvLyBBY2NlcHRzIGEgcmFuZG9tIG9wdGlvbmFsIGNhbGxiYWNrIGFzIGEgcGFyYW1ldGVyLlxuICAgIC8vIFRyYXZlcnNlIHRoZSB0cmVlIGluIHRoZWlyIHJlc3BlY3RpdmUgZGVwdGgtZmlyc3Qgb3JkZXIgYW5kIHlpZWxkIGVhY2ggbm9kZSB0byB0aGUgcHJvdmlkZWQgY2FsbGJhY2suXG4gICAgLy8gUmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cblxuICAgIGlmIChub2RlKSB7XG4gICAgICB0aGlzLmluT3JkZXIoY2FsbGJhY2ssIG5vZGUubGVmdE5vZGUsIGFycik7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChub2RlLmRhdGEpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbk9yZGVyKGNhbGxiYWNrLCBub2RlLnJpZ2h0Tm9kZSwgYXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FsbGJhY2sgPyB1bmRlZmluZWQgOiBhcnI7XG4gIH07XG5cbiAgcHJlT3JkZXIgPSAoY2FsbGJhY2ssIG5vZGUgPSB0aGlzLnJvb3QsIGFyciA9IFtdKSA9PiB7XG4gICAgLy8gcm9vdCA9PiBsZWZ0ID0+IHJpZ2h0XG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBvcHRpb25hbCBjYWxsYmFjayBhcyBhIHBhcmFtZXRlci5cbiAgICAvLyBUcmF2ZXJzZSB0aGUgdHJlZSBpbiB0aGVpciByZXNwZWN0aXZlIGRlcHRoLWZpcnN0IG9yZGVyIGFuZCB5aWVsZCBlYWNoIG5vZGUgdG8gdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuICAgIC8vIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2gobm9kZS5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmVPcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0Tm9kZSwgYXJyKTtcbiAgICAgIHRoaXMucHJlT3JkZXIoY2FsbGJhY2ssIG5vZGUucmlnaHROb2RlLCBhcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcbiAgfTtcblxuICBwb3N0T3JkZXIgPSAoY2FsbGJhY2ssIG5vZGUgPSB0aGlzLnJvb3QsIGFyciA9IFtdKSA9PiB7XG4gICAgLy8gbGVmdCA9PiByaWdodCA9PiByb290XG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBvcHRpb25hbCBjYWxsYmFjayBhcyBhIHBhcmFtZXRlci5cbiAgICAvLyBUcmF2ZXJzZSB0aGUgdHJlZSBpbiB0aGVpciByZXNwZWN0aXZlIGRlcHRoLWZpcnN0IG9yZGVyIGFuZCB5aWVsZCBlYWNoIG5vZGUgdG8gdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuICAgIC8vIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgdGhpcy5wb3N0T3JkZXIoY2FsbGJhY2ssIG5vZGUubGVmdE5vZGUsIGFycik7XG4gICAgICB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodE5vZGUsIGFycik7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChub2RlLmRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcbiAgfTtcblxuICBoZWlnaHQgPSAobm9kZSkgPT4ge1xuICAgIC8vIEFjY2VwdHMgYSBub2RlIGFuZCByZXR1cm5zIGl0cyBoZWlnaHQuXG4gICAgLy8gSGVpZ2h0IGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBpbiB0aGUgbG9uZ2VzdCBwYXRoIGZyb20gYSBnaXZlbiBub2RlIHRvIGEgbGVhZiBub2RlLlxuICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gLTE7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm4gbmV3IEVycm9yKCdJbmNvcnJlY3QgcGFyYW1ldGVyIHR5cGUuJyk7XG5cbiAgICBjb25zdCBsZWZ0Tm9kZUhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdE5vZGUpO1xuICAgIGNvbnN0IHJpZ2h0Tm9kZUhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHROb2RlKTtcblxuICAgIHJldHVybiBNYXRoLm1heChsZWZ0Tm9kZUhlaWdodCwgcmlnaHROb2RlSGVpZ2h0KSArIDE7XG4gIH07XG5cbiAgZGVwdGggPSAobm9kZSwgbmV4dE5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyBBY2NlcHRzIGEgbm9kZSBhbmQgcmV0dXJucyBpdHMgZGVwdGguXG4gICAgLy8gRGVwdGggaXMgZGVmaW5lZCBhcyB0aGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBwYXRoIGZyb20gYSBnaXZlbiBub2RlIHRvIHRoZSB0cmVl4oCZcyByb290IG5vZGUuXG4gICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkIHBhcmFtZXRlci4nKTtcbiAgICBpZiAobmV4dE5vZGUuZGF0YSA9PT0gbm9kZS5kYXRhKSByZXR1cm4gMDtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTm9kZSkpIHJldHVybiBuZXcgRXJyb3IoJ0luY29ycmVjdCBwYXJhbWV0ZXIgdHlwZS4nKTtcbiAgICBsZXQgZGVwdGhOdW0gPSAwO1xuICAgIGlmIChub2RlLmRhdGEgPCBuZXh0Tm9kZS5kYXRhKSBkZXB0aE51bSA9IHRoaXMuZGVwdGgobm9kZSwgbmV4dE5vZGUubGVmdE5vZGUpICsgMTtcbiAgICBpZiAobm9kZS5kYXRhID4gbmV4dE5vZGUuZGF0YSkgZGVwdGhOdW0gPSB0aGlzLmRlcHRoKG5vZGUsIG5leHROb2RlLnJpZ2h0Tm9kZSkgKyAxO1xuXG4gICAgcmV0dXJuIGRlcHRoTnVtO1xuICB9O1xuXG4gIGlzQmFsYW5jZWQgPSAobm9kZSA9IHRoaXMucm9vdCkgPT4ge1xuICAgIC8vIENoZWNrcyBpZiB0aGUgdHJlZSBpcyBiYWxhbmNlZC5cbiAgICAvLyBBIGJhbGFuY2VkIHRyZWUgaXMgb25lIHdoZXJlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gaGVpZ2h0cyBvZiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgLy8gYW5kIHRoZSByaWdodCBzdWJ0cmVlIG9mIGV2ZXJ5IG5vZGUgaXMgbm90IG1vcmUgdGhhbiAxLlxuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgbGVmdFN1YnRyZWVIZWlnaHQgPSB0aGlzLmhlaWdodChub2RlLmxlZnROb2RlKTtcbiAgICBjb25zdCByaWdodFN1YnRyZWVIZWlnaHQgPSB0aGlzLmhlaWdodChub2RlLnJpZ2h0Tm9kZSk7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IGxlZnRTdWJ0cmVlSGVpZ2h0IC0gcmlnaHRTdWJ0cmVlSGVpZ2h0O1xuICAgIGlmIChkaWZmZXJlbmNlIDw9IDEgJiYgZGlmZmVyZW5jZSA+PSAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNCYWxhbmNlZChub2RlLmxlZnROb2RlKSAmJiB0aGlzLmlzQmFsYW5jZWQobm9kZS5yaWdodE5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmViYWxhbmNlID0gKCkgPT4ge1xuICAgIC8vIFJlYmFsYW5jZXMgYW4gdW5iYWxhbmNlZCB0cmVlLlxuICAgIC8vIFlvdeKAmWxsIHdhbnQgdG8gdXNlIGEgdHJhdmVyc2FsIG1ldGhvZCB0byBwcm92aWRlIGEgbmV3IGFycmF5IHRvIHRoZSBidWlsZFRyZWUgZnVuY3Rpb24uXG4gICAgaWYgKCF0aGlzLmlzQmFsYW5jZWQoKSkge1xuICAgICAgY29uc3Qgc29ydGVkQXJyYXkgPSB0aGlzLmluT3JkZXIoKTtcbiAgICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKHNvcnRlZEFycmF5KTtcbiAgICB9XG4gIH07XG59XG4iLCJjb25zdCBtZXJnZVNvcnQgPSAoYXJyKSA9PiB7XG4gIGlmIChhcnIubGVuZ3RoIDw9IDEpIHJldHVybiBhcnI7XG4gIGNvbnN0IG1pZFBvaW50ID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMik7XG5cbiAgY29uc3QgbGVmdCA9IGFyci5zbGljZSgwLCBtaWRQb2ludCk7XG4gIGNvbnN0IHJpZ2h0ID0gYXJyLnNsaWNlKG1pZFBvaW50KTtcbiAgY29uc3Qgc29ydGVkTGVmdCA9IG1lcmdlU29ydChsZWZ0KTtcbiAgY29uc3Qgc29ydGVkUmlnaHQgPSBtZXJnZVNvcnQocmlnaHQpO1xuICBjb25zdCBzb3J0ZWRBcnIgPSBbXTtcblxuICBsZXQgaSA9IDA7XG4gIGxldCBqID0gMDtcbiAgbGV0IGsgPSAwO1xuXG4gIHdoaWxlIChpIDwgc29ydGVkTGVmdC5sZW5ndGggJiYgaiA8IHNvcnRlZFJpZ2h0Lmxlbmd0aCkge1xuICAgIGlmIChzb3J0ZWRMZWZ0W2ldIDwgc29ydGVkUmlnaHRbal0pIHtcbiAgICAgIHNvcnRlZEFycltrXSA9IHNvcnRlZExlZnRbaV07XG4gICAgICBpICs9IDE7XG4gICAgfSBlbHNlIGlmIChzb3J0ZWRMZWZ0W2ldID4gc29ydGVkUmlnaHRbal0pIHtcbiAgICAgIHNvcnRlZEFycltrXSA9IHNvcnRlZFJpZ2h0W2pdO1xuICAgICAgaiArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRSaWdodFtqXTtcbiAgICAgIGkgKz0gMTtcbiAgICAgIGogKz0gMTtcbiAgICB9XG4gICAgayArPSAxO1xuICB9XG5cbiAgZm9yICg7IGkgPCBzb3J0ZWRMZWZ0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgc29ydGVkQXJyW2tdID0gc29ydGVkTGVmdFtpXTtcbiAgICBrICs9IDE7XG4gIH1cblxuICBmb3IgKDsgaiA8IHNvcnRlZFJpZ2h0Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgc29ydGVkQXJyW2tdID0gc29ydGVkUmlnaHRbal07XG4gICAgayArPSAxO1xuICB9XG5cbiAgcmV0dXJuIHNvcnRlZEFycjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlU29ydDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5sZWZ0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5yaWdodE5vZGUgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgIT09IG51bGwgPyBkYXRhIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IExpbmtlZExpc3QgZnJvbSAnLi9saW5rZWQtbGlzdC9saW5rZWQtbGlzdCc7XG5pbXBvcnQgVHJlZSBmcm9tICcuL2JpbmFyeS1zZWFyY2gtdHJlZS9iaW5hcnktc2VhcmNoLXRyZWUnO1xuLypcbkl0cyBiYXNpYyBtb3ZlIGlzIHR3byBzdGVwcyBmb3J3YXJkIGFuZCBvbmUgc3RlcCB0byB0aGUgc2lkZVxub3Igb25lIHN0ZXAgZm9yd2FyZCBhbmQgdHdvIHN0ZXBzIHRvIHRoZSBzaWRlLiBJdCBjYW4gZmFjZSBhbnkgZGlyZWN0aW9uLlxuXG5Zb3UgY2FuIHRoaW5rIG9mIHRoZSBib2FyZCBhcyBoYXZpbmcgMi1kaW1lbnNpb25hbCBjb29yZGluYXRlcy5cbllvdXIgZnVuY3Rpb24gd291bGQgdGhlcmVmb3JlIGxvb2sgbGlrZTpcbmtuaWdodE1vdmVzKFswLDBdLFsxLDJdKSA9PSBbWzAsMF0sWzEsMl1dXG5cbjEuIFRoaW5rIGFib3V0IHRoZSBydWxlcyBvZiB0aGUgYm9hcmQgYW5kIGtuaWdodCwgYW5kIG1ha2Ugc3VyZSB0byBmb2xsb3cgdGhlbS5cbjIuIEZvciBldmVyeSBzcXVhcmUgdGhlcmUgaXMgYSBudW1iZXIgb2YgcG9zc2libGUgbW92ZXMsXG5jaG9vc2UgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IHdpbGwgYWxsb3cgeW91IHRvIHdvcmsgd2l0aCB0aGVtLlxuRG9u4oCZdCBhbGxvdyBhbnkgbW92ZXMgdG8gZ28gb2ZmIHRoZSBib2FyZC5cbjMuIERlY2lkZSB3aGljaCBzZWFyY2ggYWxnb3JpdGhtIGlzIGJlc3QgdG8gdXNlIGZvciB0aGlzIGNhc2UuXG5IaW50OiBvbmUgb2YgdGhlbSBjb3VsZCBiZSBhIHBvdGVudGlhbGx5IGluZmluaXRlIHNlcmllcy5cbjQuIFVzZSB0aGUgY2hvc2VuIHNlYXJjaCBhbGdvcml0aG0gdG8gZmluZCB0aGUgc2hvcnRlc3QgcGF0aCBiZXR3ZWVuIFxudGhlIHN0YXJ0aW5nIHNxdWFyZSAob3Igbm9kZSkgYW5kIHRoZSBlbmRpbmcgc3F1YXJlLlxuT3V0cHV0IHdoYXQgdGhhdCBmdWxsIHBhdGggbG9va3MgbGlrZSwgZS5nLjpcbj4ga25pZ2h0TW92ZXMoWzMsM10sWzQsM10pXG4gID0+IFlvdSBtYWRlIGl0IGluIDMgbW92ZXMhICBIZXJlJ3MgeW91ciBwYXRoOlxuICAgIFszLDNdXG4gICAgWzQsNV1cbiAgICBbMiw0XVxuICAgIFs0LDNdXG4qL1xuY29uc3QgY2hlY2tBcmd1bWVudHMgPSAoc3RhcnQsIGVuZCkgPT4ge1xuICAvLyAgbmVlZCB0byBjaGVjayBpZiBhcmd1bWVudHMgYXJlIGFycmF5IHR5cGVzXG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcigpO1xuICBpZiAoIXN0YXJ0ICYmICFlbmQpIHtcbiAgICBlcnIubWVzc2FnZSA9ICdVbmRlZmluZWQgYXJndW1lbnRzLic7XG4gIH0gZWxzZSBpZiAoIXN0YXJ0ICYmIGVuZCkge1xuICAgIGVyci5tZXNzYWdlID0gJ1VuZGVmaW5lZCBzdGFydCBhcmd1bWVudC4nO1xuICB9IGVsc2UgaWYgKHN0YXJ0ICYmICFlbmQpIHtcbiAgICBlcnIubWVzc2FnZSA9ICdVbmRlZmluZWQgZW5kIGFyZ3VtZW50Lic7XG4gIH1cblxuICBpZiAoZXJyLm1lc3NhZ2UpIHRocm93IGVycjtcbn07XG5cbmNvbnN0IG1vdmUgPSAoc3RhcnQsIGNvdW50LCBkaXJlY3Rpb24pID0+IHtcbiAgLy8gIHdoYXQgaWYga25pZ2h0IGdvZXMgb2ZmIHRoZSBib2FyZD9cbiAgLy8gIGtuaWdodCBjYW4gbW92ZSAxIG9yIDIgc3F1YXJlcyBsZWZ0L3VwIG9yIHJpZ2h0L2Rvd25cbiAgLy8gIGNvdW50IGRlZmluZXMgaG93IG1hbnkgc3F1YXJlcyB0aGUga25pZ2h0IHdpbGwgbW92ZSBob3Jpem9udGFsbHkvdmVydGljYWxseVxuICAvLyAgZGlyZWN0aW9uIGRlZmluZXMgd2hpY2ggZGlyZWN0aW9uIHRoZSBrbmlnaHQgd2lsbCBtb3ZlLCBsZWZ0L3VwIG9yIHJpZ2h0L2Rvd25cbiAgbGV0IHUgPSBzdGFydDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSArPSAxKSB7XG4gICAgdSA9IGRpcmVjdGlvbiA/ICh1ICs9IDEpIDogKHUgLT0gMSk7XG4gIH1cbiAgaWYgKHUgPCAwIHx8IHUgPiA3KSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHU7XG59O1xuXG5sZXQgbWVtbyA9IFtdO1xuXG5jb25zdCBnZW5lcmF0ZVBvc3NpYmxlTW92ZXMgPSAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpID0+IHtcbiAgLy8gICBnZW5lcmF0ZXMgYWxsIGxlZ2FsIG1vdmVzIGZvciBhIGtuaWdodFxuICAvLyAgIGhvdyB0byBnZXQgYWxsIHBvc3NpYmxlIG1vdmVzIGZyb20gW3N0YXJ0WCwgc3RhcnRZXSB0byBbZW5kWCwgZW5kWV0/XG4gIC8vICAgaWdub3JlIGFscmVhZHkgdmlzaXRlZCBzcXVhcmVzP1xuICAvLyAgIHJlY3Vyc2l2ZSBmdW5jdGlvbj9cbiAgY29uc29sZS5sb2coYHN0YXJ0WDogJHtzdGFydFh9LCBzdGFydFk6ICR7c3RhcnRZfWApO1xuXG4gIC8vIGNyZWF0ZSBhIG5vZGUgZm9yIHN0YXJ0WC1zdGFydFk/XG4gIC8vIHdpdGggYSBwb3NzaWJsZU1vdmVzIHByb3BlcnR5P1xuICAvLyBjb25zb2xlLmxvZyhtZW1vLmZpbmQoKGl0ZW0pID0+IGl0ZW0uc3RhcnRYID09PSBzdGFydFggJiYgaXRlbS5zdGFydFkgPT09IHN0YXJ0WSkpO1xuICBpZiAobWVtby5maW5kKChpdGVtKSA9PiBpdGVtLnN0YXJ0WCA9PT0gc3RhcnRYICYmIGl0ZW0uc3RhcnRZID09PSBzdGFydFkpKSByZXR1cm4gW107XG4gIGNvbnN0IG9iaiA9IHsgc3RhcnRYLCBzdGFydFkgfTtcbiAgLy8gaWYgKHN0YXJ0WCA9PT0gZW5kWCAmJiBzdGFydFkgPT09IGVuZFkpIHJldHVybiBbXTtcbiAgLy8gaWYgKChzdGFydFggPT09IG51bGwgJiYgc3RhcnRZID09PSBudWxsKSB8fCAoc3RhcnRYID09PSB1bmRlZmluZWQgJiYgc3RhcnRZID09PSB1bmRlZmluZWQpKVxuICAvLyAgIHJldHVybiBbXTtcbiAgLy8gY29uc29sZS50YWJsZShtZW1vKTtcbiAgLy8gaWYgKG1lbW8uZmluZCgoaXRlbSkgPT4gaXRlbVswXSA9PT0gc3RhcnRYICYmIGl0ZW1bMV0gPT09IHN0YXJ0WSkpIHJldHVybiBwb3NzaWJsZU1vdmVzO1xuXG4gIGxldCBtb3ZlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSArPSAxKSB7XG4gICAgLy8gIHZlcnRpY2FsIGFuZCBob3Jpem9udGFsIG1vdmVzXG4gICAgLy8gIG1vdmVzIDEtMiBzcXVhcmVzIGxlZnQvdXAgb3IgcmlnaHQvZG93blxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMjsgaiArPSAxKSB7XG4gICAgICBjb25zdCB2ZXJ0RGlyID0gaSAlIDIgIT09IDA7IC8vIHRydWUgPT4gdXAsIGZhbHNlID0+IGRvd25cbiAgICAgIGNvbnN0IGhvckRpciA9IGogJSAyID09PSAwOyAvLyB0cnVlID0+IHJpZ2h0LCBmYWxzZSA9PiBsZWZ0XG4gICAgICBjb25zdCBuZXdNb3ZlViA9IFttb3ZlKHN0YXJ0WCwgMSwgaG9yRGlyKSwgbW92ZShzdGFydFksIDIsIHZlcnREaXIpXTtcbiAgICAgIGNvbnN0IG5ld01vdmVIID0gW21vdmUoc3RhcnRYLCAyLCBob3JEaXIpLCBtb3ZlKHN0YXJ0WSwgMSwgdmVydERpcildO1xuICAgICAgLy8gaWYgbmV3TW92ZVYgb3IgbmV3TW92ZUggZXhpc3RzIGluIG1lbW9cbiAgICAgIC8vICBkbyBub3QgcHVzaCBpdCBpbnRvIG1vdmVzXG4gICAgICAvLyBjb25zdCB0ZXN0QSA9IG1lbW8uZmluZCgoaXRlbSkgPT4gaXRlbVswXSA9PT0gbmV3TW92ZVZbMF0gJiYgaXRlbVsxXSA9PT0gbmV3TW92ZVZbMV0pO1xuICAgICAgLy8gY29uc3QgdGVzdEIgPSBtZW1vLmZpbmQoKGl0ZW0pID0+IGl0ZW1bMF0gPT09IG5ld01vdmVIWzBdICYmIGl0ZW1bMV0gPT09IG5ld01vdmVIWzFdKTtcblxuICAgICAgaWYgKG5ld01vdmVWLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ICE9PSBudWxsKSkge1xuICAgICAgICBtb3Zlcy5wdXNoKG5ld01vdmVWKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdNb3ZlSC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCAhPT0gbnVsbCkpIHtcbiAgICAgICAgbW92ZXMucHVzaChuZXdNb3ZlSCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc29sZS5sb2cobW92ZXMpO1xuICBvYmoucG9zc2libGVfbW92ZXMgPSBtb3ZlcztcbiAgbWVtby5wdXNoKG9iaik7XG4gIGNvbnNvbGUubG9nKG9iaik7XG4gIC8vIG5lZWQgdG8gZ2VuZXJhdGUgcG9zc2libGUgbW92ZXMgZm9yIGVhY2ggcG9zc2libGUgbW92ZVxuICBtb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKGl0ZW1bMF0sIGl0ZW1bMV0sIGVuZFgsIGVuZFkpO1xuICB9KTtcbiAgLypcbiAga25pZ2h0TW92ZXMoWzMsIDNdLFswLCAwXSlcbiAgMDogWzMsIDNdID0+IFtbNCwgMV0sIFs1LCAyXSwgWzIsIDFdLCBbMSwgMl0sIFs0LCA1XSwgWzUsIDRdLCBbMiwgNV0sIFsxLCA0XV1cbiAgMTogWzQsIDFdID0+IFtbNiwgMF0sIFsyLCAwXSwgWzUsIDNdLCBbNiwgMl0sIFszLCAzXSwgWzIsIDJdXVxuICAgIDA6IFs2LCAwXSA9PiBbWzcsIDJdLCBbNSwgMl0sIFs0LCAxXV1cbiAgICAgIDA6IFs3LCAyXSA9PiBbWzYsIDBdLCBbNSwgMV0sIFs2LCA0XSwgWzUsIDNdXVxuICAgICAgICAwOiBbNiwgMF0gPT4gW11cbiAgICAgICAgMTogWzUsIDFdID0+IFtbNywgMF0sIFszLCAwXSwgWzYsIDNdLCBbNywgMl0sIFs0LCAzXSwgWzMsIDJdXVxuICAgICAgICAgIDA6IFs3LCAwXSA9PiBbWzYsIDJdLCBbNSwgMV1dXG4gICAgICAgICAgICAwOiBbNiwgMl0gPT4gW1s3LCAwXSwgWzUsIDBdLCBbNCwgMV0sIFs3LCA0XSwgWzUsIDRdLCBbNCwgM11dXG4gICAgICAgICAgICAxOiBbNSwgMF0gPT4gLi4uXG4gICAgMTogWzQsIDFdID0+IC4uLlxuICAgIDI6IFs2LCA1XSA9PiAuLi5cbiAgICAzOiBbNCwgNV0gPT4gLi4uXG4gICAgNDogWzMsIDRdID0+IC4uLlxuICAgIDU6IFszLCAyXSA9PiAuLi5cbiAgICA2OiBbNywgNF0gPT4gLi4uXG4gICAgNzogWzcsIDJdID0+IC4uLlxuICAyOiBbNSwgMl0gPT4gLi4uXG4gIDM6IFsyLCAxXSA9PiAuLi5cbiAgNDogWzEsIDJdID0+IC4uLlxuICA1OiBbNCwgNV0gPT4gLi4uXG4gIDY6IFs1LCA0XSA9PiAuLi5cbiAgNzogWzIsIDVdID0+IC4uLlxuICA4OiBbMSwgNF0gPT4gLi4uXG4gICovXG4gIG1lbW8gPSBbXTtcbiAgcmV0dXJuIG1vdmVzO1xufTtcblxuY29uc3Qga25pZ2h0TW92ZXMgPSAoc3RhcnQsIGVuZCkgPT4ge1xuICAvLyAgc2hvd3MgdGhlIHNob3J0ZXN0IHBvc3NpYmxlIHdheSB0byBnZXQgZnJvbSBvbmUgc3F1YXJlIHRvIGFub3RoZXJcbiAgLy8gIGJ5IG91dHB1dHRpbmcgYWxsIHNxdWFyZXMgdGhlIGtuaWdodCB3aWxsIHN0b3Agb24gYWxvbmcgdGhlIHdheS5cbiAgY29uc3Qgc3RhcnRYID0gc3RhcnRbMF07XG4gIGNvbnN0IHN0YXJ0WSA9IHN0YXJ0WzFdO1xuICBjb25zdCBlbmRYID0gZW5kWzBdO1xuICBjb25zdCBlbmRZID0gZW5kWzFdO1xuXG4gIC8vICBBbGwgcG9zc2libGUgbW92ZXMgbmVlZCB0byBiZSBnZW5lcmF0ZWQgZnJvbSB0aGUgc3RhcnRpbmcgbG9jYXRpb25cbiAgLy8gIEJvYXJkIHNpemUgPSA4IHggOFxuICAvLyAgS25pZ2h0IE1VU1Qgc3RheSBvbiB0aGUgYm9hcmRcbiAgLy8gICAgS25pZ2h0TG9jYXRpb24gYXQgWy0xLDJdIGlzIG9mZiB0aGUgYm9hcmRcbiAgLy8gICAgS25pZ2h0TG9jYXRpb24gPD0gWzcsIDddICYmIEtuaWdodExvY2F0aW9uID49IFswLCAwXVxuICAvLyAgU3RhcnQgaXMgYSBrbmlnaHQncyBvcmlnaW5hbCBsb2NhdGlvblxuICAvLyAgICBUaGUgc3RhcnRpbmcgbG9jYXRpb24gd2lsbCBiZSB0aGUgcm9vdCBub2RlIGZvciBhIGRhdGEgc3RydWN0dXJlXG4gIC8vICBFbmQgaXMgYSBrbmlnaHQncyBmaW5hbCBsb2NhdGlvblxuICAvLyAgICBUaGUgbG9jYXRpb24gdGhlIGtuaWdodCBuZWVkcyB0byBnZXQgdG8gZnJvbSB0aGUgc3RhcnRpbmcgbG9jYXRpb25cbiAgLy8gIEdlbmVyYXRlIGFuIGFycmF5IHBvc3NpYmxlIG1vdmVzIGZyb20gdGhlIHN0YXJ0aW5nIGxvY2F0aW9uXG4gIC8vICAgIEF0IG1vc3QsIHRoZXJlIGFyZSA4IHBvc3NpYmxlIG1vdmVzIGZyb20gYSBzdGFydGluZyBsb2NhdGlvblxuICAvLyAgICBBdCBsZWFzdCwgdGhlcmUgYXJlIDIgcG9zc2libGUgbW92ZXMgZnJvbSBhIHN0YXJ0aW5nIGxvY2F0aW9uXG4gIC8vICBUaGUgZ2VuZXJhdGVkIHBvc3NpYmxlIG1vdmVzIGFyZSBub3cgbmV3IHN0YXJ0aW5nIGxvY2F0aW9uc1xuICAvLyAgICBSZWN1cnNpdmVseSBnZW5lcmF0ZSBhbGwgcG9zc2libGUgZnJvbSBzdWJzZXF1ZW50IG1vdmVzXG4gIC8vICAgIEJ1dCB1bnRpbCB3aGVuP1xuICAvLyAgICBXaGF0IGlzIHRoZSBiYXNlIGNhc2U/XG5cbiAgY29uc3QgcG9zc2libGVNb3ZlcyA9IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSk7XG4gIGNvbnNvbGUubG9nKHBvc3NpYmxlTW92ZXMpO1xuXG4gIC8vIHBvc3NpYmxlTW92ZXMgPSBwb3NzaWJsZU1vdmVzLm1hcCgoaXRlbSkgPT4ge1xuICAvLyAgIGNvbnN0IGZvbyA9IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhpdGVtWzBdLCBpdGVtWzFdLCBlbmRYLCBlbmRZKTtcbiAgLy8gICByZXR1cm4gZm9vO1xuICAvLyB9KTtcbiAgLy8gY29uc29sZS5sb2cocG9zc2libGVNb3Zlcyk7XG5cbiAgcG9zc2libGVNb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiBjb25zb2xlLmxvZyhpdGVtKSk7XG4gIC8vIHBvc3NpYmxlTW92ZXMgPSBwb3NzaWJsZU1vdmVzLm1hcCgoaXRlbSkgPT4ge1xuICAvLyAgIGNvbnN0IGZvbyA9IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhpdGVtWzBdLCBpdGVtWzFdLCBlbmRYLCBlbmRZKTtcbiAgLy8gICByZXR1cm4gZm9vO1xuICAvLyB9KTtcbiAgLy8gY29uc29sZS5sb2cocG9zc2libGVNb3Zlcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrbmlnaHRNb3ZlcztcblxuY29uc3QgYWRqYWNlbmN5TWF0cml4ID0gW1xuICAvKlxuICBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN10gKi9cbiAgWzAsIDAsIDAsIDAsIDAsIDAsIDEsIDBdLCAvLyA3XG4gIFswLCAwLCAwLCAwLCAwLCAxLCAwLCAxXSwgLy8gNlxuICBbMCwgMCwgMCwgMCwgMSwgMCwgMSwgMF0sIC8vIDVcbiAgWzAsIDAsIDAsIDEsIDAsIDEsIDAsIDBdLCAvLyA0XG4gIFswLCAwLCAxLCAwLCAxLCAwLCAwLCAwXSwgLy8gM1xuICBbMCwgMSwgMCwgMSwgMCwgMCwgMCwgMF0sIC8vIDJcbiAgWzEsIDAsIDEsIDAsIDAsIDAsIDAsIDBdLCAvLyAxXG4gIFswLCAxLCAwLCAwLCAwLCAwLCAwLCAwXSwgLy8gMFxuXTtcblxuY29uc3QgYWRqYWNlbmN5TGlzdCA9IFtbMV0sIFswLCAyXSwgWzEsIDNdLCBbMiwgNF0sIFszLCA1XSwgWzQsIDZdLCBbNSwgN10sIFs2XV07XG4vLyBrbmlnaHRNb3ZlcyhbMCwwXSxbNyw3XSkgPT0gW1swLDBdLFsyLDFdLFs0LDJdLFs2LDNdLFs0LDRdLFs2LDVdLFs3LDddXVxuLypcblxua25pZ2h0cyBsZWdhbCBtb3Zlc1xuKipPICAgTyoqICAgICBPICAgTyAgXG5PICAgICAgIE8gICBPKiogICAqKk9cblxuTyogICAgKk8gICAgTyAgICAgIE9cbiAqICAgICogICAgICogICAgICAqXG4gTyAgICBPICAgICAqTyAgICBPKlxuXG4qL1xuIiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkTGlzdCB7XG4gICNoZWFkID0gbnVsbDtcblxuICAjdGFpbCA9IG51bGw7XG5cbiAgI3NpemUgPSAwO1xuXG4gIGFwcGVuZCh2YWx1ZSkge1xuICAgIC8vIGFkZHMgYSBuZXcgbm9kZSBjb250YWluaW5nIHZhbHVlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICBjb25zdCBub2RlID0gbmV3IE5vZGUodmFsdWUpO1xuICAgIGlmICh0aGlzLiNzaXplID09PSAwKSB7XG4gICAgICB0aGlzLiNoZWFkID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG1wID0gdGhpcy4jdGFpbDtcbiAgICAgIHRtcC5uZXh0ID0gbm9kZTtcbiAgICB9XG4gICAgdGhpcy4jdGFpbCA9IG5vZGU7XG4gICAgdGhpcy4jc2l6ZSArPSAxO1xuICB9XG5cbiAgcHJlcGVuZCh2YWx1ZSkge1xuICAgIC8vIGFkZHMgYSBuZXcgbm9kZSBjb250YWluaW5nIHZhbHVlIHRvIHRoZSBzdGFydCBvZiB0aGUgbGlzdFxuICAgIGNvbnN0IHRtcCA9IHRoaXMuI2hlYWQ7XG4gICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLCB0bXApO1xuICAgIHRoaXMuI2hlYWQgPSBuZXdOb2RlO1xuICAgIGlmICh0aGlzLiNzaXplID09PSAwKSB0aGlzLiN0YWlsID0gbmV3Tm9kZTtcbiAgICB0aGlzLiNzaXplICs9IDE7XG4gIH1cblxuICBzaXplKCkge1xuICAgIC8vIHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiBub2RlcyBpbiB0aGUgbGlzdFxuICAgIHJldHVybiB0aGlzLiNzaXplO1xuICB9XG5cbiAgaGVhZCgpIHtcbiAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI2hlYWQ7XG4gIH1cblxuICB0YWlsKCkge1xuICAgIC8vIHJldHVybnMgdGhlIGxhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgIHJldHVybiB0aGlzLiN0YWlsO1xuICB9XG5cbiAgYXRJbmRleChuKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgbm9kZSBhdCB0aGUgZ2l2ZW4gaW5kZXhcbiAgICBsZXQgbm9kZSA9ICF0aGlzLiNoZWFkID8gJ0xpbmtlZCBMaXN0IGlzIGVtcHR5JyA6IHRoaXMuI2hlYWQ7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKGluZGV4ID09PSBuKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICghbm9kZS5uZXh0KSB7XG4gICAgICAgIG5vZGUgPSBgTm8gbm9kZSBmb3VuZCBhdCBpbmRleCAke259YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgaW5kZXggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgLy8gcmVtb3ZlcyB0aGUgbGFzdCBlbGVtZW50IGZyb20gdGhlIGxpc3RcbiAgICBpZiAodGhpcy4jc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLiNzaXplID4gMSkge1xuICAgICAgICBjb25zdCBiZWZvcmVMYXN0ID0gdGhpcy5hdEluZGV4KHRoaXMuI3NpemUgLSAyKTtcbiAgICAgICAgYmVmb3JlTGFzdC5uZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy4jdGFpbCA9IGJlZm9yZUxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiN0YWlsID0gbnVsbDtcbiAgICAgICAgdGhpcy4jaGVhZCA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmF0SW5kZXgoMCk7XG4gICAgICB9XG4gICAgICB0aGlzLiNzaXplIC09IDE7XG4gICAgfVxuICB9XG5cbiAgY29udGFpbnMocXVlcnkpIHtcbiAgICAvLyByZXR1cm5zIHRydWUgaWYgdGhlIHBhc3NlZCBpbiB2YWx1ZSBpcyBpbiB0aGUgbGlzdCBhbmQgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gICAgcmV0dXJuIHRoaXMuZmluZChxdWVyeSkgIT09IG51bGw7XG4gIH1cblxuICBmaW5kKHF1ZXJ5KSB7XG4gICAgLy8gcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG5vZGUgY29udGFpbmluZyB2YWx1ZSwgb3IgbnVsbCBpZiBub3QgZm91bmRcbiAgICBsZXQgbm9kZSA9IHRoaXMuI2hlYWQ7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKG5vZGUudmFsdWUuZXZlcnkoKGl0ZW0sIGkpID0+IGl0ZW0gPT09IHF1ZXJ5W2ldKSkge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG5cbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIC8vIHJlcHJlc2VudHMgeW91ciBMaW5rZWRMaXN0IG9iamVjdHMgYXMgc3RyaW5ncyxcbiAgICAvLyBzbyB5b3UgY2FuIHByaW50IHRoZW0gb3V0IGFuZCBwcmV2aWV3IHRoZW0gaW4gdGhlIGNvbnNvbGUuXG4gICAgLy8gVGhlIGZvcm1hdCBzaG91bGQgYmU6ICggdmFsdWUgKSAtPiAoIHZhbHVlICkgLT4gKCB2YWx1ZSApIC0+IG51bGxcbiAgICBsZXQgbm9kZSA9IHRoaXMuI2hlYWQ7XG4gICAgbGV0IHN0cmluZyA9IG5vZGUgPyAnJyA6IG51bGw7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIHN0cmluZyArPSBgKCAke25vZGUudmFsdWV9ICkgLT4gYDtcbiAgICAgIGlmICghbm9kZS5uZXh0KSB7XG4gICAgICAgIHN0cmluZyArPSBgbnVsbGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIC8vIEV4dHJhIENyZWRpdCBUaXA6IFdoZW4geW91IGluc2VydCBvciByZW1vdmUgYSBub2RlLFxuICAvLyBjb25zaWRlciBob3cgaXQgd2lsbCBhZmZlY3QgdGhlIGV4aXN0aW5nIG5vZGVzLlxuICAvLyBTb21lIG9mIHRoZSBub2RlcyB3aWxsIG5lZWQgdGhlaXIgbmV4dE5vZGUgbGluayB1cGRhdGVkLlxuICBpbnNlcnRBdCh2YWx1ZSwgaW5kZXgpIHtcbiAgICAvLyBpbnNlcnRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUgYXQgdGhlIGdpdmVuIGluZGV4XG4gICAgaWYgKGluZGV4IDw9IHRoaXMuI3NpemUgJiYgaW5kZXggPj0gMCkge1xuICAgICAgLy8gY2hlY2tzIGlmIHRoZSBpbmRleCBpcyB3aXRoaW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgLy8gaW5kZXggY2FuIG5ldmVyIGJlIGxlc3MgdGhhbiAwXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgZ3JlYXRlciB0aGFuIHRoZSBsaW5rZWQgbGlzdCdzIHNpemVcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAvLyBpbnNlcnQgbm9kZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0XG4gICAgICAgIHRoaXMucHJlcGVuZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLiNzaXplKSB7XG4gICAgICAgIC8vIGluc2VydCBub2RlIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgdGhpcy5hcHBlbmQodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW5zZXJ0IG5vZGVzIGluIGJldHdlZW4gbm9kZXNcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuYXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuYXRJbmRleChpbmRleCk7XG4gICAgICAgIGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSwgcmlnaHQpO1xuICAgICAgICBsZWZ0Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB0aGlzLiNzaXplICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQXQoaW5kZXgpIHtcbiAgICAvLyB0aGF0IHJlbW92ZXMgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIGluZGV4XG4gICAgaWYgKGluZGV4IDwgdGhpcy4jc2l6ZSAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAvLyBjaGVja3MgaWYgdGhlIGluZGV4IGlzIHdpdGhpbiB0aGUgbGlua2VkIGxpc3QncyBzaXplXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgbGVzcyB0aGFuIDBcbiAgICAgIC8vIGluZGV4IGNhbiBuZXZlciBiZSBncmVhdGVyIHRoYW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgaWYgKGluZGV4ICsgMSA9PT0gdGhpcy4jc2l6ZSkge1xuICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiNzaXplID4gMSAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLiNoZWFkID0gdGhpcy5hdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5hdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5hdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICAgIGxlZnQubmV4dCA9IHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNzaXplIC09IDE7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IodmFsdWUsIG5leHQpIHtcbiAgICB0aGlzLnZhbHVlID0gIXZhbHVlID8gbnVsbCA6IHZhbHVlO1xuICAgIHRoaXMubmV4dCA9ICFuZXh0ID8gbnVsbCA6IG5leHQ7XG4gIH1cbn1cbiIsImltcG9ydCBrbmlnaHRNb3ZlcyBmcm9tICcuL2NvbnRhaW5lcnMva25pZ2h0X3RyYXZhaWxzJztcbmltcG9ydCB0ZXN0IGZyb20gJy4vY29tcG9uZW50cy90ZXN0JztcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuXG53aW5kb3cua25pZ2h0TW92ZXMgPSBrbmlnaHRNb3ZlcztcblxudGVzdC5wcmludCgpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0LnJlbmRlcigpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==