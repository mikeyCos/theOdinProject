(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

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



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf */ "./src/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
    font-family: 'Bebas Neue';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    /* custom variables */
    --text-color-primary: rgb(32, 32, 32);
    --priority-1-color: #ff3700;
    --priority-2-color: #ffa500;
    --priority-3-color: #1eff47;
    --priority-4-color: #b8b8b8;
}

body {
    min-height: 100vh;
}

#todo_app {
    min-height: inherit;
    display: grid;
    grid-template-rows: min-content 1fr;
}

#content {
    position: relative;
}

#content {
    display: grid;
}

.overlay_main_content {
    pointer-events: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
}

.overlay_main_content.dim {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
}

#main_content {
    flex: 1;
    padding: 5% 5% 5% 5%;
    display: grid;
}

#main_content > :first-child {
    display: grid;
    grid-auto-rows: min-content 1fr;
    justify-self: center;
    width: 100%;
}

/* general styles for similar elements existing on different modules */
button {
    display: flex;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
}

button:hover {
    cursor: pointer;
}

button:not(.btn_checkbox_task):not(.btn_date_task):hover {
    background-color: rgba(0, 0, 0, 0.1);
}

button > svg,
button > * > svg {
    height: auto;
    width: clamp(1rem, 2.5vw, 2rem);
}

dialog:not(#task_priorities) {
    margin: auto;
    min-width: 30vw;
    border-radius: 0.75rem;
    border: none;
}

dialog:not(#task_priorities)::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

.form_buttons {
    display: flex;
    justify-content: end;
    column-gap: 0.5rem;
}

.form_buttons > * {
    background-color: rgba(0 0, 0, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
}

.form_buttons > *:hover {
    color: rgb(255, 255, 255);
}

.form_buttons > *:active {
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.6);
}

@media screen and (min-width:768px) {
    #main_content {

    }

    #main_content > :first-child {
        width: 70%;
    }

    #content {
        position: static;
        display: flex;
    }


}`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;IACI,yBAAyB;IACzB,4CAA2D;AAC/D;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,qBAAqB;IACrB,qCAAqC;IACrC,2BAA2B;IAC3B,2BAA2B;IAC3B,2BAA2B;IAC3B,2BAA2B;AAC/B;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,oBAAoB;IACpB,eAAe;IACf,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,OAAO;IACP,oBAAoB;IACpB,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,oBAAoB;IACpB,WAAW;AACf;;AAEA,sEAAsE;AACtE;IACI,aAAa;IACb,uBAAuB;IACvB,YAAY;IACZ,qBAAqB;AACzB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;;IAEI,YAAY;IACZ,+BAA+B;AACnC;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,oBAAoB;IACpB,kBAAkB;AACtB;;AAEA;IACI,mCAAmC;IACnC,oBAAoB;IACpB,mBAAmB;AACvB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,8CAA8C;AAClD;;AAEA;IACI;;IAEA;;IAEA;QACI,UAAU;IACd;;IAEA;QACI,gBAAgB;QAChB,aAAa;IACjB;;;AAGJ","sourcesContent":["@font-face {\n    font-family: 'Bebas Neue';\n    src: url('./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf');\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n:root {\n    /* custom variables */\n    --text-color-primary: rgb(32, 32, 32);\n    --priority-1-color: #ff3700;\n    --priority-2-color: #ffa500;\n    --priority-3-color: #1eff47;\n    --priority-4-color: #b8b8b8;\n}\n\nbody {\n    min-height: 100vh;\n}\n\n#todo_app {\n    min-height: inherit;\n    display: grid;\n    grid-template-rows: min-content 1fr;\n}\n\n#content {\n    position: relative;\n}\n\n#content {\n    display: grid;\n}\n\n.overlay_main_content {\n    pointer-events: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    opacity: 0;\n    transition: opacity 200ms ease-in-out;\n}\n\n.overlay_main_content.dim {\n    opacity: 1;\n    transition: opacity 200ms ease-in-out;\n}\n\n#main_content {\n    flex: 1;\n    padding: 5% 5% 5% 5%;\n    display: grid;\n}\n\n#main_content > :first-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n    justify-self: center;\n    width: 100%;\n}\n\n/* general styles for similar elements existing on different modules */\nbutton {\n    display: flex;\n    background: transparent;\n    border: none;\n    border-radius: 0.5rem;\n}\n\nbutton:hover {\n    cursor: pointer;\n}\n\nbutton:not(.btn_checkbox_task):not(.btn_date_task):hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\n\nbutton > svg,\nbutton > * > svg {\n    height: auto;\n    width: clamp(1rem, 2.5vw, 2rem);\n}\n\ndialog:not(#task_priorities) {\n    margin: auto;\n    min-width: 30vw;\n    border-radius: 0.75rem;\n    border: none;\n}\n\ndialog:not(#task_priorities)::backdrop {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n.form_buttons {\n    display: flex;\n    justify-content: end;\n    column-gap: 0.5rem;\n}\n\n.form_buttons > * {\n    background-color: rgba(0 0, 0, 0.3);\n    padding: 0.5rem 1rem;\n    border-radius: 2rem;\n}\n\n.form_buttons > *:hover {\n    color: rgb(255, 255, 255);\n}\n\n.form_buttons > *:active {\n    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.6);\n}\n\n@media screen and (min-width:768px) {\n    #main_content {\n\n    }\n\n    #main_content > :first-child {\n        width: 70%;\n    }\n\n    #content {\n        position: static;\n        display: flex;\n    }\n\n\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `header {
    background-color: lightcoral;
}

header > #navbar {
    display: flex;
    justify-content: space-between;
    padding: 0.60rem 0.75rem;
}

header > #navbar > * > .container {
    display: flex;
    column-gap: 0.35rem;
}

header > #navbar > * > .container > * {
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
}

.input_search {
    width: 100%;
    border: none;
    padding-left: 0.5rem;
}

header > #navbar > * > .container > * > svg {
    height: auto;
    width: clamp(1.65rem, 4vw, 1.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;IACI,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,wBAAwB;AAC5B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,qBAAqB;AACzB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,oBAAoB;AACxB;;AAEA;IACI,YAAY;IACZ,kCAAkC;AACtC","sourcesContent":["header {\n    background-color: lightcoral;\n}\n\nheader > #navbar {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.60rem 0.75rem;\n}\n\nheader > #navbar > * > .container {\n    display: flex;\n    column-gap: 0.35rem;\n}\n\nheader > #navbar > * > .container > * {\n    display: flex;\n    align-items: center;\n    border-radius: 0.2rem;\n}\n\n.input_search {\n    width: 100%;\n    border: none;\n    padding-left: 0.5rem;\n}\n\nheader > #navbar > * > .container > * > svg {\n    height: auto;\n    width: clamp(1.65rem, 4vw, 1.5rem);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/projects.css ***!
  \***********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `/* styles for list of projects on the content section */
/* #main_content > div > div > .nav_projects > .btn_add_project {
    
} */

.projects >:last-child {
    display: grid;
    grid-auto-rows: min-content 1fr;
}

.projects >:last-child > .nav_projects {
    justify-self: end;
}

.projects >:last-child > .nav_projects > .btn_add_project {
    display: flex;
    align-items: center;
    justify-items: flex-start;
    min-width: 100%;
    padding: 0.5rem 1rem;
    column-gap: 0.25rem;
}`, "",{"version":3,"sources":["webpack://./src/styles/projects.css"],"names":[],"mappings":"AAAA,uDAAuD;AACvD;;GAEG;;AAEH;IACI,aAAa;IACb,+BAA+B;AACnC;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,yBAAyB;IACzB,eAAe;IACf,oBAAoB;IACpB,mBAAmB;AACvB","sourcesContent":["/* styles for list of projects on the content section */\n/* #main_content > div > div > .nav_projects > .btn_add_project {\n    \n} */\n\n.projects >:last-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n}\n\n.projects >:last-child > .nav_projects {\n    justify-self: end;\n}\n\n.projects >:last-child > .nav_projects > .btn_add_project {\n    display: flex;\n    align-items: center;\n    justify-items: flex-start;\n    min-width: 100%;\n    padding: 0.5rem 1rem;\n    column-gap: 0.25rem;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_form.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/projects_form.css ***!
  \****************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `#form_project > #form {
    padding: 1rem;
    /* display: grid;
    grid-template-areas: 
        'head head'
        'input input'
        '. buttons'
    ;
    position: relative;
    min-width: inherit;
    min-height: inherit;
    grid-auto-rows: min-content;
    grid-row-gap: 0.5rem; */
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

/* impacts form_item for tasks_form */
.form_item {
    grid-area: input;
    display: grid;
}

`, "",{"version":3,"sources":["webpack://./src/styles/projects_form.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb;;;;;;;;;;2BAUuB;IACvB,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA,qCAAqC;AACrC;IACI,gBAAgB;IAChB,aAAa;AACjB","sourcesContent":["#form_project > #form {\n    padding: 1rem;\n    /* display: grid;\n    grid-template-areas: \n        'head head'\n        'input input'\n        '. buttons'\n    ;\n    position: relative;\n    min-width: inherit;\n    min-height: inherit;\n    grid-auto-rows: min-content;\n    grid-row-gap: 0.5rem; */\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n/* impacts form_item for tasks_form */\n.form_item {\n    grid-area: input;\n    display: grid;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_list.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/projects_list.css ***!
  \****************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `.projects_list > * {
    /* display: grid; */
    display: flex;
    flex-direction: column;
    list-style: none;
}

.projects_list > * > * {
    display: flex;
    border-radius: 0.75rem;
    align-items: center;
}

.projects_list > * > li:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.projects_list > * > li:hover span {
    visibility: visible;
}

.projects_list > * > * > span {
    visibility: hidden;
    margin-right: 0.5rem;
}

.projects_list > * > * > .nav_project {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.5rem 1rem;
}

.projects_list > * > * > .nav_project > span {
    flex: 1;
}

.btn_add_project,
.btn_delete_project {
    /* display: grid;
    background: transparent;
    border: none; */
}

.nav_project > img {
    width: clamp(1.15rem, 4vw, 1.5rem);
    justify-self: center;
}

.btn_add_project > img,
.btn_add_project > .btn_img_wrapper > img,
.btn_delete_project > img {
    width: clamp(1.45rem, 4vw, 1.5rem);
}

.btn_add_project {
    /* display: grid; */
    /* grid-template-columns: min-content 1fr; */
    /* align-items: center; */
}`, "",{"version":3,"sources":["webpack://./src/styles/projects_list.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;IACnB,aAAa;IACb,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,oBAAoB;AACxB;;AAEA;IACI,OAAO;AACX;;AAEA;;IAEI;;mBAEe;AACnB;;AAEA;IACI,kCAAkC;IAClC,oBAAoB;AACxB;;AAEA;;;IAGI,kCAAkC;AACtC;;AAEA;IACI,mBAAmB;IACnB,4CAA4C;IAC5C,yBAAyB;AAC7B","sourcesContent":[".projects_list > * {\n    /* display: grid; */\n    display: flex;\n    flex-direction: column;\n    list-style: none;\n}\n\n.projects_list > * > * {\n    display: flex;\n    border-radius: 0.75rem;\n    align-items: center;\n}\n\n.projects_list > * > li:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\n\n.projects_list > * > li:hover span {\n    visibility: visible;\n}\n\n.projects_list > * > * > span {\n    visibility: hidden;\n    margin-right: 0.5rem;\n}\n\n.projects_list > * > * > .nav_project {\n    display: flex;\n    align-items: center;\n    flex: 1;\n    padding: 0.5rem 1rem;\n}\n\n.projects_list > * > * > .nav_project > span {\n    flex: 1;\n}\n\n.btn_add_project,\n.btn_delete_project {\n    /* display: grid;\n    background: transparent;\n    border: none; */\n}\n\n.nav_project > img {\n    width: clamp(1.15rem, 4vw, 1.5rem);\n    justify-self: center;\n}\n\n.btn_add_project > img,\n.btn_add_project > .btn_img_wrapper > img,\n.btn_delete_project > img {\n    width: clamp(1.45rem, 4vw, 1.5rem);\n}\n\n.btn_add_project {\n    /* display: grid; */\n    /* grid-template-columns: min-content 1fr; */\n    /* align-items: center; */\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/sidebar.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/sidebar.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `#sidebar {
    height: 100%;
    width: 100%;
    z-index: 99;
    position: absolute;
    visibility: hidden;
}

#sidebar.hide {
    visibility: hidden;
    transform: translateX(-100%);
    transition: all 300ms ease-in-out;
}

#sidebar.show {
    visibility: visible;
    transform: translateX(0%);
    transition: transform 300ms ease-in-out;
}

#sidebar > .container {
    height: inherit;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 1.25rem;
    background-color: rgb(245, 245, 245);
    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);
    width: 65%;
}

.nav_project,
.nav_projects {
    text-decoration: none;
    column-gap: 0.75rem;
}

#projects_container > *:first-child {
    display: flex;
    align-items: center;
}

#projects_container > *:first-child > .nav_projects {
    flex: 1;
    padding: 0.5rem 1rem;
}

#projects_container > *:first-child {
    border-radius: 0.75rem;
}

#projects_container > *:first-child:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

#sidebar > .container:hover .btn_add_project {
    visibility: visible;
}

#projects_container > *:first-child > .btn_add_project {
    visibility: hidden;
    margin-right: 0.5rem
}

@media screen and (min-width:768px) {
    #sidebar {
        visibility: visible;
        position: static;
        width: inherit;
    }

    #sidebar.show {
        width: 30%;
        display: block;
        animation: slide-in-right 300ms ease-in-out;
    }

    #sidebar.hide {
        display: none;
    }

    #sidebar > .container {
        width: 100%;
        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);
    }
}

@keyframes slide-in-right {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/sidebar.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,4BAA4B;IAC5B,iCAAiC;AACrC;;AAEA;IACI,mBAAmB;IACnB,yBAAyB;IACzB,uCAAuC;AAC3C;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,oCAAoC;IACpC,6CAA6C;IAC7C,UAAU;AACd;;AAEA;;IAEI,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,OAAO;IACP,oBAAoB;AACxB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB;AACJ;;AAEA;IACI;QACI,mBAAmB;QACnB,gBAAgB;QAChB,cAAc;IAClB;;IAEA;QACI,UAAU;QACV,cAAc;QACd,2CAA2C;IAC/C;;IAEA;QACI,aAAa;IACjB;;IAEA;QACI,WAAW;QACX,6CAA6C;IACjD;AACJ;;AAEA;IACI;QACI,4BAA4B;IAChC;;IAEA;QACI,yBAAyB;IAC7B;AACJ","sourcesContent":["#sidebar {\n    height: 100%;\n    width: 100%;\n    z-index: 99;\n    position: absolute;\n    visibility: hidden;\n}\n\n#sidebar.hide {\n    visibility: hidden;\n    transform: translateX(-100%);\n    transition: all 300ms ease-in-out;\n}\n\n#sidebar.show {\n    visibility: visible;\n    transform: translateX(0%);\n    transition: transform 300ms ease-in-out;\n}\n\n#sidebar > .container {\n    height: inherit;\n    display: flex;\n    flex-direction: column;\n    row-gap: 1rem;\n    padding: 1.25rem;\n    background-color: rgb(245, 245, 245);\n    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    width: 65%;\n}\n\n.nav_project,\n.nav_projects {\n    text-decoration: none;\n    column-gap: 0.75rem;\n}\n\n#projects_container > *:first-child {\n    display: flex;\n    align-items: center;\n}\n\n#projects_container > *:first-child > .nav_projects {\n    flex: 1;\n    padding: 0.5rem 1rem;\n}\n\n#projects_container > *:first-child {\n    border-radius: 0.75rem;\n}\n\n#projects_container > *:first-child:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\n\n#sidebar > .container:hover .btn_add_project {\n    visibility: visible;\n}\n\n#projects_container > *:first-child > .btn_add_project {\n    visibility: hidden;\n    margin-right: 0.5rem\n}\n\n@media screen and (min-width:768px) {\n    #sidebar {\n        visibility: visible;\n        position: static;\n        width: inherit;\n    }\n\n    #sidebar.show {\n        width: 30%;\n        display: block;\n        animation: slide-in-right 300ms ease-in-out;\n    }\n\n    #sidebar.hide {\n        display: none;\n    }\n\n    #sidebar > .container {\n        width: 100%;\n        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    }\n}\n\n@keyframes slide-in-right {\n    0% {\n        transform: translateX(-100%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_form.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_form.css ***!
  \*************************************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/icons/chevron_down.svg */ "./src/assets/icons/chevron_down.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#form_task::backdrop  {
    background-color: rgba(0, 0, 0, 0.5);
}

#form_task > .form {
    padding: 1rem;
}

#form_task > .form > div,
.form_task > div {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

.form_item > #btn_priority {
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
}

.form_item > #btn_priority > .task_priority {
    flex: 1;
    text-align: left;
}

.form_item > #btn_priority:hover .img_wrapper_chevron {
    visibility: visible;
}

.form_item > #btn_priority > .img_wrapper_chevron {
    visibility: hidden;
}

.form_item > #project {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
}

.form_item > :last-child {
    min-height: clamp(2rem, 2vw, 3rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_form.css"],"names":[],"mappings":"AAAA;IACI,oCAAoC;AACxC;;AAEA;IACI,aAAa;AACjB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,wBAAwB;IACxB,qBAAqB;IACrB,uBAAuB;IACvB,yDAAyD;IACzD,4BAA4B;IAC5B,2BAA2B;IAC3B,0BAA0B;AAC9B;;AAEA;IACI,kCAAkC;AACtC","sourcesContent":["#form_task::backdrop  {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n#form_task > .form {\n    padding: 1rem;\n}\n\n#form_task > .form > div,\n.form_task > div {\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n.form_item > #btn_priority {\n    display: flex;\n    align-items: center;\n    column-gap: 0.25rem;\n}\n\n.form_item > #btn_priority > .task_priority {\n    flex: 1;\n    text-align: left;\n}\n\n.form_item > #btn_priority:hover .img_wrapper_chevron {\n    visibility: visible;\n}\n\n.form_item > #btn_priority > .img_wrapper_chevron {\n    visibility: hidden;\n}\n\n.form_item > #project {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    background: transparent;\n    background-image: url('../assets/icons/chevron_down.svg');\n    background-repeat: no-repeat;\n    background-position-x: 100%;\n    background-position-y: 50%;\n}\n\n.form_item > :last-child {\n    min-height: clamp(2rem, 2vw, 3rem);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_list.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_list.css ***!
  \*************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `
.tasks_list {
    margin-top: 2rem
}

.tasks_list > :first-child {
    row-gap: 1rem;
}

.tasks_list > :first-child {
    display: flex;
    flex-direction: column;
    flex: 1;
    list-style: none;
}

.tasks_list > :first-child > div > .form_task {
    margin-top: 1rem;
}

div[role=button] {
    border-bottom: 2px solid rgba(66, 66, 66, 0.5);
    padding: 0.5rem;
}

div[role=button]:hover {
    cursor: pointer;
    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);
    border-radius: 0.45rem;
}

.task_list_item > .container {
    display: flex;
    /* border-bottom: 2px solid rgba(66, 66, 66, 0.5); */
    padding: 1rem 0.25rem;
    column-gap: 0.5rem;
}

.task_list_item > .container > .btn_checkbox_task {
    position: relative;
    display: flex;
    align-self: flex-start;
}

.btn_checkbox_task > .checkbox_circle {
    display: flex;
    border: 3px solid;
    border-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
}

.btn_checkbox_task > .checkbox_circle > svg {
    color: inherit;
    opacity: 0;
    fill: currentColor;
    border-radius: 50%;
}

.task_list_item > .container > .btn_checkbox_task:hover >.checkbox_circle > svg {
    opacity: 1;
    background-color: color-mix(in srgb, currentColor 25%, transparent);
}

.checkbox_circle.priority_1 {
    color: var(--priority-1-color);
    border: 3px solid currentColor;
    background-color: color-mix(in srgb, currentColor 20%, transparent);
}

.checkbox_circle.priority_2 {
    color: var(--priority-2-color);
    border: 3px solid currentColor;
    background-color: color-mix(in srgb, currentColor 20%, transparent);
}

.checkbox_circle.priority_3 {
    color: var(--priority-3-color);
    border: 3px solid currentColor;
    background-color: color-mix(in srgb, currentColor 20%, transparent);
}

.checkbox_circle.priority_4 {
    color: var(--priority-4-color);
    border: 3px solid currentColor;
    /* background-color: color-mix(in srgb, currentColor 20%, transparent); */
}

.task_list_item_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 0.15rem;
}

.task_list_item_content > .task_name {
    margin-bottom: 0.5rem;
}

div[role=button]:hover .task_actions{
    visibility: visible;
}

.task_actions {
    display: flex;
    align-items: flex-start;
    visibility: hidden;
}

.btn_date_task {
    display: flex;
    align-items: center;
}

li > .btn_add_task {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    column-gap: 0.25rem;
}

.btn_add_task > .btn_img_wrapper {
    display: flex;
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_list.css"],"names":[],"mappings":";AACA;IACI;AACJ;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,8CAA8C;IAC9C,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,2CAA2C;IAC3C,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,oDAAoD;IACpD,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,iBAAiB;IACjB,gCAAgC;IAChC,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,UAAU;IACV,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,UAAU;IACV,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,yEAAyE;AAC7E;;AAEA;IACI,OAAO;IACP,aAAa;IACb,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,oBAAoB;IACpB,mBAAmB;AACvB;;AAEA;IACI,aAAa;AACjB","sourcesContent":["\n.tasks_list {\n    margin-top: 2rem\n}\n\n.tasks_list > :first-child {\n    row-gap: 1rem;\n}\n\n.tasks_list > :first-child {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    list-style: none;\n}\n\n.tasks_list > :first-child > div > .form_task {\n    margin-top: 1rem;\n}\n\ndiv[role=button] {\n    border-bottom: 2px solid rgba(66, 66, 66, 0.5);\n    padding: 0.5rem;\n}\n\ndiv[role=button]:hover {\n    cursor: pointer;\n    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);\n    border-radius: 0.45rem;\n}\n\n.task_list_item > .container {\n    display: flex;\n    /* border-bottom: 2px solid rgba(66, 66, 66, 0.5); */\n    padding: 1rem 0.25rem;\n    column-gap: 0.5rem;\n}\n\n.task_list_item > .container > .btn_checkbox_task {\n    position: relative;\n    display: flex;\n    align-self: flex-start;\n}\n\n.btn_checkbox_task > .checkbox_circle {\n    display: flex;\n    border: 3px solid;\n    border-color: rgba(0, 0, 0, 0.5);\n    border-radius: 50%;\n}\n\n.btn_checkbox_task > .checkbox_circle > svg {\n    color: inherit;\n    opacity: 0;\n    fill: currentColor;\n    border-radius: 50%;\n}\n\n.task_list_item > .container > .btn_checkbox_task:hover >.checkbox_circle > svg {\n    opacity: 1;\n    background-color: color-mix(in srgb, currentColor 25%, transparent);\n}\n\n.checkbox_circle.priority_1 {\n    color: var(--priority-1-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_2 {\n    color: var(--priority-2-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_3 {\n    color: var(--priority-3-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_4 {\n    color: var(--priority-4-color);\n    border: 3px solid currentColor;\n    /* background-color: color-mix(in srgb, currentColor 20%, transparent); */\n}\n\n.task_list_item_content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.15rem;\n}\n\n.task_list_item_content > .task_name {\n    margin-bottom: 0.5rem;\n}\n\ndiv[role=button]:hover .task_actions{\n    visibility: visible;\n}\n\n.task_actions {\n    display: flex;\n    align-items: flex-start;\n    visibility: hidden;\n}\n\n.btn_date_task {\n    display: flex;\n    align-items: center;\n}\n\nli > .btn_add_task {\n    display: flex;\n    align-items: center;\n    padding: 0.5rem 1rem;\n    column-gap: 0.25rem;\n}\n\n.btn_add_task > .btn_img_wrapper {\n    display: flex;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_priority.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_priority.css ***!
  \*****************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `/* styles for priority options from tasks_priority.js module */
#task_priorities {
    border-radius: 1rem;
    border: none;
    box-shadow: 0px 0px 6px -2px rgb(0, 0, 0);
}

#task_priorities > .container > ul > li {
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    padding: 0.5rem;
}

#task_priorities > .container > ul > li:hover {
    background-color: rgba(0, 0, 0, 0.3);
}

.priority_1 {
    color: var(--priority-1-color);
}

.priority_2 {
    color: var(--priority-2-color);
}

.priority_3 {
    color: var(--priority-3-color);
}

.priority_4  {
    color: var(--priority-4-color);
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_priority.css"],"names":[],"mappings":"AAAA,8DAA8D;AAC9D;IACI,mBAAmB;IACnB,YAAY;IACZ,yCAAyC;AAC7C;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC","sourcesContent":["/* styles for priority options from tasks_priority.js module */\n#task_priorities {\n    border-radius: 1rem;\n    border: none;\n    box-shadow: 0px 0px 6px -2px rgb(0, 0, 0);\n}\n\n#task_priorities > .container > ul > li {\n    display: flex;\n    align-items: center;\n    column-gap: 0.25rem;\n    padding: 0.5rem;\n}\n\n#task_priorities > .container > ul > li:hover {\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n.priority_1 {\n    color: var(--priority-1-color);\n}\n\n.priority_2 {\n    color: var(--priority-2-color);\n}\n\n.priority_3 {\n    color: var(--priority-3-color);\n}\n\n.priority_4  {\n    color: var(--priority-4-color);\n}"],"sourceRoot":""}]);
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

/***/ "./src/styles/projects.css":
/*!*********************************!*\
  !*** ./src/styles/projects.css ***!
  \*********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./projects.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/projects_form.css":
/*!**************************************!*\
  !*** ./src/styles/projects_form.css ***!
  \**************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./projects_form.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_form.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/projects_list.css":
/*!**************************************!*\
  !*** ./src/styles/projects_list.css ***!
  \**************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./projects_list.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/projects_list.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/sidebar.css":
/*!********************************!*\
  !*** ./src/styles/sidebar.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./sidebar.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/sidebar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_sidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tasks_form.css":
/*!***********************************!*\
  !*** ./src/styles/tasks_form.css ***!
  \***********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tasks_form.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_form.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tasks_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tasks_list.css":
/*!***********************************!*\
  !*** ./src/styles/tasks_list.css ***!
  \***********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tasks_list.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_list.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tasks_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/tasks_priority.css":
/*!***************************************!*\
  !*** ./src/styles/tasks_priority.css ***!
  \***************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tasks_priority_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tasks_priority.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_priority.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tasks_priority_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tasks_priority_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tasks_priority_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tasks_priority_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/header */ "./src/components/header.js");
/* harmony import */ var _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/sidebar/sidebar */ "./src/components/sidebar/sidebar.js");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main */ "./src/components/main.js");
/* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/storage */ "./src/storage/storage.js");
/* harmony import */ var _components_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/overlay */ "./src/components/overlay.js");
/* harmony import */ var _iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @iconfu/svg-inject */ "./node_modules/@iconfu/svg-inject/dist/svg-inject.js");
/* harmony import */ var _iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.css */ "./src/app.css");






// SVGInject
// https://www.npmjs.com/package/@iconfu/svg-inject



const appController = (function() {
    const build = {
        header: _components_header__WEBPACK_IMPORTED_MODULE_0__["default"],
        sidebar: _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_1__["default"],
        overlay: _components_overlay__WEBPACK_IMPORTED_MODULE_4__["default"],
        main: _components_main__WEBPACK_IMPORTED_MODULE_2__["default"],
    }

    const app = {
        init: function() {
            ;(0,_storage_storage__WEBPACK_IMPORTED_MODULE_3__.setProjects)();
            this.render();
        },
        cacheDOM: function() {

        },
        render: function() {
            const appWrapper = document.createElement('div');
            const appContent = document.createElement('div');
            appWrapper.id = 'todo_app';
            appContent.id = 'content';

            appWrapper.appendChild(build.header());
            appContent.appendChild(build.overlay());
            appContent.appendChild(build.sidebar());
            appContent.appendChild(build.main());
            appWrapper.appendChild(appContent);

            document.body.appendChild(appWrapper);
        },
        bindEvents: function() {

        },
    }

    app.init();
})();

//main
    // 1. view all projects
    // 2. view all todos in each project
    // 3. expand a single todo to see/edit its details
    // 4. delete a todo

    // todo list item
        // create item button
        // renders form
            // title, required
            // description
            // due date
                //renders form
                    // default values
                        // today, tomorrow, no date
                    // calendar
                    // time
                    // cancel and save button
            // project label/tag
            // submit
        // delete
        // complete
        // reorder todo list item
        // change priority
    // create new todo list item

// todo list OBJECT
    // title
    // description
        // subtask
    // reminder
    // due date
    // time
    // prioirty

// webpack external library: date-fns


/***/ }),

/***/ "./src/assets/icons sync recursive \\.svg$":
/*!***************************************!*\
  !*** ./src/assets/icons/ sync \.svg$ ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./add.svg": "./src/assets/icons/add.svg",
	"./check_small.svg": "./src/assets/icons/check_small.svg",
	"./chevron_down.svg": "./src/assets/icons/chevron_down.svg",
	"./chevron_left.svg": "./src/assets/icons/chevron_left.svg",
	"./chevron_right.svg": "./src/assets/icons/chevron_right.svg",
	"./circle.svg": "./src/assets/icons/circle.svg",
	"./cog.svg": "./src/assets/icons/cog.svg",
	"./date.svg": "./src/assets/icons/date.svg",
	"./delete.svg": "./src/assets/icons/delete.svg",
	"./edit.svg": "./src/assets/icons/edit.svg",
	"./flag.svg": "./src/assets/icons/flag.svg",
	"./github-mark/github-mark-white.svg": "./src/assets/icons/github-mark/github-mark-white.svg",
	"./github-mark/github-mark.svg": "./src/assets/icons/github-mark/github-mark.svg",
	"./home.svg": "./src/assets/icons/home.svg",
	"./inbox.svg": "./src/assets/icons/inbox.svg",
	"./magnify.svg": "./src/assets/icons/magnify.svg",
	"./menu.svg": "./src/assets/icons/menu.svg",
	"./radio_button_unchecked.svg": "./src/assets/icons/radio_button_unchecked.svg",
	"./today.svg": "./src/assets/icons/today.svg"
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
webpackContext.id = "./src/assets/icons sync recursive \\.svg$";

/***/ }),

/***/ "./src/assets/icons sync \\.svg$":
/*!****************************************************!*\
  !*** ./src/assets/icons/ sync nonrecursive \.svg$ ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./add.svg": "./src/assets/icons/add.svg",
	"./check_small.svg": "./src/assets/icons/check_small.svg",
	"./chevron_down.svg": "./src/assets/icons/chevron_down.svg",
	"./chevron_left.svg": "./src/assets/icons/chevron_left.svg",
	"./chevron_right.svg": "./src/assets/icons/chevron_right.svg",
	"./circle.svg": "./src/assets/icons/circle.svg",
	"./cog.svg": "./src/assets/icons/cog.svg",
	"./date.svg": "./src/assets/icons/date.svg",
	"./delete.svg": "./src/assets/icons/delete.svg",
	"./edit.svg": "./src/assets/icons/edit.svg",
	"./flag.svg": "./src/assets/icons/flag.svg",
	"./home.svg": "./src/assets/icons/home.svg",
	"./inbox.svg": "./src/assets/icons/inbox.svg",
	"./magnify.svg": "./src/assets/icons/magnify.svg",
	"./menu.svg": "./src/assets/icons/menu.svg",
	"./radio_button_unchecked.svg": "./src/assets/icons/radio_button_unchecked.svg",
	"./today.svg": "./src/assets/icons/today.svg"
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

/***/ "./src/components/buttons.js":
/*!***********************************!*\
  !*** ./src/components/buttons.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildButton)
/* harmony export */ });
/* harmony import */ var _assets_icons_add_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/add.svg */ "./src/assets/icons/add.svg");
/* harmony import */ var _assets_icons_delete_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/icons/delete.svg */ "./src/assets/icons/delete.svg");
/* harmony import */ var _assets_icons_edit_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/icons/edit.svg */ "./src/assets/icons/edit.svg");
/* harmony import */ var _assets_icons_radio_button_unchecked_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/icons/radio_button_unchecked.svg */ "./src/assets/icons/radio_button_unchecked.svg");
/* harmony import */ var _assets_icons_date_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/date.svg */ "./src/assets/icons/date.svg");
/* harmony import */ var _assets_icons_check_small_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/icons/check_small.svg */ "./src/assets/icons/check_small.svg");
    
    
    
    
    
    
    // import IconInbox from '../assets/icons/inbox.svg';
    // import IconToday from '../assets/icons/today.svg';
    // import IconProject from '../assets/icons/circle.svg';

    // import SVGInject from '@iconfu/svg-inject'
    // returns a button element to create a project/task
    // if spanText provided, then a span element is created
    const icons = { 
        add: _assets_icons_add_svg__WEBPACK_IMPORTED_MODULE_0__,
        delete: _assets_icons_delete_svg__WEBPACK_IMPORTED_MODULE_1__,
        edit: _assets_icons_edit_svg__WEBPACK_IMPORTED_MODULE_2__,
        circle: _assets_icons_radio_button_unchecked_svg__WEBPACK_IMPORTED_MODULE_3__,
        checkbox: _assets_icons_check_small_svg__WEBPACK_IMPORTED_MODULE_5__,
        date: _assets_icons_date_svg__WEBPACK_IMPORTED_MODULE_4__,
    };

    function buildButton(type, name, text) {
        const button = Object.assign(document.createElement('button'), buttonAttributes(type, name));    
        const image = new Image();
        image.src = icons[type];
        image.setAttribute('onload', 'SVGInject(this)');
    
        if (text) {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('btn_img_wrapper');
            imageWrapper.appendChild(image);
            const span = document.createElement('span');
            span.textContent = text;
            button.appendChild(imageWrapper);
            button.appendChild(span);
        } else if (type === 'checkbox') {
            // const taskCheckCircle = document.createElement()
            const checkboxBorder = document.createElement('span');
            checkboxBorder.classList.add('checkbox_circle');
            checkboxBorder.appendChild(image);
            button.appendChild(checkboxBorder);
        } else {
            button.appendChild(image);
        }
    
        return button;
    }
    
    const buttonAttributes = (type, name) => {
        const button = {
            // className: btn_delete_project
            className: `btn_${type}_${name}`,
            type: `button`,
        }
        return button;
    }

/***/ }),

/***/ "./src/components/header.js":
/*!**********************************!*\
  !*** ./src/components/header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildHeader)
/* harmony export */ });
/* harmony import */ var _utilities_import_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/import-all */ "./src/utilities/import-all.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _styles_header_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/header.css */ "./src/styles/header.css");

 // connect .btn_home to mainContent.switchContent



function buildHeader(app, content) {
    const headerElement = document.createElement('header');
    headerElement.appendChild(header.render());
    header.cacheDOM(headerElement);
    header.bindEvents();
    return headerElement;
}

const assets = {
    icons: (0,_utilities_import_all__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync recursive \\.svg$")),
}

const header = {
    cacheDOM: function(container) {
        this.btnMenu = container.querySelector('.btn_menu');
        this.btnHome = container.querySelector('.btn_home');
        this.btnAddTask = container.querySelector('.btn_add_task');
    },
    bindEvents: function() {
        this.btnMenu.addEventListener('click', this.publish);
        this.btnHome.addEventListener('click', this.publish); // testing
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },
    headerContent: {
        headerLeft: [
            {element: 'button', class: 'btn_menu', childElement: 'img', src: assets.icons.files['menu.svg']},
            {element: 'button', class: 'btn_home', childElement: 'img', src: assets.icons.files['home.svg']},
            {element: 'input', class: 'input_search', placeholder: 'Search'}
        ],
        headerRight: [
            {element: 'button', class: 'btn_add_task', childElement: 'img', src: assets.icons.files['add.svg']},
            // {element: 'button', class: 'bt-settingsn', childElement: 'img, src: null},
            {element: 'a', class: 'github', childElement: 'img', src: assets.icons.files['github-mark/github-mark-white.svg'], href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list', target: '_blank'}
        ],
    },
    render: function() {
        const headerElement = document.createElement('nav');
        headerElement.id = 'navbar';

        for (let section in this.headerContent) {
            const headerWrapper = document.createElement('div');
            const headerContainer = document.createElement('div');
            let wrapperClass;
            section === 'headerLeft' ? wrapperClass = 'nav_left' : wrapperClass = 'nav_right';
            headerWrapper.classList.add(wrapperClass);
            headerContainer.classList.add('container');

            this.headerContent[section].forEach((item) => {
                const headerItem = document.createElement(item.element);
                headerItem.classList.add(item.class);
                if ('placeholder' in item) {
                    headerItem.setAttribute('placeholder', item.placeholder);
                } else {
                    const itemIcon = document.createElement(item.childElement);
                    itemIcon.src = item.src;
                    itemIcon.setAttribute('onload', 'SVGInject(this)');
                    headerItem.appendChild(itemIcon);
                }
                headerContainer.appendChild(headerItem);
                headerWrapper.appendChild(headerContainer);
            })
            headerElement.appendChild(headerWrapper);
        }
        return headerElement;
    },
    publish: function(e) {
        let className = e.currentTarget.parentElement.className;
        let subscriber;
        if (className.includes('home')) {
            subscriber = 'content';
        } else {
            subscriber = 'sidebar'
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__.pubSub.publish(subscriber, e.target.parentElement);
    }
}

/***/ }),

/***/ "./src/components/main.js":
/*!********************************!*\
  !*** ./src/components/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMain),
/* harmony export */   mainContent: () => (/* binding */ mainContent)
/* harmony export */ });
/* harmony import */ var _components_projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/projects */ "./src/components/projects.js");
/* harmony import */ var _components_project_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/project_tasks */ "./src/components/project_tasks.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");





function buildMain() {
    const main = document.createElement('main');
    main.id = 'main_content';
    mainContent.cacheDOM(main);
    mainContent.render();
    mainContent.bindEvents();

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.subscribe('content', mainContent.switchContent);

    return main;
}

const build = {
    projects: _components_projects__WEBPACK_IMPORTED_MODULE_0__["default"],
    project: _components_project_tasks__WEBPACK_IMPORTED_MODULE_1__["default"],
}

const mainContent = {
    activeContent: null,
    activeTab: null,
    cacheDOM: function(container) {
        this.main = container;
        this.mainOverlay = container.querySelector('.overlay_main_content');
    },
    render: function(key, uuid) {
        let content;
        if (!key) {
            content = build['project'](_containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.today[0].uuid);
        } else {
            this.main.lastChild.remove();
            content = build[key](uuid);
        }
        this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        let classSubstring = e.className.includes('delete') ? e.className.substring(e.className.indexOf('_') + 1, e.className.lastIndexOf('_')) : e.className.substring(e.className.lastIndexOf('_') + 1);
        let uuid = e.parentElement.dataset.uuid || e.dataset.inboxUuid;
        let renderKey = Object.keys(build).find(key => key === classSubstring);
        let args = ['project', uuid];

        if (renderKey && uuid) {
            // renders respective project
            this.setActiveTab(e);
            args[0] = renderKey;
        } else if (!renderKey && !uuid) {
            // if home button is clicked
                // renders the today section
            args[1] = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.today[0].uuid;
        } else if (classSubstring === 'delete') {
            // if a project is the content and is deleted,
                // renders the inbox section
            args[1] = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.inbox[0].uuid;
        } else {
            this.setActiveTab(e);
            args[0] = 'projects';
        }
        mainContent.render(args[0], args[1]);
    },
    setActiveTab: function(tab) {
        if (this.activeTab) {
            this.activeTab.classList.remove('active');
        }
        tab.classList.add('active');
        this.activeTab = tab;
    },
    setActiveContent: function(content) {
        if (this.activeContent) {
            this.activeContent.classList.remove('active');
        }
        content.classList.add('active');
        this.activeContent = content;
    },
}

/***/ }),

/***/ "./src/components/modal_remove.js":
/*!****************************************!*\
  !*** ./src/components/modal_remove.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildModalRemove)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");


// mimics alert box confirming task/project removal
function buildModalRemove(obj) {
    console.log(`buildModalRemove() is running from mmodal_remove.js`);
    const dialogElement = document.createElement('dialog');
    const form = document.createElement('form');
    
    console.log(obj)
    dialogElement.id = 'modal';
    form.classList.add('form_removal');

    const modal = buildModal(dialogElement, form, obj);
    form.appendChild(modal.render());
    modal.cacheDOM();
    modal.bindEvents();

    dialogElement.appendChild(form);
    document.body.appendChild(dialogElement);dialogElement.showModal();
}

const buildModal = (dialogElement, form, obj) => {
    let state = {
        dialogElement,
        form,
        type: obj.type,
        obj,
    }

    return Object.assign(
        {},
        modal(state),
    )

}

const modal = (state) => ({
    dialogElement: state.dialogElement,
    form: state.form,
    type: state.type,
    selection: state.obj,
    buttons: [
        {
            element: 'button',
            text: 'Cancel',
            attributes: {
                className: 'btn_cancel',
                type: 'button',
            }
        },
        {
            element: 'button',
            text: 'Delete',
            attributes: {
                className: 'btn_submit_remove',
                type: 'submit',
            }
        }
    ],
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnDelete = this.form.querySelector('.btn_submit_remove');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        this.dialogElement.addEventListener('click', this.closeModal);
    },
    render: function() {
        // Delete?
        // Are you sure you want to delete project
        // Cancel and delete buttons

        // Need project.title and task.name
        const container = document.createElement('div');
        const header = document.createElement('h4');
        const confirmationMessage = document.createElement('p');
        const uniqueText = document.createElement('span');

        header.textContent = 'Delete?'
        confirmationMessage.textContent = `Are you sure you want to delete `;
        uniqueText.textContent = this.selection.title ? this.selection.title : this.selection.name;
        confirmationMessage.appendChild(uniqueText)
        // <p>Are you sure you want to delete <span>${this.text}</span>?</p>

        container.appendChild(header);
        container.appendChild(confirmationMessage);

        this.buttons.forEach(item => {
            
            const button = Object.assign(document.createElement(item.element), item.attributes);
            button.textContent = item.text;
            container.appendChild(button);
        })

        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        if (this.type === 'task') {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask', this.selection.uuidTask);
        } else {
            console.log(this.selection);
            console.log(this.selection.uuid);
            // pubSub.publish('removeProject', this.selection.uuid);
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeProject');
        }
        this.closeForm();
    },
    closeForm: function(e) {
        this.dialogElement.close()
        this.removeModal();
    },
    closeModal: function(e) {
        console.log(`closeModal running from modal_remove.js`);
        if (e.target.id === 'modal') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    }
})

/***/ }),

/***/ "./src/components/overlay.js":
/*!***********************************!*\
  !*** ./src/components/overlay.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildOverlay)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");


function buildOverlay() {
    return overlay.render();
}

const overlay = {
    cacheDOM: function(container) {
        this.overlay = container;
    },
    render: function() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay_main_content');
        this.cacheDOM(overlay);
        this.bindEvents();

        return overlay;
    },
    bindEvents: function() {
        this.dimOverlay = this.dimOverlay.bind(this);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe('dim', overlay.dimOverlay);
    
    },
    dimOverlay: function(e) {
        if (e.classList.contains('hide') || window.innerWidth > 768) {
            this.overlay.classList.remove('dim');
        } else if (!e.classList.contains('hide')) {
            this.overlay.classList.add('dim');
        }
    },
}

/***/ }),

/***/ "./src/components/project_tasks.js":
/*!*****************************************!*\
  !*** ./src/components/project_tasks.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildProjectTasks),
/* harmony export */   projectTasks: () => (/* binding */ projectTasks)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _components_tasks_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tasks_list */ "./src/components/tasks_list.js");






// renders a project's page and it's tasks
// when we are at a project's page
    // we delete it from there or from the sidebar
        // change content to home
function buildProjectTasks(uuid) {
    console.log(`tasks.js running`); // for debugging
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.setActive(uuid);
    const project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(uuid);
    projectTasks.project = project;
    const content = projectTasks.render();
    projectTasks.cacheDOM(content);
    projectTasks.bindEvents();
    return content;
}

const projectTasks = {
    project: null,
    cacheDOM: function(container) {
        this.projectTasksContainer = container
        this.ulList = this.projectTasksContainer.querySelector('.tasks_list');
        this.listContainer = this.ulList.firstChild;
        this.btnAddTask = this.ulList.querySelector('.btn_add_task');
    },
    bindEvents: function() {
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_3__["default"]);
        // this will need to generate a form
            // removes the button
    },
    render: function() {
        console.log(`render() in project_tasks.js is running`); // for debugging
        const projectsContainer = document.createElement('div');
        const header = document.createElement('h1');
        const list = document.createElement('ul');

        // const taskList = document.createElement('div');
        const listItem = document.createElement('li'); // rename?
        
        projectsContainer.classList.add('task');
        list.classList.add('tasks_list');

        header.textContent = this.project.title;

        projectsContainer.appendChild(header);

        listItem.appendChild(_components_tasks_list__WEBPACK_IMPORTED_MODULE_4__.tasksList.init()); // something fishing is going on
        listItem.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_2__["default"])('add', 'task', 'Add task'));
        list.appendChild(listItem);

        projectsContainer.appendChild(list);


        return projectsContainer
    },
}

/***/ }),

/***/ "./src/components/projects.js":
/*!************************************!*\
  !*** ./src/components/projects.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildProjects)
/* harmony export */ });
/* harmony import */ var _components_projects_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_projects_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/projects_form */ "./src/components/projects_form.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _styles_projects_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/projects.css */ "./src/styles/projects.css");






function buildProjects() {
    console.log(`projects.js running`);

    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects');

    const header = document.createElement('h1');
    header.textContent = 'PROJECTS';

    projectsContainer.appendChild(header);
    projectsContainer.appendChild(projects.render());
    
    projects.cacheDOM(projectsContainer);
    projects.bindEvents();

    return projectsContainer
}

const projects = {
    cacheDOM: function(container) {
        this.btnAddProject = container.querySelector('.btn_add_project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', _components_projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },
    render: function() {
        const parentContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        anchorWrapper.classList.add('nav_projects');

        anchorWrapper.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('add', 'project', 'Add project'));        
        parentContainer.appendChild(anchorWrapper);

        _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.add('content', parentContainer, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.projects);
        _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.find('content').clearCache();
        _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.find('content').init();
        return parentContainer;
    },
}

/***/ }),

/***/ "./src/components/projects_form.js":
/*!*****************************************!*\
  !*** ./src/components/projects_form.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildProjectForm)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_projects_form_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/projects_form.css */ "./src/styles/projects_form.css");





// renders a form to create a project
function buildProjectForm() {
    const dialogElement = document.createElement('dialog');
    dialogElement.id = 'form_project';
    dialogElement.appendChild(formProject.render());
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
    formProject.cacheDOM();
    formProject.bindEvents();
}

const formProject = {
    formChildren: {
        name: {
            id: 'title',
            name: 'title',
            type: 'text',
            placeholder: 'Enter Project Title',
            required: 'required',
        },
    },
    formButtons: {
        cancel: {
            className: 'btn_cancel',
            type: 'button',
        },
        add: {
            className: 'btn_submit_project',
            type: 'submit',
        },
    },
    cacheDOM: function() {
        this.dialogElement = document.querySelector('#form_project');
        this.btnCancel = document.querySelector('.btn_cancel');
        this.btnSubmit = document.querySelector('.btn_submit_project');
        this.form = document.querySelector('#form');
        this.formInputs = document.querySelectorAll('#form input');
    },
    bindEvents: function() {
        this.closeModal = this.closeModal.bind(this);
        this.removeModal = this.removeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.dialogElement.addEventListener('click', this.closeModal);
        this.dialogElement.addEventListener('cancel', this.removeModal)
        this.btnCancel.addEventListener('click', this.removeModal);
        this.form.addEventListener('submit', this.submitForm);
    },
    // take a look at restaurant project's contact module
    render: function() {
        const formElement = document.createElement('form');
        const formHeader = document.createElement('h2');
        const formButtons = document.createElement('div');
        formButtons.classList.add('form_buttons');
        formElement.id = 'form';
        formHeader.textContent = 'Add Project';
        formElement.appendChild(formHeader);

        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form_item');
            if (this.formChildren[formChild].hasOwnProperty('required')) {
                const label = document.createElement('label');
                const input = Object.assign(document.createElement('input'), this.formChildren[formChild]);
                label.textContent = formChild;
                label.htmlFor = this.formChildren[formChild].id;
                formItem.appendChild(label);
                formItem.appendChild(input);
            }
            formElement.appendChild(formItem);
        }

        for (let btn in this.formButtons) {
            const button = document.createElement('button');
            const span = document.createElement('span');
            Object.assign(button, this.formButtons[btn]);
            span.textContent = btn;

            button.appendChild(span);
            formButtons.appendChild(button);
        }
        formElement.appendChild(formButtons);

        return formElement
    },
    closeModal: function(e) {
        if (e.target.tagName === 'DIALOG') {
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    },
    submitForm: function(e) {
        e.preventDefault();
        // optional, form validation
            // if form is valid
                // then addProject()
        // addProject(this.formInputs);
        _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.addProject(this.formInputs);
        // buildList.modules.forEach(module => module.render())
        _components_projects_list__WEBPACK_IMPORTED_MODULE_1__.buildList.find('sidebar').render(); // will render only the sidebar
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubSub.publish('sidebar');
        this.removeModal();
    }
}

/***/ }),

/***/ "./src/components/projects_list.js":
/*!*****************************************!*\
  !*** ./src/components/projects_list.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildList: () => (/* binding */ buildList)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons */ "./src/components/buttons.js");
/* harmony import */ var _modal_remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal_remove */ "./src/components/modal_remove.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/inbox.svg */ "./src/assets/icons/inbox.svg");
/* harmony import */ var _assets_icons_today_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/icons/today.svg */ "./src/assets/icons/today.svg");
/* harmony import */ var _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/icons/circle.svg */ "./src/assets/icons/circle.svg");
/* harmony import */ var _styles_projects_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/projects.css */ "./src/styles/projects.css");
/* harmony import */ var _styles_projects_list_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/projects_list.css */ "./src/styles/projects_list.css");










const buildProjectsList = (type, container, array) => {
    let state = {
        container,
        type,
        array,
    }

    return Object.assign(
        {},
        projectsList(state),
        setIcons(state),
        )
}

// rename to buildProjectsList (?)
const buildList = {
    modules: [],
    add: function (type, container, array) {
        // need to check if the module exists already
        // if module exists, then update it's container
        // prevents similar modules to be added
        if (this.modules.some(module => module.type === type)) {
            this.find(type).container = container;
        } else {
            this.modules = [...this.modules, buildProjectsList(type, container, array)];
        }
    },
    find: function(type) {
        return this.modules.find(module => module.type === type);
    }
}

const projectsList = (state) => ({
    removeSelection: null,
    array: state.array,
    type: state.type,
    container: state.container,
    init: function() {
        const projectsContainer = document.createElement('div');
        const list = document.createElement('ul');
    
        projectsContainer.classList.add('projects');
        list.classList.add('projects_list');

        list.appendChild(this.render())
        this.cacheDOM(list);
        this.bindEvents();
        this.container.appendChild(list);

    },
    cacheDOM: function(container)  {    
        this.ulList = container;
        this.listContainer = this.ulList.firstChild;
        this.projectsListItems = this.ulList.querySelectorAll('li');
        this.projectsListAnchors = this.ulList.querySelectorAll('li a');
        this.btnDeleteProject = this.ulList.querySelectorAll('.btn_delete_project');
    },
    bindEvents: function() {
        this.removeProject = this.removeProject.bind(this);
        this.publish = this.publish.bind(this);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.subscribe('removeProject', this.removeProject);
        this.btnDeleteProject.forEach(button => {
            button.addEventListener('click', this.removeProject);
        });

        this.projectsListAnchors.forEach( project => {
            project.addEventListener('click', this.publish);
        });
    },
    render: function() {
        const listItems = document.createElement('div');
        for (let i = 0; i < this.array.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            const anchorImg = new Image();
            anchorImg.setAttribute('onload', 'SVGInject(this)');
            anchorSpan.textContent = this.array[i].title;
            anchor.href = `#${this.array[i].title};`

            listItem.setAttribute('data-uuid', this.array[i].uuid);
            anchor.classList.add('nav_project');
            const buttonSpan = document.createElement('span');

            if (Object.keys(this.icons).find(a => a === this.array[i].title.toLowerCase())) {
                anchorImg.src = this.icons[Object.keys(this.icons).find(a => a === this.array[i].title.toLowerCase())]
            } else {
                anchorImg.src = this.icons['circle'];
            }
            
            anchor.appendChild(anchorImg);
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);

            if (state.type !== 'misc') {
                const deleteButton = (0,_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('delete', 'project');
                deleteButton.setAttribute('data-inbox-uuid', _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox[0].uuid);
                buttonSpan.appendChild(deleteButton);
                listItem.appendChild(buttonSpan);
            }

            listItems.appendChild(listItem);
        }

        if (this.listContainer) {
            this.listContainer.remove();
            this.ulList.appendChild(listItems);
            // changes content to the newly project is added
            if (this.projectsListItems.length < this.array.length && this.type === 'sidebar') {
                _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', [...listItems.children].splice(-1).pop().firstChild);
            }
            this.cacheDOM(this.ulList);
            this.bindEvents();
        }
        return listItems;
    },
    removeProject: function(e) {
        if (e instanceof MouseEvent) {
            const listItem = e.target.parentElement.parentElement.parentElement;
            
            buildList.modules.forEach(module => {
                module.removeSelection = listItem;
            })
            this.removeSelection = listItem;
            const projectUUID = listItem.dataset.uuid;
            (0,_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.find(projectUUID));
            console.log(this);
            console.log(this.type);
            console.log(this.removeSelection)
        } else {
            // if there is no active project
            // OR the project's uuid we want to remove is the same as the current active project's uuid
            // update the content to the inbox

            if (_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive() === undefined || e === _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive().uuid) {
                _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', this.removeSelection.lastChild.firstChild);
            }
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.remove(e);
            buildList.modules.forEach(module => module.render());

            this.removeSelection.remove();
            buildList.modules.forEach(module => module.removeSelection = null);
        }
    },
    publish: function(e) {
        e.preventDefault();
        console.log(`publish() running from projects_ist.js`); // for debugging
        let className = e.target.parentElement.className;
        let projectUUID = e.target.parentElement.parentElement.dataset.uuid
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', e.target.parentElement);
        if (this.type === 'sidebar'|| this.type === 'misc') {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('sidebar');
        }
    },
    clearCache: function() {
        this.ulList = null;
        this.listContainer = null;
        this.projectsListItems = null;
        this.projectsListAnchors = null;
        this.btnDeleteProject = null;
    },
})

const setIcons = (state) => {
    let icons = {}

    if (state.type === 'misc') {
        icons.icons = { inbox: _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__, today: _assets_icons_today_svg__WEBPACK_IMPORTED_MODULE_5__ };
    } else {
        icons.icons = { circle: _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__ };
    }
    return icons;
}

/***/ }),

/***/ "./src/components/sidebar/sidebar.js":
/*!*******************************************!*\
  !*** ./src/components/sidebar/sidebar.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildSidebar)
/* harmony export */ });
/* harmony import */ var _utilities_import_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/import-all */ "./src/utilities/import-all.js");
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons */ "./src/components/buttons.js");
/* harmony import */ var _projects_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projects_form */ "./src/components/projects_form.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_sidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/sidebar.css */ "./src/styles/sidebar.css");








function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';

    if (window.innerWidth > 768) {
        sidebarWrapper.classList.add('show');
    } else {
        sidebarWrapper.classList.add('hide');
    }

    sidebarWrapper.appendChild(sidebar.render());
    sidebar.cacheDOM(sidebarWrapper);
    sidebar.bindEvents();

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.subscribe('sidebar', sidebar.toggleSidebar);
    return sidebarWrapper;
}

const assets = {
    icons: (0,_utilities_import_all__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
}

const sidebar = {
    cacheDOM: function(container) {
        this.sidebar = container;
        this.sidebarWrapper = this.sidebar.querySelector('.sidebar_wrapper');
        this.projectsContainer = this.sidebar.querySelector('#projects_container');
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects');
        this.btnAddProject = container.querySelector('.btn_add_project');

    },
    bindEvents: function() {
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.publish = this.publish.bind(this);
        this.btnAddProject.addEventListener('click', _projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.anchorProjects.addEventListener('click', this.publish, { capture: true });
        this.sidebar.addEventListener('click', this.toggleSidebar);
        this.callDimOverlay = this.callDimOverlay.bind(this);
        window.addEventListener('resize', this.callDimOverlay);
    },
    render: function() {
        const sidebarContainer = document.createElement('div');

        _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.setMiscProjects();
        const navMisc = document.createElement('div');
        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.add('misc', navMisc, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.misc);
        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find(`misc`).init();

        const projectsContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const projectsAnchor = document.createElement('a');

        // sidebarWrapper.classList.add('sidebar_wrapper');
        sidebarContainer.classList.add('container');
        projectsContainer.id = 'projects_container';
        navMisc.classList.add('projects_misc_container');

        projectsAnchor.textContent = 'Projects';
        projectsAnchor.href = '#projects';
        projectsAnchor.classList.add('nav_projects')

        anchorWrapper.appendChild(projectsAnchor);
        anchorWrapper.appendChild((0,_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('add', 'project'));
        projectsContainer.appendChild(anchorWrapper);

        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.add('sidebar', projectsContainer, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.projects);
        _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find(`sidebar`).init();

        sidebarContainer.appendChild(navMisc);
        sidebarContainer.appendChild(projectsContainer);
        return sidebarContainer;
    },
    toggleSidebar: function(e) {
        if (e instanceof MouseEvent) {
            if (e.target === this.sidebar) {
                this.toggleSidebar();
            } 
        } else {
            if (this.sidebar.classList.contains('show')) {
                this.sidebar.classList.remove('show');
                this.sidebar.classList.add('hide');
            } else {
                this.sidebar.classList.remove('hide');
                this.sidebar.classList.add('show');
            }
            this.callDimOverlay()
        }
    },
    publish: function(e) {
        e.stopImmediatePropagation();
        this.toggleSidebar();
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('content', e.currentTarget);
    },
    callDimOverlay: function() {
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('dim', this.sidebar);
    },
}

/***/ }),

/***/ "./src/components/tasks_form.js":
/*!**************************************!*\
  !*** ./src/components/tasks_form.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildForm: () => (/* binding */ buildForm),
/* harmony export */   "default": () => (/* binding */ buildTasksForm)
/* harmony export */ });
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_tasks_priority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/tasks_priority */ "./src/components/tasks_priority.js");
/* harmony import */ var _styles_tasks_form_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/tasks_form.css */ "./src/styles/tasks_form.css");
/* harmony import */ var _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/flag.svg */ "./src/assets/icons/flag.svg");
/* harmony import */ var _assets_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/icons/chevron_down.svg */ "./src/assets/icons/chevron_down.svg");







const buildTaskForm = (type, form, button, buttonParent, dialogElement) => {
    let state = {
        form,
        type,
    }

    if (type === 'default') {
        if (button.hasAttribute('role')) {
        }
        state.button = button;
        state.buttonParent = buttonParent;
        return Object.assign(
            {},
            formTask(state),
            nonModal(state),
            formInputs(state),
        )
    }

    state.dialogElement = dialogElement;
    return Object.assign(
        {},
        formTask(state),
        modal(state),
        formInputs(state),
    )
}

const buildForm = {
    sections: [],
    add: function (type, form, button, buttonParent, dialogElement) {
        // if section type already exists, update it's container
        // prevents similar sections to be added
        if (this.find(type)) {
            this.find(type).closeForm();
            this.remove(type);
        }
        this.sections = [...this.sections, buildTaskForm(type, form, button, buttonParent, dialogElement)];
    },
    remove: function(type) {
        this.sections.splice(this.sections.indexOf(this.find(type)), 1);
    },
    find: function(type) {
        return this.sections.find(section => section.type === type);
    }
}

// renders a form to create a task
    // one needs to be a dialog element
    // one needs to be a non-dialog element
function buildTasksForm(e) {
    const button = e.currentTarget;
    const buttonParent = button.parentElement;
    const form = document.createElement('form');
    if (!button.hasAttribute('role') && buttonParent.tagName !== 'LI') {
        form.classList.add('form');
        const dialogElement = document.createElement('dialog');
        dialogElement.id = 'form_task';
        buildForm.add('modal', form, undefined, undefined, dialogElement);

        form.appendChild(buildForm.find(`modal`).render());
        buildForm.find(`modal`).cacheDOM();
        buildForm.find(`modal`).bindEvents();
        dialogElement.appendChild(form);
        document.body.appendChild(dialogElement);
        dialogElement.showModal();
    } else {
        form.classList.add('form_task');
        e.currentTarget.replaceWith(form);
        buildForm.add('default', form, button, buttonParent)
        form.appendChild(buildForm.find(`default`).render());
        buildForm.find(`default`).cacheDOM();
        buildForm.find(`default`).bindEvents();
    }
}

const formTask = (state) => ({
    type: state.type,
    form: state.form,
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnSubmit = this.form.querySelector('.btn_submit_task') || this.form.querySelector('.btn_update_task');
        this.formInputs = this.form.querySelectorAll('.task_input');
        this.btnPriority = this.form.querySelector('#btn_priority');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        this.btnPriority.addEventListener('click', _components_tasks_priority__WEBPACK_IMPORTED_MODULE_2__["default"]);
        if (this.dialogElement) {
            this.closeModal = this.closeModal.bind(this);
            this.dialogElement.addEventListener('click', this.closeModal);
        }
    },
    unBindEvent: function() {
        this.form.removeEventListener('submit', this.submitForm);
    },
    render: function() {
        const container = document.createElement('div');
        const formButtons = document.createElement('div');
        formButtons.classList.add('form_buttons');
        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form_item');
            if (this.formChildren[formChild].hasOwnProperty('element')) {
                const label = document.createElement('label');
                const item = Object.assign(
                    document.createElement(this.formChildren[formChild].element),
                    this.formChildren[formChild].attributes
                );

                label.htmlFor = this.formChildren[formChild].attributes.id;
                label.textContent = this.formChildren[formChild].attributes.placeholder;

                // idea, make separate module for options button
                if (this.formChildren[formChild].options) {
                    let length = 4;
                    let i = 1;
                    if (formChild === 'project') {
                        length = _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.projects.length;
                        i = 0;
                    }
                    for (i; i <= length; i++) {
                        const selectOption = Object.assign(
                            document.createElement(this.formChildren[formChild].options.element),
                            this.formChildren[formChild].options.attributes(i)
                        )

                        item.appendChild(selectOption);
                    }
                } 

                formItem.appendChild(label);
                formItem.appendChild(item);

                if (this.formChildren[formChild].sibiling) {
                    const button = document.createElement(this.formChildren[formChild].sibiling.element);
                    Object.assign(button, this.formChildren[formChild].sibiling.attributes);
                    this.formChildren[formChild].sibiling.children.forEach(item => {
                        const element = Object.assign(document.createElement(item.element), item.attributes);
                        if (item.child) {
                            const childElement = Object.assign(document.createElement(item.child.element), item.child.attributes)
                            childElement.setAttribute('onload', 'SVGInject(this)');
                            element.appendChild(childElement);
                        }
                        button.appendChild(element);
                    })
                    formItem.appendChild(button);
                }

            }
            container.appendChild(formItem);
        }

        for (let btn in this.formButtons) {
            const button = document.createElement('button');
            const span = document.createElement('span');
            Object.assign(button, this.formButtons[btn]);
            span.textContent = btn;

            button.appendChild(span);
            formButtons.appendChild(button);
        }

        container.appendChild(formButtons);
        
        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        if (!this.listItem) {
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().addTask(this.formInputs);
            if (this.dialogElement) {
                this.closeForm();
            } else {
                this.form.reset();
            }
        } else {
            this.closeForm();
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('resetOldTask', this.button); // testing
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(this.listItem.dataset.uuidProj).updateTask(this.listItem.dataset.uuid, this.formInputs);
        }
    },
    closeForm: function(e) {
        console.log(`closeForm() from tasks_from.js is running`); // for debugging
        if (!this.dialogElement) {
            this.form.replaceWith(this.button);
            buildForm.remove(this.type);
        } else {
            this.removeModal();
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('resetOldTask'); // testing
    }
});

const nonModal = (state) => ({
    button: state.button,
    parentButton: state.buttonParent,
});

const modal = (state) => ({
    dialogElement: state.dialogElement,
    closeModal: function(e) {
        if (e.target.id === 'form_task') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
        buildForm.remove(this.type);
    },
});

const formInputs = (state) => {
    const taskItem = state.button ? state.button.querySelector('.task_list_item') : null;
    const project = taskItem ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(taskItem.dataset.uuidProj) : null;
    const task = taskItem? project.findTask(taskItem.dataset.uuid) : null;
    
    const init = () => {
        for (let formChild in inputs.formChildren) {
            let attributes = inputs.formChildren[formChild].attributes;
            // finds task's key equal to input's id
            let key = Object.keys(task).find(item => item === attributes.id);
            if (attributes && key) {
                if (!inputs.formChildren[formChild].options) {
                    let value;
                    if (formChild !== 'dueDate') {
                        if (formChild === 'priority') {
                            inputs.formChildren[formChild].sibiling.children[0].child.attributes.className = `priority_${task.priority}`
                            inputs.formChildren[formChild].sibiling.children[1].attributes.textContent = `P${task.priority}`;
                        }
                        value = { value: task[key] };
                    } else {
                        value = { value: new Date(task[key]).toISOString().split('T')[0] }
                    }
                    Object.assign(attributes, value);
                } else {
                    const text = key;
                    const number = task[key];
                    Object.assign(
                        inputs.formChildren[formChild].options,
                        { value: number }, { text: text }
                    )
                }
            }
        }
    }

    const inputs = {
        formChildren: {
            name: {
                element: 'input',
                attributes: {
                    id: 'name',
                    className: 'task_input',
                    name: 'name',
                    type: 'text',
                    placeholder: 'Task name',
                    required: 'required',
                }
            },
            description: {
                element: 'textarea',
                attributes: {
                    id: 'description',
                    className: 'task_input',
                    name: 'description',
                    placeholder: 'Description'
                }
            },
            dueDate: {
                element: 'input',
                attributes: {
                    id: 'due_date',
                    className: 'task_input',
                    name: 'date',
                    type: 'date',
                    placeholder: 'Due Date',
                }
            },
            dueTime: {
                element: 'input',
                attributes: {
                    id: 'due_time',
                    className: 'task_input',
                    name: 'time',
                    type: 'time',
                    placeholder: 'Time'
                },
            },
            priority: {
                element: 'input',
                attributes: {
                    id: 'priority',
                    className: 'task_input',
                    name: 'priority',
                    type: 'hidden',
                    placeholder: 'Priority',
                    value: 4,
                },
                sibiling: {
                    element: 'button',
                    attributes: {
                        id: 'btn_priority',
                        className: 'task_input',
                        placeholder: 'Priority',
                        type: 'button',
                    },
                    children: [
                    {
                        element: 'div',
                        attributes: {
                            className: 'img_wrapper_flag',
                        },
                        child: { 
                            element: 'img', 
                            attributes: {
                                src: _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_4__,
                                className: 'priority_4',
                            }
                        }
                    },
                    {
                        element: 'span',
                        attributes: {
                            className: 'task_priority',
                            textContent: 'P4',
                        }
                    },
                    {
                        element: 'div',
                        attributes: {
                            className: 'img_wrapper_chevron',
                        },
                        child: {
                            element: 'img',
                            attributes: {
                                src: _assets_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__,
                                className: 'chevron_down',
                            }
                        }
                    }
                    ],
                }

            },
            project: {
                element: 'select',
                attributes: {
                    id: 'project',
                    className: 'task_input',
                    name: 'project',
                    placeholder: 'Project'
                },
                options: {
                    element: 'option',
                    attributes: function(i) {
                        const project = {
                            value: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].uuid,
                            text: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].title,
                        }
                        if (state.button && _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(state.button.firstChild.dataset.uuidProj)) {
                            console.log(_containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(state.button.firstChild.dataset.uuidProj))
                            return _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(state.button.firstChild.dataset.uuidProj).uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].uuid ?
                            Object.assign(project, { selected: true }, { defaultSelected : true}) : project;
                        } else {
                            return _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.allProjects[i].uuid ?
                            Object.assign(project, { selected: true }, { defaultSelected : true}) : project;
                        }
                    }
                }
            },
        },
        formButtons: {
            cancel: {
                className: 'btn_cancel',
                type: 'button',
            },
        }
    }

    // if the button clicked has 'role' attribute
        // assign formChildren with a save-button
        // assign formTask with a content property/init function
    // otherwise, 
        // assign formChildren with only a add-button
    if (state.button && state.button.hasAttribute('role')) {
        const inputsEdit = {
            button: {
                save: {
                className: 'btn_update_task',
                type: 'submit',
                },
            },
            prop: {
                listItem: state.button.firstChild,
            }
        }

        init();
        Object.assign(inputs.formButtons, inputsEdit.button);
        Object.assign(inputs, inputsEdit.prop);
    } else {
        const inputsAdd = {
            add: {
                className: 'btn_submit_task',
                type: 'submit',
            },
        }

        Object.assign(inputs.formButtons, inputsAdd);
    }
    return inputs;
}

/***/ }),

/***/ "./src/components/tasks_list.js":
/*!**************************************!*\
  !*** ./src/components/tasks_list.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tasksList: () => (/* binding */ tasksList)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_modal_remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/modal_remove */ "./src/components/modal_remove.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_tasks_list_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/tasks_list.css */ "./src/styles/tasks_list.css");







const tasksList = {
    removeSelection: null,
    btnDeleteTask: [],
    init: function() {
        this.render = this.render.bind(this);
        this.resetOldTask = this.resetOldTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('addTask', this.render);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('updateTask', this.render);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('resetOldTask', this.resetOldTask);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__.pubSub.subscribe('removeTask', this.removeTask);
        this.project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive()
        this.listContainer = this.render();
        this.project.tasks.forEach(task => {
            this.render(task)
        });
        return this.listContainer;
    },
    oldTask: null,
    project: null,
    cacheDOM: function() {
        this.listContainer = this.listContainer;
        // this.btnDeleteTask = this.listContainer.querySelectorAll('.btn_delete_task');
        this.projectsListItems = this.listContainer.querySelectorAll('li');
    },
    bindEvents: function(...args) {
        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        args.forEach(element => {
            if (element.getAttribute('type')) {
                if (element.className.includes('delete')) {
                    element.addEventListener('click', this.removeTask, true);
                } else {
                    element.addEventListener('click', this.completeTask)
                }
            } else {
                element.addEventListener('click', this.editTask);
            }
        });
        // this will need to generate a form
            // removes the button
    },
    render: function(task) {
        if (task) {
            const listItemWrapper = document.createElement('div');
            const listItemContainer = document.createElement('div');
            const listItem = document.createElement('li');
            const taskContent = document.createElement('div');
            const taskName = document.createElement('h3');
            const priority = document.createElement('p');
            const taskCheckbox = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('checkbox', 'task'); // testing
            
            const taskActions = document.createElement('div');

            listItemWrapper.setAttribute('role', 'button');
            listItem.setAttribute('data-uuid', task.uuidTask);
            listItem.setAttribute('data-uuid-proj', task.uuidProj);
            listItemContainer.classList.add('container');
            taskContent.classList.add('task_list_item_content');
            listItem.classList.add('task_list_item');
            taskActions.classList.add('task_actions');
            taskName.classList.add('task_name');
            taskName.textContent = task.name;

            // <button>
            //     <svg>flag</svg>
            //     <span>P4</span>
            //     <svg>dropdown arrow</svg>
            // </button>

            // <dialog>
            //     <div>
            //         <ul>
            //             <li><span><svg></svg></span>Priority 1</li>
            //             <li>Priority 2</li>
            //             <li>Priority 3</li>
            //             <li>Priority 4</li>
            //         </ul>
            //     </div>
            // </dialog>
            priority.classList.add('task_priority');
            priority.textContent = `Priority ${task.priority}`;

            taskCheckbox.firstElementChild.classList.add(`priority_${task.priority}`)

            // listItemContainer.appendChild(taskRadio);
            listItemContainer.appendChild(taskCheckbox); // testing
            taskContent.appendChild(taskName);
            
            if (task.description !== undefined) {
                const taskDescription = document.createElement('p');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = task.description;
                taskContent.appendChild(taskDescription);
            }

            if (task.due_date !== undefined || task.due_time !== undefined) {
                const dateTimeWrapper = document.createElement('div');
                let dateTimeText;
                const date = new Date(`${task.due_date}T00:00:00`);
                const time = new Date(`1-2-1000 ${task.due_time}`)
                const timeProperties = { hour: 'numeric', minute: 'numeric', hour12: true }
                if (task.due_date && !task.due_time) {
                    dateTimeText = date.toDateString();
                } else if (!task.due_date && task.due_time) {
                    dateTimeText = time.toLocaleString('en-us', timeProperties);
                } else {
                    dateTimeText = `${date.toDateString()} ${time.toLocaleString('en-us', timeProperties)}`;
                }
                dateTimeWrapper.classList.add('task_due_date_time')
                const dateTimeButton = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('date', 'task', dateTimeText)
                dateTimeWrapper.appendChild(dateTimeButton);
                taskContent.appendChild(dateTimeWrapper);
            }

            // taskContent.appendChild(priority);

            const buttonDelete = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('delete', 'task');
            const buttonEdit = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('edit', 'task');
            taskActions.appendChild(buttonDelete);
            taskActions.appendChild(buttonEdit);

            listItemContainer.appendChild(taskContent);
            listItemContainer.appendChild(taskActions);
            listItem.appendChild(listItemContainer);

            listItemWrapper.appendChild(listItem);
            // this.btnDeleteTask.push(button)
            this.bindEvents(buttonDelete, taskCheckbox, listItemWrapper);

            if (!this.oldTask) {
                console.log(`this.oldTask = ${this.oldTask}`);
                this.listContainer.appendChild(listItemWrapper);
            } else {
                this.oldTask.replaceWith(listItemWrapper);
                this.oldTask = null;
            }
            // updating task
                // need to only append at that task's index
        } else {
            return document.createElement('div');
        }
        // when the task form inside the list is open and a new task is added
            // the task list grows while the task form is open
    },
    completeTask: function(e) {
        e.stopImmediatePropagation();
        console.log(`completetask() running from tasks_list.js`);
        const listItem = e.currentTarget.parentElement.parentElement;
        this.removeSelection = listItem;
        this.removeTask();
    },
    removeTask: function(e) {
        console.log(`removeTask() in tasks_list.js is running`)
        // create a modal to confirm removal
        console.log(e);
        if (e instanceof MouseEvent) {
            e.stopImmediatePropagation();
            const listItem = e.currentTarget.parentElement.parentElement.parentElement;
            this.removeSelection = listItem;
            let uuidTask = listItem.dataset.uuid;
            (0,_components_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(this.project.findTask(uuidTask));  
        // } else if (e) {
        } else if (this.removeSelection) {
            // this.project.removeTask(e);
            this.project.removeTask(this.removeSelection.dataset.uuid);
            this.removeSelection.parentElement.remove();
            this.removeSelection = null;
        } else {
            // if (this.project.title !== 'Today') {
                this.oldTask.remove();
            // }
            this.oldTask = null;
        }
    },
    editTask: function(e) {
        console.log(`editTask() from tasks_list.js is running`);
        this.oldTask = e.currentTarget;
        (0,_components_tasks_form__WEBPACK_IMPORTED_MODULE_3__["default"])(e);
    },
    resetOldTask: function(oldTask) {
        console.log(`resetOldTask() from tasks_list.js is running`);
        if (this.oldTask) {
            // debugger
            this.oldTask = null
        } else if (oldTask) {
            this.oldTask = oldTask;
        }
    }
}

/***/ }),

/***/ "./src/components/tasks_priority.js":
/*!******************************************!*\
  !*** ./src/components/tasks_priority.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildPriorityOptions)
/* harmony export */ });
/* harmony import */ var _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/flag.svg */ "./src/assets/icons/flag.svg");
/* harmony import */ var _assets_icons_check_small_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/icons/check_small.svg */ "./src/assets/icons/check_small.svg");
/* harmony import */ var _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/icons/circle.svg */ "./src/assets/icons/circle.svg");
/* harmony import */ var _styles_tasks_priority_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/tasks_priority.css */ "./src/styles/tasks_priority.css");





// creates a modal for priority options
function buildPriorityOptions(e) {
    priorityOptions.init(e);

    const dialogElement = document.createElement('dialog');
    dialogElement.id = 'task_priorities';
    dialogElement.appendChild(priorityOptions.render());

    document.body.appendChild(dialogElement);

    priorityOptions.cacheDOM();
    priorityOptions.bindEvents();
    dialogElement.showModal();
}

const priorityOptions = {
    priority: null,
    btnPriority: null,
    btnPriorityText: null,
    btnFlag: null,
    observer: null,
    media: window.matchMedia('(min-width: 768px)'),
    init: function(e) {
        this.btnPriority = e.currentTarget;
        this.btnPriorityText = this.btnPriority.querySelector('.task_priority');
        this.btnFlag = this.btnPriority.querySelector('.img_wrapper_flag').firstChild;
        this.priority = parseInt(e.currentTarget.parentElement.querySelector('#priority').value);
        this.formItem = this.btnPriority.parentElement;
    },
    cacheDOM: function() {
        this.dialogElement = document.querySelector('#task_priorities');
        this.inputPriority = document.querySelector('#priority');
        this.options = document.querySelectorAll('.option');
    },
    bindEvents: function() {
        this.closeModal = this.closeModal.bind(this);
        this.select = this.select.bind(this);
        this.dialogElement.addEventListener('click', this.closeModal);
        this.options.forEach(option => option.addEventListener('click', this.select))
        
        this.callBack = this.callBack.bind(this);
        this.observer = new ResizeObserver(this.callBack);
        this.observer.observe(this.formItem);

        this.media.addEventListener('change', () => {
            this.removeModal();
        })

    },
    render: function() {
        const optionsWrapper = document.createElement('div');
        const optionsList = document.createElement('ul');
        optionsWrapper.classList.add('container');

        for (let i = 1; i <= 4; i++) {
            const option = document.createElement('li');
            const imageWrapper = document.createElement('div');
            const span = document.createElement('span');

            const image = new Image();
            image.src = _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_0__;
            image.setAttribute('onload', 'SVGInject(this)');
            image.classList.add(`priority_${i}`);
            imageWrapper.classList.add('img_wrapper_flag');
            option.classList.add('option')
            option.dataset.value = i;
            span.textContent = `Priority ${i}`
        
            imageWrapper.appendChild(image);
            option.appendChild(imageWrapper);
            option.appendChild(span);
            if (i === this.priority) {
                option.classList.add(`selected`);
                const imgCheck = new Image();
                imgCheck.src = _assets_icons_check_small_svg__WEBPACK_IMPORTED_MODULE_1__;
                imgCheck.classList.add('option_selected_checkmark');
                imgCheck.setAttribute('onload', 'SVGInject(this)');

                option.appendChild(imgCheck);
            }
            optionsList.appendChild(option);
        }

        optionsWrapper.appendChild(optionsList);
        return optionsWrapper;
    },
    closeModal: function(e) {
        if (e.target.tagName === 'DIALOG') {
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
        this.observer.unobserve(this.btnPriority);
    },
    select: function(e) {
        this.inputPriority.value = parseInt(e.currentTarget.dataset.value);
        this.btnPriorityText.textContent = `P${this.inputPriority.value}`;
        this.btnFlag.className.baseVal = `priority_${this.inputPriority.value}`;
        this.removeModal();
    },
    callBack: function(entries) {
        for (let entry of entries) {
            if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    const bounds = entry.target.getBoundingClientRect();
                    this.dialogElement.style.width = bounds.width + 'px';
                    if ((this.dialogElement.offsetHeight + bounds.bottom) > window.innerHeight) {
                        // if the dialog's height and form item's bottom is greater than window height
                        this.dialogElement.style.transform = `translate(${bounds.x}px, ${bounds.top - this.dialogElement.offsetHeight}px)`;
                    } else {
                        this.dialogElement.style.transform = `translate(${bounds.x}px, ${bounds.bottom}px)`;
                    }
                }
            }
        }
    },
}

/***/ }),

/***/ "./src/containers/project-controller.js":
/*!**********************************************!*\
  !*** ./src/containers/project-controller.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectController: () => (/* binding */ projectController)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/storage */ "./src/storage/storage.js");



const getFormValues = (inputs) => {
    // tasks is empty with local storage
    const obj = {}
    inputs.forEach(input => { 
        if (input.id === 'priority') {
            obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length));
        } else if (input.id === 'due_date' && input.value.length === 0 && [...inputs].find(item => item.id === 'due_time').value.length !== 0) {
            // if time has a value and date does not have a value
                // date set to today's date
            obj[input.id] = new Date().toISOString().split('T')[0];
        } else if (input.value.length !== 0) {
            obj[input.id] = input.value
        }
    });
    console.log(obj)
    return obj;
}

const buildProject = (tasks) => {
    let state = {
        tasks,
        uuid: crypto.randomUUID(),
    }

    return Object.assign(
        {},
        project(state),
    )
}

// creates a project object
    // tasks property created upon object creation
const project = (state) => ({
    type: 'project',
    active: false, // there can only be one project active
    uuid: state.uuid,
    tasks: state.tasks || [],
    addTask: function(inputs) {
        // need to allow user to pick what project to assign the newly/edited task
            // pushes task to respective project
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(task(this.uuid), formValues);

        if (formValues.project && formValues.project !== newTask.uuidProj) {
            console.log(`new uuid proj: ${formValues.project}`);
            console.log(`old uuid proj: ${newTask.uuidProj}`);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
            if (new Date(`${newTask.due_date}T00:00:00`).toDateString() === new Date().toDateString()) {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('addTask', newTask);
            }
        } else {
            this.tasks.push(newTask);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('addTask', newTask);
        }
        projectController.setAllProjects();
        console.log(projectController.today)
        // populateStorage();
    },
    removeTask: function(uuid) {
        // if the remove task is in today
            // remove it from today AND it's respective project
        // if the task's date in today is edited 
            // remove it from only today
        const task = this.findTask(uuid);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        // removes task in respective project
        // console.log(task.uuidProj);
        projectController.allProjects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.uuidTask === uuid) {
                    project.tasks.splice(project.tasks.indexOf(task), 1);
                }
            })
        })
        projectController.setAllProjects();
        // populateStorage();
    },
    updateTask: function(uuid, inputs) {
        console.log(`updateTask() from project-controller.js is running`); // for debugging
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(this.findTask(uuid), formValues);

        console.log(formValues)
        console.log(newTask.due_date);
        debugger
        // if the project is change for a task
        if (formValues.project && formValues.project !== newTask.uuidProj) {
            this.removeTask(newTask.uuidTask);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask');
            if (projectController.findActive().title === 'Today') {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('updateTask', newTask);
            } else {

            }
        } else {
            if (projectController.findActive().title === 'Today') {
                if (new Date(`${newTask.due_date}T00:00:00`).toDateString() === new Date().toDateString()) {
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('updateTask', newTask);
                } else {
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask');
                }
            } else {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('updateTask', newTask);
            }
        }
        projectController.setAllProjects();
        // populateStorage();
    },
    findTask: function(uuid) {
        return this.tasks.find(element => element.uuidTask === uuid);
    },
})


const projectController = {
    inbox: [Object.assign(buildProject(), {title: 'Inbox',})], // will hold tasks assigned to the 'inbox'
    today: [Object.assign(buildProject(), {title: 'Today'})],
    misc: null,
    projects: null,
    allProjects: [],
    addProject: function(inputs) {
        const formValues = getFormValues(inputs);
        this.projects.push(Object.assign(buildProject(), formValues));
        this.setAllProjects()
        // populateStorage();
    },
    remove: function(uuid) {
        this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
        this.setAllProjects();
        // populateStorage();
    },
    find: function(uuid) {
        // return this.projects.find(project => project.uuid === uuid);
        return this.allProjects.find(project => project.uuid === uuid);
    },
    setActive: function(uuid) {
        console.log(`setActive() is running from project-controller.js`) // for debugging
        if (this.findActive()) {
            this.findActive().active = false;
        }
        this.find(uuid).active = true;
    },
    findActive: function() {
        console.log(this.allProjects)
        if (!this.allProjects.find(project => project.active === true)) {
            this.inbox[0].active = true;
            return this.inbox;
        } else {
            return this.allProjects.find(project => project.active === true);
        }
    },
    setAllProjects: function() {
        this.allProjects = this.inbox.concat(this.projects, this.today);
        this.sort()
        ;(0,_storage_storage__WEBPACK_IMPORTED_MODULE_1__.populateStorage)();
    },
    setMiscProjects: function() {
        this.misc = this.inbox.concat(this.today)
    },
    sort: function() {
        const today = new Date().toDateString();
        this.allProjects.forEach(project => {
            if (project.tasks.length > 0 && project.title !== 'Today') {
                project.tasks.forEach(task => {
                    let taskDate = new Date(`${task.due_date}T00:00:00`).toDateString();
                    if (!this.today[0].findTask(task.uuidTask) && taskDate == today) {
                        this.today[0].tasks.push(task);
                    }
                })
            }
        });
        console.log(this.today)
    },
    init: function() {
        this.projects.forEach(obj => {
            Object.assign(obj, buildProject(obj.tasks));
            obj.tasks.forEach(task => {
                task.uuidProj = obj.uuid;
            });
        });

        Object.assign(this.inbox[0], buildProject(this.inbox[0].tasks));
        this.inbox[0].tasks.forEach(task => {
            task.uuidProj = this.inbox[0].uuid;
        })
        this.setAllProjects();
    }
}

const task = (uuid) => {
    const type = 'task';
    const uuidTask = crypto.randomUUID();
    const uuidProj = uuid;
    return { uuidTask, uuidProj, type };
}

/***/ }),

/***/ "./src/containers/pubsub.js":
/*!**********************************!*\
  !*** ./src/containers/pubsub.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pubSub: () => (/* binding */ pubSub)
/* harmony export */ });
const pubSub = {
    subscribers: {},
    subscribe: function(subscriber, handler) {
        if (this.subscribers[subscriber]) {
            delete this.subscribers[subscriber];
        }
        this.subscribers[subscriber] = this.subscribers[subscriber] || [];
        this.subscribers[subscriber].push(handler);
    },
    unsubscribe: function(subscriber,  handler) {
        if (this.subscribers[subscriber]) {
            for (let i = 0; i < this.subscribers[subscriber].length; i++) {
                if (this.subscribers[subscriber][i] === handler) {
                    this.subscribers[subscriber].splice(i, 1);
                    break;
                }
            }
        }
    },
    publish: function(subscriber, data) {
        if (this.subscribers[subscriber]) {
            this.subscribers[subscriber].forEach(function(handler) {
                handler(data);
            })
        }
    }
}

/***/ }),

/***/ "./src/storage/storage.js":
/*!********************************!*\
  !*** ./src/storage/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateStorage: () => (/* binding */ populateStorage),
/* harmony export */   setProjects: () => (/* binding */ setProjects)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project-controller */ "./src/containers/project-controller.js");


// getItem from localStorage
function setProjects() {
    console.log(`setProjects() running from storage.js`);
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox = localStorage.getItem('inbox') ? JSON.parse(localStorage.getItem('inbox')) : _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox;
    // projectController.today = localStorage.getItem('today') ? JSON.parse(localStorage.getItem('today')) : projectController.today;
    // console.log(projectController.projects);
    // console.log(projectController.allProjects);
    // console.log(projectController.today);
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.init();
    // console.log(projectController.projects);
    // console.log(projectController.allProjects);
}

// setItem in localStorage
function populateStorage() {
    console.log(`populateStorage() running from storage.js`);
    localStorage.setItem('projects', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects));
    localStorage.setItem('inbox', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox));
    // localStorage.setItem('today', JSON.stringify(projectController.today));
    // console.log(localStorage.getItem('projects'));
    // console.log(localStorage.getItem('inbox'));
}

/***/ }),

/***/ "./src/utilities/import-all.js":
/*!*************************************!*\
  !*** ./src/utilities/import-all.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ importAll)
/* harmony export */ });
// returns an object and array of file types
function importAll(r) {
    let files = {};
    let filesArr = [];
    r.keys().map(item => {
        files[item.replace('./', '')] = r(item);
        filesArr.push(item.replace('./', ''));
    });

    return { files, filesArr }
}

/***/ }),

/***/ "./src/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf":
/*!***********************************************************!*\
  !*** ./src/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "12e3683f9192436a7be8.ttf";

/***/ }),

/***/ "./src/assets/icons/add.svg":
/*!**********************************!*\
  !*** ./src/assets/icons/add.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c6ca9afee1a32f56188e.svg";

/***/ }),

/***/ "./src/assets/icons/check_small.svg":
/*!******************************************!*\
  !*** ./src/assets/icons/check_small.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "fa7f0c89c7517f202b90.svg";

/***/ }),

/***/ "./src/assets/icons/chevron_down.svg":
/*!*******************************************!*\
  !*** ./src/assets/icons/chevron_down.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "730839144c126385607b.svg";

/***/ }),

/***/ "./src/assets/icons/chevron_left.svg":
/*!*******************************************!*\
  !*** ./src/assets/icons/chevron_left.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3a58c5da8019cc78bea5.svg";

/***/ }),

/***/ "./src/assets/icons/chevron_right.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/chevron_right.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "43d657784c67c9d0a993.svg";

/***/ }),

/***/ "./src/assets/icons/circle.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/circle.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d6e68359dd6b541f7c70.svg";

/***/ }),

/***/ "./src/assets/icons/cog.svg":
/*!**********************************!*\
  !*** ./src/assets/icons/cog.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "21a2bc942cb9bc7cfffa.svg";

/***/ }),

/***/ "./src/assets/icons/date.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/date.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4f56e04d5596f51f140b.svg";

/***/ }),

/***/ "./src/assets/icons/delete.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/delete.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "eac1a29b0fcadff53187.svg";

/***/ }),

/***/ "./src/assets/icons/edit.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/edit.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9c8f3ce5c9c3fc997861.svg";

/***/ }),

/***/ "./src/assets/icons/flag.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/flag.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6a6a1d380cec35c75400.svg";

/***/ }),

/***/ "./src/assets/icons/github-mark/github-mark-white.svg":
/*!************************************************************!*\
  !*** ./src/assets/icons/github-mark/github-mark-white.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7c9c700db7a4d256325c.svg";

/***/ }),

/***/ "./src/assets/icons/github-mark/github-mark.svg":
/*!******************************************************!*\
  !*** ./src/assets/icons/github-mark/github-mark.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "66b1b98c42973cb164d6.svg";

/***/ }),

/***/ "./src/assets/icons/home.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/home.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f8c7c536d6f704fbe961.svg";

/***/ }),

/***/ "./src/assets/icons/inbox.svg":
/*!************************************!*\
  !*** ./src/assets/icons/inbox.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1d45cd0dc21654a08f74.svg";

/***/ }),

/***/ "./src/assets/icons/magnify.svg":
/*!**************************************!*\
  !*** ./src/assets/icons/magnify.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "54ff7732bb1a5ff166c6.svg";

/***/ }),

/***/ "./src/assets/icons/menu.svg":
/*!***********************************!*\
  !*** ./src/assets/icons/menu.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "132af47f7c9ff9c54b7b.svg";

/***/ }),

/***/ "./src/assets/icons/radio_button_unchecked.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/radio_button_unchecked.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6bfeb430abd13c4c8a64.svg";

/***/ }),

/***/ "./src/assets/icons/today.svg":
/*!************************************!*\
  !*** ./src/assets/icons/today.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e0e385e1ed83a44ce819.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/app.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLHNCQUFzQiw2RUFBaUI7QUFDdkMsVUFBVTtBQUNWO0FBQ0E7QUFDQSxzQkFBc0IsNkVBQWlCO0FBQ3ZDLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7O0FDakY4Qzs7QUFFOUM7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsVUFBVTs7QUFFaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFNO0FBQ2xCLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFNO0FBQ2xCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtB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O0FDMUJxRTs7QUFFckU7QUFDTztBQUNQO0FBQ0EsSUFBSSw2RUFBaUI7QUFDckIsSUFBSSw2RUFBaUIscUZBQXFGLDZFQUFpQjtBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkVBQWlCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQSxvREFBb0QsNkVBQWlCO0FBQ3JFLGlEQUFpRCw2RUFBaUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsYUFBYTtBQUNiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0BpY29uZnUvc3ZnLWluamVjdC9kaXN0L3N2Zy1pbmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX3ByaW9yaXR5LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL2hlYWRlci5jc3M/ZTY4YiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzLmNzcz8xYWFhIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3M/NjFjNSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzPzEyZDIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9zaWRlYmFyLmNzcz80ODE2Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3M/OThlOCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2xpc3QuY3NzPzcxNTEiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19wcmlvcml0eS5jc3M/YTJlYSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBcXC5zdmckIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvbWFpbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9tb2RhbF9yZW1vdmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0X3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvdGFza3NfZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy90YXNrc19saXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Rhc2tzX3ByaW9yaXR5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250YWluZXJzL3Byb2plY3QtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udGFpbmVycy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdXRpbGl0aWVzL2ltcG9ydC1hbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTVkdJbmplY3QgLSBWZXJzaW9uIDEuMi4zXG4gKiBBIHRpbnksIGludHVpdGl2ZSwgcm9idXN0LCBjYWNoaW5nIHNvbHV0aW9uIGZvciBpbmplY3RpbmcgU1ZHIGZpbGVzIGlubGluZSBpbnRvIHRoZSBET00uXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IElOQ09SUywgdGhlIGNyZWF0b3JzIG9mIGljb25mdS5jb21cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAvLyBjb25zdGFudHMgZm9yIGJldHRlciBtaW5pZmljYXRpb25cbiAgdmFyIF9DUkVBVEVfRUxFTUVOVF8gPSAnY3JlYXRlRWxlbWVudCc7XG4gIHZhciBfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FXyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSc7XG4gIHZhciBfTEVOR1RIXyA9ICdsZW5ndGgnO1xuICB2YXIgX1NUWUxFXyA9ICdzdHlsZSc7XG4gIHZhciBfVElUTEVfID0gJ3RpdGxlJztcbiAgdmFyIF9VTkRFRklORURfID0gJ3VuZGVmaW5lZCc7XG4gIHZhciBfU0VUX0FUVFJJQlVURV8gPSAnc2V0QXR0cmlidXRlJztcbiAgdmFyIF9HRVRfQVRUUklCVVRFXyA9ICdnZXRBdHRyaWJ1dGUnO1xuXG4gIHZhciBOVUxMID0gbnVsbDtcblxuICAvLyBjb25zdGFudHNcbiAgdmFyIF9fU1ZHSU5KRUNUID0gJ19fc3ZnSW5qZWN0JztcbiAgdmFyIElEX1NVRkZJWCA9ICctLWluamVjdC0nO1xuICB2YXIgSURfU1VGRklYX1JFR0VYID0gbmV3IFJlZ0V4cChJRF9TVUZGSVggKyAnXFxcXGQrJywgXCJnXCIpO1xuICB2YXIgTE9BRF9GQUlMID0gJ0xPQURfRkFJTCc7XG4gIHZhciBTVkdfTk9UX1NVUFBPUlRFRCA9ICdTVkdfTk9UX1NVUFBPUlRFRCc7XG4gIHZhciBTVkdfSU5WQUxJRCA9ICdTVkdfSU5WQUxJRCc7XG4gIHZhciBBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTID0gWydzcmMnLCAnYWx0JywgJ29ubG9hZCcsICdvbmVycm9yJ107XG4gIHZhciBBX0VMRU1FTlQgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXSgnYScpO1xuICB2YXIgSVNfU1ZHX1NVUFBPUlRFRCA9IHR5cGVvZiBTVkdSZWN0ICE9IF9VTkRFRklORURfO1xuICB2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHVzZUNhY2hlOiB0cnVlLFxuICAgIGNvcHlBdHRyaWJ1dGVzOiB0cnVlLFxuICAgIG1ha2VJZHNVbmlxdWU6IHRydWVcbiAgfTtcbiAgLy8gTWFwIG9mIElSSSByZWZlcmVuY2VhYmxlIHRhZyBuYW1lcyB0byBwcm9wZXJ0aWVzIHRoYXQgY2FuIHJlZmVyZW5jZSB0aGVtLiBUaGlzIGlzIGRlZmluZWQgaW5cbiAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzExL2xpbmtpbmcuaHRtbCNwcm9jZXNzaW5nSVJJXG4gIHZhciBJUklfVEFHX1BST1BFUlRJRVNfTUFQID0ge1xuICAgIGNsaXBQYXRoOiBbJ2NsaXAtcGF0aCddLFxuICAgICdjb2xvci1wcm9maWxlJzogTlVMTCxcbiAgICBjdXJzb3I6IE5VTEwsXG4gICAgZmlsdGVyOiBOVUxMLFxuICAgIGxpbmVhckdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgbWFya2VyOiBbJ21hcmtlcicsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0J10sXG4gICAgbWFzazogTlVMTCxcbiAgICBwYXR0ZXJuOiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgcmFkaWFsR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXVxuICB9O1xuICB2YXIgSU5KRUNURUQgPSAxO1xuICB2YXIgRkFJTCA9IDI7XG5cbiAgdmFyIHVuaXF1ZUlkQ291bnRlciA9IDE7XG4gIHZhciB4bWxTZXJpYWxpemVyO1xuICB2YXIgZG9tUGFyc2VyO1xuXG5cbiAgLy8gY3JlYXRlcyBhbiBTVkcgZG9jdW1lbnQgZnJvbSBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cikge1xuICAgIGRvbVBhcnNlciA9IGRvbVBhcnNlciB8fCBuZXcgRE9NUGFyc2VyKCk7XG4gICAgcmV0dXJuIGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnU3RyLCAndGV4dC94bWwnKTtcbiAgfVxuXG5cbiAgLy8gc2VhcmlhbGl6ZXMgYW4gU1ZHIGVsZW1lbnQgdG8gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbWVudCkge1xuICAgIHhtbFNlcmlhbGl6ZXIgPSB4bWxTZXJpYWxpemVyIHx8IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoc3ZnRWxlbWVudCk7XG4gIH1cblxuXG4gIC8vIFJldHVybnMgdGhlIGFic29sdXRlIHVybCBmb3IgdGhlIHNwZWNpZmllZCB1cmxcbiAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVVcmwodXJsKSB7XG4gICAgQV9FTEVNRU5ULmhyZWYgPSB1cmw7XG4gICAgcmV0dXJuIEFfRUxFTUVOVC5ocmVmO1xuICB9XG5cblxuICAvLyBMb2FkIHN2ZyB3aXRoIGFuIFhIUiByZXF1ZXN0XG4gIGZ1bmN0aW9uIGxvYWRTdmcodXJsLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAvLyByZWFkeVN0YXRlIGlzIERPTkVcbiAgICAgICAgICB2YXIgc3RhdHVzID0gcmVxLnN0YXR1cztcbiAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgT0tcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVhNTCwgcmVxLnJlc3BvbnNlVGV4dC50cmltKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgZXJyb3IgKDR4eCBvciA1eHgpXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgMCBjYW4gaW5kaWNhdGUgYSBmYWlsZWQgY3Jvc3MtZG9tYWluIGNhbGxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cblxuICAvLyBDb3B5IGF0dHJpYnV0ZXMgZnJvbSBpbWcgZWxlbWVudCB0byBzdmcgZWxlbWVudFxuICBmdW5jdGlvbiBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKSB7XG4gICAgdmFyIGF0dHJpYnV0ZTtcbiAgICB2YXIgYXR0cmlidXRlTmFtZTtcbiAgICB2YXIgYXR0cmlidXRlVmFsdWU7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbWdFbGVtLmF0dHJpYnV0ZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgLy8gT25seSBjb3B5IGF0dHJpYnV0ZXMgbm90IGV4cGxpY2l0bHkgZXhjbHVkZWQgZnJvbSBjb3B5aW5nXG4gICAgICBpZiAoQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUy5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID09IC0xKSB7XG4gICAgICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAvLyBJZiBpbWcgYXR0cmlidXRlIGlzIFwidGl0bGVcIiwgaW5zZXJ0IGEgdGl0bGUgZWxlbWVudCBpbnRvIFNWRyBlbGVtZW50XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09IF9USVRMRV8pIHtcbiAgICAgICAgICB2YXIgdGl0bGVFbGVtO1xuICAgICAgICAgIHZhciBmaXJzdEVsZW1lbnRDaGlsZCA9IHN2Z0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudENoaWxkICYmIGZpcnN0RWxlbWVudENoaWxkLmxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpID09IF9USVRMRV8pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGlzIGEgdGl0bGUgZWxlbWVudCwga2VlcCBpdCBhcyB0aGUgdGl0bGUgZWxlbWVudFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGVsZW1lbnQgaXMgbm90IGEgdGl0bGUgZWxlbWVudCwgY3JlYXRlIGEgbmV3IHRpdGxlXG4gICAgICAgICAgICAvLyBlbGUsZW10IGFuZCBzZXQgaXQgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfICsgJ05TJ10oJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgX1RJVExFXyk7XG4gICAgICAgICAgICBzdmdFbGVtLmluc2VydEJlZm9yZSh0aXRsZUVsZW0sIGZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2V0IG5ldyB0aXRsZSBjb250ZW50XG4gICAgICAgICAgdGl0bGVFbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2V0IGltZyBhdHRyaWJ1dGUgdG8gc3ZnIGVsZW1lbnRcbiAgICAgICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGFwcGVuZHMgYSBzdWZmaXggdG8gSURzIG9mIHJlZmVyZW5jZWQgZWxlbWVudHMgaW4gdGhlIDxkZWZzPiBpbiBvcmRlciB0byAgdG8gYXZvaWQgSUQgY29sbGlzaW9uXG4gIC8vIGJldHdlZW4gbXVsdGlwbGUgaW5qZWN0ZWQgU1ZHcy4gVGhlIHN1ZmZpeCBoYXMgdGhlIGZvcm0gXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYSBydW5uaW5nIG51bWJlciB3aGljaCBpc1xuICAvLyBpbmNyZW1lbnRlZCB3aXRoIGVhY2ggaW5qZWN0aW9uLiBSZWZlcmVuY2VzIHRvIHRoZSBJRHMgYXJlIGFkanVzdGVkIGFjY29yZGluZ2x5LlxuICAvLyBXZSBhc3N1bWUgdGhhIGFsbCBJRHMgd2l0aGluIHRoZSBpbmplY3RlZCBTVkcgYXJlIHVuaXF1ZSwgdGhlcmVmb3JlIHRoZSBzYW1lIHN1ZmZpeCBjYW4gYmUgdXNlZCBmb3IgYWxsIElEcyBvZiBvbmVcbiAgLy8gaW5qZWN0ZWQgU1ZHLlxuICAvLyBJZiB0aGUgb25seVJlZmVyZW5jZWQgYXJndW1lbnQgaXMgc2V0IHRvIHRydWUsIG9ubHkgdGhvc2UgSURzIHdpbGwgYmUgbWFkZSB1bmlxdWUgdGhhdCBhcmUgcmVmZXJlbmNlZCBmcm9tIHdpdGhpbiB0aGUgU1ZHXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgb25seVJlZmVyZW5jZWQpIHtcbiAgICB2YXIgaWRTdWZmaXggPSBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKztcbiAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gZm9yIGZ1bmN0aW9uYWwgbm90YXRpb25zIG9mIGFuIElSSSByZWZlcmVuY2VzLiBUaGlzIHdpbGwgZmluZCBvY2N1cmVuY2VzIGluIHRoZSBmb3JtXG4gICAgLy8gdXJsKCNhbnlJZCkgb3IgdXJsKFwiI2FueUlkXCIpIChmb3IgSW50ZXJuZXQgRXhwbG9yZXIpIGFuZCBjYXB0dXJlIHRoZSByZWZlcmVuY2VkIElEXG4gICAgdmFyIGZ1bmNJcmlSZWdleCA9IC91cmxcXChcIj8jKFthLXpBLVpdW1xcdzouLV0qKVwiP1xcKS9nO1xuICAgIC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBhbiBJRC4gVGhlIFNWRyBzcGVjIHJlY29tbWVuZHMgdG8gcHV0IHJlZmVyZW5jZWQgZWxlbWVudHMgaW5zaWRlIDxkZWZzPiBlbGVtZW50cywgYnV0XG4gICAgLy8gdGhpcyBpcyBub3QgYSByZXF1aXJlbWVudCwgdGhlcmVmb3JlIHdlIGhhdmUgdG8gc2VhcmNoIGZvciBJRHMgaW4gdGhlIHdob2xlIFNWRy5cbiAgICB2YXIgaWRFbGVtZW50cyA9IHN2Z0VsZW0ucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgIHZhciBpZEVsZW07XG4gICAgLy8gQW4gb2JqZWN0IGNvbnRhaW5pbmcgcmVmZXJlbmNlZCBJRHMgIGFzIGtleXMgaXMgdXNlZCBpZiBvbmx5IHJlZmVyZW5jZWQgSURzIHNob3VsZCBiZSB1bmlxdWlmaWVkLlxuICAgIC8vIElmIHRoaXMgb2JqZWN0IGRvZXMgbm90IGV4aXN0LCBhbGwgSURzIHdpbGwgYmUgdW5pcXVpZmllZC5cbiAgICB2YXIgcmVmZXJlbmNlZElkcyA9IG9ubHlSZWZlcmVuY2VkID8gW10gOiBOVUxMO1xuICAgIHZhciB0YWdOYW1lO1xuICAgIHZhciBpcmlUYWdOYW1lcyA9IHt9O1xuICAgIHZhciBpcmlQcm9wZXJ0aWVzID0gW107XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgaSwgajtcblxuICAgIGlmIChpZEVsZW1lbnRzW19MRU5HVEhfXSkge1xuICAgICAgLy8gTWFrZSBhbGwgSURzIHVuaXF1ZSBieSBhZGRpbmcgdGhlIElEIHN1ZmZpeCBhbmQgY29sbGVjdCBhbGwgZW5jb3VudGVyZWQgdGFnIG5hbWVzXG4gICAgICAvLyB0aGF0IGFyZSBJUkkgcmVmZXJlbmNlYWJsZSBmcm9tIHByb3Blcml0aWVzLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgdGFnTmFtZSA9IGlkRWxlbWVudHNbaV0ubG9jYWxOYW1lOyAvLyBVc2Ugbm9uLW5hbWVzcGFjZWQgdGFnIG5hbWVcbiAgICAgICAgLy8gTWFrZSBJRCB1bmlxdWUgaWYgdGFnIG5hbWUgaXMgSVJJIHJlZmVyZW5jZWFibGVcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gSVJJX1RBR19QUk9QRVJUSUVTX01BUCkge1xuICAgICAgICAgIGlyaVRhZ05hbWVzW3RhZ05hbWVdID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR2V0IGFsbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG1hcHBlZCB0byB0aGUgZm91bmQgSVJJIHJlZmVyZW5jZWFibGUgdGFnc1xuICAgICAgZm9yICh0YWdOYW1lIGluIGlyaVRhZ05hbWVzKSB7XG4gICAgICAgIChJUklfVEFHX1BST1BFUlRJRVNfTUFQW3RhZ05hbWVdIHx8IFt0YWdOYW1lXSkuZm9yRWFjaChmdW5jdGlvbiAobWFwcGVkUHJvcGVydHkpIHtcbiAgICAgICAgICAvLyBBZGQgbWFwcGVkIHByb3BlcnRpZXMgdG8gYXJyYXkgb2YgaXJpIHJlZmVyZW5jaW5nIHByb3BlcnRpZXMuXG4gICAgICAgICAgLy8gVXNlIGxpbmVhciBzZWFyY2ggaGVyZSBiZWNhdXNlIHRoZSBudW1iZXIgb2YgcG9zc2libGUgZW50cmllcyBpcyB2ZXJ5IHNtYWxsIChtYXhpbXVtIDExKVxuICAgICAgICAgIGlmIChpcmlQcm9wZXJ0aWVzLmluZGV4T2YobWFwcGVkUHJvcGVydHkpIDwgMCkge1xuICAgICAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKG1hcHBlZFByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIEFkZCBcInN0eWxlXCIgdG8gcHJvcGVydGllcywgYmVjYXVzZSBpdCBtYXkgY29udGFpbiByZWZlcmVuY2VzIGluIHRoZSBmb3JtICdzdHlsZT1cImZpbGw6dXJsKCNteUZpbGwpXCInXG4gICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChfU1RZTEVfKTtcbiAgICAgIH1cbiAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgU1ZHIGFuZCByZXBsYWNlIElEcyBpbiByZWZlcmVuY2VzLlxuICAgICAgLy8gVG8gZ2V0IGFsbCBkZXNjZW5kaW5nIGVsZW1lbnRzLCBnZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIHNlZW1zIHRvIHBlcmZvcm0gZmFzdGVyIHRoYW4gcXVlcnlTZWxlY3RvckFsbCgnKicpLlxuICAgICAgLy8gU2luY2Ugc3ZnRWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIGRvZXMgbm90IHJldHVybiB0aGUgc3ZnIGVsZW1lbnQgaXRzZWxmLCB3ZSBoYXZlIHRvIGhhbmRsZSBpdCBzZXBhcmF0ZWx5LlxuICAgICAgdmFyIGRlc2NFbGVtZW50cyA9IHN2Z0VsZW1bX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCcqJyk7XG4gICAgICB2YXIgZWxlbWVudCA9IHN2Z0VsZW07XG4gICAgICB2YXIgcHJvcGVydHlOYW1lO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIG5ld1ZhbHVlO1xuICAgICAgZm9yIChpID0gLTE7IGVsZW1lbnQgIT0gTlVMTDspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09IF9TVFlMRV8pIHtcbiAgICAgICAgICAvLyBJZiBlbGVtZW50IGlzIGEgc3R5bGUgZWxlbWVudCwgcmVwbGFjZSBJRHMgaW4gYWxsIG9jY3VyZW5jZXMgb2YgXCJ1cmwoI2FueUlkKVwiIGluIHRleHQgY29udGVudFxuICAgICAgICAgIHZhbHVlID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIHByb3BlcnR5IG5hbWVzIGZvciB3aGljaCBJRHMgd2VyZSBmb3VuZFxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXTsgaisrKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBpcmlQcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgdmFsdWUgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlcGxhY2UgSURzIGluIHhsaW5rOnJlZiBhbmQgaHJlZiBhdHRyaWJ1dGVzXG4gICAgICAgICAgWyd4bGluazpocmVmJywgJ2hyZWYnXS5mb3JFYWNoKGZ1bmN0aW9uKHJlZkF0dHJOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaXJpID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lKTtcbiAgICAgICAgICAgIGlmICgvXlxccyojLy50ZXN0KGlyaSkpIHsgLy8gQ2hlY2sgaWYgaXJpIGlzIG5vbi1udWxsIGFuZCBpbnRlcm5hbCByZWZlcmVuY2VcbiAgICAgICAgICAgICAgaXJpID0gaXJpLnRyaW0oKTtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lLCBpcmkgKyBpZFN1ZmZpeCk7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIElEIHRvIHJlZmVyZW5jZWQgSURzXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpcmkuc3Vic3RyaW5nKDEpXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZGVzY0VsZW1lbnRzWysraV07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICBpZEVsZW0gPSBpZEVsZW1lbnRzW2ldO1xuICAgICAgICAvLyBJZiBzZXQgb2YgcmVmZXJlbmNlZCBJRHMgZXhpc3RzLCBtYWtlIG9ubHkgcmVmZXJlbmNlZCBJRHMgdW5pcXVlLFxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSBhbGwgSURzIHVuaXF1ZS5cbiAgICAgICAgaWYgKCFyZWZlcmVuY2VkSWRzIHx8IHJlZmVyZW5jZWRJZHNbaWRFbGVtLmlkXSkge1xuICAgICAgICAgIC8vIEFkZCBzdWZmaXggdG8gZWxlbWVudCdzIElEXG4gICAgICAgICAgaWRFbGVtLmlkICs9IGlkU3VmZml4O1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiB0cnVlIGlmIFNWRyBlbGVtZW50IGhhcyBjaGFuZ2VkXG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH1cblxuXG4gIC8vIEZvciBjYWNoZWQgU1ZHcyB0aGUgSURzIGFyZSBtYWRlIHVuaXF1ZSBieSBzaW1wbHkgcmVwbGFjaW5nIHRoZSBhbHJlYWR5IGluc2VydGVkIHVuaXF1ZSBJRHMgd2l0aCBhXG4gIC8vIGhpZ2hlciBJRCBjb3VudGVyLiBUaGlzIGlzIG11Y2ggbW9yZSBwZXJmb3JtYW50IHRoYW4gYSBjYWxsIHRvIG1ha2VJZHNVbmlxdWUoKS5cbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZUNhY2hlZChzdmdTdHJpbmcpIHtcbiAgICByZXR1cm4gc3ZnU3RyaW5nLnJlcGxhY2UoSURfU1VGRklYX1JFR0VYLCBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKyk7XG4gIH1cblxuXG4gIC8vIEluamVjdCBTVkcgYnkgcmVwbGFjaW5nIHRoZSBpbWcgZWxlbWVudCB3aXRoIHRoZSBTVkcgZWxlbWVudCBpbiB0aGUgRE9NXG4gIGZ1bmN0aW9uIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoc3ZnRWxlbSkge1xuICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKCdkYXRhLWluamVjdC11cmwnLCBhYnNVcmwpO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBpbWdFbGVtLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3B5QXR0cmlidXRlcykge1xuICAgICAgICAgIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludm9rZSBiZWZvcmVJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGJlZm9yZUluamVjdCA9IG9wdGlvbnMuYmVmb3JlSW5qZWN0O1xuICAgICAgICB2YXIgaW5qZWN0RWxlbSA9IChiZWZvcmVJbmplY3QgJiYgYmVmb3JlSW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0pKSB8fCBzdmdFbGVtO1xuICAgICAgICAvLyBSZXBsYWNlIGltZyBlbGVtZW50IHdpdGggbmV3IGVsZW1lbnQuIFRoaXMgaXMgdGhlIGFjdHVhbCBpbmplY3Rpb24uXG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGluamVjdEVsZW0sIGltZ0VsZW0pO1xuICAgICAgICAvLyBNYXJrIGltZyBlbGVtZW50IGFzIGluamVjdGVkXG4gICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gSU5KRUNURUQ7XG4gICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICAgICAgLy8gSW52b2tlIGFmdGVySW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBhZnRlckluamVjdCA9IG9wdGlvbnMuYWZ0ZXJJbmplY3Q7XG4gICAgICAgIGlmIChhZnRlckluamVjdCkge1xuICAgICAgICAgIGFmdGVySW5qZWN0KGltZ0VsZW0sIGluamVjdEVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNZXJnZXMgYW55IG51bWJlciBvZiBvcHRpb25zIG9iamVjdHMgaW50byBhIG5ldyBvYmplY3RcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKCkge1xuICAgIHZhciBtZXJnZWRPcHRpb25zID0ge307XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBzcGVjaWZpZWQgb3B0aW9ucyBvYmplY3RzIGFuZCBhZGQgYWxsIHByb3BlcnRpZXMgdG8gdGhlIG5ldyBvcHRpb25zIG9iamVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50KSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIG1lcmdlZE9wdGlvbnNba2V5XSA9IGFyZ3VtZW50W2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG4gIH1cblxuXG4gIC8vIEFkZHMgdGhlIHNwZWNpZmllZCBDU1MgdG8gdGhlIGRvY3VtZW50J3MgPGhlYWQ+IGVsZW1lbnRcbiAgZnVuY3Rpb24gYWRkU3R5bGVUb0hlYWQoY3NzKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudFtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ2hlYWQnKVswXTtcbiAgICBpZiAoaGVhZCkge1xuICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oX1NUWUxFXyk7XG4gICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBCdWlsZHMgYW4gU1ZHIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gYnVpbGRTdmdFbGVtZW50KHN2Z1N0ciwgdmVyaWZ5KSB7XG4gICAgaWYgKHZlcmlmeSkge1xuICAgICAgdmFyIHN2Z0RvYztcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBTVkcgc3RyaW5nIHdpdGggRE9NUGFyc2VyXG4gICAgICAgIHN2Z0RvYyA9IHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICBpZiAoc3ZnRG9jW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgncGFyc2VyZXJyb3InKVtfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gRE9NUGFyc2VyIGRvZXMgbm90IHRocm93IGFuIGV4Y2VwdGlvbiwgYnV0IGluc3RlYWQgcHV0cyBwYXJzZXJlcnJvciB0YWdzIGluIHRoZSBkb2N1bWVudFxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdmdEb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gc3ZnU3RyO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBvbmxvYWQgYXR0cmlidXRlLiBTaG91bGQgb25seSBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgdW5zdHlsZWQgaW1hZ2UgZmxhc2ggcHJvdGVjdGlvbiBhbmRcbiAgICAvLyBtYWtlIHRoZSBlbGVtZW50IHZpc2libGUsIG5vdCBmb3IgcmVtb3ZpbmcgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgIGltZ0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdvbmxvYWQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZXJyb3JNZXNzYWdlKG1zZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NWR0luamVjdDogJyArIG1zZyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGZhaWwoaW1nRWxlbSwgc3RhdHVzLCBvcHRpb25zKSB7XG4gICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBGQUlMO1xuICAgIGlmIChvcHRpb25zLm9uRmFpbCkge1xuICAgICAgb3B0aW9ucy5vbkZhaWwoaW1nRWxlbSwgc3RhdHVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlKHN0YXR1cyk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfSU5WQUxJRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX05PVF9TVVBQT1JURUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgZmFpbChpbWdFbGVtLCBMT0FEX0ZBSUwsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKSB7XG4gICAgaW1nRWxlbS5vbmxvYWQgPSBOVUxMO1xuICAgIGltZ0VsZW0ub25lcnJvciA9IE5VTEw7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGltZ05vdFNldChtc2cpIHtcbiAgICBlcnJvck1lc3NhZ2UoJ25vIGltZyBlbGVtZW50Jyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNWR0luamVjdChnbG9iYWxOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgdmFyIHN2Z0xvYWRDYWNoZSA9IHt9O1xuXG4gICAgaWYgKElTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgIC8vIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFNWRywgYWRkIGEgc21hbGwgc3R5bGVzaGVldCB0aGF0IGhpZGVzIHRoZSA8aW1nPiBlbGVtZW50cyB1bnRpbFxuICAgICAgLy8gaW5qZWN0aW9uIGlzIGZpbmlzaGVkLiBUaGlzIGF2b2lkcyBzaG93aW5nIHRoZSB1bnN0eWxlZCBTVkdzIGJlZm9yZSBzdHlsZSBpcyBhcHBsaWVkLlxuICAgICAgYWRkU3R5bGVUb0hlYWQoJ2ltZ1tvbmxvYWRePVwiJyArIGdsb2JhbE5hbWUgKyAnKFwiXXt2aXNpYmlsaXR5OmhpZGRlbjt9Jyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTVkdJbmplY3RcbiAgICAgKlxuICAgICAqIEluamVjdHMgdGhlIFNWRyBzcGVjaWZpZWQgaW4gdGhlIGBzcmNgIGF0dHJpYnV0ZSBvZiB0aGUgc3BlY2lmaWVkIGBpbWdgIGVsZW1lbnQgb3IgYXJyYXkgb2YgYGltZ2BcbiAgICAgKiBlbGVtZW50cy4gUmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IHdoaWNoIHJlc29sdmVzIGlmIGFsbCBwYXNzZWQgaW4gYGltZ2AgZWxlbWVudHMgaGF2ZSBlaXRoZXIgYmVlblxuICAgICAqIGluamVjdGVkIG9yIGZhaWxlZCB0byBpbmplY3QgKE9ubHkgaWYgYSBnbG9iYWwgUHJvbWlzZSBvYmplY3QgaXMgYXZhaWxhYmxlIGxpa2UgaW4gYWxsIG1vZGVybiBicm93c2Vyc1xuICAgICAqIG9yIHRocm91Z2ggYSBwb2x5ZmlsbCkuXG4gICAgICpcbiAgICAgKiBPcHRpb25zOlxuICAgICAqIHVzZUNhY2hlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBTVkcgd2lsbCBiZSBjYWNoZWQgdXNpbmcgdGhlIGFic29sdXRlIFVSTC4gRGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAuXG4gICAgICogY29weUF0dHJpYnV0ZXM6IElmIHNldCB0byBgdHJ1ZWAgdGhlIGF0dHJpYnV0ZXMgd2lsbCBiZSBjb3BpZWQgZnJvbSBgaW1nYCB0byBgc3ZnYC4gRGZhdWx0IHZhbHVlXG4gICAgICogICAgIGlzIGB0cnVlYC5cbiAgICAgKiBtYWtlSWRzVW5pcXVlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBJRCBvZiBlbGVtZW50cyBpbiB0aGUgYDxkZWZzPmAgZWxlbWVudCB0aGF0IGNhbiBiZSByZWZlcmVuY2VzIGJ5XG4gICAgICogICAgIHByb3BlcnR5IHZhbHVlcyAoZm9yIGV4YW1wbGUgJ2NsaXBQYXRoJykgYXJlIG1hZGUgdW5pcXVlIGJ5IGFwcGVuZGluZyBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhXG4gICAgICogICAgIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGluY3JlYXNlcyB3aXRoIGVhY2ggaW5qZWN0aW9uLiBUaGlzIGlzIGRvbmUgdG8gYXZvaWQgZHVwbGljYXRlIElEcyBpbiB0aGUgRE9NLlxuICAgICAqIGJlZm9yZUxvYWQ6IEhvb2sgYmVmb3JlIFNWRyBpcyBsb2FkZWQuIFRoZSBgaW1nYCBlbGVtZW50IGlzIHBhc3NlZCBhcyBhIHBhcmFtZXRlci4gSWYgdGhlIGhvb2sgcmV0dXJuc1xuICAgICAqICAgICBhIHN0cmluZyBpdCBpcyB1c2VkIGFzIHRoZSBVUkwgaW5zdGVhZCBvZiB0aGUgYGltZ2AgZWxlbWVudCdzIGBzcmNgIGF0dHJpYnV0ZS5cbiAgICAgKiBhZnRlckxvYWQ6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGxvYWRlZC4gVGhlIGxvYWRlZCBgc3ZnYCBlbGVtZW50IGFuZCBgc3ZnYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhXG4gICAgICogICAgIHBhcmFtZXRlcnMuIElmIGNhY2hpbmcgaXMgYWN0aXZlIHRoaXMgaG9vayB3aWxsIG9ubHkgZ2V0IGNhbGxlZCBvbmNlIGZvciBpbmplY3RlZCBTVkdzIHdpdGggdGhlXG4gICAgICogICAgIHNhbWUgYWJzb2x1dGUgcGF0aC4gQ2hhbmdlcyB0byB0aGUgYHN2Z2AgZWxlbWVudCBpbiB0aGlzIGhvb2sgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBpbmplY3RlZCBTVkdzXG4gICAgICogICAgIHdpdGggdGhlIHNhbWUgYWJzb2x1dGUgcGF0aC4gSXQncyBhbHNvIHBvc3NpYmxlIHRvIHJldHVybiBhbiBgc3ZnYCBzdHJpbmcgb3IgYHN2Z2AgZWxlbWVudCB3aGljaFxuICAgICAqICAgICB3aWxsIHRoZW4gYmUgdXNlZCBmb3IgdGhlIGluamVjdGlvbi5cbiAgICAgKiBiZWZvcmVJbmplY3Q6IEhvb2sgYmVmb3JlIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuIElmXG4gICAgICogICAgIGFueSBodG1sIGVsZW1lbnQgaXMgcmV0dXJuZWQgaXQgZ2V0cyBpbmplY3RlZCBpbnN0ZWFkIG9mIGFwcGx5aW5nIHRoZSBkZWZhdWx0IFNWRyBpbmplY3Rpb24uXG4gICAgICogYWZ0ZXJJbmplY3Q6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy5cbiAgICAgKiBvbkFsbEZpbmlzaDogSG9vayBhZnRlciBhbGwgYGltZ2AgZWxlbWVudHMgcGFzc2VkIHRvIGFuIFNWR0luamVjdCgpIGNhbGwgaGF2ZSBlaXRoZXIgYmVlbiBpbmplY3RlZCBvclxuICAgICAqICAgICBmYWlsZWQgdG8gaW5qZWN0LlxuICAgICAqIG9uRmFpbDogSG9vayBhZnRlciBpbmplY3Rpb24gZmFpbHMuIFRoZSBgaW1nYCBlbGVtZW50IGFuZCBhIGBzdGF0dXNgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFuIHBhcmFtZXRlci5cbiAgICAgKiAgICAgVGhlIGBzdGF0dXNgIGNhbiBiZSBlaXRoZXIgYCdTVkdfTk9UX1NVUFBPUlRFRCdgICh0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRyksXG4gICAgICogICAgIGAnU1ZHX0lOVkFMSUQnYCAodGhlIFNWRyBpcyBub3QgaW4gYSB2YWxpZCBmb3JtYXQpIG9yIGAnTE9BRF9GQUlMRUQnYCAobG9hZGluZyBvZiB0aGUgU1ZHIGZhaWxlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50IG9yIGFuIGFycmF5IG9mIGltZyBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgd2l0aCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciB0aGlzIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTVkdJbmplY3QoaW1nLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIGFsbEZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvbkFsbEZpbmlzaCA9IG9wdGlvbnMub25BbGxGaW5pc2g7XG4gICAgICAgICAgaWYgKG9uQWxsRmluaXNoKSB7XG4gICAgICAgICAgICBvbkFsbEZpbmlzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW1nICYmIHR5cGVvZiBpbWdbX0xFTkdUSF9dICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgLy8gYW4gYXJyYXkgbGlrZSBzdHJ1Y3R1cmUgb2YgaW1nIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIGluamVjdEluZGV4ID0gMDtcbiAgICAgICAgICB2YXIgaW5qZWN0Q291bnQgPSBpbWdbX0xFTkdUSF9dO1xuXG4gICAgICAgICAgaWYgKGluamVjdENvdW50ID09IDApIHtcbiAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgrK2luamVjdEluZGV4ID09IGluamVjdENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5qZWN0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZ1tpXSwgb3B0aW9ucywgZmluaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb25seSBvbmUgaW1nIGVsZW1lbnRcbiAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZywgb3B0aW9ucywgYWxsRmluaXNoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gcmV0dXJuIGEgUHJvbWlzZSBvYmplY3QgaWYgZ2xvYmFsbHkgYXZhaWxhYmxlXG4gICAgICByZXR1cm4gdHlwZW9mIFByb21pc2UgPT0gX1VOREVGSU5FRF8gPyBydW4oKSA6IG5ldyBQcm9taXNlKHJ1bik7XG4gICAgfVxuXG5cbiAgICAvLyBJbmplY3RzIGEgc2luZ2xlIHN2ZyBlbGVtZW50LiBPcHRpb25zIG11c3QgYmUgYWxyZWFkeSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zLlxuICAgIGZ1bmN0aW9uIFNWR0luamVjdEVsZW1lbnQoaW1nRWxlbSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChpbWdFbGVtKSB7XG4gICAgICAgIHZhciBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSA9IGltZ0VsZW1bX19TVkdJTkpFQ1RdO1xuICAgICAgICBpZiAoIXN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEludm9rZSBiZWZvcmVMb2FkIGhvb2sgaWYgc2V0LiBJZiB0aGUgYmVmb3JlTG9hZCByZXR1cm5zIGEgdmFsdWUgdXNlIGl0IGFzIHRoZSBzcmMgZm9yIHRoZSBsb2FkXG4gICAgICAgICAgLy8gVVJMIHBhdGguIEVsc2UgdXNlIHRoZSBpbWdFbGVtJ3Mgc3JjIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YXIgYmVmb3JlTG9hZCA9IG9wdGlvbnMuYmVmb3JlTG9hZDtcbiAgICAgICAgICB2YXIgc3JjID0gKGJlZm9yZUxvYWQgJiYgYmVmb3JlTG9hZChpbWdFbGVtKSkgfHwgaW1nRWxlbVtfR0VUX0FUVFJJQlVURV9dKCdzcmMnKTtcblxuICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAvLyBJZiBubyBpbWFnZSBzcmMgYXR0cmlidXRlIGlzIHNldCBkbyBubyBpbmplY3Rpb24uIFRoaXMgY2FuIG9ubHkgYmUgcmVhY2hlZCBieSB1c2luZyBqYXZhc2NyaXB0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGlmIG5vIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IHRoZSBvbmxvYWQgYW5kIG9uZXJyb3IgZXZlbnRzIGRvIG5vdCBnZXQgY2FsbGVkXG4gICAgICAgICAgICBpZiAoc3JjID09PSAnJykge1xuICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IGFycmF5IHNvIGxhdGVyIGNhbGxzIGNhbiByZWdpc3RlciBjYWxsYmFja3NcbiAgICAgICAgICB2YXIgb25GaW5pc2hDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IG9uRmluaXNoQ2FsbGJhY2tzO1xuXG4gICAgICAgICAgdmFyIG9uRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihvbkZpbmlzaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYWJzVXJsID0gZ2V0QWJzb2x1dGVVcmwoc3JjKTtcbiAgICAgICAgICB2YXIgdXNlQ2FjaGVPcHRpb24gPSBvcHRpb25zLnVzZUNhY2hlO1xuICAgICAgICAgIHZhciBtYWtlSWRzVW5pcXVlT3B0aW9uID0gb3B0aW9ucy5tYWtlSWRzVW5pcXVlO1xuICAgICAgICAgIFxuICAgICAgICAgIHZhciBzZXRTdmdMb2FkQ2FjaGVWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdLmZvckVhY2goZnVuY3Rpb24oc3ZnTG9hZCkge1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQodmFsKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBzdmdMb2FkID0gc3ZnTG9hZENhY2hlW2Fic1VybF07XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVMb2FkVmFsdWUgPSBmdW5jdGlvbihsb2FkVmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRWYWx1ZSA9PT0gTE9BRF9GQUlMKSB7XG4gICAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9hZFZhbHVlID09PSBTVkdfSU5WQUxJRCkge1xuICAgICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IGxvYWRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnU3RyaW5nID0gbG9hZFZhbHVlWzFdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBsb2FkVmFsdWVbMl07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW07XG5cbiAgICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgaWYgKGhhc1VuaXF1ZUlkcyA9PT0gTlVMTCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJRHMgZm9yIHRoZSBTVkcgc3RyaW5nIGhhdmUgbm90IGJlZW4gbWFkZSB1bmlxdWUgYmVmb3JlLiBUaGlzIG1heSBoYXBwZW4gaWYgcHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5qZWN0aW9uIG9mIGEgY2FjaGVkIFNWRyBoYXZlIGJlZW4gcnVuIHdpdGggdGhlIG9wdGlvbiBtYWtlZElkc1VuaXF1ZSBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzBdID0gaGFzVW5pcXVlSWRzO1xuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMl0gPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNVbmlxdWVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBJRHMgdW5pcXVlIGZvciBhbHJlYWR5IGNhY2hlZCBTVkdzIHdpdGggYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IG1ha2VJZHNVbmlxdWVDYWNoZWQodW5pcXVlSWRzU3ZnU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gc3ZnRWxlbSB8fCBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdmdMb2FkICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgICAgIC8vIFZhbHVlIGZvciB1cmwgZXhpc3RzIGluIGNhY2hlXG4gICAgICAgICAgICAgIGlmIChzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbWUgdXJsIGhhcyBiZWVuIGNhY2hlZCwgYnV0IHZhbHVlIGhhcyBub3QgYmVlbiBsb2FkZWQgeWV0LCBzbyBhZGQgdG8gY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgc3ZnTG9hZC5wdXNoKGhhbmRsZUxvYWRWYWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTG9hZFZhbHVlKHN2Z0xvYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzdmdMb2FkID0gW107XG4gICAgICAgICAgICAgIC8vIHNldCBwcm9wZXJ0eSBpc0NhbGxiYWNrUXVldWUgdG8gQXJyYXkgdG8gZGlmZmVyZW50aWF0ZSBmcm9tIGFycmF5IHdpdGggY2FjaGVkIGxvYWRlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUgPSB0cnVlO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHN2Z0xvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTG9hZCB0aGUgU1ZHIGJlY2F1c2UgaXQgaXMgbm90IGNhY2hlZCBvciBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgICAgbG9hZFN2ZyhhYnNVcmwsIGZ1bmN0aW9uKHN2Z1htbCwgc3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIFhNTCBmcm9tIHRoZSBYSFIgcmVxdWVzdCBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEb2N1bWVudC4gT3RoZXJ3aXNlXG4gICAgICAgICAgICAvLyAoZm9yIGV4YW1wbGUgb2YgSUU5KSwgY3JlYXRlIHRoZSBzdmcgZG9jdW1lbnQgZnJvbSB0aGUgc3ZnIHN0cmluZy5cbiAgICAgICAgICAgIHZhciBzdmdFbGVtID0gc3ZnWG1sIGluc3RhbmNlb2YgRG9jdW1lbnQgPyBzdmdYbWwuZG9jdW1lbnRFbGVtZW50IDogYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBhZnRlckxvYWQgPSBvcHRpb25zLmFmdGVyTG9hZDtcbiAgICAgICAgICAgIGlmIChhZnRlckxvYWQpIHtcbiAgICAgICAgICAgICAgLy8gSW52b2tlIGFmdGVyTG9hZCBob29rIHdoaWNoIG1heSBtb2RpZnkgdGhlIFNWRyBlbGVtZW50LiBBZnRlciBsb2FkIG1heSBhbHNvIHJldHVybiBhIG5ld1xuICAgICAgICAgICAgICAvLyBzdmcgZWxlbWVudCBvciBzdmcgc3RyaW5nXG4gICAgICAgICAgICAgIHZhciBzdmdFbGVtT3JTdmdTdHJpbmcgPSBhZnRlckxvYWQoc3ZnRWxlbSwgc3ZnU3RyaW5nKSB8fCBzdmdFbGVtO1xuICAgICAgICAgICAgICBpZiAoc3ZnRWxlbU9yU3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN2Z0VsZW0gYW5kIHN2Z1N0cmluZyBiZWNhdXNlIG9mIG1vZGlmaWNhdGlvbnMgdG8gdGhlIFNWRyBlbGVtZW50IG9yIFNWRyBzdHJpbmcgaW5cbiAgICAgICAgICAgICAgICAvLyB0aGUgYWZ0ZXJMb2FkIGhvb2ssIHNvIHRoZSBtb2RpZmllZCBTVkcgaXMgYWxzbyB1c2VkIGZvciBhbGwgbGF0ZXIgY2FjaGVkIGluamVjdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2Ygc3ZnRWxlbU9yU3ZnU3RyaW5nID09ICdzdHJpbmcnO1xuICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IGlzU3RyaW5nID8gc3ZnRWxlbU9yU3ZnU3RyaW5nIDogc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBpc1N0cmluZyA/IGJ1aWxkU3ZnRWxlbWVudChzdmdFbGVtT3JTdmdTdHJpbmcsIHRydWUpIDogc3ZnRWxlbU9yU3ZnU3RyaW5nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdmdFbGVtIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gTlVMTDtcbiAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIC8vIHNldCBhbiBhcnJheSB3aXRoIHRocmVlIGVudHJpZXMgdG8gdGhlIGxvYWQgY2FjaGVcbiAgICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShbaGFzVW5pcXVlSWRzLCBzdmdTdHJpbmcsIHVuaXF1ZUlkc1N2Z1N0cmluZ10pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShTVkdfSU5WQUxJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShMT0FEX0ZBSUwpO1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlIGlzIGFuIGFycmF5LiBJbmplY3Rpb24gaXMgbm90IGNvbXBsZXRlIHNvIHJlZ2lzdGVyIGNhbGxiYWNrXG4gICAgICAgICAgICBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBTVkdJbmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBhbiBpbmplY3Rpb24uXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfTtcblxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNWR0luamVjdFxuICAgIFNWR0luamVjdC5jcmVhdGUgPSBjcmVhdGVTVkdJbmplY3Q7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW4gb25lcnJvciBFdmVudCBvZiBhbiBgPGltZz5gIGVsZW1lbnQgdG8gaGFuZGxlIGNhc2VzIHdoZW4gdGhlIGxvYWRpbmcgdGhlIG9yaWdpbmFsIHNyYyBmYWlsc1xuICAgICAqIChmb3IgZXhhbXBsZSBpZiBmaWxlIGlzIG5vdCBmb3VuZCBvciBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRykuIFRoaXMgdHJpZ2dlcnMgYSBjYWxsIHRvIHRoZVxuICAgICAqIG9wdGlvbnMgb25GYWlsIGhvb2sgaWYgYXZhaWxhYmxlLiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB3aWxsIGJlIHNldCBhcyB0aGUgbmV3IHNyYyBhdHRyaWJ1dGVcbiAgICAgKiBmb3IgdGhlIGltZyBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZmFsbGJhY2tTcmNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIGZhbGxiYWNrIHNyY1xuICAgICAqL1xuICAgIFNWR0luamVjdC5lcnIgPSBmdW5jdGlvbihpbWcsIGZhbGxiYWNrU3JjKSB7XG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIGlmIChpbWdbX19TVkdJTkpFQ1RdICE9IEZBSUwpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWcpO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmYWxsYmFja1NyYykge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZmFsbGJhY2tTcmM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93W2dsb2JhbE5hbWVdID0gU1ZHSW5qZWN0O1xuXG4gICAgcmV0dXJuIFNWR0luamVjdDtcbiAgfVxuXG4gIHZhciBTVkdJbmplY3RJbnN0YW5jZSA9IGNyZWF0ZVNWR0luamVjdCgnU1ZHSW5qZWN0Jyk7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTVkdJbmplY3RJbnN0YW5jZTtcbiAgfVxufSkod2luZG93LCBkb2N1bWVudCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL0JlYmFzX05ldWUvQmViYXNOZXVlLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogJ0JlYmFzIE5ldWUnO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG46cm9vdCB7XG4gICAgLyogY3VzdG9tIHZhcmlhYmxlcyAqL1xuICAgIC0tdGV4dC1jb2xvci1wcmltYXJ5OiByZ2IoMzIsIDMyLCAzMik7XG4gICAgLS1wcmlvcml0eS0xLWNvbG9yOiAjZmYzNzAwO1xuICAgIC0tcHJpb3JpdHktMi1jb2xvcjogI2ZmYTUwMDtcbiAgICAtLXByaW9yaXR5LTMtY29sb3I6ICMxZWZmNDc7XG4gICAgLS1wcmlvcml0eS00LWNvbG9yOiAjYjhiOGI4O1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuI3RvZG9fYXBwIHtcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XG59XG5cbiNjb250ZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNjb250ZW50IHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuLm92ZXJsYXlfbWFpbl9jb250ZW50LmRpbSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4jbWFpbl9jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDUlIDUlIDUlIDUlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG59XG5cbiNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLyogZ2VuZXJhbCBzdHlsZXMgZm9yIHNpbWlsYXIgZWxlbWVudHMgZXhpc3Rpbmcgb24gZGlmZmVyZW50IG1vZHVsZXMgKi9cbmJ1dHRvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xufVxuXG5idXR0b246aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYnV0dG9uOm5vdCguYnRuX2NoZWNrYm94X3Rhc2spOm5vdCguYnRuX2RhdGVfdGFzayk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuYnV0dG9uID4gc3ZnLFxuYnV0dG9uID4gKiA+IHN2ZyB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHdpZHRoOiBjbGFtcCgxcmVtLCAyLjV2dywgMnJlbSk7XG59XG5cbmRpYWxvZzpub3QoI3Rhc2tfcHJpb3JpdGllcykge1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBtaW4td2lkdGg6IDMwdnc7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbmRpYWxvZzpub3QoI3Rhc2tfcHJpb3JpdGllcyk6OmJhY2tkcm9wIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5mb3JtX2J1dHRvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4uZm9ybV9idXR0b25zID4gKiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAsIDAsIDAuMyk7XG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+ICo6aG92ZXIge1xuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XG59XG5cbi5mb3JtX2J1dHRvbnMgPiAqOmFjdGl2ZSB7XG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC42KTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xuICAgICNtYWluX2NvbnRlbnQge1xuXG4gICAgfVxuXG4gICAgI21haW5fY29udGVudCA+IDpmaXJzdC1jaGlsZCB7XG4gICAgICAgIHdpZHRoOiA3MCU7XG4gICAgfVxuXG4gICAgI2NvbnRlbnQge1xuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cblxuXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHlCQUF5QjtJQUN6Qiw0Q0FBMkQ7QUFDL0Q7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixxQ0FBcUM7SUFDckMsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixXQUFXO0lBQ1gsWUFBWTtJQUNaLG9DQUFvQztJQUNwQyxVQUFVO0lBQ1YscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksVUFBVTtJQUNWLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLE9BQU87SUFDUCxvQkFBb0I7SUFDcEIsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLFdBQVc7QUFDZjs7QUFFQSxzRUFBc0U7QUFDdEU7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBOztJQUVJLFlBQVk7SUFDWiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQ0FBbUM7SUFDbkMsb0JBQW9CO0lBQ3BCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLDhDQUE4QztBQUNsRDs7QUFFQTtJQUNJOztJQUVBOztJQUVBO1FBQ0ksVUFBVTtJQUNkOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLGFBQWE7SUFDakI7OztBQUdKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ0JlYmFzIE5ldWUnO1xcbiAgICBzcmM6IHVybCgnLi9hc3NldHMvZm9udHMvQmViYXNfTmV1ZS9CZWJhc05ldWUtUmVndWxhci50dGYnKTtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgICAvKiBjdXN0b20gdmFyaWFibGVzICovXFxuICAgIC0tdGV4dC1jb2xvci1wcmltYXJ5OiByZ2IoMzIsIDMyLCAzMik7XFxuICAgIC0tcHJpb3JpdHktMS1jb2xvcjogI2ZmMzcwMDtcXG4gICAgLS1wcmlvcml0eS0yLWNvbG9yOiAjZmZhNTAwO1xcbiAgICAtLXByaW9yaXR5LTMtY29sb3I6ICMxZWZmNDc7XFxuICAgIC0tcHJpb3JpdHktNC1jb2xvcjogI2I4YjhiODtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jdG9kb19hcHAge1xcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuLm92ZXJsYXlfbWFpbl9jb250ZW50IHtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQuZGltIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI21haW5fY29udGVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIHBhZGRpbmc6IDUlIDUlIDUlIDUlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4vKiBnZW5lcmFsIHN0eWxlcyBmb3Igc2ltaWxhciBlbGVtZW50cyBleGlzdGluZyBvbiBkaWZmZXJlbnQgbW9kdWxlcyAqL1xcbmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0b246bm90KC5idG5fY2hlY2tib3hfdGFzayk6bm90KC5idG5fZGF0ZV90YXNrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuYnV0dG9uID4gc3ZnLFxcbmJ1dHRvbiA+ICogPiBzdmcge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiBjbGFtcCgxcmVtLCAyLjV2dywgMnJlbSk7XFxufVxcblxcbmRpYWxvZzpub3QoI3Rhc2tfcHJpb3JpdGllcykge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIG1pbi13aWR0aDogMzB2dztcXG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG5kaWFsb2c6bm90KCN0YXNrX3ByaW9yaXRpZXMpOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxuLmZvcm1fYnV0dG9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiAqIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAsIDAsIDAuMyk7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAycmVtO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gKjpob3ZlciB7XFxuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiAqOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgI21haW5fY29udGVudCB7XFxuXFxuICAgIH1cXG5cXG4gICAgI21haW5fY29udGVudCA+IDpmaXJzdC1jaGlsZCB7XFxuICAgICAgICB3aWR0aDogNzAlO1xcbiAgICB9XFxuXFxuICAgICNjb250ZW50IHtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB9XFxuXFxuXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGNvcmFsO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBwYWRkaW5nOiAwLjYwcmVtIDAuNzVyZW07XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBjb2x1bW4tZ2FwOiAwLjM1cmVtO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xufVxuXG4uaW5wdXRfc2VhcmNoIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICogPiBzdmcge1xuICAgIGhlaWdodDogYXV0bztcbiAgICB3aWR0aDogY2xhbXAoMS42NXJlbSwgNHZ3LCAxLjVyZW0pO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtJQUM5Qix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQ0FBa0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRjb3JhbDtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcGFkZGluZzogMC42MHJlbSAwLjc1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAwLjM1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG5cXG4uaW5wdXRfc2VhcmNoIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XFxufVxcblxcbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICogPiBzdmcge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiBjbGFtcCgxLjY1cmVtLCA0dncsIDEuNXJlbSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciBsaXN0IG9mIHByb2plY3RzIG9uIHRoZSBjb250ZW50IHNlY3Rpb24gKi9cbi8qICNtYWluX2NvbnRlbnQgPiBkaXYgPiBkaXYgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgXG59ICovXG5cbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbn1cblxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xuICAgIGp1c3RpZnktc2VsZjogZW5kO1xufVxuXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICBjb2x1bW4tZ2FwOiAwLjI1cmVtO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9wcm9qZWN0cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsdURBQXVEO0FBQ3ZEOztHQUVHOztBQUVIO0lBQ0ksYUFBYTtJQUNiLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsbUJBQW1CO0FBQ3ZCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlcyBmb3IgbGlzdCBvZiBwcm9qZWN0cyBvbiB0aGUgY29udGVudCBzZWN0aW9uICovXFxuLyogI21haW5fY29udGVudCA+IGRpdiA+IGRpdiA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgXFxufSAqL1xcblxcbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQgMWZyO1xcbn1cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XFxuICAgIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjI1cmVtO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNmb3JtX3Byb2plY3QgPiAjZm9ybSB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICAvKiBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxuICAgICAgICAnaGVhZCBoZWFkJ1xuICAgICAgICAnaW5wdXQgaW5wdXQnXG4gICAgICAgICcuIGJ1dHRvbnMnXG4gICAgO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtaW4td2lkdGg6IGluaGVyaXQ7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQ7XG4gICAgZ3JpZC1yb3ctZ2FwOiAwLjVyZW07ICovXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDAuNXJlbTtcbn1cblxuLyogaW1wYWN0cyBmb3JtX2l0ZW0gZm9yIHRhc2tzX2Zvcm0gKi9cbi5mb3JtX2l0ZW0ge1xuICAgIGdyaWQtYXJlYTogaW5wdXQ7XG4gICAgZGlzcGxheTogZ3JpZDtcbn1cblxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiOzs7Ozs7Ozs7OzJCQVV1QjtJQUN2QixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUEscUNBQXFDO0FBQ3JDO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2Zvcm1fcHJvamVjdCA+ICNmb3JtIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgLyogZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXFxuICAgICAgICAnaGVhZCBoZWFkJ1xcbiAgICAgICAgJ2lucHV0IGlucHV0J1xcbiAgICAgICAgJy4gYnV0dG9ucydcXG4gICAgO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1pbi13aWR0aDogaW5oZXJpdDtcXG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50O1xcbiAgICBncmlkLXJvdy1nYXA6IDAuNXJlbTsgKi9cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4vKiBpbXBhY3RzIGZvcm1faXRlbSBmb3IgdGFza3NfZm9ybSAqL1xcbi5mb3JtX2l0ZW0ge1xcbiAgICBncmlkLWFyZWE6IGlucHV0O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5wcm9qZWN0c19saXN0ID4gKiB7XG4gICAgLyogZGlzcGxheTogZ3JpZDsgKi9cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gKiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyIHNwYW4ge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0ID4gc3BhbiB7XG4gICAgZmxleDogMTtcbn1cblxuLmJ0bl9hZGRfcHJvamVjdCxcbi5idG5fZGVsZXRlX3Byb2plY3Qge1xuICAgIC8qIGRpc3BsYXk6IGdyaWQ7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lOyAqL1xufVxuXG4ubmF2X3Byb2plY3QgPiBpbWcge1xuICAgIHdpZHRoOiBjbGFtcCgxLjE1cmVtLCA0dncsIDEuNXJlbSk7XG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG59XG5cbi5idG5fYWRkX3Byb2plY3QgPiBpbWcsXG4uYnRuX2FkZF9wcm9qZWN0ID4gLmJ0bl9pbWdfd3JhcHBlciA+IGltZyxcbi5idG5fZGVsZXRlX3Byb2plY3QgPiBpbWcge1xuICAgIHdpZHRoOiBjbGFtcCgxLjQ1cmVtLCA0dncsIDEuNXJlbSk7XG59XG5cbi5idG5fYWRkX3Byb2plY3Qge1xuICAgIC8qIGRpc3BsYXk6IGdyaWQ7ICovXG4gICAgLyogZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCAxZnI7ICovXG4gICAgLyogYWxpZ24taXRlbXM6IGNlbnRlcjsgKi9cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcHJvamVjdHNfbGlzdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxPQUFPO0FBQ1g7O0FBRUE7O0lBRUk7O21CQUVlO0FBQ25COztBQUVBO0lBQ0ksa0NBQWtDO0lBQ2xDLG9CQUFvQjtBQUN4Qjs7QUFFQTs7O0lBR0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLDRDQUE0QztJQUM1Qyx5QkFBeUI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnByb2plY3RzX2xpc3QgPiAqIHtcXG4gICAgLyogZGlzcGxheTogZ3JpZDsgKi9cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpob3ZlciBzcGFuIHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IHNwYW4ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleDogMTtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3QgPiBzcGFuIHtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuLmJ0bl9hZGRfcHJvamVjdCxcXG4uYnRuX2RlbGV0ZV9wcm9qZWN0IHtcXG4gICAgLyogZGlzcGxheTogZ3JpZDtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogbm9uZTsgKi9cXG59XFxuXFxuLm5hdl9wcm9qZWN0ID4gaW1nIHtcXG4gICAgd2lkdGg6IGNsYW1wKDEuMTVyZW0sIDR2dywgMS41cmVtKTtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5idG5fYWRkX3Byb2plY3QgPiBpbWcsXFxuLmJ0bl9hZGRfcHJvamVjdCA+IC5idG5faW1nX3dyYXBwZXIgPiBpbWcsXFxuLmJ0bl9kZWxldGVfcHJvamVjdCA+IGltZyB7XFxuICAgIHdpZHRoOiBjbGFtcCgxLjQ1cmVtLCA0dncsIDEuNXJlbSk7XFxufVxcblxcbi5idG5fYWRkX3Byb2plY3Qge1xcbiAgICAvKiBkaXNwbGF5OiBncmlkOyAqL1xcbiAgICAvKiBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IDFmcjsgKi9cXG4gICAgLyogYWxpZ24taXRlbXM6IGNlbnRlcjsgKi9cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjc2lkZWJhciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbiNzaWRlYmFyLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIHRyYW5zaXRpb246IGFsbCAzMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI3NpZGViYXIuc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI3NpZGViYXIgPiAuY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDFyZW07XG4gICAgcGFkZGluZzogMS4yNXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSk7XG4gICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xuICAgIHdpZHRoOiA2NSU7XG59XG5cbi5uYXZfcHJvamVjdCxcbi5uYXZfcHJvamVjdHMge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2x1bW4tZ2FwOiAwLjc1cmVtO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4jc2lkZWJhciA+IC5jb250YWluZXI6aG92ZXIgLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAuYnRuX2FkZF9wcm9qZWN0IHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xuICAgICNzaWRlYmFyIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcbiAgICAgICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgfVxuXG4gICAgI3NpZGViYXIuc2hvdyB7XG4gICAgICAgIHdpZHRoOiAzMCU7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBhbmltYXRpb246IHNsaWRlLWluLXJpZ2h0IDMwMG1zIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICAgICNzaWRlYmFyLmhpZGUge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3gtc2hhZG93OiAxcHggNHB4IDVweCAtMXB4IHJnYmEoMCwgMCwgMCwgMSk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLWluLXJpZ2h0IHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zaWRlYmFyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsdUNBQXVDO0FBQzNDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixvQ0FBb0M7SUFDcEMsNkNBQTZDO0lBQzdDLFVBQVU7QUFDZDs7QUFFQTs7SUFFSSxxQkFBcUI7SUFDckIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLE9BQU87SUFDUCxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixjQUFjO0lBQ2xCOztJQUVBO1FBQ0ksVUFBVTtRQUNWLGNBQWM7UUFDZCwyQ0FBMkM7SUFDL0M7O0lBRUE7UUFDSSxhQUFhO0lBQ2pCOztJQUVBO1FBQ0ksV0FBVztRQUNYLDZDQUE2QztJQUNqRDtBQUNKOztBQUVBO0lBQ0k7UUFDSSw0QkFBNEI7SUFDaEM7O0lBRUE7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjc2lkZWJhciB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHotaW5kZXg6IDk5O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuI3NpZGViYXIuaGlkZSB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jc2lkZWJhci5zaG93IHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDMwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jc2lkZWJhciA+IC5jb250YWluZXIge1xcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDFyZW07XFxuICAgIHBhZGRpbmc6IDEuMjVyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1KTtcXG4gICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xcbiAgICB3aWR0aDogNjUlO1xcbn1cXG5cXG4ubmF2X3Byb2plY3QsXFxuLm5hdl9wcm9qZWN0cyB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xcbiAgICBmbGV4OiAxO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuI3NpZGViYXIgPiAuY29udGFpbmVyOmhvdmVyIC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIG1hcmdpbi1yaWdodDogMC41cmVtXFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgI3NpZGViYXIge1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICB3aWR0aDogaW5oZXJpdDtcXG4gICAgfVxcblxcbiAgICAjc2lkZWJhci5zaG93IHtcXG4gICAgICAgIHdpZHRoOiAzMCU7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIuaGlkZSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lciB7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLWluLXJpZ2h0IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2Zvcm1fdGFzazo6YmFja2Ryb3AgIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbiNmb3JtX3Rhc2sgPiAuZm9ybSB7XG4gICAgcGFkZGluZzogMXJlbTtcbn1cblxuI2Zvcm1fdGFzayA+IC5mb3JtID4gZGl2LFxuLmZvcm1fdGFzayA+IGRpdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDAuNXJlbTtcbn1cblxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2x1bW4tZ2FwOiAwLjI1cmVtO1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC50YXNrX3ByaW9yaXR5IHtcbiAgICBmbGV4OiAxO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5OmhvdmVyIC5pbWdfd3JhcHBlcl9jaGV2cm9uIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC5pbWdfd3JhcHBlcl9jaGV2cm9uIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5mb3JtX2l0ZW0gPiAjcHJvamVjdCB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiA1MCU7XG59XG5cbi5mb3JtX2l0ZW0gPiA6bGFzdC1jaGlsZCB7XG4gICAgbWluLWhlaWdodDogY2xhbXAoMnJlbSwgMnZ3LCAzcmVtKTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBOztJQUVJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksT0FBTztJQUNQLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLHlEQUF5RDtJQUN6RCw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZm9ybV90YXNrOjpiYWNrZHJvcCAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcblxcbiNmb3JtX3Rhc2sgPiAuZm9ybSB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbiNmb3JtX3Rhc2sgPiAuZm9ybSA+IGRpdixcXG4uZm9ybV90YXNrID4gZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbHVtbi1nYXA6IDAuMjVyZW07XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5ID4gLnRhc2tfcHJpb3JpdHkge1xcbiAgICBmbGV4OiAxO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eTpob3ZlciAuaW1nX3dyYXBwZXJfY2hldnJvbiB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5ID4gLmltZ193cmFwcGVyX2NoZXZyb24ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjcHJvamVjdCB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2ZycpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogNTAlO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gOmxhc3QtY2hpbGQge1xcbiAgICBtaW4taGVpZ2h0OiBjbGFtcCgycmVtLCAydncsIDNyZW0pO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYFxuLnRhc2tzX2xpc3Qge1xuICAgIG1hcmdpbi10b3A6IDJyZW1cbn1cblxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQge1xuICAgIHJvdy1nYXA6IDFyZW07XG59XG5cbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleDogMTtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCA+IGRpdiA+IC5mb3JtX3Rhc2sge1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG59XG5cbmRpdltyb2xlPWJ1dHRvbl0ge1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDY2LCA2NiwgNjYsIDAuNSk7XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYm94LXNoYWRvdzogMCAwIDlweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjQ1cmVtO1xufVxuXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDY2LCA2NiwgNjYsIDAuNSk7ICovXG4gICAgcGFkZGluZzogMXJlbSAwLjI1cmVtO1xuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzayB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbn1cblxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXI6IDNweCBzb2xpZDtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi5idG5fY2hlY2tib3hfdGFzayA+IC5jaGVja2JveF9jaXJjbGUgPiBzdmcge1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzazpob3ZlciA+LmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XG4gICAgb3BhY2l0eTogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDI1JSwgdHJhbnNwYXJlbnQpO1xufVxuXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzEge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8yIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XG59XG5cbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMyB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xufVxuXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzQge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS00LWNvbG9yKTtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTsgKi9cbn1cblxuLnRhc2tfbGlzdF9pdGVtX2NvbnRlbnQge1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDAuMTVyZW07XG59XG5cbi50YXNrX2xpc3RfaXRlbV9jb250ZW50ID4gLnRhc2tfbmFtZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIC50YXNrX2FjdGlvbnN7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLnRhc2tfYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5idG5fZGF0ZV90YXNrIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmxpID4gLmJ0bl9hZGRfdGFzayB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICAgIGNvbHVtbi1nYXA6IDAuMjVyZW07XG59XG5cbi5idG5fYWRkX3Rhc2sgPiAuYnRuX2ltZ193cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsT0FBTztJQUNQLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLDhDQUE4QztJQUM5QyxlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtJQUNmLDJDQUEyQztJQUMzQyxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isb0RBQW9EO0lBQ3BELHFCQUFxQjtJQUNyQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFVBQVU7SUFDVixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0lBQzlCLG1FQUFtRTtBQUN2RTs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5Qiw4QkFBOEI7SUFDOUIsbUVBQW1FO0FBQ3ZFOztBQUVBO0lBQ0ksOEJBQThCO0lBQzlCLDhCQUE4QjtJQUM5QixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0lBQzlCLHlFQUF5RTtBQUM3RTs7QUFFQTtJQUNJLE9BQU87SUFDUCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuLnRhc2tzX2xpc3Qge1xcbiAgICBtYXJnaW4tdG9wOiAycmVtXFxufVxcblxcbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgcm93LWdhcDogMXJlbTtcXG59XFxuXFxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4OiAxO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCA+IGRpdiA+IC5mb3JtX3Rhc2sge1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoNjYsIDY2LCA2NiwgMC41KTtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjQ1cmVtO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLyogYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoNjYsIDY2LCA2NiwgMC41KTsgKi9cXG4gICAgcGFkZGluZzogMXJlbSAwLjI1cmVtO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIgPiAuYnRuX2NoZWNrYm94X3Rhc2sge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5idG5fY2hlY2tib3hfdGFzayA+IC5jaGVja2JveF9jaXJjbGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXI6IDNweCBzb2xpZDtcXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzazpob3ZlciA+LmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjUlLCB0cmFuc3BhcmVudCk7XFxufVxcblxcbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMSB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xcbn1cXG5cXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzIge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcXG59XFxuXFxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8zIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XFxufVxcblxcbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfNCB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS00LWNvbG9yKTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpOyAqL1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW1fY29udGVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDAuMTVyZW07XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbV9jb250ZW50ID4gLnRhc2tfbmFtZSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciAudGFza19hY3Rpb25ze1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4udGFza19hY3Rpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLmJ0bl9kYXRlX3Rhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5saSA+IC5idG5fYWRkX3Rhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG4gICAgY29sdW1uLWdhcDogMC4yNXJlbTtcXG59XFxuXFxuLmJ0bl9hZGRfdGFzayA+IC5idG5faW1nX3dyYXBwZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlcyBmb3IgcHJpb3JpdHkgb3B0aW9ucyBmcm9tIHRhc2tzX3ByaW9yaXR5LmpzIG1vZHVsZSAqL1xuI3Rhc2tfcHJpb3JpdGllcyB7XG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA2cHggLTJweCByZ2IoMCwgMCwgMCk7XG59XG5cbiN0YXNrX3ByaW9yaXRpZXMgPiAuY29udGFpbmVyID4gdWwgPiBsaSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGNvbHVtbi1nYXA6IDAuMjVyZW07XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG4jdGFza19wcmlvcml0aWVzID4gLmNvbnRhaW5lciA+IHVsID4gbGk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cblxuLnByaW9yaXR5XzEge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcbn1cblxuLnByaW9yaXR5XzIge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0yLWNvbG9yKTtcbn1cblxuLnByaW9yaXR5XzMge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0zLWNvbG9yKTtcbn1cblxuLnByaW9yaXR5XzQgIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Rhc2tzX3ByaW9yaXR5LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw4REFBOEQ7QUFDOUQ7SUFDSSxtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLHlDQUF5QztBQUM3Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogc3R5bGVzIGZvciBwcmlvcml0eSBvcHRpb25zIGZyb20gdGFza3NfcHJpb3JpdHkuanMgbW9kdWxlICovXFxuI3Rhc2tfcHJpb3JpdGllcyB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA2cHggLTJweCByZ2IoMCwgMCwgMCk7XFxufVxcblxcbiN0YXNrX3ByaW9yaXRpZXMgPiAuY29udGFpbmVyID4gdWwgPiBsaSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbHVtbi1nYXA6IDAuMjVyZW07XFxuICAgIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuI3Rhc2tfcHJpb3JpdGllcyA+IC5jb250YWluZXIgPiB1bCA+IGxpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG5cXG4ucHJpb3JpdHlfMSB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcXG59XFxuXFxuLnByaW9yaXR5XzIge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XFxufVxcblxcbi5wcmlvcml0eV8zIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xcbn1cXG5cXG4ucHJpb3JpdHlfNCAge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0cy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfZm9ybS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2Zvcm0uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2xpc3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19saXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaWRlYmFyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2lkZWJhci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfZm9ybS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2Zvcm0uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2xpc3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19saXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19wcmlvcml0eS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX3ByaW9yaXR5LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IGJ1aWxkSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xuaW1wb3J0IGJ1aWxkU2lkZUJhciBmcm9tICcuL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyJztcbmltcG9ydCBidWlsZE1haW4gZnJvbSAnLi9jb21wb25lbnRzL21haW4nO1xuaW1wb3J0IHsgc2V0UHJvamVjdHMgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XG5pbXBvcnQgYnVpbGRPdmVybGF5IGZyb20gJy4vY29tcG9uZW50cy9vdmVybGF5JztcbmltcG9ydCBTVkdJbmplY3QgZnJvbSAnQGljb25mdS9zdmctaW5qZWN0J1xuLy8gU1ZHSW5qZWN0XG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9AaWNvbmZ1L3N2Zy1pbmplY3RcblxuaW1wb3J0ICcuL2FwcC5jc3MnO1xuXG5jb25zdCBhcHBDb250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJ1aWxkID0ge1xuICAgICAgICBoZWFkZXI6IGJ1aWxkSGVhZGVyLFxuICAgICAgICBzaWRlYmFyOiBidWlsZFNpZGVCYXIsXG4gICAgICAgIG92ZXJsYXk6IGJ1aWxkT3ZlcmxheSxcbiAgICAgICAgbWFpbjogYnVpbGRNYWluLFxuICAgIH1cblxuICAgIGNvbnN0IGFwcCA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRQcm9qZWN0cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBhcHBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBhcHBDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcHBXcmFwcGVyLmlkID0gJ3RvZG9fYXBwJztcbiAgICAgICAgICAgIGFwcENvbnRlbnQuaWQgPSAnY29udGVudCc7XG5cbiAgICAgICAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnVpbGQuaGVhZGVyKCkpO1xuICAgICAgICAgICAgYXBwQ29udGVudC5hcHBlbmRDaGlsZChidWlsZC5vdmVybGF5KCkpO1xuICAgICAgICAgICAgYXBwQ29udGVudC5hcHBlbmRDaGlsZChidWlsZC5zaWRlYmFyKCkpO1xuICAgICAgICAgICAgYXBwQ29udGVudC5hcHBlbmRDaGlsZChidWlsZC5tYWluKCkpO1xuICAgICAgICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChhcHBDb250ZW50KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHBXcmFwcGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBhcHAuaW5pdCgpO1xufSkoKTtcblxuLy9tYWluXG4gICAgLy8gMS4gdmlldyBhbGwgcHJvamVjdHNcbiAgICAvLyAyLiB2aWV3IGFsbCB0b2RvcyBpbiBlYWNoIHByb2plY3RcbiAgICAvLyAzLiBleHBhbmQgYSBzaW5nbGUgdG9kbyB0byBzZWUvZWRpdCBpdHMgZGV0YWlsc1xuICAgIC8vIDQuIGRlbGV0ZSBhIHRvZG9cblxuICAgIC8vIHRvZG8gbGlzdCBpdGVtXG4gICAgICAgIC8vIGNyZWF0ZSBpdGVtIGJ1dHRvblxuICAgICAgICAvLyByZW5kZXJzIGZvcm1cbiAgICAgICAgICAgIC8vIHRpdGxlLCByZXF1aXJlZFxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb25cbiAgICAgICAgICAgIC8vIGR1ZSBkYXRlXG4gICAgICAgICAgICAgICAgLy9yZW5kZXJzIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvZGF5LCB0b21vcnJvdywgbm8gZGF0ZVxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAvLyB0aW1lXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbmNlbCBhbmQgc2F2ZSBidXR0b25cbiAgICAgICAgICAgIC8vIHByb2plY3QgbGFiZWwvdGFnXG4gICAgICAgICAgICAvLyBzdWJtaXRcbiAgICAgICAgLy8gZGVsZXRlXG4gICAgICAgIC8vIGNvbXBsZXRlXG4gICAgICAgIC8vIHJlb3JkZXIgdG9kbyBsaXN0IGl0ZW1cbiAgICAgICAgLy8gY2hhbmdlIHByaW9yaXR5XG4gICAgLy8gY3JlYXRlIG5ldyB0b2RvIGxpc3QgaXRlbVxuXG4vLyB0b2RvIGxpc3QgT0JKRUNUXG4gICAgLy8gdGl0bGVcbiAgICAvLyBkZXNjcmlwdGlvblxuICAgICAgICAvLyBzdWJ0YXNrXG4gICAgLy8gcmVtaW5kZXJcbiAgICAvLyBkdWUgZGF0ZVxuICAgIC8vIHRpbWVcbiAgICAvLyBwcmlvaXJ0eVxuXG4vLyB3ZWJwYWNrIGV4dGVybmFsIGxpYnJhcnk6IGRhdGUtZm5zXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWRkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9hZGQuc3ZnXCIsXG5cdFwiLi9jaGVja19zbWFsbC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hlY2tfc21hbGwuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX2Rvd24uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fZG93bi5zdmdcIixcblx0XCIuL2NoZXZyb25fbGVmdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9sZWZ0LnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9yaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9yaWdodC5zdmdcIixcblx0XCIuL2NpcmNsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Z1wiLFxuXHRcIi4vY29nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jb2cuc3ZnXCIsXG5cdFwiLi9kYXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kYXRlLnN2Z1wiLFxuXHRcIi4vZGVsZXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kZWxldGUuc3ZnXCIsXG5cdFwiLi9lZGl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9lZGl0LnN2Z1wiLFxuXHRcIi4vZmxhZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZmxhZy5zdmdcIixcblx0XCIuL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLXdoaXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9naXRodWItbWFyay9naXRodWItbWFyay13aGl0ZS5zdmdcIixcblx0XCIuL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9naXRodWItbWFyay9naXRodWItbWFyay5zdmdcIixcblx0XCIuL2hvbWUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2hvbWUuc3ZnXCIsXG5cdFwiLi9pbmJveC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaW5ib3guc3ZnXCIsXG5cdFwiLi9tYWduaWZ5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tYWduaWZ5LnN2Z1wiLFxuXHRcIi4vbWVudS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWVudS5zdmdcIixcblx0XCIuL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnXCIsXG5cdFwiLi90b2RheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvdG9kYXkuc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2Fzc2V0cy9pY29ucyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLnN2ZyRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWRkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9hZGQuc3ZnXCIsXG5cdFwiLi9jaGVja19zbWFsbC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hlY2tfc21hbGwuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX2Rvd24uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fZG93bi5zdmdcIixcblx0XCIuL2NoZXZyb25fbGVmdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9sZWZ0LnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9yaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9yaWdodC5zdmdcIixcblx0XCIuL2NpcmNsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Z1wiLFxuXHRcIi4vY29nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jb2cuc3ZnXCIsXG5cdFwiLi9kYXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kYXRlLnN2Z1wiLFxuXHRcIi4vZGVsZXRlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9kZWxldGUuc3ZnXCIsXG5cdFwiLi9lZGl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9lZGl0LnN2Z1wiLFxuXHRcIi4vZmxhZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZmxhZy5zdmdcIixcblx0XCIuL2hvbWUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2hvbWUuc3ZnXCIsXG5cdFwiLi9pbmJveC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaW5ib3guc3ZnXCIsXG5cdFwiLi9tYWduaWZ5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tYWduaWZ5LnN2Z1wiLFxuXHRcIi4vbWVudS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWVudS5zdmdcIixcblx0XCIuL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnXCIsXG5cdFwiLi90b2RheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvdG9kYXkuc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2Fzc2V0cy9pY29ucyBzeW5jIFxcXFwuc3ZnJFwiOyIsIiAgICBpbXBvcnQgSWNvbkFkZCBmcm9tICcuLi9hc3NldHMvaWNvbnMvYWRkLnN2Zyc7XG4gICAgaW1wb3J0IEljb25EZWxldGUgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmcnO1xuICAgIGltcG9ydCBJY29uRWRpdCBmcm9tICcuLi9hc3NldHMvaWNvbnMvZWRpdC5zdmcnO1xuICAgIGltcG9ydCBJY29uQ2lyY2xlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Zyc7XG4gICAgaW1wb3J0IEljb25EYXRlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9kYXRlLnN2Zyc7XG4gICAgaW1wb3J0IEljb25DaGVjayBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2hlY2tfc21hbGwuc3ZnJztcbiAgICAvLyBpbXBvcnQgSWNvbkluYm94IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9pbmJveC5zdmcnO1xuICAgIC8vIGltcG9ydCBJY29uVG9kYXkgZnJvbSAnLi4vYXNzZXRzL2ljb25zL3RvZGF5LnN2Zyc7XG4gICAgLy8gaW1wb3J0IEljb25Qcm9qZWN0IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnJztcblxuICAgIC8vIGltcG9ydCBTVkdJbmplY3QgZnJvbSAnQGljb25mdS9zdmctaW5qZWN0J1xuICAgIC8vIHJldHVybnMgYSBidXR0b24gZWxlbWVudCB0byBjcmVhdGUgYSBwcm9qZWN0L3Rhc2tcbiAgICAvLyBpZiBzcGFuVGV4dCBwcm92aWRlZCwgdGhlbiBhIHNwYW4gZWxlbWVudCBpcyBjcmVhdGVkXG4gICAgY29uc3QgaWNvbnMgPSB7IFxuICAgICAgICBhZGQ6IEljb25BZGQsXG4gICAgICAgIGRlbGV0ZTogSWNvbkRlbGV0ZSxcbiAgICAgICAgZWRpdDogSWNvbkVkaXQsXG4gICAgICAgIGNpcmNsZTogSWNvbkNpcmNsZSxcbiAgICAgICAgY2hlY2tib3g6IEljb25DaGVjayxcbiAgICAgICAgZGF0ZTogSWNvbkRhdGUsXG4gICAgfTtcblxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQnV0dG9uKHR5cGUsIG5hbWUsIHRleHQpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSwgYnV0dG9uQXR0cmlidXRlcyh0eXBlLCBuYW1lKSk7ICAgIFxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpY29uc1t0eXBlXTtcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgXG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdidG5faW1nX3dyYXBwZXInKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAvLyBjb25zdCB0YXNrQ2hlY2tDaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KClcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94Qm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY2hlY2tib3hCb3JkZXIuY2xhc3NMaXN0LmFkZCgnY2hlY2tib3hfY2lyY2xlJyk7XG4gICAgICAgICAgICBjaGVja2JveEJvcmRlci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoY2hlY2tib3hCb3JkZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBidXR0b25BdHRyaWJ1dGVzID0gKHR5cGUsIG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0ge1xuICAgICAgICAgICAgLy8gY2xhc3NOYW1lOiBidG5fZGVsZXRlX3Byb2plY3RcbiAgICAgICAgICAgIGNsYXNzTmFtZTogYGJ0bl8ke3R5cGV9XyR7bmFtZX1gLFxuICAgICAgICAgICAgdHlwZTogYGJ1dHRvbmAsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9IiwiaW1wb3J0IGltcG9ydEFsbCBmcm9tICcuLi91dGlsaXRpZXMvaW1wb3J0LWFsbCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7IC8vIGNvbm5lY3QgLmJ0bl9ob21lIHRvIG1haW5Db250ZW50LnN3aXRjaENvbnRlbnRcbmltcG9ydCBidWlsZFRhc2tzRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3Rhc2tzX2Zvcm0nO1xuaW1wb3J0ICcuLi9zdHlsZXMvaGVhZGVyLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSGVhZGVyKGFwcCwgY29udGVudCkge1xuICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBoZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlci5yZW5kZXIoKSk7XG4gICAgaGVhZGVyLmNhY2hlRE9NKGhlYWRlckVsZW1lbnQpO1xuICAgIGhlYWRlci5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIGhlYWRlckVsZW1lbnQ7XG59XG5cbmNvbnN0IGFzc2V0cyA9IHtcbiAgICBpY29uczogaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi4vYXNzZXRzL2ljb25zJywgdHJ1ZSwgL1xcLnN2ZyQvKSksXG59XG5cbmNvbnN0IGhlYWRlciA9IHtcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuYnRuTWVudSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX21lbnUnKTtcbiAgICAgICAgdGhpcy5idG5Ib21lID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5idG5faG9tZScpO1xuICAgICAgICB0aGlzLmJ0bkFkZFRhc2sgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfdGFzaycpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCk7XG4gICAgICAgIHRoaXMuYnRuSG9tZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCk7IC8vIHRlc3RpbmdcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRUYXNrc0Zvcm0pO1xuICAgIH0sXG4gICAgaGVhZGVyQ29udGVudDoge1xuICAgICAgICBoZWFkZXJMZWZ0OiBbXG4gICAgICAgICAgICB7ZWxlbWVudDogJ2J1dHRvbicsIGNsYXNzOiAnYnRuX21lbnUnLCBjaGlsZEVsZW1lbnQ6ICdpbWcnLCBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1snbWVudS5zdmcnXX0sXG4gICAgICAgICAgICB7ZWxlbWVudDogJ2J1dHRvbicsIGNsYXNzOiAnYnRuX2hvbWUnLCBjaGlsZEVsZW1lbnQ6ICdpbWcnLCBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1snaG9tZS5zdmcnXX0sXG4gICAgICAgICAgICB7ZWxlbWVudDogJ2lucHV0JywgY2xhc3M6ICdpbnB1dF9zZWFyY2gnLCBwbGFjZWhvbGRlcjogJ1NlYXJjaCd9XG4gICAgICAgIF0sXG4gICAgICAgIGhlYWRlclJpZ2h0OiBbXG4gICAgICAgICAgICB7ZWxlbWVudDogJ2J1dHRvbicsIGNsYXNzOiAnYnRuX2FkZF90YXNrJywgY2hpbGRFbGVtZW50OiAnaW1nJywgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ2FkZC5zdmcnXX0sXG4gICAgICAgICAgICAvLyB7ZWxlbWVudDogJ2J1dHRvbicsIGNsYXNzOiAnYnQtc2V0dGluZ3NuJywgY2hpbGRFbGVtZW50OiAnaW1nLCBzcmM6IG51bGx9LFxuICAgICAgICAgICAge2VsZW1lbnQ6ICdhJywgY2xhc3M6ICdnaXRodWInLCBjaGlsZEVsZW1lbnQ6ICdpbWcnLCBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1snZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJ10sIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vbWlrZXlDb3MvdGhlT2RpblByb2plY3QvdHJlZS9tYWluL2phdmFTY3JpcHQvcHJvamVjdHMvdG9kby1saXN0JywgdGFyZ2V0OiAnX2JsYW5rJ31cbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5pZCA9ICduYXZiYXInO1xuXG4gICAgICAgIGZvciAobGV0IHNlY3Rpb24gaW4gdGhpcy5oZWFkZXJDb250ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGxldCB3cmFwcGVyQ2xhc3M7XG4gICAgICAgICAgICBzZWN0aW9uID09PSAnaGVhZGVyTGVmdCcgPyB3cmFwcGVyQ2xhc3MgPSAnbmF2X2xlZnQnIDogd3JhcHBlckNsYXNzID0gJ25hdl9yaWdodCc7XG4gICAgICAgICAgICBoZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQod3JhcHBlckNsYXNzKTtcbiAgICAgICAgICAgIGhlYWRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICAgICAgdGhpcy5oZWFkZXJDb250ZW50W3NlY3Rpb25dLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGhlYWRlckl0ZW0uY2xhc3NMaXN0LmFkZChpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgICAgICBpZiAoJ3BsYWNlaG9sZGVyJyBpbiBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckl0ZW0uc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIGl0ZW0ucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmNoaWxkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1JY29uLnNyYyA9IGl0ZW0uc3JjO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSWNvbi5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVySXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhlYWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJJdGVtKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlckNvbnRhaW5lcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJXcmFwcGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVyRWxlbWVudDtcbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgbGV0IHN1YnNjcmliZXI7XG4gICAgICAgIGlmIChjbGFzc05hbWUuaW5jbHVkZXMoJ2hvbWUnKSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlciA9ICdjb250ZW50JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIgPSAnc2lkZWJhcidcbiAgICAgICAgfVxuICAgICAgICBwdWJTdWIucHVibGlzaChzdWJzY3JpYmVyLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG59IiwiaW1wb3J0IGJ1aWxkUHJvamVjdHMgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0cyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0VGFza3MgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0X3Rhc2tzJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1haW4oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBtYWluLmlkID0gJ21haW5fY29udGVudCc7XG4gICAgbWFpbkNvbnRlbnQuY2FjaGVET00obWFpbik7XG4gICAgbWFpbkNvbnRlbnQucmVuZGVyKCk7XG4gICAgbWFpbkNvbnRlbnQuYmluZEV2ZW50cygpO1xuXG4gICAgcHViU3ViLnN1YnNjcmliZSgnY29udGVudCcsIG1haW5Db250ZW50LnN3aXRjaENvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG1haW47XG59XG5cbmNvbnN0IGJ1aWxkID0ge1xuICAgIHByb2plY3RzOiBidWlsZFByb2plY3RzLFxuICAgIHByb2plY3Q6IGJ1aWxkUHJvamVjdFRhc2tzLFxufVxuXG5leHBvcnQgY29uc3QgbWFpbkNvbnRlbnQgPSB7XG4gICAgYWN0aXZlQ29udGVudDogbnVsbCxcbiAgICBhY3RpdmVUYWI6IG51bGwsXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLm1haW4gPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMubWFpbk92ZXJsYXkgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLm92ZXJsYXlfbWFpbl9jb250ZW50Jyk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGtleSwgdXVpZCkge1xuICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFsncHJvamVjdCddKHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYWluLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKHV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlQ29udGVudChjb250ZW50KTtcbiAgICAgICAgdGhpcy5tYWluLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoQ29udGVudCA9IHRoaXMuc3dpdGNoQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIH0sXG4gICAgc3dpdGNoQ29udGVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgY2xhc3NTdWJzdHJpbmcgPSBlLmNsYXNzTmFtZS5pbmNsdWRlcygnZGVsZXRlJykgPyBlLmNsYXNzTmFtZS5zdWJzdHJpbmcoZS5jbGFzc05hbWUuaW5kZXhPZignXycpICsgMSwgZS5jbGFzc05hbWUubGFzdEluZGV4T2YoJ18nKSkgOiBlLmNsYXNzTmFtZS5zdWJzdHJpbmcoZS5jbGFzc05hbWUubGFzdEluZGV4T2YoJ18nKSArIDEpO1xuICAgICAgICBsZXQgdXVpZCA9IGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnV1aWQgfHwgZS5kYXRhc2V0LmluYm94VXVpZDtcbiAgICAgICAgbGV0IHJlbmRlcktleSA9IE9iamVjdC5rZXlzKGJ1aWxkKS5maW5kKGtleSA9PiBrZXkgPT09IGNsYXNzU3Vic3RyaW5nKTtcbiAgICAgICAgbGV0IGFyZ3MgPSBbJ3Byb2plY3QnLCB1dWlkXTtcblxuICAgICAgICBpZiAocmVuZGVyS2V5ICYmIHV1aWQpIHtcbiAgICAgICAgICAgIC8vIHJlbmRlcnMgcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYihlKTtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSByZW5kZXJLZXk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlbmRlcktleSAmJiAhdXVpZCkge1xuICAgICAgICAgICAgLy8gaWYgaG9tZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcnMgdGhlIHRvZGF5IHNlY3Rpb25cbiAgICAgICAgICAgIGFyZ3NbMV0gPSBwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkO1xuICAgICAgICB9IGVsc2UgaWYgKGNsYXNzU3Vic3RyaW5nID09PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgLy8gaWYgYSBwcm9qZWN0IGlzIHRoZSBjb250ZW50IGFuZCBpcyBkZWxldGVkLFxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcnMgdGhlIGluYm94IHNlY3Rpb25cbiAgICAgICAgICAgIGFyZ3NbMV0gPSBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS51dWlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIoZSk7XG4gICAgICAgICAgICBhcmdzWzBdID0gJ3Byb2plY3RzJztcbiAgICAgICAgfVxuICAgICAgICBtYWluQ29udGVudC5yZW5kZXIoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgfSxcbiAgICBzZXRBY3RpdmVUYWI6IGZ1bmN0aW9uKHRhYikge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgfSxcbiAgICBzZXRBY3RpdmVDb250ZW50OiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLmFjdGl2ZUNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0sXG59IiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuXG4vLyBtaW1pY3MgYWxlcnQgYm94IGNvbmZpcm1pbmcgdGFzay9wcm9qZWN0IHJlbW92YWxcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTW9kYWxSZW1vdmUob2JqKSB7XG4gICAgY29uc29sZS5sb2coYGJ1aWxkTW9kYWxSZW1vdmUoKSBpcyBydW5uaW5nIGZyb20gbW1vZGFsX3JlbW92ZS5qc2ApO1xuICAgIGNvbnN0IGRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKG9iailcbiAgICBkaWFsb2dFbGVtZW50LmlkID0gJ21vZGFsJztcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fcmVtb3ZhbCcpO1xuXG4gICAgY29uc3QgbW9kYWwgPSBidWlsZE1vZGFsKGRpYWxvZ0VsZW1lbnQsIGZvcm0sIG9iaik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtb2RhbC5yZW5kZXIoKSk7XG4gICAgbW9kYWwuY2FjaGVET00oKTtcbiAgICBtb2RhbC5iaW5kRXZlbnRzKCk7XG5cbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7ZGlhbG9nRWxlbWVudC5zaG93TW9kYWwoKTtcbn1cblxuY29uc3QgYnVpbGRNb2RhbCA9IChkaWFsb2dFbGVtZW50LCBmb3JtLCBvYmopID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQsXG4gICAgICAgIGZvcm0sXG4gICAgICAgIHR5cGU6IG9iai50eXBlLFxuICAgICAgICBvYmosXG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBtb2RhbChzdGF0ZSksXG4gICAgKVxuXG59XG5cbmNvbnN0IG1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gICAgZm9ybTogc3RhdGUuZm9ybSxcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIHNlbGVjdGlvbjogc3RhdGUub2JqLFxuICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fY2FuY2VsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICB0ZXh0OiAnRGVsZXRlJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fc3VibWl0X3JlbW92ZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5EZWxldGUgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9zdWJtaXRfcmVtb3ZlJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtID0gdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VGb3JtKTtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIERlbGV0ZT9cbiAgICAgICAgLy8gQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBwcm9qZWN0XG4gICAgICAgIC8vIENhbmNlbCBhbmQgZGVsZXRlIGJ1dHRvbnNcblxuICAgICAgICAvLyBOZWVkIHByb2plY3QudGl0bGUgYW5kIHRhc2submFtZVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICAgICAgY29uc3QgY29uZmlybWF0aW9uTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdW5pcXVlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnRGVsZXRlPydcbiAgICAgICAgY29uZmlybWF0aW9uTWVzc2FnZS50ZXh0Q29udGVudCA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGA7XG4gICAgICAgIHVuaXF1ZVRleHQudGV4dENvbnRlbnQgPSB0aGlzLnNlbGVjdGlvbi50aXRsZSA/IHRoaXMuc2VsZWN0aW9uLnRpdGxlIDogdGhpcy5zZWxlY3Rpb24ubmFtZTtcbiAgICAgICAgY29uZmlybWF0aW9uTWVzc2FnZS5hcHBlbmRDaGlsZCh1bmlxdWVUZXh0KVxuICAgICAgICAvLyA8cD5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxzcGFuPiR7dGhpcy50ZXh0fTwvc3Bhbj4/PC9wPlxuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29uZmlybWF0aW9uTWVzc2FnZSk7XG5cbiAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmVsZW1lbnQpLCBpdGVtLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gaXRlbS50ZXh0O1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAndGFzaycpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJywgdGhpcy5zZWxlY3Rpb24udXVpZFRhc2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3Rpb24udXVpZCk7XG4gICAgICAgICAgICAvLyBwdWJTdWIucHVibGlzaCgncmVtb3ZlUHJvamVjdCcsIHRoaXMuc2VsZWN0aW9uLnV1aWQpO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVByb2plY3QnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgIH0sXG4gICAgY2xvc2VGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpXG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9LFxuICAgIGNsb3NlTW9kYWw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGNsb3NlTW9kYWwgcnVubmluZyBmcm9tIG1vZGFsX3JlbW92ZS5qc2ApO1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdtb2RhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG59KSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRPdmVybGF5KCkge1xuICAgIHJldHVybiBvdmVybGF5LnJlbmRlcigpO1xufVxuXG5jb25zdCBvdmVybGF5ID0ge1xuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gY29udGFpbmVyO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXlfbWFpbl9jb250ZW50Jyk7XG4gICAgICAgIHRoaXMuY2FjaGVET00ob3ZlcmxheSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIHJldHVybiBvdmVybGF5O1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGltT3ZlcmxheSA9IHRoaXMuZGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdkaW0nLCBvdmVybGF5LmRpbU92ZXJsYXkpO1xuICAgIFxuICAgIH0sXG4gICAgZGltT3ZlcmxheTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSB8fCB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2RpbScpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlLmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnZGltJyk7XG4gICAgICAgIH1cbiAgICB9LFxufSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0LWNvbnRyb2xsZXInO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRUYXNrc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19mb3JtJztcbmltcG9ydCB7IHRhc2tzTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfbGlzdCc7XG5cbi8vIHJlbmRlcnMgYSBwcm9qZWN0J3MgcGFnZSBhbmQgaXQncyB0YXNrc1xuLy8gd2hlbiB3ZSBhcmUgYXQgYSBwcm9qZWN0J3MgcGFnZVxuICAgIC8vIHdlIGRlbGV0ZSBpdCBmcm9tIHRoZXJlIG9yIGZyb20gdGhlIHNpZGViYXJcbiAgICAgICAgLy8gY2hhbmdlIGNvbnRlbnQgdG8gaG9tZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcm9qZWN0VGFza3ModXVpZCkge1xuICAgIGNvbnNvbGUubG9nKGB0YXNrcy5qcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBY3RpdmUodXVpZCk7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RDb250cm9sbGVyLmZpbmQodXVpZCk7XG4gICAgcHJvamVjdFRhc2tzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBwcm9qZWN0VGFza3MucmVuZGVyKCk7XG4gICAgcHJvamVjdFRhc2tzLmNhY2hlRE9NKGNvbnRlbnQpO1xuICAgIHByb2plY3RUYXNrcy5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0VGFza3MgPSB7XG4gICAgcHJvamVjdDogbnVsbCxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMucHJvamVjdFRhc2tzQ29udGFpbmVyID0gY29udGFpbmVyXG4gICAgICAgIHRoaXMudWxMaXN0ID0gdGhpcy5wcm9qZWN0VGFza3NDb250YWluZXIucXVlcnlTZWxlY3RvcignLnRhc2tzX2xpc3QnKTtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy51bExpc3QuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfdGFzaycpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkVGFza3NGb3JtKTtcbiAgICAgICAgLy8gdGhpcyB3aWxsIG5lZWQgdG8gZ2VuZXJhdGUgYSBmb3JtXG4gICAgICAgICAgICAvLyByZW1vdmVzIHRoZSBidXR0b25cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGByZW5kZXIoKSBpbiBwcm9qZWN0X3Rhc2tzLmpzIGlzIHJ1bm5pbmdgKTsgLy8gZm9yIGRlYnVnZ2luZ1xuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICAgICAgICAvLyBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7IC8vIHJlbmFtZT9cbiAgICAgICAgXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCd0YXNrc19saXN0Jyk7XG5cbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGFza3NMaXN0LmluaXQoKSk7IC8vIHNvbWV0aGluZyBmaXNoaW5nIGlzIGdvaW5nIG9uXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAndGFzaycsICdBZGQgdGFzaycpKTtcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG5cbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdCk7XG5cblxuICAgICAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbiAgICB9LFxufSIsImltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9idXR0b25zJztcbmltcG9ydCBidWlsZFByb2plY3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfZm9ybSc7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdHMoKSB7XG4gICAgY29uc29sZS5sb2coYHByb2plY3RzLmpzIHJ1bm5pbmdgKTtcblxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ1BST0pFQ1RTJztcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdHMucmVuZGVyKCkpO1xuICAgIFxuICAgIHByb2plY3RzLmNhY2hlRE9NKHByb2plY3RzQ29udGFpbmVyKTtcbiAgICBwcm9qZWN0cy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbn1cblxuY29uc3QgcHJvamVjdHMgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfcHJvamVjdCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkUHJvamVjdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYW5jaG9yV3JhcHBlci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdHMnKTtcblxuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAncHJvamVjdCcsICdBZGQgcHJvamVjdCcpKTsgICAgICAgIFxuICAgICAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnY29udGVudCcsIHBhcmVudENvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZCgnY29udGVudCcpLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoJ2NvbnRlbnQnKS5pbml0KCk7XG4gICAgICAgIHJldHVybiBwYXJlbnRDb250YWluZXI7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzcyc7XG5cbi8vIHJlbmRlcnMgYSBmb3JtIHRvIGNyZWF0ZSBhIHByb2plY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdEZvcm0oKSB7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAnZm9ybV9wcm9qZWN0JztcbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm1Qcm9qZWN0LnJlbmRlcigpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gICAgZm9ybVByb2plY3QuY2FjaGVET00oKTtcbiAgICBmb3JtUHJvamVjdC5iaW5kRXZlbnRzKCk7XG59XG5cbmNvbnN0IGZvcm1Qcm9qZWN0ID0ge1xuICAgIGZvcm1DaGlsZHJlbjoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIG5hbWU6ICd0aXRsZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIFByb2plY3QgVGl0bGUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBmb3JtQnV0dG9uczoge1xuICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF9wcm9qZWN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybV9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNmb3JtIGlucHV0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwgPSB0aGlzLnJlbW92ZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgdGhpcy5yZW1vdmVNb2RhbClcbiAgICAgICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZU1vZGFsKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0Rm9ybSk7XG4gICAgfSxcbiAgICAvLyB0YWtlIGEgbG9vayBhdCByZXN0YXVyYW50IHByb2plY3QncyBjb250YWN0IG1vZHVsZVxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBjb25zdCBmb3JtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgY29uc3QgZm9ybUJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9ybUJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnZm9ybV9idXR0b25zJyk7XG4gICAgICAgIGZvcm1FbGVtZW50LmlkID0gJ2Zvcm0nO1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcik7XG5cbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIHRoaXMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZm9ybUl0ZW0uY2xhc3NMaXN0LmFkZCgnZm9ybV9pdGVtJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5oYXNPd25Qcm9wZXJ0eSgncmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSwgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXSk7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBmb3JtQ2hpbGQ7XG4gICAgICAgICAgICAgICAgbGFiZWwuaHRtbEZvciA9IHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uaWQ7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1JdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGJ0biBpbiB0aGlzLmZvcm1CdXR0b25zKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJ1dHRvbiwgdGhpcy5mb3JtQnV0dG9uc1tidG5dKTtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBidG47XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUJ1dHRvbnMpO1xuXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudFxuICAgIH0sXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0RJQUxPRycpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gb3B0aW9uYWwsIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgICAgLy8gaWYgZm9ybSBpcyB2YWxpZFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gYWRkUHJvamVjdCgpXG4gICAgICAgIC8vIGFkZFByb2plY3QodGhpcy5mb3JtSW5wdXRzKTtcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuYWRkUHJvamVjdCh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAvLyBidWlsZExpc3QubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBtb2R1bGUucmVuZGVyKCkpXG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKCdzaWRlYmFyJykucmVuZGVyKCk7IC8vIHdpbGwgcmVuZGVyIG9ubHkgdGhlIHNpZGViYXJcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3NpZGViYXInKTtcbiAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkTW9kYWxSZW1vdmUgZnJvbSAnLi9tb2RhbF9yZW1vdmUnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0IEljb25JbmJveCBmcm9tICcuLi9hc3NldHMvaWNvbnMvaW5ib3guc3ZnJztcbmltcG9ydCBJY29uVG9kYXkgZnJvbSAnLi4vYXNzZXRzL2ljb25zL3RvZGF5LnN2Zyc7XG5pbXBvcnQgSWNvblByb2plY3QgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2NpcmNsZS5zdmcnO1xuaW1wb3J0ICcuLi9zdHlsZXMvcHJvamVjdHMuY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzJztcblxuY29uc3QgYnVpbGRQcm9qZWN0c0xpc3QgPSAodHlwZSwgY29udGFpbmVyLCBhcnJheSkgPT4ge1xuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB0eXBlLFxuICAgICAgICBhcnJheSxcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIHByb2plY3RzTGlzdChzdGF0ZSksXG4gICAgICAgIHNldEljb25zKHN0YXRlKSxcbiAgICAgICAgKVxufVxuXG4vLyByZW5hbWUgdG8gYnVpbGRQcm9qZWN0c0xpc3QgKD8pXG5leHBvcnQgY29uc3QgYnVpbGRMaXN0ID0ge1xuICAgIG1vZHVsZXM6IFtdLFxuICAgIGFkZDogZnVuY3Rpb24gKHR5cGUsIGNvbnRhaW5lciwgYXJyYXkpIHtcbiAgICAgICAgLy8gbmVlZCB0byBjaGVjayBpZiB0aGUgbW9kdWxlIGV4aXN0cyBhbHJlYWR5XG4gICAgICAgIC8vIGlmIG1vZHVsZSBleGlzdHMsIHRoZW4gdXBkYXRlIGl0J3MgY29udGFpbmVyXG4gICAgICAgIC8vIHByZXZlbnRzIHNpbWlsYXIgbW9kdWxlcyB0byBiZSBhZGRlZFxuICAgICAgICBpZiAodGhpcy5tb2R1bGVzLnNvbWUobW9kdWxlID0+IG1vZHVsZS50eXBlID09PSB0eXBlKSkge1xuICAgICAgICAgICAgdGhpcy5maW5kKHR5cGUpLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlcyA9IFsuLi50aGlzLm1vZHVsZXMsIGJ1aWxkUHJvamVjdHNMaXN0KHR5cGUsIGNvbnRhaW5lciwgYXJyYXkpXTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmZpbmQobW9kdWxlID0+IG1vZHVsZS50eXBlID09PSB0eXBlKTtcbiAgICB9XG59XG5cbmNvbnN0IHByb2plY3RzTGlzdCA9IChzdGF0ZSkgPT4gKHtcbiAgICByZW1vdmVTZWxlY3Rpb246IG51bGwsXG4gICAgYXJyYXk6IHN0YXRlLmFycmF5LFxuICAgIHR5cGU6IHN0YXRlLnR5cGUsXG4gICAgY29udGFpbmVyOiBzdGF0ZS5jb250YWluZXIsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIFxuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0cycpO1xuICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzX2xpc3QnKTtcblxuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpXG4gICAgICAgIHRoaXMuY2FjaGVET00obGlzdCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0KTtcblxuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikgIHsgICAgXG4gICAgICAgIHRoaXMudWxMaXN0ID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSB0aGlzLnVsTGlzdC5maXJzdENoaWxkO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGkgYScpO1xuICAgICAgICB0aGlzLmJ0bkRlbGV0ZVByb2plY3QgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuX2RlbGV0ZV9wcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQcm9qZWN0ID0gdGhpcy5yZW1vdmVQcm9qZWN0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHVibGlzaCA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdyZW1vdmVQcm9qZWN0JywgdGhpcy5yZW1vdmVQcm9qZWN0KTtcbiAgICAgICAgdGhpcy5idG5EZWxldGVQcm9qZWN0LmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlUHJvamVjdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0QW5jaG9ycy5mb3JFYWNoKCBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvclNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3JJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGFuY2hvckltZy5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgIGFuY2hvclNwYW4udGV4dENvbnRlbnQgPSB0aGlzLmFycmF5W2ldLnRpdGxlO1xuICAgICAgICAgICAgYW5jaG9yLmhyZWYgPSBgIyR7dGhpcy5hcnJheVtpXS50aXRsZX07YFxuXG4gICAgICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZCcsIHRoaXMuYXJyYXlbaV0udXVpZCk7XG4gICAgICAgICAgICBhbmNob3IuY2xhc3NMaXN0LmFkZCgnbmF2X3Byb2plY3QnKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmljb25zKS5maW5kKGEgPT4gYSA9PT0gdGhpcy5hcnJheVtpXS50aXRsZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIGFuY2hvckltZy5zcmMgPSB0aGlzLmljb25zW09iamVjdC5rZXlzKHRoaXMuaWNvbnMpLmZpbmQoYSA9PiBhID09PSB0aGlzLmFycmF5W2ldLnRpdGxlLnRvTG93ZXJDYXNlKCkpXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmNob3JJbWcuc3JjID0gdGhpcy5pY29uc1snY2lyY2xlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChhbmNob3JJbWcpO1xuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGFuY2hvclNwYW4pO1xuICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoYW5jaG9yKTtcblxuICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgIT09ICdtaXNjJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGJ1aWxkQnV0dG9uKCdkZWxldGUnLCAncHJvamVjdCcpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5ib3gtdXVpZCcsIHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQpO1xuICAgICAgICAgICAgICAgIGJ1dHRvblNwYW4uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChidXR0b25TcGFuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdEl0ZW1zLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMudWxMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtcyk7XG4gICAgICAgICAgICAvLyBjaGFuZ2VzIGNvbnRlbnQgdG8gdGhlIG5ld2x5IHByb2plY3QgaXMgYWRkZWRcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RzTGlzdEl0ZW1zLmxlbmd0aCA8IHRoaXMuYXJyYXkubGVuZ3RoICYmIHRoaXMudHlwZSA9PT0gJ3NpZGViYXInKSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2NvbnRlbnQnLCBbLi4ubGlzdEl0ZW1zLmNoaWxkcmVuXS5zcGxpY2UoLTEpLnBvcCgpLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWNoZURPTSh0aGlzLnVsTGlzdCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdEl0ZW1zO1xuICAgIH0sXG4gICAgcmVtb3ZlUHJvamVjdDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IHtcbiAgICAgICAgICAgICAgICBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RVVUlEID0gbGlzdEl0ZW0uZGF0YXNldC51dWlkO1xuICAgICAgICAgICAgYnVpbGRNb2RhbFJlbW92ZShwcm9qZWN0Q29udHJvbGxlci5maW5kKHByb2plY3RVVUlEKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudHlwZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlbW92ZVNlbGVjdGlvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICAvLyBPUiB0aGUgcHJvamVjdCdzIHV1aWQgd2Ugd2FudCB0byByZW1vdmUgaXMgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgYWN0aXZlIHByb2plY3QncyB1dWlkXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGNvbnRlbnQgdG8gdGhlIGluYm94XG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkgPT09IHVuZGVmaW5lZCB8fCBlID09PSBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCkge1xuICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgdGhpcy5yZW1vdmVTZWxlY3Rpb24ubGFzdENoaWxkLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucmVtb3ZlKGUpO1xuICAgICAgICAgICAgYnVpbGRMaXN0Lm1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4gbW9kdWxlLnJlbmRlcigpKTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICBidWlsZExpc3QubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uID0gbnVsbCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgcHVibGlzaCgpIHJ1bm5pbmcgZnJvbSBwcm9qZWN0c19pc3QuanNgKTsgLy8gZm9yIGRlYnVnZ2luZ1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWU7XG4gICAgICAgIGxldCBwcm9qZWN0VVVJRCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LnV1aWRcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2NvbnRlbnQnLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3NpZGViYXInfHwgdGhpcy50eXBlID09PSAnbWlzYycpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdzaWRlYmFyJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyQ2FjaGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVsTGlzdCA9IG51bGw7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0SXRlbXMgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEFuY2hvcnMgPSBudWxsO1xuICAgICAgICB0aGlzLmJ0bkRlbGV0ZVByb2plY3QgPSBudWxsO1xuICAgIH0sXG59KVxuXG5jb25zdCBzZXRJY29ucyA9IChzdGF0ZSkgPT4ge1xuICAgIGxldCBpY29ucyA9IHt9XG5cbiAgICBpZiAoc3RhdGUudHlwZSA9PT0gJ21pc2MnKSB7XG4gICAgICAgIGljb25zLmljb25zID0geyBpbmJveDogSWNvbkluYm94LCB0b2RheTogSWNvblRvZGF5IH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWNvbnMuaWNvbnMgPSB7IGNpcmNsZTogSWNvblByb2plY3QgfTtcbiAgICB9XG4gICAgcmV0dXJuIGljb25zO1xufSIsImltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vLi4vdXRpbGl0aWVzL2ltcG9ydC1hbGwnO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkUHJvamVjdEZvcm0gZnJvbSAnLi4vcHJvamVjdHNfZm9ybSc7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL3Byb2plY3RzX2xpc3QnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvc2lkZWJhci5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFNpZGViYXIoY29udGVudCkge1xuICAgIGNvbnN0IHNpZGViYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2lkZWJhcldyYXBwZXIuaWQgPSAnc2lkZWJhcic7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgc2lkZWJhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNpZGViYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICBzaWRlYmFyV3JhcHBlci5hcHBlbmRDaGlsZChzaWRlYmFyLnJlbmRlcigpKTtcbiAgICBzaWRlYmFyLmNhY2hlRE9NKHNpZGViYXJXcmFwcGVyKTtcbiAgICBzaWRlYmFyLmJpbmRFdmVudHMoKTtcblxuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3NpZGViYXInLCBzaWRlYmFyLnRvZ2dsZVNpZGViYXIpO1xuICAgIHJldHVybiBzaWRlYmFyV3JhcHBlcjtcbn1cblxuY29uc3QgYXNzZXRzID0ge1xuICAgIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi8uLi9hc3NldHMvaWNvbnMnLCBmYWxzZSwgL1xcLnN2ZyQvKSksXG59XG5cbmNvbnN0IHNpZGViYXIgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnNpZGViYXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2lkZWJhcldyYXBwZXIgPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLnNpZGViYXJfd3JhcHBlcicpO1xuICAgICAgICB0aGlzLnByb2plY3RzQ29udGFpbmVyID0gdGhpcy5zaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0c19jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5hbmNob3JQcm9qZWN0cyA9IHRoaXMucHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5hdl9wcm9qZWN0cycpO1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfcHJvamVjdCcpO1xuXG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyID0gdGhpcy50b2dnbGVTaWRlYmFyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHVibGlzaCA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFByb2plY3RGb3JtKTtcbiAgICAgICAgdGhpcy5hbmNob3JQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZVNpZGViYXIpO1xuICAgICAgICB0aGlzLmNhbGxEaW1PdmVybGF5ID0gdGhpcy5jYWxsRGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxsRGltT3ZlcmxheSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBzaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuc2V0TWlzY1Byb2plY3RzKCk7XG4gICAgICAgIGNvbnN0IG5hdk1pc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnbWlzYycsIG5hdk1pc2MsIHByb2plY3RDb250cm9sbGVyLm1pc2MpO1xuICAgICAgICBidWlsZExpc3QuZmluZChgbWlzY2ApLmluaXQoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBhbmNob3JXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RzQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgIC8vIHNpZGViYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfd3JhcHBlcicpO1xuICAgICAgICBzaWRlYmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5pZCA9ICdwcm9qZWN0c19jb250YWluZXInO1xuICAgICAgICBuYXZNaXNjLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzX21pc2NfY29udGFpbmVyJyk7XG5cbiAgICAgICAgcHJvamVjdHNBbmNob3IudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgICAgICBwcm9qZWN0c0FuY2hvci5ocmVmID0gJyNwcm9qZWN0cyc7XG4gICAgICAgIHByb2plY3RzQW5jaG9yLmNsYXNzTGlzdC5hZGQoJ25hdl9wcm9qZWN0cycpXG5cbiAgICAgICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChwcm9qZWN0c0FuY2hvcik7XG4gICAgICAgIGFuY2hvcldyYXBwZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oJ2FkZCcsICdwcm9qZWN0JykpO1xuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChhbmNob3JXcmFwcGVyKTtcblxuICAgICAgICBidWlsZExpc3QuYWRkKCdzaWRlYmFyJywgcHJvamVjdHNDb250YWluZXIsIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoYHNpZGViYXJgKS5pbml0KCk7XG5cbiAgICAgICAgc2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChuYXZNaXNjKTtcbiAgICAgICAgc2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBzaWRlYmFyQ29udGFpbmVyO1xuICAgIH0sXG4gICAgdG9nZ2xlU2lkZWJhcjogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5zaWRlYmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyKCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxsRGltT3ZlcmxheSgpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyKCk7XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgZS5jdXJyZW50VGFyZ2V0KTtcbiAgICB9LFxuICAgIGNhbGxEaW1PdmVybGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2RpbScsIHRoaXMuc2lkZWJhcik7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCBidWlsZFByaW9yaXR5T3B0aW9ucyBmcm9tICcuLi9jb21wb25lbnRzL3Rhc2tzX3ByaW9yaXR5JztcbmltcG9ydCAnLi4vc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzJ1xuaW1wb3J0IEljb25GbGFnIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9mbGFnLnN2Zyc7XG5pbXBvcnQgSWNvbkNoZXZyb25Eb3duIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnJztcblxuY29uc3QgYnVpbGRUYXNrRm9ybSA9ICh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCkgPT4ge1xuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgdHlwZSxcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIGlmIChidXR0b24uaGFzQXR0cmlidXRlKCdyb2xlJykpIHtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5idXR0b24gPSBidXR0b247XG4gICAgICAgIHN0YXRlLmJ1dHRvblBhcmVudCA9IGJ1dHRvblBhcmVudDtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGZvcm1UYXNrKHN0YXRlKSxcbiAgICAgICAgICAgIG5vbk1vZGFsKHN0YXRlKSxcbiAgICAgICAgICAgIGZvcm1JbnB1dHMoc3RhdGUpLFxuICAgICAgICApXG4gICAgfVxuXG4gICAgc3RhdGUuZGlhbG9nRWxlbWVudCA9IGRpYWxvZ0VsZW1lbnQ7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBmb3JtVGFzayhzdGF0ZSksXG4gICAgICAgIG1vZGFsKHN0YXRlKSxcbiAgICAgICAgZm9ybUlucHV0cyhzdGF0ZSksXG4gICAgKVxufVxuXG5leHBvcnQgY29uc3QgYnVpbGRGb3JtID0ge1xuICAgIHNlY3Rpb25zOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uICh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAvLyBpZiBzZWN0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMsIHVwZGF0ZSBpdCdzIGNvbnRhaW5lclxuICAgICAgICAvLyBwcmV2ZW50cyBzaW1pbGFyIHNlY3Rpb25zIHRvIGJlIGFkZGVkXG4gICAgICAgIGlmICh0aGlzLmZpbmQodHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZCh0eXBlKS5jbG9zZUZvcm0oKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSBbLi4udGhpcy5zZWN0aW9ucywgYnVpbGRUYXNrRm9ybSh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCldO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMuc3BsaWNlKHRoaXMuc2VjdGlvbnMuaW5kZXhPZih0aGlzLmZpbmQodHlwZSkpLCAxKTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnMuZmluZChzZWN0aW9uID0+IHNlY3Rpb24udHlwZSA9PT0gdHlwZSk7XG4gICAgfVxufVxuXG4vLyByZW5kZXJzIGEgZm9ybSB0byBjcmVhdGUgYSB0YXNrXG4gICAgLy8gb25lIG5lZWRzIHRvIGJlIGEgZGlhbG9nIGVsZW1lbnRcbiAgICAvLyBvbmUgbmVlZHMgdG8gYmUgYSBub24tZGlhbG9nIGVsZW1lbnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVGFza3NGb3JtKGUpIHtcbiAgICBjb25zdCBidXR0b24gPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgYnV0dG9uUGFyZW50ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBpZiAoIWJ1dHRvbi5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSAmJiBidXR0b25QYXJlbnQudGFnTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2Zvcm0nKTtcbiAgICAgICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LmlkID0gJ2Zvcm1fdGFzayc7XG4gICAgICAgIGJ1aWxkRm9ybS5hZGQoJ21vZGFsJywgZm9ybSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGRpYWxvZ0VsZW1lbnQpO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkucmVuZGVyKCkpO1xuICAgICAgICBidWlsZEZvcm0uZmluZChgbW9kYWxgKS5jYWNoZURPTSgpO1xuICAgICAgICBidWlsZEZvcm0uZmluZChgbW9kYWxgKS5iaW5kRXZlbnRzKCk7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtX3Rhc2snKTtcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnJlcGxhY2VXaXRoKGZvcm0pO1xuICAgICAgICBidWlsZEZvcm0uYWRkKCdkZWZhdWx0JywgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQpXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnVpbGRGb3JtLmZpbmQoYGRlZmF1bHRgKS5yZW5kZXIoKSk7XG4gICAgICAgIGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkuY2FjaGVET00oKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYGRlZmF1bHRgKS5iaW5kRXZlbnRzKCk7XG4gICAgfVxufVxuXG5jb25zdCBmb3JtVGFzayA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIGZvcm06IHN0YXRlLmZvcm0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX2NhbmNlbCcpO1xuICAgICAgICB0aGlzLmJ0blN1Ym1pdCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF90YXNrJykgfHwgdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXBkYXRlX3Rhc2snKTtcbiAgICAgICAgdGhpcy5mb3JtSW5wdXRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrX2lucHV0Jyk7XG4gICAgICAgIHRoaXMuYnRuUHJpb3JpdHkgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI2J0bl9wcmlvcml0eScpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlRm9ybSA9IHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VGb3JtKTtcbiAgICAgICAgdGhpcy5idG5Qcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkUHJpb3JpdHlPcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1bkJpbmRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGZvcm1CdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fYnV0dG9ucycpO1xuICAgICAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gdGhpcy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKCdmb3JtX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmhhc093blByb3BlcnR5KCdlbGVtZW50JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGxhYmVsLmh0bWxGb3IgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMuaWQ7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMucGxhY2Vob2xkZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBpZGVhLCBtYWtlIHNlcGFyYXRlIG1vZHVsZSBmb3Igb3B0aW9ucyBidXR0b25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSA0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5vcHRpb25zLmVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucy5hdHRyaWJ1dGVzKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uc2liaWxpbmcuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnV0dG9uLCB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCksIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmNoaWxkLmVsZW1lbnQpLCBpdGVtLmNoaWxkLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBidG4gaW4gdGhpcy5mb3JtQnV0dG9ucykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihidXR0b24sIHRoaXMuZm9ybUJ1dHRvbnNbYnRuXSk7XG4gICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYnRuO1xuXG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBmb3JtQnV0dG9ucy5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkuYWRkVGFzayh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUZvcm0oKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXNldE9sZFRhc2snLCB0aGlzLmJ1dHRvbik7IC8vIHRlc3RpbmdcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQodGhpcy5saXN0SXRlbS5kYXRhc2V0LnV1aWRQcm9qKS51cGRhdGVUYXNrKHRoaXMubGlzdEl0ZW0uZGF0YXNldC51dWlkLCB0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGNsb3NlRm9ybSgpIGZyb20gdGFza3NfZnJvbS5qcyBpcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgaWYgKCF0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5yZXBsYWNlV2l0aCh0aGlzLmJ1dHRvbik7XG4gICAgICAgICAgICBidWlsZEZvcm0ucmVtb3ZlKHRoaXMudHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Jlc2V0T2xkVGFzaycpOyAvLyB0ZXN0aW5nXG4gICAgfVxufSk7XG5cbmNvbnN0IG5vbk1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGJ1dHRvbjogc3RhdGUuYnV0dG9uLFxuICAgIHBhcmVudEJ1dHRvbjogc3RhdGUuYnV0dG9uUGFyZW50LFxufSk7XG5cbmNvbnN0IG1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdmb3JtX3Rhc2snKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGJ1aWxkRm9ybS5yZW1vdmUodGhpcy50eXBlKTtcbiAgICB9LFxufSk7XG5cbmNvbnN0IGZvcm1JbnB1dHMgPSAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrSXRlbSA9IHN0YXRlLmJ1dHRvbiA/IHN0YXRlLmJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcudGFza19saXN0X2l0ZW0nKSA6IG51bGw7XG4gICAgY29uc3QgcHJvamVjdCA9IHRhc2tJdGVtID8gcHJvamVjdENvbnRyb2xsZXIuZmluZCh0YXNrSXRlbS5kYXRhc2V0LnV1aWRQcm9qKSA6IG51bGw7XG4gICAgY29uc3QgdGFzayA9IHRhc2tJdGVtPyBwcm9qZWN0LmZpbmRUYXNrKHRhc2tJdGVtLmRhdGFzZXQudXVpZCkgOiBudWxsO1xuICAgIFxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGZvcm1DaGlsZCBpbiBpbnB1dHMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZXQgYXR0cmlidXRlcyA9IGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgLy8gZmluZHMgdGFzaydzIGtleSBlcXVhbCB0byBpbnB1dCdzIGlkXG4gICAgICAgICAgICBsZXQga2V5ID0gT2JqZWN0LmtleXModGFzaykuZmluZChpdGVtID0+IGl0ZW0gPT09IGF0dHJpYnV0ZXMuaWQpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMgJiYga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dHMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgIT09ICdkdWVEYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1DaGlsZCA9PT0gJ3ByaW9yaXR5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLmNsYXNzTmFtZSA9IGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZy5jaGlsZHJlblsxXS5hdHRyaWJ1dGVzLnRleHRDb250ZW50ID0gYFAke3Rhc2sucHJpb3JpdHl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0geyB2YWx1ZTogdGFza1trZXldIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHsgdmFsdWU6IG5ldyBEYXRlKHRhc2tba2V5XSkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXIgPSB0YXNrW2tleV07XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0ub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IG51bWJlciB9LCB7IHRleHQ6IHRleHQgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXRzID0ge1xuICAgICAgICBmb3JtQ2hpbGRyZW46IHtcbiAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1Rhc2sgbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICd0ZXh0YXJlYScsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGR1ZURhdGU6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdkdWVfZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdEdWUgRGF0ZScsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGR1ZVRpbWU6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdkdWVfdGltZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAndGltZScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lJyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdUaW1lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpb3JpdHk6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdQcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2liaWxpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnYnRuX3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdQcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW1nX3dyYXBwZXJfZmxhZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBJY29uRmxhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAncHJpb3JpdHlfNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19wcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICdQNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ltZ193cmFwcGVyX2NoZXZyb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25DaGV2cm9uRG93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY2hldnJvbl9kb3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9qZWN0OiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3Byb2plY3QnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Byb2plY3QnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1Byb2plY3QnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdvcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0c1tpXS51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzW2ldLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLmJ1dHRvbiAmJiBwcm9qZWN0Q29udHJvbGxlci5maW5kKHN0YXRlLmJ1dHRvbi5maXJzdENoaWxkLmRhdGFzZXQudXVpZFByb2opKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdENvbnRyb2xsZXIuZmluZChzdGF0ZS5idXR0b24uZmlyc3RDaGlsZC5kYXRhc2V0LnV1aWRQcm9qKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdENvbnRyb2xsZXIuZmluZChzdGF0ZS5idXR0b24uZmlyc3RDaGlsZC5kYXRhc2V0LnV1aWRQcm9qKS51dWlkID09PSBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0c1tpXS51dWlkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb2plY3QsIHsgc2VsZWN0ZWQ6IHRydWUgfSwgeyBkZWZhdWx0U2VsZWN0ZWQgOiB0cnVlfSkgOiBwcm9qZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzW2ldLnV1aWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvamVjdCwgeyBzZWxlY3RlZDogdHJ1ZSB9LCB7IGRlZmF1bHRTZWxlY3RlZCA6IHRydWV9KSA6IHByb2plY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBmb3JtQnV0dG9uczoge1xuICAgICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGJ1dHRvbiBjbGlja2VkIGhhcyAncm9sZScgYXR0cmlidXRlXG4gICAgICAgIC8vIGFzc2lnbiBmb3JtQ2hpbGRyZW4gd2l0aCBhIHNhdmUtYnV0dG9uXG4gICAgICAgIC8vIGFzc2lnbiBmb3JtVGFzayB3aXRoIGEgY29udGVudCBwcm9wZXJ0eS9pbml0IGZ1bmN0aW9uXG4gICAgLy8gb3RoZXJ3aXNlLCBcbiAgICAgICAgLy8gYXNzaWduIGZvcm1DaGlsZHJlbiB3aXRoIG9ubHkgYSBhZGQtYnV0dG9uXG4gICAgaWYgKHN0YXRlLmJ1dHRvbiAmJiBzdGF0ZS5idXR0b24uaGFzQXR0cmlidXRlKCdyb2xlJykpIHtcbiAgICAgICAgY29uc3QgaW5wdXRzRWRpdCA9IHtcbiAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIHNhdmU6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fdXBkYXRlX3Rhc2snLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcDoge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtOiBzdGF0ZS5idXR0b24uZmlyc3RDaGlsZCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMuZm9ybUJ1dHRvbnMsIGlucHV0c0VkaXQuYnV0dG9uKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMsIGlucHV0c0VkaXQucHJvcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5wdXRzQWRkID0ge1xuICAgICAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF90YXNrJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0cy5mb3JtQnV0dG9ucywgaW5wdXRzQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0cztcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkTW9kYWxSZW1vdmUgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbF9yZW1vdmUnO1xuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfZm9ybSc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy90YXNrc19saXN0LmNzcyc7XG5cbmV4cG9ydCBjb25zdCB0YXNrc0xpc3QgPSB7XG4gICAgcmVtb3ZlU2VsZWN0aW9uOiBudWxsLFxuICAgIGJ0bkRlbGV0ZVRhc2s6IFtdLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzZXRPbGRUYXNrID0gdGhpcy5yZXNldE9sZFRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2snLCB0aGlzLnJlbmRlcik7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZVRhc2snLCB0aGlzLnJlbmRlcik7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc2V0T2xkVGFzaycsIHRoaXMucmVzZXRPbGRUYXNrKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgncmVtb3ZlVGFzaycsIHRoaXMucmVtb3ZlVGFzayk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKVxuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLnByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRhc2spXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgIH0sXG4gICAgb2xkVGFzazogbnVsbCxcbiAgICBwcm9qZWN0OiBudWxsLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgICAgICAvLyB0aGlzLmJ0bkRlbGV0ZVRhc2sgPSB0aGlzLmxpc3RDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmJ0bl9kZWxldGVfdGFzaycpO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gdGhpcy5saXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVkaXRUYXNrID0gdGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBsZXRlVGFzayA9IHRoaXMuY29tcGxldGVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIGFyZ3MuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCdkZWxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVUYXNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jb21wbGV0ZVRhc2spXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzIHdpbGwgbmVlZCB0byBnZW5lcmF0ZSBhIGZvcm1cbiAgICAgICAgICAgIC8vIHJlbW92ZXMgdGhlIGJ1dHRvblxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbih0YXNrKSB7XG4gICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrQ2hlY2tib3ggPSBidWlsZEJ1dHRvbignY2hlY2tib3gnLCAndGFzaycpOyAvLyB0ZXN0aW5nXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRhc2tBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIGxpc3RJdGVtV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZCcsIHRhc2sudXVpZFRhc2spO1xuICAgICAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQtcHJvaicsIHRhc2sudXVpZFByb2opO1xuICAgICAgICAgICAgbGlzdEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gICAgICAgICAgICB0YXNrQ29udGVudC5jbGFzc0xpc3QuYWRkKCd0YXNrX2xpc3RfaXRlbV9jb250ZW50Jyk7XG4gICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrX2xpc3RfaXRlbScpO1xuICAgICAgICAgICAgdGFza0FjdGlvbnMuY2xhc3NMaXN0LmFkZCgndGFza19hY3Rpb25zJyk7XG4gICAgICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrX25hbWUnKTtcbiAgICAgICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuXG4gICAgICAgICAgICAvLyA8YnV0dG9uPlxuICAgICAgICAgICAgLy8gICAgIDxzdmc+ZmxhZzwvc3ZnPlxuICAgICAgICAgICAgLy8gICAgIDxzcGFuPlA0PC9zcGFuPlxuICAgICAgICAgICAgLy8gICAgIDxzdmc+ZHJvcGRvd24gYXJyb3c8L3N2Zz5cbiAgICAgICAgICAgIC8vIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAvLyA8ZGlhbG9nPlxuICAgICAgICAgICAgLy8gICAgIDxkaXY+XG4gICAgICAgICAgICAvLyAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDxsaT48c3Bhbj48c3ZnPjwvc3ZnPjwvc3Bhbj5Qcmlvcml0eSAxPC9saT5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDxsaT5Qcmlvcml0eSAyPC9saT5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDxsaT5Qcmlvcml0eSAzPC9saT5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDxsaT5Qcmlvcml0eSA0PC9saT5cbiAgICAgICAgICAgIC8vICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgIC8vIDwvZGlhbG9nPlxuICAgICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFza19wcmlvcml0eScpO1xuICAgICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHkgJHt0YXNrLnByaW9yaXR5fWA7XG5cbiAgICAgICAgICAgIHRhc2tDaGVja2JveC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YClcblxuICAgICAgICAgICAgLy8gbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza1JhZGlvKTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7IC8vIHRlc3RpbmdcbiAgICAgICAgICAgIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFza19kZXNjcmlwdGlvbicpO1xuICAgICAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhc2suZHVlX2RhdGUgIT09IHVuZGVmaW5lZCB8fCB0YXNrLmR1ZV90aW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZVRpbWVUZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShgJHt0YXNrLmR1ZV9kYXRlfVQwMDowMDowMGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShgMS0yLTEwMDAgJHt0YXNrLmR1ZV90aW1lfWApXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVByb3BlcnRpZXMgPSB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suZHVlX2RhdGUgJiYgIXRhc2suZHVlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0YXNrLmR1ZV9kYXRlICYmIHRhc2suZHVlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gdGltZS50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB0aW1lUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gYCR7ZGF0ZS50b0RhdGVTdHJpbmcoKX0gJHt0aW1lLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRlVGltZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgndGFza19kdWVfZGF0ZV90aW1lJylcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZUJ1dHRvbiA9IGJ1aWxkQnV0dG9uKCdkYXRlJywgJ3Rhc2snLCBkYXRlVGltZVRleHQpXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVXcmFwcGVyLmFwcGVuZENoaWxkKGRhdGVUaW1lQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZChkYXRlVGltZVdyYXBwZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0YXNrQ29udGVudC5hcHBlbmRDaGlsZChwcmlvcml0eSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkRlbGV0ZSA9IGJ1aWxkQnV0dG9uKCdkZWxldGUnLCAndGFzaycpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uRWRpdCA9IGJ1aWxkQnV0dG9uKCdlZGl0JywgJ3Rhc2snKTtcbiAgICAgICAgICAgIHRhc2tBY3Rpb25zLmFwcGVuZENoaWxkKGJ1dHRvbkRlbGV0ZSk7XG4gICAgICAgICAgICB0YXNrQWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25FZGl0KTtcblxuICAgICAgICAgICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NvbnRlbnQpO1xuICAgICAgICAgICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0FjdGlvbnMpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdEl0ZW1Db250YWluZXIpO1xuXG4gICAgICAgICAgICBsaXN0SXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgICAgICAgLy8gdGhpcy5idG5EZWxldGVUYXNrLnB1c2goYnV0dG9uKVxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKGJ1dHRvbkRlbGV0ZSwgdGFza0NoZWNrYm94LCBsaXN0SXRlbVdyYXBwZXIpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkVGFzaykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0aGlzLm9sZFRhc2sgPSAke3RoaXMub2xkVGFza31gKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW1XcmFwcGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrLnJlcGxhY2VXaXRoKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVwZGF0aW5nIHRhc2tcbiAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIG9ubHkgYXBwZW5kIGF0IHRoYXQgdGFzaydzIGluZGV4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2hlbiB0aGUgdGFzayBmb3JtIGluc2lkZSB0aGUgbGlzdCBpcyBvcGVuIGFuZCBhIG5ldyB0YXNrIGlzIGFkZGVkXG4gICAgICAgICAgICAvLyB0aGUgdGFzayBsaXN0IGdyb3dzIHdoaWxlIHRoZSB0YXNrIGZvcm0gaXMgb3BlblxuICAgIH0sXG4gICAgY29tcGxldGVUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjb21wbGV0ZXRhc2soKSBydW5uaW5nIGZyb20gdGFza3NfbGlzdC5qc2ApO1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzaygpO1xuICAgIH0sXG4gICAgcmVtb3ZlVGFzazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcmVtb3ZlVGFzaygpIGluIHRhc2tzX2xpc3QuanMgaXMgcnVubmluZ2ApXG4gICAgICAgIC8vIGNyZWF0ZSBhIG1vZGFsIHRvIGNvbmZpcm0gcmVtb3ZhbFxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IGxpc3RJdGVtO1xuICAgICAgICAgICAgbGV0IHV1aWRUYXNrID0gbGlzdEl0ZW0uZGF0YXNldC51dWlkO1xuICAgICAgICAgICAgYnVpbGRNb2RhbFJlbW92ZSh0aGlzLnByb2plY3QuZmluZFRhc2sodXVpZFRhc2spKTsgIFxuICAgICAgICAvLyB9IGVsc2UgaWYgKGUpIHtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbW92ZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgLy8gdGhpcy5wcm9qZWN0LnJlbW92ZVRhc2soZSk7XG4gICAgICAgICAgICB0aGlzLnByb2plY3QucmVtb3ZlVGFzayh0aGlzLnJlbW92ZVNlbGVjdGlvbi5kYXRhc2V0LnV1aWQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24ucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnByb2plY3QudGl0bGUgIT09ICdUb2RheScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZFRhc2sucmVtb3ZlKCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLm9sZFRhc2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlZGl0VGFzazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgZWRpdFRhc2soKSBmcm9tIHRhc2tzX2xpc3QuanMgaXMgcnVubmluZ2ApO1xuICAgICAgICB0aGlzLm9sZFRhc2sgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGJ1aWxkVGFza3NGb3JtKGUpO1xuICAgIH0sXG4gICAgcmVzZXRPbGRUYXNrOiBmdW5jdGlvbihvbGRUYXNrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGByZXNldE9sZFRhc2soKSBmcm9tIHRhc2tzX2xpc3QuanMgaXMgcnVubmluZ2ApO1xuICAgICAgICBpZiAodGhpcy5vbGRUYXNrKSB7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbFxuICAgICAgICB9IGVsc2UgaWYgKG9sZFRhc2spIHtcbiAgICAgICAgICAgIHRoaXMub2xkVGFzayA9IG9sZFRhc2s7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IEljb25GbGFnIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9mbGFnLnN2Zyc7XG5pbXBvcnQgSWNvbkNoZWNrIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmcnO1xuaW1wb3J0IEljb25Qcm9qZWN0IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnJztcbmltcG9ydCAnLi4vc3R5bGVzL3Rhc2tzX3ByaW9yaXR5LmNzcyc7XG5cbi8vIGNyZWF0ZXMgYSBtb2RhbCBmb3IgcHJpb3JpdHkgb3B0aW9uc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcmlvcml0eU9wdGlvbnMoZSkge1xuICAgIHByaW9yaXR5T3B0aW9ucy5pbml0KGUpO1xuXG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAndGFza19wcmlvcml0aWVzJztcbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKHByaW9yaXR5T3B0aW9ucy5yZW5kZXIoKSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuXG4gICAgcHJpb3JpdHlPcHRpb25zLmNhY2hlRE9NKCk7XG4gICAgcHJpb3JpdHlPcHRpb25zLmJpbmRFdmVudHMoKTtcbiAgICBkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xufVxuXG5jb25zdCBwcmlvcml0eU9wdGlvbnMgPSB7XG4gICAgcHJpb3JpdHk6IG51bGwsXG4gICAgYnRuUHJpb3JpdHk6IG51bGwsXG4gICAgYnRuUHJpb3JpdHlUZXh0OiBudWxsLFxuICAgIGJ0bkZsYWc6IG51bGwsXG4gICAgb2JzZXJ2ZXI6IG51bGwsXG4gICAgbWVkaWE6IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiA3NjhweCknKSxcbiAgICBpbml0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuYnRuUHJpb3JpdHkgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIHRoaXMuYnRuUHJpb3JpdHlUZXh0ID0gdGhpcy5idG5Qcmlvcml0eS5xdWVyeVNlbGVjdG9yKCcudGFza19wcmlvcml0eScpO1xuICAgICAgICB0aGlzLmJ0bkZsYWcgPSB0aGlzLmJ0blByaW9yaXR5LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfd3JhcHBlcl9mbGFnJykuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpLnZhbHVlKTtcbiAgICAgICAgdGhpcy5mb3JtSXRlbSA9IHRoaXMuYnRuUHJpb3JpdHkucGFyZW50RWxlbWVudDtcbiAgICB9LFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tfcHJpb3JpdGllcycpO1xuICAgICAgICB0aGlzLmlucHV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wdGlvbicpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbCA9IHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNlbGVjdCA9IHRoaXMuc2VsZWN0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNlbGVjdCkpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbGxCYWNrID0gdGhpcy5jYWxsQmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHRoaXMuY2FsbEJhY2spO1xuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5mb3JtSXRlbSk7XG5cbiAgICAgICAgdGhpcy5tZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH0pXG5cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgb3B0aW9uc1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gSWNvbkZsYWc7XG4gICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoYHByaW9yaXR5XyR7aX1gKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbWdfd3JhcHBlcl9mbGFnJyk7XG4gICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LmFkZCgnb3B0aW9uJylcbiAgICAgICAgICAgIG9wdGlvbi5kYXRhc2V0LnZhbHVlID0gaTtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBgUHJpb3JpdHkgJHtpfWBcbiAgICAgICAgXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKGltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICBvcHRpb24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKGBzZWxlY3RlZGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZ0NoZWNrID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgaW1nQ2hlY2suc3JjID0gSWNvbkNoZWNrO1xuICAgICAgICAgICAgICAgIGltZ0NoZWNrLmNsYXNzTGlzdC5hZGQoJ29wdGlvbl9zZWxlY3RlZF9jaGVja21hcmsnKTtcbiAgICAgICAgICAgICAgICBpbWdDaGVjay5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChpbWdDaGVjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zTGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQob3B0aW9uc0xpc3QpO1xuICAgICAgICByZXR1cm4gb3B0aW9uc1dyYXBwZXI7XG4gICAgfSxcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnRElBTE9HJykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlci51bm9ic2VydmUodGhpcy5idG5Qcmlvcml0eSk7XG4gICAgfSxcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5pbnB1dFByaW9yaXR5LnZhbHVlID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUpO1xuICAgICAgICB0aGlzLmJ0blByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGBQJHt0aGlzLmlucHV0UHJpb3JpdHkudmFsdWV9YDtcbiAgICAgICAgdGhpcy5idG5GbGFnLmNsYXNzTmFtZS5iYXNlVmFsID0gYHByaW9yaXR5XyR7dGhpcy5pbnB1dFByaW9yaXR5LnZhbHVlfWA7XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9LFxuICAgIGNhbGxCYWNrOiBmdW5jdGlvbihlbnRyaWVzKSB7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5jb250ZW50Qm94U2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5jb250ZW50Qm94U2l6ZVswXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3VuZHMgPSBlbnRyeS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5zdHlsZS53aWR0aCA9IGJvdW5kcy53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy5kaWFsb2dFbGVtZW50Lm9mZnNldEhlaWdodCArIGJvdW5kcy5ib3R0b20pID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZGlhbG9nJ3MgaGVpZ2h0IGFuZCBmb3JtIGl0ZW0ncyBib3R0b20gaXMgZ3JlYXRlciB0aGFuIHdpbmRvdyBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7Ym91bmRzLnh9cHgsICR7Ym91bmRzLnRvcCAtIHRoaXMuZGlhbG9nRWxlbWVudC5vZmZzZXRIZWlnaHR9cHgpYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7Ym91bmRzLnh9cHgsICR7Ym91bmRzLmJvdHRvbX1weClgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuL3B1YnN1Yic7XG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuLi9zdG9yYWdlL3N0b3JhZ2UnO1xuXG5jb25zdCBnZXRGb3JtVmFsdWVzID0gKGlucHV0cykgPT4ge1xuICAgIC8vIHRhc2tzIGlzIGVtcHR5IHdpdGggbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IG9iaiA9IHt9XG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4geyBcbiAgICAgICAgaWYgKGlucHV0LmlkID09PSAncHJpb3JpdHknKSB7XG4gICAgICAgICAgICBvYmpbaW5wdXQuaWRdID0gcGFyc2VJbnQoaW5wdXQudmFsdWUuc2xpY2UoaW5wdXQudmFsdWUubGVuZ3RoIC0gMSwgaW5wdXQudmFsdWUubGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuaWQgPT09ICdkdWVfZGF0ZScgJiYgaW5wdXQudmFsdWUubGVuZ3RoID09PSAwICYmIFsuLi5pbnB1dHNdLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSAnZHVlX3RpbWUnKS52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHRpbWUgaGFzIGEgdmFsdWUgYW5kIGRhdGUgZG9lcyBub3QgaGF2ZSBhIHZhbHVlXG4gICAgICAgICAgICAgICAgLy8gZGF0ZSBzZXQgdG8gdG9kYXkncyBkYXRlXG4gICAgICAgICAgICBvYmpbaW5wdXQuaWRdID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBvYmpbaW5wdXQuaWRdID0gaW5wdXQudmFsdWVcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG9iailcbiAgICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBidWlsZFByb2plY3QgPSAodGFza3MpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIHRhc2tzLFxuICAgICAgICB1dWlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLFxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgcHJvamVjdChzdGF0ZSksXG4gICAgKVxufVxuXG4vLyBjcmVhdGVzIGEgcHJvamVjdCBvYmplY3RcbiAgICAvLyB0YXNrcyBwcm9wZXJ0eSBjcmVhdGVkIHVwb24gb2JqZWN0IGNyZWF0aW9uXG5jb25zdCBwcm9qZWN0ID0gKHN0YXRlKSA9PiAoe1xuICAgIHR5cGU6ICdwcm9qZWN0JyxcbiAgICBhY3RpdmU6IGZhbHNlLCAvLyB0aGVyZSBjYW4gb25seSBiZSBvbmUgcHJvamVjdCBhY3RpdmVcbiAgICB1dWlkOiBzdGF0ZS51dWlkLFxuICAgIHRhc2tzOiBzdGF0ZS50YXNrcyB8fCBbXSxcbiAgICBhZGRUYXNrOiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgICAgLy8gbmVlZCB0byBhbGxvdyB1c2VyIHRvIHBpY2sgd2hhdCBwcm9qZWN0IHRvIGFzc2lnbiB0aGUgbmV3bHkvZWRpdGVkIHRhc2tcbiAgICAgICAgICAgIC8vIHB1c2hlcyB0YXNrIHRvIHJlc3BlY3RpdmUgcHJvamVjdFxuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gT2JqZWN0LmFzc2lnbih0YXNrKHRoaXMudXVpZCksIGZvcm1WYWx1ZXMpO1xuXG4gICAgICAgIGlmIChmb3JtVmFsdWVzLnByb2plY3QgJiYgZm9ybVZhbHVlcy5wcm9qZWN0ICE9PSBuZXdUYXNrLnV1aWRQcm9qKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbmV3IHV1aWQgcHJvajogJHtmb3JtVmFsdWVzLnByb2plY3R9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgb2xkIHV1aWQgcHJvajogJHtuZXdUYXNrLnV1aWRQcm9qfWApO1xuICAgICAgICAgICAgbmV3VGFzay51dWlkUHJvaiA9IGZvcm1WYWx1ZXMucHJvamVjdDtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQoZm9ybVZhbHVlcy5wcm9qZWN0KS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGAke25ld1Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYWRkVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci50b2RheSlcbiAgICAgICAgLy8gcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICByZW1vdmVUYXNrOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIC8vIGlmIHRoZSByZW1vdmUgdGFzayBpcyBpbiB0b2RheVxuICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IGZyb20gdG9kYXkgQU5EIGl0J3MgcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgIC8vIGlmIHRoZSB0YXNrJ3MgZGF0ZSBpbiB0b2RheSBpcyBlZGl0ZWQgXG4gICAgICAgICAgICAvLyByZW1vdmUgaXQgZnJvbSBvbmx5IHRvZGF5XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLmZpbmRUYXNrKHV1aWQpO1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICAgICAgICAvLyByZW1vdmVzIHRhc2sgaW4gcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRhc2sudXVpZFByb2opO1xuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLnV1aWRUYXNrID09PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGFza3Muc3BsaWNlKHByb2plY3QudGFza3MuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWxsUHJvamVjdHMoKTtcbiAgICAgICAgLy8gcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVUYXNrOiBmdW5jdGlvbih1dWlkLCBpbnB1dHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHVwZGF0ZVRhc2soKSBmcm9tIHByb2plY3QtY29udHJvbGxlci5qcyBpcyBydW5uaW5nYCk7IC8vIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGdldEZvcm1WYWx1ZXMoaW5wdXRzKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IE9iamVjdC5hc3NpZ24odGhpcy5maW5kVGFzayh1dWlkKSwgZm9ybVZhbHVlcyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coZm9ybVZhbHVlcylcbiAgICAgICAgY29uc29sZS5sb2cobmV3VGFzay5kdWVfZGF0ZSk7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIC8vIGlmIHRoZSBwcm9qZWN0IGlzIGNoYW5nZSBmb3IgYSB0YXNrXG4gICAgICAgIGlmIChmb3JtVmFsdWVzLnByb2plY3QgJiYgZm9ybVZhbHVlcy5wcm9qZWN0ICE9PSBuZXdUYXNrLnV1aWRQcm9qKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhc2sobmV3VGFzay51dWlkVGFzayk7XG4gICAgICAgICAgICBuZXdUYXNrLnV1aWRQcm9qID0gZm9ybVZhbHVlcy5wcm9qZWN0O1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZmluZChmb3JtVmFsdWVzLnByb2plY3QpLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgncmVtb3ZlVGFzaycpO1xuICAgICAgICAgICAgaWYgKHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS50aXRsZSA9PT0gJ1RvZGF5Jykge1xuICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVUYXNrJywgbmV3VGFzayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnRpdGxlID09PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGAke25ld1Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgncmVtb3ZlVGFzaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICAvLyBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIGZpbmRUYXNrOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LnV1aWRUYXNrID09PSB1dWlkKTtcbiAgICB9LFxufSlcblxuXG5leHBvcnQgY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSB7XG4gICAgaW5ib3g6IFtPYmplY3QuYXNzaWduKGJ1aWxkUHJvamVjdCgpLCB7dGl0bGU6ICdJbmJveCcsfSldLCAvLyB3aWxsIGhvbGQgdGFza3MgYXNzaWduZWQgdG8gdGhlICdpbmJveCdcbiAgICB0b2RheTogW09iamVjdC5hc3NpZ24oYnVpbGRQcm9qZWN0KCksIHt0aXRsZTogJ1RvZGF5J30pXSxcbiAgICBtaXNjOiBudWxsLFxuICAgIHByb2plY3RzOiBudWxsLFxuICAgIGFsbFByb2plY3RzOiBbXSxcbiAgICBhZGRQcm9qZWN0OiBmdW5jdGlvbihpbnB1dHMpIHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGdldEZvcm1WYWx1ZXMoaW5wdXRzKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKE9iamVjdC5hc3NpZ24oYnVpbGRQcm9qZWN0KCksIGZvcm1WYWx1ZXMpKTtcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpXG4gICAgICAgIC8vIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZih0aGlzLmZpbmQodXVpZCkpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpO1xuICAgICAgICAvLyBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QudXVpZCA9PT0gdXVpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbFByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LnV1aWQgPT09IHV1aWQpO1xuICAgIH0sXG4gICAgc2V0QWN0aXZlOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzZXRBY3RpdmUoKSBpcyBydW5uaW5nIGZyb20gcHJvamVjdC1jb250cm9sbGVyLmpzYCkgLy8gZm9yIGRlYnVnZ2luZ1xuICAgICAgICBpZiAodGhpcy5maW5kQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZEFjdGl2ZSgpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmluZCh1dWlkKS5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG4gICAgZmluZEFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWxsUHJvamVjdHMpXG4gICAgICAgIGlmICghdGhpcy5hbGxQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5hY3RpdmUgPT09IHRydWUpKSB7XG4gICAgICAgICAgICB0aGlzLmluYm94WzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmJveDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFsbFByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmFjdGl2ZSA9PT0gdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldEFsbFByb2plY3RzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hbGxQcm9qZWN0cyA9IHRoaXMuaW5ib3guY29uY2F0KHRoaXMucHJvamVjdHMsIHRoaXMudG9kYXkpO1xuICAgICAgICB0aGlzLnNvcnQoKVxuICAgICAgICBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIHNldE1pc2NQcm9qZWN0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubWlzYyA9IHRoaXMuaW5ib3guY29uY2F0KHRoaXMudG9kYXkpXG4gICAgfSxcbiAgICBzb3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB0aGlzLmFsbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC50YXNrcy5sZW5ndGggPiAwICYmIHByb2plY3QudGl0bGUgIT09ICdUb2RheScpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXNrRGF0ZSA9IG5ldyBEYXRlKGAke3Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50b2RheVswXS5maW5kVGFzayh0YXNrLnV1aWRUYXNrKSAmJiB0YXNrRGF0ZSA9PSB0b2RheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheVswXS50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kYXkpXG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9iaiwgYnVpbGRQcm9qZWN0KG9iai50YXNrcykpO1xuICAgICAgICAgICAgb2JqLnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay51dWlkUHJvaiA9IG9iai51dWlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5pbmJveFswXSwgYnVpbGRQcm9qZWN0KHRoaXMuaW5ib3hbMF0udGFza3MpKTtcbiAgICAgICAgdGhpcy5pbmJveFswXS50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgdGFzay51dWlkUHJvaiA9IHRoaXMuaW5ib3hbMF0udXVpZDtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpO1xuICAgIH1cbn1cblxuY29uc3QgdGFzayA9ICh1dWlkKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9ICd0YXNrJztcbiAgICBjb25zdCB1dWlkVGFzayA9IGNyeXB0by5yYW5kb21VVUlEKCk7XG4gICAgY29uc3QgdXVpZFByb2ogPSB1dWlkO1xuICAgIHJldHVybiB7IHV1aWRUYXNrLCB1dWlkUHJvaiwgdHlwZSB9O1xufSIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG4gICAgc3Vic2NyaWJlcnM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oc3Vic2NyaWJlciwgaGFuZGxlcikge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSA9IHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gfHwgW107XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0ucHVzaChoYW5kbGVyKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihzdWJzY3JpYmVyLCAgaGFuZGxlcikge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl1baV0gPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oc3Vic2NyaWJlciwgZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdC1jb250cm9sbGVyJztcblxuLy8gZ2V0SXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuZXhwb3J0IGZ1bmN0aW9uIHNldFByb2plY3RzKCkge1xuICAgIGNvbnNvbGUubG9nKGBzZXRQcm9qZWN0cygpIHJ1bm5pbmcgZnJvbSBzdG9yYWdlLmpzYCk7XG4gICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIDogW107XG4gICAgcHJvamVjdENvbnRyb2xsZXIuaW5ib3ggPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luYm94JykpIDogcHJvamVjdENvbnRyb2xsZXIuaW5ib3g7XG4gICAgLy8gcHJvamVjdENvbnRyb2xsZXIudG9kYXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXknKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5JykpIDogcHJvamVjdENvbnRyb2xsZXIudG9kYXk7XG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLmFsbFByb2plY3RzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci50b2RheSk7XG4gICAgcHJvamVjdENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cyk7XG59XG5cbi8vIHNldEl0ZW0gaW4gbG9jYWxTdG9yYWdlXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlKCkge1xuICAgIGNvbnNvbGUubG9nKGBwb3B1bGF0ZVN0b3JhZ2UoKSBydW5uaW5nIGZyb20gc3RvcmFnZS5qc2ApO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luYm94JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIuaW5ib3gpKTtcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kYXknLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0Q29udHJvbGxlci50b2RheSkpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSk7XG59IiwiLy8gcmV0dXJucyBhbiBvYmplY3QgYW5kIGFycmF5IG9mIGZpbGUgdHlwZXNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XG4gICAgbGV0IGZpbGVzID0ge307XG4gICAgbGV0IGZpbGVzQXJyID0gW107XG4gICAgci5rZXlzKCkubWFwKGl0ZW0gPT4ge1xuICAgICAgICBmaWxlc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gICAgICAgIGZpbGVzQXJyLnB1c2goaXRlbS5yZXBsYWNlKCcuLycsICcnKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBmaWxlcywgZmlsZXNBcnIgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==