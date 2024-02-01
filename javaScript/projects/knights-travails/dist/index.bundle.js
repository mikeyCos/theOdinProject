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
  console.log(`endX: ${endX}, endY: ${endY}`);

  // if (
  //   (startX === endX && startY === endY) ||
  //   (startX === null && startY === null) ||
  //   (startX === undefined && startY === undefined)
  // )
  //   return [];
  // console.log(memo.find((item) => item[0] === startX && item[1] === startY));
  if (memo.find((item) => item[0] === startX && item[1] === startY)) return [];
  let moves = [];

  for (let i = 0; i < 2; i += 1) {
    //  vertical and horizontal moves
    //  moves 1-2 squares left/up or right/down
    for (let j = 0; j < 2; j += 1) {
      const vertDir = i % 2 !== 0; // true => up, false => down
      const horDir = j % 2 === 0; // true => right, false => left
      const newMoveV = [move(startX, 1, horDir), move(startY, 2, vertDir)];
      const newMoveH = [move(startX, 2, horDir), move(startY, 1, vertDir)];
      if (newMoveV.every((element) => element !== null)) {
        moves.push(newMoveV);
        memo.push(newMoveV);
      }
      if (newMoveH.every((element) => element !== null)) {
        moves.push(newMoveH);
        memo.push(newMoveH);
      }
    }
  }
  console.log(moves);
  moves = moves.concat(moves.map((item) => generatePossibleMoves(item[0], item[1], endX, endY)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxXQUFXO0FBQ3pCLGNBQWMsWUFBWTtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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InNvdXJjZXMiOlsid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LmNzcz9jZmU0Iiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3Rlc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2JpbmFyeS1zZWFyY2gtdHJlZS9iaW5hcnktc2VhcmNoLXRyZWUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2JpbmFyeS1zZWFyY2gtdHJlZS9tZXJnZS1zb3J0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9iaW5hcnktc2VhcmNoLXRyZWUvbm9kZS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMva25pZ2h0X3RyYXZhaWxzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9saW5rZWQtbGlzdC9saW5rZWQtbGlzdC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvbGlua2VkLWxpc3Qvbm9kZS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIC8qIGh0dHBzOi8vZm9udHMuZ29vZ2xlLmNvbS9zcGVjaW1lbi9Sb2JvdG8rQ29uZGVuc2VkICovXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5cbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgZm9udC1mYW1pbHk6IEFyaWFsO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVEQUF1RDtFQUN2RCwrQkFBK0I7RUFDL0IsNENBQTJFO0VBQzNFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixzQ0FBc0M7RUFDdEMsK0JBQStCO0VBQy9CLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIC8qIGh0dHBzOi8vZm9udHMuZ29vZ2xlLmNvbS9zcGVjaW1lbi9Sb2JvdG8rQ29uZGVuc2VkICovXFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgc3JjOiB1cmwoLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGYpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCBJY29uIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9zaGFycF9ob21lLnN2Zyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJpbnQoKSB7XG4gICAgY29uc29sZS5sb2coJ3ByaW50KCkgcnVubmluZyBmcm9tIHRlc3QuanMnKTtcbiAgICBjb25zb2xlLmxvZygndGVzdGluZy4uLicpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IGZvbyA9IFwidGVzdFwiO1xuXG4gICAgY29uc3QgaWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGljb24uc3JjID0gSWNvbjtcbiAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSAnTG9yZW0gaXBzdW0gc29tZXRoaW5nIHNvbWV0aGluZy4uLic7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG4gICAgcmV0dXJuIGRpdjtcbiAgfSxcbn07XG4iLCJpbXBvcnQgbWVyZ2VTb3J0IGZyb20gJy4vbWVyZ2Utc29ydCc7XG5pbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcbiAgLy8gQWNjZXB0cyBhbiBhcnJheSB3aGVuIGluaXRpYWxpemVkLlxuICAvLyBUaGUgVHJlZSBjbGFzcyBzaG91bGQgaGF2ZSBhIHJvb3QgYXR0cmlidXRlLCB3aGljaCB1c2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYnVpbGRUcmVlXG4gIGNvbnN0cnVjdG9yKGFycikge1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKGFycik7XG4gIH1cblxuICBwcmV0dHlQcmludCA9IChub2RlID0gdGhpcy5yb290LCBwcmVmaXggPSAnJywgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByZXR0eVByaW50KG5vZGUucmlnaHROb2RlLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSCICAgJyA6ICcgICAgJ31gLCBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilJTilIDilIAgJyA6ICfilIzilIDilIAgJ30ke25vZGUuZGF0YX1gKTtcbiAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByZXR0eVByaW50KG5vZGUubGVmdE5vZGUsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICcgICAgJyA6ICfilIIgICAnfWAsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICAjc29ydGVkQXJyYXlUb0JTVCA9IChhcnIsIHN0YXJ0LCBlbmQpID0+IHtcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWlkUG9pbnQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcbiAgICBjb25zdCByb290Tm9kZSA9IG5ldyBOb2RlKGFyclttaWRQb2ludF0pO1xuICAgIHJvb3ROb2RlLmxlZnROb2RlID0gdGhpcy4jc29ydGVkQXJyYXlUb0JTVChhcnIsIHN0YXJ0LCBtaWRQb2ludCAtIDEpO1xuICAgIHJvb3ROb2RlLnJpZ2h0Tm9kZSA9IHRoaXMuI3NvcnRlZEFycmF5VG9CU1QoYXJyLCBtaWRQb2ludCArIDEsIGVuZCk7XG4gICAgLy8gY29uc3QgY2hpbGROb2RlT25lID0gc29ydGVkQXJyYXlUb0JTVChhcnIsIHN0YXJ0LCBtaWRQb2ludCAtIDEpO1xuICAgIC8vIGNvbnN0IGNoaWxkTm9kZVR3byA9IHNvcnRlZEFycmF5VG9CU1QoYXJyLCBtaWRQb2ludCArIDEsIGVuZCk7XG5cbiAgICAvLyBpZiAoY2hpbGROb2RlT25lKSB7XG4gICAgLy8gICBpZiAocm9vdE5vZGUuZGF0YSA8IGNoaWxkTm9kZU9uZS5kYXRhKSB7XG4gICAgLy8gICAgIHJvb3ROb2RlLnJpZ2h0Tm9kZSA9IGNoaWxkTm9kZU9uZTtcbiAgICAvLyAgIH0gZWxzZSBpZiAocm9vdE5vZGUuZGF0YSA+IGNoaWxkTm9kZU9uZS5kYXRhKSB7XG4gICAgLy8gICAgIHJvb3ROb2RlLmxlZnROb2RlID0gY2hpbGROb2RlT25lO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZyhyb290Tm9kZSk7XG4gICAgLy8gaWYgKGNoaWxkTm9kZVR3bykge1xuICAgIC8vICAgaWYgKHJvb3ROb2RlLmRhdGEgPCBjaGlsZE5vZGVUd28uZGF0YSkge1xuICAgIC8vICAgICByb290Tm9kZS5yaWdodE5vZGUgPSBjaGlsZE5vZGVUd287XG4gICAgLy8gICB9IGVsc2UgaWYgKHJvb3ROb2RlLmRhdGEgPiBjaGlsZE5vZGVUd28uZGF0YSkge1xuICAgIC8vICAgICByb290Tm9kZS5sZWZ0Tm9kZSA9IGNoaWxkTm9kZVR3bztcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGU7XG4gIH07XG5cbiAgYnVpbGRUcmVlID0gKGFycikgPT4ge1xuICAgIC8vIFRha2VzIGFuIGFycmF5IG9mIGRhdGEgKGUuZy4sIFsxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNF0pXG4gICAgLy8gVHVybnMgaXQgaW50byBhIGJhbGFuY2VkIGJpbmFyeSB0cmVlIGZ1bGwgb2YgTm9kZSBvYmplY3RzIGFwcHJvcHJpYXRlbHkgcGxhY2VkXG4gICAgLy8gKGRvbuKAmXQgZm9yZ2V0IHRvIHNvcnQgYW5kIHJlbW92ZSBkdXBsaWNhdGVzISkuXG4gICAgLy8gVGhlIGJ1aWxkVHJlZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIHRoZSBsZXZlbC0wIHJvb3Qgbm9kZS5cbiAgICBjb25zdCBzb3J0ZWRBcnIgPSBtZXJnZVNvcnQoYXJyKTtcbiAgICByZXR1cm4gdGhpcy4jc29ydGVkQXJyYXlUb0JTVChzb3J0ZWRBcnIsIDAsIHNvcnRlZEFyci5sZW5ndGggLSAxKTtcbiAgICAvLyByZXR1cm4gc29ydGVkQXJyYXlUb0JTVChhcnIsIDAsIGFyci5sZW5ndGggLSAxKTtcbiAgfTtcblxuICBpbnNlcnROb2RlID0gKHZhbHVlLCBub2RlID0gdGhpcy5yb290KSA9PiB7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gb2YgdGhlc2UgbWV0aG9kcyBzaG91bGQgdHJhdmVyc2UgdGhlIHRyZWUgYW5kIG1hbmlwdWxhdGUgdGhlIG5vZGVzIGFuZCB0aGVpciBjb25uZWN0aW9ucy5cbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCB1bmRlZmluZWQnKTtcbiAgICBsZXQgbmV3Tm9kZSA9IG5vZGU7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSk7XG4gICAgICBpZiAoIXRoaXMucm9vdCkgdGhpcy5yb290ID0gbmV3Tm9kZTtcbiAgICAgIHJldHVybiBuZXdOb2RlO1xuICAgIH1cblxuICAgIGlmIChub2RlLmRhdGEgPCB2YWx1ZSkge1xuICAgICAgbmV3Tm9kZS5yaWdodE5vZGUgPSB0aGlzLmluc2VydE5vZGUodmFsdWUsIG5vZGUucmlnaHROb2RlKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YSA+IHZhbHVlKSB7XG4gICAgICBuZXdOb2RlLmxlZnROb2RlID0gdGhpcy5pbnNlcnROb2RlKHZhbHVlLCBub2RlLmxlZnROb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgICAvLyBpdGVyYXRpdmUgYXBwcm9hY2hcbiAgICAvLyBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUpO1xuICAgIC8vIGlmICh0aGlzLnJvb3QgPT09IG51bGwpIHtcbiAgICAvLyAgIHRoaXMuI3NldFJvb3QobmV3Tm9kZSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGxldCBub2RlID0gdGhpcy5yb290O1xuICAgIC8vICAgd2hpbGUgKG5vZGUpIHtcbiAgICAvLyAgICAgaWYgKG5vZGUuZGF0YSA8IHZhbHVlKSB7XG4gICAgLy8gICAgICAgLy8gZ28gcmlnaHRcbiAgICAvLyAgICAgICBpZiAobm9kZS5yaWdodE5vZGUgPT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIG5vZGUucmlnaHROb2RlID0gbmV3Tm9kZTtcbiAgICAvLyAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgbm9kZSA9IG5vZGUucmlnaHROb2RlO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSBlbHNlIGlmIChub2RlLmRhdGEgPiB2YWx1ZSkge1xuICAgIC8vICAgICAgIC8vIGdvIGxlZnRcbiAgICAvLyAgICAgICBpZiAobm9kZS5sZWZ0Tm9kZSA9PT0gbnVsbCkge1xuICAgIC8vICAgICAgICAgbm9kZS5sZWZ0Tm9kZSA9IG5ld05vZGU7XG4gICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIG5vZGUgPSBub2RlLmxlZnROb2RlO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAvLyBkdXBsaWNhdGUgZm91bmRcbiAgICAvLyAgICAgICBicmVhaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfTtcblxuICBmaW5kID0gKHZhbHVlLCBub2RlID0gdGhpcy5yb290KSA9PiB7XG4gICAgLy8gQWNjZXB0cyBhIHZhbHVlIGFuZCByZXR1cm5zIHRoZSBub2RlIHdpdGggdGhlIGdpdmVuIHZhbHVlLlxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IHVuZGVmaW5lZCcpO1xuICAgIGxldCBuZXh0Tm9kZSA9IG5vZGU7XG4gICAgaWYgKG5leHROb2RlID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBpZiAobmV4dE5vZGUuZGF0YSA9PT0gdmFsdWUpIHJldHVybiBuZXh0Tm9kZTtcblxuICAgIGlmIChub2RlLmRhdGEgPiB2YWx1ZSkgbmV4dE5vZGUgPSB0aGlzLmZpbmQodmFsdWUsIG5vZGUubGVmdE5vZGUpO1xuICAgIGlmIChub2RlLmRhdGEgPCB2YWx1ZSkgbmV4dE5vZGUgPSB0aGlzLmZpbmQodmFsdWUsIG5vZGUucmlnaHROb2RlKTtcbiAgICByZXR1cm4gbmV4dE5vZGU7XG4gIH07XG5cbiAgI3ByZWRlY2Vzc29yID0gKHZhbHVlLCBub2RlID0gdGhpcy5yb290KSA9PiB7XG4gICAgLy8gcmV0dXJucyBwcmVkZWNlc3NvciBub2RlIG9mIGdpdmVuIHZhbHVlXG4gICAgLy8gaG93IHRvIHJlZmFjdG9yIHRoaXM/XG4gICAgbGV0IG5leHROb2RlID0gbm9kZTtcbiAgICBpZiAobmV4dE5vZGUgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGlmIChcbiAgICAgIChuZXh0Tm9kZS5sZWZ0Tm9kZSAmJiBuZXh0Tm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkgfHxcbiAgICAgIChuZXh0Tm9kZS5yaWdodE5vZGUgJiYgbmV4dE5vZGUucmlnaHROb2RlLmRhdGEgPT09IHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIG5leHROb2RlO1xuICAgIH1cblxuICAgIGlmIChub2RlLmRhdGEgPiB2YWx1ZSkgbmV4dE5vZGUgPSB0aGlzLiNwcmVkZWNlc3Nvcih2YWx1ZSwgbmV4dE5vZGUubGVmdE5vZGUpO1xuICAgIGlmIChub2RlLmRhdGEgPCB2YWx1ZSkgbmV4dE5vZGUgPSB0aGlzLiNwcmVkZWNlc3Nvcih2YWx1ZSwgbmV4dE5vZGUucmlnaHROb2RlKTtcblxuICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgfTtcblxuICBkZWxldGVOb2RlID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gb2YgdGhlc2UgbWV0aG9kcyBzaG91bGQgdHJhdmVyc2UgdGhlIHRyZWUgYW5kIG1hbmlwdWxhdGUgdGhlIG5vZGVzIGFuZCB0aGVpciBjb25uZWN0aW9ucy5cbiAgICAvLyBUaGVyZSB3aWxsIGJlIHNldmVyYWwgY2FzZXMgZm9yIGRlbGV0ZSwgc3VjaCBhcyB3aGVuIGEgbm9kZSBoYXMgY2hpbGRyZW4gb3Igbm90LlxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IHVuZGVmaW5lZCcpO1xuICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0aGlzLmZpbmQodmFsdWUpO1xuICAgIGlmICh0YXJnZXROb2RlKSB7XG4gICAgICBjb25zdCB7IGxlZnROb2RlIH0gPSB0YXJnZXROb2RlO1xuICAgICAgY29uc3QgeyByaWdodE5vZGUgfSA9IHRhcmdldE5vZGU7XG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy4jcHJlZGVjZXNzb3IodmFsdWUpO1xuXG4gICAgICBpZiAobGVmdE5vZGUgJiYgcmlnaHROb2RlKSB7XG4gICAgICAgIC8vIGhhcyAyIGNoaWxkcmVuXG4gICAgICAgIGxldCBzdWNjZXNzb3IgPSByaWdodE5vZGU7XG4gICAgICAgIHdoaWxlIChzdWNjZXNzb3IpIHtcbiAgICAgICAgICAvLyBmaW5kcyBzdWNjZXNzb3JcbiAgICAgICAgICBpZiAoIXN1Y2Nlc3Nvci5sZWZ0Tm9kZSkgYnJlYWs7XG4gICAgICAgICAgc3VjY2Vzc29yID0gc3VjY2Vzc29yLmxlZnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3VjY2Vzc29yUmlnaHROb2RlID0gc3VjY2Vzc29yLnJpZ2h0Tm9kZTtcbiAgICAgICAgY29uc3QgcGFyZW50U3VjY2Vzc29yID0gdGhpcy4jcHJlZGVjZXNzb3Ioc3VjY2Vzc29yLmRhdGEpO1xuICAgICAgICBwYXJlbnRTdWNjZXNzb3IubGVmdE5vZGUgPSBudWxsO1xuICAgICAgICBpZiAoIXN1Y2Nlc3Nvci5sZWZ0Tm9kZSAmJiBzdWNjZXNzb3IucmlnaHROb2RlKSB7XG4gICAgICAgICAgaWYgKHBhcmVudFN1Y2Nlc3Nvci5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gaWYgcGFyZW50U3VjY2Vzc29yIGlzIHRoZSBub2RlIHRvIGRlbGV0ZVxuICAgICAgICAgICAgc3VjY2Vzc29yLnJpZ2h0Tm9kZSA9IHN1Y2Nlc3NvclJpZ2h0Tm9kZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50U3VjY2Vzc29yLmxlZnROb2RlID0gc3VjY2Vzc29yUmlnaHROb2RlO1xuICAgICAgICAgICAgc3VjY2Vzc29yLnJpZ2h0Tm9kZSA9IHJpZ2h0Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN1Y2Nlc3Nvci5sZWZ0Tm9kZSAmJiAhc3VjY2Vzc29yLnJpZ2h0Tm9kZSkge1xuICAgICAgICAgIC8vIGlmIHN1Y2Nlc3NvciBpcyBhIGxlYWYgbm9kZVxuICAgICAgICAgIHN1Y2Nlc3Nvci5yaWdodE5vZGUgPSBwYXJlbnRTdWNjZXNzb3IuZGF0YSA9PT0gdmFsdWUgPyBudWxsIDogcmlnaHROb2RlO1xuICAgICAgICAgIC8vIGlmIHBhcmVudFN1Y2Nlc3NvciBpcyB0aGUgbm9kZSB0byBkZWxldGVcbiAgICAgICAgICAvLyAgc2V0IHRoZSBzdWNjZXNzb3IncyByaWdodE5vZGUgdG8gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgc3VjY2Vzc29yLmxlZnROb2RlID0gbGVmdE5vZGU7XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHROb2RlICYmIHBhcmVudE5vZGUucmlnaHROb2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgLy8gaWYgbm9kZSB0byBkZWxldGUgaXMgdG8gdGhlIHJpZ2h0IG9mIHRoZSBwYXJlbnROb2RlXG4gICAgICAgICAgcGFyZW50Tm9kZS5yaWdodE5vZGUgPSBzdWNjZXNzb3I7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyZW50Tm9kZS5sZWZ0Tm9kZSAmJiBwYXJlbnROb2RlLmxlZnROb2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgLy8gaWYgbm9kZSB0byBkZWxldGUgaXMgdG8gdGhlIGxlZnQgb2YgdGhlIHBhcmVudE5vZGVcbiAgICAgICAgICBwYXJlbnROb2RlLmxlZnROb2RlID0gc3VjY2Vzc29yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5vZGUgdG8gZGVsZXRlIGlzIHRoZSByb290IG5vZGVcbiAgICAgICAgICB0aGlzLnJvb3QgPSBzdWNjZXNzb3I7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobGVmdE5vZGUgfHwgcmlnaHROb2RlKSB7XG4gICAgICAgIC8vIG5vZGUgdG8gZGVsZXRlIGhhcyAxIGNoaWxkXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Tm9kZSAmJiBwYXJlbnROb2RlLnJpZ2h0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgIHBhcmVudE5vZGUucmlnaHROb2RlID0gIWxlZnROb2RlID8gcmlnaHROb2RlIDogbGVmdE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyZW50Tm9kZS5sZWZ0Tm9kZSAmJiBwYXJlbnROb2RlLmxlZnROb2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Tm9kZSA9ICFyaWdodE5vZGUgPyBsZWZ0Tm9kZSA6IHJpZ2h0Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJvb3QgPSAhcmlnaHROb2RlID8gbGVmdE5vZGUgOiByaWdodE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKHRoaXMucm9vdC5kYXRhID09PSB2YWx1ZSkgdGhpcy5yb290ID0gIXJpZ2h0Tm9kZSA/IGxlZnROb2RlIDogcmlnaHROb2RlO1xuICAgICAgfSBlbHNlIGlmICghcmlnaHROb2RlICYmICFsZWZ0Tm9kZSkge1xuICAgICAgICAvLyBub2RlIHRvIGRlbGV0ZSBpcyBhIGxlYWYgbm9kZSwgbm8gY2hpbGRyZW5cbiAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHROb2RlICYmIHBhcmVudE5vZGUucmlnaHROb2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5yaWdodE5vZGUgPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudE5vZGUubGVmdE5vZGUgJiYgcGFyZW50Tm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgIHBhcmVudE5vZGUubGVmdE5vZGUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vICh0aGlzLnJvb3QuZGF0YSA9PT0gdmFsdWUpXG4gICAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIGRvZXMgbm90IGV4aXN0IGluIHRyZWUuJyk7XG4gICAgfVxuICB9O1xuXG4gIGxldmVsT3JkZXIgPSAoY2FsbGJhY2ssIGFyciA9IFtdLCBxdWV1ZSA9IFt0aGlzLnJvb3RdKSA9PiB7XG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBPUFRJT05BTCBjYWxsYmFjayBmdW5jdGlvbiBhcyBpdHMgcGFyYW1ldGVyXG4gICAgLy8gVHJhdmVyc2UgdGhlIHRyZWUgaW4gYnJlYWR0aC1maXJzdCBsZXZlbCBvcmRlciBhbmQgcHJvdmlkZSBlYWNoIG5vZGUgYXMgYW4gYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrLlxuICAgIC8vIFRoZSBjYWxsYmFjayB3aWxsIHBlcmZvcm0gYW4gb3BlcmF0aW9uIG9uIGVhY2ggbm9kZSBmb2xsb3dpbmcgdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgYXJlIHRyYXZlcnNlZC5cbiAgICAvLyBUaGUgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxuICAgIC8vIFlvdSB3aWxsIHdhbnQgdG8gdXNlIGFuIGFycmF5IGFjdGluZyBhcyBhIHF1ZXVlIHRvIGtlZXAgdHJhY2sgb2YgYWxsIHRoZSBjaGlsZCBub2RlcyB0aGF0IHlvdSBoYXZlIHlldCB0byB0cmF2ZXJzZSBhbmQgdG8gYWRkIG5ldyBvbmVzIHRvIHRoZSBsaXN0XG4gICAgaWYgKHRoaXMucm9vdCA9PT0gbnVsbCB8fCBxdWV1ZS5sZW5ndGggPT09IDApIHJldHVybiBhcnI7XG4gICAgY29uc3QgZGVxdWV1ZSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhkZXF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyLnB1c2goZGVxdWV1ZS5kYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoZGVxdWV1ZS5sZWZ0Tm9kZSkgcXVldWUucHVzaChkZXF1ZXVlLmxlZnROb2RlKTtcbiAgICBpZiAoZGVxdWV1ZS5yaWdodE5vZGUpIHF1ZXVlLnB1c2goZGVxdWV1ZS5yaWdodE5vZGUpO1xuXG4gICAgdGhpcy5sZXZlbE9yZGVyKGNhbGxiYWNrLCBhcnIsIHF1ZXVlKTtcbiAgICByZXR1cm4gY2FsbGJhY2sgPyB1bmRlZmluZWQgOiBhcnI7XG5cbiAgICAvLyBpdGVyYXRpdmUgYXBwcm9hY2hcbiAgICAvLyBjb25zdCBhcnIgPSBbXTtcbiAgICAvLyBjb25zdCBxdWV1ZSA9IFtdO1xuICAgIC8vIGlmICh0aGlzLnJvb3QpIHF1ZXVlLnB1c2godGhpcy5yb290KTtcbiAgICAvLyB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgIC8vICAgY29uc3QgZGVxdWV1ZSA9IHF1ZXVlLnNwbGljZSgwLCAxKVswXTtcbiAgICAvLyAgIGlmIChjYWxsYmFjaykge1xuICAgIC8vICAgICBjYWxsYmFjayhkZXF1ZXVlKTtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIGFyci5wdXNoKGRlcXVldWUuZGF0YSk7XG4gICAgLy8gICB9XG4gICAgLy8gICBpZiAoZGVxdWV1ZS5sZWZ0Tm9kZSkgcXVldWUucHVzaChkZXF1ZXVlLmxlZnROb2RlKTtcbiAgICAvLyAgIGlmIChkZXF1ZXVlLnJpZ2h0Tm9kZSkgcXVldWUucHVzaChkZXF1ZXVlLnJpZ2h0Tm9kZSk7XG4gICAgLy8gfVxuICAgIC8vIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcbiAgfTtcblxuICBpbk9yZGVyID0gKGNhbGxiYWNrLCBub2RlID0gdGhpcy5yb290LCBhcnIgPSBbXSkgPT4ge1xuICAgIC8vIGxlZnQgPT4gcm9vdCA9PiByaWdodFxuICAgIC8vIGVsZW1lbnRzIG9mIHRoZSBhcnJheSB3aWxsIGJlIGluIG9yZGVyXG4gICAgLy8gQWNjZXB0cyBhIHJhbmRvbSBvcHRpb25hbCBjYWxsYmFjayBhcyBhIHBhcmFtZXRlci5cbiAgICAvLyBUcmF2ZXJzZSB0aGUgdHJlZSBpbiB0aGVpciByZXNwZWN0aXZlIGRlcHRoLWZpcnN0IG9yZGVyIGFuZCB5aWVsZCBlYWNoIG5vZGUgdG8gdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuICAgIC8vIFJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgdGhpcy5pbk9yZGVyKGNhbGxiYWNrLCBub2RlLmxlZnROb2RlLCBhcnIpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2gobm9kZS5kYXRhKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5PcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodE5vZGUsIGFycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gdW5kZWZpbmVkIDogYXJyO1xuICB9O1xuXG4gIHByZU9yZGVyID0gKGNhbGxiYWNrLCBub2RlID0gdGhpcy5yb290LCBhcnIgPSBbXSkgPT4ge1xuICAgIC8vIHJvb3QgPT4gbGVmdCA9PiByaWdodFxuICAgIC8vIEFjY2VwdHMgYSByYW5kb20gb3B0aW9uYWwgY2FsbGJhY2sgYXMgYSBwYXJhbWV0ZXIuXG4gICAgLy8gVHJhdmVyc2UgdGhlIHRyZWUgaW4gdGhlaXIgcmVzcGVjdGl2ZSBkZXB0aC1maXJzdCBvcmRlciBhbmQgeWllbGQgZWFjaCBub2RlIHRvIHRoZSBwcm92aWRlZCBjYWxsYmFjay5cbiAgICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhub2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKG5vZGUuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJlT3JkZXIoY2FsbGJhY2ssIG5vZGUubGVmdE5vZGUsIGFycik7XG4gICAgICB0aGlzLnByZU9yZGVyKGNhbGxiYWNrLCBub2RlLnJpZ2h0Tm9kZSwgYXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FsbGJhY2sgPyB1bmRlZmluZWQgOiBhcnI7XG4gIH07XG5cbiAgcG9zdE9yZGVyID0gKGNhbGxiYWNrLCBub2RlID0gdGhpcy5yb290LCBhcnIgPSBbXSkgPT4ge1xuICAgIC8vIGxlZnQgPT4gcmlnaHQgPT4gcm9vdFxuICAgIC8vIEFjY2VwdHMgYSByYW5kb20gb3B0aW9uYWwgY2FsbGJhY2sgYXMgYSBwYXJhbWV0ZXIuXG4gICAgLy8gVHJhdmVyc2UgdGhlIHRyZWUgaW4gdGhlaXIgcmVzcGVjdGl2ZSBkZXB0aC1maXJzdCBvcmRlciBhbmQgeWllbGQgZWFjaCBub2RlIHRvIHRoZSBwcm92aWRlZCBjYWxsYmFjay5cbiAgICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHRoaXMucG9zdE9yZGVyKGNhbGxiYWNrLCBub2RlLmxlZnROb2RlLCBhcnIpO1xuICAgICAgdGhpcy5wb3N0T3JkZXIoY2FsbGJhY2ssIG5vZGUucmlnaHROb2RlLCBhcnIpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2gobm9kZS5kYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FsbGJhY2sgPyB1bmRlZmluZWQgOiBhcnI7XG4gIH07XG5cbiAgaGVpZ2h0ID0gKG5vZGUpID0+IHtcbiAgICAvLyBBY2NlcHRzIGEgbm9kZSBhbmQgcmV0dXJucyBpdHMgaGVpZ2h0LlxuICAgIC8vIEhlaWdodCBpcyBkZWZpbmVkIGFzIHRoZSBudW1iZXIgb2YgZWRnZXMgaW4gdGhlIGxvbmdlc3QgcGF0aCBmcm9tIGEgZ2l2ZW4gbm9kZSB0byBhIGxlYWYgbm9kZS5cbiAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuIG5ldyBFcnJvcignSW5jb3JyZWN0IHBhcmFtZXRlciB0eXBlLicpO1xuXG4gICAgY29uc3QgbGVmdE5vZGVIZWlnaHQgPSB0aGlzLmhlaWdodChub2RlLmxlZnROb2RlKTtcbiAgICBjb25zdCByaWdodE5vZGVIZWlnaHQgPSB0aGlzLmhlaWdodChub2RlLnJpZ2h0Tm9kZSk7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgobGVmdE5vZGVIZWlnaHQsIHJpZ2h0Tm9kZUhlaWdodCkgKyAxO1xuICB9O1xuXG4gIGRlcHRoID0gKG5vZGUsIG5leHROb2RlID0gdGhpcy5yb290KSA9PiB7XG4gICAgLy8gQWNjZXB0cyBhIG5vZGUgYW5kIHJldHVybnMgaXRzIGRlcHRoLlxuICAgIC8vIERlcHRoIGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBpbiB0aGUgcGF0aCBmcm9tIGEgZ2l2ZW4gbm9kZSB0byB0aGUgdHJlZeKAmXMgcm9vdCBub2RlLlxuICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBwYXJhbWV0ZXIuJyk7XG4gICAgaWYgKG5leHROb2RlLmRhdGEgPT09IG5vZGUuZGF0YSkgcmV0dXJuIDA7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm4gbmV3IEVycm9yKCdJbmNvcnJlY3QgcGFyYW1ldGVyIHR5cGUuJyk7XG4gICAgbGV0IGRlcHRoTnVtID0gMDtcbiAgICBpZiAobm9kZS5kYXRhIDwgbmV4dE5vZGUuZGF0YSkgZGVwdGhOdW0gPSB0aGlzLmRlcHRoKG5vZGUsIG5leHROb2RlLmxlZnROb2RlKSArIDE7XG4gICAgaWYgKG5vZGUuZGF0YSA+IG5leHROb2RlLmRhdGEpIGRlcHRoTnVtID0gdGhpcy5kZXB0aChub2RlLCBuZXh0Tm9kZS5yaWdodE5vZGUpICsgMTtcblxuICAgIHJldHVybiBkZXB0aE51bTtcbiAgfTtcblxuICBpc0JhbGFuY2VkID0gKG5vZGUgPSB0aGlzLnJvb3QpID0+IHtcbiAgICAvLyBDaGVja3MgaWYgdGhlIHRyZWUgaXMgYmFsYW5jZWQuXG4gICAgLy8gQSBiYWxhbmNlZCB0cmVlIGlzIG9uZSB3aGVyZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGhlaWdodHMgb2YgdGhlIGxlZnQgc3VidHJlZVxuICAgIC8vIGFuZCB0aGUgcmlnaHQgc3VidHJlZSBvZiBldmVyeSBub2RlIGlzIG5vdCBtb3JlIHRoYW4gMS5cbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGxlZnRTdWJ0cmVlSGVpZ2h0ID0gdGhpcy5oZWlnaHQobm9kZS5sZWZ0Tm9kZSk7XG4gICAgY29uc3QgcmlnaHRTdWJ0cmVlSGVpZ2h0ID0gdGhpcy5oZWlnaHQobm9kZS5yaWdodE5vZGUpO1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBsZWZ0U3VidHJlZUhlaWdodCAtIHJpZ2h0U3VidHJlZUhlaWdodDtcbiAgICBpZiAoZGlmZmVyZW5jZSA8PSAxICYmIGRpZmZlcmVuY2UgPj0gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQmFsYW5jZWQobm9kZS5sZWZ0Tm9kZSkgJiYgdGhpcy5pc0JhbGFuY2VkKG5vZGUucmlnaHROb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHJlYmFsYW5jZSA9ICgpID0+IHtcbiAgICAvLyBSZWJhbGFuY2VzIGFuIHVuYmFsYW5jZWQgdHJlZS5cbiAgICAvLyBZb3XigJlsbCB3YW50IHRvIHVzZSBhIHRyYXZlcnNhbCBtZXRob2QgdG8gcHJvdmlkZSBhIG5ldyBhcnJheSB0byB0aGUgYnVpbGRUcmVlIGZ1bmN0aW9uLlxuICAgIGlmICghdGhpcy5pc0JhbGFuY2VkKCkpIHtcbiAgICAgIGNvbnN0IHNvcnRlZEFycmF5ID0gdGhpcy5pbk9yZGVyKCk7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZShzb3J0ZWRBcnJheSk7XG4gICAgfVxuICB9O1xufVxuIiwiY29uc3QgbWVyZ2VTb3J0ID0gKGFycikgPT4ge1xuICBpZiAoYXJyLmxlbmd0aCA8PSAxKSByZXR1cm4gYXJyO1xuICBjb25zdCBtaWRQb2ludCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIDIpO1xuXG4gIGNvbnN0IGxlZnQgPSBhcnIuc2xpY2UoMCwgbWlkUG9pbnQpO1xuICBjb25zdCByaWdodCA9IGFyci5zbGljZShtaWRQb2ludCk7XG4gIGNvbnN0IHNvcnRlZExlZnQgPSBtZXJnZVNvcnQobGVmdCk7XG4gIGNvbnN0IHNvcnRlZFJpZ2h0ID0gbWVyZ2VTb3J0KHJpZ2h0KTtcbiAgY29uc3Qgc29ydGVkQXJyID0gW107XG5cbiAgbGV0IGkgPSAwO1xuICBsZXQgaiA9IDA7XG4gIGxldCBrID0gMDtcblxuICB3aGlsZSAoaSA8IHNvcnRlZExlZnQubGVuZ3RoICYmIGogPCBzb3J0ZWRSaWdodC5sZW5ndGgpIHtcbiAgICBpZiAoc29ydGVkTGVmdFtpXSA8IHNvcnRlZFJpZ2h0W2pdKSB7XG4gICAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRMZWZ0W2ldO1xuICAgICAgaSArPSAxO1xuICAgIH0gZWxzZSBpZiAoc29ydGVkTGVmdFtpXSA+IHNvcnRlZFJpZ2h0W2pdKSB7XG4gICAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRSaWdodFtqXTtcbiAgICAgIGogKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydGVkQXJyW2tdID0gc29ydGVkUmlnaHRbal07XG4gICAgICBpICs9IDE7XG4gICAgICBqICs9IDE7XG4gICAgfVxuICAgIGsgKz0gMTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgc29ydGVkTGVmdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHNvcnRlZEFycltrXSA9IHNvcnRlZExlZnRbaV07XG4gICAgayArPSAxO1xuICB9XG5cbiAgZm9yICg7IGogPCBzb3J0ZWRSaWdodC5sZW5ndGg7IGogKz0gMSkge1xuICAgIHNvcnRlZEFycltrXSA9IHNvcnRlZFJpZ2h0W2pdO1xuICAgIGsgKz0gMTtcbiAgfVxuXG4gIHJldHVybiBzb3J0ZWRBcnI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZVNvcnQ7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubGVmdE5vZGUgPSBudWxsO1xuICAgIHRoaXMucmlnaHROb2RlID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhICE9PSBudWxsID8gZGF0YSA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBMaW5rZWRMaXN0IGZyb20gJy4vbGlua2VkLWxpc3QvbGlua2VkLWxpc3QnO1xuaW1wb3J0IFRyZWUgZnJvbSAnLi9iaW5hcnktc2VhcmNoLXRyZWUvYmluYXJ5LXNlYXJjaC10cmVlJztcbi8qXG5JdHMgYmFzaWMgbW92ZSBpcyB0d28gc3RlcHMgZm9yd2FyZCBhbmQgb25lIHN0ZXAgdG8gdGhlIHNpZGVcbm9yIG9uZSBzdGVwIGZvcndhcmQgYW5kIHR3byBzdGVwcyB0byB0aGUgc2lkZS4gSXQgY2FuIGZhY2UgYW55IGRpcmVjdGlvbi5cblxuWW91IGNhbiB0aGluayBvZiB0aGUgYm9hcmQgYXMgaGF2aW5nIDItZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMuXG5Zb3VyIGZ1bmN0aW9uIHdvdWxkIHRoZXJlZm9yZSBsb29rIGxpa2U6XG5rbmlnaHRNb3ZlcyhbMCwwXSxbMSwyXSkgPT0gW1swLDBdLFsxLDJdXVxuXG4xLiBUaGluayBhYm91dCB0aGUgcnVsZXMgb2YgdGhlIGJvYXJkIGFuZCBrbmlnaHQsIGFuZCBtYWtlIHN1cmUgdG8gZm9sbG93IHRoZW0uXG4yLiBGb3IgZXZlcnkgc3F1YXJlIHRoZXJlIGlzIGEgbnVtYmVyIG9mIHBvc3NpYmxlIG1vdmVzLFxuY2hvb3NlIGEgZGF0YSBzdHJ1Y3R1cmUgdGhhdCB3aWxsIGFsbG93IHlvdSB0byB3b3JrIHdpdGggdGhlbS5cbkRvbuKAmXQgYWxsb3cgYW55IG1vdmVzIHRvIGdvIG9mZiB0aGUgYm9hcmQuXG4zLiBEZWNpZGUgd2hpY2ggc2VhcmNoIGFsZ29yaXRobSBpcyBiZXN0IHRvIHVzZSBmb3IgdGhpcyBjYXNlLlxuSGludDogb25lIG9mIHRoZW0gY291bGQgYmUgYSBwb3RlbnRpYWxseSBpbmZpbml0ZSBzZXJpZXMuXG40LiBVc2UgdGhlIGNob3NlbiBzZWFyY2ggYWxnb3JpdGhtIHRvIGZpbmQgdGhlIHNob3J0ZXN0IHBhdGggYmV0d2VlbiBcbnRoZSBzdGFydGluZyBzcXVhcmUgKG9yIG5vZGUpIGFuZCB0aGUgZW5kaW5nIHNxdWFyZS5cbk91dHB1dCB3aGF0IHRoYXQgZnVsbCBwYXRoIGxvb2tzIGxpa2UsIGUuZy46XG4+IGtuaWdodE1vdmVzKFszLDNdLFs0LDNdKVxuICA9PiBZb3UgbWFkZSBpdCBpbiAzIG1vdmVzISAgSGVyZSdzIHlvdXIgcGF0aDpcbiAgICBbMywzXVxuICAgIFs0LDVdXG4gICAgWzIsNF1cbiAgICBbNCwzXVxuKi9cbmNvbnN0IGNoZWNrQXJndW1lbnRzID0gKHN0YXJ0LCBlbmQpID0+IHtcbiAgLy8gIG5lZWQgdG8gY2hlY2sgaWYgYXJndW1lbnRzIGFyZSBhcnJheSB0eXBlc1xuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgaWYgKCFzdGFydCAmJiAhZW5kKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSAnVW5kZWZpbmVkIGFyZ3VtZW50cy4nO1xuICB9IGVsc2UgaWYgKCFzdGFydCAmJiBlbmQpIHtcbiAgICBlcnIubWVzc2FnZSA9ICdVbmRlZmluZWQgc3RhcnQgYXJndW1lbnQuJztcbiAgfSBlbHNlIGlmIChzdGFydCAmJiAhZW5kKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSAnVW5kZWZpbmVkIGVuZCBhcmd1bWVudC4nO1xuICB9XG5cbiAgaWYgKGVyci5tZXNzYWdlKSB0aHJvdyBlcnI7XG59O1xuXG5jb25zdCBtb3ZlID0gKHN0YXJ0LCBjb3VudCwgZGlyZWN0aW9uKSA9PiB7XG4gIC8vICB3aGF0IGlmIGtuaWdodCBnb2VzIG9mZiB0aGUgYm9hcmQ/XG4gIC8vICBrbmlnaHQgY2FuIG1vdmUgMSBvciAyIHNxdWFyZXMgbGVmdC91cCBvciByaWdodC9kb3duXG4gIC8vICBjb3VudCBkZWZpbmVzIGhvdyBtYW55IHNxdWFyZXMgdGhlIGtuaWdodCB3aWxsIG1vdmUgaG9yaXpvbnRhbGx5L3ZlcnRpY2FsbHlcbiAgLy8gIGRpcmVjdGlvbiBkZWZpbmVzIHdoaWNoIGRpcmVjdGlvbiB0aGUga25pZ2h0IHdpbGwgbW92ZSwgbGVmdC91cCBvciByaWdodC9kb3duXG4gIGxldCB1ID0gc3RhcnQ7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkgKz0gMSkge1xuICAgIHUgPSBkaXJlY3Rpb24gPyAodSArPSAxKSA6ICh1IC09IDEpO1xuICB9XG4gIGlmICh1IDwgMCB8fCB1ID4gNykgcmV0dXJuIG51bGw7XG4gIHJldHVybiB1O1xufTtcblxubGV0IG1lbW8gPSBbXTtcblxuY29uc3QgZ2VuZXJhdGVQb3NzaWJsZU1vdmVzID0gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKSA9PiB7XG4gIC8vICAgZ2VuZXJhdGVzIGFsbCBsZWdhbCBtb3ZlcyBmb3IgYSBrbmlnaHRcbiAgLy8gICBob3cgdG8gZ2V0IGFsbCBwb3NzaWJsZSBtb3ZlcyBmcm9tIFtzdGFydFgsIHN0YXJ0WV0gdG8gW2VuZFgsIGVuZFldP1xuICAvLyAgIGlnbm9yZSBhbHJlYWR5IHZpc2l0ZWQgc3F1YXJlcz9cbiAgLy8gICByZWN1cnNpdmUgZnVuY3Rpb24/XG4gIGNvbnNvbGUubG9nKGBzdGFydFg6ICR7c3RhcnRYfSwgc3RhcnRZOiAke3N0YXJ0WX1gKTtcbiAgY29uc29sZS5sb2coYGVuZFg6ICR7ZW5kWH0sIGVuZFk6ICR7ZW5kWX1gKTtcblxuICAvLyBpZiAoXG4gIC8vICAgKHN0YXJ0WCA9PT0gZW5kWCAmJiBzdGFydFkgPT09IGVuZFkpIHx8XG4gIC8vICAgKHN0YXJ0WCA9PT0gbnVsbCAmJiBzdGFydFkgPT09IG51bGwpIHx8XG4gIC8vICAgKHN0YXJ0WCA9PT0gdW5kZWZpbmVkICYmIHN0YXJ0WSA9PT0gdW5kZWZpbmVkKVxuICAvLyApXG4gIC8vICAgcmV0dXJuIFtdO1xuICAvLyBjb25zb2xlLmxvZyhtZW1vLmZpbmQoKGl0ZW0pID0+IGl0ZW1bMF0gPT09IHN0YXJ0WCAmJiBpdGVtWzFdID09PSBzdGFydFkpKTtcbiAgaWYgKG1lbW8uZmluZCgoaXRlbSkgPT4gaXRlbVswXSA9PT0gc3RhcnRYICYmIGl0ZW1bMV0gPT09IHN0YXJ0WSkpIHJldHVybiBbXTtcbiAgbGV0IG1vdmVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpICs9IDEpIHtcbiAgICAvLyAgdmVydGljYWwgYW5kIGhvcml6b250YWwgbW92ZXNcbiAgICAvLyAgbW92ZXMgMS0yIHNxdWFyZXMgbGVmdC91cCBvciByaWdodC9kb3duXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHZlcnREaXIgPSBpICUgMiAhPT0gMDsgLy8gdHJ1ZSA9PiB1cCwgZmFsc2UgPT4gZG93blxuICAgICAgY29uc3QgaG9yRGlyID0gaiAlIDIgPT09IDA7IC8vIHRydWUgPT4gcmlnaHQsIGZhbHNlID0+IGxlZnRcbiAgICAgIGNvbnN0IG5ld01vdmVWID0gW21vdmUoc3RhcnRYLCAxLCBob3JEaXIpLCBtb3ZlKHN0YXJ0WSwgMiwgdmVydERpcildO1xuICAgICAgY29uc3QgbmV3TW92ZUggPSBbbW92ZShzdGFydFgsIDIsIGhvckRpciksIG1vdmUoc3RhcnRZLCAxLCB2ZXJ0RGlyKV07XG4gICAgICBpZiAobmV3TW92ZVYuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgIT09IG51bGwpKSB7XG4gICAgICAgIG1vdmVzLnB1c2gobmV3TW92ZVYpO1xuICAgICAgICBtZW1vLnB1c2gobmV3TW92ZVYpO1xuICAgICAgfVxuICAgICAgaWYgKG5ld01vdmVILmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ICE9PSBudWxsKSkge1xuICAgICAgICBtb3Zlcy5wdXNoKG5ld01vdmVIKTtcbiAgICAgICAgbWVtby5wdXNoKG5ld01vdmVIKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cobW92ZXMpO1xuICBtb3ZlcyA9IG1vdmVzLmNvbmNhdChtb3Zlcy5tYXAoKGl0ZW0pID0+IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhpdGVtWzBdLCBpdGVtWzFdLCBlbmRYLCBlbmRZKSkpO1xuICByZXR1cm4gbW92ZXM7XG59O1xuXG5jb25zdCBrbmlnaHRNb3ZlcyA9IChzdGFydCwgZW5kKSA9PiB7XG4gIC8vICBzaG93cyB0aGUgc2hvcnRlc3QgcG9zc2libGUgd2F5IHRvIGdldCBmcm9tIG9uZSBzcXVhcmUgdG8gYW5vdGhlclxuICAvLyAgYnkgb3V0cHV0dGluZyBhbGwgc3F1YXJlcyB0aGUga25pZ2h0IHdpbGwgc3RvcCBvbiBhbG9uZyB0aGUgd2F5LlxuICBjb25zdCBzdGFydFggPSBzdGFydFswXTtcbiAgY29uc3Qgc3RhcnRZID0gc3RhcnRbMV07XG4gIGNvbnN0IGVuZFggPSBlbmRbMF07XG4gIGNvbnN0IGVuZFkgPSBlbmRbMV07XG5cbiAgLy8gIEFsbCBwb3NzaWJsZSBtb3ZlcyBuZWVkIHRvIGJlIGdlbmVyYXRlZCBmcm9tIHRoZSBzdGFydGluZyBsb2NhdGlvblxuICAvLyAgQm9hcmQgc2l6ZSA9IDggeCA4XG4gIC8vICBLbmlnaHQgTVVTVCBzdGF5IG9uIHRoZSBib2FyZFxuICAvLyAgICBLbmlnaHRMb2NhdGlvbiBhdCBbLTEsMl0gaXMgb2ZmIHRoZSBib2FyZFxuICAvLyAgICBLbmlnaHRMb2NhdGlvbiA8PSBbNywgN10gJiYgS25pZ2h0TG9jYXRpb24gPj0gWzAsIDBdXG4gIC8vICBTdGFydCBpcyBhIGtuaWdodCdzIG9yaWdpbmFsIGxvY2F0aW9uXG4gIC8vICAgIFRoZSBzdGFydGluZyBsb2NhdGlvbiB3aWxsIGJlIHRoZSByb290IG5vZGUgZm9yIGEgZGF0YSBzdHJ1Y3R1cmVcbiAgLy8gIEVuZCBpcyBhIGtuaWdodCdzIGZpbmFsIGxvY2F0aW9uXG4gIC8vICAgIFRoZSBsb2NhdGlvbiB0aGUga25pZ2h0IG5lZWRzIHRvIGdldCB0byBmcm9tIHRoZSBzdGFydGluZyBsb2NhdGlvblxuICAvLyAgR2VuZXJhdGUgYW4gYXJyYXkgcG9zc2libGUgbW92ZXMgZnJvbSB0aGUgc3RhcnRpbmcgbG9jYXRpb25cbiAgLy8gICAgQXQgbW9zdCwgdGhlcmUgYXJlIDggcG9zc2libGUgbW92ZXMgZnJvbSBhIHN0YXJ0aW5nIGxvY2F0aW9uXG4gIC8vICAgIEF0IGxlYXN0LCB0aGVyZSBhcmUgMiBwb3NzaWJsZSBtb3ZlcyBmcm9tIGEgc3RhcnRpbmcgbG9jYXRpb25cbiAgLy8gIFRoZSBnZW5lcmF0ZWQgcG9zc2libGUgbW92ZXMgYXJlIG5vdyBuZXcgc3RhcnRpbmcgbG9jYXRpb25zXG4gIC8vICAgIFJlY3Vyc2l2ZWx5IGdlbmVyYXRlIGFsbCBwb3NzaWJsZSBmcm9tIHN1YnNlcXVlbnQgbW92ZXNcbiAgLy8gICAgQnV0IHVudGlsIHdoZW4/XG4gIC8vICAgIFdoYXQgaXMgdGhlIGJhc2UgY2FzZT9cblxuICBjb25zdCBwb3NzaWJsZU1vdmVzID0gZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKTtcbiAgY29uc29sZS5sb2cocG9zc2libGVNb3Zlcyk7XG5cbiAgLy8gcG9zc2libGVNb3ZlcyA9IHBvc3NpYmxlTW92ZXMubWFwKChpdGVtKSA9PiB7XG4gIC8vICAgY29uc3QgZm9vID0gZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKGl0ZW1bMF0sIGl0ZW1bMV0sIGVuZFgsIGVuZFkpO1xuICAvLyAgIHJldHVybiBmb287XG4gIC8vIH0pO1xuICAvLyBjb25zb2xlLmxvZyhwb3NzaWJsZU1vdmVzKTtcblxuICBwb3NzaWJsZU1vdmVzLmZvckVhY2goKGl0ZW0pID0+IGNvbnNvbGUubG9nKGl0ZW0pKTtcbiAgLy8gcG9zc2libGVNb3ZlcyA9IHBvc3NpYmxlTW92ZXMubWFwKChpdGVtKSA9PiB7XG4gIC8vICAgY29uc3QgZm9vID0gZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKGl0ZW1bMF0sIGl0ZW1bMV0sIGVuZFgsIGVuZFkpO1xuICAvLyAgIHJldHVybiBmb287XG4gIC8vIH0pO1xuICAvLyBjb25zb2xlLmxvZyhwb3NzaWJsZU1vdmVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGtuaWdodE1vdmVzO1xuXG5jb25zdCBhZGphY2VuY3lNYXRyaXggPSBbXG4gIC8qXG4gIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XSAqL1xuICBbMCwgMCwgMCwgMCwgMCwgMCwgMSwgMF0sIC8vIDdcbiAgWzAsIDAsIDAsIDAsIDAsIDEsIDAsIDFdLCAvLyA2XG4gIFswLCAwLCAwLCAwLCAxLCAwLCAxLCAwXSwgLy8gNVxuICBbMCwgMCwgMCwgMSwgMCwgMSwgMCwgMF0sIC8vIDRcbiAgWzAsIDAsIDEsIDAsIDEsIDAsIDAsIDBdLCAvLyAzXG4gIFswLCAxLCAwLCAxLCAwLCAwLCAwLCAwXSwgLy8gMlxuICBbMSwgMCwgMSwgMCwgMCwgMCwgMCwgMF0sIC8vIDFcbiAgWzAsIDEsIDAsIDAsIDAsIDAsIDAsIDBdLCAvLyAwXG5dO1xuXG5jb25zdCBhZGphY2VuY3lMaXN0ID0gW1sxXSwgWzAsIDJdLCBbMSwgM10sIFsyLCA0XSwgWzMsIDVdLCBbNCwgNl0sIFs1LCA3XSwgWzZdXTtcbi8vIGtuaWdodE1vdmVzKFswLDBdLFs3LDddKSA9PSBbWzAsMF0sWzIsMV0sWzQsMl0sWzYsM10sWzQsNF0sWzYsNV0sWzcsN11dXG4vKlxuXG5rbmlnaHRzIGxlZ2FsIG1vdmVzXG4qKk8gICBPKiogICAgIE8gICBPICBcbk8gICAgICAgTyAgIE8qKiAgICoqT1xuXG5PKiAgICAqTyAgICBPICAgICAgT1xuICogICAgKiAgICAgKiAgICAgICpcbiBPICAgIE8gICAgICpPICAgIE8qXG5cbiovXG4iLCJpbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rZWRMaXN0IHtcbiAgI2hlYWQgPSBudWxsO1xuXG4gICN0YWlsID0gbnVsbDtcblxuICAjc2l6ZSA9IDA7XG5cbiAgYXBwZW5kKHZhbHVlKSB7XG4gICAgLy8gYWRkcyBhIG5ldyBub2RlIGNvbnRhaW5pbmcgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgIGNvbnN0IG5vZGUgPSBuZXcgTm9kZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuI3NpemUgPT09IDApIHtcbiAgICAgIHRoaXMuI2hlYWQgPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0bXAgPSB0aGlzLiN0YWlsO1xuICAgICAgdG1wLm5leHQgPSBub2RlO1xuICAgIH1cbiAgICB0aGlzLiN0YWlsID0gbm9kZTtcbiAgICB0aGlzLiNzaXplICs9IDE7XG4gIH1cblxuICBwcmVwZW5kKHZhbHVlKSB7XG4gICAgLy8gYWRkcyBhIG5ldyBub2RlIGNvbnRhaW5pbmcgdmFsdWUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBsaXN0XG4gICAgY29uc3QgdG1wID0gdGhpcy4jaGVhZDtcbiAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUsIHRtcCk7XG4gICAgdGhpcy4jaGVhZCA9IG5ld05vZGU7XG4gICAgaWYgKHRoaXMuI3NpemUgPT09IDApIHRoaXMuI3RhaWwgPSBuZXdOb2RlO1xuICAgIHRoaXMuI3NpemUgKz0gMTtcbiAgfVxuXG4gIHNpemUoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI3NpemU7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIC8vIHJldHVybnMgdGhlIGZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICByZXR1cm4gdGhpcy4jaGVhZDtcbiAgfVxuXG4gIHRhaWwoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgbGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI3RhaWw7XG4gIH1cblxuICBhdEluZGV4KG4pIHtcbiAgICAvLyByZXR1cm5zIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBpbmRleFxuICAgIGxldCBub2RlID0gIXRoaXMuI2hlYWQgPyAnTGlua2VkIExpc3QgaXMgZW1wdHknIDogdGhpcy4jaGVhZDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAoaW5kZXggPT09IG4pIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKCFub2RlLm5leHQpIHtcbiAgICAgICAgbm9kZSA9IGBObyBub2RlIGZvdW5kIGF0IGluZGV4ICR7bn1gO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHBvcCgpIHtcbiAgICAvLyByZW1vdmVzIHRoZSBsYXN0IGVsZW1lbnQgZnJvbSB0aGUgbGlzdFxuICAgIGlmICh0aGlzLiNzaXplID4gMCkge1xuICAgICAgaWYgKHRoaXMuI3NpemUgPiAxKSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZUxhc3QgPSB0aGlzLmF0SW5kZXgodGhpcy4jc2l6ZSAtIDIpO1xuICAgICAgICBiZWZvcmVMYXN0Lm5leHQgPSBudWxsO1xuICAgICAgICB0aGlzLiN0YWlsID0gYmVmb3JlTGFzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuI3RhaWwgPSBudWxsO1xuICAgICAgICB0aGlzLiNoZWFkID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuYXRJbmRleCgwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuI3NpemUgLT0gMTtcbiAgICB9XG4gIH1cblxuICBjb250YWlucyhxdWVyeSkge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIGluIHZhbHVlIGlzIGluIHRoZSBsaXN0IGFuZCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAgICByZXR1cm4gdGhpcy5maW5kKHF1ZXJ5KSAhPT0gbnVsbDtcbiAgfVxuXG4gIGZpbmQocXVlcnkpIHtcbiAgICAvLyByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbm9kZSBjb250YWluaW5nIHZhbHVlLCBvciBudWxsIGlmIG5vdCBmb3VuZFxuICAgIGxldCBub2RlID0gdGhpcy4jaGVhZDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAobm9kZS52YWx1ZS5ldmVyeSgoaXRlbSwgaSkgPT4gaXRlbSA9PT0gcXVlcnlbaV0pKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cblxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgLy8gcmVwcmVzZW50cyB5b3VyIExpbmtlZExpc3Qgb2JqZWN0cyBhcyBzdHJpbmdzLFxuICAgIC8vIHNvIHlvdSBjYW4gcHJpbnQgdGhlbSBvdXQgYW5kIHByZXZpZXcgdGhlbSBpbiB0aGUgY29uc29sZS5cbiAgICAvLyBUaGUgZm9ybWF0IHNob3VsZCBiZTogKCB2YWx1ZSApIC0+ICggdmFsdWUgKSAtPiAoIHZhbHVlICkgLT4gbnVsbFxuICAgIGxldCBub2RlID0gdGhpcy4jaGVhZDtcbiAgICBsZXQgc3RyaW5nID0gbm9kZSA/ICcnIDogbnVsbDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgc3RyaW5nICs9IGAoICR7bm9kZS52YWx1ZX0gKSAtPiBgO1xuICAgICAgaWYgKCFub2RlLm5leHQpIHtcbiAgICAgICAgc3RyaW5nICs9IGBudWxsYDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgLy8gRXh0cmEgQ3JlZGl0IFRpcDogV2hlbiB5b3UgaW5zZXJ0IG9yIHJlbW92ZSBhIG5vZGUsXG4gIC8vIGNvbnNpZGVyIGhvdyBpdCB3aWxsIGFmZmVjdCB0aGUgZXhpc3Rpbmcgbm9kZXMuXG4gIC8vIFNvbWUgb2YgdGhlIG5vZGVzIHdpbGwgbmVlZCB0aGVpciBuZXh0Tm9kZSBsaW5rIHVwZGF0ZWQuXG4gIGluc2VydEF0KHZhbHVlLCBpbmRleCkge1xuICAgIC8vIGluc2VydHMgYSBuZXcgbm9kZSB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZSBhdCB0aGUgZ2l2ZW4gaW5kZXhcbiAgICBpZiAoaW5kZXggPD0gdGhpcy4jc2l6ZSAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAvLyBjaGVja3MgaWYgdGhlIGluZGV4IGlzIHdpdGhpbiB0aGUgbGlua2VkIGxpc3QncyBzaXplXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgbGVzcyB0aGFuIDBcbiAgICAgIC8vIGluZGV4IGNhbiBuZXZlciBiZSBncmVhdGVyIHRoYW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIC8vIGluc2VydCBub2RlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RcbiAgICAgICAgdGhpcy5wcmVwZW5kKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IHRoaXMuI3NpemUpIHtcbiAgICAgICAgLy8gaW5zZXJ0IG5vZGUgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgICAgICB0aGlzLmFwcGVuZCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbnNlcnQgbm9kZXMgaW4gYmV0d2VlbiBub2Rlc1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5hdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5hdEluZGV4KGluZGV4KTtcbiAgICAgICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLCByaWdodCk7XG4gICAgICAgIGxlZnQubmV4dCA9IG5ld05vZGU7XG4gICAgICAgIHRoaXMuI3NpemUgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBdChpbmRleCkge1xuICAgIC8vIHRoYXQgcmVtb3ZlcyB0aGUgbm9kZSBhdCB0aGUgZ2l2ZW4gaW5kZXhcbiAgICBpZiAoaW5kZXggPCB0aGlzLiNzaXplICYmIGluZGV4ID49IDApIHtcbiAgICAgIC8vIGNoZWNrcyBpZiB0aGUgaW5kZXggaXMgd2l0aGluIHRoZSBsaW5rZWQgbGlzdCdzIHNpemVcbiAgICAgIC8vIGluZGV4IGNhbiBuZXZlciBiZSBsZXNzIHRoYW4gMFxuICAgICAgLy8gaW5kZXggY2FuIG5ldmVyIGJlIGdyZWF0ZXIgdGhhbiB0aGUgbGlua2VkIGxpc3QncyBzaXplXG4gICAgICBpZiAoaW5kZXggKyAxID09PSB0aGlzLiNzaXplKSB7XG4gICAgICAgIHRoaXMucG9wKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuI3NpemUgPiAxICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMuI2hlYWQgPSB0aGlzLmF0SW5kZXgoaW5kZXggKyAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLmF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmF0SW5kZXgoaW5kZXggKyAxKTtcbiAgICAgICAgbGVmdC5uZXh0ID0gcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI3NpemUgLT0gMTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSwgbmV4dCkge1xuICAgIHRoaXMudmFsdWUgPSAhdmFsdWUgPyBudWxsIDogdmFsdWU7XG4gICAgdGhpcy5uZXh0ID0gIW5leHQgPyBudWxsIDogbmV4dDtcbiAgfVxufVxuIiwiaW1wb3J0IGtuaWdodE1vdmVzIGZyb20gJy4vY29udGFpbmVycy9rbmlnaHRfdHJhdmFpbHMnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLi9jb21wb25lbnRzL3Rlc3QnO1xuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbndpbmRvdy5rbmlnaHRNb3ZlcyA9IGtuaWdodE1vdmVzO1xuXG50ZXN0LnByaW50KCk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3QucmVuZGVyKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9