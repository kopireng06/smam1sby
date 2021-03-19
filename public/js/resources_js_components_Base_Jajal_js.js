(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Base_Jajal_js"],{

/***/ "./resources/js/components/Base/Jajal.js":
/*!***********************************************!*\
  !*** ./resources/js/components/Base/Jajal.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");




var Navbar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.lazy(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./Navbar */ "./resources/js/components/Base/Navbar.js"));
}); // const useWindowsWidth = () => {
//     const [isScreenSmall, setIsScreenSmall] = useState(false);
//     let checkScreenSize = () => {
//       setIsScreenSmall(window.innerWidth < 600);
//     };
//     useEffect(() => {
//       checkScreenSize();
//       window.addEventListener("resize", checkScreenSize);
//       //console.log(isScreenSmall);
//       return () => window.removeEventListener("resize", checkScreenSize);
//     });
//     return isScreenSmall;
//   };

var Jajal = function Jajal() {
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {});
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      onClick: function onClick() {},
      children: "HALO"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: "sek entenono"
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Navbar, {})
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Jajal);

/***/ })

}]);