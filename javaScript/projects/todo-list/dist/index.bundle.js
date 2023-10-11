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
/* harmony import */ var _iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @iconfu/svg-inject */ "./node_modules/@iconfu/svg-inject/dist/svg-inject.js");
/* harmony import */ var _iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_iconfu_svg_inject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header */ "./src/components/header.js");
/* harmony import */ var _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sidebar/sidebar */ "./src/components/sidebar/sidebar.js");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/main */ "./src/components/main.js");
/* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage/storage */ "./src/storage/storage.js");
/* harmony import */ var _components_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/overlay */ "./src/components/overlay.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.css */ "./src/app.css");






// SVGInject
// https://www.npmjs.com/package/@iconfu/svg-inject



(() => {
  const build = {
    header: _components_header__WEBPACK_IMPORTED_MODULE_1__["default"],
    sidebar: _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"],
    overlay: _components_overlay__WEBPACK_IMPORTED_MODULE_5__["default"],
    main: _components_main__WEBPACK_IMPORTED_MODULE_3__["default"],
  };

  const app = {
    init() {
      (0,_storage_storage__WEBPACK_IMPORTED_MODULE_4__.setProjects)();
      this.render();
    },
    render() {
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
  };

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

const buttonAttributes = (type, name) => {
  const button = {
    // className: btn_delete_project
    className: `btn_${type}_${name}`,
    type: "button",
  };
  return button;
};

function buildButton(type, name, text) {
  const button = Object.assign(
    document.createElement("button"),
    buttonAttributes(type, name)
  );
  const image = new Image();
  image.src = icons[type];
  image.setAttribute("onload", "SVGInject(this)");

  if (text) {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("btn_img_wrapper");
    imageWrapper.appendChild(image);
    const span = document.createElement("span");
    span.textContent = text;
    button.appendChild(imageWrapper);
    button.appendChild(span);
  } else if (type === "checkbox") {
    const checkboxBorder = document.createElement("span");
    checkboxBorder.classList.add("checkbox_circle");
    checkboxBorder.appendChild(image);
    button.appendChild(checkboxBorder);
  } else {
    button.appendChild(image);
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
  const headerElement = document.createElement("header");
  headerElement.appendChild(header.render());
  header.cacheDOM(headerElement);
  header.bindEvents();
  return headerElement;
}

const assets = {
  icons: (0,_utilities_import_all__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync recursive \\.svg$")),
};

const header = {
  cacheDOM(container) {
    this.btnMenu = container.querySelector(".btn_menu");
    this.btnHome = container.querySelector(".btn_home");
    this.btnAddTask = container.querySelector(".btn_add_task");
    this.inputSearch = container.querySelector(".input_search");
  },
  bindEvents() {
    this.publish = this.publish.bind(this);
    this.animateNav = this.animateNav.bind(this);
    this.btnMenu.addEventListener("click", this.publish);
    this.btnHome.addEventListener("click", this.publish);
    this.btnAddTask.addEventListener("click", _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    this.inputSearch.addEventListener("search", this.search);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe("animate_nav", this.animateNav); //testing
  },
  headerContent: {
    headerLeft: [
      {
        element: "button",
        attributes: {
          className: "btn_menu",
        },
        childElement: "img",
        src: assets.icons.files["menu.svg"],
      },
      {
        element: "button",
        attributes: {
          className: "btn_home today",
        },
        childElement: "img",
        src: assets.icons.files["home.svg"],
      },
      {
        element: "input",
        attributes: {
          className: "input_search",
          type: "search",
        },
        placeholder: "Search",
      },
    ],
    headerRight: [
      {
        element: "button",
        attributes: {
          className: "btn_add_task",
        },
        childElement: "img",
        src: assets.icons.files["add.svg"],
      },
      {
        element: "a",
        attributes: {
          className: "github",
          href: "https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list",
          target: "_blank",
        },
        childElement: "img",
        src: assets.icons.files["github-mark/github-mark-white.svg"],
      },
    ],
  },
  render() {
    const headerElement = document.createElement("nav");
    headerElement.id = "navbar";

    for (let section in this.headerContent) {
      const headerWrapper = document.createElement("div");
      const headerContainer = document.createElement("div");
      let wrapperClass;
      section === "headerLeft"
        ? (wrapperClass = "nav_left")
        : (wrapperClass = "nav_right");
      headerWrapper.classList.add(wrapperClass);
      headerContainer.classList.add("container");

      this.headerContent[section].forEach((item) => {
        const headerItem = document.createElement(item.element);
        Object.assign(headerItem, item.attributes);
        if ("placeholder" in item) {
          headerItem.setAttribute("placeholder", item.placeholder);
        } else {
          const itemIcon = document.createElement(item.childElement);
          itemIcon.src = item.src;
          itemIcon.setAttribute("onload", "SVGInject(this)");
          headerItem.appendChild(itemIcon);
        }
        headerContainer.appendChild(headerItem);
        headerWrapper.appendChild(headerContainer);
      });
      headerElement.appendChild(headerWrapper);
    }
    return headerElement;
  },
  publish(e) {
    const btn = e.currentTarget;
    const className = e ? e.currentTarget.className : null;
    let subscriber;
    if (className && className.includes("home")) {
      subscriber = "content";
    } else {
      subscriber = "toggleSidebar";
    }
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__["default"].publish(subscriber, e.currentTarget);
  },
  search() {
    window.open("https://www.youtube.com/watch?v=UVA7MDQr1Nc", "_blank");
  },
  animateNav(e) {
    if (e) {
    } else {
      if (this.btnMenu.classList.contains("rotate")) {
        this.btnMenu.classList.remove("rotate");
      } else {
        this.btnMenu.classList.add("rotate");
      }
    }
  },
};


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
  const main = document.createElement("main");
  main.id = "main_content";
  mainContent.cacheDOM(main);
  mainContent.render();
  mainContent.bindEvents();

  _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__["default"].subscribe("content", mainContent.switchContent);
  _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__["default"].subscribe("updateTabs", mainContent.updateTabs);
  return main;
}

const build = {
  projects: _components_projects__WEBPACK_IMPORTED_MODULE_0__["default"],
  project: _components_project_tasks__WEBPACK_IMPORTED_MODULE_1__["default"],
};

const mainContent = {
  activeContent: null,
  activeTab: null,
  navTabs: {
    getAllAnchors() {
      return this.static.concat(this.dynamic);
    },
  },
  init() {
    window.onload = () => {
      this.navTabs.static = [
        document.querySelector(`a[href='#inbox']`),
        document.querySelector(`a[href='#today']`),
        document.querySelector(`.nav_projects`),
      ];

      this.navTabs.dynamic = [..._projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find("sidebar").projectsListAnchors];
      this.setActiveTab(this.navTabs.static[1]);
    };
  },
  updateTabs(anchors) {
    // updates navTabs.dynamic
    this.navTabs.dynamic = [...anchors];
  },
  cacheDOM(container) {
    this.main = container;
    this.mainOverlay = container.querySelector(".overlay_main_content");
  },
  render(key, uuid) {
    let content;
    if (!key) {
      content = build["project"](_containers_project_controller__WEBPACK_IMPORTED_MODULE_2__["default"].today[0].uuid);
    } else {
      this.main.lastChild.remove();
      content = build[key](uuid);
    }

    if (document.readyState === "complete") {
      this.setActiveTab(content);
    }

    this.setActiveContent(content);
    this.main.appendChild(content);
  },
  bindEvents() {
    this.updateTabs = this.updateTabs.bind(this);
    this.switchContent = this.switchContent.bind(this);
  },
  switchContent(e) {
    let renderKey = "project";
    let uuid = null;
    if (e instanceof HTMLElement) {
      if (e.className.includes("today")) {
        // if home button is clicked
        // renders the today section
        uuid = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__["default"].today[0].uuid;
      } else if (e.dataset.inboxUuid) {
        // if a project is the content and is deleted
        // renders the inbox section
        uuid = e.dataset.inboxUuid;
      } else if (e.parentElement.dataset.uuid) {
        // renders respective project
        uuid = e.parentElement.dataset.uuid;
      } else {
        // renders projects section
        renderKey = "projects";
      }
    } else if (e.uuid) {
      // new project created
      uuid = e.uuid;
    } else {
      uuid = _containers_project_controller__WEBPACK_IMPORTED_MODULE_2__["default"].inbox[0].uuid;
    }
    this.render(renderKey, uuid);
  },
  setActiveTab(tab) {
    this.activeTab ? this.activeTab.classList.remove("active") : null;
    if (tab.firstChild.tagName !== "H1") {
      this.activeTab = tab;
    } else {
      this.activeTab = this.navTabs
        .getAllAnchors()
        .find((anchor) =>
          anchor.href
            .split("#")[1]
            .includes(tab.firstChild.textContent.toLowerCase())
        );
    }
    this.activeTab.classList.add("active");
  },
  setActiveContent(content) {
    if (this.activeContent) {
      this.activeContent.classList.remove("active");
    }
    content.classList.add("active");
    this.activeContent = content;
  },
};


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
  const dialogElement = document.createElement("dialog");
  const form = document.createElement("form");

  dialogElement.id = "modal";
  form.classList.add("form_removal");

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
  };

  return Object.assign({}, modal(state));
};

const modal = (state) => ({
  dialogElement: state.dialogElement,
  form: state.form,
  type: state.type,
  selection: state.obj,
  buttons: [
    {
      element: "button",
      text: "Cancel",
      attributes: {
        className: "btn_cancel",
        type: "button",
      },
    },
    {
      element: "button",
      text: "Delete",
      attributes: {
        className: "btn_submit_remove",
        type: "submit",
      },
    },
  ],
  cacheDOM() {
    this.btnCancel = this.form.querySelector(".btn_cancel");
    this.btnDelete = this.form.querySelector(".btn_submit_remove");
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.form.addEventListener("submit", this.submitForm);
    this.btnCancel.addEventListener("click", this.closeForm);
    this.dialogElement.addEventListener("click", this.closeModal);
  },
  render() {
    const container = document.createElement("div");
    const header = document.createElement("h4");
    const message = document.createElement("p");
    const itemForRemoval = document.createElement("strong");

    itemForRemoval.classList.add("item_for_removal");
    header.textContent = "Delete?";
    itemForRemoval.textContent = this.selection.title
      ? this.selection.title
      : this.selection.name;
    const messageBeginTextNode = document.createTextNode(
      `Are you sure you want to delete `
    );
    const messageEndTextNode = document.createTextNode(`?`);

    message.appendChild(messageBeginTextNode);
    message.appendChild(itemForRemoval);
    message.appendChild(messageEndTextNode);
    container.appendChild(header);
    container.appendChild(message);

    const formButtons = document.createElement("div");
    formButtons.classList.add("form_buttons");
    this.buttons.forEach((item) => {
      const button = Object.assign(
        document.createElement(item.element),
        item.attributes
      );
      button.textContent = item.text;
      formButtons.appendChild(button);
    });
    container.appendChild(formButtons);

    return container;
  },
  submitForm(e) {
    e.preventDefault();
    if (this.type === "task") {
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("removeTask", this.selection.uuidTask);
    } else {
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("removeProject", this.selection.uuid);
      if (window.innerWidth < 768) {
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("hideSidebar");
      }
    }
    this.closeForm();
  },
  closeForm(e) {
    this.dialogElement.close();
    this.removeModal();
  },
  closeModal(e) {
    if (e.target.id === "modal") {
      this.dialogElement.close();
      this.removeModal();
    }
  },
  removeModal() {
    this.dialogElement.remove();
  },
});


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
  cacheDOM(container) {
    this.overlay = container;
  },
  render() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay_main_content");
    this.cacheDOM(overlay);
    this.bindEvents();

    return overlay;
  },
  bindEvents() {
    this.dimOverlay = this.dimOverlay.bind(this);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("dim", overlay.dimOverlay);
  },
  dimOverlay(e) {
    if (e.classList.contains("hide") || window.innerWidth > 768) {
      this.overlay.classList.remove("dim");
    } else if (!e.classList.contains("hide")) {
      this.overlay.classList.add("dim");
    }
  },
};


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
  _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].setActive(uuid);
  const project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].find(uuid);
  projectTasks.project = project;
  const content = projectTasks.render();
  projectTasks.cacheDOM(content);
  projectTasks.bindEvents();
  return content;
}

const projectTasks = {
  project: null,
  cacheDOM(container) {
    this.projectTasksContainer = container;
    this.ulList = this.projectTasksContainer.querySelector(".tasks_list");
    this.listContainer = this.ulList.firstChild;
    this.btnAddTask = this.ulList.querySelector(".btn_add_task");
  },
  bindEvents() {
    this.btnAddTask.addEventListener("click", _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  render() {
    const projectsContainer = document.createElement("div");
    const header = document.createElement("h1");
    const list = document.createElement("ul");
    const listItem = document.createElement("li");

    projectsContainer.classList.add("task");
    list.classList.add("tasks_list");
    header.textContent = this.project.title;

    projectsContainer.appendChild(header);
    listItem.appendChild(_components_tasks_list__WEBPACK_IMPORTED_MODULE_3__["default"].init());
    listItem.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])("add", "task", "Add task"));
    list.appendChild(listItem);

    projectsContainer.appendChild(list);
    return projectsContainer;
  },
};


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
  _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__["default"].setActive();
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects");
  const header = document.createElement("h1");

  header.textContent = "Projects";

  projectsContainer.appendChild(header);
  projectsContainer.appendChild(projects.render());
  projects.cacheDOM(projectsContainer);
  projects.bindEvents();

  return projectsContainer;
}

const projects = {
  cacheDOM(container) {
    this.btnAddProject = container.querySelector(".btn_add_project");
  },
  bindEvents() {
    this.btnAddProject.addEventListener("click", _components_projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  render() {
    const parentContainer = document.createElement("div");
    const anchorWrapper = document.createElement("div");
    anchorWrapper.classList.add("nav_projects");

    anchorWrapper.appendChild((0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])("add", "project", "Add project"));
    parentContainer.appendChild(anchorWrapper);

    _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.add("content", parentContainer, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__["default"].projects);
    _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.find("content").clearCache();
    _components_projects_list__WEBPACK_IMPORTED_MODULE_0__.buildList.find("content").init();
    return parentContainer;
  },
};


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
  const dialogElement = document.createElement("dialog");
  dialogElement.id = "form_project";
  dialogElement.appendChild(formProject.render());
  document.body.appendChild(dialogElement);
  dialogElement.showModal();
  formProject.cacheDOM();
  formProject.bindEvents();
}

const formProject = {
  formChildren: {
    name: {
      id: "title",
      className: "project_input",
      name: "title",
      type: "text",
      placeholder: "Enter Project Title",
      required: "required",
    },
  },
  formButtons: {
    cancel: {
      className: "btn_cancel",
      type: "button",
    },
    add: {
      className: "btn_submit_project",
      type: "submit",
    },
  },
  cacheDOM() {
    this.dialogElement = document.querySelector("#form_project");
    this.btnCancel = document.querySelector(".btn_cancel");
    this.btnSubmit = document.querySelector(".btn_submit_project");
    this.form = document.querySelector("#form");
    this.formInputs = document.querySelectorAll("#form input");
  },
  bindEvents() {
    this.closeModal = this.closeModal.bind(this);
    this.removeModal = this.removeModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.dialogElement.addEventListener("click", this.closeModal);
    this.btnCancel.addEventListener("click", this.removeModal);
    this.form.addEventListener("submit", this.submitForm);
  },
  // take a look at restaurant project's contact module
  render() {
    const formElement = document.createElement("form");
    const formHeader = document.createElement("h2");
    const formButtons = document.createElement("div");
    formButtons.classList.add("form_buttons");
    formElement.id = "form";
    formHeader.textContent = "Add Project";
    formElement.appendChild(formHeader);

    for (let formChild in this.formChildren) {
      const formItem = document.createElement("div");
      formItem.classList.add("form_item");
      if (this.formChildren[formChild].hasOwnProperty("required")) {
        const label = document.createElement("label");
        const input = Object.assign(
          document.createElement("input"),
          this.formChildren[formChild]
        );
        label.textContent = formChild;
        label.htmlFor = this.formChildren[formChild].id;
        formItem.appendChild(label);
        formItem.appendChild(input);
      }
      formElement.appendChild(formItem);
    }

    for (let btn in this.formButtons) {
      const button = document.createElement("button");
      const span = document.createElement("span");
      Object.assign(button, this.formButtons[btn]);
      span.textContent = btn;

      button.appendChild(span);
      formButtons.appendChild(button);
    }
    formElement.appendChild(formButtons);

    return formElement;
  },
  closeModal(e) {
    if (e.target.tagName === "DIALOG") {
      this.removeModal();
    }
  },
  removeModal() {
    this.dialogElement.remove();
  },
  submitForm(e) {
    e.preventDefault();
    // optional, form validation
    // if form is valid
    // then addProject()
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(this.formInputs);
    _components_projects_list__WEBPACK_IMPORTED_MODULE_1__.buildList.find("sidebar").render(); // will render only the sidebar
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].publish("content", _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].findActive());
    if (window.innerWidth < 768) {
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_2__["default"].publish("hideSidebar");
    }
    this.removeModal();
  },
};


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










const BuildProjectsList = (type, container, array) => {
  let state = {
    container,
    type,
    array,
  };

  return Object.assign({}, projectsList(state), setIcons(state));
};

const buildList = {
  modules: [],
  add(type, container, array) {
    // need to check if the module exists already
    // if module exists, then update it's container
    // prevents similar modules to be added
    if (this.modules.some((module) => module.type === type)) {
      this.find(type).container = container;
    } else {
      this.modules = [
        ...this.modules,
        BuildProjectsList(type, container, array),
      ];
    }
  },
  find(type) {
    return this.modules.find((module) => module.type === type);
  },
};

const projectsList = (state) => ({
  removeSelection: null,
  array: state.array,
  type: state.type,
  container: state.container,
  init() {
    const projectsContainer = document.createElement("div");
    const list = document.createElement("ul");

    projectsContainer.classList.add("projects");
    list.classList.add("projects_list");
    list.appendChild(this.render());
    this.cacheDOM(list);
    this.bindEvents();
    this.container.appendChild(list);
  },
  cacheDOM(container) {
    this.ulList = container;
    this.listContainer = this.ulList.firstChild;
    this.projectsListItems = this.ulList.querySelectorAll("li");
    this.projectsListAnchors = this.ulList.querySelectorAll("li a");
    this.btnDeleteProject = this.ulList.querySelectorAll(".btn_delete_project");
    if (this.type === "sidebar") {
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__["default"].publish("updateTabs", this.projectsListAnchors);
    }
  },
  bindEvents() {
    this.removeProject = this.removeProject.bind(this);
    this.publish = this.publish.bind(this);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__["default"].subscribe("removeProject", this.removeProject);
    this.btnDeleteProject.forEach((button) => {
      button.addEventListener("click", this.removeProject);
    });

    this.projectsListAnchors.forEach((project) => {
      project.addEventListener("click", this.publish);
    });
  },
  render() {
    const listItems = document.createElement("div");
    for (let i = 0; i < this.array.length; i++) {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      const anchorSpan = document.createElement("span");
      const anchorImg = new Image();
      anchorImg.setAttribute("onload", "SVGInject(this)");
      anchorSpan.textContent = this.array[i].title;
      anchor.href = `#${this.array[i].title.toLowerCase()}`;

      listItem.setAttribute("data-uuid", this.array[i].uuid);
      anchor.classList.add("nav_project");
      const buttonSpan = document.createElement("span");

      if (
        Object.keys(this.icons).find(
          (a) => a === this.array[i].title.toLowerCase()
        )
      ) {
        anchorImg.src =
          this.icons[
            Object.keys(this.icons).find(
              (a) => a === this.array[i].title.toLowerCase()
            )
          ];
      } else {
        anchorImg.src = this.icons["circle"];
      }

      anchor.appendChild(anchorImg);
      anchor.appendChild(anchorSpan);
      listItem.appendChild(anchor);

      if (state.type !== "misc") {
        const deleteButton = (0,_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])("delete", "project");
        deleteButton.setAttribute(
          "data-inbox-uuid",
          _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox[0].uuid
        );
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
  removeProject(e) {
    if (e instanceof MouseEvent) {
      const listItem = e.currentTarget.parentElement.parentElement;
      // sets removeSelection for 'sidebar' and 'content' modules
      buildList.modules.forEach((module) => {
        if (module.type !== "misc") {
          module.removeSelection = [...module.projectsListItems].find(
            (item) => item.dataset.uuid === listItem.dataset.uuid
          );
        }
      });

      const projectUUID = listItem.dataset.uuid;
      (0,_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].find(projectUUID));
    } else {
      _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].remove(e);
      // removes and resets removeSelection for 'sidebar' and 'content' modules
      buildList.modules.forEach((module) => {
        if (module.type !== "misc" && module.removeSelection) {
          module.removeSelection.remove();
          module.removeSelection = null;
        }
      });
    }
  },
  publish(e) {
    e.preventDefault();

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__["default"].publish("content", e.currentTarget);
    if (
      (this.type === "sidebar" || this.type === "misc") &&
      window.innerWidth < 768
    ) {
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__["default"].publish("hideSidebar");
    }
  },
  clearCache() {
    this.ulList = null;
    this.listContainer = null;
    this.projectsListItems = null;
    this.projectsListAnchors = null;
    this.btnDeleteProject = null;
  },
});

const setIcons = (state) => {
  let icons = {};

  if (state.type === "misc") {
    icons.icons = { inbox: _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__, today: _assets_icons_today_svg__WEBPACK_IMPORTED_MODULE_5__ };
  } else {
    icons.icons = { circle: _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__ };
  }
  return icons;
};


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
  const sidebarWrapper = document.createElement("div");
  sidebarWrapper.id = "sidebar";

  if (window.innerWidth > 768) {
    sidebarWrapper.classList.add("show");
    sidebar.on = true;
  } else {
    sidebarWrapper.classList.add("hide");
  }

  sidebarWrapper.appendChild(sidebar.render());
  sidebar.cacheDOM(sidebarWrapper);
  touchController.init();
  sidebar.bindEvents();

  // published in header.js
  _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__["default"].subscribe("toggleSidebar", sidebar.toggleSidebar);
  // published in projects_list.js, projects_form.js, modal_remove.js
  _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__["default"].subscribe("hideSidebar", sidebar.hideSidebar);
  return sidebarWrapper;
}

const assets = {
  icons: (0,_utilities_import_all__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__("./src/assets/icons sync \\.svg$")),
};

const sidebar = {
  cacheDOM(container) {
    this.sidebar = container;
    this.sidebarWrapper = this.sidebar.querySelector(".sidebar_wrapper");
    this.projectsContainer = this.sidebar.querySelector("#projects_container");
    this.anchorProjects = this.projectsContainer.querySelector(".nav_projects");
    this.btnAddProject = container.querySelector(".btn_add_project");
  },
  bindEvents() {
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.publish = this.publish.bind(this);
    this.callDimOverlay = this.callDimOverlay.bind(this);
    this.btnAddProject.addEventListener("click", _projects_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
    this.anchorProjects.addEventListener("click", this.publish, {
      capture: true,
    });
    this.sidebar.addEventListener("click", this.toggleSidebar);
    window.addEventListener("resize", this.callDimOverlay);
    document.body.addEventListener(
      "touchstart",
      touchController.setTouchStart,
      false
    );
    document.body.addEventListener(
      "touchend",
      touchController.setTouchEnd,
      false
    );
  },
  render() {
    const sidebarContainer = document.createElement("div");

    _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__["default"].setMiscProjects();
    const navMisc = document.createElement("div");
    _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.add("misc", navMisc, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__["default"].misc);
    _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find(`misc`).init();

    const projectsContainer = document.createElement("div");
    const anchorWrapper = document.createElement("div");
    const projectsAnchor = document.createElement("a");

    sidebarContainer.classList.add("container");
    projectsContainer.id = "projects_container";
    navMisc.classList.add("projects_misc_container");

    projectsAnchor.textContent = "Projects";
    projectsAnchor.href = "#projects";
    projectsAnchor.classList.add("nav_projects");

    anchorWrapper.appendChild(projectsAnchor);
    anchorWrapper.appendChild((0,_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])("add", "project"));
    projectsContainer.appendChild(anchorWrapper);

    _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.add("sidebar", projectsContainer, _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__["default"].projects);
    _projects_list__WEBPACK_IMPORTED_MODULE_4__.buildList.find(`sidebar`).init();

    sidebarContainer.appendChild(navMisc);
    sidebarContainer.appendChild(projectsContainer);
    return sidebarContainer;
  },
  toggleSidebar(e) {
    if (e instanceof MouseEvent) {
      if (e.target === this.sidebar) {
        this.toggleSidebar();
      }
    } else {
      if (this.sidebar.classList.contains("show")) {
        this.hideSidebar();
      } else {
        this.showSidebar();
      }
    }
  },
  hideSidebar() {
    if (this.sidebar.classList.contains("show")) {
      this.sidebar.classList.remove("show");
      this.sidebar.classList.add("hide");
      this.callDimOverlay();
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__["default"].publish("animate_nav");
    }
  },
  showSidebar() {
    if (!this.sidebar.classList.contains("show")) {
      this.sidebar.classList.remove("hide");
      this.sidebar.classList.add("show");
      this.callDimOverlay();
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__["default"].publish("animate_nav");
    }
  },
  publish(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    // when sidebar projects anchor is clicked
    // change content to projects
    // if window width is < 768px
    //sidebar will close
    if (window.innerWidth < 768) {
      this.hideSidebar();
    }
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__["default"].publish("content", e.currentTarget);
  },
  callDimOverlay: function () {
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__["default"].publish("dim", this.sidebar);
  },
};

const touchController = {
  touchStartX: null,
  touchEndX: null,
  touchStartY: null,
  touchEndY: null,
  init() {
    this.swipe = this.swipe.bind(this);
    this.setTouchStart = this.setTouchStart.bind(this);
    this.setTouchEnd = this.setTouchEnd.bind(this);
  },
  setTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  },
  setTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;
    this.swipe();
  },
  swipe() {
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
};


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
  const state = {
    form,
    type,
  };

  if (type === 'default') {
    if (button.hasAttribute('role')) {
    }
    state.button = button;
    state.buttonParent = buttonParent;
    return Object.assign(
      {},
      formTask(state),
      nonModal(state),
      formInputs(state)
    );
  }

  state.dialogElement = dialogElement;
  return Object.assign({}, formTask(state), modal(state), formInputs(state));
};

const buildForm = {
  sections: [],
  add(type, form, button, buttonParent, dialogElement) {
    // if section type already exists, update it's container
    // prevents similar sections to be added
    if (this.find(type)) {
      this.find(type).closeForm();
      this.remove(type);
    }
    this.sections = [
      ...this.sections,
      buildTaskForm(type, form, button, buttonParent, dialogElement),
    ];
  },
  remove(type) {
    this.sections.splice(this.sections.indexOf(this.find(type)), 1);
  },
  find(type) {
    return this.sections.find((section) => section.type === type);
  },
};

// renders a form to create a task
// one needs to be a dialog element
// one needs to be a non-dialog element
function buildTasksForm(e) {
  const button = e.currentTarget;
  const buttonParent = button.parentElement;
  const form = document.createElement("form");
  if (!button.hasAttribute("role") && buttonParent.tagName !== "LI") {
    form.classList.add("form");
    const dialogElement = document.createElement("dialog");
    dialogElement.id = "form_task";
    buildForm.add("modal", form, undefined, undefined, dialogElement);

    form.appendChild(buildForm.find(`modal`).render());
    buildForm.find(`modal`).cacheDOM();
    buildForm.find(`modal`).bindEvents();
    dialogElement.appendChild(form);
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
  } else {
    form.classList.add("form_task");
    e.currentTarget.replaceWith(form);
    buildForm.add("default", form, button, buttonParent);
    form.appendChild(buildForm.find(`default`).render());
    buildForm.find(`default`).cacheDOM();
    buildForm.find(`default`).bindEvents();
    form.scrollIntoView({ behavior: "smooth" });
  }
}

const formTask = (state) => ({
  type: state.type,
  form: state.form,
  cacheDOM() {
    this.btnCancel = this.form.querySelector(".btn_cancel");
    this.btnSubmit =
      this.form.querySelector(".btn_submit_task") ||
      this.form.querySelector(".btn_update_task");
    this.formInputs = this.form.querySelectorAll(".task_input");
    this.btnPriority = this.form.querySelector("#btn_priority");
    this.btnProject = this.form.querySelector("#btn_project");
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.form.addEventListener("submit", this.submitForm);
    this.btnCancel.addEventListener("click", this.closeForm);
    this.btnPriority.addEventListener("click", _components_tasks_options__WEBPACK_IMPORTED_MODULE_2__["default"]);
    this.btnProject.addEventListener("click", _components_tasks_options__WEBPACK_IMPORTED_MODULE_2__["default"]);
    if (this.dialogElement) {
      this.closeModal = this.closeModal.bind(this);
      this.dialogElement.addEventListener("click", this.closeModal);
    }
  },
  unBindEvent() {
    this.form.removeEventListener("submit", this.submitForm);
  },
  render() {
    const container = document.createElement("div");
    const formButtons = document.createElement("div");
    formButtons.classList.add("form_buttons");
    for (let formChild in this.formChildren) {
      const formItem = document.createElement("div");
      formItem.classList.add("form_item");
      if (this.formChildren[formChild].hasOwnProperty("element")) {
        const label = document.createElement("label");
        const item = Object.assign(
          document.createElement(this.formChildren[formChild].element),
          this.formChildren[formChild].attributes
        );

        label.htmlFor = this.formChildren[formChild].attributes.id;
        label.textContent = this.formChildren[formChild].attributes.placeholder;

        formItem.appendChild(label);
        formItem.appendChild(item);

        if (this.formChildren[formChild].sibiling) {
          const button = document.createElement(
            this.formChildren[formChild].sibiling.element
          );
          Object.assign(
            button,
            this.formChildren[formChild].sibiling.attributes
          );
          this.formChildren[formChild].sibiling.children.forEach((item) => {
            const element = Object.assign(
              document.createElement(item.element),
              item.attributes
            );
            if (item.child) {
              const childElement = Object.assign(
                document.createElement(item.child.element),
                item.child.attributes
              );
              childElement.setAttribute("onload", "SVGInject(this)");
              element.appendChild(childElement);
            }
            button.appendChild(element);
          });
          formItem.appendChild(button);
        }
      }
      container.appendChild(formItem);
    }

    for (let btn in this.formButtons) {
      const button = document.createElement("button");
      const span = document.createElement("span");
      Object.assign(button, this.formButtons[btn]);
      span.textContent = btn;

      button.appendChild(span);
      formButtons.appendChild(button);
    }

    container.appendChild(formButtons);

    return container;
  },
  submitForm(e) {
    e.preventDefault();
    if (!this.listItem) {
      _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().addTask(this.formInputs);
      if (this.dialogElement) {
        this.closeForm();
      } else {
        this.resetForm();
      }
    } else {
      this.closeForm();
      _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("resetOldTask", this.button);
      _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"]
        .find(this.listItem.dataset.uuidProj)
        .updateTask(this.listItem.dataset.uuid, this.formInputs);
    }
  },
  closeForm(e) {
    if (!this.dialogElement) {
      this.form.replaceWith(this.button);
      buildForm.remove(this.type);
    } else {
      this.removeModal();
    }
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("resetOldTask");
  },
  resetForm() {
    // resets all form inputs, type="hidden" included
    // resets priority/project button content
    for (let formChild in this.formChildren) {
      const formInput = this.formChildren[formChild];
      const attributes = formInput.attributes;
      [...this.formInputs].find((input) => input.id === attributes.id).value =
        attributes.value;
      if (this.formChildren[formChild].sibiling) {
        const element = [...this.formInputs].find(
          (input) =>
            formInput.sibiling.attributes.id === input.id &&
            input.tagName === "BUTTON"
        );
        let newIcon;
        const btnSVG = element.firstChild.firstChild;
        if (
          btnSVG.className.baseVal !== "" &&
          btnSVG.src !== formInput.sibiling.children[0].child.attributes.src
        ) {
          newIcon = new Image();
          newIcon.setAttribute("onload", "SVGInject(this)");
          newIcon.src = formInput.sibiling.children[0].child.attributes.src;
          btnSVG.parentElement.replaceChild(newIcon, btnSVG);
        }
        // need replace project if the current icon does not match default icon
        newIcon.className =
          formInput.sibiling.children[0].child.attributes.className;
        element.querySelector("span").textContent =
          formInput.sibiling.children[1].attributes.textContent;
      }
    }
  },
});

const nonModal = (state) => ({
  button: state.button,
  parentButton: state.buttonParent,
});

const modal = (state) => ({
  dialogElement: state.dialogElement,
  closeModal(e) {
    if (e.target.id === "form_task") {
      this.dialogElement.close();
      this.removeModal();
    }
  },
  removeModal() {
    this.dialogElement.remove();
    buildForm.remove(this.type);
  },
});

const formInputs = (state) => {
  const taskItem = state.button
    ? state.button.querySelector(".task_list_item")
    : null;
  const project = taskItem
    ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].find(taskItem.dataset.uuidProj)
    : null;
  const task = taskItem ? project.findTask(taskItem.dataset.uuid) : null;

  const init = () => {
    for (let formChild in inputs.formChildren) {
      let attributes = inputs.formChildren[formChild].attributes;
      // finds task's key equal to input's id
      let key = Object.keys(task).find((item) => item === attributes.id);
      if (attributes && key) {
        if (!inputs.formChildren[formChild].sibiling) {
          let value;
          if (formChild !== "dueDate") {
            value = { value: task[key] };
          } else {
            value = { value: new Date(task[key]).toISOString().split("T")[0] };
          }
          Object.assign(attributes, value);
        } else {
          if (formChild === "priority") {
            inputs.formChildren[
              formChild
            ].sibiling.children[0].child.attributes.className = `priority_${task.priority}`;
            inputs.formChildren[
              formChild
            ].sibiling.children[1].attributes.textContent = `P${task.priority}`;
            inputs.formChildren[formChild].attributes.value = task.priority;
          }
        }
      }
    }
  };

  const inputs = {
    formChildren: {
      name: {
        element: "input",
        attributes: {
          id: "name",
          className: "task_input",
          name: "name",
          type: "text",
          placeholder: "Task name",
          required: "required",
          value: "",
        },
      },
      description: {
        element: "textarea",
        attributes: {
          id: "description",
          className: "task_input",
          name: "description",
          placeholder: "Description",
          value: "",
        },
      },
      dueDate: {
        element: "input",
        attributes: {
          id: "due_date",
          className: "task_input",
          name: "date",
          type: "date",
          placeholder: "Due Date",
          value: "",
        },
      },
      dueTime: {
        element: "input",
        attributes: {
          id: "due_time",
          className: "task_input",
          name: "time",
          type: "time",
          placeholder: "Time",
          value: "",
        },
      },
      priority: {
        element: "input",
        attributes: {
          id: "priority",
          className: "task_input",
          name: "priority",
          type: "hidden",
          placeholder: "Priority",
          value: 4,
        },
        sibiling: {
          element: "button",
          attributes: {
            id: "btn_priority",
            className: "task_input",
            placeholder: "Priority",
            type: "button",
          },
          children: [
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src: _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_4__,
                  className: "priority_4",
                },
              },
            },
            {
              element: "span",
              attributes: {
                className: "task_priority",
                textContent: "P4",
              },
            },
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src: _assets_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__,
                  className: "chevron_down",
                },
              },
            },
          ],
        },
      },
      project: {
        element: "input",
        attributes: {
          id: "project",
          className: "task_input",
          name: "priority",
          type: "hidden",
          placeholder: "Project",
          value:
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid ===
            _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].today[0].uuid
              ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].inbox[0].uuid
              : _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid,
        },
        sibiling: {
          element: "button",
          attributes: {
            id: "btn_project",
            className: "task_input",
            placeholder: "Project",
            type: "button",
          },
          children: [
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src:
                    _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid ===
                      _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].today[0].uuid ||
                    _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid ===
                      _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].inbox[0].uuid
                      ? _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_7__
                      : _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_6__,
                  className:
                    _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid ===
                      _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].today[0].uuid ||
                    _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid ===
                      _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].inbox[0].uuid
                      ? "project_inbox"
                      : "project_circle",
                },
              },
            },
            {
              element: "span",
              attributes: {
                className: "task_project",
                textContent:
                  _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().uuid ===
                  _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].today[0].uuid
                    ? _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].inbox[0].title
                    : _containers_project_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findActive().title,
              },
            },
            {
              element: "div",
              attributes: {
                className: "img_wrapper",
              },
              child: {
                element: "img",
                attributes: {
                  src: _assets_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__,
                  className: "chevron_down",
                },
              },
            },
          ],
        },
      },
    },
    formButtons: {
      cancel: {
        className: "btn_cancel",
        type: "button",
      },
    },
  };

  // if the button clicked has 'role' attribute
  // assign formChildren with a save-button
  // assign formTask with a content property/init function
  // otherwise,
  // assign formChildren with only a add-button
  if (state.button && state.button.hasAttribute("role")) {
    const inputsEdit = {
      button: {
        save: {
          className: "btn_update_task",
          type: "submit",
        },
      },
      prop: {
        listItem: state.button.firstChild,
      },
    };

    init();
    Object.assign(inputs.formButtons, inputsEdit.button);
    Object.assign(inputs, inputsEdit.prop);
  } else {
    const inputsAdd = {
      add: {
        className: "btn_submit_task",
        type: "submit",
      },
    };

    Object.assign(inputs.formButtons, inputsAdd);
  }
  return inputs;
};


/***/ }),

/***/ "./src/components/tasks_list.js":
/*!**************************************!*\
  !*** ./src/components/tasks_list.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
  init() {
    this.render = this.render.bind(this);
    this.resetOldTask = this.resetOldTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__["default"].subscribe('addTask', this.render);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__["default"].subscribe('updateTask', this.render);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__["default"].subscribe('resetOldTask', this.resetOldTask);
    _containers_pubsub__WEBPACK_IMPORTED_MODULE_4__["default"].subscribe('removeTask', this.removeTask);
    this.project = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].findActive();
    this.listContainer = this.render();
    this.project.tasks.forEach((task) => {
      this.render(task);
    });
    return this.listContainer;
  },
  oldTask: null,
  project: null,
  cacheDOM() {
    this.listContainer = this.listContainer;
    this.projectsListItems = this.listContainer.querySelectorAll('li');
  },
  bindEvents(...args) {
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    args.forEach((element) => {
      if (element.getAttribute('type')) {
        if (element.className.includes('delete')) {
          element.addEventListener('click', this.removeTask, true);
        } else {
          element.addEventListener('click', this.completeTask);
        }
      } else {
        element.addEventListener('click', this.editTask);
      }
    });
    // this will need to generate a form
    // removes the button
  },
  render(task) {
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

      taskCheckbox.firstElementChild.classList.add(`priority_${task.priority}`);

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
        const time = new Date(`1-2-1000 ${task.due_time}`);
        const timeProperties = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        if (task.due_date && !task.due_time) {
          dateTimeText = date.toDateString();
        } else if (!task.due_date && task.due_time) {
          dateTimeText = time.toLocaleString('en-us', timeProperties);
        } else {
          dateTimeText = `${date.toDateString()} ${time.toLocaleString(
            'en-us',
            timeProperties
          )}`;
        }
        dateTimeWrapper.classList.add('task_due_date_time');
        const dateTimeButton = (0,_components_buttons__WEBPACK_IMPORTED_MODULE_1__["default"])('date', 'task', dateTimeText);
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
  completeTask(e) {
    e.stopImmediatePropagation();
    const listItem = e.currentTarget.parentElement.parentElement;
    this.removeSelection = listItem;
    this.removeTask();
  },
  removeTask(e) {
    // create a modal to confirm removal
    if (e instanceof MouseEvent) {
      e.stopImmediatePropagation();
      const listItem =
        e.currentTarget.parentElement.parentElement.parentElement;
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
  editTask(e) {
    this.oldTask = e.currentTarget;
    (0,_components_tasks_form__WEBPACK_IMPORTED_MODULE_3__["default"])(e);
  },
  resetOldTask(oldTask) {
    if (this.oldTask) {
      this.oldTask = null;
    } else if (oldTask) {
      this.oldTask = oldTask;
    }
  },
  stopAnimation(e) {
    setTimeout(() => {
      e.removeAttribute('class');
    }, '200');
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasksList);


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
  const state = {
    type,
    button,
    dialog,
    icon: _assets_icons_flag_svg__WEBPACK_IMPORTED_MODULE_1__,
    formItem: button.parentElement,
    btnIcon: button.querySelector('.img_wrapper').firstChild,
    btnSelectText: button.querySelector(`.task_${type}`),
  };

  if (type !== 'priority') {
    state.icon = _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_3__;
  }

  return Object.assign(
      {},
      options(state),
  )
};

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
  init() {
    this.input = document.querySelector(`#${this.type}`);
    this.currentSelection = this.input.value;
  },
  cacheDOM() {
    this.options = document.querySelectorAll('.option');
  },
  bindEvents() {
    this.closeModal = this.closeModal.bind(this);
    this.select = this.select.bind(this);
    this.dialogElement.addEventListener('click', this.closeModal);
    this.options.forEach(option => option.addEventListener('click', this.select));
    this.callBack = this.callBack.bind(this);
    this.observer = new ResizeObserver(this.callBack);
    this.observer.observe(this.formItem);

    this.media.addEventListener('change', () => {
      this.removeModal();
    });
  },
  render() {
    const optionsWrapper = document.createElement('div');
    const optionsList = document.createElement('ul');
    optionsWrapper.classList.add('container');
    let projects = null;

    let i = 1;
    let length = 5;
    if (this.type === 'project') {
      i = 0;
      projects = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox.concat(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].projects)
      length = projects.length;
    }
    for (i; i < length; i += 1) {
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
  closeModal(e) {
    if (e.target.tagName === 'DIALOG') {
      this.removeModal();
    }
  },
  removeModal() {
    this.dialogElement.remove();
    this.observer.unobserve(this.btnSelect);
  },
  select(e) {
    if (this.type === 'project') {
      this.input.value = e.currentTarget.dataset.value;
      this.btnSelectText.textContent = _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].find(e.currentTarget.dataset.value).title;
      const newIcon = new Image()
      newIcon.src = e.currentTarget.dataset.value !== _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox[0].uuid ? _assets_icons_circle_svg__WEBPACK_IMPORTED_MODULE_3__ : _assets_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_4__;
      newIcon.classList.add(e.currentTarget.dataset.value !== _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox[0].uuid ? 'project_circle' : 'project_inbox');
      newIcon.setAttribute('onload', 'SVGInject(this)');
      if (newIcon.src !== this.btnIcon.dataset.injectUrl) {
        // if the new icon src and the current icon src are not the same
        // replace the node
        this.btnIcon.parentElement.replaceChild(newIcon, this.btnIcon);
      }
    } else {
      this.input.value = parseInt(e.currentTarget.dataset.value, 10);
      this.btnSelectText.textContent = `P${this.input.value}`;
      this.btnIcon.className.baseVal = `priority_${this.input.value}`;
    }
    this.removeModal();
  },
  callBack(entries) {
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
});


/***/ }),

/***/ "./src/containers/project_controller.js":
/*!**********************************************!*\
  !*** ./src/containers/project_controller.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/containers/pubsub.js");
/* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/storage */ "./src/storage/storage.js");



const getFormValues = (inputs) => {
  const obj = {};
  inputs.forEach((input) => {
    if (input.id === 'priority') {
      obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length), 10);
    } else if (
      input.id === 'due_date' && input.value.length === 0 && [...inputs].find((item) => item.id === 'due_time').value.length !== 0
    ) {
      // if time has a value and date has no value
      // date set to today's date
      obj[input.id] = new Date().toISOString().split('T')[0];
    } else if (input.value.length !== 0) {
      obj[input.id] = input.value;
    }
  });
  return obj;
};

const buildProject = (tasks) => {
  const state = {
    tasks,
    uuid: crypto.randomUUID(),
  };

  return Object.assign({}, project(state));
};

const task = (uuid) => {
  const type = 'task';
  const uuidTask = crypto.randomUUID();
  const uuidProj = uuid;
  return { uuidTask, uuidProj, type };
};

// creates a project object
// tasks property created upon object creation
const project = (state) => ({
  type: 'project',
  active: false, // there can only be one project active
  uuid: state.uuid,
  tasks: state.tasks || [],
  addTask(inputs) {
    // need to allow user to pick what project to assign the newly/edited task
    // pushes task to respective project
    const formValues = getFormValues(inputs);
    const newTask = Object.assign(task(this.uuid), formValues);

    if (formValues.project && formValues.project !== newTask.uuidProj) {
      newTask.uuidProj = formValues.project;
      projectController.find(formValues.project).tasks.push(newTask);
      if (
        new Date(`${newTask.due_date}T00:00:00`).toDateString() ===
        new Date().toDateString()
      ) {
        _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('addTask', newTask);
      }
    } else {
      this.tasks.push(newTask);
      _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('addTask', newTask);
    }
    projectController.setAllProjects();
  },
  removeTask(uuid) {
    // if the remove task is in today
    // remove it from today AND it's respective project
    // if the task's date in today is edited
    // remove it from only today
    const task = this.findTask(uuid);
    this.tasks.splice(this.tasks.indexOf(task), 1);
    // removes task in respective project
    projectController.allProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.uuidTask === uuid) {
          project.tasks.splice(project.tasks.indexOf(task), 1);
        }
      });
    });
    projectController.setAllProjects();
  },
  updateTask(uuid, inputs) {
    const formValues = getFormValues(inputs);
    const newTask = Object.assign(this.findTask(uuid), formValues);
    // if the project is change for a task
    if (formValues.project && formValues.project !== newTask.uuidProj) {
      this.removeTask(newTask.uuidTask);
      newTask.uuidProj = formValues.project;
      projectController.find(formValues.project).tasks.push(newTask);
      _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('removeTask');
      if (projectController.findActive().title === 'Today') {
        _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateTask', newTask);
      }
    } else {
      if (projectController.findActive().title === 'Today') {
        if (new Date(`${newTask.due_date}T00:00:00`).toDateString() === new Date().toDateString()) {
          _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateTask', newTask);
        } else {
          _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('removeTask');
        }
      } else {
        _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateTask', newTask);
      }
    }
    projectController.setAllProjects();
  },
  findTask(uuid) {
    return this.tasks.find((element) => element.uuidTask === uuid);
  },
});

const projectController = {
  misc: null,
  projects: null,
  inbox: [Object.assign(buildProject(), { title: 'Inbox' })], // will hold tasks assigned to the 'inbox'
  today: [Object.assign(buildProject(), { title: 'Today' })],
  allProjects: [],
  addProject(inputs) {
    const formValues = getFormValues(inputs);
    const newProject = buildProject();
    this.projects.push(Object.assign(newProject, formValues));
    this.setAllProjects();
    this.setActive(newProject.uuid);
  },
  remove(uuid) {
    if (uuid === projectController.findActive().uuid) {
      _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('content', projectController.inbox[0].uuid);
    }
    this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
    this.setAllProjects();
  },
  find(uuid) {
    return this.allProjects.find((project) => project.uuid === uuid);
  },
  setActive(uuid) {
    if (this.findActive()) {
      this.findActive().active = false;
    }

    if (uuid) {
      this.find(uuid).active = true;
    } else if (!uuid && typeof uuid === 'boolean') {
      this.inbox.active = true;
    }
  },
  findActive() {
    if (!this.allProjects.find((project) => project.active === true)) {
      this.inbox[0].active = true;
      return this.inbox;
    } else {
      return this.allProjects.find((project) => project.active === true);
    }
  },
  setAllProjects() {
    this.allProjects = this.inbox.concat(this.projects, this.today);
    this.sort();
    (0,_storage_storage__WEBPACK_IMPORTED_MODULE_1__.populateStorage)();
  },
  setMiscProjects() {
    this.misc = this.inbox.concat(this.today);
  },
  sort() {
    const today = new Date().toDateString();
    this.allProjects.forEach((project) => {
      if (project.tasks.length > 0 && project.title !== 'Today') {
        project.tasks.forEach((task) => {
          const taskDate = new Date(`${task.due_date}T00:00:00`).toDateString();
          if (!this.today[0].findTask(task.uuidTask) && taskDate === today) {
            this.today[0].tasks.push(task);
          }
        });
      }
    });
  },
  init() {
    this.projects.forEach((obj) => {
      Object.assign(obj, buildProject(obj.tasks));
      obj.tasks.forEach((task) => {
        task.uuidProj = obj.uuid;
      });
    });

    Object.assign(this.inbox[0], buildProject(this.inbox[0].tasks));
    this.inbox[0].tasks.forEach((task) => {
      task.uuidProj = this.inbox[0].uuid;
    });
    this.setAllProjects();
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectController);


/***/ }),

/***/ "./src/containers/pubsub.js":
/*!**********************************!*\
  !*** ./src/containers/pubsub.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  subscribers: {},
  subscribe(subscriber, handler) {
    if (this.subscribers[subscriber]) {
      delete this.subscribers[subscriber];
    }
    this.subscribers[subscriber] = this.subscribers[subscriber] || [];
    this.subscribers[subscriber].push(handler);
  },
  unsubscribe(subscriber, handler) {
    if (this.subscribers[subscriber]) {
      for (let i = 0; i < this.subscribers[subscriber].length; i += 1) {
        if (this.subscribers[subscriber][i] === handler) {
          this.subscribers[subscriber].splice(i, 1);
          break;
        }
      }
    }
  },
  publish(subscriber, data) {
    if (this.subscribers[subscriber]) {
      this.subscribers[subscriber].forEach((handler) => {
        handler(data);
      });
    }
  },
});


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
  _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].projects = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects'))
    : [];
  _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox = localStorage.getItem('inbox')
    ? JSON.parse(localStorage.getItem('inbox'))
    : _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox;
  _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].init();
}

// sets items in localStorage
function populateStorage() {
  localStorage.setItem('projects', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].projects));
  localStorage.setItem('inbox', JSON.stringify(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__["default"].inbox));
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
  const files = {};
  const filesArr = [];
  r.keys().forEach((item) => {
    files[item.replace('./', '')] = r(item);
    filesArr.push(item.replace('./', ''));
  });

  return { files, filesArr };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw4RUFBOEUsWUFBWSxhQUFhLFVBQVUsT0FBTyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcs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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw0RkFBNEYsS0FBSyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxL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Q0Esc0JBQXNCLHlDQUF5QztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQitEOztBQUVqRTtBQUNPO0FBQ1AsRUFBRSxzRUFBaUI7QUFDbkI7QUFDQTtBQUNBLEVBQUUsc0VBQWlCO0FBQ25CO0FBQ0EsTUFBTSxzRUFBaUI7QUFDdkIsRUFBRSxzRUFBaUI7QUFDbkI7O0FBRUE7QUFDTztBQUNQLGtEQUFrRCxzRUFBaUI7QUFDbkUsK0NBQStDLHNFQUFpQjtBQUNoRTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0BpY29uZnUvc3ZnLWluamVjdC9kaXN0L3N2Zy1pbmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvbW9kYWxfcmVtb3ZhbC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0cy5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2xpc3QuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvc2lkZWJhci5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19mb3JtLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2xpc3QuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3Nfb3B0aW9ucy5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcHAuY3NzP2E2NzIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzP2U2OGIiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9tb2RhbF9yZW1vdmFsLmNzcz9lNzY4Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHMuY3NzPzFhYWEiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzcz82MWM1Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfbGlzdC5jc3M/MTJkMiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3NpZGViYXIuY3NzPzQ4MTYiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19mb3JtLmNzcz85OGU4Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfbGlzdC5jc3M/NzE1MSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX29wdGlvbnMuY3NzPzg1MDkiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgXFwuc3ZnJCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2ljb25zLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5zdmckIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL2J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL21haW4uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvbW9kYWxfcmVtb3ZlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdF90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0c19mb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzX2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Rhc2tzX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvdGFza3NfbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy90YXNrc19vcHRpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udGFpbmVycy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdXRpbGl0aWVzL2ltcG9ydC1hbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTVkdJbmplY3QgLSBWZXJzaW9uIDEuMi4zXG4gKiBBIHRpbnksIGludHVpdGl2ZSwgcm9idXN0LCBjYWNoaW5nIHNvbHV0aW9uIGZvciBpbmplY3RpbmcgU1ZHIGZpbGVzIGlubGluZSBpbnRvIHRoZSBET00uXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IElOQ09SUywgdGhlIGNyZWF0b3JzIG9mIGljb25mdS5jb21cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2ljb25mdS9zdmctaW5qZWN0L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAvLyBjb25zdGFudHMgZm9yIGJldHRlciBtaW5pZmljYXRpb25cbiAgdmFyIF9DUkVBVEVfRUxFTUVOVF8gPSAnY3JlYXRlRWxlbWVudCc7XG4gIHZhciBfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FXyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSc7XG4gIHZhciBfTEVOR1RIXyA9ICdsZW5ndGgnO1xuICB2YXIgX1NUWUxFXyA9ICdzdHlsZSc7XG4gIHZhciBfVElUTEVfID0gJ3RpdGxlJztcbiAgdmFyIF9VTkRFRklORURfID0gJ3VuZGVmaW5lZCc7XG4gIHZhciBfU0VUX0FUVFJJQlVURV8gPSAnc2V0QXR0cmlidXRlJztcbiAgdmFyIF9HRVRfQVRUUklCVVRFXyA9ICdnZXRBdHRyaWJ1dGUnO1xuXG4gIHZhciBOVUxMID0gbnVsbDtcblxuICAvLyBjb25zdGFudHNcbiAgdmFyIF9fU1ZHSU5KRUNUID0gJ19fc3ZnSW5qZWN0JztcbiAgdmFyIElEX1NVRkZJWCA9ICctLWluamVjdC0nO1xuICB2YXIgSURfU1VGRklYX1JFR0VYID0gbmV3IFJlZ0V4cChJRF9TVUZGSVggKyAnXFxcXGQrJywgXCJnXCIpO1xuICB2YXIgTE9BRF9GQUlMID0gJ0xPQURfRkFJTCc7XG4gIHZhciBTVkdfTk9UX1NVUFBPUlRFRCA9ICdTVkdfTk9UX1NVUFBPUlRFRCc7XG4gIHZhciBTVkdfSU5WQUxJRCA9ICdTVkdfSU5WQUxJRCc7XG4gIHZhciBBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTID0gWydzcmMnLCAnYWx0JywgJ29ubG9hZCcsICdvbmVycm9yJ107XG4gIHZhciBBX0VMRU1FTlQgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXSgnYScpO1xuICB2YXIgSVNfU1ZHX1NVUFBPUlRFRCA9IHR5cGVvZiBTVkdSZWN0ICE9IF9VTkRFRklORURfO1xuICB2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHVzZUNhY2hlOiB0cnVlLFxuICAgIGNvcHlBdHRyaWJ1dGVzOiB0cnVlLFxuICAgIG1ha2VJZHNVbmlxdWU6IHRydWVcbiAgfTtcbiAgLy8gTWFwIG9mIElSSSByZWZlcmVuY2VhYmxlIHRhZyBuYW1lcyB0byBwcm9wZXJ0aWVzIHRoYXQgY2FuIHJlZmVyZW5jZSB0aGVtLiBUaGlzIGlzIGRlZmluZWQgaW5cbiAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzExL2xpbmtpbmcuaHRtbCNwcm9jZXNzaW5nSVJJXG4gIHZhciBJUklfVEFHX1BST1BFUlRJRVNfTUFQID0ge1xuICAgIGNsaXBQYXRoOiBbJ2NsaXAtcGF0aCddLFxuICAgICdjb2xvci1wcm9maWxlJzogTlVMTCxcbiAgICBjdXJzb3I6IE5VTEwsXG4gICAgZmlsdGVyOiBOVUxMLFxuICAgIGxpbmVhckdyYWRpZW50OiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgbWFya2VyOiBbJ21hcmtlcicsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0J10sXG4gICAgbWFzazogTlVMTCxcbiAgICBwYXR0ZXJuOiBbJ2ZpbGwnLCAnc3Ryb2tlJ10sXG4gICAgcmFkaWFsR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXVxuICB9O1xuICB2YXIgSU5KRUNURUQgPSAxO1xuICB2YXIgRkFJTCA9IDI7XG5cbiAgdmFyIHVuaXF1ZUlkQ291bnRlciA9IDE7XG4gIHZhciB4bWxTZXJpYWxpemVyO1xuICB2YXIgZG9tUGFyc2VyO1xuXG5cbiAgLy8gY3JlYXRlcyBhbiBTVkcgZG9jdW1lbnQgZnJvbSBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cikge1xuICAgIGRvbVBhcnNlciA9IGRvbVBhcnNlciB8fCBuZXcgRE9NUGFyc2VyKCk7XG4gICAgcmV0dXJuIGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnU3RyLCAndGV4dC94bWwnKTtcbiAgfVxuXG5cbiAgLy8gc2VhcmlhbGl6ZXMgYW4gU1ZHIGVsZW1lbnQgdG8gYW4gU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbWVudCkge1xuICAgIHhtbFNlcmlhbGl6ZXIgPSB4bWxTZXJpYWxpemVyIHx8IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoc3ZnRWxlbWVudCk7XG4gIH1cblxuXG4gIC8vIFJldHVybnMgdGhlIGFic29sdXRlIHVybCBmb3IgdGhlIHNwZWNpZmllZCB1cmxcbiAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVVcmwodXJsKSB7XG4gICAgQV9FTEVNRU5ULmhyZWYgPSB1cmw7XG4gICAgcmV0dXJuIEFfRUxFTUVOVC5ocmVmO1xuICB9XG5cblxuICAvLyBMb2FkIHN2ZyB3aXRoIGFuIFhIUiByZXF1ZXN0XG4gIGZ1bmN0aW9uIGxvYWRTdmcodXJsLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAvLyByZWFkeVN0YXRlIGlzIERPTkVcbiAgICAgICAgICB2YXIgc3RhdHVzID0gcmVxLnN0YXR1cztcbiAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgT0tcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVhNTCwgcmVxLnJlc3BvbnNlVGV4dC50cmltKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgaXMgZXJyb3IgKDR4eCBvciA1eHgpXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBzdGF0dXMgMCBjYW4gaW5kaWNhdGUgYSBmYWlsZWQgY3Jvc3MtZG9tYWluIGNhbGxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cblxuICAvLyBDb3B5IGF0dHJpYnV0ZXMgZnJvbSBpbWcgZWxlbWVudCB0byBzdmcgZWxlbWVudFxuICBmdW5jdGlvbiBjb3B5QXR0cmlidXRlcyhpbWdFbGVtLCBzdmdFbGVtKSB7XG4gICAgdmFyIGF0dHJpYnV0ZTtcbiAgICB2YXIgYXR0cmlidXRlTmFtZTtcbiAgICB2YXIgYXR0cmlidXRlVmFsdWU7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbWdFbGVtLmF0dHJpYnV0ZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgLy8gT25seSBjb3B5IGF0dHJpYnV0ZXMgbm90IGV4cGxpY2l0bHkgZXhjbHVkZWQgZnJvbSBjb3B5aW5nXG4gICAgICBpZiAoQVRUUklCVVRFX0VYQ0xVU0lPTl9OQU1FUy5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID09IC0xKSB7XG4gICAgICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAvLyBJZiBpbWcgYXR0cmlidXRlIGlzIFwidGl0bGVcIiwgaW5zZXJ0IGEgdGl0bGUgZWxlbWVudCBpbnRvIFNWRyBlbGVtZW50XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09IF9USVRMRV8pIHtcbiAgICAgICAgICB2YXIgdGl0bGVFbGVtO1xuICAgICAgICAgIHZhciBmaXJzdEVsZW1lbnRDaGlsZCA9IHN2Z0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudENoaWxkICYmIGZpcnN0RWxlbWVudENoaWxkLmxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpID09IF9USVRMRV8pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGlzIGEgdGl0bGUgZWxlbWVudCwga2VlcCBpdCBhcyB0aGUgdGl0bGUgZWxlbWVudFxuICAgICAgICAgICAgdGl0bGVFbGVtID0gZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBTVkcgZWxlbWVudCdzIGZpcnN0IGNoaWxkIGVsZW1lbnQgaXMgbm90IGEgdGl0bGUgZWxlbWVudCwgY3JlYXRlIGEgbmV3IHRpdGxlXG4gICAgICAgICAgICAvLyBlbGUsZW10IGFuZCBzZXQgaXQgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfICsgJ05TJ10oJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgX1RJVExFXyk7XG4gICAgICAgICAgICBzdmdFbGVtLmluc2VydEJlZm9yZSh0aXRsZUVsZW0sIGZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2V0IG5ldyB0aXRsZSBjb250ZW50XG4gICAgICAgICAgdGl0bGVFbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2V0IGltZyBhdHRyaWJ1dGUgdG8gc3ZnIGVsZW1lbnRcbiAgICAgICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGFwcGVuZHMgYSBzdWZmaXggdG8gSURzIG9mIHJlZmVyZW5jZWQgZWxlbWVudHMgaW4gdGhlIDxkZWZzPiBpbiBvcmRlciB0byAgdG8gYXZvaWQgSUQgY29sbGlzaW9uXG4gIC8vIGJldHdlZW4gbXVsdGlwbGUgaW5qZWN0ZWQgU1ZHcy4gVGhlIHN1ZmZpeCBoYXMgdGhlIGZvcm0gXCItLWluamVjdC1YXCIsIHdoZXJlIFggaXMgYSBydW5uaW5nIG51bWJlciB3aGljaCBpc1xuICAvLyBpbmNyZW1lbnRlZCB3aXRoIGVhY2ggaW5qZWN0aW9uLiBSZWZlcmVuY2VzIHRvIHRoZSBJRHMgYXJlIGFkanVzdGVkIGFjY29yZGluZ2x5LlxuICAvLyBXZSBhc3N1bWUgdGhhIGFsbCBJRHMgd2l0aGluIHRoZSBpbmplY3RlZCBTVkcgYXJlIHVuaXF1ZSwgdGhlcmVmb3JlIHRoZSBzYW1lIHN1ZmZpeCBjYW4gYmUgdXNlZCBmb3IgYWxsIElEcyBvZiBvbmVcbiAgLy8gaW5qZWN0ZWQgU1ZHLlxuICAvLyBJZiB0aGUgb25seVJlZmVyZW5jZWQgYXJndW1lbnQgaXMgc2V0IHRvIHRydWUsIG9ubHkgdGhvc2UgSURzIHdpbGwgYmUgbWFkZSB1bmlxdWUgdGhhdCBhcmUgcmVmZXJlbmNlZCBmcm9tIHdpdGhpbiB0aGUgU1ZHXG4gIGZ1bmN0aW9uIG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgb25seVJlZmVyZW5jZWQpIHtcbiAgICB2YXIgaWRTdWZmaXggPSBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKztcbiAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gZm9yIGZ1bmN0aW9uYWwgbm90YXRpb25zIG9mIGFuIElSSSByZWZlcmVuY2VzLiBUaGlzIHdpbGwgZmluZCBvY2N1cmVuY2VzIGluIHRoZSBmb3JtXG4gICAgLy8gdXJsKCNhbnlJZCkgb3IgdXJsKFwiI2FueUlkXCIpIChmb3IgSW50ZXJuZXQgRXhwbG9yZXIpIGFuZCBjYXB0dXJlIHRoZSByZWZlcmVuY2VkIElEXG4gICAgdmFyIGZ1bmNJcmlSZWdleCA9IC91cmxcXChcIj8jKFthLXpBLVpdW1xcdzouLV0qKVwiP1xcKS9nO1xuICAgIC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBhbiBJRC4gVGhlIFNWRyBzcGVjIHJlY29tbWVuZHMgdG8gcHV0IHJlZmVyZW5jZWQgZWxlbWVudHMgaW5zaWRlIDxkZWZzPiBlbGVtZW50cywgYnV0XG4gICAgLy8gdGhpcyBpcyBub3QgYSByZXF1aXJlbWVudCwgdGhlcmVmb3JlIHdlIGhhdmUgdG8gc2VhcmNoIGZvciBJRHMgaW4gdGhlIHdob2xlIFNWRy5cbiAgICB2YXIgaWRFbGVtZW50cyA9IHN2Z0VsZW0ucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuICAgIHZhciBpZEVsZW07XG4gICAgLy8gQW4gb2JqZWN0IGNvbnRhaW5pbmcgcmVmZXJlbmNlZCBJRHMgIGFzIGtleXMgaXMgdXNlZCBpZiBvbmx5IHJlZmVyZW5jZWQgSURzIHNob3VsZCBiZSB1bmlxdWlmaWVkLlxuICAgIC8vIElmIHRoaXMgb2JqZWN0IGRvZXMgbm90IGV4aXN0LCBhbGwgSURzIHdpbGwgYmUgdW5pcXVpZmllZC5cbiAgICB2YXIgcmVmZXJlbmNlZElkcyA9IG9ubHlSZWZlcmVuY2VkID8gW10gOiBOVUxMO1xuICAgIHZhciB0YWdOYW1lO1xuICAgIHZhciBpcmlUYWdOYW1lcyA9IHt9O1xuICAgIHZhciBpcmlQcm9wZXJ0aWVzID0gW107XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgaSwgajtcblxuICAgIGlmIChpZEVsZW1lbnRzW19MRU5HVEhfXSkge1xuICAgICAgLy8gTWFrZSBhbGwgSURzIHVuaXF1ZSBieSBhZGRpbmcgdGhlIElEIHN1ZmZpeCBhbmQgY29sbGVjdCBhbGwgZW5jb3VudGVyZWQgdGFnIG5hbWVzXG4gICAgICAvLyB0aGF0IGFyZSBJUkkgcmVmZXJlbmNlYWJsZSBmcm9tIHByb3Blcml0aWVzLlxuICAgICAgZm9yIChpID0gMDsgaSA8IGlkRWxlbWVudHNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgICAgdGFnTmFtZSA9IGlkRWxlbWVudHNbaV0ubG9jYWxOYW1lOyAvLyBVc2Ugbm9uLW5hbWVzcGFjZWQgdGFnIG5hbWVcbiAgICAgICAgLy8gTWFrZSBJRCB1bmlxdWUgaWYgdGFnIG5hbWUgaXMgSVJJIHJlZmVyZW5jZWFibGVcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gSVJJX1RBR19QUk9QRVJUSUVTX01BUCkge1xuICAgICAgICAgIGlyaVRhZ05hbWVzW3RhZ05hbWVdID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR2V0IGFsbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG1hcHBlZCB0byB0aGUgZm91bmQgSVJJIHJlZmVyZW5jZWFibGUgdGFnc1xuICAgICAgZm9yICh0YWdOYW1lIGluIGlyaVRhZ05hbWVzKSB7XG4gICAgICAgIChJUklfVEFHX1BST1BFUlRJRVNfTUFQW3RhZ05hbWVdIHx8IFt0YWdOYW1lXSkuZm9yRWFjaChmdW5jdGlvbiAobWFwcGVkUHJvcGVydHkpIHtcbiAgICAgICAgICAvLyBBZGQgbWFwcGVkIHByb3BlcnRpZXMgdG8gYXJyYXkgb2YgaXJpIHJlZmVyZW5jaW5nIHByb3BlcnRpZXMuXG4gICAgICAgICAgLy8gVXNlIGxpbmVhciBzZWFyY2ggaGVyZSBiZWNhdXNlIHRoZSBudW1iZXIgb2YgcG9zc2libGUgZW50cmllcyBpcyB2ZXJ5IHNtYWxsIChtYXhpbXVtIDExKVxuICAgICAgICAgIGlmIChpcmlQcm9wZXJ0aWVzLmluZGV4T2YobWFwcGVkUHJvcGVydHkpIDwgMCkge1xuICAgICAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKG1hcHBlZFByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dKSB7XG4gICAgICAgIC8vIEFkZCBcInN0eWxlXCIgdG8gcHJvcGVydGllcywgYmVjYXVzZSBpdCBtYXkgY29udGFpbiByZWZlcmVuY2VzIGluIHRoZSBmb3JtICdzdHlsZT1cImZpbGw6dXJsKCNteUZpbGwpXCInXG4gICAgICAgIGlyaVByb3BlcnRpZXMucHVzaChfU1RZTEVfKTtcbiAgICAgIH1cbiAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgU1ZHIGFuZCByZXBsYWNlIElEcyBpbiByZWZlcmVuY2VzLlxuICAgICAgLy8gVG8gZ2V0IGFsbCBkZXNjZW5kaW5nIGVsZW1lbnRzLCBnZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIHNlZW1zIHRvIHBlcmZvcm0gZmFzdGVyIHRoYW4gcXVlcnlTZWxlY3RvckFsbCgnKicpLlxuICAgICAgLy8gU2luY2Ugc3ZnRWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIGRvZXMgbm90IHJldHVybiB0aGUgc3ZnIGVsZW1lbnQgaXRzZWxmLCB3ZSBoYXZlIHRvIGhhbmRsZSBpdCBzZXBhcmF0ZWx5LlxuICAgICAgdmFyIGRlc2NFbGVtZW50cyA9IHN2Z0VsZW1bX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCcqJyk7XG4gICAgICB2YXIgZWxlbWVudCA9IHN2Z0VsZW07XG4gICAgICB2YXIgcHJvcGVydHlOYW1lO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIG5ld1ZhbHVlO1xuICAgICAgZm9yIChpID0gLTE7IGVsZW1lbnQgIT0gTlVMTDspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09IF9TVFlMRV8pIHtcbiAgICAgICAgICAvLyBJZiBlbGVtZW50IGlzIGEgc3R5bGUgZWxlbWVudCwgcmVwbGFjZSBJRHMgaW4gYWxsIG9jY3VyZW5jZXMgb2YgXCJ1cmwoI2FueUlkKVwiIGluIHRleHQgY29udGVudFxuICAgICAgICAgIHZhbHVlID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoZnVuY0lyaVJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaWQpIHtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIHByb3BlcnR5IG5hbWVzIGZvciB3aGljaCBJRHMgd2VyZSBmb3VuZFxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpcmlQcm9wZXJ0aWVzW19MRU5HVEhfXTsgaisrKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBpcmlQcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgdmFsdWUgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgICBpZiAocmVmZXJlbmNlZElkcykge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZWRJZHNbaWRdID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCMnICsgaWQgKyBpZFN1ZmZpeCArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocHJvcGVydHlOYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlcGxhY2UgSURzIGluIHhsaW5rOnJlZiBhbmQgaHJlZiBhdHRyaWJ1dGVzXG4gICAgICAgICAgWyd4bGluazpocmVmJywgJ2hyZWYnXS5mb3JFYWNoKGZ1bmN0aW9uKHJlZkF0dHJOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaXJpID0gZWxlbWVudFtfR0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lKTtcbiAgICAgICAgICAgIGlmICgvXlxccyojLy50ZXN0KGlyaSkpIHsgLy8gQ2hlY2sgaWYgaXJpIGlzIG5vbi1udWxsIGFuZCBpbnRlcm5hbCByZWZlcmVuY2VcbiAgICAgICAgICAgICAgaXJpID0gaXJpLnRyaW0oKTtcbiAgICAgICAgICAgICAgZWxlbWVudFtfU0VUX0FUVFJJQlVURV9dKHJlZkF0dHJOYW1lLCBpcmkgKyBpZFN1ZmZpeCk7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIElEIHRvIHJlZmVyZW5jZWQgSURzXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpcmkuc3Vic3RyaW5nKDEpXSA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZGVzY0VsZW1lbnRzWysraV07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICBpZEVsZW0gPSBpZEVsZW1lbnRzW2ldO1xuICAgICAgICAvLyBJZiBzZXQgb2YgcmVmZXJlbmNlZCBJRHMgZXhpc3RzLCBtYWtlIG9ubHkgcmVmZXJlbmNlZCBJRHMgdW5pcXVlLFxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSBhbGwgSURzIHVuaXF1ZS5cbiAgICAgICAgaWYgKCFyZWZlcmVuY2VkSWRzIHx8IHJlZmVyZW5jZWRJZHNbaWRFbGVtLmlkXSkge1xuICAgICAgICAgIC8vIEFkZCBzdWZmaXggdG8gZWxlbWVudCdzIElEXG4gICAgICAgICAgaWRFbGVtLmlkICs9IGlkU3VmZml4O1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiB0cnVlIGlmIFNWRyBlbGVtZW50IGhhcyBjaGFuZ2VkXG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH1cblxuXG4gIC8vIEZvciBjYWNoZWQgU1ZHcyB0aGUgSURzIGFyZSBtYWRlIHVuaXF1ZSBieSBzaW1wbHkgcmVwbGFjaW5nIHRoZSBhbHJlYWR5IGluc2VydGVkIHVuaXF1ZSBJRHMgd2l0aCBhXG4gIC8vIGhpZ2hlciBJRCBjb3VudGVyLiBUaGlzIGlzIG11Y2ggbW9yZSBwZXJmb3JtYW50IHRoYW4gYSBjYWxsIHRvIG1ha2VJZHNVbmlxdWUoKS5cbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZUNhY2hlZChzdmdTdHJpbmcpIHtcbiAgICByZXR1cm4gc3ZnU3RyaW5nLnJlcGxhY2UoSURfU1VGRklYX1JFR0VYLCBJRF9TVUZGSVggKyB1bmlxdWVJZENvdW50ZXIrKyk7XG4gIH1cblxuXG4gIC8vIEluamVjdCBTVkcgYnkgcmVwbGFjaW5nIHRoZSBpbWcgZWxlbWVudCB3aXRoIHRoZSBTVkcgZWxlbWVudCBpbiB0aGUgRE9NXG4gIGZ1bmN0aW9uIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoc3ZnRWxlbSkge1xuICAgICAgc3ZnRWxlbVtfU0VUX0FUVFJJQlVURV9dKCdkYXRhLWluamVjdC11cmwnLCBhYnNVcmwpO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBpbWdFbGVtLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3B5QXR0cmlidXRlcykge1xuICAgICAgICAgIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludm9rZSBiZWZvcmVJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGJlZm9yZUluamVjdCA9IG9wdGlvbnMuYmVmb3JlSW5qZWN0O1xuICAgICAgICB2YXIgaW5qZWN0RWxlbSA9IChiZWZvcmVJbmplY3QgJiYgYmVmb3JlSW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0pKSB8fCBzdmdFbGVtO1xuICAgICAgICAvLyBSZXBsYWNlIGltZyBlbGVtZW50IHdpdGggbmV3IGVsZW1lbnQuIFRoaXMgaXMgdGhlIGFjdHVhbCBpbmplY3Rpb24uXG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGluamVjdEVsZW0sIGltZ0VsZW0pO1xuICAgICAgICAvLyBNYXJrIGltZyBlbGVtZW50IGFzIGluamVjdGVkXG4gICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gSU5KRUNURUQ7XG4gICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICAgICAgLy8gSW52b2tlIGFmdGVySW5qZWN0IGhvb2sgaWYgc2V0XG4gICAgICAgIHZhciBhZnRlckluamVjdCA9IG9wdGlvbnMuYWZ0ZXJJbmplY3Q7XG4gICAgICAgIGlmIChhZnRlckluamVjdCkge1xuICAgICAgICAgIGFmdGVySW5qZWN0KGltZ0VsZW0sIGluamVjdEVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNZXJnZXMgYW55IG51bWJlciBvZiBvcHRpb25zIG9iamVjdHMgaW50byBhIG5ldyBvYmplY3RcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKCkge1xuICAgIHZhciBtZXJnZWRPcHRpb25zID0ge307XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBzcGVjaWZpZWQgb3B0aW9ucyBvYmplY3RzIGFuZCBhZGQgYWxsIHByb3BlcnRpZXMgdG8gdGhlIG5ldyBvcHRpb25zIG9iamVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc1tfTEVOR1RIX107IGkrKykge1xuICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50KSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIG1lcmdlZE9wdGlvbnNba2V5XSA9IGFyZ3VtZW50W2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG4gIH1cblxuXG4gIC8vIEFkZHMgdGhlIHNwZWNpZmllZCBDU1MgdG8gdGhlIGRvY3VtZW50J3MgPGhlYWQ+IGVsZW1lbnRcbiAgZnVuY3Rpb24gYWRkU3R5bGVUb0hlYWQoY3NzKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudFtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJ2hlYWQnKVswXTtcbiAgICBpZiAoaGVhZCkge1xuICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnRbX0NSRUFURV9FTEVNRU5UX10oX1NUWUxFXyk7XG4gICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBCdWlsZHMgYW4gU1ZHIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gYnVpbGRTdmdFbGVtZW50KHN2Z1N0ciwgdmVyaWZ5KSB7XG4gICAgaWYgKHZlcmlmeSkge1xuICAgICAgdmFyIHN2Z0RvYztcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBTVkcgc3RyaW5nIHdpdGggRE9NUGFyc2VyXG4gICAgICAgIHN2Z0RvYyA9IHN2Z1N0cmluZ1RvU3ZnRG9jKHN2Z1N0cik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgICB9XG4gICAgICBpZiAoc3ZnRG9jW19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgncGFyc2VyZXJyb3InKVtfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gRE9NUGFyc2VyIGRvZXMgbm90IHRocm93IGFuIGV4Y2VwdGlvbiwgYnV0IGluc3RlYWQgcHV0cyBwYXJzZXJlcnJvciB0YWdzIGluIHRoZSBkb2N1bWVudFxuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdmdEb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gc3ZnU3RyO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBvbmxvYWQgYXR0cmlidXRlLiBTaG91bGQgb25seSBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgdW5zdHlsZWQgaW1hZ2UgZmxhc2ggcHJvdGVjdGlvbiBhbmRcbiAgICAvLyBtYWtlIHRoZSBlbGVtZW50IHZpc2libGUsIG5vdCBmb3IgcmVtb3ZpbmcgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgIGltZ0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdvbmxvYWQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZXJyb3JNZXNzYWdlKG1zZykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NWR0luamVjdDogJyArIG1zZyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGZhaWwoaW1nRWxlbSwgc3RhdHVzLCBvcHRpb25zKSB7XG4gICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBGQUlMO1xuICAgIGlmIChvcHRpb25zLm9uRmFpbCkge1xuICAgICAgb3B0aW9ucy5vbkZhaWwoaW1nRWxlbSwgc3RhdHVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlKHN0YXR1cyk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfSU5WQUxJRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgIGZhaWwoaW1nRWxlbSwgU1ZHX05PVF9TVVBQT1JURUQsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKSB7XG4gICAgZmFpbChpbWdFbGVtLCBMT0FEX0ZBSUwsIG9wdGlvbnMpO1xuICB9XG5cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKSB7XG4gICAgaW1nRWxlbS5vbmxvYWQgPSBOVUxMO1xuICAgIGltZ0VsZW0ub25lcnJvciA9IE5VTEw7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGltZ05vdFNldChtc2cpIHtcbiAgICBlcnJvck1lc3NhZ2UoJ25vIGltZyBlbGVtZW50Jyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNWR0luamVjdChnbG9iYWxOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgdmFyIHN2Z0xvYWRDYWNoZSA9IHt9O1xuXG4gICAgaWYgKElTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgIC8vIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFNWRywgYWRkIGEgc21hbGwgc3R5bGVzaGVldCB0aGF0IGhpZGVzIHRoZSA8aW1nPiBlbGVtZW50cyB1bnRpbFxuICAgICAgLy8gaW5qZWN0aW9uIGlzIGZpbmlzaGVkLiBUaGlzIGF2b2lkcyBzaG93aW5nIHRoZSB1bnN0eWxlZCBTVkdzIGJlZm9yZSBzdHlsZSBpcyBhcHBsaWVkLlxuICAgICAgYWRkU3R5bGVUb0hlYWQoJ2ltZ1tvbmxvYWRePVwiJyArIGdsb2JhbE5hbWUgKyAnKFwiXXt2aXNpYmlsaXR5OmhpZGRlbjt9Jyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTVkdJbmplY3RcbiAgICAgKlxuICAgICAqIEluamVjdHMgdGhlIFNWRyBzcGVjaWZpZWQgaW4gdGhlIGBzcmNgIGF0dHJpYnV0ZSBvZiB0aGUgc3BlY2lmaWVkIGBpbWdgIGVsZW1lbnQgb3IgYXJyYXkgb2YgYGltZ2BcbiAgICAgKiBlbGVtZW50cy4gUmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IHdoaWNoIHJlc29sdmVzIGlmIGFsbCBwYXNzZWQgaW4gYGltZ2AgZWxlbWVudHMgaGF2ZSBlaXRoZXIgYmVlblxuICAgICAqIGluamVjdGVkIG9yIGZhaWxlZCB0byBpbmplY3QgKE9ubHkgaWYgYSBnbG9iYWwgUHJvbWlzZSBvYmplY3QgaXMgYXZhaWxhYmxlIGxpa2UgaW4gYWxsIG1vZGVybiBicm93c2Vyc1xuICAgICAqIG9yIHRocm91Z2ggYSBwb2x5ZmlsbCkuXG4gICAgICpcbiAgICAgKiBPcHRpb25zOlxuICAgICAqIHVzZUNhY2hlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBTVkcgd2lsbCBiZSBjYWNoZWQgdXNpbmcgdGhlIGFic29sdXRlIFVSTC4gRGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAuXG4gICAgICogY29weUF0dHJpYnV0ZXM6IElmIHNldCB0byBgdHJ1ZWAgdGhlIGF0dHJpYnV0ZXMgd2lsbCBiZSBjb3BpZWQgZnJvbSBgaW1nYCB0byBgc3ZnYC4gRGZhdWx0IHZhbHVlXG4gICAgICogICAgIGlzIGB0cnVlYC5cbiAgICAgKiBtYWtlSWRzVW5pcXVlOiBJZiBzZXQgdG8gYHRydWVgIHRoZSBJRCBvZiBlbGVtZW50cyBpbiB0aGUgYDxkZWZzPmAgZWxlbWVudCB0aGF0IGNhbiBiZSByZWZlcmVuY2VzIGJ5XG4gICAgICogICAgIHByb3BlcnR5IHZhbHVlcyAoZm9yIGV4YW1wbGUgJ2NsaXBQYXRoJykgYXJlIG1hZGUgdW5pcXVlIGJ5IGFwcGVuZGluZyBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhXG4gICAgICogICAgIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGluY3JlYXNlcyB3aXRoIGVhY2ggaW5qZWN0aW9uLiBUaGlzIGlzIGRvbmUgdG8gYXZvaWQgZHVwbGljYXRlIElEcyBpbiB0aGUgRE9NLlxuICAgICAqIGJlZm9yZUxvYWQ6IEhvb2sgYmVmb3JlIFNWRyBpcyBsb2FkZWQuIFRoZSBgaW1nYCBlbGVtZW50IGlzIHBhc3NlZCBhcyBhIHBhcmFtZXRlci4gSWYgdGhlIGhvb2sgcmV0dXJuc1xuICAgICAqICAgICBhIHN0cmluZyBpdCBpcyB1c2VkIGFzIHRoZSBVUkwgaW5zdGVhZCBvZiB0aGUgYGltZ2AgZWxlbWVudCdzIGBzcmNgIGF0dHJpYnV0ZS5cbiAgICAgKiBhZnRlckxvYWQ6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGxvYWRlZC4gVGhlIGxvYWRlZCBgc3ZnYCBlbGVtZW50IGFuZCBgc3ZnYCBzdHJpbmcgYXJlIHBhc3NlZCBhcyBhXG4gICAgICogICAgIHBhcmFtZXRlcnMuIElmIGNhY2hpbmcgaXMgYWN0aXZlIHRoaXMgaG9vayB3aWxsIG9ubHkgZ2V0IGNhbGxlZCBvbmNlIGZvciBpbmplY3RlZCBTVkdzIHdpdGggdGhlXG4gICAgICogICAgIHNhbWUgYWJzb2x1dGUgcGF0aC4gQ2hhbmdlcyB0byB0aGUgYHN2Z2AgZWxlbWVudCBpbiB0aGlzIGhvb2sgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBpbmplY3RlZCBTVkdzXG4gICAgICogICAgIHdpdGggdGhlIHNhbWUgYWJzb2x1dGUgcGF0aC4gSXQncyBhbHNvIHBvc3NpYmxlIHRvIHJldHVybiBhbiBgc3ZnYCBzdHJpbmcgb3IgYHN2Z2AgZWxlbWVudCB3aGljaFxuICAgICAqICAgICB3aWxsIHRoZW4gYmUgdXNlZCBmb3IgdGhlIGluamVjdGlvbi5cbiAgICAgKiBiZWZvcmVJbmplY3Q6IEhvb2sgYmVmb3JlIFNWRyBpcyBpbmplY3RlZC4gVGhlIGBpbWdgIGFuZCBgc3ZnYCBlbGVtZW50cyBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMuIElmXG4gICAgICogICAgIGFueSBodG1sIGVsZW1lbnQgaXMgcmV0dXJuZWQgaXQgZ2V0cyBpbmplY3RlZCBpbnN0ZWFkIG9mIGFwcGx5aW5nIHRoZSBkZWZhdWx0IFNWRyBpbmplY3Rpb24uXG4gICAgICogYWZ0ZXJJbmplY3Q6IEhvb2sgYWZ0ZXIgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy5cbiAgICAgKiBvbkFsbEZpbmlzaDogSG9vayBhZnRlciBhbGwgYGltZ2AgZWxlbWVudHMgcGFzc2VkIHRvIGFuIFNWR0luamVjdCgpIGNhbGwgaGF2ZSBlaXRoZXIgYmVlbiBpbmplY3RlZCBvclxuICAgICAqICAgICBmYWlsZWQgdG8gaW5qZWN0LlxuICAgICAqIG9uRmFpbDogSG9vayBhZnRlciBpbmplY3Rpb24gZmFpbHMuIFRoZSBgaW1nYCBlbGVtZW50IGFuZCBhIGBzdGF0dXNgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFuIHBhcmFtZXRlci5cbiAgICAgKiAgICAgVGhlIGBzdGF0dXNgIGNhbiBiZSBlaXRoZXIgYCdTVkdfTk9UX1NVUFBPUlRFRCdgICh0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRyksXG4gICAgICogICAgIGAnU1ZHX0lOVkFMSUQnYCAodGhlIFNWRyBpcyBub3QgaW4gYSB2YWxpZCBmb3JtYXQpIG9yIGAnTE9BRF9GQUlMRUQnYCAobG9hZGluZyBvZiB0aGUgU1ZHIGZhaWxlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50IG9yIGFuIGFycmF5IG9mIGltZyBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgd2l0aCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciB0aGlzIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTVkdJbmplY3QoaW1nLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIGFsbEZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvbkFsbEZpbmlzaCA9IG9wdGlvbnMub25BbGxGaW5pc2g7XG4gICAgICAgICAgaWYgKG9uQWxsRmluaXNoKSB7XG4gICAgICAgICAgICBvbkFsbEZpbmlzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW1nICYmIHR5cGVvZiBpbWdbX0xFTkdUSF9dICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgLy8gYW4gYXJyYXkgbGlrZSBzdHJ1Y3R1cmUgb2YgaW1nIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIGluamVjdEluZGV4ID0gMDtcbiAgICAgICAgICB2YXIgaW5qZWN0Q291bnQgPSBpbWdbX0xFTkdUSF9dO1xuXG4gICAgICAgICAgaWYgKGluamVjdENvdW50ID09IDApIHtcbiAgICAgICAgICAgIGFsbEZpbmlzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgrK2luamVjdEluZGV4ID09IGluamVjdENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5qZWN0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZ1tpXSwgb3B0aW9ucywgZmluaXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb25seSBvbmUgaW1nIGVsZW1lbnRcbiAgICAgICAgICBTVkdJbmplY3RFbGVtZW50KGltZywgb3B0aW9ucywgYWxsRmluaXNoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gcmV0dXJuIGEgUHJvbWlzZSBvYmplY3QgaWYgZ2xvYmFsbHkgYXZhaWxhYmxlXG4gICAgICByZXR1cm4gdHlwZW9mIFByb21pc2UgPT0gX1VOREVGSU5FRF8gPyBydW4oKSA6IG5ldyBQcm9taXNlKHJ1bik7XG4gICAgfVxuXG5cbiAgICAvLyBJbmplY3RzIGEgc2luZ2xlIHN2ZyBlbGVtZW50LiBPcHRpb25zIG11c3QgYmUgYWxyZWFkeSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zLlxuICAgIGZ1bmN0aW9uIFNWR0luamVjdEVsZW1lbnQoaW1nRWxlbSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChpbWdFbGVtKSB7XG4gICAgICAgIHZhciBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSA9IGltZ0VsZW1bX19TVkdJTkpFQ1RdO1xuICAgICAgICBpZiAoIXN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoaW1nRWxlbSk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEludm9rZSBiZWZvcmVMb2FkIGhvb2sgaWYgc2V0LiBJZiB0aGUgYmVmb3JlTG9hZCByZXR1cm5zIGEgdmFsdWUgdXNlIGl0IGFzIHRoZSBzcmMgZm9yIHRoZSBsb2FkXG4gICAgICAgICAgLy8gVVJMIHBhdGguIEVsc2UgdXNlIHRoZSBpbWdFbGVtJ3Mgc3JjIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YXIgYmVmb3JlTG9hZCA9IG9wdGlvbnMuYmVmb3JlTG9hZDtcbiAgICAgICAgICB2YXIgc3JjID0gKGJlZm9yZUxvYWQgJiYgYmVmb3JlTG9hZChpbWdFbGVtKSkgfHwgaW1nRWxlbVtfR0VUX0FUVFJJQlVURV9dKCdzcmMnKTtcblxuICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAvLyBJZiBubyBpbWFnZSBzcmMgYXR0cmlidXRlIGlzIHNldCBkbyBubyBpbmplY3Rpb24uIFRoaXMgY2FuIG9ubHkgYmUgcmVhY2hlZCBieSB1c2luZyBqYXZhc2NyaXB0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGlmIG5vIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IHRoZSBvbmxvYWQgYW5kIG9uZXJyb3IgZXZlbnRzIGRvIG5vdCBnZXQgY2FsbGVkXG4gICAgICAgICAgICBpZiAoc3JjID09PSAnJykge1xuICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IGFycmF5IHNvIGxhdGVyIGNhbGxzIGNhbiByZWdpc3RlciBjYWxsYmFja3NcbiAgICAgICAgICB2YXIgb25GaW5pc2hDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IG9uRmluaXNoQ2FsbGJhY2tzO1xuXG4gICAgICAgICAgdmFyIG9uRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihvbkZpbmlzaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIG9uRmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYWJzVXJsID0gZ2V0QWJzb2x1dGVVcmwoc3JjKTtcbiAgICAgICAgICB2YXIgdXNlQ2FjaGVPcHRpb24gPSBvcHRpb25zLnVzZUNhY2hlO1xuICAgICAgICAgIHZhciBtYWtlSWRzVW5pcXVlT3B0aW9uID0gb3B0aW9ucy5tYWtlSWRzVW5pcXVlO1xuICAgICAgICAgIFxuICAgICAgICAgIHZhciBzZXRTdmdMb2FkQ2FjaGVWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdLmZvckVhY2goZnVuY3Rpb24oc3ZnTG9hZCkge1xuICAgICAgICAgICAgICAgIHN2Z0xvYWQodmFsKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBzdmdMb2FkID0gc3ZnTG9hZENhY2hlW2Fic1VybF07XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVMb2FkVmFsdWUgPSBmdW5jdGlvbihsb2FkVmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRWYWx1ZSA9PT0gTE9BRF9GQUlMKSB7XG4gICAgICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9hZFZhbHVlID09PSBTVkdfSU5WQUxJRCkge1xuICAgICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1VuaXF1ZUlkcyA9IGxvYWRWYWx1ZVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnU3RyaW5nID0gbG9hZFZhbHVlWzFdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBsb2FkVmFsdWVbMl07XG4gICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW07XG5cbiAgICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgaWYgKGhhc1VuaXF1ZUlkcyA9PT0gTlVMTCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJRHMgZm9yIHRoZSBTVkcgc3RyaW5nIGhhdmUgbm90IGJlZW4gbWFkZSB1bmlxdWUgYmVmb3JlLiBUaGlzIG1heSBoYXBwZW4gaWYgcHJldmlvdXNcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5qZWN0aW9uIG9mIGEgY2FjaGVkIFNWRyBoYXZlIGJlZW4gcnVuIHdpdGggdGhlIG9wdGlvbiBtYWtlZElkc1VuaXF1ZSBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzVW5pcXVlSWRzID0gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFZhbHVlWzBdID0gaGFzVW5pcXVlSWRzO1xuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMl0gPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNVbmlxdWVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBJRHMgdW5pcXVlIGZvciBhbHJlYWR5IGNhY2hlZCBTVkdzIHdpdGggYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IG1ha2VJZHNVbmlxdWVDYWNoZWQodW5pcXVlSWRzU3ZnU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdmdFbGVtID0gc3ZnRWxlbSB8fCBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdmdMb2FkICE9IF9VTkRFRklORURfKSB7XG4gICAgICAgICAgICAgIC8vIFZhbHVlIGZvciB1cmwgZXhpc3RzIGluIGNhY2hlXG4gICAgICAgICAgICAgIGlmIChzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbWUgdXJsIGhhcyBiZWVuIGNhY2hlZCwgYnV0IHZhbHVlIGhhcyBub3QgYmVlbiBsb2FkZWQgeWV0LCBzbyBhZGQgdG8gY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgc3ZnTG9hZC5wdXNoKGhhbmRsZUxvYWRWYWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTG9hZFZhbHVlKHN2Z0xvYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzdmdMb2FkID0gW107XG4gICAgICAgICAgICAgIC8vIHNldCBwcm9wZXJ0eSBpc0NhbGxiYWNrUXVldWUgdG8gQXJyYXkgdG8gZGlmZmVyZW50aWF0ZSBmcm9tIGFycmF5IHdpdGggY2FjaGVkIGxvYWRlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgc3ZnTG9hZC5pc0NhbGxiYWNrUXVldWUgPSB0cnVlO1xuICAgICAgICAgICAgICBzdmdMb2FkQ2FjaGVbYWJzVXJsXSA9IHN2Z0xvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTG9hZCB0aGUgU1ZHIGJlY2F1c2UgaXQgaXMgbm90IGNhY2hlZCBvciBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgICAgbG9hZFN2ZyhhYnNVcmwsIGZ1bmN0aW9uKHN2Z1htbCwgc3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIFhNTCBmcm9tIHRoZSBYSFIgcmVxdWVzdCBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEb2N1bWVudC4gT3RoZXJ3aXNlXG4gICAgICAgICAgICAvLyAoZm9yIGV4YW1wbGUgb2YgSUU5KSwgY3JlYXRlIHRoZSBzdmcgZG9jdW1lbnQgZnJvbSB0aGUgc3ZnIHN0cmluZy5cbiAgICAgICAgICAgIHZhciBzdmdFbGVtID0gc3ZnWG1sIGluc3RhbmNlb2YgRG9jdW1lbnQgPyBzdmdYbWwuZG9jdW1lbnRFbGVtZW50IDogYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBhZnRlckxvYWQgPSBvcHRpb25zLmFmdGVyTG9hZDtcbiAgICAgICAgICAgIGlmIChhZnRlckxvYWQpIHtcbiAgICAgICAgICAgICAgLy8gSW52b2tlIGFmdGVyTG9hZCBob29rIHdoaWNoIG1heSBtb2RpZnkgdGhlIFNWRyBlbGVtZW50LiBBZnRlciBsb2FkIG1heSBhbHNvIHJldHVybiBhIG5ld1xuICAgICAgICAgICAgICAvLyBzdmcgZWxlbWVudCBvciBzdmcgc3RyaW5nXG4gICAgICAgICAgICAgIHZhciBzdmdFbGVtT3JTdmdTdHJpbmcgPSBhZnRlckxvYWQoc3ZnRWxlbSwgc3ZnU3RyaW5nKSB8fCBzdmdFbGVtO1xuICAgICAgICAgICAgICBpZiAoc3ZnRWxlbU9yU3ZnU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN2Z0VsZW0gYW5kIHN2Z1N0cmluZyBiZWNhdXNlIG9mIG1vZGlmaWNhdGlvbnMgdG8gdGhlIFNWRyBlbGVtZW50IG9yIFNWRyBzdHJpbmcgaW5cbiAgICAgICAgICAgICAgICAvLyB0aGUgYWZ0ZXJMb2FkIGhvb2ssIHNvIHRoZSBtb2RpZmllZCBTVkcgaXMgYWxzbyB1c2VkIGZvciBhbGwgbGF0ZXIgY2FjaGVkIGluamVjdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2Ygc3ZnRWxlbU9yU3ZnU3RyaW5nID09ICdzdHJpbmcnO1xuICAgICAgICAgICAgICAgIHN2Z1N0cmluZyA9IGlzU3RyaW5nID8gc3ZnRWxlbU9yU3ZnU3RyaW5nIDogc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBpc1N0cmluZyA/IGJ1aWxkU3ZnRWxlbWVudChzdmdFbGVtT3JTdmdTdHJpbmcsIHRydWUpIDogc3ZnRWxlbU9yU3ZnU3RyaW5nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdmdFbGVtIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gTlVMTDtcbiAgICAgICAgICAgICAgaWYgKG1ha2VJZHNVbmlxdWVPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVJZHNTdmdTdHJpbmcgPSBoYXNVbmlxdWVJZHMgJiYgc3ZnRWxlbVRvU3ZnU3RyaW5nKHN2Z0VsZW0pO1xuICAgICAgICAgICAgICAgIC8vIHNldCBhbiBhcnJheSB3aXRoIHRocmVlIGVudHJpZXMgdG8gdGhlIGxvYWQgY2FjaGVcbiAgICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShbaGFzVW5pcXVlSWRzLCBzdmdTdHJpbmcsIHVuaXF1ZUlkc1N2Z1N0cmluZ10pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdmdJbnZhbGlkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShTVkdfSU5WQUxJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRTdmdMb2FkQ2FjaGVWYWx1ZShMT0FEX0ZBSUwpO1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlIGlzIGFuIGFycmF5LiBJbmplY3Rpb24gaXMgbm90IGNvbXBsZXRlIHNvIHJlZ2lzdGVyIGNhbGxiYWNrXG4gICAgICAgICAgICBzdmdJbmplY3RBdHRyaWJ1dGVWYWx1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBTVkdJbmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gZGVmYXVsdCBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBhbiBpbmplY3Rpb24uXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfTtcblxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNWR0luamVjdFxuICAgIFNWR0luamVjdC5jcmVhdGUgPSBjcmVhdGVTVkdJbmplY3Q7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW4gb25lcnJvciBFdmVudCBvZiBhbiBgPGltZz5gIGVsZW1lbnQgdG8gaGFuZGxlIGNhc2VzIHdoZW4gdGhlIGxvYWRpbmcgdGhlIG9yaWdpbmFsIHNyYyBmYWlsc1xuICAgICAqIChmb3IgZXhhbXBsZSBpZiBmaWxlIGlzIG5vdCBmb3VuZCBvciBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWRykuIFRoaXMgdHJpZ2dlcnMgYSBjYWxsIHRvIHRoZVxuICAgICAqIG9wdGlvbnMgb25GYWlsIGhvb2sgaWYgYXZhaWxhYmxlLiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB3aWxsIGJlIHNldCBhcyB0aGUgbmV3IHNyYyBhdHRyaWJ1dGVcbiAgICAgKiBmb3IgdGhlIGltZyBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBhbiBpbWcgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZmFsbGJhY2tTcmNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyIGZhbGxiYWNrIHNyY1xuICAgICAqL1xuICAgIFNWR0luamVjdC5lcnIgPSBmdW5jdGlvbihpbWcsIGZhbGxiYWNrU3JjKSB7XG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIGlmIChpbWdbX19TVkdJTkpFQ1RdICE9IEZBSUwpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWcpO1xuXG4gICAgICAgICAgaWYgKCFJU19TVkdfU1VQUE9SVEVEKSB7XG4gICAgICAgICAgICBzdmdOb3RTdXBwb3J0ZWQoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWcpO1xuICAgICAgICAgICAgbG9hZEZhaWwoaW1nLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmYWxsYmFja1NyYykge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZmFsbGJhY2tTcmM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdOb3RTZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93W2dsb2JhbE5hbWVdID0gU1ZHSW5qZWN0O1xuXG4gICAgcmV0dXJuIFNWR0luamVjdDtcbiAgfVxuXG4gIHZhciBTVkdJbmplY3RJbnN0YW5jZSA9IGNyZWF0ZVNWR0luamVjdCgnU1ZHSW5qZWN0Jyk7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTVkdJbmplY3RJbnN0YW5jZTtcbiAgfVxufSkod2luZG93LCBkb2N1bWVudCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1MaWdodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtTWVkaXVtLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1TZW1pQm9sZC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtQm9sZC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtRXh0cmFCb2xkLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUG9wcGlucyAqL1xuICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucyc7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fX30pO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xufVxuXG46cm9vdCB7XG4gICAgLyogY3VzdG9tIHZhcmlhYmxlcyAqL1xuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1BvcHBpbnMnLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgICAtLXRleHQtY29sb3ItcHJpbWFyeTogcmdiYSgzMiwgMzIsIDMyLCAxKTtcbiAgICAtLWJhY2tncm91bmQtcHJpbWFyeTogcmdiKDI1NSwgMjU1LCAyNTUpO1xuICAgIC0tYWNjZW50LXByaW1hcnk6IHJnYigxNzMsIDc3LCAyMzIpO1xuICAgIC0tYWNjZW50LXNlY29uZGFyeTogcmdiKDI0MSwgMjQxLCAyNDEpO1xuICAgIC0tYWNjZW50LXRlcnRpYXJ5OiAjMTY4REVFO1xuICAgIC0tcHJpb3JpdHktMS1jb2xvcjogI0Y4NDEyNTtcbiAgICAtLXByaW9yaXR5LTItY29sb3I6ICNmZmE1MDA7XG4gICAgLS1wcmlvcml0eS0zLWNvbG9yOiAjMTRFQkMwO1xuICAgIC0tcHJpb3JpdHktNC1jb2xvcjogIzllOWU5ZTtcbiAgICAtLWJ1dHRvbi1yYWRpdXM6IDAuMzVyZW07XG4gICAgLS1jaXJjbGUtcmFkaXVzOiA1MCU7XG4gICAgLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nOiAwLjI1cmVtO1xuICAgIC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICAtLWNvbHVtbi1nYXAtc21hbGw6IDAuMjVyZW07XG59XG5cbmJvZHkge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgIGFuaW1hdGlvbjogZmFkZS1pbiAyMDBtcyBlYXNlLWluO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlLWluIDIwMG1zIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IGZhZGUtaW4gMjAwbXMgZWFzZS1pbjtcbn1cblxuI3RvZG9fYXBwIHtcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XG59XG5cbiNjb250ZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNjb250ZW50IHtcbiAgICBkaXNwbGF5OiBncmlkO1xufVxuXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xufVxuXG4ub3ZlcmxheV9tYWluX2NvbnRlbnQuZGltIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xuICAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI21haW5fY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiA1JTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG59XG5cbiNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBhbmltYXRpb246IGZhZGUtaW4gMzAwbXMgZWFzZS1pbjtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZS1pbiAzMDBtcyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBmYWRlLWluIDMwMG1zIGVhc2UtaW47XG59XG5cbi8qIGdlbmVyYWwgc3R5bGVzIGZvciBzaW1pbGFyIGVsZW1lbnRzIGV4aXN0aW5nIG9uIGRpZmZlcmVudCBtb2R1bGVzICovXG5hLCBhOnZpc2l0ZWQge1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yLXByaW1hcnkpO1xufVxuXG4uaW1nX3dyYXBwZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbmRpYWxvZzpub3QoI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyk6bm90KCN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zKSB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1pbi13aWR0aDogNjB2dztcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICAgIGJvcmRlcjogbm9uZTtcbn1cblxuZGlhbG9nOjpiYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4ubmF2X3Byb2plY3QgPiBzdmcsXG4ucHJvamVjdF9jaXJjbGUge1xuICAgIGNvbG9yOiByZ2IoNzAsIDcwLCA3MCk7XG59XG5cbmJ1dHRvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tYnV0dG9uLXJhZGl1cyk7XG59XG5cbi5idG5faW1nX3dyYXBwZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5idXR0b24gPiBzdmcsXG5idXR0b24gPiAqID4gc3ZnIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IGNsYW1wKDEuMjVyZW0sIDIuNXZ3LCAxLjVyZW0pO1xufVxuXG4uZm9ybV9pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5mb3JtX2l0ZW06OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIHdpZHRoOiA5MCU7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xufVxuXG4uZm9ybV9pdGVtID4gKiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xufVxuXG4uZm9ybV9pdGVtID4gbGFiZWwge1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dCxcbi5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dCB7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XG59XG5cbi5uYXZfbGVmdCA+IC5jb250YWluZXIgPiAuaW5wdXRfc2VhcmNoOmZvY3VzLFxuLmZvcm1faXRlbSA+IC50YXNrX2lucHV0OmZvY3VzLFxuLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0OmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggLTFweCBpbnNldCByZ2JhKDAsIDAsIDAsIDEpO1xufVxuXG4uZm9ybV9idXR0b25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IDAuNXJlbTtcbiAgICAtbW96LWNvbHVtbi1nYXA6IDAuNXJlbTtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG4uZm9ybV9idXR0b25zID4gKiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNiwgMjI2LCAyMjYpO1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5mb3JtX2J1dHRvbnMgPiBidXR0b25bdHlwZT1cInN1Ym1pdFwiXSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xufVxuXG4uZm9ybV9idXR0b25zID4gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl06aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcbiAgICAtd2Via2l0LWZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+IGJ1dHRvbjpob3ZlciB7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xuICAgIC13ZWJraXQtZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xufVxuXG4uZm9ybV9idXR0b25zID4gKjphY3RpdmUge1xuICAgIGJveC1zaGFkb3c6IDBweCAycHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuOCk7XG59XG5cbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dDpob3Zlcjpub3QoOmZvY3VzKSxcbi5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dDpob3Zlcjpub3QoOmZvY3VzKSxcbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdDpob3Zlcixcbi5idG5fYWRkX3Byb2plY3Q6aG92ZXIsXG4uYnRuX2RlbGV0ZV9wcm9qZWN0OmhvdmVyLFxuLnRhc2tfYWN0aW9ucyA+IGJ1dHRvbjpob3ZlcixcbiNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XG4gICAgI21haW5fY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDIlIDIuNSUgMiUgMi41JTtcbiAgICB9XG5cbiAgICAjbWFpbl9jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgd2lkdGg6IDcwJTtcbiAgICB9XG5cbiAgICAjY29udGVudCB7XG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xuICAgIDAlIHtcbiAgICAgICAgb3BhY2l0eTogMCU7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIG9wYWNpdHk6IDEwMCU7XG4gICAgfVxufVxuXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBjYW4gaG92ZXIgKi9cbiAgICAuZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQ6bm90KDpmb2N1cyksXG4gICAgLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0Om5vdCg6Zm9jdXMpLFxuICAgIC5wcm9qZWN0cyA+Omxhc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdCxcbiAgICAuYnRuX2FkZF9wcm9qZWN0IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9hcHAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksOENBQThDO0lBQzlDLHNCQUFzQjtJQUN0Qjs7Ozs7K0NBS3VEO0FBQzNEOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLDhCQUE4QjtJQUM5QiwyQkFBMkI7SUFDM0IsU0FBUztJQUNULFVBQVU7SUFDVix1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsbURBQW1EO0lBQ25ELHlDQUF5QztJQUN6Qyx3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLHNDQUFzQztJQUN0QywwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsaUNBQWlDO0lBQ2pDLHVDQUF1QztJQUN2QywyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLHdDQUF3QztJQUN4QyxxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLFdBQVc7SUFDWCxZQUFZO0lBQ1osb0NBQW9DO0lBQ3BDLFVBQVU7SUFDVixxQ0FBcUM7SUFDckMsNkNBQTZDO0lBQzdDLDBDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLFVBQVU7SUFDVixxQ0FBcUM7SUFDckMsNkNBQTZDO0lBQzdDLDBDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLE9BQU87SUFDUCxXQUFXO0lBQ1gsYUFBYTtJQUNiLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLFdBQVc7SUFDWCxnQ0FBZ0M7SUFDaEMsd0NBQXdDO0lBQ3hDLHFDQUFxQztBQUN6Qzs7QUFFQSxzRUFBc0U7QUFDdEU7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTs7SUFFSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTs7SUFFSSxZQUFZO0lBQ1osb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLDJDQUEyQztJQUMzQyxZQUFZO0lBQ1osa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTs7SUFFSSxlQUFlO0lBQ2YsWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixvQkFBb0I7QUFDeEI7O0FBRUE7OztJQUdJLHdDQUF3QztJQUN4QyxhQUFhO0lBQ2IsbURBQW1EO0FBQ3ZEOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQiwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSx1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLDhDQUE4QztBQUNsRDs7QUFFQTs7Ozs7OztJQU9JLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJO1FBQ0ksd0JBQXdCO0lBQzVCOztJQUVBO1FBQ0ksVUFBVTtJQUNkOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLGFBQWE7SUFDakI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksV0FBVztJQUNmOztJQUVBO1FBQ0ksYUFBYTtJQUNqQjtBQUNKOztBQUVBO0lBQ0ksd0NBQXdDO0lBQ3hDOzs7O1FBSUksb0NBQW9DO0lBQ3hDO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIC8qIGh0dHBzOi8vZm9udHMuZ29vZ2xlLmNvbS9zcGVjaW1lbi9Qb3BwaW5zICovXFxuICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucyc7XFxuICAgIHNyYzogdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtTGlnaHQudHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1NZWRpdW0udHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1SZWd1bGFyLnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtU2VtaUJvbGQudHRmJyksXFxuICAgICAgICB1cmwoJy4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1Cb2xkLnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtRXh0cmFCb2xkLnR0ZicpO1xcbn1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAgIC8qIGN1c3RvbSB2YXJpYWJsZXMgKi9cXG4gICAgLS1mb250LWZhbWlseS1wcmltYXJ5OiAnUG9wcGlucycsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAtLXRleHQtY29sb3ItcHJpbWFyeTogcmdiYSgzMiwgMzIsIDMyLCAxKTtcXG4gICAgLS1iYWNrZ3JvdW5kLXByaW1hcnk6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gICAgLS1hY2NlbnQtcHJpbWFyeTogcmdiKDE3MywgNzcsIDIzMik7XFxuICAgIC0tYWNjZW50LXNlY29uZGFyeTogcmdiKDI0MSwgMjQxLCAyNDEpO1xcbiAgICAtLWFjY2VudC10ZXJ0aWFyeTogIzE2OERFRTtcXG4gICAgLS1wcmlvcml0eS0xLWNvbG9yOiAjRjg0MTI1O1xcbiAgICAtLXByaW9yaXR5LTItY29sb3I6ICNmZmE1MDA7XFxuICAgIC0tcHJpb3JpdHktMy1jb2xvcjogIzE0RUJDMDtcXG4gICAgLS1wcmlvcml0eS00LWNvbG9yOiAjOWU5ZTllO1xcbiAgICAtLWJ1dHRvbi1yYWRpdXM6IDAuMzVyZW07XFxuICAgIC0tY2lyY2xlLXJhZGl1czogNTAlO1xcbiAgICAtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmc6IDAuMjVyZW07XFxuICAgIC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG4gICAgLS1jb2x1bW4tZ2FwLXNtYWxsOiAwLjI1cmVtO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxuICAgIGFuaW1hdGlvbjogZmFkZS1pbiAyMDBtcyBlYXNlLWluO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZS1pbiAyMDBtcyBlYXNlLWluO1xcbiAgICAtbW96LWFuaW1hdGlvbjogZmFkZS1pbiAyMDBtcyBlYXNlLWluO1xcbn1cXG5cXG4jdG9kb19hcHAge1xcbiAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxuLm92ZXJsYXlfbWFpbl9jb250ZW50IHtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLm92ZXJsYXlfbWFpbl9jb250ZW50LmRpbSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiBvcGFjaXR5IDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jbWFpbl9jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgcGFkZGluZzogNSU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XFxufVxcblxcbiNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQgMWZyO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGFuaW1hdGlvbjogZmFkZS1pbiAzMDBtcyBlYXNlLWluO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZS1pbiAzMDBtcyBlYXNlLWluO1xcbiAgICAtbW96LWFuaW1hdGlvbjogZmFkZS1pbiAzMDBtcyBlYXNlLWluO1xcbn1cXG5cXG4vKiBnZW5lcmFsIHN0eWxlcyBmb3Igc2ltaWxhciBlbGVtZW50cyBleGlzdGluZyBvbiBkaWZmZXJlbnQgbW9kdWxlcyAqL1xcbmEsIGE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yLXByaW1hcnkpO1xcbn1cXG5cXG4uaW1nX3dyYXBwZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG5kaWFsb2c6bm90KCN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMpOm5vdCgjdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucykge1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIG1pbi13aWR0aDogNjB2dztcXG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG5kaWFsb2c6OmJhY2tkcm9wIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG5cXG4ubmF2X3Byb2plY3QgPiBzdmcsXFxuLnByb2plY3RfY2lyY2xlIHtcXG4gICAgY29sb3I6IHJnYig3MCwgNzAsIDcwKTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tYnV0dG9uLXJhZGl1cyk7XFxufVxcblxcbi5idG5faW1nX3dyYXBwZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmJ1dHRvbiA+IHN2ZyxcXG5idXR0b24gPiAqID4gc3ZnIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogY2xhbXAoMS4yNXJlbSwgMi41dncsIDEuNXJlbSk7XFxufVxcblxcbi5mb3JtX2l0ZW0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uZm9ybV9pdGVtOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgICB3aWR0aDogOTAlO1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICoge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gbGFiZWwge1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQsXFxuLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0IHtcXG4gICAgbWluLXdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxufVxcblxcbi5uYXZfbGVmdCA+IC5jb250YWluZXIgPiAuaW5wdXRfc2VhcmNoOmZvY3VzLFxcbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dDpmb2N1cyxcXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQ6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDVweCAtMXB4IGluc2V0IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IDAuNXJlbTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiAwLjVyZW07XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiAqIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNiwgMjI2LCAyMjYpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiBidXR0b25bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiBidXR0b25bdHlwZT1cXFwic3VibWl0XFxcIl06aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC44NSk7XFxuICAgIC13ZWJraXQtZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xcbiAgICAtd2Via2l0LWZpbHRlcjogYnJpZ2h0bmVzcygwLjg1KTtcXG59XFxuXFxuLmZvcm1fYnV0dG9ucyA+ICo6YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC44KTtcXG59XFxuXFxuLmZvcm1faXRlbSA+IC50YXNrX2lucHV0OmhvdmVyOm5vdCg6Zm9jdXMpLFxcbi5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dDpob3Zlcjpub3QoOmZvY3VzKSxcXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Q6aG92ZXIsXFxuLmJ0bl9hZGRfcHJvamVjdDpob3ZlcixcXG4uYnRuX2RlbGV0ZV9wcm9qZWN0OmhvdmVyLFxcbi50YXNrX2FjdGlvbnMgPiBidXR0b246aG92ZXIsXFxuI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XFxuICAgICNtYWluX2NvbnRlbnQge1xcbiAgICAgICAgcGFkZGluZzogMiUgMi41JSAyJSAyLjUlO1xcbiAgICB9XFxuXFxuICAgICNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICAgICAgd2lkdGg6IDcwJTtcXG4gICAgfVxcblxcbiAgICAjY29udGVudCB7XFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwJTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDEwMCU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChob3Zlcjogbm9uZSkge1xcbiAgICAvKiB0YXJnZXRzIG9ubHkgZGV2aWNlcyB0aGF0IGNhbiBob3ZlciAqL1xcbiAgICAuZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQ6bm90KDpmb2N1cyksXFxuICAgIC5mb3JtX2l0ZW0gPiAucHJvamVjdF9pbnB1dDpub3QoOmZvY3VzKSxcXG4gICAgLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0LFxcbiAgICAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGhlYWRlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIGFuaW1hdGlvbjogZmFkZS1pbiA0MDBtcyBlYXNlLWluO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlLWluIDQwMG1zIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IGZhZGUtaW4gNDAwbXMgZWFzZS1pbjtcbn1cblxuaGVhZGVyID4gI25hdmJhciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgcGFkZGluZzogMC42MHJlbSAwLjc1cmVtO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyID4gLm5hdl9sZWZ0ID4gLmNvbnRhaW5lciA+IC5idG5fbWVudSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIHRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcbiAgICAtbW96LXRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcbiAgICBmaWx0ZXI6IGludmVydCgwKTtcbiAgICAtd2Via2l0LWZpbHRlcjogaW52ZXJ0KDApO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyID4gLm5hdl9sZWZ0ID4gLmNvbnRhaW5lciA+IC5idG5fbWVudS5yb3RhdGUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgZmlsdGVyOiBpbnZlcnQoMSk7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGludmVydCgxKTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gKiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJ1dHRvbi1yYWRpdXMpO1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmcpO1xufVxuXG4jbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xuICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xufVxuXG5hLmdpdGh1Yjpob3ZlciA+IHN2ZyB7XG4gICAgZmlsdGVyOiBpbnZlcnQoMSk7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGludmVydCgxKTtcbn1cblxuLmlucHV0X3NlYXJjaCB7XG4gICAgd2lkdGg6IG1pbigzNTBweCwgNTAlKTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XG59XG5cbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICogPiBzdmcge1xuICAgIGhlaWdodDogYXV0bztcbiAgICB3aWR0aDogY2xhbXAoMS43NXJlbSwgM3Z3LCAyLjVyZW0pO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9oZWFkZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksdUNBQXVDO0lBQ3ZDLGdDQUFnQztJQUNoQyx3Q0FBd0M7SUFDeEMscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtJQUM5Qix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsK0JBQStCO0lBQy9CLDRCQUE0QjtJQUM1QixpQ0FBaUM7SUFDakMseUNBQXlDO0lBQ3pDLHNDQUFzQztJQUN0QyxpQkFBaUI7SUFDakIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLGdDQUFnQztJQUNoQyw2QkFBNkI7SUFDN0IsaUNBQWlDO0lBQ2pDLHlDQUF5QztJQUN6QyxzQ0FBc0M7SUFDdEMsaUJBQWlCO0lBQ2pCLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQ0FBbUM7SUFDbkMsMkNBQTJDO0lBQzNDLHdDQUF3QztBQUM1Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUNBQW1DO0lBQ25DLHNDQUFzQztBQUMxQzs7QUFFQTtJQUNJLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQ0FBa0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICBhbmltYXRpb246IGZhZGUtaW4gNDAwbXMgZWFzZS1pbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUtaW4gNDAwbXMgZWFzZS1pbjtcXG4gICAgLW1vei1hbmltYXRpb246IGZhZGUtaW4gNDAwbXMgZWFzZS1pbjtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcGFkZGluZzogMC42MHJlbSAwLjc1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gLm5hdl9sZWZ0ID4gLmNvbnRhaW5lciA+IC5idG5fbWVudSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcXG4gICAgZmlsdGVyOiBpbnZlcnQoMCk7XFxuICAgIC13ZWJraXQtZmlsdGVyOiBpbnZlcnQoMCk7XFxufVxcblxcbmhlYWRlciA+ICNuYXZiYXIgPiAubmF2X2xlZnQgPiAuY29udGFpbmVyID4gLmJ0bl9tZW51LnJvdGF0ZSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgNDAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDQwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IGFsbCA0MDBtcyBlYXNlLWluLW91dDtcXG4gICAgZmlsdGVyOiBpbnZlcnQoMSk7XFxuICAgIC13ZWJraXQtZmlsdGVyOiBpbnZlcnQoMSk7XFxufVxcblxcbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtbW96LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tYnV0dG9uLXJhZGl1cyk7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmcpO1xcbn1cXG5cXG4jbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcXG59XFxuXFxuYS5naXRodWI6aG92ZXIgPiBzdmcge1xcbiAgICBmaWx0ZXI6IGludmVydCgxKTtcXG4gICAgLXdlYmtpdC1maWx0ZXI6IGludmVydCgxKTtcXG59XFxuXFxuLmlucHV0X3NlYXJjaCB7XFxuICAgIHdpZHRoOiBtaW4oMzUwcHgsIDUwJSk7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XFxufVxcblxcbmhlYWRlciA+ICNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+ICogPiBzdmcge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiBjbGFtcCgxLjc1cmVtLCAzdncsIDIuNXJlbSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogc3R5bGVzIGZvciB0YXNrL3Byb2plY3QgbW9kYWwgcmVtb3ZhbCAqL1xuLmZvcm1fcmVtb3ZhbCB7XG4gICAgcGFkZGluZzogMXJlbTtcbn1cblxuLmZvcm1fcmVtb3ZhbCA+IGRpdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDAuNXJlbTtcbn1cblxuLml0ZW1fZm9yX3JlbW92YWwge1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tb2RhbF9yZW1vdmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwwQ0FBMEM7QUFDMUM7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksMEJBQTBCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlcyBmb3IgdGFzay9wcm9qZWN0IG1vZGFsIHJlbW92YWwgKi9cXG4uZm9ybV9yZW1vdmFsIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuLmZvcm1fcmVtb3ZhbCA+IGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLml0ZW1fZm9yX3JlbW92YWwge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBzdHlsZXMgZm9yIGxpc3Qgb2YgcHJvamVjdHMgb24gdGhlIGNvbnRlbnQgc2VjdGlvbiAqL1xuLnByb2plY3RzID46bGFzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQgMWZyO1xufVxuXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbiAgICAtbW96LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9wcm9qZWN0cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsdURBQXVEO0FBQ3ZEO0lBQ0ksYUFBYTtJQUNiLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsZUFBZTtJQUNmLHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsMkNBQTJDO0lBQzNDLHdDQUF3QztBQUM1Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIGxpc3Qgb2YgcHJvamVjdHMgb24gdGhlIGNvbnRlbnQgc2VjdGlvbiAqL1xcbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQgMWZyO1xcbn1cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XFxuICAgIGp1c3RpZnktc2VsZjogZW5kO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcXG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxuICAgIC1tb3otY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2Zvcm1fcHJvamVjdCA+ICNmb3JtIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjVyZW07XG59XG5cbiNmb3JtX3Byb2plY3QgPiAjZm9ybSA+IC5mb3JtX2l0ZW0gPiBsYWJlbCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZm9ybV9wcm9qZWN0ID4gI2Zvcm0ge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAwLjVyZW07XFxufVxcblxcbiNmb3JtX3Byb2plY3QgPiAjZm9ybSA+IC5mb3JtX2l0ZW0gPiBsYWJlbCB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5wcm9qZWN0c19saXN0ID4gKiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcm93LWdhcDogMC41cmVtO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aG92ZXIsXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSksXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpoYXMoPiBhLmFjdGl2ZSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aG92ZXIgc3Bhbixcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKTpob3ZlciBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaSA+IHNwYW4sXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSkgPiBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3QgPiBzcGFuIHtcbiAgICBmbGV4OiAxO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gZGl2ID4gLmJ0bl9hZGRfcHJvamVjdCxcbi5idG5fZGVsZXRlX3Byb2plY3Qge1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmcpO1xufVxuXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBjYW4gaG92ZXIgKi9cbiAgICAucHJvamVjdHNfbGlzdCA+ICogPiBsaSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgIC5wcm9qZWN0c19saXN0ID4gKiA+IGxpIHNwYW4sXG4gICAgLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpIHNwYW4ge1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcHJvamVjdHNfbGlzdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7OztJQUdJLG9DQUFvQztJQUNwQyxpQkFBaUI7QUFDckI7O0FBRUE7O0lBRUksbUJBQW1CO0FBQ3ZCOztBQUVBOztJQUVJLGtCQUFrQjtJQUNsQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxPQUFPO0FBQ1g7O0FBRUE7O0lBRUksc0NBQXNDO0FBQzFDOztBQUVBO0lBQ0ksd0NBQXdDO0lBQ3hDO1FBQ0ksaUJBQWlCO0lBQ3JCOztJQUVBOztRQUVJLG1CQUFtQjtJQUN2QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5wcm9qZWN0c19saXN0ID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHJvdy1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyLFxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKSxcXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpoYXMoPiBhLmFjdGl2ZSkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpob3ZlciBzcGFuLFxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKTpob3ZlciBzcGFuIHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGkgPiBzcGFuLFxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKSA+IHNwYW4ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleDogMTtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gKiA+IC5uYXZfcHJvamVjdCA+IHNwYW4ge1xcbiAgICBmbGV4OiAxO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gZGl2ID4gLmJ0bl9hZGRfcHJvamVjdCxcXG4uYnRuX2RlbGV0ZV9wcm9qZWN0IHtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZyk7XFxufVxcblxcbkBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcXG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBjYW4gaG92ZXIgKi9cXG4gICAgLnByb2plY3RzX2xpc3QgPiAqID4gbGkge1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIH1cXG5cXG4gICAgLnByb2plY3RzX2xpc3QgPiAqID4gbGkgc3BhbixcXG4gICAgLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpIHNwYW4ge1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNzaWRlYmFyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgei1pbmRleDogOTk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuI3NpZGViYXIuaGlkZSB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbiNzaWRlYmFyLnNob3cge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcbiAgICAtbW96LXRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI3NpZGViYXIgPiAuY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDFyZW07XG4gICAgcGFkZGluZzogMS4yNXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtc2Vjb25kYXJ5KTtcbiAgICBib3gtc2hhZG93OiAxcHggNHB4IDVweCAtMXB4IHJnYmEoMCwgMCwgMCwgMSk7XG4gICAgd2lkdGg6IG1pbig3NSUsIDM1MHB4KTtcbn1cblxuLm5hdl9wcm9qZWN0LFxuLm5hdl9wcm9qZWN0cyB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjc1cmVtO1xuICAgIC1tb3otY29sdW1uLWdhcDogMC43NXJlbTtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzIHtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPjpmaXJzdC1jaGlsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbiNzaWRlYmFyID4gLmNvbnRhaW5lcjpob3ZlciAuYnRuX2FkZF9wcm9qZWN0IHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkID4gLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XG4gICAgI3NpZGViYXIge1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICB9XG5cbiAgICAjc2lkZWJhci5zaG93IHtcbiAgICAgICAgd2lkdGg6IG1pbig0MCUsIDM1MHB4KTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGFuaW1hdGlvbjogc2xpZGUtaW4tcmlnaHQgMzAwbXMgZWFzZS1pbi1vdXQ7XG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcbiAgICAgICAgLW1vei1hbmltYXRpb246IHNsaWRlLWluLXJpZ2h0IDMwMG1zIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICAgICNzaWRlYmFyLmhpZGUge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3gtc2hhZG93OiAxcHggNHB4IDVweCAtMXB4IHJnYmEoMCwgMCwgMCwgMSk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLWluLXJpZ2h0IHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICB9XG59XG5cbkBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcbiAgICAvKiB0YXJnZXRzIG9ubHkgZGV2aWNlcyB0aGF0IGNhbiBob3ZlciAqL1xuICAgICNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgI3NpZGViYXIgPiAuY29udGFpbmVyOmhvdmVyIC5idG5fYWRkX3Byb2plY3Qge1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc2lkZWJhci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QixvQ0FBb0M7SUFDcEMsaUNBQWlDO0lBQ2pDLGlDQUFpQztJQUNqQyx5Q0FBeUM7SUFDekMsc0NBQXNDO0FBQzFDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixpQ0FBaUM7SUFDakMsOEJBQThCO0lBQzlCLHVDQUF1QztJQUN2QywrQ0FBK0M7SUFDL0MsNENBQTRDO0FBQ2hEOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQix5Q0FBeUM7SUFDekMsNkNBQTZDO0lBQzdDLHNCQUFzQjtBQUMxQjs7QUFFQTs7SUFFSSxxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLDJCQUEyQjtJQUMzQix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksT0FBTztJQUNQLHdDQUF3QztBQUM1Qzs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSTtRQUNJLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsY0FBYztJQUNsQjs7SUFFQTtRQUNJLHNCQUFzQjtRQUN0QixjQUFjO1FBQ2QsMkNBQTJDO1FBQzNDLG1EQUFtRDtRQUNuRCxnREFBZ0Q7SUFDcEQ7O0lBRUE7UUFDSSxhQUFhO0lBQ2pCOztJQUVBO1FBQ0ksV0FBVztRQUNYLDZDQUE2QztJQUNqRDtBQUNKOztBQUVBO0lBQ0k7UUFDSSw0QkFBNEI7UUFDNUIsb0NBQW9DO1FBQ3BDLGlDQUFpQztJQUNyQzs7SUFFQTtRQUNJLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsOEJBQThCO0lBQ2xDO0FBQ0o7O0FBRUE7SUFDSSx3Q0FBd0M7SUFDeEM7UUFDSSxpQkFBaUI7SUFDckI7O0lBRUE7UUFDSSxtQkFBbUI7UUFDbkIsNEJBQTRCO0lBQ2hDO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI3NpZGViYXIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB6LWluZGV4OiA5OTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbiNzaWRlYmFyLmhpZGUge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDMwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IGFsbCAzMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI3NpZGViYXIuc2hvdyB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogdHJhbnNmb3JtIDMwMG1zIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI3NpZGViYXIgPiAuY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxLjI1cmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtc2Vjb25kYXJ5KTtcXG4gICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xcbiAgICB3aWR0aDogbWluKDc1JSwgMzUwcHgpO1xcbn1cXG5cXG4ubmF2X3Byb2plY3QsXFxuLm5hdl9wcm9qZWN0cyB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjc1cmVtO1xcbiAgICAtbW96LWNvbHVtbi1nYXA6IDAuNzVyZW07XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzIHtcXG4gICAgZmxleDogMTtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+OmZpcnN0LWNoaWxkIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiNzaWRlYmFyID4gLmNvbnRhaW5lcjpob3ZlciAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xcbiAgICAjc2lkZWJhciB7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIHdpZHRoOiBpbmhlcml0O1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyLnNob3cge1xcbiAgICAgICAgd2lkdGg6IG1pbig0MCUsIDM1MHB4KTtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcXG4gICAgfVxcblxcbiAgICAjc2lkZWJhci5oaWRlIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIgPiAuY29udGFpbmVyIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGUtaW4tcmlnaHQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XFxuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgY2FuIGhvdmVyICovXFxuICAgICNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lcjpob3ZlciAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ljb25zL2NoZXZyb25fZG93bi5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNmb3JtX3Rhc2s6OmJhY2tkcm9wICB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4jZm9ybV90YXNrID4gLmZvcm0ge1xuICAgIHBhZGRpbmc6IDFyZW07XG59XG5cbiNmb3JtX3Rhc2sgPiAuZm9ybSA+IGRpdixcbi5mb3JtX3Rhc2sgPiBkaXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjVyZW07XG59XG5cbi5mb3JtX2l0ZW0gPiAjZGVzY3JpcHRpb24ge1xuICAgIHJlc2l6ZTogdmVydGljYWw7XG4gICAgbWF4LWhlaWdodDogMjAwcHg7XG59XG5cbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5LFxuLmZvcm1faXRlbSA+ICNidG5fcHJvamVjdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXApO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC50YXNrX3ByaW9yaXR5LFxuLmZvcm1faXRlbSA+ICNidG5fcHJvamVjdCA+IC50YXNrX3Byb2plY3Qge1xuICAgIGZsZXg6IDE7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHk6aG92ZXIgLmltZ193cmFwcGVyX2NoZXZyb24ge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5ID4gLmltZ193cmFwcGVyX2NoZXZyb24ge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmZvcm1faXRlbSA+ICNwcm9qZWN0IHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiA1MCU7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTs7SUFFSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBOztJQUVJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLDJDQUEyQztJQUMzQyx3Q0FBd0M7SUFDeEMsd0NBQXdDO0FBQzVDOztBQUVBOztJQUVJLE9BQU87SUFDUCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIseURBQXlEO0lBQ3pELDRCQUE0QjtJQUM1QiwyQkFBMkI7SUFDM0IsMEJBQTBCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNmb3JtX3Rhc2s6OmJhY2tkcm9wICB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxuI2Zvcm1fdGFzayA+IC5mb3JtIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuI2Zvcm1fdGFzayA+IC5mb3JtID4gZGl2LFxcbi5mb3JtX3Rhc2sgPiBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAwLjVyZW07XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjZGVzY3JpcHRpb24ge1xcbiAgICByZXNpemU6IHZlcnRpY2FsO1xcbiAgICBtYXgtaGVpZ2h0OiAyMDBweDtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHksXFxuLmZvcm1faXRlbSA+ICNidG5fcHJvamVjdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXApO1xcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtbW96LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC50YXNrX3ByaW9yaXR5LFxcbi5mb3JtX2l0ZW0gPiAjYnRuX3Byb2plY3QgPiAudGFza19wcm9qZWN0IHtcXG4gICAgZmxleDogMTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHk6aG92ZXIgLmltZ193cmFwcGVyX2NoZXZyb24ge1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC5pbWdfd3JhcHBlcl9jaGV2cm9uIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI3Byb2plY3Qge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2ZycpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogNTAlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC50YXNrc19saXN0IHtcbiAgICBtYXJnaW4tdG9wOiAxcmVtXG59XG5cbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcbiAgICByb3ctZ2FwOiAxcmVtO1xufVxuXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXg6IDE7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQgPiBkaXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjVyZW07XG59XG5cbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkID4gZGl2ID4gLmZvcm1fdGFzayB7XG4gICAgbWFyZ2luOiAxcmVtIDA7XG4gICAgcGFkZGluZzogNSU7XG4gICAgYm94LXNoYWRvdzogMCAwIDlweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW1cbn1cblxuZGl2W3JvbGU9YnV0dG9uXS50YXNrX25ldyB7XG4gICAgYW5pbWF0aW9uOiBmYWRlLWluLXNjYWxlIDIwMG1zIGVhc2UtaW47XG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUtaW4tc2NhbGUgMjAwbXMgZWFzZS1pbjtcbiAgICAtbW96LWFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xufVxuXG5kaXZbcm9sZT1idXR0b25dIHtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg2NiwgNjYsIDY2LCAwLjUpO1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgYm9yZGVyLXJhZGl1czogMC40NXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwYWRkaW5nOiAxcmVtIDAuMjVyZW07XG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IDAuNzVyZW07XG4gICAgLW1vei1jb2x1bW4tZ2FwOiAwLjc1cmVtO1xufVxuXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xufVxuXG4uYnRuX2NoZWNrYm94X3Rhc2sgPiAuY2hlY2tib3hfY2lyY2xlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNpcmNsZS1yYWRpdXMpO1xufVxuXG4uYnRuX2NoZWNrYm94X3Rhc2sgPiAuY2hlY2tib3hfY2lyY2xlID4gc3ZnIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzazpob3ZlciA+LmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XG4gICAgb3BhY2l0eTogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDI1JSwgdHJhbnNwYXJlbnQpO1xufVxuXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzEge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8yIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XG59XG5cbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMyB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xufVxuXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzQge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS00LWNvbG9yKTtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XG59XG5cbi50YXNrX2xpc3RfaXRlbV9jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjM1cmVtO1xufVxuXG4udGFza19saXN0X2l0ZW1fY29udGVudCA+IC50YXNrX25hbWUge1xuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciAudGFza19hY3Rpb25ze1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi50YXNrX2FjdGlvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4udGFza19hY3Rpb25zID4gYnV0dG9uIHtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nKTtcbn1cblxuLnRhc2tfYWN0aW9ucyA+IGJ1dHRvbiA+IHN2ZyB7XG4gICAgd2lkdGg6IGNsYW1wKDEuNXJlbSwgM3Z3LCAycmVtKTtcbn1cblxuLmJ0bl9kYXRlX3Rhc2sge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjVyZW07XG4gICAgLW1vei1jb2x1bW4tZ2FwOiAwLjVyZW07XG59XG5cbi5idG5fZGF0ZV90YXNrID4gc3BhbiB7XG4gICAgd29yZC1zcGFjaW5nOiAwLjE1cmVtO1xufVxuXG5saSA+IC5idG5fYWRkX3Rhc2sge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIC13ZWJraXQtY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbn1cblxubGkgPiBidXR0b24uYnRuX2FkZF90YXNrOmhvdmVyID4gZGl2IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XG59XG5cbmxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzazpob3ZlciA+IHNwYW4ge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbkBrZXlmcmFtZXMgZmFkZS1pbi1zY2FsZSB7XG4gICAgMCUge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxufVxuXG5AbWVkaWEgKGhvdmVyOiBub25lKSB7XG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBkb24ndCBob3ZlciAqL1xuICAgIC50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIgPiAuYnRuX2NoZWNrYm94X3Rhc2sgPi5jaGVja2JveF9jaXJjbGUgPiBzdmcge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDI1JSwgdHJhbnNwYXJlbnQpO1xuICAgIH1cblxuICAgIGRpdltyb2xlPWJ1dHRvbl0ge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNDVyZW07XG4gICAgfVxuXG4gICAgZGl2W3JvbGU9YnV0dG9uXSAudGFza19hY3Rpb25ze1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIH1cblxuICAgIGxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzayA+IGRpdiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAgICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNpcmNsZS1yYWRpdXMpO1xuICAgIH1cblxuICAgIGxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzayA+IHNwYW4ge1xuICAgICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Rhc2tzX2xpc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0k7QUFDSjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsV0FBVztJQUNYLDJDQUEyQztJQUMzQztBQUNKOztBQUVBO0lBQ0ksc0NBQXNDO0lBQ3RDLDhDQUE4QztJQUM5QywyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSw4Q0FBOEM7SUFDOUMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7SUFDZiwyQ0FBMkM7SUFDM0Msc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsMkJBQTJCO0lBQzNCLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2Isc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixnQ0FBZ0M7SUFDaEMsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksY0FBYztJQUNkLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksVUFBVTtJQUNWLG1FQUFtRTtBQUN2RTs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5Qiw4QkFBOEI7SUFDOUIsbUVBQW1FO0FBQ3ZFOztBQUVBO0lBQ0ksOEJBQThCO0lBQzlCLDhCQUE4QjtJQUM5QixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0lBQzlCLG1FQUFtRTtBQUN2RTs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5Qiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxPQUFPO0lBQ1AsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHNDQUFzQztBQUMxQzs7QUFFQTtJQUNJLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsMkNBQTJDO0lBQzNDLHdDQUF3QztBQUM1Qzs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QyxnQ0FBZ0M7SUFDaEMsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtRQUNWLG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0Isd0JBQXdCO0lBQzVCOztJQUVBO1FBQ0ksVUFBVTtRQUNWLG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsMkJBQTJCO0lBQy9CO0FBQ0o7O0FBRUE7SUFDSSwwQ0FBMEM7SUFDMUM7UUFDSSxVQUFVO1FBQ1YsbUVBQW1FO0lBQ3ZFOztJQUVBO1FBQ0ksZUFBZTtRQUNmLDJDQUEyQztRQUMzQyxzQkFBc0I7SUFDMUI7O0lBRUE7UUFDSSxtQkFBbUI7SUFDdkI7O0lBRUE7UUFDSSx1Q0FBdUM7UUFDdkMsZ0NBQWdDO1FBQ2hDLG1DQUFtQztJQUN2Qzs7SUFFQTtRQUNJLDRCQUE0QjtRQUM1QixpQkFBaUI7SUFDckI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIudGFza3NfbGlzdCB7XFxuICAgIG1hcmdpbi10b3A6IDFyZW1cXG59XFxuXFxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXg6IDE7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkID4gZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCA+IGRpdiA+IC5mb3JtX3Rhc2sge1xcbiAgICBtYXJnaW46IDFyZW0gMDtcXG4gICAgcGFkZGluZzogNSU7XFxuICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbVxcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dLnRhc2tfbmV3IHtcXG4gICAgYW5pbWF0aW9uOiBmYWRlLWluLXNjYWxlIDIwMG1zIGVhc2UtaW47XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlLWluLXNjYWxlIDIwMG1zIGVhc2UtaW47XFxuICAgIC1tb3otYW5pbWF0aW9uOiBmYWRlLWluLXNjYWxlIDIwMG1zIGVhc2UtaW47XFxufVxcblxcbmRpdltyb2xlPWJ1dHRvbl0ge1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg2NiwgNjYsIDY2LCAwLjUpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbmRpdltyb2xlPWJ1dHRvbl06aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNDVyZW07XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiAxcmVtIDAuMjVyZW07XFxuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XFxuICAgIC13ZWJraXQtY29sdW1uLWdhcDogMC43NXJlbTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiAwLjc1cmVtO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uYnRuX2NoZWNrYm94X3Rhc2sgPiAuY2hlY2tib3hfY2lyY2xlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyOiAzcHggc29saWQ7XFxuICAgIGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcXG59XFxuXFxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XFxuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNpcmNsZS1yYWRpdXMpO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrOmhvdmVyID4uY2hlY2tib3hfY2lyY2xlID4gc3ZnIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyNSUsIHRyYW5zcGFyZW50KTtcXG59XFxuXFxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8xIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTEtY29sb3IpO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XFxufVxcblxcbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMiB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0yLWNvbG9yKTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xcbn1cXG5cXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzMge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMy1jb2xvcik7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcXG59XFxuXFxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV80IHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTQtY29sb3IpO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbV9jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC4zNXJlbTtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtX2NvbnRlbnQgPiAudGFza19uYW1lIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIC50YXNrX2FjdGlvbnN7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi50YXNrX2FjdGlvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4udGFza19hY3Rpb25zID4gYnV0dG9uIHtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZyk7XFxufVxcblxcbi50YXNrX2FjdGlvbnMgPiBidXR0b24gPiBzdmcge1xcbiAgICB3aWR0aDogY2xhbXAoMS41cmVtLCAzdncsIDJyZW0pO1xcbn1cXG5cXG4uYnRuX2RhdGVfdGFzayB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiAwLjVyZW07XFxuICAgIC1tb3otY29sdW1uLWdhcDogMC41cmVtO1xcbn1cXG5cXG4uYnRuX2RhdGVfdGFzayA+IHNwYW4ge1xcbiAgICB3b3JkLXNwYWNpbmc6IDAuMTVyZW07XFxufVxcblxcbmxpID4gLmJ0bl9hZGRfdGFzayB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XFxuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtd2Via2l0LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbiAgICAtbW96LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xcbn1cXG5cXG5saSA+IGJ1dHRvbi5idG5fYWRkX3Rhc2s6aG92ZXIgPiBkaXYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XFxuICAgIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcXG59XFxuXFxubGkgPiBidXR0b24uYnRuX2FkZF90YXNrOmhvdmVyID4gc3BhbiB7XFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4tc2NhbGUge1xcbiAgICAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcXG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBkb24ndCBob3ZlciAqL1xcbiAgICAudGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrID4uY2hlY2tib3hfY2lyY2xlID4gc3ZnIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDI1JSwgdHJhbnNwYXJlbnQpO1xcbiAgICB9XFxuXFxuICAgIGRpdltyb2xlPWJ1dHRvbl0ge1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDlweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNDVyZW07XFxuICAgIH1cXG5cXG4gICAgZGl2W3JvbGU9YnV0dG9uXSAudGFza19hY3Rpb25ze1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgfVxcblxcbiAgICBsaSA+IGJ1dHRvbi5idG5fYWRkX3Rhc2sgPiBkaXYge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICAgICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcXG4gICAgfVxcblxcbiAgICBsaSA+IGJ1dHRvbi5idG5fYWRkX3Rhc2sgPiBzcGFuIHtcXG4gICAgICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XFxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlcyBmb3IgcHJpb3JpdHkgb3B0aW9ucyBmcm9tIHRhc2tzX3ByaW9yaXR5LmpzIG1vZHVsZSAqL1xuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9uczo6YmFja2Ryb3AsXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9uczo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyxcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMge1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNnB4IC0ycHggcmdiKDAsIDAsIDApO1xufVxuXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpLFxuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbiAgICAtbW96LWNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaTpob3ZlcixcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICAgIHBhZGRpbmc6IDAuOHJlbTtcbn1cblxuLyogdGFzayBwcmlvcml0aWVzICovXG4ucHJpb3JpdHlfMSB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTEtY29sb3IpO1xufVxuXG4ucHJpb3JpdHlfMiB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTItY29sb3IpO1xufVxuXG4ucHJpb3JpdHlfMyB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xufVxuXG4ucHJpb3JpdHlfNCAge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS00LWNvbG9yKTtcbn1cblxuQG1lZGlhIChob3Zlcjogbm9uZSkge1xuICAgIC8qIHRhcmdldHMgb25seSBkZXZpY2VzIHRoYXQgY2FuIGhvdmVyICovXG4gICAgI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSxcbiAgICAjdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGkge1xuICAgICAgICBwYWRkaW5nOiAwLjhyZW07XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YXNrc19vcHRpb25zLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw4REFBOEQ7QUFDOUQ7O0lBRUksNkJBQTZCO0FBQ2pDOztBQUVBOztJQUVJLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1oseUNBQXlDO0FBQzdDOztBQUVBOztJQUVJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUNBQW1DO0lBQ25DLDJDQUEyQztJQUMzQyx3Q0FBd0M7SUFDeEMsZUFBZTtBQUNuQjs7QUFFQTs7SUFFSSxvQ0FBb0M7SUFDcEMsZUFBZTtBQUNuQjs7QUFFQSxvQkFBb0I7QUFDcEI7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSx3Q0FBd0M7SUFDeEM7O1FBRUksZUFBZTtJQUNuQjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlcyBmb3IgcHJpb3JpdHkgb3B0aW9ucyBmcm9tIHRhc2tzX3ByaW9yaXR5LmpzIG1vZHVsZSAqL1xcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnM6OmJhY2tkcm9wLFxcbiN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyxcXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDZweCAtMnB4IHJnYigwLCAwLCAwKTtcXG59XFxuXFxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSxcXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLXdlYmtpdC1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgLW1vei1jb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpOmhvdmVyLFxcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgcGFkZGluZzogMC44cmVtO1xcbn1cXG5cXG4vKiB0YXNrIHByaW9yaXRpZXMgKi9cXG4ucHJpb3JpdHlfMSB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcXG59XFxuXFxuLnByaW9yaXR5XzIge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XFxufVxcblxcbi5wcmlvcml0eV8zIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xcbn1cXG5cXG4ucHJpb3JpdHlfNCAge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XFxufVxcblxcbkBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcXG4gICAgLyogdGFyZ2V0cyBvbmx5IGRldmljZXMgdGhhdCBjYW4gaG92ZXIgKi9cXG4gICAgI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSxcXG4gICAgI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpIHtcXG4gICAgICAgIHBhZGRpbmc6IDAuOHJlbTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9oZWFkZXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9oZWFkZXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21vZGFsX3JlbW92YWwuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tb2RhbF9yZW1vdmFsLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0cy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19mb3JtLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfZm9ybS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfbGlzdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2xpc3QuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpZGViYXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaWRlYmFyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19mb3JtLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfZm9ybS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfbGlzdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2xpc3QuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX29wdGlvbnMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19vcHRpb25zLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IFNWR0luamVjdCBmcm9tICdAaWNvbmZ1L3N2Zy1pbmplY3QnO1xuaW1wb3J0IGJ1aWxkSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xuaW1wb3J0IGJ1aWxkU2lkZUJhciBmcm9tICcuL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyJztcbmltcG9ydCBidWlsZE1haW4gZnJvbSAnLi9jb21wb25lbnRzL21haW4nO1xuaW1wb3J0IHsgc2V0UHJvamVjdHMgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XG5pbXBvcnQgYnVpbGRPdmVybGF5IGZyb20gJy4vY29tcG9uZW50cy9vdmVybGF5Jztcbi8vIFNWR0luamVjdFxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvQGljb25mdS9zdmctaW5qZWN0XG5cbmltcG9ydCAnLi9hcHAuY3NzJztcblxuKCgpID0+IHtcbiAgY29uc3QgYnVpbGQgPSB7XG4gICAgaGVhZGVyOiBidWlsZEhlYWRlcixcbiAgICBzaWRlYmFyOiBidWlsZFNpZGVCYXIsXG4gICAgb3ZlcmxheTogYnVpbGRPdmVybGF5LFxuICAgIG1haW46IGJ1aWxkTWFpbixcbiAgfTtcblxuICBjb25zdCBhcHAgPSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHNldFByb2plY3RzKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgYXBwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgYXBwQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYXBwV3JhcHBlci5pZCA9ICd0b2RvX2FwcCc7XG4gICAgICBhcHBDb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuXG4gICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkLmhlYWRlcigpKTtcbiAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQub3ZlcmxheSgpKTtcbiAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQuc2lkZWJhcigpKTtcbiAgICAgIGFwcENvbnRlbnQuYXBwZW5kQ2hpbGQoYnVpbGQubWFpbigpKTtcbiAgICAgIGFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwQ29udGVudCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwV3JhcHBlcik7XG4gICAgfSxcbiAgfTtcblxuICBhcHAuaW5pdCgpO1xufSkoKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2FkZC5zdmdcIixcblx0XCIuL2NoZWNrX3NtYWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmdcIixcblx0XCIuL2NoZXZyb25fZG93bi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vY2lyY2xlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NvZy5zdmdcIixcblx0XCIuL2RhdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RhdGUuc3ZnXCIsXG5cdFwiLi9kZWxldGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIixcblx0XCIuL2VkaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCIsXG5cdFwiLi9mbGFnLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9mbGFnLnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLXdoaXRlLnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmsuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLnN2Z1wiLFxuXHRcIi4vaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaG9tZS5zdmdcIixcblx0XCIuL2luYm94LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIixcblx0XCIuL21hZ25pZnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21hZ25pZnkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIixcblx0XCIuL3RvZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgcmVjdXJzaXZlIFxcXFwuc3ZnJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hZGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2FkZC5zdmdcIixcblx0XCIuL2NoZWNrX3NtYWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmdcIixcblx0XCIuL2NoZXZyb25fZG93bi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vY2lyY2xlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NvZy5zdmdcIixcblx0XCIuL2RhdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RhdGUuc3ZnXCIsXG5cdFwiLi9kZWxldGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIixcblx0XCIuL2VkaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCIsXG5cdFwiLi9mbGFnLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9mbGFnLnN2Z1wiLFxuXHRcIi4vaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaG9tZS5zdmdcIixcblx0XCIuL2luYm94LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIixcblx0XCIuL21hZ25pZnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21hZ25pZnkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIixcblx0XCIuL3RvZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwiaW1wb3J0IEljb25BZGQgZnJvbSBcIi4uL2Fzc2V0cy9pY29ucy9hZGQuc3ZnXCI7XG5pbXBvcnQgSWNvbkRlbGV0ZSBmcm9tIFwiLi4vYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIjtcbmltcG9ydCBJY29uRWRpdCBmcm9tIFwiLi4vYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCI7XG5pbXBvcnQgSWNvbkNpcmNsZSBmcm9tIFwiLi4vYXNzZXRzL2ljb25zL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnXCI7XG5pbXBvcnQgSWNvbkRhdGUgZnJvbSBcIi4uL2Fzc2V0cy9pY29ucy9kYXRlLnN2Z1wiO1xuaW1wb3J0IEljb25DaGVjayBmcm9tIFwiLi4vYXNzZXRzL2ljb25zL2NoZWNrX3NtYWxsLnN2Z1wiO1xuXG5jb25zdCBpY29ucyA9IHtcbiAgYWRkOiBJY29uQWRkLFxuICBkZWxldGU6IEljb25EZWxldGUsXG4gIGVkaXQ6IEljb25FZGl0LFxuICBjaXJjbGU6IEljb25DaXJjbGUsXG4gIGNoZWNrYm94OiBJY29uQ2hlY2ssXG4gIGRhdGU6IEljb25EYXRlLFxufTtcblxuY29uc3QgYnV0dG9uQXR0cmlidXRlcyA9ICh0eXBlLCBuYW1lKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbiA9IHtcbiAgICAvLyBjbGFzc05hbWU6IGJ0bl9kZWxldGVfcHJvamVjdFxuICAgIGNsYXNzTmFtZTogYGJ0bl8ke3R5cGV9XyR7bmFtZX1gLFxuICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gIH07XG4gIHJldHVybiBidXR0b247XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEJ1dHRvbih0eXBlLCBuYW1lLCB0ZXh0KSB7XG4gIGNvbnN0IGJ1dHRvbiA9IE9iamVjdC5hc3NpZ24oXG4gICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSxcbiAgICBidXR0b25BdHRyaWJ1dGVzKHR5cGUsIG5hbWUpXG4gICk7XG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gIGltYWdlLnNyYyA9IGljb25zW3R5cGVdO1xuICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJvbmxvYWRcIiwgXCJTVkdJbmplY3QodGhpcylcIik7XG5cbiAgaWYgKHRleHQpIHtcbiAgICBjb25zdCBpbWFnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGltYWdlV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYnRuX2ltZ193cmFwcGVyXCIpO1xuICAgIGltYWdlV3JhcHBlci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHNwYW4udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXIpO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICBjb25zdCBjaGVja2JveEJvcmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNoZWNrYm94Qm9yZGVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveF9jaXJjbGVcIik7XG4gICAgY2hlY2tib3hCb3JkZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChjaGVja2JveEJvcmRlcik7XG4gIH0gZWxzZSB7XG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgfVxuXG4gIHJldHVybiBidXR0b247XG59XG4iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gXCIuLi91dGlsaXRpZXMvaW1wb3J0LWFsbFwiO1xuaW1wb3J0IHB1YlN1YiBmcm9tIFwiLi4vY29udGFpbmVycy9wdWJzdWJcIjsgLy8gY29ubmVjdCAuYnRuX2hvbWUgdG8gbWFpbkNvbnRlbnQuc3dpdGNoQ29udGVudFxuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL3Rhc2tzX2Zvcm1cIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9oZWFkZXIuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkSGVhZGVyKGFwcCwgY29udGVudCkge1xuICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXIucmVuZGVyKCkpO1xuICBoZWFkZXIuY2FjaGVET00oaGVhZGVyRWxlbWVudCk7XG4gIGhlYWRlci5iaW5kRXZlbnRzKCk7XG4gIHJldHVybiBoZWFkZXJFbGVtZW50O1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KFwiLi4vYXNzZXRzL2ljb25zXCIsIHRydWUsIC9cXC5zdmckLykpLFxufTtcblxuY29uc3QgaGVhZGVyID0ge1xuICBjYWNoZURPTShjb250YWluZXIpIHtcbiAgICB0aGlzLmJ0bk1lbnUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5idG5fbWVudVwiKTtcbiAgICB0aGlzLmJ0bkhvbWUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5idG5faG9tZVwiKTtcbiAgICB0aGlzLmJ0bkFkZFRhc2sgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5idG5fYWRkX3Rhc2tcIik7XG4gICAgdGhpcy5pbnB1dFNlYXJjaCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmlucHV0X3NlYXJjaFwiKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnB1Ymxpc2ggPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKTtcbiAgICB0aGlzLmFuaW1hdGVOYXYgPSB0aGlzLmFuaW1hdGVOYXYuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucHVibGlzaCk7XG4gICAgdGhpcy5idG5Ib21lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnB1Ymxpc2gpO1xuICAgIHRoaXMuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVpbGRUYXNrc0Zvcm0pO1xuICAgIHRoaXMuaW5wdXRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcInNlYXJjaFwiLCB0aGlzLnNlYXJjaCk7XG4gICAgcHViU3ViLnN1YnNjcmliZShcImFuaW1hdGVfbmF2XCIsIHRoaXMuYW5pbWF0ZU5hdik7IC8vdGVzdGluZ1xuICB9LFxuICBoZWFkZXJDb250ZW50OiB7XG4gICAgaGVhZGVyTGVmdDogW1xuICAgICAge1xuICAgICAgICBlbGVtZW50OiBcImJ1dHRvblwiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcImJ0bl9tZW51XCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkRWxlbWVudDogXCJpbWdcIixcbiAgICAgICAgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbXCJtZW51LnN2Z1wiXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6IFwiYnV0dG9uXCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuX2hvbWUgdG9kYXlcIixcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRFbGVtZW50OiBcImltZ1wiLFxuICAgICAgICBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1tcImhvbWUuc3ZnXCJdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogXCJpbnB1dFwiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcImlucHV0X3NlYXJjaFwiLFxuICAgICAgICAgIHR5cGU6IFwic2VhcmNoXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIlNlYXJjaFwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGhlYWRlclJpZ2h0OiBbXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6IFwiYnV0dG9uXCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuX2FkZF90YXNrXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkRWxlbWVudDogXCJpbWdcIixcbiAgICAgICAgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbXCJhZGQuc3ZnXCJdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogXCJhXCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwiZ2l0aHViXCIsXG4gICAgICAgICAgaHJlZjogXCJodHRwczovL2dpdGh1Yi5jb20vbWlrZXlDb3MvdGhlT2RpblByb2plY3QvdHJlZS9tYWluL2phdmFTY3JpcHQvcHJvamVjdHMvdG9kby1saXN0XCIsXG4gICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICB9LFxuICAgICAgICBjaGlsZEVsZW1lbnQ6IFwiaW1nXCIsXG4gICAgICAgIHNyYzogYXNzZXRzLmljb25zLmZpbGVzW1wiZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCJdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG4gICAgaGVhZGVyRWxlbWVudC5pZCA9IFwibmF2YmFyXCI7XG5cbiAgICBmb3IgKGxldCBzZWN0aW9uIGluIHRoaXMuaGVhZGVyQ29udGVudCkge1xuICAgICAgY29uc3QgaGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbGV0IHdyYXBwZXJDbGFzcztcbiAgICAgIHNlY3Rpb24gPT09IFwiaGVhZGVyTGVmdFwiXG4gICAgICAgID8gKHdyYXBwZXJDbGFzcyA9IFwibmF2X2xlZnRcIilcbiAgICAgICAgOiAod3JhcHBlckNsYXNzID0gXCJuYXZfcmlnaHRcIik7XG4gICAgICBoZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQod3JhcHBlckNsYXNzKTtcbiAgICAgIGhlYWRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xuXG4gICAgICB0aGlzLmhlYWRlckNvbnRlbnRbc2VjdGlvbl0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXJJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmVsZW1lbnQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKGhlYWRlckl0ZW0sIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgIGlmIChcInBsYWNlaG9sZGVyXCIgaW4gaXRlbSkge1xuICAgICAgICAgIGhlYWRlckl0ZW0uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgaXRlbS5wbGFjZWhvbGRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uY2hpbGRFbGVtZW50KTtcbiAgICAgICAgICBpdGVtSWNvbi5zcmMgPSBpdGVtLnNyYztcbiAgICAgICAgICBpdGVtSWNvbi5zZXRBdHRyaWJ1dGUoXCJvbmxvYWRcIiwgXCJTVkdJbmplY3QodGhpcylcIik7XG4gICAgICAgICAgaGVhZGVySXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG4gICAgICAgIH1cbiAgICAgICAgaGVhZGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlckl0ZW0pO1xuICAgICAgICBoZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlckNvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyV3JhcHBlcik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xuICB9LFxuICBwdWJsaXNoKGUpIHtcbiAgICBjb25zdCBidG4gPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gZSA/IGUuY3VycmVudFRhcmdldC5jbGFzc05hbWUgOiBudWxsO1xuICAgIGxldCBzdWJzY3JpYmVyO1xuICAgIGlmIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLmluY2x1ZGVzKFwiaG9tZVwiKSkge1xuICAgICAgc3Vic2NyaWJlciA9IFwiY29udGVudFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJzY3JpYmVyID0gXCJ0b2dnbGVTaWRlYmFyXCI7XG4gICAgfVxuICAgIHB1YlN1Yi5wdWJsaXNoKHN1YnNjcmliZXIsIGUuY3VycmVudFRhcmdldCk7XG4gIH0sXG4gIHNlYXJjaCgpIHtcbiAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9VVZBN01EUXIxTmNcIiwgXCJfYmxhbmtcIik7XG4gIH0sXG4gIGFuaW1hdGVOYXYoZSkge1xuICAgIGlmIChlKSB7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmJ0bk1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKFwicm90YXRlXCIpKSB7XG4gICAgICAgIHRoaXMuYnRuTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwicm90YXRlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5idG5NZW51LmNsYXNzTGlzdC5hZGQoXCJyb3RhdGVcIik7XG4gICAgICB9XG4gICAgfVxuICB9LFxufTtcbiIsImltcG9ydCBidWlsZFByb2plY3RzIGZyb20gXCIuLi9jb21wb25lbnRzL3Byb2plY3RzXCI7XG5pbXBvcnQgYnVpbGRQcm9qZWN0VGFza3MgZnJvbSBcIi4uL2NvbXBvbmVudHMvcHJvamVjdF90YXNrc1wiO1xuaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gXCIuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlclwiO1xuaW1wb3J0IHB1YlN1YiBmcm9tIFwiLi4vY29udGFpbmVycy9wdWJzdWJcIjtcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gXCIuL3Byb2plY3RzX2xpc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYWluKCkge1xuICBtYWluQ29udGVudC5pbml0KCk7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgbWFpbi5pZCA9IFwibWFpbl9jb250ZW50XCI7XG4gIG1haW5Db250ZW50LmNhY2hlRE9NKG1haW4pO1xuICBtYWluQ29udGVudC5yZW5kZXIoKTtcbiAgbWFpbkNvbnRlbnQuYmluZEV2ZW50cygpO1xuXG4gIHB1YlN1Yi5zdWJzY3JpYmUoXCJjb250ZW50XCIsIG1haW5Db250ZW50LnN3aXRjaENvbnRlbnQpO1xuICBwdWJTdWIuc3Vic2NyaWJlKFwidXBkYXRlVGFic1wiLCBtYWluQ29udGVudC51cGRhdGVUYWJzKTtcbiAgcmV0dXJuIG1haW47XG59XG5cbmNvbnN0IGJ1aWxkID0ge1xuICBwcm9qZWN0czogYnVpbGRQcm9qZWN0cyxcbiAgcHJvamVjdDogYnVpbGRQcm9qZWN0VGFza3MsXG59O1xuXG5leHBvcnQgY29uc3QgbWFpbkNvbnRlbnQgPSB7XG4gIGFjdGl2ZUNvbnRlbnQ6IG51bGwsXG4gIGFjdGl2ZVRhYjogbnVsbCxcbiAgbmF2VGFiczoge1xuICAgIGdldEFsbEFuY2hvcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0aWMuY29uY2F0KHRoaXMuZHluYW1pYyk7XG4gICAgfSxcbiAgfSxcbiAgaW5pdCgpIHtcbiAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5uYXZUYWJzLnN0YXRpYyA9IFtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYVtocmVmPScjaW5ib3gnXWApLFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBhW2hyZWY9JyN0b2RheSddYCksXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5uYXZfcHJvamVjdHNgKSxcbiAgICAgIF07XG5cbiAgICAgIHRoaXMubmF2VGFicy5keW5hbWljID0gWy4uLmJ1aWxkTGlzdC5maW5kKFwic2lkZWJhclwiKS5wcm9qZWN0c0xpc3RBbmNob3JzXTtcbiAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKHRoaXMubmF2VGFicy5zdGF0aWNbMV0pO1xuICAgIH07XG4gIH0sXG4gIHVwZGF0ZVRhYnMoYW5jaG9ycykge1xuICAgIC8vIHVwZGF0ZXMgbmF2VGFicy5keW5hbWljXG4gICAgdGhpcy5uYXZUYWJzLmR5bmFtaWMgPSBbLi4uYW5jaG9yc107XG4gIH0sXG4gIGNhY2hlRE9NKGNvbnRhaW5lcikge1xuICAgIHRoaXMubWFpbiA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLm1haW5PdmVybGF5ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheV9tYWluX2NvbnRlbnRcIik7XG4gIH0sXG4gIHJlbmRlcihrZXksIHV1aWQpIHtcbiAgICBsZXQgY29udGVudDtcbiAgICBpZiAoIWtleSkge1xuICAgICAgY29udGVudCA9IGJ1aWxkW1wicHJvamVjdFwiXShwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWluLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKHV1aWQpO1xuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QWN0aXZlQ29udGVudChjb250ZW50KTtcbiAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy51cGRhdGVUYWJzID0gdGhpcy51cGRhdGVUYWJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zd2l0Y2hDb250ZW50ID0gdGhpcy5zd2l0Y2hDb250ZW50LmJpbmQodGhpcyk7XG4gIH0sXG4gIHN3aXRjaENvbnRlbnQoZSkge1xuICAgIGxldCByZW5kZXJLZXkgPSBcInByb2plY3RcIjtcbiAgICBsZXQgdXVpZCA9IG51bGw7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKGUuY2xhc3NOYW1lLmluY2x1ZGVzKFwidG9kYXlcIikpIHtcbiAgICAgICAgLy8gaWYgaG9tZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAvLyByZW5kZXJzIHRoZSB0b2RheSBzZWN0aW9uXG4gICAgICAgIHV1aWQgPSBwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkO1xuICAgICAgfSBlbHNlIGlmIChlLmRhdGFzZXQuaW5ib3hVdWlkKSB7XG4gICAgICAgIC8vIGlmIGEgcHJvamVjdCBpcyB0aGUgY29udGVudCBhbmQgaXMgZGVsZXRlZFxuICAgICAgICAvLyByZW5kZXJzIHRoZSBpbmJveCBzZWN0aW9uXG4gICAgICAgIHV1aWQgPSBlLmRhdGFzZXQuaW5ib3hVdWlkO1xuICAgICAgfSBlbHNlIGlmIChlLnBhcmVudEVsZW1lbnQuZGF0YXNldC51dWlkKSB7XG4gICAgICAgIC8vIHJlbmRlcnMgcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgICAgIHV1aWQgPSBlLnBhcmVudEVsZW1lbnQuZGF0YXNldC51dWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVuZGVycyBwcm9qZWN0cyBzZWN0aW9uXG4gICAgICAgIHJlbmRlcktleSA9IFwicHJvamVjdHNcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUudXVpZCkge1xuICAgICAgLy8gbmV3IHByb2plY3QgY3JlYXRlZFxuICAgICAgdXVpZCA9IGUudXVpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXVpZCA9IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQ7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKHJlbmRlcktleSwgdXVpZCk7XG4gIH0sXG4gIHNldEFjdGl2ZVRhYih0YWIpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA/IHRoaXMuYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikgOiBudWxsO1xuICAgIGlmICh0YWIuZmlyc3RDaGlsZC50YWdOYW1lICE9PSBcIkgxXCIpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRoaXMubmF2VGFic1xuICAgICAgICAuZ2V0QWxsQW5jaG9ycygpXG4gICAgICAgIC5maW5kKChhbmNob3IpID0+XG4gICAgICAgICAgYW5jaG9yLmhyZWZcbiAgICAgICAgICAgIC5zcGxpdChcIiNcIilbMV1cbiAgICAgICAgICAgIC5pbmNsdWRlcyh0YWIuZmlyc3RDaGlsZC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpKVxuICAgICAgICApO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVRhYi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9LFxuICBzZXRBY3RpdmVDb250ZW50KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVDb250ZW50KSB7XG4gICAgICB0aGlzLmFjdGl2ZUNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9XG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHRoaXMuYWN0aXZlQ29udGVudCA9IGNvbnRlbnQ7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHB1YlN1YiBmcm9tIFwiLi4vY29udGFpbmVycy9wdWJzdWJcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9tb2RhbF9yZW1vdmFsLmNzc1wiO1xuXG4vLyBtaW1pY3MgYWxlcnQgYm94IGNvbmZpcm1pbmcgdGFzay9wcm9qZWN0IHJlbW92YWxcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTW9kYWxSZW1vdmUob2JqKSB7XG4gIGNvbnN0IGRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGlhbG9nXCIpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG5cbiAgZGlhbG9nRWxlbWVudC5pZCA9IFwibW9kYWxcIjtcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiZm9ybV9yZW1vdmFsXCIpO1xuXG4gIGNvbnN0IG1vZGFsID0gYnVpbGRNb2RhbChkaWFsb2dFbGVtZW50LCBmb3JtLCBvYmopO1xuICBmb3JtLmFwcGVuZENoaWxkKG1vZGFsLnJlbmRlcigpKTtcbiAgbW9kYWwuY2FjaGVET00oKTtcbiAgbW9kYWwuYmluZEV2ZW50cygpO1xuXG4gIGRpYWxvZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG59XG5cbmNvbnN0IGJ1aWxkTW9kYWwgPSAoZGlhbG9nRWxlbWVudCwgZm9ybSwgb2JqKSA9PiB7XG4gIGxldCBzdGF0ZSA9IHtcbiAgICBkaWFsb2dFbGVtZW50LFxuICAgIGZvcm0sXG4gICAgdHlwZTogb2JqLnR5cGUsXG4gICAgb2JqLFxuICB9O1xuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtb2RhbChzdGF0ZSkpO1xufTtcblxuY29uc3QgbW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gIGZvcm06IHN0YXRlLmZvcm0sXG4gIHR5cGU6IHN0YXRlLnR5cGUsXG4gIHNlbGVjdGlvbjogc3RhdGUub2JqLFxuICBidXR0b25zOiBbXG4gICAge1xuICAgICAgZWxlbWVudDogXCJidXR0b25cIixcbiAgICAgIHRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJidG5fY2FuY2VsXCIsXG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogXCJidXR0b25cIixcbiAgICAgIHRleHQ6IFwiRGVsZXRlXCIsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJidG5fc3VibWl0X3JlbW92ZVwiLFxuICAgICAgICB0eXBlOiBcInN1Ym1pdFwiLFxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBjYWNoZURPTSgpIHtcbiAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9jYW5jZWxcIik7XG4gICAgdGhpcy5idG5EZWxldGUgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcihcIi5idG5fc3VibWl0X3JlbW92ZVwiKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb3NlRm9ybSA9IHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRGb3JtKTtcbiAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0pO1xuICAgIHRoaXMuZGlhbG9nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZU1vZGFsKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb25zdCBpdGVtRm9yUmVtb3ZhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIik7XG5cbiAgICBpdGVtRm9yUmVtb3ZhbC5jbGFzc0xpc3QuYWRkKFwiaXRlbV9mb3JfcmVtb3ZhbFwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkRlbGV0ZT9cIjtcbiAgICBpdGVtRm9yUmVtb3ZhbC50ZXh0Q29udGVudCA9IHRoaXMuc2VsZWN0aW9uLnRpdGxlXG4gICAgICA/IHRoaXMuc2VsZWN0aW9uLnRpdGxlXG4gICAgICA6IHRoaXMuc2VsZWN0aW9uLm5hbWU7XG4gICAgY29uc3QgbWVzc2FnZUJlZ2luVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcbiAgICAgIGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGBcbiAgICApO1xuICAgIGNvbnN0IG1lc3NhZ2VFbmRUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGA/YCk7XG5cbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKG1lc3NhZ2VCZWdpblRleHROb2RlKTtcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKGl0ZW1Gb3JSZW1vdmFsKTtcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKG1lc3NhZ2VFbmRUZXh0Tm9kZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgZm9ybUJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJmb3JtX2J1dHRvbnNcIik7XG4gICAgdGhpcy5idXR0b25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KSxcbiAgICAgICAgaXRlbS5hdHRyaWJ1dGVzXG4gICAgICApO1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gaXRlbS50ZXh0O1xuICAgICAgZm9ybUJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUJ1dHRvbnMpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgfSxcbiAgc3VibWl0Rm9ybShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwidGFza1wiKSB7XG4gICAgICBwdWJTdWIucHVibGlzaChcInJlbW92ZVRhc2tcIiwgdGhpcy5zZWxlY3Rpb24udXVpZFRhc2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBwdWJTdWIucHVibGlzaChcInJlbW92ZVByb2plY3RcIiwgdGhpcy5zZWxlY3Rpb24udXVpZCk7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goXCJoaWRlU2lkZWJhclwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jbG9zZUZvcm0oKTtcbiAgfSxcbiAgY2xvc2VGb3JtKGUpIHtcbiAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKTtcbiAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gIH0sXG4gIGNsb3NlTW9kYWwoZSkge1xuICAgIGlmIChlLnRhcmdldC5pZCA9PT0gXCJtb2RhbFwiKSB7XG4gICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKTtcbiAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZU1vZGFsKCkge1xuICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgfSxcbn0pO1xuIiwiaW1wb3J0IHB1YlN1YiBmcm9tIFwiLi4vY29udGFpbmVycy9wdWJzdWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRPdmVybGF5KCkge1xuICByZXR1cm4gb3ZlcmxheS5yZW5kZXIoKTtcbn1cblxuY29uc3Qgb3ZlcmxheSA9IHtcbiAgY2FjaGVET00oY29udGFpbmVyKSB7XG4gICAgdGhpcy5vdmVybGF5ID0gY29udGFpbmVyO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheV9tYWluX2NvbnRlbnRcIik7XG4gICAgdGhpcy5jYWNoZURPTShvdmVybGF5KTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiBvdmVybGF5O1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuZGltT3ZlcmxheSA9IHRoaXMuZGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoXCJkaW1cIiwgb3ZlcmxheS5kaW1PdmVybGF5KTtcbiAgfSxcbiAgZGltT3ZlcmxheShlKSB7XG4gICAgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZVwiKSB8fCB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJkaW1cIik7XG4gICAgfSBlbHNlIGlmICghZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpKSB7XG4gICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZChcImRpbVwiKTtcbiAgICB9XG4gIH0sXG59O1xuIiwiaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gXCIuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlclwiO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gXCIuLi9jb21wb25lbnRzL2J1dHRvbnNcIjtcbmltcG9ydCBidWlsZFRhc2tzRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy90YXNrc19mb3JtXCI7XG5pbXBvcnQgdGFza3NMaXN0IGZyb20gXCIuLi9jb21wb25lbnRzL3Rhc2tzX2xpc3RcIjtcblxuLy8gcmVuZGVycyBhIHByb2plY3QncyBwYWdlIGFuZCBpdCdzIHRhc2tzXG4vLyB3aGVuIHdlIGFyZSBhdCBhIHByb2plY3QncyBwYWdlXG4vLyB3ZSBkZWxldGUgaXQgZnJvbSB0aGVyZSBvciBmcm9tIHRoZSBzaWRlYmFyXG4vLyBjaGFuZ2UgY29udGVudCB0byBob21lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFByb2plY3RUYXNrcyh1dWlkKSB7XG4gIHByb2plY3RDb250cm9sbGVyLnNldEFjdGl2ZSh1dWlkKTtcbiAgY29uc3QgcHJvamVjdCA9IHByb2plY3RDb250cm9sbGVyLmZpbmQodXVpZCk7XG4gIHByb2plY3RUYXNrcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgY29uc3QgY29udGVudCA9IHByb2plY3RUYXNrcy5yZW5kZXIoKTtcbiAgcHJvamVjdFRhc2tzLmNhY2hlRE9NKGNvbnRlbnQpO1xuICBwcm9qZWN0VGFza3MuYmluZEV2ZW50cygpO1xuICByZXR1cm4gY29udGVudDtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2plY3RUYXNrcyA9IHtcbiAgcHJvamVjdDogbnVsbCxcbiAgY2FjaGVET00oY29udGFpbmVyKSB7XG4gICAgdGhpcy5wcm9qZWN0VGFza3NDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy51bExpc3QgPSB0aGlzLnByb2plY3RUYXNrc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzX2xpc3RcIik7XG4gICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy51bExpc3QuZmlyc3RDaGlsZDtcbiAgICB0aGlzLmJ0bkFkZFRhc2sgPSB0aGlzLnVsTGlzdC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9hZGRfdGFza1wiKTtcbiAgfSxcbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ1aWxkVGFza3NGb3JtKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIGxpc3QuY2xhc3NMaXN0LmFkZChcInRhc2tzX2xpc3RcIik7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuXG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0YXNrc0xpc3QuaW5pdCgpKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImFkZFwiLCBcInRhc2tcIiwgXCJBZGQgdGFza1wiKSk7XG4gICAgbGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG5cbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0KTtcbiAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXI7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgYnVpbGRMaXN0IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdFwiO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gXCIuLi9jb21wb25lbnRzL2J1dHRvbnNcIjtcbmltcG9ydCBidWlsZFByb2plY3RGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL3Byb2plY3RzX2Zvcm1cIjtcbmltcG9ydCBwcm9qZWN0Q29udHJvbGxlciBmcm9tIFwiLi4vY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXJcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9wcm9qZWN0cy5jc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcm9qZWN0cygpIHtcbiAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWN0aXZlKCk7XG4gIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJQcm9qZWN0c1wiO1xuXG4gIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RzLnJlbmRlcigpKTtcbiAgcHJvamVjdHMuY2FjaGVET00ocHJvamVjdHNDb250YWluZXIpO1xuICBwcm9qZWN0cy5iaW5kRXZlbnRzKCk7XG5cbiAgcmV0dXJuIHByb2plY3RzQ29udGFpbmVyO1xufVxuXG5jb25zdCBwcm9qZWN0cyA9IHtcbiAgY2FjaGVET00oY29udGFpbmVyKSB7XG4gICAgdGhpcy5idG5BZGRQcm9qZWN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX2FkZF9wcm9qZWN0XCIpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVpbGRQcm9qZWN0Rm9ybSk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFuY2hvcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5hdl9wcm9qZWN0c1wiKTtcblxuICAgIGFuY2hvcldyYXBwZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJhZGRcIiwgXCJwcm9qZWN0XCIsIFwiQWRkIHByb2plY3RcIikpO1xuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmRDaGlsZChhbmNob3JXcmFwcGVyKTtcblxuICAgIGJ1aWxkTGlzdC5hZGQoXCJjb250ZW50XCIsIHBhcmVudENvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgIGJ1aWxkTGlzdC5maW5kKFwiY29udGVudFwiKS5jbGVhckNhY2hlKCk7XG4gICAgYnVpbGRMaXN0LmZpbmQoXCJjb250ZW50XCIpLmluaXQoKTtcbiAgICByZXR1cm4gcGFyZW50Q29udGFpbmVyO1xuICB9LFxufTtcbiIsImltcG9ydCBwcm9qZWN0Q29udHJvbGxlciBmcm9tIFwiLi4vY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Byb2plY3RzX2xpc3RcIjtcbmltcG9ydCBwdWJTdWIgZnJvbSBcIi4uL2NvbnRhaW5lcnMvcHVic3ViXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvcHJvamVjdHNfZm9ybS5jc3NcIjtcblxuLy8gcmVuZGVycyBhIGZvcm0gdG8gY3JlYXRlIGEgcHJvamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcm9qZWN0Rm9ybSgpIHtcbiAgLy8gcHJvamVjdENvbnRyb2xsZXIuc2V0QWN0aXZlKCk7XG4gIGNvbnN0IGRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGlhbG9nXCIpO1xuICBkaWFsb2dFbGVtZW50LmlkID0gXCJmb3JtX3Byb2plY3RcIjtcbiAgZGlhbG9nRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtUHJvamVjdC5yZW5kZXIoKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gIGZvcm1Qcm9qZWN0LmNhY2hlRE9NKCk7XG4gIGZvcm1Qcm9qZWN0LmJpbmRFdmVudHMoKTtcbn1cblxuY29uc3QgZm9ybVByb2plY3QgPSB7XG4gIGZvcm1DaGlsZHJlbjoge1xuICAgIG5hbWU6IHtcbiAgICAgIGlkOiBcInRpdGxlXCIsXG4gICAgICBjbGFzc05hbWU6IFwicHJvamVjdF9pbnB1dFwiLFxuICAgICAgbmFtZTogXCJ0aXRsZVwiLFxuICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICBwbGFjZWhvbGRlcjogXCJFbnRlciBQcm9qZWN0IFRpdGxlXCIsXG4gICAgICByZXF1aXJlZDogXCJyZXF1aXJlZFwiLFxuICAgIH0sXG4gIH0sXG4gIGZvcm1CdXR0b25zOiB7XG4gICAgY2FuY2VsOiB7XG4gICAgICBjbGFzc05hbWU6IFwiYnRuX2NhbmNlbFwiLFxuICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICB9LFxuICAgIGFkZDoge1xuICAgICAgY2xhc3NOYW1lOiBcImJ0bl9zdWJtaXRfcHJvamVjdFwiLFxuICAgICAgdHlwZTogXCJzdWJtaXRcIixcbiAgICB9LFxuICB9LFxuICBjYWNoZURPTSgpIHtcbiAgICB0aGlzLmRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1fcHJvamVjdFwiKTtcbiAgICB0aGlzLmJ0bkNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX2NhbmNlbFwiKTtcbiAgICB0aGlzLmJ0blN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX3N1Ym1pdF9wcm9qZWN0XCIpO1xuICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybVwiKTtcbiAgICB0aGlzLmZvcm1JbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2Zvcm0gaW5wdXRcIik7XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVNb2RhbCA9IHRoaXMucmVtb3ZlTW9kYWwuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VNb2RhbCk7XG4gICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlTW9kYWwpO1xuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0Rm9ybSk7XG4gIH0sXG4gIC8vIHRha2UgYSBsb29rIGF0IHJlc3RhdXJhbnQgcHJvamVjdCdzIGNvbnRhY3QgbW9kdWxlXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29uc3QgZm9ybUJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJmb3JtX2J1dHRvbnNcIik7XG4gICAgZm9ybUVsZW1lbnQuaWQgPSBcImZvcm1cIjtcbiAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJBZGQgUHJvamVjdFwiO1xuICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1IZWFkZXIpO1xuXG4gICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIHRoaXMuZm9ybUNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBmb3JtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9ybV9pdGVtXCIpO1xuICAgICAgaWYgKHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uaGFzT3duUHJvcGVydHkoXCJyZXF1aXJlZFwiKSkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxcbiAgICAgICAgICB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdXG4gICAgICAgICk7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gZm9ybUNoaWxkO1xuICAgICAgICBsYWJlbC5odG1sRm9yID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5pZDtcbiAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICB9XG4gICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYnRuIGluIHRoaXMuZm9ybUJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBPYmplY3QuYXNzaWduKGJ1dHRvbiwgdGhpcy5mb3JtQnV0dG9uc1tidG5dKTtcbiAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBidG47XG5cbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgfVxuICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcblxuICAgIHJldHVybiBmb3JtRWxlbWVudDtcbiAgfSxcbiAgY2xvc2VNb2RhbChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwiRElBTE9HXCIpIHtcbiAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZU1vZGFsKCkge1xuICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgfSxcbiAgc3VibWl0Rm9ybShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIG9wdGlvbmFsLCBmb3JtIHZhbGlkYXRpb25cbiAgICAvLyBpZiBmb3JtIGlzIHZhbGlkXG4gICAgLy8gdGhlbiBhZGRQcm9qZWN0KClcbiAgICBwcm9qZWN0Q29udHJvbGxlci5hZGRQcm9qZWN0KHRoaXMuZm9ybUlucHV0cyk7XG4gICAgYnVpbGRMaXN0LmZpbmQoXCJzaWRlYmFyXCIpLnJlbmRlcigpOyAvLyB3aWxsIHJlbmRlciBvbmx5IHRoZSBzaWRlYmFyXG4gICAgcHViU3ViLnB1Ymxpc2goXCJjb250ZW50XCIsIHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKSk7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICBwdWJTdWIucHVibGlzaChcImhpZGVTaWRlYmFyXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gXCIuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlclwiO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gXCIuL2J1dHRvbnNcIjtcbmltcG9ydCBidWlsZE1vZGFsUmVtb3ZlIGZyb20gXCIuL21vZGFsX3JlbW92ZVwiO1xuaW1wb3J0IHB1YlN1YiBmcm9tIFwiLi4vY29udGFpbmVycy9wdWJzdWJcIjtcbmltcG9ydCBJY29uSW5ib3ggZnJvbSBcIi4uL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIjtcbmltcG9ydCBJY29uVG9kYXkgZnJvbSBcIi4uL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIjtcbmltcG9ydCBJY29uUHJvamVjdCBmcm9tIFwiLi4vYXNzZXRzL2ljb25zL2NpcmNsZS5zdmdcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9wcm9qZWN0cy5jc3NcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzc1wiO1xuXG5jb25zdCBCdWlsZFByb2plY3RzTGlzdCA9ICh0eXBlLCBjb250YWluZXIsIGFycmF5KSA9PiB7XG4gIGxldCBzdGF0ZSA9IHtcbiAgICBjb250YWluZXIsXG4gICAgdHlwZSxcbiAgICBhcnJheSxcbiAgfTtcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJvamVjdHNMaXN0KHN0YXRlKSwgc2V0SWNvbnMoc3RhdGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZExpc3QgPSB7XG4gIG1vZHVsZXM6IFtdLFxuICBhZGQodHlwZSwgY29udGFpbmVyLCBhcnJheSkge1xuICAgIC8vIG5lZWQgdG8gY2hlY2sgaWYgdGhlIG1vZHVsZSBleGlzdHMgYWxyZWFkeVxuICAgIC8vIGlmIG1vZHVsZSBleGlzdHMsIHRoZW4gdXBkYXRlIGl0J3MgY29udGFpbmVyXG4gICAgLy8gcHJldmVudHMgc2ltaWxhciBtb2R1bGVzIHRvIGJlIGFkZGVkXG4gICAgaWYgKHRoaXMubW9kdWxlcy5zb21lKChtb2R1bGUpID0+IG1vZHVsZS50eXBlID09PSB0eXBlKSkge1xuICAgICAgdGhpcy5maW5kKHR5cGUpLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2R1bGVzID0gW1xuICAgICAgICAuLi50aGlzLm1vZHVsZXMsXG4gICAgICAgIEJ1aWxkUHJvamVjdHNMaXN0KHR5cGUsIGNvbnRhaW5lciwgYXJyYXkpLFxuICAgICAgXTtcbiAgICB9XG4gIH0sXG4gIGZpbmQodHlwZSkge1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZCgobW9kdWxlKSA9PiBtb2R1bGUudHlwZSA9PT0gdHlwZSk7XG4gIH0sXG59O1xuXG5jb25zdCBwcm9qZWN0c0xpc3QgPSAoc3RhdGUpID0+ICh7XG4gIHJlbW92ZVNlbGVjdGlvbjogbnVsbCxcbiAgYXJyYXk6IHN0YXRlLmFycmF5LFxuICB0eXBlOiBzdGF0ZS50eXBlLFxuICBjb250YWluZXI6IHN0YXRlLmNvbnRhaW5lcixcbiAgaW5pdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0c1wiKTtcbiAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0c19saXN0XCIpO1xuICAgIGxpc3QuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgdGhpcy5jYWNoZURPTShsaXN0KTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0KTtcbiAgfSxcbiAgY2FjaGVET00oY29udGFpbmVyKSB7XG4gICAgdGhpcy51bExpc3QgPSBjb250YWluZXI7XG4gICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy51bExpc3QuZmlyc3RDaGlsZDtcbiAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xuICAgIHRoaXMucHJvamVjdHNMaXN0QW5jaG9ycyA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaSBhXCIpO1xuICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdCA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnRuX2RlbGV0ZV9wcm9qZWN0XCIpO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwic2lkZWJhclwiKSB7XG4gICAgICBwdWJTdWIucHVibGlzaChcInVwZGF0ZVRhYnNcIiwgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzKTtcbiAgICB9XG4gIH0sXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5yZW1vdmVQcm9qZWN0ID0gdGhpcy5yZW1vdmVQcm9qZWN0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5wdWJsaXNoID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcyk7XG4gICAgcHViU3ViLnN1YnNjcmliZShcInJlbW92ZVByb2plY3RcIiwgdGhpcy5yZW1vdmVQcm9qZWN0KTtcbiAgICB0aGlzLmJ0bkRlbGV0ZVByb2plY3QuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlUHJvamVjdCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2plY3RzTGlzdEFuY2hvcnMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5wdWJsaXNoKTtcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgY29uc3QgYW5jaG9yU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgY29uc3QgYW5jaG9ySW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBhbmNob3JJbWcuc2V0QXR0cmlidXRlKFwib25sb2FkXCIsIFwiU1ZHSW5qZWN0KHRoaXMpXCIpO1xuICAgICAgYW5jaG9yU3Bhbi50ZXh0Q29udGVudCA9IHRoaXMuYXJyYXlbaV0udGl0bGU7XG4gICAgICBhbmNob3IuaHJlZiA9IGAjJHt0aGlzLmFycmF5W2ldLnRpdGxlLnRvTG93ZXJDYXNlKCl9YDtcblxuICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKFwiZGF0YS11dWlkXCIsIHRoaXMuYXJyYXlbaV0udXVpZCk7XG4gICAgICBhbmNob3IuY2xhc3NMaXN0LmFkZChcIm5hdl9wcm9qZWN0XCIpO1xuICAgICAgY29uc3QgYnV0dG9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaWNvbnMpLmZpbmQoXG4gICAgICAgICAgKGEpID0+IGEgPT09IHRoaXMuYXJyYXlbaV0udGl0bGUudG9Mb3dlckNhc2UoKVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgYW5jaG9ySW1nLnNyYyA9XG4gICAgICAgICAgdGhpcy5pY29uc1tcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaWNvbnMpLmZpbmQoXG4gICAgICAgICAgICAgIChhKSA9PiBhID09PSB0aGlzLmFycmF5W2ldLnRpdGxlLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5jaG9ySW1nLnNyYyA9IHRoaXMuaWNvbnNbXCJjaXJjbGVcIl07XG4gICAgICB9XG5cbiAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChhbmNob3JJbWcpO1xuICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKGFuY2hvclNwYW4pO1xuICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoYW5jaG9yKTtcblxuICAgICAgaWYgKHN0YXRlLnR5cGUgIT09IFwibWlzY1wiKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGJ1aWxkQnV0dG9uKFwiZGVsZXRlXCIsIFwicHJvamVjdFwiKTtcbiAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtaW5ib3gtdXVpZFwiLFxuICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWRcbiAgICAgICAgKTtcbiAgICAgICAgYnV0dG9uU3Bhbi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChidXR0b25TcGFuKTtcbiAgICAgIH1cbiAgICAgIGxpc3RJdGVtcy5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGlzdENvbnRhaW5lcikge1xuICAgICAgdGhpcy5saXN0Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgdGhpcy51bExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW1zKTtcbiAgICAgIC8vIGNoYW5nZXMgY29udGVudCB0byB0aGUgbmV3bHkgcHJvamVjdCBpcyBhZGRlZFxuICAgICAgdGhpcy5jYWNoZURPTSh0aGlzLnVsTGlzdCk7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RJdGVtcztcbiAgfSxcbiAgcmVtb3ZlUHJvamVjdChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAvLyBzZXRzIHJlbW92ZVNlbGVjdGlvbiBmb3IgJ3NpZGViYXInIGFuZCAnY29udGVudCcgbW9kdWxlc1xuICAgICAgYnVpbGRMaXN0Lm1vZHVsZXMuZm9yRWFjaCgobW9kdWxlKSA9PiB7XG4gICAgICAgIGlmIChtb2R1bGUudHlwZSAhPT0gXCJtaXNjXCIpIHtcbiAgICAgICAgICBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uID0gWy4uLm1vZHVsZS5wcm9qZWN0c0xpc3RJdGVtc10uZmluZChcbiAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLmRhdGFzZXQudXVpZCA9PT0gbGlzdEl0ZW0uZGF0YXNldC51dWlkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHByb2plY3RVVUlEID0gbGlzdEl0ZW0uZGF0YXNldC51dWlkO1xuICAgICAgYnVpbGRNb2RhbFJlbW92ZShwcm9qZWN0Q29udHJvbGxlci5maW5kKHByb2plY3RVVUlEKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RDb250cm9sbGVyLnJlbW92ZShlKTtcbiAgICAgIC8vIHJlbW92ZXMgYW5kIHJlc2V0cyByZW1vdmVTZWxlY3Rpb24gZm9yICdzaWRlYmFyJyBhbmQgJ2NvbnRlbnQnIG1vZHVsZXNcbiAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xuICAgICAgICBpZiAobW9kdWxlLnR5cGUgIT09IFwibWlzY1wiICYmIG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24pIHtcbiAgICAgICAgICBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uLnJlbW92ZSgpO1xuICAgICAgICAgIG1vZHVsZS5yZW1vdmVTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHB1Ymxpc2goZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHB1YlN1Yi5wdWJsaXNoKFwiY29udGVudFwiLCBlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnR5cGUgPT09IFwic2lkZWJhclwiIHx8IHRoaXMudHlwZSA9PT0gXCJtaXNjXCIpICYmXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OFxuICAgICkge1xuICAgICAgcHViU3ViLnB1Ymxpc2goXCJoaWRlU2lkZWJhclwiKTtcbiAgICB9XG4gIH0sXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy51bExpc3QgPSBudWxsO1xuICAgIHRoaXMubGlzdENvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5wcm9qZWN0c0xpc3RJdGVtcyA9IG51bGw7XG4gICAgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzID0gbnVsbDtcbiAgICB0aGlzLmJ0bkRlbGV0ZVByb2plY3QgPSBudWxsO1xuICB9LFxufSk7XG5cbmNvbnN0IHNldEljb25zID0gKHN0YXRlKSA9PiB7XG4gIGxldCBpY29ucyA9IHt9O1xuXG4gIGlmIChzdGF0ZS50eXBlID09PSBcIm1pc2NcIikge1xuICAgIGljb25zLmljb25zID0geyBpbmJveDogSWNvbkluYm94LCB0b2RheTogSWNvblRvZGF5IH07XG4gIH0gZWxzZSB7XG4gICAgaWNvbnMuaWNvbnMgPSB7IGNpcmNsZTogSWNvblByb2plY3QgfTtcbiAgfVxuICByZXR1cm4gaWNvbnM7XG59O1xuIiwiaW1wb3J0IGltcG9ydEFsbCBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2ltcG9ydC1hbGxcIjtcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tIFwiLi4vYnV0dG9uc1wiO1xuaW1wb3J0IGJ1aWxkUHJvamVjdEZvcm0gZnJvbSBcIi4uL3Byb2plY3RzX2Zvcm1cIjtcbmltcG9ydCBwcm9qZWN0Q29udHJvbGxlciBmcm9tIFwiLi4vLi4vY29udGFpbmVycy9wcm9qZWN0X2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gXCIuLi9wcm9qZWN0c19saXN0XCI7XG5pbXBvcnQgcHViU3ViIGZyb20gXCIuLi8uLi9jb250YWluZXJzL3B1YnN1YlwiO1xuaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3NpZGViYXIuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkU2lkZWJhcihjb250ZW50KSB7XG4gIGNvbnN0IHNpZGViYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2lkZWJhcldyYXBwZXIuaWQgPSBcInNpZGViYXJcIjtcblxuICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICBzaWRlYmFyV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICBzaWRlYmFyLm9uID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzaWRlYmFyV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgfVxuXG4gIHNpZGViYXJXcmFwcGVyLmFwcGVuZENoaWxkKHNpZGViYXIucmVuZGVyKCkpO1xuICBzaWRlYmFyLmNhY2hlRE9NKHNpZGViYXJXcmFwcGVyKTtcbiAgdG91Y2hDb250cm9sbGVyLmluaXQoKTtcbiAgc2lkZWJhci5iaW5kRXZlbnRzKCk7XG5cbiAgLy8gcHVibGlzaGVkIGluIGhlYWRlci5qc1xuICBwdWJTdWIuc3Vic2NyaWJlKFwidG9nZ2xlU2lkZWJhclwiLCBzaWRlYmFyLnRvZ2dsZVNpZGViYXIpO1xuICAvLyBwdWJsaXNoZWQgaW4gcHJvamVjdHNfbGlzdC5qcywgcHJvamVjdHNfZm9ybS5qcywgbW9kYWxfcmVtb3ZlLmpzXG4gIHB1YlN1Yi5zdWJzY3JpYmUoXCJoaWRlU2lkZWJhclwiLCBzaWRlYmFyLmhpZGVTaWRlYmFyKTtcbiAgcmV0dXJuIHNpZGViYXJXcmFwcGVyO1xufVxuXG5jb25zdCBhc3NldHMgPSB7XG4gIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KFwiLi4vLi4vYXNzZXRzL2ljb25zXCIsIGZhbHNlLCAvXFwuc3ZnJC8pKSxcbn07XG5cbmNvbnN0IHNpZGViYXIgPSB7XG4gIGNhY2hlRE9NKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc2lkZWJhciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLnNpZGViYXJXcmFwcGVyID0gdGhpcy5zaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhcl93cmFwcGVyXCIpO1xuICAgIHRoaXMucHJvamVjdHNDb250YWluZXIgPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c19jb250YWluZXJcIik7XG4gICAgdGhpcy5hbmNob3JQcm9qZWN0cyA9IHRoaXMucHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfcHJvamVjdHNcIik7XG4gICAgdGhpcy5idG5BZGRQcm9qZWN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX2FkZF9wcm9qZWN0XCIpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMudG9nZ2xlU2lkZWJhciA9IHRoaXMudG9nZ2xlU2lkZWJhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1NpZGViYXIgPSB0aGlzLnNob3dTaWRlYmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oaWRlU2lkZWJhciA9IHRoaXMuaGlkZVNpZGViYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnB1Ymxpc2ggPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKTtcbiAgICB0aGlzLmNhbGxEaW1PdmVybGF5ID0gdGhpcy5jYWxsRGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVpbGRQcm9qZWN0Rm9ybSk7XG4gICAgdGhpcy5hbmNob3JQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5wdWJsaXNoLCB7XG4gICAgICBjYXB0dXJlOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVTaWRlYmFyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLmNhbGxEaW1PdmVybGF5KTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcInRvdWNoc3RhcnRcIixcbiAgICAgIHRvdWNoQ29udHJvbGxlci5zZXRUb3VjaFN0YXJ0LFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwidG91Y2hlbmRcIixcbiAgICAgIHRvdWNoQ29udHJvbGxlci5zZXRUb3VjaEVuZCxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHNpZGViYXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgcHJvamVjdENvbnRyb2xsZXIuc2V0TWlzY1Byb2plY3RzKCk7XG4gICAgY29uc3QgbmF2TWlzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYnVpbGRMaXN0LmFkZChcIm1pc2NcIiwgbmF2TWlzYywgcHJvamVjdENvbnRyb2xsZXIubWlzYyk7XG4gICAgYnVpbGRMaXN0LmZpbmQoYG1pc2NgKS5pbml0KCk7XG5cbiAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgYW5jaG9yV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcHJvamVjdHNBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblxuICAgIHNpZGViYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lclwiKTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5pZCA9IFwicHJvamVjdHNfY29udGFpbmVyXCI7XG4gICAgbmF2TWlzYy5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNfbWlzY19jb250YWluZXJcIik7XG5cbiAgICBwcm9qZWN0c0FuY2hvci50ZXh0Q29udGVudCA9IFwiUHJvamVjdHNcIjtcbiAgICBwcm9qZWN0c0FuY2hvci5ocmVmID0gXCIjcHJvamVjdHNcIjtcbiAgICBwcm9qZWN0c0FuY2hvci5jbGFzc0xpc3QuYWRkKFwibmF2X3Byb2plY3RzXCIpO1xuXG4gICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChwcm9qZWN0c0FuY2hvcik7XG4gICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImFkZFwiLCBcInByb2plY3RcIikpO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFuY2hvcldyYXBwZXIpO1xuXG4gICAgYnVpbGRMaXN0LmFkZChcInNpZGViYXJcIiwgcHJvamVjdHNDb250YWluZXIsIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcbiAgICBidWlsZExpc3QuZmluZChgc2lkZWJhcmApLmluaXQoKTtcblxuICAgIHNpZGViYXJDb250YWluZXIuYXBwZW5kQ2hpbGQobmF2TWlzYyk7XG4gICAgc2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gICAgcmV0dXJuIHNpZGViYXJDb250YWluZXI7XG4gIH0sXG4gIHRvZ2dsZVNpZGViYXIoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLnNpZGViYXIpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICB0aGlzLmhpZGVTaWRlYmFyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dTaWRlYmFyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBoaWRlU2lkZWJhcigpIHtcbiAgICBpZiAodGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIikpIHtcbiAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgIHRoaXMuY2FsbERpbU92ZXJsYXkoKTtcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKFwiYW5pbWF0ZV9uYXZcIik7XG4gICAgfVxuICB9LFxuICBzaG93U2lkZWJhcigpIHtcbiAgICBpZiAoIXRoaXMuc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpKSB7XG4gICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB0aGlzLmNhbGxEaW1PdmVybGF5KCk7XG4gICAgICBwdWJTdWIucHVibGlzaChcImFuaW1hdGVfbmF2XCIpO1xuICAgIH1cbiAgfSxcbiAgcHVibGlzaChlKSB7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gd2hlbiBzaWRlYmFyIHByb2plY3RzIGFuY2hvciBpcyBjbGlja2VkXG4gICAgLy8gY2hhbmdlIGNvbnRlbnQgdG8gcHJvamVjdHNcbiAgICAvLyBpZiB3aW5kb3cgd2lkdGggaXMgPCA3NjhweFxuICAgIC8vc2lkZWJhciB3aWxsIGNsb3NlXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICB0aGlzLmhpZGVTaWRlYmFyKCk7XG4gICAgfVxuICAgIHB1YlN1Yi5wdWJsaXNoKFwiY29udGVudFwiLCBlLmN1cnJlbnRUYXJnZXQpO1xuICB9LFxuICBjYWxsRGltT3ZlcmxheTogZnVuY3Rpb24gKCkge1xuICAgIHB1YlN1Yi5wdWJsaXNoKFwiZGltXCIsIHRoaXMuc2lkZWJhcik7XG4gIH0sXG59O1xuXG5jb25zdCB0b3VjaENvbnRyb2xsZXIgPSB7XG4gIHRvdWNoU3RhcnRYOiBudWxsLFxuICB0b3VjaEVuZFg6IG51bGwsXG4gIHRvdWNoU3RhcnRZOiBudWxsLFxuICB0b3VjaEVuZFk6IG51bGwsXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zd2lwZSA9IHRoaXMuc3dpcGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNldFRvdWNoU3RhcnQgPSB0aGlzLnNldFRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNldFRvdWNoRW5kID0gdGhpcy5zZXRUb3VjaEVuZC5iaW5kKHRoaXMpO1xuICB9LFxuICBzZXRUb3VjaFN0YXJ0KGUpIHtcbiAgICB0aGlzLnRvdWNoU3RhcnRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgIHRoaXMudG91Y2hTdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XG4gIH0sXG4gIHNldFRvdWNoRW5kKGUpIHtcbiAgICB0aGlzLnRvdWNoRW5kWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcbiAgICB0aGlzLnRvdWNoRW5kWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcbiAgICB0aGlzLnN3aXBlKCk7XG4gIH0sXG4gIHN3aXBlKCkge1xuICAgIGlmICh0aGlzLnRvdWNoRW5kWCA8IHRoaXMudG91Y2hTdGFydFgpIHtcbiAgICAgIC8vIHN3aXBlIGxlZnRcbiAgICAgIHNpZGViYXIuaGlkZVNpZGViYXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50b3VjaEVuZFggPiB0aGlzLnRvdWNoU3RhcnRYKSB7XG4gICAgICAvLyBzd2lwZSByaWdodFxuICAgICAgc2lkZWJhci5zaG93U2lkZWJhcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRvdWNoRW5kWSA8IHRoaXMudG91Y2hTdGFydFkpIHtcbiAgICAgIC8vIHN3aXBlIHVwXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudG91Y2hFbmRZID4gdGhpcy50b3VjaFN0YXJ0WSkge1xuICAgICAgLy8gc3dpcGUgZG93blxuICAgIH1cbiAgfSxcbn07XG4iLCJpbXBvcnQgcHViU3ViIGZyb20gXCIuLi9jb250YWluZXJzL3B1YnN1YlwiO1xuaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gXCIuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlclwiO1xuaW1wb3J0IGJ1aWxkU2VsZWN0T3B0aW9ucyBmcm9tIFwiLi4vY29tcG9uZW50cy90YXNrc19vcHRpb25zXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvdGFza3NfZm9ybS5jc3NcIjtcbmltcG9ydCBJY29uRmxhZyBmcm9tIFwiLi4vYXNzZXRzL2ljb25zL2ZsYWcuc3ZnXCI7XG5pbXBvcnQgSWNvbkNoZXZyb25Eb3duIGZyb20gXCIuLi9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2Z1wiO1xuaW1wb3J0IEljb25DaXJjbGUgZnJvbSBcIi4uL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCI7XG5pbXBvcnQgSWNvbkluYm94IGZyb20gXCIuLi9hc3NldHMvaWNvbnMvaW5ib3guc3ZnXCI7XG5cbmNvbnN0IGJ1aWxkVGFza0Zvcm0gPSAodHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgZm9ybSxcbiAgICB0eXBlLFxuICB9O1xuXG4gIGlmICh0eXBlID09PSAnZGVmYXVsdCcpIHtcbiAgICBpZiAoYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgfVxuICAgIHN0YXRlLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICBzdGF0ZS5idXR0b25QYXJlbnQgPSBidXR0b25QYXJlbnQ7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIGZvcm1UYXNrKHN0YXRlKSxcbiAgICAgIG5vbk1vZGFsKHN0YXRlKSxcbiAgICAgIGZvcm1JbnB1dHMoc3RhdGUpXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRlLmRpYWxvZ0VsZW1lbnQgPSBkaWFsb2dFbGVtZW50O1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZm9ybVRhc2soc3RhdGUpLCBtb2RhbChzdGF0ZSksIGZvcm1JbnB1dHMoc3RhdGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZEZvcm0gPSB7XG4gIHNlY3Rpb25zOiBbXSxcbiAgYWRkKHR5cGUsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50LCBkaWFsb2dFbGVtZW50KSB7XG4gICAgLy8gaWYgc2VjdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLCB1cGRhdGUgaXQncyBjb250YWluZXJcbiAgICAvLyBwcmV2ZW50cyBzaW1pbGFyIHNlY3Rpb25zIHRvIGJlIGFkZGVkXG4gICAgaWYgKHRoaXMuZmluZCh0eXBlKSkge1xuICAgICAgdGhpcy5maW5kKHR5cGUpLmNsb3NlRm9ybSgpO1xuICAgICAgdGhpcy5yZW1vdmUodHlwZSk7XG4gICAgfVxuICAgIHRoaXMuc2VjdGlvbnMgPSBbXG4gICAgICAuLi50aGlzLnNlY3Rpb25zLFxuICAgICAgYnVpbGRUYXNrRm9ybSh0eXBlLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCwgZGlhbG9nRWxlbWVudCksXG4gICAgXTtcbiAgfSxcbiAgcmVtb3ZlKHR5cGUpIHtcbiAgICB0aGlzLnNlY3Rpb25zLnNwbGljZSh0aGlzLnNlY3Rpb25zLmluZGV4T2YodGhpcy5maW5kKHR5cGUpKSwgMSk7XG4gIH0sXG4gIGZpbmQodHlwZSkge1xuICAgIHJldHVybiB0aGlzLnNlY3Rpb25zLmZpbmQoKHNlY3Rpb24pID0+IHNlY3Rpb24udHlwZSA9PT0gdHlwZSk7XG4gIH0sXG59O1xuXG4vLyByZW5kZXJzIGEgZm9ybSB0byBjcmVhdGUgYSB0YXNrXG4vLyBvbmUgbmVlZHMgdG8gYmUgYSBkaWFsb2cgZWxlbWVudFxuLy8gb25lIG5lZWRzIHRvIGJlIGEgbm9uLWRpYWxvZyBlbGVtZW50XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRhc2tzRm9ybShlKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGUuY3VycmVudFRhcmdldDtcbiAgY29uc3QgYnV0dG9uUGFyZW50ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgaWYgKCFidXR0b24uaGFzQXR0cmlidXRlKFwicm9sZVwiKSAmJiBidXR0b25QYXJlbnQudGFnTmFtZSAhPT0gXCJMSVwiKSB7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiZm9ybVwiKTtcbiAgICBjb25zdCBkaWFsb2dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpYWxvZ1wiKTtcbiAgICBkaWFsb2dFbGVtZW50LmlkID0gXCJmb3JtX3Rhc2tcIjtcbiAgICBidWlsZEZvcm0uYWRkKFwibW9kYWxcIiwgZm9ybSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGRpYWxvZ0VsZW1lbnQpO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChidWlsZEZvcm0uZmluZChgbW9kYWxgKS5yZW5kZXIoKSk7XG4gICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuY2FjaGVET00oKTtcbiAgICBidWlsZEZvcm0uZmluZChgbW9kYWxgKS5iaW5kRXZlbnRzKCk7XG4gICAgZGlhbG9nRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiZm9ybV90YXNrXCIpO1xuICAgIGUuY3VycmVudFRhcmdldC5yZXBsYWNlV2l0aChmb3JtKTtcbiAgICBidWlsZEZvcm0uYWRkKFwiZGVmYXVsdFwiLCBmb3JtLCBidXR0b24sIGJ1dHRvblBhcmVudCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLnJlbmRlcigpKTtcbiAgICBidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLmNhY2hlRE9NKCk7XG4gICAgYnVpbGRGb3JtLmZpbmQoYGRlZmF1bHRgKS5iaW5kRXZlbnRzKCk7XG4gICAgZm9ybS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICB9XG59XG5cbmNvbnN0IGZvcm1UYXNrID0gKHN0YXRlKSA9PiAoe1xuICB0eXBlOiBzdGF0ZS50eXBlLFxuICBmb3JtOiBzdGF0ZS5mb3JtLFxuICBjYWNoZURPTSgpIHtcbiAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9jYW5jZWxcIik7XG4gICAgdGhpcy5idG5TdWJtaXQgPVxuICAgICAgdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX3N1Ym1pdF90YXNrXCIpIHx8XG4gICAgICB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcihcIi5idG5fdXBkYXRlX3Rhc2tcIik7XG4gICAgdGhpcy5mb3JtSW5wdXRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza19pbnB1dFwiKTtcbiAgICB0aGlzLmJ0blByaW9yaXR5ID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjYnRuX3ByaW9yaXR5XCIpO1xuICAgIHRoaXMuYnRuUHJvamVjdCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKFwiI2J0bl9wcm9qZWN0XCIpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvc2VGb3JtID0gdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIHRoaXMuYnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlRm9ybSk7XG4gICAgdGhpcy5idG5Qcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVpbGRTZWxlY3RPcHRpb25zKTtcbiAgICB0aGlzLmJ0blByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ1aWxkU2VsZWN0T3B0aW9ucyk7XG4gICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VNb2RhbCk7XG4gICAgfVxuICB9LFxuICB1bkJpbmRFdmVudCgpIHtcbiAgICB0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBmb3JtQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybUJ1dHRvbnMuY2xhc3NMaXN0LmFkZChcImZvcm1fYnV0dG9uc1wiKTtcbiAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gdGhpcy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvcm1JdGVtLmNsYXNzTGlzdC5hZGQoXCJmb3JtX2l0ZW1cIik7XG4gICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5oYXNPd25Qcm9wZXJ0eShcImVsZW1lbnRcIikpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5lbGVtZW50KSxcbiAgICAgICAgICB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXNcbiAgICAgICAgKTtcblxuICAgICAgICBsYWJlbC5odG1sRm9yID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzLmlkO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uYXR0cmlidXRlcy5wbGFjZWhvbGRlcjtcblxuICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGl0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nKSB7XG4gICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uc2liaWxpbmcuZWxlbWVudFxuICAgICAgICAgICk7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIGJ1dHRvbixcbiAgICAgICAgICAgIHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uc2liaWxpbmcuYXR0cmlidXRlc1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZy5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmVsZW1lbnQpLFxuICAgICAgICAgICAgICBpdGVtLmF0dHJpYnV0ZXNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoaXRlbS5jaGlsZCkge1xuICAgICAgICAgICAgICBjb25zdCBjaGlsZEVsZW1lbnQgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5jaGlsZC5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICBpdGVtLmNoaWxkLmF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LnNldEF0dHJpYnV0ZShcIm9ubG9hZFwiLCBcIlNWR0luamVjdCh0aGlzKVwiKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYnRuIGluIHRoaXMuZm9ybUJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBPYmplY3QuYXNzaWduKGJ1dHRvbiwgdGhpcy5mb3JtQnV0dG9uc1tidG5dKTtcbiAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBidG47XG5cbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH0sXG4gIHN1Ym1pdEZvcm0oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMubGlzdEl0ZW0pIHtcbiAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS5hZGRUYXNrKHRoaXMuZm9ybUlucHV0cyk7XG4gICAgICBpZiAodGhpcy5kaWFsb2dFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgICAgcHViU3ViLnB1Ymxpc2goXCJyZXNldE9sZFRhc2tcIiwgdGhpcy5idXR0b24pO1xuICAgICAgcHJvamVjdENvbnRyb2xsZXJcbiAgICAgICAgLmZpbmQodGhpcy5saXN0SXRlbS5kYXRhc2V0LnV1aWRQcm9qKVxuICAgICAgICAudXBkYXRlVGFzayh0aGlzLmxpc3RJdGVtLmRhdGFzZXQudXVpZCwgdGhpcy5mb3JtSW5wdXRzKTtcbiAgICB9XG4gIH0sXG4gIGNsb3NlRm9ybShlKSB7XG4gICAgaWYgKCF0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuZm9ybS5yZXBsYWNlV2l0aCh0aGlzLmJ1dHRvbik7XG4gICAgICBidWlsZEZvcm0ucmVtb3ZlKHRoaXMudHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9XG4gICAgcHViU3ViLnB1Ymxpc2goXCJyZXNldE9sZFRhc2tcIik7XG4gIH0sXG4gIHJlc2V0Rm9ybSgpIHtcbiAgICAvLyByZXNldHMgYWxsIGZvcm0gaW5wdXRzLCB0eXBlPVwiaGlkZGVuXCIgaW5jbHVkZWRcbiAgICAvLyByZXNldHMgcHJpb3JpdHkvcHJvamVjdCBidXR0b24gY29udGVudFxuICAgIGZvciAobGV0IGZvcm1DaGlsZCBpbiB0aGlzLmZvcm1DaGlsZHJlbikge1xuICAgICAgY29uc3QgZm9ybUlucHV0ID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXTtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBmb3JtSW5wdXQuYXR0cmlidXRlcztcbiAgICAgIFsuLi50aGlzLmZvcm1JbnB1dHNdLmZpbmQoKGlucHV0KSA9PiBpbnB1dC5pZCA9PT0gYXR0cmlidXRlcy5pZCkudmFsdWUgPVxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgaWYgKHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uc2liaWxpbmcpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IFsuLi50aGlzLmZvcm1JbnB1dHNdLmZpbmQoXG4gICAgICAgICAgKGlucHV0KSA9PlxuICAgICAgICAgICAgZm9ybUlucHV0LnNpYmlsaW5nLmF0dHJpYnV0ZXMuaWQgPT09IGlucHV0LmlkICYmXG4gICAgICAgICAgICBpbnB1dC50YWdOYW1lID09PSBcIkJVVFRPTlwiXG4gICAgICAgICk7XG4gICAgICAgIGxldCBuZXdJY29uO1xuICAgICAgICBjb25zdCBidG5TVkcgPSBlbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJ0blNWRy5jbGFzc05hbWUuYmFzZVZhbCAhPT0gXCJcIiAmJlxuICAgICAgICAgIGJ0blNWRy5zcmMgIT09IGZvcm1JbnB1dC5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLnNyY1xuICAgICAgICApIHtcbiAgICAgICAgICBuZXdJY29uID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgbmV3SWNvbi5zZXRBdHRyaWJ1dGUoXCJvbmxvYWRcIiwgXCJTVkdJbmplY3QodGhpcylcIik7XG4gICAgICAgICAgbmV3SWNvbi5zcmMgPSBmb3JtSW5wdXQuc2liaWxpbmcuY2hpbGRyZW5bMF0uY2hpbGQuYXR0cmlidXRlcy5zcmM7XG4gICAgICAgICAgYnRuU1ZHLnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0ljb24sIGJ0blNWRyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmVlZCByZXBsYWNlIHByb2plY3QgaWYgdGhlIGN1cnJlbnQgaWNvbiBkb2VzIG5vdCBtYXRjaCBkZWZhdWx0IGljb25cbiAgICAgICAgbmV3SWNvbi5jbGFzc05hbWUgPVxuICAgICAgICAgIGZvcm1JbnB1dC5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLmNsYXNzTmFtZTtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgZm9ybUlucHV0LnNpYmlsaW5nLmNoaWxkcmVuWzFdLmF0dHJpYnV0ZXMudGV4dENvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxufSk7XG5cbmNvbnN0IG5vbk1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICBidXR0b246IHN0YXRlLmJ1dHRvbixcbiAgcGFyZW50QnV0dG9uOiBzdGF0ZS5idXR0b25QYXJlbnQsXG59KTtcblxuY29uc3QgbW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gIGNsb3NlTW9kYWwoZSkge1xuICAgIGlmIChlLnRhcmdldC5pZCA9PT0gXCJmb3JtX3Rhc2tcIikge1xuICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmNsb3NlKCk7XG4gICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfVxuICB9LFxuICByZW1vdmVNb2RhbCgpIHtcbiAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgYnVpbGRGb3JtLnJlbW92ZSh0aGlzLnR5cGUpO1xuICB9LFxufSk7XG5cbmNvbnN0IGZvcm1JbnB1dHMgPSAoc3RhdGUpID0+IHtcbiAgY29uc3QgdGFza0l0ZW0gPSBzdGF0ZS5idXR0b25cbiAgICA/IHN0YXRlLmJ1dHRvbi5xdWVyeVNlbGVjdG9yKFwiLnRhc2tfbGlzdF9pdGVtXCIpXG4gICAgOiBudWxsO1xuICBjb25zdCBwcm9qZWN0ID0gdGFza0l0ZW1cbiAgICA/IHByb2plY3RDb250cm9sbGVyLmZpbmQodGFza0l0ZW0uZGF0YXNldC51dWlkUHJvailcbiAgICA6IG51bGw7XG4gIGNvbnN0IHRhc2sgPSB0YXNrSXRlbSA/IHByb2plY3QuZmluZFRhc2sodGFza0l0ZW0uZGF0YXNldC51dWlkKSA6IG51bGw7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gaW5wdXRzLmZvcm1DaGlsZHJlbikge1xuICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBpbnB1dHMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uYXR0cmlidXRlcztcbiAgICAgIC8vIGZpbmRzIHRhc2sncyBrZXkgZXF1YWwgdG8gaW5wdXQncyBpZFxuICAgICAgbGV0IGtleSA9IE9iamVjdC5rZXlzKHRhc2spLmZpbmQoKGl0ZW0pID0+IGl0ZW0gPT09IGF0dHJpYnV0ZXMuaWQpO1xuICAgICAgaWYgKGF0dHJpYnV0ZXMgJiYga2V5KSB7XG4gICAgICAgIGlmICghaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nKSB7XG4gICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgIGlmIChmb3JtQ2hpbGQgIT09IFwiZHVlRGF0ZVwiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHsgdmFsdWU6IHRhc2tba2V5XSB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHsgdmFsdWU6IG5ldyBEYXRlKHRhc2tba2V5XSkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0gfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGZvcm1DaGlsZCA9PT0gXCJwcmlvcml0eVwiKSB7XG4gICAgICAgICAgICBpbnB1dHMuZm9ybUNoaWxkcmVuW1xuICAgICAgICAgICAgICBmb3JtQ2hpbGRcbiAgICAgICAgICAgIF0uc2liaWxpbmcuY2hpbGRyZW5bMF0uY2hpbGQuYXR0cmlidXRlcy5jbGFzc05hbWUgPSBgcHJpb3JpdHlfJHt0YXNrLnByaW9yaXR5fWA7XG4gICAgICAgICAgICBpbnB1dHMuZm9ybUNoaWxkcmVuW1xuICAgICAgICAgICAgICBmb3JtQ2hpbGRcbiAgICAgICAgICAgIF0uc2liaWxpbmcuY2hpbGRyZW5bMV0uYXR0cmlidXRlcy50ZXh0Q29udGVudCA9IGBQJHt0YXNrLnByaW9yaXR5fWA7XG4gICAgICAgICAgICBpbnB1dHMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uYXR0cmlidXRlcy52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlucHV0cyA9IHtcbiAgICBmb3JtQ2hpbGRyZW46IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZWxlbWVudDogXCJpbnB1dFwiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJ0YXNrX2lucHV0XCIsXG4gICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVGFzayBuYW1lXCIsXG4gICAgICAgICAgcmVxdWlyZWQ6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICBlbGVtZW50OiBcInRleHRhcmVhXCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJ0YXNrX2lucHV0XCIsXG4gICAgICAgICAgbmFtZTogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZHVlRGF0ZToge1xuICAgICAgICBlbGVtZW50OiBcImlucHV0XCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogXCJkdWVfZGF0ZVwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJ0YXNrX2lucHV0XCIsXG4gICAgICAgICAgbmFtZTogXCJkYXRlXCIsXG4gICAgICAgICAgdHlwZTogXCJkYXRlXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRHVlIERhdGVcIixcbiAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkdWVUaW1lOiB7XG4gICAgICAgIGVsZW1lbnQ6IFwiaW5wdXRcIixcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGlkOiBcImR1ZV90aW1lXCIsXG4gICAgICAgICAgY2xhc3NOYW1lOiBcInRhc2tfaW5wdXRcIixcbiAgICAgICAgICBuYW1lOiBcInRpbWVcIixcbiAgICAgICAgICB0eXBlOiBcInRpbWVcIixcbiAgICAgICAgICBwbGFjZWhvbGRlcjogXCJUaW1lXCIsXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcHJpb3JpdHk6IHtcbiAgICAgICAgZWxlbWVudDogXCJpbnB1dFwiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaWQ6IFwicHJpb3JpdHlcIixcbiAgICAgICAgICBjbGFzc05hbWU6IFwidGFza19pbnB1dFwiLFxuICAgICAgICAgIG5hbWU6IFwicHJpb3JpdHlcIixcbiAgICAgICAgICB0eXBlOiBcImhpZGRlblwiLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlByaW9yaXR5XCIsXG4gICAgICAgICAgdmFsdWU6IDQsXG4gICAgICAgIH0sXG4gICAgICAgIHNpYmlsaW5nOiB7XG4gICAgICAgICAgZWxlbWVudDogXCJidXR0b25cIixcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBpZDogXCJidG5fcHJpb3JpdHlcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0YXNrX2lucHV0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQcmlvcml0eVwiLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaW1nX3dyYXBwZXJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgIHNyYzogSWNvbkZsYWcsXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicHJpb3JpdHlfNFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBlbGVtZW50OiBcInNwYW5cIixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0YXNrX3ByaW9yaXR5XCIsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiUDRcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaW1nX3dyYXBwZXJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgIHNyYzogSWNvbkNoZXZyb25Eb3duLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImNoZXZyb25fZG93blwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcHJvamVjdDoge1xuICAgICAgICBlbGVtZW50OiBcImlucHV0XCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogXCJwcm9qZWN0XCIsXG4gICAgICAgICAgY2xhc3NOYW1lOiBcInRhc2tfaW5wdXRcIixcbiAgICAgICAgICBuYW1lOiBcInByaW9yaXR5XCIsXG4gICAgICAgICAgdHlwZTogXCJoaWRkZW5cIixcbiAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQcm9qZWN0XCIsXG4gICAgICAgICAgdmFsdWU6XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT1cbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWRcbiAgICAgICAgICAgICAgPyBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS51dWlkXG4gICAgICAgICAgICAgIDogcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQsXG4gICAgICAgIH0sXG4gICAgICAgIHNpYmlsaW5nOiB7XG4gICAgICAgICAgZWxlbWVudDogXCJidXR0b25cIixcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBpZDogXCJidG5fcHJvamVjdFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRhc2tfaW5wdXRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlByb2plY3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBlbGVtZW50OiBcImRpdlwiLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImltZ193cmFwcGVyXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICBzcmM6XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS51dWlkID09PVxuICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09XG4gICAgICAgICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZFxuICAgICAgICAgICAgICAgICAgICAgID8gSWNvbkluYm94XG4gICAgICAgICAgICAgICAgICAgICAgOiBJY29uQ2lyY2xlLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT1cbiAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS51dWlkID09PVxuICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwicHJvamVjdF9pbmJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgOiBcInByb2plY3RfY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IFwic3BhblwiLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInRhc2tfcHJvamVjdFwiLFxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50OlxuICAgICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09XG4gICAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkXG4gICAgICAgICAgICAgICAgICAgID8gcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udGl0bGVcbiAgICAgICAgICAgICAgICAgICAgOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudGl0bGUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBlbGVtZW50OiBcImRpdlwiLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImltZ193cmFwcGVyXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IEljb25DaGV2cm9uRG93bixcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJjaGV2cm9uX2Rvd25cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGZvcm1CdXR0b25zOiB7XG4gICAgICBjYW5jZWw6IHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImJ0bl9jYW5jZWxcIixcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyBpZiB0aGUgYnV0dG9uIGNsaWNrZWQgaGFzICdyb2xlJyBhdHRyaWJ1dGVcbiAgLy8gYXNzaWduIGZvcm1DaGlsZHJlbiB3aXRoIGEgc2F2ZS1idXR0b25cbiAgLy8gYXNzaWduIGZvcm1UYXNrIHdpdGggYSBjb250ZW50IHByb3BlcnR5L2luaXQgZnVuY3Rpb25cbiAgLy8gb3RoZXJ3aXNlLFxuICAvLyBhc3NpZ24gZm9ybUNoaWxkcmVuIHdpdGggb25seSBhIGFkZC1idXR0b25cbiAgaWYgKHN0YXRlLmJ1dHRvbiAmJiBzdGF0ZS5idXR0b24uaGFzQXR0cmlidXRlKFwicm9sZVwiKSkge1xuICAgIGNvbnN0IGlucHV0c0VkaXQgPSB7XG4gICAgICBidXR0b246IHtcbiAgICAgICAgc2F2ZToge1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJidG5fdXBkYXRlX3Rhc2tcIixcbiAgICAgICAgICB0eXBlOiBcInN1Ym1pdFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHByb3A6IHtcbiAgICAgICAgbGlzdEl0ZW06IHN0YXRlLmJ1dHRvbi5maXJzdENoaWxkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgaW5pdCgpO1xuICAgIE9iamVjdC5hc3NpZ24oaW5wdXRzLmZvcm1CdXR0b25zLCBpbnB1dHNFZGl0LmJ1dHRvbik7XG4gICAgT2JqZWN0LmFzc2lnbihpbnB1dHMsIGlucHV0c0VkaXQucHJvcCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaW5wdXRzQWRkID0ge1xuICAgICAgYWRkOiB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJidG5fc3VibWl0X3Rhc2tcIixcbiAgICAgICAgdHlwZTogXCJzdWJtaXRcIixcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24oaW5wdXRzLmZvcm1CdXR0b25zLCBpbnB1dHNBZGQpO1xuICB9XG4gIHJldHVybiBpbnB1dHM7XG59O1xuIiwiaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gXCIuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlclwiO1xuaW1wb3J0IGJ1aWxkQnV0dG9uIGZyb20gXCIuLi9jb21wb25lbnRzL2J1dHRvbnNcIjtcbmltcG9ydCBidWlsZE1vZGFsUmVtb3ZlIGZyb20gXCIuLi9jb21wb25lbnRzL21vZGFsX3JlbW92ZVwiO1xuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL3Rhc2tzX2Zvcm1cIjtcbmltcG9ydCBwdWJTdWIgZnJvbSBcIi4uL2NvbnRhaW5lcnMvcHVic3ViXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvdGFza3NfbGlzdC5jc3NcIjtcblxuY29uc3QgdGFza3NMaXN0ID0ge1xuICByZW1vdmVTZWxlY3Rpb246IG51bGwsXG4gIGJ0bkRlbGV0ZVRhc2s6IFtdLFxuICBpbml0KCkge1xuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlc2V0T2xkVGFzayA9IHRoaXMucmVzZXRPbGRUYXNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG4gICAgcHViU3ViLnN1YnNjcmliZSgnYWRkVGFzaycsIHRoaXMucmVuZGVyKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVUYXNrJywgdGhpcy5yZW5kZXIpO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc2V0T2xkVGFzaycsIHRoaXMucmVzZXRPbGRUYXNrKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdyZW1vdmVUYXNrJywgdGhpcy5yZW1vdmVUYXNrKTtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCk7XG4gICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLnByb2plY3QudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgdGhpcy5yZW5kZXIodGFzayk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMubGlzdENvbnRhaW5lcjtcbiAgfSxcbiAgb2xkVGFzazogbnVsbCxcbiAgcHJvamVjdDogbnVsbCxcbiAgY2FjaGVET00oKSB7XG4gICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgIHRoaXMucHJvamVjdHNMaXN0SXRlbXMgPSB0aGlzLmxpc3RDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgfSxcbiAgYmluZEV2ZW50cyguLi5hcmdzKSB7XG4gICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5lZGl0VGFzayA9IHRoaXMuZWRpdFRhc2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmNvbXBsZXRlVGFzayA9IHRoaXMuY29tcGxldGVUYXNrLmJpbmQodGhpcyk7XG4gICAgYXJncy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSkge1xuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoJ2RlbGV0ZScpKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlVGFzaywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY29tcGxldGVUYXNrKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZWRpdFRhc2spO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHRoaXMgd2lsbCBuZWVkIHRvIGdlbmVyYXRlIGEgZm9ybVxuICAgIC8vIHJlbW92ZXMgdGhlIGJ1dHRvblxuICB9LFxuICByZW5kZXIodGFzaykge1xuICAgIGlmICh0YXNrKSB7XG4gICAgICBjb25zdCBsaXN0SXRlbVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IGxpc3RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCB0YXNrQ2hlY2tib3ggPSBidWlsZEJ1dHRvbignY2hlY2tib3gnLCAndGFzaycpO1xuXG4gICAgICBjb25zdCB0YXNrQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBsaXN0SXRlbVdyYXBwZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnLCB0YXNrLnV1aWRUYXNrKTtcbiAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkLXByb2onLCB0YXNrLnV1aWRQcm9qKTtcbiAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgdGFza0NvbnRlbnQuY2xhc3NMaXN0LmFkZCgndGFza19saXN0X2l0ZW1fY29udGVudCcpO1xuICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgndGFza19saXN0X2l0ZW0nKTtcbiAgICAgIHRhc2tBY3Rpb25zLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfYWN0aW9ucycpO1xuICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFza19uYW1lJyk7XG4gICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcblxuICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFza19wcmlvcml0eScpO1xuICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHkgJHt0YXNrLnByaW9yaXR5fWA7XG5cbiAgICAgIHRhc2tDaGVja2JveC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YCk7XG5cbiAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XG4gICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG5cbiAgICAgIGlmICh0YXNrLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFza19kZXNjcmlwdGlvbicpO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFzay5kdWVfZGF0ZSAhPT0gdW5kZWZpbmVkIHx8IHRhc2suZHVlX3RpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBkYXRlVGltZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRhdGVUaW1lVGV4dDtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGAke3Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCk7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShgMS0yLTEwMDAgJHt0YXNrLmR1ZV90aW1lfWApO1xuICAgICAgICBjb25zdCB0aW1lUHJvcGVydGllcyA9IHtcbiAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGFzay5kdWVfZGF0ZSAmJiAhdGFzay5kdWVfdGltZSkge1xuICAgICAgICAgIGRhdGVUaW1lVGV4dCA9IGRhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRhc2suZHVlX2RhdGUgJiYgdGFzay5kdWVfdGltZSkge1xuICAgICAgICAgIGRhdGVUaW1lVGV4dCA9IHRpbWUudG9Mb2NhbGVTdHJpbmcoJ2VuLXVzJywgdGltZVByb3BlcnRpZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGVUaW1lVGV4dCA9IGAke2RhdGUudG9EYXRlU3RyaW5nKCl9ICR7dGltZS50b0xvY2FsZVN0cmluZyhcbiAgICAgICAgICAgICdlbi11cycsXG4gICAgICAgICAgICB0aW1lUHJvcGVydGllc1xuICAgICAgICAgICl9YDtcbiAgICAgICAgfVxuICAgICAgICBkYXRlVGltZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgndGFza19kdWVfZGF0ZV90aW1lJyk7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lQnV0dG9uID0gYnVpbGRCdXR0b24oJ2RhdGUnLCAndGFzaycsIGRhdGVUaW1lVGV4dCk7XG4gICAgICAgIGRhdGVUaW1lV3JhcHBlci5hcHBlbmRDaGlsZChkYXRlVGltZUJ1dHRvbik7XG4gICAgICAgIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKGRhdGVUaW1lV3JhcHBlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1dHRvbkRlbGV0ZSA9IGJ1aWxkQnV0dG9uKCdkZWxldGUnLCAndGFzaycpO1xuICAgICAgY29uc3QgYnV0dG9uRWRpdCA9IGJ1aWxkQnV0dG9uKCdlZGl0JywgJ3Rhc2snKTtcbiAgICAgIHRhc2tBY3Rpb25zLmFwcGVuZENoaWxkKGJ1dHRvbkRlbGV0ZSk7XG4gICAgICB0YXNrQWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25FZGl0KTtcblxuICAgICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NvbnRlbnQpO1xuICAgICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0FjdGlvbnMpO1xuICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdEl0ZW1Db250YWluZXIpO1xuXG4gICAgICBsaXN0SXRlbVdyYXBwZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKGJ1dHRvbkRlbGV0ZSwgdGFza0NoZWNrYm94LCBsaXN0SXRlbVdyYXBwZXIpO1xuXG4gICAgICBpZiAoIXRoaXMub2xkVGFzaykge1xuICAgICAgICAvLyBhcHBlbmRzIG5ldyB0YXNrXG4gICAgICAgIGxpc3RJdGVtV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd0YXNrX25ldycpO1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEl0ZW1XcmFwcGVyKTtcbiAgICAgICAgdGhpcy5zdG9wQW5pbWF0aW9uKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhcHBlbmRzIHVwZGF0ZWQgdGFza1xuICAgICAgICB0aGlzLm9sZFRhc2sucmVwbGFjZVdpdGgobGlzdEl0ZW1XcmFwcGVyKTtcbiAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIH1cbiAgfSxcbiAgY29tcGxldGVUYXNrKGUpIHtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IGxpc3RJdGVtO1xuICAgIHRoaXMucmVtb3ZlVGFzaygpO1xuICB9LFxuICByZW1vdmVUYXNrKGUpIHtcbiAgICAvLyBjcmVhdGUgYSBtb2RhbCB0byBjb25maXJtIHJlbW92YWxcbiAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9XG4gICAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICBsZXQgdXVpZFRhc2sgPSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQ7XG4gICAgICBidWlsZE1vZGFsUmVtb3ZlKHRoaXMucHJvamVjdC5maW5kVGFzayh1dWlkVGFzaykpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdmVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMucHJvamVjdC5yZW1vdmVUYXNrKHRoaXMucmVtb3ZlU2VsZWN0aW9uLmRhdGFzZXQudXVpZCk7XG4gICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbi5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9sZFRhc2sucmVtb3ZlKCk7XG4gICAgICB0aGlzLm9sZFRhc2sgPSBudWxsO1xuICAgIH1cbiAgfSxcbiAgZWRpdFRhc2soZSkge1xuICAgIHRoaXMub2xkVGFzayA9IGUuY3VycmVudFRhcmdldDtcbiAgICBidWlsZFRhc2tzRm9ybShlKTtcbiAgfSxcbiAgcmVzZXRPbGRUYXNrKG9sZFRhc2spIHtcbiAgICBpZiAodGhpcy5vbGRUYXNrKSB7XG4gICAgICB0aGlzLm9sZFRhc2sgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAob2xkVGFzaykge1xuICAgICAgdGhpcy5vbGRUYXNrID0gb2xkVGFzaztcbiAgICB9XG4gIH0sXG4gIHN0b3BBbmltYXRpb24oZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgfSwgJzIwMCcpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3NMaXN0O1xuIiwiaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBJY29uRmxhZyBmcm9tICcuLi9hc3NldHMvaWNvbnMvZmxhZy5zdmcnO1xuaW1wb3J0IEljb25DaGVjayBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2hlY2tfc21hbGwuc3ZnJztcbmltcG9ydCBJY29uUHJvamVjdCBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Zyc7XG5pbXBvcnQgSWNvbkluYm94IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9pbmJveC5zdmcnO1xuaW1wb3J0ICcuLi9zdHlsZXMvdGFza3Nfb3B0aW9ucy5jc3MnO1xuXG5jb25zdCBidWlsZE9wdGlvbnMgPSAodHlwZSwgYnV0dG9uLCBkaWFsb2cpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgdHlwZSxcbiAgICBidXR0b24sXG4gICAgZGlhbG9nLFxuICAgIGljb246IEljb25GbGFnLFxuICAgIGZvcm1JdGVtOiBidXR0b24ucGFyZW50RWxlbWVudCxcbiAgICBidG5JY29uOiBidXR0b24ucXVlcnlTZWxlY3RvcignLmltZ193cmFwcGVyJykuZmlyc3RDaGlsZCxcbiAgICBidG5TZWxlY3RUZXh0OiBidXR0b24ucXVlcnlTZWxlY3RvcihgLnRhc2tfJHt0eXBlfWApLFxuICB9O1xuXG4gIGlmICh0eXBlICE9PSAncHJpb3JpdHknKSB7XG4gICAgc3RhdGUuaWNvbiA9IEljb25Qcm9qZWN0O1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIG9wdGlvbnMoc3RhdGUpLFxuICApXG59O1xuXG4vLyBjcmVhdGVzIGEgbW9kYWwgZm9yIHByaW9yaXR5IG9wdGlvbnNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkU2VsZWN0T3B0aW9ucyhlKSB7XG4gIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkLnNsaWNlKGUuY3VycmVudFRhcmdldC5pZC5pbmRleE9mKCdfJykgKyAxKTtcbiAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICBjb25zdCBzdGF0ZSA9IGJ1aWxkT3B0aW9ucyhpZCwgZS5jdXJyZW50VGFyZ2V0LCBkaWFsb2dFbGVtZW50KTtcbiAgc3RhdGUuaW5pdCgpO1xuICBkaWFsb2dFbGVtZW50LmlkID0gYHRhc2tfc2VsZWN0XyR7aWR9X29wdGlvbnNgO1xuICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKHN0YXRlLnJlbmRlcigpKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaWFsb2dFbGVtZW50KTtcbiAgc3RhdGUuY2FjaGVET00oKTtcbiAgc3RhdGUuYmluZEV2ZW50cygpO1xuICBkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xufVxuXG5jb25zdCBvcHRpb25zID0gKHN0YXRlKSA9PiAoe1xuICB0eXBlOiBzdGF0ZS50eXBlLFxuICBkaWFsb2dFbGVtZW50OiBzdGF0ZS5kaWFsb2csXG4gIGN1cnJlbnRTZWxlY3Rpb246IG51bGwsXG4gIGJ0blNlbGVjdDogc3RhdGUuYnV0dG9uLFxuICBidG5TZWxlY3RUZXh0OiBzdGF0ZS5idG5TZWxlY3RUZXh0LFxuICBidG5JY29uOiBzdGF0ZS5idG5JY29uLFxuICBvcHRpb25JY29uOiBzdGF0ZS5pY29uLFxuICBmb3JtSXRlbTogc3RhdGUuZm9ybUl0ZW0sXG4gIG1lZGlhOiB3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogNzY4cHgpJyksXG4gIG9ic2VydmVyOiBudWxsLFxuICBpbml0KCkge1xuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLnR5cGV9YCk7XG4gICAgdGhpcy5jdXJyZW50U2VsZWN0aW9uID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgfSxcbiAgY2FjaGVET00oKSB7XG4gICAgdGhpcy5vcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wdGlvbicpO1xuICB9LFxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuY2xvc2VNb2RhbCA9IHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2VsZWN0ID0gdGhpcy5zZWxlY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNlbGVjdCkpO1xuICAgIHRoaXMuY2FsbEJhY2sgPSB0aGlzLmNhbGxCYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLmNhbGxCYWNrKTtcbiAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5mb3JtSXRlbSk7XG5cbiAgICB0aGlzLm1lZGlhLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG9wdGlvbnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgb3B0aW9uc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIG9wdGlvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgIGxldCBwcm9qZWN0cyA9IG51bGw7XG5cbiAgICBsZXQgaSA9IDE7XG4gICAgbGV0IGxlbmd0aCA9IDU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBpID0gMDtcbiAgICAgIHByb2plY3RzID0gcHJvamVjdENvbnRyb2xsZXIuaW5ib3guY29uY2F0KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKVxuICAgICAgbGVuZ3RoID0gcHJvamVjdHMubGVuZ3RoO1xuICAgIH1cbiAgICBmb3IgKGk7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGNvbnN0IGltYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwcm9qZWN0JyAmJiBwcm9qZWN0c1tpXS50aXRsZSA9PT0gJ0luYm94Jykge1xuICAgICAgICBpbWFnZS5zcmMgPSBJY29uSW5ib3g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0X2NpcmNsZScpO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlLnNyYyA9IHRoaXMub3B0aW9uSWNvbjtcbiAgICAgIH1cbiAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuXG4gICAgICBpbWFnZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nX3dyYXBwZXInKTtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdvcHRpb24nKVxuICAgICAgaW1hZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXIpO1xuICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgICBpZiAodGhpcy50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgLy8gaW1hZ2UuY2xhc3NMaXN0LmFkZChgJHtwcm9qZWN0c1tpXS50aXRsZX1gKVxuICAgICAgICBvcHRpb24uZGF0YXNldC52YWx1ZSA9IHByb2plY3RzW2ldLnV1aWQ7XG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBwcm9qZWN0c1tpXS50aXRsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoYHByaW9yaXR5XyR7aX1gKTtcbiAgICAgICAgb3B0aW9uLmRhdGFzZXQudmFsdWUgPSBpO1xuICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYFByaW9yaXR5ICR7aX1gO1xuICAgICAgfVxuXG4gICAgaWYgKChwcm9qZWN0cyAmJiBwcm9qZWN0c1tpXS51dWlkID09PSB0aGlzLmN1cnJlbnRTZWxlY3Rpb24pIHx8ICghcHJvamVjdHMgJiYgaSA9PT0gcGFyc2VJbnQodGhpcy5jdXJyZW50U2VsZWN0aW9uKSkpIHtcbiAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoYHNlbGVjdGVkYCk7XG4gICAgICAgIGNvbnN0IGltZ0NoZWNrID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZ0NoZWNrLnNyYyA9IEljb25DaGVjaztcbiAgICAgICAgaW1nQ2hlY2suY2xhc3NMaXN0LmFkZCgnb3B0aW9uX3NlbGVjdGVkX2NoZWNrbWFyaycpO1xuICAgICAgICBpbWdDaGVjay5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKGltZ0NoZWNrKTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnNMaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfVxuXG4gICAgb3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQob3B0aW9uc0xpc3QpO1xuICAgIHJldHVybiBvcHRpb25zV3JhcHBlcjtcbiAgfSxcbiAgY2xvc2VNb2RhbChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdESUFMT0cnKSB7XG4gICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfVxuICB9LFxuICByZW1vdmVNb2RhbCgpIHtcbiAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5vYnNlcnZlci51bm9ic2VydmUodGhpcy5idG5TZWxlY3QpO1xuICB9LFxuICBzZWxlY3QoZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgdGhpcy5idG5TZWxlY3RUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdENvbnRyb2xsZXIuZmluZChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZSkudGl0bGU7XG4gICAgICBjb25zdCBuZXdJY29uID0gbmV3IEltYWdlKClcbiAgICAgIG5ld0ljb24uc3JjID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUgIT09IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgPyBJY29uUHJvamVjdCA6IEljb25JbmJveDtcbiAgICAgIG5ld0ljb24uY2xhc3NMaXN0LmFkZChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZSAhPT0gcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZCA/ICdwcm9qZWN0X2NpcmNsZScgOiAncHJvamVjdF9pbmJveCcpO1xuICAgICAgbmV3SWNvbi5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgIGlmIChuZXdJY29uLnNyYyAhPT0gdGhpcy5idG5JY29uLmRhdGFzZXQuaW5qZWN0VXJsKSB7XG4gICAgICAgIC8vIGlmIHRoZSBuZXcgaWNvbiBzcmMgYW5kIHRoZSBjdXJyZW50IGljb24gc3JjIGFyZSBub3QgdGhlIHNhbWVcbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgbm9kZVxuICAgICAgICB0aGlzLmJ0bkljb24ucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQobmV3SWNvbiwgdGhpcy5idG5JY29uKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gICAgICB0aGlzLmJ0blNlbGVjdFRleHQudGV4dENvbnRlbnQgPSBgUCR7dGhpcy5pbnB1dC52YWx1ZX1gO1xuICAgICAgdGhpcy5idG5JY29uLmNsYXNzTmFtZS5iYXNlVmFsID0gYHByaW9yaXR5XyR7dGhpcy5pbnB1dC52YWx1ZX1gO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gIH0sXG4gIGNhbGxCYWNrKGVudHJpZXMpIHtcbiAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBpZiAoZW50cnkuY29udGVudEJveFNpemUpIHtcbiAgICAgICAgaWYgKGVudHJ5LmNvbnRlbnRCb3hTaXplWzBdKSB7XG4gICAgICAgICAgY29uc3QgYm91bmRzID0gZW50cnkudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5zdHlsZS53aWR0aCA9IGJvdW5kcy53aWR0aCArICdweCc7XG4gICAgICAgICAgaWYgKCh0aGlzLmRpYWxvZ0VsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgYm91bmRzLmJvdHRvbSkgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBkaWFsb2cncyBoZWlnaHQgYW5kIGZvcm0gaXRlbSdzIGJvdHRvbSBpcyBncmVhdGVyIHRoYW4gd2luZG93IGhlaWdodFxuICAgICAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtib3VuZHMueH1weCwgJHtib3VuZHMudG9wIC0gdGhpcy5kaWFsb2dFbGVtZW50Lm9mZnNldEhlaWdodH1weClgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2JvdW5kcy54fXB4LCAke2JvdW5kcy5ib3R0b219cHgpYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG59KTtcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJzdWInO1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi4vc3RvcmFnZS9zdG9yYWdlJztcblxuY29uc3QgZ2V0Rm9ybVZhbHVlcyA9IChpbnB1dHMpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGlmIChpbnB1dC5pZCA9PT0gJ3ByaW9yaXR5Jykge1xuICAgICAgb2JqW2lucHV0LmlkXSA9IHBhcnNlSW50KGlucHV0LnZhbHVlLnNsaWNlKGlucHV0LnZhbHVlLmxlbmd0aCAtIDEsIGlucHV0LnZhbHVlLmxlbmd0aCksIDEwKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaW5wdXQuaWQgPT09ICdkdWVfZGF0ZScgJiYgaW5wdXQudmFsdWUubGVuZ3RoID09PSAwICYmIFsuLi5pbnB1dHNdLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09ICdkdWVfdGltZScpLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgLy8gaWYgdGltZSBoYXMgYSB2YWx1ZSBhbmQgZGF0ZSBoYXMgbm8gdmFsdWVcbiAgICAgIC8vIGRhdGUgc2V0IHRvIHRvZGF5J3MgZGF0ZVxuICAgICAgb2JqW2lucHV0LmlkXSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICAgIH0gZWxzZSBpZiAoaW5wdXQudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICBvYmpbaW5wdXQuaWRdID0gaW5wdXQudmFsdWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IGJ1aWxkUHJvamVjdCA9ICh0YXNrcykgPT4ge1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICB0YXNrcyxcbiAgICB1dWlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLFxuICB9O1xuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm9qZWN0KHN0YXRlKSk7XG59O1xuXG5jb25zdCB0YXNrID0gKHV1aWQpID0+IHtcbiAgY29uc3QgdHlwZSA9ICd0YXNrJztcbiAgY29uc3QgdXVpZFRhc2sgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICBjb25zdCB1dWlkUHJvaiA9IHV1aWQ7XG4gIHJldHVybiB7IHV1aWRUYXNrLCB1dWlkUHJvaiwgdHlwZSB9O1xufTtcblxuLy8gY3JlYXRlcyBhIHByb2plY3Qgb2JqZWN0XG4vLyB0YXNrcyBwcm9wZXJ0eSBjcmVhdGVkIHVwb24gb2JqZWN0IGNyZWF0aW9uXG5jb25zdCBwcm9qZWN0ID0gKHN0YXRlKSA9PiAoe1xuICB0eXBlOiAncHJvamVjdCcsXG4gIGFjdGl2ZTogZmFsc2UsIC8vIHRoZXJlIGNhbiBvbmx5IGJlIG9uZSBwcm9qZWN0IGFjdGl2ZVxuICB1dWlkOiBzdGF0ZS51dWlkLFxuICB0YXNrczogc3RhdGUudGFza3MgfHwgW10sXG4gIGFkZFRhc2soaW5wdXRzKSB7XG4gICAgLy8gbmVlZCB0byBhbGxvdyB1c2VyIHRvIHBpY2sgd2hhdCBwcm9qZWN0IHRvIGFzc2lnbiB0aGUgbmV3bHkvZWRpdGVkIHRhc2tcbiAgICAvLyBwdXNoZXMgdGFzayB0byByZXNwZWN0aXZlIHByb2plY3RcbiAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBPYmplY3QuYXNzaWduKHRhc2sodGhpcy51dWlkKSwgZm9ybVZhbHVlcyk7XG5cbiAgICBpZiAoZm9ybVZhbHVlcy5wcm9qZWN0ICYmIGZvcm1WYWx1ZXMucHJvamVjdCAhPT0gbmV3VGFzay51dWlkUHJvaikge1xuICAgICAgbmV3VGFzay51dWlkUHJvaiA9IGZvcm1WYWx1ZXMucHJvamVjdDtcbiAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQoZm9ybVZhbHVlcy5wcm9qZWN0KS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgaWYgKFxuICAgICAgICBuZXcgRGF0ZShgJHtuZXdUYXNrLmR1ZV9kYXRlfVQwMDowMDowMGApLnRvRGF0ZVN0cmluZygpID09PVxuICAgICAgICBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpXG4gICAgICApIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2snLCBuZXdUYXNrKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2snLCBuZXdUYXNrKTtcbiAgICB9XG4gICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWxsUHJvamVjdHMoKTtcbiAgfSxcbiAgcmVtb3ZlVGFzayh1dWlkKSB7XG4gICAgLy8gaWYgdGhlIHJlbW92ZSB0YXNrIGlzIGluIHRvZGF5XG4gICAgLy8gcmVtb3ZlIGl0IGZyb20gdG9kYXkgQU5EIGl0J3MgcmVzcGVjdGl2ZSBwcm9qZWN0XG4gICAgLy8gaWYgdGhlIHRhc2sncyBkYXRlIGluIHRvZGF5IGlzIGVkaXRlZFxuICAgIC8vIHJlbW92ZSBpdCBmcm9tIG9ubHkgdG9kYXlcbiAgICBjb25zdCB0YXNrID0gdGhpcy5maW5kVGFzayh1dWlkKTtcbiAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICAgIC8vIHJlbW92ZXMgdGFzayBpbiByZXNwZWN0aXZlIHByb2plY3RcbiAgICBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgaWYgKHRhc2sudXVpZFRhc2sgPT09IHV1aWQpIHtcbiAgICAgICAgICBwcm9qZWN0LnRhc2tzLnNwbGljZShwcm9qZWN0LnRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICB9LFxuICB1cGRhdGVUYXNrKHV1aWQsIGlucHV0cykge1xuICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKGlucHV0cyk7XG4gICAgY29uc3QgbmV3VGFzayA9IE9iamVjdC5hc3NpZ24odGhpcy5maW5kVGFzayh1dWlkKSwgZm9ybVZhbHVlcyk7XG4gICAgLy8gaWYgdGhlIHByb2plY3QgaXMgY2hhbmdlIGZvciBhIHRhc2tcbiAgICBpZiAoZm9ybVZhbHVlcy5wcm9qZWN0ICYmIGZvcm1WYWx1ZXMucHJvamVjdCAhPT0gbmV3VGFzay51dWlkUHJvaikge1xuICAgICAgdGhpcy5yZW1vdmVUYXNrKG5ld1Rhc2sudXVpZFRhc2spO1xuICAgICAgbmV3VGFzay51dWlkUHJvaiA9IGZvcm1WYWx1ZXMucHJvamVjdDtcbiAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQoZm9ybVZhbHVlcy5wcm9qZWN0KS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVRhc2snKTtcbiAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudGl0bGUgPT09ICdUb2RheScpIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS50aXRsZSA9PT0gJ1RvZGF5Jykge1xuICAgICAgICBpZiAobmV3IERhdGUoYCR7bmV3VGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVUYXNrJywgbmV3VGFzayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVRhc2snKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWxsUHJvamVjdHMoKTtcbiAgfSxcbiAgZmluZFRhc2sodXVpZCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQudXVpZFRhc2sgPT09IHV1aWQpO1xuICB9LFxufSk7XG5cbmNvbnN0IHByb2plY3RDb250cm9sbGVyID0ge1xuICBtaXNjOiBudWxsLFxuICBwcm9qZWN0czogbnVsbCxcbiAgaW5ib3g6IFtPYmplY3QuYXNzaWduKGJ1aWxkUHJvamVjdCgpLCB7IHRpdGxlOiAnSW5ib3gnIH0pXSwgLy8gd2lsbCBob2xkIHRhc2tzIGFzc2lnbmVkIHRvIHRoZSAnaW5ib3gnXG4gIHRvZGF5OiBbT2JqZWN0LmFzc2lnbihidWlsZFByb2plY3QoKSwgeyB0aXRsZTogJ1RvZGF5JyB9KV0sXG4gIGFsbFByb2plY3RzOiBbXSxcbiAgYWRkUHJvamVjdChpbnB1dHMpIHtcbiAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBidWlsZFByb2plY3QoKTtcbiAgICB0aGlzLnByb2plY3RzLnB1c2goT2JqZWN0LmFzc2lnbihuZXdQcm9qZWN0LCBmb3JtVmFsdWVzKSk7XG4gICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpO1xuICAgIHRoaXMuc2V0QWN0aXZlKG5ld1Byb2plY3QudXVpZCk7XG4gIH0sXG4gIHJlbW92ZSh1dWlkKSB7XG4gICAgaWYgKHV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS51dWlkKSB7XG4gICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQpO1xuICAgIH1cbiAgICB0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YodGhpcy5maW5kKHV1aWQpKSwgMSk7XG4gICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpO1xuICB9LFxuICBmaW5kKHV1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5hbGxQcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnV1aWQgPT09IHV1aWQpO1xuICB9LFxuICBzZXRBY3RpdmUodXVpZCkge1xuICAgIGlmICh0aGlzLmZpbmRBY3RpdmUoKSkge1xuICAgICAgdGhpcy5maW5kQWN0aXZlKCkuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHV1aWQpIHtcbiAgICAgIHRoaXMuZmluZCh1dWlkKS5hY3RpdmUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXV1aWQgJiYgdHlwZW9mIHV1aWQgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5pbmJveC5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSxcbiAgZmluZEFjdGl2ZSgpIHtcbiAgICBpZiAoIXRoaXMuYWxsUHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5hY3RpdmUgPT09IHRydWUpKSB7XG4gICAgICB0aGlzLmluYm94WzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5pbmJveDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWxsUHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5hY3RpdmUgPT09IHRydWUpO1xuICAgIH1cbiAgfSxcbiAgc2V0QWxsUHJvamVjdHMoKSB7XG4gICAgdGhpcy5hbGxQcm9qZWN0cyA9IHRoaXMuaW5ib3guY29uY2F0KHRoaXMucHJvamVjdHMsIHRoaXMudG9kYXkpO1xuICAgIHRoaXMuc29ydCgpO1xuICAgIHBvcHVsYXRlU3RvcmFnZSgpO1xuICB9LFxuICBzZXRNaXNjUHJvamVjdHMoKSB7XG4gICAgdGhpcy5taXNjID0gdGhpcy5pbmJveC5jb25jYXQodGhpcy50b2RheSk7XG4gIH0sXG4gIHNvcnQoKSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpO1xuICAgIHRoaXMuYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QudGFza3MubGVuZ3RoID4gMCAmJiBwcm9qZWN0LnRpdGxlICE9PSAnVG9kYXknKSB7XG4gICAgICAgIHByb2plY3QudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gbmV3IERhdGUoYCR7dGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICBpZiAoIXRoaXMudG9kYXlbMF0uZmluZFRhc2sodGFzay51dWlkVGFzaykgJiYgdGFza0RhdGUgPT09IHRvZGF5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZGF5WzBdLnRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgaW5pdCgpIHtcbiAgICB0aGlzLnByb2plY3RzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihvYmosIGJ1aWxkUHJvamVjdChvYmoudGFza3MpKTtcbiAgICAgIG9iai50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIHRhc2sudXVpZFByb2ogPSBvYmoudXVpZDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmluYm94WzBdLCBidWlsZFByb2plY3QodGhpcy5pbmJveFswXS50YXNrcykpO1xuICAgIHRoaXMuaW5ib3hbMF0udGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgdGFzay51dWlkUHJvaiA9IHRoaXMuaW5ib3hbMF0udXVpZDtcbiAgICB9KTtcbiAgICB0aGlzLnNldEFsbFByb2plY3RzKCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0Q29udHJvbGxlcjtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgc3Vic2NyaWJlcnM6IHt9LFxuICBzdWJzY3JpYmUoc3Vic2NyaWJlciwgaGFuZGxlcikge1xuICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdKSB7XG4gICAgICBkZWxldGUgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSA9IHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gfHwgW107XG4gICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5wdXNoKGhhbmRsZXIpO1xuICB9LFxuICB1bnN1YnNjcmliZShzdWJzY3JpYmVyLCBoYW5kbGVyKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXVtpXSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwdWJsaXNoKHN1YnNjcmliZXIsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG59O1xuIiwiaW1wb3J0IHByb2plY3RDb250cm9sbGVyIGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcblxuLy8gZ2V0cyBpdGVtcyBmcm9tIGxvY2FsU3RvcmFnZVxuZXhwb3J0IGZ1bmN0aW9uIHNldFByb2plY3RzKCkge1xuICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpXG4gICAgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKVxuICAgIDogW107XG4gIHByb2plY3RDb250cm9sbGVyLmluYm94ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luYm94JylcbiAgICA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luYm94JykpXG4gICAgOiBwcm9qZWN0Q29udHJvbGxlci5pbmJveDtcbiAgcHJvamVjdENvbnRyb2xsZXIuaW5pdCgpO1xufVxuXG4vLyBzZXRzIGl0ZW1zIGluIGxvY2FsU3RvcmFnZVxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luYm94JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIuaW5ib3gpKTtcbn1cbiIsIi8vIHJldHVybnMgYW4gb2JqZWN0IGFuZCBhcnJheSBvZiBmaWxlIHR5cGVzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbXBvcnRBbGwocikge1xuICBjb25zdCBmaWxlcyA9IHt9O1xuICBjb25zdCBmaWxlc0FyciA9IFtdO1xuICByLmtleXMoKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgZmlsZXNbaXRlbS5yZXBsYWNlKCcuLycsICcnKV0gPSByKGl0ZW0pO1xuICAgIGZpbGVzQXJyLnB1c2goaXRlbS5yZXBsYWNlKCcuLycsICcnKSk7XG4gIH0pO1xuXG4gIHJldHVybiB7IGZpbGVzLCBmaWxlc0FyciB9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9