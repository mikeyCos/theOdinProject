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
  /* background-color: var(--color-background-primary); */
  display: grid;
  grid-template-rows: min-content 1fr;
}
`, "",{"version":3,"sources":["webpack://./src/styles/content.css"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,uDAAuD;EACvD,aAAa;EACb,mCAAmC;AACrC","sourcesContent":["/* #main_content */\n#main_content {\n  height: 100%;\n}\n\n#main_content > :first-child:not(#loading):not(#home) {\n  height: inherit;\n  /* background-color: var(--color-background-primary); */\n  display: grid;\n  grid-template-rows: min-content 1fr;\n}\n"],"sourceRoot":""}]);
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
`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA,mDAAmD;AACnD;EACE,mDAAmD;AACrD;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,sDAAsD;EACtD,kBAAkB;AACpB;;AAEA,aAAa;AACb;;EAEE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,MAAM;EACN,OAAO;EACP,mCAAmC;EACnC,WAAW;AACb;;AAEA,aAAa;AACb;EACE,SAAS;EACT,sBAAsB;EACtB,iCAAiC;AACnC;;AAEA,aAAa;AACb;EACE,WAAW;EACX,mCAAmC;EACnC,iCAAiC;AACnC;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,mDAAmD;EACnD,aAAa;EACb,4BAA4B;AAC9B;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;EACZ,eAAe;EACf,qCAAqC;EACrC,yDAAyD;AAC3D;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,UAAU;EACV,eAAe;EACf,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,kCAAkC;EAClC,qBAAqB;AACvB;;AAEA;EACE,yBAAyB;EACzB,qDAAqD;AACvD;;AAEA;EACE,2BAA2B;EAC3B,oDAAoD;AACtD;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;2BAE2B;AAC3B;8DAC8D;AAC9D;GACG;;AAEH;;;;;GAKG;;AAEH;;GAEG;;AAEH,gBAAgB;AAChB;;;GAGG;;AAEH,iBAAiB;AACjB;;;GAGG;;AAEH;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,uCAAuC;EACvC,UAAU;AACZ;;AAEA;;EAEE,8CAA8C;EAC9C,qBAAqB;AACvB;;AAEA;EACE,iCAAiC;EACjC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;EACf,oCAAoC;AACtC;;AAEA;EACE,iBAAiB;AACnB;;AAEA,gBAAgB;AAChB;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,mBAAmB;EACnB,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,yDAAyD;EACzD,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,kBAAkB;IAClB,mBAAmB;IACnB,6BAA6B;IAC7B,UAAU;IACV,yBAAyB;IACzB,aAAa;IACb,eAAe;IACf,cAAc;EAChB;;EAEA;;IAEE,aAAa;EACf;;EAEA;;IAEE,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,mBAAmB;EACrB;;EAEA,aAAa;EACb;IACE,SAAS;IACT,UAAU;IACV,sBAAsB;IACtB,iCAAiC;EACnC;;EAEA,aAAa;EACb;IACE,UAAU;IACV,WAAW;IACX,gCAAgC;IAChC,iCAAiC;EACnC;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,qBAAqB;IACrB,eAAe;IACf,eAAe;EACjB;;EAEA;IACE,oCAAoC;EACtC;;EAEA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,2BAA2B;EAC7B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE;IACE,4BAA4B;EAC9B;;EAEA;IACE,yBAAyB;EAC3B;AACF","sourcesContent":["/* includes selectors for navbar.js and header.js */\n#header {\n  background-color: var(--color-background-secondary);\n}\n\n#header > #navbar > .container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n#header > #navbar > .container > * {\n  list-style: none;\n}\n\n#header > #navbar > .container > * > li {\n  position: relative;\n  padding: 0.3rem;\n}\n\n#header > #navbar > .container > * > li:first-of-type {\n  /* value needs to be equal to .nav_btn padding value */\n  margin-top: 0.3rem;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > *:not(:first-child)::after,\n#header > #navbar > .container > .nav_right > *:not(:first-child):hover::after {\n  position: absolute;\n  content: '';\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgb(255, 187, 69);\n  z-index: -1;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > li::after {\n  width: 0%;\n  transform: skewX(0deg);\n  transition: all 500ms ease-in-out;\n}\n\n/* optional */\n#header > #navbar > .container > .nav_right > li:hover::after {\n  width: 100%;\n  transform: skewX(8deg) scaleX(1.03);\n  transition: all 200ms ease-in-out;\n}\n\n#header > #navbar > .container > * > li > a {\n  display: flex;\n  align-items: center;\n}\n\n#header > #navbar > .container > * > li > .nav_logo > svg {\n  width: clamp(5rem, 3vw, 5.5rem);\n}\n\n#header > #navbar > .container > .nav_right {\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: var(--color-background-secondary);\n  padding: 1rem;\n  transform: translateY(-100%);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button {\n  position: relative;\n  width: max-content;\n  border-radius: 0.75rem;\n  border: none;\n  padding: 0.5rem;\n  background-color: var(--color-accent);\n  box-shadow: inset 0px 0px 5px 0px var(--color-box-shadow);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button::before {\n  position: absolute;\n  content: '';\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 2;\n  padding: 0.5rem;\n  width: 50%;\n  height: 100%;\n  border-radius: 0.75rem;\n  background-color: rgb(25, 216, 25);\n  transition: all 250ms;\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='true']::before {\n  transform: translateX(0%);\n  box-shadow: -2px 0px 3px -1px var(--color-box-shadow);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='false']::before {\n  transform: translateX(100%);\n  box-shadow: 2px 0px 3px -1px var(--color-box-shadow);\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button > * {\n  position: relative;\n  z-index: 2;\n  padding: 0.5rem;\n}\n\n#header > #navbar > .container > .nav_right > li > #unit_systems_button[value='true'] > .imperial {\n  /* background-color: red; */\n}\n\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons {\n  width: max-content;\n  border-radius: 0.75rem; */\n/* background-color: var(--color-accent);\n  box-shadow: inset 0px 0px 5px 0px var(--color-box-shadow); */\n/* padding: 0.05rem;\n} */\n\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:not(span) {\n  border: none;\n  padding: 0.5rem;\n  border-radius: 0.75rem;\n  background-color: transparent;\n} */\n\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *.selected {\n  background-color: rgb(25, 216, 25);\n} */\n\n/* left button */\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > #imperial.selected {\n  box-shadow: -2px 0px 3px -1px var(--color-box-shadow);\n  animation: slide_left 500ms ease-out;\n} */\n\n/* right button */\n/* #header > #navbar > .container > .nav_right > li > .unit_systems_buttons > #metric.selected {\n  box-shadow: 2px 0px 3px -1px var(--color-box-shadow);\n  animation: slide_right 500ms ease-out;\n} */\n\n#header > #navbar > .container > .nav_right > li > .unit_systems_buttons > *:hover {\n  cursor: pointer;\n}\n\n#header > #navbar > .container > .nav_right.visible {\n  visibility: visible;\n  transform: translateY(0%);\n  transition: transform 200ms ease-in-out;\n  z-index: 2;\n}\n\n.nav_item,\n.nav_item:visited {\n  color: var(--primary-font-color, rgb(0, 0, 0));\n  text-decoration: none;\n}\n\n.nav_item > svg {\n  width: clamp(1.5rem, 3vw, 2.5rem);\n  height: auto;\n}\n\n.nav_btn {\n  display: flex;\n  align-items: center;\n  background: transparent;\n  border: none;\n  border-radius: 0.35rem;\n  padding: 0.3rem;\n  z-index: 2;\n}\n\n.nav_btn > svg {\n  width: 2rem;\n  height: auto;\n}\n\n.nav_btn:hover {\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.nav_btn:hover > svg {\n  filter: invert(1);\n}\n\n/* form styles */\n#header > #form {\n  padding: 1rem;\n}\n\n#header > #form > .form_item:first-child {\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.5rem;\n}\n\n#header > #form > .form_item:first-child > label {\n  font-size: clamp(2rem, 2vw, 3rem);\n}\n\n#header > #form > .form_item:first-child > input {\n  font-size: 1.5rem;\n  border: none;\n  border-radius: 1rem;\n  padding: 0.75rem;\n  width: 100%;\n}\n\n#header > #form > .form_item:first-child > input:focus {\n  outline: none;\n  box-shadow: inset 0px 0px 5px 2px var(--color-box-shadow);\n  padding-left: 2rem;\n}\n\n#header > #form > .form_item:first-child > input:focus::placeholder {\n  visibility: hidden;\n}\n\n#header > #form > .form_item:first-child > .validity_error {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #header > #navbar > .container > * {\n    align-items: center;\n  }\n\n  #header > #navbar > .container > .nav_right {\n    position: relative;\n    visibility: visible;\n    background-color: transparent;\n    padding: 0;\n    transform: translateY(0%);\n    display: flex;\n    height: inherit;\n    width: inherit;\n  }\n\n  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:after,\n  #header > #navbar > .container > *:not(.nav_left) > li:last-of-type:hover:after {\n    content: none;\n  }\n\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after,\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    position: absolute;\n    bottom: 0;\n    top: auto;\n    left: 0;\n    right: 0;\n    margin: auto;\n    border-radius: 1rem;\n  }\n\n  /* optional */\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):after {\n    width: 0%;\n    height: 0%;\n    transform: skewX(0deg);\n    transition: all 200ms ease-in-out;\n  }\n\n  /* optional */\n  #header > #navbar > .container > *:not(.nav_left) > li:not(:last-child):hover::after {\n    width: 60%;\n    height: 12%;\n    transform: skewX(0deg) scaleX(1);\n    transition: all 200ms ease-in-out;\n  }\n\n  #header > #navbar > .container > * > li:first-of-type {\n    margin-top: 0;\n  }\n\n  .nav_btn {\n    display: none;\n  }\n\n  #header > #form > .form_item:first-child {\n    align-content: center;\n    flex-wrap: wrap;\n    padding: 1rem 0;\n  }\n\n  #header > #form > .form_item:first-child > label {\n    font-size: clamp(1rem, 1vw, 1.25rem);\n  }\n\n  #header > #form > .form_item:first-child > input {\n    width: 50%;\n  }\n}\n\n@keyframes slide_left {\n  0% {\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(0%);\n  }\n}\n\n@keyframes slide_right {\n  0% {\n    transform: translateX(-100%);\n  }\n\n  100% {\n    transform: translateX(0%);\n  }\n}\n"],"sourceRoot":""}]);
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
    /* flex: 0.5; */
    justify-self: flex-start;
  }

  #hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,
  #hourly_details > .day > .hour > ul:last-of-type {
    display: flex;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/hourly.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf;;AAEA;EACE,iCAAiC;EACjC,aAAa;EACb,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mCAAmC;EACnC,sCAAsC;EACtC,iDAAiD;EACjD,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,mCAAmC;AACrC;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA,6BAA6B;AAC7B;EACE,yBAAyB;AAC3B;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE;IACE,aAAa;IACb,qCAAqC;IACrC,kBAAkB;IAClB,qBAAqB;EACvB;;EAEA;IACE,eAAe;IACf,wBAAwB;EAC1B;;EAEA;;IAEE,aAAa;EACf;AACF","sourcesContent":["#hourly > header {\n  padding: 2rem;\n}\n\n#hourly > header > h2 {\n  font-size: clamp(2rem, 2vw, 3rem);\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n#hourly > header > h2 > span {\n  font-size: 1rem;\n  font-weight: 400;\n  text-wrap: nowrap;\n  margin-left: 0.5rem;\n}\n\n#hourly > header > p {\n  font-weight: 300;\n}\n\n#hourly_details > .day > h3 {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  color: var(--color-background-primary);\n  background-color: var(--color-background-default);\n  padding: 2rem;\n  text-wrap: balance;\n}\n\n#hourly_details > .day > .hour {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#hourly_details > .day > .hour:not(:last-child) {\n  border-bottom: 0.35rem solid;\n}\n\n#hourly_details > .day > .hour > ul {\n  list-style: none;\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n}\n\n#hourly_details > .day > .hour > ul > * {\n  display: flex;\n}\n\n/* selects the li with time */\n#hourly_details > .day > .hour > ul:first-of-type > li {\n  text-transform: lowercase;\n}\n\n#hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,\n#hourly_details > .day > .hour > ul:last-of-type {\n  display: none;\n}\n\n@media screen and (min-width: 768px) {\n  #hourly_details > .day > .hour {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    padding: 2rem 3rem;\n    justify-items: center;\n  }\n\n  #hourly_details > .day > .hour > ul:nth-of-type(3) {\n    /* flex: 0.5; */\n    justify-self: flex-start;\n  }\n\n  #hourly_details > .day > .hour > ul:nth-of-type(3) > :last-child,\n  #hourly_details > .day > .hour > ul:last-of-type {\n    display: flex;\n  }\n}\n"],"sourceRoot":""}]);
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

.tabs_list_item > *:hover {
  /* border-bottom: 2px solid rgb(255, 0, 0); */
}

.tabs_list_item > [data-active='true'] {
  /* box-shadow: inset 0px 0px 4px 2px black; */
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
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/tabs.css"],"names":[],"mappings":"AAAA,+CAA+C;AAC/C;EACE,iDAAiD;EACjD,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,uDAAuD;AACzD;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,uBAAuB;AACzB;;AAEA;EACE,eAAe;AACjB;;AAEA,yBAAyB;AACzB;EACE,qBAAqB;EACrB,iBAAiB;EACjB,sCAAsC;EACtC,mCAAmC;EACnC,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,WAAW;EACX,UAAU;EACV,WAAW;EACX,YAAY;EACZ,qCAAqC;EACrC,oBAAoB;EACpB,iCAAiC;AACnC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,6CAA6C;EAC7C,wCAAwC;AAC1C;;AAEA;EACE;IACE,2BAA2B;EAC7B;EACA;IACE,aAAa;EACf;AACF","sourcesContent":["/* stylesheet for tabs.js, and tabs_navbar.js */\n#tabs_navbar {\n  background-color: var(--color-background-default);\n  padding: 1rem;\n  display: flex;\n  justify-content: center;\n  box-shadow: 0px -5px 14px -10px var(--color-box-shadow);\n}\n\n#tabs_navbar > ul {\n  display: flex;\n  list-style: none;\n  column-gap: 0.5rem;\n  justify-content: center;\n}\n\n.tabs_list_item {\n  padding: 0.5rem;\n}\n\n/* #tabs_navbar anchors */\n.tabs_list_item > * {\n  text-decoration: none;\n  text-wrap: nowrap;\n  color: var(--color-background-primary);\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  font-weight: 700;\n  padding: 0.5vw;\n  position: relative;\n}\n\n.tabs_list_item > *:after {\n  position: absolute;\n  bottom: 10%;\n  left: 0;\n  right: 0;\n  content: '';\n  width: 50%;\n  height: 4px;\n  margin: auto;\n  background-color: var(--color-accent);\n  transform: scaleX(0);\n  transition: all 200ms ease-in-out;\n}\n\n.tabs_list_item > *:hover:after {\n  transform: scaleX(1) scaleY(1.25);\n}\n\n.tabs_list_item > *:hover {\n  /* border-bottom: 2px solid rgb(255, 0, 0); */\n}\n\n.tabs_list_item > [data-active='true'] {\n  /* box-shadow: inset 0px 0px 4px 2px black; */\n  color: var(--color-background-secondary);\n}\n\n@media screen and (min-width: 768px) {\n  #tabs_navbar {\n    justify-content: flex-start;\n  }\n  .tabs_list_item > * {\n    padding: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
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
`, "",{"version":3,"sources":["webpack://./src/styles/tabs/today.css"],"names":[],"mappings":"AAAA;EACE,+BAA+B;EAC/B,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,kBAAkB;AACpB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,iDAAiD;EACjD,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,OAAO;AACT;;AAEA,iCAAiC;AACjC;EACE,iBAAiB;EACjB,0BAA0B;EAC1B,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,kBAAkB;AACpB;;AAEA,mCAAmC;AACnC;EACE,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,aAAa;EACb,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,uBAAuB;EACvB,eAAe;EACf,uBAAuB;AACzB;;AAEA;EACE,mCAAmC;AACrC;;AAEA,mCAAmC;AACnC;EACE,aAAa;AACf;;AAEA;EACE,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,OAAO;EACP,0BAA0B;EAC1B,iBAAiB;AACnB;;AAEA;EACE;IACE,gBAAgB;IAChB,aAAa;EACf;;EAEA;IACE,aAAa;IACb,qCAAqC;IACrC,gBAAgB;IAChB,aAAa;IACb,aAAa;EACf;;EAEA;IACE,kBAAkB;IAClB,aAAa;EACf;AACF","sourcesContent":["#today_summary {\n  /* background-color: magenta; */\n  padding: 2rem;\n}\n\n#today_summary > ul {\n  list-style: none;\n}\n\n#today_summary > ul > :first-child {\n  font-size: clamp(2rem, 2vw, 3rem);\n}\n\n#today_summary > header > h3 {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_summary > header > h3 > span {\n  font-size: 1rem;\n  font-weight: 300;\n  text-wrap: nowrap;\n  margin-left: 0.5rem;\n}\n\n#today_summary > ul:last-of-type {\n  display: flex;\n  flex-direction: column-reverse;\n  position: relative;\n}\n\n#today_summary > ul:last-of-type > :last-child {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_summary > ul:last-of-type > :first-child {\n  display: flex;\n  position: absolute;\n  right: 0;\n}\n\n#today_details > * > * {\n  list-style: none;\n}\n\n#today_details > .today_details_header {\n  padding: 2rem;\n  color: var(--color-background-primary);\n  background-color: var(--color-background-default);\n  display: flex;\n  flex-wrap: wrap;\n}\n\n#today_details > .today_details_header > :first-child {\n  flex: 1;\n}\n\n/* selects li with \"feels like\" */\n#today_details > .today_details_header > :first-child > :first-child {\n  text-wrap: nowrap;\n  text-transform: capitalize;\n  font-size: clamp(1rem, 2vw, 1.5rem);\n}\n\n#today_details > .today_details_header > :first-child > :last-child {\n  font-size: clamp(2rem, 2vw, 2.5rem);\n}\n\n#today_details > .today_details_header > .today_details_sun {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: end;\n  column-gap: 1rem;\n}\n\n#today_details > .today_details_header > .today_details_sun > * {\n  list-style: none;\n  display: flex;\n  column-gap: 0.5rem;\n}\n\n/* selects li's that wrap an icon */\n#today_details > .today_details_header > .today_details_sun > * > :first-child > svg {\n  width: clamp(1.75rem, 2vw, 3rem);\n  height: auto;\n}\n\n#today_details > .today_details_header > .today_details_sun > * > li {\n  display: flex;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n#today_details > .today_details_container {\n  padding: 1rem;\n  /* background-color: darkorange; */\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.25rem;\n}\n\n#today_details > .today_details_container > ul {\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n  padding: 1.25rem;\n  border: 2px solid black;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n#today_details > .today_details_container > ul > * {\n  font-size: clamp(1.5rem, 2vw, 2rem);\n}\n\n/* selects li's that wrap an icon */\n#today_details > .today_details_container > ul > :first-child {\n  display: flex;\n}\n\n#today_details > .today_details_container > ul > :first-child > svg {\n  width: clamp(1.75rem, 2vw, 2rem);\n  height: auto;\n}\n\n#today_details > .today_details_container > ul > :nth-child(2) {\n  flex: 1;\n  text-transform: capitalize;\n  text-wrap: nowrap;\n}\n\n@media screen and (min-width: 768px) {\n  #today_details > .today_details_header > :first-child {\n    /* flex: none; */\n    /* optional */\n  }\n\n  #today_details > .today_details_container {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 2rem;\n    row-gap: 1rem;\n    padding: 2rem;\n  }\n\n  #today_details > .today_details_container > ul {\n    column-gap: 1.5rem;\n    padding: 2rem;\n  }\n}\n"],"sourceRoot":""}]);
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
      appWrapper.appendChild(build.footer());

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
  cacheDOM() {
    console.log('cacheDOM() running from home.js');
  },
  bindEvents() {
    console.log('bindEvents() running from home.js');
  },
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
  cacheDOM() {
    console.log('cacheDOM() running from loading.js');
  },
  bindEvents() {
    console.log('bindEvents() running from loading.js');
  },
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
    //   {
    //     element: 'div',
    //     attributes: {
    //       class: 'unit_systems_buttons',
    //     },
    //     children: [
    //       {
    //         element: 'button',
    //         attributes: {
    //           id: 'imperial',
    //           class: 'unit_systems_button selected',
    //           type: 'button',
    //           value: 'imperial',
    //           // textContent: '°F',
    //         },
    //       },
    //       {
    //         element: 'button',
    //         attributes: {
    //           id: 'metric',
    //           class: 'unit_systems_button',
    //           type: 'button',
    //           value: 'metric',
    //           // textContent: '°C',
    //         },
    //       },
    //     ],
    //   },
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
    // this.unitSystemsBtns = navElement.querySelectorAll('.unit_systems_button');
    this.unitSystemsBtn = navElement.querySelector('#unit_systems_button');
  },
  bindEvents() {
    this.toggleNav = this.toggleNav.bind(this);
    // this.setUnitSystem = this.setUnitSystem.bind(this);
    this.navBtn.addEventListener('click', this.toggleNav);
    // this.unitSystemsBtns.forEach((btn) => btn.addEventListener('click', this.setUnitSystem));
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
  // setUnitSystem(e) {
  //   const element = e.currentTarget;
  //   [...this.unitSystemsBtns]
  //     .find((btn) => btn.classList.contains('selected'))
  //     .classList.remove('selected');
  //   element.classList.add('selected');
  //   pubSub.publish('setUnitSystem', element.value);
  // },
  toggleUnitSystem(e) {
    const element = e.currentTarget;
    console.log(element);
    console.log(typeof element.value);
    let newValue = true;
    let unitSystem = 'imperial';
    if (element.value === 'true') {
      newValue = false;
      unitSystem = 'metric';
    }
    element.value = newValue;
    _containers_pubSub__WEBPACK_IMPORTED_MODULE_3__["default"].publish('setUnitSystem', unitSystem);
    // pubSub.publish('setUnitSystem', element.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTywrRkFBK0YsTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLFVBQVUsTUFBTSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sVUFBVSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sVUFBVSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sTUFBTSxPQUFPLE1BQU0sT0FBTyxNQUFNLE1BQU0sU0FBUyxNQUFNLE1BQU0sTUFBTSxZQUFZLFFBQVEsTUFBTSxZQUFZLFFBQVEsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxNQUFNLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsTUFBTSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxVQUFVLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLFVBQVUsS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1B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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0RkFBNEYsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFP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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9AaWNvbmZ1L3N2Zy1pbmplY3QvZGlzdC9zdmctaW5qZWN0LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvYXBwLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9jb250ZW50LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9lcnJvci5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvZm9vdGVyLmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2hvbWUuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2xvYWRpbmcuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvZm9yZWNhc3QuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvaG91cmx5LmNzcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy90YWJzL3RhYnMuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvdG9kYXkuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9jb250ZW50LmNzcz8zZGJhIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2Vycm9yLmNzcz8xMTQzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL2Zvb3Rlci5jc3M/N2U5MiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzP2U2OGIiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvaG9tZS5jc3M/NGI1MSIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL3N0eWxlcy9sb2FkaW5nLmNzcz85YzFiIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvZm9yZWNhc3QuY3NzPzA4YWIiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvdGFicy9ob3VybHkuY3NzPzhiMzAiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9zdHlsZXMvdGFicy90YWJzLmNzcz9kNWQ4Iiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL3RhYnMvdG9kYXkuY3NzPzJlN2QiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvZXJyb3IvZXJyb3IuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9ob21lL2hvbWUuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9ob21lL2hvbWUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbWFpbi9tYWluLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy9mb3JlY2FzdC9mb3JlY2FzdC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvZm9yZWNhc3QvZm9yZWNhc3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvaG91cmx5L2hvdXJseS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvaG91cmx5L2hvdXJseS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnNfbmF2YmFyL3RhYnNfbmF2YmFyLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90YWJzX25hdmJhci90YWJzX25hdmJhci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90b2RheS90b2RheS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdG9kYXkvdG9kYXkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdW5pdHN5c3RlbXMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL2FwaV9jb250cm9sbGVyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29udGFpbmVycy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2NyZWF0ZUNvbnRlbnRSb3dzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9mb3JtYXREYXRlLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9mb3JtYXRUaW1lLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvaGVscGVycy9pbXBvcnRBbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTVkdJbmplY3QgLSBWZXJzaW9uIDEuMi4zXG4gKiBBIHRpbnksIGludHVpdGl2ZSwgcm9idXN0LCBjYWNoaW5nIHNvbHV0aW9uIGZvciBpbmplY3RpbmcgU1ZHIGZpbGVzIGlubGluZSBpbnRvIHRoZSBET00uXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IElOQ09SUywgdGhlIGNyZWF0b3JzIG9mIGljb25mdS5jb21cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAvLyBjb25zdGFudHMgZm9yIGJldHRlciBtaW5pZmljYXRpb25cbiAgdmFyIF9DUkVBVEVfRUxFTUVOVF8gPSAnY3JlYXRlRWxlbWVudCc7XG4gIHZhciBfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FXyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSc7XG4gIHZhciBfTEVOR1RIXyA9ICdsZW5ndGgnO1xuICB2YXIgX1NUWUxFXyA9ICdzdHlsZSc7XG4gIHZhciBfVElUTEVfID0gJ3RpdGxlJztcbiAgdmFyIF9VTkRFRklORURfID0gJ3VuZGVmaW5lZCc7XG4gIHZhciBfU0VUX0FUVFJJQlVURV8gPSAnc2V0QXR0cmlidXRlJztcbiAgdmFyIF9HRVRfQVRUUklCVVRFXyA9ICdnZXRBdHRyaWJ1dGUnO1xuXG4gIHZhciBOVUxMID0gbnVsbDtcblxuICAvLyBjb25zdGFudHNcbiAgdmFyIF9fU1ZHSU5KRUNUID0gJ19fc3ZnSW5qZWN0JztcbiAgdmFyIElEX1NVRkZJWCA9ICctLWluamVjdC0nO1xuICB2YXIgSURfU1VGRklYX1JFR0VYID0gbmV3IFJlZ0V4cChJRF9TVUZGSVggKyAnXFxcXGQrJywgXCJnXCIpO1xuICB2YXIgTE9BRF9GQUlMID0gJ0xPQURfRkFJTCc7XG4gIHZhciBTVkdfTk9UX1NVUFBPUlRFRCA9ICdTVkdfTk9UX1NVUFBPUlRFRCc7XG4gIHZhciBTVkdfSU5WQUxJRCA9ICdTVkdfSU5WQUxJRCc7XG4gIHZhciBBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTID0gWydzcmMnLCAnYWx0JywgJ29ubG9hZCcsICdvbmVycm9yJ107XG4gIHZhciBBX0VMRU1FTlQgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXSgnYScpO1xuICB2YXIgSVNfU1ZHX1NVUFBPUlRFRCA9IHR5cGVvZiBTVkdSZWN0ICE9IF9VTkRFRklORURfO1xuICB2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHVzZUNhY2hlOiB0cnVlLFxuICAgIGNvcHlBdHRyaWJ1dGVzOiB0cnVlLFxuICAgIG1ha2VJZHNVbmlxdWU6IHRydWVcbiAgfTtcbiAgLy8gTWFwIG9mIElSSSByZWZlcmVuY2VhYmxlIHRhZyBuYW1lcyB0byBwcm9wZXJ0aWVzIHRoYXQgY2FuIHJlZmVyZW5jZSB0aGVtLiBUaGlzIGlzIGRlZmluZWQgaW5cbiAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzExL2xpbmtpbmcuaHRtbCNwcm9jZXNzaW5nSVJJXG4gIHZhciBJUklfVEFHX1BST1BFUlRJRVNfTUFQID0ge1xuICAgIGNsaXBQYXRoOiBbJ2NsaXAtcGF0aCddLFxuICAgICdjb2xvci1wcm9maWxlJzogTlVMTCxcbiAgICBjdXJzb3I6IE5VTEwsXG4gICAgZmlsdGVyOiBOVUxMLFxuICAgIGxpbmVhckdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgbWFya2VyOiBbJ21hcmtlcicsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0J10sXG4gICAgbWFzazogTlVMTCxcbiAgICBwYXR0ZXJuOiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgcmFkaWFsR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXVxuICB9O1xuICB2YXIgSU5KRUNURUQgPSAxO1xuICB2YXIgRkFJTCA9IDI7XG5cbiAgdmFyIHVuaXF1ZUlkQ291bnRlciA9IDE7XG4gIHZhciB4bWxTZXJpYWxpemVyO1xuICB2YXIgZG9tUGFyc2VyO1xuXG5cbiAgLy8gY3JlYXRlcyBhbiBTVkcgZG9jdW1lbnQgZnJvbSBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cikge1xuICAgIGRvbVBhcnNlciA9IGRvbVBhcnNlciB8fCBuZXcgRE9NUGFyc2VyKCk7XG4gICAgcmV0dXJuIGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnU3RyLCAndGV4dC94bWwnKTtcbiAgfVxuXG5cbiAgLy8gc2VhcmlhbGl6ZXMgYW4gU1ZHIGVsZW1lbnQgdG8gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbWVudCkge1xuICAgIHhtbFNlcmlhbGl6ZXIgPSB4bWxTZXJpYWxpemVyIHx8IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoc3ZnRWxlbWVudCk7XG4gIH1cblxuXG4gIC8vIFJldHVybnMgdGhlIGFic29sdXRlIHVybCBmb3IgdGhlIHNwZWNpZmllZCB1cmxcbiAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVVcmwodXJsKSB7XG4gICAgQV9FTEVNRU5ULmhyZWYgPSB1cmw7XG4gICAgcmV0dXJuIEFfRUxFTUVOVC5ocmVmO1xuICB9XG5cblxuICAvLyBMb2FkIHN2ZyB3aXRoIGFuIFhIUiByZXF1ZXN0XG4gIGZ1bmN0aW9uIGxvYWRTdmcodXJsLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAvLyByZWFkeVN0YXRlIGlzIERPTkVcbiAgICAgICAgICB2YXIgc3RhdHVzID0gcmVxLnN0YXR1cztcbiAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgT0tcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVhNTCwgcmVxLnJlc3BvbnNlVGV4dC50cmltKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgZXJyb3IgKDR4eCBvciA1eHgpXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgMCBjYW4gaW5kaWNhdGUgYSBmYWlsZWQgY3Jvc3MtZG9tYWluIGNhbGxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cblxuICAvLyBDb3B5IGF0dHJpYnV0ZXMgZnJvbSBpbWcgZWxlbWVudCB0byBzdmcgZWxlbWVudFxuICBmdW5jdGlvbiBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKSB7XG4gICAgdmFyIGF0dHJpYnV0ZTtcbiAgICB2YXIgYXR0cmlidXRlTmFtZTtcbiAgICB2YXIgYXR0cmlidXRlVmFsdWU7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbWdFbGVtLmF0dHJpYnV0ZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgLy8gT25seSBjb3B5IGF0dHJpYnV0ZXMgbm90IGV4cGxpY2l0bHkgZXhjbHVkZWQgZnJvbSBjb3B5aW5nXG4gICAgICBpZiAoQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUy5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID09IC0xKSB7XG4gICAgICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAvLyBJZiBpbWcgYXR0cmlidXRlIGlzIFwidGl0bGVcIiwgaW5zZXJ0IGEgdGl0bGUgZWxlbWVudCBpbnRvIFNWRyBlbGVtZW50XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09IF9USVRMRV8pIHtcbiAgICAgICAgICB2YXIgdGl0bGVFbGVtO1xuICAgICAgICAgIHZhciBmaXJzdEVsZW1lbnRDaGlsZCA9IHN2Z0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudENoaWxkICYmIGZpcnN0RWxlbWVudENoaWxkLmxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpID09IF9USVRMRV8pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGlzIGEgdGl0bGUgZWxlbWVudCwga2VlcCBpdCBhcyB0aGUgdGl0bGUgZWxlbWVudFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGVsZW1lbnQgaXMgbm90IGEgdGl0bGUgZWxlbWVudCwgY3JlYXRlIGEgbmV3IHRpdGxlXG4gICAgICAgICAgICAvLyBlbGUsZW10IGFuZCBzZXQgaXQgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfICsgJ05TJ10oJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgX1RJVExFXyk7XG4gICAgICAgICAgICBzdmdFbGVtLmluc2VydEJlZm9yZSh0aXRsZUVsZW0sIGZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2V0IG5ldyB0aXRsZSBjb250ZW50XG4gICAgICAgICAgdGl0bGVFbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2V0IGltZyBhdHRyaWJ1dGUgdG8gc3ZnIGVsZW1lbnRcbiAgICAgICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGFwcGVuZHMgYSBzdWZmaXggdG8gSURzIG9mIHJlZmVyZW5jZWQgZWxlbWVudHMgaW4gdGhlIDxkZWZzPiBpbiBvcmRlciB0byAgdG8gYXZvaWQgSUQgY29sbGlzaW9uXG4gIC8vIGJldHdlZW4gbXVsdGlwbGUgaW5qZWN0ZWQgU1ZHcy4gVGhlIHN1ZmZpeCBoYXMgdGhlIGZvcm0gXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYSBydW5uaW5nIG51bWJlciB3aGljaCBpc1xuICAvLyBpbmNyZW1lbnRlZCB3aXRoIGVhY2ggaW5qZWN0aW9uLiBSZWZlcmVuY2VzIHRvIHRoZSBJRHMgYXJlIGFkanVzdGVkIGFjY29yZGluZ2x5LlxuICAvLyBXZSBhc3N1bWUgdGhhIGFsbCBJRHMgd2l0aGluIHRoZSBpbmplY3RlZCBTVkcgYXJlIHVuaXF1ZSwgdGhlcmVmb3JlIHRoZSBzYW1lIHN1ZmZpeCBjYW4gYmUgdXNlZCBmb3IgYWxsIElEcyBvZiBvbmVcbiAgLy8gaW5qZWN0ZWQgU1ZHLlxuICAvLyBJZiB0aGUgb25seVJlZmVyZW5jZWQgYXJndW1lbnQgaXMgc2V0IHRvIHRydWUsIG9ubHkgdGhvc2UgSURzIHdpbGwgYmUgbWFkZSB1bmlxdWUgdGhhdCBhcmUgcmVmZXJlbmNlZCBmcm9tIHdpdGhpbiB0aGUgU1ZHXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgb25seVJlZmVyZW5jZWQpIHtcbiAgICB2YXIgaWRTdWZmaXggPSBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKztcbiAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gZm9yIGZ1bmN0aW9uYWwgbm90YXRpb25zIG9mIGFuIElSSSByZWZlcmVuY2VzLiBUaGlzIHdpbGwgZmluZCBvY2N1cmVuY2VzIGluIHRoZSBmb3JtXG4gICAgLy8gdXJsKCNhbnlJZCkgb3IgdXJsKFwiI2FueUlkXCIpIChmb3IgSW50ZXJuZXQgRXhwbG9yZXIpIGFuZCBjYXB0dXJlIHRoZSByZWZlcmVuY2VkIElEXG4gICAgdmFyIGZ1bmNJcmlSZWdleCA9IC91cmxcXChcIj8jKFthLXpBLVpdW1xcdzouLV0qKVwiP1xcKS9nO1xuICAgIC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBhbiBJRC4gVGhlIFNWRyBzcGVjIHJlY29tbWVuZHMgdG8gcHV0IHJlZmVyZW5jZWQgZWxlbWVudHMgaW5zaWRlIDxkZWZzPiBlbGVtZW50cywgYnV0XG4gICAgLy8gdGhpcyBpcyBub3QgYSByZXF1aXJlbWVudCwgdGhlcmVmb3JlIHdlIGhhdmUgdG8gc2VhcmNoIGZvciBJRHMgaW4gdGhlIHdob2xlIFNWRy5cbiAgICB2YXIgaWRFbGVtZW50cyA9IHN2Z0VsZW0ucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgIHZhciBpZEVsZW07XG4gICAgLy8gQW4gb2JqZWN0IGNvbnRhaW5pbmcgcmVmZXJlbmNlZCBJRHMgIGFzIGtleXMgaXMgdXNlZCBpZiBvbmx5IHJlZmVyZW5jZWQgSURzIHNob3VsZCBiZSB1bmlxdWlmaWVkLlxuICAgIC8vIElmIHRoaXMgb2JqZWN0IGRvZXMgbm90IGV4aXN0LCBhbGwgSURzIHdpbGwgYmUgdW5pcXVpZmllZC5cbiAgICB2YXIgcmVmZXJlbmNlZElkcyA9IG9ubHlSZWZlcmVuY2VkID8gW10gOiBOVUxMO1xuICAgIHZhciB0YWdOYW1lO1xuICAgIHZhciBpcmlUYWdOYW1lcyA9IHt9O1xuICAgIHZhciBpcmlQcm9wZXJ0aWVzID0gW107XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgaSwgajtcblxuICAgIGlmIChpZEVsZW1lbnRzW19MRU5HVEhfXSkge1xuICAgICAgLy8gTWFrZSBhbGwgSURzIHVuaXF1ZSBieSBhZGRpbmcgdGhlIElEIHN1ZmZpeCBhbmQgY29sbGVjdCBhbGwgZW5jb3VudGVyZWQgdGFnIG5hbWVzXG4gICAgICAvLyB0aGF0IGFyZSBJUkkgcmVmZXJlbmNlYWJsZSBmcm9tIHByb3Blcml0aWVzLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgdGFnTmFtZSA9IGlkRWxlbWVudHNbaV0ubG9jYWxOYW1lOyAvLyBVc2Ugbm9uLW5hbWVzcGFjZWQgdGFnIG5hbWVcbiAgICAgICAgLy8gTWFrZSBJRCB1bmlxdWUgaWYgdGFnIG5hbWUgaXMgSVJJIHJlZmVyZW5jZWFibGVcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gSVJJX1RBR19QUk9QRVJUSUVTX01BUCkge1xuICAgICAgICAgIGlyaVRhZ05hbWVzW3RhZ05hbWVdID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR2V0IGFsbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG1hcHBlZCB0byB0aGUgZm91bmQgSVJJIHJlZmVyZW5jZWFibGUgdGFnc1xuICAgICAgZm9yICh0YWdOYW1lIGluIGlyaVRhZ05hbWVzKSB7XG4gICAgICAgIChJUklfVEFHX1BST1BFUlRJRVNfTUFQW3RhZ05hbWVdIHx8IFt0YWdOYW1lXSkuZm9yRWFjaChmdW5jdGlvbiAobWFwcGVkUHJvcGVydHkpIHtcbiAgICAgICAgICAvLyBBZGQgbWFwcGVkIHByb3BlcnRpZXMgdG8gYXJyYXkgb2YgaXJpIHJlZmVyZW5jaW5nIHByb3BlcnRpZXMuXG4gICAgICAgICAgLy8gVXNlIGxpbmVhciBzZWFyY2ggaGVyZSBiZWNhdXNlIHRoZSBudW1iZXIgb2YgcG9zc2libGUgZW50cmllcyBpcyB2ZXJ5IHNtYWxsIChtYXhpbXVtIDExKVxuICAgICAgICAgIGlmIChpcmlQcm9wZXJ0aWVzLmluZGV4T2YobWFwcGVkUHJvcGVydHkpIDwgMCkge1xuICAgICAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKG1hcHBlZFByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIEFkZCBcInN0eWxlXCIgdG8gcHJvcGVydGllcywgYmVjYXVzZSBpdCBtYXkgY29udGFpbiByZWZlcmVuY2VzIGluIHRoZSBmb3JtICdzdHlsZT1cImZpbGw6dXJsKCNteUZpbGwpXCInXG4gICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChfU1RZTEVfKTtcbiAgICAgIH1cbiAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgU1ZHIGFuZCByZXBsYWNlIElEcyBpbiByZWZlcmVuY2VzLlxuICAgICAgLy8gVG8gZ2V0IGFsbCBkZXNjZW5kaW5nIGVsZW1lbnRzLCBnZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIHNlZW1zIHRvIHBlcmZvcm0gZmFzdGVyIHRoYW4gcXVlcnlTZWxlY3RvckFsbCgnKicpLlxuICAgICAgLy8gU2luY2Ugc3ZnRWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIGRvZXMgbm90IHJldHVybiB0aGUgc3ZnIGVsZW1lbnQgaXRzZWxmLCB3ZSBoYXZlIHRvIGhhbmRsZSBpdCBzZXBhcmF0ZWx5LlxuICAgICAgdmFyIGRlc2NFbGVtZW50cyA9IHN2Z0VsZW1bX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCcqJyk7XG4gICAgICB2YXIgZWxlbWVudCA9IHN2Z0VsZW07XG4gICAgICB2YXIgcHJvcGVydHlOYW1lO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIG5ld1ZhbHVlO1xuICAgICAgZm9yIChpID0gLTE7IGVsZW1lbnQgIT0gTlVMTDspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09IF9TVFlMRV8pIHtcbiAgICAgICAgICAvLyBJZiBlbGVtZW50IGlzIGEgc3R5bGUgZWxlbWVudCwgcmVwbGFjZSBJRHMgaW4gYWxsIG9jY3VyZW5jZXMgb2YgXCJ1cmwoI2FueUlkKVwiIGluIHRleHQgY29udGVudFxuICAgICAgICAgIHZhbHVlID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIHByb3BlcnR5IG5hbWVzIGZvciB3aGljaCBJRHMgd2VyZSBmb3VuZFxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXTsgaisrKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBpcmlQcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgdmFsdWUgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlcGxhY2UgSURzIGluIHhsaW5rOnJlZiBhbmQgaHJlZiBhdHRyaWJ1dGVzXG4gICAgICAgICAgWyd4bGluazpocmVmJywgJ2hyZWYnXS5mb3JFYWNoKGZ1bmN0aW9uKHJlZkF0dHJOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaXJpID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lKTtcbiAgICAgICAgICAgIGlmICgvXlxccyojLy50ZXN0KGlyaSkpIHsgLy8gQ2hlY2sgaWYgaXJpIGlzIG5vbi1udWxsIGFuZCBpbnRlcm5hbCByZWZlcmVuY2VcbiAgICAgICAgICAgICAgaXJpID0gaXJpLnRyaW0oKTtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lLCBpcmkgKyBpZFN1ZmZpeCk7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIElEIHRvIHJlZmVyZW5jZWQgSURzXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpcmkuc3Vic3RyaW5nKDEpXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZGVzY0VsZW1lbnRzWysraV07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICBpZEVsZW0gPSBpZEVsZW1lbnRzW2ldO1xuICAgICAgICAvLyBJZiBzZXQgb2YgcmVmZXJlbmNlZCBJRHMgZXhpc3RzLCBtYWtlIG9ubHkgcmVmZXJlbmNlZCBJRHMgdW5pcXVlLFxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSBhbGwgSURzIHVuaXF1ZS5cbiAgICAgICAgaWYgKCFyZWZlcmVuY2VkSWRzIHx8IHJlZmVyZW5jZWRJZHNbaWRFbGVtLmlkXSkge1xuICAgICAgICAgIC8vIEFkZCBzdWZmaXggdG8gZWxlbWVudCdzIElEXG4gICAgICAgICAgaWRFbGVtLmlkICs9IGlkU3VmZml4O1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiB0cnVlIGlmIFNWRyBlbGVtZW50IGhhcyBjaGFuZ2VkXG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH1cblxuXG4gIC8vIEZvciBjYWNoZWQgU1ZHcyB0aGUgSURzIGFyZSBtYWRlIHVuaXF1ZSBieSBzaW1wbHkgcmVwbGFjaW5nIHRoZSBhbHJlYWR5IGluc2VydGVkIHVuaXF1ZSBJRHMgd2l0aCBhXG4gIC8vIGhpZ2hlciBJRCBjb3VudGVyLiBUaGlzIGlzIG11Y2ggbW9yZSBwZXJmb3JtYW50IHRoYW4gYSBjYWxsIHRvIG1ha2VJZHNVbmlxdWUoKS5cbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZUNhY2hlZChzdmdTdHJpbmcpIHtcbiAgICByZXR1cm4gc3ZnU3RyaW5nLnJlcGxhY2UoSURfU1VGRklYX1JFR0VYLCBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKyk7XG4gIH1cblxuXG4gIC8vIEluamVjdCBTVkcgYnkgcmVwbGFjaW5nIHRoZSBpbWcgZWxlbWVudCB3aXRoIHRoZSBTVkcgZWxlbWVudCBpbiB0aGUgRE9NXG4gIGZ1bmN0aW9uIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoc3ZnRWxlbSkge1xuICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKCdkYXRhLWluamVjdC11cmwnLCBhYnNVcmwpO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBpbWdFbGVtLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3B5QXR0cmlidXRlcykge1xuICAgICAgICAgIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludm9rZSBiZWZvcmVJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGJlZm9yZUluamVjdCA9IG9wdGlvbnMuYmVmb3JlSW5qZWN0O1xuICAgICAgICB2YXIgaW5qZWN0RWxlbSA9IChiZWZvcmVJbmplY3QgJiYgYmVmb3JlSW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0pKSB8fCBzdmdFbGVtO1xuICAgICAgICAvLyBSZXBsYWNlIGltZyBlbGVtZW50IHdpdGggbmV3IGVsZW1lbnQuIFRoaXMgaXMgdGhlIGFjdHVhbCBpbmplY3Rpb24uXG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGluamVjdEVsZW0sIGltZ0VsZW0pO1xuICAgICAgICAvLyBNYXJrIGltZyBlbGVtZW50IGFzIGluamVjdGVkXG4gICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gSU5KRUNURUQ7XG4gICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICAgICAgLy8gSW52b2tlIGFmdGVySW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBhZnRlckluamVjdCA9IG9wdGlvbnMuYWZ0ZXJJbmplY3Q7XG4gICAgICAgIGlmIChhZnRlckluamVjdCkge1xuICAgICAgICAgIGFmdGVySW5qZWN0KGltZ0VsZW0sIGluamVjdEVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNZXJnZXMgYW55IG51bWJlciBvZiBvcHRpb25zIG9iamVjdHMgaW50byBhIG5ldyBvYmplY3RcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKCkge1xuICAgIHZhciBtZXJnZWRPcHRpb25zID0ge307XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBzcGVjaWZpZWQgb3B0aW9ucyBvYmplY3RzIGFuZCBhZGQgYWxsIHByb3BlcnRpZXMgdG8gdGhlIG5ldyBvcHRpb25zIG9iamVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50KSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIG1lcmdlZE9wdGlvbnNba2V5XSA9IGFyZ3VtZW50W2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG4gIH1cblxuXG4gIC8vIEFkZHMgdGhlIHNwZWNpZmllZCBDU1MgdG8gdGhlIGRvY3VtZW50J3MgPGhlYWQ+IGVsZW1lbnRcbiAgZnVuY3Rpb24gYWRkU3R5bGVUb0hlYWQoY3NzKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudFtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ2hlYWQnKVswXTtcbiAgICBpZiAoaGVhZCkge1xuICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oX1NUWUxFXyk7XG4gICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBCdWlsZHMgYW4gU1ZHIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gYnVpbGRTdmdFbGVtZW50KHN2Z1N0ciwgdmVyaWZ5KSB7XG4gICAgaWYgKHZlcmlmeSkge1xuICAgICAgdmFyIHN2Z0RvYztcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBTVkcgc3RyaW5nIHdpdGggRE9NUGFyc2VyXG4gICAgICAgIHN2Z0RvYyA9IHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICBpZiAoc3ZnRG9jW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgncGFyc2VyZXJyb3InKVtfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gRE9NUGFyc2VyIGRvZXMgbm90IHRocm93IGFuIGV4Y2VwdGlvbiwgYnV0IGluc3RlYWQgcHV0cyBwYXJzZXJlcnJvciB0YWdzIGluIHRoZSBkb2N1bWVudFxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdmdEb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gc3ZnU3RyO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBvbmxvYWQgYXR0cmlidXRlLiBTaG91bGQgb25seSBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgdW5zdHlsZWQgaW1hZ2UgZmxhc2ggcHJvdGVjdGlvbiBhbmRcbiAgICAvLyBtYWtlIHRoZSBlbGVtZW50IHZpc2libGUsIG5vdCBmb3IgcmVtb3ZpbmcgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgIGltZ0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdvbmxvYWQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZXJyb3JNZXNzYWdlKG1zZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NWR0luamVjdDogJyArIG1zZyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGZhaWwoaW1nRWxlbSwgc3RhdHVzLCBvcHRpb25zKSB7XG4gICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBGQUlMO1xuICAgIGlmIChvcHRpb25zLm9uRmFpbCkge1xuICAgICAgb3B0aW9ucy5vbkZhaWwoaW1nRWxlbSwgc3RhdHVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlKHN0YXR1cyk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfSU5WQUxJRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX05PVF9TVVBQT1JURUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgZmFpbChpbWdFbGVtLCBMT0FEX0ZBSUwsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKSB7XG4gICAgaW1nRWxlbS5vbmxvYWQgPSBOVUxMO1xuICAgIGltZ0VsZW0ub25lcnJvciA9IE5VTEw7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGltZ05vdFNldChtc2cpIHtcbiAgICBlcnJvck1lc3NhZ2UoJ25vIGltZyBlbGVtZW50Jyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNWR0luamVjdChnbG9iYWxOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgdmFyIHN2Z0xvYWRDYWNoZSA9IHt9O1xuXG4gICAgaWYgKElTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgIC8vIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFNWRywgYWRkIGEgc21hbGwgc3R5bGVzaGVldCB0aGF0IGhpZGVzIHRoZSA8aW1nPiBlbGVtZW50cyB1bnRpbFxuICAgICAgLy8gaW5qZWN0aW9uIGlzIGZpbmlzaGVkLiBUaGlzIGF2b2lkcyBzaG93aW5nIHRoZSB1bnN0eWxlZCBTVkdzIGJlZm9yZSBzdHlsZSBpcyBhcHBsaWVkLlxuICAgICAgYWRkU3R5bGVUb0hlYWQoJ2ltZ1tvbmxvYWRePVwiJyArIGdsb2JhbE5hbWUgKyAnKFwiXXt2aXNpYmlsaXR5OmhpZGRlbjt9Jyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTVkdJbmplY3RcbiAgICAgKlxuICAgICAqIEluamVjdHMgdGhlIFNWRyBzcGVjaWZpZWQgaW4gdGhlIGBzcmNgIGF0dHJpYnV0ZSBvZiB0aGUgc3BlY2lmaWVkIGBpbWdgIGVsZW1lbnQgb3IgYXJyYXkgb2YgYGltZ2BcbiAgICAgKiBlbGVtZW50cy4gUmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IHdoaWNoIHJlc29sdmVzIGlmIGFsbCBwYXNzZWQgaW4gYGltZ2AgZWxlbWVudHMgaGF2ZSBlaXRoZXIgYmVlblxuICAgICAqIGluamVjdGVkIG9yIGZhaWxlZCB0byBpbmplY3QgKE9ubHkgaWYgYSBnbG9iYWwgUHJvbWlzZSBvYmplY3QgaXMgYXZhaWxhYmxlIGxpa2UgaW4gYWxsIG1vZGVybiBicm93c2Vyc1xuICAgICAqIG9yIHRocm91Z2ggYSBwb2x5ZmlsbCkuXG4gICAgICpcbiAgICAgKiBPcHRpb25zOlxuICAgICAqIHVzZUNhY2hlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBTVkcgd2lsbCBiZSBjYWNoZWQgdXNpbmcgdGhlIGFic29sdXRlIFVSTC4gRGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAuXG4gICAgICogY29weUF0dHJpYnV0ZXM6IElmIHNldCB0byBgdHJ1ZWAgdGhlIGF0dHJpYnV0ZXMgd2lsbCBiZSBjb3BpZWQgZnJvbSBgaW1nYCB0byBgc3ZnYC4gRGZhdWx0IHZhbHVlXG4gICAgICogICAgIGlzIGB0cnVlYC5cbiAgICAgKiBtYWtlSWRzVW5pcXVlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBJRCBvZiBlbGVtZW50cyBpbiB0aGUgYDxkZWZzPmAgZWxlbWVudCB0aGF0IGNhbiBiZSByZWZlcmVuY2VzIGJ5XG4gICAgICogICAgIHByb3BlcnR5IHZhbHVlcyAoZm9yIGV4YW1wbGUgJ2NsaXBQYXRoJykgYXJlIG1hZGUgdW5pcXVlIGJ5IGFwcGVuZGluZyBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhXG4gICAgICogICAgIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGluY3JlYXNlcyB3aXRoIGVhY2ggaW5qZWN0aW9uLiBUaGlzIGlzIGRvbmUgdG8gYXZvaWQgZHVwbGljYXRlIElEcyBpbiB0aGUgRE9NLlxuICAgICAqIGJlZm9yZUxvYWQ6IEhvb2sgYmVmb3JlIFNWRyBpcyBsb2FkZWQuIFRoZSBgaW1nYCBlbGVtZW50IGlzIHBhc3NlZCBhcyBhIHBhcmFtZXRlci4gSWYgdGhlIGhvb2sgcmV0dXJuc1xuICAgICAqICAgICBhIHN0cmluZyBpdCBpcyB1c2VkIGFzIHRoZSBVUkwgaW5zdGVhZCBvZiB0aGUgYGltZ2AgZWxlbWVudCdzIGBzcmNgIGF0dHJpYnV0ZS5cbiAgICAgKiBhZnRlckxvYWQ6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGxvYWRlZC4gVGhlIGxvYWRlZCBgc3ZnYCBlbGVtZW50IGFuZCBgc3ZnYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhXG4gICAgICogICAgIHBhcmFtZXRlcnMuIElmIGNhY2hpbmcgaXMgYWN0aXZlIHRoaXMgaG9vayB3aWxsIG9ubHkgZ2V0IGNhbGxlZCBvbmNlIGZvciBpbmplY3RlZCBTVkdzIHdpdGggdGhlXG4gICAgICogICAgIHNhbWUgYWJzb2x1dGUgcGF0aC4gQ2hhbmdlcyB0byB0aGUgYHN2Z2AgZWxlbWVudCBpbiB0aGlzIGhvb2sgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBpbmplY3RlZCBTVkdzXG4gICAgICogICAgIHdpdGggdGhlIHNhbWUgYWJzb2x1dGUgcGF0aC4gSXQncyBhbHNvIHBvc3NpYmxlIHRvIHJldHVybiBhbiBgc3ZnYCBzdHJpbmcgb3IgYHN2Z2AgZWxlbWVudCB3aGljaFxuICAgICAqICAgICB3aWxsIHRoZW4gYmUgdXNlZCBmb3IgdGhlIGluamVjdGlvbi5cbiAgICAgKiBiZWZvcmVJbmplY3Q6IEhvb2sgYmVmb3JlIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuIElmXG4gICAgICogICAgIGFueSBodG1sIGVsZW1lbnQgaXMgcmV0dXJuZWQgaXQgZ2V0cyBpbmplY3RlZCBpbnN0ZWFkIG9mIGFwcGx5aW5nIHRoZSBkZWZhdWx0IFNWRyBpbmplY3Rpb24uXG4gICAgICogYWZ0ZXJJbmplY3Q6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy5cbiAgICAgKiBvbkFsbEZpbmlzaDogSG9vayBhZnRlciBhbGwgYGltZ2AgZWxlbWVudHMgcGFzc2VkIHRvIGFuIFNWR0luamVjdCgpIGNhbGwgaGF2ZSBlaXRoZXIgYmVlbiBpbmplY3RlZCBvclxuICAgICAqICAgICBmYWlsZWQgdG8gaW5qZWN0LlxuICAgICAqIG9uRmFpbDogSG9vayBhZnRlciBpbmplY3Rpb24gZmFpbHMuIFRoZSBgaW1nYCBlbGVtZW50IGFuZCBhIGBzdGF0dXNgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFuIHBhcmFtZXRlci5cbiAgICAgKiAgICAgVGhlIGBzdGF0dXNgIGNhbiBiZSBlaXRoZXIgYCdTVkdfTk9UX1NVUFBPUlRFRCdgICh0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRyksXG4gICAgICogICAgIGAnU1ZHX0lOVkFMSUQnYCAodGhlIFNWRyBpcyBub3QgaW4gYSB2YWxpZCBmb3JtYXQpIG9yIGAnTE9BRF9GQUlMRUQnYCAobG9hZGluZyBvZiB0aGUgU1ZHIGZhaWxlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50IG9yIGFuIGFycmF5IG9mIGltZyBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgd2l0aCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciB0aGlzIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTVkdJbmplY3QoaW1nLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIGFsbEZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvbkFsbEZpbmlzaCA9IG9wdGlvbnMub25BbGxGaW5pc2g7XG4gICAgICAgICAgaWYgKG9uQWxsRmluaXNoKSB7XG4gICAgICAgICAgICBvbkFsbEZpbmlzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW1nICYmIHR5cGVvZiBpbWdbX0xFTkdUSF9dICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgLy8gYW4gYXJyYXkgbGlrZSBzdHJ1Y3R1cmUgb2YgaW1nIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIGluamVjdEluZGV4ID0gMDtcbiAgICAgICAgICB2YXIgaW5qZWN0Q291bnQgPSBpbWdbX0xFTkdUSF9dO1xuXG4gICAgICAgICAgaWYgKGluamVjdENvdW50ID09IDApIHtcbiAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgrK2luamVjdEluZGV4ID09IGluamVjdENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5qZWN0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZ1tpXSwgb3B0aW9ucywgZmluaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb25seSBvbmUgaW1nIGVsZW1lbnRcbiAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZywgb3B0aW9ucywgYWxsRmluaXNoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gcmV0dXJuIGEgUHJvbWlzZSBvYmplY3QgaWYgZ2xvYmFsbHkgYXZhaWxhYmxlXG4gICAgICByZXR1cm4gdHlwZW9mIFByb21pc2UgPT0gX1VOREVGSU5FRF8gPyBydW4oKSA6IG5ldyBQcm9taXNlKHJ1bik7XG4gICAgfVxuXG5cbiAgICAvLyBJbmplY3RzIGEgc2luZ2xlIHN2ZyBlbGVtZW50LiBPcHRpb25zIG11c3QgYmUgYWxyZWFkeSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zLlxuICAgIGZ1bmN0aW9uIFNWR0luamVjdEVsZW1lbnQoaW1nRWxlbSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChpbWdFbGVtKSB7XG4gICAgICAgIHZhciBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSA9IGltZ0VsZW1bX19TVkdJTkpFQ1RdO1xuICAgICAgICBpZiAoIXN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEludm9rZSBiZWZvcmVMb2FkIGhvb2sgaWYgc2V0LiBJZiB0aGUgYmVmb3JlTG9hZCByZXR1cm5zIGEgdmFsdWUgdXNlIGl0IGFzIHRoZSBzcmMgZm9yIHRoZSBsb2FkXG4gICAgICAgICAgLy8gVVJMIHBhdGguIEVsc2UgdXNlIHRoZSBpbWdFbGVtJ3Mgc3JjIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YXIgYmVmb3JlTG9hZCA9IG9wdGlvbnMuYmVmb3JlTG9hZDtcbiAgICAgICAgICB2YXIgc3JjID0gKGJlZm9yZUxvYWQgJiYgYmVmb3JlTG9hZChpbWdFbGVtKSkgfHwgaW1nRWxlbVtfR0VUX0FUVFJJQlVURV9dKCdzcmMnKTtcblxuICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAvLyBJZiBubyBpbWFnZSBzcmMgYXR0cmlidXRlIGlzIHNldCBkbyBubyBpbmplY3Rpb24uIFRoaXMgY2FuIG9ubHkgYmUgcmVhY2hlZCBieSB1c2luZyBqYXZhc2NyaXB0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGlmIG5vIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IHRoZSBvbmxvYWQgYW5kIG9uZXJyb3IgZXZlbnRzIGRvIG5vdCBnZXQgY2FsbGVkXG4gICAgICAgICAgICBpZiAoc3JjID09PSAnJykge1xuICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IGFycmF5IHNvIGxhdGVyIGNhbGxzIGNhbiByZWdpc3RlciBjYWxsYmFja3NcbiAgICAgICAgICB2YXIgb25GaW5pc2hDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IG9uRmluaXNoQ2FsbGJhY2tzO1xuXG4gICAgICAgICAgdmFyIG9uRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihvbkZpbmlzaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYWJzVXJsID0gZ2V0QWJzb2x1dGVVcmwoc3JjKTtcbiAgICAgICAgICB2YXIgdXNlQ2FjaGVPcHRpb24gPSBvcHRpb25zLnVzZUNhY2hlO1xuICAgICAgICAgIHZhciBtYWtlSWRzVW5pcXVlT3B0aW9uID0gb3B0aW9ucy5tYWtlSWRzVW5pcXVlO1xuICAgICAgICAgIFxuICAgICAgICAgIHZhciBzZXRTdmdMb2FkQ2FjaGVWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdLmZvckVhY2goZnVuY3Rpb24oc3ZnTG9hZCkge1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQodmFsKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBzdmdMb2FkID0gc3ZnTG9hZENhY2hlW2Fic1VybF07XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVMb2FkVmFsdWUgPSBmdW5jdGlvbihsb2FkVmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRWYWx1ZSA9PT0gTE9BRF9GQUlMKSB7XG4gICAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9hZFZhbHVlID09PSBTVkdfSU5WQUxJRCkge1xuICAgICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IGxvYWRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnU3RyaW5nID0gbG9hZFZhbHVlWzFdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBsb2FkVmFsdWVbMl07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW07XG5cbiAgICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgaWYgKGhhc1VuaXF1ZUlkcyA9PT0gTlVMTCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJRHMgZm9yIHRoZSBTVkcgc3RyaW5nIGhhdmUgbm90IGJlZW4gbWFkZSB1bmlxdWUgYmVmb3JlLiBUaGlzIG1heSBoYXBwZW4gaWYgcHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5qZWN0aW9uIG9mIGEgY2FjaGVkIFNWRyBoYXZlIGJlZW4gcnVuIHdpdGggdGhlIG9wdGlvbiBtYWtlZElkc1VuaXF1ZSBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzBdID0gaGFzVW5pcXVlSWRzO1xuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMl0gPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNVbmlxdWVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBJRHMgdW5pcXVlIGZvciBhbHJlYWR5IGNhY2hlZCBTVkdzIHdpdGggYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IG1ha2VJZHNVbmlxdWVDYWNoZWQodW5pcXVlSWRzU3ZnU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gc3ZnRWxlbSB8fCBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdmdMb2FkICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgICAgIC8vIFZhbHVlIGZvciB1cmwgZXhpc3RzIGluIGNhY2hlXG4gICAgICAgICAgICAgIGlmIChzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbWUgdXJsIGhhcyBiZWVuIGNhY2hlZCwgYnV0IHZhbHVlIGhhcyBub3QgYmVlbiBsb2FkZWQgeWV0LCBzbyBhZGQgdG8gY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgc3ZnTG9hZC5wdXNoKGhhbmRsZUxvYWRWYWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTG9hZFZhbHVlKHN2Z0xvYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzdmdMb2FkID0gW107XG4gICAgICAgICAgICAgIC8vIHNldCBwcm9wZXJ0eSBpc0NhbGxiYWNrUXVldWUgdG8gQXJyYXkgdG8gZGlmZmVyZW50aWF0ZSBmcm9tIGFycmF5IHdpdGggY2FjaGVkIGxvYWRlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUgPSB0cnVlO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHN2Z0xvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTG9hZCB0aGUgU1ZHIGJlY2F1c2UgaXQgaXMgbm90IGNhY2hlZCBvciBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgICAgbG9hZFN2ZyhhYnNVcmwsIGZ1bmN0aW9uKHN2Z1htbCwgc3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIFhNTCBmcm9tIHRoZSBYSFIgcmVxdWVzdCBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEb2N1bWVudC4gT3RoZXJ3aXNlXG4gICAgICAgICAgICAvLyAoZm9yIGV4YW1wbGUgb2YgSUU5KSwgY3JlYXRlIHRoZSBzdmcgZG9jdW1lbnQgZnJvbSB0aGUgc3ZnIHN0cmluZy5cbiAgICAgICAgICAgIHZhciBzdmdFbGVtID0gc3ZnWG1sIGluc3RhbmNlb2YgRG9jdW1lbnQgPyBzdmdYbWwuZG9jdW1lbnRFbGVtZW50IDogYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBhZnRlckxvYWQgPSBvcHRpb25zLmFmdGVyTG9hZDtcbiAgICAgICAgICAgIGlmIChhZnRlckxvYWQpIHtcbiAgICAgICAgICAgICAgLy8gSW52b2tlIGFmdGVyTG9hZCBob29rIHdoaWNoIG1heSBtb2RpZnkgdGhlIFNWRyBlbGVtZW50LiBBZnRlciBsb2FkIG1heSBhbHNvIHJldHVybiBhIG5ld1xuICAgICAgICAgICAgICAvLyBzdmcgZWxlbWVudCBvciBzdmcgc3RyaW5nXG4gICAgICAgICAgICAgIHZhciBzdmdFbGVtT3JTdmdTdHJpbmcgPSBhZnRlckxvYWQoc3ZnRWxlbSwgc3ZnU3RyaW5nKSB8fCBzdmdFbGVtO1xuICAgICAgICAgICAgICBpZiAoc3ZnRWxlbU9yU3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN2Z0VsZW0gYW5kIHN2Z1N0cmluZyBiZWNhdXNlIG9mIG1vZGlmaWNhdGlvbnMgdG8gdGhlIFNWRyBlbGVtZW50IG9yIFNWRyBzdHJpbmcgaW5cbiAgICAgICAgICAgICAgICAvLyB0aGUgYWZ0ZXJMb2FkIGhvb2ssIHNvIHRoZSBtb2RpZmllZCBTVkcgaXMgYWxzbyB1c2VkIGZvciBhbGwgbGF0ZXIgY2FjaGVkIGluamVjdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2Ygc3ZnRWxlbU9yU3ZnU3RyaW5nID09ICdzdHJpbmcnO1xuICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IGlzU3RyaW5nID8gc3ZnRWxlbU9yU3ZnU3RyaW5nIDogc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBpc1N0cmluZyA/IGJ1aWxkU3ZnRWxlbWVudChzdmdFbGVtT3JTdmdTdHJpbmcsIHRydWUpIDogc3ZnRWxlbU9yU3ZnU3RyaW5nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdmdFbGVtIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gTlVMTDtcbiAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIC8vIHNldCBhbiBhcnJheSB3aXRoIHRocmVlIGVudHJpZXMgdG8gdGhlIGxvYWQgY2FjaGVcbiAgICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShbaGFzVW5pcXVlSWRzLCBzdmdTdHJpbmcsIHVuaXF1ZUlkc1N2Z1N0cmluZ10pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShTVkdfSU5WQUxJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShMT0FEX0ZBSUwpO1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlIGlzIGFuIGFycmF5LiBJbmplY3Rpb24gaXMgbm90IGNvbXBsZXRlIHNvIHJlZ2lzdGVyIGNhbGxiYWNrXG4gICAgICAgICAgICBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBTVkdJbmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBhbiBpbmplY3Rpb24uXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfTtcblxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNWR0luamVjdFxuICAgIFNWR0luamVjdC5jcmVhdGUgPSBjcmVhdGVTVkdJbmplY3Q7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW4gb25lcnJvciBFdmVudCBvZiBhbiBgPGltZz5gIGVsZW1lbnQgdG8gaGFuZGxlIGNhc2VzIHdoZW4gdGhlIGxvYWRpbmcgdGhlIG9yaWdpbmFsIHNyYyBmYWlsc1xuICAgICAqIChmb3IgZXhhbXBsZSBpZiBmaWxlIGlzIG5vdCBmb3VuZCBvciBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRykuIFRoaXMgdHJpZ2dlcnMgYSBjYWxsIHRvIHRoZVxuICAgICAqIG9wdGlvbnMgb25GYWlsIGhvb2sgaWYgYXZhaWxhYmxlLiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB3aWxsIGJlIHNldCBhcyB0aGUgbmV3IHNyYyBhdHRyaWJ1dGVcbiAgICAgKiBmb3IgdGhlIGltZyBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZmFsbGJhY2tTcmNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIGZhbGxiYWNrIHNyY1xuICAgICAqL1xuICAgIFNWR0luamVjdC5lcnIgPSBmdW5jdGlvbihpbWcsIGZhbGxiYWNrU3JjKSB7XG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIGlmIChpbWdbX19TVkdJTkpFQ1RdICE9IEZBSUwpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWcpO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmYWxsYmFja1NyYykge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZmFsbGJhY2tTcmM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93W2dsb2JhbE5hbWVdID0gU1ZHSW5qZWN0O1xuXG4gICAgcmV0dXJuIFNWR0luamVjdDtcbiAgfVxuXG4gIHZhciBTVkdJbmplY3RJbnN0YW5jZSA9IGNyZWF0ZVNWR0luamVjdCgnU1ZHSW5qZWN0Jyk7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTVkdJbmplY3RJbnN0YW5jZTtcbiAgfVxufSkod2luZG93LCBkb2N1bWVudCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1MaWdodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1CbGFjay50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIC8qIGh0dHBzOi8vZm9udHMuZ29vZ2xlLmNvbS9zcGVjaW1lbi9Sb2JvdG8rQ29uZGVuc2VkICovXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICBmb250LXdlaWdodDogMzAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSk7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuOnJvb3Qge1xuICAtLWNvbG9yLWZvbnQtcHJpbWFyeTogIzAwMDAwMDtcbiAgLS1jb2xvci1mb250LXNlY29uZGFyeTogI2U4ZTllYjtcbiAgLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnk6ICMzMTM2Mzg7XG4gIC0tY29sb3ItYmFja2dyb3VuZC1zZWNvbmRhcnk6ICNmMDY1NDM7XG4gIC0tY29sb3ItYmFja2dyb3VuZC1kZWZhdWx0OiAjZmZmZmZmO1xuICAtLWNvbG9yLWFjY2VudDogI2YwOWQ1MTtcbiAgLS1jb2xvci1ib3gtc2hhZG93OiAjMDAwMDAwO1xufVxuXG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0tY29sb3ItZm9udC1zZWNvbmRhcnkpO1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbWluLWhlaWdodDogMTAwc3ZoO1xufVxuXG5ib2R5ID4gI3dlYXRoZXJfYXBwIHtcbiAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9hcHAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdURBQXVEO0VBQ3ZELCtCQUErQjtFQUMvQiw0Q0FBMEU7RUFDMUUsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLCtCQUErQjtFQUMvQiw0Q0FBMkU7RUFDM0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLCtCQUErQjtFQUMvQiw0Q0FBMEU7RUFDMUUsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QiwrQkFBK0I7RUFDL0IsbUNBQW1DO0VBQ25DLHFDQUFxQztFQUNyQyxtQ0FBbUM7RUFDbkMsdUJBQXVCO0VBQ3ZCLDJCQUEyQjtBQUM3Qjs7QUFFQTs7O0VBR0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpREFBaUQ7RUFDakQsa0NBQWtDO0VBQ2xDLHNDQUFzQztFQUN0QyxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixtQ0FBbUM7QUFDckNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJztcXG4gIHNyYzogdXJsKC4vYXNzZXRzL2ZvbnRzL1JvYm90b19Db25kZW5zZWQvc3RhdGljL1JvYm90b0NvbmRlbnNlZC1MaWdodC50dGYpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgc3JjOiB1cmwoLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGYpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xcbiAgc3JjOiB1cmwoLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLUJsYWNrLnR0Zik7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWNvbG9yLWZvbnQtcHJpbWFyeTogIzAwMDAwMDtcXG4gIC0tY29sb3ItZm9udC1zZWNvbmRhcnk6ICNlOGU5ZWI7XFxuICAtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeTogIzMxMzYzODtcXG4gIC0tY29sb3ItYmFja2dyb3VuZC1zZWNvbmRhcnk6ICNmMDY1NDM7XFxuICAtLWNvbG9yLWJhY2tncm91bmQtZGVmYXVsdDogI2ZmZmZmZjtcXG4gIC0tY29sb3ItYWNjZW50OiAjZjA5ZDUxO1xcbiAgLS1jb2xvci1ib3gtc2hhZG93OiAjMDAwMDAwO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWZvbnQtc2Vjb25kYXJ5KTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIEFyaWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIG1pbi1oZWlnaHQ6IDEwMHN2aDtcXG59XFxuXFxuYm9keSA+ICN3ZWF0aGVyX2FwcCB7XFxuICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMWZyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qICNtYWluX2NvbnRlbnQgKi9cbiNtYWluX2NvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQ6bm90KCNsb2FkaW5nKTpub3QoI2hvbWUpIHtcbiAgaGVpZ2h0OiBpbmhlcml0O1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpOyAqL1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jb250ZW50LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxrQkFBa0I7QUFDbEI7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsdURBQXVEO0VBQ3ZELGFBQWE7RUFDYixtQ0FBbUM7QUFDckNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogI21haW5fY29udGVudCAqL1xcbiNtYWluX2NvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkOm5vdCgjbG9hZGluZyk6bm90KCNob21lKSB7XFxuICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMWZyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNlcnJvciB7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbiNlcnJvciA+IGgyIHtcbiAgZm9udC1zaXplOiBjbGFtcCgzcmVtLCAzdncsIDVyZW0pO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2Vycm9yLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGlDQUFpQztBQUNuQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZXJyb3Ige1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI2Vycm9yID4gaDIge1xcbiAgZm9udC1zaXplOiBjbGFtcCgzcmVtLCAzdncsIDVyZW0pO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNmb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggNnB4IC0xcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XG59XG5cbiNmb290ZXIgPiBkaXYgPiBhOnZpc2l0ZWQge1xuICBjb2xvcjogdmFyKC0tY29sb3ItZm9udC1wcmltYXJ5KTtcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZm9vdGVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1EQUFtRDtFQUNuRCxlQUFlO0VBQ2YsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixvREFBb0Q7QUFDdEQ7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsc0NBQXNDO0FBQ3hDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNmb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA2cHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG59XFxuXFxuI2Zvb3RlciA+IGRpdiA+IGE6dmlzaXRlZCB7XFxuICBjb2xvcjogdmFyKC0tY29sb3ItZm9udC1wcmltYXJ5KTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIGluY2x1ZGVzIHNlbGVjdG9ycyBmb3IgbmF2YmFyLmpzIGFuZCBoZWFkZXIuanMgKi9cbiNoZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogMC4zcmVtO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGk6Zmlyc3Qtb2YtdHlwZSB7XG4gIC8qIHZhbHVlIG5lZWRzIHRvIGJlIGVxdWFsIHRvIC5uYXZfYnRuIHBhZGRpbmcgdmFsdWUgKi9cbiAgbWFyZ2luLXRvcDogMC4zcmVtO1xufVxuXG4vKiBvcHRpb25hbCAqL1xuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+ICo6bm90KDpmaXJzdC1jaGlsZCk6OmFmdGVyLFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+ICo6bm90KDpmaXJzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb250ZW50OiAnJztcbiAgaGVpZ2h0OiAxMDAlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDE4NywgNjkpO1xuICB6LWluZGV4OiAtMTtcbn1cblxuLyogb3B0aW9uYWwgKi9cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaTo6YWZ0ZXIge1xuICB3aWR0aDogMCU7XG4gIHRyYW5zZm9ybTogc2tld1goMGRlZyk7XG4gIHRyYW5zaXRpb246IGFsbCA1MDBtcyBlYXNlLWluLW91dDtcbn1cblxuLyogb3B0aW9uYWwgKi9cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaTpob3Zlcjo6YWZ0ZXIge1xuICB3aWR0aDogMTAwJTtcbiAgdHJhbnNmb3JtOiBza2V3WCg4ZGVnKSBzY2FsZVgoMS4wMyk7XG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpID4gYSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSA+IC5uYXZfbG9nbyA+IHN2ZyB7XG4gIHdpZHRoOiBjbGFtcCg1cmVtLCAzdncsIDUuNXJlbSk7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XG4gIHBhZGRpbmc6IDFyZW07XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogbWF4LWNvbnRlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQpO1xuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDVweCAwcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uOjpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6ICcnO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiAyO1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIHdpZHRoOiA1MCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyMTYsIDI1KTtcbiAgdHJhbnNpdGlvbjogYWxsIDI1MG1zO1xufVxuXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvblt2YWx1ZT0ndHJ1ZSddOjpiZWZvcmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICBib3gtc2hhZG93OiAtMnB4IDBweCAzcHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b25bdmFsdWU9J2ZhbHNlJ106OmJlZm9yZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgYm94LXNoYWRvdzogMnB4IDBweCAzcHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcbn1cblxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b24gPiAqIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAyO1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uW3ZhbHVlPSd0cnVlJ10gPiAuaW1wZXJpYWwge1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7ICovXG59XG5cbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyB7XG4gIHdpZHRoOiBtYXgtY29udGVudDtcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTsgKi9cbi8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudCk7XG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNXB4IDBweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTsgKi9cbi8qIHBhZGRpbmc6IDAuMDVyZW07XG59ICovXG5cbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICo6bm90KHNwYW4pIHtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufSAqL1xuXG4vKiAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMgPiAqLnNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyMTYsIDI1KTtcbn0gKi9cblxuLyogbGVmdCBidXR0b24gKi9cbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICNpbXBlcmlhbC5zZWxlY3RlZCB7XG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDNweCAtMXB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xuICBhbmltYXRpb246IHNsaWRlX2xlZnQgNTAwbXMgZWFzZS1vdXQ7XG59ICovXG5cbi8qIHJpZ2h0IGJ1dHRvbiAqL1xuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zID4gI21ldHJpYy5zZWxlY3RlZCB7XG4gIGJveC1zaGFkb3c6IDJweCAwcHggM3B4IC0xcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XG4gIGFuaW1hdGlvbjogc2xpZGVfcmlnaHQgNTAwbXMgZWFzZS1vdXQ7XG59ICovXG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICo6aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQudmlzaWJsZSB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBlYXNlLWluLW91dDtcbiAgei1pbmRleDogMjtcbn1cblxuLm5hdl9pdGVtLFxuLm5hdl9pdGVtOnZpc2l0ZWQge1xuICBjb2xvcjogdmFyKC0tcHJpbWFyeS1mb250LWNvbG9yLCByZ2IoMCwgMCwgMCkpO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5uYXZfaXRlbSA+IHN2ZyB7XG4gIHdpZHRoOiBjbGFtcCgxLjVyZW0sIDN2dywgMi41cmVtKTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4ubmF2X2J0biB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XG4gIHBhZGRpbmc6IDAuM3JlbTtcbiAgei1pbmRleDogMjtcbn1cblxuLm5hdl9idG4gPiBzdmcge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4ubmF2X2J0bjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xufVxuXG4ubmF2X2J0bjpob3ZlciA+IHN2ZyB7XG4gIGZpbHRlcjogaW52ZXJ0KDEpO1xufVxuXG4vKiBmb3JtIHN0eWxlcyAqL1xuI2hlYWRlciA+ICNmb3JtIHtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHJvdy1nYXA6IDAuNXJlbTtcbn1cblxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGxhYmVsIHtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xufVxuXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICBwYWRkaW5nOiAwLjc1cmVtO1xuICB3aWR0aDogMTAwJTtcbn1cblxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggMnB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xuICBwYWRkaW5nLWxlZnQ6IDJyZW07XG59XG5cbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBpbnB1dDpmb2N1czo6cGxhY2Vob2xkZXIge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiAudmFsaWRpdHlfZXJyb3Ige1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIHdpZHRoOiBpbmhlcml0O1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTphZnRlcixcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTpob3ZlcjphZnRlciB7XG4gICAgY29udGVudDogbm9uZTtcbiAgfVxuXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyLFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgdG9wOiBhdXRvO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIH1cblxuICAvKiBvcHRpb25hbCAqL1xuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlciB7XG4gICAgd2lkdGg6IDAlO1xuICAgIGhlaWdodDogMCU7XG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAvKiBvcHRpb25hbCAqL1xuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICAgIHdpZHRoOiA2MCU7XG4gICAgaGVpZ2h0OiAxMiU7XG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKSBzY2FsZVgoMSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xuICB9XG5cbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICAubmF2X2J0biB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQge1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgcGFkZGluZzogMXJlbSAwO1xuICB9XG5cbiAgI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGxhYmVsIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDF2dywgMS4yNXJlbSk7XG4gIH1cblxuICAjaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gaW5wdXQge1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzbGlkZV9sZWZ0IHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzbGlkZV9yaWdodCB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2hlYWRlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsbURBQW1EO0FBQ25EO0VBQ0UsbURBQW1EO0FBQ3JEOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzREFBc0Q7RUFDdEQsa0JBQWtCO0FBQ3BCOztBQUVBLGFBQWE7QUFDYjs7RUFFRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixNQUFNO0VBQ04sT0FBTztFQUNQLG1DQUFt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O0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixlQUFlO0VBQ2pCOztFQUVBO0lBQ0Usb0NBQW9DO0VBQ3RDOztFQUVBO0lBQ0UsVUFBVTtFQUNaO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLDJCQUEyQjtFQUM3Qjs7RUFFQTtJQUNFLHlCQUF5QjtFQUMzQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSw0QkFBNEI7RUFDOUI7O0VBRUE7SUFDRSx5QkFBeUI7RUFDM0I7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBpbmNsdWRlcyBzZWxlY3RvcnMgZm9yIG5hdmJhci5qcyBhbmQgaGVhZGVyLmpzICovXFxuI2hlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICoge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xcbiAgLyogdmFsdWUgbmVlZHMgdG8gYmUgZXF1YWwgdG8gLm5hdl9idG4gcGFkZGluZyB2YWx1ZSAqL1xcbiAgbWFyZ2luLXRvcDogMC4zcmVtO1xcbn1cXG5cXG4vKiBvcHRpb25hbCAqL1xcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiAqOm5vdCg6Zmlyc3QtY2hpbGQpOjphZnRlcixcXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gKjpub3QoOmZpcnN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMTg3LCA2OSk7XFxuICB6LWluZGV4OiAtMTtcXG59XFxuXFxuLyogb3B0aW9uYWwgKi9cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGk6OmFmdGVyIHtcXG4gIHdpZHRoOiAwJTtcXG4gIHRyYW5zZm9ybTogc2tld1goMGRlZyk7XFxuICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi8qIG9wdGlvbmFsICovXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRyYW5zZm9ybTogc2tld1goOGRlZykgc2NhbGVYKDEuMDMpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkgPiBhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGkgPiAubmF2X2xvZ28gPiBzdmcge1xcbiAgd2lkdGg6IGNsYW1wKDVyZW0sIDN2dywgNS41cmVtKTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG59XFxuXFxuI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gI3VuaXRfc3lzdGVtc19idXR0b24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcbiAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudCk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDVweCAwcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uOjpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogJyc7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiAyO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgd2lkdGg6IDUwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDIxNiwgMjUpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDI1MG1zO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvblt2YWx1ZT0ndHJ1ZSddOjpiZWZvcmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDNweCAtMXB4IHZhcigtLWNvbG9yLWJveC1zaGFkb3cpO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvblt2YWx1ZT0nZmFsc2UnXTo6YmVmb3JlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcXG4gIGJveC1zaGFkb3c6IDJweCAwcHggM3B4IC0xcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XFxufVxcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+ICN1bml0X3N5c3RlbXNfYnV0dG9uID4gKiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiAyO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAjdW5pdF9zeXN0ZW1zX2J1dHRvblt2YWx1ZT0ndHJ1ZSddID4gLmltcGVyaWFsIHtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHJlZDsgKi9cXG59XFxuXFxuLyogI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCA+IGxpID4gLnVuaXRfc3lzdGVtc19idXR0b25zIHtcXG4gIHdpZHRoOiBtYXgtY29udGVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07ICovXFxuLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNXB4IDBweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTsgKi9cXG4vKiBwYWRkaW5nOiAwLjA1cmVtO1xcbn0gKi9cXG5cXG4vKiAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMgPiAqOm5vdChzcGFuKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufSAqL1xcblxcbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICouc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyMTYsIDI1KTtcXG59ICovXFxuXFxuLyogbGVmdCBidXR0b24gKi9cXG4vKiAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0ID4gbGkgPiAudW5pdF9zeXN0ZW1zX2J1dHRvbnMgPiAjaW1wZXJpYWwuc2VsZWN0ZWQge1xcbiAgYm94LXNoYWRvdzogLTJweCAwcHggM3B4IC0xcHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XFxuICBhbmltYXRpb246IHNsaWRlX2xlZnQgNTAwbXMgZWFzZS1vdXQ7XFxufSAqL1xcblxcbi8qIHJpZ2h0IGJ1dHRvbiAqL1xcbi8qICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICNtZXRyaWMuc2VsZWN0ZWQge1xcbiAgYm94LXNoYWRvdzogMnB4IDBweCAzcHggLTFweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG4gIGFuaW1hdGlvbjogc2xpZGVfcmlnaHQgNTAwbXMgZWFzZS1vdXQ7XFxufSAqL1xcblxcbiNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQgPiBsaSA+IC51bml0X3N5c3RlbXNfYnV0dG9ucyA+ICo6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0LnZpc2libGUge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4ubmF2X2l0ZW0sXFxuLm5hdl9pdGVtOnZpc2l0ZWQge1xcbiAgY29sb3I6IHZhcigtLXByaW1hcnktZm9udC1jb2xvciwgcmdiKDAsIDAsIDApKTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuLm5hdl9pdGVtID4gc3ZnIHtcXG4gIHdpZHRoOiBjbGFtcCgxLjVyZW0sIDN2dywgMi41cmVtKTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLm5hdl9idG4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XFxuICBwYWRkaW5nOiAwLjNyZW07XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4ubmF2X2J0biA+IHN2ZyB7XFxuICB3aWR0aDogMnJlbTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLm5hdl9idG46aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG5cXG4ubmF2X2J0bjpob3ZlciA+IHN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCgxKTtcXG59XFxuXFxuLyogZm9ybSBzdHlsZXMgKi9cXG4jaGVhZGVyID4gI2Zvcm0ge1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHJvdy1nYXA6IDAuNXJlbTtcXG59XFxuXFxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGxhYmVsIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcXG59XFxuXFxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuI2hlYWRlciA+ICNmb3JtID4gLmZvcm1faXRlbTpmaXJzdC1jaGlsZCA+IGlucHV0OmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDVweCAycHggdmFyKC0tY29sb3ItYm94LXNoYWRvdyk7XFxuICBwYWRkaW5nLWxlZnQ6IDJyZW07XFxufVxcblxcbiNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBpbnB1dDpmb2N1czo6cGxhY2Vob2xkZXIge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4jaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkID4gLnZhbGlkaXR5X2Vycm9yIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAgIHdpZHRoOiBpbmhlcml0O1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTphZnRlcixcXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpsYXN0LW9mLXR5cGU6aG92ZXI6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBub25lO1xcbiAgfVxcblxcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIsXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgdG9wOiBhdXRvO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgfVxcblxcbiAgLyogb3B0aW9uYWwgKi9cXG4gICNoZWFkZXIgPiAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyIHtcXG4gICAgd2lkdGg6IDAlO1xcbiAgICBoZWlnaHQ6IDAlO1xcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICB9XFxuXFxuICAvKiBvcHRpb25hbCAqL1xcbiAgI2hlYWRlciA+ICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcXG4gICAgd2lkdGg6IDYwJTtcXG4gICAgaGVpZ2h0OiAxMiU7XFxuICAgIHRyYW5zZm9ybTogc2tld1goMGRlZykgc2NhbGVYKDEpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICB9XFxuXFxuICAjaGVhZGVyID4gI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGk6Zmlyc3Qtb2YtdHlwZSB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICAubmF2X2J0biB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxuXFxuICAjaGVhZGVyID4gI2Zvcm0gPiAuZm9ybV9pdGVtOmZpcnN0LWNoaWxkIHtcXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIHBhZGRpbmc6IDFyZW0gMDtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBsYWJlbCB7XFxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgMXZ3LCAxLjI1cmVtKTtcXG4gIH1cXG5cXG4gICNoZWFkZXIgPiAjZm9ybSA+IC5mb3JtX2l0ZW06Zmlyc3QtY2hpbGQgPiBpbnB1dCB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGVfbGVmdCB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlX3JpZ2h0IHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlcyBmb3IgaG9tZS5qcyBtb2R1bGUgKi9cbiNob21lIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMXJlbTtcbn1cblxuI2hvbWUgPiAqIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICByb3ctZ2FwOiAxcmVtO1xufVxuXG4jaG9tZSA+ICogPiBoMiB7XG4gIGZsZXg6IDE7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaG9tZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsOEJBQThCO0FBQzlCO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxPQUFPO0FBQ1RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogc3R5bGVzIGZvciBob21lLmpzIG1vZHVsZSAqL1xcbiNob21lIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbiNob21lID4gKiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgcm93LWdhcDogMXJlbTtcXG59XFxuXFxuI2hvbWUgPiAqID4gaDIge1xcbiAgZmxleDogMTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjbG9hZGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4jbG9hZGluZyA+ICNsb2FkaW5nX2ltZyB7XG4gIHdpZHRoOiBjbGFtcCg1cmVtLCAzdncsIDEwcmVtKTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBhbmltYXRpb246IHJvdGF0ZV9jdyAxcyBpbmZpbml0ZSBsaW5lYXI7XG59XG5cbkBrZXlmcmFtZXMgcm90YXRlX2N3IHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2xvYWRpbmcuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsWUFBWTtFQUNaLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFO0lBQ0UsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UseUJBQXlCO0VBQzNCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2xvYWRpbmcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuI2xvYWRpbmcgPiAjbG9hZGluZ19pbWcge1xcbiAgd2lkdGg6IGNsYW1wKDVyZW0sIDN2dywgMTByZW0pO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgYW5pbWF0aW9uOiByb3RhdGVfY3cgMXMgaW5maW5pdGUgbGluZWFyO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZV9jdyB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgfVxcblxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2ZvcmVjYXN0ID4gaGVhZGVyIHtcbiAgcGFkZGluZzogMnJlbTtcbn1cblxuI2ZvcmVjYXN0ID4gaGVhZGVyID4gaDIge1xuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgM3JlbSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xufVxuXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBoMiA+IHNwYW4ge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHRleHQtd3JhcDogbm93cmFwO1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xufVxuXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBwIHtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbn1cblxuI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtIDJyZW07XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXk6bm90KDpsYXN0LWNoaWxkKSB7XG4gIGJvcmRlci1ib3R0b206IDAuMzVyZW0gc29saWQ7XG59XG5cbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleDogMSAwIDBweDtcbiAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtY2hpbGQoMykgPiA6Zmlyc3QtY2hpbGQsXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6Zmlyc3QtY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtb2YtdHlwZSgzKSA+IDpsYXN0LWNoaWxkIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbm1heCgwLCAxZnIpKTtcbiAgICBwYWRkaW5nOiAycmVtIDNyZW07XG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bnRoLW9mLXR5cGUoMykge1xuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgfVxuXG4gICNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtd3JhcDogYmFsYW5jZTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3RhYnMvZm9yZWNhc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLGFBQWE7RUFDYixlQUFlO0VBQ2YscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7O0VBRUUsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0lBQ2IsZ0RBQWdEO0lBQ2hELGtCQUFrQjtJQUNsQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSx3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSxjQUFjO0lBQ2Qsa0JBQWtCO0VBQ3BCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2ZvcmVjYXN0ID4gaGVhZGVyIHtcXG4gIHBhZGRpbmc6IDJyZW07XFxufVxcblxcbiNmb3JlY2FzdCA+IGhlYWRlciA+IGgyIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcblxcbiNmb3JlY2FzdCA+IGhlYWRlciA+IGgyID4gc3BhbiB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgdGV4dC13cmFwOiBub3dyYXA7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4jZm9yZWNhc3QgPiBoZWFkZXIgPiBwIHtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXk6bm90KDpsYXN0LWNoaWxkKSB7XFxuICBib3JkZXItYm90dG9tOiAwLjM1cmVtIHNvbGlkO1xcbn1cXG5cXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4OiAxIDAgMHB4O1xcbiAgY29sdW1uLWdhcDogMC41cmVtO1xcbn1cXG5cXG4jZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtY2hpbGQoMykgPiA6Zmlyc3QtY2hpbGQsXFxuI2ZvcmVjYXN0X2RldGFpbHMgPiAuZGF5ID4gdWw6bGFzdC1vZi10eXBlID4gOmZpcnN0LWNoaWxkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbiNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbm1heCgwLCAxZnIpKTtcXG4gICAgcGFkZGluZzogMnJlbSAzcmVtO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAjZm9yZWNhc3RfZGV0YWlscyA+IC5kYXkgPiB1bDpudGgtb2YtdHlwZSgzKSB7XFxuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gIH1cXG5cXG4gICNmb3JlY2FzdF9kZXRhaWxzID4gLmRheSA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgdGV4dC13cmFwOiBiYWxhbmNlO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNob3VybHkgPiBoZWFkZXIge1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4jaG91cmx5ID4gaGVhZGVyID4gaDIge1xuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgM3JlbSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xufVxuXG4jaG91cmx5ID4gaGVhZGVyID4gaDIgPiBzcGFuIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cblxuI2hvdXJseSA+IGhlYWRlciA+IHAge1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gaDMge1xuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtZGVmYXVsdCk7XG4gIHBhZGRpbmc6IDJyZW07XG4gIHRleHQtd3JhcDogYmFsYW5jZTtcbn1cblxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtIDJyZW07XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXI6bm90KDpsYXN0LWNoaWxkKSB7XG4gIGJvcmRlci1ib3R0b206IDAuMzVyZW0gc29saWQ7XG59XG5cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bCA+ICoge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4vKiBzZWxlY3RzIHRoZSBsaSB3aXRoIHRpbWUgKi9cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmZpcnN0LW9mLXR5cGUgPiBsaSB7XG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7XG59XG5cbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOm50aC1vZi10eXBlKDMpID4gOmxhc3QtY2hpbGQsXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpsYXN0LW9mLXR5cGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcbiAgICBwYWRkaW5nOiAycmVtIDNyZW07XG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykge1xuICAgIC8qIGZsZXg6IDAuNTsgKi9cbiAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSA+IDpsYXN0LWNoaWxkLFxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpsYXN0LW9mLXR5cGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YWJzL2hvdXJseS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQ0FBaUM7RUFDakMsYUFBYTtFQUNiLGVBQWU7RUFDZixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsc0NBQXNDO0VBQ3RDLGlEQUFpRDtFQUNqRCxhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7O0VBRUUsYUFBYTtBQUNmOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLGtCQUFrQjtJQUNsQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSxlQUFlO0lBQ2Ysd0JBQXdCO0VBQzFCOztFQUVBOztJQUVFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNob3VybHkgPiBoZWFkZXIge1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuI2hvdXJseSA+IGhlYWRlciA+IGgyIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcblxcbiNob3VybHkgPiBoZWFkZXIgPiBoMiA+IHNwYW4ge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuI2hvdXJseSA+IGhlYWRlciA+IHAge1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IGgzIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQpO1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIHRleHQtd3JhcDogYmFsYW5jZTtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XFxufVxcblxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91cjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIGJvcmRlci1ib3R0b206IDAuMzVyZW0gc29saWQ7XFxufVxcblxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG59XFxuXFxuI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWwgPiAqIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi8qIHNlbGVjdHMgdGhlIGxpIHdpdGggdGltZSAqL1xcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmZpcnN0LW9mLXR5cGUgPiBsaSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xcbn1cXG5cXG4jaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSA+IDpsYXN0LWNoaWxkLFxcbiNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmxhc3Qtb2YtdHlwZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gICAgcGFkZGluZzogMnJlbSAzcmVtO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAjaG91cmx5X2RldGFpbHMgPiAuZGF5ID4gLmhvdXIgPiB1bDpudGgtb2YtdHlwZSgzKSB7XFxuICAgIC8qIGZsZXg6IDAuNTsgKi9cXG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgfVxcblxcbiAgI2hvdXJseV9kZXRhaWxzID4gLmRheSA+IC5ob3VyID4gdWw6bnRoLW9mLXR5cGUoMykgPiA6bGFzdC1jaGlsZCxcXG4gICNob3VybHlfZGV0YWlscyA+IC5kYXkgPiAuaG91ciA+IHVsOmxhc3Qtb2YtdHlwZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzaGVldCBmb3IgdGFicy5qcywgYW5kIHRhYnNfbmF2YmFyLmpzICovXG4jdGFic19uYXZiYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQpO1xuICBwYWRkaW5nOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMHB4IC01cHggMTRweCAtMTBweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcbn1cblxuI3RhYnNfbmF2YmFyID4gdWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBjb2x1bW4tZ2FwOiAwLjVyZW07XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4udGFic19saXN0X2l0ZW0ge1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi8qICN0YWJzX25hdmJhciBhbmNob3JzICovXG4udGFic19saXN0X2l0ZW0gPiAqIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xuICBmb250LXdlaWdodDogNzAwO1xuICBwYWRkaW5nOiAwLjV2dztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udGFic19saXN0X2l0ZW0gPiAqOmFmdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwJTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGNvbnRlbnQ6ICcnO1xuICB3aWR0aDogNTAlO1xuICBoZWlnaHQ6IDRweDtcbiAgbWFyZ2luOiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQpO1xuICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4udGFic19saXN0X2l0ZW0gPiAqOmhvdmVyOmFmdGVyIHtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMSkgc2NhbGVZKDEuMjUpO1xufVxuXG4udGFic19saXN0X2l0ZW0gPiAqOmhvdmVyIHtcbiAgLyogYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigyNTUsIDAsIDApOyAqL1xufVxuXG4udGFic19saXN0X2l0ZW0gPiBbZGF0YS1hY3RpdmU9J3RydWUnXSB7XG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNHB4IDJweCBibGFjazsgKi9cbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgI3RhYnNfbmF2YmFyIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cbiAgLnRhYnNfbGlzdF9pdGVtID4gKiB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3RhYnMvdGFicy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsK0NBQStDO0FBQy9DO0VBQ0UsaURBQWlEO0VBQ2pELGFBQWE7RUFDYixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHVEQUF1RDtBQUN6RDs7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUEseUJBQXlCO0FBQ3pCO0VBQ0UscUJBQXFCO0VBQ3JCLGlCQUFpQjtFQUNqQixzQ0FBc0M7RUFDdEMsbUNBQW1DO0VBQ25DLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxPQUFPO0VBQ1AsUUFBUTtFQUNSLFdBQVc7RUFDWCxVQUFVO0VBQ1YsV0FBVztFQUNYLFlBQVk7RUFDWixxQ0FBcUM7RUFDckMsb0JBQW9CO0VBQ3BCLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLDZDQUE2QztBQUMvQzs7QUFFQTtFQUNFLDZDQUE2QztFQUM3Qyx3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRTtJQUNFLDJCQUEyQjtFQUM3QjtFQUNBO0lBQ0UsYUFBYTtFQUNmO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogc3R5bGVzaGVldCBmb3IgdGFicy5qcywgYW5kIHRhYnNfbmF2YmFyLmpzICovXFxuI3RhYnNfbmF2YmFyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtZGVmYXVsdCk7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IC01cHggMTRweCAtMTBweCB2YXIoLS1jb2xvci1ib3gtc2hhZG93KTtcXG59XFxuXFxuI3RhYnNfbmF2YmFyID4gdWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRhYnNfbGlzdF9pdGVtIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuLyogI3RhYnNfbmF2YmFyIGFuY2hvcnMgKi9cXG4udGFic19saXN0X2l0ZW0gPiAqIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtd3JhcDogbm93cmFwO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtcHJpbWFyeSk7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBwYWRkaW5nOiAwLjV2dztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnRhYnNfbGlzdF9pdGVtID4gKjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDEwJTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgd2lkdGg6IDUwJTtcXG4gIGhlaWdodDogNHB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50KTtcXG4gIHRyYW5zZm9ybTogc2NhbGVYKDApO1xcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udGFic19saXN0X2l0ZW0gPiAqOmhvdmVyOmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogc2NhbGVYKDEpIHNjYWxlWSgxLjI1KTtcXG59XFxuXFxuLnRhYnNfbGlzdF9pdGVtID4gKjpob3ZlciB7XFxuICAvKiBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDI1NSwgMCwgMCk7ICovXFxufVxcblxcbi50YWJzX2xpc3RfaXRlbSA+IFtkYXRhLWFjdGl2ZT0ndHJ1ZSddIHtcXG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggNHB4IDJweCBibGFjazsgKi9cXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAjdGFic19uYXZiYXIge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICB9XFxuICAudGFic19saXN0X2l0ZW0gPiAqIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjdG9kYXlfc3VtbWFyeSB7XG4gIC8qIGJhY2tncm91bmQtY29sb3I6IG1hZ2VudGE7ICovXG4gIHBhZGRpbmc6IDJyZW07XG59XG5cbiN0b2RheV9zdW1tYXJ5ID4gdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IHVsID4gOmZpcnN0LWNoaWxkIHtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IGhlYWRlciA+IGgzIHtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbiN0b2RheV9zdW1tYXJ5ID4gaGVhZGVyID4gaDMgPiBzcGFuIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuI3RvZGF5X3N1bW1hcnkgPiB1bDpsYXN0LW9mLXR5cGUgPiA6bGFzdC1jaGlsZCB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xufVxuXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpmaXJzdC1jaGlsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gKiA+ICoge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciB7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWRlZmF1bHQpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkIHtcbiAgZmxleDogMTtcbn1cblxuLyogc2VsZWN0cyBsaSB3aXRoIFwiZmVlbHMgbGlrZVwiICovXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCA+IDpmaXJzdC1jaGlsZCB7XG4gIHRleHQtd3JhcDogbm93cmFwO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAydncsIDEuNXJlbSk7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkID4gOmxhc3QtY2hpbGQge1xuICBmb250LXNpemU6IGNsYW1wKDJyZW0sIDJ2dywgMi41cmVtKTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWNvbnRlbnQ6IGVuZDtcbiAgY29sdW1uLWdhcDogMXJlbTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4gPiAqIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4vKiBzZWxlY3RzIGxpJ3MgdGhhdCB3cmFwIGFuIGljb24gKi9cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiA+IDpmaXJzdC1jaGlsZCA+IHN2ZyB7XG4gIHdpZHRoOiBjbGFtcCgxLjc1cmVtLCAydncsIDNyZW0pO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiA+IGxpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogZGFya29yYW5nZTsgKi9cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMC4yNXJlbTtcbn1cblxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcbiAgcGFkZGluZzogMS4yNXJlbTtcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiAqIHtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjVyZW0sIDJ2dywgMnJlbSk7XG59XG5cbi8qIHNlbGVjdHMgbGkncyB0aGF0IHdyYXAgYW4gaWNvbiAqL1xuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCA+IDpmaXJzdC1jaGlsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwgPiA6Zmlyc3QtY2hpbGQgPiBzdmcge1xuICB3aWR0aDogY2xhbXAoMS43NXJlbSwgMnZ3LCAycmVtKTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgyKSB7XG4gIGZsZXg6IDE7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICB0ZXh0LXdyYXA6IG5vd3JhcDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiA6Zmlyc3QtY2hpbGQge1xuICAgIC8qIGZsZXg6IG5vbmU7ICovXG4gICAgLyogb3B0aW9uYWwgKi9cbiAgfVxuXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gICAgY29sdW1uLWdhcDogMnJlbTtcbiAgICByb3ctZ2FwOiAxcmVtO1xuICAgIHBhZGRpbmc6IDJyZW07XG4gIH1cblxuICAjdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsIHtcbiAgICBjb2x1bW4tZ2FwOiAxLjVyZW07XG4gICAgcGFkZGluZzogMnJlbTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3RhYnMvdG9kYXkuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsK0JBQStCO0VBQy9CLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLGlEQUFpRDtFQUNqRCxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLE9BQU87QUFDVDs7QUFFQSxpQ0FBaUM7QUFDakM7RUFDRSxpQkFBaUI7RUFDakIsMEJBQTBCO0VBQzFCLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBLG1DQUFtQztBQUNuQztFQUNFLGdDQUFnQztFQUNoQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtDQUFrQztFQUNsQyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQSxtQ0FBbUM7QUFDbkM7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsT0FBTztFQUNQLDBCQUEwQjtFQUMxQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRTtJQUNFLGdCQUFnQjtJQUNoQixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsYUFBYTtFQUNmOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiN0b2RheV9zdW1tYXJ5IHtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IG1hZ2VudGE7ICovXFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbiN0b2RheV9zdW1tYXJ5ID4gdWwgPiA6Zmlyc3QtY2hpbGQge1xcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IGhlYWRlciA+IGgzIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IGhlYWRlciA+IGgzID4gc3BhbiB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgdGV4dC13cmFwOiBub3dyYXA7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpsYXN0LWNoaWxkIHtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4jdG9kYXlfc3VtbWFyeSA+IHVsOmxhc3Qtb2YtdHlwZSA+IDpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gKiA+ICoge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIge1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1kZWZhdWx0KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkIHtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi8qIHNlbGVjdHMgbGkgd2l0aCBcXFwiZmVlbHMgbGlrZVxcXCIgKi9cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IDpmaXJzdC1jaGlsZCA+IDpmaXJzdC1jaGlsZCB7XFxuICB0ZXh0LXdyYXA6IG5vd3JhcDtcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbiAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAydncsIDEuNXJlbSk7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkID4gOmxhc3QtY2hpbGQge1xcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCAydncsIDIuNXJlbSk7XFxufVxcblxcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBlbmQ7XFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2hlYWRlciA+IC50b2RheV9kZXRhaWxzX3N1biA+ICoge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxufVxcblxcbi8qIHNlbGVjdHMgbGkncyB0aGF0IHdyYXAgYW4gaWNvbiAqL1xcbiN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gLnRvZGF5X2RldGFpbHNfc3VuID4gKiA+IDpmaXJzdC1jaGlsZCA+IHN2ZyB7XFxuICB3aWR0aDogY2xhbXAoMS43NXJlbSwgMnZ3LCAzcmVtKTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19oZWFkZXIgPiAudG9kYXlfZGV0YWlsc19zdW4gPiAqID4gbGkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZvbnQtc2l6ZTogY2xhbXAoMS41cmVtLCAydncsIDJyZW0pO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogZGFya29yYW5nZTsgKi9cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMC4yNXJlbTtcXG59XFxuXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG4gIHBhZGRpbmc6IDEuMjVyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gKiB7XFxuICBmb250LXNpemU6IGNsYW1wKDEuNXJlbSwgMnZ3LCAycmVtKTtcXG59XFxuXFxuLyogc2VsZWN0cyBsaSdzIHRoYXQgd3JhcCBhbiBpY29uICovXFxuI3RvZGF5X2RldGFpbHMgPiAudG9kYXlfZGV0YWlsc19jb250YWluZXIgPiB1bCA+IDpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOmZpcnN0LWNoaWxkID4gc3ZnIHtcXG4gIHdpZHRoOiBjbGFtcCgxLjc1cmVtLCAydncsIDJyZW0pO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4jdG9kYXlfZGV0YWlscyA+IC50b2RheV9kZXRhaWxzX2NvbnRhaW5lciA+IHVsID4gOm50aC1jaGlsZCgyKSB7XFxuICBmbGV4OiAxO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICB0ZXh0LXdyYXA6IG5vd3JhcDtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfaGVhZGVyID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgLyogZmxleDogbm9uZTsgKi9cXG4gICAgLyogb3B0aW9uYWwgKi9cXG4gIH1cXG5cXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gICAgY29sdW1uLWdhcDogMnJlbTtcXG4gICAgcm93LWdhcDogMXJlbTtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gIH1cXG5cXG4gICN0b2RheV9kZXRhaWxzID4gLnRvZGF5X2RldGFpbHNfY29udGFpbmVyID4gdWwge1xcbiAgICBjb2x1bW4tZ2FwOiAxLjVyZW07XFxuICAgIHBhZGRpbmc6IDJyZW07XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NvbnRlbnQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jb250ZW50LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9lcnJvci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Vycm9yLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mb290ZXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mb290ZXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2xvYWRpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9sb2FkaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mb3JlY2FzdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ZvcmVjYXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob3VybHkuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob3VybHkuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RhYnMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YWJzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90b2RheS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RvZGF5LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0ICcuL2FwcC5jc3MnO1xuaW1wb3J0ICdAaWNvbmZ1L3N2Zy1pbmplY3QnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGhlYWRlckJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXInO1xuaW1wb3J0IG1haW5CdWlsZGVyIGZyb20gJy4vY29tcG9uZW50cy9tYWluL21haW4nO1xuaW1wb3J0IGZvb3RlckJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXInO1xuaW1wb3J0ICcuL2NvbnRhaW5lcnMvYXBpX2NvbnRyb2xsZXInO1xuXG4oKCkgPT4ge1xuICBjb25zdCBidWlsZCA9IHtcbiAgICBoZWFkZXI6IGhlYWRlckJ1aWxkZXIsXG4gICAgbWFpbjogbWFpbkJ1aWxkZXIsXG4gICAgZm9vdGVyOiBmb290ZXJCdWlsZGVyLFxuICB9O1xuXG4gIGNvbnN0IGFwcCA9IHtcbiAgICBpbml0KCkge1xuICAgICAgY29uc29sZS5sb2coJ2FwcC5pbml0KCkgcnVubmluZycpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IGFwcFdyYXBwZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IGFwcENvbnRlbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGFwcFdyYXBwZXIuaWQgPSAnd2VhdGhlcl9hcHAnO1xuICAgICAgYXBwQ29udGVudC5pZCA9ICdjb250ZW50JztcblxuICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZC5oZWFkZXIoKSk7XG4gICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLm1haW4oKSk7XG4gICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGFwcENvbnRlbnQpO1xuICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZC5mb290ZXIoKSk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwV3JhcHBlcik7XG4gICAgfSxcbiAgfTtcblxuICBhcHAuaW5pdCgpO1xufSkoKTtcblxuLy8gZ2V0RGF0YSgnbG9uZG9uJyk7XG5cbi8vIHVzZSBXZWF0aGVyQVBJXG4vLyBodHRwczovL3d3dy53ZWF0aGVyYXBpLmNvbS9kb2NzL1xuXG4vLyB0aGluZ3MgdG8gZG86XG4vLyBZb3Ugc2hvdWxkIGJlIGFibGUgdG8gc2VhcmNoIGZvciBhIHNwZWNpZmljIGxvY2F0aW9uXG4vLyB0b2dnbGUgZGlzcGxheWluZyB0aGUgZGF0YSBpbiBGYWhyZW5oZWl0IG9yIENlbHNpdXMuXG4vLyBZb3Ugc2hvdWxkIGNoYW5nZSB0aGUgbG9vayBvZiB0aGUgcGFnZSBiYXNlZCBvbiB0aGUgZGF0YSwgbWF5YmUgYnkgY2hhbmdpbmcgdGhlIGNvbG9yIG9mIHRoZSBiYWNrZ3JvdW5kIG9yIGJ5IGFkZGluZyBpbWFnZXMgdGhhdCBkZXNjcmliZSB0aGUgd2VhdGhlclxuXG4vLyBpbnB1dHM6XG4vLyAxLiBjaXR5IG9yIHBvc3RhbCBjb2Rlc1xuXG4vLyBkZXNpZ246XG4vLyBhZGQgYSDigJhsb2FkaW5n4oCZIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGZyb20gdGhlIHRpbWUgdGhlIGZvcm0gaXMgc3VibWl0dGVkIHVudGlsIHRoZSBpbmZvcm1hdGlvbiBjb21lcyBiYWNrIGZyb20gdGhlIEFQSS5cbi8vIDMgZGF5IGZvcmVjYXN0XG4vLyBob3VybHkgYW5kIGRhaWx5IGZvcmVjYXN0XG5cbi8vIGxheW91dDpcbi8vIDxhcHA+XG4vLyAgICA8aGVhZGVyPiAobmF2aWdhdGlvbilcbi8vICAgIDxjb250ZW50PlxuLy8gICAgICA8aGVhZGluZz5cbi8vICAgICAgPGlucHV0PiAod2l0aCBDL0YgdG9nZ2xlIGJ1dHRvbilcbi8vICAgICAgPG91dHB1dD5cbi8vICAgICAgICA8dG9kYXk+IChnZXQgY3VycmVudCBkYXRlKVxuLy8gICAgICAgIDxob3VybHk+IChnZXQgdXNlcidzIGN1cnJlbnQgdGltZSlcbi8vICAgICAgICAgIHRpbWUgfCBjb25kaXRpb25zIHwgdGVtcCB8IGZlZWxzIGxpa2UgfCBwcmVjaXAgY2hhbmNlICUgfCBwcmVjaXAgYW1vdW50ICUgfCBjbG91ZCBjb3ZlciAlIHwgZGV3IHBvaW50IHwgaHVtaWRpdHkgJSB8IHdpbmQgc3BlZWQgQU5EIGRpcmVjdGlvblxuLy8gICAgICAgIDwzLWRheT4gKDMtZGF5IGZvcmVjYXN0KVxuLy8gICAgPGZvb3Rlcj5cbiIsInZhciBtYXAgPSB7XG5cdFwiLi9jaGFuY2Vfb2ZfcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hhbmNlX29mX3JhaW4uc3ZnXCIsXG5cdFwiLi9odW1pZGl0eS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaHVtaWRpdHkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vbWlubWF4dGVtcC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWlubWF4dGVtcC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9wcmVzc3VyZS5zdmdcIixcblx0XCIuL3Byb2dyZXNzX2FjdGl2aXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9wcm9ncmVzc19hY3Rpdml0eS5zdmdcIixcblx0XCIuL3NoYXJwX2hvbWUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3NoYXJwX2hvbWUuc3ZnXCIsXG5cdFwiLi9zdW5yaXNlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9zdW5yaXNlLnN2Z1wiLFxuXHRcIi4vc3Vuc2V0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9zdW5zZXQuc3ZnXCIsXG5cdFwiLi91di5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvdXYuc3ZnXCIsXG5cdFwiLi92aXNpYmlsaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy92aXNpYmlsaXR5LnN2Z1wiLFxuXHRcIi4vd2luZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvd2luZC5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL2Vycm9yLmNzcyc7XG5cbmNvbnN0IGVycm9yQnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRXJyb3IpIHtcbiAgICB0aGlzLnNldEVycm9yKHdlYXRoZXJFcnJvcik7XG4gIH0sXG4gIHNldEVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5lcnJvciA9IGVycm9yLmVycm9yO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gYEVycm9yIGNvZGU6ICR7ZXJyb3Iuc3RhdHVzfVxuICAgICR7ZXJyb3IuZXJyb3IubWVzc2FnZX1gO1xuICB9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBlcnJvclNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgY29uc3QgZXJyb3JIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBlcnJvclNlY3Rpb24uaWQgPSAnZXJyb3InO1xuICAgIGVycm9ySGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6IHRoaXMuZXJyb3JNZXNzYWdlIH0pO1xuXG4gICAgZXJyb3JTZWN0aW9uLmFwcGVuZENoaWxkKGVycm9ySGVhZGluZyk7XG4gICAgcmV0dXJuIGVycm9yU2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVycm9ySGVhZGVyKHdlYXRoZXJFcnJvcikge1xuICBlcnJvckJ1aWxkZXIuaW5pdCh3ZWF0aGVyRXJyb3IpO1xuICByZXR1cm4gZXJyb3JCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL2Zvb3Rlci5jc3MnO1xuXG5jb25zdCBmb290ZXJCdWlsZGVyID0ge1xuICBjYWNoZURPTShmb290ZXJFbGVtZW50KSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZm9vdGVyRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuICAgIGNvbnN0IGZvb3RlckFuY2hvcldyYXBwZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBmb290ZXJBbmNob3IgPSBjcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgZm9vdGVyQW5jaG9yV3JhcHBlci50ZXh0Q29udGVudCA9ICdQb3dlcmVkIGJ5ICc7XG4gICAgZm9vdGVyRWxlbWVudC5pZCA9ICdmb290ZXInO1xuXG4gICAgZm9vdGVyQW5jaG9yLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgaHJlZjogJ2h0dHBzOi8vd3d3LndlYXRoZXJhcGkuY29tLycsXG4gICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgdGV4dENvbnRlbnQ6ICdXZWF0aGVyIEFQSScsXG4gICAgfSk7XG5cbiAgICBmb290ZXJBbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGZvb3RlckFuY2hvcik7XG4gICAgZm9vdGVyRWxlbWVudC5hcHBlbmRDaGlsZChmb290ZXJBbmNob3JXcmFwcGVyKTtcbiAgICByZXR1cm4gZm9vdGVyRWxlbWVudDtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkZm9vdGVyKCkge1xuICByZXR1cm4gZm9vdGVyQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFtcbiAgLy8ge1xuICAvLyAgIGVsZW1lbnQ6ICdoMScsXG4gIC8vICAgYXR0cmlidXRlczoge1xuICAvLyAgICAgaWQ6ICdoZXJvJyxcbiAgLy8gICAgIHRleHRDb250ZW50OiAnd2VhdGhlciBhcHAnLFxuICAvLyAgIH0sXG4gIC8vIH0sXG4gIHtcbiAgICBlbGVtZW50OiAnZm9ybScsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6ICdmb3JtJyxcbiAgICB9LFxuICAgIGlucHV0czogW1xuICAgICAge1xuICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaWQ6ICdsb2NhdGlvbicsXG4gICAgICAgICAgY2xhc3M6ICdmb3JtX2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnbG9jYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRW50ZXIgY2l0eSBvciBwb3N0YWwgY29kZScsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAnRW50ZXIgYSB2YWxpZCBjaXR5IG9yIHBvc3RhbCBjb2RlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogJ3VuaXRzeXN0ZW0nLFxuICAgICAgICAgIGNsYXNzOiAnZm9ybV9pbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ3VuaXRzeXN0ZW0nLFxuICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBgRW50ZXIgJ2ltcGVyaWFsJyBvciAnbWV0cmljJ2AsXG4gICAgICAgICAgdmFsdWU6ICdpbXBlcmlhbCcsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL2hlYWRlci5jb25maWcnO1xuaW1wb3J0IGJ1aWxkTmF2YmFyIGZyb20gJy4uL25hdmJhci9uYXZiYXInO1xuaW1wb3J0IHsgc2V0VW5pdFN5c3RlbSB9IGZyb20gJy4uL3RhYnMvdW5pdHN5c3RlbXMnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvaGVhZGVyLmNzcyc7XG5cbmNvbnN0IGhlYWRlckJ1aWxkZXIgPSB7XG4gIGNhY2hlRE9NKGhlYWRlckVsZW1lbnQpIHtcbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlckVsZW1lbnQ7XG4gICAgdGhpcy5mb3JtID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICAgIHRoaXMuaW5wdXRTZWFyY2ggPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpO1xuICAgIHRoaXMuaW5wdXRVbml0c3lzdGVtID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjdW5pdHN5c3RlbScpO1xuICAgIHRoaXMuaW5wdXRFcnJvcnMgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52YWxpZGl0eV9lcnJvcicpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0VW5pdFN5c3RlbSA9IHRoaXMuc2V0VW5pdFN5c3RlbS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2V0QWN0aXZlVGFiID0gdGhpcy5zZXRBY3RpdmVUYWIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdzZXRVbml0U3lzdGVtJywgdGhpcy5zZXRVbml0U3lzdGVtKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdzZXRBY3RpdmVUYWInLCB0aGlzLnNldEFjdGl2ZVRhYik7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyRWxlbWVudC5pZCA9ICdoZWFkZXInO1xuICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoYnVpbGROYXZiYXIucmVuZGVyKCkpO1xuXG4gICAgT2JqZWN0LmtleXMoaGVhZGVyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGhlYWRlckl0ZW0gPSBjcmVhdGVFbGVtZW50KGhlYWRlcltrZXldLmVsZW1lbnQpO1xuICAgICAgaGVhZGVySXRlbS5zZXRBdHRyaWJ1dGVzKGhlYWRlcltrZXldLmF0dHJpYnV0ZXMpO1xuXG4gICAgICBpZiAoaGVhZGVyW2tleV0uaW5wdXRzKSB7XG4gICAgICAgIGhlYWRlcltrZXldLmlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY29uc3QgaW5wdXRMYWJlbCA9IGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgY29uc3QgZm9ybUlucHV0ID0gY3JlYXRlRWxlbWVudChpbnB1dC5lbGVtZW50KTtcbiAgICAgICAgICBjb25zdCBpbnB1dEVycm9yID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgaW5wdXRFcnJvci5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGNsYXNzOiBgdmFsaWRpdHlfZXJyb3IgJHtpbnB1dC5hdHRyaWJ1dGVzLmlkfWAsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogaW5wdXQuZXJyb3IsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybUlucHV0LnNldEF0dHJpYnV0ZXMoaW5wdXQuYXR0cmlidXRlcyk7XG4gICAgICAgICAgaW5wdXRMYWJlbC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGZvcjogaW5wdXQuYXR0cmlidXRlcy5pZCxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBpbnB1dC5hdHRyaWJ1dGVzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZvcm1JdGVtLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2Zvcm1faXRlbScgfSk7XG5cbiAgICAgICAgICBpZiAoaW5wdXQuZXJyb3IpIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0TGFiZWwpO1xuICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGZvcm1JbnB1dCk7XG4gICAgICAgICAgaWYgKGlucHV0LmVycm9yKSBmb3JtSXRlbS5hcHBlbmRDaGlsZChpbnB1dEVycm9yKTtcbiAgICAgICAgICBoZWFkZXJJdGVtLmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVySXRlbSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRE9NKGhlYWRlckVsZW1lbnQpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xuICB9LFxuICBzdWJtaXRGb3JtKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldFVuaXRTeXN0ZW0odGhpcy5pbnB1dFVuaXRzeXN0ZW0udmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHB1YlN1Yi5wdWJsaXNoKCdnZXRBY3RpdmVUYWInLCAnZm9vJykpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdnZXRXZWF0aGVyJywgdGhpcy5pbnB1dFNlYXJjaC52YWx1ZSwgdGhpcy5hY3RpdmVUYWIpO1xuICB9LFxuICBzZXRVbml0U3lzdGVtKHNlbGVjdGlvbikge1xuICAgIHRoaXMuaW5wdXRVbml0c3lzdGVtLnZhbHVlID0gc2VsZWN0aW9uO1xuICAgIGlmICh0aGlzLmlucHV0U2VhcmNoLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zdWJtaXRGb3JtKCk7XG4gICAgfVxuICB9LFxuICBzZXRBY3RpdmVUYWIoa2V5KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSBrZXk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcigpIHtcbiAgcmV0dXJuIGhlYWRlckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBlbGVtZW50OiAnZGl2JyxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ3dlbGNvbWUnLFxuICAgIH0sXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogJ2gyJyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiAnd2VsY29tZV9oZWFkaW5nJyxcbiAgICAgICAgICB0ZXh0Q29udGVudDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6ICdwJyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiAnd2VsY29tZV9wYXJhZ3JhcGgnLFxuICAgICAgICAgIHRleHRDb250ZW50OlxuICAgICAgICAgICAgJ0FlbmVhbiBlc3QgdXJuYSwgbW9sbGlzIHV0IGZpbmlidXMgdmVsLCBmYXVjaWJ1cyBzZWQgb3JjaS4gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gSW50ZWdlciBpZCBsdWN0dXMgbmlzbCwgYXQgbWF4aW11cyBmZWxpcy4gRnVzY2UgZXUgcmhvbmN1cyBlbGl0LiBEdWlzIGVmZmljaXR1ciBkb2xvciBsaWJlcm8sIGVnZXQgdWx0cmljZXMgZXJvcyB1bHRyaWNpZXMgZXQuIEludGVnZXIgZWxlaWZlbmQgaWQgaXBzdW0gZWdldCBwaGFyZXRyYS4gRG9uZWMgdml0YWUgZHVpIHZlaGljdWxhLCBwbGFjZXJhdCBsZW8gZXQsIGFsaXF1ZXQgZWxpdC4gSW4gbGFjaW5pYSBsYWNpbmlhIG5pc2wgc2VtcGVyIGxvYm9ydGlzLiBQcmFlc2VudCB0b3J0b3IgbWFzc2EsIGZlcm1lbnR1bSBldSB2aXZlcnJhIGFjLCBsYW9yZWV0IHNlZCBvZGlvLiBTZWQgcmhvbmN1cyBkaWN0dW0gdmVzdGlidWx1bS4gVXQgYWMgcmhvbmN1cyBpcHN1bS4gU2VkIHV0IHNlbSBhbGlxdWV0LCBpbXBlcmRpZXQgbmliaCBldSwgcHVsdmluYXIgZXJvcy4gTW9yYmkgcGhhcmV0cmEgZ3JhdmlkYSBsaWJlcm8gYXQgb3JuYXJlLicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBlbGVtZW50OiAnZGl2JyxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ2ZhcScsXG4gICAgfSxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBlbGVtZW50OiAnaDInLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6ICdmYXFfaGVhZGluZycsXG4gICAgICAgICAgdGV4dENvbnRlbnQ6ICdQbGFjZWhvbGRlcicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbGVtZW50OiAncCcsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogJ2ZhcV9wYXJhZ3JhcGgnLFxuICAgICAgICAgIHRleHRDb250ZW50OlxuICAgICAgICAgICAgJ0NyYXMgYXQgbG9ib3J0aXMgb3JjaSwgZXQgcG9zdWVyZSBzYXBpZW4uIFNlZCB0dXJwaXMgbGVjdHVzLCB1bHRyaWNlcyBpbiBtYXR0aXMgdmVsLCBjdXJzdXMgdml0YWUgbGVjdHVzLiBTZWQgcG9zdWVyZSBwdXJ1cyBzYXBpZW4sIGEgcG9ydGEgc2FwaWVuIGNvbnNlY3RldHVyIHZpdGFlLiBNYWVjZW5hcyB2ZW5lbmF0aXMgZXUgYXJjdSB1dCBmYWNpbGlzaXMuIEZ1c2NlIGZhY2lsaXNpcyBydXRydW0gdHVycGlzIHZpdGFlIGNvbW1vZG8uIFByb2luIGZpbmlidXMgcmlzdXMgbmVjIGltcGVyZGlldCBlZmZpY2l0dXIuIE1hZWNlbmFzIGVnZXN0YXMgbWkgdmVsIGV1aXNtb2Qgb3JuYXJlLiBNYXVyaXMgdmVsIHNvbGxpY2l0dWRpbiBuaWJoLCBuZWMgZ3JhdmlkYSBlc3QuIFByYWVzZW50IGJpYmVuZHVtIG9kaW8gcXVpcyBjdXJzdXMgcnV0cnVtLicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbGVtZW50OiAncCcsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogJ3dlbGNvbWVfcGFyYWdyYXBoJyxcbiAgICAgICAgICB0ZXh0Q29udGVudDpcbiAgICAgICAgICAgICdVdCBlZ2VzdGFzIGVyYXQgZXQgb3JjaSBsdWN0dXMgcG9ydHRpdG9yIHNpdCBhbWV0IGNvbnNlcXVhdCByaXN1cy4gQWVuZWFuIGJsYW5kaXQgcmhvbmN1cyBhbnRlLCBlZ2V0IGZldWdpYXQgZXggcG9ydGEgZXUuIE51bmMgZWdldCBlbGl0IGVzdC4gRG9uZWMgc3VzY2lwaXQgY29udmFsbGlzIGVuaW0gc2VkIHRpbmNpZHVudC4gUHJvaW4gZmVybWVudHVtIHZlbmVuYXRpcyBlbGl0IHV0IGNvbnNlcXVhdC4gUHJhZXNlbnQgaW50ZXJkdW0gbGVjdHVzIHZlbCBsYWNpbmlhIHBvcnRhLiBNYXVyaXMgcHVydXMgbWF1cmlzLCBwb3J0dGl0b3Igc2VkIGJpYmVuZHVtIHZpdGFlLCBpbnRlcmR1bSBxdWlzIG5pYmguIE51bGxhIGV4IGVzdCwgc2VtcGVyIGFjIG5pc2kgdml0YWUsIGltcGVyZGlldCBtYXR0aXMgZW5pbS4gTnVsbGEgdmVsIGN1cnN1cyB2ZWxpdC4gTW9yYmkgYWMgZmVsaXMgcXVpcyBpcHN1bSBjb25kaW1lbnR1bSBkaWN0dW0gdml0YWUgZXUgc2VtLiBOdWxsYW0gbGFvcmVldCBuaXNsIHNlZCBudW5jIHVsdHJpY2VzLCBldSBhdWN0b3IgbGVjdHVzIGNvbnNlY3RldHVyLiBOYW0gbm9uIGZlbGlzIGVzdC4gSW50ZXJkdW0gZXQgbWFsZXN1YWRhIGZhbWVzIGFjIGFudGUgaXBzdW0gcHJpbWlzIGluIGZhdWNpYnVzLiBQZWxsZW50ZXNxdWUgY29uZ3VlIGRvbG9yIGV1IGRhcGlidXMgdGluY2lkdW50LiBWaXZhbXVzIGVsZWlmZW5kIGVuaW0gdmVsaXQsIHZpdGFlIHBsYWNlcmF0IGxpZ3VsYSBiaWJlbmR1bSBhdC4gTmFtIGFsaXF1ZXQgZGlnbmlzc2ltIGFjY3Vtc2FuLicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL2hvbWUuY3NzJztcbmltcG9ydCBob21lIGZyb20gJy4vaG9tZS5jb25maWcnO1xuXG5jb25zdCBob21lQnVpbGRlciA9IHtcbiAgY2FjaGVET00oKSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlRE9NKCkgcnVubmluZyBmcm9tIGhvbWUuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBob21lLmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob21lU2VjdGlvbi5pZCA9ICdob21lJztcbiAgICBob21lLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCk7XG4gICAgICBzZWN0aW9uLnNldEF0dHJpYnV0ZXMoaXRlbS5hdHRyaWJ1dGVzKTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChzdWJJdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3ViU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoc3ViSXRlbS5lbGVtZW50KTtcbiAgICAgICAgICBzdWJTZWN0aW9uLnNldEF0dHJpYnV0ZXMoc3ViSXRlbS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKHN1YlNlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGhvbWVTZWN0aW9uLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGhvbWVTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIb21lKCkge1xuICByZXR1cm4gaG9tZUJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvbG9hZGluZy5jc3MnO1xuaW1wb3J0IExvYWRpbmdJY29uIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9wcm9ncmVzc19hY3Rpdml0eS5zdmcnO1xuXG5jb25zdCBsb2FkaW5nQnVpbGRlciA9IHtcbiAgY2FjaGVET00oKSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlRE9NKCkgcnVubmluZyBmcm9tIGxvYWRpbmcuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBsb2FkaW5nLmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBsb2FkaW5nU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCBsb2FkaW5nSW1hZ2UgPSBjcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBsb2FkaW5nU2VjdGlvbi5pZCA9ICdsb2FkaW5nJztcbiAgICBsb2FkaW5nSW1hZ2Uuc2V0QXR0cmlidXRlcyh7IG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsIHNyYzogTG9hZGluZ0ljb24sIGlkOiAnbG9hZGluZ19pbWcnIH0pO1xuXG4gICAgbG9hZGluZ1NlY3Rpb24uYXBwZW5kQ2hpbGQobG9hZGluZ0ltYWdlKTtcblxuICAgIHJldHVybiBsb2FkaW5nU2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG9tZSgpIHtcbiAgcmV0dXJuIGxvYWRpbmdCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YlN1Yic7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGhvbWVCdWlsZGVyIGZyb20gJy4uL2hvbWUvaG9tZSc7XG5pbXBvcnQgZXJyb3JCdWlsZGVyIGZyb20gJy4uL2Vycm9yL2Vycm9yJztcbmltcG9ydCB0YWJzQnVpbGRlciBmcm9tICcuLi90YWJzL3RhYnMnO1xuaW1wb3J0IGxvYWRpbmdCdWlsZGVyIGZyb20gJy4uL2xvYWRpbmcvbG9hZGluZyc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9jb250ZW50LmNzcyc7XG5cbmNvbnN0IGJ1aWxkID0ge1xuICBob21lOiBob21lQnVpbGRlcixcbiAgZXJyb3I6IGVycm9yQnVpbGRlcixcbiAgdGFiczogdGFic0J1aWxkZXIsXG4gIGxvYWRpbmc6IGxvYWRpbmdCdWlsZGVyLFxufTtcblxuY29uc3QgbWFpbkJ1aWxkZXIgPSB7XG4gIGFjdGl2ZUNvbnRlbnQ6IG51bGwsXG4gIGFjdGl2ZVRhYjogbnVsbCxcbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZygnaW5pdCgpIG1ldGhpZCBydW5uaW5nIGZyb20gbWFpbi5qcycpO1xuICB9LFxuICBjYWNoZURPTShtYWluRWxlbWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gICAgdGhpcy5tYWluID0gbWFpbkVsZW1lbnQ7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gbWFpbi5qcycpO1xuICAgIHRoaXMuc3dpdGNoQ29udGVudCA9IHRoaXMuc3dpdGNoQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3N3aXRjaENvbnRlbnQnLCB0aGlzLnN3aXRjaENvbnRlbnQpO1xuICB9LFxuICByZW5kZXIoa2V5LCBkYXRhLCByZW5kZXJLZXkpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcblxuICAgIGxldCBjb250ZW50O1xuICAgIGlmICgha2V5KSB7XG4gICAgICAvLyBpbml0aWFsIG9ubG9hZFxuICAgICAgY29udGVudCA9IGJ1aWxkLmhvbWUoKTtcbiAgICAgIC8vIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW5kZXIgdG9kYXlcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKGRhdGEsIHJlbmRlcktleSk7XG4gICAgICB0aGlzLm1haW4ubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIHN3aXRjaENvbnRlbnQod2VhdGhlckRhdGEsIHJlbmRlcktleSkge1xuICAgIGxldCBjb250ZW50S2V5O1xuICAgIGNvbnNvbGUubG9nKCdzd2l0Y2hDb250ZW50KCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcbiAgICBpZiAod2VhdGhlckRhdGEuZXJyb3IpIHtcbiAgICAgIGNvbnRlbnRLZXkgPSAnZXJyb3InO1xuICAgIH0gZWxzZSBpZiAod2VhdGhlckRhdGEgPT09ICdsb2FkaW5nJykge1xuICAgICAgY29udGVudEtleSA9ICdsb2FkaW5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2ZldGNoIHN1Y2Nlc3MnKTtcbiAgICAgIGNvbnRlbnRLZXkgPSAndGFicyc7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKGNvbnRlbnRLZXksIHdlYXRoZXJEYXRhLCByZW5kZXJLZXkpO1xuICB9LFxuICBzZXRBY3RpdmVUYWIodGFiKSB7XG4gICAgY29uc29sZS5sb2coJ3NldEFjdGl2ZVRhYigpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gIC8vIHJldHVybiBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgbWFpbi5pZCA9ICdtYWluX2NvbnRlbnQnO1xuICBtYWluQnVpbGRlci5jYWNoZURPTShtYWluKTtcbiAgbWFpbkJ1aWxkZXIuYmluZEV2ZW50cygpO1xuICBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgcmV0dXJuIG1haW47XG59XG4iLCJpbXBvcnQgSWxsdXN0cmF0aW9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pbGx1c3RyYXRpb25zL3VuZHJhd193ZWF0aGVyX2FwcC5zdmcnO1xuaW1wb3J0IEljb25NZW51IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9tZW51LnN2Zyc7XG5pbXBvcnQgSWNvbkdpdGh1YiBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvZ2l0aHViX21hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYXZMZWZ0OiBbXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0gbmF2X2xvZ28nLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBzcmM6IElsbHVzdHJhdGlvbixcbiAgICAgICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdoMScsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICdXZWF0aGVyIEFwcCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgbmF2UmlnaHQ6IFtcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgZWxlbWVudDogJ2RpdicsXG4gICAgLy8gICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAvLyAgICAgICBjbGFzczogJ3VuaXRfc3lzdGVtc19idXR0b25zJyxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgY2hpbGRyZW46IFtcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAvLyAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAvLyAgICAgICAgICAgaWQ6ICdpbXBlcmlhbCcsXG4gICAgLy8gICAgICAgICAgIGNsYXNzOiAndW5pdF9zeXN0ZW1zX2J1dHRvbiBzZWxlY3RlZCcsXG4gICAgLy8gICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgIC8vICAgICAgICAgICB2YWx1ZTogJ2ltcGVyaWFsJyxcbiAgICAvLyAgICAgICAgICAgLy8gdGV4dENvbnRlbnQ6ICfCsEYnLFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgIC8vICAgICAgICAgYXR0cmlidXRlczoge1xuICAgIC8vICAgICAgICAgICBpZDogJ21ldHJpYycsXG4gICAgLy8gICAgICAgICAgIGNsYXNzOiAndW5pdF9zeXN0ZW1zX2J1dHRvbicsXG4gICAgLy8gICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgIC8vICAgICAgICAgICB2YWx1ZTogJ21ldHJpYycsXG4gICAgLy8gICAgICAgICAgIC8vIHRleHRDb250ZW50OiAnwrBDJyxcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGlkOiAndW5pdF9zeXN0ZW1zX2J1dHRvbicsXG4gICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgZWxlbWVudDogJ3NwYW4nLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIGNsYXNzOiAnaW1wZXJpYWwnLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICfCsEYnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgY2xhc3M6ICdtZXRyaWMnLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICfCsEMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0nLFxuICAgICAgICB0ZXh0Q29udGVudDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBlbGVtZW50OiAnYScsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGhyZWY6ICcjJyxcbiAgICAgICAgY2xhc3M6ICduYXZfaXRlbScsXG4gICAgICAgIHRleHRDb250ZW50OiAnUGxhY2Vob2xkZXInLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVsZW1lbnQ6ICdhJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9taWtleUNvcy90aGVPZGluUHJvamVjdC90cmVlL21haW4vamF2YVNjcmlwdC9wcm9qZWN0cy93ZWF0aGVyLWFwcCcsXG4gICAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0nLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBzcmM6IEljb25HaXRodWIsXG4gICAgICAgICAgICBvbmxvYWQ6ICdTVkdJbmplY3QodGhpcyknLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG4gIG1lbnVCdXR0b246IHtcbiAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ25hdl9idG4nLFxuICAgIH0sXG4gICAgY2hpbGQ6IHtcbiAgICAgIGVsZW1lbnQ6ICdpbWcnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBzcmM6IEljb25NZW51LFxuICAgICAgICBvbmxvYWQ6ICdTVkdJbmplY3QodGhpcyknLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCAnLi4vLi4vc3R5bGVzL2hlYWRlci5jc3MnO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhci5jb25maWcnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBwdWJTdWIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJTdWInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNhY2hlRE9NKG5hdkVsZW1lbnQpIHtcbiAgICB0aGlzLm5hdmJhciA9IG5hdkVsZW1lbnQ7XG4gICAgdGhpcy5uYXZSaWdodCA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9yaWdodCcpO1xuICAgIHRoaXMubmF2TGlua3MgPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXZfaXRlbScpO1xuICAgIHRoaXMubmF2QnRuID0gbmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2J0bicpO1xuICAgIC8vIHRoaXMudW5pdFN5c3RlbXNCdG5zID0gbmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5pdF9zeXN0ZW1zX2J1dHRvbicpO1xuICAgIHRoaXMudW5pdFN5c3RlbXNCdG4gPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1bml0X3N5c3RlbXNfYnV0dG9uJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy50b2dnbGVOYXYgPSB0aGlzLnRvZ2dsZU5hdi5iaW5kKHRoaXMpO1xuICAgIC8vIHRoaXMuc2V0VW5pdFN5c3RlbSA9IHRoaXMuc2V0VW5pdFN5c3RlbS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVOYXYpO1xuICAgIC8vIHRoaXMudW5pdFN5c3RlbXNCdG5zLmZvckVhY2goKGJ0bikgPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRVbml0U3lzdGVtKSk7XG4gICAgdGhpcy50b2dnbGVVbml0U3lzdGVtID0gdGhpcy50b2dnbGVVbml0U3lzdGVtLmJpbmQodGhpcyk7XG4gICAgdGhpcy51bml0U3lzdGVtc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlVW5pdFN5c3RlbSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgY29uc3QgbmF2Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmF2RWxlbWVudC5pZCA9ICduYXZiYXInO1xuICAgIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgIE9iamVjdC5rZXlzKG5hdmJhcikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuYXZiYXJba2V5XSkpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChrZXkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbGVmdCcpID8gJ25hdl9sZWZ0JyA6ICduYXZfcmlnaHQnKTtcbiAgICAgICAgbmF2YmFyW2tleV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpID0gY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtLmVsZW1lbnQpO1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlcyhpdGVtLmF0dHJpYnV0ZXMpO1xuXG4gICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gY3JlYXRlRWxlbWVudChjaGlsZC5lbGVtZW50KTtcbiAgICAgICAgICAgICAgY2hpbGROb2RlLnNldEF0dHJpYnV0ZXMoY2hpbGQuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYnRuID0gY3JlYXRlRWxlbWVudChuYXZiYXJba2V5XS5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW1nID0gY3JlYXRlRWxlbWVudChuYXZiYXJba2V5XS5jaGlsZC5lbGVtZW50KTtcbiAgICAgICAgYnRuLnNldEF0dHJpYnV0ZXMobmF2YmFyW2tleV0uYXR0cmlidXRlcyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGVzKG5hdmJhcltrZXldLmNoaWxkLmF0dHJpYnV0ZXMpO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkNvbnRhaW5lcik7XG4gICAgdGhpcy5jYWNoZURPTShuYXZFbGVtZW50KTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiBuYXZFbGVtZW50O1xuICB9LFxuICB0b2dnbGVOYXYoKSB7XG4gICAgaWYgKHRoaXMubmF2UmlnaHQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcbiAgICAgIHRoaXMubmF2UmlnaHQuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdlJpZ2h0LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcbiAgICB9XG4gIH0sXG4gIC8vIHNldFVuaXRTeXN0ZW0oZSkge1xuICAvLyAgIGNvbnN0IGVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gIC8vICAgWy4uLnRoaXMudW5pdFN5c3RlbXNCdG5zXVxuICAvLyAgICAgLmZpbmQoKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSlcbiAgLy8gICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAvLyAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgLy8gICBwdWJTdWIucHVibGlzaCgnc2V0VW5pdFN5c3RlbScsIGVsZW1lbnQudmFsdWUpO1xuICAvLyB9LFxuICB0b2dnbGVVbml0U3lzdGVtKGUpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBlbGVtZW50LnZhbHVlKTtcbiAgICBsZXQgbmV3VmFsdWUgPSB0cnVlO1xuICAgIGxldCB1bml0U3lzdGVtID0gJ2ltcGVyaWFsJztcbiAgICBpZiAoZWxlbWVudC52YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICBuZXdWYWx1ZSA9IGZhbHNlO1xuICAgICAgdW5pdFN5c3RlbSA9ICdtZXRyaWMnO1xuICAgIH1cbiAgICBlbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3NldFVuaXRTeXN0ZW0nLCB1bml0U3lzdGVtKTtcbiAgICAvLyBwdWJTdWIucHVibGlzaCgnc2V0VW5pdFN5c3RlbScsIGVsZW1lbnQudmFsdWUpO1xuICB9LFxufTtcbiIsIi8vIGZvcmVjYXN0ZGF5LmRhdGUgfFxuLy8gKGZvcmVjYXN0ZGF5LmRheS5tYXh0ZW1wX2Zcbi8vIGZvcmVjYXN0ZGF5LmRheS5taW50ZW1wX2YpXG4vLyBmb3JlY2FzdGRheS5kYXkuY29uZGl0aW9uXG4vLyBmb3JlY2FzdGRheS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW4gfFxuLy8gd2luZFxuLy8gTlcsIE5OVywgTiwgTk5FLCBORVxuLy8gRU5FLCBFLCBFU0Vcbi8vIFNFLCBTU0UsIFMsIFNTVywgU1dcbi8vIFdTVywgVywgV05XXG4vLyBpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgZm9ybWF0RGF0ZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdERhdGUnO1xuaW1wb3J0IHsgdW5pdFN5c3RlbSB9IGZyb20gJy4uL3VuaXRzeXN0ZW1zJztcblxuY29uc3QgZGF0YSA9IChzdGF0ZSkgPT4gW1xuICB7XG4gICAga2V5OiAnZGF0ZScsXG4gICAgdmFsdWU6IHN0YXRlLmRhdGUsXG4gICAgc2V0VGV4dCgpIHtcbiAgICAgIHJldHVybiBgJHtmb3JtYXREYXRlKHRoaXMudmFsdWUsIHRydWUpfWA7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGtleTogJ21pbm1heHRlbXAnLFxuICAgIG1pbjoge1xuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnbWludGVtcF8nLCAndGVtcCcpLFxuICAgICAgbGFiZWw6ICdsb3cnLFxuICAgIH0sXG4gICAgbWF4OiB7XG4gICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICdtYXh0ZW1wXycsICd0ZW1wJyksXG4gICAgICBsYWJlbDogJ2hpZ2gnLFxuICAgIH0sXG4gICAgdW5pdDogJ8KwJyxcbiAgICBsYWJlbDogYGhpZ2ggLyBsb3dgLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5tYXgudmFsdWV9JHt0aGlzLnVuaXR9IC8gJHt0aGlzLm1pbi52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdjb25kaXRpb24nLFxuICAgIGxhYmVsOiBzdGF0ZS5jb25kaXRpb24udGV4dCxcbiAgICBpY29uOiBzdGF0ZS5jb25kaXRpb24uaWNvbixcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMubGFiZWx9YDtcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAncHJlY2lwJyxcbiAgICB2YWx1ZTogc3RhdGUuZGFpbHlfY2hhbmNlX29mX3JhaW4sXG4gICAgdW5pdDogJyUnLFxuICAgIGljb246IHN0YXRlLnNldEljb24oJ3JhaW4nKSxcbiAgICBzZXRUZXh0KCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICB9LFxuICB9LFxuXTtcblxuY29uc3QgbG9jYXRpb24gPSAoc3RhdGUpID0+ICh7XG4gIGxvY2F0aW9uOiB7XG4gICAgY291bnRyeTogc3RhdGUuY291bnRyeSxcbiAgICBsb2NhbHRpbWU6IHN0YXRlLmxvY2FsdGltZSxcbiAgICBuYW1lOiBzdGF0ZS5uYW1lLFxuICAgIHJlZ2lvbjogc3RhdGUucmVnaW9uLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSwgJHtcbiAgICAgICAgdGhpcy5yZWdpb24ubGVuZ3RoID09PSAwIHx8IHRoaXMucmVnaW9uID09PSB0aGlzLm5hbWUgPyB0aGlzLmNvdW50cnkgOiB0aGlzLnJlZ2lvblxuICAgICAgfWA7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBmb3JlY2FzdENvbnRyb2xsZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgdGhpcy5zZXREYXkgPSB0aGlzLnNldERheS5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IGZvcmVjYXN0ZGF5ID0gd2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXkubWFwKHRoaXMuc2V0RGF5KTtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgIC4uLndlYXRoZXJEYXRhLmxvY2F0aW9uLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubG9jYXRpb24oc3RhdGUpLFxuICAgICAgZm9yZWNhc3RkYXksXG4gICAgICBsYXN0X3VwZGF0ZWQ6IGZvcm1hdFRpbWUod2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWQpLnRvTG93ZXJDYXNlKCksXG4gICAgfTtcbiAgfSxcbiAgc2V0RGF5KG9iaikge1xuICAgIGNvbnN0IGRheXMgPSBvYmo7XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAuLi51bml0U3lzdGVtLFxuICAgICAgLi4ub2JqLmRheSxcbiAgICAgIC4uLm9iaixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgLi4uZGF0YShzdGF0ZSkgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSwgdGltZVN0YW1wKSB7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKGZvcmVjYXN0Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhKSk7XG4gIH0sXG4gIHNldFByb3BlcnRpZXMob2JqKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmopO1xuICB9LFxufTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgZm9yZWNhc3QgZnJvbSAnLi9mb3JlY2FzdC5jb25maWcnO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvdGFicy9mb3JlY2FzdC5jc3MnO1xuaW1wb3J0IGNyZWF0ZUNvbnRlbnRSb3dzIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlQ29udGVudFJvd3MnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcblxuY29uc3QgZm9yZWNhc3RCdWlsZGVyID0ge1xuICBpbml0KCkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBmb3JlY2FzdC5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIGZvcmVjYXN0LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIGZvcmVjYXN0LmpzJyk7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3QpO1xuICAgIGNvbnN0IGZvcmVjYXN0U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCBmb3JlY2FzdFNlY3Rpb25IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBjb25zdCBmb3JlY2FzdExvY2F0aW9uID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGltZVN0YW1wID0gY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgZm9yZWNhc3RTZWN0aW9uLmlkID0gJ2ZvcmVjYXN0JztcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nLnRleHRDb250ZW50ID0gJzMgRGF5IFdlYXRoZXInO1xuICAgIGZvcmVjYXN0TG9jYXRpb24udGV4dENvbnRlbnQgPSBgIC0gJHtmb3JlY2FzdC5sb2NhdGlvbi5zZXRUZXh0KCl9YDtcbiAgICBmb3JlY2FzdFRpbWVTdGFtcC50ZXh0Q29udGVudCA9IGBBcyBvZiAke2ZvcmVjYXN0Lmxhc3RfdXBkYXRlZH1gO1xuXG4gICAgZm9yZWNhc3RTZWN0aW9uSGVhZGluZy5hcHBlbmRDaGlsZChmb3JlY2FzdExvY2F0aW9uKTtcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RTZWN0aW9uSGVhZGluZyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uSGVhZGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGltZVN0YW1wKTtcbiAgICBmb3JlY2FzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9yZWNhc3RTZWN0aW9uSGVhZGVyKTtcblxuICAgIC8vIHRlbXBvcmFyeVxuICAgIGNvbnN0IGZvcmVjYXN0RGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBmb3JlY2FzdERldGFpbHMuaWQgPSAnZm9yZWNhc3RfZGV0YWlscyc7XG5cbiAgICBmb3JlY2FzdC5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICAgIGNvbnN0IGZvcmVjYXN0ZGF5ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBmb3JlY2FzdGRheS5jbGFzc05hbWUgPSAnZGF5JztcbiAgICAgIE9iamVjdC52YWx1ZXMoZGF5KS5mb3JFYWNoKChkZXRhaWwpID0+IHtcbiAgICAgICAgZm9yZWNhc3RkYXkuYXBwZW5kKGNyZWF0ZUNvbnRlbnRSb3dzKGNyZWF0ZUVsZW1lbnQsIG51bGwsIGRldGFpbC5pY29uLCBkZXRhaWwuc2V0VGV4dCgpKSk7XG4gICAgICB9KTtcbiAgICAgIGZvcmVjYXN0RGV0YWlscy5hcHBlbmRDaGlsZChmb3JlY2FzdGRheSk7XG4gICAgfSk7XG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgZm9yZWNhc3RTZWN0aW9uLmFwcGVuZENoaWxkKGZvcmVjYXN0RGV0YWlscyk7XG4gICAgcmV0dXJuIGZvcmVjYXN0U2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRm9yZWNhc3Qod2VhdGhlckRhdGEsIHRpbWVTdGFtcCkge1xuICBmb3JlY2FzdC5pbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApO1xuICByZXR1cm4gZm9yZWNhc3RCdWlsZGVyLnJlbmRlcigpO1xufVxuXG4vLyBkYXRlIHwgdGVtcCBoaWdoIC8gbG93IHwgY29uZGl0aW9uIHwgcHJlY2lwdGF0aW9uICUgfCB3aW5kXG4vLyBleGFtcGxlXG4vLyBXZWQgMjAgfCA2MMKwIC8gNDfCsCB8IFN1bm55IHwgMSUgfCBOTkUgNiBtcGhcbiIsIi8vIGN1cnJlbnQubGFzdF91cGRhdGVkXG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLnRpbWVcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIudGVtcF9mXG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmNvbmRpdGlvbi50ZXh0XG4vLyBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmNoYW5jZV9vZl9yYWluXG4vLyAoZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci53aW5kX2RpclxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci53aW5kX21waClcblxuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCB7IHVuaXRTeXN0ZW0gfSBmcm9tICcuLi91bml0c3lzdGVtcyc7XG5cbmNvbnN0IGRhdGEgPSAoc3RhdGUpID0+ICh7XG4gIHN1bW1hcnk6IFtcbiAgICB7XG4gICAgICBuYW1lOiAndGltZScsXG4gICAgICB2YWx1ZTogc3RhdGUudGltZSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXRUaW1lKHRoaXMudmFsdWUpfWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3RlbXAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndGVtcF8nLCAndGVtcCcpLFxuICAgICAgdW5pdDogJ8KwJyxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2NvbmRpdGlvbicsXG4gICAgICBsYWJlbDogc3RhdGUuY29uZGl0aW9uLnRleHQsXG4gICAgICBpY29uOiBzdGF0ZS5jb25kaXRpb24uaWNvbixcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVsfWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3ByZWNpcCcsXG4gICAgICB2YWx1ZTogc3RhdGUuY2hhbmNlX29mX3JhaW4sXG4gICAgICB1bml0OiAnJScsXG4gICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdyYWluJyksXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd3aW5kJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3dpbmRfJywgJ3NwZWVkJyksXG4gICAgICB1bml0OiBzdGF0ZS5nZXQoJ3NwZWVkJyksXG4gICAgICBsYWJlbDogJ3dpbmQnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignd2luZCcpLFxuICAgICAgZGlyOiB7XG4gICAgICAgIHZhbHVlOiBzdGF0ZS53aW5kX2RpcixcbiAgICAgIH0sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5kaXIudmFsdWV9ICR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgZGV0YWlsczogW1xuICAgIHtcbiAgICAgIGtleTogJ2ZlZWxzbGlrZScsXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAnZmVlbHNsaWtlXycsICd0ZW1wJyksXG4gICAgICBsYWJlbDogJ2ZlZWxzIGxpa2UnLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICd3aW5kJyxcbiAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3dpbmRfJywgJ3NwZWVkJyksXG4gICAgICB1bml0OiBzdGF0ZS5nZXQoJ3NwZWVkJyksXG4gICAgICBsYWJlbDogJ3dpbmQnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignd2luZCcpLFxuICAgICAgZGlyOiB7XG4gICAgICAgIHZhbHVlOiBzdGF0ZS53aW5kX2RpcixcbiAgICAgIH0sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5kaXIudmFsdWV9ICR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdodW1pZGl0eScsXG4gICAgICB2YWx1ZTogc3RhdGUuaHVtaWRpdHksXG4gICAgICB1bml0OiAnJScsXG4gICAgICBsYWJlbDogJ2h1bWlkaXR5JyxcbiAgICAgIGljb246IHN0YXRlLnNldEljb24oJ2h1bWlkaXR5JyksXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3V2JyxcbiAgICAgIHZhbHVlOiBzdGF0ZS51dixcbiAgICAgIGxhYmVsOiAnVVYgSW5kZXgnLFxuICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbigndXYnKSxcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSBvZiAxMWA7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnY2xvdWQnLFxuICAgICAgdmFsdWU6IHN0YXRlLmNsb3VkLFxuICAgICAgdW5pdDogJyUnLFxuICAgICAgbGFiZWw6ICdjbG91ZCBjb3ZlcicsXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3ByZWNpcCcsXG4gICAgICB2YWx1ZTogc3RhdGUucHJlY2lwX2luLFxuICAgICAgdW5pdDogc3RhdGUuZ2V0KCdwcmVjaXAnKSxcbiAgICAgIGxhYmVsOiAncHJlY2lwIGFtb3VudCcsXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0ke3RoaXMudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxufSk7XG5cbmNvbnN0IGRhdGUgPSAoc3RhdGUpID0+ICh7XG4gIGRhdGU6IHN0YXRlLmRhdGUsXG59KTtcblxuY29uc3QgbG9jYXRpb24gPSAoc3RhdGUpID0+ICh7XG4gIGxvY2F0aW9uOiB7XG4gICAgY291bnRyeTogc3RhdGUuY291bnRyeSxcbiAgICBsb2NhbHRpbWU6IHN0YXRlLmxvY2FsdGltZSxcbiAgICBuYW1lOiBzdGF0ZS5uYW1lLFxuICAgIHJlZ2lvbjogc3RhdGUucmVnaW9uLFxuICAgIHNldFRleHQoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSwgJHtcbiAgICAgICAgdGhpcy5yZWdpb24ubGVuZ3RoID09PSAwIHx8IHRoaXMucmVnaW9uID09PSB0aGlzLm5hbWUgPyB0aGlzLmNvdW50cnkgOiB0aGlzLnJlZ2lvblxuICAgICAgfWA7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBob3VybHlDb250cm9sbGVyID0ge1xuICBpbml0KHdlYXRoZXJEYXRhKSB7XG4gICAgdGhpcy53ZWF0aGVyRGF0YSA9IHdlYXRoZXJEYXRhO1xuICAgIHRoaXMuc2V0QXJyYXkgPSB0aGlzLnNldEFycmF5LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRIb3VycyA9IHRoaXMuc2V0SG91cnMuYmluZCh0aGlzKTtcbiAgICBjb25zdCBmb3JlY2FzdGRheSA9IHdlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5Lm1hcCh0aGlzLnNldEFycmF5KTtcblxuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4ud2VhdGhlckRhdGEsXG4gICAgICAuLi53ZWF0aGVyRGF0YS5sb2NhdGlvbixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmxvY2F0aW9uKHN0YXRlKSxcbiAgICAgIGZvcmVjYXN0ZGF5LFxuICAgICAgbGFzdF91cGRhdGVkOiBmb3JtYXRUaW1lKHN0YXRlLmN1cnJlbnQubGFzdF91cGRhdGVkKS50b0xvd2VyQ2FzZSgpLFxuICAgIH07XG4gIH0sXG4gIHNldEFycmF5KG9iaikge1xuICAgIGNvbnN0IGhvdXJzID0gb2JqLmhvdXIucmVkdWNlKHRoaXMuc2V0SG91cnMsIFtdKTtcbiAgICBjb25zdCBzdGF0ZSA9IHsgLi4ub2JqIH07XG5cbiAgICByZXR1cm4geyAuLi5kYXRlKHN0YXRlKSwgaG91cnMgfTtcbiAgfSxcbiAgc2V0SG91cnMoZmlsdGVyZWQsIGhvdXIpIHtcbiAgICBjb25zdCBkYXRlMSA9IG5ldyBEYXRlKHRoaXMud2VhdGhlckRhdGEuY3VycmVudC5sYXN0X3VwZGF0ZWQpO1xuICAgIGNvbnN0IGRhdGUyID0gbmV3IERhdGUoaG91ci50aW1lKTtcblxuICAgIGlmIChkYXRlMS5nZXRUaW1lKCkgPD0gZGF0ZTIuZ2V0VGltZSgpKSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4udW5pdFN5c3RlbSxcbiAgICAgICAgLi4uaG91cixcbiAgICAgIH07XG4gICAgICBmaWx0ZXJlZC5wdXNoKHsgLi4uZGF0YShzdGF0ZSkgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICB0aGlzLnNldFByb3BlcnRpZXMoaG91cmx5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICAgIC8vIHRoaXMuc2V0UHJvcGVydGllcyhob3VybHlDb250cm9sbGVyLmluaXQod2VhdGhlckRhdGEsIHVuaXRTeXN0ZW0pKTtcbiAgfSxcbiAgc2V0UHJvcGVydGllcyhvYmopIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gIH0sXG59O1xuLy8gRGF0ZVxuLy8gdGltZSB8IHRlbXAgfCBjb25kaXRpb24gfCBwcmVjaXB0YXRpb24gJSB8IHdpbmRcbi8vIGV4YW1wbGVcbi8vIDE6MzAgcG0gfCA0N8KwIHwgU3VubnkgfCAxJSB8IE4gNiBtcGhcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaG91cmx5IGZyb20gJy4vaG91cmx5LmNvbmZpZyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy90YWJzL2hvdXJseS5jc3MnO1xuaW1wb3J0IGZvcm1hdERhdGUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXREYXRlJztcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5cbmNvbnN0IGhvdXJseUJ1aWxkZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHt9LFxuICBjYWNoZURPTSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGVET00oKSBydW5uaW5nIGZyb20gaG91cmx5LmpzJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gaG91cmx5LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIGhvdXJseS5qcycpO1xuICAgIGNvbnNvbGUubG9nKGhvdXJseSk7XG4gICAgY29uc3QgaG91cmx5U2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgaG91cmx5U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNvbnN0IGhvdXJseUxvY2F0aW9uID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGhvdXJseVRpbWVTdGFtcCA9IGNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgIGhvdXJseVNlY3Rpb24uaWQgPSAnaG91cmx5JztcbiAgICBob3VybHlTZWN0aW9uSGVhZGluZy50ZXh0Q29udGVudCA9ICdIb3VybHkgd2VhdGhlcic7XG4gICAgaG91cmx5TG9jYXRpb24udGV4dENvbnRlbnQgPSBgIC0gJHtob3VybHkubG9jYXRpb24uc2V0VGV4dCgpfWA7XG4gICAgaG91cmx5VGltZVN0YW1wLnRleHRDb250ZW50ID0gYEFzIG9mICR7aG91cmx5Lmxhc3RfdXBkYXRlZH1gO1xuXG4gICAgaG91cmx5U2VjdGlvbkhlYWRpbmcuYXBwZW5kQ2hpbGQoaG91cmx5TG9jYXRpb24pO1xuICAgIGhvdXJseVNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoaG91cmx5U2VjdGlvbkhlYWRpbmcpO1xuICAgIGhvdXJseVNlY3Rpb25IZWFkZXIuYXBwZW5kQ2hpbGQoaG91cmx5VGltZVN0YW1wKTtcbiAgICBob3VybHlTZWN0aW9uLmFwcGVuZENoaWxkKGhvdXJseVNlY3Rpb25IZWFkZXIpO1xuXG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgY29uc3QgaG91cmx5RGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob3VybHlEZXRhaWxzLmlkID0gJ2hvdXJseV9kZXRhaWxzJztcblxuICAgIGhvdXJseS5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICAgIGNvbnN0IGhvdXJseURheSA9IGNyZWF0ZUVsZW1lbnQoJ29sJyk7XG4gICAgICBjb25zdCBob3VybHlEYXlIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgIGhvdXJseURheS5jbGFzc05hbWUgPSAnZGF5JztcbiAgICAgIGhvdXJseURheUhlYWRpbmcudGV4dENvbnRlbnQgPSBmb3JtYXREYXRlKGRheS5kYXRlKTtcbiAgICAgIGhvdXJseURheS5hcHBlbmRDaGlsZChob3VybHlEYXlIZWFkaW5nKTtcbiAgICAgIGRheS5ob3Vycy5mb3JFYWNoKChob3VyKSA9PiB7XG4gICAgICAgIGNvbnN0IGhvdXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91ckNvbnRhaW5lci5jbGFzc05hbWUgPSAnaG91cic7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoaG91ci5zdW1tYXJ5KS5mb3JFYWNoKChkZXRhaWwpID0+IHtcbiAgICAgICAgICBob3VyQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5zZXRUZXh0KCkpLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhvdXJseURheS5hcHBlbmRDaGlsZChob3VyQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgICAgaG91cmx5RGV0YWlscy5hcHBlbmRDaGlsZChob3VybHlEYXkpO1xuICAgIH0pO1xuXG4gICAgaG91cmx5U2VjdGlvbi5hcHBlbmRDaGlsZChob3VybHlEZXRhaWxzKTtcbiAgICAvLyB0ZW1wb3JhcnlcbiAgICByZXR1cm4gaG91cmx5U2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG91cmx5KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgaG91cmx5LmluaXQod2VhdGhlckRhdGEsIHRpbWVTdGFtcCk7XG4gIHJldHVybiBob3VybHlCdWlsZGVyLnJlbmRlcigpO1xufVxuXG4vLyBEYXRlXG4vLyB0aW1lIHwgdGVtcCB8IGNvbmRpdGlvbiB8IHByZWNpcHRhdGlvbiAlIHwgd2luZFxuLy8gZXhhbXBsZVxuLy8gMTozMCBwbSB8IDQ3wrAgfCBTdW5ueSB8IDElIHwgTiA2IG1waFxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBidWlsZFRhYnNOYXZiYXIgZnJvbSAnLi90YWJzX25hdmJhci90YWJzX25hdmJhcic7XG5pbXBvcnQgYnVpbGRUb2RheSBmcm9tICcuL3RvZGF5L3RvZGF5JztcbmltcG9ydCBidWlsZEhvdXJseSBmcm9tICcuL2hvdXJseS9ob3VybHknO1xuaW1wb3J0IGJ1aWxkRm9yZWNhc3QgZnJvbSAnLi9mb3JlY2FzdC9mb3JlY2FzdCc7XG5pbXBvcnQgcHViU3ViIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHViU3ViJztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL3RhYnMvdGFicy5jc3MnO1xuXG5jb25zdCBidWlsZCA9IHtcbiAgdGFic05hdmJhcjogYnVpbGRUYWJzTmF2YmFyLFxuICB0b2RheTogYnVpbGRUb2RheSxcbiAgaG91cmx5OiBidWlsZEhvdXJseSxcbiAgZm9yZWNhc3Q6IGJ1aWxkRm9yZWNhc3QsXG59O1xuXG5jb25zdCB0YWJzQnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMudGltZVN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgdGhpcy5zZXRXZWF0aGVyKHdlYXRoZXJEYXRhKTtcbiAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgcHViU3ViLnN1YnNjcmliZSgncmVuZGVyJywgdGhpcy5yZW5kZXIpO1xuICB9LFxuICBzZXRXZWF0aGVyKHdlYXRoZXJEYXRhKSB7XG4gICAgdGhpcy53ZWF0aGVyRGF0YSA9IHdlYXRoZXJEYXRhO1xuICAgIHRoaXMubG9jYXRpb24gPSB3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMuYXBpTGFzdFVwZGF0ZWQgPSB3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZF9lcG9jaDtcbiAgfSxcbiAgY2FjaGVET00odGFic1NlY3Rpb24pIHtcbiAgICB0aGlzLnRhYnNTZWN0aW9uID0gdGFic1NlY3Rpb247XG4gICAgdGhpcy50YWJzTGlzdCA9IHRhYnNTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX2xpc3RfaXRlbSA+IGEnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgdGhpcy50YWJzTGlzdC5mb3JFYWNoKCh0YWIpID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3dpdGNoVGFiKSk7XG4gIH0sXG4gIHJlbmRlcihrZXkpIHtcbiAgICBsZXQgY29udGVudDtcbiAgICBpZiAoIWtleSkge1xuICAgICAgLy8gaWYgbm8ga2V5XG4gICAgICBjb250ZW50ID0gYnVpbGQudG9kYXkodGhpcy53ZWF0aGVyRGF0YSwgdGhpcy50aW1lU3RhbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gYnVpbGRba2V5XSh0aGlzLndlYXRoZXJEYXRhLCB0aGlzLnRpbWVTdGFtcCk7XG4gICAgICAvLyB0aGlzLnRhYnNTZWN0aW9uLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5zZXRBY3RpdmVUYWIoY29udGVudC5pZCk7XG4gICAgdGhpcy50YWJzU2VjdGlvbi5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgfSxcbiAgc3dpdGNoVGFiKGUsIHRhYktleSkge1xuICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldCk7XG4gICAgY29uc29sZS5sb2codGFiS2V5KTtcbiAgICBjb25zdCB7IGNsYXNzTmFtZTogZWxlbWVudENsYXNzTmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHJlbmRlcktleSA9IGVsZW1lbnRDbGFzc05hbWU7XG5cbiAgICBwdWJTdWIucHVibGlzaCgnZ2V0V2VhdGhlcicsIHRoaXMubG9jYXRpb24sIHJlbmRlcktleSk7XG4gIH0sXG4gIHNldEFjdGl2ZVRhYihpZCkge1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRhYnNMaXN0KTtcbiAgICBjb25zb2xlLmxvZyhbLi4udGhpcy50YWJzTGlzdF0uZmluZCgoYW5jaG9yKSA9PiBhbmNob3IuY2xhc3NMaXN0LmNvbnRhaW5zKGlkKSkpO1xuICAgIC8vIGlmICh0aGlzLmFjdGl2ZVRhYikgdGhpcy5hY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSBbLi4udGhpcy50YWJzTGlzdF0uZmluZCgoYW5jaG9yKSA9PiBhbmNob3IuY2xhc3NMaXN0LmNvbnRhaW5zKGlkKSk7XG4gICAgLy8gdGhpcy5hY3RpdmVUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgdGhpcy5hY3RpdmVUYWIuc2V0QXR0cmlidXRlcyh7ICdkYXRhLWFjdGl2ZSc6IHRydWUgfSk7XG4gICAgdGhpcy5hY3RpdmVLZXkgPSBpZDtcbiAgICBjb25zb2xlLmxvZyhgYWN0aXZlS2V5OiAke3RoaXMuYWN0aXZlS2V5fWApO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzZXRBY3RpdmVUYWInLCBpZCk7XG4gICAgLy8gc2VuZHMgaWQgdG8gc2V0QWN0aXZlVGFiIGluIGhlYWRlci5qcyBtb2R1bGVcbiAgfSxcbiAgLy8gdXBkYXRlRGF0YSh3ZWF0aGVyRGF0YSwga2V5KSB7XG4gIC8vICAgdGhpcy53ZWF0aGVyRGF0YSA9IHdlYXRoZXJEYXRhO1xuICAvLyAgIHRoaXMucmVuZGVyKGtleSk7XG4gIC8vIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRhYnMod2VhdGhlckRhdGEsIHJlbmRlcktleSkge1xuICBjb25zb2xlLmxvZyhyZW5kZXJLZXkpO1xuICB0YWJzQnVpbGRlci5pbml0KHdlYXRoZXJEYXRhKTtcbiAgY29uc3QgdGFic1NlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIC8vIGNvbnN0IHRhYnNIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgdGFic1NlY3Rpb24uaWQgPSAndGFicyc7XG4gIC8vIHRhYnNIZWFkaW5nLnNldEF0dHJpYnV0ZXMoeyB0ZXh0Q29udGVudDogJ1RBQlMnIH0pO1xuXG4gIC8vIHRhYnNTZWN0aW9uLmFwcGVuZENoaWxkKHRhYnNIZWFkaW5nKTtcbiAgdGFic1NlY3Rpb24uYXBwZW5kQ2hpbGQoYnVpbGQudGFic05hdmJhcigpKTtcbiAgdGFic0J1aWxkZXIuY2FjaGVET00odGFic1NlY3Rpb24pO1xuICBpZiAocmVuZGVyS2V5KSB7XG4gICAgdGFic0J1aWxkZXIucmVuZGVyKHJlbmRlcktleSk7XG4gIH0gZWxzZSB7XG4gICAgdGFic0J1aWxkZXIucmVuZGVyKCk7XG4gIH1cbiAgdGFic0J1aWxkZXIuYmluZEV2ZW50cygpO1xuICByZXR1cm4gdGFic1NlY3Rpb247XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ3RvZGF5JyxcbiAgICAgIHRleHRDb250ZW50OiAnVG9kYXknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ2hvdXJseScsXG4gICAgICB0ZXh0Q29udGVudDogJ0hvdXJseScsXG4gICAgICBocmVmOiAnIycsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGNsYXNzOiAnZm9yZWNhc3QnLFxuICAgICAgdGV4dENvbnRlbnQ6ICczLURheScsXG4gICAgICBocmVmOiAnIycsXG4gICAgfSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHRhYnMgZnJvbSAnLi90YWJzX25hdmJhci5jb25maWcnO1xuXG5jb25zdCB0YWJzTmF2YmFyQnVpbGRlciA9IHtcbiAgaW5pdCgpIHt9LFxuICBjYWNoZURPTSgpIHt9LFxuICBiaW5kRXZlbnRzKCkge30sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0YWJzTmF2YmFyID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IHRhYnNMaXN0ID0gY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0YWJzTmF2YmFyLmlkID0gJ3RhYnNfbmF2YmFyJztcbiAgICBPYmplY3QudmFsdWVzKHRhYnMpLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgY29uc3QgdGFic0xpc3RJdGVtID0gY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGNvbnN0IHRhYnNOYXZBbmNob3IgPSBjcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB0YWJzTGlzdEl0ZW0uc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAndGFic19saXN0X2l0ZW0nIH0pO1xuICAgICAgdGFic05hdkFuY2hvci5zZXRBdHRyaWJ1dGVzKHRhYi5hdHRyaWJ1dGVzKTtcblxuICAgICAgdGFic0xpc3RJdGVtLmFwcGVuZENoaWxkKHRhYnNOYXZBbmNob3IpO1xuICAgICAgdGFic0xpc3QuYXBwZW5kQ2hpbGQodGFic0xpc3RJdGVtKTtcbiAgICB9KTtcblxuICAgIHRhYnNOYXZiYXIuYXBwZW5kQ2hpbGQodGFic0xpc3QpO1xuICAgIHJldHVybiB0YWJzTmF2YmFyO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRUYWJzTmF2YmFyKCkge1xuICByZXR1cm4gdGFic05hdmJhckJ1aWxkZXIucmVuZGVyKCk7XG59XG4iLCIvLyBjdXJyZW50LnRlbXBfZlxuLy8gY3VycmVudC5mZWVsc2xpa2VfZlxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZlxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZlxuLy8gY3VycmVudC5odW1pZGl0eVxuLy8gY3VycmVudC5wcmVzc3VyZV9pblxuLy8gY3VycmVudC52aXNfbWlsZXNcbi8vIGN1cnJlbnQud2luZF9tcGhcbi8vIGN1cnJlbnQud2luZF9kaXJcbmltcG9ydCBmb3JtYXRUaW1lIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvZm9ybWF0VGltZSc7XG5pbXBvcnQgeyB1bml0U3lzdGVtIH0gZnJvbSAnLi4vdW5pdHN5c3RlbXMnO1xuXG5jb25zdCBkYXRhID0gKHN0YXRlKSA9PiAoe1xuICBzdW1tYXJ5OiBbXG4gICAge1xuICAgICAga2V5OiAndGVtcCcsXG4gICAgICB1bml0OiAnwrAnLFxuICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndGVtcF8nLCAndGVtcCcpLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdjb25kaXRpb24nLFxuICAgICAgbGFiZWw6IHN0YXRlLmNvbmRpdGlvbi50ZXh0LFxuICAgICAgaWNvbjogc3RhdGUuY29uZGl0aW9uLmljb24sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH1gO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBkZXRhaWxzOiB7XG4gICAgaGVhZGVyOiBbXG4gICAgICB7XG4gICAgICAgIGtleTogJ2ZlZWxzbGlrZScsXG4gICAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ2ZlZWxzbGlrZV8nLCAndGVtcCcpLFxuICAgICAgICBsYWJlbDogJ2ZlZWxzIGxpa2UnLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdzdW5yaXNlJyxcbiAgICAgICAgdmFsdWU6IGZvcm1hdFRpbWUoc3RhdGUuc3VucmlzZSkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgbGFiZWw6ICdzdW5yaXNlJyxcbiAgICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignc3VucmlzZScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdzdW5zZXQnLFxuICAgICAgICB2YWx1ZTogZm9ybWF0VGltZShzdGF0ZS5zdW5zZXQpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGxhYmVsOiAnc3Vuc2V0JyxcbiAgICAgICAgaWNvbjogc3RhdGUuc2V0SWNvbignc3Vuc2V0JyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBib2R5OiBbXG4gICAgICB7XG4gICAgICAgIGtleTogJ21pbm1heHRlbXAnLFxuICAgICAgICBtaW46IHtcbiAgICAgICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUuZGF5LCAnbWludGVtcF8nLCAndGVtcCcpLFxuICAgICAgICAgIGxhYmVsOiAnbG93JyxcbiAgICAgICAgfSxcbiAgICAgICAgbWF4OiB7XG4gICAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLmRheSwgJ21heHRlbXBfJywgJ3RlbXAnKSxcbiAgICAgICAgICBsYWJlbDogJ2hpZ2gnLFxuICAgICAgICB9LFxuICAgICAgICB1bml0OiAnwrAnLFxuICAgICAgICBsYWJlbDogYGhpZ2ggLyBsb3dgLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdtaW5tYXh0ZW1wJyksXG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMubWF4LnZhbHVlfSR7dGhpcy51bml0fSAvICR7dGhpcy5taW4udmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2h1bWlkaXR5JyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLmh1bWlkaXR5LFxuICAgICAgICB1bml0OiAnJScsXG4gICAgICAgIGxhYmVsOiAnaHVtaWRpdHknLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdodW1pZGl0eScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdwcmVzc3VyZScsXG4gICAgICAgIHZhbHVlOiBzdGF0ZS5zZXRWYWx1ZShzdGF0ZSwgJ3ByZXNzdXJlXycsICdwcmVzc3VyZScpLFxuICAgICAgICB1bml0OiBzdGF0ZS5nZXQoJ3ByZXNzdXJlJyksXG4gICAgICAgIGxhYmVsOiAncHJlc3N1cmUnLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCdwcmVzc3VyZScpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndmlzJyxcbiAgICAgICAgdmFsdWU6IHN0YXRlLnNldFZhbHVlKHN0YXRlLCAndmlzXycsICdkaXN0YW5jZScpLFxuICAgICAgICB1bml0OiBzdGF0ZS5nZXQoJ2Rpc3RhbmNlJyksXG4gICAgICAgIGxhYmVsOiAndmlzaWJpbGl0eScsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3Zpc2liaWxpdHknKSxcbiAgICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX0gJHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3dpbmQnLFxuICAgICAgICB2YWx1ZTogc3RhdGUuc2V0VmFsdWUoc3RhdGUsICd3aW5kXycsICdzcGVlZCcpLFxuICAgICAgICB1bml0OiBzdGF0ZS5nZXQoJ3NwZWVkJyksXG4gICAgICAgIGxhYmVsOiAnd2luZCcsXG4gICAgICAgIGljb246IHN0YXRlLnNldEljb24oJ3dpbmQnKSxcbiAgICAgICAgZGlyOiB7XG4gICAgICAgICAgdmFsdWU6IHN0YXRlLndpbmRfZGlyLFxuICAgICAgICB9LFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLmRpci52YWx1ZX0gJHt0aGlzLnZhbHVlfSAke3RoaXMudW5pdH1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndXYnLFxuICAgICAgICB2YWx1ZTogc3RhdGUudXYsXG4gICAgICAgIGxhYmVsOiAnVVYgSW5kZXgnLFxuICAgICAgICBpY29uOiBzdGF0ZS5zZXRJY29uKCd1dicpLFxuICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSBvZiAxMWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59KTtcblxuY29uc3QgbG9jYXRpb24gPSAoc3RhdGUpID0+ICh7XG4gIGNvdW50cnk6IHN0YXRlLmNvdW50cnksXG4gIGxvY2FsdGltZTogc3RhdGUubG9jYWx0aW1lLFxuICBuYW1lOiBzdGF0ZS5uYW1lLFxuICByZWdpb246IHN0YXRlLnJlZ2lvbixcbiAgc2V0VGV4dCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSwgJHtcbiAgICAgIHRoaXMucmVnaW9uLmxlbmd0aCA9PT0gMCB8fCB0aGlzLnJlZ2lvbiA9PT0gdGhpcy5uYW1lID8gdGhpcy5jb3VudHJ5IDogdGhpcy5yZWdpb25cbiAgICB9YDtcbiAgfSxcbn0pO1xuXG5jb25zdCB0b2RheUNvbnRyb2xsZXIgPSB7XG4gIGluaXQod2VhdGhlckRhdGEpIHtcbiAgICB0aGlzLndlYXRoZXJEYXRhID0gd2VhdGhlckRhdGE7XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAvLyBpY29uczogdW5pdFN5c3RlbS5pY29ucyxcbiAgICAgIC8vIGdldDogdW5pdFN5c3RlbS5nZXQsXG4gICAgICAvLyBzZXRJY29uOiB1bml0U3lzdGVtLnNldEljb24sXG4gICAgICAvLyBzZXRWYWx1ZTogdW5pdFN5c3RlbS5zZXRWYWx1ZSxcbiAgICAgIC8vIHJvdW5kVmFsdWU6IHVuaXRTeXN0ZW0ucm91bmRWYWx1ZSxcbiAgICAgIC4uLnVuaXRTeXN0ZW0sXG4gICAgICAuLi53ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXSxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLFxuICAgICAgLi4ud2VhdGhlckRhdGEuY3VycmVudCxcbiAgICAgIC4uLndlYXRoZXJEYXRhLmxvY2F0aW9uLFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRhdGEoc3RhdGUpLFxuICAgICAgbG9jYXRpb246IGxvY2F0aW9uKHN0YXRlKSxcbiAgICAgIGxhc3RfdXBkYXRlZDogZm9ybWF0VGltZSh3ZWF0aGVyRGF0YS5jdXJyZW50Lmxhc3RfdXBkYXRlZCkudG9Mb3dlckNhc2UoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApIHtcbiAgICAvLyBjb25zb2xlLmxvZyh0b2RheUNvbnRyb2xsZXIuaW5pdCh3ZWF0aGVyRGF0YSwgdW5pdFN5c3RlbSkpO1xuICAgIGNvbnNvbGUubG9nKHRpbWVTdGFtcCk7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHRvZGF5Q29udHJvbGxlci5pbml0KHdlYXRoZXJEYXRhKSk7XG4gIH0sXG4gIHNldFByb3BlcnRpZXMob2JqKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmopO1xuICB9LFxufTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5pbXBvcnQgdG9kYXkgZnJvbSAnLi90b2RheS5jb25maWcnO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvdGFicy90b2RheS5jc3MnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcblxuY29uc3QgdG9kYXlCdWlsZGVyID0ge1xuICBpbml0KCkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSB0b2RheS5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIHRvZGF5LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0b2RheSk7XG4gICAgY29uc3QgdG9kYXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuXG4gICAgdG9kYXlTZWN0aW9uLmlkID0gJ3RvZGF5JztcblxuICAgIC8vIHRlbXBvcmFyeVxuICAgIGNvbnN0IHRvZGF5U3VtbWFyeSA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCB0b2RheUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IHRvZGF5U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGNvbnN0IHRvZGF5VGltZVN0YW1wID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgdG9kYXlTdW1tYXJ5LmlkID0gJ3RvZGF5X3N1bW1hcnknO1xuICAgIC8vIHRvZGF5U2VjdGlvbkhlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiAnVE9EQVknIH0pO1xuICAgIHRvZGF5U2VjdGlvbkhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHt0b2RheS5sb2NhdGlvbi5zZXRUZXh0KCl9IGA7XG4gICAgdG9kYXlUaW1lU3RhbXAudGV4dENvbnRlbnQgPSBgQXMgb2YgJHt0b2RheS5sYXN0X3VwZGF0ZWR9YDtcblxuICAgIHRvZGF5U2VjdGlvbkhlYWRpbmcuYXBwZW5kQ2hpbGQodG9kYXlUaW1lU3RhbXApO1xuICAgIHRvZGF5SGVhZGVyLmFwcGVuZENoaWxkKHRvZGF5U2VjdGlvbkhlYWRpbmcpO1xuICAgIHRvZGF5U3VtbWFyeS5hcHBlbmRDaGlsZCh0b2RheUhlYWRlcik7XG5cbiAgICB0b2RheS5zdW1tYXJ5LmZvckVhY2goKGRldGFpbCkgPT4ge1xuICAgICAgdG9kYXlTdW1tYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVDb250ZW50Um93cyhjcmVhdGVFbGVtZW50LCBudWxsLCBkZXRhaWwuaWNvbiwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9kYXlEZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHRvZGF5RGV0YWlscy5pZCA9ICd0b2RheV9kZXRhaWxzJztcblxuICAgIGNvbnN0IHRvZGF5RGV0YWlsc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRvZGF5RGV0YWlsc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZGF5RGV0YWlsc0hlYWRlci5jbGFzc0xpc3QuYWRkKCd0b2RheV9kZXRhaWxzX2hlYWRlcicpO1xuICAgIHRvZGF5RGV0YWlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RheV9kZXRhaWxzX2NvbnRhaW5lcicpO1xuXG4gICAgdG9kYXlEZXRhaWxzSGVhZGVyLmFwcGVuZENoaWxkKFxuICAgICAgY3JlYXRlQ29udGVudFJvd3MoXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHRvZGF5LmRldGFpbHMuaGVhZGVyWzBdLmljb24sXG4gICAgICAgIHRvZGF5LmRldGFpbHMuaGVhZGVyWzBdLmxhYmVsLFxuICAgICAgICB0b2RheS5kZXRhaWxzLmhlYWRlclswXS5zZXRUZXh0KCksXG4gICAgICApLFxuICAgICk7XG5cbiAgICBjb25zdCB0b2RheURldGFpbHNTdW4gPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RheURldGFpbHNTdW4uY2xhc3NMaXN0LmFkZCgndG9kYXlfZGV0YWlsc19zdW4nKTtcbiAgICB0b2RheS5kZXRhaWxzLmhlYWRlci5mb3JFYWNoKChkZXRhaWwsIGkpID0+IHtcbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICB0b2RheURldGFpbHNTdW4uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoY3JlYXRlRWxlbWVudCwgbnVsbCwgZGV0YWlsLmljb24sIGRldGFpbC5sYWJlbCwgZGV0YWlsLnNldFRleHQoKSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0b2RheS5kZXRhaWxzLmJvZHkuZm9yRWFjaCgoZGV0YWlsKSA9PiB7XG4gICAgICB0b2RheURldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUNvbnRlbnRSb3dzKGNyZWF0ZUVsZW1lbnQsIG51bGwsIGRldGFpbC5pY29uLCBkZXRhaWwubGFiZWwsIGRldGFpbC5zZXRUZXh0KCkpLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRvZGF5RGV0YWlsc0hlYWRlci5hcHBlbmRDaGlsZCh0b2RheURldGFpbHNTdW4pO1xuICAgIHRvZGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh0b2RheVN1bW1hcnkpO1xuICAgIHRvZGF5RGV0YWlscy5hcHBlbmRDaGlsZCh0b2RheURldGFpbHNIZWFkZXIpO1xuICAgIHRvZGF5RGV0YWlscy5hcHBlbmRDaGlsZCh0b2RheURldGFpbHNDb250YWluZXIpO1xuICAgIHRvZGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh0b2RheURldGFpbHMpO1xuICAgIC8vIHRlbXBvcmFyeVxuXG4gICAgcmV0dXJuIHRvZGF5U2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVG9kYXkod2VhdGhlckRhdGEsIHRpbWVTdGFtcCkge1xuICAvLyBjb25zb2xlLmxvZyh0aW1lU3RhbXApO1xuICB0b2RheS5pbml0KHdlYXRoZXJEYXRhLCB0aW1lU3RhbXApO1xuICByZXR1cm4gdG9kYXlCdWlsZGVyLnJlbmRlcigpO1xufVxuXG4vLyBIaWdoIC8gTG93XG4vLyBleCwgODfCsCAvIDQwwrBcblxuLy8gV2luZFxuLy8gZXgsIE5OVyAxNCBtcGhcbiIsImltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vLi4vaGVscGVycy9pbXBvcnRBbGwnO1xuXG5leHBvcnQgY29uc3QgdW5pdFN5c3RlbSA9IHtcbiAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uLy4uL2Fzc2V0cy9pY29ucycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLnVuaXRTeXN0ZW1ba2V5XTtcbiAgfSxcbiAgc2V0SWNvbihrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5pY29ucy5maWxlc1tPYmplY3Qua2V5cyh0aGlzLmljb25zLmZpbGVzKS5maW5kKChpY29uS2V5KSA9PiBpY29uS2V5LmluY2x1ZGVzKGtleSkpXTtcbiAgfSxcbiAgcm91bmRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgfSxcbiAgc2V0VmFsdWUob2JqLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShvYmpbYCR7YXJnc1swXX0ke3RoaXMuZ2V0KGFyZ3NbMV0pfWBdKTtcbiAgfSxcbn07XG5cbmNvbnN0IHVuaXRTeXN0ZW1zID0ge1xuICBtZXRyaWM6IHtcbiAgICB0ZW1wOiAnYycsXG4gICAgc3BlZWQ6ICdrcGgnLFxuICAgIHByZWNpcGl0YXRpb246ICdtbScsXG4gICAgcHJlc3N1cmU6ICdtYicsXG4gICAgZGlzdGFuY2U6ICdrbScsXG4gIH0sXG4gIGltcGVyaWFsOiB7XG4gICAgdGVtcDogJ2YnLFxuICAgIHNwZWVkOiAnbXBoJyxcbiAgICBwcmVjaXBpdGF0aW9uOiAnaW4nLFxuICAgIHByZXNzdXJlOiAnaW4nLFxuICAgIGRpc3RhbmNlOiAnbWlsZXMnLFxuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVuaXRTeXN0ZW0oc2VsZWN0aW9uKSB7XG4gIE9iamVjdC5hc3NpZ24odW5pdFN5c3RlbSwgeyB1bml0U3lzdGVtOiB1bml0U3lzdGVtc1tzZWxlY3Rpb25dIH0pO1xufVxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XG4vLyB1c2UgV2VhdGhlckFQSVxuLy8gaHR0cHM6Ly93d3cud2VhdGhlcmFwaS5jb20vZG9jcy9cbi8vIGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT04NGFjNzMxMGU1NjQ0OGExODk2MjEyNzMxMjMwNjExJnE9TG9uZG9uXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIodmFsdWUsIHRhYktleSkge1xuICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gIGNvbnNvbGUubG9nKHRhYktleSk7XG4gIC8vICpub3RlLCB2YWx1ZSBkb2VzIE5PVCBuZWVkIHRvIGJlIGV2YWx1YXRlZCBiZWZvcmUgZmV0Y2hcbiAgLy8gcG9zdGFsIGNvZGUsIG51bWJlciBvciBzdHJpbmdcbiAgLy8gY2l0eSwgdXBwZXJjYXNlIG9yIGxvd2VyY2FzZTtcbiAgcHViU3ViLnB1Ymxpc2goJ3N3aXRjaENvbnRlbnQnLCAnbG9hZGluZycpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT04NGFjNzMxMGU1NjQ0OGExODk2MjEyNzMxMjMwNjExJnE9JHt2YWx1ZX0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcHViU3ViLnB1Ymxpc2goXG4gICAgICAnc3dpdGNoQ29udGVudCcsXG4gICAgICAhcmVzcG9uc2Uub2sgPyBPYmplY3QuYXNzaWduKHJlc3BvbnNlLCB3ZWF0aGVyRGF0YSkgOiB3ZWF0aGVyRGF0YSxcbiAgICAgIHRhYktleSxcbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlICR7cmVzcG9uc2Uuc3RhdHVzfSwgJHt3ZWF0aGVyRGF0YS5lcnJvci5tZXNzYWdlfWApO1xuICAgIH1cblxuICAgIC8vIGNvZGUgYmVsb3cgdGhlIGlmIGJsb2NrIHdpbGwgb25seSBydW4gaWYgdGhlcmUgYXJlIG5vIGVycm9yc1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdnZXRXZWF0aGVyJywgZ2V0V2VhdGhlcik7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHN1YnNjcmliZXJzOiB7fSxcbiAgc3Vic2NyaWJlKHN1YnNjcmliZXIsIGZuKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSA9IHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gfHwgW107XG4gICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5wdXNoKGZuKTtcbiAgfSxcbiAgdW5zdWJzY3JpYmUoc3Vic2NyaWJlciwgZm4pIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSA9IHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uZmlsdGVyKFxuICAgICAgICAoaGFuZGxlcikgPT4gaGFuZGxlciAhPT0gZm4sXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgcHVibGlzaChzdWJzY3JpYmVyLCAuLi5kYXRhKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgICAgZm4oLi4uZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29udGVudFJvd3MoZm4sIGF0dHJpYnV0ZXMsIC4uLmFyZ3MpIHtcbiAgY29uc3QgY29udGFpbmVyQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgPyBhdHRyaWJ1dGVzWzFdIDogZmFsc2U7XG4gIGNvbnN0IGl0ZW1BdHRyaWJ1dGVzID0gYXR0cmlidXRlcyA/IGF0dHJpYnV0ZXNbMl0gOiBmYWxzZTtcblxuICBjb25zdCBjb250YWluZXIgPSBmbigndWwnKTtcbiAgaWYgKGNvbnRhaW5lckF0dHJpYnV0ZXMpIHtcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlcyhjb250YWluZXJBdHRyaWJ1dGVzKTtcbiAgfVxuICBhcmdzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAvLyAvXFwuKHN2Z3xwbmcpJC9cbiAgICAvLyBjb25zb2xlLmxvZyhpdGVtLnNwbGl0KC9cXC4oc3ZnfHBuZykkLykpO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGNvbnN0IGxpc3RJdGVtID0gZm4oJ2xpJyk7XG4gICAgICBpZiAoaXRlbUF0dHJpYnV0ZXMpIGl0ZW0uc2V0QXR0cmlidXRlcyhpdGVtQXR0cmlidXRlcyk7XG4gICAgICBpZiAoL1xcLltzdmd8cG5nXXszfSQvLnRlc3QoaXRlbSkpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZm4oJ2ltZycpO1xuICAgICAgICBpZiAoL1xcLltzdmddezN9JC8udGVzdChpdGVtKSkgaW1nLnNldEF0dHJpYnV0ZXMoeyBvbmxvYWQ6ICdTVkdJbmplY3QodGhpcyknIH0pO1xuICAgICAgICBpbWcuc3JjID0gaXRlbTtcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gaXRlbTtcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiIsImNvbnN0IHNldEVsZW1lbnRTdGF0ZSA9ICgpID0+ICh7XG4gIHNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcykge1xuICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gJ3RleHRDb250ZW50Jykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0VGV4dENvbnRlbnQodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBzZXRUZXh0Q29udGVudCh0ZXh0KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH0sXG59KTtcblxuY29uc3QgYnVpbGRFbGVtZW50ID0gKHRhZ05hbWUpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgdGFnTmFtZSxcbiAgfTtcblxuICByZXR1cm4geyAuLi5zZXRFbGVtZW50U3RhdGUoc3RhdGUpIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcbiAgY29uc3QgaHRtbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBPYmplY3QuYXNzaWduKGh0bWxFbGVtZW50LCBidWlsZEVsZW1lbnQoaHRtbEVsZW1lbnQpKTtcblxuICByZXR1cm4gaHRtbEVsZW1lbnQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGVTdHJpbmcsIGJvb2xlYW4pIHtcbiAgLy8gdGhpcyByZXR1cm5zIGEgZm9ybWF0IFtEYXksIE1vbnRoIERhdGVdXG4gIC8vIGV4OiBXZWRuZXNkYXksIEFwcmlsIDE0XG4gIGNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG4gIGNvbnN0IG1vbnRocyA9IFtcbiAgICAnSmFudWFyeScsXG4gICAgJ0ZlYnJ1YXJ5JyxcbiAgICAnTWFyY2gnLFxuICAgICdBcHJpbCcsXG4gICAgJ01heScsXG4gICAgJ0p1bmUnLFxuICAgICdKdWx5JyxcbiAgICAnQXVndXN0JyxcbiAgICAnU2VwdGVtYmVyJyxcbiAgICAnT2N0b2JlcicsXG4gICAgJ05vdmVtYmVyJyxcbiAgICAnRGVjZW1iZXInLFxuICBdO1xuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShgJHtkYXRlU3RyaW5nfSAwMDowMDowMGApO1xuXG4gIHJldHVybiBib29sZWFuXG4gICAgPyBgJHtkYXRlLnRvVVRDU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDMpfSAke2RhdGUudG9VVENTdHJpbmcoKS5zdWJzdHJpbmcoNSwgNyl9YFxuICAgIDogYCR7ZGF5c1tkYXRlLmdldFVUQ0RheSgpXX0sICR7bW9udGhzW2RhdGUuZ2V0VVRDTW9udGgoKV19ICR7ZGF0ZS5nZXRVVENEYXRlKCl9YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xuICAvLyByZXR1cm5zIDEyIGhvdXIgdGltZSBmb3JtYXRcbiAgLy8gZXg6IDI6MDAgUE0gb3IgMTA6MDAgQU1cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWUuaW5jbHVkZXMoJy0nKSA/IHRpbWUgOiBgMjAwMC0xMi0wMSAke3RpbWV9YCk7XG4gIGNvbnN0IHRpbWVQcm9wZXJ0aWVzID0ge1xuICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICBtaW51dGU6ICdudW1lcmljJyxcbiAgICBob3VyMTI6IHRydWUsXG4gIH07XG5cbiAgcmV0dXJuIGRhdGUudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgdGltZVByb3BlcnRpZXMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcbiAgY29uc3QgZmlsZXMgPSB7fTtcbiAgY29uc3QgZmlsZXNBcnIgPSBbXTtcbiAgci5rZXlzKCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGZpbGVzW2l0ZW0ucmVwbGFjZSgnLi8nLCAnJyldID0gcihpdGVtKTtcbiAgICBmaWxlc0Fyci5wdXNoKGl0ZW0ucmVwbGFjZSgnLi8nLCAnJykpO1xuICB9KTtcblxuICByZXR1cm4geyBmaWxlcywgZmlsZXNBcnIgfTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==