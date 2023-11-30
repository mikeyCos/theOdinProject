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
}`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;EACE,uDAAuD;EACvD,+BAA+B;EAC/B,4CAA2E;EAC3E,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;EACtB,sCAAsC;EACtC,+BAA+B;EAC/B,kBAAkB;AACpB","sourcesContent":["@font-face {\n  /* https://fonts.google.com/specimen/Roboto+Condensed */\n  font-family: 'Roboto Condensed';\n  src: url(./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf);\n  font-weight: 600;\n  font-style: normal;\n}\n\n*, *::before, *::after {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: aqua;\n  font-family: 'Roboto Condensed', Arial;\n  font-family: 'Roboto Condensed';\n  font-family: Arial;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/navbar.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/navbar.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `#navbar > .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

#navbar > .container > * {
  list-style: none;
}

#navbar > .container > * > li {
  position: relative;
  padding: 0.3rem;
}

#navbar > .container > * > li:first-of-type {
  /* value needs to be equal to .nav_btn padding value */
  margin-top: 0.3rem;
}

/* optional */
#navbar > .container > *:not(.nav_left) > li::after,
#navbar > .container > *:not(.nav_left) > li:hover::after {
  position: absolute;
  content: '';
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(255, 187, 69);
  z-index: -1;
}

/* optional */
#navbar > .container > *:not(.nav_left) > li::after {
  width: 0%;
  transform: skewX(0deg);
  transition: all 500ms ease-in-out;
}

/* optional */
#navbar > .container > *:not(.nav_left) > li:hover::after {
  width: 100%;
  transform: skewX(8deg) scaleX(1.03);
  transition: all 200ms ease-in-out;
}

#navbar > .container > * > li > a {
  display: flex;
  align-items: center;
}

#navbar > .container > .nav_right {
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

#navbar > .container > .nav_right.visible {
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

@media screen and (min-width: 768px) {
  #navbar > .container > * {
    align-items: center;
  }

  #navbar > .container > .nav_right {
    position: relative;
    visibility: visible;
    background-color: transparent;
    padding: 0;
    transform: translateY(0%);
    display: flex;
    height: inherit;
    width: inherit;
  }

  #navbar > .container > *:not(.nav_left) > li:last-of-type:after,
  #navbar > .container > *:not(.nav_left) > li:last-of-type:hover:after {
    content: none;
  }

  #navbar > .container > *:not(.nav_left) > li:not(:last-child):after,
  #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {
    position: absolute;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 1rem;
  }

  /* optional */
  #navbar > .container > *:not(.nav_left) > li:not(:last-child):after {
    width: 0%;
    height: 0%;
    transform: skewX(0deg);
    transition: all 200ms ease-in-out;
  }

  /* optional */
  #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {
    width: 60%;
    height: 12%;
    transform: skewX(0deg) scaleX(1);
    transition: all 200ms ease-in-out;
  }

  #navbar > .container > * > li:first-of-type {
    margin-top: 0;
  }

  .nav_btn {
    display: none;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/navbar.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,sDAAsD;EACtD,kBAAkB;AACpB;;AAEA,aAAa;AACb;;EAEE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,MAAM;EACN,OAAO;EACP,mCAAmC;EACnC,WAAW;AACb;;AAEA,aAAa;AACb;EACE,SAAS;EACT,sBAAsB;EACtB,iCAAiC;AACnC;;AAEA,aAAa;AACb;EACE,WAAW;EACX,mCAAmC;EACnC,iCAAiC;AACnC;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,oCAAoC;EACpC,aAAa;EACb,4BAA4B;AAC9B;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;;EAEE,8CAA8C;EAC9C,qBAAqB;AACvB;;AAEA;;EAEE,+BAA+B;EAC/B,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,UAAU;AACZ;;AAEA;EACE,eAAe;EACf,oCAAoC;AACtC;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,kBAAkB;IAClB,mBAAmB;IACnB,6BAA6B;IAC7B,UAAU;IACV,yBAAyB;IACzB,aAAa;IACb,eAAe;IACf,cAAc;EAChB;;EAEA;;IAEE,aAAa;EACf;;EAEA;;IAEE,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,mBAAmB;EACrB;;EAEA,aAAa;EACb;IACE,SAAS;IACT,UAAU;IACV,sBAAsB;IACtB,iCAAiC;EACnC;;EAEA,aAAa;EACb;IACE,UAAU;IACV,WAAW;IACX,gCAAgC;IAChC,iCAAiC;EACnC;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;AACF","sourcesContent":["#navbar > .container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n#navbar > .container > * {\n  list-style: none;\n}\n\n#navbar > .container > * > li {\n  position: relative;\n  padding: 0.3rem;\n}\n\n#navbar > .container > * > li:first-of-type {\n  /* value needs to be equal to .nav_btn padding value */\n  margin-top: 0.3rem;\n}\n\n/* optional */\n#navbar > .container > *:not(.nav_left) > li::after,\n#navbar > .container > *:not(.nav_left) > li:hover::after {\n  position: absolute;\n  content: '';\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgb(255, 187, 69);\n  z-index: -1;\n}\n\n/* optional */\n#navbar > .container > *:not(.nav_left) > li::after {\n  width: 0%;\n  transform: skewX(0deg);\n  transition: all 500ms ease-in-out;\n}\n\n/* optional */\n#navbar > .container > *:not(.nav_left) > li:hover::after {\n  width: 100%;\n  transform: skewX(8deg) scaleX(1.03);\n  transition: all 200ms ease-in-out;\n}\n\n#navbar > .container > * > li > a {\n  display: flex;\n  align-items: center;\n}\n\n#navbar > .container > .nav_right {\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgb(143, 103, 223);\n  padding: 1rem;\n  transform: translateY(-100%);\n}\n\n#navbar > .container > .nav_right.visible {\n  visibility: visible;\n  transform: translateY(0%);\n  transition: transform 200ms ease-in-out;\n}\n\n.nav_item,\n.nav_item:visited {\n  color: var(--primary-font-color, rgb(0, 0, 0));\n  text-decoration: none;\n}\n\n.nav_item > svg,\n.nav_btn > svg {\n  width: clamp(2rem, 3vw, 3.5rem);\n  height: auto;\n}\n\n.nav_btn {\n  display: flex;\n  align-items: center;\n  background: transparent;\n  border: none;\n  border-radius: 0.35rem;\n  padding: 0.3rem;\n  z-index: 1;\n}\n\n.nav_btn:hover {\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.nav_btn:hover > svg {\n  filter: invert(1);\n}\n\n@media screen and (min-width: 768px) {\n  #navbar > .container > * {\n    align-items: center;\n  }\n\n  #navbar > .container > .nav_right {\n    position: relative;\n    visibility: visible;\n    background-color: transparent;\n    padding: 0;\n    transform: translateY(0%);\n    display: flex;\n    height: inherit;\n    width: inherit;\n  }\n\n  #navbar > .container > *:not(.nav_left) > li:last-of-type:after,\n  #navbar > .container > *:not(.nav_left) > li:last-of-type:hover:after {\n    content: none;\n  }\n\n  #navbar > .container > *:not(.nav_left) > li:not(:last-child):after,\n  #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    position: absolute;\n    bottom: 0;\n    top: auto;\n    left: 0;\n    right: 0;\n    margin: auto;\n    border-radius: 1rem;\n  }\n\n  /* optional */\n  #navbar > .container > *:not(.nav_left) > li:not(:last-child):after {\n    width: 0%;\n    height: 0%;\n    transform: skewX(0deg);\n    transition: all 200ms ease-in-out;\n  }\n\n  /* optional */\n  #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    width: 60%;\n    height: 12%;\n    transform: skewX(0deg) scaleX(1);\n    transition: all 200ms ease-in-out;\n  }\n\n  #navbar > .container > * > li:first-of-type {\n    margin-top: 0;\n  }\n\n  .nav_btn {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/styles/navbar.css":
/*!*******************************!*\
  !*** ./src/styles/navbar.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_navbar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./navbar.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/navbar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_navbar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_navbar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_navbar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_navbar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
  {
    element: 'h1',
    attributes: {
      id: 'hero',
      textContent: 'weather app',
    },
  },
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





const headerBuilder = {
  cacheDOM(headerElement) {
    this.header = headerElement;
    this.form = headerElement.querySelector('#form');
    this.inputSearch = headerElement.querySelector('#location');
    this.inputErrors = headerElement.querySelectorAll('.validity_error');
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.form.addEventListener('submit', this.submitForm);
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

          formItem.appendChild(inputLabel);
          formItem.appendChild(formInput);
          formItem.appendChild(inputError);
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
    e.preventDefault();
    console.log(this.inputSearch.value);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('getWeather', this.inputSearch.value);
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
  render(key, data, tabKey) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      content = build.home();
      // this.bindEvents();
    } else {
      // render today
      content = build[key](data, tabKey);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(e, tabKey) {
    let renderKey;
    console.log('switchContent() running from main.js');
    console.log(e);
    if (e.error) {
      renderKey = 'error';
    } else if (e === 'loading') {
      renderKey = 'loading';
    } else {
      console.log('fetch success');
      renderKey = 'tabs';
    }
    this.render(renderKey, e, tabKey);
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
          element: 'span',
          attributes: {
            textContent: 'Weather App',
          },
        },
      ],
    },
  ],
  navRight: [
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
/* harmony import */ var _styles_navbar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/navbar.css */ "./src/styles/navbar.css");
/* harmony import */ var _navbar_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar.config */ "./src/components/navbar/navbar.config.js");
/* harmony import */ var _helpers_createElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/createElement */ "./src/helpers/createElement.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  cacheDOM(navElement) {
    this.navbar = navElement;
    this.navRight = navElement.querySelector('.nav_right');
    this.navLinks = navElement.querySelectorAll('.nav_item');
    this.navBtn = navElement.querySelector('.nav_btn');
  },
  bindEvents() {
    this.toggleNav = this.toggleNav.bind(this);
    this.navBtn.addEventListener('click', this.toggleNav);
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
/* harmony import */ var _helpers_importAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/importAll */ "./src/helpers/importAll.js");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
/* harmony import */ var _helpers_formatDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/formatDate */ "./src/helpers/formatDate.js");
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




// const icons = importAll(require.context('../../../assets/icons', false, /\.svg$/));
const unitSystems = {
  icons: (0,_helpers_importAll__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
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

const data = (state) => [
  {
    key: 'name',
    value: state.date,
    setText() {
      return `${(0,_helpers_formatDate__WEBPACK_IMPORTED_MODULE_2__["default"])(this.value)}`;
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
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.setDay = this.setDay.bind(this);
    const forecastday = weatherData.forecast.forecastday.map(this.setDay);
    const state = {
      ...weatherData.location,
    };

    return {
      ...location(state),
      forecastday,
      last_updated: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_1__["default"])(weatherData.current.last_updated).toLowerCase(),
    };
  },
  setDay(obj) {
    const days = obj;
    const state = {
      icons: unitSystems.icons,
      get: unitSystems.get,
      setIcon: unitSystems.setIcon,
      setValue: unitSystems.setValue,
      roundValue: unitSystems.roundValue,
      unitSystem: unitSystems[this.unitSystem],
      ...obj.day,
      ...obj,
    };

    return { ...data(state) };
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(weatherData, unitSystem, timeStamp) {
    this.setProperties(forecastController.init(weatherData, unitSystem));
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
/* harmony import */ var _helpers_createContentRows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/createContentRows */ "./src/helpers/createContentRows.js");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");





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
      Object.values(day).forEach((detail) => {
        forecastDetails.append(
          (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_2__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.setText()),
        );
      });
    });
    // temporary
    forecastSection.appendChild(forecastDetails);
    return forecastSection;
  },
};

function buildForecast(weatherData, timeStamp) {
  _forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].init(weatherData, 'imperial', timeStamp);
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
/* harmony import */ var _helpers_importAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/importAll */ "./src/helpers/importAll.js");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
// current.last_updated
// forecast.forecastday[0].hour.time
// forecast.forecastday[0].hour.temp_f
// forecast.forecastday[0].hour.condition.text
// forecast.forecastday[0].hour.chance_of_rain
// (forecast.forecastday[0].hour.wind_dir
// forecast.forecastday[0].hour.wind_mph)




const unitSystems = {
  icons: (0,_helpers_importAll__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
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

const data = (state) => [
  {
    name: 'time',
    value: state.time,
    setText() {
      return `${(0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_1__["default"])(this.value)}`;
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
];

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
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.setArray = this.setArray.bind(this);
    this.setHours = this.setHours.bind(this);
    const forecastday = weatherData.forecast.forecastday.map(this.setArray);
    console.log(forecastday);

    const state = {
      ...weatherData,
      ...weatherData.location,
    };
    console.log(state);
    return {
      ...location(state),
      forecastday,
      last_updated: (0,_helpers_formatTime__WEBPACK_IMPORTED_MODULE_1__["default"])(state.current.last_updated).toLowerCase(),
    };
  },
  setArray(obj) {
    const hours = obj.hour.reduce(this.setHours, []);
    console.log(hours);
    const state = {
      ...obj,
    };

    return { ...date(state), hours };
  },
  setHours(filtered, hour) {
    const date1 = new Date(this.weatherData.current.last_updated);
    const date2 = new Date(hour.time);

    if (date1.getTime() < date2.getTime()) {
      const state = {
        icons: unitSystems.icons,
        get: unitSystems.get,
        setIcon: unitSystems.setIcon,
        setValue: unitSystems.setValue,
        roundValue: unitSystems.roundValue,
        unitSystem: unitSystems[this.unitSystem],
        ...hour,
      };
      console.log(data(state));
      filtered.push({ ...data(state) });
    }

    return filtered;
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(weatherData, unitSystem, timeStamp) {
    this.setProperties(hourlyController.init(weatherData, unitSystem));
    console.log(weatherData);
    console.log(timeStamp);
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
/* harmony import */ var _helpers_formatDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/formatDate */ "./src/helpers/formatDate.js");
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");
/* harmony import */ var _helpers_createContentRows__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/createContentRows */ "./src/helpers/createContentRows.js");






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
      console.log(day);
      const hourlyDay = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('ol');
      const hourlyDayHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h3');
      hourlyDay.className = 'day';
      hourlyDayHeading.textContent = (0,_helpers_formatDate__WEBPACK_IMPORTED_MODULE_2__["default"])(day.date);
      hourlyDay.appendChild(hourlyDayHeading);
      day.hours.forEach((hour) => {
        Object.values(hour).forEach((detail) => {
          hourlyDay.appendChild(
            (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_4__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.setText()),
          );
        });
      });
      hourlyDetails.appendChild(hourlyDay);
    });

    hourlySection.appendChild(hourlyDetails);
    // temporary
    return hourlySection;
  },
};

function buildHourly(weatherData, timeStamp) {
  _hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].init(weatherData, 'imperial', timeStamp);
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







const build = {
  tabsNavbar: _tabs_navbar_tabs_navbar__WEBPACK_IMPORTED_MODULE_1__["default"],
  today: _today_today__WEBPACK_IMPORTED_MODULE_2__["default"],
  hourly: _hourly_hourly__WEBPACK_IMPORTED_MODULE_3__["default"],
  forecast: _forecast_forecast__WEBPACK_IMPORTED_MODULE_4__["default"],
};

const tabsBuilder = {
  init(weatherData) {
    this.setWeather(weatherData);
    this.switchTab = this.switchTab.bind(this);
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].subscribe('switchTab', this.switchTab);
  },
  setWeather(weatherData) {
    this.weatherData = weatherData;
    this.location = weatherData.location.name;
    this.apiLastUpdated = weatherData.current.last_updated_epoch;
    // this.timeStamp = weatherData.current.last_updated_epoch;
    this.timeStamp = Math.floor(Date.now() / 1000);

    console.log(this.timeStamp);
    console.log(this.apiLastUpdated);
  },
  cacheDOM(tabsSection) {
    this.tabsSection = tabsSection;
    this.tabsList = tabsSection.querySelectorAll('.tabs_list_item > a');
  },
  bindEvents() {
    this.switchTab = this.switchTab.bind(this);
    this.tabsList.forEach((tab) => tab.addEventListener('click', this.switchTab));
  },
  render(key, update) {
    // debugger;
    let content;
    if (!update) {
      if (!key) {
        // if no key
        content = build.today(this.weatherData, this.timeStamp);
      } else {
        content = build[key](this.weatherData, this.timeStamp);
        this.tabsSection.lastChild.remove();
      }
      this.tabsSection.appendChild(content);
    } else {
      console.log('update exists');
      _containers_pubSub__WEBPACK_IMPORTED_MODULE_5__["default"].publish('getWeather', this.location, key);
    }
  },
  switchTab(e, tabKey) {
    let renderKey;
    let update = true;
    if (tabKey) {
      renderKey = tabKey;
      update = false;
    } else {
      const { className: elementClassName } = e.currentTarget;
      renderKey = elementClassName;
    }
    this.render(renderKey, update);
  },
};

function buildTabs(weatherData, tabKey) {
  console.log(tabKey);
  if (!tabKey) {
    tabsBuilder.init(weatherData);
  }

  const tabsSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
  const tabsHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
  tabsSection.id = 'tabs';
  tabsHeading.setAttributes({ textContent: 'TABS' });

  tabsSection.appendChild(tabsHeading);
  tabsSection.appendChild(build.tabsNavbar());
  tabsBuilder.cacheDOM(tabsSection);
  tabsBuilder.render();
  tabsBuilder.bindEvents();
  if (tabKey) {
    console.log('tabsBuilder.render() running once more');
    tabsBuilder.setWeather(weatherData);
    tabsBuilder.render(tabKey);
  }
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
/* harmony import */ var _helpers_importAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/importAll */ "./src/helpers/importAll.js");
// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir



const unitSystems = {
  icons: (0,_helpers_importAll__WEBPACK_IMPORTED_MODULE_1__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
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
  init(weatherData, unitSystem) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    const state = {
      icons: unitSystems.icons,
      get: unitSystems.get,
      setIcon: unitSystems.setIcon,
      setValue: unitSystems.setValue,
      roundValue: unitSystems.roundValue,
      unitSystem: unitSystems[unitSystem],
      ...weatherData.current,
      ...weatherData.forecast.forecastday[0],
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
  init(weatherData, unitSystem, timeStamp) {
    // console.log(todayController.init(weatherData, unitSystem));
    console.log(weatherData);
    console.log(timeStamp);
    this.setProperties(todayController.init(weatherData, unitSystem));
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
/* harmony import */ var _helpers_formatTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/formatTime */ "./src/helpers/formatTime.js");





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
    const todaySectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h2');
    const todayLocation = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('span');
    const todayTimeStamp = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('p');

    todaySummary.id = 'today_summary';
    todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todayLocation.textContent = ` - ${_today_config__WEBPACK_IMPORTED_MODULE_2__["default"].location.setText()}`;
    todayTimeStamp.textContent = `As of ${_today_config__WEBPACK_IMPORTED_MODULE_2__["default"].last_updated}`;

    todaySectionHeading.appendChild(todayLocation);
    todayHeader.appendChild(todaySectionHeading);
    todayHeader.appendChild(todayTimeStamp);
    todaySummary.appendChild(todayHeader);

    _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].summary.forEach((detail) => {
      todaySummary.appendChild(
        (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.setText()),
      );
    });

    const todayDetails = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    todayDetails.id = 'today_details';

    _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].details.forEach((detail) => {
      todayDetails.appendChild(
        (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"], null, detail.icon, detail.label, detail.setText()),
      );
    });

    todaySection.appendChild(todaySummary);
    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

function buildToday(weatherData, timeStamp) {
  console.log(timeStamp);
  _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].init(weatherData, 'imperial', timeStamp);
  return todayBuilder.render();
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph


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
function formatDate(dateString) {
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

  const date = new Date(dateString);
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
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
  const date = new Date(time);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxzQkFBc0IsNkJBQTZCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwQkFBMEI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sd0ZBQXdGLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sVUFBVSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sTUFBTSxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLFVBQVUsS0FBSyxVQUFVLFVB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Ozs7Ozs7Ozs7O0FDNUJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksb0JBQW9CLElBQUkseUJBQXlCLEVBQUUsZUFBZTtBQUM5RTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1hlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9AaWNvbmZ1L3N2Zy1pbmplY3QvZGlzdC9zdmctaW5qZWN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvYXBwLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9uYXZiYXIuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9uYXZiYXIuY3NzP2MxZGIiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvZXJyb3IvZXJyb3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9ob21lL2hvbWUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbWFpbi9tYWluLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy9mb3JlY2FzdC9mb3JlY2FzdC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvZm9yZWNhc3QvZm9yZWNhc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvaG91cmx5L2hvdXJseS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvaG91cmx5L2hvdXJseS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnNfbmF2YmFyL3RhYnNfbmF2YmFyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzX25hdmJhci90YWJzX25hdmJhci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90b2RheS90b2RheS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdG9kYXkvdG9kYXkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2FwaV9jb250cm9sbGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2NyZWF0ZUNvbnRlbnRSb3dzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9mb3JtYXREYXRlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9mb3JtYXRUaW1lLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9pbXBvcnRBbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTVkdJbmplY3QgLSBWZXJzaW9uIDEuMi4zXG4gKiBBIHRpbnksIGludHVpdGl2ZSwgcm9idXN0LCBjYWNoaW5nIHNvbHV0aW9uIGZvciBpbmplY3RpbmcgU1ZHIGZpbGVzIGlubGluZSBpbnRvIHRoZSBET00uXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IElOQ09SUywgdGhlIGNyZWF0b3JzIG9mIGljb25mdS5jb21cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAvLyBjb25zdGFudHMgZm9yIGJldHRlciBtaW5pZmljYXRpb25cbiAgdmFyIF9DUkVBVEVfRUxFTUVOVF8gPSAnY3JlYXRlRWxlbWVudCc7XG4gIHZhciBfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FXyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSc7XG4gIHZhciBfTEVOR1RIXyA9ICdsZW5ndGgnO1xuICB2YXIgX1NUWUxFXyA9ICdzdHlsZSc7XG4gIHZhciBfVElUTEVfID0gJ3RpdGxlJztcbiAgdmFyIF9VTkRFRklORURfID0gJ3VuZGVmaW5lZCc7XG4gIHZhciBfU0VUX0FUVFJJQlVURV8gPSAnc2V0QXR0cmlidXRlJztcbiAgdmFyIF9HRVRfQVRUUklCVVRFXyA9ICdnZXRBdHRyaWJ1dGUnO1xuXG4gIHZhciBOVUxMID0gbnVsbDtcblxuICAvLyBjb25zdGFudHNcbiAgdmFyIF9fU1ZHSU5KRUNUID0gJ19fc3ZnSW5qZWN0JztcbiAgdmFyIElEX1NVRkZJWCA9ICctLWluamVjdC0nO1xuICB2YXIgSURfU1VGRklYX1JFR0VYID0gbmV3IFJlZ0V4cChJRF9TVUZGSVggKyAnXFxcXGQrJywgXCJnXCIpO1xuICB2YXIgTE9BRF9GQUlMID0gJ0xPQURfRkFJTCc7XG4gIHZhciBTVkdfTk9UX1NVUFBPUlRFRCA9ICdTVkdfTk9UX1NVUFBPUlRFRCc7XG4gIHZhciBTVkdfSU5WQUxJRCA9ICdTVkdfSU5WQUxJRCc7XG4gIHZhciBBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTID0gWydzcmMnLCAnYWx0JywgJ29ubG9hZCcsICdvbmVycm9yJ107XG4gIHZhciBBX0VMRU1FTlQgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXSgnYScpO1xuICB2YXIgSVNfU1ZHX1NVUFBPUlRFRCA9IHR5cGVvZiBTVkdSZWN0ICE9IF9VTkRFRklORURfO1xuICB2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHVzZUNhY2hlOiB0cnVlLFxuICAgIGNvcHlBdHRyaWJ1dGVzOiB0cnVlLFxuICAgIG1ha2VJZHNVbmlxdWU6IHRydWVcbiAgfTtcbiAgLy8gTWFwIG9mIElSSSByZWZlcmVuY2VhYmxlIHRhZyBuYW1lcyB0byBwcm9wZXJ0aWVzIHRoYXQgY2FuIHJlZmVyZW5jZSB0aGVtLiBUaGlzIGlzIGRlZmluZWQgaW5cbiAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzExL2xpbmtpbmcuaHRtbCNwcm9jZXNzaW5nSVJJXG4gIHZhciBJUklfVEFHX1BST1BFUlRJRVNfTUFQID0ge1xuICAgIGNsaXBQYXRoOiBbJ2NsaXAtcGF0aCddLFxuICAgICdjb2xvci1wcm9maWxlJzogTlVMTCxcbiAgICBjdXJzb3I6IE5VTEwsXG4gICAgZmlsdGVyOiBOVUxMLFxuICAgIGxpbmVhckdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgbWFya2VyOiBbJ21hcmtlcicsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0J10sXG4gICAgbWFzazogTlVMTCxcbiAgICBwYXR0ZXJuOiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgcmFkaWFsR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXVxuICB9O1xuICB2YXIgSU5KRUNURUQgPSAxO1xuICB2YXIgRkFJTCA9IDI7XG5cbiAgdmFyIHVuaXF1ZUlkQ291bnRlciA9IDE7XG4gIHZhciB4bWxTZXJpYWxpemVyO1xuICB2YXIgZG9tUGFyc2VyO1xuXG5cbiAgLy8gY3JlYXRlcyBhbiBTVkcgZG9jdW1lbnQgZnJvbSBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cikge1xuICAgIGRvbVBhcnNlciA9IGRvbVBhcnNlciB8fCBuZXcgRE9NUGFyc2VyKCk7XG4gICAgcmV0dXJuIGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnU3RyLCAndGV4dC94bWwnKTtcbiAgfVxuXG5cbiAgLy8gc2VhcmlhbGl6ZXMgYW4gU1ZHIGVsZW1lbnQgdG8gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbWVudCkge1xuICAgIHhtbFNlcmlhbGl6ZXIgPSB4bWxTZXJpYWxpemVyIHx8IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoc3ZnRWxlbWVudCk7XG4gIH1cblxuXG4gIC8vIFJldHVybnMgdGhlIGFic29sdXRlIHVybCBmb3IgdGhlIHNwZWNpZmllZCB1cmxcbiAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVVcmwodXJsKSB7XG4gICAgQV9FTEVNRU5ULmhyZWYgPSB1cmw7XG4gICAgcmV0dXJuIEFfRUxFTUVOVC5ocmVmO1xuICB9XG5cblxuICAvLyBMb2FkIHN2ZyB3aXRoIGFuIFhIUiByZXF1ZXN0XG4gIGZ1bmN0aW9uIGxvYWRTdmcodXJsLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAvLyByZWFkeVN0YXRlIGlzIERPTkVcbiAgICAgICAgICB2YXIgc3RhdHVzID0gcmVxLnN0YXR1cztcbiAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgT0tcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVhNTCwgcmVxLnJlc3BvbnNlVGV4dC50cmltKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgZXJyb3IgKDR4eCBvciA1eHgpXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgMCBjYW4gaW5kaWNhdGUgYSBmYWlsZWQgY3Jvc3MtZG9tYWluIGNhbGxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cblxuICAvLyBDb3B5IGF0dHJpYnV0ZXMgZnJvbSBpbWcgZWxlbWVudCB0byBzdmcgZWxlbWVudFxuICBmdW5jdGlvbiBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKSB7XG4gICAgdmFyIGF0dHJpYnV0ZTtcbiAgICB2YXIgYXR0cmlidXRlTmFtZTtcbiAgICB2YXIgYXR0cmlidXRlVmFsdWU7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbWdFbGVtLmF0dHJpYnV0ZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgLy8gT25seSBjb3B5IGF0dHJpYnV0ZXMgbm90IGV4cGxpY2l0bHkgZXhjbHVkZWQgZnJvbSBjb3B5aW5nXG4gICAgICBpZiAoQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUy5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID09IC0xKSB7XG4gICAgICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAvLyBJZiBpbWcgYXR0cmlidXRlIGlzIFwidGl0bGVcIiwgaW5zZXJ0IGEgdGl0bGUgZWxlbWVudCBpbnRvIFNWRyBlbGVtZW50XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09IF9USVRMRV8pIHtcbiAgICAgICAgICB2YXIgdGl0bGVFbGVtO1xuICAgICAgICAgIHZhciBmaXJzdEVsZW1lbnRDaGlsZCA9IHN2Z0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudENoaWxkICYmIGZpcnN0RWxlbWVudENoaWxkLmxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpID09IF9USVRMRV8pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGlzIGEgdGl0bGUgZWxlbWVudCwga2VlcCBpdCBhcyB0aGUgdGl0bGUgZWxlbWVudFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGVsZW1lbnQgaXMgbm90IGEgdGl0bGUgZWxlbWVudCwgY3JlYXRlIGEgbmV3IHRpdGxlXG4gICAgICAgICAgICAvLyBlbGUsZW10IGFuZCBzZXQgaXQgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfICsgJ05TJ10oJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgX1RJVExFXyk7XG4gICAgICAgICAgICBzdmdFbGVtLmluc2VydEJlZm9yZSh0aXRsZUVsZW0sIGZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2V0IG5ldyB0aXRsZSBjb250ZW50XG4gICAgICAgICAgdGl0bGVFbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2V0IGltZyBhdHRyaWJ1dGUgdG8gc3ZnIGVsZW1lbnRcbiAgICAgICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGFwcGVuZHMgYSBzdWZmaXggdG8gSURzIG9mIHJlZmVyZW5jZWQgZWxlbWVudHMgaW4gdGhlIDxkZWZzPiBpbiBvcmRlciB0byAgdG8gYXZvaWQgSUQgY29sbGlzaW9uXG4gIC8vIGJldHdlZW4gbXVsdGlwbGUgaW5qZWN0ZWQgU1ZHcy4gVGhlIHN1ZmZpeCBoYXMgdGhlIGZvcm0gXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYSBydW5uaW5nIG51bWJlciB3aGljaCBpc1xuICAvLyBpbmNyZW1lbnRlZCB3aXRoIGVhY2ggaW5qZWN0aW9uLiBSZWZlcmVuY2VzIHRvIHRoZSBJRHMgYXJlIGFkanVzdGVkIGFjY29yZGluZ2x5LlxuICAvLyBXZSBhc3N1bWUgdGhhIGFsbCBJRHMgd2l0aGluIHRoZSBpbmplY3RlZCBTVkcgYXJlIHVuaXF1ZSwgdGhlcmVmb3JlIHRoZSBzYW1lIHN1ZmZpeCBjYW4gYmUgdXNlZCBmb3IgYWxsIElEcyBvZiBvbmVcbiAgLy8gaW5qZWN0ZWQgU1ZHLlxuICAvLyBJZiB0aGUgb25seVJlZmVyZW5jZWQgYXJndW1lbnQgaXMgc2V0IHRvIHRydWUsIG9ubHkgdGhvc2UgSURzIHdpbGwgYmUgbWFkZSB1bmlxdWUgdGhhdCBhcmUgcmVmZXJlbmNlZCBmcm9tIHdpdGhpbiB0aGUgU1ZHXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgb25seVJlZmVyZW5jZWQpIHtcbiAgICB2YXIgaWRTdWZmaXggPSBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKztcbiAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gZm9yIGZ1bmN0aW9uYWwgbm90YXRpb25zIG9mIGFuIElSSSByZWZlcmVuY2VzLiBUaGlzIHdpbGwgZmluZCBvY2N1cmVuY2VzIGluIHRoZSBmb3JtXG4gICAgLy8gdXJsKCNhbnlJZCkgb3IgdXJsKFwiI2FueUlkXCIpIChmb3IgSW50ZXJuZXQgRXhwbG9yZXIpIGFuZCBjYXB0dXJlIHRoZSByZWZlcmVuY2VkIElEXG4gICAgdmFyIGZ1bmNJcmlSZWdleCA9IC91cmxcXChcIj8jKFthLXpBLVpdW1xcdzouLV0qKVwiP1xcKS9nO1xuICAgIC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBhbiBJRC4gVGhlIFNWRyBzcGVjIHJlY29tbWVuZHMgdG8gcHV0IHJlZmVyZW5jZWQgZWxlbWVudHMgaW5zaWRlIDxkZWZzPiBlbGVtZW50cywgYnV0XG4gICAgLy8gdGhpcyBpcyBub3QgYSByZXF1aXJlbWVudCwgdGhlcmVmb3JlIHdlIGhhdmUgdG8gc2VhcmNoIGZvciBJRHMgaW4gdGhlIHdob2xlIFNWRy5cbiAgICB2YXIgaWRFbGVtZW50cyA9IHN2Z0VsZW0ucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgIHZhciBpZEVsZW07XG4gICAgLy8gQW4gb2JqZWN0IGNvbnRhaW5pbmcgcmVmZXJlbmNlZCBJRHMgIGFzIGtleXMgaXMgdXNlZCBpZiBvbmx5IHJlZmVyZW5jZWQgSURzIHNob3VsZCBiZSB1bmlxdWlmaWVkLlxuICAgIC8vIElmIHRoaXMgb2JqZWN0IGRvZXMgbm90IGV4aXN0LCBhbGwgSURzIHdpbGwgYmUgdW5pcXVpZmllZC5cbiAgICB2YXIgcmVmZXJlbmNlZElkcyA9IG9ubHlSZWZlcmVuY2VkID8gW10gOiBOVUxMO1xuICAgIHZhciB0YWdOYW1lO1xuICAgIHZhciBpcmlUYWdOYW1lcyA9IHt9O1xuICAgIHZhciBpcmlQcm9wZXJ0aWVzID0gW107XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgaSwgajtcblxuICAgIGlmIChpZEVsZW1lbnRzW19MRU5HVEhfXSkge1xuICAgICAgLy8gTWFrZSBhbGwgSURzIHVuaXF1ZSBieSBhZGRpbmcgdGhlIElEIHN1ZmZpeCBhbmQgY29sbGVjdCBhbGwgZW5jb3VudGVyZWQgdGFnIG5hbWVzXG4gICAgICAvLyB0aGF0IGFyZSBJUkkgcmVmZXJlbmNlYWJsZSBmcm9tIHByb3Blcml0aWVzLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgdGFnTmFtZSA9IGlkRWxlbWVudHNbaV0ubG9jYWxOYW1lOyAvLyBVc2Ugbm9uLW5hbWVzcGFjZWQgdGFnIG5hbWVcbiAgICAgICAgLy8gTWFrZSBJRCB1bmlxdWUgaWYgdGFnIG5hbWUgaXMgSVJJIHJlZmVyZW5jZWFibGVcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gSVJJX1RBR19QUk9QRVJUSUVTX01BUCkge1xuICAgICAgICAgIGlyaVRhZ05hbWVzW3RhZ05hbWVdID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR2V0IGFsbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG1hcHBlZCB0byB0aGUgZm91bmQgSVJJIHJlZmVyZW5jZWFibGUgdGFnc1xuICAgICAgZm9yICh0YWdOYW1lIGluIGlyaVRhZ05hbWVzKSB7XG4gICAgICAgIChJUklfVEFHX1BST1BFUlRJRVNfTUFQW3RhZ05hbWVdIHx8IFt0YWdOYW1lXSkuZm9yRWFjaChmdW5jdGlvbiAobWFwcGVkUHJvcGVydHkpIHtcbiAgICAgICAgICAvLyBBZGQgbWFwcGVkIHByb3BlcnRpZXMgdG8gYXJyYXkgb2YgaXJpIHJlZmVyZW5jaW5nIHByb3BlcnRpZXMuXG4gICAgICAgICAgLy8gVXNlIGxpbmVhciBzZWFyY2ggaGVyZSBiZWNhdXNlIHRoZSBudW1iZXIgb2YgcG9zc2libGUgZW50cmllcyBpcyB2ZXJ5IHNtYWxsIChtYXhpbXVtIDExKVxuICAgICAgICAgIGlmIChpcmlQcm9wZXJ0aWVzLmluZGV4T2YobWFwcGVkUHJvcGVydHkpIDwgMCkge1xuICAgICAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKG1hcHBlZFByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIEFkZCBcInN0eWxlXCIgdG8gcHJvcGVydGllcywgYmVjYXVzZSBpdCBtYXkgY29udGFpbiByZWZlcmVuY2VzIGluIHRoZSBmb3JtICdzdHlsZT1cImZpbGw6dXJsKCNteUZpbGwpXCInXG4gICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChfU1RZTEVfKTtcbiAgICAgIH1cbiAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgU1ZHIGFuZCByZXBsYWNlIElEcyBpbiByZWZlcmVuY2VzLlxuICAgICAgLy8gVG8gZ2V0IGFsbCBkZXNjZW5kaW5nIGVsZW1lbnRzLCBnZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIHNlZW1zIHRvIHBlcmZvcm0gZmFzdGVyIHRoYW4gcXVlcnlTZWxlY3RvckFsbCgnKicpLlxuICAgICAgLy8gU2luY2Ugc3ZnRWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIGRvZXMgbm90IHJldHVybiB0aGUgc3ZnIGVsZW1lbnQgaXRzZWxmLCB3ZSBoYXZlIHRvIGhhbmRsZSBpdCBzZXBhcmF0ZWx5LlxuICAgICAgdmFyIGRlc2NFbGVtZW50cyA9IHN2Z0VsZW1bX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCcqJyk7XG4gICAgICB2YXIgZWxlbWVudCA9IHN2Z0VsZW07XG4gICAgICB2YXIgcHJvcGVydHlOYW1lO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIG5ld1ZhbHVlO1xuICAgICAgZm9yIChpID0gLTE7IGVsZW1lbnQgIT0gTlVMTDspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09IF9TVFlMRV8pIHtcbiAgICAgICAgICAvLyBJZiBlbGVtZW50IGlzIGEgc3R5bGUgZWxlbWVudCwgcmVwbGFjZSBJRHMgaW4gYWxsIG9jY3VyZW5jZXMgb2YgXCJ1cmwoI2FueUlkKVwiIGluIHRleHQgY29udGVudFxuICAgICAgICAgIHZhbHVlID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIHByb3BlcnR5IG5hbWVzIGZvciB3aGljaCBJRHMgd2VyZSBmb3VuZFxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXTsgaisrKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBpcmlQcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgdmFsdWUgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlcGxhY2UgSURzIGluIHhsaW5rOnJlZiBhbmQgaHJlZiBhdHRyaWJ1dGVzXG4gICAgICAgICAgWyd4bGluazpocmVmJywgJ2hyZWYnXS5mb3JFYWNoKGZ1bmN0aW9uKHJlZkF0dHJOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaXJpID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lKTtcbiAgICAgICAgICAgIGlmICgvXlxccyojLy50ZXN0KGlyaSkpIHsgLy8gQ2hlY2sgaWYgaXJpIGlzIG5vbi1udWxsIGFuZCBpbnRlcm5hbCByZWZlcmVuY2VcbiAgICAgICAgICAgICAgaXJpID0gaXJpLnRyaW0oKTtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lLCBpcmkgKyBpZFN1ZmZpeCk7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIElEIHRvIHJlZmVyZW5jZWQgSURzXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpcmkuc3Vic3RyaW5nKDEpXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZGVzY0VsZW1lbnRzWysraV07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICBpZEVsZW0gPSBpZEVsZW1lbnRzW2ldO1xuICAgICAgICAvLyBJZiBzZXQgb2YgcmVmZXJlbmNlZCBJRHMgZXhpc3RzLCBtYWtlIG9ubHkgcmVmZXJlbmNlZCBJRHMgdW5pcXVlLFxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSBhbGwgSURzIHVuaXF1ZS5cbiAgICAgICAgaWYgKCFyZWZlcmVuY2VkSWRzIHx8IHJlZmVyZW5jZWRJZHNbaWRFbGVtLmlkXSkge1xuICAgICAgICAgIC8vIEFkZCBzdWZmaXggdG8gZWxlbWVudCdzIElEXG4gICAgICAgICAgaWRFbGVtLmlkICs9IGlkU3VmZml4O1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiB0cnVlIGlmIFNWRyBlbGVtZW50IGhhcyBjaGFuZ2VkXG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH1cblxuXG4gIC8vIEZvciBjYWNoZWQgU1ZHcyB0aGUgSURzIGFyZSBtYWRlIHVuaXF1ZSBieSBzaW1wbHkgcmVwbGFjaW5nIHRoZSBhbHJlYWR5IGluc2VydGVkIHVuaXF1ZSBJRHMgd2l0aCBhXG4gIC8vIGhpZ2hlciBJRCBjb3VudGVyLiBUaGlzIGlzIG11Y2ggbW9yZSBwZXJmb3JtYW50IHRoYW4gYSBjYWxsIHRvIG1ha2VJZHNVbmlxdWUoKS5cbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZUNhY2hlZChzdmdTdHJpbmcpIHtcbiAgICByZXR1cm4gc3ZnU3RyaW5nLnJlcGxhY2UoSURfU1VGRklYX1JFR0VYLCBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKyk7XG4gIH1cblxuXG4gIC8vIEluamVjdCBTVkcgYnkgcmVwbGFjaW5nIHRoZSBpbWcgZWxlbWVudCB3aXRoIHRoZSBTVkcgZWxlbWVudCBpbiB0aGUgRE9NXG4gIGZ1bmN0aW9uIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoc3ZnRWxlbSkge1xuICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKCdkYXRhLWluamVjdC11cmwnLCBhYnNVcmwpO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBpbWdFbGVtLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3B5QXR0cmlidXRlcykge1xuICAgICAgICAgIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludm9rZSBiZWZvcmVJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGJlZm9yZUluamVjdCA9IG9wdGlvbnMuYmVmb3JlSW5qZWN0O1xuICAgICAgICB2YXIgaW5qZWN0RWxlbSA9IChiZWZvcmVJbmplY3QgJiYgYmVmb3JlSW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0pKSB8fCBzdmdFbGVtO1xuICAgICAgICAvLyBSZXBsYWNlIGltZyBlbGVtZW50IHdpdGggbmV3IGVsZW1lbnQuIFRoaXMgaXMgdGhlIGFjdHVhbCBpbmplY3Rpb24uXG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGluamVjdEVsZW0sIGltZ0VsZW0pO1xuICAgICAgICAvLyBNYXJrIGltZyBlbGVtZW50IGFzIGluamVjdGVkXG4gICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gSU5KRUNURUQ7XG4gICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICAgICAgLy8gSW52b2tlIGFmdGVySW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBhZnRlckluamVjdCA9IG9wdGlvbnMuYWZ0ZXJJbmplY3Q7XG4gICAgICAgIGlmIChhZnRlckluamVjdCkge1xuICAgICAgICAgIGFmdGVySW5qZWN0KGltZ0VsZW0sIGluamVjdEVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNZXJnZXMgYW55IG51bWJlciBvZiBvcHRpb25zIG9iamVjdHMgaW50byBhIG5ldyBvYmplY3RcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKCkge1xuICAgIHZhciBtZXJnZWRPcHRpb25zID0ge307XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBzcGVjaWZpZWQgb3B0aW9ucyBvYmplY3RzIGFuZCBhZGQgYWxsIHByb3BlcnRpZXMgdG8gdGhlIG5ldyBvcHRpb25zIG9iamVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50KSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIG1lcmdlZE9wdGlvbnNba2V5XSA9IGFyZ3VtZW50W2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG4gIH1cblxuXG4gIC8vIEFkZHMgdGhlIHNwZWNpZmllZCBDU1MgdG8gdGhlIGRvY3VtZW50J3MgPGhlYWQ+IGVsZW1lbnRcbiAgZnVuY3Rpb24gYWRkU3R5bGVUb0hlYWQoY3NzKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudFtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ2hlYWQnKVswXTtcbiAgICBpZiAoaGVhZCkge1xuICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oX1NUWUxFXyk7XG4gICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBCdWlsZHMgYW4gU1ZHIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gYnVpbGRTdmdFbGVtZW50KHN2Z1N0ciwgdmVyaWZ5KSB7XG4gICAgaWYgKHZlcmlmeSkge1xuICAgICAgdmFyIHN2Z0RvYztcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBTVkcgc3RyaW5nIHdpdGggRE9NUGFyc2VyXG4gICAgICAgIHN2Z0RvYyA9IHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICBpZiAoc3ZnRG9jW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgncGFyc2VyZXJyb3InKVtfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gRE9NUGFyc2VyIGRvZXMgbm90IHRocm93IGFuIGV4Y2VwdGlvbiwgYnV0IGluc3RlYWQgcHV0cyBwYXJzZXJlcnJvciB0YWdzIGluIHRoZSBkb2N1bWVudFxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdmdEb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gc3ZnU3RyO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBvbmxvYWQgYXR0cmlidXRlLiBTaG91bGQgb25seSBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgdW5zdHlsZWQgaW1hZ2UgZmxhc2ggcHJvdGVjdGlvbiBhbmRcbiAgICAvLyBtYWtlIHRoZSBlbGVtZW50IHZpc2libGUsIG5vdCBmb3IgcmVtb3ZpbmcgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgIGltZ0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdvbmxvYWQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZXJyb3JNZXNzYWdlKG1zZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NWR0luamVjdDogJyArIG1zZyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGZhaWwoaW1nRWxlbSwgc3RhdHVzLCBvcHRpb25zKSB7XG4gICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBGQUlMO1xuICAgIGlmIChvcHRpb25zLm9uRmFpbCkge1xuICAgICAgb3B0aW9ucy5vbkZhaWwoaW1nRWxlbSwgc3RhdHVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlKHN0YXR1cyk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfSU5WQUxJRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX05PVF9TVVBQT1JURUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgZmFpbChpbWdFbGVtLCBMT0FEX0ZBSUwsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKSB7XG4gICAgaW1nRWxlbS5vbmxvYWQgPSBOVUxMO1xuICAgIGltZ0VsZW0ub25lcnJvciA9IE5VTEw7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGltZ05vdFNldChtc2cpIHtcbiAgICBlcnJvck1lc3NhZ2UoJ25vIGltZyBlbGVtZW50Jyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNWR0luamVjdChnbG9iYWxOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgdmFyIHN2Z0xvYWRDYWNoZSA9IHt9O1xuXG4gICAgaWYgKElTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgIC8vIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFNWRywgYWRkIGEgc21hbGwgc3R5bGVzaGVldCB0aGF0IGhpZGVzIHRoZSA8aW1nPiBlbGVtZW50cyB1bnRpbFxuICAgICAgLy8gaW5qZWN0aW9uIGlzIGZpbmlzaGVkLiBUaGlzIGF2b2lkcyBzaG93aW5nIHRoZSB1bnN0eWxlZCBTVkdzIGJlZm9yZSBzdHlsZSBpcyBhcHBsaWVkLlxuICAgICAgYWRkU3R5bGVUb0hlYWQoJ2ltZ1tvbmxvYWRePVwiJyArIGdsb2JhbE5hbWUgKyAnKFwiXXt2aXNpYmlsaXR5OmhpZGRlbjt9Jyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTVkdJbmplY3RcbiAgICAgKlxuICAgICAqIEluamVjdHMgdGhlIFNWRyBzcGVjaWZpZWQgaW4gdGhlIGBzcmNgIGF0dHJpYnV0ZSBvZiB0aGUgc3BlY2lmaWVkIGBpbWdgIGVsZW1lbnQgb3IgYXJyYXkgb2YgYGltZ2BcbiAgICAgKiBlbGVtZW50cy4gUmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IHdoaWNoIHJlc29sdmVzIGlmIGFsbCBwYXNzZWQgaW4gYGltZ2AgZWxlbWVudHMgaGF2ZSBlaXRoZXIgYmVlblxuICAgICAqIGluamVjdGVkIG9yIGZhaWxlZCB0byBpbmplY3QgKE9ubHkgaWYgYSBnbG9iYWwgUHJvbWlzZSBvYmplY3QgaXMgYXZhaWxhYmxlIGxpa2UgaW4gYWxsIG1vZGVybiBicm93c2Vyc1xuICAgICAqIG9yIHRocm91Z2ggYSBwb2x5ZmlsbCkuXG4gICAgICpcbiAgICAgKiBPcHRpb25zOlxuICAgICAqIHVzZUNhY2hlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBTVkcgd2lsbCBiZSBjYWNoZWQgdXNpbmcgdGhlIGFic29sdXRlIFVSTC4gRGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAuXG4gICAgICogY29weUF0dHJpYnV0ZXM6IElmIHNldCB0byBgdHJ1ZWAgdGhlIGF0dHJpYnV0ZXMgd2lsbCBiZSBjb3BpZWQgZnJvbSBgaW1nYCB0byBgc3ZnYC4gRGZhdWx0IHZhbHVlXG4gICAgICogICAgIGlzIGB0cnVlYC5cbiAgICAgKiBtYWtlSWRzVW5pcXVlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBJRCBvZiBlbGVtZW50cyBpbiB0aGUgYDxkZWZzPmAgZWxlbWVudCB0aGF0IGNhbiBiZSByZWZlcmVuY2VzIGJ5XG4gICAgICogICAgIHByb3BlcnR5IHZhbHVlcyAoZm9yIGV4YW1wbGUgJ2NsaXBQYXRoJykgYXJlIG1hZGUgdW5pcXVlIGJ5IGFwcGVuZGluZyBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhXG4gICAgICogICAgIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGluY3JlYXNlcyB3aXRoIGVhY2ggaW5qZWN0aW9uLiBUaGlzIGlzIGRvbmUgdG8gYXZvaWQgZHVwbGljYXRlIElEcyBpbiB0aGUgRE9NLlxuICAgICAqIGJlZm9yZUxvYWQ6IEhvb2sgYmVmb3JlIFNWRyBpcyBsb2FkZWQuIFRoZSBgaW1nYCBlbGVtZW50IGlzIHBhc3NlZCBhcyBhIHBhcmFtZXRlci4gSWYgdGhlIGhvb2sgcmV0dXJuc1xuICAgICAqICAgICBhIHN0cmluZyBpdCBpcyB1c2VkIGFzIHRoZSBVUkwgaW5zdGVhZCBvZiB0aGUgYGltZ2AgZWxlbWVudCdzIGBzcmNgIGF0dHJpYnV0ZS5cbiAgICAgKiBhZnRlckxvYWQ6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGxvYWRlZC4gVGhlIGxvYWRlZCBgc3ZnYCBlbGVtZW50IGFuZCBgc3ZnYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhXG4gICAgICogICAgIHBhcmFtZXRlcnMuIElmIGNhY2hpbmcgaXMgYWN0aXZlIHRoaXMgaG9vayB3aWxsIG9ubHkgZ2V0IGNhbGxlZCBvbmNlIGZvciBpbmplY3RlZCBTVkdzIHdpdGggdGhlXG4gICAgICogICAgIHNhbWUgYWJzb2x1dGUgcGF0aC4gQ2hhbmdlcyB0byB0aGUgYHN2Z2AgZWxlbWVudCBpbiB0aGlzIGhvb2sgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBpbmplY3RlZCBTVkdzXG4gICAgICogICAgIHdpdGggdGhlIHNhbWUgYWJzb2x1dGUgcGF0aC4gSXQncyBhbHNvIHBvc3NpYmxlIHRvIHJldHVybiBhbiBgc3ZnYCBzdHJpbmcgb3IgYHN2Z2AgZWxlbWVudCB3aGljaFxuICAgICAqICAgICB3aWxsIHRoZW4gYmUgdXNlZCBmb3IgdGhlIGluamVjdGlvbi5cbiAgICAgKiBiZWZvcmVJbmplY3Q6IEhvb2sgYmVmb3JlIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuIElmXG4gICAgICogICAgIGFueSBodG1sIGVsZW1lbnQgaXMgcmV0dXJuZWQgaXQgZ2V0cyBpbmplY3RlZCBpbnN0ZWFkIG9mIGFwcGx5aW5nIHRoZSBkZWZhdWx0IFNWRyBpbmplY3Rpb24uXG4gICAgICogYWZ0ZXJJbmplY3Q6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy5cbiAgICAgKiBvbkFsbEZpbmlzaDogSG9vayBhZnRlciBhbGwgYGltZ2AgZWxlbWVudHMgcGFzc2VkIHRvIGFuIFNWR0luamVjdCgpIGNhbGwgaGF2ZSBlaXRoZXIgYmVlbiBpbmplY3RlZCBvclxuICAgICAqICAgICBmYWlsZWQgdG8gaW5qZWN0LlxuICAgICAqIG9uRmFpbDogSG9vayBhZnRlciBpbmplY3Rpb24gZmFpbHMuIFRoZSBgaW1nYCBlbGVtZW50IGFuZCBhIGBzdGF0dXNgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFuIHBhcmFtZXRlci5cbiAgICAgKiAgICAgVGhlIGBzdGF0dXNgIGNhbiBiZSBlaXRoZXIgYCdTVkdfTk9UX1NVUFBPUlRFRCdgICh0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRyksXG4gICAgICogICAgIGAnU1ZHX0lOVkFMSUQnYCAodGhlIFNWRyBpcyBub3QgaW4gYSB2YWxpZCBmb3JtYXQpIG9yIGAnTE9BRF9GQUlMRUQnYCAobG9hZGluZyBvZiB0aGUgU1ZHIGZhaWxlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50IG9yIGFuIGFycmF5IG9mIGltZyBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgd2l0aCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciB0aGlzIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTVkdJbmplY3QoaW1nLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIGFsbEZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvbkFsbEZpbmlzaCA9IG9wdGlvbnMub25BbGxGaW5pc2g7XG4gICAgICAgICAgaWYgKG9uQWxsRmluaXNoKSB7XG4gICAgICAgICAgICBvbkFsbEZpbmlzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW1nICYmIHR5cGVvZiBpbWdbX0xFTkdUSF9dICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgLy8gYW4gYXJyYXkgbGlrZSBzdHJ1Y3R1cmUgb2YgaW1nIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIGluamVjdEluZGV4ID0gMDtcbiAgICAgICAgICB2YXIgaW5qZWN0Q291bnQgPSBpbWdbX0xFTkdUSF9dO1xuXG4gICAgICAgICAgaWYgKGluamVjdENvdW50ID09IDApIHtcbiAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgrK2luamVjdEluZGV4ID09IGluamVjdENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5qZWN0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZ1tpXSwgb3B0aW9ucywgZmluaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb25seSBvbmUgaW1nIGVsZW1lbnRcbiAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZywgb3B0aW9ucywgYWxsRmluaXNoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gcmV0dXJuIGEgUHJvbWlzZSBvYmplY3QgaWYgZ2xvYmFsbHkgYXZhaWxhYmxlXG4gICAgICByZXR1cm4gdHlwZW9mIFByb21pc2UgPT0gX1VOREVGSU5FRF8gPyBydW4oKSA6IG5ldyBQcm9taXNlKHJ1bik7XG4gICAgfVxuXG5cbiAgICAvLyBJbmplY3RzIGEgc2luZ2xlIHN2ZyBlbGVtZW50LiBPcHRpb25zIG11c3QgYmUgYWxyZWFkeSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zLlxuICAgIGZ1bmN0aW9uIFNWR0luamVjdEVsZW1lbnQoaW1nRWxlbSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChpbWdFbGVtKSB7XG4gICAgICAgIHZhciBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSA9IGltZ0VsZW1bX19TVkdJTkpFQ1RdO1xuICAgICAgICBpZiAoIXN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEludm9rZSBiZWZvcmVMb2FkIGhvb2sgaWYgc2V0LiBJZiB0aGUgYmVmb3JlTG9hZCByZXR1cm5zIGEgdmFsdWUgdXNlIGl0IGFzIHRoZSBzcmMgZm9yIHRoZSBsb2FkXG4gICAgICAgICAgLy8gVVJMIHBhdGguIEVsc2UgdXNlIHRoZSBpbWdFbGVtJ3Mgc3JjIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YXIgYmVmb3JlTG9hZCA9IG9wdGlvbnMuYmVmb3JlTG9hZDtcbiAgICAgICAgICB2YXIgc3JjID0gKGJlZm9yZUxvYWQgJiYgYmVmb3JlTG9hZChpbWdFbGVtKSkgfHwgaW1nRWxlbVtfR0VUX0FUVFJJQlVURV9dKCdzcmMnKTtcblxuICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAvLyBJZiBubyBpbWFnZSBzcmMgYXR0cmlidXRlIGlzIHNldCBkbyBubyBpbmplY3Rpb24uIFRoaXMgY2FuIG9ubHkgYmUgcmVhY2hlZCBieSB1c2luZyBqYXZhc2NyaXB0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGlmIG5vIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IHRoZSBvbmxvYWQgYW5kIG9uZXJyb3IgZXZlbnRzIGRvIG5vdCBnZXQgY2FsbGVkXG4gICAgICAgICAgICBpZiAoc3JjID09PSAnJykge1xuICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IGFycmF5IHNvIGxhdGVyIGNhbGxzIGNhbiByZWdpc3RlciBjYWxsYmFja3NcbiAgICAgICAgICB2YXIgb25GaW5pc2hDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IG9uRmluaXNoQ2FsbGJhY2tzO1xuXG4gICAgICAgICAgdmFyIG9uRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihvbkZpbmlzaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYWJzVXJsID0gZ2V0QWJzb2x1dGVVcmwoc3JjKTtcbiAgICAgICAgICB2YXIgdXNlQ2FjaGVPcHRpb24gPSBvcHRpb25zLnVzZUNhY2hlO1xuICAgICAgICAgIHZhciBtYWtlSWRzVW5pcXVlT3B0aW9uID0gb3B0aW9ucy5tYWtlSWRzVW5pcXVlO1xuICAgICAgICAgIFxuICAgICAgICAgIHZhciBzZXRTdmdMb2FkQ2FjaGVWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdLmZvckVhY2goZnVuY3Rpb24oc3ZnTG9hZCkge1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQodmFsKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBzdmdMb2FkID0gc3ZnTG9hZENhY2hlW2Fic1VybF07XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVMb2FkVmFsdWUgPSBmdW5jdGlvbihsb2FkVmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRWYWx1ZSA9PT0gTE9BRF9GQUlMKSB7XG4gICAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9hZFZhbHVlID09PSBTVkdfSU5WQUxJRCkge1xuICAgICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IGxvYWRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnU3RyaW5nID0gbG9hZFZhbHVlWzFdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBsb2FkVmFsdWVbMl07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW07XG5cbiAgICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgaWYgKGhhc1VuaXF1ZUlkcyA9PT0gTlVMTCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJRHMgZm9yIHRoZSBTVkcgc3RyaW5nIGhhdmUgbm90IGJlZW4gbWFkZSB1bmlxdWUgYmVmb3JlLiBUaGlzIG1heSBoYXBwZW4gaWYgcHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5qZWN0aW9uIG9mIGEgY2FjaGVkIFNWRyBoYXZlIGJlZW4gcnVuIHdpdGggdGhlIG9wdGlvbiBtYWtlZElkc1VuaXF1ZSBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzBdID0gaGFzVW5pcXVlSWRzO1xuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMl0gPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNVbmlxdWVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBJRHMgdW5pcXVlIGZvciBhbHJlYWR5IGNhY2hlZCBTVkdzIHdpdGggYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IG1ha2VJZHNVbmlxdWVDYWNoZWQodW5pcXVlSWRzU3ZnU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gc3ZnRWxlbSB8fCBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdmdMb2FkICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgICAgIC8vIFZhbHVlIGZvciB1cmwgZXhpc3RzIGluIGNhY2hlXG4gICAgICAgICAgICAgIGlmIChzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbWUgdXJsIGhhcyBiZWVuIGNhY2hlZCwgYnV0IHZhbHVlIGhhcyBub3QgYmVlbiBsb2FkZWQgeWV0LCBzbyBhZGQgdG8gY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgc3ZnTG9hZC5wdXNoKGhhbmRsZUxvYWRWYWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTG9hZFZhbHVlKHN2Z0xvYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzdmdMb2FkID0gW107XG4gICAgICAgICAgICAgIC8vIHNldCBwcm9wZXJ0eSBpc0NhbGxiYWNrUXVldWUgdG8gQXJyYXkgdG8gZGlmZmVyZW50aWF0ZSBmcm9tIGFycmF5IHdpdGggY2FjaGVkIGxvYWRlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUgPSB0cnVlO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHN2Z0xvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTG9hZCB0aGUgU1ZHIGJlY2F1c2UgaXQgaXMgbm90IGNhY2hlZCBvciBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgICAgbG9hZFN2ZyhhYnNVcmwsIGZ1bmN0aW9uKHN2Z1htbCwgc3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIFhNTCBmcm9tIHRoZSBYSFIgcmVxdWVzdCBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEb2N1bWVudC4gT3RoZXJ3aXNlXG4gICAgICAgICAgICAvLyAoZm9yIGV4YW1wbGUgb2YgSUU5KSwgY3JlYXRlIHRoZSBzdmcgZG9jdW1lbnQgZnJvbSB0aGUgc3ZnIHN0cmluZy5cbiAgICAgICAgICAgIHZhciBzdmdFbGVtID0gc3ZnWG1sIGluc3RhbmNlb2YgRG9jdW1lbnQgPyBzdmdYbWwuZG9jdW1lbnRFbGVtZW50IDogYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBhZnRlckxvYWQgPSBvcHRpb25zLmFmdGVyTG9hZDtcbiAgICAgICAgICAgIGlmIChhZnRlckxvYWQpIHtcbiAgICAgICAgICAgICAgLy8gSW52b2tlIGFmdGVyTG9hZCBob29rIHdoaWNoIG1heSBtb2RpZnkgdGhlIFNWRyBlbGVtZW50LiBBZnRlciBsb2FkIG1heSBhbHNvIHJldHVybiBhIG5ld1xuICAgICAgICAgICAgICAvLyBzdmcgZWxlbWVudCBvciBzdmcgc3RyaW5nXG4gICAgICAgICAgICAgIHZhciBzdmdFbGVtT3JTdmdTdHJpbmcgPSBhZnRlckxvYWQoc3ZnRWxlbSwgc3ZnU3RyaW5nKSB8fCBzdmdFbGVtO1xuICAgICAgICAgICAgICBpZiAoc3ZnRWxlbU9yU3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN2Z0VsZW0gYW5kIHN2Z1N0cmluZyBiZWNhdXNlIG9mIG1vZGlmaWNhdGlvbnMgdG8gdGhlIFNWRyBlbGVtZW50IG9yIFNWRyBzdHJpbmcgaW5cbiAgICAgICAgICAgICAgICAvLyB0aGUgYWZ0ZXJMb2FkIGhvb2ssIHNvIHRoZSBtb2RpZmllZCBTVkcgaXMgYWxzbyB1c2VkIGZvciBhbGwgbGF0ZXIgY2FjaGVkIGluamVjdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2Ygc3ZnRWxlbU9yU3ZnU3RyaW5nID09ICdzdHJpbmcnO1xuICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IGlzU3RyaW5nID8gc3ZnRWxlbU9yU3ZnU3RyaW5nIDogc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBpc1N0cmluZyA/IGJ1aWxkU3ZnRWxlbWVudChzdmdFbGVtT3JTdmdTdHJpbmcsIHRydWUpIDogc3ZnRWxlbU9yU3ZnU3RyaW5nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdmdFbGVtIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gTlVMTDtcbiAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIC8vIHNldCBhbiBhcnJheSB3aXRoIHRocmVlIGVudHJpZXMgdG8gdGhlIGxvYWQgY2FjaGVcbiAgICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShbaGFzVW5pcXVlSWRzLCBzdmdTdHJpbmcsIHVuaXF1ZUlkc1N2Z1N0cmluZ10pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShTVkdfSU5WQUxJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShMT0FEX0ZBSUwpO1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlIGlzIGFuIGFycmF5LiBJbmplY3Rpb24gaXMgbm90IGNvbXBsZXRlIHNvIHJlZ2lzdGVyIGNhbGxiYWNrXG4gICAgICAgICAgICBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBTVkdJbmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBhbiBpbmplY3Rpb24uXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfTtcblxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNWR0luamVjdFxuICAgIFNWR0luamVjdC5jcmVhdGUgPSBjcmVhdGVTVkdJbmplY3Q7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW4gb25lcnJvciBFdmVudCBvZiBhbiBgPGltZz5gIGVsZW1lbnQgdG8gaGFuZGxlIGNhc2VzIHdoZW4gdGhlIGxvYWRpbmcgdGhlIG9yaWdpbmFsIHNyYyBmYWlsc1xuICAgICAqIChmb3IgZXhhbXBsZSBpZiBmaWxlIGlzIG5vdCBmb3VuZCBvciBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRykuIFRoaXMgdHJpZ2dlcnMgYSBjYWxsIHRvIHRoZVxuICAgICAqIG9wdGlvbnMgb25GYWlsIGhvb2sgaWYgYXZhaWxhYmxlLiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB3aWxsIGJlIHNldCBhcyB0aGUgbmV3IHNyYyBhdHRyaWJ1dGVcbiAgICAgKiBmb3IgdGhlIGltZyBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZmFsbGJhY2tTcmNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIGZhbGxiYWNrIHNyY1xuICAgICAqL1xuICAgIFNWR0luamVjdC5lcnIgPSBmdW5jdGlvbihpbWcsIGZhbGxiYWNrU3JjKSB7XG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIGlmIChpbWdbX19TVkdJTkpFQ1RdICE9IEZBSUwpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWcpO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmYWxsYmFja1NyYykge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZmFsbGJhY2tTcmM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93W2dsb2JhbE5hbWVdID0gU1ZHSW5qZWN0O1xuXG4gICAgcmV0dXJuIFNWR0luamVjdDtcbiAgfVxuXG4gIHZhciBTVkdJbmplY3RJbnN0YW5jZSA9IGNyZWF0ZVNWR0luamVjdCgnU1ZHSW5qZWN0Jyk7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTVkdJbmplY3RJbnN0YW5jZTtcbiAgfVxufSkod2luZG93LCBkb2N1bWVudCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBmb250LWZhbWlseTogQXJpYWw7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVEQUF1RDtFQUN2RCwrQkFBK0I7RUFDL0IsNENBQTJFO0VBQzNFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixzQ0FBc0M7RUFDdEMsK0JBQStCO0VBQy9CLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIC8qIGh0dHBzOi8vZm9udHMuZ29vZ2xlLmNvbS9zcGVjaW1lbi9Sb2JvdG8rQ29uZGVuc2VkICovXFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgc3JjOiB1cmwoLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGYpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNuYXZiYXIgPiAuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICoge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogMC4zcmVtO1xufVxuXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcbiAgLyogdmFsdWUgbmVlZHMgdG8gYmUgZXF1YWwgdG8gLm5hdl9idG4gcGFkZGluZyB2YWx1ZSAqL1xuICBtYXJnaW4tdG9wOiAwLjNyZW07XG59XG5cbi8qIG9wdGlvbmFsICovXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTo6YWZ0ZXIsXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpob3Zlcjo6YWZ0ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6ICcnO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMTg3LCA2OSk7XG4gIHotaW5kZXg6IC0xO1xufVxuXG4vKiBvcHRpb25hbCAqL1xuI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6OmFmdGVyIHtcbiAgd2lkdGg6IDAlO1xuICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xuICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbi8qIG9wdGlvbmFsICovXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpob3Zlcjo6YWZ0ZXIge1xuICB3aWR0aDogMTAwJTtcbiAgdHJhbnNmb3JtOiBza2V3WCg4ZGVnKSBzY2FsZVgoMS4wMyk7XG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkgPiBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0IHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAzLCAyMjMpO1xuICBwYWRkaW5nOiAxcmVtO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xufVxuXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQudmlzaWJsZSB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuLm5hdl9pdGVtLFxuLm5hdl9pdGVtOnZpc2l0ZWQge1xuICBjb2xvcjogdmFyKC0tcHJpbWFyeS1mb250LWNvbG9yLCByZ2IoMCwgMCwgMCkpO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5uYXZfaXRlbSA+IHN2Zyxcbi5uYXZfYnRuID4gc3ZnIHtcbiAgd2lkdGg6IGNsYW1wKDJyZW0sIDN2dywgMy41cmVtKTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4ubmF2X2J0biB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XG4gIHBhZGRpbmc6IDAuM3JlbTtcbiAgei1pbmRleDogMTtcbn1cblxuLm5hdl9idG46aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbn1cblxuLm5hdl9idG46aG92ZXIgPiBzdmcge1xuICBmaWx0ZXI6IGludmVydCgxKTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgd2lkdGg6IGluaGVyaXQ7XG4gIH1cblxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpsYXN0LW9mLXR5cGU6YWZ0ZXIsXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTpob3ZlcjphZnRlciB7XG4gICAgY29udGVudDogbm9uZTtcbiAgfVxuXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIsXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAwO1xuICAgIHRvcDogYXV0bztcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICB9XG5cbiAgLyogb3B0aW9uYWwgKi9cbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlciB7XG4gICAgd2lkdGg6IDAlO1xuICAgIGhlaWdodDogMCU7XG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAvKiBvcHRpb25hbCAqL1xuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBoZWlnaHQ6IDEyJTtcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpIHNjYWxlWCgxKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG5cbiAgLm5hdl9idG4ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9uYXZiYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzREFBc0Q7RUFDdEQsa0JBQWtCO0FBQ3BCOztBQUVBLGFBQWE7QUFDYjs7RUFFRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixNQUFNO0VBQ04sT0FBTztFQUNQLG1DQUFtQztFQUNuQyxXQUFXO0FBQ2I7O0FBRUEsYUFBYTtBQUNiO0VBQ0UsU0FBUztFQUNULHNCQUFzQjtFQUN0QixpQ0FBaUM7QUFDbkM7O0FBRUEsYUFBYTtBQUNiO0VBQ0UsV0FBVztFQUNYLG1DQUFtQztFQUNuQyxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFlBQVk7RUFDWixXQUFXO0VBQ1gsb0NBQW9DO0VBQ3BDLGFBQWE7RUFDYiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLHVDQUF1QztBQUN6Qzs7QUFFQTs7RUFFRSw4Q0FBOEM7RUFDOUMscUJBQXFCO0FBQ3ZCOztBQUVBOztFQUVFLCtCQUErQjtFQUMvQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0U7SUFDRSxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QixVQUFVO0lBQ1YseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztFQUNoQjs7RUFFQTs7SUFFRSxhQUFhO0VBQ2Y7O0VBRUE7O0lBRUUsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7SUFDUixZQUFZO0lBQ1osbUJBQW1CO0VBQ3JCOztFQUVBLGFBQWE7RUFDYjtJQUNFLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLGlDQUFpQztFQUNuQzs7RUFFQSxhQUFhO0VBQ2I7SUFDRSxVQUFVO0lBQ1YsV0FBVztJQUNYLGdDQUFnQztJQUNoQyxpQ0FBaUM7RUFDbkM7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjbmF2YmFyID4gLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKiB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAwLjNyZW07XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xcbiAgLyogdmFsdWUgbmVlZHMgdG8gYmUgZXF1YWwgdG8gLm5hdl9idG4gcGFkZGluZyB2YWx1ZSAqL1xcbiAgbWFyZ2luLXRvcDogMC4zcmVtO1xcbn1cXG5cXG4vKiBvcHRpb25hbCAqL1xcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOjphZnRlcixcXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMTg3LCA2OSk7XFxuICB6LWluZGV4OiAtMTtcXG59XFxuXFxuLyogb3B0aW9uYWwgKi9cXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTo6YWZ0ZXIge1xcbiAgd2lkdGg6IDAlO1xcbiAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcXG4gIHRyYW5zaXRpb246IGFsbCA1MDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLyogb3B0aW9uYWwgKi9cXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpob3Zlcjo6YWZ0ZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0cmFuc2Zvcm06IHNrZXdYKDhkZWcpIHNjYWxlWCgxLjAzKTtcXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkgPiBhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAzLCAyMjMpO1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodC52aXNpYmxlIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ubmF2X2l0ZW0sXFxuLm5hdl9pdGVtOnZpc2l0ZWQge1xcbiAgY29sb3I6IHZhcigtLXByaW1hcnktZm9udC1jb2xvciwgcmdiKDAsIDAsIDApKTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuLm5hdl9pdGVtID4gc3ZnLFxcbi5uYXZfYnRuID4gc3ZnIHtcXG4gIHdpZHRoOiBjbGFtcCgycmVtLCAzdncsIDMuNXJlbSk7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi5uYXZfYnRuIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjM1cmVtO1xcbiAgcGFkZGluZzogMC4zcmVtO1xcbiAgei1pbmRleDogMTtcXG59XFxuXFxuLm5hdl9idG46aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG5cXG4ubmF2X2J0bjpob3ZlciA+IHN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCgxKTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiB7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAgIHdpZHRoOiBpbmhlcml0O1xcbiAgfVxcblxcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmFmdGVyLFxcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmhvdmVyOmFmdGVyIHtcXG4gICAgY29udGVudDogbm9uZTtcXG4gIH1cXG5cXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIsXFxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmhvdmVyOjphZnRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB0b3A6IGF1dG87XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICB9XFxuXFxuICAvKiBvcHRpb25hbCAqL1xcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlciB7XFxuICAgIHdpZHRoOiAwJTtcXG4gICAgaGVpZ2h0OiAwJTtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgfVxcblxcbiAgLyogb3B0aW9uYWwgKi9cXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcXG4gICAgd2lkdGg6IDYwJTtcXG4gICAgaGVpZ2h0OiAxMiU7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMGRlZykgc2NhbGVYKDEpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICB9XFxuXFxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaTpmaXJzdC1vZi10eXBlIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIC5uYXZfYnRuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmF2YmFyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmF2YmFyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0ICcuL2FwcC5jc3MnO1xuaW1wb3J0ICdAaWNvbmZ1L3N2Zy1pbmplY3QnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGhlYWRlckJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXInO1xuaW1wb3J0IG1haW5CdWlsZGVyIGZyb20gJy4vY29tcG9uZW50cy9tYWluL21haW4nO1xuaW1wb3J0ICcuL2NvbnRhaW5lcnMvYXBpX2NvbnRyb2xsZXInO1xuXG4oKCkgPT4ge1xuICBjb25zdCBidWlsZCA9IHtcbiAgICBoZWFkZXI6IGhlYWRlckJ1aWxkZXIsXG4gICAgbWFpbjogbWFpbkJ1aWxkZXIsXG4gIH07XG5cbiAgY29uc3QgYXBwID0ge1xuICAgIGluaXQoKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwLmluaXQoKSBydW5uaW5nJyk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgYXBwV3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgYXBwQ29udGVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYXBwV3JhcHBlci5pZCA9ICd3ZWF0aGVyX2FwcCc7XG4gICAgICBhcHBDb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuXG4gICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkLmhlYWRlcigpKTtcbiAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQubWFpbigpKTtcbiAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwQ29udGVudCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwV3JhcHBlcik7XG4gICAgfSxcbiAgfTtcblxuICBhcHAuaW5pdCgpO1xufSkoKTtcblxuLy8gZ2V0RGF0YSgnbG9uZG9uJyk7XG5cbi8vIHVzZSBXZWF0aGVyQVBJXG4vLyBodHRwczovL3d3dy53ZWF0aGVyYXBpLmNvbS9kb2NzL1xuXG4vLyB0aGluZ3MgdG8gZG86XG4vLyBZb3Ugc2hvdWxkIGJlIGFibGUgdG8gc2VhcmNoIGZvciBhIHNwZWNpZmljIGxvY2F0aW9uXG4vLyB0b2dnbGUgZGlzcGxheWluZyB0aGUgZGF0YSBpbiBGYWhyZW5oZWl0IG9yIENlbHNpdXMuXG4vLyBZb3Ugc2hvdWxkIGNoYW5nZSB0aGUgbG9vayBvZiB0aGUgcGFnZSBiYXNlZCBvbiB0aGUgZGF0YSwgbWF5YmUgYnkgY2hhbmdpbmcgdGhlIGNvbG9yIG9mIHRoZSBiYWNrZ3JvdW5kIG9yIGJ5IGFkZGluZyBpbWFnZXMgdGhhdCBkZXNjcmliZSB0aGUgd2VhdGhlclxuXG4vLyBpbnB1dHM6XG4vLyAxLiBjaXR5IG9yIHBvc3RhbCBjb2Rlc1xuXG4vLyBkZXNpZ246XG4vLyBhZGQgYSDigJhsb2FkaW5n4oCZIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGZyb20gdGhlIHRpbWUgdGhlIGZvcm0gaXMgc3VibWl0dGVkIHVudGlsIHRoZSBpbmZvcm1hdGlvbiBjb21lcyBiYWNrIGZyb20gdGhlIEFQSS5cbi8vIDMgZGF5IGZvcmVjYXN0XG4vLyBob3VybHkgYW5kIGRhaWx5IGZvcmVjYXN0XG5cbi8vIGxheW91dDpcbi8vIDxhcHA+XG4vLyAgICA8aGVhZGVyPiAobmF2aWdhdGlvbilcbi8vICAgIDxjb250ZW50PlxuLy8gICAgICA8aGVhZGluZz5cbi8vICAgICAgPGlucHV0PiAod2l0aCBDL0YgdG9nZ2xlIGJ1dHRvbilcbi8vICAgICAgPG91dHB1dD5cbi8vICAgICAgICA8dG9kYXk+IChnZXQgY3VycmVudCBkYXRlKVxuLy8gICAgICAgIDxob3VybHk+IChnZXQgdXNlcidzIGN1cnJlbnQgdGltZSlcbi8vICAgICAgICAgIHRpbWUgfCBjb25kaXRpb25zIHwgdGVtcCB8IGZlZWxzIGxpa2UgfCBwcmVjaXAgY2hhbmNlICUgfCBwcmVjaXAgYW1vdW50ICUgfCBjbG91ZCBjb3ZlciAlIHwgZGV3IHBvaW50IHwgaHVtaWRpdHkgJSB8IHdpbmQgc3BlZWQgQU5EIGRpcmVjdGlvblxuLy8gICAgICAgIDwzLWRheT4gKDMtZGF5IGZvcmVjYXN0KVxuLy8gICAgPGZvb3Rlcj5cbiIsInZhciBtYXAgPSB7XG5cdFwiLi9jaGFuY2Vfb2ZfcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hhbmNlX29mX3JhaW4uc3ZnXCIsXG5cdFwiLi9odW1pZGl0eS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaHVtaWRpdHkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vbWlubWF4dGVtcC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWlubWF4dGVtcC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9wcmVzc3VyZS5zdmdcIixcblx0XCIuL3Byb2dyZXNzX2FjdGl2aXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9wcm9ncmVzc19hY3Rpdml0eS5zdmdcIixcblx0XCIuL3NoYXJwX2hvbWUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3NoYXJwX2hvbWUuc3ZnXCIsXG5cdFwiLi91di5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvdXYuc3ZnXCIsXG5cdFwiLi92aXNpYmlsaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy92aXNpYmlsaXR5LnN2Z1wiLFxuXHRcIi4vd2luZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvd2luZC5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcblxuY29uc3QgZXJyb3JCdWlsZGVyID0ge1xuICBpbml0KHdlYXRoZXJFcnJvcikge1xuICAgIHRoaXMuc2V0RXJyb3Iod2VhdGhlckVycm9yKTtcbiAgfSxcbiAgc2V0RXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmVycm9yID0gZXJyb3IuZXJyb3I7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBgRXJyb3IgY29kZTogJHtlcnJvci5zdGF0dXN9XG4gICAgJHtlcnJvci5lcnJvci5tZXNzYWdlfWA7XG4gIH0sXG4gIGNhY2hlRE9NKCkge30sXG4gIGJpbmRFdmVudHMoKSB7fSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGVycm9yU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCBlcnJvckhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGVycm9yU2VjdGlvbi5pZCA9ICdlcnJvcic7XG4gICAgZXJyb3JIZWFkaW5nLnNldEF0dHJpYnV0ZXMoeyB0ZXh0Q29udGVudDogdGhpcy5lcnJvck1lc3NhZ2UgfSk7XG5cbiAgICBlcnJvclNlY3Rpb24uYXBwZW5kQ2hpbGQoZXJyb3JIZWFkaW5nKTtcbiAgICByZXR1cm4gZXJyb3JTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXJyb3JIZWFkZXIod2VhdGhlckVycm9yKSB7XG4gIGVycm9yQnVpbGRlci5pbml0KHdlYXRoZXJFcnJvcik7XG4gIHJldHVybiBlcnJvckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBlbGVtZW50OiAnaDEnLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGlkOiAnaGVybycsXG4gICAgICB0ZXh0Q29udGVudDogJ3dlYXRoZXIgYXBwJyxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgZWxlbWVudDogJ2Zvcm0nLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGlkOiAnZm9ybScsXG4gICAgfSxcbiAgICBpbnB1dHM6IFtcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGlkOiAnbG9jYXRpb24nLFxuICAgICAgICAgIGNsYXNzOiAnZm9ybV9pbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ2xvY2F0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc2VhcmNoJyxcbiAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGNpdHkgb3IgcG9zdGFsIGNvZGUnLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogJ0VudGVyIGEgdmFsaWQgY2l0eSBvciBwb3N0YWwgY29kZScsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL2hlYWRlci5jb25maWcnO1xuaW1wb3J0IGJ1aWxkTmF2YmFyIGZyb20gJy4uL25hdmJhci9uYXZiYXInO1xuXG5jb25zdCBoZWFkZXJCdWlsZGVyID0ge1xuICBjYWNoZURPTShoZWFkZXJFbGVtZW50KSB7XG4gICAgdGhpcy5oZWFkZXIgPSBoZWFkZXJFbGVtZW50O1xuICAgIHRoaXMuZm9ybSA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgICB0aGlzLmlucHV0U2VhcmNoID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24nKTtcbiAgICB0aGlzLmlucHV0RXJyb3JzID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmFsaWRpdHlfZXJyb3InKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBoZWFkZXJFbGVtZW50LmlkID0gJ2hlYWRlcic7XG4gICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChidWlsZE5hdmJhci5yZW5kZXIoKSk7XG5cbiAgICBPYmplY3Qua2V5cyhoZWFkZXIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgaGVhZGVySXRlbSA9IGNyZWF0ZUVsZW1lbnQoaGVhZGVyW2tleV0uZWxlbWVudCk7XG4gICAgICBoZWFkZXJJdGVtLnNldEF0dHJpYnV0ZXMoaGVhZGVyW2tleV0uYXR0cmlidXRlcyk7XG5cbiAgICAgIGlmIChoZWFkZXJba2V5XS5pbnB1dHMpIHtcbiAgICAgICAgaGVhZGVyW2tleV0uaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybUl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjb25zdCBpbnB1dExhYmVsID0gY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICBjb25zdCBmb3JtSW5wdXQgPSBjcmVhdGVFbGVtZW50KGlucHV0LmVsZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IGlucHV0RXJyb3IgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICBpbnB1dEVycm9yLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgY2xhc3M6IGB2YWxpZGl0eV9lcnJvciAke2lucHV0LmF0dHJpYnV0ZXMuaWR9YCxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBpbnB1dC5lcnJvcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtSW5wdXQuc2V0QXR0cmlidXRlcyhpbnB1dC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICBpbnB1dExhYmVsLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgZm9yOiBpbnB1dC5hdHRyaWJ1dGVzLmlkLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGlucHV0LmF0dHJpYnV0ZXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybUl0ZW0uc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnZm9ybV9pdGVtJyB9KTtcblxuICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0TGFiZWwpO1xuICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGZvcm1JbnB1dCk7XG4gICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaW5wdXRFcnJvcik7XG4gICAgICAgICAgaGVhZGVySXRlbS5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBoZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckl0ZW0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURPTShoZWFkZXJFbGVtZW50KTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gaGVhZGVyRWxlbWVudDtcbiAgfSxcbiAgc3VibWl0Rm9ybShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaW5wdXRTZWFyY2gudmFsdWUpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdnZXRXZWF0aGVyJywgdGhpcy5pbnB1dFNlYXJjaC52YWx1ZSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcigpIHtcbiAgcmV0dXJuIGhlYWRlckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuXG5jb25zdCBob21lQnVpbGRlciA9IHtcbiAgY2FjaGVET00oKSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlRE9NKCkgcnVubmluZyBmcm9tIGhvbWUuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBob21lLmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob21lU2VjdGlvbi5pZCA9ICdob21lJztcbiAgICBjb25zdCBob21lSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaG9tZUhlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiAnSE9NRScgfSk7XG5cbiAgICBob21lU2VjdGlvbi5hcHBlbmRDaGlsZChob21lSGVhZGluZyk7XG5cbiAgICByZXR1cm4gaG9tZVNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhvbWUoKSB7XG4gIHJldHVybiBob21lQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5cbmNvbnN0IGxvYWRpbmdCdWlsZGVyID0ge1xuICBjYWNoZURPTSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGVET00oKSBydW5uaW5nIGZyb20gbG9hZGluZy5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIGxvYWRpbmcuanMnKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGxvYWRpbmdTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGxvYWRpbmdTZWN0aW9uLmlkID0gJ2xvYWRpbmcnO1xuICAgIGNvbnN0IGxvYWRpbmdIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBsb2FkaW5nSGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6ICdMT0FESU5HLi4uJyB9KTtcblxuICAgIGxvYWRpbmdTZWN0aW9uLmFwcGVuZENoaWxkKGxvYWRpbmdIZWFkaW5nKTtcblxuICAgIHJldHVybiBsb2FkaW5nU2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG9tZSgpIHtcbiAgcmV0dXJuIGxvYWRpbmdCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YlN1Yic7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGhvbWVCdWlsZGVyIGZyb20gJy4uL2hvbWUvaG9tZSc7XG5pbXBvcnQgZXJyb3JCdWlsZGVyIGZyb20gJy4uL2Vycm9yL2Vycm9yJztcbmltcG9ydCB0YWJzQnVpbGRlciBmcm9tICcuLi90YWJzL3RhYnMnO1xuaW1wb3J0IGxvYWRpbmdCdWlsZGVyIGZyb20gJy4uL2xvYWRpbmcvbG9hZGluZyc7XG5cbmNvbnN0IGJ1aWxkID0ge1xuICBob21lOiBob21lQnVpbGRlcixcbiAgZXJyb3I6IGVycm9yQnVpbGRlcixcbiAgdGFiczogdGFic0J1aWxkZXIsXG4gIGxvYWRpbmc6IGxvYWRpbmdCdWlsZGVyLFxufTtcblxuY29uc3QgbWFpbkJ1aWxkZXIgPSB7XG4gIGFjdGl2ZUNvbnRlbnQ6IG51bGwsXG4gIGFjdGl2ZVRhYjogbnVsbCxcbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZygnaW5pdCgpIG1ldGhpZCBydW5uaW5nIGZyb20gbWFpbi5qcycpO1xuICB9LFxuICBjYWNoZURPTShtYWluRWxlbWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gICAgdGhpcy5tYWluID0gbWFpbkVsZW1lbnQ7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gbWFpbi5qcycpO1xuICAgIHRoaXMuc3dpdGNoQ29udGVudCA9IHRoaXMuc3dpdGNoQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3N3aXRjaENvbnRlbnQnLCB0aGlzLnN3aXRjaENvbnRlbnQpO1xuICB9LFxuICByZW5kZXIoa2V5LCBkYXRhLCB0YWJLZXkpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcblxuICAgIGxldCBjb250ZW50O1xuICAgIGlmICgha2V5KSB7XG4gICAgICAvLyBpbml0aWFsIG9ubG9hZFxuICAgICAgY29udGVudCA9IGJ1aWxkLmhvbWUoKTtcbiAgICAgIC8vIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW5kZXIgdG9kYXlcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKGRhdGEsIHRhYktleSk7XG4gICAgICB0aGlzLm1haW4ubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIHN3aXRjaENvbnRlbnQoZSwgdGFiS2V5KSB7XG4gICAgbGV0IHJlbmRlcktleTtcbiAgICBjb25zb2xlLmxvZygnc3dpdGNoQ29udGVudCgpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgaWYgKGUuZXJyb3IpIHtcbiAgICAgIHJlbmRlcktleSA9ICdlcnJvcic7XG4gICAgfSBlbHNlIGlmIChlID09PSAnbG9hZGluZycpIHtcbiAgICAgIHJlbmRlcktleSA9ICdsb2FkaW5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ2ZldGNoIHN1Y2Nlc3MnKTtcbiAgICAgIHJlbmRlcktleSA9ICd0YWJzJztcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIocmVuZGVyS2V5LCBlLCB0YWJLZXkpO1xuICB9LFxuICBzZXRBY3RpdmVUYWIodGFiKSB7XG4gICAgY29uc29sZS5sb2coJ3NldEFjdGl2ZVRhYigpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gIC8vIHJldHVybiBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgbWFpbi5pZCA9ICdtYWluX2NvbnRlbnQnO1xuICBtYWluQnVpbGRlci5jYWNoZURPTShtYWluKTtcbiAgbWFpbkJ1aWxkZXIuYmluZEV2ZW50cygpO1xuICBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgcmV0dXJuIG1haW47XG59XG4iLCJpbXBvcnQgSWxsdXN0cmF0aW9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pbGx1c3RyYXRpb25zL3VuZHJhd193ZWF0aGVyX2FwcC5zdmcnO1xuaW1wb3J0IEljb25NZW51IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9tZW51LnN2Zyc7XG5pbXBvcnQgSWNvbkdpdGh1YiBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvZ2l0aHViX21hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYXZMZWZ0OiBbXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0gbmF2X2xvZ28nLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBzcmM6IElsbHVzdHJhdGlvbixcbiAgICAgICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICB0ZXh0Q29udGVudDogJ1dlYXRoZXIgQXBwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICBuYXZSaWdodDogW1xuICAgIHtcbiAgICAgIGVsZW1lbnQ6ICdhJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgICAgdGV4dENvbnRlbnQ6ICdQbGFjZWhvbGRlcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0nLFxuICAgICAgICB0ZXh0Q29udGVudDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBlbGVtZW50OiAnYScsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vbWlrZXlDb3MvdGhlT2RpblByb2plY3QvdHJlZS9tYWluL2phdmFTY3JpcHQvcHJvamVjdHMvd2VhdGhlci1hcHAnLFxuICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgc3JjOiBJY29uR2l0aHViLFxuICAgICAgICAgICAgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICBtZW51QnV0dG9uOiB7XG4gICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICduYXZfYnRuJyxcbiAgICB9LFxuICAgIGNoaWxkOiB7XG4gICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgc3JjOiBJY29uTWVudSxcbiAgICAgICAgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgJy4uLy4uL3N0eWxlcy9uYXZiYXIuY3NzJztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXIuY29uZmlnJztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FjaGVET00obmF2RWxlbWVudCkge1xuICAgIHRoaXMubmF2YmFyID0gbmF2RWxlbWVudDtcbiAgICB0aGlzLm5hdlJpZ2h0ID0gbmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X3JpZ2h0Jyk7XG4gICAgdGhpcy5uYXZMaW5rcyA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdl9pdGVtJyk7XG4gICAgdGhpcy5uYXZCdG4gPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfYnRuJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy50b2dnbGVOYXYgPSB0aGlzLnRvZ2dsZU5hdi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVOYXYpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIGNvbnN0IG5hdkNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5hdkVsZW1lbnQuaWQgPSAnbmF2YmFyJztcbiAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICBPYmplY3Qua2V5cyhuYXZiYXIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmF2YmFyW2tleV0pKSB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoa2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2xlZnQnKSA/ICduYXZfbGVmdCcgOiAnbmF2X3JpZ2h0Jyk7XG4gICAgICAgIG5hdmJhcltrZXldLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZXMoaXRlbS5hdHRyaWJ1dGVzKTtcblxuICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IGNyZWF0ZUVsZW1lbnQoY2hpbGQuZWxlbWVudCk7XG4gICAgICAgICAgICAgIGNoaWxkTm9kZS5zZXRBdHRyaWJ1dGVzKGNoaWxkLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5hdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQobmF2YmFyW2tleV0uZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGNyZWF0ZUVsZW1lbnQobmF2YmFyW2tleV0uY2hpbGQuZWxlbWVudCk7XG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGVzKG5hdmJhcltrZXldLmF0dHJpYnV0ZXMpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlcyhuYXZiYXJba2V5XS5jaGlsZC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIG5hdkNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZDb250YWluZXIpO1xuICAgIHRoaXMuY2FjaGVET00obmF2RWxlbWVudCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gbmF2RWxlbWVudDtcbiAgfSxcbiAgdG9nZ2xlTmF2KCkge1xuICAgIGlmICh0aGlzLm5hdlJpZ2h0LmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XG4gICAgICB0aGlzLm5hdlJpZ2h0LmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZSaWdodC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgfVxuICB9LFxufTtcbiIsIi8vIGZvcmVjYXN0ZGF5LmRhdGUgfFxuLy8gKGZvcmVjYXN0ZGF5LmRheS5tYXh0ZW1wX2Zcbi8vIGZvcmVjYXN0ZGF5LmRheS5taW50ZW1wX2YpXG4vLyBmb3JlY2FzdGRheS5kYXkuY29uZGl0aW9uXG4vLyBmb3JlY2FzdGRheS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW4gfFxuLy8gd2luZFxuLy8gTlcsIE5OVywgTiwgTk5FLCBORVxuLy8gRU5FLCBFLCBFU0Vcbi8vIFNFLCBTU0UsIFMsIFNTVywgU1dcbi8vIFdTVywgVywgV05XXG5pbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgZm9ybWF0RGF0ZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdERhdGUnO1xuXG4vLyBjb25zdCBpY29ucyA9IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uLy4uLy4uL2Fzc2V0cy9pY29ucycsIGZhbHNlLCAvXFwuc3ZnJC8pKTtcbmNvbnN0IHVuaXRTeXN0ZW1zID0ge1xuICBpY29uczogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vLi4vLi4vYXNzZXRzL2ljb25zJywgZmFsc2UsIC9cXC5zdmckLykpLFxuICBtZXRyaWM6IHtcbiAgICB0ZW1wOiAnYycsXG4gICAgc3BlZWQ6ICdrcGgnLFxuICAgIHByZWNpcGl0YXRpb246ICdtbScsXG4gICAgcHJlc3N1cmU6ICdtYicsXG4gICAgZGlzdGFuY2U6ICdrbScsXG4gIH0sXG4gIGltcGVyaWFsOiB7XG4gICAgdGVtcDogJ2YnLFxuICAgIHNwZWVkOiAnbXBoJyxcbiAgICBwcmVjaXBpdGF0aW9uOiAnaW4nLFxuICAgIHByZXNzdXJlOiAnaW4nLFxuICAgIGRpc3RhbmNlOiAnbWlsZXMnLFxuICB9LFxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMudW5pdFN5c3RlbVtrZXldO1xuICB9LFxuICBzZXRJY29uKGtleSkge1xuICAgIHJldHVybiB0aGlzLmljb25zLmZpbGVzW09iamVjdC5rZXlzKHRoaXMuaWNvbnMuZmlsZXMpLmZpbmQoKGljb25LZXkpID0+IGljb25LZXkuaW5jbHVkZXMoa2V5KSldO1xuICB9LFxuICByb3VuZFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUpO1xuICB9LFxuICBzZXRWYWx1ZShvYmosIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlKG9ialtgJHthcmdzWzBdfSR7dGhpcy5nZXQoYXJnc1sxXSl9YF0pO1xuICB9LFxufTtcblxuY29uc3QgZGF0YSA9IChzdGF0ZSkgPT4gW1xuICB7XG4gICAga2V5OiAnbmFtZScsXG4gICAgdmFsdWU6IHN0YXRlLmRhdGUsXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHtmb3JtYXREYXRlKHRoaXMudmFsdWUpfWA7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGtleTogJ21pbm1heHRlbXAnLFxuICAgIG1pbjoge1xuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnbWludGVtcF8nLCAndGVtcCcpLFxuICAgICAgbGFiZWw6ICdsb3cnLFxuICAgIH0sXG4gICAgbWF4OiB7XG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdtYXh0ZW1wXycsICd0ZW1wJyksXG4gICAgICBsYWJlbDogJ2hpZ2gnLFxuICAgIH0sXG4gICAgdW5pdDogJ8KwJyxcbiAgICBsYWJlbDogYGhpZ2ggLyBsb3dgLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5tYXgudmFsdWV9JHt0aGlzLnVuaXR9IC8gJHt0aGlzLm1pbi52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdjb25kaXRpb24nLFxuICAgIGxhYmVsOiBzdGF0ZS5jb25kaXRpb24udGV4dCxcbiAgICBpY29uOiBzdGF0ZS5jb25kaXRpb24uaWNvbixcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMubGFiZWx9YDtcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAncHJlY2lwJyxcbiAgICB2YWx1ZTogc3RhdGUuZGFpbHlfY2hhbmNlX29mX3JhaW4sXG4gICAgdW5pdDogJyUnLFxuICAgIGljb246IHN0YXRlLnNldEljb24oJ3JhaW4nKSxcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICB9LFxuICB9LFxuXTtcblxuY29uc3QgbG9jYXRpb24gPSAoc3RhdGUpID0+ICh7XG4gIGxvY2F0aW9uOiB7XG4gICAgY291bnRyeTogc3RhdGUuY291bnRyeSxcbiAgICBsb2NhbHRpbWU6IHN0YXRlLmxvY2FsdGltZSxcbiAgICBuYW1lOiBzdGF0ZS5uYW1lLFxuICAgIHJlZ2lvbjogc3RhdGUucmVnaW9uLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSwgJHtcbiAgICAgICAgdGhpcy5yZWdpb24ubGVuZ3RoID09PSAwIHx8IHRoaXMucmVnaW9uID09PSB0aGlzLm5hbWUgPyB0aGlzLmNvdW50cnkgOiB0aGlzLnJlZ2lvblxuICAgICAgfWA7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBmb3JlY2FzdENvbnRyb2xsZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0pIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgdGhpcy51bml0U3lzdGVtID0gdW5pdFN5c3RlbTtcbiAgICB0aGlzLnNldERheSA9IHRoaXMuc2V0RGF5LmJpbmQodGhpcyk7XG4gICAgY29uc3QgZm9yZWNhc3RkYXkgPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAodGhpcy5zZXREYXkpO1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4ud2VhdGhlckRhdGEubG9jYXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5sb2NhdGlvbihzdGF0ZSksXG4gICAgICBmb3JlY2FzdGRheSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZSh3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxuICBzZXREYXkob2JqKSB7XG4gICAgY29uc3QgZGF5cyA9IG9iajtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgIGljb25zOiB1bml0U3lzdGVtcy5pY29ucyxcbiAgICAgIGdldDogdW5pdFN5c3RlbXMuZ2V0LFxuICAgICAgc2V0SWNvbjogdW5pdFN5c3RlbXMuc2V0SWNvbixcbiAgICAgIHNldFZhbHVlOiB1bml0U3lzdGVtcy5zZXRWYWx1ZSxcbiAgICAgIHJvdW5kVmFsdWU6IHVuaXRTeXN0ZW1zLnJvdW5kVmFsdWUsXG4gICAgICB1bml0U3lzdGVtOiB1bml0U3lzdGVtc1t0aGlzLnVuaXRTeXN0ZW1dLFxuICAgICAgLi4ub2JqLmRheSxcbiAgICAgIC4uLm9iaixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgLi4uZGF0YShzdGF0ZSkgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSwgdW5pdFN5c3RlbSwgdGltZVN0YW1wKSB7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKGZvcmVjYXN0Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhLCB1bml0U3lzdGVtKSk7XG4gIH0sXG4gIHNldFByb3BlcnRpZXMob2JqKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmopO1xuICB9LFxufTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgZm9yZWNhc3QgZnJvbSAnLi9mb3JlY2FzdC5jb25maWcnO1xuaW1wb3J0IGNyZWF0ZUNvbnRlbnRSb3dzIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlQ29udGVudFJvd3MnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcblxuY29uc3QgZm9yZWNhc3RCdWlsZGVyID0ge1xuICBpbml0KCkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBmb3JlY2FzdC5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIGZvcmVjYXN0LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIGZvcmVjYXN0LmpzJyk7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3QpO1xuICAgIGNvbnN0IGZvcmVjYXN0U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCBmb3JlY2FzdFNlY3Rpb25IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBjb25zdCBmb3JlY2FzdExvY2F0aW9uID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGltZVN0YW1wID0gY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgZm9yZWNhc3RTZWN0aW9uLmlkID0gJ2ZvcmVjYXN0JztcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nLnRleHRDb250ZW50ID0gJzMgRGF5IFdlYXRoZXInO1xuICAgIGZvcmVjYXN0TG9jYXRpb24udGV4dENvbnRlbnQgPSBgIC0gJHtmb3JlY2FzdC5sb2NhdGlvbi5zZXRUZXh0KCl9YDtcbiAgICBmb3JlY2FzdFRpbWVTdGFtcC50ZXh0Q29udGVudCA9IGBBcyBvZiAke2ZvcmVjYXN0Lmxhc3RfdXBkYXRlZH1gO1xuXG4gICAgZm9yZWNhc3RTZWN0aW9uSGVhZGluZy5hcHBlbmRDaGlsZChmb3JlY2FzdExvY2F0aW9uKTtcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RTZWN0aW9uSGVhZGluZyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uSGVhZGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGltZVN0YW1wKTtcbiAgICBmb3JlY2FzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9yZWNhc3RTZWN0aW9uSGVhZGVyKTtcblxuICAgIC8vIHRlbXBvcmFyeVxuICAgIGNvbnN0IGZvcmVjYXN0RGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBmb3JlY2FzdERldGFpbHMuaWQgPSAnZm9yZWNhc3RfZGV0YWlscyc7XG5cbiAgICBmb3JlY2FzdC5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICAgIE9iamVjdC52YWx1ZXMoZGF5KS5mb3JFYWNoKChkZXRhaWwpID0+IHtcbiAgICAgICAgZm9yZWNhc3REZXRhaWxzLmFwcGVuZChcbiAgICAgICAgICBjcmVhdGVDb250ZW50Um93cyhjcmVhdGVFbGVtZW50LCBudWxsLCBkZXRhaWwuaWNvbiwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyB0ZW1wb3JhcnlcbiAgICBmb3JlY2FzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9yZWNhc3REZXRhaWxzKTtcbiAgICByZXR1cm4gZm9yZWNhc3RTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JlY2FzdCh3ZWF0aGVyRGF0YSwgdGltZVN0YW1wKSB7XG4gIGZvcmVjYXN0LmluaXQod2VhdGhlckRhdGEsICdpbXBlcmlhbCcsIHRpbWVTdGFtcCk7XG4gIHJldHVybiBmb3JlY2FzdEJ1aWxkZXIucmVuZGVyKCk7XG59XG5cbi8vIGRhdGUgfCB0ZW1wIGhpZ2ggLyBsb3cgfCBjb25kaXRpb24gfCBwcmVjaXB0YXRpb24gJSB8IHdpbmRcbi8vIGV4YW1wbGVcbi8vIFdlZCAyMCB8IDYwwrAgLyA0N8KwIHwgU3VubnkgfCAxJSB8IE5ORSA2IG1waFxuIiwiLy8gY3VycmVudC5sYXN0X3VwZGF0ZWRcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIudGltZVxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci50ZW1wX2Zcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIuY29uZGl0aW9uLnRleHRcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIuY2hhbmNlX29mX3JhaW5cbi8vIChmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLndpbmRfZGlyXG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLndpbmRfbXBoKVxuXG5pbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5cbmNvbnN0IHVuaXRTeXN0ZW1zID0ge1xuICBpY29uczogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vLi4vLi4vYXNzZXRzL2ljb25zJywgZmFsc2UsIC9cXC5zdmckLykpLFxuICBtZXRyaWM6IHtcbiAgICB0ZW1wOiAnYycsXG4gICAgc3BlZWQ6ICdrcGgnLFxuICAgIHByZWNpcGl0YXRpb246ICdtbScsXG4gICAgcHJlc3N1cmU6ICdtYicsXG4gICAgZGlzdGFuY2U6ICdrbScsXG4gIH0sXG4gIGltcGVyaWFsOiB7XG4gICAgdGVtcDogJ2YnLFxuICAgIHNwZWVkOiAnbXBoJyxcbiAgICBwcmVjaXBpdGF0aW9uOiAnaW4nLFxuICAgIHByZXNzdXJlOiAnaW4nLFxuICAgIGRpc3RhbmNlOiAnbWlsZXMnLFxuICB9LFxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMudW5pdFN5c3RlbVtrZXldO1xuICB9LFxuICBzZXRJY29uKGtleSkge1xuICAgIHJldHVybiB0aGlzLmljb25zLmZpbGVzW09iamVjdC5rZXlzKHRoaXMuaWNvbnMuZmlsZXMpLmZpbmQoKGljb25LZXkpID0+IGljb25LZXkuaW5jbHVkZXMoa2V5KSldO1xuICB9LFxuICByb3VuZFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUpO1xuICB9LFxuICBzZXRWYWx1ZShvYmosIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlKG9ialtgJHthcmdzWzBdfSR7dGhpcy5nZXQoYXJnc1sxXSl9YF0pO1xuICB9LFxufTtcblxuY29uc3QgZGF0YSA9IChzdGF0ZSkgPT4gW1xuICB7XG4gICAgbmFtZTogJ3RpbWUnLFxuICAgIHZhbHVlOiBzdGF0ZS50aW1lLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7Zm9ybWF0VGltZSh0aGlzLnZhbHVlKX1gO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndGVtcCcsXG4gICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndGVtcF8nLCAndGVtcCcpLFxuICAgIHVuaXQ6ICfCsCcsXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdjb25kaXRpb24nLFxuICAgIGxhYmVsOiBzdGF0ZS5jb25kaXRpb24udGV4dCxcbiAgICBpY29uOiBzdGF0ZS5jb25kaXRpb24uaWNvbixcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMubGFiZWx9YDtcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogJ3ByZWNpcCcsXG4gICAgdmFsdWU6IHN0YXRlLmNoYW5jZV9vZl9yYWluLFxuICAgIHVuaXQ6ICclJyxcbiAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdyYWluJyksXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICd3aW5kJyxcbiAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd3aW5kXycsICdzcGVlZCcpLFxuICAgIHVuaXQ6IHN0YXRlLmdldCgnc3BlZWQnKSxcbiAgICBsYWJlbDogJ3dpbmQnLFxuICAgIGljb246IHN0YXRlLnNldEljb24oJ3dpbmQnKSxcbiAgICBkaXI6IHtcbiAgICAgIHZhbHVlOiBzdGF0ZS53aW5kX2RpcixcbiAgICB9LFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5kaXIudmFsdWV9ICR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICB9LFxuICB9LFxuXTtcblxuY29uc3QgZGF0ZSA9IChzdGF0ZSkgPT4gKHtcbiAgZGF0ZTogc3RhdGUuZGF0ZSxcbn0pO1xuXG5jb25zdCBsb2NhdGlvbiA9IChzdGF0ZSkgPT4gKHtcbiAgbG9jYXRpb246IHtcbiAgICBjb3VudHJ5OiBzdGF0ZS5jb3VudHJ5LFxuICAgIGxvY2FsdGltZTogc3RhdGUubG9jYWx0aW1lLFxuICAgIG5hbWU6IHN0YXRlLm5hbWUsXG4gICAgcmVnaW9uOiBzdGF0ZS5yZWdpb24sXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LCAke1xuICAgICAgICB0aGlzLnJlZ2lvbi5sZW5ndGggPT09IDAgfHwgdGhpcy5yZWdpb24gPT09IHRoaXMubmFtZSA/IHRoaXMuY291bnRyeSA6IHRoaXMucmVnaW9uXG4gICAgICB9YDtcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IGhvdXJseUNvbnRyb2xsZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0pIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgdGhpcy51bml0U3lzdGVtID0gdW5pdFN5c3RlbTtcbiAgICB0aGlzLnNldEFycmF5ID0gdGhpcy5zZXRBcnJheS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0SG91cnMgPSB0aGlzLnNldEhvdXJzLmJpbmQodGhpcyk7XG4gICAgY29uc3QgZm9yZWNhc3RkYXkgPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAodGhpcy5zZXRBcnJheSk7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3RkYXkpO1xuXG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAuLi53ZWF0aGVyRGF0YSxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmxvY2F0aW9uLFxuICAgIH07XG4gICAgY29uc29sZS5sb2coc3RhdGUpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5sb2NhdGlvbihzdGF0ZSksXG4gICAgICBmb3JlY2FzdGRheSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZShzdGF0ZS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxuICBzZXRBcnJheShvYmopIHtcbiAgICBjb25zdCBob3VycyA9IG9iai5ob3VyLnJlZHVjZSh0aGlzLnNldEhvdXJzLCBbXSk7XG4gICAgY29uc29sZS5sb2coaG91cnMpO1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4ub2JqLFxuICAgIH07XG5cbiAgICByZXR1cm4geyAuLi5kYXRlKHN0YXRlKSwgaG91cnMgfTtcbiAgfSxcbiAgc2V0SG91cnMoZmlsdGVyZWQsIGhvdXIpIHtcbiAgICBjb25zdCBkYXRlMSA9IG5ldyBEYXRlKHRoaXMud2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWQpO1xuICAgIGNvbnN0IGRhdGUyID0gbmV3IERhdGUoaG91ci50aW1lKTtcblxuICAgIGlmIChkYXRlMS5nZXRUaW1lKCkgPCBkYXRlMi5nZXRUaW1lKCkpIHtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICBpY29uczogdW5pdFN5c3RlbXMuaWNvbnMsXG4gICAgICAgIGdldDogdW5pdFN5c3RlbXMuZ2V0LFxuICAgICAgICBzZXRJY29uOiB1bml0U3lzdGVtcy5zZXRJY29uLFxuICAgICAgICBzZXRWYWx1ZTogdW5pdFN5c3RlbXMuc2V0VmFsdWUsXG4gICAgICAgIHJvdW5kVmFsdWU6IHVuaXRTeXN0ZW1zLnJvdW5kVmFsdWUsXG4gICAgICAgIHVuaXRTeXN0ZW06IHVuaXRTeXN0ZW1zW3RoaXMudW5pdFN5c3RlbV0sXG4gICAgICAgIC4uLmhvdXIsXG4gICAgICB9O1xuICAgICAgY29uc29sZS5sb2coZGF0YShzdGF0ZSkpO1xuICAgICAgZmlsdGVyZWQucHVzaCh7IC4uLmRhdGEoc3RhdGUpIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSwgdW5pdFN5c3RlbSwgdGltZVN0YW1wKSB7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKGhvdXJseUNvbnRyb2xsZXIuaW5pdCh3ZWF0aGVyRGF0YSwgdW5pdFN5c3RlbSkpO1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICAgIC8vIHRoaXMuc2V0UHJvcGVydGllcyhob3VybHlDb250cm9sbGVyLmluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0pKTtcbiAgfSxcbiAgc2V0UHJvcGVydGllcyhvYmopIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gIH0sXG59O1xuLy8gRGF0ZVxuLy8gdGltZSB8IHRlbXAgfCBjb25kaXRpb24gfCBwcmVjaXB0YXRpb24gJSB8IHdpbmRcbi8vIGV4YW1wbGVcbi8vIDE6MzAgcG0gfCA0N8KwIHwgU3VubnkgfCAxJSB8IE4gNiBtcGhcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaG91cmx5IGZyb20gJy4vaG91cmx5LmNvbmZpZyc7XG5pbXBvcnQgZm9ybWF0RGF0ZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdERhdGUnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCBjcmVhdGVDb250ZW50Um93cyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUNvbnRlbnRSb3dzJztcblxuY29uc3QgaG91cmx5QnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBob3VybHkuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBob3VybHkuanMnKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXIoKSBydW5uaW5nIGZyb20gaG91cmx5LmpzJyk7XG4gICAgY29uc29sZS5sb2coaG91cmx5KTtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGhvdXJseVNlY3Rpb25IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgY29uc3QgaG91cmx5TG9jYXRpb24gPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaG91cmx5VGltZVN0YW1wID0gY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgaG91cmx5U2VjdGlvbi5pZCA9ICdob3VybHknO1xuICAgIGhvdXJseVNlY3Rpb25IZWFkaW5nLnRleHRDb250ZW50ID0gJ0hvdXJseSB3ZWF0aGVyJztcbiAgICBob3VybHlMb2NhdGlvbi50ZXh0Q29udGVudCA9IGAgLSAke2hvdXJseS5sb2NhdGlvbi5zZXRUZXh0KCl9YDtcbiAgICBob3VybHlUaW1lU3RhbXAudGV4dENvbnRlbnQgPSBgQXMgb2YgJHtob3VybHkubGFzdF91cGRhdGVkfWA7XG5cbiAgICBob3VybHlTZWN0aW9uSGVhZGluZy5hcHBlbmRDaGlsZChob3VybHlMb2NhdGlvbik7XG4gICAgaG91cmx5U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChob3VybHlTZWN0aW9uSGVhZGluZyk7XG4gICAgaG91cmx5U2VjdGlvbkhlYWRlci5hcHBlbmRDaGlsZChob3VybHlUaW1lU3RhbXApO1xuICAgIGhvdXJseVNlY3Rpb24uYXBwZW5kQ2hpbGQoaG91cmx5U2VjdGlvbkhlYWRlcik7XG5cbiAgICAvLyB0ZW1wb3JhcnlcbiAgICBjb25zdCBob3VybHlEZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGhvdXJseURldGFpbHMuaWQgPSAnaG91cmx5X2RldGFpbHMnO1xuXG4gICAgaG91cmx5LmZvcmVjYXN0ZGF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF5KTtcbiAgICAgIGNvbnN0IGhvdXJseURheSA9IGNyZWF0ZUVsZW1lbnQoJ29sJyk7XG4gICAgICBjb25zdCBob3VybHlEYXlIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgIGhvdXJseURheS5jbGFzc05hbWUgPSAnZGF5JztcbiAgICAgIGhvdXJseURheUhlYWRpbmcudGV4dENvbnRlbnQgPSBmb3JtYXREYXRlKGRheS5kYXRlKTtcbiAgICAgIGhvdXJseURheS5hcHBlbmRDaGlsZChob3VybHlEYXlIZWFkaW5nKTtcbiAgICAgIGRheS5ob3Vycy5mb3JFYWNoKChob3VyKSA9PiB7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoaG91cikuZm9yRWFjaCgoZGV0YWlsKSA9PiB7XG4gICAgICAgICAgaG91cmx5RGF5LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5zZXRUZXh0KCkpLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBob3VybHlEZXRhaWxzLmFwcGVuZENoaWxkKGhvdXJseURheSk7XG4gICAgfSk7XG5cbiAgICBob3VybHlTZWN0aW9uLmFwcGVuZENoaWxkKGhvdXJseURldGFpbHMpO1xuICAgIC8vIHRlbXBvcmFyeVxuICAgIHJldHVybiBob3VybHlTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIb3VybHkod2VhdGhlckRhdGEsIHRpbWVTdGFtcCkge1xuICBob3VybHkuaW5pdCh3ZWF0aGVyRGF0YSwgJ2ltcGVyaWFsJywgdGltZVN0YW1wKTtcbiAgcmV0dXJuIGhvdXJseUJ1aWxkZXIucmVuZGVyKCk7XG59XG5cbi8vIERhdGVcbi8vIHRpbWUgfCB0ZW1wIHwgY29uZGl0aW9uIHwgcHJlY2lwdGF0aW9uICUgfCB3aW5kXG4vLyBleGFtcGxlXG4vLyAxOjMwIHBtIHwgNDfCsCB8IFN1bm55IHwgMSUgfCBOIDYgbXBoXG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGJ1aWxkVGFic05hdmJhciBmcm9tICcuL3RhYnNfbmF2YmFyL3RhYnNfbmF2YmFyJztcbmltcG9ydCBidWlsZFRvZGF5IGZyb20gJy4vdG9kYXkvdG9kYXknO1xuaW1wb3J0IGJ1aWxkSG91cmx5IGZyb20gJy4vaG91cmx5L2hvdXJseSc7XG5pbXBvcnQgYnVpbGRGb3JlY2FzdCBmcm9tICcuL2ZvcmVjYXN0L2ZvcmVjYXN0JztcbmltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuXG5jb25zdCBidWlsZCA9IHtcbiAgdGFic05hdmJhcjogYnVpbGRUYWJzTmF2YmFyLFxuICB0b2RheTogYnVpbGRUb2RheSxcbiAgaG91cmx5OiBidWlsZEhvdXJseSxcbiAgZm9yZWNhc3Q6IGJ1aWxkRm9yZWNhc3QsXG59O1xuXG5jb25zdCB0YWJzQnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMuc2V0V2VhdGhlcih3ZWF0aGVyRGF0YSk7XG4gICAgdGhpcy5zd2l0Y2hUYWIgPSB0aGlzLnN3aXRjaFRhYi5iaW5kKHRoaXMpO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3N3aXRjaFRhYicsIHRoaXMuc3dpdGNoVGFiKTtcbiAgfSxcbiAgc2V0V2VhdGhlcih3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLmxvY2F0aW9uID0gd2VhdGhlckRhdGEubG9jYXRpb24ubmFtZTtcbiAgICB0aGlzLmFwaUxhc3RVcGRhdGVkID0gd2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWRfZXBvY2g7XG4gICAgLy8gdGhpcy50aW1lU3RhbXAgPSB3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZF9lcG9jaDtcbiAgICB0aGlzLnRpbWVTdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xuXG4gICAgY29uc29sZS5sb2codGhpcy50aW1lU3RhbXApO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYXBpTGFzdFVwZGF0ZWQpO1xuICB9LFxuICBjYWNoZURPTSh0YWJzU2VjdGlvbikge1xuICAgIHRoaXMudGFic1NlY3Rpb24gPSB0YWJzU2VjdGlvbjtcbiAgICB0aGlzLnRhYnNMaXN0ID0gdGFic1NlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfbGlzdF9pdGVtID4gYScpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3dpdGNoVGFiID0gdGhpcy5zd2l0Y2hUYWIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRhYnNMaXN0LmZvckVhY2goKHRhYikgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zd2l0Y2hUYWIpKTtcbiAgfSxcbiAgcmVuZGVyKGtleSwgdXBkYXRlKSB7XG4gICAgLy8gZGVidWdnZXI7XG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgaWYgKCF1cGRhdGUpIHtcbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIC8vIGlmIG5vIGtleVxuICAgICAgICBjb250ZW50ID0gYnVpbGQudG9kYXkodGhpcy53ZWF0aGVyRGF0YSwgdGhpcy50aW1lU3RhbXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IGJ1aWxkW2tleV0odGhpcy53ZWF0aGVyRGF0YSwgdGhpcy50aW1lU3RhbXApO1xuICAgICAgICB0aGlzLnRhYnNTZWN0aW9uLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudGFic1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgZXhpc3RzJyk7XG4gICAgICBwdWJTdWIucHVibGlzaCgnZ2V0V2VhdGhlcicsIHRoaXMubG9jYXRpb24sIGtleSk7XG4gICAgfVxuICB9LFxuICBzd2l0Y2hUYWIoZSwgdGFiS2V5KSB7XG4gICAgbGV0IHJlbmRlcktleTtcbiAgICBsZXQgdXBkYXRlID0gdHJ1ZTtcbiAgICBpZiAodGFiS2V5KSB7XG4gICAgICByZW5kZXJLZXkgPSB0YWJLZXk7XG4gICAgICB1cGRhdGUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBjbGFzc05hbWU6IGVsZW1lbnRDbGFzc05hbWUgfSA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgIHJlbmRlcktleSA9IGVsZW1lbnRDbGFzc05hbWU7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKHJlbmRlcktleSwgdXBkYXRlKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVGFicyh3ZWF0aGVyRGF0YSwgdGFiS2V5KSB7XG4gIGNvbnNvbGUubG9nKHRhYktleSk7XG4gIGlmICghdGFiS2V5KSB7XG4gICAgdGFic0J1aWxkZXIuaW5pdCh3ZWF0aGVyRGF0YSk7XG4gIH1cblxuICBjb25zdCB0YWJzU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgY29uc3QgdGFic0hlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMScpO1xuICB0YWJzU2VjdGlvbi5pZCA9ICd0YWJzJztcbiAgdGFic0hlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiAnVEFCUycgfSk7XG5cbiAgdGFic1NlY3Rpb24uYXBwZW5kQ2hpbGQodGFic0hlYWRpbmcpO1xuICB0YWJzU2VjdGlvbi5hcHBlbmRDaGlsZChidWlsZC50YWJzTmF2YmFyKCkpO1xuICB0YWJzQnVpbGRlci5jYWNoZURPTSh0YWJzU2VjdGlvbik7XG4gIHRhYnNCdWlsZGVyLnJlbmRlcigpO1xuICB0YWJzQnVpbGRlci5iaW5kRXZlbnRzKCk7XG4gIGlmICh0YWJLZXkpIHtcbiAgICBjb25zb2xlLmxvZygndGFic0J1aWxkZXIucmVuZGVyKCkgcnVubmluZyBvbmNlIG1vcmUnKTtcbiAgICB0YWJzQnVpbGRlci5zZXRXZWF0aGVyKHdlYXRoZXJEYXRhKTtcbiAgICB0YWJzQnVpbGRlci5yZW5kZXIodGFiS2V5KTtcbiAgfVxuICByZXR1cm4gdGFic1NlY3Rpb247XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ3RvZGF5JyxcbiAgICAgIHRleHRDb250ZW50OiAnVG9kYXknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ2hvdXJseScsXG4gICAgICB0ZXh0Q29udGVudDogJ0hvdXJseScsXG4gICAgICBocmVmOiAnIycsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiAnZm9yZWNhc3QnLFxuICAgICAgdGV4dENvbnRlbnQ6ICczLURheScsXG4gICAgICBocmVmOiAnIycsXG4gICAgfSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHRhYnMgZnJvbSAnLi90YWJzX25hdmJhci5jb25maWcnO1xuXG5jb25zdCB0YWJzTmF2YmFyQnVpbGRlciA9IHtcbiAgaW5pdCgpIHt9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0YWJzTmF2YmFyID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IHRhYnNMaXN0ID0gY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0YWJzTmF2YmFyLmlkID0gJ3RhYnNfbmF2YmFyJztcbiAgICBPYmplY3QudmFsdWVzKHRhYnMpLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgY29uc3QgdGFic0xpc3RJdGVtID0gY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGNvbnN0IHRhYnNOYXZBbmNob3IgPSBjcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB0YWJzTGlzdEl0ZW0uc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAndGFic19saXN0X2l0ZW0nIH0pO1xuICAgICAgdGFic05hdkFuY2hvci5zZXRBdHRyaWJ1dGVzKHRhYi5hdHRyaWJ1dGVzKTtcblxuICAgICAgdGFic0xpc3RJdGVtLmFwcGVuZENoaWxkKHRhYnNOYXZBbmNob3IpO1xuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFic0xpc3RJdGVtKTtcbiAgICB9KTtcblxuICAgIHRhYnNOYXZiYXIuYXBwZW5kQ2hpbGQodGFic0xpc3QpO1xuICAgIHJldHVybiB0YWJzTmF2YmFyO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRUYWJzTmF2YmFyKCkge1xuICByZXR1cm4gdGFic05hdmJhckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCIvLyBjdXJyZW50LnRlbXBfZlxuLy8gY3VycmVudC5mZWVsc2xpa2VfZlxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZlxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZlxuLy8gY3VycmVudC5odW1pZGl0eVxuLy8gY3VycmVudC5wcmVzc3VyZV9pblxuLy8gY3VycmVudC52aXNfbWlsZXNcbi8vIGN1cnJlbnQud2luZF9tcGhcbi8vIGN1cnJlbnQud2luZF9kaXJcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcblxuY29uc3QgdW5pdFN5c3RlbXMgPSB7XG4gIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi8uLi8uLi9hc3NldHMvaWNvbnMnLCBmYWxzZSwgL1xcLnN2ZyQvKSksXG4gIG1ldHJpYzoge1xuICAgIHRlbXA6ICdjJyxcbiAgICBzcGVlZDogJ2twaCcsXG4gICAgcHJlY2lwaXRhdGlvbjogJ21tJyxcbiAgICBwcmVzc3VyZTogJ21iJyxcbiAgICBkaXN0YW5jZTogJ2ttJyxcbiAgfSxcbiAgaW1wZXJpYWw6IHtcbiAgICB0ZW1wOiAnZicsXG4gICAgc3BlZWQ6ICdtcGgnLFxuICAgIHByZWNpcGl0YXRpb246ICdpbicsXG4gICAgcHJlc3N1cmU6ICdpbicsXG4gICAgZGlzdGFuY2U6ICdtaWxlcycsXG4gIH0sXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy51bml0U3lzdGVtW2tleV07XG4gIH0sXG4gIHNldEljb24oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbnMuZmlsZXNbT2JqZWN0LmtleXModGhpcy5pY29ucy5maWxlcykuZmluZCgoaWNvbktleSkgPT4gaWNvbktleS5pbmNsdWRlcyhrZXkpKV07XG4gIH0sXG4gIHJvdW5kVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSk7XG4gIH0sXG4gIHNldFZhbHVlKG9iaiwgLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUob2JqW2Ake2FyZ3NbMF19JHt0aGlzLmdldChhcmdzWzFdKX1gXSk7XG4gIH0sXG59O1xuXG5jb25zdCBkYXRhID0gKHN0YXRlKSA9PiAoe1xuICBzdW1tYXJ5OiBbXG4gICAge1xuICAgICAga2V5OiAndGVtcCcsXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndGVtcF8nLCAndGVtcCcpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdjb25kaXRpb24nLFxuICAgICAgbGFiZWw6IHN0YXRlLmNvbmRpdGlvbi50ZXh0LFxuICAgICAgaWNvbjogc3RhdGUuY29uZGl0aW9uLmljb24sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH1gO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBkZXRhaWxzOiBbXG4gICAge1xuICAgICAga2V5OiAnZmVlbHNsaWtlJyxcbiAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdmZWVsc2xpa2VfJywgJ3RlbXAnKSxcbiAgICAgIGxhYmVsOiAnZmVlbHMgbGlrZScsXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ21pbm1heHRlbXAnLFxuICAgICAgbWluOiB7XG4gICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZS5kYXksICdtaW50ZW1wXycsICd0ZW1wJyksXG4gICAgICAgIGxhYmVsOiAnbG93JyxcbiAgICAgIH0sXG4gICAgICBtYXg6IHtcbiAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLmRheSwgJ21heHRlbXBfJywgJ3RlbXAnKSxcbiAgICAgICAgbGFiZWw6ICdoaWdoJyxcbiAgICAgIH0sXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgbGFiZWw6IGBoaWdoIC8gbG93YCxcbiAgICAgIGljb246IHN0YXRlLnNldEljb24oJ21pbm1heHRlbXAnKSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm1heC52YWx1ZX0ke3RoaXMudW5pdH0gLyAke3RoaXMubWluLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnaHVtaWRpdHknLFxuICAgICAgdmFsdWU6IHN0YXRlLmh1bWlkaXR5LFxuICAgICAgdW5pdDogJyUnLFxuICAgICAgbGFiZWw6ICdodW1pZGl0eScsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdodW1pZGl0eScpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdwcmVzc3VyZScsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdwcmVzc3VyZV8nLCAncHJlc3N1cmUnKSxcbiAgICAgIHVuaXQ6IHN0YXRlLmdldCgncHJlc3N1cmUnKSxcbiAgICAgIGxhYmVsOiAncHJlc3N1cmUnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbigncHJlc3N1cmUnKSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3ZpcycsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd2aXNfJywgJ2Rpc3RhbmNlJyksXG4gICAgICB1bml0OiBzdGF0ZS5nZXQoJ2Rpc3RhbmNlJyksXG4gICAgICBsYWJlbDogJ3Zpc2liaWxpdHknLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbigndmlzaWJpbGl0eScpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9ICR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnd2luZCcsXG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd3aW5kXycsICdzcGVlZCcpLFxuICAgICAgdW5pdDogc3RhdGUuZ2V0KCdzcGVlZCcpLFxuICAgICAgbGFiZWw6ICd3aW5kJyxcbiAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3dpbmQnKSxcbiAgICAgIGRpcjoge1xuICAgICAgICB2YWx1ZTogc3RhdGUud2luZF9kaXIsXG4gICAgICB9LFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZGlyLnZhbHVlfSAke3RoaXMudmFsdWV9ICR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndXYnLFxuICAgICAgdmFsdWU6IHN0YXRlLnV2LFxuICAgICAgbGFiZWw6ICdVViBJbmRleCcsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCd1dicpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9IG9mIDExYDtcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbn0pO1xuXG5jb25zdCBsb2NhdGlvbiA9IChzdGF0ZSkgPT4gKHtcbiAgY291bnRyeTogc3RhdGUuY291bnRyeSxcbiAgbG9jYWx0aW1lOiBzdGF0ZS5sb2NhbHRpbWUsXG4gIG5hbWU6IHN0YXRlLm5hbWUsXG4gIHJlZ2lvbjogc3RhdGUucmVnaW9uLFxuICBzZXRUZXh0KCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LCAke1xuICAgICAgdGhpcy5yZWdpb24ubGVuZ3RoID09PSAwIHx8IHRoaXMucmVnaW9uID09PSB0aGlzLm5hbWUgPyB0aGlzLmNvdW50cnkgOiB0aGlzLnJlZ2lvblxuICAgIH1gO1xuICB9LFxufSk7XG5cbmNvbnN0IHRvZGF5Q29udHJvbGxlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSwgdW5pdFN5c3RlbSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLnVuaXRTeXN0ZW0gPSB1bml0U3lzdGVtO1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgaWNvbnM6IHVuaXRTeXN0ZW1zLmljb25zLFxuICAgICAgZ2V0OiB1bml0U3lzdGVtcy5nZXQsXG4gICAgICBzZXRJY29uOiB1bml0U3lzdGVtcy5zZXRJY29uLFxuICAgICAgc2V0VmFsdWU6IHVuaXRTeXN0ZW1zLnNldFZhbHVlLFxuICAgICAgcm91bmRWYWx1ZTogdW5pdFN5c3RlbXMucm91bmRWYWx1ZSxcbiAgICAgIHVuaXRTeXN0ZW06IHVuaXRTeXN0ZW1zW3VuaXRTeXN0ZW1dLFxuICAgICAgLi4ud2VhdGhlckRhdGEuY3VycmVudCxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLFxuICAgICAgLi4ud2VhdGhlckRhdGEubG9jYXRpb24sXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGF0YShzdGF0ZSksXG4gICAgICBsb2NhdGlvbjogbG9jYXRpb24oc3RhdGUpLFxuICAgICAgbGFzdF91cGRhdGVkOiBmb3JtYXRUaW1lKHdlYXRoZXJEYXRhLmN1cnJlbnQubGFzdF91cGRhdGVkKS50b0xvd2VyQ2FzZSgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0sIHRpbWVTdGFtcCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRvZGF5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhLCB1bml0U3lzdGVtKSk7XG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgIGNvbnNvbGUubG9nKHRpbWVTdGFtcCk7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHRvZGF5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhLCB1bml0U3lzdGVtKSk7XG4gIH0sXG4gIHNldFByb3BlcnRpZXMob2JqKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmopO1xuICB9LFxufTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5pbXBvcnQgdG9kYXkgZnJvbSAnLi90b2RheS5jb25maWcnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcblxuY29uc3QgdG9kYXlCdWlsZGVyID0ge1xuICBpbml0KCkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSB0b2RheS5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIHRvZGF5LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0b2RheSk7XG4gICAgY29uc3QgdG9kYXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuXG4gICAgdG9kYXlTZWN0aW9uLmlkID0gJ3RvZGF5JztcblxuICAgIC8vIHRlbXBvcmFyeVxuICAgIGNvbnN0IHRvZGF5U3VtbWFyeSA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCB0b2RheUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IHRvZGF5U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNvbnN0IHRvZGF5TG9jYXRpb24gPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdG9kYXlUaW1lU3RhbXAgPSBjcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICB0b2RheVN1bW1hcnkuaWQgPSAndG9kYXlfc3VtbWFyeSc7XG4gICAgdG9kYXlTZWN0aW9uSGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6ICdUT0RBWScgfSk7XG4gICAgdG9kYXlMb2NhdGlvbi50ZXh0Q29udGVudCA9IGAgLSAke3RvZGF5LmxvY2F0aW9uLnNldFRleHQoKX1gO1xuICAgIHRvZGF5VGltZVN0YW1wLnRleHRDb250ZW50ID0gYEFzIG9mICR7dG9kYXkubGFzdF91cGRhdGVkfWA7XG5cbiAgICB0b2RheVNlY3Rpb25IZWFkaW5nLmFwcGVuZENoaWxkKHRvZGF5TG9jYXRpb24pO1xuICAgIHRvZGF5SGVhZGVyLmFwcGVuZENoaWxkKHRvZGF5U2VjdGlvbkhlYWRpbmcpO1xuICAgIHRvZGF5SGVhZGVyLmFwcGVuZENoaWxkKHRvZGF5VGltZVN0YW1wKTtcbiAgICB0b2RheVN1bW1hcnkuYXBwZW5kQ2hpbGQodG9kYXlIZWFkZXIpO1xuXG4gICAgdG9kYXkuc3VtbWFyeS5mb3JFYWNoKChkZXRhaWwpID0+IHtcbiAgICAgIHRvZGF5U3VtbWFyeS5hcHBlbmRDaGlsZChcbiAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5zZXRUZXh0KCkpLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZGF5RGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0b2RheURldGFpbHMuaWQgPSAndG9kYXlfZGV0YWlscyc7XG5cbiAgICB0b2RheS5kZXRhaWxzLmZvckVhY2goKGRldGFpbCkgPT4ge1xuICAgICAgdG9kYXlEZXRhaWxzLmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVDb250ZW50Um93cyhjcmVhdGVFbGVtZW50LCBudWxsLCBkZXRhaWwuaWNvbiwgZGV0YWlsLmxhYmVsLCBkZXRhaWwuc2V0VGV4dCgpKSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0b2RheVNlY3Rpb24uYXBwZW5kQ2hpbGQodG9kYXlTdW1tYXJ5KTtcbiAgICB0b2RheVNlY3Rpb24uYXBwZW5kQ2hpbGQodG9kYXlEZXRhaWxzKTtcbiAgICAvLyB0ZW1wb3JhcnlcblxuICAgIHJldHVybiB0b2RheVNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRvZGF5KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgY29uc29sZS5sb2codGltZVN0YW1wKTtcbiAgdG9kYXkuaW5pdCh3ZWF0aGVyRGF0YSwgJ2ltcGVyaWFsJywgdGltZVN0YW1wKTtcbiAgcmV0dXJuIHRvZGF5QnVpbGRlci5yZW5kZXIoKTtcbn1cblxuLy8gSGlnaCAvIExvd1xuLy8gZXgsIDg3wrAgLyA0MMKwXG5cbi8vIFdpbmRcbi8vIGV4LCBOTlcgMTQgbXBoXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcbi8vIHVzZSBXZWF0aGVyQVBJXG4vLyBodHRwczovL3d3dy53ZWF0aGVyYXBpLmNvbS9kb2NzL1xuLy8gaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTg0YWM3MzEwZTU2NDQ4YTE4OTYyMTI3MzEyMzA2MTEmcT1Mb25kb25cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcih2YWx1ZSwgdGFiS2V5KSB7XG4gIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgY29uc29sZS5sb2codGFiS2V5KTtcbiAgLy8gKm5vdGUsIHZhbHVlIGRvZXMgTk9UIG5lZWQgdG8gYmUgZXZhbHVhdGVkIGJlZm9yZSBmZXRjaFxuICAvLyBwb3N0YWwgY29kZSwgbnVtYmVyIG9yIHN0cmluZ1xuICAvLyBjaXR5LCB1cHBlcmNhc2Ugb3IgbG93ZXJjYXNlO1xuICBwdWJTdWIucHVibGlzaCgnc3dpdGNoQ29udGVudCcsICdsb2FkaW5nJyk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT04NGFjNzMxMGU1NjQ0OGExODk2MjEyNzMxMjMwNjExJnE9JHt2YWx1ZX0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBwdWJTdWIucHVibGlzaChcbiAgICAgICdzd2l0Y2hDb250ZW50JyxcbiAgICAgICFyZXNwb25zZS5vayA/IE9iamVjdC5hc3NpZ24ocmVzcG9uc2UsIHdlYXRoZXJEYXRhKSA6IHdlYXRoZXJEYXRhLFxuICAgICAgdGFiS2V5LFxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGUgJHtyZXNwb25zZS5zdGF0dXN9LCAke3dlYXRoZXJEYXRhLmVycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgLy8gY29kZSBiZWxvdyB0aGUgaWYgYmxvY2sgd2lsbCBvbmx5IHJ1biBpZiB0aGVyZSBhcmUgbm8gZXJyb3JzXG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2dldFdlYXRoZXInLCBnZXRXZWF0aGVyKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgc3Vic2NyaWJlcnM6IHt9LFxuICBzdWJzY3JpYmUoc3Vic2NyaWJlciwgZm4pIHtcbiAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdID0gdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSB8fCBbXTtcbiAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLnB1c2goZm4pO1xuICB9LFxuICB1bnN1YnNjcmliZShzdWJzY3JpYmVyLCBmbikge1xuICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdID0gdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5maWx0ZXIoXG4gICAgICAgIChoYW5kbGVyKSA9PiBoYW5kbGVyICE9PSBmbixcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICBwdWJsaXNoKHN1YnNjcmliZXIsIC4uLmRhdGEpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgICBmbiguLi5kYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250ZW50Um93cyhmbiwgYXR0cmlidXRlcywgLi4uYXJncykge1xuICBjb25zdCBjb250YWluZXJBdHRyaWJ1dGVzID0gYXR0cmlidXRlcyA/IGF0dHJpYnV0ZXNbMV0gOiBmYWxzZTtcbiAgY29uc3QgaXRlbUF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzID8gYXR0cmlidXRlc1syXSA6IGZhbHNlO1xuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGZuKCd1bCcpO1xuICBpZiAoY29udGFpbmVyQXR0cmlidXRlcykge1xuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVzKGNvbnRhaW5lckF0dHJpYnV0ZXMpO1xuICB9XG4gIGFyZ3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIC8vIC9cXC4oc3ZnfHBuZykkL1xuICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uc3BsaXQoL1xcLihzdmd8cG5nKSQvKSk7XG5cbiAgICBpZiAoaXRlbSkge1xuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBmbignbGknKTtcbiAgICAgIGlmIChpdGVtQXR0cmlidXRlcykgaXRlbS5zZXRBdHRyaWJ1dGVzKGl0ZW1BdHRyaWJ1dGVzKTtcbiAgICAgIGlmICgvXFwuW3N2Z3xwbmddezN9JC8udGVzdChpdGVtKSkge1xuICAgICAgICBjb25zdCBpbWcgPSBmbignaW1nJyk7XG4gICAgICAgIGlmICgvXFwuW3N2Z117M30kLy50ZXN0KGl0ZW0pKSBpbWcuc2V0QXR0cmlidXRlcyh7IG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScgfSk7XG4gICAgICAgIGltZy5zcmMgPSBpdGVtO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBpdGVtO1xuICAgICAgfVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwiY29uc3Qgc2V0RWxlbWVudFN0YXRlID0gKCkgPT4gKHtcbiAgc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSAndGV4dENvbnRlbnQnKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRUZXh0Q29udGVudCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHNldFRleHRDb250ZW50KHRleHQpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfSxcbn0pO1xuXG5jb25zdCBidWlsZEVsZW1lbnQgPSAodGFnTmFtZSkgPT4ge1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICB0YWdOYW1lLFxuICB9O1xuXG4gIHJldHVybiB7IC4uLnNldEVsZW1lbnRTdGF0ZShzdGF0ZSkgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICBjb25zdCBodG1sRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIE9iamVjdC5hc3NpZ24oaHRtbEVsZW1lbnQsIGJ1aWxkRWxlbWVudChodG1sRWxlbWVudCkpO1xuXG4gIHJldHVybiBodG1sRWxlbWVudDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZVN0cmluZykge1xuICAvLyB0aGlzIHJldHVybnMgYSBmb3JtYXQgW0RheSwgTW9udGggRGF0ZV1cbiAgLy8gZXg6IFdlZG5lc2RheSwgQXByaWwgMTRcbiAgY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcbiAgY29uc3QgbW9udGhzID0gW1xuICAgICdKYW51YXJ5JyxcbiAgICAnRmVicnVhcnknLFxuICAgICdNYXJjaCcsXG4gICAgJ0FwcmlsJyxcbiAgICAnTWF5JyxcbiAgICAnSnVuZScsXG4gICAgJ0p1bHknLFxuICAgICdBdWd1c3QnLFxuICAgICdTZXB0ZW1iZXInLFxuICAgICdPY3RvYmVyJyxcbiAgICAnTm92ZW1iZXInLFxuICAgICdEZWNlbWJlcicsXG4gIF07XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICByZXR1cm4gYCR7ZGF5c1tkYXRlLmdldERheSgpXX0sICR7bW9udGhzW2RhdGUuZ2V0TW9udGgoKV19ICR7ZGF0ZS5nZXREYXRlKCl9YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xuICAvLyByZXR1cm5zIDEyIGhvdXIgdGltZSBmb3JtYXRcbiAgLy8gZXg6IDI6MDAgUE0gb3IgMTA6MDAgQU1cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpO1xuICBjb25zdCB0aW1lUHJvcGVydGllcyA9IHtcbiAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgaG91cjEyOiB0cnVlLFxuICB9O1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XG4gIGNvbnN0IGZpbGVzID0ge307XG4gIGNvbnN0IGZpbGVzQXJyID0gW107XG4gIHIua2V5cygpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBmaWxlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgZmlsZXMsIGZpbGVzQXJyIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=