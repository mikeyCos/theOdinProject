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
    const foo = 'test';

    const icon = new Image();
    icon.src = _assets_icons_sharp_home_svg__WEBPACK_IMPORTED_MODULE_0__;
    paragraph.textContent = 'Lorem ipsum something something...';

    div.appendChild(icon);
    div.appendChild(paragraph);
    return div;
  },
});


/***/ }),

/***/ "./src/containers/hashmap.js":
/*!***********************************!*\
  !*** ./src/containers/hashmap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _linked_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linked_list */ "./src/containers/linked_list.js");


const HashMap = () => {
  let capacity = 16;
  const threshold = 0.75;
  let numEntries = 0;
  let loadFactor = numEntries / capacity;
  let arr = new Array(capacity).fill().map(() => new _linked_list__WEBPACK_IMPORTED_MODULE_0__["default"]());
  const hash = (key) => {
    // takes a value and produces a hash code with it.
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      // hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));
    }

    const capacityBigInt = BigInt(capacity);
    hashCode = Number(hashCode % capacityBigInt);

    if (hashCode < 0 || hashCode >= capacityBigInt) {
      throw new Error('Trying to access index out of bound');
    }

    return hashCode;
    // return hashCode;
  };

  const entries = () => {
    // returns an array that contains each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const entriesArr = [];
    arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          entriesArr.push([node.key, node.value]);
          // optional, an array of objects with key/value properties
          // entriesArr.push({ key: node.key, value: node.value });
          node = node.next;
        }
      }
    });

    return entriesArr;
  };

  const grow = (callback) => {
    capacity *= 2;
    numEntries = 0;
    const entriesArr = entries();
    arr = new Array(capacity).fill().map(() => new _linked_list__WEBPACK_IMPORTED_MODULE_0__["default"]());
    entriesArr.forEach((item) => {
      callback(item[0], item[1]);
      // optional, when using an array of objects with key/value properties
      // callback(item.key, item.value);
    });
  };

  const set = (key, value) => {
    // takes two arguments, the first is a key and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten.
    // grow your buckets size when it needs to, by calculating if your bucket has reached the load factor.
    const index = hash(key);
    const bucket = arr[index];
    const linkedListIndex = bucket.find(key);
    if (bucket.size() === 0 || linkedListIndex === null) {
      bucket.append(key, value);
      numEntries += 1;
      loadFactor = numEntries / capacity;
    } else {
      const node = bucket.atIndex(linkedListIndex);
      node.value = value;
    }

    if (loadFactor > threshold) {
      // To grow our buckets,
      // we create a new buckets list that is double the size of the old buckets list,
      // then we copy all nodes over to the new buckets.
      grow(set);
    }
  };

  const get = (key) => {
    // takes one argument as a key and returns the value that is assigned to this key.
    // If key is not found, return null
    const index = hash(key);
    const bucket = arr[index];
    const linkedListIndex = bucket.find(key);
    const node = bucket.atIndex(linkedListIndex);
    return node ? node.value : null;
  };

  const has = (key) => {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const index = hash(key);
    const bucket = arr[index];
    return bucket.contains(key);
  };

  const remove = (key) => {
    // takes a key as an argument.
    // If the given key is in the hash map, it should remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false
    if (has(key)) {
      const index = hash(key);
      const bucket = arr[index];
      const linkedListIndex = bucket.find(key);
      bucket.removeAt(linkedListIndex);
      numEntries -= 1;
      return true;
    }
    return false;
  };

  const length = () => {
    // returns the number of stored keys in the hash map.
    return numEntries;
  };

  const clear = () => {
    // removes all entries in the hash map
    arr.forEach((item) => {
      while (item.size() > 0) {
        item.pop();
      }
    });
  };

  const keys = () => {
    // returns an array containing all the keys inside the hash map.
    const keysArr = [];
    arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          keysArr.push(node.key);
          node = node.next;
        }
      }
    });

    return keysArr;
  };

  const values = () => {
    // returns an array containing all the values
    const valuesArr = [];
    arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          valuesArr.push(node.value);
          node = node.next;
        }
      }
    });

    return valuesArr;
  };

  const indexOf = (key) => {
    // returns the index of the bucket that the key belongs to
    const index = hash(key);
    return has(key) ? index : 'Key does not exist';
  };

  const print = () => {
    console.log(arr);
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    print,
    indexOf,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HashMap);


/***/ }),

/***/ "./src/containers/hashset.js":
/*!***********************************!*\
  !*** ./src/containers/hashset.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HashSet)
/* harmony export */ });
/* harmony import */ var _linked_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linked_list */ "./src/containers/linked_list.js");
/* harmony import */ var _hashmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hashmap */ "./src/containers/hashmap.js");



class HashSet {
  #capacity = 16;

  #threshold = 0.75;

  #numEntries = 0;

  #loadFactor = this.#numEntries / this.#capacity;

  #arr = new Array(this.#capacity).fill().map(() => new _linked_list__WEBPACK_IMPORTED_MODULE_0__["default"]());

  hash = (key) => {
    // takes a value and produces a hash code with it.
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      // hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));
    }

    const capacityBigInt = BigInt(this.#capacity);
    hashCode = Number(hashCode % capacityBigInt);

    if (hashCode < 0 || hashCode >= capacityBigInt) {
      throw new Error('Trying to access index out of bound');
    }

    return hashCode;
    // return hashCode;
  };

  #grow = () => {
    this.#capacity *= 2;
    this.#numEntries = 0;
    const keysArr = this.keys();
    console.log(keysArr);
    this.#arr = new Array(this.#capacity).fill().map(() => new _linked_list__WEBPACK_IMPORTED_MODULE_0__["default"]());
    keysArr.forEach((item) => {
      this.set(item);
    });
  };

  set = (key) => {
    // takes two arguments, the first is a key and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten.
    // grow your buckets size when it needs to, by calculating if your bucket has reached the load factor.
    const index = this.hash(key);
    const bucket = this.#arr[index];
    const linkedListIndex = bucket.find(key);
    if (bucket.size() === 0 || linkedListIndex === null) {
      bucket.append(key);
      this.#numEntries += 1;
      this.#loadFactor = this.#numEntries / this.#capacity;
    }

    if (this.#loadFactor > this.#threshold) {
      // To grow our buckets,
      // we create a new buckets list that is double the size of the old buckets list,
      // then we copy all nodes over to the new buckets.
      this.#grow();
    }
  };

  get = (key) => {
    // Takes one argument as a key and returns the node corresponding to the key.
    // If key is not found, return null.
    const index = this.hash(key);
    const bucket = this.#arr[index];
    const linkedListIndex = bucket.find(key);
    const node = bucket.atIndex(linkedListIndex);
    // return !node ? null : node;
    if (node) {
      return !node.value ? node : node;
    }
    return null;
  };

  has = (key) => {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const index = this.hash(key);
    const bucket = this.#arr[index];
    return bucket.contains(key);
  };

  remove = (key) => {
    // takes a key as an argument.
    // If the given key is in the hash map, it should remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false
    if (this.has(key)) {
      const index = this.hash(key);
      const bucket = this.#arr[index];
      const linkedListIndex = bucket.find(key);
      bucket.removeAt(linkedListIndex);
      this.#numEntries -= 1;
      return true;
    }
    return false;
  };

  length = () => {
    // returns the number of stored keys in the hash map.
    return this.#numEntries;
  };

  clear = () => {
    // removes all entries in the hash map
    this.#arr.forEach((item) => {
      while (item.size() > 0) {
        item.pop();
      }
    });
  };

  keys = () => {
    // returns an array containing all the keys inside the hash map.
    const keysArr = [];
    this.#arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          keysArr.push(node.key);
          node = node.next;
        }
      }
    });

    return keysArr;
  };

  indexOf = (key) => {
    // returns the index of the bucket that the key belongs to
    const index = this.hash(key);
    return this.has(key) ? index : 'Key does not exist';
  };

  print = () => {
    console.log(this.#arr);
  };
}


/***/ }),

/***/ "./src/containers/linked_list.js":
/*!***************************************!*\
  !*** ./src/containers/linked_list.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkedList)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/containers/node.js");


class LinkedList {
  #head = null;

  #tail = null;

  #size = 0;

  append(key, value) {
    // adds a new node containing value to the end of the list
    const node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](key, value);
    if (this.#size === 0) {
      this.#head = node;
    } else {
      const tmp = this.#tail;
      tmp.next = node;
    }
    this.#tail = node;
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
    let node = this.#head;
    let index = 0;
    while (node) {
      if (index === n) {
        break;
      } else if (!node.next) {
        node = null;
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

  contains(key) {
    // returns true if the passed in value is in the list and otherwise returns false.
    return this.find(key) !== null;
  }

  find(key) {
    // returns the index of the node containing value, or null if not found
    let node = this.#head;
    let index = 0;
    while (node) {
      if (node.key === key) {
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
  constructor(key, value, next) {
    this.key = !key ? null : key;
    if (value) {
      this.value = value;
    }
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
/* harmony import */ var _containers_hashmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers/hashmap */ "./src/containers/hashmap.js");
/* harmony import */ var _containers_hashset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/hashset */ "./src/containers/hashset.js");
/* harmony import */ var _components_test__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/test */ "./src/components/test.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ "./src/index.css");





window.HashMap = _containers_hashmap__WEBPACK_IMPORTED_MODULE_0__["default"];
window.foo = (0,_containers_hashmap__WEBPACK_IMPORTED_MODULE_0__["default"])();
console.log(window.foo);

window.HashSet = _containers_hashset__WEBPACK_IMPORTED_MODULE_1__["default"];
window.bar = new _containers_hashset__WEBPACK_IMPORTED_MODULE_1__["default"]();
console.log(window.bar);

const entries = [
  {
    key: 'firstKey',
    value: 'firstValue',
  },
  {
    key: 'secondKey',
    value: 'secondValue',
  },
  { key: 'thirdKey', value: 'thirdValue' },
  { key: 'fourthKey', value: 'fourthValue' },
  { key: 'fifthKey', value: 'fifthValue' },
  { key: 'sixthKey', value: 'sixthValue' },
  { key: 'seventhKey', value: 'seventhValue' },
  { key: 'eighthKey', value: 'eighthValue' },
  { key: 'ninthKey', value: 'ninthValue' },
  { key: 'tenthKey', value: 'tenthValue' },
  { key: 'eleventhKey', value: 'eleventhValue' },
  { key: 'twelfthKey', value: 'twelfthValue' },
  { key: 'thirteenthKey', value: 'thirteenthValue' },
  { key: 'fourteenthKey', value: 'fourteenthValue' },
];

entries.forEach((item) => window.foo.set(item.key, item.value));
window.foo.print();
entries.forEach((item) => window.bar.set(item.key, item.value));
window.bar.print();

_components_test__WEBPACK_IMPORTED_MODULE_2__["default"].print();
document.body.appendChild(_components_test__WEBPACK_IMPORTED_MODULE_2__["default"].render());


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QywrTUFBb0Y7QUFDaEksOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxzQ0FBc0MsZ0dBQWdHLGdGQUFnRixxQkFBcUIsdUJBQXVCLEdBQUcsNEJBQTRCLGVBQWUsY0FBYywyQkFBMkIsR0FBRyxVQUFVLDJCQUEyQiwyQ0FBMkMsb0NBQW9DLHVCQUF1QixHQUFHLG1CQUFtQjtBQUNod0I7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUM3QjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLHNGQUFPLFVBQVUsc0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2JrRDs7QUFFbEQsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHlEQUFJO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQnFDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELG9EQUFVO0FBQy9EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQ0FBa0M7QUFDakU7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELG9EQUFVO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUxnQjtBQUNQOztBQUVqQjtBQUNmOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHdEQUF3RCxvREFBVTs7QUFFbEU7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Qsb0RBQVU7QUFDekU7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzlJMEI7O0FBRVg7QUFDZjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDZDQUFJO0FBQ3pCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hJZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSMkM7QUFDQTtBQUNOO0FBQ2hCOztBQUVyQixpQkFBaUIsMkRBQU87QUFDeEIsYUFBYSwrREFBTztBQUNwQjs7QUFFQSxpQkFBaUIsMkRBQU87QUFDeEIsaUJBQWlCLDJEQUFPO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxJQUFJLHNDQUFzQztBQUMxQyxJQUFJLHdDQUF3QztBQUM1QyxJQUFJLHNDQUFzQztBQUMxQyxJQUFJLHNDQUFzQztBQUMxQyxJQUFJLDBDQUEwQztBQUM5QyxJQUFJLHdDQUF3QztBQUM1QyxJQUFJLHNDQUFzQztBQUMxQyxJQUFJLHNDQUFzQztBQUMxQyxJQUFJLDRDQUE0QztBQUNoRCxJQUFJLDBDQUEwQztBQUM5QyxJQUFJLGdEQUFnRDtBQUNwRCxJQUFJLGdEQUFnRDtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3REFBSTtBQUNKLDBCQUEwQix3REFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LmNzcz9jZmU0Iiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3Rlc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2hhc2htYXAuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2hhc2hzZXQuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2xpbmtlZF9saXN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9ub2RlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBmb250LWZhbWlseTogQXJpYWw7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdURBQXVEO0VBQ3ZELCtCQUErQjtFQUMvQiw0Q0FBMkU7RUFDM0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHNDQUFzQztFQUN0QywrQkFBK0I7RUFDL0Isa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBzcmM6IHVybCguL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0Zik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBmb250LWZhbWlseTogQXJpYWw7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IEljb24gZnJvbSAnLi4vYXNzZXRzL2ljb25zL3NoYXJwX2hvbWUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcmludCgpIHtcbiAgICBjb25zb2xlLmxvZygncHJpbnQoKSBydW5uaW5nIGZyb20gdGVzdC5qcycpO1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0aW5nLi4uJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgZm9vID0gJ3Rlc3QnO1xuXG4gICAgY29uc3QgaWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGljb24uc3JjID0gSWNvbjtcbiAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSAnTG9yZW0gaXBzdW0gc29tZXRoaW5nIHNvbWV0aGluZy4uLic7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG4gICAgcmV0dXJuIGRpdjtcbiAgfSxcbn07XG4iLCJpbXBvcnQgTGlua2VkTGlzdCBmcm9tICcuL2xpbmtlZF9saXN0JztcblxuY29uc3QgSGFzaE1hcCA9ICgpID0+IHtcbiAgbGV0IGNhcGFjaXR5ID0gMTY7XG4gIGNvbnN0IHRocmVzaG9sZCA9IDAuNzU7XG4gIGxldCBudW1FbnRyaWVzID0gMDtcbiAgbGV0IGxvYWRGYWN0b3IgPSBudW1FbnRyaWVzIC8gY2FwYWNpdHk7XG4gIGxldCBhcnIgPSBuZXcgQXJyYXkoY2FwYWNpdHkpLmZpbGwoKS5tYXAoKCkgPT4gbmV3IExpbmtlZExpc3QoKSk7XG4gIGNvbnN0IGhhc2ggPSAoa2V5KSA9PiB7XG4gICAgLy8gdGFrZXMgYSB2YWx1ZSBhbmQgcHJvZHVjZXMgYSBoYXNoIGNvZGUgd2l0aCBpdC5cbiAgICBsZXQgaGFzaENvZGUgPSAwO1xuXG4gICAgY29uc3QgcHJpbWVOdW1iZXIgPSAzMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgLy8gaGFzaENvZGUgPSAocHJpbWVOdW1iZXIgKiBoYXNoQ29kZSArIGtleS5jaGFyQ29kZUF0KGkpKSAlIGNhcGFjaXR5O1xuICAgICAgaGFzaENvZGUgPSBCaWdJbnQocHJpbWVOdW1iZXIpICogQmlnSW50KGhhc2hDb2RlKSArIEJpZ0ludChrZXkuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FwYWNpdHlCaWdJbnQgPSBCaWdJbnQoY2FwYWNpdHkpO1xuICAgIGhhc2hDb2RlID0gTnVtYmVyKGhhc2hDb2RlICUgY2FwYWNpdHlCaWdJbnQpO1xuXG4gICAgaWYgKGhhc2hDb2RlIDwgMCB8fCBoYXNoQ29kZSA+PSBjYXBhY2l0eUJpZ0ludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGluZGV4IG91dCBvZiBib3VuZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNoQ29kZTtcbiAgICAvLyByZXR1cm4gaGFzaENvZGU7XG4gIH07XG5cbiAgY29uc3QgZW50cmllcyA9ICgpID0+IHtcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZWFjaCBrZXksIHZhbHVlIHBhaXIuXG4gICAgLy8gRXhhbXBsZTogW1tmaXJzdEtleSwgZmlyc3RWYWx1ZV0sIFtzZWNvbmRLZXksIHNlY29uZFZhbHVlXV1cbiAgICBjb25zdCBlbnRyaWVzQXJyID0gW107XG4gICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLnNpemUoKSA+IDApIHtcbiAgICAgICAgbGV0IG5vZGUgPSBpdGVtLmhlYWQoKTtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICBlbnRyaWVzQXJyLnB1c2goW25vZGUua2V5LCBub2RlLnZhbHVlXSk7XG4gICAgICAgICAgLy8gb3B0aW9uYWwsIGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBrZXkvdmFsdWUgcHJvcGVydGllc1xuICAgICAgICAgIC8vIGVudHJpZXNBcnIucHVzaCh7IGtleTogbm9kZS5rZXksIHZhbHVlOiBub2RlLnZhbHVlIH0pO1xuICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyaWVzQXJyO1xuICB9O1xuXG4gIGNvbnN0IGdyb3cgPSAoY2FsbGJhY2spID0+IHtcbiAgICBjYXBhY2l0eSAqPSAyO1xuICAgIG51bUVudHJpZXMgPSAwO1xuICAgIGNvbnN0IGVudHJpZXNBcnIgPSBlbnRyaWVzKCk7XG4gICAgYXJyID0gbmV3IEFycmF5KGNhcGFjaXR5KS5maWxsKCkubWFwKCgpID0+IG5ldyBMaW5rZWRMaXN0KCkpO1xuICAgIGVudHJpZXNBcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY2FsbGJhY2soaXRlbVswXSwgaXRlbVsxXSk7XG4gICAgICAvLyBvcHRpb25hbCwgd2hlbiB1c2luZyBhbiBhcnJheSBvZiBvYmplY3RzIHdpdGgga2V5L3ZhbHVlIHByb3BlcnRpZXNcbiAgICAgIC8vIGNhbGxiYWNrKGl0ZW0ua2V5LCBpdGVtLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIC8vIHRha2VzIHR3byBhcmd1bWVudHMsIHRoZSBmaXJzdCBpcyBhIGtleSBhbmQgdGhlIHNlY29uZCBpcyBhIHZhbHVlIHRoYXQgaXMgYXNzaWduZWQgdG8gdGhpcyBrZXkuXG4gICAgLy8gSWYgYSBrZXkgYWxyZWFkeSBleGlzdHMsIHRoZW4gdGhlIG9sZCB2YWx1ZSBpcyBvdmVyd3JpdHRlbi5cbiAgICAvLyBncm93IHlvdXIgYnVja2V0cyBzaXplIHdoZW4gaXQgbmVlZHMgdG8sIGJ5IGNhbGN1bGF0aW5nIGlmIHlvdXIgYnVja2V0IGhhcyByZWFjaGVkIHRoZSBsb2FkIGZhY3Rvci5cbiAgICBjb25zdCBpbmRleCA9IGhhc2goa2V5KTtcbiAgICBjb25zdCBidWNrZXQgPSBhcnJbaW5kZXhdO1xuICAgIGNvbnN0IGxpbmtlZExpc3RJbmRleCA9IGJ1Y2tldC5maW5kKGtleSk7XG4gICAgaWYgKGJ1Y2tldC5zaXplKCkgPT09IDAgfHwgbGlua2VkTGlzdEluZGV4ID09PSBudWxsKSB7XG4gICAgICBidWNrZXQuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgbnVtRW50cmllcyArPSAxO1xuICAgICAgbG9hZEZhY3RvciA9IG51bUVudHJpZXMgLyBjYXBhY2l0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IGJ1Y2tldC5hdEluZGV4KGxpbmtlZExpc3RJbmRleCk7XG4gICAgICBub2RlLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGxvYWRGYWN0b3IgPiB0aHJlc2hvbGQpIHtcbiAgICAgIC8vIFRvIGdyb3cgb3VyIGJ1Y2tldHMsXG4gICAgICAvLyB3ZSBjcmVhdGUgYSBuZXcgYnVja2V0cyBsaXN0IHRoYXQgaXMgZG91YmxlIHRoZSBzaXplIG9mIHRoZSBvbGQgYnVja2V0cyBsaXN0LFxuICAgICAgLy8gdGhlbiB3ZSBjb3B5IGFsbCBub2RlcyBvdmVyIHRvIHRoZSBuZXcgYnVja2V0cy5cbiAgICAgIGdyb3coc2V0KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0ID0gKGtleSkgPT4ge1xuICAgIC8vIHRha2VzIG9uZSBhcmd1bWVudCBhcyBhIGtleSBhbmQgcmV0dXJucyB0aGUgdmFsdWUgdGhhdCBpcyBhc3NpZ25lZCB0byB0aGlzIGtleS5cbiAgICAvLyBJZiBrZXkgaXMgbm90IGZvdW5kLCByZXR1cm4gbnVsbFxuICAgIGNvbnN0IGluZGV4ID0gaGFzaChrZXkpO1xuICAgIGNvbnN0IGJ1Y2tldCA9IGFycltpbmRleF07XG4gICAgY29uc3QgbGlua2VkTGlzdEluZGV4ID0gYnVja2V0LmZpbmQoa2V5KTtcbiAgICBjb25zdCBub2RlID0gYnVja2V0LmF0SW5kZXgobGlua2VkTGlzdEluZGV4KTtcbiAgICByZXR1cm4gbm9kZSA/IG5vZGUudmFsdWUgOiBudWxsO1xuICB9O1xuXG4gIGNvbnN0IGhhcyA9IChrZXkpID0+IHtcbiAgICAvLyB0YWtlcyBhIGtleSBhcyBhbiBhcmd1bWVudCBhbmQgcmV0dXJucyB0cnVlIG9yIGZhbHNlIGJhc2VkIG9uIHdoZXRoZXIgb3Igbm90IHRoZSBrZXkgaXMgaW4gdGhlIGhhc2ggbWFwLlxuICAgIGNvbnN0IGluZGV4ID0gaGFzaChrZXkpO1xuICAgIGNvbnN0IGJ1Y2tldCA9IGFycltpbmRleF07XG4gICAgcmV0dXJuIGJ1Y2tldC5jb250YWlucyhrZXkpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZSA9IChrZXkpID0+IHtcbiAgICAvLyB0YWtlcyBhIGtleSBhcyBhbiBhcmd1bWVudC5cbiAgICAvLyBJZiB0aGUgZ2l2ZW4ga2V5IGlzIGluIHRoZSBoYXNoIG1hcCwgaXQgc2hvdWxkIHJlbW92ZSB0aGUgZW50cnkgd2l0aCB0aGF0IGtleSBhbmQgcmV0dXJuIHRydWUuXG4gICAgLy8gSWYgdGhlIGtleSBpc27igJl0IGluIHRoZSBoYXNoIG1hcCwgaXQgc2hvdWxkIHJldHVybiBmYWxzZVxuICAgIGlmIChoYXMoa2V5KSkge1xuICAgICAgY29uc3QgaW5kZXggPSBoYXNoKGtleSk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhcnJbaW5kZXhdO1xuICAgICAgY29uc3QgbGlua2VkTGlzdEluZGV4ID0gYnVja2V0LmZpbmQoa2V5KTtcbiAgICAgIGJ1Y2tldC5yZW1vdmVBdChsaW5rZWRMaXN0SW5kZXgpO1xuICAgICAgbnVtRW50cmllcyAtPSAxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBsZW5ndGggPSAoKSA9PiB7XG4gICAgLy8gcmV0dXJucyB0aGUgbnVtYmVyIG9mIHN0b3JlZCBrZXlzIGluIHRoZSBoYXNoIG1hcC5cbiAgICByZXR1cm4gbnVtRW50cmllcztcbiAgfTtcblxuICBjb25zdCBjbGVhciA9ICgpID0+IHtcbiAgICAvLyByZW1vdmVzIGFsbCBlbnRyaWVzIGluIHRoZSBoYXNoIG1hcFxuICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB3aGlsZSAoaXRlbS5zaXplKCkgPiAwKSB7XG4gICAgICAgIGl0ZW0ucG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qga2V5cyA9ICgpID0+IHtcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXlzIGluc2lkZSB0aGUgaGFzaCBtYXAuXG4gICAgY29uc3Qga2V5c0FyciA9IFtdO1xuICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5zaXplKCkgPiAwKSB7XG4gICAgICAgIGxldCBub2RlID0gaXRlbS5oZWFkKCk7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAga2V5c0Fyci5wdXNoKG5vZGUua2V5KTtcbiAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ga2V5c0FycjtcbiAgfTtcblxuICBjb25zdCB2YWx1ZXMgPSAoKSA9PiB7XG4gICAgLy8gcmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgdmFsdWVzXG4gICAgY29uc3QgdmFsdWVzQXJyID0gW107XG4gICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLnNpemUoKSA+IDApIHtcbiAgICAgICAgbGV0IG5vZGUgPSBpdGVtLmhlYWQoKTtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICB2YWx1ZXNBcnIucHVzaChub2RlLnZhbHVlKTtcbiAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsdWVzQXJyO1xuICB9O1xuXG4gIGNvbnN0IGluZGV4T2YgPSAoa2V5KSA9PiB7XG4gICAgLy8gcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGJ1Y2tldCB0aGF0IHRoZSBrZXkgYmVsb25ncyB0b1xuICAgIGNvbnN0IGluZGV4ID0gaGFzaChrZXkpO1xuICAgIHJldHVybiBoYXMoa2V5KSA/IGluZGV4IDogJ0tleSBkb2VzIG5vdCBleGlzdCc7XG4gIH07XG5cbiAgY29uc3QgcHJpbnQgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYXJyKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGhhc2gsXG4gICAgc2V0LFxuICAgIGdldCxcbiAgICBoYXMsXG4gICAgcmVtb3ZlLFxuICAgIGxlbmd0aCxcbiAgICBjbGVhcixcbiAgICBrZXlzLFxuICAgIHZhbHVlcyxcbiAgICBlbnRyaWVzLFxuICAgIHByaW50LFxuICAgIGluZGV4T2YsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIYXNoTWFwO1xuIiwiaW1wb3J0IExpbmtlZExpc3QgZnJvbSAnLi9saW5rZWRfbGlzdCc7XG5pbXBvcnQgSGFzaE1hcCBmcm9tICcuL2hhc2htYXAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNoU2V0IHtcbiAgI2NhcGFjaXR5ID0gMTY7XG5cbiAgI3RocmVzaG9sZCA9IDAuNzU7XG5cbiAgI251bUVudHJpZXMgPSAwO1xuXG4gICNsb2FkRmFjdG9yID0gdGhpcy4jbnVtRW50cmllcyAvIHRoaXMuI2NhcGFjaXR5O1xuXG4gICNhcnIgPSBuZXcgQXJyYXkodGhpcy4jY2FwYWNpdHkpLmZpbGwoKS5tYXAoKCkgPT4gbmV3IExpbmtlZExpc3QoKSk7XG5cbiAgaGFzaCA9IChrZXkpID0+IHtcbiAgICAvLyB0YWtlcyBhIHZhbHVlIGFuZCBwcm9kdWNlcyBhIGhhc2ggY29kZSB3aXRoIGl0LlxuICAgIGxldCBoYXNoQ29kZSA9IDA7XG5cbiAgICBjb25zdCBwcmltZU51bWJlciA9IDMxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAvLyBoYXNoQ29kZSA9IChwcmltZU51bWJlciAqIGhhc2hDb2RlICsga2V5LmNoYXJDb2RlQXQoaSkpICUgY2FwYWNpdHk7XG4gICAgICBoYXNoQ29kZSA9IEJpZ0ludChwcmltZU51bWJlcikgKiBCaWdJbnQoaGFzaENvZGUpICsgQmlnSW50KGtleS5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYXBhY2l0eUJpZ0ludCA9IEJpZ0ludCh0aGlzLiNjYXBhY2l0eSk7XG4gICAgaGFzaENvZGUgPSBOdW1iZXIoaGFzaENvZGUgJSBjYXBhY2l0eUJpZ0ludCk7XG5cbiAgICBpZiAoaGFzaENvZGUgPCAwIHx8IGhhc2hDb2RlID49IGNhcGFjaXR5QmlnSW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgaW5kZXggb3V0IG9mIGJvdW5kJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc2hDb2RlO1xuICAgIC8vIHJldHVybiBoYXNoQ29kZTtcbiAgfTtcblxuICAjZ3JvdyA9ICgpID0+IHtcbiAgICB0aGlzLiNjYXBhY2l0eSAqPSAyO1xuICAgIHRoaXMuI251bUVudHJpZXMgPSAwO1xuICAgIGNvbnN0IGtleXNBcnIgPSB0aGlzLmtleXMoKTtcbiAgICBjb25zb2xlLmxvZyhrZXlzQXJyKTtcbiAgICB0aGlzLiNhcnIgPSBuZXcgQXJyYXkodGhpcy4jY2FwYWNpdHkpLmZpbGwoKS5tYXAoKCkgPT4gbmV3IExpbmtlZExpc3QoKSk7XG4gICAga2V5c0Fyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLnNldChpdGVtKTtcbiAgICB9KTtcbiAgfTtcblxuICBzZXQgPSAoa2V5KSA9PiB7XG4gICAgLy8gdGFrZXMgdHdvIGFyZ3VtZW50cywgdGhlIGZpcnN0IGlzIGEga2V5IGFuZCB0aGUgc2Vjb25kIGlzIGEgdmFsdWUgdGhhdCBpcyBhc3NpZ25lZCB0byB0aGlzIGtleS5cbiAgICAvLyBJZiBhIGtleSBhbHJlYWR5IGV4aXN0cywgdGhlbiB0aGUgb2xkIHZhbHVlIGlzIG92ZXJ3cml0dGVuLlxuICAgIC8vIGdyb3cgeW91ciBidWNrZXRzIHNpemUgd2hlbiBpdCBuZWVkcyB0bywgYnkgY2FsY3VsYXRpbmcgaWYgeW91ciBidWNrZXQgaGFzIHJlYWNoZWQgdGhlIGxvYWQgZmFjdG9yLlxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5oYXNoKGtleSk7XG4gICAgY29uc3QgYnVja2V0ID0gdGhpcy4jYXJyW2luZGV4XTtcbiAgICBjb25zdCBsaW5rZWRMaXN0SW5kZXggPSBidWNrZXQuZmluZChrZXkpO1xuICAgIGlmIChidWNrZXQuc2l6ZSgpID09PSAwIHx8IGxpbmtlZExpc3RJbmRleCA9PT0gbnVsbCkge1xuICAgICAgYnVja2V0LmFwcGVuZChrZXkpO1xuICAgICAgdGhpcy4jbnVtRW50cmllcyArPSAxO1xuICAgICAgdGhpcy4jbG9hZEZhY3RvciA9IHRoaXMuI251bUVudHJpZXMgLyB0aGlzLiNjYXBhY2l0eTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jbG9hZEZhY3RvciA+IHRoaXMuI3RocmVzaG9sZCkge1xuICAgICAgLy8gVG8gZ3JvdyBvdXIgYnVja2V0cyxcbiAgICAgIC8vIHdlIGNyZWF0ZSBhIG5ldyBidWNrZXRzIGxpc3QgdGhhdCBpcyBkb3VibGUgdGhlIHNpemUgb2YgdGhlIG9sZCBidWNrZXRzIGxpc3QsXG4gICAgICAvLyB0aGVuIHdlIGNvcHkgYWxsIG5vZGVzIG92ZXIgdG8gdGhlIG5ldyBidWNrZXRzLlxuICAgICAgdGhpcy4jZ3JvdygpO1xuICAgIH1cbiAgfTtcblxuICBnZXQgPSAoa2V5KSA9PiB7XG4gICAgLy8gVGFrZXMgb25lIGFyZ3VtZW50IGFzIGEga2V5IGFuZCByZXR1cm5zIHRoZSBub2RlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleS5cbiAgICAvLyBJZiBrZXkgaXMgbm90IGZvdW5kLCByZXR1cm4gbnVsbC5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaGFzaChrZXkpO1xuICAgIGNvbnN0IGJ1Y2tldCA9IHRoaXMuI2FycltpbmRleF07XG4gICAgY29uc3QgbGlua2VkTGlzdEluZGV4ID0gYnVja2V0LmZpbmQoa2V5KTtcbiAgICBjb25zdCBub2RlID0gYnVja2V0LmF0SW5kZXgobGlua2VkTGlzdEluZGV4KTtcbiAgICAvLyByZXR1cm4gIW5vZGUgPyBudWxsIDogbm9kZTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuICFub2RlLnZhbHVlID8gbm9kZSA6IG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGhhcyA9IChrZXkpID0+IHtcbiAgICAvLyB0YWtlcyBhIGtleSBhcyBhbiBhcmd1bWVudCBhbmQgcmV0dXJucyB0cnVlIG9yIGZhbHNlIGJhc2VkIG9uIHdoZXRoZXIgb3Igbm90IHRoZSBrZXkgaXMgaW4gdGhlIGhhc2ggbWFwLlxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5oYXNoKGtleSk7XG4gICAgY29uc3QgYnVja2V0ID0gdGhpcy4jYXJyW2luZGV4XTtcbiAgICByZXR1cm4gYnVja2V0LmNvbnRhaW5zKGtleSk7XG4gIH07XG5cbiAgcmVtb3ZlID0gKGtleSkgPT4ge1xuICAgIC8vIHRha2VzIGEga2V5IGFzIGFuIGFyZ3VtZW50LlxuICAgIC8vIElmIHRoZSBnaXZlbiBrZXkgaXMgaW4gdGhlIGhhc2ggbWFwLCBpdCBzaG91bGQgcmVtb3ZlIHRoZSBlbnRyeSB3aXRoIHRoYXQga2V5IGFuZCByZXR1cm4gdHJ1ZS5cbiAgICAvLyBJZiB0aGUga2V5IGlzbuKAmXQgaW4gdGhlIGhhc2ggbWFwLCBpdCBzaG91bGQgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5oYXNoKGtleSk7XG4gICAgICBjb25zdCBidWNrZXQgPSB0aGlzLiNhcnJbaW5kZXhdO1xuICAgICAgY29uc3QgbGlua2VkTGlzdEluZGV4ID0gYnVja2V0LmZpbmQoa2V5KTtcbiAgICAgIGJ1Y2tldC5yZW1vdmVBdChsaW5rZWRMaXN0SW5kZXgpO1xuICAgICAgdGhpcy4jbnVtRW50cmllcyAtPSAxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBsZW5ndGggPSAoKSA9PiB7XG4gICAgLy8gcmV0dXJucyB0aGUgbnVtYmVyIG9mIHN0b3JlZCBrZXlzIGluIHRoZSBoYXNoIG1hcC5cbiAgICByZXR1cm4gdGhpcy4jbnVtRW50cmllcztcbiAgfTtcblxuICBjbGVhciA9ICgpID0+IHtcbiAgICAvLyByZW1vdmVzIGFsbCBlbnRyaWVzIGluIHRoZSBoYXNoIG1hcFxuICAgIHRoaXMuI2Fyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB3aGlsZSAoaXRlbS5zaXplKCkgPiAwKSB7XG4gICAgICAgIGl0ZW0ucG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAga2V5cyA9ICgpID0+IHtcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXlzIGluc2lkZSB0aGUgaGFzaCBtYXAuXG4gICAgY29uc3Qga2V5c0FyciA9IFtdO1xuICAgIHRoaXMuI2Fyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5zaXplKCkgPiAwKSB7XG4gICAgICAgIGxldCBub2RlID0gaXRlbS5oZWFkKCk7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAga2V5c0Fyci5wdXNoKG5vZGUua2V5KTtcbiAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ga2V5c0FycjtcbiAgfTtcblxuICBpbmRleE9mID0gKGtleSkgPT4ge1xuICAgIC8vIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBidWNrZXQgdGhhdCB0aGUga2V5IGJlbG9uZ3MgdG9cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaGFzaChrZXkpO1xuICAgIHJldHVybiB0aGlzLmhhcyhrZXkpID8gaW5kZXggOiAnS2V5IGRvZXMgbm90IGV4aXN0JztcbiAgfTtcblxuICBwcmludCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLiNhcnIpO1xuICB9O1xufVxuIiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkTGlzdCB7XG4gICNoZWFkID0gbnVsbDtcblxuICAjdGFpbCA9IG51bGw7XG5cbiAgI3NpemUgPSAwO1xuXG4gIGFwcGVuZChrZXksIHZhbHVlKSB7XG4gICAgLy8gYWRkcyBhIG5ldyBub2RlIGNvbnRhaW5pbmcgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgIGNvbnN0IG5vZGUgPSBuZXcgTm9kZShrZXksIHZhbHVlKTtcbiAgICBpZiAodGhpcy4jc2l6ZSA9PT0gMCkge1xuICAgICAgdGhpcy4jaGVhZCA9IG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRtcCA9IHRoaXMuI3RhaWw7XG4gICAgICB0bXAubmV4dCA9IG5vZGU7XG4gICAgfVxuICAgIHRoaXMuI3RhaWwgPSBub2RlO1xuICAgIHRoaXMuI3NpemUgKz0gMTtcbiAgfVxuXG4gIHNpemUoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI3NpemU7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIC8vIHJldHVybnMgdGhlIGZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICByZXR1cm4gdGhpcy4jaGVhZDtcbiAgfVxuXG4gIHRhaWwoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgbGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgcmV0dXJuIHRoaXMuI3RhaWw7XG4gIH1cblxuICBhdEluZGV4KG4pIHtcbiAgICAvLyByZXR1cm5zIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBpbmRleFxuICAgIGxldCBub2RlID0gdGhpcy4jaGVhZDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAoaW5kZXggPT09IG4pIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKCFub2RlLm5leHQpIHtcbiAgICAgICAgbm9kZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIC8vIHJlbW92ZXMgdGhlIGxhc3QgZWxlbWVudCBmcm9tIHRoZSBsaXN0XG4gICAgaWYgKHRoaXMuI3NpemUgPiAwKSB7XG4gICAgICBpZiAodGhpcy4jc2l6ZSA+IDEpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlTGFzdCA9IHRoaXMuYXRJbmRleCh0aGlzLiNzaXplIC0gMik7XG4gICAgICAgIGJlZm9yZUxhc3QubmV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuI3RhaWwgPSBiZWZvcmVMYXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4jdGFpbCA9IG51bGw7XG4gICAgICAgIHRoaXMuI2hlYWQgPSBudWxsO1xuICAgICAgICBkZWxldGUgdGhpcy5hdEluZGV4KDApO1xuICAgICAgfVxuICAgICAgdGhpcy4jc2l6ZSAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRhaW5zKGtleSkge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIGluIHZhbHVlIGlzIGluIHRoZSBsaXN0IGFuZCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAgICByZXR1cm4gdGhpcy5maW5kKGtleSkgIT09IG51bGw7XG4gIH1cblxuICBmaW5kKGtleSkge1xuICAgIC8vIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBub2RlIGNvbnRhaW5pbmcgdmFsdWUsIG9yIG51bGwgaWYgbm90IGZvdW5kXG4gICAgbGV0IG5vZGUgPSB0aGlzLiNoZWFkO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmtleSA9PT0ga2V5KSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIC8vIHJlcHJlc2VudHMgeW91ciBMaW5rZWRMaXN0IG9iamVjdHMgYXMgc3RyaW5ncyxcbiAgICAvLyBzbyB5b3UgY2FuIHByaW50IHRoZW0gb3V0IGFuZCBwcmV2aWV3IHRoZW0gaW4gdGhlIGNvbnNvbGUuXG4gICAgLy8gVGhlIGZvcm1hdCBzaG91bGQgYmU6ICggdmFsdWUgKSAtPiAoIHZhbHVlICkgLT4gKCB2YWx1ZSApIC0+IG51bGxcbiAgICBsZXQgbm9kZSA9IHRoaXMuI2hlYWQ7XG4gICAgbGV0IHN0cmluZyA9IG5vZGUgPyAnJyA6IG51bGw7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIHN0cmluZyArPSBgKCAke25vZGUudmFsdWV9ICkgLT4gYDtcbiAgICAgIGlmICghbm9kZS5uZXh0KSB7XG4gICAgICAgIHN0cmluZyArPSBgbnVsbGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHJlbW92ZUF0KGluZGV4KSB7XG4gICAgLy8gdGhhdCByZW1vdmVzIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBpbmRleFxuICAgIGlmIChpbmRleCA8IHRoaXMuI3NpemUgJiYgaW5kZXggPj0gMCkge1xuICAgICAgLy8gY2hlY2tzIGlmIHRoZSBpbmRleCBpcyB3aXRoaW4gdGhlIGxpbmtlZCBsaXN0J3Mgc2l6ZVxuICAgICAgLy8gaW5kZXggY2FuIG5ldmVyIGJlIGxlc3MgdGhhbiAwXG4gICAgICAvLyBpbmRleCBjYW4gbmV2ZXIgYmUgZ3JlYXRlciB0aGFuIHRoZSBsaW5rZWQgbGlzdCdzIHNpemVcbiAgICAgIGlmIChpbmRleCArIDEgPT09IHRoaXMuI3NpemUpIHtcbiAgICAgICAgdGhpcy5wb3AoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy4jc2l6ZSA+IDEgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy4jaGVhZCA9IHRoaXMuYXRJbmRleChpbmRleCArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuYXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuYXRJbmRleChpbmRleCArIDEpO1xuICAgICAgICBsZWZ0Lm5leHQgPSByaWdodDtcbiAgICAgIH1cblxuICAgICAgdGhpcy4jc2l6ZSAtPSAxO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGtleSwgdmFsdWUsIG5leHQpIHtcbiAgICB0aGlzLmtleSA9ICFrZXkgPyBudWxsIDoga2V5O1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLm5leHQgPSAhbmV4dCA/IG51bGwgOiBuZXh0O1xuICB9XG59XG4iLCJpbXBvcnQgSGFzaE1hcCBmcm9tICcuL2NvbnRhaW5lcnMvaGFzaG1hcCc7XG5pbXBvcnQgSGFzaFNldCBmcm9tICcuL2NvbnRhaW5lcnMvaGFzaHNldCc7XG5pbXBvcnQgdGVzdCBmcm9tICcuL2NvbXBvbmVudHMvdGVzdCc7XG5pbXBvcnQgJy4vaW5kZXguY3NzJztcblxud2luZG93Lkhhc2hNYXAgPSBIYXNoTWFwO1xud2luZG93LmZvbyA9IEhhc2hNYXAoKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5mb28pO1xuXG53aW5kb3cuSGFzaFNldCA9IEhhc2hTZXQ7XG53aW5kb3cuYmFyID0gbmV3IEhhc2hTZXQoKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5iYXIpO1xuXG5jb25zdCBlbnRyaWVzID0gW1xuICB7XG4gICAga2V5OiAnZmlyc3RLZXknLFxuICAgIHZhbHVlOiAnZmlyc3RWYWx1ZScsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdzZWNvbmRLZXknLFxuICAgIHZhbHVlOiAnc2Vjb25kVmFsdWUnLFxuICB9LFxuICB7IGtleTogJ3RoaXJkS2V5JywgdmFsdWU6ICd0aGlyZFZhbHVlJyB9LFxuICB7IGtleTogJ2ZvdXJ0aEtleScsIHZhbHVlOiAnZm91cnRoVmFsdWUnIH0sXG4gIHsga2V5OiAnZmlmdGhLZXknLCB2YWx1ZTogJ2ZpZnRoVmFsdWUnIH0sXG4gIHsga2V5OiAnc2l4dGhLZXknLCB2YWx1ZTogJ3NpeHRoVmFsdWUnIH0sXG4gIHsga2V5OiAnc2V2ZW50aEtleScsIHZhbHVlOiAnc2V2ZW50aFZhbHVlJyB9LFxuICB7IGtleTogJ2VpZ2h0aEtleScsIHZhbHVlOiAnZWlnaHRoVmFsdWUnIH0sXG4gIHsga2V5OiAnbmludGhLZXknLCB2YWx1ZTogJ25pbnRoVmFsdWUnIH0sXG4gIHsga2V5OiAndGVudGhLZXknLCB2YWx1ZTogJ3RlbnRoVmFsdWUnIH0sXG4gIHsga2V5OiAnZWxldmVudGhLZXknLCB2YWx1ZTogJ2VsZXZlbnRoVmFsdWUnIH0sXG4gIHsga2V5OiAndHdlbGZ0aEtleScsIHZhbHVlOiAndHdlbGZ0aFZhbHVlJyB9LFxuICB7IGtleTogJ3RoaXJ0ZWVudGhLZXknLCB2YWx1ZTogJ3RoaXJ0ZWVudGhWYWx1ZScgfSxcbiAgeyBrZXk6ICdmb3VydGVlbnRoS2V5JywgdmFsdWU6ICdmb3VydGVlbnRoVmFsdWUnIH0sXG5dO1xuXG5lbnRyaWVzLmZvckVhY2goKGl0ZW0pID0+IHdpbmRvdy5mb28uc2V0KGl0ZW0ua2V5LCBpdGVtLnZhbHVlKSk7XG53aW5kb3cuZm9vLnByaW50KCk7XG5lbnRyaWVzLmZvckVhY2goKGl0ZW0pID0+IHdpbmRvdy5iYXIuc2V0KGl0ZW0ua2V5LCBpdGVtLnZhbHVlKSk7XG53aW5kb3cuYmFyLnByaW50KCk7XG5cbnRlc3QucHJpbnQoKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdC5yZW5kZXIoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=