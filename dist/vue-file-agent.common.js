module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "6816":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_file_agent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eb77");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_file_agent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_file_agent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_file_agent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "eb77":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"31dfa902-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-icon.vue?vue&type=template&id=61d49b70&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"viewBox":_vm.viewBoxComputed}},[_vm._l((_vm.icon.paths),function(d,index){return [(d)?_c('path',{key:index,attrs:{"d":d}}):_vm._e()]})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-file-icon.vue?vue&type=template&id=61d49b70&

// CONCATENATED MODULE: ./src/lib/extensions.ts
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

// CONCATENATED MODULE: ./src/lib/icons.ts

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
/* harmony default export */ var lib_icons = (icons);
var extensionsMap = {};
for (var cat in extensions) {
    if (extensions.hasOwnProperty(cat)) {
        for (var icons_i = 0, icons_a = extensions[cat]; icons_i < icons_a.length; icons_i++) {
            var icons_ext = icons_a[icons_i];
            extensionsMap[icons_ext] = cat;
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

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--12-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-icon.vue?vue&type=script&lang=ts&


/* harmony default export */ var vue_file_iconvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
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

// CONCATENATED MODULE: ./src/components/vue-file-icon.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_vue_file_iconvue_type_script_lang_ts_ = (vue_file_iconvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

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
  if (moduleIdentifier) { // server build
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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/vue-file-icon.vue





/* normalize component */

var component = normalizeComponent(
  components_vue_file_iconvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_icon = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"31dfa902-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-preview.vue?vue&type=template&id=1f00ad11&
var vue_file_previewvue_type_template_id_1f00ad11_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'file-preview-wrapper-' + _vm.fileData.ext(),
    _vm.fileData.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other',
    'file-category-' + _vm.fileData.icon().category,
    { 'file-is-playing-av': _vm.fileData.isPlayingAv },
    { 'is-deletable': _vm.deletable === true },
    { 'is-editable': _vm.editable === true },
    { 'is-edit-input-focused': _vm.isEditInputFocused },
    { 'has-error': _vm.fileData.error } ]},[(_vm.fileData.error)?_c('div',{staticClass:"file-error-wrapper",on:{"click":function($event){return _vm.dismissError()}}},[_c('div',{staticClass:"file-error-message file-error-message-client"},[_vm._v(" "+_vm._s(_vm.fileData.getErrorMessage(_vm.errorText))+" ")])]):_vm._e(),(_vm.fileData.isPlayableAudio() || _vm.fileData.isPlayableVideo())?_c('div',{ref:"wrapper",staticClass:"file-av-wrapper"},[_c('div',{staticClass:"file-av-action",on:{"click":function($event){return _vm.playAv(_vm.fileData)}}},[_c('span',{staticClass:"file-av-stop"},[_c('VueFileIcon',{attrs:{"name":"system-close"}})],1),_c('span',{staticClass:"file-av-play"},[_c('VueFileIcon',{attrs:{"name":"system-file-av-play"}})],1)])]):_vm._e(),_c('span',{staticClass:"file-preview",class:{
      'image-preview': _vm.fileData.isImage(),
      'other-preview': !_vm.fileData.isImage(),
      'dark-content': _vm.fileData.isImage() && _vm.fileData.isDarkColor(),
    },style:({
      'background-color': _vm.fileData.color(),
    })},[_c('span',{staticClass:"file-preview-overlay"}),(_vm.fileData.isImage() || _vm.fileData.isPlayableVideo())?_c('span',{staticClass:"thumbnail",staticStyle:{"position":"absolute","top":"0","right":"0","bottom":"0","left":"0","overflow":"hidden"}},[(_vm.hasLinkableUrl)?_c('a',{attrs:{"href":_vm.fileData.url,"target":"_blank","title":_vm.fileData.name()}},[_c('img',{staticClass:"file-preview-img",attrs:{"src":_vm.fileData.src()}})]):_c('img',{staticClass:"file-preview-img",attrs:{"src":_vm.fileData.src()}})]):_vm._e(),_c('span',{staticClass:"file-ext"},[_vm._v(_vm._s(_vm.fileData.ext()))]),_c('span',{staticClass:"file-size"},[_vm._v(_vm._s(_vm.fileData.size()))]),(_vm.deletable)?_c('span',{staticClass:"file-delete",on:{"click":function($event){return _vm.removeFileData(_vm.fileData)},"touchstart":function($event){return _vm.filenameClearPressed()},"mousedown":function($event){return _vm.filenameClearPressed()}}},[_c('VueFileIcon',{attrs:{"name":"system-close"}})],1):_vm._e(),_c('span',{staticClass:"file-name",on:{"click":function($event){return _vm.editFileName()}}},[(_vm.editable === true)?_c('input',{ref:"input",staticClass:"file-name-input",attrs:{"disabled":_vm.disabled === true,"type":"text"},domProps:{"value":_vm.fileData.name(true)},on:{"focus":function($event){return _vm.editInputFocused()},"blur":function($event){return _vm.editInputBlured()},"change":function($event){return _vm.filenameChanged()},"input":function($event){return _vm.filenameChanged()},"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.filenameChanged(true)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.filenameChanged(false)}]}}):_vm._e(),(_vm.editable === true)?_c('span',{staticClass:"file-name-edit-icon"},[_c('VueFileIcon',{attrs:{"name":"system-file-name-edit"}})],1):_vm._e(),_c('span',{staticClass:"file-name-text"},[_vm._v(_vm._s(_vm.fileData.name(true)))])]),(_vm.fileData.dimensions.width && _vm.fileData.dimensions.height)?_c('span',{staticClass:"image-dimension"},[_c('span',{staticClass:"image-dimension-width"},[_vm._v(_vm._s(_vm.fileData.dimensions.width))]),_c('span',{staticClass:"image-dimension-height"},[_vm._v(_vm._s(_vm.fileData.dimensions.height))])]):_vm._e(),(_vm.fileData.hasProgress())?_c('span',{staticClass:"file-progress",class:{
        'file-progress-full': _vm.fileData.progress() >= 99.9999,
        'file-progress-done': _vm.fileData.progress() >= 100,
        'has-file-progress': _vm.fileData.progress() > 0,
      }},[_c('span',{staticClass:"file-progress-bar",style:({ width: _vm.fileData.progress() + '%' })})]):_vm._e(),_c('span',{staticClass:"file-icon"},[(_vm.hasLinkableUrl)?_c('a',{attrs:{"href":_vm.fileData.url,"target":"_blank","title":_vm.fileData.name()}},[_c('VueFileIcon',{attrs:{"ext":_vm.fileData.ext()}})],1):_c('VueFileIcon',{attrs:{"ext":_vm.fileData.ext()}})],1)])])}
var vue_file_previewvue_type_template_id_1f00ad11_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-file-preview.vue?vue&type=template&id=1f00ad11&

// CONCATENATED MODULE: ./src/lib/drop-handler.ts
function getFilesFromDroppedItems(dataTransfer) {
    return new Promise(function (resolve) {
        if (!includesFolder(dataTransfer.files)) {
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
            resolve(files.concat.apply(files, filesInFolders));
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
                            files_1.push.apply(files_1, entryFiles);
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
function includesFolder(files) {
    if (!files.length) {
        return true; // if dropping only folders, no files will exist
    }
    // tslint:disable-next-line
    for (var i = 0; i < files.length; i++) {
        // A folder has no type and has a size that is a multiple of 4096
        if (!files[i].type && files[i].size % 4096 === 0) {
            return true;
        }
    }
    return false;
}

// CONCATENATED MODULE: ./src/lib/utils.ts

var ImageOrientation;
(function (ImageOrientation) {
    ImageOrientation[ImageOrientation["NORMAL"] = 1] = "NORMAL";
    ImageOrientation[ImageOrientation["UPSIDE_DOWN"] = 6] = "UPSIDE_DOWN";
})(ImageOrientation || (ImageOrientation = {}));
var utils_Utils = /** @class */ (function () {
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
    Utils.prototype.createVideoThumbnail = function (video, canvas, thumbnailSize) {
        var _this = this;
        video.setAttribute('crossOrigin', 'anonymous'); // fix cross origin issue
        return new Promise(function (resolve, reject) {
            var loadedmetadata = false;
            var loadeddata = false;
            var tryGetThumbnail = function () {
                if (!(loadedmetadata && loadeddata)) {
                    return;
                }
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                var url = canvas.toDataURL();
                resolve({
                    url: url,
                    color: _this.getAverageColor(imageData.data),
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
    Utils.prototype.getImageResized = function (image, widthLimit, heightLimit, orientation) {
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
            var imageData = context.getImageData(0, 0, width, height);
            var rgba = this.getAverageColor(imageData.data);
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
    Utils.prototype.resizeImageUrl = function (image, url, thumbnailSize) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            image.onload = function () {
                var resized = _this.getImageResized(image, thumbnailSize);
                resolve(resized);
            };
            image.src = url;
        });
    };
    Utils.prototype.resizeImageFile = function (image, file, thumbnailSize) {
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
                    var resized = _this.getImageResized(image, thumbnailSize, undefined, orientation);
                    if (shouldRevoke) {
                        revokeObjectURL(image.src);
                    }
                    resolve(resized);
                });
            };
            if (!(file instanceof File)) {
                return reject('Invalid file object. Use url or a valid instance of File class');
            }
            if (createObjectURL && revokeObjectURL) {
                shouldRevoke = true;
                image.src = createObjectURL(file);
                return;
            }
            _this.getDataURL(file).then(function (dataUrl) {
                image.src = dataUrl;
            });
        });
    };
    Utils.prototype.resizeImage = function (thumbnailSize, file, url) {
        var image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        return url
            ? this.resizeImageUrl(image, url, thumbnailSize)
            : this.resizeImageFile(image, file, thumbnailSize);
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
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
        // https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js#L2511
        if (!accept) {
            return true;
        } // If there are no accepted mime types, it's OK
        var acceptedFiles = accept.split(',');
        var mimeType = file.type;
        var baseMimeType = mimeType.replace(/\/.*$/, '');
        for (var _i = 0, acceptedFiles_1 = acceptedFiles; _i < acceptedFiles_1.length; _i++) {
            var validType = acceptedFiles_1[_i];
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
/* harmony default export */ var utils = (new utils_Utils());

// CONCATENATED MODULE: ./src/lib/file-data.ts


var file_data_FileData = /** @class */ (function () {
    function FileData(data, options) {
        this.url = null;
        this.urlResized = null;
        this.image = {};
        this.isPlayingAv = false;
        this.oldFileName = null;
        this.oldCustomName = null;
        this.upload = { data: null, error: false };
        this.url = null;
        this.urlResized = null;
        this.lastKnownSrc = null;
        this.image = {};
        this.isPlayingAv = false;
        this.oldFileName = null;
        this.oldCustomName = null;
        this.raw = data;
        this.file = data.file instanceof File ? data.file : this.createDummyFile(data);
        this.progressInternal = !isNaN(data.progress) ? data.progress : 0;
        // this.width = FileData.defaultWidth;
        // this.height = FileData.defaultHeight;
        this.thumbnailSize = options.thumbnailSize || 360;
        this.read = !!options.read;
        this.dimensions = data.dimensions || {};
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
        this.validate();
    }
    FileData.getFromRaw = function (fileDataRaw, options, isSync) {
        if (isSync === void 0) { isSync = false; }
        var fileData = new FileData(fileDataRaw, options);
        var promise = fileData.setUrl(fileDataRaw.url);
        fileDataRaw.progress = fileData.progress.bind(fileData); // convert it as a function
        fileDataRaw.src = fileData.src.bind(fileData);
        fileDataRaw.name = fileData.name.bind(fileData); // convert it as a function
        if (isSync) {
            return fileData;
        }
        return promise;
    };
    FileData.fromRaw = function (fileDataRaw, options) {
        return FileData.getFromRaw(fileDataRaw, options, false);
    };
    FileData.fromRawSync = function (fileDataRaw, options) {
        return FileData.getFromRaw(fileDataRaw, options, true);
    };
    FileData.fromRawArray = function (filesDataRaw, options) {
        var promises = [];
        for (var _i = 0, filesDataRaw_1 = filesDataRaw; _i < filesDataRaw_1.length; _i++) {
            var fileDataRaw = filesDataRaw_1[_i];
            promises.push(FileData.fromRaw(fileDataRaw, options));
        }
        return Promise.all(promises);
    };
    FileData.toRawArray = function (filesData) {
        var filesDataRaw = [];
        for (var _i = 0, filesData_1 = filesData; _i < filesData_1.length; _i++) {
            var fileData = filesData_1[_i];
            filesDataRaw.push(fileData.toRaw());
        }
        return filesDataRaw;
    };
    FileData.readFile = function (fileData) {
        return new Promise(function (resolve, reject) {
            if (!fileData.read) {
                fileData.setUrl(null);
                resolve(fileData);
                return;
            }
            utils.getDataURL(fileData.file).then(function (dataUrl) {
                fileData.setUrl(dataUrl).then(function () {
                    resolve(fileData);
                }, reject);
            }, reject);
        });
    };
    FileData.readFiles = function (filesData) {
        var promises = [];
        for (var _i = 0, filesData_2 = filesData; _i < filesData_2.length; _i++) {
            var fileData = filesData_2[_i];
            promises.push(FileData.readFile(fileData));
        }
        return Promise.all(promises);
    };
    // populate(data, options = {}) {}
    FileData.prototype.createDummyFile = function (data) {
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
    FileData.prototype.hasProgress = function () {
        return !isNaN(this.progressInternal); // && this._progress <= 100;
    };
    FileData.prototype.progress = function (value) {
        if (value !== undefined) {
            this.progressInternal = value;
            return;
        }
        return this.progressInternal || 0;
    };
    FileData.prototype.src = function () {
        if (this.isImage()) {
            return this.urlResized || this.url || this.file.url;
        }
        if (this.isPlayableVideo()) {
            return this.videoThumbnail || '';
        }
        return '';
    };
    FileData.prototype.size = function () {
        if (!this.file) {
            return '';
        }
        return utils.getSizeFormatted(this.file.size);
    };
    FileData.prototype.ext = function () {
        if (this.file && this.file.name.indexOf('.') !== -1) {
            return this.file.name.split('.').pop();
        }
        return '?';
        // return this.file.type.split('/').shift();
    };
    FileData.prototype.name = function (withoutExt) {
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
    FileData.prototype.isDarkColor = function () {
        if (this.imageColor) {
            var rgb = this.imageColor;
            var darkPoint = 20;
            return rgb[0] <= darkPoint && rgb[1] <= darkPoint && rgb[2] <= darkPoint;
        }
        return false;
    };
    FileData.prototype.color = function () {
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
    FileData.prototype.isImage = function () {
        return this.file && this.file.type.indexOf('image') !== -1;
    };
    FileData.prototype.isVideo = function () {
        return this.file && this.file.type.indexOf('video') !== -1;
    };
    FileData.prototype.isPlayableVideo = function () {
        return this.icon().category === 'video-playable';
    };
    FileData.prototype.isAudio = function () {
        return this.file && this.file.type.indexOf('audio') !== -1;
    };
    FileData.prototype.isPlayableAudio = function () {
        return this.icon().category === 'audio-playable';
    };
    FileData.prototype.isText = function () {
        return this.file && this.file.type.indexOf('text') !== -1;
    };
    FileData.prototype.setUrl = function (url) {
        var _this = this;
        this.url = url;
        return new Promise(function (resolve, reject) {
            if (_this.isImage()) {
                _this.resizeImage().then(function () {
                    resolve(_this);
                }, reject);
                return;
            }
            resolve(_this);
        });
    };
    FileData.prototype.imageResized = function (resized) {
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
    FileData.prototype.resizeImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            utils
                .resizeImage(_this.thumbnailSize, _this.file, _this.url)
                .then(function (resized) {
                _this.imageResized(resized);
                resolve(_this);
            })
                .catch(reject);
        });
    };
    FileData.prototype.icon = function () {
        var ext = this.ext();
        var svgIcon = getIconFromExt(ext);
        return svgIcon;
    };
    FileData.prototype.getErrorMessage = function (errorText) {
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
    FileData.prototype.toRaw = function () {
        var _this = this;
        var raw = this.raw || {};
        raw.url = this.url;
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
    FileData.prototype.validate = function () {
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
    return FileData;
}());
/* harmony default export */ var file_data = (file_data_FileData);

// CONCATENATED MODULE: ./src/components/vue-file-preview-mixin.ts




/* harmony default export */ var vue_file_preview_mixin = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    props: ['value', 'deletable', 'editable', 'linkable', 'errorText', 'disabled', 'thumbnailSize'],
    components: {
        VueFileIcon: vue_file_icon,
    },
    data: function () {
        return {
            isEditInputFocused: false,
            isEditCancelable: true,
            fileData: {},
        };
    },
    computed: {
        hasLinkableUrl: function () {
            if (!this.linkable) {
                return false;
            }
            return !!this.fileData.url && !this.fileData.isPlayableVideo() && !this.fileData.isPlayableAudio();
        },
    },
    methods: {
        updateFileData: function () {
            var _this = this;
            if (this.value instanceof file_data) {
                this.fileData = this.value;
                return;
            }
            file_data.fromRaw(this.value, {
                thumbnailSize: this.thumbnailSize,
            }).then(function (fileData) {
                _this.fileData = fileData;
            });
            this.fileData = file_data.fromRawSync(this.value, {
                thumbnailSize: this.thumbnailSize,
            });
        },
        createThumbnail: function (fileData, video) {
            if (fileData.videoThumbnail) {
                video.poster = fileData.src();
                return;
            }
            var canvas = document.createElement('canvas');
            utils.createVideoThumbnail(video, canvas, this.fileData.thumbnailSize).then(function (thumbnail) {
                fileData.imageColor = thumbnail.color;
                fileData.videoThumbnail = thumbnail.url;
                fileData.dimensions.width = thumbnail.width;
                fileData.dimensions.height = thumbnail.height;
                video.poster = fileData.src();
            });
        },
        playAv: function (fileData) {
            if (fileData.stopAv) {
                fileData.stopAv();
                return;
            }
            var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
            var revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
            var wrapper = this.$refs.wrapper;
            var player = document.createElement(fileData.isAudio() ? 'audio' : 'video');
            if (player instanceof HTMLVideoElement && fileData.isPlayableVideo()) {
                this.createThumbnail(fileData, player);
            }
            player.controls = true;
            // player.style.width = this.prvWidth + 'px';
            wrapper.appendChild(player);
            var url = fileData.url || createObjectURL(fileData.file);
            player.src = url;
            player.play();
            fileData.isPlayingAv = true;
            fileData.stopAv = function () {
                // player.src = null;
                player.src = '';
                wrapper.removeChild(player);
                revokeObjectURL(url);
                fileData.isPlayingAv = false;
                fileData.stopAv = null;
            };
        },
        removeFileData: function (fileData) {
            if (this.clearFilename()) {
                return;
            }
            if (this.disabled === true) {
                return;
            }
            this.$emit('remove', fileData);
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
            this.fileData.oldFileName = this.fileData.name();
            var oldValue = this.fileData.name(true);
            var value = this.$refs.input.value;
            this.fileData.customName = value;
            var newValue = this.fileData.name(true);
            if (newValue !== oldValue) {
                this.fileData.oldCustomName = oldValue;
                this.$emit('rename', this.fileData);
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
            this.fileData.error = false;
        },
    },
    created: function () {
        this.updateFileData();
    },
    watch: {
        value: function () {
            this.updateFileData();
        },
    },
}));

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--12-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-preview.vue?vue&type=script&lang=ts&


/* harmony default export */ var vue_file_previewvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    mixins: [vue_file_preview_mixin],
}));

// CONCATENATED MODULE: ./src/components/vue-file-preview.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_vue_file_previewvue_type_script_lang_ts_ = (vue_file_previewvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/vue-file-preview.vue





/* normalize component */

var vue_file_preview_component = normalizeComponent(
  components_vue_file_previewvue_type_script_lang_ts_,
  vue_file_previewvue_type_template_id_1f00ad11_render,
  vue_file_previewvue_type_template_id_1f00ad11_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_preview = (vue_file_preview_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"31dfa902-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-list.vue?vue&type=template&id=5ef04e06&
var vue_file_listvue_type_template_id_5ef04e06_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)}
var vue_file_listvue_type_template_id_5ef04e06_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-file-list.vue?vue&type=template&id=5ef04e06&

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--12-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-list.vue?vue&type=script&lang=ts&

/* harmony default export */ var vue_file_listvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    props: ['value', 'axis', 'appendTo'],
}));

// CONCATENATED MODULE: ./src/components/vue-file-list.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_vue_file_listvue_type_script_lang_ts_ = (vue_file_listvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/vue-file-list.vue





/* normalize component */

var vue_file_list_component = normalizeComponent(
  components_vue_file_listvue_type_script_lang_ts_,
  vue_file_listvue_type_template_id_5ef04e06_render,
  vue_file_listvue_type_template_id_5ef04e06_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_list = (vue_file_list_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"31dfa902-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-list-item.vue?vue&type=template&id=00f7ef53&
var vue_file_list_itemvue_type_template_id_00f7ef53_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)}
var vue_file_list_itemvue_type_template_id_00f7ef53_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-file-list-item.vue?vue&type=template&id=00f7ef53&

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--12-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-list-item.vue?vue&type=script&lang=ts&

/* harmony default export */ var vue_file_list_itemvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    props: ['index'],
}));

// CONCATENATED MODULE: ./src/components/vue-file-list-item.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_vue_file_list_itemvue_type_script_lang_ts_ = (vue_file_list_itemvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/vue-file-list-item.vue





/* normalize component */

var vue_file_list_item_component = normalizeComponent(
  components_vue_file_list_itemvue_type_script_lang_ts_,
  vue_file_list_itemvue_type_template_id_00f7ef53_render,
  vue_file_list_itemvue_type_template_id_00f7ef53_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_list_item = (vue_file_list_item_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"31dfa902-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-agent.vue?vue&type=template&id=1410c648&
var vue_file_agentvue_type_template_id_1410c648_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'is-sortable-' + (_vm.isSortable ? 'enabled' : 'disabled'),
    { 'is-sortable-hold': _vm.sortable === 'hold' },
    { 'is-sortable-hold': _vm.sortable === 'handle' },
    { 'is-sortable-immediately': _vm.sortable === true },
    {
      'is-sorting': _vm.isSorting,
      'is-sorting-active': _vm.isSortingActive,
      'is-drag-over': _vm.isDragging,
      'is-disabled': _vm.disabled === true,
    },
    'theme-' + _vm.theme ],attrs:{"id":'vfa-' + _vm.uniqueId},on:{"dragover":_vm.dragOver,"dragenter":_vm.dragEnter,"dragleave":_vm.dragLeave,"drop":_vm.drop}},[_vm._t("before-outer"),_c('div',{staticClass:"grid-block-wrapper vue-file-agent file-input-wrapper",class:{
      'is-compact': !!_vm.compact,
      'is-single': !_vm.hasMultiple,
      'has-multiple': _vm.hasMultiple,
      'no-meta': _vm.meta === false,
    }},[_vm._t("before-inner"),_c('canvas',{ref:"thumbnailCanvas",staticStyle:{"position":"fixed","visibility":"hidden","z-index":"-3"}}),(_vm.overallProgress)?_c('div',{staticClass:"overall-progress",class:{ 'overall-progress-full': _vm.overallProgress >= 100 }},[_c('div',{staticClass:"overall-progress-bar",style:({ width: _vm.overallProgress + '%' })}),_c('div',{staticClass:"overall-progress-left",style:({ width: 100 - _vm.overallProgress + '%' })})]):_vm._e(),_c(_vm.isSortable ? 'vfa-sortable-list' : 'VueFileList',{tag:"component",attrs:{"axis":_vm.theme == 'list' ? 'y' : 'xy',"appendTo":'#vfa-' + _vm.uniqueId + ' .vue-file-agent',"transitionDuration":_vm.transitionDuration,"pressDelay":_vm.sortable === 'hold' ? 200 : 0,"useDragHandle":_vm.sortable === 'handle',"helperClass":'active-sorting-item'},on:{"sort-start":function($event){return _vm.sortStart()},"sort-end":function($event){return _vm.sortEnd($event)}},model:{value:(_vm.filesData),callback:function ($$v) {_vm.filesData=$$v},expression:"filesData"}},[_c('transition-group',{attrs:{"name":"grid-box","tag":"div"}},[_vm._l((_vm.filesData),function(fileData,index){return _c(_vm.isSortable ? 'vfa-sortable-item' : 'VueFileListItem',{key:fileData.id,tag:"component",staticClass:"file-preview-wrapper grid-box-item grid-block",attrs:{"index":index}},[(_vm.sortable === 'handle')?_c('span',{directives:[{name:"vfa-sortable-handle",rawName:"v-vfa-sortable-handle"}],staticClass:"file-sortable-handle"},[_vm._t("sortable-handle",[_c('VueFileIcon',{attrs:{"name":"system-sortable-handle"}})])],2):_vm._e(),_vm._t("file-preview",[_c('VueFilePreview',{attrs:{"value":fileData,"deletable":_vm.isDeletable,"editable":_vm.editable === true,"linkable":_vm.linkable === true,"errorText":_vm.errorText,"disabled":_vm.disabled,"thumbnailSize":_vm.thumbnailSize},on:{"remove":function($event){return _vm.removeFileData($event)},"rename":function($event){return _vm.filenameChanged($event)}}})],{"fileData":fileData,"index":index})],2)}),(_vm.canAddMore)?[_vm._t("file-preview-new",[_c('div',{key:"new",staticClass:"file-preview-wrapper grid-box-item grid-block file-preview-new"},[_c('span',{staticClass:"file-preview"},[_c('span',{staticStyle:{"position":"absolute","top":"0","right":"0","bottom":"0","left":"0"}},[_c('VueFileIcon',{attrs:{"name":"system-file-preview-new"}}),_c('span',{staticClass:"help-text"},[_vm._v(_vm._s(_vm.helpTextComputed))])],1)])])])]:_vm._e()],2)],1),_c('input',{ref:"fileInput",staticClass:"file-input",attrs:{"title":"","disabled":_vm.disabled === true || (_vm.hasMultiple && !_vm.canAddMore),"type":"file","multiple":_vm.hasMultiple,"accept":_vm.accept || '*'},on:{"change":_vm.filesChanged}}),_vm._t("after-inner")],2),_vm._t("after-outer")],2)}
var vue_file_agentvue_type_template_id_1410c648_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-file-agent.vue?vue&type=template&id=1410c648&

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
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

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

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
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
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

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

// CONCATENATED MODULE: ./src/lib/ajax-request.ts
/* inspired by axios */
var AjaxRequest = /** @class */ (function () {
    function AjaxRequest() {
    }
    AjaxRequest.prototype.createError = function (message, code, request, response) {
        var error = new Error(message);
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

// CONCATENATED MODULE: ./src/lib/upload-helper.ts

var upload_helper_UploadHelper = /** @class */ (function () {
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
    UploadHelper.prototype.prepareUploadError = function (fileData, err, timeout) {
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
        if (!fileData.error) {
            fileData.error = {};
        }
        fileData.error.upload = errorText;
        fileData.upload.data = undefined;
        fileData.upload.error = errorText;
        if (timeout) {
            setTimeout(function () {
                if (!fileData.error) {
                    fileData.error = {};
                }
                fileData.error.upload = false;
                if (!fileData.error.size && !fileData.error.type) {
                    fileData.error = false;
                }
            }, timeout);
        }
    };
    UploadHelper.prototype.upload = function (url, headers, filesData, createFormData, progressFn, configureFn) {
        var _this = this;
        var updateOverallProgress = function () {
            /* no op */
        };
        if (progressFn) {
            updateOverallProgress = function () {
                var prgTotal = 0;
                for (var _i = 0, filesData_2 = filesData; _i < filesData_2.length; _i++) {
                    var fileData = filesData_2[_i];
                    prgTotal += fileData.progress();
                }
                progressFn(prgTotal / filesData.length);
            };
        }
        var promises = [];
        var _loop_1 = function (fileData) {
            var formData = void 0;
            if (typeof createFormData === 'function') {
                formData = createFormData(fileData);
            }
            else {
                formData = new FormData();
                formData.append('file', fileData.file);
                formData.append('filename', fileData.name());
            }
            // ((fileData) => {
            var promise = this_1.doUpload(url, headers, formData, function (progressEvent) {
                var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                // do not complete until promise resolved
                fileData.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
                updateOverallProgress();
            }, function (xhr) {
                fileData.xhr = xhr;
                if (typeof configureFn === 'function') {
                    configureFn(xhr);
                }
            });
            promises.push(new Promise(function (resolve, reject) {
                promise.then(function (response) {
                    delete fileData.xhr;
                    fileData.upload.data = response.data;
                    fileData.upload.error = false;
                    fileData.progress(100);
                    if (fileData.xhrQueue) {
                        fileData.xhrQueue();
                        delete fileData.xhrQueue;
                    }
                    resolve(response.data);
                } /* */, function (err) {
                    _this.prepareUploadError(fileData, err);
                } /* */);
            }));
        };
        var this_1 = this;
        for (var _i = 0, filesData_1 = filesData; _i < filesData_1.length; _i++) {
            var fileData = filesData_1[_i];
            _loop_1(fileData);
        }
        return Promise.all(promises);
    };
    UploadHelper.prototype.deleteUpload = function (url, headers, fileData, uploadData, configureFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (fileData.xhr) {
                fileData.xhr.abort();
            }
            if (uploadData === undefined) {
                uploadData = fileData.upload.data;
            }
            if (uploadData) {
                _this.doDeleteUpload(url, headers, uploadData, function (xhr) {
                    if (typeof configureFn === 'function') {
                        configureFn(xhr);
                    }
                }).then(function (result) {
                    resolve(result);
                }, function (err) {
                    _this.prepareUploadError(fileData, err);
                    reject(err);
                });
            }
        });
    };
    UploadHelper.prototype.updateUpload = function (url, headers, fileData, uploadData, configureFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (fileData.xhr) {
                // probably updated while being uploaded.
                fileData.xhrQueue = function () {
                    _this.updateUpload(url, headers, fileData, uploadData);
                };
                return resolve();
            }
            if (uploadData === undefined) {
                uploadData = fileData.upload.data || {};
                uploadData.old_filename = fileData.oldFileName;
                uploadData.filename = fileData.name();
            }
            if (uploadData) {
                _this.doUpdateUpload(url, headers, uploadData, function (xhr) {
                    if (typeof configureFn === 'function') {
                        configureFn(xhr);
                    }
                }).then(function (response) {
                    fileData.upload.data = response.data;
                    fileData.upload.error = false;
                    resolve(response);
                }, function (err) {
                    _this.prepareUploadError(fileData, err);
                    reject(err);
                });
            }
        });
    };
    UploadHelper.prototype.doTusUpload = function (tus, url, fileData, headers, progressCallback) {
        return new Promise(function (resolve, reject) {
            if (!tus) {
                return reject(new Error('tus required. Please install tus-js-client'));
            }
            // https://github.com/tus/tus-js-client
            // Create a new tus upload
            var file = fileData.file;
            var upload = new tus.Upload(file, {
                endpoint: url,
                headers: headers,
                retryDelays: [0, 3000, 5000, 10000, 20000],
                metadata: {
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
            });
            fileData.tusUpload = upload;
            // Start the upload
            upload.start();
        });
    };
    UploadHelper.prototype.tusUpload = function (tus, url, headers, filesData, progressFn) {
        var _this = this;
        var updateOverallProgress = function () {
            /* no op */
        };
        if (progressFn) {
            updateOverallProgress = function () {
                var prgTotal = 0;
                for (var _i = 0, filesData_4 = filesData; _i < filesData_4.length; _i++) {
                    var fileData = filesData_4[_i];
                    prgTotal += fileData.progress();
                }
                progressFn(prgTotal / filesData.length);
            };
        }
        var promises = [];
        var _loop_2 = function (fileData) {
            var promise = this_2.doTusUpload(tus, url, fileData, headers, function (progressEvent) {
                var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                // do not complete until promise resolved
                fileData.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
                updateOverallProgress();
            });
            promise.then(function (response) {
                // delete fileData.tusUpload;
                fileData.progress(100);
            }, function (err) {
                _this.prepareUploadError(fileData, err);
            });
            promises.push(promise);
        };
        var this_2 = this;
        for (var _i = 0, filesData_3 = filesData; _i < filesData_3.length; _i++) {
            var fileData = filesData_3[_i];
            _loop_2(fileData);
        }
        return Promise.all(promises);
    };
    UploadHelper.prototype.tusDeleteUpload = function (tus, url, headers, fileData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!tus) {
                return reject('tus required');
            }
            if (!fileData.tusUpload) {
                return resolve();
            }
            // const shouldTerminate = true;
            var abort = function (shouldTerminate) {
                return new Promise(function (res, rej) {
                    fileData.tusUpload.abort(shouldTerminate, function (err) {
                        if (err) {
                            _this.prepareUploadError(fileData, err);
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
/* harmony default export */ var upload_helper = (new upload_helper_UploadHelper());

// CONCATENATED MODULE: ./src/lib/plugins.ts
/* harmony default export */ var plugins = ({
    tus: null,
});

// CONCATENATED MODULE: ./src/components/vue-file-agent-mixin.ts










// tslint:disable-next-line
var dragCounter = 0;
/* harmony default export */ var vue_file_agent_mixin = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    props: [
        'accept',
        'auto',
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
        'resumable',
        'sortable',
        'theme',
        'thumbnailSize',
        'uploadHeaders',
        'uploadUrl',
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
            filesData: [],
            filesDataRaw: [],
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
        canAddMore: function () {
            if (!this.hasMultiple) {
                return this.filesData.length === 0;
            }
            if (!this.maxFiles) {
                return true;
            }
            return this.filesData.length < this.maxFiles;
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
        createThumbnail: function (fileData, video) {
            return new Promise(function (resolve, reject) {
                var canvas = document.createElement('canvas');
                utils.createVideoThumbnail(video, canvas, fileData.thumbnailSize).then(function (thumbnail) {
                    fileData.imageColor = thumbnail.color;
                    fileData.videoThumbnail = thumbnail.url;
                    fileData.dimensions.width = thumbnail.width;
                    fileData.dimensions.height = thumbnail.height;
                    resolve();
                }, reject);
            });
        },
        initVideo: function (fileData) {
            if (!fileData.isPlayableVideo()) {
                return;
            }
            var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
            var revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
            var video = document.createElement('video');
            video.src = createObjectURL(fileData.file);
            this.createThumbnail(fileData, video).then(function () {
                revokeObjectURL(video.src);
            });
            video.load();
        },
        getFileDataInstance: function (fileDataOrRaw) {
            var i;
            if (fileDataOrRaw instanceof file_data) {
                i = this.filesData.indexOf(fileDataOrRaw);
            }
            else {
                i = this.filesDataRaw.indexOf(fileDataOrRaw);
            }
            if (i === -1) {
                return fileDataOrRaw;
            }
            return this.filesData[i];
        },
        upload: function (url, headers, filesDataOrRaw, createFormData) {
            var _this = this;
            var validFilesData = [];
            for (var _i = 0, filesDataOrRaw_1 = filesDataOrRaw; _i < filesDataOrRaw_1.length; _i++) {
                var fileDataOrRaw = filesDataOrRaw_1[_i];
                var fileData = this.getFileDataInstance(fileDataOrRaw);
                if (!fileData.error) {
                    validFilesData.push(fileData);
                }
            }
            if (this.resumable) {
                return upload_helper.tusUpload(plugins.tus, url, headers, validFilesData, function (overallProgress) {
                    _this.overallProgress = overallProgress;
                });
            }
            return upload_helper
                .upload(url, headers, validFilesData, createFormData, function (overallProgress) {
                _this.overallProgress = overallProgress;
            })
                .then(function (res) {
                _this.$emit('upload', res);
                return res;
            }, function (err) {
                _this.$emit('upload:error', err);
            });
        },
        deleteUpload: function (url, headers, fileData, uploadData) {
            var _this = this;
            if (this.filesData.length < 1) {
                this.overallProgress = 0;
            }
            fileData = this.getFileDataInstance(fileData);
            if (this.resumable) {
                return upload_helper.tusDeleteUpload(plugins.tus, url, headers, fileData);
            }
            return upload_helper.deleteUpload(url, headers, fileData, uploadData).then(function (res) {
                _this.$emit('upload:delete', res);
                return res;
            }, function (err) {
                _this.$emit('upload:delete:error', err);
            });
        },
        updateUpload: function (url, headers, fileData, uploadData) {
            var _this = this;
            fileData = this.getFileDataInstance(fileData);
            return upload_helper.updateUpload(url, headers, fileData, uploadData).then(function (res) {
                _this.$emit('upload:update', res);
                return res;
            }, function (err) {
                _this.$emit('upload:update:error', err);
            });
        },
        autoUpload: function (filesData) {
            if (!this.uploadUrl || this.auto === false) {
                return Promise.resolve(false);
            }
            return this.upload(this.uploadUrl, this.uploadHeaders, filesData);
        },
        autoDeleteUpload: function (fileData) {
            if (!this.uploadUrl || this.auto === false) {
                return Promise.resolve(false);
            }
            return this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData);
        },
        autoUpdateUpload: function (fileData) {
            if (!this.uploadUrl || this.auto === false) {
                return Promise.resolve(false);
            }
            return this.updateUpload(this.uploadUrl, this.uploadHeaders, fileData);
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
            for (var _i = 0, _a = this.filesData; _i < _a.length; _i++) {
                var fileData = _a[_i];
                if (this.equalFiles(file, fileData.file)) {
                    return true;
                }
            }
            return false;
        },
        handleFiles: function (files) {
            var _a;
            var _this = this;
            if (this.disabled === true) {
                return;
            }
            if (this.hasMultiple && !this.canAddMore) {
                return;
            }
            var filesData = [];
            var filesFiltered = [];
            // tslint:disable-next-line
            for (var i = 0; i < files.length; i++) {
                if (this.hasMultiple && this.isFileAddedAlready(files[i])) {
                    continue;
                }
                filesFiltered.push(files[i]);
            }
            files = filesFiltered;
            if (this.maxFiles && files.length > this.maxFiles - this.filesData.length) {
                files = files.slice(0, this.maxFiles - this.filesData.length);
            }
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                filesData.push(new file_data({
                    file: file,
                }, {
                    read: this.shouldRead,
                    maxSize: this.maxSize,
                    accept: this.accept,
                    thumbnailSize: this.thumbnailSize,
                }));
            }
            for (var _b = 0, filesData_1 = filesData; _b < filesData_1.length; _b++) {
                var fileData = filesData_1[_b];
                if (fileData.file.size <= 20 * 1024 * 1024) {
                    // <= 20MB
                    this.initVideo(fileData);
                }
            }
            if (this.hasMultiple) {
                // splice: for list transitions to work properly
                (_a = this.filesData).splice.apply(_a, __spreadArrays([this.filesData.length, 0], filesData));
            }
            else {
                this.filesData = filesData;
            }
            file_data.readFiles(filesData).then(function (filesDataNew) {
                var allFilesDataRaw = file_data.toRawArray(_this.filesData);
                _this.filesDataRaw = allFilesDataRaw;
                _this.$emit('input', Array.isArray(_this.value) ? allFilesDataRaw : allFilesDataRaw[0]);
                _this.$emit('select', file_data.toRawArray(filesDataNew));
            });
            this.autoUpload(filesData);
        },
        filesChanged: function (event) {
            var files = event.target.files;
            this.$emit('change', event);
            if (!files[0]) {
                return;
            }
            this.handleFiles(files);
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = null; // do not use ''
                // because chrome won't fire change event for same file
            }
        },
        drop: function (event) {
            var _this = this;
            if (!event.dataTransfer) {
                return;
            }
            dragCounter = 0;
            this.isDragging = false;
            event.stopPropagation();
            event.preventDefault();
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
        removeFileData: function (fileDataOrRaw) {
            var _this = this;
            var i;
            if (fileDataOrRaw instanceof file_data) {
                i = this.filesData.indexOf(fileDataOrRaw);
            }
            else {
                i = this.filesDataRaw.indexOf(fileDataOrRaw);
            }
            var fileData = this.filesData.splice(i, 1)[0];
            var fileDataRaw = this.filesDataRaw.splice(i, 1)[0];
            this.$emit('input', this.filesDataRaw);
            // this.$emit('delete', fileData);
            this.$emit('delete', fileDataRaw);
            this.autoDeleteUpload(fileData).then(function (res) {
                /* no op */
            }, function (err) {
                _this.filesData.splice(i, 1, fileData);
                _this.filesDataRaw.splice(i, 1, fileDataRaw);
            });
        },
        filenameChanged: function (fileData) {
            this.$emit('rename', file_data.toRawArray([fileData])[0]);
            this.autoUpdateUpload(fileData).then(function (res) {
                /* no op */
            }, function (err) {
                fileData.customName = fileData.oldCustomName;
            });
        },
        checkValue: function () {
            var _this = this;
            var filesDataRaw = this.value || [];
            filesDataRaw = Array.isArray(filesDataRaw) ? filesDataRaw : [filesDataRaw];
            var fdPromises = [];
            var filesDataRawNew = [];
            for (var i = 0; i < filesDataRaw.length; i++) {
                var existingIndex = this.filesDataRaw.indexOf(filesDataRaw[i]);
                if (existingIndex !== -1) {
                    fdPromises.push(Promise.resolve(this.filesData[existingIndex]));
                    filesDataRawNew[i] = this.filesDataRaw[existingIndex];
                }
                else {
                    fdPromises.push(file_data.fromRaw(filesDataRaw[i], {
                        read: this.shouldRead,
                        maxSize: this.maxSize,
                        accept: this.accept,
                        thumbnailSize: this.thumbnailSize,
                    }));
                    filesDataRawNew.push(filesDataRaw[i]);
                }
            }
            this.filesDataRaw = filesDataRawNew;
            Promise.all(fdPromises).then(function (filesData) {
                _this.filesData = filesData;
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
                this.filesDataRaw = utils.arrayMove(this.filesDataRaw, sortData.oldIndex, sortData.newIndex);
                this.$nextTick(function () {
                    _this.$emit('input', _this.filesDataRaw);
                    _this.$emit('sort', {
                        oldIndex: sortData.oldIndex,
                        newIndex: sortData.newIndex,
                    });
                });
            }
        },
    },
    created: function () {
        this.uniqueId =
            new Date().getTime().toString(36) +
                Math.random()
                    .toString(36)
                    .slice(2);
        this.checkValue();
    },
    watch: {
        value: function () {
            this.checkValue();
        },
    },
}));

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--12-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-file-agent.vue?vue&type=script&lang=ts&


/* harmony default export */ var vue_file_agentvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    mixins: [vue_file_agent_mixin],
}));

// CONCATENATED MODULE: ./src/components/vue-file-agent.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_vue_file_agentvue_type_script_lang_ts_ = (vue_file_agentvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/vue-file-agent.vue?vue&type=style&index=0&lang=scss&
var vue_file_agentvue_type_style_index_0_lang_scss_ = __webpack_require__("6816");

// CONCATENATED MODULE: ./src/components/vue-file-agent.vue






/* normalize component */

var vue_file_agent_component = normalizeComponent(
  components_vue_file_agentvue_type_script_lang_ts_,
  vue_file_agentvue_type_template_id_1410c648_render,
  vue_file_agentvue_type_template_id_1410c648_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_file_agent = (vue_file_agent_component.exports);
// CONCATENATED MODULE: ./src/index.ts










var src_VueFileAgentPlugin = /** @class */ (function () {
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

var vfaPlugin = new src_VueFileAgentPlugin();
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    vfaPlugin.install(window.Vue, {});
    window.VueFileAgent = vfaPlugin;
}
var mixin = vue_file_agent_mixin;


/* harmony default export */ var src = (vfaPlugin);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport VueFileAgentPlugin */__webpack_require__.d(__webpack_exports__, "VueFileAgentPlugin", function() { return src_VueFileAgentPlugin; });
/* concated harmony reexport mixin */__webpack_require__.d(__webpack_exports__, "mixin", function() { return mixin; });
/* concated harmony reexport VueFileAgentMixin */__webpack_require__.d(__webpack_exports__, "VueFileAgentMixin", function() { return vue_file_agent_mixin; });
/* concated harmony reexport VueFilePreviewMixin */__webpack_require__.d(__webpack_exports__, "VueFilePreviewMixin", function() { return vue_file_preview_mixin; });
/* concated harmony reexport utils */__webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* concated harmony reexport FileData */__webpack_require__.d(__webpack_exports__, "FileData", function() { return file_data; });
/* concated harmony reexport plugins */__webpack_require__.d(__webpack_exports__, "plugins", function() { return plugins; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
//# sourceMappingURL=vue-file-agent.common.js.map