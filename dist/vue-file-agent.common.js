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

/***/ "e8b6":
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"459d17d4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueFileIcon.vue?vue&type=template&id=48bef045&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"viewBox":_vm.viewBoxComputed}},[_vm._l((_vm.icon.paths),function(d){return [(d)?_c('path',{attrs:{"d":d}}):_vm._e()]})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VueFileIcon.vue?vue&type=template&id=48bef045&

// CONCATENATED MODULE: ./src/lib/extensions.js
/* harmony default export */ var extensions = ({
  'audio': ['aif', 'cda', 'mid', 'midi', // 'mp3',
  'mpa', // 'ogg',
  // 'wav',
  'wma', 'wpl'],
  'audio-playable': ['mp3', 'ogg', 'wav'],
  'archive': ['7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'tar.gz', 'z', 'zip'],
  'disc': [// 'bin',
  'dmg', 'iso', 'toast', 'vcd'],
  'database': ['csv', 'dat', 'db', 'dbf', 'log', 'mdb', 'sav', 'sql', 'tar'],
  'executable': ['apk', 'bat', 'bin', 'cgi', 'pl', 'com', 'exe', 'gadget', 'jar', 'py', 'wsf', 'ipa'],
  'font': ['fnt', 'fon', 'otf', 'ttf'],
  'image': ['ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'ps', 'psd', 'svg', 'tif', 'tiff'],
  'markup': ['asp', 'aspx', 'cer', 'cfm', 'cgi', 'pl', 'css', 'scss', 'htm', 'html', 'jsp', // 'vue',
  'part', 'php', 'py', 'rss', 'xml', 'xhtml'],
  'presentation': ['key', 'odp', 'pps', 'ppt', 'pptx'],
  'script': ['c', 'class', 'cpp', 'cs', 'h', 'java', 'js', 'json', 'sh', 'swift', 'vb'],
  'sheet': ['ods', 'xlr', 'xls', 'xlsx'],
  'system': ['bak', 'cab', 'cfg', 'cpl', 'cur', 'dll', 'dmp', 'drv', 'icns', // 'ico',
  'ini', 'lnk', 'msi', 'sys', 'tmp'],
  'video': ['3g2', '3gp', 'avi', 'flv', 'h264', // 'm4v',
  'mkv', // 'mov',
  // 'mp4',
  'mpg', 'mpeg', 'rm', 'swf', 'vob', // 'webm',
  'wmv'],
  'video-playable': ['mp4', 'webm', 'mov'],
  vue: ['vue'],
  'doc': ['doc', 'docx', 'odt', 'rtf', 'tex', // 'txt',
  'wks', 'wps', 'wpd'],
  text: ['txt'],
  ebook: ['epub'],
  pdf: ['pdf'],
  folder: ['folder'],
  play: ['play']
});
// CONCATENATED MODULE: ./src/lib/icons.js


var SvgPath = function (paths, color, viewBox) {
  paths = Array.isArray(paths) ? paths : [paths];
  this.paths = paths;
  this.color = color;
  this.viewBox = viewBox;
};

var playIconPaths = ['M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z'];
var icons = {
  folder: new SvgPath(['M96.5 93.7h-93c-2 0-3.5-1.5-3.5-3.5V35.4h100v54.8c0 2-1.5 3.5-3.5 3.5z', 'M44.9 20V9.7c0-2-1.5-3.5-3.5-3.5h-38C1.5 6.3 0 7.8 0 9.7v25.7h100V23.5c0-2-1.5-3.5-3.5-3.5H44.9z'], '#efce4a'),
  audio: new SvgPath(['M32.5 37.5h-9v25h9L53.6 77V23L32.5 37.5M71.9 50c0 6.8-3.7 12.7-9.1 15.8l2.8 4.9c7.1-4.1 11.9-11.8 11.9-20.7 0-8.8-4.8-16.6-11.9-20.7l-2.8 4.9c5.4 3.1 9.1 9 9.1 15.8z', 'M62.1 50c0 3.2-1.7 5.9-4.3 7.4l2.7 4.7c4.2-2.4 7-6.9 7-12.1 0-5.2-2.8-9.7-7-12.1l-2.7 4.7c2.6 1.5 4.3 4.2 4.3 7.4z'], '#039'),
  video: new SvgPath(['M21 26.4v47.1h58V26.4H21zm10.9 43.5h-7.2v-7.2h7.2v7.2zm0-10.8h-7.2v-7.2h7.2v7.2zm0-10.9h-7.2V41h7.2v7.2zm0-10.9h-7.2v-7.2h7.2v7.2zm10.9 25.4V37.3L60.9 50 42.8 62.7zm32.6 7.2h-7.2v-7.2h7.2v7.2zm0-10.8h-7.2v-7.2h7.2v7.2zm0-10.9h-7.2V41h7.2v7.2zm0-10.9h-7.2v-7.2h7.2v7.2z'], '#ef6f2e'),
  'audio-playable': new SvgPath(playIconPaths, '#039', '0 0 48 48'),
  'video-playable': new SvgPath(playIconPaths, '#ef6f2e', '0 0 48 48'),
  archive: new SvgPath(['M72.4 38.5h-7.9v-7.9l7.9 7.9zm-21.3-7.9v28.8h21.4v-19h-9.9v-9.9H51.1zm3.3-7.6H30.8v5.6h9.3l-5.9 4.5v4.8l8.6-6.6v-2.7h30.1v-2.3L54.4 23zM42.9 35.1l-8.6 6.6v4.8l8.6-6.6v-4.8zm-8.7 20l8.6-6.6v-4.8l-8.6 6.6v4.8zm8.7 2v-4.8l-8.6 6.6v2.6h-3.4v5.6h5.3v3.8H33c-.6-1-1.6-1.6-2.8-1.6-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1.2 0 2.2-.6 2.8-1.6h3.1V77h4.8v-2.9H44c.6 1 1.6 1.6 2.8 1.6 1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2c-1.2 0-2.2.6-2.8 1.6h-3.1v-3.8h13.5l18.5-3.3v-2.3H37.1l5.8-4.4z'], '#d8a13f'),
  system: new SvgPath(['M73.6 54.8c-2.1-.7-3.4-2.6-3.4-4.8s1.4-4.1 3.4-4.8c.6-.2 1-.9.8-1.5-.6-2.3-1.5-4.4-2.7-6.5-.3-.6-1.1-.8-1.7-.5-.7.4-1.6.6-2.4.6-2.8 0-5-2.3-5-5 0-.8.2-1.7.6-2.4.3-.6.1-1.3-.5-1.7-2-1.2-4.2-2.1-6.5-2.7-.6-.2-1.3.2-1.5.8-.7 2.1-2.6 3.4-4.8 3.4-2.2 0-4.1-1.4-4.8-3.4-.2-.6-.9-1-1.5-.8-2.3.6-4.4 1.5-6.5 2.7-.6.3-.8 1.1-.5 1.7.4.7.6 1.6.6 2.4 0 2.8-2.3 5-5 5-.8 0-1.7-.2-2.4-.6-.6-.3-1.3-.1-1.7.5-1.2 2-2.1 4.2-2.7 6.5-.2.6.2 1.3.8 1.5 2.1.7 3.4 2.6 3.4 4.8s-1.4 4.1-3.4 4.8c-.6.2-1 .9-.8 1.5.6 2.3 1.5 4.4 2.7 6.5.3.6 1.1.8 1.7.5.7-.4 1.6-.6 2.4-.6 2.8 0 5 2.3 5 5 0 .8-.2 1.7-.6 2.4-.3.6-.1 1.3.5 1.7 2 1.2 4.2 2.1 6.5 2.7h.3c.5 0 1-.3 1.2-.9.7-2.1 2.6-3.4 4.8-3.4 2.2 0 4.1 1.4 4.8 3.4.2.6.9 1 1.5.8 2.3-.6 4.4-1.5 6.5-2.7.6-.3.8-1.1.5-1.7-.4-.7-.6-1.6-.6-2.4 0-2.8 2.3-5 5-5 .8 0 1.7.2 2.4.6.6.3 1.3.1 1.7-.5 1.2-2 2.1-4.2 2.7-6.5.2-.5-.1-1.2-.8-1.4zM50 57.6c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6 4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6z'], '#999'),
  image: new SvgPath(['m 40.400002,35 a 8,8 0 0 1 -8,8 8,8 0 0 1 -8,-8 8,8 0 0 1 8,-8 8,8 0 0 1 8,8 z', 'M78.9 47.3l-9.7-9.6L50 57l-9.6-9.7-19.3 19.3V73h57.8z'], '#5b2d8d'),
  doc: new SvgPath(['M29.6 53l-5.9-18.2c-.2-.7-.4-1-.5-1-.1-.1-.2-.1-.4-.2l-2.1-.6-.1-2.6h11l.2 2.6-2.1.6v.2c0 .2.1.7.4 1.2l2.2 7 3.9-11.7 3-.1 3.6 11.7 2.5-7c.1-.5.4-1 .4-1.2v-.1l-1.8-.5-.1-2.7h8.6l.2 2.6-2.3.7c-.1 0-.2.1-.4.1 0 .1-.2.2-.4.9L43 52.8l-3.1.2-3.3-11.2-3.9 11-3.1.2z', 'M57.8 30.2h21.7v3.4H57.8zm0 9.2h21.7v3.4H57.8zm0 9.4h21.7v3.4H57.8zm-36.2 9.6h57.9v3.4H21.6zm0 9.4h57.9v3.4H21.6z'], '#2372ba'),
  executable: new SvgPath(['M33.1 29.8l-6.6 6.6L37.2 47 26.5 57.6l6.6 6.6L50.2 47zm18.8 31.1h22.6v9.2H51.9z'], '#333'),
  ebook: new SvgPath(['M75.8 45.7c-.3-.6-.7-1.2-1.3-1.6-.1.5-.3 1-.6 1.5L58.3 69.8c-.6.9-1.9 1.1-2.9.8l-25-7c-1.5-.4-3.3-1.3-3.4-3 0-.6 0-.9.4-1.1.3-.3.8-.2 1.1-.1L52 66c3.4 1 4.4.2 6.9-3.5l14.4-22.2c.7-1.2.9-2.5.5-3.6s-1.4-2-2.7-2.4l-20.6-5.7c-.5-.1-1-.1-1.5-.1v-.1c-3.2-1.9-4.4 1.7-6 3-.6.5-1.4.8-1.7 1.3-.2.5-.1 1-.3 1.4-.6 1.4-2.4 3.6-3.3 4.3-.6.4-1.2.5-1.6 1.1-.3.4-.2 1.1-.4 1.6-.5 1.2-2.1 3.3-3.2 4.4-.4.4-1 .6-1.3 1.1-.3.4-.2 1.1-.4 1.6-.7 1.3-2.2 3.2-3.4 4.3-.6.6-1.3.9-1.6 1.5-.1.3 0 .7-.2 1.1-.2.6-.5 1.1-.7 1.7-.7.9-1 2.1-.9 3.4.2 3.1 2.5 6 5.3 6.8l25 7c2.3.6 5.2-.5 6.6-2.5l14.4-22.2c.7-1.1.9-2.4.5-3.6zm-28.9-7.9l1.1-1.6c.3-.4.9-.7 1.4-.5l16.5 4.6c.5.1.7.6.4 1l-1.1 1.6c-.3.4-.9.7-1.4.5l-16.5-4.6c-.5-.2-.7-.6-.4-1zM42.7 44l1.1-1.6c.3-.4.9-.7 1.4-.5l16.5 4.6c.5.1.7.6.4 1L60.9 49c-.3.4-.9.7-1.4.5L43.1 45c-.5-.1-.7-.6-.4-1z'], '#963'),
  markup: new SvgPath(['M21.5 48.3l16.2-14v7.1l-11 9.2v.1l11 9.2V67L21.5 53v-4.7zm30.6-17.6h4.3L48 71.3h-4.2l8.3-40.6zM62.3 60l11-9.2v-.1l-11-9.2v-7.1l16.2 14v4.9l-16.2 14V60z']),
  script: new SvgPath(['M42.3 44.2h15.4V48H42.3v-3.8zm0 7.7h15.4v3.8H42.3v-3.8zm0 7.7h15.4v3.8H42.3v-3.8zM69.2 25H38.5c-4.2 0-7.7 3.4-7.7 7.7v34.6h-7.7c0 4.2 3.4 7.7 7.7 7.7h30.8c4.2 0 7.7-3.4 7.7-7.7V36.5H77v-3.8c-.1-4.3-3.5-7.7-7.8-7.7zm-3.8 41.6c0 2.5-2 4.5-4.5 4.5H32.7c1.9-1.3 1.9-3.8 1.9-3.8V32.7c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8v3.8h23.1v30.1zM46.2 32.7v-3.8h23.1c3.5 0 3.8 2.2 3.8 3.8H46.2z']),
  disc: new SvgPath(['M46.9 50c0 .8.3 1.6.9 2.2 1.2 1.2 3.2 1.2 4.4 0 .6-.6.9-1.4.9-2.2 0-.8-.3-1.6-.9-2.2-.6-.6-1.4-.9-2.2-.9-.8 0-1.6.3-2.2.9-.6.6-.9 1.4-.9 2.2z', 'M32.3 32.3c-9.8 9.8-9.8 25.6 0 35.4 9.8 9.8 25.6 9.8 35.4 0 9.8-9.8 9.8-25.6 0-35.4-9.8-9.7-25.6-9.7-35.4 0zm37 28.2c-.9 1.7-2.1 3.2-3.5 4.6-1.4 1.4-3 2.6-4.6 3.5l-5.8-11.1s.5-.2 1.6-1.2c1.1-1.1 1.3-1.6 1.3-1.6l11 5.8zM54.4 45.6c1.2 1.2 1.8 2.8 1.8 4.4 0 1.6-.6 3.2-1.8 4.4-2.4 2.4-6.4 2.4-8.8 0-1.2-1.2-1.8-2.8-1.8-4.4 0-1.6.6-3.2 1.8-4.4a6.1 6.1 0 0 1 8.8 0zm-8.5-4.4s-1.2.7-2.2 1.8c-.9 1-1 1.2-1.3 1.7l-11-5.9c.9-1.7 2.1-3.2 3.5-4.6 1.4-1.4 3-2.6 4.6-3.5l6.4 10.5z'], '#c96'),
  text: new SvgPath(['M69.4 28.6v5.5H21.5v-5.5M30.6 41h47.9v5.6H30.6zm-9.1 12.4h47.9V59H21.5zm9.1 12.5h47.9v5.6H30.6z'], '#6b533b'),
  database: new SvgPath(['M48.1 75.5c-6.5-.3-12.3-2.3-15.4-5.4-.9-.9-1.8-2.1-2.2-2.9l-.3-.5v-6.1c0-6 0-6.1.1-5.6.3 1.3 1.1 2.7 2.3 3.7.8.7 2.5 1.8 3.8 2.5 2.4 1.2 5.2 2 8.4 2.5 1.9.3 2.6.3 5.3.3s3.4 0 5.3-.3c3.1-.5 6-1.3 8.3-2.5 1.4-.7 3-1.7 3.8-2.5 1.1-1 2-2.5 2.3-3.8.1-.5.1-.4.1 5.5v6l-.3.6c-1 1.9-2.6 3.6-4.7 4.8-4.3 2.7-10.5 4-16.8 3.7z', 'M48.1 60.4c-5.7-.3-11-1.9-14.3-4.4-.7-.6-1.8-1.6-2.3-2.2-.4-.6-.8-1.2-1.1-1.8l-.3-.5v-6c0-5.9 0-6 .1-5.5.2.9.7 2 1.5 2.9.4.5 1.1 1.2 1.5 1.4.1.1.5.3.7.5 2.7 1.9 6.5 3.3 10.8 3.9 1.9.3 2.6.3 5.3.3s3.4 0 5.3-.3c3.1-.5 6-1.3 8.4-2.5 1.4-.7 3-1.8 3.9-2.5 1.1-1 2-2.4 2.2-3.7.1-.5.1-.4.1 5.5v5.9l-.4.8c-.7 1.2-1.1 1.8-1.9 2.7-.8.8-1.6 1.5-2.7 2.1-4.3 2.4-10.5 3.7-16.8 3.4z', 'M47.7 45.4c-3.8-.3-6.8-.9-9.6-2-3.4-1.3-5.8-3.1-7.1-5.2-.3-.4-.5-1-.7-1.6-.2-.6-.3-2-.1-2.7.9-4.3 6.6-7.9 14.5-9 1.9-.3 2.6-.3 5.3-.3s3.4 0 5.3.3c3.1.5 6 1.3 8.4 2.5 3.5 1.7 5.6 4 6.1 6.5.1.7.1 2.1-.1 2.7-.4 1.3-1 2.2-2 3.2-2.8 2.9-7.9 4.9-14.1 5.6-.9-.1-5.1 0-5.9 0z'], '#a03537'),
  pdf: new SvgPath(['M46.2 21.8c-3.5 0-6.3 2.9-6.3 6.3 0 4.3 2.4 9.6 4.9 14.7-2 6.1-4.1 12.7-7 18.2-5.8 2.3-11 4-14 6.6l-.2.2c-1.1 1.2-1.8 2.7-1.8 4.4 0 3.5 2.9 6.3 6.3 6.3 1.7 0 3.4-.6 4.4-1.8 0 0 .2 0 .2-.2 2.3-2.7 5-7.8 7.5-12.2 5.5-2.1 11.5-4.4 16.9-5.8 4.1 3.4 10.1 5.5 15 5.5 3.5 0 6.3-2.9 6.3-6.3 0-3.5-2.9-6.3-6.3-6.3-4 0-9.6 1.4-13.9 2.9-3.5-3.4-6.7-7.5-9.2-11.9C50.6 37 52.6 32 52.6 28c-.2-3.5-2.9-6.2-6.4-6.2zm0 3.6c1.4 0 2.4 1.1 2.4 2.4 0 1.8-1.1 5.3-2.1 9-1.5-3.7-2.9-7.2-2.9-9 .1-1.2 1.2-2.4 2.6-2.4zm1.1 21.5c1.8 3.1 4.1 5.8 6.6 8.2-3.7 1.1-7.3 2.3-11 3.7 1.8-3.8 3.1-7.9 4.4-11.9zM72 55c1.4 0 2.4 1.1 2.4 2.4 0 1.4-1.1 2.4-2.4 2.4-2.9 0-6.9-1.2-10.1-3.1C65.6 56 69.7 55 72 55zM34.6 66.2c-1.8 3.2-3.5 6.1-4.7 7.6-.5.5-.9.6-1.7.6-1.4 0-2.4-1.1-2.4-2.4 0-.6.3-1.4.6-1.7 1.3-1.2 4.5-2.6 8.2-4.1z'], '#c11e07'),
  sheet: new SvgPath(['M62.1 30.9h14.1v9.4H62.1zm0 14.5h14.1v9.4H62.1zm0 14.3h14.1v9.4H62.1zm-19.2 0H57v9.4H42.9zm-19 0H38v9.4H23.9zm19.2-14.2h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9zm19.2-14.6h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9z'], '#30723f'),
  presentation: new SvgPath(['M 73.319289,26.32707 H 26.61477 c -2.335226,0 -4.258353,1.917194 -4.258353,4.245215 v 29.853446 c 0,2.328021 1.923127,4.245215 4.258353,4.245215 h 19.506006 l -1.923128,7.257947 h -2.197859 c -0.961564,0 -1.648395,0.684712 -1.648395,1.643309 0,0.958597 0.686831,1.643309 1.648395,1.643309 h 15.797117 c 0.961563,0 1.648394,-0.684712 1.648394,-1.643309 0,-0.958597 -0.686831,-1.643309 -1.648394,-1.643309 H 55.46168 l -1.923128,-7.39489 h 19.780737 c 2.335226,0 4.258353,-1.917193 4.258353,-4.245214 V 30.572285 c 0,-2.328021 -1.923127,-4.245215 -4.258353,-4.245215 z m 0.412099,34.372546 H 26.202672 V 30.2984 h 47.39135 z', 'm 38.428266,48.511741 h 3.846255 v 7.668775 h -3.846255 z m 6.456214,-2.464963 h 3.846254 V 56.180516 H 44.88448 Z m 6.318846,-2.601906 h 3.846255 v 12.735644 h -3.846255 z m 6.318847,-2.464964 h 3.846255 v 15.200608 h -3.846255 z m -0.274732,-5.614639 -6.730946,3.697445 -4.945184,-1.643308 -8.379341,4.519099 1.236296,1.369424 7.417777,-3.834387 4.945185,1.643309 7.692509,-4.245215 1.236296,1.369424 2.88469,-4.792984 -6.593578,0.410827 z'], '#c24f32'),
  font: new SvgPath(['M40.4 56.2H28.7l-1.4 3.1c-.5 1-.7 1.9-.7 2.6 0 .9.4 1.6 1.1 2 .4.3 1.5.4 3.2.6v.9H20v-.9c1.2-.2 2.2-.6 2.9-1.4.8-.8 1.7-2.4 2.8-4.8l11.8-25.6h.5l12 26.2c1.1 2.5 2.1 4.1 2.8 4.7.6.5 1.3.8 2.3.9v.9h-16v-.9h.7c1.3 0 2.2-.2 2.7-.5.4-.3.5-.6.5-1.1 0-.3 0-.6-.1-.9 0-.1-.3-.7-.7-1.8l-1.8-4zm-.8-1.8l-4.9-11-5.1 11h10z', 'M80 44.2l-4.7 15.7-.5 1.9c0 .2-.1.4-.1.5 0 .2.1.4.2.5.1.2.3.2.4.2.3 0 .8-.3 1.4-.8.2-.2.8-.9 1.8-2.2l.9.4c-1.2 2-2.4 3.5-3.7 4.5-1.3.9-2.7 1.4-4.2 1.4-.9 0-1.6-.2-2.1-.7-.5-.5-.7-1-.7-1.8 0-.6.3-1.8.8-3.4l.6-1.9c-1.9 3.1-3.7 5.4-5.4 6.7-1 .8-2.1 1.1-3.2 1.1-1.5 0-2.6-.6-3.2-1.8-.7-1.2-1-2.5-1-4 0-2.2.7-4.8 2.1-7.6 1.4-2.9 3.2-5.2 5.5-6.9 1.9-1.4 3.6-2.2 5.3-2.2.9 0 1.6.3 2.2.8.6.5 1 1.4 1.2 2.8l.9-2.9 5.5-.3zm-7.8 4.5c0-1.3-.2-2.2-.6-2.8-.3-.4-.7-.6-1.2-.6s-1 .2-1.6.7c-1.1 1-2.3 3-3.5 5.9-1.3 3-1.9 5.6-1.9 7.7 0 .8.1 1.4.4 1.8.3.4.6.6.9.6.7 0 1.5-.4 2.2-1.2 1.1-1.2 2-2.6 2.9-4.3 1.6-2.9 2.4-5.5 2.4-7.8z'], '#7291a1'),
  vue: new SvgPath(['M 66.425365,28.281905 H 56.751974 L 49.707631,39.427061 43.669624,28.281905 H 21.530262 L 49.707631,76.54823 77.885006,28.281905 Z m -37.888497,4.025337 h 6.767604 L 49.707631,57.239179 64.098226,32.307242 h 6.767597 L 49.707631,68.560446 Z'], '#41B883'),
  other: new SvgPath(['M71 36.3L57.8 23.1c-.4-.4-.9-.6-1.4-.6h-26c-1.1 0-2 .9-2 2v51.1c0 1.1.9 2 2 2h39.3c1.1 0 2-.9 2-2V37.7c-.1-.5-.3-1-.7-1.4zm-3.9 2.3H55.5V27l11.6 11.6zm.1 34.5H32.8V26.9h18.5v13.3c0 1.4 1.2 2.6 2.6 2.6h13.3v30.3z'])
};

for (var category in icons) {
  icons[category].category = category;
}

/* harmony default export */ var lib_icons = (icons);
var extensionsMap = {};

for (var cat in extensions) {
  for (var icons_i in extensions[cat]) {
    var icons_ext = extensions[cat][icons_i];
    extensionsMap[icons_ext] = cat;
  }
}

function getIconFromExt(ext) {
  ext = ext.toLowerCase();
  var cat = extensionsMap[ext];
  var svgIcon = icons[cat] || icons.other;
  return svgIcon;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueFileIcon.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//

/* harmony default export */ var VueFileIconvue_type_script_lang_js_ = ({
  props: ['ext', 'viewBox'],
  computed: {
    viewBoxComputed() {
      if (!this.viewBox && this.icon && this.icon.viewBox) {
        return this.icon.viewBox;
      }

      return this.viewBox ? this.viewBox : '0 0 100 100';
    },

    icon() {
      var svgIcon = getIconFromExt(this.ext);
      return svgIcon;
    }

  }
});
// CONCATENATED MODULE: ./src/components/VueFileIcon.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VueFileIconvue_type_script_lang_js_ = (VueFileIconvue_type_script_lang_js_); 
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

// CONCATENATED MODULE: ./src/components/VueFileIcon.vue





/* normalize component */

var component = normalizeComponent(
  components_VueFileIconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueFileIcon = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"459d17d4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueFileAgent.vue?vue&type=template&id=23f5b5dc&
var VueFileAgentvue_type_template_id_23f5b5dc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"grid-block-wrapper vue-file-agent vue-file-agent-light file-input-wrapper drop_zone",class:{'is-drag-over': _vm.isDragging, 'is-compact': !!_vm.compact, 'is-single': !_vm.hasMultiple, 'has-multiple': _vm.hasMultiple, 'no-meta': _vm.meta === false},on:{"dragover":_vm.dragOver,"dragleave":_vm.dragLeave,"drop":_vm.drop}},[_c('canvas',{ref:"thumbnailCanvas",staticStyle:{"position":"fixed","visibility":"hidden","z-index":"-3"}}),(_vm.overallProgress)?_c('div',{staticClass:"overall-progress",class:{'overall-progress-full': _vm.overallProgress >= 100}},[_c('div',{staticClass:"overall-progress-bar",style:({width: _vm.overallProgress + '%'})}),_c('div',{staticClass:"overall-progress-left",style:({width: (100 - _vm.overallProgress) + '%'})})]):_vm._e(),_c('transition-group',{attrs:{"name":"grid-box","tag":"div"}},[_vm._l((_vm.filesData),function(fileData,index){return _c('div',{key:fileData.id,staticClass:"file-preview-wrapper grid-box-item grid-block",class:['file-preview-wrapper-' + fileData.ext(), fileData.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other', 'file-category-' + fileData.icon().category, {'file-is-playing-av': fileData.isPlayingAv}, {'is-deletable': _vm.isDeletable}, {'is-deletable': _vm.isDeletable}, {'has-error': fileData.error}]},[(fileData.error)?_c('div',{staticClass:"file-error-wrapper"},[(fileData.error)?_c('div',{staticClass:"file-error-message file-error-message-client"},[_vm._v("\n\t  \t\t\t"+_vm._s(_vm.getErrorMessage(fileData))+"\n\t  \t\t")]):_vm._e()]):_vm._e(),(fileData.isPlayableAudio() || fileData.isPlayableVideo())?_c('div',{staticClass:"file-av-wrapper",attrs:{"id":'file-av-player-' + index}},[_c('div',{staticClass:"file-av-action",on:{"click":function($event){return _vm.playAv(fileData, 'file-av-player-' + index)}}},[_c('span',{staticClass:"file-av-stop"},[_c('svg',{attrs:{"width":"24","height":"24","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}}),_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}})])]),_c('span',{staticClass:"file-av-play"},[_c('svg',{attrs:{"width":"48","height":"48","viewBox":"0 0 48 48"}},[_c('path',{attrs:{"d":"M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"}})])])])]):_vm._e(),_c('span',{staticClass:"file-preview",class:{'image-preview': fileData.isImage(), 'other-preview': !fileData.isImage(), 'dark-content': fileData.isImage() && fileData.isDarkColor()},style:({'background-color': fileData.color(), 'background-imagex': 'url(' + fileData.src() + ')', widthx: fileData.width + 'px', heightx: fileData.height + 'px'})},[_c('span',{staticStyle:{"position":"absolute","top":"0","right":"0","bottom":"0","left":"0","overflow":"hidden"}},[(fileData.isImage() || fileData.isPlayableVideo())?_c('img',{staticClass:"file-preview-img",attrs:{"src":fileData.src()}}):_vm._e()]),_c('span',{staticClass:"file-ext"},[_vm._v(_vm._s(fileData.ext()))]),_c('span',{staticClass:"file-size"},[_vm._v(_vm._s(fileData.size()))]),(_vm.isDeletable)?_c('span',{staticClass:"file-delete",on:{"click":function($event){return _vm.removeFileData(fileData)}}},[_vm._v("\n        \t×\n    \t\t")]):_vm._e(),_c('span',{staticClass:"file-name"},[_vm._v("\n\t        "+_vm._s(fileData.name(true))+"\n\t      ")]),(fileData.dimensions.width && fileData.dimensions.height)?_c('span',{staticClass:"image-dimension"},[_c('span',{staticClass:"image-dimension-width"},[_vm._v(_vm._s(fileData.dimensions.width))]),_c('span',{staticClass:"image-dimension-height"},[_vm._v(_vm._s(fileData.dimensions.height))])]):_vm._e(),(fileData.hasProgress())?_c('span',{staticClass:"file-progress",class:{'file-progress-full': fileData.progress() >= 100, 'has-file-progress': fileData.progress() > 0}},[_c('span',{staticClass:"file-progress-bar",style:({width: fileData.progress() + '%'})})]):_vm._e(),_c('span',{staticClass:"file-icon"},[_c('VueFileIcon',{attrs:{"ext":fileData.ext()}})],1)])])}),(_vm.canAddMore)?_c('div',{key:"new",staticClass:"file-preview-wrapper grid-box-item grid-block file-preview-new"},[_c('span',{staticClass:"file-preview"},[_c('span',{staticStyle:{"position":"absolute","top":"0","right":"0","bottom":"0","left":"0"}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","version":"1.1","x":"100px","y":"0px","viewBox":"0 0 1000 1000","enable-background":"new 0 0 1000 1000","xml:space":"preserve"}},[_c('path',{attrs:{"d":"M745,353c-5.6,0-11.3,0.2-17.2,0.7C687.4,237.3,577.8,157,451,157c-162.1,0-294,131.9-294,294c0,2.1,0,4.1,0,6.2C72.6,479,10,555.8,10,647c0,108.1,87.9,196,196,196h245V618.3l-63.4,63.4c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4c-19.2-19.2-19.2-50.1,0-69.3l147-147c4.6-4.6,9.9-8.1,16-10.6c12-4.9,25.5-4.9,37.4,0c6,2.5,11.4,6.1,16,10.6l147,147c19.2,19.2,19.2,50.1,0,69.3c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4L549,618.3V843h196c135.1,0,245-109.9,245-245S880.1,353,745,353z"}})]),_c('span',{staticClass:"help-text"},[_vm._v(_vm._s(_vm.helpTextComputed))])])])]):_vm._e()],2),_c('input',{ref:"fileInput",staticClass:"file-input",attrs:{"title":"","disabled":_vm.hasMultiple && !_vm.canAddMore,"type":"file","multiple":_vm.hasMultiple,"accept":_vm.accept || '*'},on:{"change":_vm.filesChanged}}),( false)?undefined:_vm._e()],1)}
var VueFileAgentvue_type_template_id_23f5b5dc_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VueFileAgent.vue?vue&type=template&id=23f5b5dc&

// EXTERNAL MODULE: ./src/components/vue-file-agent.css
var vue_file_agent = __webpack_require__("e8b6");

// CONCATENATED MODULE: ./src/lib/file-data.js


var readFileContent = function (file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (readerEvent) {
      resolve(readerEvent.target['result']);
    };

    reader.readAsDataURL(file);
  });
};

function getAverageColor(arr) {
  var bytesPerPixel = 4,
      arrLength = arr.length;

  if (arrLength < bytesPerPixel) {
    return false;
  }

  var step = 5;
  var len = arrLength - arrLength % bytesPerPixel,
      preparedStep = (step || 1) * bytesPerPixel;
  var redTotal = 0,
      greenTotal = 0,
      blueTotal = 0,
      alphaTotal = 0,
      count = 0;
  var simple = false;
  simple = true;

  if (simple) {
    for (var i = 0; i < len; i += preparedStep) {
      var alpha = arr[i + 3],
          red = arr[i] * alpha,
          green = arr[i + 1] * alpha,
          blue = arr[i + 2] * alpha;
      redTotal += red;
      greenTotal += green;
      blueTotal += blue;
      alphaTotal += alpha;
      count++;
    }

    return alphaTotal ? [Math.round(redTotal / alphaTotal), Math.round(greenTotal / alphaTotal), Math.round(blueTotal / alphaTotal), Math.round(alphaTotal / count)] : [0, 0, 0, 0];
  }

  for (var i = 0; i < len; i += preparedStep) {
    var red = arr[i],
        green = arr[i + 1],
        blue = arr[i + 2],
        alpha = arr[i + 3];
    redTotal += red * red * alpha;
    greenTotal += green * green * alpha;
    blueTotal += blue * blue * alpha;
    alphaTotal += alpha;
    count++;
  }

  return alphaTotal ? [Math.round(Math.sqrt(redTotal / alphaTotal)), Math.round(Math.sqrt(greenTotal / alphaTotal)), Math.round(Math.sqrt(blueTotal / alphaTotal)), Math.round(alphaTotal / count)] : [0, 0, 0, 0];
}

var resizeImage = function (settings, fileData) {
  var file = settings.file;
  var url = settings.url;
  var resizeLimit = settings.resizeLimit;
  var binary = settings.binary;
  var image;
  image = new Image();
  var avgColor = null;
  var canvas = document.createElement('canvas'); // var dataURItoBlob = function(dataURI) {
  //   var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
  //       atob(dataURI.split(',')[1]) :
  //       decodeURI(dataURI.split(',')[1]);
  //   var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   var max = bytes.length;
  //   var ia = new Uint8Array(max);
  //   for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
  //   return new Blob([ia], {type:mime});
  // };

  var resize = function () {
    var width = image.width;
    var height = image.height;

    if (settings.width && settings.height) {
      width = settings.width;
      height = settings.height;
    } else {
      if (width > height) {
        if (width > resizeLimit) {
          height *= resizeLimit / width;
          width = resizeLimit;
        }
      } else {
        if (height > resizeLimit) {
          width *= resizeLimit / height;
          height = resizeLimit;
        }
      }
    }

    width = Math.floor(width);
    height = Math.floor(height);
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);

    try {
      var imageData = context.getImageData(0, 0, width, height);
      var rgb = getAverageColor(imageData.data);

      if (rgb) {
        avgColor = rgb;
      }
    } catch (e) {
      /* security error, img on diff domain */
    }

    var dataUrl = canvas.toDataURL('image/png');

    if (!binary) {
      return dataUrl;
    } // return dataURItoBlob(dataUrl);

  };

  return new Promise(function (resolve, reject) {
    if (file.type.indexOf('image') == -1) {
      reject(new Error("Not an image"));
      return;
    }

    var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
    var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
    var shouldRevoke = false;
    image.setAttribute('crossOrigin', 'anonymous'); // works for me

    image.onload = function () {
      if (shouldRevoke) {
        revokeObjectURL(image.src);
      }

      var url = resize();
      resolve({
        image: image,
        url: url,
        color: avgColor
      });
      return;
    };

    if (url) {
      image.src = url;
      return;
    }

    if (!(file instanceof File)) {
      return reject('Invalid file object. Use url or a valid instance of File class');
    }

    if (createObjectURL && revokeObjectURL) {
      shouldRevoke = true;
      image.src = createObjectURL(file);
      return;
    }

    readFileContent(file).then(function (dataUrl) {
      image.src = dataUrl;
    });
  });
};

var bytesToSize = function (bytes) {
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 B';
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  i = parseInt('' + i);
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

var sizeToBytes = function (size) {
  size = ('' + size).toUpperCase();
  var matches = size.match(/([\d|.]+?)\s*?([A-Z]+)/);
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  var i = sizes.indexOf(matches[2]);

  if (i == -1) {
    return size;
  }

  return parseFloat(matches[1]) * Math.pow(1024, i);
};

var getHashCode = function (value) {
  var hash = 0;
  if (value.length == 0) return hash;

  for (var i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
};

var intToHSL = function (value) {
  var h = value % 360; // var s = 100;

  var s = value % 100;
  var l = 50; // var l = value % 100;
  // return 'hsl(' + h + ',' + s + '%,' + l + '%)';

  return 'hsl(' + h + ',' + s + '%,' + l + '%, 0.75)';
};

var colorByHashCode = function (value) {
  // var val = value.split('');
  // return intToHSL(getHashCode(val.shift().toLowerCase() + val.shift().toUpperCase() + val.shift().toLowerCase() + val.join().toLowerCase()));
  // return intToHSL(getHashCode(value.toUpperCase()));
  // return intToHSL(getHashCode(value[0].toUpperCase() + value.substr(1).toLowerCase()));
  return intToHSL(getHashCode(value.toLowerCase()));
}; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
// https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js#L2511


var validateType = function (file, acceptedFiles) {
  if (!acceptedFiles) {
    return true;
  } // If there are no accepted mime types, it's OK


  acceptedFiles = acceptedFiles.split(",");
  let mimeType = file.type;
  let baseMimeType = mimeType.replace(/\/.*$/, "");

  for (let validType of acceptedFiles) {
    validType = validType.trim();

    if (validType.charAt(0) === ".") {
      // extension
      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
        return true;
      }
    } else if (/\/\*$/.test(validType)) {
      // This is something like a image/* mime type
      if (baseMimeType === validType.replace(/\/.*$/, "")) {
        return true;
      }
    } else {
      if (mimeType === validType) {
        return true;
      }
    }
  }

  return false;
};

var validateSize = function (file, maxSize) {
  if (!maxSize) {
    return true;
  }

  var bytes = sizeToBytes(maxSize);
  return file.size <= bytes;
};

var FileData;

FileData = function (data, options = {}) {
  var self = this;
  self.raw = data;
  self.file = data.file instanceof File ? data.file : data;
  self.url = null;
  self.urlResized = null;
  self.lastKnownSrc = null;
  self._progress = !isNaN(data.progress) ? data.progress : false;
  self.width = FileData.defaultWidth;
  self.height = FileData.defaultHeight;
  self.resizeLimit = FileData.defaultResizeLimit;
  self.read = !!options.read;
  self.image = {};
  self.dimensions = {
    width: 0,
    height: 0
  };
  self.error = data.error;
  self.options = options;
  self.maxSize = options.maxSize;
  self.accept = options.accept;
  self.isPlayingAv = false;
  self.id = Math.random() + ':' + new Date().getTime();
  self.videoThumbnail = data.videoThumbnail;
  self.imageColor = data.imageColor;
  self.upload = null;

  self.hasProgress = function () {
    return !isNaN(this._progress); // && this._progress <= 100;
  };

  self.progress = function (value) {
    if (value !== undefined) {
      self._progress = value;
      return;
    }

    return self._progress || 0;
  };

  self.src = function () {
    if (self.isImage()) {
      return self.urlResized || self.url || self.file.url;
    }

    if (self.isPlayableVideo()) {
      return self.videoThumbnail || '';
    }

    return '';
  };

  self.size = function () {
    if (!this.file) {
      return '';
    }

    return bytesToSize(this.file.size);
  };

  self.ext = function () {
    if (self.file && self.file.name.indexOf('.') !== -1) {
      return self.file.name.split('.').pop();
    }

    return '?'; // return self.file.type.split('/').shift();
  };

  self.name = function (withoutExt) {
    var name = this.file && this.file.name;

    if (withoutExt) {
      var ext = self.ext();

      if (ext != '?') {
        return name.substr(0, name.length - (ext.length + 1));
      }
    }

    return name;
  };

  self.isDarkColor = function () {
    if (self.imageColor) {
      var rgb = self.imageColor;
      var darkPoint = 20;
      return rgb[0] <= darkPoint && rgb[1] <= darkPoint && rgb[2] <= darkPoint;
    }

    return false;
  };

  self.color = function () {
    if (self.imageColor) {
      var rgb = self.imageColor;
      return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
    }

    if (self.isImage()) {
      return 'transparent';
    }

    var ext = self.ext();
    var svgIcon = self.icon(); // var svgIcon = getIconFromExt(ext);

    if (svgIcon.color) {
      return svgIcon.color;
    } // return colorByHashCode(self.file.type);


    return colorByHashCode(ext);
  };

  self.isImage = function () {
    return self.file && self.file.type.indexOf('image') != -1;
  };

  self.isVideo = function () {
    return self.file && self.file.type.indexOf('video') != -1;
  };

  self.isPlayableVideo = function () {
    return self.icon().category == 'video-playable';
  };

  self.isAudio = function () {
    return self.file && self.file.type.indexOf('audio') != -1;
  };

  self.isPlayableAudio = function () {
    return self.icon().category == 'audio-playable';
  };

  self.isText = function () {
    return self.file && self.file.type.indexOf('text') != -1;
  };

  self.setUrl = function (url) {
    return new Promise(function (resolve, reject) {
      self.url = url;

      if (self.isImage()) {
        self.resizeImage().then(function () {
          resolve(self);
        }, reject);
        return;
      }

      resolve(self);
    });
  };

  self.imageResized = function (resized) {
    self.urlResized = resized.url;
    self.image = resized.image;

    if (resized.image && resized.image.width && resized.image.height) {
      self.dimensions.width = resized.image.width;
      self.dimensions.height = resized.image.height;
    }

    self.lastKnownSrc = self.urlResized;
    self.imageColor = resized.color;
  };

  self.resizeImage = function () {
    return new Promise(function (resolve, reject) {
      resizeImage({
        file: self.file,
        resizeLimit: self.resizeLimit,
        // width: self.width,
        // height: self.height,
        binary: false,
        url: self.url
      }, self).then(function (resized) {
        self.imageResized(resized);
        resolve(self);
      }).catch(reject);
    });
  };

  self.icon = function () {
    var ext = self.ext();
    var svgIcon = getIconFromExt(ext);
    return svgIcon; // var ext = self.ext().toLowerCase();
    // var cat = extensionsMap[ext];
    // return icons[cat] || icons.other;
  };

  self.validate = function () {
    var validType = validateType(self.file, self.accept);
    var validSize = validateSize(self.file, self.maxSize);

    if (!validType || !validSize) {
      self.error = {
        type: !validType,
        size: !validSize
      };
    } else {
      self.error = false;
    }
  };

  self.validate(); // self.initVideo();
}; // FileData.defaultResizeLimit = 200;


FileData.defaultResizeLimit = 360;
FileData.defaultWidth = FileData.defaultResizeLimit; // FileData.defaultHeight = FileData.defaultResizeLimit;

FileData.defaultHeight = FileData.defaultResizeLimit * (3 / 4); // 4:3 aspect ratio

FileData.all = function (filesDataRaw, options) {
  var promises = [];
  filesDataRaw.forEach(function (fileDataRaw) {
    promises.push(FileData.fromRaw(fileDataRaw, options));
  });
  return Promise.all(promises);
};

FileData.fromRaw = function (fileDataRaw, options) {
  var fileData = new FileData(fileDataRaw, options);
  var promise = fileData.setUrl(fileDataRaw.url);
  fileDataRaw.progress = fileData.progress; // convert it as a function

  return promise;
};

FileData.toRaw = function (filesData) {
  var filesDataRaw = [];
  filesData.forEach(function (fileData) {
    var fileDataRaw = fileData.raw || {};
    fileDataRaw.url = fileData.url;
    fileDataRaw.urlResized = fileData.urlResized;
    fileDataRaw.src = fileData.src;
    fileDataRaw.name = fileData.file.name;
    fileDataRaw.lastModified = fileData.file.lastModified;
    fileDataRaw.sizeText = fileData.size();
    fileDataRaw.size = fileData.file.size;
    fileDataRaw.type = fileData.file.type;
    fileDataRaw.ext = fileData.ext();
    fileDataRaw.color = fileData.color();
    fileDataRaw.file = fileData.file;
    fileDataRaw.progress = fileData.progress; // pass it as a function

    fileDataRaw.error = fileData.error;
    fileDataRaw.dimensions = fileData.dimensions;
    filesDataRaw.push(fileDataRaw);
  });
  return filesDataRaw;
};

FileData.readFile = function (fileData) {
  return new Promise(function (resolve, reject) {
    if (!fileData.read) {
      fileData.setUrl(null);
      resolve(fileData);
      return;
    }

    var reader = new FileReader();

    reader.onload = function (readerEvent) {
      fileData.setUrl(readerEvent.target['result']).then(function () {
        resolve(fileData);
      }, reject);
    };

    reader.readAsDataURL(fileData.file);
  });
};

FileData.readFiles = function (filesData) {
  var promises = [];
  filesData.forEach(function (fileData) {
    promises.push(FileData.readFile(fileData));
  });
  return Promise.all(promises);
};

/* harmony default export */ var file_data = (FileData);
// CONCATENATED MODULE: ./src/lib/ajax-request.js
/* inspired by axios */
class AjaxRequest {
  createError(message, code, request, response) {
    var error = new Error(message);

    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    return error;
  }

  settle(resolve, reject, response) {
    var validateStatus = function (status) {
      return status >= 200 && status < 300;
    }; // Note: status is not exposed by XDomainRequest


    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(this.createError('Request failed with status code ' + response.status, null, response.request, response));
    }
  }

  request(method, url, formData = null, configureFn = null) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      var loadEvent = 'onreadystatechange';
      request.open(method, url, true); // Listen for ready state

      request[loadEvent] = () => {
        if (!request || request.readyState !== 4) {
          return;
        } // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request


        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        } // Prepare the response


        var responseHeaders = request.getAllResponseHeaders();
        var responseData = request.responseText;
        var contentType = request.getResponseHeader('Content-Type');

        if (contentType && contentType.indexOf('application/json') != -1) {
          responseData = JSON.parse(responseData);
        }

        var response = {
          data: responseData,
          // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          request: request
        };
        this.settle(resolve, reject, response); // Clean up request

        request = null;
      }; // Handle browser request cancellation (as opposed to a manual cancellation)


      request.onabort = () => {
        if (!request) {
          return;
        }

        reject(this.createError('Request aborted', 'ECONNABORTED', request)); // Clean up request

        request = null;
      }; // Handle low level network errors


      request.onerror = () => {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(this.createError('Network Error', null, request)); // Clean up request

        request = null;
      }; // Handle timeout


      request.ontimeout = () => {
        reject(this.createError('timeout exceeded', 'ECONNABORTED', request)); // Clean up request

        request = null;
      }; // // Handle progress if needed
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
  }

  post(url, formData, configureFn = null) {
    return this.request('POST', url, formData, configureFn);
  }

  delete(url, formData, configureFn = null) {
    return this.request('DELETE', url, formData, configureFn);
  }

}

/* harmony default export */ var ajax_request = (new AjaxRequest());
// CONCATENATED MODULE: ./src/lib/upload-helper.js


class upload_helper_UploadHelper {
  useAxios(axios) {
    this.axios = axios;
  }

  addHeaders(xhr, headers) {
    xhr.setRequestHeader('Accept', 'application/json');

    if (headers) {
      for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    return xhr;
  }

  doUpload(url, headers, formData, progressCallback, configureFn) {
    return ajax_request.post(url, formData, xhr => {
      this.addHeaders(xhr, headers);
      xhr.upload.addEventListener('progress', progressCallback, false);
      configureFn(xhr);
    });
  }

  doDeleteUpload(url, headers, data, configureFn) {
    if (typeof data != 'string') {
      data = JSON.stringify(data);
    }

    return ajax_request.delete(url, data, xhr => {
      xhr.setRequestHeader('Content-Type', 'application/json');
      this.addHeaders(xhr, headers);
      configureFn(xhr);
    });
  }

  doUploadAxios(axios, formData, progressCallback) {
    return axios.post('/upload', formData, {
      onUploadProgress: progressCallback
    });
  }

  doDeleteUploadAxios(axios, data, configureFn) {
    return axios.delete('/upload', data, {});
  }

  prepareUploadError(fileData, err) {
    var errorText = err.message;

    if (err.response && err.response.data) {
      try {
        var errorMsg = err.response.data.error || JSON.parse(err.response.data).error;
        errorText = errorMsg;
      } catch (e) {}
    }

    if (!fileData.error) {
      fileData.error = {};
    }

    fileData.error.upload = errorText;
  }

  upload(url, headers, filesData, progressFn) {
    var self = this;

    progressFn = progressFn || function () {};

    var promises = [];

    function updateOverallProgress() {
      var prgTotal = 0;

      for (var i = 0; i < filesData.length; i++) {
        prgTotal += filesData[i].progress();
      }

      progressFn(prgTotal / filesData.length);
    }

    for (let i = 0; i < filesData.length; i++) {
      let fileData = filesData[i];
      var formData = new FormData();
      formData.append('file', fileData.file);

      (function (fileData) {
        var promise = self.doUpload(url, headers, formData, function (progressEvent) {
          var percentCompleted = progressEvent.loaded * 100 / progressEvent.total;
          var percentCompletedRounded = Math.round(percentCompleted);
          fileData.progress(percentCompleted);
          updateOverallProgress();
        }, function (xhr) {
          fileData.xhr = xhr;
        });
        promise.then(function (response) {
          delete fileData.xhr;
          fileData.upload = response.data;
        }
        /* */
        , function (err) {
          self.prepareUploadError(fileData, err);
        }
        /* */
        );
        promises.push(promise);
      })(fileData);
    }

    return Promise.all(promises);
  }

  deleteUpload(url, headers, fileData) {
    return new Promise((resolve, reject) => {
      if (fileData.xhr) {
        fileData.xhr.abort();
      }

      if (fileData.upload) {
        this.doDeleteUpload(url, headers, fileData.upload, xhr => {}).then(result => {
          resolve(result);
        }, err => {
          this.prepareUploadError(fileData, err);
          reject(err);
        });
      }
    });
  }

}

/* harmony default export */ var upload_helper = (new upload_helper_UploadHelper());
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueFileAgent.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var VueFileAgentvue_type_script_lang_js_ = ({
  props: ['uploadUrl', 'uploadHeaders', 'multiple', 'deletable', 'read', 'accept', 'value', 'progress', 'helpText', 'maxSize', 'maxFiles', 'errorText', 'meta', 'compact'],
  components: {
    VueFileIcon: VueFileIcon
  },
  data: function () {
    return {
      filesData: [],
      filesDataRaw: [],
      isDragging: false,
      overallProgress: 0
    };
  },
  computed: {
    canAddMore() {
      if (!this.hasMultiple) {
        return this.filesData.length === 0;
      }

      if (!this.maxFiles) {
        return true;
      }

      return this.filesData.length < this.maxFiles;
    },

    helpTextComputed() {
      if (this.helpText) {
        return this.helpText;
      }

      return 'Choose ' + (this.hasMultiple ? 'files' : 'file') + ' or drag & drop here';
    },

    errorTextComputed() {
      var errorText = {
        common: 'Invalid file.',
        type: 'Invalid file type.',
        size: 'Files should not exceed ' + this.maxSize + ' in size'
      };

      if (this.errorText) {
        if (this.errorText.type) {
          errorText.type = this.errorText.type;
        }

        if (this.errorText.size) {
          errorText.size = this.errorText.size;
        }

        if (this.errorText.common) {
          errorText.common = this.errorText.common;
        }
      }

      return errorText;
    },

    isDeletable() {
      if (typeof this.deletable == 'string') {
        return this.deletable !== 'false';
      }

      return !!this.deletable;
    },

    hasMultiple: function () {
      if (typeof this.multiple == 'string') {
        return this.multiple !== 'false';
      }

      if (this.multiple === undefined) {
        return Array.isArray(this.value);
      }

      return !!this.multiple;
    },
    shouldRead: function () {
      if (typeof this.read == 'string') {
        return this.read === 'true';
      }

      return !!this.read;
    },
    prvWidth: function () {
      return file_data.defaultWidth;
    },
    prvHeight: function () {
      return file_data.defaultHeight;
    }
  },
  methods: {
    createThumbnail(fileData, video, destroy = false) {
      var canvas = this.$refs.thumbnailCanvas;
      var ctx = canvas.getContext('2d');
      var loadedmetadata = false;
      var loadeddata = false;
      var prvWidth = this.prvWidth;
      var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;

      var tryGetThumbnail = function () {
        if (!(loadedmetadata && loadeddata)) {
          return;
        }

        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        fileData.imageColor = getAverageColor(imageData.data);
        var url = canvas.toDataURL();
        fileData.videoThumbnail = url;

        if (destroy) {
          // video.currentTime = 0; // Reset video current time
          revokeObjectURL(video.src);
        }
      }; // Load metadata of the video to get video duration and dimensions


      video.addEventListener('loadedmetadata', function () {
        // var video_duration = video.duration;
        canvas.width = prvWidth;
        canvas.height = canvas.width / video.videoWidth * video.videoHeight;
        fileData.dimensions.width = video.videoWidth;
        fileData.dimensions.height = video.videoHeight;
        video.currentTime = 1; // video time

        loadedmetadata = true;
        tryGetThumbnail();
      });
      video.addEventListener('loadeddata', function () {
        loadeddata = true;
        tryGetThumbnail();
      });
    },

    initVideo(fileData) {
      if (!fileData.isPlayableVideo()) {
        return;
      }

      var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
      var video = document.createElement('video');
      video.src = createObjectURL(fileData.file);
      this.createThumbnail(fileData, video, true);
      video.load();
    },

    playAv(fileData, id) {
      if (fileData.stopAv) {
        fileData.stopAv();
        return;
      }

      var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
      var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
      var wrapper = this.$el.querySelector('#' + id);
      var player = document.createElement(fileData.isAudio() ? 'audio' : 'video');

      if (fileData.isPlayableVideo()) {
        this.createThumbnail(fileData, player);
        player.poster = fileData.src();
      }

      player.controls = true; // player.style.width = this.prvWidth + 'px';

      wrapper.appendChild(player); // var player = this.$el.querySelector('#' + id);

      var url = fileData.url || createObjectURL(fileData.file);
      player.src = url;
      player.play();
      fileData.isPlayingAv = true;

      fileData.stopAv = function () {
        player.src = null;
        wrapper.removeChild(player);
        revokeObjectURL(url);
        fileData.isPlayingAv = false;
        fileData.stopAv = null;
      };
    },

    getErrorMessage(fileData) {
      var error = fileData.error;

      if (!error) {
        return '';
      }

      var errorText = this.errorTextComputed;

      if (error.type) {
        return errorText.type;
      } else if (error.size) {
        return errorText.size;
      } else if (error.upload) {
        return fileData.upload && fileData.upload.error ? fileData.upload.error : error.upload;
      }

      return errorText.common;
    },

    upload(url, headers, filesData) {
      var validFilesData = [];

      for (var i = 0; i < filesData.length; i++) {
        if (!filesData[i].error) {
          validFilesData.push(filesData[i]);
        }
      }

      return upload_helper.upload(url, headers, validFilesData, overallProgress => {
        this.overallProgress = overallProgress;
      });
    },

    deleteUpload(url, headers, fileData) {
      if (this.filesData.length < 1) {
        this.overallProgress = 0;
      }

      return upload_helper.deleteUpload(url, headers, fileData);
    },

    autoUpload(filesData) {
      if (!this.uploadUrl) {
        return;
      }

      this.upload(this.uploadUrl, this.uploadHeaders, filesData);
    },

    autoDeleteUpload(fileData) {
      if (!this.uploadUrl) {
        return Promise.resolve(false);
      }

      return this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData);
    },

    equalFiles(file1, file2) {
      return  true && file1.name === file2.name && file1.size === file2.size && file1.type === file2.type && // file1.lastModifiedDate.getTime() === file2.lastModifiedDate.getTime() &&
      file1.lastModified === file2.lastModified;
    },

    isFileAddedAlready(file) {
      for (var i = 0; i < this.filesData.length; i++) {
        if (this.equalFiles(file, this.filesData[i].file)) {
          return true;
        }
      }

      return false;
    },

    handleFiles: function (files) {
      if (this.hasMultiple && !this.canAddMore) {
        return;
      }

      var filesData = [];
      var filesFiltered = [];

      for (var i = 0; i < files.length; i++) {
        if (this.isFileAddedAlready(files[i])) {
          continue;
        }

        filesFiltered.push(files[i]);
      }

      files = filesFiltered;

      if (this.maxFiles && files.length > this.maxFiles - this.filesData.length) {
        files = files.slice(0, this.maxFiles - this.filesData.length);
      }

      for (var i = 0; i < files.length; i++) {
        filesData.push(new file_data({
          file: files[i]
        }, {
          read: this.shouldRead,
          maxSize: this.maxSize,
          accept: this.accept
        }));
      } //////////// disables list transitions
      // var allFilesData = this.filesData.concat(filesData);
      // this.filesData = allFilesData;
      ////////////


      for (var i = 0; i < filesData.length; i++) {
        // this.filesData.push(filesData[i]);
        if (filesData[i].file.size <= 20 * 1024 * 1024) {
          // <= 20MB
          this.initVideo(filesData[i]);
        }
      }

      if (this.hasMultiple) {
        this.filesData.splice(this.filesData.length, 0, ...filesData);
      } else {
        this.filesData = filesData;
      }

      var self = this;
      var allFilesData = this.filesData;
      file_data.readFiles(filesData).then(function (filesData) {
        // var filesDataRaw = FileData.toRaw(filesData);
        var allFilesDataRaw = file_data.toRaw(allFilesData);
        self.filesDataRaw = allFilesDataRaw; // filesDataRaw = self.hasMultiple ? filesDataRaw : filesDataRaw[0];

        allFilesDataRaw = Array.isArray(self.value) ? allFilesDataRaw : allFilesDataRaw[0];
        self.$emit('input', allFilesDataRaw); // self.$emit('select', filesData);	

        self.$emit('select', file_data.toRaw(filesData));
      });
      this.autoUpload(filesData);
    },
    filesChanged: function (event) {
      var files = event.target.files;
      this.$emit('change', event);

      if (!files[0]) {
        // this.imgSrc = this.lastKnownSrc;
        return;
      }

      this.handleFiles(files);

      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null; // do not use '' because chrome won't fire change event for same file
      }
    },
    drop: function (event) {
      this.isDragging = false;
      event.stopPropagation();
      event.preventDefault();
      var files = event.dataTransfer.files; // FileList object.

      this.$emit('drop', event);

      if (!files[0]) {
        return;
      }

      if (!this.hasMultiple) {
        files = [files[0]];
      }

      this.handleFiles(files);
    },
    dragOver: function (event) {
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragLeave: function (event) {
      this.isDragging = false;
    },

    removeFileData(fileData) {
      var i;

      if (fileData instanceof file_data) {
        i = this.filesData.indexOf(fileData);
      } else {
        i = this.filesDataRaw.indexOf(fileData);
      }

      this.filesData.splice(i, 1);
      this.filesDataRaw.splice(i, 1);
      this.$emit('input', this.filesDataRaw); // this.$emit('delete', fileData);

      this.$emit('delete', file_data.toRaw([fileData])[0]);
      this.autoDeleteUpload(fileData).then(res => {}, err => {
        this.filesData.splice(i, 1, fileData);
      });
    },

    checkValue() {
      var self = this;
      var filesDataRaw = this.value || [];
      filesDataRaw = Array.isArray(filesDataRaw) ? filesDataRaw : [filesDataRaw];
      var fdPromises = [];
      var filesDataRawNew = [];

      for (var i = 0; i < filesDataRaw.length; i++) {
        var existingIndex = this.filesDataRaw.indexOf(filesDataRaw[i]);

        if (existingIndex !== -1) {
          fdPromises.push(Promise.resolve(this.filesData[existingIndex]));
          filesDataRawNew[i] = this.filesDataRaw[existingIndex];
        } else {
          fdPromises.push(file_data.fromRaw(filesDataRaw[i], {
            read: this.shouldRead,
            maxSize: this.maxSize,
            accept: this.accept
          }));
          filesDataRawNew.push(filesDataRaw[i]);
        }
      }

      this.filesDataRaw = filesDataRawNew;
      Promise.all(fdPromises).then(function (filesData) {
        self.filesData = filesData;
      });
    }

  },
  created: function () {
    this.checkValue();
  },
  watch: {
    value() {
      this.checkValue();
    }

  }
});
// CONCATENATED MODULE: ./src/components/VueFileAgent.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VueFileAgentvue_type_script_lang_js_ = (VueFileAgentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VueFileAgent.vue





/* normalize component */

var VueFileAgent_component = normalizeComponent(
  components_VueFileAgentvue_type_script_lang_js_,
  VueFileAgentvue_type_template_id_23f5b5dc_render,
  VueFileAgentvue_type_template_id_23f5b5dc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueFileAgent = (VueFileAgent_component.exports);
// CONCATENATED MODULE: ./src/index.js



var VueFileAgentPlugin = function VueFileAgentPlugin() {};

VueFileAgentPlugin.install = function (Vue, options) {
  Vue.component('VueFileIcon', VueFileIcon);
  Vue.component('VueFileAgent', VueFileAgent);
}; // auto install


if (typeof window !== 'undefined' && window.Vue) {
  VueFileAgentPlugin.install(window.Vue);
}

/* harmony default export */ var src = (VueFileAgentPlugin);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
//# sourceMappingURL=vue-file-agent.common.js.map