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

:root {
  --temp-one: #f06543;
  --color-background-primary: #e8e9eb;
  --temp-three: #e0dfd5;
  --temp-four: #313638;
  --temp-five: #f09d51;
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
  font-family: 'Roboto Condensed', Arial;
  min-height: 100dvh;
}

body > #weather_app {
  min-height: inherit;
  display: grid;
  grid-template-rows: min-content 1fr;
}
`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;EACE,uDAAuD;EACvD,+BAA+B;EAC/B,4CAA2E;EAC3E,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,mCAAmC;EACnC,qBAAqB;EACrB,oBAAoB;EACpB,oBAAoB;AACtB;;AAEA;;;EAGE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,iDAAiD;EACjD,sCAAsC;EACtC,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,mCAAmC;AACrC","sourcesContent":["@font-face {\n  /* https://fonts.google.com/specimen/Roboto+Condensed */\n  font-family: 'Roboto Condensed';\n  src: url(./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf);\n  font-weight: 600;\n  font-style: normal;\n}\n\n:root {\n  --temp-one: #f06543;\n  --color-background-primary: #e8e9eb;\n  --temp-three: #e0dfd5;\n  --temp-four: #313638;\n  --temp-five: #f09d51;\n}\n\n*,\n*::before,\n*::after {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: var(--color-background-primary);\n  font-family: 'Roboto Condensed', Arial;\n  min-height: 100dvh;\n}\n\nbody > #weather_app {\n  min-height: inherit;\n  display: grid;\n  grid-template-rows: min-content 1fr;\n}\n"],"sourceRoot":""}]);
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

#main_content > :first-child {
  height: inherit;
  background-color: var(--temp-five);
  display: grid;
  grid-template-rows: min-content 1fr;
}
`, "",{"version":3,"sources":["webpack://./src/styles/content.css"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,kCAAkC;EAClC,aAAa;EACb,mCAAmC;AACrC","sourcesContent":["/* #main_content */\n#main_content {\n  height: 100%;\n}\n\n#main_content > :first-child {\n  height: inherit;\n  background-color: var(--temp-five);\n  display: grid;\n  grid-template-rows: min-content 1fr;\n}\n"],"sourceRoot":""}]);
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

#header > #navbar > .container > .nav_right {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(143, 103, 223);
  padding: 1rem;
  transform: translateY(-100%);
}

#header > #navbar > .container > .nav_right > li > .unit_systems_buttons {
  width: max-content;
  border-radius: 0.75rem;
  background-color: rgb(220, 220, 220);
}

#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > * {
  border: none;
  padding: 0.5rem;
  border-radius: 0.75rem;
  background-color: transparent;
}

#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *.selected {
  background-color: rgb(25, 216, 25);
}

#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:hover {
  cursor: pointer;
}

#header > #navbar > .container > .nav_right.visible {
  visibility: visible;
  transform: translateY(0%);
  transition: transform 200ms ease-in-out;
}

.nav_item,
.nav_item:visited {
  color: var(--primary-font-color, rgb(0, 0, 0));
  text-decoration: none;
}

.nav_item > svg,
.nav_btn > svg {
  width: clamp(2rem, 3vw, 3.5rem);
  height: auto;
}

.nav_btn {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0.35rem;
  padding: 0.3rem;
  z-index: 1;
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
  background: rgb(0, 132, 255);
  border: none;
  border-radius: 1rem;
  padding: 0.75rem;
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
    min-width: 50%;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA,mDAAmD;AACnD;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,sDAAsD;EACtD,kBAAkB;AACpB;;AAEA,aAAa;AACb;;EAEE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,MAAM;EACN,OAAO;EACP,mCAAmC;EACnC,WAAW;AACb;;AAEA,aAAa;AACb;EACE,SAAS;EACT,sBAAsB;EACtB,iCAAiC;AACnC;;AAEA,aAAa;AACb;EACE,WAAW;EACX,mCAAmC;EACnC,iCAAiC;AACnC;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,oCAAoC;EACpC,aAAa;EACb,4BAA4B;AAC9B;;AAEA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,sBAAsB;EACtB,6BAA6B;AAC/B;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;;EAEE,8CAA8C;EAC9C,qBAAqB;AACvB;;AAEA;;EAEE,+BAA+B;EAC/B,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,UAAU;AACZ;;AAEA;EACE,eAAe;EACf,oCAAoC;AACtC;;AAEA;EACE,iBAAiB;AACnB;;AAEA,gBAAgB;AAChB;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,YAAY;EACZ,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,kBAAkB;IAClB,mBAAmB;IACnB,6BAA6B;IAC7B,UAAU;IACV,yBAAyB;IACzB,aAAa;IACb,eAAe;IACf,cAAc;EAChB;;EAEA;;IAEE,aAAa;EACf;;EAEA;;IAEE,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,mBAAmB;EACrB;;EAEA,aAAa;EACb;IACE,SAAS;IACT,UAAU;IACV,sBAAsB;IACtB,iCAAiC;EACnC;;EAEA,aAAa;EACb;IACE,UAAU;IACV,WAAW;IACX,gCAAgC;IAChC,iCAAiC;EACnC;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,qBAAqB;IACrB,eAAe;IACf,eAAe;EACjB;;EAEA;IACE,oCAAoC;EACtC;;EAEA;IACE,cAAc;EAChB;AACF","sourcesContent":["/* includes selectors for navbar.js and header.js */\n#header > #navbar > .container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n#header > #navbar > .container > * {\n  list-style: none;\n}\n\n#header > #navbar > .container > * > li {\n  position: relative;\n  padding: 0.3rem;\n}\n\n#header > #navbar > .container > * > li:first-of-type {\n  /* value needs to be equal to .nav_btn padding value */\n  margin-top: 0.3rem;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > *:not(:first-child)::after,\n#header > #navbar > .container > .nav_right > *:not(:first-child):hover::after {\n  position: absolute;\n  content: '';\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgb(255, 187, 69);\n  z-index: -1;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > li::after {\n  width: 0%;\n  transform: skewX(0deg);\n  transition: all 500ms ease-in-out;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > li:hover::after {\n  width: 100%;\n  transform: skewX(8deg) scaleX(1.03);\n  transition: all 200ms ease-in-out;\n}\n\n#header > #navbar > .container > * > li > a {\n  display: flex;\n  align-items: center;\n}\n\n#header > #navbar > .container > .nav_right {\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgb(143, 103, 223);\n  padding: 1rem;\n  transform: translateY(-100%);\n}\n\n#header > #navbar > .container > .nav_right > li > .unit_systems_buttons {\n  width: max-content;\n  border-radius: 0.75rem;\n  background-color: rgb(220, 220, 220);\n}\n\n#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > * {\n  border: none;\n  padding: 0.5rem;\n  border-radius: 0.75rem;\n  background-color: transparent;\n}\n\n#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *.selected {\n  background-color: rgb(25, 216, 25);\n}\n\n#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:hover {\n  cursor: pointer;\n}\n\n#header > #navbar > .container > .nav_right.visible {\n  visibility: visible;\n  transform: translateY(0%);\n  transition: transform 200ms ease-in-out;\n}\n\n.nav_item,\n.nav_item:visited {\n  color: var(--primary-font-color, rgb(0, 0, 0));\n  text-decoration: none;\n}\n\n.nav_item > svg,\n.nav_btn > svg {\n  width: clamp(2rem, 3vw, 3.5rem);\n  height: auto;\n}\n\n.nav_btn {\n  display: flex;\n  align-items: center;\n  background: transparent;\n  border: none;\n  border-radius: 0.35rem;\n  padding: 0.3rem;\n  z-index: 1;\n}\n\n.nav_btn:hover {\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.nav_btn:hover > svg {\n  filter: invert(1);\n}\n\n/* form styles */\n#header > #form {\n  padding: 1rem;\n}\n\n#header > #form > .form_item:first-child {\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.5rem;\n}\n\n#header > #form > .form_item:first-child > label {\n  font-size: clamp(2rem, 2vw, 3rem);\n}\n\n#header > #form > .form_item:first-child > input {\n  font-size: 1.5rem;\n  background: rgb(0, 132, 255);\n  border: none;\n  border-radius: 1rem;\n  padding: 0.75rem;\n}\n\n#header > #form > .form_item:first-child > .validity_error {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #header > #navbar > .container > * {\n    align-items: center;\n  }\n\n  #header > #navbar > .container > .nav_right {\n    position: relative;\n    visibility: visible;\n    background-color: transparent;\n    padding: 0;\n    transform: translateY(0%);\n    display: flex;\n    height: inherit;\n    width: inherit;\n  }\n\n  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:after,\n  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:hover:after {\n    content: none;\n  }\n\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after,\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    position: absolute;\n    bottom: 0;\n    top: auto;\n    left: 0;\n    right: 0;\n    margin: auto;\n    border-radius: 1rem;\n  }\n\n  /* optional */\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after {\n    width: 0%;\n    height: 0%;\n    transform: skewX(0deg);\n    transition: all 200ms ease-in-out;\n  }\n\n  /* optional */\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    width: 60%;\n    height: 12%;\n    transform: skewX(0deg) scaleX(1);\n    transition: all 200ms ease-in-out;\n  }\n\n  #header > #navbar > .container > * > li:first-of-type {\n    margin-top: 0;\n  }\n\n  .nav_btn {\n    display: none;\n  }\n\n  #header > #form > .form_item:first-child {\n    align-content: center;\n    flex-wrap: wrap;\n    padding: 1rem 0;\n  }\n\n  #header > #form > .form_item:first-child > label {\n    font-size: clamp(1rem, 1vw, 1.25rem);\n  }\n\n  #header > #form > .form_item:first-child > input {\n    min-width: 50%;\n  }\n}\n"],"sourceRoot":""}]);
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
`, "",{"version":3,"sources":["webpack://./src/styles/home.css"],"names":[],"mappings":"AAAA,8BAA8B","sourcesContent":["/* styles for home.js module */\n"],"sourceRoot":""}]);
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
  background-color: magenta;
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
  text-wrap: nowrap;
}

#forecast_details > .day {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
  border: 2px solid black;
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
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/forecast.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,iCAAiC;EACjC,aAAa;EACb,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mCAAmC;EACnC,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,aAAa;IACb,gDAAgD;IAChD,kBAAkB;IAClB,qBAAqB;EACvB;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,cAAc;IACd,kBAAkB;EACpB;AACF","sourcesContent":["#forecast > header {\n  background-color: magenta;\n  padding: 2rem;\n}\n\n#forecast > header > h2 {\n  font-size: clamp(2rem, 2vw, 3rem);\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n#forecast > header > h2 > span {\n  font-size: 1rem;\n  text-wrap: nowrap;\n}\n\n#forecast_details > .day {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  border: 2px solid black;\n}\n\n#forecast_details > .day > ul {\n  list-style: none;\n  display: flex;\n  align-items: center;\n  flex: 1 0 0px;\n  column-gap: 0.5rem;\n}\n\n#forecast_details > .day > ul:nth-child(3) > :first-child,\n#forecast_details > .day > ul:last-of-type > :first-child {\n  display: flex;\n}\n\n#forecast_details > .day > ul:nth-of-type(3) > :last-child {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #forecast_details > .day {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    padding: 2rem 3rem;\n    justify-items: center;\n  }\n\n  #forecast_details > .day > ul:nth-of-type(3) {\n    justify-self: flex-start;\n  }\n\n  #forecast_details > .day > ul:nth-of-type(3) > :last-child {\n    display: block;\n    text-wrap: balance;\n  }\n}\n"],"sourceRoot":""}]);
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
  background-color: magenta;
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
  text-wrap: nowrap;
}

#hourly_details > .day > h3 {
  font-size: clamp(1.5rem, 2vw, 2rem);
  background-color: darksalmon;
  padding: 2rem;
  text-wrap: balance;
}

#hourly_details > .day > .hour {
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
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
    /* flex: 0.5; */
    justify-self: flex-start;
  }

  #hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,
  #hourly_details > .day > .hour > ul:last-of-type {
    display: flex;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/hourly.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,iCAAiC;EACjC,aAAa;EACb,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;EACnC,4BAA4B;EAC5B,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mCAAmC;AACrC;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA,6BAA6B;AAC7B;EACE,yBAAyB;AAC3B;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE;IACE,aAAa;IACb,qCAAqC;IACrC,kBAAkB;IAClB,qBAAqB;EACvB;;EAEA;IACE,eAAe;IACf,wBAAwB;EAC1B;;EAEA;;IAEE,aAAa;EACf;AACF","sourcesContent":["#hourly > header {\n  background-color: magenta;\n  padding: 2rem;\n}\n\n#hourly > header > h2 {\n  font-size: clamp(2rem, 2vw, 3rem);\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n#hourly > header > h2 > span {\n  font-size: 1rem;\n  text-wrap: nowrap;\n}\n\n#hourly_details > .day > h3 {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  background-color: darksalmon;\n  padding: 2rem;\n  text-wrap: balance;\n}\n\n#hourly_details > .day > .hour {\n  background-color: red;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#hourly_details > .day > .hour > ul {\n  list-style: none;\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n}\n\n#hourly_details > .day > .hour > ul > * {\n  display: flex;\n}\n\n/* selects the li with time */\n#hourly_details > .day > .hour > ul:first-of-type > li {\n  text-transform: lowercase;\n}\n\n#hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,\n#hourly_details > .day > .hour > ul:last-of-type {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #hourly_details > .day > .hour {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    padding: 2rem 3rem;\n    justify-items: center;\n  }\n\n  #hourly_details > .day > .hour > ul:nth-of-type(3) {\n    /* flex: 0.5; */\n    justify-self: flex-start;\n  }\n\n  #hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,\n  #hourly_details > .day > .hour > ul:last-of-type {\n    display: flex;\n  }\n}\n"],"sourceRoot":""}]);
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
  border: 4px solid rgb(255, 225, 2);
  padding: 1rem;
}

#tabs_navbar > ul {
  display: flex;
  list-style: none;
  column-gap: 1rem;
}

.tabs_list_item {
  padding: 0.5rem;
}

/* #tabs_navbar anchors */
.tabs_list_item > * {
  text-decoration: none;
  text-wrap: nowrap;
  color: white;
  font-size: clamp(1.5rem, 2vw, 2rem);
  padding: 1rem;
}

.tabs_list_item > *:hover {
  border-bottom: 2px solid white;
}

.tabs_list_item > [data-active='true'] {
  border-bottom: 2px solid white;
}

#tabs:last-child {
  border: 2px solid pink;
}

@media screen and (min-width: 768px) {
  .tabs_list_item > * {
    padding: 1rem;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/tabs.css"],"names":[],"mappings":"AAAA,+CAA+C;AAC/C;EACE,kCAAkC;EAClC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA,yBAAyB;AACzB;EACE,qBAAqB;EACrB,iBAAiB;EACjB,YAAY;EACZ,mCAAmC;EACnC,aAAa;AACf;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE;IACE,aAAa;EACf;AACF","sourcesContent":["/* stylesheet for tabs.js, and tabs_navbar.js */\n#tabs_navbar {\n  border: 4px solid rgb(255, 225, 2);\n  padding: 1rem;\n}\n\n#tabs_navbar > ul {\n  display: flex;\n  list-style: none;\n  column-gap: 1rem;\n}\n\n.tabs_list_item {\n  padding: 0.5rem;\n}\n\n/* #tabs_navbar anchors */\n.tabs_list_item > * {\n  text-decoration: none;\n  text-wrap: nowrap;\n  color: white;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  padding: 1rem;\n}\n\n.tabs_list_item > *:hover {\n  border-bottom: 2px solid white;\n}\n\n.tabs_list_item > [data-active='true'] {\n  border-bottom: 2px solid white;\n}\n\n#tabs:last-child {\n  border: 2px solid pink;\n}\n\n@media screen and (min-width: 768px) {\n  .tabs_list_item > * {\n    padding: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
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
  /* background-color: magenta; */
  border: 4px solid rgb(0, 51, 128);
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
  text-wrap: nowrap;
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
  background-color: white;
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
  /* background-color: darkorange; */
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
  #today_details > .today_details_header > :first-child {
    /* flex: none; */
    /* optional */
  }

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
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/today.css"],"names":[],"mappings":"AAAA;EACE,+BAA+B;EAC/B,iCAAiC;EACjC,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,kBAAkB;AACpB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,OAAO;AACT;;AAEA,iCAAiC;AACjC;EACE,iBAAiB;EACjB,0BAA0B;EAC1B,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,kBAAkB;AACpB;;AAEA,mCAAmC;AACnC;EACE,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,aAAa;EACb,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,uBAAuB;EACvB,eAAe;EACf,uBAAuB;AACzB;;AAEA;EACE,mCAAmC;AACrC;;AAEA,mCAAmC;AACnC;EACE,aAAa;AACf;;AAEA;EACE,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,OAAO;EACP,0BAA0B;EAC1B,iBAAiB;AACnB;;AAEA;EACE;IACE,gBAAgB;IAChB,aAAa;EACf;;EAEA;IACE,aAAa;IACb,qCAAqC;IACrC,gBAAgB;IAChB,aAAa;IACb,aAAa;EACf;;EAEA;IACE,kBAAkB;IAClB,aAAa;EACf;AACF","sourcesContent":["#today_summary {\n  /* background-color: magenta; */\n  border: 4px solid rgb(0, 51, 128);\n  padding: 2rem;\n}\n\n#today_summary > ul {\n  list-style: none;\n}\n\n#today_summary > ul > :first-child {\n  font-size: clamp(2rem, 2vw, 3rem);\n}\n\n#today_summary > header > h3 {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_summary > header > h3 > span {\n  font-size: 1rem;\n  text-wrap: nowrap;\n}\n\n#today_summary > ul:last-of-type {\n  display: flex;\n  flex-direction: column-reverse;\n  position: relative;\n}\n\n#today_summary > ul:last-of-type > :last-child {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_summary > ul:last-of-type > :first-child {\n  display: flex;\n  position: absolute;\n  right: 0;\n}\n\n#today_details > * > * {\n  list-style: none;\n}\n\n#today_details > .today_details_header {\n  padding: 2rem;\n  background-color: white;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n#today_details > .today_details_header > :first-child {\n  flex: 1;\n}\n\n/* selects li with \"feels like\" */\n#today_details > .today_details_header > :first-child > :first-child {\n  text-wrap: nowrap;\n  text-transform: capitalize;\n  font-size: clamp(1rem, 2vw, 1.5rem);\n}\n\n#today_details > .today_details_header > :first-child > :last-child {\n  font-size: clamp(2rem, 2vw, 2.5rem);\n}\n\n#today_details > .today_details_header > .today_details_sun {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: end;\n  column-gap: 1rem;\n}\n\n#today_details > .today_details_header > .today_details_sun > * {\n  list-style: none;\n  display: flex;\n  column-gap: 0.5rem;\n}\n\n/* selects li's that wrap an icon */\n#today_details > .today_details_header > .today_details_sun > * > :first-child > svg {\n  width: clamp(1.75rem, 2vw, 3rem);\n  height: auto;\n}\n\n#today_details > .today_details_header > .today_details_sun > * > li {\n  display: flex;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_details > .today_details_container {\n  padding: 1rem;\n  /* background-color: darkorange; */\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.25rem;\n}\n\n#today_details > .today_details_container > ul {\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n  padding: 1.25rem;\n  border: 2px solid black;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n#today_details > .today_details_container > ul > * {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n/* selects li's that wrap an icon */\n#today_details > .today_details_container > ul > :first-child {\n  display: flex;\n}\n\n#today_details > .today_details_container > ul > :first-child > svg {\n  width: clamp(1.75rem, 2vw, 2rem);\n  height: auto;\n}\n\n#today_details > .today_details_container > ul > :nth-child(2) {\n  flex: 1;\n  text-transform: capitalize;\n  text-wrap: nowrap;\n}\n\n@media screen and (min-width: 768px) {\n  #today_details > .today_details_header > :first-child {\n    /* flex: none; */\n    /* optional */\n  }\n\n  #today_details > .today_details_container {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 2rem;\n    row-gap: 1rem;\n    padding: 2rem;\n  }\n\n  #today_details > .today_details_container > ul {\n    column-gap: 1.5rem;\n    padding: 2rem;\n  }\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _containers_api_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./containers/api_controller */ "./src/containers/api_controller.js");







(() => {
  const build = {
    header: _components_header_header__WEBPACK_IMPORTED_MODULE_3__["default"],
    main: _components_main_main__WEBPACK_IMPORTED_MODULE_4__["default"],
  };

  const app = {
    init() {
      console.log('app.init() running');
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

      document.body.appendChild(appWrapper);
    },
  };

  app.init();
})();

// getData('london');

// use WeatherAPI
// https://www.weatherapi.com/docs/

// things to do:
// You should be able to search for a specific location
// toggle displaying the data in Fahrenheit or Celsius.
// You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather

// inputs:
// 1. city or postal codes

// design:
// add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.
// 3 day forecast
// hourly and daily forecast

// layout:
// <app>
//    <header> (navigation)
//    <content>
//      <heading>
//      <input> (with C/F toggle button)
//      <output>
//        <today> (get current date)
//        <hourly> (get user's current time)
//          time | conditions | temp | feels like | precip chance % | precip amount % | cloud cover % | dew point | humidity % | wind speed AND direction
//        <3-day> (3-day forecast)
//    <footer>


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
    const errorHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
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
  // {
  //   element: 'h1',
  //   attributes: {
  //     id: 'hero',
  //     textContent: 'weather app',
  //   },
  // },
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
    console.log(_containers_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('getActiveTab', 'foo'));
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



const homeBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from home.js');
  },
  bindEvents() {
    console.log('bindEvents() running from home.js');
  },
  render() {
    const homeSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    homeSection.id = 'home';
    const homeHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
    homeHeading.setAttributes({ textContent: 'HOME' });

    homeSection.appendChild(homeHeading);

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


const loadingBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from loading.js');
  },
  bindEvents() {
    console.log('bindEvents() running from loading.js');
  },
  render() {
    const loadingSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    loadingSection.id = 'loading';
    const loadingHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
    loadingHeading.setAttributes({ textContent: 'LOADING...' });

    loadingSection.appendChild(loadingHeading);

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
  init() {
    console.log('init() methid running from main.js');
  },
  cacheDOM(mainElement) {
    console.log('cacheDOM() running from main.js');
    this.main = mainElement;
  },
  bindEvents() {
    console.log('bindEvents() running from main.js');
    this.switchContent = this.switchContent.bind(this);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('switchContent', this.switchContent);
  },
  render(key, data, renderKey) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      content = build.home();
      // this.bindEvents();
    } else {
      // render today
      content = build[key](data, renderKey);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(weatherData, renderKey) {
    let contentKey;
    console.log('switchContent() running from main.js');
    if (weatherData.error) {
      contentKey = 'error';
    } else if (weatherData === 'loading') {
      contentKey = 'loading';
    } else {
      // console.log('fetch success');
      contentKey = 'tabs';
    }
    this.render(contentKey, weatherData, renderKey);
  },
  setActiveTab(tab) {
    console.log('setActiveTab() running from main.js');
  },
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
      element: 'div',
      attributes: {
        class: 'unit_systems_buttons',
      },
      children: [
        {
          element: 'button',
          attributes: {
            id: 'imperial',
            class: 'unit_systems_button selected',
            type: 'button',
            value: 'imperial',
            textContent: '°F',
          },
        },
        {
          element: 'button',
          attributes: {
            id: 'metric',
            class: 'unit_systems_button',
            type: 'button',
            value: 'metric',
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
    this.unitSystemsBtns = navElement.querySelectorAll('.unit_systems_button');
  },
  bindEvents() {
    this.toggleNav = this.toggleNav.bind(this);
    this.setUnitSystem = this.setUnitSystem.bind(this);
    this.navBtn.addEventListener('click', this.toggleNav);
    this.unitSystemsBtns.forEach((btn) => btn.addEventListener('click', this.setUnitSystem));
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
  setUnitSystem(e) {
    const element = e.currentTarget;
    [...this.unitSystemsBtns]
      .find((btn) => btn.classList.contains('selected'))
      .classList.remove('selected');
    element.classList.add('selected');
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_3__["default"].publish('setUnitSystem', element.value);
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
  cacheDOM() {
    console.log('cacheDOM() running from forecast.js');
  },
  bindEvents() {
    console.log('bindEvents() running from forecast.js');
  },
  render() {
    console.log('render() running from forecast.js');
    console.log(_forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"]);
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

    // temporary
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
    // temporary
    forecastSection.appendChild(forecastDetails);
    return forecastSection;
  },
};

function buildForecast(weatherData, timeStamp) {
  _forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].init(weatherData, timeStamp);
  return forecastBuilder.render();
}

// date | temp high / low | condition | preciptation % | wind
// example
// Wed 20 | 60° / 47° | Sunny | 1% | NNE 6 mph


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

    console.log(date1.getUTCMilliseconds() <= date2.getUTCMilliseconds());
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
  cacheDOM() {
    console.log('cacheDOM() running from hourly.js');
  },
  bindEvents() {
    console.log('bindEvents() running from hourly.js');
  },
  render() {
    console.log('render() running from hourly.js');
    console.log(_hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"]);
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

    // temporary
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
    // temporary
    return hourlySection;
  },
};

function buildHourly(weatherData, timeStamp) {
  _hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].init(weatherData, timeStamp);
  return hourlyBuilder.render();
}

// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph


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
      // if no key
      content = build.today(this.weatherData, this.timeStamp);
    } else {
      content = build[key](this.weatherData, this.timeStamp);
      // this.tabsSection.lastChild.remove();
    }
    this.setActiveTab(content.id);
    this.tabsSection.appendChild(content);
  },
  switchTab(e, tabKey) {
    console.log(e.currentTarget);
    console.log(tabKey);
    const { className: elementClassName } = e.currentTarget;
    const renderKey = elementClassName;

    _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].publish('getWeather', this.location, renderKey);
  },
  setActiveTab(id) {
    console.log(id);
    console.log(this.tabsList);
    console.log([...this.tabsList].find((anchor) => anchor.classList.contains(id)));
    // if (this.activeTab) this.activeTab.classList.remove('active');
    this.activeTab = [...this.tabsList].find((anchor) => anchor.classList.contains(id));
    // this.activeTab.classList.add('active');
    this.activeTab.setAttributes({ 'data-active': true });
    this.activeKey = id;
    console.log(`activeKey: ${this.activeKey}`);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].publish('setActiveTab', id);
    // sends id to setActiveTab in header.js module
  },
  // updateData(weatherData, key) {
  //   this.weatherData = weatherData;
  //   this.render(key);
  // },
};

function buildTabs(weatherData, renderKey) {
  console.log(renderKey);
  tabsBuilder.init(weatherData);
  const tabsSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
  // const tabsHeading = createElement('h1');
  tabsSection.id = 'tabs';
  // tabsHeading.setAttributes({ textContent: 'TABS' });

  // tabsSection.appendChild(tabsHeading);
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
// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir



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
      // icons: unitSystem.icons,
      // get: unitSystem.get,
      // setIcon: unitSystem.setIcon,
      // setValue: unitSystem.setValue,
      // roundValue: unitSystem.roundValue,
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
    // console.log(todayController.init(weatherData, unitSystem));
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
  cacheDOM() {
    console.log('cacheDOM() running from today.js');
  },
  bindEvents() {
    console.log('bindEvents() running from today.js');
  },
  render() {
    console.log(_today_config__WEBPACK_IMPORTED_MODULE_2__["default"]);
    const todaySection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');

    todaySection.id = 'today';

    // temporary
    const todaySummary = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    const todayHeader = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('header');
    const todaySectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h3');
    const todayTimeStamp = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('span');

    todaySummary.id = 'today_summary';
    // todaySectionHeading.setAttributes({ textContent: 'TODAY' });
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
    // temporary

    return todaySection;
  },
};

function buildToday(weatherData, timeStamp) {
  // console.log(timeStamp);
  _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].init(weatherData, timeStamp);
  return todayBuilder.render();
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph


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
  console.log(value);
  console.log(tabKey);
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
    // /\.(svg|png)$/
    // console.log(item.split(/\.(svg|png)$/));

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
module.exports = __webpack_require__.p + "471690b5221a87ce20a1.svg";

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
module.exports = __webpack_require__.p + "b4f7904839773b037396.svg";

/***/ }),

/***/ "./src/assets/icons/menu.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/menu.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ef1d26439317c06a5d07.svg";

/***/ }),

/***/ "./src/assets/icons/minmaxtemp.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/minmaxtemp.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "689de643d39229eb2656.svg";

/***/ }),

/***/ "./src/assets/icons/pressure.svg":
/*!***************************************!*\
  !*** ./src/assets/icons/pressure.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ccac2fd4aaa76355e0dd.svg";

/***/ }),

/***/ "./src/assets/icons/progress_activity.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/progress_activity.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "68f70f1ab82585ea83e1.svg";

/***/ }),

/***/ "./src/assets/icons/sharp_home.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/sharp_home.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "97a5076a0efd36487580.svg";

/***/ }),

/***/ "./src/assets/icons/sunrise.svg":
/*!**************************************!*\
  !*** ./src/assets/icons/sunrise.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0f4574d4c65441904d9d.svg";

/***/ }),

/***/ "./src/assets/icons/sunset.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/sunset.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c02b526fee516055ad75.svg";

/***/ }),

/***/ "./src/assets/icons/uv.svg":
/*!*********************************!*\
  !*** ./src/assets/icons/uv.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "67d943cec27a116865c6.svg";

/***/ }),

/***/ "./src/assets/icons/visibility.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/visibility.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ae0d01439563497e3b0c.svg";

/***/ }),

/***/ "./src/assets/icons/wind.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/wind.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ed17266df82944ed2a1f.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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YjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCdkM7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLCtGQUErRixNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sVUFBVSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sTUFBTSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLFVBQVUsVUFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLDRGQUE0RixZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxZQUFZLE1BQU0sWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxX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QTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNILENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEVBQUU7QUFDekI7QUFDQSxxQkFBcUIsRUFBRSxtQ0FBbUMsMkJBQTJCO0FBQ3JGO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixZQUFZOztBQUV2QztBQUNBLFNBQVMsb0NBQW9DLEVBQUUsbUNBQW1DO0FBQ2xGLFNBQVMsdUJBQXVCLElBQUksNEJBQTRCLEVBQUUsa0JBQWtCO0FBQ3BGOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEJlO0FBQ2Y7QUFDQTtBQUNBLGtFQUFrRSxLQUFLO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1hlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9AaWNvbmZ1L3N2Zy1pbmplY3QvZGlzdC9zdmctaW5qZWN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvYXBwLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9jb250ZW50LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2hvbWUuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvZm9yZWNhc3QuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvaG91cmx5LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL3RhYnMuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvdG9kYXkuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9jb250ZW50LmNzcz8zZGJhIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2hlYWRlci5jc3M/ZTY4YiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9ob21lLmNzcz80YjUxIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvZm9yZWNhc3QuY3NzPzA4YWIiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvdGFicy9ob3VybHkuY3NzPzhiMzAiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvdGFicy90YWJzLmNzcz9kNWQ4Iiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvdG9kYXkuY3NzPzJlN2QiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvZXJyb3IvZXJyb3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9ob21lL2hvbWUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbWFpbi9tYWluLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy9mb3JlY2FzdC9mb3JlY2FzdC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvZm9yZWNhc3QvZm9yZWNhc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvaG91cmx5L2hvdXJseS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvaG91cmx5L2hvdXJseS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnNfbmF2YmFyL3RhYnNfbmF2YmFyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzX25hdmJhci90YWJzX25hdmJhci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90b2RheS90b2RheS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdG9kYXkvdG9kYXkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdW5pdHN5c3RlbXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2FwaV9jb250cm9sbGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2NyZWF0ZUNvbnRlbnRSb3dzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9mb3JtYXREYXRlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9mb3JtYXRUaW1lLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9pbXBvcnRBbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTVkdJbmplY3QgLSBWZXJzaW9uIDEuMi4zXG4gKiBBIHRpbnksIGludHVpdGl2ZSwgcm9idXN0LCBjYWNoaW5nIHNvbHV0aW9uIGZvciBpbmplY3RpbmcgU1ZHIGZpbGVzIGlubGluZSBpbnRvIHRoZSBET00uXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IElOQ09SUywgdGhlIGNyZWF0b3JzIG9mIGljb25mdS5jb21cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAvLyBjb25zdGFudHMgZm9yIGJldHRlciBtaW5pZmljYXRpb25cbiAgdmFyIF9DUkVBVEVfRUxFTUVOVF8gPSAnY3JlYXRlRWxlbWVudCc7XG4gIHZhciBfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FXyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSc7XG4gIHZhciBfTEVOR1RIXyA9ICdsZW5ndGgnO1xuICB2YXIgX1NUWUxFXyA9ICdzdHlsZSc7XG4gIHZhciBfVElUTEVfID0gJ3RpdGxlJztcbiAgdmFyIF9VTkRFRklORURfID0gJ3VuZGVmaW5lZCc7XG4gIHZhciBfU0VUX0FUVFJJQlVURV8gPSAnc2V0QXR0cmlidXRlJztcbiAgdmFyIF9HRVRfQVRUUklCVVRFXyA9ICdnZXRBdHRyaWJ1dGUnO1xuXG4gIHZhciBOVUxMID0gbnVsbDtcblxuICAvLyBjb25zdGFudHNcbiAgdmFyIF9fU1ZHSU5KRUNUID0gJ19fc3ZnSW5qZWN0JztcbiAgdmFyIElEX1NVRkZJWCA9ICctLWluamVjdC0nO1xuICB2YXIgSURfU1VGRklYX1JFR0VYID0gbmV3IFJlZ0V4cChJRF9TVUZGSVggKyAnXFxcXGQrJywgXCJnXCIpO1xuICB2YXIgTE9BRF9GQUlMID0gJ0xPQURfRkFJTCc7XG4gIHZhciBTVkdfTk9UX1NVUFBPUlRFRCA9ICdTVkdfTk9UX1NVUFBPUlRFRCc7XG4gIHZhciBTVkdfSU5WQUxJRCA9ICdTVkdfSU5WQUxJRCc7XG4gIHZhciBBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTID0gWydzcmMnLCAnYWx0JywgJ29ubG9hZCcsICdvbmVycm9yJ107XG4gIHZhciBBX0VMRU1FTlQgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXSgnYScpO1xuICB2YXIgSVNfU1ZHX1NVUFBPUlRFRCA9IHR5cGVvZiBTVkdSZWN0ICE9IF9VTkRFRklORURfO1xuICB2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHVzZUNhY2hlOiB0cnVlLFxuICAgIGNvcHlBdHRyaWJ1dGVzOiB0cnVlLFxuICAgIG1ha2VJZHNVbmlxdWU6IHRydWVcbiAgfTtcbiAgLy8gTWFwIG9mIElSSSByZWZlcmVuY2VhYmxlIHRhZyBuYW1lcyB0byBwcm9wZXJ0aWVzIHRoYXQgY2FuIHJlZmVyZW5jZSB0aGVtLiBUaGlzIGlzIGRlZmluZWQgaW5cbiAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzExL2xpbmtpbmcuaHRtbCNwcm9jZXNzaW5nSVJJXG4gIHZhciBJUklfVEFHX1BST1BFUlRJRVNfTUFQID0ge1xuICAgIGNsaXBQYXRoOiBbJ2NsaXAtcGF0aCddLFxuICAgICdjb2xvci1wcm9maWxlJzogTlVMTCxcbiAgICBjdXJzb3I6IE5VTEwsXG4gICAgZmlsdGVyOiBOVUxMLFxuICAgIGxpbmVhckdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgbWFya2VyOiBbJ21hcmtlcicsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0J10sXG4gICAgbWFzazogTlVMTCxcbiAgICBwYXR0ZXJuOiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgcmFkaWFsR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXVxuICB9O1xuICB2YXIgSU5KRUNURUQgPSAxO1xuICB2YXIgRkFJTCA9IDI7XG5cbiAgdmFyIHVuaXF1ZUlkQ291bnRlciA9IDE7XG4gIHZhciB4bWxTZXJpYWxpemVyO1xuICB2YXIgZG9tUGFyc2VyO1xuXG5cbiAgLy8gY3JlYXRlcyBhbiBTVkcgZG9jdW1lbnQgZnJvbSBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cikge1xuICAgIGRvbVBhcnNlciA9IGRvbVBhcnNlciB8fCBuZXcgRE9NUGFyc2VyKCk7XG4gICAgcmV0dXJuIGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnU3RyLCAndGV4dC94bWwnKTtcbiAgfVxuXG5cbiAgLy8gc2VhcmlhbGl6ZXMgYW4gU1ZHIGVsZW1lbnQgdG8gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbWVudCkge1xuICAgIHhtbFNlcmlhbGl6ZXIgPSB4bWxTZXJpYWxpemVyIHx8IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoc3ZnRWxlbWVudCk7XG4gIH1cblxuXG4gIC8vIFJldHVybnMgdGhlIGFic29sdXRlIHVybCBmb3IgdGhlIHNwZWNpZmllZCB1cmxcbiAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVVcmwodXJsKSB7XG4gICAgQV9FTEVNRU5ULmhyZWYgPSB1cmw7XG4gICAgcmV0dXJuIEFfRUxFTUVOVC5ocmVmO1xuICB9XG5cblxuICAvLyBMb2FkIHN2ZyB3aXRoIGFuIFhIUiByZXF1ZXN0XG4gIGZ1bmN0aW9uIGxvYWRTdmcodXJsLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAvLyByZWFkeVN0YXRlIGlzIERPTkVcbiAgICAgICAgICB2YXIgc3RhdHVzID0gcmVxLnN0YXR1cztcbiAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgT0tcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVhNTCwgcmVxLnJlc3BvbnNlVGV4dC50cmltKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgZXJyb3IgKDR4eCBvciA1eHgpXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgMCBjYW4gaW5kaWNhdGUgYSBmYWlsZWQgY3Jvc3MtZG9tYWluIGNhbGxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cblxuICAvLyBDb3B5IGF0dHJpYnV0ZXMgZnJvbSBpbWcgZWxlbWVudCB0byBzdmcgZWxlbWVudFxuICBmdW5jdGlvbiBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKSB7XG4gICAgdmFyIGF0dHJpYnV0ZTtcbiAgICB2YXIgYXR0cmlidXRlTmFtZTtcbiAgICB2YXIgYXR0cmlidXRlVmFsdWU7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbWdFbGVtLmF0dHJpYnV0ZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgLy8gT25seSBjb3B5IGF0dHJpYnV0ZXMgbm90IGV4cGxpY2l0bHkgZXhjbHVkZWQgZnJvbSBjb3B5aW5nXG4gICAgICBpZiAoQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUy5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID09IC0xKSB7XG4gICAgICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAvLyBJZiBpbWcgYXR0cmlidXRlIGlzIFwidGl0bGVcIiwgaW5zZXJ0IGEgdGl0bGUgZWxlbWVudCBpbnRvIFNWRyBlbGVtZW50XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09IF9USVRMRV8pIHtcbiAgICAgICAgICB2YXIgdGl0bGVFbGVtO1xuICAgICAgICAgIHZhciBmaXJzdEVsZW1lbnRDaGlsZCA9IHN2Z0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudENoaWxkICYmIGZpcnN0RWxlbWVudENoaWxkLmxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpID09IF9USVRMRV8pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGlzIGEgdGl0bGUgZWxlbWVudCwga2VlcCBpdCBhcyB0aGUgdGl0bGUgZWxlbWVudFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGVsZW1lbnQgaXMgbm90IGEgdGl0bGUgZWxlbWVudCwgY3JlYXRlIGEgbmV3IHRpdGxlXG4gICAgICAgICAgICAvLyBlbGUsZW10IGFuZCBzZXQgaXQgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfICsgJ05TJ10oJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgX1RJVExFXyk7XG4gICAgICAgICAgICBzdmdFbGVtLmluc2VydEJlZm9yZSh0aXRsZUVsZW0sIGZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2V0IG5ldyB0aXRsZSBjb250ZW50XG4gICAgICAgICAgdGl0bGVFbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2V0IGltZyBhdHRyaWJ1dGUgdG8gc3ZnIGVsZW1lbnRcbiAgICAgICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGFwcGVuZHMgYSBzdWZmaXggdG8gSURzIG9mIHJlZmVyZW5jZWQgZWxlbWVudHMgaW4gdGhlIDxkZWZzPiBpbiBvcmRlciB0byAgdG8gYXZvaWQgSUQgY29sbGlzaW9uXG4gIC8vIGJldHdlZW4gbXVsdGlwbGUgaW5qZWN0ZWQgU1ZHcy4gVGhlIHN1ZmZpeCBoYXMgdGhlIGZvcm0gXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYSBydW5uaW5nIG51bWJlciB3aGljaCBpc1xuICAvLyBpbmNyZW1lbnRlZCB3aXRoIGVhY2ggaW5qZWN0aW9uLiBSZWZlcmVuY2VzIHRvIHRoZSBJRHMgYXJlIGFkanVzdGVkIGFjY29yZGluZ2x5LlxuICAvLyBXZSBhc3N1bWUgdGhhIGFsbCBJRHMgd2l0aGluIHRoZSBpbmplY3RlZCBTVkcgYXJlIHVuaXF1ZSwgdGhlcmVmb3JlIHRoZSBzYW1lIHN1ZmZpeCBjYW4gYmUgdXNlZCBmb3IgYWxsIElEcyBvZiBvbmVcbiAgLy8gaW5qZWN0ZWQgU1ZHLlxuICAvLyBJZiB0aGUgb25seVJlZmVyZW5jZWQgYXJndW1lbnQgaXMgc2V0IHRvIHRydWUsIG9ubHkgdGhvc2UgSURzIHdpbGwgYmUgbWFkZSB1bmlxdWUgdGhhdCBhcmUgcmVmZXJlbmNlZCBmcm9tIHdpdGhpbiB0aGUgU1ZHXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgb25seVJlZmVyZW5jZWQpIHtcbiAgICB2YXIgaWRTdWZmaXggPSBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKztcbiAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gZm9yIGZ1bmN0aW9uYWwgbm90YXRpb25zIG9mIGFuIElSSSByZWZlcmVuY2VzLiBUaGlzIHdpbGwgZmluZCBvY2N1cmVuY2VzIGluIHRoZSBmb3JtXG4gICAgLy8gdXJsKCNhbnlJZCkgb3IgdXJsKFwiI2FueUlkXCIpIChmb3IgSW50ZXJuZXQgRXhwbG9yZXIpIGFuZCBjYXB0dXJlIHRoZSByZWZlcmVuY2VkIElEXG4gICAgdmFyIGZ1bmNJcmlSZWdleCA9IC91cmxcXChcIj8jKFthLXpBLVpdW1xcdzouLV0qKVwiP1xcKS9nO1xuICAgIC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBhbiBJRC4gVGhlIFNWRyBzcGVjIHJlY29tbWVuZHMgdG8gcHV0IHJlZmVyZW5jZWQgZWxlbWVudHMgaW5zaWRlIDxkZWZzPiBlbGVtZW50cywgYnV0XG4gICAgLy8gdGhpcyBpcyBub3QgYSByZXF1aXJlbWVudCwgdGhlcmVmb3JlIHdlIGhhdmUgdG8gc2VhcmNoIGZvciBJRHMgaW4gdGhlIHdob2xlIFNWRy5cbiAgICB2YXIgaWRFbGVtZW50cyA9IHN2Z0VsZW0ucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgIHZhciBpZEVsZW07XG4gICAgLy8gQW4gb2JqZWN0IGNvbnRhaW5pbmcgcmVmZXJlbmNlZCBJRHMgIGFzIGtleXMgaXMgdXNlZCBpZiBvbmx5IHJlZmVyZW5jZWQgSURzIHNob3VsZCBiZSB1bmlxdWlmaWVkLlxuICAgIC8vIElmIHRoaXMgb2JqZWN0IGRvZXMgbm90IGV4aXN0LCBhbGwgSURzIHdpbGwgYmUgdW5pcXVpZmllZC5cbiAgICB2YXIgcmVmZXJlbmNlZElkcyA9IG9ubHlSZWZlcmVuY2VkID8gW10gOiBOVUxMO1xuICAgIHZhciB0YWdOYW1lO1xuICAgIHZhciBpcmlUYWdOYW1lcyA9IHt9O1xuICAgIHZhciBpcmlQcm9wZXJ0aWVzID0gW107XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgaSwgajtcblxuICAgIGlmIChpZEVsZW1lbnRzW19MRU5HVEhfXSkge1xuICAgICAgLy8gTWFrZSBhbGwgSURzIHVuaXF1ZSBieSBhZGRpbmcgdGhlIElEIHN1ZmZpeCBhbmQgY29sbGVjdCBhbGwgZW5jb3VudGVyZWQgdGFnIG5hbWVzXG4gICAgICAvLyB0aGF0IGFyZSBJUkkgcmVmZXJlbmNlYWJsZSBmcm9tIHByb3Blcml0aWVzLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgdGFnTmFtZSA9IGlkRWxlbWVudHNbaV0ubG9jYWxOYW1lOyAvLyBVc2Ugbm9uLW5hbWVzcGFjZWQgdGFnIG5hbWVcbiAgICAgICAgLy8gTWFrZSBJRCB1bmlxdWUgaWYgdGFnIG5hbWUgaXMgSVJJIHJlZmVyZW5jZWFibGVcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gSVJJX1RBR19QUk9QRVJUSUVTX01BUCkge1xuICAgICAgICAgIGlyaVRhZ05hbWVzW3RhZ05hbWVdID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR2V0IGFsbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG1hcHBlZCB0byB0aGUgZm91bmQgSVJJIHJlZmVyZW5jZWFibGUgdGFnc1xuICAgICAgZm9yICh0YWdOYW1lIGluIGlyaVRhZ05hbWVzKSB7XG4gICAgICAgIChJUklfVEFHX1BST1BFUlRJRVNfTUFQW3RhZ05hbWVdIHx8IFt0YWdOYW1lXSkuZm9yRWFjaChmdW5jdGlvbiAobWFwcGVkUHJvcGVydHkpIHtcbiAgICAgICAgICAvLyBBZGQgbWFwcGVkIHByb3BlcnRpZXMgdG8gYXJyYXkgb2YgaXJpIHJlZmVyZW5jaW5nIHByb3BlcnRpZXMuXG4gICAgICAgICAgLy8gVXNlIGxpbmVhciBzZWFyY2ggaGVyZSBiZWNhdXNlIHRoZSBudW1iZXIgb2YgcG9zc2libGUgZW50cmllcyBpcyB2ZXJ5IHNtYWxsIChtYXhpbXVtIDExKVxuICAgICAgICAgIGlmIChpcmlQcm9wZXJ0aWVzLmluZGV4T2YobWFwcGVkUHJvcGVydHkpIDwgMCkge1xuICAgICAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKG1hcHBlZFByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIEFkZCBcInN0eWxlXCIgdG8gcHJvcGVydGllcywgYmVjYXVzZSBpdCBtYXkgY29udGFpbiByZWZlcmVuY2VzIGluIHRoZSBmb3JtICdzdHlsZT1cImZpbGw6dXJsKCNteUZpbGwpXCInXG4gICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChfU1RZTEVfKTtcbiAgICAgIH1cbiAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgU1ZHIGFuZCByZXBsYWNlIElEcyBpbiByZWZlcmVuY2VzLlxuICAgICAgLy8gVG8gZ2V0IGFsbCBkZXNjZW5kaW5nIGVsZW1lbnRzLCBnZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIHNlZW1zIHRvIHBlcmZvcm0gZmFzdGVyIHRoYW4gcXVlcnlTZWxlY3RvckFsbCgnKicpLlxuICAgICAgLy8gU2luY2Ugc3ZnRWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIGRvZXMgbm90IHJldHVybiB0aGUgc3ZnIGVsZW1lbnQgaXRzZWxmLCB3ZSBoYXZlIHRvIGhhbmRsZSBpdCBzZXBhcmF0ZWx5LlxuICAgICAgdmFyIGRlc2NFbGVtZW50cyA9IHN2Z0VsZW1bX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCcqJyk7XG4gICAgICB2YXIgZWxlbWVudCA9IHN2Z0VsZW07XG4gICAgICB2YXIgcHJvcGVydHlOYW1lO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIG5ld1ZhbHVlO1xuICAgICAgZm9yIChpID0gLTE7IGVsZW1lbnQgIT0gTlVMTDspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09IF9TVFlMRV8pIHtcbiAgICAgICAgICAvLyBJZiBlbGVtZW50IGlzIGEgc3R5bGUgZWxlbWVudCwgcmVwbGFjZSBJRHMgaW4gYWxsIG9jY3VyZW5jZXMgb2YgXCJ1cmwoI2FueUlkKVwiIGluIHRleHQgY29udGVudFxuICAgICAgICAgIHZhbHVlID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIHByb3BlcnR5IG5hbWVzIGZvciB3aGljaCBJRHMgd2VyZSBmb3VuZFxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXTsgaisrKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBpcmlQcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgdmFsdWUgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlcGxhY2UgSURzIGluIHhsaW5rOnJlZiBhbmQgaHJlZiBhdHRyaWJ1dGVzXG4gICAgICAgICAgWyd4bGluazpocmVmJywgJ2hyZWYnXS5mb3JFYWNoKGZ1bmN0aW9uKHJlZkF0dHJOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaXJpID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lKTtcbiAgICAgICAgICAgIGlmICgvXlxccyojLy50ZXN0KGlyaSkpIHsgLy8gQ2hlY2sgaWYgaXJpIGlzIG5vbi1udWxsIGFuZCBpbnRlcm5hbCByZWZlcmVuY2VcbiAgICAgICAgICAgICAgaXJpID0gaXJpLnRyaW0oKTtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lLCBpcmkgKyBpZFN1ZmZpeCk7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIElEIHRvIHJlZmVyZW5jZWQgSURzXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpcmkuc3Vic3RyaW5nKDEpXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZGVzY0VsZW1lbnRzWysraV07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICBpZEVsZW0gPSBpZEVsZW1lbnRzW2ldO1xuICAgICAgICAvLyBJZiBzZXQgb2YgcmVmZXJlbmNlZCBJRHMgZXhpc3RzLCBtYWtlIG9ubHkgcmVmZXJlbmNlZCBJRHMgdW5pcXVlLFxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSBhbGwgSURzIHVuaXF1ZS5cbiAgICAgICAgaWYgKCFyZWZlcmVuY2VkSWRzIHx8IHJlZmVyZW5jZWRJZHNbaWRFbGVtLmlkXSkge1xuICAgICAgICAgIC8vIEFkZCBzdWZmaXggdG8gZWxlbWVudCdzIElEXG4gICAgICAgICAgaWRFbGVtLmlkICs9IGlkU3VmZml4O1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiB0cnVlIGlmIFNWRyBlbGVtZW50IGhhcyBjaGFuZ2VkXG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH1cblxuXG4gIC8vIEZvciBjYWNoZWQgU1ZHcyB0aGUgSURzIGFyZSBtYWRlIHVuaXF1ZSBieSBzaW1wbHkgcmVwbGFjaW5nIHRoZSBhbHJlYWR5IGluc2VydGVkIHVuaXF1ZSBJRHMgd2l0aCBhXG4gIC8vIGhpZ2hlciBJRCBjb3VudGVyLiBUaGlzIGlzIG11Y2ggbW9yZSBwZXJmb3JtYW50IHRoYW4gYSBjYWxsIHRvIG1ha2VJZHNVbmlxdWUoKS5cbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZUNhY2hlZChzdmdTdHJpbmcpIHtcbiAgICByZXR1cm4gc3ZnU3RyaW5nLnJlcGxhY2UoSURfU1VGRklYX1JFR0VYLCBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKyk7XG4gIH1cblxuXG4gIC8vIEluamVjdCBTVkcgYnkgcmVwbGFjaW5nIHRoZSBpbWcgZWxlbWVudCB3aXRoIHRoZSBTVkcgZWxlbWVudCBpbiB0aGUgRE9NXG4gIGZ1bmN0aW9uIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoc3ZnRWxlbSkge1xuICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKCdkYXRhLWluamVjdC11cmwnLCBhYnNVcmwpO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBpbWdFbGVtLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3B5QXR0cmlidXRlcykge1xuICAgICAgICAgIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludm9rZSBiZWZvcmVJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGJlZm9yZUluamVjdCA9IG9wdGlvbnMuYmVmb3JlSW5qZWN0O1xuICAgICAgICB2YXIgaW5qZWN0RWxlbSA9IChiZWZvcmVJbmplY3QgJiYgYmVmb3JlSW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0pKSB8fCBzdmdFbGVtO1xuICAgICAgICAvLyBSZXBsYWNlIGltZyBlbGVtZW50IHdpdGggbmV3IGVsZW1lbnQuIFRoaXMgaXMgdGhlIGFjdHVhbCBpbmplY3Rpb24uXG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGluamVjdEVsZW0sIGltZ0VsZW0pO1xuICAgICAgICAvLyBNYXJrIGltZyBlbGVtZW50IGFzIGluamVjdGVkXG4gICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gSU5KRUNURUQ7XG4gICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICAgICAgLy8gSW52b2tlIGFmdGVySW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBhZnRlckluamVjdCA9IG9wdGlvbnMuYWZ0ZXJJbmplY3Q7XG4gICAgICAgIGlmIChhZnRlckluamVjdCkge1xuICAgICAgICAgIGFmdGVySW5qZWN0KGltZ0VsZW0sIGluamVjdEVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNZXJnZXMgYW55IG51bWJlciBvZiBvcHRpb25zIG9iamVjdHMgaW50byBhIG5ldyBvYmplY3RcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKCkge1xuICAgIHZhciBtZXJnZWRPcHRpb25zID0ge307XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBzcGVjaWZpZWQgb3B0aW9ucyBvYmplY3RzIGFuZCBhZGQgYWxsIHByb3BlcnRpZXMgdG8gdGhlIG5ldyBvcHRpb25zIG9iamVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50KSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIG1lcmdlZE9wdGlvbnNba2V5XSA9IGFyZ3VtZW50W2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG4gIH1cblxuXG4gIC8vIEFkZHMgdGhlIHNwZWNpZmllZCBDU1MgdG8gdGhlIGRvY3VtZW50J3MgPGhlYWQ+IGVsZW1lbnRcbiAgZnVuY3Rpb24gYWRkU3R5bGVUb0hlYWQoY3NzKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudFtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ2hlYWQnKVswXTtcbiAgICBpZiAoaGVhZCkge1xuICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oX1NUWUxFXyk7XG4gICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBCdWlsZHMgYW4gU1ZHIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gYnVpbGRTdmdFbGVtZW50KHN2Z1N0ciwgdmVyaWZ5KSB7XG4gICAgaWYgKHZlcmlmeSkge1xuICAgICAgdmFyIHN2Z0RvYztcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBTVkcgc3RyaW5nIHdpdGggRE9NUGFyc2VyXG4gICAgICAgIHN2Z0RvYyA9IHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICBpZiAoc3ZnRG9jW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgncGFyc2VyZXJyb3InKVtfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gRE9NUGFyc2VyIGRvZXMgbm90IHRocm93IGFuIGV4Y2VwdGlvbiwgYnV0IGluc3RlYWQgcHV0cyBwYXJzZXJlcnJvciB0YWdzIGluIHRoZSBkb2N1bWVudFxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdmdEb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gc3ZnU3RyO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBvbmxvYWQgYXR0cmlidXRlLiBTaG91bGQgb25seSBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgdW5zdHlsZWQgaW1hZ2UgZmxhc2ggcHJvdGVjdGlvbiBhbmRcbiAgICAvLyBtYWtlIHRoZSBlbGVtZW50IHZpc2libGUsIG5vdCBmb3IgcmVtb3ZpbmcgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgIGltZ0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdvbmxvYWQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZXJyb3JNZXNzYWdlKG1zZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NWR0luamVjdDogJyArIG1zZyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGZhaWwoaW1nRWxlbSwgc3RhdHVzLCBvcHRpb25zKSB7XG4gICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBGQUlMO1xuICAgIGlmIChvcHRpb25zLm9uRmFpbCkge1xuICAgICAgb3B0aW9ucy5vbkZhaWwoaW1nRWxlbSwgc3RhdHVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlKHN0YXR1cyk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfSU5WQUxJRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX05PVF9TVVBQT1JURUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgZmFpbChpbWdFbGVtLCBMT0FEX0ZBSUwsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKSB7XG4gICAgaW1nRWxlbS5vbmxvYWQgPSBOVUxMO1xuICAgIGltZ0VsZW0ub25lcnJvciA9IE5VTEw7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGltZ05vdFNldChtc2cpIHtcbiAgICBlcnJvck1lc3NhZ2UoJ25vIGltZyBlbGVtZW50Jyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNWR0luamVjdChnbG9iYWxOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgdmFyIHN2Z0xvYWRDYWNoZSA9IHt9O1xuXG4gICAgaWYgKElTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgIC8vIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFNWRywgYWRkIGEgc21hbGwgc3R5bGVzaGVldCB0aGF0IGhpZGVzIHRoZSA8aW1nPiBlbGVtZW50cyB1bnRpbFxuICAgICAgLy8gaW5qZWN0aW9uIGlzIGZpbmlzaGVkLiBUaGlzIGF2b2lkcyBzaG93aW5nIHRoZSB1bnN0eWxlZCBTVkdzIGJlZm9yZSBzdHlsZSBpcyBhcHBsaWVkLlxuICAgICAgYWRkU3R5bGVUb0hlYWQoJ2ltZ1tvbmxvYWRePVwiJyArIGdsb2JhbE5hbWUgKyAnKFwiXXt2aXNpYmlsaXR5OmhpZGRlbjt9Jyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTVkdJbmplY3RcbiAgICAgKlxuICAgICAqIEluamVjdHMgdGhlIFNWRyBzcGVjaWZpZWQgaW4gdGhlIGBzcmNgIGF0dHJpYnV0ZSBvZiB0aGUgc3BlY2lmaWVkIGBpbWdgIGVsZW1lbnQgb3IgYXJyYXkgb2YgYGltZ2BcbiAgICAgKiBlbGVtZW50cy4gUmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IHdoaWNoIHJlc29sdmVzIGlmIGFsbCBwYXNzZWQgaW4gYGltZ2AgZWxlbWVudHMgaGF2ZSBlaXRoZXIgYmVlblxuICAgICAqIGluamVjdGVkIG9yIGZhaWxlZCB0byBpbmplY3QgKE9ubHkgaWYgYSBnbG9iYWwgUHJvbWlzZSBvYmplY3QgaXMgYXZhaWxhYmxlIGxpa2UgaW4gYWxsIG1vZGVybiBicm93c2Vyc1xuICAgICAqIG9yIHRocm91Z2ggYSBwb2x5ZmlsbCkuXG4gICAgICpcbiAgICAgKiBPcHRpb25zOlxuICAgICAqIHVzZUNhY2hlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBTVkcgd2lsbCBiZSBjYWNoZWQgdXNpbmcgdGhlIGFic29sdXRlIFVSTC4gRGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAuXG4gICAgICogY29weUF0dHJpYnV0ZXM6IElmIHNldCB0byBgdHJ1ZWAgdGhlIGF0dHJpYnV0ZXMgd2lsbCBiZSBjb3BpZWQgZnJvbSBgaW1nYCB0byBgc3ZnYC4gRGZhdWx0IHZhbHVlXG4gICAgICogICAgIGlzIGB0cnVlYC5cbiAgICAgKiBtYWtlSWRzVW5pcXVlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBJRCBvZiBlbGVtZW50cyBpbiB0aGUgYDxkZWZzPmAgZWxlbWVudCB0aGF0IGNhbiBiZSByZWZlcmVuY2VzIGJ5XG4gICAgICogICAgIHByb3BlcnR5IHZhbHVlcyAoZm9yIGV4YW1wbGUgJ2NsaXBQYXRoJykgYXJlIG1hZGUgdW5pcXVlIGJ5IGFwcGVuZGluZyBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhXG4gICAgICogICAgIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGluY3JlYXNlcyB3aXRoIGVhY2ggaW5qZWN0aW9uLiBUaGlzIGlzIGRvbmUgdG8gYXZvaWQgZHVwbGljYXRlIElEcyBpbiB0aGUgRE9NLlxuICAgICAqIGJlZm9yZUxvYWQ6IEhvb2sgYmVmb3JlIFNWRyBpcyBsb2FkZWQuIFRoZSBgaW1nYCBlbGVtZW50IGlzIHBhc3NlZCBhcyBhIHBhcmFtZXRlci4gSWYgdGhlIGhvb2sgcmV0dXJuc1xuICAgICAqICAgICBhIHN0cmluZyBpdCBpcyB1c2VkIGFzIHRoZSBVUkwgaW5zdGVhZCBvZiB0aGUgYGltZ2AgZWxlbWVudCdzIGBzcmNgIGF0dHJpYnV0ZS5cbiAgICAgKiBhZnRlckxvYWQ6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGxvYWRlZC4gVGhlIGxvYWRlZCBgc3ZnYCBlbGVtZW50IGFuZCBgc3ZnYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhXG4gICAgICogICAgIHBhcmFtZXRlcnMuIElmIGNhY2hpbmcgaXMgYWN0aXZlIHRoaXMgaG9vayB3aWxsIG9ubHkgZ2V0IGNhbGxlZCBvbmNlIGZvciBpbmplY3RlZCBTVkdzIHdpdGggdGhlXG4gICAgICogICAgIHNhbWUgYWJzb2x1dGUgcGF0aC4gQ2hhbmdlcyB0byB0aGUgYHN2Z2AgZWxlbWVudCBpbiB0aGlzIGhvb2sgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBpbmplY3RlZCBTVkdzXG4gICAgICogICAgIHdpdGggdGhlIHNhbWUgYWJzb2x1dGUgcGF0aC4gSXQncyBhbHNvIHBvc3NpYmxlIHRvIHJldHVybiBhbiBgc3ZnYCBzdHJpbmcgb3IgYHN2Z2AgZWxlbWVudCB3aGljaFxuICAgICAqICAgICB3aWxsIHRoZW4gYmUgdXNlZCBmb3IgdGhlIGluamVjdGlvbi5cbiAgICAgKiBiZWZvcmVJbmplY3Q6IEhvb2sgYmVmb3JlIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuIElmXG4gICAgICogICAgIGFueSBodG1sIGVsZW1lbnQgaXMgcmV0dXJuZWQgaXQgZ2V0cyBpbmplY3RlZCBpbnN0ZWFkIG9mIGFwcGx5aW5nIHRoZSBkZWZhdWx0IFNWRyBpbmplY3Rpb24uXG4gICAgICogYWZ0ZXJJbmplY3Q6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy5cbiAgICAgKiBvbkFsbEZpbmlzaDogSG9vayBhZnRlciBhbGwgYGltZ2AgZWxlbWVudHMgcGFzc2VkIHRvIGFuIFNWR0luamVjdCgpIGNhbGwgaGF2ZSBlaXRoZXIgYmVlbiBpbmplY3RlZCBvclxuICAgICAqICAgICBmYWlsZWQgdG8gaW5qZWN0LlxuICAgICAqIG9uRmFpbDogSG9vayBhZnRlciBpbmplY3Rpb24gZmFpbHMuIFRoZSBgaW1nYCBlbGVtZW50IGFuZCBhIGBzdGF0dXNgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFuIHBhcmFtZXRlci5cbiAgICAgKiAgICAgVGhlIGBzdGF0dXNgIGNhbiBiZSBlaXRoZXIgYCdTVkdfTk9UX1NVUFBPUlRFRCdgICh0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRyksXG4gICAgICogICAgIGAnU1ZHX0lOVkFMSUQnYCAodGhlIFNWRyBpcyBub3QgaW4gYSB2YWxpZCBmb3JtYXQpIG9yIGAnTE9BRF9GQUlMRUQnYCAobG9hZGluZyBvZiB0aGUgU1ZHIGZhaWxlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50IG9yIGFuIGFycmF5IG9mIGltZyBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgd2l0aCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciB0aGlzIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTVkdJbmplY3QoaW1nLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIGFsbEZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvbkFsbEZpbmlzaCA9IG9wdGlvbnMub25BbGxGaW5pc2g7XG4gICAgICAgICAgaWYgKG9uQWxsRmluaXNoKSB7XG4gICAgICAgICAgICBvbkFsbEZpbmlzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW1nICYmIHR5cGVvZiBpbWdbX0xFTkdUSF9dICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgLy8gYW4gYXJyYXkgbGlrZSBzdHJ1Y3R1cmUgb2YgaW1nIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIGluamVjdEluZGV4ID0gMDtcbiAgICAgICAgICB2YXIgaW5qZWN0Q291bnQgPSBpbWdbX0xFTkdUSF9dO1xuXG4gICAgICAgICAgaWYgKGluamVjdENvdW50ID09IDApIHtcbiAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgrK2luamVjdEluZGV4ID09IGluamVjdENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5qZWN0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZ1tpXSwgb3B0aW9ucywgZmluaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb25seSBvbmUgaW1nIGVsZW1lbnRcbiAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZywgb3B0aW9ucywgYWxsRmluaXNoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gcmV0dXJuIGEgUHJvbWlzZSBvYmplY3QgaWYgZ2xvYmFsbHkgYXZhaWxhYmxlXG4gICAgICByZXR1cm4gdHlwZW9mIFByb21pc2UgPT0gX1VOREVGSU5FRF8gPyBydW4oKSA6IG5ldyBQcm9taXNlKHJ1bik7XG4gICAgfVxuXG5cbiAgICAvLyBJbmplY3RzIGEgc2luZ2xlIHN2ZyBlbGVtZW50LiBPcHRpb25zIG11c3QgYmUgYWxyZWFkeSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zLlxuICAgIGZ1bmN0aW9uIFNWR0luamVjdEVsZW1lbnQoaW1nRWxlbSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChpbWdFbGVtKSB7XG4gICAgICAgIHZhciBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSA9IGltZ0VsZW1bX19TVkdJTkpFQ1RdO1xuICAgICAgICBpZiAoIXN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEludm9rZSBiZWZvcmVMb2FkIGhvb2sgaWYgc2V0LiBJZiB0aGUgYmVmb3JlTG9hZCByZXR1cm5zIGEgdmFsdWUgdXNlIGl0IGFzIHRoZSBzcmMgZm9yIHRoZSBsb2FkXG4gICAgICAgICAgLy8gVVJMIHBhdGguIEVsc2UgdXNlIHRoZSBpbWdFbGVtJ3Mgc3JjIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YXIgYmVmb3JlTG9hZCA9IG9wdGlvbnMuYmVmb3JlTG9hZDtcbiAgICAgICAgICB2YXIgc3JjID0gKGJlZm9yZUxvYWQgJiYgYmVmb3JlTG9hZChpbWdFbGVtKSkgfHwgaW1nRWxlbVtfR0VUX0FUVFJJQlVURV9dKCdzcmMnKTtcblxuICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAvLyBJZiBubyBpbWFnZSBzcmMgYXR0cmlidXRlIGlzIHNldCBkbyBubyBpbmplY3Rpb24uIFRoaXMgY2FuIG9ubHkgYmUgcmVhY2hlZCBieSB1c2luZyBqYXZhc2NyaXB0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGlmIG5vIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IHRoZSBvbmxvYWQgYW5kIG9uZXJyb3IgZXZlbnRzIGRvIG5vdCBnZXQgY2FsbGVkXG4gICAgICAgICAgICBpZiAoc3JjID09PSAnJykge1xuICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IGFycmF5IHNvIGxhdGVyIGNhbGxzIGNhbiByZWdpc3RlciBjYWxsYmFja3NcbiAgICAgICAgICB2YXIgb25GaW5pc2hDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IG9uRmluaXNoQ2FsbGJhY2tzO1xuXG4gICAgICAgICAgdmFyIG9uRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihvbkZpbmlzaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYWJzVXJsID0gZ2V0QWJzb2x1dGVVcmwoc3JjKTtcbiAgICAgICAgICB2YXIgdXNlQ2FjaGVPcHRpb24gPSBvcHRpb25zLnVzZUNhY2hlO1xuICAgICAgICAgIHZhciBtYWtlSWRzVW5pcXVlT3B0aW9uID0gb3B0aW9ucy5tYWtlSWRzVW5pcXVlO1xuICAgICAgICAgIFxuICAgICAgICAgIHZhciBzZXRTdmdMb2FkQ2FjaGVWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdLmZvckVhY2goZnVuY3Rpb24oc3ZnTG9hZCkge1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQodmFsKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBzdmdMb2FkID0gc3ZnTG9hZENhY2hlW2Fic1VybF07XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVMb2FkVmFsdWUgPSBmdW5jdGlvbihsb2FkVmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRWYWx1ZSA9PT0gTE9BRF9GQUlMKSB7XG4gICAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9hZFZhbHVlID09PSBTVkdfSU5WQUxJRCkge1xuICAgICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IGxvYWRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnU3RyaW5nID0gbG9hZFZhbHVlWzFdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBsb2FkVmFsdWVbMl07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW07XG5cbiAgICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgaWYgKGhhc1VuaXF1ZUlkcyA9PT0gTlVMTCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJRHMgZm9yIHRoZSBTVkcgc3RyaW5nIGhhdmUgbm90IGJlZW4gbWFkZSB1bmlxdWUgYmVmb3JlLiBUaGlzIG1heSBoYXBwZW4gaWYgcHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5qZWN0aW9uIG9mIGEgY2FjaGVkIFNWRyBoYXZlIGJlZW4gcnVuIHdpdGggdGhlIG9wdGlvbiBtYWtlZElkc1VuaXF1ZSBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzBdID0gaGFzVW5pcXVlSWRzO1xuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMl0gPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNVbmlxdWVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBJRHMgdW5pcXVlIGZvciBhbHJlYWR5IGNhY2hlZCBTVkdzIHdpdGggYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IG1ha2VJZHNVbmlxdWVDYWNoZWQodW5pcXVlSWRzU3ZnU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gc3ZnRWxlbSB8fCBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdmdMb2FkICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgICAgIC8vIFZhbHVlIGZvciB1cmwgZXhpc3RzIGluIGNhY2hlXG4gICAgICAgICAgICAgIGlmIChzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbWUgdXJsIGhhcyBiZWVuIGNhY2hlZCwgYnV0IHZhbHVlIGhhcyBub3QgYmVlbiBsb2FkZWQgeWV0LCBzbyBhZGQgdG8gY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgc3ZnTG9hZC5wdXNoKGhhbmRsZUxvYWRWYWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTG9hZFZhbHVlKHN2Z0xvYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzdmdMb2FkID0gW107XG4gICAgICAgICAgICAgIC8vIHNldCBwcm9wZXJ0eSBpc0NhbGxiYWNrUXVldWUgdG8gQXJyYXkgdG8gZGlmZmVyZW50aWF0ZSBmcm9tIGFycmF5IHdpdGggY2FjaGVkIGxvYWRlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUgPSB0cnVlO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHN2Z0xvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTG9hZCB0aGUgU1ZHIGJlY2F1c2UgaXQgaXMgbm90IGNhY2hlZCBvciBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgICAgbG9hZFN2ZyhhYnNVcmwsIGZ1bmN0aW9uKHN2Z1htbCwgc3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIFhNTCBmcm9tIHRoZSBYSFIgcmVxdWVzdCBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEb2N1bWVudC4gT3RoZXJ3aXNlXG4gICAgICAgICAgICAvLyAoZm9yIGV4YW1wbGUgb2YgSUU5KSwgY3JlYXRlIHRoZSBzdmcgZG9jdW1lbnQgZnJvbSB0aGUgc3ZnIHN0cmluZy5cbiAgICAgICAgICAgIHZhciBzdmdFbGVtID0gc3ZnWG1sIGluc3RhbmNlb2YgRG9jdW1lbnQgPyBzdmdYbWwuZG9jdW1lbnRFbGVtZW50IDogYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBhZnRlckxvYWQgPSBvcHRpb25zLmFmdGVyTG9hZDtcbiAgICAgICAgICAgIGlmIChhZnRlckxvYWQpIHtcbiAgICAgICAgICAgICAgLy8gSW52b2tlIGFmdGVyTG9hZCBob29rIHdoaWNoIG1heSBtb2RpZnkgdGhlIFNWRyBlbGVtZW50LiBBZnRlciBsb2FkIG1heSBhbHNvIHJldHVybiBhIG5ld1xuICAgICAgICAgICAgICAvLyBzdmcgZWxlbWVudCBvciBzdmcgc3RyaW5nXG4gICAgICAgICAgICAgIHZhciBzdmdFbGVtT3JTdmdTdHJpbmcgPSBhZnRlckxvYWQoc3ZnRWxlbSwgc3ZnU3RyaW5nKSB8fCBzdmdFbGVtO1xuICAgICAgICAgICAgICBpZiAoc3ZnRWxlbU9yU3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN2Z0VsZW0gYW5kIHN2Z1N0cmluZyBiZWNhdXNlIG9mIG1vZGlmaWNhdGlvbnMgdG8gdGhlIFNWRyBlbGVtZW50IG9yIFNWRyBzdHJpbmcgaW5cbiAgICAgICAgICAgICAgICAvLyB0aGUgYWZ0ZXJMb2FkIGhvb2ssIHNvIHRoZSBtb2RpZmllZCBTVkcgaXMgYWxzbyB1c2VkIGZvciBhbGwgbGF0ZXIgY2FjaGVkIGluamVjdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2Ygc3ZnRWxlbU9yU3ZnU3RyaW5nID09ICdzdHJpbmcnO1xuICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IGlzU3RyaW5nID8gc3ZnRWxlbU9yU3ZnU3RyaW5nIDogc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBpc1N0cmluZyA/IGJ1aWxkU3ZnRWxlbWVudChzdmdFbGVtT3JTdmdTdHJpbmcsIHRydWUpIDogc3ZnRWxlbU9yU3ZnU3RyaW5nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdmdFbGVtIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gTlVMTDtcbiAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIC8vIHNldCBhbiBhcnJheSB3aXRoIHRocmVlIGVudHJpZXMgdG8gdGhlIGxvYWQgY2FjaGVcbiAgICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShbaGFzVW5pcXVlSWRzLCBzdmdTdHJpbmcsIHVuaXF1ZUlkc1N2Z1N0cmluZ10pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShTVkdfSU5WQUxJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShMT0FEX0ZBSUwpO1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlIGlzIGFuIGFycmF5LiBJbmplY3Rpb24gaXMgbm90IGNvbXBsZXRlIHNvIHJlZ2lzdGVyIGNhbGxiYWNrXG4gICAgICAgICAgICBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBTVkdJbmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBhbiBpbmplY3Rpb24uXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfTtcblxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNWR0luamVjdFxuICAgIFNWR0luamVjdC5jcmVhdGUgPSBjcmVhdGVTVkdJbmplY3Q7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW4gb25lcnJvciBFdmVudCBvZiBhbiBgPGltZz5gIGVsZW1lbnQgdG8gaGFuZGxlIGNhc2VzIHdoZW4gdGhlIGxvYWRpbmcgdGhlIG9yaWdpbmFsIHNyYyBmYWlsc1xuICAgICAqIChmb3IgZXhhbXBsZSBpZiBmaWxlIGlzIG5vdCBmb3VuZCBvciBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRykuIFRoaXMgdHJpZ2dlcnMgYSBjYWxsIHRvIHRoZVxuICAgICAqIG9wdGlvbnMgb25GYWlsIGhvb2sgaWYgYXZhaWxhYmxlLiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB3aWxsIGJlIHNldCBhcyB0aGUgbmV3IHNyYyBhdHRyaWJ1dGVcbiAgICAgKiBmb3IgdGhlIGltZyBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZmFsbGJhY2tTcmNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIGZhbGxiYWNrIHNyY1xuICAgICAqL1xuICAgIFNWR0luamVjdC5lcnIgPSBmdW5jdGlvbihpbWcsIGZhbGxiYWNrU3JjKSB7XG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIGlmIChpbWdbX19TVkdJTkpFQ1RdICE9IEZBSUwpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWcpO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmYWxsYmFja1NyYykge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZmFsbGJhY2tTcmM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93W2dsb2JhbE5hbWVdID0gU1ZHSW5qZWN0O1xuXG4gICAgcmV0dXJuIFNWR0luamVjdDtcbiAgfVxuXG4gIHZhciBTVkdJbmplY3RJbnN0YW5jZSA9IGNyZWF0ZVNWR0luamVjdCgnU1ZHSW5qZWN0Jyk7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTVkdJbmplY3RJbnN0YW5jZTtcbiAgfVxufSkod2luZG93LCBkb2N1bWVudCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuOnJvb3Qge1xuICAtLXRlbXAtb25lOiAjZjA2NTQzO1xuICAtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeTogI2U4ZTllYjtcbiAgLS10ZW1wLXRocmVlOiAjZTBkZmQ1O1xuICAtLXRlbXAtZm91cjogIzMxMzYzODtcbiAgLS10ZW1wLWZpdmU6ICNmMDlkNTE7XG59XG5cbiosXG4qOjpiZWZvcmUsXG4qOjphZnRlciB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xuICBtaW4taGVpZ2h0OiAxMDBkdmg7XG59XG5cbmJvZHkgPiAjd2VhdGhlcl9hcHAge1xuICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2FwcC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx1REFBdUQ7RUFDdkQsK0JBQStCO0VBQy9CLDRDQUEyRTtFQUMzRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG1DQUFtQztFQUNuQyxxQkFBcUI7RUFDckIsb0JBQW9CO0VBQ3BCLG9CQUFvQjtBQUN0Qjs7QUFFQTs7O0VBR0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpREFBaUQ7RUFDakQsc0NBQXNDO0VBQ3RDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBzcmM6IHVybCguL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0Zik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLXRlbXAtb25lOiAjZjA2NTQzO1xcbiAgLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnk6ICNlOGU5ZWI7XFxuICAtLXRlbXAtdGhyZWU6ICNlMGRmZDU7XFxuICAtLXRlbXAtZm91cjogIzMxMzYzODtcXG4gIC0tdGVtcC1maXZlOiAjZjA5ZDUxO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XFxuICBtaW4taGVpZ2h0OiAxMDBkdmg7XFxufVxcblxcbmJvZHkgPiAjd2VhdGhlcl9hcHAge1xcbiAgbWluLWhlaWdodDogaW5oZXJpdDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiAjbWFpbl9jb250ZW50ICovXG4jbWFpbl9jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcbiAgaGVpZ2h0OiBpbmhlcml0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10ZW1wLWZpdmUpO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jb250ZW50LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxrQkFBa0I7QUFDbEI7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYixtQ0FBbUM7QUFDckNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogI21haW5fY29udGVudCAqL1xcbiNtYWluX2NvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRlbXAtZml2ZSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogaW5jbHVkZXMgc2VsZWN0b3JzIGZvciBuYXZiYXIuanMgYW5kIGhlYWRlci5qcyAqL1xuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwLjNyZW07XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcbiAgLyogdmFsdWUgbmVlZHMgdG8gYmUgZXF1YWwgdG8gLm5hdl9idG4gcGFkZGluZyB2YWx1ZSAqL1xuICBtYXJnaW4tdG9wOiAwLjNyZW07XG59XG5cbi8qIG9wdGlvbmFsICovXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gKjpub3QoOmZpcnN0LWNoaWxkKTo6YWZ0ZXIsXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gKjpub3QoOmZpcnN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6ICcnO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMTg3LCA2OSk7XG4gIHotaW5kZXg6IC0xO1xufVxuXG4vKiBvcHRpb25hbCAqL1xuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpOjphZnRlciB7XG4gIHdpZHRoOiAwJTtcbiAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcbiAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4vKiBvcHRpb25hbCAqL1xuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpOmhvdmVyOjphZnRlciB7XG4gIHdpZHRoOiAxMDAlO1xuICB0cmFuc2Zvcm06IHNrZXdYKDhkZWcpIHNjYWxlWCgxLjAzKTtcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkgPiBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDMsIDEwMywgMjIzKTtcbiAgcGFkZGluZzogMXJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zIHtcbiAgd2lkdGg6IG1heC1jb250ZW50O1xuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIwLCAyMjAsIDIyMCk7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICoge1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICouc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDIxNiwgMjUpO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMgPiAqOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0LnZpc2libGUge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbi5uYXZfaXRlbSxcbi5uYXZfaXRlbTp2aXNpdGVkIHtcbiAgY29sb3I6IHZhcigtLXByaW1hcnktZm9udC1jb2xvciwgcmdiKDAsIDAsIDApKTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG4ubmF2X2l0ZW0gPiBzdmcsXG4ubmF2X2J0biA+IHN2ZyB7XG4gIHdpZHRoOiBjbGFtcCgycmVtLCAzdncsIDMuNXJlbSk7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLm5hdl9idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAwLjM1cmVtO1xuICBwYWRkaW5nOiAwLjNyZW07XG4gIHotaW5kZXg6IDE7XG59XG5cbi5uYXZfYnRuOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG59XG5cbi5uYXZfYnRuOmhvdmVyID4gc3ZnIHtcbiAgZmlsdGVyOiBpbnZlcnQoMSk7XG59XG5cbi8qIGZvcm0gc3R5bGVzICovXG4jaGVhZGVyID4gI2Zvcm0ge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMC41cmVtO1xufVxuXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gbGFiZWwge1xuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgM3JlbSk7XG59XG5cbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBpbnB1dCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBiYWNrZ3JvdW5kOiByZ2IoMCwgMTMyLCAyNTUpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIHBhZGRpbmc6IDAuNzVyZW07XG59XG5cbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiAudmFsaWRpdHlfZXJyb3Ige1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIHdpZHRoOiBpbmhlcml0O1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTphZnRlcixcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTpob3ZlcjphZnRlciB7XG4gICAgY29udGVudDogbm9uZTtcbiAgfVxuXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyLFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgdG9wOiBhdXRvO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIH1cblxuICAvKiBvcHRpb25hbCAqL1xuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlciB7XG4gICAgd2lkdGg6IDAlO1xuICAgIGhlaWdodDogMCU7XG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAvKiBvcHRpb25hbCAqL1xuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICAgIHdpZHRoOiA2MCU7XG4gICAgaGVpZ2h0OiAxMiU7XG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKSBzY2FsZVgoMSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICAubmF2X2J0biB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQge1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgcGFkZGluZzogMXJlbSAwO1xuICB9XG5cbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGxhYmVsIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDF2dywgMS4yNXJlbSk7XG4gIH1cblxuICAjaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQge1xuICAgIG1pbi13aWR0aDogNTAlO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxtREFBbUQ7QUFDbkQ7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNEQUFzRDtFQUN0RCxrQkFBa0I7QUFDcEI7O0FBRUEsYUFBYTtBQUNiOztFQUVFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLE1BQU07RUFDTixPQUFPO0VBQ1AsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLGlDQUFpQztBQUNuQzs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxXQUFXO0VBQ1gsbUNBQW1DO0VBQ25DLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsYUFBYTtFQUNiLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsdUNBQXVDO0FBQ3pDOztBQUVBOztFQUVFLDhDQUE4QztFQUM5QyxxQkFBcUI7QUFDdkI7O0FBRUE7O0VBRUUsK0JBQStCO0VBQy9CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsZUFBZTtFQUNmLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGVBQWU7RUFDZixvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUEsZ0JBQWdCO0FBQ2hCO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLDRCQUE0QjtFQUM1QixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQiw2QkFBNkI7SUFDN0IsVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2IsZUFBZTtJQUNmLGNBQWM7RUFDaEI7O0VBRUE7O0lBRUUsYUFBYTtFQUNmOztFQUVBOztJQUVFLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsU0FBUztJQUNULE9BQU87SUFDUCxRQUFRO0lBQ1IsWUFBWTtJQUNaLG1CQUFtQjtFQUNyQjs7RUFFQSxhQUFhO0VBQ2I7SUFDRSxTQUFTO0lBQ1QsVUFBVTtJQUNWLHNCQUFzQjtJQUN0QixpQ0FBaUM7RUFDbkM7O0VBRUEsYUFBYTtFQUNiO0lBQ0UsVUFBVTtJQUNWLFdBQVc7SUFDWCxnQ0FBZ0M7SUFDaEMsaUNBQWlDO0VBQ25DOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixlQUFlO0VBQ2pCOztFQUVBO0lBQ0Usb0NBQW9DO0VBQ3RDOztFQUVBO0lBQ0UsY0FBYztFQUNoQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGluY2x1ZGVzIHNlbGVjdG9ycyBmb3IgbmF2YmFyLmpzIGFuZCBoZWFkZXIuanMgKi9cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAwLjNyZW07XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcXG4gIC8qIHZhbHVlIG5lZWRzIHRvIGJlIGVxdWFsIHRvIC5uYXZfYnRuIHBhZGRpbmcgdmFsdWUgKi9cXG4gIG1hcmdpbi10b3A6IDAuM3JlbTtcXG59XFxuXFxuLyogb3B0aW9uYWwgKi9cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gKjpub3QoOmZpcnN0LWNoaWxkKTo6YWZ0ZXIsXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+ICo6bm90KDpmaXJzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDE4NywgNjkpO1xcbiAgei1pbmRleDogLTE7XFxufVxcblxcbi8qIG9wdGlvbmFsICovXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpOjphZnRlciB7XFxuICB3aWR0aDogMCU7XFxuICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4vKiBvcHRpb25hbCAqL1xcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaTpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0cmFuc2Zvcm06IHNrZXdYKDhkZWcpIHNjYWxlWCgxLjAzKTtcXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpID4gYSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQzLCAxMDMsIDIyMyk7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zIHtcXG4gIHdpZHRoOiBtYXgtY29udGVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIwLCAyMjAsIDIyMCk7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICoge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMgPiAqLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNSwgMjE2LCAyNSk7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICo6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0LnZpc2libGUge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5uYXZfaXRlbSxcXG4ubmF2X2l0ZW06dmlzaXRlZCB7XFxuICBjb2xvcjogdmFyKC0tcHJpbWFyeS1mb250LWNvbG9yLCByZ2IoMCwgMCwgMCkpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4ubmF2X2l0ZW0gPiBzdmcsXFxuLm5hdl9idG4gPiBzdmcge1xcbiAgd2lkdGg6IGNsYW1wKDJyZW0sIDN2dywgMy41cmVtKTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLm5hdl9idG4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XFxuICBwYWRkaW5nOiAwLjNyZW07XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4ubmF2X2J0bjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbi5uYXZfYnRuOmhvdmVyID4gc3ZnIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDEpO1xcbn1cXG5cXG4vKiBmb3JtIHN0eWxlcyAqL1xcbiNoZWFkZXIgPiAjZm9ybSB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gbGFiZWwge1xcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBiYWNrZ3JvdW5kOiByZ2IoMCwgMTMyLCAyNTUpO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxufVxcblxcbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiAudmFsaWRpdHlfZXJyb3Ige1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICoge1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgd2lkdGg6IGluaGVyaXQ7XFxuICB9XFxuXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmFmdGVyLFxcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTpob3ZlcjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IG5vbmU7XFxuICB9XFxuXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlcixcXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB0b3A6IGF1dG87XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICB9XFxuXFxuICAvKiBvcHRpb25hbCAqL1xcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIge1xcbiAgICB3aWR0aDogMCU7XFxuICAgIGhlaWdodDogMCU7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMGRlZyk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gIH1cXG5cXG4gIC8qIG9wdGlvbmFsICovXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBoZWlnaHQ6IDEyJTtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKSBzY2FsZVgoMSk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIC5uYXZfYnRuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQge1xcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgcGFkZGluZzogMXJlbSAwO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGxhYmVsIHtcXG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAxdncsIDEuMjVyZW0pO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0IHtcXG4gICAgbWluLXdpZHRoOiA1MCU7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciBob21lLmpzIG1vZHVsZSAqL1xuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2hvbWUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDhCQUE4QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIGhvbWUuanMgbW9kdWxlICovXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjZm9yZWNhc3QgPiBoZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBtYWdlbnRhO1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBoMiB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG59XG5cbiNmb3JlY2FzdCA+IGhlYWRlciA+IGgyID4gc3BhbiB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgdGV4dC13cmFwOiBub3dyYXA7XG59XG5cbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMXJlbSAycmVtO1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG59XG5cbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleDogMSAwIDBweDtcbiAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtY2hpbGQoMykgPiA6Zmlyc3QtY2hpbGQsXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6Zmlyc3QtY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtb2YtdHlwZSgzKSA+IDpsYXN0LWNoaWxkIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbm1heCgwLCAxZnIpKTtcbiAgICBwYWRkaW5nOiAycmVtIDNyZW07XG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykge1xuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgfVxuXG4gICNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtd3JhcDogYmFsYW5jZTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3RhYnMvZm9yZWNhc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGlDQUFpQztFQUNqQyxhQUFhO0VBQ2IsZUFBZTtFQUNmLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsbUNBQW1DO0VBQ25DLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7O0VBRUUsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0lBQ2IsZ0RBQWdEO0lBQ2hELGtCQUFrQjtJQUNsQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSx3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSxjQUFjO0lBQ2Qsa0JBQWtCO0VBQ3BCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2ZvcmVjYXN0ID4gaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG1hZ2VudGE7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBoMiB7XFxuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgM3JlbSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG5cXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBoMiA+IHNwYW4ge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC13cmFwOiBub3dyYXA7XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXg6IDEgMCAwcHg7XFxuICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1jaGlsZCgzKSA+IDpmaXJzdC1jaGlsZCxcXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6Zmlyc3QtY2hpbGQge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgbWlubWF4KDAsIDFmcikpO1xcbiAgICBwYWRkaW5nOiAycmVtIDNyZW07XFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gICNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpIHtcXG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgfVxcblxcbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB0ZXh0LXdyYXA6IGJhbGFuY2U7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2hvdXJseSA+IGhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IG1hZ2VudGE7XG4gIHBhZGRpbmc6IDJyZW07XG59XG5cbiNob3VybHkgPiBoZWFkZXIgPiBoMiB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG59XG5cbiNob3VybHkgPiBoZWFkZXIgPiBoMiA+IHNwYW4ge1xuICBmb250LXNpemU6IDFyZW07XG4gIHRleHQtd3JhcDogbm93cmFwO1xufVxuXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gaDMge1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NhbG1vbjtcbiAgcGFkZGluZzogMnJlbTtcbiAgdGV4dC13cmFwOiBiYWxhbmNlO1xufVxuXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMXJlbSAycmVtO1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbn1cblxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAwLjVyZW07XG59XG5cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsID4gKiB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi8qIHNlbGVjdHMgdGhlIGxpIHdpdGggdGltZSAqL1xuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6Zmlyc3Qtb2YtdHlwZSA+IGxpIHtcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcbn1cblxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmxhc3Qtb2YtdHlwZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xuICAgIHBhZGRpbmc6IDJyZW0gM3JlbTtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSB7XG4gICAgLyogZmxleDogMC41OyAqL1xuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgfVxuXG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQsXG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmxhc3Qtb2YtdHlwZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3RhYnMvaG91cmx5LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQ0FBaUM7RUFDakMsYUFBYTtFQUNiLGVBQWU7RUFDZixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLDRCQUE0QjtFQUM1QixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBOztFQUVFLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxrQkFBa0I7SUFDbEIscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLHdCQUF3QjtFQUMxQjs7RUFFQTs7SUFFRSxhQUFhO0VBQ2Y7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjaG91cmx5ID4gaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG1hZ2VudGE7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4jaG91cmx5ID4gaGVhZGVyID4gaDIge1xcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG59XFxuXFxuI2hvdXJseSA+IGhlYWRlciA+IGgyID4gc3BhbiB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LXdyYXA6IG5vd3JhcDtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IGgzIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NhbG1vbjtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICB0ZXh0LXdyYXA6IGJhbGFuY2U7XFxufVxcblxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxufVxcblxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsID4gKiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4vKiBzZWxlY3RzIHRoZSBsaSB3aXRoIHRpbWUgKi9cXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpmaXJzdC1vZi10eXBlID4gbGkge1xcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCxcXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpsYXN0LW9mLXR5cGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICAgIHBhZGRpbmc6IDJyZW0gM3JlbTtcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykge1xcbiAgICAvKiBmbGV4OiAwLjU7ICovXFxuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gIH1cXG5cXG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQsXFxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpsYXN0LW9mLXR5cGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlc2hlZXQgZm9yIHRhYnMuanMsIGFuZCB0YWJzX25hdmJhci5qcyAqL1xuI3RhYnNfbmF2YmFyIHtcbiAgYm9yZGVyOiA0cHggc29saWQgcmdiKDI1NSwgMjI1LCAyKTtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuI3RhYnNfbmF2YmFyID4gdWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBjb2x1bW4tZ2FwOiAxcmVtO1xufVxuXG4udGFic19saXN0X2l0ZW0ge1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi8qICN0YWJzX25hdmJhciBhbmNob3JzICovXG4udGFic19saXN0X2l0ZW0gPiAqIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLnRhYnNfbGlzdF9pdGVtID4gKjpob3ZlciB7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTtcbn1cblxuLnRhYnNfbGlzdF9pdGVtID4gW2RhdGEtYWN0aXZlPSd0cnVlJ10ge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XG59XG5cbiN0YWJzOmxhc3QtY2hpbGQge1xuICBib3JkZXI6IDJweCBzb2xpZCBwaW5rO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAudGFic19saXN0X2l0ZW0gPiAqIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFicy90YWJzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwrQ0FBK0M7QUFDL0M7RUFDRSxrQ0FBa0M7RUFDbEMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBLHlCQUF5QjtBQUN6QjtFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLG1DQUFtQztFQUNuQyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlc2hlZXQgZm9yIHRhYnMuanMsIGFuZCB0YWJzX25hdmJhci5qcyAqL1xcbiN0YWJzX25hdmJhciB7XFxuICBib3JkZXI6IDRweCBzb2xpZCByZ2IoMjU1LCAyMjUsIDIpO1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI3RhYnNfbmF2YmFyID4gdWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcbn1cXG5cXG4udGFic19saXN0X2l0ZW0ge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4vKiAjdGFic19uYXZiYXIgYW5jaG9ycyAqL1xcbi50YWJzX2xpc3RfaXRlbSA+ICoge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgdGV4dC13cmFwOiBub3dyYXA7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbi50YWJzX2xpc3RfaXRlbSA+ICo6aG92ZXIge1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4udGFic19saXN0X2l0ZW0gPiBbZGF0YS1hY3RpdmU9J3RydWUnXSB7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XFxufVxcblxcbiN0YWJzOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyOiAycHggc29saWQgcGluaztcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC50YWJzX2xpc3RfaXRlbSA+ICoge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCN0b2RheV9zdW1tYXJ5IHtcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogbWFnZW50YTsgKi9cbiAgYm9yZGVyOiA0cHggc29saWQgcmdiKDAsIDUxLCAxMjgpO1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiB1bCA+IDpmaXJzdC1jaGlsZCB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiBoZWFkZXIgPiBoMyB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IGhlYWRlciA+IGgzID4gc3BhbiB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgdGV4dC13cmFwOiBub3dyYXA7XG59XG5cbiN0b2RheV9zdW1tYXJ5ID4gdWw6bGFzdC1vZi10eXBlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiN0b2RheV9zdW1tYXJ5ID4gdWw6bGFzdC1vZi10eXBlID4gOmxhc3QtY2hpbGQge1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6Zmlyc3QtY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+ICogPiAqIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIge1xuICBwYWRkaW5nOiAycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCB7XG4gIGZsZXg6IDE7XG59XG5cbi8qIHNlbGVjdHMgbGkgd2l0aCBcImZlZWxzIGxpa2VcIiAqL1xuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiA6Zmlyc3QtY2hpbGQgPiA6Zmlyc3QtY2hpbGQge1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgMnZ3LCAxLjVyZW0pO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCA+IDpsYXN0LWNoaWxkIHtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDIuNXJlbSk7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1jb250ZW50OiBlbmQ7XG4gIGNvbHVtbi1nYXA6IDFyZW07XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcbn1cblxuLyogc2VsZWN0cyBsaSdzIHRoYXQgd3JhcCBhbiBpY29uICovXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IC50b2RheV9kZXRhaWxzX3N1biA+ICogPiA6Zmlyc3QtY2hpbGQgPiBzdmcge1xuICB3aWR0aDogY2xhbXAoMS43NXJlbSwgMnZ3LCAzcmVtKTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IC50b2RheV9kZXRhaWxzX3N1biA+ICogPiBsaSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIC8qIGJhY2tncm91bmQtY29sb3I6IGRhcmtvcmFuZ2U7ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHJvdy1nYXA6IDAuMjVyZW07XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAwLjVyZW07XG4gIHBhZGRpbmc6IDEuMjVyZW07XG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gKiB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4vKiBzZWxlY3RzIGxpJ3MgdGhhdCB3cmFwIGFuIGljb24gKi9cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiA6Zmlyc3QtY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOmZpcnN0LWNoaWxkID4gc3ZnIHtcbiAgd2lkdGg6IGNsYW1wKDEuNzVyZW0sIDJ2dywgMnJlbSk7XG4gIGhlaWdodDogYXV0bztcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCA+IDpudGgtY2hpbGQoMikge1xuICBmbGV4OiAxO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgdGV4dC13cmFwOiBub3dyYXA7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkIHtcbiAgICAvKiBmbGV4OiBub25lOyAqL1xuICAgIC8qIG9wdGlvbmFsICovXG4gIH1cblxuICAjdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIGNvbHVtbi1nYXA6IDJyZW07XG4gICAgcm93LWdhcDogMXJlbTtcbiAgICBwYWRkaW5nOiAycmVtO1xuICB9XG5cbiAgI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCB7XG4gICAgY29sdW1uLWdhcDogMS41cmVtO1xuICAgIHBhZGRpbmc6IDJyZW07XG4gIH1cbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YWJzL3RvZGF5LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLCtCQUErQjtFQUMvQixpQ0FBaUM7RUFDakMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsT0FBTztBQUNUOztBQUVBLGlDQUFpQztBQUNqQztFQUNFLGlCQUFpQjtFQUNqQiwwQkFBMEI7RUFDMUIsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUEsbUNBQW1DO0FBQ25DO0VBQ0UsZ0NBQWdDO0VBQ2hDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBLG1DQUFtQztBQUNuQztFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxPQUFPO0VBQ1AsMEJBQTBCO0VBQzFCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFO0lBQ0UsZ0JBQWdCO0lBQ2hCLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsYUFBYTtFQUNmO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI3RvZGF5X3N1bW1hcnkge1xcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogbWFnZW50YTsgKi9cXG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYigwLCA1MSwgMTI4KTtcXG4gIHBhZGRpbmc6IDJyZW07XFxufVxcblxcbiN0b2RheV9zdW1tYXJ5ID4gdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuI3RvZGF5X3N1bW1hcnkgPiB1bCA+IDpmaXJzdC1jaGlsZCB7XFxuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgM3JlbSk7XFxufVxcblxcbiN0b2RheV9zdW1tYXJ5ID4gaGVhZGVyID4gaDMge1xcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XFxufVxcblxcbiN0b2RheV9zdW1tYXJ5ID4gaGVhZGVyID4gaDMgPiBzcGFuIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpsYXN0LWNoaWxkIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gKiA+ICoge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIge1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiA6Zmlyc3QtY2hpbGQge1xcbiAgZmxleDogMTtcXG59XFxuXFxuLyogc2VsZWN0cyBsaSB3aXRoIFxcXCJmZWVscyBsaWtlXFxcIiAqL1xcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkID4gOmZpcnN0LWNoaWxkIHtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDJ2dywgMS41cmVtKTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiA6Zmlyc3QtY2hpbGQgPiA6bGFzdC1jaGlsZCB7XFxuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgMi41cmVtKTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGVuZDtcXG4gIGNvbHVtbi1nYXA6IDFyZW07XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLyogc2VsZWN0cyBsaSdzIHRoYXQgd3JhcCBhbiBpY29uICovXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4gPiAqID4gOmZpcnN0LWNoaWxkID4gc3ZnIHtcXG4gIHdpZHRoOiBjbGFtcCgxLjc1cmVtLCAydncsIDNyZW0pO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IC50b2RheV9kZXRhaWxzX3N1biA+ICogPiBsaSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrb3JhbmdlOyAqL1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICByb3ctZ2FwOiAwLjI1cmVtO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sdW1uLWdhcDogMC41cmVtO1xcbiAgcGFkZGluZzogMS4yNXJlbTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiAqIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4vKiBzZWxlY3RzIGxpJ3MgdGhhdCB3cmFwIGFuIGljb24gKi9cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOmZpcnN0LWNoaWxkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiA6Zmlyc3QtY2hpbGQgPiBzdmcge1xcbiAgd2lkdGg6IGNsYW1wKDEuNzVyZW0sIDJ2dywgMnJlbSk7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiA6bnRoLWNoaWxkKDIpIHtcXG4gIGZsZXg6IDE7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICAvKiBmbGV4OiBub25lOyAqL1xcbiAgICAvKiBvcHRpb25hbCAqL1xcbiAgfVxcblxcbiAgI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgICBjb2x1bW4tZ2FwOiAycmVtO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgfVxcblxcbiAgI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCB7XFxuICAgIGNvbHVtbi1nYXA6IDEuNXJlbTtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY29udGVudC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NvbnRlbnQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ZvcmVjYXN0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZm9yZWNhc3QuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvdXJseS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvdXJseS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFicy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RhYnMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RvZGF5LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdG9kYXkuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgJy4vYXBwLmNzcyc7XG5pbXBvcnQgJ0BpY29uZnUvc3ZnLWluamVjdCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaGVhZGVyQnVpbGRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlcic7XG5pbXBvcnQgbWFpbkJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL21haW4vbWFpbic7XG5pbXBvcnQgJy4vY29udGFpbmVycy9hcGlfY29udHJvbGxlcic7XG5cbigoKSA9PiB7XG4gIGNvbnN0IGJ1aWxkID0ge1xuICAgIGhlYWRlcjogaGVhZGVyQnVpbGRlcixcbiAgICBtYWluOiBtYWluQnVpbGRlcixcbiAgfTtcblxuICBjb25zdCBhcHAgPSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHAuaW5pdCgpIHJ1bm5pbmcnKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCBhcHBXcmFwcGVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBhcHBDb250ZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBhcHBXcmFwcGVyLmlkID0gJ3dlYXRoZXJfYXBwJztcbiAgICAgIGFwcENvbnRlbnQuaWQgPSAnY29udGVudCc7XG5cbiAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnVpbGQuaGVhZGVyKCkpO1xuICAgICAgYXBwQ29udGVudC5hcHBlbmRDaGlsZChidWlsZC5tYWluKCkpO1xuICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChhcHBDb250ZW50KTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHBXcmFwcGVyKTtcbiAgICB9LFxuICB9O1xuXG4gIGFwcC5pbml0KCk7XG59KSgpO1xuXG4vLyBnZXREYXRhKCdsb25kb24nKTtcblxuLy8gdXNlIFdlYXRoZXJBUElcbi8vIGh0dHBzOi8vd3d3LndlYXRoZXJhcGkuY29tL2RvY3MvXG5cbi8vIHRoaW5ncyB0byBkbzpcbi8vIFlvdSBzaG91bGQgYmUgYWJsZSB0byBzZWFyY2ggZm9yIGEgc3BlY2lmaWMgbG9jYXRpb25cbi8vIHRvZ2dsZSBkaXNwbGF5aW5nIHRoZSBkYXRhIGluIEZhaHJlbmhlaXQgb3IgQ2Vsc2l1cy5cbi8vIFlvdSBzaG91bGQgY2hhbmdlIHRoZSBsb29rIG9mIHRoZSBwYWdlIGJhc2VkIG9uIHRoZSBkYXRhLCBtYXliZSBieSBjaGFuZ2luZyB0aGUgY29sb3Igb2YgdGhlIGJhY2tncm91bmQgb3IgYnkgYWRkaW5nIGltYWdlcyB0aGF0IGRlc2NyaWJlIHRoZSB3ZWF0aGVyXG5cbi8vIGlucHV0czpcbi8vIDEuIGNpdHkgb3IgcG9zdGFsIGNvZGVzXG5cbi8vIGRlc2lnbjpcbi8vIGFkZCBhIOKAmGxvYWRpbmfigJkgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgZnJvbSB0aGUgdGltZSB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgdW50aWwgdGhlIGluZm9ybWF0aW9uIGNvbWVzIGJhY2sgZnJvbSB0aGUgQVBJLlxuLy8gMyBkYXkgZm9yZWNhc3Rcbi8vIGhvdXJseSBhbmQgZGFpbHkgZm9yZWNhc3RcblxuLy8gbGF5b3V0OlxuLy8gPGFwcD5cbi8vICAgIDxoZWFkZXI+IChuYXZpZ2F0aW9uKVxuLy8gICAgPGNvbnRlbnQ+XG4vLyAgICAgIDxoZWFkaW5nPlxuLy8gICAgICA8aW5wdXQ+ICh3aXRoIEMvRiB0b2dnbGUgYnV0dG9uKVxuLy8gICAgICA8b3V0cHV0PlxuLy8gICAgICAgIDx0b2RheT4gKGdldCBjdXJyZW50IGRhdGUpXG4vLyAgICAgICAgPGhvdXJseT4gKGdldCB1c2VyJ3MgY3VycmVudCB0aW1lKVxuLy8gICAgICAgICAgdGltZSB8IGNvbmRpdGlvbnMgfCB0ZW1wIHwgZmVlbHMgbGlrZSB8IHByZWNpcCBjaGFuY2UgJSB8IHByZWNpcCBhbW91bnQgJSB8IGNsb3VkIGNvdmVyICUgfCBkZXcgcG9pbnQgfCBodW1pZGl0eSAlIHwgd2luZCBzcGVlZCBBTkQgZGlyZWN0aW9uXG4vLyAgICAgICAgPDMtZGF5PiAoMy1kYXkgZm9yZWNhc3QpXG4vLyAgICA8Zm9vdGVyPlxuIiwidmFyIG1hcCA9IHtcblx0XCIuL2NoYW5jZV9vZl9yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGFuY2Vfb2ZfcmFpbi5zdmdcIixcblx0XCIuL2h1bWlkaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9odW1pZGl0eS5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCIsXG5cdFwiLi9taW5tYXh0ZW1wLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9taW5tYXh0ZW1wLnN2Z1wiLFxuXHRcIi4vcHJlc3N1cmUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3ByZXNzdXJlLnN2Z1wiLFxuXHRcIi4vcHJvZ3Jlc3NfYWN0aXZpdHkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3Byb2dyZXNzX2FjdGl2aXR5LnN2Z1wiLFxuXHRcIi4vc2hhcnBfaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvc2hhcnBfaG9tZS5zdmdcIixcblx0XCIuL3N1bnJpc2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3N1bnJpc2Uuc3ZnXCIsXG5cdFwiLi9zdW5zZXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3N1bnNldC5zdmdcIixcblx0XCIuL3V2LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy91di5zdmdcIixcblx0XCIuL3Zpc2liaWxpdHkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3Zpc2liaWxpdHkuc3ZnXCIsXG5cdFwiLi93aW5kLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy93aW5kLnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyBcXFxcLnN2ZyRcIjsiLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuXG5jb25zdCBlcnJvckJ1aWxkZXIgPSB7XG4gIGluaXQod2VhdGhlckVycm9yKSB7XG4gICAgdGhpcy5zZXRFcnJvcih3ZWF0aGVyRXJyb3IpO1xuICB9LFxuICBzZXRFcnJvcihlcnJvcikge1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvci5lcnJvcjtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGBFcnJvciBjb2RlOiAke2Vycm9yLnN0YXR1c31cbiAgICAke2Vycm9yLmVycm9yLm1lc3NhZ2V9YDtcbiAgfSxcbiAgY2FjaGVET00oKSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZXJyb3JTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGVycm9ySGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgZXJyb3JTZWN0aW9uLmlkID0gJ2Vycm9yJztcbiAgICBlcnJvckhlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiB0aGlzLmVycm9yTWVzc2FnZSB9KTtcblxuICAgIGVycm9yU2VjdGlvbi5hcHBlbmRDaGlsZChlcnJvckhlYWRpbmcpO1xuICAgIHJldHVybiBlcnJvclNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlcnJvckhlYWRlcih3ZWF0aGVyRXJyb3IpIHtcbiAgZXJyb3JCdWlsZGVyLmluaXQod2VhdGhlckVycm9yKTtcbiAgcmV0dXJuIGVycm9yQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFtcbiAgLy8ge1xuICAvLyAgIGVsZW1lbnQ6ICdoMScsXG4gIC8vICAgYXR0cmlidXRlczoge1xuICAvLyAgICAgaWQ6ICdoZXJvJyxcbiAgLy8gICAgIHRleHRDb250ZW50OiAnd2VhdGhlciBhcHAnLFxuICAvLyAgIH0sXG4gIC8vIH0sXG4gIHtcbiAgICBlbGVtZW50OiAnZm9ybScsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6ICdmb3JtJyxcbiAgICB9LFxuICAgIGlucHV0czogW1xuICAgICAge1xuICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaWQ6ICdsb2NhdGlvbicsXG4gICAgICAgICAgY2xhc3M6ICdmb3JtX2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnbG9jYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRW50ZXIgY2l0eSBvciBwb3N0YWwgY29kZScsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAnRW50ZXIgYSB2YWxpZCBjaXR5IG9yIHBvc3RhbCBjb2RlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogJ3VuaXRzeXN0ZW0nLFxuICAgICAgICAgIGNsYXNzOiAnZm9ybV9pbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ3VuaXRzeXN0ZW0nLFxuICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBgRW50ZXIgJ2ltcGVyaWFsJyBvciAnbWV0cmljJ2AsXG4gICAgICAgICAgdmFsdWU6ICdpbXBlcmlhbCcsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL2hlYWRlci5jb25maWcnO1xuaW1wb3J0IGJ1aWxkTmF2YmFyIGZyb20gJy4uL25hdmJhci9uYXZiYXInO1xuaW1wb3J0IHsgc2V0VW5pdFN5c3RlbSB9IGZyb20gJy4uL3RhYnMvdW5pdHN5c3RlbXMnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvaGVhZGVyLmNzcyc7XG5cbmNvbnN0IGhlYWRlckJ1aWxkZXIgPSB7XG4gIGNhY2hlRE9NKGhlYWRlckVsZW1lbnQpIHtcbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlckVsZW1lbnQ7XG4gICAgdGhpcy5mb3JtID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICAgIHRoaXMuaW5wdXRTZWFyY2ggPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpO1xuICAgIHRoaXMuaW5wdXRVbml0c3lzdGVtID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjdW5pdHN5c3RlbScpO1xuICAgIHRoaXMuaW5wdXRFcnJvcnMgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52YWxpZGl0eV9lcnJvcicpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0VW5pdFN5c3RlbSA9IHRoaXMuc2V0VW5pdFN5c3RlbS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0QWN0aXZlVGFiID0gdGhpcy5zZXRBY3RpdmVUYWIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdzZXRVbml0U3lzdGVtJywgdGhpcy5zZXRVbml0U3lzdGVtKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdzZXRBY3RpdmVUYWInLCB0aGlzLnNldEFjdGl2ZVRhYik7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyRWxlbWVudC5pZCA9ICdoZWFkZXInO1xuICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoYnVpbGROYXZiYXIucmVuZGVyKCkpO1xuXG4gICAgT2JqZWN0LmtleXMoaGVhZGVyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGhlYWRlckl0ZW0gPSBjcmVhdGVFbGVtZW50KGhlYWRlcltrZXldLmVsZW1lbnQpO1xuICAgICAgaGVhZGVySXRlbS5zZXRBdHRyaWJ1dGVzKGhlYWRlcltrZXldLmF0dHJpYnV0ZXMpO1xuXG4gICAgICBpZiAoaGVhZGVyW2tleV0uaW5wdXRzKSB7XG4gICAgICAgIGhlYWRlcltrZXldLmlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY29uc3QgaW5wdXRMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgY29uc3QgZm9ybUlucHV0ID0gY3JlYXRlRWxlbWVudChpbnB1dC5lbGVtZW50KTtcbiAgICAgICAgICBjb25zdCBpbnB1dEVycm9yID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgaW5wdXRFcnJvci5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGNsYXNzOiBgdmFsaWRpdHlfZXJyb3IgJHtpbnB1dC5hdHRyaWJ1dGVzLmlkfWAsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogaW5wdXQuZXJyb3IsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybUlucHV0LnNldEF0dHJpYnV0ZXMoaW5wdXQuYXR0cmlidXRlcyk7XG4gICAgICAgICAgaW5wdXRMYWJlbC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGZvcjogaW5wdXQuYXR0cmlidXRlcy5pZCxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBpbnB1dC5hdHRyaWJ1dGVzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZvcm1JdGVtLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2Zvcm1faXRlbScgfSk7XG5cbiAgICAgICAgICBpZiAoaW5wdXQuZXJyb3IpIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0TGFiZWwpO1xuICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGZvcm1JbnB1dCk7XG4gICAgICAgICAgaWYgKGlucHV0LmVycm9yKSBmb3JtSXRlbS5hcHBlbmRDaGlsZChpbnB1dEVycm9yKTtcbiAgICAgICAgICBoZWFkZXJJdGVtLmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVySXRlbSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRE9NKGhlYWRlckVsZW1lbnQpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xuICB9LFxuICBzdWJtaXRGb3JtKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldFVuaXRTeXN0ZW0odGhpcy5pbnB1dFVuaXRzeXN0ZW0udmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHB1YlN1Yi5wdWJsaXNoKCdnZXRBY3RpdmVUYWInLCAnZm9vJykpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdnZXRXZWF0aGVyJywgdGhpcy5pbnB1dFNlYXJjaC52YWx1ZSwgdGhpcy5hY3RpdmVUYWIpO1xuICB9LFxuICBzZXRVbml0U3lzdGVtKHNlbGVjdGlvbikge1xuICAgIHRoaXMuaW5wdXRVbml0c3lzdGVtLnZhbHVlID0gc2VsZWN0aW9uO1xuICAgIGlmICh0aGlzLmlucHV0U2VhcmNoLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zdWJtaXRGb3JtKCk7XG4gICAgfVxuICB9LFxuICBzZXRBY3RpdmVUYWIoa2V5KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSBrZXk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcigpIHtcbiAgcmV0dXJuIGhlYWRlckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvaG9tZS5jc3MnO1xuXG5jb25zdCBob21lQnVpbGRlciA9IHtcbiAgY2FjaGVET00oKSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlRE9NKCkgcnVubmluZyBmcm9tIGhvbWUuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBob21lLmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob21lU2VjdGlvbi5pZCA9ICdob21lJztcbiAgICBjb25zdCBob21lSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaG9tZUhlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiAnSE9NRScgfSk7XG5cbiAgICBob21lU2VjdGlvbi5hcHBlbmRDaGlsZChob21lSGVhZGluZyk7XG5cbiAgICByZXR1cm4gaG9tZVNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhvbWUoKSB7XG4gIHJldHVybiBob21lQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5cbmNvbnN0IGxvYWRpbmdCdWlsZGVyID0ge1xuICBjYWNoZURPTSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGVET00oKSBydW5uaW5nIGZyb20gbG9hZGluZy5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIGxvYWRpbmcuanMnKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGxvYWRpbmdTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGxvYWRpbmdTZWN0aW9uLmlkID0gJ2xvYWRpbmcnO1xuICAgIGNvbnN0IGxvYWRpbmdIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBsb2FkaW5nSGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6ICdMT0FESU5HLi4uJyB9KTtcblxuICAgIGxvYWRpbmdTZWN0aW9uLmFwcGVuZENoaWxkKGxvYWRpbmdIZWFkaW5nKTtcblxuICAgIHJldHVybiBsb2FkaW5nU2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG9tZSgpIHtcbiAgcmV0dXJuIGxvYWRpbmdCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YlN1Yic7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGhvbWVCdWlsZGVyIGZyb20gJy4uL2hvbWUvaG9tZSc7XG5pbXBvcnQgZXJyb3JCdWlsZGVyIGZyb20gJy4uL2Vycm9yL2Vycm9yJztcbmltcG9ydCB0YWJzQnVpbGRlciBmcm9tICcuLi90YWJzL3RhYnMnO1xuaW1wb3J0IGxvYWRpbmdCdWlsZGVyIGZyb20gJy4uL2xvYWRpbmcvbG9hZGluZyc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9jb250ZW50LmNzcyc7XG5cbmNvbnN0IGJ1aWxkID0ge1xuICBob21lOiBob21lQnVpbGRlcixcbiAgZXJyb3I6IGVycm9yQnVpbGRlcixcbiAgdGFiczogdGFic0J1aWxkZXIsXG4gIGxvYWRpbmc6IGxvYWRpbmdCdWlsZGVyLFxufTtcblxuY29uc3QgbWFpbkJ1aWxkZXIgPSB7XG4gIGFjdGl2ZUNvbnRlbnQ6IG51bGwsXG4gIGFjdGl2ZVRhYjogbnVsbCxcbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZygnaW5pdCgpIG1ldGhpZCBydW5uaW5nIGZyb20gbWFpbi5qcycpO1xuICB9LFxuICBjYWNoZURPTShtYWluRWxlbWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gICAgdGhpcy5tYWluID0gbWFpbkVsZW1lbnQ7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gbWFpbi5qcycpO1xuICAgIHRoaXMuc3dpdGNoQ29udGVudCA9IHRoaXMuc3dpdGNoQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3N3aXRjaENvbnRlbnQnLCB0aGlzLnN3aXRjaENvbnRlbnQpO1xuICB9LFxuICByZW5kZXIoa2V5LCBkYXRhLCByZW5kZXJLZXkpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcblxuICAgIGxldCBjb250ZW50O1xuICAgIGlmICgha2V5KSB7XG4gICAgICAvLyBpbml0aWFsIG9ubG9hZFxuICAgICAgY29udGVudCA9IGJ1aWxkLmhvbWUoKTtcbiAgICAgIC8vIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW5kZXIgdG9kYXlcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKGRhdGEsIHJlbmRlcktleSk7XG4gICAgICB0aGlzLm1haW4ubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIHN3aXRjaENvbnRlbnQod2VhdGhlckRhdGEsIHJlbmRlcktleSkge1xuICAgIGxldCBjb250ZW50S2V5O1xuICAgIGNvbnNvbGUubG9nKCdzd2l0Y2hDb250ZW50KCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcbiAgICBpZiAod2VhdGhlckRhdGEuZXJyb3IpIHtcbiAgICAgIGNvbnRlbnRLZXkgPSAnZXJyb3InO1xuICAgIH0gZWxzZSBpZiAod2VhdGhlckRhdGEgPT09ICdsb2FkaW5nJykge1xuICAgICAgY29udGVudEtleSA9ICdsb2FkaW5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2ZldGNoIHN1Y2Nlc3MnKTtcbiAgICAgIGNvbnRlbnRLZXkgPSAndGFicyc7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKGNvbnRlbnRLZXksIHdlYXRoZXJEYXRhLCByZW5kZXJLZXkpO1xuICB9LFxuICBzZXRBY3RpdmVUYWIodGFiKSB7XG4gICAgY29uc29sZS5sb2coJ3NldEFjdGl2ZVRhYigpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gIC8vIHJldHVybiBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgbWFpbi5pZCA9ICdtYWluX2NvbnRlbnQnO1xuICBtYWluQnVpbGRlci5jYWNoZURPTShtYWluKTtcbiAgbWFpbkJ1aWxkZXIuYmluZEV2ZW50cygpO1xuICBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgcmV0dXJuIG1haW47XG59XG4iLCJpbXBvcnQgSWxsdXN0cmF0aW9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pbGx1c3RyYXRpb25zL3VuZHJhd193ZWF0aGVyX2FwcC5zdmcnO1xuaW1wb3J0IEljb25NZW51IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9tZW51LnN2Zyc7XG5pbXBvcnQgSWNvbkdpdGh1YiBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvZ2l0aHViX21hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYXZMZWZ0OiBbXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0gbmF2X2xvZ28nLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBzcmM6IElsbHVzdHJhdGlvbixcbiAgICAgICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdoMScsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICdXZWF0aGVyIEFwcCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgbmF2UmlnaHQ6IFtcbiAgICB7XG4gICAgICBlbGVtZW50OiAnZGl2JyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgY2xhc3M6ICd1bml0X3N5c3RlbXNfYnV0dG9ucycsXG4gICAgICB9LFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIGlkOiAnaW1wZXJpYWwnLFxuICAgICAgICAgICAgY2xhc3M6ICd1bml0X3N5c3RlbXNfYnV0dG9uIHNlbGVjdGVkJyxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgdmFsdWU6ICdpbXBlcmlhbCcsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogJ8KwRicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIGlkOiAnbWV0cmljJyxcbiAgICAgICAgICAgIGNsYXNzOiAndW5pdF9zeXN0ZW1zX2J1dHRvbicsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAnbWV0cmljJyxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiAnwrBDJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVsZW1lbnQ6ICdhJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgICAgdGV4dENvbnRlbnQ6ICdQbGFjZWhvbGRlcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0nLFxuICAgICAgICB0ZXh0Q29udGVudDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBlbGVtZW50OiAnYScsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vbWlrZXlDb3MvdGhlT2RpblByb2plY3QvdHJlZS9tYWluL2phdmFTY3JpcHQvcHJvamVjdHMvd2VhdGhlci1hcHAnLFxuICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgc3JjOiBJY29uR2l0aHViLFxuICAgICAgICAgICAgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICBtZW51QnV0dG9uOiB7XG4gICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICduYXZfYnRuJyxcbiAgICB9LFxuICAgIGNoaWxkOiB7XG4gICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgc3JjOiBJY29uTWVudSxcbiAgICAgICAgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgJy4uLy4uL3N0eWxlcy9oZWFkZXIuY3NzJztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXIuY29uZmlnJztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgcHViU3ViIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHViU3ViJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjYWNoZURPTShuYXZFbGVtZW50KSB7XG4gICAgdGhpcy5uYXZiYXIgPSBuYXZFbGVtZW50O1xuICAgIHRoaXMubmF2UmlnaHQgPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfcmlnaHQnKTtcbiAgICB0aGlzLm5hdkxpbmtzID0gbmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmF2X2l0ZW0nKTtcbiAgICB0aGlzLm5hdkJ0biA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9idG4nKTtcbiAgICB0aGlzLnVuaXRTeXN0ZW1zQnRucyA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuaXRfc3lzdGVtc19idXR0b24nKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnRvZ2dsZU5hdiA9IHRoaXMudG9nZ2xlTmF2LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRVbml0U3lzdGVtID0gdGhpcy5zZXRVbml0U3lzdGVtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdik7XG4gICAgdGhpcy51bml0U3lzdGVtc0J0bnMuZm9yRWFjaCgoYnRuKSA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldFVuaXRTeXN0ZW0pKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBjb25zdCBuYXZDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuYXZFbGVtZW50LmlkID0gJ25hdmJhcic7XG4gICAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgT2JqZWN0LmtleXMobmF2YmFyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5hdmJhcltrZXldKSkge1xuICAgICAgICBjb25zdCBzZWN0aW9uID0gY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKGtleS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdsZWZ0JykgPyAnbmF2X2xlZnQnIDogJ25hdl9yaWdodCcpO1xuICAgICAgICBuYXZiYXJba2V5XS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGkgPSBjcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVzKGl0ZW0uYXR0cmlidXRlcyk7XG5cbiAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBjcmVhdGVFbGVtZW50KGNoaWxkLmVsZW1lbnQpO1xuICAgICAgICAgICAgICBjaGlsZE5vZGUuc2V0QXR0cmlidXRlcyhjaGlsZC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBidG4gPSBjcmVhdGVFbGVtZW50KG5hdmJhcltrZXldLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpbWcgPSBjcmVhdGVFbGVtZW50KG5hdmJhcltrZXldLmNoaWxkLmVsZW1lbnQpO1xuICAgICAgICBidG4uc2V0QXR0cmlidXRlcyhuYXZiYXJba2V5XS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZXMobmF2YmFyW2tleV0uY2hpbGQuYXR0cmlidXRlcyk7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBuYXZDb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2Q29udGFpbmVyKTtcbiAgICB0aGlzLmNhY2hlRE9NKG5hdkVsZW1lbnQpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIG5hdkVsZW1lbnQ7XG4gIH0sXG4gIHRvZ2dsZU5hdigpIHtcbiAgICBpZiAodGhpcy5uYXZSaWdodC5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xuICAgICAgdGhpcy5uYXZSaWdodC5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF2UmlnaHQuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICAgIH1cbiAgfSxcbiAgc2V0VW5pdFN5c3RlbShlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGUuY3VycmVudFRhcmdldDtcbiAgICBbLi4udGhpcy51bml0U3lzdGVtc0J0bnNdXG4gICAgICAuZmluZCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKVxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzZXRVbml0U3lzdGVtJywgZWxlbWVudC52YWx1ZSk7XG4gIH0sXG59O1xuIiwiLy8gZm9yZWNhc3RkYXkuZGF0ZSB8XG4vLyAoZm9yZWNhc3RkYXkuZGF5Lm1heHRlbXBfZlxuLy8gZm9yZWNhc3RkYXkuZGF5Lm1pbnRlbXBfZilcbi8vIGZvcmVjYXN0ZGF5LmRheS5jb25kaXRpb25cbi8vIGZvcmVjYXN0ZGF5LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbiB8XG4vLyB3aW5kXG4vLyBOVywgTk5XLCBOLCBOTkUsIE5FXG4vLyBFTkUsIEUsIEVTRVxuLy8gU0UsIFNTRSwgUywgU1NXLCBTV1xuLy8gV1NXLCBXLCBXTldcbi8vIGltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9pbXBvcnRBbGwnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCBmb3JtYXREYXRlIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0RGF0ZSc7XG5pbXBvcnQgeyB1bml0U3lzdGVtIH0gZnJvbSAnLi4vdW5pdHN5c3RlbXMnO1xuXG5jb25zdCBkYXRhID0gKHN0YXRlKSA9PiBbXG4gIHtcbiAgICBrZXk6ICdkYXRlJyxcbiAgICB2YWx1ZTogc3RhdGUuZGF0ZSxcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke2Zvcm1hdERhdGUodGhpcy52YWx1ZSwgdHJ1ZSl9YDtcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAnbWlubWF4dGVtcCcsXG4gICAgbWluOiB7XG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdtaW50ZW1wXycsICd0ZW1wJyksXG4gICAgICBsYWJlbDogJ2xvdycsXG4gICAgfSxcbiAgICBtYXg6IHtcbiAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ21heHRlbXBfJywgJ3RlbXAnKSxcbiAgICAgIGxhYmVsOiAnaGlnaCcsXG4gICAgfSxcbiAgICB1bml0OiAnwrAnLFxuICAgIGxhYmVsOiBgaGlnaCAvIGxvd2AsXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm1heC52YWx1ZX0ke3RoaXMudW5pdH0gLyAke3RoaXMubWluLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGtleTogJ2NvbmRpdGlvbicsXG4gICAgbGFiZWw6IHN0YXRlLmNvbmRpdGlvbi50ZXh0LFxuICAgIGljb246IHN0YXRlLmNvbmRpdGlvbi5pY29uLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH1gO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdwcmVjaXAnLFxuICAgIHZhbHVlOiBzdGF0ZS5kYWlseV9jaGFuY2Vfb2ZfcmFpbixcbiAgICB1bml0OiAnJScsXG4gICAgaWNvbjogc3RhdGUuc2V0SWNvbigncmFpbicpLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgIH0sXG4gIH0sXG5dO1xuXG5jb25zdCBsb2NhdGlvbiA9IChzdGF0ZSkgPT4gKHtcbiAgbG9jYXRpb246IHtcbiAgICBjb3VudHJ5OiBzdGF0ZS5jb3VudHJ5LFxuICAgIGxvY2FsdGltZTogc3RhdGUubG9jYWx0aW1lLFxuICAgIG5hbWU6IHN0YXRlLm5hbWUsXG4gICAgcmVnaW9uOiBzdGF0ZS5yZWdpb24sXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LCAke1xuICAgICAgICB0aGlzLnJlZ2lvbi5sZW5ndGggPT09IDAgfHwgdGhpcy5yZWdpb24gPT09IHRoaXMubmFtZSA/IHRoaXMuY291bnRyeSA6IHRoaXMucmVnaW9uXG4gICAgICB9YDtcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IGZvcmVjYXN0Q29udHJvbGxlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLnNldERheSA9IHRoaXMuc2V0RGF5LmJpbmQodGhpcyk7XG4gICAgY29uc3QgZm9yZWNhc3RkYXkgPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAodGhpcy5zZXREYXkpO1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4ud2VhdGhlckRhdGEubG9jYXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5sb2NhdGlvbihzdGF0ZSksXG4gICAgICBmb3JlY2FzdGRheSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZSh3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxuICBzZXREYXkob2JqKSB7XG4gICAgY29uc3QgZGF5cyA9IG9iajtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgIC4uLnVuaXRTeXN0ZW0sXG4gICAgICAuLi5vYmouZGF5LFxuICAgICAgLi4ub2JqLFxuICAgIH07XG5cbiAgICByZXR1cm4geyAuLi5kYXRhKHN0YXRlKSB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICB0aGlzLnNldFByb3BlcnRpZXMoZm9yZWNhc3RDb250cm9sbGVyLmluaXQod2VhdGhlckRhdGEpKTtcbiAgfSxcbiAgc2V0UHJvcGVydGllcyhvYmopIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gIH0sXG59O1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBmb3JlY2FzdCBmcm9tICcuL2ZvcmVjYXN0LmNvbmZpZyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy90YWJzL2ZvcmVjYXN0LmNzcyc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5pbXBvcnQgZm9ybWF0VGltZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdFRpbWUnO1xuXG5jb25zdCBmb3JlY2FzdEJ1aWxkZXIgPSB7XG4gIGluaXQoKSB7fSxcbiAgY2FjaGVET00oKSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlRE9NKCkgcnVubmluZyBmcm9tIGZvcmVjYXN0LmpzJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gZm9yZWNhc3QuanMnKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXIoKSBydW5uaW5nIGZyb20gZm9yZWNhc3QuanMnKTtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdCk7XG4gICAgY29uc3QgZm9yZWNhc3RTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGZvcmVjYXN0U2VjdGlvbkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IGZvcmVjYXN0U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNvbnN0IGZvcmVjYXN0TG9jYXRpb24gPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgZm9yZWNhc3RUaW1lU3RhbXAgPSBjcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICBmb3JlY2FzdFNlY3Rpb24uaWQgPSAnZm9yZWNhc3QnO1xuICAgIGZvcmVjYXN0U2VjdGlvbkhlYWRpbmcudGV4dENvbnRlbnQgPSAnMyBEYXkgV2VhdGhlcic7XG4gICAgZm9yZWNhc3RMb2NhdGlvbi50ZXh0Q29udGVudCA9IGAgLSAke2ZvcmVjYXN0LmxvY2F0aW9uLnNldFRleHQoKX1gO1xuICAgIGZvcmVjYXN0VGltZVN0YW1wLnRleHRDb250ZW50ID0gYEFzIG9mICR7Zm9yZWNhc3QubGFzdF91cGRhdGVkfWA7XG5cbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nLmFwcGVuZENoaWxkKGZvcmVjYXN0TG9jYXRpb24pO1xuICAgIGZvcmVjYXN0U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChmb3JlY2FzdFNlY3Rpb25IZWFkaW5nKTtcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lU3RhbXApO1xuICAgIGZvcmVjYXN0U2VjdGlvbi5hcHBlbmRDaGlsZChmb3JlY2FzdFNlY3Rpb25IZWFkZXIpO1xuXG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgY29uc3QgZm9yZWNhc3REZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGZvcmVjYXN0RGV0YWlscy5pZCA9ICdmb3JlY2FzdF9kZXRhaWxzJztcblxuICAgIGZvcmVjYXN0LmZvcmVjYXN0ZGF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgICAgY29uc3QgZm9yZWNhc3RkYXkgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGZvcmVjYXN0ZGF5LmNsYXNzTmFtZSA9ICdkYXknO1xuICAgICAgT2JqZWN0LnZhbHVlcyhkYXkpLmZvckVhY2goKGRldGFpbCkgPT4ge1xuICAgICAgICBmb3JlY2FzdGRheS5hcHBlbmQoY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5zZXRUZXh0KCkpKTtcbiAgICAgIH0pO1xuICAgICAgZm9yZWNhc3REZXRhaWxzLmFwcGVuZENoaWxkKGZvcmVjYXN0ZGF5KTtcbiAgICB9KTtcbiAgICAvLyB0ZW1wb3JhcnlcbiAgICBmb3JlY2FzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9yZWNhc3REZXRhaWxzKTtcbiAgICByZXR1cm4gZm9yZWNhc3RTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JlY2FzdCh3ZWF0aGVyRGF0YSwgdGltZVN0YW1wKSB7XG4gIGZvcmVjYXN0LmluaXQod2VhdGhlckRhdGEsIHRpbWVTdGFtcCk7XG4gIHJldHVybiBmb3JlY2FzdEJ1aWxkZXIucmVuZGVyKCk7XG59XG5cbi8vIGRhdGUgfCB0ZW1wIGhpZ2ggLyBsb3cgfCBjb25kaXRpb24gfCBwcmVjaXB0YXRpb24gJSB8IHdpbmRcbi8vIGV4YW1wbGVcbi8vIFdlZCAyMCB8IDYwwrAgLyA0N8KwIHwgU3VubnkgfCAxJSB8IE5ORSA2IG1waFxuIiwiLy8gY3VycmVudC5sYXN0X3VwZGF0ZWRcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIudGltZVxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci50ZW1wX2Zcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIuY29uZGl0aW9uLnRleHRcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIuY2hhbmNlX29mX3JhaW5cbi8vIChmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLndpbmRfZGlyXG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLndpbmRfbXBoKVxuXG5pbXBvcnQgZm9ybWF0VGltZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdFRpbWUnO1xuaW1wb3J0IHsgdW5pdFN5c3RlbSB9IGZyb20gJy4uL3VuaXRzeXN0ZW1zJztcblxuY29uc3QgZGF0YSA9IChzdGF0ZSkgPT4gKHtcbiAgc3VtbWFyeTogW1xuICAgIHtcbiAgICAgIG5hbWU6ICd0aW1lJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS50aW1lLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdFRpbWUodGhpcy52YWx1ZSl9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAndGVtcCcsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd0ZW1wXycsICd0ZW1wJyksXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnY29uZGl0aW9uJyxcbiAgICAgIGxhYmVsOiBzdGF0ZS5jb25kaXRpb24udGV4dCxcbiAgICAgIGljb246IHN0YXRlLmNvbmRpdGlvbi5pY29uLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubGFiZWx9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAncHJlY2lwJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5jaGFuY2Vfb2ZfcmFpbixcbiAgICAgIHVuaXQ6ICclJyxcbiAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3JhaW4nKSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3dpbmQnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnd2luZF8nLCAnc3BlZWQnKSxcbiAgICAgIHVuaXQ6IHN0YXRlLmdldCgnc3BlZWQnKSxcbiAgICAgIGxhYmVsOiAnd2luZCcsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCd3aW5kJyksXG4gICAgICBkaXI6IHtcbiAgICAgICAgdmFsdWU6IHN0YXRlLndpbmRfZGlyLFxuICAgICAgfSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmRpci52YWx1ZX0gJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBkZXRhaWxzOiBbXG4gICAge1xuICAgICAga2V5OiAnZmVlbHNsaWtlJyxcbiAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdmZWVsc2xpa2VfJywgJ3RlbXAnKSxcbiAgICAgIGxhYmVsOiAnZmVlbHMgbGlrZScsXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3dpbmQnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnd2luZF8nLCAnc3BlZWQnKSxcbiAgICAgIHVuaXQ6IHN0YXRlLmdldCgnc3BlZWQnKSxcbiAgICAgIGxhYmVsOiAnd2luZCcsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCd3aW5kJyksXG4gICAgICBkaXI6IHtcbiAgICAgICAgdmFsdWU6IHN0YXRlLndpbmRfZGlyLFxuICAgICAgfSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmRpci52YWx1ZX0gJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2h1bWlkaXR5JyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5odW1pZGl0eSxcbiAgICAgIHVuaXQ6ICclJyxcbiAgICAgIGxhYmVsOiAnaHVtaWRpdHknLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignaHVtaWRpdHknKSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndXYnLFxuICAgICAgdmFsdWU6IHN0YXRlLnV2LFxuICAgICAgbGFiZWw6ICdVViBJbmRleCcsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCd1dicpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9IG9mIDExYDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdjbG91ZCcsXG4gICAgICB2YWx1ZTogc3RhdGUuY2xvdWQsXG4gICAgICB1bml0OiAnJScsXG4gICAgICBsYWJlbDogJ2Nsb3VkIGNvdmVyJyxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAncHJlY2lwJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5wcmVjaXBfaW4sXG4gICAgICB1bml0OiBzdGF0ZS5nZXQoJ3ByZWNpcCcpLFxuICAgICAgbGFiZWw6ICdwcmVjaXAgYW1vdW50JyxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG59KTtcblxuY29uc3QgZGF0ZSA9IChzdGF0ZSkgPT4gKHtcbiAgZGF0ZTogc3RhdGUuZGF0ZSxcbn0pO1xuXG5jb25zdCBsb2NhdGlvbiA9IChzdGF0ZSkgPT4gKHtcbiAgbG9jYXRpb246IHtcbiAgICBjb3VudHJ5OiBzdGF0ZS5jb3VudHJ5LFxuICAgIGxvY2FsdGltZTogc3RhdGUubG9jYWx0aW1lLFxuICAgIG5hbWU6IHN0YXRlLm5hbWUsXG4gICAgcmVnaW9uOiBzdGF0ZS5yZWdpb24sXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LCAke1xuICAgICAgICB0aGlzLnJlZ2lvbi5sZW5ndGggPT09IDAgfHwgdGhpcy5yZWdpb24gPT09IHRoaXMubmFtZSA/IHRoaXMuY291bnRyeSA6IHRoaXMucmVnaW9uXG4gICAgICB9YDtcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IGhvdXJseUNvbnRyb2xsZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgdGhpcy5zZXRBcnJheSA9IHRoaXMuc2V0QXJyYXkuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNldEhvdXJzID0gdGhpcy5zZXRIb3Vycy5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IGZvcmVjYXN0ZGF5ID0gd2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXkubWFwKHRoaXMuc2V0QXJyYXkpO1xuXG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAuLi53ZWF0aGVyRGF0YSxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmxvY2F0aW9uLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubG9jYXRpb24oc3RhdGUpLFxuICAgICAgZm9yZWNhc3RkYXksXG4gICAgICBsYXN0X3VwZGF0ZWQ6IGZvcm1hdFRpbWUoc3RhdGUuY3VycmVudC5sYXN0X3VwZGF0ZWQpLnRvTG93ZXJDYXNlKCksXG4gICAgfTtcbiAgfSxcbiAgc2V0QXJyYXkob2JqKSB7XG4gICAgY29uc3QgaG91cnMgPSBvYmouaG91ci5yZWR1Y2UodGhpcy5zZXRIb3VycywgW10pO1xuICAgIGNvbnN0IHN0YXRlID0geyAuLi5vYmogfTtcblxuICAgIHJldHVybiB7IC4uLmRhdGUoc3RhdGUpLCBob3VycyB9O1xuICB9LFxuICBzZXRIb3VycyhmaWx0ZXJlZCwgaG91cikge1xuICAgIGNvbnN0IGRhdGUxID0gbmV3IERhdGUodGhpcy53ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCk7XG4gICAgY29uc3QgZGF0ZTIgPSBuZXcgRGF0ZShob3VyLnRpbWUpO1xuXG4gICAgY29uc29sZS5sb2coZGF0ZTEuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgPD0gZGF0ZTIuZ2V0VVRDTWlsbGlzZWNvbmRzKCkpO1xuICAgIGlmIChkYXRlMS5nZXRUaW1lKCkgPD0gZGF0ZTIuZ2V0VGltZSgpKSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4udW5pdFN5c3RlbSxcbiAgICAgICAgLi4uaG91cixcbiAgICAgIH07XG4gICAgICBmaWx0ZXJlZC5wdXNoKHsgLi4uZGF0YShzdGF0ZSkgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICB0aGlzLnNldFByb3BlcnRpZXMoaG91cmx5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICAgIC8vIHRoaXMuc2V0UHJvcGVydGllcyhob3VybHlDb250cm9sbGVyLmluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0pKTtcbiAgfSxcbiAgc2V0UHJvcGVydGllcyhvYmopIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gIH0sXG59O1xuLy8gRGF0ZVxuLy8gdGltZSB8IHRlbXAgfCBjb25kaXRpb24gfCBwcmVjaXB0YXRpb24gJSB8IHdpbmRcbi8vIGV4YW1wbGVcbi8vIDE6MzAgcG0gfCA0N8KwIHwgU3VubnkgfCAxJSB8IE4gNiBtcGhcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaG91cmx5IGZyb20gJy4vaG91cmx5LmNvbmZpZyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy90YWJzL2hvdXJseS5jc3MnO1xuaW1wb3J0IGZvcm1hdERhdGUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXREYXRlJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5cbmNvbnN0IGhvdXJseUJ1aWxkZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHt9LFxuICBjYWNoZURPTSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGVET00oKSBydW5uaW5nIGZyb20gaG91cmx5LmpzJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gaG91cmx5LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIGhvdXJseS5qcycpO1xuICAgIGNvbnNvbGUubG9nKGhvdXJseSk7XG4gICAgY29uc3QgaG91cmx5U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgaG91cmx5U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNvbnN0IGhvdXJseUxvY2F0aW9uID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGhvdXJseVRpbWVTdGFtcCA9IGNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgIGhvdXJseVNlY3Rpb24uaWQgPSAnaG91cmx5JztcbiAgICBob3VybHlTZWN0aW9uSGVhZGluZy50ZXh0Q29udGVudCA9ICdIb3VybHkgd2VhdGhlcic7XG4gICAgaG91cmx5TG9jYXRpb24udGV4dENvbnRlbnQgPSBgIC0gJHtob3VybHkubG9jYXRpb24uc2V0VGV4dCgpfWA7XG4gICAgaG91cmx5VGltZVN0YW1wLnRleHRDb250ZW50ID0gYEFzIG9mICR7aG91cmx5Lmxhc3RfdXBkYXRlZH1gO1xuXG4gICAgaG91cmx5U2VjdGlvbkhlYWRpbmcuYXBwZW5kQ2hpbGQoaG91cmx5TG9jYXRpb24pO1xuICAgIGhvdXJseVNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoaG91cmx5U2VjdGlvbkhlYWRpbmcpO1xuICAgIGhvdXJseVNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoaG91cmx5VGltZVN0YW1wKTtcbiAgICBob3VybHlTZWN0aW9uLmFwcGVuZENoaWxkKGhvdXJseVNlY3Rpb25IZWFkZXIpO1xuXG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgY29uc3QgaG91cmx5RGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob3VybHlEZXRhaWxzLmlkID0gJ2hvdXJseV9kZXRhaWxzJztcblxuICAgIGhvdXJseS5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICAgIGNvbnN0IGhvdXJseURheSA9IGNyZWF0ZUVsZW1lbnQoJ29sJyk7XG4gICAgICBjb25zdCBob3VybHlEYXlIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgIGhvdXJseURheS5jbGFzc05hbWUgPSAnZGF5JztcbiAgICAgIGhvdXJseURheUhlYWRpbmcudGV4dENvbnRlbnQgPSBmb3JtYXREYXRlKGRheS5kYXRlKTtcbiAgICAgIGhvdXJseURheS5hcHBlbmRDaGlsZChob3VybHlEYXlIZWFkaW5nKTtcbiAgICAgIGRheS5ob3Vycy5mb3JFYWNoKChob3VyKSA9PiB7XG4gICAgICAgIGNvbnN0IGhvdXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91ckNvbnRhaW5lci5jbGFzc05hbWUgPSAnaG91cic7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoaG91ci5zdW1tYXJ5KS5mb3JFYWNoKChkZXRhaWwpID0+IHtcbiAgICAgICAgICBob3VyQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5zZXRUZXh0KCkpLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhvdXJseURheS5hcHBlbmRDaGlsZChob3VyQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgICAgaG91cmx5RGV0YWlscy5hcHBlbmRDaGlsZChob3VybHlEYXkpO1xuICAgIH0pO1xuXG4gICAgaG91cmx5U2VjdGlvbi5hcHBlbmRDaGlsZChob3VybHlEZXRhaWxzKTtcbiAgICAvLyB0ZW1wb3JhcnlcbiAgICByZXR1cm4gaG91cmx5U2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG91cmx5KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgaG91cmx5LmluaXQod2VhdGhlckRhdGEsIHRpbWVTdGFtcCk7XG4gIHJldHVybiBob3VybHlCdWlsZGVyLnJlbmRlcigpO1xufVxuXG4vLyBEYXRlXG4vLyB0aW1lIHwgdGVtcCB8IGNvbmRpdGlvbiB8IHByZWNpcHRhdGlvbiAlIHwgd2luZFxuLy8gZXhhbXBsZVxuLy8gMTozMCBwbSB8IDQ3wrAgfCBTdW5ueSB8IDElIHwgTiA2IG1waFxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBidWlsZFRhYnNOYXZiYXIgZnJvbSAnLi90YWJzX25hdmJhci90YWJzX25hdmJhcic7XG5pbXBvcnQgYnVpbGRUb2RheSBmcm9tICcuL3RvZGF5L3RvZGF5JztcbmltcG9ydCBidWlsZEhvdXJseSBmcm9tICcuL2hvdXJseS9ob3VybHknO1xuaW1wb3J0IGJ1aWxkRm9yZWNhc3QgZnJvbSAnLi9mb3JlY2FzdC9mb3JlY2FzdCc7XG5pbXBvcnQgcHViU3ViIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHViU3ViJztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL3RhYnMvdGFicy5jc3MnO1xuXG5jb25zdCBidWlsZCA9IHtcbiAgdGFic05hdmJhcjogYnVpbGRUYWJzTmF2YmFyLFxuICB0b2RheTogYnVpbGRUb2RheSxcbiAgaG91cmx5OiBidWlsZEhvdXJseSxcbiAgZm9yZWNhc3Q6IGJ1aWxkRm9yZWNhc3QsXG59O1xuXG5jb25zdCB0YWJzQnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMudGltZVN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgdGhpcy5zZXRXZWF0aGVyKHdlYXRoZXJEYXRhKTtcbiAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgcHViU3ViLnN1YnNjcmliZSgncmVuZGVyJywgdGhpcy5yZW5kZXIpO1xuICB9LFxuICBzZXRXZWF0aGVyKHdlYXRoZXJEYXRhKSB7XG4gICAgdGhpcy53ZWF0aGVyRGF0YSA9IHdlYXRoZXJEYXRhO1xuICAgIHRoaXMubG9jYXRpb24gPSB3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMuYXBpTGFzdFVwZGF0ZWQgPSB3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZF9lcG9jaDtcbiAgfSxcbiAgY2FjaGVET00odGFic1NlY3Rpb24pIHtcbiAgICB0aGlzLnRhYnNTZWN0aW9uID0gdGFic1NlY3Rpb247XG4gICAgdGhpcy50YWJzTGlzdCA9IHRhYnNTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX2xpc3RfaXRlbSA+IGEnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgdGhpcy50YWJzTGlzdC5mb3JFYWNoKCh0YWIpID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3dpdGNoVGFiKSk7XG4gIH0sXG4gIHJlbmRlcihrZXkpIHtcbiAgICBsZXQgY29udGVudDtcbiAgICBpZiAoIWtleSkge1xuICAgICAgLy8gaWYgbm8ga2V5XG4gICAgICBjb250ZW50ID0gYnVpbGQudG9kYXkodGhpcy53ZWF0aGVyRGF0YSwgdGhpcy50aW1lU3RhbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gYnVpbGRba2V5XSh0aGlzLndlYXRoZXJEYXRhLCB0aGlzLnRpbWVTdGFtcCk7XG4gICAgICAvLyB0aGlzLnRhYnNTZWN0aW9uLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5zZXRBY3RpdmVUYWIoY29udGVudC5pZCk7XG4gICAgdGhpcy50YWJzU2VjdGlvbi5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgfSxcbiAgc3dpdGNoVGFiKGUsIHRhYktleSkge1xuICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldCk7XG4gICAgY29uc29sZS5sb2codGFiS2V5KTtcbiAgICBjb25zdCB7IGNsYXNzTmFtZTogZWxlbWVudENsYXNzTmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHJlbmRlcktleSA9IGVsZW1lbnRDbGFzc05hbWU7XG5cbiAgICBwdWJTdWIucHVibGlzaCgnZ2V0V2VhdGhlcicsIHRoaXMubG9jYXRpb24sIHJlbmRlcktleSk7XG4gIH0sXG4gIHNldEFjdGl2ZVRhYihpZCkge1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRhYnNMaXN0KTtcbiAgICBjb25zb2xlLmxvZyhbLi4udGhpcy50YWJzTGlzdF0uZmluZCgoYW5jaG9yKSA9PiBhbmNob3IuY2xhc3NMaXN0LmNvbnRhaW5zKGlkKSkpO1xuICAgIC8vIGlmICh0aGlzLmFjdGl2ZVRhYikgdGhpcy5hY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSBbLi4udGhpcy50YWJzTGlzdF0uZmluZCgoYW5jaG9yKSA9PiBhbmNob3IuY2xhc3NMaXN0LmNvbnRhaW5zKGlkKSk7XG4gICAgLy8gdGhpcy5hY3RpdmVUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgdGhpcy5hY3RpdmVUYWIuc2V0QXR0cmlidXRlcyh7ICdkYXRhLWFjdGl2ZSc6IHRydWUgfSk7XG4gICAgdGhpcy5hY3RpdmVLZXkgPSBpZDtcbiAgICBjb25zb2xlLmxvZyhgYWN0aXZlS2V5OiAke3RoaXMuYWN0aXZlS2V5fWApO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzZXRBY3RpdmVUYWInLCBpZCk7XG4gICAgLy8gc2VuZHMgaWQgdG8gc2V0QWN0aXZlVGFiIGluIGhlYWRlci5qcyBtb2R1bGVcbiAgfSxcbiAgLy8gdXBkYXRlRGF0YSh3ZWF0aGVyRGF0YSwga2V5KSB7XG4gIC8vICAgdGhpcy53ZWF0aGVyRGF0YSA9IHdlYXRoZXJEYXRhO1xuICAvLyAgIHRoaXMucmVuZGVyKGtleSk7XG4gIC8vIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRhYnMod2VhdGhlckRhdGEsIHJlbmRlcktleSkge1xuICBjb25zb2xlLmxvZyhyZW5kZXJLZXkpO1xuICB0YWJzQnVpbGRlci5pbml0KHdlYXRoZXJEYXRhKTtcbiAgY29uc3QgdGFic1NlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIC8vIGNvbnN0IHRhYnNIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgdGFic1NlY3Rpb24uaWQgPSAndGFicyc7XG4gIC8vIHRhYnNIZWFkaW5nLnNldEF0dHJpYnV0ZXMoeyB0ZXh0Q29udGVudDogJ1RBQlMnIH0pO1xuXG4gIC8vIHRhYnNTZWN0aW9uLmFwcGVuZENoaWxkKHRhYnNIZWFkaW5nKTtcbiAgdGFic1NlY3Rpb24uYXBwZW5kQ2hpbGQoYnVpbGQudGFic05hdmJhcigpKTtcbiAgdGFic0J1aWxkZXIuY2FjaGVET00odGFic1NlY3Rpb24pO1xuICBpZiAocmVuZGVyS2V5KSB7XG4gICAgdGFic0J1aWxkZXIucmVuZGVyKHJlbmRlcktleSk7XG4gIH0gZWxzZSB7XG4gICAgdGFic0J1aWxkZXIucmVuZGVyKCk7XG4gIH1cbiAgdGFic0J1aWxkZXIuYmluZEV2ZW50cygpO1xuICByZXR1cm4gdGFic1NlY3Rpb247XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ3RvZGF5JyxcbiAgICAgIHRleHRDb250ZW50OiAnVG9kYXknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ2hvdXJseScsXG4gICAgICB0ZXh0Q29udGVudDogJ0hvdXJseScsXG4gICAgICBocmVmOiAnIycsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiAnZm9yZWNhc3QnLFxuICAgICAgdGV4dENvbnRlbnQ6ICczLURheScsXG4gICAgICBocmVmOiAnIycsXG4gICAgfSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHRhYnMgZnJvbSAnLi90YWJzX25hdmJhci5jb25maWcnO1xuXG5jb25zdCB0YWJzTmF2YmFyQnVpbGRlciA9IHtcbiAgaW5pdCgpIHt9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0YWJzTmF2YmFyID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IHRhYnNMaXN0ID0gY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0YWJzTmF2YmFyLmlkID0gJ3RhYnNfbmF2YmFyJztcbiAgICBPYmplY3QudmFsdWVzKHRhYnMpLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgY29uc3QgdGFic0xpc3RJdGVtID0gY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGNvbnN0IHRhYnNOYXZBbmNob3IgPSBjcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB0YWJzTGlzdEl0ZW0uc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAndGFic19saXN0X2l0ZW0nIH0pO1xuICAgICAgdGFic05hdkFuY2hvci5zZXRBdHRyaWJ1dGVzKHRhYi5hdHRyaWJ1dGVzKTtcblxuICAgICAgdGFic0xpc3RJdGVtLmFwcGVuZENoaWxkKHRhYnNOYXZBbmNob3IpO1xuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFic0xpc3RJdGVtKTtcbiAgICB9KTtcblxuICAgIHRhYnNOYXZiYXIuYXBwZW5kQ2hpbGQodGFic0xpc3QpO1xuICAgIHJldHVybiB0YWJzTmF2YmFyO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRUYWJzTmF2YmFyKCkge1xuICByZXR1cm4gdGFic05hdmJhckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCIvLyBjdXJyZW50LnRlbXBfZlxuLy8gY3VycmVudC5mZWVsc2xpa2VfZlxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZlxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZlxuLy8gY3VycmVudC5odW1pZGl0eVxuLy8gY3VycmVudC5wcmVzc3VyZV9pblxuLy8gY3VycmVudC52aXNfbWlsZXNcbi8vIGN1cnJlbnQud2luZF9tcGhcbi8vIGN1cnJlbnQud2luZF9kaXJcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgeyB1bml0U3lzdGVtIH0gZnJvbSAnLi4vdW5pdHN5c3RlbXMnO1xuXG5jb25zdCBkYXRhID0gKHN0YXRlKSA9PiAoe1xuICBzdW1tYXJ5OiBbXG4gICAge1xuICAgICAga2V5OiAndGVtcCcsXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndGVtcF8nLCAndGVtcCcpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdjb25kaXRpb24nLFxuICAgICAgbGFiZWw6IHN0YXRlLmNvbmRpdGlvbi50ZXh0LFxuICAgICAgaWNvbjogc3RhdGUuY29uZGl0aW9uLmljb24sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH1gO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBkZXRhaWxzOiB7XG4gICAgaGVhZGVyOiBbXG4gICAgICB7XG4gICAgICAgIGtleTogJ2ZlZWxzbGlrZScsXG4gICAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ2ZlZWxzbGlrZV8nLCAndGVtcCcpLFxuICAgICAgICBsYWJlbDogJ2ZlZWxzIGxpa2UnLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdzdW5yaXNlJyxcbiAgICAgICAgdmFsdWU6IGZvcm1hdFRpbWUoc3RhdGUuc3VucmlzZSkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgbGFiZWw6ICdzdW5yaXNlJyxcbiAgICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignc3VucmlzZScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdzdW5zZXQnLFxuICAgICAgICB2YWx1ZTogZm9ybWF0VGltZShzdGF0ZS5zdW5zZXQpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGxhYmVsOiAnc3Vuc2V0JyxcbiAgICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignc3Vuc2V0JyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBib2R5OiBbXG4gICAgICB7XG4gICAgICAgIGtleTogJ21pbm1heHRlbXAnLFxuICAgICAgICBtaW46IHtcbiAgICAgICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUuZGF5LCAnbWludGVtcF8nLCAndGVtcCcpLFxuICAgICAgICAgIGxhYmVsOiAnbG93JyxcbiAgICAgICAgfSxcbiAgICAgICAgbWF4OiB7XG4gICAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLmRheSwgJ21heHRlbXBfJywgJ3RlbXAnKSxcbiAgICAgICAgICBsYWJlbDogJ2hpZ2gnLFxuICAgICAgICB9LFxuICAgICAgICB1bml0OiAnwrAnLFxuICAgICAgICBsYWJlbDogYGhpZ2ggLyBsb3dgLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdtaW5tYXh0ZW1wJyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMubWF4LnZhbHVlfSR7dGhpcy51bml0fSAvICR7dGhpcy5taW4udmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2h1bWlkaXR5JyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLmh1bWlkaXR5LFxuICAgICAgICB1bml0OiAnJScsXG4gICAgICAgIGxhYmVsOiAnaHVtaWRpdHknLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdodW1pZGl0eScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdwcmVzc3VyZScsXG4gICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3ByZXNzdXJlXycsICdwcmVzc3VyZScpLFxuICAgICAgICB1bml0OiBzdGF0ZS5nZXQoJ3ByZXNzdXJlJyksXG4gICAgICAgIGxhYmVsOiAncHJlc3N1cmUnLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdwcmVzc3VyZScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndmlzJyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndmlzXycsICdkaXN0YW5jZScpLFxuICAgICAgICB1bml0OiBzdGF0ZS5nZXQoJ2Rpc3RhbmNlJyksXG4gICAgICAgIGxhYmVsOiAndmlzaWJpbGl0eScsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3Zpc2liaWxpdHknKSxcbiAgICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3dpbmQnLFxuICAgICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd3aW5kXycsICdzcGVlZCcpLFxuICAgICAgICB1bml0OiBzdGF0ZS5nZXQoJ3NwZWVkJyksXG4gICAgICAgIGxhYmVsOiAnd2luZCcsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3dpbmQnKSxcbiAgICAgICAgZGlyOiB7XG4gICAgICAgICAgdmFsdWU6IHN0YXRlLndpbmRfZGlyLFxuICAgICAgICB9LFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLmRpci52YWx1ZX0gJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndXYnLFxuICAgICAgICB2YWx1ZTogc3RhdGUudXYsXG4gICAgICAgIGxhYmVsOiAnVVYgSW5kZXgnLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCd1dicpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSBvZiAxMWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59KTtcblxuY29uc3QgbG9jYXRpb24gPSAoc3RhdGUpID0+ICh7XG4gIGNvdW50cnk6IHN0YXRlLmNvdW50cnksXG4gIGxvY2FsdGltZTogc3RhdGUubG9jYWx0aW1lLFxuICBuYW1lOiBzdGF0ZS5uYW1lLFxuICByZWdpb246IHN0YXRlLnJlZ2lvbixcbiAgc2V0VGV4dCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSwgJHtcbiAgICAgIHRoaXMucmVnaW9uLmxlbmd0aCA9PT0gMCB8fCB0aGlzLnJlZ2lvbiA9PT0gdGhpcy5uYW1lID8gdGhpcy5jb3VudHJ5IDogdGhpcy5yZWdpb25cbiAgICB9YDtcbiAgfSxcbn0pO1xuXG5jb25zdCB0b2RheUNvbnRyb2xsZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAvLyBpY29uczogdW5pdFN5c3RlbS5pY29ucyxcbiAgICAgIC8vIGdldDogdW5pdFN5c3RlbS5nZXQsXG4gICAgICAvLyBzZXRJY29uOiB1bml0U3lzdGVtLnNldEljb24sXG4gICAgICAvLyBzZXRWYWx1ZTogdW5pdFN5c3RlbS5zZXRWYWx1ZSxcbiAgICAgIC8vIHJvdW5kVmFsdWU6IHVuaXRTeXN0ZW0ucm91bmRWYWx1ZSxcbiAgICAgIC4uLnVuaXRTeXN0ZW0sXG4gICAgICAuLi53ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXSxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLFxuICAgICAgLi4ud2VhdGhlckRhdGEuY3VycmVudCxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmxvY2F0aW9uLFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRhdGEoc3RhdGUpLFxuICAgICAgbG9jYXRpb246IGxvY2F0aW9uKHN0YXRlKSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZSh3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICAvLyBjb25zb2xlLmxvZyh0b2RheUNvbnRyb2xsZXIuaW5pdCh3ZWF0aGVyRGF0YSwgdW5pdFN5c3RlbSkpO1xuICAgIGNvbnNvbGUubG9nKHRpbWVTdGFtcCk7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHRvZGF5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhKSk7XG4gIH0sXG4gIHNldFByb3BlcnRpZXMob2JqKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmopO1xuICB9LFxufTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5pbXBvcnQgdG9kYXkgZnJvbSAnLi90b2RheS5jb25maWcnO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvdGFicy90b2RheS5jc3MnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcblxuY29uc3QgdG9kYXlCdWlsZGVyID0ge1xuICBpbml0KCkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSB0b2RheS5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIHRvZGF5LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0b2RheSk7XG4gICAgY29uc3QgdG9kYXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuXG4gICAgdG9kYXlTZWN0aW9uLmlkID0gJ3RvZGF5JztcblxuICAgIC8vIHRlbXBvcmFyeVxuICAgIGNvbnN0IHRvZGF5U3VtbWFyeSA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCB0b2RheUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IHRvZGF5U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGNvbnN0IHRvZGF5VGltZVN0YW1wID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgdG9kYXlTdW1tYXJ5LmlkID0gJ3RvZGF5X3N1bW1hcnknO1xuICAgIC8vIHRvZGF5U2VjdGlvbkhlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiAnVE9EQVknIH0pO1xuICAgIHRvZGF5U2VjdGlvbkhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHt0b2RheS5sb2NhdGlvbi5zZXRUZXh0KCl9IGA7XG4gICAgdG9kYXlUaW1lU3RhbXAudGV4dENvbnRlbnQgPSBgQXMgb2YgJHt0b2RheS5sYXN0X3VwZGF0ZWR9YDtcblxuICAgIHRvZGF5U2VjdGlvbkhlYWRpbmcuYXBwZW5kQ2hpbGQodG9kYXlUaW1lU3RhbXApO1xuICAgIHRvZGF5SGVhZGVyLmFwcGVuZENoaWxkKHRvZGF5U2VjdGlvbkhlYWRpbmcpO1xuICAgIHRvZGF5U3VtbWFyeS5hcHBlbmRDaGlsZCh0b2RheUhlYWRlcik7XG5cbiAgICB0b2RheS5zdW1tYXJ5LmZvckVhY2goKGRldGFpbCkgPT4ge1xuICAgICAgdG9kYXlTdW1tYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVDb250ZW50Um93cyhjcmVhdGVFbGVtZW50LCBudWxsLCBkZXRhaWwuaWNvbiwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9kYXlEZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHRvZGF5RGV0YWlscy5pZCA9ICd0b2RheV9kZXRhaWxzJztcblxuICAgIGNvbnN0IHRvZGF5RGV0YWlsc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRvZGF5RGV0YWlsc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZGF5RGV0YWlsc0hlYWRlci5jbGFzc0xpc3QuYWRkKCd0b2RheV9kZXRhaWxzX2hlYWRlcicpO1xuICAgIHRvZGF5RGV0YWlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RheV9kZXRhaWxzX2NvbnRhaW5lcicpO1xuXG4gICAgdG9kYXlEZXRhaWxzSGVhZGVyLmFwcGVuZENoaWxkKFxuICAgICAgY3JlYXRlQ29udGVudFJvd3MoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHRvZGF5LmRldGFpbHMuaGVhZGVyWzBdLmljb24sXG4gICAgICAgIHRvZGF5LmRldGFpbHMuaGVhZGVyWzBdLmxhYmVsLFxuICAgICAgICB0b2RheS5kZXRhaWxzLmhlYWRlclswXS5zZXRUZXh0KCksXG4gICAgICApLFxuICAgICk7XG5cbiAgICBjb25zdCB0b2RheURldGFpbHNTdW4gPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RheURldGFpbHNTdW4uY2xhc3NMaXN0LmFkZCgndG9kYXlfZGV0YWlsc19zdW4nKTtcbiAgICB0b2RheS5kZXRhaWxzLmhlYWRlci5mb3JFYWNoKChkZXRhaWwsIGkpID0+IHtcbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICB0b2RheURldGFpbHNTdW4uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5sYWJlbCwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0b2RheS5kZXRhaWxzLmJvZHkuZm9yRWFjaCgoZGV0YWlsKSA9PiB7XG4gICAgICB0b2RheURldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUNvbnRlbnRSb3dzKGNyZWF0ZUVsZW1lbnQsIG51bGwsIGRldGFpbC5pY29uLCBkZXRhaWwubGFiZWwsIGRldGFpbC5zZXRUZXh0KCkpLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRvZGF5RGV0YWlsc0hlYWRlci5hcHBlbmRDaGlsZCh0b2RheURldGFpbHNTdW4pO1xuICAgIHRvZGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh0b2RheVN1bW1hcnkpO1xuICAgIHRvZGF5RGV0YWlscy5hcHBlbmRDaGlsZCh0b2RheURldGFpbHNIZWFkZXIpO1xuICAgIHRvZGF5RGV0YWlscy5hcHBlbmRDaGlsZCh0b2RheURldGFpbHNDb250YWluZXIpO1xuICAgIHRvZGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh0b2RheURldGFpbHMpO1xuICAgIC8vIHRlbXBvcmFyeVxuXG4gICAgcmV0dXJuIHRvZGF5U2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVG9kYXkod2VhdGhlckRhdGEsIHRpbWVTdGFtcCkge1xuICAvLyBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICB0b2RheS5pbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApO1xuICByZXR1cm4gdG9kYXlCdWlsZGVyLnJlbmRlcigpO1xufVxuXG4vLyBIaWdoIC8gTG93XG4vLyBleCwgODfCsCAvIDQwwrBcblxuLy8gV2luZFxuLy8gZXgsIE5OVyAxNCBtcGhcbiIsImltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vLi4vaGVscGVycy9pbXBvcnRBbGwnO1xuXG5leHBvcnQgY29uc3QgdW5pdFN5c3RlbSA9IHtcbiAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uLy4uL2Fzc2V0cy9pY29ucycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLnVuaXRTeXN0ZW1ba2V5XTtcbiAgfSxcbiAgc2V0SWNvbihrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5pY29ucy5maWxlc1tPYmplY3Qua2V5cyh0aGlzLmljb25zLmZpbGVzKS5maW5kKChpY29uS2V5KSA9PiBpY29uS2V5LmluY2x1ZGVzKGtleSkpXTtcbiAgfSxcbiAgcm91bmRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgfSxcbiAgc2V0VmFsdWUob2JqLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShvYmpbYCR7YXJnc1swXX0ke3RoaXMuZ2V0KGFyZ3NbMV0pfWBdKTtcbiAgfSxcbn07XG5cbmNvbnN0IHVuaXRTeXN0ZW1zID0ge1xuICBtZXRyaWM6IHtcbiAgICB0ZW1wOiAnYycsXG4gICAgc3BlZWQ6ICdrcGgnLFxuICAgIHByZWNpcGl0YXRpb246ICdtbScsXG4gICAgcHJlc3N1cmU6ICdtYicsXG4gICAgZGlzdGFuY2U6ICdrbScsXG4gIH0sXG4gIGltcGVyaWFsOiB7XG4gICAgdGVtcDogJ2YnLFxuICAgIHNwZWVkOiAnbXBoJyxcbiAgICBwcmVjaXBpdGF0aW9uOiAnaW4nLFxuICAgIHByZXNzdXJlOiAnaW4nLFxuICAgIGRpc3RhbmNlOiAnbWlsZXMnLFxuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVuaXRTeXN0ZW0oc2VsZWN0aW9uKSB7XG4gIE9iamVjdC5hc3NpZ24odW5pdFN5c3RlbSwgeyB1bml0U3lzdGVtOiB1bml0U3lzdGVtc1tzZWxlY3Rpb25dIH0pO1xufVxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XG4vLyB1c2UgV2VhdGhlckFQSVxuLy8gaHR0cHM6Ly93d3cud2VhdGhlcmFwaS5jb20vZG9jcy9cbi8vIGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT04NGFjNzMxMGU1NjQ0OGExODk2MjEyNzMxMjMwNjExJnE9TG9uZG9uXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIodmFsdWUsIHRhYktleSkge1xuICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gIGNvbnNvbGUubG9nKHRhYktleSk7XG4gIC8vICpub3RlLCB2YWx1ZSBkb2VzIE5PVCBuZWVkIHRvIGJlIGV2YWx1YXRlZCBiZWZvcmUgZmV0Y2hcbiAgLy8gcG9zdGFsIGNvZGUsIG51bWJlciBvciBzdHJpbmdcbiAgLy8gY2l0eSwgdXBwZXJjYXNlIG9yIGxvd2VyY2FzZTtcbiAgcHViU3ViLnB1Ymxpc2goJ3N3aXRjaENvbnRlbnQnLCAnbG9hZGluZycpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9ODRhYzczMTBlNTY0NDhhMTg5NjIxMjczMTIzMDYxMSZxPSR7dmFsdWV9JmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vYCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKFxuICAgICAgJ3N3aXRjaENvbnRlbnQnLFxuICAgICAgIXJlc3BvbnNlLm9rID8gT2JqZWN0LmFzc2lnbihyZXNwb25zZSwgd2VhdGhlckRhdGEpIDogd2VhdGhlckRhdGEsXG4gICAgICB0YWJLZXksXG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZSAke3Jlc3BvbnNlLnN0YXR1c30sICR7d2VhdGhlckRhdGEuZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG5cbiAgICAvLyBjb2RlIGJlbG93IHRoZSBpZiBibG9jayB3aWxsIG9ubHkgcnVuIGlmIHRoZXJlIGFyZSBubyBlcnJvcnNcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH1cbn1cblxucHViU3ViLnN1YnNjcmliZSgnZ2V0V2VhdGhlcicsIGdldFdlYXRoZXIpO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBzdWJzY3JpYmVyczoge30sXG4gIHN1YnNjcmliZShzdWJzY3JpYmVyLCBmbikge1xuICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gPSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdIHx8IFtdO1xuICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0ucHVzaChmbik7XG4gIH0sXG4gIHVuc3Vic2NyaWJlKHN1YnNjcmliZXIsIGZuKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gPSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmZpbHRlcihcbiAgICAgICAgKGhhbmRsZXIpID0+IGhhbmRsZXIgIT09IGZuLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIHB1Ymxpc2goc3Vic2NyaWJlciwgLi4uZGF0YSkge1xuICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgIGZuKC4uLmRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRlbnRSb3dzKGZuLCBhdHRyaWJ1dGVzLCAuLi5hcmdzKSB7XG4gIGNvbnN0IGNvbnRhaW5lckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzID8gYXR0cmlidXRlc1sxXSA6IGZhbHNlO1xuICBjb25zdCBpdGVtQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgPyBhdHRyaWJ1dGVzWzJdIDogZmFsc2U7XG5cbiAgY29uc3QgY29udGFpbmVyID0gZm4oJ3VsJyk7XG4gIGlmIChjb250YWluZXJBdHRyaWJ1dGVzKSB7XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZXMoY29udGFpbmVyQXR0cmlidXRlcyk7XG4gIH1cbiAgYXJncy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgLy8gL1xcLihzdmd8cG5nKSQvXG4gICAgLy8gY29uc29sZS5sb2coaXRlbS5zcGxpdCgvXFwuKHN2Z3xwbmcpJC8pKTtcblxuICAgIGlmIChpdGVtKSB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGZuKCdsaScpO1xuICAgICAgaWYgKGl0ZW1BdHRyaWJ1dGVzKSBpdGVtLnNldEF0dHJpYnV0ZXMoaXRlbUF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKC9cXC5bc3ZnfHBuZ117M30kLy50ZXN0KGl0ZW0pKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IGZuKCdpbWcnKTtcbiAgICAgICAgaWYgKC9cXC5bc3ZnXXszfSQvLnRlc3QoaXRlbSkpIGltZy5zZXRBdHRyaWJ1dGVzKHsgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyB9KTtcbiAgICAgICAgaW1nLnNyYyA9IGl0ZW07XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IGl0ZW07XG4gICAgICB9XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCJjb25zdCBzZXRFbGVtZW50U3RhdGUgPSAoKSA9PiAoe1xuICBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGlmIChrZXkgIT09ICd0ZXh0Q29udGVudCcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFRleHRDb250ZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgc2V0VGV4dENvbnRlbnQodGV4dCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxufSk7XG5cbmNvbnN0IGJ1aWxkRWxlbWVudCA9ICh0YWdOYW1lKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIHRhZ05hbWUsXG4gIH07XG5cbiAgcmV0dXJuIHsgLi4uc2V0RWxlbWVudFN0YXRlKHN0YXRlKSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gIGNvbnN0IGh0bWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgT2JqZWN0LmFzc2lnbihodG1sRWxlbWVudCwgYnVpbGRFbGVtZW50KGh0bWxFbGVtZW50KSk7XG5cbiAgcmV0dXJuIGh0bWxFbGVtZW50O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBib29sZWFuKSB7XG4gIC8vIHRoaXMgcmV0dXJucyBhIGZvcm1hdCBbRGF5LCBNb250aCBEYXRlXVxuICAvLyBleDogV2VkbmVzZGF5LCBBcHJpbCAxNFxuICBjb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICBjb25zdCBtb250aHMgPSBbXG4gICAgJ0phbnVhcnknLFxuICAgICdGZWJydWFyeScsXG4gICAgJ01hcmNoJyxcbiAgICAnQXByaWwnLFxuICAgICdNYXknLFxuICAgICdKdW5lJyxcbiAgICAnSnVseScsXG4gICAgJ0F1Z3VzdCcsXG4gICAgJ1NlcHRlbWJlcicsXG4gICAgJ09jdG9iZXInLFxuICAgICdOb3ZlbWJlcicsXG4gICAgJ0RlY2VtYmVyJyxcbiAgXTtcblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoYCR7ZGF0ZVN0cmluZ30gMDA6MDA6MDBgKTtcblxuICByZXR1cm4gYm9vbGVhblxuICAgID8gYCR7ZGF0ZS50b1VUQ1N0cmluZygpLnN1YnN0cmluZygwLCAzKX0gJHtkYXRlLnRvVVRDU3RyaW5nKCkuc3Vic3RyaW5nKDUsIDcpfWBcbiAgICA6IGAke2RheXNbZGF0ZS5nZXRVVENEYXkoKV19LCAke21vbnRoc1tkYXRlLmdldFVUQ01vbnRoKCldfSAke2RhdGUuZ2V0VVRDRGF0ZSgpfWA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXRUaW1lKHRpbWUpIHtcbiAgLy8gcmV0dXJucyAxMiBob3VyIHRpbWUgZm9ybWF0XG4gIC8vIGV4OiAyOjAwIFBNIG9yIDEwOjAwIEFNXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lLmluY2x1ZGVzKCctJykgPyB0aW1lIDogYDIwMDAtMTItMDEgJHt0aW1lfWApO1xuICBjb25zdCB0aW1lUHJvcGVydGllcyA9IHtcbiAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgaG91cjEyOiB0cnVlLFxuICB9O1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XG4gIGNvbnN0IGZpbGVzID0ge307XG4gIGNvbnN0IGZpbGVzQXJyID0gW107XG4gIHIua2V5cygpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBmaWxlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgZmlsZXMsIGZpbGVzQXJyIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=