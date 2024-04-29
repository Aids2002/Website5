/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/servicess.js":
/*!**************************!*\
  !*** ./src/servicess.js ***!
  \**************************/
/***/ (() => {

eval("const getLoginCont = document.querySelector('.loginContainer');\r\nconst getLogo = document.querySelector('#logoContainer');\r\nconst getFooter = document.querySelector('.footer');\r\nconst getRent = document.querySelector('#rent');\r\nconst getFeedback = document.querySelector('#feedback');\r\nconst goMain = (variable) =>{\r\n    variable.addEventListener('click', () =>{\r\n        window.location.href = 'index.html'\r\n    })\r\n}\r\ngoMain(getLogo);\r\ngoMain(getRent);\r\n\r\n\r\nlet oldScrollStatus = 0;\r\nwindow.addEventListener('scroll', () =>{\r\n    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;\r\n    if (currentScrollTop > oldScrollStatus){\r\n        getFooter.style.opacity = \"0\";\r\n        setTimeout(()=>{\r\n            getFooter.style.display ='none';\r\n        },300)\r\n    }\r\n    else{\r\n        setTimeout(()=>{\r\n            getFooter.style.opacity ='1';\r\n            getFooter.style.display ='flex';\r\n        },300)\r\n    }\r\n    oldScrollStatus = currentScrollTop;\r\n})\r\n\r\ngetFeedback.addEventListener('click', () =>{\r\n    window.location.href = 'feedback.html'\r\n})\r\ngetLoginCont.addEventListener('click', () =>{\r\n    window.location.href = 'login.html'\r\n})\n\n//# sourceURL=webpack://techno/./src/servicess.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/servicess.js"]();
/******/ 	
/******/ })()
;