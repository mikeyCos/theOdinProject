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

const memo = [];
// let moo = [];
const generatePossibleMoves = (startX, startY, endX, endY) => {
  //   generates all legal moves for a knight
  //   how to get all possible moves from [startX, startY] to [endX, endY]?
  //   ignore already visited squares?
  //   recursive function?
  // console.log(`startX: ${startX}, startY: ${startY}`);

  // create a node for startX-startY?
  // with a possibleMoves property?
  if (startX === endX && startY === endY) {
    console.log('startX === endX && startY === endY');
    // return { end: [endX, endY] };
  }

  if (memo.find((item) => item.start[0] === startX && item.start[1] === startY))
    return memo.find((item) => item.start[0] === startX && item.start[1] === startY);

  const obj = { start: [startX, startY] };
  const moves = [];
  // let linkedMoves = [];
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
        // const linkedListChild = new LinkedList();
        // linkedListChild.append(newMoveV);
        // linkedMoves.push(linkedListChild);
        const objMove = { start: newMoveV };
        moves.push(objMove);
      }
      if (newMoveH.every((element) => element !== null)) {
        // const linkedListChild = new LinkedList();
        // linkedListChild.append(newMoveH);
        // linkedMoves.push(linkedListChild);
        const objMove = { start: newMoveH };
        moves.push(objMove);
      }
    }
  }

  // const linkedList = new LinkedList();
  // linkedList.append([startX, startY], linkedMoves);
  // console.log(moves);
  // console.log(obj);
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

  // need to generate possible moves for each possible move
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
  // memo = [];
  // console.log(obj);
  // console.log(memo);
  return obj;
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

  // const tree = new Tree(possibleMoves.possibleMoves);
  // console.log(tree);

  // possibleMoves = possibleMoves.map((item) => {
  //   const foo = generatePossibleMoves(item[0], item[1], endX, endY);
  //   return foo;
  // });
  // console.log(possibleMoves);

  // possibleMoves.forEach((item) => console.log(item));
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

  append(value, possibleMoves) {
    // adds a new node containing value to the end of the list
    const node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](value, possibleMoves);
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
  constructor(value, moves, next) {
    this.start = !value ? null : value;
    this.possibleMoves = !moves ? null : moves;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QywrTUFBb0Y7QUFDaEksOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxzQ0FBc0MsZ0dBQWdHLGdGQUFnRixxQkFBcUIsdUJBQXVCLEdBQUcsNEJBQTRCLGVBQWUsY0FBYywyQkFBMkIsR0FBRyxVQUFVLDJCQUEyQiwyQ0FBMkMsb0NBQW9DLHVCQUF1QixHQUFHLG1CQUFtQjtBQUNod0I7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUM3QjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLHNGQUFPLFVBQVUsc0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2JrRDs7QUFFbEQsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHlEQUFJO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJtQztBQUNYOztBQUVYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU8sRUFBRSx5QkFBeUI7QUFDNUU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSx5Q0FBeUMsT0FBTyxFQUFFLHlCQUF5QjtBQUMzRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsNkNBQUk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdURBQVM7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQUk7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxXQUFXO0FBQ3pCLGNBQWMsWUFBWTtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkNBQUk7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDZDQUFJO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hXQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyx1QkFBdUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBLFNBQVMsd0JBQXdCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUNWO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNRO0FBQzNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLE9BQU8sWUFBWSxPQUFPOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdE8wQjs7QUFFWDtBQUNmOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsNkNBQUk7QUFDekI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLHlDQUF5QyxFQUFFO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixZQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDZDQUFJO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcEtlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNOdUQ7QUFDbEI7QUFDaEI7O0FBRXJCLHFCQUFxQixtRUFBVzs7QUFFaEMsd0RBQUk7QUFDSiwwQkFBMEIsd0RBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90ZXN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9iaW5hcnktc2VhcmNoLXRyZWUvYmluYXJ5LXNlYXJjaC10cmVlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9iaW5hcnktc2VhcmNoLXRyZWUvbWVyZ2Utc29ydC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvYmluYXJ5LXNlYXJjaC10cmVlL25vZGUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2tuaWdodF90cmF2YWlscy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvbGlua2VkLWxpc3QvbGlua2VkLWxpc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2xpbmtlZC1saXN0L25vZGUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx1REFBdUQ7RUFDdkQsK0JBQStCO0VBQy9CLDRDQUEyRTtFQUMzRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsc0NBQXNDO0VBQ3RDLCtCQUErQjtFQUMvQixrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIHNyYzogdXJsKC4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgSWNvbiBmcm9tICcuLi9hc3NldHMvaWNvbnMvc2hhcnBfaG9tZS5zdmcnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByaW50KCkge1xuICAgIGNvbnNvbGUubG9nKCdwcmludCgpIHJ1bm5pbmcgZnJvbSB0ZXN0LmpzJyk7XG4gICAgY29uc29sZS5sb2coJ3Rlc3RpbmcuLi4nKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCBmb28gPSBcInRlc3RcIjtcblxuICAgIGNvbnN0IGljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBpY29uLnNyYyA9IEljb247XG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gJ0xvcmVtIGlwc3VtIHNvbWV0aGluZyBzb21ldGhpbmcuLi4nO1xuXG4gICAgZGl2LmFwcGVuZENoaWxkKGljb24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuICAgIHJldHVybiBkaXY7XG4gIH0sXG59O1xuIiwiaW1wb3J0IG1lcmdlU29ydCBmcm9tICcuL21lcmdlLXNvcnQnO1xuaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZSB7XG4gIC8vIEFjY2VwdHMgYW4gYXJyYXkgd2hlbiBpbml0aWFsaXplZC5cbiAgLy8gVGhlIFRyZWUgY2xhc3Mgc2hvdWxkIGhhdmUgYSByb290IGF0dHJpYnV0ZSwgd2hpY2ggdXNlcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGJ1aWxkVHJlZVxuICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZShhcnIpO1xuICB9XG5cbiAgcHJldHR5UHJpbnQgPSAobm9kZSA9IHRoaXMucm9vdCwgcHJlZml4ID0gJycsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wcmV0dHlQcmludChub2RlLnJpZ2h0Tm9kZSwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUgiAgICcgOiAnICAgICd9YCwgZmFsc2UpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSU4pSA4pSAICcgOiAn4pSM4pSA4pSAICd9JHtub2RlLmRhdGF9YCk7XG4gICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wcmV0dHlQcmludChub2RlLmxlZnROb2RlLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAnICAgICcgOiAn4pSCICAgJ31gLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgI3NvcnRlZEFycmF5VG9CU1QgPSAoYXJyLCBzdGFydCwgZW5kKSA9PiB7XG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG1pZFBvaW50ID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XG4gICAgY29uc3Qgcm9vdE5vZGUgPSBuZXcgTm9kZShhcnJbbWlkUG9pbnRdKTtcbiAgICByb290Tm9kZS5sZWZ0Tm9kZSA9IHRoaXMuI3NvcnRlZEFycmF5VG9CU1QoYXJyLCBzdGFydCwgbWlkUG9pbnQgLSAxKTtcbiAgICByb290Tm9kZS5yaWdodE5vZGUgPSB0aGlzLiNzb3J0ZWRBcnJheVRvQlNUKGFyciwgbWlkUG9pbnQgKyAxLCBlbmQpO1xuICAgIC8vIGNvbnN0IGNoaWxkTm9kZU9uZSA9IHNvcnRlZEFycmF5VG9CU1QoYXJyLCBzdGFydCwgbWlkUG9pbnQgLSAxKTtcbiAgICAvLyBjb25zdCBjaGlsZE5vZGVUd28gPSBzb3J0ZWRBcnJheVRvQlNUKGFyciwgbWlkUG9pbnQgKyAxLCBlbmQpO1xuXG4gICAgLy8gaWYgKGNoaWxkTm9kZU9uZSkge1xuICAgIC8vICAgaWYgKHJvb3ROb2RlLmRhdGEgPCBjaGlsZE5vZGVPbmUuZGF0YSkge1xuICAgIC8vICAgICByb290Tm9kZS5yaWdodE5vZGUgPSBjaGlsZE5vZGVPbmU7XG4gICAgLy8gICB9IGVsc2UgaWYgKHJvb3ROb2RlLmRhdGEgPiBjaGlsZE5vZGVPbmUuZGF0YSkge1xuICAgIC8vICAgICByb290Tm9kZS5sZWZ0Tm9kZSA9IGNoaWxkTm9kZU9uZTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy8gY29uc29sZS5sb2cocm9vdE5vZGUpO1xuICAgIC8vIGlmIChjaGlsZE5vZGVUd28pIHtcbiAgICAvLyAgIGlmIChyb290Tm9kZS5kYXRhIDwgY2hpbGROb2RlVHdvLmRhdGEpIHtcbiAgICAvLyAgICAgcm9vdE5vZGUucmlnaHROb2RlID0gY2hpbGROb2RlVHdvO1xuICAgIC8vICAgfSBlbHNlIGlmIChyb290Tm9kZS5kYXRhID4gY2hpbGROb2RlVHdvLmRhdGEpIHtcbiAgICAvLyAgICAgcm9vdE5vZGUubGVmdE5vZGUgPSBjaGlsZE5vZGVUd287XG4gICAgLy8gICB9XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlO1xuICB9O1xuXG4gIGJ1aWxkVHJlZSA9IChhcnIpID0+IHtcbiAgICAvLyBUYWtlcyBhbiBhcnJheSBvZiBkYXRhIChlLmcuLCBbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjRdKVxuICAgIC8vIFR1cm5zIGl0IGludG8gYSBiYWxhbmNlZCBiaW5hcnkgdHJlZSBmdWxsIG9mIE5vZGUgb2JqZWN0cyBhcHByb3ByaWF0ZWx5IHBsYWNlZFxuICAgIC8vIChkb27igJl0IGZvcmdldCB0byBzb3J0IGFuZCByZW1vdmUgZHVwbGljYXRlcyEpLlxuICAgIC8vIFRoZSBidWlsZFRyZWUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgbGV2ZWwtMCByb290IG5vZGUuXG4gICAgY29uc3Qgc29ydGVkQXJyID0gbWVyZ2VTb3J0KGFycik7XG4gICAgcmV0dXJuIHRoaXMuI3NvcnRlZEFycmF5VG9CU1Qoc29ydGVkQXJyLCAwLCBzb3J0ZWRBcnIubGVuZ3RoIC0gMSk7XG4gICAgLy8gcmV0dXJuIHNvcnRlZEFycmF5VG9CU1QoYXJyLCAwLCBhcnIubGVuZ3RoIC0gMSk7XG4gIH07XG5cbiAgaW5zZXJ0Tm9kZSA9ICh2YWx1ZSwgbm9kZSA9IHRoaXMucm9vdCkgPT4ge1xuICAgIC8vIEltcGxlbWVudGF0aW9uIG9mIHRoZXNlIG1ldGhvZHMgc2hvdWxkIHRyYXZlcnNlIHRoZSB0cmVlIGFuZCBtYW5pcHVsYXRlIHRoZSBub2RlcyBhbmQgdGhlaXIgY29ubmVjdGlvbnMuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgdW5kZWZpbmVkJyk7XG4gICAgbGV0IG5ld05vZGUgPSBub2RlO1xuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUpO1xuICAgICAgaWYgKCF0aGlzLnJvb3QpIHRoaXMucm9vdCA9IG5ld05vZGU7XG4gICAgICByZXR1cm4gbmV3Tm9kZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5kYXRhIDwgdmFsdWUpIHtcbiAgICAgIG5ld05vZGUucmlnaHROb2RlID0gdGhpcy5pbnNlcnROb2RlKHZhbHVlLCBub2RlLnJpZ2h0Tm9kZSk7XG4gICAgfSBlbHNlIGlmIChub2RlLmRhdGEgPiB2YWx1ZSkge1xuICAgICAgbmV3Tm9kZS5sZWZ0Tm9kZSA9IHRoaXMuaW5zZXJ0Tm9kZSh2YWx1ZSwgbm9kZS5sZWZ0Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05vZGU7XG4gICAgLy8gaXRlcmF0aXZlIGFwcHJvYWNoXG4gICAgLy8gY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlKTtcbiAgICAvLyBpZiAodGhpcy5yb290ID09PSBudWxsKSB7XG4gICAgLy8gICB0aGlzLiNzZXRSb290KG5ld05vZGUpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBsZXQgbm9kZSA9IHRoaXMucm9vdDtcbiAgICAvLyAgIHdoaWxlIChub2RlKSB7XG4gICAgLy8gICAgIGlmIChub2RlLmRhdGEgPCB2YWx1ZSkge1xuICAgIC8vICAgICAgIC8vIGdvIHJpZ2h0XG4gICAgLy8gICAgICAgaWYgKG5vZGUucmlnaHROb2RlID09PSBudWxsKSB7XG4gICAgLy8gICAgICAgICBub2RlLnJpZ2h0Tm9kZSA9IG5ld05vZGU7XG4gICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Tm9kZTtcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0gZWxzZSBpZiAobm9kZS5kYXRhID4gdmFsdWUpIHtcbiAgICAvLyAgICAgICAvLyBnbyBsZWZ0XG4gICAgLy8gICAgICAgaWYgKG5vZGUubGVmdE5vZGUgPT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIG5vZGUubGVmdE5vZGUgPSBuZXdOb2RlO1xuICAgIC8vICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBub2RlID0gbm9kZS5sZWZ0Tm9kZTtcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgLy8gZHVwbGljYXRlIGZvdW5kXG4gICAgLy8gICAgICAgYnJlYWs7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH07XG5cbiAgZmluZCA9ICh2YWx1ZSwgbm9kZSA9IHRoaXMucm9vdCkgPT4ge1xuICAgIC8vIEFjY2VwdHMgYSB2YWx1ZSBhbmQgcmV0dXJucyB0aGUgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCB1bmRlZmluZWQnKTtcbiAgICBsZXQgbmV4dE5vZGUgPSBub2RlO1xuICAgIGlmIChuZXh0Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKG5leHROb2RlLmRhdGEgPT09IHZhbHVlKSByZXR1cm4gbmV4dE5vZGU7XG5cbiAgICBpZiAobm9kZS5kYXRhID4gdmFsdWUpIG5leHROb2RlID0gdGhpcy5maW5kKHZhbHVlLCBub2RlLmxlZnROb2RlKTtcbiAgICBpZiAobm9kZS5kYXRhIDwgdmFsdWUpIG5leHROb2RlID0gdGhpcy5maW5kKHZhbHVlLCBub2RlLnJpZ2h0Tm9kZSk7XG4gICAgcmV0dXJuIG5leHROb2RlO1xuICB9O1xuXG4gICNwcmVkZWNlc3NvciA9ICh2YWx1ZSwgbm9kZSA9IHRoaXMucm9vdCkgPT4ge1xuICAgIC8vIHJldHVybnMgcHJlZGVjZXNzb3Igbm9kZSBvZiBnaXZlbiB2YWx1ZVxuICAgIC8vIGhvdyB0byByZWZhY3RvciB0aGlzP1xuICAgIGxldCBuZXh0Tm9kZSA9IG5vZGU7XG4gICAgaWYgKG5leHROb2RlID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoXG4gICAgICAobmV4dE5vZGUubGVmdE5vZGUgJiYgbmV4dE5vZGUubGVmdE5vZGUuZGF0YSA9PT0gdmFsdWUpIHx8XG4gICAgICAobmV4dE5vZGUucmlnaHROb2RlICYmIG5leHROb2RlLnJpZ2h0Tm9kZS5kYXRhID09PSB2YWx1ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5kYXRhID4gdmFsdWUpIG5leHROb2RlID0gdGhpcy4jcHJlZGVjZXNzb3IodmFsdWUsIG5leHROb2RlLmxlZnROb2RlKTtcbiAgICBpZiAobm9kZS5kYXRhIDwgdmFsdWUpIG5leHROb2RlID0gdGhpcy4jcHJlZGVjZXNzb3IodmFsdWUsIG5leHROb2RlLnJpZ2h0Tm9kZSk7XG5cbiAgICByZXR1cm4gbmV4dE5vZGU7XG4gIH07XG5cbiAgZGVsZXRlTm9kZSA9ICh2YWx1ZSkgPT4ge1xuICAgIC8vIEltcGxlbWVudGF0aW9uIG9mIHRoZXNlIG1ldGhvZHMgc2hvdWxkIHRyYXZlcnNlIHRoZSB0cmVlIGFuZCBtYW5pcHVsYXRlIHRoZSBub2RlcyBhbmQgdGhlaXIgY29ubmVjdGlvbnMuXG4gICAgLy8gVGhlcmUgd2lsbCBiZSBzZXZlcmFsIGNhc2VzIGZvciBkZWxldGUsIHN1Y2ggYXMgd2hlbiBhIG5vZGUgaGFzIGNoaWxkcmVuIG9yIG5vdC5cbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCB1bmRlZmluZWQnKTtcbiAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy5maW5kKHZhbHVlKTtcbiAgICBpZiAodGFyZ2V0Tm9kZSkge1xuICAgICAgY29uc3QgeyBsZWZ0Tm9kZSB9ID0gdGFyZ2V0Tm9kZTtcbiAgICAgIGNvbnN0IHsgcmlnaHROb2RlIH0gPSB0YXJnZXROb2RlO1xuICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuI3ByZWRlY2Vzc29yKHZhbHVlKTtcblxuICAgICAgaWYgKGxlZnROb2RlICYmIHJpZ2h0Tm9kZSkge1xuICAgICAgICAvLyBoYXMgMiBjaGlsZHJlblxuICAgICAgICBsZXQgc3VjY2Vzc29yID0gcmlnaHROb2RlO1xuICAgICAgICB3aGlsZSAoc3VjY2Vzc29yKSB7XG4gICAgICAgICAgLy8gZmluZHMgc3VjY2Vzc29yXG4gICAgICAgICAgaWYgKCFzdWNjZXNzb3IubGVmdE5vZGUpIGJyZWFrO1xuICAgICAgICAgIHN1Y2Nlc3NvciA9IHN1Y2Nlc3Nvci5sZWZ0Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NvclJpZ2h0Tm9kZSA9IHN1Y2Nlc3Nvci5yaWdodE5vZGU7XG4gICAgICAgIGNvbnN0IHBhcmVudFN1Y2Nlc3NvciA9IHRoaXMuI3ByZWRlY2Vzc29yKHN1Y2Nlc3Nvci5kYXRhKTtcbiAgICAgICAgcGFyZW50U3VjY2Vzc29yLmxlZnROb2RlID0gbnVsbDtcbiAgICAgICAgaWYgKCFzdWNjZXNzb3IubGVmdE5vZGUgJiYgc3VjY2Vzc29yLnJpZ2h0Tm9kZSkge1xuICAgICAgICAgIGlmIChwYXJlbnRTdWNjZXNzb3IuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGlmIHBhcmVudFN1Y2Nlc3NvciBpcyB0aGUgbm9kZSB0byBkZWxldGVcbiAgICAgICAgICAgIHN1Y2Nlc3Nvci5yaWdodE5vZGUgPSBzdWNjZXNzb3JSaWdodE5vZGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudFN1Y2Nlc3Nvci5sZWZ0Tm9kZSA9IHN1Y2Nlc3NvclJpZ2h0Tm9kZTtcbiAgICAgICAgICAgIHN1Y2Nlc3Nvci5yaWdodE5vZGUgPSByaWdodE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdWNjZXNzb3IubGVmdE5vZGUgJiYgIXN1Y2Nlc3Nvci5yaWdodE5vZGUpIHtcbiAgICAgICAgICAvLyBpZiBzdWNjZXNzb3IgaXMgYSBsZWFmIG5vZGVcbiAgICAgICAgICBzdWNjZXNzb3IucmlnaHROb2RlID0gcGFyZW50U3VjY2Vzc29yLmRhdGEgPT09IHZhbHVlID8gbnVsbCA6IHJpZ2h0Tm9kZTtcbiAgICAgICAgICAvLyBpZiBwYXJlbnRTdWNjZXNzb3IgaXMgdGhlIG5vZGUgdG8gZGVsZXRlXG4gICAgICAgICAgLy8gIHNldCB0aGUgc3VjY2Vzc29yJ3MgcmlnaHROb2RlIHRvIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHN1Y2Nlc3Nvci5sZWZ0Tm9kZSA9IGxlZnROb2RlO1xuXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Tm9kZSAmJiBwYXJlbnROb2RlLnJpZ2h0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgIC8vIGlmIG5vZGUgdG8gZGVsZXRlIGlzIHRvIHRoZSByaWdodCBvZiB0aGUgcGFyZW50Tm9kZVxuICAgICAgICAgIHBhcmVudE5vZGUucmlnaHROb2RlID0gc3VjY2Vzc29yO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudE5vZGUubGVmdE5vZGUgJiYgcGFyZW50Tm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgIC8vIGlmIG5vZGUgdG8gZGVsZXRlIGlzIHRvIHRoZSBsZWZ0IG9mIHRoZSBwYXJlbnROb2RlXG4gICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Tm9kZSA9IHN1Y2Nlc3NvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBub2RlIHRvIGRlbGV0ZSBpcyB0aGUgcm9vdCBub2RlXG4gICAgICAgICAgdGhpcy5yb290ID0gc3VjY2Vzc29yO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxlZnROb2RlIHx8IHJpZ2h0Tm9kZSkge1xuICAgICAgICAvLyBub2RlIHRvIGRlbGV0ZSBoYXMgMSBjaGlsZFxuICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodE5vZGUgJiYgcGFyZW50Tm9kZS5yaWdodE5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Tm9kZSA9ICFsZWZ0Tm9kZSA/IHJpZ2h0Tm9kZSA6IGxlZnROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudE5vZGUubGVmdE5vZGUgJiYgcGFyZW50Tm9kZS5sZWZ0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgIHBhcmVudE5vZGUubGVmdE5vZGUgPSAhcmlnaHROb2RlID8gbGVmdE5vZGUgOiByaWdodE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yb290ID0gIXJpZ2h0Tm9kZSA/IGxlZnROb2RlIDogcmlnaHROb2RlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0aGlzLnJvb3QuZGF0YSA9PT0gdmFsdWUpIHRoaXMucm9vdCA9ICFyaWdodE5vZGUgPyBsZWZ0Tm9kZSA6IHJpZ2h0Tm9kZTtcbiAgICAgIH0gZWxzZSBpZiAoIXJpZ2h0Tm9kZSAmJiAhbGVmdE5vZGUpIHtcbiAgICAgICAgLy8gbm9kZSB0byBkZWxldGUgaXMgYSBsZWFmIG5vZGUsIG5vIGNoaWxkcmVuXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Tm9kZSAmJiBwYXJlbnROb2RlLnJpZ2h0Tm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgIHBhcmVudE5vZGUucmlnaHROb2RlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJlbnROb2RlLmxlZnROb2RlICYmIHBhcmVudE5vZGUubGVmdE5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBwYXJlbnROb2RlLmxlZnROb2RlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyAodGhpcy5yb290LmRhdGEgPT09IHZhbHVlKVxuICAgICAgICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBkb2VzIG5vdCBleGlzdCBpbiB0cmVlLicpO1xuICAgIH1cbiAgfTtcblxuICBsZXZlbE9yZGVyID0gKGNhbGxiYWNrLCBhcnIgPSBbXSwgcXVldWUgPSBbdGhpcy5yb290XSkgPT4ge1xuICAgIC8vIEFjY2VwdHMgYSByYW5kb20gT1BUSU9OQUwgY2FsbGJhY2sgZnVuY3Rpb24gYXMgaXRzIHBhcmFtZXRlclxuICAgIC8vIFRyYXZlcnNlIHRoZSB0cmVlIGluIGJyZWFkdGgtZmlyc3QgbGV2ZWwgb3JkZXIgYW5kIHByb3ZpZGUgZWFjaCBub2RlIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBjYWxsYmFjay5cbiAgICAvLyBUaGUgY2FsbGJhY2sgd2lsbCBwZXJmb3JtIGFuIG9wZXJhdGlvbiBvbiBlYWNoIG5vZGUgZm9sbG93aW5nIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IGFyZSB0cmF2ZXJzZWQuXG4gICAgLy8gVGhlIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cbiAgICAvLyBZb3Ugd2lsbCB3YW50IHRvIHVzZSBhbiBhcnJheSBhY3RpbmcgYXMgYSBxdWV1ZSB0byBrZWVwIHRyYWNrIG9mIGFsbCB0aGUgY2hpbGQgbm9kZXMgdGhhdCB5b3UgaGF2ZSB5ZXQgdG8gdHJhdmVyc2UgYW5kIHRvIGFkZCBuZXcgb25lcyB0byB0aGUgbGlzdFxuICAgIGlmICh0aGlzLnJvb3QgPT09IG51bGwgfHwgcXVldWUubGVuZ3RoID09PSAwKSByZXR1cm4gYXJyO1xuICAgIGNvbnN0IGRlcXVldWUgPSBxdWV1ZS5zaGlmdCgpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soZGVxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyci5wdXNoKGRlcXVldWUuZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKGRlcXVldWUubGVmdE5vZGUpIHF1ZXVlLnB1c2goZGVxdWV1ZS5sZWZ0Tm9kZSk7XG4gICAgaWYgKGRlcXVldWUucmlnaHROb2RlKSBxdWV1ZS5wdXNoKGRlcXVldWUucmlnaHROb2RlKTtcblxuICAgIHRoaXMubGV2ZWxPcmRlcihjYWxsYmFjaywgYXJyLCBxdWV1ZSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrID8gdW5kZWZpbmVkIDogYXJyO1xuXG4gICAgLy8gaXRlcmF0aXZlIGFwcHJvYWNoXG4gICAgLy8gY29uc3QgYXJyID0gW107XG4gICAgLy8gY29uc3QgcXVldWUgPSBbXTtcbiAgICAvLyBpZiAodGhpcy5yb290KSBxdWV1ZS5wdXNoKHRoaXMucm9vdCk7XG4gICAgLy8gd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgIGNvbnN0IGRlcXVldWUgPSBxdWV1ZS5zcGxpY2UoMCwgMSlbMF07XG4gICAgLy8gICBpZiAoY2FsbGJhY2spIHtcbiAgICAvLyAgICAgY2FsbGJhY2soZGVxdWV1ZSk7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBhcnIucHVzaChkZXF1ZXVlLmRhdGEpO1xuICAgIC8vICAgfVxuICAgIC8vICAgaWYgKGRlcXVldWUubGVmdE5vZGUpIHF1ZXVlLnB1c2goZGVxdWV1ZS5sZWZ0Tm9kZSk7XG4gICAgLy8gICBpZiAoZGVxdWV1ZS5yaWdodE5vZGUpIHF1ZXVlLnB1c2goZGVxdWV1ZS5yaWdodE5vZGUpO1xuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gY2FsbGJhY2sgPyB1bmRlZmluZWQgOiBhcnI7XG4gIH07XG5cbiAgaW5PcmRlciA9IChjYWxsYmFjaywgbm9kZSA9IHRoaXMucm9vdCwgYXJyID0gW10pID0+IHtcbiAgICAvLyBsZWZ0ID0+IHJvb3QgPT4gcmlnaHRcbiAgICAvLyBlbGVtZW50cyBvZiB0aGUgYXJyYXkgd2lsbCBiZSBpbiBvcmRlclxuICAgIC8vIEFjY2VwdHMgYSByYW5kb20gb3B0aW9uYWwgY2FsbGJhY2sgYXMgYSBwYXJhbWV0ZXIuXG4gICAgLy8gVHJhdmVyc2UgdGhlIHRyZWUgaW4gdGhlaXIgcmVzcGVjdGl2ZSBkZXB0aC1maXJzdCBvcmRlciBhbmQgeWllbGQgZWFjaCBub2RlIHRvIHRoZSBwcm92aWRlZCBjYWxsYmFjay5cbiAgICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHRoaXMuaW5PcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0Tm9kZSwgYXJyKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhub2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKG5vZGUuZGF0YSk7XG4gICAgICB9XG4gICAgICB0aGlzLmluT3JkZXIoY2FsbGJhY2ssIG5vZGUucmlnaHROb2RlLCBhcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBjYWxsYmFjayA/IHVuZGVmaW5lZCA6IGFycjtcbiAgfTtcblxuICBwcmVPcmRlciA9IChjYWxsYmFjaywgbm9kZSA9IHRoaXMucm9vdCwgYXJyID0gW10pID0+IHtcbiAgICAvLyByb290ID0+IGxlZnQgPT4gcmlnaHRcbiAgICAvLyBBY2NlcHRzIGEgcmFuZG9tIG9wdGlvbmFsIGNhbGxiYWNrIGFzIGEgcGFyYW1ldGVyLlxuICAgIC8vIFRyYXZlcnNlIHRoZSB0cmVlIGluIHRoZWlyIHJlc3BlY3RpdmUgZGVwdGgtZmlyc3Qgb3JkZXIgYW5kIHlpZWxkIGVhY2ggbm9kZSB0byB0aGUgcHJvdmlkZWQgY2FsbGJhY2suXG4gICAgLy8gUmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cblxuICAgIGlmIChub2RlKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChub2RlLmRhdGEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByZU9yZGVyKGNhbGxiYWNrLCBub2RlLmxlZnROb2RlLCBhcnIpO1xuICAgICAgdGhpcy5wcmVPcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodE5vZGUsIGFycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gdW5kZWZpbmVkIDogYXJyO1xuICB9O1xuXG4gIHBvc3RPcmRlciA9IChjYWxsYmFjaywgbm9kZSA9IHRoaXMucm9vdCwgYXJyID0gW10pID0+IHtcbiAgICAvLyBsZWZ0ID0+IHJpZ2h0ID0+IHJvb3RcbiAgICAvLyBBY2NlcHRzIGEgcmFuZG9tIG9wdGlvbmFsIGNhbGxiYWNrIGFzIGEgcGFyYW1ldGVyLlxuICAgIC8vIFRyYXZlcnNlIHRoZSB0cmVlIGluIHRoZWlyIHJlc3BlY3RpdmUgZGVwdGgtZmlyc3Qgb3JkZXIgYW5kIHlpZWxkIGVhY2ggbm9kZSB0byB0aGUgcHJvdmlkZWQgY2FsbGJhY2suXG4gICAgLy8gUmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cblxuICAgIGlmIChub2RlKSB7XG4gICAgICB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0Tm9kZSwgYXJyKTtcbiAgICAgIHRoaXMucG9zdE9yZGVyKGNhbGxiYWNrLCBub2RlLnJpZ2h0Tm9kZSwgYXJyKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhub2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKG5vZGUuZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gdW5kZWZpbmVkIDogYXJyO1xuICB9O1xuXG4gIGhlaWdodCA9IChub2RlKSA9PiB7XG4gICAgLy8gQWNjZXB0cyBhIG5vZGUgYW5kIHJldHVybnMgaXRzIGhlaWdodC5cbiAgICAvLyBIZWlnaHQgaXMgZGVmaW5lZCBhcyB0aGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBsb25nZXN0IHBhdGggZnJvbSBhIGdpdmVuIG5vZGUgdG8gYSBsZWFmIG5vZGUuXG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiAtMTtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTm9kZSkpIHJldHVybiBuZXcgRXJyb3IoJ0luY29ycmVjdCBwYXJhbWV0ZXIgdHlwZS4nKTtcblxuICAgIGNvbnN0IGxlZnROb2RlSGVpZ2h0ID0gdGhpcy5oZWlnaHQobm9kZS5sZWZ0Tm9kZSk7XG4gICAgY29uc3QgcmlnaHROb2RlSGVpZ2h0ID0gdGhpcy5oZWlnaHQobm9kZS5yaWdodE5vZGUpO1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KGxlZnROb2RlSGVpZ2h0LCByaWdodE5vZGVIZWlnaHQpICsgMTtcbiAgfTtcblxuICBkZXB0aCA9IChub2RlLCBuZXh0Tm9kZSA9IHRoaXMucm9vdCkgPT4ge1xuICAgIC8vIEFjY2VwdHMgYSBub2RlIGFuZCByZXR1cm5zIGl0cyBkZXB0aC5cbiAgICAvLyBEZXB0aCBpcyBkZWZpbmVkIGFzIHRoZSBudW1iZXIgb2YgZWRnZXMgaW4gdGhlIHBhdGggZnJvbSBhIGdpdmVuIG5vZGUgdG8gdGhlIHRyZWXigJlzIHJvb3Qgbm9kZS5cbiAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgcGFyYW1ldGVyLicpO1xuICAgIGlmIChuZXh0Tm9kZS5kYXRhID09PSBub2RlLmRhdGEpIHJldHVybiAwO1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuIG5ldyBFcnJvcignSW5jb3JyZWN0IHBhcmFtZXRlciB0eXBlLicpO1xuICAgIGxldCBkZXB0aE51bSA9IDA7XG4gICAgaWYgKG5vZGUuZGF0YSA8IG5leHROb2RlLmRhdGEpIGRlcHRoTnVtID0gdGhpcy5kZXB0aChub2RlLCBuZXh0Tm9kZS5sZWZ0Tm9kZSkgKyAxO1xuICAgIGlmIChub2RlLmRhdGEgPiBuZXh0Tm9kZS5kYXRhKSBkZXB0aE51bSA9IHRoaXMuZGVwdGgobm9kZSwgbmV4dE5vZGUucmlnaHROb2RlKSArIDE7XG5cbiAgICByZXR1cm4gZGVwdGhOdW07XG4gIH07XG5cbiAgaXNCYWxhbmNlZCA9IChub2RlID0gdGhpcy5yb290KSA9PiB7XG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB0cmVlIGlzIGJhbGFuY2VkLlxuICAgIC8vIEEgYmFsYW5jZWQgdHJlZSBpcyBvbmUgd2hlcmUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBoZWlnaHRzIG9mIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAvLyBhbmQgdGhlIHJpZ2h0IHN1YnRyZWUgb2YgZXZlcnkgbm9kZSBpcyBub3QgbW9yZSB0aGFuIDEuXG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBsZWZ0U3VidHJlZUhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdE5vZGUpO1xuICAgIGNvbnN0IHJpZ2h0U3VidHJlZUhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHROb2RlKTtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gbGVmdFN1YnRyZWVIZWlnaHQgLSByaWdodFN1YnRyZWVIZWlnaHQ7XG4gICAgaWYgKGRpZmZlcmVuY2UgPD0gMSAmJiBkaWZmZXJlbmNlID49IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0JhbGFuY2VkKG5vZGUubGVmdE5vZGUpICYmIHRoaXMuaXNCYWxhbmNlZChub2RlLnJpZ2h0Tm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZWJhbGFuY2UgPSAoKSA9PiB7XG4gICAgLy8gUmViYWxhbmNlcyBhbiB1bmJhbGFuY2VkIHRyZWUuXG4gICAgLy8gWW914oCZbGwgd2FudCB0byB1c2UgYSB0cmF2ZXJzYWwgbWV0aG9kIHRvIHByb3ZpZGUgYSBuZXcgYXJyYXkgdG8gdGhlIGJ1aWxkVHJlZSBmdW5jdGlvbi5cbiAgICBpZiAoIXRoaXMuaXNCYWxhbmNlZCgpKSB7XG4gICAgICBjb25zdCBzb3J0ZWRBcnJheSA9IHRoaXMuaW5PcmRlcigpO1xuICAgICAgdGhpcy5yb290ID0gdGhpcy5idWlsZFRyZWUoc29ydGVkQXJyYXkpO1xuICAgIH1cbiAgfTtcbn1cbiIsImNvbnN0IG1lcmdlU29ydCA9IChhcnIpID0+IHtcbiAgaWYgKGFyci5sZW5ndGggPD0gMSkgcmV0dXJuIGFycjtcbiAgY29uc3QgbWlkUG9pbnQgPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKTtcblxuICBjb25zdCBsZWZ0ID0gYXJyLnNsaWNlKDAsIG1pZFBvaW50KTtcbiAgY29uc3QgcmlnaHQgPSBhcnIuc2xpY2UobWlkUG9pbnQpO1xuICBjb25zdCBzb3J0ZWRMZWZ0ID0gbWVyZ2VTb3J0KGxlZnQpO1xuICBjb25zdCBzb3J0ZWRSaWdodCA9IG1lcmdlU29ydChyaWdodCk7XG4gIGNvbnN0IHNvcnRlZEFyciA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgbGV0IGogPSAwO1xuICBsZXQgayA9IDA7XG5cbiAgd2hpbGUgKGkgPCBzb3J0ZWRMZWZ0Lmxlbmd0aCAmJiBqIDwgc29ydGVkUmlnaHQubGVuZ3RoKSB7XG4gICAgaWYgKHNvcnRlZExlZnRbaV0gPCBzb3J0ZWRSaWdodFtqXSkge1xuICAgICAgc29ydGVkQXJyW2tdID0gc29ydGVkTGVmdFtpXTtcbiAgICAgIGkgKz0gMTtcbiAgICB9IGVsc2UgaWYgKHNvcnRlZExlZnRbaV0gPiBzb3J0ZWRSaWdodFtqXSkge1xuICAgICAgc29ydGVkQXJyW2tdID0gc29ydGVkUmlnaHRbal07XG4gICAgICBqICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRlZEFycltrXSA9IHNvcnRlZFJpZ2h0W2pdO1xuICAgICAgaSArPSAxO1xuICAgICAgaiArPSAxO1xuICAgIH1cbiAgICBrICs9IDE7XG4gIH1cblxuICBmb3IgKDsgaSA8IHNvcnRlZExlZnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRMZWZ0W2ldO1xuICAgIGsgKz0gMTtcbiAgfVxuXG4gIGZvciAoOyBqIDwgc29ydGVkUmlnaHQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICBzb3J0ZWRBcnJba10gPSBzb3J0ZWRSaWdodFtqXTtcbiAgICBrICs9IDE7XG4gIH1cblxuICByZXR1cm4gc29ydGVkQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VTb3J0O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmxlZnROb2RlID0gbnVsbDtcbiAgICB0aGlzLnJpZ2h0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTGlua2VkTGlzdCBmcm9tICcuL2xpbmtlZC1saXN0L2xpbmtlZC1saXN0JztcbmltcG9ydCBUcmVlIGZyb20gJy4vYmluYXJ5LXNlYXJjaC10cmVlL2JpbmFyeS1zZWFyY2gtdHJlZSc7XG4vKlxuSXRzIGJhc2ljIG1vdmUgaXMgdHdvIHN0ZXBzIGZvcndhcmQgYW5kIG9uZSBzdGVwIHRvIHRoZSBzaWRlXG5vciBvbmUgc3RlcCBmb3J3YXJkIGFuZCB0d28gc3RlcHMgdG8gdGhlIHNpZGUuIEl0IGNhbiBmYWNlIGFueSBkaXJlY3Rpb24uXG5cbllvdSBjYW4gdGhpbmsgb2YgdGhlIGJvYXJkIGFzIGhhdmluZyAyLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVzLlxuWW91ciBmdW5jdGlvbiB3b3VsZCB0aGVyZWZvcmUgbG9vayBsaWtlOlxua25pZ2h0TW92ZXMoWzAsMF0sWzEsMl0pID09IFtbMCwwXSxbMSwyXV1cblxuMS4gVGhpbmsgYWJvdXQgdGhlIHJ1bGVzIG9mIHRoZSBib2FyZCBhbmQga25pZ2h0LCBhbmQgbWFrZSBzdXJlIHRvIGZvbGxvdyB0aGVtLlxuMi4gRm9yIGV2ZXJ5IHNxdWFyZSB0aGVyZSBpcyBhIG51bWJlciBvZiBwb3NzaWJsZSBtb3ZlcyxcbmNob29zZSBhIGRhdGEgc3RydWN0dXJlIHRoYXQgd2lsbCBhbGxvdyB5b3UgdG8gd29yayB3aXRoIHRoZW0uXG5Eb27igJl0IGFsbG93IGFueSBtb3ZlcyB0byBnbyBvZmYgdGhlIGJvYXJkLlxuMy4gRGVjaWRlIHdoaWNoIHNlYXJjaCBhbGdvcml0aG0gaXMgYmVzdCB0byB1c2UgZm9yIHRoaXMgY2FzZS5cbkhpbnQ6IG9uZSBvZiB0aGVtIGNvdWxkIGJlIGEgcG90ZW50aWFsbHkgaW5maW5pdGUgc2VyaWVzLlxuNC4gVXNlIHRoZSBjaG9zZW4gc2VhcmNoIGFsZ29yaXRobSB0byBmaW5kIHRoZSBzaG9ydGVzdCBwYXRoIGJldHdlZW4gXG50aGUgc3RhcnRpbmcgc3F1YXJlIChvciBub2RlKSBhbmQgdGhlIGVuZGluZyBzcXVhcmUuXG5PdXRwdXQgd2hhdCB0aGF0IGZ1bGwgcGF0aCBsb29rcyBsaWtlLCBlLmcuOlxuPiBrbmlnaHRNb3ZlcyhbMywzXSxbNCwzXSlcbiAgPT4gWW91IG1hZGUgaXQgaW4gMyBtb3ZlcyEgIEhlcmUncyB5b3VyIHBhdGg6XG4gICAgWzMsM11cbiAgICBbNCw1XVxuICAgIFsyLDRdXG4gICAgWzQsM11cbiovXG5jb25zdCBjaGVja0FyZ3VtZW50cyA9IChzdGFydCwgZW5kKSA9PiB7XG4gIC8vICBuZWVkIHRvIGNoZWNrIGlmIGFyZ3VtZW50cyBhcmUgYXJyYXkgdHlwZXNcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKCk7XG4gIGlmICghc3RhcnQgJiYgIWVuZCkge1xuICAgIGVyci5tZXNzYWdlID0gJ1VuZGVmaW5lZCBhcmd1bWVudHMuJztcbiAgfSBlbHNlIGlmICghc3RhcnQgJiYgZW5kKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSAnVW5kZWZpbmVkIHN0YXJ0IGFyZ3VtZW50Lic7XG4gIH0gZWxzZSBpZiAoc3RhcnQgJiYgIWVuZCkge1xuICAgIGVyci5tZXNzYWdlID0gJ1VuZGVmaW5lZCBlbmQgYXJndW1lbnQuJztcbiAgfVxuXG4gIGlmIChlcnIubWVzc2FnZSkgdGhyb3cgZXJyO1xufTtcblxuY29uc3QgbW92ZSA9IChzdGFydCwgY291bnQsIGRpcmVjdGlvbikgPT4ge1xuICAvLyAgd2hhdCBpZiBrbmlnaHQgZ29lcyBvZmYgdGhlIGJvYXJkP1xuICAvLyAga25pZ2h0IGNhbiBtb3ZlIDEgb3IgMiBzcXVhcmVzIGxlZnQvdXAgb3IgcmlnaHQvZG93blxuICAvLyAgY291bnQgZGVmaW5lcyBob3cgbWFueSBzcXVhcmVzIHRoZSBrbmlnaHQgd2lsbCBtb3ZlIGhvcml6b250YWxseS92ZXJ0aWNhbGx5XG4gIC8vICBkaXJlY3Rpb24gZGVmaW5lcyB3aGljaCBkaXJlY3Rpb24gdGhlIGtuaWdodCB3aWxsIG1vdmUsIGxlZnQvdXAgb3IgcmlnaHQvZG93blxuICBsZXQgdSA9IHN0YXJ0O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpICs9IDEpIHtcbiAgICB1ID0gZGlyZWN0aW9uID8gKHUgKz0gMSkgOiAodSAtPSAxKTtcbiAgfVxuICBpZiAodSA8IDAgfHwgdSA+IDcpIHJldHVybiBudWxsO1xuICByZXR1cm4gdTtcbn07XG5cbmNvbnN0IG1lbW8gPSBbXTtcbi8vIGxldCBtb28gPSBbXTtcbmNvbnN0IGdlbmVyYXRlUG9zc2libGVNb3ZlcyA9IChzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkgPT4ge1xuICAvLyAgIGdlbmVyYXRlcyBhbGwgbGVnYWwgbW92ZXMgZm9yIGEga25pZ2h0XG4gIC8vICAgaG93IHRvIGdldCBhbGwgcG9zc2libGUgbW92ZXMgZnJvbSBbc3RhcnRYLCBzdGFydFldIHRvIFtlbmRYLCBlbmRZXT9cbiAgLy8gICBpZ25vcmUgYWxyZWFkeSB2aXNpdGVkIHNxdWFyZXM/XG4gIC8vICAgcmVjdXJzaXZlIGZ1bmN0aW9uP1xuICAvLyBjb25zb2xlLmxvZyhgc3RhcnRYOiAke3N0YXJ0WH0sIHN0YXJ0WTogJHtzdGFydFl9YCk7XG5cbiAgLy8gY3JlYXRlIGEgbm9kZSBmb3Igc3RhcnRYLXN0YXJ0WT9cbiAgLy8gd2l0aCBhIHBvc3NpYmxlTW92ZXMgcHJvcGVydHk/XG4gIGlmIChzdGFydFggPT09IGVuZFggJiYgc3RhcnRZID09PSBlbmRZKSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0WCA9PT0gZW5kWCAmJiBzdGFydFkgPT09IGVuZFknKTtcbiAgICAvLyByZXR1cm4geyBlbmQ6IFtlbmRYLCBlbmRZXSB9O1xuICB9XG5cbiAgaWYgKG1lbW8uZmluZCgoaXRlbSkgPT4gaXRlbS5zdGFydFswXSA9PT0gc3RhcnRYICYmIGl0ZW0uc3RhcnRbMV0gPT09IHN0YXJ0WSkpXG4gICAgcmV0dXJuIG1lbW8uZmluZCgoaXRlbSkgPT4gaXRlbS5zdGFydFswXSA9PT0gc3RhcnRYICYmIGl0ZW0uc3RhcnRbMV0gPT09IHN0YXJ0WSk7XG5cbiAgY29uc3Qgb2JqID0geyBzdGFydDogW3N0YXJ0WCwgc3RhcnRZXSB9O1xuICBjb25zdCBtb3ZlcyA9IFtdO1xuICAvLyBsZXQgbGlua2VkTW92ZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpICs9IDEpIHtcbiAgICAvLyAgdmVydGljYWwgYW5kIGhvcml6b250YWwgbW92ZXNcbiAgICAvLyAgbW92ZXMgMS0yIHNxdWFyZXMgbGVmdC91cCBvciByaWdodC9kb3duXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHZlcnREaXIgPSBpICUgMiAhPT0gMDsgLy8gdHJ1ZSA9PiB1cCwgZmFsc2UgPT4gZG93blxuICAgICAgY29uc3QgaG9yRGlyID0gaiAlIDIgPT09IDA7IC8vIHRydWUgPT4gcmlnaHQsIGZhbHNlID0+IGxlZnRcbiAgICAgIGNvbnN0IG5ld01vdmVWID0gW21vdmUoc3RhcnRYLCAxLCBob3JEaXIpLCBtb3ZlKHN0YXJ0WSwgMiwgdmVydERpcildO1xuICAgICAgY29uc3QgbmV3TW92ZUggPSBbbW92ZShzdGFydFgsIDIsIGhvckRpciksIG1vdmUoc3RhcnRZLCAxLCB2ZXJ0RGlyKV07XG4gICAgICAvLyBpZiBuZXdNb3ZlViBvciBuZXdNb3ZlSCBleGlzdHMgaW4gbWVtb1xuICAgICAgLy8gIGRvIG5vdCBwdXNoIGl0IGludG8gbW92ZXNcbiAgICAgIC8vIGNvbnN0IHRlc3RBID0gbWVtby5maW5kKChpdGVtKSA9PiBpdGVtWzBdID09PSBuZXdNb3ZlVlswXSAmJiBpdGVtWzFdID09PSBuZXdNb3ZlVlsxXSk7XG4gICAgICAvLyBjb25zdCB0ZXN0QiA9IG1lbW8uZmluZCgoaXRlbSkgPT4gaXRlbVswXSA9PT0gbmV3TW92ZUhbMF0gJiYgaXRlbVsxXSA9PT0gbmV3TW92ZUhbMV0pO1xuXG4gICAgICBpZiAobmV3TW92ZVYuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgIT09IG51bGwpKSB7XG4gICAgICAgIC8vIGNvbnN0IGxpbmtlZExpc3RDaGlsZCA9IG5ldyBMaW5rZWRMaXN0KCk7XG4gICAgICAgIC8vIGxpbmtlZExpc3RDaGlsZC5hcHBlbmQobmV3TW92ZVYpO1xuICAgICAgICAvLyBsaW5rZWRNb3Zlcy5wdXNoKGxpbmtlZExpc3RDaGlsZCk7XG4gICAgICAgIGNvbnN0IG9iak1vdmUgPSB7IHN0YXJ0OiBuZXdNb3ZlViB9O1xuICAgICAgICBtb3Zlcy5wdXNoKG9iak1vdmUpO1xuICAgICAgfVxuICAgICAgaWYgKG5ld01vdmVILmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ICE9PSBudWxsKSkge1xuICAgICAgICAvLyBjb25zdCBsaW5rZWRMaXN0Q2hpbGQgPSBuZXcgTGlua2VkTGlzdCgpO1xuICAgICAgICAvLyBsaW5rZWRMaXN0Q2hpbGQuYXBwZW5kKG5ld01vdmVIKTtcbiAgICAgICAgLy8gbGlua2VkTW92ZXMucHVzaChsaW5rZWRMaXN0Q2hpbGQpO1xuICAgICAgICBjb25zdCBvYmpNb3ZlID0geyBzdGFydDogbmV3TW92ZUggfTtcbiAgICAgICAgbW92ZXMucHVzaChvYmpNb3ZlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBjb25zdCBsaW5rZWRMaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcbiAgLy8gbGlua2VkTGlzdC5hcHBlbmQoW3N0YXJ0WCwgc3RhcnRZXSwgbGlua2VkTW92ZXMpO1xuICAvLyBjb25zb2xlLmxvZyhtb3Zlcyk7XG4gIC8vIGNvbnNvbGUubG9nKG9iaik7XG4gIGNvbnN0IG1pZHBvaW50ID0gTWF0aC5mbG9vcihtb3Zlcy5sZW5ndGggLyAyKTtcbiAgbGV0IG1vdmVzTGVmdEhhbGYgPSBtb3Zlcy5zbGljZSgwLCBtaWRwb2ludCk7XG4gIGxldCBtb3Zlc1JpZ2h0SGFsZiA9IG1vdmVzLnNsaWNlKG1pZHBvaW50KTtcblxuICBtZW1vLnB1c2gob2JqKTtcblxuICBtb3Zlc0xlZnRIYWxmID0gbW92ZXNMZWZ0SGFsZi5tYXAoKGl0ZW0pID0+XG4gICAgZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKGl0ZW0uc3RhcnRbMF0sIGl0ZW0uc3RhcnRbMV0sIGVuZFgsIGVuZFkpLFxuICApO1xuXG4gIG1vdmVzUmlnaHRIYWxmID0gbW92ZXNSaWdodEhhbGYubWFwKChpdGVtKSA9PlxuICAgIGdlbmVyYXRlUG9zc2libGVNb3ZlcyhpdGVtLnN0YXJ0WzBdLCBpdGVtLnN0YXJ0WzFdLCBlbmRYLCBlbmRZKSxcbiAgKTtcblxuICBvYmoucG9zc2libGVNb3ZlcyA9IG1vdmVzTGVmdEhhbGYuY29uY2F0KG1vdmVzUmlnaHRIYWxmKTtcblxuICAvLyBuZWVkIHRvIGdlbmVyYXRlIHBvc3NpYmxlIG1vdmVzIGZvciBlYWNoIHBvc3NpYmxlIG1vdmVcbiAgLypcbiAga25pZ2h0TW92ZXMoWzMsIDNdLFswLCAwXSlcbiAgMDogWzMsIDNdID0+IFtbNCwgMV0sIFs1LCAyXSwgWzIsIDFdLCBbMSwgMl0sIFs0LCA1XSwgWzUsIDRdLCBbMiwgNV0sIFsxLCA0XV1cbiAgMTogWzQsIDFdID0+IFtbNiwgMF0sIFsyLCAwXSwgWzUsIDNdLCBbNiwgMl0sIFszLCAzXSwgWzIsIDJdXVxuICAgIDA6IFs2LCAwXSA9PiBbWzcsIDJdLCBbNSwgMl0sIFs0LCAxXV1cbiAgICAgIDA6IFs3LCAyXSA9PiBbWzYsIDBdLCBbNSwgMV0sIFs2LCA0XSwgWzUsIDNdXVxuICAgICAgICAwOiBbNiwgMF0gPT4gW11cbiAgICAgICAgMTogWzUsIDFdID0+IFtbNywgMF0sIFszLCAwXSwgWzYsIDNdLCBbNywgMl0sIFs0LCAzXSwgWzMsIDJdXVxuICAgICAgICAgIDA6IFs3LCAwXSA9PiBbWzYsIDJdLCBbNSwgMV1dXG4gICAgICAgICAgICAwOiBbNiwgMl0gPT4gW1s3LCAwXSwgWzUsIDBdLCBbNCwgMV0sIFs3LCA0XSwgWzUsIDRdLCBbNCwgM11dXG4gICAgICAgICAgICAxOiBbNSwgMF0gPT4gLi4uXG4gICAgMTogWzQsIDFdID0+IC4uLlxuICAgIDI6IFs2LCA1XSA9PiAuLi5cbiAgICAzOiBbNCwgNV0gPT4gLi4uXG4gICAgNDogWzMsIDRdID0+IC4uLlxuICAgIDU6IFszLCAyXSA9PiAuLi5cbiAgICA2OiBbNywgNF0gPT4gLi4uXG4gICAgNzogWzcsIDJdID0+IC4uLlxuICAyOiBbNSwgMl0gPT4gLi4uXG4gIDM6IFsyLCAxXSA9PiAuLi5cbiAgNDogWzEsIDJdID0+IC4uLlxuICA1OiBbNCwgNV0gPT4gLi4uXG4gIDY6IFs1LCA0XSA9PiAuLi5cbiAgNzogWzIsIDVdID0+IC4uLlxuICA4OiBbMSwgNF0gPT4gLi4uXG4gICovXG4gIC8vIG1lbW8gPSBbXTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgLy8gY29uc29sZS5sb2cobWVtbyk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBrbmlnaHRNb3ZlcyA9IChzdGFydCwgZW5kKSA9PiB7XG4gIC8vICBzaG93cyB0aGUgc2hvcnRlc3QgcG9zc2libGUgd2F5IHRvIGdldCBmcm9tIG9uZSBzcXVhcmUgdG8gYW5vdGhlclxuICAvLyAgYnkgb3V0cHV0dGluZyBhbGwgc3F1YXJlcyB0aGUga25pZ2h0IHdpbGwgc3RvcCBvbiBhbG9uZyB0aGUgd2F5LlxuICBjb25zdCBzdGFydFggPSBzdGFydFswXTtcbiAgY29uc3Qgc3RhcnRZID0gc3RhcnRbMV07XG4gIGNvbnN0IGVuZFggPSBlbmRbMF07XG4gIGNvbnN0IGVuZFkgPSBlbmRbMV07XG5cbiAgLy8gIEFsbCBwb3NzaWJsZSBtb3ZlcyBuZWVkIHRvIGJlIGdlbmVyYXRlZCBmcm9tIHRoZSBzdGFydGluZyBsb2NhdGlvblxuICAvLyAgQm9hcmQgc2l6ZSA9IDggeCA4XG4gIC8vICBLbmlnaHQgTVVTVCBzdGF5IG9uIHRoZSBib2FyZFxuICAvLyAgICBLbmlnaHRMb2NhdGlvbiBhdCBbLTEsMl0gaXMgb2ZmIHRoZSBib2FyZFxuICAvLyAgICBLbmlnaHRMb2NhdGlvbiA8PSBbNywgN10gJiYgS25pZ2h0TG9jYXRpb24gPj0gWzAsIDBdXG4gIC8vICBTdGFydCBpcyBhIGtuaWdodCdzIG9yaWdpbmFsIGxvY2F0aW9uXG4gIC8vICAgIFRoZSBzdGFydGluZyBsb2NhdGlvbiB3aWxsIGJlIHRoZSByb290IG5vZGUgZm9yIGEgZGF0YSBzdHJ1Y3R1cmVcbiAgLy8gIEVuZCBpcyBhIGtuaWdodCdzIGZpbmFsIGxvY2F0aW9uXG4gIC8vICAgIFRoZSBsb2NhdGlvbiB0aGUga25pZ2h0IG5lZWRzIHRvIGdldCB0byBmcm9tIHRoZSBzdGFydGluZyBsb2NhdGlvblxuICAvLyAgR2VuZXJhdGUgYW4gYXJyYXkgcG9zc2libGUgbW92ZXMgZnJvbSB0aGUgc3RhcnRpbmcgbG9jYXRpb25cbiAgLy8gICAgQXQgbW9zdCwgdGhlcmUgYXJlIDggcG9zc2libGUgbW92ZXMgZnJvbSBhIHN0YXJ0aW5nIGxvY2F0aW9uXG4gIC8vICAgIEF0IGxlYXN0LCB0aGVyZSBhcmUgMiBwb3NzaWJsZSBtb3ZlcyBmcm9tIGEgc3RhcnRpbmcgbG9jYXRpb25cbiAgLy8gIFRoZSBnZW5lcmF0ZWQgcG9zc2libGUgbW92ZXMgYXJlIG5vdyBuZXcgc3RhcnRpbmcgbG9jYXRpb25zXG4gIC8vICAgIFJlY3Vyc2l2ZWx5IGdlbmVyYXRlIGFsbCBwb3NzaWJsZSBmcm9tIHN1YnNlcXVlbnQgbW92ZXNcbiAgLy8gICAgQnV0IHVudGlsIHdoZW4/XG4gIC8vICAgIFdoYXQgaXMgdGhlIGJhc2UgY2FzZT9cblxuICBjb25zdCBwb3NzaWJsZU1vdmVzID0gZ2VuZXJhdGVQb3NzaWJsZU1vdmVzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKTtcbiAgY29uc29sZS5sb2cocG9zc2libGVNb3Zlcyk7XG5cbiAgLy8gY29uc3QgdHJlZSA9IG5ldyBUcmVlKHBvc3NpYmxlTW92ZXMucG9zc2libGVNb3Zlcyk7XG4gIC8vIGNvbnNvbGUubG9nKHRyZWUpO1xuXG4gIC8vIHBvc3NpYmxlTW92ZXMgPSBwb3NzaWJsZU1vdmVzLm1hcCgoaXRlbSkgPT4ge1xuICAvLyAgIGNvbnN0IGZvbyA9IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhpdGVtWzBdLCBpdGVtWzFdLCBlbmRYLCBlbmRZKTtcbiAgLy8gICByZXR1cm4gZm9vO1xuICAvLyB9KTtcbiAgLy8gY29uc29sZS5sb2cocG9zc2libGVNb3Zlcyk7XG5cbiAgLy8gcG9zc2libGVNb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiBjb25zb2xlLmxvZyhpdGVtKSk7XG4gIC8vIHBvc3NpYmxlTW92ZXMgPSBwb3NzaWJsZU1vdmVzLm1hcCgoaXRlbSkgPT4ge1xuICAvLyAgIGNvbnN0IGZvbyA9IGdlbmVyYXRlUG9zc2libGVNb3ZlcyhpdGVtWzBdLCBpdGVtWzFdLCBlbmRYLCBlbmRZKTtcbiAgLy8gICByZXR1cm4gZm9vO1xuICAvLyB9KTtcbiAgLy8gY29uc29sZS5sb2cocG9zc2libGVNb3Zlcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrbmlnaHRNb3ZlcztcblxuY29uc3QgYWRqYWNlbmN5TWF0cml4ID0gW1xuICAvKlxuICBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN10gKi9cbiAgWzAsIDAsIDAsIDAsIDAsIDAsIDEsIDBdLCAvLyA3XG4gIFswLCAwLCAwLCAwLCAwLCAxLCAwLCAxXSwgLy8gNlxuICBbMCwgMCwgMCwgMCwgMSwgMCwgMSwgMF0sIC8vIDVcbiAgWzAsIDAsIDAsIDEsIDAsIDEsIDAsIDBdLCAvLyA0XG4gIFswLCAwLCAxLCAwLCAxLCAwLCAwLCAwXSwgLy8gM1xuICBbMCwgMSwgMCwgMSwgMCwgMCwgMCwgMF0sIC8vIDJcbiAgWzEsIDAsIDEsIDAsIDAsIDAsIDAsIDBdLCAvLyAxXG4gIFswLCAxLCAwLCAwLCAwLCAwLCAwLCAwXSwgLy8gMFxuXTtcblxuY29uc3QgYWRqYWNlbmN5TGlzdCA9IFtbMV0sIFswLCAyXSwgWzEsIDNdLCBbMiwgNF0sIFszLCA1XSwgWzQsIDZdLCBbNSwgN10sIFs2XV07XG4vLyBrbmlnaHRNb3ZlcyhbMCwwXSxbNyw3XSkgPT0gW1swLDBdLFsyLDFdLFs0LDJdLFs2LDNdLFs0LDRdLFs2LDVdLFs3LDddXVxuLypcblxua25pZ2h0cyBsZWdhbCBtb3Zlc1xuKipPICAgTyoqICAgICBPICAgTyAgXG5PICAgICAgIE8gICBPKiogICAqKk9cblxuTyogICAgKk8gICAgTyAgICAgIE9cbiAqICAgICogICAgICogICAgICAqXG4gTyAgICBPICAgICAqTyAgICBPKlxuXG4qL1xuIiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkTGlzdCB7XG4gICNoZWFkID0gbnVsbDtcblxuICAjdGFpbCA9IG51bGw7XG5cbiAgI3NpemUgPSAwO1xuXG4gIGFwcGVuZCh2YWx1ZSwgcG9zc2libGVNb3Zlcykge1xuICAgIC8vIGFkZHMgYSBuZXcgbm9kZSBjb250YWluaW5nIHZhbHVlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICBjb25zdCBub2RlID0gbmV3IE5vZGUodmFsdWUsIHBvc3NpYmxlTW92ZXMpO1xuICAgIGlmICh0aGlzLiNzaXplID09PSAwKSB7XG4gICAgICB0aGlzLiNoZWFkID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG1wID0gdGhpcy4jdGFpbDtcbiAgICAgIHRtcC5uZXh0ID0gbm9kZTtcbiAgICB9XG4gICAgdGhpcy4jdGFpbCA9IG5vZGU7XG4gICAgdGhpcy4jc2l6ZSArPSAxO1xuICB9XG5cbiAgcHJlcGVuZCh2YWx1ZSkge1xuICAgIC8vIGFkZHMgYSBuZXcgbm9kZSBjb250YWluaW5nIHZhbHVlIHRvIHRoZSBzdGFydCBvZiB0aGUgbGlzdFxuICAgIGNvbnN0IHRtcCA9IHRoaXMuI2hlYWQ7XG4gICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLCB0bXApO1xuICAgIHRoaXMuI2hlYWQgPSBuZXdOb2RlO1xuICAgIGlmICh0aGlzLiNzaXplID09PSAwKSB0aGlzLiN0YWlsID0gbmV3Tm9kZTtcbiAgICB0aGlzLiNzaXplICs9IDE7XG4gIH1cblxuICBzaXplKCkge1xuICAgIC8vIHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiBub2RlcyBpbiB0aGUgbGlzdFxuICAgIHJldHVybiB0aGlzLiNzaXplO1xuICB9XG5cbiAgaGVhZCgpIHtcbiAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI2hlYWQ7XG4gIH1cblxuICB0YWlsKCkge1xuICAgIC8vIHJldHVybnMgdGhlIGxhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgIHJldHVybiB0aGlzLiN0YWlsO1xuICB9XG5cbiAgYXRJbmRleChuKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgbm9kZSBhdCB0aGUgZ2l2ZW4gaW5kZXhcbiAgICBsZXQgbm9kZSA9ICF0aGlzLiNoZWFkID8gJ0xpbmtlZCBMaXN0IGlzIGVtcHR5JyA6IHRoaXMuI2hlYWQ7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKGluZGV4ID09PSBuKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICghbm9kZS5uZXh0KSB7XG4gICAgICAgIG5vZGUgPSBgTm8gbm9kZSBmb3VuZCBhdCBpbmRleCAke259YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgaW5kZXggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgLy8gcmVtb3ZlcyB0aGUgbGFzdCBlbGVtZW50IGZyb20gdGhlIGxpc3RcbiAgICBpZiAodGhpcy4jc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLiNzaXplID4gMSkge1xuICAgICAgICBjb25zdCBiZWZvcmVMYXN0ID0gdGhpcy5hdEluZGV4KHRoaXMuI3NpemUgLSAyKTtcbiAgICAgICAgYmVmb3JlTGFzdC5uZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy4jdGFpbCA9IGJlZm9yZUxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiN0YWlsID0gbnVsbDtcbiAgICAgICAgdGhpcy4jaGVhZCA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmF0SW5kZXgoMCk7XG4gICAgICB9XG4gICAgICB0aGlzLiNzaXplIC09IDE7XG4gICAgfVxuICB9XG5cbiAgY29udGFpbnMocXVlcnkpIHtcbiAgICAvLyByZXR1cm5zIHRydWUgaWYgdGhlIHBhc3NlZCBpbiB2YWx1ZSBpcyBpbiB0aGUgbGlzdCBhbmQgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gICAgcmV0dXJuIHRoaXMuZmluZChxdWVyeSkgIT09IG51bGw7XG4gIH1cblxuICBmaW5kKHF1ZXJ5KSB7XG4gICAgLy8gcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG5vZGUgY29udGFpbmluZyB2YWx1ZSwgb3IgbnVsbCBpZiBub3QgZm91bmRcbiAgICBsZXQgbm9kZSA9IHRoaXMuI2hlYWQ7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKG5vZGUudmFsdWUuZXZlcnkoKGl0ZW0sIGkpID0+IGl0ZW0gPT09IHF1ZXJ5W2ldKSkge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG5cbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIC8vIHJlcHJlc2VudHMgeW91ciBMaW5rZWRMaXN0IG9iamVjdHMgYXMgc3RyaW5ncyxcbiAgICAvLyBzbyB5b3UgY2FuIHByaW50IHRoZW0gb3V0IGFuZCBwcmV2aWV3IHRoZW0gaW4gdGhlIGNvbnNvbGUuXG4gICAgLy8gVGhlIGZvcm1hdCBzaG91bGQgYmU6ICggdmFsdWUgKSAtPiAoIHZhbHVlICkgLT4gKCB2YWx1ZSApIC0+IG51bGxcbiAgICBsZXQgbm9kZSA9IHRoaXMuI2hlYWQ7XG4gICAgbGV0IHN0cmluZyA9IG5vZGUgPyAnJyA6IG51bGw7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIHN0cmluZyArPSBgKCAke25vZGUudmFsdWV9ICkgLT4gYDtcbiAgICAgIGlmICghbm9kZS5uZXh0KSB7XG4gICAgICAgIHN0cmluZyArPSBgbnVsbGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIC8vIEV4dHJhIENyZWRpdCBUaXA6IFdoZW4geW91IGluc2VydCBvciByZW1vdmUgYSBub2RlLFxuICAvLyBjb25zaWRlciBob3cgaXQgd2lsbCBhZmZlY3QgdGhlIGV4aXN0aW5nIG5vZGVzLlxuICAvLyBTb21lIG9mIHRoZSBub2RlcyB3aWxsIG5lZWQgdGhlaXIgbmV4dE5vZGUgbGluayB1cGRhdGVkLlxuICBpbnNlcnRBdCh2YWx1ZSwgaW5kZXgpIHtcbiAgICAvLyBpbnNlcnRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUgYXQgdGhlIGdpdmVuIGluZGV4XG4gICAgaWYgKGluZGV4IDw9IHRoaXMuI3NpemUgJiYgaW5kZXggPj0gMCkge1xuICAgICAgLy8gY2hlY2tzIGlmIHRoZSBpbmRleCBpcyB3aXRoaW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgLy8gaW5kZXggY2FuIG5ldmVyIGJlIGxlc3MgdGhhbiAwXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgZ3JlYXRlciB0aGFuIHRoZSBsaW5rZWQgbGlzdCdzIHNpemVcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAvLyBpbnNlcnQgbm9kZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0XG4gICAgICAgIHRoaXMucHJlcGVuZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLiNzaXplKSB7XG4gICAgICAgIC8vIGluc2VydCBub2RlIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgdGhpcy5hcHBlbmQodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW5zZXJ0IG5vZGVzIGluIGJldHdlZW4gbm9kZXNcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuYXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuYXRJbmRleChpbmRleCk7XG4gICAgICAgIGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSwgcmlnaHQpO1xuICAgICAgICBsZWZ0Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB0aGlzLiNzaXplICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQXQoaW5kZXgpIHtcbiAgICAvLyB0aGF0IHJlbW92ZXMgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIGluZGV4XG4gICAgaWYgKGluZGV4IDwgdGhpcy4jc2l6ZSAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAvLyBjaGVja3MgaWYgdGhlIGluZGV4IGlzIHdpdGhpbiB0aGUgbGlua2VkIGxpc3QncyBzaXplXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgbGVzcyB0aGFuIDBcbiAgICAgIC8vIGluZGV4IGNhbiBuZXZlciBiZSBncmVhdGVyIHRoYW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgaWYgKGluZGV4ICsgMSA9PT0gdGhpcy4jc2l6ZSkge1xuICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiNzaXplID4gMSAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLiNoZWFkID0gdGhpcy5hdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5hdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5hdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICAgIGxlZnQubmV4dCA9IHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNzaXplIC09IDE7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IodmFsdWUsIG1vdmVzLCBuZXh0KSB7XG4gICAgdGhpcy5zdGFydCA9ICF2YWx1ZSA/IG51bGwgOiB2YWx1ZTtcbiAgICB0aGlzLnBvc3NpYmxlTW92ZXMgPSAhbW92ZXMgPyBudWxsIDogbW92ZXM7XG4gICAgdGhpcy5uZXh0ID0gIW5leHQgPyBudWxsIDogbmV4dDtcbiAgfVxufVxuIiwiaW1wb3J0IGtuaWdodE1vdmVzIGZyb20gJy4vY29udGFpbmVycy9rbmlnaHRfdHJhdmFpbHMnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLi9jb21wb25lbnRzL3Rlc3QnO1xuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbndpbmRvdy5rbmlnaHRNb3ZlcyA9IGtuaWdodE1vdmVzO1xuXG50ZXN0LnByaW50KCk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3QucmVuZGVyKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9