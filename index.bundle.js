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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\r\nconst getSearchContainer = document.querySelector('#searchContainer');\r\nconst topSec = document.querySelector('.topSection');\r\nconst topCon = document.querySelector('.topContentContainer');\r\nconst getwhiteSection = document.querySelector('#whiteSection');\r\nconst getIconSection = document.querySelector('#iconsSection')\r\nconst getP = document.querySelector('#pText')\r\nconst getPer = document.querySelector('.persuasiveText')\r\nconst getLoginButton = document.querySelector('#loginButton');\r\nconst getFooter = document.querySelector('.footer');\r\nconst getServices = document.querySelector('#services');\r\nlet oldScrollStatus = 0;\r\nwindow.addEventListener('scroll', () =>{\r\n    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;\r\n    if (currentScrollTop > oldScrollStatus){\r\n        getFooter.style.opacity = \"0\";\r\n        setTimeout(()=>{\r\n            getFooter.style.display ='none';\r\n        },300)\r\n    }\r\n    else{\r\n        setTimeout(()=>{\r\n            getFooter.style.opacity ='1';\r\n            getFooter.style.display ='flex';\r\n        },300)\r\n    }\r\n    oldScrollStatus = currentScrollTop;\r\n})\r\ngetLoginButton.addEventListener('click', () => {\r\n    window.location.href = 'login.html'\r\n});\r\nconst modifyTop = () => {\r\n    getPer.style.display = 'none';\r\n    getSearchContainer.style.maxHeight ='50px';\r\n    getwhiteSection.style.minHeight ='150px'\r\n    getIconSection.style.maxHeight='72px'\r\n}\r\nconst resetTop = () => {\r\n    getPer.style.display = 'flex';\r\n    getP.style.minHeight = '57px'\r\n}\r\nconst scrollNumber =  windowScrollStatus = () =>{\r\n    const windowscrossY = window.scrollY;\r\n    return windowscrossY;\r\n}\r\nwindow.addEventListener('scroll', function(){\r\n    if (scrollNumber() > 20){\r\n        modifyTop();\r\n       \r\n    }\r\n    else{\r\n        getwhiteSection.style.minHeight ='288px';\r\n        resetTop();\r\n    }\r\n})\r\n\r\nconst getFeedback = document.querySelector('#feedback')\r\ngetFeedback.addEventListener('click', () =>{\r\n    window.location.href = \"feedback.html\"\r\n})\r\n\r\ngetServices.addEventListener('click', () =>{\r\n    window.location.href = 'services.html'\r\n})\r\n\r\nconst getSearchForm = document.querySelector('.locationModal');\r\nconst getLocation = document.querySelector('#location').addEventListener('click', () => {\r\n    getSearchForm.style.display = 'block'\r\n})\r\nconst getPricing = document.querySelector('#pricing').addEventListener('click', () => {\r\n    getSearchForm.style.display = 'block'\r\n})\r\nconst getOrientation = document.querySelector('#orientation').addEventListener('click', () => {\r\n    getSearchForm.style.display = 'block'\r\n})\r\nconst getSearchButton = document.querySelector('#searchButtonContainer')\r\n    .addEventListener('click', () => {\r\n        getSearchForm.style.display = 'none';\r\n    })\r\n\n\n//# sourceURL=webpack://techno/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;