/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("/* global messages */\n\nconst notification = document.querySelector('.mdl-js-snackbar');\n\n// FLASH\n\ndocReady(() => {\n  for (let type in messages) {\n    messages[type].forEach((message) => notification.MaterialSnackbar.showSnackbar({ message }));\n  }\n});\n\n// MODALS\n\n[...document.querySelectorAll('[data-show-modal')].forEach(el => {\n  el.addEventListener('click', (e) => {\n    document.querySelector(e.currentTarget.getAttribute('href')).showModal();\n  });\n});\n\n[...document.querySelectorAll('[data-close-modal]')].forEach(el => {\n  el.addEventListener('click', (e) => {\n    e.currentTarget.closest('.mdl-dialog').close();\n  });\n});\n\n// UTILS\n\nfunction docReady(f) {\n  /in/.test(document.readyState) ? setTimeout(() => docReady(f), 9) : f();\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcz9iYzY2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBtZXNzYWdlcyAqL1xuXG5jb25zdCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWRsLWpzLXNuYWNrYmFyJyk7XG5cbi8vIEZMQVNIXG5cbmRvY1JlYWR5KCgpID0+IHtcbiAgZm9yIChsZXQgdHlwZSBpbiBtZXNzYWdlcykge1xuICAgIG1lc3NhZ2VzW3R5cGVdLmZvckVhY2goKG1lc3NhZ2UpID0+IG5vdGlmaWNhdGlvbi5NYXRlcmlhbFNuYWNrYmFyLnNob3dTbmFja2Jhcih7IG1lc3NhZ2UgfSkpO1xuICB9XG59KTtcblxuLy8gTU9EQUxTXG5cblsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaG93LW1vZGFsJyldLmZvckVhY2goZWwgPT4ge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpLnNob3dNb2RhbCgpO1xuICB9KTtcbn0pO1xuXG5bLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2xvc2UtbW9kYWxdJyldLmZvckVhY2goZWwgPT4ge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5tZGwtZGlhbG9nJykuY2xvc2UoKTtcbiAgfSk7XG59KTtcblxuLy8gVVRJTFNcblxuZnVuY3Rpb24gZG9jUmVhZHkoZikge1xuICAvaW4vLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSkgPyBzZXRUaW1lb3V0KCgpID0+IGRvY1JlYWR5KGYpLCA5KSA6IGYoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);