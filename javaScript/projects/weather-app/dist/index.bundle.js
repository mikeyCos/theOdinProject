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
  render(key, data) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      content = build.home();
      // this.bindEvents();
    } else {
      // render today
      content = build[key](data);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(e) {
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
    this.render(renderKey, e);
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
// forecastday.date |
// (forecastday.day.maxtemp_f / forecastday.day.mintemp_f)
// forecastday.day.condition
// forecastday.day.daily_chance_of_rain |
// wind
// NW, NNW, N, NNE, NE
// ENE, E, ESE
// SE, SSE, S, SSW, SW
// WSW, W, WNW
const unitSystems = {
  imperial: [],
  metric: [],
};

const forecast = {
  current: {
    last_updated: null,
  },
  location: {
    name: null,
  },
  forecastday: [],
};

const forecastController = {
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    this.findObjects = this.findObjects.bind(this);
    Object.keys(forecast).forEach(this.findObjects);
  },
  setValues(key, subKey, item) {
    if (item) {
      forecast[key].push(item);
    } else {
      forecast[key][subKey] = this.weatherData[key][subKey];
    }
  },
  findObjects(key) {
    if (!(forecast[key] instanceof Array)) {
      Object.keys(forecast[key]).forEach((subKey) => {
        this.setValues(key, subKey);
      });
    } else {
      this.weatherData.forecast[key].forEach((item) => {
        this.setValues(key, null, item);
      });
    }
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(unitSystem, weatherData) {
    forecastController.init(unitSystem, weatherData);
    this.setProperties();
  },
  setProperties() {
    Object.assign(this, { ...forecast }, { location: forecastController.weatherData.location });
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
    const forecastSectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
    forecastSection.id = 'forecast';
    forecastSectionHeading.setAttributes({ textContent: '3 Day Weather' });
    forecastSection.appendChild(forecastSectionHeading);

    // temporary
    const forecastContent = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    forecastContent.id = 'forecast_content';

    const forecastContentList = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('ol');
    _forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].forecastday.forEach((day) => {
      forecastContentList.appendChild(
        (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_2__["default"])(
          _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"],
          [{ class: 'forecast_day' }, { class: 'forecast_day_item' }],
          `${day.day.maxtemp_f}°/${day.day.mintemp_f}°`,
          day.day.condition.text,
          `${day.day.daily_chance_of_rain}%`,
        ),
      );
    });
    forecastContent.appendChild(forecastContentList);
    forecastSection.appendChild(forecastContent);
    // temporary

    return forecastSection;
  },
};

function buildForecast(weatherData) {
  _forecast_config__WEBPACK_IMPORTED_MODULE_1__["default"].init('imperial', weatherData);
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


const icons = (0,_helpers_importAll__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$"));

const unitSystems = {
  imperial: {
    current: {
      last_updated: null,
    },
    // location: {
    //   name: null,
    // },
    forecastday: [],
  },
};

const hourlyController = {
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    if (unitSystems[this.unitSystem].forecastday.length > 0) {
      unitSystems[this.unitSystem].forecastday = [];
    }
    Object.entries(unitSystems[this.unitSystem]).forEach(([key, obj]) => {
      this.findObjects(key, obj);
      // this.setIcons(key, obj);
    });
  },
  setIcons(key, obj) {
    const objIcon = {
      icon: icons.files[
        Object.keys(icons.files).find(
          (iconKey) => iconKey.includes(key) || iconKey.includes(obj.text),
        )
      ],
    };

    if (objIcon.icon) Object.assign(obj, objIcon);
  },
  setValues(key, obj) {
    const date1 = new Date(unitSystems[this.unitSystem].current.last_updated);
    const date2 = new Date(obj.time);
    if (date1.getTime() < date2.getTime()) {
      const objTemp = {
        time: obj.time,
        temp_f: {
          unit: '°',
          value: obj.temp_f,
          setText() {
            return `${this.value}${this.unit}`;
          },
        },
        condition: {
          icon: obj.condition.icon,
          text: obj.condition.text,
        },
        chance_of_rain: {
          icon: null,
          unit: '%',
          value: obj.chance_of_rain,
          setText() {
            return `${this.value}${this.unit}`;
          },
        },
        wind: {
          icon: null,
          wind_dir: {
            value: obj.wind_dir,
          },
          wind_mph: {
            unit: 'mph',
            value: Math.round(obj.wind_mph),
          },
          setText() {
            return `${this.wind_dir.value} ${this.wind_mph.value} ${this.wind_mph.unit}`;
          },
        },
      };
      Object.entries(objTemp).forEach(([objTempKey, objProp]) =>
        this.setIcons(objTempKey, objProp),
      );

      unitSystems[this.unitSystem][key].push(objTemp);
    }
  },
  findObjects(key, obj) {
    if (!(obj instanceof Array)) {
      Object.keys(obj).forEach((subKey) => {
        const objCopy = obj;
        objCopy[subKey] = this.weatherData[key][subKey];
      });
    } else {
      this.weatherData.forecast[key].forEach((day, i) => {
        day.hour.forEach((hourItem) => {
          this.setValues(key, hourItem);
        });
      });
      console.log(this.weatherData.forecast[key]);
      console.log(unitSystems[this.unitSystem][key]);
    }

    // Object.keys(hourly).forEach((key) => {
    //   if (!(hourly[key] instanceof Array)) {
    //     Object.keys(hourly[key]).forEach((subkey) => {
    //       hourly[key][subkey] = weatherData[key][subkey];
    //     });
    //   } else {
    //     weatherData.forecast[key].forEach((day, i) => {
    //       const date1 = new Date(hourly.current.last_updated);
    //       hourly[key] = weatherData.forecast[key];
    //       const newHours = day.hour.filter((hour) => {
    //         const date2 = new Date(hour.time);
    //         return date1.getTime() < date2.getTime();
    //       });
    //       hourly[key][i].hour = newHours;
    //     });
    //   }
    // });
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(unitSystem, weatherData) {
    hourlyController.init(unitSystem, weatherData);
    this.setProperties();
    console.log(this);
  },
  setProperties() {
    Object.assign(
      this,
      { data: unitSystems[hourlyController.unitSystem] },
      { location: hourlyController.weatherData.location },
    );
  },
});
// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph

// current.last_updated
// forecast.forecastday[0].hour.time |
//   forecast.forecastday[0].hour.temp_f |
//   forecast.forecastday[0].hour.condition.text |
//   forecast.forecastday[0].hour.chance_of_rain |
//   (forecast.forecastday[0].hour.wind_dir + forecast.forecastday[0].hour.wind_mph)


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
    const hourlySectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
    hourlySection.id = 'hourly';
    hourlySectionHeading.textContent = 'Hourly weather';
    hourlySection.appendChild(hourlySectionHeading);

    // temporary
    const hourlyContent = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    hourlyContent.id = 'hourly_content';

    // hourly.data.forecastday.forEach((day) => {
    //   const hourlyContentList = createElement('ol');
    //   const hourlyContentHeading = createElement('h2');
    //   hourlyContentList.className = 'day';
    //   hourlyContentHeading.textContent = formatDate(day.date);
    //   hourlyContentList.appendChild(hourlyContentHeading);
    //   day.hour.forEach((hour) => {
    //     hourlyContentList.appendChild(
    //       createContentRows(
    //         createElement,
    //         [{ class: 'hour' }, { class: 'hourly_item' }],
    //         formatTime(hour.time.split(' ')[1]),
    //         `${Math.round(hour.temp_f)}°`,
    //         hour.condition.icon,
    //         hour.condition.text,
    //         `${hour.chance_of_rain}%`,
    //         `${hour.wind_dir} ${Math.round(hour.wind_mph)} mph`,
    //       ),
    //     );
    //   });
    //   hourlyContent.appendChild(hourlyContentList);
    // });

    hourlySection.appendChild(hourlyContent);
    // temporary
    return hourlySection;
  },
};

function buildHourly(weatherData) {
  _hourly_config__WEBPACK_IMPORTED_MODULE_1__["default"].init('imperial', weatherData);
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






const build = {
  tabsNavbar: _tabs_navbar_tabs_navbar__WEBPACK_IMPORTED_MODULE_1__["default"],
  today: _today_today__WEBPACK_IMPORTED_MODULE_2__["default"],
  hourly: _hourly_hourly__WEBPACK_IMPORTED_MODULE_3__["default"],
  forecast: _forecast_forecast__WEBPACK_IMPORTED_MODULE_4__["default"],
};

const tabsBuilder = {
  init(weatherData) {
    this.setWeather(weatherData);
  },
  setWeather(weatherData) {
    this.weatherData = weatherData;
  },
  cacheDOM(tabsSection) {
    this.tabsSection = tabsSection;
    this.tabsList = tabsSection.querySelectorAll('.tabs_list_item > a');
    console.log(this.tabsSection);
    console.log(this.tabsList);
  },
  bindEvents() {
    this.switchTab = this.switchTab.bind(this);
    this.tabsList.forEach((tab) => tab.addEventListener('click', this.switchTab));
  },
  render(key) {
    let content;
    if (!key) {
      // if no key
      content = build.today(this.weatherData);
    } else {
      content = build[key](this.weatherData);
      this.tabsSection.lastChild.remove();
    }
    console.log(content);
    this.tabsSection.appendChild(content);
  },
  switchTab(e) {
    const { className: elementClassName } = e.currentTarget;
    const renderKey = elementClassName;
    this.render(renderKey);
  },
};

function buildTabs(weatherData) {
  tabsBuilder.init(weatherData);
  const tabsSection = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
  const tabsHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
  tabsSection.id = 'tabs';
  tabsHeading.setAttributes({ textContent: 'TABS' });

  tabsSection.appendChild(tabsHeading);
  tabsSection.appendChild(build.tabsNavbar());
  tabsBuilder.cacheDOM(tabsSection);
  tabsBuilder.render();
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
/* harmony import */ var _helpers_importAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/importAll */ "./src/helpers/importAll.js");
// current.temp_f
// current.feelslike_f
// forecast.forecastday[0].day.maxtemp_f
// forecast.forecastday[0].day.mintemp_f
// current.humidity
// current.pressure_in
// current.vis_miles
// current.wind_mph
// current.wind_dir


const icons = (0,_helpers_importAll__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$"));
const unitSystems = {
  imperial: {
    condition: {
      setText() {
        return `${this.text}`;
      },
    },
    temp_f: {
      unit: '°',
      // text: 'temperature',
    },
    feelslike_f: {
      unit: '°',
      text: 'feels like',
    },
    minmaxtemp: {
      maxtemp_f: {
        unit: '°',
        text: 'high',
      },
      mintemp_f: {
        unit: '°',
        text: 'low',
      },
      setLabel() {
        return `${this.maxtemp_f.text} / ${this.mintemp_f.text}`;
      },
      setText() {
        return `${this.maxtemp_f.value}° / ${this.mintemp_f.value}°`;
      },
    },
    humidity: {
      text: 'humidity',
      humidity: {
        unit: '%',
      },
      setText() {
        return `${this.humidity.value}${this.humidity.unit}`;
      },
    },
    pressure_in: {
      unit: ' in',
      text: 'pressure',
    },
    vis_miles: {
      unit: ' mi',
      text: 'visibility',
    },
    wind: {
      text: 'wind',
      wind_mph: {
        unit: ' mph',
      },
      wind_dir: {},
      setText() {
        return `${this.wind_dir.value} ${this.wind_mph.value} ${this.wind_mph.unit}`;
      },
    },
    uv: {
      text: 'UV Index',
      setText() {
        return `${this.value} of 11`;
      },
    },
  },
};

const todayController = {
  init(unitSystem, weatherData) {
    this.weatherData = weatherData;
    this.unitSystem = unitSystem;
    Object.entries(unitSystems[this.unitSystem]).forEach(([key, obj]) => {
      this.findObjects(key, obj);
      this.setIcons(key, obj);
    });
  },
  setIcons(key, obj) {
    const objIcon = {
      icon: icons.files[
        Object.keys(icons.files).find(
          (iconKey) => iconKey.includes(key) || iconKey.includes(obj.text),
        )
      ],
    };

    if (objIcon.icon) Object.assign(obj, objIcon);
  },
  setValues(key, obj, subObj, subKey) {
    // sets value properties from 'this.weatherData...'
    // to respective 'unitSystems[this.unitSystem]' objects
    const objCopy = !subKey ? obj : subObj;
    const objData = {};
    const weatherDataCurrent = subKey
      ? this.weatherData.current[subKey]
      : this.weatherData.current[key];
    const weatherDataForecast = subKey
      ? this.weatherData.forecast.forecastday[0].day[subKey]
      : this.weatherData.forecast.forecastday[0].day[key];

    if (!subKey && !objCopy.setText) {
      const objTemp = {
        setText() {
          return `${this.value}${this.unit}`;
        },
      };
      Object.assign(objCopy, objTemp);
    }

    let value = !weatherDataCurrent ? weatherDataForecast : weatherDataCurrent;
    value = Number.isNaN(+value) ? value : Math.round(value);
    if (!(value instanceof Object)) {
      objCopy.value = value;
    } else {
      Object.assign(objCopy, value);
    }

    Object.assign(objData, { [`${key}`]: objCopy });
  },
  findObjects(key, obj) {
    // finds object properties only and calls 'this.setValues'
    if (Object.values(obj).find((item) => item instanceof Object && !(item instanceof Function))) {
      Object.entries(obj).forEach(([subKey, subObj]) => {
        if (subObj instanceof Object && !(subObj instanceof Function)) {
          this.setValues(key, obj, subObj, subKey);
        }
      });
    } else {
      this.setValues(key, obj);
    }
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init(unitSystem, weatherData) {
    todayController.init(unitSystem, weatherData);
    this.setProperties();
  },
  setProperties() {
    Object.assign(
      this,
      { data: unitSystems[todayController.unitSystem] },
      { location: todayController.weatherData.location },
    );
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
    const todaySectionHeading = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1');
    todaySection.id = 'today';
    todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todaySection.appendChild(todaySectionHeading);

    // temporary
    const todaySummary = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    todaySummary.id = 'today_summary';

    ['temp_f', 'condition'].forEach((item) => {
      todaySummary.appendChild(
        (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(
          _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"],
          false,
          _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[item].icon ? _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[item].icon : false,
          _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[item].setText(),
        ),
      );
    });

    const todayDetails = (0,_helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section');
    todayDetails.id = 'today_details';
    Object.keys(_today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data).forEach((key, i) => {
      if (i > 1) {
        todayDetails.appendChild(
          (0,_helpers_createContentRows__WEBPACK_IMPORTED_MODULE_1__["default"])(
            _helpers_createElement__WEBPACK_IMPORTED_MODULE_0__["default"],
            null,
            _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[key].icon ? _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[key].icon : false,
            _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[key].setLabel ? _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[key].setLabel() : _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[key].text,
            _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].data[key].setText(),
          ),
        );
      }
    });

    todaySection.appendChild(todaySummary);
    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

function buildToday(weatherData) {
  _today_config__WEBPACK_IMPORTED_MODULE_2__["default"].init('imperial', weatherData);
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

async function getWeather(value) {
  // *note, value does NOT need to be evaluated before fetch
  // postal code, number or string
  // city, uppercase or lowercase;
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('switchContent', 'loading');
  try {
    const response = await fetch(
      // static value
      // 'https://api.weatherapi.com/v1/current.json?key=84ac7310e56448a1896212731230611&q=London&days=1&aqi=no&alerts=no',
      // dynamic value
      `https://api.weatherapi.com/v1/forecast.json?key=84ac7310e56448a1896212731230611&q=${value}&days=3&aqi=no&alerts=no`,
      // error test
      // `https://api.weatherapi.com/v1/forecas.json?key=84ac7310e56448a1896212731230611&q=${value}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' },
    );

    const weatherData = await response.json();
    // pubSub.publish('setWeather', weatherData);
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish(
      'switchContent',
      !response.ok ? Object.assign(response, weatherData) : weatherData,
    );
    // pubSub.publish('setWeather', !response.ok ? weatherData.error : weatherData);
    if (!response.ok) {
      throw new Error(`Code ${response.status}, ${weatherData.error.message}`);
    }

    // code below the if block will only run if there are no errors
    console.log(weatherData);

    // pubSub.publish('setWeather', weatherData);
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
  const date = new Date(`12-12-2000 ${time}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakMsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLE1BQU0sS0FBeUI7QUFDL0I7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hyQkQ7QUFDMEc7QUFDakI7QUFDTztBQUNoRyw0Q0FBNEMsK01BQW9GO0FBQ2hJLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUNBQW1DO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sOEVBQThFLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsc0NBQXNDLGdHQUFnRyxnRkFBZ0YscUJBQXFCLHVCQUF1QixHQUFHLDRCQUE0QixlQUFlLGNBQWMsMkJBQTJCLEdBQUcsVUFBVSwyQkFBMkIsMkNBQTJDLG9DQUFvQyx1QkFBdUIsR0FBRyxtQkFBbUI7QUFDOXZCO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0J2QztBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sd0ZBQXdGLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sVUFBVSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sTUFBTSxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLFVBQVUsS0FBSyxVQUFVLFVB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bm9kZV9tb2R1bGVzL0BpY29uZnUvc3ZnLWluamVjdC9kaXN0L3N2Zy1pbmplY3QuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9hcHAuY3NzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL25hdmJhci5jc3MiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvYXBwLmNzcz9hNjcyIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvc3R5bGVzL25hdmJhci5jc3M/YzFkYiIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvYXNzZXRzL2ljb25zLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5zdmckIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9lcnJvci9lcnJvci5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb25maWcuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL2hvbWUvaG9tZS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvbG9hZGluZy9sb2FkaW5nLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9tYWluL21haW4uanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL2ZvcmVjYXN0L2ZvcmVjYXN0LmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy9mb3JlY2FzdC9mb3JlY2FzdC5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy9ob3VybHkvaG91cmx5LmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy9ob3VybHkvaG91cmx5LmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFic19uYXZiYXIvdGFic19uYXZiYXIuY29uZmlnLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RhYnNfbmF2YmFyL3RhYnNfbmF2YmFyLmpzIiwid2VicGFjazovL21vZHVsZS13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvY29tcG9uZW50cy90YWJzL3RvZGF5L3RvZGF5LmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbXBvbmVudHMvdGFicy90b2RheS90b2RheS5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2NvbnRhaW5lcnMvYXBpX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9jb250YWluZXJzL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly9tb2R1bGUtd2VicGFjay1zdGFydGVyLy4vc3JjL2hlbHBlcnMvY3JlYXRlQ29udGVudFJvd3MuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2Zvcm1hdERhdGUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2Zvcm1hdFRpbWUuanMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXdlYnBhY2stc3RhcnRlci8uL3NyYy9oZWxwZXJzL2ltcG9ydEFsbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNWR0luamVjdCAtIFZlcnNpb24gMS4yLjNcbiAqIEEgdGlueSwgaW50dWl0aXZlLCByb2J1c3QsIGNhY2hpbmcgc29sdXRpb24gZm9yIGluamVjdGluZyBTVkcgZmlsZXMgaW5saW5lIGludG8gdGhlIERPTS5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vaWNvbmZ1L3N2Zy1pbmplY3RcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggSU5DT1JTLCB0aGUgY3JlYXRvcnMgb2YgaWNvbmZ1LmNvbVxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgLSBodHRwczovL2dpdGh1Yi5jb20vaWNvbmZ1L3N2Zy1pbmplY3QvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG4gIC8vIGNvbnN0YW50cyBmb3IgYmV0dGVyIG1pbmlmaWNhdGlvblxuICB2YXIgX0NSRUFURV9FTEVNRU5UXyA9ICdjcmVhdGVFbGVtZW50JztcbiAgdmFyIF9HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfID0gJ2dldEVsZW1lbnRzQnlUYWdOYW1lJztcbiAgdmFyIF9MRU5HVEhfID0gJ2xlbmd0aCc7XG4gIHZhciBfU1RZTEVfID0gJ3N0eWxlJztcbiAgdmFyIF9USVRMRV8gPSAndGl0bGUnO1xuICB2YXIgX1VOREVGSU5FRF8gPSAndW5kZWZpbmVkJztcbiAgdmFyIF9TRVRfQVRUUklCVVRFXyA9ICdzZXRBdHRyaWJ1dGUnO1xuICB2YXIgX0dFVF9BVFRSSUJVVEVfID0gJ2dldEF0dHJpYnV0ZSc7XG5cbiAgdmFyIE5VTEwgPSBudWxsO1xuXG4gIC8vIGNvbnN0YW50c1xuICB2YXIgX19TVkdJTkpFQ1QgPSAnX19zdmdJbmplY3QnO1xuICB2YXIgSURfU1VGRklYID0gJy0taW5qZWN0LSc7XG4gIHZhciBJRF9TVUZGSVhfUkVHRVggPSBuZXcgUmVnRXhwKElEX1NVRkZJWCArICdcXFxcZCsnLCBcImdcIik7XG4gIHZhciBMT0FEX0ZBSUwgPSAnTE9BRF9GQUlMJztcbiAgdmFyIFNWR19OT1RfU1VQUE9SVEVEID0gJ1NWR19OT1RfU1VQUE9SVEVEJztcbiAgdmFyIFNWR19JTlZBTElEID0gJ1NWR19JTlZBTElEJztcbiAgdmFyIEFUVFJJQlVURV9FWENMVVNJT05fTkFNRVMgPSBbJ3NyYycsICdhbHQnLCAnb25sb2FkJywgJ29uZXJyb3InXTtcbiAgdmFyIEFfRUxFTUVOVCA9IGRvY3VtZW50W19DUkVBVEVfRUxFTUVOVF9dKCdhJyk7XG4gIHZhciBJU19TVkdfU1VQUE9SVEVEID0gdHlwZW9mIFNWR1JlY3QgIT0gX1VOREVGSU5FRF87XG4gIHZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgdXNlQ2FjaGU6IHRydWUsXG4gICAgY29weUF0dHJpYnV0ZXM6IHRydWUsXG4gICAgbWFrZUlkc1VuaXF1ZTogdHJ1ZVxuICB9O1xuICAvLyBNYXAgb2YgSVJJIHJlZmVyZW5jZWFibGUgdGFnIG5hbWVzIHRvIHByb3BlcnRpZXMgdGhhdCBjYW4gcmVmZXJlbmNlIHRoZW0uIFRoaXMgaXMgZGVmaW5lZCBpblxuICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMTEvbGlua2luZy5odG1sI3Byb2Nlc3NpbmdJUklcbiAgdmFyIElSSV9UQUdfUFJPUEVSVElFU19NQVAgPSB7XG4gICAgY2xpcFBhdGg6IFsnY2xpcC1wYXRoJ10sXG4gICAgJ2NvbG9yLXByb2ZpbGUnOiBOVUxMLFxuICAgIGN1cnNvcjogTlVMTCxcbiAgICBmaWx0ZXI6IE5VTEwsXG4gICAgbGluZWFyR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXSxcbiAgICBtYXJrZXI6IFsnbWFya2VyJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnXSxcbiAgICBtYXNrOiBOVUxMLFxuICAgIHBhdHRlcm46IFsnZmlsbCcsICdzdHJva2UnXSxcbiAgICByYWRpYWxHcmFkaWVudDogWydmaWxsJywgJ3N0cm9rZSddXG4gIH07XG4gIHZhciBJTkpFQ1RFRCA9IDE7XG4gIHZhciBGQUlMID0gMjtcblxuICB2YXIgdW5pcXVlSWRDb3VudGVyID0gMTtcbiAgdmFyIHhtbFNlcmlhbGl6ZXI7XG4gIHZhciBkb21QYXJzZXI7XG5cblxuICAvLyBjcmVhdGVzIGFuIFNWRyBkb2N1bWVudCBmcm9tIGFuIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gc3ZnU3RyaW5nVG9TdmdEb2Moc3ZnU3RyKSB7XG4gICAgZG9tUGFyc2VyID0gZG9tUGFyc2VyIHx8IG5ldyBET01QYXJzZXIoKTtcbiAgICByZXR1cm4gZG9tUGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdmdTdHIsICd0ZXh0L3htbCcpO1xuICB9XG5cblxuICAvLyBzZWFyaWFsaXplcyBhbiBTVkcgZWxlbWVudCB0byBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtZW50KSB7XG4gICAgeG1sU2VyaWFsaXplciA9IHhtbFNlcmlhbGl6ZXIgfHwgbmV3IFhNTFNlcmlhbGl6ZXIoKTtcbiAgICByZXR1cm4geG1sU2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyhzdmdFbGVtZW50KTtcbiAgfVxuXG5cbiAgLy8gUmV0dXJucyB0aGUgYWJzb2x1dGUgdXJsIGZvciB0aGUgc3BlY2lmaWVkIHVybFxuICBmdW5jdGlvbiBnZXRBYnNvbHV0ZVVybCh1cmwpIHtcbiAgICBBX0VMRU1FTlQuaHJlZiA9IHVybDtcbiAgICByZXR1cm4gQV9FTEVNRU5ULmhyZWY7XG4gIH1cblxuXG4gIC8vIExvYWQgc3ZnIHdpdGggYW4gWEhSIHJlcXVlc3RcbiAgZnVuY3Rpb24gbG9hZFN2Zyh1cmwsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgaWYgKHVybCkge1xuICAgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgIC8vIHJlYWR5U3RhdGUgaXMgRE9ORVxuICAgICAgICAgIHZhciBzdGF0dXMgPSByZXEuc3RhdHVzO1xuICAgICAgICAgIGlmIChzdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHN0YXR1cyBpcyBPS1xuICAgICAgICAgICAgY2FsbGJhY2socmVxLnJlc3BvbnNlWE1MLCByZXEucmVzcG9uc2VUZXh0LnRyaW0oKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHN0YXR1cyBpcyBlcnJvciAoNHh4IG9yIDV4eClcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHN0YXR1cyAwIGNhbiBpbmRpY2F0ZSBhIGZhaWxlZCBjcm9zcy1kb21haW4gY2FsbFxuICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgcmVxLnNlbmQoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIENvcHkgYXR0cmlidXRlcyBmcm9tIGltZyBlbGVtZW50IHRvIHN2ZyBlbGVtZW50XG4gIGZ1bmN0aW9uIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pIHtcbiAgICB2YXIgYXR0cmlidXRlO1xuICAgIHZhciBhdHRyaWJ1dGVOYW1lO1xuICAgIHZhciBhdHRyaWJ1dGVWYWx1ZTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IGltZ0VsZW0uYXR0cmlidXRlcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJpYnV0ZXNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWU7XG4gICAgICAvLyBPbmx5IGNvcHkgYXR0cmlidXRlcyBub3QgZXhwbGljaXRseSBleGNsdWRlZCBmcm9tIGNvcHlpbmdcbiAgICAgIGlmIChBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTLmluZGV4T2YoYXR0cmlidXRlTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIC8vIElmIGltZyBhdHRyaWJ1dGUgaXMgXCJ0aXRsZVwiLCBpbnNlcnQgYSB0aXRsZSBlbGVtZW50IGludG8gU1ZHIGVsZW1lbnRcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT0gX1RJVExFXykge1xuICAgICAgICAgIHZhciB0aXRsZUVsZW07XG4gICAgICAgICAgdmFyIGZpcnN0RWxlbWVudENoaWxkID0gc3ZnRWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBpZiAoZmlyc3RFbGVtZW50Q2hpbGQgJiYgZmlyc3RFbGVtZW50Q2hpbGQubG9jYWxOYW1lLnRvTG93ZXJDYXNlKCkgPT0gX1RJVExFXykge1xuICAgICAgICAgICAgLy8gSWYgdGhlIFNWRyBlbGVtZW50J3MgZmlyc3QgY2hpbGQgaXMgYSB0aXRsZSBlbGVtZW50LCBrZWVwIGl0IGFzIHRoZSB0aXRsZSBlbGVtZW50XG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBmaXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgdGhlIFNWRyBlbGVtZW50J3MgZmlyc3QgY2hpbGQgZWxlbWVudCBpcyBub3QgYSB0aXRsZSBlbGVtZW50LCBjcmVhdGUgYSBuZXcgdGl0bGVcbiAgICAgICAgICAgIC8vIGVsZSxlbXQgYW5kIHNldCBpdCBhcyB0aGUgZmlyc3QgY2hpbGRcbiAgICAgICAgICAgIHRpdGxlRWxlbSA9IGRvY3VtZW50W19DUkVBVEVfRUxFTUVOVF8gKyAnTlMnXSgnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBfVElUTEVfKTtcbiAgICAgICAgICAgIHN2Z0VsZW0uaW5zZXJ0QmVmb3JlKHRpdGxlRWxlbSwgZmlyc3RFbGVtZW50Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTZXQgbmV3IHRpdGxlIGNvbnRlbnRcbiAgICAgICAgICB0aXRsZUVsZW0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZXQgaW1nIGF0dHJpYnV0ZSB0byBzdmcgZWxlbWVudFxuICAgICAgICAgIHN2Z0VsZW1bX1NFVF9BVFRSSUJVVEVfXShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gYXBwZW5kcyBhIHN1ZmZpeCB0byBJRHMgb2YgcmVmZXJlbmNlZCBlbGVtZW50cyBpbiB0aGUgPGRlZnM+IGluIG9yZGVyIHRvICB0byBhdm9pZCBJRCBjb2xsaXNpb25cbiAgLy8gYmV0d2VlbiBtdWx0aXBsZSBpbmplY3RlZCBTVkdzLiBUaGUgc3VmZml4IGhhcyB0aGUgZm9ybSBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGlzXG4gIC8vIGluY3JlbWVudGVkIHdpdGggZWFjaCBpbmplY3Rpb24uIFJlZmVyZW5jZXMgdG8gdGhlIElEcyBhcmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkuXG4gIC8vIFdlIGFzc3VtZSB0aGEgYWxsIElEcyB3aXRoaW4gdGhlIGluamVjdGVkIFNWRyBhcmUgdW5pcXVlLCB0aGVyZWZvcmUgdGhlIHNhbWUgc3VmZml4IGNhbiBiZSB1c2VkIGZvciBhbGwgSURzIG9mIG9uZVxuICAvLyBpbmplY3RlZCBTVkcuXG4gIC8vIElmIHRoZSBvbmx5UmVmZXJlbmNlZCBhcmd1bWVudCBpcyBzZXQgdG8gdHJ1ZSwgb25seSB0aG9zZSBJRHMgd2lsbCBiZSBtYWRlIHVuaXF1ZSB0aGF0IGFyZSByZWZlcmVuY2VkIGZyb20gd2l0aGluIHRoZSBTVkdcbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBvbmx5UmVmZXJlbmNlZCkge1xuICAgIHZhciBpZFN1ZmZpeCA9IElEX1NVRkZJWCArIHVuaXF1ZUlkQ291bnRlcisrO1xuICAgIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgZnVuY3Rpb25hbCBub3RhdGlvbnMgb2YgYW4gSVJJIHJlZmVyZW5jZXMuIFRoaXMgd2lsbCBmaW5kIG9jY3VyZW5jZXMgaW4gdGhlIGZvcm1cbiAgICAvLyB1cmwoI2FueUlkKSBvciB1cmwoXCIjYW55SWRcIikgKGZvciBJbnRlcm5ldCBFeHBsb3JlcikgYW5kIGNhcHR1cmUgdGhlIHJlZmVyZW5jZWQgSURcbiAgICB2YXIgZnVuY0lyaVJlZ2V4ID0gL3VybFxcKFwiPyMoW2EtekEtWl1bXFx3Oi4tXSopXCI/XFwpL2c7XG4gICAgLy8gR2V0IGFsbCBlbGVtZW50cyB3aXRoIGFuIElELiBUaGUgU1ZHIHNwZWMgcmVjb21tZW5kcyB0byBwdXQgcmVmZXJlbmNlZCBlbGVtZW50cyBpbnNpZGUgPGRlZnM+IGVsZW1lbnRzLCBidXRcbiAgICAvLyB0aGlzIGlzIG5vdCBhIHJlcXVpcmVtZW50LCB0aGVyZWZvcmUgd2UgaGF2ZSB0byBzZWFyY2ggZm9yIElEcyBpbiB0aGUgd2hvbGUgU1ZHLlxuICAgIHZhciBpZEVsZW1lbnRzID0gc3ZnRWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG4gICAgdmFyIGlkRWxlbTtcbiAgICAvLyBBbiBvYmplY3QgY29udGFpbmluZyByZWZlcmVuY2VkIElEcyAgYXMga2V5cyBpcyB1c2VkIGlmIG9ubHkgcmVmZXJlbmNlZCBJRHMgc2hvdWxkIGJlIHVuaXF1aWZpZWQuXG4gICAgLy8gSWYgdGhpcyBvYmplY3QgZG9lcyBub3QgZXhpc3QsIGFsbCBJRHMgd2lsbCBiZSB1bmlxdWlmaWVkLlxuICAgIHZhciByZWZlcmVuY2VkSWRzID0gb25seVJlZmVyZW5jZWQgPyBbXSA6IE5VTEw7XG4gICAgdmFyIHRhZ05hbWU7XG4gICAgdmFyIGlyaVRhZ05hbWVzID0ge307XG4gICAgdmFyIGlyaVByb3BlcnRpZXMgPSBbXTtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBpLCBqO1xuXG4gICAgaWYgKGlkRWxlbWVudHNbX0xFTkdUSF9dKSB7XG4gICAgICAvLyBNYWtlIGFsbCBJRHMgdW5pcXVlIGJ5IGFkZGluZyB0aGUgSUQgc3VmZml4IGFuZCBjb2xsZWN0IGFsbCBlbmNvdW50ZXJlZCB0YWcgbmFtZXNcbiAgICAgIC8vIHRoYXQgYXJlIElSSSByZWZlcmVuY2VhYmxlIGZyb20gcHJvcGVyaXRpZXMuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICB0YWdOYW1lID0gaWRFbGVtZW50c1tpXS5sb2NhbE5hbWU7IC8vIFVzZSBub24tbmFtZXNwYWNlZCB0YWcgbmFtZVxuICAgICAgICAvLyBNYWtlIElEIHVuaXF1ZSBpZiB0YWcgbmFtZSBpcyBJUkkgcmVmZXJlbmNlYWJsZVxuICAgICAgICBpZiAodGFnTmFtZSBpbiBJUklfVEFHX1BST1BFUlRJRVNfTUFQKSB7XG4gICAgICAgICAgaXJpVGFnTmFtZXNbdGFnTmFtZV0gPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBHZXQgYWxsIHByb3BlcnRpZXMgdGhhdCBhcmUgbWFwcGVkIHRvIHRoZSBmb3VuZCBJUkkgcmVmZXJlbmNlYWJsZSB0YWdzXG4gICAgICBmb3IgKHRhZ05hbWUgaW4gaXJpVGFnTmFtZXMpIHtcbiAgICAgICAgKElSSV9UQUdfUFJPUEVSVElFU19NQVBbdGFnTmFtZV0gfHwgW3RhZ05hbWVdKS5mb3JFYWNoKGZ1bmN0aW9uIChtYXBwZWRQcm9wZXJ0eSkge1xuICAgICAgICAgIC8vIEFkZCBtYXBwZWQgcHJvcGVydGllcyB0byBhcnJheSBvZiBpcmkgcmVmZXJlbmNpbmcgcHJvcGVydGllcy5cbiAgICAgICAgICAvLyBVc2UgbGluZWFyIHNlYXJjaCBoZXJlIGJlY2F1c2UgdGhlIG51bWJlciBvZiBwb3NzaWJsZSBlbnRyaWVzIGlzIHZlcnkgc21hbGwgKG1heGltdW0gMTEpXG4gICAgICAgICAgaWYgKGlyaVByb3BlcnRpZXMuaW5kZXhPZihtYXBwZWRQcm9wZXJ0eSkgPCAwKSB7XG4gICAgICAgICAgICBpcmlQcm9wZXJ0aWVzLnB1c2gobWFwcGVkUHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXJpUHJvcGVydGllc1tfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gQWRkIFwic3R5bGVcIiB0byBwcm9wZXJ0aWVzLCBiZWNhdXNlIGl0IG1heSBjb250YWluIHJlZmVyZW5jZXMgaW4gdGhlIGZvcm0gJ3N0eWxlPVwiZmlsbDp1cmwoI215RmlsbClcIidcbiAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKF9TVFlMRV8pO1xuICAgICAgfVxuICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIGVsZW1lbnRzIG9mIHRoZSBTVkcgYW5kIHJlcGxhY2UgSURzIGluIHJlZmVyZW5jZXMuXG4gICAgICAvLyBUbyBnZXQgYWxsIGRlc2NlbmRpbmcgZWxlbWVudHMsIGdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykgc2VlbXMgdG8gcGVyZm9ybSBmYXN0ZXIgdGhhbiBxdWVyeVNlbGVjdG9yQWxsKCcqJykuXG4gICAgICAvLyBTaW5jZSBzdmdFbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykgZG9lcyBub3QgcmV0dXJuIHRoZSBzdmcgZWxlbWVudCBpdHNlbGYsIHdlIGhhdmUgdG8gaGFuZGxlIGl0IHNlcGFyYXRlbHkuXG4gICAgICB2YXIgZGVzY0VsZW1lbnRzID0gc3ZnRWxlbVtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJyonKTtcbiAgICAgIHZhciBlbGVtZW50ID0gc3ZnRWxlbTtcbiAgICAgIHZhciBwcm9wZXJ0eU5hbWU7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YXIgbmV3VmFsdWU7XG4gICAgICBmb3IgKGkgPSAtMTsgZWxlbWVudCAhPSBOVUxMOykge1xuICAgICAgICBpZiAoZWxlbWVudC5sb2NhbE5hbWUgPT0gX1NUWUxFXykge1xuICAgICAgICAgIC8vIElmIGVsZW1lbnQgaXMgYSBzdHlsZSBlbGVtZW50LCByZXBsYWNlIElEcyBpbiBhbGwgb2NjdXJlbmNlcyBvZiBcInVybCgjYW55SWQpXCIgaW4gdGV4dCBjb250ZW50XG4gICAgICAgICAgdmFsdWUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWRJZHMpIHtcbiAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpZF0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd1cmwoIycgKyBpZCArIGlkU3VmZml4ICsgJyknO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgICAvLyBSdW4gdGhyb3VnaCBhbGwgcHJvcGVydHkgbmFtZXMgZm9yIHdoaWNoIElEcyB3ZXJlIGZvdW5kXG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dOyBqKyspIHtcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZSA9IGlyaVByb3BlcnRpZXNbal07XG4gICAgICAgICAgICB2YWx1ZSA9IGVsZW1lbnRbX0dFVF9BVFRSSUJVVEVfXShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKGZ1bmNJcmlSZWdleCwgZnVuY3Rpb24obWF0Y2gsIGlkKSB7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpZF0gPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoIycgKyBpZCArIGlkU3VmZml4ICsgJyknO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRbX1NFVF9BVFRSSUJVVEVfXShwcm9wZXJ0eU5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVwbGFjZSBJRHMgaW4geGxpbms6cmVmIGFuZCBocmVmIGF0dHJpYnV0ZXNcbiAgICAgICAgICBbJ3hsaW5rOmhyZWYnLCAnaHJlZiddLmZvckVhY2goZnVuY3Rpb24ocmVmQXR0ck5hbWUpIHtcbiAgICAgICAgICAgIHZhciBpcmkgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocmVmQXR0ck5hbWUpO1xuICAgICAgICAgICAgaWYgKC9eXFxzKiMvLnRlc3QoaXJpKSkgeyAvLyBDaGVjayBpZiBpcmkgaXMgbm9uLW51bGwgYW5kIGludGVybmFsIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBpcmkgPSBpcmkudHJpbSgpO1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocmVmQXR0ck5hbWUsIGlyaSArIGlkU3VmZml4KTtcbiAgICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWRJZHMpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgSUQgdG8gcmVmZXJlbmNlZCBJRHNcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VkSWRzW2lyaS5zdWJzdHJpbmcoMSldID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQgPSBkZXNjRWxlbWVudHNbKytpXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpZEVsZW1lbnRzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICAgIGlkRWxlbSA9IGlkRWxlbWVudHNbaV07XG4gICAgICAgIC8vIElmIHNldCBvZiByZWZlcmVuY2VkIElEcyBleGlzdHMsIG1ha2Ugb25seSByZWZlcmVuY2VkIElEcyB1bmlxdWUsXG4gICAgICAgIC8vIG90aGVyd2lzZSBtYWtlIGFsbCBJRHMgdW5pcXVlLlxuICAgICAgICBpZiAoIXJlZmVyZW5jZWRJZHMgfHwgcmVmZXJlbmNlZElkc1tpZEVsZW0uaWRdKSB7XG4gICAgICAgICAgLy8gQWRkIHN1ZmZpeCB0byBlbGVtZW50J3MgSURcbiAgICAgICAgICBpZEVsZW0uaWQgKz0gaWRTdWZmaXg7XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHRydWUgaWYgU1ZHIGVsZW1lbnQgaGFzIGNoYW5nZWRcbiAgICByZXR1cm4gY2hhbmdlZDtcbiAgfVxuXG5cbiAgLy8gRm9yIGNhY2hlZCBTVkdzIHRoZSBJRHMgYXJlIG1hZGUgdW5pcXVlIGJ5IHNpbXBseSByZXBsYWNpbmcgdGhlIGFscmVhZHkgaW5zZXJ0ZWQgdW5pcXVlIElEcyB3aXRoIGFcbiAgLy8gaGlnaGVyIElEIGNvdW50ZXIuIFRoaXMgaXMgbXVjaCBtb3JlIHBlcmZvcm1hbnQgdGhhbiBhIGNhbGwgdG8gbWFrZUlkc1VuaXF1ZSgpLlxuICBmdW5jdGlvbiBtYWtlSWRzVW5pcXVlQ2FjaGVkKHN2Z1N0cmluZykge1xuICAgIHJldHVybiBzdmdTdHJpbmcucmVwbGFjZShJRF9TVUZGSVhfUkVHRVgsIElEX1NVRkZJWCArIHVuaXF1ZUlkQ291bnRlcisrKTtcbiAgfVxuXG5cbiAgLy8gSW5qZWN0IFNWRyBieSByZXBsYWNpbmcgdGhlIGltZyBlbGVtZW50IHdpdGggdGhlIFNWRyBlbGVtZW50IGluIHRoZSBET01cbiAgZnVuY3Rpb24gaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucykge1xuICAgIGlmIChzdmdFbGVtKSB7XG4gICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oJ2RhdGEtaW5qZWN0LXVybCcsIGFic1VybCk7XG4gICAgICB2YXIgcGFyZW50Tm9kZSA9IGltZ0VsZW0ucGFyZW50Tm9kZTtcbiAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcHlBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgY29weUF0dHJpYnV0ZXMoaW1nRWxlbSwgc3ZnRWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW52b2tlIGJlZm9yZUluamVjdCBob29rIGlmIHNldFxuICAgICAgICB2YXIgYmVmb3JlSW5qZWN0ID0gb3B0aW9ucy5iZWZvcmVJbmplY3Q7XG4gICAgICAgIHZhciBpbmplY3RFbGVtID0gKGJlZm9yZUluamVjdCAmJiBiZWZvcmVJbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSkpIHx8IHN2Z0VsZW07XG4gICAgICAgIC8vIFJlcGxhY2UgaW1nIGVsZW1lbnQgd2l0aCBuZXcgZWxlbWVudC4gVGhpcyBpcyB0aGUgYWN0dWFsIGluamVjdGlvbi5cbiAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoaW5qZWN0RWxlbSwgaW1nRWxlbSk7XG4gICAgICAgIC8vIE1hcmsgaW1nIGVsZW1lbnQgYXMgaW5qZWN0ZWRcbiAgICAgICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBJTkpFQ1RFRDtcbiAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgICAgICAvLyBJbnZva2UgYWZ0ZXJJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGFmdGVySW5qZWN0ID0gb3B0aW9ucy5hZnRlckluamVjdDtcbiAgICAgICAgaWYgKGFmdGVySW5qZWN0KSB7XG4gICAgICAgICAgYWZ0ZXJJbmplY3QoaW1nRWxlbSwgaW5qZWN0RWxlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIE1lcmdlcyBhbnkgbnVtYmVyIG9mIG9wdGlvbnMgb2JqZWN0cyBpbnRvIGEgbmV3IG9iamVjdFxuICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMoKSB7XG4gICAgdmFyIG1lcmdlZE9wdGlvbnMgPSB7fTtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAvLyBJdGVyYXRlIG92ZXIgYWxsIHNwZWNpZmllZCBvcHRpb25zIG9iamVjdHMgYW5kIGFkZCBhbGwgcHJvcGVydGllcyB0byB0aGUgbmV3IG9wdGlvbnMgb2JqZWN0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICB2YXIgYXJndW1lbnQgPSBhcmdzW2ldO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnQpIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgbWVyZ2VkT3B0aW9uc1trZXldID0gYXJndW1lbnRba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkT3B0aW9ucztcbiAgfVxuXG5cbiAgLy8gQWRkcyB0aGUgc3BlY2lmaWVkIENTUyB0byB0aGUgZG9jdW1lbnQncyA8aGVhZD4gZWxlbWVudFxuICBmdW5jdGlvbiBhZGRTdHlsZVRvSGVhZChjc3MpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50W19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgnaGVhZCcpWzBdO1xuICAgIGlmIChoZWFkKSB7XG4gICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXShfU1RZTEVfKTtcbiAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIEJ1aWxkcyBhbiBTVkcgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyLCB2ZXJpZnkpIHtcbiAgICBpZiAodmVyaWZ5KSB7XG4gICAgICB2YXIgc3ZnRG9jO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gUGFyc2UgdGhlIFNWRyBzdHJpbmcgd2l0aCBET01QYXJzZXJcbiAgICAgICAgc3ZnRG9jID0gc3ZnU3RyaW5nVG9TdmdEb2Moc3ZnU3RyKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIGlmIChzdmdEb2NbX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCdwYXJzZXJlcnJvcicpW19MRU5HVEhfXSkge1xuICAgICAgICAvLyBET01QYXJzZXIgZG9lcyBub3QgdGhyb3cgYW4gZXhjZXB0aW9uLCBidXQgaW5zdGVhZCBwdXRzIHBhcnNlcmVycm9yIHRhZ3MgaW4gdGhlIGRvY3VtZW50XG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN2Z0RvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBzdmdTdHI7XG4gICAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pIHtcbiAgICAvLyBSZW1vdmUgdGhlIG9ubG9hZCBhdHRyaWJ1dGUuIFNob3VsZCBvbmx5IGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSB1bnN0eWxlZCBpbWFnZSBmbGFzaCBwcm90ZWN0aW9uIGFuZFxuICAgIC8vIG1ha2UgdGhlIGVsZW1lbnQgdmlzaWJsZSwgbm90IGZvciByZW1vdmluZyB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gICAgaW1nRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ29ubG9hZCcpO1xuICB9XG5cblxuICBmdW5jdGlvbiBlcnJvck1lc3NhZ2UobXNnKSB7XG4gICAgY29uc29sZS5lcnJvcignU1ZHSW5qZWN0OiAnICsgbXNnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZmFpbChpbWdFbGVtLCBzdGF0dXMsIG9wdGlvbnMpIHtcbiAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IEZBSUw7XG4gICAgaWYgKG9wdGlvbnMub25GYWlsKSB7XG4gICAgICBvcHRpb25zLm9uRmFpbChpbWdFbGVtLCBzdGF0dXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvck1lc3NhZ2Uoc3RhdHVzKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucykge1xuICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICBmYWlsKGltZ0VsZW0sIFNWR19JTlZBTElELCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc3ZnTm90U3VwcG9ydGVkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfTk9UX1NVUFBPUlRFRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICBmYWlsKGltZ0VsZW0sIExPQURfRkFJTCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGltZ0VsZW0pIHtcbiAgICBpbWdFbGVtLm9ubG9hZCA9IE5VTEw7XG4gICAgaW1nRWxlbS5vbmVycm9yID0gTlVMTDtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaW1nTm90U2V0KG1zZykge1xuICAgIGVycm9yTWVzc2FnZSgnbm8gaW1nIGVsZW1lbnQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlU1ZHSW5qZWN0KGdsb2JhbE5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcbiAgICB2YXIgc3ZnTG9hZENhY2hlID0ge307XG5cbiAgICBpZiAoSVNfU1ZHX1NVUFBPUlRFRCkge1xuICAgICAgLy8gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgU1ZHLCBhZGQgYSBzbWFsbCBzdHlsZXNoZWV0IHRoYXQgaGlkZXMgdGhlIDxpbWc+IGVsZW1lbnRzIHVudGlsXG4gICAgICAvLyBpbmplY3Rpb24gaXMgZmluaXNoZWQuIFRoaXMgYXZvaWRzIHNob3dpbmcgdGhlIHVuc3R5bGVkIFNWR3MgYmVmb3JlIHN0eWxlIGlzIGFwcGxpZWQuXG4gICAgICBhZGRTdHlsZVRvSGVhZCgnaW1nW29ubG9hZF49XCInICsgZ2xvYmFsTmFtZSArICcoXCJde3Zpc2liaWxpdHk6aGlkZGVuO30nKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNWR0luamVjdFxuICAgICAqXG4gICAgICogSW5qZWN0cyB0aGUgU1ZHIHNwZWNpZmllZCBpbiB0aGUgYHNyY2AgYXR0cmlidXRlIG9mIHRoZSBzcGVjaWZpZWQgYGltZ2AgZWxlbWVudCBvciBhcnJheSBvZiBgaW1nYFxuICAgICAqIGVsZW1lbnRzLiBSZXR1cm5zIGEgUHJvbWlzZSBvYmplY3Qgd2hpY2ggcmVzb2x2ZXMgaWYgYWxsIHBhc3NlZCBpbiBgaW1nYCBlbGVtZW50cyBoYXZlIGVpdGhlciBiZWVuXG4gICAgICogaW5qZWN0ZWQgb3IgZmFpbGVkIHRvIGluamVjdCAoT25seSBpZiBhIGdsb2JhbCBQcm9taXNlIG9iamVjdCBpcyBhdmFpbGFibGUgbGlrZSBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzXG4gICAgICogb3IgdGhyb3VnaCBhIHBvbHlmaWxsKS5cbiAgICAgKlxuICAgICAqIE9wdGlvbnM6XG4gICAgICogdXNlQ2FjaGU6IElmIHNldCB0byBgdHJ1ZWAgdGhlIFNWRyB3aWxsIGJlIGNhY2hlZCB1c2luZyB0aGUgYWJzb2x1dGUgVVJMLiBEZWZhdWx0IHZhbHVlIGlzIGB0cnVlYC5cbiAgICAgKiBjb3B5QXR0cmlidXRlczogSWYgc2V0IHRvIGB0cnVlYCB0aGUgYXR0cmlidXRlcyB3aWxsIGJlIGNvcGllZCBmcm9tIGBpbWdgIHRvIGBzdmdgLiBEZmF1bHQgdmFsdWVcbiAgICAgKiAgICAgaXMgYHRydWVgLlxuICAgICAqIG1ha2VJZHNVbmlxdWU6IElmIHNldCB0byBgdHJ1ZWAgdGhlIElEIG9mIGVsZW1lbnRzIGluIHRoZSBgPGRlZnM+YCBlbGVtZW50IHRoYXQgY2FuIGJlIHJlZmVyZW5jZXMgYnlcbiAgICAgKiAgICAgcHJvcGVydHkgdmFsdWVzIChmb3IgZXhhbXBsZSAnY2xpcFBhdGgnKSBhcmUgbWFkZSB1bmlxdWUgYnkgYXBwZW5kaW5nIFwiLS1pbmplY3QtWFwiLCB3aGVyZSBYIGlzIGFcbiAgICAgKiAgICAgcnVubmluZyBudW1iZXIgd2hpY2ggaW5jcmVhc2VzIHdpdGggZWFjaCBpbmplY3Rpb24uIFRoaXMgaXMgZG9uZSB0byBhdm9pZCBkdXBsaWNhdGUgSURzIGluIHRoZSBET00uXG4gICAgICogYmVmb3JlTG9hZDogSG9vayBiZWZvcmUgU1ZHIGlzIGxvYWRlZC4gVGhlIGBpbWdgIGVsZW1lbnQgaXMgcGFzc2VkIGFzIGEgcGFyYW1ldGVyLiBJZiB0aGUgaG9vayByZXR1cm5zXG4gICAgICogICAgIGEgc3RyaW5nIGl0IGlzIHVzZWQgYXMgdGhlIFVSTCBpbnN0ZWFkIG9mIHRoZSBgaW1nYCBlbGVtZW50J3MgYHNyY2AgYXR0cmlidXRlLlxuICAgICAqIGFmdGVyTG9hZDogSG9vayBhZnRlciBTVkcgaXMgbG9hZGVkLiBUaGUgbG9hZGVkIGBzdmdgIGVsZW1lbnQgYW5kIGBzdmdgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFcbiAgICAgKiAgICAgcGFyYW1ldGVycy4gSWYgY2FjaGluZyBpcyBhY3RpdmUgdGhpcyBob29rIHdpbGwgb25seSBnZXQgY2FsbGVkIG9uY2UgZm9yIGluamVjdGVkIFNWR3Mgd2l0aCB0aGVcbiAgICAgKiAgICAgc2FtZSBhYnNvbHV0ZSBwYXRoLiBDaGFuZ2VzIHRvIHRoZSBgc3ZnYCBlbGVtZW50IGluIHRoaXMgaG9vayB3aWxsIGJlIGFwcGxpZWQgdG8gYWxsIGluamVjdGVkIFNWR3NcbiAgICAgKiAgICAgd2l0aCB0aGUgc2FtZSBhYnNvbHV0ZSBwYXRoLiBJdCdzIGFsc28gcG9zc2libGUgdG8gcmV0dXJuIGFuIGBzdmdgIHN0cmluZyBvciBgc3ZnYCBlbGVtZW50IHdoaWNoXG4gICAgICogICAgIHdpbGwgdGhlbiBiZSB1c2VkIGZvciB0aGUgaW5qZWN0aW9uLlxuICAgICAqIGJlZm9yZUluamVjdDogSG9vayBiZWZvcmUgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy4gSWZcbiAgICAgKiAgICAgYW55IGh0bWwgZWxlbWVudCBpcyByZXR1cm5lZCBpdCBnZXRzIGluamVjdGVkIGluc3RlYWQgb2YgYXBwbHlpbmcgdGhlIGRlZmF1bHQgU1ZHIGluamVjdGlvbi5cbiAgICAgKiBhZnRlckluamVjdDogSG9vayBhZnRlciBTVkcgaXMgaW5qZWN0ZWQuIFRoZSBgaW1nYCBhbmQgYHN2Z2AgZWxlbWVudHMgYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzLlxuICAgICAqIG9uQWxsRmluaXNoOiBIb29rIGFmdGVyIGFsbCBgaW1nYCBlbGVtZW50cyBwYXNzZWQgdG8gYW4gU1ZHSW5qZWN0KCkgY2FsbCBoYXZlIGVpdGhlciBiZWVuIGluamVjdGVkIG9yXG4gICAgICogICAgIGZhaWxlZCB0byBpbmplY3QuXG4gICAgICogb25GYWlsOiBIb29rIGFmdGVyIGluamVjdGlvbiBmYWlscy4gVGhlIGBpbWdgIGVsZW1lbnQgYW5kIGEgYHN0YXR1c2Agc3RyaW5nIGFyZSBwYXNzZWQgYXMgYW4gcGFyYW1ldGVyLlxuICAgICAqICAgICBUaGUgYHN0YXR1c2AgY2FuIGJlIGVpdGhlciBgJ1NWR19OT1RfU1VQUE9SVEVEJ2AgKHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHKSxcbiAgICAgKiAgICAgYCdTVkdfSU5WQUxJRCdgICh0aGUgU1ZHIGlzIG5vdCBpbiBhIHZhbGlkIGZvcm1hdCkgb3IgYCdMT0FEX0ZBSUxFRCdgIChsb2FkaW5nIG9mIHRoZSBTVkcgZmFpbGVkKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gYW4gaW1nIGVsZW1lbnQgb3IgYW4gYXJyYXkgb2YgaW1nIGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIG9wdGlvbmFsIHBhcmFtZXRlciB3aXRoIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIHRoaXMgaW5qZWN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNWR0luamVjdChpbWcsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICB2YXIgYWxsRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9uQWxsRmluaXNoID0gb3B0aW9ucy5vbkFsbEZpbmlzaDtcbiAgICAgICAgICBpZiAob25BbGxGaW5pc2gpIHtcbiAgICAgICAgICAgIG9uQWxsRmluaXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUgJiYgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpbWcgJiYgdHlwZW9mIGltZ1tfTEVOR1RIX10gIT0gX1VOREVGSU5FRF8pIHtcbiAgICAgICAgICAvLyBhbiBhcnJheSBsaWtlIHN0cnVjdHVyZSBvZiBpbWcgZWxlbWVudHNcbiAgICAgICAgICB2YXIgaW5qZWN0SW5kZXggPSAwO1xuICAgICAgICAgIHZhciBpbmplY3RDb3VudCA9IGltZ1tfTEVOR1RIX107XG5cbiAgICAgICAgICBpZiAoaW5qZWN0Q291bnQgPT0gMCkge1xuICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCsraW5qZWN0SW5kZXggPT0gaW5qZWN0Q291bnQpIHtcbiAgICAgICAgICAgICAgICBhbGxGaW5pc2goKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmplY3RDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgIFNWR0luamVjdEVsZW1lbnQoaW1nW2ldLCBvcHRpb25zLCBmaW5pc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvbmx5IG9uZSBpbWcgZWxlbWVudFxuICAgICAgICAgIFNWR0luamVjdEVsZW1lbnQoaW1nLCBvcHRpb25zLCBhbGxGaW5pc2gpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyByZXR1cm4gYSBQcm9taXNlIG9iamVjdCBpZiBnbG9iYWxseSBhdmFpbGFibGVcbiAgICAgIHJldHVybiB0eXBlb2YgUHJvbWlzZSA9PSBfVU5ERUZJTkVEXyA/IHJ1bigpIDogbmV3IFByb21pc2UocnVuKTtcbiAgICB9XG5cblxuICAgIC8vIEluamVjdHMgYSBzaW5nbGUgc3ZnIGVsZW1lbnQuIE9wdGlvbnMgbXVzdCBiZSBhbHJlYWR5IG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0IG9wdGlvbnMuXG4gICAgZnVuY3Rpb24gU1ZHSW5qZWN0RWxlbWVudChpbWdFbGVtLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgaWYgKGltZ0VsZW0pIHtcbiAgICAgICAgdmFyIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlID0gaW1nRWxlbVtfX1NWR0lOSkVDVF07XG4gICAgICAgIGlmICghc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKTtcblxuICAgICAgICAgIGlmICghSVNfU1ZHX1NVUFBPUlRFRCkge1xuICAgICAgICAgICAgc3ZnTm90U3VwcG9ydGVkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSW52b2tlIGJlZm9yZUxvYWQgaG9vayBpZiBzZXQuIElmIHRoZSBiZWZvcmVMb2FkIHJldHVybnMgYSB2YWx1ZSB1c2UgaXQgYXMgdGhlIHNyYyBmb3IgdGhlIGxvYWRcbiAgICAgICAgICAvLyBVUkwgcGF0aC4gRWxzZSB1c2UgdGhlIGltZ0VsZW0ncyBzcmMgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICAgIHZhciBiZWZvcmVMb2FkID0gb3B0aW9ucy5iZWZvcmVMb2FkO1xuICAgICAgICAgIHZhciBzcmMgPSAoYmVmb3JlTG9hZCAmJiBiZWZvcmVMb2FkKGltZ0VsZW0pKSB8fCBpbWdFbGVtW19HRVRfQVRUUklCVVRFX10oJ3NyYycpO1xuXG4gICAgICAgICAgaWYgKCFzcmMpIHtcbiAgICAgICAgICAgIC8vIElmIG5vIGltYWdlIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IGRvIG5vIGluamVjdGlvbi4gVGhpcyBjYW4gb25seSBiZSByZWFjaGVkIGJ5IHVzaW5nIGphdmFzY3JpcHRcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgaWYgbm8gc3JjIGF0dHJpYnV0ZSBpcyBzZXQgdGhlIG9ubG9hZCBhbmQgb25lcnJvciBldmVudHMgZG8gbm90IGdldCBjYWxsZWRcbiAgICAgICAgICAgIGlmIChzcmMgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzZXQgYXJyYXkgc28gbGF0ZXIgY2FsbHMgY2FuIHJlZ2lzdGVyIGNhbGxiYWNrc1xuICAgICAgICAgIHZhciBvbkZpbmlzaENhbGxiYWNrcyA9IFtdO1xuICAgICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gb25GaW5pc2hDYWxsYmFja3M7XG5cbiAgICAgICAgICB2YXIgb25GaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBvbkZpbmlzaENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKG9uRmluaXNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhYnNVcmwgPSBnZXRBYnNvbHV0ZVVybChzcmMpO1xuICAgICAgICAgIHZhciB1c2VDYWNoZU9wdGlvbiA9IG9wdGlvbnMudXNlQ2FjaGU7XG4gICAgICAgICAgdmFyIG1ha2VJZHNVbmlxdWVPcHRpb24gPSBvcHRpb25zLm1ha2VJZHNVbmlxdWU7XG4gICAgICAgICAgXG4gICAgICAgICAgdmFyIHNldFN2Z0xvYWRDYWNoZVZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgICAgc3ZnTG9hZENhY2hlW2Fic1VybF0uZm9yRWFjaChmdW5jdGlvbihzdmdMb2FkKSB7XG4gICAgICAgICAgICAgICAgc3ZnTG9hZCh2YWwpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc3ZnTG9hZENhY2hlW2Fic1VybF0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgdmFyIHN2Z0xvYWQgPSBzdmdMb2FkQ2FjaGVbYWJzVXJsXTtcblxuICAgICAgICAgICAgdmFyIGhhbmRsZUxvYWRWYWx1ZSA9IGZ1bmN0aW9uKGxvYWRWYWx1ZSkge1xuICAgICAgICAgICAgICBpZiAobG9hZFZhbHVlID09PSBMT0FEX0ZBSUwpIHtcbiAgICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2FkVmFsdWUgPT09IFNWR19JTlZBTElEKSB7XG4gICAgICAgICAgICAgICAgc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gbG9hZFZhbHVlWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzdmdTdHJpbmcgPSBsb2FkVmFsdWVbMV07XG4gICAgICAgICAgICAgICAgdmFyIHVuaXF1ZUlkc1N2Z1N0cmluZyA9IGxvYWRWYWx1ZVsyXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnRWxlbTtcblxuICAgICAgICAgICAgICAgIGlmIChtYWtlSWRzVW5pcXVlT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaGFzVW5pcXVlSWRzID09PSBOVUxMKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElEcyBmb3IgdGhlIFNWRyBzdHJpbmcgaGF2ZSBub3QgYmVlbiBtYWRlIHVuaXF1ZSBiZWZvcmUuIFRoaXMgbWF5IGhhcHBlbiBpZiBwcmV2aW91c1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmplY3Rpb24gb2YgYSBjYWNoZWQgU1ZHIGhhdmUgYmVlbiBydW4gd2l0aCB0aGUgb3B0aW9uIG1ha2VkSWRzVW5pcXVlIHNldCB0byBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBzdmdFbGVtID0gYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMF0gPSBoYXNVbmlxdWVJZHM7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRWYWx1ZVsyXSA9IGhhc1VuaXF1ZUlkcyAmJiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc1VuaXF1ZUlkcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIElEcyB1bmlxdWUgZm9yIGFscmVhZHkgY2FjaGVkIFNWR3Mgd2l0aCBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnU3RyaW5nID0gbWFrZUlkc1VuaXF1ZUNhY2hlZCh1bmlxdWVJZHNTdmdTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBzdmdFbGVtIHx8IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN2Z0xvYWQgIT0gX1VOREVGSU5FRF8pIHtcbiAgICAgICAgICAgICAgLy8gVmFsdWUgZm9yIHVybCBleGlzdHMgaW4gY2FjaGVcbiAgICAgICAgICAgICAgaWYgKHN2Z0xvYWQuaXNDYWxsYmFja1F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgLy8gU2FtZSB1cmwgaGFzIGJlZW4gY2FjaGVkLCBidXQgdmFsdWUgaGFzIG5vdCBiZWVuIGxvYWRlZCB5ZXQsIHNvIGFkZCB0byBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICBzdmdMb2FkLnB1c2goaGFuZGxlTG9hZFZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVMb2FkVmFsdWUoc3ZnTG9hZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHN2Z0xvYWQgPSBbXTtcbiAgICAgICAgICAgICAgLy8gc2V0IHByb3BlcnR5IGlzQ2FsbGJhY2tRdWV1ZSB0byBBcnJheSB0byBkaWZmZXJlbnRpYXRlIGZyb20gYXJyYXkgd2l0aCBjYWNoZWQgbG9hZGVkIHZhbHVlc1xuICAgICAgICAgICAgICBzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSA9IHRydWU7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gc3ZnTG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMb2FkIHRoZSBTVkcgYmVjYXVzZSBpdCBpcyBub3QgY2FjaGVkIG9yIGNhY2hpbmcgaXMgZGlzYWJsZWRcbiAgICAgICAgICBsb2FkU3ZnKGFic1VybCwgZnVuY3Rpb24oc3ZnWG1sLCBzdmdTdHJpbmcpIHtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgWE1MIGZyb20gdGhlIFhIUiByZXF1ZXN0IGlmIGl0IGlzIGFuIGluc3RhbmNlIG9mIERvY3VtZW50LiBPdGhlcndpc2VcbiAgICAgICAgICAgIC8vIChmb3IgZXhhbXBsZSBvZiBJRTkpLCBjcmVhdGUgdGhlIHN2ZyBkb2N1bWVudCBmcm9tIHRoZSBzdmcgc3RyaW5nLlxuICAgICAgICAgICAgdmFyIHN2Z0VsZW0gPSBzdmdYbWwgaW5zdGFuY2VvZiBEb2N1bWVudCA/IHN2Z1htbC5kb2N1bWVudEVsZW1lbnQgOiBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCB0cnVlKTtcblxuICAgICAgICAgICAgdmFyIGFmdGVyTG9hZCA9IG9wdGlvbnMuYWZ0ZXJMb2FkO1xuICAgICAgICAgICAgaWYgKGFmdGVyTG9hZCkge1xuICAgICAgICAgICAgICAvLyBJbnZva2UgYWZ0ZXJMb2FkIGhvb2sgd2hpY2ggbWF5IG1vZGlmeSB0aGUgU1ZHIGVsZW1lbnQuIEFmdGVyIGxvYWQgbWF5IGFsc28gcmV0dXJuIGEgbmV3XG4gICAgICAgICAgICAgIC8vIHN2ZyBlbGVtZW50IG9yIHN2ZyBzdHJpbmdcbiAgICAgICAgICAgICAgdmFyIHN2Z0VsZW1PclN2Z1N0cmluZyA9IGFmdGVyTG9hZChzdmdFbGVtLCBzdmdTdHJpbmcpIHx8IHN2Z0VsZW07XG4gICAgICAgICAgICAgIGlmIChzdmdFbGVtT3JTdmdTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc3ZnRWxlbSBhbmQgc3ZnU3RyaW5nIGJlY2F1c2Ugb2YgbW9kaWZpY2F0aW9ucyB0byB0aGUgU1ZHIGVsZW1lbnQgb3IgU1ZHIHN0cmluZyBpblxuICAgICAgICAgICAgICAgIC8vIHRoZSBhZnRlckxvYWQgaG9vaywgc28gdGhlIG1vZGlmaWVkIFNWRyBpcyBhbHNvIHVzZWQgZm9yIGFsbCBsYXRlciBjYWNoZWQgaW5qZWN0aW9uc1xuICAgICAgICAgICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBzdmdFbGVtT3JTdmdTdHJpbmcgPT0gJ3N0cmluZyc7XG4gICAgICAgICAgICAgICAgc3ZnU3RyaW5nID0gaXNTdHJpbmcgPyBzdmdFbGVtT3JTdmdTdHJpbmcgOiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbSk7XG4gICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGlzU3RyaW5nID8gYnVpbGRTdmdFbGVtZW50KHN2Z0VsZW1PclN2Z1N0cmluZywgdHJ1ZSkgOiBzdmdFbGVtT3JTdmdTdHJpbmc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN2Z0VsZW0gaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHZhciBoYXNVbmlxdWVJZHMgPSBOVUxMO1xuICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIGhhc1VuaXF1ZUlkcyA9IG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVuaXF1ZUlkc1N2Z1N0cmluZyA9IGhhc1VuaXF1ZUlkcyAmJiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbSk7XG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuIGFycmF5IHdpdGggdGhyZWUgZW50cmllcyB0byB0aGUgbG9hZCBjYWNoZVxuICAgICAgICAgICAgICAgIHNldFN2Z0xvYWRDYWNoZVZhbHVlKFtoYXNVbmlxdWVJZHMsIHN2Z1N0cmluZywgdW5pcXVlSWRzU3ZnU3RyaW5nXSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIHNldFN2Z0xvYWRDYWNoZVZhbHVlKFNWR19JTlZBTElEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNldFN2Z0xvYWRDYWNoZVZhbHVlKExPQURfRkFJTCk7XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSkge1xuICAgICAgICAgICAgLy8gc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUgaXMgYW4gYXJyYXkuIEluamVjdGlvbiBpcyBub3QgY29tcGxldGUgc28gcmVnaXN0ZXIgY2FsbGJhY2tcbiAgICAgICAgICAgIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1nTm90U2V0KCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIFNWR0luamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBkZWZhdWx0IFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGFuIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBTVkdJbmplY3Quc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB9O1xuXG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgU1ZHSW5qZWN0XG4gICAgU1ZHSW5qZWN0LmNyZWF0ZSA9IGNyZWF0ZVNWR0luamVjdDtcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbiBvbmVycm9yIEV2ZW50IG9mIGFuIGA8aW1nPmAgZWxlbWVudCB0byBoYW5kbGUgY2FzZXMgd2hlbiB0aGUgbG9hZGluZyB0aGUgb3JpZ2luYWwgc3JjIGZhaWxzXG4gICAgICogKGZvciBleGFtcGxlIGlmIGZpbGUgaXMgbm90IGZvdW5kIG9yIGlmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHKS4gVGhpcyB0cmlnZ2VycyBhIGNhbGwgdG8gdGhlXG4gICAgICogb3B0aW9ucyBvbkZhaWwgaG9vayBpZiBhdmFpbGFibGUuIFRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHdpbGwgYmUgc2V0IGFzIHRoZSBuZXcgc3JjIGF0dHJpYnV0ZVxuICAgICAqIGZvciB0aGUgaW1nIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtmYWxsYmFja1NyY10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgZmFsbGJhY2sgc3JjXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LmVyciA9IGZ1bmN0aW9uKGltZywgZmFsbGJhY2tTcmMpIHtcbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgaWYgKGltZ1tfX1NWR0lOSkVDVF0gIT0gRkFJTCkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGltZyk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWcsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBsb2FkRmFpbChpbWcsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZhbGxiYWNrU3JjKSB7XG4gICAgICAgICAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBmYWxsYmFja1NyYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3dbZ2xvYmFsTmFtZV0gPSBTVkdJbmplY3Q7XG5cbiAgICByZXR1cm4gU1ZHSW5qZWN0O1xuICB9XG5cbiAgdmFyIFNWR0luamVjdEluc3RhbmNlID0gY3JlYXRlU1ZHSW5qZWN0KCdTVkdJbmplY3QnKTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFNWR0luamVjdEluc3RhbmNlO1xuICB9XG59KSh3aW5kb3csIGRvY3VtZW50KTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUm9ib3RvX0NvbmRlbnNlZC9zdGF0aWMvUm9ib3RvQ29uZGVuc2VkLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvK0NvbmRlbnNlZCAqL1xuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgQXJpYWw7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9hcHAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdURBQXVEO0VBQ3ZELCtCQUErQjtFQUMvQiw0Q0FBMkU7RUFDM0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHNDQUFzQztFQUN0QywrQkFBK0I7RUFDL0Isa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1JvYm90bytDb25kZW5zZWQgKi9cXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBzcmM6IHVybCguL2Fzc2V0cy9mb250cy9Sb2JvdG9fQ29uZGVuc2VkL3N0YXRpYy9Sb2JvdG9Db25kZW5zZWQtTWVkaXVtLnR0Zik7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBBcmlhbDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCc7XFxuICBmb250LWZhbWlseTogQXJpYWw7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI25hdmJhciA+IC5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKiB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwLjNyZW07XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xuICAvKiB2YWx1ZSBuZWVkcyB0byBiZSBlcXVhbCB0byAubmF2X2J0biBwYWRkaW5nIHZhbHVlICovXG4gIG1hcmdpbi10b3A6IDAuM3JlbTtcbn1cblxuLyogb3B0aW9uYWwgKi9cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOjphZnRlcixcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmhvdmVyOjphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29udGVudDogJyc7XG4gIGhlaWdodDogMTAwJTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAxODcsIDY5KTtcbiAgei1pbmRleDogLTE7XG59XG5cbi8qIG9wdGlvbmFsICovXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTo6YWZ0ZXIge1xuICB3aWR0aDogMCU7XG4gIHRyYW5zZm9ybTogc2tld1goMGRlZyk7XG4gIHRyYW5zaXRpb246IGFsbCA1MDBtcyBlYXNlLWluLW91dDtcbn1cblxuLyogb3B0aW9uYWwgKi9cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmhvdmVyOjphZnRlciB7XG4gIHdpZHRoOiAxMDAlO1xuICB0cmFuc2Zvcm06IHNrZXdYKDhkZWcpIHNjYWxlWCgxLjAzKTtcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSA+IGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQzLCAxMDMsIDIyMyk7XG4gIHBhZGRpbmc6IDFyZW07XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XG59XG5cbiNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodC52aXNpYmxlIHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4ubmF2X2l0ZW0sXG4ubmF2X2l0ZW06dmlzaXRlZCB7XG4gIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWZvbnQtY29sb3IsIHJnYigwLCAwLCAwKSk7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLm5hdl9pdGVtID4gc3ZnLFxuLm5hdl9idG4gPiBzdmcge1xuICB3aWR0aDogY2xhbXAoMnJlbSwgM3Z3LCAzLjVyZW0pO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5uYXZfYnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcbiAgcGFkZGluZzogMC4zcmVtO1xuICB6LWluZGV4OiAxO1xufVxuXG4ubmF2X2J0bjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xufVxuXG4ubmF2X2J0bjpob3ZlciA+IHN2ZyB7XG4gIGZpbHRlcjogaW52ZXJ0KDEpO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+IC5uYXZfcmlnaHQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICB3aWR0aDogaW5oZXJpdDtcbiAgfVxuXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmxhc3Qtb2YtdHlwZTphZnRlcixcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bGFzdC1vZi10eXBlOmhvdmVyOmFmdGVyIHtcbiAgICBjb250ZW50OiBub25lO1xuICB9XG5cbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlcixcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgdG9wOiBhdXRvO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIH1cblxuICAvKiBvcHRpb25hbCAqL1xuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyIHtcbiAgICB3aWR0aDogMCU7XG4gICAgaGVpZ2h0OiAwJTtcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbiAgfVxuXG4gIC8qIG9wdGlvbmFsICovXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcbiAgICB3aWR0aDogNjAlO1xuICAgIGhlaWdodDogMTIlO1xuICAgIHRyYW5zZm9ybTogc2tld1goMGRlZykgc2NhbGVYKDEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcbiAgfVxuXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICAubmF2X2J0biB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL25hdmJhci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNEQUFzRDtFQUN0RCxrQkFBa0I7QUFDcEI7O0FBRUEsYUFBYTtBQUNiOztFQUVFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLE1BQU07RUFDTixPQUFPO0VBQ1AsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLGlDQUFpQztBQUNuQzs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxXQUFXO0VBQ1gsbUNBQW1DO0VBQ25DLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsYUFBYTtFQUNiLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsdUNBQXVDO0FBQ3pDOztBQUVBOztFQUVFLDhDQUE4QztFQUM5QyxxQkFBcUI7QUFDdkI7O0FBRUE7O0VBRUUsK0JBQStCO0VBQy9CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsZUFBZTtFQUNmLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGVBQWU7RUFDZixvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRTtJQUNFLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLFVBQVU7SUFDVix5QkFBeUI7SUFDekIsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0VBQ2hCOztFQUVBOztJQUVFLGFBQWE7RUFDZjs7RUFFQTs7SUFFRSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFNBQVM7SUFDVCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFlBQVk7SUFDWixtQkFBbUI7RUFDckI7O0VBRUEsYUFBYTtFQUNiO0lBQ0UsU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsaUNBQWlDO0VBQ25DOztFQUVBLGFBQWE7RUFDYjtJQUNFLFVBQVU7SUFDVixXQUFXO0lBQ1gsZ0NBQWdDO0lBQ2hDLGlDQUFpQztFQUNuQzs7RUFFQTtJQUNFLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNuYXZiYXIgPiAuY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAqID4gbGk6Zmlyc3Qtb2YtdHlwZSB7XFxuICAvKiB2YWx1ZSBuZWVkcyB0byBiZSBlcXVhbCB0byAubmF2X2J0biBwYWRkaW5nIHZhbHVlICovXFxuICBtYXJnaW4tdG9wOiAwLjNyZW07XFxufVxcblxcbi8qIG9wdGlvbmFsICovXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6OmFmdGVyLFxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAxODcsIDY5KTtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG5cXG4vKiBvcHRpb25hbCAqL1xcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOjphZnRlciB7XFxuICB3aWR0aDogMCU7XFxuICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4vKiBvcHRpb25hbCAqL1xcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOmhvdmVyOjphZnRlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRyYW5zZm9ybTogc2tld1goOGRlZykgc2NhbGVYKDEuMDMpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jbmF2YmFyID4gLmNvbnRhaW5lciA+ICogPiBsaSA+IGEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQzLCAxMDMsIDIyMyk7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG59XFxuXFxuI25hdmJhciA+IC5jb250YWluZXIgPiAubmF2X3JpZ2h0LnZpc2libGUge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5uYXZfaXRlbSxcXG4ubmF2X2l0ZW06dmlzaXRlZCB7XFxuICBjb2xvcjogdmFyKC0tcHJpbWFyeS1mb250LWNvbG9yLCByZ2IoMCwgMCwgMCkpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4ubmF2X2l0ZW0gPiBzdmcsXFxuLm5hdl9idG4gPiBzdmcge1xcbiAgd2lkdGg6IGNsYW1wKDJyZW0sIDN2dywgMy41cmVtKTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLm5hdl9idG4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XFxuICBwYWRkaW5nOiAwLjNyZW07XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4ubmF2X2J0bjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbi5uYXZfYnRuOmhvdmVyID4gc3ZnIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDEpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gLm5hdl9yaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgd2lkdGg6IGluaGVyaXQ7XFxuICB9XFxuXFxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpsYXN0LW9mLXR5cGU6YWZ0ZXIsXFxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpsYXN0LW9mLXR5cGU6aG92ZXI6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBub25lO1xcbiAgfVxcblxcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlcixcXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKjpub3QoLm5hdl9sZWZ0KSA+IGxpOm5vdCg6bGFzdC1jaGlsZCk6aG92ZXI6OmFmdGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IDA7XFxuICAgIHRvcDogYXV0bztcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIH1cXG5cXG4gIC8qIG9wdGlvbmFsICovXFxuICAjbmF2YmFyID4gLmNvbnRhaW5lciA+ICo6bm90KC5uYXZfbGVmdCkgPiBsaTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyIHtcXG4gICAgd2lkdGg6IDAlO1xcbiAgICBoZWlnaHQ6IDAlO1xcbiAgICB0cmFuc2Zvcm06IHNrZXdYKDBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICB9XFxuXFxuICAvKiBvcHRpb25hbCAqL1xcbiAgI25hdmJhciA+IC5jb250YWluZXIgPiAqOm5vdCgubmF2X2xlZnQpID4gbGk6bm90KDpsYXN0LWNoaWxkKTpob3Zlcjo6YWZ0ZXIge1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBoZWlnaHQ6IDEyJTtcXG4gICAgdHJhbnNmb3JtOiBza2V3WCgwZGVnKSBzY2FsZVgoMSk7XFxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlLWluLW91dDtcXG4gIH1cXG5cXG4gICNuYXZiYXIgPiAuY29udGFpbmVyID4gKiA+IGxpOmZpcnN0LW9mLXR5cGUge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgfVxcblxcbiAgLm5hdl9idG4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYXZiYXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYXZiYXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgJy4vYXBwLmNzcyc7XG5pbXBvcnQgJ0BpY29uZnUvc3ZnLWluamVjdCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaGVhZGVyQnVpbGRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlcic7XG5pbXBvcnQgbWFpbkJ1aWxkZXIgZnJvbSAnLi9jb21wb25lbnRzL21haW4vbWFpbic7XG5pbXBvcnQgJy4vY29udGFpbmVycy9hcGlfY29udHJvbGxlcic7XG5cbigoKSA9PiB7XG4gIGNvbnN0IGJ1aWxkID0ge1xuICAgIGhlYWRlcjogaGVhZGVyQnVpbGRlcixcbiAgICBtYWluOiBtYWluQnVpbGRlcixcbiAgfTtcblxuICBjb25zdCBhcHAgPSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHAuaW5pdCgpIHJ1bm5pbmcnKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCBhcHBXcmFwcGVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBhcHBDb250ZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBhcHBXcmFwcGVyLmlkID0gJ3dlYXRoZXJfYXBwJztcbiAgICAgIGFwcENvbnRlbnQuaWQgPSAnY29udGVudCc7XG5cbiAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnVpbGQuaGVhZGVyKCkpO1xuICAgICAgYXBwQ29udGVudC5hcHBlbmRDaGlsZChidWlsZC5tYWluKCkpO1xuICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChhcHBDb250ZW50KTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHBXcmFwcGVyKTtcbiAgICB9LFxuICB9O1xuXG4gIGFwcC5pbml0KCk7XG59KSgpO1xuXG4vLyBnZXREYXRhKCdsb25kb24nKTtcblxuLy8gdXNlIFdlYXRoZXJBUElcbi8vIGh0dHBzOi8vd3d3LndlYXRoZXJhcGkuY29tL2RvY3MvXG5cbi8vIHRoaW5ncyB0byBkbzpcbi8vIFlvdSBzaG91bGQgYmUgYWJsZSB0byBzZWFyY2ggZm9yIGEgc3BlY2lmaWMgbG9jYXRpb25cbi8vIHRvZ2dsZSBkaXNwbGF5aW5nIHRoZSBkYXRhIGluIEZhaHJlbmhlaXQgb3IgQ2Vsc2l1cy5cbi8vIFlvdSBzaG91bGQgY2hhbmdlIHRoZSBsb29rIG9mIHRoZSBwYWdlIGJhc2VkIG9uIHRoZSBkYXRhLCBtYXliZSBieSBjaGFuZ2luZyB0aGUgY29sb3Igb2YgdGhlIGJhY2tncm91bmQgb3IgYnkgYWRkaW5nIGltYWdlcyB0aGF0IGRlc2NyaWJlIHRoZSB3ZWF0aGVyXG5cbi8vIGlucHV0czpcbi8vIDEuIGNpdHkgb3IgcG9zdGFsIGNvZGVzXG5cbi8vIGRlc2lnbjpcbi8vIGFkZCBhIOKAmGxvYWRpbmfigJkgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgZnJvbSB0aGUgdGltZSB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgdW50aWwgdGhlIGluZm9ybWF0aW9uIGNvbWVzIGJhY2sgZnJvbSB0aGUgQVBJLlxuLy8gMyBkYXkgZm9yZWNhc3Rcbi8vIGhvdXJseSBhbmQgZGFpbHkgZm9yZWNhc3RcblxuLy8gbGF5b3V0OlxuLy8gPGFwcD5cbi8vICAgIDxoZWFkZXI+IChuYXZpZ2F0aW9uKVxuLy8gICAgPGNvbnRlbnQ+XG4vLyAgICAgIDxoZWFkaW5nPlxuLy8gICAgICA8aW5wdXQ+ICh3aXRoIEMvRiB0b2dnbGUgYnV0dG9uKVxuLy8gICAgICA8b3V0cHV0PlxuLy8gICAgICAgIDx0b2RheT4gKGdldCBjdXJyZW50IGRhdGUpXG4vLyAgICAgICAgPGhvdXJseT4gKGdldCB1c2VyJ3MgY3VycmVudCB0aW1lKVxuLy8gICAgICAgICAgdGltZSB8IGNvbmRpdGlvbnMgfCB0ZW1wIHwgZmVlbHMgbGlrZSB8IHByZWNpcCBjaGFuY2UgJSB8IHByZWNpcCBhbW91bnQgJSB8IGNsb3VkIGNvdmVyICUgfCBkZXcgcG9pbnQgfCBodW1pZGl0eSAlIHwgd2luZCBzcGVlZCBBTkQgZGlyZWN0aW9uXG4vLyAgICAgICAgPDMtZGF5PiAoMy1kYXkgZm9yZWNhc3QpXG4vLyAgICA8Zm9vdGVyPlxuIiwidmFyIG1hcCA9IHtcblx0XCIuL2NoYW5jZV9vZl9yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGFuY2Vfb2ZfcmFpbi5zdmdcIixcblx0XCIuL2h1bWlkaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9odW1pZGl0eS5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCIsXG5cdFwiLi9taW5tYXh0ZW1wLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9taW5tYXh0ZW1wLnN2Z1wiLFxuXHRcIi4vcHJlc3N1cmUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3ByZXNzdXJlLnN2Z1wiLFxuXHRcIi4vc2hhcnBfaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvc2hhcnBfaG9tZS5zdmdcIixcblx0XCIuL3V2LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy91di5zdmdcIixcblx0XCIuL3Zpc2liaWxpdHkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3Zpc2liaWxpdHkuc3ZnXCIsXG5cdFwiLi93aW5kLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy93aW5kLnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyBcXFxcLnN2ZyRcIjsiLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuXG5jb25zdCBlcnJvckJ1aWxkZXIgPSB7XG4gIGluaXQod2VhdGhlckVycm9yKSB7XG4gICAgdGhpcy5zZXRFcnJvcih3ZWF0aGVyRXJyb3IpO1xuICB9LFxuICBzZXRFcnJvcihlcnJvcikge1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvci5lcnJvcjtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGBFcnJvciBjb2RlOiAke2Vycm9yLnN0YXR1c31cbiAgICAke2Vycm9yLmVycm9yLm1lc3NhZ2V9YDtcbiAgfSxcbiAgY2FjaGVET00oKSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZXJyb3JTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGVycm9ySGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgZXJyb3JTZWN0aW9uLmlkID0gJ2Vycm9yJztcbiAgICBlcnJvckhlYWRpbmcuc2V0QXR0cmlidXRlcyh7IHRleHRDb250ZW50OiB0aGlzLmVycm9yTWVzc2FnZSB9KTtcblxuICAgIGVycm9yU2VjdGlvbi5hcHBlbmRDaGlsZChlcnJvckhlYWRpbmcpO1xuICAgIHJldHVybiBlcnJvclNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlcnJvckhlYWRlcih3ZWF0aGVyRXJyb3IpIHtcbiAgZXJyb3JCdWlsZGVyLmluaXQod2VhdGhlckVycm9yKTtcbiAgcmV0dXJuIGVycm9yQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIGVsZW1lbnQ6ICdoMScsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6ICdoZXJvJyxcbiAgICAgIHRleHRDb250ZW50OiAnd2VhdGhlciBhcHAnLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBlbGVtZW50OiAnZm9ybScsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6ICdmb3JtJyxcbiAgICB9LFxuICAgIGlucHV0czogW1xuICAgICAge1xuICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaWQ6ICdsb2NhdGlvbicsXG4gICAgICAgICAgY2xhc3M6ICdmb3JtX2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnbG9jYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRW50ZXIgY2l0eSBvciBwb3N0YWwgY29kZScsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAnRW50ZXIgYSB2YWxpZCBjaXR5IG9yIHBvc3RhbCBjb2RlJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHB1YlN1YiBmcm9tICcuLi8uLi9jb250YWluZXJzL3B1YlN1Yic7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyLmNvbmZpZyc7XG5pbXBvcnQgYnVpbGROYXZiYXIgZnJvbSAnLi4vbmF2YmFyL25hdmJhcic7XG5cbmNvbnN0IGhlYWRlckJ1aWxkZXIgPSB7XG4gIGNhY2hlRE9NKGhlYWRlckVsZW1lbnQpIHtcbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlckVsZW1lbnQ7XG4gICAgdGhpcy5mb3JtID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICAgIHRoaXMuaW5wdXRTZWFyY2ggPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbicpO1xuICAgIHRoaXMuaW5wdXRFcnJvcnMgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52YWxpZGl0eV9lcnJvcicpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGhlYWRlckVsZW1lbnQuaWQgPSAnaGVhZGVyJztcbiAgICBoZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGJ1aWxkTmF2YmFyLnJlbmRlcigpKTtcblxuICAgIE9iamVjdC5rZXlzKGhlYWRlcikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBoZWFkZXJJdGVtID0gY3JlYXRlRWxlbWVudChoZWFkZXJba2V5XS5lbGVtZW50KTtcbiAgICAgIGhlYWRlckl0ZW0uc2V0QXR0cmlidXRlcyhoZWFkZXJba2V5XS5hdHRyaWJ1dGVzKTtcblxuICAgICAgaWYgKGhlYWRlcltrZXldLmlucHV0cykge1xuICAgICAgICBoZWFkZXJba2V5XS5pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNvbnN0IGlucHV0TGFiZWwgPSBjcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgIGNvbnN0IGZvcm1JbnB1dCA9IGNyZWF0ZUVsZW1lbnQoaW5wdXQuZWxlbWVudCk7XG4gICAgICAgICAgY29uc3QgaW5wdXRFcnJvciA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgIGlucHV0RXJyb3Iuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogYHZhbGlkaXR5X2Vycm9yICR7aW5wdXQuYXR0cmlidXRlcy5pZH1gLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGlucHV0LmVycm9yLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZvcm1JbnB1dC5zZXRBdHRyaWJ1dGVzKGlucHV0LmF0dHJpYnV0ZXMpO1xuICAgICAgICAgIGlucHV0TGFiZWwuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBmb3I6IGlucHV0LmF0dHJpYnV0ZXMuaWQsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogaW5wdXQuYXR0cmlidXRlcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtSXRlbS5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdmb3JtX2l0ZW0nIH0pO1xuXG4gICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaW5wdXRMYWJlbCk7XG4gICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoZm9ybUlucHV0KTtcbiAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChpbnB1dEVycm9yKTtcbiAgICAgICAgICBoZWFkZXJJdGVtLmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVySXRlbSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRE9NKGhlYWRlckVsZW1lbnQpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xuICB9LFxuICBzdWJtaXRGb3JtKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2codGhpcy5pbnB1dFNlYXJjaC52YWx1ZSk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ2dldFdlYXRoZXInLCB0aGlzLmlucHV0U2VhcmNoLnZhbHVlKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSGVhZGVyKCkge1xuICByZXR1cm4gaGVhZGVyQnVpbGRlci5yZW5kZXIoKTtcbn1cbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5cbmNvbnN0IGhvbWVCdWlsZGVyID0ge1xuICBjYWNoZURPTSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGVET00oKSBydW5uaW5nIGZyb20gaG9tZS5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIGhvbWUuanMnKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhvbWVTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGhvbWVTZWN0aW9uLmlkID0gJ2hvbWUnO1xuICAgIGNvbnN0IGhvbWVIZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBob21lSGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6ICdIT01FJyB9KTtcblxuICAgIGhvbWVTZWN0aW9uLmFwcGVuZENoaWxkKGhvbWVIZWFkaW5nKTtcblxuICAgIHJldHVybiBob21lU2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSG9tZSgpIHtcbiAgcmV0dXJuIGhvbWVCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcblxuY29uc3QgbG9hZGluZ0J1aWxkZXIgPSB7XG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBsb2FkaW5nLmpzJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coJ2JpbmRFdmVudHMoKSBydW5uaW5nIGZyb20gbG9hZGluZy5qcycpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbG9hZGluZ1NlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgbG9hZGluZ1NlY3Rpb24uaWQgPSAnbG9hZGluZyc7XG4gICAgY29uc3QgbG9hZGluZ0hlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGxvYWRpbmdIZWFkaW5nLnNldEF0dHJpYnV0ZXMoeyB0ZXh0Q29udGVudDogJ0xPQURJTkcuLi4nIH0pO1xuXG4gICAgbG9hZGluZ1NlY3Rpb24uYXBwZW5kQ2hpbGQobG9hZGluZ0hlYWRpbmcpO1xuXG4gICAgcmV0dXJuIGxvYWRpbmdTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIb21lKCkge1xuICByZXR1cm4gbG9hZGluZ0J1aWxkZXIucmVuZGVyKCk7XG59XG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHViU3ViJztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaG9tZUJ1aWxkZXIgZnJvbSAnLi4vaG9tZS9ob21lJztcbmltcG9ydCBlcnJvckJ1aWxkZXIgZnJvbSAnLi4vZXJyb3IvZXJyb3InO1xuaW1wb3J0IHRhYnNCdWlsZGVyIGZyb20gJy4uL3RhYnMvdGFicyc7XG5pbXBvcnQgbG9hZGluZ0J1aWxkZXIgZnJvbSAnLi4vbG9hZGluZy9sb2FkaW5nJztcblxuY29uc3QgYnVpbGQgPSB7XG4gIGhvbWU6IGhvbWVCdWlsZGVyLFxuICBlcnJvcjogZXJyb3JCdWlsZGVyLFxuICB0YWJzOiB0YWJzQnVpbGRlcixcbiAgbG9hZGluZzogbG9hZGluZ0J1aWxkZXIsXG59O1xuXG5jb25zdCBtYWluQnVpbGRlciA9IHtcbiAgYWN0aXZlQ29udGVudDogbnVsbCxcbiAgYWN0aXZlVGFiOiBudWxsLFxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCdpbml0KCkgbWV0aGlkIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gIH0sXG4gIGNhY2hlRE9NKG1haW5FbGVtZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlRE9NKCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcbiAgICB0aGlzLm1haW4gPSBtYWluRWxlbWVudDtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gICAgdGhpcy5zd2l0Y2hDb250ZW50ID0gdGhpcy5zd2l0Y2hDb250ZW50LmJpbmQodGhpcyk7XG4gICAgcHViU3ViLnN1YnNjcmliZSgnc3dpdGNoQ29udGVudCcsIHRoaXMuc3dpdGNoQ29udGVudCk7XG4gIH0sXG4gIHJlbmRlcihrZXksIGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyKCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcblxuICAgIGxldCBjb250ZW50O1xuICAgIGlmICgha2V5KSB7XG4gICAgICAvLyBpbml0aWFsIG9ubG9hZFxuICAgICAgY29udGVudCA9IGJ1aWxkLmhvbWUoKTtcbiAgICAgIC8vIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW5kZXIgdG9kYXlcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKGRhdGEpO1xuICAgICAgdGhpcy5tYWluLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5tYWluLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICB9LFxuICBzd2l0Y2hDb250ZW50KGUpIHtcbiAgICBsZXQgcmVuZGVyS2V5O1xuICAgIGNvbnNvbGUubG9nKCdzd2l0Y2hDb250ZW50KCkgcnVubmluZyBmcm9tIG1haW4uanMnKTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICBpZiAoZS5lcnJvcikge1xuICAgICAgcmVuZGVyS2V5ID0gJ2Vycm9yJztcbiAgICB9IGVsc2UgaWYgKGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgcmVuZGVyS2V5ID0gJ2xvYWRpbmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnZmV0Y2ggc3VjY2VzcycpO1xuICAgICAgcmVuZGVyS2V5ID0gJ3RhYnMnO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcihyZW5kZXJLZXksIGUpO1xuICB9LFxuICBzZXRBY3RpdmVUYWIodGFiKSB7XG4gICAgY29uc29sZS5sb2coJ3NldEFjdGl2ZVRhYigpIHJ1bm5pbmcgZnJvbSBtYWluLmpzJyk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gIC8vIHJldHVybiBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgbWFpbi5pZCA9ICdtYWluX2NvbnRlbnQnO1xuICBtYWluQnVpbGRlci5jYWNoZURPTShtYWluKTtcbiAgbWFpbkJ1aWxkZXIuYmluZEV2ZW50cygpO1xuICBtYWluQnVpbGRlci5yZW5kZXIoKTtcbiAgcmV0dXJuIG1haW47XG59XG4iLCJpbXBvcnQgSWxsdXN0cmF0aW9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pbGx1c3RyYXRpb25zL3VuZHJhd193ZWF0aGVyX2FwcC5zdmcnO1xuaW1wb3J0IEljb25NZW51IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9tZW51LnN2Zyc7XG5pbXBvcnQgSWNvbkdpdGh1YiBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvZ2l0aHViX21hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYXZMZWZ0OiBbXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0gbmF2X2xvZ28nLFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBzcmM6IElsbHVzdHJhdGlvbixcbiAgICAgICAgICAgIG9ubG9hZDogJ1NWR0luamVjdCh0aGlzKScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICB0ZXh0Q29udGVudDogJ1dlYXRoZXIgQXBwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICBuYXZSaWdodDogW1xuICAgIHtcbiAgICAgIGVsZW1lbnQ6ICdhJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgICAgdGV4dENvbnRlbnQ6ICdQbGFjZWhvbGRlcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBocmVmOiAnIycsXG4gICAgICAgIGNsYXNzOiAnbmF2X2l0ZW0nLFxuICAgICAgICB0ZXh0Q29udGVudDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBlbGVtZW50OiAnYScsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vbWlrZXlDb3MvdGhlT2RpblByb2plY3QvdHJlZS9tYWluL2phdmFTY3JpcHQvcHJvamVjdHMvd2VhdGhlci1hcHAnLFxuICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICBjbGFzczogJ25hdl9pdGVtJyxcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgc3JjOiBJY29uR2l0aHViLFxuICAgICAgICAgICAgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICBtZW51QnV0dG9uOiB7XG4gICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICduYXZfYnRuJyxcbiAgICB9LFxuICAgIGNoaWxkOiB7XG4gICAgICBlbGVtZW50OiAnaW1nJyxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgc3JjOiBJY29uTWVudSxcbiAgICAgICAgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgJy4uLy4uL3N0eWxlcy9uYXZiYXIuY3NzJztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXIuY29uZmlnJztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FjaGVET00obmF2RWxlbWVudCkge1xuICAgIHRoaXMubmF2YmFyID0gbmF2RWxlbWVudDtcbiAgICB0aGlzLm5hdlJpZ2h0ID0gbmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X3JpZ2h0Jyk7XG4gICAgdGhpcy5uYXZMaW5rcyA9IG5hdkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdl9pdGVtJyk7XG4gICAgdGhpcy5uYXZCdG4gPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfYnRuJyk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy50b2dnbGVOYXYgPSB0aGlzLnRvZ2dsZU5hdi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVOYXYpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIGNvbnN0IG5hdkNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5hdkVsZW1lbnQuaWQgPSAnbmF2YmFyJztcbiAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICBPYmplY3Qua2V5cyhuYXZiYXIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmF2YmFyW2tleV0pKSB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoa2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2xlZnQnKSA/ICduYXZfbGVmdCcgOiAnbmF2X3JpZ2h0Jyk7XG4gICAgICAgIG5hdmJhcltrZXldLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZXMoaXRlbS5hdHRyaWJ1dGVzKTtcblxuICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IGNyZWF0ZUVsZW1lbnQoY2hpbGQuZWxlbWVudCk7XG4gICAgICAgICAgICAgIGNoaWxkTm9kZS5zZXRBdHRyaWJ1dGVzKGNoaWxkLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5hdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUVsZW1lbnQobmF2YmFyW2tleV0uZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGNyZWF0ZUVsZW1lbnQobmF2YmFyW2tleV0uY2hpbGQuZWxlbWVudCk7XG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGVzKG5hdmJhcltrZXldLmF0dHJpYnV0ZXMpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlcyhuYXZiYXJba2V5XS5jaGlsZC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIG5hdkNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZDb250YWluZXIpO1xuICAgIHRoaXMuY2FjaGVET00obmF2RWxlbWVudCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gbmF2RWxlbWVudDtcbiAgfSxcbiAgdG9nZ2xlTmF2KCkge1xuICAgIGlmICh0aGlzLm5hdlJpZ2h0LmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XG4gICAgICB0aGlzLm5hdlJpZ2h0LmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZSaWdodC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgfVxuICB9LFxufTtcbiIsIi8vIGZvcmVjYXN0ZGF5LmRhdGUgfFxuLy8gKGZvcmVjYXN0ZGF5LmRheS5tYXh0ZW1wX2YgLyBmb3JlY2FzdGRheS5kYXkubWludGVtcF9mKVxuLy8gZm9yZWNhc3RkYXkuZGF5LmNvbmRpdGlvblxuLy8gZm9yZWNhc3RkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluIHxcbi8vIHdpbmRcbi8vIE5XLCBOTlcsIE4sIE5ORSwgTkVcbi8vIEVORSwgRSwgRVNFXG4vLyBTRSwgU1NFLCBTLCBTU1csIFNXXG4vLyBXU1csIFcsIFdOV1xuY29uc3QgdW5pdFN5c3RlbXMgPSB7XG4gIGltcGVyaWFsOiBbXSxcbiAgbWV0cmljOiBbXSxcbn07XG5cbmNvbnN0IGZvcmVjYXN0ID0ge1xuICBjdXJyZW50OiB7XG4gICAgbGFzdF91cGRhdGVkOiBudWxsLFxuICB9LFxuICBsb2NhdGlvbjoge1xuICAgIG5hbWU6IG51bGwsXG4gIH0sXG4gIGZvcmVjYXN0ZGF5OiBbXSxcbn07XG5cbmNvbnN0IGZvcmVjYXN0Q29udHJvbGxlciA9IHtcbiAgaW5pdCh1bml0U3lzdGVtLCB3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLnVuaXRTeXN0ZW0gPSB1bml0U3lzdGVtO1xuICAgIHRoaXMuZmluZE9iamVjdHMgPSB0aGlzLmZpbmRPYmplY3RzLmJpbmQodGhpcyk7XG4gICAgT2JqZWN0LmtleXMoZm9yZWNhc3QpLmZvckVhY2godGhpcy5maW5kT2JqZWN0cyk7XG4gIH0sXG4gIHNldFZhbHVlcyhrZXksIHN1YktleSwgaXRlbSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBmb3JlY2FzdFtrZXldLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcmVjYXN0W2tleV1bc3ViS2V5XSA9IHRoaXMud2VhdGhlckRhdGFba2V5XVtzdWJLZXldO1xuICAgIH1cbiAgfSxcbiAgZmluZE9iamVjdHMoa2V5KSB7XG4gICAgaWYgKCEoZm9yZWNhc3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgT2JqZWN0LmtleXMoZm9yZWNhc3Rba2V5XSkuZm9yRWFjaCgoc3ViS2V5KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWVzKGtleSwgc3ViS2V5KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndlYXRoZXJEYXRhLmZvcmVjYXN0W2tleV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB0aGlzLnNldFZhbHVlcyhrZXksIG51bGwsIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHVuaXRTeXN0ZW0sIHdlYXRoZXJEYXRhKSB7XG4gICAgZm9yZWNhc3RDb250cm9sbGVyLmluaXQodW5pdFN5c3RlbSwgd2VhdGhlckRhdGEpO1xuICAgIHRoaXMuc2V0UHJvcGVydGllcygpO1xuICB9LFxuICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyAuLi5mb3JlY2FzdCB9LCB7IGxvY2F0aW9uOiBmb3JlY2FzdENvbnRyb2xsZXIud2VhdGhlckRhdGEubG9jYXRpb24gfSk7XG4gIH0sXG59O1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBmb3JlY2FzdCBmcm9tICcuL2ZvcmVjYXN0LmNvbmZpZyc7XG5pbXBvcnQgY3JlYXRlQ29udGVudFJvd3MgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVDb250ZW50Um93cyc7XG5cbmNvbnN0IGZvcmVjYXN0QnVpbGRlciA9IHtcbiAgaW5pdCgpIHt9LFxuICBjYWNoZURPTSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGVET00oKSBydW5uaW5nIGZyb20gZm9yZWNhc3QuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBmb3JlY2FzdC5qcycpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcigpIHJ1bm5pbmcgZnJvbSBmb3JlY2FzdC5qcycpO1xuICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0KTtcbiAgICBjb25zdCBmb3JlY2FzdFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgY29uc3QgZm9yZWNhc3RTZWN0aW9uSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uLmlkID0gJ2ZvcmVjYXN0JztcbiAgICBmb3JlY2FzdFNlY3Rpb25IZWFkaW5nLnNldEF0dHJpYnV0ZXMoeyB0ZXh0Q29udGVudDogJzMgRGF5IFdlYXRoZXInIH0pO1xuICAgIGZvcmVjYXN0U2VjdGlvbi5hcHBlbmRDaGlsZChmb3JlY2FzdFNlY3Rpb25IZWFkaW5nKTtcblxuICAgIC8vIHRlbXBvcmFyeVxuICAgIGNvbnN0IGZvcmVjYXN0Q29udGVudCA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBmb3JlY2FzdENvbnRlbnQuaWQgPSAnZm9yZWNhc3RfY29udGVudCc7XG5cbiAgICBjb25zdCBmb3JlY2FzdENvbnRlbnRMaXN0ID0gY3JlYXRlRWxlbWVudCgnb2wnKTtcbiAgICBmb3JlY2FzdC5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICAgIGZvcmVjYXN0Q29udGVudExpc3QuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZUNvbnRlbnRSb3dzKFxuICAgICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgICAgW3sgY2xhc3M6ICdmb3JlY2FzdF9kYXknIH0sIHsgY2xhc3M6ICdmb3JlY2FzdF9kYXlfaXRlbScgfV0sXG4gICAgICAgICAgYCR7ZGF5LmRheS5tYXh0ZW1wX2Z9wrAvJHtkYXkuZGF5Lm1pbnRlbXBfZn3CsGAsXG4gICAgICAgICAgZGF5LmRheS5jb25kaXRpb24udGV4dCxcbiAgICAgICAgICBgJHtkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICBmb3JlY2FzdENvbnRlbnQuYXBwZW5kQ2hpbGQoZm9yZWNhc3RDb250ZW50TGlzdCk7XG4gICAgZm9yZWNhc3RTZWN0aW9uLmFwcGVuZENoaWxkKGZvcmVjYXN0Q29udGVudCk7XG4gICAgLy8gdGVtcG9yYXJ5XG5cbiAgICByZXR1cm4gZm9yZWNhc3RTZWN0aW9uO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JlY2FzdCh3ZWF0aGVyRGF0YSkge1xuICBmb3JlY2FzdC5pbml0KCdpbXBlcmlhbCcsIHdlYXRoZXJEYXRhKTtcbiAgcmV0dXJuIGZvcmVjYXN0QnVpbGRlci5yZW5kZXIoKTtcbn1cblxuLy8gZGF0ZSB8IHRlbXAgaGlnaCAvIGxvdyB8IGNvbmRpdGlvbiB8IHByZWNpcHRhdGlvbiAlIHwgd2luZFxuLy8gZXhhbXBsZVxuLy8gV2VkIDIwIHwgNjDCsCAvIDQ3wrAgfCBTdW5ueSB8IDElIHwgTk5FIDYgbXBoXG4iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcblxuY29uc3QgaWNvbnMgPSBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi8uLi8uLi9hc3NldHMvaWNvbnMnLCBmYWxzZSwgL1xcLnN2ZyQvKSk7XG5cbmNvbnN0IHVuaXRTeXN0ZW1zID0ge1xuICBpbXBlcmlhbDoge1xuICAgIGN1cnJlbnQ6IHtcbiAgICAgIGxhc3RfdXBkYXRlZDogbnVsbCxcbiAgICB9LFxuICAgIC8vIGxvY2F0aW9uOiB7XG4gICAgLy8gICBuYW1lOiBudWxsLFxuICAgIC8vIH0sXG4gICAgZm9yZWNhc3RkYXk6IFtdLFxuICB9LFxufTtcblxuY29uc3QgaG91cmx5Q29udHJvbGxlciA9IHtcbiAgaW5pdCh1bml0U3lzdGVtLCB3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLnVuaXRTeXN0ZW0gPSB1bml0U3lzdGVtO1xuICAgIGlmICh1bml0U3lzdGVtc1t0aGlzLnVuaXRTeXN0ZW1dLmZvcmVjYXN0ZGF5Lmxlbmd0aCA+IDApIHtcbiAgICAgIHVuaXRTeXN0ZW1zW3RoaXMudW5pdFN5c3RlbV0uZm9yZWNhc3RkYXkgPSBbXTtcbiAgICB9XG4gICAgT2JqZWN0LmVudHJpZXModW5pdFN5c3RlbXNbdGhpcy51bml0U3lzdGVtXSkuZm9yRWFjaCgoW2tleSwgb2JqXSkgPT4ge1xuICAgICAgdGhpcy5maW5kT2JqZWN0cyhrZXksIG9iaik7XG4gICAgICAvLyB0aGlzLnNldEljb25zKGtleSwgb2JqKTtcbiAgICB9KTtcbiAgfSxcbiAgc2V0SWNvbnMoa2V5LCBvYmopIHtcbiAgICBjb25zdCBvYmpJY29uID0ge1xuICAgICAgaWNvbjogaWNvbnMuZmlsZXNbXG4gICAgICAgIE9iamVjdC5rZXlzKGljb25zLmZpbGVzKS5maW5kKFxuICAgICAgICAgIChpY29uS2V5KSA9PiBpY29uS2V5LmluY2x1ZGVzKGtleSkgfHwgaWNvbktleS5pbmNsdWRlcyhvYmoudGV4dCksXG4gICAgICAgIClcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIGlmIChvYmpJY29uLmljb24pIE9iamVjdC5hc3NpZ24ob2JqLCBvYmpJY29uKTtcbiAgfSxcbiAgc2V0VmFsdWVzKGtleSwgb2JqKSB7XG4gICAgY29uc3QgZGF0ZTEgPSBuZXcgRGF0ZSh1bml0U3lzdGVtc1t0aGlzLnVuaXRTeXN0ZW1dLmN1cnJlbnQubGFzdF91cGRhdGVkKTtcbiAgICBjb25zdCBkYXRlMiA9IG5ldyBEYXRlKG9iai50aW1lKTtcbiAgICBpZiAoZGF0ZTEuZ2V0VGltZSgpIDwgZGF0ZTIuZ2V0VGltZSgpKSB7XG4gICAgICBjb25zdCBvYmpUZW1wID0ge1xuICAgICAgICB0aW1lOiBvYmoudGltZSxcbiAgICAgICAgdGVtcF9mOiB7XG4gICAgICAgICAgdW5pdDogJ8KwJyxcbiAgICAgICAgICB2YWx1ZTogb2JqLnRlbXBfZixcbiAgICAgICAgICBzZXRUZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjb25kaXRpb246IHtcbiAgICAgICAgICBpY29uOiBvYmouY29uZGl0aW9uLmljb24sXG4gICAgICAgICAgdGV4dDogb2JqLmNvbmRpdGlvbi50ZXh0LFxuICAgICAgICB9LFxuICAgICAgICBjaGFuY2Vfb2ZfcmFpbjoge1xuICAgICAgICAgIGljb246IG51bGwsXG4gICAgICAgICAgdW5pdDogJyUnLFxuICAgICAgICAgIHZhbHVlOiBvYmouY2hhbmNlX29mX3JhaW4sXG4gICAgICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSR7dGhpcy51bml0fWA7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgd2luZDoge1xuICAgICAgICAgIGljb246IG51bGwsXG4gICAgICAgICAgd2luZF9kaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiBvYmoud2luZF9kaXIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB3aW5kX21waDoge1xuICAgICAgICAgICAgdW5pdDogJ21waCcsXG4gICAgICAgICAgICB2YWx1ZTogTWF0aC5yb3VuZChvYmoud2luZF9tcGgpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLndpbmRfZGlyLnZhbHVlfSAke3RoaXMud2luZF9tcGgudmFsdWV9ICR7dGhpcy53aW5kX21waC51bml0fWA7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBPYmplY3QuZW50cmllcyhvYmpUZW1wKS5mb3JFYWNoKChbb2JqVGVtcEtleSwgb2JqUHJvcF0pID0+XG4gICAgICAgIHRoaXMuc2V0SWNvbnMob2JqVGVtcEtleSwgb2JqUHJvcCksXG4gICAgICApO1xuXG4gICAgICB1bml0U3lzdGVtc1t0aGlzLnVuaXRTeXN0ZW1dW2tleV0ucHVzaChvYmpUZW1wKTtcbiAgICB9XG4gIH0sXG4gIGZpbmRPYmplY3RzKGtleSwgb2JqKSB7XG4gICAgaWYgKCEob2JqIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKHN1YktleSkgPT4ge1xuICAgICAgICBjb25zdCBvYmpDb3B5ID0gb2JqO1xuICAgICAgICBvYmpDb3B5W3N1YktleV0gPSB0aGlzLndlYXRoZXJEYXRhW2tleV1bc3ViS2V5XTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndlYXRoZXJEYXRhLmZvcmVjYXN0W2tleV0uZm9yRWFjaCgoZGF5LCBpKSA9PiB7XG4gICAgICAgIGRheS5ob3VyLmZvckVhY2goKGhvdXJJdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRWYWx1ZXMoa2V5LCBob3VySXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLndlYXRoZXJEYXRhLmZvcmVjYXN0W2tleV0pO1xuICAgICAgY29uc29sZS5sb2codW5pdFN5c3RlbXNbdGhpcy51bml0U3lzdGVtXVtrZXldKTtcbiAgICB9XG5cbiAgICAvLyBPYmplY3Qua2V5cyhob3VybHkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIC8vICAgaWYgKCEoaG91cmx5W2tleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAvLyAgICAgT2JqZWN0LmtleXMoaG91cmx5W2tleV0pLmZvckVhY2goKHN1YmtleSkgPT4ge1xuICAgIC8vICAgICAgIGhvdXJseVtrZXldW3N1YmtleV0gPSB3ZWF0aGVyRGF0YVtrZXldW3N1YmtleV07XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgd2VhdGhlckRhdGEuZm9yZWNhc3Rba2V5XS5mb3JFYWNoKChkYXksIGkpID0+IHtcbiAgICAvLyAgICAgICBjb25zdCBkYXRlMSA9IG5ldyBEYXRlKGhvdXJseS5jdXJyZW50Lmxhc3RfdXBkYXRlZCk7XG4gICAgLy8gICAgICAgaG91cmx5W2tleV0gPSB3ZWF0aGVyRGF0YS5mb3JlY2FzdFtrZXldO1xuICAgIC8vICAgICAgIGNvbnN0IG5ld0hvdXJzID0gZGF5LmhvdXIuZmlsdGVyKChob3VyKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCBkYXRlMiA9IG5ldyBEYXRlKGhvdXIudGltZSk7XG4gICAgLy8gICAgICAgICByZXR1cm4gZGF0ZTEuZ2V0VGltZSgpIDwgZGF0ZTIuZ2V0VGltZSgpO1xuICAgIC8vICAgICAgIH0pO1xuICAgIC8vICAgICAgIGhvdXJseVtrZXldW2ldLmhvdXIgPSBuZXdIb3VycztcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQodW5pdFN5c3RlbSwgd2VhdGhlckRhdGEpIHtcbiAgICBob3VybHlDb250cm9sbGVyLmluaXQodW5pdFN5c3RlbSwgd2VhdGhlckRhdGEpO1xuICAgIHRoaXMuc2V0UHJvcGVydGllcygpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9LFxuICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICB0aGlzLFxuICAgICAgeyBkYXRhOiB1bml0U3lzdGVtc1tob3VybHlDb250cm9sbGVyLnVuaXRTeXN0ZW1dIH0sXG4gICAgICB7IGxvY2F0aW9uOiBob3VybHlDb250cm9sbGVyLndlYXRoZXJEYXRhLmxvY2F0aW9uIH0sXG4gICAgKTtcbiAgfSxcbn07XG4vLyBEYXRlXG4vLyB0aW1lIHwgdGVtcCB8IGNvbmRpdGlvbiB8IHByZWNpcHRhdGlvbiAlIHwgd2luZFxuLy8gZXhhbXBsZVxuLy8gMTozMCBwbSB8IDQ3wrAgfCBTdW5ueSB8IDElIHwgTiA2IG1waFxuXG4vLyBjdXJyZW50Lmxhc3RfdXBkYXRlZFxuLy8gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci50aW1lIHxcbi8vICAgZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci50ZW1wX2YgfFxuLy8gICBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLmNvbmRpdGlvbi50ZXh0IHxcbi8vICAgZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci5jaGFuY2Vfb2ZfcmFpbiB8XG4vLyAgIChmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLndpbmRfZGlyICsgZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ci53aW5kX21waClcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgaG91cmx5IGZyb20gJy4vaG91cmx5LmNvbmZpZyc7XG5pbXBvcnQgZm9ybWF0RGF0ZSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2Zvcm1hdERhdGUnO1xuaW1wb3J0IGZvcm1hdFRpbWUgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9mb3JtYXRUaW1lJztcbmltcG9ydCBjcmVhdGVDb250ZW50Um93cyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUNvbnRlbnRSb3dzJztcblxuY29uc3QgaG91cmx5QnVpbGRlciA9IHtcbiAgaW5pdCh3ZWF0aGVyRGF0YSkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSBob3VybHkuanMnKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICBjb25zb2xlLmxvZygnYmluZEV2ZW50cygpIHJ1bm5pbmcgZnJvbSBob3VybHkuanMnKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXIoKSBydW5uaW5nIGZyb20gaG91cmx5LmpzJyk7XG4gICAgY29uc29sZS5sb2coaG91cmx5KTtcbiAgICBjb25zdCBob3VybHlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IGhvdXJseVNlY3Rpb25IZWFkaW5nID0gY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBob3VybHlTZWN0aW9uLmlkID0gJ2hvdXJseSc7XG4gICAgaG91cmx5U2VjdGlvbkhlYWRpbmcudGV4dENvbnRlbnQgPSAnSG91cmx5IHdlYXRoZXInO1xuICAgIGhvdXJseVNlY3Rpb24uYXBwZW5kQ2hpbGQoaG91cmx5U2VjdGlvbkhlYWRpbmcpO1xuXG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgY29uc3QgaG91cmx5Q29udGVudCA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBob3VybHlDb250ZW50LmlkID0gJ2hvdXJseV9jb250ZW50JztcblxuICAgIC8vIGhvdXJseS5kYXRhLmZvcmVjYXN0ZGF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgIC8vICAgY29uc3QgaG91cmx5Q29udGVudExpc3QgPSBjcmVhdGVFbGVtZW50KCdvbCcpO1xuICAgIC8vICAgY29uc3QgaG91cmx5Q29udGVudEhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIC8vICAgaG91cmx5Q29udGVudExpc3QuY2xhc3NOYW1lID0gJ2RheSc7XG4gICAgLy8gICBob3VybHlDb250ZW50SGVhZGluZy50ZXh0Q29udGVudCA9IGZvcm1hdERhdGUoZGF5LmRhdGUpO1xuICAgIC8vICAgaG91cmx5Q29udGVudExpc3QuYXBwZW5kQ2hpbGQoaG91cmx5Q29udGVudEhlYWRpbmcpO1xuICAgIC8vICAgZGF5LmhvdXIuZm9yRWFjaCgoaG91cikgPT4ge1xuICAgIC8vICAgICBob3VybHlDb250ZW50TGlzdC5hcHBlbmRDaGlsZChcbiAgICAvLyAgICAgICBjcmVhdGVDb250ZW50Um93cyhcbiAgICAvLyAgICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgLy8gICAgICAgICBbeyBjbGFzczogJ2hvdXInIH0sIHsgY2xhc3M6ICdob3VybHlfaXRlbScgfV0sXG4gICAgLy8gICAgICAgICBmb3JtYXRUaW1lKGhvdXIudGltZS5zcGxpdCgnICcpWzFdKSxcbiAgICAvLyAgICAgICAgIGAke01hdGgucm91bmQoaG91ci50ZW1wX2YpfcKwYCxcbiAgICAvLyAgICAgICAgIGhvdXIuY29uZGl0aW9uLmljb24sXG4gICAgLy8gICAgICAgICBob3VyLmNvbmRpdGlvbi50ZXh0LFxuICAgIC8vICAgICAgICAgYCR7aG91ci5jaGFuY2Vfb2ZfcmFpbn0lYCxcbiAgICAvLyAgICAgICAgIGAke2hvdXIud2luZF9kaXJ9ICR7TWF0aC5yb3VuZChob3VyLndpbmRfbXBoKX0gbXBoYCxcbiAgICAvLyAgICAgICApLFxuICAgIC8vICAgICApO1xuICAgIC8vICAgfSk7XG4gICAgLy8gICBob3VybHlDb250ZW50LmFwcGVuZENoaWxkKGhvdXJseUNvbnRlbnRMaXN0KTtcbiAgICAvLyB9KTtcblxuICAgIGhvdXJseVNlY3Rpb24uYXBwZW5kQ2hpbGQoaG91cmx5Q29udGVudCk7XG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgcmV0dXJuIGhvdXJseVNlY3Rpb247XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhvdXJseSh3ZWF0aGVyRGF0YSkge1xuICBob3VybHkuaW5pdCgnaW1wZXJpYWwnLCB3ZWF0aGVyRGF0YSk7XG4gIHJldHVybiBob3VybHlCdWlsZGVyLnJlbmRlcigpO1xufVxuXG4vLyBEYXRlXG4vLyB0aW1lIHwgdGVtcCB8IGNvbmRpdGlvbiB8IHByZWNpcHRhdGlvbiAlIHwgd2luZFxuLy8gZXhhbXBsZVxuLy8gMTozMCBwbSB8IDQ3wrAgfCBTdW5ueSB8IDElIHwgTiA2IG1waFxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBidWlsZFRhYnNOYXZiYXIgZnJvbSAnLi90YWJzX25hdmJhci90YWJzX25hdmJhcic7XG5pbXBvcnQgYnVpbGRUb2RheSBmcm9tICcuL3RvZGF5L3RvZGF5JztcbmltcG9ydCBidWlsZEhvdXJseSBmcm9tICcuL2hvdXJseS9ob3VybHknO1xuaW1wb3J0IGJ1aWxkRm9yZWNhc3QgZnJvbSAnLi9mb3JlY2FzdC9mb3JlY2FzdCc7XG5cbmNvbnN0IGJ1aWxkID0ge1xuICB0YWJzTmF2YmFyOiBidWlsZFRhYnNOYXZiYXIsXG4gIHRvZGF5OiBidWlsZFRvZGF5LFxuICBob3VybHk6IGJ1aWxkSG91cmx5LFxuICBmb3JlY2FzdDogYnVpbGRGb3JlY2FzdCxcbn07XG5cbmNvbnN0IHRhYnNCdWlsZGVyID0ge1xuICBpbml0KHdlYXRoZXJEYXRhKSB7XG4gICAgdGhpcy5zZXRXZWF0aGVyKHdlYXRoZXJEYXRhKTtcbiAgfSxcbiAgc2V0V2VhdGhlcih3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgfSxcbiAgY2FjaGVET00odGFic1NlY3Rpb24pIHtcbiAgICB0aGlzLnRhYnNTZWN0aW9uID0gdGFic1NlY3Rpb247XG4gICAgdGhpcy50YWJzTGlzdCA9IHRhYnNTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX2xpc3RfaXRlbSA+IGEnKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRhYnNTZWN0aW9uKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRhYnNMaXN0KTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN3aXRjaFRhYiA9IHRoaXMuc3dpdGNoVGFiLmJpbmQodGhpcyk7XG4gICAgdGhpcy50YWJzTGlzdC5mb3JFYWNoKCh0YWIpID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3dpdGNoVGFiKSk7XG4gIH0sXG4gIHJlbmRlcihrZXkpIHtcbiAgICBsZXQgY29udGVudDtcbiAgICBpZiAoIWtleSkge1xuICAgICAgLy8gaWYgbm8ga2V5XG4gICAgICBjb250ZW50ID0gYnVpbGQudG9kYXkodGhpcy53ZWF0aGVyRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKHRoaXMud2VhdGhlckRhdGEpO1xuICAgICAgdGhpcy50YWJzU2VjdGlvbi5sYXN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xuICAgIHRoaXMudGFic1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIHN3aXRjaFRhYihlKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWU6IGVsZW1lbnRDbGFzc05hbWUgfSA9IGUuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCByZW5kZXJLZXkgPSBlbGVtZW50Q2xhc3NOYW1lO1xuICAgIHRoaXMucmVuZGVyKHJlbmRlcktleSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRhYnMod2VhdGhlckRhdGEpIHtcbiAgdGFic0J1aWxkZXIuaW5pdCh3ZWF0aGVyRGF0YSk7XG4gIGNvbnN0IHRhYnNTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBjb25zdCB0YWJzSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIHRhYnNTZWN0aW9uLmlkID0gJ3RhYnMnO1xuICB0YWJzSGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6ICdUQUJTJyB9KTtcblxuICB0YWJzU2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJzSGVhZGluZyk7XG4gIHRhYnNTZWN0aW9uLmFwcGVuZENoaWxkKGJ1aWxkLnRhYnNOYXZiYXIoKSk7XG4gIHRhYnNCdWlsZGVyLmNhY2hlRE9NKHRhYnNTZWN0aW9uKTtcbiAgdGFic0J1aWxkZXIucmVuZGVyKCk7XG4gIHRhYnNCdWlsZGVyLmJpbmRFdmVudHMoKTtcbiAgcmV0dXJuIHRhYnNTZWN0aW9uO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICd0b2RheScsXG4gICAgICB0ZXh0Q29udGVudDogJ1RvZGF5JyxcbiAgICAgIGhyZWY6ICcjJyxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6ICdob3VybHknLFxuICAgICAgdGV4dENvbnRlbnQ6ICdIb3VybHknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogJ2ZvcmVjYXN0JyxcbiAgICAgIHRleHRDb250ZW50OiAnMy1EYXknLFxuICAgICAgaHJlZjogJyMnLFxuICAgIH0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9jcmVhdGVFbGVtZW50JztcbmltcG9ydCB0YWJzIGZyb20gJy4vdGFic19uYXZiYXIuY29uZmlnJztcblxuY29uc3QgdGFic05hdmJhckJ1aWxkZXIgPSB7XG4gIGluaXQoKSB7fSxcbiAgY2FjaGVET00oKSB7fSxcbiAgYmluZEV2ZW50cygpIHt9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgdGFic05hdmJhciA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBjb25zdCB0YWJzTGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGFic05hdmJhci5pZCA9ICd0YWJzX25hdmJhcic7XG4gICAgT2JqZWN0LnZhbHVlcyh0YWJzKS5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgIGNvbnN0IHRhYnNMaXN0SXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBjb25zdCB0YWJzTmF2QW5jaG9yID0gY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdGFic0xpc3RJdGVtLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3RhYnNfbGlzdF9pdGVtJyB9KTtcbiAgICAgIHRhYnNOYXZBbmNob3Iuc2V0QXR0cmlidXRlcyh0YWIuYXR0cmlidXRlcyk7XG5cbiAgICAgIHRhYnNMaXN0SXRlbS5hcHBlbmRDaGlsZCh0YWJzTmF2QW5jaG9yKTtcbiAgICAgIHRhYnNMaXN0LmFwcGVuZENoaWxkKHRhYnNMaXN0SXRlbSk7XG4gICAgfSk7XG5cbiAgICB0YWJzTmF2YmFyLmFwcGVuZENoaWxkKHRhYnNMaXN0KTtcbiAgICByZXR1cm4gdGFic05hdmJhcjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVGFic05hdmJhcigpIHtcbiAgcmV0dXJuIHRhYnNOYXZiYXJCdWlsZGVyLnJlbmRlcigpO1xufVxuIiwiLy8gY3VycmVudC50ZW1wX2Zcbi8vIGN1cnJlbnQuZmVlbHNsaWtlX2Zcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Zcbi8vIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Zcbi8vIGN1cnJlbnQuaHVtaWRpdHlcbi8vIGN1cnJlbnQucHJlc3N1cmVfaW5cbi8vIGN1cnJlbnQudmlzX21pbGVzXG4vLyBjdXJyZW50LndpbmRfbXBoXG4vLyBjdXJyZW50LndpbmRfZGlyXG5pbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvaW1wb3J0QWxsJztcblxuY29uc3QgaWNvbnMgPSBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi8uLi8uLi9hc3NldHMvaWNvbnMnLCBmYWxzZSwgL1xcLnN2ZyQvKSk7XG5jb25zdCB1bml0U3lzdGVtcyA9IHtcbiAgaW1wZXJpYWw6IHtcbiAgICBjb25kaXRpb246IHtcbiAgICAgIHNldFRleHQoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnRleHR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0ZW1wX2Y6IHtcbiAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICAvLyB0ZXh0OiAndGVtcGVyYXR1cmUnLFxuICAgIH0sXG4gICAgZmVlbHNsaWtlX2Y6IHtcbiAgICAgIHVuaXQ6ICfCsCcsXG4gICAgICB0ZXh0OiAnZmVlbHMgbGlrZScsXG4gICAgfSxcbiAgICBtaW5tYXh0ZW1wOiB7XG4gICAgICBtYXh0ZW1wX2Y6IHtcbiAgICAgICAgdW5pdDogJ8KwJyxcbiAgICAgICAgdGV4dDogJ2hpZ2gnLFxuICAgICAgfSxcbiAgICAgIG1pbnRlbXBfZjoge1xuICAgICAgICB1bml0OiAnwrAnLFxuICAgICAgICB0ZXh0OiAnbG93JyxcbiAgICAgIH0sXG4gICAgICBzZXRMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubWF4dGVtcF9mLnRleHR9IC8gJHt0aGlzLm1pbnRlbXBfZi50ZXh0fWA7XG4gICAgICB9LFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubWF4dGVtcF9mLnZhbHVlfcKwIC8gJHt0aGlzLm1pbnRlbXBfZi52YWx1ZX3CsGA7XG4gICAgICB9LFxuICAgIH0sXG4gICAgaHVtaWRpdHk6IHtcbiAgICAgIHRleHQ6ICdodW1pZGl0eScsXG4gICAgICBodW1pZGl0eToge1xuICAgICAgICB1bml0OiAnJScsXG4gICAgICB9LFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaHVtaWRpdHkudmFsdWV9JHt0aGlzLmh1bWlkaXR5LnVuaXR9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwcmVzc3VyZV9pbjoge1xuICAgICAgdW5pdDogJyBpbicsXG4gICAgICB0ZXh0OiAncHJlc3N1cmUnLFxuICAgIH0sXG4gICAgdmlzX21pbGVzOiB7XG4gICAgICB1bml0OiAnIG1pJyxcbiAgICAgIHRleHQ6ICd2aXNpYmlsaXR5JyxcbiAgICB9LFxuICAgIHdpbmQ6IHtcbiAgICAgIHRleHQ6ICd3aW5kJyxcbiAgICAgIHdpbmRfbXBoOiB7XG4gICAgICAgIHVuaXQ6ICcgbXBoJyxcbiAgICAgIH0sXG4gICAgICB3aW5kX2Rpcjoge30sXG4gICAgICBzZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy53aW5kX2Rpci52YWx1ZX0gJHt0aGlzLndpbmRfbXBoLnZhbHVlfSAke3RoaXMud2luZF9tcGgudW5pdH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHV2OiB7XG4gICAgICB0ZXh0OiAnVVYgSW5kZXgnLFxuICAgICAgc2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9IG9mIDExYDtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IHRvZGF5Q29udHJvbGxlciA9IHtcbiAgaW5pdCh1bml0U3lzdGVtLCB3ZWF0aGVyRGF0YSkge1xuICAgIHRoaXMud2VhdGhlckRhdGEgPSB3ZWF0aGVyRGF0YTtcbiAgICB0aGlzLnVuaXRTeXN0ZW0gPSB1bml0U3lzdGVtO1xuICAgIE9iamVjdC5lbnRyaWVzKHVuaXRTeXN0ZW1zW3RoaXMudW5pdFN5c3RlbV0pLmZvckVhY2goKFtrZXksIG9ial0pID0+IHtcbiAgICAgIHRoaXMuZmluZE9iamVjdHMoa2V5LCBvYmopO1xuICAgICAgdGhpcy5zZXRJY29ucyhrZXksIG9iaik7XG4gICAgfSk7XG4gIH0sXG4gIHNldEljb25zKGtleSwgb2JqKSB7XG4gICAgY29uc3Qgb2JqSWNvbiA9IHtcbiAgICAgIGljb246IGljb25zLmZpbGVzW1xuICAgICAgICBPYmplY3Qua2V5cyhpY29ucy5maWxlcykuZmluZChcbiAgICAgICAgICAoaWNvbktleSkgPT4gaWNvbktleS5pbmNsdWRlcyhrZXkpIHx8IGljb25LZXkuaW5jbHVkZXMob2JqLnRleHQpLFxuICAgICAgICApXG4gICAgICBdLFxuICAgIH07XG5cbiAgICBpZiAob2JqSWNvbi5pY29uKSBPYmplY3QuYXNzaWduKG9iaiwgb2JqSWNvbik7XG4gIH0sXG4gIHNldFZhbHVlcyhrZXksIG9iaiwgc3ViT2JqLCBzdWJLZXkpIHtcbiAgICAvLyBzZXRzIHZhbHVlIHByb3BlcnRpZXMgZnJvbSAndGhpcy53ZWF0aGVyRGF0YS4uLidcbiAgICAvLyB0byByZXNwZWN0aXZlICd1bml0U3lzdGVtc1t0aGlzLnVuaXRTeXN0ZW1dJyBvYmplY3RzXG4gICAgY29uc3Qgb2JqQ29weSA9ICFzdWJLZXkgPyBvYmogOiBzdWJPYmo7XG4gICAgY29uc3Qgb2JqRGF0YSA9IHt9O1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhQ3VycmVudCA9IHN1YktleVxuICAgICAgPyB0aGlzLndlYXRoZXJEYXRhLmN1cnJlbnRbc3ViS2V5XVxuICAgICAgOiB0aGlzLndlYXRoZXJEYXRhLmN1cnJlbnRba2V5XTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YUZvcmVjYXN0ID0gc3ViS2V5XG4gICAgICA/IHRoaXMud2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5W3N1YktleV1cbiAgICAgIDogdGhpcy53ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXlba2V5XTtcblxuICAgIGlmICghc3ViS2V5ICYmICFvYmpDb3B5LnNldFRleHQpIHtcbiAgICAgIGNvbnN0IG9ialRlbXAgPSB7XG4gICAgICAgIHNldFRleHQoKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JHt0aGlzLnVuaXR9YDtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBPYmplY3QuYXNzaWduKG9iakNvcHksIG9ialRlbXApO1xuICAgIH1cblxuICAgIGxldCB2YWx1ZSA9ICF3ZWF0aGVyRGF0YUN1cnJlbnQgPyB3ZWF0aGVyRGF0YUZvcmVjYXN0IDogd2VhdGhlckRhdGFDdXJyZW50O1xuICAgIHZhbHVlID0gTnVtYmVyLmlzTmFOKCt2YWx1ZSkgPyB2YWx1ZSA6IE1hdGgucm91bmQodmFsdWUpO1xuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgb2JqQ29weS52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKG9iakNvcHksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG9iakRhdGEsIHsgW2Ake2tleX1gXTogb2JqQ29weSB9KTtcbiAgfSxcbiAgZmluZE9iamVjdHMoa2V5LCBvYmopIHtcbiAgICAvLyBmaW5kcyBvYmplY3QgcHJvcGVydGllcyBvbmx5IGFuZCBjYWxscyAndGhpcy5zZXRWYWx1ZXMnXG4gICAgaWYgKE9iamVjdC52YWx1ZXMob2JqKS5maW5kKChpdGVtKSA9PiBpdGVtIGluc3RhbmNlb2YgT2JqZWN0ICYmICEoaXRlbSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKG9iaikuZm9yRWFjaCgoW3N1YktleSwgc3ViT2JqXSkgPT4ge1xuICAgICAgICBpZiAoc3ViT2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICEoc3ViT2JqIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgICAgdGhpcy5zZXRWYWx1ZXMoa2V5LCBvYmosIHN1Yk9iaiwgc3ViS2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0VmFsdWVzKGtleSwgb2JqKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQodW5pdFN5c3RlbSwgd2VhdGhlckRhdGEpIHtcbiAgICB0b2RheUNvbnRyb2xsZXIuaW5pdCh1bml0U3lzdGVtLCB3ZWF0aGVyRGF0YSk7XG4gICAgdGhpcy5zZXRQcm9wZXJ0aWVzKCk7XG4gIH0sXG4gIHNldFByb3BlcnRpZXMoKSB7XG4gICAgT2JqZWN0LmFzc2lnbihcbiAgICAgIHRoaXMsXG4gICAgICB7IGRhdGE6IHVuaXRTeXN0ZW1zW3RvZGF5Q29udHJvbGxlci51bml0U3lzdGVtXSB9LFxuICAgICAgeyBsb2NhdGlvbjogdG9kYXlDb250cm9sbGVyLndlYXRoZXJEYXRhLmxvY2F0aW9uIH0sXG4gICAgKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGNyZWF0ZUNvbnRlbnRSb3dzIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvY3JlYXRlQ29udGVudFJvd3MnO1xuaW1wb3J0IHRvZGF5IGZyb20gJy4vdG9kYXkuY29uZmlnJztcblxuY29uc3QgdG9kYXlCdWlsZGVyID0ge1xuICBpbml0KCkge30sXG4gIGNhY2hlRE9NKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZURPTSgpIHJ1bm5pbmcgZnJvbSB0b2RheS5qcycpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKCdiaW5kRXZlbnRzKCkgcnVubmluZyBmcm9tIHRvZGF5LmpzJyk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0b2RheSk7XG4gICAgY29uc3QgdG9kYXlTZWN0aW9uID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGNvbnN0IHRvZGF5U2VjdGlvbkhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHRvZGF5U2VjdGlvbi5pZCA9ICd0b2RheSc7XG4gICAgdG9kYXlTZWN0aW9uSGVhZGluZy5zZXRBdHRyaWJ1dGVzKHsgdGV4dENvbnRlbnQ6ICdUT0RBWScgfSk7XG4gICAgdG9kYXlTZWN0aW9uLmFwcGVuZENoaWxkKHRvZGF5U2VjdGlvbkhlYWRpbmcpO1xuXG4gICAgLy8gdGVtcG9yYXJ5XG4gICAgY29uc3QgdG9kYXlTdW1tYXJ5ID0gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHRvZGF5U3VtbWFyeS5pZCA9ICd0b2RheV9zdW1tYXJ5JztcblxuICAgIFsndGVtcF9mJywgJ2NvbmRpdGlvbiddLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRvZGF5U3VtbWFyeS5hcHBlbmRDaGlsZChcbiAgICAgICAgY3JlYXRlQ29udGVudFJvd3MoXG4gICAgICAgICAgY3JlYXRlRWxlbWVudCxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICB0b2RheS5kYXRhW2l0ZW1dLmljb24gPyB0b2RheS5kYXRhW2l0ZW1dLmljb24gOiBmYWxzZSxcbiAgICAgICAgICB0b2RheS5kYXRhW2l0ZW1dLnNldFRleHQoKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2RheURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgdG9kYXlEZXRhaWxzLmlkID0gJ3RvZGF5X2RldGFpbHMnO1xuICAgIE9iamVjdC5rZXlzKHRvZGF5LmRhdGEpLmZvckVhY2goKGtleSwgaSkgPT4ge1xuICAgICAgaWYgKGkgPiAxKSB7XG4gICAgICAgIHRvZGF5RGV0YWlscy5hcHBlbmRDaGlsZChcbiAgICAgICAgICBjcmVhdGVDb250ZW50Um93cyhcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgdG9kYXkuZGF0YVtrZXldLmljb24gPyB0b2RheS5kYXRhW2tleV0uaWNvbiA6IGZhbHNlLFxuICAgICAgICAgICAgdG9kYXkuZGF0YVtrZXldLnNldExhYmVsID8gdG9kYXkuZGF0YVtrZXldLnNldExhYmVsKCkgOiB0b2RheS5kYXRhW2tleV0udGV4dCxcbiAgICAgICAgICAgIHRvZGF5LmRhdGFba2V5XS5zZXRUZXh0KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRvZGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh0b2RheVN1bW1hcnkpO1xuICAgIHRvZGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh0b2RheURldGFpbHMpO1xuICAgIC8vIHRlbXBvcmFyeVxuXG4gICAgcmV0dXJuIHRvZGF5U2VjdGlvbjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVG9kYXkod2VhdGhlckRhdGEpIHtcbiAgdG9kYXkuaW5pdCgnaW1wZXJpYWwnLCB3ZWF0aGVyRGF0YSk7XG4gIHJldHVybiB0b2RheUJ1aWxkZXIucmVuZGVyKCk7XG59XG5cbi8vIEhpZ2ggLyBMb3dcbi8vIGV4LCA4N8KwIC8gNDDCsFxuXG4vLyBXaW5kXG4vLyBleCwgTk5XIDE0IG1waFxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XG4vLyB1c2UgV2VhdGhlckFQSVxuLy8gaHR0cHM6Ly93d3cud2VhdGhlcmFwaS5jb20vZG9jcy9cbi8vIGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT04NGFjNzMxMGU1NjQ0OGExODk2MjEyNzMxMjMwNjExJnE9TG9uZG9uXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIodmFsdWUpIHtcbiAgLy8gKm5vdGUsIHZhbHVlIGRvZXMgTk9UIG5lZWQgdG8gYmUgZXZhbHVhdGVkIGJlZm9yZSBmZXRjaFxuICAvLyBwb3N0YWwgY29kZSwgbnVtYmVyIG9yIHN0cmluZ1xuICAvLyBjaXR5LCB1cHBlcmNhc2Ugb3IgbG93ZXJjYXNlO1xuICBwdWJTdWIucHVibGlzaCgnc3dpdGNoQ29udGVudCcsICdsb2FkaW5nJyk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIC8vIHN0YXRpYyB2YWx1ZVxuICAgICAgLy8gJ2h0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9ODRhYzczMTBlNTY0NDhhMTg5NjIxMjczMTIzMDYxMSZxPUxvbmRvbiZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ubycsXG4gICAgICAvLyBkeW5hbWljIHZhbHVlXG4gICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9ODRhYzczMTBlNTY0NDhhMTg5NjIxMjczMTIzMDYxMSZxPSR7dmFsdWV9JmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vYCxcbiAgICAgIC8vIGVycm9yIHRlc3RcbiAgICAgIC8vIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzLmpzb24/a2V5PTg0YWM3MzEwZTU2NDQ4YTE4OTYyMTI3MzEyMzA2MTEmcT0ke3ZhbHVlfSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2AsXG4gICAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAvLyBwdWJTdWIucHVibGlzaCgnc2V0V2VhdGhlcicsIHdlYXRoZXJEYXRhKTtcbiAgICBwdWJTdWIucHVibGlzaChcbiAgICAgICdzd2l0Y2hDb250ZW50JyxcbiAgICAgICFyZXNwb25zZS5vayA/IE9iamVjdC5hc3NpZ24ocmVzcG9uc2UsIHdlYXRoZXJEYXRhKSA6IHdlYXRoZXJEYXRhLFxuICAgICk7XG4gICAgLy8gcHViU3ViLnB1Ymxpc2goJ3NldFdlYXRoZXInLCAhcmVzcG9uc2Uub2sgPyB3ZWF0aGVyRGF0YS5lcnJvciA6IHdlYXRoZXJEYXRhKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGUgJHtyZXNwb25zZS5zdGF0dXN9LCAke3dlYXRoZXJEYXRhLmVycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgLy8gY29kZSBiZWxvdyB0aGUgaWYgYmxvY2sgd2lsbCBvbmx5IHJ1biBpZiB0aGVyZSBhcmUgbm8gZXJyb3JzXG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuXG4gICAgLy8gcHViU3ViLnB1Ymxpc2goJ3NldFdlYXRoZXInLCB3ZWF0aGVyRGF0YSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH1cbn1cblxucHViU3ViLnN1YnNjcmliZSgnZ2V0V2VhdGhlcicsIGdldFdlYXRoZXIpO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBzdWJzY3JpYmVyczoge30sXG4gIHN1YnNjcmliZShzdWJzY3JpYmVyLCBmbikge1xuICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gPSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdIHx8IFtdO1xuICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0ucHVzaChmbik7XG4gIH0sXG4gIHVuc3Vic2NyaWJlKHN1YnNjcmliZXIsIGZuKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gPSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmZpbHRlcihcbiAgICAgICAgKGhhbmRsZXIpID0+IGhhbmRsZXIgIT09IGZuLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIHB1Ymxpc2goc3Vic2NyaWJlciwgLi4uZGF0YSkge1xuICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgIGZuKC4uLmRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRlbnRSb3dzKGZuLCBhdHRyaWJ1dGVzLCAuLi5hcmdzKSB7XG4gIGNvbnN0IGNvbnRhaW5lckF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzID8gYXR0cmlidXRlc1sxXSA6IGZhbHNlO1xuICBjb25zdCBpdGVtQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgPyBhdHRyaWJ1dGVzWzJdIDogZmFsc2U7XG5cbiAgY29uc3QgY29udGFpbmVyID0gZm4oJ3VsJyk7XG4gIGlmIChjb250YWluZXJBdHRyaWJ1dGVzKSB7XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZXMoY29udGFpbmVyQXR0cmlidXRlcyk7XG4gIH1cbiAgYXJncy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgLy8gL1xcLihzdmd8cG5nKSQvXG4gICAgLy8gY29uc29sZS5sb2coaXRlbS5zcGxpdCgvXFwuKHN2Z3xwbmcpJC8pKTtcblxuICAgIGlmIChpdGVtKSB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGZuKCdsaScpO1xuICAgICAgaWYgKGl0ZW1BdHRyaWJ1dGVzKSBpdGVtLnNldEF0dHJpYnV0ZXMoaXRlbUF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKC9cXC5bc3ZnfHBuZ117M30kLy50ZXN0KGl0ZW0pKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IGZuKCdpbWcnKTtcbiAgICAgICAgaWYgKC9cXC5bc3ZnXXszfSQvLnRlc3QoaXRlbSkpIGltZy5zZXRBdHRyaWJ1dGVzKHsgb25sb2FkOiAnU1ZHSW5qZWN0KHRoaXMpJyB9KTtcbiAgICAgICAgaW1nLnNyYyA9IGl0ZW07XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IGl0ZW07XG4gICAgICB9XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCJjb25zdCBzZXRFbGVtZW50U3RhdGUgPSAoKSA9PiAoe1xuICBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGlmIChrZXkgIT09ICd0ZXh0Q29udGVudCcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFRleHRDb250ZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgc2V0VGV4dENvbnRlbnQodGV4dCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxufSk7XG5cbmNvbnN0IGJ1aWxkRWxlbWVudCA9ICh0YWdOYW1lKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIHRhZ05hbWUsXG4gIH07XG5cbiAgcmV0dXJuIHsgLi4uc2V0RWxlbWVudFN0YXRlKHN0YXRlKSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gIGNvbnN0IGh0bWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgT2JqZWN0LmFzc2lnbihodG1sRWxlbWVudCwgYnVpbGRFbGVtZW50KGh0bWxFbGVtZW50KSk7XG5cbiAgcmV0dXJuIGh0bWxFbGVtZW50O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlU3RyaW5nKSB7XG4gIC8vIHRoaXMgcmV0dXJucyBhIGZvcm1hdCBbRGF5LCBNb250aCBEYXRlXVxuICAvLyBleDogV2VkbmVzZGF5LCBBcHJpbCAxNFxuICBjb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICBjb25zdCBtb250aHMgPSBbXG4gICAgJ0phbnVhcnknLFxuICAgICdGZWJydWFyeScsXG4gICAgJ01hcmNoJyxcbiAgICAnQXByaWwnLFxuICAgICdNYXknLFxuICAgICdKdW5lJyxcbiAgICAnSnVseScsXG4gICAgJ0F1Z3VzdCcsXG4gICAgJ1NlcHRlbWJlcicsXG4gICAgJ09jdG9iZXInLFxuICAgICdOb3ZlbWJlcicsXG4gICAgJ0RlY2VtYmVyJyxcbiAgXTtcblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG4gIHJldHVybiBgJHtkYXlzW2RhdGUuZ2V0RGF5KCldfSwgJHttb250aHNbZGF0ZS5nZXRNb250aCgpXX0gJHtkYXRlLmdldERhdGUoKX1gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lKSB7XG4gIC8vIHJldHVybnMgMTIgaG91ciB0aW1lIGZvcm1hdFxuICAvLyBleDogMjowMCBQTSBvciAxMDowMCBBTVxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoYDEyLTEyLTIwMDAgJHt0aW1lfWApO1xuICBjb25zdCB0aW1lUHJvcGVydGllcyA9IHtcbiAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgaG91cjEyOiB0cnVlLFxuICB9O1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XG4gIGNvbnN0IGZpbGVzID0ge307XG4gIGNvbnN0IGZpbGVzQXJyID0gW107XG4gIHIua2V5cygpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBmaWxlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgZmlsZXMsIGZpbGVzQXJyIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=