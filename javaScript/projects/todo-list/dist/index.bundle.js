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



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Poppins/Poppins-Light.ttf */ "./src/assets/fonts/Poppins/Poppins-Light.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Poppins/Poppins-Medium.ttf */ "./src/assets/fonts/Poppins/Poppins-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Poppins/Poppins-Regular.ttf */ "./src/assets/fonts/Poppins/Poppins-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Poppins/Poppins-SemiBold.ttf */ "./src/assets/fonts/Poppins/Poppins-SemiBold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Poppins/Poppins-Bold.ttf */ "./src/assets/fonts/Poppins/Poppins-Bold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Poppins/Poppins-ExtraBold.ttf */ "./src/assets/fonts/Poppins/Poppins-ExtraBold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
    /* https://fonts.google.com/specimen/Poppins */
    font-family: 'Poppins';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_1___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_2___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_3___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_4___}),
        url(${___CSS_LOADER_URL_REPLACEMENT_5___});
}

*, *::before, *::after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--font-family-primary);
}

:root {
    /* custom variables */
    --font-family-primary: 'Poppins', Arial, sans-serif;
    --text-color-primary: rgba(32, 32, 32, 1);
    --background-primary: rgb(255, 255, 255);
    --accent-primary: rgb(173, 77, 232);
    --accent-secondary: rgb(241, 241, 241);
    --accent-tertiary: #168DEE;
    --priority-1-color: #F84125;
    --priority-2-color: #ffa500;
    --priority-3-color: #14EBC0;
    --priority-4-color: #9e9e9e;
    --button-radius: 0.35rem;
    --circle-radius: 50%;
    --button-no-text-padding: 0.25rem;
    --button-with-text-padding: 0.5rem 1rem;
    --column-gap-small: 0.25rem;
}

body {
    min-height: 100vh;
    animation: fade-in 200ms ease-in;
    -webkit-animation: fade-in 200ms ease-in;
    -moz-animation: fade-in 200ms ease-in;
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
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    -webkit-transition: opacity 200ms ease-in-out;
    -moz-transition: opacity 200ms ease-in-out;
}

.overlay_main_content.dim {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
    -webkit-transition: opacity 200ms ease-in-out;
    -moz-transition: opacity 200ms ease-in-out;
}

#main_content {
    flex: 1;
    padding: 5%;
    display: grid;
    background-color: var(--background-primary);
}

#main_content > :first-child {
    display: grid;
    grid-auto-rows: min-content 1fr;
    justify-self: center;
    width: 100%;
    animation: fade-in 300ms ease-in;
    -webkit-animation: fade-in 300ms ease-in;
    -moz-animation: fade-in 300ms ease-in;
}

/* general styles for similar elements existing on different modules */
a, a:visited {
    color: var(--text-color-primary);
}

.img_wrapper {
    display: flex;
}

dialog:not(#task_select_project_options):not(#task_select_priority_options) {
    margin: auto;
    min-width: 60vw;
    border-radius: 0.75rem;
    border: none;
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

.nav_project > svg,
.project_circle {
    color: rgb(70, 70, 70);
}

button {
    display: flex;
    background: transparent;
    border: none;
    border-radius: var(--button-radius);
}

.btn_img_wrapper {
    display: flex;
}

button:hover {
    cursor: pointer;
}

button > svg,
button > * > svg {
    height: auto;
    width: clamp(1.25rem, 2.5vw, 1.5rem);
}

.form_item {
    display: flex;
    flex-direction: column;
}

.form_item::after {
    content: '';
    margin-top: 1rem;
    width: 90%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    opacity: 0.4;
    align-self: center;
}

.form_item > * {
    display: flex;
    min-height: 50px;
}

.form_item > label {
    align-items: center;
}

.form_item > .task_input,
.form_item > .project_input {
    min-width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
}

.nav_left > .container > .input_search:focus,
.form_item > .task_input:focus,
.form_item > .project_input:focus {
    background-color: rgba(255, 255, 255, 1);
    outline: none;
    box-shadow: 0px 0px 5px -1px inset rgba(0, 0, 0, 1);
}

.form_buttons {
    display: flex;
    justify-content: end;
    column-gap: 0.5rem;
    -webkit-column-gap: 0.5rem;
    -moz-column-gap: 0.5rem;
    margin-top: 1rem;
}

.form_buttons > * {
    background-color: rgb(226, 226, 226);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    text-transform: capitalize;
}

.form_buttons > button[type="submit"] {
    background-color: var(--accent-primary);
}

.form_buttons > button[type="submit"]:hover {
    filter: brightness(0.85);
    -webkit-filter: brightness(0.85);
}

.form_buttons > button:hover {
    filter: brightness(0.85);
    -webkit-filter: brightness(0.85);
}

.form_buttons > *:active {
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.8);
}

.form_item > .task_input:hover:not(:focus),
.form_item > .project_input:hover:not(:focus),
.projects >:last-child > .nav_projects > .btn_add_project:hover,
.btn_add_project:hover,
.btn_delete_project:hover,
.task_actions > button:hover,
#navbar > * > .container > button:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

@media screen and (min-width:768px) {
    #main_content {
        padding: 2% 2.5% 2% 2.5%;
    }

    #main_content > :first-child {
        width: 70%;
    }

    #content {
        position: static;
        display: flex;
    }
}

@keyframes fade-in {
    0% {
        opacity: 0%;
    }

    100% {
        opacity: 100%;
    }
}

@media (hover: none) {
    /* targets only devices that can hover */
    .form_item > .task_input:not(:focus),
    .form_item > .project_input:not(:focus),
    .projects >:last-child > .nav_projects > .btn_add_project,
    .btn_add_project {
        background-color: rgba(0, 0, 0, 0.2);
    }
}`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;IACI,8CAA8C;IAC9C,sBAAsB;IACtB;;;;;+CAKuD;AAC3D;;AAEA;IACI,sBAAsB;IACtB,8BAA8B;IAC9B,2BAA2B;IAC3B,SAAS;IACT,UAAU;IACV,uCAAuC;AAC3C;;AAEA;IACI,qBAAqB;IACrB,mDAAmD;IACnD,yCAAyC;IACzC,wCAAwC;IACxC,mCAAmC;IACnC,sCAAsC;IACtC,0BAA0B;IAC1B,2BAA2B;IAC3B,2BAA2B;IAC3B,2BAA2B;IAC3B,2BAA2B;IAC3B,wBAAwB;IACxB,oBAAoB;IACpB,iCAAiC;IACjC,uCAAuC;IACvC,2BAA2B;AAC/B;;AAEA;IACI,iBAAiB;IACjB,gCAAgC;IAChC,wCAAwC;IACxC,qCAAqC;AACzC;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,oBAAoB;IACpB,eAAe;IACf,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,UAAU;IACV,qCAAqC;IACrC,6CAA6C;IAC7C,0CAA0C;AAC9C;;AAEA;IACI,UAAU;IACV,qCAAqC;IACrC,6CAA6C;IAC7C,0CAA0C;AAC9C;;AAEA;IACI,OAAO;IACP,WAAW;IACX,aAAa;IACb,2CAA2C;AAC/C;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,oBAAoB;IACpB,WAAW;IACX,gCAAgC;IAChC,wCAAwC;IACxC,qCAAqC;AACzC;;AAEA,sEAAsE;AACtE;IACI,gCAAgC;AACpC;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;;IAEI,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,YAAY;IACZ,mCAAmC;AACvC;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,eAAe;AACnB;;AAEA;;IAEI,YAAY;IACZ,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,gBAAgB;IAChB,UAAU;IACV,2CAA2C;IAC3C,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;;IAEI,eAAe;IACf,YAAY;IACZ,qBAAqB;IACrB,oBAAoB;AACxB;;AAEA;;;IAGI,wCAAwC;IACxC,aAAa;IACb,mDAAmD;AACvD;;AAEA;IACI,aAAa;IACb,oBAAoB;IACpB,kBAAkB;IAClB,0BAA0B;IAC1B,uBAAuB;IACvB,gBAAgB;AACpB;;AAEA;IACI,oCAAoC;IACpC,oBAAoB;IACpB,mBAAmB;IACnB,0BAA0B;AAC9B;;AAEA;IACI,uCAAuC;AAC3C;;AAEA;IACI,wBAAwB;IACxB,gCAAgC;AACpC;;AAEA;IACI,wBAAwB;IACxB,gCAAgC;AACpC;;AAEA;IACI,8CAA8C;AAClD;;AAEA;;;;;;;IAOI,oCAAoC;AACxC;;AAEA;IACI;QACI,wBAAwB;IAC5B;;IAEA;QACI,UAAU;IACd;;IAEA;QACI,gBAAgB;QAChB,aAAa;IACjB;AACJ;;AAEA;IACI;QACI,WAAW;IACf;;IAEA;QACI,aAAa;IACjB;AACJ;;AAEA;IACI,wCAAwC;IACxC;;;;QAII,oCAAoC;IACxC;AACJ","sourcesContent":["@font-face {\n    /* https://fonts.google.com/specimen/Poppins */\n    font-family: 'Poppins';\n    src: url('./assets/fonts/Poppins/Poppins-Light.ttf'),\n        url('./assets/fonts/Poppins/Poppins-Medium.ttf'),\n        url('./assets/fonts/Poppins/Poppins-Regular.ttf'),\n        url('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),\n        url('./assets/fonts/Poppins/Poppins-Bold.ttf'),\n        url('./assets/fonts/Poppins/Poppins-ExtraBold.ttf');\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    font-family: var(--font-family-primary);\n}\n\n:root {\n    /* custom variables */\n    --font-family-primary: 'Poppins', Arial, sans-serif;\n    --text-color-primary: rgba(32, 32, 32, 1);\n    --background-primary: rgb(255, 255, 255);\n    --accent-primary: rgb(173, 77, 232);\n    --accent-secondary: rgb(241, 241, 241);\n    --accent-tertiary: #168DEE;\n    --priority-1-color: #F84125;\n    --priority-2-color: #ffa500;\n    --priority-3-color: #14EBC0;\n    --priority-4-color: #9e9e9e;\n    --button-radius: 0.35rem;\n    --circle-radius: 50%;\n    --button-no-text-padding: 0.25rem;\n    --button-with-text-padding: 0.5rem 1rem;\n    --column-gap-small: 0.25rem;\n}\n\nbody {\n    min-height: 100vh;\n    animation: fade-in 200ms ease-in;\n    -webkit-animation: fade-in 200ms ease-in;\n    -moz-animation: fade-in 200ms ease-in;\n}\n\n#todo_app {\n    min-height: inherit;\n    display: grid;\n    grid-template-rows: min-content 1fr;\n}\n\n#content {\n    position: relative;\n}\n\n#content {\n    display: grid;\n}\n\n.overlay_main_content {\n    pointer-events: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.3);\n    opacity: 0;\n    transition: opacity 200ms ease-in-out;\n    -webkit-transition: opacity 200ms ease-in-out;\n    -moz-transition: opacity 200ms ease-in-out;\n}\n\n.overlay_main_content.dim {\n    opacity: 1;\n    transition: opacity 200ms ease-in-out;\n    -webkit-transition: opacity 200ms ease-in-out;\n    -moz-transition: opacity 200ms ease-in-out;\n}\n\n#main_content {\n    flex: 1;\n    padding: 5%;\n    display: grid;\n    background-color: var(--background-primary);\n}\n\n#main_content > :first-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n    justify-self: center;\n    width: 100%;\n    animation: fade-in 300ms ease-in;\n    -webkit-animation: fade-in 300ms ease-in;\n    -moz-animation: fade-in 300ms ease-in;\n}\n\n/* general styles for similar elements existing on different modules */\na, a:visited {\n    color: var(--text-color-primary);\n}\n\n.img_wrapper {\n    display: flex;\n}\n\ndialog:not(#task_select_project_options):not(#task_select_priority_options) {\n    margin: auto;\n    min-width: 60vw;\n    border-radius: 0.75rem;\n    border: none;\n}\n\ndialog::backdrop {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n.nav_project > svg,\n.project_circle {\n    color: rgb(70, 70, 70);\n}\n\nbutton {\n    display: flex;\n    background: transparent;\n    border: none;\n    border-radius: var(--button-radius);\n}\n\n.btn_img_wrapper {\n    display: flex;\n}\n\nbutton:hover {\n    cursor: pointer;\n}\n\nbutton > svg,\nbutton > * > svg {\n    height: auto;\n    width: clamp(1.25rem, 2.5vw, 1.5rem);\n}\n\n.form_item {\n    display: flex;\n    flex-direction: column;\n}\n\n.form_item::after {\n    content: '';\n    margin-top: 1rem;\n    width: 90%;\n    border-bottom: 2px solid rgba(0, 0, 0, 0.3);\n    opacity: 0.4;\n    align-self: center;\n}\n\n.form_item > * {\n    display: flex;\n    min-height: 50px;\n}\n\n.form_item > label {\n    align-items: center;\n}\n\n.form_item > .task_input,\n.form_item > .project_input {\n    min-width: 100%;\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 1rem;\n}\n\n.nav_left > .container > .input_search:focus,\n.form_item > .task_input:focus,\n.form_item > .project_input:focus {\n    background-color: rgba(255, 255, 255, 1);\n    outline: none;\n    box-shadow: 0px 0px 5px -1px inset rgba(0, 0, 0, 1);\n}\n\n.form_buttons {\n    display: flex;\n    justify-content: end;\n    column-gap: 0.5rem;\n    -webkit-column-gap: 0.5rem;\n    -moz-column-gap: 0.5rem;\n    margin-top: 1rem;\n}\n\n.form_buttons > * {\n    background-color: rgb(226, 226, 226);\n    padding: 0.5rem 1rem;\n    border-radius: 2rem;\n    text-transform: capitalize;\n}\n\n.form_buttons > button[type=\"submit\"] {\n    background-color: var(--accent-primary);\n}\n\n.form_buttons > button[type=\"submit\"]:hover {\n    filter: brightness(0.85);\n    -webkit-filter: brightness(0.85);\n}\n\n.form_buttons > button:hover {\n    filter: brightness(0.85);\n    -webkit-filter: brightness(0.85);\n}\n\n.form_buttons > *:active {\n    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.8);\n}\n\n.form_item > .task_input:hover:not(:focus),\n.form_item > .project_input:hover:not(:focus),\n.projects >:last-child > .nav_projects > .btn_add_project:hover,\n.btn_add_project:hover,\n.btn_delete_project:hover,\n.task_actions > button:hover,\n#navbar > * > .container > button:hover {\n    background-color: rgba(0, 0, 0, 0.2);\n}\n\n@media screen and (min-width:768px) {\n    #main_content {\n        padding: 2% 2.5% 2% 2.5%;\n    }\n\n    #main_content > :first-child {\n        width: 70%;\n    }\n\n    #content {\n        position: static;\n        display: flex;\n    }\n}\n\n@keyframes fade-in {\n    0% {\n        opacity: 0%;\n    }\n\n    100% {\n        opacity: 100%;\n    }\n}\n\n@media (hover: none) {\n    /* targets only devices that can hover */\n    .form_item > .task_input:not(:focus),\n    .form_item > .project_input:not(:focus),\n    .projects >:last-child > .nav_projects > .btn_add_project,\n    .btn_add_project {\n        background-color: rgba(0, 0, 0, 0.2);\n    }\n}"],"sourceRoot":""}]);
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
    background-color: var(--accent-primary);
    animation: fade-in 400ms ease-in;
    -webkit-animation: fade-in 400ms ease-in;
    -moz-animation: fade-in 400ms ease-in;
}

header > #navbar {
    display: flex;
    justify-content: space-between;
    padding: 0.60rem 0.75rem;
}

header > #navbar > .nav_left > .container > .btn_menu {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    transition: all 400ms ease-in-out;
    -webkit-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    filter: invert(0);
    -webkit-filter: invert(0);
}

header > #navbar > .nav_left > .container > .btn_menu.rotate {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transition: all 400ms ease-in-out;
    -webkit-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    filter: invert(1);
    -webkit-filter: invert(1);
}

header > #navbar > * > .container {
    display: flex;
    column-gap: var(--column-gap-small);
    -webkit-column-gap: var(--column-gap-small);
    -moz-column-gap: var(--column-gap-small);
}

header > #navbar > * > .container > * {
    display: flex;
    align-items: center;
    border-radius: var(--button-radius);
    padding: var(--button-no-text-padding);
}

#navbar > * > .container > button:hover {
    color: var(--background-primary);
}

a.github:hover > svg {
    filter: invert(1);
    -webkit-filter: invert(1);
}

.input_search {
    width: min(350px, 50%);
    border: none;
    padding-left: 0.5rem;
}

header > #navbar > * > .container > * > svg {
    height: auto;
    width: clamp(1.75rem, 3vw, 2.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;IACI,uCAAuC;IACvC,gCAAgC;IAChC,wCAAwC;IACxC,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,wBAAwB;AAC5B;;AAEA;IACI,uBAAuB;IACvB,+BAA+B;IAC/B,4BAA4B;IAC5B,iCAAiC;IACjC,yCAAyC;IACzC,sCAAsC;IACtC,iBAAiB;IACjB,yBAAyB;AAC7B;;AAEA;IACI,wBAAwB;IACxB,gCAAgC;IAChC,6BAA6B;IAC7B,iCAAiC;IACjC,yCAAyC;IACzC,sCAAsC;IACtC,iBAAiB;IACjB,yBAAyB;AAC7B;;AAEA;IACI,aAAa;IACb,mCAAmC;IACnC,2CAA2C;IAC3C,wCAAwC;AAC5C;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,mCAAmC;IACnC,sCAAsC;AAC1C;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,iBAAiB;IACjB,yBAAyB;AAC7B;;AAEA;IACI,sBAAsB;IACtB,YAAY;IACZ,oBAAoB;AACxB;;AAEA;IACI,YAAY;IACZ,kCAAkC;AACtC","sourcesContent":["header {\n    background-color: var(--accent-primary);\n    animation: fade-in 400ms ease-in;\n    -webkit-animation: fade-in 400ms ease-in;\n    -moz-animation: fade-in 400ms ease-in;\n}\n\nheader > #navbar {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.60rem 0.75rem;\n}\n\nheader > #navbar > .nav_left > .container > .btn_menu {\n    transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    transition: all 400ms ease-in-out;\n    -webkit-transition: all 400ms ease-in-out;\n    -moz-transition: all 400ms ease-in-out;\n    filter: invert(0);\n    -webkit-filter: invert(0);\n}\n\nheader > #navbar > .nav_left > .container > .btn_menu.rotate {\n    transform: rotate(90deg);\n    -webkit-transform: rotate(90deg);\n    -moz-transform: rotate(90deg);\n    transition: all 400ms ease-in-out;\n    -webkit-transition: all 400ms ease-in-out;\n    -moz-transition: all 400ms ease-in-out;\n    filter: invert(1);\n    -webkit-filter: invert(1);\n}\n\nheader > #navbar > * > .container {\n    display: flex;\n    column-gap: var(--column-gap-small);\n    -webkit-column-gap: var(--column-gap-small);\n    -moz-column-gap: var(--column-gap-small);\n}\n\nheader > #navbar > * > .container > * {\n    display: flex;\n    align-items: center;\n    border-radius: var(--button-radius);\n    padding: var(--button-no-text-padding);\n}\n\n#navbar > * > .container > button:hover {\n    color: var(--background-primary);\n}\n\na.github:hover > svg {\n    filter: invert(1);\n    -webkit-filter: invert(1);\n}\n\n.input_search {\n    width: min(350px, 50%);\n    border: none;\n    padding-left: 0.5rem;\n}\n\nheader > #navbar > * > .container > * > svg {\n    height: auto;\n    width: clamp(1.75rem, 3vw, 2.5rem);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/modal_removal.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/modal_removal.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `/* styles for task/project modal removal */
.form_removal {
    padding: 1rem;
}

.form_removal > div {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

.item_for_removal {
    text-decoration: underline;
}`, "",{"version":3,"sources":["webpack://./src/styles/modal_removal.css"],"names":[],"mappings":"AAAA,0CAA0C;AAC1C;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,0BAA0B;AAC9B","sourcesContent":["/* styles for task/project modal removal */\n.form_removal {\n    padding: 1rem;\n}\n\n.form_removal > div {\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n.item_for_removal {\n    text-decoration: underline;\n}"],"sourceRoot":""}]);
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
.projects >:last-child {
    display: grid;
    grid-auto-rows: min-content 1fr;
}

.projects >:last-child > .nav_projects {
    justify-self: end;
    margin-bottom: 1rem;
}

.projects >:last-child > .nav_projects > .btn_add_project {
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-items: flex-start;
    min-width: 100%;
    padding: var(--button-with-text-padding);
    column-gap: var(--column-gap-small);
    -webkit-column-gap: var(--column-gap-small);
    -moz-column-gap: var(--column-gap-small);
}`, "",{"version":3,"sources":["webpack://./src/styles/projects.css"],"names":[],"mappings":"AAAA,uDAAuD;AACvD;IACI,aAAa;IACb,+BAA+B;AACnC;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,mBAAmB;IACnB,yBAAyB;IACzB,eAAe;IACf,wCAAwC;IACxC,mCAAmC;IACnC,2CAA2C;IAC3C,wCAAwC;AAC5C","sourcesContent":["/* styles for list of projects on the content section */\n.projects >:last-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n}\n\n.projects >:last-child > .nav_projects {\n    justify-self: end;\n    margin-bottom: 1rem;\n}\n\n.projects >:last-child > .nav_projects > .btn_add_project {\n    background-color: rgba(0, 0, 0, 0.1);\n    display: flex;\n    align-items: center;\n    justify-items: flex-start;\n    min-width: 100%;\n    padding: var(--button-with-text-padding);\n    column-gap: var(--column-gap-small);\n    -webkit-column-gap: var(--column-gap-small);\n    -moz-column-gap: var(--column-gap-small);\n}"],"sourceRoot":""}]);
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
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

#form_project > #form > .form_item > label {
    text-transform: capitalize;
}`, "",{"version":3,"sources":["webpack://./src/styles/projects_form.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,0BAA0B;AAC9B","sourcesContent":["#form_project > #form {\n    padding: 1rem;\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n#form_project > #form > .form_item > label {\n    text-transform: capitalize;\n}"],"sourceRoot":""}]);
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
    display: flex;
    flex-direction: column;
    list-style: none;
    row-gap: 0.5rem;
}

.projects_list > * > * {
    display: flex;
    border-radius: 0.75rem;
    align-items: center;
}

.projects_list > * > li:hover,
.projects_list > * > li:has(> a.active),
#projects_container > *:first-child:has(> a.active) {
    background-color: rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

.projects_list > * > li:hover span,
.projects_list > * > li:has(> a.active):hover span {
    visibility: visible;
}

.projects_list > * > li > span,
.projects_list > * > li:has(> a.active) > span {
    visibility: hidden;
    margin-right: 0.5rem;
}

.projects_list > * > * > .nav_project {
    display: flex;
    align-items: center;
    flex: 1;
    padding: var(--button-with-text-padding);
}

.projects_list > * > * > .nav_project > span {
    flex: 1;
}

#projects_container > div > .btn_add_project,
.btn_delete_project {
    padding: var(--button-no-text-padding);
}

@media (hover: none) {
    /* targets only devices that can hover */
    .projects_list > * > li {
        font-weight: bold;
    }

    .projects_list > * > li span,
    .projects_list > * > li:has(> a.active) span {
        visibility: visible;
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/projects_list.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;;;IAGI,oCAAoC;IACpC,iBAAiB;AACrB;;AAEA;;IAEI,mBAAmB;AACvB;;AAEA;;IAEI,kBAAkB;IAClB,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,wCAAwC;AAC5C;;AAEA;IACI,OAAO;AACX;;AAEA;;IAEI,sCAAsC;AAC1C;;AAEA;IACI,wCAAwC;IACxC;QACI,iBAAiB;IACrB;;IAEA;;QAEI,mBAAmB;IACvB;AACJ","sourcesContent":[".projects_list > * {\n    display: flex;\n    flex-direction: column;\n    list-style: none;\n    row-gap: 0.5rem;\n}\n\n.projects_list > * > * {\n    display: flex;\n    border-radius: 0.75rem;\n    align-items: center;\n}\n\n.projects_list > * > li:hover,\n.projects_list > * > li:has(> a.active),\n#projects_container > *:first-child:has(> a.active) {\n    background-color: rgba(0, 0, 0, 0.1);\n    font-weight: bold;\n}\n\n.projects_list > * > li:hover span,\n.projects_list > * > li:has(> a.active):hover span {\n    visibility: visible;\n}\n\n.projects_list > * > li > span,\n.projects_list > * > li:has(> a.active) > span {\n    visibility: hidden;\n    margin-right: 0.5rem;\n}\n\n.projects_list > * > * > .nav_project {\n    display: flex;\n    align-items: center;\n    flex: 1;\n    padding: var(--button-with-text-padding);\n}\n\n.projects_list > * > * > .nav_project > span {\n    flex: 1;\n}\n\n#projects_container > div > .btn_add_project,\n.btn_delete_project {\n    padding: var(--button-no-text-padding);\n}\n\n@media (hover: none) {\n    /* targets only devices that can hover */\n    .projects_list > * > li {\n        font-weight: bold;\n    }\n\n    .projects_list > * > li span,\n    .projects_list > * > li:has(> a.active) span {\n        visibility: visible;\n    }\n}"],"sourceRoot":""}]);
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
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    transition: all 300ms ease-in-out;
    -webkit-transition: all 300ms ease-in-out;
    -moz-transition: all 300ms ease-in-out;
}

#sidebar.show {
    visibility: visible;
    transform: translateX(0%);
    -webkit-transform: translateX(0%);
    -moz-transform: translateX(0%);
    transition: transform 300ms ease-in-out;
    -webkit-transition: transform 300ms ease-in-out;
    -moz-transition: transform 300ms ease-in-out;
}

#sidebar > .container {
    height: inherit;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 1.25rem;
    background-color: var(--accent-secondary);
    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);
    width: min(75%, 350px);
}

.nav_project,
.nav_projects {
    text-decoration: none;
    column-gap: 0.75rem;
    -webkit-column-gap: 0.75rem;
    -moz-column-gap: 0.75rem;
}

#projects_container > *:first-child {
    display: flex;
    align-items: center;
}

#projects_container > *:first-child > .nav_projects {
    flex: 1;
    padding: var(--button-with-text-padding);
}

#projects_container >:first-child {
    border-radius: 0.75rem;
    margin-bottom: 0.5rem;
}

#projects_container > *:first-child:hover {
    background-color: rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

#sidebar > .container:hover .btn_add_project {
    visibility: visible;
    color: var(--accent-primary);
}

#projects_container > *:first-child > .btn_add_project {
    visibility: hidden;
    margin-right: 0.5rem;
}

@media screen and (min-width:768px) {
    #sidebar {
        visibility: visible;
        position: static;
        width: inherit;
    }

    #sidebar.show {
        width: min(40%, 350px);
        display: block;
        animation: slide-in-right 300ms ease-in-out;
        -webkit-animation: slide-in-right 300ms ease-in-out;
        -moz-animation: slide-in-right 300ms ease-in-out;
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
        -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
    }
}

@media (hover: none) {
    /* targets only devices that can hover */
    #projects_container > *:first-child {
        font-weight: bold;
    }

    #sidebar > .container:hover .btn_add_project {
        visibility: visible;
        color: var(--accent-primary);
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/sidebar.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,4BAA4B;IAC5B,oCAAoC;IACpC,iCAAiC;IACjC,iCAAiC;IACjC,yCAAyC;IACzC,sCAAsC;AAC1C;;AAEA;IACI,mBAAmB;IACnB,yBAAyB;IACzB,iCAAiC;IACjC,8BAA8B;IAC9B,uCAAuC;IACvC,+CAA+C;IAC/C,4CAA4C;AAChD;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,yCAAyC;IACzC,6CAA6C;IAC7C,sBAAsB;AAC1B;;AAEA;;IAEI,qBAAqB;IACrB,mBAAmB;IACnB,2BAA2B;IAC3B,wBAAwB;AAC5B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,OAAO;IACP,wCAAwC;AAC5C;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;IACI,oCAAoC;IACpC,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;IACnB,4BAA4B;AAChC;;AAEA;IACI,kBAAkB;IAClB,oBAAoB;AACxB;;AAEA;IACI;QACI,mBAAmB;QACnB,gBAAgB;QAChB,cAAc;IAClB;;IAEA;QACI,sBAAsB;QACtB,cAAc;QACd,2CAA2C;QAC3C,mDAAmD;QACnD,gDAAgD;IACpD;;IAEA;QACI,aAAa;IACjB;;IAEA;QACI,WAAW;QACX,6CAA6C;IACjD;AACJ;;AAEA;IACI;QACI,4BAA4B;QAC5B,oCAAoC;QACpC,iCAAiC;IACrC;;IAEA;QACI,yBAAyB;QACzB,iCAAiC;QACjC,8BAA8B;IAClC;AACJ;;AAEA;IACI,wCAAwC;IACxC;QACI,iBAAiB;IACrB;;IAEA;QACI,mBAAmB;QACnB,4BAA4B;IAChC;AACJ","sourcesContent":["#sidebar {\n    height: 100%;\n    width: 100%;\n    z-index: 99;\n    position: absolute;\n    visibility: hidden;\n}\n\n#sidebar.hide {\n    visibility: hidden;\n    transform: translateX(-100%);\n    -webkit-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    transition: all 300ms ease-in-out;\n    -webkit-transition: all 300ms ease-in-out;\n    -moz-transition: all 300ms ease-in-out;\n}\n\n#sidebar.show {\n    visibility: visible;\n    transform: translateX(0%);\n    -webkit-transform: translateX(0%);\n    -moz-transform: translateX(0%);\n    transition: transform 300ms ease-in-out;\n    -webkit-transition: transform 300ms ease-in-out;\n    -moz-transition: transform 300ms ease-in-out;\n}\n\n#sidebar > .container {\n    height: inherit;\n    display: flex;\n    flex-direction: column;\n    row-gap: 1rem;\n    padding: 1.25rem;\n    background-color: var(--accent-secondary);\n    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    width: min(75%, 350px);\n}\n\n.nav_project,\n.nav_projects {\n    text-decoration: none;\n    column-gap: 0.75rem;\n    -webkit-column-gap: 0.75rem;\n    -moz-column-gap: 0.75rem;\n}\n\n#projects_container > *:first-child {\n    display: flex;\n    align-items: center;\n}\n\n#projects_container > *:first-child > .nav_projects {\n    flex: 1;\n    padding: var(--button-with-text-padding);\n}\n\n#projects_container >:first-child {\n    border-radius: 0.75rem;\n    margin-bottom: 0.5rem;\n}\n\n#projects_container > *:first-child:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n    font-weight: bold;\n}\n\n#sidebar > .container:hover .btn_add_project {\n    visibility: visible;\n    color: var(--accent-primary);\n}\n\n#projects_container > *:first-child > .btn_add_project {\n    visibility: hidden;\n    margin-right: 0.5rem;\n}\n\n@media screen and (min-width:768px) {\n    #sidebar {\n        visibility: visible;\n        position: static;\n        width: inherit;\n    }\n\n    #sidebar.show {\n        width: min(40%, 350px);\n        display: block;\n        animation: slide-in-right 300ms ease-in-out;\n        -webkit-animation: slide-in-right 300ms ease-in-out;\n        -moz-animation: slide-in-right 300ms ease-in-out;\n    }\n\n    #sidebar.hide {\n        display: none;\n    }\n\n    #sidebar > .container {\n        width: 100%;\n        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    }\n}\n\n@keyframes slide-in-right {\n    0% {\n        transform: translateX(-100%);\n        -webkit-transform: translateX(-100%);\n        -moz-transform: translateX(-100%);\n    }\n\n    100% {\n        transform: translateX(0%);\n        -webkit-transform: translateX(0%);\n        -moz-transform: translateX(0%);\n    }\n}\n\n@media (hover: none) {\n    /* targets only devices that can hover */\n    #projects_container > *:first-child {\n        font-weight: bold;\n    }\n\n    #sidebar > .container:hover .btn_add_project {\n        visibility: visible;\n        color: var(--accent-primary);\n    }\n}"],"sourceRoot":""}]);
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

.form_item > #description {
    resize: vertical;
    max-height: 200px;
}

.form_item > #btn_priority,
.form_item > #btn_project {
    display: flex;
    align-items: center;
    column-gap: var(--column-gap);
    -webkit-column-gap: var(--column-gap-small);
    -moz-column-gap: var(--column-gap-small);
    padding: var(--button-with-text-padding);
}

.form_item > #btn_priority > .task_priority,
.form_item > #btn_project > .task_project {
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
    background: transparent;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_form.css"],"names":[],"mappings":"AAAA;IACI,oCAAoC;AACxC;;AAEA;IACI,aAAa;AACjB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,6BAA6B;IAC7B,2CAA2C;IAC3C,wCAAwC;IACxC,wCAAwC;AAC5C;;AAEA;;IAEI,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,uBAAuB;IACvB,yDAAyD;IACzD,4BAA4B;IAC5B,2BAA2B;IAC3B,0BAA0B;AAC9B","sourcesContent":["#form_task::backdrop  {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n#form_task > .form {\n    padding: 1rem;\n}\n\n#form_task > .form > div,\n.form_task > div {\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n.form_item > #description {\n    resize: vertical;\n    max-height: 200px;\n}\n\n.form_item > #btn_priority,\n.form_item > #btn_project {\n    display: flex;\n    align-items: center;\n    column-gap: var(--column-gap);\n    -webkit-column-gap: var(--column-gap-small);\n    -moz-column-gap: var(--column-gap-small);\n    padding: var(--button-with-text-padding);\n}\n\n.form_item > #btn_priority > .task_priority,\n.form_item > #btn_project > .task_project {\n    flex: 1;\n    text-align: left;\n}\n\n.form_item > #btn_priority:hover .img_wrapper_chevron {\n    visibility: visible;\n}\n\n.form_item > #btn_priority > .img_wrapper_chevron {\n    visibility: hidden;\n}\n\n.form_item > #project {\n    background: transparent;\n    background-image: url('../assets/icons/chevron_down.svg');\n    background-repeat: no-repeat;\n    background-position-x: 100%;\n    background-position-y: 50%;\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, `.tasks_list {
    margin-top: 1rem
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

.tasks_list > :first-child > div {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

.tasks_list > :first-child > div > .form_task {
    margin: 1rem 0;
    padding: 5%;
    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);
    border-radius: 0.5rem
}

div[role=button].task_new {
    animation: fade-in-scale 200ms ease-in;
    -webkit-animation: fade-in-scale 200ms ease-in;
    -moz-animation: fade-in-scale 200ms ease-in;
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
    padding: 1rem 0.25rem;
    column-gap: 0.75rem;
    -webkit-column-gap: 0.75rem;
    -moz-column-gap: 0.75rem;
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
    border-radius: var(--circle-radius);
}

.btn_checkbox_task > .checkbox_circle > svg {
    color: inherit;
    opacity: 0;
    fill: currentColor;
    border-radius: var(--circle-radius);
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
}

.task_list_item_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 0.35rem;
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

.task_actions > button {
    padding: var(--button-no-text-padding);
}

.task_actions > button > svg {
    width: clamp(1.5rem, 3vw, 2rem);
}

.btn_date_task {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    -webkit-column-gap: 0.5rem;
    -moz-column-gap: 0.5rem;
}

.btn_date_task > span {
    word-spacing: 0.15rem;
}

li > .btn_add_task {
    display: flex;
    align-items: center;
    padding: var(--button-with-text-padding);
    column-gap: var(--column-gap-small);
    -webkit-column-gap: var(--column-gap-small);
    -moz-column-gap: var(--column-gap-small);
}

li > button.btn_add_task:hover > div {
    background-color: var(--accent-primary);
    color: var(--background-primary);
    border-radius: var(--circle-radius);
}

li > button.btn_add_task:hover > span {
    color: var(--accent-primary);
    font-weight: bold;
}

@keyframes fade-in-scale {
    0% {
        opacity: 0;
        transform: scale(0);
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
    }

    100% {
        opacity: 1;
        transform: scale(1);
        -webkit-transform: scale(1);
        -webkit-transform: scale(1);
    }
}

@media (hover: none) {
    /* targets only devices that don't hover */
    .task_list_item > .container > .btn_checkbox_task >.checkbox_circle > svg {
        opacity: 1;
        background-color: color-mix(in srgb, currentColor 25%, transparent);
    }

    div[role=button] {
        cursor: pointer;
        box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);
        border-radius: 0.45rem;
    }

    div[role=button] .task_actions{
        visibility: visible;
    }

    li > button.btn_add_task > div {
        background-color: var(--accent-primary);
        color: var(--background-primary);
        border-radius: var(--circle-radius);
    }

    li > button.btn_add_task > span {
        color: var(--accent-primary);
        font-weight: bold;
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_list.css"],"names":[],"mappings":"AAAA;IACI;AACJ;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,cAAc;IACd,WAAW;IACX,2CAA2C;IAC3C;AACJ;;AAEA;IACI,sCAAsC;IACtC,8CAA8C;IAC9C,2CAA2C;AAC/C;;AAEA;IACI,8CAA8C;IAC9C,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,2CAA2C;IAC3C,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,qBAAqB;IACrB,mBAAmB;IACnB,2BAA2B;IAC3B,wBAAwB;AAC5B;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,iBAAiB;IACjB,gCAAgC;IAChC,mCAAmC;AACvC;;AAEA;IACI,cAAc;IACd,UAAU;IACV,kBAAkB;IAClB,mCAAmC;AACvC;;AAEA;IACI,UAAU;IACV,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;AAClC;;AAEA;IACI,OAAO;IACP,aAAa;IACb,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,sCAAsC;AAC1C;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,kBAAkB;IAClB,0BAA0B;IAC1B,uBAAuB;AAC3B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,wCAAwC;IACxC,mCAAmC;IACnC,2CAA2C;IAC3C,wCAAwC;AAC5C;;AAEA;IACI,uCAAuC;IACvC,gCAAgC;IAChC,mCAAmC;AACvC;;AAEA;IACI,4BAA4B;IAC5B,iBAAiB;AACrB;;AAEA;IACI;QACI,UAAU;QACV,mBAAmB;QACnB,2BAA2B;QAC3B,wBAAwB;IAC5B;;IAEA;QACI,UAAU;QACV,mBAAmB;QACnB,2BAA2B;QAC3B,2BAA2B;IAC/B;AACJ;;AAEA;IACI,0CAA0C;IAC1C;QACI,UAAU;QACV,mEAAmE;IACvE;;IAEA;QACI,eAAe;QACf,2CAA2C;QAC3C,sBAAsB;IAC1B;;IAEA;QACI,mBAAmB;IACvB;;IAEA;QACI,uCAAuC;QACvC,gCAAgC;QAChC,mCAAmC;IACvC;;IAEA;QACI,4BAA4B;QAC5B,iBAAiB;IACrB;AACJ","sourcesContent":[".tasks_list {\n    margin-top: 1rem\n}\n\n.tasks_list > :first-child {\n    row-gap: 1rem;\n}\n\n.tasks_list > :first-child {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    list-style: none;\n}\n\n.tasks_list > :first-child > div {\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n.tasks_list > :first-child > div > .form_task {\n    margin: 1rem 0;\n    padding: 5%;\n    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);\n    border-radius: 0.5rem\n}\n\ndiv[role=button].task_new {\n    animation: fade-in-scale 200ms ease-in;\n    -webkit-animation: fade-in-scale 200ms ease-in;\n    -moz-animation: fade-in-scale 200ms ease-in;\n}\n\ndiv[role=button] {\n    border-bottom: 2px solid rgba(66, 66, 66, 0.5);\n    padding: 0.5rem;\n}\n\ndiv[role=button]:hover {\n    cursor: pointer;\n    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);\n    border-radius: 0.45rem;\n}\n\n.task_list_item > .container {\n    display: flex;\n    padding: 1rem 0.25rem;\n    column-gap: 0.75rem;\n    -webkit-column-gap: 0.75rem;\n    -moz-column-gap: 0.75rem;\n}\n\n.task_list_item > .container > .btn_checkbox_task {\n    position: relative;\n    display: flex;\n    align-self: flex-start;\n}\n\n.btn_checkbox_task > .checkbox_circle {\n    display: flex;\n    border: 3px solid;\n    border-color: rgba(0, 0, 0, 0.5);\n    border-radius: var(--circle-radius);\n}\n\n.btn_checkbox_task > .checkbox_circle > svg {\n    color: inherit;\n    opacity: 0;\n    fill: currentColor;\n    border-radius: var(--circle-radius);\n}\n\n.task_list_item > .container > .btn_checkbox_task:hover >.checkbox_circle > svg {\n    opacity: 1;\n    background-color: color-mix(in srgb, currentColor 25%, transparent);\n}\n\n.checkbox_circle.priority_1 {\n    color: var(--priority-1-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_2 {\n    color: var(--priority-2-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_3 {\n    color: var(--priority-3-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_4 {\n    color: var(--priority-4-color);\n    border: 3px solid currentColor;\n}\n\n.task_list_item_content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.35rem;\n}\n\n.task_list_item_content > .task_name {\n    margin-bottom: 0.5rem;\n}\n\ndiv[role=button]:hover .task_actions{\n    visibility: visible;\n}\n\n.task_actions {\n    display: flex;\n    align-items: flex-start;\n    visibility: hidden;\n}\n\n.task_actions > button {\n    padding: var(--button-no-text-padding);\n}\n\n.task_actions > button > svg {\n    width: clamp(1.5rem, 3vw, 2rem);\n}\n\n.btn_date_task {\n    display: flex;\n    align-items: center;\n    column-gap: 0.5rem;\n    -webkit-column-gap: 0.5rem;\n    -moz-column-gap: 0.5rem;\n}\n\n.btn_date_task > span {\n    word-spacing: 0.15rem;\n}\n\nli > .btn_add_task {\n    display: flex;\n    align-items: center;\n    padding: var(--button-with-text-padding);\n    column-gap: var(--column-gap-small);\n    -webkit-column-gap: var(--column-gap-small);\n    -moz-column-gap: var(--column-gap-small);\n}\n\nli > button.btn_add_task:hover > div {\n    background-color: var(--accent-primary);\n    color: var(--background-primary);\n    border-radius: var(--circle-radius);\n}\n\nli > button.btn_add_task:hover > span {\n    color: var(--accent-primary);\n    font-weight: bold;\n}\n\n@keyframes fade-in-scale {\n    0% {\n        opacity: 0;\n        transform: scale(0);\n        -webkit-transform: scale(0);\n        -moz-transform: scale(0);\n    }\n\n    100% {\n        opacity: 1;\n        transform: scale(1);\n        -webkit-transform: scale(1);\n        -webkit-transform: scale(1);\n    }\n}\n\n@media (hover: none) {\n    /* targets only devices that don't hover */\n    .task_list_item > .container > .btn_checkbox_task >.checkbox_circle > svg {\n        opacity: 1;\n        background-color: color-mix(in srgb, currentColor 25%, transparent);\n    }\n\n    div[role=button] {\n        cursor: pointer;\n        box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);\n        border-radius: 0.45rem;\n    }\n\n    div[role=button] .task_actions{\n        visibility: visible;\n    }\n\n    li > button.btn_add_task > div {\n        background-color: var(--accent-primary);\n        color: var(--background-primary);\n        border-radius: var(--circle-radius);\n    }\n\n    li > button.btn_add_task > span {\n        color: var(--accent-primary);\n        font-weight: bold;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_options.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_options.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, `/* styles for priority options from tasks_priority.js module */
#task_select_project_options::backdrop,
#task_select_priority_options::backdrop {
    background-color: transparent;
}

#task_select_priority_options,
#task_select_project_options {
    border-radius: 1rem;
    border: none;
    box-shadow: 0px 0px 6px -2px rgb(0, 0, 0);
}

#task_select_priority_options > .container > ul > li,
#task_select_project_options > .container > ul > li {
    display: flex;
    align-items: center;
    column-gap: var(--column-gap-small);
    -webkit-column-gap: var(--column-gap-small);
    -moz-column-gap: var(--column-gap-small);
    padding: 0.5rem;
}

#task_select_priority_options > .container > ul > li:hover,
#task_select_project_options > .container > ul > li:hover {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.8rem;
}

/* task priorities */
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
}

@media (hover: none) {
    /* targets only devices that can hover */
    #task_select_priority_options > .container > ul > li,
    #task_select_project_options > .container > ul > li {
        padding: 0.8rem;
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_options.css"],"names":[],"mappings":"AAAA,8DAA8D;AAC9D;;IAEI,6BAA6B;AACjC;;AAEA;;IAEI,mBAAmB;IACnB,YAAY;IACZ,yCAAyC;AAC7C;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,mCAAmC;IACnC,2CAA2C;IAC3C,wCAAwC;IACxC,eAAe;AACnB;;AAEA;;IAEI,oCAAoC;IACpC,eAAe;AACnB;;AAEA,oBAAoB;AACpB;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,wCAAwC;IACxC;;QAEI,eAAe;IACnB;AACJ","sourcesContent":["/* styles for priority options from tasks_priority.js module */\n#task_select_project_options::backdrop,\n#task_select_priority_options::backdrop {\n    background-color: transparent;\n}\n\n#task_select_priority_options,\n#task_select_project_options {\n    border-radius: 1rem;\n    border: none;\n    box-shadow: 0px 0px 6px -2px rgb(0, 0, 0);\n}\n\n#task_select_priority_options > .container > ul > li,\n#task_select_project_options > .container > ul > li {\n    display: flex;\n    align-items: center;\n    column-gap: var(--column-gap-small);\n    -webkit-column-gap: var(--column-gap-small);\n    -moz-column-gap: var(--column-gap-small);\n    padding: 0.5rem;\n}\n\n#task_select_priority_options > .container > ul > li:hover,\n#task_select_project_options > .container > ul > li:hover {\n    background-color: rgba(0, 0, 0, 0.3);\n    padding: 0.8rem;\n}\n\n/* task priorities */\n.priority_1 {\n    color: var(--priority-1-color);\n}\n\n.priority_2 {\n    color: var(--priority-2-color);\n}\n\n.priority_3 {\n    color: var(--priority-3-color);\n}\n\n.priority_4  {\n    color: var(--priority-4-color);\n}\n\n@media (hover: none) {\n    /* targets only devices that can hover */\n    #task_select_priority_options > .container > ul > li,\n    #task_select_project_options > .container > ul > li {\n        padding: 0.8rem;\n    }\n}"],"sourceRoot":""}]);
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

/***/ "./src/styles/modal_removal.css":
/*!**************************************!*\
  !*** ./src/styles/modal_removal.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modal_removal_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./modal_removal.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/modal_removal.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_modal_removal_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_modal_removal_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_modal_removal_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_modal_removal_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/styles/tasks_options.css":
/*!**************************************!*\
  !*** ./src/styles/tasks_options.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_tasks_options_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tasks_options.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/tasks_options.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_tasks_options_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_tasks_options_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_tasks_options_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_tasks_options_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
        this.inputSearch = container.querySelector('.input_search');
    },
    bindEvents: function() {
        this.publish = this.publish.bind(this);
        this.animateNav = this.animateNav.bind(this);
        this.btnMenu.addEventListener('click', this.publish);
        this.btnHome.addEventListener('click', this.publish);
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.inputSearch.addEventListener('search', this.search);
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__.pubSub.subscribe('animate_nav', this.animateNav); //testing
    },
    headerContent: {
        headerLeft: [
            {
                element: 'button',
                attributes: {
                    className: 'btn_menu',
                },
                childElement: 'img',
                src: assets.icons.files['menu.svg'],
            },
            {
                element: 'button',
                attributes: {
                    className: 'btn_home today',
                },
                childElement: 'img',
                src: assets.icons.files['home.svg'],
            },
            {
                element: 'input',
                attributes: {
                    className: 'input_search',
                    type: 'search',
                },
                placeholder: 'Search',
            }
        ],
        headerRight: [
            {
                element: 'button',
                attributes: {
                    className: 'btn_add_task',
                },
                childElement: 'img',
                src: assets.icons.files['add.svg']
            },
            {
                element: 'a',
                attributes: {
                    className: 'github',
                    href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list',
                    target: '_blank',
                },
                childElement: 'img',
                src: assets.icons.files['github-mark/github-mark-white.svg'],
            }
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
                Object.assign(headerItem, item.attributes);
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
            });
            headerElement.appendChild(headerWrapper);
        }
        return headerElement;
    },
    publish: function(e) {
        const btn = e.currentTarget;
        const className = e ? e.currentTarget.className : null;
        let subscriber;
        if (className && className.includes('home')) {
            subscriber = 'content';
        } else {
            subscriber = 'toggleSidebar'
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__.pubSub.publish(subscriber, e.currentTarget);
    },
    search: function() {
        window.open(
            'https://www.youtube.com/watch?v=UVA7MDQr1Nc',
            '_blank'
        );
    },
    animateNav: function(e) {
        if (e) {

        } else {
            if (this.btnMenu.classList.contains('rotate')) {
                this.btnMenu.classList.remove('rotate');
            } else {
                this.btnMenu.classList.add('rotate');
            }
        }
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projects_list */ "./src/components/projects_list.js");






function buildMain() {
    mainContent.init();
    const main = document.createElement('main');
    main.id = 'main_content';
    mainContent.cacheDOM(main);
    mainContent.render();
    mainContent.bindEvents();

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.subscribe('content', mainContent.switchContent);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.subscribe('updateTabs', mainContent.updateTabs);
    return main;
}

const build = {
    projects: _components_projects__WEBPACK_IMPORTED_MODULE_0__["default"],
    project: _components_project_tasks__WEBPACK_IMPORTED_MODULE_1__["default"],
}

const mainContent = {
    activeContent: null,
    activeTab: null,
    navTabs: {
        getAllAnchors: function() {
            return this.static.concat(this.dynamic);
        },
    },
    init: function() {
        window.onload = () => { 
            this.navTabs.static = [
                document.querySelector(`a[href='#inbox']`),
                document.querySelector(`a[href='#today']`),
                document.querySelector(`.nav_projects`),
            ];

            this.navTabs.dynamic = [
                ..._projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find('sidebar').projectsListAnchors
            ];
            this.setActiveTab(this.navTabs.static[1]);
        };
    },
    updateTabs: function(anchors) {
        // updates navTabs.dynamic
        this.navTabs.dynamic = [...anchors];
    },
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
        
        if (document.readyState === 'complete') {
            this.setActiveTab(content);
        }

        this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.updateTabs = this.updateTabs.bind(this);
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        let renderKey = 'project';
        let uuid = null;
        if (e instanceof HTMLElement) {
            if (e.className.includes('today')) {
                // if home button is clicked
                    // renders the today section
                uuid = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.today[0].uuid;
            } else if (e.dataset.inboxUuid) {
                // if a project is the content and is deleted
                    // renders the inbox section
                uuid = e.dataset.inboxUuid;
            } else if (e.parentElement.dataset.uuid) {
                // renders respective project
                uuid = e.parentElement.dataset.uuid;
            } else {
                // renders projects section
                renderKey = 'projects';
            }
        } else if (e.uuid) {
            // new project created
            uuid = e.uuid;
        } else {
            uuid = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__.projectController.inbox[0].uuid;
        }
        this.render(renderKey, uuid);
    },
    setActiveTab: function(tab) {
        this.activeTab ? this.activeTab.classList.remove('active') : null;
        if (tab.firstChild.tagName !== 'H1') {
            this.activeTab = tab;
        } else {
            this.activeTab = this.navTabs.getAllAnchors().find(anchor => 
                anchor.href.split('#')[1].includes(tab.firstChild.textContent.toLowerCase())
            );
        }
        this.activeTab.classList.add('active');
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
/* harmony import */ var _styles_modal_removal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/modal_removal.css */ "./src/styles/modal_removal.css");



// mimics alert box confirming task/project removal
function buildModalRemove(obj) {
    const dialogElement = document.createElement('dialog');
    const form = document.createElement('form');

    dialogElement.id = 'modal';
    form.classList.add('form_removal');

    const modal = buildModal(dialogElement, form, obj);
    form.appendChild(modal.render());
    modal.cacheDOM();
    modal.bindEvents();

    dialogElement.appendChild(form);
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
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
        const container = document.createElement('div');
        const header = document.createElement('h4');
        const message = document.createElement('p');
        const itemForRemoval = document.createElement('strong');

        itemForRemoval.classList.add('item_for_removal');
        header.textContent = 'Delete?';
        itemForRemoval.textContent = this.selection.title ? this.selection.title : this.selection.name;
        const messageBeginTextNode = document.createTextNode(`Are you sure you want to delete `);
        const messageEndTextNode = document.createTextNode(`?`);
        
        message.appendChild(messageBeginTextNode)
        message.appendChild(itemForRemoval);
        message.appendChild(messageEndTextNode);
        container.appendChild(header);
        container.appendChild(message);

        const formButtons = document.createElement('div');
        formButtons.classList.add('form_buttons');
        this.buttons.forEach(item => {
            const button = Object.assign(document.createElement(item.element), item.attributes);
            button.textContent = item.text;
            formButtons.appendChild(button);
        })
        container.appendChild(formButtons);

        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        if (this.type === 'task') {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeTask', this.selection.uuidTask);
        } else {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('removeProject', this.selection.uuid);
            if (window.innerWidth < 768) {
                _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('hideSidebar');
            }
        }
        this.closeForm();
    },
    closeForm: function(e) {
        this.dialogElement.close()
        this.removeModal();
    },
    closeModal: function(e) {
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/buttons */ "./src/components/buttons.js");
/* harmony import */ var _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/tasks_form */ "./src/components/tasks_form.js");
/* harmony import */ var _components_tasks_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/tasks_list */ "./src/components/tasks_list.js");





// renders a project's page and it's tasks
// when we are at a project's page
    // we delete it from there or from the sidebar
        // change content to home
function buildProjectTasks(uuid) {
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.setActive(uuid);
    const project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.find(uuid);
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
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },
    render: function() {
        const projectsContainer = document.createElement('div');
        const header = document.createElement('h1');
        const list = document.createElement('ul');
        const listItem = document.createElement('li');
        
        projectsContainer.classList.add('task');
        list.classList.add('tasks_list');
        header.textContent = this.project.title;

        projectsContainer.appendChild(header);
        listItem.appendChild(_components_tasks_list__WEBPACK_IMPORTED_MODULE_3__.tasksList.init());
        listItem.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('add', 'task', 'Add task'));
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _styles_projects_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/projects.css */ "./src/styles/projects.css");






function buildProjects() {
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__.projectController.setActive();
    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects');
    const header = document.createElement('h1');
    
    header.textContent = 'Projects';

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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _components_projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_projects_form_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/projects_form.css */ "./src/styles/projects_form.css");





// renders a form to create a project
function buildProjectForm() {
    // projectController.setActive();
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
            className: 'project_input',
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
        _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.addProject(this.formInputs);
        _components_projects_list__WEBPACK_IMPORTED_MODULE_1__.buildList.find('sidebar').render(); // will render only the sidebar
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubSub.publish('content', _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.findActive());
        if (window.innerWidth < 768) {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubSub.publish('hideSidebar');
        }
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
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
        if (this.type === 'sidebar') {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('updateTabs', this.projectsListAnchors);
        }
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
            anchor.href = `#${this.array[i].title.toLowerCase()}`;

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
            this.cacheDOM(this.ulList);
            this.bindEvents();
        }
        return listItems;
    },
    removeProject: function(e) {
        if (e instanceof MouseEvent) {
            const listItem = e.currentTarget.parentElement.parentElement;
            // sets removeSelection for 'sidebar' and 'content' modules
            buildList.modules.forEach(module => {
                if (module.type !== 'misc') {
                    module.removeSelection = [...module.projectsListItems].find(item => item.dataset.uuid === listItem.dataset.uuid);
                }
            });

            const projectUUID = listItem.dataset.uuid;
            (0,_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.find(projectUUID));
        } else {
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.remove(e);
            // removes and resets removeSelection for 'sidebar' and 'content' modules 
            buildList.modules.forEach(module => {
                if (module.type !== 'misc' && module.removeSelection) {
                    module.removeSelection.remove();
                    module.removeSelection = null;
                }
            });
        }
    },
    publish: function(e) {
        e.preventDefault();

        _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', e.currentTarget);
        if ((this.type === 'sidebar'|| this.type === 'misc') && window.innerWidth < 768) {
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('hideSidebar');
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projects_list */ "./src/components/projects_list.js");
/* harmony import */ var _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _styles_sidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/sidebar.css */ "./src/styles/sidebar.css");








function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';

    if (window.innerWidth > 768) {
        sidebarWrapper.classList.add('show');
        sidebar.on = true;
    } else {
        sidebarWrapper.classList.add('hide');
    }

    sidebarWrapper.appendChild(sidebar.render());
    sidebar.cacheDOM(sidebarWrapper);
    touchController.init();
    sidebar.bindEvents();

    // published in header.js
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.subscribe('toggleSidebar', sidebar.toggleSidebar);
    // published in projects_list.js, projects_form.js, modal_remove.js
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.subscribe('hideSidebar', sidebar.hideSidebar);
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
        this.showSidebar = this.showSidebar.bind(this);
        this.hideSidebar = this.hideSidebar.bind(this);
        this.publish = this.publish.bind(this);
        this.callDimOverlay = this.callDimOverlay.bind(this);
        this.btnAddProject.addEventListener('click', _projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.anchorProjects.addEventListener('click', this.publish, { capture: true });
        this.sidebar.addEventListener('click', this.toggleSidebar);
        window.addEventListener('resize', this.callDimOverlay);
        document.body.addEventListener('touchstart', touchController.setTouchStart, false);
        document.body.addEventListener('touchend', touchController.setTouchEnd, false);
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
                this.hideSidebar();
            } else {
                this.showSidebar();
            }
        }
    },
    hideSidebar: function() {
        if (this.sidebar.classList.contains('show')) {
            this.sidebar.classList.remove('show');
            this.sidebar.classList.add('hide');
            this.callDimOverlay(); 
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('animate_nav');
        }
    },
    showSidebar: function() {
        if (!this.sidebar.classList.contains('show')) {
            this.sidebar.classList.remove('hide');
            this.sidebar.classList.add('show');
            this.callDimOverlay();
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('animate_nav');
        }
    },
    publish: function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        // when sidebar projects anchor is clicked
        // change content to projects
        // if window width is < 768px
            //sidebar will close 
        if (window.innerWidth < 768) {
            this.hideSidebar();
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('content', e.currentTarget);
    },
    callDimOverlay: function() {
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.publish('dim', this.sidebar);
    },
}

const touchController = {
    touchStartX: null,
    touchEndX: null,
    touchStartY: null,
    touchEndY: null,
    init: function() {
        this.swipe = this.swipe.bind(this);
        this.setTouchStart = this.setTouchStart.bind(this);
        this.setTouchEnd = this.setTouchEnd.bind(this);
    },
    setTouchStart: function(e) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
    },
    setTouchEnd: function(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.swipe();
    },
    swipe: function() {
        if (this.touchEndX < this.touchStartX) {
            // swipe left
            sidebar.hideSidebar();
        }

        if (this.touchEndX > this.touchStartX) {
            // swipe right
            sidebar.showSidebar();
        }

        if (this.touchEndY < this.touchStartY) {
            // swipe up
        }

        if (this.touchEndY > this.touchStartY) {
            // swipe down
        }
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _components_tasks_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/tasks_options */ "./src/components/tasks_options.js");
/* harmony import */ var _styles_tasks_form_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/tasks_form.css */ "./src/styles/tasks_form.css");
/* harmony import */ var _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/flag.svg */ "./src/assets/icons/flag.svg");
/* harmony import */ var _assets_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/icons/chevron_down.svg */ "./src/assets/icons/chevron_down.svg");
/* harmony import */ var _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/icons/circle.svg */ "./src/assets/icons/circle.svg");
/* harmony import */ var _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/icons/inbox.svg */ "./src/assets/icons/inbox.svg");









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
        form.scrollIntoView({ behavior: 'smooth'});
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
        this.btnProject = this.form.querySelector('#btn_project');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        this.btnPriority.addEventListener('click', _components_tasks_options__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.btnProject.addEventListener('click', _components_tasks_options__WEBPACK_IMPORTED_MODULE_2__["default"]);
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
                this.resetForm();
            }
        } else {
            this.closeForm();
            _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('resetOldTask', this.button);
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.find(this.listItem.dataset.uuidProj).updateTask(this.listItem.dataset.uuid, this.formInputs);
        }
    },
    closeForm: function(e) {
        if (!this.dialogElement) {
            this.form.replaceWith(this.button);
            buildForm.remove(this.type);
        } else {
            this.removeModal();
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('resetOldTask');
    },
    resetForm: function() {
        // resets all form inputs, type="hidden" included
        // resets priority/project button content
        for (let formChild in this.formChildren) {
            const formInput = this.formChildren[formChild];
            const attributes = formInput.attributes;
            [...this.formInputs].find(input => input.id === attributes.id).value = attributes.value;
            if (this.formChildren[formChild].sibiling) {
                const element = [...this.formInputs].find(input =>
                    formInput.sibiling.attributes.id === input.id && input.tagName === 'BUTTON'
                );
                let newIcon;
                const btnSVG = element.firstChild.firstChild
                if (btnSVG.className.baseVal !== '' && btnSVG.src !== formInput.sibiling.children[0].child.attributes.src) {
                    newIcon = new Image()
                    newIcon.setAttribute('onload', 'SVGInject(this)');
                    newIcon.src = formInput.sibiling.children[0].child.attributes.src;
                    btnSVG.parentElement.replaceChild(newIcon, btnSVG);
                }
                // need replace project if the current icon does not match default icon
                newIcon.className = formInput.sibiling.children[0].child.attributes.className;
                element.querySelector('span').textContent = formInput.sibiling.children[1].attributes.textContent;
            }
        }
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
                if (!inputs.formChildren[formChild].sibiling) {
                    let value;
                    if (formChild !== 'dueDate') {
                        value = { value: task[key] };
                    } else {
                        value = { value: new Date(task[key]).toISOString().split('T')[0] }
                    }
                    Object.assign(attributes, value);
                } else {
                    if (formChild === 'priority') {
                        inputs.formChildren[formChild].sibiling.children[0].child.attributes.className = `priority_${task.priority}`
                        inputs.formChildren[formChild].sibiling.children[1].attributes.textContent = `P${task.priority}`;
                        inputs.formChildren[formChild].attributes.value = task.priority;
                    }
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
                    value: '',
                }
            },
            description: {
                element: 'textarea',
                attributes: {
                    id: 'description',
                    className: 'task_input',
                    name: 'description',
                    placeholder: 'Description',
                    value: '',
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
                    value: '',
                }
            },
            dueTime: {
                element: 'input',
                attributes: {
                    id: 'due_time',
                    className: 'task_input',
                    name: 'time',
                    type: 'time',
                    placeholder: 'Time',
                    value: '',
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
                            className: 'img_wrapper',
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
                            className: 'img_wrapper',
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
                element: 'input',
                attributes: {
                    id: 'project',
                    className: 'task_input',
                    name: 'priority',
                    type: 'hidden',
                    placeholder: 'Project',
                    value: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.today[0].uuid ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.inbox[0].uuid : _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid,
                },
                sibiling: {
                    element: 'button',
                    attributes: {
                        id: 'btn_project',
                        className: 'task_input',
                        placeholder: 'Project',
                        type: 'button',
                    },
                    children: [
                    {
                        element: 'div',
                        attributes: {
                            className: 'img_wrapper',
                        },
                        child: { 
                            element: 'img', 
                            attributes: {
                                src: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.today[0].uuid || _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.inbox[0].uuid ? _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_7__ : _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__,
                                className: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.today[0].uuid || _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.inbox[0].uuid ? 'project_inbox': 'project_circle',
                            }
                        }
                    },
                    {
                        element: 'span',
                        attributes: {
                            className: 'task_project',
                            textContent: _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().uuid === _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.today[0].uuid ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.inbox[0].title : _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__.projectController.findActive().title,
                        }
                    },
                    {
                        element: 'div',
                        attributes: {
                            className: 'img_wrapper',
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
                },
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
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
            const taskCheckbox = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('checkbox', 'task');
            
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

            priority.classList.add('task_priority');
            priority.textContent = `Priority ${task.priority}`;

            taskCheckbox.firstElementChild.classList.add(`priority_${task.priority}`)

            listItemContainer.appendChild(taskCheckbox);
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

            const buttonDelete = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('delete', 'task');
            const buttonEdit = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('edit', 'task');
            taskActions.appendChild(buttonDelete);
            taskActions.appendChild(buttonEdit);

            listItemContainer.appendChild(taskContent);
            listItemContainer.appendChild(taskActions);
            listItem.appendChild(listItemContainer);

            listItemWrapper.appendChild(listItem);
            this.bindEvents(buttonDelete, taskCheckbox, listItemWrapper);

            if (!this.oldTask) {
                // appends new task
                listItemWrapper.classList.add('task_new');
                this.listContainer.appendChild(listItemWrapper);
                this.stopAnimation(listItemWrapper);
            } else {
                // appends updated task
                this.oldTask.replaceWith(listItemWrapper);
                this.oldTask = null;
            }
        } else {
            return document.createElement('div');
        }
    },
    completeTask: function(e) {
        e.stopImmediatePropagation();
        const listItem = e.currentTarget.parentElement.parentElement;
        this.removeSelection = listItem;
        this.removeTask();
    },
    removeTask: function(e) {
        // create a modal to confirm removal
        if (e instanceof MouseEvent) {
            e.stopImmediatePropagation();
            const listItem = e.currentTarget.parentElement.parentElement.parentElement;
            this.removeSelection = listItem;
            let uuidTask = listItem.dataset.uuid;
            (0,_components_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(this.project.findTask(uuidTask));  
        } else if (this.removeSelection) {
            this.project.removeTask(this.removeSelection.dataset.uuid);
            this.removeSelection.parentElement.remove();
            this.removeSelection = null;
        } else {
            this.oldTask.remove();
            this.oldTask = null;
        }
    },
    editTask: function(e) {
        this.oldTask = e.currentTarget;
        (0,_components_tasks_form__WEBPACK_IMPORTED_MODULE_3__["default"])(e);
    },
    resetOldTask: function(oldTask) {
        if (this.oldTask) {
            this.oldTask = null
        } else if (oldTask) {
            this.oldTask = oldTask;
        }
    },
    stopAnimation: function(e) {
        setTimeout(() => {
            e.removeAttribute('class');
        }, "200")
    }
}

/***/ }),

/***/ "./src/components/tasks_options.js":
/*!*****************************************!*\
  !*** ./src/components/tasks_options.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildSelectOptions)
/* harmony export */ });
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");
/* harmony import */ var _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/icons/flag.svg */ "./src/assets/icons/flag.svg");
/* harmony import */ var _assets_icons_check_small_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/icons/check_small.svg */ "./src/assets/icons/check_small.svg");
/* harmony import */ var _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/icons/circle.svg */ "./src/assets/icons/circle.svg");
/* harmony import */ var _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/inbox.svg */ "./src/assets/icons/inbox.svg");
/* harmony import */ var _styles_tasks_options_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/tasks_options.css */ "./src/styles/tasks_options.css");







const buildOptions = (type, button, dialog) => {
    let state = {
        type,
        button,
        dialog,
        icon: _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_1__,
        formItem: button.parentElement,
        btnIcon: button.querySelector('.img_wrapper').firstChild,
        btnSelectText: button.querySelector(`.task_${type}`),
    }

    if (type !== 'priority') {
        state.icon = _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_3__;
    }

    return Object.assign(
        {},
        options(state),
    )
}

// creates a modal for priority options
function buildSelectOptions(e) {
    const id = e.currentTarget.id.slice(e.currentTarget.id.indexOf('_') + 1);
    const dialogElement = document.createElement('dialog');
    const state = buildOptions(id, e.currentTarget, dialogElement);
    state.init();
    dialogElement.id = `task_select_${id}_options`;
    dialogElement.appendChild(state.render());
    document.body.appendChild(dialogElement);
    state.cacheDOM();
    state.bindEvents();
    dialogElement.showModal();
}

const options = (state) => ({
    type: state.type,
    dialogElement: state.dialog,
    currentSelection: null,
    btnSelect: state.button,
    btnSelectText: state.btnSelectText,
    btnIcon: state.btnIcon,
    optionIcon: state.icon,
    formItem: state.formItem,
    media: window.matchMedia('(min-width: 768px)'),
    observer: null,
    init: function() {
        this.input = document.querySelector(`#${this.type}`);
        this.currentSelection = this.input.value;
    },
    cacheDOM: function() {
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
        let projects = null;

        let i = 1;
        let length = 5;
        if (this.type === 'project') {
            i = 0;
            projects = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox.concat(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects)
            length = projects.length;
        }
        for (i; i < length; i++) {
            const option = document.createElement('li');
            const imageWrapper = document.createElement('div');
            const span = document.createElement('span');

            const image = new Image();
            if (this.type === 'project' && projects[i].title === 'Inbox') {
                image.src = _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__;
            } else {
                if (this.type === 'project') {
                    image.classList.add('project_circle');
                }
                image.src = this.optionIcon;
            }
            image.setAttribute('onload', 'SVGInject(this)');

            imageWrapper.classList.add('img_wrapper');
            option.classList.add('option')
            imageWrapper.appendChild(image);
            option.appendChild(imageWrapper);
            option.appendChild(span);

            if (this.type === 'project') {
                // image.classList.add(`${projects[i].title}`)
                option.dataset.value = projects[i].uuid;
                span.textContent = projects[i].title;
            } else {
                image.classList.add(`priority_${i}`);
                option.dataset.value = i;
                span.textContent = `Priority ${i}`;
            }

            if ((projects && projects[i].uuid === this.currentSelection) || (!projects && i === parseInt(this.currentSelection))) {
                option.classList.add(`selected`);
                const imgCheck = new Image();
                imgCheck.src = _assets_icons_check_small_svg__WEBPACK_IMPORTED_MODULE_2__;
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
        this.observer.unobserve(this.btnSelect);
    },
    select: function(e) {
        if (this.type === 'project') {
            this.input.value = e.currentTarget.dataset.value;
            this.btnSelectText.textContent = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.find(e.currentTarget.dataset.value).title;
            const newIcon = new Image()
            newIcon.src = e.currentTarget.dataset.value !== _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox[0].uuid ? _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_3__ : _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__;
            newIcon.classList.add(e.currentTarget.dataset.value !== _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox[0].uuid ? 'project_circle' : 'project_inbox');
            newIcon.setAttribute('onload', 'SVGInject(this)');
            if (newIcon.src !== this.btnIcon.dataset.injectUrl) {
                // if the new icon src and the current icon src are not the same
                // replace the node
                this.btnIcon.parentElement.replaceChild(newIcon, this.btnIcon);
            }
        } else {
            this.input.value = parseInt(e.currentTarget.dataset.value);
            this.btnSelectText.textContent = `P${this.input.value}`;
            this.btnIcon.className.baseVal = `priority_${this.input.value}`;
        }
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
})

/***/ }),

/***/ "./src/containers/project_controller.js":
/*!**********************************************!*\
  !*** ./src/containers/project_controller.js ***!
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
    const obj = {}
    inputs.forEach(input => { 
        if (input.id === 'priority') {
            obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length));
        } else if (input.id === 'due_date' && input.value.length === 0 && [...inputs].find(item => item.id === 'due_time').value.length !== 0) {
            // if time has a value and date has no value
                // date set to today's date
            obj[input.id] = new Date().toISOString().split('T')[0];
        } else if (input.value.length !== 0) {
            obj[input.id] = input.value
        }
    });
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
    },
    removeTask: function(uuid) {
        // if the remove task is in today
            // remove it from today AND it's respective project
        // if the task's date in today is edited 
            // remove it from only today
        const task = this.findTask(uuid);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        // removes task in respective project
        projectController.allProjects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.uuidTask === uuid) {
                    project.tasks.splice(project.tasks.indexOf(task), 1);
                }
            })
        })
        projectController.setAllProjects();
    },
    updateTask: function(uuid, inputs) {
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(this.findTask(uuid), formValues);
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
        const newProject = buildProject();
        this.projects.push(Object.assign(newProject, formValues));
        this.setAllProjects()
        this.setActive(newProject.uuid);
    },
    remove: function(uuid) {
        if (uuid === projectController.findActive().uuid) {
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish('content', projectController.inbox[0].uuid);
        }
        this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
        this.setAllProjects()
    },
    find: function(uuid) {
        return this.allProjects.find(project => project.uuid === uuid);
    },
    setActive: function(uuid) {
        if (this.findActive()) {
            this.findActive().active = false;
        }

        if (uuid) {
            this.find(uuid).active = true;
        } else if (!uuid && typeof uuid === 'boolean') {
            this.inbox.active = true;
        }
    },
    findActive: function() {
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/project_controller */ "./src/containers/project_controller.js");


// gets items from localStorage
function setProjects() {
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox = localStorage.getItem('inbox') ? JSON.parse(localStorage.getItem('inbox')) : _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox;
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.init();
}

// sets items in localStorage
function populateStorage() {
    localStorage.setItem('projects', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.projects));
    localStorage.setItem('inbox', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.inbox));
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

/***/ "./src/assets/fonts/Poppins/Poppins-Bold.ttf":
/*!***************************************************!*\
  !*** ./src/assets/fonts/Poppins/Poppins-Bold.ttf ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cdb29a5d7ccf57ff05a3.ttf";

/***/ }),

/***/ "./src/assets/fonts/Poppins/Poppins-ExtraBold.ttf":
/*!********************************************************!*\
  !*** ./src/assets/fonts/Poppins/Poppins-ExtraBold.ttf ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "01849ee091e1762a5dd5.ttf";

/***/ }),

/***/ "./src/assets/fonts/Poppins/Poppins-Light.ttf":
/*!****************************************************!*\
  !*** ./src/assets/fonts/Poppins/Poppins-Light.ttf ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7641a0f76ca9ef6c252c.ttf";

/***/ }),

/***/ "./src/assets/fonts/Poppins/Poppins-Medium.ttf":
/*!*****************************************************!*\
  !*** ./src/assets/fonts/Poppins/Poppins-Medium.ttf ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "673ed42382ab264e0bf5.ttf";

/***/ }),

/***/ "./src/assets/fonts/Poppins/Poppins-Regular.ttf":
/*!******************************************************!*\
  !*** ./src/assets/fonts/Poppins/Poppins-Regular.ttf ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "35d26b781dc5fda684cc.ttf";

/***/ }),

/***/ "./src/assets/fonts/Poppins/Poppins-SemiBold.ttf":
/*!*******************************************************!*\
  !*** ./src/assets/fonts/Poppins/Poppins-SemiBold.ttf ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ac8d04b620e54be9b0f0.ttf";

/***/ }),

/***/ "./src/assets/icons/add.svg":
/*!**********************************!*\
  !*** ./src/assets/icons/add.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "23ab17cb2dd5c9c5f6ca.svg";

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
module.exports = __webpack_require__.p + "5af2cec5989855074686.svg";

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
module.exports = __webpack_require__.p + "040f5ee6b57564bdd2fc.svg";

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
module.exports = __webpack_require__.p + "f0c1f863800cd4374812.svg";

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
module.exports = __webpack_require__.p + "8dc4b639e54ddfafd61d.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw4RUFBOEUsWUFBWSxhQUFhLFVBQVUsT0FBTyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcs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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw0RkFBNEYsS0FBSyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxL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Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZIOEM7QUFDVjs7QUFFcEM7QUFDZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0RBQU07QUFDbEIsVUFBVTtBQUNWLFlBQVksc0RBQU07QUFDbEI7QUFDQSxnQkFBZ0Isc0RBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SDZDOztBQUUvQjtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsc0RBQU07QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QnFFO0FBQ3JCO0FBQ007QUFDRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLElBQUksNkVBQWlCO0FBQ3JCLG9CQUFvQiw2RUFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0RBQWtELDhEQUFjO0FBQ2hFLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsNkRBQVM7QUFDdEMsNkJBQTZCLCtEQUFXO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaER3RDtBQUNSO0FBQ1c7QUFDVTtBQUNyQzs7QUFFakI7QUFDZixJQUFJLDZFQUFpQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscURBQXFELGlFQUFnQjtBQUNyRSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLCtEQUFXO0FBQzdDOztBQUVBLFFBQVEsZ0VBQVMsaUNBQWlDLDZFQUFpQjtBQUNuRSxRQUFRLGdFQUFTO0FBQ2pCLFFBQVEsZ0VBQVM7QUFDakI7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ3FFO0FBQ2I7QUFDVjtBQUNUOztBQUVyQztBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2RUFBaUI7QUFDekIsUUFBUSxnRUFBUywyQkFBMkI7QUFDNUMsUUFBUSxzREFBTSxvQkFBb0IsNkVBQWlCO0FBQ25EO0FBQ0EsWUFBWSxzREFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0dxRTtBQUNqQztBQUNVO0FBQ0E7QUFDSTtBQUNBO0FBQ0c7QUFDckI7QUFDSzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFNO0FBQ2xCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQU07QUFDZDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDOztBQUVoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsb0RBQVc7QUFDaEQsNkRBQTZELDZFQUFpQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxZQUFZLHlEQUFnQixDQUFDLDZFQUFpQjtBQUM5QyxVQUFVO0FBQ1YsWUFBWSw2RUFBaUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsUUFBUSxzREFBTTtBQUNkO0FBQ0EsWUFBWSxzREFBTTtBQUNsQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLE9BQU8sb0RBQVMsU0FBUyxvREFBUztBQUMxRCxNQUFNO0FBQ04sd0JBQXdCLFFBQVEscURBQVc7QUFDM0M7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0ttRDtBQUNkO0FBQ1c7QUFDd0I7QUFDM0I7QUFDSTtBQUNmOztBQUVuQjtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHNEQUFNO0FBQ1Y7QUFDQSxJQUFJLHNEQUFNO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLFdBQVcsaUVBQVMsQ0FBQyxzREFBc0Q7QUFDM0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHNEQUFnQjtBQUNyRSxzRUFBc0UsZUFBZTtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLFFBQVEsNkVBQWlCO0FBQ3pCO0FBQ0EsUUFBUSxxREFBUyxzQkFBc0IsNkVBQWlCO0FBQ3hELFFBQVEscURBQVM7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLG9EQUFXO0FBQzdDOztBQUVBLFFBQVEscURBQVMsbUNBQW1DLDZFQUFpQjtBQUNyRSxRQUFRLHFEQUFTOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBTTtBQUNsQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBTTtBQUNsQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQU07QUFDZCxLQUFLO0FBQ0w7QUFDQSxRQUFRLHNEQUFNO0FBQ2QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSzhDO0FBQ3VCO0FBQ1I7QUFDNUI7QUFDZTtBQUNlO0FBQ1g7QUFDRjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixtQkFBbUI7QUFDakQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxpRUFBa0I7QUFDckUsa0RBQWtELGlFQUFrQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxZQUFZLDZFQUFpQjtBQUM3QjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxZQUFZLHNEQUFNO0FBQ2xCLFlBQVksNkVBQWlCO0FBQzdCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRLHNEQUFNO0FBQ2QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQSwrQkFBK0IsNkVBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsc0JBQXNCO0FBQ3RCLGtDQUFrQztBQUNsQztBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EscUhBQXFILGNBQWM7QUFDbkkseUdBQXlHLGNBQWM7QUFDdkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxtREFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyREFBZTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw2RUFBaUIsdUJBQXVCLDZFQUFpQixpQkFBaUIsNkVBQWlCLGlCQUFpQiw2RUFBaUI7QUFDeEosaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZFQUFpQix1QkFBdUIsNkVBQWlCLGtCQUFrQiw2RUFBaUIsdUJBQXVCLDZFQUFpQixpQkFBaUIsb0RBQVMsR0FBRyxxREFBVTtBQUNoTiwyQ0FBMkMsNkVBQWlCLHVCQUF1Qiw2RUFBaUIsa0JBQWtCLDZFQUFpQix1QkFBdUIsNkVBQWlCO0FBQy9LO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkVBQWlCLHVCQUF1Qiw2RUFBaUIsaUJBQWlCLDZFQUFpQixrQkFBa0IsNkVBQWlCO0FBQ3ZLO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyREFBZTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdjcUU7QUFDckI7QUFDVTtBQUNKO0FBQ1I7QUFDWjs7QUFFM0I7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFNO0FBQ2QsUUFBUSxzREFBTTtBQUNkLFFBQVEsc0RBQU07QUFDZCxRQUFRLHNEQUFNO0FBQ2QsdUJBQXVCLDZFQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0RBQVc7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsY0FBYzs7QUFFN0QscUVBQXFFLGNBQWM7O0FBRW5GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RCxrREFBa0QsY0FBYztBQUNoRSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQixzQ0FBc0MscUJBQXFCLEVBQUUsNkNBQTZDO0FBQzFHO0FBQ0E7QUFDQSx1Q0FBdUMsK0RBQVc7QUFDbEQ7QUFDQTtBQUNBOztBQUVBLGlDQUFpQywrREFBVztBQUM1QywrQkFBK0IsK0RBQVc7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0VBQWdCO0FBQzVCLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLGtFQUFjO0FBQ3RCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUtxRTtBQUNyQjtBQUNRO0FBQ0g7QUFDSDtBQUNiOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtREFBUTtBQUN0QjtBQUNBO0FBQ0EscURBQXFELEtBQUs7QUFDMUQ7O0FBRUE7QUFDQSxxQkFBcUIscURBQVc7QUFDaEM7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxHQUFHO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsVUFBVTtBQUMxRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNkVBQWlCLGNBQWMsNkVBQWlCO0FBQ3ZFO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixvREFBUztBQUNyQyxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsa0JBQWtCO0FBQzVEO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQSwrQ0FBK0MsRUFBRTtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMERBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyw2RUFBaUI7QUFDOUQ7QUFDQSw0REFBNEQsNkVBQWlCLGlCQUFpQixxREFBVyxHQUFHLG9EQUFTO0FBQ3JILG9FQUFvRSw2RUFBaUI7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsaURBQWlELGlCQUFpQjtBQUNsRSx5REFBeUQsaUJBQWlCO0FBQzFFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSxTQUFTLE1BQU0sNkNBQTZDO0FBQ3RJLHNCQUFzQjtBQUN0QiwwRUFBMEUsU0FBUyxNQUFNLGNBQWM7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTGlDO0FBQ21COztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0MsZ0JBQWdCLDJDQUFNO0FBQ3RCO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsWUFBWSwyQ0FBTTtBQUNsQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyQ0FBTTtBQUNsQjtBQUNBLGdCQUFnQiwyQ0FBTTtBQUN0QixjQUFjOztBQUVkO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsZ0NBQWdDLGlCQUFpQjtBQUNqRCxvQkFBb0IsMkNBQU07QUFDMUIsa0JBQWtCO0FBQ2xCLG9CQUFvQiwyQ0FBTTtBQUMxQjtBQUNBLGNBQWM7QUFDZCxnQkFBZ0IsMkNBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7O0FBR007QUFDUCwyQ0FBMkMsZ0JBQWdCO0FBQzNELDJDQUEyQyxlQUFlO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWSwyQ0FBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtFQUFlO0FBQ3ZCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOzs7Ozs7Ozs7Ozs7Ozs7QUM5TE87QUFDUCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIseUNBQXlDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJxRTs7QUFFckU7QUFDTztBQUNQLElBQUksNkVBQWlCO0FBQ3JCLElBQUksNkVBQWlCLHFGQUFxRiw2RUFBaUI7QUFDM0gsSUFBSSw2RUFBaUI7QUFDckI7O0FBRUE7QUFDTztBQUNQLG9EQUFvRCw2RUFBaUI7QUFDckUsaURBQWlELDZFQUFpQjtBQUNsRTs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGFBQWE7QUFDYiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AaWNvbmZ1L3N2Zy1pbmplY3QvZGlzdC9zdmctaW5qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcHAuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL21vZGFsX3JlbW92YWwuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX29wdGlvbnMuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmNzcz9hNjcyIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzcz9lNjhiIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvbW9kYWxfcmVtb3ZhbC5jc3M/ZTc2OCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzLmNzcz8xYWFhIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3M/NjFjNSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzPzEyZDIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9zaWRlYmFyLmNzcz80ODE2Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3M/OThlOCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2xpc3QuY3NzPzcxNTEiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19vcHRpb25zLmNzcz84NTA5Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2ljb25zLyBzeW5jIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9idXR0b25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9tYWluLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL21vZGFsX3JlbW92ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9vdmVybGF5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RfdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdHNfZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0c19saXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy90YXNrc19mb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Rhc2tzX2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvdGFza3Nfb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbnRhaW5lcnMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3V0aWxpdGllcy9pbXBvcnQtYWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU1ZHSW5qZWN0IC0gVmVyc2lvbiAxLjIuM1xuICogQSB0aW55LCBpbnR1aXRpdmUsIHJvYnVzdCwgY2FjaGluZyBzb2x1dGlvbiBmb3IgaW5qZWN0aW5nIFNWRyBmaWxlcyBpbmxpbmUgaW50byB0aGUgRE9NLlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9pY29uZnUvc3ZnLWluamVjdFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxOCBJTkNPUlMsIHRoZSBjcmVhdG9ycyBvZiBpY29uZnUuY29tXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9pY29uZnUvc3ZnLWluamVjdC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgLy8gY29uc3RhbnRzIGZvciBiZXR0ZXIgbWluaWZpY2F0aW9uXG4gIHZhciBfQ1JFQVRFX0VMRU1FTlRfID0gJ2NyZWF0ZUVsZW1lbnQnO1xuICB2YXIgX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV8gPSAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnO1xuICB2YXIgX0xFTkdUSF8gPSAnbGVuZ3RoJztcbiAgdmFyIF9TVFlMRV8gPSAnc3R5bGUnO1xuICB2YXIgX1RJVExFXyA9ICd0aXRsZSc7XG4gIHZhciBfVU5ERUZJTkVEXyA9ICd1bmRlZmluZWQnO1xuICB2YXIgX1NFVF9BVFRSSUJVVEVfID0gJ3NldEF0dHJpYnV0ZSc7XG4gIHZhciBfR0VUX0FUVFJJQlVURV8gPSAnZ2V0QXR0cmlidXRlJztcblxuICB2YXIgTlVMTCA9IG51bGw7XG5cbiAgLy8gY29uc3RhbnRzXG4gIHZhciBfX1NWR0lOSkVDVCA9ICdfX3N2Z0luamVjdCc7XG4gIHZhciBJRF9TVUZGSVggPSAnLS1pbmplY3QtJztcbiAgdmFyIElEX1NVRkZJWF9SRUdFWCA9IG5ldyBSZWdFeHAoSURfU1VGRklYICsgJ1xcXFxkKycsIFwiZ1wiKTtcbiAgdmFyIExPQURfRkFJTCA9ICdMT0FEX0ZBSUwnO1xuICB2YXIgU1ZHX05PVF9TVVBQT1JURUQgPSAnU1ZHX05PVF9TVVBQT1JURUQnO1xuICB2YXIgU1ZHX0lOVkFMSUQgPSAnU1ZHX0lOVkFMSUQnO1xuICB2YXIgQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUyA9IFsnc3JjJywgJ2FsdCcsICdvbmxvYWQnLCAnb25lcnJvciddO1xuICB2YXIgQV9FTEVNRU5UID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oJ2EnKTtcbiAgdmFyIElTX1NWR19TVVBQT1JURUQgPSB0eXBlb2YgU1ZHUmVjdCAhPSBfVU5ERUZJTkVEXztcbiAgdmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB1c2VDYWNoZTogdHJ1ZSxcbiAgICBjb3B5QXR0cmlidXRlczogdHJ1ZSxcbiAgICBtYWtlSWRzVW5pcXVlOiB0cnVlXG4gIH07XG4gIC8vIE1hcCBvZiBJUkkgcmVmZXJlbmNlYWJsZSB0YWcgbmFtZXMgdG8gcHJvcGVydGllcyB0aGF0IGNhbiByZWZlcmVuY2UgdGhlbS4gVGhpcyBpcyBkZWZpbmVkIGluXG4gIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9saW5raW5nLmh0bWwjcHJvY2Vzc2luZ0lSSVxuICB2YXIgSVJJX1RBR19QUk9QRVJUSUVTX01BUCA9IHtcbiAgICBjbGlwUGF0aDogWydjbGlwLXBhdGgnXSxcbiAgICAnY29sb3ItcHJvZmlsZSc6IE5VTEwsXG4gICAgY3Vyc29yOiBOVUxMLFxuICAgIGZpbHRlcjogTlVMTCxcbiAgICBsaW5lYXJHcmFkaWVudDogWydmaWxsJywgJ3N0cm9rZSddLFxuICAgIG1hcmtlcjogWydtYXJrZXInLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCddLFxuICAgIG1hc2s6IE5VTEwsXG4gICAgcGF0dGVybjogWydmaWxsJywgJ3N0cm9rZSddLFxuICAgIHJhZGlhbEdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ11cbiAgfTtcbiAgdmFyIElOSkVDVEVEID0gMTtcbiAgdmFyIEZBSUwgPSAyO1xuXG4gIHZhciB1bmlxdWVJZENvdW50ZXIgPSAxO1xuICB2YXIgeG1sU2VyaWFsaXplcjtcbiAgdmFyIGRvbVBhcnNlcjtcblxuXG4gIC8vIGNyZWF0ZXMgYW4gU1ZHIGRvY3VtZW50IGZyb20gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdTdHJpbmdUb1N2Z0RvYyhzdmdTdHIpIHtcbiAgICBkb21QYXJzZXIgPSBkb21QYXJzZXIgfHwgbmV3IERPTVBhcnNlcigpO1xuICAgIHJldHVybiBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN2Z1N0ciwgJ3RleHQveG1sJyk7XG4gIH1cblxuXG4gIC8vIHNlYXJpYWxpemVzIGFuIFNWRyBlbGVtZW50IHRvIGFuIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW1lbnQpIHtcbiAgICB4bWxTZXJpYWxpemVyID0geG1sU2VyaWFsaXplciB8fCBuZXcgWE1MU2VyaWFsaXplcigpO1xuICAgIHJldHVybiB4bWxTZXJpYWxpemVyLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Z0VsZW1lbnQpO1xuICB9XG5cblxuICAvLyBSZXR1cm5zIHRoZSBhYnNvbHV0ZSB1cmwgZm9yIHRoZSBzcGVjaWZpZWQgdXJsXG4gIGZ1bmN0aW9uIGdldEFic29sdXRlVXJsKHVybCkge1xuICAgIEFfRUxFTUVOVC5ocmVmID0gdXJsO1xuICAgIHJldHVybiBBX0VMRU1FTlQuaHJlZjtcbiAgfVxuXG5cbiAgLy8gTG9hZCBzdmcgd2l0aCBhbiBYSFIgcmVxdWVzdFxuICBmdW5jdGlvbiBsb2FkU3ZnKHVybCwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICBpZiAodXJsKSB7XG4gICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgLy8gcmVhZHlTdGF0ZSBpcyBET05FXG4gICAgICAgICAgdmFyIHN0YXR1cyA9IHJlcS5zdGF0dXM7XG4gICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIC8vIHJlcXVlc3Qgc3RhdHVzIGlzIE9LXG4gICAgICAgICAgICBjYWxsYmFjayhyZXEucmVzcG9uc2VYTUwsIHJlcS5yZXNwb25zZVRleHQudHJpbSgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAgIC8vIHJlcXVlc3Qgc3RhdHVzIGlzIGVycm9yICg0eHggb3IgNXh4KVxuICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIC8vIHJlcXVlc3Qgc3RhdHVzIDAgY2FuIGluZGljYXRlIGEgZmFpbGVkIGNyb3NzLWRvbWFpbiBjYWxsXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICByZXEuc2VuZCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gQ29weSBhdHRyaWJ1dGVzIGZyb20gaW1nIGVsZW1lbnQgdG8gc3ZnIGVsZW1lbnRcbiAgZnVuY3Rpb24gY29weUF0dHJpYnV0ZXMoaW1nRWxlbSwgc3ZnRWxlbSkge1xuICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgdmFyIGF0dHJpYnV0ZU5hbWU7XG4gICAgdmFyIGF0dHJpYnV0ZVZhbHVlO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW1nRWxlbS5hdHRyaWJ1dGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcbiAgICAgIC8vIE9ubHkgY29weSBhdHRyaWJ1dGVzIG5vdCBleHBsaWNpdGx5IGV4Y2x1ZGVkIGZyb20gY29weWluZ1xuICAgICAgaWYgKEFUVFJJQlVURV9FWENMVVNJT05fTkFNRVMuaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSA9PSAtMSkge1xuICAgICAgICBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgLy8gSWYgaW1nIGF0dHJpYnV0ZSBpcyBcInRpdGxlXCIsIGluc2VydCBhIHRpdGxlIGVsZW1lbnQgaW50byBTVkcgZWxlbWVudFxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PSBfVElUTEVfKSB7XG4gICAgICAgICAgdmFyIHRpdGxlRWxlbTtcbiAgICAgICAgICB2YXIgZmlyc3RFbGVtZW50Q2hpbGQgPSBzdmdFbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRDaGlsZCAmJiBmaXJzdEVsZW1lbnRDaGlsZC5sb2NhbE5hbWUudG9Mb3dlckNhc2UoKSA9PSBfVElUTEVfKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgU1ZHIGVsZW1lbnQncyBmaXJzdCBjaGlsZCBpcyBhIHRpdGxlIGVsZW1lbnQsIGtlZXAgaXQgYXMgdGhlIHRpdGxlIGVsZW1lbnRcbiAgICAgICAgICAgIHRpdGxlRWxlbSA9IGZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgU1ZHIGVsZW1lbnQncyBmaXJzdCBjaGlsZCBlbGVtZW50IGlzIG5vdCBhIHRpdGxlIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyB0aXRsZVxuICAgICAgICAgICAgLy8gZWxlLGVtdCBhbmQgc2V0IGl0IGFzIHRoZSBmaXJzdCBjaGlsZFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UXyArICdOUyddKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIF9USVRMRV8pO1xuICAgICAgICAgICAgc3ZnRWxlbS5pbnNlcnRCZWZvcmUodGl0bGVFbGVtLCBmaXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNldCBuZXcgdGl0bGUgY29udGVudFxuICAgICAgICAgIHRpdGxlRWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZVZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNldCBpbWcgYXR0cmlidXRlIHRvIHN2ZyBlbGVtZW50XG4gICAgICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBhcHBlbmRzIGEgc3VmZml4IHRvIElEcyBvZiByZWZlcmVuY2VkIGVsZW1lbnRzIGluIHRoZSA8ZGVmcz4gaW4gb3JkZXIgdG8gIHRvIGF2b2lkIElEIGNvbGxpc2lvblxuICAvLyBiZXR3ZWVuIG11bHRpcGxlIGluamVjdGVkIFNWR3MuIFRoZSBzdWZmaXggaGFzIHRoZSBmb3JtIFwiLS1pbmplY3QtWFwiLCB3aGVyZSBYIGlzIGEgcnVubmluZyBudW1iZXIgd2hpY2ggaXNcbiAgLy8gaW5jcmVtZW50ZWQgd2l0aCBlYWNoIGluamVjdGlvbi4gUmVmZXJlbmNlcyB0byB0aGUgSURzIGFyZSBhZGp1c3RlZCBhY2NvcmRpbmdseS5cbiAgLy8gV2UgYXNzdW1lIHRoYSBhbGwgSURzIHdpdGhpbiB0aGUgaW5qZWN0ZWQgU1ZHIGFyZSB1bmlxdWUsIHRoZXJlZm9yZSB0aGUgc2FtZSBzdWZmaXggY2FuIGJlIHVzZWQgZm9yIGFsbCBJRHMgb2Ygb25lXG4gIC8vIGluamVjdGVkIFNWRy5cbiAgLy8gSWYgdGhlIG9ubHlSZWZlcmVuY2VkIGFyZ3VtZW50IGlzIHNldCB0byB0cnVlLCBvbmx5IHRob3NlIElEcyB3aWxsIGJlIG1hZGUgdW5pcXVlIHRoYXQgYXJlIHJlZmVyZW5jZWQgZnJvbSB3aXRoaW4gdGhlIFNWR1xuICBmdW5jdGlvbiBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIG9ubHlSZWZlcmVuY2VkKSB7XG4gICAgdmFyIGlkU3VmZml4ID0gSURfU1VGRklYICsgdW5pcXVlSWRDb3VudGVyKys7XG4gICAgLy8gUmVndWxhciBleHByZXNzaW9uIGZvciBmdW5jdGlvbmFsIG5vdGF0aW9ucyBvZiBhbiBJUkkgcmVmZXJlbmNlcy4gVGhpcyB3aWxsIGZpbmQgb2NjdXJlbmNlcyBpbiB0aGUgZm9ybVxuICAgIC8vIHVybCgjYW55SWQpIG9yIHVybChcIiNhbnlJZFwiKSAoZm9yIEludGVybmV0IEV4cGxvcmVyKSBhbmQgY2FwdHVyZSB0aGUgcmVmZXJlbmNlZCBJRFxuICAgIHZhciBmdW5jSXJpUmVnZXggPSAvdXJsXFwoXCI/IyhbYS16QS1aXVtcXHc6Li1dKilcIj9cXCkvZztcbiAgICAvLyBHZXQgYWxsIGVsZW1lbnRzIHdpdGggYW4gSUQuIFRoZSBTVkcgc3BlYyByZWNvbW1lbmRzIHRvIHB1dCByZWZlcmVuY2VkIGVsZW1lbnRzIGluc2lkZSA8ZGVmcz4gZWxlbWVudHMsIGJ1dFxuICAgIC8vIHRoaXMgaXMgbm90IGEgcmVxdWlyZW1lbnQsIHRoZXJlZm9yZSB3ZSBoYXZlIHRvIHNlYXJjaCBmb3IgSURzIGluIHRoZSB3aG9sZSBTVkcuXG4gICAgdmFyIGlkRWxlbWVudHMgPSBzdmdFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF0nKTtcbiAgICB2YXIgaWRFbGVtO1xuICAgIC8vIEFuIG9iamVjdCBjb250YWluaW5nIHJlZmVyZW5jZWQgSURzICBhcyBrZXlzIGlzIHVzZWQgaWYgb25seSByZWZlcmVuY2VkIElEcyBzaG91bGQgYmUgdW5pcXVpZmllZC5cbiAgICAvLyBJZiB0aGlzIG9iamVjdCBkb2VzIG5vdCBleGlzdCwgYWxsIElEcyB3aWxsIGJlIHVuaXF1aWZpZWQuXG4gICAgdmFyIHJlZmVyZW5jZWRJZHMgPSBvbmx5UmVmZXJlbmNlZCA/IFtdIDogTlVMTDtcbiAgICB2YXIgdGFnTmFtZTtcbiAgICB2YXIgaXJpVGFnTmFtZXMgPSB7fTtcbiAgICB2YXIgaXJpUHJvcGVydGllcyA9IFtdO1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIGksIGo7XG5cbiAgICBpZiAoaWRFbGVtZW50c1tfTEVOR1RIX10pIHtcbiAgICAgIC8vIE1ha2UgYWxsIElEcyB1bmlxdWUgYnkgYWRkaW5nIHRoZSBJRCBzdWZmaXggYW5kIGNvbGxlY3QgYWxsIGVuY291bnRlcmVkIHRhZyBuYW1lc1xuICAgICAgLy8gdGhhdCBhcmUgSVJJIHJlZmVyZW5jZWFibGUgZnJvbSBwcm9wZXJpdGllcy5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpZEVsZW1lbnRzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICAgIHRhZ05hbWUgPSBpZEVsZW1lbnRzW2ldLmxvY2FsTmFtZTsgLy8gVXNlIG5vbi1uYW1lc3BhY2VkIHRhZyBuYW1lXG4gICAgICAgIC8vIE1ha2UgSUQgdW5pcXVlIGlmIHRhZyBuYW1lIGlzIElSSSByZWZlcmVuY2VhYmxlXG4gICAgICAgIGlmICh0YWdOYW1lIGluIElSSV9UQUdfUFJPUEVSVElFU19NQVApIHtcbiAgICAgICAgICBpcmlUYWdOYW1lc1t0YWdOYW1lXSA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEdldCBhbGwgcHJvcGVydGllcyB0aGF0IGFyZSBtYXBwZWQgdG8gdGhlIGZvdW5kIElSSSByZWZlcmVuY2VhYmxlIHRhZ3NcbiAgICAgIGZvciAodGFnTmFtZSBpbiBpcmlUYWdOYW1lcykge1xuICAgICAgICAoSVJJX1RBR19QUk9QRVJUSUVTX01BUFt0YWdOYW1lXSB8fCBbdGFnTmFtZV0pLmZvckVhY2goZnVuY3Rpb24gKG1hcHBlZFByb3BlcnR5KSB7XG4gICAgICAgICAgLy8gQWRkIG1hcHBlZCBwcm9wZXJ0aWVzIHRvIGFycmF5IG9mIGlyaSByZWZlcmVuY2luZyBwcm9wZXJ0aWVzLlxuICAgICAgICAgIC8vIFVzZSBsaW5lYXIgc2VhcmNoIGhlcmUgYmVjYXVzZSB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIGVudHJpZXMgaXMgdmVyeSBzbWFsbCAobWF4aW11bSAxMSlcbiAgICAgICAgICBpZiAoaXJpUHJvcGVydGllcy5pbmRleE9mKG1hcHBlZFByb3BlcnR5KSA8IDApIHtcbiAgICAgICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChtYXBwZWRQcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXSkge1xuICAgICAgICAvLyBBZGQgXCJzdHlsZVwiIHRvIHByb3BlcnRpZXMsIGJlY2F1c2UgaXQgbWF5IGNvbnRhaW4gcmVmZXJlbmNlcyBpbiB0aGUgZm9ybSAnc3R5bGU9XCJmaWxsOnVybCgjbXlGaWxsKVwiJ1xuICAgICAgICBpcmlQcm9wZXJ0aWVzLnB1c2goX1NUWUxFXyk7XG4gICAgICB9XG4gICAgICAvLyBSdW4gdGhyb3VnaCBhbGwgZWxlbWVudHMgb2YgdGhlIFNWRyBhbmQgcmVwbGFjZSBJRHMgaW4gcmVmZXJlbmNlcy5cbiAgICAgIC8vIFRvIGdldCBhbGwgZGVzY2VuZGluZyBlbGVtZW50cywgZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSBzZWVtcyB0byBwZXJmb3JtIGZhc3RlciB0aGFuIHF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5cbiAgICAgIC8vIFNpbmNlIHN2Z0VsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSBkb2VzIG5vdCByZXR1cm4gdGhlIHN2ZyBlbGVtZW50IGl0c2VsZiwgd2UgaGF2ZSB0byBoYW5kbGUgaXQgc2VwYXJhdGVseS5cbiAgICAgIHZhciBkZXNjRWxlbWVudHMgPSBzdmdFbGVtW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgnKicpO1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdmdFbGVtO1xuICAgICAgdmFyIHByb3BlcnR5TmFtZTtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBuZXdWYWx1ZTtcbiAgICAgIGZvciAoaSA9IC0xOyBlbGVtZW50ICE9IE5VTEw7KSB7XG4gICAgICAgIGlmIChlbGVtZW50LmxvY2FsTmFtZSA9PSBfU1RZTEVfKSB7XG4gICAgICAgICAgLy8gSWYgZWxlbWVudCBpcyBhIHN0eWxlIGVsZW1lbnQsIHJlcGxhY2UgSURzIGluIGFsbCBvY2N1cmVuY2VzIG9mIFwidXJsKCNhbnlJZClcIiBpbiB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICB2YWx1ZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKGZ1bmNJcmlSZWdleCwgZnVuY3Rpb24obWF0Y2gsIGlkKSB7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICByZWZlcmVuY2VkSWRzW2lkXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ3VybCgjJyArIGlkICsgaWRTdWZmaXggKyAnKSc7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBwcm9wZXJ0eSBuYW1lcyBmb3Igd2hpY2ggSURzIHdlcmUgZm91bmRcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgaXJpUHJvcGVydGllc1tfTEVOR1RIX107IGorKykge1xuICAgICAgICAgICAgcHJvcGVydHlOYW1lID0gaXJpUHJvcGVydGllc1tqXTtcbiAgICAgICAgICAgIHZhbHVlID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWRJZHMpIHtcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VkSWRzW2lkXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjJyArIGlkICsgaWRTdWZmaXggKyAnKSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHByb3BlcnR5TmFtZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZXBsYWNlIElEcyBpbiB4bGluazpyZWYgYW5kIGhyZWYgYXR0cmlidXRlc1xuICAgICAgICAgIFsneGxpbms6aHJlZicsICdocmVmJ10uZm9yRWFjaChmdW5jdGlvbihyZWZBdHRyTmFtZSkge1xuICAgICAgICAgICAgdmFyIGlyaSA9IGVsZW1lbnRbX0dFVF9BVFRSSUJVVEVfXShyZWZBdHRyTmFtZSk7XG4gICAgICAgICAgICBpZiAoL15cXHMqIy8udGVzdChpcmkpKSB7IC8vIENoZWNrIGlmIGlyaSBpcyBub24tbnVsbCBhbmQgaW50ZXJuYWwgcmVmZXJlbmNlXG4gICAgICAgICAgICAgIGlyaSA9IGlyaS50cmltKCk7XG4gICAgICAgICAgICAgIGVsZW1lbnRbX1NFVF9BVFRSSUJVVEVfXShyZWZBdHRyTmFtZSwgaXJpICsgaWRTdWZmaXgpO1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBJRCB0byByZWZlcmVuY2VkIElEc1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaXJpLnN1YnN0cmluZygxKV0gPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGRlc2NFbGVtZW50c1srK2ldO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgaWRFbGVtID0gaWRFbGVtZW50c1tpXTtcbiAgICAgICAgLy8gSWYgc2V0IG9mIHJlZmVyZW5jZWQgSURzIGV4aXN0cywgbWFrZSBvbmx5IHJlZmVyZW5jZWQgSURzIHVuaXF1ZSxcbiAgICAgICAgLy8gb3RoZXJ3aXNlIG1ha2UgYWxsIElEcyB1bmlxdWUuXG4gICAgICAgIGlmICghcmVmZXJlbmNlZElkcyB8fCByZWZlcmVuY2VkSWRzW2lkRWxlbS5pZF0pIHtcbiAgICAgICAgICAvLyBBZGQgc3VmZml4IHRvIGVsZW1lbnQncyBJRFxuICAgICAgICAgIGlkRWxlbS5pZCArPSBpZFN1ZmZpeDtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gdHJ1ZSBpZiBTVkcgZWxlbWVudCBoYXMgY2hhbmdlZFxuICAgIHJldHVybiBjaGFuZ2VkO1xuICB9XG5cblxuICAvLyBGb3IgY2FjaGVkIFNWR3MgdGhlIElEcyBhcmUgbWFkZSB1bmlxdWUgYnkgc2ltcGx5IHJlcGxhY2luZyB0aGUgYWxyZWFkeSBpbnNlcnRlZCB1bmlxdWUgSURzIHdpdGggYVxuICAvLyBoaWdoZXIgSUQgY291bnRlci4gVGhpcyBpcyBtdWNoIG1vcmUgcGVyZm9ybWFudCB0aGFuIGEgY2FsbCB0byBtYWtlSWRzVW5pcXVlKCkuXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWVDYWNoZWQoc3ZnU3RyaW5nKSB7XG4gICAgcmV0dXJuIHN2Z1N0cmluZy5yZXBsYWNlKElEX1NVRkZJWF9SRUdFWCwgSURfU1VGRklYICsgdW5pcXVlSWRDb3VudGVyKyspO1xuICB9XG5cblxuICAvLyBJbmplY3QgU1ZHIGJ5IHJlcGxhY2luZyB0aGUgaW1nIGVsZW1lbnQgd2l0aCB0aGUgU1ZHIGVsZW1lbnQgaW4gdGhlIERPTVxuICBmdW5jdGlvbiBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKSB7XG4gICAgaWYgKHN2Z0VsZW0pIHtcbiAgICAgIHN2Z0VsZW1bX1NFVF9BVFRSSUJVVEVfXSgnZGF0YS1pbmplY3QtdXJsJywgYWJzVXJsKTtcbiAgICAgIHZhciBwYXJlbnROb2RlID0gaW1nRWxlbS5wYXJlbnROb2RlO1xuICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29weUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbnZva2UgYmVmb3JlSW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBiZWZvcmVJbmplY3QgPSBvcHRpb25zLmJlZm9yZUluamVjdDtcbiAgICAgICAgdmFyIGluamVjdEVsZW0gPSAoYmVmb3JlSW5qZWN0ICYmIGJlZm9yZUluamVjdChpbWdFbGVtLCBzdmdFbGVtKSkgfHwgc3ZnRWxlbTtcbiAgICAgICAgLy8gUmVwbGFjZSBpbWcgZWxlbWVudCB3aXRoIG5ldyBlbGVtZW50LiBUaGlzIGlzIHRoZSBhY3R1YWwgaW5qZWN0aW9uLlxuICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChpbmplY3RFbGVtLCBpbWdFbGVtKTtcbiAgICAgICAgLy8gTWFyayBpbWcgZWxlbWVudCBhcyBpbmplY3RlZFxuICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IElOSkVDVEVEO1xuICAgICAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgICAgIC8vIEludm9rZSBhZnRlckluamVjdCBob29rIGlmIHNldFxuICAgICAgICB2YXIgYWZ0ZXJJbmplY3QgPSBvcHRpb25zLmFmdGVySW5qZWN0O1xuICAgICAgICBpZiAoYWZ0ZXJJbmplY3QpIHtcbiAgICAgICAgICBhZnRlckluamVjdChpbWdFbGVtLCBpbmplY3RFbGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gTWVyZ2VzIGFueSBudW1iZXIgb2Ygb3B0aW9ucyBvYmplY3RzIGludG8gYSBuZXcgb2JqZWN0XG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucygpIHtcbiAgICB2YXIgbWVyZ2VkT3B0aW9ucyA9IHt9O1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgc3BlY2lmaWVkIG9wdGlvbnMgb2JqZWN0cyBhbmQgYWRkIGFsbCBwcm9wZXJ0aWVzIHRvIHRoZSBuZXcgb3B0aW9ucyBvYmplY3RcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3NbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3NbaV07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudCkge1xuICAgICAgICAgIGlmIChhcmd1bWVudC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBtZXJnZWRPcHRpb25zW2tleV0gPSBhcmd1bWVudFtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIHJldHVybiBtZXJnZWRPcHRpb25zO1xuICB9XG5cblxuICAvLyBBZGRzIHRoZSBzcGVjaWZpZWQgQ1NTIHRvIHRoZSBkb2N1bWVudCdzIDxoZWFkPiBlbGVtZW50XG4gIGZ1bmN0aW9uIGFkZFN0eWxlVG9IZWFkKGNzcykge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnRbX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCdoZWFkJylbMF07XG4gICAgaWYgKGhlYWQpIHtcbiAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50W19DUkVBVEVfRUxFTUVOVF9dKF9TVFlMRV8pO1xuICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gQnVpbGRzIGFuIFNWRyBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIGJ1aWxkU3ZnRWxlbWVudChzdmdTdHIsIHZlcmlmeSkge1xuICAgIGlmICh2ZXJpZnkpIHtcbiAgICAgIHZhciBzdmdEb2M7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBQYXJzZSB0aGUgU1ZHIHN0cmluZyB3aXRoIERPTVBhcnNlclxuICAgICAgICBzdmdEb2MgPSBzdmdTdHJpbmdUb1N2Z0RvYyhzdmdTdHIpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgICAgfVxuICAgICAgaWYgKHN2Z0RvY1tfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ3BhcnNlcmVycm9yJylbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIERPTVBhcnNlciBkb2VzIG5vdCB0aHJvdyBhbiBleGNlcHRpb24sIGJ1dCBpbnN0ZWFkIHB1dHMgcGFyc2VyZXJyb3IgdGFncyBpbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3ZnRG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IHN2Z1N0cjtcbiAgICAgIHJldHVybiBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSkge1xuICAgIC8vIFJlbW92ZSB0aGUgb25sb2FkIGF0dHJpYnV0ZS4gU2hvdWxkIG9ubHkgYmUgdXNlZCB0byByZW1vdmUgdGhlIHVuc3R5bGVkIGltYWdlIGZsYXNoIHByb3RlY3Rpb24gYW5kXG4gICAgLy8gbWFrZSB0aGUgZWxlbWVudCB2aXNpYmxlLCBub3QgZm9yIHJlbW92aW5nIHRoZSBldmVudCBsaXN0ZW5lci5cbiAgICBpbWdFbGVtLnJlbW92ZUF0dHJpYnV0ZSgnb25sb2FkJyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGVycm9yTWVzc2FnZShtc2cpIHtcbiAgICBjb25zb2xlLmVycm9yKCdTVkdJbmplY3Q6ICcgKyBtc2cpO1xuICB9XG5cblxuICBmdW5jdGlvbiBmYWlsKGltZ0VsZW0sIHN0YXR1cywgb3B0aW9ucykge1xuICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gRkFJTDtcbiAgICBpZiAob3B0aW9ucy5vbkZhaWwpIHtcbiAgICAgIG9wdGlvbnMub25GYWlsKGltZ0VsZW0sIHN0YXR1cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yTWVzc2FnZShzdGF0dXMpO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX0lOVkFMSUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBzdmdOb3RTdXBwb3J0ZWQoaW1nRWxlbSwgb3B0aW9ucykge1xuICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICBmYWlsKGltZ0VsZW0sIFNWR19OT1RfU1VQUE9SVEVELCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucykge1xuICAgIGZhaWwoaW1nRWxlbSwgTE9BRF9GQUlMLCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSkge1xuICAgIGltZ0VsZW0ub25sb2FkID0gTlVMTDtcbiAgICBpbWdFbGVtLm9uZXJyb3IgPSBOVUxMO1xuICB9XG5cblxuICBmdW5jdGlvbiBpbWdOb3RTZXQobXNnKSB7XG4gICAgZXJyb3JNZXNzYWdlKCdubyBpbWcgZWxlbWVudCcpO1xuICB9XG5cblxuICBmdW5jdGlvbiBjcmVhdGVTVkdJbmplY3QoZ2xvYmFsTmFtZSwgb3B0aW9ucykge1xuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xuICAgIHZhciBzdmdMb2FkQ2FjaGUgPSB7fTtcblxuICAgIGlmIChJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAvLyBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBTVkcsIGFkZCBhIHNtYWxsIHN0eWxlc2hlZXQgdGhhdCBoaWRlcyB0aGUgPGltZz4gZWxlbWVudHMgdW50aWxcbiAgICAgIC8vIGluamVjdGlvbiBpcyBmaW5pc2hlZC4gVGhpcyBhdm9pZHMgc2hvd2luZyB0aGUgdW5zdHlsZWQgU1ZHcyBiZWZvcmUgc3R5bGUgaXMgYXBwbGllZC5cbiAgICAgIGFkZFN0eWxlVG9IZWFkKCdpbWdbb25sb2FkXj1cIicgKyBnbG9iYWxOYW1lICsgJyhcIl17dmlzaWJpbGl0eTpoaWRkZW47fScpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU1ZHSW5qZWN0XG4gICAgICpcbiAgICAgKiBJbmplY3RzIHRoZSBTVkcgc3BlY2lmaWVkIGluIHRoZSBgc3JjYCBhdHRyaWJ1dGUgb2YgdGhlIHNwZWNpZmllZCBgaW1nYCBlbGVtZW50IG9yIGFycmF5IG9mIGBpbWdgXG4gICAgICogZWxlbWVudHMuIFJldHVybnMgYSBQcm9taXNlIG9iamVjdCB3aGljaCByZXNvbHZlcyBpZiBhbGwgcGFzc2VkIGluIGBpbWdgIGVsZW1lbnRzIGhhdmUgZWl0aGVyIGJlZW5cbiAgICAgKiBpbmplY3RlZCBvciBmYWlsZWQgdG8gaW5qZWN0IChPbmx5IGlmIGEgZ2xvYmFsIFByb21pc2Ugb2JqZWN0IGlzIGF2YWlsYWJsZSBsaWtlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgKiBvciB0aHJvdWdoIGEgcG9seWZpbGwpLlxuICAgICAqXG4gICAgICogT3B0aW9uczpcbiAgICAgKiB1c2VDYWNoZTogSWYgc2V0IHRvIGB0cnVlYCB0aGUgU1ZHIHdpbGwgYmUgY2FjaGVkIHVzaW5nIHRoZSBhYnNvbHV0ZSBVUkwuIERlZmF1bHQgdmFsdWUgaXMgYHRydWVgLlxuICAgICAqIGNvcHlBdHRyaWJ1dGVzOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBhdHRyaWJ1dGVzIHdpbGwgYmUgY29waWVkIGZyb20gYGltZ2AgdG8gYHN2Z2AuIERmYXVsdCB2YWx1ZVxuICAgICAqICAgICBpcyBgdHJ1ZWAuXG4gICAgICogbWFrZUlkc1VuaXF1ZTogSWYgc2V0IHRvIGB0cnVlYCB0aGUgSUQgb2YgZWxlbWVudHMgaW4gdGhlIGA8ZGVmcz5gIGVsZW1lbnQgdGhhdCBjYW4gYmUgcmVmZXJlbmNlcyBieVxuICAgICAqICAgICBwcm9wZXJ0eSB2YWx1ZXMgKGZvciBleGFtcGxlICdjbGlwUGF0aCcpIGFyZSBtYWRlIHVuaXF1ZSBieSBhcHBlbmRpbmcgXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYVxuICAgICAqICAgICBydW5uaW5nIG51bWJlciB3aGljaCBpbmNyZWFzZXMgd2l0aCBlYWNoIGluamVjdGlvbi4gVGhpcyBpcyBkb25lIHRvIGF2b2lkIGR1cGxpY2F0ZSBJRHMgaW4gdGhlIERPTS5cbiAgICAgKiBiZWZvcmVMb2FkOiBIb29rIGJlZm9yZSBTVkcgaXMgbG9hZGVkLiBUaGUgYGltZ2AgZWxlbWVudCBpcyBwYXNzZWQgYXMgYSBwYXJhbWV0ZXIuIElmIHRoZSBob29rIHJldHVybnNcbiAgICAgKiAgICAgYSBzdHJpbmcgaXQgaXMgdXNlZCBhcyB0aGUgVVJMIGluc3RlYWQgb2YgdGhlIGBpbWdgIGVsZW1lbnQncyBgc3JjYCBhdHRyaWJ1dGUuXG4gICAgICogYWZ0ZXJMb2FkOiBIb29rIGFmdGVyIFNWRyBpcyBsb2FkZWQuIFRoZSBsb2FkZWQgYHN2Z2AgZWxlbWVudCBhbmQgYHN2Z2Agc3RyaW5nIGFyZSBwYXNzZWQgYXMgYVxuICAgICAqICAgICBwYXJhbWV0ZXJzLiBJZiBjYWNoaW5nIGlzIGFjdGl2ZSB0aGlzIGhvb2sgd2lsbCBvbmx5IGdldCBjYWxsZWQgb25jZSBmb3IgaW5qZWN0ZWQgU1ZHcyB3aXRoIHRoZVxuICAgICAqICAgICBzYW1lIGFic29sdXRlIHBhdGguIENoYW5nZXMgdG8gdGhlIGBzdmdgIGVsZW1lbnQgaW4gdGhpcyBob29rIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgaW5qZWN0ZWQgU1ZHc1xuICAgICAqICAgICB3aXRoIHRoZSBzYW1lIGFic29sdXRlIHBhdGguIEl0J3MgYWxzbyBwb3NzaWJsZSB0byByZXR1cm4gYW4gYHN2Z2Agc3RyaW5nIG9yIGBzdmdgIGVsZW1lbnQgd2hpY2hcbiAgICAgKiAgICAgd2lsbCB0aGVuIGJlIHVzZWQgZm9yIHRoZSBpbmplY3Rpb24uXG4gICAgICogYmVmb3JlSW5qZWN0OiBIb29rIGJlZm9yZSBTVkcgaXMgaW5qZWN0ZWQuIFRoZSBgaW1nYCBhbmQgYHN2Z2AgZWxlbWVudHMgYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzLiBJZlxuICAgICAqICAgICBhbnkgaHRtbCBlbGVtZW50IGlzIHJldHVybmVkIGl0IGdldHMgaW5qZWN0ZWQgaW5zdGVhZCBvZiBhcHBseWluZyB0aGUgZGVmYXVsdCBTVkcgaW5qZWN0aW9uLlxuICAgICAqIGFmdGVySW5qZWN0OiBIb29rIGFmdGVyIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuXG4gICAgICogb25BbGxGaW5pc2g6IEhvb2sgYWZ0ZXIgYWxsIGBpbWdgIGVsZW1lbnRzIHBhc3NlZCB0byBhbiBTVkdJbmplY3QoKSBjYWxsIGhhdmUgZWl0aGVyIGJlZW4gaW5qZWN0ZWQgb3JcbiAgICAgKiAgICAgZmFpbGVkIHRvIGluamVjdC5cbiAgICAgKiBvbkZhaWw6IEhvb2sgYWZ0ZXIgaW5qZWN0aW9uIGZhaWxzLiBUaGUgYGltZ2AgZWxlbWVudCBhbmQgYSBgc3RhdHVzYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhbiBwYXJhbWV0ZXIuXG4gICAgICogICAgIFRoZSBgc3RhdHVzYCBjYW4gYmUgZWl0aGVyIGAnU1ZHX05PVF9TVVBQT1JURUQnYCAodGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBTVkcpLFxuICAgICAqICAgICBgJ1NWR19JTlZBTElEJ2AgKHRoZSBTVkcgaXMgbm90IGluIGEgdmFsaWQgZm9ybWF0KSBvciBgJ0xPQURfRkFJTEVEJ2AgKGxvYWRpbmcgb2YgdGhlIFNWRyBmYWlsZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudCBvciBhbiBhcnJheSBvZiBpbWcgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIHdpdGggW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgdGhpcyBpbmplY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gU1ZHSW5qZWN0KGltZywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBydW4gPSBmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIHZhciBhbGxGaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgb25BbGxGaW5pc2ggPSBvcHRpb25zLm9uQWxsRmluaXNoO1xuICAgICAgICAgIGlmIChvbkFsbEZpbmlzaCkge1xuICAgICAgICAgICAgb25BbGxGaW5pc2goKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSAmJiByZXNvbHZlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGltZyAmJiB0eXBlb2YgaW1nW19MRU5HVEhfXSAhPSBfVU5ERUZJTkVEXykge1xuICAgICAgICAgIC8vIGFuIGFycmF5IGxpa2Ugc3RydWN0dXJlIG9mIGltZyBlbGVtZW50c1xuICAgICAgICAgIHZhciBpbmplY3RJbmRleCA9IDA7XG4gICAgICAgICAgdmFyIGluamVjdENvdW50ID0gaW1nW19MRU5HVEhfXTtcblxuICAgICAgICAgIGlmIChpbmplY3RDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICBhbGxGaW5pc2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoKytpbmplY3RJbmRleCA9PSBpbmplY3RDb3VudCkge1xuICAgICAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluamVjdENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgU1ZHSW5qZWN0RWxlbWVudChpbWdbaV0sIG9wdGlvbnMsIGZpbmlzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG9ubHkgb25lIGltZyBlbGVtZW50XG4gICAgICAgICAgU1ZHSW5qZWN0RWxlbWVudChpbWcsIG9wdGlvbnMsIGFsbEZpbmlzaCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHJldHVybiBhIFByb21pc2Ugb2JqZWN0IGlmIGdsb2JhbGx5IGF2YWlsYWJsZVxuICAgICAgcmV0dXJuIHR5cGVvZiBQcm9taXNlID09IF9VTkRFRklORURfID8gcnVuKCkgOiBuZXcgUHJvbWlzZShydW4pO1xuICAgIH1cblxuXG4gICAgLy8gSW5qZWN0cyBhIHNpbmdsZSBzdmcgZWxlbWVudC4gT3B0aW9ucyBtdXN0IGJlIGFscmVhZHkgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9ucy5cbiAgICBmdW5jdGlvbiBTVkdJbmplY3RFbGVtZW50KGltZ0VsZW0sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoaW1nRWxlbSkge1xuICAgICAgICB2YXIgc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUgPSBpbWdFbGVtW19fU1ZHSU5KRUNUXTtcbiAgICAgICAgaWYgKCFzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGltZ0VsZW0pO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJbnZva2UgYmVmb3JlTG9hZCBob29rIGlmIHNldC4gSWYgdGhlIGJlZm9yZUxvYWQgcmV0dXJucyBhIHZhbHVlIHVzZSBpdCBhcyB0aGUgc3JjIGZvciB0aGUgbG9hZFxuICAgICAgICAgIC8vIFVSTCBwYXRoLiBFbHNlIHVzZSB0aGUgaW1nRWxlbSdzIHNyYyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAgdmFyIGJlZm9yZUxvYWQgPSBvcHRpb25zLmJlZm9yZUxvYWQ7XG4gICAgICAgICAgdmFyIHNyYyA9IChiZWZvcmVMb2FkICYmIGJlZm9yZUxvYWQoaW1nRWxlbSkpIHx8IGltZ0VsZW1bX0dFVF9BVFRSSUJVVEVfXSgnc3JjJyk7XG5cbiAgICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgICAgLy8gSWYgbm8gaW1hZ2Ugc3JjIGF0dHJpYnV0ZSBpcyBzZXQgZG8gbm8gaW5qZWN0aW9uLiBUaGlzIGNhbiBvbmx5IGJlIHJlYWNoZWQgYnkgdXNpbmcgamF2YXNjcmlwdFxuICAgICAgICAgICAgLy8gYmVjYXVzZSBpZiBubyBzcmMgYXR0cmlidXRlIGlzIHNldCB0aGUgb25sb2FkIGFuZCBvbmVycm9yIGV2ZW50cyBkbyBub3QgZ2V0IGNhbGxlZFxuICAgICAgICAgICAgaWYgKHNyYyA9PT0gJycpIHtcbiAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCBhcnJheSBzbyBsYXRlciBjYWxscyBjYW4gcmVnaXN0ZXIgY2FsbGJhY2tzXG4gICAgICAgICAgdmFyIG9uRmluaXNoQ2FsbGJhY2tzID0gW107XG4gICAgICAgICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBvbkZpbmlzaENhbGxiYWNrcztcblxuICAgICAgICAgIHZhciBvbkZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24ob25GaW5pc2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICBvbkZpbmlzaENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGFic1VybCA9IGdldEFic29sdXRlVXJsKHNyYyk7XG4gICAgICAgICAgdmFyIHVzZUNhY2hlT3B0aW9uID0gb3B0aW9ucy51c2VDYWNoZTtcbiAgICAgICAgICB2YXIgbWFrZUlkc1VuaXF1ZU9wdGlvbiA9IG9wdGlvbnMubWFrZUlkc1VuaXF1ZTtcbiAgICAgICAgICBcbiAgICAgICAgICB2YXIgc2V0U3ZnTG9hZENhY2hlVmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXS5mb3JFYWNoKGZ1bmN0aW9uKHN2Z0xvYWQpIHtcbiAgICAgICAgICAgICAgICBzdmdMb2FkKHZhbCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgc3ZnTG9hZCA9IHN2Z0xvYWRDYWNoZVthYnNVcmxdO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlTG9hZFZhbHVlID0gZnVuY3Rpb24obG9hZFZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChsb2FkVmFsdWUgPT09IExPQURfRkFJTCkge1xuICAgICAgICAgICAgICAgIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvYWRWYWx1ZSA9PT0gU1ZHX0lOVkFMSUQpIHtcbiAgICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBoYXNVbmlxdWVJZHMgPSBsb2FkVmFsdWVbMF07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z1N0cmluZyA9IGxvYWRWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICB2YXIgdW5pcXVlSWRzU3ZnU3RyaW5nID0gbG9hZFZhbHVlWzJdO1xuICAgICAgICAgICAgICAgIHZhciBzdmdFbGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNVbmlxdWVJZHMgPT09IE5VTEwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSURzIGZvciB0aGUgU1ZHIHN0cmluZyBoYXZlIG5vdCBiZWVuIG1hZGUgdW5pcXVlIGJlZm9yZS4gVGhpcyBtYXkgaGFwcGVuIGlmIHByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgIC8vIGluamVjdGlvbiBvZiBhIGNhY2hlZCBTVkcgaGF2ZSBiZWVuIHJ1biB3aXRoIHRoZSBvcHRpb24gbWFrZWRJZHNVbmlxdWUgc2V0IHRvIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhc1VuaXF1ZUlkcyA9IG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRWYWx1ZVswXSA9IGhhc1VuaXF1ZUlkcztcbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzJdID0gaGFzVW5pcXVlSWRzICYmIHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzVW5pcXVlSWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgSURzIHVuaXF1ZSBmb3IgYWxyZWFkeSBjYWNoZWQgU1ZHcyB3aXRoIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgICAgICAgICBzdmdTdHJpbmcgPSBtYWtlSWRzVW5pcXVlQ2FjaGVkKHVuaXF1ZUlkc1N2Z1N0cmluZyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3ZnRWxlbSA9IHN2Z0VsZW0gfHwgYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ZnTG9hZCAhPSBfVU5ERUZJTkVEXykge1xuICAgICAgICAgICAgICAvLyBWYWx1ZSBmb3IgdXJsIGV4aXN0cyBpbiBjYWNoZVxuICAgICAgICAgICAgICBpZiAoc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUpIHtcbiAgICAgICAgICAgICAgICAvLyBTYW1lIHVybCBoYXMgYmVlbiBjYWNoZWQsIGJ1dCB2YWx1ZSBoYXMgbm90IGJlZW4gbG9hZGVkIHlldCwgc28gYWRkIHRvIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQucHVzaChoYW5kbGVMb2FkVmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZUxvYWRWYWx1ZShzdmdMb2FkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgc3ZnTG9hZCA9IFtdO1xuICAgICAgICAgICAgICAvLyBzZXQgcHJvcGVydHkgaXNDYWxsYmFja1F1ZXVlIHRvIEFycmF5IHRvIGRpZmZlcmVudGlhdGUgZnJvbSBhcnJheSB3aXRoIGNhY2hlZCBsb2FkZWQgdmFsdWVzXG4gICAgICAgICAgICAgIHN2Z0xvYWQuaXNDYWxsYmFja1F1ZXVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc3ZnTG9hZENhY2hlW2Fic1VybF0gPSBzdmdMb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIExvYWQgdGhlIFNWRyBiZWNhdXNlIGl0IGlzIG5vdCBjYWNoZWQgb3IgY2FjaGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAgIGxvYWRTdmcoYWJzVXJsLCBmdW5jdGlvbihzdmdYbWwsIHN2Z1N0cmluZykge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBYTUwgZnJvbSB0aGUgWEhSIHJlcXVlc3QgaWYgaXQgaXMgYW4gaW5zdGFuY2Ugb2YgRG9jdW1lbnQuIE90aGVyd2lzZVxuICAgICAgICAgICAgLy8gKGZvciBleGFtcGxlIG9mIElFOSksIGNyZWF0ZSB0aGUgc3ZnIGRvY3VtZW50IGZyb20gdGhlIHN2ZyBzdHJpbmcuXG4gICAgICAgICAgICB2YXIgc3ZnRWxlbSA9IHN2Z1htbCBpbnN0YW5jZW9mIERvY3VtZW50ID8gc3ZnWG1sLmRvY3VtZW50RWxlbWVudCA6IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIHRydWUpO1xuXG4gICAgICAgICAgICB2YXIgYWZ0ZXJMb2FkID0gb3B0aW9ucy5hZnRlckxvYWQ7XG4gICAgICAgICAgICBpZiAoYWZ0ZXJMb2FkKSB7XG4gICAgICAgICAgICAgIC8vIEludm9rZSBhZnRlckxvYWQgaG9vayB3aGljaCBtYXkgbW9kaWZ5IHRoZSBTVkcgZWxlbWVudC4gQWZ0ZXIgbG9hZCBtYXkgYWxzbyByZXR1cm4gYSBuZXdcbiAgICAgICAgICAgICAgLy8gc3ZnIGVsZW1lbnQgb3Igc3ZnIHN0cmluZ1xuICAgICAgICAgICAgICB2YXIgc3ZnRWxlbU9yU3ZnU3RyaW5nID0gYWZ0ZXJMb2FkKHN2Z0VsZW0sIHN2Z1N0cmluZykgfHwgc3ZnRWxlbTtcbiAgICAgICAgICAgICAgaWYgKHN2Z0VsZW1PclN2Z1N0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzdmdFbGVtIGFuZCBzdmdTdHJpbmcgYmVjYXVzZSBvZiBtb2RpZmljYXRpb25zIHRvIHRoZSBTVkcgZWxlbWVudCBvciBTVkcgc3RyaW5nIGluXG4gICAgICAgICAgICAgICAgLy8gdGhlIGFmdGVyTG9hZCBob29rLCBzbyB0aGUgbW9kaWZpZWQgU1ZHIGlzIGFsc28gdXNlZCBmb3IgYWxsIGxhdGVyIGNhY2hlZCBpbmplY3Rpb25zXG4gICAgICAgICAgICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHN2Z0VsZW1PclN2Z1N0cmluZyA9PSAnc3RyaW5nJztcbiAgICAgICAgICAgICAgICBzdmdTdHJpbmcgPSBpc1N0cmluZyA/IHN2Z0VsZW1PclN2Z1N0cmluZyA6IHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtKTtcbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gaXNTdHJpbmcgPyBidWlsZFN2Z0VsZW1lbnQoc3ZnRWxlbU9yU3ZnU3RyaW5nLCB0cnVlKSA6IHN2Z0VsZW1PclN2Z1N0cmluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3ZnRWxlbSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IE5VTEw7XG4gICAgICAgICAgICAgIGlmIChtYWtlSWRzVW5pcXVlT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgdW5pcXVlSWRzU3ZnU3RyaW5nID0gaGFzVW5pcXVlSWRzICYmIHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgYW4gYXJyYXkgd2l0aCB0aHJlZSBlbnRyaWVzIHRvIHRoZSBsb2FkIGNhY2hlXG4gICAgICAgICAgICAgICAgc2V0U3ZnTG9hZENhY2hlVmFsdWUoW2hhc1VuaXF1ZUlkcywgc3ZnU3RyaW5nLCB1bmlxdWVJZHNTdmdTdHJpbmddKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgc2V0U3ZnTG9hZENhY2hlVmFsdWUoU1ZHX0lOVkFMSUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgc2V0U3ZnTG9hZENhY2hlVmFsdWUoTE9BRF9GQUlMKTtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSBpcyBhbiBhcnJheS4gSW5qZWN0aW9uIGlzIG5vdCBjb21wbGV0ZSBzbyByZWdpc3RlciBjYWxsYmFja1xuICAgICAgICAgICAgc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgU1ZHSW5qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGRlZmF1bHQgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgYW4gaW5qZWN0aW9uLlxuICAgICAqL1xuICAgIFNWR0luamVjdC5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH07XG5cblxuICAgIC8vIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBTVkdJbmplY3RcbiAgICBTVkdJbmplY3QuY3JlYXRlID0gY3JlYXRlU1ZHSW5qZWN0O1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluIG9uZXJyb3IgRXZlbnQgb2YgYW4gYDxpbWc+YCBlbGVtZW50IHRvIGhhbmRsZSBjYXNlcyB3aGVuIHRoZSBsb2FkaW5nIHRoZSBvcmlnaW5hbCBzcmMgZmFpbHNcbiAgICAgKiAoZm9yIGV4YW1wbGUgaWYgZmlsZSBpcyBub3QgZm91bmQgb3IgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBTVkcpLiBUaGlzIHRyaWdnZXJzIGEgY2FsbCB0byB0aGVcbiAgICAgKiBvcHRpb25zIG9uRmFpbCBob29rIGlmIGF2YWlsYWJsZS4gVGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgd2lsbCBiZSBzZXQgYXMgdGhlIG5ldyBzcmMgYXR0cmlidXRlXG4gICAgICogZm9yIHRoZSBpbWcgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gYW4gaW1nIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2ZhbGxiYWNrU3JjXSAtIG9wdGlvbmFsIHBhcmFtZXRlciBmYWxsYmFjayBzcmNcbiAgICAgKi9cbiAgICBTVkdJbmplY3QuZXJyID0gZnVuY3Rpb24oaW1nLCBmYWxsYmFja1NyYykge1xuICAgICAgaWYgKGltZykge1xuICAgICAgICBpZiAoaW1nW19fU1ZHSU5KRUNUXSAhPSBGQUlMKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nKTtcblxuICAgICAgICAgIGlmICghSVNfU1ZHX1NVUFBPUlRFRCkge1xuICAgICAgICAgICAgc3ZnTm90U3VwcG9ydGVkKGltZywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nKTtcbiAgICAgICAgICAgIGxvYWRGYWlsKGltZywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmFsbGJhY2tTcmMpIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IGZhbGxiYWNrU3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1nTm90U2V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvd1tnbG9iYWxOYW1lXSA9IFNWR0luamVjdDtcblxuICAgIHJldHVybiBTVkdJbmplY3Q7XG4gIH1cblxuICB2YXIgU1ZHSW5qZWN0SW5zdGFuY2UgPSBjcmVhdGVTVkdJbmplY3QoJ1NWR0luamVjdCcpO1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gU1ZHSW5qZWN0SW5zdGFuY2U7XG4gIH1cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtTGlnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtU2VtaUJvbGQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUJvbGQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUV4dHJhQm9sZC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gICAgLyogaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuL1BvcHBpbnMgKi9cbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX199KTtcbn1cblxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcbn1cblxuOnJvb3Qge1xuICAgIC8qIGN1c3RvbSB2YXJpYWJsZXMgKi9cbiAgICAtLWZvbnQtZmFtaWx5LXByaW1hcnk6ICdQb3BwaW5zJywgQXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgLS10ZXh0LWNvbG9yLXByaW1hcnk6IHJnYmEoMzIsIDMyLCAzMiwgMSk7XG4gICAgLS1iYWNrZ3JvdW5kLXByaW1hcnk6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgICAtLWFjY2VudC1wcmltYXJ5OiByZ2IoMTczLCA3NywgMjMyKTtcbiAgICAtLWFjY2VudC1zZWNvbmRhcnk6IHJnYigyNDEsIDI0MSwgMjQxKTtcbiAgICAtLWFjY2VudC10ZXJ0aWFyeTogIzE2OERFRTtcbiAgICAtLXByaW9yaXR5LTEtY29sb3I6ICNGODQxMjU7XG4gICAgLS1wcmlvcml0eS0yLWNvbG9yOiAjZmZhNTAwO1xuICAgIC0tcHJpb3JpdHktMy1jb2xvcjogIzE0RUJDMDtcbiAgICAtLXByaW9yaXR5LTQtY29sb3I6ICM5ZTllOWU7XG4gICAgLS1idXR0b24tcmFkaXVzOiAwLjM1cmVtO1xuICAgIC0tY2lyY2xlLXJhZGl1czogNTAlO1xuICAgIC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZzogMC4yNXJlbTtcbiAgICAtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZzogMC41cmVtIDFyZW07XG4gICAgLS1jb2x1bW4tZ2FwLXNtYWxsOiAwLjI1cmVtO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBhbmltYXRpb246IGZhZGUtaW4gMjAwbXMgZWFzZS1pbjtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZS1pbiAyMDBtcyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBmYWRlLWluIDIwMG1zIGVhc2UtaW47XG59XG5cbiN0b2RvX2FwcCB7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMWZyO1xufVxuXG4jY29udGVudCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4jY29udGVudCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbn1cblxuLm92ZXJsYXlfbWFpbl9jb250ZW50IHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuLm92ZXJsYXlfbWFpbl9jb250ZW50LmRpbSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbiAgICAtbW96LXRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNtYWluX2NvbnRlbnQge1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZzogNSU7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xufVxuXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtYXV0by1yb3dzOiBtaW4tY29udGVudCAxZnI7XG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYW5pbWF0aW9uOiBmYWRlLWluIDMwMG1zIGVhc2UtaW47XG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUtaW4gMzAwbXMgZWFzZS1pbjtcbiAgICAtbW96LWFuaW1hdGlvbjogZmFkZS1pbiAzMDBtcyBlYXNlLWluO1xufVxuXG4vKiBnZW5lcmFsIHN0eWxlcyBmb3Igc2ltaWxhciBlbGVtZW50cyBleGlzdGluZyBvbiBkaWZmZXJlbnQgbW9kdWxlcyAqL1xuYSwgYTp2aXNpdGVkIHtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmltZ193cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG5kaWFsb2c6bm90KCN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMpOm5vdCgjdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucykge1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBtaW4td2lkdGg6IDYwdnc7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbmRpYWxvZzo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuLm5hdl9wcm9qZWN0ID4gc3ZnLFxuLnByb2plY3RfY2lyY2xlIHtcbiAgICBjb2xvcjogcmdiKDcwLCA3MCwgNzApO1xufVxuXG5idXR0b24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJ1dHRvbi1yYWRpdXMpO1xufVxuXG4uYnRuX2ltZ193cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG5idXR0b246aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYnV0dG9uID4gc3ZnLFxuYnV0dG9uID4gKiA+IHN2ZyB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHdpZHRoOiBjbGFtcCgxLjI1cmVtLCAyLjV2dywgMS41cmVtKTtcbn1cblxuLmZvcm1faXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uZm9ybV9pdGVtOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICB3aWR0aDogOTAlO1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbn1cblxuLmZvcm1faXRlbSA+ICoge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWluLWhlaWdodDogNTBweDtcbn1cblxuLmZvcm1faXRlbSA+IGxhYmVsIHtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQsXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQge1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xufVxuXG4ubmF2X2xlZnQgPiAuY29udGFpbmVyID4gLmlucHV0X3NlYXJjaDpmb2N1cyxcbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dDpmb2N1cyxcbi5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dDpmb2N1cyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IC0xcHggaW5zZXQgcmdiYSgwLCAwLCAwLCAxKTtcbn1cblxuLmZvcm1fYnV0dG9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjVyZW07XG4gICAgLW1vei1jb2x1bW4tZ2FwOiAwLjVyZW07XG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+ICoge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIyNiwgMjI2KTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAycmVtO1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG4uZm9ybV9idXR0b25zID4gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+IGJ1dHRvblt0eXBlPVwic3VibWl0XCJdOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC44NSk7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGJyaWdodG5lc3MoMC44NSk7XG59XG5cbi5mb3JtX2J1dHRvbnMgPiBidXR0b246aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcbiAgICAtd2Via2l0LWZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+ICo6YWN0aXZlIHtcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjgpO1xufVxuXG4uZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQ6aG92ZXI6bm90KDpmb2N1cyksXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQ6aG92ZXI6bm90KDpmb2N1cyksXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Q6aG92ZXIsXG4uYnRuX2FkZF9wcm9qZWN0OmhvdmVyLFxuLmJ0bl9kZWxldGVfcHJvamVjdDpob3Zlcixcbi50YXNrX2FjdGlvbnMgPiBidXR0b246aG92ZXIsXG4jbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xuICAgICNtYWluX2NvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiAyJSAyLjUlIDIlIDIuNSU7XG4gICAgfVxuXG4gICAgI21haW5fY29udGVudCA+IDpmaXJzdC1jaGlsZCB7XG4gICAgICAgIHdpZHRoOiA3MCU7XG4gICAgfVxuXG4gICAgI2NvbnRlbnQge1xuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbn1cblxuQGtleWZyYW1lcyBmYWRlLWluIHtcbiAgICAwJSB7XG4gICAgICAgIG9wYWNpdHk6IDAlO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICBvcGFjaXR5OiAxMDAlO1xuICAgIH1cbn1cblxuQG1lZGlhIChob3Zlcjogbm9uZSkge1xuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgY2FuIGhvdmVyICovXG4gICAgLmZvcm1faXRlbSA+IC50YXNrX2lucHV0Om5vdCg6Zm9jdXMpLFxuICAgIC5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dDpub3QoOmZvY3VzKSxcbiAgICAucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3QsXG4gICAgLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLDhDQUE4QztJQUM5QyxzQkFBc0I7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Zjs7SUFFQTtRQUNJLGFBQWE7SUFDakI7QUFDSjs7QUFFQTtJQUNJLHdDQUF3QztJQUN4Qzs7OztRQUlJLG9DQUFvQztJQUN4QztBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUG9wcGlucyAqL1xcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnO1xcbiAgICBzcmM6IHVybCgnLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUxpZ2h0LnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtTWVkaXVtLnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtUmVndWxhci50dGYnKSxcXG4gICAgICAgIHVybCgnLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLVNlbWlCb2xkLnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtQm9sZC50dGYnKSxcXG4gICAgICAgIHVybCgnLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUV4dHJhQm9sZC50dGYnKTtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgICAvKiBjdXN0b20gdmFyaWFibGVzICovXFxuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1BvcHBpbnMnLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgLS10ZXh0LWNvbG9yLXByaW1hcnk6IHJnYmEoMzIsIDMyLCAzMiwgMSk7XFxuICAgIC0tYmFja2dyb3VuZC1wcmltYXJ5OiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICAgIC0tYWNjZW50LXByaW1hcnk6IHJnYigxNzMsIDc3LCAyMzIpO1xcbiAgICAtLWFjY2VudC1zZWNvbmRhcnk6IHJnYigyNDEsIDI0MSwgMjQxKTtcXG4gICAgLS1hY2NlbnQtdGVydGlhcnk6ICMxNjhERUU7XFxuICAgIC0tcHJpb3JpdHktMS1jb2xvcjogI0Y4NDEyNTtcXG4gICAgLS1wcmlvcml0eS0yLWNvbG9yOiAjZmZhNTAwO1xcbiAgICAtLXByaW9yaXR5LTMtY29sb3I6ICMxNEVCQzA7XFxuICAgIC0tcHJpb3JpdHktNC1jb2xvcjogIzllOWU5ZTtcXG4gICAgLS1idXR0b24tcmFkaXVzOiAwLjM1cmVtO1xcbiAgICAtLWNpcmNsZS1yYWRpdXM6IDUwJTtcXG4gICAgLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nOiAwLjI1cmVtO1xcbiAgICAtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIC0tY29sdW1uLWdhcC1zbWFsbDogMC4yNXJlbTtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBhbmltYXRpb246IGZhZGUtaW4gMjAwbXMgZWFzZS1pbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUtaW4gMjAwbXMgZWFzZS1pbjtcXG4gICAgLW1vei1hbmltYXRpb246IGZhZGUtaW4gMjAwbXMgZWFzZS1pbjtcXG59XFxuXFxuI3RvZG9fYXBwIHtcXG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jY29udGVudCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbi5vdmVybGF5X21haW5fY29udGVudCB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5vdmVybGF5X21haW5fY29udGVudC5kaW0ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI21haW5fY29udGVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIHBhZGRpbmc6IDUlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbn1cXG5cXG4jbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBhbmltYXRpb246IGZhZGUtaW4gMzAwbXMgZWFzZS1pbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUtaW4gMzAwbXMgZWFzZS1pbjtcXG4gICAgLW1vei1hbmltYXRpb246IGZhZGUtaW4gMzAwbXMgZWFzZS1pbjtcXG59XFxuXFxuLyogZ2VuZXJhbCBzdHlsZXMgZm9yIHNpbWlsYXIgZWxlbWVudHMgZXhpc3Rpbmcgb24gZGlmZmVyZW50IG1vZHVsZXMgKi9cXG5hLCBhOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmltZ193cmFwcGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuZGlhbG9nOm5vdCgjdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zKTpub3QoI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMpIHtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBtaW4td2lkdGg6IDYwdnc7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuZGlhbG9nOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxuLm5hdl9wcm9qZWN0ID4gc3ZnLFxcbi5wcm9qZWN0X2NpcmNsZSB7XFxuICAgIGNvbG9yOiByZ2IoNzAsIDcwLCA3MCk7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJ1dHRvbi1yYWRpdXMpO1xcbn1cXG5cXG4uYnRuX2ltZ193cmFwcGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0b24gPiBzdmcsXFxuYnV0dG9uID4gKiA+IHN2ZyB7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgd2lkdGg6IGNsYW1wKDEuMjVyZW0sIDIuNXZ3LCAxLjVyZW0pO1xcbn1cXG5cXG4uZm9ybV9pdGVtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLmZvcm1faXRlbTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgb3BhY2l0eTogMC40O1xcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWluLWhlaWdodDogNTBweDtcXG59XFxuXFxuLmZvcm1faXRlbSA+IGxhYmVsIHtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmZvcm1faXRlbSA+IC50YXNrX2lucHV0LFxcbi5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dCB7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbn1cXG5cXG4ubmF2X2xlZnQgPiAuY29udGFpbmVyID4gLmlucHV0X3NlYXJjaDpmb2N1cyxcXG4uZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQ6Zm9jdXMsXFxuLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0OmZvY3VzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggLTFweCBpbnNldCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XFxuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjVyZW07XFxuICAgIC1tb3otY29sdW1uLWdhcDogMC41cmVtO1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gKiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIyNiwgMjI2KTtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gYnV0dG9uW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gYnV0dG9uW3R5cGU9XFxcInN1Ym1pdFxcXCJdOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xcbiAgICAtd2Via2l0LWZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcXG59XFxuXFxuLmZvcm1fYnV0dG9ucyA+IGJ1dHRvbjpob3ZlciB7XFxuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcXG4gICAgLXdlYmtpdC1maWx0ZXI6IGJyaWdodG5lc3MoMC44NSk7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiAqOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuOCk7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dDpob3Zlcjpub3QoOmZvY3VzKSxcXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQ6aG92ZXI6bm90KDpmb2N1cyksXFxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0OmhvdmVyLFxcbi5idG5fYWRkX3Byb2plY3Q6aG92ZXIsXFxuLmJ0bl9kZWxldGVfcHJvamVjdDpob3ZlcixcXG4udGFza19hY3Rpb25zID4gYnV0dG9uOmhvdmVyLFxcbiNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xcbiAgICAjbWFpbl9jb250ZW50IHtcXG4gICAgICAgIHBhZGRpbmc6IDIlIDIuNSUgMiUgMi41JTtcXG4gICAgfVxcblxcbiAgICAjbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgIHdpZHRoOiA3MCU7XFxuICAgIH1cXG5cXG4gICAgI2NvbnRlbnQge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMCU7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxMDAlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcXG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBjYW4gaG92ZXIgKi9cXG4gICAgLmZvcm1faXRlbSA+IC50YXNrX2lucHV0Om5vdCg6Zm9jdXMpLFxcbiAgICAuZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQ6bm90KDpmb2N1cyksXFxuICAgIC5wcm9qZWN0cyA+Omxhc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCxcXG4gICAgLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBoZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICBhbmltYXRpb246IGZhZGUtaW4gNDAwbXMgZWFzZS1pbjtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZS1pbiA0MDBtcyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBmYWRlLWluIDQwMG1zIGVhc2UtaW47XG59XG5cbmhlYWRlciA+ICNuYXZiYXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDAuNjByZW0gMC43NXJlbTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+IC5uYXZfbGVmdCA+IC5jb250YWluZXIgPiAuYnRuX21lbnUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgZmlsdGVyOiBpbnZlcnQoMCk7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGludmVydCgwKTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+IC5uYXZfbGVmdCA+IC5jb250YWluZXIgPiAuYnRuX21lbnUucm90YXRlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC1tb3otdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xuICAgIGZpbHRlcjogaW52ZXJ0KDEpO1xuICAgIC13ZWJraXQtZmlsdGVyOiBpbnZlcnQoMSk7XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC1tb3otY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICoge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1idXR0b24tcmFkaXVzKTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nKTtcbn1cblxuI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcbn1cblxuYS5naXRodWI6aG92ZXIgPiBzdmcge1xuICAgIGZpbHRlcjogaW52ZXJ0KDEpO1xuICAgIC13ZWJraXQtZmlsdGVyOiBpbnZlcnQoMSk7XG59XG5cbi5pbnB1dF9zZWFyY2gge1xuICAgIHdpZHRoOiBtaW4oMzUwcHgsIDUwJSk7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqID4gc3ZnIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IGNsYW1wKDEuNzVyZW0sIDN2dywgMi41cmVtKTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHVDQUF1QztJQUN2QyxnQ0FBZ0M7SUFDaEMsd0NBQXdDO0lBQ3hDLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLCtCQUErQjtJQUMvQiw0QkFBNEI7SUFDNUIsaUNBQWlDO0lBQ2pDLHlDQUF5QztJQUN6QyxzQ0FBc0M7SUFDdEMsaUJBQWlCO0lBQ2pCLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixnQ0FBZ0M7SUFDaEMsNkJBQTZCO0lBQzdCLGlDQUFpQztJQUNqQyx5Q0FBeUM7SUFDekMsc0NBQXNDO0lBQ3RDLGlCQUFpQjtJQUNqQix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUNBQW1DO0lBQ25DLDJDQUEyQztJQUMzQyx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG1DQUFtQztJQUNuQyxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0NBQWtDO0FBQ3RDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcXG4gICAgYW5pbWF0aW9uOiBmYWRlLWluIDQwMG1zIGVhc2UtaW47XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlLWluIDQwMG1zIGVhc2UtaW47XFxuICAgIC1tb3otYW5pbWF0aW9uOiBmYWRlLWluIDQwMG1zIGVhc2UtaW47XFxufVxcblxcbmhlYWRlciA+ICNuYXZiYXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIHBhZGRpbmc6IDAuNjByZW0gMC43NXJlbTtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciA+IC5uYXZfbGVmdCA+IC5jb250YWluZXIgPiAuYnRuX21lbnUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIGZpbHRlcjogaW52ZXJ0KDApO1xcbiAgICAtd2Via2l0LWZpbHRlcjogaW52ZXJ0KDApO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gLm5hdl9sZWZ0ID4gLmNvbnRhaW5lciA+IC5idG5fbWVudS5yb3RhdGUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIGZpbHRlcjogaW52ZXJ0KDEpO1xcbiAgICAtd2Via2l0LWZpbHRlcjogaW52ZXJ0KDEpO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJ1dHRvbi1yYWRpdXMpO1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nKTtcXG59XFxuXFxuI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XFxufVxcblxcbmEuZ2l0aHViOmhvdmVyID4gc3ZnIHtcXG4gICAgZmlsdGVyOiBpbnZlcnQoMSk7XFxuICAgIC13ZWJraXQtZmlsdGVyOiBpbnZlcnQoMSk7XFxufVxcblxcbi5pbnB1dF9zZWFyY2gge1xcbiAgICB3aWR0aDogbWluKDM1MHB4LCA1MCUpO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqID4gc3ZnIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogY2xhbXAoMS43NXJlbSwgM3Z3LCAyLjVyZW0pO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlcyBmb3IgdGFzay9wcm9qZWN0IG1vZGFsIHJlbW92YWwgKi9cbi5mb3JtX3JlbW92YWwge1xuICAgIHBhZGRpbmc6IDFyZW07XG59XG5cbi5mb3JtX3JlbW92YWwgPiBkaXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjVyZW07XG59XG5cbi5pdGVtX2Zvcl9yZW1vdmFsIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbW9kYWxfcmVtb3ZhbC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsMENBQTBDO0FBQzFDO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIHRhc2svcHJvamVjdCBtb2RhbCByZW1vdmFsICovXFxuLmZvcm1fcmVtb3ZhbCB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbi5mb3JtX3JlbW92YWwgPiBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAwLjVyZW07XFxufVxcblxcbi5pdGVtX2Zvcl9yZW1vdmFsIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciBsaXN0IG9mIHByb2plY3RzIG9uIHRoZSBjb250ZW50IHNlY3Rpb24gKi9cbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbn1cblxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xuICAgIGp1c3RpZnktc2VsZjogZW5kO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHVEQUF1RDtBQUN2RDtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZix3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLDJDQUEyQztJQUMzQyx3Q0FBd0M7QUFDNUNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogc3R5bGVzIGZvciBsaXN0IG9mIHByb2plY3RzIG9uIHRoZSBjb250ZW50IHNlY3Rpb24gKi9cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXFxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMge1xcbiAgICBqdXN0aWZ5LXNlbGY6IGVuZDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XFxuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtbW96LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNmb3JtX3Byb2plY3QgPiAjZm9ybSB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcm93LWdhcDogMC41cmVtO1xufVxuXG4jZm9ybV9wcm9qZWN0ID4gI2Zvcm0gPiAuZm9ybV9pdGVtID4gbGFiZWwge1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2Zvcm1fcHJvamVjdCA+ICNmb3JtIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4jZm9ybV9wcm9qZWN0ID4gI2Zvcm0gPiAuZm9ybV9pdGVtID4gbGFiZWwge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAucHJvamVjdHNfbGlzdCA+ICoge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHJvdy1nYXA6IDAuNXJlbTtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gKiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyLFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpLFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQ6aGFzKD4gYS5hY3RpdmUpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyIHNwYW4sXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSk6aG92ZXIgc3BhbiB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gbGkgPiBzcGFuLFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpID4gc3BhbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0ID4gc3BhbiB7XG4gICAgZmxleDogMTtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+IGRpdiA+IC5idG5fYWRkX3Byb2plY3QsXG4uYnRuX2RlbGV0ZV9wcm9qZWN0IHtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nKTtcbn1cblxuQG1lZGlhIChob3Zlcjogbm9uZSkge1xuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgY2FuIGhvdmVyICovXG4gICAgLnByb2plY3RzX2xpc3QgPiAqID4gbGkge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgICAucHJvamVjdHNfbGlzdCA+ICogPiBsaSBzcGFuLFxuICAgIC5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKSBzcGFuIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0FBQ3ZCOztBQUVBOzs7SUFHSSxvQ0FBb0M7SUFDcEMsaUJBQWlCO0FBQ3JCOztBQUVBOztJQUVJLG1CQUFtQjtBQUN2Qjs7QUFFQTs7SUFFSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixPQUFPO0lBQ1Asd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksT0FBTztBQUNYOztBQUVBOztJQUVJLHNDQUFzQztBQUMxQzs7QUFFQTtJQUNJLHdDQUF3QztJQUN4QztRQUNJLGlCQUFpQjtJQUNyQjs7SUFFQTs7UUFFSSxtQkFBbUI7SUFDdkI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucHJvamVjdHNfbGlzdCA+ICoge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICByb3ctZ2FwOiAwLjVyZW07XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICoge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpob3ZlcixcXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSksXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQ6aGFzKD4gYS5hY3RpdmUpIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aG92ZXIgc3BhbixcXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSk6aG92ZXIgc3BhbiB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpID4gc3BhbixcXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSkgPiBzcGFuIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IC5uYXZfcHJvamVjdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXg6IDE7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3QgPiBzcGFuIHtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+IGRpdiA+IC5idG5fYWRkX3Byb2plY3QsXFxuLmJ0bl9kZWxldGVfcHJvamVjdCB7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmcpO1xcbn1cXG5cXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XFxuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgY2FuIGhvdmVyICovXFxuICAgIC5wcm9qZWN0c19saXN0ID4gKiA+IGxpIHtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICB9XFxuXFxuICAgIC5wcm9qZWN0c19saXN0ID4gKiA+IGxpIHNwYW4sXFxuICAgIC5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKSBzcGFuIHtcXG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjc2lkZWJhciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbiNzaWRlYmFyLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC1tb3otdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4jc2lkZWJhci5zaG93IHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNzaWRlYmFyID4gLmNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAxcmVtO1xuICAgIHBhZGRpbmc6IDEuMjVyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXNlY29uZGFyeSk7XG4gICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xuICAgIHdpZHRoOiBtaW4oNzUlLCAzNTBweCk7XG59XG5cbi5uYXZfcHJvamVjdCxcbi5uYXZfcHJvamVjdHMge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2x1bW4tZ2FwOiAwLjc1cmVtO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogMC43NXJlbTtcbiAgICAtbW96LWNvbHVtbi1nYXA6IDAuNzVyZW07XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID46Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4jc2lkZWJhciA+IC5jb250YWluZXI6aG92ZXIgLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5idG5fYWRkX3Byb2plY3Qge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xuICAgICNzaWRlYmFyIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcbiAgICAgICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgfVxuXG4gICAgI3NpZGViYXIuc2hvdyB7XG4gICAgICAgIHdpZHRoOiBtaW4oNDAlLCAzNTBweCk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBhbmltYXRpb246IHNsaWRlLWluLXJpZ2h0IDMwMG1zIGVhc2UtaW4tb3V0O1xuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAjc2lkZWJhci5oaWRlIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAjc2lkZWJhciA+IC5jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuQGtleWZyYW1lcyBzbGlkZS1pbi1yaWdodCB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgfVxufVxuXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBjYW4gaG92ZXIgKi9cbiAgICAjcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lcjpob3ZlciAuYnRuX2FkZF9wcm9qZWN0IHtcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsb0NBQW9DO0lBQ3BDLGlDQUFpQztJQUNqQyxpQ0FBaUM7SUFDakMseUNBQXlDO0lBQ3pDLHNDQUFzQztBQUMxQzs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsaUNBQWlDO0lBQ2pDLDhCQUE4QjtJQUM5Qix1Q0FBdUM7SUFDdkMsK0NBQStDO0lBQy9DLDRDQUE0QztBQUNoRDs7QUFFQTtJQUNJLGVBQWU7SUFDZixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIseUNBQXlDO0lBQ3pDLDZDQUE2QztJQUM3QyxzQkFBc0I7QUFDMUI7O0FBRUE7O0lBRUkscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQiwyQkFBMkI7SUFDM0Isd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLE9BQU87SUFDUCx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxzQkFBc0I7UUFDdEIsY0FBYztRQUNkLDJDQUEyQztRQUMzQyxtREFBbUQ7UUFDbkQsZ0RBQWdEO0lBQ3BEOztJQUVBO1FBQ0ksYUFBYTtJQUNqQjs7SUFFQTtRQUNJLFdBQVc7UUFDWCw2Q0FBNkM7SUFDakQ7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksNEJBQTRCO1FBQzVCLG9DQUFvQztRQUNwQyxpQ0FBaUM7SUFDckM7O0lBRUE7UUFDSSx5QkFBeUI7UUFDekIsaUNBQWlDO1FBQ2pDLDhCQUE4QjtJQUNsQztBQUNKOztBQUVBO0lBQ0ksd0NBQXdDO0lBQ3hDO1FBQ0ksaUJBQWlCO0lBQ3JCOztJQUVBO1FBQ0ksbUJBQW1CO1FBQ25CLDRCQUE0QjtJQUNoQztBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNzaWRlYmFyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgei1pbmRleDogOTk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4jc2lkZWJhci5oaWRlIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAzMDBtcyBlYXNlLWluLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNzaWRlYmFyLnNob3cge1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDMwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNzaWRlYmFyID4gLmNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMXJlbTtcXG4gICAgcGFkZGluZzogMS4yNXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXNlY29uZGFyeSk7XFxuICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcXG4gICAgd2lkdGg6IG1pbig3NSUsIDM1MHB4KTtcXG59XFxuXFxuLm5hdl9wcm9qZWN0LFxcbi5uYXZfcHJvamVjdHMge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XFxuICAgIC13ZWJraXQtY29sdW1uLWdhcDogMC43NXJlbTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiAwLjc1cmVtO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XFxuICAgIGZsZXg6IDE7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPjpmaXJzdC1jaGlsZCB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jc2lkZWJhciA+IC5jb250YWluZXI6aG92ZXIgLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkID4gLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgI3NpZGViYXIge1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICB3aWR0aDogaW5oZXJpdDtcXG4gICAgfVxcblxcbiAgICAjc2lkZWJhci5zaG93IHtcXG4gICAgICAgIHdpZHRoOiBtaW4oNDAlLCAzNTBweCk7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgICAgICAtbW96LWFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIuaGlkZSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lciB7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLWluLXJpZ2h0IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChob3Zlcjogbm9uZSkge1xcbiAgICAvKiB0YXJnZXRzIG9ubHkgZGV2aWNlcyB0aGF0IGNhbiBob3ZlciAqL1xcbiAgICAjcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCB7XFxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgfVxcblxcbiAgICAjc2lkZWJhciA+IC5jb250YWluZXI6aG92ZXIgLmJ0bl9hZGRfcHJvamVjdCB7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjZm9ybV90YXNrOjpiYWNrZHJvcCAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuI2Zvcm1fdGFzayA+IC5mb3JtIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jZm9ybV90YXNrID4gLmZvcm0gPiBkaXYsXG4uZm9ybV90YXNrID4gZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcm93LWdhcDogMC41cmVtO1xufVxuXG4uZm9ybV9pdGVtID4gI2Rlc2NyaXB0aW9uIHtcbiAgICByZXNpemU6IHZlcnRpY2FsO1xuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSxcbi5mb3JtX2l0ZW0gPiAjYnRuX3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwKTtcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC1tb3otY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcbn1cblxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHkgPiAudGFza19wcmlvcml0eSxcbi5mb3JtX2l0ZW0gPiAjYnRuX3Byb2plY3QgPiAudGFza19wcm9qZWN0IHtcbiAgICBmbGV4OiAxO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5OmhvdmVyIC5pbWdfd3JhcHBlcl9jaGV2cm9uIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC5pbWdfd3JhcHBlcl9jaGV2cm9uIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5mb3JtX2l0ZW0gPiAjcHJvamVjdCB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiAxMDAlO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogNTAlO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YXNrc19mb3JtLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTs7SUFFSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QiwyQ0FBMkM7SUFDM0Msd0NBQXdDO0lBQ3hDLHdDQUF3QztBQUM1Qzs7QUFFQTs7SUFFSSxPQUFPO0lBQ1AsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLHlEQUF5RDtJQUN6RCw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLDBCQUEwQjtBQUM5QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZm9ybV90YXNrOjpiYWNrZHJvcCAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcblxcbiNmb3JtX3Rhc2sgPiAuZm9ybSB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbiNmb3JtX3Rhc2sgPiAuZm9ybSA+IGRpdixcXG4uZm9ybV90YXNrID4gZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2Rlc2NyaXB0aW9uIHtcXG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcXG4gICAgbWF4LWhlaWdodDogMjAwcHg7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5LFxcbi5mb3JtX2l0ZW0gPiAjYnRuX3Byb2plY3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwKTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHkgPiAudGFza19wcmlvcml0eSxcXG4uZm9ybV9pdGVtID4gI2J0bl9wcm9qZWN0ID4gLnRhc2tfcHJvamVjdCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5OmhvdmVyIC5pbWdfd3JhcHBlcl9jaGV2cm9uIHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHkgPiAuaW1nX3dyYXBwZXJfY2hldnJvbiB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICNwcm9qZWN0IHtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vYXNzZXRzL2ljb25zL2NoZXZyb25fZG93bi5zdmcnKTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDUwJTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAudGFza3NfbGlzdCB7XG4gICAgbWFyZ2luLXRvcDogMXJlbVxufVxuXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XG4gICAgcm93LWdhcDogMXJlbTtcbn1cblxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4OiAxO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkID4gZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcm93LWdhcDogMC41cmVtO1xufVxuXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCA+IGRpdiA+IC5mb3JtX3Rhc2sge1xuICAgIG1hcmdpbjogMXJlbSAwO1xuICAgIHBhZGRpbmc6IDUlO1xuICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtXG59XG5cbmRpdltyb2xlPWJ1dHRvbl0udGFza19uZXcge1xuICAgIGFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlLWluLXNjYWxlIDIwMG1zIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IGZhZGUtaW4tc2NhbGUgMjAwbXMgZWFzZS1pbjtcbn1cblxuZGl2W3JvbGU9YnV0dG9uXSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoNjYsIDY2LCA2NiwgMC41KTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbmRpdltyb2xlPWJ1dHRvbl06aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNDVyZW07XG59XG5cbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMXJlbSAwLjI1cmVtO1xuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjc1cmVtO1xuICAgIC1tb3otY29sdW1uLWdhcDogMC43NXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzayB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbn1cblxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXI6IDNweCBzb2xpZDtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcbn1cblxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgb3BhY2l0eTogMDtcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XG59XG5cbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIgPiAuYnRuX2NoZWNrYm94X3Rhc2s6aG92ZXIgPi5jaGVja2JveF9jaXJjbGUgPiBzdmcge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyNSUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8xIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMS1jb2xvcik7XG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XG59XG5cbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMiB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTItY29sb3IpO1xuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xufVxuXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzMge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0zLWNvbG9yKTtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV80IHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xufVxuXG4udGFza19saXN0X2l0ZW1fY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcm93LWdhcDogMC4zNXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtX2NvbnRlbnQgPiAudGFza19uYW1lIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbmRpdltyb2xlPWJ1dHRvbl06aG92ZXIgLnRhc2tfYWN0aW9uc3tcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4udGFza19hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLnRhc2tfYWN0aW9ucyA+IGJ1dHRvbiB7XG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZyk7XG59XG5cbi50YXNrX2FjdGlvbnMgPiBidXR0b24gPiBzdmcge1xuICAgIHdpZHRoOiBjbGFtcCgxLjVyZW0sIDN2dywgMnJlbSk7XG59XG5cbi5idG5fZGF0ZV90YXNrIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogMC41cmVtO1xuICAgIC1tb3otY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4uYnRuX2RhdGVfdGFzayA+IHNwYW4ge1xuICAgIHdvcmQtc3BhY2luZzogMC4xNXJlbTtcbn1cblxubGkgPiAuYnRuX2FkZF90YXNrIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC1tb3otY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG59XG5cbmxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzazpob3ZlciA+IGRpdiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNpcmNsZS1yYWRpdXMpO1xufVxuXG5saSA+IGJ1dHRvbi5idG5fYWRkX3Rhc2s6aG92ZXIgPiBzcGFuIHtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGUtaW4tc2NhbGUge1xuICAgIDAlIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbn1cblxuQG1lZGlhIChob3Zlcjogbm9uZSkge1xuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgZG9uJ3QgaG92ZXIgKi9cbiAgICAudGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrID4uY2hlY2tib3hfY2lyY2xlID4gc3ZnIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyNSUsIHRyYW5zcGFyZW50KTtcbiAgICB9XG5cbiAgICBkaXZbcm9sZT1idXR0b25dIHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwLjQ1cmVtO1xuICAgIH1cblxuICAgIGRpdltyb2xlPWJ1dHRvbl0gLnRhc2tfYWN0aW9uc3tcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB9XG5cbiAgICBsaSA+IGJ1dHRvbi5idG5fYWRkX3Rhc2sgPiBkaXYge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcbiAgICB9XG5cbiAgICBsaSA+IGJ1dHRvbi5idG5fYWRkX3Rhc2sgPiBzcGFuIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksY0FBYztJQUNkLFdBQVc7SUFDWCwyQ0FBMkM7SUFDM0M7QUFDSjs7QUFFQTtJQUNJLHNDQUFzQztJQUN0Qyw4Q0FBOEM7SUFDOUMsMkNBQTJDO0FBQy9DOztBQUVBO0lBQ0ksOENBQThDO0lBQzlDLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsMkNBQTJDO0lBQzNDLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLDJCQUEyQjtJQUMzQix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGNBQWM7SUFDZCxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLFVBQVU7SUFDVixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0lBQzlCLG1FQUFtRTtBQUN2RTs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5Qiw4QkFBOEI7SUFDOUIsbUVBQW1FO0FBQ3ZFOztBQUVBO0lBQ0ksOEJBQThCO0lBQzlCLDhCQUE4QjtJQUM5QixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksT0FBTztJQUNQLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLDJDQUEyQztJQUMzQyx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSx1Q0FBdUM7SUFDdkMsZ0NBQWdDO0lBQ2hDLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLDRCQUE0QjtJQUM1QixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSTtRQUNJLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHdCQUF3QjtJQUM1Qjs7SUFFQTtRQUNJLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLDJCQUEyQjtJQUMvQjtBQUNKOztBQUVBO0lBQ0ksMENBQTBDO0lBQzFDO1FBQ0ksVUFBVTtRQUNWLG1FQUFtRTtJQUN2RTs7SUFFQTtRQUNJLGVBQWU7UUFDZiwyQ0FBMkM7UUFDM0Msc0JBQXNCO0lBQzFCOztJQUVBO1FBQ0ksbUJBQW1CO0lBQ3ZCOztJQUVBO1FBQ0ksdUNBQXVDO1FBQ3ZDLGdDQUFnQztRQUNoQyxtQ0FBbUM7SUFDdkM7O0lBRUE7UUFDSSw0QkFBNEI7UUFDNUIsaUJBQWlCO0lBQ3JCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnRhc2tzX2xpc3Qge1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtXFxufVxcblxcbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcXG4gICAgcm93LWdhcDogMXJlbTtcXG59XFxuXFxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4OiAxO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCA+IGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQgPiBkaXYgPiAuZm9ybV90YXNrIHtcXG4gICAgbWFyZ2luOiAxcmVtIDA7XFxuICAgIHBhZGRpbmc6IDUlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW1cXG59XFxuXFxuZGl2W3JvbGU9YnV0dG9uXS50YXNrX25ldyB7XFxuICAgIGFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xcbiAgICAtbW96LWFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoNjYsIDY2LCA2NiwgMC41KTtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjQ1cmVtO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogMXJlbSAwLjI1cmVtO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjc1cmVtO1xcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IDAuNzVyZW07XFxuICAgIC1tb3otY29sdW1uLWdhcDogMC43NXJlbTtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzayB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuXFxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkO1xcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XFxufVxcblxcbi5idG5fY2hlY2tib3hfdGFzayA+IC5jaGVja2JveF9jaXJjbGUgPiBzdmcge1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgZmlsbDogY3VycmVudENvbG9yO1xcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzazpob3ZlciA+LmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjUlLCB0cmFuc3BhcmVudCk7XFxufVxcblxcbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMSB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xcbn1cXG5cXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzIge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcXG59XFxuXFxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8zIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XFxufVxcblxcbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfNCB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS00LWNvbG9yKTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW1fY29udGVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDAuMzVyZW07XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbV9jb250ZW50ID4gLnRhc2tfbmFtZSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciAudGFza19hY3Rpb25ze1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4udGFza19hY3Rpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnRhc2tfYWN0aW9ucyA+IGJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmcpO1xcbn1cXG5cXG4udGFza19hY3Rpb25zID4gYnV0dG9uID4gc3ZnIHtcXG4gICAgd2lkdGg6IGNsYW1wKDEuNXJlbSwgM3Z3LCAycmVtKTtcXG59XFxuXFxuLmJ0bl9kYXRlX3Rhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxuICAgIC13ZWJraXQtY29sdW1uLWdhcDogMC41cmVtO1xcbiAgICAtbW96LWNvbHVtbi1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLmJ0bl9kYXRlX3Rhc2sgPiBzcGFuIHtcXG4gICAgd29yZC1zcGFjaW5nOiAwLjE1cmVtO1xcbn1cXG5cXG5saSA+IC5idG5fYWRkX3Rhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG59XFxuXFxubGkgPiBidXR0b24uYnRuX2FkZF90YXNrOmhvdmVyID4gZGl2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcXG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XFxufVxcblxcbmxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzazpob3ZlciA+IHNwYW4ge1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuQGtleWZyYW1lcyBmYWRlLWluLXNjYWxlIHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XFxuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgZG9uJ3QgaG92ZXIgKi9cXG4gICAgLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzayA+LmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyNSUsIHRyYW5zcGFyZW50KTtcXG4gICAgfVxcblxcbiAgICBkaXZbcm9sZT1idXR0b25dIHtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAwLjQ1cmVtO1xcbiAgICB9XFxuXFxuICAgIGRpdltyb2xlPWJ1dHRvbl0gLnRhc2tfYWN0aW9uc3tcXG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIH1cXG5cXG4gICAgbGkgPiBidXR0b24uYnRuX2FkZF90YXNrID4gZGl2IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcXG4gICAgICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XFxuICAgIH1cXG5cXG4gICAgbGkgPiBidXR0b24uYnRuX2FkZF90YXNrID4gc3BhbiB7XFxuICAgICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBzdHlsZXMgZm9yIHByaW9yaXR5IG9wdGlvbnMgZnJvbSB0YXNrc19wcmlvcml0eS5qcyBtb2R1bGUgKi9cbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnM6OmJhY2tkcm9wLFxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnM6OmJhY2tkcm9wIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMsXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zIHtcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDZweCAtMnB4IHJnYigwLCAwLCAwKTtcbn1cblxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSxcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbiN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGk6aG92ZXIsXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICBwYWRkaW5nOiAwLjhyZW07XG59XG5cbi8qIHRhc2sgcHJpb3JpdGllcyAqL1xuLnByaW9yaXR5XzEge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcbn1cblxuLnByaW9yaXR5XzIge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0yLWNvbG9yKTtcbn1cblxuLnByaW9yaXR5XzMge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0zLWNvbG9yKTtcbn1cblxuLnByaW9yaXR5XzQgIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XG59XG5cbkBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcbiAgICAvKiB0YXJnZXRzIG9ubHkgZGV2aWNlcyB0aGF0IGNhbiBob3ZlciAqL1xuICAgICN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGksXG4gICAgI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpIHtcbiAgICAgICAgcGFkZGluZzogMC44cmVtO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFza3Nfb3B0aW9ucy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsOERBQThEO0FBQzlEOztJQUVJLDZCQUE2QjtBQUNqQzs7QUFFQTs7SUFFSSxtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLHlDQUF5QztBQUM3Qzs7QUFFQTs7SUFFSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG1DQUFtQztJQUNuQywyQ0FBMkM7SUFDM0Msd0NBQXdDO0lBQ3hDLGVBQWU7QUFDbkI7O0FBRUE7O0lBRUksb0NBQW9DO0lBQ3BDLGVBQWU7QUFDbkI7O0FBRUEsb0JBQW9CO0FBQ3BCO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksd0NBQXdDO0lBQ3hDOztRQUVJLGVBQWU7SUFDbkI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIHByaW9yaXR5IG9wdGlvbnMgZnJvbSB0YXNrc19wcmlvcml0eS5qcyBtb2R1bGUgKi9cXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zOjpiYWNrZHJvcCxcXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9uczo6YmFja2Ryb3Age1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMsXFxuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA2cHggLTJweCByZ2IoMCwgMCwgMCk7XFxufVxcblxcbiN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGksXFxuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxuICAgIC1tb3otY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxuICAgIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaTpob3ZlcixcXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgIHBhZGRpbmc6IDAuOHJlbTtcXG59XFxuXFxuLyogdGFzayBwcmlvcml0aWVzICovXFxuLnByaW9yaXR5XzEge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMS1jb2xvcik7XFxufVxcblxcbi5wcmlvcml0eV8yIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTItY29sb3IpO1xcbn1cXG5cXG4ucHJpb3JpdHlfMyB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0zLWNvbG9yKTtcXG59XFxuXFxuLnByaW9yaXR5XzQgIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTQtY29sb3IpO1xcbn1cXG5cXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XFxuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgY2FuIGhvdmVyICovXFxuICAgICN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGksXFxuICAgICN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSB7XFxuICAgICAgICBwYWRkaW5nOiAwLjhyZW07XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2FwcC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaGVhZGVyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaGVhZGVyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tb2RhbF9yZW1vdmFsLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbW9kYWxfcmVtb3ZhbC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0cy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfZm9ybS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2Zvcm0uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2xpc3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19saXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaWRlYmFyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2lkZWJhci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfZm9ybS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2Zvcm0uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2xpc3QuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19saXN0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19vcHRpb25zLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3Nfb3B0aW9ucy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCBidWlsZEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyJztcbmltcG9ydCBidWlsZFNpZGVCYXIgZnJvbSAnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhcic7XG5pbXBvcnQgYnVpbGRNYWluIGZyb20gJy4vY29tcG9uZW50cy9tYWluJztcbmltcG9ydCB7IHNldFByb2plY3RzIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UnO1xuaW1wb3J0IGJ1aWxkT3ZlcmxheSBmcm9tICcuL2NvbXBvbmVudHMvb3ZlcmxheSc7XG5pbXBvcnQgU1ZHSW5qZWN0IGZyb20gJ0BpY29uZnUvc3ZnLWluamVjdCdcbi8vIFNWR0luamVjdFxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvQGljb25mdS9zdmctaW5qZWN0XG5cbmltcG9ydCAnLi9hcHAuY3NzJztcblxuY29uc3QgYXBwQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBidWlsZCA9IHtcbiAgICAgICAgaGVhZGVyOiBidWlsZEhlYWRlcixcbiAgICAgICAgc2lkZWJhcjogYnVpbGRTaWRlQmFyLFxuICAgICAgICBvdmVybGF5OiBidWlsZE92ZXJsYXksXG4gICAgICAgIG1haW46IGJ1aWxkTWFpbixcbiAgICB9XG5cbiAgICBjb25zdCBhcHAgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0UHJvamVjdHMoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXBwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgYXBwQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXBwV3JhcHBlci5pZCA9ICd0b2RvX2FwcCc7XG4gICAgICAgICAgICBhcHBDb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuXG4gICAgICAgICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkLmhlYWRlcigpKTtcbiAgICAgICAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQub3ZlcmxheSgpKTtcbiAgICAgICAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQuc2lkZWJhcigpKTtcbiAgICAgICAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQubWFpbigpKTtcbiAgICAgICAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwQ29udGVudCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwV3JhcHBlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgYXBwLmluaXQoKTtcbn0pKCk7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FkZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvYWRkLnN2Z1wiLFxuXHRcIi4vY2hlY2tfc21hbGwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZWNrX3NtYWxsLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9kb3duLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX2xlZnQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fbGVmdC5zdmdcIixcblx0XCIuL2NoZXZyb25fcmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fcmlnaHQuc3ZnXCIsXG5cdFwiLi9jaXJjbGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NpcmNsZS5zdmdcIixcblx0XCIuL2NvZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY29nLnN2Z1wiLFxuXHRcIi4vZGF0ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZGF0ZS5zdmdcIixcblx0XCIuL2RlbGV0ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZGVsZXRlLnN2Z1wiLFxuXHRcIi4vZWRpdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZWRpdC5zdmdcIixcblx0XCIuL2ZsYWcuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2ZsYWcuc3ZnXCIsXG5cdFwiLi9naXRodWItbWFyay9naXRodWItbWFyay13aGl0ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCIsXG5cdFwiLi9naXRodWItbWFyay9naXRodWItbWFyay5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmsuc3ZnXCIsXG5cdFwiLi9ob21lLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9ob21lLnN2Z1wiLFxuXHRcIi4vaW5ib3guc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2luYm94LnN2Z1wiLFxuXHRcIi4vbWFnbmlmeS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWFnbmlmeS5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCIsXG5cdFwiLi9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiLFxuXHRcIi4vdG9kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3RvZGF5LnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyByZWN1cnNpdmUgXFxcXC5zdmckXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FkZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvYWRkLnN2Z1wiLFxuXHRcIi4vY2hlY2tfc21hbGwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZWNrX3NtYWxsLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9kb3duLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX2xlZnQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fbGVmdC5zdmdcIixcblx0XCIuL2NoZXZyb25fcmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NoZXZyb25fcmlnaHQuc3ZnXCIsXG5cdFwiLi9jaXJjbGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NpcmNsZS5zdmdcIixcblx0XCIuL2NvZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY29nLnN2Z1wiLFxuXHRcIi4vZGF0ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZGF0ZS5zdmdcIixcblx0XCIuL2RlbGV0ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZGVsZXRlLnN2Z1wiLFxuXHRcIi4vZWRpdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvZWRpdC5zdmdcIixcblx0XCIuL2ZsYWcuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2ZsYWcuc3ZnXCIsXG5cdFwiLi9ob21lLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9ob21lLnN2Z1wiLFxuXHRcIi4vaW5ib3guc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2luYm94LnN2Z1wiLFxuXHRcIi4vbWFnbmlmeS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbWFnbmlmeS5zdmdcIixcblx0XCIuL21lbnUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21lbnUuc3ZnXCIsXG5cdFwiLi9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9yYWRpb19idXR0b25fdW5jaGVja2VkLnN2Z1wiLFxuXHRcIi4vdG9kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL3RvZGF5LnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMgc3luYyBcXFxcLnN2ZyRcIjsiLCIgICAgaW1wb3J0IEljb25BZGQgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2FkZC5zdmcnO1xuICAgIGltcG9ydCBJY29uRGVsZXRlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9kZWxldGUuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkVkaXQgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2VkaXQuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkNpcmNsZSBmcm9tICcuLi9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmcnO1xuICAgIGltcG9ydCBJY29uRGF0ZSBmcm9tICcuLi9hc3NldHMvaWNvbnMvZGF0ZS5zdmcnO1xuICAgIGltcG9ydCBJY29uQ2hlY2sgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2NoZWNrX3NtYWxsLnN2Zyc7XG4gICAgY29uc3QgaWNvbnMgPSB7IFxuICAgICAgICBhZGQ6IEljb25BZGQsXG4gICAgICAgIGRlbGV0ZTogSWNvbkRlbGV0ZSxcbiAgICAgICAgZWRpdDogSWNvbkVkaXQsXG4gICAgICAgIGNpcmNsZTogSWNvbkNpcmNsZSxcbiAgICAgICAgY2hlY2tib3g6IEljb25DaGVjayxcbiAgICAgICAgZGF0ZTogSWNvbkRhdGUsXG4gICAgfTtcblxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQnV0dG9uKHR5cGUsIG5hbWUsIHRleHQpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSwgYnV0dG9uQXR0cmlidXRlcyh0eXBlLCBuYW1lKSk7ICAgIFxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpY29uc1t0eXBlXTtcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgXG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdidG5faW1nX3dyYXBwZXInKTtcbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICBjb25zdCBjaGVja2JveEJvcmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNoZWNrYm94Qm9yZGVyLmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94X2NpcmNsZScpO1xuICAgICAgICAgICAgY2hlY2tib3hCb3JkZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGNoZWNrYm94Qm9yZGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYnV0dG9uQXR0cmlidXRlcyA9ICh0eXBlLCBuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHtcbiAgICAgICAgICAgIC8vIGNsYXNzTmFtZTogYnRuX2RlbGV0ZV9wcm9qZWN0XG4gICAgICAgICAgICBjbGFzc05hbWU6IGBidG5fJHt0eXBlfV8ke25hbWV9YCxcbiAgICAgICAgICAgIHR5cGU6IGBidXR0b25gLFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfSIsImltcG9ydCBpbXBvcnRBbGwgZnJvbSAnLi4vdXRpbGl0aWVzL2ltcG9ydC1hbGwnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInOyAvLyBjb25uZWN0IC5idG5faG9tZSB0byBtYWluQ29udGVudC5zd2l0Y2hDb250ZW50XG5pbXBvcnQgYnVpbGRUYXNrc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19mb3JtJztcbmltcG9ydCAnLi4vc3R5bGVzL2hlYWRlci5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEhlYWRlcihhcHAsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXIucmVuZGVyKCkpO1xuICAgIGhlYWRlci5jYWNoZURPTShoZWFkZXJFbGVtZW50KTtcbiAgICBoZWFkZXIuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gICAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pY29ucycsIHRydWUsIC9cXC5zdmckLykpLFxufVxuXG5jb25zdCBoZWFkZXIgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmJ0bk1lbnUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9tZW51Jyk7XG4gICAgICAgIHRoaXMuYnRuSG9tZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2hvbWUnKTtcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5idG5fYWRkX3Rhc2snKTtcbiAgICAgICAgdGhpcy5pbnB1dFNlYXJjaCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfc2VhcmNoJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZU5hdiA9IHRoaXMuYW5pbWF0ZU5hdi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gpO1xuICAgICAgICB0aGlzLmJ0bkhvbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnB1Ymxpc2gpO1xuICAgICAgICB0aGlzLmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFRhc2tzRm9ybSk7XG4gICAgICAgIHRoaXMuaW5wdXRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignc2VhcmNoJywgdGhpcy5zZWFyY2gpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdhbmltYXRlX25hdicsIHRoaXMuYW5pbWF0ZU5hdik7IC8vdGVzdGluZ1xuICAgIH0sXG4gICAgaGVhZGVyQ29udGVudDoge1xuICAgICAgICBoZWFkZXJMZWZ0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fbWVudScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQ6ICdpbWcnLFxuICAgICAgICAgICAgICAgIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydtZW51LnN2ZyddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9ob21lIHRvZGF5JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ2hvbWUuc3ZnJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpbnB1dF9zZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2VhcmNoJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaGVhZGVyUmlnaHQ6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9hZGRfdGFzaycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQ6ICdpbWcnLFxuICAgICAgICAgICAgICAgIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydhZGQuc3ZnJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZ2l0aHViJyxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9taWtleUNvcy90aGVPZGluUHJvamVjdC90cmVlL21haW4vamF2YVNjcmlwdC9wcm9qZWN0cy90b2RvLWxpc3QnLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICAgICAgICBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1snZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJ10sXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuaWQgPSAnbmF2YmFyJztcblxuICAgICAgICBmb3IgKGxldCBzZWN0aW9uIGluIHRoaXMuaGVhZGVyQ29udGVudCkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsZXQgd3JhcHBlckNsYXNzO1xuICAgICAgICAgICAgc2VjdGlvbiA9PT0gJ2hlYWRlckxlZnQnID8gd3JhcHBlckNsYXNzID0gJ25hdl9sZWZ0JyA6IHdyYXBwZXJDbGFzcyA9ICduYXZfcmlnaHQnO1xuICAgICAgICAgICAgaGVhZGVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKHdyYXBwZXJDbGFzcyk7XG4gICAgICAgICAgICBoZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyQ29udGVudFtzZWN0aW9uXS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGhlYWRlckl0ZW0sIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgaWYgKCdwbGFjZWhvbGRlcicgaW4gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJJdGVtLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBpdGVtLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5jaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSWNvbi5zcmMgPSBpdGVtLnNyYztcbiAgICAgICAgICAgICAgICAgICAgaXRlbUljb24uc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoZWFkZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVySXRlbSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXJDb250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlcldyYXBwZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zdCBidG4gPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGUgPyBlLmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lIDogbnVsbDtcbiAgICAgICAgbGV0IHN1YnNjcmliZXI7XG4gICAgICAgIGlmIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLmluY2x1ZGVzKCdob21lJykpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIgPSAnY29udGVudCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyID0gJ3RvZ2dsZVNpZGViYXInXG4gICAgICAgIH1cbiAgICAgICAgcHViU3ViLnB1Ymxpc2goc3Vic2NyaWJlciwgZS5jdXJyZW50VGFyZ2V0KTtcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5vcGVuKFxuICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9VVZBN01EUXIxTmMnLFxuICAgICAgICAgICAgJ19ibGFuaydcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGFuaW1hdGVOYXY6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYnRuTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdGF0ZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5NZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3JvdGF0ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk1lbnUuY2xhc3NMaXN0LmFkZCgncm90YXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IGJ1aWxkUHJvamVjdHMgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0cyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0VGFza3MgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0X3Rhc2tzJztcbmltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0IHsgYnVpbGRMaXN0IH0gZnJvbSAnLi9wcm9qZWN0c19saXN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYWluKCkge1xuICAgIG1haW5Db250ZW50LmluaXQoKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgIG1haW4uaWQgPSAnbWFpbl9jb250ZW50JztcbiAgICBtYWluQ29udGVudC5jYWNoZURPTShtYWluKTtcbiAgICBtYWluQ29udGVudC5yZW5kZXIoKTtcbiAgICBtYWluQ29udGVudC5iaW5kRXZlbnRzKCk7XG5cbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdjb250ZW50JywgbWFpbkNvbnRlbnQuc3dpdGNoQ29udGVudCk7XG4gICAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlVGFicycsIG1haW5Db250ZW50LnVwZGF0ZVRhYnMpO1xuICAgIHJldHVybiBtYWluO1xufVxuXG5jb25zdCBidWlsZCA9IHtcbiAgICBwcm9qZWN0czogYnVpbGRQcm9qZWN0cyxcbiAgICBwcm9qZWN0OiBidWlsZFByb2plY3RUYXNrcyxcbn1cblxuZXhwb3J0IGNvbnN0IG1haW5Db250ZW50ID0ge1xuICAgIGFjdGl2ZUNvbnRlbnQ6IG51bGwsXG4gICAgYWN0aXZlVGFiOiBudWxsLFxuICAgIG5hdlRhYnM6IHtcbiAgICAgICAgZ2V0QWxsQW5jaG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0aWMuY29uY2F0KHRoaXMuZHluYW1pYyk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLm5hdlRhYnMuc3RhdGljID0gW1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbaHJlZj0nI2luYm94J11gKSxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBhW2hyZWY9JyN0b2RheSddYCksXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm5hdl9wcm9qZWN0c2ApLFxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdGhpcy5uYXZUYWJzLmR5bmFtaWMgPSBbXG4gICAgICAgICAgICAgICAgLi4uYnVpbGRMaXN0LmZpbmQoJ3NpZGViYXInKS5wcm9qZWN0c0xpc3RBbmNob3JzXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIodGhpcy5uYXZUYWJzLnN0YXRpY1sxXSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICB1cGRhdGVUYWJzOiBmdW5jdGlvbihhbmNob3JzKSB7XG4gICAgICAgIC8vIHVwZGF0ZXMgbmF2VGFicy5keW5hbWljXG4gICAgICAgIHRoaXMubmF2VGFicy5keW5hbWljID0gWy4uLmFuY2hvcnNdO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLm1haW4gPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMubWFpbk92ZXJsYXkgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLm92ZXJsYXlfbWFpbl9jb250ZW50Jyk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKGtleSwgdXVpZCkge1xuICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFsncHJvamVjdCddKHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYWluLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKHV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEFjdGl2ZUNvbnRlbnQoY29udGVudCk7XG4gICAgICAgIHRoaXMubWFpbi5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRhYnMgPSB0aGlzLnVwZGF0ZVRhYnMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zd2l0Y2hDb250ZW50ID0gdGhpcy5zd2l0Y2hDb250ZW50LmJpbmQodGhpcyk7XG4gICAgfSxcbiAgICBzd2l0Y2hDb250ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCByZW5kZXJLZXkgPSAncHJvamVjdCc7XG4gICAgICAgIGxldCB1dWlkID0gbnVsbDtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGUuY2xhc3NOYW1lLmluY2x1ZGVzKCd0b2RheScpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaG9tZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgICAgICAvLyByZW5kZXJzIHRoZSB0b2RheSBzZWN0aW9uXG4gICAgICAgICAgICAgICAgdXVpZCA9IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuZGF0YXNldC5pbmJveFV1aWQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBhIHByb2plY3QgaXMgdGhlIGNvbnRlbnQgYW5kIGlzIGRlbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVuZGVycyB0aGUgaW5ib3ggc2VjdGlvblxuICAgICAgICAgICAgICAgIHV1aWQgPSBlLmRhdGFzZXQuaW5ib3hVdWlkO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLnBhcmVudEVsZW1lbnQuZGF0YXNldC51dWlkKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVuZGVycyByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgICAgICB1dWlkID0gZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQudXVpZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcmVuZGVycyBwcm9qZWN0cyBzZWN0aW9uXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5ID0gJ3Byb2plY3RzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlLnV1aWQpIHtcbiAgICAgICAgICAgIC8vIG5ldyBwcm9qZWN0IGNyZWF0ZWRcbiAgICAgICAgICAgIHV1aWQgPSBlLnV1aWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dWlkID0gcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcihyZW5kZXJLZXksIHV1aWQpO1xuICAgIH0sXG4gICAgc2V0QWN0aXZlVGFiOiBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPyB0aGlzLmFjdGl2ZVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSA6IG51bGw7XG4gICAgICAgIGlmICh0YWIuZmlyc3RDaGlsZC50YWdOYW1lICE9PSAnSDEnKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGhpcy5uYXZUYWJzLmdldEFsbEFuY2hvcnMoKS5maW5kKGFuY2hvciA9PiBcbiAgICAgICAgICAgICAgICBhbmNob3IuaHJlZi5zcGxpdCgnIycpWzFdLmluY2x1ZGVzKHRhYi5maXJzdENoaWxkLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0sXG4gICAgc2V0QWN0aXZlQ29udGVudDogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5hY3RpdmVDb250ZW50ID0gY29udGVudDtcbiAgICB9LFxufSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCAnLi4vc3R5bGVzL21vZGFsX3JlbW92YWwuY3NzJ1xuXG4vLyBtaW1pY3MgYWxlcnQgYm94IGNvbmZpcm1pbmcgdGFzay9wcm9qZWN0IHJlbW92YWxcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTW9kYWxSZW1vdmUob2JqKSB7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICBkaWFsb2dFbGVtZW50LmlkID0gJ21vZGFsJztcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fcmVtb3ZhbCcpO1xuXG4gICAgY29uc3QgbW9kYWwgPSBidWlsZE1vZGFsKGRpYWxvZ0VsZW1lbnQsIGZvcm0sIG9iaik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtb2RhbC5yZW5kZXIoKSk7XG4gICAgbW9kYWwuY2FjaGVET00oKTtcbiAgICBtb2RhbC5iaW5kRXZlbnRzKCk7XG5cbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgZGlhbG9nRWxlbWVudC5zaG93TW9kYWwoKTtcbn1cblxuY29uc3QgYnVpbGRNb2RhbCA9IChkaWFsb2dFbGVtZW50LCBmb3JtLCBvYmopID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQsXG4gICAgICAgIGZvcm0sXG4gICAgICAgIHR5cGU6IG9iai50eXBlLFxuICAgICAgICBvYmosXG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBtb2RhbChzdGF0ZSksXG4gICAgKVxuXG59XG5cbmNvbnN0IG1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gICAgZm9ybTogc3RhdGUuZm9ybSxcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIHNlbGVjdGlvbjogc3RhdGUub2JqLFxuICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fY2FuY2VsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICB0ZXh0OiAnRGVsZXRlJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fc3VibWl0X3JlbW92ZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5EZWxldGUgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9zdWJtaXRfcmVtb3ZlJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtID0gdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VGb3JtKTtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBpdGVtRm9yUmVtb3ZhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xuXG4gICAgICAgIGl0ZW1Gb3JSZW1vdmFsLmNsYXNzTGlzdC5hZGQoJ2l0ZW1fZm9yX3JlbW92YWwnKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0RlbGV0ZT8nO1xuICAgICAgICBpdGVtRm9yUmVtb3ZhbC50ZXh0Q29udGVudCA9IHRoaXMuc2VsZWN0aW9uLnRpdGxlID8gdGhpcy5zZWxlY3Rpb24udGl0bGUgOiB0aGlzLnNlbGVjdGlvbi5uYW1lO1xuICAgICAgICBjb25zdCBtZXNzYWdlQmVnaW5UZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGApO1xuICAgICAgICBjb25zdCBtZXNzYWdlRW5kVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgP2ApO1xuICAgICAgICBcbiAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChtZXNzYWdlQmVnaW5UZXh0Tm9kZSlcbiAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChpdGVtRm9yUmVtb3ZhbCk7XG4gICAgICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobWVzc2FnZUVuZFRleHROb2RlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICBjb25zdCBmb3JtQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtQnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdmb3JtX2J1dHRvbnMnKTtcbiAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KSwgaXRlbS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQnV0dG9ucyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAndGFzaycpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJywgdGhpcy5zZWxlY3Rpb24udXVpZFRhc2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVByb2plY3QnLCB0aGlzLnNlbGVjdGlvbi51dWlkKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdoaWRlU2lkZWJhcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgfSxcbiAgICBjbG9zZUZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmNsb3NlKClcbiAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgIH0sXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdtb2RhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG59KSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRPdmVybGF5KCkge1xuICAgIHJldHVybiBvdmVybGF5LnJlbmRlcigpO1xufVxuXG5jb25zdCBvdmVybGF5ID0ge1xuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gY29udGFpbmVyO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXlfbWFpbl9jb250ZW50Jyk7XG4gICAgICAgIHRoaXMuY2FjaGVET00ob3ZlcmxheSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIHJldHVybiBvdmVybGF5O1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGltT3ZlcmxheSA9IHRoaXMuZGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgICAgICBwdWJTdWIuc3Vic2NyaWJlKCdkaW0nLCBvdmVybGF5LmRpbU92ZXJsYXkpO1xuICAgIFxuICAgIH0sXG4gICAgZGltT3ZlcmxheTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSB8fCB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2RpbScpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlLmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnZGltJyk7XG4gICAgICAgIH1cbiAgICB9LFxufSIsImltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXInO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRUYXNrc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19mb3JtJztcbmltcG9ydCB7IHRhc2tzTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfbGlzdCc7XG5cbi8vIHJlbmRlcnMgYSBwcm9qZWN0J3MgcGFnZSBhbmQgaXQncyB0YXNrc1xuLy8gd2hlbiB3ZSBhcmUgYXQgYSBwcm9qZWN0J3MgcGFnZVxuICAgIC8vIHdlIGRlbGV0ZSBpdCBmcm9tIHRoZXJlIG9yIGZyb20gdGhlIHNpZGViYXJcbiAgICAgICAgLy8gY2hhbmdlIGNvbnRlbnQgdG8gaG9tZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcm9qZWN0VGFza3ModXVpZCkge1xuICAgIHByb2plY3RDb250cm9sbGVyLnNldEFjdGl2ZSh1dWlkKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdENvbnRyb2xsZXIuZmluZCh1dWlkKTtcbiAgICBwcm9qZWN0VGFza3MucHJvamVjdCA9IHByb2plY3Q7XG4gICAgY29uc3QgY29udGVudCA9IHByb2plY3RUYXNrcy5yZW5kZXIoKTtcbiAgICBwcm9qZWN0VGFza3MuY2FjaGVET00oY29udGVudCk7XG4gICAgcHJvamVjdFRhc2tzLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2plY3RUYXNrcyA9IHtcbiAgICBwcm9qZWN0OiBudWxsLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0VGFza3NDb250YWluZXIgPSBjb250YWluZXJcbiAgICAgICAgdGhpcy51bExpc3QgPSB0aGlzLnByb2plY3RUYXNrc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudGFza3NfbGlzdCcpO1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSB0aGlzLnVsTGlzdC5maXJzdENoaWxkO1xuICAgICAgICB0aGlzLmJ0bkFkZFRhc2sgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF90YXNrJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRUYXNrc0Zvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCd0YXNrc19saXN0Jyk7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcblxuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0YXNrc0xpc3QuaW5pdCgpKTtcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oJ2FkZCcsICd0YXNrJywgJ0FkZCB0YXNrJykpO1xuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcblxuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0KTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzQ29udGFpbmVyXG4gICAgfSxcbn0iLCJpbXBvcnQgeyBidWlsZExpc3QgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzX2xpc3QnO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRQcm9qZWN0Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzX2Zvcm0nO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0cy5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFByb2plY3RzKCkge1xuICAgIHByb2plY3RDb250cm9sbGVyLnNldEFjdGl2ZSgpO1xuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIFxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG5cbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RzLnJlbmRlcigpKTtcbiAgICBwcm9qZWN0cy5jYWNoZURPTShwcm9qZWN0c0NvbnRhaW5lcik7XG4gICAgcHJvamVjdHMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHByb2plY3RzQ29udGFpbmVyXG59XG5cbmNvbnN0IHByb2plY3RzID0ge1xuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5idG5BZGRQcm9qZWN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5idG5fYWRkX3Byb2plY3QnKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFByb2plY3RGb3JtKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBhbmNob3JXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFuY2hvcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbmF2X3Byb2plY3RzJyk7XG5cbiAgICAgICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbignYWRkJywgJ3Byb2plY3QnLCAnQWRkIHByb2plY3QnKSk7ICAgICAgICBcbiAgICAgICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvcldyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkTGlzdC5hZGQoJ2NvbnRlbnQnLCBwYXJlbnRDb250YWluZXIsIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoJ2NvbnRlbnQnKS5jbGVhckNhY2hlKCk7XG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKCdjb250ZW50JykuaW5pdCgpO1xuICAgICAgICByZXR1cm4gcGFyZW50Q29udGFpbmVyO1xuICAgIH0sXG59IiwiaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgeyBidWlsZExpc3QgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzX2xpc3QnO1xuaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuaW1wb3J0ICcuLi9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3MnO1xuXG4vLyByZW5kZXJzIGEgZm9ybSB0byBjcmVhdGUgYSBwcm9qZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFByb2plY3RGb3JtKCkge1xuICAgIC8vIHByb2plY3RDb250cm9sbGVyLnNldEFjdGl2ZSgpO1xuICAgIGNvbnN0IGRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKTtcbiAgICBkaWFsb2dFbGVtZW50LmlkID0gJ2Zvcm1fcHJvamVjdCc7XG4gICAgZGlhbG9nRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtUHJvamVjdC5yZW5kZXIoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaWFsb2dFbGVtZW50KTtcbiAgICBkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xuICAgIGZvcm1Qcm9qZWN0LmNhY2hlRE9NKCk7XG4gICAgZm9ybVByb2plY3QuYmluZEV2ZW50cygpO1xufVxuXG5jb25zdCBmb3JtUHJvamVjdCA9IHtcbiAgICBmb3JtQ2hpbGRyZW46IHtcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgaWQ6ICd0aXRsZScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdwcm9qZWN0X2lucHV0JyxcbiAgICAgICAgICAgIG5hbWU6ICd0aXRsZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIFByb2plY3QgVGl0bGUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBmb3JtQnV0dG9uczoge1xuICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF9wcm9qZWN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybV9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF9wcm9qZWN0Jyk7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNmb3JtIGlucHV0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwgPSB0aGlzLnJlbW92ZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlTW9kYWwpO1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICB9LFxuICAgIC8vIHRha2UgYSBsb29rIGF0IHJlc3RhdXJhbnQgcHJvamVjdCdzIGNvbnRhY3QgbW9kdWxlXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGNvbnN0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBjb25zdCBmb3JtQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtQnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdmb3JtX2J1dHRvbnMnKTtcbiAgICAgICAgZm9ybUVsZW1lbnQuaWQgPSAnZm9ybSc7XG4gICAgICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtSGVhZGVyKTtcblxuICAgICAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gdGhpcy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKCdmb3JtX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmhhc093blByb3BlcnR5KCdyZXF1aXJlZCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpLCB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdKTtcbiAgICAgICAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGZvcm1DaGlsZDtcbiAgICAgICAgICAgICAgICBsYWJlbC5odG1sRm9yID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5pZDtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgYnRuIGluIHRoaXMuZm9ybUJ1dHRvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnV0dG9uLCB0aGlzLmZvcm1CdXR0b25zW2J0bl0pO1xuICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IGJ0bjtcblxuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgZm9ybUJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtQnV0dG9ucyk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50XG4gICAgfSxcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnRElBTE9HJykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBvcHRpb25hbCwgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAgICAvLyBpZiBmb3JtIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgLy8gdGhlbiBhZGRQcm9qZWN0KClcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuYWRkUHJvamVjdCh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZCgnc2lkZWJhcicpLnJlbmRlcigpOyAvLyB3aWxsIHJlbmRlciBvbmx5IHRoZSBzaWRlYmFyXG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpKTtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnaGlkZVNpZGViYXInKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfVxufSIsImltcG9ydCB7IHByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi4vY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXInO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gJy4vYnV0dG9ucyc7XG5pbXBvcnQgYnVpbGRNb2RhbFJlbW92ZSBmcm9tICcuL21vZGFsX3JlbW92ZSc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgSWNvbkluYm94IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9pbmJveC5zdmcnO1xuaW1wb3J0IEljb25Ub2RheSBmcm9tICcuLi9hc3NldHMvaWNvbnMvdG9kYXkuc3ZnJztcbmltcG9ydCBJY29uUHJvamVjdCBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Zyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0cy5jc3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvcHJvamVjdHNfbGlzdC5jc3MnO1xuXG5jb25zdCBidWlsZFByb2plY3RzTGlzdCA9ICh0eXBlLCBjb250YWluZXIsIGFycmF5KSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFycmF5LFxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgcHJvamVjdHNMaXN0KHN0YXRlKSxcbiAgICAgICAgc2V0SWNvbnMoc3RhdGUpLFxuICAgICAgICApXG59XG5cbmV4cG9ydCBjb25zdCBidWlsZExpc3QgPSB7XG4gICAgbW9kdWxlczogW10sXG4gICAgYWRkOiBmdW5jdGlvbiAodHlwZSwgY29udGFpbmVyLCBhcnJheSkge1xuICAgICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIHRoZSBtb2R1bGUgZXhpc3RzIGFscmVhZHlcbiAgICAgICAgLy8gaWYgbW9kdWxlIGV4aXN0cywgdGhlbiB1cGRhdGUgaXQncyBjb250YWluZXJcbiAgICAgICAgLy8gcHJldmVudHMgc2ltaWxhciBtb2R1bGVzIHRvIGJlIGFkZGVkXG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXMuc29tZShtb2R1bGUgPT4gbW9kdWxlLnR5cGUgPT09IHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmQodHlwZSkuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVzID0gWy4uLnRoaXMubW9kdWxlcywgYnVpbGRQcm9qZWN0c0xpc3QodHlwZSwgY29udGFpbmVyLCBhcnJheSldO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChtb2R1bGUgPT4gbW9kdWxlLnR5cGUgPT09IHR5cGUpO1xuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdHNMaXN0ID0gKHN0YXRlKSA9PiAoe1xuICAgIHJlbW92ZVNlbGVjdGlvbjogbnVsbCxcbiAgICBhcnJheTogc3RhdGUuYXJyYXksXG4gICAgdHlwZTogc3RhdGUudHlwZSxcbiAgICBjb250YWluZXI6IHN0YXRlLmNvbnRhaW5lcixcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdHNfbGlzdCcpO1xuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpXG4gICAgICAgIHRoaXMuY2FjaGVET00obGlzdCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0KTtcbiAgICB9LFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpICB7ICAgIFxuICAgICAgICB0aGlzLnVsTGlzdCA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy51bExpc3QuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RJdGVtcyA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0QW5jaG9ycyA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpIGEnKTtcbiAgICAgICAgdGhpcy5idG5EZWxldGVQcm9qZWN0ID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvckFsbCgnLmJ0bl9kZWxldGVfcHJvamVjdCcpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2lkZWJhcicpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVUYWJzJywgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJvamVjdCA9IHRoaXMucmVtb3ZlUHJvamVjdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnB1Ymxpc2ggPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgncmVtb3ZlUHJvamVjdCcsIHRoaXMucmVtb3ZlUHJvamVjdCk7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdC5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZVByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEFuY2hvcnMuZm9yRWFjaCggcHJvamVjdCA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wdWJsaXNoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3JTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9ySW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBhbmNob3JJbWcuc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgICAgICAgICBhbmNob3JTcGFuLnRleHRDb250ZW50ID0gdGhpcy5hcnJheVtpXS50aXRsZTtcbiAgICAgICAgICAgIGFuY2hvci5ocmVmID0gYCMke3RoaXMuYXJyYXlbaV0udGl0bGUudG9Mb3dlckNhc2UoKX1gO1xuXG4gICAgICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZCcsIHRoaXMuYXJyYXlbaV0udXVpZCk7XG4gICAgICAgICAgICBhbmNob3IuY2xhc3NMaXN0LmFkZCgnbmF2X3Byb2plY3QnKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmljb25zKS5maW5kKGEgPT4gYSA9PT0gdGhpcy5hcnJheVtpXS50aXRsZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIGFuY2hvckltZy5zcmMgPSB0aGlzLmljb25zW09iamVjdC5rZXlzKHRoaXMuaWNvbnMpLmZpbmQoYSA9PiBhID09PSB0aGlzLmFycmF5W2ldLnRpdGxlLnRvTG93ZXJDYXNlKCkpXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmNob3JJbWcuc3JjID0gdGhpcy5pY29uc1snY2lyY2xlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChhbmNob3JJbWcpO1xuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGFuY2hvclNwYW4pO1xuICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoYW5jaG9yKTtcblxuICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgIT09ICdtaXNjJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGJ1aWxkQnV0dG9uKCdkZWxldGUnLCAncHJvamVjdCcpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5ib3gtdXVpZCcsIHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQpO1xuICAgICAgICAgICAgICAgIGJ1dHRvblNwYW4uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChidXR0b25TcGFuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RJdGVtcy5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnVsTGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbXMpO1xuICAgICAgICAgICAgLy8gY2hhbmdlcyBjb250ZW50IHRvIHRoZSBuZXdseSBwcm9qZWN0IGlzIGFkZGVkXG4gICAgICAgICAgICB0aGlzLmNhY2hlRE9NKHRoaXMudWxMaXN0KTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0SXRlbXM7XG4gICAgfSxcbiAgICByZW1vdmVQcm9qZWN0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgLy8gc2V0cyByZW1vdmVTZWxlY3Rpb24gZm9yICdzaWRlYmFyJyBhbmQgJ2NvbnRlbnQnIG1vZHVsZXNcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlLnR5cGUgIT09ICdtaXNjJykge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uID0gWy4uLm1vZHVsZS5wcm9qZWN0c0xpc3RJdGVtc10uZmluZChpdGVtID0+IGl0ZW0uZGF0YXNldC51dWlkID09PSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VVVJRCA9IGxpc3RJdGVtLmRhdGFzZXQudXVpZDtcbiAgICAgICAgICAgIGJ1aWxkTW9kYWxSZW1vdmUocHJvamVjdENvbnRyb2xsZXIuZmluZChwcm9qZWN0VVVJRCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucmVtb3ZlKGUpO1xuICAgICAgICAgICAgLy8gcmVtb3ZlcyBhbmQgcmVzZXRzIHJlbW92ZVNlbGVjdGlvbiBmb3IgJ3NpZGViYXInIGFuZCAnY29udGVudCcgbW9kdWxlcyBcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlLnR5cGUgIT09ICdtaXNjJyAmJiBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGlmICgodGhpcy50eXBlID09PSAnc2lkZWJhcid8fCB0aGlzLnR5cGUgPT09ICdtaXNjJykgJiYgd2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdoaWRlU2lkZWJhcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbGVhckNhY2hlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bExpc3QgPSBudWxsO1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzID0gbnVsbDtcbiAgICAgICAgdGhpcy5idG5EZWxldGVQcm9qZWN0ID0gbnVsbDtcbiAgICB9LFxufSlcblxuY29uc3Qgc2V0SWNvbnMgPSAoc3RhdGUpID0+IHtcbiAgICBsZXQgaWNvbnMgPSB7fVxuXG4gICAgaWYgKHN0YXRlLnR5cGUgPT09ICdtaXNjJykge1xuICAgICAgICBpY29ucy5pY29ucyA9IHsgaW5ib3g6IEljb25JbmJveCwgdG9kYXk6IEljb25Ub2RheSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGljb25zLmljb25zID0geyBjaXJjbGU6IEljb25Qcm9qZWN0IH07XG4gICAgfVxuICAgIHJldHVybiBpY29ucztcbn0iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uL3V0aWxpdGllcy9pbXBvcnQtYWxsJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuLi9idXR0b25zJztcbmltcG9ydCBidWlsZFByb2plY3RGb3JtIGZyb20gJy4uL3Byb2plY3RzX2Zvcm0nO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgeyBidWlsZExpc3QgfSBmcm9tICcuLi9wcm9qZWN0c19saXN0JztcbmltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL3NpZGViYXIuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRTaWRlYmFyKGNvbnRlbnQpIHtcbiAgICBjb25zdCBzaWRlYmFyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNpZGViYXJXcmFwcGVyLmlkID0gJ3NpZGViYXInO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgIHNpZGViYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgc2lkZWJhci5vbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2lkZWJhcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIHNpZGViYXJXcmFwcGVyLmFwcGVuZENoaWxkKHNpZGViYXIucmVuZGVyKCkpO1xuICAgIHNpZGViYXIuY2FjaGVET00oc2lkZWJhcldyYXBwZXIpO1xuICAgIHRvdWNoQ29udHJvbGxlci5pbml0KCk7XG4gICAgc2lkZWJhci5iaW5kRXZlbnRzKCk7XG5cbiAgICAvLyBwdWJsaXNoZWQgaW4gaGVhZGVyLmpzXG4gICAgcHViU3ViLnN1YnNjcmliZSgndG9nZ2xlU2lkZWJhcicsIHNpZGViYXIudG9nZ2xlU2lkZWJhcik7XG4gICAgLy8gcHVibGlzaGVkIGluIHByb2plY3RzX2xpc3QuanMsIHByb2plY3RzX2Zvcm0uanMsIG1vZGFsX3JlbW92ZS5qc1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ2hpZGVTaWRlYmFyJywgc2lkZWJhci5oaWRlU2lkZWJhcik7XG4gICAgcmV0dXJuIHNpZGViYXJXcmFwcGVyO1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gICAgaWNvbnM6IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4uLy4uL2Fzc2V0cy9pY29ucycsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbn1cblxuY29uc3Qgc2lkZWJhciA9IHtcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2lkZWJhciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9IHRoaXMuc2lkZWJhci5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl93cmFwcGVyJyk7XG4gICAgICAgIHRoaXMucHJvamVjdHNDb250YWluZXIgPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignI3Byb2plY3RzX2NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmFuY2hvclByb2plY3RzID0gdGhpcy5wcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubmF2X3Byb2plY3RzJyk7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF9wcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyID0gdGhpcy50b2dnbGVTaWRlYmFyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2hvd1NpZGViYXIgPSB0aGlzLnNob3dTaWRlYmFyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZVNpZGViYXIgPSB0aGlzLmhpZGVTaWRlYmFyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHVibGlzaCA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNhbGxEaW1PdmVybGF5ID0gdGhpcy5jYWxsRGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFByb2plY3RGb3JtKTtcbiAgICAgICAgdGhpcy5hbmNob3JQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZVNpZGViYXIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxsRGltT3ZlcmxheSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoQ29udHJvbGxlci5zZXRUb3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaENvbnRyb2xsZXIuc2V0VG91Y2hFbmQsIGZhbHNlKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHNpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRNaXNjUHJvamVjdHMoKTtcbiAgICAgICAgY29uc3QgbmF2TWlzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidWlsZExpc3QuYWRkKCdtaXNjJywgbmF2TWlzYywgcHJvamVjdENvbnRyb2xsZXIubWlzYyk7XG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKGBtaXNjYCkuaW5pdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdHNBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgc2lkZWJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuaWQgPSAncHJvamVjdHNfY29udGFpbmVyJztcbiAgICAgICAgbmF2TWlzYy5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0c19taXNjX2NvbnRhaW5lcicpO1xuXG4gICAgICAgIHByb2plY3RzQW5jaG9yLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICAgICAgcHJvamVjdHNBbmNob3IuaHJlZiA9ICcjcHJvamVjdHMnO1xuICAgICAgICBwcm9qZWN0c0FuY2hvci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdHMnKVxuXG4gICAgICAgIGFuY2hvcldyYXBwZXIuYXBwZW5kQ2hpbGQocHJvamVjdHNBbmNob3IpO1xuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAncHJvamVjdCcpKTtcbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnc2lkZWJhcicsIHByb2plY3RzQ29udGFpbmVyLCBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyk7XG4gICAgICAgIGJ1aWxkTGlzdC5maW5kKGBzaWRlYmFyYCkuaW5pdCgpO1xuXG4gICAgICAgIHNpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQobmF2TWlzYyk7XG4gICAgICAgIHNpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdHNDb250YWluZXIpO1xuICAgICAgICByZXR1cm4gc2lkZWJhckNvbnRhaW5lcjtcbiAgICB9LFxuICAgIHRvZ2dsZVNpZGViYXI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMuc2lkZWJhcikge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlU2lkZWJhcigpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVTaWRlYmFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NpZGViYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGlkZVNpZGViYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbERpbU92ZXJsYXkoKTsgXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYW5pbWF0ZV9uYXYnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2hvd1NpZGViYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB0aGlzLmNhbGxEaW1PdmVybGF5KCk7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYW5pbWF0ZV9uYXYnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIHdoZW4gc2lkZWJhciBwcm9qZWN0cyBhbmNob3IgaXMgY2xpY2tlZFxuICAgICAgICAvLyBjaGFuZ2UgY29udGVudCB0byBwcm9qZWN0c1xuICAgICAgICAvLyBpZiB3aW5kb3cgd2lkdGggaXMgPCA3NjhweFxuICAgICAgICAgICAgLy9zaWRlYmFyIHdpbGwgY2xvc2UgXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlU2lkZWJhcigpO1xuICAgICAgICB9XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgZS5jdXJyZW50VGFyZ2V0KTtcbiAgICB9LFxuICAgIGNhbGxEaW1PdmVybGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2RpbScsIHRoaXMuc2lkZWJhcik7XG4gICAgfSxcbn1cblxuY29uc3QgdG91Y2hDb250cm9sbGVyID0ge1xuICAgIHRvdWNoU3RhcnRYOiBudWxsLFxuICAgIHRvdWNoRW5kWDogbnVsbCxcbiAgICB0b3VjaFN0YXJ0WTogbnVsbCxcbiAgICB0b3VjaEVuZFk6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3dpcGUgPSB0aGlzLnN3aXBlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0VG91Y2hTdGFydCA9IHRoaXMuc2V0VG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNldFRvdWNoRW5kID0gdGhpcy5zZXRUb3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgIH0sXG4gICAgc2V0VG91Y2hTdGFydDogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xuICAgIH0sXG4gICAgc2V0VG91Y2hFbmQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy50b3VjaEVuZFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XG4gICAgICAgIHRoaXMudG91Y2hFbmRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xuICAgICAgICB0aGlzLnN3aXBlKCk7XG4gICAgfSxcbiAgICBzd2lwZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoRW5kWCA8IHRoaXMudG91Y2hTdGFydFgpIHtcbiAgICAgICAgICAgIC8vIHN3aXBlIGxlZnRcbiAgICAgICAgICAgIHNpZGViYXIuaGlkZVNpZGViYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvdWNoRW5kWCA+IHRoaXMudG91Y2hTdGFydFgpIHtcbiAgICAgICAgICAgIC8vIHN3aXBlIHJpZ2h0XG4gICAgICAgICAgICBzaWRlYmFyLnNob3dTaWRlYmFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b3VjaEVuZFkgPCB0aGlzLnRvdWNoU3RhcnRZKSB7XG4gICAgICAgICAgICAvLyBzd2lwZSB1cFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG91Y2hFbmRZID4gdGhpcy50b3VjaFN0YXJ0WSkge1xuICAgICAgICAgICAgLy8gc3dpcGUgZG93blxuICAgICAgICB9XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBidWlsZFNlbGVjdE9wdGlvbnMgZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19vcHRpb25zJztcbmltcG9ydCAnLi4vc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzJ1xuaW1wb3J0IEljb25GbGFnIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9mbGFnLnN2Zyc7XG5pbXBvcnQgSWNvbkNoZXZyb25Eb3duIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnJztcbmltcG9ydCBJY29uQ2lyY2xlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnJztcbmltcG9ydCBJY29uSW5ib3ggZnJvbSAnLi4vYXNzZXRzL2ljb25zL2luYm94LnN2Zyc7XG5cbmNvbnN0IGJ1aWxkVGFza0Zvcm0gPSAodHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGZvcm0sXG4gICAgICAgIHR5cGUsXG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICBpZiAoYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuYnV0dG9uID0gYnV0dG9uO1xuICAgICAgICBzdGF0ZS5idXR0b25QYXJlbnQgPSBidXR0b25QYXJlbnQ7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBmb3JtVGFzayhzdGF0ZSksXG4gICAgICAgICAgICBub25Nb2RhbChzdGF0ZSksXG4gICAgICAgICAgICBmb3JtSW5wdXRzKHN0YXRlKSxcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRlLmRpYWxvZ0VsZW1lbnQgPSBkaWFsb2dFbGVtZW50O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgZm9ybVRhc2soc3RhdGUpLFxuICAgICAgICBtb2RhbChzdGF0ZSksXG4gICAgICAgIGZvcm1JbnB1dHMoc3RhdGUpLFxuICAgIClcbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkRm9ybSA9IHtcbiAgICBzZWN0aW9uczogW10sXG4gICAgYWRkOiBmdW5jdGlvbiAodHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgLy8gaWYgc2VjdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLCB1cGRhdGUgaXQncyBjb250YWluZXJcbiAgICAgICAgLy8gcHJldmVudHMgc2ltaWxhciBzZWN0aW9ucyB0byBiZSBhZGRlZFxuICAgICAgICBpZiAodGhpcy5maW5kKHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmQodHlwZSkuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlY3Rpb25zID0gWy4uLnRoaXMuc2VjdGlvbnMsIGJ1aWxkVGFza0Zvcm0odHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpXTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0aGlzLnNlY3Rpb25zLnNwbGljZSh0aGlzLnNlY3Rpb25zLmluZGV4T2YodGhpcy5maW5kKHR5cGUpKSwgMSk7XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25zLmZpbmQoc2VjdGlvbiA9PiBzZWN0aW9uLnR5cGUgPT09IHR5cGUpO1xuICAgIH1cbn1cblxuLy8gcmVuZGVycyBhIGZvcm0gdG8gY3JlYXRlIGEgdGFza1xuICAgIC8vIG9uZSBuZWVkcyB0byBiZSBhIGRpYWxvZyBlbGVtZW50XG4gICAgLy8gb25lIG5lZWRzIHRvIGJlIGEgbm9uLWRpYWxvZyBlbGVtZW50XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRhc2tzRm9ybShlKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGJ1dHRvblBhcmVudCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgaWYgKCFidXR0b24uaGFzQXR0cmlidXRlKCdyb2xlJykgJiYgYnV0dG9uUGFyZW50LnRhZ05hbWUgIT09ICdMSScpIHtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtJyk7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKTtcbiAgICAgICAgZGlhbG9nRWxlbWVudC5pZCA9ICdmb3JtX3Rhc2snO1xuICAgICAgICBidWlsZEZvcm0uYWRkKCdtb2RhbCcsIGZvcm0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBkaWFsb2dFbGVtZW50KTtcblxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1aWxkRm9ybS5maW5kKGBtb2RhbGApLnJlbmRlcigpKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuY2FjaGVET00oKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuYmluZEV2ZW50cygpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybV90YXNrJyk7XG4gICAgICAgIGUuY3VycmVudFRhcmdldC5yZXBsYWNlV2l0aChmb3JtKTtcbiAgICAgICAgYnVpbGRGb3JtLmFkZCgnZGVmYXVsdCcsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50KVxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkucmVuZGVyKCkpO1xuICAgICAgICBidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLmNhY2hlRE9NKCk7XG4gICAgICAgIGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkuYmluZEV2ZW50cygpO1xuICAgICAgICBmb3JtLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnfSk7XG4gICAgfVxufVxuXG5jb25zdCBmb3JtVGFzayA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIGZvcm06IHN0YXRlLmZvcm0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX2NhbmNlbCcpO1xuICAgICAgICB0aGlzLmJ0blN1Ym1pdCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF90YXNrJykgfHwgdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXBkYXRlX3Rhc2snKTtcbiAgICAgICAgdGhpcy5mb3JtSW5wdXRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrX2lucHV0Jyk7XG4gICAgICAgIHRoaXMuYnRuUHJpb3JpdHkgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI2J0bl9wcmlvcml0eScpO1xuICAgICAgICB0aGlzLmJ0blByb2plY3QgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI2J0bl9wcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtID0gdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0Rm9ybSk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUZvcm0pO1xuICAgICAgICB0aGlzLmJ0blByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRTZWxlY3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5idG5Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRTZWxlY3RPcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1bkJpbmRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGZvcm1CdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fYnV0dG9ucycpO1xuICAgICAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gdGhpcy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKCdmb3JtX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmhhc093blByb3BlcnR5KCdlbGVtZW50JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGxhYmVsLmh0bWxGb3IgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMuaWQ7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMucGxhY2Vob2xkZXI7XG5cbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uc2liaWxpbmcuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnV0dG9uLCB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCksIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmNoaWxkLmVsZW1lbnQpLCBpdGVtLmNoaWxkLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBidG4gaW4gdGhpcy5mb3JtQnV0dG9ucykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihidXR0b24sIHRoaXMuZm9ybUJ1dHRvbnNbYnRuXSk7XG4gICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYnRuO1xuXG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBmb3JtQnV0dG9ucy5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkuYWRkVGFzayh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Jlc2V0T2xkVGFzaycsIHRoaXMuYnV0dG9uKTtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQodGhpcy5saXN0SXRlbS5kYXRhc2V0LnV1aWRQcm9qKS51cGRhdGVUYXNrKHRoaXMubGlzdEl0ZW0uZGF0YXNldC51dWlkLCB0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5yZXBsYWNlV2l0aCh0aGlzLmJ1dHRvbik7XG4gICAgICAgICAgICBidWlsZEZvcm0ucmVtb3ZlKHRoaXMudHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Jlc2V0T2xkVGFzaycpO1xuICAgIH0sXG4gICAgcmVzZXRGb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gcmVzZXRzIGFsbCBmb3JtIGlucHV0cywgdHlwZT1cImhpZGRlblwiIGluY2x1ZGVkXG4gICAgICAgIC8vIHJlc2V0cyBwcmlvcml0eS9wcm9qZWN0IGJ1dHRvbiBjb250ZW50XG4gICAgICAgIGZvciAobGV0IGZvcm1DaGlsZCBpbiB0aGlzLmZvcm1DaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgZm9ybUlucHV0ID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBmb3JtSW5wdXQuYXR0cmlidXRlcztcbiAgICAgICAgICAgIFsuLi50aGlzLmZvcm1JbnB1dHNdLmZpbmQoaW5wdXQgPT4gaW5wdXQuaWQgPT09IGF0dHJpYnV0ZXMuaWQpLnZhbHVlID0gYXR0cmlidXRlcy52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IFsuLi50aGlzLmZvcm1JbnB1dHNdLmZpbmQoaW5wdXQgPT5cbiAgICAgICAgICAgICAgICAgICAgZm9ybUlucHV0LnNpYmlsaW5nLmF0dHJpYnV0ZXMuaWQgPT09IGlucHV0LmlkICYmIGlucHV0LnRhZ05hbWUgPT09ICdCVVRUT04nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3SWNvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBidG5TVkcgPSBlbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZFxuICAgICAgICAgICAgICAgIGlmIChidG5TVkcuY2xhc3NOYW1lLmJhc2VWYWwgIT09ICcnICYmIGJ0blNWRy5zcmMgIT09IGZvcm1JbnB1dC5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLnNyYykge1xuICAgICAgICAgICAgICAgICAgICBuZXdJY29uID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgICAgICAgICAgbmV3SWNvbi5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SWNvbi5zcmMgPSBmb3JtSW5wdXQuc2liaWxpbmcuY2hpbGRyZW5bMF0uY2hpbGQuYXR0cmlidXRlcy5zcmM7XG4gICAgICAgICAgICAgICAgICAgIGJ0blNWRy5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChuZXdJY29uLCBidG5TVkcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBuZWVkIHJlcGxhY2UgcHJvamVjdCBpZiB0aGUgY3VycmVudCBpY29uIGRvZXMgbm90IG1hdGNoIGRlZmF1bHQgaWNvblxuICAgICAgICAgICAgICAgIG5ld0ljb24uY2xhc3NOYW1lID0gZm9ybUlucHV0LnNpYmlsaW5nLmNoaWxkcmVuWzBdLmNoaWxkLmF0dHJpYnV0ZXMuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gZm9ybUlucHV0LnNpYmlsaW5nLmNoaWxkcmVuWzFdLmF0dHJpYnV0ZXMudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY29uc3Qgbm9uTW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gICAgYnV0dG9uOiBzdGF0ZS5idXR0b24sXG4gICAgcGFyZW50QnV0dG9uOiBzdGF0ZS5idXR0b25QYXJlbnQsXG59KTtcblxuY29uc3QgbW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gICAgZGlhbG9nRWxlbWVudDogc3RhdGUuZGlhbG9nRWxlbWVudCxcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ2Zvcm1fdGFzaycpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgYnVpbGRGb3JtLnJlbW92ZSh0aGlzLnR5cGUpO1xuICAgIH0sXG59KTtcblxuY29uc3QgZm9ybUlucHV0cyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRhc2tJdGVtID0gc3RhdGUuYnV0dG9uID8gc3RhdGUuYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy50YXNrX2xpc3RfaXRlbScpIDogbnVsbDtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGFza0l0ZW0gPyBwcm9qZWN0Q29udHJvbGxlci5maW5kKHRhc2tJdGVtLmRhdGFzZXQudXVpZFByb2opIDogbnVsbDtcbiAgICBjb25zdCB0YXNrID0gdGFza0l0ZW0/IHByb2plY3QuZmluZFRhc2sodGFza0l0ZW0uZGF0YXNldC51dWlkKSA6IG51bGw7XG4gICAgXG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIGlucHV0cy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzID0gaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAvLyBmaW5kcyB0YXNrJ3Mga2V5IGVxdWFsIHRvIGlucHV0J3MgaWRcbiAgICAgICAgICAgIGxldCBrZXkgPSBPYmplY3Qua2V5cyh0YXNrKS5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gYXR0cmlidXRlcy5pZCk7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgIT09ICdkdWVEYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB7IHZhbHVlOiB0YXNrW2tleV0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0geyB2YWx1ZTogbmV3IERhdGUodGFza1trZXldKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgPT09ICdwcmlvcml0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLmNsYXNzTmFtZSA9IGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmNoaWxkcmVuWzFdLmF0dHJpYnV0ZXMudGV4dENvbnRlbnQgPSBgUCR7dGFzay5wcmlvcml0eX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXRzID0ge1xuICAgICAgICBmb3JtQ2hpbGRyZW46IHtcbiAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1Rhc2sgbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdEZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHVlRGF0ZToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2R1ZV9kYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0R1ZSBEYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkdWVUaW1lOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZHVlX3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGltZScsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVGltZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW9yaXR5OiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAncHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpYmlsaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2J0bl9wcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ltZ193cmFwcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZDogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW1nJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25GbGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdwcmlvcml0eV80JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogJ1A0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW1nX3dyYXBwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25DaGV2cm9uRG93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY2hldnJvbl9kb3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3Byb2plY3QnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJvamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIudG9kYXlbMF0udXVpZCA/IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpYmlsaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2J0bl9wcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdQcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpbWdfd3JhcHBlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIudG9kYXlbMF0udXVpZCB8fCBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZCA/IEljb25JbmJveCA6IEljb25DaXJjbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQgfHwgcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgPyAncHJvamVjdF9pbmJveCc6ICdwcm9qZWN0X2NpcmNsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19wcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQgPyBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS50aXRsZSA6IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW1nX3dyYXBwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25DaGV2cm9uRG93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY2hldnJvbl9kb3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybUJ1dHRvbnM6IHtcbiAgICAgICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBidXR0b24gY2xpY2tlZCBoYXMgJ3JvbGUnIGF0dHJpYnV0ZVxuICAgICAgICAvLyBhc3NpZ24gZm9ybUNoaWxkcmVuIHdpdGggYSBzYXZlLWJ1dHRvblxuICAgICAgICAvLyBhc3NpZ24gZm9ybVRhc2sgd2l0aCBhIGNvbnRlbnQgcHJvcGVydHkvaW5pdCBmdW5jdGlvblxuICAgIC8vIG90aGVyd2lzZSwgXG4gICAgICAgIC8vIGFzc2lnbiBmb3JtQ2hpbGRyZW4gd2l0aCBvbmx5IGEgYWRkLWJ1dHRvblxuICAgIGlmIChzdGF0ZS5idXR0b24gJiYgc3RhdGUuYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgICAgIGNvbnN0IGlucHV0c0VkaXQgPSB7XG4gICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBzYXZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl91cGRhdGVfdGFzaycsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcDoge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtOiBzdGF0ZS5idXR0b24uZmlyc3RDaGlsZCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMuZm9ybUJ1dHRvbnMsIGlucHV0c0VkaXQuYnV0dG9uKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMsIGlucHV0c0VkaXQucHJvcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5wdXRzQWRkID0ge1xuICAgICAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF90YXNrJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0cy5mb3JtQnV0dG9ucywgaW5wdXRzQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0cztcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkTW9kYWxSZW1vdmUgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbF9yZW1vdmUnO1xuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfZm9ybSc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy90YXNrc19saXN0LmNzcyc7XG5cbmV4cG9ydCBjb25zdCB0YXNrc0xpc3QgPSB7XG4gICAgcmVtb3ZlU2VsZWN0aW9uOiBudWxsLFxuICAgIGJ0bkRlbGV0ZVRhc2s6IFtdLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzZXRPbGRUYXNrID0gdGhpcy5yZXNldE9sZFRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2snLCB0aGlzLnJlbmRlcik7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZVRhc2snLCB0aGlzLnJlbmRlcik7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc2V0T2xkVGFzaycsIHRoaXMucmVzZXRPbGRUYXNrKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgncmVtb3ZlVGFzaycsIHRoaXMucmVtb3ZlVGFzayk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKVxuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLnByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRhc2spXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgIH0sXG4gICAgb2xkVGFzazogbnVsbCxcbiAgICBwcm9qZWN0OiBudWxsLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gdGhpcy5saXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVkaXRUYXNrID0gdGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBsZXRlVGFzayA9IHRoaXMuY29tcGxldGVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIGFyZ3MuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCdkZWxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVUYXNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jb21wbGV0ZVRhc2spXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzIHdpbGwgbmVlZCB0byBnZW5lcmF0ZSBhIGZvcm1cbiAgICAgICAgICAgIC8vIHJlbW92ZXMgdGhlIGJ1dHRvblxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbih0YXNrKSB7XG4gICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrQ2hlY2tib3ggPSBidWlsZEJ1dHRvbignY2hlY2tib3gnLCAndGFzaycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0YXNrQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICBsaXN0SXRlbVdyYXBwZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnLCB0YXNrLnV1aWRUYXNrKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkLXByb2onLCB0YXNrLnV1aWRQcm9qKTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICAgICAgdGFza0NvbnRlbnQuY2xhc3NMaXN0LmFkZCgndGFza19saXN0X2l0ZW1fY29udGVudCcpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgndGFza19saXN0X2l0ZW0nKTtcbiAgICAgICAgICAgIHRhc2tBY3Rpb25zLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfYWN0aW9ucycpO1xuICAgICAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFza19uYW1lJyk7XG4gICAgICAgICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcblxuICAgICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFza19wcmlvcml0eScpO1xuICAgICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHkgJHt0YXNrLnByaW9yaXR5fWA7XG5cbiAgICAgICAgICAgIHRhc2tDaGVja2JveC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YClcblxuICAgICAgICAgICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NoZWNrYm94KTtcbiAgICAgICAgICAgIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFza19kZXNjcmlwdGlvbicpO1xuICAgICAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhc2suZHVlX2RhdGUgIT09IHVuZGVmaW5lZCB8fCB0YXNrLmR1ZV90aW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZVRpbWVUZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShgJHt0YXNrLmR1ZV9kYXRlfVQwMDowMDowMGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShgMS0yLTEwMDAgJHt0YXNrLmR1ZV90aW1lfWApXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVByb3BlcnRpZXMgPSB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suZHVlX2RhdGUgJiYgIXRhc2suZHVlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0YXNrLmR1ZV9kYXRlICYmIHRhc2suZHVlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gdGltZS50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB0aW1lUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gYCR7ZGF0ZS50b0RhdGVTdHJpbmcoKX0gJHt0aW1lLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRlVGltZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgndGFza19kdWVfZGF0ZV90aW1lJylcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZUJ1dHRvbiA9IGJ1aWxkQnV0dG9uKCdkYXRlJywgJ3Rhc2snLCBkYXRlVGltZVRleHQpXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVXcmFwcGVyLmFwcGVuZENoaWxkKGRhdGVUaW1lQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZChkYXRlVGltZVdyYXBwZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBidXR0b25EZWxldGUgPSBidWlsZEJ1dHRvbignZGVsZXRlJywgJ3Rhc2snKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkVkaXQgPSBidWlsZEJ1dHRvbignZWRpdCcsICd0YXNrJyk7XG4gICAgICAgICAgICB0YXNrQWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25EZWxldGUpO1xuICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uRWRpdCk7XG5cbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDb250ZW50KTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tBY3Rpb25zKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RJdGVtQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgbGlzdEl0ZW1XcmFwcGVyLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cyhidXR0b25EZWxldGUsIHRhc2tDaGVja2JveCwgbGlzdEl0ZW1XcmFwcGVyKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9sZFRhc2spIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmRzIG5ldyB0YXNrXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfbmV3Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQW5pbWF0aW9uKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFwcGVuZHMgdXBkYXRlZCB0YXNrXG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrLnJlcGxhY2VXaXRoKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcGxldGVUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgfSxcbiAgICByZW1vdmVUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhIG1vZGFsIHRvIGNvbmZpcm0gcmVtb3ZhbFxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICAgICAgICBsZXQgdXVpZFRhc2sgPSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQ7XG4gICAgICAgICAgICBidWlsZE1vZGFsUmVtb3ZlKHRoaXMucHJvamVjdC5maW5kVGFzayh1dWlkVGFzaykpOyAgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdmVTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdC5yZW1vdmVUYXNrKHRoaXMucmVtb3ZlU2VsZWN0aW9uLmRhdGFzZXQudXVpZCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbi5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWRpdFRhc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5vbGRUYXNrID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBidWlsZFRhc2tzRm9ybShlKTtcbiAgICB9LFxuICAgIHJlc2V0T2xkVGFzazogZnVuY3Rpb24ob2xkVGFzaykge1xuICAgICAgICBpZiAodGhpcy5vbGRUYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm9sZFRhc2sgPSBudWxsXG4gICAgICAgIH0gZWxzZSBpZiAob2xkVGFzaykge1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gb2xkVGFzaztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RvcEFuaW1hdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9LCBcIjIwMFwiKVxuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBJY29uRmxhZyBmcm9tICcuLi9hc3NldHMvaWNvbnMvZmxhZy5zdmcnO1xuaW1wb3J0IEljb25DaGVjayBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2hlY2tfc21hbGwuc3ZnJztcbmltcG9ydCBJY29uUHJvamVjdCBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Zyc7XG5pbXBvcnQgSWNvbkluYm94IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9pbmJveC5zdmcnO1xuaW1wb3J0ICcuLi9zdHlsZXMvdGFza3Nfb3B0aW9ucy5jc3MnO1xuXG5jb25zdCBidWlsZE9wdGlvbnMgPSAodHlwZSwgYnV0dG9uLCBkaWFsb2cpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGJ1dHRvbixcbiAgICAgICAgZGlhbG9nLFxuICAgICAgICBpY29uOiBJY29uRmxhZyxcbiAgICAgICAgZm9ybUl0ZW06IGJ1dHRvbi5wYXJlbnRFbGVtZW50LFxuICAgICAgICBidG5JY29uOiBidXR0b24ucXVlcnlTZWxlY3RvcignLmltZ193cmFwcGVyJykuZmlyc3RDaGlsZCxcbiAgICAgICAgYnRuU2VsZWN0VGV4dDogYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoYC50YXNrXyR7dHlwZX1gKSxcbiAgICB9XG5cbiAgICBpZiAodHlwZSAhPT0gJ3ByaW9yaXR5Jykge1xuICAgICAgICBzdGF0ZS5pY29uID0gSWNvblByb2plY3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBvcHRpb25zKHN0YXRlKSxcbiAgICApXG59XG5cbi8vIGNyZWF0ZXMgYSBtb2RhbCBmb3IgcHJpb3JpdHkgb3B0aW9uc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRTZWxlY3RPcHRpb25zKGUpIHtcbiAgICBjb25zdCBpZCA9IGUuY3VycmVudFRhcmdldC5pZC5zbGljZShlLmN1cnJlbnRUYXJnZXQuaWQuaW5kZXhPZignXycpICsgMSk7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGNvbnN0IHN0YXRlID0gYnVpbGRPcHRpb25zKGlkLCBlLmN1cnJlbnRUYXJnZXQsIGRpYWxvZ0VsZW1lbnQpO1xuICAgIHN0YXRlLmluaXQoKTtcbiAgICBkaWFsb2dFbGVtZW50LmlkID0gYHRhc2tfc2VsZWN0XyR7aWR9X29wdGlvbnNgO1xuICAgIGRpYWxvZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoc3RhdGUucmVuZGVyKCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgc3RhdGUuY2FjaGVET00oKTtcbiAgICBzdGF0ZS5iaW5kRXZlbnRzKCk7XG4gICAgZGlhbG9nRWxlbWVudC5zaG93TW9kYWwoKTtcbn1cblxuY29uc3Qgb3B0aW9ucyA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZyxcbiAgICBjdXJyZW50U2VsZWN0aW9uOiBudWxsLFxuICAgIGJ0blNlbGVjdDogc3RhdGUuYnV0dG9uLFxuICAgIGJ0blNlbGVjdFRleHQ6IHN0YXRlLmJ0blNlbGVjdFRleHQsXG4gICAgYnRuSWNvbjogc3RhdGUuYnRuSWNvbixcbiAgICBvcHRpb25JY29uOiBzdGF0ZS5pY29uLFxuICAgIGZvcm1JdGVtOiBzdGF0ZS5mb3JtSXRlbSxcbiAgICBtZWRpYTogd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDc2OHB4KScpLFxuICAgIG9ic2VydmVyOiBudWxsLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy50eXBlfWApO1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3B0aW9uJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gdGhpcy5zZWxlY3QuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2VsZWN0KSlcbiAgICAgICAgdGhpcy5jYWxsQmFjayA9IHRoaXMuY2FsbEJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLmNhbGxCYWNrKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZm9ybUl0ZW0pO1xuXG4gICAgICAgIHRoaXMubWVkaWEuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9KVxuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBvcHRpb25zTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG9wdGlvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICBsZXQgcHJvamVjdHMgPSBudWxsO1xuXG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICBwcm9qZWN0cyA9IHByb2plY3RDb250cm9sbGVyLmluYm94LmNvbmNhdChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cylcbiAgICAgICAgICAgIGxlbmd0aCA9IHByb2plY3RzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwcm9qZWN0JyAmJiBwcm9qZWN0c1tpXS50aXRsZSA9PT0gJ0luYm94Jykge1xuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IEljb25JbmJveDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RfY2lyY2xlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMub3B0aW9uSWNvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nX3dyYXBwZXInKTtcbiAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdvcHRpb24nKVxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgICAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXIpO1xuICAgICAgICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpbWFnZS5jbGFzc0xpc3QuYWRkKGAke3Byb2plY3RzW2ldLnRpdGxlfWApXG4gICAgICAgICAgICAgICAgb3B0aW9uLmRhdGFzZXQudmFsdWUgPSBwcm9qZWN0c1tpXS51dWlkO1xuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBwcm9qZWN0c1tpXS50aXRsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChgcHJpb3JpdHlfJHtpfWApO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kYXRhc2V0LnZhbHVlID0gaTtcbiAgICAgICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYFByaW9yaXR5ICR7aX1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHByb2plY3RzICYmIHByb2plY3RzW2ldLnV1aWQgPT09IHRoaXMuY3VycmVudFNlbGVjdGlvbikgfHwgKCFwcm9qZWN0cyAmJiBpID09PSBwYXJzZUludCh0aGlzLmN1cnJlbnRTZWxlY3Rpb24pKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKGBzZWxlY3RlZGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZ0NoZWNrID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgaW1nQ2hlY2suc3JjID0gSWNvbkNoZWNrO1xuICAgICAgICAgICAgICAgIGltZ0NoZWNrLmNsYXNzTGlzdC5hZGQoJ29wdGlvbl9zZWxlY3RlZF9jaGVja21hcmsnKTtcbiAgICAgICAgICAgICAgICBpbWdDaGVjay5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uYXBwZW5kQ2hpbGQoaW1nQ2hlY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9uc0xpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKG9wdGlvbnNMaXN0KTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNXcmFwcGVyO1xuICAgIH0sXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0RJQUxPRycpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuYnRuU2VsZWN0KTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnRuU2VsZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RDb250cm9sbGVyLmZpbmQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUpLnRpdGxlO1xuICAgICAgICAgICAgY29uc3QgbmV3SWNvbiA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBuZXdJY29uLnNyYyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlICE9PSBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS51dWlkID8gSWNvblByb2plY3QgOiBJY29uSW5ib3g7XG4gICAgICAgICAgICBuZXdJY29uLmNsYXNzTGlzdC5hZGQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUgIT09IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgPyAncHJvamVjdF9jaXJjbGUnIDogJ3Byb2plY3RfaW5ib3gnKTtcbiAgICAgICAgICAgIG5ld0ljb24uc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgICAgICAgICBpZiAobmV3SWNvbi5zcmMgIT09IHRoaXMuYnRuSWNvbi5kYXRhc2V0LmluamVjdFVybCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBuZXcgaWNvbiBzcmMgYW5kIHRoZSBjdXJyZW50IGljb24gc3JjIGFyZSBub3QgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBub2RlXG4gICAgICAgICAgICAgICAgdGhpcy5idG5JY29uLnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0ljb24sIHRoaXMuYnRuSWNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5idG5TZWxlY3RUZXh0LnRleHRDb250ZW50ID0gYFAke3RoaXMuaW5wdXQudmFsdWV9YDtcbiAgICAgICAgICAgIHRoaXMuYnRuSWNvbi5jbGFzc05hbWUuYmFzZVZhbCA9IGBwcmlvcml0eV8ke3RoaXMuaW5wdXQudmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfSxcbiAgICBjYWxsQmFjazogZnVuY3Rpb24oZW50cmllcykge1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoZW50cnkuY29udGVudEJveFNpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuY29udGVudEJveFNpemVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmRzID0gZW50cnkudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUud2lkdGggPSBib3VuZHMud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZGlhbG9nRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBib3VuZHMuYm90dG9tKSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRpYWxvZydzIGhlaWdodCBhbmQgZm9ybSBpdGVtJ3MgYm90dG9tIGlzIGdyZWF0ZXIgdGhhbiB3aW5kb3cgaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2JvdW5kcy54fXB4LCAke2JvdW5kcy50b3AgLSB0aGlzLmRpYWxvZ0VsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2JvdW5kcy54fXB4LCAke2JvdW5kcy5ib3R0b219cHgpYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59KSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4vcHVic3ViJztcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4uL3N0b3JhZ2Uvc3RvcmFnZSc7XG5cbmNvbnN0IGdldEZvcm1WYWx1ZXMgPSAoaW5wdXRzKSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge31cbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7IFxuICAgICAgICBpZiAoaW5wdXQuaWQgPT09ICdwcmlvcml0eScpIHtcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBwYXJzZUludChpbnB1dC52YWx1ZS5zbGljZShpbnB1dC52YWx1ZS5sZW5ndGggLSAxLCBpbnB1dC52YWx1ZS5sZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5pZCA9PT0gJ2R1ZV9kYXRlJyAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPT09IDAgJiYgWy4uLmlucHV0c10uZmluZChpdGVtID0+IGl0ZW0uaWQgPT09ICdkdWVfdGltZScpLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgdGltZSBoYXMgYSB2YWx1ZSBhbmQgZGF0ZSBoYXMgbm8gdmFsdWVcbiAgICAgICAgICAgICAgICAvLyBkYXRlIHNldCB0byB0b2RheSdzIGRhdGVcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBpbnB1dC52YWx1ZVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuY29uc3QgYnVpbGRQcm9qZWN0ID0gKHRhc2tzKSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICB0YXNrcyxcbiAgICAgICAgdXVpZDogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIHByb2plY3Qoc3RhdGUpLFxuICAgIClcbn1cblxuLy8gY3JlYXRlcyBhIHByb2plY3Qgb2JqZWN0XG4gICAgLy8gdGFza3MgcHJvcGVydHkgY3JlYXRlZCB1cG9uIG9iamVjdCBjcmVhdGlvblxuY29uc3QgcHJvamVjdCA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgYWN0aXZlOiBmYWxzZSwgLy8gdGhlcmUgY2FuIG9ubHkgYmUgb25lIHByb2plY3QgYWN0aXZlXG4gICAgdXVpZDogc3RhdGUudXVpZCxcbiAgICB0YXNrczogc3RhdGUudGFza3MgfHwgW10sXG4gICAgYWRkVGFzazogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gYWxsb3cgdXNlciB0byBwaWNrIHdoYXQgcHJvamVjdCB0byBhc3NpZ24gdGhlIG5ld2x5L2VkaXRlZCB0YXNrXG4gICAgICAgICAgICAvLyBwdXNoZXMgdGFzayB0byByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGdldEZvcm1WYWx1ZXMoaW5wdXRzKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IE9iamVjdC5hc3NpZ24odGFzayh0aGlzLnV1aWQpLCBmb3JtVmFsdWVzKTtcblxuICAgICAgICBpZiAoZm9ybVZhbHVlcy5wcm9qZWN0ICYmIGZvcm1WYWx1ZXMucHJvamVjdCAhPT0gbmV3VGFzay51dWlkUHJvaikge1xuICAgICAgICAgICAgbmV3VGFzay51dWlkUHJvaiA9IGZvcm1WYWx1ZXMucHJvamVjdDtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQoZm9ybVZhbHVlcy5wcm9qZWN0KS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGAke25ld1Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYWRkVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgIH0sXG4gICAgcmVtb3ZlVGFzazogZnVuY3Rpb24odXVpZCkge1xuICAgICAgICAvLyBpZiB0aGUgcmVtb3ZlIHRhc2sgaXMgaW4gdG9kYXlcbiAgICAgICAgICAgIC8vIHJlbW92ZSBpdCBmcm9tIHRvZGF5IEFORCBpdCdzIHJlc3BlY3RpdmUgcHJvamVjdFxuICAgICAgICAvLyBpZiB0aGUgdGFzaydzIGRhdGUgaW4gdG9kYXkgaXMgZWRpdGVkIFxuICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IGZyb20gb25seSB0b2RheVxuICAgICAgICBjb25zdCB0YXNrID0gdGhpcy5maW5kVGFzayh1dWlkKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50YXNrcy5pbmRleE9mKHRhc2spLCAxKTtcbiAgICAgICAgLy8gcmVtb3ZlcyB0YXNrIGluIHJlc3BlY3RpdmUgcHJvamVjdFxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLnV1aWRUYXNrID09PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGFza3Muc3BsaWNlKHByb2plY3QudGFza3MuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWxsUHJvamVjdHMoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVRhc2s6IGZ1bmN0aW9uKHV1aWQsIGlucHV0cykge1xuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gT2JqZWN0LmFzc2lnbih0aGlzLmZpbmRUYXNrKHV1aWQpLCBmb3JtVmFsdWVzKTtcbiAgICAgICAgLy8gaWYgdGhlIHByb2plY3QgaXMgY2hhbmdlIGZvciBhIHRhc2tcbiAgICAgICAgaWYgKGZvcm1WYWx1ZXMucHJvamVjdCAmJiBmb3JtVmFsdWVzLnByb2plY3QgIT09IG5ld1Rhc2sudXVpZFByb2opIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFzayhuZXdUYXNrLnV1aWRUYXNrKTtcbiAgICAgICAgICAgIG5ld1Rhc2sudXVpZFByb2ogPSBmb3JtVmFsdWVzLnByb2plY3Q7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kKGZvcm1WYWx1ZXMucHJvamVjdCkudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJyk7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnRpdGxlID09PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudGl0bGUgPT09ICdUb2RheScpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYCR7bmV3VGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLnNldEFsbFByb2plY3RzKCk7XG4gICAgfSxcbiAgICBmaW5kVGFzazogZnVuY3Rpb24odXVpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC51dWlkVGFzayA9PT0gdXVpZCk7XG4gICAgfSxcbn0pXG5cblxuZXhwb3J0IGNvbnN0IHByb2plY3RDb250cm9sbGVyID0ge1xuICAgIGluYm94OiBbT2JqZWN0LmFzc2lnbihidWlsZFByb2plY3QoKSwge3RpdGxlOiAnSW5ib3gnLH0pXSwgLy8gd2lsbCBob2xkIHRhc2tzIGFzc2lnbmVkIHRvIHRoZSAnaW5ib3gnXG4gICAgdG9kYXk6IFtPYmplY3QuYXNzaWduKGJ1aWxkUHJvamVjdCgpLCB7dGl0bGU6ICdUb2RheSd9KV0sXG4gICAgbWlzYzogbnVsbCxcbiAgICBwcm9qZWN0czogbnVsbCxcbiAgICBhbGxQcm9qZWN0czogW10sXG4gICAgYWRkUHJvamVjdDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKGlucHV0cyk7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBidWlsZFByb2plY3QoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKE9iamVjdC5hc3NpZ24obmV3UHJvamVjdCwgZm9ybVZhbHVlcykpO1xuICAgICAgICB0aGlzLnNldEFsbFByb2plY3RzKClcbiAgICAgICAgdGhpcy5zZXRBY3RpdmUobmV3UHJvamVjdC51dWlkKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24odXVpZCkge1xuICAgICAgICBpZiAodXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UodGhpcy5wcm9qZWN0cy5pbmRleE9mKHRoaXMuZmluZCh1dWlkKSksIDEpO1xuICAgICAgICB0aGlzLnNldEFsbFByb2plY3RzKClcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsUHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QudXVpZCA9PT0gdXVpZCk7XG4gICAgfSxcbiAgICBzZXRBY3RpdmU6IGZ1bmN0aW9uKHV1aWQpIHtcbiAgICAgICAgaWYgKHRoaXMuZmluZEFjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmRBY3RpdmUoKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dWlkKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmQodXVpZCkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghdXVpZCAmJiB0eXBlb2YgdXVpZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aGlzLmluYm94LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZpbmRBY3RpdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxsUHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuYWN0aXZlID09PSB0cnVlKSkge1xuICAgICAgICAgICAgdGhpcy5pbmJveFswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5ib3g7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbGxQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5hY3RpdmUgPT09IHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXRBbGxQcm9qZWN0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYWxsUHJvamVjdHMgPSB0aGlzLmluYm94LmNvbmNhdCh0aGlzLnByb2plY3RzLCB0aGlzLnRvZGF5KTtcbiAgICAgICAgdGhpcy5zb3J0KClcbiAgICAgICAgcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICBzZXRNaXNjUHJvamVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm1pc2MgPSB0aGlzLmluYm94LmNvbmNhdCh0aGlzLnRvZGF5KVxuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgdGhpcy5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2plY3QudGFza3MubGVuZ3RoID4gMCAmJiBwcm9qZWN0LnRpdGxlICE9PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFza0RhdGUgPSBuZXcgRGF0ZShgJHt0YXNrLmR1ZV9kYXRlfVQwMDowMDowMGApLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudG9kYXlbMF0uZmluZFRhc2sodGFzay51dWlkVGFzaykgJiYgdGFza0RhdGUgPT0gdG9kYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9kYXlbMF0udGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvYmosIGJ1aWxkUHJvamVjdChvYmoudGFza3MpKTtcbiAgICAgICAgICAgIG9iai50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIHRhc2sudXVpZFByb2ogPSBvYmoudXVpZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuaW5ib3hbMF0sIGJ1aWxkUHJvamVjdCh0aGlzLmluYm94WzBdLnRhc2tzKSk7XG4gICAgICAgIHRoaXMuaW5ib3hbMF0udGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRhc2sudXVpZFByb2ogPSB0aGlzLmluYm94WzBdLnV1aWQ7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2V0QWxsUHJvamVjdHMoKTtcbiAgICB9XG59XG5cbmNvbnN0IHRhc2sgPSAodXVpZCkgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAndGFzayc7XG4gICAgY29uc3QgdXVpZFRhc2sgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICAgIGNvbnN0IHV1aWRQcm9qID0gdXVpZDtcbiAgICByZXR1cm4geyB1dWlkVGFzaywgdXVpZFByb2osIHR5cGUgfTtcbn0iLCJleHBvcnQgY29uc3QgcHViU3ViID0ge1xuICAgIHN1YnNjcmliZXJzOiB7fSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHN1YnNjcmliZXIsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gPSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdIHx8IFtdO1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLnB1c2goaGFuZGxlcik7XG4gICAgfSxcbiAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oc3Vic2NyaWJlciwgIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdW2ldID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHN1YnNjcmliZXIsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5cbi8vIGdldHMgaXRlbXMgZnJvbSBsb2NhbFN0b3JhZ2VcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9qZWN0cygpIHtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgOiBbXTtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5pbmJveCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmJveCcpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSkgOiBwcm9qZWN0Q29udHJvbGxlci5pbmJveDtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5pbml0KCk7XG59XG5cbi8vIHNldHMgaXRlbXMgaW4gbG9jYWxTdG9yYWdlXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luYm94JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIuaW5ib3gpKTtcbn0iLCIvLyByZXR1cm5zIGFuIG9iamVjdCBhbmQgYXJyYXkgb2YgZmlsZSB0eXBlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcbiAgICBsZXQgZmlsZXMgPSB7fTtcbiAgICBsZXQgZmlsZXNBcnIgPSBbXTtcbiAgICByLmtleXMoKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGZpbGVzW2l0ZW0ucmVwbGFjZSgnLi8nLCAnJyldID0gcihpdGVtKTtcbiAgICAgICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGZpbGVzLCBmaWxlc0FyciB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9