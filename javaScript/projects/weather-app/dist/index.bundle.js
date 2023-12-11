(self["webpackChunkmodule_webpack_starter"] = self["webpackChunkmodule_webpack_starter"] || []).push([["index"],{

/***/ "./node_modules/@iconfu/svg-inject/dist/svg-inject.js":
/*!************************************************************!*\
  !*** ./node_modules/@iconfu/svg-inject/dist/svg-inject.js ***!
  \************************************************************/
/***/ ((module) => {

/**
 * SVGInject - Version 1.2.3
 * A tiny, intuitive, robust, caching solution for injecting SVG files inline into the DOM.
 *
 * https://github.com/iconfu/svg-inject
 *
 * Copyright (c) 2018 INCORS, the creators of iconfu.com
 * @license MIT License - https://github.com/iconfu/svg-inject/blob/master/LICENSE
 */

(function(window, document) {
  // constants for better minification
  var _CREATE_ELEMENT_ = 'createElement';
  var _GET_ELEMENTS_BY_TAG_NAME_ = 'getElementsByTagName';
  var _LENGTH_ = 'length';
  var _STYLE_ = 'style';
  var _TITLE_ = 'title';
  var _UNDEFINED_ = 'undefined';
  var _SET_ATTRIBUTE_ = 'setAttribute';
  var _GET_ATTRIBUTE_ = 'getAttribute';

  var NULL = null;

  // constants
  var __SVGINJECT = '__svgInject';
  var ID_SUFFIX = '--inject-';
  var ID_SUFFIX_REGEX = new RegExp(ID_SUFFIX + '\\d+', "g");
  var LOAD_FAIL = 'LOAD_FAIL';
  var SVG_NOT_SUPPORTED = 'SVG_NOT_SUPPORTED';
  var SVG_INVALID = 'SVG_INVALID';
  var ATTRIBUTE_EXCLUSION_NAMES = ['src', 'alt', 'onload', 'onerror'];
  var A_ELEMENT = document[_CREATE_ELEMENT_]('a');
  var IS_SVG_SUPPORTED = typeof SVGRect != _UNDEFINED_;
  var DEFAULT_OPTIONS = {
    useCache: true,
    copyAttributes: true,
    makeIdsUnique: true
  };
  // Map of IRI referenceable tag names to properties that can reference them. This is defined in
  // https://www.w3.org/TR/SVG11/linking.html#processingIRI
  var IRI_TAG_PROPERTIES_MAP = {
    clipPath: ['clip-path'],
    'color-profile': NULL,
    cursor: NULL,
    filter: NULL,
    linearGradient: ['fill', 'stroke'],
    marker: ['marker', 'marker-end', 'marker-mid', 'marker-start'],
    mask: NULL,
    pattern: ['fill', 'stroke'],
    radialGradient: ['fill', 'stroke']
  };
  var INJECTED = 1;
  var FAIL = 2;

  var uniqueIdCounter = 1;
  var xmlSerializer;
  var domParser;


  // creates an SVG document from an SVG string
  function svgStringToSvgDoc(svgStr) {
    domParser = domParser || new DOMParser();
    return domParser.parseFromString(svgStr, 'text/xml');
  }


  // searializes an SVG element to an SVG string
  function svgElemToSvgString(svgElement) {
    xmlSerializer = xmlSerializer || new XMLSerializer();
    return xmlSerializer.serializeToString(svgElement);
  }


  // Returns the absolute url for the specified url
  function getAbsoluteUrl(url) {
    A_ELEMENT.href = url;
    return A_ELEMENT.href;
  }


  // Load svg with an XHR request
  function loadSvg(url, callback, errorCallback) {
    if (url) {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          // readyState is DONE
          var status = req.status;
          if (status == 200) {
            // request status is OK
            callback(req.responseXML, req.responseText.trim());
          } else if (status >= 400) {
            // request status is error (4xx or 5xx)
            errorCallback();
          } else if (status == 0) {
            // request status 0 can indicate a failed cross-domain call
            errorCallback();
          }
        }
      };
      req.open('GET', url, true);
      req.send();
    }
  }


  // Copy attributes from img element to svg element
  function copyAttributes(imgElem, svgElem) {
    var attribute;
    var attributeName;
    var attributeValue;
    var attributes = imgElem.attributes;
    for (var i = 0; i < attributes[_LENGTH_]; i++) {
      attribute = attributes[i];
      attributeName = attribute.name;
      // Only copy attributes not explicitly excluded from copying
      if (ATTRIBUTE_EXCLUSION_NAMES.indexOf(attributeName) == -1) {
        attributeValue = attribute.value;
        // If img attribute is "title", insert a title element into SVG element
        if (attributeName == _TITLE_) {
          var titleElem;
          var firstElementChild = svgElem.firstElementChild;
          if (firstElementChild && firstElementChild.localName.toLowerCase() == _TITLE_) {
            // If the SVG element's first child is a title element, keep it as the title element
            titleElem = firstElementChild;
          } else {
            // If the SVG element's first child element is not a title element, create a new title
            // ele,emt and set it as the first child
            titleElem = document[_CREATE_ELEMENT_ + 'NS']('http://www.w3.org/2000/svg', _TITLE_);
            svgElem.insertBefore(titleElem, firstElementChild);
          }
          // Set new title content
          titleElem.textContent = attributeValue;
        } else {
          // Set img attribute to svg element
          svgElem[_SET_ATTRIBUTE_](attributeName, attributeValue);
        }
      }
    }
  }


  // This function appends a suffix to IDs of referenced elements in the <defs> in order to  to avoid ID collision
  // between multiple injected SVGs. The suffix has the form "--inject-X", where X is a running number which is
  // incremented with each injection. References to the IDs are adjusted accordingly.
  // We assume tha all IDs within the injected SVG are unique, therefore the same suffix can be used for all IDs of one
  // injected SVG.
  // If the onlyReferenced argument is set to true, only those IDs will be made unique that are referenced from within the SVG
  function makeIdsUnique(svgElem, onlyReferenced) {
    var idSuffix = ID_SUFFIX + uniqueIdCounter++;
    // Regular expression for functional notations of an IRI references. This will find occurences in the form
    // url(#anyId) or url("#anyId") (for Internet Explorer) and capture the referenced ID
    var funcIriRegex = /url\("?#([a-zA-Z][\w:.-]*)"?\)/g;
    // Get all elements with an ID. The SVG spec recommends to put referenced elements inside <defs> elements, but
    // this is not a requirement, therefore we have to search for IDs in the whole SVG.
    var idElements = svgElem.querySelectorAll('[id]');
    var idElem;
    // An object containing referenced IDs  as keys is used if only referenced IDs should be uniquified.
    // If this object does not exist, all IDs will be uniquified.
    var referencedIds = onlyReferenced ? [] : NULL;
    var tagName;
    var iriTagNames = {};
    var iriProperties = [];
    var changed = false;
    var i, j;

    if (idElements[_LENGTH_]) {
      // Make all IDs unique by adding the ID suffix and collect all encountered tag names
      // that are IRI referenceable from properities.
      for (i = 0; i < idElements[_LENGTH_]; i++) {
        tagName = idElements[i].localName; // Use non-namespaced tag name
        // Make ID unique if tag name is IRI referenceable
        if (tagName in IRI_TAG_PROPERTIES_MAP) {
          iriTagNames[tagName] = 1;
        }
      }
      // Get all properties that are mapped to the found IRI referenceable tags
      for (tagName in iriTagNames) {
        (IRI_TAG_PROPERTIES_MAP[tagName] || [tagName]).forEach(function (mappedProperty) {
          // Add mapped properties to array of iri referencing properties.
          // Use linear search here because the number of possible entries is very small (maximum 11)
          if (iriProperties.indexOf(mappedProperty) < 0) {
            iriProperties.push(mappedProperty);
          }
        });
      }
      if (iriProperties[_LENGTH_]) {
        // Add "style" to properties, because it may contain references in the form 'style="fill:url(#myFill)"'
        iriProperties.push(_STYLE_);
      }
      // Run through all elements of the SVG and replace IDs in references.
      // To get all descending elements, getElementsByTagName('*') seems to perform faster than querySelectorAll('*').
      // Since svgElem.getElementsByTagName('*') does not return the svg element itself, we have to handle it separately.
      var descElements = svgElem[_GET_ELEMENTS_BY_TAG_NAME_]('*');
      var element = svgElem;
      var propertyName;
      var value;
      var newValue;
      for (i = -1; element != NULL;) {
        if (element.localName == _STYLE_) {
          // If element is a style element, replace IDs in all occurences of "url(#anyId)" in text content
          value = element.textContent;
          newValue = value && value.replace(funcIriRegex, function(match, id) {
            if (referencedIds) {
              referencedIds[id] = 1;
            }
            return 'url(#' + id + idSuffix + ')';
          });
          if (newValue !== value) {
            element.textContent = newValue;
          }
        } else if (element.hasAttributes()) {
          // Run through all property names for which IDs were found
          for (j = 0; j < iriProperties[_LENGTH_]; j++) {
            propertyName = iriProperties[j];
            value = element[_GET_ATTRIBUTE_](propertyName);
            newValue = value && value.replace(funcIriRegex, function(match, id) {
              if (referencedIds) {
                referencedIds[id] = 1;
              }
                return 'url(#' + id + idSuffix + ')';
            });
            if (newValue !== value) {
              element[_SET_ATTRIBUTE_](propertyName, newValue);
            }
          }
          // Replace IDs in xlink:ref and href attributes
          ['xlink:href', 'href'].forEach(function(refAttrName) {
            var iri = element[_GET_ATTRIBUTE_](refAttrName);
            if (/^\s*#/.test(iri)) { // Check if iri is non-null and internal reference
              iri = iri.trim();
              element[_SET_ATTRIBUTE_](refAttrName, iri + idSuffix);
              if (referencedIds) {
                // Add ID to referenced IDs
                referencedIds[iri.substring(1)] = 1;
              }
            }
          });
        }
        element = descElements[++i];
      }
      for (i = 0; i < idElements[_LENGTH_]; i++) {
        idElem = idElements[i];
        // If set of referenced IDs exists, make only referenced IDs unique,
        // otherwise make all IDs unique.
        if (!referencedIds || referencedIds[idElem.id]) {
          // Add suffix to element's ID
          idElem.id += idSuffix;
          changed = true;
        }
      }
    }
    // return true if SVG element has changed
    return changed;
  }


  // For cached SVGs the IDs are made unique by simply replacing the already inserted unique IDs with a
  // higher ID counter. This is much more performant than a call to makeIdsUnique().
  function makeIdsUniqueCached(svgString) {
    return svgString.replace(ID_SUFFIX_REGEX, ID_SUFFIX + uniqueIdCounter++);
  }


  // Inject SVG by replacing the img element with the SVG element in the DOM
  function inject(imgElem, svgElem, absUrl, options) {
    if (svgElem) {
      svgElem[_SET_ATTRIBUTE_]('data-inject-url', absUrl);
      var parentNode = imgElem.parentNode;
      if (parentNode) {
        if (options.copyAttributes) {
          copyAttributes(imgElem, svgElem);
        }
        // Invoke beforeInject hook if set
        var beforeInject = options.beforeInject;
        var injectElem = (beforeInject && beforeInject(imgElem, svgElem)) || svgElem;
        // Replace img element with new element. This is the actual injection.
        parentNode.replaceChild(injectElem, imgElem);
        // Mark img element as injected
        imgElem[__SVGINJECT] = INJECTED;
        removeOnLoadAttribute(imgElem);
        // Invoke afterInject hook if set
        var afterInject = options.afterInject;
        if (afterInject) {
          afterInject(imgElem, injectElem);
        }
      }
    } else {
      svgInvalid(imgElem, options);
    }
  }


  // Merges any number of options objects into a new object
  function mergeOptions() {
    var mergedOptions = {};
    var args = arguments;
    // Iterate over all specified options objects and add all properties to the new options object
    for (var i = 0; i < args[_LENGTH_]; i++) {
      var argument = args[i];
        for (var key in argument) {
          if (argument.hasOwnProperty(key)) {
            mergedOptions[key] = argument[key];
          }
        }
      }
    return mergedOptions;
  }


  // Adds the specified CSS to the document's <head> element
  function addStyleToHead(css) {
    var head = document[_GET_ELEMENTS_BY_TAG_NAME_]('head')[0];
    if (head) {
      var style = document[_CREATE_ELEMENT_](_STYLE_);
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }


  // Builds an SVG element from the specified SVG string
  function buildSvgElement(svgStr, verify) {
    if (verify) {
      var svgDoc;
      try {
        // Parse the SVG string with DOMParser
        svgDoc = svgStringToSvgDoc(svgStr);
      } catch(e) {
        return NULL;
      }
      if (svgDoc[_GET_ELEMENTS_BY_TAG_NAME_]('parsererror')[_LENGTH_]) {
        // DOMParser does not throw an exception, but instead puts parsererror tags in the document
        return NULL;
      }
      return svgDoc.documentElement;
    } else {
      var div = document.createElement('div');
      div.innerHTML = svgStr;
      return div.firstElementChild;
    }
  }


  function removeOnLoadAttribute(imgElem) {
    // Remove the onload attribute. Should only be used to remove the unstyled image flash protection and
    // make the element visible, not for removing the event listener.
    imgElem.removeAttribute('onload');
  }


  function errorMessage(msg) {
    console.error('SVGInject: ' + msg);
  }


  function fail(imgElem, status, options) {
    imgElem[__SVGINJECT] = FAIL;
    if (options.onFail) {
      options.onFail(imgElem, status);
    } else {
      errorMessage(status);
    }
  }


  function svgInvalid(imgElem, options) {
    removeOnLoadAttribute(imgElem);
    fail(imgElem, SVG_INVALID, options);
  }


  function svgNotSupported(imgElem, options) {
    removeOnLoadAttribute(imgElem);
    fail(imgElem, SVG_NOT_SUPPORTED, options);
  }


  function loadFail(imgElem, options) {
    fail(imgElem, LOAD_FAIL, options);
  }


  function removeEventListeners(imgElem) {
    imgElem.onload = NULL;
    imgElem.onerror = NULL;
  }


  function imgNotSet(msg) {
    errorMessage('no img element');
  }


  function createSVGInject(globalName, options) {
    var defaultOptions = mergeOptions(DEFAULT_OPTIONS, options);
    var svgLoadCache = {};

    if (IS_SVG_SUPPORTED) {
      // If the browser supports SVG, add a small stylesheet that hides the <img> elements until
      // injection is finished. This avoids showing the unstyled SVGs before style is applied.
      addStyleToHead('img[onload^="' + globalName + '("]{visibility:hidden;}');
    }


    /**
     * SVGInject
     *
     * Injects the SVG specified in the `src` attribute of the specified `img` element or array of `img`
     * elements. Returns a Promise object which resolves if all passed in `img` elements have either been
     * injected or failed to inject (Only if a global Promise object is available like in all modern browsers
     * or through a polyfill).
     *
     * Options:
     * useCache: If set to `true` the SVG will be cached using the absolute URL. Default value is `true`.
     * copyAttributes: If set to `true` the attributes will be copied from `img` to `svg`. Dfault value
     *     is `true`.
     * makeIdsUnique: If set to `true` the ID of elements in the `<defs>` element that can be references by
     *     property values (for example 'clipPath') are made unique by appending "--inject-X", where X is a
     *     running number which increases with each injection. This is done to avoid duplicate IDs in the DOM.
     * beforeLoad: Hook before SVG is loaded. The `img` element is passed as a parameter. If the hook returns
     *     a string it is used as the URL instead of the `img` element's `src` attribute.
     * afterLoad: Hook after SVG is loaded. The loaded `svg` element and `svg` string are passed as a
     *     parameters. If caching is active this hook will only get called once for injected SVGs with the
     *     same absolute path. Changes to the `svg` element in this hook will be applied to all injected SVGs
     *     with the same absolute path. It's also possible to return an `svg` string or `svg` element which
     *     will then be used for the injection.
     * beforeInject: Hook before SVG is injected. The `img` and `svg` elements are passed as parameters. If
     *     any html element is returned it gets injected instead of applying the default SVG injection.
     * afterInject: Hook after SVG is injected. The `img` and `svg` elements are passed as parameters.
     * onAllFinish: Hook after all `img` elements passed to an SVGInject() call have either been injected or
     *     failed to inject.
     * onFail: Hook after injection fails. The `img` element and a `status` string are passed as an parameter.
     *     The `status` can be either `'SVG_NOT_SUPPORTED'` (the browser does not support SVG),
     *     `'SVG_INVALID'` (the SVG is not in a valid format) or `'LOAD_FAILED'` (loading of the SVG failed).
     *
     * @param {HTMLImageElement} img - an img element or an array of img elements
     * @param {Object} [options] - optional parameter with [options](#options) for this injection.
     */
    function SVGInject(img, options) {
      options = mergeOptions(defaultOptions, options);

      var run = function(resolve) {
        var allFinish = function() {
          var onAllFinish = options.onAllFinish;
          if (onAllFinish) {
            onAllFinish();
          }
          resolve && resolve();
        };

        if (img && typeof img[_LENGTH_] != _UNDEFINED_) {
          // an array like structure of img elements
          var injectIndex = 0;
          var injectCount = img[_LENGTH_];

          if (injectCount == 0) {
            allFinish();
          } else {
            var finish = function() {
              if (++injectIndex == injectCount) {
                allFinish();
              }
            };

            for (var i = 0; i < injectCount; i++) {
              SVGInjectElement(img[i], options, finish);
            }
          }
        } else {
          // only one img element
          SVGInjectElement(img, options, allFinish);
        }
      };

      // return a Promise object if globally available
      return typeof Promise == _UNDEFINED_ ? run() : new Promise(run);
    }


    // Injects a single svg element. Options must be already merged with the default options.
    function SVGInjectElement(imgElem, options, callback) {
      if (imgElem) {
        var svgInjectAttributeValue = imgElem[__SVGINJECT];
        if (!svgInjectAttributeValue) {
          removeEventListeners(imgElem);

          if (!IS_SVG_SUPPORTED) {
            svgNotSupported(imgElem, options);
            callback();
            return;
          }
          // Invoke beforeLoad hook if set. If the beforeLoad returns a value use it as the src for the load
          // URL path. Else use the imgElem's src attribute value.
          var beforeLoad = options.beforeLoad;
          var src = (beforeLoad && beforeLoad(imgElem)) || imgElem[_GET_ATTRIBUTE_]('src');

          if (!src) {
            // If no image src attribute is set do no injection. This can only be reached by using javascript
            // because if no src attribute is set the onload and onerror events do not get called
            if (src === '') {
              loadFail(imgElem, options);
            }
            callback();
            return;
          }

          // set array so later calls can register callbacks
          var onFinishCallbacks = [];
          imgElem[__SVGINJECT] = onFinishCallbacks;

          var onFinish = function() {
            callback();
            onFinishCallbacks.forEach(function(onFinishCallback) {
              onFinishCallback();
            });
          };

          var absUrl = getAbsoluteUrl(src);
          var useCacheOption = options.useCache;
          var makeIdsUniqueOption = options.makeIdsUnique;
          
          var setSvgLoadCacheValue = function(val) {
            if (useCacheOption) {
              svgLoadCache[absUrl].forEach(function(svgLoad) {
                svgLoad(val);
              });
              svgLoadCache[absUrl] = val;
            }
          };

          if (useCacheOption) {
            var svgLoad = svgLoadCache[absUrl];

            var handleLoadValue = function(loadValue) {
              if (loadValue === LOAD_FAIL) {
                loadFail(imgElem, options);
              } else if (loadValue === SVG_INVALID) {
                svgInvalid(imgElem, options);
              } else {
                var hasUniqueIds = loadValue[0];
                var svgString = loadValue[1];
                var uniqueIdsSvgString = loadValue[2];
                var svgElem;

                if (makeIdsUniqueOption) {
                  if (hasUniqueIds === NULL) {
                    // IDs for the SVG string have not been made unique before. This may happen if previous
                    // injection of a cached SVG have been run with the option makedIdsUnique set to false
                    svgElem = buildSvgElement(svgString, false);
                    hasUniqueIds = makeIdsUnique(svgElem, false);

                    loadValue[0] = hasUniqueIds;
                    loadValue[2] = hasUniqueIds && svgElemToSvgString(svgElem);
                  } else if (hasUniqueIds) {
                    // Make IDs unique for already cached SVGs with better performance
                    svgString = makeIdsUniqueCached(uniqueIdsSvgString);
                  }
                }

                svgElem = svgElem || buildSvgElement(svgString, false);

                inject(imgElem, svgElem, absUrl, options);
              }
              onFinish();
            };

            if (typeof svgLoad != _UNDEFINED_) {
              // Value for url exists in cache
              if (svgLoad.isCallbackQueue) {
                // Same url has been cached, but value has not been loaded yet, so add to callbacks
                svgLoad.push(handleLoadValue);
              } else {
                handleLoadValue(svgLoad);
              }
              return;
            } else {
              var svgLoad = [];
              // set property isCallbackQueue to Array to differentiate from array with cached loaded values
              svgLoad.isCallbackQueue = true;
              svgLoadCache[absUrl] = svgLoad;
            }
          }

          // Load the SVG because it is not cached or caching is disabled
          loadSvg(absUrl, function(svgXml, svgString) {
            // Use the XML from the XHR request if it is an instance of Document. Otherwise
            // (for example of IE9), create the svg document from the svg string.
            var svgElem = svgXml instanceof Document ? svgXml.documentElement : buildSvgElement(svgString, true);

            var afterLoad = options.afterLoad;
            if (afterLoad) {
              // Invoke afterLoad hook which may modify the SVG element. After load may also return a new
              // svg element or svg string
              var svgElemOrSvgString = afterLoad(svgElem, svgString) || svgElem;
              if (svgElemOrSvgString) {
                // Update svgElem and svgString because of modifications to the SVG element or SVG string in
                // the afterLoad hook, so the modified SVG is also used for all later cached injections
                var isString = typeof svgElemOrSvgString == 'string';
                svgString = isString ? svgElemOrSvgString : svgElemToSvgString(svgElem);
                svgElem = isString ? buildSvgElement(svgElemOrSvgString, true) : svgElemOrSvgString;
              }
            }

            if (svgElem instanceof SVGElement) {
              var hasUniqueIds = NULL;
              if (makeIdsUniqueOption) {
                hasUniqueIds = makeIdsUnique(svgElem, false);
              }

              if (useCacheOption) {
                var uniqueIdsSvgString = hasUniqueIds && svgElemToSvgString(svgElem);
                // set an array with three entries to the load cache
                setSvgLoadCacheValue([hasUniqueIds, svgString, uniqueIdsSvgString]);
              }

              inject(imgElem, svgElem, absUrl, options);
            } else {
              svgInvalid(imgElem, options);
              setSvgLoadCacheValue(SVG_INVALID);
            }
            onFinish();
          }, function() {
            loadFail(imgElem, options);
            setSvgLoadCacheValue(LOAD_FAIL);
            onFinish();
          });
        } else {
          if (Array.isArray(svgInjectAttributeValue)) {
            // svgInjectAttributeValue is an array. Injection is not complete so register callback
            svgInjectAttributeValue.push(callback);
          } else {
            callback();
          }
        }
      } else {
        imgNotSet();
      }
    }


    /**
     * Sets the default [options](#options) for SVGInject.
     *
     * @param {Object} [options] - default [options](#options) for an injection.
     */
    SVGInject.setOptions = function(options) {
      defaultOptions = mergeOptions(defaultOptions, options);
    };


    // Create a new instance of SVGInject
    SVGInject.create = createSVGInject;


    /**
     * Used in onerror Event of an `<img>` element to handle cases when the loading the original src fails
     * (for example if file is not found or if the browser does not support SVG). This triggers a call to the
     * options onFail hook if available. The optional second parameter will be set as the new src attribute
     * for the img element.
     *
     * @param {HTMLImageElement} img - an img element
     * @param {String} [fallbackSrc] - optional parameter fallback src
     */
    SVGInject.err = function(img, fallbackSrc) {
      if (img) {
        if (img[__SVGINJECT] != FAIL) {
          removeEventListeners(img);

          if (!IS_SVG_SUPPORTED) {
            svgNotSupported(img, defaultOptions);
          } else {
            removeOnLoadAttribute(img);
            loadFail(img, defaultOptions);
          }
          if (fallbackSrc) {
            removeOnLoadAttribute(img);
            img.src = fallbackSrc;
          }
        }
      } else {
        imgNotSet();
      }
    };

    window[globalName] = SVGInject;

    return SVGInject;
  }

  var SVGInjectInstance = createSVGInject('SVGInject');

  if ( true && typeof module.exports == 'object') {
    module.exports = SVGInjectInstance;
  }
})(window, document);

/***/ }),

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



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Light.ttf */ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Light.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf */ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Black.ttf */ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Black.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  /* https://fonts.google.com/specimen/Roboto+Condensed */
  font-family: 'Roboto Condensed';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
  font-weight: 900;
  font-style: normal;
}

:root {
  --color-font-primary: #000000;
  --color-font-secondary: #e8e9eb;
  --color-background-primary: #313638;
  --color-background-secondary: #f06543;
  --color-background-default: #ffffff;
  --color-accent: #f09d51;
  --color-box-shadow: #000000;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--color-background-primary);
  color: var(--color-font-secondary);
  font-family: 'Roboto Condensed', Arial;
  font-weight: 400;
  min-height: 100svh;
}

body > #weather_app {
  min-height: inherit;
  display: grid;
  grid-template-rows: min-content 1fr;
}
`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;EACE,uDAAuD;EACvD,+BAA+B;EAC/B,4CAA0E;EAC1E,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,4CAA2E;EAC3E,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,4CAA0E;EAC1E,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,+BAA+B;EAC/B,mCAAmC;EACnC,qCAAqC;EACrC,mCAAmC;EACnC,uBAAuB;EACvB,2BAA2B;AAC7B;;AAEA;;;EAGE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,iDAAiD;EACjD,kCAAkC;EAClC,sCAAsC;EACtC,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,mCAAmC;AACrC","sourcesContent":["@font-face {\n  /* https://fonts.google.com/specimen/Roboto+Condensed */\n  font-family: 'Roboto Condensed';\n  src: url(./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Light.ttf);\n  font-weight: 300;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Roboto Condensed';\n  src: url(./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf);\n  font-weight: 400;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Roboto Condensed';\n  src: url(./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Black.ttf);\n  font-weight: 900;\n  font-style: normal;\n}\n\n:root {\n  --color-font-primary: #000000;\n  --color-font-secondary: #e8e9eb;\n  --color-background-primary: #313638;\n  --color-background-secondary: #f06543;\n  --color-background-default: #ffffff;\n  --color-accent: #f09d51;\n  --color-box-shadow: #000000;\n}\n\n*,\n*::before,\n*::after {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: var(--color-background-primary);\n  color: var(--color-font-secondary);\n  font-family: 'Roboto Condensed', Arial;\n  font-weight: 400;\n  min-height: 100svh;\n}\n\nbody > #weather_app {\n  min-height: inherit;\n  display: grid;\n  grid-template-rows: min-content 1fr;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/content.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/content.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `/* #main_content */
#main_content {
  height: 100%;
}

#main_content > :first-child:not(#loading):not(#home) {
  height: inherit;
  display: grid;
  grid-template-rows: min-content 1fr;
}
`, "",{"version":3,"sources":["webpack://./src/styles/content.css"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,aAAa;EACb,mCAAmC;AACrC","sourcesContent":["/* #main_content */\n#main_content {\n  height: 100%;\n}\n\n#main_content > :first-child:not(#loading):not(#home) {\n  height: inherit;\n  display: grid;\n  grid-template-rows: min-content 1fr;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/error.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/error.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `#error {
  padding: 1rem;
}

#error > h2 {
  font-size: clamp(3rem, 3vw, 5rem);
}
`, "",{"version":3,"sources":["webpack://./src/styles/error.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf;;AAEA;EACE,iCAAiC;AACnC","sourcesContent":["#error {\n  padding: 1rem;\n}\n\n#error > h2 {\n  font-size: clamp(3rem, 3vw, 5rem);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/footer.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/footer.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `#footer {
  background-color: var(--color-background-secondary);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 6px -1px var(--color-box-shadow);
}

#footer > div > a:visited {
  color: var(--color-font-primary);
  color: var(--color-background-primary);
}
`, "",{"version":3,"sources":["webpack://./src/styles/footer.css"],"names":[],"mappings":"AAAA;EACE,mDAAmD;EACnD,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,oDAAoD;AACtD;;AAEA;EACE,gCAAgC;EAChC,sCAAsC;AACxC","sourcesContent":["#footer {\n  background-color: var(--color-background-secondary);\n  padding: 0.5rem;\n  display: flex;\n  justify-content: center;\n  box-shadow: 0px 0px 6px -1px var(--color-box-shadow);\n}\n\n#footer > div > a:visited {\n  color: var(--color-font-primary);\n  color: var(--color-background-primary);\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `/* includes selectors for navbar.js and header.js */
#header {
  background-color: var(--color-background-secondary);
}

#header > #navbar > .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

#header > #navbar > .container > * {
  list-style: none;
}

#header > #navbar > .container > * > li {
  position: relative;
  padding: 0.3rem;
}

#header > #navbar > .container > * > li:first-of-type {
  /* value needs to be equal to .nav_btn padding value */
  margin-top: 0.3rem;
}

/* optional */
#header > #navbar > .container > .nav_right > *:not(:first-child)::after,
#header > #navbar > .container > .nav_right > *:not(:first-child):hover::after {
  position: absolute;
  content: '';
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(255, 187, 69);
  z-index: -1;
}

/* optional */
#header > #navbar > .container > .nav_right > li::after {
  width: 0%;
  transform: skewX(0deg);
  transition: all 500ms ease-in-out;
}

/* optional */
#header > #navbar > .container > .nav_right > li:hover::after {
  width: 100%;
  transform: skewX(8deg) scaleX(1.03);
  transition: all 200ms ease-in-out;
}

#header > #navbar > .container > * > li > a {
  display: flex;
  align-items: center;
}

#header > #navbar > .container > * > li > .nav_logo > svg {
  width: clamp(5rem, 3vw, 5.5rem);
}

#header > #navbar > .container > .nav_right {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-background-secondary);
  padding: 1rem;
  transform: translateY(-100%);
}

#header > #navbar > .container > .nav_right > li > #unit_systems_button {
  position: relative;
  width: max-content;
  border-radius: 0.75rem;
  border: none;
  padding: 0.5rem;
  background-color: var(--color-accent);
  box-shadow: inset 0px 0px 5px 0px var(--color-box-shadow);
}

#header > #navbar > .container > .nav_right > li > #unit_systems_button::before {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  padding: 0.5rem;
  width: 50%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: rgb(25, 216, 25);
  transition: all 250ms;
}

#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='true']::before {
  transform: translateX(0%);
  box-shadow: -2px 0px 3px -1px var(--color-box-shadow);
}

#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='false']::before {
  transform: translateX(100%);
  box-shadow: 2px 0px 3px -1px var(--color-box-shadow);
}

#header > #navbar > .container > .nav_right > li > #unit_systems_button > * {
  position: relative;
  z-index: 2;
  padding: 0.5rem;
}

#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='true'] > .imperial {
  /* background-color: red; */
}

/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons {
  width: max-content;
  border-radius: 0.75rem; */
/* background-color: var(--color-accent);
  box-shadow: inset 0px 0px 5px 0px var(--color-box-shadow); */
/* padding: 0.05rem;
} */

/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:not(span) {
  border: none;
  padding: 0.5rem;
  border-radius: 0.75rem;
  background-color: transparent;
} */

/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *.selected {
  background-color: rgb(25, 216, 25);
} */

/* left button */
/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > #imperial.selected {
  box-shadow: -2px 0px 3px -1px var(--color-box-shadow);
  animation: slide_left 500ms ease-out;
} */

/* right button */
/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > #metric.selected {
  box-shadow: 2px 0px 3px -1px var(--color-box-shadow);
  animation: slide_right 500ms ease-out;
} */

#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:hover {
  cursor: pointer;
}

#header > #navbar > .container > .nav_right.visible {
  visibility: visible;
  transform: translateY(0%);
  transition: transform 200ms ease-in-out;
  z-index: 2;
}

.nav_item,
.nav_item:visited {
  color: var(--primary-font-color, rgb(0, 0, 0));
  text-decoration: none;
}

.nav_item > svg {
  width: clamp(1.5rem, 3vw, 2.5rem);
  height: auto;
}

.nav_btn {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0.35rem;
  padding: 0.3rem;
  z-index: 2;
}

.nav_btn > svg {
  width: 2rem;
  height: auto;
}

.nav_btn:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
}

.nav_btn:hover > svg {
  filter: invert(1);
}

/* form styles */
#header > #form {
  padding: 1rem;
}

#header > #form > .form_item:first-child {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

#header > #form > .form_item:first-child > label {
  font-size: clamp(2rem, 2vw, 3rem);
}

#header > #form > .form_item:first-child > input {
  font-size: 1.5rem;
  border: none;
  border-radius: 1rem;
  padding: 0.75rem;
  width: 100%;
}

#header > #form > .form_item:first-child > input:focus {
  outline: none;
  box-shadow: inset 0px 0px 5px 2px var(--color-box-shadow);
  padding-left: 2rem;
}

#header > #form > .form_item:first-child > input:focus::placeholder {
  visibility: hidden;
}

#header > #form > .form_item:first-child > .validity_error {
  display: none;
}

@media screen and (min-width: 768px) {
  #header > #navbar > .container > * {
    align-items: center;
  }

  #header > #navbar > .container > .nav_right {
    position: relative;
    visibility: visible;
    background-color: transparent;
    padding: 0;
    transform: translateY(0%);
    display: flex;
    height: inherit;
    width: inherit;
  }

  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:after,
  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:hover:after {
    content: none;
  }

  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after,
  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {
    position: absolute;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 1rem;
  }

  /* optional */
  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after {
    width: 0%;
    height: 0%;
    transform: skewX(0deg);
    transition: all 200ms ease-in-out;
  }

  /* optional */
  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {
    width: 60%;
    height: 12%;
    transform: skewX(0deg) scaleX(1);
    transition: all 200ms ease-in-out;
  }

  #header > #navbar > .container > * > li:first-of-type {
    margin-top: 0;
  }

  .nav_btn {
    display: none;
  }

  #header > #form > .form_item:first-child {
    align-content: center;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  #header > #form > .form_item:first-child > label {
    font-size: clamp(1rem, 1vw, 1.25rem);
  }

  #header > #form > .form_item:first-child > input {
    width: 50%;
  }
}

@keyframes slide_left {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

@keyframes slide_right {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"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","sourcesContent":["/* includes selectors for navbar.js and header.js */\n#header {\n  background-color: var(--color-background-secondary);\n}\n\n#header > #navbar > .container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n#header > #navbar > .container > * {\n  list-style: none;\n}\n\n#header > #navbar > .container > * > li {\n  position: relative;\n  padding: 0.3rem;\n}\n\n#header > #navbar > .container > * > li:first-of-type {\n  /* value needs to be equal to .nav_btn padding value */\n  margin-top: 0.3rem;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > *:not(:first-child)::after,\n#header > #navbar > .container > .nav_right > *:not(:first-child):hover::after {\n  position: absolute;\n  content: '';\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgb(255, 187, 69);\n  z-index: -1;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > li::after {\n  width: 0%;\n  transform: skewX(0deg);\n  transition: all 500ms ease-in-out;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > li:hover::after {\n  width: 100%;\n  transform: skewX(8deg) scaleX(1.03);\n  transition: all 200ms ease-in-out;\n}\n\n#header > #navbar > .container > * > li > a {\n  display: flex;\n  align-items: center;\n}\n\n#header > #navbar > .container > * > li > .nav_logo > svg {\n  width: clamp(5rem, 3vw, 5.5rem);\n}\n\n#header > #navbar > .container > .nav_right {\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: var(--color-background-secondary);\n  padding: 1rem;\n  transform: translateY(-100%);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button {\n  position: relative;\n  width: max-content;\n  border-radius: 0.75rem;\n  border: none;\n  padding: 0.5rem;\n  background-color: var(--color-accent);\n  box-shadow: inset 0px 0px 5px 0px var(--color-box-shadow);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button::before {\n  position: absolute;\n  content: '';\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 2;\n  padding: 0.5rem;\n  width: 50%;\n  height: 100%;\n  border-radius: 0.75rem;\n  background-color: rgb(25, 216, 25);\n  transition: all 250ms;\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='true']::before {\n  transform: translateX(0%);\n  box-shadow: -2px 0px 3px -1px var(--color-box-shadow);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='false']::before {\n  transform: translateX(100%);\n  box-shadow: 2px 0px 3px -1px var(--color-box-shadow);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button > * {\n  position: relative;\n  z-index: 2;\n  padding: 0.5rem;\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='true'] > .imperial {\n  /* background-color: red; */\n}\n\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons {\n  width: max-content;\n  border-radius: 0.75rem; */\n/* background-color: var(--color-accent);\n  box-shadow: inset 0px 0px 5px 0px var(--color-box-shadow); */\n/* padding: 0.05rem;\n} */\n\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:not(span) {\n  border: none;\n  padding: 0.5rem;\n  border-radius: 0.75rem;\n  background-color: transparent;\n} */\n\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *.selected {\n  background-color: rgb(25, 216, 25);\n} */\n\n/* left button */\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > #imperial.selected {\n  box-shadow: -2px 0px 3px -1px var(--color-box-shadow);\n  animation: slide_left 500ms ease-out;\n} */\n\n/* right button */\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > #metric.selected {\n  box-shadow: 2px 0px 3px -1px var(--color-box-shadow);\n  animation: slide_right 500ms ease-out;\n} */\n\n#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:hover {\n  cursor: pointer;\n}\n\n#header > #navbar > .container > .nav_right.visible {\n  visibility: visible;\n  transform: translateY(0%);\n  transition: transform 200ms ease-in-out;\n  z-index: 2;\n}\n\n.nav_item,\n.nav_item:visited {\n  color: var(--primary-font-color, rgb(0, 0, 0));\n  text-decoration: none;\n}\n\n.nav_item > svg {\n  width: clamp(1.5rem, 3vw, 2.5rem);\n  height: auto;\n}\n\n.nav_btn {\n  display: flex;\n  align-items: center;\n  background: transparent;\n  border: none;\n  border-radius: 0.35rem;\n  padding: 0.3rem;\n  z-index: 2;\n}\n\n.nav_btn > svg {\n  width: 2rem;\n  height: auto;\n}\n\n.nav_btn:hover {\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.nav_btn:hover > svg {\n  filter: invert(1);\n}\n\n/* form styles */\n#header > #form {\n  padding: 1rem;\n}\n\n#header > #form > .form_item:first-child {\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.5rem;\n}\n\n#header > #form > .form_item:first-child > label {\n  font-size: clamp(2rem, 2vw, 3rem);\n}\n\n#header > #form > .form_item:first-child > input {\n  font-size: 1.5rem;\n  border: none;\n  border-radius: 1rem;\n  padding: 0.75rem;\n  width: 100%;\n}\n\n#header > #form > .form_item:first-child > input:focus {\n  outline: none;\n  box-shadow: inset 0px 0px 5px 2px var(--color-box-shadow);\n  padding-left: 2rem;\n}\n\n#header > #form > .form_item:first-child > input:focus::placeholder {\n  visibility: hidden;\n}\n\n#header > #form > .form_item:first-child > .validity_error {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #header > #navbar > .container > * {\n    align-items: center;\n  }\n\n  #header > #navbar > .container > .nav_right {\n    position: relative;\n    visibility: visible;\n    background-color: transparent;\n    padding: 0;\n    transform: translateY(0%);\n    display: flex;\n    height: inherit;\n    width: inherit;\n  }\n\n  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:after,\n  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:hover:after {\n    content: none;\n  }\n\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after,\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    position: absolute;\n    bottom: 0;\n    top: auto;\n    left: 0;\n    right: 0;\n    margin: auto;\n    border-radius: 1rem;\n  }\n\n  /* optional */\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after {\n    width: 0%;\n    height: 0%;\n    transform: skewX(0deg);\n    transition: all 200ms ease-in-out;\n  }\n\n  /* optional */\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    width: 60%;\n    height: 12%;\n    transform: skewX(0deg) scaleX(1);\n    transition: all 200ms ease-in-out;\n  }\n\n  #header > #navbar > .container > * > li:first-of-type {\n    margin-top: 0;\n  }\n\n  .nav_btn {\n    display: none;\n  }\n\n  #header > #form > .form_item:first-child {\n    align-content: center;\n    flex-wrap: wrap;\n    padding: 1rem 0;\n  }\n\n  #header > #form > .form_item:first-child > label {\n    font-size: clamp(1rem, 1vw, 1.25rem);\n  }\n\n  #header > #form > .form_item:first-child > input {\n    width: 50%;\n  }\n}\n\n@keyframes slide_left {\n  0% {\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(0%);\n  }\n}\n\n@keyframes slide_right {\n  0% {\n    transform: translateX(-100%);\n  }\n\n  100% {\n    transform: translateX(0%);\n  }\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `/* styles for home.js module */
#home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

#home > * {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
}

#home > * > h2 {
  flex: 1;
}
`, "",{"version":3,"sources":["webpack://./src/styles/home.css"],"names":[],"mappings":"AAAA,8BAA8B;AAC9B;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,eAAe;EACf,aAAa;AACf;;AAEA;EACE,OAAO;AACT","sourcesContent":["/* styles for home.js module */\n#home {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  row-gap: 1rem;\n}\n\n#home > * {\n  display: flex;\n  flex-wrap: wrap;\n  row-gap: 1rem;\n}\n\n#home > * > h2 {\n  flex: 1;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/loading.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/loading.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `#loading {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

#loading > #loading_img {
  width: clamp(5rem, 3vw, 10rem);
  height: auto;
  animation: rotate_cw 1s infinite linear;
}

@keyframes rotate_cw {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/loading.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,8BAA8B;EAC9B,YAAY;EACZ,uCAAuC;AACzC;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;AACF","sourcesContent":["#loading {\n  display: flex;\n  justify-content: center;\n  padding: 2rem;\n}\n\n#loading > #loading_img {\n  width: clamp(5rem, 3vw, 10rem);\n  height: auto;\n  animation: rotate_cw 1s infinite linear;\n}\n\n@keyframes rotate_cw {\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/forecast.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/forecast.css ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#forecast > header {
  padding: 2rem;
}

#forecast > header > h2 {
  font-size: clamp(2rem, 2vw, 3rem);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

#forecast > header > h2 > span {
  font-size: 1rem;
  font-weight: 400;
  text-wrap: nowrap;
  margin-left: 0.5rem;
}

#forecast > header > p {
  font-weight: 300;
}

#forecast_details > .day {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
}

#forecast_details > .day:not(:last-child) {
  border-bottom: 0.35rem solid;
}

#forecast_details > .day > ul {
  list-style: none;
  display: flex;
  align-items: center;
  flex: 1 0 0px;
  column-gap: 0.5rem;
}

#forecast_details > .day > ul:nth-child(3) > :first-child,
#forecast_details > .day > ul:last-of-type > :first-child {
  display: flex;
}

#forecast_details > .day > ul:nth-of-type(3) > :last-child {
  display: none;
}

@media screen and (min-width: 768px) {
  #forecast_details > .day {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 2rem 3rem;
    justify-items: center;
  }

  #forecast_details > .day > ul:nth-of-type(3) {
    justify-self: flex-start;
  }

  #forecast_details > .day > ul:nth-of-type(3) > :last-child {
    display: block;
    text-wrap: balance;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/forecast.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf;;AAEA;EACE,iCAAiC;EACjC,aAAa;EACb,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mCAAmC;AACrC;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,aAAa;IACb,gDAAgD;IAChD,kBAAkB;IAClB,qBAAqB;EACvB;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,cAAc;IACd,kBAAkB;EACpB;AACF","sourcesContent":["#forecast > header {\n  padding: 2rem;\n}\n\n#forecast > header > h2 {\n  font-size: clamp(2rem, 2vw, 3rem);\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n#forecast > header > h2 > span {\n  font-size: 1rem;\n  font-weight: 400;\n  text-wrap: nowrap;\n  margin-left: 0.5rem;\n}\n\n#forecast > header > p {\n  font-weight: 300;\n}\n\n#forecast_details > .day {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#forecast_details > .day:not(:last-child) {\n  border-bottom: 0.35rem solid;\n}\n\n#forecast_details > .day > ul {\n  list-style: none;\n  display: flex;\n  align-items: center;\n  flex: 1 0 0px;\n  column-gap: 0.5rem;\n}\n\n#forecast_details > .day > ul:nth-child(3) > :first-child,\n#forecast_details > .day > ul:last-of-type > :first-child {\n  display: flex;\n}\n\n#forecast_details > .day > ul:nth-of-type(3) > :last-child {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #forecast_details > .day {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    padding: 2rem 3rem;\n    justify-items: center;\n  }\n\n  #forecast_details > .day > ul:nth-of-type(3) {\n    justify-self: flex-start;\n  }\n\n  #forecast_details > .day > ul:nth-of-type(3) > :last-child {\n    display: block;\n    text-wrap: balance;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/hourly.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/hourly.css ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#hourly > header {
  padding: 2rem;
}

#hourly > header > h2 {
  font-size: clamp(2rem, 2vw, 3rem);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

#hourly > header > h2 > span {
  font-size: 1rem;
  font-weight: 400;
  text-wrap: nowrap;
  margin-left: 0.5rem;
}

#hourly > header > p {
  font-weight: 300;
}

#hourly_details > .day > h3 {
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: var(--color-background-primary);
  background-color: var(--color-background-default);
  padding: 2rem;
  text-wrap: balance;
}

#hourly_details > .day > .hour {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
}

#hourly_details > .day > .hour:not(:last-child) {
  border-bottom: 0.35rem solid;
}

#hourly_details > .day > .hour > ul {
  list-style: none;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}

#hourly_details > .day > .hour > ul > * {
  display: flex;
}

/* selects the li with time */
#hourly_details > .day > .hour > ul:first-of-type > li {
  text-transform: lowercase;
}

#hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,
#hourly_details > .day > .hour > ul:last-of-type {
  display: none;
}

@media screen and (min-width: 768px) {
  #hourly_details > .day > .hour {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 2rem 3rem;
    justify-items: center;
  }

  #hourly_details > .day > .hour > ul:nth-of-type(3) {
    justify-self: flex-start;
  }

  #hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,
  #hourly_details > .day > .hour > ul:last-of-type {
    display: flex;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/hourly.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf;;AAEA;EACE,iCAAiC;EACjC,aAAa;EACb,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mCAAmC;EACnC,sCAAsC;EACtC,iDAAiD;EACjD,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mCAAmC;AACrC;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA,6BAA6B;AAC7B;EACE,yBAAyB;AAC3B;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE;IACE,aAAa;IACb,qCAAqC;IACrC,kBAAkB;IAClB,qBAAqB;EACvB;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;;IAEE,aAAa;EACf;AACF","sourcesContent":["#hourly > header {\n  padding: 2rem;\n}\n\n#hourly > header > h2 {\n  font-size: clamp(2rem, 2vw, 3rem);\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n#hourly > header > h2 > span {\n  font-size: 1rem;\n  font-weight: 400;\n  text-wrap: nowrap;\n  margin-left: 0.5rem;\n}\n\n#hourly > header > p {\n  font-weight: 300;\n}\n\n#hourly_details > .day > h3 {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  color: var(--color-background-primary);\n  background-color: var(--color-background-default);\n  padding: 2rem;\n  text-wrap: balance;\n}\n\n#hourly_details > .day > .hour {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#hourly_details > .day > .hour:not(:last-child) {\n  border-bottom: 0.35rem solid;\n}\n\n#hourly_details > .day > .hour > ul {\n  list-style: none;\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n}\n\n#hourly_details > .day > .hour > ul > * {\n  display: flex;\n}\n\n/* selects the li with time */\n#hourly_details > .day > .hour > ul:first-of-type > li {\n  text-transform: lowercase;\n}\n\n#hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,\n#hourly_details > .day > .hour > ul:last-of-type {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #hourly_details > .day > .hour {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    padding: 2rem 3rem;\n    justify-items: center;\n  }\n\n  #hourly_details > .day > .hour > ul:nth-of-type(3) {\n    justify-self: flex-start;\n  }\n\n  #hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,\n  #hourly_details > .day > .hour > ul:last-of-type {\n    display: flex;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/tabs.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/tabs.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* stylesheet for tabs.js, and tabs_navbar.js */
#tabs_navbar {
  background-color: var(--color-background-default);
  padding: 1rem;
  display: flex;
  justify-content: center;
  box-shadow: 0px -5px 14px -10px var(--color-box-shadow);
}

#tabs_navbar > ul {
  display: flex;
  list-style: none;
  column-gap: 0.5rem;
  justify-content: center;
}

.tabs_list_item {
  padding: 0.5rem;
}

/* #tabs_navbar anchors */
.tabs_list_item > * {
  text-decoration: none;
  text-wrap: nowrap;
  color: var(--color-background-primary);
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 700;
  padding: 0.5vw;
  position: relative;
}

.tabs_list_item > *:after {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  content: '';
  width: 50%;
  height: 4px;
  margin: auto;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transition: all 200ms ease-in-out;
}

.tabs_list_item > *:hover:after {
  transform: scaleX(1) scaleY(1.25);
}

.tabs_list_item > [data-active='true'] {
  color: var(--color-background-secondary);
}

@media screen and (min-width: 768px) {
  #tabs_navbar {
    justify-content: flex-start;
  }
  .tabs_list_item > * {
    padding: 1rem;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/tabs.css"],"names":[],"mappings":"AAAA,+CAA+C;AAC/C;EACE,iDAAiD;EACjD,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,uDAAuD;AACzD;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,uBAAuB;AACzB;;AAEA;EACE,eAAe;AACjB;;AAEA,yBAAyB;AACzB;EACE,qBAAqB;EACrB,iBAAiB;EACjB,sCAAsC;EACtC,mCAAmC;EACnC,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,WAAW;EACX,UAAU;EACV,WAAW;EACX,YAAY;EACZ,qCAAqC;EACrC,oBAAoB;EACpB,iCAAiC;AACnC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE;IACE,2BAA2B;EAC7B;EACA;IACE,aAAa;EACf;AACF","sourcesContent":["/* stylesheet for tabs.js, and tabs_navbar.js */\n#tabs_navbar {\n  background-color: var(--color-background-default);\n  padding: 1rem;\n  display: flex;\n  justify-content: center;\n  box-shadow: 0px -5px 14px -10px var(--color-box-shadow);\n}\n\n#tabs_navbar > ul {\n  display: flex;\n  list-style: none;\n  column-gap: 0.5rem;\n  justify-content: center;\n}\n\n.tabs_list_item {\n  padding: 0.5rem;\n}\n\n/* #tabs_navbar anchors */\n.tabs_list_item > * {\n  text-decoration: none;\n  text-wrap: nowrap;\n  color: var(--color-background-primary);\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  font-weight: 700;\n  padding: 0.5vw;\n  position: relative;\n}\n\n.tabs_list_item > *:after {\n  position: absolute;\n  bottom: 10%;\n  left: 0;\n  right: 0;\n  content: '';\n  width: 50%;\n  height: 4px;\n  margin: auto;\n  background-color: var(--color-accent);\n  transform: scaleX(0);\n  transition: all 200ms ease-in-out;\n}\n\n.tabs_list_item > *:hover:after {\n  transform: scaleX(1) scaleY(1.25);\n}\n\n.tabs_list_item > [data-active='true'] {\n  color: var(--color-background-secondary);\n}\n\n@media screen and (min-width: 768px) {\n  #tabs_navbar {\n    justify-content: flex-start;\n  }\n  .tabs_list_item > * {\n    padding: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/today.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/today.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#today_summary {
  padding: 2rem;
}

#today_summary > ul {
  list-style: none;
}

#today_summary > ul > :first-child {
  font-size: clamp(2rem, 2vw, 3rem);
}

#today_summary > header > h3 {
  font-size: clamp(1.5rem, 2vw, 2rem);
}

#today_summary > header > h3 > span {
  font-size: 1rem;
  font-weight: 300;
  text-wrap: nowrap;
  margin-left: 0.5rem;
}

#today_summary > ul:last-of-type {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
}

#today_summary > ul:last-of-type > :last-child {
  font-size: clamp(1.5rem, 2vw, 2rem);
}

#today_summary > ul:last-of-type > :first-child {
  display: flex;
  position: absolute;
  right: 0;
}

#today_details > * > * {
  list-style: none;
}

#today_details > .today_details_header {
  padding: 2rem;
  color: var(--color-background-primary);
  background-color: var(--color-background-default);
  display: flex;
  flex-wrap: wrap;
}

#today_details > .today_details_header > :first-child {
  flex: 1;
}

/* selects li with "feels like" */
#today_details > .today_details_header > :first-child > :first-child {
  text-wrap: nowrap;
  text-transform: capitalize;
  font-size: clamp(1rem, 2vw, 1.5rem);
}

#today_details > .today_details_header > :first-child > :last-child {
  font-size: clamp(2rem, 2vw, 2.5rem);
}

#today_details > .today_details_header > .today_details_sun {
  display: flex;
  flex-wrap: wrap;
  align-content: end;
  column-gap: 1rem;
}

#today_details > .today_details_header > .today_details_sun > * {
  list-style: none;
  display: flex;
  column-gap: 0.5rem;
}

/* selects li's that wrap an icon */
#today_details > .today_details_header > .today_details_sun > * > :first-child > svg {
  width: clamp(1.75rem, 2vw, 3rem);
  height: auto;
}

#today_details > .today_details_header > .today_details_sun > * > li {
  display: flex;
  font-size: clamp(1.5rem, 2vw, 2rem);
}

#today_details > .today_details_container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
}

#today_details > .today_details_container > ul {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 1.25rem;
  border: 2px solid black;
  flex-wrap: wrap;
  justify-content: center;
}

#today_details > .today_details_container > ul > * {
  font-size: clamp(1.5rem, 2vw, 2rem);
}

/* selects li's that wrap an icon */
#today_details > .today_details_container > ul > :first-child {
  display: flex;
}

#today_details > .today_details_container > ul > :first-child > svg {
  width: clamp(1.75rem, 2vw, 2rem);
  height: auto;
}

#today_details > .today_details_container > ul > :nth-child(2) {
  flex: 1;
  text-transform: capitalize;
  text-wrap: nowrap;
}

@media screen and (min-width: 768px) {
  #today_details > .today_details_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    row-gap: 1rem;
    padding: 2rem;
  }

  #today_details > .today_details_container > ul {
    column-gap: 1.5rem;
    padding: 2rem;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/today.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,kBAAkB;AACpB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,iDAAiD;EACjD,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,OAAO;AACT;;AAEA,iCAAiC;AACjC;EACE,iBAAiB;EACjB,0BAA0B;EAC1B,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,kBAAkB;AACpB;;AAEA,mCAAmC;AACnC;EACE,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,uBAAuB;EACvB,eAAe;EACf,uBAAuB;AACzB;;AAEA;EACE,mCAAmC;AACrC;;AAEA,mCAAmC;AACnC;EACE,aAAa;AACf;;AAEA;EACE,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,OAAO;EACP,0BAA0B;EAC1B,iBAAiB;AACnB;;AAEA;EACE;IACE,aAAa;IACb,qCAAqC;IACrC,gBAAgB;IAChB,aAAa;IACb,aAAa;EACf;;EAEA;IACE,kBAAkB;IAClB,aAAa;EACf;AACF","sourcesContent":["#today_summary {\n  padding: 2rem;\n}\n\n#today_summary > ul {\n  list-style: none;\n}\n\n#today_summary > ul > :first-child {\n  font-size: clamp(2rem, 2vw, 3rem);\n}\n\n#today_summary > header > h3 {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_summary > header > h3 > span {\n  font-size: 1rem;\n  font-weight: 300;\n  text-wrap: nowrap;\n  margin-left: 0.5rem;\n}\n\n#today_summary > ul:last-of-type {\n  display: flex;\n  flex-direction: column-reverse;\n  position: relative;\n}\n\n#today_summary > ul:last-of-type > :last-child {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_summary > ul:last-of-type > :first-child {\n  display: flex;\n  position: absolute;\n  right: 0;\n}\n\n#today_details > * > * {\n  list-style: none;\n}\n\n#today_details > .today_details_header {\n  padding: 2rem;\n  color: var(--color-background-primary);\n  background-color: var(--color-background-default);\n  display: flex;\n  flex-wrap: wrap;\n}\n\n#today_details > .today_details_header > :first-child {\n  flex: 1;\n}\n\n/* selects li with \"feels like\" */\n#today_details > .today_details_header > :first-child > :first-child {\n  text-wrap: nowrap;\n  text-transform: capitalize;\n  font-size: clamp(1rem, 2vw, 1.5rem);\n}\n\n#today_details > .today_details_header > :first-child > :last-child {\n  font-size: clamp(2rem, 2vw, 2.5rem);\n}\n\n#today_details > .today_details_header > .today_details_sun {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: end;\n  column-gap: 1rem;\n}\n\n#today_details > .today_details_header > .today_details_sun > * {\n  list-style: none;\n  display: flex;\n  column-gap: 0.5rem;\n}\n\n/* selects li's that wrap an icon */\n#today_details > .today_details_header > .today_details_sun > * > :first-child > svg {\n  width: clamp(1.75rem, 2vw, 3rem);\n  height: auto;\n}\n\n#today_details > .today_details_header > .today_details_sun > * > li {\n  display: flex;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_details > .today_details_container {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.25rem;\n}\n\n#today_details > .today_details_container > ul {\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n  padding: 1.25rem;\n  border: 2px solid black;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n#today_details > .today_details_container > ul > * {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n/* selects li's that wrap an icon */\n#today_details > .today_details_container > ul > :first-child {\n  display: flex;\n}\n\n#today_details > .today_details_container > ul > :first-child > svg {\n  width: clamp(1.75rem, 2vw, 2rem);\n  height: auto;\n}\n\n#today_details > .today_details_container > ul > :nth-child(2) {\n  flex: 1;\n  text-transform: capitalize;\n  text-wrap: nowrap;\n}\n\n@media screen and (min-width: 768px) {\n  #today_details > .today_details_container {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 2rem;\n    row-gap: 1rem;\n    padding: 2rem;\n  }\n\n  #today_details > .today_details_container > ul {\n    column-gap: 1.5rem;\n    padding: 2rem;\n  }\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/styles/content.css":
/*!********************************!*\
  !*** ./src/styles/content.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./content.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/content.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/error.css":
/*!******************************!*\
  !*** ./src/styles/error.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_error_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./error.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/error.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_error_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_error_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_error_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_error_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/footer.css":
/*!*******************************!*\
  !*** ./src/styles/footer.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./footer.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/footer.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/styles/loading.css":
/*!********************************!*\
  !*** ./src/styles/loading.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_loading_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./loading.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/loading.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_loading_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_loading_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_loading_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_loading_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tabs/forecast.css":
/*!**************************************!*\
  !*** ./src/styles/tabs/forecast.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_forecast_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./forecast.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/forecast.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_forecast_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_forecast_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_forecast_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_forecast_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tabs/hourly.css":
/*!************************************!*\
  !*** ./src/styles/tabs/hourly.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_hourly_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./hourly.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/hourly.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_hourly_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_hourly_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_hourly_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_hourly_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tabs/tabs.css":
/*!**********************************!*\
  !*** ./src/styles/tabs/tabs.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tabs_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./tabs.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/tabs.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tabs_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tabs_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tabs_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tabs_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tabs/today.css":
/*!***********************************!*\
  !*** ./src/styles/tabs/today.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_today_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./today.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tabs/today.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_today_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_today_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_today_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_today_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.css */ "./src/app.css");
/* harmony import */ var _iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @iconfu/svg-inject */ "./node_modules/@iconfu/svg-inject/dist/svg-inject.js");
/* harmony import */ var _iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/header/header */ "./src/components/header/header.js");
/* harmony import */ var _components_main_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/main/main */ "./src/components/main/main.js");
/* harmony import */ var _components_footer_footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/footer/footer */ "./src/components/footer/footer.js");
/* harmony import */ var _containers_api_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./containers/api_controller */ "./src/containers/api_controller.js");








(() => {
  const build = {
    header: _components_header_header__WEBPACK_IMPORTED_MODULE_3__["default"],
    main: _components_main_main__WEBPACK_IMPORTED_MODULE_4__["default"],
    footer: _components_footer_footer__WEBPACK_IMPORTED_MODULE_5__["default"],
  };

  const app = {
    init() {
      this.render();
    },
    render() {
      const appWrapper = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])('div');
      const appContent = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])('div');
      appWrapper.id = 'weather_app';
      appContent.id = 'content';

      appWrapper.appendChild(build.header());
      appContent.appendChild(build.main());
      appWrapper.appendChild(appContent);
      appWrapper.appendChild(build.footer());

      document.body.appendChild(appWrapper);
    },
  };

  app.init();
})();


/***/ }),

/***/ "./src/assets/icons sync \\.svg$":
/*!****************************************************!*\
  !*** ./src/assets/icons/ sync nonrecursive \.svg$ ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./chance_of_rain.svg": "./src/assets/icons/chance_of_rain.svg",
	"./humidity.svg": "./src/assets/icons/humidity.svg",
	"./menu.svg": "./src/assets/icons/menu.svg",
	"./minmaxtemp.svg": "./src/assets/icons/minmaxtemp.svg",
	"./pressure.svg": "./src/assets/icons/pressure.svg",
	"./progress_activity.svg": "./src/assets/icons/progress_activity.svg",
	"./sharp_home.svg": "./src/assets/icons/sharp_home.svg",
	"./sunrise.svg": "./src/assets/icons/sunrise.svg",
	"./sunset.svg": "./src/assets/icons/sunset.svg",
	"./uv.svg": "./src/assets/icons/uv.svg",
	"./visibility.svg": "./src/assets/icons/visibility.svg",
	"./wind.svg": "./src/assets/icons/wind.svg"
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

/***/ "./src/components/error/error.js":
/*!***************************************!*\
  !*** ./src/components/error/error.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ errorHeader)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _styles_error_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/error.css */ "./src/styles/error.css");



const errorBuilder = {
  init(weatherError) {
    this.setError(weatherError);
  },
  setError(error) {
    this.error = error.error;
    this.errorMessage = `Error code: ${error.status}
    ${error.error.message}`;
  },
  cacheDOM() {},
  bindEvents() {},
  render() {
    const errorSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const errorHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h2');
    errorSection.id = 'error';
    errorHeading.setAttributes({ textContent: this.errorMessage });

    errorSection.appendChild(errorHeading);
    return errorSection;
  },
};

function errorHeader(weatherError) {
  errorBuilder.init(weatherError);
  return errorBuilder.render();
}


/***/ }),

/***/ "./src/components/footer/footer.js":
/*!*****************************************!*\
  !*** ./src/components/footer/footer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildfooter)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _styles_footer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/footer.css */ "./src/styles/footer.css");



const footerBuilder = {
  cacheDOM(footerElement) {},
  bindEvents() {},
  render() {
    const footerElement = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('footer');
    const footerAnchorWrapper = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
    const footerAnchor = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('a');
    footerAnchorWrapper.textContent = 'Powered by ';
    footerElement.id = 'footer';

    footerAnchor.setAttributes({
      href: 'https://www.weatherapi.com/',
      target: '_blank',
      textContent: 'Weather API',
    });

    footerAnchorWrapper.appendChild(footerAnchor);
    footerElement.appendChild(footerAnchorWrapper);
    return footerElement;
  },
};

function buildfooter() {
  return footerBuilder.render();
}


/***/ }),

/***/ "./src/components/header/header.config.js":
/*!************************************************!*\
  !*** ./src/components/header/header.config.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  {
    element: 'form',
    attributes: {
      id: 'form',
    },
    inputs: [
      {
        element: 'input',
        attributes: {
          id: 'location',
          class: 'form_input',
          name: 'location',
          type: 'search',
          placeholder: 'Enter city or postal code',
        },
        error: 'Enter a valid city or postal code',
      },
      {
        element: 'input',
        attributes: {
          id: 'unitsystem',
          class: 'form_input',
          name: 'unitsystem',
          type: 'hidden',
          placeholder: `Enter 'imperial' or 'metric'`,
          value: 'imperial',
        },
      },
    ],
  },
]);


/***/ }),

/***/ "./src/components/header/header.js":
/*!*****************************************!*\
  !*** ./src/components/header/header.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHeader)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _containers_pubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../containers/pubSub */ "./src/containers/pubSub.js");
/* harmony import */ var _header_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header.config */ "./src/components/header/header.config.js");
/* harmony import */ var _navbar_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../navbar/navbar */ "./src/components/navbar/navbar.js");
/* harmony import */ var _tabs_unitsystems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tabs/unitsystems */ "./src/components/tabs/unitsystems.js");
/* harmony import */ var _styles_header_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/header.css */ "./src/styles/header.css");







const headerBuilder = {
  cacheDOM(headerElement) {
    this.header = headerElement;
    this.form = headerElement.querySelector('#form');
    this.inputSearch = headerElement.querySelector('#location');
    this.inputUnitsystem = headerElement.querySelector('#unitsystem');
    this.inputErrors = headerElement.querySelectorAll('.validity_error');
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.setUnitSystem = this.setUnitSystem.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.form.addEventListener('submit', this.submitForm);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe('setUnitSystem', this.setUnitSystem);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe('setActiveTab', this.setActiveTab);
  },
  render() {
    const headerElement = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('header');
    headerElement.id = 'header';
    headerElement.appendChild(_navbar_navbar__WEBPACK_IMPORTED_MODULE_3__["default"].render());

    Object.keys(_header_config__WEBPACK_IMPORTED_MODULE_2__["default"]).forEach((key) => {
      const headerItem = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])(_header_config__WEBPACK_IMPORTED_MODULE_2__["default"][key].element);
      headerItem.setAttributes(_header_config__WEBPACK_IMPORTED_MODULE_2__["default"][key].attributes);

      if (_header_config__WEBPACK_IMPORTED_MODULE_2__["default"][key].inputs) {
        _header_config__WEBPACK_IMPORTED_MODULE_2__["default"][key].inputs.forEach((input) => {
          const formItem = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
          const inputLabel = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('label');
          const formInput = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])(input.element);
          const inputError = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('span');

          inputError.setAttributes({
            class: `validity_error ${input.attributes.id}`,
            textContent: input.error,
          });
          formInput.setAttributes(input.attributes);
          inputLabel.setAttributes({
            for: input.attributes.id,
            textContent: input.attributes.placeholder,
          });
          formItem.setAttributes({ class: 'form_item' });

          if (input.error) formItem.appendChild(inputLabel);
          formItem.appendChild(formInput);
          if (input.error) formItem.appendChild(inputError);
          headerItem.appendChild(formItem);
        });
      }

      headerElement.appendChild(headerItem);
    });

    this.cacheDOM(headerElement);
    this.bindEvents();
    return headerElement;
  },
  submitForm(e) {
    if (e) e.preventDefault();
    (0,_tabs_unitsystems__WEBPACK_IMPORTED_MODULE_4__.setUnitSystem)(this.inputUnitsystem.value);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('getWeather', this.inputSearch.value, this.activeTab);
  },
  setUnitSystem(selection) {
    this.inputUnitsystem.value = selection;
    if (this.inputSearch.value.length !== 0) {
      this.submitForm();
    }
  },
  setActiveTab(key) {
    this.activeTab = key;
  },
};

function buildHeader() {
  return headerBuilder.render();
}


/***/ }),

/***/ "./src/components/home/home.config.js":
/*!********************************************!*\
  !*** ./src/components/home/home.config.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  {
    element: 'div',
    attributes: {
      class: 'welcome',
    },
    children: [
      {
        element: 'h2',
        attributes: {
          class: 'welcome_heading',
          textContent: 'Placeholder',
        },
      },
      {
        element: 'p',
        attributes: {
          class: 'welcome_paragraph',
          textContent:
            'Aenean est urna, mollis ut finibus vel, faucibus sed orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id luctus nisl, at maximus felis. Fusce eu rhoncus elit. Duis efficitur dolor libero, eget ultrices eros ultricies et. Integer eleifend id ipsum eget pharetra. Donec vitae dui vehicula, placerat leo et, aliquet elit. In lacinia lacinia nisl semper lobortis. Praesent tortor massa, fermentum eu viverra ac, laoreet sed odio. Sed rhoncus dictum vestibulum. Ut ac rhoncus ipsum. Sed ut sem aliquet, imperdiet nibh eu, pulvinar eros. Morbi pharetra gravida libero at ornare.',
        },
      },
    ],
  },
  {
    element: 'div',
    attributes: {
      class: 'faq',
    },
    children: [
      {
        element: 'h2',
        attributes: {
          class: 'faq_heading',
          textContent: 'Placeholder',
        },
      },
      {
        element: 'p',
        attributes: {
          class: 'faq_paragraph',
          textContent:
            'Cras at lobortis orci, et posuere sapien. Sed turpis lectus, ultrices in mattis vel, cursus vitae lectus. Sed posuere purus sapien, a porta sapien consectetur vitae. Maecenas venenatis eu arcu ut facilisis. Fusce facilisis rutrum turpis vitae commodo. Proin finibus risus nec imperdiet efficitur. Maecenas egestas mi vel euismod ornare. Mauris vel sollicitudin nibh, nec gravida est. Praesent bibendum odio quis cursus rutrum.',
        },
      },
      {
        element: 'p',
        attributes: {
          class: 'welcome_paragraph',
          textContent:
            'Ut egestas erat et orci luctus porttitor sit amet consequat risus. Aenean blandit rhoncus ante, eget feugiat ex porta eu. Nunc eget elit est. Donec suscipit convallis enim sed tincidunt. Proin fermentum venenatis elit ut consequat. Praesent interdum lectus vel lacinia porta. Mauris purus mauris, porttitor sed bibendum vitae, interdum quis nibh. Nulla ex est, semper ac nisi vitae, imperdiet mattis enim. Nulla vel cursus velit. Morbi ac felis quis ipsum condimentum dictum vitae eu sem. Nullam laoreet nisl sed nunc ultrices, eu auctor lectus consectetur. Nam non felis est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque congue dolor eu dapibus tincidunt. Vivamus eleifend enim velit, vitae placerat ligula bibendum at. Nam aliquet dignissim accumsan.',
        },
      },
    ],
  },
]);


/***/ }),

/***/ "./src/components/home/home.js":
/*!*************************************!*\
  !*** ./src/components/home/home.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHome)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _styles_home_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/home.css */ "./src/styles/home.css");
/* harmony import */ var _home_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.config */ "./src/components/home/home.config.js");




const homeBuilder = {
  cacheDOM() {},
  bindEvents() {},
  render() {
    const homeSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    homeSection.id = 'home';
    _home_config__WEBPACK_IMPORTED_MODULE_2__["default"].forEach((item) => {
      const section = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])(item.element);
      section.setAttributes(item.attributes);

      if (item.children) {
        item.children.forEach((subItem) => {
          const subSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])(subItem.element);
          subSection.setAttributes(subItem.attributes);
          section.appendChild(subSection);
        });
      }
      homeSection.appendChild(section);
    });

    return homeSection;
  },
};

function buildHome() {
  return homeBuilder.render();
}


/***/ }),

/***/ "./src/components/loading/loading.js":
/*!*******************************************!*\
  !*** ./src/components/loading/loading.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHome)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _styles_loading_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/loading.css */ "./src/styles/loading.css");
/* harmony import */ var _assets_icons_progress_activity_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icons/progress_activity.svg */ "./src/assets/icons/progress_activity.svg");




const loadingBuilder = {
  cacheDOM() {},
  bindEvents() {},
  render() {
    const loadingSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const loadingImage = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('img');
    loadingSection.id = 'loading';
    loadingImage.setAttributes({ onload: 'SVGInject(this)', src: _assets_icons_progress_activity_svg__WEBPACK_IMPORTED_MODULE_2__, id: 'loading_img' });

    loadingSection.appendChild(loadingImage);

    return loadingSection;
  },
};

function buildHome() {
  return loadingBuilder.render();
}


/***/ }),

/***/ "./src/components/main/main.js":
/*!*************************************!*\
  !*** ./src/components/main/main.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMain)
/* harmony export */ });
/* harmony import */ var _containers_pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../containers/pubSub */ "./src/containers/pubSub.js");
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _home_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../home/home */ "./src/components/home/home.js");
/* harmony import */ var _error_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/error */ "./src/components/error/error.js");
/* harmony import */ var _tabs_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tabs/tabs */ "./src/components/tabs/tabs.js");
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../loading/loading */ "./src/components/loading/loading.js");
/* harmony import */ var _styles_content_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/content.css */ "./src/styles/content.css");








const build = {
  home: _home_home__WEBPACK_IMPORTED_MODULE_2__["default"],
  error: _error_error__WEBPACK_IMPORTED_MODULE_3__["default"],
  tabs: _tabs_tabs__WEBPACK_IMPORTED_MODULE_4__["default"],
  loading: _loading_loading__WEBPACK_IMPORTED_MODULE_5__["default"],
};

const mainBuilder = {
  activeContent: null,
  activeTab: null,
  init() {},
  cacheDOM(mainElement) {
    this.main = mainElement;
  },
  bindEvents() {
    this.switchContent = this.switchContent.bind(this);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('switchContent', this.switchContent);
  },
  render(key, data, renderKey) {
    let content;
    if (!key) {
      content = build.home();
    } else {
      content = build[key](data, renderKey);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(weatherData, renderKey) {
    let contentKey;
    if (weatherData.error) {
      contentKey = 'error';
    } else if (weatherData === 'loading') {
      contentKey = 'loading';
    } else {
      contentKey = 'tabs';
    }
    this.render(contentKey, weatherData, renderKey);
  },
  setActiveTab(tab) {},
};

function buildMain() {
  // return mainBuilder.render();
  const main = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_1__["default"])('main');
  main.id = 'main_content';
  mainBuilder.cacheDOM(main);
  mainBuilder.bindEvents();
  mainBuilder.render();
  return main;
}


/***/ }),

/***/ "./src/components/navbar/navbar.config.js":
/*!************************************************!*\
  !*** ./src/components/navbar/navbar.config.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_illustrations_undraw_weather_app_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/illustrations/undraw_weather_app.svg */ "./src/assets/illustrations/undraw_weather_app.svg");
/* harmony import */ var _assets_icons_menu_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/icons/menu.svg */ "./src/assets/icons/menu.svg");
/* harmony import */ var _assets_icons_github_mark_github_mark_white_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icons/github_mark/github-mark-white.svg */ "./src/assets/icons/github_mark/github-mark-white.svg");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  navLeft: [
    {
      element: 'a',
      attributes: {
        href: '#',
        class: 'nav_item nav_logo',
      },
      children: [
        {
          element: 'img',
          attributes: {
            src: _assets_illustrations_undraw_weather_app_svg__WEBPACK_IMPORTED_MODULE_0__,
            onload: 'SVGInject(this)',
          },
        },
        {
          element: 'h1',
          attributes: {
            textContent: 'Weather App',
          },
        },
      ],
    },
  ],
  navRight: [
    {
      element: 'button',
      attributes: {
        id: 'unit_systems_button',
        type: 'button',
        value: true,
      },
      children: [
        {
          element: 'span',
          attributes: {
            class: 'imperial',
            textContent: '°F',
          },
        },
        {
          element: 'span',
          attributes: {
            class: 'metric',
            textContent: '°C',
          },
        },
      ],
    },
    {
      element: 'a',
      attributes: {
        href: '#',
        class: 'nav_item',
        textContent: 'Placeholder',
      },
    },
    {
      element: 'a',
      attributes: {
        href: '#',
        class: 'nav_item',
        textContent: 'Placeholder',
      },
    },
    {
      element: 'a',
      attributes: {
        href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/weather-app',
        target: '_blank',
        class: 'nav_item',
      },
      children: [
        {
          element: 'img',
          attributes: {
            src: _assets_icons_github_mark_github_mark_white_svg__WEBPACK_IMPORTED_MODULE_2__,
            onload: 'SVGInject(this)',
          },
        },
      ],
    },
  ],
  menuButton: {
    element: 'button',
    attributes: {
      class: 'nav_btn',
    },
    child: {
      element: 'img',
      attributes: {
        src: _assets_icons_menu_svg__WEBPACK_IMPORTED_MODULE_1__,
        onload: 'SVGInject(this)',
      },
    },
  },
});


/***/ }),

/***/ "./src/components/navbar/navbar.js":
/*!*****************************************!*\
  !*** ./src/components/navbar/navbar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_header_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/header.css */ "./src/styles/header.css");
/* harmony import */ var _navbar_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar.config */ "./src/components/navbar/navbar.config.js");
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _containers_pubSub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/pubSub */ "./src/containers/pubSub.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  cacheDOM(navElement) {
    this.navbar = navElement;
    this.navRight = navElement.querySelector('.nav_right');
    this.navLinks = navElement.querySelectorAll('.nav_item');
    this.navBtn = navElement.querySelector('.nav_btn');
    this.unitSystemsBtn = navElement.querySelector('#unit_systems_button');
  },
  bindEvents() {
    this.toggleNav = this.toggleNav.bind(this);
    this.navBtn.addEventListener('click', this.toggleNav);
    this.toggleUnitSystem = this.toggleUnitSystem.bind(this);
    this.unitSystemsBtn.addEventListener('click', this.toggleUnitSystem);
  },
  render() {
    const navElement = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])('nav');
    const navContainer = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])('div');
    navElement.id = 'navbar';
    navContainer.classList.add('container');

    Object.keys(_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"]).forEach((key) => {
      if (Array.isArray(_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"][key])) {
        const section = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])('ul');
        section.classList.add(key.toLowerCase().includes('left') ? 'nav_left' : 'nav_right');
        _navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"][key].forEach((item) => {
          const li = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])('li');
          const element = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])(item.element);
          element.setAttributes(item.attributes);

          if (item.children) {
            item.children.forEach((child) => {
              const childNode = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])(child.element);
              childNode.setAttributes(child.attributes);
              element.appendChild(childNode);
            });
          }

          li.appendChild(element);
          section.appendChild(li);
        });
        navContainer.appendChild(section);
      } else {
        const btn = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])(_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"][key].element);
        const img = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_2__["default"])(_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"][key].child.element);
        btn.setAttributes(_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"][key].attributes);
        img.setAttributes(_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"][key].child.attributes);
        btn.appendChild(img);
        navContainer.appendChild(btn);
      }
    });

    navElement.appendChild(navContainer);
    this.cacheDOM(navElement);
    this.bindEvents();

    return navElement;
  },
  toggleNav() {
    if (this.navRight.classList.contains('visible')) {
      this.navRight.classList.remove('visible');
    } else {
      this.navRight.classList.add('visible');
    }
  },
  toggleUnitSystem(e) {
    const element = e.currentTarget;
    let newValue = true;
    let unitSystem = 'imperial';
    if (element.value === 'true') {
      newValue = false;
      unitSystem = 'metric';
    }
    element.value = newValue;
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_3__["default"].publish('setUnitSystem', unitSystem);
  },
});


/***/ }),

/***/ "./src/components/tabs/forecast/forecast.config.js":
/*!*********************************************************!*\
  !*** ./src/components/tabs/forecast/forecast.config.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
/* harmony import */ var _helpers_formatDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/formatDate */ "./src/helpers/formatDate.js");
/* harmony import */ var _unitsystems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../unitsystems */ "./src/components/tabs/unitsystems.js");
// forecastday.date |
// (forecastday.day.maxtemp_f
// forecastday.day.mintemp_f)
// forecastday.day.condition
// forecastday.day.daily_chance_of_rain |
// wind
// NW, NNW, N, NNE, NE
// ENE, E, ESE
// SE, SSE, S, SSW, SW
// WSW, W, WNW
// import importAll from '../../../helpers/importAll';




const data = (state) => [
  {
    key: 'date',
    value: state.date,
    setText() {
      return `${(0,_helpers_formatDate__WEBPACK_IMPORTED_MODULE_1__["default"])(this.value, true)}`;
    },
  },
  {
    key: 'minmaxtemp',
    min: {
      value: state.setValue(state, 'mintemp_', 'temp'),
      label: 'low',
    },
    max: {
      value: state.setValue(state, 'maxtemp_', 'temp'),
      label: 'high',
    },
    unit: '°',
    label: `high / low`,
    setText() {
      return `${this.max.value}${this.unit} / ${this.min.value}${this.unit}`;
    },
  },
  {
    key: 'condition',
    label: state.condition.text,
    icon: state.condition.icon,
    setText() {
      return `${this.label}`;
    },
  },
  {
    key: 'precip',
    value: state.daily_chance_of_rain,
    unit: '%',
    icon: state.setIcon('rain'),
    setText() {
      return `${this.value}${this.unit}`;
    },
  },
];

const location = (state) => ({
  location: {
    country: state.country,
    localtime: state.localtime,
    name: state.name,
    region: state.region,
    setText() {
      return `${this.name}, ${
        this.region.length === 0 || this.region === this.name ? this.country : this.region
      }`;
    },
  },
});

const forecastController = {
  init(weatherData) {
    this.weatherData = weatherData;
    this.setDay = this.setDay.bind(this);
    const forecastday = weatherData.forecast.forecastday.map(this.setDay);
    const state = {
      ...weatherData.location,
    };

    return {
      ...location(state),
      forecastday,
      last_updated: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__["default"])(weatherData.current.last_updated).toLowerCase(),
    };
  },
  setDay(obj) {
    const days = obj;
    const state = {
      ..._unitsystems__WEBPACK_IMPORTED_MODULE_2__.unitSystem,
      ...obj.day,
      ...obj,
    };

    return { ...data(state) };
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(weatherData, timeStamp) {
    this.setProperties(forecastController.init(weatherData));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
});


/***/ }),

/***/ "./src/components/tabs/forecast/forecast.js":
/*!**************************************************!*\
  !*** ./src/components/tabs/forecast/forecast.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildForecast)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _forecast_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forecast.config */ "./src/components/tabs/forecast/forecast.config.js");
/* harmony import */ var _styles_tabs_forecast_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../styles/tabs/forecast.css */ "./src/styles/tabs/forecast.css");
/* harmony import */ var _helpers_createContentRows__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/createContentRows */ "./src/helpers/createContentRows.js");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");






const forecastBuilder = {
  init() {},
  cacheDOM() {},
  bindEvents() {},
  render() {
    const forecastSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const forecastSectionHeader = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('header');
    const forecastSectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h2');
    const forecastLocation = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('span');
    const forecastTimeStamp = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('p');

    forecastSection.id = 'forecast';
    forecastSectionHeading.textContent = '3 Day Weather';
    forecastLocation.textContent = ` - ${_forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].location.setText()}`;
    forecastTimeStamp.textContent = `As of ${_forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].last_updated}`;

    forecastSectionHeading.appendChild(forecastLocation);
    forecastSectionHeader.appendChild(forecastSectionHeading);
    forecastSectionHeader.appendChild(forecastTimeStamp);
    forecastSection.appendChild(forecastSectionHeader);

    const forecastDetails = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    forecastDetails.id = 'forecast_details';

    _forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].forecastday.forEach((day) => {
      const forecastday = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
      forecastday.className = 'day';
      Object.values(day).forEach((detail) => {
        forecastday.append((0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_3__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.setText()));
      });
      forecastDetails.appendChild(forecastday);
    });

    forecastSection.appendChild(forecastDetails);
    return forecastSection;
  },
};

function buildForecast(weatherData, timeStamp) {
  _forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].init(weatherData, timeStamp);
  return forecastBuilder.render();
}


/***/ }),

/***/ "./src/components/tabs/hourly/hourly.config.js":
/*!*****************************************************!*\
  !*** ./src/components/tabs/hourly/hourly.config.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
/* harmony import */ var _unitsystems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../unitsystems */ "./src/components/tabs/unitsystems.js");
// current.last_updated
// forecast.forecastday[0].hour.time
// forecast.forecastday[0].hour.temp_f
// forecast.forecastday[0].hour.condition.text
// forecast.forecastday[0].hour.chance_of_rain
// (forecast.forecastday[0].hour.wind_dir
// forecast.forecastday[0].hour.wind_mph)




const data = (state) => ({
  summary: [
    {
      name: 'time',
      value: state.time,
      setText() {
        return `${(0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__["default"])(this.value)}`;
      },
    },
    {
      name: 'temp',
      value: state.setValue(state, 'temp_', 'temp'),
      unit: '°',
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      name: 'condition',
      label: state.condition.text,
      icon: state.condition.icon,
      setText() {
        return `${this.label}`;
      },
    },
    {
      name: 'precip',
      value: state.chance_of_rain,
      unit: '%',
      icon: state.setIcon('rain'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      name: 'wind',
      value: state.setValue(state, 'wind_', 'speed'),
      unit: state.get('speed'),
      label: 'wind',
      icon: state.setIcon('wind'),
      dir: {
        value: state.wind_dir,
      },
      setText() {
        return `${this.dir.value} ${this.value} ${this.unit}`;
      },
    },
  ],
  details: [
    {
      key: 'feelslike',
      unit: '°',
      value: state.setValue(state, 'feelslike_', 'temp'),
      label: 'feels like',
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'wind',
      value: state.setValue(state, 'wind_', 'speed'),
      unit: state.get('speed'),
      label: 'wind',
      icon: state.setIcon('wind'),
      dir: {
        value: state.wind_dir,
      },
      setText() {
        return `${this.dir.value} ${this.value} ${this.unit}`;
      },
    },
    {
      key: 'humidity',
      value: state.humidity,
      unit: '%',
      label: 'humidity',
      icon: state.setIcon('humidity'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'uv',
      value: state.uv,
      label: 'UV Index',
      icon: state.setIcon('uv'),
      setText() {
        return `${this.value} of 11`;
      },
    },
    {
      key: 'cloud',
      value: state.cloud,
      unit: '%',
      label: 'cloud cover',
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'precip',
      value: state.precip_in,
      unit: state.get('precip'),
      label: 'precip amount',
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
  ],
});

const date = (state) => ({
  date: state.date,
});

const location = (state) => ({
  location: {
    country: state.country,
    localtime: state.localtime,
    name: state.name,
    region: state.region,
    setText() {
      return `${this.name}, ${
        this.region.length === 0 || this.region === this.name ? this.country : this.region
      }`;
    },
  },
});

const hourlyController = {
  init(weatherData) {
    this.weatherData = weatherData;
    this.setArray = this.setArray.bind(this);
    this.setHours = this.setHours.bind(this);
    const forecastday = weatherData.forecast.forecastday.map(this.setArray);

    const state = {
      ...weatherData,
      ...weatherData.location,
    };

    return {
      ...location(state),
      forecastday,
      last_updated: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__["default"])(state.current.last_updated).toLowerCase(),
    };
  },
  setArray(obj) {
    const hours = obj.hour.reduce(this.setHours, []);
    const state = { ...obj };

    return { ...date(state), hours };
  },
  setHours(filtered, hour) {
    const date1 = new Date(this.weatherData.current.last_updated);
    const date2 = new Date(hour.time);

    if (date1.getTime() <= date2.getTime()) {
      const state = {
        ..._unitsystems__WEBPACK_IMPORTED_MODULE_1__.unitSystem,
        ...hour,
      };
      filtered.push({ ...data(state) });
    }

    return filtered;
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(weatherData, timeStamp) {
    this.setProperties(hourlyController.init(weatherData));

    // console.log(timeStamp);
    // this.setProperties(hourlyController.init(weatherData, unitSystem));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
});
// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph


/***/ }),

/***/ "./src/components/tabs/hourly/hourly.js":
/*!**********************************************!*\
  !*** ./src/components/tabs/hourly/hourly.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHourly)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _hourly_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hourly.config */ "./src/components/tabs/hourly/hourly.config.js");
/* harmony import */ var _styles_tabs_hourly_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../styles/tabs/hourly.css */ "./src/styles/tabs/hourly.css");
/* harmony import */ var _helpers_formatDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/formatDate */ "./src/helpers/formatDate.js");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
/* harmony import */ var _helpers_createContentRows__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helpers/createContentRows */ "./src/helpers/createContentRows.js");







const hourlyBuilder = {
  init(weatherData) {},
  cacheDOM() {},
  bindEvents() {},
  render() {
    const hourlySection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const hourlySectionHeader = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('header');
    const hourlySectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h2');
    const hourlyLocation = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('span');
    const hourlyTimeStamp = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('p');

    hourlySection.id = 'hourly';
    hourlySectionHeading.textContent = 'Hourly weather';
    hourlyLocation.textContent = ` - ${_hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].location.setText()}`;
    hourlyTimeStamp.textContent = `As of ${_hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].last_updated}`;

    hourlySectionHeading.appendChild(hourlyLocation);
    hourlySectionHeader.appendChild(hourlySectionHeading);
    hourlySectionHeader.appendChild(hourlyTimeStamp);
    hourlySection.appendChild(hourlySectionHeader);

    const hourlyDetails = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    hourlyDetails.id = 'hourly_details';

    _hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].forecastday.forEach((day) => {
      const hourlyDay = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('ol');
      const hourlyDayHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h3');
      hourlyDay.className = 'day';
      hourlyDayHeading.textContent = (0,_helpers_formatDate__WEBPACK_IMPORTED_MODULE_3__["default"])(day.date);
      hourlyDay.appendChild(hourlyDayHeading);
      day.hours.forEach((hour) => {
        const hourContainer = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
        hourContainer.className = 'hour';
        Object.values(hour.summary).forEach((detail) => {
          hourContainer.appendChild(
            (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_5__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.setText()),
          );
        });

        hourlyDay.appendChild(hourContainer);
      });
      hourlyDetails.appendChild(hourlyDay);
    });

    hourlySection.appendChild(hourlyDetails);
    return hourlySection;
  },
};

function buildHourly(weatherData, timeStamp) {
  _hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].init(weatherData, timeStamp);
  return hourlyBuilder.render();
}


/***/ }),

/***/ "./src/components/tabs/tabs.js":
/*!*************************************!*\
  !*** ./src/components/tabs/tabs.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildTabs)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _tabs_navbar_tabs_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs_navbar/tabs_navbar */ "./src/components/tabs/tabs_navbar/tabs_navbar.js");
/* harmony import */ var _today_today__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./today/today */ "./src/components/tabs/today/today.js");
/* harmony import */ var _hourly_hourly__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hourly/hourly */ "./src/components/tabs/hourly/hourly.js");
/* harmony import */ var _forecast_forecast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forecast/forecast */ "./src/components/tabs/forecast/forecast.js");
/* harmony import */ var _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/pubSub */ "./src/containers/pubSub.js");
/* harmony import */ var _styles_tabs_tabs_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/tabs/tabs.css */ "./src/styles/tabs/tabs.css");








const build = {
  tabsNavbar: _tabs_navbar_tabs_navbar__WEBPACK_IMPORTED_MODULE_1__["default"],
  today: _today_today__WEBPACK_IMPORTED_MODULE_2__["default"],
  hourly: _hourly_hourly__WEBPACK_IMPORTED_MODULE_3__["default"],
  forecast: _forecast_forecast__WEBPACK_IMPORTED_MODULE_4__["default"],
};

const tabsBuilder = {
  init(weatherData) {
    this.timeStamp = Math.floor(Date.now() / 1000);
    this.setWeather(weatherData);
    this.switchTab = this.switchTab.bind(this);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].subscribe('render', this.render);
  },
  setWeather(weatherData) {
    this.weatherData = weatherData;
    this.location = weatherData.location.name;
    this.apiLastUpdated = weatherData.current.last_updated_epoch;
  },
  cacheDOM(tabsSection) {
    this.tabsSection = tabsSection;
    this.tabsList = tabsSection.querySelectorAll('.tabs_list_item > a');
  },
  bindEvents() {
    this.switchTab = this.switchTab.bind(this);
    this.tabsList.forEach((tab) => tab.addEventListener('click', this.switchTab));
  },
  render(key) {
    let content;
    if (!key) {
      content = build.today(this.weatherData, this.timeStamp);
    } else {
      content = build[key](this.weatherData, this.timeStamp);
    }
    this.setActiveTab(content.id);
    this.tabsSection.appendChild(content);
  },
  switchTab(e) {
    const { className: elementClassName } = e.currentTarget;
    const renderKey = elementClassName;

    _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].publish('getWeather', this.location, renderKey);
  },
  setActiveTab(id) {
    this.activeTab = [...this.tabsList].find((anchor) => anchor.classList.contains(id));
    this.activeTab.setAttributes({ 'data-active': true });
    this.activeKey = id;
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].publish('setActiveTab', id);
    // sends id to setActiveTab in header.js module
  },
};

function buildTabs(weatherData, renderKey) {
  tabsBuilder.init(weatherData);
  const tabsSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
  tabsSection.id = 'tabs';
  tabsSection.appendChild(build.tabsNavbar());
  tabsBuilder.cacheDOM(tabsSection);
  if (renderKey) {
    tabsBuilder.render(renderKey);
  } else {
    tabsBuilder.render();
  }
  tabsBuilder.bindEvents();
  return tabsSection;
}


/***/ }),

/***/ "./src/components/tabs/tabs_navbar/tabs_navbar.config.js":
/*!***************************************************************!*\
  !*** ./src/components/tabs/tabs_navbar/tabs_navbar.config.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  {
    attributes: {
      class: 'today',
      textContent: 'Today',
      href: '#',
    },
  },
  {
    attributes: {
      class: 'hourly',
      textContent: 'Hourly',
      href: '#',
    },
  },
  {
    attributes: {
      class: 'forecast',
      textContent: '3-Day',
      href: '#',
    },
  },
]);


/***/ }),

/***/ "./src/components/tabs/tabs_navbar/tabs_navbar.js":
/*!********************************************************!*\
  !*** ./src/components/tabs/tabs_navbar/tabs_navbar.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildTabsNavbar)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _tabs_navbar_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs_navbar.config */ "./src/components/tabs/tabs_navbar/tabs_navbar.config.js");



const tabsNavbarBuilder = {
  init() {},
  cacheDOM() {},
  bindEvents() {},
  render() {
    const tabsNavbar = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const tabsList = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('ul');
    tabsNavbar.id = 'tabs_navbar';
    Object.values(_tabs_navbar_config__WEBPACK_IMPORTED_MODULE_1__["default"]).forEach((tab) => {
      const tabsListItem = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('li');
      const tabsNavAnchor = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('a');
      tabsListItem.setAttributes({ class: 'tabs_list_item' });
      tabsNavAnchor.setAttributes(tab.attributes);

      tabsListItem.appendChild(tabsNavAnchor);
      tabsList.appendChild(tabsListItem);
    });

    tabsNavbar.appendChild(tabsList);
    return tabsNavbar;
  },
};

function buildTabsNavbar() {
  return tabsNavbarBuilder.render();
}


/***/ }),

/***/ "./src/components/tabs/today/today.config.js":
/*!***************************************************!*\
  !*** ./src/components/tabs/today/today.config.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
/* harmony import */ var _unitsystems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../unitsystems */ "./src/components/tabs/unitsystems.js");



const data = (state) => ({
  summary: [
    {
      key: 'temp',
      unit: '°',
      value: state.setValue(state, 'temp_', 'temp'),
      setText() {
        return `${this.value}${this.unit}`;
      },
    },
    {
      key: 'condition',
      label: state.condition.text,
      icon: state.condition.icon,
      setText() {
        return `${this.label}`;
      },
    },
  ],
  details: {
    header: [
      {
        key: 'feelslike',
        unit: '°',
        value: state.setValue(state, 'feelslike_', 'temp'),
        label: 'feels like',
        setText() {
          return `${this.value}${this.unit}`;
        },
      },
      {
        key: 'sunrise',
        value: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__["default"])(state.sunrise).toLowerCase(),
        label: 'sunrise',
        icon: state.setIcon('sunrise'),
        setText() {
          return `${this.value}`;
        },
      },
      {
        key: 'sunset',
        value: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__["default"])(state.sunset).toLowerCase(),
        label: 'sunset',
        icon: state.setIcon('sunset'),
        setText() {
          return `${this.value}`;
        },
      },
    ],
    body: [
      {
        key: 'minmaxtemp',
        min: {
          value: state.setValue(state.day, 'mintemp_', 'temp'),
          label: 'low',
        },
        max: {
          value: state.setValue(state.day, 'maxtemp_', 'temp'),
          label: 'high',
        },
        unit: '°',
        label: `high / low`,
        icon: state.setIcon('minmaxtemp'),
        setText() {
          return `${this.max.value}${this.unit} / ${this.min.value}${this.unit}`;
        },
      },
      {
        key: 'humidity',
        value: state.humidity,
        unit: '%',
        label: 'humidity',
        icon: state.setIcon('humidity'),
        setText() {
          return `${this.value}${this.unit}`;
        },
      },
      {
        key: 'pressure',
        value: state.setValue(state, 'pressure_', 'pressure'),
        unit: state.get('pressure'),
        label: 'pressure',
        icon: state.setIcon('pressure'),
        setText() {
          return `${this.value} ${this.unit}`;
        },
      },
      {
        key: 'vis',
        value: state.setValue(state, 'vis_', 'distance'),
        unit: state.get('distance'),
        label: 'visibility',
        icon: state.setIcon('visibility'),
        setText() {
          return `${this.value} ${this.unit}`;
        },
      },
      {
        key: 'wind',
        value: state.setValue(state, 'wind_', 'speed'),
        unit: state.get('speed'),
        label: 'wind',
        icon: state.setIcon('wind'),
        dir: {
          value: state.wind_dir,
        },
        setText() {
          return `${this.dir.value} ${this.value} ${this.unit}`;
        },
      },
      {
        key: 'uv',
        value: state.uv,
        label: 'UV Index',
        icon: state.setIcon('uv'),
        setText() {
          return `${this.value} of 11`;
        },
      },
    ],
  },
});

const location = (state) => ({
  country: state.country,
  localtime: state.localtime,
  name: state.name,
  region: state.region,
  setText() {
    return `${this.name}, ${
      this.region.length === 0 || this.region === this.name ? this.country : this.region
    }`;
  },
});

const todayController = {
  init(weatherData) {
    this.weatherData = weatherData;
    const state = {
      ..._unitsystems__WEBPACK_IMPORTED_MODULE_1__.unitSystem,
      ...weatherData.forecast.forecastday[0],
      ...weatherData.forecast.forecastday[0].astro,
      ...weatherData.current,
      ...weatherData.location,
    };
    return {
      ...data(state),
      location: location(state),
      last_updated: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_0__["default"])(weatherData.current.last_updated).toLowerCase(),
    };
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(weatherData, timeStamp) {
    console.log(timeStamp);
    this.setProperties(todayController.init(weatherData));
  },
  setProperties(obj) {
    Object.assign(this, obj);
  },
});


/***/ }),

/***/ "./src/components/tabs/today/today.js":
/*!********************************************!*\
  !*** ./src/components/tabs/today/today.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildToday)
/* harmony export */ });
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/createElement */ "./src/helpers/createElement.js");
/* harmony import */ var _helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/createContentRows */ "./src/helpers/createContentRows.js");
/* harmony import */ var _today_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./today.config */ "./src/components/tabs/today/today.config.js");
/* harmony import */ var _styles_tabs_today_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../styles/tabs/today.css */ "./src/styles/tabs/today.css");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");






const todayBuilder = {
  init() {},
  cacheDOM() {},
  bindEvents() {},
  render() {
    const todaySection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');

    todaySection.id = 'today';

    const todaySummary = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const todayHeader = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('header');
    const todaySectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h3');
    const todayTimeStamp = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('span');

    todaySummary.id = 'today_summary';
    todaySectionHeading.textContent = `${_today_config__WEBPACK_IMPORTED_MODULE_2__["default"].location.setText()} `;
    todayTimeStamp.textContent = `As of ${_today_config__WEBPACK_IMPORTED_MODULE_2__["default"].last_updated}`;

    todaySectionHeading.appendChild(todayTimeStamp);
    todayHeader.appendChild(todaySectionHeading);
    todaySummary.appendChild(todayHeader);

    _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].summary.forEach((detail) => {
      todaySummary.appendChild(
        (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.setText()),
      );
    });

    const todayDetails = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    todayDetails.id = 'today_details';

    const todayDetailsHeader = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
    const todayDetailsContainer = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
    todayDetailsHeader.classList.add('today_details_header');
    todayDetailsContainer.classList.add('today_details_container');

    todayDetailsHeader.appendChild(
      (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(
        _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"],
        null,
        _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].details.header[0].icon,
        _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].details.header[0].label,
        _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].details.header[0].setText(),
      ),
    );

    const todayDetailsSun = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div');
    todayDetailsSun.classList.add('today_details_sun');
    _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].details.header.forEach((detail, i) => {
      if (i > 0) {
        todayDetailsSun.appendChild(
          (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.label, detail.setText()),
        );
      }
    });

    _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].details.body.forEach((detail) => {
      todayDetailsContainer.appendChild(
        (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.label, detail.setText()),
      );
    });

    todayDetailsHeader.appendChild(todayDetailsSun);
    todaySection.appendChild(todaySummary);
    todayDetails.appendChild(todayDetailsHeader);
    todayDetails.appendChild(todayDetailsContainer);
    todaySection.appendChild(todayDetails);

    return todaySection;
  },
};

function buildToday(weatherData, timeStamp) {
  _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].init(weatherData, timeStamp);
  return todayBuilder.render();
}


/***/ }),

/***/ "./src/components/tabs/unitsystems.js":
/*!********************************************!*\
  !*** ./src/components/tabs/unitsystems.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setUnitSystem: () => (/* binding */ setUnitSystem),
/* harmony export */   unitSystem: () => (/* binding */ unitSystem)
/* harmony export */ });
/* harmony import */ var _helpers_importAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/importAll */ "./src/helpers/importAll.js");


const unitSystem = {
  icons: (0,_helpers_importAll__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
  get(key) {
    return this.unitSystem[key];
  },
  setIcon(key) {
    return this.icons.files[Object.keys(this.icons.files).find((iconKey) => iconKey.includes(key))];
  },
  roundValue(value) {
    return Math.round(value);
  },
  setValue(obj, ...args) {
    return this.roundValue(obj[`${args[0]}${this.get(args[1])}`]);
  },
};

const unitSystems = {
  metric: {
    temp: 'c',
    speed: 'kph',
    precipitation: 'mm',
    pressure: 'mb',
    distance: 'km',
  },
  imperial: {
    temp: 'f',
    speed: 'mph',
    precipitation: 'in',
    pressure: 'in',
    distance: 'miles',
  },
};

function setUnitSystem(selection) {
  Object.assign(unitSystem, { unitSystem: unitSystems[selection] });
}


/***/ }),

/***/ "./src/containers/api_controller.js":
/*!******************************************!*\
  !*** ./src/containers/api_controller.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeather)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/containers/pubSub.js");

// use WeatherAPI
// https://www.weatherapi.com/docs/
// http://api.weatherapi.com/v1/current.json?key=84ac7310e56448a1896212731230611&q=London

async function getWeather(value, tabKey) {
  // *note, value does NOT need to be evaluated before fetch
  // postal code, number or string
  // city, uppercase or lowercase;
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('switchContent', 'loading');

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=84ac7310e56448a1896212731230611&q=${value}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' },
    );

    const weatherData = await response.json();
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish(
      'switchContent',
      !response.ok ? Object.assign(response, weatherData) : weatherData,
      tabKey,
    );

    if (!response.ok) {
      throw new Error(`Code ${response.status}, ${weatherData.error.message}`);
    }

    // code below the if block will only run if there are no errors
    console.log(weatherData);
  } catch (err) {
    console.log(err);
  }
}

_pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('getWeather', getWeather);


/***/ }),

/***/ "./src/containers/pubSub.js":
/*!**********************************!*\
  !*** ./src/containers/pubSub.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  subscribers: {},
  subscribe(subscriber, fn) {
    this.subscribers[subscriber] = this.subscribers[subscriber] || [];
    this.subscribers[subscriber].push(fn);
  },
  unsubscribe(subscriber, fn) {
    if (this.subscribers[subscriber]) {
      this.subscribers[subscriber] = this.subscribers[subscriber].filter(
        (handler) => handler !== fn,
      );
    }
  },
  publish(subscriber, ...data) {
    if (this.subscribers[subscriber]) {
      this.subscribers[subscriber].forEach((fn) => {
        fn(...data);
      });
    }
  },
});


/***/ }),

/***/ "./src/helpers/createContentRows.js":
/*!******************************************!*\
  !*** ./src/helpers/createContentRows.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createContentRows)
/* harmony export */ });
function createContentRows(fn, attributes, ...args) {
  const containerAttributes = attributes ? attributes[1] : false;
  const itemAttributes = attributes ? attributes[2] : false;

  const container = fn('ul');
  if (containerAttributes) {
    container.setAttributes(containerAttributes);
  }
  args.forEach((item) => {
    if (item) {
      const listItem = fn('li');
      if (itemAttributes) item.setAttributes(itemAttributes);
      if (/\.[svg|png]{3}$/.test(item)) {
        const img = fn('img');
        if (/\.[svg]{3}$/.test(item)) img.setAttributes({ onload: 'SVGInject(this)' });
        img.src = item;
        listItem.appendChild(img);
      } else {
        listItem.textContent = item;
      }
      container.appendChild(listItem);
    }
  });
  return container;
}


/***/ }),

/***/ "./src/helpers/createElement.js":
/*!**************************************!*\
  !*** ./src/helpers/createElement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
const setElementState = () => ({
  setAttributes(attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== 'textContent') {
        this.setAttribute(key, value);
      } else {
        this.setTextContent(value);
      }
    });
  },
  setTextContent(text) {
    this.textContent = text;
  },
});

const buildElement = (tagName) => {
  const state = {
    tagName,
  };

  return { ...setElementState(state) };
};

function createElement(tagName) {
  const htmlElement = document.createElement(tagName);
  Object.assign(htmlElement, buildElement(htmlElement));

  return htmlElement;
}


/***/ }),

/***/ "./src/helpers/formatDate.js":
/*!***********************************!*\
  !*** ./src/helpers/formatDate.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDate)
/* harmony export */ });
function formatDate(dateString, boolean) {
  // this returns a format [Day, Month Date]
  // ex: Wednesday, April 14
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(`${dateString} 00:00:00`);

  return boolean
    ? `${date.toUTCString().substring(0, 3)} ${date.toUTCString().substring(5, 7)}`
    : `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
}


/***/ }),

/***/ "./src/helpers/formatTime.js":
/*!***********************************!*\
  !*** ./src/helpers/formatTime.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatTime)
/* harmony export */ });
function formatTime(time) {
  // returns 12 hour time format
  // ex: 2:00 PM or 10:00 AM
  const date = new Date(time.includes('-') ? time : `2000-12-01 ${time}`);
  const timeProperties = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-us', timeProperties);
}


/***/ }),

/***/ "./src/helpers/importAll.js":
/*!**********************************!*\
  !*** ./src/helpers/importAll.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ importAll)
/* harmony export */ });
function importAll(r) {
  const files = {};
  const filesArr = [];
  r.keys().forEach((item) => {
    files[item.replace('./', '')] = r(item);
    filesArr.push(item.replace('./', ''));
  });

  return { files, filesArr };
}


/***/ }),

/***/ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Black.ttf":
/*!****************************************************************************!*\
  !*** ./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Black.ttf ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ea66a26dd10da9c77f6f.ttf";

/***/ }),

/***/ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Light.ttf":
/*!****************************************************************************!*\
  !*** ./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Light.ttf ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "43aa3135f2d0207e6473.ttf";

/***/ }),

/***/ "./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf":
/*!*****************************************************************************!*\
  !*** ./src/assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ff190f979bb05ae7bee6.ttf";

/***/ }),

/***/ "./src/assets/icons/chance_of_rain.svg":
/*!*********************************************!*\
  !*** ./src/assets/icons/chance_of_rain.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3c09f1ac398aebcd7fd6.svg";

/***/ }),

/***/ "./src/assets/icons/github_mark/github-mark-white.svg":
/*!************************************************************!*\
  !*** ./src/assets/icons/github_mark/github-mark-white.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "040f5ee6b57564bdd2fc.svg";

/***/ }),

/***/ "./src/assets/icons/humidity.svg":
/*!***************************************!*\
  !*** ./src/assets/icons/humidity.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "430446605d4770f2460c.svg";

/***/ }),

/***/ "./src/assets/icons/menu.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/menu.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "64e1fce01c12d98d5fc1.svg";

/***/ }),

/***/ "./src/assets/icons/minmaxtemp.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/minmaxtemp.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1eebcfaa10011b7aba96.svg";

/***/ }),

/***/ "./src/assets/icons/pressure.svg":
/*!***************************************!*\
  !*** ./src/assets/icons/pressure.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2e1b30b45005c000202a.svg";

/***/ }),

/***/ "./src/assets/icons/progress_activity.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/progress_activity.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "283dfecaa1809f0b893d.svg";

/***/ }),

/***/ "./src/assets/icons/sharp_home.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/sharp_home.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e6dd70bffbb6830b86a8.svg";

/***/ }),

/***/ "./src/assets/icons/sunrise.svg":
/*!**************************************!*\
  !*** ./src/assets/icons/sunrise.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2b512da9a2bc1010c684.svg";

/***/ }),

/***/ "./src/assets/icons/sunset.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/sunset.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a854e6d5101f49193d92.svg";

/***/ }),

/***/ "./src/assets/icons/uv.svg":
/*!*********************************!*\
  !*** ./src/assets/icons/uv.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "62dc32b2f1de8de4b8ec.svg";

/***/ }),

/***/ "./src/assets/icons/visibility.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/visibility.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "da8ebca5374b217224a4.svg";

/***/ }),

/***/ "./src/assets/icons/wind.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/wind.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e0789b9795cd0c255c38.svg";

/***/ }),

/***/ "./src/assets/illustrations/undraw_weather_app.svg":
/*!*********************************************************!*\
  !*** ./src/assets/illustrations/undraw_weather_app.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "df67f8fe8109018834af.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/app.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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RUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQnZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLCtGQUErRixNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sVUFBVSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLE9BQU8sTUFBTSxPQUFPLE1BQU0sTUFBTSxTQUFTLE1BQU0sTUFBTSxNQUFNLFlBQVksUUFBUSxNQUFNLFlBQVksUUFBUSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLFVBQVUsS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sVUFBVSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlB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RjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsWUFBWTs7QUFFdkM7QUFDQSxTQUFTLG9DQUFvQyxFQUFFLG1DQUFtQztBQUNsRixTQUFTLHVCQUF1QixJQUFJLDRCQUE0QixFQUFFLGtCQUFrQjtBQUNwRjs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCZTtBQUNmO0FBQ0E7QUFDQSxrRUFBa0UsS0FBSztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFdBQVc7QUFDWCIsInNvdXJjZXMiOlsid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvQGljb25mdS9zdmctaW5qZWN0L2Rpc3Qvc3ZnLWluamVjdC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvY29udGVudC5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvZXJyb3IuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2Zvb3Rlci5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9ob21lLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9sb2FkaW5nLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL2ZvcmVjYXN0LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL2hvdXJseS5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvdGFicy90YWJzLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL3RvZGF5LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9hcHAuY3NzP2E2NzIiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvY29udGVudC5jc3M/M2RiYSIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9lcnJvci5jc3M/MTE0MyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9mb290ZXIuY3NzPzdlOTIiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzcz9lNjhiIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2hvbWUuY3NzPzRiNTEiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvbG9hZGluZy5jc3M/OWMxYiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL2ZvcmVjYXN0LmNzcz8wOGFiIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvaG91cmx5LmNzcz84YjMwIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvdGFicy5jc3M/ZDVkOCIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL3RvZGF5LmNzcz8yZTdkIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2Vycm9yL2Vycm9yLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvaG9tZS9ob21lLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9sb2FkaW5nL2xvYWRpbmcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL21haW4vbWFpbi5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvZm9yZWNhc3QvZm9yZWNhc3QuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL2ZvcmVjYXN0L2ZvcmVjYXN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL2hvdXJseS9ob3VybHkuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL2hvdXJseS9ob3VybHkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFicy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzX25hdmJhci90YWJzX25hdmJhci5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFic19uYXZiYXIvdGFic19uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdG9kYXkvdG9kYXkuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RvZGF5L3RvZGF5LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3VuaXRzeXN0ZW1zLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9hcGlfY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvcHViU3ViLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9jcmVhdGVDb250ZW50Um93cy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2hlbHBlcnMvY3JlYXRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2hlbHBlcnMvZm9ybWF0RGF0ZS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2hlbHBlcnMvZm9ybWF0VGltZS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2hlbHBlcnMvaW1wb3J0QWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU1ZHSW5qZWN0IC0gVmVyc2lvbiAxLjIuM1xuICogQSB0aW55LCBpbnR1aXRpdmUsIHJvYnVzdCwgY2FjaGluZyBzb2x1dGlvbiBmb3IgaW5qZWN0aW5nIFNWRyBmaWxlcyBpbmxpbmUgaW50byB0aGUgRE9NLlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9pY29uZnUvc3ZnLWluamVjdFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxOCBJTkNPUlMsIHRoZSBjcmVhdG9ycyBvZiBpY29uZnUuY29tXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9pY29uZnUvc3ZnLWluamVjdC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgLy8gY29uc3RhbnRzIGZvciBiZXR0ZXIgbWluaWZpY2F0aW9uXG4gIHZhciBfQ1JFQVRFX0VMRU1FTlRfID0gJ2NyZWF0ZUVsZW1lbnQnO1xuICB2YXIgX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV8gPSAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnO1xuICB2YXIgX0xFTkdUSF8gPSAnbGVuZ3RoJztcbiAgdmFyIF9TVFlMRV8gPSAnc3R5bGUnO1xuICB2YXIgX1RJVExFXyA9ICd0aXRsZSc7XG4gIHZhciBfVU5ERUZJTkVEXyA9ICd1bmRlZmluZWQnO1xuICB2YXIgX1NFVF9BVFRSSUJVVEVfID0gJ3NldEF0dHJpYnV0ZSc7XG4gIHZhciBfR0VUX0FUVFJJQlVURV8gPSAnZ2V0QXR0cmlidXRlJztcblxuICB2YXIgTlVMTCA9IG51bGw7XG5cbiAgLy8gY29uc3RhbnRzXG4gIHZhciBfX1NWR0lOSkVDVCA9ICdfX3N2Z0luamVjdCc7XG4gIHZhciBJRF9TVUZGSVggPSAnLS1pbmplY3QtJztcbiAgdmFyIElEX1NVRkZJWF9SRUdFWCA9IG5ldyBSZWdFeHAoSURfU1VGRklYICsgJ1xcXFxkKycsIFwiZ1wiKTtcbiAgdmFyIExPQURfRkFJTCA9ICdMT0FEX0ZBSUwnO1xuICB2YXIgU1ZHX05PVF9TVVBQT1JURUQgPSAnU1ZHX05PVF9TVVBQT1JURUQnO1xuICB2YXIgU1ZHX0lOVkFMSUQgPSAnU1ZHX0lOVkFMSUQnO1xuICB2YXIgQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUyA9IFsnc3JjJywgJ2FsdCcsICdvbmxvYWQnLCAnb25lcnJvciddO1xuICB2YXIgQV9FTEVNRU5UID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oJ2EnKTtcbiAgdmFyIElTX1NWR19TVVBQT1JURUQgPSB0eXBlb2YgU1ZHUmVjdCAhPSBfVU5ERUZJTkVEXztcbiAgdmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB1c2VDYWNoZTogdHJ1ZSxcbiAgICBjb3B5QXR0cmlidXRlczogdHJ1ZSxcbiAgICBtYWtlSWRzVW5pcXVlOiB0cnVlXG4gIH07XG4gIC8vIE1hcCBvZiBJUkkgcmVmZXJlbmNlYWJsZSB0YWcgbmFtZXMgdG8gcHJvcGVydGllcyB0aGF0IGNhbiByZWZlcmVuY2UgdGhlbS4gVGhpcyBpcyBkZWZpbmVkIGluXG4gIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9saW5raW5nLmh0bWwjcHJvY2Vzc2luZ0lSSVxuICB2YXIgSVJJX1RBR19QUk9QRVJUSUVTX01BUCA9IHtcbiAgICBjbGlwUGF0aDogWydjbGlwLXBhdGgnXSxcbiAgICAnY29sb3ItcHJvZmlsZSc6IE5VTEwsXG4gICAgY3Vyc29yOiBOVUxMLFxuICAgIGZpbHRlcjogTlVMTCxcbiAgICBsaW5lYXJHcmFkaWVudDogWydmaWxsJywgJ3N0cm9rZSddLFxuICAgIG1hcmtlcjogWydtYXJrZXInLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCddLFxuICAgIG1hc2s6IE5VTEwsXG4gICAgcGF0dGVybjogWydmaWxsJywgJ3N0cm9rZSddLFxuICAgIHJhZGlhbEdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ11cbiAgfTtcbiAgdmFyIElOSkVDVEVEID0gMTtcbiAgdmFyIEZBSUwgPSAyO1xuXG4gIHZhciB1bmlxdWVJZENvdW50ZXIgPSAxO1xuICB2YXIgeG1sU2VyaWFsaXplcjtcbiAgdmFyIGRvbVBhcnNlcjtcblxuXG4gIC8vIGNyZWF0ZXMgYW4gU1ZHIGRvY3VtZW50IGZyb20gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdTdHJpbmdUb1N2Z0RvYyhzdmdTdHIpIHtcbiAgICBkb21QYXJzZXIgPSBkb21QYXJzZXIgfHwgbmV3IERPTVBhcnNlcigpO1xuICAgIHJldHVybiBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN2Z1N0ciwgJ3RleHQveG1sJyk7XG4gIH1cblxuXG4gIC8vIHNlYXJpYWxpemVzIGFuIFNWRyBlbGVtZW50IHRvIGFuIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW1lbnQpIHtcbiAgICB4bWxTZXJpYWxpemVyID0geG1sU2VyaWFsaXplciB8fCBuZXcgWE1MU2VyaWFsaXplcigpO1xuICAgIHJldHVybiB4bWxTZXJpYWxpemVyLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Z0VsZW1lbnQpO1xuICB9XG5cblxuICAvLyBSZXR1cm5zIHRoZSBhYnNvbHV0ZSB1cmwgZm9yIHRoZSBzcGVjaWZpZWQgdXJsXG4gIGZ1bmN0aW9uIGdldEFic29sdXRlVXJsKHVybCkge1xuICAgIEFfRUxFTUVOVC5ocmVmID0gdXJsO1xuICAgIHJldHVybiBBX0VMRU1FTlQuaHJlZjtcbiAgfVxuXG5cbiAgLy8gTG9hZCBzdmcgd2l0aCBhbiBYSFIgcmVxdWVzdFxuICBmdW5jdGlvbiBsb2FkU3ZnKHVybCwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICBpZiAodXJsKSB7XG4gICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgLy8gcmVhZHlTdGF0ZSBpcyBET05FXG4gICAgICAgICAgdmFyIHN0YXR1cyA9IHJlcS5zdGF0dXM7XG4gICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIC8vIHJlcXVlc3Qgc3RhdHVzIGlzIE9LXG4gICAgICAgICAgICBjYWxsYmFjayhyZXEucmVzcG9uc2VYTUwsIHJlcS5yZXNwb25zZVRleHQudHJpbSgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAgIC8vIHJlcXVlc3Qgc3RhdHVzIGlzIGVycm9yICg0eHggb3IgNXh4KVxuICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIC8vIHJlcXVlc3Qgc3RhdHVzIDAgY2FuIGluZGljYXRlIGEgZmFpbGVkIGNyb3NzLWRvbWFpbiBjYWxsXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICByZXEuc2VuZCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gQ29weSBhdHRyaWJ1dGVzIGZyb20gaW1nIGVsZW1lbnQgdG8gc3ZnIGVsZW1lbnRcbiAgZnVuY3Rpb24gY29weUF0dHJpYnV0ZXMoaW1nRWxlbSwgc3ZnRWxlbSkge1xuICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgdmFyIGF0dHJpYnV0ZU5hbWU7XG4gICAgdmFyIGF0dHJpYnV0ZVZhbHVlO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW1nRWxlbS5hdHRyaWJ1dGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcbiAgICAgIC8vIE9ubHkgY29weSBhdHRyaWJ1dGVzIG5vdCBleHBsaWNpdGx5IGV4Y2x1ZGVkIGZyb20gY29weWluZ1xuICAgICAgaWYgKEFUVFJJQlVURV9FWENMVVNJT05fTkFNRVMuaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSA9PSAtMSkge1xuICAgICAgICBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgLy8gSWYgaW1nIGF0dHJpYnV0ZSBpcyBcInRpdGxlXCIsIGluc2VydCBhIHRpdGxlIGVsZW1lbnQgaW50byBTVkcgZWxlbWVudFxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PSBfVElUTEVfKSB7XG4gICAgICAgICAgdmFyIHRpdGxlRWxlbTtcbiAgICAgICAgICB2YXIgZmlyc3RFbGVtZW50Q2hpbGQgPSBzdmdFbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRDaGlsZCAmJiBmaXJzdEVsZW1lbnRDaGlsZC5sb2NhbE5hbWUudG9Mb3dlckNhc2UoKSA9PSBfVElUTEVfKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgU1ZHIGVsZW1lbnQncyBmaXJzdCBjaGlsZCBpcyBhIHRpdGxlIGVsZW1lbnQsIGtlZXAgaXQgYXMgdGhlIHRpdGxlIGVsZW1lbnRcbiAgICAgICAgICAgIHRpdGxlRWxlbSA9IGZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgU1ZHIGVsZW1lbnQncyBmaXJzdCBjaGlsZCBlbGVtZW50IGlzIG5vdCBhIHRpdGxlIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyB0aXRsZVxuICAgICAgICAgICAgLy8gZWxlLGVtdCBhbmQgc2V0IGl0IGFzIHRoZSBmaXJzdCBjaGlsZFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UXyArICdOUyddKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIF9USVRMRV8pO1xuICAgICAgICAgICAgc3ZnRWxlbS5pbnNlcnRCZWZvcmUodGl0bGVFbGVtLCBmaXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNldCBuZXcgdGl0bGUgY29udGVudFxuICAgICAgICAgIHRpdGxlRWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZVZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNldCBpbWcgYXR0cmlidXRlIHRvIHN2ZyBlbGVtZW50XG4gICAgICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBhcHBlbmRzIGEgc3VmZml4IHRvIElEcyBvZiByZWZlcmVuY2VkIGVsZW1lbnRzIGluIHRoZSA8ZGVmcz4gaW4gb3JkZXIgdG8gIHRvIGF2b2lkIElEIGNvbGxpc2lvblxuICAvLyBiZXR3ZWVuIG11bHRpcGxlIGluamVjdGVkIFNWR3MuIFRoZSBzdWZmaXggaGFzIHRoZSBmb3JtIFwiLS1pbmplY3QtWFwiLCB3aGVyZSBYIGlzIGEgcnVubmluZyBudW1iZXIgd2hpY2ggaXNcbiAgLy8gaW5jcmVtZW50ZWQgd2l0aCBlYWNoIGluamVjdGlvbi4gUmVmZXJlbmNlcyB0byB0aGUgSURzIGFyZSBhZGp1c3RlZCBhY2NvcmRpbmdseS5cbiAgLy8gV2UgYXNzdW1lIHRoYSBhbGwgSURzIHdpdGhpbiB0aGUgaW5qZWN0ZWQgU1ZHIGFyZSB1bmlxdWUsIHRoZXJlZm9yZSB0aGUgc2FtZSBzdWZmaXggY2FuIGJlIHVzZWQgZm9yIGFsbCBJRHMgb2Ygb25lXG4gIC8vIGluamVjdGVkIFNWRy5cbiAgLy8gSWYgdGhlIG9ubHlSZWZlcmVuY2VkIGFyZ3VtZW50IGlzIHNldCB0byB0cnVlLCBvbmx5IHRob3NlIElEcyB3aWxsIGJlIG1hZGUgdW5pcXVlIHRoYXQgYXJlIHJlZmVyZW5jZWQgZnJvbSB3aXRoaW4gdGhlIFNWR1xuICBmdW5jdGlvbiBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIG9ubHlSZWZlcmVuY2VkKSB7XG4gICAgdmFyIGlkU3VmZml4ID0gSURfU1VGRklYICsgdW5pcXVlSWRDb3VudGVyKys7XG4gICAgLy8gUmVndWxhciBleHByZXNzaW9uIGZvciBmdW5jdGlvbmFsIG5vdGF0aW9ucyBvZiBhbiBJUkkgcmVmZXJlbmNlcy4gVGhpcyB3aWxsIGZpbmQgb2NjdXJlbmNlcyBpbiB0aGUgZm9ybVxuICAgIC8vIHVybCgjYW55SWQpIG9yIHVybChcIiNhbnlJZFwiKSAoZm9yIEludGVybmV0IEV4cGxvcmVyKSBhbmQgY2FwdHVyZSB0aGUgcmVmZXJlbmNlZCBJRFxuICAgIHZhciBmdW5jSXJpUmVnZXggPSAvdXJsXFwoXCI/IyhbYS16QS1aXVtcXHc6Li1dKilcIj9cXCkvZztcbiAgICAvLyBHZXQgYWxsIGVsZW1lbnRzIHdpdGggYW4gSUQuIFRoZSBTVkcgc3BlYyByZWNvbW1lbmRzIHRvIHB1dCByZWZlcmVuY2VkIGVsZW1lbnRzIGluc2lkZSA8ZGVmcz4gZWxlbWVudHMsIGJ1dFxuICAgIC8vIHRoaXMgaXMgbm90IGEgcmVxdWlyZW1lbnQsIHRoZXJlZm9yZSB3ZSBoYXZlIHRvIHNlYXJjaCBmb3IgSURzIGluIHRoZSB3aG9sZSBTVkcuXG4gICAgdmFyIGlkRWxlbWVudHMgPSBzdmdFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF0nKTtcbiAgICB2YXIgaWRFbGVtO1xuICAgIC8vIEFuIG9iamVjdCBjb250YWluaW5nIHJlZmVyZW5jZWQgSURzICBhcyBrZXlzIGlzIHVzZWQgaWYgb25seSByZWZlcmVuY2VkIElEcyBzaG91bGQgYmUgdW5pcXVpZmllZC5cbiAgICAvLyBJZiB0aGlzIG9iamVjdCBkb2VzIG5vdCBleGlzdCwgYWxsIElEcyB3aWxsIGJlIHVuaXF1aWZpZWQuXG4gICAgdmFyIHJlZmVyZW5jZWRJZHMgPSBvbmx5UmVmZXJlbmNlZCA/IFtdIDogTlVMTDtcbiAgICB2YXIgdGFnTmFtZTtcbiAgICB2YXIgaXJpVGFnTmFtZXMgPSB7fTtcbiAgICB2YXIgaXJpUHJvcGVydGllcyA9IFtdO1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIGksIGo7XG5cbiAgICBpZiAoaWRFbGVtZW50c1tfTEVOR1RIX10pIHtcbiAgICAgIC8vIE1ha2UgYWxsIElEcyB1bmlxdWUgYnkgYWRkaW5nIHRoZSBJRCBzdWZmaXggYW5kIGNvbGxlY3QgYWxsIGVuY291bnRlcmVkIHRhZyBuYW1lc1xuICAgICAgLy8gdGhhdCBhcmUgSVJJIHJlZmVyZW5jZWFibGUgZnJvbSBwcm9wZXJpdGllcy5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpZEVsZW1lbnRzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICAgIHRhZ05hbWUgPSBpZEVsZW1lbnRzW2ldLmxvY2FsTmFtZTsgLy8gVXNlIG5vbi1uYW1lc3BhY2VkIHRhZyBuYW1lXG4gICAgICAgIC8vIE1ha2UgSUQgdW5pcXVlIGlmIHRhZyBuYW1lIGlzIElSSSByZWZlcmVuY2VhYmxlXG4gICAgICAgIGlmICh0YWdOYW1lIGluIElSSV9UQUdfUFJPUEVSVElFU19NQVApIHtcbiAgICAgICAgICBpcmlUYWdOYW1lc1t0YWdOYW1lXSA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEdldCBhbGwgcHJvcGVydGllcyB0aGF0IGFyZSBtYXBwZWQgdG8gdGhlIGZvdW5kIElSSSByZWZlcmVuY2VhYmxlIHRhZ3NcbiAgICAgIGZvciAodGFnTmFtZSBpbiBpcmlUYWdOYW1lcykge1xuICAgICAgICAoSVJJX1RBR19QUk9QRVJUSUVTX01BUFt0YWdOYW1lXSB8fCBbdGFnTmFtZV0pLmZvckVhY2goZnVuY3Rpb24gKG1hcHBlZFByb3BlcnR5KSB7XG4gICAgICAgICAgLy8gQWRkIG1hcHBlZCBwcm9wZXJ0aWVzIHRvIGFycmF5IG9mIGlyaSByZWZlcmVuY2luZyBwcm9wZXJ0aWVzLlxuICAgICAgICAgIC8vIFVzZSBsaW5lYXIgc2VhcmNoIGhlcmUgYmVjYXVzZSB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIGVudHJpZXMgaXMgdmVyeSBzbWFsbCAobWF4aW11bSAxMSlcbiAgICAgICAgICBpZiAoaXJpUHJvcGVydGllcy5pbmRleE9mKG1hcHBlZFByb3BlcnR5KSA8IDApIHtcbiAgICAgICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChtYXBwZWRQcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXSkge1xuICAgICAgICAvLyBBZGQgXCJzdHlsZVwiIHRvIHByb3BlcnRpZXMsIGJlY2F1c2UgaXQgbWF5IGNvbnRhaW4gcmVmZXJlbmNlcyBpbiB0aGUgZm9ybSAnc3R5bGU9XCJmaWxsOnVybCgjbXlGaWxsKVwiJ1xuICAgICAgICBpcmlQcm9wZXJ0aWVzLnB1c2goX1NUWUxFXyk7XG4gICAgICB9XG4gICAgICAvLyBSdW4gdGhyb3VnaCBhbGwgZWxlbWVudHMgb2YgdGhlIFNWRyBhbmQgcmVwbGFjZSBJRHMgaW4gcmVmZXJlbmNlcy5cbiAgICAgIC8vIFRvIGdldCBhbGwgZGVzY2VuZGluZyBlbGVtZW50cywgZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSBzZWVtcyB0byBwZXJmb3JtIGZhc3RlciB0aGFuIHF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5cbiAgICAgIC8vIFNpbmNlIHN2Z0VsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSBkb2VzIG5vdCByZXR1cm4gdGhlIHN2ZyBlbGVtZW50IGl0c2VsZiwgd2UgaGF2ZSB0byBoYW5kbGUgaXQgc2VwYXJhdGVseS5cbiAgICAgIHZhciBkZXNjRWxlbWVudHMgPSBzdmdFbGVtW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgnKicpO1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdmdFbGVtO1xuICAgICAgdmFyIHByb3BlcnR5TmFtZTtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBuZXdWYWx1ZTtcbiAgICAgIGZvciAoaSA9IC0xOyBlbGVtZW50ICE9IE5VTEw7KSB7XG4gICAgICAgIGlmIChlbGVtZW50LmxvY2FsTmFtZSA9PSBfU1RZTEVfKSB7XG4gICAgICAgICAgLy8gSWYgZWxlbWVudCBpcyBhIHN0eWxlIGVsZW1lbnQsIHJlcGxhY2UgSURzIGluIGFsbCBvY2N1cmVuY2VzIG9mIFwidXJsKCNhbnlJZClcIiBpbiB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICB2YWx1ZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKGZ1bmNJcmlSZWdleCwgZnVuY3Rpb24obWF0Y2gsIGlkKSB7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICByZWZlcmVuY2VkSWRzW2lkXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ3VybCgjJyArIGlkICsgaWRTdWZmaXggKyAnKSc7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBwcm9wZXJ0eSBuYW1lcyBmb3Igd2hpY2ggSURzIHdlcmUgZm91bmRcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgaXJpUHJvcGVydGllc1tfTEVOR1RIX107IGorKykge1xuICAgICAgICAgICAgcHJvcGVydHlOYW1lID0gaXJpUHJvcGVydGllc1tqXTtcbiAgICAgICAgICAgIHZhbHVlID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWRJZHMpIHtcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VkSWRzW2lkXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjJyArIGlkICsgaWRTdWZmaXggKyAnKSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHByb3BlcnR5TmFtZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZXBsYWNlIElEcyBpbiB4bGluazpyZWYgYW5kIGhyZWYgYXR0cmlidXRlc1xuICAgICAgICAgIFsneGxpbms6aHJlZicsICdocmVmJ10uZm9yRWFjaChmdW5jdGlvbihyZWZBdHRyTmFtZSkge1xuICAgICAgICAgICAgdmFyIGlyaSA9IGVsZW1lbnRbX0dFVF9BVFRSSUJVVEVfXShyZWZBdHRyTmFtZSk7XG4gICAgICAgICAgICBpZiAoL15cXHMqIy8udGVzdChpcmkpKSB7IC8vIENoZWNrIGlmIGlyaSBpcyBub24tbnVsbCBhbmQgaW50ZXJuYWwgcmVmZXJlbmNlXG4gICAgICAgICAgICAgIGlyaSA9IGlyaS50cmltKCk7XG4gICAgICAgICAgICAgIGVsZW1lbnRbX1NFVF9BVFRSSUJVVEVfXShyZWZBdHRyTmFtZSwgaXJpICsgaWRTdWZmaXgpO1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBJRCB0byByZWZlcmVuY2VkIElEc1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaXJpLnN1YnN0cmluZygxKV0gPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGRlc2NFbGVtZW50c1srK2ldO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgaWRFbGVtID0gaWRFbGVtZW50c1tpXTtcbiAgICAgICAgLy8gSWYgc2V0IG9mIHJlZmVyZW5jZWQgSURzIGV4aXN0cywgbWFrZSBvbmx5IHJlZmVyZW5jZWQgSURzIHVuaXF1ZSxcbiAgICAgICAgLy8gb3RoZXJ3aXNlIG1ha2UgYWxsIElEcyB1bmlxdWUuXG4gICAgICAgIGlmICghcmVmZXJlbmNlZElkcyB8fCByZWZlcmVuY2VkSWRzW2lkRWxlbS5pZF0pIHtcbiAgICAgICAgICAvLyBBZGQgc3VmZml4IHRvIGVsZW1lbnQncyBJRFxuICAgICAgICAgIGlkRWxlbS5pZCArPSBpZFN1ZmZpeDtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gdHJ1ZSBpZiBTVkcgZWxlbWVudCBoYXMgY2hhbmdlZFxuICAgIHJldHVybiBjaGFuZ2VkO1xuICB9XG5cblxuICAvLyBGb3IgY2FjaGVkIFNWR3MgdGhlIElEcyBhcmUgbWFkZSB1bmlxdWUgYnkgc2ltcGx5IHJlcGxhY2luZyB0aGUgYWxyZWFkeSBpbnNlcnRlZCB1bmlxdWUgSURzIHdpdGggYVxuICAvLyBoaWdoZXIgSUQgY291bnRlci4gVGhpcyBpcyBtdWNoIG1vcmUgcGVyZm9ybWFudCB0aGFuIGEgY2FsbCB0byBtYWtlSWRzVW5pcXVlKCkuXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWVDYWNoZWQoc3ZnU3RyaW5nKSB7XG4gICAgcmV0dXJuIHN2Z1N0cmluZy5yZXBsYWNlKElEX1NVRkZJWF9SRUdFWCwgSURfU1VGRklYICsgdW5pcXVlSWRDb3VudGVyKyspO1xuICB9XG5cblxuICAvLyBJbmplY3QgU1ZHIGJ5IHJlcGxhY2luZyB0aGUgaW1nIGVsZW1lbnQgd2l0aCB0aGUgU1ZHIGVsZW1lbnQgaW4gdGhlIERPTVxuICBmdW5jdGlvbiBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKSB7XG4gICAgaWYgKHN2Z0VsZW0pIHtcbiAgICAgIHN2Z0VsZW1bX1NFVF9BVFRSSUJVVEVfXSgnZGF0YS1pbmplY3QtdXJsJywgYWJzVXJsKTtcbiAgICAgIHZhciBwYXJlbnROb2RlID0gaW1nRWxlbS5wYXJlbnROb2RlO1xuICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29weUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbnZva2UgYmVmb3JlSW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBiZWZvcmVJbmplY3QgPSBvcHRpb25zLmJlZm9yZUluamVjdDtcbiAgICAgICAgdmFyIGluamVjdEVsZW0gPSAoYmVmb3JlSW5qZWN0ICYmIGJlZm9yZUluamVjdChpbWdFbGVtLCBzdmdFbGVtKSkgfHwgc3ZnRWxlbTtcbiAgICAgICAgLy8gUmVwbGFjZSBpbWcgZWxlbWVudCB3aXRoIG5ldyBlbGVtZW50LiBUaGlzIGlzIHRoZSBhY3R1YWwgaW5qZWN0aW9uLlxuICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChpbmplY3RFbGVtLCBpbWdFbGVtKTtcbiAgICAgICAgLy8gTWFyayBpbWcgZWxlbWVudCBhcyBpbmplY3RlZFxuICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IElOSkVDVEVEO1xuICAgICAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgICAgIC8vIEludm9rZSBhZnRlckluamVjdCBob29rIGlmIHNldFxuICAgICAgICB2YXIgYWZ0ZXJJbmplY3QgPSBvcHRpb25zLmFmdGVySW5qZWN0O1xuICAgICAgICBpZiAoYWZ0ZXJJbmplY3QpIHtcbiAgICAgICAgICBhZnRlckluamVjdChpbWdFbGVtLCBpbmplY3RFbGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gTWVyZ2VzIGFueSBudW1iZXIgb2Ygb3B0aW9ucyBvYmplY3RzIGludG8gYSBuZXcgb2JqZWN0XG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucygpIHtcbiAgICB2YXIgbWVyZ2VkT3B0aW9ucyA9IHt9O1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgc3BlY2lmaWVkIG9wdGlvbnMgb2JqZWN0cyBhbmQgYWRkIGFsbCBwcm9wZXJ0aWVzIHRvIHRoZSBuZXcgb3B0aW9ucyBvYmplY3RcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3NbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3NbaV07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudCkge1xuICAgICAgICAgIGlmIChhcmd1bWVudC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBtZXJnZWRPcHRpb25zW2tleV0gPSBhcmd1bWVudFtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIHJldHVybiBtZXJnZWRPcHRpb25zO1xuICB9XG5cblxuICAvLyBBZGRzIHRoZSBzcGVjaWZpZWQgQ1NTIHRvIHRoZSBkb2N1bWVudCdzIDxoZWFkPiBlbGVtZW50XG4gIGZ1bmN0aW9uIGFkZFN0eWxlVG9IZWFkKGNzcykge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnRbX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCdoZWFkJylbMF07XG4gICAgaWYgKGhlYWQpIHtcbiAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50W19DUkVBVEVfRUxFTUVOVF9dKF9TVFlMRV8pO1xuICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gQnVpbGRzIGFuIFNWRyBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIGJ1aWxkU3ZnRWxlbWVudChzdmdTdHIsIHZlcmlmeSkge1xuICAgIGlmICh2ZXJpZnkpIHtcbiAgICAgIHZhciBzdmdEb2M7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBQYXJzZSB0aGUgU1ZHIHN0cmluZyB3aXRoIERPTVBhcnNlclxuICAgICAgICBzdmdEb2MgPSBzdmdTdHJpbmdUb1N2Z0RvYyhzdmdTdHIpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgICAgfVxuICAgICAgaWYgKHN2Z0RvY1tfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ3BhcnNlcmVycm9yJylbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIERPTVBhcnNlciBkb2VzIG5vdCB0aHJvdyBhbiBleGNlcHRpb24sIGJ1dCBpbnN0ZWFkIHB1dHMgcGFyc2VyZXJyb3IgdGFncyBpbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3ZnRG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IHN2Z1N0cjtcbiAgICAgIHJldHVybiBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSkge1xuICAgIC8vIFJlbW92ZSB0aGUgb25sb2FkIGF0dHJpYnV0ZS4gU2hvdWxkIG9ubHkgYmUgdXNlZCB0byByZW1vdmUgdGhlIHVuc3R5bGVkIGltYWdlIGZsYXNoIHByb3RlY3Rpb24gYW5kXG4gICAgLy8gbWFrZSB0aGUgZWxlbWVudCB2aXNpYmxlLCBub3QgZm9yIHJlbW92aW5nIHRoZSBldmVudCBsaXN0ZW5lci5cbiAgICBpbWdFbGVtLnJlbW92ZUF0dHJpYnV0ZSgnb25sb2FkJyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGVycm9yTWVzc2FnZShtc2cpIHtcbiAgICBjb25zb2xlLmVycm9yKCdTVkdJbmplY3Q6ICcgKyBtc2cpO1xuICB9XG5cblxuICBmdW5jdGlvbiBmYWlsKGltZ0VsZW0sIHN0YXR1cywgb3B0aW9ucykge1xuICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gRkFJTDtcbiAgICBpZiAob3B0aW9ucy5vbkZhaWwpIHtcbiAgICAgIG9wdGlvbnMub25GYWlsKGltZ0VsZW0sIHN0YXR1cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yTWVzc2FnZShzdGF0dXMpO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX0lOVkFMSUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBzdmdOb3RTdXBwb3J0ZWQoaW1nRWxlbSwgb3B0aW9ucykge1xuICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICBmYWlsKGltZ0VsZW0sIFNWR19OT1RfU1VQUE9SVEVELCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucykge1xuICAgIGZhaWwoaW1nRWxlbSwgTE9BRF9GQUlMLCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSkge1xuICAgIGltZ0VsZW0ub25sb2FkID0gTlVMTDtcbiAgICBpbWdFbGVtLm9uZXJyb3IgPSBOVUxMO1xuICB9XG5cblxuICBmdW5jdGlvbiBpbWdOb3RTZXQobXNnKSB7XG4gICAgZXJyb3JNZXNzYWdlKCdubyBpbWcgZWxlbWVudCcpO1xuICB9XG5cblxuICBmdW5jdGlvbiBjcmVhdGVTVkdJbmplY3QoZ2xvYmFsTmFtZSwgb3B0aW9ucykge1xuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xuICAgIHZhciBzdmdMb2FkQ2FjaGUgPSB7fTtcblxuICAgIGlmIChJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAvLyBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBTVkcsIGFkZCBhIHNtYWxsIHN0eWxlc2hlZXQgdGhhdCBoaWRlcyB0aGUgPGltZz4gZWxlbWVudHMgdW50aWxcbiAgICAgIC8vIGluamVjdGlvbiBpcyBmaW5pc2hlZC4gVGhpcyBhdm9pZHMgc2hvd2luZyB0aGUgdW5zdHlsZWQgU1ZHcyBiZWZvcmUgc3R5bGUgaXMgYXBwbGllZC5cbiAgICAgIGFkZFN0eWxlVG9IZWFkKCdpbWdbb25sb2FkXj1cIicgKyBnbG9iYWxOYW1lICsgJyhcIl17dmlzaWJpbGl0eTpoaWRkZW47fScpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU1ZHSW5qZWN0XG4gICAgICpcbiAgICAgKiBJbmplY3RzIHRoZSBTVkcgc3BlY2lmaWVkIGluIHRoZSBgc3JjYCBhdHRyaWJ1dGUgb2YgdGhlIHNwZWNpZmllZCBgaW1nYCBlbGVtZW50IG9yIGFycmF5IG9mIGBpbWdgXG4gICAgICogZWxlbWVudHMuIFJldHVybnMgYSBQcm9taXNlIG9iamVjdCB3aGljaCByZXNvbHZlcyBpZiBhbGwgcGFzc2VkIGluIGBpbWdgIGVsZW1lbnRzIGhhdmUgZWl0aGVyIGJlZW5cbiAgICAgKiBpbmplY3RlZCBvciBmYWlsZWQgdG8gaW5qZWN0IChPbmx5IGlmIGEgZ2xvYmFsIFByb21pc2Ugb2JqZWN0IGlzIGF2YWlsYWJsZSBsaWtlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgKiBvciB0aHJvdWdoIGEgcG9seWZpbGwpLlxuICAgICAqXG4gICAgICogT3B0aW9uczpcbiAgICAgKiB1c2VDYWNoZTogSWYgc2V0IHRvIGB0cnVlYCB0aGUgU1ZHIHdpbGwgYmUgY2FjaGVkIHVzaW5nIHRoZSBhYnNvbHV0ZSBVUkwuIERlZmF1bHQgdmFsdWUgaXMgYHRydWVgLlxuICAgICAqIGNvcHlBdHRyaWJ1dGVzOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBhdHRyaWJ1dGVzIHdpbGwgYmUgY29waWVkIGZyb20gYGltZ2AgdG8gYHN2Z2AuIERmYXVsdCB2YWx1ZVxuICAgICAqICAgICBpcyBgdHJ1ZWAuXG4gICAgICogbWFrZUlkc1VuaXF1ZTogSWYgc2V0IHRvIGB0cnVlYCB0aGUgSUQgb2YgZWxlbWVudHMgaW4gdGhlIGA8ZGVmcz5gIGVsZW1lbnQgdGhhdCBjYW4gYmUgcmVmZXJlbmNlcyBieVxuICAgICAqICAgICBwcm9wZXJ0eSB2YWx1ZXMgKGZvciBleGFtcGxlICdjbGlwUGF0aCcpIGFyZSBtYWRlIHVuaXF1ZSBieSBhcHBlbmRpbmcgXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYVxuICAgICAqICAgICBydW5uaW5nIG51bWJlciB3aGljaCBpbmNyZWFzZXMgd2l0aCBlYWNoIGluamVjdGlvbi4gVGhpcyBpcyBkb25lIHRvIGF2b2lkIGR1cGxpY2F0ZSBJRHMgaW4gdGhlIERPTS5cbiAgICAgKiBiZWZvcmVMb2FkOiBIb29rIGJlZm9yZSBTVkcgaXMgbG9hZGVkLiBUaGUgYGltZ2AgZWxlbWVudCBpcyBwYXNzZWQgYXMgYSBwYXJhbWV0ZXIuIElmIHRoZSBob29rIHJldHVybnNcbiAgICAgKiAgICAgYSBzdHJpbmcgaXQgaXMgdXNlZCBhcyB0aGUgVVJMIGluc3RlYWQgb2YgdGhlIGBpbWdgIGVsZW1lbnQncyBgc3JjYCBhdHRyaWJ1dGUuXG4gICAgICogYWZ0ZXJMb2FkOiBIb29rIGFmdGVyIFNWRyBpcyBsb2FkZWQuIFRoZSBsb2FkZWQgYHN2Z2AgZWxlbWVudCBhbmQgYHN2Z2Agc3RyaW5nIGFyZSBwYXNzZWQgYXMgYVxuICAgICAqICAgICBwYXJhbWV0ZXJzLiBJZiBjYWNoaW5nIGlzIGFjdGl2ZSB0aGlzIGhvb2sgd2lsbCBvbmx5IGdldCBjYWxsZWQgb25jZSBmb3IgaW5qZWN0ZWQgU1ZHcyB3aXRoIHRoZVxuICAgICAqICAgICBzYW1lIGFic29sdXRlIHBhdGguIENoYW5nZXMgdG8gdGhlIGBzdmdgIGVsZW1lbnQgaW4gdGhpcyBob29rIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgaW5qZWN0ZWQgU1ZHc1xuICAgICAqICAgICB3aXRoIHRoZSBzYW1lIGFic29sdXRlIHBhdGguIEl0J3MgYWxzbyBwb3NzaWJsZSB0byByZXR1cm4gYW4gYHN2Z2Agc3RyaW5nIG9yIGBzdmdgIGVsZW1lbnQgd2hpY2hcbiAgICAgKiAgICAgd2lsbCB0aGVuIGJlIHVzZWQgZm9yIHRoZSBpbmplY3Rpb24uXG4gICAgICogYmVmb3JlSW5qZWN0OiBIb29rIGJlZm9yZSBTVkcgaXMgaW5qZWN0ZWQuIFRoZSBgaW1nYCBhbmQgYHN2Z2AgZWxlbWVudHMgYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzLiBJZlxuICAgICAqICAgICBhbnkgaHRtbCBlbGVtZW50IGlzIHJldHVybmVkIGl0IGdldHMgaW5qZWN0ZWQgaW5zdGVhZCBvZiBhcHBseWluZyB0aGUgZGVmYXVsdCBTVkcgaW5qZWN0aW9uLlxuICAgICAqIGFmdGVySW5qZWN0OiBIb29rIGFmdGVyIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuXG4gICAgICogb25BbGxGaW5pc2g6IEhvb2sgYWZ0ZXIgYWxsIGBpbWdgIGVsZW1lbnRzIHBhc3NlZCB0byBhbiBTVkdJbmplY3QoKSBjYWxsIGhhdmUgZWl0aGVyIGJlZW4gaW5qZWN0ZWQgb3JcbiAgICAgKiAgICAgZmFpbGVkIHRvIGluamVjdC5cbiAgICAgKiBvbkZhaWw6IEhvb2sgYWZ0ZXIgaW5qZWN0aW9uIGZhaWxzLiBUaGUgYGltZ2AgZWxlbWVudCBhbmQgYSBgc3RhdHVzYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhbiBwYXJhbWV0ZXIuXG4gICAgICogICAgIFRoZSBgc3RhdHVzYCBjYW4gYmUgZWl0aGVyIGAnU1ZHX05PVF9TVVBQT1JURUQnYCAodGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBTVkcpLFxuICAgICAqICAgICBgJ1NWR19JTlZBTElEJ2AgKHRoZSBTVkcgaXMgbm90IGluIGEgdmFsaWQgZm9ybWF0KSBvciBgJ0xPQURfRkFJTEVEJ2AgKGxvYWRpbmcgb2YgdGhlIFNWRyBmYWlsZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudCBvciBhbiBhcnJheSBvZiBpbWcgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIHdpdGggW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgdGhpcyBpbmplY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gU1ZHSW5qZWN0KGltZywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBydW4gPSBmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIHZhciBhbGxGaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgb25BbGxGaW5pc2ggPSBvcHRpb25zLm9uQWxsRmluaXNoO1xuICAgICAgICAgIGlmIChvbkFsbEZpbmlzaCkge1xuICAgICAgICAgICAgb25BbGxGaW5pc2goKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSAmJiByZXNvbHZlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGltZyAmJiB0eXBlb2YgaW1nW19MRU5HVEhfXSAhPSBfVU5ERUZJTkVEXykge1xuICAgICAgICAgIC8vIGFuIGFycmF5IGxpa2Ugc3RydWN0dXJlIG9mIGltZyBlbGVtZW50c1xuICAgICAgICAgIHZhciBpbmplY3RJbmRleCA9IDA7XG4gICAgICAgICAgdmFyIGluamVjdENvdW50ID0gaW1nW19MRU5HVEhfXTtcblxuICAgICAgICAgIGlmIChpbmplY3RDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICBhbGxGaW5pc2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoKytpbmplY3RJbmRleCA9PSBpbmplY3RDb3VudCkge1xuICAgICAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluamVjdENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgU1ZHSW5qZWN0RWxlbWVudChpbWdbaV0sIG9wdGlvbnMsIGZpbmlzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG9ubHkgb25lIGltZyBlbGVtZW50XG4gICAgICAgICAgU1ZHSW5qZWN0RWxlbWVudChpbWcsIG9wdGlvbnMsIGFsbEZpbmlzaCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHJldHVybiBhIFByb21pc2Ugb2JqZWN0IGlmIGdsb2JhbGx5IGF2YWlsYWJsZVxuICAgICAgcmV0dXJuIHR5cGVvZiBQcm9taXNlID09IF9VTkRFRklORURfID8gcnVuKCkgOiBuZXcgUHJvbWlzZShydW4pO1xuICAgIH1cblxuXG4gICAgLy8gSW5qZWN0cyBhIHNpbmdsZSBzdmcgZWxlbWVudC4gT3B0aW9ucyBtdXN0IGJlIGFscmVhZHkgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9ucy5cbiAgICBmdW5jdGlvbiBTVkdJbmplY3RFbGVtZW50KGltZ0VsZW0sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoaW1nRWxlbSkge1xuICAgICAgICB2YXIgc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUgPSBpbWdFbGVtW19fU1ZHSU5KRUNUXTtcbiAgICAgICAgaWYgKCFzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGltZ0VsZW0pO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJbnZva2UgYmVmb3JlTG9hZCBob29rIGlmIHNldC4gSWYgdGhlIGJlZm9yZUxvYWQgcmV0dXJucyBhIHZhbHVlIHVzZSBpdCBhcyB0aGUgc3JjIGZvciB0aGUgbG9hZFxuICAgICAgICAgIC8vIFVSTCBwYXRoLiBFbHNlIHVzZSB0aGUgaW1nRWxlbSdzIHNyYyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAgdmFyIGJlZm9yZUxvYWQgPSBvcHRpb25zLmJlZm9yZUxvYWQ7XG4gICAgICAgICAgdmFyIHNyYyA9IChiZWZvcmVMb2FkICYmIGJlZm9yZUxvYWQoaW1nRWxlbSkpIHx8IGltZ0VsZW1bX0dFVF9BVFRSSUJVVEVfXSgnc3JjJyk7XG5cbiAgICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgICAgLy8gSWYgbm8gaW1hZ2Ugc3JjIGF0dHJpYnV0ZSBpcyBzZXQgZG8gbm8gaW5qZWN0aW9uLiBUaGlzIGNhbiBvbmx5IGJlIHJlYWNoZWQgYnkgdXNpbmcgamF2YXNjcmlwdFxuICAgICAgICAgICAgLy8gYmVjYXVzZSBpZiBubyBzcmMgYXR0cmlidXRlIGlzIHNldCB0aGUgb25sb2FkIGFuZCBvbmVycm9yIGV2ZW50cyBkbyBub3QgZ2V0IGNhbGxlZFxuICAgICAgICAgICAgaWYgKHNyYyA9PT0gJycpIHtcbiAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCBhcnJheSBzbyBsYXRlciBjYWxscyBjYW4gcmVnaXN0ZXIgY2FsbGJhY2tzXG4gICAgICAgICAgdmFyIG9uRmluaXNoQ2FsbGJhY2tzID0gW107XG4gICAgICAgICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBvbkZpbmlzaENhbGxiYWNrcztcblxuICAgICAgICAgIHZhciBvbkZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24ob25GaW5pc2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICBvbkZpbmlzaENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGFic1VybCA9IGdldEFic29sdXRlVXJsKHNyYyk7XG4gICAgICAgICAgdmFyIHVzZUNhY2hlT3B0aW9uID0gb3B0aW9ucy51c2VDYWNoZTtcbiAgICAgICAgICB2YXIgbWFrZUlkc1VuaXF1ZU9wdGlvbiA9IG9wdGlvbnMubWFrZUlkc1VuaXF1ZTtcbiAgICAgICAgICBcbiAgICAgICAgICB2YXIgc2V0U3ZnTG9hZENhY2hlVmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXS5mb3JFYWNoKGZ1bmN0aW9uKHN2Z0xvYWQpIHtcbiAgICAgICAgICAgICAgICBzdmdMb2FkKHZhbCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgc3ZnTG9hZCA9IHN2Z0xvYWRDYWNoZVthYnNVcmxdO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlTG9hZFZhbHVlID0gZnVuY3Rpb24obG9hZFZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChsb2FkVmFsdWUgPT09IExPQURfRkFJTCkge1xuICAgICAgICAgICAgICAgIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvYWRWYWx1ZSA9PT0gU1ZHX0lOVkFMSUQpIHtcbiAgICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBoYXNVbmlxdWVJZHMgPSBsb2FkVmFsdWVbMF07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z1N0cmluZyA9IGxvYWRWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICB2YXIgdW5pcXVlSWRzU3ZnU3RyaW5nID0gbG9hZFZhbHVlWzJdO1xuICAgICAgICAgICAgICAgIHZhciBzdmdFbGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNVbmlxdWVJZHMgPT09IE5VTEwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSURzIGZvciB0aGUgU1ZHIHN0cmluZyBoYXZlIG5vdCBiZWVuIG1hZGUgdW5pcXVlIGJlZm9yZS4gVGhpcyBtYXkgaGFwcGVuIGlmIHByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgIC8vIGluamVjdGlvbiBvZiBhIGNhY2hlZCBTVkcgaGF2ZSBiZWVuIHJ1biB3aXRoIHRoZSBvcHRpb24gbWFrZWRJZHNVbmlxdWUgc2V0IHRvIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZUlkcyA9IG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRWYWx1ZVswXSA9IGhhc1VuaXF1ZUlkcztcbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzJdID0gaGFzVW5pcXVlSWRzICYmIHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzVW5pcXVlSWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgSURzIHVuaXF1ZSBmb3IgYWxyZWFkeSBjYWNoZWQgU1ZHcyB3aXRoIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgICAgICAgICBzdmdTdHJpbmcgPSBtYWtlSWRzVW5pcXVlQ2FjaGVkKHVuaXF1ZUlkc1N2Z1N0cmluZyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3ZnRWxlbSA9IHN2Z0VsZW0gfHwgYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ZnTG9hZCAhPSBfVU5ERUZJTkVEXykge1xuICAgICAgICAgICAgICAvLyBWYWx1ZSBmb3IgdXJsIGV4aXN0cyBpbiBjYWNoZVxuICAgICAgICAgICAgICBpZiAoc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUpIHtcbiAgICAgICAgICAgICAgICAvLyBTYW1lIHVybCBoYXMgYmVlbiBjYWNoZWQsIGJ1dCB2YWx1ZSBoYXMgbm90IGJlZW4gbG9hZGVkIHlldCwgc28gYWRkIHRvIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQucHVzaChoYW5kbGVMb2FkVmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZUxvYWRWYWx1ZShzdmdMb2FkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgc3ZnTG9hZCA9IFtdO1xuICAgICAgICAgICAgICAvLyBzZXQgcHJvcGVydHkgaXNDYWxsYmFja1F1ZXVlIHRvIEFycmF5IHRvIGRpZmZlcmVudGlhdGUgZnJvbSBhcnJheSB3aXRoIGNhY2hlZCBsb2FkZWQgdmFsdWVzXG4gICAgICAgICAgICAgIHN2Z0xvYWQuaXNDYWxsYmFja1F1ZXVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc3ZnTG9hZENhY2hlW2Fic1VybF0gPSBzdmdMb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIExvYWQgdGhlIFNWRyBiZWNhdXNlIGl0IGlzIG5vdCBjYWNoZWQgb3IgY2FjaGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAgIGxvYWRTdmcoYWJzVXJsLCBmdW5jdGlvbihzdmdYbWwsIHN2Z1N0cmluZykge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBYTUwgZnJvbSB0aGUgWEhSIHJlcXVlc3QgaWYgaXQgaXMgYW4gaW5zdGFuY2Ugb2YgRG9jdW1lbnQuIE90aGVyd2lzZVxuICAgICAgICAgICAgLy8gKGZvciBleGFtcGxlIG9mIElFOSksIGNyZWF0ZSB0aGUgc3ZnIGRvY3VtZW50IGZyb20gdGhlIHN2ZyBzdHJpbmcuXG4gICAgICAgICAgICB2YXIgc3ZnRWxlbSA9IHN2Z1htbCBpbnN0YW5jZW9mIERvY3VtZW50ID8gc3ZnWG1sLmRvY3VtZW50RWxlbWVudCA6IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIHRydWUpO1xuXG4gICAgICAgICAgICB2YXIgYWZ0ZXJMb2FkID0gb3B0aW9ucy5hZnRlckxvYWQ7XG4gICAgICAgICAgICBpZiAoYWZ0ZXJMb2FkKSB7XG4gICAgICAgICAgICAgIC8vIEludm9rZSBhZnRlckxvYWQgaG9vayB3aGljaCBtYXkgbW9kaWZ5IHRoZSBTVkcgZWxlbWVudC4gQWZ0ZXIgbG9hZCBtYXkgYWxzbyByZXR1cm4gYSBuZXdcbiAgICAgICAgICAgICAgLy8gc3ZnIGVsZW1lbnQgb3Igc3ZnIHN0cmluZ1xuICAgICAgICAgICAgICB2YXIgc3ZnRWxlbU9yU3ZnU3RyaW5nID0gYWZ0ZXJMb2FkKHN2Z0VsZW0sIHN2Z1N0cmluZykgfHwgc3ZnRWxlbTtcbiAgICAgICAgICAgICAgaWYgKHN2Z0VsZW1PclN2Z1N0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzdmdFbGVtIGFuZCBzdmdTdHJpbmcgYmVjYXVzZSBvZiBtb2RpZmljYXRpb25zIHRvIHRoZSBTVkcgZWxlbWVudCBvciBTVkcgc3RyaW5nIGluXG4gICAgICAgICAgICAgICAgLy8gdGhlIGFmdGVyTG9hZCBob29rLCBzbyB0aGUgbW9kaWZpZWQgU1ZHIGlzIGFsc28gdXNlZCBmb3IgYWxsIGxhdGVyIGNhY2hlZCBpbmplY3Rpb25zXG4gICAgICAgICAgICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHN2Z0VsZW1PclN2Z1N0cmluZyA9PSAnc3RyaW5nJztcbiAgICAgICAgICAgICAgICBzdmdTdHJpbmcgPSBpc1N0cmluZyA/IHN2Z0VsZW1PclN2Z1N0cmluZyA6IHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtKTtcbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gaXNTdHJpbmcgPyBidWlsZFN2Z0VsZW1lbnQoc3ZnRWxlbU9yU3ZnU3RyaW5nLCB0cnVlKSA6IHN2Z0VsZW1PclN2Z1N0cmluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3ZnRWxlbSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IE5VTEw7XG4gICAgICAgICAgICAgIGlmIChtYWtlSWRzVW5pcXVlT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgdW5pcXVlSWRzU3ZnU3RyaW5nID0gaGFzVW5pcXVlSWRzICYmIHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgYW4gYXJyYXkgd2l0aCB0aHJlZSBlbnRyaWVzIHRvIHRoZSBsb2FkIGNhY2hlXG4gICAgICAgICAgICAgICAgc2V0U3ZnTG9hZENhY2hlVmFsdWUoW2hhc1VuaXF1ZUlkcywgc3ZnU3RyaW5nLCB1bmlxdWVJZHNTdmdTdHJpbmddKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgc2V0U3ZnTG9hZENhY2hlVmFsdWUoU1ZHX0lOVkFMSUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgc2V0U3ZnTG9hZENhY2hlVmFsdWUoTE9BRF9GQUlMKTtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSBpcyBhbiBhcnJheS4gSW5qZWN0aW9uIGlzIG5vdCBjb21wbGV0ZSBzbyByZWdpc3RlciBjYWxsYmFja1xuICAgICAgICAgICAgc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgU1ZHSW5qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGRlZmF1bHQgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgYW4gaW5qZWN0aW9uLlxuICAgICAqL1xuICAgIFNWR0luamVjdC5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH07XG5cblxuICAgIC8vIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBTVkdJbmplY3RcbiAgICBTVkdJbmplY3QuY3JlYXRlID0gY3JlYXRlU1ZHSW5qZWN0O1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluIG9uZXJyb3IgRXZlbnQgb2YgYW4gYDxpbWc+YCBlbGVtZW50IHRvIGhhbmRsZSBjYXNlcyB3aGVuIHRoZSBsb2FkaW5nIHRoZSBvcmlnaW5hbCBzcmMgZmFpbHNcbiAgICAgKiAoZm9yIGV4YW1wbGUgaWYgZmlsZSBpcyBub3QgZm91bmQgb3IgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBTVkcpLiBUaGlzIHRyaWdnZXJzIGEgY2FsbCB0byB0aGVcbiAgICAgKiBvcHRpb25zIG9uRmFpbCBob29rIGlmIGF2YWlsYWJsZS4gVGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgd2lsbCBiZSBzZXQgYXMgdGhlIG5ldyBzcmMgYXR0cmlidXRlXG4gICAgICogZm9yIHRoZSBpbWcgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gYW4gaW1nIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2ZhbGxiYWNrU3JjXSAtIG9wdGlvbmFsIHBhcmFtZXRlciBmYWxsYmFjayBzcmNcbiAgICAgKi9cbiAgICBTVkdJbmplY3QuZXJyID0gZnVuY3Rpb24oaW1nLCBmYWxsYmFja1NyYykge1xuICAgICAgaWYgKGltZykge1xuICAgICAgICBpZiAoaW1nW19fU1ZHSU5KRUNUXSAhPSBGQUlMKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nKTtcblxuICAgICAgICAgIGlmICghSVNfU1ZHX1NVUFBPUlRFRCkge1xuICAgICAgICAgICAgc3ZnTm90U3VwcG9ydGVkKGltZywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nKTtcbiAgICAgICAgICAgIGxvYWRGYWlsKGltZywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmFsbGJhY2tTcmMpIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IGZhbGxiYWNrU3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1nTm90U2V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvd1tnbG9iYWxOYW1lXSA9IFNWR0luamVjdDtcblxuICAgIHJldHVybiBTVkdJbmplY3Q7XG4gIH1cblxuICB2YXIgU1ZHSW5qZWN0SW5zdGFuY2UgPSBjcmVhdGVTVkdJbmplY3QoJ1NWR0luamVjdCcpO1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gU1ZHSW5qZWN0SW5zdGFuY2U7XG4gIH1cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTGlnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtQmxhY2sudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pO1xuICBmb250LXdlaWdodDogOTAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5cbjpyb290IHtcbiAgLS1jb2xvci1mb250LXByaW1hcnk6ICMwMDAwMDA7XG4gIC0tY29sb3ItZm9udC1zZWNvbmRhcnk6ICNlOGU5ZWI7XG4gIC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5OiAjMzEzNjM4O1xuICAtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjA2NTQzO1xuICAtLWNvbG9yLWJhY2tncm91bmQtZGVmYXVsdDogI2ZmZmZmZjtcbiAgLS1jb2xvci1hY2NlbnQ6ICNmMDlkNTE7XG4gIC0tY29sb3ItYm94LXNoYWRvdzogIzAwMDAwMDtcbn1cblxuKixcbio6OmJlZm9yZSxcbio6OmFmdGVyIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgY29sb3I6IHZhcigtLWNvbG9yLWZvbnQtc2Vjb25kYXJ5KTtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIG1pbi1oZWlnaHQ6IDEwMHN2aDtcbn1cblxuYm9keSA+ICN3ZWF0aGVyX2FwcCB7XG4gIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMWZyO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVEQUF1RDtFQUN2RCwrQkFBK0I7RUFDL0IsNENBQTBFO0VBQzFFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSwrQkFBK0I7RUFDL0IsNENBQTJFO0VBQzNFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSwrQkFBK0I7RUFDL0IsNENBQTBFO0VBQzFFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsK0JBQStCO0VBQy9CLG1DQUFtQztFQUNuQyxxQ0FBcUM7RUFDckMsbUNBQW1DO0VBQ25DLHVCQUF1QjtFQUN2QiwyQkFBMkI7QUFDN0I7O0FBRUE7OztFQUdFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsaURBQWlEO0VBQ2pELGtDQUFrQztFQUNsQyxzQ0FBc0M7RUFDdEMsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBzcmM6IHVybCguL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTGlnaHQudHRmKTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIHNyYzogdXJsKC4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmKTtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIHNyYzogdXJsKC4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1CbGFjay50dGYpO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1jb2xvci1mb250LXByaW1hcnk6ICMwMDAwMDA7XFxuICAtLWNvbG9yLWZvbnQtc2Vjb25kYXJ5OiAjZThlOWViO1xcbiAgLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnk6ICMzMTM2Mzg7XFxuICAtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjA2NTQzO1xcbiAgLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQ6ICNmZmZmZmY7XFxuICAtLWNvbG9yLWFjY2VudDogI2YwOWQ1MTtcXG4gIC0tY29sb3ItYm94LXNoYWRvdzogIzAwMDAwMDtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5KTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1mb250LXNlY29uZGFyeSk7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBtaW4taGVpZ2h0OiAxMDBzdmg7XFxufVxcblxcbmJvZHkgPiAjd2VhdGhlcl9hcHAge1xcbiAgbWluLWhlaWdodDogaW5oZXJpdDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiAjbWFpbl9jb250ZW50ICovXG4jbWFpbl9jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkOm5vdCgjbG9hZGluZyk6bm90KCNob21lKSB7XG4gIGhlaWdodDogaW5oZXJpdDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvY29udGVudC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsa0JBQWtCO0FBQ2xCO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixtQ0FBbUM7QUFDckNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogI21haW5fY29udGVudCAqL1xcbiNtYWluX2NvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkOm5vdCgjbG9hZGluZyk6bm90KCNob21lKSB7XFxuICBoZWlnaHQ6IGluaGVyaXQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2Vycm9yIHtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuI2Vycm9yID4gaDIge1xuICBmb250LXNpemU6IGNsYW1wKDNyZW0sIDN2dywgNXJlbSk7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZXJyb3IuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNlcnJvciB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4jZXJyb3IgPiBoMiB7XFxuICBmb250LXNpemU6IGNsYW1wKDNyZW0sIDN2dywgNXJlbSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2Zvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMHB4IDBweCA2cHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcbn1cblxuI2Zvb3RlciA+IGRpdiA+IGE6dmlzaXRlZCB7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1mb250LXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5KTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9mb290ZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbURBQW1EO0VBQ25ELGVBQWU7RUFDZixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG9EQUFvRDtBQUN0RDs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxzQ0FBc0M7QUFDeENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2Zvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDZweCAtMXB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xcbn1cXG5cXG4jZm9vdGVyID4gZGl2ID4gYTp2aXNpdGVkIHtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1mb250LXByaW1hcnkpO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogaW5jbHVkZXMgc2VsZWN0b3JzIGZvciBuYXZiYXIuanMgYW5kIGhlYWRlci5qcyAqL1xuI2hlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwLjNyZW07XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcbiAgLyogdmFsdWUgbmVlZHMgdG8gYmUgZXF1YWwgdG8gLm5hdl9idG4gcGFkZGluZyB2YWx1ZSAqL1xuICBtYXJnaW4tdG9wOiAwLjNyZW07XG59XG5cbi8qIG9wdGlvbmFsICovXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gKjpub3QoOmZpcnN0LWNoaWxkKTo6YWZ0ZXIsXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gKjpub3QoOmZpcnN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6ICcnO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMTg3LCA2OSk7XG4gIHotaW5kZXg6IC0xO1xufVxuXG4vKiBvcHRpb25hbCAqL1xuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpOjphZnRlciB7XG4gIHdpZHRoOiAwJTtcbiAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcbiAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4vKiBvcHRpb25hbCAqL1xuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpOmhvdmVyOjphZnRlciB7XG4gIHdpZHRoOiAxMDAlO1xuICB0cmFuc2Zvcm06IHNrZXdYKDhkZWcpIHNjYWxlWCgxLjAzKTtcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkgPiBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpID4gLm5hdl9sb2dvID4gc3ZnIHtcbiAgd2lkdGg6IGNsYW1wKDVyZW0sIDN2dywgNS41cmVtKTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgcGFkZGluZzogMXJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiBtYXgtY29udGVudDtcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudCk7XG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNXB4IDBweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b246OmJlZm9yZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29udGVudDogJyc7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDI7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgd2lkdGg6IDUwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDIxNiwgMjUpO1xuICB0cmFuc2l0aW9uOiBhbGwgMjUwbXM7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uW3ZhbHVlPSd0cnVlJ106OmJlZm9yZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDNweCAtMXB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvblt2YWx1ZT0nZmFsc2UnXTo6YmVmb3JlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICBib3gtc2hhZG93OiAycHggMHB4IDNweCAtMXB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvbiA+ICoge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDI7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b25bdmFsdWU9J3RydWUnXSA+IC5pbXBlcmlhbCB7XG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHJlZDsgKi9cbn1cblxuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zIHtcbiAgd2lkdGg6IG1heC1jb250ZW50O1xuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtOyAqL1xuLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50KTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggMHB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpOyAqL1xuLyogcGFkZGluZzogMC4wNXJlbTtcbn0gKi9cblxuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gKjpub3Qoc3Bhbikge1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59ICovXG5cbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICouc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDIxNiwgMjUpO1xufSAqL1xuXG4vKiBsZWZ0IGJ1dHRvbiAqL1xuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gI2ltcGVyaWFsLnNlbGVjdGVkIHtcbiAgYm94LXNoYWRvdzogLTJweCAwcHggM3B4IC0xcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XG4gIGFuaW1hdGlvbjogc2xpZGVfbGVmdCA1MDBtcyBlYXNlLW91dDtcbn0gKi9cblxuLyogcmlnaHQgYnV0dG9uICovXG4vKiAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMgPiAjbWV0cmljLnNlbGVjdGVkIHtcbiAgYm94LXNoYWRvdzogMnB4IDBweCAzcHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcbiAgYW5pbWF0aW9uOiBzbGlkZV9yaWdodCA1MDBtcyBlYXNlLW91dDtcbn0gKi9cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gKjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodC52aXNpYmxlIHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGVhc2UtaW4tb3V0O1xuICB6LWluZGV4OiAyO1xufVxuXG4ubmF2X2l0ZW0sXG4ubmF2X2l0ZW06dmlzaXRlZCB7XG4gIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWZvbnQtY29sb3IsIHJnYigwLCAwLCAwKSk7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLm5hdl9pdGVtID4gc3ZnIHtcbiAgd2lkdGg6IGNsYW1wKDEuNXJlbSwgM3Z3LCAyLjVyZW0pO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5uYXZfYnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcbiAgcGFkZGluZzogMC4zcmVtO1xuICB6LWluZGV4OiAyO1xufVxuXG4ubmF2X2J0biA+IHN2ZyB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5uYXZfYnRuOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG59XG5cbi5uYXZfYnRuOmhvdmVyID4gc3ZnIHtcbiAgZmlsdGVyOiBpbnZlcnQoMSk7XG59XG5cbi8qIGZvcm0gc3R5bGVzICovXG4jaGVhZGVyID4gI2Zvcm0ge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMC41cmVtO1xufVxuXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gbGFiZWwge1xuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgM3JlbSk7XG59XG5cbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBpbnB1dCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIHBhZGRpbmc6IDAuNzVyZW07XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDVweCAycHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XG4gIHBhZGRpbmctbGVmdDogMnJlbTtcbn1cblxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0OmZvY3VzOjpwbGFjZWhvbGRlciB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IC52YWxpZGl0eV9lcnJvciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgd2lkdGg6IGluaGVyaXQ7XG4gIH1cblxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmFmdGVyLFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmhvdmVyOmFmdGVyIHtcbiAgICBjb250ZW50OiBub25lO1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIsXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICB0b3A6IGF1dG87XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgfVxuXG4gIC8qIG9wdGlvbmFsICovXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyIHtcbiAgICB3aWR0aDogMCU7XG4gICAgaGVpZ2h0OiAwJTtcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbiAgfVxuXG4gIC8qIG9wdGlvbmFsICovXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBoZWlnaHQ6IDEyJTtcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpIHNjYWxlWCgxKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGk6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgfVxuXG4gIC5uYXZfYnRuIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCB7XG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBwYWRkaW5nOiAxcmVtIDA7XG4gIH1cblxuICAjaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgMXZ3LCAxLjI1cmVtKTtcbiAgfVxuXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBpbnB1dCB7XG4gICAgd2lkdGg6IDUwJTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlX2xlZnQge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlX3JpZ2h0IHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxtREFBbUQ7QUFDbkQ7RUFDRSxtREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNEQUFzRDtFQUN0RCxrQkFBa0I7QUFDcEI7O0FBRUEsYUFBYTtBQUNiOztFQUVFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLE1BQU07RUFDTixPQUFPO0VBQ1AsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLGlDQUFpQztBQUNuQzs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxXQUFXO0VBQ1gsbUNBQW1DO0VBQ25DLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxtREFBbUQ7RUFDbkQsYUFBYTtFQUNiLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixlQUFlO0VBQ2YscUNBQXFDO0VBQ3JDLHlEQUF5RDtBQUMzRDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsT0FBTztFQUNQLFFBQVE7RUFDUixNQUFNO0VBQ04sVUFBVTtFQUNWLGVBQWU7RUFDZixVQUFVO0VBQ1YsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixrQ0FBa0M7RUFDbEMscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLHFEQUFxRDtBQUN2RDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQixvREFBb0Q7QUFDdEQ7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7OzJCQUUyQjtBQUMzQjs4REFDOEQ7QUFDOUQ7R0FDRzs7QUFFSDs7Ozs7R0FLRzs7QUFFSDs7R0FFRzs7QUFFSCxnQkFBZ0I7QUFDaEI7OztHQUdHOztBQUVILGlCQUFpQjtBQUNqQjs7O0dBR0c7O0FBRUg7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6Qix1Q0FBdUM7RUFDdkMsVUFBVTtBQUNaOztBQUVBOztFQUVFLDhDQUE4QztFQUM5QyxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxpQ0FBaUM7RUFDakMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsVUFBVTtBQUNaOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7RUFDZixvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUEsZ0JBQWdCO0FBQ2hCO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYix5REFBeUQ7RUFDekQsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0U7SUFDRSxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QixVQUFVO0lBQ1YseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztFQUNoQjs7RUFFQTs7SUFFRSxhQUFhO0VBQ2Y7O0VBRUE7O0lBRUUsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7SUFDUixZQUFZO0lBQ1osbUJBQW1CO0VBQ3JCOztFQUVBLGFBQWE7RUFDYjtJQUNFLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLGlDQUFpQztFQUNuQzs7RUFFQSxhQUFhO0VBQ2I7SUFDRSxVQUFVO0lBQ1YsV0FBVztJQUNYLGdDQUFnQztJQUNoQyxpQ0FBaUM7RUFDbkM7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxxQkFBcUI7SUFDckIsZUFBZTtJQUNmLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxvQ0FBb0M7RUFDdEM7O0VBRUE7SUFDRSxVQUFVO0VBQ1o7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsMkJBQTJCO0VBQzdCOztFQUVBO0lBQ0UseUJBQXlCO0VBQzNCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLDRCQUE0QjtFQUM5Qjs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGluY2x1ZGVzIHNlbGVjdG9ycyBmb3IgbmF2YmFyLmpzIGFuZCBoZWFkZXIuanMgKi9cXG4jaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZzogMC4zcmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGk6Zmlyc3Qtb2YtdHlwZSB7XFxuICAvKiB2YWx1ZSBuZWVkcyB0byBiZSBlcXVhbCB0byAubmF2X2J0biBwYWRkaW5nIHZhbHVlICovXFxuICBtYXJnaW4tdG9wOiAwLjNyZW07XFxufVxcblxcbi8qIG9wdGlvbmFsICovXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+ICo6bm90KDpmaXJzdC1jaGlsZCk6OmFmdGVyLFxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiAqOm5vdCg6Zmlyc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAxODcsIDY5KTtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG5cXG4vKiBvcHRpb25hbCAqL1xcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaTo6YWZ0ZXIge1xcbiAgd2lkdGg6IDAlO1xcbiAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcXG4gIHRyYW5zaXRpb246IGFsbCA1MDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLyogb3B0aW9uYWwgKi9cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGk6aG92ZXI6OmFmdGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdHJhbnNmb3JtOiBza2V3WCg4ZGVnKSBzY2FsZVgoMS4wMyk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSA+IGEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSA+IC5uYXZfbG9nbyA+IHN2ZyB7XFxuICB3aWR0aDogY2xhbXAoNXJlbSwgM3Z3LCA1LjVyZW0pO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0IHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNXB4IDBweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b246OmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIHotaW5kZXg6IDI7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICB3aWR0aDogNTAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNSwgMjE2LCAyNSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjUwbXM7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uW3ZhbHVlPSd0cnVlJ106OmJlZm9yZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgYm94LXNoYWRvdzogLTJweCAwcHggM3B4IC0xcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uW3ZhbHVlPSdmYWxzZSddOjpiZWZvcmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xcbiAgYm94LXNoYWRvdzogMnB4IDBweCAzcHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b24gPiAqIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDI7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uW3ZhbHVlPSd0cnVlJ10gPiAuaW1wZXJpYWwge1xcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmVkOyAqL1xcbn1cXG5cXG4vKiAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMge1xcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTsgKi9cXG4vKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggMHB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpOyAqL1xcbi8qIHBhZGRpbmc6IDAuMDVyZW07XFxufSAqL1xcblxcbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICo6bm90KHNwYW4pIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59ICovXFxuXFxuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gKi5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDIxNiwgMjUpO1xcbn0gKi9cXG5cXG4vKiBsZWZ0IGJ1dHRvbiAqL1xcbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICNpbXBlcmlhbC5zZWxlY3RlZCB7XFxuICBib3gtc2hhZG93OiAtMnB4IDBweCAzcHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG4gIGFuaW1hdGlvbjogc2xpZGVfbGVmdCA1MDBtcyBlYXNlLW91dDtcXG59ICovXFxuXFxuLyogcmlnaHQgYnV0dG9uICovXFxuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gI21ldHJpYy5zZWxlY3RlZCB7XFxuICBib3gtc2hhZG93OiAycHggMHB4IDNweCAtMXB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xcbiAgYW5pbWF0aW9uOiBzbGlkZV9yaWdodCA1MDBtcyBlYXNlLW91dDtcXG59ICovXFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gKjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQudmlzaWJsZSB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBlYXNlLWluLW91dDtcXG4gIHotaW5kZXg6IDI7XFxufVxcblxcbi5uYXZfaXRlbSxcXG4ubmF2X2l0ZW06dmlzaXRlZCB7XFxuICBjb2xvcjogdmFyKC0tcHJpbWFyeS1mb250LWNvbG9yLCByZ2IoMCwgMCwgMCkpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4ubmF2X2l0ZW0gPiBzdmcge1xcbiAgd2lkdGg6IGNsYW1wKDEuNXJlbSwgM3Z3LCAyLjVyZW0pO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4ubmF2X2J0biB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXG4gIHotaW5kZXg6IDI7XFxufVxcblxcbi5uYXZfYnRuID4gc3ZnIHtcXG4gIHdpZHRoOiAycmVtO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4ubmF2X2J0bjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbi5uYXZfYnRuOmhvdmVyID4gc3ZnIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDEpO1xcbn1cXG5cXG4vKiBmb3JtIHN0eWxlcyAqL1xcbiNoZWFkZXIgPiAjZm9ybSB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gbGFiZWwge1xcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgcGFkZGluZzogMC43NXJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNXB4IDJweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG4gIHBhZGRpbmctbGVmdDogMnJlbTtcXG59XFxuXFxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0OmZvY3VzOjpwbGFjZWhvbGRlciB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiAudmFsaWRpdHlfZXJyb3Ige1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICoge1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgd2lkdGg6IGluaGVyaXQ7XFxuICB9XFxuXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmFmdGVyLFxcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTpob3ZlcjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IG5vbmU7XFxuICB9XFxuXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlcixcXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB0b3A6IGF1dG87XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICB9XFxuXFxuICAvKiBvcHRpb25hbCAqL1xcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIge1xcbiAgICB3aWR0aDogMCU7XFxuICAgIGhlaWdodDogMCU7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMGRlZyk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gIH1cXG5cXG4gIC8qIG9wdGlvbmFsICovXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBoZWlnaHQ6IDEyJTtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKSBzY2FsZVgoMSk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIC5uYXZfYnRuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQge1xcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgcGFkZGluZzogMXJlbSAwO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGxhYmVsIHtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAxdncsIDEuMjVyZW0pO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0IHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gIH1cXG59XFxuXFxuQGtleWZyYW1lcyBzbGlkZV9sZWZ0IHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xcbiAgfVxcblxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGVfcmlnaHQge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgfVxcblxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciBob21lLmpzIG1vZHVsZSAqL1xuI2hvbWUge1xuICBwYWRkaW5nOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAxcmVtO1xufVxuXG4jaG9tZSA+ICoge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHJvdy1nYXA6IDFyZW07XG59XG5cbiNob21lID4gKiA+IGgyIHtcbiAgZmxleDogMTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9ob21lLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw4QkFBOEI7QUFDOUI7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLGFBQWE7QUFDZjs7QUFFQTtFQUNFLE9BQU87QUFDVFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIGhvbWUuanMgbW9kdWxlICovXFxuI2hvbWUge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMXJlbTtcXG59XFxuXFxuI2hvbWUgPiAqIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4jaG9tZSA+ICogPiBoMiB7XFxuICBmbGV4OiAxO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNsb2FkaW5nIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDJyZW07XG59XG5cbiNsb2FkaW5nID4gI2xvYWRpbmdfaW1nIHtcbiAgd2lkdGg6IGNsYW1wKDVyZW0sIDN2dywgMTByZW0pO1xuICBoZWlnaHQ6IGF1dG87XG4gIGFuaW1hdGlvbjogcm90YXRlX2N3IDFzIGluZmluaXRlIGxpbmVhcjtcbn1cblxuQGtleWZyYW1lcyByb3RhdGVfY3cge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbG9hZGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0U7SUFDRSx1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSx5QkFBeUI7RUFDM0I7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjbG9hZGluZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4jbG9hZGluZyA+ICNsb2FkaW5nX2ltZyB7XFxuICB3aWR0aDogY2xhbXAoNXJlbSwgM3Z3LCAxMHJlbSk7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBhbmltYXRpb246IHJvdGF0ZV9jdyAxcyBpbmZpbml0ZSBsaW5lYXI7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlX2N3IHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICB9XFxuXFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjZm9yZWNhc3QgPiBoZWFkZXIge1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBoMiB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG59XG5cbiNmb3JlY2FzdCA+IGhlYWRlciA+IGgyID4gc3BhbiB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgdGV4dC13cmFwOiBub3dyYXA7XG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG59XG5cbiNmb3JlY2FzdCA+IGhlYWRlciA+IHAge1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgYm9yZGVyLWJvdHRvbTogMC4zNXJlbSBzb2xpZDtcbn1cblxuI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4OiAxIDAgMHB4O1xuICBjb2x1bW4tZ2FwOiAwLjVyZW07XG59XG5cbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1jaGlsZCgzKSA+IDpmaXJzdC1jaGlsZCxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpmaXJzdC1jaGlsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAjZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgbWlubWF4KDAsIDFmcikpO1xuICAgIHBhZGRpbmc6IDJyZW0gM3JlbTtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtb2YtdHlwZSgzKSB7XG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC13cmFwOiBiYWxhbmNlO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFicy9mb3JlY2FzdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQ0FBaUM7RUFDakMsYUFBYTtFQUNiLGVBQWU7RUFDZixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRTtJQUNFLGFBQWE7SUFDYixnREFBZ0Q7SUFDaEQsa0JBQWtCO0lBQ2xCLHFCQUFxQjtFQUN2Qjs7RUFFQTtJQUNFLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLGNBQWM7SUFDZCxrQkFBa0I7RUFDcEI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZm9yZWNhc3QgPiBoZWFkZXIge1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuI2ZvcmVjYXN0ID4gaGVhZGVyID4gaDIge1xcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG59XFxuXFxuI2ZvcmVjYXN0ID4gaGVhZGVyID4gaDIgPiBzcGFuIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICB0ZXh0LXdyYXA6IG5vd3JhcDtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbiNmb3JlY2FzdCA+IGhlYWRlciA+IHAge1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheTpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIGJvcmRlci1ib3R0b206IDAuMzVyZW0gc29saWQ7XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXg6IDEgMCAwcHg7XFxuICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1jaGlsZCgzKSA+IDpmaXJzdC1jaGlsZCxcXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6Zmlyc3QtY2hpbGQge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgbWlubWF4KDAsIDFmcikpO1xcbiAgICBwYWRkaW5nOiAycmVtIDNyZW07XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gICNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpIHtcXG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgfVxcblxcbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB0ZXh0LXdyYXA6IGJhbGFuY2U7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2hvdXJseSA+IGhlYWRlciB7XG4gIHBhZGRpbmc6IDJyZW07XG59XG5cbiNob3VybHkgPiBoZWFkZXIgPiBoMiB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG59XG5cbiNob3VybHkgPiBoZWFkZXIgPiBoMiA+IHNwYW4ge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHRleHQtd3JhcDogbm93cmFwO1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xufVxuXG4jaG91cmx5ID4gaGVhZGVyID4gcCB7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG5cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiBoMyB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xuICBjb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1kZWZhdWx0KTtcbiAgcGFkZGluZzogMnJlbTtcbiAgdGV4dC13cmFwOiBiYWxhbmNlO1xufVxuXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91cjpub3QoOmxhc3QtY2hpbGQpIHtcbiAgYm9yZGVyLWJvdHRvbTogMC4zNXJlbSBzb2xpZDtcbn1cblxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAwLjVyZW07XG59XG5cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsID4gKiB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi8qIHNlbGVjdHMgdGhlIGxpIHdpdGggdGltZSAqL1xuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6Zmlyc3Qtb2YtdHlwZSA+IGxpIHtcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcbn1cblxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmxhc3Qtb2YtdHlwZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xuICAgIHBhZGRpbmc6IDJyZW0gM3JlbTtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSB7XG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCxcbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bGFzdC1vZi10eXBlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFicy9ob3VybHkuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLGFBQWE7RUFDYixlQUFlO0VBQ2YscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLHNDQUFzQztFQUN0QyxpREFBaUQ7RUFDakQsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBOztFQUVFLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxrQkFBa0I7SUFDbEIscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0Usd0JBQXdCO0VBQzFCOztFQUVBOztJQUVFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNob3VybHkgPiBoZWFkZXIge1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuI2hvdXJseSA+IGhlYWRlciA+IGgyIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcblxcbiNob3VybHkgPiBoZWFkZXIgPiBoMiA+IHNwYW4ge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuI2hvdXJseSA+IGhlYWRlciA+IHAge1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IGgzIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQpO1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIHRleHQtd3JhcDogYmFsYW5jZTtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XFxufVxcblxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91cjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIGJvcmRlci1ib3R0b206IDAuMzVyZW0gc29saWQ7XFxufVxcblxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWwgPiAqIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi8qIHNlbGVjdHMgdGhlIGxpIHdpdGggdGltZSAqL1xcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmZpcnN0LW9mLXR5cGUgPiBsaSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xcbn1cXG5cXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSA+IDpsYXN0LWNoaWxkLFxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmxhc3Qtb2YtdHlwZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gICAgcGFkZGluZzogMnJlbSAzcmVtO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSB7XFxuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gIH1cXG5cXG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQsXFxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpsYXN0LW9mLXR5cGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlc2hlZXQgZm9yIHRhYnMuanMsIGFuZCB0YWJzX25hdmJhci5qcyAqL1xuI3RhYnNfbmF2YmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1kZWZhdWx0KTtcbiAgcGFkZGluZzogMXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IDBweCAtNXB4IDE0cHggLTEwcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XG59XG5cbiN0YWJzX25hdmJhciA+IHVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgY29sdW1uLWdhcDogMC41cmVtO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnRhYnNfbGlzdF9pdGVtIHtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuXG4vKiAjdGFic19uYXZiYXIgYW5jaG9ycyAqL1xuLnRhYnNfbGlzdF9pdGVtID4gKiB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdGV4dC13cmFwOiBub3dyYXA7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgcGFkZGluZzogMC41dnc7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnRhYnNfbGlzdF9pdGVtID4gKjphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAxMCU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBjb250ZW50OiAnJztcbiAgd2lkdGg6IDUwJTtcbiAgaGVpZ2h0OiA0cHg7XG4gIG1hcmdpbjogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50KTtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMCk7XG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuLnRhYnNfbGlzdF9pdGVtID4gKjpob3ZlcjphZnRlciB7XG4gIHRyYW5zZm9ybTogc2NhbGVYKDEpIHNjYWxlWSgxLjI1KTtcbn1cblxuLnRhYnNfbGlzdF9pdGVtID4gW2RhdGEtYWN0aXZlPSd0cnVlJ10ge1xuICBjb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAjdGFic19uYXZiYXIge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgfVxuICAudGFic19saXN0X2l0ZW0gPiAqIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFicy90YWJzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwrQ0FBK0M7QUFDL0M7RUFDRSxpREFBaUQ7RUFDakQsYUFBYTtFQUNiLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsdURBQXVEO0FBQ3pEOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQSx5QkFBeUI7QUFDekI7RUFDRSxxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLHNDQUFzQztFQUN0QyxtQ0FBbUM7RUFDbkMsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLE9BQU87RUFDUCxRQUFRO0VBQ1IsV0FBVztFQUNYLFVBQVU7RUFDVixXQUFXO0VBQ1gsWUFBWTtFQUNaLHFDQUFxQztFQUNyQyxvQkFBb0I7RUFDcEIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0U7SUFDRSwyQkFBMkI7RUFDN0I7RUFDQTtJQUNFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlc2hlZXQgZm9yIHRhYnMuanMsIGFuZCB0YWJzX25hdmJhci5qcyAqL1xcbiN0YWJzX25hdmJhciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQpO1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCAtNXB4IDE0cHggLTEwcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XFxufVxcblxcbiN0YWJzX25hdmJhciA+IHVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgY29sdW1uLWdhcDogMC41cmVtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi50YWJzX2xpc3RfaXRlbSB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbi8qICN0YWJzX25hdmJhciBhbmNob3JzICovXFxuLnRhYnNfbGlzdF9pdGVtID4gKiB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LXdyYXA6IG5vd3JhcDtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgcGFkZGluZzogMC41dnc7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi50YWJzX2xpc3RfaXRlbSA+ICo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAxMCU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBjb250ZW50OiAnJztcXG4gIHdpZHRoOiA1MCU7XFxuICBoZWlnaHQ6IDRweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRhYnNfbGlzdF9pdGVtID4gKjpob3ZlcjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlWCgxKSBzY2FsZVkoMS4yNSk7XFxufVxcblxcbi50YWJzX2xpc3RfaXRlbSA+IFtkYXRhLWFjdGl2ZT0ndHJ1ZSddIHtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAjdGFic19uYXZiYXIge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICB9XFxuICAudGFic19saXN0X2l0ZW0gPiAqIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjdG9kYXlfc3VtbWFyeSB7XG4gIHBhZGRpbmc6IDJyZW07XG59XG5cbiN0b2RheV9zdW1tYXJ5ID4gdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IHVsID4gOmZpcnN0LWNoaWxkIHtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IGhlYWRlciA+IGgzIHtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbiN0b2RheV9zdW1tYXJ5ID4gaGVhZGVyID4gaDMgPiBzcGFuIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6bGFzdC1jaGlsZCB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpmaXJzdC1jaGlsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gKiA+ICoge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciB7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkIHtcbiAgZmxleDogMTtcbn1cblxuLyogc2VsZWN0cyBsaSB3aXRoIFwiZmVlbHMgbGlrZVwiICovXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCA+IDpmaXJzdC1jaGlsZCB7XG4gIHRleHQtd3JhcDogbm93cmFwO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAydncsIDEuNXJlbSk7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkID4gOmxhc3QtY2hpbGQge1xuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgMi41cmVtKTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWNvbnRlbnQ6IGVuZDtcbiAgY29sdW1uLWdhcDogMXJlbTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4gPiAqIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4vKiBzZWxlY3RzIGxpJ3MgdGhhdCB3cmFwIGFuIGljb24gKi9cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiA+IDpmaXJzdC1jaGlsZCA+IHN2ZyB7XG4gIHdpZHRoOiBjbGFtcCgxLjc1cmVtLCAydncsIDNyZW0pO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiA+IGxpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMC4yNXJlbTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcbiAgcGFkZGluZzogMS4yNXJlbTtcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiAqIHtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbi8qIHNlbGVjdHMgbGkncyB0aGF0IHdyYXAgYW4gaWNvbiAqL1xuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCA+IDpmaXJzdC1jaGlsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiA6Zmlyc3QtY2hpbGQgPiBzdmcge1xuICB3aWR0aDogY2xhbXAoMS43NXJlbSwgMnZ3LCAycmVtKTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgyKSB7XG4gIGZsZXg6IDE7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICBjb2x1bW4tZ2FwOiAycmVtO1xuICAgIHJvdy1nYXA6IDFyZW07XG4gICAgcGFkZGluZzogMnJlbTtcbiAgfVxuXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwge1xuICAgIGNvbHVtbi1nYXA6IDEuNXJlbTtcbiAgICBwYWRkaW5nOiAycmVtO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFicy90b2RheS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxpREFBaUQ7RUFDakQsYUFBYTtFQUNiLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxPQUFPO0FBQ1Q7O0FBRUEsaUNBQWlDO0FBQ2pDO0VBQ0UsaUJBQWlCO0VBQ2pCLDBCQUEwQjtFQUMxQixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQSxtQ0FBbUM7QUFDbkM7RUFDRSxnQ0FBZ0M7RUFDaEMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQSxtQ0FBbUM7QUFDbkM7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsT0FBTztFQUNQLDBCQUEwQjtFQUMxQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRTtJQUNFLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsYUFBYTtFQUNmO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI3RvZGF5X3N1bW1hcnkge1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsID4gOmZpcnN0LWNoaWxkIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiBoZWFkZXIgPiBoMyB7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiBoZWFkZXIgPiBoMyA+IHNwYW4ge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6bGFzdC1jaGlsZCB7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6Zmlyc3QtY2hpbGQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+ICogPiAqIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyIHtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICBjb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1wcmltYXJ5KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtZGVmYXVsdCk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCB7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG4vKiBzZWxlY3RzIGxpIHdpdGggXFxcImZlZWxzIGxpa2VcXFwiICovXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiA6Zmlyc3QtY2hpbGQgPiA6Zmlyc3QtY2hpbGQge1xcbiAgdGV4dC13cmFwOiBub3dyYXA7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgMnZ3LCAxLjVyZW0pO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCA+IDpsYXN0LWNoaWxkIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAyLjVyZW0pO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IC50b2RheV9kZXRhaWxzX3N1biB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYWxpZ24tY29udGVudDogZW5kO1xcbiAgY29sdW1uLWdhcDogMXJlbTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4gPiAqIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgY29sdW1uLWdhcDogMC41cmVtO1xcbn1cXG5cXG4vKiBzZWxlY3RzIGxpJ3MgdGhhdCB3cmFwIGFuIGljb24gKi9cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IC50b2RheV9kZXRhaWxzX3N1biA+ICogPiA6Zmlyc3QtY2hpbGQgPiBzdmcge1xcbiAgd2lkdGg6IGNsYW1wKDEuNzVyZW0sIDJ2dywgM3JlbSk7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiA+IGxpIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMC4yNXJlbTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG4gIHBhZGRpbmc6IDEuMjVyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gKiB7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG59XFxuXFxuLyogc2VsZWN0cyBsaSdzIHRoYXQgd3JhcCBhbiBpY29uICovXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCA+IDpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOmZpcnN0LWNoaWxkID4gc3ZnIHtcXG4gIHdpZHRoOiBjbGFtcCgxLjc1cmVtLCAydncsIDJyZW0pO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgyKSB7XFxuICBmbGV4OiAxO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICB0ZXh0LXdyYXA6IG5vd3JhcDtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgY29sdW1uLWdhcDogMnJlbTtcXG4gICAgcm93LWdhcDogMXJlbTtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gIH1cXG5cXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwge1xcbiAgICBjb2x1bW4tZ2FwOiAxLjVyZW07XFxuICAgIHBhZGRpbmc6IDJyZW07XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NvbnRlbnQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jb250ZW50LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9lcnJvci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Vycm9yLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mb290ZXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mb290ZXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2xvYWRpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9sb2FkaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mb3JlY2FzdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ZvcmVjYXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob3VybHkuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob3VybHkuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RhYnMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YWJzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90b2RheS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RvZGF5LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0ICcuL2FwcC5jc3MnO1xuaW1wb3J0ICdAaWNvbmZ1L3N2Zy1pbmplY3QnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGhlYWRlckJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXInO1xuaW1wb3J0IG1haW5CdWlsZGVyIGZyb20gJy4vY29tcG9uZW50cy9tYWluL21haW4nO1xuaW1wb3J0IGZvb3RlckJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXInO1xuaW1wb3J0ICcuL2NvbnRhaW5lcnMvYXBpX2NvbnRyb2xsZXInO1xuXG4oKCkgPT4ge1xuICBjb25zdCBidWlsZCA9IHtcbiAgICBoZWFkZXI6IGhlYWRlckJ1aWxkZXIsXG4gICAgbWFpbjogbWFpbkJ1aWxkZXIsXG4gICAgZm9vdGVyOiBmb290ZXJCdWlsZGVyLFxuICB9O1xuXG4gIGNvbnN0IGFwcCA9IHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IGFwcFdyYXBwZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IGFwcENvbnRlbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGFwcFdyYXBwZXIuaWQgPSAnd2VhdGhlcl9hcHAnO1xuICAgICAgYXBwQ29udGVudC5pZCA9ICdjb250ZW50JztcblxuICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZC5oZWFkZXIoKSk7XG4gICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLm1haW4oKSk7XG4gICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGFwcENvbnRlbnQpO1xuICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZC5mb290ZXIoKSk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwV3JhcHBlcik7XG4gICAgfSxcbiAgfTtcblxuICBhcHAuaW5pdCgpO1xufSkoKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9jaGFuY2Vfb2ZfcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hhbmNlX29mX3JhaW4uc3ZnXCIsXG5cdFwiLi9odW1pZGl0eS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaHVtaWRpdHkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vbWlubWF4dGVtcC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWlubWF4dGVtcC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9wcmVzc3VyZS5zdmdcIixcblx0XCIuL3Byb2dyZXNzX2FjdGl2aXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9wcm9ncmVzc19hY3Rpdml0eS5zdmdcIixcblx0XCIuL3NoYXJwX2hvbWUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3NoYXJwX2hvbWUuc3ZnXCIsXG5cdFwiLi9zdW5yaXNlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9zdW5yaXNlLnN2Z1wiLFxuXHRcIi4vc3Vuc2V0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9zdW5zZXQuc3ZnXCIsXG5cdFwiLi91di5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvdXYuc3ZnXCIsXG5cdFwiLi92aXNpYmlsaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy92aXNpYmlsaXR5LnN2Z1wiLFxuXHRcIi4vd2luZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvd2luZC5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL2Vycm9yLmNzcyc7XG5cbmNvbnN0IGVycm9yQnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRXJyb3IpIHtcbiAgICB0aGlzLnNldEVycm9yKHdlYXRoZXJFcnJvcik7XG4gIH0sXG4gIHNldEVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5lcnJvciA9IGVycm9yLmVycm9yO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gYEVycm9yIGNvZGU6ICR7ZXJyb3Iuc3RhdHVzfVxuICAgICR7ZXJyb3IuZXJyb3IubWVzc2FnZX1gO1xuICB9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBlcnJvclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgY29uc3QgZXJyb3JIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBlcnJvclNlY3Rpb24uaWQgPSAnZXJyb3InO1xuICAgIGVycm9ySGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6IHRoaXMuZXJyb3JNZXNzYWdlIH0pO1xuXG4gICAgZXJyb3JTZWN0aW9uLmFwcGVuZENoaWxkKGVycm9ySGVhZGluZyk7XG4gICAgcmV0dXJuIGVycm9yU2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVycm9ySGVhZGVyKHdlYXRoZXJFcnJvcikge1xuICBlcnJvckJ1aWxkZXIuaW5pdCh3ZWF0aGVyRXJyb3IpO1xuICByZXR1cm4gZXJyb3JCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL2Zvb3Rlci5jc3MnO1xuXG5jb25zdCBmb290ZXJCdWlsZGVyID0ge1xuICBjYWNoZURPTShmb290ZXJFbGVtZW50KSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZm9vdGVyRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuICAgIGNvbnN0IGZvb3RlckFuY2hvcldyYXBwZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBmb290ZXJBbmNob3IgPSBjcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgZm9vdGVyQW5jaG9yV3JhcHBlci50ZXh0Q29udGVudCA9ICdQb3dlcmVkIGJ5ICc7XG4gICAgZm9vdGVyRWxlbWVudC5pZCA9ICdmb290ZXInO1xuXG4gICAgZm9vdGVyQW5jaG9yLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgaHJlZjogJ2h0dHBzOi8vd3d3LndlYXRoZXJhcGkuY29tLycsXG4gICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgdGV4dENvbnRlbnQ6ICdXZWF0aGVyIEFQSScsXG4gICAgfSk7XG5cbiAgICBmb290ZXJBbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGZvb3RlckFuY2hvcik7XG4gICAgZm9vdGVyRWxlbWVudC5hcHBlbmRDaGlsZChmb290ZXJBbmNob3JXcmFwcGVyKTtcbiAgICByZXR1cm4gZm9vdGVyRWxlbWVudDtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkZm9vdGVyKCkge1xuICByZXR1cm4gZm9vdGVyQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIGVsZW1lbnQ6ICdmb3JtJyxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBpZDogJ2Zvcm0nLFxuICAgIH0sXG4gICAgaW5wdXRzOiBbXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogJ2xvY2F0aW9uJyxcbiAgICAgICAgICBjbGFzczogJ2Zvcm1faW5wdXQnLFxuICAgICAgICAgIG5hbWU6ICdsb2NhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3NlYXJjaCcsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICdFbnRlciBjaXR5IG9yIHBvc3RhbCBjb2RlJyxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICdFbnRlciBhIHZhbGlkIGNpdHkgb3IgcG9zdGFsIGNvZGUnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGlkOiAndW5pdHN5c3RlbScsXG4gICAgICAgICAgY2xhc3M6ICdmb3JtX2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAndW5pdHN5c3RlbScsXG4gICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IGBFbnRlciAnaW1wZXJpYWwnIG9yICdtZXRyaWMnYCxcbiAgICAgICAgICB2YWx1ZTogJ2ltcGVyaWFsJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHB1YlN1YiBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YlN1Yic7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyLmNvbmZpZyc7XG5pbXBvcnQgYnVpbGROYXZiYXIgZnJvbSAnLi4vbmF2YmFyL25hdmJhcic7XG5pbXBvcnQgeyBzZXRVbml0U3lzdGVtIH0gZnJvbSAnLi4vdGFicy91bml0c3lzdGVtcyc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9oZWFkZXIuY3NzJztcblxuY29uc3QgaGVhZGVyQnVpbGRlciA9IHtcbiAgY2FjaGVET00oaGVhZGVyRWxlbWVudCkge1xuICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyRWxlbWVudDtcbiAgICB0aGlzLmZvcm0gPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gICAgdGhpcy5pbnB1dFNlYXJjaCA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uJyk7XG4gICAgdGhpcy5pbnB1dFVuaXRzeXN0ZW0gPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1bml0c3lzdGVtJyk7XG4gICAgdGhpcy5pbnB1dEVycm9ycyA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZhbGlkaXR5X2Vycm9yJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRVbml0U3lzdGVtID0gdGhpcy5zZXRVbml0U3lzdGVtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRBY3RpdmVUYWIgPSB0aGlzLnNldEFjdGl2ZVRhYi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3NldFVuaXRTeXN0ZW0nLCB0aGlzLnNldFVuaXRTeXN0ZW0pO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3NldEFjdGl2ZVRhYicsIHRoaXMuc2V0QWN0aXZlVGFiKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBoZWFkZXJFbGVtZW50LmlkID0gJ2hlYWRlcic7XG4gICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChidWlsZE5hdmJhci5yZW5kZXIoKSk7XG5cbiAgICBPYmplY3Qua2V5cyhoZWFkZXIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgaGVhZGVySXRlbSA9IGNyZWF0ZUVsZW1lbnQoaGVhZGVyW2tleV0uZWxlbWVudCk7XG4gICAgICBoZWFkZXJJdGVtLnNldEF0dHJpYnV0ZXMoaGVhZGVyW2tleV0uYXR0cmlidXRlcyk7XG5cbiAgICAgIGlmIChoZWFkZXJba2V5XS5pbnB1dHMpIHtcbiAgICAgICAgaGVhZGVyW2tleV0uaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybUl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjb25zdCBpbnB1dExhYmVsID0gY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICBjb25zdCBmb3JtSW5wdXQgPSBjcmVhdGVFbGVtZW50KGlucHV0LmVsZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IGlucHV0RXJyb3IgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICBpbnB1dEVycm9yLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgY2xhc3M6IGB2YWxpZGl0eV9lcnJvciAke2lucHV0LmF0dHJpYnV0ZXMuaWR9YCxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBpbnB1dC5lcnJvcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtSW5wdXQuc2V0QXR0cmlidXRlcyhpbnB1dC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICBpbnB1dExhYmVsLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgZm9yOiBpbnB1dC5hdHRyaWJ1dGVzLmlkLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGlucHV0LmF0dHJpYnV0ZXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybUl0ZW0uc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnZm9ybV9pdGVtJyB9KTtcblxuICAgICAgICAgIGlmIChpbnB1dC5lcnJvcikgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaW5wdXRMYWJlbCk7XG4gICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoZm9ybUlucHV0KTtcbiAgICAgICAgICBpZiAoaW5wdXQuZXJyb3IpIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0RXJyb3IpO1xuICAgICAgICAgIGhlYWRlckl0ZW0uYXBwZW5kQ2hpbGQoZm9ybUl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJJdGVtKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2FjaGVET00oaGVhZGVyRWxlbWVudCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIGhlYWRlckVsZW1lbnQ7XG4gIH0sXG4gIHN1Ym1pdEZvcm0oZSkge1xuICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0VW5pdFN5c3RlbSh0aGlzLmlucHV0VW5pdHN5c3RlbS52YWx1ZSk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ2dldFdlYXRoZXInLCB0aGlzLmlucHV0U2VhcmNoLnZhbHVlLCB0aGlzLmFjdGl2ZVRhYik7XG4gIH0sXG4gIHNldFVuaXRTeXN0ZW0oc2VsZWN0aW9uKSB7XG4gICAgdGhpcy5pbnB1dFVuaXRzeXN0ZW0udmFsdWUgPSBzZWxlY3Rpb247XG4gICAgaWYgKHRoaXMuaW5wdXRTZWFyY2gudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm0oKTtcbiAgICB9XG4gIH0sXG4gIHNldEFjdGl2ZVRhYihrZXkpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGtleTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSGVhZGVyKCkge1xuICByZXR1cm4gaGVhZGVyQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIGVsZW1lbnQ6ICdkaXYnLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiAnd2VsY29tZScsXG4gICAgfSxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBlbGVtZW50OiAnaDInLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6ICd3ZWxjb21lX2hlYWRpbmcnLFxuICAgICAgICAgIHRleHRDb250ZW50OiAnUGxhY2Vob2xkZXInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogJ3AnLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6ICd3ZWxjb21lX3BhcmFncmFwaCcsXG4gICAgICAgICAgdGV4dENvbnRlbnQ6XG4gICAgICAgICAgICAnQWVuZWFuIGVzdCB1cm5hLCBtb2xsaXMgdXQgZmluaWJ1cyB2ZWwsIGZhdWNpYnVzIHNlZCBvcmNpLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBJbnRlZ2VyIGlkIGx1Y3R1cyBuaXNsLCBhdCBtYXhpbXVzIGZlbGlzLiBGdXNjZSBldSByaG9uY3VzIGVsaXQuIER1aXMgZWZmaWNpdHVyIGRvbG9yIGxpYmVybywgZWdldCB1bHRyaWNlcyBlcm9zIHVsdHJpY2llcyBldC4gSW50ZWdlciBlbGVpZmVuZCBpZCBpcHN1bSBlZ2V0IHBoYXJldHJhLiBEb25lYyB2aXRhZSBkdWkgdmVoaWN1bGEsIHBsYWNlcmF0IGxlbyBldCwgYWxpcXVldCBlbGl0LiBJbiBsYWNpbmlhIGxhY2luaWEgbmlzbCBzZW1wZXIgbG9ib3J0aXMuIFByYWVzZW50IHRvcnRvciBtYXNzYSwgZmVybWVudHVtIGV1IHZpdmVycmEgYWMsIGxhb3JlZXQgc2VkIG9kaW8uIFNlZCByaG9uY3VzIGRpY3R1bSB2ZXN0aWJ1bHVtLiBVdCBhYyByaG9uY3VzIGlwc3VtLiBTZWQgdXQgc2VtIGFsaXF1ZXQsIGltcGVyZGlldCBuaWJoIGV1LCBwdWx2aW5hciBlcm9zLiBNb3JiaSBwaGFyZXRyYSBncmF2aWRhIGxpYmVybyBhdCBvcm5hcmUuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGVsZW1lbnQ6ICdkaXYnLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiAnZmFxJyxcbiAgICB9LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdoMicsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogJ2ZhcV9oZWFkaW5nJyxcbiAgICAgICAgICB0ZXh0Q29udGVudDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdwJyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiAnZmFxX3BhcmFncmFwaCcsXG4gICAgICAgICAgdGV4dENvbnRlbnQ6XG4gICAgICAgICAgICAnQ3JhcyBhdCBsb2JvcnRpcyBvcmNpLCBldCBwb3N1ZXJlIHNhcGllbi4gU2VkIHR1cnBpcyBsZWN0dXMsIHVsdHJpY2VzIGluIG1hdHRpcyB2ZWwsIGN1cnN1cyB2aXRhZSBsZWN0dXMuIFNlZCBwb3N1ZXJlIHB1cnVzIHNhcGllbiwgYSBwb3J0YSBzYXBpZW4gY29uc2VjdGV0dXIgdml0YWUuIE1hZWNlbmFzIHZlbmVuYXRpcyBldSBhcmN1IHV0IGZhY2lsaXNpcy4gRnVzY2UgZmFjaWxpc2lzIHJ1dHJ1bSB0dXJwaXMgdml0YWUgY29tbW9kby4gUHJvaW4gZmluaWJ1cyByaXN1cyBuZWMgaW1wZXJkaWV0IGVmZmljaXR1ci4gTWFlY2VuYXMgZWdlc3RhcyBtaSB2ZWwgZXVpc21vZCBvcm5hcmUuIE1hdXJpcyB2ZWwgc29sbGljaXR1ZGluIG5pYmgsIG5lYyBncmF2aWRhIGVzdC4gUHJhZXNlbnQgYmliZW5kdW0gb2RpbyBxdWlzIGN1cnN1cyBydXRydW0uJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdwJyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiAnd2VsY29tZV9wYXJhZ3JhcGgnLFxuICAgICAgICAgIHRleHRDb250ZW50OlxuICAgICAgICAgICAgJ1V0IGVnZXN0YXMgZXJhdCBldCBvcmNpIGx1Y3R1cyBwb3J0dGl0b3Igc2l0IGFtZXQgY29uc2VxdWF0IHJpc3VzLiBBZW5lYW4gYmxhbmRpdCByaG9uY3VzIGFudGUsIGVnZXQgZmV1Z2lhdCBleCBwb3J0YSBldS4gTnVuYyBlZ2V0IGVsaXQgZXN0LiBEb25lYyBzdXNjaXBpdCBjb252YWxsaXMgZW5pbSBzZWQgdGluY2lkdW50LiBQcm9pbiBmZXJtZW50dW0gdmVuZW5hdGlzIGVsaXQgdXQgY29uc2VxdWF0LiBQcmFlc2VudCBpbnRlcmR1bSBsZWN0dXMgdmVsIGxhY2luaWEgcG9ydGEuIE1hdXJpcyBwdXJ1cyBtYXVyaXMsIHBvcnR0aXRvciBzZWQgYmliZW5kdW0gdml0YWUsIGludGVyZHVtIHF1aXMgbmliaC4gTnVsbGEgZXggZXN0LCBzZW1wZXIgYWMgbmlzaSB2aXRhZSwgaW1wZXJkaWV0IG1hdHRpcyBlbmltLiBOdWxsYSB2ZWwgY3Vyc3VzIHZlbGl0LiBNb3JiaSBhYyBmZWxpcyBxdWlzIGlwc3VtIGNvbmRpbWVudHVtIGRpY3R1bSB2aXRhZSBldSBzZW0uIE51bGxhbSBsYW9yZWV0IG5pc2wgc2VkIG51bmMgdWx0cmljZXMsIGV1IGF1Y3RvciBsZWN0dXMgY29uc2VjdGV0dXIuIE5hbSBub24gZmVsaXMgZXN0LiBJbnRlcmR1bSBldCBtYWxlc3VhZGEgZmFtZXMgYWMgYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMuIFBlbGxlbnRlc3F1ZSBjb25ndWUgZG9sb3IgZXUgZGFwaWJ1cyB0aW5jaWR1bnQuIFZpdmFtdXMgZWxlaWZlbmQgZW5pbSB2ZWxpdCwgdml0YWUgcGxhY2VyYXQgbGlndWxhIGJpYmVuZHVtIGF0LiBOYW0gYWxpcXVldCBkaWduaXNzaW0gYWNjdW1zYW4uJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvaG9tZS5jc3MnO1xuaW1wb3J0IGhvbWUgZnJvbSAnLi9ob21lLmNvbmZpZyc7XG5cbmNvbnN0IGhvbWVCdWlsZGVyID0ge1xuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob21lU2VjdGlvbi5pZCA9ICdob21lJztcbiAgICBob21lLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCk7XG4gICAgICBzZWN0aW9uLnNldEF0dHJpYnV0ZXMoaXRlbS5hdHRyaWJ1dGVzKTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChzdWJJdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3ViU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoc3ViSXRlbS5lbGVtZW50KTtcbiAgICAgICAgICBzdWJTZWN0aW9uLnNldEF0dHJpYnV0ZXMoc3ViSXRlbS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKHN1YlNlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGhvbWVTZWN0aW9uLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGhvbWVTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIb21lKCkge1xuICByZXR1cm4gaG9tZUJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvbG9hZGluZy5jc3MnO1xuaW1wb3J0IExvYWRpbmdJY29uIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9wcm9ncmVzc19hY3Rpdml0eS5zdmcnO1xuXG5jb25zdCBsb2FkaW5nQnVpbGRlciA9IHtcbiAgY2FjaGVET00oKSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbG9hZGluZ1NlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgY29uc3QgbG9hZGluZ0ltYWdlID0gY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbG9hZGluZ1NlY3Rpb24uaWQgPSAnbG9hZGluZyc7XG4gICAgbG9hZGluZ0ltYWdlLnNldEF0dHJpYnV0ZXMoeyBvbmxvYWQ6ICdTVkdJbmplY3QodGhpcyknLCBzcmM6IExvYWRpbmdJY29uLCBpZDogJ2xvYWRpbmdfaW1nJyB9KTtcblxuICAgIGxvYWRpbmdTZWN0aW9uLmFwcGVuZENoaWxkKGxvYWRpbmdJbWFnZSk7XG5cbiAgICByZXR1cm4gbG9hZGluZ1NlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhvbWUoKSB7XG4gIHJldHVybiBsb2FkaW5nQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBob21lQnVpbGRlciBmcm9tICcuLi9ob21lL2hvbWUnO1xuaW1wb3J0IGVycm9yQnVpbGRlciBmcm9tICcuLi9lcnJvci9lcnJvcic7XG5pbXBvcnQgdGFic0J1aWxkZXIgZnJvbSAnLi4vdGFicy90YWJzJztcbmltcG9ydCBsb2FkaW5nQnVpbGRlciBmcm9tICcuLi9sb2FkaW5nL2xvYWRpbmcnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvY29udGVudC5jc3MnO1xuXG5jb25zdCBidWlsZCA9IHtcbiAgaG9tZTogaG9tZUJ1aWxkZXIsXG4gIGVycm9yOiBlcnJvckJ1aWxkZXIsXG4gIHRhYnM6IHRhYnNCdWlsZGVyLFxuICBsb2FkaW5nOiBsb2FkaW5nQnVpbGRlcixcbn07XG5cbmNvbnN0IG1haW5CdWlsZGVyID0ge1xuICBhY3RpdmVDb250ZW50OiBudWxsLFxuICBhY3RpdmVUYWI6IG51bGwsXG4gIGluaXQoKSB7fSxcbiAgY2FjaGVET00obWFpbkVsZW1lbnQpIHtcbiAgICB0aGlzLm1haW4gPSBtYWluRWxlbWVudDtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN3aXRjaENvbnRlbnQgPSB0aGlzLnN3aXRjaENvbnRlbnQuYmluZCh0aGlzKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdzd2l0Y2hDb250ZW50JywgdGhpcy5zd2l0Y2hDb250ZW50KTtcbiAgfSxcbiAgcmVuZGVyKGtleSwgZGF0YSwgcmVuZGVyS2V5KSB7XG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGNvbnRlbnQgPSBidWlsZC5ob21lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKGRhdGEsIHJlbmRlcktleSk7XG4gICAgICB0aGlzLm1haW4ubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIHN3aXRjaENvbnRlbnQod2VhdGhlckRhdGEsIHJlbmRlcktleSkge1xuICAgIGxldCBjb250ZW50S2V5O1xuICAgIGlmICh3ZWF0aGVyRGF0YS5lcnJvcikge1xuICAgICAgY29udGVudEtleSA9ICdlcnJvcic7XG4gICAgfSBlbHNlIGlmICh3ZWF0aGVyRGF0YSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICBjb250ZW50S2V5ID0gJ2xvYWRpbmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50S2V5ID0gJ3RhYnMnO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcihjb250ZW50S2V5LCB3ZWF0aGVyRGF0YSwgcmVuZGVyS2V5KTtcbiAgfSxcbiAgc2V0QWN0aXZlVGFiKHRhYikge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gIC8vIHJldHVybiBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgbWFpbi5pZCA9ICdtYWluX2NvbnRlbnQnO1xuICBtYWluQnVpbGRlci5jYWNoZURPTShtYWluKTtcbiAgbWFpbkJ1aWxkZXIuYmluZEV2ZW50cygpO1xuICBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgcmV0dXJuIG1haW47XG59XG4iLCJpbXBvcnQgSWxsdXN0cmF0aW9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pbGx1c3RyYXRpb25zL3VuZHJhd193ZWF0aGVyX2FwcC5zdmcnO1xuaW1wb3J0IEljb25NZW51IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9tZW51LnN2Zyc7XG5pbXBvcnQgSWNvbkdpdGh1YiBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvZ2l0aHViX21hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYXZMZWZ0OiBbXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0gbmF2X2xvZ28nLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBzcmM6IElsbHVzdHJhdGlvbixcbiAgICAgICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdoMScsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICdXZWF0aGVyIEFwcCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgbmF2UmlnaHQ6IFtcbiAgICB7XG4gICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaWQ6ICd1bml0X3N5c3RlbXNfYnV0dG9uJyxcbiAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgY2xhc3M6ICdpbXBlcmlhbCcsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogJ8KwRicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBjbGFzczogJ21ldHJpYycsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogJ8KwQycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBlbGVtZW50OiAnYScsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGhyZWY6ICcjJyxcbiAgICAgICAgY2xhc3M6ICduYXZfaXRlbScsXG4gICAgICAgIHRleHRDb250ZW50OiAnUGxhY2Vob2xkZXInLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVsZW1lbnQ6ICdhJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgICAgdGV4dENvbnRlbnQ6ICdQbGFjZWhvbGRlcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL21pa2V5Q29zL3RoZU9kaW5Qcm9qZWN0L3RyZWUvbWFpbi9qYXZhU2NyaXB0L3Byb2plY3RzL3dlYXRoZXItYXBwJyxcbiAgICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICAgICAgY2xhc3M6ICduYXZfaXRlbScsXG4gICAgICB9LFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdpbWcnLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIHNyYzogSWNvbkdpdGh1YixcbiAgICAgICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgbWVudUJ1dHRvbjoge1xuICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiAnbmF2X2J0bicsXG4gICAgfSxcbiAgICBjaGlsZDoge1xuICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIHNyYzogSWNvbk1lbnUsXG4gICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0ICcuLi8uLi9zdHlsZXMvaGVhZGVyLmNzcyc7XG5pbXBvcnQgbmF2YmFyIGZyb20gJy4vbmF2YmFyLmNvbmZpZyc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHB1YlN1YiBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YlN1Yic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FjaGVET00obmF2RWxlbWVudCkge1xuICAgIHRoaXMubmF2YmFyID0gbmF2RWxlbWVudDtcbiAgICB0aGlzLm5hdlJpZ2h0ID0gbmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X3JpZ2h0Jyk7XG4gICAgdGhpcy5uYXZMaW5rcyA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdl9pdGVtJyk7XG4gICAgdGhpcy5uYXZCdG4gPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfYnRuJyk7XG4gICAgdGhpcy51bml0U3lzdGVtc0J0biA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvcignI3VuaXRfc3lzdGVtc19idXR0b24nKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnRvZ2dsZU5hdiA9IHRoaXMudG9nZ2xlTmF2LmJpbmQodGhpcyk7XG4gICAgdGhpcy5uYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdik7XG4gICAgdGhpcy50b2dnbGVVbml0U3lzdGVtID0gdGhpcy50b2dnbGVVbml0U3lzdGVtLmJpbmQodGhpcyk7XG4gICAgdGhpcy51bml0U3lzdGVtc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlVW5pdFN5c3RlbSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgY29uc3QgbmF2Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmF2RWxlbWVudC5pZCA9ICduYXZiYXInO1xuICAgIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgIE9iamVjdC5rZXlzKG5hdmJhcikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuYXZiYXJba2V5XSkpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChrZXkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbGVmdCcpID8gJ25hdl9sZWZ0JyA6ICduYXZfcmlnaHQnKTtcbiAgICAgICAgbmF2YmFyW2tleV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtLmVsZW1lbnQpO1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlcyhpdGVtLmF0dHJpYnV0ZXMpO1xuXG4gICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gY3JlYXRlRWxlbWVudChjaGlsZC5lbGVtZW50KTtcbiAgICAgICAgICAgICAgY2hpbGROb2RlLnNldEF0dHJpYnV0ZXMoY2hpbGQuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYnRuID0gY3JlYXRlRWxlbWVudChuYXZiYXJba2V5XS5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW1nID0gY3JlYXRlRWxlbWVudChuYXZiYXJba2V5XS5jaGlsZC5lbGVtZW50KTtcbiAgICAgICAgYnRuLnNldEF0dHJpYnV0ZXMobmF2YmFyW2tleV0uYXR0cmlidXRlcyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGVzKG5hdmJhcltrZXldLmNoaWxkLmF0dHJpYnV0ZXMpO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkNvbnRhaW5lcik7XG4gICAgdGhpcy5jYWNoZURPTShuYXZFbGVtZW50KTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiBuYXZFbGVtZW50O1xuICB9LFxuICB0b2dnbGVOYXYoKSB7XG4gICAgaWYgKHRoaXMubmF2UmlnaHQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcbiAgICAgIHRoaXMubmF2UmlnaHQuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdlJpZ2h0LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZVVuaXRTeXN0ZW0oZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgbGV0IG5ld1ZhbHVlID0gdHJ1ZTtcbiAgICBsZXQgdW5pdFN5c3RlbSA9ICdpbXBlcmlhbCc7XG4gICAgaWYgKGVsZW1lbnQudmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgbmV3VmFsdWUgPSBmYWxzZTtcbiAgICAgIHVuaXRTeXN0ZW0gPSAnbWV0cmljJztcbiAgICB9XG4gICAgZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzZXRVbml0U3lzdGVtJywgdW5pdFN5c3RlbSk7XG4gIH0sXG59O1xuIiwiLy8gZm9yZWNhc3RkYXkuZGF0ZSB8XG4vLyAoZm9yZWNhc3RkYXkuZGF5Lm1heHRlbXBfZlxuLy8gZm9yZWNhc3RkYXkuZGF5Lm1pbnRlbXBfZilcbi8vIGZvcmVjYXN0ZGF5LmRheS5jb25kaXRpb25cbi8vIGZvcmVjYXN0ZGF5LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbiB8XG4vLyB3aW5kXG4vLyBOVywgTk5XLCBOLCBOTkUsIE5FXG4vLyBFTkUsIEUsIEVTRVxuLy8gU0UsIFNTRSwgUywgU1NXLCBTV1xuLy8gV1NXLCBXLCBXTldcbi8vIGltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9pbXBvcnRBbGwnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCBmb3JtYXREYXRlIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0RGF0ZSc7XG5pbXBvcnQgeyB1bml0U3lzdGVtIH0gZnJvbSAnLi4vdW5pdHN5c3RlbXMnO1xuXG5jb25zdCBkYXRhID0gKHN0YXRlKSA9PiBbXG4gIHtcbiAgICBrZXk6ICdkYXRlJyxcbiAgICB2YWx1ZTogc3RhdGUuZGF0ZSxcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke2Zvcm1hdERhdGUodGhpcy52YWx1ZSwgdHJ1ZSl9YDtcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAnbWlubWF4dGVtcCcsXG4gICAgbWluOiB7XG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdtaW50ZW1wXycsICd0ZW1wJyksXG4gICAgICBsYWJlbDogJ2xvdycsXG4gICAgfSxcbiAgICBtYXg6IHtcbiAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ21heHRlbXBfJywgJ3RlbXAnKSxcbiAgICAgIGxhYmVsOiAnaGlnaCcsXG4gICAgfSxcbiAgICB1bml0OiAnwrAnLFxuICAgIGxhYmVsOiBgaGlnaCAvIGxvd2AsXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm1heC52YWx1ZX0ke3RoaXMudW5pdH0gLyAke3RoaXMubWluLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGtleTogJ2NvbmRpdGlvbicsXG4gICAgbGFiZWw6IHN0YXRlLmNvbmRpdGlvbi50ZXh0LFxuICAgIGljb246IHN0YXRlLmNvbmRpdGlvbi5pY29uLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH1gO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdwcmVjaXAnLFxuICAgIHZhbHVlOiBzdGF0ZS5kYWlseV9jaGFuY2Vfb2ZfcmFpbixcbiAgICB1bml0OiAnJScsXG4gICAgaWNvbjogc3RhdGUuc2V0SWNvbigncmFpbicpLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgIH0sXG4gIH0sXG5dO1xuXG5jb25zdCBsb2NhdGlvbiA9IChzdGF0ZSkgPT4gKHtcbiAgbG9jYXRpb246IHtcbiAgICBjb3VudHJ5OiBzdGF0ZS5jb3VudHJ5LFxuICAgIGxvY2FsdGltZTogc3RhdGUubG9jYWx0aW1lLFxuICAgIG5hbWU6IHN0YXRlLm5hbWUsXG4gICAgcmVnaW9uOiBzdGF0ZS5yZWdpb24sXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LCAke1xuICAgICAgICB0aGlzLnJlZ2lvbi5sZW5ndGggPT09IDAgfHwgdGhpcy5yZWdpb24gPT09IHRoaXMubmFtZSA/IHRoaXMuY291bnRyeSA6IHRoaXMucmVnaW9uXG4gICAgICB9YDtcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IGZvcmVjYXN0Q29udHJvbGxlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLnNldERheSA9IHRoaXMuc2V0RGF5LmJpbmQodGhpcyk7XG4gICAgY29uc3QgZm9yZWNhc3RkYXkgPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAodGhpcy5zZXREYXkpO1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4ud2VhdGhlckRhdGEubG9jYXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5sb2NhdGlvbihzdGF0ZSksXG4gICAgICBmb3JlY2FzdGRheSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZSh3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxuICBzZXREYXkob2JqKSB7XG4gICAgY29uc3QgZGF5cyA9IG9iajtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgIC4uLnVuaXRTeXN0ZW0sXG4gICAgICAuLi5vYmouZGF5LFxuICAgICAgLi4ub2JqLFxuICAgIH07XG5cbiAgICByZXR1cm4geyAuLi5kYXRhKHN0YXRlKSB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICB0aGlzLnNldFByb3BlcnRpZXMoZm9yZWNhc3RDb250cm9sbGVyLmluaXQod2VhdGhlckRhdGEpKTtcbiAgfSxcbiAgc2V0UHJvcGVydGllcyhvYmopIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gIH0sXG59O1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBmb3JlY2FzdCBmcm9tICcuL2ZvcmVjYXN0LmNvbmZpZyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy90YWJzL2ZvcmVjYXN0LmNzcyc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5pbXBvcnQgZm9ybWF0VGltZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdFRpbWUnO1xuXG5jb25zdCBmb3JlY2FzdEJ1aWxkZXIgPSB7XG4gIGluaXQoKSB7fSxcbiAgY2FjaGVET00oKSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZm9yZWNhc3RTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGZvcmVjYXN0U2VjdGlvbkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IGZvcmVjYXN0U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNvbnN0IGZvcmVjYXN0TG9jYXRpb24gPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgZm9yZWNhc3RUaW1lU3RhbXAgPSBjcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICBmb3JlY2FzdFNlY3Rpb24uaWQgPSAnZm9yZWNhc3QnO1xuICAgIGZvcmVjYXN0U2VjdGlvbkhlYWRpbmcudGV4dENvbnRlbnQgPSAnMyBEYXkgV2VhdGhlcic7XG4gICAgZm9yZWNhc3RMb2NhdGlvbi50ZXh0Q29udGVudCA9IGAgLSAke2ZvcmVjYXN0LmxvY2F0aW9uLnNldFRleHQoKX1gO1xuICAgIGZvcmVjYXN0VGltZVN0YW1wLnRleHRDb250ZW50ID0gYEFzIG9mICR7Zm9yZWNhc3QubGFzdF91cGRhdGVkfWA7XG5cbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nLmFwcGVuZENoaWxkKGZvcmVjYXN0TG9jYXRpb24pO1xuICAgIGZvcmVjYXN0U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChmb3JlY2FzdFNlY3Rpb25IZWFkaW5nKTtcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lU3RhbXApO1xuICAgIGZvcmVjYXN0U2VjdGlvbi5hcHBlbmRDaGlsZChmb3JlY2FzdFNlY3Rpb25IZWFkZXIpO1xuXG4gICAgY29uc3QgZm9yZWNhc3REZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGZvcmVjYXN0RGV0YWlscy5pZCA9ICdmb3JlY2FzdF9kZXRhaWxzJztcblxuICAgIGZvcmVjYXN0LmZvcmVjYXN0ZGF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgICAgY29uc3QgZm9yZWNhc3RkYXkgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGZvcmVjYXN0ZGF5LmNsYXNzTmFtZSA9ICdkYXknO1xuICAgICAgT2JqZWN0LnZhbHVlcyhkYXkpLmZvckVhY2goKGRldGFpbCkgPT4ge1xuICAgICAgICBmb3JlY2FzdGRheS5hcHBlbmQoY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5zZXRUZXh0KCkpKTtcbiAgICAgIH0pO1xuICAgICAgZm9yZWNhc3REZXRhaWxzLmFwcGVuZENoaWxkKGZvcmVjYXN0ZGF5KTtcbiAgICB9KTtcblxuICAgIGZvcmVjYXN0U2VjdGlvbi5hcHBlbmRDaGlsZChmb3JlY2FzdERldGFpbHMpO1xuICAgIHJldHVybiBmb3JlY2FzdFNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZvcmVjYXN0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgZm9yZWNhc3QuaW5pdCh3ZWF0aGVyRGF0YSwgdGltZVN0YW1wKTtcbiAgcmV0dXJuIGZvcmVjYXN0QnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsIi8vIGN1cnJlbnQubGFzdF91cGRhdGVkXG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLnRpbWVcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIudGVtcF9mXG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmNvbmRpdGlvbi50ZXh0XG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmNoYW5jZV9vZl9yYWluXG4vLyAoZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci53aW5kX2RpclxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci53aW5kX21waClcblxuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCB7IHVuaXRTeXN0ZW0gfSBmcm9tICcuLi91bml0c3lzdGVtcyc7XG5cbmNvbnN0IGRhdGEgPSAoc3RhdGUpID0+ICh7XG4gIHN1bW1hcnk6IFtcbiAgICB7XG4gICAgICBuYW1lOiAndGltZScsXG4gICAgICB2YWx1ZTogc3RhdGUudGltZSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXRUaW1lKHRoaXMudmFsdWUpfWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3RlbXAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndGVtcF8nLCAndGVtcCcpLFxuICAgICAgdW5pdDogJ8KwJyxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2NvbmRpdGlvbicsXG4gICAgICBsYWJlbDogc3RhdGUuY29uZGl0aW9uLnRleHQsXG4gICAgICBpY29uOiBzdGF0ZS5jb25kaXRpb24uaWNvbixcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVsfWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3ByZWNpcCcsXG4gICAgICB2YWx1ZTogc3RhdGUuY2hhbmNlX29mX3JhaW4sXG4gICAgICB1bml0OiAnJScsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdyYWluJyksXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd3aW5kJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3dpbmRfJywgJ3NwZWVkJyksXG4gICAgICB1bml0OiBzdGF0ZS5nZXQoJ3NwZWVkJyksXG4gICAgICBsYWJlbDogJ3dpbmQnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignd2luZCcpLFxuICAgICAgZGlyOiB7XG4gICAgICAgIHZhbHVlOiBzdGF0ZS53aW5kX2RpcixcbiAgICAgIH0sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5kaXIudmFsdWV9ICR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgZGV0YWlsczogW1xuICAgIHtcbiAgICAgIGtleTogJ2ZlZWxzbGlrZScsXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnZmVlbHNsaWtlXycsICd0ZW1wJyksXG4gICAgICBsYWJlbDogJ2ZlZWxzIGxpa2UnLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICd3aW5kJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3dpbmRfJywgJ3NwZWVkJyksXG4gICAgICB1bml0OiBzdGF0ZS5nZXQoJ3NwZWVkJyksXG4gICAgICBsYWJlbDogJ3dpbmQnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignd2luZCcpLFxuICAgICAgZGlyOiB7XG4gICAgICAgIHZhbHVlOiBzdGF0ZS53aW5kX2RpcixcbiAgICAgIH0sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5kaXIudmFsdWV9ICR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdodW1pZGl0eScsXG4gICAgICB2YWx1ZTogc3RhdGUuaHVtaWRpdHksXG4gICAgICB1bml0OiAnJScsXG4gICAgICBsYWJlbDogJ2h1bWlkaXR5JyxcbiAgICAgIGljb246IHN0YXRlLnNldEljb24oJ2h1bWlkaXR5JyksXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3V2JyxcbiAgICAgIHZhbHVlOiBzdGF0ZS51dixcbiAgICAgIGxhYmVsOiAnVVYgSW5kZXgnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbigndXYnKSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSBvZiAxMWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnY2xvdWQnLFxuICAgICAgdmFsdWU6IHN0YXRlLmNsb3VkLFxuICAgICAgdW5pdDogJyUnLFxuICAgICAgbGFiZWw6ICdjbG91ZCBjb3ZlcicsXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3ByZWNpcCcsXG4gICAgICB2YWx1ZTogc3RhdGUucHJlY2lwX2luLFxuICAgICAgdW5pdDogc3RhdGUuZ2V0KCdwcmVjaXAnKSxcbiAgICAgIGxhYmVsOiAncHJlY2lwIGFtb3VudCcsXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxufSk7XG5cbmNvbnN0IGRhdGUgPSAoc3RhdGUpID0+ICh7XG4gIGRhdGU6IHN0YXRlLmRhdGUsXG59KTtcblxuY29uc3QgbG9jYXRpb24gPSAoc3RhdGUpID0+ICh7XG4gIGxvY2F0aW9uOiB7XG4gICAgY291bnRyeTogc3RhdGUuY291bnRyeSxcbiAgICBsb2NhbHRpbWU6IHN0YXRlLmxvY2FsdGltZSxcbiAgICBuYW1lOiBzdGF0ZS5uYW1lLFxuICAgIHJlZ2lvbjogc3RhdGUucmVnaW9uLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSwgJHtcbiAgICAgICAgdGhpcy5yZWdpb24ubGVuZ3RoID09PSAwIHx8IHRoaXMucmVnaW9uID09PSB0aGlzLm5hbWUgPyB0aGlzLmNvdW50cnkgOiB0aGlzLnJlZ2lvblxuICAgICAgfWA7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBob3VybHlDb250cm9sbGVyID0ge1xuICBpbml0KHdlYXRoZXJEYXRhKSB7XG4gICAgdGhpcy53ZWF0aGVyRGF0YSA9IHdlYXRoZXJEYXRhO1xuICAgIHRoaXMuc2V0QXJyYXkgPSB0aGlzLnNldEFycmF5LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRIb3VycyA9IHRoaXMuc2V0SG91cnMuYmluZCh0aGlzKTtcbiAgICBjb25zdCBmb3JlY2FzdGRheSA9IHdlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5Lm1hcCh0aGlzLnNldEFycmF5KTtcblxuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4ud2VhdGhlckRhdGEsXG4gICAgICAuLi53ZWF0aGVyRGF0YS5sb2NhdGlvbixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmxvY2F0aW9uKHN0YXRlKSxcbiAgICAgIGZvcmVjYXN0ZGF5LFxuICAgICAgbGFzdF91cGRhdGVkOiBmb3JtYXRUaW1lKHN0YXRlLmN1cnJlbnQubGFzdF91cGRhdGVkKS50b0xvd2VyQ2FzZSgpLFxuICAgIH07XG4gIH0sXG4gIHNldEFycmF5KG9iaikge1xuICAgIGNvbnN0IGhvdXJzID0gb2JqLmhvdXIucmVkdWNlKHRoaXMuc2V0SG91cnMsIFtdKTtcbiAgICBjb25zdCBzdGF0ZSA9IHsgLi4ub2JqIH07XG5cbiAgICByZXR1cm4geyAuLi5kYXRlKHN0YXRlKSwgaG91cnMgfTtcbiAgfSxcbiAgc2V0SG91cnMoZmlsdGVyZWQsIGhvdXIpIHtcbiAgICBjb25zdCBkYXRlMSA9IG5ldyBEYXRlKHRoaXMud2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWQpO1xuICAgIGNvbnN0IGRhdGUyID0gbmV3IERhdGUoaG91ci50aW1lKTtcblxuICAgIGlmIChkYXRlMS5nZXRUaW1lKCkgPD0gZGF0ZTIuZ2V0VGltZSgpKSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4udW5pdFN5c3RlbSxcbiAgICAgICAgLi4uaG91cixcbiAgICAgIH07XG4gICAgICBmaWx0ZXJlZC5wdXNoKHsgLi4uZGF0YShzdGF0ZSkgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICB0aGlzLnNldFByb3BlcnRpZXMoaG91cmx5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICAgIC8vIHRoaXMuc2V0UHJvcGVydGllcyhob3VybHlDb250cm9sbGVyLmluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0pKTtcbiAgfSxcbiAgc2V0UHJvcGVydGllcyhvYmopIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gIH0sXG59O1xuLy8gRGF0ZVxuLy8gdGltZSB8IHRlbXAgfCBjb25kaXRpb24gfCBwcmVjaXB0YXRpb24gJSB8IHdpbmRcbi8vIGV4YW1wbGVcbi8vIDE6MzAgcG0gfCA0N8KwIHwgU3VubnkgfCAxJSB8IE4gNiBtcGhcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaG91cmx5IGZyb20gJy4vaG91cmx5LmNvbmZpZyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy90YWJzL2hvdXJseS5jc3MnO1xuaW1wb3J0IGZvcm1hdERhdGUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXREYXRlJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5cbmNvbnN0IGhvdXJseUJ1aWxkZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHt9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGhvdXJseVNlY3Rpb25IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgY29uc3QgaG91cmx5TG9jYXRpb24gPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaG91cmx5VGltZVN0YW1wID0gY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgaG91cmx5U2VjdGlvbi5pZCA9ICdob3VybHknO1xuICAgIGhvdXJseVNlY3Rpb25IZWFkaW5nLnRleHRDb250ZW50ID0gJ0hvdXJseSB3ZWF0aGVyJztcbiAgICBob3VybHlMb2NhdGlvbi50ZXh0Q29udGVudCA9IGAgLSAke2hvdXJseS5sb2NhdGlvbi5zZXRUZXh0KCl9YDtcbiAgICBob3VybHlUaW1lU3RhbXAudGV4dENvbnRlbnQgPSBgQXMgb2YgJHtob3VybHkubGFzdF91cGRhdGVkfWA7XG5cbiAgICBob3VybHlTZWN0aW9uSGVhZGluZy5hcHBlbmRDaGlsZChob3VybHlMb2NhdGlvbik7XG4gICAgaG91cmx5U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChob3VybHlTZWN0aW9uSGVhZGluZyk7XG4gICAgaG91cmx5U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChob3VybHlUaW1lU3RhbXApO1xuICAgIGhvdXJseVNlY3Rpb24uYXBwZW5kQ2hpbGQoaG91cmx5U2VjdGlvbkhlYWRlcik7XG5cbiAgICBjb25zdCBob3VybHlEZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGhvdXJseURldGFpbHMuaWQgPSAnaG91cmx5X2RldGFpbHMnO1xuXG4gICAgaG91cmx5LmZvcmVjYXN0ZGF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgICAgY29uc3QgaG91cmx5RGF5ID0gY3JlYXRlRWxlbWVudCgnb2wnKTtcbiAgICAgIGNvbnN0IGhvdXJseURheUhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgaG91cmx5RGF5LmNsYXNzTmFtZSA9ICdkYXknO1xuICAgICAgaG91cmx5RGF5SGVhZGluZy50ZXh0Q29udGVudCA9IGZvcm1hdERhdGUoZGF5LmRhdGUpO1xuICAgICAgaG91cmx5RGF5LmFwcGVuZENoaWxkKGhvdXJseURheUhlYWRpbmcpO1xuICAgICAgZGF5LmhvdXJzLmZvckVhY2goKGhvdXIpID0+IHtcbiAgICAgICAgY29uc3QgaG91ckNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3VyQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdob3VyJztcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhob3VyLnN1bW1hcnkpLmZvckVhY2goKGRldGFpbCkgPT4ge1xuICAgICAgICAgIGhvdXJDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBjcmVhdGVDb250ZW50Um93cyhjcmVhdGVFbGVtZW50LCBudWxsLCBkZXRhaWwuaWNvbiwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaG91cmx5RGF5LmFwcGVuZENoaWxkKGhvdXJDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgICBob3VybHlEZXRhaWxzLmFwcGVuZENoaWxkKGhvdXJseURheSk7XG4gICAgfSk7XG5cbiAgICBob3VybHlTZWN0aW9uLmFwcGVuZENoaWxkKGhvdXJseURldGFpbHMpO1xuICAgIHJldHVybiBob3VybHlTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIb3VybHkod2VhdGhlckRhdGEsIHRpbWVTdGFtcCkge1xuICBob3VybHkuaW5pdCh3ZWF0aGVyRGF0YSwgdGltZVN0YW1wKTtcbiAgcmV0dXJuIGhvdXJseUJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGJ1aWxkVGFic05hdmJhciBmcm9tICcuL3RhYnNfbmF2YmFyL3RhYnNfbmF2YmFyJztcbmltcG9ydCBidWlsZFRvZGF5IGZyb20gJy4vdG9kYXkvdG9kYXknO1xuaW1wb3J0IGJ1aWxkSG91cmx5IGZyb20gJy4vaG91cmx5L2hvdXJseSc7XG5pbXBvcnQgYnVpbGRGb3JlY2FzdCBmcm9tICcuL2ZvcmVjYXN0L2ZvcmVjYXN0JztcbmltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvdGFicy90YWJzLmNzcyc7XG5cbmNvbnN0IGJ1aWxkID0ge1xuICB0YWJzTmF2YmFyOiBidWlsZFRhYnNOYXZiYXIsXG4gIHRvZGF5OiBidWlsZFRvZGF5LFxuICBob3VybHk6IGJ1aWxkSG91cmx5LFxuICBmb3JlY2FzdDogYnVpbGRGb3JlY2FzdCxcbn07XG5cbmNvbnN0IHRhYnNCdWlsZGVyID0ge1xuICBpbml0KHdlYXRoZXJEYXRhKSB7XG4gICAgdGhpcy50aW1lU3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICB0aGlzLnNldFdlYXRoZXIod2VhdGhlckRhdGEpO1xuICAgIHRoaXMuc3dpdGNoVGFiID0gdGhpcy5zd2l0Y2hUYWIuYmluZCh0aGlzKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdyZW5kZXInLCB0aGlzLnJlbmRlcik7XG4gIH0sXG4gIHNldFdlYXRoZXIod2VhdGhlckRhdGEpIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgdGhpcy5sb2NhdGlvbiA9IHdlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWU7XG4gICAgdGhpcy5hcGlMYXN0VXBkYXRlZCA9IHdlYXRoZXJEYXRhLmN1cnJlbnQubGFzdF91cGRhdGVkX2Vwb2NoO1xuICB9LFxuICBjYWNoZURPTSh0YWJzU2VjdGlvbikge1xuICAgIHRoaXMudGFic1NlY3Rpb24gPSB0YWJzU2VjdGlvbjtcbiAgICB0aGlzLnRhYnNMaXN0ID0gdGFic1NlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfbGlzdF9pdGVtID4gYScpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3dpdGNoVGFiID0gdGhpcy5zd2l0Y2hUYWIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRhYnNMaXN0LmZvckVhY2goKHRhYikgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zd2l0Y2hUYWIpKTtcbiAgfSxcbiAgcmVuZGVyKGtleSkge1xuICAgIGxldCBjb250ZW50O1xuICAgIGlmICgha2V5KSB7XG4gICAgICBjb250ZW50ID0gYnVpbGQudG9kYXkodGhpcy53ZWF0aGVyRGF0YSwgdGhpcy50aW1lU3RhbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gYnVpbGRba2V5XSh0aGlzLndlYXRoZXJEYXRhLCB0aGlzLnRpbWVTdGFtcCk7XG4gICAgfVxuICAgIHRoaXMuc2V0QWN0aXZlVGFiKGNvbnRlbnQuaWQpO1xuICAgIHRoaXMudGFic1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIHN3aXRjaFRhYihlKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWU6IGVsZW1lbnRDbGFzc05hbWUgfSA9IGUuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCByZW5kZXJLZXkgPSBlbGVtZW50Q2xhc3NOYW1lO1xuXG4gICAgcHViU3ViLnB1Ymxpc2goJ2dldFdlYXRoZXInLCB0aGlzLmxvY2F0aW9uLCByZW5kZXJLZXkpO1xuICB9LFxuICBzZXRBY3RpdmVUYWIoaWQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IFsuLi50aGlzLnRhYnNMaXN0XS5maW5kKChhbmNob3IpID0+IGFuY2hvci5jbGFzc0xpc3QuY29udGFpbnMoaWQpKTtcbiAgICB0aGlzLmFjdGl2ZVRhYi5zZXRBdHRyaWJ1dGVzKHsgJ2RhdGEtYWN0aXZlJzogdHJ1ZSB9KTtcbiAgICB0aGlzLmFjdGl2ZUtleSA9IGlkO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzZXRBY3RpdmVUYWInLCBpZCk7XG4gICAgLy8gc2VuZHMgaWQgdG8gc2V0QWN0aXZlVGFiIGluIGhlYWRlci5qcyBtb2R1bGVcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVGFicyh3ZWF0aGVyRGF0YSwgcmVuZGVyS2V5KSB7XG4gIHRhYnNCdWlsZGVyLmluaXQod2VhdGhlckRhdGEpO1xuICBjb25zdCB0YWJzU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgdGFic1NlY3Rpb24uaWQgPSAndGFicyc7XG4gIHRhYnNTZWN0aW9uLmFwcGVuZENoaWxkKGJ1aWxkLnRhYnNOYXZiYXIoKSk7XG4gIHRhYnNCdWlsZGVyLmNhY2hlRE9NKHRhYnNTZWN0aW9uKTtcbiAgaWYgKHJlbmRlcktleSkge1xuICAgIHRhYnNCdWlsZGVyLnJlbmRlcihyZW5kZXJLZXkpO1xuICB9IGVsc2Uge1xuICAgIHRhYnNCdWlsZGVyLnJlbmRlcigpO1xuICB9XG4gIHRhYnNCdWlsZGVyLmJpbmRFdmVudHMoKTtcbiAgcmV0dXJuIHRhYnNTZWN0aW9uO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICd0b2RheScsXG4gICAgICB0ZXh0Q29udGVudDogJ1RvZGF5JyxcbiAgICAgIGhyZWY6ICcjJyxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICdob3VybHknLFxuICAgICAgdGV4dENvbnRlbnQ6ICdIb3VybHknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ2ZvcmVjYXN0JyxcbiAgICAgIHRleHRDb250ZW50OiAnMy1EYXknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCB0YWJzIGZyb20gJy4vdGFic19uYXZiYXIuY29uZmlnJztcblxuY29uc3QgdGFic05hdmJhckJ1aWxkZXIgPSB7XG4gIGluaXQoKSB7fSxcbiAgY2FjaGVET00oKSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgdGFic05hdmJhciA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCB0YWJzTGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGFic05hdmJhci5pZCA9ICd0YWJzX25hdmJhcic7XG4gICAgT2JqZWN0LnZhbHVlcyh0YWJzKS5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgIGNvbnN0IHRhYnNMaXN0SXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBjb25zdCB0YWJzTmF2QW5jaG9yID0gY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdGFic0xpc3RJdGVtLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3RhYnNfbGlzdF9pdGVtJyB9KTtcbiAgICAgIHRhYnNOYXZBbmNob3Iuc2V0QXR0cmlidXRlcyh0YWIuYXR0cmlidXRlcyk7XG5cbiAgICAgIHRhYnNMaXN0SXRlbS5hcHBlbmRDaGlsZCh0YWJzTmF2QW5jaG9yKTtcbiAgICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYnNMaXN0SXRlbSk7XG4gICAgfSk7XG5cbiAgICB0YWJzTmF2YmFyLmFwcGVuZENoaWxkKHRhYnNMaXN0KTtcbiAgICByZXR1cm4gdGFic05hdmJhcjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVGFic05hdmJhcigpIHtcbiAgcmV0dXJuIHRhYnNOYXZiYXJCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCB7IHVuaXRTeXN0ZW0gfSBmcm9tICcuLi91bml0c3lzdGVtcyc7XG5cbmNvbnN0IGRhdGEgPSAoc3RhdGUpID0+ICh7XG4gIHN1bW1hcnk6IFtcbiAgICB7XG4gICAgICBrZXk6ICd0ZW1wJyxcbiAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd0ZW1wXycsICd0ZW1wJyksXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2NvbmRpdGlvbicsXG4gICAgICBsYWJlbDogc3RhdGUuY29uZGl0aW9uLnRleHQsXG4gICAgICBpY29uOiBzdGF0ZS5jb25kaXRpb24uaWNvbixcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVsfWA7XG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIGRldGFpbHM6IHtcbiAgICBoZWFkZXI6IFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnZmVlbHNsaWtlJyxcbiAgICAgICAgdW5pdDogJ8KwJyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnZmVlbHNsaWtlXycsICd0ZW1wJyksXG4gICAgICAgIGxhYmVsOiAnZmVlbHMgbGlrZScsXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3N1bnJpc2UnLFxuICAgICAgICB2YWx1ZTogZm9ybWF0VGltZShzdGF0ZS5zdW5yaXNlKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBsYWJlbDogJ3N1bnJpc2UnLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdzdW5yaXNlJyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3N1bnNldCcsXG4gICAgICAgIHZhbHVlOiBmb3JtYXRUaW1lKHN0YXRlLnN1bnNldCkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgbGFiZWw6ICdzdW5zZXQnLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdzdW5zZXQnKSxcbiAgICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICAgIGJvZHk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWlubWF4dGVtcCcsXG4gICAgICAgIG1pbjoge1xuICAgICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZS5kYXksICdtaW50ZW1wXycsICd0ZW1wJyksXG4gICAgICAgICAgbGFiZWw6ICdsb3cnLFxuICAgICAgICB9LFxuICAgICAgICBtYXg6IHtcbiAgICAgICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUuZGF5LCAnbWF4dGVtcF8nLCAndGVtcCcpLFxuICAgICAgICAgIGxhYmVsOiAnaGlnaCcsXG4gICAgICAgIH0sXG4gICAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICAgIGxhYmVsOiBgaGlnaCAvIGxvd2AsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ21pbm1heHRlbXAnKSxcbiAgICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgICByZXR1cm4gYCR7dGhpcy5tYXgudmFsdWV9JHt0aGlzLnVuaXR9IC8gJHt0aGlzLm1pbi52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnaHVtaWRpdHknLFxuICAgICAgICB2YWx1ZTogc3RhdGUuaHVtaWRpdHksXG4gICAgICAgIHVuaXQ6ICclJyxcbiAgICAgICAgbGFiZWw6ICdodW1pZGl0eScsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ2h1bWlkaXR5JyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAncHJlc3N1cmVfJywgJ3ByZXNzdXJlJyksXG4gICAgICAgIHVuaXQ6IHN0YXRlLmdldCgncHJlc3N1cmUnKSxcbiAgICAgICAgbGFiZWw6ICdwcmVzc3VyZScsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3ByZXNzdXJlJyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9ICR7dGhpcy51bml0fWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICd2aXMnLFxuICAgICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd2aXNfJywgJ2Rpc3RhbmNlJyksXG4gICAgICAgIHVuaXQ6IHN0YXRlLmdldCgnZGlzdGFuY2UnKSxcbiAgICAgICAgbGFiZWw6ICd2aXNpYmlsaXR5JyxcbiAgICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbigndmlzaWJpbGl0eScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnd2luZCcsXG4gICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3dpbmRfJywgJ3NwZWVkJyksXG4gICAgICAgIHVuaXQ6IHN0YXRlLmdldCgnc3BlZWQnKSxcbiAgICAgICAgbGFiZWw6ICd3aW5kJyxcbiAgICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignd2luZCcpLFxuICAgICAgICBkaXI6IHtcbiAgICAgICAgICB2YWx1ZTogc3RhdGUud2luZF9kaXIsXG4gICAgICAgIH0sXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMuZGlyLnZhbHVlfSAke3RoaXMudmFsdWV9ICR7dGhpcy51bml0fWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICd1dicsXG4gICAgICAgIHZhbHVlOiBzdGF0ZS51dixcbiAgICAgICAgbGFiZWw6ICdVViBJbmRleCcsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3V2JyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9IG9mIDExYDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn0pO1xuXG5jb25zdCBsb2NhdGlvbiA9IChzdGF0ZSkgPT4gKHtcbiAgY291bnRyeTogc3RhdGUuY291bnRyeSxcbiAgbG9jYWx0aW1lOiBzdGF0ZS5sb2NhbHRpbWUsXG4gIG5hbWU6IHN0YXRlLm5hbWUsXG4gIHJlZ2lvbjogc3RhdGUucmVnaW9uLFxuICBzZXRUZXh0KCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LCAke1xuICAgICAgdGhpcy5yZWdpb24ubGVuZ3RoID09PSAwIHx8IHRoaXMucmVnaW9uID09PSB0aGlzLm5hbWUgPyB0aGlzLmNvdW50cnkgOiB0aGlzLnJlZ2lvblxuICAgIH1gO1xuICB9LFxufSk7XG5cbmNvbnN0IHRvZGF5Q29udHJvbGxlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgIC4uLnVuaXRTeXN0ZW0sXG4gICAgICAuLi53ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXSxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLFxuICAgICAgLi4ud2VhdGhlckRhdGEuY3VycmVudCxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmxvY2F0aW9uLFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRhdGEoc3RhdGUpLFxuICAgICAgbG9jYXRpb246IGxvY2F0aW9uKHN0YXRlKSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZSh3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICAgIHRoaXMuc2V0UHJvcGVydGllcyh0b2RheUNvbnRyb2xsZXIuaW5pdCh3ZWF0aGVyRGF0YSkpO1xuICB9LFxuICBzZXRQcm9wZXJ0aWVzKG9iaikge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb2JqKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGNyZWF0ZUNvbnRlbnRSb3dzIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlQ29udGVudFJvd3MnO1xuaW1wb3J0IHRvZGF5IGZyb20gJy4vdG9kYXkuY29uZmlnJztcbmltcG9ydCAnLi4vLi4vLi4vc3R5bGVzL3RhYnMvdG9kYXkuY3NzJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5cbmNvbnN0IHRvZGF5QnVpbGRlciA9IHtcbiAgaW5pdCgpIHt9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0b2RheVNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG5cbiAgICB0b2RheVNlY3Rpb24uaWQgPSAndG9kYXknO1xuXG4gICAgY29uc3QgdG9kYXlTdW1tYXJ5ID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IHRvZGF5SGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgdG9kYXlTZWN0aW9uSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgY29uc3QgdG9kYXlUaW1lU3RhbXAgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICB0b2RheVN1bW1hcnkuaWQgPSAndG9kYXlfc3VtbWFyeSc7XG4gICAgdG9kYXlTZWN0aW9uSGVhZGluZy50ZXh0Q29udGVudCA9IGAke3RvZGF5LmxvY2F0aW9uLnNldFRleHQoKX0gYDtcbiAgICB0b2RheVRpbWVTdGFtcC50ZXh0Q29udGVudCA9IGBBcyBvZiAke3RvZGF5Lmxhc3RfdXBkYXRlZH1gO1xuXG4gICAgdG9kYXlTZWN0aW9uSGVhZGluZy5hcHBlbmRDaGlsZCh0b2RheVRpbWVTdGFtcCk7XG4gICAgdG9kYXlIZWFkZXIuYXBwZW5kQ2hpbGQodG9kYXlTZWN0aW9uSGVhZGluZyk7XG4gICAgdG9kYXlTdW1tYXJ5LmFwcGVuZENoaWxkKHRvZGF5SGVhZGVyKTtcblxuICAgIHRvZGF5LnN1bW1hcnkuZm9yRWFjaCgoZGV0YWlsKSA9PiB7XG4gICAgICB0b2RheVN1bW1hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUNvbnRlbnRSb3dzKGNyZWF0ZUVsZW1lbnQsIG51bGwsIGRldGFpbC5pY29uLCBkZXRhaWwuc2V0VGV4dCgpKSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2RheURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgdG9kYXlEZXRhaWxzLmlkID0gJ3RvZGF5X2RldGFpbHMnO1xuXG4gICAgY29uc3QgdG9kYXlEZXRhaWxzSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9kYXlEZXRhaWxzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kYXlEZXRhaWxzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3RvZGF5X2RldGFpbHNfaGVhZGVyJyk7XG4gICAgdG9kYXlEZXRhaWxzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZGF5X2RldGFpbHNfY29udGFpbmVyJyk7XG5cbiAgICB0b2RheURldGFpbHNIZWFkZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBjcmVhdGVDb250ZW50Um93cyhcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgdG9kYXkuZGV0YWlscy5oZWFkZXJbMF0uaWNvbixcbiAgICAgICAgdG9kYXkuZGV0YWlscy5oZWFkZXJbMF0ubGFiZWwsXG4gICAgICAgIHRvZGF5LmRldGFpbHMuaGVhZGVyWzBdLnNldFRleHQoKSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGNvbnN0IHRvZGF5RGV0YWlsc1N1biA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZGF5RGV0YWlsc1N1bi5jbGFzc0xpc3QuYWRkKCd0b2RheV9kZXRhaWxzX3N1bicpO1xuICAgIHRvZGF5LmRldGFpbHMuaGVhZGVyLmZvckVhY2goKGRldGFpbCwgaSkgPT4ge1xuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIHRvZGF5RGV0YWlsc1N1bi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBjcmVhdGVDb250ZW50Um93cyhjcmVhdGVFbGVtZW50LCBudWxsLCBkZXRhaWwuaWNvbiwgZGV0YWlsLmxhYmVsLCBkZXRhaWwuc2V0VGV4dCgpKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRvZGF5LmRldGFpbHMuYm9keS5mb3JFYWNoKChkZXRhaWwpID0+IHtcbiAgICAgIHRvZGF5RGV0YWlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5sYWJlbCwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdG9kYXlEZXRhaWxzSGVhZGVyLmFwcGVuZENoaWxkKHRvZGF5RGV0YWlsc1N1bik7XG4gICAgdG9kYXlTZWN0aW9uLmFwcGVuZENoaWxkKHRvZGF5U3VtbWFyeSk7XG4gICAgdG9kYXlEZXRhaWxzLmFwcGVuZENoaWxkKHRvZGF5RGV0YWlsc0hlYWRlcik7XG4gICAgdG9kYXlEZXRhaWxzLmFwcGVuZENoaWxkKHRvZGF5RGV0YWlsc0NvbnRhaW5lcik7XG4gICAgdG9kYXlTZWN0aW9uLmFwcGVuZENoaWxkKHRvZGF5RGV0YWlscyk7XG5cbiAgICByZXR1cm4gdG9kYXlTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRUb2RheSh3ZWF0aGVyRGF0YSwgdGltZVN0YW1wKSB7XG4gIHRvZGF5LmluaXQod2VhdGhlckRhdGEsIHRpbWVTdGFtcCk7XG4gIHJldHVybiB0b2RheUJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcblxuZXhwb3J0IGNvbnN0IHVuaXRTeXN0ZW0gPSB7XG4gIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi8uLi9hc3NldHMvaWNvbnMnLCBmYWxzZSwgL1xcLnN2ZyQvKSksXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy51bml0U3lzdGVtW2tleV07XG4gIH0sXG4gIHNldEljb24oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbnMuZmlsZXNbT2JqZWN0LmtleXModGhpcy5pY29ucy5maWxlcykuZmluZCgoaWNvbktleSkgPT4gaWNvbktleS5pbmNsdWRlcyhrZXkpKV07XG4gIH0sXG4gIHJvdW5kVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSk7XG4gIH0sXG4gIHNldFZhbHVlKG9iaiwgLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUob2JqW2Ake2FyZ3NbMF19JHt0aGlzLmdldChhcmdzWzFdKX1gXSk7XG4gIH0sXG59O1xuXG5jb25zdCB1bml0U3lzdGVtcyA9IHtcbiAgbWV0cmljOiB7XG4gICAgdGVtcDogJ2MnLFxuICAgIHNwZWVkOiAna3BoJyxcbiAgICBwcmVjaXBpdGF0aW9uOiAnbW0nLFxuICAgIHByZXNzdXJlOiAnbWInLFxuICAgIGRpc3RhbmNlOiAna20nLFxuICB9LFxuICBpbXBlcmlhbDoge1xuICAgIHRlbXA6ICdmJyxcbiAgICBzcGVlZDogJ21waCcsXG4gICAgcHJlY2lwaXRhdGlvbjogJ2luJyxcbiAgICBwcmVzc3VyZTogJ2luJyxcbiAgICBkaXN0YW5jZTogJ21pbGVzJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVbml0U3lzdGVtKHNlbGVjdGlvbikge1xuICBPYmplY3QuYXNzaWduKHVuaXRTeXN0ZW0sIHsgdW5pdFN5c3RlbTogdW5pdFN5c3RlbXNbc2VsZWN0aW9uXSB9KTtcbn1cbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xuLy8gdXNlIFdlYXRoZXJBUElcbi8vIGh0dHBzOi8vd3d3LndlYXRoZXJhcGkuY29tL2RvY3MvXG4vLyBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9ODRhYzczMTBlNTY0NDhhMTg5NjIxMjczMTIzMDYxMSZxPUxvbmRvblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKHZhbHVlLCB0YWJLZXkpIHtcbiAgLy8gKm5vdGUsIHZhbHVlIGRvZXMgTk9UIG5lZWQgdG8gYmUgZXZhbHVhdGVkIGJlZm9yZSBmZXRjaFxuICAvLyBwb3N0YWwgY29kZSwgbnVtYmVyIG9yIHN0cmluZ1xuICAvLyBjaXR5LCB1cHBlcmNhc2Ugb3IgbG93ZXJjYXNlO1xuICBwdWJTdWIucHVibGlzaCgnc3dpdGNoQ29udGVudCcsICdsb2FkaW5nJyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PTg0YWM3MzEwZTU2NDQ4YTE4OTYyMTI3MzEyMzA2MTEmcT0ke3ZhbHVlfSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2AsXG4gICAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBwdWJTdWIucHVibGlzaChcbiAgICAgICdzd2l0Y2hDb250ZW50JyxcbiAgICAgICFyZXNwb25zZS5vayA/IE9iamVjdC5hc3NpZ24ocmVzcG9uc2UsIHdlYXRoZXJEYXRhKSA6IHdlYXRoZXJEYXRhLFxuICAgICAgdGFiS2V5LFxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGUgJHtyZXNwb25zZS5zdGF0dXN9LCAke3dlYXRoZXJEYXRhLmVycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgLy8gY29kZSBiZWxvdyB0aGUgaWYgYmxvY2sgd2lsbCBvbmx5IHJ1biBpZiB0aGVyZSBhcmUgbm8gZXJyb3JzXG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2dldFdlYXRoZXInLCBnZXRXZWF0aGVyKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgc3Vic2NyaWJlcnM6IHt9LFxuICBzdWJzY3JpYmUoc3Vic2NyaWJlciwgZm4pIHtcbiAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdID0gdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSB8fCBbXTtcbiAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLnB1c2goZm4pO1xuICB9LFxuICB1bnN1YnNjcmliZShzdWJzY3JpYmVyLCBmbikge1xuICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdID0gdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5maWx0ZXIoXG4gICAgICAgIChoYW5kbGVyKSA9PiBoYW5kbGVyICE9PSBmbixcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICBwdWJsaXNoKHN1YnNjcmliZXIsIC4uLmRhdGEpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgICBmbiguLi5kYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250ZW50Um93cyhmbiwgYXR0cmlidXRlcywgLi4uYXJncykge1xuICBjb25zdCBjb250YWluZXJBdHRyaWJ1dGVzID0gYXR0cmlidXRlcyA/IGF0dHJpYnV0ZXNbMV0gOiBmYWxzZTtcbiAgY29uc3QgaXRlbUF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzID8gYXR0cmlidXRlc1syXSA6IGZhbHNlO1xuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGZuKCd1bCcpO1xuICBpZiAoY29udGFpbmVyQXR0cmlidXRlcykge1xuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVzKGNvbnRhaW5lckF0dHJpYnV0ZXMpO1xuICB9XG4gIGFyZ3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGZuKCdsaScpO1xuICAgICAgaWYgKGl0ZW1BdHRyaWJ1dGVzKSBpdGVtLnNldEF0dHJpYnV0ZXMoaXRlbUF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKC9cXC5bc3ZnfHBuZ117M30kLy50ZXN0KGl0ZW0pKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IGZuKCdpbWcnKTtcbiAgICAgICAgaWYgKC9cXC5bc3ZnXXszfSQvLnRlc3QoaXRlbSkpIGltZy5zZXRBdHRyaWJ1dGVzKHsgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyB9KTtcbiAgICAgICAgaW1nLnNyYyA9IGl0ZW07XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IGl0ZW07XG4gICAgICB9XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCJjb25zdCBzZXRFbGVtZW50U3RhdGUgPSAoKSA9PiAoe1xuICBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGlmIChrZXkgIT09ICd0ZXh0Q29udGVudCcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFRleHRDb250ZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgc2V0VGV4dENvbnRlbnQodGV4dCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxufSk7XG5cbmNvbnN0IGJ1aWxkRWxlbWVudCA9ICh0YWdOYW1lKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIHRhZ05hbWUsXG4gIH07XG5cbiAgcmV0dXJuIHsgLi4uc2V0RWxlbWVudFN0YXRlKHN0YXRlKSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gIGNvbnN0IGh0bWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgT2JqZWN0LmFzc2lnbihodG1sRWxlbWVudCwgYnVpbGRFbGVtZW50KGh0bWxFbGVtZW50KSk7XG5cbiAgcmV0dXJuIGh0bWxFbGVtZW50O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBib29sZWFuKSB7XG4gIC8vIHRoaXMgcmV0dXJucyBhIGZvcm1hdCBbRGF5LCBNb250aCBEYXRlXVxuICAvLyBleDogV2VkbmVzZGF5LCBBcHJpbCAxNFxuICBjb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICBjb25zdCBtb250aHMgPSBbXG4gICAgJ0phbnVhcnknLFxuICAgICdGZWJydWFyeScsXG4gICAgJ01hcmNoJyxcbiAgICAnQXByaWwnLFxuICAgICdNYXknLFxuICAgICdKdW5lJyxcbiAgICAnSnVseScsXG4gICAgJ0F1Z3VzdCcsXG4gICAgJ1NlcHRlbWJlcicsXG4gICAgJ09jdG9iZXInLFxuICAgICdOb3ZlbWJlcicsXG4gICAgJ0RlY2VtYmVyJyxcbiAgXTtcblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoYCR7ZGF0ZVN0cmluZ30gMDA6MDA6MDBgKTtcblxuICByZXR1cm4gYm9vbGVhblxuICAgID8gYCR7ZGF0ZS50b1VUQ1N0cmluZygpLnN1YnN0cmluZygwLCAzKX0gJHtkYXRlLnRvVVRDU3RyaW5nKCkuc3Vic3RyaW5nKDUsIDcpfWBcbiAgICA6IGAke2RheXNbZGF0ZS5nZXRVVENEYXkoKV19LCAke21vbnRoc1tkYXRlLmdldFVUQ01vbnRoKCldfSAke2RhdGUuZ2V0VVRDRGF0ZSgpfWA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXRUaW1lKHRpbWUpIHtcbiAgLy8gcmV0dXJucyAxMiBob3VyIHRpbWUgZm9ybWF0XG4gIC8vIGV4OiAyOjAwIFBNIG9yIDEwOjAwIEFNXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lLmluY2x1ZGVzKCctJykgPyB0aW1lIDogYDIwMDAtMTItMDEgJHt0aW1lfWApO1xuICBjb25zdCB0aW1lUHJvcGVydGllcyA9IHtcbiAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgaG91cjEyOiB0cnVlLFxuICB9O1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XG4gIGNvbnN0IGZpbGVzID0ge307XG4gIGNvbnN0IGZpbGVzQXJyID0gW107XG4gIHIua2V5cygpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBmaWxlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgZmlsZXMsIGZpbGVzQXJyIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=