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
}

.overlay_main_content.dim {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
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
}

/* general styles for similar elements existing on different modules */
a:visited {
    color: inherit;
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
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
}

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
}

.form_buttons > button:hover {
    filter: brightness(0.85);
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
        opacity: 0%
    }

    100% {
        opacity: 100%;
    }
}`, "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA;IACI,8CAA8C;IAC9C,sBAAsB;IACtB;;;;;+CAKuD;AAC3D;;AAEA;IACI,sBAAsB;IACtB,8BAA8B;IAC9B,2BAA2B;IAC3B,SAAS;IACT,UAAU;IACV,uCAAuC;AAC3C;;AAEA;IACI,qBAAqB;IACrB,mDAAmD;IACnD,yCAAyC;IACzC,wCAAwC;IACxC,mCAAmC;IACnC,sCAAsC;IACtC,0BAA0B;IAC1B,2BAA2B;IAC3B,2BAA2B;IAC3B,2BAA2B;IAC3B,2BAA2B;IAC3B,wBAAwB;IACxB,oBAAoB;IACpB,iCAAiC;IACjC,uCAAuC;IACvC,2BAA2B;AAC/B;;AAEA;IACI,iBAAiB;IACjB,gCAAgC;AACpC;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,oBAAoB;IACpB,eAAe;IACf,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,UAAU;IACV,qCAAqC;AACzC;;AAEA;IACI,OAAO;IACP,WAAW;IACX,aAAa;IACb,2CAA2C;AAC/C;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,oBAAoB;IACpB,WAAW;IACX,gCAAgC;AACpC;;AAEA,sEAAsE;AACtE;IACI,cAAc;AAClB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,oCAAoC;AACxC;;AAEA;;IAEI,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,YAAY;IACZ,mCAAmC;AACvC;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,eAAe;AACnB;;AAEA;;IAEI,YAAY;IACZ,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,gBAAgB;IAChB,UAAU;IACV,2CAA2C;IAC3C,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;;IAEI,YAAY;IACZ,qBAAqB;IACrB,oBAAoB;AACxB;;AAEA;;IAEI,wCAAwC;IACxC,aAAa;IACb,mDAAmD;AACvD;;AAEA;IACI,aAAa;IACb,oBAAoB;IACpB,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,oCAAoC;IACpC,oBAAoB;IACpB,mBAAmB;IACnB,0BAA0B;AAC9B;;AAEA;IACI,uCAAuC;AAC3C;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,8CAA8C;AAClD;;AAEA;;;;;;;IAOI,oCAAoC;AACxC;;AAEA;IACI;QACI,wBAAwB;IAC5B;;IAEA;QACI,UAAU;IACd;;IAEA;QACI,gBAAgB;QAChB,aAAa;IACjB;AACJ;;AAEA;IACI;QACI;IACJ;;IAEA;QACI,aAAa;IACjB;AACJ","sourcesContent":["@font-face {\n    /* https://fonts.google.com/specimen/Poppins */\n    font-family: 'Poppins';\n    src: url('./assets/fonts/Poppins/Poppins-Light.ttf'),\n        url('./assets/fonts/Poppins/Poppins-Medium.ttf'),\n        url('./assets/fonts/Poppins/Poppins-Regular.ttf'),\n        url('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),\n        url('./assets/fonts/Poppins/Poppins-Bold.ttf'),\n        url('./assets/fonts/Poppins/Poppins-ExtraBold.ttf');\n}\n\n*, *::before, *::after {\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    font-family: var(--font-family-primary);\n}\n\n:root {\n    /* custom variables */\n    --font-family-primary: 'Poppins', Arial, sans-serif;\n    --text-color-primary: rgba(32, 32, 32, 1);\n    --background-primary: rgb(255, 255, 255);\n    --accent-primary: rgb(173, 77, 232);\n    --accent-secondary: rgb(241, 241, 241);\n    --accent-tertiary: #168DEE;\n    --priority-1-color: #F84125;\n    --priority-2-color: #ffa500;\n    --priority-3-color: #14EBC0;\n    --priority-4-color: #9e9e9e;\n    --button-radius: 0.35rem;\n    --circle-radius: 50%;\n    --button-no-text-padding: 0.25rem;\n    --button-with-text-padding: 0.5rem 1rem;\n    --column-gap-small: 0.25rem;\n}\n\nbody {\n    min-height: 100vh;\n    animation: fade-in 200ms ease-in;\n}\n\n#todo_app {\n    min-height: inherit;\n    display: grid;\n    grid-template-rows: min-content 1fr;\n}\n\n#content {\n    position: relative;\n}\n\n#content {\n    display: grid;\n}\n\n.overlay_main_content {\n    pointer-events: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.3);\n    opacity: 0;\n    transition: opacity 200ms ease-in-out;\n}\n\n.overlay_main_content.dim {\n    opacity: 1;\n    transition: opacity 200ms ease-in-out;\n}\n\n#main_content {\n    flex: 1;\n    padding: 5%;\n    display: grid;\n    background-color: var(--background-primary);\n}\n\n#main_content > :first-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n    justify-self: center;\n    width: 100%;\n    animation: fade-in 300ms ease-in;\n}\n\n/* general styles for similar elements existing on different modules */\na:visited {\n    color: inherit;\n}\n\n.img_wrapper {\n    display: flex;\n}\n\ndialog:not(#task_select_project_options):not(#task_select_priority_options) {\n    margin: auto;\n    min-width: 60vw;\n    border-radius: 0.75rem;\n    border: none;\n}\n\ndialog::backdrop {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n.nav_project > svg,\n.project_circle {\n    color: rgb(70, 70, 70);\n}\n\nbutton {\n    display: flex;\n    background: transparent;\n    border: none;\n    border-radius: var(--button-radius);\n}\n\n.btn_img_wrapper {\n    display: flex;\n}\n\nbutton:hover {\n    cursor: pointer;\n}\n\nbutton > svg,\nbutton > * > svg {\n    height: auto;\n    width: clamp(1.25rem, 2.5vw, 1.5rem);\n}\n\n.form_item {\n    display: flex;\n    flex-direction: column;\n}\n\n.form_item::after {\n    content: '';\n    margin-top: 1rem;\n    width: 90%;\n    border-bottom: 2px solid rgba(0, 0, 0, 0.3);\n    opacity: 0.4;\n    align-self: center;\n}\n\n.form_item > * {\n    display: flex;\n    min-height: 50px;\n}\n\n.form_item > label {\n    align-items: center;\n}\n\n.form_item > .task_input,\n.form_item > .project_input {\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 1rem;\n}\n\n.form_item > .task_input:focus,\n.form_item > .project_input:focus {\n    background-color: rgba(255, 255, 255, 1);\n    outline: none;\n    box-shadow: 0px 0px 5px -1px inset rgba(0, 0, 0, 1);\n}\n\n.form_buttons {\n    display: flex;\n    justify-content: end;\n    column-gap: 0.5rem;\n    margin-top: 1rem;\n}\n\n.form_buttons > * {\n    background-color: rgb(226, 226, 226);\n    padding: 0.5rem 1rem;\n    border-radius: 2rem;\n    text-transform: capitalize;\n}\n\n.form_buttons > button[type=\"submit\"] {\n    background-color: var(--accent-primary);\n}\n\n.form_buttons > button[type=\"submit\"]:hover {\n    filter: brightness(0.85);\n}\n\n.form_buttons > button:hover {\n    filter: brightness(0.85);\n}\n\n.form_buttons > *:active {\n    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.8);\n}\n\n.form_item > .task_input:hover:not(:focus),\n.form_item > .project_input:hover:not(:focus),\n.projects >:last-child > .nav_projects > .btn_add_project:hover,\n.btn_add_project:hover,\n.btn_delete_project:hover,\n.task_actions > button:hover,\n#navbar > * > .container > button:hover {\n    background-color: rgba(0, 0, 0, 0.2);\n}\n\n@media screen and (min-width:768px) {\n    #main_content {\n        padding: 2% 2.5% 2% 2.5%;\n    }\n\n    #main_content > :first-child {\n        width: 70%;\n    }\n\n    #content {\n        position: static;\n        display: flex;\n    }\n}\n\n@keyframes fade-in {\n    0% {\n        opacity: 0%\n    }\n\n    100% {\n        opacity: 100%;\n    }\n}"],"sourceRoot":""}]);
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
}

header > #navbar {
    display: flex;
    justify-content: space-between;
    padding: 0.60rem 0.75rem;
}

header > #navbar > * > .container {
    display: flex;
    column-gap: var(--column-gap-small);
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

.input_search {
    width: min(350px, 50%);
    border: none;
    padding-left: 0.5rem;
}

header > #navbar > * > .container > * > svg {
    height: auto;
    width: clamp(1.75rem, 3vw, 2.5rem);
}`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;IACI,uCAAuC;IACvC,gCAAgC;AACpC;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,wBAAwB;AAC5B;;AAEA;IACI,aAAa;IACb,mCAAmC;AACvC;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,mCAAmC;IACnC,sCAAsC;AAC1C;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,sBAAsB;IACtB,YAAY;IACZ,oBAAoB;AACxB;;AAEA;IACI,YAAY;IACZ,kCAAkC;AACtC","sourcesContent":["header {\n    background-color: var(--accent-primary);\n    animation: fade-in 400ms ease-in;\n}\n\nheader > #navbar {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.60rem 0.75rem;\n}\n\nheader > #navbar > * > .container {\n    display: flex;\n    column-gap: var(--column-gap-small);\n}\n\nheader > #navbar > * > .container > * {\n    display: flex;\n    align-items: center;\n    border-radius: var(--button-radius);\n    padding: var(--button-no-text-padding);\n}\n\n#navbar > * > .container > button:hover {\n    color: var(--background-primary);\n}\n\n.input_search {\n    width: min(350px, 50%);\n    border: none;\n    padding-left: 0.5rem;\n}\n\nheader > #navbar > * > .container > * > svg {\n    height: auto;\n    width: clamp(1.75rem, 3vw, 2.5rem);\n}"],"sourceRoot":""}]);
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
}

.form_buttons > button[type="submit"] {
    background-color: rgba(200, 0, 0, 0.6);
}`, "",{"version":3,"sources":["webpack://./src/styles/modal_removal.css"],"names":[],"mappings":"AAAA,0CAA0C;AAC1C;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,sCAAsC;AAC1C","sourcesContent":["/* styles for task/project modal removal */\n.form_removal {\n    padding: 1rem;\n}\n\n.form_removal > div {\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n.item_for_removal {\n    text-decoration: underline;\n}\n\n.form_buttons > button[type=\"submit\"] {\n    background-color: rgba(200, 0, 0, 0.6);\n}"],"sourceRoot":""}]);
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
}`, "",{"version":3,"sources":["webpack://./src/styles/projects.css"],"names":[],"mappings":"AAAA,uDAAuD;AACvD;IACI,aAAa;IACb,+BAA+B;AACnC;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,mBAAmB;IACnB,yBAAyB;IACzB,eAAe;IACf,wCAAwC;IACxC,mCAAmC;AACvC","sourcesContent":["/* styles for list of projects on the content section */\n.projects >:last-child {\n    display: grid;\n    grid-auto-rows: min-content 1fr;\n}\n\n.projects >:last-child > .nav_projects {\n    justify-self: end;\n    margin-bottom: 1rem;\n}\n\n.projects >:last-child > .nav_projects > .btn_add_project {\n    background-color: rgba(0, 0, 0, 0.1);\n    display: flex;\n    align-items: center;\n    justify-items: flex-start;\n    min-width: 100%;\n    padding: var(--button-with-text-padding);\n    column-gap: var(--column-gap-small);\n}"],"sourceRoot":""}]);
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
}`, "",{"version":3,"sources":["webpack://./src/styles/projects_list.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;;;IAGI,oCAAoC;IACpC,iBAAiB;AACrB;;AAEA;;IAEI,mBAAmB;AACvB;;AAEA;;IAEI,kBAAkB;IAClB,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,wCAAwC;AAC5C;;AAEA;IACI,OAAO;AACX;;AAEA;;IAEI,sCAAsC;AAC1C","sourcesContent":[".projects_list > * {\n    display: flex;\n    flex-direction: column;\n    list-style: none;\n    row-gap: 0.5rem;\n}\n\n.projects_list > * > * {\n    display: flex;\n    border-radius: 0.75rem;\n    align-items: center;\n}\n\n.projects_list > * > li:hover,\n.projects_list > * > li:has(> a.active),\n#projects_container > *:first-child:has(> a.active) {\n    background-color: rgba(0, 0, 0, 0.1);\n    font-weight: bold;\n}\n\n.projects_list > * > li:hover span,\n.projects_list > * > li:has(> a.active):hover span {\n    visibility: visible;\n}\n\n.projects_list > * > li > span,\n.projects_list > * > li:has(> a.active) > span {\n    visibility: hidden;\n    margin-right: 0.5rem;\n}\n\n.projects_list > * > * > .nav_project {\n    display: flex;\n    align-items: center;\n    flex: 1;\n    padding: var(--button-with-text-padding);\n}\n\n.projects_list > * > * > .nav_project > span {\n    flex: 1;\n}\n\n#projects_container > div > .btn_add_project,\n.btn_delete_project {\n    padding: var(--button-no-text-padding);\n}"],"sourceRoot":""}]);
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
    background-color: var(--accent-secondary);
    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);
    width: min(75%, 350px);
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
}`, "",{"version":3,"sources":["webpack://./src/styles/sidebar.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,4BAA4B;IAC5B,iCAAiC;AACrC;;AAEA;IACI,mBAAmB;IACnB,yBAAyB;IACzB,uCAAuC;AAC3C;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,yCAAyC;IACzC,6CAA6C;IAC7C,sBAAsB;AAC1B;;AAEA;;IAEI,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,OAAO;IACP,wCAAwC;AAC5C;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;IACI,oCAAoC;IACpC,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;IACnB,4BAA4B;AAChC;;AAEA;IACI,kBAAkB;IAClB,oBAAoB;AACxB;;AAEA;IACI;QACI,mBAAmB;QACnB,gBAAgB;QAChB,cAAc;IAClB;;IAEA;QACI,sBAAsB;QACtB,cAAc;QACd,2CAA2C;IAC/C;;IAEA;QACI,aAAa;IACjB;;IAEA;QACI,WAAW;QACX,6CAA6C;IACjD;AACJ;;AAEA;IACI;QACI,4BAA4B;IAChC;;IAEA;QACI,yBAAyB;IAC7B;AACJ","sourcesContent":["#sidebar {\n    height: 100%;\n    width: 100%;\n    z-index: 99;\n    position: absolute;\n    visibility: hidden;\n}\n\n#sidebar.hide {\n    visibility: hidden;\n    transform: translateX(-100%);\n    transition: all 300ms ease-in-out;\n}\n\n#sidebar.show {\n    visibility: visible;\n    transform: translateX(0%);\n    transition: transform 300ms ease-in-out;\n}\n\n#sidebar > .container {\n    height: inherit;\n    display: flex;\n    flex-direction: column;\n    row-gap: 1rem;\n    padding: 1.25rem;\n    background-color: var(--accent-secondary);\n    box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    width: min(75%, 350px);\n}\n\n.nav_project,\n.nav_projects {\n    text-decoration: none;\n    column-gap: 0.75rem;\n}\n\n#projects_container > *:first-child {\n    display: flex;\n    align-items: center;\n}\n\n#projects_container > *:first-child > .nav_projects {\n    flex: 1;\n    padding: var(--button-with-text-padding);\n}\n\n#projects_container >:first-child {\n    border-radius: 0.75rem;\n    margin-bottom: 0.5rem;\n}\n\n#projects_container > *:first-child:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n    font-weight: bold;\n}\n\n#sidebar > .container:hover .btn_add_project {\n    visibility: visible;\n    color: var(--accent-primary);\n}\n\n#projects_container > *:first-child > .btn_add_project {\n    visibility: hidden;\n    margin-right: 0.5rem;\n}\n\n@media screen and (min-width:768px) {\n    #sidebar {\n        visibility: visible;\n        position: static;\n        width: inherit;\n    }\n\n    #sidebar.show {\n        width: min(40%, 350px);\n        display: block;\n        animation: slide-in-right 300ms ease-in-out;\n    }\n\n    #sidebar.hide {\n        display: none;\n    }\n\n    #sidebar > .container {\n        width: 100%;\n        box-shadow: 1px 4px 5px -1px rgba(0, 0, 0, 1);\n    }\n}\n\n@keyframes slide-in-right {\n    0% {\n        transform: translateX(-100%);\n    }\n\n    100% {\n        transform: translateX(0%);\n    }\n}"],"sourceRoot":""}]);
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
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_form.css"],"names":[],"mappings":"AAAA;IACI,oCAAoC;AACxC;;AAEA;IACI,aAAa;AACjB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,6BAA6B;IAC7B,wCAAwC;AAC5C;;AAEA;;IAEI,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,wBAAwB;IACxB,qBAAqB;IACrB,uBAAuB;IACvB,yDAAyD;IACzD,4BAA4B;IAC5B,2BAA2B;IAC3B,0BAA0B;AAC9B","sourcesContent":["#form_task::backdrop  {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n#form_task > .form {\n    padding: 1rem;\n}\n\n#form_task > .form > div,\n.form_task > div {\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.5rem;\n}\n\n.form_item > #description {\n    resize: vertical;\n    max-height: 200px;\n}\n\n.form_item > #btn_priority,\n.form_item > #btn_project {\n    display: flex;\n    align-items: center;\n    column-gap: var(--column-gap);\n    padding: var(--button-with-text-padding);\n}\n\n.form_item > #btn_priority > .task_priority,\n.form_item > #btn_project > .task_project {\n    flex: 1;\n    text-align: left;\n}\n\n.form_item > #btn_priority:hover .img_wrapper_chevron {\n    visibility: visible;\n}\n\n.form_item > #btn_priority > .img_wrapper_chevron {\n    visibility: hidden;\n}\n\n.form_item > #project {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    background: transparent;\n    background-image: url('../assets/icons/chevron_down.svg');\n    background-repeat: no-repeat;\n    background-position-x: 100%;\n    background-position-y: 50%;\n}"],"sourceRoot":""}]);
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

.tasks_list > :first-child > div > .form_task {
    margin: 1rem 0;
    padding: 1rem;
    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);
    border-radius: 0.5rem
}

div[role=button].task_new {
    animation: fade-in-scale 200ms ease-in;
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
}

.btn_date_task > span {
    word-spacing: 0.15rem;
}

li > .btn_add_task {
    display: flex;
    align-items: center;
    padding: var(--button-with-text-padding);
    column-gap: var(--column-gap-small);
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
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_list.css"],"names":[],"mappings":"AAAA;IACI;AACJ;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,OAAO;IACP,gBAAgB;AACpB;;AAEA;IACI,cAAc;IACd,aAAa;IACb,2CAA2C;IAC3C;AACJ;;AAEA;IACI,sCAAsC;AAC1C;;AAEA;IACI,8CAA8C;IAC9C,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,2CAA2C;IAC3C,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,qBAAqB;IACrB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,iBAAiB;IACjB,gCAAgC;IAChC,mCAAmC;AACvC;;AAEA;IACI,cAAc;IACd,UAAU;IACV,kBAAkB;IAClB,mCAAmC;AACvC;;AAEA;IACI,UAAU;IACV,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;IAC9B,mEAAmE;AACvE;;AAEA;IACI,8BAA8B;IAC9B,8BAA8B;AAClC;;AAEA;IACI,OAAO;IACP,aAAa;IACb,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,sCAAsC;AAC1C;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,wCAAwC;IACxC,mCAAmC;AACvC;;AAEA;IACI,uCAAuC;IACvC,gCAAgC;IAChC,mCAAmC;AACvC;;AAEA;IACI,4BAA4B;IAC5B,iBAAiB;AACrB;;AAEA;IACI;QACI,UAAU;QACV,mBAAmB;IACvB;;IAEA;QACI,UAAU;QACV,mBAAmB;IACvB;AACJ","sourcesContent":[".tasks_list {\n    margin-top: 1rem\n}\n\n.tasks_list > :first-child {\n    row-gap: 1rem;\n}\n\n.tasks_list > :first-child {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    list-style: none;\n}\n\n.tasks_list > :first-child > div > .form_task {\n    margin: 1rem 0;\n    padding: 1rem;\n    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);\n    border-radius: 0.5rem\n}\n\ndiv[role=button].task_new {\n    animation: fade-in-scale 200ms ease-in;\n}\n\ndiv[role=button] {\n    border-bottom: 2px solid rgba(66, 66, 66, 0.5);\n    padding: 0.5rem;\n}\n\ndiv[role=button]:hover {\n    cursor: pointer;\n    box-shadow: 0 0 9px -3px rgba(0, 0, 0, 0.6);\n    border-radius: 0.45rem;\n}\n\n.task_list_item > .container {\n    display: flex;\n    padding: 1rem 0.25rem;\n    column-gap: 0.75rem;\n}\n\n.task_list_item > .container > .btn_checkbox_task {\n    position: relative;\n    display: flex;\n    align-self: flex-start;\n}\n\n.btn_checkbox_task > .checkbox_circle {\n    display: flex;\n    border: 3px solid;\n    border-color: rgba(0, 0, 0, 0.5);\n    border-radius: var(--circle-radius);\n}\n\n.btn_checkbox_task > .checkbox_circle > svg {\n    color: inherit;\n    opacity: 0;\n    fill: currentColor;\n    border-radius: var(--circle-radius);\n}\n\n.task_list_item > .container > .btn_checkbox_task:hover >.checkbox_circle > svg {\n    opacity: 1;\n    background-color: color-mix(in srgb, currentColor 25%, transparent);\n}\n\n.checkbox_circle.priority_1 {\n    color: var(--priority-1-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_2 {\n    color: var(--priority-2-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_3 {\n    color: var(--priority-3-color);\n    border: 3px solid currentColor;\n    background-color: color-mix(in srgb, currentColor 20%, transparent);\n}\n\n.checkbox_circle.priority_4 {\n    color: var(--priority-4-color);\n    border: 3px solid currentColor;\n}\n\n.task_list_item_content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    row-gap: 0.35rem;\n}\n\n.task_list_item_content > .task_name {\n    margin-bottom: 0.5rem;\n}\n\ndiv[role=button]:hover .task_actions{\n    visibility: visible;\n}\n\n.task_actions {\n    display: flex;\n    align-items: flex-start;\n    visibility: hidden;\n}\n\n.task_actions > button {\n    padding: var(--button-no-text-padding);\n}\n\n.task_actions > button > svg {\n    width: clamp(1.5rem, 3vw, 2rem);\n}\n\n.btn_date_task {\n    display: flex;\n    align-items: center;\n    column-gap: 0.5rem;\n}\n\n.btn_date_task > span {\n    word-spacing: 0.15rem;\n}\n\nli > .btn_add_task {\n    display: flex;\n    align-items: center;\n    padding: var(--button-with-text-padding);\n    column-gap: var(--column-gap-small);\n}\n\nli > button.btn_add_task:hover > div {\n    background-color: var(--accent-primary);\n    color: var(--background-primary);\n    border-radius: var(--circle-radius);\n}\n\nli > button.btn_add_task:hover > span {\n    color: var(--accent-primary);\n    font-weight: bold;\n}\n\n@keyframes fade-in-scale {\n    0% {\n        opacity: 0;\n        transform: scale(0);\n    }\n\n    100% {\n        opacity: 1;\n        transform: scale(1);\n    }\n}"],"sourceRoot":""}]);
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
}`, "",{"version":3,"sources":["webpack://./src/styles/tasks_options.css"],"names":[],"mappings":"AAAA,8DAA8D;AAC9D;;IAEI,6BAA6B;AACjC;;AAEA;;IAEI,mBAAmB;IACnB,YAAY;IACZ,yCAAyC;AAC7C;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,mCAAmC;IACnC,eAAe;AACnB;;AAEA;;IAEI,oCAAoC;IACpC,eAAe;AACnB;;AAEA,oBAAoB;AACpB;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;AAClC","sourcesContent":["/* styles for priority options from tasks_priority.js module */\n#task_select_project_options::backdrop,\n#task_select_priority_options::backdrop {\n    background-color: transparent;\n}\n\n#task_select_priority_options,\n#task_select_project_options {\n    border-radius: 1rem;\n    border: none;\n    box-shadow: 0px 0px 6px -2px rgb(0, 0, 0);\n}\n\n#task_select_priority_options > .container > ul > li,\n#task_select_project_options > .container > ul > li {\n    display: flex;\n    align-items: center;\n    column-gap: var(--column-gap-small);\n    padding: 0.5rem;\n}\n\n#task_select_priority_options > .container > ul > li:hover,\n#task_select_project_options > .container > ul > li:hover {\n    background-color: rgba(0, 0, 0, 0.3);\n    padding: 0.8rem;\n}\n\n/* task priorities */\n.priority_1 {\n    color: var(--priority-1-color);\n}\n\n.priority_2 {\n    color: var(--priority-2-color);\n}\n\n.priority_3 {\n    color: var(--priority-3-color);\n}\n\n.priority_4  {\n    color: var(--priority-4-color);\n}"],"sourceRoot":""}]);
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
    },
    bindEvents: function() {
        this.btnMenu.addEventListener('click', this.publish);
        this.btnHome.addEventListener('click', this.publish);
        this.btnAddTask.addEventListener('click', _components_tasks_form__WEBPACK_IMPORTED_MODULE_2__["default"]);
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
                    className: 'btn_home',
                },
                childElement: 'img',
                src: assets.icons.files['home.svg'],
            },
            {
                element: 'input',
                attributes: {
                    className: 'input_search',
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
            // {element: 'button', class: 'bt-settingsn', childElement: 'img, src: null},
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
        let className = e.currentTarget.className;
        let subscriber;
        if (className.includes('home')) {
            subscriber = 'content';
        } else {
            subscriber = 'sidebar'
        }
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_1__.pubSub.publish(subscriber, e.currentTarget);
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
        window.onload = () => {
            this.anchors = document.querySelectorAll('a');
        }
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
        this.resetActiveTab();

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
        this.resetActiveTab();
        tab.classList.add('active');
        const sidebarAnchor = [...this.anchors].find(anchor => anchor.href === tab.href);
        if (sidebarAnchor) {
            sidebarAnchor.classList.add('active');
            this.activeTab = [sidebarAnchor, tab];
        } else {
            this.activeTab = [tab];
        }
    },
    resetActiveTab: function() {
        if (this.activeTab) {
            this.activeTab.forEach(anchor => anchor.classList.remove('active'));
            this.activeTab = null
        }
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
    _containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.setActive();
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
            const listItem = e.currentTarget.parentElement.parentElement;
            
            buildList.modules.forEach(module => {
                module.removeSelection = listItem;
            })
            this.removeSelection = listItem;
            const projectUUID = listItem.dataset.uuid;
            (0,_modal_remove__WEBPACK_IMPORTED_MODULE_2__["default"])(_containers_project_controller__WEBPACK_IMPORTED_MODULE_0__.projectController.find(projectUUID));
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
        _containers_pubsub__WEBPACK_IMPORTED_MODULE_3__.pubSub.publish('content', e.currentTarget);
        if ((this.type === 'sidebar'|| this.type === 'misc') && window.innerWidth < 768) {
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
/* harmony import */ var _containers_project_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/project_controller */ "./src/containers/project_controller.js");
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

    _containers_pubsub__WEBPACK_IMPORTED_MODULE_5__.pubSub.subscribe('sidebar', sidebar.toggleSidebar); // published from projects_list.js
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
        if (window.innerWidth < 768) {
            this.toggleSidebar();
        }
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
        this.projects.push(Object.assign(buildProject(), formValues));
        this.setAllProjects()
    },
    remove: function(uuid) {
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
        } else {
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
module.exports = __webpack_require__.p + "97f54cfa7a7698a59425.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sOEVBQThFLFlBQVksYUFBYSxVQUFVLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sVUFBVSxZQUFZLGFBQWEsT0FBTyxNQUFNLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sV0FBVyxZQUFZLE9BQU8sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLE1BQU0sS0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxxQ0FBcUMsa0ZBQWtGLHNXQUFzVyxHQUFHLDRCQUE0Qiw2QkFBNkIscUNBQXFDLGtDQUFrQyxnQkFBZ0IsaUJBQWlCLDhDQUE4QyxHQUFHLFdBQVcsc0ZBQXNGLGdEQUFnRCwrQ0FBK0MsMENBQTBDLDZDQUE2QyxpQ0FBaUMsa0NBQWtDLGtDQUFrQyxrQ0FBa0Msa0NBQWtDLCtCQUErQiwyQkFBMkIsd0NBQXdDLDhDQUE4QyxrQ0FBa0MsR0FBRyxVQUFVLHdCQUF3Qix1Q0FBdUMsR0FBRyxlQUFlLDBCQUEwQixvQkFBb0IsMENBQTBDLEdBQUcsY0FBYyx5QkFBeUIsR0FBRyxjQUFjLG9CQUFvQixHQUFHLDJCQUEyQiwyQkFBMkIsc0JBQXNCLGtCQUFrQixtQkFBbUIsMkNBQTJDLGlCQUFpQiw0Q0FBNEMsR0FBRywrQkFBK0IsaUJBQWlCLDRDQUE0QyxHQUFHLG1CQUFtQixjQUFjLGtCQUFrQixvQkFBb0Isa0RBQWtELEdBQUcsa0NBQWtDLG9CQUFvQixzQ0FBc0MsMkJBQTJCLGtCQUFrQix1Q0FBdUMsR0FBRyx3RkFBd0YscUJBQXFCLEdBQUcsa0JBQWtCLG9CQUFvQixHQUFHLGlGQUFpRixtQkFBbUIsc0JBQXNCLDZCQUE2QixtQkFBbUIsR0FBRyxzQkFBc0IsMkNBQTJDLEdBQUcsMENBQTBDLDZCQUE2QixHQUFHLFlBQVksb0JBQW9CLDhCQUE4QixtQkFBbUIsMENBQTBDLEdBQUcsc0JBQXNCLG9CQUFvQixHQUFHLGtCQUFrQixzQkFBc0IsR0FBRyxxQ0FBcUMsbUJBQW1CLDJDQUEyQyxHQUFHLGdCQUFnQixvQkFBb0IsNkJBQTZCLEdBQUcsdUJBQXVCLGtCQUFrQix1QkFBdUIsaUJBQWlCLGtEQUFrRCxtQkFBbUIseUJBQXlCLEdBQUcsb0JBQW9CLG9CQUFvQix1QkFBdUIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcsNERBQTRELG1CQUFtQiw0QkFBNEIsMkJBQTJCLEdBQUcsd0VBQXdFLCtDQUErQyxvQkFBb0IsMERBQTBELEdBQUcsbUJBQW1CLG9CQUFvQiwyQkFBMkIseUJBQXlCLHVCQUF1QixHQUFHLHVCQUF1QiwyQ0FBMkMsMkJBQTJCLDBCQUEwQixpQ0FBaUMsR0FBRyw2Q0FBNkMsOENBQThDLEdBQUcsbURBQW1ELCtCQUErQixHQUFHLGtDQUFrQywrQkFBK0IsR0FBRyw4QkFBOEIscURBQXFELEdBQUcsZ1NBQWdTLDJDQUEyQyxHQUFHLHlDQUF5QyxxQkFBcUIsbUNBQW1DLE9BQU8sc0NBQXNDLHFCQUFxQixPQUFPLGtCQUFrQiwyQkFBMkIsd0JBQXdCLE9BQU8sR0FBRyx3QkFBd0IsVUFBVSw0QkFBNEIsY0FBYyx3QkFBd0IsT0FBTyxHQUFHLG1CQUFtQjtBQUMxbU47QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5UHZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sd0ZBQXdGLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxrQ0FBa0MsOENBQThDLHVDQUF1QyxHQUFHLHNCQUFzQixvQkFBb0IscUNBQXFDLCtCQUErQixHQUFHLHVDQUF1QyxvQkFBb0IsMENBQTBDLEdBQUcsMkNBQTJDLG9CQUFvQiwwQkFBMEIsMENBQTBDLDZDQUE2QyxHQUFHLDZDQUE2Qyx1Q0FBdUMsR0FBRyxtQkFBbUIsNkJBQTZCLG1CQUFtQiwyQkFBMkIsR0FBRyxpREFBaUQsbUJBQW1CLHlDQUF5QyxHQUFHLG1CQUFtQjtBQUNockM7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ3ZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNHQUFzRyxNQUFNLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLHNGQUFzRixvQkFBb0IsR0FBRyx5QkFBeUIsb0JBQW9CLDZCQUE2QixzQkFBc0IsR0FBRyx1QkFBdUIsaUNBQWlDLEdBQUcsNkNBQTZDLDZDQUE2QyxHQUFHLG1CQUFtQjtBQUN0bEI7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QnZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8saUdBQWlHLE1BQU0sVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsNEdBQTRHLG9CQUFvQixzQ0FBc0MsR0FBRyw0Q0FBNEMsd0JBQXdCLDBCQUEwQixHQUFHLCtEQUErRCwyQ0FBMkMsb0JBQW9CLDBCQUEwQixnQ0FBZ0Msc0JBQXNCLCtDQUErQywwQ0FBMEMsR0FBRyxtQkFBbUI7QUFDajFCO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJ2QztBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sK0ZBQStGLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksaURBQWlELG9CQUFvQixvQkFBb0IsNkJBQTZCLHNCQUFzQixHQUFHLGdEQUFnRCxpQ0FBaUMsR0FBRyxtQkFBbUI7QUFDaGE7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQnZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTywrRkFBK0YsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxPQUFPLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sTUFBTSxZQUFZLDhDQUE4QyxvQkFBb0IsNkJBQTZCLHVCQUF1QixzQkFBc0IsR0FBRyw0QkFBNEIsb0JBQW9CLDZCQUE2QiwwQkFBMEIsR0FBRyxtSUFBbUksMkNBQTJDLHdCQUF3QixHQUFHLDZGQUE2RiwwQkFBMEIsR0FBRyxxRkFBcUYseUJBQXlCLDJCQUEyQixHQUFHLDJDQUEyQyxvQkFBb0IsMEJBQTBCLGNBQWMsK0NBQStDLEdBQUcsa0RBQWtELGNBQWMsR0FBRyx3RUFBd0UsNkNBQTZDLEdBQUcsbUJBQW1CO0FBQ2g4QztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEdkM7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyx5RkFBeUYsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLG1DQUFtQyxtQkFBbUIsa0JBQWtCLGtCQUFrQix5QkFBeUIseUJBQXlCLEdBQUcsbUJBQW1CLHlCQUF5QixtQ0FBbUMsd0NBQXdDLEdBQUcsbUJBQW1CLDBCQUEwQixnQ0FBZ0MsOENBQThDLEdBQUcsMkJBQTJCLHNCQUFzQixvQkFBb0IsNkJBQTZCLG9CQUFvQix1QkFBdUIsZ0RBQWdELG9EQUFvRCw2QkFBNkIsR0FBRyxrQ0FBa0MsNEJBQTRCLDBCQUEwQixHQUFHLHlDQUF5QyxvQkFBb0IsMEJBQTBCLEdBQUcseURBQXlELGNBQWMsK0NBQStDLEdBQUcsdUNBQXVDLDZCQUE2Qiw0QkFBNEIsR0FBRywrQ0FBK0MsMkNBQTJDLHdCQUF3QixHQUFHLGtEQUFrRCwwQkFBMEIsbUNBQW1DLEdBQUcsNERBQTRELHlCQUF5QiwyQkFBMkIsR0FBRyx5Q0FBeUMsZ0JBQWdCLDhCQUE4QiwyQkFBMkIseUJBQXlCLE9BQU8sdUJBQXVCLGlDQUFpQyx5QkFBeUIsc0RBQXNELE9BQU8sdUJBQXVCLHdCQUF3QixPQUFPLCtCQUErQixzQkFBc0Isd0RBQXdELE9BQU8sR0FBRywrQkFBK0IsVUFBVSx1Q0FBdUMsT0FBTyxjQUFjLG9DQUFvQyxPQUFPLEdBQUcsbUJBQW1CO0FBQ3R6RjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekd2QztBQUM2RztBQUNqQjtBQUNPO0FBQ25HLDRDQUE0Qyw0SUFBbUQ7QUFDL0YsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEZBQTRGLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxNQUFNLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxpREFBaUQsMkNBQTJDLEdBQUcsd0JBQXdCLG9CQUFvQixHQUFHLGlEQUFpRCxvQkFBb0IsNkJBQTZCLHNCQUFzQixHQUFHLCtCQUErQix1QkFBdUIsd0JBQXdCLEdBQUcsNERBQTRELG9CQUFvQiwwQkFBMEIsb0NBQW9DLCtDQUErQyxHQUFHLDZGQUE2RixjQUFjLHVCQUF1QixHQUFHLDJEQUEyRCwwQkFBMEIsR0FBRyx1REFBdUQseUJBQXlCLEdBQUcsMkJBQTJCLCtCQUErQiw0QkFBNEIsOEJBQThCLGdFQUFnRSxtQ0FBbUMsa0NBQWtDLGlDQUFpQyxHQUFHLG1CQUFtQjtBQUN6a0Q7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RHZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEZBQTRGLEtBQUssTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxNQUFNLHNDQUFzQyx5QkFBeUIsZ0NBQWdDLG9CQUFvQixHQUFHLGdDQUFnQyxvQkFBb0IsNkJBQTZCLGNBQWMsdUJBQXVCLEdBQUcsbURBQW1ELHFCQUFxQixvQkFBb0Isa0RBQWtELDhCQUE4QiwrQkFBK0IsNkNBQTZDLEdBQUcsc0JBQXNCLHFEQUFxRCxzQkFBc0IsR0FBRyw0QkFBNEIsc0JBQXNCLGtEQUFrRCw2QkFBNkIsR0FBRyxrQ0FBa0Msb0JBQW9CLDRCQUE0QiwwQkFBMEIsR0FBRyx1REFBdUQseUJBQXlCLG9CQUFvQiw2QkFBNkIsR0FBRywyQ0FBMkMsb0JBQW9CLHdCQUF3Qix1Q0FBdUMsMENBQTBDLEdBQUcsaURBQWlELHFCQUFxQixpQkFBaUIseUJBQXlCLDBDQUEwQyxHQUFHLHFGQUFxRixpQkFBaUIsMEVBQTBFLEdBQUcsaUNBQWlDLHFDQUFxQyxxQ0FBcUMsMEVBQTBFLEdBQUcsaUNBQWlDLHFDQUFxQyxxQ0FBcUMsMEVBQTBFLEdBQUcsaUNBQWlDLHFDQUFxQyxxQ0FBcUMsMEVBQTBFLEdBQUcsaUNBQWlDLHFDQUFxQyxxQ0FBcUMsR0FBRyw2QkFBNkIsY0FBYyxvQkFBb0IsNkJBQTZCLHVCQUF1QixHQUFHLDBDQUEwQyw0QkFBNEIsR0FBRyx5Q0FBeUMsMEJBQTBCLEdBQUcsbUJBQW1CLG9CQUFvQiw4QkFBOEIseUJBQXlCLEdBQUcsNEJBQTRCLDZDQUE2QyxHQUFHLGtDQUFrQyxzQ0FBc0MsR0FBRyxvQkFBb0Isb0JBQW9CLDBCQUEwQix5QkFBeUIsR0FBRywyQkFBMkIsNEJBQTRCLEdBQUcsd0JBQXdCLG9CQUFvQiwwQkFBMEIsK0NBQStDLDBDQUEwQyxHQUFHLDBDQUEwQyw4Q0FBOEMsdUNBQXVDLDBDQUEwQyxHQUFHLDJDQUEyQyxtQ0FBbUMsd0JBQXdCLEdBQUcsOEJBQThCLFVBQVUscUJBQXFCLDhCQUE4QixPQUFPLGNBQWMscUJBQXFCLDhCQUE4QixPQUFPLEdBQUcsbUJBQW1CO0FBQ3JsSjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLdkM7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNHQUFzRyxPQUFPLFlBQVksT0FBTyxNQUFNLFlBQVksV0FBVyxZQUFZLE9BQU8sTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sTUFBTSxZQUFZLFdBQVcsT0FBTyxZQUFZLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSw2S0FBNkssb0NBQW9DLEdBQUcsa0VBQWtFLDBCQUEwQixtQkFBbUIsZ0RBQWdELEdBQUcsZ0hBQWdILG9CQUFvQiwwQkFBMEIsMENBQTBDLHNCQUFzQixHQUFHLDRIQUE0SCwyQ0FBMkMsc0JBQXNCLEdBQUcsd0NBQXdDLHFDQUFxQyxHQUFHLGlCQUFpQixxQ0FBcUMsR0FBRyxpQkFBaUIscUNBQXFDLEdBQUcsa0JBQWtCLHFDQUFxQyxHQUFHLG1CQUFtQjtBQUNuNkM7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDakQxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFpRztBQUNqRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLG9GQUFPOzs7O0FBSTJDO0FBQ25FLE9BQU8saUVBQWUsb0ZBQU8sSUFBSSxvRkFBTyxVQUFVLG9GQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXVHO0FBQ3ZHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsdUZBQU87Ozs7QUFJaUQ7QUFDekUsT0FBTyxpRUFBZSx1RkFBTyxJQUFJLHVGQUFPLFVBQVUsdUZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBOEc7QUFDOUc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyw4RkFBTzs7OztBQUl3RDtBQUNoRixPQUFPLGlFQUFlLDhGQUFPLElBQUksOEZBQU8sVUFBVSw4RkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUF5RztBQUN6RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHlGQUFPOzs7O0FBSW1EO0FBQzNFLE9BQU8saUVBQWUseUZBQU8sSUFBSSx5RkFBTyxVQUFVLHlGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQThHO0FBQzlHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsOEZBQU87Ozs7QUFJd0Q7QUFDaEYsT0FBTyxpRUFBZSw4RkFBTyxJQUFJLDhGQUFPLFVBQVUsOEZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBOEc7QUFDOUc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyw4RkFBTzs7OztBQUl3RDtBQUNoRixPQUFPLGlFQUFlLDhGQUFPLElBQUksOEZBQU8sVUFBVSw4RkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUF3RztBQUN4RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHdGQUFPOzs7O0FBSWtEO0FBQzFFLE9BQU8saUVBQWUsd0ZBQU8sSUFBSSx3RkFBTyxVQUFVLHdGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsMkZBQU87Ozs7QUFJcUQ7QUFDN0UsT0FBTyxpRUFBZSwyRkFBTyxJQUFJLDJGQUFPLFVBQVUsMkZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBMkc7QUFDM0c7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQywyRkFBTzs7OztBQUlxRDtBQUM3RSxPQUFPLGlFQUFlLDJGQUFPLElBQUksMkZBQU8sVUFBVSwyRkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUE4RztBQUM5RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDhGQUFPOzs7O0FBSXdEO0FBQ2hGLE9BQU8saUVBQWUsOEZBQU8sSUFBSSw4RkFBTyxVQUFVLDhGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2I4QztBQUNVO0FBQ2Q7QUFDTTtBQUNBO0FBQ047QUFDMUM7QUFDQTs7QUFFbUI7O0FBRW5CO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQVc7QUFDM0IsaUJBQWlCLG1FQUFZO0FBQzdCLGlCQUFpQiwyREFBWTtBQUM3QixjQUFjLHdEQUFTO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxZQUFZLDhEQUFXO0FBQ3ZCO0FBQ0EsU0FBUztBQUNUOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUEsU0FBUztBQUNUOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQy9DRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsSUFBa0Q7QUFDbEQsSUFBd0Q7QUFDeEQsSUFBb0Q7QUFDcEQsSUFBd0U7QUFDeEUsSUFBb0Q7QUFDcEQsSUFBNEQ7QUFDNUQ7QUFDQSxhQUFhLGtEQUFPO0FBQ3BCLGdCQUFnQixxREFBVTtBQUMxQixjQUFjLG1EQUFRO0FBQ3RCLGdCQUFnQixxRUFBVTtBQUMxQixrQkFBa0IsMERBQVM7QUFDM0IsY0FBYyxtREFBUTtBQUN0Qjs7QUFFQSxJQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSyxHQUFHLEtBQUs7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRGdEO0FBQ0YsQ0FBQztBQUNPO0FBQ3hCOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxpRUFBUyxDQUFDLGdFQUFrRDtBQUN2RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCw4REFBYztBQUNoRSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsZ0JBQWdCLHdFQUF3RTtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVEsc0RBQU07QUFDZDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BIbUQ7QUFDUztBQUNTO0FBQ3ZCOztBQUUvQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxzREFBTTs7QUFFVjtBQUNBOztBQUVBO0FBQ0EsY0FBYyw0REFBYTtBQUMzQixhQUFhLGlFQUFpQjtBQUM5Qjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDZFQUFpQjs7QUFFeEQsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLHNCQUFzQiw2RUFBaUI7QUFDdkMsVUFBVTtBQUNWO0FBQ0E7QUFDQSxzQkFBc0IsNkVBQWlCO0FBQ3ZDLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hHOEM7QUFDVjs7QUFFcEM7QUFDZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0RBQU07QUFDbEIsVUFBVTtBQUNWO0FBQ0EsWUFBWSxzREFBTTtBQUNsQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSDZDOztBQUUvQjtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsc0RBQU07QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QnFFO0FBQ3JCO0FBQ007QUFDRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLElBQUksNkVBQWlCO0FBQ3JCLG9CQUFvQiw2RUFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0RBQWtELDhEQUFjO0FBQ2hFLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsNkRBQVM7QUFDdEMsNkJBQTZCLCtEQUFXO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaER3RDtBQUNSO0FBQ1c7QUFDVTtBQUNyQzs7QUFFakI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscURBQXFELGlFQUFnQjtBQUNyRSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLCtEQUFXO0FBQzdDOztBQUVBLFFBQVEsZ0VBQVMsaUNBQWlDLDZFQUFpQjtBQUNuRSxRQUFRLGdFQUFTO0FBQ2pCLFFBQVEsZ0VBQVM7QUFDakI7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q3FFO0FBQ2I7QUFDVjtBQUNUOztBQUVyQztBQUNlO0FBQ2YsSUFBSSw2RUFBaUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2RUFBaUI7QUFDekI7QUFDQSxRQUFRLGdFQUFTLDJCQUEyQjtBQUM1QyxRQUFRLHNEQUFNO0FBQ2Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5R3FFO0FBQ2pDO0FBQ1U7QUFDQTtBQUNJO0FBQ0E7QUFDRztBQUNyQjtBQUNLOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxL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QStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7Ozs7Ozs7Ozs7Ozs7O0FDekxPO0FBQ1AsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNEJBQTRCLHlDQUF5QztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCcUU7O0FBRXJFO0FBQ087QUFDUCxJQUFJLDZFQUFpQjtBQUNyQixJQUFJLDZFQUFpQixxRkFBcUYsNkVBQWlCO0FBQzNILElBQUksNkVBQWlCO0FBQ3JCOztBQUVBO0FBQ087QUFDUCxvREFBb0QsNkVBQWlCO0FBQ3JFLGlEQUFpRCw2RUFBaUI7QUFDbEU7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxhQUFhO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvQGljb25mdS9zdmctaW5qZWN0L2Rpc3Qvc3ZnLWluamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBwLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL2hlYWRlci5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9tb2RhbF9yZW1vdmFsLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvcHJvamVjdHNfbGlzdC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9zaWRlYmFyLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3NfbGlzdC5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19vcHRpb25zLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL2hlYWRlci5jc3M/ZTY4YiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL21vZGFsX3JlbW92YWwuY3NzP2U3NjgiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0cy5jc3M/MWFhYSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzPzYxYzUiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcz8xMmQyIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvc2lkZWJhci5jc3M/NDgxNiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzPzk4ZTgiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlcy90YXNrc19saXN0LmNzcz83MTUxIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMvdGFza3Nfb3B0aW9ucy5jc3M/ODUwOSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9pY29ucy8gc3luYyBcXC5zdmckIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvaWNvbnMvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvbWFpbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9tb2RhbF9yZW1vdmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0X3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvdGFza3NfZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy90YXNrc19saXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3Rhc2tzX29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250YWluZXJzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91dGlsaXRpZXMvaW1wb3J0LWFsbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNWR0luamVjdCAtIFZlcnNpb24gMS4yLjNcbiAqIEEgdGlueSwgaW50dWl0aXZlLCByb2J1c3QsIGNhY2hpbmcgc29sdXRpb24gZm9yIGluamVjdGluZyBTVkcgZmlsZXMgaW5saW5lIGludG8gdGhlIERPTS5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vaWNvbmZ1L3N2Zy1pbmplY3RcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggSU5DT1JTLCB0aGUgY3JlYXRvcnMgb2YgaWNvbmZ1LmNvbVxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgLSBodHRwczovL2dpdGh1Yi5jb20vaWNvbmZ1L3N2Zy1pbmplY3QvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG4gIC8vIGNvbnN0YW50cyBmb3IgYmV0dGVyIG1pbmlmaWNhdGlvblxuICB2YXIgX0NSRUFURV9FTEVNRU5UXyA9ICdjcmVhdGVFbGVtZW50JztcbiAgdmFyIF9HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfID0gJ2dldEVsZW1lbnRzQnlUYWdOYW1lJztcbiAgdmFyIF9MRU5HVEhfID0gJ2xlbmd0aCc7XG4gIHZhciBfU1RZTEVfID0gJ3N0eWxlJztcbiAgdmFyIF9USVRMRV8gPSAndGl0bGUnO1xuICB2YXIgX1VOREVGSU5FRF8gPSAndW5kZWZpbmVkJztcbiAgdmFyIF9TRVRfQVRUUklCVVRFXyA9ICdzZXRBdHRyaWJ1dGUnO1xuICB2YXIgX0dFVF9BVFRSSUJVVEVfID0gJ2dldEF0dHJpYnV0ZSc7XG5cbiAgdmFyIE5VTEwgPSBudWxsO1xuXG4gIC8vIGNvbnN0YW50c1xuICB2YXIgX19TVkdJTkpFQ1QgPSAnX19zdmdJbmplY3QnO1xuICB2YXIgSURfU1VGRklYID0gJy0taW5qZWN0LSc7XG4gIHZhciBJRF9TVUZGSVhfUkVHRVggPSBuZXcgUmVnRXhwKElEX1NVRkZJWCArICdcXFxcZCsnLCBcImdcIik7XG4gIHZhciBMT0FEX0ZBSUwgPSAnTE9BRF9GQUlMJztcbiAgdmFyIFNWR19OT1RfU1VQUE9SVEVEID0gJ1NWR19OT1RfU1VQUE9SVEVEJztcbiAgdmFyIFNWR19JTlZBTElEID0gJ1NWR19JTlZBTElEJztcbiAgdmFyIEFUVFJJQlVURV9FWENMVVNJT05fTkFNRVMgPSBbJ3NyYycsICdhbHQnLCAnb25sb2FkJywgJ29uZXJyb3InXTtcbiAgdmFyIEFfRUxFTUVOVCA9IGRvY3VtZW50W19DUkVBVEVfRUxFTUVOVF9dKCdhJyk7XG4gIHZhciBJU19TVkdfU1VQUE9SVEVEID0gdHlwZW9mIFNWR1JlY3QgIT0gX1VOREVGSU5FRF87XG4gIHZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgdXNlQ2FjaGU6IHRydWUsXG4gICAgY29weUF0dHJpYnV0ZXM6IHRydWUsXG4gICAgbWFrZUlkc1VuaXF1ZTogdHJ1ZVxuICB9O1xuICAvLyBNYXAgb2YgSVJJIHJlZmVyZW5jZWFibGUgdGFnIG5hbWVzIHRvIHByb3BlcnRpZXMgdGhhdCBjYW4gcmVmZXJlbmNlIHRoZW0uIFRoaXMgaXMgZGVmaW5lZCBpblxuICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMTEvbGlua2luZy5odG1sI3Byb2Nlc3NpbmdJUklcbiAgdmFyIElSSV9UQUdfUFJPUEVSVElFU19NQVAgPSB7XG4gICAgY2xpcFBhdGg6IFsnY2xpcC1wYXRoJ10sXG4gICAgJ2NvbG9yLXByb2ZpbGUnOiBOVUxMLFxuICAgIGN1cnNvcjogTlVMTCxcbiAgICBmaWx0ZXI6IE5VTEwsXG4gICAgbGluZWFyR3JhZGllbnQ6IFsnZmlsbCcsICdzdHJva2UnXSxcbiAgICBtYXJrZXI6IFsnbWFya2VyJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnXSxcbiAgICBtYXNrOiBOVUxMLFxuICAgIHBhdHRlcm46IFsnZmlsbCcsICdzdHJva2UnXSxcbiAgICByYWRpYWxHcmFkaWVudDogWydmaWxsJywgJ3N0cm9rZSddXG4gIH07XG4gIHZhciBJTkpFQ1RFRCA9IDE7XG4gIHZhciBGQUlMID0gMjtcblxuICB2YXIgdW5pcXVlSWRDb3VudGVyID0gMTtcbiAgdmFyIHhtbFNlcmlhbGl6ZXI7XG4gIHZhciBkb21QYXJzZXI7XG5cblxuICAvLyBjcmVhdGVzIGFuIFNWRyBkb2N1bWVudCBmcm9tIGFuIFNWRyBzdHJpbmdcbiAgZnVuY3Rpb24gc3ZnU3RyaW5nVG9TdmdEb2Moc3ZnU3RyKSB7XG4gICAgZG9tUGFyc2VyID0gZG9tUGFyc2VyIHx8IG5ldyBET01QYXJzZXIoKTtcbiAgICByZXR1cm4gZG9tUGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdmdTdHIsICd0ZXh0L3htbCcpO1xuICB9XG5cblxuICAvLyBzZWFyaWFsaXplcyBhbiBTVkcgZWxlbWVudCB0byBhbiBTVkcgc3RyaW5nXG4gIGZ1bmN0aW9uIHN2Z0VsZW1Ub1N2Z1N0cmluZyhzdmdFbGVtZW50KSB7XG4gICAgeG1sU2VyaWFsaXplciA9IHhtbFNlcmlhbGl6ZXIgfHwgbmV3IFhNTFNlcmlhbGl6ZXIoKTtcbiAgICByZXR1cm4geG1sU2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyhzdmdFbGVtZW50KTtcbiAgfVxuXG5cbiAgLy8gUmV0dXJucyB0aGUgYWJzb2x1dGUgdXJsIGZvciB0aGUgc3BlY2lmaWVkIHVybFxuICBmdW5jdGlvbiBnZXRBYnNvbHV0ZVVybCh1cmwpIHtcbiAgICBBX0VMRU1FTlQuaHJlZiA9IHVybDtcbiAgICByZXR1cm4gQV9FTEVNRU5ULmhyZWY7XG4gIH1cblxuXG4gIC8vIExvYWQgc3ZnIHdpdGggYW4gWEhSIHJlcXVlc3RcbiAgZnVuY3Rpb24gbG9hZFN2Zyh1cmwsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgaWYgKHVybCkge1xuICAgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgIC8vIHJlYWR5U3RhdGUgaXMgRE9ORVxuICAgICAgICAgIHZhciBzdGF0dXMgPSByZXEuc3RhdHVzO1xuICAgICAgICAgIGlmIChzdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHN0YXR1cyBpcyBPS1xuICAgICAgICAgICAgY2FsbGJhY2socmVxLnJlc3BvbnNlWE1MLCByZXEucmVzcG9uc2VUZXh0LnRyaW0oKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHN0YXR1cyBpcyBlcnJvciAoNHh4IG9yIDV4eClcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHN0YXR1cyAwIGNhbiBpbmRpY2F0ZSBhIGZhaWxlZCBjcm9zcy1kb21haW4gY2FsbFxuICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgcmVxLnNlbmQoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIENvcHkgYXR0cmlidXRlcyBmcm9tIGltZyBlbGVtZW50IHRvIHN2ZyBlbGVtZW50XG4gIGZ1bmN0aW9uIGNvcHlBdHRyaWJ1dGVzKGltZ0VsZW0sIHN2Z0VsZW0pIHtcbiAgICB2YXIgYXR0cmlidXRlO1xuICAgIHZhciBhdHRyaWJ1dGVOYW1lO1xuICAgIHZhciBhdHRyaWJ1dGVWYWx1ZTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IGltZ0VsZW0uYXR0cmlidXRlcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJpYnV0ZXNbX0xFTkdUSF9dOyBpKyspIHtcbiAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWU7XG4gICAgICAvLyBPbmx5IGNvcHkgYXR0cmlidXRlcyBub3QgZXhwbGljaXRseSBleGNsdWRlZCBmcm9tIGNvcHlpbmdcbiAgICAgIGlmIChBVFRSSUJVVEVfRVhDTFVTSU9OX05BTUVTLmluZGV4T2YoYXR0cmlidXRlTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIC8vIElmIGltZyBhdHRyaWJ1dGUgaXMgXCJ0aXRsZVwiLCBpbnNlcnQgYSB0aXRsZSBlbGVtZW50IGludG8gU1ZHIGVsZW1lbnRcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT0gX1RJVExFXykge1xuICAgICAgICAgIHZhciB0aXRsZUVsZW07XG4gICAgICAgICAgdmFyIGZpcnN0RWxlbWVudENoaWxkID0gc3ZnRWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBpZiAoZmlyc3RFbGVtZW50Q2hpbGQgJiYgZmlyc3RFbGVtZW50Q2hpbGQubG9jYWxOYW1lLnRvTG93ZXJDYXNlKCkgPT0gX1RJVExFXykge1xuICAgICAgICAgICAgLy8gSWYgdGhlIFNWRyBlbGVtZW50J3MgZmlyc3QgY2hpbGQgaXMgYSB0aXRsZSBlbGVtZW50LCBrZWVwIGl0IGFzIHRoZSB0aXRsZSBlbGVtZW50XG4gICAgICAgICAgICB0aXRsZUVsZW0gPSBmaXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgdGhlIFNWRyBlbGVtZW50J3MgZmlyc3QgY2hpbGQgZWxlbWVudCBpcyBub3QgYSB0aXRsZSBlbGVtZW50LCBjcmVhdGUgYSBuZXcgdGl0bGVcbiAgICAgICAgICAgIC8vIGVsZSxlbXQgYW5kIHNldCBpdCBhcyB0aGUgZmlyc3QgY2hpbGRcbiAgICAgICAgICAgIHRpdGxlRWxlbSA9IGRvY3VtZW50W19DUkVBVEVfRUxFTUVOVF8gKyAnTlMnXSgnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBfVElUTEVfKTtcbiAgICAgICAgICAgIHN2Z0VsZW0uaW5zZXJ0QmVmb3JlKHRpdGxlRWxlbSwgZmlyc3RFbGVtZW50Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTZXQgbmV3IHRpdGxlIGNvbnRlbnRcbiAgICAgICAgICB0aXRsZUVsZW0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZXQgaW1nIGF0dHJpYnV0ZSB0byBzdmcgZWxlbWVudFxuICAgICAgICAgIHN2Z0VsZW1bX1NFVF9BVFRSSUJVVEVfXShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gYXBwZW5kcyBhIHN1ZmZpeCB0byBJRHMgb2YgcmVmZXJlbmNlZCBlbGVtZW50cyBpbiB0aGUgPGRlZnM+IGluIG9yZGVyIHRvICB0byBhdm9pZCBJRCBjb2xsaXNpb25cbiAgLy8gYmV0d2VlbiBtdWx0aXBsZSBpbmplY3RlZCBTVkdzLiBUaGUgc3VmZml4IGhhcyB0aGUgZm9ybSBcIi0taW5qZWN0LVhcIiwgd2hlcmUgWCBpcyBhIHJ1bm5pbmcgbnVtYmVyIHdoaWNoIGlzXG4gIC8vIGluY3JlbWVudGVkIHdpdGggZWFjaCBpbmplY3Rpb24uIFJlZmVyZW5jZXMgdG8gdGhlIElEcyBhcmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkuXG4gIC8vIFdlIGFzc3VtZSB0aGEgYWxsIElEcyB3aXRoaW4gdGhlIGluamVjdGVkIFNWRyBhcmUgdW5pcXVlLCB0aGVyZWZvcmUgdGhlIHNhbWUgc3VmZml4IGNhbiBiZSB1c2VkIGZvciBhbGwgSURzIG9mIG9uZVxuICAvLyBpbmplY3RlZCBTVkcuXG4gIC8vIElmIHRoZSBvbmx5UmVmZXJlbmNlZCBhcmd1bWVudCBpcyBzZXQgdG8gdHJ1ZSwgb25seSB0aG9zZSBJRHMgd2lsbCBiZSBtYWRlIHVuaXF1ZSB0aGF0IGFyZSByZWZlcmVuY2VkIGZyb20gd2l0aGluIHRoZSBTVkdcbiAgZnVuY3Rpb24gbWFrZUlkc1VuaXF1ZShzdmdFbGVtLCBvbmx5UmVmZXJlbmNlZCkge1xuICAgIHZhciBpZFN1ZmZpeCA9IElEX1NVRkZJWCArIHVuaXF1ZUlkQ291bnRlcisrO1xuICAgIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgZnVuY3Rpb25hbCBub3RhdGlvbnMgb2YgYW4gSVJJIHJlZmVyZW5jZXMuIFRoaXMgd2lsbCBmaW5kIG9jY3VyZW5jZXMgaW4gdGhlIGZvcm1cbiAgICAvLyB1cmwoI2FueUlkKSBvciB1cmwoXCIjYW55SWRcIikgKGZvciBJbnRlcm5ldCBFeHBsb3JlcikgYW5kIGNhcHR1cmUgdGhlIHJlZmVyZW5jZWQgSURcbiAgICB2YXIgZnVuY0lyaVJlZ2V4ID0gL3VybFxcKFwiPyMoW2EtekEtWl1bXFx3Oi4tXSopXCI/XFwpL2c7XG4gICAgLy8gR2V0IGFsbCBlbGVtZW50cyB3aXRoIGFuIElELiBUaGUgU1ZHIHNwZWMgcmVjb21tZW5kcyB0byBwdXQgcmVmZXJlbmNlZCBlbGVtZW50cyBpbnNpZGUgPGRlZnM+IGVsZW1lbnRzLCBidXRcbiAgICAvLyB0aGlzIGlzIG5vdCBhIHJlcXVpcmVtZW50LCB0aGVyZWZvcmUgd2UgaGF2ZSB0byBzZWFyY2ggZm9yIElEcyBpbiB0aGUgd2hvbGUgU1ZHLlxuICAgIHZhciBpZEVsZW1lbnRzID0gc3ZnRWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG4gICAgdmFyIGlkRWxlbTtcbiAgICAvLyBBbiBvYmplY3QgY29udGFpbmluZyByZWZlcmVuY2VkIElEcyAgYXMga2V5cyBpcyB1c2VkIGlmIG9ubHkgcmVmZXJlbmNlZCBJRHMgc2hvdWxkIGJlIHVuaXF1aWZpZWQuXG4gICAgLy8gSWYgdGhpcyBvYmplY3QgZG9lcyBub3QgZXhpc3QsIGFsbCBJRHMgd2lsbCBiZSB1bmlxdWlmaWVkLlxuICAgIHZhciByZWZlcmVuY2VkSWRzID0gb25seVJlZmVyZW5jZWQgPyBbXSA6IE5VTEw7XG4gICAgdmFyIHRhZ05hbWU7XG4gICAgdmFyIGlyaVRhZ05hbWVzID0ge307XG4gICAgdmFyIGlyaVByb3BlcnRpZXMgPSBbXTtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBpLCBqO1xuXG4gICAgaWYgKGlkRWxlbWVudHNbX0xFTkdUSF9dKSB7XG4gICAgICAvLyBNYWtlIGFsbCBJRHMgdW5pcXVlIGJ5IGFkZGluZyB0aGUgSUQgc3VmZml4IGFuZCBjb2xsZWN0IGFsbCBlbmNvdW50ZXJlZCB0YWcgbmFtZXNcbiAgICAgIC8vIHRoYXQgYXJlIElSSSByZWZlcmVuY2VhYmxlIGZyb20gcHJvcGVyaXRpZXMuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWRFbGVtZW50c1tfTEVOR1RIX107IGkrKykge1xuICAgICAgICB0YWdOYW1lID0gaWRFbGVtZW50c1tpXS5sb2NhbE5hbWU7IC8vIFVzZSBub24tbmFtZXNwYWNlZCB0YWcgbmFtZVxuICAgICAgICAvLyBNYWtlIElEIHVuaXF1ZSBpZiB0YWcgbmFtZSBpcyBJUkkgcmVmZXJlbmNlYWJsZVxuICAgICAgICBpZiAodGFnTmFtZSBpbiBJUklfVEFHX1BST1BFUlRJRVNfTUFQKSB7XG4gICAgICAgICAgaXJpVGFnTmFtZXNbdGFnTmFtZV0gPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBHZXQgYWxsIHByb3BlcnRpZXMgdGhhdCBhcmUgbWFwcGVkIHRvIHRoZSBmb3VuZCBJUkkgcmVmZXJlbmNlYWJsZSB0YWdzXG4gICAgICBmb3IgKHRhZ05hbWUgaW4gaXJpVGFnTmFtZXMpIHtcbiAgICAgICAgKElSSV9UQUdfUFJPUEVSVElFU19NQVBbdGFnTmFtZV0gfHwgW3RhZ05hbWVdKS5mb3JFYWNoKGZ1bmN0aW9uIChtYXBwZWRQcm9wZXJ0eSkge1xuICAgICAgICAgIC8vIEFkZCBtYXBwZWQgcHJvcGVydGllcyB0byBhcnJheSBvZiBpcmkgcmVmZXJlbmNpbmcgcHJvcGVydGllcy5cbiAgICAgICAgICAvLyBVc2UgbGluZWFyIHNlYXJjaCBoZXJlIGJlY2F1c2UgdGhlIG51bWJlciBvZiBwb3NzaWJsZSBlbnRyaWVzIGlzIHZlcnkgc21hbGwgKG1heGltdW0gMTEpXG4gICAgICAgICAgaWYgKGlyaVByb3BlcnRpZXMuaW5kZXhPZihtYXBwZWRQcm9wZXJ0eSkgPCAwKSB7XG4gICAgICAgICAgICBpcmlQcm9wZXJ0aWVzLnB1c2gobWFwcGVkUHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXJpUHJvcGVydGllc1tfTEVOR1RIX10pIHtcbiAgICAgICAgLy8gQWRkIFwic3R5bGVcIiB0byBwcm9wZXJ0aWVzLCBiZWNhdXNlIGl0IG1heSBjb250YWluIHJlZmVyZW5jZXMgaW4gdGhlIGZvcm0gJ3N0eWxlPVwiZmlsbDp1cmwoI215RmlsbClcIidcbiAgICAgICAgaXJpUHJvcGVydGllcy5wdXNoKF9TVFlMRV8pO1xuICAgICAgfVxuICAgICAgLy8gUnVuIHRocm91Z2ggYWxsIGVsZW1lbnRzIG9mIHRoZSBTVkcgYW5kIHJlcGxhY2UgSURzIGluIHJlZmVyZW5jZXMuXG4gICAgICAvLyBUbyBnZXQgYWxsIGRlc2NlbmRpbmcgZWxlbWVudHMsIGdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykgc2VlbXMgdG8gcGVyZm9ybSBmYXN0ZXIgdGhhbiBxdWVyeVNlbGVjdG9yQWxsKCcqJykuXG4gICAgICAvLyBTaW5jZSBzdmdFbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykgZG9lcyBub3QgcmV0dXJuIHRoZSBzdmcgZWxlbWVudCBpdHNlbGYsIHdlIGhhdmUgdG8gaGFuZGxlIGl0IHNlcGFyYXRlbHkuXG4gICAgICB2YXIgZGVzY0VsZW1lbnRzID0gc3ZnRWxlbVtfR0VUX0VMRU1FTlRTX0JZX1RBR19OQU1FX10oJyonKTtcbiAgICAgIHZhciBlbGVtZW50ID0gc3ZnRWxlbTtcbiAgICAgIHZhciBwcm9wZXJ0eU5hbWU7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YXIgbmV3VmFsdWU7XG4gICAgICBmb3IgKGkgPSAtMTsgZWxlbWVudCAhPSBOVUxMOykge1xuICAgICAgICBpZiAoZWxlbWVudC5sb2NhbE5hbWUgPT0gX1NUWUxFXykge1xuICAgICAgICAgIC8vIElmIGVsZW1lbnQgaXMgYSBzdHlsZSBlbGVtZW50LCByZXBsYWNlIElEcyBpbiBhbGwgb2NjdXJlbmNlcyBvZiBcInVybCgjYW55SWQpXCIgaW4gdGV4dCBjb250ZW50XG4gICAgICAgICAgdmFsdWUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUgJiYgdmFsdWUucmVwbGFjZShmdW5jSXJpUmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpZCkge1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWRJZHMpIHtcbiAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpZF0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd1cmwoIycgKyBpZCArIGlkU3VmZml4ICsgJyknO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgICAvLyBSdW4gdGhyb3VnaCBhbGwgcHJvcGVydHkgbmFtZXMgZm9yIHdoaWNoIElEcyB3ZXJlIGZvdW5kXG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGlyaVByb3BlcnRpZXNbX0xFTkdUSF9dOyBqKyspIHtcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZSA9IGlyaVByb3BlcnRpZXNbal07XG4gICAgICAgICAgICB2YWx1ZSA9IGVsZW1lbnRbX0dFVF9BVFRSSUJVVEVfXShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKGZ1bmNJcmlSZWdleCwgZnVuY3Rpb24obWF0Y2gsIGlkKSB7XG4gICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VkSWRzKSB7XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlZElkc1tpZF0gPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoIycgKyBpZCArIGlkU3VmZml4ICsgJyknO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRbX1NFVF9BVFRSSUJVVEVfXShwcm9wZXJ0eU5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVwbGFjZSBJRHMgaW4geGxpbms6cmVmIGFuZCBocmVmIGF0dHJpYnV0ZXNcbiAgICAgICAgICBbJ3hsaW5rOmhyZWYnLCAnaHJlZiddLmZvckVhY2goZnVuY3Rpb24ocmVmQXR0ck5hbWUpIHtcbiAgICAgICAgICAgIHZhciBpcmkgPSBlbGVtZW50W19HRVRfQVRUUklCVVRFX10ocmVmQXR0ck5hbWUpO1xuICAgICAgICAgICAgaWYgKC9eXFxzKiMvLnRlc3QoaXJpKSkgeyAvLyBDaGVjayBpZiBpcmkgaXMgbm9uLW51bGwgYW5kIGludGVybmFsIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBpcmkgPSBpcmkudHJpbSgpO1xuICAgICAgICAgICAgICBlbGVtZW50W19TRVRfQVRUUklCVVRFX10ocmVmQXR0ck5hbWUsIGlyaSArIGlkU3VmZml4KTtcbiAgICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWRJZHMpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgSUQgdG8gcmVmZXJlbmNlZCBJRHNcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VkSWRzW2lyaS5zdWJzdHJpbmcoMSldID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQgPSBkZXNjRWxlbWVudHNbKytpXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpZEVsZW1lbnRzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICAgIGlkRWxlbSA9IGlkRWxlbWVudHNbaV07XG4gICAgICAgIC8vIElmIHNldCBvZiByZWZlcmVuY2VkIElEcyBleGlzdHMsIG1ha2Ugb25seSByZWZlcmVuY2VkIElEcyB1bmlxdWUsXG4gICAgICAgIC8vIG90aGVyd2lzZSBtYWtlIGFsbCBJRHMgdW5pcXVlLlxuICAgICAgICBpZiAoIXJlZmVyZW5jZWRJZHMgfHwgcmVmZXJlbmNlZElkc1tpZEVsZW0uaWRdKSB7XG4gICAgICAgICAgLy8gQWRkIHN1ZmZpeCB0byBlbGVtZW50J3MgSURcbiAgICAgICAgICBpZEVsZW0uaWQgKz0gaWRTdWZmaXg7XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHRydWUgaWYgU1ZHIGVsZW1lbnQgaGFzIGNoYW5nZWRcbiAgICByZXR1cm4gY2hhbmdlZDtcbiAgfVxuXG5cbiAgLy8gRm9yIGNhY2hlZCBTVkdzIHRoZSBJRHMgYXJlIG1hZGUgdW5pcXVlIGJ5IHNpbXBseSByZXBsYWNpbmcgdGhlIGFscmVhZHkgaW5zZXJ0ZWQgdW5pcXVlIElEcyB3aXRoIGFcbiAgLy8gaGlnaGVyIElEIGNvdW50ZXIuIFRoaXMgaXMgbXVjaCBtb3JlIHBlcmZvcm1hbnQgdGhhbiBhIGNhbGwgdG8gbWFrZUlkc1VuaXF1ZSgpLlxuICBmdW5jdGlvbiBtYWtlSWRzVW5pcXVlQ2FjaGVkKHN2Z1N0cmluZykge1xuICAgIHJldHVybiBzdmdTdHJpbmcucmVwbGFjZShJRF9TVUZGSVhfUkVHRVgsIElEX1NVRkZJWCArIHVuaXF1ZUlkQ291bnRlcisrKTtcbiAgfVxuXG5cbiAgLy8gSW5qZWN0IFNWRyBieSByZXBsYWNpbmcgdGhlIGltZyBlbGVtZW50IHdpdGggdGhlIFNWRyBlbGVtZW50IGluIHRoZSBET01cbiAgZnVuY3Rpb24gaW5qZWN0KGltZ0VsZW0sIHN2Z0VsZW0sIGFic1VybCwgb3B0aW9ucykge1xuICAgIGlmIChzdmdFbGVtKSB7XG4gICAgICBzdmdFbGVtW19TRVRfQVRUUklCVVRFX10oJ2RhdGEtaW5qZWN0LXVybCcsIGFic1VybCk7XG4gICAgICB2YXIgcGFyZW50Tm9kZSA9IGltZ0VsZW0ucGFyZW50Tm9kZTtcbiAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcHlBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgY29weUF0dHJpYnV0ZXMoaW1nRWxlbSwgc3ZnRWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW52b2tlIGJlZm9yZUluamVjdCBob29rIGlmIHNldFxuICAgICAgICB2YXIgYmVmb3JlSW5qZWN0ID0gb3B0aW9ucy5iZWZvcmVJbmplY3Q7XG4gICAgICAgIHZhciBpbmplY3RFbGVtID0gKGJlZm9yZUluamVjdCAmJiBiZWZvcmVJbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSkpIHx8IHN2Z0VsZW07XG4gICAgICAgIC8vIFJlcGxhY2UgaW1nIGVsZW1lbnQgd2l0aCBuZXcgZWxlbWVudC4gVGhpcyBpcyB0aGUgYWN0dWFsIGluamVjdGlvbi5cbiAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoaW5qZWN0RWxlbSwgaW1nRWxlbSk7XG4gICAgICAgIC8vIE1hcmsgaW1nIGVsZW1lbnQgYXMgaW5qZWN0ZWRcbiAgICAgICAgaW1nRWxlbVtfX1NWR0lOSkVDVF0gPSBJTkpFQ1RFRDtcbiAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pO1xuICAgICAgICAvLyBJbnZva2UgYWZ0ZXJJbmplY3QgaG9vayBpZiBzZXRcbiAgICAgICAgdmFyIGFmdGVySW5qZWN0ID0gb3B0aW9ucy5hZnRlckluamVjdDtcbiAgICAgICAgaWYgKGFmdGVySW5qZWN0KSB7XG4gICAgICAgICAgYWZ0ZXJJbmplY3QoaW1nRWxlbSwgaW5qZWN0RWxlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIE1lcmdlcyBhbnkgbnVtYmVyIG9mIG9wdGlvbnMgb2JqZWN0cyBpbnRvIGEgbmV3IG9iamVjdFxuICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMoKSB7XG4gICAgdmFyIG1lcmdlZE9wdGlvbnMgPSB7fTtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAvLyBJdGVyYXRlIG92ZXIgYWxsIHNwZWNpZmllZCBvcHRpb25zIG9iamVjdHMgYW5kIGFkZCBhbGwgcHJvcGVydGllcyB0byB0aGUgbmV3IG9wdGlvbnMgb2JqZWN0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzW19MRU5HVEhfXTsgaSsrKSB7XG4gICAgICB2YXIgYXJndW1lbnQgPSBhcmdzW2ldO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnQpIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgbWVyZ2VkT3B0aW9uc1trZXldID0gYXJndW1lbnRba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkT3B0aW9ucztcbiAgfVxuXG5cbiAgLy8gQWRkcyB0aGUgc3BlY2lmaWVkIENTUyB0byB0aGUgZG9jdW1lbnQncyA8aGVhZD4gZWxlbWVudFxuICBmdW5jdGlvbiBhZGRTdHlsZVRvSGVhZChjc3MpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50W19HRVRfRUxFTUVOVFNfQllfVEFHX05BTUVfXSgnaGVhZCcpWzBdO1xuICAgIGlmIChoZWFkKSB7XG4gICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudFtfQ1JFQVRFX0VMRU1FTlRfXShfU1RZTEVfKTtcbiAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIEJ1aWxkcyBhbiBTVkcgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgU1ZHIHN0cmluZ1xuICBmdW5jdGlvbiBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyLCB2ZXJpZnkpIHtcbiAgICBpZiAodmVyaWZ5KSB7XG4gICAgICB2YXIgc3ZnRG9jO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gUGFyc2UgdGhlIFNWRyBzdHJpbmcgd2l0aCBET01QYXJzZXJcbiAgICAgICAgc3ZnRG9jID0gc3ZnU3RyaW5nVG9TdmdEb2Moc3ZnU3RyKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gTlVMTDtcbiAgICAgIH1cbiAgICAgIGlmIChzdmdEb2NbX0dFVF9FTEVNRU5UU19CWV9UQUdfTkFNRV9dKCdwYXJzZXJlcnJvcicpW19MRU5HVEhfXSkge1xuICAgICAgICAvLyBET01QYXJzZXIgZG9lcyBub3QgdGhyb3cgYW4gZXhjZXB0aW9uLCBidXQgaW5zdGVhZCBwdXRzIHBhcnNlcmVycm9yIHRhZ3MgaW4gdGhlIGRvY3VtZW50XG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN2Z0RvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBzdmdTdHI7XG4gICAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZ0VsZW0pIHtcbiAgICAvLyBSZW1vdmUgdGhlIG9ubG9hZCBhdHRyaWJ1dGUuIFNob3VsZCBvbmx5IGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSB1bnN0eWxlZCBpbWFnZSBmbGFzaCBwcm90ZWN0aW9uIGFuZFxuICAgIC8vIG1ha2UgdGhlIGVsZW1lbnQgdmlzaWJsZSwgbm90IGZvciByZW1vdmluZyB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gICAgaW1nRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ29ubG9hZCcpO1xuICB9XG5cblxuICBmdW5jdGlvbiBlcnJvck1lc3NhZ2UobXNnKSB7XG4gICAgY29uc29sZS5lcnJvcignU1ZHSW5qZWN0OiAnICsgbXNnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZmFpbChpbWdFbGVtLCBzdGF0dXMsIG9wdGlvbnMpIHtcbiAgICBpbWdFbGVtW19fU1ZHSU5KRUNUXSA9IEZBSUw7XG4gICAgaWYgKG9wdGlvbnMub25GYWlsKSB7XG4gICAgICBvcHRpb25zLm9uRmFpbChpbWdFbGVtLCBzdGF0dXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvck1lc3NhZ2Uoc3RhdHVzKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucykge1xuICAgIHJlbW92ZU9uTG9hZEF0dHJpYnV0ZShpbWdFbGVtKTtcbiAgICBmYWlsKGltZ0VsZW0sIFNWR19JTlZBTElELCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc3ZnTm90U3VwcG9ydGVkKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nRWxlbSk7XG4gICAgZmFpbChpbWdFbGVtLCBTVkdfTk9UX1NVUFBPUlRFRCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpIHtcbiAgICBmYWlsKGltZ0VsZW0sIExPQURfRkFJTCwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGltZ0VsZW0pIHtcbiAgICBpbWdFbGVtLm9ubG9hZCA9IE5VTEw7XG4gICAgaW1nRWxlbS5vbmVycm9yID0gTlVMTDtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaW1nTm90U2V0KG1zZykge1xuICAgIGVycm9yTWVzc2FnZSgnbm8gaW1nIGVsZW1lbnQnKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlU1ZHSW5qZWN0KGdsb2JhbE5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcbiAgICB2YXIgc3ZnTG9hZENhY2hlID0ge307XG5cbiAgICBpZiAoSVNfU1ZHX1NVUFBPUlRFRCkge1xuICAgICAgLy8gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgU1ZHLCBhZGQgYSBzbWFsbCBzdHlsZXNoZWV0IHRoYXQgaGlkZXMgdGhlIDxpbWc+IGVsZW1lbnRzIHVudGlsXG4gICAgICAvLyBpbmplY3Rpb24gaXMgZmluaXNoZWQuIFRoaXMgYXZvaWRzIHNob3dpbmcgdGhlIHVuc3R5bGVkIFNWR3MgYmVmb3JlIHN0eWxlIGlzIGFwcGxpZWQuXG4gICAgICBhZGRTdHlsZVRvSGVhZCgnaW1nW29ubG9hZF49XCInICsgZ2xvYmFsTmFtZSArICcoXCJde3Zpc2liaWxpdHk6aGlkZGVuO30nKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNWR0luamVjdFxuICAgICAqXG4gICAgICogSW5qZWN0cyB0aGUgU1ZHIHNwZWNpZmllZCBpbiB0aGUgYHNyY2AgYXR0cmlidXRlIG9mIHRoZSBzcGVjaWZpZWQgYGltZ2AgZWxlbWVudCBvciBhcnJheSBvZiBgaW1nYFxuICAgICAqIGVsZW1lbnRzLiBSZXR1cm5zIGEgUHJvbWlzZSBvYmplY3Qgd2hpY2ggcmVzb2x2ZXMgaWYgYWxsIHBhc3NlZCBpbiBgaW1nYCBlbGVtZW50cyBoYXZlIGVpdGhlciBiZWVuXG4gICAgICogaW5qZWN0ZWQgb3IgZmFpbGVkIHRvIGluamVjdCAoT25seSBpZiBhIGdsb2JhbCBQcm9taXNlIG9iamVjdCBpcyBhdmFpbGFibGUgbGlrZSBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzXG4gICAgICogb3IgdGhyb3VnaCBhIHBvbHlmaWxsKS5cbiAgICAgKlxuICAgICAqIE9wdGlvbnM6XG4gICAgICogdXNlQ2FjaGU6IElmIHNldCB0byBgdHJ1ZWAgdGhlIFNWRyB3aWxsIGJlIGNhY2hlZCB1c2luZyB0aGUgYWJzb2x1dGUgVVJMLiBEZWZhdWx0IHZhbHVlIGlzIGB0cnVlYC5cbiAgICAgKiBjb3B5QXR0cmlidXRlczogSWYgc2V0IHRvIGB0cnVlYCB0aGUgYXR0cmlidXRlcyB3aWxsIGJlIGNvcGllZCBmcm9tIGBpbWdgIHRvIGBzdmdgLiBEZmF1bHQgdmFsdWVcbiAgICAgKiAgICAgaXMgYHRydWVgLlxuICAgICAqIG1ha2VJZHNVbmlxdWU6IElmIHNldCB0byBgdHJ1ZWAgdGhlIElEIG9mIGVsZW1lbnRzIGluIHRoZSBgPGRlZnM+YCBlbGVtZW50IHRoYXQgY2FuIGJlIHJlZmVyZW5jZXMgYnlcbiAgICAgKiAgICAgcHJvcGVydHkgdmFsdWVzIChmb3IgZXhhbXBsZSAnY2xpcFBhdGgnKSBhcmUgbWFkZSB1bmlxdWUgYnkgYXBwZW5kaW5nIFwiLS1pbmplY3QtWFwiLCB3aGVyZSBYIGlzIGFcbiAgICAgKiAgICAgcnVubmluZyBudW1iZXIgd2hpY2ggaW5jcmVhc2VzIHdpdGggZWFjaCBpbmplY3Rpb24uIFRoaXMgaXMgZG9uZSB0byBhdm9pZCBkdXBsaWNhdGUgSURzIGluIHRoZSBET00uXG4gICAgICogYmVmb3JlTG9hZDogSG9vayBiZWZvcmUgU1ZHIGlzIGxvYWRlZC4gVGhlIGBpbWdgIGVsZW1lbnQgaXMgcGFzc2VkIGFzIGEgcGFyYW1ldGVyLiBJZiB0aGUgaG9vayByZXR1cm5zXG4gICAgICogICAgIGEgc3RyaW5nIGl0IGlzIHVzZWQgYXMgdGhlIFVSTCBpbnN0ZWFkIG9mIHRoZSBgaW1nYCBlbGVtZW50J3MgYHNyY2AgYXR0cmlidXRlLlxuICAgICAqIGFmdGVyTG9hZDogSG9vayBhZnRlciBTVkcgaXMgbG9hZGVkLiBUaGUgbG9hZGVkIGBzdmdgIGVsZW1lbnQgYW5kIGBzdmdgIHN0cmluZyBhcmUgcGFzc2VkIGFzIGFcbiAgICAgKiAgICAgcGFyYW1ldGVycy4gSWYgY2FjaGluZyBpcyBhY3RpdmUgdGhpcyBob29rIHdpbGwgb25seSBnZXQgY2FsbGVkIG9uY2UgZm9yIGluamVjdGVkIFNWR3Mgd2l0aCB0aGVcbiAgICAgKiAgICAgc2FtZSBhYnNvbHV0ZSBwYXRoLiBDaGFuZ2VzIHRvIHRoZSBgc3ZnYCBlbGVtZW50IGluIHRoaXMgaG9vayB3aWxsIGJlIGFwcGxpZWQgdG8gYWxsIGluamVjdGVkIFNWR3NcbiAgICAgKiAgICAgd2l0aCB0aGUgc2FtZSBhYnNvbHV0ZSBwYXRoLiBJdCdzIGFsc28gcG9zc2libGUgdG8gcmV0dXJuIGFuIGBzdmdgIHN0cmluZyBvciBgc3ZnYCBlbGVtZW50IHdoaWNoXG4gICAgICogICAgIHdpbGwgdGhlbiBiZSB1c2VkIGZvciB0aGUgaW5qZWN0aW9uLlxuICAgICAqIGJlZm9yZUluamVjdDogSG9vayBiZWZvcmUgU1ZHIGlzIGluamVjdGVkLiBUaGUgYGltZ2AgYW5kIGBzdmdgIGVsZW1lbnRzIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycy4gSWZcbiAgICAgKiAgICAgYW55IGh0bWwgZWxlbWVudCBpcyByZXR1cm5lZCBpdCBnZXRzIGluamVjdGVkIGluc3RlYWQgb2YgYXBwbHlpbmcgdGhlIGRlZmF1bHQgU1ZHIGluamVjdGlvbi5cbiAgICAgKiBhZnRlckluamVjdDogSG9vayBhZnRlciBTVkcgaXMgaW5qZWN0ZWQuIFRoZSBgaW1nYCBhbmQgYHN2Z2AgZWxlbWVudHMgYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzLlxuICAgICAqIG9uQWxsRmluaXNoOiBIb29rIGFmdGVyIGFsbCBgaW1nYCBlbGVtZW50cyBwYXNzZWQgdG8gYW4gU1ZHSW5qZWN0KCkgY2FsbCBoYXZlIGVpdGhlciBiZWVuIGluamVjdGVkIG9yXG4gICAgICogICAgIGZhaWxlZCB0byBpbmplY3QuXG4gICAgICogb25GYWlsOiBIb29rIGFmdGVyIGluamVjdGlvbiBmYWlscy4gVGhlIGBpbWdgIGVsZW1lbnQgYW5kIGEgYHN0YXR1c2Agc3RyaW5nIGFyZSBwYXNzZWQgYXMgYW4gcGFyYW1ldGVyLlxuICAgICAqICAgICBUaGUgYHN0YXR1c2AgY2FuIGJlIGVpdGhlciBgJ1NWR19OT1RfU1VQUE9SVEVEJ2AgKHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHKSxcbiAgICAgKiAgICAgYCdTVkdfSU5WQUxJRCdgICh0aGUgU1ZHIGlzIG5vdCBpbiBhIHZhbGlkIGZvcm1hdCkgb3IgYCdMT0FEX0ZBSUxFRCdgIChsb2FkaW5nIG9mIHRoZSBTVkcgZmFpbGVkKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gYW4gaW1nIGVsZW1lbnQgb3IgYW4gYXJyYXkgb2YgaW1nIGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIG9wdGlvbmFsIHBhcmFtZXRlciB3aXRoIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIHRoaXMgaW5qZWN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNWR0luamVjdChpbWcsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICB2YXIgYWxsRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9uQWxsRmluaXNoID0gb3B0aW9ucy5vbkFsbEZpbmlzaDtcbiAgICAgICAgICBpZiAob25BbGxGaW5pc2gpIHtcbiAgICAgICAgICAgIG9uQWxsRmluaXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUgJiYgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpbWcgJiYgdHlwZW9mIGltZ1tfTEVOR1RIX10gIT0gX1VOREVGSU5FRF8pIHtcbiAgICAgICAgICAvLyBhbiBhcnJheSBsaWtlIHN0cnVjdHVyZSBvZiBpbWcgZWxlbWVudHNcbiAgICAgICAgICB2YXIgaW5qZWN0SW5kZXggPSAwO1xuICAgICAgICAgIHZhciBpbmplY3RDb3VudCA9IGltZ1tfTEVOR1RIX107XG5cbiAgICAgICAgICBpZiAoaW5qZWN0Q291bnQgPT0gMCkge1xuICAgICAgICAgICAgYWxsRmluaXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCsraW5qZWN0SW5kZXggPT0gaW5qZWN0Q291bnQpIHtcbiAgICAgICAgICAgICAgICBhbGxGaW5pc2goKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmplY3RDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgIFNWR0luamVjdEVsZW1lbnQoaW1nW2ldLCBvcHRpb25zLCBmaW5pc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvbmx5IG9uZSBpbWcgZWxlbWVudFxuICAgICAgICAgIFNWR0luamVjdEVsZW1lbnQoaW1nLCBvcHRpb25zLCBhbGxGaW5pc2gpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyByZXR1cm4gYSBQcm9taXNlIG9iamVjdCBpZiBnbG9iYWxseSBhdmFpbGFibGVcbiAgICAgIHJldHVybiB0eXBlb2YgUHJvbWlzZSA9PSBfVU5ERUZJTkVEXyA/IHJ1bigpIDogbmV3IFByb21pc2UocnVuKTtcbiAgICB9XG5cblxuICAgIC8vIEluamVjdHMgYSBzaW5nbGUgc3ZnIGVsZW1lbnQuIE9wdGlvbnMgbXVzdCBiZSBhbHJlYWR5IG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0IG9wdGlvbnMuXG4gICAgZnVuY3Rpb24gU1ZHSW5qZWN0RWxlbWVudChpbWdFbGVtLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgaWYgKGltZ0VsZW0pIHtcbiAgICAgICAgdmFyIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlID0gaW1nRWxlbVtfX1NWR0lOSkVDVF07XG4gICAgICAgIGlmICghc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhpbWdFbGVtKTtcblxuICAgICAgICAgIGlmICghSVNfU1ZHX1NVUFBPUlRFRCkge1xuICAgICAgICAgICAgc3ZnTm90U3VwcG9ydGVkKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSW52b2tlIGJlZm9yZUxvYWQgaG9vayBpZiBzZXQuIElmIHRoZSBiZWZvcmVMb2FkIHJldHVybnMgYSB2YWx1ZSB1c2UgaXQgYXMgdGhlIHNyYyBmb3IgdGhlIGxvYWRcbiAgICAgICAgICAvLyBVUkwgcGF0aC4gRWxzZSB1c2UgdGhlIGltZ0VsZW0ncyBzcmMgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICAgIHZhciBiZWZvcmVMb2FkID0gb3B0aW9ucy5iZWZvcmVMb2FkO1xuICAgICAgICAgIHZhciBzcmMgPSAoYmVmb3JlTG9hZCAmJiBiZWZvcmVMb2FkKGltZ0VsZW0pKSB8fCBpbWdFbGVtW19HRVRfQVRUUklCVVRFX10oJ3NyYycpO1xuXG4gICAgICAgICAgaWYgKCFzcmMpIHtcbiAgICAgICAgICAgIC8vIElmIG5vIGltYWdlIHNyYyBhdHRyaWJ1dGUgaXMgc2V0IGRvIG5vIGluamVjdGlvbi4gVGhpcyBjYW4gb25seSBiZSByZWFjaGVkIGJ5IHVzaW5nIGphdmFzY3JpcHRcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgaWYgbm8gc3JjIGF0dHJpYnV0ZSBpcyBzZXQgdGhlIG9ubG9hZCBhbmQgb25lcnJvciBldmVudHMgZG8gbm90IGdldCBjYWxsZWRcbiAgICAgICAgICAgIGlmIChzcmMgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGxvYWRGYWlsKGltZ0VsZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzZXQgYXJyYXkgc28gbGF0ZXIgY2FsbHMgY2FuIHJlZ2lzdGVyIGNhbGxiYWNrc1xuICAgICAgICAgIHZhciBvbkZpbmlzaENhbGxiYWNrcyA9IFtdO1xuICAgICAgICAgIGltZ0VsZW1bX19TVkdJTkpFQ1RdID0gb25GaW5pc2hDYWxsYmFja3M7XG5cbiAgICAgICAgICB2YXIgb25GaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBvbkZpbmlzaENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKG9uRmluaXNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgb25GaW5pc2hDYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhYnNVcmwgPSBnZXRBYnNvbHV0ZVVybChzcmMpO1xuICAgICAgICAgIHZhciB1c2VDYWNoZU9wdGlvbiA9IG9wdGlvbnMudXNlQ2FjaGU7XG4gICAgICAgICAgdmFyIG1ha2VJZHNVbmlxdWVPcHRpb24gPSBvcHRpb25zLm1ha2VJZHNVbmlxdWU7XG4gICAgICAgICAgXG4gICAgICAgICAgdmFyIHNldFN2Z0xvYWRDYWNoZVZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodXNlQ2FjaGVPcHRpb24pIHtcbiAgICAgICAgICAgICAgc3ZnTG9hZENhY2hlW2Fic1VybF0uZm9yRWFjaChmdW5jdGlvbihzdmdMb2FkKSB7XG4gICAgICAgICAgICAgICAgc3ZnTG9hZCh2YWwpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc3ZnTG9hZENhY2hlW2Fic1VybF0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICh1c2VDYWNoZU9wdGlvbikge1xuICAgICAgICAgICAgdmFyIHN2Z0xvYWQgPSBzdmdMb2FkQ2FjaGVbYWJzVXJsXTtcblxuICAgICAgICAgICAgdmFyIGhhbmRsZUxvYWRWYWx1ZSA9IGZ1bmN0aW9uKGxvYWRWYWx1ZSkge1xuICAgICAgICAgICAgICBpZiAobG9hZFZhbHVlID09PSBMT0FEX0ZBSUwpIHtcbiAgICAgICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2FkVmFsdWUgPT09IFNWR19JTlZBTElEKSB7XG4gICAgICAgICAgICAgICAgc3ZnSW52YWxpZChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzVW5pcXVlSWRzID0gbG9hZFZhbHVlWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzdmdTdHJpbmcgPSBsb2FkVmFsdWVbMV07XG4gICAgICAgICAgICAgICAgdmFyIHVuaXF1ZUlkc1N2Z1N0cmluZyA9IGxvYWRWYWx1ZVsyXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ZnRWxlbTtcblxuICAgICAgICAgICAgICAgIGlmIChtYWtlSWRzVW5pcXVlT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaGFzVW5pcXVlSWRzID09PSBOVUxMKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElEcyBmb3IgdGhlIFNWRyBzdHJpbmcgaGF2ZSBub3QgYmVlbiBtYWRlIHVuaXF1ZSBiZWZvcmUuIFRoaXMgbWF5IGhhcHBlbiBpZiBwcmV2aW91c1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmplY3Rpb24gb2YgYSBjYWNoZWQgU1ZHIGhhdmUgYmVlbiBydW4gd2l0aCB0aGUgb3B0aW9uIG1ha2VkSWRzVW5pcXVlIHNldCB0byBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBzdmdFbGVtID0gYnVpbGRTdmdFbGVtZW50KHN2Z1N0cmluZywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBoYXNVbmlxdWVJZHMgPSBtYWtlSWRzVW5pcXVlKHN2Z0VsZW0sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICBsb2FkVmFsdWVbMF0gPSBoYXNVbmlxdWVJZHM7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRWYWx1ZVsyXSA9IGhhc1VuaXF1ZUlkcyAmJiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc1VuaXF1ZUlkcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIElEcyB1bmlxdWUgZm9yIGFscmVhZHkgY2FjaGVkIFNWR3Mgd2l0aCBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgICAgICAgICAgc3ZnU3RyaW5nID0gbWFrZUlkc1VuaXF1ZUNhY2hlZCh1bmlxdWVJZHNTdmdTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN2Z0VsZW0gPSBzdmdFbGVtIHx8IGJ1aWxkU3ZnRWxlbWVudChzdmdTdHJpbmcsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGluamVjdChpbWdFbGVtLCBzdmdFbGVtLCBhYnNVcmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN2Z0xvYWQgIT0gX1VOREVGSU5FRF8pIHtcbiAgICAgICAgICAgICAgLy8gVmFsdWUgZm9yIHVybCBleGlzdHMgaW4gY2FjaGVcbiAgICAgICAgICAgICAgaWYgKHN2Z0xvYWQuaXNDYWxsYmFja1F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgLy8gU2FtZSB1cmwgaGFzIGJlZW4gY2FjaGVkLCBidXQgdmFsdWUgaGFzIG5vdCBiZWVuIGxvYWRlZCB5ZXQsIHNvIGFkZCB0byBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICBzdmdMb2FkLnB1c2goaGFuZGxlTG9hZFZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVMb2FkVmFsdWUoc3ZnTG9hZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHN2Z0xvYWQgPSBbXTtcbiAgICAgICAgICAgICAgLy8gc2V0IHByb3BlcnR5IGlzQ2FsbGJhY2tRdWV1ZSB0byBBcnJheSB0byBkaWZmZXJlbnRpYXRlIGZyb20gYXJyYXkgd2l0aCBjYWNoZWQgbG9hZGVkIHZhbHVlc1xuICAgICAgICAgICAgICBzdmdMb2FkLmlzQ2FsbGJhY2tRdWV1ZSA9IHRydWU7XG4gICAgICAgICAgICAgIHN2Z0xvYWRDYWNoZVthYnNVcmxdID0gc3ZnTG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMb2FkIHRoZSBTVkcgYmVjYXVzZSBpdCBpcyBub3QgY2FjaGVkIG9yIGNhY2hpbmcgaXMgZGlzYWJsZWRcbiAgICAgICAgICBsb2FkU3ZnKGFic1VybCwgZnVuY3Rpb24oc3ZnWG1sLCBzdmdTdHJpbmcpIHtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgWE1MIGZyb20gdGhlIFhIUiByZXF1ZXN0IGlmIGl0IGlzIGFuIGluc3RhbmNlIG9mIERvY3VtZW50LiBPdGhlcndpc2VcbiAgICAgICAgICAgIC8vIChmb3IgZXhhbXBsZSBvZiBJRTkpLCBjcmVhdGUgdGhlIHN2ZyBkb2N1bWVudCBmcm9tIHRoZSBzdmcgc3RyaW5nLlxuICAgICAgICAgICAgdmFyIHN2Z0VsZW0gPSBzdmdYbWwgaW5zdGFuY2VvZiBEb2N1bWVudCA/IHN2Z1htbC5kb2N1bWVudEVsZW1lbnQgOiBidWlsZFN2Z0VsZW1lbnQoc3ZnU3RyaW5nLCB0cnVlKTtcblxuICAgICAgICAgICAgdmFyIGFmdGVyTG9hZCA9IG9wdGlvbnMuYWZ0ZXJMb2FkO1xuICAgICAgICAgICAgaWYgKGFmdGVyTG9hZCkge1xuICAgICAgICAgICAgICAvLyBJbnZva2UgYWZ0ZXJMb2FkIGhvb2sgd2hpY2ggbWF5IG1vZGlmeSB0aGUgU1ZHIGVsZW1lbnQuIEFmdGVyIGxvYWQgbWF5IGFsc28gcmV0dXJuIGEgbmV3XG4gICAgICAgICAgICAgIC8vIHN2ZyBlbGVtZW50IG9yIHN2ZyBzdHJpbmdcbiAgICAgICAgICAgICAgdmFyIHN2Z0VsZW1PclN2Z1N0cmluZyA9IGFmdGVyTG9hZChzdmdFbGVtLCBzdmdTdHJpbmcpIHx8IHN2Z0VsZW07XG4gICAgICAgICAgICAgIGlmIChzdmdFbGVtT3JTdmdTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc3ZnRWxlbSBhbmQgc3ZnU3RyaW5nIGJlY2F1c2Ugb2YgbW9kaWZpY2F0aW9ucyB0byB0aGUgU1ZHIGVsZW1lbnQgb3IgU1ZHIHN0cmluZyBpblxuICAgICAgICAgICAgICAgIC8vIHRoZSBhZnRlckxvYWQgaG9vaywgc28gdGhlIG1vZGlmaWVkIFNWRyBpcyBhbHNvIHVzZWQgZm9yIGFsbCBsYXRlciBjYWNoZWQgaW5qZWN0aW9uc1xuICAgICAgICAgICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBzdmdFbGVtT3JTdmdTdHJpbmcgPT0gJ3N0cmluZyc7XG4gICAgICAgICAgICAgICAgc3ZnU3RyaW5nID0gaXNTdHJpbmcgPyBzdmdFbGVtT3JTdmdTdHJpbmcgOiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbSk7XG4gICAgICAgICAgICAgICAgc3ZnRWxlbSA9IGlzU3RyaW5nID8gYnVpbGRTdmdFbGVtZW50KHN2Z0VsZW1PclN2Z1N0cmluZywgdHJ1ZSkgOiBzdmdFbGVtT3JTdmdTdHJpbmc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN2Z0VsZW0gaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHZhciBoYXNVbmlxdWVJZHMgPSBOVUxMO1xuICAgICAgICAgICAgICBpZiAobWFrZUlkc1VuaXF1ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIGhhc1VuaXF1ZUlkcyA9IG1ha2VJZHNVbmlxdWUoc3ZnRWxlbSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHVzZUNhY2hlT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVuaXF1ZUlkc1N2Z1N0cmluZyA9IGhhc1VuaXF1ZUlkcyAmJiBzdmdFbGVtVG9TdmdTdHJpbmcoc3ZnRWxlbSk7XG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuIGFycmF5IHdpdGggdGhyZWUgZW50cmllcyB0byB0aGUgbG9hZCBjYWNoZVxuICAgICAgICAgICAgICAgIHNldFN2Z0xvYWRDYWNoZVZhbHVlKFtoYXNVbmlxdWVJZHMsIHN2Z1N0cmluZywgdW5pcXVlSWRzU3ZnU3RyaW5nXSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpbmplY3QoaW1nRWxlbSwgc3ZnRWxlbSwgYWJzVXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN2Z0ludmFsaWQoaW1nRWxlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIHNldFN2Z0xvYWRDYWNoZVZhbHVlKFNWR19JTlZBTElEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2FkRmFpbChpbWdFbGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNldFN2Z0xvYWRDYWNoZVZhbHVlKExPQURfRkFJTCk7XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlKSkge1xuICAgICAgICAgICAgLy8gc3ZnSW5qZWN0QXR0cmlidXRlVmFsdWUgaXMgYW4gYXJyYXkuIEluamVjdGlvbiBpcyBub3QgY29tcGxldGUgc28gcmVnaXN0ZXIgY2FsbGJhY2tcbiAgICAgICAgICAgIHN2Z0luamVjdEF0dHJpYnV0ZVZhbHVlLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1nTm90U2V0KCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIFNWR0luamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBkZWZhdWx0IFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGFuIGluamVjdGlvbi5cbiAgICAgKi9cbiAgICBTVkdJbmplY3Quc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB9O1xuXG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgU1ZHSW5qZWN0XG4gICAgU1ZHSW5qZWN0LmNyZWF0ZSA9IGNyZWF0ZVNWR0luamVjdDtcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbiBvbmVycm9yIEV2ZW50IG9mIGFuIGA8aW1nPmAgZWxlbWVudCB0byBoYW5kbGUgY2FzZXMgd2hlbiB0aGUgbG9hZGluZyB0aGUgb3JpZ2luYWwgc3JjIGZhaWxzXG4gICAgICogKGZvciBleGFtcGxlIGlmIGZpbGUgaXMgbm90IGZvdW5kIG9yIGlmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHKS4gVGhpcyB0cmlnZ2VycyBhIGNhbGwgdG8gdGhlXG4gICAgICogb3B0aW9ucyBvbkZhaWwgaG9vayBpZiBhdmFpbGFibGUuIFRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHdpbGwgYmUgc2V0IGFzIHRoZSBuZXcgc3JjIGF0dHJpYnV0ZVxuICAgICAqIGZvciB0aGUgaW1nIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIGFuIGltZyBlbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtmYWxsYmFja1NyY10gLSBvcHRpb25hbCBwYXJhbWV0ZXIgZmFsbGJhY2sgc3JjXG4gICAgICovXG4gICAgU1ZHSW5qZWN0LmVyciA9IGZ1bmN0aW9uKGltZywgZmFsbGJhY2tTcmMpIHtcbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgaWYgKGltZ1tfX1NWR0lOSkVDVF0gIT0gRkFJTCkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGltZyk7XG5cbiAgICAgICAgICBpZiAoIUlTX1NWR19TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIHN2Z05vdFN1cHBvcnRlZChpbWcsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlT25Mb2FkQXR0cmlidXRlKGltZyk7XG4gICAgICAgICAgICBsb2FkRmFpbChpbWcsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZhbGxiYWNrU3JjKSB7XG4gICAgICAgICAgICByZW1vdmVPbkxvYWRBdHRyaWJ1dGUoaW1nKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBmYWxsYmFja1NyYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ05vdFNldCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3dbZ2xvYmFsTmFtZV0gPSBTVkdJbmplY3Q7XG5cbiAgICByZXR1cm4gU1ZHSW5qZWN0O1xuICB9XG5cbiAgdmFyIFNWR0luamVjdEluc3RhbmNlID0gY3JlYXRlU1ZHSW5qZWN0KCdTVkdJbmplY3QnKTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFNWR0luamVjdEluc3RhbmNlO1xuICB9XG59KSh3aW5kb3csIGRvY3VtZW50KTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUxpZ2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLVNlbWlCb2xkLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1Cb2xkLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL1BvcHBpbnMvUG9wcGlucy1FeHRyYUJvbGQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICAgIC8qIGh0dHBzOi8vZm9udHMuZ29vZ2xlLmNvbS9zcGVjaW1lbi9Qb3BwaW5zICovXG4gICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJztcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSksXG4gICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KSxcbiAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fX30pLFxuICAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19ffSk7XG59XG5cbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG59XG5cbjpyb290IHtcbiAgICAvKiBjdXN0b20gdmFyaWFibGVzICovXG4gICAgLS1mb250LWZhbWlseS1wcmltYXJ5OiAnUG9wcGlucycsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgIC0tdGV4dC1jb2xvci1wcmltYXJ5OiByZ2JhKDMyLCAzMiwgMzIsIDEpO1xuICAgIC0tYmFja2dyb3VuZC1wcmltYXJ5OiByZ2IoMjU1LCAyNTUsIDI1NSk7XG4gICAgLS1hY2NlbnQtcHJpbWFyeTogcmdiKDE3MywgNzcsIDIzMik7XG4gICAgLS1hY2NlbnQtc2Vjb25kYXJ5OiByZ2IoMjQxLCAyNDEsIDI0MSk7XG4gICAgLS1hY2NlbnQtdGVydGlhcnk6ICMxNjhERUU7XG4gICAgLS1wcmlvcml0eS0xLWNvbG9yOiAjRjg0MTI1O1xuICAgIC0tcHJpb3JpdHktMi1jb2xvcjogI2ZmYTUwMDtcbiAgICAtLXByaW9yaXR5LTMtY29sb3I6ICMxNEVCQzA7XG4gICAgLS1wcmlvcml0eS00LWNvbG9yOiAjOWU5ZTllO1xuICAgIC0tYnV0dG9uLXJhZGl1czogMC4zNXJlbTtcbiAgICAtLWNpcmNsZS1yYWRpdXM6IDUwJTtcbiAgICAtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmc6IDAuMjVyZW07XG4gICAgLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICAgIC0tY29sdW1uLWdhcC1zbWFsbDogMC4yNXJlbTtcbn1cblxuYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgYW5pbWF0aW9uOiBmYWRlLWluIDIwMG1zIGVhc2UtaW47XG59XG5cbiN0b2RvX2FwcCB7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMWZyO1xufVxuXG4jY29udGVudCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4jY29udGVudCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbn1cblxuLm92ZXJsYXlfbWFpbl9jb250ZW50IHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XG59XG5cbi5vdmVybGF5X21haW5fY29udGVudC5kaW0ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI21haW5fY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiA1JTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG59XG5cbiNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IG1pbi1jb250ZW50IDFmcjtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBhbmltYXRpb246IGZhZGUtaW4gMzAwbXMgZWFzZS1pbjtcbn1cblxuLyogZ2VuZXJhbCBzdHlsZXMgZm9yIHNpbWlsYXIgZWxlbWVudHMgZXhpc3Rpbmcgb24gZGlmZmVyZW50IG1vZHVsZXMgKi9cbmE6dmlzaXRlZCB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG59XG5cbi5pbWdfd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuZGlhbG9nOm5vdCgjdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zKTpub3QoI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMpIHtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbWluLXdpZHRoOiA2MHZ3O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG5kaWFsb2c6OmJhY2tkcm9wIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5uYXZfcHJvamVjdCA+IHN2Zyxcbi5wcm9qZWN0X2NpcmNsZSB7XG4gICAgY29sb3I6IHJnYig3MCwgNzAsIDcwKTtcbn1cblxuYnV0dG9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1idXR0b24tcmFkaXVzKTtcbn1cblxuLmJ0bl9pbWdfd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbiA+IHN2ZyxcbmJ1dHRvbiA+ICogPiBzdmcge1xuICAgIGhlaWdodDogYXV0bztcbiAgICB3aWR0aDogY2xhbXAoMS4yNXJlbSwgMi41dncsIDEuNXJlbSk7XG59XG5cbi5mb3JtX2l0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmZvcm1faXRlbTo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgd2lkdGg6IDkwJTtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjMpO1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG59XG5cbi5mb3JtX2l0ZW0gPiAqIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XG59XG5cbi5mb3JtX2l0ZW0gPiBsYWJlbCB7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmZvcm1faXRlbSA+IC50YXNrX2lucHV0LFxuLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xufVxuXG4uZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQ6Zm9jdXMsXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDVweCAtMXB4IGluc2V0IHJnYmEoMCwgMCwgMCwgMSk7XG59XG5cbi5mb3JtX2J1dHRvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG59XG5cbi5mb3JtX2J1dHRvbnMgPiAqIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2LCAyMjYsIDIyNik7XG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+IGJ1dHRvblt0eXBlPVwic3VibWl0XCJdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG59XG5cbi5mb3JtX2J1dHRvbnMgPiBidXR0b25bdHlwZT1cInN1Ym1pdFwiXTpob3ZlciB7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xufVxuXG4uZm9ybV9idXR0b25zID4gYnV0dG9uOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC44NSk7XG59XG5cbi5mb3JtX2J1dHRvbnMgPiAqOmFjdGl2ZSB7XG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC44KTtcbn1cblxuLmZvcm1faXRlbSA+IC50YXNrX2lucHV0OmhvdmVyOm5vdCg6Zm9jdXMpLFxuLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0OmhvdmVyOm5vdCg6Zm9jdXMpLFxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0OmhvdmVyLFxuLmJ0bl9hZGRfcHJvamVjdDpob3Zlcixcbi5idG5fZGVsZXRlX3Byb2plY3Q6aG92ZXIsXG4udGFza19hY3Rpb25zID4gYnV0dG9uOmhvdmVyLFxuI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcbiAgICAjbWFpbl9jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogMiUgMi41JSAyJSAyLjUlO1xuICAgIH1cblxuICAgICNtYWluX2NvbnRlbnQgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgICB3aWR0aDogNzAlO1xuICAgIH1cblxuICAgICNjb250ZW50IHtcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgZmFkZS1pbiB7XG4gICAgMCUge1xuICAgICAgICBvcGFjaXR5OiAwJVxuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICBvcGFjaXR5OiAxMDAlO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9hcHAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksOENBQThDO0lBQzlDLHNCQUFzQjtJQUN0Qjs7Ozs7K0NBS3VEO0FBQzNEOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLDhCQUE4QjtJQUM5QiwyQkFBMkI7SUFDM0IsU0FBUztJQUNULFVBQVU7SUFDVix1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsbURBQW1EO0lBQ25ELHlDQUF5QztJQUN6Qyx3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLHNDQUFzQztJQUN0QywwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsaUNBQWlDO0lBQ2pDLHVDQUF1QztJQUN2QywyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixXQUFXO0lBQ1gsWUFBWTtJQUNaLG9DQUFvQztJQUNwQyxVQUFVO0lBQ1YscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksVUFBVTtJQUNWLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLE9BQU87SUFDUCxXQUFXO0lBQ1gsYUFBYTtJQUNiLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLFdBQVc7SUFDWCxnQ0FBZ0M7QUFDcEM7O0FBRUEsc0VBQXNFO0FBQ3RFO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBOztJQUVJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBOztJQUVJLFlBQVk7SUFDWixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsMkNBQTJDO0lBQzNDLFlBQVk7SUFDWixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBOztJQUVJLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsb0JBQW9CO0FBQ3hCOztBQUVBOztJQUVJLHdDQUF3QztJQUN4QyxhQUFhO0lBQ2IsbURBQW1EO0FBQ3ZEOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksdUNBQXVDO0FBQzNDOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksOENBQThDO0FBQ2xEOztBQUVBOzs7Ozs7O0lBT0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0k7UUFDSSx3QkFBd0I7SUFDNUI7O0lBRUE7UUFDSSxVQUFVO0lBQ2Q7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsYUFBYTtJQUNqQjtBQUNKOztBQUVBO0lBQ0k7UUFDSTtJQUNKOztJQUVBO1FBQ0ksYUFBYTtJQUNqQjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICAvKiBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUG9wcGlucyAqL1xcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnO1xcbiAgICBzcmM6IHVybCgnLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUxpZ2h0LnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtTWVkaXVtLnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtUmVndWxhci50dGYnKSxcXG4gICAgICAgIHVybCgnLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLVNlbWlCb2xkLnR0ZicpLFxcbiAgICAgICAgdXJsKCcuL2Fzc2V0cy9mb250cy9Qb3BwaW5zL1BvcHBpbnMtQm9sZC50dGYnKSxcXG4gICAgICAgIHVybCgnLi9hc3NldHMvZm9udHMvUG9wcGlucy9Qb3BwaW5zLUV4dHJhQm9sZC50dGYnKTtcXG59XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgICAvKiBjdXN0b20gdmFyaWFibGVzICovXFxuICAgIC0tZm9udC1mYW1pbHktcHJpbWFyeTogJ1BvcHBpbnMnLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgLS10ZXh0LWNvbG9yLXByaW1hcnk6IHJnYmEoMzIsIDMyLCAzMiwgMSk7XFxuICAgIC0tYmFja2dyb3VuZC1wcmltYXJ5OiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICAgIC0tYWNjZW50LXByaW1hcnk6IHJnYigxNzMsIDc3LCAyMzIpO1xcbiAgICAtLWFjY2VudC1zZWNvbmRhcnk6IHJnYigyNDEsIDI0MSwgMjQxKTtcXG4gICAgLS1hY2NlbnQtdGVydGlhcnk6ICMxNjhERUU7XFxuICAgIC0tcHJpb3JpdHktMS1jb2xvcjogI0Y4NDEyNTtcXG4gICAgLS1wcmlvcml0eS0yLWNvbG9yOiAjZmZhNTAwO1xcbiAgICAtLXByaW9yaXR5LTMtY29sb3I6ICMxNEVCQzA7XFxuICAgIC0tcHJpb3JpdHktNC1jb2xvcjogIzllOWU5ZTtcXG4gICAgLS1idXR0b24tcmFkaXVzOiAwLjM1cmVtO1xcbiAgICAtLWNpcmNsZS1yYWRpdXM6IDUwJTtcXG4gICAgLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nOiAwLjI1cmVtO1xcbiAgICAtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIC0tY29sdW1uLWdhcC1zbWFsbDogMC4yNXJlbTtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBhbmltYXRpb246IGZhZGUtaW4gMjAwbXMgZWFzZS1pbjtcXG59XFxuXFxuI3RvZG9fYXBwIHtcXG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCAxZnI7XFxufVxcblxcbiNjb250ZW50IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jY29udGVudCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbi5vdmVybGF5X21haW5fY29udGVudCB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLm92ZXJsYXlfbWFpbl9jb250ZW50LmRpbSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNtYWluX2NvbnRlbnQge1xcbiAgICBmbGV4OiAxO1xcbiAgICBwYWRkaW5nOiA1JTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcXG59XFxuXFxuI21haW5fY29udGVudCA+IDpmaXJzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtYXV0by1yb3dzOiBtaW4tY29udGVudCAxZnI7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYW5pbWF0aW9uOiBmYWRlLWluIDMwMG1zIGVhc2UtaW47XFxufVxcblxcbi8qIGdlbmVyYWwgc3R5bGVzIGZvciBzaW1pbGFyIGVsZW1lbnRzIGV4aXN0aW5nIG9uIGRpZmZlcmVudCBtb2R1bGVzICovXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxufVxcblxcbi5pbWdfd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbmRpYWxvZzpub3QoI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyk6bm90KCN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zKSB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgbWluLXdpZHRoOiA2MHZ3O1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmRpYWxvZzo6YmFja2Ryb3Age1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcblxcbi5uYXZfcHJvamVjdCA+IHN2ZyxcXG4ucHJvamVjdF9jaXJjbGUge1xcbiAgICBjb2xvcjogcmdiKDcwLCA3MCwgNzApO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1idXR0b24tcmFkaXVzKTtcXG59XFxuXFxuLmJ0bl9pbWdfd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuYnV0dG9uID4gc3ZnLFxcbmJ1dHRvbiA+ICogPiBzdmcge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiBjbGFtcCgxLjI1cmVtLCAyLjV2dywgMS41cmVtKTtcXG59XFxuXFxuLmZvcm1faXRlbSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5mb3JtX2l0ZW06OmFmdGVyIHtcXG4gICAgY29udGVudDogJyc7XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiBsYWJlbCB7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dCxcXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAudGFza19pbnB1dDpmb2N1cyxcXG4uZm9ybV9pdGVtID4gLnByb2plY3RfaW5wdXQ6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDVweCAtMXB4IGluc2V0IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gKiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIyNiwgMjI2KTtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gYnV0dG9uW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gYnV0dG9uW3R5cGU9XFxcInN1Ym1pdFxcXCJdOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDAuODUpO1xcbn1cXG5cXG4uZm9ybV9idXR0b25zID4gKjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjgpO1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gLnRhc2tfaW5wdXQ6aG92ZXI6bm90KDpmb2N1cyksXFxuLmZvcm1faXRlbSA+IC5wcm9qZWN0X2lucHV0OmhvdmVyOm5vdCg6Zm9jdXMpLFxcbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzID4gLmJ0bl9hZGRfcHJvamVjdDpob3ZlcixcXG4uYnRuX2FkZF9wcm9qZWN0OmhvdmVyLFxcbi5idG5fZGVsZXRlX3Byb2plY3Q6aG92ZXIsXFxuLnRhc2tfYWN0aW9ucyA+IGJ1dHRvbjpob3ZlcixcXG4jbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiBidXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgI21haW5fY29udGVudCB7XFxuICAgICAgICBwYWRkaW5nOiAyJSAyLjUlIDIlIDIuNSU7XFxuICAgIH1cXG5cXG4gICAgI21haW5fY29udGVudCA+IDpmaXJzdC1jaGlsZCB7XFxuICAgICAgICB3aWR0aDogNzAlO1xcbiAgICB9XFxuXFxuICAgICNjb250ZW50IHtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDAlXFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxMDAlO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgYW5pbWF0aW9uOiBmYWRlLWluIDQwMG1zIGVhc2UtaW47XG59XG5cbmhlYWRlciA+ICNuYXZiYXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDAuNjByZW0gMC43NXJlbTtcbn1cblxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGNvbHVtbi1nYXA6IHZhcigtLWNvbHVtbi1nYXAtc21hbGwpO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tYnV0dG9uLXJhZGl1cyk7XG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZyk7XG59XG5cbiNuYXZiYXIgPiAqID4gLmNvbnRhaW5lciA+IGJ1dHRvbjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG59XG5cbi5pbnB1dF9zZWFyY2gge1xuICAgIHdpZHRoOiBtaW4oMzUwcHgsIDUwJSk7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqID4gc3ZnIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IGNsYW1wKDEuNzVyZW0sIDN2dywgMi41cmVtKTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaGVhZGVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHVDQUF1QztJQUN2QyxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG1DQUFtQztJQUNuQyxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQ0FBa0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICBhbmltYXRpb246IGZhZGUtaW4gNDAwbXMgZWFzZS1pbjtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcGFkZGluZzogMC42MHJlbSAwLjc1cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG59XFxuXFxuaGVhZGVyID4gI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gKiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJ1dHRvbi1yYWRpdXMpO1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nKTtcXG59XFxuXFxuI25hdmJhciA+ICogPiAuY29udGFpbmVyID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XFxufVxcblxcbi5pbnB1dF9zZWFyY2gge1xcbiAgICB3aWR0aDogbWluKDM1MHB4LCA1MCUpO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xcbn1cXG5cXG5oZWFkZXIgPiAjbmF2YmFyID4gKiA+IC5jb250YWluZXIgPiAqID4gc3ZnIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogY2xhbXAoMS43NXJlbSwgM3Z3LCAyLjVyZW0pO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlcyBmb3IgdGFzay9wcm9qZWN0IG1vZGFsIHJlbW92YWwgKi9cbi5mb3JtX3JlbW92YWwge1xuICAgIHBhZGRpbmc6IDFyZW07XG59XG5cbi5mb3JtX3JlbW92YWwgPiBkaXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjVyZW07XG59XG5cbi5pdGVtX2Zvcl9yZW1vdmFsIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLmZvcm1fYnV0dG9ucyA+IGJ1dHRvblt0eXBlPVwic3VibWl0XCJdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwMCwgMCwgMCwgMC42KTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbW9kYWxfcmVtb3ZhbC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsMENBQTBDO0FBQzFDO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLHNDQUFzQztBQUMxQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIHRhc2svcHJvamVjdCBtb2RhbCByZW1vdmFsICovXFxuLmZvcm1fcmVtb3ZhbCB7XFxuICAgIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbi5mb3JtX3JlbW92YWwgPiBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAwLjVyZW07XFxufVxcblxcbi5pdGVtX2Zvcl9yZW1vdmFsIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5mb3JtX2J1dHRvbnMgPiBidXR0b25bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwMCwgMCwgMCwgMC42KTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBzdHlsZXMgZm9yIGxpc3Qgb2YgcHJvamVjdHMgb24gdGhlIGNvbnRlbnQgc2VjdGlvbiAqL1xuLnByb2plY3RzID46bGFzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQgMWZyO1xufVxuXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLnByb2plY3RzID46bGFzdC1jaGlsZCA+IC5uYXZfcHJvamVjdHMgPiAuYnRuX2FkZF9wcm9qZWN0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSx1REFBdUQ7QUFDdkQ7SUFDSSxhQUFhO0lBQ2IsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG9DQUFvQztJQUNwQyxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2Ysd0NBQXdDO0lBQ3hDLG1DQUFtQztBQUN2Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBzdHlsZXMgZm9yIGxpc3Qgb2YgcHJvamVjdHMgb24gdGhlIGNvbnRlbnQgc2VjdGlvbiAqL1xcbi5wcm9qZWN0cyA+Omxhc3QtY2hpbGQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLWF1dG8tcm93czogbWluLWNvbnRlbnQgMWZyO1xcbn1cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XFxuICAgIGp1c3RpZnktc2VsZjogZW5kO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4ucHJvamVjdHMgPjpsYXN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyA+IC5idG5fYWRkX3Byb2plY3Qge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktaXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcXG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2Zvcm1fcHJvamVjdCA+ICNmb3JtIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICByb3ctZ2FwOiAwLjVyZW07XG59XG5cbiNmb3JtX3Byb2plY3QgPiAjZm9ybSA+IC5mb3JtX2l0ZW0gPiBsYWJlbCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3Byb2plY3RzX2Zvcm0uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjZm9ybV9wcm9qZWN0ID4gI2Zvcm0ge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAwLjVyZW07XFxufVxcblxcbiNmb3JtX3Byb2plY3QgPiAjZm9ybSA+IC5mb3JtX2l0ZW0gPiBsYWJlbCB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5wcm9qZWN0c19saXN0ID4gKiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcm93LWdhcDogMC41cmVtO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aG92ZXIsXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSksXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpoYXMoPiBhLmFjdGl2ZSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aG92ZXIgc3Bhbixcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhhcyg+IGEuYWN0aXZlKTpob3ZlciBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaSA+IHNwYW4sXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaTpoYXMoPiBhLmFjdGl2ZSkgPiBzcGFuIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XG59XG5cbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3QgPiBzcGFuIHtcbiAgICBmbGV4OiAxO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gZGl2ID4gLmJ0bl9hZGRfcHJvamVjdCxcbi5idG5fZGVsZXRlX3Byb2plY3Qge1xuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi1uby10ZXh0LXBhZGRpbmcpO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtBQUN2Qjs7QUFFQTs7O0lBR0ksb0NBQW9DO0lBQ3BDLGlCQUFpQjtBQUNyQjs7QUFFQTs7SUFFSSxtQkFBbUI7QUFDdkI7O0FBRUE7O0lBRUksa0JBQWtCO0lBQ2xCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLHdDQUF3QztBQUM1Qzs7QUFFQTtJQUNJLE9BQU87QUFDWDs7QUFFQTs7SUFFSSxzQ0FBc0M7QUFDMUNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnByb2plY3RzX2xpc3QgPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcm93LWdhcDogMC41cmVtO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aG92ZXIsXFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpLFxcbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkOmhhcyg+IGEuYWN0aXZlKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+IGxpOmhvdmVyIHNwYW4sXFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpOmhvdmVyIHNwYW4ge1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiBsaSA+IHNwYW4sXFxuLnByb2plY3RzX2xpc3QgPiAqID4gbGk6aGFzKD4gYS5hY3RpdmUpID4gc3BhbiB7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XFxufVxcblxcbi5wcm9qZWN0c19saXN0ID4gKiA+ICogPiAubmF2X3Byb2plY3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4OiAxO1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xcbn1cXG5cXG4ucHJvamVjdHNfbGlzdCA+ICogPiAqID4gLm5hdl9wcm9qZWN0ID4gc3BhbiB7XFxuICAgIGZsZXg6IDE7XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPiBkaXYgPiAuYnRuX2FkZF9wcm9qZWN0LFxcbi5idG5fZGVsZXRlX3Byb2plY3Qge1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24tbm8tdGV4dC1wYWRkaW5nKTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjc2lkZWJhciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbiNzaWRlYmFyLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIHRyYW5zaXRpb246IGFsbCAzMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI3NpZGViYXIuc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBlYXNlLWluLW91dDtcbn1cblxuI3NpZGViYXIgPiAuY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHJvdy1nYXA6IDFyZW07XG4gICAgcGFkZGluZzogMS4yNXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtc2Vjb25kYXJ5KTtcbiAgICBib3gtc2hhZG93OiAxcHggNHB4IDVweCAtMXB4IHJnYmEoMCwgMCwgMCwgMSk7XG4gICAgd2lkdGg6IG1pbig3NSUsIDM1MHB4KTtcbn1cblxuLm5hdl9wcm9qZWN0LFxuLm5hdl9wcm9qZWN0cyB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkID4gLm5hdl9wcm9qZWN0cyB7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID46Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4jc2lkZWJhciA+IC5jb250YWluZXI6aG92ZXIgLmJ0bl9hZGRfcHJvamVjdCB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xufVxuXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZCA+IC5idG5fYWRkX3Byb2plY3Qge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xuICAgICNzaWRlYmFyIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcbiAgICAgICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgfVxuXG4gICAgI3NpZGViYXIuc2hvdyB7XG4gICAgICAgIHdpZHRoOiBtaW4oNDAlLCAzNTBweCk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBhbmltYXRpb246IHNsaWRlLWluLXJpZ2h0IDMwMG1zIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICAgICNzaWRlYmFyLmhpZGUge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgICNzaWRlYmFyID4gLmNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3gtc2hhZG93OiAxcHggNHB4IDVweCAtMXB4IHJnYmEoMCwgMCwgMCwgMSk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlLWluLXJpZ2h0IHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zaWRlYmFyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsdUNBQXVDO0FBQzNDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQix5Q0FBeUM7SUFDekMsNkNBQTZDO0lBQzdDLHNCQUFzQjtBQUMxQjs7QUFFQTs7SUFFSSxxQkFBcUI7SUFDckIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLE9BQU87SUFDUCx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxzQkFBc0I7UUFDdEIsY0FBYztRQUNkLDJDQUEyQztJQUMvQzs7SUFFQTtRQUNJLGFBQWE7SUFDakI7O0lBRUE7UUFDSSxXQUFXO1FBQ1gsNkNBQTZDO0lBQ2pEO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLDRCQUE0QjtJQUNoQzs7SUFFQTtRQUNJLHlCQUF5QjtJQUM3QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNzaWRlYmFyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgei1pbmRleDogOTk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4jc2lkZWJhci5oaWRlIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNzaWRlYmFyLnNob3cge1xcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNzaWRlYmFyID4gLmNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMXJlbTtcXG4gICAgcGFkZGluZzogMS4yNXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXNlY29uZGFyeSk7XFxuICAgIGJveC1zaGFkb3c6IDFweCA0cHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAxKTtcXG4gICAgd2lkdGg6IG1pbig3NSUsIDM1MHB4KTtcXG59XFxuXFxuLm5hdl9wcm9qZWN0LFxcbi5uYXZfcHJvamVjdHMge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbHVtbi1nYXA6IDAuNzVyZW07XFxufVxcblxcbiNwcm9qZWN0c19jb250YWluZXIgPiAqOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAubmF2X3Byb2plY3RzIHtcXG4gICAgZmxleDogMTtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+OmZpcnN0LWNoaWxkIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMC43NXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4jcHJvamVjdHNfY29udGFpbmVyID4gKjpmaXJzdC1jaGlsZDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiNzaWRlYmFyID4gLmNvbnRhaW5lcjpob3ZlciAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcXG59XFxuXFxuI3Byb2plY3RzX2NvbnRhaW5lciA+ICo6Zmlyc3QtY2hpbGQgPiAuYnRuX2FkZF9wcm9qZWN0IHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xcbiAgICAjc2lkZWJhciB7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIHdpZHRoOiBpbmhlcml0O1xcbiAgICB9XFxuXFxuICAgICNzaWRlYmFyLnNob3cge1xcbiAgICAgICAgd2lkdGg6IG1pbig0MCUsIDM1MHB4KTtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZS1pbi1yaWdodCAzMDBtcyBlYXNlLWluLW91dDtcXG4gICAgfVxcblxcbiAgICAjc2lkZWJhci5oaWRlIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgI3NpZGViYXIgPiAuY29udGFpbmVyIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDRweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDEpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgc2xpZGUtaW4tcmlnaHQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjZm9ybV90YXNrOjpiYWNrZHJvcCAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuI2Zvcm1fdGFzayA+IC5mb3JtIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xufVxuXG4jZm9ybV90YXNrID4gLmZvcm0gPiBkaXYsXG4uZm9ybV90YXNrID4gZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcm93LWdhcDogMC41cmVtO1xufVxuXG4uZm9ybV9pdGVtID4gI2Rlc2NyaXB0aW9uIHtcbiAgICByZXNpemU6IHZlcnRpY2FsO1xuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSxcbi5mb3JtX2l0ZW0gPiAjYnRuX3Byb2plY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwKTtcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xufVxuXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSA+IC50YXNrX3ByaW9yaXR5LFxuLmZvcm1faXRlbSA+ICNidG5fcHJvamVjdCA+IC50YXNrX3Byb2plY3Qge1xuICAgIGZsZXg6IDE7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmZvcm1faXRlbSA+ICNidG5fcHJpb3JpdHk6aG92ZXIgLmltZ193cmFwcGVyX2NoZXZyb24ge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5ID4gLmltZ193cmFwcGVyX2NoZXZyb24ge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmZvcm1faXRlbSA+ICNwcm9qZWN0IHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb24teDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDUwJTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFza3NfZm9ybS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBOztJQUVJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiw2QkFBNkI7SUFDN0Isd0NBQXdDO0FBQzVDOztBQUVBOztJQUVJLE9BQU87SUFDUCxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2Qix5REFBeUQ7SUFDekQsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQiwwQkFBMEI7QUFDOUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2Zvcm1fdGFzazo6YmFja2Ryb3AgIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG5cXG4jZm9ybV90YXNrID4gLmZvcm0ge1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4jZm9ybV90YXNrID4gLmZvcm0gPiBkaXYsXFxuLmZvcm1fdGFzayA+IGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLmZvcm1faXRlbSA+ICNkZXNjcmlwdGlvbiB7XFxuICAgIHJlc2l6ZTogdmVydGljYWw7XFxuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eSxcXG4uZm9ybV9pdGVtID4gI2J0bl9wcm9qZWN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcCk7XFxuICAgIHBhZGRpbmc6IHZhcigtLWJ1dHRvbi13aXRoLXRleHQtcGFkZGluZyk7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5ID4gLnRhc2tfcHJpb3JpdHksXFxuLmZvcm1faXRlbSA+ICNidG5fcHJvamVjdCA+IC50YXNrX3Byb2plY3Qge1xcbiAgICBmbGV4OiAxO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG4uZm9ybV9pdGVtID4gI2J0bl9wcmlvcml0eTpob3ZlciAuaW1nX3dyYXBwZXJfY2hldnJvbiB7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjYnRuX3ByaW9yaXR5ID4gLmltZ193cmFwcGVyX2NoZXZyb24ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5mb3JtX2l0ZW0gPiAjcHJvamVjdCB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2ZycpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogNTAlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC50YXNrc19saXN0IHtcbiAgICBtYXJnaW4tdG9wOiAxcmVtXG59XG5cbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkIHtcbiAgICByb3ctZ2FwOiAxcmVtO1xufVxuXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXg6IDE7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQgPiBkaXYgPiAuZm9ybV90YXNrIHtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtXG59XG5cbmRpdltyb2xlPWJ1dHRvbl0udGFza19uZXcge1xuICAgIGFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xufVxuXG5kaXZbcm9sZT1idXR0b25dIHtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg2NiwgNjYsIDY2LCAwLjUpO1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuZGl2W3JvbGU9YnV0dG9uXTpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJveC1zaGFkb3c6IDAgMCA5cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgYm9yZGVyLXJhZGl1czogMC40NXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwYWRkaW5nOiAxcmVtIDAuMjVyZW07XG4gICAgY29sdW1uLWdhcDogMC43NXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtID4gLmNvbnRhaW5lciA+IC5idG5fY2hlY2tib3hfdGFzayB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbn1cblxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXI6IDNweCBzb2xpZDtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcbn1cblxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgb3BhY2l0eTogMDtcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XG59XG5cbi50YXNrX2xpc3RfaXRlbSA+IC5jb250YWluZXIgPiAuYnRuX2NoZWNrYm94X3Rhc2s6aG92ZXIgPi5jaGVja2JveF9jaXJjbGUgPiBzdmcge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyNSUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8xIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMS1jb2xvcik7XG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XG59XG5cbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMiB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTItY29sb3IpO1xuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xufVxuXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzMge1xuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0zLWNvbG9yKTtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV80IHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xufVxuXG4udGFza19saXN0X2l0ZW1fY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcm93LWdhcDogMC4zNXJlbTtcbn1cblxuLnRhc2tfbGlzdF9pdGVtX2NvbnRlbnQgPiAudGFza19uYW1lIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbmRpdltyb2xlPWJ1dHRvbl06aG92ZXIgLnRhc2tfYWN0aW9uc3tcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4udGFza19hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLnRhc2tfYWN0aW9ucyA+IGJ1dHRvbiB7XG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZyk7XG59XG5cbi50YXNrX2FjdGlvbnMgPiBidXR0b24gPiBzdmcge1xuICAgIHdpZHRoOiBjbGFtcCgxLjVyZW0sIDN2dywgMnJlbSk7XG59XG5cbi5idG5fZGF0ZV90YXNrIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xufVxuXG4uYnRuX2RhdGVfdGFzayA+IHNwYW4ge1xuICAgIHdvcmQtc3BhY2luZzogMC4xNXJlbTtcbn1cblxubGkgPiAuYnRuX2FkZF90YXNrIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLXdpdGgtdGV4dC1wYWRkaW5nKTtcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcbn1cblxubGkgPiBidXR0b24uYnRuX2FkZF90YXNrOmhvdmVyID4gZGl2IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XG59XG5cbmxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzazpob3ZlciA+IHNwYW4ge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbkBrZXlmcmFtZXMgZmFkZS1pbi1zY2FsZSB7XG4gICAgMCUge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvdGFza3NfbGlzdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsT0FBTztJQUNQLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxhQUFhO0lBQ2IsMkNBQTJDO0lBQzNDO0FBQ0o7O0FBRUE7SUFDSSxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSw4Q0FBOEM7SUFDOUMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7SUFDZiwyQ0FBMkM7SUFDM0Msc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGNBQWM7SUFDZCxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLFVBQVU7SUFDVixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0lBQzlCLG1FQUFtRTtBQUN2RTs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5Qiw4QkFBOEI7SUFDOUIsbUVBQW1FO0FBQ3ZFOztBQUVBO0lBQ0ksOEJBQThCO0lBQzlCLDhCQUE4QjtJQUM5QixtRUFBbUU7QUFDdkU7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksT0FBTztJQUNQLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsd0NBQXdDO0lBQ3hDLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QyxnQ0FBZ0M7SUFDaEMsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtRQUNWLG1CQUFtQjtJQUN2Qjs7SUFFQTtRQUNJLFVBQVU7UUFDVixtQkFBbUI7SUFDdkI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIudGFza3NfbGlzdCB7XFxuICAgIG1hcmdpbi10b3A6IDFyZW1cXG59XFxuXFxuLnRhc2tzX2xpc3QgPiA6Zmlyc3QtY2hpbGQge1xcbiAgICByb3ctZ2FwOiAxcmVtO1xcbn1cXG5cXG4udGFza3NfbGlzdCA+IDpmaXJzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXg6IDE7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi50YXNrc19saXN0ID4gOmZpcnN0LWNoaWxkID4gZGl2ID4gLmZvcm1fdGFzayB7XFxuICAgIG1hcmdpbjogMXJlbSAwO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW1cXG59XFxuXFxuZGl2W3JvbGU9YnV0dG9uXS50YXNrX25ldyB7XFxuICAgIGFuaW1hdGlvbjogZmFkZS1pbi1zY2FsZSAyMDBtcyBlYXNlLWluO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoNjYsIDY2LCA2NiwgMC41KTtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3gtc2hhZG93OiAwIDAgOXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjQ1cmVtO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogMXJlbSAwLjI1cmVtO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjc1cmVtO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uYnRuX2NoZWNrYm94X3Rhc2sgPiAuY2hlY2tib3hfY2lyY2xlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyOiAzcHggc29saWQ7XFxuICAgIGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jaXJjbGUtcmFkaXVzKTtcXG59XFxuXFxuLmJ0bl9jaGVja2JveF90YXNrID4gLmNoZWNrYm94X2NpcmNsZSA+IHN2ZyB7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XFxuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNpcmNsZS1yYWRpdXMpO1xcbn1cXG5cXG4udGFza19saXN0X2l0ZW0gPiAuY29udGFpbmVyID4gLmJ0bl9jaGVja2JveF90YXNrOmhvdmVyID4uY2hlY2tib3hfY2lyY2xlID4gc3ZnIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyNSUsIHRyYW5zcGFyZW50KTtcXG59XFxuXFxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV8xIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTEtY29sb3IpO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCBjdXJyZW50Q29sb3IgMjAlLCB0cmFuc3BhcmVudCk7XFxufVxcblxcbi5jaGVja2JveF9jaXJjbGUucHJpb3JpdHlfMiB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0yLWNvbG9yKTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgY3VycmVudENvbG9yO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoaW4gc3JnYiwgY3VycmVudENvbG9yIDIwJSwgdHJhbnNwYXJlbnQpO1xcbn1cXG5cXG4uY2hlY2tib3hfY2lyY2xlLnByaW9yaXR5XzMge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMy1jb2xvcik7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIGN1cnJlbnRDb2xvcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIGN1cnJlbnRDb2xvciAyMCUsIHRyYW5zcGFyZW50KTtcXG59XFxuXFxuLmNoZWNrYm94X2NpcmNsZS5wcmlvcml0eV80IHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTQtY29sb3IpO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCBjdXJyZW50Q29sb3I7XFxufVxcblxcbi50YXNrX2xpc3RfaXRlbV9jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcm93LWdhcDogMC4zNXJlbTtcXG59XFxuXFxuLnRhc2tfbGlzdF9pdGVtX2NvbnRlbnQgPiAudGFza19uYW1lIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG5kaXZbcm9sZT1idXR0b25dOmhvdmVyIC50YXNrX2FjdGlvbnN7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi50YXNrX2FjdGlvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4udGFza19hY3Rpb25zID4gYnV0dG9uIHtcXG4gICAgcGFkZGluZzogdmFyKC0tYnV0dG9uLW5vLXRleHQtcGFkZGluZyk7XFxufVxcblxcbi50YXNrX2FjdGlvbnMgPiBidXR0b24gPiBzdmcge1xcbiAgICB3aWR0aDogY2xhbXAoMS41cmVtLCAzdncsIDJyZW0pO1xcbn1cXG5cXG4uYnRuX2RhdGVfdGFzayB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcXG59XFxuXFxuLmJ0bl9kYXRlX3Rhc2sgPiBzcGFuIHtcXG4gICAgd29yZC1zcGFjaW5nOiAwLjE1cmVtO1xcbn1cXG5cXG5saSA+IC5idG5fYWRkX3Rhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiB2YXIoLS1idXR0b24td2l0aC10ZXh0LXBhZGRpbmcpO1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG59XFxuXFxubGkgPiBidXR0b24uYnRuX2FkZF90YXNrOmhvdmVyID4gZGl2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcXG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2lyY2xlLXJhZGl1cyk7XFxufVxcblxcbmxpID4gYnV0dG9uLmJ0bl9hZGRfdGFzazpob3ZlciA+IHNwYW4ge1xcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuQGtleWZyYW1lcyBmYWRlLWluLXNjYWxlIHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIHN0eWxlcyBmb3IgcHJpb3JpdHkgb3B0aW9ucyBmcm9tIHRhc2tzX3ByaW9yaXR5LmpzIG1vZHVsZSAqL1xuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9uczo6YmFja2Ryb3AsXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9uczo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyxcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMge1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNnB4IC0ycHggcmdiKDAsIDAsIDApO1xufVxuXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpLFxuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sdW1uLWdhcDogdmFyKC0tY29sdW1uLWdhcC1zbWFsbCk7XG4gICAgcGFkZGluZzogMC41cmVtO1xufVxuXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpOmhvdmVyLFxuI3Rhc2tfc2VsZWN0X3Byb2plY3Rfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gICAgcGFkZGluZzogMC44cmVtO1xufVxuXG4vKiB0YXNrIHByaW9yaXRpZXMgKi9cbi5wcmlvcml0eV8xIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMS1jb2xvcik7XG59XG5cbi5wcmlvcml0eV8yIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XG59XG5cbi5wcmlvcml0eV8zIHtcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMy1jb2xvcik7XG59XG5cbi5wcmlvcml0eV80ICB7XG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTQtY29sb3IpO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy90YXNrc19vcHRpb25zLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw4REFBOEQ7QUFDOUQ7O0lBRUksNkJBQTZCO0FBQ2pDOztBQUVBOztJQUVJLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1oseUNBQXlDO0FBQzdDOztBQUVBOztJQUVJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUNBQW1DO0lBQ25DLGVBQWU7QUFDbkI7O0FBRUE7O0lBRUksb0NBQW9DO0lBQ3BDLGVBQWU7QUFDbkI7O0FBRUEsb0JBQW9CO0FBQ3BCO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHN0eWxlcyBmb3IgcHJpb3JpdHkgb3B0aW9ucyBmcm9tIHRhc2tzX3ByaW9yaXR5LmpzIG1vZHVsZSAqL1xcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnM6OmJhY2tkcm9wLFxcbiN0YXNrX3NlbGVjdF9wcmlvcml0eV9vcHRpb25zOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyxcXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDZweCAtMnB4IHJnYigwLCAwLCAwKTtcXG59XFxuXFxuI3Rhc2tfc2VsZWN0X3ByaW9yaXR5X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaSxcXG4jdGFza19zZWxlY3RfcHJvamVjdF9vcHRpb25zID4gLmNvbnRhaW5lciA+IHVsID4gbGkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiB2YXIoLS1jb2x1bW4tZ2FwLXNtYWxsKTtcXG4gICAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jdGFza19zZWxlY3RfcHJpb3JpdHlfb3B0aW9ucyA+IC5jb250YWluZXIgPiB1bCA+IGxpOmhvdmVyLFxcbiN0YXNrX3NlbGVjdF9wcm9qZWN0X29wdGlvbnMgPiAuY29udGFpbmVyID4gdWwgPiBsaTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgcGFkZGluZzogMC44cmVtO1xcbn1cXG5cXG4vKiB0YXNrIHByaW9yaXRpZXMgKi9cXG4ucHJpb3JpdHlfMSB7XFxuICAgIGNvbG9yOiB2YXIoLS1wcmlvcml0eS0xLWNvbG9yKTtcXG59XFxuXFxuLnByaW9yaXR5XzIge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktMi1jb2xvcik7XFxufVxcblxcbi5wcmlvcml0eV8zIHtcXG4gICAgY29sb3I6IHZhcigtLXByaW9yaXR5LTMtY29sb3IpO1xcbn1cXG5cXG4ucHJpb3JpdHlfNCAge1xcbiAgICBjb2xvcjogdmFyKC0tcHJpb3JpdHktNC1jb2xvcik7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hlYWRlci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbW9kYWxfcmVtb3ZhbC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21vZGFsX3JlbW92YWwuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Byb2plY3RzX2Zvcm0uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19mb3JtLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcm9qZWN0c19saXN0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvamVjdHNfbGlzdC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2lkZWJhci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpZGViYXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX2Zvcm0uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19mb3JtLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90YXNrc19saXN0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3NfbGlzdC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGFza3Nfb3B0aW9ucy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rhc2tzX29wdGlvbnMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgYnVpbGRIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcic7XG5pbXBvcnQgYnVpbGRTaWRlQmFyIGZyb20gJy4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXInO1xuaW1wb3J0IGJ1aWxkTWFpbiBmcm9tICcuL2NvbXBvbmVudHMvbWFpbic7XG5pbXBvcnQgeyBzZXRQcm9qZWN0cyB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlJztcbmltcG9ydCBidWlsZE92ZXJsYXkgZnJvbSAnLi9jb21wb25lbnRzL292ZXJsYXknO1xuaW1wb3J0IFNWR0luamVjdCBmcm9tICdAaWNvbmZ1L3N2Zy1pbmplY3QnXG4vLyBTVkdJbmplY3Rcbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL0BpY29uZnUvc3ZnLWluamVjdFxuXG5pbXBvcnQgJy4vYXBwLmNzcyc7XG5cbmNvbnN0IGFwcENvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYnVpbGQgPSB7XG4gICAgICAgIGhlYWRlcjogYnVpbGRIZWFkZXIsXG4gICAgICAgIHNpZGViYXI6IGJ1aWxkU2lkZUJhcixcbiAgICAgICAgb3ZlcmxheTogYnVpbGRPdmVybGF5LFxuICAgICAgICBtYWluOiBidWlsZE1haW4sXG4gICAgfVxuXG4gICAgY29uc3QgYXBwID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFByb2plY3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFwcFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGFwcENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFwcFdyYXBwZXIuaWQgPSAndG9kb19hcHAnO1xuICAgICAgICAgICAgYXBwQ29udGVudC5pZCA9ICdjb250ZW50JztcblxuICAgICAgICAgICAgYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidWlsZC5oZWFkZXIoKSk7XG4gICAgICAgICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLm92ZXJsYXkoKSk7XG4gICAgICAgICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLnNpZGViYXIoKSk7XG4gICAgICAgICAgICBhcHBDb250ZW50LmFwcGVuZENoaWxkKGJ1aWxkLm1haW4oKSk7XG4gICAgICAgICAgICBhcHBXcmFwcGVyLmFwcGVuZENoaWxkKGFwcENvbnRlbnQpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcFdyYXBwZXIpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9LFxuICAgIH1cblxuICAgIGFwcC5pbml0KCk7XG59KSgpOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hZGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2FkZC5zdmdcIixcblx0XCIuL2NoZWNrX3NtYWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmdcIixcblx0XCIuL2NoZXZyb25fZG93bi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vY2lyY2xlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NvZy5zdmdcIixcblx0XCIuL2RhdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RhdGUuc3ZnXCIsXG5cdFwiLi9kZWxldGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIixcblx0XCIuL2VkaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCIsXG5cdFwiLi9mbGFnLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9mbGFnLnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLXdoaXRlLnN2Z1wiLFxuXHRcIi4vZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmsuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2dpdGh1Yi1tYXJrL2dpdGh1Yi1tYXJrLnN2Z1wiLFxuXHRcIi4vaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaG9tZS5zdmdcIixcblx0XCIuL2luYm94LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIixcblx0XCIuL21hZ25pZnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21hZ25pZnkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIixcblx0XCIuL3RvZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgcmVjdXJzaXZlIFxcXFwuc3ZnJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hZGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2FkZC5zdmdcIixcblx0XCIuL2NoZWNrX3NtYWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmdcIixcblx0XCIuL2NoZXZyb25fZG93bi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvY2hldnJvbl9kb3duLnN2Z1wiLFxuXHRcIi4vY2hldnJvbl9sZWZ0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2xlZnQuc3ZnXCIsXG5cdFwiLi9jaGV2cm9uX3JpZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaGV2cm9uX3JpZ2h0LnN2Z1wiLFxuXHRcIi4vY2lyY2xlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2NvZy5zdmdcIixcblx0XCIuL2RhdGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RhdGUuc3ZnXCIsXG5cdFwiLi9kZWxldGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIixcblx0XCIuL2VkaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2VkaXQuc3ZnXCIsXG5cdFwiLi9mbGFnLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9mbGFnLnN2Z1wiLFxuXHRcIi4vaG9tZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvaG9tZS5zdmdcIixcblx0XCIuL2luYm94LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9pbmJveC5zdmdcIixcblx0XCIuL21hZ25pZnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL21hZ25pZnkuc3ZnXCIsXG5cdFwiLi9tZW51LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9tZW51LnN2Z1wiLFxuXHRcIi4vcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvcmFkaW9fYnV0dG9uX3VuY2hlY2tlZC5zdmdcIixcblx0XCIuL3RvZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy90b2RheS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zIHN5bmMgXFxcXC5zdmckXCI7IiwiICAgIGltcG9ydCBJY29uQWRkIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9hZGQuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkRlbGV0ZSBmcm9tICcuLi9hc3NldHMvaWNvbnMvZGVsZXRlLnN2Zyc7XG4gICAgaW1wb3J0IEljb25FZGl0IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9lZGl0LnN2Zyc7XG4gICAgaW1wb3J0IEljb25DaXJjbGUgZnJvbSAnLi4vYXNzZXRzL2ljb25zL3JhZGlvX2J1dHRvbl91bmNoZWNrZWQuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkRhdGUgZnJvbSAnLi4vYXNzZXRzL2ljb25zL2RhdGUuc3ZnJztcbiAgICBpbXBvcnQgSWNvbkNoZWNrIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaGVja19zbWFsbC5zdmcnO1xuICAgIGNvbnN0IGljb25zID0geyBcbiAgICAgICAgYWRkOiBJY29uQWRkLFxuICAgICAgICBkZWxldGU6IEljb25EZWxldGUsXG4gICAgICAgIGVkaXQ6IEljb25FZGl0LFxuICAgICAgICBjaXJjbGU6IEljb25DaXJjbGUsXG4gICAgICAgIGNoZWNrYm94OiBJY29uQ2hlY2ssXG4gICAgICAgIGRhdGU6IEljb25EYXRlLFxuICAgIH07XG5cbiAgICBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEJ1dHRvbih0eXBlLCBuYW1lLCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksIGJ1dHRvbkF0dHJpYnV0ZXModHlwZSwgbmFtZSkpOyAgICBcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaWNvbnNbdHlwZV07XG4gICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuICAgIFxuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnYnRuX2ltZ193cmFwcGVyJyk7XG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGltYWdlV3JhcHBlcik7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjaGVja2JveEJvcmRlci5jbGFzc0xpc3QuYWRkKCdjaGVja2JveF9jaXJjbGUnKTtcbiAgICAgICAgICAgIGNoZWNrYm94Qm9yZGVyLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChjaGVja2JveEJvcmRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGJ1dHRvbkF0dHJpYnV0ZXMgPSAodHlwZSwgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSB7XG4gICAgICAgICAgICAvLyBjbGFzc05hbWU6IGJ0bl9kZWxldGVfcHJvamVjdFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBgYnRuXyR7dHlwZX1fJHtuYW1lfWAsXG4gICAgICAgICAgICB0eXBlOiBgYnV0dG9uYCxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH0iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uL3V0aWxpdGllcy9pbXBvcnQtYWxsJztcbmltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJzsgLy8gY29ubmVjdCAuYnRuX2hvbWUgdG8gbWFpbkNvbnRlbnQuc3dpdGNoQ29udGVudFxuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfZm9ybSc7XG5pbXBvcnQgJy4uL3N0eWxlcy9oZWFkZXIuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRIZWFkZXIoYXBwLCBjb250ZW50KSB7XG4gICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyLnJlbmRlcigpKTtcbiAgICBoZWFkZXIuY2FjaGVET00oaGVhZGVyRWxlbWVudCk7XG4gICAgaGVhZGVyLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gaGVhZGVyRWxlbWVudDtcbn1cblxuY29uc3QgYXNzZXRzID0ge1xuICAgIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi9hc3NldHMvaWNvbnMnLCB0cnVlLCAvXFwuc3ZnJC8pKSxcbn1cblxuY29uc3QgaGVhZGVyID0ge1xuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5idG5NZW51ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5idG5fbWVudScpO1xuICAgICAgICB0aGlzLmJ0bkhvbWUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9ob21lJyk7XG4gICAgICAgIHRoaXMuYnRuQWRkVGFzayA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF90YXNrJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wdWJsaXNoKTtcbiAgICAgICAgdGhpcy5idG5Ib21lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wdWJsaXNoKTtcbiAgICAgICAgdGhpcy5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRUYXNrc0Zvcm0pO1xuICAgIH0sXG4gICAgaGVhZGVyQ29udGVudDoge1xuICAgICAgICBoZWFkZXJMZWZ0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fbWVudScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQ6ICdpbWcnLFxuICAgICAgICAgICAgICAgIHNyYzogYXNzZXRzLmljb25zLmZpbGVzWydtZW51LnN2ZyddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9ob21lJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ2hvbWUuc3ZnJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpbnB1dF9zZWFyY2gnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWFyY2gnLFxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBoZWFkZXJSaWdodDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX2FkZF90YXNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgc3JjOiBhc3NldHMuaWNvbnMuZmlsZXNbJ2FkZC5zdmcnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHtlbGVtZW50OiAnYnV0dG9uJywgY2xhc3M6ICdidC1zZXR0aW5nc24nLCBjaGlsZEVsZW1lbnQ6ICdpbWcsIHNyYzogbnVsbH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2EnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZ2l0aHViJyxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9taWtleUNvcy90aGVPZGluUHJvamVjdC90cmVlL21haW4vamF2YVNjcmlwdC9wcm9qZWN0cy90b2RvLWxpc3QnLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50OiAnaW1nJyxcbiAgICAgICAgICAgICAgICBzcmM6IGFzc2V0cy5pY29ucy5maWxlc1snZ2l0aHViLW1hcmsvZ2l0aHViLW1hcmstd2hpdGUuc3ZnJ10sXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuaWQgPSAnbmF2YmFyJztcblxuICAgICAgICBmb3IgKGxldCBzZWN0aW9uIGluIHRoaXMuaGVhZGVyQ29udGVudCkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsZXQgd3JhcHBlckNsYXNzO1xuICAgICAgICAgICAgc2VjdGlvbiA9PT0gJ2hlYWRlckxlZnQnID8gd3JhcHBlckNsYXNzID0gJ25hdl9sZWZ0JyA6IHdyYXBwZXJDbGFzcyA9ICduYXZfcmlnaHQnO1xuICAgICAgICAgICAgaGVhZGVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKHdyYXBwZXJDbGFzcyk7XG4gICAgICAgICAgICBoZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyQ29udGVudFtzZWN0aW9uXS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGhlYWRlckl0ZW0sIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgaWYgKCdwbGFjZWhvbGRlcicgaW4gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJJdGVtLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBpdGVtLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5jaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtSWNvbi5zcmMgPSBpdGVtLnNyYztcbiAgICAgICAgICAgICAgICAgICAgaXRlbUljb24uc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoZWFkZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVySXRlbSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXJDb250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlcldyYXBwZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50O1xuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gZS5jdXJyZW50VGFyZ2V0LmNsYXNzTmFtZTtcbiAgICAgICAgbGV0IHN1YnNjcmliZXI7XG4gICAgICAgIGlmIChjbGFzc05hbWUuaW5jbHVkZXMoJ2hvbWUnKSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlciA9ICdjb250ZW50JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIgPSAnc2lkZWJhcidcbiAgICAgICAgfVxuICAgICAgICBwdWJTdWIucHVibGlzaChzdWJzY3JpYmVyLCBlLmN1cnJlbnRUYXJnZXQpO1xuICAgIH1cbn0iLCJpbXBvcnQgYnVpbGRQcm9qZWN0cyBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RzJztcbmltcG9ydCBidWlsZFByb2plY3RUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL3Byb2plY3RfdGFza3MnO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWFpbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgIG1haW4uaWQgPSAnbWFpbl9jb250ZW50JztcbiAgICBtYWluQ29udGVudC5jYWNoZURPTShtYWluKTtcbiAgICBtYWluQ29udGVudC5yZW5kZXIoKTtcbiAgICBtYWluQ29udGVudC5iaW5kRXZlbnRzKCk7XG5cbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdjb250ZW50JywgbWFpbkNvbnRlbnQuc3dpdGNoQ29udGVudCk7XG5cbiAgICByZXR1cm4gbWFpbjtcbn1cblxuY29uc3QgYnVpbGQgPSB7XG4gICAgcHJvamVjdHM6IGJ1aWxkUHJvamVjdHMsXG4gICAgcHJvamVjdDogYnVpbGRQcm9qZWN0VGFza3MsXG59XG5cbmV4cG9ydCBjb25zdCBtYWluQ29udGVudCA9IHtcbiAgICBhY3RpdmVDb250ZW50OiBudWxsLFxuICAgIGFjdGl2ZVRhYjogbnVsbCxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMubWFpbiA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5tYWluT3ZlcmxheSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheV9tYWluX2NvbnRlbnQnKTtcbiAgICAgICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbihrZXksIHV1aWQpIHtcbiAgICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBjb250ZW50ID0gYnVpbGRbJ3Byb2plY3QnXShwcm9qZWN0Q29udHJvbGxlci50b2RheVswXS51dWlkKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYWluLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBidWlsZFtrZXldKHV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlQ29udGVudChjb250ZW50KTtcbiAgICAgICAgdGhpcy5tYWluLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoQ29udGVudCA9IHRoaXMuc3dpdGNoQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIH0sXG4gICAgc3dpdGNoQ29udGVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlVGFiKCk7XG5cbiAgICAgICAgbGV0IGNsYXNzU3Vic3RyaW5nID0gZS5jbGFzc05hbWUuaW5jbHVkZXMoJ2RlbGV0ZScpID8gZS5jbGFzc05hbWUuc3Vic3RyaW5nKGUuY2xhc3NOYW1lLmluZGV4T2YoJ18nKSArIDEsIGUuY2xhc3NOYW1lLmxhc3RJbmRleE9mKCdfJykpIDogZS5jbGFzc05hbWUuc3Vic3RyaW5nKGUuY2xhc3NOYW1lLmxhc3RJbmRleE9mKCdfJykgKyAxKTtcbiAgICAgICAgbGV0IHV1aWQgPSBlLnBhcmVudEVsZW1lbnQuZGF0YXNldC51dWlkIHx8IGUuZGF0YXNldC5pbmJveFV1aWQ7XG4gICAgICAgIGxldCByZW5kZXJLZXkgPSBPYmplY3Qua2V5cyhidWlsZCkuZmluZChrZXkgPT4ga2V5ID09PSBjbGFzc1N1YnN0cmluZyk7XG4gICAgICAgIGxldCBhcmdzID0gWydwcm9qZWN0JywgdXVpZF07XG4gICAgICAgIGlmIChyZW5kZXJLZXkgJiYgdXVpZCkge1xuICAgICAgICAgICAgLy8gcmVuZGVycyByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKGUpO1xuICAgICAgICAgICAgYXJnc1swXSA9IHJlbmRlcktleTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVuZGVyS2V5ICYmICF1dWlkKSB7XG4gICAgICAgICAgICAvLyBpZiBob21lIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVycyB0aGUgdG9kYXkgc2VjdGlvblxuICAgICAgICAgICAgYXJnc1sxXSA9IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY2xhc3NTdWJzdHJpbmcgPT09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAvLyBpZiBhIHByb2plY3QgaXMgdGhlIGNvbnRlbnQgYW5kIGlzIGRlbGV0ZWQsXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVycyB0aGUgaW5ib3ggc2VjdGlvblxuICAgICAgICAgICAgYXJnc1sxXSA9IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYihlKTtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSAncHJvamVjdHMnO1xuICAgICAgICB9XG4gICAgICAgIG1haW5Db250ZW50LnJlbmRlcihhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICB9LFxuICAgIHNldEFjdGl2ZVRhYjogZnVuY3Rpb24odGFiKSB7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmVUYWIoKTtcbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBjb25zdCBzaWRlYmFyQW5jaG9yID0gWy4uLnRoaXMuYW5jaG9yc10uZmluZChhbmNob3IgPT4gYW5jaG9yLmhyZWYgPT09IHRhYi5ocmVmKTtcbiAgICAgICAgaWYgKHNpZGViYXJBbmNob3IpIHtcbiAgICAgICAgICAgIHNpZGViYXJBbmNob3IuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IFtzaWRlYmFyQW5jaG9yLCB0YWJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSBbdGFiXTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRBY3RpdmVUYWI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiLmZvckVhY2goYW5jaG9yID0+IGFuY2hvci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0QWN0aXZlQ29udGVudDogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5hY3RpdmVDb250ZW50ID0gY29udGVudDtcbiAgICB9LFxufSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCAnLi4vc3R5bGVzL21vZGFsX3JlbW92YWwuY3NzJ1xuXG4vLyBtaW1pY3MgYWxlcnQgYm94IGNvbmZpcm1pbmcgdGFzay9wcm9qZWN0IHJlbW92YWxcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTW9kYWxSZW1vdmUob2JqKSB7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICBkaWFsb2dFbGVtZW50LmlkID0gJ21vZGFsJztcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fcmVtb3ZhbCcpO1xuXG4gICAgY29uc3QgbW9kYWwgPSBidWlsZE1vZGFsKGRpYWxvZ0VsZW1lbnQsIGZvcm0sIG9iaik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtb2RhbC5yZW5kZXIoKSk7XG4gICAgbW9kYWwuY2FjaGVET00oKTtcbiAgICBtb2RhbC5iaW5kRXZlbnRzKCk7XG5cbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgZGlhbG9nRWxlbWVudC5zaG93TW9kYWwoKTtcbn1cblxuY29uc3QgYnVpbGRNb2RhbCA9IChkaWFsb2dFbGVtZW50LCBmb3JtLCBvYmopID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGRpYWxvZ0VsZW1lbnQsXG4gICAgICAgIGZvcm0sXG4gICAgICAgIHR5cGU6IG9iai50eXBlLFxuICAgICAgICBvYmosXG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBtb2RhbChzdGF0ZSksXG4gICAgKVxuXG59XG5cbmNvbnN0IG1vZGFsID0gKHN0YXRlKSA9PiAoe1xuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZ0VsZW1lbnQsXG4gICAgZm9ybTogc3RhdGUuZm9ybSxcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIHNlbGVjdGlvbjogc3RhdGUub2JqLFxuICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fY2FuY2VsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogJ2J1dHRvbicsXG4gICAgICAgICAgICB0ZXh0OiAnRGVsZXRlJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fc3VibWl0X3JlbW92ZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5idG5EZWxldGUgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bl9zdWJtaXRfcmVtb3ZlJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtID0gdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VGb3JtKTtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBpdGVtRm9yUmVtb3ZhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xuXG4gICAgICAgIGl0ZW1Gb3JSZW1vdmFsLmNsYXNzTGlzdC5hZGQoJ2l0ZW1fZm9yX3JlbW92YWwnKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0RlbGV0ZT8nO1xuICAgICAgICBpdGVtRm9yUmVtb3ZhbC50ZXh0Q29udGVudCA9IHRoaXMuc2VsZWN0aW9uLnRpdGxlID8gdGhpcy5zZWxlY3Rpb24udGl0bGUgOiB0aGlzLnNlbGVjdGlvbi5uYW1lO1xuICAgICAgICBjb25zdCBtZXNzYWdlQmVnaW5UZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGApO1xuICAgICAgICBjb25zdCBtZXNzYWdlRW5kVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgP2ApO1xuICAgICAgICBcbiAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChtZXNzYWdlQmVnaW5UZXh0Tm9kZSlcbiAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChpdGVtRm9yUmVtb3ZhbCk7XG4gICAgICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobWVzc2FnZUVuZFRleHROb2RlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICBjb25zdCBmb3JtQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtQnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdmb3JtX2J1dHRvbnMnKTtcbiAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS5lbGVtZW50KSwgaXRlbS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgIGZvcm1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQnV0dG9ucyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAndGFzaycpIHtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJywgdGhpcy5zZWxlY3Rpb24udXVpZFRhc2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcHViU3ViLnB1Ymxpc2goJ3JlbW92ZVByb2plY3QnLCB0aGlzLnNlbGVjdGlvbi51dWlkKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVQcm9qZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZUZvcm0oKTtcbiAgICB9LFxuICAgIGNsb3NlRm9ybTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuY2xvc2UoKVxuICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfSxcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ21vZGFsJykge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZU1vZGFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbn0pIiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSAnLi4vY29udGFpbmVycy9wdWJzdWInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE92ZXJsYXkoKSB7XG4gICAgcmV0dXJuIG92ZXJsYXkucmVuZGVyKCk7XG59XG5cbmNvbnN0IG92ZXJsYXkgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBjb250YWluZXI7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheV9tYWluX2NvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5jYWNoZURPTShvdmVybGF5KTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgcmV0dXJuIG92ZXJsYXk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaW1PdmVybGF5ID0gdGhpcy5kaW1PdmVybGF5LmJpbmQodGhpcyk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ2RpbScsIG92ZXJsYXkuZGltT3ZlcmxheSk7XG4gICAgXG4gICAgfSxcbiAgICBkaW1PdmVybGF5OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpIHx8IHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZGltJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdkaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG59IiwiaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9idXR0b25zJztcbmltcG9ydCBidWlsZFRhc2tzRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3Rhc2tzX2Zvcm0nO1xuaW1wb3J0IHsgdGFza3NMaXN0IH0gZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19saXN0JztcblxuLy8gcmVuZGVycyBhIHByb2plY3QncyBwYWdlIGFuZCBpdCdzIHRhc2tzXG4vLyB3aGVuIHdlIGFyZSBhdCBhIHByb2plY3QncyBwYWdlXG4gICAgLy8gd2UgZGVsZXRlIGl0IGZyb20gdGhlcmUgb3IgZnJvbSB0aGUgc2lkZWJhclxuICAgICAgICAvLyBjaGFuZ2UgY29udGVudCB0byBob21lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFByb2plY3RUYXNrcyh1dWlkKSB7XG4gICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWN0aXZlKHV1aWQpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0Q29udHJvbGxlci5maW5kKHV1aWQpO1xuICAgIHByb2plY3RUYXNrcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICBjb25zdCBjb250ZW50ID0gcHJvamVjdFRhc2tzLnJlbmRlcigpO1xuICAgIHByb2plY3RUYXNrcy5jYWNoZURPTShjb250ZW50KTtcbiAgICBwcm9qZWN0VGFza3MuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiBjb250ZW50O1xufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFRhc2tzID0ge1xuICAgIHByb2plY3Q6IG51bGwsXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnByb2plY3RUYXNrc0NvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgICAgICB0aGlzLnVsTGlzdCA9IHRoaXMucHJvamVjdFRhc2tzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50YXNrc19saXN0Jyk7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lciA9IHRoaXMudWxMaXN0LmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuYnRuQWRkVGFzayA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3IoJy5idG5fYWRkX3Rhc2snKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFRhc2tzRm9ybSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBcbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzaycpO1xuICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX2xpc3QnKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRhc2tzTGlzdC5pbml0KCkpO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbignYWRkJywgJ3Rhc2snLCAnQWRkIHRhc2snKSk7XG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbiAgICB9LFxufSIsImltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9idXR0b25zJztcbmltcG9ydCBidWlsZFByb2plY3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfZm9ybSc7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0cycpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgXG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdHMucmVuZGVyKCkpO1xuICAgIHByb2plY3RzLmNhY2hlRE9NKHByb2plY3RzQ29udGFpbmVyKTtcbiAgICBwcm9qZWN0cy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gcHJvamVjdHNDb250YWluZXJcbn1cblxuY29uc3QgcHJvamVjdHMgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfcHJvamVjdCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1aWxkUHJvamVjdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGFuY2hvcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYW5jaG9yV3JhcHBlci5jbGFzc0xpc3QuYWRkKCduYXZfcHJvamVjdHMnKTtcblxuICAgICAgICBhbmNob3JXcmFwcGVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKCdhZGQnLCAncHJvamVjdCcsICdBZGQgcHJvamVjdCcpKTsgICAgICAgIFxuICAgICAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnY29udGVudCcsIHBhcmVudENvbnRhaW5lciwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICBidWlsZExpc3QuZmluZCgnY29udGVudCcpLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoJ2NvbnRlbnQnKS5pbml0KCk7XG4gICAgICAgIHJldHVybiBwYXJlbnRDb250YWluZXI7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCB7IGJ1aWxkTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvamVjdHNfbGlzdCc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0c19mb3JtLmNzcyc7XG5cbi8vIHJlbmRlcnMgYSBmb3JtIHRvIGNyZWF0ZSBhIHByb2plY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkUHJvamVjdEZvcm0oKSB7XG4gICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWN0aXZlKCk7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGRpYWxvZ0VsZW1lbnQuaWQgPSAnZm9ybV9wcm9qZWN0JztcbiAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm1Qcm9qZWN0LnJlbmRlcigpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgIGRpYWxvZ0VsZW1lbnQuc2hvd01vZGFsKCk7XG4gICAgZm9ybVByb2plY3QuY2FjaGVET00oKTtcbiAgICBmb3JtUHJvamVjdC5iaW5kRXZlbnRzKCk7XG59XG5cbmNvbnN0IGZvcm1Qcm9qZWN0ID0ge1xuICAgIGZvcm1DaGlsZHJlbjoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBpZDogJ3RpdGxlJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Byb2plY3RfaW5wdXQnLFxuICAgICAgICAgICAgbmFtZTogJ3RpdGxlJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRW50ZXIgUHJvamVjdCBUaXRsZScsXG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGZvcm1CdXR0b25zOiB7XG4gICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX2NhbmNlbCcsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG5fc3VibWl0X3Byb2plY3QnLFxuICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBjYWNoZURPTTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtX3Byb2plY3QnKTtcbiAgICAgICAgdGhpcy5idG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2NhbmNlbCcpO1xuICAgICAgICB0aGlzLmJ0blN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fc3VibWl0X3Byb2plY3QnKTtcbiAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgICAgICAgdGhpcy5mb3JtSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2Zvcm0gaW5wdXQnKTtcbiAgICB9LFxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWwgPSB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCA9IHRoaXMucmVtb3ZlTW9kYWwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbCk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVNb2RhbCk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIH0sXG4gICAgLy8gdGFrZSBhIGxvb2sgYXQgcmVzdGF1cmFudCBwcm9qZWN0J3MgY29udGFjdCBtb2R1bGVcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgY29uc3QgZm9ybUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGNvbnN0IGZvcm1CdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fYnV0dG9ucycpO1xuICAgICAgICBmb3JtRWxlbWVudC5pZCA9ICdmb3JtJztcbiAgICAgICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1IZWFkZXIpO1xuXG4gICAgICAgIGZvciAobGV0IGZvcm1DaGlsZCBpbiB0aGlzLmZvcm1DaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgZm9ybUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGZvcm1JdGVtLmNsYXNzTGlzdC5hZGQoJ2Zvcm1faXRlbScpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uaGFzT3duUHJvcGVydHkoJ3JlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JyksIHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gZm9ybUNoaWxkO1xuICAgICAgICAgICAgICAgIGxhYmVsLmh0bWxGb3IgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmlkO1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBidG4gaW4gdGhpcy5mb3JtQnV0dG9ucykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihidXR0b24sIHRoaXMuZm9ybUJ1dHRvbnNbYnRuXSk7XG4gICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYnRuO1xuXG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBmb3JtQnV0dG9ucy5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcblxuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnRcbiAgICB9LFxuICAgIGNsb3NlTW9kYWw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdESUFMT0cnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZU1vZGFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sXG4gICAgc3VibWl0Rm9ybTogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIG9wdGlvbmFsLCBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICAgIC8vIGlmIGZvcm0gaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGFkZFByb2plY3QoKVxuICAgICAgICAvLyBhZGRQcm9qZWN0KHRoaXMuZm9ybUlucHV0cyk7XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLmFkZFByb2plY3QodGhpcy5mb3JtSW5wdXRzKTtcbiAgICAgICAgLy8gYnVpbGRMaXN0Lm1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4gbW9kdWxlLnJlbmRlcigpKVxuICAgICAgICBidWlsZExpc3QuZmluZCgnc2lkZWJhcicpLnJlbmRlcigpOyAvLyB3aWxsIHJlbmRlciBvbmx5IHRoZSBzaWRlYmFyXG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdzaWRlYmFyJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgYnVpbGRCdXR0b24gZnJvbSAnLi9idXR0b25zJztcbmltcG9ydCBidWlsZE1vZGFsUmVtb3ZlIGZyb20gJy4vbW9kYWxfcmVtb3ZlJztcbmltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCBJY29uSW5ib3ggZnJvbSAnLi4vYXNzZXRzL2ljb25zL2luYm94LnN2Zyc7XG5pbXBvcnQgSWNvblRvZGF5IGZyb20gJy4uL2Fzc2V0cy9pY29ucy90b2RheS5zdmcnO1xuaW1wb3J0IEljb25Qcm9qZWN0IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb2plY3RzLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9wcm9qZWN0c19saXN0LmNzcyc7XG5cbmNvbnN0IGJ1aWxkUHJvamVjdHNMaXN0ID0gKHR5cGUsIGNvbnRhaW5lciwgYXJyYXkpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYXJyYXksXG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBwcm9qZWN0c0xpc3Qoc3RhdGUpLFxuICAgICAgICBzZXRJY29ucyhzdGF0ZSksXG4gICAgICAgIClcbn1cblxuLy8gcmVuYW1lIHRvIGJ1aWxkUHJvamVjdHNMaXN0ICg/KVxuZXhwb3J0IGNvbnN0IGJ1aWxkTGlzdCA9IHtcbiAgICBtb2R1bGVzOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uICh0eXBlLCBjb250YWluZXIsIGFycmF5KSB7XG4gICAgICAgIC8vIG5lZWQgdG8gY2hlY2sgaWYgdGhlIG1vZHVsZSBleGlzdHMgYWxyZWFkeVxuICAgICAgICAvLyBpZiBtb2R1bGUgZXhpc3RzLCB0aGVuIHVwZGF0ZSBpdCdzIGNvbnRhaW5lclxuICAgICAgICAvLyBwcmV2ZW50cyBzaW1pbGFyIG1vZHVsZXMgdG8gYmUgYWRkZWRcbiAgICAgICAgaWYgKHRoaXMubW9kdWxlcy5zb21lKG1vZHVsZSA9PiBtb2R1bGUudHlwZSA9PT0gdHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZCh0eXBlKS5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXMgPSBbLi4udGhpcy5tb2R1bGVzLCBidWlsZFByb2plY3RzTGlzdCh0eXBlLCBjb250YWluZXIsIGFycmF5KV07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlcy5maW5kKG1vZHVsZSA9PiBtb2R1bGUudHlwZSA9PT0gdHlwZSk7XG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0c0xpc3QgPSAoc3RhdGUpID0+ICh7XG4gICAgcmVtb3ZlU2VsZWN0aW9uOiBudWxsLFxuICAgIGFycmF5OiBzdGF0ZS5hcnJheSxcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIGNvbnRhaW5lcjogc3RhdGUuY29udGFpbmVyLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBcbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0c19saXN0Jyk7XG5cbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKVxuICAgICAgICB0aGlzLmNhY2hlRE9NKGxpc3QpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdCk7XG5cbiAgICB9LFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbihjb250YWluZXIpICB7ICAgIFxuICAgICAgICB0aGlzLnVsTGlzdCA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy51bExpc3QuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RJdGVtcyA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgIHRoaXMucHJvamVjdHNMaXN0QW5jaG9ycyA9IHRoaXMudWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpIGEnKTtcbiAgICAgICAgdGhpcy5idG5EZWxldGVQcm9qZWN0ID0gdGhpcy51bExpc3QucXVlcnlTZWxlY3RvckFsbCgnLmJ0bl9kZWxldGVfcHJvamVjdCcpO1xuICAgIH0sXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJvamVjdCA9IHRoaXMucmVtb3ZlUHJvamVjdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnB1Ymxpc2ggPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgncmVtb3ZlUHJvamVjdCcsIHRoaXMucmVtb3ZlUHJvamVjdCk7XG4gICAgICAgIHRoaXMuYnRuRGVsZXRlUHJvamVjdC5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZVByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEFuY2hvcnMuZm9yRWFjaCggcHJvamVjdCA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wdWJsaXNoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3JTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9ySW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBhbmNob3JJbWcuc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgICAgICAgICBhbmNob3JTcGFuLnRleHRDb250ZW50ID0gdGhpcy5hcnJheVtpXS50aXRsZTtcbiAgICAgICAgICAgIGFuY2hvci5ocmVmID0gYCMke3RoaXMuYXJyYXlbaV0udGl0bGV9O2BcblxuICAgICAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnLCB0aGlzLmFycmF5W2ldLnV1aWQpO1xuICAgICAgICAgICAgYW5jaG9yLmNsYXNzTGlzdC5hZGQoJ25hdl9wcm9qZWN0Jyk7XG4gICAgICAgICAgICBjb25zdCBidXR0b25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5pY29ucykuZmluZChhID0+IGEgPT09IHRoaXMuYXJyYXlbaV0udGl0bGUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhbmNob3JJbWcuc3JjID0gdGhpcy5pY29uc1tPYmplY3Qua2V5cyh0aGlzLmljb25zKS5maW5kKGEgPT4gYSA9PT0gdGhpcy5hcnJheVtpXS50aXRsZS50b0xvd2VyQ2FzZSgpKV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5jaG9ySW1nLnNyYyA9IHRoaXMuaWNvbnNbJ2NpcmNsZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoYW5jaG9ySW1nKTtcbiAgICAgICAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChhbmNob3JTcGFuKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGFuY2hvcik7XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlICE9PSAnbWlzYycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBidWlsZEJ1dHRvbignZGVsZXRlJywgJ3Byb2plY3QnKTtcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWluYm94LXV1aWQnLCBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS51dWlkKTtcbiAgICAgICAgICAgICAgICBidXR0b25TcGFuLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoYnV0dG9uU3Bhbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3RJdGVtcy5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnVsTGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbXMpO1xuICAgICAgICAgICAgLy8gY2hhbmdlcyBjb250ZW50IHRvIHRoZSBuZXdseSBwcm9qZWN0IGlzIGFkZGVkXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0c0xpc3RJdGVtcy5sZW5ndGggPCB0aGlzLmFycmF5Lmxlbmd0aCAmJiB0aGlzLnR5cGUgPT09ICdzaWRlYmFyJykge1xuICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgWy4uLmxpc3RJdGVtcy5jaGlsZHJlbl0uc3BsaWNlKC0xKS5wb3AoKS5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FjaGVET00odGhpcy51bExpc3QpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtcztcbiAgICB9LFxuICAgIHJlbW92ZVByb2plY3Q6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IHtcbiAgICAgICAgICAgICAgICBtb2R1bGUucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RVVUlEID0gbGlzdEl0ZW0uZGF0YXNldC51dWlkO1xuICAgICAgICAgICAgYnVpbGRNb2RhbFJlbW92ZShwcm9qZWN0Q29udHJvbGxlci5maW5kKHByb2plY3RVVUlEKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBhY3RpdmUgcHJvamVjdFxuICAgICAgICAgICAgLy8gT1IgdGhlIHByb2plY3QncyB1dWlkIHdlIHdhbnQgdG8gcmVtb3ZlIGlzIHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IGFjdGl2ZSBwcm9qZWN0J3MgdXVpZFxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjb250ZW50IHRvIHRoZSBpbmJveFxuXG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpID09PSB1bmRlZmluZWQgfHwgZSA9PT0gcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnY29udGVudCcsIHRoaXMucmVtb3ZlU2VsZWN0aW9uLmxhc3RDaGlsZC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnJlbW92ZShlKTtcbiAgICAgICAgICAgIGJ1aWxkTGlzdC5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IG1vZHVsZS5yZW5kZXIoKSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uLnJlbW92ZSgpO1xuICAgICAgICAgICAgYnVpbGRMaXN0Lm1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4gbW9kdWxlLnJlbW92ZVNlbGVjdGlvbiA9IG51bGwpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2NvbnRlbnQnLCBlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBpZiAoKHRoaXMudHlwZSA9PT0gJ3NpZGViYXInfHwgdGhpcy50eXBlID09PSAnbWlzYycpICYmIHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnc2lkZWJhcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbGVhckNhY2hlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bExpc3QgPSBudWxsO1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9qZWN0c0xpc3RBbmNob3JzID0gbnVsbDtcbiAgICAgICAgdGhpcy5idG5EZWxldGVQcm9qZWN0ID0gbnVsbDtcbiAgICB9LFxufSlcblxuY29uc3Qgc2V0SWNvbnMgPSAoc3RhdGUpID0+IHtcbiAgICBsZXQgaWNvbnMgPSB7fVxuXG4gICAgaWYgKHN0YXRlLnR5cGUgPT09ICdtaXNjJykge1xuICAgICAgICBpY29ucy5pY29ucyA9IHsgaW5ib3g6IEljb25JbmJveCwgdG9kYXk6IEljb25Ub2RheSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGljb25zLmljb25zID0geyBjaXJjbGU6IEljb25Qcm9qZWN0IH07XG4gICAgfVxuICAgIHJldHVybiBpY29ucztcbn0iLCJpbXBvcnQgaW1wb3J0QWxsIGZyb20gJy4uLy4uL3V0aWxpdGllcy9pbXBvcnQtYWxsJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuLi9idXR0b25zJztcbmltcG9ydCBidWlsZFByb2plY3RGb3JtIGZyb20gJy4uL3Byb2plY3RzX2Zvcm0nO1xuaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5pbXBvcnQgeyBidWlsZExpc3QgfSBmcm9tICcuLi9wcm9qZWN0c19saXN0JztcbmltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvcHVic3ViJztcbmltcG9ydCAnLi4vLi4vc3R5bGVzL3NpZGViYXIuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRTaWRlYmFyKGNvbnRlbnQpIHtcbiAgICBjb25zdCBzaWRlYmFyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNpZGViYXJXcmFwcGVyLmlkID0gJ3NpZGViYXInO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgIHNpZGViYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaWRlYmFyV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgc2lkZWJhcldyYXBwZXIuYXBwZW5kQ2hpbGQoc2lkZWJhci5yZW5kZXIoKSk7XG4gICAgc2lkZWJhci5jYWNoZURPTShzaWRlYmFyV3JhcHBlcik7XG4gICAgc2lkZWJhci5iaW5kRXZlbnRzKCk7XG5cbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdzaWRlYmFyJywgc2lkZWJhci50b2dnbGVTaWRlYmFyKTsgLy8gcHVibGlzaGVkIGZyb20gcHJvamVjdHNfbGlzdC5qc1xuICAgIHJldHVybiBzaWRlYmFyV3JhcHBlcjtcbn1cblxuY29uc3QgYXNzZXRzID0ge1xuICAgIGljb25zOiBpbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuLi8uLi9hc3NldHMvaWNvbnMnLCBmYWxzZSwgL1xcLnN2ZyQvKSksXG59XG5cbmNvbnN0IHNpZGViYXIgPSB7XG4gICAgY2FjaGVET006IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnNpZGViYXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2lkZWJhcldyYXBwZXIgPSB0aGlzLnNpZGViYXIucXVlcnlTZWxlY3RvcignLnNpZGViYXJfd3JhcHBlcicpO1xuICAgICAgICB0aGlzLnByb2plY3RzQ29udGFpbmVyID0gdGhpcy5zaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0c19jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5hbmNob3JQcm9qZWN0cyA9IHRoaXMucHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5hdl9wcm9qZWN0cycpO1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfcHJvamVjdCcpO1xuXG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyID0gdGhpcy50b2dnbGVTaWRlYmFyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHVibGlzaCA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidWlsZFByb2plY3RGb3JtKTtcbiAgICAgICAgdGhpcy5hbmNob3JQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHVibGlzaCwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZVNpZGViYXIpO1xuICAgICAgICB0aGlzLmNhbGxEaW1PdmVybGF5ID0gdGhpcy5jYWxsRGltT3ZlcmxheS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxsRGltT3ZlcmxheSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBzaWRlYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuc2V0TWlzY1Byb2plY3RzKCk7XG4gICAgICAgIGNvbnN0IG5hdk1pc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnVpbGRMaXN0LmFkZCgnbWlzYycsIG5hdk1pc2MsIHByb2plY3RDb250cm9sbGVyLm1pc2MpO1xuICAgICAgICBidWlsZExpc3QuZmluZChgbWlzY2ApLmluaXQoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBhbmNob3JXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RzQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgIC8vIHNpZGViYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfd3JhcHBlcicpO1xuICAgICAgICBzaWRlYmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5pZCA9ICdwcm9qZWN0c19jb250YWluZXInO1xuICAgICAgICBuYXZNaXNjLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzX21pc2NfY29udGFpbmVyJyk7XG5cbiAgICAgICAgcHJvamVjdHNBbmNob3IudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgICAgICBwcm9qZWN0c0FuY2hvci5ocmVmID0gJyNwcm9qZWN0cyc7XG4gICAgICAgIHByb2plY3RzQW5jaG9yLmNsYXNzTGlzdC5hZGQoJ25hdl9wcm9qZWN0cycpXG5cbiAgICAgICAgYW5jaG9yV3JhcHBlci5hcHBlbmRDaGlsZChwcm9qZWN0c0FuY2hvcik7XG4gICAgICAgIGFuY2hvcldyYXBwZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oJ2FkZCcsICdwcm9qZWN0JykpO1xuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChhbmNob3JXcmFwcGVyKTtcblxuICAgICAgICBidWlsZExpc3QuYWRkKCdzaWRlYmFyJywgcHJvamVjdHNDb250YWluZXIsIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcbiAgICAgICAgYnVpbGRMaXN0LmZpbmQoYHNpZGViYXJgKS5pbml0KCk7XG5cbiAgICAgICAgc2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChuYXZNaXNjKTtcbiAgICAgICAgc2lkZWJhckNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBzaWRlYmFyQ29udGFpbmVyO1xuICAgIH0sXG4gICAgdG9nZ2xlU2lkZWJhcjogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5zaWRlYmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVTaWRlYmFyKCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGxEaW1PdmVybGF5KClcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU2lkZWJhcigpO1xuICAgICAgICB9XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjb250ZW50JywgZS5jdXJyZW50VGFyZ2V0KTtcbiAgICB9LFxuICAgIGNhbGxEaW1PdmVybGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2RpbScsIHRoaXMuc2lkZWJhcik7XG4gICAgfSxcbn0iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBidWlsZFNlbGVjdE9wdGlvbnMgZnJvbSAnLi4vY29tcG9uZW50cy90YXNrc19vcHRpb25zJztcbmltcG9ydCAnLi4vc3R5bGVzL3Rhc2tzX2Zvcm0uY3NzJ1xuaW1wb3J0IEljb25GbGFnIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9mbGFnLnN2Zyc7XG5pbXBvcnQgSWNvbkNoZXZyb25Eb3duIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaGV2cm9uX2Rvd24uc3ZnJztcbmltcG9ydCBJY29uQ2lyY2xlIGZyb20gJy4uL2Fzc2V0cy9pY29ucy9jaXJjbGUuc3ZnJztcbmltcG9ydCBJY29uSW5ib3ggZnJvbSAnLi4vYXNzZXRzL2ljb25zL2luYm94LnN2Zyc7XG5cbmNvbnN0IGJ1aWxkVGFza0Zvcm0gPSAodHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGZvcm0sXG4gICAgICAgIHR5cGUsXG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICBpZiAoYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuYnV0dG9uID0gYnV0dG9uO1xuICAgICAgICBzdGF0ZS5idXR0b25QYXJlbnQgPSBidXR0b25QYXJlbnQ7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBmb3JtVGFzayhzdGF0ZSksXG4gICAgICAgICAgICBub25Nb2RhbChzdGF0ZSksXG4gICAgICAgICAgICBmb3JtSW5wdXRzKHN0YXRlKSxcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRlLmRpYWxvZ0VsZW1lbnQgPSBkaWFsb2dFbGVtZW50O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgZm9ybVRhc2soc3RhdGUpLFxuICAgICAgICBtb2RhbChzdGF0ZSksXG4gICAgICAgIGZvcm1JbnB1dHMoc3RhdGUpLFxuICAgIClcbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkRm9ybSA9IHtcbiAgICBzZWN0aW9uczogW10sXG4gICAgYWRkOiBmdW5jdGlvbiAodHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgLy8gaWYgc2VjdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLCB1cGRhdGUgaXQncyBjb250YWluZXJcbiAgICAgICAgLy8gcHJldmVudHMgc2ltaWxhciBzZWN0aW9ucyB0byBiZSBhZGRlZFxuICAgICAgICBpZiAodGhpcy5maW5kKHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmQodHlwZSkuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlY3Rpb25zID0gWy4uLnRoaXMuc2VjdGlvbnMsIGJ1aWxkVGFza0Zvcm0odHlwZSwgZm9ybSwgYnV0dG9uLCBidXR0b25QYXJlbnQsIGRpYWxvZ0VsZW1lbnQpXTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0aGlzLnNlY3Rpb25zLnNwbGljZSh0aGlzLnNlY3Rpb25zLmluZGV4T2YodGhpcy5maW5kKHR5cGUpKSwgMSk7XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25zLmZpbmQoc2VjdGlvbiA9PiBzZWN0aW9uLnR5cGUgPT09IHR5cGUpO1xuICAgIH1cbn1cblxuLy8gcmVuZGVycyBhIGZvcm0gdG8gY3JlYXRlIGEgdGFza1xuICAgIC8vIG9uZSBuZWVkcyB0byBiZSBhIGRpYWxvZyBlbGVtZW50XG4gICAgLy8gb25lIG5lZWRzIHRvIGJlIGEgbm9uLWRpYWxvZyBlbGVtZW50XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFRhc2tzRm9ybShlKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGJ1dHRvblBhcmVudCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgaWYgKCFidXR0b24uaGFzQXR0cmlidXRlKCdyb2xlJykgJiYgYnV0dG9uUGFyZW50LnRhZ05hbWUgIT09ICdMSScpIHtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtJyk7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKTtcbiAgICAgICAgZGlhbG9nRWxlbWVudC5pZCA9ICdmb3JtX3Rhc2snO1xuICAgICAgICBidWlsZEZvcm0uYWRkKCdtb2RhbCcsIGZvcm0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBkaWFsb2dFbGVtZW50KTtcblxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1aWxkRm9ybS5maW5kKGBtb2RhbGApLnJlbmRlcigpKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuY2FjaGVET00oKTtcbiAgICAgICAgYnVpbGRGb3JtLmZpbmQoYG1vZGFsYCkuYmluZEV2ZW50cygpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpYWxvZ0VsZW1lbnQpO1xuICAgICAgICBkaWFsb2dFbGVtZW50LnNob3dNb2RhbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybV90YXNrJyk7XG4gICAgICAgIGUuY3VycmVudFRhcmdldC5yZXBsYWNlV2l0aChmb3JtKTtcbiAgICAgICAgYnVpbGRGb3JtLmFkZCgnZGVmYXVsdCcsIGZvcm0sIGJ1dHRvbiwgYnV0dG9uUGFyZW50KVxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkucmVuZGVyKCkpO1xuICAgICAgICBidWlsZEZvcm0uZmluZChgZGVmYXVsdGApLmNhY2hlRE9NKCk7XG4gICAgICAgIGJ1aWxkRm9ybS5maW5kKGBkZWZhdWx0YCkuYmluZEV2ZW50cygpO1xuICAgICAgICBmb3JtLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnfSk7XG4gICAgfVxufVxuXG5jb25zdCBmb3JtVGFzayA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIGZvcm06IHN0YXRlLmZvcm0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ0bkNhbmNlbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX2NhbmNlbCcpO1xuICAgICAgICB0aGlzLmJ0blN1Ym1pdCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuX3N1Ym1pdF90YXNrJykgfHwgdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXBkYXRlX3Rhc2snKTtcbiAgICAgICAgdGhpcy5mb3JtSW5wdXRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrX2lucHV0Jyk7XG4gICAgICAgIHRoaXMuYnRuUHJpb3JpdHkgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI2J0bl9wcmlvcml0eScpO1xuICAgICAgICB0aGlzLmJ0blByb2plY3QgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI2J0bl9wcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtID0gdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0Rm9ybSk7XG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUZvcm0pO1xuICAgICAgICB0aGlzLmJ0blByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRTZWxlY3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5idG5Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnVpbGRTZWxlY3RPcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1bkJpbmRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEZvcm0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGZvcm1CdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZvcm1CdXR0b25zLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fYnV0dG9ucycpO1xuICAgICAgICBmb3IgKGxldCBmb3JtQ2hpbGQgaW4gdGhpcy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKCdmb3JtX2l0ZW0nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmhhc093blByb3BlcnR5KCdlbGVtZW50JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGxhYmVsLmh0bWxGb3IgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMuaWQ7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMucGxhY2Vob2xkZXI7XG5cbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZm9ybUNoaWxkcmVuW2Zvcm1DaGlsZF0uc2liaWxpbmcuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnV0dG9uLCB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uZWxlbWVudCksIGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudCA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLmNoaWxkLmVsZW1lbnQpLCBpdGVtLmNoaWxkLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBidG4gaW4gdGhpcy5mb3JtQnV0dG9ucykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihidXR0b24sIHRoaXMuZm9ybUJ1dHRvbnNbYnRuXSk7XG4gICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYnRuO1xuXG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBmb3JtQnV0dG9ucy5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1CdXR0b25zKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkuYWRkVGFzayh0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlhbG9nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Jlc2V0T2xkVGFzaycsIHRoaXMuYnV0dG9uKTtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQodGhpcy5saXN0SXRlbS5kYXRhc2V0LnV1aWRQcm9qKS51cGRhdGVUYXNrKHRoaXMubGlzdEl0ZW0uZGF0YXNldC51dWlkLCB0aGlzLmZvcm1JbnB1dHMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUZvcm06IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5yZXBsYWNlV2l0aCh0aGlzLmJ1dHRvbik7XG4gICAgICAgICAgICBidWlsZEZvcm0ucmVtb3ZlKHRoaXMudHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Jlc2V0T2xkVGFzaycpO1xuICAgIH0sXG4gICAgcmVzZXRGb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gcmVzZXRzIGFsbCBmb3JtIGlucHV0cywgdHlwZT1cImhpZGRlblwiIGluY2x1ZGVkXG4gICAgICAgIC8vIHJlc2V0cyBwcmlvcml0eS9wcm9qZWN0IGJ1dHRvbiBjb250ZW50XG4gICAgICAgIGZvciAobGV0IGZvcm1DaGlsZCBpbiB0aGlzLmZvcm1DaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgZm9ybUlucHV0ID0gdGhpcy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBmb3JtSW5wdXQuYXR0cmlidXRlcztcbiAgICAgICAgICAgIFsuLi50aGlzLmZvcm1JbnB1dHNdLmZpbmQoaW5wdXQgPT4gaW5wdXQuaWQgPT09IGF0dHJpYnV0ZXMuaWQpLnZhbHVlID0gYXR0cmlidXRlcy52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IFsuLi50aGlzLmZvcm1JbnB1dHNdLmZpbmQoaW5wdXQgPT5cbiAgICAgICAgICAgICAgICAgICAgZm9ybUlucHV0LnNpYmlsaW5nLmF0dHJpYnV0ZXMuaWQgPT09IGlucHV0LmlkICYmIGlucHV0LnRhZ05hbWUgPT09ICdCVVRUT04nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3SWNvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBidG5TVkcgPSBlbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZFxuICAgICAgICAgICAgICAgIGlmIChidG5TVkcuY2xhc3NOYW1lLmJhc2VWYWwgIT09ICcnICYmIGJ0blNWRy5zcmMgIT09IGZvcm1JbnB1dC5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLnNyYykge1xuICAgICAgICAgICAgICAgICAgICBuZXdJY29uID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgICAgICAgICAgbmV3SWNvbi5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SWNvbi5zcmMgPSBmb3JtSW5wdXQuc2liaWxpbmcuY2hpbGRyZW5bMF0uY2hpbGQuYXR0cmlidXRlcy5zcmM7XG4gICAgICAgICAgICAgICAgICAgIGJ0blNWRy5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChuZXdJY29uLCBidG5TVkcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBuZWVkIHJlcGxhY2UgcHJvamVjdCBpZiB0aGUgY3VycmVudCBpY29uIGRvZXMgbm90IG1hdGNoIGRlZmF1bHQgaWNvblxuICAgICAgICAgICAgICAgIG5ld0ljb24uY2xhc3NOYW1lID0gZm9ybUlucHV0LnNpYmlsaW5nLmNoaWxkcmVuWzBdLmNoaWxkLmF0dHJpYnV0ZXMuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gZm9ybUlucHV0LnNpYmlsaW5nLmNoaWxkcmVuWzFdLmF0dHJpYnV0ZXMudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY29uc3Qgbm9uTW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gICAgYnV0dG9uOiBzdGF0ZS5idXR0b24sXG4gICAgcGFyZW50QnV0dG9uOiBzdGF0ZS5idXR0b25QYXJlbnQsXG59KTtcblxuY29uc3QgbW9kYWwgPSAoc3RhdGUpID0+ICh7XG4gICAgZGlhbG9nRWxlbWVudDogc3RhdGUuZGlhbG9nRWxlbWVudCxcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ2Zvcm1fdGFzaycpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVNb2RhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgYnVpbGRGb3JtLnJlbW92ZSh0aGlzLnR5cGUpO1xuICAgIH0sXG59KTtcblxuY29uc3QgZm9ybUlucHV0cyA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRhc2tJdGVtID0gc3RhdGUuYnV0dG9uID8gc3RhdGUuYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy50YXNrX2xpc3RfaXRlbScpIDogbnVsbDtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGFza0l0ZW0gPyBwcm9qZWN0Q29udHJvbGxlci5maW5kKHRhc2tJdGVtLmRhdGFzZXQudXVpZFByb2opIDogbnVsbDtcbiAgICBjb25zdCB0YXNrID0gdGFza0l0ZW0/IHByb2plY3QuZmluZFRhc2sodGFza0l0ZW0uZGF0YXNldC51dWlkKSA6IG51bGw7XG4gICAgXG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgZm9ybUNoaWxkIGluIGlucHV0cy5mb3JtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzID0gaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAvLyBmaW5kcyB0YXNrJ3Mga2V5IGVxdWFsIHRvIGlucHV0J3MgaWRcbiAgICAgICAgICAgIGxldCBrZXkgPSBPYmplY3Qua2V5cyh0YXNrKS5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gYXR0cmlidXRlcy5pZCk7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgIT09ICdkdWVEYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB7IHZhbHVlOiB0YXNrW2tleV0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0geyB2YWx1ZTogbmV3IERhdGUodGFza1trZXldKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQ2hpbGQgPT09ICdwcmlvcml0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5mb3JtQ2hpbGRyZW5bZm9ybUNoaWxkXS5zaWJpbGluZy5jaGlsZHJlblswXS5jaGlsZC5hdHRyaWJ1dGVzLmNsYXNzTmFtZSA9IGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLnNpYmlsaW5nLmNoaWxkcmVuWzFdLmF0dHJpYnV0ZXMudGV4dENvbnRlbnQgPSBgUCR7dGFzay5wcmlvcml0eX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLmZvcm1DaGlsZHJlbltmb3JtQ2hpbGRdLmF0dHJpYnV0ZXMudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXRzID0ge1xuICAgICAgICBmb3JtQ2hpbGRyZW46IHtcbiAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1Rhc2sgbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdEZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHVlRGF0ZToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2R1ZV9kYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0R1ZSBEYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkdWVUaW1lOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZHVlX3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RpbWUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGltZScsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnVGltZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW9yaXR5OiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAncHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpYmlsaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2J0bl9wcmlvcml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJpb3JpdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ltZ193cmFwcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZDogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnaW1nJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25GbGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdwcmlvcml0eV80JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogJ1A0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW1nX3dyYXBwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25DaGV2cm9uRG93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY2hldnJvbl9kb3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3Byb2plY3QnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0YXNrX2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3ByaW9yaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUHJvamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIudG9kYXlbMF0udXVpZCA/IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpYmlsaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2J0bl9wcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Rhc2tfaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdQcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpbWdfd3JhcHBlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIudG9kYXlbMF0udXVpZCB8fCBwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudXVpZCA9PT0gcHJvamVjdENvbnRyb2xsZXIuaW5ib3hbMF0udXVpZCA/IEljb25JbmJveCA6IEljb25DaXJjbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQgfHwgcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgPyAncHJvamVjdF9pbmJveCc6ICdwcm9qZWN0X2NpcmNsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGFza19wcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogcHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnV1aWQgPT09IHByb2plY3RDb250cm9sbGVyLnRvZGF5WzBdLnV1aWQgPyBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS50aXRsZSA6IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW1nX3dyYXBwZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IEljb25DaGV2cm9uRG93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY2hldnJvbl9kb3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybUJ1dHRvbnM6IHtcbiAgICAgICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl9jYW5jZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBidXR0b24gY2xpY2tlZCBoYXMgJ3JvbGUnIGF0dHJpYnV0ZVxuICAgICAgICAvLyBhc3NpZ24gZm9ybUNoaWxkcmVuIHdpdGggYSBzYXZlLWJ1dHRvblxuICAgICAgICAvLyBhc3NpZ24gZm9ybVRhc2sgd2l0aCBhIGNvbnRlbnQgcHJvcGVydHkvaW5pdCBmdW5jdGlvblxuICAgIC8vIG90aGVyd2lzZSwgXG4gICAgICAgIC8vIGFzc2lnbiBmb3JtQ2hpbGRyZW4gd2l0aCBvbmx5IGEgYWRkLWJ1dHRvblxuICAgIGlmIChzdGF0ZS5idXR0b24gJiYgc3RhdGUuYnV0dG9uLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgICAgIGNvbnN0IGlucHV0c0VkaXQgPSB7XG4gICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBzYXZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bl91cGRhdGVfdGFzaycsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcDoge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtOiBzdGF0ZS5idXR0b24uZmlyc3RDaGlsZCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMuZm9ybUJ1dHRvbnMsIGlucHV0c0VkaXQuYnV0dG9uKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnB1dHMsIGlucHV0c0VkaXQucHJvcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5wdXRzQWRkID0ge1xuICAgICAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuX3N1Ym1pdF90YXNrJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGlucHV0cy5mb3JtQnV0dG9ucywgaW5wdXRzQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0cztcbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBidWlsZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL2J1dHRvbnMnO1xuaW1wb3J0IGJ1aWxkTW9kYWxSZW1vdmUgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbF9yZW1vdmUnO1xuaW1wb3J0IGJ1aWxkVGFza3NGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvdGFza3NfZm9ybSc7XG5pbXBvcnQgeyBwdWJTdWIgfSBmcm9tICcuLi9jb250YWluZXJzL3B1YnN1Yic7XG5pbXBvcnQgJy4uL3N0eWxlcy90YXNrc19saXN0LmNzcyc7XG5cbmV4cG9ydCBjb25zdCB0YXNrc0xpc3QgPSB7XG4gICAgcmVtb3ZlU2VsZWN0aW9uOiBudWxsLFxuICAgIGJ0bkRlbGV0ZVRhc2s6IFtdLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzZXRPbGRUYXNrID0gdGhpcy5yZXNldE9sZFRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2snLCB0aGlzLnJlbmRlcik7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZVRhc2snLCB0aGlzLnJlbmRlcik7XG4gICAgICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc2V0T2xkVGFzaycsIHRoaXMucmVzZXRPbGRUYXNrKTtcbiAgICAgICAgcHViU3ViLnN1YnNjcmliZSgncmVtb3ZlVGFzaycsIHRoaXMucmVtb3ZlVGFzayk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RDb250cm9sbGVyLmZpbmRBY3RpdmUoKVxuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLnByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRhc2spXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgIH0sXG4gICAgb2xkVGFzazogbnVsbCxcbiAgICBwcm9qZWN0OiBudWxsLFxuICAgIGNhY2hlRE9NOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gdGhpcy5saXN0Q29udGFpbmVyO1xuICAgICAgICB0aGlzLnByb2plY3RzTGlzdEl0ZW1zID0gdGhpcy5saXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVkaXRUYXNrID0gdGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBsZXRlVGFzayA9IHRoaXMuY29tcGxldGVUYXNrLmJpbmQodGhpcyk7XG4gICAgICAgIGFyZ3MuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCdkZWxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVUYXNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jb21wbGV0ZVRhc2spXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzIHdpbGwgbmVlZCB0byBnZW5lcmF0ZSBhIGZvcm1cbiAgICAgICAgICAgIC8vIHJlbW92ZXMgdGhlIGJ1dHRvblxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbih0YXNrKSB7XG4gICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrQ2hlY2tib3ggPSBidWlsZEJ1dHRvbignY2hlY2tib3gnLCAndGFzaycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0YXNrQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICBsaXN0SXRlbVdyYXBwZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnLCB0YXNrLnV1aWRUYXNrKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkLXByb2onLCB0YXNrLnV1aWRQcm9qKTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICAgICAgdGFza0NvbnRlbnQuY2xhc3NMaXN0LmFkZCgndGFza19saXN0X2l0ZW1fY29udGVudCcpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgndGFza19saXN0X2l0ZW0nKTtcbiAgICAgICAgICAgIHRhc2tBY3Rpb25zLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfYWN0aW9ucycpO1xuICAgICAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFza19uYW1lJyk7XG4gICAgICAgICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcblxuICAgICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFza19wcmlvcml0eScpO1xuICAgICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHkgJHt0YXNrLnByaW9yaXR5fWA7XG5cbiAgICAgICAgICAgIHRhc2tDaGVja2JveC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKGBwcmlvcml0eV8ke3Rhc2sucHJpb3JpdHl9YClcblxuICAgICAgICAgICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NoZWNrYm94KTtcbiAgICAgICAgICAgIHRhc2tDb250ZW50LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFza19kZXNjcmlwdGlvbicpO1xuICAgICAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhc2suZHVlX2RhdGUgIT09IHVuZGVmaW5lZCB8fCB0YXNrLmR1ZV90aW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZVRpbWVUZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShgJHt0YXNrLmR1ZV9kYXRlfVQwMDowMDowMGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShgMS0yLTEwMDAgJHt0YXNrLmR1ZV90aW1lfWApXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVByb3BlcnRpZXMgPSB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suZHVlX2RhdGUgJiYgIXRhc2suZHVlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0YXNrLmR1ZV9kYXRlICYmIHRhc2suZHVlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gdGltZS50b0xvY2FsZVN0cmluZygnZW4tdXMnLCB0aW1lUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVUZXh0ID0gYCR7ZGF0ZS50b0RhdGVTdHJpbmcoKX0gJHt0aW1lLnRvTG9jYWxlU3RyaW5nKCdlbi11cycsIHRpbWVQcm9wZXJ0aWVzKX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRlVGltZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgndGFza19kdWVfZGF0ZV90aW1lJylcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZUJ1dHRvbiA9IGJ1aWxkQnV0dG9uKCdkYXRlJywgJ3Rhc2snLCBkYXRlVGltZVRleHQpXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVXcmFwcGVyLmFwcGVuZENoaWxkKGRhdGVUaW1lQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0YXNrQ29udGVudC5hcHBlbmRDaGlsZChkYXRlVGltZVdyYXBwZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBidXR0b25EZWxldGUgPSBidWlsZEJ1dHRvbignZGVsZXRlJywgJ3Rhc2snKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkVkaXQgPSBidWlsZEJ1dHRvbignZWRpdCcsICd0YXNrJyk7XG4gICAgICAgICAgICB0YXNrQWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25EZWxldGUpO1xuICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uRWRpdCk7XG5cbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDb250ZW50KTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tBY3Rpb25zKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RJdGVtQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgbGlzdEl0ZW1XcmFwcGVyLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cyhidXR0b25EZWxldGUsIHRhc2tDaGVja2JveCwgbGlzdEl0ZW1XcmFwcGVyKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9sZFRhc2spIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmRzIG5ldyB0YXNrXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfbmV3Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQW5pbWF0aW9uKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFwcGVuZHMgdXBkYXRlZCB0YXNrXG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrLnJlcGxhY2VXaXRoKGxpc3RJdGVtV3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcGxldGVUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBsaXN0SXRlbTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrKCk7XG4gICAgfSxcbiAgICByZW1vdmVUYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhIG1vZGFsIHRvIGNvbmZpcm0gcmVtb3ZhbFxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uID0gbGlzdEl0ZW07XG4gICAgICAgICAgICBsZXQgdXVpZFRhc2sgPSBsaXN0SXRlbS5kYXRhc2V0LnV1aWQ7XG4gICAgICAgICAgICBidWlsZE1vZGFsUmVtb3ZlKHRoaXMucHJvamVjdC5maW5kVGFzayh1dWlkVGFzaykpOyAgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdmVTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdC5yZW1vdmVUYXNrKHRoaXMucmVtb3ZlU2VsZWN0aW9uLmRhdGFzZXQudXVpZCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbi5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWRpdFRhc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5vbGRUYXNrID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBidWlsZFRhc2tzRm9ybShlKTtcbiAgICB9LFxuICAgIHJlc2V0T2xkVGFzazogZnVuY3Rpb24ob2xkVGFzaykge1xuICAgICAgICBpZiAodGhpcy5vbGRUYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm9sZFRhc2sgPSBudWxsXG4gICAgICAgIH0gZWxzZSBpZiAob2xkVGFzaykge1xuICAgICAgICAgICAgdGhpcy5vbGRUYXNrID0gb2xkVGFzaztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RvcEFuaW1hdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9LCBcIjIwMFwiKVxuICAgIH1cbn0iLCJpbXBvcnQgeyBwcm9qZWN0Q29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRhaW5lcnMvcHJvamVjdF9jb250cm9sbGVyJztcbmltcG9ydCBJY29uRmxhZyBmcm9tICcuLi9hc3NldHMvaWNvbnMvZmxhZy5zdmcnO1xuaW1wb3J0IEljb25DaGVjayBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2hlY2tfc21hbGwuc3ZnJztcbmltcG9ydCBJY29uUHJvamVjdCBmcm9tICcuLi9hc3NldHMvaWNvbnMvY2lyY2xlLnN2Zyc7XG5pbXBvcnQgSWNvbkluYm94IGZyb20gJy4uL2Fzc2V0cy9pY29ucy9pbmJveC5zdmcnO1xuaW1wb3J0ICcuLi9zdHlsZXMvdGFza3Nfb3B0aW9ucy5jc3MnO1xuXG5jb25zdCBidWlsZE9wdGlvbnMgPSAodHlwZSwgYnV0dG9uLCBkaWFsb2cpID0+IHtcbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGJ1dHRvbixcbiAgICAgICAgZGlhbG9nLFxuICAgICAgICBpY29uOiBJY29uRmxhZyxcbiAgICAgICAgZm9ybUl0ZW06IGJ1dHRvbi5wYXJlbnRFbGVtZW50LFxuICAgICAgICBidG5JY29uOiBidXR0b24ucXVlcnlTZWxlY3RvcignLmltZ193cmFwcGVyJykuZmlyc3RDaGlsZCxcbiAgICAgICAgYnRuU2VsZWN0VGV4dDogYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoYC50YXNrXyR7dHlwZX1gKSxcbiAgICB9XG5cbiAgICBpZiAodHlwZSAhPT0gJ3ByaW9yaXR5Jykge1xuICAgICAgICBzdGF0ZS5pY29uID0gSWNvblByb2plY3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHt9LFxuICAgICAgICBvcHRpb25zKHN0YXRlKSxcbiAgICApXG59XG5cbi8vIGNyZWF0ZXMgYSBtb2RhbCBmb3IgcHJpb3JpdHkgb3B0aW9uc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRTZWxlY3RPcHRpb25zKGUpIHtcbiAgICBjb25zdCBpZCA9IGUuY3VycmVudFRhcmdldC5pZC5zbGljZShlLmN1cnJlbnRUYXJnZXQuaWQuaW5kZXhPZignXycpICsgMSk7XG4gICAgY29uc3QgZGlhbG9nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGNvbnN0IHN0YXRlID0gYnVpbGRPcHRpb25zKGlkLCBlLmN1cnJlbnRUYXJnZXQsIGRpYWxvZ0VsZW1lbnQpO1xuICAgIHN0YXRlLmluaXQoKTtcbiAgICBkaWFsb2dFbGVtZW50LmlkID0gYHRhc2tfc2VsZWN0XyR7aWR9X29wdGlvbnNgO1xuICAgIGRpYWxvZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoc3RhdGUucmVuZGVyKCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nRWxlbWVudCk7XG4gICAgc3RhdGUuY2FjaGVET00oKTtcbiAgICBzdGF0ZS5iaW5kRXZlbnRzKCk7XG4gICAgZGlhbG9nRWxlbWVudC5zaG93TW9kYWwoKTtcbn1cblxuY29uc3Qgb3B0aW9ucyA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiBzdGF0ZS50eXBlLFxuICAgIGRpYWxvZ0VsZW1lbnQ6IHN0YXRlLmRpYWxvZyxcbiAgICBjdXJyZW50U2VsZWN0aW9uOiBudWxsLFxuICAgIGJ0blNlbGVjdDogc3RhdGUuYnV0dG9uLFxuICAgIGJ0blNlbGVjdFRleHQ6IHN0YXRlLmJ0blNlbGVjdFRleHQsXG4gICAgYnRuSWNvbjogc3RhdGUuYnRuSWNvbixcbiAgICBvcHRpb25JY29uOiBzdGF0ZS5pY29uLFxuICAgIGZvcm1JdGVtOiBzdGF0ZS5mb3JtSXRlbSxcbiAgICBtZWRpYTogd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDc2OHB4KScpLFxuICAgIG9ic2VydmVyOiBudWxsLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy50eXBlfWApO1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgIH0sXG4gICAgY2FjaGVET006IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3B0aW9uJyk7XG4gICAgfSxcbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsID0gdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gdGhpcy5zZWxlY3QuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5kaWFsb2dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2VsZWN0KSlcbiAgICAgICAgdGhpcy5jYWxsQmFjayA9IHRoaXMuY2FsbEJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLmNhbGxCYWNrKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZm9ybUl0ZW0pO1xuXG4gICAgICAgIHRoaXMubWVkaWEuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RhbCgpO1xuICAgICAgICB9KVxuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBvcHRpb25zTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG9wdGlvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICBsZXQgcHJvamVjdHMgPSBudWxsO1xuXG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICBwcm9qZWN0cyA9IHByb2plY3RDb250cm9sbGVyLmluYm94LmNvbmNhdChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cylcbiAgICAgICAgICAgIGxlbmd0aCA9IHByb2plY3RzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwcm9qZWN0JyAmJiBwcm9qZWN0c1tpXS50aXRsZSA9PT0gJ0luYm94Jykge1xuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IEljb25JbmJveDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RfY2lyY2xlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMub3B0aW9uSWNvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnb25sb2FkJywgJ1NWR0luamVjdCh0aGlzKScpO1xuXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nX3dyYXBwZXInKTtcbiAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdvcHRpb24nKVxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgICAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXIpO1xuICAgICAgICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpbWFnZS5jbGFzc0xpc3QuYWRkKGAke3Byb2plY3RzW2ldLnRpdGxlfWApXG4gICAgICAgICAgICAgICAgb3B0aW9uLmRhdGFzZXQudmFsdWUgPSBwcm9qZWN0c1tpXS51dWlkO1xuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBwcm9qZWN0c1tpXS50aXRsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChgcHJpb3JpdHlfJHtpfWApO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kYXRhc2V0LnZhbHVlID0gaTtcbiAgICAgICAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gYFByaW9yaXR5ICR7aX1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHByb2plY3RzICYmIHByb2plY3RzW2ldLnV1aWQgPT09IHRoaXMuY3VycmVudFNlbGVjdGlvbikgfHwgKCFwcm9qZWN0cyAmJiBpID09PSBwYXJzZUludCh0aGlzLmN1cnJlbnRTZWxlY3Rpb24pKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKGBzZWxlY3RlZGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZ0NoZWNrID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgaW1nQ2hlY2suc3JjID0gSWNvbkNoZWNrO1xuICAgICAgICAgICAgICAgIGltZ0NoZWNrLmNsYXNzTGlzdC5hZGQoJ29wdGlvbl9zZWxlY3RlZF9jaGVja21hcmsnKTtcbiAgICAgICAgICAgICAgICBpbWdDaGVjay5zZXRBdHRyaWJ1dGUoJ29ubG9hZCcsICdTVkdJbmplY3QodGhpcyknKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uYXBwZW5kQ2hpbGQoaW1nQ2hlY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9uc0xpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKG9wdGlvbnNMaXN0KTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNXcmFwcGVyO1xuICAgIH0sXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0RJQUxPRycpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuYnRuU2VsZWN0KTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnRuU2VsZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RDb250cm9sbGVyLmZpbmQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUpLnRpdGxlO1xuICAgICAgICAgICAgY29uc3QgbmV3SWNvbiA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBuZXdJY29uLnNyYyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlICE9PSBwcm9qZWN0Q29udHJvbGxlci5pbmJveFswXS51dWlkID8gSWNvblByb2plY3QgOiBJY29uSW5ib3g7XG4gICAgICAgICAgICBuZXdJY29uLmNsYXNzTGlzdC5hZGQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUgIT09IHByb2plY3RDb250cm9sbGVyLmluYm94WzBdLnV1aWQgPyAncHJvamVjdF9jaXJjbGUnIDogJ3Byb2plY3RfaW5ib3gnKTtcbiAgICAgICAgICAgIG5ld0ljb24uc2V0QXR0cmlidXRlKCdvbmxvYWQnLCAnU1ZHSW5qZWN0KHRoaXMpJyk7XG4gICAgICAgICAgICBpZiAobmV3SWNvbi5zcmMgIT09IHRoaXMuYnRuSWNvbi5kYXRhc2V0LmluamVjdFVybCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBuZXcgaWNvbiBzcmMgYW5kIHRoZSBjdXJyZW50IGljb24gc3JjIGFyZSBub3QgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBub2RlXG4gICAgICAgICAgICAgICAgdGhpcy5idG5JY29uLnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0ljb24sIHRoaXMuYnRuSWNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5idG5TZWxlY3RUZXh0LnRleHRDb250ZW50ID0gYFAke3RoaXMuaW5wdXQudmFsdWV9YDtcbiAgICAgICAgICAgIHRoaXMuYnRuSWNvbi5jbGFzc05hbWUuYmFzZVZhbCA9IGBwcmlvcml0eV8ke3RoaXMuaW5wdXQudmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZU1vZGFsKCk7XG4gICAgfSxcbiAgICBjYWxsQmFjazogZnVuY3Rpb24oZW50cmllcykge1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoZW50cnkuY29udGVudEJveFNpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuY29udGVudEJveFNpemVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmRzID0gZW50cnkudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUud2lkdGggPSBib3VuZHMud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZGlhbG9nRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBib3VuZHMuYm90dG9tKSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRpYWxvZydzIGhlaWdodCBhbmQgZm9ybSBpdGVtJ3MgYm90dG9tIGlzIGdyZWF0ZXIgdGhhbiB3aW5kb3cgaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2JvdW5kcy54fXB4LCAke2JvdW5kcy50b3AgLSB0aGlzLmRpYWxvZ0VsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2JvdW5kcy54fXB4LCAke2JvdW5kcy5ib3R0b219cHgpYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59KSIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gJy4vcHVic3ViJztcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4uL3N0b3JhZ2Uvc3RvcmFnZSc7XG5cbmNvbnN0IGdldEZvcm1WYWx1ZXMgPSAoaW5wdXRzKSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge31cbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7IFxuICAgICAgICBpZiAoaW5wdXQuaWQgPT09ICdwcmlvcml0eScpIHtcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBwYXJzZUludChpbnB1dC52YWx1ZS5zbGljZShpbnB1dC52YWx1ZS5sZW5ndGggLSAxLCBpbnB1dC52YWx1ZS5sZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5pZCA9PT0gJ2R1ZV9kYXRlJyAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPT09IDAgJiYgWy4uLmlucHV0c10uZmluZChpdGVtID0+IGl0ZW0uaWQgPT09ICdkdWVfdGltZScpLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgdGltZSBoYXMgYSB2YWx1ZSBhbmQgZGF0ZSBoYXMgbm8gdmFsdWVcbiAgICAgICAgICAgICAgICAvLyBkYXRlIHNldCB0byB0b2RheSdzIGRhdGVcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIG9ialtpbnB1dC5pZF0gPSBpbnB1dC52YWx1ZVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuY29uc3QgYnVpbGRQcm9qZWN0ID0gKHRhc2tzKSA9PiB7XG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICB0YXNrcyxcbiAgICAgICAgdXVpZDogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIHByb2plY3Qoc3RhdGUpLFxuICAgIClcbn1cblxuLy8gY3JlYXRlcyBhIHByb2plY3Qgb2JqZWN0XG4gICAgLy8gdGFza3MgcHJvcGVydHkgY3JlYXRlZCB1cG9uIG9iamVjdCBjcmVhdGlvblxuY29uc3QgcHJvamVjdCA9IChzdGF0ZSkgPT4gKHtcbiAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgYWN0aXZlOiBmYWxzZSwgLy8gdGhlcmUgY2FuIG9ubHkgYmUgb25lIHByb2plY3QgYWN0aXZlXG4gICAgdXVpZDogc3RhdGUudXVpZCxcbiAgICB0YXNrczogc3RhdGUudGFza3MgfHwgW10sXG4gICAgYWRkVGFzazogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gYWxsb3cgdXNlciB0byBwaWNrIHdoYXQgcHJvamVjdCB0byBhc3NpZ24gdGhlIG5ld2x5L2VkaXRlZCB0YXNrXG4gICAgICAgICAgICAvLyBwdXNoZXMgdGFzayB0byByZXNwZWN0aXZlIHByb2plY3RcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGdldEZvcm1WYWx1ZXMoaW5wdXRzKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IE9iamVjdC5hc3NpZ24odGFzayh0aGlzLnV1aWQpLCBmb3JtVmFsdWVzKTtcblxuICAgICAgICBpZiAoZm9ybVZhbHVlcy5wcm9qZWN0ICYmIGZvcm1WYWx1ZXMucHJvamVjdCAhPT0gbmV3VGFzay51dWlkUHJvaikge1xuICAgICAgICAgICAgbmV3VGFzay51dWlkUHJvaiA9IGZvcm1WYWx1ZXMucHJvamVjdDtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmZpbmQoZm9ybVZhbHVlcy5wcm9qZWN0KS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGAke25ld1Rhc2suZHVlX2RhdGV9VDAwOjAwOjAwYCkudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnYWRkVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5zZXRBbGxQcm9qZWN0cygpO1xuICAgIH0sXG4gICAgcmVtb3ZlVGFzazogZnVuY3Rpb24odXVpZCkge1xuICAgICAgICAvLyBpZiB0aGUgcmVtb3ZlIHRhc2sgaXMgaW4gdG9kYXlcbiAgICAgICAgICAgIC8vIHJlbW92ZSBpdCBmcm9tIHRvZGF5IEFORCBpdCdzIHJlc3BlY3RpdmUgcHJvamVjdFxuICAgICAgICAvLyBpZiB0aGUgdGFzaydzIGRhdGUgaW4gdG9kYXkgaXMgZWRpdGVkIFxuICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IGZyb20gb25seSB0b2RheVxuICAgICAgICBjb25zdCB0YXNrID0gdGhpcy5maW5kVGFzayh1dWlkKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50YXNrcy5pbmRleE9mKHRhc2spLCAxKTtcbiAgICAgICAgLy8gcmVtb3ZlcyB0YXNrIGluIHJlc3BlY3RpdmUgcHJvamVjdFxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLnV1aWRUYXNrID09PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGFza3Muc3BsaWNlKHByb2plY3QudGFza3MuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuc2V0QWxsUHJvamVjdHMoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVRhc2s6IGZ1bmN0aW9uKHV1aWQsIGlucHV0cykge1xuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcyhpbnB1dHMpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gT2JqZWN0LmFzc2lnbih0aGlzLmZpbmRUYXNrKHV1aWQpLCBmb3JtVmFsdWVzKTtcbiAgICAgICAgLy8gaWYgdGhlIHByb2plY3QgaXMgY2hhbmdlIGZvciBhIHRhc2tcbiAgICAgICAgaWYgKGZvcm1WYWx1ZXMucHJvamVjdCAmJiBmb3JtVmFsdWVzLnByb2plY3QgIT09IG5ld1Rhc2sudXVpZFByb2opIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFzayhuZXdUYXNrLnV1aWRUYXNrKTtcbiAgICAgICAgICAgIG5ld1Rhc2sudXVpZFByb2ogPSBmb3JtVmFsdWVzLnByb2plY3Q7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5maW5kKGZvcm1WYWx1ZXMucHJvamVjdCkudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJyk7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIuZmluZEFjdGl2ZSgpLnRpdGxlID09PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZVRhc2snLCBuZXdUYXNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5maW5kQWN0aXZlKCkudGl0bGUgPT09ICdUb2RheScpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYCR7bmV3VGFzay5kdWVfZGF0ZX1UMDA6MDA6MDBgKS50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdyZW1vdmVUYXNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlVGFzaycsIG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLnNldEFsbFByb2plY3RzKCk7XG4gICAgfSxcbiAgICBmaW5kVGFzazogZnVuY3Rpb24odXVpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC51dWlkVGFzayA9PT0gdXVpZCk7XG4gICAgfSxcbn0pXG5cblxuZXhwb3J0IGNvbnN0IHByb2plY3RDb250cm9sbGVyID0ge1xuICAgIGluYm94OiBbT2JqZWN0LmFzc2lnbihidWlsZFByb2plY3QoKSwge3RpdGxlOiAnSW5ib3gnLH0pXSwgLy8gd2lsbCBob2xkIHRhc2tzIGFzc2lnbmVkIHRvIHRoZSAnaW5ib3gnXG4gICAgdG9kYXk6IFtPYmplY3QuYXNzaWduKGJ1aWxkUHJvamVjdCgpLCB7dGl0bGU6ICdUb2RheSd9KV0sXG4gICAgbWlzYzogbnVsbCxcbiAgICBwcm9qZWN0czogbnVsbCxcbiAgICBhbGxQcm9qZWN0czogW10sXG4gICAgYWRkUHJvamVjdDogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKGlucHV0cyk7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChPYmplY3QuYXNzaWduKGJ1aWxkUHJvamVjdCgpLCBmb3JtVmFsdWVzKSk7XG4gICAgICAgIHRoaXMuc2V0QWxsUHJvamVjdHMoKVxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZih0aGlzLmZpbmQodXVpZCkpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRBbGxQcm9qZWN0cygpXG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbFByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LnV1aWQgPT09IHV1aWQpO1xuICAgIH0sXG4gICAgc2V0QWN0aXZlOiBmdW5jdGlvbih1dWlkKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbmRBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5maW5kQWN0aXZlKCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXVpZCkge1xuICAgICAgICAgICAgdGhpcy5maW5kKHV1aWQpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluYm94LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZpbmRBY3RpdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxsUHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuYWN0aXZlID09PSB0cnVlKSkge1xuICAgICAgICAgICAgdGhpcy5pbmJveFswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5ib3g7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbGxQcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5hY3RpdmUgPT09IHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXRBbGxQcm9qZWN0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYWxsUHJvamVjdHMgPSB0aGlzLmluYm94LmNvbmNhdCh0aGlzLnByb2plY3RzLCB0aGlzLnRvZGF5KTtcbiAgICAgICAgdGhpcy5zb3J0KClcbiAgICAgICAgcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgfSxcbiAgICBzZXRNaXNjUHJvamVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm1pc2MgPSB0aGlzLmluYm94LmNvbmNhdCh0aGlzLnRvZGF5KVxuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgdGhpcy5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2plY3QudGFza3MubGVuZ3RoID4gMCAmJiBwcm9qZWN0LnRpdGxlICE9PSAnVG9kYXknKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFza0RhdGUgPSBuZXcgRGF0ZShgJHt0YXNrLmR1ZV9kYXRlfVQwMDowMDowMGApLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudG9kYXlbMF0uZmluZFRhc2sodGFzay51dWlkVGFzaykgJiYgdGFza0RhdGUgPT0gdG9kYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9kYXlbMF0udGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvYmosIGJ1aWxkUHJvamVjdChvYmoudGFza3MpKTtcbiAgICAgICAgICAgIG9iai50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIHRhc2sudXVpZFByb2ogPSBvYmoudXVpZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuaW5ib3hbMF0sIGJ1aWxkUHJvamVjdCh0aGlzLmluYm94WzBdLnRhc2tzKSk7XG4gICAgICAgIHRoaXMuaW5ib3hbMF0udGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRhc2sudXVpZFByb2ogPSB0aGlzLmluYm94WzBdLnV1aWQ7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2V0QWxsUHJvamVjdHMoKTtcbiAgICB9XG59XG5cbmNvbnN0IHRhc2sgPSAodXVpZCkgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSAndGFzayc7XG4gICAgY29uc3QgdXVpZFRhc2sgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICAgIGNvbnN0IHV1aWRQcm9qID0gdXVpZDtcbiAgICByZXR1cm4geyB1dWlkVGFzaywgdXVpZFByb2osIHR5cGUgfTtcbn0iLCJleHBvcnQgY29uc3QgcHViU3ViID0ge1xuICAgIHN1YnNjcmliZXJzOiB7fSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHN1YnNjcmliZXIsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0gPSB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdIHx8IFtdO1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdLnB1c2goaGFuZGxlcik7XG4gICAgfSxcbiAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oc3Vic2NyaWJlciwgIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdWJzY3JpYmVyc1tzdWJzY3JpYmVyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzW3N1YnNjcmliZXJdW2ldID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHN1YnNjcmliZXIsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbc3Vic2NyaWJlcl0uZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgcHJvamVjdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250YWluZXJzL3Byb2plY3RfY29udHJvbGxlcic7XG5cbi8vIGdldHMgaXRlbXMgZnJvbSBsb2NhbFN0b3JhZ2VcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9qZWN0cygpIHtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgOiBbXTtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5pbmJveCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmJveCcpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5ib3gnKSkgOiBwcm9qZWN0Q29udHJvbGxlci5pbmJveDtcbiAgICBwcm9qZWN0Q29udHJvbGxlci5pbml0KCk7XG59XG5cbi8vIHNldHMgaXRlbXMgaW4gbG9jYWxTdG9yYWdlXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luYm94JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdENvbnRyb2xsZXIuaW5ib3gpKTtcbn0iLCIvLyByZXR1cm5zIGFuIG9iamVjdCBhbmQgYXJyYXkgb2YgZmlsZSB0eXBlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcbiAgICBsZXQgZmlsZXMgPSB7fTtcbiAgICBsZXQgZmlsZXNBcnIgPSBbXTtcbiAgICByLmtleXMoKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGZpbGVzW2l0ZW0ucmVwbGFjZSgnLi8nLCAnJyldID0gcihpdGVtKTtcbiAgICAgICAgZmlsZXNBcnIucHVzaChpdGVtLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7IGZpbGVzLCBmaWxlc0FyciB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9