(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Pengumuman_PengumumanPage_js"],{

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/***/ ((module) => {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/cache.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/cache.browser.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js");
/* harmony import */ var _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/stylis */ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");




// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__.default(stylisOptions);

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if ( true && serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  }

  if (true) {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/core/dist/core.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/core/dist/core.browser.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": () => /* reexport safe */ _emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.C,
/* harmony export */   "ThemeContext": () => /* reexport safe */ _emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.T,
/* harmony export */   "withEmotionCache": () => /* reexport safe */ _emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.w,
/* harmony export */   "css": () => /* reexport safe */ _emotion_css__WEBPACK_IMPORTED_MODULE_7__.default,
/* harmony export */   "ClassNames": () => /* binding */ ClassNames,
/* harmony export */   "Global": () => /* binding */ Global,
/* harmony export */   "createElement": () => /* binding */ jsx,
/* harmony export */   "jsx": () => /* binding */ jsx,
/* harmony export */   "keyframes": () => /* binding */ keyframes
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/cache.browser.esm.js");
/* harmony import */ var _emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emotion-element-57a3a7a3.browser.esm.js */ "./node_modules/@emotion/core/dist/emotion-element-57a3a7a3.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");











var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.E;
  createElementArgArray[1] = (0,_emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_1__.createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false;
var Global = /* #__PURE__ */(0,_emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;

  if (typeof styles === 'function') {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.T.Consumer, null, function (theme) {
      var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([styles(theme)]);
      return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(InnerGlobal, {
        serialized: serialized,
        cache: cache
      });
    });
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([styles]);
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag
var InnerGlobal = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__.default)(InnerGlobal, _React$Component);

  function InnerGlobal(props, context, updater) {
    return _React$Component.call(this, props, context, updater) || this;
  }

  var _proto = InnerGlobal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.sheet = new _emotion_sheet__WEBPACK_IMPORTED_MODULE_6__.StyleSheet({
      key: this.props.cache.key + "-global",
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion-" + this.props.cache.key + "=\"" + this.props.serialized.name + "\"]");

    if (node !== null) {
      this.sheet.tags.push(node);
    }

    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0];
    }

    this.insertStyles();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles();
    }
  };

  _proto.insertStyles = function insertStyles$1() {
    if (this.props.serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(this.props.cache, this.props.serialized.next, true);
    }

    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling;
      this.sheet.before = element;
      this.sheet.flush();
    }

    this.props.cache.insert("", this.props.serialized, this.sheet, false);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.sheet.flush();
  };

  _proto.render = function render() {

    return null;
  };

  return InnerGlobal;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

var keyframes = function keyframes() {
  var insertable = _emotion_css__WEBPACK_IMPORTED_MODULE_7__.default.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = (0,_emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.w)(function (props, context) {
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_emotion_element_57a3a7a3_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.T.Consumer, null, function (theme) {
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(args, context.registered);

      {
        (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(context, serialized, false);
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    return ele;
  });
});




/***/ }),

/***/ "./node_modules/@emotion/core/dist/emotion-element-57a3a7a3.browser.esm.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@emotion/core/dist/emotion-element-57a3a7a3.browser.esm.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => /* binding */ CacheProvider,
/* harmony export */   "E": () => /* binding */ Emotion,
/* harmony export */   "T": () => /* binding */ ThemeContext,
/* harmony export */   "c": () => /* binding */ createEmotionProps,
/* harmony export */   "h": () => /* binding */ hasOwnProperty,
/* harmony export */   "w": () => /* binding */ withEmotionCache
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/cache.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");






var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_2__.default)() : null);
var ThemeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(render);
};

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // TODO: check if this still works with all of those different JSX functions

  if (true) {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)(registeredStyles);

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.insertStyles)(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(type, newProps);

  return ele;
}; // eslint-disable-next-line no-undef


var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  if (typeof props.css === 'function') {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/css/dist/css.browser.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@emotion/css/dist/css.browser.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");


function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_0__.serializeStyles)(args);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (css);


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/hash.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/hash.browser.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/serialize.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": () => /* binding */ serializeStyles
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/hash.browser.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = (0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__.default)(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__.default[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if ( true && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__.default)(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/sheet.browser.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => /* binding */ StyleSheet
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (true) {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@emotion/stylis/dist/stylis.browser.esm.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stylis_min);


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/utils.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/utils.browser.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": () => /* binding */ getRegisteredStyles,
/* harmony export */   "insertStyles": () => /* binding */ insertStyles
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weakMemoize);


/***/ }),

/***/ "./resources/js/components/Base/BackgroundNavbar.js":
/*!**********************************************************!*\
  !*** ./resources/js/components/Base/BackgroundNavbar.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");




function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BackgroundNavbar = function BackgroundNavbar(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      navBackground = _useState2[0],
      setNavBackground = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setNavBackground(function () {
      if (getMainPath(props.location.pathname) == 'kumpulan-profil') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "PROFIL"
          })]
        });
      }

      if (getMainPath(props.location.pathname) == 'berita') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "BERITA"
          })]
        });
      }

      if (getMainPath(props.location.pathname) == 'kumpulan-prestasi') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "PRESTASI"
          })]
        });
      }

      if (getMainPath(props.location.pathname) == 'kumpulan-alumni') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "ALUMNI"
          })]
        });
      }

      if (getMainPath(props.location.pathname) == 'kumpulan-ekstrakurikuler') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "EKSTRAKURIKULER"
          })]
        });
      }

      if (getMainPath(props.location.pathname) == 'kumpulan-fasilitas') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "FASILITAS"
          })]
        });
      }

      if (getMainPath(props.location.pathname) == 'pengumuman') {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "/",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "HOME"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-md md:text-xl text-white font-bold mb-2 mx-2",
            children: "/"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
            to: "#",
            className: "text-md md:text-xl text-white font-bold mb-2",
            children: "PENGUMUMAN"
          })]
        });
      }
    });
  }, [props]);

  var getMainPath = function getMainPath(str) {
    var regex = /^\/([^?\/]+)/;
    return str.match(regex)[1];
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "w-100 bg-smam1",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "lg:container px-5 mx-auto h-32 md:h-40 flex items-end",
      children: navBackground
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router__WEBPACK_IMPORTED_MODULE_3__.withRouter)(BackgroundNavbar));

/***/ }),

/***/ "./resources/js/components/Base/Footer.js":
/*!************************************************!*\
  !*** ./resources/js/components/Base/Footer.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");





function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var Footer = function Footer() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      dataFooter = _useState2[0],
      setDataFooter = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    callDataFooter().then(function (res) {
      setDataFooter(res);
    });
  }, []);

  var callDataFooter = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().get(window.origin + '/api/footer').then(function (res) {
                data = res.data;
              });

            case 2:
              return _context.abrupt("return", data);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function callDataFooter() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-full bg-gray-900",
      children: function () {
        if (dataFooter == 0) {
          return '';
        } else {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "lg:container mx-auto grid grid-cols-12 p-5",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "col-span-12 md:col-span-6 lg:col-span-4",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "text-xl font-bold text-white",
                  children: "SMA 1 MUHAMMADIYAH SURABAYA"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "text-white text-xs pr-28 py-3",
                  children: (0,react_html_parser__WEBPACK_IMPORTED_MODULE_4__.default)(dataFooter.profil_footer[0].isi_konten)
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "col-span-12 md:col-span-6 lg:col-span-5",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "text-lg font-bold text-white my-2",
                  children: "KONTAK"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "h-0.5 w-10 bg-yellow-400 mb-3"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "w-full flex items-center",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                    src: "../image/pin.svg",
                    className: "h-5 w-5 my-1",
                    alt: ""
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-xs text-white mt-1 mx-3",
                    children: (0,react_html_parser__WEBPACK_IMPORTED_MODULE_4__.default)(dataFooter.lokasi[0].isi_konten)
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "w-full flex items-center",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                    src: "../image/email.svg",
                    className: "h-5 w-5 my-1",
                    alt: ""
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-xs text-white mx-3",
                    children: (0,react_html_parser__WEBPACK_IMPORTED_MODULE_4__.default)(dataFooter.email[0].isi_konten)
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "w-full flex items-center",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                    src: "../image/wa.svg",
                    className: "h-5 w-5 my-1",
                    alt: ""
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-xs text-white mx-3",
                    children: (0,react_html_parser__WEBPACK_IMPORTED_MODULE_4__.default)(dataFooter.whatsapp[0].isi_konten)
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "col-span-12 lg:col-span-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "text-lg font-bold text-white my-2",
                  children: "YOUTUBE"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "h-0.5 w-10 bg-yellow-400 mb-3"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "container-yt",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("iframe", {
                    src: dataFooter.youtube,
                    frameBorder: "0",
                    allowFullScreen: true,
                    className: "video"
                  })
                })]
              })]
            })
          });
        }
      }()
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-full bg-yellow-400",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "lg:container mx-auto h-8 text-center pt-2 text-xs font-bold",
        children: "Copyright \xA9 SMAMSA . All Right Reserved."
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./resources/js/components/Pengumuman/ContainerPengumuman.js":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Pengumuman/ContainerPengumuman.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Pengumuman__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pengumuman */ "./resources/js/components/Pengumuman/Pengumuman.js");
/* harmony import */ var _InfinitePengumuman__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InfinitePengumuman */ "./resources/js/components/Pengumuman/InfinitePengumuman.js");
/* harmony import */ var _SkeletonPengumuman__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SkeletonPengumuman */ "./resources/js/components/Pengumuman/SkeletonPengumuman.js");




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var ContainerPengumuman = function ContainerPengumuman() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      dataSearch = _useState2[0],
      setDataSearch = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      dataPost = _useState4[0],
      setDataPost = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      hasilSearch = _useState6[0],
      setHasilSearch = _useState6[1];

  var handleSubmitSearch = function handleSubmitSearch(event) {
    renderHasilSearch().then(function (done) {
      setHasilSearch(done);
    });
    setDataPost(dataSearch);
    setHasilSearch( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_SkeletonPengumuman__WEBPACK_IMPORTED_MODULE_5__.default, {}));
    event.preventDefault();
  };

  var handleChangeSearch = function handleChangeSearch(event) {
    setDataSearch(event.target.value);
  };

  var renderHasilSearch = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axios.get(window.origin + '/api/pengumuman/search/' + dataSearch).then(function (res) {
                data = res.data.map(function (data, i) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Pengumuman__WEBPACK_IMPORTED_MODULE_3__.default, {
                    judul: data.judul_pengumuman,
                    tanggal: data.created_at
                  }, i);
                });
              });

            case 2:
              return _context.abrupt("return", data);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function renderHasilSearch() {
      return _ref.apply(this, arguments);
    };
  }();

  var renderPengumuman = function renderPengumuman() {
    if (dataPost != '') {
      return hasilSearch;
    } else {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_InfinitePengumuman__WEBPACK_IMPORTED_MODULE_4__.default, {});
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "lg:container mx-auto",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-4xl text-center px-5 my-5 text-smam1 font-bold",
      children: "PENGUMUMAN"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
      onSubmit: handleSubmitSearch,
      className: "w-10/12 md:w-7/12 flex mx-auto mt-2 mb-7 h-10 md:h-14 relative",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: "text",
        placeholder: "CARI PENGUMUMAN",
        onChange: handleChangeSearch,
        className: "flex-1 bg-white p-3 rounded shadow border-2 border-solid border-gray-300"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        onClick: handleSubmitSearch,
        className: "cursor-pointer absolute-y-center flex justify-center items-center h-8 md:h-12 w-12 bg-smam1 right-1 rounded",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
          src: "../image/search.svg",
          className: "cursor-pointer h-6 md:h-8",
          alt: ""
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-11/12 md:w-7/12 mx-auto bg-smam1 shadow rounded p-2 flex flex-col mb-5",
      children: renderPengumuman()
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContainerPengumuman);

/***/ }),

/***/ "./resources/js/components/Pengumuman/InfinitePengumuman.js":
/*!******************************************************************!*\
  !*** ./resources/js/components/Pengumuman/InfinitePengumuman.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-infinite-scroll-component */ "./node_modules/react-infinite-scroll-component/dist/index.es.js");
/* harmony import */ var _Pengumuman__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pengumuman */ "./resources/js/components/Pengumuman/Pengumuman.js");
/* harmony import */ var _SkeletonPengumuman__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SkeletonPengumuman */ "./resources/js/components/Pengumuman/SkeletonPengumuman.js");



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var InfinitePengumuman = function InfinitePengumuman() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(Array.from({
    length: 0
  })),
      _useState2 = _slicedToArray(_useState, 2),
      dataPengumuman = _useState2[0],
      setDataPengumuman = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      hasMoreItems = _useState4[0],
      setHasMoreItems = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(7),
      _useState6 = _slicedToArray(_useState5, 2),
      limit = _useState6[0],
      setLimit = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      offset = _useState8[0],
      setOffset = _useState8[1];

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    getDataPengumuman();
  }, []);

  var callDataPengumuman = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axios.get(window.origin + '/api/pengumuman/' + offset + '/' + limit).then(function (res) {
                data = res.data;
              });

            case 2:
              return _context.abrupt("return", data);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function callDataPengumuman() {
      return _ref.apply(this, arguments);
    };
  }();

  var getDataPengumuman = function getDataPengumuman() {
    callDataPengumuman().then(function (res) {
      if (res.length % 7 != 0) {
        setHasMoreItems(false);
        setDataPengumuman(dataPengumuman.concat(res));
        setOffset(offset + 7);
      } else {
        setDataPengumuman(dataPengumuman.concat(res));
        setOffset(offset + 7);
      }
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_3__.default, {
    dataLength: dataPengumuman.length,
    next: getDataPengumuman,
    hasMore: hasMoreItems,
    loader: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_SkeletonPengumuman__WEBPACK_IMPORTED_MODULE_5__.default, {}),
    children: dataPengumuman.map(function (data, i) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Pengumuman__WEBPACK_IMPORTED_MODULE_4__.default, {
        judul: data.judul_pengumuman,
        tanggal: data.created_at
      }, i);
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfinitePengumuman);

/***/ }),

/***/ "./resources/js/components/Pengumuman/Pengumuman.js":
/*!**********************************************************!*\
  !*** ./resources/js/components/Pengumuman/Pengumuman.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");





var Pengumuman = function Pengumuman(props) {
  var judul = props.judul,
      tanggal = props.tanggal;
  var date = tanggal.split(" ")[0];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
    to: "/pengumuman/" + judul,
    className: "cursor-pointer bg-white transition-all duration-200 hover:bg-gray-50 shadow rounded flex flex-col justify-between p-3 h-28 my-1",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-smam1 text-md md:text-lg font-medium",
      children: judul
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-xs md:text-md text-smam1 text-right",
      children: date
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pengumuman);

/***/ }),

/***/ "./resources/js/components/Pengumuman/PengumumanPage.js":
/*!**************************************************************!*\
  !*** ./resources/js/components/Pengumuman/PengumumanPage.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Base_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base/Footer */ "./resources/js/components/Base/Footer.js");
/* harmony import */ var _Base_BackgroundNavbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Base/BackgroundNavbar */ "./resources/js/components/Base/BackgroundNavbar.js");
/* harmony import */ var _ContainerPengumuman__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ContainerPengumuman */ "./resources/js/components/Pengumuman/ContainerPengumuman.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var PengumumanPage = /*#__PURE__*/function (_Component) {
  _inherits(PengumumanPage, _Component);

  var _super = _createSuper(PengumumanPage);

  function PengumumanPage() {
    _classCallCheck(this, PengumumanPage);

    return _super.apply(this, arguments);
  }

  _createClass(PengumumanPage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Base_BackgroundNavbar__WEBPACK_IMPORTED_MODULE_3__.default, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ContainerPengumuman__WEBPACK_IMPORTED_MODULE_4__.default, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Base_Footer__WEBPACK_IMPORTED_MODULE_2__.default, {})]
      });
    }
  }]);

  return PengumumanPage;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PengumumanPage);

/***/ }),

/***/ "./resources/js/components/Pengumuman/SkeletonPengumuman.js":
/*!******************************************************************!*\
  !*** ./resources/js/components/Pengumuman/SkeletonPengumuman.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");




function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var SkeletonPengumuman = function SkeletonPengumuman() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([1, 2, 3]),
      _useState2 = _slicedToArray(_useState, 2),
      length = _useState2[0],
      setLength = _useState2[1];

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: function () {
      return length.map(function (i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "cursor-pointer transition-all duration-200 bg-white shadow rounded flex flex-col justify-between p-3 h-28 my-1",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-smam1 text-md md:text-lg font-medium",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__.default, {
              count: 2
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "self-end w-20",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__.default, {})
          })]
        }, i);
      });
    }()
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkeletonPengumuman);

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/dom-serializer/foreignNames.json":
/*!*******************************************************!*\
  !*** ./node_modules/dom-serializer/foreignNames.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"elementNames\":{\"altglyph\":\"altGlyph\",\"altglyphdef\":\"altGlyphDef\",\"altglyphitem\":\"altGlyphItem\",\"animatecolor\":\"animateColor\",\"animatemotion\":\"animateMotion\",\"animatetransform\":\"animateTransform\",\"clippath\":\"clipPath\",\"feblend\":\"feBlend\",\"fecolormatrix\":\"feColorMatrix\",\"fecomponenttransfer\":\"feComponentTransfer\",\"fecomposite\":\"feComposite\",\"feconvolvematrix\":\"feConvolveMatrix\",\"fediffuselighting\":\"feDiffuseLighting\",\"fedisplacementmap\":\"feDisplacementMap\",\"fedistantlight\":\"feDistantLight\",\"fedropshadow\":\"feDropShadow\",\"feflood\":\"feFlood\",\"fefunca\":\"feFuncA\",\"fefuncb\":\"feFuncB\",\"fefuncg\":\"feFuncG\",\"fefuncr\":\"feFuncR\",\"fegaussianblur\":\"feGaussianBlur\",\"feimage\":\"feImage\",\"femerge\":\"feMerge\",\"femergenode\":\"feMergeNode\",\"femorphology\":\"feMorphology\",\"feoffset\":\"feOffset\",\"fepointlight\":\"fePointLight\",\"fespecularlighting\":\"feSpecularLighting\",\"fespotlight\":\"feSpotLight\",\"fetile\":\"feTile\",\"feturbulence\":\"feTurbulence\",\"foreignobject\":\"foreignObject\",\"glyphref\":\"glyphRef\",\"lineargradient\":\"linearGradient\",\"radialgradient\":\"radialGradient\",\"textpath\":\"textPath\"},\"attributeNames\":{\"definitionurl\":\"definitionURL\",\"attributename\":\"attributeName\",\"attributetype\":\"attributeType\",\"basefrequency\":\"baseFrequency\",\"baseprofile\":\"baseProfile\",\"calcmode\":\"calcMode\",\"clippathunits\":\"clipPathUnits\",\"diffuseconstant\":\"diffuseConstant\",\"edgemode\":\"edgeMode\",\"filterunits\":\"filterUnits\",\"glyphref\":\"glyphRef\",\"gradienttransform\":\"gradientTransform\",\"gradientunits\":\"gradientUnits\",\"kernelmatrix\":\"kernelMatrix\",\"kernelunitlength\":\"kernelUnitLength\",\"keypoints\":\"keyPoints\",\"keysplines\":\"keySplines\",\"keytimes\":\"keyTimes\",\"lengthadjust\":\"lengthAdjust\",\"limitingconeangle\":\"limitingConeAngle\",\"markerheight\":\"markerHeight\",\"markerunits\":\"markerUnits\",\"markerwidth\":\"markerWidth\",\"maskcontentunits\":\"maskContentUnits\",\"maskunits\":\"maskUnits\",\"numoctaves\":\"numOctaves\",\"pathlength\":\"pathLength\",\"patterncontentunits\":\"patternContentUnits\",\"patterntransform\":\"patternTransform\",\"patternunits\":\"patternUnits\",\"pointsatx\":\"pointsAtX\",\"pointsaty\":\"pointsAtY\",\"pointsatz\":\"pointsAtZ\",\"preservealpha\":\"preserveAlpha\",\"preserveaspectratio\":\"preserveAspectRatio\",\"primitiveunits\":\"primitiveUnits\",\"refx\":\"refX\",\"refy\":\"refY\",\"repeatcount\":\"repeatCount\",\"repeatdur\":\"repeatDur\",\"requiredextensions\":\"requiredExtensions\",\"requiredfeatures\":\"requiredFeatures\",\"specularconstant\":\"specularConstant\",\"specularexponent\":\"specularExponent\",\"spreadmethod\":\"spreadMethod\",\"startoffset\":\"startOffset\",\"stddeviation\":\"stdDeviation\",\"stitchtiles\":\"stitchTiles\",\"surfacescale\":\"surfaceScale\",\"systemlanguage\":\"systemLanguage\",\"tablevalues\":\"tableValues\",\"targetx\":\"targetX\",\"targety\":\"targetY\",\"textlength\":\"textLength\",\"viewbox\":\"viewBox\",\"viewtarget\":\"viewTarget\",\"xchannelselector\":\"xChannelSelector\",\"ychannelselector\":\"yChannelSelector\",\"zoomandpan\":\"zoomAndPan\"}}");

/***/ }),

/***/ "./node_modules/dom-serializer/index.js":
/*!**********************************************!*\
  !*** ./node_modules/dom-serializer/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
  Module dependencies
*/
var ElementType = __webpack_require__(/*! domelementtype */ "./node_modules/dom-serializer/node_modules/domelementtype/lib/index.js");
var entities = __webpack_require__(/*! entities */ "./node_modules/entities/lib/index.js");

/* mixed-case SVG and MathML tags & attributes
   recognized by the HTML parser, see
   https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
*/
var foreignNames = __webpack_require__(/*! ./foreignNames.json */ "./node_modules/dom-serializer/foreignNames.json");
foreignNames.elementNames.__proto__ = null; /* use as a simple dictionary */
foreignNames.attributeNames.__proto__ = null;

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes, opts) {
  if (!attributes) return;

  var output = '';
  var value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    if (opts.xmlMode === 'foreign') {
      /* fix up mixed-case attribute names */
      key = foreignNames.attributeNames[key] || key;
    }
    output += key;
    if ((value !== null && value !== '') || opts.xmlMode) {
      output +=
        '="' +
        (opts.decodeEntities
          ? entities.encodeXML(value)
          : value.replace(/\"/g, '&quot;')) +
        '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

var render = (module.exports = function(dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for (var i = 0; i < dom.length; i++) {
    var elem = dom[i];

    if (elem.type === 'root') output += render(elem.children, opts);
    else if (ElementType.isTag(elem)) output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment) output += renderComment(elem);
    else if (elem.type === ElementType.CDATA) output += renderCdata(elem);
    else output += renderText(elem, opts);
  }

  return output;
});

var foreignModeIntegrationPoints = [
  'mi',
  'mo',
  'mn',
  'ms',
  'mtext',
  'annotation-xml',
  'foreignObject',
  'desc',
  'title'
];

function renderTag(elem, opts) {
  // Handle SVG / MathML in HTML
  if (opts.xmlMode === 'foreign') {
    /* fix up mixed-case element names */
    elem.name = foreignNames.elementNames[elem.name] || elem.name;
    /* exit foreign mode at integration points */
    if (
      elem.parent &&
      foreignModeIntegrationPoints.indexOf(elem.parent.name) >= 0
    )
      opts = Object.assign({}, opts, { xmlMode: false });
  }
  if (!opts.xmlMode && ['svg', 'math'].indexOf(elem.name) >= 0) {
    opts = Object.assign({}, opts, { xmlMode: 'foreign' });
  }

  var tag = '<' + elem.name;
  var attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (opts.xmlMode && (!elem.children || elem.children.length === 0)) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem) {
  return '<' + elem.data + '>';
}

function renderText(elem, opts) {
  var data = elem.data || '';

  // if entities weren't decoded, no need to encode them back
  if (
    opts.decodeEntities &&
    !(elem.parent && elem.parent.name in unencodedElements)
  ) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->';
}


/***/ }),

/***/ "./node_modules/dom-serializer/node_modules/domelementtype/lib/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/dom-serializer/node_modules/domelementtype/lib/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = void 0;
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag(elem) {
    return (elem.type === "tag" /* Tag */ ||
        elem.type === "script" /* Script */ ||
        elem.type === "style" /* Style */);
}
exports.isTag = isTag;
// Exports for backwards compatibility
/** Type for the root element of a document */
exports.Root = "root" /* Root */;
/** Type for Text */
exports.Text = "text" /* Text */;
/** Type for <? ... ?> */
exports.Directive = "directive" /* Directive */;
/** Type for <!-- ... --> */
exports.Comment = "comment" /* Comment */;
/** Type for <script> tags */
exports.Script = "script" /* Script */;
/** Type for <style> tags */
exports.Style = "style" /* Style */;
/** Type for Any tag */
exports.Tag = "tag" /* Tag */;
/** Type for <![CDATA[ ... ]]> */
exports.CDATA = "cdata" /* CDATA */;
/** Type for <!doctype ...> */
exports.Doctype = "doctype" /* Doctype */;


/***/ }),

/***/ "./node_modules/domelementtype/index.js":
/*!**********************************************!*\
  !*** ./node_modules/domelementtype/index.js ***!
  \**********************************************/
/***/ ((module) => {

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>
	Doctype: "doctype",

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};


/***/ }),

/***/ "./node_modules/domutils/index.js":
/*!****************************************!*\
  !*** ./node_modules/domutils/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DomUtils = module.exports;

[
	__webpack_require__(/*! ./lib/stringify */ "./node_modules/domutils/lib/stringify.js"),
	__webpack_require__(/*! ./lib/traversal */ "./node_modules/domutils/lib/traversal.js"),
	__webpack_require__(/*! ./lib/manipulation */ "./node_modules/domutils/lib/manipulation.js"),
	__webpack_require__(/*! ./lib/querying */ "./node_modules/domutils/lib/querying.js"),
	__webpack_require__(/*! ./lib/legacy */ "./node_modules/domutils/lib/legacy.js"),
	__webpack_require__(/*! ./lib/helpers */ "./node_modules/domutils/lib/helpers.js")
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});


/***/ }),

/***/ "./node_modules/domutils/lib/helpers.js":
/*!**********************************************!*\
  !*** ./node_modules/domutils/lib/helpers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

// removeSubsets
// Given an array of nodes, remove any member that is contained by another.
exports.removeSubsets = function(nodes) {
	var idx = nodes.length, node, ancestor, replace;

	// Check if each node (or one of its ancestors) is already contained in the
	// array.
	while (--idx > -1) {
		node = ancestor = nodes[idx];

		// Temporarily remove the node under consideration
		nodes[idx] = null;
		replace = true;

		while (ancestor) {
			if (nodes.indexOf(ancestor) > -1) {
				replace = false;
				nodes.splice(idx, 1);
				break;
			}
			ancestor = ancestor.parent;
		}

		// If the node has been found to be unique, re-insert it.
		if (replace) {
			nodes[idx] = node;
		}
	}

	return nodes;
};

// Source: http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
var POSITION = {
	DISCONNECTED: 1,
	PRECEDING: 2,
	FOLLOWING: 4,
	CONTAINS: 8,
	CONTAINED_BY: 16
};

// Compare the position of one node against another node in any other document.
// The return value is a bitmask with the following values:
//
// document order:
// > There is an ordering, document order, defined on all the nodes in the
// > document corresponding to the order in which the first character of the
// > XML representation of each node occurs in the XML representation of the
// > document after expansion of general entities. Thus, the document element
// > node will be the first node. Element nodes occur before their children.
// > Thus, document order orders element nodes in order of the occurrence of
// > their start-tag in the XML (after expansion of entities). The attribute
// > nodes of an element occur after the element and before its children. The
// > relative order of attribute nodes is implementation-dependent./
// Source:
// http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
//
// @argument {Node} nodaA The first node to use in the comparison
// @argument {Node} nodeB The second node to use in the comparison
//
// @return {Number} A bitmask describing the input nodes' relative position.
//         See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
//         a description of these values.
var comparePos = exports.compareDocumentPosition = function(nodeA, nodeB) {
	var aParents = [];
	var bParents = [];
	var current, sharedParent, siblings, aSibling, bSibling, idx;

	if (nodeA === nodeB) {
		return 0;
	}

	current = nodeA;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = nodeB;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}

	idx = 0;
	while (aParents[idx] === bParents[idx]) {
		idx++;
	}

	if (idx === 0) {
		return POSITION.DISCONNECTED;
	}

	sharedParent = aParents[idx - 1];
	siblings = sharedParent.children;
	aSibling = aParents[idx];
	bSibling = bParents[idx];

	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) {
			return POSITION.FOLLOWING | POSITION.CONTAINED_BY;
		}
		return POSITION.FOLLOWING;
	} else {
		if (sharedParent === nodeA) {
			return POSITION.PRECEDING | POSITION.CONTAINS;
		}
		return POSITION.PRECEDING;
	}
};

// Sort an array of nodes based on their relative position in the document and
// remove any duplicate nodes. If the array contains nodes that do not belong
// to the same document, sort order is unspecified.
//
// @argument {Array} nodes Array of DOM nodes
//
// @returns {Array} collection of unique nodes, sorted in document order
exports.uniqueSort = function(nodes) {
	var idx = nodes.length, node, position;

	nodes = nodes.slice();

	while (--idx > -1) {
		node = nodes[idx];
		position = nodes.indexOf(node);
		if (position > -1 && position < idx) {
			nodes.splice(idx, 1);
		}
	}
	nodes.sort(function(a, b) {
		var relative = comparePos(a, b);
		if (relative & POSITION.PRECEDING) {
			return -1;
		} else if (relative & POSITION.FOLLOWING) {
			return 1;
		}
		return 0;
	});

	return nodes;
};


/***/ }),

/***/ "./node_modules/domutils/lib/legacy.js":
/*!*********************************************!*\
  !*** ./node_modules/domutils/lib/legacy.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var ElementType = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/index.js");
var isTag = exports.isTag = ElementType.isTag;

exports.testElement = function(options, element){
	for(var key in options){
		if(!options.hasOwnProperty(key));
		else if(key === "tag_name"){
			if(!isTag(element) || !options.tag_name(element.name)){
				return false;
			}
		} else if(key === "tag_type"){
			if(!options.tag_type(element.type)) return false;
		} else if(key === "tag_contains"){
			if(isTag(element) || !options.tag_contains(element.data)){
				return false;
			}
		} else if(!element.attribs || !options[key](element.attribs[key])){
			return false;
		}
	}
	return true;
};

var Checks = {
	tag_name: function(name){
		if(typeof name === "function"){
			return function(elem){ return isTag(elem) && name(elem.name); };
		} else if(name === "*"){
			return isTag;
		} else {
			return function(elem){ return isTag(elem) && elem.name === name; };
		}
	},
	tag_type: function(type){
		if(typeof type === "function"){
			return function(elem){ return type(elem.type); };
		} else {
			return function(elem){ return elem.type === type; };
		}
	},
	tag_contains: function(data){
		if(typeof data === "function"){
			return function(elem){ return !isTag(elem) && data(elem.data); };
		} else {
			return function(elem){ return !isTag(elem) && elem.data === data; };
		}
	}
};

function getAttribCheck(attrib, value){
	if(typeof value === "function"){
		return function(elem){ return elem.attribs && value(elem.attribs[attrib]); };
	} else {
		return function(elem){ return elem.attribs && elem.attribs[attrib] === value; };
	}
}

function combineFuncs(a, b){
	return function(elem){
		return a(elem) || b(elem);
	};
}

exports.getElements = function(options, element, recurse, limit){
	var funcs = Object.keys(options).map(function(key){
		var value = options[key];
		return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
	});

	return funcs.length === 0 ? [] : this.filter(
		funcs.reduce(combineFuncs),
		element, recurse, limit
	);
};

exports.getElementById = function(id, element, recurse){
	if(!Array.isArray(element)) element = [element];
	return this.findOne(getAttribCheck("id", id), element, recurse !== false);
};

exports.getElementsByTagName = function(name, element, recurse, limit){
	return this.filter(Checks.tag_name(name), element, recurse, limit);
};

exports.getElementsByTagType = function(type, element, recurse, limit){
	return this.filter(Checks.tag_type(type), element, recurse, limit);
};


/***/ }),

/***/ "./node_modules/domutils/lib/manipulation.js":
/*!***************************************************!*\
  !*** ./node_modules/domutils/lib/manipulation.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.removeElement = function(elem){
	if(elem.prev) elem.prev.next = elem.next;
	if(elem.next) elem.next.prev = elem.prev;

	if(elem.parent){
		var childs = elem.parent.children;
		childs.splice(childs.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function(elem, replacement){
	var prev = replacement.prev = elem.prev;
	if(prev){
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if(next){
		next.prev = replacement;
	}

	var parent = replacement.parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function(elem, child){
	child.parent = elem;

	if(elem.children.push(child) !== 1){
		var sibling = elem.children[elem.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}
};

exports.append = function(elem, next){
	var parent = elem.parent,
		currNext = elem.next;

	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;

	if(currNext){
		currNext.prev = next;
		if(parent){
			var childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if(parent){
		parent.children.push(next);
	}
};

exports.prepend = function(elem, prev){
	var parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	if(elem.prev){
		elem.prev.next = prev;
	}
	
	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
};




/***/ }),

/***/ "./node_modules/domutils/lib/querying.js":
/*!***********************************************!*\
  !*** ./node_modules/domutils/lib/querying.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isTag = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/index.js").isTag;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit){
	if(!Array.isArray(element)) element = [element];

	if(typeof limit !== "number" || !isFinite(limit)){
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit){
	var result = [], childs;

	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])){
			result.push(elems[i]);
			if(--limit <= 0) break;
		}

		childs = elems[i].children;
		if(recurse && childs && childs.length > 0){
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if(limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(test(elems[i])) return elems[i];
	}

	return null;
}

function findOne(test, elems){
	var elem = null;

	for(var i = 0, l = elems.length; i < l && !elem; i++){
		if(!isTag(elems[i])){
			continue;
		} else if(test(elems[i])){
			elem = elems[i];
		} else if(elems[i].children.length > 0){
			elem = findOne(test, elems[i].children);
		}
	}

	return elem;
}

function existsOne(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(
			isTag(elems[i]) && (
				test(elems[i]) || (
					elems[i].children.length > 0 &&
					existsOne(test, elems[i].children)
				)
			)
		){
			return true;
		}
	}

	return false;
}

function findAll(test, rootElems){
	var result = [];
	var stack = rootElems.slice();
	while(stack.length){
		var elem = stack.shift();
		if(!isTag(elem)) continue;
		if (elem.children && elem.children.length > 0) {
			stack.unshift.apply(stack, elem.children);
		}
		if(test(elem)) result.push(elem);
	}
	return result;
}


/***/ }),

/***/ "./node_modules/domutils/lib/stringify.js":
/*!************************************************!*\
  !*** ./node_modules/domutils/lib/stringify.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ElementType = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/index.js"),
    getOuterHTML = __webpack_require__(/*! dom-serializer */ "./node_modules/dom-serializer/index.js"),
    isTag = ElementType.isTag;

module.exports = {
	getInnerHTML: getInnerHTML,
	getOuterHTML: getOuterHTML,
	getText: getText
};

function getInnerHTML(elem, opts){
	return elem.children ? elem.children.map(function(elem){
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

function getText(elem){
	if(Array.isArray(elem)) return elem.map(getText).join("");
	if(isTag(elem)) return elem.name === "br" ? "\n" : getText(elem.children);
	if(elem.type === ElementType.CDATA) return getText(elem.children);
	if(elem.type === ElementType.Text) return elem.data;
	return "";
}


/***/ }),

/***/ "./node_modules/domutils/lib/traversal.js":
/*!************************************************!*\
  !*** ./node_modules/domutils/lib/traversal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

var getChildren = exports.getChildren = function(elem){
	return elem.children;
};

var getParent = exports.getParent = function(elem){
	return elem.parent;
};

exports.getSiblings = function(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function(elem, name){
	return elem.attribs && elem.attribs[name];
};

exports.hasAttrib = function(elem, name){
	return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
};

exports.getName = function(elem){
	return elem.name;
};


/***/ }),

/***/ "./node_modules/entities/lib/decode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/decode.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = void 0;
var entities_json_1 = __importDefault(__webpack_require__(/*! ./maps/entities.json */ "./node_modules/entities/lib/maps/entities.json"));
var legacy_json_1 = __importDefault(__webpack_require__(/*! ./maps/legacy.json */ "./node_modules/entities/lib/maps/legacy.json"));
var xml_json_1 = __importDefault(__webpack_require__(/*! ./maps/xml.json */ "./node_modules/entities/lib/maps/xml.json"));
var decode_codepoint_1 = __importDefault(__webpack_require__(/*! ./decode_codepoint */ "./node_modules/entities/lib/decode_codepoint.js"));
exports.decodeXML = getStrictDecoder(xml_json_1.default);
exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
function getStrictDecoder(map) {
    var keys = Object.keys(map).join("|");
    var replace = getReplacer(map);
    keys += "|#[xX][\\da-fA-F]+|#\\d+";
    var re = new RegExp("&(?:" + keys + ");", "g");
    return function (str) { return String(str).replace(re, replace); };
}
var sorter = function (a, b) { return (a < b ? 1 : -1); };
exports.decodeHTML = (function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        }
        else {
            keys[i] += ";";
        }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1.default);
    function replacer(str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replace(str);
    }
    // TODO consider creating a merged map
    return function (str) { return String(str).replace(re, replacer); };
})();
function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            var secondChar = str.charAt(2);
            if (secondChar === "X" || secondChar === "x") {
                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        return map[str.slice(1, -1)];
    };
}


/***/ }),

/***/ "./node_modules/entities/lib/decode_codepoint.js":
/*!*******************************************************!*\
  !*** ./node_modules/entities/lib/decode_codepoint.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var decode_json_1 = __importDefault(__webpack_require__(/*! ./maps/decode.json */ "./node_modules/entities/lib/maps/decode.json"));
// Modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        codePoint = decode_json_1.default[codePoint];
    }
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
}
exports.default = decodeCodePoint;


/***/ }),

/***/ "./node_modules/entities/lib/encode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/encode.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escape = exports.encodeHTML = exports.encodeXML = void 0;
var xml_json_1 = __importDefault(__webpack_require__(/*! ./maps/xml.json */ "./node_modules/entities/lib/maps/xml.json"));
var inverseXML = getInverseObj(xml_json_1.default);
var xmlReplacer = getInverseReplacer(inverseXML);
exports.encodeXML = getInverse(inverseXML, xmlReplacer);
var entities_json_1 = __importDefault(__webpack_require__(/*! ./maps/entities.json */ "./node_modules/entities/lib/maps/entities.json"));
var inverseHTML = getInverseObj(entities_json_1.default);
var htmlReplacer = getInverseReplacer(inverseHTML);
exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (inverse, name) {
        inverse[obj[name]] = "&" + name + ";";
        return inverse;
    }, {});
}
function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
        var k = _a[_i];
        if (k.length === 1) {
            // Add value to single array
            single.push("\\" + k);
        }
        else {
            // Add value to multiple array
            multiple.push(k);
        }
    }
    // Add ranges to single characters.
    single.sort();
    for (var start = 0; start < single.length - 1; start++) {
        // Find the end of a run of characters
        var end = start;
        while (end < single.length - 1 &&
            single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
            end += 1;
        }
        var count = 1 + end - start;
        // We want to replace at least three characters
        if (count < 3)
            continue;
        single.splice(start, count, single[start] + "-" + single[end]);
    }
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
}
var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
function singleCharReplacer(c) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return "&#x" + c.codePointAt(0).toString(16).toUpperCase() + ";";
}
function getInverse(inverse, re) {
    return function (data) {
        return data
            .replace(re, function (name) { return inverse[name]; })
            .replace(reNonASCII, singleCharReplacer);
    };
}
var reXmlChars = getInverseReplacer(inverseXML);
function escape(data) {
    return data
        .replace(reXmlChars, singleCharReplacer)
        .replace(reNonASCII, singleCharReplacer);
}
exports.escape = escape;


/***/ }),

/***/ "./node_modules/entities/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/entities/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escape = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
var decode_1 = __webpack_require__(/*! ./decode */ "./node_modules/entities/lib/decode.js");
var encode_1 = __webpack_require__(/*! ./encode */ "./node_modules/entities/lib/encode.js");
/**
 * Decodes a string with entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 */
function decode(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
}
exports.decode = decode;
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 */
function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
}
exports.decodeStrict = decodeStrict;
/**
 * Encodes a string with entities.
 *
 * @param data String to encode.
 * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
 */
function encode(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
}
exports.encode = encode;
var encode_2 = __webpack_require__(/*! ./encode */ "./node_modules/entities/lib/encode.js");
Object.defineProperty(exports, "encodeXML", ({ enumerable: true, get: function () { return encode_2.encodeXML; } }));
Object.defineProperty(exports, "encodeHTML", ({ enumerable: true, get: function () { return encode_2.encodeHTML; } }));
Object.defineProperty(exports, "escape", ({ enumerable: true, get: function () { return encode_2.escape; } }));
// Legacy aliases
Object.defineProperty(exports, "encodeHTML4", ({ enumerable: true, get: function () { return encode_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeHTML5", ({ enumerable: true, get: function () { return encode_2.encodeHTML; } }));
var decode_2 = __webpack_require__(/*! ./decode */ "./node_modules/entities/lib/decode.js");
Object.defineProperty(exports, "decodeXML", ({ enumerable: true, get: function () { return decode_2.decodeXML; } }));
Object.defineProperty(exports, "decodeHTML", ({ enumerable: true, get: function () { return decode_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTMLStrict", ({ enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } }));
// Legacy aliases
Object.defineProperty(exports, "decodeHTML4", ({ enumerable: true, get: function () { return decode_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML5", ({ enumerable: true, get: function () { return decode_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML4Strict", ({ enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeHTML5Strict", ({ enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeXMLStrict", ({ enumerable: true, get: function () { return decode_2.decodeXML; } }));


/***/ }),

/***/ "./node_modules/entities/lib/maps/decode.json":
/*!****************************************************!*\
  !*** ./node_modules/entities/lib/maps/decode.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"0\":65533,\"128\":8364,\"130\":8218,\"131\":402,\"132\":8222,\"133\":8230,\"134\":8224,\"135\":8225,\"136\":710,\"137\":8240,\"138\":352,\"139\":8249,\"140\":338,\"142\":381,\"145\":8216,\"146\":8217,\"147\":8220,\"148\":8221,\"149\":8226,\"150\":8211,\"151\":8212,\"152\":732,\"153\":8482,\"154\":353,\"155\":8250,\"156\":339,\"158\":382,\"159\":376}");

/***/ }),

/***/ "./node_modules/entities/lib/maps/entities.json":
/*!******************************************************!*\
  !*** ./node_modules/entities/lib/maps/entities.json ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Abreve\":\"Ă\",\"abreve\":\"ă\",\"ac\":\"∾\",\"acd\":\"∿\",\"acE\":\"∾̳\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"Acy\":\"А\",\"acy\":\"а\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"af\":\"⁡\",\"Afr\":\"𝔄\",\"afr\":\"𝔞\",\"Agrave\":\"À\",\"agrave\":\"à\",\"alefsym\":\"ℵ\",\"aleph\":\"ℵ\",\"Alpha\":\"Α\",\"alpha\":\"α\",\"Amacr\":\"Ā\",\"amacr\":\"ā\",\"amalg\":\"⨿\",\"amp\":\"&\",\"AMP\":\"&\",\"andand\":\"⩕\",\"And\":\"⩓\",\"and\":\"∧\",\"andd\":\"⩜\",\"andslope\":\"⩘\",\"andv\":\"⩚\",\"ang\":\"∠\",\"ange\":\"⦤\",\"angle\":\"∠\",\"angmsdaa\":\"⦨\",\"angmsdab\":\"⦩\",\"angmsdac\":\"⦪\",\"angmsdad\":\"⦫\",\"angmsdae\":\"⦬\",\"angmsdaf\":\"⦭\",\"angmsdag\":\"⦮\",\"angmsdah\":\"⦯\",\"angmsd\":\"∡\",\"angrt\":\"∟\",\"angrtvb\":\"⊾\",\"angrtvbd\":\"⦝\",\"angsph\":\"∢\",\"angst\":\"Å\",\"angzarr\":\"⍼\",\"Aogon\":\"Ą\",\"aogon\":\"ą\",\"Aopf\":\"𝔸\",\"aopf\":\"𝕒\",\"apacir\":\"⩯\",\"ap\":\"≈\",\"apE\":\"⩰\",\"ape\":\"≊\",\"apid\":\"≋\",\"apos\":\"'\",\"ApplyFunction\":\"⁡\",\"approx\":\"≈\",\"approxeq\":\"≊\",\"Aring\":\"Å\",\"aring\":\"å\",\"Ascr\":\"𝒜\",\"ascr\":\"𝒶\",\"Assign\":\"≔\",\"ast\":\"*\",\"asymp\":\"≈\",\"asympeq\":\"≍\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"awconint\":\"∳\",\"awint\":\"⨑\",\"backcong\":\"≌\",\"backepsilon\":\"϶\",\"backprime\":\"‵\",\"backsim\":\"∽\",\"backsimeq\":\"⋍\",\"Backslash\":\"∖\",\"Barv\":\"⫧\",\"barvee\":\"⊽\",\"barwed\":\"⌅\",\"Barwed\":\"⌆\",\"barwedge\":\"⌅\",\"bbrk\":\"⎵\",\"bbrktbrk\":\"⎶\",\"bcong\":\"≌\",\"Bcy\":\"Б\",\"bcy\":\"б\",\"bdquo\":\"„\",\"becaus\":\"∵\",\"because\":\"∵\",\"Because\":\"∵\",\"bemptyv\":\"⦰\",\"bepsi\":\"϶\",\"bernou\":\"ℬ\",\"Bernoullis\":\"ℬ\",\"Beta\":\"Β\",\"beta\":\"β\",\"beth\":\"ℶ\",\"between\":\"≬\",\"Bfr\":\"𝔅\",\"bfr\":\"𝔟\",\"bigcap\":\"⋂\",\"bigcirc\":\"◯\",\"bigcup\":\"⋃\",\"bigodot\":\"⨀\",\"bigoplus\":\"⨁\",\"bigotimes\":\"⨂\",\"bigsqcup\":\"⨆\",\"bigstar\":\"★\",\"bigtriangledown\":\"▽\",\"bigtriangleup\":\"△\",\"biguplus\":\"⨄\",\"bigvee\":\"⋁\",\"bigwedge\":\"⋀\",\"bkarow\":\"⤍\",\"blacklozenge\":\"⧫\",\"blacksquare\":\"▪\",\"blacktriangle\":\"▴\",\"blacktriangledown\":\"▾\",\"blacktriangleleft\":\"◂\",\"blacktriangleright\":\"▸\",\"blank\":\"␣\",\"blk12\":\"▒\",\"blk14\":\"░\",\"blk34\":\"▓\",\"block\":\"█\",\"bne\":\"=⃥\",\"bnequiv\":\"≡⃥\",\"bNot\":\"⫭\",\"bnot\":\"⌐\",\"Bopf\":\"𝔹\",\"bopf\":\"𝕓\",\"bot\":\"⊥\",\"bottom\":\"⊥\",\"bowtie\":\"⋈\",\"boxbox\":\"⧉\",\"boxdl\":\"┐\",\"boxdL\":\"╕\",\"boxDl\":\"╖\",\"boxDL\":\"╗\",\"boxdr\":\"┌\",\"boxdR\":\"╒\",\"boxDr\":\"╓\",\"boxDR\":\"╔\",\"boxh\":\"─\",\"boxH\":\"═\",\"boxhd\":\"┬\",\"boxHd\":\"╤\",\"boxhD\":\"╥\",\"boxHD\":\"╦\",\"boxhu\":\"┴\",\"boxHu\":\"╧\",\"boxhU\":\"╨\",\"boxHU\":\"╩\",\"boxminus\":\"⊟\",\"boxplus\":\"⊞\",\"boxtimes\":\"⊠\",\"boxul\":\"┘\",\"boxuL\":\"╛\",\"boxUl\":\"╜\",\"boxUL\":\"╝\",\"boxur\":\"└\",\"boxuR\":\"╘\",\"boxUr\":\"╙\",\"boxUR\":\"╚\",\"boxv\":\"│\",\"boxV\":\"║\",\"boxvh\":\"┼\",\"boxvH\":\"╪\",\"boxVh\":\"╫\",\"boxVH\":\"╬\",\"boxvl\":\"┤\",\"boxvL\":\"╡\",\"boxVl\":\"╢\",\"boxVL\":\"╣\",\"boxvr\":\"├\",\"boxvR\":\"╞\",\"boxVr\":\"╟\",\"boxVR\":\"╠\",\"bprime\":\"‵\",\"breve\":\"˘\",\"Breve\":\"˘\",\"brvbar\":\"¦\",\"bscr\":\"𝒷\",\"Bscr\":\"ℬ\",\"bsemi\":\"⁏\",\"bsim\":\"∽\",\"bsime\":\"⋍\",\"bsolb\":\"⧅\",\"bsol\":\"\\\\\",\"bsolhsub\":\"⟈\",\"bull\":\"•\",\"bullet\":\"•\",\"bump\":\"≎\",\"bumpE\":\"⪮\",\"bumpe\":\"≏\",\"Bumpeq\":\"≎\",\"bumpeq\":\"≏\",\"Cacute\":\"Ć\",\"cacute\":\"ć\",\"capand\":\"⩄\",\"capbrcup\":\"⩉\",\"capcap\":\"⩋\",\"cap\":\"∩\",\"Cap\":\"⋒\",\"capcup\":\"⩇\",\"capdot\":\"⩀\",\"CapitalDifferentialD\":\"ⅅ\",\"caps\":\"∩︀\",\"caret\":\"⁁\",\"caron\":\"ˇ\",\"Cayleys\":\"ℭ\",\"ccaps\":\"⩍\",\"Ccaron\":\"Č\",\"ccaron\":\"č\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"Ccirc\":\"Ĉ\",\"ccirc\":\"ĉ\",\"Cconint\":\"∰\",\"ccups\":\"⩌\",\"ccupssm\":\"⩐\",\"Cdot\":\"Ċ\",\"cdot\":\"ċ\",\"cedil\":\"¸\",\"Cedilla\":\"¸\",\"cemptyv\":\"⦲\",\"cent\":\"¢\",\"centerdot\":\"·\",\"CenterDot\":\"·\",\"cfr\":\"𝔠\",\"Cfr\":\"ℭ\",\"CHcy\":\"Ч\",\"chcy\":\"ч\",\"check\":\"✓\",\"checkmark\":\"✓\",\"Chi\":\"Χ\",\"chi\":\"χ\",\"circ\":\"ˆ\",\"circeq\":\"≗\",\"circlearrowleft\":\"↺\",\"circlearrowright\":\"↻\",\"circledast\":\"⊛\",\"circledcirc\":\"⊚\",\"circleddash\":\"⊝\",\"CircleDot\":\"⊙\",\"circledR\":\"®\",\"circledS\":\"Ⓢ\",\"CircleMinus\":\"⊖\",\"CirclePlus\":\"⊕\",\"CircleTimes\":\"⊗\",\"cir\":\"○\",\"cirE\":\"⧃\",\"cire\":\"≗\",\"cirfnint\":\"⨐\",\"cirmid\":\"⫯\",\"cirscir\":\"⧂\",\"ClockwiseContourIntegral\":\"∲\",\"CloseCurlyDoubleQuote\":\"”\",\"CloseCurlyQuote\":\"’\",\"clubs\":\"♣\",\"clubsuit\":\"♣\",\"colon\":\":\",\"Colon\":\"∷\",\"Colone\":\"⩴\",\"colone\":\"≔\",\"coloneq\":\"≔\",\"comma\":\",\",\"commat\":\"@\",\"comp\":\"∁\",\"compfn\":\"∘\",\"complement\":\"∁\",\"complexes\":\"ℂ\",\"cong\":\"≅\",\"congdot\":\"⩭\",\"Congruent\":\"≡\",\"conint\":\"∮\",\"Conint\":\"∯\",\"ContourIntegral\":\"∮\",\"copf\":\"𝕔\",\"Copf\":\"ℂ\",\"coprod\":\"∐\",\"Coproduct\":\"∐\",\"copy\":\"©\",\"COPY\":\"©\",\"copysr\":\"℗\",\"CounterClockwiseContourIntegral\":\"∳\",\"crarr\":\"↵\",\"cross\":\"✗\",\"Cross\":\"⨯\",\"Cscr\":\"𝒞\",\"cscr\":\"𝒸\",\"csub\":\"⫏\",\"csube\":\"⫑\",\"csup\":\"⫐\",\"csupe\":\"⫒\",\"ctdot\":\"⋯\",\"cudarrl\":\"⤸\",\"cudarrr\":\"⤵\",\"cuepr\":\"⋞\",\"cuesc\":\"⋟\",\"cularr\":\"↶\",\"cularrp\":\"⤽\",\"cupbrcap\":\"⩈\",\"cupcap\":\"⩆\",\"CupCap\":\"≍\",\"cup\":\"∪\",\"Cup\":\"⋓\",\"cupcup\":\"⩊\",\"cupdot\":\"⊍\",\"cupor\":\"⩅\",\"cups\":\"∪︀\",\"curarr\":\"↷\",\"curarrm\":\"⤼\",\"curlyeqprec\":\"⋞\",\"curlyeqsucc\":\"⋟\",\"curlyvee\":\"⋎\",\"curlywedge\":\"⋏\",\"curren\":\"¤\",\"curvearrowleft\":\"↶\",\"curvearrowright\":\"↷\",\"cuvee\":\"⋎\",\"cuwed\":\"⋏\",\"cwconint\":\"∲\",\"cwint\":\"∱\",\"cylcty\":\"⌭\",\"dagger\":\"†\",\"Dagger\":\"‡\",\"daleth\":\"ℸ\",\"darr\":\"↓\",\"Darr\":\"↡\",\"dArr\":\"⇓\",\"dash\":\"‐\",\"Dashv\":\"⫤\",\"dashv\":\"⊣\",\"dbkarow\":\"⤏\",\"dblac\":\"˝\",\"Dcaron\":\"Ď\",\"dcaron\":\"ď\",\"Dcy\":\"Д\",\"dcy\":\"д\",\"ddagger\":\"‡\",\"ddarr\":\"⇊\",\"DD\":\"ⅅ\",\"dd\":\"ⅆ\",\"DDotrahd\":\"⤑\",\"ddotseq\":\"⩷\",\"deg\":\"°\",\"Del\":\"∇\",\"Delta\":\"Δ\",\"delta\":\"δ\",\"demptyv\":\"⦱\",\"dfisht\":\"⥿\",\"Dfr\":\"𝔇\",\"dfr\":\"𝔡\",\"dHar\":\"⥥\",\"dharl\":\"⇃\",\"dharr\":\"⇂\",\"DiacriticalAcute\":\"´\",\"DiacriticalDot\":\"˙\",\"DiacriticalDoubleAcute\":\"˝\",\"DiacriticalGrave\":\"`\",\"DiacriticalTilde\":\"˜\",\"diam\":\"⋄\",\"diamond\":\"⋄\",\"Diamond\":\"⋄\",\"diamondsuit\":\"♦\",\"diams\":\"♦\",\"die\":\"¨\",\"DifferentialD\":\"ⅆ\",\"digamma\":\"ϝ\",\"disin\":\"⋲\",\"div\":\"÷\",\"divide\":\"÷\",\"divideontimes\":\"⋇\",\"divonx\":\"⋇\",\"DJcy\":\"Ђ\",\"djcy\":\"ђ\",\"dlcorn\":\"⌞\",\"dlcrop\":\"⌍\",\"dollar\":\"$\",\"Dopf\":\"𝔻\",\"dopf\":\"𝕕\",\"Dot\":\"¨\",\"dot\":\"˙\",\"DotDot\":\"⃜\",\"doteq\":\"≐\",\"doteqdot\":\"≑\",\"DotEqual\":\"≐\",\"dotminus\":\"∸\",\"dotplus\":\"∔\",\"dotsquare\":\"⊡\",\"doublebarwedge\":\"⌆\",\"DoubleContourIntegral\":\"∯\",\"DoubleDot\":\"¨\",\"DoubleDownArrow\":\"⇓\",\"DoubleLeftArrow\":\"⇐\",\"DoubleLeftRightArrow\":\"⇔\",\"DoubleLeftTee\":\"⫤\",\"DoubleLongLeftArrow\":\"⟸\",\"DoubleLongLeftRightArrow\":\"⟺\",\"DoubleLongRightArrow\":\"⟹\",\"DoubleRightArrow\":\"⇒\",\"DoubleRightTee\":\"⊨\",\"DoubleUpArrow\":\"⇑\",\"DoubleUpDownArrow\":\"⇕\",\"DoubleVerticalBar\":\"∥\",\"DownArrowBar\":\"⤓\",\"downarrow\":\"↓\",\"DownArrow\":\"↓\",\"Downarrow\":\"⇓\",\"DownArrowUpArrow\":\"⇵\",\"DownBreve\":\"̑\",\"downdownarrows\":\"⇊\",\"downharpoonleft\":\"⇃\",\"downharpoonright\":\"⇂\",\"DownLeftRightVector\":\"⥐\",\"DownLeftTeeVector\":\"⥞\",\"DownLeftVectorBar\":\"⥖\",\"DownLeftVector\":\"↽\",\"DownRightTeeVector\":\"⥟\",\"DownRightVectorBar\":\"⥗\",\"DownRightVector\":\"⇁\",\"DownTeeArrow\":\"↧\",\"DownTee\":\"⊤\",\"drbkarow\":\"⤐\",\"drcorn\":\"⌟\",\"drcrop\":\"⌌\",\"Dscr\":\"𝒟\",\"dscr\":\"𝒹\",\"DScy\":\"Ѕ\",\"dscy\":\"ѕ\",\"dsol\":\"⧶\",\"Dstrok\":\"Đ\",\"dstrok\":\"đ\",\"dtdot\":\"⋱\",\"dtri\":\"▿\",\"dtrif\":\"▾\",\"duarr\":\"⇵\",\"duhar\":\"⥯\",\"dwangle\":\"⦦\",\"DZcy\":\"Џ\",\"dzcy\":\"џ\",\"dzigrarr\":\"⟿\",\"Eacute\":\"É\",\"eacute\":\"é\",\"easter\":\"⩮\",\"Ecaron\":\"Ě\",\"ecaron\":\"ě\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"ecir\":\"≖\",\"ecolon\":\"≕\",\"Ecy\":\"Э\",\"ecy\":\"э\",\"eDDot\":\"⩷\",\"Edot\":\"Ė\",\"edot\":\"ė\",\"eDot\":\"≑\",\"ee\":\"ⅇ\",\"efDot\":\"≒\",\"Efr\":\"𝔈\",\"efr\":\"𝔢\",\"eg\":\"⪚\",\"Egrave\":\"È\",\"egrave\":\"è\",\"egs\":\"⪖\",\"egsdot\":\"⪘\",\"el\":\"⪙\",\"Element\":\"∈\",\"elinters\":\"⏧\",\"ell\":\"ℓ\",\"els\":\"⪕\",\"elsdot\":\"⪗\",\"Emacr\":\"Ē\",\"emacr\":\"ē\",\"empty\":\"∅\",\"emptyset\":\"∅\",\"EmptySmallSquare\":\"◻\",\"emptyv\":\"∅\",\"EmptyVerySmallSquare\":\"▫\",\"emsp13\":\" \",\"emsp14\":\" \",\"emsp\":\" \",\"ENG\":\"Ŋ\",\"eng\":\"ŋ\",\"ensp\":\" \",\"Eogon\":\"Ę\",\"eogon\":\"ę\",\"Eopf\":\"𝔼\",\"eopf\":\"𝕖\",\"epar\":\"⋕\",\"eparsl\":\"⧣\",\"eplus\":\"⩱\",\"epsi\":\"ε\",\"Epsilon\":\"Ε\",\"epsilon\":\"ε\",\"epsiv\":\"ϵ\",\"eqcirc\":\"≖\",\"eqcolon\":\"≕\",\"eqsim\":\"≂\",\"eqslantgtr\":\"⪖\",\"eqslantless\":\"⪕\",\"Equal\":\"⩵\",\"equals\":\"=\",\"EqualTilde\":\"≂\",\"equest\":\"≟\",\"Equilibrium\":\"⇌\",\"equiv\":\"≡\",\"equivDD\":\"⩸\",\"eqvparsl\":\"⧥\",\"erarr\":\"⥱\",\"erDot\":\"≓\",\"escr\":\"ℯ\",\"Escr\":\"ℰ\",\"esdot\":\"≐\",\"Esim\":\"⩳\",\"esim\":\"≂\",\"Eta\":\"Η\",\"eta\":\"η\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"euro\":\"€\",\"excl\":\"!\",\"exist\":\"∃\",\"Exists\":\"∃\",\"expectation\":\"ℰ\",\"exponentiale\":\"ⅇ\",\"ExponentialE\":\"ⅇ\",\"fallingdotseq\":\"≒\",\"Fcy\":\"Ф\",\"fcy\":\"ф\",\"female\":\"♀\",\"ffilig\":\"ﬃ\",\"fflig\":\"ﬀ\",\"ffllig\":\"ﬄ\",\"Ffr\":\"𝔉\",\"ffr\":\"𝔣\",\"filig\":\"ﬁ\",\"FilledSmallSquare\":\"◼\",\"FilledVerySmallSquare\":\"▪\",\"fjlig\":\"fj\",\"flat\":\"♭\",\"fllig\":\"ﬂ\",\"fltns\":\"▱\",\"fnof\":\"ƒ\",\"Fopf\":\"𝔽\",\"fopf\":\"𝕗\",\"forall\":\"∀\",\"ForAll\":\"∀\",\"fork\":\"⋔\",\"forkv\":\"⫙\",\"Fouriertrf\":\"ℱ\",\"fpartint\":\"⨍\",\"frac12\":\"½\",\"frac13\":\"⅓\",\"frac14\":\"¼\",\"frac15\":\"⅕\",\"frac16\":\"⅙\",\"frac18\":\"⅛\",\"frac23\":\"⅔\",\"frac25\":\"⅖\",\"frac34\":\"¾\",\"frac35\":\"⅗\",\"frac38\":\"⅜\",\"frac45\":\"⅘\",\"frac56\":\"⅚\",\"frac58\":\"⅝\",\"frac78\":\"⅞\",\"frasl\":\"⁄\",\"frown\":\"⌢\",\"fscr\":\"𝒻\",\"Fscr\":\"ℱ\",\"gacute\":\"ǵ\",\"Gamma\":\"Γ\",\"gamma\":\"γ\",\"Gammad\":\"Ϝ\",\"gammad\":\"ϝ\",\"gap\":\"⪆\",\"Gbreve\":\"Ğ\",\"gbreve\":\"ğ\",\"Gcedil\":\"Ģ\",\"Gcirc\":\"Ĝ\",\"gcirc\":\"ĝ\",\"Gcy\":\"Г\",\"gcy\":\"г\",\"Gdot\":\"Ġ\",\"gdot\":\"ġ\",\"ge\":\"≥\",\"gE\":\"≧\",\"gEl\":\"⪌\",\"gel\":\"⋛\",\"geq\":\"≥\",\"geqq\":\"≧\",\"geqslant\":\"⩾\",\"gescc\":\"⪩\",\"ges\":\"⩾\",\"gesdot\":\"⪀\",\"gesdoto\":\"⪂\",\"gesdotol\":\"⪄\",\"gesl\":\"⋛︀\",\"gesles\":\"⪔\",\"Gfr\":\"𝔊\",\"gfr\":\"𝔤\",\"gg\":\"≫\",\"Gg\":\"⋙\",\"ggg\":\"⋙\",\"gimel\":\"ℷ\",\"GJcy\":\"Ѓ\",\"gjcy\":\"ѓ\",\"gla\":\"⪥\",\"gl\":\"≷\",\"glE\":\"⪒\",\"glj\":\"⪤\",\"gnap\":\"⪊\",\"gnapprox\":\"⪊\",\"gne\":\"⪈\",\"gnE\":\"≩\",\"gneq\":\"⪈\",\"gneqq\":\"≩\",\"gnsim\":\"⋧\",\"Gopf\":\"𝔾\",\"gopf\":\"𝕘\",\"grave\":\"`\",\"GreaterEqual\":\"≥\",\"GreaterEqualLess\":\"⋛\",\"GreaterFullEqual\":\"≧\",\"GreaterGreater\":\"⪢\",\"GreaterLess\":\"≷\",\"GreaterSlantEqual\":\"⩾\",\"GreaterTilde\":\"≳\",\"Gscr\":\"𝒢\",\"gscr\":\"ℊ\",\"gsim\":\"≳\",\"gsime\":\"⪎\",\"gsiml\":\"⪐\",\"gtcc\":\"⪧\",\"gtcir\":\"⩺\",\"gt\":\">\",\"GT\":\">\",\"Gt\":\"≫\",\"gtdot\":\"⋗\",\"gtlPar\":\"⦕\",\"gtquest\":\"⩼\",\"gtrapprox\":\"⪆\",\"gtrarr\":\"⥸\",\"gtrdot\":\"⋗\",\"gtreqless\":\"⋛\",\"gtreqqless\":\"⪌\",\"gtrless\":\"≷\",\"gtrsim\":\"≳\",\"gvertneqq\":\"≩︀\",\"gvnE\":\"≩︀\",\"Hacek\":\"ˇ\",\"hairsp\":\" \",\"half\":\"½\",\"hamilt\":\"ℋ\",\"HARDcy\":\"Ъ\",\"hardcy\":\"ъ\",\"harrcir\":\"⥈\",\"harr\":\"↔\",\"hArr\":\"⇔\",\"harrw\":\"↭\",\"Hat\":\"^\",\"hbar\":\"ℏ\",\"Hcirc\":\"Ĥ\",\"hcirc\":\"ĥ\",\"hearts\":\"♥\",\"heartsuit\":\"♥\",\"hellip\":\"…\",\"hercon\":\"⊹\",\"hfr\":\"𝔥\",\"Hfr\":\"ℌ\",\"HilbertSpace\":\"ℋ\",\"hksearow\":\"⤥\",\"hkswarow\":\"⤦\",\"hoarr\":\"⇿\",\"homtht\":\"∻\",\"hookleftarrow\":\"↩\",\"hookrightarrow\":\"↪\",\"hopf\":\"𝕙\",\"Hopf\":\"ℍ\",\"horbar\":\"―\",\"HorizontalLine\":\"─\",\"hscr\":\"𝒽\",\"Hscr\":\"ℋ\",\"hslash\":\"ℏ\",\"Hstrok\":\"Ħ\",\"hstrok\":\"ħ\",\"HumpDownHump\":\"≎\",\"HumpEqual\":\"≏\",\"hybull\":\"⁃\",\"hyphen\":\"‐\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"ic\":\"⁣\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"Icy\":\"И\",\"icy\":\"и\",\"Idot\":\"İ\",\"IEcy\":\"Е\",\"iecy\":\"е\",\"iexcl\":\"¡\",\"iff\":\"⇔\",\"ifr\":\"𝔦\",\"Ifr\":\"ℑ\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"ii\":\"ⅈ\",\"iiiint\":\"⨌\",\"iiint\":\"∭\",\"iinfin\":\"⧜\",\"iiota\":\"℩\",\"IJlig\":\"Ĳ\",\"ijlig\":\"ĳ\",\"Imacr\":\"Ī\",\"imacr\":\"ī\",\"image\":\"ℑ\",\"ImaginaryI\":\"ⅈ\",\"imagline\":\"ℐ\",\"imagpart\":\"ℑ\",\"imath\":\"ı\",\"Im\":\"ℑ\",\"imof\":\"⊷\",\"imped\":\"Ƶ\",\"Implies\":\"⇒\",\"incare\":\"℅\",\"in\":\"∈\",\"infin\":\"∞\",\"infintie\":\"⧝\",\"inodot\":\"ı\",\"intcal\":\"⊺\",\"int\":\"∫\",\"Int\":\"∬\",\"integers\":\"ℤ\",\"Integral\":\"∫\",\"intercal\":\"⊺\",\"Intersection\":\"⋂\",\"intlarhk\":\"⨗\",\"intprod\":\"⨼\",\"InvisibleComma\":\"⁣\",\"InvisibleTimes\":\"⁢\",\"IOcy\":\"Ё\",\"iocy\":\"ё\",\"Iogon\":\"Į\",\"iogon\":\"į\",\"Iopf\":\"𝕀\",\"iopf\":\"𝕚\",\"Iota\":\"Ι\",\"iota\":\"ι\",\"iprod\":\"⨼\",\"iquest\":\"¿\",\"iscr\":\"𝒾\",\"Iscr\":\"ℐ\",\"isin\":\"∈\",\"isindot\":\"⋵\",\"isinE\":\"⋹\",\"isins\":\"⋴\",\"isinsv\":\"⋳\",\"isinv\":\"∈\",\"it\":\"⁢\",\"Itilde\":\"Ĩ\",\"itilde\":\"ĩ\",\"Iukcy\":\"І\",\"iukcy\":\"і\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"Jcirc\":\"Ĵ\",\"jcirc\":\"ĵ\",\"Jcy\":\"Й\",\"jcy\":\"й\",\"Jfr\":\"𝔍\",\"jfr\":\"𝔧\",\"jmath\":\"ȷ\",\"Jopf\":\"𝕁\",\"jopf\":\"𝕛\",\"Jscr\":\"𝒥\",\"jscr\":\"𝒿\",\"Jsercy\":\"Ј\",\"jsercy\":\"ј\",\"Jukcy\":\"Є\",\"jukcy\":\"є\",\"Kappa\":\"Κ\",\"kappa\":\"κ\",\"kappav\":\"ϰ\",\"Kcedil\":\"Ķ\",\"kcedil\":\"ķ\",\"Kcy\":\"К\",\"kcy\":\"к\",\"Kfr\":\"𝔎\",\"kfr\":\"𝔨\",\"kgreen\":\"ĸ\",\"KHcy\":\"Х\",\"khcy\":\"х\",\"KJcy\":\"Ќ\",\"kjcy\":\"ќ\",\"Kopf\":\"𝕂\",\"kopf\":\"𝕜\",\"Kscr\":\"𝒦\",\"kscr\":\"𝓀\",\"lAarr\":\"⇚\",\"Lacute\":\"Ĺ\",\"lacute\":\"ĺ\",\"laemptyv\":\"⦴\",\"lagran\":\"ℒ\",\"Lambda\":\"Λ\",\"lambda\":\"λ\",\"lang\":\"⟨\",\"Lang\":\"⟪\",\"langd\":\"⦑\",\"langle\":\"⟨\",\"lap\":\"⪅\",\"Laplacetrf\":\"ℒ\",\"laquo\":\"«\",\"larrb\":\"⇤\",\"larrbfs\":\"⤟\",\"larr\":\"←\",\"Larr\":\"↞\",\"lArr\":\"⇐\",\"larrfs\":\"⤝\",\"larrhk\":\"↩\",\"larrlp\":\"↫\",\"larrpl\":\"⤹\",\"larrsim\":\"⥳\",\"larrtl\":\"↢\",\"latail\":\"⤙\",\"lAtail\":\"⤛\",\"lat\":\"⪫\",\"late\":\"⪭\",\"lates\":\"⪭︀\",\"lbarr\":\"⤌\",\"lBarr\":\"⤎\",\"lbbrk\":\"❲\",\"lbrace\":\"{\",\"lbrack\":\"[\",\"lbrke\":\"⦋\",\"lbrksld\":\"⦏\",\"lbrkslu\":\"⦍\",\"Lcaron\":\"Ľ\",\"lcaron\":\"ľ\",\"Lcedil\":\"Ļ\",\"lcedil\":\"ļ\",\"lceil\":\"⌈\",\"lcub\":\"{\",\"Lcy\":\"Л\",\"lcy\":\"л\",\"ldca\":\"⤶\",\"ldquo\":\"“\",\"ldquor\":\"„\",\"ldrdhar\":\"⥧\",\"ldrushar\":\"⥋\",\"ldsh\":\"↲\",\"le\":\"≤\",\"lE\":\"≦\",\"LeftAngleBracket\":\"⟨\",\"LeftArrowBar\":\"⇤\",\"leftarrow\":\"←\",\"LeftArrow\":\"←\",\"Leftarrow\":\"⇐\",\"LeftArrowRightArrow\":\"⇆\",\"leftarrowtail\":\"↢\",\"LeftCeiling\":\"⌈\",\"LeftDoubleBracket\":\"⟦\",\"LeftDownTeeVector\":\"⥡\",\"LeftDownVectorBar\":\"⥙\",\"LeftDownVector\":\"⇃\",\"LeftFloor\":\"⌊\",\"leftharpoondown\":\"↽\",\"leftharpoonup\":\"↼\",\"leftleftarrows\":\"⇇\",\"leftrightarrow\":\"↔\",\"LeftRightArrow\":\"↔\",\"Leftrightarrow\":\"⇔\",\"leftrightarrows\":\"⇆\",\"leftrightharpoons\":\"⇋\",\"leftrightsquigarrow\":\"↭\",\"LeftRightVector\":\"⥎\",\"LeftTeeArrow\":\"↤\",\"LeftTee\":\"⊣\",\"LeftTeeVector\":\"⥚\",\"leftthreetimes\":\"⋋\",\"LeftTriangleBar\":\"⧏\",\"LeftTriangle\":\"⊲\",\"LeftTriangleEqual\":\"⊴\",\"LeftUpDownVector\":\"⥑\",\"LeftUpTeeVector\":\"⥠\",\"LeftUpVectorBar\":\"⥘\",\"LeftUpVector\":\"↿\",\"LeftVectorBar\":\"⥒\",\"LeftVector\":\"↼\",\"lEg\":\"⪋\",\"leg\":\"⋚\",\"leq\":\"≤\",\"leqq\":\"≦\",\"leqslant\":\"⩽\",\"lescc\":\"⪨\",\"les\":\"⩽\",\"lesdot\":\"⩿\",\"lesdoto\":\"⪁\",\"lesdotor\":\"⪃\",\"lesg\":\"⋚︀\",\"lesges\":\"⪓\",\"lessapprox\":\"⪅\",\"lessdot\":\"⋖\",\"lesseqgtr\":\"⋚\",\"lesseqqgtr\":\"⪋\",\"LessEqualGreater\":\"⋚\",\"LessFullEqual\":\"≦\",\"LessGreater\":\"≶\",\"lessgtr\":\"≶\",\"LessLess\":\"⪡\",\"lesssim\":\"≲\",\"LessSlantEqual\":\"⩽\",\"LessTilde\":\"≲\",\"lfisht\":\"⥼\",\"lfloor\":\"⌊\",\"Lfr\":\"𝔏\",\"lfr\":\"𝔩\",\"lg\":\"≶\",\"lgE\":\"⪑\",\"lHar\":\"⥢\",\"lhard\":\"↽\",\"lharu\":\"↼\",\"lharul\":\"⥪\",\"lhblk\":\"▄\",\"LJcy\":\"Љ\",\"ljcy\":\"љ\",\"llarr\":\"⇇\",\"ll\":\"≪\",\"Ll\":\"⋘\",\"llcorner\":\"⌞\",\"Lleftarrow\":\"⇚\",\"llhard\":\"⥫\",\"lltri\":\"◺\",\"Lmidot\":\"Ŀ\",\"lmidot\":\"ŀ\",\"lmoustache\":\"⎰\",\"lmoust\":\"⎰\",\"lnap\":\"⪉\",\"lnapprox\":\"⪉\",\"lne\":\"⪇\",\"lnE\":\"≨\",\"lneq\":\"⪇\",\"lneqq\":\"≨\",\"lnsim\":\"⋦\",\"loang\":\"⟬\",\"loarr\":\"⇽\",\"lobrk\":\"⟦\",\"longleftarrow\":\"⟵\",\"LongLeftArrow\":\"⟵\",\"Longleftarrow\":\"⟸\",\"longleftrightarrow\":\"⟷\",\"LongLeftRightArrow\":\"⟷\",\"Longleftrightarrow\":\"⟺\",\"longmapsto\":\"⟼\",\"longrightarrow\":\"⟶\",\"LongRightArrow\":\"⟶\",\"Longrightarrow\":\"⟹\",\"looparrowleft\":\"↫\",\"looparrowright\":\"↬\",\"lopar\":\"⦅\",\"Lopf\":\"𝕃\",\"lopf\":\"𝕝\",\"loplus\":\"⨭\",\"lotimes\":\"⨴\",\"lowast\":\"∗\",\"lowbar\":\"_\",\"LowerLeftArrow\":\"↙\",\"LowerRightArrow\":\"↘\",\"loz\":\"◊\",\"lozenge\":\"◊\",\"lozf\":\"⧫\",\"lpar\":\"(\",\"lparlt\":\"⦓\",\"lrarr\":\"⇆\",\"lrcorner\":\"⌟\",\"lrhar\":\"⇋\",\"lrhard\":\"⥭\",\"lrm\":\"‎\",\"lrtri\":\"⊿\",\"lsaquo\":\"‹\",\"lscr\":\"𝓁\",\"Lscr\":\"ℒ\",\"lsh\":\"↰\",\"Lsh\":\"↰\",\"lsim\":\"≲\",\"lsime\":\"⪍\",\"lsimg\":\"⪏\",\"lsqb\":\"[\",\"lsquo\":\"‘\",\"lsquor\":\"‚\",\"Lstrok\":\"Ł\",\"lstrok\":\"ł\",\"ltcc\":\"⪦\",\"ltcir\":\"⩹\",\"lt\":\"<\",\"LT\":\"<\",\"Lt\":\"≪\",\"ltdot\":\"⋖\",\"lthree\":\"⋋\",\"ltimes\":\"⋉\",\"ltlarr\":\"⥶\",\"ltquest\":\"⩻\",\"ltri\":\"◃\",\"ltrie\":\"⊴\",\"ltrif\":\"◂\",\"ltrPar\":\"⦖\",\"lurdshar\":\"⥊\",\"luruhar\":\"⥦\",\"lvertneqq\":\"≨︀\",\"lvnE\":\"≨︀\",\"macr\":\"¯\",\"male\":\"♂\",\"malt\":\"✠\",\"maltese\":\"✠\",\"Map\":\"⤅\",\"map\":\"↦\",\"mapsto\":\"↦\",\"mapstodown\":\"↧\",\"mapstoleft\":\"↤\",\"mapstoup\":\"↥\",\"marker\":\"▮\",\"mcomma\":\"⨩\",\"Mcy\":\"М\",\"mcy\":\"м\",\"mdash\":\"—\",\"mDDot\":\"∺\",\"measuredangle\":\"∡\",\"MediumSpace\":\" \",\"Mellintrf\":\"ℳ\",\"Mfr\":\"𝔐\",\"mfr\":\"𝔪\",\"mho\":\"℧\",\"micro\":\"µ\",\"midast\":\"*\",\"midcir\":\"⫰\",\"mid\":\"∣\",\"middot\":\"·\",\"minusb\":\"⊟\",\"minus\":\"−\",\"minusd\":\"∸\",\"minusdu\":\"⨪\",\"MinusPlus\":\"∓\",\"mlcp\":\"⫛\",\"mldr\":\"…\",\"mnplus\":\"∓\",\"models\":\"⊧\",\"Mopf\":\"𝕄\",\"mopf\":\"𝕞\",\"mp\":\"∓\",\"mscr\":\"𝓂\",\"Mscr\":\"ℳ\",\"mstpos\":\"∾\",\"Mu\":\"Μ\",\"mu\":\"μ\",\"multimap\":\"⊸\",\"mumap\":\"⊸\",\"nabla\":\"∇\",\"Nacute\":\"Ń\",\"nacute\":\"ń\",\"nang\":\"∠⃒\",\"nap\":\"≉\",\"napE\":\"⩰̸\",\"napid\":\"≋̸\",\"napos\":\"ŉ\",\"napprox\":\"≉\",\"natural\":\"♮\",\"naturals\":\"ℕ\",\"natur\":\"♮\",\"nbsp\":\" \",\"nbump\":\"≎̸\",\"nbumpe\":\"≏̸\",\"ncap\":\"⩃\",\"Ncaron\":\"Ň\",\"ncaron\":\"ň\",\"Ncedil\":\"Ņ\",\"ncedil\":\"ņ\",\"ncong\":\"≇\",\"ncongdot\":\"⩭̸\",\"ncup\":\"⩂\",\"Ncy\":\"Н\",\"ncy\":\"н\",\"ndash\":\"–\",\"nearhk\":\"⤤\",\"nearr\":\"↗\",\"neArr\":\"⇗\",\"nearrow\":\"↗\",\"ne\":\"≠\",\"nedot\":\"≐̸\",\"NegativeMediumSpace\":\"​\",\"NegativeThickSpace\":\"​\",\"NegativeThinSpace\":\"​\",\"NegativeVeryThinSpace\":\"​\",\"nequiv\":\"≢\",\"nesear\":\"⤨\",\"nesim\":\"≂̸\",\"NestedGreaterGreater\":\"≫\",\"NestedLessLess\":\"≪\",\"NewLine\":\"\\n\",\"nexist\":\"∄\",\"nexists\":\"∄\",\"Nfr\":\"𝔑\",\"nfr\":\"𝔫\",\"ngE\":\"≧̸\",\"nge\":\"≱\",\"ngeq\":\"≱\",\"ngeqq\":\"≧̸\",\"ngeqslant\":\"⩾̸\",\"nges\":\"⩾̸\",\"nGg\":\"⋙̸\",\"ngsim\":\"≵\",\"nGt\":\"≫⃒\",\"ngt\":\"≯\",\"ngtr\":\"≯\",\"nGtv\":\"≫̸\",\"nharr\":\"↮\",\"nhArr\":\"⇎\",\"nhpar\":\"⫲\",\"ni\":\"∋\",\"nis\":\"⋼\",\"nisd\":\"⋺\",\"niv\":\"∋\",\"NJcy\":\"Њ\",\"njcy\":\"њ\",\"nlarr\":\"↚\",\"nlArr\":\"⇍\",\"nldr\":\"‥\",\"nlE\":\"≦̸\",\"nle\":\"≰\",\"nleftarrow\":\"↚\",\"nLeftarrow\":\"⇍\",\"nleftrightarrow\":\"↮\",\"nLeftrightarrow\":\"⇎\",\"nleq\":\"≰\",\"nleqq\":\"≦̸\",\"nleqslant\":\"⩽̸\",\"nles\":\"⩽̸\",\"nless\":\"≮\",\"nLl\":\"⋘̸\",\"nlsim\":\"≴\",\"nLt\":\"≪⃒\",\"nlt\":\"≮\",\"nltri\":\"⋪\",\"nltrie\":\"⋬\",\"nLtv\":\"≪̸\",\"nmid\":\"∤\",\"NoBreak\":\"⁠\",\"NonBreakingSpace\":\" \",\"nopf\":\"𝕟\",\"Nopf\":\"ℕ\",\"Not\":\"⫬\",\"not\":\"¬\",\"NotCongruent\":\"≢\",\"NotCupCap\":\"≭\",\"NotDoubleVerticalBar\":\"∦\",\"NotElement\":\"∉\",\"NotEqual\":\"≠\",\"NotEqualTilde\":\"≂̸\",\"NotExists\":\"∄\",\"NotGreater\":\"≯\",\"NotGreaterEqual\":\"≱\",\"NotGreaterFullEqual\":\"≧̸\",\"NotGreaterGreater\":\"≫̸\",\"NotGreaterLess\":\"≹\",\"NotGreaterSlantEqual\":\"⩾̸\",\"NotGreaterTilde\":\"≵\",\"NotHumpDownHump\":\"≎̸\",\"NotHumpEqual\":\"≏̸\",\"notin\":\"∉\",\"notindot\":\"⋵̸\",\"notinE\":\"⋹̸\",\"notinva\":\"∉\",\"notinvb\":\"⋷\",\"notinvc\":\"⋶\",\"NotLeftTriangleBar\":\"⧏̸\",\"NotLeftTriangle\":\"⋪\",\"NotLeftTriangleEqual\":\"⋬\",\"NotLess\":\"≮\",\"NotLessEqual\":\"≰\",\"NotLessGreater\":\"≸\",\"NotLessLess\":\"≪̸\",\"NotLessSlantEqual\":\"⩽̸\",\"NotLessTilde\":\"≴\",\"NotNestedGreaterGreater\":\"⪢̸\",\"NotNestedLessLess\":\"⪡̸\",\"notni\":\"∌\",\"notniva\":\"∌\",\"notnivb\":\"⋾\",\"notnivc\":\"⋽\",\"NotPrecedes\":\"⊀\",\"NotPrecedesEqual\":\"⪯̸\",\"NotPrecedesSlantEqual\":\"⋠\",\"NotReverseElement\":\"∌\",\"NotRightTriangleBar\":\"⧐̸\",\"NotRightTriangle\":\"⋫\",\"NotRightTriangleEqual\":\"⋭\",\"NotSquareSubset\":\"⊏̸\",\"NotSquareSubsetEqual\":\"⋢\",\"NotSquareSuperset\":\"⊐̸\",\"NotSquareSupersetEqual\":\"⋣\",\"NotSubset\":\"⊂⃒\",\"NotSubsetEqual\":\"⊈\",\"NotSucceeds\":\"⊁\",\"NotSucceedsEqual\":\"⪰̸\",\"NotSucceedsSlantEqual\":\"⋡\",\"NotSucceedsTilde\":\"≿̸\",\"NotSuperset\":\"⊃⃒\",\"NotSupersetEqual\":\"⊉\",\"NotTilde\":\"≁\",\"NotTildeEqual\":\"≄\",\"NotTildeFullEqual\":\"≇\",\"NotTildeTilde\":\"≉\",\"NotVerticalBar\":\"∤\",\"nparallel\":\"∦\",\"npar\":\"∦\",\"nparsl\":\"⫽⃥\",\"npart\":\"∂̸\",\"npolint\":\"⨔\",\"npr\":\"⊀\",\"nprcue\":\"⋠\",\"nprec\":\"⊀\",\"npreceq\":\"⪯̸\",\"npre\":\"⪯̸\",\"nrarrc\":\"⤳̸\",\"nrarr\":\"↛\",\"nrArr\":\"⇏\",\"nrarrw\":\"↝̸\",\"nrightarrow\":\"↛\",\"nRightarrow\":\"⇏\",\"nrtri\":\"⋫\",\"nrtrie\":\"⋭\",\"nsc\":\"⊁\",\"nsccue\":\"⋡\",\"nsce\":\"⪰̸\",\"Nscr\":\"𝒩\",\"nscr\":\"𝓃\",\"nshortmid\":\"∤\",\"nshortparallel\":\"∦\",\"nsim\":\"≁\",\"nsime\":\"≄\",\"nsimeq\":\"≄\",\"nsmid\":\"∤\",\"nspar\":\"∦\",\"nsqsube\":\"⋢\",\"nsqsupe\":\"⋣\",\"nsub\":\"⊄\",\"nsubE\":\"⫅̸\",\"nsube\":\"⊈\",\"nsubset\":\"⊂⃒\",\"nsubseteq\":\"⊈\",\"nsubseteqq\":\"⫅̸\",\"nsucc\":\"⊁\",\"nsucceq\":\"⪰̸\",\"nsup\":\"⊅\",\"nsupE\":\"⫆̸\",\"nsupe\":\"⊉\",\"nsupset\":\"⊃⃒\",\"nsupseteq\":\"⊉\",\"nsupseteqq\":\"⫆̸\",\"ntgl\":\"≹\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"ntlg\":\"≸\",\"ntriangleleft\":\"⋪\",\"ntrianglelefteq\":\"⋬\",\"ntriangleright\":\"⋫\",\"ntrianglerighteq\":\"⋭\",\"Nu\":\"Ν\",\"nu\":\"ν\",\"num\":\"#\",\"numero\":\"№\",\"numsp\":\" \",\"nvap\":\"≍⃒\",\"nvdash\":\"⊬\",\"nvDash\":\"⊭\",\"nVdash\":\"⊮\",\"nVDash\":\"⊯\",\"nvge\":\"≥⃒\",\"nvgt\":\">⃒\",\"nvHarr\":\"⤄\",\"nvinfin\":\"⧞\",\"nvlArr\":\"⤂\",\"nvle\":\"≤⃒\",\"nvlt\":\"<⃒\",\"nvltrie\":\"⊴⃒\",\"nvrArr\":\"⤃\",\"nvrtrie\":\"⊵⃒\",\"nvsim\":\"∼⃒\",\"nwarhk\":\"⤣\",\"nwarr\":\"↖\",\"nwArr\":\"⇖\",\"nwarrow\":\"↖\",\"nwnear\":\"⤧\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"oast\":\"⊛\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"ocir\":\"⊚\",\"Ocy\":\"О\",\"ocy\":\"о\",\"odash\":\"⊝\",\"Odblac\":\"Ő\",\"odblac\":\"ő\",\"odiv\":\"⨸\",\"odot\":\"⊙\",\"odsold\":\"⦼\",\"OElig\":\"Œ\",\"oelig\":\"œ\",\"ofcir\":\"⦿\",\"Ofr\":\"𝔒\",\"ofr\":\"𝔬\",\"ogon\":\"˛\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ogt\":\"⧁\",\"ohbar\":\"⦵\",\"ohm\":\"Ω\",\"oint\":\"∮\",\"olarr\":\"↺\",\"olcir\":\"⦾\",\"olcross\":\"⦻\",\"oline\":\"‾\",\"olt\":\"⧀\",\"Omacr\":\"Ō\",\"omacr\":\"ō\",\"Omega\":\"Ω\",\"omega\":\"ω\",\"Omicron\":\"Ο\",\"omicron\":\"ο\",\"omid\":\"⦶\",\"ominus\":\"⊖\",\"Oopf\":\"𝕆\",\"oopf\":\"𝕠\",\"opar\":\"⦷\",\"OpenCurlyDoubleQuote\":\"“\",\"OpenCurlyQuote\":\"‘\",\"operp\":\"⦹\",\"oplus\":\"⊕\",\"orarr\":\"↻\",\"Or\":\"⩔\",\"or\":\"∨\",\"ord\":\"⩝\",\"order\":\"ℴ\",\"orderof\":\"ℴ\",\"ordf\":\"ª\",\"ordm\":\"º\",\"origof\":\"⊶\",\"oror\":\"⩖\",\"orslope\":\"⩗\",\"orv\":\"⩛\",\"oS\":\"Ⓢ\",\"Oscr\":\"𝒪\",\"oscr\":\"ℴ\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"osol\":\"⊘\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"otimesas\":\"⨶\",\"Otimes\":\"⨷\",\"otimes\":\"⊗\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"ovbar\":\"⌽\",\"OverBar\":\"‾\",\"OverBrace\":\"⏞\",\"OverBracket\":\"⎴\",\"OverParenthesis\":\"⏜\",\"para\":\"¶\",\"parallel\":\"∥\",\"par\":\"∥\",\"parsim\":\"⫳\",\"parsl\":\"⫽\",\"part\":\"∂\",\"PartialD\":\"∂\",\"Pcy\":\"П\",\"pcy\":\"п\",\"percnt\":\"%\",\"period\":\".\",\"permil\":\"‰\",\"perp\":\"⊥\",\"pertenk\":\"‱\",\"Pfr\":\"𝔓\",\"pfr\":\"𝔭\",\"Phi\":\"Φ\",\"phi\":\"φ\",\"phiv\":\"ϕ\",\"phmmat\":\"ℳ\",\"phone\":\"☎\",\"Pi\":\"Π\",\"pi\":\"π\",\"pitchfork\":\"⋔\",\"piv\":\"ϖ\",\"planck\":\"ℏ\",\"planckh\":\"ℎ\",\"plankv\":\"ℏ\",\"plusacir\":\"⨣\",\"plusb\":\"⊞\",\"pluscir\":\"⨢\",\"plus\":\"+\",\"plusdo\":\"∔\",\"plusdu\":\"⨥\",\"pluse\":\"⩲\",\"PlusMinus\":\"±\",\"plusmn\":\"±\",\"plussim\":\"⨦\",\"plustwo\":\"⨧\",\"pm\":\"±\",\"Poincareplane\":\"ℌ\",\"pointint\":\"⨕\",\"popf\":\"𝕡\",\"Popf\":\"ℙ\",\"pound\":\"£\",\"prap\":\"⪷\",\"Pr\":\"⪻\",\"pr\":\"≺\",\"prcue\":\"≼\",\"precapprox\":\"⪷\",\"prec\":\"≺\",\"preccurlyeq\":\"≼\",\"Precedes\":\"≺\",\"PrecedesEqual\":\"⪯\",\"PrecedesSlantEqual\":\"≼\",\"PrecedesTilde\":\"≾\",\"preceq\":\"⪯\",\"precnapprox\":\"⪹\",\"precneqq\":\"⪵\",\"precnsim\":\"⋨\",\"pre\":\"⪯\",\"prE\":\"⪳\",\"precsim\":\"≾\",\"prime\":\"′\",\"Prime\":\"″\",\"primes\":\"ℙ\",\"prnap\":\"⪹\",\"prnE\":\"⪵\",\"prnsim\":\"⋨\",\"prod\":\"∏\",\"Product\":\"∏\",\"profalar\":\"⌮\",\"profline\":\"⌒\",\"profsurf\":\"⌓\",\"prop\":\"∝\",\"Proportional\":\"∝\",\"Proportion\":\"∷\",\"propto\":\"∝\",\"prsim\":\"≾\",\"prurel\":\"⊰\",\"Pscr\":\"𝒫\",\"pscr\":\"𝓅\",\"Psi\":\"Ψ\",\"psi\":\"ψ\",\"puncsp\":\" \",\"Qfr\":\"𝔔\",\"qfr\":\"𝔮\",\"qint\":\"⨌\",\"qopf\":\"𝕢\",\"Qopf\":\"ℚ\",\"qprime\":\"⁗\",\"Qscr\":\"𝒬\",\"qscr\":\"𝓆\",\"quaternions\":\"ℍ\",\"quatint\":\"⨖\",\"quest\":\"?\",\"questeq\":\"≟\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"rAarr\":\"⇛\",\"race\":\"∽̱\",\"Racute\":\"Ŕ\",\"racute\":\"ŕ\",\"radic\":\"√\",\"raemptyv\":\"⦳\",\"rang\":\"⟩\",\"Rang\":\"⟫\",\"rangd\":\"⦒\",\"range\":\"⦥\",\"rangle\":\"⟩\",\"raquo\":\"»\",\"rarrap\":\"⥵\",\"rarrb\":\"⇥\",\"rarrbfs\":\"⤠\",\"rarrc\":\"⤳\",\"rarr\":\"→\",\"Rarr\":\"↠\",\"rArr\":\"⇒\",\"rarrfs\":\"⤞\",\"rarrhk\":\"↪\",\"rarrlp\":\"↬\",\"rarrpl\":\"⥅\",\"rarrsim\":\"⥴\",\"Rarrtl\":\"⤖\",\"rarrtl\":\"↣\",\"rarrw\":\"↝\",\"ratail\":\"⤚\",\"rAtail\":\"⤜\",\"ratio\":\"∶\",\"rationals\":\"ℚ\",\"rbarr\":\"⤍\",\"rBarr\":\"⤏\",\"RBarr\":\"⤐\",\"rbbrk\":\"❳\",\"rbrace\":\"}\",\"rbrack\":\"]\",\"rbrke\":\"⦌\",\"rbrksld\":\"⦎\",\"rbrkslu\":\"⦐\",\"Rcaron\":\"Ř\",\"rcaron\":\"ř\",\"Rcedil\":\"Ŗ\",\"rcedil\":\"ŗ\",\"rceil\":\"⌉\",\"rcub\":\"}\",\"Rcy\":\"Р\",\"rcy\":\"р\",\"rdca\":\"⤷\",\"rdldhar\":\"⥩\",\"rdquo\":\"”\",\"rdquor\":\"”\",\"rdsh\":\"↳\",\"real\":\"ℜ\",\"realine\":\"ℛ\",\"realpart\":\"ℜ\",\"reals\":\"ℝ\",\"Re\":\"ℜ\",\"rect\":\"▭\",\"reg\":\"®\",\"REG\":\"®\",\"ReverseElement\":\"∋\",\"ReverseEquilibrium\":\"⇋\",\"ReverseUpEquilibrium\":\"⥯\",\"rfisht\":\"⥽\",\"rfloor\":\"⌋\",\"rfr\":\"𝔯\",\"Rfr\":\"ℜ\",\"rHar\":\"⥤\",\"rhard\":\"⇁\",\"rharu\":\"⇀\",\"rharul\":\"⥬\",\"Rho\":\"Ρ\",\"rho\":\"ρ\",\"rhov\":\"ϱ\",\"RightAngleBracket\":\"⟩\",\"RightArrowBar\":\"⇥\",\"rightarrow\":\"→\",\"RightArrow\":\"→\",\"Rightarrow\":\"⇒\",\"RightArrowLeftArrow\":\"⇄\",\"rightarrowtail\":\"↣\",\"RightCeiling\":\"⌉\",\"RightDoubleBracket\":\"⟧\",\"RightDownTeeVector\":\"⥝\",\"RightDownVectorBar\":\"⥕\",\"RightDownVector\":\"⇂\",\"RightFloor\":\"⌋\",\"rightharpoondown\":\"⇁\",\"rightharpoonup\":\"⇀\",\"rightleftarrows\":\"⇄\",\"rightleftharpoons\":\"⇌\",\"rightrightarrows\":\"⇉\",\"rightsquigarrow\":\"↝\",\"RightTeeArrow\":\"↦\",\"RightTee\":\"⊢\",\"RightTeeVector\":\"⥛\",\"rightthreetimes\":\"⋌\",\"RightTriangleBar\":\"⧐\",\"RightTriangle\":\"⊳\",\"RightTriangleEqual\":\"⊵\",\"RightUpDownVector\":\"⥏\",\"RightUpTeeVector\":\"⥜\",\"RightUpVectorBar\":\"⥔\",\"RightUpVector\":\"↾\",\"RightVectorBar\":\"⥓\",\"RightVector\":\"⇀\",\"ring\":\"˚\",\"risingdotseq\":\"≓\",\"rlarr\":\"⇄\",\"rlhar\":\"⇌\",\"rlm\":\"‏\",\"rmoustache\":\"⎱\",\"rmoust\":\"⎱\",\"rnmid\":\"⫮\",\"roang\":\"⟭\",\"roarr\":\"⇾\",\"robrk\":\"⟧\",\"ropar\":\"⦆\",\"ropf\":\"𝕣\",\"Ropf\":\"ℝ\",\"roplus\":\"⨮\",\"rotimes\":\"⨵\",\"RoundImplies\":\"⥰\",\"rpar\":\")\",\"rpargt\":\"⦔\",\"rppolint\":\"⨒\",\"rrarr\":\"⇉\",\"Rrightarrow\":\"⇛\",\"rsaquo\":\"›\",\"rscr\":\"𝓇\",\"Rscr\":\"ℛ\",\"rsh\":\"↱\",\"Rsh\":\"↱\",\"rsqb\":\"]\",\"rsquo\":\"’\",\"rsquor\":\"’\",\"rthree\":\"⋌\",\"rtimes\":\"⋊\",\"rtri\":\"▹\",\"rtrie\":\"⊵\",\"rtrif\":\"▸\",\"rtriltri\":\"⧎\",\"RuleDelayed\":\"⧴\",\"ruluhar\":\"⥨\",\"rx\":\"℞\",\"Sacute\":\"Ś\",\"sacute\":\"ś\",\"sbquo\":\"‚\",\"scap\":\"⪸\",\"Scaron\":\"Š\",\"scaron\":\"š\",\"Sc\":\"⪼\",\"sc\":\"≻\",\"sccue\":\"≽\",\"sce\":\"⪰\",\"scE\":\"⪴\",\"Scedil\":\"Ş\",\"scedil\":\"ş\",\"Scirc\":\"Ŝ\",\"scirc\":\"ŝ\",\"scnap\":\"⪺\",\"scnE\":\"⪶\",\"scnsim\":\"⋩\",\"scpolint\":\"⨓\",\"scsim\":\"≿\",\"Scy\":\"С\",\"scy\":\"с\",\"sdotb\":\"⊡\",\"sdot\":\"⋅\",\"sdote\":\"⩦\",\"searhk\":\"⤥\",\"searr\":\"↘\",\"seArr\":\"⇘\",\"searrow\":\"↘\",\"sect\":\"§\",\"semi\":\";\",\"seswar\":\"⤩\",\"setminus\":\"∖\",\"setmn\":\"∖\",\"sext\":\"✶\",\"Sfr\":\"𝔖\",\"sfr\":\"𝔰\",\"sfrown\":\"⌢\",\"sharp\":\"♯\",\"SHCHcy\":\"Щ\",\"shchcy\":\"щ\",\"SHcy\":\"Ш\",\"shcy\":\"ш\",\"ShortDownArrow\":\"↓\",\"ShortLeftArrow\":\"←\",\"shortmid\":\"∣\",\"shortparallel\":\"∥\",\"ShortRightArrow\":\"→\",\"ShortUpArrow\":\"↑\",\"shy\":\"­\",\"Sigma\":\"Σ\",\"sigma\":\"σ\",\"sigmaf\":\"ς\",\"sigmav\":\"ς\",\"sim\":\"∼\",\"simdot\":\"⩪\",\"sime\":\"≃\",\"simeq\":\"≃\",\"simg\":\"⪞\",\"simgE\":\"⪠\",\"siml\":\"⪝\",\"simlE\":\"⪟\",\"simne\":\"≆\",\"simplus\":\"⨤\",\"simrarr\":\"⥲\",\"slarr\":\"←\",\"SmallCircle\":\"∘\",\"smallsetminus\":\"∖\",\"smashp\":\"⨳\",\"smeparsl\":\"⧤\",\"smid\":\"∣\",\"smile\":\"⌣\",\"smt\":\"⪪\",\"smte\":\"⪬\",\"smtes\":\"⪬︀\",\"SOFTcy\":\"Ь\",\"softcy\":\"ь\",\"solbar\":\"⌿\",\"solb\":\"⧄\",\"sol\":\"/\",\"Sopf\":\"𝕊\",\"sopf\":\"𝕤\",\"spades\":\"♠\",\"spadesuit\":\"♠\",\"spar\":\"∥\",\"sqcap\":\"⊓\",\"sqcaps\":\"⊓︀\",\"sqcup\":\"⊔\",\"sqcups\":\"⊔︀\",\"Sqrt\":\"√\",\"sqsub\":\"⊏\",\"sqsube\":\"⊑\",\"sqsubset\":\"⊏\",\"sqsubseteq\":\"⊑\",\"sqsup\":\"⊐\",\"sqsupe\":\"⊒\",\"sqsupset\":\"⊐\",\"sqsupseteq\":\"⊒\",\"square\":\"□\",\"Square\":\"□\",\"SquareIntersection\":\"⊓\",\"SquareSubset\":\"⊏\",\"SquareSubsetEqual\":\"⊑\",\"SquareSuperset\":\"⊐\",\"SquareSupersetEqual\":\"⊒\",\"SquareUnion\":\"⊔\",\"squarf\":\"▪\",\"squ\":\"□\",\"squf\":\"▪\",\"srarr\":\"→\",\"Sscr\":\"𝒮\",\"sscr\":\"𝓈\",\"ssetmn\":\"∖\",\"ssmile\":\"⌣\",\"sstarf\":\"⋆\",\"Star\":\"⋆\",\"star\":\"☆\",\"starf\":\"★\",\"straightepsilon\":\"ϵ\",\"straightphi\":\"ϕ\",\"strns\":\"¯\",\"sub\":\"⊂\",\"Sub\":\"⋐\",\"subdot\":\"⪽\",\"subE\":\"⫅\",\"sube\":\"⊆\",\"subedot\":\"⫃\",\"submult\":\"⫁\",\"subnE\":\"⫋\",\"subne\":\"⊊\",\"subplus\":\"⪿\",\"subrarr\":\"⥹\",\"subset\":\"⊂\",\"Subset\":\"⋐\",\"subseteq\":\"⊆\",\"subseteqq\":\"⫅\",\"SubsetEqual\":\"⊆\",\"subsetneq\":\"⊊\",\"subsetneqq\":\"⫋\",\"subsim\":\"⫇\",\"subsub\":\"⫕\",\"subsup\":\"⫓\",\"succapprox\":\"⪸\",\"succ\":\"≻\",\"succcurlyeq\":\"≽\",\"Succeeds\":\"≻\",\"SucceedsEqual\":\"⪰\",\"SucceedsSlantEqual\":\"≽\",\"SucceedsTilde\":\"≿\",\"succeq\":\"⪰\",\"succnapprox\":\"⪺\",\"succneqq\":\"⪶\",\"succnsim\":\"⋩\",\"succsim\":\"≿\",\"SuchThat\":\"∋\",\"sum\":\"∑\",\"Sum\":\"∑\",\"sung\":\"♪\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"sup\":\"⊃\",\"Sup\":\"⋑\",\"supdot\":\"⪾\",\"supdsub\":\"⫘\",\"supE\":\"⫆\",\"supe\":\"⊇\",\"supedot\":\"⫄\",\"Superset\":\"⊃\",\"SupersetEqual\":\"⊇\",\"suphsol\":\"⟉\",\"suphsub\":\"⫗\",\"suplarr\":\"⥻\",\"supmult\":\"⫂\",\"supnE\":\"⫌\",\"supne\":\"⊋\",\"supplus\":\"⫀\",\"supset\":\"⊃\",\"Supset\":\"⋑\",\"supseteq\":\"⊇\",\"supseteqq\":\"⫆\",\"supsetneq\":\"⊋\",\"supsetneqq\":\"⫌\",\"supsim\":\"⫈\",\"supsub\":\"⫔\",\"supsup\":\"⫖\",\"swarhk\":\"⤦\",\"swarr\":\"↙\",\"swArr\":\"⇙\",\"swarrow\":\"↙\",\"swnwar\":\"⤪\",\"szlig\":\"ß\",\"Tab\":\"\\t\",\"target\":\"⌖\",\"Tau\":\"Τ\",\"tau\":\"τ\",\"tbrk\":\"⎴\",\"Tcaron\":\"Ť\",\"tcaron\":\"ť\",\"Tcedil\":\"Ţ\",\"tcedil\":\"ţ\",\"Tcy\":\"Т\",\"tcy\":\"т\",\"tdot\":\"⃛\",\"telrec\":\"⌕\",\"Tfr\":\"𝔗\",\"tfr\":\"𝔱\",\"there4\":\"∴\",\"therefore\":\"∴\",\"Therefore\":\"∴\",\"Theta\":\"Θ\",\"theta\":\"θ\",\"thetasym\":\"ϑ\",\"thetav\":\"ϑ\",\"thickapprox\":\"≈\",\"thicksim\":\"∼\",\"ThickSpace\":\"  \",\"ThinSpace\":\" \",\"thinsp\":\" \",\"thkap\":\"≈\",\"thksim\":\"∼\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"tilde\":\"˜\",\"Tilde\":\"∼\",\"TildeEqual\":\"≃\",\"TildeFullEqual\":\"≅\",\"TildeTilde\":\"≈\",\"timesbar\":\"⨱\",\"timesb\":\"⊠\",\"times\":\"×\",\"timesd\":\"⨰\",\"tint\":\"∭\",\"toea\":\"⤨\",\"topbot\":\"⌶\",\"topcir\":\"⫱\",\"top\":\"⊤\",\"Topf\":\"𝕋\",\"topf\":\"𝕥\",\"topfork\":\"⫚\",\"tosa\":\"⤩\",\"tprime\":\"‴\",\"trade\":\"™\",\"TRADE\":\"™\",\"triangle\":\"▵\",\"triangledown\":\"▿\",\"triangleleft\":\"◃\",\"trianglelefteq\":\"⊴\",\"triangleq\":\"≜\",\"triangleright\":\"▹\",\"trianglerighteq\":\"⊵\",\"tridot\":\"◬\",\"trie\":\"≜\",\"triminus\":\"⨺\",\"TripleDot\":\"⃛\",\"triplus\":\"⨹\",\"trisb\":\"⧍\",\"tritime\":\"⨻\",\"trpezium\":\"⏢\",\"Tscr\":\"𝒯\",\"tscr\":\"𝓉\",\"TScy\":\"Ц\",\"tscy\":\"ц\",\"TSHcy\":\"Ћ\",\"tshcy\":\"ћ\",\"Tstrok\":\"Ŧ\",\"tstrok\":\"ŧ\",\"twixt\":\"≬\",\"twoheadleftarrow\":\"↞\",\"twoheadrightarrow\":\"↠\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"uarr\":\"↑\",\"Uarr\":\"↟\",\"uArr\":\"⇑\",\"Uarrocir\":\"⥉\",\"Ubrcy\":\"Ў\",\"ubrcy\":\"ў\",\"Ubreve\":\"Ŭ\",\"ubreve\":\"ŭ\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ucy\":\"У\",\"ucy\":\"у\",\"udarr\":\"⇅\",\"Udblac\":\"Ű\",\"udblac\":\"ű\",\"udhar\":\"⥮\",\"ufisht\":\"⥾\",\"Ufr\":\"𝔘\",\"ufr\":\"𝔲\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uHar\":\"⥣\",\"uharl\":\"↿\",\"uharr\":\"↾\",\"uhblk\":\"▀\",\"ulcorn\":\"⌜\",\"ulcorner\":\"⌜\",\"ulcrop\":\"⌏\",\"ultri\":\"◸\",\"Umacr\":\"Ū\",\"umacr\":\"ū\",\"uml\":\"¨\",\"UnderBar\":\"_\",\"UnderBrace\":\"⏟\",\"UnderBracket\":\"⎵\",\"UnderParenthesis\":\"⏝\",\"Union\":\"⋃\",\"UnionPlus\":\"⊎\",\"Uogon\":\"Ų\",\"uogon\":\"ų\",\"Uopf\":\"𝕌\",\"uopf\":\"𝕦\",\"UpArrowBar\":\"⤒\",\"uparrow\":\"↑\",\"UpArrow\":\"↑\",\"Uparrow\":\"⇑\",\"UpArrowDownArrow\":\"⇅\",\"updownarrow\":\"↕\",\"UpDownArrow\":\"↕\",\"Updownarrow\":\"⇕\",\"UpEquilibrium\":\"⥮\",\"upharpoonleft\":\"↿\",\"upharpoonright\":\"↾\",\"uplus\":\"⊎\",\"UpperLeftArrow\":\"↖\",\"UpperRightArrow\":\"↗\",\"upsi\":\"υ\",\"Upsi\":\"ϒ\",\"upsih\":\"ϒ\",\"Upsilon\":\"Υ\",\"upsilon\":\"υ\",\"UpTeeArrow\":\"↥\",\"UpTee\":\"⊥\",\"upuparrows\":\"⇈\",\"urcorn\":\"⌝\",\"urcorner\":\"⌝\",\"urcrop\":\"⌎\",\"Uring\":\"Ů\",\"uring\":\"ů\",\"urtri\":\"◹\",\"Uscr\":\"𝒰\",\"uscr\":\"𝓊\",\"utdot\":\"⋰\",\"Utilde\":\"Ũ\",\"utilde\":\"ũ\",\"utri\":\"▵\",\"utrif\":\"▴\",\"uuarr\":\"⇈\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"uwangle\":\"⦧\",\"vangrt\":\"⦜\",\"varepsilon\":\"ϵ\",\"varkappa\":\"ϰ\",\"varnothing\":\"∅\",\"varphi\":\"ϕ\",\"varpi\":\"ϖ\",\"varpropto\":\"∝\",\"varr\":\"↕\",\"vArr\":\"⇕\",\"varrho\":\"ϱ\",\"varsigma\":\"ς\",\"varsubsetneq\":\"⊊︀\",\"varsubsetneqq\":\"⫋︀\",\"varsupsetneq\":\"⊋︀\",\"varsupsetneqq\":\"⫌︀\",\"vartheta\":\"ϑ\",\"vartriangleleft\":\"⊲\",\"vartriangleright\":\"⊳\",\"vBar\":\"⫨\",\"Vbar\":\"⫫\",\"vBarv\":\"⫩\",\"Vcy\":\"В\",\"vcy\":\"в\",\"vdash\":\"⊢\",\"vDash\":\"⊨\",\"Vdash\":\"⊩\",\"VDash\":\"⊫\",\"Vdashl\":\"⫦\",\"veebar\":\"⊻\",\"vee\":\"∨\",\"Vee\":\"⋁\",\"veeeq\":\"≚\",\"vellip\":\"⋮\",\"verbar\":\"|\",\"Verbar\":\"‖\",\"vert\":\"|\",\"Vert\":\"‖\",\"VerticalBar\":\"∣\",\"VerticalLine\":\"|\",\"VerticalSeparator\":\"❘\",\"VerticalTilde\":\"≀\",\"VeryThinSpace\":\" \",\"Vfr\":\"𝔙\",\"vfr\":\"𝔳\",\"vltri\":\"⊲\",\"vnsub\":\"⊂⃒\",\"vnsup\":\"⊃⃒\",\"Vopf\":\"𝕍\",\"vopf\":\"𝕧\",\"vprop\":\"∝\",\"vrtri\":\"⊳\",\"Vscr\":\"𝒱\",\"vscr\":\"𝓋\",\"vsubnE\":\"⫋︀\",\"vsubne\":\"⊊︀\",\"vsupnE\":\"⫌︀\",\"vsupne\":\"⊋︀\",\"Vvdash\":\"⊪\",\"vzigzag\":\"⦚\",\"Wcirc\":\"Ŵ\",\"wcirc\":\"ŵ\",\"wedbar\":\"⩟\",\"wedge\":\"∧\",\"Wedge\":\"⋀\",\"wedgeq\":\"≙\",\"weierp\":\"℘\",\"Wfr\":\"𝔚\",\"wfr\":\"𝔴\",\"Wopf\":\"𝕎\",\"wopf\":\"𝕨\",\"wp\":\"℘\",\"wr\":\"≀\",\"wreath\":\"≀\",\"Wscr\":\"𝒲\",\"wscr\":\"𝓌\",\"xcap\":\"⋂\",\"xcirc\":\"◯\",\"xcup\":\"⋃\",\"xdtri\":\"▽\",\"Xfr\":\"𝔛\",\"xfr\":\"𝔵\",\"xharr\":\"⟷\",\"xhArr\":\"⟺\",\"Xi\":\"Ξ\",\"xi\":\"ξ\",\"xlarr\":\"⟵\",\"xlArr\":\"⟸\",\"xmap\":\"⟼\",\"xnis\":\"⋻\",\"xodot\":\"⨀\",\"Xopf\":\"𝕏\",\"xopf\":\"𝕩\",\"xoplus\":\"⨁\",\"xotime\":\"⨂\",\"xrarr\":\"⟶\",\"xrArr\":\"⟹\",\"Xscr\":\"𝒳\",\"xscr\":\"𝓍\",\"xsqcup\":\"⨆\",\"xuplus\":\"⨄\",\"xutri\":\"△\",\"xvee\":\"⋁\",\"xwedge\":\"⋀\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"YAcy\":\"Я\",\"yacy\":\"я\",\"Ycirc\":\"Ŷ\",\"ycirc\":\"ŷ\",\"Ycy\":\"Ы\",\"ycy\":\"ы\",\"yen\":\"¥\",\"Yfr\":\"𝔜\",\"yfr\":\"𝔶\",\"YIcy\":\"Ї\",\"yicy\":\"ї\",\"Yopf\":\"𝕐\",\"yopf\":\"𝕪\",\"Yscr\":\"𝒴\",\"yscr\":\"𝓎\",\"YUcy\":\"Ю\",\"yucy\":\"ю\",\"yuml\":\"ÿ\",\"Yuml\":\"Ÿ\",\"Zacute\":\"Ź\",\"zacute\":\"ź\",\"Zcaron\":\"Ž\",\"zcaron\":\"ž\",\"Zcy\":\"З\",\"zcy\":\"з\",\"Zdot\":\"Ż\",\"zdot\":\"ż\",\"zeetrf\":\"ℨ\",\"ZeroWidthSpace\":\"​\",\"Zeta\":\"Ζ\",\"zeta\":\"ζ\",\"zfr\":\"𝔷\",\"Zfr\":\"ℨ\",\"ZHcy\":\"Ж\",\"zhcy\":\"ж\",\"zigrarr\":\"⇝\",\"zopf\":\"𝕫\",\"Zopf\":\"ℤ\",\"Zscr\":\"𝒵\",\"zscr\":\"𝓏\",\"zwj\":\"‍\",\"zwnj\":\"‌\"}");

/***/ }),

/***/ "./node_modules/entities/lib/maps/legacy.json":
/*!****************************************************!*\
  !*** ./node_modules/entities/lib/maps/legacy.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"Agrave\":\"À\",\"agrave\":\"à\",\"amp\":\"&\",\"AMP\":\"&\",\"Aring\":\"Å\",\"aring\":\"å\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"brvbar\":\"¦\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"cedil\":\"¸\",\"cent\":\"¢\",\"copy\":\"©\",\"COPY\":\"©\",\"curren\":\"¤\",\"deg\":\"°\",\"divide\":\"÷\",\"Eacute\":\"É\",\"eacute\":\"é\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"Egrave\":\"È\",\"egrave\":\"è\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"frac12\":\"½\",\"frac14\":\"¼\",\"frac34\":\"¾\",\"gt\":\">\",\"GT\":\">\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"iexcl\":\"¡\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"iquest\":\"¿\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"laquo\":\"«\",\"lt\":\"<\",\"LT\":\"<\",\"macr\":\"¯\",\"micro\":\"µ\",\"middot\":\"·\",\"nbsp\":\" \",\"not\":\"¬\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ordf\":\"ª\",\"ordm\":\"º\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"para\":\"¶\",\"plusmn\":\"±\",\"pound\":\"£\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"raquo\":\"»\",\"reg\":\"®\",\"REG\":\"®\",\"sect\":\"§\",\"shy\":\"­\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"szlig\":\"ß\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"times\":\"×\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uml\":\"¨\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"yen\":\"¥\",\"yuml\":\"ÿ\"}");

/***/ }),

/***/ "./node_modules/entities/lib/maps/xml.json":
/*!*************************************************!*\
  !*** ./node_modules/entities/lib/maps/xml.json ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"amp\":\"&\",\"apos\":\"'\",\"gt\":\">\",\"lt\":\"<\",\"quot\":\"\\\"\"}");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/react-html-parser/lib/HtmlParser.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-html-parser/lib/HtmlParser.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = HtmlParser;

var _htmlparser = __webpack_require__(/*! htmlparser2 */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _processNodes = __webpack_require__(/*! ./processNodes */ "./node_modules/react-html-parser/lib/processNodes.js");

var _processNodes2 = _interopRequireDefault(_processNodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parses a HTML string and returns a list of React components generated from it
 *
 * @param {String} html The HTML to convert into React component
 * @param {Object} options Options to pass
 * @returns {Array} List of top level React elements
 */
function HtmlParser(html) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$decodeEntities = _ref.decodeEntities,
      decodeEntities = _ref$decodeEntities === undefined ? true : _ref$decodeEntities,
      transform = _ref.transform,
      _ref$preprocessNodes = _ref.preprocessNodes,
      preprocessNodes = _ref$preprocessNodes === undefined ? function (nodes) {
    return nodes;
  } : _ref$preprocessNodes;

  var nodes = preprocessNodes(_htmlparser2.default.parseDOM(html, { decodeEntities: decodeEntities }));
  return (0, _processNodes2.default)(nodes, transform);
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/convertNodeToElement.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/convertNodeToElement.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = convertNodeToElement;

var _elementTypes = __webpack_require__(/*! ./elementTypes */ "./node_modules/react-html-parser/lib/elementTypes/index.js");

var _elementTypes2 = _interopRequireDefault(_elementTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts a htmlparser2 node to a React element
 *
 * @param {Object} node The htmlparser2 node to convert
 * @param {Number} index The index of the current node
 * @param {Function} transform Transform function to apply to children of the node
 * @returns {React.Element}
 */
function convertNodeToElement(node, index, transform) {
  return _elementTypes2.default[node.type](node, index, transform);
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/dom/attributes/BooleanAttributes.js":
/*!********************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/dom/attributes/BooleanAttributes.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * List of boolean attributes
 * These attributes should have their React attribute value set to be the same as their name
 * E.g. <input disabled> = <input disabled>
 *      <input disabled=""> = <input disabled>
 *      <input disabled="disabled"> = <input disabled>
 * @type {Array}
 */
exports.default = ['allowfullScreen', 'async', 'autoplay', 'capture', 'checked', 'controls', 'default', 'defer', 'disabled', 'formnovalidate', 'hidden', 'loop', 'multiple', 'muted', 'novalidate', 'open', 'playsinline', 'readonly', 'required', 'reversed', 'scoped', 'seamless', 'selected', 'itemscope'];

/***/ }),

/***/ "./node_modules/react-html-parser/lib/dom/attributes/ReactAttributes.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/dom/attributes/ReactAttributes.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * Mapping of standard HTML attributes to their React counterparts
 * List taken and reversed from react/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
 * https://github.com/facebook/react/blob/c9c3c339b757682f1154f1c915eb55e6a8766933/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
 * @type {Object}
 */
exports.default = {
  /**
   * Standard Properties
   */
  accept: 'accept',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  allowtransparency: 'allowTransparency',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocomplete: 'autoComplete',
  autoplay: 'autoPlay',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  challenge: 'challenge',
  checked: 'checked',
  cite: 'cite',
  classid: 'classID',
  class: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlsList: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  data: 'data',
  datetime: 'dateTime',
  default: 'default',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  form: 'form',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginheight: 'marginHeight',
  marginwidth: 'marginWidth',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  slot: 'slot',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',
  /**
   * RDFa Properties
   */
  about: 'about',
  datatype: 'datatype',
  inlist: 'inlist',
  prefix: 'prefix',
  property: 'property',
  resource: 'resource',
  typeof: 'typeof',
  vocab: 'vocab',
  /**
   * Non-standard Properties
   */
  autocapitalize: 'autoCapitalize',
  autocorrect: 'autoCorrect',
  autosave: 'autoSave',
  color: 'color',
  itemprop: 'itemProp',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  itemid: 'itemID',
  itemref: 'itemRef',
  results: 'results',
  security: 'security',
  unselectable: 'unselectable'
};

/***/ }),

/***/ "./node_modules/react-html-parser/lib/dom/elements/VoidElements.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/dom/elements/VoidElements.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * List of void elements
 * These elements are not allowed to have children
 * @type {Array}
 */
exports.default = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

/***/ }),

/***/ "./node_modules/react-html-parser/lib/elementTypes/StyleElementType.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/elementTypes/StyleElementType.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = StyleElementType;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _generatePropsFromAttributes = __webpack_require__(/*! ../utils/generatePropsFromAttributes */ "./node_modules/react-html-parser/lib/utils/generatePropsFromAttributes.js");

var _generatePropsFromAttributes2 = _interopRequireDefault(_generatePropsFromAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts a <style> element to a React element
 *
 * @param {Object} node The style node
 * @param {String} index The index of the React element relative to it's parent
 * @returns {React.Element} The React style element
 */
function StyleElementType(node, index) {

  // The style element only ever has a single child which is the styles so try and find this to add as
  // a child to the style element that will be created
  var styles = void 0;
  if (node.children.length > 0) {
    styles = node.children[0].data;
  }

  // generate props
  var props = (0, _generatePropsFromAttributes2.default)(node.attribs, index);

  // create and return the element
  return _react2.default.createElement('style', props, styles);
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/elementTypes/TagElementType.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/elementTypes/TagElementType.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = TagElementType;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _processNodes = __webpack_require__(/*! ../processNodes */ "./node_modules/react-html-parser/lib/processNodes.js");

var _processNodes2 = _interopRequireDefault(_processNodes);

var _generatePropsFromAttributes = __webpack_require__(/*! ../utils/generatePropsFromAttributes */ "./node_modules/react-html-parser/lib/utils/generatePropsFromAttributes.js");

var _generatePropsFromAttributes2 = _interopRequireDefault(_generatePropsFromAttributes);

var _VoidElements = __webpack_require__(/*! ../dom/elements/VoidElements */ "./node_modules/react-html-parser/lib/dom/elements/VoidElements.js");

var _VoidElements2 = _interopRequireDefault(_VoidElements);

var _isValidTagOrAttributeName = __webpack_require__(/*! ../utils/isValidTagOrAttributeName */ "./node_modules/react-html-parser/lib/utils/isValidTagOrAttributeName.js");

var _isValidTagOrAttributeName2 = _interopRequireDefault(_isValidTagOrAttributeName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts any element (excluding style - see StyleElementType - and script) to a react element.
 *
 * @param {Object} node The tag node
 * @param {String} index The index of the React element relative to it's parent
 * @param {Function} transform The transform function to apply to all children
 * @returns {React.Element} The React tag element
 */
function TagElementType(node, index, transform) {

  var tagName = node.name;

  // validate tag name
  if (!(0, _isValidTagOrAttributeName2.default)(tagName)) {
    return null;
  }

  // generate props
  var props = (0, _generatePropsFromAttributes2.default)(node.attribs, index);

  // If the node is not a void element and has children then process them
  var children = null;
  if (_VoidElements2.default.indexOf(tagName) === -1) {
    children = (0, _processNodes2.default)(node.children, transform);
  }

  // create and return the element
  return _react2.default.createElement(tagName, props, children);
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/elementTypes/TextElementType.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/elementTypes/TextElementType.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = TextElementType;
/**
 * Converts a text node to a React text element
 *
 * @param {Object} node The text node
 * @returns {String} The text
 */
function TextElementType(node) {

  // React will accept plain text for rendering so just return the node data
  return node.data;
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/elementTypes/UnsupportedElementType.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/elementTypes/UnsupportedElementType.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = UnsupportedElementType;
/**
 * Handles an unsupported element type by returning null so nothing is rendered
 * @returns {null}
 */
function UnsupportedElementType() {

  // do nothing because the element type is unsupported
  // comment, directive, script, cdata, doctype are all currently unsupported
  return null;
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/elementTypes/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/elementTypes/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _ElementType$Text$Ele;

var _htmlparser = __webpack_require__(/*! htmlparser2 */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js");

var _TextElementType = __webpack_require__(/*! ./TextElementType */ "./node_modules/react-html-parser/lib/elementTypes/TextElementType.js");

var _TextElementType2 = _interopRequireDefault(_TextElementType);

var _TagElementType = __webpack_require__(/*! ./TagElementType */ "./node_modules/react-html-parser/lib/elementTypes/TagElementType.js");

var _TagElementType2 = _interopRequireDefault(_TagElementType);

var _StyleElementType = __webpack_require__(/*! ./StyleElementType */ "./node_modules/react-html-parser/lib/elementTypes/StyleElementType.js");

var _StyleElementType2 = _interopRequireDefault(_StyleElementType);

var _UnsupportedElementType = __webpack_require__(/*! ./UnsupportedElementType */ "./node_modules/react-html-parser/lib/elementTypes/UnsupportedElementType.js");

var _UnsupportedElementType2 = _interopRequireDefault(_UnsupportedElementType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Map each htmlparser2 element type to a function which will convert that element type to a React element
                                                                                                                                                                                                                   * Not all of the element types are supported so the UnsupportedElementType is used for them which will not return any
                                                                                                                                                                                                                   * value
                                                                                                                                                                                                                   */

exports.default = (_ElementType$Text$Ele = {}, _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Text, _TextElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Tag, _TagElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Style, _StyleElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Directive, _UnsupportedElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Comment, _UnsupportedElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Script, _UnsupportedElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.CDATA, _UnsupportedElementType2.default), _defineProperty(_ElementType$Text$Ele, _htmlparser.ElementType.Doctype, _UnsupportedElementType2.default), _ElementType$Text$Ele);

/***/ }),

/***/ "./node_modules/react-html-parser/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-html-parser/lib/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.htmlparser2 = exports.convertNodeToElement = exports.processNodes = undefined;

var _processNodes = __webpack_require__(/*! ./processNodes */ "./node_modules/react-html-parser/lib/processNodes.js");

Object.defineProperty(exports, "processNodes", ({
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_processNodes).default;
  }
}));

var _convertNodeToElement = __webpack_require__(/*! ./convertNodeToElement */ "./node_modules/react-html-parser/lib/convertNodeToElement.js");

Object.defineProperty(exports, "convertNodeToElement", ({
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_convertNodeToElement).default;
  }
}));

var _htmlparser = __webpack_require__(/*! htmlparser2 */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js");

Object.defineProperty(exports, "htmlparser2", ({
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_htmlparser).default;
  }
}));

var _HtmlParser = __webpack_require__(/*! ./HtmlParser */ "./node_modules/react-html-parser/lib/HtmlParser.js");

var _HtmlParser2 = _interopRequireDefault(_HtmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _HtmlParser2.default;

/***/ }),

/***/ "./node_modules/react-html-parser/lib/processNodes.js":
/*!************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/processNodes.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = processNodes;

var _isEmptyTextNode = __webpack_require__(/*! ./utils/isEmptyTextNode */ "./node_modules/react-html-parser/lib/utils/isEmptyTextNode.js");

var _isEmptyTextNode2 = _interopRequireDefault(_isEmptyTextNode);

var _convertNodeToElement = __webpack_require__(/*! ./convertNodeToElement */ "./node_modules/react-html-parser/lib/convertNodeToElement.js");

var _convertNodeToElement2 = _interopRequireDefault(_convertNodeToElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Processes the nodes generated by htmlparser2 and convert them all into React elements
 *
 * @param {Object[]} nodes List of nodes to process
 * @param {Function} transform Transform function to optionally apply to nodes
 * @returns {React.Element[]} The list of processed React elements
 */
function processNodes(nodes, transform) {

  return nodes.filter(function (node) {
    return !(0, _isEmptyTextNode2.default)(node);
  }).map(function (node, index) {

    // return the result of the transform function if applicable
    var transformed = void 0;
    if (typeof transform === 'function') {
      transformed = transform(node, index);
      if (transformed === null || !!transformed) {
        return transformed;
      }
    }

    // otherwise convert the node as standard
    return (0, _convertNodeToElement2.default)(node, index, transform);
  });
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/utils/generatePropsFromAttributes.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/utils/generatePropsFromAttributes.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = generatePropsFromAttributes;

var _htmlAttributesToReact = __webpack_require__(/*! ./htmlAttributesToReact */ "./node_modules/react-html-parser/lib/utils/htmlAttributesToReact.js");

var _htmlAttributesToReact2 = _interopRequireDefault(_htmlAttributesToReact);

var _inlineStyleToObject = __webpack_require__(/*! ./inlineStyleToObject */ "./node_modules/react-html-parser/lib/utils/inlineStyleToObject.js");

var _inlineStyleToObject2 = _interopRequireDefault(_inlineStyleToObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates props for a React element from an object of HTML attributes
 *
 * @param {Object} attributes The HTML attributes
 * @param {String} key The key to give the react element
 */
function generatePropsFromAttributes(attributes, key) {

  // generate props
  var props = _extends({}, (0, _htmlAttributesToReact2.default)(attributes), { key: key });

  // if there is an inline/string style prop then convert it to a React style object
  // otherwise, it is invalid and omitted
  if (typeof props.style === 'string' || props.style instanceof String) {
    props.style = (0, _inlineStyleToObject2.default)(props.style);
  } else {
    delete props.style;
  }

  return props;
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/utils/htmlAttributesToReact.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/utils/htmlAttributesToReact.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = htmlAttributesToReact;

var _BooleanAttributes = __webpack_require__(/*! ../dom/attributes/BooleanAttributes */ "./node_modules/react-html-parser/lib/dom/attributes/BooleanAttributes.js");

var _BooleanAttributes2 = _interopRequireDefault(_BooleanAttributes);

var _ReactAttributes = __webpack_require__(/*! ../dom/attributes/ReactAttributes */ "./node_modules/react-html-parser/lib/dom/attributes/ReactAttributes.js");

var _ReactAttributes2 = _interopRequireDefault(_ReactAttributes);

var _isValidTagOrAttributeName = __webpack_require__(/*! ./isValidTagOrAttributeName */ "./node_modules/react-html-parser/lib/utils/isValidTagOrAttributeName.js");

var _isValidTagOrAttributeName2 = _interopRequireDefault(_isValidTagOrAttributeName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the parsed attribute value taking into account things like boolean attributes
 *
 * @param {String} attribute The name of the attribute
 * @param {*} value The value of the attribute from the HTML
 * @returns {*} The parsed attribute value
 */
var getParsedAttributeValue = function getParsedAttributeValue(attribute, value) {

  // if the attribute if a boolean then it's value should be the same as it's name
  // e.g. disabled="disabled"
  var lowerBooleanAttributes = _BooleanAttributes2.default.map(function (attr) {
    return attr.toLowerCase();
  });
  if (lowerBooleanAttributes.indexOf(attribute.toLowerCase()) >= 0) {
    value = attribute;
  }

  return value;
};

/**
 * Takes an object of standard HTML property names and converts them to their React counterpart. If the react
 * version does not exist for an attribute then just use it as it is
 *
 * @param {Object} attributes The HTML attributes to convert
 * @returns {Object} The React attributes
 */
function htmlAttributesToReact(attributes) {

  return Object.keys(attributes).filter(function (attr) {
    return (0, _isValidTagOrAttributeName2.default)(attr);
  }).reduce(function (mappedAttributes, attribute) {

    // lowercase the attribute name and find it in the react attribute map
    var lowerCaseAttribute = attribute.toLowerCase();

    // format the attribute name
    var name = _ReactAttributes2.default[lowerCaseAttribute] || lowerCaseAttribute;

    // add the parsed attribute value to the mapped attributes
    mappedAttributes[name] = getParsedAttributeValue(name, attributes[attribute]);

    return mappedAttributes;
  }, {});
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/utils/inlineStyleToObject.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/utils/inlineStyleToObject.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = InlineStyleToObject;
/**
 * Converts an inline style string into an object of React style properties
 *
 * @param {String} inlineStyle='' The inline style to convert
 * @returns {Object} The converted style
 */
function InlineStyleToObject() {
  var inlineStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


  // just return empty object if the inlineStyle is empty
  if (inlineStyle === '') {
    return {};
  }

  return inlineStyle.split(';').reduce(function (styleObject, stylePropertyValue) {

    // extract the style property name and value
    var _stylePropertyValue$s = stylePropertyValue.split(/^([^:]+):/).filter(function (val, i) {
      return i > 0;
    }).map(function (item) {
      return item.trim().toLowerCase();
    }),
        _stylePropertyValue$s2 = _slicedToArray(_stylePropertyValue$s, 2),
        property = _stylePropertyValue$s2[0],
        value = _stylePropertyValue$s2[1];

    // if there is no value (i.e. no : in the style) then ignore it


    if (value === undefined) {
      return styleObject;
    }

    // convert the property name into the correct React format
    // remove all hyphens and convert the letter immediately after each hyphen to upper case
    // additionally don't uppercase any -ms- prefix
    // e.g. -ms-style-property = msStyleProperty
    //      -webkit-style-property = WebkitStyleProperty
    property = property.replace(/^-ms-/, 'ms-').replace(/-(.)/g, function (_, character) {
      return character.toUpperCase();
    });

    // add the new style property and value to the style object
    styleObject[property] = value;

    return styleObject;
  }, {});
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/utils/isEmptyTextNode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/utils/isEmptyTextNode.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = isEmptyTextNode;
/**
 * Tests a htmlparser2 node and returns whether is it a text node at the start and end of the line containing only
 * white space. This allows these node types to be excluded from the rendering because they are unnecessary.
 *
 * @param {Object} node The element object as created by htmlparser2
 * @returns {boolean} Whether the node is an empty text node
 */
function isEmptyTextNode(node) {
  return node.type === 'text' && /\r?\n/.test(node.data) && node.data.trim() === '';
}

/***/ }),

/***/ "./node_modules/react-html-parser/lib/utils/isValidTagOrAttributeName.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-html-parser/lib/utils/isValidTagOrAttributeName.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = isValidTagOrAttributeName;
var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;

var nameCache = {};

function isValidTagOrAttributeName(tagName) {
  if (!nameCache.hasOwnProperty(tagName)) {
    nameCache[tagName] = VALID_TAG_REGEX.test(tagName);
  }
  return nameCache[tagName];
}

/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/domhandler/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/domhandler/index.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ElementType = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/index.js");

var re_whitespace = /\s+/g;
var NodePrototype = __webpack_require__(/*! ./lib/node */ "./node_modules/react-html-parser/node_modules/domhandler/lib/node.js");
var ElementPrototype = __webpack_require__(/*! ./lib/element */ "./node_modules/react-html-parser/node_modules/domhandler/lib/element.js");

function DomHandler(callback, options, elementCB){
	if(typeof callback === "object"){
		elementCB = options;
		options = callback;
		callback = null;
	} else if(typeof options === "function"){
		elementCB = options;
		options = defaultOpts;
	}
	this._callback = callback;
	this._options = options || defaultOpts;
	this._elementCB = elementCB;
	this.dom = [];
	this._done = false;
	this._tagStack = [];
	this._parser = this._parser || null;
}

//default options
var defaultOpts = {
	normalizeWhitespace: false, //Replace all whitespace with single spaces
	withStartIndices: false, //Add startIndex properties to nodes
	withEndIndices: false, //Add endIndex properties to nodes
};

DomHandler.prototype.onparserinit = function(parser){
	this._parser = parser;
};

//Resets the handler back to starting state
DomHandler.prototype.onreset = function(){
	DomHandler.call(this, this._callback, this._options, this._elementCB);
};

//Signals the handler that parsing is done
DomHandler.prototype.onend = function(){
	if(this._done) return;
	this._done = true;
	this._parser = null;
	this._handleCallback(null);
};

DomHandler.prototype._handleCallback =
DomHandler.prototype.onerror = function(error){
	if(typeof this._callback === "function"){
		this._callback(error, this.dom);
	} else {
		if(error) throw error;
	}
};

DomHandler.prototype.onclosetag = function(){
	//if(this._tagStack.pop().name !== name) this._handleCallback(Error("Tagname didn't match!"));
	
	var elem = this._tagStack.pop();

	if(this._options.withEndIndices && elem){
		elem.endIndex = this._parser.endIndex;
	}

	if(this._elementCB) this._elementCB(elem);
};

DomHandler.prototype._createDomElement = function(properties){
	if (!this._options.withDomLvl1) return properties;

	var element;
	if (properties.type === "tag") {
		element = Object.create(ElementPrototype);
	} else {
		element = Object.create(NodePrototype);
	}

	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			element[key] = properties[key];
		}
	}

	return element;
};

DomHandler.prototype._addDomElement = function(element){
	var parent = this._tagStack[this._tagStack.length - 1];
	var siblings = parent ? parent.children : this.dom;
	var previousSibling = siblings[siblings.length - 1];

	element.next = null;

	if(this._options.withStartIndices){
		element.startIndex = this._parser.startIndex;
	}
	if(this._options.withEndIndices){
		element.endIndex = this._parser.endIndex;
	}

	if(previousSibling){
		element.prev = previousSibling;
		previousSibling.next = element;
	} else {
		element.prev = null;
	}

	siblings.push(element);
	element.parent = parent || null;
};

DomHandler.prototype.onopentag = function(name, attribs){
	var properties = {
		type: name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag,
		name: name,
		attribs: attribs,
		children: []
	};

	var element = this._createDomElement(properties);

	this._addDomElement(element);

	this._tagStack.push(element);
};

DomHandler.prototype.ontext = function(data){
	//the ignoreWhitespace is officially dropped, but for now,
	//it's an alias for normalizeWhitespace
	var normalize = this._options.normalizeWhitespace || this._options.ignoreWhitespace;

	var lastTag;

	if(!this._tagStack.length && this.dom.length && (lastTag = this.dom[this.dom.length-1]).type === ElementType.Text){
		if(normalize){
			lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
		} else {
			lastTag.data += data;
		}
	} else {
		if(
			this._tagStack.length &&
			(lastTag = this._tagStack[this._tagStack.length - 1]) &&
			(lastTag = lastTag.children[lastTag.children.length - 1]) &&
			lastTag.type === ElementType.Text
		){
			if(normalize){
				lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
			} else {
				lastTag.data += data;
			}
		} else {
			if(normalize){
				data = data.replace(re_whitespace, " ");
			}

			var element = this._createDomElement({
				data: data,
				type: ElementType.Text
			});

			this._addDomElement(element);
		}
	}
};

DomHandler.prototype.oncomment = function(data){
	var lastTag = this._tagStack[this._tagStack.length - 1];

	if(lastTag && lastTag.type === ElementType.Comment){
		lastTag.data += data;
		return;
	}

	var properties = {
		data: data,
		type: ElementType.Comment
	};

	var element = this._createDomElement(properties);

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncdatastart = function(){
	var properties = {
		children: [{
			data: "",
			type: ElementType.Text
		}],
		type: ElementType.CDATA
	};

	var element = this._createDomElement(properties);

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncommentend = DomHandler.prototype.oncdataend = function(){
	this._tagStack.pop();
};

DomHandler.prototype.onprocessinginstruction = function(name, data){
	var element = this._createDomElement({
		name: name,
		data: data,
		type: ElementType.Directive
	});

	this._addDomElement(element);
};

module.exports = DomHandler;


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/domhandler/lib/element.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/domhandler/lib/element.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// DOM-Level-1-compliant structure
var NodePrototype = __webpack_require__(/*! ./node */ "./node_modules/react-html-parser/node_modules/domhandler/lib/node.js");
var ElementPrototype = module.exports = Object.create(NodePrototype);

var domLvl1 = {
	tagName: "name"
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(ElementPrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/domhandler/lib/node.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/domhandler/lib/node.js ***!
  \****************************************************************************/
/***/ ((module) => {

// This object will be used as the prototype for Nodes when creating a
// DOM-Level-1-compliant structure.
var NodePrototype = module.exports = {
	get firstChild() {
		var children = this.children;
		return children && children[0] || null;
	},
	get lastChild() {
		var children = this.children;
		return children && children[children.length - 1] || null;
	},
	get nodeType() {
		return nodeTypes[this.type] || nodeTypes.element;
	}
};

var domLvl1 = {
	tagName: "name",
	childNodes: "children",
	parentNode: "parent",
	previousSibling: "prev",
	nextSibling: "next",
	nodeValue: "data"
};

var nodeTypes = {
	element: 1,
	text: 3,
	cdata: 4,
	comment: 8
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(NodePrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/entities/lib/decode_codepoint.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/entities/lib/decode_codepoint.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var decodeMap = __webpack_require__(/*! ../maps/decode.json */ "./node_modules/react-html-parser/node_modules/entities/maps/decode.json");

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }

    if (codePoint in decodeMap) {
        codePoint = decodeMap[codePoint];
    }

    var output = "";

    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }

    output += String.fromCharCode(codePoint);
    return output;
}


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/entities/maps/decode.json":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/entities/maps/decode.json ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"0\":65533,\"128\":8364,\"130\":8218,\"131\":402,\"132\":8222,\"133\":8230,\"134\":8224,\"135\":8225,\"136\":710,\"137\":8240,\"138\":352,\"139\":8249,\"140\":338,\"142\":381,\"145\":8216,\"146\":8217,\"147\":8220,\"148\":8221,\"149\":8226,\"150\":8211,\"151\":8212,\"152\":732,\"153\":8482,\"154\":353,\"155\":8250,\"156\":339,\"158\":382,\"159\":376}");

/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/entities/maps/entities.json":
/*!*********************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/entities/maps/entities.json ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Abreve\":\"Ă\",\"abreve\":\"ă\",\"ac\":\"∾\",\"acd\":\"∿\",\"acE\":\"∾̳\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"Acy\":\"А\",\"acy\":\"а\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"af\":\"⁡\",\"Afr\":\"𝔄\",\"afr\":\"𝔞\",\"Agrave\":\"À\",\"agrave\":\"à\",\"alefsym\":\"ℵ\",\"aleph\":\"ℵ\",\"Alpha\":\"Α\",\"alpha\":\"α\",\"Amacr\":\"Ā\",\"amacr\":\"ā\",\"amalg\":\"⨿\",\"amp\":\"&\",\"AMP\":\"&\",\"andand\":\"⩕\",\"And\":\"⩓\",\"and\":\"∧\",\"andd\":\"⩜\",\"andslope\":\"⩘\",\"andv\":\"⩚\",\"ang\":\"∠\",\"ange\":\"⦤\",\"angle\":\"∠\",\"angmsdaa\":\"⦨\",\"angmsdab\":\"⦩\",\"angmsdac\":\"⦪\",\"angmsdad\":\"⦫\",\"angmsdae\":\"⦬\",\"angmsdaf\":\"⦭\",\"angmsdag\":\"⦮\",\"angmsdah\":\"⦯\",\"angmsd\":\"∡\",\"angrt\":\"∟\",\"angrtvb\":\"⊾\",\"angrtvbd\":\"⦝\",\"angsph\":\"∢\",\"angst\":\"Å\",\"angzarr\":\"⍼\",\"Aogon\":\"Ą\",\"aogon\":\"ą\",\"Aopf\":\"𝔸\",\"aopf\":\"𝕒\",\"apacir\":\"⩯\",\"ap\":\"≈\",\"apE\":\"⩰\",\"ape\":\"≊\",\"apid\":\"≋\",\"apos\":\"'\",\"ApplyFunction\":\"⁡\",\"approx\":\"≈\",\"approxeq\":\"≊\",\"Aring\":\"Å\",\"aring\":\"å\",\"Ascr\":\"𝒜\",\"ascr\":\"𝒶\",\"Assign\":\"≔\",\"ast\":\"*\",\"asymp\":\"≈\",\"asympeq\":\"≍\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"awconint\":\"∳\",\"awint\":\"⨑\",\"backcong\":\"≌\",\"backepsilon\":\"϶\",\"backprime\":\"‵\",\"backsim\":\"∽\",\"backsimeq\":\"⋍\",\"Backslash\":\"∖\",\"Barv\":\"⫧\",\"barvee\":\"⊽\",\"barwed\":\"⌅\",\"Barwed\":\"⌆\",\"barwedge\":\"⌅\",\"bbrk\":\"⎵\",\"bbrktbrk\":\"⎶\",\"bcong\":\"≌\",\"Bcy\":\"Б\",\"bcy\":\"б\",\"bdquo\":\"„\",\"becaus\":\"∵\",\"because\":\"∵\",\"Because\":\"∵\",\"bemptyv\":\"⦰\",\"bepsi\":\"϶\",\"bernou\":\"ℬ\",\"Bernoullis\":\"ℬ\",\"Beta\":\"Β\",\"beta\":\"β\",\"beth\":\"ℶ\",\"between\":\"≬\",\"Bfr\":\"𝔅\",\"bfr\":\"𝔟\",\"bigcap\":\"⋂\",\"bigcirc\":\"◯\",\"bigcup\":\"⋃\",\"bigodot\":\"⨀\",\"bigoplus\":\"⨁\",\"bigotimes\":\"⨂\",\"bigsqcup\":\"⨆\",\"bigstar\":\"★\",\"bigtriangledown\":\"▽\",\"bigtriangleup\":\"△\",\"biguplus\":\"⨄\",\"bigvee\":\"⋁\",\"bigwedge\":\"⋀\",\"bkarow\":\"⤍\",\"blacklozenge\":\"⧫\",\"blacksquare\":\"▪\",\"blacktriangle\":\"▴\",\"blacktriangledown\":\"▾\",\"blacktriangleleft\":\"◂\",\"blacktriangleright\":\"▸\",\"blank\":\"␣\",\"blk12\":\"▒\",\"blk14\":\"░\",\"blk34\":\"▓\",\"block\":\"█\",\"bne\":\"=⃥\",\"bnequiv\":\"≡⃥\",\"bNot\":\"⫭\",\"bnot\":\"⌐\",\"Bopf\":\"𝔹\",\"bopf\":\"𝕓\",\"bot\":\"⊥\",\"bottom\":\"⊥\",\"bowtie\":\"⋈\",\"boxbox\":\"⧉\",\"boxdl\":\"┐\",\"boxdL\":\"╕\",\"boxDl\":\"╖\",\"boxDL\":\"╗\",\"boxdr\":\"┌\",\"boxdR\":\"╒\",\"boxDr\":\"╓\",\"boxDR\":\"╔\",\"boxh\":\"─\",\"boxH\":\"═\",\"boxhd\":\"┬\",\"boxHd\":\"╤\",\"boxhD\":\"╥\",\"boxHD\":\"╦\",\"boxhu\":\"┴\",\"boxHu\":\"╧\",\"boxhU\":\"╨\",\"boxHU\":\"╩\",\"boxminus\":\"⊟\",\"boxplus\":\"⊞\",\"boxtimes\":\"⊠\",\"boxul\":\"┘\",\"boxuL\":\"╛\",\"boxUl\":\"╜\",\"boxUL\":\"╝\",\"boxur\":\"└\",\"boxuR\":\"╘\",\"boxUr\":\"╙\",\"boxUR\":\"╚\",\"boxv\":\"│\",\"boxV\":\"║\",\"boxvh\":\"┼\",\"boxvH\":\"╪\",\"boxVh\":\"╫\",\"boxVH\":\"╬\",\"boxvl\":\"┤\",\"boxvL\":\"╡\",\"boxVl\":\"╢\",\"boxVL\":\"╣\",\"boxvr\":\"├\",\"boxvR\":\"╞\",\"boxVr\":\"╟\",\"boxVR\":\"╠\",\"bprime\":\"‵\",\"breve\":\"˘\",\"Breve\":\"˘\",\"brvbar\":\"¦\",\"bscr\":\"𝒷\",\"Bscr\":\"ℬ\",\"bsemi\":\"⁏\",\"bsim\":\"∽\",\"bsime\":\"⋍\",\"bsolb\":\"⧅\",\"bsol\":\"\\\\\",\"bsolhsub\":\"⟈\",\"bull\":\"•\",\"bullet\":\"•\",\"bump\":\"≎\",\"bumpE\":\"⪮\",\"bumpe\":\"≏\",\"Bumpeq\":\"≎\",\"bumpeq\":\"≏\",\"Cacute\":\"Ć\",\"cacute\":\"ć\",\"capand\":\"⩄\",\"capbrcup\":\"⩉\",\"capcap\":\"⩋\",\"cap\":\"∩\",\"Cap\":\"⋒\",\"capcup\":\"⩇\",\"capdot\":\"⩀\",\"CapitalDifferentialD\":\"ⅅ\",\"caps\":\"∩︀\",\"caret\":\"⁁\",\"caron\":\"ˇ\",\"Cayleys\":\"ℭ\",\"ccaps\":\"⩍\",\"Ccaron\":\"Č\",\"ccaron\":\"č\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"Ccirc\":\"Ĉ\",\"ccirc\":\"ĉ\",\"Cconint\":\"∰\",\"ccups\":\"⩌\",\"ccupssm\":\"⩐\",\"Cdot\":\"Ċ\",\"cdot\":\"ċ\",\"cedil\":\"¸\",\"Cedilla\":\"¸\",\"cemptyv\":\"⦲\",\"cent\":\"¢\",\"centerdot\":\"·\",\"CenterDot\":\"·\",\"cfr\":\"𝔠\",\"Cfr\":\"ℭ\",\"CHcy\":\"Ч\",\"chcy\":\"ч\",\"check\":\"✓\",\"checkmark\":\"✓\",\"Chi\":\"Χ\",\"chi\":\"χ\",\"circ\":\"ˆ\",\"circeq\":\"≗\",\"circlearrowleft\":\"↺\",\"circlearrowright\":\"↻\",\"circledast\":\"⊛\",\"circledcirc\":\"⊚\",\"circleddash\":\"⊝\",\"CircleDot\":\"⊙\",\"circledR\":\"®\",\"circledS\":\"Ⓢ\",\"CircleMinus\":\"⊖\",\"CirclePlus\":\"⊕\",\"CircleTimes\":\"⊗\",\"cir\":\"○\",\"cirE\":\"⧃\",\"cire\":\"≗\",\"cirfnint\":\"⨐\",\"cirmid\":\"⫯\",\"cirscir\":\"⧂\",\"ClockwiseContourIntegral\":\"∲\",\"CloseCurlyDoubleQuote\":\"”\",\"CloseCurlyQuote\":\"’\",\"clubs\":\"♣\",\"clubsuit\":\"♣\",\"colon\":\":\",\"Colon\":\"∷\",\"Colone\":\"⩴\",\"colone\":\"≔\",\"coloneq\":\"≔\",\"comma\":\",\",\"commat\":\"@\",\"comp\":\"∁\",\"compfn\":\"∘\",\"complement\":\"∁\",\"complexes\":\"ℂ\",\"cong\":\"≅\",\"congdot\":\"⩭\",\"Congruent\":\"≡\",\"conint\":\"∮\",\"Conint\":\"∯\",\"ContourIntegral\":\"∮\",\"copf\":\"𝕔\",\"Copf\":\"ℂ\",\"coprod\":\"∐\",\"Coproduct\":\"∐\",\"copy\":\"©\",\"COPY\":\"©\",\"copysr\":\"℗\",\"CounterClockwiseContourIntegral\":\"∳\",\"crarr\":\"↵\",\"cross\":\"✗\",\"Cross\":\"⨯\",\"Cscr\":\"𝒞\",\"cscr\":\"𝒸\",\"csub\":\"⫏\",\"csube\":\"⫑\",\"csup\":\"⫐\",\"csupe\":\"⫒\",\"ctdot\":\"⋯\",\"cudarrl\":\"⤸\",\"cudarrr\":\"⤵\",\"cuepr\":\"⋞\",\"cuesc\":\"⋟\",\"cularr\":\"↶\",\"cularrp\":\"⤽\",\"cupbrcap\":\"⩈\",\"cupcap\":\"⩆\",\"CupCap\":\"≍\",\"cup\":\"∪\",\"Cup\":\"⋓\",\"cupcup\":\"⩊\",\"cupdot\":\"⊍\",\"cupor\":\"⩅\",\"cups\":\"∪︀\",\"curarr\":\"↷\",\"curarrm\":\"⤼\",\"curlyeqprec\":\"⋞\",\"curlyeqsucc\":\"⋟\",\"curlyvee\":\"⋎\",\"curlywedge\":\"⋏\",\"curren\":\"¤\",\"curvearrowleft\":\"↶\",\"curvearrowright\":\"↷\",\"cuvee\":\"⋎\",\"cuwed\":\"⋏\",\"cwconint\":\"∲\",\"cwint\":\"∱\",\"cylcty\":\"⌭\",\"dagger\":\"†\",\"Dagger\":\"‡\",\"daleth\":\"ℸ\",\"darr\":\"↓\",\"Darr\":\"↡\",\"dArr\":\"⇓\",\"dash\":\"‐\",\"Dashv\":\"⫤\",\"dashv\":\"⊣\",\"dbkarow\":\"⤏\",\"dblac\":\"˝\",\"Dcaron\":\"Ď\",\"dcaron\":\"ď\",\"Dcy\":\"Д\",\"dcy\":\"д\",\"ddagger\":\"‡\",\"ddarr\":\"⇊\",\"DD\":\"ⅅ\",\"dd\":\"ⅆ\",\"DDotrahd\":\"⤑\",\"ddotseq\":\"⩷\",\"deg\":\"°\",\"Del\":\"∇\",\"Delta\":\"Δ\",\"delta\":\"δ\",\"demptyv\":\"⦱\",\"dfisht\":\"⥿\",\"Dfr\":\"𝔇\",\"dfr\":\"𝔡\",\"dHar\":\"⥥\",\"dharl\":\"⇃\",\"dharr\":\"⇂\",\"DiacriticalAcute\":\"´\",\"DiacriticalDot\":\"˙\",\"DiacriticalDoubleAcute\":\"˝\",\"DiacriticalGrave\":\"`\",\"DiacriticalTilde\":\"˜\",\"diam\":\"⋄\",\"diamond\":\"⋄\",\"Diamond\":\"⋄\",\"diamondsuit\":\"♦\",\"diams\":\"♦\",\"die\":\"¨\",\"DifferentialD\":\"ⅆ\",\"digamma\":\"ϝ\",\"disin\":\"⋲\",\"div\":\"÷\",\"divide\":\"÷\",\"divideontimes\":\"⋇\",\"divonx\":\"⋇\",\"DJcy\":\"Ђ\",\"djcy\":\"ђ\",\"dlcorn\":\"⌞\",\"dlcrop\":\"⌍\",\"dollar\":\"$\",\"Dopf\":\"𝔻\",\"dopf\":\"𝕕\",\"Dot\":\"¨\",\"dot\":\"˙\",\"DotDot\":\"⃜\",\"doteq\":\"≐\",\"doteqdot\":\"≑\",\"DotEqual\":\"≐\",\"dotminus\":\"∸\",\"dotplus\":\"∔\",\"dotsquare\":\"⊡\",\"doublebarwedge\":\"⌆\",\"DoubleContourIntegral\":\"∯\",\"DoubleDot\":\"¨\",\"DoubleDownArrow\":\"⇓\",\"DoubleLeftArrow\":\"⇐\",\"DoubleLeftRightArrow\":\"⇔\",\"DoubleLeftTee\":\"⫤\",\"DoubleLongLeftArrow\":\"⟸\",\"DoubleLongLeftRightArrow\":\"⟺\",\"DoubleLongRightArrow\":\"⟹\",\"DoubleRightArrow\":\"⇒\",\"DoubleRightTee\":\"⊨\",\"DoubleUpArrow\":\"⇑\",\"DoubleUpDownArrow\":\"⇕\",\"DoubleVerticalBar\":\"∥\",\"DownArrowBar\":\"⤓\",\"downarrow\":\"↓\",\"DownArrow\":\"↓\",\"Downarrow\":\"⇓\",\"DownArrowUpArrow\":\"⇵\",\"DownBreve\":\"̑\",\"downdownarrows\":\"⇊\",\"downharpoonleft\":\"⇃\",\"downharpoonright\":\"⇂\",\"DownLeftRightVector\":\"⥐\",\"DownLeftTeeVector\":\"⥞\",\"DownLeftVectorBar\":\"⥖\",\"DownLeftVector\":\"↽\",\"DownRightTeeVector\":\"⥟\",\"DownRightVectorBar\":\"⥗\",\"DownRightVector\":\"⇁\",\"DownTeeArrow\":\"↧\",\"DownTee\":\"⊤\",\"drbkarow\":\"⤐\",\"drcorn\":\"⌟\",\"drcrop\":\"⌌\",\"Dscr\":\"𝒟\",\"dscr\":\"𝒹\",\"DScy\":\"Ѕ\",\"dscy\":\"ѕ\",\"dsol\":\"⧶\",\"Dstrok\":\"Đ\",\"dstrok\":\"đ\",\"dtdot\":\"⋱\",\"dtri\":\"▿\",\"dtrif\":\"▾\",\"duarr\":\"⇵\",\"duhar\":\"⥯\",\"dwangle\":\"⦦\",\"DZcy\":\"Џ\",\"dzcy\":\"џ\",\"dzigrarr\":\"⟿\",\"Eacute\":\"É\",\"eacute\":\"é\",\"easter\":\"⩮\",\"Ecaron\":\"Ě\",\"ecaron\":\"ě\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"ecir\":\"≖\",\"ecolon\":\"≕\",\"Ecy\":\"Э\",\"ecy\":\"э\",\"eDDot\":\"⩷\",\"Edot\":\"Ė\",\"edot\":\"ė\",\"eDot\":\"≑\",\"ee\":\"ⅇ\",\"efDot\":\"≒\",\"Efr\":\"𝔈\",\"efr\":\"𝔢\",\"eg\":\"⪚\",\"Egrave\":\"È\",\"egrave\":\"è\",\"egs\":\"⪖\",\"egsdot\":\"⪘\",\"el\":\"⪙\",\"Element\":\"∈\",\"elinters\":\"⏧\",\"ell\":\"ℓ\",\"els\":\"⪕\",\"elsdot\":\"⪗\",\"Emacr\":\"Ē\",\"emacr\":\"ē\",\"empty\":\"∅\",\"emptyset\":\"∅\",\"EmptySmallSquare\":\"◻\",\"emptyv\":\"∅\",\"EmptyVerySmallSquare\":\"▫\",\"emsp13\":\" \",\"emsp14\":\" \",\"emsp\":\" \",\"ENG\":\"Ŋ\",\"eng\":\"ŋ\",\"ensp\":\" \",\"Eogon\":\"Ę\",\"eogon\":\"ę\",\"Eopf\":\"𝔼\",\"eopf\":\"𝕖\",\"epar\":\"⋕\",\"eparsl\":\"⧣\",\"eplus\":\"⩱\",\"epsi\":\"ε\",\"Epsilon\":\"Ε\",\"epsilon\":\"ε\",\"epsiv\":\"ϵ\",\"eqcirc\":\"≖\",\"eqcolon\":\"≕\",\"eqsim\":\"≂\",\"eqslantgtr\":\"⪖\",\"eqslantless\":\"⪕\",\"Equal\":\"⩵\",\"equals\":\"=\",\"EqualTilde\":\"≂\",\"equest\":\"≟\",\"Equilibrium\":\"⇌\",\"equiv\":\"≡\",\"equivDD\":\"⩸\",\"eqvparsl\":\"⧥\",\"erarr\":\"⥱\",\"erDot\":\"≓\",\"escr\":\"ℯ\",\"Escr\":\"ℰ\",\"esdot\":\"≐\",\"Esim\":\"⩳\",\"esim\":\"≂\",\"Eta\":\"Η\",\"eta\":\"η\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"euro\":\"€\",\"excl\":\"!\",\"exist\":\"∃\",\"Exists\":\"∃\",\"expectation\":\"ℰ\",\"exponentiale\":\"ⅇ\",\"ExponentialE\":\"ⅇ\",\"fallingdotseq\":\"≒\",\"Fcy\":\"Ф\",\"fcy\":\"ф\",\"female\":\"♀\",\"ffilig\":\"ﬃ\",\"fflig\":\"ﬀ\",\"ffllig\":\"ﬄ\",\"Ffr\":\"𝔉\",\"ffr\":\"𝔣\",\"filig\":\"ﬁ\",\"FilledSmallSquare\":\"◼\",\"FilledVerySmallSquare\":\"▪\",\"fjlig\":\"fj\",\"flat\":\"♭\",\"fllig\":\"ﬂ\",\"fltns\":\"▱\",\"fnof\":\"ƒ\",\"Fopf\":\"𝔽\",\"fopf\":\"𝕗\",\"forall\":\"∀\",\"ForAll\":\"∀\",\"fork\":\"⋔\",\"forkv\":\"⫙\",\"Fouriertrf\":\"ℱ\",\"fpartint\":\"⨍\",\"frac12\":\"½\",\"frac13\":\"⅓\",\"frac14\":\"¼\",\"frac15\":\"⅕\",\"frac16\":\"⅙\",\"frac18\":\"⅛\",\"frac23\":\"⅔\",\"frac25\":\"⅖\",\"frac34\":\"¾\",\"frac35\":\"⅗\",\"frac38\":\"⅜\",\"frac45\":\"⅘\",\"frac56\":\"⅚\",\"frac58\":\"⅝\",\"frac78\":\"⅞\",\"frasl\":\"⁄\",\"frown\":\"⌢\",\"fscr\":\"𝒻\",\"Fscr\":\"ℱ\",\"gacute\":\"ǵ\",\"Gamma\":\"Γ\",\"gamma\":\"γ\",\"Gammad\":\"Ϝ\",\"gammad\":\"ϝ\",\"gap\":\"⪆\",\"Gbreve\":\"Ğ\",\"gbreve\":\"ğ\",\"Gcedil\":\"Ģ\",\"Gcirc\":\"Ĝ\",\"gcirc\":\"ĝ\",\"Gcy\":\"Г\",\"gcy\":\"г\",\"Gdot\":\"Ġ\",\"gdot\":\"ġ\",\"ge\":\"≥\",\"gE\":\"≧\",\"gEl\":\"⪌\",\"gel\":\"⋛\",\"geq\":\"≥\",\"geqq\":\"≧\",\"geqslant\":\"⩾\",\"gescc\":\"⪩\",\"ges\":\"⩾\",\"gesdot\":\"⪀\",\"gesdoto\":\"⪂\",\"gesdotol\":\"⪄\",\"gesl\":\"⋛︀\",\"gesles\":\"⪔\",\"Gfr\":\"𝔊\",\"gfr\":\"𝔤\",\"gg\":\"≫\",\"Gg\":\"⋙\",\"ggg\":\"⋙\",\"gimel\":\"ℷ\",\"GJcy\":\"Ѓ\",\"gjcy\":\"ѓ\",\"gla\":\"⪥\",\"gl\":\"≷\",\"glE\":\"⪒\",\"glj\":\"⪤\",\"gnap\":\"⪊\",\"gnapprox\":\"⪊\",\"gne\":\"⪈\",\"gnE\":\"≩\",\"gneq\":\"⪈\",\"gneqq\":\"≩\",\"gnsim\":\"⋧\",\"Gopf\":\"𝔾\",\"gopf\":\"𝕘\",\"grave\":\"`\",\"GreaterEqual\":\"≥\",\"GreaterEqualLess\":\"⋛\",\"GreaterFullEqual\":\"≧\",\"GreaterGreater\":\"⪢\",\"GreaterLess\":\"≷\",\"GreaterSlantEqual\":\"⩾\",\"GreaterTilde\":\"≳\",\"Gscr\":\"𝒢\",\"gscr\":\"ℊ\",\"gsim\":\"≳\",\"gsime\":\"⪎\",\"gsiml\":\"⪐\",\"gtcc\":\"⪧\",\"gtcir\":\"⩺\",\"gt\":\">\",\"GT\":\">\",\"Gt\":\"≫\",\"gtdot\":\"⋗\",\"gtlPar\":\"⦕\",\"gtquest\":\"⩼\",\"gtrapprox\":\"⪆\",\"gtrarr\":\"⥸\",\"gtrdot\":\"⋗\",\"gtreqless\":\"⋛\",\"gtreqqless\":\"⪌\",\"gtrless\":\"≷\",\"gtrsim\":\"≳\",\"gvertneqq\":\"≩︀\",\"gvnE\":\"≩︀\",\"Hacek\":\"ˇ\",\"hairsp\":\" \",\"half\":\"½\",\"hamilt\":\"ℋ\",\"HARDcy\":\"Ъ\",\"hardcy\":\"ъ\",\"harrcir\":\"⥈\",\"harr\":\"↔\",\"hArr\":\"⇔\",\"harrw\":\"↭\",\"Hat\":\"^\",\"hbar\":\"ℏ\",\"Hcirc\":\"Ĥ\",\"hcirc\":\"ĥ\",\"hearts\":\"♥\",\"heartsuit\":\"♥\",\"hellip\":\"…\",\"hercon\":\"⊹\",\"hfr\":\"𝔥\",\"Hfr\":\"ℌ\",\"HilbertSpace\":\"ℋ\",\"hksearow\":\"⤥\",\"hkswarow\":\"⤦\",\"hoarr\":\"⇿\",\"homtht\":\"∻\",\"hookleftarrow\":\"↩\",\"hookrightarrow\":\"↪\",\"hopf\":\"𝕙\",\"Hopf\":\"ℍ\",\"horbar\":\"―\",\"HorizontalLine\":\"─\",\"hscr\":\"𝒽\",\"Hscr\":\"ℋ\",\"hslash\":\"ℏ\",\"Hstrok\":\"Ħ\",\"hstrok\":\"ħ\",\"HumpDownHump\":\"≎\",\"HumpEqual\":\"≏\",\"hybull\":\"⁃\",\"hyphen\":\"‐\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"ic\":\"⁣\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"Icy\":\"И\",\"icy\":\"и\",\"Idot\":\"İ\",\"IEcy\":\"Е\",\"iecy\":\"е\",\"iexcl\":\"¡\",\"iff\":\"⇔\",\"ifr\":\"𝔦\",\"Ifr\":\"ℑ\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"ii\":\"ⅈ\",\"iiiint\":\"⨌\",\"iiint\":\"∭\",\"iinfin\":\"⧜\",\"iiota\":\"℩\",\"IJlig\":\"Ĳ\",\"ijlig\":\"ĳ\",\"Imacr\":\"Ī\",\"imacr\":\"ī\",\"image\":\"ℑ\",\"ImaginaryI\":\"ⅈ\",\"imagline\":\"ℐ\",\"imagpart\":\"ℑ\",\"imath\":\"ı\",\"Im\":\"ℑ\",\"imof\":\"⊷\",\"imped\":\"Ƶ\",\"Implies\":\"⇒\",\"incare\":\"℅\",\"in\":\"∈\",\"infin\":\"∞\",\"infintie\":\"⧝\",\"inodot\":\"ı\",\"intcal\":\"⊺\",\"int\":\"∫\",\"Int\":\"∬\",\"integers\":\"ℤ\",\"Integral\":\"∫\",\"intercal\":\"⊺\",\"Intersection\":\"⋂\",\"intlarhk\":\"⨗\",\"intprod\":\"⨼\",\"InvisibleComma\":\"⁣\",\"InvisibleTimes\":\"⁢\",\"IOcy\":\"Ё\",\"iocy\":\"ё\",\"Iogon\":\"Į\",\"iogon\":\"į\",\"Iopf\":\"𝕀\",\"iopf\":\"𝕚\",\"Iota\":\"Ι\",\"iota\":\"ι\",\"iprod\":\"⨼\",\"iquest\":\"¿\",\"iscr\":\"𝒾\",\"Iscr\":\"ℐ\",\"isin\":\"∈\",\"isindot\":\"⋵\",\"isinE\":\"⋹\",\"isins\":\"⋴\",\"isinsv\":\"⋳\",\"isinv\":\"∈\",\"it\":\"⁢\",\"Itilde\":\"Ĩ\",\"itilde\":\"ĩ\",\"Iukcy\":\"І\",\"iukcy\":\"і\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"Jcirc\":\"Ĵ\",\"jcirc\":\"ĵ\",\"Jcy\":\"Й\",\"jcy\":\"й\",\"Jfr\":\"𝔍\",\"jfr\":\"𝔧\",\"jmath\":\"ȷ\",\"Jopf\":\"𝕁\",\"jopf\":\"𝕛\",\"Jscr\":\"𝒥\",\"jscr\":\"𝒿\",\"Jsercy\":\"Ј\",\"jsercy\":\"ј\",\"Jukcy\":\"Є\",\"jukcy\":\"є\",\"Kappa\":\"Κ\",\"kappa\":\"κ\",\"kappav\":\"ϰ\",\"Kcedil\":\"Ķ\",\"kcedil\":\"ķ\",\"Kcy\":\"К\",\"kcy\":\"к\",\"Kfr\":\"𝔎\",\"kfr\":\"𝔨\",\"kgreen\":\"ĸ\",\"KHcy\":\"Х\",\"khcy\":\"х\",\"KJcy\":\"Ќ\",\"kjcy\":\"ќ\",\"Kopf\":\"𝕂\",\"kopf\":\"𝕜\",\"Kscr\":\"𝒦\",\"kscr\":\"𝓀\",\"lAarr\":\"⇚\",\"Lacute\":\"Ĺ\",\"lacute\":\"ĺ\",\"laemptyv\":\"⦴\",\"lagran\":\"ℒ\",\"Lambda\":\"Λ\",\"lambda\":\"λ\",\"lang\":\"⟨\",\"Lang\":\"⟪\",\"langd\":\"⦑\",\"langle\":\"⟨\",\"lap\":\"⪅\",\"Laplacetrf\":\"ℒ\",\"laquo\":\"«\",\"larrb\":\"⇤\",\"larrbfs\":\"⤟\",\"larr\":\"←\",\"Larr\":\"↞\",\"lArr\":\"⇐\",\"larrfs\":\"⤝\",\"larrhk\":\"↩\",\"larrlp\":\"↫\",\"larrpl\":\"⤹\",\"larrsim\":\"⥳\",\"larrtl\":\"↢\",\"latail\":\"⤙\",\"lAtail\":\"⤛\",\"lat\":\"⪫\",\"late\":\"⪭\",\"lates\":\"⪭︀\",\"lbarr\":\"⤌\",\"lBarr\":\"⤎\",\"lbbrk\":\"❲\",\"lbrace\":\"{\",\"lbrack\":\"[\",\"lbrke\":\"⦋\",\"lbrksld\":\"⦏\",\"lbrkslu\":\"⦍\",\"Lcaron\":\"Ľ\",\"lcaron\":\"ľ\",\"Lcedil\":\"Ļ\",\"lcedil\":\"ļ\",\"lceil\":\"⌈\",\"lcub\":\"{\",\"Lcy\":\"Л\",\"lcy\":\"л\",\"ldca\":\"⤶\",\"ldquo\":\"“\",\"ldquor\":\"„\",\"ldrdhar\":\"⥧\",\"ldrushar\":\"⥋\",\"ldsh\":\"↲\",\"le\":\"≤\",\"lE\":\"≦\",\"LeftAngleBracket\":\"⟨\",\"LeftArrowBar\":\"⇤\",\"leftarrow\":\"←\",\"LeftArrow\":\"←\",\"Leftarrow\":\"⇐\",\"LeftArrowRightArrow\":\"⇆\",\"leftarrowtail\":\"↢\",\"LeftCeiling\":\"⌈\",\"LeftDoubleBracket\":\"⟦\",\"LeftDownTeeVector\":\"⥡\",\"LeftDownVectorBar\":\"⥙\",\"LeftDownVector\":\"⇃\",\"LeftFloor\":\"⌊\",\"leftharpoondown\":\"↽\",\"leftharpoonup\":\"↼\",\"leftleftarrows\":\"⇇\",\"leftrightarrow\":\"↔\",\"LeftRightArrow\":\"↔\",\"Leftrightarrow\":\"⇔\",\"leftrightarrows\":\"⇆\",\"leftrightharpoons\":\"⇋\",\"leftrightsquigarrow\":\"↭\",\"LeftRightVector\":\"⥎\",\"LeftTeeArrow\":\"↤\",\"LeftTee\":\"⊣\",\"LeftTeeVector\":\"⥚\",\"leftthreetimes\":\"⋋\",\"LeftTriangleBar\":\"⧏\",\"LeftTriangle\":\"⊲\",\"LeftTriangleEqual\":\"⊴\",\"LeftUpDownVector\":\"⥑\",\"LeftUpTeeVector\":\"⥠\",\"LeftUpVectorBar\":\"⥘\",\"LeftUpVector\":\"↿\",\"LeftVectorBar\":\"⥒\",\"LeftVector\":\"↼\",\"lEg\":\"⪋\",\"leg\":\"⋚\",\"leq\":\"≤\",\"leqq\":\"≦\",\"leqslant\":\"⩽\",\"lescc\":\"⪨\",\"les\":\"⩽\",\"lesdot\":\"⩿\",\"lesdoto\":\"⪁\",\"lesdotor\":\"⪃\",\"lesg\":\"⋚︀\",\"lesges\":\"⪓\",\"lessapprox\":\"⪅\",\"lessdot\":\"⋖\",\"lesseqgtr\":\"⋚\",\"lesseqqgtr\":\"⪋\",\"LessEqualGreater\":\"⋚\",\"LessFullEqual\":\"≦\",\"LessGreater\":\"≶\",\"lessgtr\":\"≶\",\"LessLess\":\"⪡\",\"lesssim\":\"≲\",\"LessSlantEqual\":\"⩽\",\"LessTilde\":\"≲\",\"lfisht\":\"⥼\",\"lfloor\":\"⌊\",\"Lfr\":\"𝔏\",\"lfr\":\"𝔩\",\"lg\":\"≶\",\"lgE\":\"⪑\",\"lHar\":\"⥢\",\"lhard\":\"↽\",\"lharu\":\"↼\",\"lharul\":\"⥪\",\"lhblk\":\"▄\",\"LJcy\":\"Љ\",\"ljcy\":\"љ\",\"llarr\":\"⇇\",\"ll\":\"≪\",\"Ll\":\"⋘\",\"llcorner\":\"⌞\",\"Lleftarrow\":\"⇚\",\"llhard\":\"⥫\",\"lltri\":\"◺\",\"Lmidot\":\"Ŀ\",\"lmidot\":\"ŀ\",\"lmoustache\":\"⎰\",\"lmoust\":\"⎰\",\"lnap\":\"⪉\",\"lnapprox\":\"⪉\",\"lne\":\"⪇\",\"lnE\":\"≨\",\"lneq\":\"⪇\",\"lneqq\":\"≨\",\"lnsim\":\"⋦\",\"loang\":\"⟬\",\"loarr\":\"⇽\",\"lobrk\":\"⟦\",\"longleftarrow\":\"⟵\",\"LongLeftArrow\":\"⟵\",\"Longleftarrow\":\"⟸\",\"longleftrightarrow\":\"⟷\",\"LongLeftRightArrow\":\"⟷\",\"Longleftrightarrow\":\"⟺\",\"longmapsto\":\"⟼\",\"longrightarrow\":\"⟶\",\"LongRightArrow\":\"⟶\",\"Longrightarrow\":\"⟹\",\"looparrowleft\":\"↫\",\"looparrowright\":\"↬\",\"lopar\":\"⦅\",\"Lopf\":\"𝕃\",\"lopf\":\"𝕝\",\"loplus\":\"⨭\",\"lotimes\":\"⨴\",\"lowast\":\"∗\",\"lowbar\":\"_\",\"LowerLeftArrow\":\"↙\",\"LowerRightArrow\":\"↘\",\"loz\":\"◊\",\"lozenge\":\"◊\",\"lozf\":\"⧫\",\"lpar\":\"(\",\"lparlt\":\"⦓\",\"lrarr\":\"⇆\",\"lrcorner\":\"⌟\",\"lrhar\":\"⇋\",\"lrhard\":\"⥭\",\"lrm\":\"‎\",\"lrtri\":\"⊿\",\"lsaquo\":\"‹\",\"lscr\":\"𝓁\",\"Lscr\":\"ℒ\",\"lsh\":\"↰\",\"Lsh\":\"↰\",\"lsim\":\"≲\",\"lsime\":\"⪍\",\"lsimg\":\"⪏\",\"lsqb\":\"[\",\"lsquo\":\"‘\",\"lsquor\":\"‚\",\"Lstrok\":\"Ł\",\"lstrok\":\"ł\",\"ltcc\":\"⪦\",\"ltcir\":\"⩹\",\"lt\":\"<\",\"LT\":\"<\",\"Lt\":\"≪\",\"ltdot\":\"⋖\",\"lthree\":\"⋋\",\"ltimes\":\"⋉\",\"ltlarr\":\"⥶\",\"ltquest\":\"⩻\",\"ltri\":\"◃\",\"ltrie\":\"⊴\",\"ltrif\":\"◂\",\"ltrPar\":\"⦖\",\"lurdshar\":\"⥊\",\"luruhar\":\"⥦\",\"lvertneqq\":\"≨︀\",\"lvnE\":\"≨︀\",\"macr\":\"¯\",\"male\":\"♂\",\"malt\":\"✠\",\"maltese\":\"✠\",\"Map\":\"⤅\",\"map\":\"↦\",\"mapsto\":\"↦\",\"mapstodown\":\"↧\",\"mapstoleft\":\"↤\",\"mapstoup\":\"↥\",\"marker\":\"▮\",\"mcomma\":\"⨩\",\"Mcy\":\"М\",\"mcy\":\"м\",\"mdash\":\"—\",\"mDDot\":\"∺\",\"measuredangle\":\"∡\",\"MediumSpace\":\" \",\"Mellintrf\":\"ℳ\",\"Mfr\":\"𝔐\",\"mfr\":\"𝔪\",\"mho\":\"℧\",\"micro\":\"µ\",\"midast\":\"*\",\"midcir\":\"⫰\",\"mid\":\"∣\",\"middot\":\"·\",\"minusb\":\"⊟\",\"minus\":\"−\",\"minusd\":\"∸\",\"minusdu\":\"⨪\",\"MinusPlus\":\"∓\",\"mlcp\":\"⫛\",\"mldr\":\"…\",\"mnplus\":\"∓\",\"models\":\"⊧\",\"Mopf\":\"𝕄\",\"mopf\":\"𝕞\",\"mp\":\"∓\",\"mscr\":\"𝓂\",\"Mscr\":\"ℳ\",\"mstpos\":\"∾\",\"Mu\":\"Μ\",\"mu\":\"μ\",\"multimap\":\"⊸\",\"mumap\":\"⊸\",\"nabla\":\"∇\",\"Nacute\":\"Ń\",\"nacute\":\"ń\",\"nang\":\"∠⃒\",\"nap\":\"≉\",\"napE\":\"⩰̸\",\"napid\":\"≋̸\",\"napos\":\"ŉ\",\"napprox\":\"≉\",\"natural\":\"♮\",\"naturals\":\"ℕ\",\"natur\":\"♮\",\"nbsp\":\" \",\"nbump\":\"≎̸\",\"nbumpe\":\"≏̸\",\"ncap\":\"⩃\",\"Ncaron\":\"Ň\",\"ncaron\":\"ň\",\"Ncedil\":\"Ņ\",\"ncedil\":\"ņ\",\"ncong\":\"≇\",\"ncongdot\":\"⩭̸\",\"ncup\":\"⩂\",\"Ncy\":\"Н\",\"ncy\":\"н\",\"ndash\":\"–\",\"nearhk\":\"⤤\",\"nearr\":\"↗\",\"neArr\":\"⇗\",\"nearrow\":\"↗\",\"ne\":\"≠\",\"nedot\":\"≐̸\",\"NegativeMediumSpace\":\"​\",\"NegativeThickSpace\":\"​\",\"NegativeThinSpace\":\"​\",\"NegativeVeryThinSpace\":\"​\",\"nequiv\":\"≢\",\"nesear\":\"⤨\",\"nesim\":\"≂̸\",\"NestedGreaterGreater\":\"≫\",\"NestedLessLess\":\"≪\",\"NewLine\":\"\\n\",\"nexist\":\"∄\",\"nexists\":\"∄\",\"Nfr\":\"𝔑\",\"nfr\":\"𝔫\",\"ngE\":\"≧̸\",\"nge\":\"≱\",\"ngeq\":\"≱\",\"ngeqq\":\"≧̸\",\"ngeqslant\":\"⩾̸\",\"nges\":\"⩾̸\",\"nGg\":\"⋙̸\",\"ngsim\":\"≵\",\"nGt\":\"≫⃒\",\"ngt\":\"≯\",\"ngtr\":\"≯\",\"nGtv\":\"≫̸\",\"nharr\":\"↮\",\"nhArr\":\"⇎\",\"nhpar\":\"⫲\",\"ni\":\"∋\",\"nis\":\"⋼\",\"nisd\":\"⋺\",\"niv\":\"∋\",\"NJcy\":\"Њ\",\"njcy\":\"њ\",\"nlarr\":\"↚\",\"nlArr\":\"⇍\",\"nldr\":\"‥\",\"nlE\":\"≦̸\",\"nle\":\"≰\",\"nleftarrow\":\"↚\",\"nLeftarrow\":\"⇍\",\"nleftrightarrow\":\"↮\",\"nLeftrightarrow\":\"⇎\",\"nleq\":\"≰\",\"nleqq\":\"≦̸\",\"nleqslant\":\"⩽̸\",\"nles\":\"⩽̸\",\"nless\":\"≮\",\"nLl\":\"⋘̸\",\"nlsim\":\"≴\",\"nLt\":\"≪⃒\",\"nlt\":\"≮\",\"nltri\":\"⋪\",\"nltrie\":\"⋬\",\"nLtv\":\"≪̸\",\"nmid\":\"∤\",\"NoBreak\":\"⁠\",\"NonBreakingSpace\":\" \",\"nopf\":\"𝕟\",\"Nopf\":\"ℕ\",\"Not\":\"⫬\",\"not\":\"¬\",\"NotCongruent\":\"≢\",\"NotCupCap\":\"≭\",\"NotDoubleVerticalBar\":\"∦\",\"NotElement\":\"∉\",\"NotEqual\":\"≠\",\"NotEqualTilde\":\"≂̸\",\"NotExists\":\"∄\",\"NotGreater\":\"≯\",\"NotGreaterEqual\":\"≱\",\"NotGreaterFullEqual\":\"≧̸\",\"NotGreaterGreater\":\"≫̸\",\"NotGreaterLess\":\"≹\",\"NotGreaterSlantEqual\":\"⩾̸\",\"NotGreaterTilde\":\"≵\",\"NotHumpDownHump\":\"≎̸\",\"NotHumpEqual\":\"≏̸\",\"notin\":\"∉\",\"notindot\":\"⋵̸\",\"notinE\":\"⋹̸\",\"notinva\":\"∉\",\"notinvb\":\"⋷\",\"notinvc\":\"⋶\",\"NotLeftTriangleBar\":\"⧏̸\",\"NotLeftTriangle\":\"⋪\",\"NotLeftTriangleEqual\":\"⋬\",\"NotLess\":\"≮\",\"NotLessEqual\":\"≰\",\"NotLessGreater\":\"≸\",\"NotLessLess\":\"≪̸\",\"NotLessSlantEqual\":\"⩽̸\",\"NotLessTilde\":\"≴\",\"NotNestedGreaterGreater\":\"⪢̸\",\"NotNestedLessLess\":\"⪡̸\",\"notni\":\"∌\",\"notniva\":\"∌\",\"notnivb\":\"⋾\",\"notnivc\":\"⋽\",\"NotPrecedes\":\"⊀\",\"NotPrecedesEqual\":\"⪯̸\",\"NotPrecedesSlantEqual\":\"⋠\",\"NotReverseElement\":\"∌\",\"NotRightTriangleBar\":\"⧐̸\",\"NotRightTriangle\":\"⋫\",\"NotRightTriangleEqual\":\"⋭\",\"NotSquareSubset\":\"⊏̸\",\"NotSquareSubsetEqual\":\"⋢\",\"NotSquareSuperset\":\"⊐̸\",\"NotSquareSupersetEqual\":\"⋣\",\"NotSubset\":\"⊂⃒\",\"NotSubsetEqual\":\"⊈\",\"NotSucceeds\":\"⊁\",\"NotSucceedsEqual\":\"⪰̸\",\"NotSucceedsSlantEqual\":\"⋡\",\"NotSucceedsTilde\":\"≿̸\",\"NotSuperset\":\"⊃⃒\",\"NotSupersetEqual\":\"⊉\",\"NotTilde\":\"≁\",\"NotTildeEqual\":\"≄\",\"NotTildeFullEqual\":\"≇\",\"NotTildeTilde\":\"≉\",\"NotVerticalBar\":\"∤\",\"nparallel\":\"∦\",\"npar\":\"∦\",\"nparsl\":\"⫽⃥\",\"npart\":\"∂̸\",\"npolint\":\"⨔\",\"npr\":\"⊀\",\"nprcue\":\"⋠\",\"nprec\":\"⊀\",\"npreceq\":\"⪯̸\",\"npre\":\"⪯̸\",\"nrarrc\":\"⤳̸\",\"nrarr\":\"↛\",\"nrArr\":\"⇏\",\"nrarrw\":\"↝̸\",\"nrightarrow\":\"↛\",\"nRightarrow\":\"⇏\",\"nrtri\":\"⋫\",\"nrtrie\":\"⋭\",\"nsc\":\"⊁\",\"nsccue\":\"⋡\",\"nsce\":\"⪰̸\",\"Nscr\":\"𝒩\",\"nscr\":\"𝓃\",\"nshortmid\":\"∤\",\"nshortparallel\":\"∦\",\"nsim\":\"≁\",\"nsime\":\"≄\",\"nsimeq\":\"≄\",\"nsmid\":\"∤\",\"nspar\":\"∦\",\"nsqsube\":\"⋢\",\"nsqsupe\":\"⋣\",\"nsub\":\"⊄\",\"nsubE\":\"⫅̸\",\"nsube\":\"⊈\",\"nsubset\":\"⊂⃒\",\"nsubseteq\":\"⊈\",\"nsubseteqq\":\"⫅̸\",\"nsucc\":\"⊁\",\"nsucceq\":\"⪰̸\",\"nsup\":\"⊅\",\"nsupE\":\"⫆̸\",\"nsupe\":\"⊉\",\"nsupset\":\"⊃⃒\",\"nsupseteq\":\"⊉\",\"nsupseteqq\":\"⫆̸\",\"ntgl\":\"≹\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"ntlg\":\"≸\",\"ntriangleleft\":\"⋪\",\"ntrianglelefteq\":\"⋬\",\"ntriangleright\":\"⋫\",\"ntrianglerighteq\":\"⋭\",\"Nu\":\"Ν\",\"nu\":\"ν\",\"num\":\"#\",\"numero\":\"№\",\"numsp\":\" \",\"nvap\":\"≍⃒\",\"nvdash\":\"⊬\",\"nvDash\":\"⊭\",\"nVdash\":\"⊮\",\"nVDash\":\"⊯\",\"nvge\":\"≥⃒\",\"nvgt\":\">⃒\",\"nvHarr\":\"⤄\",\"nvinfin\":\"⧞\",\"nvlArr\":\"⤂\",\"nvle\":\"≤⃒\",\"nvlt\":\"<⃒\",\"nvltrie\":\"⊴⃒\",\"nvrArr\":\"⤃\",\"nvrtrie\":\"⊵⃒\",\"nvsim\":\"∼⃒\",\"nwarhk\":\"⤣\",\"nwarr\":\"↖\",\"nwArr\":\"⇖\",\"nwarrow\":\"↖\",\"nwnear\":\"⤧\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"oast\":\"⊛\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"ocir\":\"⊚\",\"Ocy\":\"О\",\"ocy\":\"о\",\"odash\":\"⊝\",\"Odblac\":\"Ő\",\"odblac\":\"ő\",\"odiv\":\"⨸\",\"odot\":\"⊙\",\"odsold\":\"⦼\",\"OElig\":\"Œ\",\"oelig\":\"œ\",\"ofcir\":\"⦿\",\"Ofr\":\"𝔒\",\"ofr\":\"𝔬\",\"ogon\":\"˛\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ogt\":\"⧁\",\"ohbar\":\"⦵\",\"ohm\":\"Ω\",\"oint\":\"∮\",\"olarr\":\"↺\",\"olcir\":\"⦾\",\"olcross\":\"⦻\",\"oline\":\"‾\",\"olt\":\"⧀\",\"Omacr\":\"Ō\",\"omacr\":\"ō\",\"Omega\":\"Ω\",\"omega\":\"ω\",\"Omicron\":\"Ο\",\"omicron\":\"ο\",\"omid\":\"⦶\",\"ominus\":\"⊖\",\"Oopf\":\"𝕆\",\"oopf\":\"𝕠\",\"opar\":\"⦷\",\"OpenCurlyDoubleQuote\":\"“\",\"OpenCurlyQuote\":\"‘\",\"operp\":\"⦹\",\"oplus\":\"⊕\",\"orarr\":\"↻\",\"Or\":\"⩔\",\"or\":\"∨\",\"ord\":\"⩝\",\"order\":\"ℴ\",\"orderof\":\"ℴ\",\"ordf\":\"ª\",\"ordm\":\"º\",\"origof\":\"⊶\",\"oror\":\"⩖\",\"orslope\":\"⩗\",\"orv\":\"⩛\",\"oS\":\"Ⓢ\",\"Oscr\":\"𝒪\",\"oscr\":\"ℴ\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"osol\":\"⊘\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"otimesas\":\"⨶\",\"Otimes\":\"⨷\",\"otimes\":\"⊗\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"ovbar\":\"⌽\",\"OverBar\":\"‾\",\"OverBrace\":\"⏞\",\"OverBracket\":\"⎴\",\"OverParenthesis\":\"⏜\",\"para\":\"¶\",\"parallel\":\"∥\",\"par\":\"∥\",\"parsim\":\"⫳\",\"parsl\":\"⫽\",\"part\":\"∂\",\"PartialD\":\"∂\",\"Pcy\":\"П\",\"pcy\":\"п\",\"percnt\":\"%\",\"period\":\".\",\"permil\":\"‰\",\"perp\":\"⊥\",\"pertenk\":\"‱\",\"Pfr\":\"𝔓\",\"pfr\":\"𝔭\",\"Phi\":\"Φ\",\"phi\":\"φ\",\"phiv\":\"ϕ\",\"phmmat\":\"ℳ\",\"phone\":\"☎\",\"Pi\":\"Π\",\"pi\":\"π\",\"pitchfork\":\"⋔\",\"piv\":\"ϖ\",\"planck\":\"ℏ\",\"planckh\":\"ℎ\",\"plankv\":\"ℏ\",\"plusacir\":\"⨣\",\"plusb\":\"⊞\",\"pluscir\":\"⨢\",\"plus\":\"+\",\"plusdo\":\"∔\",\"plusdu\":\"⨥\",\"pluse\":\"⩲\",\"PlusMinus\":\"±\",\"plusmn\":\"±\",\"plussim\":\"⨦\",\"plustwo\":\"⨧\",\"pm\":\"±\",\"Poincareplane\":\"ℌ\",\"pointint\":\"⨕\",\"popf\":\"𝕡\",\"Popf\":\"ℙ\",\"pound\":\"£\",\"prap\":\"⪷\",\"Pr\":\"⪻\",\"pr\":\"≺\",\"prcue\":\"≼\",\"precapprox\":\"⪷\",\"prec\":\"≺\",\"preccurlyeq\":\"≼\",\"Precedes\":\"≺\",\"PrecedesEqual\":\"⪯\",\"PrecedesSlantEqual\":\"≼\",\"PrecedesTilde\":\"≾\",\"preceq\":\"⪯\",\"precnapprox\":\"⪹\",\"precneqq\":\"⪵\",\"precnsim\":\"⋨\",\"pre\":\"⪯\",\"prE\":\"⪳\",\"precsim\":\"≾\",\"prime\":\"′\",\"Prime\":\"″\",\"primes\":\"ℙ\",\"prnap\":\"⪹\",\"prnE\":\"⪵\",\"prnsim\":\"⋨\",\"prod\":\"∏\",\"Product\":\"∏\",\"profalar\":\"⌮\",\"profline\":\"⌒\",\"profsurf\":\"⌓\",\"prop\":\"∝\",\"Proportional\":\"∝\",\"Proportion\":\"∷\",\"propto\":\"∝\",\"prsim\":\"≾\",\"prurel\":\"⊰\",\"Pscr\":\"𝒫\",\"pscr\":\"𝓅\",\"Psi\":\"Ψ\",\"psi\":\"ψ\",\"puncsp\":\" \",\"Qfr\":\"𝔔\",\"qfr\":\"𝔮\",\"qint\":\"⨌\",\"qopf\":\"𝕢\",\"Qopf\":\"ℚ\",\"qprime\":\"⁗\",\"Qscr\":\"𝒬\",\"qscr\":\"𝓆\",\"quaternions\":\"ℍ\",\"quatint\":\"⨖\",\"quest\":\"?\",\"questeq\":\"≟\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"rAarr\":\"⇛\",\"race\":\"∽̱\",\"Racute\":\"Ŕ\",\"racute\":\"ŕ\",\"radic\":\"√\",\"raemptyv\":\"⦳\",\"rang\":\"⟩\",\"Rang\":\"⟫\",\"rangd\":\"⦒\",\"range\":\"⦥\",\"rangle\":\"⟩\",\"raquo\":\"»\",\"rarrap\":\"⥵\",\"rarrb\":\"⇥\",\"rarrbfs\":\"⤠\",\"rarrc\":\"⤳\",\"rarr\":\"→\",\"Rarr\":\"↠\",\"rArr\":\"⇒\",\"rarrfs\":\"⤞\",\"rarrhk\":\"↪\",\"rarrlp\":\"↬\",\"rarrpl\":\"⥅\",\"rarrsim\":\"⥴\",\"Rarrtl\":\"⤖\",\"rarrtl\":\"↣\",\"rarrw\":\"↝\",\"ratail\":\"⤚\",\"rAtail\":\"⤜\",\"ratio\":\"∶\",\"rationals\":\"ℚ\",\"rbarr\":\"⤍\",\"rBarr\":\"⤏\",\"RBarr\":\"⤐\",\"rbbrk\":\"❳\",\"rbrace\":\"}\",\"rbrack\":\"]\",\"rbrke\":\"⦌\",\"rbrksld\":\"⦎\",\"rbrkslu\":\"⦐\",\"Rcaron\":\"Ř\",\"rcaron\":\"ř\",\"Rcedil\":\"Ŗ\",\"rcedil\":\"ŗ\",\"rceil\":\"⌉\",\"rcub\":\"}\",\"Rcy\":\"Р\",\"rcy\":\"р\",\"rdca\":\"⤷\",\"rdldhar\":\"⥩\",\"rdquo\":\"”\",\"rdquor\":\"”\",\"rdsh\":\"↳\",\"real\":\"ℜ\",\"realine\":\"ℛ\",\"realpart\":\"ℜ\",\"reals\":\"ℝ\",\"Re\":\"ℜ\",\"rect\":\"▭\",\"reg\":\"®\",\"REG\":\"®\",\"ReverseElement\":\"∋\",\"ReverseEquilibrium\":\"⇋\",\"ReverseUpEquilibrium\":\"⥯\",\"rfisht\":\"⥽\",\"rfloor\":\"⌋\",\"rfr\":\"𝔯\",\"Rfr\":\"ℜ\",\"rHar\":\"⥤\",\"rhard\":\"⇁\",\"rharu\":\"⇀\",\"rharul\":\"⥬\",\"Rho\":\"Ρ\",\"rho\":\"ρ\",\"rhov\":\"ϱ\",\"RightAngleBracket\":\"⟩\",\"RightArrowBar\":\"⇥\",\"rightarrow\":\"→\",\"RightArrow\":\"→\",\"Rightarrow\":\"⇒\",\"RightArrowLeftArrow\":\"⇄\",\"rightarrowtail\":\"↣\",\"RightCeiling\":\"⌉\",\"RightDoubleBracket\":\"⟧\",\"RightDownTeeVector\":\"⥝\",\"RightDownVectorBar\":\"⥕\",\"RightDownVector\":\"⇂\",\"RightFloor\":\"⌋\",\"rightharpoondown\":\"⇁\",\"rightharpoonup\":\"⇀\",\"rightleftarrows\":\"⇄\",\"rightleftharpoons\":\"⇌\",\"rightrightarrows\":\"⇉\",\"rightsquigarrow\":\"↝\",\"RightTeeArrow\":\"↦\",\"RightTee\":\"⊢\",\"RightTeeVector\":\"⥛\",\"rightthreetimes\":\"⋌\",\"RightTriangleBar\":\"⧐\",\"RightTriangle\":\"⊳\",\"RightTriangleEqual\":\"⊵\",\"RightUpDownVector\":\"⥏\",\"RightUpTeeVector\":\"⥜\",\"RightUpVectorBar\":\"⥔\",\"RightUpVector\":\"↾\",\"RightVectorBar\":\"⥓\",\"RightVector\":\"⇀\",\"ring\":\"˚\",\"risingdotseq\":\"≓\",\"rlarr\":\"⇄\",\"rlhar\":\"⇌\",\"rlm\":\"‏\",\"rmoustache\":\"⎱\",\"rmoust\":\"⎱\",\"rnmid\":\"⫮\",\"roang\":\"⟭\",\"roarr\":\"⇾\",\"robrk\":\"⟧\",\"ropar\":\"⦆\",\"ropf\":\"𝕣\",\"Ropf\":\"ℝ\",\"roplus\":\"⨮\",\"rotimes\":\"⨵\",\"RoundImplies\":\"⥰\",\"rpar\":\")\",\"rpargt\":\"⦔\",\"rppolint\":\"⨒\",\"rrarr\":\"⇉\",\"Rrightarrow\":\"⇛\",\"rsaquo\":\"›\",\"rscr\":\"𝓇\",\"Rscr\":\"ℛ\",\"rsh\":\"↱\",\"Rsh\":\"↱\",\"rsqb\":\"]\",\"rsquo\":\"’\",\"rsquor\":\"’\",\"rthree\":\"⋌\",\"rtimes\":\"⋊\",\"rtri\":\"▹\",\"rtrie\":\"⊵\",\"rtrif\":\"▸\",\"rtriltri\":\"⧎\",\"RuleDelayed\":\"⧴\",\"ruluhar\":\"⥨\",\"rx\":\"℞\",\"Sacute\":\"Ś\",\"sacute\":\"ś\",\"sbquo\":\"‚\",\"scap\":\"⪸\",\"Scaron\":\"Š\",\"scaron\":\"š\",\"Sc\":\"⪼\",\"sc\":\"≻\",\"sccue\":\"≽\",\"sce\":\"⪰\",\"scE\":\"⪴\",\"Scedil\":\"Ş\",\"scedil\":\"ş\",\"Scirc\":\"Ŝ\",\"scirc\":\"ŝ\",\"scnap\":\"⪺\",\"scnE\":\"⪶\",\"scnsim\":\"⋩\",\"scpolint\":\"⨓\",\"scsim\":\"≿\",\"Scy\":\"С\",\"scy\":\"с\",\"sdotb\":\"⊡\",\"sdot\":\"⋅\",\"sdote\":\"⩦\",\"searhk\":\"⤥\",\"searr\":\"↘\",\"seArr\":\"⇘\",\"searrow\":\"↘\",\"sect\":\"§\",\"semi\":\";\",\"seswar\":\"⤩\",\"setminus\":\"∖\",\"setmn\":\"∖\",\"sext\":\"✶\",\"Sfr\":\"𝔖\",\"sfr\":\"𝔰\",\"sfrown\":\"⌢\",\"sharp\":\"♯\",\"SHCHcy\":\"Щ\",\"shchcy\":\"щ\",\"SHcy\":\"Ш\",\"shcy\":\"ш\",\"ShortDownArrow\":\"↓\",\"ShortLeftArrow\":\"←\",\"shortmid\":\"∣\",\"shortparallel\":\"∥\",\"ShortRightArrow\":\"→\",\"ShortUpArrow\":\"↑\",\"shy\":\"­\",\"Sigma\":\"Σ\",\"sigma\":\"σ\",\"sigmaf\":\"ς\",\"sigmav\":\"ς\",\"sim\":\"∼\",\"simdot\":\"⩪\",\"sime\":\"≃\",\"simeq\":\"≃\",\"simg\":\"⪞\",\"simgE\":\"⪠\",\"siml\":\"⪝\",\"simlE\":\"⪟\",\"simne\":\"≆\",\"simplus\":\"⨤\",\"simrarr\":\"⥲\",\"slarr\":\"←\",\"SmallCircle\":\"∘\",\"smallsetminus\":\"∖\",\"smashp\":\"⨳\",\"smeparsl\":\"⧤\",\"smid\":\"∣\",\"smile\":\"⌣\",\"smt\":\"⪪\",\"smte\":\"⪬\",\"smtes\":\"⪬︀\",\"SOFTcy\":\"Ь\",\"softcy\":\"ь\",\"solbar\":\"⌿\",\"solb\":\"⧄\",\"sol\":\"/\",\"Sopf\":\"𝕊\",\"sopf\":\"𝕤\",\"spades\":\"♠\",\"spadesuit\":\"♠\",\"spar\":\"∥\",\"sqcap\":\"⊓\",\"sqcaps\":\"⊓︀\",\"sqcup\":\"⊔\",\"sqcups\":\"⊔︀\",\"Sqrt\":\"√\",\"sqsub\":\"⊏\",\"sqsube\":\"⊑\",\"sqsubset\":\"⊏\",\"sqsubseteq\":\"⊑\",\"sqsup\":\"⊐\",\"sqsupe\":\"⊒\",\"sqsupset\":\"⊐\",\"sqsupseteq\":\"⊒\",\"square\":\"□\",\"Square\":\"□\",\"SquareIntersection\":\"⊓\",\"SquareSubset\":\"⊏\",\"SquareSubsetEqual\":\"⊑\",\"SquareSuperset\":\"⊐\",\"SquareSupersetEqual\":\"⊒\",\"SquareUnion\":\"⊔\",\"squarf\":\"▪\",\"squ\":\"□\",\"squf\":\"▪\",\"srarr\":\"→\",\"Sscr\":\"𝒮\",\"sscr\":\"𝓈\",\"ssetmn\":\"∖\",\"ssmile\":\"⌣\",\"sstarf\":\"⋆\",\"Star\":\"⋆\",\"star\":\"☆\",\"starf\":\"★\",\"straightepsilon\":\"ϵ\",\"straightphi\":\"ϕ\",\"strns\":\"¯\",\"sub\":\"⊂\",\"Sub\":\"⋐\",\"subdot\":\"⪽\",\"subE\":\"⫅\",\"sube\":\"⊆\",\"subedot\":\"⫃\",\"submult\":\"⫁\",\"subnE\":\"⫋\",\"subne\":\"⊊\",\"subplus\":\"⪿\",\"subrarr\":\"⥹\",\"subset\":\"⊂\",\"Subset\":\"⋐\",\"subseteq\":\"⊆\",\"subseteqq\":\"⫅\",\"SubsetEqual\":\"⊆\",\"subsetneq\":\"⊊\",\"subsetneqq\":\"⫋\",\"subsim\":\"⫇\",\"subsub\":\"⫕\",\"subsup\":\"⫓\",\"succapprox\":\"⪸\",\"succ\":\"≻\",\"succcurlyeq\":\"≽\",\"Succeeds\":\"≻\",\"SucceedsEqual\":\"⪰\",\"SucceedsSlantEqual\":\"≽\",\"SucceedsTilde\":\"≿\",\"succeq\":\"⪰\",\"succnapprox\":\"⪺\",\"succneqq\":\"⪶\",\"succnsim\":\"⋩\",\"succsim\":\"≿\",\"SuchThat\":\"∋\",\"sum\":\"∑\",\"Sum\":\"∑\",\"sung\":\"♪\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"sup\":\"⊃\",\"Sup\":\"⋑\",\"supdot\":\"⪾\",\"supdsub\":\"⫘\",\"supE\":\"⫆\",\"supe\":\"⊇\",\"supedot\":\"⫄\",\"Superset\":\"⊃\",\"SupersetEqual\":\"⊇\",\"suphsol\":\"⟉\",\"suphsub\":\"⫗\",\"suplarr\":\"⥻\",\"supmult\":\"⫂\",\"supnE\":\"⫌\",\"supne\":\"⊋\",\"supplus\":\"⫀\",\"supset\":\"⊃\",\"Supset\":\"⋑\",\"supseteq\":\"⊇\",\"supseteqq\":\"⫆\",\"supsetneq\":\"⊋\",\"supsetneqq\":\"⫌\",\"supsim\":\"⫈\",\"supsub\":\"⫔\",\"supsup\":\"⫖\",\"swarhk\":\"⤦\",\"swarr\":\"↙\",\"swArr\":\"⇙\",\"swarrow\":\"↙\",\"swnwar\":\"⤪\",\"szlig\":\"ß\",\"Tab\":\"\\t\",\"target\":\"⌖\",\"Tau\":\"Τ\",\"tau\":\"τ\",\"tbrk\":\"⎴\",\"Tcaron\":\"Ť\",\"tcaron\":\"ť\",\"Tcedil\":\"Ţ\",\"tcedil\":\"ţ\",\"Tcy\":\"Т\",\"tcy\":\"т\",\"tdot\":\"⃛\",\"telrec\":\"⌕\",\"Tfr\":\"𝔗\",\"tfr\":\"𝔱\",\"there4\":\"∴\",\"therefore\":\"∴\",\"Therefore\":\"∴\",\"Theta\":\"Θ\",\"theta\":\"θ\",\"thetasym\":\"ϑ\",\"thetav\":\"ϑ\",\"thickapprox\":\"≈\",\"thicksim\":\"∼\",\"ThickSpace\":\"  \",\"ThinSpace\":\" \",\"thinsp\":\" \",\"thkap\":\"≈\",\"thksim\":\"∼\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"tilde\":\"˜\",\"Tilde\":\"∼\",\"TildeEqual\":\"≃\",\"TildeFullEqual\":\"≅\",\"TildeTilde\":\"≈\",\"timesbar\":\"⨱\",\"timesb\":\"⊠\",\"times\":\"×\",\"timesd\":\"⨰\",\"tint\":\"∭\",\"toea\":\"⤨\",\"topbot\":\"⌶\",\"topcir\":\"⫱\",\"top\":\"⊤\",\"Topf\":\"𝕋\",\"topf\":\"𝕥\",\"topfork\":\"⫚\",\"tosa\":\"⤩\",\"tprime\":\"‴\",\"trade\":\"™\",\"TRADE\":\"™\",\"triangle\":\"▵\",\"triangledown\":\"▿\",\"triangleleft\":\"◃\",\"trianglelefteq\":\"⊴\",\"triangleq\":\"≜\",\"triangleright\":\"▹\",\"trianglerighteq\":\"⊵\",\"tridot\":\"◬\",\"trie\":\"≜\",\"triminus\":\"⨺\",\"TripleDot\":\"⃛\",\"triplus\":\"⨹\",\"trisb\":\"⧍\",\"tritime\":\"⨻\",\"trpezium\":\"⏢\",\"Tscr\":\"𝒯\",\"tscr\":\"𝓉\",\"TScy\":\"Ц\",\"tscy\":\"ц\",\"TSHcy\":\"Ћ\",\"tshcy\":\"ћ\",\"Tstrok\":\"Ŧ\",\"tstrok\":\"ŧ\",\"twixt\":\"≬\",\"twoheadleftarrow\":\"↞\",\"twoheadrightarrow\":\"↠\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"uarr\":\"↑\",\"Uarr\":\"↟\",\"uArr\":\"⇑\",\"Uarrocir\":\"⥉\",\"Ubrcy\":\"Ў\",\"ubrcy\":\"ў\",\"Ubreve\":\"Ŭ\",\"ubreve\":\"ŭ\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ucy\":\"У\",\"ucy\":\"у\",\"udarr\":\"⇅\",\"Udblac\":\"Ű\",\"udblac\":\"ű\",\"udhar\":\"⥮\",\"ufisht\":\"⥾\",\"Ufr\":\"𝔘\",\"ufr\":\"𝔲\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uHar\":\"⥣\",\"uharl\":\"↿\",\"uharr\":\"↾\",\"uhblk\":\"▀\",\"ulcorn\":\"⌜\",\"ulcorner\":\"⌜\",\"ulcrop\":\"⌏\",\"ultri\":\"◸\",\"Umacr\":\"Ū\",\"umacr\":\"ū\",\"uml\":\"¨\",\"UnderBar\":\"_\",\"UnderBrace\":\"⏟\",\"UnderBracket\":\"⎵\",\"UnderParenthesis\":\"⏝\",\"Union\":\"⋃\",\"UnionPlus\":\"⊎\",\"Uogon\":\"Ų\",\"uogon\":\"ų\",\"Uopf\":\"𝕌\",\"uopf\":\"𝕦\",\"UpArrowBar\":\"⤒\",\"uparrow\":\"↑\",\"UpArrow\":\"↑\",\"Uparrow\":\"⇑\",\"UpArrowDownArrow\":\"⇅\",\"updownarrow\":\"↕\",\"UpDownArrow\":\"↕\",\"Updownarrow\":\"⇕\",\"UpEquilibrium\":\"⥮\",\"upharpoonleft\":\"↿\",\"upharpoonright\":\"↾\",\"uplus\":\"⊎\",\"UpperLeftArrow\":\"↖\",\"UpperRightArrow\":\"↗\",\"upsi\":\"υ\",\"Upsi\":\"ϒ\",\"upsih\":\"ϒ\",\"Upsilon\":\"Υ\",\"upsilon\":\"υ\",\"UpTeeArrow\":\"↥\",\"UpTee\":\"⊥\",\"upuparrows\":\"⇈\",\"urcorn\":\"⌝\",\"urcorner\":\"⌝\",\"urcrop\":\"⌎\",\"Uring\":\"Ů\",\"uring\":\"ů\",\"urtri\":\"◹\",\"Uscr\":\"𝒰\",\"uscr\":\"𝓊\",\"utdot\":\"⋰\",\"Utilde\":\"Ũ\",\"utilde\":\"ũ\",\"utri\":\"▵\",\"utrif\":\"▴\",\"uuarr\":\"⇈\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"uwangle\":\"⦧\",\"vangrt\":\"⦜\",\"varepsilon\":\"ϵ\",\"varkappa\":\"ϰ\",\"varnothing\":\"∅\",\"varphi\":\"ϕ\",\"varpi\":\"ϖ\",\"varpropto\":\"∝\",\"varr\":\"↕\",\"vArr\":\"⇕\",\"varrho\":\"ϱ\",\"varsigma\":\"ς\",\"varsubsetneq\":\"⊊︀\",\"varsubsetneqq\":\"⫋︀\",\"varsupsetneq\":\"⊋︀\",\"varsupsetneqq\":\"⫌︀\",\"vartheta\":\"ϑ\",\"vartriangleleft\":\"⊲\",\"vartriangleright\":\"⊳\",\"vBar\":\"⫨\",\"Vbar\":\"⫫\",\"vBarv\":\"⫩\",\"Vcy\":\"В\",\"vcy\":\"в\",\"vdash\":\"⊢\",\"vDash\":\"⊨\",\"Vdash\":\"⊩\",\"VDash\":\"⊫\",\"Vdashl\":\"⫦\",\"veebar\":\"⊻\",\"vee\":\"∨\",\"Vee\":\"⋁\",\"veeeq\":\"≚\",\"vellip\":\"⋮\",\"verbar\":\"|\",\"Verbar\":\"‖\",\"vert\":\"|\",\"Vert\":\"‖\",\"VerticalBar\":\"∣\",\"VerticalLine\":\"|\",\"VerticalSeparator\":\"❘\",\"VerticalTilde\":\"≀\",\"VeryThinSpace\":\" \",\"Vfr\":\"𝔙\",\"vfr\":\"𝔳\",\"vltri\":\"⊲\",\"vnsub\":\"⊂⃒\",\"vnsup\":\"⊃⃒\",\"Vopf\":\"𝕍\",\"vopf\":\"𝕧\",\"vprop\":\"∝\",\"vrtri\":\"⊳\",\"Vscr\":\"𝒱\",\"vscr\":\"𝓋\",\"vsubnE\":\"⫋︀\",\"vsubne\":\"⊊︀\",\"vsupnE\":\"⫌︀\",\"vsupne\":\"⊋︀\",\"Vvdash\":\"⊪\",\"vzigzag\":\"⦚\",\"Wcirc\":\"Ŵ\",\"wcirc\":\"ŵ\",\"wedbar\":\"⩟\",\"wedge\":\"∧\",\"Wedge\":\"⋀\",\"wedgeq\":\"≙\",\"weierp\":\"℘\",\"Wfr\":\"𝔚\",\"wfr\":\"𝔴\",\"Wopf\":\"𝕎\",\"wopf\":\"𝕨\",\"wp\":\"℘\",\"wr\":\"≀\",\"wreath\":\"≀\",\"Wscr\":\"𝒲\",\"wscr\":\"𝓌\",\"xcap\":\"⋂\",\"xcirc\":\"◯\",\"xcup\":\"⋃\",\"xdtri\":\"▽\",\"Xfr\":\"𝔛\",\"xfr\":\"𝔵\",\"xharr\":\"⟷\",\"xhArr\":\"⟺\",\"Xi\":\"Ξ\",\"xi\":\"ξ\",\"xlarr\":\"⟵\",\"xlArr\":\"⟸\",\"xmap\":\"⟼\",\"xnis\":\"⋻\",\"xodot\":\"⨀\",\"Xopf\":\"𝕏\",\"xopf\":\"𝕩\",\"xoplus\":\"⨁\",\"xotime\":\"⨂\",\"xrarr\":\"⟶\",\"xrArr\":\"⟹\",\"Xscr\":\"𝒳\",\"xscr\":\"𝓍\",\"xsqcup\":\"⨆\",\"xuplus\":\"⨄\",\"xutri\":\"△\",\"xvee\":\"⋁\",\"xwedge\":\"⋀\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"YAcy\":\"Я\",\"yacy\":\"я\",\"Ycirc\":\"Ŷ\",\"ycirc\":\"ŷ\",\"Ycy\":\"Ы\",\"ycy\":\"ы\",\"yen\":\"¥\",\"Yfr\":\"𝔜\",\"yfr\":\"𝔶\",\"YIcy\":\"Ї\",\"yicy\":\"ї\",\"Yopf\":\"𝕐\",\"yopf\":\"𝕪\",\"Yscr\":\"𝒴\",\"yscr\":\"𝓎\",\"YUcy\":\"Ю\",\"yucy\":\"ю\",\"yuml\":\"ÿ\",\"Yuml\":\"Ÿ\",\"Zacute\":\"Ź\",\"zacute\":\"ź\",\"Zcaron\":\"Ž\",\"zcaron\":\"ž\",\"Zcy\":\"З\",\"zcy\":\"з\",\"Zdot\":\"Ż\",\"zdot\":\"ż\",\"zeetrf\":\"ℨ\",\"ZeroWidthSpace\":\"​\",\"Zeta\":\"Ζ\",\"zeta\":\"ζ\",\"zfr\":\"𝔷\",\"Zfr\":\"ℨ\",\"ZHcy\":\"Ж\",\"zhcy\":\"ж\",\"zigrarr\":\"⇝\",\"zopf\":\"𝕫\",\"Zopf\":\"ℤ\",\"Zscr\":\"𝒵\",\"zscr\":\"𝓏\",\"zwj\":\"‍\",\"zwnj\":\"‌\"}");

/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/entities/maps/legacy.json":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/entities/maps/legacy.json ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"Agrave\":\"À\",\"agrave\":\"à\",\"amp\":\"&\",\"AMP\":\"&\",\"Aring\":\"Å\",\"aring\":\"å\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"brvbar\":\"¦\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"cedil\":\"¸\",\"cent\":\"¢\",\"copy\":\"©\",\"COPY\":\"©\",\"curren\":\"¤\",\"deg\":\"°\",\"divide\":\"÷\",\"Eacute\":\"É\",\"eacute\":\"é\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"Egrave\":\"È\",\"egrave\":\"è\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"frac12\":\"½\",\"frac14\":\"¼\",\"frac34\":\"¾\",\"gt\":\">\",\"GT\":\">\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"iexcl\":\"¡\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"iquest\":\"¿\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"laquo\":\"«\",\"lt\":\"<\",\"LT\":\"<\",\"macr\":\"¯\",\"micro\":\"µ\",\"middot\":\"·\",\"nbsp\":\" \",\"not\":\"¬\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ordf\":\"ª\",\"ordm\":\"º\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"para\":\"¶\",\"plusmn\":\"±\",\"pound\":\"£\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"raquo\":\"»\",\"reg\":\"®\",\"REG\":\"®\",\"sect\":\"§\",\"shy\":\"­\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"szlig\":\"ß\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"times\":\"×\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uml\":\"¨\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"yen\":\"¥\",\"yuml\":\"ÿ\"}");

/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/entities/maps/xml.json":
/*!****************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/entities/maps/xml.json ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"amp\":\"&\",\"apos\":\"'\",\"gt\":\">\",\"lt\":\"<\",\"quot\":\"\\\"\"}");

/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/CollectingHandler.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/CollectingHandler.js ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = CollectingHandler;

function CollectingHandler(cbs) {
    this._cbs = cbs || {};
    this.events = [];
}

var EVENTS = __webpack_require__(/*! ./ */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js").EVENTS;
Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        name = "on" + name;
        CollectingHandler.prototype[name] = function() {
            this.events.push([name]);
            if (this._cbs[name]) this._cbs[name]();
        };
    } else if (EVENTS[name] === 1) {
        name = "on" + name;
        CollectingHandler.prototype[name] = function(a) {
            this.events.push([name, a]);
            if (this._cbs[name]) this._cbs[name](a);
        };
    } else if (EVENTS[name] === 2) {
        name = "on" + name;
        CollectingHandler.prototype[name] = function(a, b) {
            this.events.push([name, a, b]);
            if (this._cbs[name]) this._cbs[name](a, b);
        };
    } else {
        throw Error("wrong number of arguments");
    }
});

CollectingHandler.prototype.onreset = function() {
    this.events = [];
    if (this._cbs.onreset) this._cbs.onreset();
};

CollectingHandler.prototype.restart = function() {
    if (this._cbs.onreset) this._cbs.onreset();

    for (var i = 0, len = this.events.length; i < len; i++) {
        if (this._cbs[this.events[i][0]]) {
            var num = this.events[i].length;

            if (num === 1) {
                this._cbs[this.events[i][0]]();
            } else if (num === 2) {
                this._cbs[this.events[i][0]](this.events[i][1]);
            } else {
                this._cbs[this.events[i][0]](
                    this.events[i][1],
                    this.events[i][2]
                );
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/FeedHandler.js":
/*!************************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/FeedHandler.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DomHandler = __webpack_require__(/*! domhandler */ "./node_modules/react-html-parser/node_modules/domhandler/index.js");
var DomUtils = __webpack_require__(/*! domutils */ "./node_modules/domutils/index.js");

//TODO: make this a streamable handler
function FeedHandler(callback, options) {
    this.init(callback, options);
}

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(FeedHandler, DomHandler);

FeedHandler.prototype.init = DomHandler;

function getElements(what, where) {
    return DomUtils.getElementsByTagName(what, where, true);
}
function getOneElement(what, where) {
    return DomUtils.getElementsByTagName(what, where, true, 1)[0];
}
function fetch(what, where, recurse) {
    return DomUtils.getText(
        DomUtils.getElementsByTagName(what, where, recurse, 1)
    ).trim();
}

function addConditionally(obj, prop, what, where, recurse) {
    var tmp = fetch(what, where, recurse);
    if (tmp) obj[prop] = tmp;
}

var isValidFeed = function(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
};

FeedHandler.prototype.onend = function() {
    var feed = {},
        feedRoot = getOneElement(isValidFeed, this.dom),
        tmp,
        childs;

    if (feedRoot) {
        if (feedRoot.name === "feed") {
            childs = feedRoot.children;

            feed.type = "atom";
            addConditionally(feed, "id", "id", childs);
            addConditionally(feed, "title", "title", childs);
            if (
                (tmp = getOneElement("link", childs)) &&
                (tmp = tmp.attribs) &&
                (tmp = tmp.href)
            )
                feed.link = tmp;
            addConditionally(feed, "description", "subtitle", childs);
            if ((tmp = fetch("updated", childs))) feed.updated = new Date(tmp);
            addConditionally(feed, "author", "email", childs, true);

            feed.items = getElements("entry", childs).map(function(item) {
                var entry = {},
                    tmp;

                item = item.children;

                addConditionally(entry, "id", "id", item);
                addConditionally(entry, "title", "title", item);
                if (
                    (tmp = getOneElement("link", item)) &&
                    (tmp = tmp.attribs) &&
                    (tmp = tmp.href)
                )
                    entry.link = tmp;
                if ((tmp = fetch("summary", item) || fetch("content", item)))
                    entry.description = tmp;
                if ((tmp = fetch("updated", item)))
                    entry.pubDate = new Date(tmp);
                return entry;
            });
        } else {
            childs = getOneElement("channel", feedRoot.children).children;

            feed.type = feedRoot.name.substr(0, 3);
            feed.id = "";
            addConditionally(feed, "title", "title", childs);
            addConditionally(feed, "link", "link", childs);
            addConditionally(feed, "description", "description", childs);
            if ((tmp = fetch("lastBuildDate", childs)))
                feed.updated = new Date(tmp);
            addConditionally(feed, "author", "managingEditor", childs, true);

            feed.items = getElements("item", feedRoot.children).map(function(
                item
            ) {
                var entry = {},
                    tmp;

                item = item.children;

                addConditionally(entry, "id", "guid", item);
                addConditionally(entry, "title", "title", item);
                addConditionally(entry, "link", "link", item);
                addConditionally(entry, "description", "description", item);
                if ((tmp = fetch("pubDate", item)))
                    entry.pubDate = new Date(tmp);
                return entry;
            });
        }
    }
    this.dom = feed;
    DomHandler.prototype._handleCallback.call(
        this,
        feedRoot ? null : Error("couldn't find root of feed")
    );
};

module.exports = FeedHandler;


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Parser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/Parser.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Tokenizer = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Tokenizer.js");

/*
	Options:

	xmlMode: Disables the special behavior for script/style tags (false by default)
	lowerCaseAttributeNames: call .toLowerCase for each attribute name (true if xmlMode is `false`)
	lowerCaseTags: call .toLowerCase for each tag name (true if xmlMode is `false`)
*/

/*
	Callbacks:

	oncdataend,
	oncdatastart,
	onclosetag,
	oncomment,
	oncommentend,
	onerror,
	onopentag,
	onprocessinginstruction,
	onreset,
	ontext
*/

var formTags = {
    input: true,
    option: true,
    optgroup: true,
    select: true,
    button: true,
    datalist: true,
    textarea: true
};

var openImpliesClose = {
    tr: { tr: true, th: true, td: true },
    th: { th: true },
    td: { thead: true, th: true, td: true },
    body: { head: true, link: true, script: true },
    li: { li: true },
    p: { p: true },
    h1: { p: true },
    h2: { p: true },
    h3: { p: true },
    h4: { p: true },
    h5: { p: true },
    h6: { p: true },
    select: formTags,
    input: formTags,
    output: formTags,
    button: formTags,
    datalist: formTags,
    textarea: formTags,
    option: { option: true },
    optgroup: { optgroup: true }
};

var voidElements = {
    __proto__: null,
    area: true,
    base: true,
    basefont: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    isindex: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};

var foreignContextElements = {
    __proto__: null,
    math: true,
    svg: true
};
var htmlIntegrationElements = {
    __proto__: null,
    mi: true,
    mo: true,
    mn: true,
    ms: true,
    mtext: true,
    "annotation-xml": true,
    foreignObject: true,
    desc: true,
    title: true
};

var re_nameEnd = /\s|\//;

function Parser(cbs, options) {
    this._options = options || {};
    this._cbs = cbs || {};

    this._tagname = "";
    this._attribname = "";
    this._attribvalue = "";
    this._attribs = null;
    this._stack = [];
    this._foreignContext = [];

    this.startIndex = 0;
    this.endIndex = null;

    this._lowerCaseTagNames =
        "lowerCaseTags" in this._options
            ? !!this._options.lowerCaseTags
            : !this._options.xmlMode;
    this._lowerCaseAttributeNames =
        "lowerCaseAttributeNames" in this._options
            ? !!this._options.lowerCaseAttributeNames
            : !this._options.xmlMode;

    if (this._options.Tokenizer) {
        Tokenizer = this._options.Tokenizer;
    }
    this._tokenizer = new Tokenizer(this._options, this);

    if (this._cbs.onparserinit) this._cbs.onparserinit(this);
}

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Parser, __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter);

Parser.prototype._updatePosition = function(initialOffset) {
    if (this.endIndex === null) {
        if (this._tokenizer._sectionStart <= initialOffset) {
            this.startIndex = 0;
        } else {
            this.startIndex = this._tokenizer._sectionStart - initialOffset;
        }
    } else this.startIndex = this.endIndex + 1;
    this.endIndex = this._tokenizer.getAbsoluteIndex();
};

//Tokenizer event handlers
Parser.prototype.ontext = function(data) {
    this._updatePosition(1);
    this.endIndex--;

    if (this._cbs.ontext) this._cbs.ontext(data);
};

Parser.prototype.onopentagname = function(name) {
    if (this._lowerCaseTagNames) {
        name = name.toLowerCase();
    }

    this._tagname = name;

    if (!this._options.xmlMode && name in openImpliesClose) {
        for (
            var el;
            (el = this._stack[this._stack.length - 1]) in
            openImpliesClose[name];
            this.onclosetag(el)
        );
    }

    if (this._options.xmlMode || !(name in voidElements)) {
        this._stack.push(name);
        if (name in foreignContextElements) this._foreignContext.push(true);
        else if (name in htmlIntegrationElements)
            this._foreignContext.push(false);
    }

    if (this._cbs.onopentagname) this._cbs.onopentagname(name);
    if (this._cbs.onopentag) this._attribs = {};
};

Parser.prototype.onopentagend = function() {
    this._updatePosition(1);

    if (this._attribs) {
        if (this._cbs.onopentag)
            this._cbs.onopentag(this._tagname, this._attribs);
        this._attribs = null;
    }

    if (
        !this._options.xmlMode &&
        this._cbs.onclosetag &&
        this._tagname in voidElements
    ) {
        this._cbs.onclosetag(this._tagname);
    }

    this._tagname = "";
};

Parser.prototype.onclosetag = function(name) {
    this._updatePosition(1);

    if (this._lowerCaseTagNames) {
        name = name.toLowerCase();
    }
    
    if (name in foreignContextElements || name in htmlIntegrationElements) {
        this._foreignContext.pop();
    }

    if (
        this._stack.length &&
        (!(name in voidElements) || this._options.xmlMode)
    ) {
        var pos = this._stack.lastIndexOf(name);
        if (pos !== -1) {
            if (this._cbs.onclosetag) {
                pos = this._stack.length - pos;
                while (pos--) this._cbs.onclosetag(this._stack.pop());
            } else this._stack.length = pos;
        } else if (name === "p" && !this._options.xmlMode) {
            this.onopentagname(name);
            this._closeCurrentTag();
        }
    } else if (!this._options.xmlMode && (name === "br" || name === "p")) {
        this.onopentagname(name);
        this._closeCurrentTag();
    }
};

Parser.prototype.onselfclosingtag = function() {
    if (
        this._options.xmlMode ||
        this._options.recognizeSelfClosing ||
        this._foreignContext[this._foreignContext.length - 1]
    ) {
        this._closeCurrentTag();
    } else {
        this.onopentagend();
    }
};

Parser.prototype._closeCurrentTag = function() {
    var name = this._tagname;

    this.onopentagend();

    //self-closing tags will be on the top of the stack
    //(cheaper check than in onclosetag)
    if (this._stack[this._stack.length - 1] === name) {
        if (this._cbs.onclosetag) {
            this._cbs.onclosetag(name);
        }
        this._stack.pop();
        
    }
};

Parser.prototype.onattribname = function(name) {
    if (this._lowerCaseAttributeNames) {
        name = name.toLowerCase();
    }
    this._attribname = name;
};

Parser.prototype.onattribdata = function(value) {
    this._attribvalue += value;
};

Parser.prototype.onattribend = function() {
    if (this._cbs.onattribute)
        this._cbs.onattribute(this._attribname, this._attribvalue);
    if (
        this._attribs &&
        !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)
    ) {
        this._attribs[this._attribname] = this._attribvalue;
    }
    this._attribname = "";
    this._attribvalue = "";
};

Parser.prototype._getInstructionName = function(value) {
    var idx = value.search(re_nameEnd),
        name = idx < 0 ? value : value.substr(0, idx);

    if (this._lowerCaseTagNames) {
        name = name.toLowerCase();
    }

    return name;
};

Parser.prototype.ondeclaration = function(value) {
    if (this._cbs.onprocessinginstruction) {
        var name = this._getInstructionName(value);
        this._cbs.onprocessinginstruction("!" + name, "!" + value);
    }
};

Parser.prototype.onprocessinginstruction = function(value) {
    if (this._cbs.onprocessinginstruction) {
        var name = this._getInstructionName(value);
        this._cbs.onprocessinginstruction("?" + name, "?" + value);
    }
};

Parser.prototype.oncomment = function(value) {
    this._updatePosition(4);

    if (this._cbs.oncomment) this._cbs.oncomment(value);
    if (this._cbs.oncommentend) this._cbs.oncommentend();
};

Parser.prototype.oncdata = function(value) {
    this._updatePosition(1);

    if (this._options.xmlMode || this._options.recognizeCDATA) {
        if (this._cbs.oncdatastart) this._cbs.oncdatastart();
        if (this._cbs.ontext) this._cbs.ontext(value);
        if (this._cbs.oncdataend) this._cbs.oncdataend();
    } else {
        this.oncomment("[CDATA[" + value + "]]");
    }
};

Parser.prototype.onerror = function(err) {
    if (this._cbs.onerror) this._cbs.onerror(err);
};

Parser.prototype.onend = function() {
    if (this._cbs.onclosetag) {
        for (
            var i = this._stack.length;
            i > 0;
            this._cbs.onclosetag(this._stack[--i])
        );
    }
    if (this._cbs.onend) this._cbs.onend();
};

//Resets the parser to a blank state, ready to parse a new HTML document
Parser.prototype.reset = function() {
    if (this._cbs.onreset) this._cbs.onreset();
    this._tokenizer.reset();

    this._tagname = "";
    this._attribname = "";
    this._attribs = null;
    this._stack = [];

    if (this._cbs.onparserinit) this._cbs.onparserinit(this);
};

//Parses a complete HTML document and pushes it to the handler
Parser.prototype.parseComplete = function(data) {
    this.reset();
    this.end(data);
};

Parser.prototype.write = function(chunk) {
    this._tokenizer.write(chunk);
};

Parser.prototype.end = function(chunk) {
    this._tokenizer.end(chunk);
};

Parser.prototype.pause = function() {
    this._tokenizer.pause();
};

Parser.prototype.resume = function() {
    this._tokenizer.resume();
};

//alias for backwards compat
Parser.prototype.parseChunk = Parser.prototype.write;
Parser.prototype.done = Parser.prototype.end;

module.exports = Parser;


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/ProxyHandler.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/ProxyHandler.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = ProxyHandler;

function ProxyHandler(cbs) {
    this._cbs = cbs || {};
}

var EVENTS = __webpack_require__(/*! ./ */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js").EVENTS;
Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        name = "on" + name;
        ProxyHandler.prototype[name] = function() {
            if (this._cbs[name]) this._cbs[name]();
        };
    } else if (EVENTS[name] === 1) {
        name = "on" + name;
        ProxyHandler.prototype[name] = function(a) {
            if (this._cbs[name]) this._cbs[name](a);
        };
    } else if (EVENTS[name] === 2) {
        name = "on" + name;
        ProxyHandler.prototype[name] = function(a, b) {
            if (this._cbs[name]) this._cbs[name](a, b);
        };
    } else {
        throw Error("wrong number of arguments");
    }
});


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Stream.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/Stream.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = Stream;

var Parser = __webpack_require__(/*! ./WritableStream.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/WritableStream.js");

function Stream(options) {
    Parser.call(this, new Cbs(this), options);
}

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Stream, Parser);

Stream.prototype.readable = true;

function Cbs(scope) {
    this.scope = scope;
}

var EVENTS = __webpack_require__(/*! ../ */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js").EVENTS;

Object.keys(EVENTS).forEach(function(name) {
    if (EVENTS[name] === 0) {
        Cbs.prototype["on" + name] = function() {
            this.scope.emit(name);
        };
    } else if (EVENTS[name] === 1) {
        Cbs.prototype["on" + name] = function(a) {
            this.scope.emit(name, a);
        };
    } else if (EVENTS[name] === 2) {
        Cbs.prototype["on" + name] = function(a, b) {
            this.scope.emit(name, a, b);
        };
    } else {
        throw Error("wrong number of arguments!");
    }
});


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Tokenizer.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/Tokenizer.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = Tokenizer;

var decodeCodePoint = __webpack_require__(/*! entities/lib/decode_codepoint.js */ "./node_modules/react-html-parser/node_modules/entities/lib/decode_codepoint.js");
var entityMap = __webpack_require__(/*! entities/maps/entities.json */ "./node_modules/react-html-parser/node_modules/entities/maps/entities.json");
var legacyMap = __webpack_require__(/*! entities/maps/legacy.json */ "./node_modules/react-html-parser/node_modules/entities/maps/legacy.json");
var xmlMap = __webpack_require__(/*! entities/maps/xml.json */ "./node_modules/react-html-parser/node_modules/entities/maps/xml.json");

var i = 0;

var TEXT = i++;
var BEFORE_TAG_NAME = i++; //after <
var IN_TAG_NAME = i++;
var IN_SELF_CLOSING_TAG = i++;
var BEFORE_CLOSING_TAG_NAME = i++;
var IN_CLOSING_TAG_NAME = i++;
var AFTER_CLOSING_TAG_NAME = i++;

//attributes
var BEFORE_ATTRIBUTE_NAME = i++;
var IN_ATTRIBUTE_NAME = i++;
var AFTER_ATTRIBUTE_NAME = i++;
var BEFORE_ATTRIBUTE_VALUE = i++;
var IN_ATTRIBUTE_VALUE_DQ = i++; // "
var IN_ATTRIBUTE_VALUE_SQ = i++; // '
var IN_ATTRIBUTE_VALUE_NQ = i++;

//declarations
var BEFORE_DECLARATION = i++; // !
var IN_DECLARATION = i++;

//processing instructions
var IN_PROCESSING_INSTRUCTION = i++; // ?

//comments
var BEFORE_COMMENT = i++;
var IN_COMMENT = i++;
var AFTER_COMMENT_1 = i++;
var AFTER_COMMENT_2 = i++;

//cdata
var BEFORE_CDATA_1 = i++; // [
var BEFORE_CDATA_2 = i++; // C
var BEFORE_CDATA_3 = i++; // D
var BEFORE_CDATA_4 = i++; // A
var BEFORE_CDATA_5 = i++; // T
var BEFORE_CDATA_6 = i++; // A
var IN_CDATA = i++; // [
var AFTER_CDATA_1 = i++; // ]
var AFTER_CDATA_2 = i++; // ]

//special tags
var BEFORE_SPECIAL = i++; //S
var BEFORE_SPECIAL_END = i++; //S

var BEFORE_SCRIPT_1 = i++; //C
var BEFORE_SCRIPT_2 = i++; //R
var BEFORE_SCRIPT_3 = i++; //I
var BEFORE_SCRIPT_4 = i++; //P
var BEFORE_SCRIPT_5 = i++; //T
var AFTER_SCRIPT_1 = i++; //C
var AFTER_SCRIPT_2 = i++; //R
var AFTER_SCRIPT_3 = i++; //I
var AFTER_SCRIPT_4 = i++; //P
var AFTER_SCRIPT_5 = i++; //T

var BEFORE_STYLE_1 = i++; //T
var BEFORE_STYLE_2 = i++; //Y
var BEFORE_STYLE_3 = i++; //L
var BEFORE_STYLE_4 = i++; //E
var AFTER_STYLE_1 = i++; //T
var AFTER_STYLE_2 = i++; //Y
var AFTER_STYLE_3 = i++; //L
var AFTER_STYLE_4 = i++; //E

var BEFORE_ENTITY = i++; //&
var BEFORE_NUMERIC_ENTITY = i++; //#
var IN_NAMED_ENTITY = i++;
var IN_NUMERIC_ENTITY = i++;
var IN_HEX_ENTITY = i++; //X

var j = 0;

var SPECIAL_NONE = j++;
var SPECIAL_SCRIPT = j++;
var SPECIAL_STYLE = j++;

function whitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function ifElseState(upper, SUCCESS, FAILURE) {
    var lower = upper.toLowerCase();

    if (upper === lower) {
        return function(c) {
            if (c === lower) {
                this._state = SUCCESS;
            } else {
                this._state = FAILURE;
                this._index--;
            }
        };
    } else {
        return function(c) {
            if (c === lower || c === upper) {
                this._state = SUCCESS;
            } else {
                this._state = FAILURE;
                this._index--;
            }
        };
    }
}

function consumeSpecialNameChar(upper, NEXT_STATE) {
    var lower = upper.toLowerCase();

    return function(c) {
        if (c === lower || c === upper) {
            this._state = NEXT_STATE;
        } else {
            this._state = IN_TAG_NAME;
            this._index--; //consume the token again
        }
    };
}

function Tokenizer(options, cbs) {
    this._state = TEXT;
    this._buffer = "";
    this._sectionStart = 0;
    this._index = 0;
    this._bufferOffset = 0; //chars removed from _buffer
    this._baseState = TEXT;
    this._special = SPECIAL_NONE;
    this._cbs = cbs;
    this._running = true;
    this._ended = false;
    this._xmlMode = !!(options && options.xmlMode);
    this._decodeEntities = !!(options && options.decodeEntities);
}

Tokenizer.prototype._stateText = function(c) {
    if (c === "<") {
        if (this._index > this._sectionStart) {
            this._cbs.ontext(this._getSection());
        }
        this._state = BEFORE_TAG_NAME;
        this._sectionStart = this._index;
    } else if (
        this._decodeEntities &&
        this._special === SPECIAL_NONE &&
        c === "&"
    ) {
        if (this._index > this._sectionStart) {
            this._cbs.ontext(this._getSection());
        }
        this._baseState = TEXT;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateBeforeTagName = function(c) {
    if (c === "/") {
        this._state = BEFORE_CLOSING_TAG_NAME;
    } else if (c === "<") {
        this._cbs.ontext(this._getSection());
        this._sectionStart = this._index;
    } else if (c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
        this._state = TEXT;
    } else if (c === "!") {
        this._state = BEFORE_DECLARATION;
        this._sectionStart = this._index + 1;
    } else if (c === "?") {
        this._state = IN_PROCESSING_INSTRUCTION;
        this._sectionStart = this._index + 1;
    } else {
        this._state =
            !this._xmlMode && (c === "s" || c === "S")
                ? BEFORE_SPECIAL
                : IN_TAG_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInTagName = function(c) {
    if (c === "/" || c === ">" || whitespace(c)) {
        this._emitToken("onopentagname");
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateBeforeCloseingTagName = function(c) {
    if (whitespace(c));
    else if (c === ">") {
        this._state = TEXT;
    } else if (this._special !== SPECIAL_NONE) {
        if (c === "s" || c === "S") {
            this._state = BEFORE_SPECIAL_END;
        } else {
            this._state = TEXT;
            this._index--;
        }
    } else {
        this._state = IN_CLOSING_TAG_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInCloseingTagName = function(c) {
    if (c === ">" || whitespace(c)) {
        this._emitToken("onclosetag");
        this._state = AFTER_CLOSING_TAG_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateAfterCloseingTagName = function(c) {
    //skip everything until ">"
    if (c === ">") {
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    }
};

Tokenizer.prototype._stateBeforeAttributeName = function(c) {
    if (c === ">") {
        this._cbs.onopentagend();
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (c === "/") {
        this._state = IN_SELF_CLOSING_TAG;
    } else if (!whitespace(c)) {
        this._state = IN_ATTRIBUTE_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInSelfClosingTag = function(c) {
    if (c === ">") {
        this._cbs.onselfclosingtag();
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (!whitespace(c)) {
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateInAttributeName = function(c) {
    if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
        this._cbs.onattribname(this._getSection());
        this._sectionStart = -1;
        this._state = AFTER_ATTRIBUTE_NAME;
        this._index--;
    }
};

Tokenizer.prototype._stateAfterAttributeName = function(c) {
    if (c === "=") {
        this._state = BEFORE_ATTRIBUTE_VALUE;
    } else if (c === "/" || c === ">") {
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    } else if (!whitespace(c)) {
        this._cbs.onattribend();
        this._state = IN_ATTRIBUTE_NAME;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateBeforeAttributeValue = function(c) {
    if (c === '"') {
        this._state = IN_ATTRIBUTE_VALUE_DQ;
        this._sectionStart = this._index + 1;
    } else if (c === "'") {
        this._state = IN_ATTRIBUTE_VALUE_SQ;
        this._sectionStart = this._index + 1;
    } else if (!whitespace(c)) {
        this._state = IN_ATTRIBUTE_VALUE_NQ;
        this._sectionStart = this._index;
        this._index--; //reconsume token
    }
};

Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function(c) {
    if (c === '"') {
        this._emitToken("onattribdata");
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
    } else if (this._decodeEntities && c === "&") {
        this._emitToken("onattribdata");
        this._baseState = this._state;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInAttributeValueSingleQuotes = function(c) {
    if (c === "'") {
        this._emitToken("onattribdata");
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
    } else if (this._decodeEntities && c === "&") {
        this._emitToken("onattribdata");
        this._baseState = this._state;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateInAttributeValueNoQuotes = function(c) {
    if (whitespace(c) || c === ">") {
        this._emitToken("onattribdata");
        this._cbs.onattribend();
        this._state = BEFORE_ATTRIBUTE_NAME;
        this._index--;
    } else if (this._decodeEntities && c === "&") {
        this._emitToken("onattribdata");
        this._baseState = this._state;
        this._state = BEFORE_ENTITY;
        this._sectionStart = this._index;
    }
};

Tokenizer.prototype._stateBeforeDeclaration = function(c) {
    this._state =
        c === "["
            ? BEFORE_CDATA_1
            : c === "-"
                ? BEFORE_COMMENT
                : IN_DECLARATION;
};

Tokenizer.prototype._stateInDeclaration = function(c) {
    if (c === ">") {
        this._cbs.ondeclaration(this._getSection());
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    }
};

Tokenizer.prototype._stateInProcessingInstruction = function(c) {
    if (c === ">") {
        this._cbs.onprocessinginstruction(this._getSection());
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    }
};

Tokenizer.prototype._stateBeforeComment = function(c) {
    if (c === "-") {
        this._state = IN_COMMENT;
        this._sectionStart = this._index + 1;
    } else {
        this._state = IN_DECLARATION;
    }
};

Tokenizer.prototype._stateInComment = function(c) {
    if (c === "-") this._state = AFTER_COMMENT_1;
};

Tokenizer.prototype._stateAfterComment1 = function(c) {
    if (c === "-") {
        this._state = AFTER_COMMENT_2;
    } else {
        this._state = IN_COMMENT;
    }
};

Tokenizer.prototype._stateAfterComment2 = function(c) {
    if (c === ">") {
        //remove 2 trailing chars
        this._cbs.oncomment(
            this._buffer.substring(this._sectionStart, this._index - 2)
        );
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (c !== "-") {
        this._state = IN_COMMENT;
    }
    // else: stay in AFTER_COMMENT_2 (`--->`)
};

Tokenizer.prototype._stateBeforeCdata1 = ifElseState(
    "C",
    BEFORE_CDATA_2,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata2 = ifElseState(
    "D",
    BEFORE_CDATA_3,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata3 = ifElseState(
    "A",
    BEFORE_CDATA_4,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata4 = ifElseState(
    "T",
    BEFORE_CDATA_5,
    IN_DECLARATION
);
Tokenizer.prototype._stateBeforeCdata5 = ifElseState(
    "A",
    BEFORE_CDATA_6,
    IN_DECLARATION
);

Tokenizer.prototype._stateBeforeCdata6 = function(c) {
    if (c === "[") {
        this._state = IN_CDATA;
        this._sectionStart = this._index + 1;
    } else {
        this._state = IN_DECLARATION;
        this._index--;
    }
};

Tokenizer.prototype._stateInCdata = function(c) {
    if (c === "]") this._state = AFTER_CDATA_1;
};

Tokenizer.prototype._stateAfterCdata1 = function(c) {
    if (c === "]") this._state = AFTER_CDATA_2;
    else this._state = IN_CDATA;
};

Tokenizer.prototype._stateAfterCdata2 = function(c) {
    if (c === ">") {
        //remove 2 trailing chars
        this._cbs.oncdata(
            this._buffer.substring(this._sectionStart, this._index - 2)
        );
        this._state = TEXT;
        this._sectionStart = this._index + 1;
    } else if (c !== "]") {
        this._state = IN_CDATA;
    }
    //else: stay in AFTER_CDATA_2 (`]]]>`)
};

Tokenizer.prototype._stateBeforeSpecial = function(c) {
    if (c === "c" || c === "C") {
        this._state = BEFORE_SCRIPT_1;
    } else if (c === "t" || c === "T") {
        this._state = BEFORE_STYLE_1;
    } else {
        this._state = IN_TAG_NAME;
        this._index--; //consume the token again
    }
};

Tokenizer.prototype._stateBeforeSpecialEnd = function(c) {
    if (this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")) {
        this._state = AFTER_SCRIPT_1;
    } else if (this._special === SPECIAL_STYLE && (c === "t" || c === "T")) {
        this._state = AFTER_STYLE_1;
    } else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeScript1 = consumeSpecialNameChar(
    "R",
    BEFORE_SCRIPT_2
);
Tokenizer.prototype._stateBeforeScript2 = consumeSpecialNameChar(
    "I",
    BEFORE_SCRIPT_3
);
Tokenizer.prototype._stateBeforeScript3 = consumeSpecialNameChar(
    "P",
    BEFORE_SCRIPT_4
);
Tokenizer.prototype._stateBeforeScript4 = consumeSpecialNameChar(
    "T",
    BEFORE_SCRIPT_5
);

Tokenizer.prototype._stateBeforeScript5 = function(c) {
    if (c === "/" || c === ">" || whitespace(c)) {
        this._special = SPECIAL_SCRIPT;
    }
    this._state = IN_TAG_NAME;
    this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
Tokenizer.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
Tokenizer.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
Tokenizer.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);

Tokenizer.prototype._stateAfterScript5 = function(c) {
    if (c === ">" || whitespace(c)) {
        this._special = SPECIAL_NONE;
        this._state = IN_CLOSING_TAG_NAME;
        this._sectionStart = this._index - 6;
        this._index--; //reconsume the token
    } else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeStyle1 = consumeSpecialNameChar(
    "Y",
    BEFORE_STYLE_2
);
Tokenizer.prototype._stateBeforeStyle2 = consumeSpecialNameChar(
    "L",
    BEFORE_STYLE_3
);
Tokenizer.prototype._stateBeforeStyle3 = consumeSpecialNameChar(
    "E",
    BEFORE_STYLE_4
);

Tokenizer.prototype._stateBeforeStyle4 = function(c) {
    if (c === "/" || c === ">" || whitespace(c)) {
        this._special = SPECIAL_STYLE;
    }
    this._state = IN_TAG_NAME;
    this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
Tokenizer.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
Tokenizer.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);

Tokenizer.prototype._stateAfterStyle4 = function(c) {
    if (c === ">" || whitespace(c)) {
        this._special = SPECIAL_NONE;
        this._state = IN_CLOSING_TAG_NAME;
        this._sectionStart = this._index - 5;
        this._index--; //reconsume the token
    } else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeEntity = ifElseState(
    "#",
    BEFORE_NUMERIC_ENTITY,
    IN_NAMED_ENTITY
);
Tokenizer.prototype._stateBeforeNumericEntity = ifElseState(
    "X",
    IN_HEX_ENTITY,
    IN_NUMERIC_ENTITY
);

//for entities terminated with a semicolon
Tokenizer.prototype._parseNamedEntityStrict = function() {
    //offset = 1
    if (this._sectionStart + 1 < this._index) {
        var entity = this._buffer.substring(
                this._sectionStart + 1,
                this._index
            ),
            map = this._xmlMode ? xmlMap : entityMap;

        if (map.hasOwnProperty(entity)) {
            this._emitPartial(map[entity]);
            this._sectionStart = this._index + 1;
        }
    }
};

//parses legacy entities (without trailing semicolon)
Tokenizer.prototype._parseLegacyEntity = function() {
    var start = this._sectionStart + 1,
        limit = this._index - start;

    if (limit > 6) limit = 6; //the max length of legacy entities is 6

    while (limit >= 2) {
        //the min length of legacy entities is 2
        var entity = this._buffer.substr(start, limit);

        if (legacyMap.hasOwnProperty(entity)) {
            this._emitPartial(legacyMap[entity]);
            this._sectionStart += limit + 1;
            return;
        } else {
            limit--;
        }
    }
};

Tokenizer.prototype._stateInNamedEntity = function(c) {
    if (c === ";") {
        this._parseNamedEntityStrict();
        if (this._sectionStart + 1 < this._index && !this._xmlMode) {
            this._parseLegacyEntity();
        }
        this._state = this._baseState;
    } else if (
        (c < "a" || c > "z") &&
        (c < "A" || c > "Z") &&
        (c < "0" || c > "9")
    ) {
        if (this._xmlMode);
        else if (this._sectionStart + 1 === this._index);
        else if (this._baseState !== TEXT) {
            if (c !== "=") {
                this._parseNamedEntityStrict();
            }
        } else {
            this._parseLegacyEntity();
        }

        this._state = this._baseState;
        this._index--;
    }
};

Tokenizer.prototype._decodeNumericEntity = function(offset, base) {
    var sectionStart = this._sectionStart + offset;

    if (sectionStart !== this._index) {
        //parse entity
        var entity = this._buffer.substring(sectionStart, this._index);
        var parsed = parseInt(entity, base);

        this._emitPartial(decodeCodePoint(parsed));
        this._sectionStart = this._index;
    } else {
        this._sectionStart--;
    }

    this._state = this._baseState;
};

Tokenizer.prototype._stateInNumericEntity = function(c) {
    if (c === ";") {
        this._decodeNumericEntity(2, 10);
        this._sectionStart++;
    } else if (c < "0" || c > "9") {
        if (!this._xmlMode) {
            this._decodeNumericEntity(2, 10);
        } else {
            this._state = this._baseState;
        }
        this._index--;
    }
};

Tokenizer.prototype._stateInHexEntity = function(c) {
    if (c === ";") {
        this._decodeNumericEntity(3, 16);
        this._sectionStart++;
    } else if (
        (c < "a" || c > "f") &&
        (c < "A" || c > "F") &&
        (c < "0" || c > "9")
    ) {
        if (!this._xmlMode) {
            this._decodeNumericEntity(3, 16);
        } else {
            this._state = this._baseState;
        }
        this._index--;
    }
};

Tokenizer.prototype._cleanup = function() {
    if (this._sectionStart < 0) {
        this._buffer = "";
        this._bufferOffset += this._index;
        this._index = 0;
    } else if (this._running) {
        if (this._state === TEXT) {
            if (this._sectionStart !== this._index) {
                this._cbs.ontext(this._buffer.substr(this._sectionStart));
            }
            this._buffer = "";
            this._bufferOffset += this._index;
            this._index = 0;
        } else if (this._sectionStart === this._index) {
            //the section just started
            this._buffer = "";
            this._bufferOffset += this._index;
            this._index = 0;
        } else {
            //remove everything unnecessary
            this._buffer = this._buffer.substr(this._sectionStart);
            this._index -= this._sectionStart;
            this._bufferOffset += this._sectionStart;
        }

        this._sectionStart = 0;
    }
};

//TODO make events conditional
Tokenizer.prototype.write = function(chunk) {
    if (this._ended) this._cbs.onerror(Error(".write() after done!"));

    this._buffer += chunk;
    this._parse();
};

Tokenizer.prototype._parse = function() {
    while (this._index < this._buffer.length && this._running) {
        var c = this._buffer.charAt(this._index);
        if (this._state === TEXT) {
            this._stateText(c);
        } else if (this._state === BEFORE_TAG_NAME) {
            this._stateBeforeTagName(c);
        } else if (this._state === IN_TAG_NAME) {
            this._stateInTagName(c);
        } else if (this._state === BEFORE_CLOSING_TAG_NAME) {
            this._stateBeforeCloseingTagName(c);
        } else if (this._state === IN_CLOSING_TAG_NAME) {
            this._stateInCloseingTagName(c);
        } else if (this._state === AFTER_CLOSING_TAG_NAME) {
            this._stateAfterCloseingTagName(c);
        } else if (this._state === IN_SELF_CLOSING_TAG) {
            this._stateInSelfClosingTag(c);
        } else if (this._state === BEFORE_ATTRIBUTE_NAME) {

        /*
		*	attributes
		*/
            this._stateBeforeAttributeName(c);
        } else if (this._state === IN_ATTRIBUTE_NAME) {
            this._stateInAttributeName(c);
        } else if (this._state === AFTER_ATTRIBUTE_NAME) {
            this._stateAfterAttributeName(c);
        } else if (this._state === BEFORE_ATTRIBUTE_VALUE) {
            this._stateBeforeAttributeValue(c);
        } else if (this._state === IN_ATTRIBUTE_VALUE_DQ) {
            this._stateInAttributeValueDoubleQuotes(c);
        } else if (this._state === IN_ATTRIBUTE_VALUE_SQ) {
            this._stateInAttributeValueSingleQuotes(c);
        } else if (this._state === IN_ATTRIBUTE_VALUE_NQ) {
            this._stateInAttributeValueNoQuotes(c);
        } else if (this._state === BEFORE_DECLARATION) {

        /*
		*	declarations
		*/
            this._stateBeforeDeclaration(c);
        } else if (this._state === IN_DECLARATION) {
            this._stateInDeclaration(c);
        } else if (this._state === IN_PROCESSING_INSTRUCTION) {

        /*
		*	processing instructions
		*/
            this._stateInProcessingInstruction(c);
        } else if (this._state === BEFORE_COMMENT) {

        /*
		*	comments
		*/
            this._stateBeforeComment(c);
        } else if (this._state === IN_COMMENT) {
            this._stateInComment(c);
        } else if (this._state === AFTER_COMMENT_1) {
            this._stateAfterComment1(c);
        } else if (this._state === AFTER_COMMENT_2) {
            this._stateAfterComment2(c);
        } else if (this._state === BEFORE_CDATA_1) {

        /*
		*	cdata
		*/
            this._stateBeforeCdata1(c);
        } else if (this._state === BEFORE_CDATA_2) {
            this._stateBeforeCdata2(c);
        } else if (this._state === BEFORE_CDATA_3) {
            this._stateBeforeCdata3(c);
        } else if (this._state === BEFORE_CDATA_4) {
            this._stateBeforeCdata4(c);
        } else if (this._state === BEFORE_CDATA_5) {
            this._stateBeforeCdata5(c);
        } else if (this._state === BEFORE_CDATA_6) {
            this._stateBeforeCdata6(c);
        } else if (this._state === IN_CDATA) {
            this._stateInCdata(c);
        } else if (this._state === AFTER_CDATA_1) {
            this._stateAfterCdata1(c);
        } else if (this._state === AFTER_CDATA_2) {
            this._stateAfterCdata2(c);
        } else if (this._state === BEFORE_SPECIAL) {

        /*
		* special tags
		*/
            this._stateBeforeSpecial(c);
        } else if (this._state === BEFORE_SPECIAL_END) {
            this._stateBeforeSpecialEnd(c);
        } else if (this._state === BEFORE_SCRIPT_1) {

        /*
		* script
		*/
            this._stateBeforeScript1(c);
        } else if (this._state === BEFORE_SCRIPT_2) {
            this._stateBeforeScript2(c);
        } else if (this._state === BEFORE_SCRIPT_3) {
            this._stateBeforeScript3(c);
        } else if (this._state === BEFORE_SCRIPT_4) {
            this._stateBeforeScript4(c);
        } else if (this._state === BEFORE_SCRIPT_5) {
            this._stateBeforeScript5(c);
        } else if (this._state === AFTER_SCRIPT_1) {
            this._stateAfterScript1(c);
        } else if (this._state === AFTER_SCRIPT_2) {
            this._stateAfterScript2(c);
        } else if (this._state === AFTER_SCRIPT_3) {
            this._stateAfterScript3(c);
        } else if (this._state === AFTER_SCRIPT_4) {
            this._stateAfterScript4(c);
        } else if (this._state === AFTER_SCRIPT_5) {
            this._stateAfterScript5(c);
        } else if (this._state === BEFORE_STYLE_1) {

        /*
		* style
		*/
            this._stateBeforeStyle1(c);
        } else if (this._state === BEFORE_STYLE_2) {
            this._stateBeforeStyle2(c);
        } else if (this._state === BEFORE_STYLE_3) {
            this._stateBeforeStyle3(c);
        } else if (this._state === BEFORE_STYLE_4) {
            this._stateBeforeStyle4(c);
        } else if (this._state === AFTER_STYLE_1) {
            this._stateAfterStyle1(c);
        } else if (this._state === AFTER_STYLE_2) {
            this._stateAfterStyle2(c);
        } else if (this._state === AFTER_STYLE_3) {
            this._stateAfterStyle3(c);
        } else if (this._state === AFTER_STYLE_4) {
            this._stateAfterStyle4(c);
        } else if (this._state === BEFORE_ENTITY) {

        /*
		* entities
		*/
            this._stateBeforeEntity(c);
        } else if (this._state === BEFORE_NUMERIC_ENTITY) {
            this._stateBeforeNumericEntity(c);
        } else if (this._state === IN_NAMED_ENTITY) {
            this._stateInNamedEntity(c);
        } else if (this._state === IN_NUMERIC_ENTITY) {
            this._stateInNumericEntity(c);
        } else if (this._state === IN_HEX_ENTITY) {
            this._stateInHexEntity(c);
        } else {
            this._cbs.onerror(Error("unknown _state"), this._state);
        }

        this._index++;
    }

    this._cleanup();
};

Tokenizer.prototype.pause = function() {
    this._running = false;
};
Tokenizer.prototype.resume = function() {
    this._running = true;

    if (this._index < this._buffer.length) {
        this._parse();
    }
    if (this._ended) {
        this._finish();
    }
};

Tokenizer.prototype.end = function(chunk) {
    if (this._ended) this._cbs.onerror(Error(".end() after done!"));
    if (chunk) this.write(chunk);

    this._ended = true;

    if (this._running) this._finish();
};

Tokenizer.prototype._finish = function() {
    //if there is remaining data, emit it in a reasonable way
    if (this._sectionStart < this._index) {
        this._handleTrailingData();
    }

    this._cbs.onend();
};

Tokenizer.prototype._handleTrailingData = function() {
    var data = this._buffer.substr(this._sectionStart);

    if (
        this._state === IN_CDATA ||
        this._state === AFTER_CDATA_1 ||
        this._state === AFTER_CDATA_2
    ) {
        this._cbs.oncdata(data);
    } else if (
        this._state === IN_COMMENT ||
        this._state === AFTER_COMMENT_1 ||
        this._state === AFTER_COMMENT_2
    ) {
        this._cbs.oncomment(data);
    } else if (this._state === IN_NAMED_ENTITY && !this._xmlMode) {
        this._parseLegacyEntity();
        if (this._sectionStart < this._index) {
            this._state = this._baseState;
            this._handleTrailingData();
        }
    } else if (this._state === IN_NUMERIC_ENTITY && !this._xmlMode) {
        this._decodeNumericEntity(2, 10);
        if (this._sectionStart < this._index) {
            this._state = this._baseState;
            this._handleTrailingData();
        }
    } else if (this._state === IN_HEX_ENTITY && !this._xmlMode) {
        this._decodeNumericEntity(3, 16);
        if (this._sectionStart < this._index) {
            this._state = this._baseState;
            this._handleTrailingData();
        }
    } else if (
        this._state !== IN_TAG_NAME &&
        this._state !== BEFORE_ATTRIBUTE_NAME &&
        this._state !== BEFORE_ATTRIBUTE_VALUE &&
        this._state !== AFTER_ATTRIBUTE_NAME &&
        this._state !== IN_ATTRIBUTE_NAME &&
        this._state !== IN_ATTRIBUTE_VALUE_SQ &&
        this._state !== IN_ATTRIBUTE_VALUE_DQ &&
        this._state !== IN_ATTRIBUTE_VALUE_NQ &&
        this._state !== IN_CLOSING_TAG_NAME
    ) {
        this._cbs.ontext(data);
    }
    //else, ignore remaining data
    //TODO add a way to remove current tag
};

Tokenizer.prototype.reset = function() {
    Tokenizer.call(
        this,
        { xmlMode: this._xmlMode, decodeEntities: this._decodeEntities },
        this._cbs
    );
};

Tokenizer.prototype.getAbsoluteIndex = function() {
    return this._bufferOffset + this._index;
};

Tokenizer.prototype._getSection = function() {
    return this._buffer.substring(this._sectionStart, this._index);
};

Tokenizer.prototype._emitToken = function(name) {
    this._cbs[name](this._getSection());
    this._sectionStart = -1;
};

Tokenizer.prototype._emitPartial = function(value) {
    if (this._baseState !== TEXT) {
        this._cbs.onattribdata(value); //TODO implement the new event
    } else {
        this._cbs.ontext(value);
    }
};


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/WritableStream.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/WritableStream.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = Stream;

var Parser = __webpack_require__(/*! ./Parser.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Parser.js");
var WritableStream = __webpack_require__(/*! readable-stream */ "?ec29").Writable;
var StringDecoder = __webpack_require__(/*! string_decoder */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer;

function Stream(cbs, options) {
    var parser = (this._parser = new Parser(cbs, options));
    var decoder = (this._decoder = new StringDecoder());

    WritableStream.call(this, { decodeStrings: false });

    this.once("finish", function() {
        parser.end(decoder.end());
    });
}

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Stream, WritableStream);

Stream.prototype._write = function(chunk, encoding, cb) {
    if (chunk instanceof Buffer) chunk = this._decoder.write(chunk);
    this._parser.write(chunk);
    cb();
};


/***/ }),

/***/ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-html-parser/node_modules/htmlparser2/lib/index.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Parser = __webpack_require__(/*! ./Parser.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Parser.js");
var DomHandler = __webpack_require__(/*! domhandler */ "./node_modules/react-html-parser/node_modules/domhandler/index.js");

function defineProp(name, value) {
    delete module.exports[name];
    module.exports[name] = value;
    return value;
}

module.exports = {
    Parser: Parser,
    Tokenizer: __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Tokenizer.js"),
    ElementType: __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/index.js"),
    DomHandler: DomHandler,
    get FeedHandler() {
        return defineProp("FeedHandler", __webpack_require__(/*! ./FeedHandler.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/FeedHandler.js"));
    },
    get Stream() {
        return defineProp("Stream", __webpack_require__(/*! ./Stream.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/Stream.js"));
    },
    get WritableStream() {
        return defineProp("WritableStream", __webpack_require__(/*! ./WritableStream.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/WritableStream.js"));
    },
    get ProxyHandler() {
        return defineProp("ProxyHandler", __webpack_require__(/*! ./ProxyHandler.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/ProxyHandler.js"));
    },
    get DomUtils() {
        return defineProp("DomUtils", __webpack_require__(/*! domutils */ "./node_modules/domutils/index.js"));
    },
    get CollectingHandler() {
        return defineProp(
            "CollectingHandler",
            __webpack_require__(/*! ./CollectingHandler.js */ "./node_modules/react-html-parser/node_modules/htmlparser2/lib/CollectingHandler.js")
        );
    },
    // For legacy support
    DefaultHandler: DomHandler,
    get RssHandler() {
        return defineProp("RssHandler", this.FeedHandler);
    },
    //helper methods
    parseDOM: function(data, options) {
        var handler = new DomHandler(options);
        new Parser(handler, options).end(data);
        return handler.dom;
    },
    parseFeed: function(feed, options) {
        var handler = new module.exports.FeedHandler(options);
        new Parser(handler, options).end(feed);
        return handler.dom;
    },
    createDomStream: function(cb, options, elementCb) {
        var handler = new DomHandler(cb, options, elementCb);
        return new Parser(handler, options);
    },
    // List of all events that the parser emits
    EVENTS: {
        /* Format: eventname: number of arguments */
        attribute: 2,
        cdatastart: 0,
        cdataend: 0,
        text: 1,
        processinginstruction: 2,
        comment: 1,
        commentend: 0,
        closetag: 1,
        opentag: 2,
        opentagname: 1,
        error: 1,
        end: 0
    }
};


/***/ }),

/***/ "./node_modules/react-infinite-scroll-component/dist/index.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-infinite-scroll-component/dist/index.es.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

var ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent',
};
var defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8,
};
function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: ThresholdUnits.Percent,
            value: scrollThreshold * 100,
        };
    }
    if (typeof scrollThreshold === 'string') {
        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
            return {
                unit: ThresholdUnits.Pixel,
                value: parseFloat(scrollThreshold),
            };
        }
        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
            return {
                unit: ThresholdUnits.Percent,
                value: parseFloat(scrollThreshold),
            };
        }
        console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
        return defaultThreshold;
    }
    console.warn('scrollThreshold should be string or number');
    return defaultThreshold;
}

var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.lastScrollTop = 0;
        _this.actionTriggered = false;
        // variables to keep track of pull down behaviour
        _this.startY = 0;
        _this.currentY = 0;
        _this.dragging = false;
        // will be populated in componentDidMount
        // based on the height of the pull down element
        _this.maxPullDownDistance = 0;
        _this.getScrollableTarget = function () {
            if (_this.props.scrollableTarget instanceof HTMLElement)
                return _this.props.scrollableTarget;
            if (typeof _this.props.scrollableTarget === 'string') {
                return document.getElementById(_this.props.scrollableTarget);
            }
            if (_this.props.scrollableTarget === null) {
                console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      ");
            }
            return null;
        };
        _this.onStart = function (evt) {
            if (_this.lastScrollTop)
                return;
            _this.dragging = true;
            if (evt instanceof MouseEvent) {
                _this.startY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.startY = evt.touches[0].pageY;
            }
            _this.currentY = _this.startY;
            if (_this._infScroll) {
                _this._infScroll.style.willChange = 'transform';
                _this._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
            }
        };
        _this.onMove = function (evt) {
            if (!_this.dragging)
                return;
            if (evt instanceof MouseEvent) {
                _this.currentY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.currentY = evt.touches[0].pageY;
            }
            // user is scrolling down to up
            if (_this.currentY < _this.startY)
                return;
            if (_this.currentY - _this.startY >=
                Number(_this.props.pullDownToRefreshThreshold)) {
                _this.setState({
                    pullToRefreshThresholdBreached: true,
                });
            }
            // so you can drag upto 1.5 times of the maxPullDownDistance
            if (_this.currentY - _this.startY > _this.maxPullDownDistance * 1.5)
                return;
            if (_this._infScroll) {
                _this._infScroll.style.overflow = 'visible';
                _this._infScroll.style.transform = "translate3d(0px, " + (_this.currentY -
                    _this.startY) + "px, 0px)";
            }
        };
        _this.onEnd = function () {
            _this.startY = 0;
            _this.currentY = 0;
            _this.dragging = false;
            if (_this.state.pullToRefreshThresholdBreached) {
                _this.props.refreshFunction && _this.props.refreshFunction();
                _this.setState({
                    pullToRefreshThresholdBreached: false,
                });
            }
            requestAnimationFrame(function () {
                // this._infScroll
                if (_this._infScroll) {
                    _this._infScroll.style.overflow = 'auto';
                    _this._infScroll.style.transform = 'none';
                    _this._infScroll.style.willChange = 'unset';
                }
            });
        };
        _this.onScrollListener = function (event) {
            if (typeof _this.props.onScroll === 'function') {
                // Execute this callback in next tick so that it does not affect the
                // functionality of the library.
                setTimeout(function () { return _this.props.onScroll && _this.props.onScroll(event); }, 0);
            }
            var target = _this.props.height || _this._scrollableNode
                ? event.target
                : document.documentElement.scrollTop
                    ? document.documentElement
                    : document.body;
            // return immediately if the action has already been triggered,
            // prevents multiple triggers.
            if (_this.actionTriggered)
                return;
            var atBottom = _this.props.inverse
                ? _this.isElementAtTop(target, _this.props.scrollThreshold)
                : _this.isElementAtBottom(target, _this.props.scrollThreshold);
            // call the `next` function in the props to trigger the next data fetch
            if (atBottom && _this.props.hasMore) {
                _this.actionTriggered = true;
                _this.setState({ showLoader: true });
                _this.props.next && _this.props.next();
            }
            _this.lastScrollTop = target.scrollTop;
        };
        _this.state = {
            showLoader: false,
            pullToRefreshThresholdBreached: false,
        };
        _this.throttledOnScrollListener = throttle(150, _this.onScrollListener).bind(_this);
        _this.onStart = _this.onStart.bind(_this);
        _this.onMove = _this.onMove.bind(_this);
        _this.onEnd = _this.onEnd.bind(_this);
        return _this;
    }
    InfiniteScroll.prototype.componentDidMount = function () {
        if (typeof this.props.dataLength === 'undefined') {
            throw new Error("mandatory prop \"dataLength\" is missing. The prop is needed" +
                " when loading more content. Check README.md for usage");
        }
        this._scrollableNode = this.getScrollableTarget();
        this.el = this.props.height
            ? this._infScroll
            : this._scrollableNode || window;
        if (this.el) {
            this.el.addEventListener('scroll', this
                .throttledOnScrollListener);
        }
        if (typeof this.props.initialScrollY === 'number' &&
            this.el &&
            this.el instanceof HTMLElement &&
            this.el.scrollHeight > this.props.initialScrollY) {
            this.el.scrollTo(0, this.props.initialScrollY);
        }
        if (this.props.pullDownToRefresh && this.el) {
            this.el.addEventListener('touchstart', this.onStart);
            this.el.addEventListener('touchmove', this.onMove);
            this.el.addEventListener('touchend', this.onEnd);
            this.el.addEventListener('mousedown', this.onStart);
            this.el.addEventListener('mousemove', this.onMove);
            this.el.addEventListener('mouseup', this.onEnd);
            // get BCR of pullDown element to position it above
            this.maxPullDownDistance =
                (this._pullDown &&
                    this._pullDown.firstChild &&
                    this._pullDown.firstChild.getBoundingClientRect()
                        .height) ||
                    0;
            this.forceUpdate();
            if (typeof this.props.refreshFunction !== 'function') {
                throw new Error("Mandatory prop \"refreshFunction\" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage'");
            }
        }
    };
    InfiniteScroll.prototype.componentWillUnmount = function () {
        if (this.el) {
            this.el.removeEventListener('scroll', this
                .throttledOnScrollListener);
            if (this.props.pullDownToRefresh) {
                this.el.removeEventListener('touchstart', this.onStart);
                this.el.removeEventListener('touchmove', this.onMove);
                this.el.removeEventListener('touchend', this.onEnd);
                this.el.removeEventListener('mousedown', this.onStart);
                this.el.removeEventListener('mousemove', this.onMove);
                this.el.removeEventListener('mouseup', this.onEnd);
            }
        }
    };
    InfiniteScroll.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        // do nothing when dataLength is unchanged
        if (this.props.dataLength === props.dataLength)
            return;
        this.actionTriggered = false;
        // update state when new data was sent in
        this.setState({
            showLoader: false,
        });
    };
    InfiniteScroll.prototype.isElementAtTop = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop <=
                threshold.value + clientHeight - target.scrollHeight + 1);
        }
        return (target.scrollTop <=
            threshold.value / 100 + clientHeight - target.scrollHeight + 1);
    };
    InfiniteScroll.prototype.isElementAtBottom = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop + clientHeight >= target.scrollHeight - threshold.value);
        }
        return (target.scrollTop + clientHeight >=
            (threshold.value / 100) * target.scrollHeight);
    };
    InfiniteScroll.prototype.render = function () {
        var _this = this;
        var style = __assign({ height: this.props.height || 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch' }, this.props.style);
        var hasChildren = this.props.hasChildren ||
            !!(this.props.children &&
                this.props.children instanceof Array &&
                this.props.children.length);
        // because heighted infiniteScroll visualy breaks
        // on drag down as overflow becomes visible
        var outerDivStyle = this.props.pullDownToRefresh && this.props.height
            ? { overflow: 'auto' }
            : {};
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: outerDivStyle, className: "infinite-scroll-component__outerdiv" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "infinite-scroll-component " + (this.props.className || ''), ref: function (infScroll) { return (_this._infScroll = infScroll); }, style: style },
                this.props.pullDownToRefresh && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { position: 'relative' }, ref: function (pullDown) { return (_this._pullDown = pullDown); } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: -1 * this.maxPullDownDistance,
                        } }, this.state.pullToRefreshThresholdBreached
                        ? this.props.releaseToRefreshContent
                        : this.props.pullDownToRefreshContent))),
                this.props.children,
                !this.state.showLoader &&
                    !hasChildren &&
                    this.props.hasMore &&
                    this.props.loader,
                this.state.showLoader && this.props.hasMore && this.props.loader,
                !this.props.hasMore && this.props.endMessage)));
    };
    return InfiniteScroll;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfiniteScroll);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/react-loading-skeleton/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-loading-skeleton/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function get() {
    return _skeleton.default;
  }
}));
Object.defineProperty(exports, "SkeletonTheme", ({
  enumerable: true,
  get: function get() {
    return _skeletonTheme.default;
  }
}));

var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./skeleton */ "./node_modules/react-loading-skeleton/lib/skeleton.js"));

var _skeletonTheme = _interopRequireDefault(__webpack_require__(/*! ./skeleton-theme */ "./node_modules/react-loading-skeleton/lib/skeleton-theme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/react-loading-skeleton/lib/skeleton-theme.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-loading-skeleton/lib/skeleton-theme.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _core = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");

var _skeleton = __webpack_require__(/*! ./skeleton */ "./node_modules/react-loading-skeleton/lib/skeleton.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SkeletonTheme =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonTheme, _Component);

  function SkeletonTheme() {
    _classCallCheck(this, SkeletonTheme);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonTheme).apply(this, arguments));
  }

  _createClass(SkeletonTheme, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          highlightColor = _this$props.highlightColor,
          children = _this$props.children;
      var themeStyles =
      /*#__PURE__*/
      (0, _core.css)(".react-loading-skeleton{background-color:", color, ";background-image:linear-gradient( 90deg,", color, ",", highlightColor, ",", color, " );};label:SkeletonTheme;" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9za2VsZXRvbi10aGVtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZMkIiLCJmaWxlIjoiLi4vc3JjL3NrZWxldG9uLXRoZW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIjtcbmltcG9ydCB7IGRlZmF1bHRCYXNlQ29sb3IsIGRlZmF1bHRIaWdobGlnaHRDb2xvciB9IGZyb20gXCIuL3NrZWxldG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNrZWxldG9uVGhlbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbG9yOiBkZWZhdWx0QmFzZUNvbG9yLFxuICAgIGhpZ2hsaWdodENvbG9yOiBkZWZhdWx0SGlnaGxpZ2h0Q29sb3JcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgaGlnaGxpZ2h0Q29sb3IsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHRoZW1lU3R5bGVzID0gY3NzYFxuICAgICAgLnJlYWN0LWxvYWRpbmctc2tlbGV0b24ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAgIDkwZGVnLFxuICAgICAgICAgICR7Y29sb3J9LFxuICAgICAgICAgICR7aGlnaGxpZ2h0Q29sb3J9LFxuICAgICAgICAgICR7Y29sb3J9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgYDtcbiAgICByZXR1cm4gPGRpdiBjc3M9e3RoZW1lU3R5bGVzfT57Y2hpbGRyZW59PC9kaXY+O1xuICB9XG59XG4iXX0= */"));
      return (0, _core.jsx)("div", {
        css: themeStyles
      }, children);
    }
  }]);

  return SkeletonTheme;
}(_react.Component);

exports.default = SkeletonTheme;

_defineProperty(SkeletonTheme, "defaultProps", {
  color: _skeleton.defaultBaseColor,
  highlightColor: _skeleton.defaultHighlightColor
});

/***/ }),

/***/ "./node_modules/react-loading-skeleton/lib/skeleton.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-loading-skeleton/lib/skeleton.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = Skeleton;
exports.skeletonStyles = exports.skeletonKeyframes = exports.defaultHighlightColor = exports.defaultBaseColor = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _core = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  0% {\n    background-position: -200px 0;\n  }\n  100% {\n    background-position: calc(200px + 100%) 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultBaseColor = "#eee";
exports.defaultBaseColor = defaultBaseColor;
var defaultHighlightColor = "#f5f5f5";
exports.defaultHighlightColor = defaultHighlightColor;
var skeletonKeyframes = (0, _core.keyframes)(_templateObject());
exports.skeletonKeyframes = skeletonKeyframes;
var skeletonStyles =
/*#__PURE__*/
(0, _core.css)("background-color:", defaultBaseColor, ";background-image:linear-gradient( 90deg,", defaultBaseColor, ",", defaultHighlightColor, ",", defaultBaseColor, " );background-size:200px 100%;background-repeat:no-repeat;border-radius:4px;display:inline-block;line-height:1;width:100%;;label:skeletonStyles;" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9za2VsZXRvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQmlDIiwiZmlsZSI6Ii4uL3NyYy9za2VsZXRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNzcywga2V5ZnJhbWVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRCYXNlQ29sb3IgPSBcIiNlZWVcIjtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRIaWdobGlnaHRDb2xvciA9IFwiI2Y1ZjVmNVwiO1xuXG5leHBvcnQgY29uc3Qgc2tlbGV0b25LZXlmcmFtZXMgPSBrZXlmcmFtZXNgXG4gIDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMjAwcHggMDtcbiAgfVxuICAxMDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjYWxjKDIwMHB4ICsgMTAwJSkgMDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IHNrZWxldG9uU3R5bGVzID0gY3NzYFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke2RlZmF1bHRCYXNlQ29sb3J9O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgOTBkZWcsXG4gICAgJHtkZWZhdWx0QmFzZUNvbG9yfSxcbiAgICAke2RlZmF1bHRIaWdobGlnaHRDb2xvcn0sXG4gICAgJHtkZWZhdWx0QmFzZUNvbG9yfVxuICApO1xuICBiYWNrZ3JvdW5kLXNpemU6IDIwMHB4IDEwMCU7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBsaW5lLWhlaWdodDogMTtcbiAgd2lkdGg6IDEwMCU7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTa2VsZXRvbih7XG4gIGNvdW50LFxuICBkdXJhdGlvbixcbiAgd2lkdGgsXG4gIHdyYXBwZXI6IFdyYXBwZXIsXG4gIGhlaWdodCxcbiAgY2lyY2xlLFxuICBzdHlsZTogY3VzdG9tU3R5bGUsXG4gIGNsYXNzTmFtZTogY3VzdG9tQ2xhc3NOYW1lLFxufSkge1xuICBjb25zdCBlbGVtZW50cyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGxldCBzdHlsZSA9IHt9O1xuXG4gICAgaWYgKHdpZHRoICE9PSBudWxsKSB7XG4gICAgICBzdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGlmIChoZWlnaHQgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAod2lkdGggIT09IG51bGwgJiYgaGVpZ2h0ICE9PSBudWxsICYmIGNpcmNsZSkge1xuICAgICAgc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1MCVcIjtcbiAgICB9XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gXCJyZWFjdC1sb2FkaW5nLXNrZWxldG9uXCI7XG4gICAgaWYgKGN1c3RvbUNsYXNzTmFtZSkge1xuICAgICAgY2xhc3NOYW1lICs9IFwiIFwiICsgY3VzdG9tQ2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGVsZW1lbnRzLnB1c2goXG4gICAgICA8c3BhblxuICAgICAgICBrZXk9e2l9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAke3NrZWxldG9uU3R5bGVzfVxuICAgICAgICAgIGFuaW1hdGlvbjogJHtza2VsZXRvbktleWZyYW1lc30gJHtkdXJhdGlvbn1zIGVhc2UtaW4tb3V0IGluZmluaXRlXG4gICAgICAgIGB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uY3VzdG9tU3R5bGUsXG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgICZ6d25qO1xuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzcGFuPlxuICAgICAge1dyYXBwZXJcbiAgICAgICAgPyBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IChcbiAgICAgICAgICAgIDxXcmFwcGVyIGtleT17aX0+XG4gICAgICAgICAgICAgIHtlbGVtZW50fVxuICAgICAgICAgICAgICAmenduajtcbiAgICAgICAgICAgIDwvV3JhcHBlcj5cbiAgICAgICAgICApKVxuICAgICAgICA6IGVsZW1lbnRzfVxuICAgIDwvc3Bhbj5cbiAgKTtcbn1cblxuU2tlbGV0b24uZGVmYXVsdFByb3BzID0ge1xuICBjb3VudDogMSxcbiAgZHVyYXRpb246IDEuMixcbiAgd2lkdGg6IG51bGwsXG4gIHdyYXBwZXI6IG51bGwsXG4gIGhlaWdodDogbnVsbCxcbiAgY2lyY2xlOiBmYWxzZSxcbn07XG4iXX0= */"));
exports.skeletonStyles = skeletonStyles;

function Skeleton(_ref) {
  var count = _ref.count,
      duration = _ref.duration,
      width = _ref.width,
      Wrapper = _ref.wrapper,
      height = _ref.height,
      circle = _ref.circle,
      customStyle = _ref.style,
      customClassName = _ref.className;
  var elements = [];

  for (var i = 0; i < count; i++) {
    var style = {};

    if (width !== null) {
      style.width = width;
    }

    if (height !== null) {
      style.height = height;
    }

    if (width !== null && height !== null && circle) {
      style.borderRadius = "50%";
    }

    var className = "react-loading-skeleton";

    if (customClassName) {
      className += " " + customClassName;
    }

    elements.push((0, _core.jsx)("span", {
      key: i,
      className: className,
      css:
      /*#__PURE__*/
      (0, _core.css)(skeletonStyles, " animation:", skeletonKeyframes, " ", duration, "s ease-in-out infinite;label:Skeleton;" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9za2VsZXRvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvRWdCIiwiZmlsZSI6Ii4uL3NyYy9za2VsZXRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNzcywga2V5ZnJhbWVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRCYXNlQ29sb3IgPSBcIiNlZWVcIjtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRIaWdobGlnaHRDb2xvciA9IFwiI2Y1ZjVmNVwiO1xuXG5leHBvcnQgY29uc3Qgc2tlbGV0b25LZXlmcmFtZXMgPSBrZXlmcmFtZXNgXG4gIDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMjAwcHggMDtcbiAgfVxuICAxMDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjYWxjKDIwMHB4ICsgMTAwJSkgMDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IHNrZWxldG9uU3R5bGVzID0gY3NzYFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke2RlZmF1bHRCYXNlQ29sb3J9O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgOTBkZWcsXG4gICAgJHtkZWZhdWx0QmFzZUNvbG9yfSxcbiAgICAke2RlZmF1bHRIaWdobGlnaHRDb2xvcn0sXG4gICAgJHtkZWZhdWx0QmFzZUNvbG9yfVxuICApO1xuICBiYWNrZ3JvdW5kLXNpemU6IDIwMHB4IDEwMCU7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBsaW5lLWhlaWdodDogMTtcbiAgd2lkdGg6IDEwMCU7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTa2VsZXRvbih7XG4gIGNvdW50LFxuICBkdXJhdGlvbixcbiAgd2lkdGgsXG4gIHdyYXBwZXI6IFdyYXBwZXIsXG4gIGhlaWdodCxcbiAgY2lyY2xlLFxuICBzdHlsZTogY3VzdG9tU3R5bGUsXG4gIGNsYXNzTmFtZTogY3VzdG9tQ2xhc3NOYW1lLFxufSkge1xuICBjb25zdCBlbGVtZW50cyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGxldCBzdHlsZSA9IHt9O1xuXG4gICAgaWYgKHdpZHRoICE9PSBudWxsKSB7XG4gICAgICBzdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGlmIChoZWlnaHQgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAod2lkdGggIT09IG51bGwgJiYgaGVpZ2h0ICE9PSBudWxsICYmIGNpcmNsZSkge1xuICAgICAgc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1MCVcIjtcbiAgICB9XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gXCJyZWFjdC1sb2FkaW5nLXNrZWxldG9uXCI7XG4gICAgaWYgKGN1c3RvbUNsYXNzTmFtZSkge1xuICAgICAgY2xhc3NOYW1lICs9IFwiIFwiICsgY3VzdG9tQ2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGVsZW1lbnRzLnB1c2goXG4gICAgICA8c3BhblxuICAgICAgICBrZXk9e2l9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAke3NrZWxldG9uU3R5bGVzfVxuICAgICAgICAgIGFuaW1hdGlvbjogJHtza2VsZXRvbktleWZyYW1lc30gJHtkdXJhdGlvbn1zIGVhc2UtaW4tb3V0IGluZmluaXRlXG4gICAgICAgIGB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uY3VzdG9tU3R5bGUsXG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgICZ6d25qO1xuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzcGFuPlxuICAgICAge1dyYXBwZXJcbiAgICAgICAgPyBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IChcbiAgICAgICAgICAgIDxXcmFwcGVyIGtleT17aX0+XG4gICAgICAgICAgICAgIHtlbGVtZW50fVxuICAgICAgICAgICAgICAmenduajtcbiAgICAgICAgICAgIDwvV3JhcHBlcj5cbiAgICAgICAgICApKVxuICAgICAgICA6IGVsZW1lbnRzfVxuICAgIDwvc3Bhbj5cbiAgKTtcbn1cblxuU2tlbGV0b24uZGVmYXVsdFByb3BzID0ge1xuICBjb3VudDogMSxcbiAgZHVyYXRpb246IDEuMixcbiAgd2lkdGg6IG51bGwsXG4gIHdyYXBwZXI6IG51bGwsXG4gIGhlaWdodDogbnVsbCxcbiAgY2lyY2xlOiBmYWxzZSxcbn07XG4iXX0= */")),
      style: _objectSpread({}, customStyle, {}, style)
    }, "\u200C"));
  }

  return (0, _core.jsx)("span", null, Wrapper ? elements.map(function (element, i) {
    return (0, _core.jsx)(Wrapper, {
      key: i
    }, element, "\u200C");
  }) : elements);
}

Skeleton.defaultProps = {
  count: 1,
  duration: 1.2,
  width: null,
  wrapper: null,
  height: null,
  circle: false
};

/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "?ec29":
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);