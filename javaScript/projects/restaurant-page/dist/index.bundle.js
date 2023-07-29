"use strict";
(self["webpackChunkrestaurant_page"] = self["webpackChunkrestaurant_page"] || []).push([["index"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    /* color palette */
    /* https://huemint.com/brand-intersection/ */
    --background-color-primary: #f5f5f5;
    --placeholder-one: #f5d3d2;
    --placeholder-two: #3a4279;
    --placeholder-three: #478dd6;
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

#navbar > .container {
    display: grid;
    justify-content: end;
    position: relative;
}

.links {
    display: none;
    grid-auto-rows: min-content;
    list-style: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: var(--placeholder-three);
}

.links > li > a {
    display: block;
    text-decoration: none;
    font-size: 2rem;
}

.menu {
    border: none;
    background: none;
    position: relative;
}

.menu > img {
    max-width: 32px;
}

#hero {
    display: grid;
}

#hero > h1 {
    justify-self: center;
}

footer > .container {
    display: flex;
    justify-content: center;
}`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,4CAA4C;IAC5C,mCAAmC;IACnC,0BAA0B;IAC1B,0BAA0B;IAC1B,4BAA4B;AAChC;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,iDAAiD;IACjD,aAAa;IACb,+CAA+C;AACnD;;AAEA;IACI,aAAa;IACb,oBAAoB;IACpB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,2BAA2B;IAC3B,gBAAgB;IAChB,eAAe;IACf,YAAY;IACZ,aAAa;IACb,MAAM;IACN,0CAA0C;AAC9C;;AAEA;IACI,cAAc;IACd,qBAAqB;IACrB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,uBAAuB;AAC3B","sourcesContent":[":root {\n    /* color palette */\n    /* https://huemint.com/brand-intersection/ */\n    --background-color-primary: #f5f5f5;\n    --placeholder-one: #f5d3d2;\n    --placeholder-two: #3a4279;\n    --placeholder-three: #478dd6;\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    min-height: 100vh;\n    background-color: var(--background-color-primary);\n    display: grid;\n    grid-template-rows: min-content 1fr min-content;\n}\n\n#navbar > .container {\n    display: grid;\n    justify-content: end;\n    position: relative;\n}\n\n.links {\n    display: none;\n    grid-auto-rows: min-content;\n    list-style: none;\n    position: fixed;\n    width: 100vw;\n    height: 100vh;\n    top: 0;\n    background-color: var(--placeholder-three);\n}\n\n.links > li > a {\n    display: block;\n    text-decoration: none;\n    font-size: 2rem;\n}\n\n.menu {\n    border: none;\n    background: none;\n    position: relative;\n}\n\n.menu > img {\n    max-width: 32px;\n}\n\n#hero {\n    display: grid;\n}\n\n#hero > h1 {\n    justify-self: center;\n}\n\nfooter > .container {\n    display: flex;\n    justify-content: center;\n}"],"sourceRoot":""}]);
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

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
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
            this.navItems = Array.from(this.navBar.querySelectorAll('.container ul li'));
            console.log(this.contentContainer);
        },
        render: function(key) {
            let content;
            if (!key) {
                console.log('render running: no key'); //for debugging
                content = build.home();
                this.activeTab = content;
            } else {
                console.log(`render running: ${key}`); //for debugging
                this.activeTab.remove();
                content = build[key]();
                this.activeTab = content;
            }
            console.log(content); //for debugging
            this.contentContainer.appendChild(content);
        },
        bindEvents: function() {
            this.switchTab = this.switchTab.bind(this);
            this.navItems.forEach(item => item.addEventListener('click', this.switchTab));
        },
        switchTab: function(e) {
            console.log('switchTab running');
            for (const key in build) {
                if (e.target.className ===  key && this.activeTab.id !== e.target.className) {
                    this.render(key);
                }
            }
        },
    }
    //structure
        //nav
            //HOME ABOUT MENU CONTACT
        //header
            //h1
        //#content
            //changes based on current tab
        //footer

    content.init();
})();

/***/ }),

/***/ "./src/modules/about.js":
/*!******************************!*\
  !*** ./src/modules/about.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildAbout)
/* harmony export */ });
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
        aboutMainWrapper.id = 'about';

        const aboutMainParagraph = document.createElement('p');
        const aboutMainParagraphText = document.createTextNode(text);
        aboutMainParagraph.appendChild(aboutMainParagraphText);
        aboutMainWrapper.appendChild(aboutMainParagraph);

        return aboutMainWrapper;
    }
}

const aboutHistory = {
    render: function() {
        const historyWrapper = document.createElement('div');
        historyWrapper.id = 'history';

        for (let key in this.history) {
            const historyContainer = document.createElement('div');
            const historyHeading = document.createElement('h6');
            const historyHeadingText = document.createTextNode(`${key}, ${this.history[key][0]}`);
            historyHeading.appendChild(historyHeadingText);

            const historyParagraph = document.createElement('p');
            const historyParagraphText = document.createTextNode(this.history[key][1]);
            historyParagraph.appendChild(historyParagraphText);

            historyContainer.appendChild(historyHeading);
            historyContainer.appendChild(historyParagraph);
            historyWrapper.appendChild(historyContainer);
        }

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildContact)
/* harmony export */ });
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

//name
//email
//phone number
//message
const form = {
    render: function() {
        const formContainer = document.createElement('div');
        formContainer.id = 'container';
        
        const formElement = document.createElement('form');
        formElement.id = 'form'
        for (let inputs in this.attributes) {
            console.log(inputs)
            console.log(this.attributes[inputs])
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');
            const label = document.createElement('label');
            const labelText = document.createTextNode(inputs);
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
            
            formElement.appendChild(formItem);
        }

        formContainer.appendChild(formElement);
        return formContainer;
    },
    attributes: {
        name: {
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'firstname lastname',
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
    }
}

/***/ }),

/***/ "./src/modules/footer.js":
/*!*******************************!*\
  !*** ./src/modules/footer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFooter)
/* harmony export */ });
function buildFooter() {
    const footerWrapper = document.createElement('footer');

    const footerContainer = document.createElement('div');
    footerContainer.classList.add('container');

    const footerHeader = document.createElement('h6');
    const footerText = document.createTextNode('Placholder');
    
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHeader)
/* harmony export */ });
/* harmony import */ var _assets_icons_menu_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/menu.svg */ "./src/assets/icons/menu.svg");


const navLinks = ['home', 'about', 'menu', 'contact'];

function buildHeader() {
    console.log(`navbar.js running`); //for debugging
    const headerWrapper = document.createElement('header');
    const headerContainer = document.createElement('div');
    const heading = document.createElement('h1');
    const headingText = document.createTextNode('Restaurant');
    headerContainer.id = 'hero';

    const heroContainer = document.createElement('div');
    heroContainer.classList.add('container');

    heading.appendChild(headingText);
    headerContainer.appendChild(heading);
    headerWrapper.appendChild(headerContainer);

    headerWrapper.insertBefore(nav.render(), headerContainer);
    document.body.insertBefore(headerWrapper, document.body.firstChild);
}

const nav = {
    render: function() {
        const navWrapper = document.createElement('nav');
        const navContainer = document.createElement('div');
        
        const navMenu = document.createElement('button');
        navMenu.setAttribute('aria-pressed', false);
        const navMenuImg = new Image();
        navMenuImg.src = _assets_icons_menu_svg__WEBPACK_IMPORTED_MODULE_0__;
        navMenu.appendChild(navMenuImg);
    
        navMenu.classList.add('menu');

        navWrapper.id = 'navbar';
        navContainer.classList.add('container');
    
        const navList = document.createElement('ul');
        navList.classList.add('links');

        navLinks.forEach(item => {
            const navItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = '#';
            anchor.classList.add(item);
    
            const navItemText = document.createTextNode(item);
            anchor.appendChild(navItemText);
            navItem.appendChild(anchor);
            navList.appendChild(navItem);
        })
        navContainer.appendChild(navList);
        navContainer.appendChild(navMenu);
        navWrapper.appendChild(navContainer);
        this.cacheDOM(navMenu, navList);
        this.bindEvents();
        return navWrapper;
    },
    cacheDOM: function(btn, ul) {
        this.button = btn;
        this.menu = ul;
    },
    bindEvents: function() {
        this.toggleMenu = this.toggleMenu.bind(this);
        this.button.addEventListener('click', this.toggleMenu);
        this.menu.addEventListener('click', this.toggleMenu);
    },
    toggleMenu: function() {
        console.log(`toggleMenu firing`); //for debugging
        let isPressed = JSON.parse(this.button.getAttribute('aria-pressed')) == true || false;
        this.button.setAttribute('aria-pressed', !isPressed);
        let display;
        isPressed ? display = 'none' : display = 'grid';
        this.menu.style.display = display;
    },
}


/***/ }),

/***/ "./src/modules/home.js":
/*!*****************************!*\
  !*** ./src/modules/home.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHome)
/* harmony export */ });
function buildHome() {
    console.log('buildHome running');
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Welcome');
    header.appendChild(headerText);
    homeContainer.appendChild(header);


    homeContainer.appendChild(imageCarousel.render());
    homeContainer.appendChild(statement.render());
    homeContainer.appendChild(openHours.render());
    homeContainer.appendChild(location.render());
    return homeContainer;
}

//images slideshow
const imageCarousel = {
    render: function() {
        const carouselContainer = document.createElement('div');
        carouselContainer.id = 'carousel';

        return carouselContainer;
    },
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

        const locationParagraph = document.createElement('p');
        const locationParagraphText = document.createTextNode('1234 NW Placholder Rd. State, QQ 56789');
        locationParagraph.appendChild(locationParagraphText);
        locationContainer.appendChild(locationParagraph);
        locationWrapper.appendChild(locationContainer);

        return locationWrapper;
    }
}

/***/ }),

/***/ "./src/modules/menu.js":
/*!*****************************!*\
  !*** ./src/modules/menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMenu)
/* harmony export */ });
function buildMenu() {
    console.log(`menu.js running`);
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Menu');
    header.appendChild(headerText);
    menuContainer.appendChild(header);

    // menuContainer.appendChild(food.render());
    menu.render();
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

const pizza = [
    food('rhoa', 'tomato sauce, mozzarella, oregano, roasted rhoa', '15.00'),
    food('pepperoni', 'tomato sauce, mozzarella, oregano, pepperoni', '10.00'),
];

const salad = [
    food('weta', 'romaine lettuce, cucumber, sunflower seeds, tomatoes, weta', '5.00'),
];

const menu = {
    test: 'test',
    food: {
        pizzas: {pizza},
        salads: {salad},
        appetizers: {tea: [food('test', 'a b c', '1.00'), food('vvvv', 'c d e', '2.00')]}
    },
    render: function() {
        console.log(this.food);
        // for (let item in menu.food) {
        //     console.log(item);
        //     for (let food in menu.food[item]) {
        //         for (let i = 0; i < menu.food[item][food].length; i ++) {
        //             console.log(menu.food[item][food][i].dish);
        //             console.log(menu.food[item][food][i].details);
        //             console.log(menu.food[item][food][i].price);
        //         }
        //     }
        // }
    }
}
//Pizzas
//Signature Pizzas
//Sides

/***/ }),

/***/ "./src/assets/icons/menu.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/menu.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "132af47f7c9ff9c54b7b.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0EsY0FBYztBQUNkLCtDQUErQyxJQUFJLElBQUk7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDeEVjO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsSUFBSSxJQUFJLHFCQUFxQjtBQUMvRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNGZTtBQUNmOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2RnRDs7QUFFaEQ7O0FBRWU7QUFDZixzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtREFBUTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7OztBQzdFZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNHZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QixpQkFBaUIsTUFBTTtBQUN2QixxQkFBcUI7QUFDckIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0NBQWtDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9zdHlsZXMuY3NzPzQ0YjIiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvYWJvdXQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvaGVhZGVyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvbWVudS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgOnJvb3Qge1xuICAgIC8qIGNvbG9yIHBhbGV0dGUgKi9cbiAgICAvKiBodHRwczovL2h1ZW1pbnQuY29tL2JyYW5kLWludGVyc2VjdGlvbi8gKi9cbiAgICAtLWJhY2tncm91bmQtY29sb3ItcHJpbWFyeTogI2Y1ZjVmNTtcbiAgICAtLXBsYWNlaG9sZGVyLW9uZTogI2Y1ZDNkMjtcbiAgICAtLXBsYWNlaG9sZGVyLXR3bzogIzNhNDI3OTtcbiAgICAtLXBsYWNlaG9sZGVyLXRocmVlOiAjNDc4ZGQ2O1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnIgbWluLWNvbnRlbnQ7XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmxpbmtzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGdyaWQtYXV0by1yb3dzOiBtaW4tY29udGVudDtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB0b3A6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGxhY2Vob2xkZXItdGhyZWUpO1xufVxuXG4ubGlua3MgPiBsaSA+IGEge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXNpemU6IDJyZW07XG59XG5cbi5tZW51IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5tZW51ID4gaW1nIHtcbiAgICBtYXgtd2lkdGg6IDMycHg7XG59XG5cbiNoZXJvIHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4jaGVybyA+IGgxIHtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbn1cblxuZm9vdGVyID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLDRDQUE0QztJQUM1QyxtQ0FBbUM7SUFDbkMsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixpREFBaUQ7SUFDakQsYUFBYTtJQUNiLCtDQUErQztBQUNuRDs7QUFFQTtJQUNJLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDJCQUEyQjtJQUMzQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFlBQVk7SUFDWixhQUFhO0lBQ2IsTUFBTTtJQUNOLDBDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gICAgLyogY29sb3IgcGFsZXR0ZSAqL1xcbiAgICAvKiBodHRwczovL2h1ZW1pbnQuY29tL2JyYW5kLWludGVyc2VjdGlvbi8gKi9cXG4gICAgLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnk6ICNmNWY1ZjU7XFxuICAgIC0tcGxhY2Vob2xkZXItb25lOiAjZjVkM2QyO1xcbiAgICAtLXBsYWNlaG9sZGVyLXR3bzogIzNhNDI3OTtcXG4gICAgLS1wbGFjZWhvbGRlci10aHJlZTogIzQ3OGRkNjtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLXByaW1hcnkpO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmciBtaW4tY29udGVudDtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ubGlua3Mge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQ7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYWNlaG9sZGVyLXRocmVlKTtcXG59XFxuXFxuLmxpbmtzID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4ubWVudSB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ubWVudSA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMzJweDtcXG59XFxuXFxuI2hlcm8ge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4jaGVybyA+IGgxIHtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbmZvb3RlciA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuaW1wb3J0IGJ1aWxkSGVhZGVyIGZyb20gJy4vbW9kdWxlcy9oZWFkZXIuanMnO1xuaW1wb3J0IGJ1aWxkSG9tZSBmcm9tICcuL21vZHVsZXMvaG9tZS5qcyc7XG5pbXBvcnQgYnVpbGRBYm91dCBmcm9tICcuL21vZHVsZXMvYWJvdXQuanMnO1xuaW1wb3J0IGJ1aWxkTWVudSBmcm9tICcuL21vZHVsZXMvbWVudS5qcyc7XG5pbXBvcnQgYnVpbGRDb250YWN0IGZyb20gJy4vbW9kdWxlcy9jb250YWN0LmpzJztcbmltcG9ydCBidWlsZEZvb3RlciBmcm9tICcuL21vZHVsZXMvZm9vdGVyLmpzJztcblxuY29uc3QgaG9tZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBidWlsZCA9IHtcbiAgICAgICAgaGVhZGVyOiBidWlsZEhlYWRlcixcbiAgICAgICAgaG9tZTogYnVpbGRIb21lLFxuICAgICAgICBhYm91dDogYnVpbGRBYm91dCxcbiAgICAgICAgbWVudTogYnVpbGRNZW51LFxuICAgICAgICBjb250YWN0OiBidWlsZENvbnRhY3QsXG4gICAgICAgIGZvb3RlcjogYnVpbGRGb290ZXIsXG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgICAgYWN0aXZlVGFiOiBudWxsLFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJ1aWxkLmhlYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5jYWNoZURPTSgpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgYnVpbGQuZm9vdGVyKCk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKTtcbiAgICAgICAgICAgIHRoaXMubmF2QmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hdmJhcicpO1xuICAgICAgICAgICAgdGhpcy5uYXZJdGVtcyA9IEFycmF5LmZyb20odGhpcy5uYXZCYXIucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lciB1bCBsaScpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGVudENvbnRhaW5lcik7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbmRlciBydW5uaW5nOiBubyBrZXknKTsgLy9mb3IgZGVidWdnaW5nXG4gICAgICAgICAgICAgICAgY29udGVudCA9IGJ1aWxkLmhvbWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IGNvbnRlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGByZW5kZXIgcnVubmluZzogJHtrZXl9YCk7IC8vZm9yIGRlYnVnZ2luZ1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coY29udGVudCk7IC8vZm9yIGRlYnVnZ2luZ1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoVGFiID0gdGhpcy5zd2l0Y2hUYWIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubmF2SXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN3aXRjaFRhYikpO1xuICAgICAgICB9LFxuICAgICAgICBzd2l0Y2hUYWI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzd2l0Y2hUYWIgcnVubmluZycpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnVpbGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSAga2V5ICYmIHRoaXMuYWN0aXZlVGFiLmlkICE9PSBlLnRhcmdldC5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuICAgIC8vc3RydWN0dXJlXG4gICAgICAgIC8vbmF2XG4gICAgICAgICAgICAvL0hPTUUgQUJPVVQgTUVOVSBDT05UQUNUXG4gICAgICAgIC8vaGVhZGVyXG4gICAgICAgICAgICAvL2gxXG4gICAgICAgIC8vI2NvbnRlbnRcbiAgICAgICAgICAgIC8vY2hhbmdlcyBiYXNlZCBvbiBjdXJyZW50IHRhYlxuICAgICAgICAvL2Zvb3RlclxuXG4gICAgY29udGVudC5pbml0KCk7XG59KSgpOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQWJvdXQoKSB7XG4gICAgY29uc29sZS5sb2coYGFib3V0LmpzIHJ1bm5pbmdgKTtcbiAgICBjb25zdCBhYm91dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFib3V0Q29udGFpbmVyLmlkID0gJ2Fib3V0JztcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdBYm91dCcpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBhYm91dENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIFxuICAgIGFib3V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGFib3V0TWFpbi5yZW5kZXIoKSk7XG4gICAgYWJvdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoYWJvdXRIaXN0b3J5LnJlbmRlcigpKTtcbiAgICByZXR1cm4gYWJvdXRDb250YWluZXI7XG59XG5cbmNvbnN0IGFib3V0TWFpbiA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gJ1Zhcml1cyBtb3JiaSBlbmltIG51bmMgZmF1Y2lidXMgYSBwZWxsZW50ZXNxdWUgc2l0IGFtZXQgcG9ydHRpdG9yLiBNYWduYSBlZ2V0IGVzdCBsb3JlbSBpcHN1bSBkb2xvciBzaXQuIEFyY3UgZmVsaXMgYmliZW5kdW0gdXQgdHJpc3RpcXVlIGV0LiBUZW1wdXMgaW1wZXJkaWV0IG51bGxhIG1hbGVzdWFkYSBwZWxsZW50ZXNxdWUgZWxpdCBlZ2V0IGdyYXZpZGEgY3VtLiBWaXZlcnJhIG9yY2kgc2FnaXR0aXMgZXUgdm9sdXRwYXQgb2Rpby4gSWQgbmliaCB0b3J0b3IgaWQgYWxpcXVldC4gRmF1Y2lidXMgbmlzbCB0aW5jaWR1bnQgZWdldCBudWxsYW0uIEVnZXN0YXMgcXVpcyBpcHN1bSBzdXNwZW5kaXNzZSB1bHRyaWNlcy4gU3VzcGVuZGlzc2UgcG90ZW50aSBudWxsYW0gYWMgdG9ydG9yIHZpdGFlIHB1cnVzIGZhdWNpYnVzLiBUaW5jaWR1bnQgZWdldCBudWxsYW0gbm9uIG5pc2kgZXN0IHNpdC4nO1xuICAgICAgICBjb25zdCBhYm91dE1haW5XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFib3V0TWFpbldyYXBwZXIuaWQgPSAnYWJvdXQnO1xuXG4gICAgICAgIGNvbnN0IGFib3V0TWFpblBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgYWJvdXRNYWluUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgICBhYm91dE1haW5QYXJhZ3JhcGguYXBwZW5kQ2hpbGQoYWJvdXRNYWluUGFyYWdyYXBoVGV4dCk7XG4gICAgICAgIGFib3V0TWFpbldyYXBwZXIuYXBwZW5kQ2hpbGQoYWJvdXRNYWluUGFyYWdyYXBoKTtcblxuICAgICAgICByZXR1cm4gYWJvdXRNYWluV3JhcHBlcjtcbiAgICB9XG59XG5cbmNvbnN0IGFib3V0SGlzdG9yeSA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBoaXN0b3J5V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXN0b3J5V3JhcHBlci5pZCA9ICdoaXN0b3J5JztcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5SGVhZGluZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtrZXl9LCAke3RoaXMuaGlzdG9yeVtrZXldWzBdfWApO1xuICAgICAgICAgICAgaGlzdG9yeUhlYWRpbmcuYXBwZW5kQ2hpbGQoaGlzdG9yeUhlYWRpbmdUZXh0KTtcblxuICAgICAgICAgICAgY29uc3QgaGlzdG9yeVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlQYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5oaXN0b3J5W2tleV1bMV0pO1xuICAgICAgICAgICAgaGlzdG9yeVBhcmFncmFwaC5hcHBlbmRDaGlsZChoaXN0b3J5UGFyYWdyYXBoVGV4dCk7XG5cbiAgICAgICAgICAgIGhpc3RvcnlDb250YWluZXIuYXBwZW5kQ2hpbGQoaGlzdG9yeUhlYWRpbmcpO1xuICAgICAgICAgICAgaGlzdG9yeUNvbnRhaW5lci5hcHBlbmRDaGlsZChoaXN0b3J5UGFyYWdyYXBoKTtcbiAgICAgICAgICAgIGhpc3RvcnlXcmFwcGVyLmFwcGVuZENoaWxkKGhpc3RvcnlDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhpc3RvcnlXcmFwcGVyO1xuICAgIH0sXG4gICAgaGlzdG9yeToge1xuICAgICAgICAyMDEzOiBbJ1R3aWxpZ2h0IFN0cmFuZCcsICdDb21pbmcgZnJvbSBBc2NhbG9uLCB3ZSBzdHJpdmVkIHRvIGZlZWQgdGhvdXNhbmRzIG9mIGV4aWxlcyB3aXRoIGZhbWlsaWFyIGRpc2hlcy4gV2Ugc3RhcnRlZCBjb29raW5nIHBpenphcyBvbiBhIHNtYWxsIGZvb2QgY2FydCB3aXRoIGEgaG9tZW1hZGUgcGl6emEgb3ZlbiwgYW5kIHB1bGxlZCBvdXIgc2VydmljZSBhY3Jvc3MgVGhlIE11ZCBGbGF0cy4nXSxcbiAgICAgICAgMjAxNDogWydXZXRsYW5kcycsICdPdXIgZmlyc3QgZm9vZCB0cnVjayBoaXQgdGhlIHpvbmUgb2ZmZXJpbmcgbW9yZSBmb29kIGNob2ljZXMgd2lkZWx5IGtub3duIHRvIGxvY2Fscy4nXSxcbiAgICAgICAgMjAxNTogWydTYXJuIEVuY2FtcG1lbnQnLCAnT3VyIG9wZW4tY29uY2VwdCByZXN0YXVyYW50IG9wZW5lZCB1cCB0byB0aGUgdW5kZWFkLCBCbGFja2d1YXJkIHNvbGlkZXJzIGFuZCBwYXNzaW5nIGV4aWxlcy4nXSxcbiAgICB9LFxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQ29udGFjdCgpIHtcbiAgICBjb25zb2xlLmxvZyhgY29udGFjdC5qcyBydW5uaW5nYCk7XG4gICAgY29uc3QgY29udGFjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhY3RDb250YWluZXIuaWQgPSAnY29udGFjdCc7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQ29udGFjdCcpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBjb250YWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBjb250YWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0ucmVuZGVyKCkpO1xuICAgIHJldHVybiBjb250YWN0Q29udGFpbmVyO1xufVxuXG4vL25hbWVcbi8vZW1haWxcbi8vcGhvbmUgbnVtYmVyXG4vL21lc3NhZ2VcbmNvbnN0IGZvcm0gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyLmlkID0gJ2NvbnRhaW5lcic7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybUVsZW1lbnQuaWQgPSAnZm9ybSdcbiAgICAgICAgZm9yIChsZXQgaW5wdXRzIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXRzKVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRyaWJ1dGVzW2lucHV0c10pXG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybS1pdGVtJyk7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBjb25zdCBsYWJlbFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpbnB1dHMpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnYXN0ZXJpaycpO1xuICAgICAgICAgICAgY29uc3Qgc3BhblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnKicpO1xuICAgICAgICAgICAgbGFiZWwuaHRtbEZvciA9IGlucHV0cztcbiAgICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGxhYmVsVGV4dCk7XG4gICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKHNwYW5UZXh0KTtcbiAgICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgICAgICBpZiAoaW5wdXRzICE9PSAnbWVzc2FnZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgaW5wdXQuaWQgPSBpbnB1dHM7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dCwgdGhpcy5hdHRyaWJ1dGVzW2lucHV0c10pO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgIHRleHRBcmVhLmlkID0gaW5wdXRzO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGF0dHIgaW4gdGhpcy5hdHRyaWJ1dGVzW2lucHV0c10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFyZWEuc2V0QXR0cmlidXRlKGF0dHIsIHRoaXMuYXR0cmlidXRlc1tpbnB1dHNdW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1FbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGZvcm1Db250YWluZXI7XG4gICAgfSxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2ZpcnN0bmFtZSBsYXN0bmFtZScsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIGlkOiAnZW1haWwnLFxuICAgICAgICAgICAgbmFtZTogJ2VtYWlsJyxcbiAgICAgICAgICAgIHR5cGU6ICdlbWFpbCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2VtYWlsQGFkZHJlc3MuY29tJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICB9LFxuICAgICAgICBwaG9uZToge1xuICAgICAgICAgICAgaWQ6ICdwaG9uZScsXG4gICAgICAgICAgICBuYW1lOiAncGhvbmUnLFxuICAgICAgICAgICAgdHlwZTogJ3RlbCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1hYWC1YWFgtWFhYWCcsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgaWQ6ICdtZXNzYWdlJyxcbiAgICAgICAgICAgIG5hbWU6ICdtZXNzYWdlJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAneW91ciBtZXNzYWdlIGhlcmUgKDUwMCBjaGFyYWN0ZXJzIG1heCknLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRm9vdGVyKCkge1xuICAgIGNvbnN0IGZvb3RlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKTtcblxuICAgIGNvbnN0IGZvb3RlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvb3RlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgIGNvbnN0IGZvb3RlckhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gICAgY29uc3QgZm9vdGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdQbGFjaG9sZGVyJyk7XG4gICAgXG4gICAgZm9vdGVySGVhZGVyLmFwcGVuZENoaWxkKGZvb3RlclRleHQpO1xuICAgIGZvb3RlckNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXJIZWFkZXIpO1xuICAgIGZvb3RlcldyYXBwZXIuYXBwZW5kQ2hpbGQoZm9vdGVyQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyV3JhcHBlcik7XG59IiwiaW1wb3J0IE1lbnVJY29uIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9tZW51LnN2Zyc7XG5cbmNvbnN0IG5hdkxpbmtzID0gWydob21lJywgJ2Fib3V0JywgJ21lbnUnLCAnY29udGFjdCddO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcigpIHtcbiAgICBjb25zb2xlLmxvZyhgbmF2YmFyLmpzIHJ1bm5pbmdgKTsgLy9mb3IgZGVidWdnaW5nXG4gICAgY29uc3QgaGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGhlYWRpbmdUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1Jlc3RhdXJhbnQnKTtcbiAgICBoZWFkZXJDb250YWluZXIuaWQgPSAnaGVybyc7XG5cbiAgICBjb25zdCBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVyb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQoaGVhZGluZ1RleHQpO1xuICAgIGhlYWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICBoZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlckNvbnRhaW5lcik7XG5cbiAgICBoZWFkZXJXcmFwcGVyLmluc2VydEJlZm9yZShuYXYucmVuZGVyKCksIGhlYWRlckNvbnRhaW5lcik7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoaGVhZGVyV3JhcHBlciwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcbn1cblxuY29uc3QgbmF2ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG5hdldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICAgICAgY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIG5hdk1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IG5hdk1lbnVJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgbmF2TWVudUltZy5zcmMgPSBNZW51SWNvbjtcbiAgICAgICAgbmF2TWVudS5hcHBlbmRDaGlsZChuYXZNZW51SW1nKTtcbiAgICBcbiAgICAgICAgbmF2TWVudS5jbGFzc0xpc3QuYWRkKCdtZW51Jyk7XG5cbiAgICAgICAgbmF2V3JhcHBlci5pZCA9ICduYXZiYXInO1xuICAgICAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IG5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBuYXZMaXN0LmNsYXNzTGlzdC5hZGQoJ2xpbmtzJyk7XG5cbiAgICAgICAgbmF2TGlua3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgYW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgICAgICAgICBhbmNob3IuY2xhc3NMaXN0LmFkZChpdGVtKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbSk7XG4gICAgICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQobmF2SXRlbVRleHQpO1xuICAgICAgICAgICAgbmF2SXRlbS5hcHBlbmRDaGlsZChhbmNob3IpO1xuICAgICAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZJdGVtKTtcbiAgICAgICAgfSlcbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5hdkxpc3QpO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQobmF2TWVudSk7XG4gICAgICAgIG5hdldyYXBwZXIuYXBwZW5kQ2hpbGQobmF2Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5jYWNoZURPTShuYXZNZW51LCBuYXZMaXN0KTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHJldHVybiBuYXZXcmFwcGVyO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGJ0biwgdWwpIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidG47XG4gICAgICAgIHRoaXMubWVudSA9IHVsO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlTWVudSA9IHRoaXMudG9nZ2xlTWVudS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgICAgIHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTWVudSk7XG4gICAgfSxcbiAgICB0b2dnbGVNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHRvZ2dsZU1lbnUgZmlyaW5nYCk7IC8vZm9yIGRlYnVnZ2luZ1xuICAgICAgICBsZXQgaXNQcmVzc2VkID0gSlNPTi5wYXJzZSh0aGlzLmJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcpKSA9PSB0cnVlIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICFpc1ByZXNzZWQpO1xuICAgICAgICBsZXQgZGlzcGxheTtcbiAgICAgICAgaXNQcmVzc2VkID8gZGlzcGxheSA9ICdub25lJyA6IGRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICAgIHRoaXMubWVudS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICB9LFxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIb21lKCkge1xuICAgIGNvbnNvbGUubG9nKCdidWlsZEhvbWUgcnVubmluZycpO1xuICAgIGNvbnN0IGhvbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBob21lQ29udGFpbmVyLmlkID0gJ2hvbWUnO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1dlbGNvbWUnKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG5cbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlQ2Fyb3VzZWwucmVuZGVyKCkpO1xuICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50LnJlbmRlcigpKTtcbiAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wZW5Ib3Vycy5yZW5kZXIoKSk7XG4gICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbi5yZW5kZXIoKSk7XG4gICAgcmV0dXJuIGhvbWVDb250YWluZXI7XG59XG5cbi8vaW1hZ2VzIHNsaWRlc2hvd1xuY29uc3QgaW1hZ2VDYXJvdXNlbCA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBjYXJvdXNlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXJvdXNlbENvbnRhaW5lci5pZCA9ICdjYXJvdXNlbCc7XG5cbiAgICAgICAgcmV0dXJuIGNhcm91c2VsQ29udGFpbmVyO1xuICAgIH0sXG59XG5cbi8vbWlzc2lvbi93ZWxjb21lIHN0YXRlbWVudFxuY29uc3Qgc3RhdGVtZW50ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlbWVudFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhdGVtZW50V3JhcHBlci5pZCA9ICdzdGF0ZW1lbnQnO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3Qgc3RhdGVtZW50SGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdQbGFjZWhvbGRlcicpO1xuICAgICAgICBzdGF0ZW1lbnRIZWFkZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50SGVhZGVyVGV4dCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGVtZW50UGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBzdGF0ZW1lbnRQYXJhZ3JhcGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBJZCBuaWJoIHRvcnRvciBpZCBhbGlxdWV0IGxlY3R1cyBwcm9pbi4gRW5pbSBkaWFtIHZ1bHB1dGF0ZSB1dCBwaGFyZXRyYSBzaXQgYW1ldC4gVmVsIHR1cnBpcyBudW5jIGVnZXQgbG9yZW0uJyk7XG4gICAgICAgIHN0YXRlbWVudFBhcmFncmFwaC5hcHBlbmRDaGlsZChzdGF0ZW1lbnRQYXJhZ3JhcGhUZXh0KTtcblxuICAgICAgICBzdGF0ZW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50SGVhZGVyKTtcbiAgICAgICAgc3RhdGVtZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXRlbWVudFBhcmFncmFwaCk7XG4gICAgICAgIHN0YXRlbWVudFdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVtZW50Q29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc3RhdGVtZW50V3JhcHBlcjtcbiAgICB9LFxufVxuXG4vL2hvdXJzIG9mIG9wZXJhdGlvblxuY29uc3Qgb3BlbkhvdXJzID0ge1xuICAgIGhvdXJzOiB7XG4gICAgICAgIE1vbmRheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFR1ZXNkYXk6ICc5QU0gLSA5UE0nLFxuICAgICAgICBXZWRuZXNkYXk6ICc5QU0gLSA5UE0nLFxuICAgICAgICBUaHVyc2RheTogJzlBTSAtIDlQTScsXG4gICAgICAgIEZyaWRheTogJzlBTSAtIDlQTScsXG4gICAgICAgIFNhdHVyZGF5OiAnMTBBTSAtIDEwUE0nLFxuICAgICAgICBTdW5kYXk6ICdDbG9zZWQnXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBob3Vyc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91cnNXcmFwcGVyLmlkID0gJ2hvdXJzJztcblxuICAgICAgICBjb25zdCBob3Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBob3Vyc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5ob3Vycykge1xuICAgICAgICAgICAgbGV0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBsZXQgZGF5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGtleSk7XG4gICAgICAgICAgICBkYXkuYXBwZW5kQ2hpbGQoZGF5VGV4dCk7XG4gICAgICAgICAgICBob3Vyc0xpc3QuYXBwZW5kQ2hpbGQoZGF5KTtcblxuICAgICAgICAgICAgbGV0IGhvdXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGxldCBob3Vyc1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmhvdXJzW2tleV0pO1xuICAgICAgICAgICAgaG91cnMuYXBwZW5kQ2hpbGQoaG91cnNUZXh0KTtcbiAgICAgICAgICAgIGhvdXJzTGlzdC5hcHBlbmRDaGlsZChob3Vycyk7XG4gICAgICAgIH1cblxuICAgICAgICBob3Vyc1dyYXBwZXIuYXBwZW5kQ2hpbGQoaG91cnNDb250YWluZXIpO1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZChob3Vyc0xpc3QpO1xuICAgICAgICByZXR1cm4gaG91cnNXcmFwcGVyO1xuICAgIH1cbn1cblxuLy9sb2NhdGlvblxuY29uc3QgbG9jYXRpb24gPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvY2F0aW9uV3JhcHBlci5pZCA9ICdsb2NhdGlvbic7XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9jYXRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25QYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uUGFyYWdyYXBoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcxMjM0IE5XIFBsYWNob2xkZXIgUmQuIFN0YXRlLCBRUSA1Njc4OScpO1xuICAgICAgICBsb2NhdGlvblBhcmFncmFwaC5hcHBlbmRDaGlsZChsb2NhdGlvblBhcmFncmFwaFRleHQpO1xuICAgICAgICBsb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvblBhcmFncmFwaCk7XG4gICAgICAgIGxvY2F0aW9uV3JhcHBlci5hcHBlbmRDaGlsZChsb2NhdGlvbkNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uV3JhcHBlcjtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNZW51KCkge1xuICAgIGNvbnNvbGUubG9nKGBtZW51LmpzIHJ1bm5pbmdgKTtcbiAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudUNvbnRhaW5lci5pZCA9ICdtZW51JztcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdNZW51Jyk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIG1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIC8vIG1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vZC5yZW5kZXIoKSk7XG4gICAgbWVudS5yZW5kZXIoKTtcbiAgICByZXR1cm4gbWVudUNvbnRhaW5lcjtcbn1cblxuY29uc3QgZm9vZCA9IChkaXNoLCBkZXRhaWxzLCBwcmljZSkgPT4ge1xuICAgIGNvbnN0IGZvb2ROYW1lID0gZGlzaDtcbiAgICBjb25zdCBmb29kRGV0YWlscyA9IGRldGFpbHM7XG4gICAgY29uc3QgZm9vZFByaWNlID0gcHJpY2U7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGRpc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZE5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBkZXRhaWxzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvb2REZXRhaWxzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcHJpY2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9vZFByaWNlO1xuICAgICAgICB9LFxuICAgIH1cbn1cblxuY29uc3QgcGl6emEgPSBbXG4gICAgZm9vZCgncmhvYScsICd0b21hdG8gc2F1Y2UsIG1venphcmVsbGEsIG9yZWdhbm8sIHJvYXN0ZWQgcmhvYScsICcxNS4wMCcpLFxuICAgIGZvb2QoJ3BlcHBlcm9uaScsICd0b21hdG8gc2F1Y2UsIG1venphcmVsbGEsIG9yZWdhbm8sIHBlcHBlcm9uaScsICcxMC4wMCcpLFxuXTtcblxuY29uc3Qgc2FsYWQgPSBbXG4gICAgZm9vZCgnd2V0YScsICdyb21haW5lIGxldHR1Y2UsIGN1Y3VtYmVyLCBzdW5mbG93ZXIgc2VlZHMsIHRvbWF0b2VzLCB3ZXRhJywgJzUuMDAnKSxcbl07XG5cbmNvbnN0IG1lbnUgPSB7XG4gICAgdGVzdDogJ3Rlc3QnLFxuICAgIGZvb2Q6IHtcbiAgICAgICAgcGl6emFzOiB7cGl6emF9LFxuICAgICAgICBzYWxhZHM6IHtzYWxhZH0sXG4gICAgICAgIGFwcGV0aXplcnM6IHt0ZWE6IFtmb29kKCd0ZXN0JywgJ2EgYiBjJywgJzEuMDAnKSwgZm9vZCgndnZ2dicsICdjIGQgZScsICcyLjAwJyldfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mb29kKTtcbiAgICAgICAgLy8gZm9yIChsZXQgaXRlbSBpbiBtZW51LmZvb2QpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgZm9vZCBpbiBtZW51LmZvb2RbaXRlbV0pIHtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnUuZm9vZFtpdGVtXVtmb29kXS5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cobWVudS5mb29kW2l0ZW1dW2Zvb2RdW2ldLmRpc2gpO1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZW51LmZvb2RbaXRlbV1bZm9vZF1baV0uZGV0YWlscyk7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lbnUuZm9vZFtpdGVtXVtmb29kXVtpXS5wcmljZSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxufVxuLy9QaXp6YXNcbi8vU2lnbmF0dXJlIFBpenphc1xuLy9TaWRlcyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==