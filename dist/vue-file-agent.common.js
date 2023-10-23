/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 679:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  FileData: function() { return /* reexport */ FileData; },
  FileRecord: function() { return /* reexport */ file_record; },
  VueFileAgentMixin: function() { return /* reexport */ vue_file_agent_mixin; },
  VueFileAgentPlugin: function() { return /* reexport */ VueFileAgentPlugin; },
  VueFilePreviewMixin: function() { return /* reexport */ vue_file_preview_mixin; },
  "default": function() { return /* binding */ entry_lib; },
  mixin: function() { return /* reexport */ mixin; },
  plugins: function() { return /* reexport */ plugins; },
  utils: function() { return /* reexport */ utils; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__(679)
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-icon.vue?vue&type=template&id=2aa77553
var render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('svg',{attrs:{"viewBox":_vm.viewBoxComputed}},[_vm._l((_vm.icon.paths),function(d,index){return [(d)?_c('path',{key:index,attrs:{"d":d}}):_vm._e()]})],2)
}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ var tslib_es6 = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});

;// CONCATENATED MODULE: ./src/lib/extensions.ts
/* harmony default export */ var extensions = ({
    'audio': [
        'aif',
        'cda',
        'mid',
        'midi',
        // 'mp3',
        'mpa',
        // 'ogg',
        // 'wav',
        'wma',
        'wpl',
    ],
    'audio-playable': ['mp3', 'ogg', 'wav'],
    'archive': ['7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'tar.gz', 'z', 'zip'],
    'disc': [
        // 'bin',
        'dmg',
        'iso',
        'toast',
        'vcd',
    ],
    'database': [
        'csv',
        'dat',
        'db',
        'dbf',
        'log',
        'mdb',
        'sav',
        'sql',
        'tar',
        // 'xml'
    ],
    'executable': ['apk', 'bat', 'bin', 'cgi', 'pl', 'com', 'exe', 'gadget', 'jar', 'py', 'wsf', 'ipa'],
    'font': ['fnt', 'fon', 'otf', 'ttf'],
    'image': ['ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'ps', 'psd', 'svg', 'tif', 'tiff'],
    'markup': [
        'asp',
        'aspx',
        'cer',
        'cfm',
        'cgi',
        'pl',
        'css',
        'scss',
        'htm',
        'html',
        'jsp',
        // 'vue',
        'part',
        'php',
        'py',
        'rss',
        'xml',
        'xhtml',
    ],
    'presentation': ['key', 'odp', 'pps', 'ppt', 'pptx'],
    'script': ['c', 'class', 'cpp', 'cs', 'h', 'java', 'js', 'json', 'sh', 'swift', 'vb'],
    'sheet': ['ods', 'xlr', 'xls', 'xlsx'],
    'system': [
        'bak',
        'cab',
        'cfg',
        'cpl',
        'cur',
        'dll',
        'dmp',
        'drv',
        'icns',
        // 'ico',
        'ini',
        'lnk',
        'msi',
        'sys',
        'tmp',
    ],
    'video': [
        '3g2',
        '3gp',
        'avi',
        'flv',
        'h264',
        // 'm4v',
        'mkv',
        // 'mov',
        // 'mp4',
        'mpg',
        'mpeg',
        'rm',
        'swf',
        'vob',
        // 'webm',
        'wmv',
    ],
    'video-playable': ['mp4', 'webm', 'mov'],
    'vue': ['vue'],
    'doc': [
        'doc',
        'docx',
        'odt',
        'rtf',
        'tex',
        // 'txt',
        'wks',
        'wps',
        'wpd',
    ],
    'text': ['txt'],
    'ebook': ['epub'],
    'pdf': ['pdf'],
    'folder': ['folder'],
    'play': ['play'],
});

;// CONCATENATED MODULE: ./src/lib/icons.ts
var e_1, _a;


var SvgIcon = /** @class */ (function () {
    function SvgIcon(paths, color, viewBox) {
        this.paths = paths;
        this.color = color;
        this.viewBox = viewBox;
        this.category = '';
    }
    return SvgIcon;
}());

var playIconPaths = ['M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z'];
var icons = {
    'folder': new SvgIcon([
        'M96.5 93.7h-93c-2 0-3.5-1.5-3.5-3.5V35.4h100v54.8c0 2-1.5 3.5-3.5 3.5z',
        'M44.9 20V9.7c0-2-1.5-3.5-3.5-3.5h-38C1.5 6.3 0 7.8 0 9.7v25.7h100V23.5c0-2-1.5-3.5-3.5-3.5H44.9z',
    ], '#efce4a'),
    'audio': new SvgIcon([
        'M32.5 37.5h-9v25h9L53.6 77V23L32.5 37.5M71.9 50c0 6.8-3.7 12.7-9.1 15.8l2.8 4.9c7.1-4.1 11.9-11.8 11.9-20.7 0-8.8-4.8-16.6-11.9-20.7l-2.8 4.9c5.4 3.1 9.1 9 9.1 15.8z',
        // tslint:disable-next-line
        'M62.1 50c0 3.2-1.7 5.9-4.3 7.4l2.7 4.7c4.2-2.4 7-6.9 7-12.1 0-5.2-2.8-9.7-7-12.1l-2.7 4.7c2.6 1.5 4.3 4.2 4.3 7.4z',
    ], '#039'),
    'video': new SvgIcon([
        'M21 26.4v47.1h58V26.4H21zm10.9 43.5h-7.2v-7.2h7.2v7.2zm0-10.8h-7.2v-7.2h7.2v7.2zm0-10.9h-7.2V41h7.2v7.2zm0-10.9h-7.2v-7.2h7.2v7.2zm10.9 25.4V37.3L60.9 50 42.8 62.7zm32.6 7.2h-7.2v-7.2h7.2v7.2zm0-10.8h-7.2v-7.2h7.2v7.2zm0-10.9h-7.2V41h7.2v7.2zm0-10.9h-7.2v-7.2h7.2v7.2z',
    ], '#ef6f2e'),
    'audio-playable': new SvgIcon(playIconPaths, '#039', '0 0 48 48'),
    'video-playable': new SvgIcon(playIconPaths, '#ef6f2e', '0 0 48 48'),
    'archive': new SvgIcon([
        'M72.4 38.5h-7.9v-7.9l7.9 7.9zm-21.3-7.9v28.8h21.4v-19h-9.9v-9.9H51.1zm3.3-7.6H30.8v5.6h9.3l-5.9 4.5v4.8l8.6-6.6v-2.7h30.1v-2.3L54.4 23zM42.9 35.1l-8.6 6.6v4.8l8.6-6.6v-4.8zm-8.7 20l8.6-6.6v-4.8l-8.6 6.6v4.8zm8.7 2v-4.8l-8.6 6.6v2.6h-3.4v5.6h5.3v3.8H33c-.6-1-1.6-1.6-2.8-1.6-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1.2 0 2.2-.6 2.8-1.6h3.1V77h4.8v-2.9H44c.6 1 1.6 1.6 2.8 1.6 1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2c-1.2 0-2.2.6-2.8 1.6h-3.1v-3.8h13.5l18.5-3.3v-2.3H37.1l5.8-4.4z',
    ], '#ba8322'),
    'system': new SvgIcon([
        'M73.6 54.8c-2.1-.7-3.4-2.6-3.4-4.8s1.4-4.1 3.4-4.8c.6-.2 1-.9.8-1.5-.6-2.3-1.5-4.4-2.7-6.5-.3-.6-1.1-.8-1.7-.5-.7.4-1.6.6-2.4.6-2.8 0-5-2.3-5-5 0-.8.2-1.7.6-2.4.3-.6.1-1.3-.5-1.7-2-1.2-4.2-2.1-6.5-2.7-.6-.2-1.3.2-1.5.8-.7 2.1-2.6 3.4-4.8 3.4-2.2 0-4.1-1.4-4.8-3.4-.2-.6-.9-1-1.5-.8-2.3.6-4.4 1.5-6.5 2.7-.6.3-.8 1.1-.5 1.7.4.7.6 1.6.6 2.4 0 2.8-2.3 5-5 5-.8 0-1.7-.2-2.4-.6-.6-.3-1.3-.1-1.7.5-1.2 2-2.1 4.2-2.7 6.5-.2.6.2 1.3.8 1.5 2.1.7 3.4 2.6 3.4 4.8s-1.4 4.1-3.4 4.8c-.6.2-1 .9-.8 1.5.6 2.3 1.5 4.4 2.7 6.5.3.6 1.1.8 1.7.5.7-.4 1.6-.6 2.4-.6 2.8 0 5 2.3 5 5 0 .8-.2 1.7-.6 2.4-.3.6-.1 1.3.5 1.7 2 1.2 4.2 2.1 6.5 2.7h.3c.5 0 1-.3 1.2-.9.7-2.1 2.6-3.4 4.8-3.4 2.2 0 4.1 1.4 4.8 3.4.2.6.9 1 1.5.8 2.3-.6 4.4-1.5 6.5-2.7.6-.3.8-1.1.5-1.7-.4-.7-.6-1.6-.6-2.4 0-2.8 2.3-5 5-5 .8 0 1.7.2 2.4.6.6.3 1.3.1 1.7-.5 1.2-2 2.1-4.2 2.7-6.5.2-.5-.1-1.2-.8-1.4zM50 57.6c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6 4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6z',
    ], '#999'),
    'image': new SvgIcon([
        'm 40.400002,35 a 8,8 0 0 1 -8,8 8,8 0 0 1 -8,-8 8,8 0 0 1 8,-8 8,8 0 0 1 8,8 z',
        'M78.9 47.3l-9.7-9.6L50 57l-9.6-9.7-19.3 19.3V73h57.8z',
    ], '#5b2d8d'),
    'doc': new SvgIcon([
        'M29.6 53l-5.9-18.2c-.2-.7-.4-1-.5-1-.1-.1-.2-.1-.4-.2l-2.1-.6-.1-2.6h11l.2 2.6-2.1.6v.2c0 .2.1.7.4 1.2l2.2 7 3.9-11.7 3-.1 3.6 11.7 2.5-7c.1-.5.4-1 .4-1.2v-.1l-1.8-.5-.1-2.7h8.6l.2 2.6-2.3.7c-.1 0-.2.1-.4.1 0 .1-.2.2-.4.9L43 52.8l-3.1.2-3.3-11.2-3.9 11-3.1.2z',
        'M57.8 30.2h21.7v3.4H57.8zm0 9.2h21.7v3.4H57.8zm0 9.4h21.7v3.4H57.8zm-36.2 9.6h57.9v3.4H21.6zm0 9.4h57.9v3.4H21.6z',
    ], '#2372ba'),
    'executable': new SvgIcon(['M33.1 29.8l-6.6 6.6L37.2 47 26.5 57.6l6.6 6.6L50.2 47zm18.8 31.1h22.6v9.2H51.9z'], '#333'),
    'ebook': new SvgIcon([
        'M75.8 45.7c-.3-.6-.7-1.2-1.3-1.6-.1.5-.3 1-.6 1.5L58.3 69.8c-.6.9-1.9 1.1-2.9.8l-25-7c-1.5-.4-3.3-1.3-3.4-3 0-.6 0-.9.4-1.1.3-.3.8-.2 1.1-.1L52 66c3.4 1 4.4.2 6.9-3.5l14.4-22.2c.7-1.2.9-2.5.5-3.6s-1.4-2-2.7-2.4l-20.6-5.7c-.5-.1-1-.1-1.5-.1v-.1c-3.2-1.9-4.4 1.7-6 3-.6.5-1.4.8-1.7 1.3-.2.5-.1 1-.3 1.4-.6 1.4-2.4 3.6-3.3 4.3-.6.4-1.2.5-1.6 1.1-.3.4-.2 1.1-.4 1.6-.5 1.2-2.1 3.3-3.2 4.4-.4.4-1 .6-1.3 1.1-.3.4-.2 1.1-.4 1.6-.7 1.3-2.2 3.2-3.4 4.3-.6.6-1.3.9-1.6 1.5-.1.3 0 .7-.2 1.1-.2.6-.5 1.1-.7 1.7-.7.9-1 2.1-.9 3.4.2 3.1 2.5 6 5.3 6.8l25 7c2.3.6 5.2-.5 6.6-2.5l14.4-22.2c.7-1.1.9-2.4.5-3.6zm-28.9-7.9l1.1-1.6c.3-.4.9-.7 1.4-.5l16.5 4.6c.5.1.7.6.4 1l-1.1 1.6c-.3.4-.9.7-1.4.5l-16.5-4.6c-.5-.2-.7-.6-.4-1zM42.7 44l1.1-1.6c.3-.4.9-.7 1.4-.5l16.5 4.6c.5.1.7.6.4 1L60.9 49c-.3.4-.9.7-1.4.5L43.1 45c-.5-.1-.7-.6-.4-1z',
    ], '#963'),
    'markup': new SvgIcon([
        'M21.5 48.3l16.2-14v7.1l-11 9.2v.1l11 9.2V67L21.5 53v-4.7zm30.6-17.6h4.3L48 71.3h-4.2l8.3-40.6zM62.3 60l11-9.2v-.1l-11-9.2v-7.1l16.2 14v4.9l-16.2 14V60z',
    ] /* no color? */),
    'script': new SvgIcon([
        'M42.3 44.2h15.4V48H42.3v-3.8zm0 7.7h15.4v3.8H42.3v-3.8zm0 7.7h15.4v3.8H42.3v-3.8zM69.2 25H38.5c-4.2 0-7.7 3.4-7.7 7.7v34.6h-7.7c0 4.2 3.4 7.7 7.7 7.7h30.8c4.2 0 7.7-3.4 7.7-7.7V36.5H77v-3.8c-.1-4.3-3.5-7.7-7.8-7.7zm-3.8 41.6c0 2.5-2 4.5-4.5 4.5H32.7c1.9-1.3 1.9-3.8 1.9-3.8V32.7c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8v3.8h23.1v30.1zM46.2 32.7v-3.8h23.1c3.5 0 3.8 2.2 3.8 3.8H46.2z',
    ] /* no color? */),
    'disc': new SvgIcon([
        'M46.9 50c0 .8.3 1.6.9 2.2 1.2 1.2 3.2 1.2 4.4 0 .6-.6.9-1.4.9-2.2 0-.8-.3-1.6-.9-2.2-.6-.6-1.4-.9-2.2-.9-.8 0-1.6.3-2.2.9-.6.6-.9 1.4-.9 2.2z',
        'M32.3 32.3c-9.8 9.8-9.8 25.6 0 35.4 9.8 9.8 25.6 9.8 35.4 0 9.8-9.8 9.8-25.6 0-35.4-9.8-9.7-25.6-9.7-35.4 0zm37 28.2c-.9 1.7-2.1 3.2-3.5 4.6-1.4 1.4-3 2.6-4.6 3.5l-5.8-11.1s.5-.2 1.6-1.2c1.1-1.1 1.3-1.6 1.3-1.6l11 5.8zM54.4 45.6c1.2 1.2 1.8 2.8 1.8 4.4 0 1.6-.6 3.2-1.8 4.4-2.4 2.4-6.4 2.4-8.8 0-1.2-1.2-1.8-2.8-1.8-4.4 0-1.6.6-3.2 1.8-4.4a6.1 6.1 0 0 1 8.8 0zm-8.5-4.4s-1.2.7-2.2 1.8c-.9 1-1 1.2-1.3 1.7l-11-5.9c.9-1.7 2.1-3.2 3.5-4.6 1.4-1.4 3-2.6 4.6-3.5l6.4 10.5z',
    ], '#c96'),
    'text': new SvgIcon(['M69.4 28.6v5.5H21.5v-5.5M30.6 41h47.9v5.6H30.6zm-9.1 12.4h47.9V59H21.5zm9.1 12.5h47.9v5.6H30.6z'], '#6b533b'),
    'database': new SvgIcon([
        'M48.1 75.5c-6.5-.3-12.3-2.3-15.4-5.4-.9-.9-1.8-2.1-2.2-2.9l-.3-.5v-6.1c0-6 0-6.1.1-5.6.3 1.3 1.1 2.7 2.3 3.7.8.7 2.5 1.8 3.8 2.5 2.4 1.2 5.2 2 8.4 2.5 1.9.3 2.6.3 5.3.3s3.4 0 5.3-.3c3.1-.5 6-1.3 8.3-2.5 1.4-.7 3-1.7 3.8-2.5 1.1-1 2-2.5 2.3-3.8.1-.5.1-.4.1 5.5v6l-.3.6c-1 1.9-2.6 3.6-4.7 4.8-4.3 2.7-10.5 4-16.8 3.7z',
        'M48.1 60.4c-5.7-.3-11-1.9-14.3-4.4-.7-.6-1.8-1.6-2.3-2.2-.4-.6-.8-1.2-1.1-1.8l-.3-.5v-6c0-5.9 0-6 .1-5.5.2.9.7 2 1.5 2.9.4.5 1.1 1.2 1.5 1.4.1.1.5.3.7.5 2.7 1.9 6.5 3.3 10.8 3.9 1.9.3 2.6.3 5.3.3s3.4 0 5.3-.3c3.1-.5 6-1.3 8.4-2.5 1.4-.7 3-1.8 3.9-2.5 1.1-1 2-2.4 2.2-3.7.1-.5.1-.4.1 5.5v5.9l-.4.8c-.7 1.2-1.1 1.8-1.9 2.7-.8.8-1.6 1.5-2.7 2.1-4.3 2.4-10.5 3.7-16.8 3.4z',
        'M47.7 45.4c-3.8-.3-6.8-.9-9.6-2-3.4-1.3-5.8-3.1-7.1-5.2-.3-.4-.5-1-.7-1.6-.2-.6-.3-2-.1-2.7.9-4.3 6.6-7.9 14.5-9 1.9-.3 2.6-.3 5.3-.3s3.4 0 5.3.3c3.1.5 6 1.3 8.4 2.5 3.5 1.7 5.6 4 6.1 6.5.1.7.1 2.1-.1 2.7-.4 1.3-1 2.2-2 3.2-2.8 2.9-7.9 4.9-14.1 5.6-.9-.1-5.1 0-5.9 0z',
    ], '#a03537'),
    'pdf': new SvgIcon([
        'M46.2 21.8c-3.5 0-6.3 2.9-6.3 6.3 0 4.3 2.4 9.6 4.9 14.7-2 6.1-4.1 12.7-7 18.2-5.8 2.3-11 4-14 6.6l-.2.2c-1.1 1.2-1.8 2.7-1.8 4.4 0 3.5 2.9 6.3 6.3 6.3 1.7 0 3.4-.6 4.4-1.8 0 0 .2 0 .2-.2 2.3-2.7 5-7.8 7.5-12.2 5.5-2.1 11.5-4.4 16.9-5.8 4.1 3.4 10.1 5.5 15 5.5 3.5 0 6.3-2.9 6.3-6.3 0-3.5-2.9-6.3-6.3-6.3-4 0-9.6 1.4-13.9 2.9-3.5-3.4-6.7-7.5-9.2-11.9C50.6 37 52.6 32 52.6 28c-.2-3.5-2.9-6.2-6.4-6.2zm0 3.6c1.4 0 2.4 1.1 2.4 2.4 0 1.8-1.1 5.3-2.1 9-1.5-3.7-2.9-7.2-2.9-9 .1-1.2 1.2-2.4 2.6-2.4zm1.1 21.5c1.8 3.1 4.1 5.8 6.6 8.2-3.7 1.1-7.3 2.3-11 3.7 1.8-3.8 3.1-7.9 4.4-11.9zM72 55c1.4 0 2.4 1.1 2.4 2.4 0 1.4-1.1 2.4-2.4 2.4-2.9 0-6.9-1.2-10.1-3.1C65.6 56 69.7 55 72 55zM34.6 66.2c-1.8 3.2-3.5 6.1-4.7 7.6-.5.5-.9.6-1.7.6-1.4 0-2.4-1.1-2.4-2.4 0-.6.3-1.4.6-1.7 1.3-1.2 4.5-2.6 8.2-4.1z',
    ], '#c11e07'),
    'sheet': new SvgIcon([
        'M62.1 30.9h14.1v9.4H62.1zm0 14.5h14.1v9.4H62.1zm0 14.3h14.1v9.4H62.1zm-19.2 0H57v9.4H42.9zm-19 0H38v9.4H23.9zm19.2-14.2h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9zm19.2-14.6h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9z',
    ], '#30723f'),
    'presentation': new SvgIcon([
        'M 73.319289,26.32707 H 26.61477 c -2.335226,0 -4.258353,1.917194 -4.258353,4.245215 v 29.853446 c 0,2.328021 1.923127,4.245215 4.258353,4.245215 h 19.506006 l -1.923128,7.257947 h -2.197859 c -0.961564,0 -1.648395,0.684712 -1.648395,1.643309 0,0.958597 0.686831,1.643309 1.648395,1.643309 h 15.797117 c 0.961563,0 1.648394,-0.684712 1.648394,-1.643309 0,-0.958597 -0.686831,-1.643309 -1.648394,-1.643309 H 55.46168 l -1.923128,-7.39489 h 19.780737 c 2.335226,0 4.258353,-1.917193 4.258353,-4.245214 V 30.572285 c 0,-2.328021 -1.923127,-4.245215 -4.258353,-4.245215 z m 0.412099,34.372546 H 26.202672 V 30.2984 h 47.39135 z',
        'm 38.428266,48.511741 h 3.846255 v 7.668775 h -3.846255 z m 6.456214,-2.464963 h 3.846254 V 56.180516 H 44.88448 Z m 6.318846,-2.601906 h 3.846255 v 12.735644 h -3.846255 z m 6.318847,-2.464964 h 3.846255 v 15.200608 h -3.846255 z m -0.274732,-5.614639 -6.730946,3.697445 -4.945184,-1.643308 -8.379341,4.519099 1.236296,1.369424 7.417777,-3.834387 4.945185,1.643309 7.692509,-4.245215 1.236296,1.369424 2.88469,-4.792984 -6.593578,0.410827 z',
    ], '#c24f32'),
    'font': new SvgIcon([
        'M40.4 56.2H28.7l-1.4 3.1c-.5 1-.7 1.9-.7 2.6 0 .9.4 1.6 1.1 2 .4.3 1.5.4 3.2.6v.9H20v-.9c1.2-.2 2.2-.6 2.9-1.4.8-.8 1.7-2.4 2.8-4.8l11.8-25.6h.5l12 26.2c1.1 2.5 2.1 4.1 2.8 4.7.6.5 1.3.8 2.3.9v.9h-16v-.9h.7c1.3 0 2.2-.2 2.7-.5.4-.3.5-.6.5-1.1 0-.3 0-.6-.1-.9 0-.1-.3-.7-.7-1.8l-1.8-4zm-.8-1.8l-4.9-11-5.1 11h10z',
        'M80 44.2l-4.7 15.7-.5 1.9c0 .2-.1.4-.1.5 0 .2.1.4.2.5.1.2.3.2.4.2.3 0 .8-.3 1.4-.8.2-.2.8-.9 1.8-2.2l.9.4c-1.2 2-2.4 3.5-3.7 4.5-1.3.9-2.7 1.4-4.2 1.4-.9 0-1.6-.2-2.1-.7-.5-.5-.7-1-.7-1.8 0-.6.3-1.8.8-3.4l.6-1.9c-1.9 3.1-3.7 5.4-5.4 6.7-1 .8-2.1 1.1-3.2 1.1-1.5 0-2.6-.6-3.2-1.8-.7-1.2-1-2.5-1-4 0-2.2.7-4.8 2.1-7.6 1.4-2.9 3.2-5.2 5.5-6.9 1.9-1.4 3.6-2.2 5.3-2.2.9 0 1.6.3 2.2.8.6.5 1 1.4 1.2 2.8l.9-2.9 5.5-.3zm-7.8 4.5c0-1.3-.2-2.2-.6-2.8-.3-.4-.7-.6-1.2-.6s-1 .2-1.6.7c-1.1 1-2.3 3-3.5 5.9-1.3 3-1.9 5.6-1.9 7.7 0 .8.1 1.4.4 1.8.3.4.6.6.9.6.7 0 1.5-.4 2.2-1.2 1.1-1.2 2-2.6 2.9-4.3 1.6-2.9 2.4-5.5 2.4-7.8z',
    ], '#7291a1'),
    'vue': new SvgIcon([
        'M 66.425365,28.281905 H 56.751974 L 49.707631,39.427061 43.669624,28.281905 H 21.530262 L 49.707631,76.54823 77.885006,28.281905 Z m -37.888497,4.025337 h 6.767604 L 49.707631,57.239179 64.098226,32.307242 h 6.767597 L 49.707631,68.560446 Z',
    ], '#41B883'),
    'other': new SvgIcon([
        'M71 36.3L57.8 23.1c-.4-.4-.9-.6-1.4-.6h-26c-1.1 0-2 .9-2 2v51.1c0 1.1.9 2 2 2h39.3c1.1 0 2-.9 2-2V37.7c-.1-.5-.3-1-.7-1.4zm-3.9 2.3H55.5V27l11.6 11.6zm.1 34.5H32.8V26.9h18.5v13.3c0 1.4 1.2 2.6 2.6 2.6h13.3v30.3z',
    ] /* no color? */),
    // system icons
    'system-close': new SvgIcon(['M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'], undefined, '0 0 24 24'),
    'system-file-preview-new': new SvgIcon([
        'M745,353c-5.6,0-11.3,0.2-17.2,0.7C687.4,237.3,577.8,157,451,157c-162.1,0-294,131.9-294,294c0,2.1,0,4.1,0,6.2C72.6,479,10,555.8,10,647c0,108.1,87.9,196,196,196h245V618.3l-63.4,63.4c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4c-19.2-19.2-19.2-50.1,0-69.3l147-147c4.6-4.6,9.9-8.1,16-10.6c12-4.9,25.5-4.9,37.4,0c6,2.5,11.4,6.1,16,10.6l147,147c19.2,19.2,19.2,50.1,0,69.3c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4L549,618.3V843h196c135.1,0,245-109.9,245-245S880.1,353,745,353z',
    ], undefined, '0 0 1000 1000'),
    // system icons
    'system-sortable-handle': new SvgIcon(['M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'], undefined, '0 0 24 24'),
    'system-file-av-play': new SvgIcon(['M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z'], undefined, '0 0 48 48'),
    // M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z
    'system-file-name-edit': new SvgIcon([
        'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    ], undefined, '0 0 24 24'),
};
for (var category in icons) {
    if (icons.hasOwnProperty(category)) {
        icons[category].category = category;
    }
}
/* harmony default export */ var lib_icons = ((/* unused pure expression or super */ null && (icons)));
var extensionsMap = {};
for (var cat in extensions) {
    if (extensions.hasOwnProperty(cat)) {
        try {
            for (var _b = (e_1 = void 0, __values(extensions[cat])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ext = _c.value;
                extensionsMap[ext] = cat;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
}
function getIconByName(name) {
    var svgIcon = icons[name] || icons.other;
    return svgIcon;
}
function getIconFromExt(ext) {
    ext = ext.toLowerCase();
    var cat = extensionsMap[ext];
    return getIconByName(cat);
}

;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-icon.vue?vue&type=script&lang=ts


/* harmony default export */ var vue_file_iconvue_type_script_lang_ts = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    props: ['ext', 'name', 'viewBox'],
    computed: {
        viewBoxComputed: function () {
            if (!this.viewBox && this.icon && this.icon.viewBox) {
                return this.icon.viewBox;
            }
            return this.viewBox ? this.viewBox : '0 0 100 100';
        },
        icon: function () {
            if (this.name) {
                return getIconByName(this.name);
            }
            var svgIcon = getIconFromExt(this.ext);
            return svgIcon;
        },
    },
}));

;// CONCATENATED MODULE: ./src/components/vue-file-icon.vue?vue&type=script&lang=ts
 /* harmony default export */ var components_vue_file_iconvue_type_script_lang_ts = (vue_file_iconvue_type_script_lang_ts); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/vue-file-icon.vue





/* normalize component */
;
var component = normalizeComponent(
  components_vue_file_iconvue_type_script_lang_ts,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_icon = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-preview.vue?vue&type=template&id=7be956b0
var vue_file_previewvue_type_template_id_7be956b0_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{class:[
    'file-preview-wrapper-' + _vm.fileRecord.ext(),
    _vm.fileRecord.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other',
    'file-category-' + _vm.fileRecord.icon().category,
    { 'file-is-playing-av': _vm.fileRecord.isPlayingAv },
    { 'is-deletable': _vm.deletable === true },
    { 'is-editable': _vm.editable === true },
    { 'is-edit-input-focused': _vm.isEditInputFocused },
    { 'has-error': _vm.fileRecord.error },
  ]},[(_vm.fileRecord.isPlayableAudio() || _vm.fileRecord.isPlayableVideo())?_c('div',{ref:"wrapper",staticClass:"file-av-wrapper"},[_c('div',{staticClass:"file-av-action",on:{"click":function($event){return _vm.playAv(_vm.fileRecord)}}},[_c('span',{staticClass:"file-av-stop"},[_c('VueFileIcon',{attrs:{"name":"system-close"}})],1),_c('span',{staticClass:"file-av-play"},[_c('VueFileIcon',{attrs:{"name":"system-file-av-play"}})],1)])]):_vm._e(),_c('span',{staticClass:"file-preview",class:{
      'image-preview': _vm.fileRecord.isImage(),
      'other-preview': !_vm.fileRecord.isImage(),
      'dark-content': _vm.fileRecord.isImage() && _vm.fileRecord.isDarkColor(),
    },style:({
      'background-color': _vm.fileRecord.color(),
    })},[(_vm.fileRecord.error)?_c('span',{staticClass:"file-error-wrapper",on:{"click":function($event){return _vm.dismissError()}}},[_c('span',{staticClass:"file-error-message file-error-message-client"},[_vm._v(" "+_vm._s(_vm.fileRecord.getErrorMessage(_vm.errorText))+" ")])]):_vm._e(),_c('span',{staticClass:"file-preview-overlay"}),(_vm.fileRecord.isImage() || _vm.fileRecord.isPlayableVideo())?_c('span',{staticClass:"thumbnail",staticStyle:{"position":"absolute","top":"0","right":"0","bottom":"0","left":"0","overflow":"hidden"}},[(_vm.hasLinkableUrl)?_c('a',{attrs:{"href":_vm.fileRecord.url(),"target":"_blank","title":_vm.fileRecord.name()}},[_c('img',{staticClass:"file-preview-img",attrs:{"src":_vm.fileRecord.src()}})]):_c('img',{staticClass:"file-preview-img",attrs:{"src":_vm.fileRecord.src()}})]):_vm._e(),_c('span',{staticClass:"file-ext"},[_vm._v(_vm._s(_vm.fileRecord.ext()))]),_c('span',{staticClass:"file-size"},[_vm._v(_vm._s(_vm.fileRecord.size()))]),(_vm.deletable)?_c('span',{staticClass:"file-delete",on:{"click":function($event){return _vm.removeFileRecord(_vm.fileRecord)},"touchstart":function($event){return _vm.filenameClearPressed()},"mousedown":function($event){return _vm.filenameClearPressed()}}},[_c('VueFileIcon',{attrs:{"name":"system-close"}})],1):_vm._e(),_c('span',{staticClass:"file-name",on:{"click":function($event){return _vm.editFileName()}}},[(_vm.editable === true)?_c('input',{ref:"input",staticClass:"file-name-input",attrs:{"disabled":_vm.disabled === true,"type":"text"},domProps:{"value":_vm.fileRecord.name(true)},on:{"focus":function($event){return _vm.editInputFocused()},"blur":function($event){return _vm.editInputBlured()},"change":function($event){return _vm.filenameChanged()},"input":function($event){return _vm.filenameChanged()},"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter"))return null;return _vm.filenameChanged(true)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"]))return null;return _vm.filenameChanged(false)}]}}):_vm._e(),(_vm.editable === true)?_c('span',{staticClass:"file-name-edit-icon"},[_c('VueFileIcon',{attrs:{"name":"system-file-name-edit"}})],1):_vm._e(),_c('span',{staticClass:"file-name-text"},[_vm._v(_vm._s(_vm.fileRecord.name(true)))])]),(_vm.fileRecord.dimensions.width && _vm.fileRecord.dimensions.height)?_c('span',{staticClass:"image-dimension"},[_c('span',{staticClass:"image-dimension-width"},[_vm._v(_vm._s(_vm.fileRecord.dimensions.width))]),_c('span',{staticClass:"image-dimension-height"},[_vm._v(_vm._s(_vm.fileRecord.dimensions.height))])]):_vm._e(),(_vm.fileRecord.hasProgress())?_c('span',{staticClass:"file-progress",class:{
        'file-progress-full': _vm.fileRecord.progress() >= 99.9999,
        'file-progress-done': _vm.fileRecord.progress() >= 100,
        'has-file-progress': _vm.fileRecord.progress() > 0,
      }},[_c('span',{staticClass:"file-progress-bar",style:({ width: _vm.fileRecord.progress() + '%' })})]):_vm._e(),_c('span',{staticClass:"file-icon"},[(_vm.hasLinkableUrl)?_c('a',{attrs:{"href":_vm.fileRecord.url(),"target":"_blank","title":_vm.fileRecord.name()}},[_c('VueFileIcon',{attrs:{"ext":_vm.fileRecord.ext()}})],1):_c('VueFileIcon',{attrs:{"ext":_vm.fileRecord.ext()}})],1)])])
}
var vue_file_previewvue_type_template_id_7be956b0_staticRenderFns = []


;// CONCATENATED MODULE: ./src/lib/drop-handler.ts

function getFilesFromDroppedItems(dataTransfer) {
    return new Promise(function (resolve) {
        if (!includesFolder(dataTransfer)) {
            return resolve(dataTransfer.files);
        }
        var files = [];
        var folderReadQueue = [];
        // tslint:disable-next-line
        for (var i = 0; i < dataTransfer.items.length; i++) {
            var item = dataTransfer.items[i];
            if (item.kind !== 'file') {
                continue;
            }
            var fileSystemEntries = getEntries(item);
            if (fileSystemEntries) {
                folderReadQueue.push(fileSystemEntries);
            }
            else {
                var file = item.getAsFile();
                if (file) {
                    files.push(file);
                }
            }
        }
        Promise.all(folderReadQueue).then(function (filesInFolders) {
            resolve(files.concat.apply(files, __spreadArray([], __read(filesInFolders), false)));
        });
    });
}
function getEntries(entry) {
    // convert DataTransferItem to FileSystemEntry first if necessary
    if (entry.getAsEntry) {
        return getEntries(entry.getAsEntry());
    }
    if (entry.webkitGetAsEntry) {
        return getEntries(entry.webkitGetAsEntry());
    }
    // return if item is from a browser that does not support webkitGetAsEntry
    if (entry.getAsFile) {
        return;
    }
    // Processing directories with more than 100 files:
    // https://github.com/lian-yue/vue-upload-component/commit/9c9d8aafbcef005a2cc598454383ec65205d61ee
    return new Promise(function (resolve) {
        if (entry.isFile) {
            entry.file(function (file) { return resolve([file]); });
            return;
        }
        if (entry.isDirectory) {
            var files_1 = [];
            var entryReader_1 = entry.createReader();
            var readEntries_1 = function () {
                entryReader_1.readEntries(function (entries) {
                    var iterateEntry = function (i) {
                        if (!entries[i] && i === 0) {
                            return resolve(files_1);
                        }
                        if (!entries[i]) {
                            return readEntries_1();
                        }
                        getEntries(entries[i]).then(function (entryFiles) {
                            files_1.push.apply(files_1, __spreadArray([], __read(entryFiles), false));
                            iterateEntry(i + 1);
                        });
                    };
                    iterateEntry(0);
                });
            };
            readEntries_1();
        }
        if (!entry.isFile && !entry.isDirectory) {
            resolve([]);
        }
    });
}
function includesFolder(transfer) {
    var e_1, _a;
    if (!transfer.files.length) {
        return true; // if dropping only folders, no files will exist
    }
    try {
        // Loop through the dropped items and log their data
        for (var _b = __values(transfer.items), _c = _b.next(); !_c.done; _c = _b.next()) {
            var item = _c.value;
            if (item.webkitGetAsEntry != null) {
                var entry = item.webkitGetAsEntry();
                if (entry && entry.isDirectory) {
                    return true;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var files = transfer.files;
    // tslint:disable-next-line
    for (var i = 0; i < files.length; i++) {
        // A folder has no type and has a size that is a multiple of 4096
        if (!files[i].type && files[i].size % 4096 === 0) {
            return true;
        }
    }
    return false;
}

;// CONCATENATED MODULE: ./src/lib/utils.ts


var ImageOrientation;
(function (ImageOrientation) {
    ImageOrientation[ImageOrientation["NORMAL"] = 1] = "NORMAL";
    ImageOrientation[ImageOrientation["UPSIDE_DOWN"] = 6] = "UPSIDE_DOWN";
})(ImageOrientation || (ImageOrientation = {}));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.arrayMove = function (arr, previousIndex, newIndex) {
        // https://github.com/Jexordexan/vue-slicksort/blob/master/src/utils.js
        var array = arr.slice(0);
        if (newIndex >= array.length) {
            var k = newIndex - array.length;
            while (k-- + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
        return array;
    };
    Utils.prototype.getAverageColor = function (arr) {
        var bytesPerPixel = 4;
        var arrLength = arr.length;
        if (arrLength < bytesPerPixel) {
            return;
        }
        var step = 5;
        var len = arrLength - (arrLength % bytesPerPixel);
        var preparedStep = (step || 1) * bytesPerPixel;
        var redTotal = 0;
        var greenTotal = 0;
        var blueTotal = 0;
        var alphaTotal = 0;
        var count = 0;
        for (var i = 0; i < len; i += preparedStep) {
            var alpha = arr[i + 3];
            var red = arr[i] * alpha;
            var green = arr[i + 1] * alpha;
            var blue = arr[i + 2] * alpha;
            redTotal += red;
            greenTotal += green;
            blueTotal += blue;
            alphaTotal += alpha;
            count++;
        }
        return alphaTotal
            ? [
                Math.round(redTotal / alphaTotal),
                Math.round(greenTotal / alphaTotal),
                Math.round(blueTotal / alphaTotal),
                Math.round(alphaTotal / count),
            ]
            : [0, 0, 0, 0];
    };
    Utils.prototype.createVideoThumbnail = function (video, canvas, thumbnailSize, calculateAverageColor, withCredentials) {
        var _this = this;
        if (withCredentials) {
        }
        video.setAttribute('crossOrigin', withCredentials ? 'use-credentials' : 'anonymous'); // fix cross origin issue
        return new Promise(function (resolve, reject) {
            var loadedmetadata = false;
            var loadeddata = false;
            var tryGetThumbnail = function () {
                if (!(loadedmetadata && loadeddata)) {
                    return;
                }
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                var color;
                if (calculateAverageColor) {
                    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    color = _this.getAverageColor(imageData.data);
                }
                var url = canvas.toDataURL();
                resolve({
                    url: url,
                    color: color,
                    width: video.videoWidth,
                    height: video.videoHeight,
                });
            };
            // Load metadata of the video to get video duration and dimensions
            video.addEventListener('loadedmetadata', function () {
                // var video_duration = video.duration;
                canvas.width = thumbnailSize;
                canvas.height = (canvas.width / video.videoWidth) * video.videoHeight;
                video.currentTime = 1; // video time
                loadedmetadata = true;
                tryGetThumbnail();
            });
            video.addEventListener('loadeddata', function () {
                loadeddata = true;
                tryGetThumbnail();
            });
        });
    };
    Utils.prototype.getDataURL = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (!(event.target && event.target.result)) {
                    return resolve('');
                }
                resolve(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    };
    Utils.prototype.getImageOrientationFromArrayBuffer = function (buffer) {
        // -2: not jpeg
        // -1: not defined
        var view = new DataView(buffer);
        if (view.getUint16(0, false) !== 0xffd8) {
            return -2;
        }
        var length = view.byteLength;
        var offset = 2;
        while (offset < length) {
            if (view.getUint16(offset + 2, false) <= 8) {
                return -1;
            }
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xffe1) {
                if (view.getUint32((offset += 2), false) !== 0x45786966) {
                    return -1;
                }
                var little = view.getUint16((offset += 6), false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++) {
                    if (view.getUint16(offset + i * 12, little) === 0x0112) {
                        return view.getUint16(offset + i * 12 + 8, little);
                    }
                }
                // tslint:disable-next-line
            }
            else if ((marker & 0xff00) !== 0xff00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return -1;
    };
    Utils.prototype.getImageOrientation = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            if (!reader.readAsArrayBuffer) {
                return resolve(-3);
            }
            reader.onload = function (event) {
                if (!(event.target && event.target.result)) {
                    return resolve(-3);
                }
                resolve(_this.getImageOrientationFromArrayBuffer(event.target.result));
            };
            // https://stackoverflow.com/questions/3248946/what-is-the-maximum-size-of-jpeg-metadata
            // https://twitter.com/jaffathecake/status/1085443592678752256
            // reader.readAsArrayBuffer(file);
            reader.readAsArrayBuffer(file.slice(0, 65536));
        });
    };
    Utils.prototype.rotateCanvas = function (srcOrientation, canvas, ctx, width, height) {
        // set proper canvas dimensions before transform & export
        if (4 < srcOrientation && srcOrientation < 9) {
            canvas.width = height;
            canvas.height = width;
        }
        else {
            canvas.width = width;
            canvas.height = height;
        }
        // transform context before drawing image
        switch (srcOrientation) {
            case 2:
                ctx.transform(-1, 0, 0, 1, width, 0);
                break;
            case 3:
                ctx.transform(-1, 0, 0, -1, width, height);
                break;
            case 4:
                ctx.transform(1, 0, 0, -1, 0, height);
                break;
            case 5:
                ctx.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                ctx.transform(0, 1, -1, 0, height, 0);
                break;
            case 7:
                ctx.transform(0, -1, -1, 0, height, width);
                break;
            case 8:
                ctx.transform(0, -1, 1, 0, 0, width);
                break;
            default:
                break;
        }
    };
    Utils.prototype.getImageResized = function (image, widthLimit, heightLimit, orientation, calculateAverageColor) {
        var width = image.width;
        var height = image.height;
        var thumbnailSize = widthLimit;
        if (widthLimit && heightLimit) {
            width = widthLimit;
            height = heightLimit;
        }
        else {
            if (width > height) {
                if (width > thumbnailSize) {
                    height *= thumbnailSize / width;
                    width = thumbnailSize;
                }
            }
            else {
                if (height > thumbnailSize) {
                    width *= thumbnailSize / height;
                    height = thumbnailSize;
                }
            }
        }
        width = Math.floor(width);
        height = Math.floor(height);
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        if (!context) {
            return null;
        }
        canvas.width = width;
        canvas.height = height;
        if (orientation !== undefined) {
            this.rotateCanvas(orientation, canvas, context, width, height);
        }
        context.drawImage(image, 0, 0, width, height);
        var avgColor = null;
        try {
            var rgba = void 0;
            if (calculateAverageColor) {
                var imageData = context.getImageData(0, 0, width, height);
                rgba = this.getAverageColor(imageData.data);
            }
            if (rgba) {
                avgColor = rgba;
            }
        }
        catch (e) {
            /* security error, img on diff domain */
        }
        return {
            image: image,
            url: canvas.toDataURL('image/png'),
            color: avgColor,
        };
    };
    Utils.prototype.resizeImageUrl = function (image, url, thumbnailSize, calculateAverageColor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            image.onload = function () {
                if (!calculateAverageColor) {
                    resolve({
                        image: image,
                        url: url,
                        color: undefined,
                    });
                    return;
                }
                var resized = _this.getImageResized(image, thumbnailSize, undefined, undefined, calculateAverageColor);
                if (resized) {
                    resized.url = url;
                }
                resolve(resized);
            };
            image.onerror = function () {
                reject('Image loading failed: ' + url);
            };
            image.src = url;
        });
    };
    Utils.prototype.resizeImageFile = function (image, file, thumbnailSize, calculateAverageColor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (file.type.indexOf('image') === -1) {
                reject(new Error('Not an image'));
                return;
            }
            var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
            var revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
            var shouldRevoke = false;
            var orientationPromise = _this.getImageOrientation(file);
            image.onload = function () {
                orientationPromise.then(function (orientation) {
                    var resized = _this.getImageResized(image, thumbnailSize, undefined, orientation, calculateAverageColor);
                    if (shouldRevoke) {
                        revokeObjectURL(image.src);
                    }
                    resolve(resized);
                });
            };
            if (!(file instanceof File)) {
                return reject('Invalid file object. Use url or a valid instance of File class');
            }
            if (createObjectURL && !!revokeObjectURL) {
                shouldRevoke = true;
                image.src = createObjectURL(file);
                return;
            }
            _this.getDataURL(file).then(function (dataUrl) {
                image.src = dataUrl;
            });
        });
    };
    Utils.prototype.resizeImage = function (thumbnailSize, file, url, calculateAverageColor, withCredentials) {
        var image = new Image();
        image.setAttribute('crossOrigin', withCredentials ? 'use-credentials' : 'anonymous');
        // FLAG: tif/tiff is not supported by most modern browsers
        if (file === null || file === void 0 ? void 0 : file.type.includes('image/tif')) {
            return Promise.reject(new Error('Unsupported image format for thumbnail preview'));
        }
        return url
            ? this.resizeImageUrl(image, url, thumbnailSize, calculateAverageColor)
            : this.resizeImageFile(image, file, thumbnailSize, calculateAverageColor);
    };
    Utils.prototype.getSizeFormatted = function (bytes) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) {
            return '0 B';
        }
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        i = parseInt('' + i, 10);
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    };
    Utils.prototype.getSizeParsed = function (size) {
        size = ('' + size).toUpperCase();
        var matches = size.match(/([\d|.]+?)\s*?([A-Z]+)/);
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (!matches) {
            return parseFloat(size);
        }
        var i = sizes.indexOf(matches[2]);
        if (i === -1) {
            return parseFloat(size);
        }
        return parseFloat(matches[1]) * Math.pow(1024, i);
    };
    Utils.prototype.getColorForText = function (text) {
        var getHashCode = function (value) {
            var hash = 0;
            if (value.length === 0) {
                return hash;
            }
            for (var i = 0; i < value.length; i++) {
                // tslint:disable-next-line
                hash = value.charCodeAt(i) + ((hash << 5) - hash);
                // tslint:disable-next-line
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        };
        var intToHSL = function (value) {
            var h = value % 360;
            var s = value % 100;
            var l = 50;
            return 'hsl(' + h + ',' + s + '%,' + l + '%, 0.75)';
        };
        return intToHSL(getHashCode(text.toLowerCase()));
    };
    Utils.prototype.validateType = function (file, accept) {
        var e_1, _a;
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
        // https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js#L2511
        if (!accept) {
            return true;
        } // If there are no accepted mime types, it's OK
        var acceptedFiles = accept.split(',');
        var mimeType = file.type;
        var baseMimeType = mimeType.replace(/\/.*$/, '');
        try {
            for (var acceptedFiles_1 = __values(acceptedFiles), acceptedFiles_1_1 = acceptedFiles_1.next(); !acceptedFiles_1_1.done; acceptedFiles_1_1 = acceptedFiles_1.next()) {
                var validType = acceptedFiles_1_1.value;
                validType = validType.trim();
                if (validType.charAt(0) === '.') {
                    // extension
                    if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                        return true;
                    }
                }
                else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    if (baseMimeType === validType.replace(/\/.*$/, '')) {
                        return true;
                    }
                }
                else {
                    if (mimeType === validType) {
                        return true;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (acceptedFiles_1_1 && !acceptedFiles_1_1.done && (_a = acceptedFiles_1.return)) _a.call(acceptedFiles_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    Utils.prototype.validateSize = function (file, maxSize) {
        if (!maxSize) {
            return true;
        }
        var bytes = this.getSizeParsed(maxSize);
        return file.size <= bytes;
    };
    Utils.prototype.getFilesFromDroppedItems = function (dataTransfer) {
        return getFilesFromDroppedItems(dataTransfer);
    };
    return Utils;
}());
/* harmony default export */ var utils = (new Utils());

;// CONCATENATED MODULE: ./src/lib/file-record.ts



var FileRecord = /** @class */ (function () {
    function FileRecord(data, options) {
        this.urlValue = null;
        this.urlResized = null;
        this.image = {};
        this.isPlayingAv = false;
        this.oldFileName = null;
        this.oldCustomName = null;
        this.upload = { data: null, error: false };
        this.urlValue = null;
        this.urlResized = null;
        this.lastKnownSrc = null;
        this.image = {};
        this.isPlayingAv = false;
        this.oldFileName = null;
        this.oldCustomName = null;
        this.raw = data;
        this.file = data.file instanceof File ? data.file : this.createDummyFile(data);
        this.progressInternal = !isNaN(data.progress) ? data.progress : 0;
        // this.width = FileRecord.defaultWidth;
        // this.height = FileRecord.defaultHeight;
        this.thumbnailSize = options.thumbnailSize || 360;
        this.read = !!options.read;
        this.dimensions = data.dimensions || { width: 0, height: 0 };
        this.dimensions.width = this.dimensions.width || 0;
        this.dimensions.height = this.dimensions.height || 0;
        this.error = data.error || false;
        this.options = options;
        this.maxSize = options.maxSize;
        this.accept = options.accept;
        this.id = Math.random() + ':' + new Date().getTime();
        this.videoThumbnail = data.videoThumbnail;
        this.imageColor = data.imageColor;
        this.customName = data.customName;
        this.calculateAverageColor = options.averageColor !== undefined ? options.averageColor : true;
        this.validate();
    }
    FileRecord.getFromRaw = function (rawFileRecord, options, isSync) {
        if (isSync === void 0) { isSync = false; }
        var fileRecord = new FileRecord(rawFileRecord, options);
        var promise = fileRecord.setUrl(rawFileRecord.url);
        rawFileRecord.progress = fileRecord.progress.bind(fileRecord); // convert it as a function
        rawFileRecord.src = fileRecord.src.bind(fileRecord);
        rawFileRecord.name = fileRecord.name.bind(fileRecord); // convert it as a function
        if (isSync) {
            return fileRecord;
        }
        return promise;
    };
    FileRecord.fromRaw = function (rawFileRecord, options) {
        return FileRecord.getFromRaw(rawFileRecord, options, false);
    };
    FileRecord.fromRawSync = function (rawFileRecord, options) {
        return FileRecord.getFromRaw(rawFileRecord, options, true);
    };
    FileRecord.fromRawArray = function (rawFileRecords, options) {
        var e_1, _a;
        var promises = [];
        try {
            for (var rawFileRecords_1 = __values(rawFileRecords), rawFileRecords_1_1 = rawFileRecords_1.next(); !rawFileRecords_1_1.done; rawFileRecords_1_1 = rawFileRecords_1.next()) {
                var rawFileRecord = rawFileRecords_1_1.value;
                promises.push(FileRecord.fromRaw(rawFileRecord, options));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rawFileRecords_1_1 && !rawFileRecords_1_1.done && (_a = rawFileRecords_1.return)) _a.call(rawFileRecords_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Promise.all(promises);
    };
    FileRecord.toRawArray = function (fileRecords) {
        var e_2, _a;
        var rawFileRecords = [];
        try {
            for (var fileRecords_1 = __values(fileRecords), fileRecords_1_1 = fileRecords_1.next(); !fileRecords_1_1.done; fileRecords_1_1 = fileRecords_1.next()) {
                var fileRecord = fileRecords_1_1.value;
                rawFileRecords.push(fileRecord.toRaw());
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (fileRecords_1_1 && !fileRecords_1_1.done && (_a = fileRecords_1.return)) _a.call(fileRecords_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return rawFileRecords;
    };
    FileRecord.readFile = function (fileRecord) {
        return new Promise(function (resolve, reject) {
            if (!fileRecord.read) {
                fileRecord.setUrl(null).then(function () {
                    resolve(fileRecord);
                }, function (err) {
                    // ignore error
                    resolve(fileRecord);
                });
                return;
            }
            utils.getDataURL(fileRecord.file).then(function (dataUrl) {
                fileRecord.setUrl(dataUrl).then(function () {
                    resolve(fileRecord);
                }, reject);
            }, reject);
        });
    };
    FileRecord.readFiles = function (fileRecords) {
        var e_3, _a;
        var promises = [];
        try {
            for (var fileRecords_2 = __values(fileRecords), fileRecords_2_1 = fileRecords_2.next(); !fileRecords_2_1.done; fileRecords_2_1 = fileRecords_2.next()) {
                var fileRecord = fileRecords_2_1.value;
                promises.push(FileRecord.readFile(fileRecord));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (fileRecords_2_1 && !fileRecords_2_1.done && (_a = fileRecords_2.return)) _a.call(fileRecords_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return Promise.all(promises);
    };
    // populate(data, options = {}) {}
    FileRecord.prototype.createDummyFile = function (data) {
        var file = {};
        file.lastModified = data.lastModified;
        var d = new Date();
        if (file.lastModified) {
            d.setTime(file.lastModified);
        }
        file.lastModifiedDate = d;
        file.name = typeof data.name === 'function' ? data.name() : data.name;
        file.size = data.size;
        file.type = data.type;
        return file;
    };
    FileRecord.prototype.hasProgress = function () {
        return !isNaN(this.progressInternal); // && this._progress <= 100;
    };
    FileRecord.prototype.progress = function (value) {
        if (value !== undefined) {
            this.progressInternal = value;
            return;
        }
        return this.progressInternal || 0;
    };
    FileRecord.prototype.url = function (value) {
        if (value !== undefined) {
            return this.setUrl(value);
        }
        return this.urlValue || undefined;
    };
    FileRecord.prototype.src = function () {
        if (this.isImage()) {
            return this.urlResized || this.urlValue || this.file.url;
        }
        if (this.isPlayableVideo()) {
            return this.videoThumbnail || '';
        }
        return '';
    };
    FileRecord.prototype.size = function () {
        if (!this.file) {
            return '';
        }
        return utils.getSizeFormatted(this.file.size);
    };
    FileRecord.prototype.ext = function () {
        if (this.file && this.file.name.indexOf('.') !== -1) {
            return this.file.name.split('.').pop();
        }
        return '?';
        // return this.file.type.split('/').shift();
    };
    FileRecord.prototype.name = function (withoutExt) {
        var ext = this.ext();
        if (this.customName) {
            return this.customName + (withoutExt ? '' : ext !== '?' ? '.' + ext : '');
        }
        var name = this.file && this.file.name;
        if (withoutExt) {
            if (ext !== '?') {
                return name.substr(0, name.length - (ext.length + 1));
            }
        }
        return name;
    };
    FileRecord.prototype.isDarkColor = function () {
        if (this.imageColor) {
            var rgb = this.imageColor;
            var darkPoint = 20;
            return rgb[0] <= darkPoint && rgb[1] <= darkPoint && rgb[2] <= darkPoint;
        }
        return false;
    };
    FileRecord.prototype.color = function () {
        if (this.imageColor) {
            var rgb = this.imageColor;
            return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
        }
        if (this.isImage()) {
            return 'transparent';
        }
        var ext = this.ext();
        var svgIcon = this.icon();
        // var svgIcon = getIconFromExt(ext);
        if (svgIcon.color) {
            return svgIcon.color;
        }
        return utils.getColorForText(ext);
    };
    FileRecord.prototype.isImage = function () {
        return this.file && !!this.file.type.match(/image((?!vnd).)*$/i);
    };
    FileRecord.prototype.isVideo = function () {
        return this.file && this.file.type.indexOf('video') !== -1;
    };
    FileRecord.prototype.isPlayableVideo = function () {
        return this.icon().category === 'video-playable';
    };
    FileRecord.prototype.isAudio = function () {
        return this.file && this.file.type.indexOf('audio') !== -1;
    };
    FileRecord.prototype.isPlayableAudio = function () {
        return this.icon().category === 'audio-playable';
    };
    FileRecord.prototype.isText = function () {
        return this.file && this.file.type.indexOf('text') !== -1;
    };
    FileRecord.prototype.setUrl = function (url) {
        var _this = this;
        this.urlValue = url;
        return new Promise(function (resolve, reject) {
            if (_this.isImage()) {
                _this.resizeImage().then(function () {
                    resolve(_this);
                }, function (err) {
                    resolve(_this);
                });
                return;
            }
            resolve(_this);
        });
    };
    FileRecord.prototype.imageResized = function (resized) {
        if (!resized) {
            return;
        }
        this.urlResized = resized.url;
        this.image = resized.image;
        if (resized.image && resized.image.width && resized.image.height) {
            this.dimensions.width = resized.image.width;
            this.dimensions.height = resized.image.height;
        }
        this.lastKnownSrc = this.urlResized;
        this.imageColor = resized.color;
    };
    FileRecord.prototype.resizeImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            utils
                .resizeImage(_this.thumbnailSize, _this.file, _this.urlValue, _this.calculateAverageColor)
                .then(function (resized) {
                _this.imageResized(resized);
                resolve(_this);
            })
                .catch(reject);
        });
    };
    FileRecord.prototype.icon = function () {
        var ext = this.ext();
        var svgIcon = getIconFromExt(ext);
        return svgIcon;
    };
    FileRecord.prototype.getErrorMessage = function (errorText) {
        var error = this.error;
        if (!error) {
            return '';
        }
        errorText = errorText || {};
        errorText = {
            common: errorText.common || 'Invalid file.',
            type: errorText.type || 'Invalid file type.',
            size: errorText.size || 'Files should not exceed ' + this.maxSize + ' in size',
        };
        if (error.type) {
            return errorText.type;
        }
        else if (error.size) {
            return errorText.size;
        }
        else if (error.upload) {
            return this.upload.error ? this.upload.error : error.upload;
        }
        return errorText.common;
    };
    FileRecord.prototype.toRaw = function () {
        var _this = this;
        var raw = this.raw || {};
        // raw.url = this.urlValue;
        raw.url = this.url.bind(this);
        raw.urlResized = this.urlResized;
        raw.src = this.src.bind(this);
        raw.name = this.name.bind(this);
        raw.lastModified = this.file.lastModified;
        raw.sizeText = this.size();
        raw.size = this.file.size;
        raw.type = this.file.type;
        raw.ext = this.ext();
        raw.color = this.color();
        raw.file = this.file;
        raw.progress = this.progress.bind(this); // pass it as a function
        raw.upload = this.upload;
        if (!('error' in raw)) {
            Object.defineProperty(raw, 'error', {
                get: function () {
                    return _this.error;
                },
            });
        }
        raw.dimensions = this.dimensions;
        return raw;
    };
    FileRecord.prototype.validate = function () {
        var validType = utils.validateType(this.file, this.accept);
        var validSize = utils.validateSize(this.file, this.maxSize);
        if (!validType || !validSize) {
            this.error = {
                type: !validType,
                size: !validSize,
            };
        }
        else {
            this.error = false;
        }
    };
    return FileRecord;
}());
/* harmony default export */ var file_record = (FileRecord);

;// CONCATENATED MODULE: ./src/components/vue-file-preview-mixin.ts




/* harmony default export */ var vue_file_preview_mixin = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    props: [
        'value',
        'deletable',
        'editable',
        'linkable',
        'errorText',
        'disabled',
        'thumbnailSize',
        'averageColor',
        'withCredentials',
    ],
    components: {
        VueFileIcon: vue_file_icon,
    },
    data: function () {
        return {
            isEditInputFocused: false,
            isEditCancelable: true,
            fileRecord: {},
        };
    },
    computed: {
        hasLinkableUrl: function () {
            if (!this.linkable) {
                return false;
            }
            return !!this.fileRecord.url() && !this.fileRecord.isPlayableVideo() && !this.fileRecord.isPlayableAudio();
        },
    },
    methods: {
        updateFileRecord: function () {
            var _this = this;
            if (this.value instanceof file_record) {
                this.fileRecord = this.value;
                return;
            }
            file_record.fromRaw(this.value, {
                thumbnailSize: this.thumbnailSize,
                averageColor: this.averageColor,
                withCredentials: this.withCredentials,
            }).then(function (fileRecord) {
                _this.fileRecord = fileRecord;
            });
            this.fileRecord = file_record.fromRawSync(this.value, {
                thumbnailSize: this.thumbnailSize,
                averageColor: this.averageColor,
                withCredentials: this.withCredentials,
            });
        },
        createThumbnail: function (fileRecord, video) {
            if (fileRecord.videoThumbnail) {
                video.poster = fileRecord.src();
                return;
            }
            var canvas = document.createElement('canvas');
            utils
                .createVideoThumbnail(video, canvas, this.fileRecord.thumbnailSize, this.averageColor !== false)
                .then(function (thumbnail) {
                fileRecord.imageColor = thumbnail.color;
                fileRecord.videoThumbnail = thumbnail.url;
                fileRecord.dimensions.width = thumbnail.width;
                fileRecord.dimensions.height = thumbnail.height;
                video.poster = fileRecord.src();
            });
        },
        playAv: function (fileRecord) {
            if (fileRecord.stopAv) {
                fileRecord.stopAv();
                return;
            }
            var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
            var revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
            var wrapper = this.$refs.wrapper;
            var player = document.createElement(fileRecord.isAudio() ? 'audio' : 'video');
            if (player instanceof HTMLVideoElement && fileRecord.isPlayableVideo()) {
                this.createThumbnail(fileRecord, player);
            }
            player.controls = true;
            // player.style.width = this.prvWidth + 'px';
            wrapper.appendChild(player);
            var url = fileRecord.url() || createObjectURL(fileRecord.file);
            player.src = url;
            player.play();
            fileRecord.isPlayingAv = true;
            fileRecord.stopAv = function () {
                // player.src = null;
                player.src = '';
                wrapper.removeChild(player);
                revokeObjectURL(url);
                fileRecord.isPlayingAv = false;
                fileRecord.stopAv = null;
            };
        },
        removeFileRecord: function (fileRecord) {
            if (this.clearFilename()) {
                return;
            }
            if (this.disabled === true) {
                return;
            }
            this.$emit('remove', fileRecord);
        },
        editFileName: function () {
            if (this.editable !== true) {
                return;
            }
            if (!this.$refs.input) {
                return;
            }
            this.$refs.input.focus();
        },
        editInputFocused: function () {
            this.isEditInputFocused = true;
            this.isEditCancelable = true;
        },
        editInputBlured: function () {
            var _this = this;
            this.fileRecord.oldFileName = this.fileRecord.name();
            var oldValue = this.fileRecord.name(true);
            var value = this.$refs.input.value;
            this.fileRecord.customName = value;
            var newValue = this.fileRecord.name(true);
            if (newValue !== oldValue) {
                this.fileRecord.oldCustomName = oldValue;
                this.$emit('rename', this.fileRecord);
            }
            var timeout = 100;
            setTimeout(function () {
                _this.$nextTick(function () {
                    if (!_this.isEditCancelable) {
                        return;
                    }
                    _this.isEditInputFocused = false;
                });
            }, timeout);
        },
        filenameChanged: function (completed) {
            if (completed) {
                this.$refs.input.blur(); // @see editInputBlured method
            }
            if (completed === false) {
                this.clearFilename();
            }
        },
        filenameClearPressed: function () {
            if (!(this.editable === true && this.isEditInputFocused)) {
                return;
            }
            this.isEditCancelable = false;
        },
        clearFilename: function () {
            if (!(this.editable === true && this.isEditInputFocused)) {
                return false;
            }
            this.$refs.input.value = '';
            this.isEditCancelable = true;
            this.editInputBlured();
            return true;
        },
        dismissError: function () {
            if (this.fileRecord.error && (this.fileRecord.error.size || this.fileRecord.error.type)) {
                return;
            }
            this.fileRecord.error = false;
        },
    },
    created: function () {
        this.updateFileRecord();
    },
    watch: {
        value: function () {
            this.updateFileRecord();
        },
    },
}));

;// CONCATENATED MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-preview.vue?vue&type=script&lang=ts


/* harmony default export */ var vue_file_previewvue_type_script_lang_ts = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    mixins: [vue_file_preview_mixin],
}));

;// CONCATENATED MODULE: ./src/components/vue-file-preview.vue?vue&type=script&lang=ts
 /* harmony default export */ var components_vue_file_previewvue_type_script_lang_ts = (vue_file_previewvue_type_script_lang_ts); 
;// CONCATENATED MODULE: ./src/components/vue-file-preview.vue





/* normalize component */
;
var vue_file_preview_component = normalizeComponent(
  components_vue_file_previewvue_type_script_lang_ts,
  vue_file_previewvue_type_template_id_7be956b0_render,
  vue_file_previewvue_type_template_id_7be956b0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_preview = (vue_file_preview_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-list.vue?vue&type=template&id=0ab83eb6
var vue_file_listvue_type_template_id_0ab83eb6_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',[_vm._t("default")],2)
}
var vue_file_listvue_type_template_id_0ab83eb6_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-list.vue?vue&type=script&lang=ts

/* harmony default export */ var vue_file_listvue_type_script_lang_ts = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    props: ['value', 'axis', 'appendTo'],
}));

;// CONCATENATED MODULE: ./src/components/vue-file-list.vue?vue&type=script&lang=ts
 /* harmony default export */ var components_vue_file_listvue_type_script_lang_ts = (vue_file_listvue_type_script_lang_ts); 
;// CONCATENATED MODULE: ./src/components/vue-file-list.vue





/* normalize component */
;
var vue_file_list_component = normalizeComponent(
  components_vue_file_listvue_type_script_lang_ts,
  vue_file_listvue_type_template_id_0ab83eb6_render,
  vue_file_listvue_type_template_id_0ab83eb6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_list = (vue_file_list_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-list-item.vue?vue&type=template&id=aa83b36e
var vue_file_list_itemvue_type_template_id_aa83b36e_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',[_vm._t("default")],2)
}
var vue_file_list_itemvue_type_template_id_aa83b36e_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-list-item.vue?vue&type=script&lang=ts

/* harmony default export */ var vue_file_list_itemvue_type_script_lang_ts = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    props: ['index'],
}));

;// CONCATENATED MODULE: ./src/components/vue-file-list-item.vue?vue&type=script&lang=ts
 /* harmony default export */ var components_vue_file_list_itemvue_type_script_lang_ts = (vue_file_list_itemvue_type_script_lang_ts); 
;// CONCATENATED MODULE: ./src/components/vue-file-list-item.vue





/* normalize component */
;
var vue_file_list_item_component = normalizeComponent(
  components_vue_file_list_itemvue_type_script_lang_ts,
  vue_file_list_itemvue_type_template_id_aa83b36e_render,
  vue_file_list_itemvue_type_template_id_aa83b36e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_list_item = (vue_file_list_item_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-agent.vue?vue&type=template&id=d0148d4a
var vue_file_agentvue_type_template_id_d0148d4a_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{class:[
    'is-sortable-' + (_vm.isSortable ? 'enabled' : 'disabled'),
    {
      'is-sortable-hold': _vm.sortable === 'hold',
      'is-sortable-handle': _vm.sortable === 'handle',
      'is-sortable-immediately': _vm.sortable === true,
      'is-sorting': _vm.isSorting,
      'is-sorting-active': _vm.isSortingActive,
      'is-drag-over': _vm.isDragging,
      'is-disabled': _vm.disabled === true,
      'is-readonly': _vm.readonly === true,
      'is-drag-valid': !(_vm.disabled === true || _vm.readonly === true || (_vm.hasMultiple && !_vm.canAddMore)),
    },
    'theme-' + _vm.theme,
  ],attrs:{"id":'vfa-' + _vm.uniqueId},on:{"dragover":_vm.dragOver,"dragenter":_vm.dragEnter,"dragleave":_vm.dragLeave,"drop":_vm.drop}},[_vm._t("before-outer"),_c('div',{staticClass:"grid-block-wrapper vue-file-agent file-input-wrapper",class:{
      'is-compact': !!_vm.compact,
      'is-single': !_vm.hasMultiple,
      'has-multiple': _vm.hasMultiple,
      'no-meta': _vm.meta === false,
    }},[_vm._t("before-inner"),_c('canvas',{ref:"thumbnailCanvas",staticStyle:{"position":"fixed","visibility":"hidden","z-index":"-3"}}),(_vm.overallProgress)?_c('div',{staticClass:"overall-progress",class:{ 'overall-progress-full': _vm.overallProgress >= 100 }},[_c('div',{staticClass:"overall-progress-bar",style:({ width: _vm.overallProgress + '%' })}),_c('div',{staticClass:"overall-progress-left",style:({ width: 100 - _vm.overallProgress + '%' })})]):_vm._e(),_c(_vm.isSortable ? 'vfa-sortable-list' : 'VueFileList',{tag:"component",attrs:{"axis":_vm.theme == 'list' ? 'y' : 'xy',"appendTo":'#vfa-' + _vm.uniqueId + ' .vue-file-agent',"transitionDuration":_vm.transitionDuration,"pressDelay":_vm.sortable === 'hold' ? 200 : 0,"useDragHandle":_vm.sortable === 'handle',"helperClass":'active-sorting-item'},on:{"sort-start":function($event){return _vm.sortStart()},"sort-end":function($event){return _vm.sortEnd($event)}},model:{value:(_vm.fileRecords),callback:function ($$v) {_vm.fileRecords=$$v},expression:"fileRecords"}},[_c('transition-group',{attrs:{"name":"grid-box","tag":"div"}},[_vm._l((_vm.fileRecords),function(fileRecord,index){return _c(_vm.isSortable ? 'vfa-sortable-item' : 'VueFileListItem',{key:fileRecord.id,tag:"component",staticClass:"file-preview-wrapper grid-box-item grid-block",attrs:{"index":index}},[(_vm.sortable === 'handle')?_c('span',{directives:[{name:"vfa-sortable-handle",rawName:"v-vfa-sortable-handle"}],staticClass:"file-sortable-handle"},[_vm._t("sortable-handle",function(){return [_c('VueFileIcon',{attrs:{"name":"system-sortable-handle"}})]})],2):_vm._e(),_vm._t("file-preview-before",null,{"fileRecord":fileRecord,"fileData":fileRecord,"index":index}),_vm._t("file-preview",function(){return [_c('VueFilePreview',{attrs:{"averageColor":_vm.averageColor,"value":fileRecord,"deletable":_vm.isDeletable,"editable":_vm.editable === true,"linkable":_vm.linkable === true,"errorText":_vm.errorText,"disabled":_vm.disabled,"thumbnailSize":_vm.thumbnailSize,"withCredentials":_vm.withCredentials},on:{"remove":function($event){return _vm.removeFileRecord($event)},"rename":function($event){return _vm.filenameChanged($event)}}})]},{"fileRecord":fileRecord,"fileData":fileRecord,"index":index}),_vm._t("file-preview-after",null,{"fileRecord":fileRecord,"fileData":fileRecord,"index":index})],2)}),(_vm.canAddMore && _vm.readonly !== true)?[_vm._t("file-preview-new",function(){return [_c('div',{key:"new",staticClass:"file-preview-wrapper grid-box-item grid-block file-preview-new"},[_c('span',{staticClass:"file-preview"},[_c('span',{staticStyle:{"position":"absolute","top":"0","right":"0","bottom":"0","left":"0"}},[_c('VueFileIcon',{attrs:{"name":"system-file-preview-new"}}),_c('span',{staticClass:"help-text"},[_vm._v(_vm._s(_vm.helpTextComputed))])],1)])])]})]:_vm._e()],2)],1),(_vm.readonly !== true)?_c('input',{ref:"fileInput",staticClass:"file-input",attrs:{"title":"","disabled":_vm.disabled === true || (_vm.hasMultiple && !_vm.canAddMore),"type":"file","multiple":_vm.hasMultiple,"accept":_vm.accept || '*',"capture":_vm.capture || undefined},on:{"change":_vm.filesChanged}}):_vm._e(),_vm._t("after-inner")],2),_vm._t("after-outer")],2)
}
var vue_file_agentvue_type_template_id_d0148d4a_staticRenderFns = []


;// CONCATENATED MODULE: ./src/lib/ajax-request.ts
/* inspired by axios */
var AjaxRequest = /** @class */ (function () {
    function AjaxRequest() {
    }
    AjaxRequest.prototype.createError = function (message, code, request, response) {
        var error = new Error(message);
        error.error = true;
        if (code) {
            error.code = code;
        }
        error.request = request;
        error.response = response;
        return error;
    };
    AjaxRequest.prototype.settle = function (resolve, reject, response) {
        var validateStatus = function (status) {
            return status >= 200 && status < 300;
        };
        // Note: status is not exposed by XDomainRequest
        if (!response.status || !validateStatus || validateStatus(response.status)) {
            resolve(response);
        }
        else {
            reject(this.createError('Request failed with status code ' + response.status, null, response.request, response));
        }
    };
    AjaxRequest.prototype.request = function (method, url, formData, configureFn) {
        var _this = this;
        if (formData === void 0) { formData = null; }
        return new Promise(function (resolve, reject) {
            // tslint:disable-next-line
            var request = new XMLHttpRequest();
            var loadEvent = 'onreadystatechange';
            request.open(method, url, true);
            // Listen for ready state
            request[loadEvent] = function () {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                    return;
                }
                // Prepare the response
                var responseHeaders = request.getAllResponseHeaders();
                var responseData = request.responseText;
                var contentType = request.getResponseHeader('Content-Type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    responseData = JSON.parse(responseData);
                }
                else {
                    try {
                        responseData = JSON.parse(responseData);
                    }
                    catch (e) {
                        /* ignore, possibly non json response */
                    }
                }
                var response = {
                    data: responseData,
                    // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
                    status: request.status === 1223 ? 204 : request.status,
                    statusText: request.status === 1223 ? 'No Content' : request.statusText,
                    headers: responseHeaders,
                    request: request,
                };
                _this.settle(resolve, reject, response);
                // Clean up request
                request = null;
            };
            // Handle browser request cancellation (as opposed to a manual cancellation)
            request.onabort = function () {
                if (!request) {
                    return;
                }
                reject(_this.createError('Request aborted', 'ECONNABORTED', request));
                // Clean up request
                request = null;
            };
            // Handle low level network errors
            request.onerror = function () {
                // Real errors are hidden from us by the browser
                // onerror should only fire if it's a network error
                reject(_this.createError('Network Error', null, request));
                // Clean up request
                request = null;
            };
            // Handle timeout
            request.ontimeout = function () {
                reject(_this.createError('timeout exceeded', 'ECONNABORTED', request));
                // Clean up request
                request = null;
            };
            // // Handle progress if needed
            // if (typeof config.onDownloadProgress === 'function') {
            //   request.addEventListener('progress', config.onDownloadProgress);
            // }
            // Not all browsers support upload events
            // if (typeof progressCallback === 'function' && request.upload) {
            //   request.upload.addEventListener('progress', progressCallback);
            // }
            if (typeof configureFn === 'function') {
                configureFn(request);
            }
            request.send(formData);
        });
    };
    AjaxRequest.prototype.post = function (url, formData, configureFn) {
        return this.request('POST', url, formData, configureFn);
    };
    AjaxRequest.prototype.delete = function (url, formData, configureFn) {
        return this.request('DELETE', url, formData, configureFn);
    };
    AjaxRequest.prototype.put = function (url, formData, configureFn) {
        return this.request('PUT', url, formData, configureFn);
    };
    return AjaxRequest;
}());
/* harmony default export */ var ajax_request = (new AjaxRequest());

;// CONCATENATED MODULE: ./src/lib/upload-helper.ts


var UploadHelper = /** @class */ (function () {
    function UploadHelper() {
    }
    // useAxios(axios){
    //   this.axios = axios;
    // }
    UploadHelper.prototype.addHeaders = function (xhr, headers) {
        xhr.setRequestHeader('Accept', 'application/json');
        if (headers) {
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        return xhr;
    };
    UploadHelper.prototype.doUpload = function (url, headers, formData, progressCallback, configureFn) {
        var _this = this;
        return ajax_request.post(url, formData, function (xhr) {
            _this.addHeaders(xhr, headers);
            xhr.upload.addEventListener('progress', progressCallback, false);
            if (typeof configureFn === 'function') {
                configureFn(xhr);
            }
        });
    };
    UploadHelper.prototype.doDeleteUpload = function (url, headers, uploadData, configureFn) {
        var _this = this;
        if (typeof uploadData !== 'string') {
            uploadData = JSON.stringify(uploadData);
        }
        return ajax_request.delete(url, uploadData, function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            _this.addHeaders(xhr, headers);
            if (typeof configureFn === 'function') {
                configureFn(xhr);
            }
        });
    };
    UploadHelper.prototype.doUpdateUpload = function (url, headers, uploadData, configureFn) {
        var _this = this;
        if (typeof uploadData !== 'string') {
            uploadData = JSON.stringify(uploadData);
        }
        return ajax_request.put(url, uploadData, function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            _this.addHeaders(xhr, headers);
            if (typeof configureFn === 'function') {
                configureFn(xhr);
            }
        });
    };
    // doUploadAxios(axios, formData, progressCallback){
    //   return axios.post('/upload', formData, {
    //     onUploadProgress: progressCallback,
    //   });
    // }
    // doDeleteUploadAxios(axios, data, configureFn){
    //   return axios.delete('/upload', data, {
    //   });
    // }
    UploadHelper.prototype.prepareUploadError = function (fileRecord, err, timeout) {
        var errorText = err.message;
        if (err.response && err.response.data) {
            try {
                var errorMsg = err.response.data.error || JSON.parse(err.response.data).error;
                errorText = errorMsg;
            }
            catch (e) {
                // ignore
            }
        }
        if (!fileRecord.error) {
            fileRecord.error = {};
        }
        fileRecord.error.upload = errorText;
        fileRecord.upload.data = undefined;
        fileRecord.upload.error = errorText;
        if (timeout) {
            setTimeout(function () {
                if (!fileRecord.error) {
                    fileRecord.error = {};
                }
                fileRecord.error.upload = false;
                if (!fileRecord.error.size && !fileRecord.error.type) {
                    fileRecord.error = false;
                }
            }, timeout);
        }
    };
    UploadHelper.prototype.upload = function (url, headers, fileRecords, createFormData, progressFn, configureFn) {
        var e_1, _a;
        var _this = this;
        var updateOverallProgress = function () {
            /* no op */
        };
        if (progressFn) {
            updateOverallProgress = function () {
                var e_2, _a;
                var prgTotal = 0;
                try {
                    for (var fileRecords_2 = __values(fileRecords), fileRecords_2_1 = fileRecords_2.next(); !fileRecords_2_1.done; fileRecords_2_1 = fileRecords_2.next()) {
                        var fileRecord = fileRecords_2_1.value;
                        prgTotal += fileRecord.progress();
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (fileRecords_2_1 && !fileRecords_2_1.done && (_a = fileRecords_2.return)) _a.call(fileRecords_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                progressFn(prgTotal / fileRecords.length);
            };
        }
        var promises = [];
        var failedUploadsCount = 0;
        var _loop_1 = function (fileRecord) {
            var formData = void 0;
            if (typeof createFormData === 'function') {
                formData = createFormData(fileRecord);
            }
            else {
                formData = new FormData();
                formData.append('file', fileRecord.file);
                formData.append('filename', fileRecord.name());
            }
            // ((fileRecord) => {
            var promise = this_1.doUpload(url, headers, formData, function (progressEvent) {
                var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                // do not complete until promise resolved
                fileRecord.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
                updateOverallProgress();
            }, function (xhr) {
                fileRecord.xhr = xhr;
                if (typeof configureFn === 'function') {
                    configureFn(xhr);
                }
            });
            promises.push(new Promise(function (resolve, reject) {
                promise.then(function (response) {
                    delete fileRecord.xhr;
                    fileRecord.upload.data = response.data;
                    fileRecord.upload.error = false;
                    fileRecord.progress(100);
                    if (fileRecord.xhrQueue) {
                        fileRecord.xhrQueue();
                        delete fileRecord.xhrQueue;
                    }
                    resolve(response);
                } /* */, function (err) {
                    _this.prepareUploadError(fileRecord, err);
                    resolve(err);
                    failedUploadsCount++;
                } /* */);
            }));
        };
        var this_1 = this;
        try {
            for (var fileRecords_1 = __values(fileRecords), fileRecords_1_1 = fileRecords_1.next(); !fileRecords_1_1.done; fileRecords_1_1 = fileRecords_1.next()) {
                var fileRecord = fileRecords_1_1.value;
                _loop_1(fileRecord);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fileRecords_1_1 && !fileRecords_1_1.done && (_a = fileRecords_1.return)) _a.call(fileRecords_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // return Promise.all(promises);
        return new Promise(function (resolve, reject) {
            Promise.all(promises).then(function (responses) {
                if (failedUploadsCount === promises.length) {
                    // all uploads failed
                    reject(responses);
                    return;
                }
                resolve(responses);
            }, reject);
        });
    };
    UploadHelper.prototype.deleteUpload = function (url, headers, fileRecord, uploadData, configureFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (fileRecord.xhr) {
                fileRecord.xhr.abort();
            }
            if (uploadData === undefined) {
                uploadData = fileRecord.upload.data;
            }
            if (uploadData) {
                _this.doDeleteUpload(url, headers, uploadData, function (xhr) {
                    if (typeof configureFn === 'function') {
                        configureFn(xhr);
                    }
                }).then(function (result) {
                    resolve(result);
                }, function (err) {
                    _this.prepareUploadError(fileRecord, err);
                    reject(err);
                });
            }
        });
    };
    UploadHelper.prototype.updateUpload = function (url, headers, fileRecord, uploadData, configureFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (fileRecord.xhr) {
                // probably updated while being uploaded.
                fileRecord.xhrQueue = function () {
                    _this.updateUpload(url, headers, fileRecord, uploadData);
                };
                return resolve();
            }
            if (uploadData === undefined) {
                uploadData = fileRecord.upload.data || {};
                uploadData.old_filename = fileRecord.oldFileName;
                uploadData.filename = fileRecord.name();
            }
            if (uploadData) {
                _this.doUpdateUpload(url, headers, uploadData, function (xhr) {
                    if (typeof configureFn === 'function') {
                        configureFn(xhr);
                    }
                }).then(function (response) {
                    fileRecord.upload.data = response.data;
                    fileRecord.upload.error = false;
                    resolve(response);
                }, function (err) {
                    _this.prepareUploadError(fileRecord, err);
                    reject(err);
                });
            }
        });
    };
    UploadHelper.prototype.doTusUpload = function (tus, url, fileRecord, headers, progressCallback, tusOptionsFn, uploadWithCredentials) {
        var tusOptions = tusOptionsFn ? tusOptionsFn(fileRecord) : {};
        return new Promise(function (resolve, reject) {
            if (!tus) {
                return reject(new Error('tus required. Please install tus-js-client'));
            }
            // https://github.com/tus/tus-js-client
            // Create a new tus upload
            var file = fileRecord.file;
            var upload = new tus.Upload(file, {
                endpoint: url,
                headers: headers,
                retryDelays: tusOptions.retryDelays ? tusOptions.retryDelays : [0, 3000, 5000, 10000, 20000],
                metadata: tusOptions.metadata
                    ? tusOptions.metadata
                    : {
                        filename: file.name,
                        filetype: file.type,
                    },
                onError: function (error) {
                    reject(error);
                    // console.log("Failed because: " + error)
                },
                onProgress: function (bytesUploaded, bytesTotal) {
                    var event = { loaded: bytesUploaded, total: bytesTotal };
                    progressCallback(event);
                },
                onSuccess: function () {
                    resolve(upload);
                },
                onBeforeRequest: function (req) {
                    var xhr = req.getUnderlyingObject();
                    xhr.withCredentials = uploadWithCredentials === true;
                },
            });
            fileRecord.tusUpload = upload;
            // Start the upload
            upload.start();
        });
    };
    UploadHelper.prototype.tusUpload = function (tus, url, headers, fileRecords, progressFn, tusOptionsFn, uploadWithCredentials) {
        var e_3, _a;
        var _this = this;
        var updateOverallProgress = function () {
            /* no op */
        };
        if (progressFn) {
            updateOverallProgress = function () {
                var e_4, _a;
                var prgTotal = 0;
                try {
                    for (var fileRecords_4 = __values(fileRecords), fileRecords_4_1 = fileRecords_4.next(); !fileRecords_4_1.done; fileRecords_4_1 = fileRecords_4.next()) {
                        var fileRecord = fileRecords_4_1.value;
                        prgTotal += fileRecord.progress();
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (fileRecords_4_1 && !fileRecords_4_1.done && (_a = fileRecords_4.return)) _a.call(fileRecords_4);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                progressFn(prgTotal / fileRecords.length);
            };
        }
        var promises = [];
        var _loop_2 = function (fileRecord) {
            var promise = this_2.doTusUpload(tus, url, fileRecord, headers, function (progressEvent) {
                var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                // do not complete until promise resolved
                fileRecord.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
                updateOverallProgress();
            }, tusOptionsFn, uploadWithCredentials);
            promise.then(function (response) {
                // delete fileRecord.tusUpload;
                fileRecord.progress(100);
            }, function (err) {
                _this.prepareUploadError(fileRecord, err);
            });
            promises.push(promise);
        };
        var this_2 = this;
        try {
            for (var fileRecords_3 = __values(fileRecords), fileRecords_3_1 = fileRecords_3.next(); !fileRecords_3_1.done; fileRecords_3_1 = fileRecords_3.next()) {
                var fileRecord = fileRecords_3_1.value;
                _loop_2(fileRecord);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (fileRecords_3_1 && !fileRecords_3_1.done && (_a = fileRecords_3.return)) _a.call(fileRecords_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return Promise.all(promises);
    };
    UploadHelper.prototype.tusDeleteUpload = function (tus, url, headers, fileRecord) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!tus) {
                return reject('tus required');
            }
            if (!fileRecord.tusUpload) {
                return resolve();
            }
            // const shouldTerminate = true;
            var abort = function (shouldTerminate) {
                return new Promise(function (res, rej) {
                    fileRecord.tusUpload.abort(shouldTerminate, function (err) {
                        if (err) {
                            _this.prepareUploadError(fileRecord, err);
                            rej(err);
                            return;
                        }
                        res();
                    });
                });
            };
            abort(false).then(function () {
                setTimeout(function () {
                    abort(true).then(resolve, reject);
                }, 1000);
            });
        });
    };
    return UploadHelper;
}());
/* harmony default export */ var upload_helper = (new UploadHelper());

;// CONCATENATED MODULE: ./src/lib/plugins.ts
/* harmony default export */ var plugins = ({
    tus: null,
});

;// CONCATENATED MODULE: ./src/components/vue-file-agent-mixin.ts










// tslint:disable-next-line
var dragCounter = 0;
/* harmony default export */ var vue_file_agent_mixin = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    props: [
        'accept',
        'auto',
        'averageColor',
        'capture',
        'compact',
        'deletable',
        'disabled',
        'editable',
        'errorText',
        'helpText',
        'linkable',
        'maxFiles',
        'maxSize',
        'meta',
        'multiple',
        'progress',
        'read',
        'readonly',
        'resumable',
        'sortable',
        'theme',
        'thumbnailSize',
        'uploadConfig',
        'uploadHeaders',
        'uploadUrl',
        'uploadWithCredentials',
        'value',
    ],
    components: {
        VueFileIcon: vue_file_icon,
        VueFilePreview: vue_file_preview,
        VueFileList: vue_file_list,
        VueFileListItem: vue_file_list_item,
    },
    directives: {
        // https://github.com/Jexordexan/vue-slicksort/blob/master/src/HandleDirective.js
        vfaSortableHandle: {
            bind: function (el) {
                el.sortableHandle = true;
            },
        },
    },
    data: function () {
        return {
            fileRecords: [],
            rawFileRecords: [],
            isDragging: false,
            isSorting: false,
            isSortingActive: false,
            transitionDuration: 300,
            overallProgress: 0,
            uniqueId: '',
            sortTimeout: 0,
        };
    },
    computed: {
        withCredentials: function () {
            return this.uploadWithCredentials;
        },
        canAddMore: function () {
            if (!this.hasMultiple) {
                return this.fileRecords.length === 0;
            }
            if (!this.maxFiles) {
                return true;
            }
            return this.fileRecords.length < this.maxFiles;
        },
        helpTextComputed: function () {
            if (this.helpText) {
                return this.helpText;
            }
            return 'Choose ' + (this.hasMultiple ? 'files' : 'file') + ' or drag & drop here';
        },
        isDeletable: function () {
            if (typeof this.deletable === 'string') {
                return this.deletable !== 'false';
            }
            return !!this.deletable;
        },
        isSortable: function () {
            return !!this.sortable;
        },
        hasMultiple: function () {
            if (typeof this.multiple === 'string') {
                return this.multiple !== 'false';
            }
            if (this.multiple === undefined) {
                return Array.isArray(this.value);
            }
            return !!this.multiple;
        },
        shouldRead: function () {
            if (typeof this.read === 'string') {
                return this.read === 'true';
            }
            return !!this.read;
        },
    },
    methods: {
        createThumbnail: function (fileRecord, video) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var canvas = document.createElement('canvas');
                utils
                    .createVideoThumbnail(video, canvas, fileRecord.thumbnailSize, _this.averageColor !== false)
                    .then(function (thumbnail) {
                    fileRecord.imageColor = thumbnail.color;
                    fileRecord.videoThumbnail = thumbnail.url;
                    fileRecord.dimensions.width = thumbnail.width;
                    fileRecord.dimensions.height = thumbnail.height;
                    resolve();
                }, reject);
            });
        },
        initVideo: function (fileRecord) {
            if (!fileRecord.isPlayableVideo()) {
                return;
            }
            var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
            var revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
            var video = document.createElement('video');
            video.src = createObjectURL(fileRecord.file);
            this.createThumbnail(fileRecord, video).then(function () {
                revokeObjectURL(video.src);
            });
            video.load();
        },
        getFileRecordOrRawInstance: function (fileRecordOrRaw, raw) {
            var i;
            if (fileRecordOrRaw instanceof file_record) {
                i = this.fileRecords.indexOf(fileRecordOrRaw);
            }
            else {
                i = this.rawFileRecords.indexOf(fileRecordOrRaw);
            }
            if (i === -1) {
                return fileRecordOrRaw;
            }
            return raw ? this.rawFileRecords[i] : this.fileRecords[i];
        },
        getFileRecordRawInstance: function (fileRecordOrRaw) {
            return this.getFileRecordOrRawInstance(fileRecordOrRaw, true);
        },
        getFileRecordInstance: function (fileRecordOrRaw) {
            return this.getFileRecordOrRawInstance(fileRecordOrRaw, false);
        },
        prepareConfigureFn: function (configureXhr) {
            var withCredentials = this.uploadWithCredentials;
            if (withCredentials !== true && withCredentials !== false) {
                return configureXhr;
            }
            return function (request) {
                request.withCredentials = withCredentials;
                if (typeof configureXhr === 'function') {
                    configureXhr(request);
                }
            };
        },
        upload: function (url, headers, fileRecordsOrRaw, createFormData, configureXhr) {
            var e_1, _a;
            var _this = this;
            var validFileRecords = [];
            var validFilesRawData = [];
            try {
                for (var fileRecordsOrRaw_1 = __values(fileRecordsOrRaw), fileRecordsOrRaw_1_1 = fileRecordsOrRaw_1.next(); !fileRecordsOrRaw_1_1.done; fileRecordsOrRaw_1_1 = fileRecordsOrRaw_1.next()) {
                    var fileRecordOrRaw = fileRecordsOrRaw_1_1.value;
                    var fileRecord = this.getFileRecordInstance(fileRecordOrRaw);
                    if (!fileRecord.error) {
                        validFileRecords.push(fileRecord);
                        validFilesRawData.push(this.getFileRecordRawInstance(fileRecord));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fileRecordsOrRaw_1_1 && !fileRecordsOrRaw_1_1.done && (_a = fileRecordsOrRaw_1.return)) _a.call(fileRecordsOrRaw_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (this.resumable) {
                return upload_helper.tusUpload(plugins.tus, url, headers, validFileRecords, function (overallProgress) {
                    _this.overallProgress = overallProgress;
                }, this.resumable === true ? undefined : this.resumable, this.uploadWithCredentials);
            }
            return new Promise(function (resolve, reject) {
                upload_helper
                    .upload(url, headers, validFileRecords, createFormData, function (overallProgress) {
                    _this.overallProgress = overallProgress;
                }, _this.prepareConfigureFn(configureXhr))
                    .then(function (res) {
                    for (var i = 0; i < res.length; i++) {
                        res[i].fileRecord = validFilesRawData[i];
                    }
                    _this.$emit('upload', res);
                    resolve(res);
                }, function (err) {
                    for (var i = 0; i < err.length; i++) {
                        err[i].fileRecord = validFilesRawData[i];
                    }
                    _this.$emit('upload:error', err);
                    reject(err);
                });
            });
        },
        deleteUpload: function (url, headers, fileRecordOrRaw, uploadData, configureXhr) {
            var _this = this;
            if (this.fileRecords.length < 1) {
                this.overallProgress = 0;
            }
            var fileRecord = this.getFileRecordInstance(fileRecordOrRaw);
            var rawFileRecord = this.getFileRecordRawInstance(fileRecordOrRaw);
            if (this.resumable) {
                return upload_helper.tusDeleteUpload(plugins.tus, url, headers, fileRecord);
            }
            return new Promise(function (resolve, reject) {
                upload_helper
                    .deleteUpload(url, headers, fileRecord, uploadData, _this.prepareConfigureFn(configureXhr))
                    .then(function (res) {
                    res.fileRecord = rawFileRecord;
                    _this.$emit('upload:delete', res);
                    resolve(res);
                }, function (err) {
                    err.fileRecord = rawFileRecord;
                    _this.$emit('upload:delete:error', err);
                    reject(err);
                });
            });
        },
        updateUpload: function (url, headers, fileRecord, uploadData, configureXhr) {
            var _this = this;
            fileRecord = this.getFileRecordInstance(fileRecord);
            var rawFileRecord = this.getFileRecordRawInstance(fileRecord);
            return new Promise(function (resolve, reject) {
                upload_helper
                    .updateUpload(url, headers, fileRecord, uploadData, _this.prepareConfigureFn(configureXhr))
                    .then(function (res) {
                    res.fileRecords = rawFileRecord;
                    _this.$emit('upload:update', res);
                    resolve(res);
                }, function (err) {
                    err.fileRecords = rawFileRecord;
                    _this.$emit('upload:update:error', err);
                    reject(err);
                });
            });
        },
        autoUpload: function (fileRecords) {
            if (!this.uploadUrl || this.auto === false) {
                return Promise.resolve(false);
            }
            return this.upload(this.uploadUrl, this.uploadHeaders, fileRecords, this.uploadConfig);
        },
        autoDeleteUpload: function (fileRecord) {
            if (!this.uploadUrl || this.auto === false) {
                return Promise.resolve(false);
            }
            return this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord, this.uploadConfig);
        },
        autoUpdateUpload: function (fileRecord) {
            if (!this.uploadUrl || this.auto === false) {
                return Promise.resolve(false);
            }
            return this.updateUpload(this.uploadUrl, this.uploadHeaders, fileRecord, this.uploadConfig);
        },
        equalFiles: function (file1, file2) {
            return ( true &&
                file1.name === file2.name &&
                file1.size === file2.size &&
                file1.type === file2.type &&
                // file1.lastModifiedDate.getTime() === file2.lastModifiedDate.getTime() &&
                file1.lastModified === file2.lastModified);
        },
        isFileAddedAlready: function (file) {
            var e_2, _a;
            try {
                for (var _b = __values(this.fileRecords), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fileRecord = _c.value;
                    if (this.equalFiles(file, fileRecord.file)) {
                        return true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        },
        handleFiles: function (files) {
            var e_3, _a, e_4, _b, _c;
            var _this = this;
            if (this.disabled === true || this.readonly === true) {
                return;
            }
            if (this.hasMultiple && !this.canAddMore) {
                return;
            }
            var fileRecords = [];
            var filesFiltered = [];
            // tslint:disable-next-line
            for (var i = 0; i < files.length; i++) {
                if (this.hasMultiple && this.isFileAddedAlready(files[i])) {
                    continue;
                }
                filesFiltered.push(files[i]);
            }
            files = filesFiltered;
            if (this.hasMultiple && this.maxFiles && files.length > this.maxFiles - this.fileRecords.length) {
                files = files.slice(0, this.maxFiles - this.fileRecords.length);
            }
            try {
                for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    fileRecords.push(new file_record({
                        file: file,
                    }, {
                        read: this.shouldRead,
                        maxSize: this.maxSize,
                        accept: this.accept,
                        thumbnailSize: this.thumbnailSize,
                        averageColor: this.averageColor,
                        withCredentials: this.withCredentials,
                    }));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var fileRecords_1 = __values(fileRecords), fileRecords_1_1 = fileRecords_1.next(); !fileRecords_1_1.done; fileRecords_1_1 = fileRecords_1.next()) {
                    var fileRecord = fileRecords_1_1.value;
                    if (fileRecord.file.size <= 20 * 1024 * 1024) {
                        // <= 20MB
                        this.initVideo(fileRecord);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (fileRecords_1_1 && !fileRecords_1_1.done && (_b = fileRecords_1.return)) _b.call(fileRecords_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (this.hasMultiple) {
                // splice: for list transitions to work properly
                (_c = this.fileRecords).splice.apply(_c, __spreadArray([this.fileRecords.length, 0], __read(fileRecords), false));
            }
            else {
                this.fileRecords = fileRecords;
            }
            file_record.readFiles(fileRecords).then(function (fileRecordsNew) {
                var allFileRecordsRaw = file_record.toRawArray(_this.fileRecords);
                _this.rawFileRecords = allFileRecordsRaw;
                _this.$emit('input', Array.isArray(_this.value) ? allFileRecordsRaw : allFileRecordsRaw[0]);
                _this.$emit('select', file_record.toRawArray(fileRecordsNew));
            });
            this.autoUpload(fileRecords);
        },
        filesChanged: function (event) {
            var files = event.target.files;
            this.$emit('change', event);
            if (!files[0]) {
                return;
            }
            if (!this.hasMultiple) {
                files = [files[0]];
            }
            this.handleFiles(files);
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = null; // do not use ''
                // because chrome won't fire change event for same file
            }
        },
        drop: function (event) {
            var _this = this;
            event.stopPropagation();
            event.preventDefault();
            dragCounter = 0;
            this.isDragging = false;
            if (this.disabled === true || this.readonly === true) {
                return;
            }
            if (!event.dataTransfer) {
                return;
            }
            utils.getFilesFromDroppedItems(event.dataTransfer).then(function (files) {
                _this.$emit('drop', event);
                if (!files || !files[0]) {
                    return;
                }
                if (!_this.hasMultiple) {
                    files = [files[0]];
                }
                _this.handleFiles(files);
            });
        },
        dragEnter: function (event) {
            if (!event.dataTransfer) {
                return;
            }
            this.isDragging = true;
            event.stopPropagation();
            event.preventDefault();
            dragCounter++;
            event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        },
        dragOver: function (event) {
            if (!event.dataTransfer) {
                return;
            }
            this.isDragging = true;
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        },
        dragLeave: function (event) {
            if (!event.dataTransfer) {
                return;
            }
            dragCounter--;
            if (dragCounter === 0) {
                this.isDragging = false;
            }
        },
        removeFileRecord: function (fileRecordOrRaw) {
            var rawFileRecord = this.getFileRecordRawInstance(fileRecordOrRaw);
            this.$emit('beforedelete', rawFileRecord);
            if (!this.uploadUrl || this.auto === false) {
                return;
            }
            this.deleteFileRecord(fileRecordOrRaw);
        },
        deleteFileRecord: function (fileRecordOrRaw) {
            var _this = this;
            var i;
            if (fileRecordOrRaw instanceof file_record) {
                i = this.fileRecords.indexOf(fileRecordOrRaw);
            }
            else {
                i = this.rawFileRecords.indexOf(fileRecordOrRaw);
            }
            var fileRecord = this.fileRecords[i];
            var rawFileRecord = this.rawFileRecords[i];
            this.$emit('input', this.rawFileRecords);
            this.$emit('delete', rawFileRecord);
            fileRecord = this.fileRecords.splice(i, 1)[0];
            rawFileRecord = this.rawFileRecords.splice(i, 1)[0];
            this.autoDeleteUpload(fileRecord).then(function (res) {
                /* no op */
            }, function (err) {
                _this.fileRecords.splice(i, 0, fileRecord);
                _this.rawFileRecords.splice(i, 0, rawFileRecord);
            });
        },
        filenameChanged: function (fileRecord) {
            this.$emit('rename', file_record.toRawArray([fileRecord])[0]);
            this.autoUpdateUpload(fileRecord).then(function (res) {
                /* no op */
            }, function (err) {
                fileRecord.customName = fileRecord.oldCustomName;
            });
        },
        checkValue: function () {
            var _this = this;
            var rawFileRecords = this.value || [];
            rawFileRecords = Array.isArray(rawFileRecords) ? rawFileRecords : [rawFileRecords];
            var fdPromises = [];
            var rawFileRecordsNew = [];
            for (var i = 0; i < rawFileRecords.length; i++) {
                var existingIndex = this.rawFileRecords.indexOf(rawFileRecords[i]);
                if (existingIndex !== -1) {
                    fdPromises.push(Promise.resolve(this.fileRecords[existingIndex]));
                    rawFileRecordsNew[i] = this.rawFileRecords[existingIndex];
                }
                else {
                    fdPromises.push(file_record.fromRaw(rawFileRecords[i], {
                        read: this.shouldRead,
                        maxSize: this.maxSize,
                        accept: this.accept,
                        thumbnailSize: this.thumbnailSize,
                        averageColor: this.averageColor,
                        withCredentials: this.withCredentials,
                    }));
                    rawFileRecordsNew.push(rawFileRecords[i]);
                }
            }
            this.rawFileRecords = rawFileRecordsNew;
            Promise.all(fdPromises).then(function (fileRecords) {
                _this.fileRecords = fileRecords;
            });
        },
        sortStart: function () {
            if (this.sortTimeout) {
                clearTimeout(this.sortTimeout);
            }
            this.isSorting = true;
            this.isSortingActive = true;
        },
        sortEnd: function (sortData) {
            var _this = this;
            this.isSortingActive = false;
            if (this.sortTimeout) {
                clearTimeout(this.sortTimeout);
            }
            this.sortTimeout = setTimeout(function () {
                _this.isSorting = false;
            }, this.transitionDuration + 100);
            if (sortData.oldIndex !== sortData.newIndex) {
                this.rawFileRecords = utils.arrayMove(this.rawFileRecords, sortData.oldIndex, sortData.newIndex);
                this.$nextTick(function () {
                    _this.$emit('input', _this.rawFileRecords);
                    _this.$emit('sort', {
                        oldIndex: sortData.oldIndex,
                        newIndex: sortData.newIndex,
                    });
                });
            }
        },
    },
    created: function () {
        this.uniqueId = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
        this.checkValue();
    },
    watch: {
        value: function () {
            this.checkValue();
        },
    },
}));

;// CONCATENATED MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-agent.vue?vue&type=script&lang=ts


/* harmony default export */ var vue_file_agentvue_type_script_lang_ts = (external_commonjs_vue_commonjs2_vue_root_Vue_default().extend({
    mixins: [vue_file_agent_mixin],
}));

;// CONCATENATED MODULE: ./src/components/vue-file-agent.vue?vue&type=script&lang=ts
 /* harmony default export */ var components_vue_file_agentvue_type_script_lang_ts = (vue_file_agentvue_type_script_lang_ts); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/vue-file-agent.vue?vue&type=style&index=0&id=d0148d4a&prod&lang=scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/vue-file-agent.vue?vue&type=style&index=0&id=d0148d4a&prod&lang=scss

;// CONCATENATED MODULE: ./src/components/vue-file-agent.vue



;


/* normalize component */

var vue_file_agent_component = normalizeComponent(
  components_vue_file_agentvue_type_script_lang_ts,
  vue_file_agentvue_type_template_id_d0148d4a_render,
  vue_file_agentvue_type_template_id_d0148d4a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_agent = (vue_file_agent_component.exports);
;// CONCATENATED MODULE: ./src/index.ts










var VueFileAgentPlugin = /** @class */ (function () {
    function VueFileAgentPlugin() {
        this.VueFileIcon = vue_file_icon;
        this.VueFilePreview = vue_file_preview;
        this.VueFileAgent = vue_file_agent;
        this.component = vue_file_agent;
        this.mixin = vue_file_agent_mixin;
        this.plugins = plugins;
        this.VueFileAgentMixin = vue_file_agent_mixin;
        this.VueFilePreviewMixin = vue_file_preview_mixin;
        this.install = function (Vue, options) {
            Vue.component('VueFileIcon', vue_file_icon);
            Vue.component('VueFilePreview', vue_file_preview);
            Vue.component('VueFileList', vue_file_list);
            Vue.component('VueFileListItem', vue_file_list_item);
            Vue.component('VueFileAgent', vue_file_agent);
            Vue.prototype.$vueFileAgent = {
                mixin: vue_file_agent_mixin,
            };
        };
    }
    return VueFileAgentPlugin;
}());

var vfaPlugin = new VueFileAgentPlugin();
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    vfaPlugin.install(window.Vue, {});
    window.VueFileAgent = vfaPlugin;
}
var mixin = vue_file_agent_mixin;


var FileData = file_record; // for backward compatibility
/* harmony default export */ var src_0 = (vfaPlugin);

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_0);


}();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=vue-file-agent.common.js.map