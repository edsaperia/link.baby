(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./offline.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./offline.js":
/*!********************!*\
  !*** ./offline.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _apolloServerExpress = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\n\nvar _cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar _cors2 = _interopRequireDefault(_cors);\n\nvar _http = __webpack_require__(/*! http */ \"http\");\n\nvar _graphqlSubscriptions = __webpack_require__(/*! graphql-subscriptions */ \"graphql-subscriptions\");\n\nvar _apolloBoost = __webpack_require__(/*! apollo-boost */ \"apollo-boost\");\n\nvar _apolloBoost2 = _interopRequireDefault(_apolloBoost);\n\nvar _nodeFetch = __webpack_require__(/*! node-fetch */ \"node-fetch\");\n\nvar _nodeFetch2 = _interopRequireDefault(_nodeFetch);\n\nvar _graphqlTag = __webpack_require__(/*! graphql-tag */ \"graphql-tag\");\n\nvar _graphqlTag2 = _interopRequireDefault(_graphqlTag);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _graphqlImport = __webpack_require__(/*! graphql-import */ \"graphql-import\");\n\nvar _graphqlTools = __webpack_require__(/*! graphql-tools */ \"graphql-tools\");\n\nvar _subscriptionsTransportWs = __webpack_require__(/*! subscriptions-transport-ws */ \"subscriptions-transport-ws\");\n\nvar _graphql = __webpack_require__(/*! graphql */ \"graphql\");\n\nvar _requestPromiseNative = __webpack_require__(/*! request-promise-native */ \"request-promise-native\");\n\nvar _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);\n\nvar _events = __webpack_require__(/*! ./src/events */ \"./src/events/index.js\");\n\nvar _events2 = _interopRequireDefault(_events);\n\nvar _queries = __webpack_require__(/*! ./src/queries */ \"./src/queries/index.js\");\n\nvar _queries2 = _interopRequireDefault(_queries);\n\nvar _mutations = __webpack_require__(/*! ./src/mutations */ \"./src/mutations/index.js\");\n\nvar _mutations2 = _interopRequireDefault(_mutations);\n\nvar _Token = __webpack_require__(/*! ./src/models/Token */ \"./src/models/Token.js\");\n\nvar _Token2 = _interopRequireDefault(_Token);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst resolvers = {\n\tQuery: _queries2.default,\n\tMutation: _mutations2.default\n};\n\nconst PORT = process.env.PORT || 3000;\n\nconst app = (0, _express2.default)();\n\nconst schemaStr = _fs2.default.readFileSync('schema.graphql', 'utf-8');\n\nconst typeDefs = (0, _graphqlImport.importSchema)(schemaStr);\n\nconst schema = (0, _graphqlTools.makeExecutableSchema)({\n\ttypeDefs,\n\tresolvers\n});\n\nconst authMiddleware = (req, res, next) => {\n\tconst token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];\n\tif (token) {\n\t\t_Token2.default.getUser({ token }).then(user => {\n\t\t\treq.auth = {\n\t\t\t\tuser,\n\t\t\t\ttoken\n\t\t\t};\n\t\t\tnext();\n\t\t}).catch(e => {\n\t\t\tthrow e;\n\t\t});\n\t} else {\n\t\tnext();\n\t}\n};\n\napp.use('*', (0, _cors2.default)({ origin: '*' }));\n\napp.use('/graphql', _bodyParser2.default.json(), authMiddleware, (0, _apolloServerExpress.graphqlExpress)(req => ({\n\tschema,\n\t// formatResponse: formatResponse.bind(logOptions),\n\t// formatError,\n\tcontext: () => {\n\t\t// console.log('local req', req)\n\t\tlet auth = req.auth;\n\t\t// if (req) {\n\t\t// \tauth = req.auth\n\t\t// } else {\n\t\t// \tconsole.log('connection.connectionParams', connection.connectionParams)\n\t\t// \tauth = connection.connectionParams\n\t\t// }\n\n\t\treturn {\n\t\t\tauth,\n\t\t\temit: async ({ type, data }) => {\n\t\t\t\tif (_events2.default[type]) {\n\t\t\t\t\tawait _events2.default[type](Object.assign({}, data, { auth })).then(console.log).catch(console.error);\n\t\t\t\t} else {\n\t\t\t\t\tconsole.error(`unhandled event ${type}`);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n})));\n\napp.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({\n\tendpointURL: process.env.PUBLIC_GRAPHQL_URL\n}));\n\napp.get('/prod-graphiql', (0, _apolloServerExpress.graphiqlExpress)({\n\tendpointURL: 'https://kadr3ldmcngm3futskts6xxehe.appsync-api.eu-west-1.amazonaws.com/graphql'\n}));\n\n// app.listen(PORT, () => console.log(`GraphQL listening on ${PORT}`))\n\napp.listen(PORT, () => {\n\tconsole.log(`Apollo Server is now running on ${process.env.PUBLIC_GRAPHQL_URL}`);\n});\n\n//# sourceURL=webpack:///./offline.js?");

/***/ }),

/***/ "./src/config/db.js":
/*!**************************!*\
  !*** ./src/config/db.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n\tDATABASE_URL,\n\tDATABASE_USER,\n\tDATABASE_PASSWORD,\n\tDATABASE_DB,\n\tMYSQL_HOST,\n\tMYSQL_USER,\n\tMYSQL_PASSWORD,\n\tMYSQL_DATABASE\n} = process.env;\n\nmodule.exports = {\n\thost: DATABASE_URL || MYSQL_HOST,\n\tuser: DATABASE_USER || MYSQL_USER,\n\tpassword: DATABASE_PASSWORD || MYSQL_PASSWORD,\n\tdatabase: DATABASE_DB || MYSQL_DATABASE\n};\n\n//# sourceURL=webpack:///./src/config/db.js?");

/***/ }),

/***/ "./src/config/website.js":
/*!*******************************!*\
  !*** ./src/config/website.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst publicRoot = exports.publicRoot = process.env.WEB_PUBLIC_ROOT;\n\n//# sourceURL=webpack:///./src/config/website.js?");

/***/ }),

/***/ "./src/email/index.js":
/*!****************************!*\
  !*** ./src/email/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.asdf = exports.sendEmail = undefined;\n\nvar _awsSdk = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar _awsSdk2 = _interopRequireDefault(_awsSdk);\n\nvar _login = __webpack_require__(/*! ./login */ \"./src/email/login/index.js\");\n\nvar _login2 = _interopRequireDefault(_login);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst sender = 'link.baby <hello@link.baby>';\n\nconst templates = {\n\tlogin: _login2.default\n};\n\nconst sendEmail = exports.sendEmail = ({ recipient, data, type }) => {\n\tconst ses = new _awsSdk2.default.SES();\n\tconst charset = 'UTF-8';\n\n\tif (!templates[type]) {\n\t\tthrow new Error(`email template ${type} not found`);\n\t}\n\n\tconst subject = templates[type].subject({ data });\n\tconst text = templates[type].text({ data });\n\tconst html = templates[type].html({ data });\n\n\tconst params = {\n\t\tSource: sender,\n\t\tDestination: {\n\t\t\tToAddresses: [recipient]\n\t\t},\n\t\tMessage: {\n\t\t\tSubject: {\n\t\t\t\tData: subject,\n\t\t\t\tCharset: charset\n\t\t\t},\n\t\t\tBody: {\n\t\t\t\tText: {\n\t\t\t\t\tData: text,\n\t\t\t\t\tCharset: charset\n\t\t\t\t},\n\t\t\t\tHtml: {\n\t\t\t\t\tData: html,\n\t\t\t\t\tCharset: charset\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\treturn new Promise((resolve, reject) => {\n\t\tses.sendEmail(params, (err, res) => {\n\t\t\tif (err) {\n\t\t\t\treject(err);\n\t\t\t} else {\n\t\t\t\tresolve(res);\n\t\t\t}\n\t\t});\n\t});\n};\n\nconst asdf = exports.asdf = () => {};\n\n//# sourceURL=webpack:///./src/email/index.js?");

/***/ }),

/***/ "./src/email/login/html.js":
/*!*********************************!*\
  !*** ./src/email/login/html.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = () => `\n<!doctype html>\n<html>\n<head>\n<meta name=\"viewport\" content=\"width=device-width\">\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<meta name=\"x-apple-disable-message-reformatting\" />\n<title>Login to Link Baby</title>\n<style media=\"all\" type=\"text/css\">\n@import url(http://fonts.googleapis.com/css?family=Montserrat:600,700);\n\n@media only screen {\n  .container {\n    padding: 10px;\n  }\n}\n\n\n@media only screen {\n  .content {\n    padding: 10px;\n  }\n}\n\n@media only screen and (max-width: 620px) {\n  table[class=body] h1,\n  table[class=body] h2,\n  table[class=body] h3,\n  table[class=body] h4 {\n    font-weight: 600 !important;\n  }\n  table[class=body] h1 {\n    font-size: 22px !important;\n  }\n  table[class=body] h2 {\n    font-size: 18px !important;\n  }\n  table[class=body] h3 {\n    font-size: 16px !important;\n  }\n  table[class=body] .content,\n  table[class=body] .wrapper {\n    padding: 10px !important;\n  }\n  table[class=body] .container {\n    padding: 0 !important;\n    width: 100% !important;\n  }\n  table[class=body] .btn table,\n  table[class=body] .btn a {\n    width: 100% !important;\n  }\n}\n\n\n@media only screen and (max-width: 620px) {\n  .header {\n    margin-bottom: 10px !important;\n    margin-top: 20px !important;\n  }\n  table[class=body] .wrapper {\n    padding: 40px 20px !important;\n  }\n}\n\n\n@media only screen and (max-width: 620px) {\n  .main.signup .panel:nth-of-type(2),\n    .main.signup .panel:nth-of-type(3) {\n    padding-bottom: 10px !important;\n  }\n}\n\n\n@media only screen and (max-width: 620px) {\n  .main.signup .panel:nth-of-type(1) img.intro {\n    width: 120px !important;\n  }\n}\n\n\n@media only screen and (max-width: 620px) {\n  .main.welcome .panel-intro img.intro {\n    width: 120px !important;\n  }\n}\n\n\n@media only screen and (max-width: 620px) {\n  .main.welcome .panel:not(.panel-intro) {\n    padding-bottom: 10px !important;\n  }\n}\n\n\n@media only screen and (max-width: 620px) {\n  .no-media-query {\n    display: none !important;\n  }\n  .small-screen-block {\n    width: 100% !important;\n    height: auto !important;\n    overflow: inherit !important;\n    float: none !important;\n    display: block !important;\n    max-height: none !important;\n    position: relative !important;\n  }\n}\n\n\n@media only screen {\n  .media-query-available--inline {\n    width: auto !important;\n    min-height: auto !important;\n    overflow: auto !important;\n    float: none !important;\n    display: inline !important;\n    max-height: auto !important;\n  }\n  .media-query-not-vailable {\n    display: none !important;\n  }\n}\n</style>\n<script type=\"application/ld+json\">\n{\n  \"@context\": \"http://schema.org\",\n  \"@type\": \"EmailMessage\",\n  \"potentialAction\": {\n    \"@type\": \"ViewAction\",\n    \"target\": \"$data.link\",\n    \"name\": \"Log in\"\n  },\n  \"description\": \"Log in to Link Baby\"\n}\n</script>\n</head>\n\n<body style=\"margin: 0; font-family: Montserrat, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100% !important; line-height: 1.6em; -webkit-font-smoothing: antialiased; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100% !important; background-color: #f6f6f6;\">\n\n<table class=\"body\" style=\"box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: white;\" width=\"100%\" bgcolor=\"white\">\n<tr>\n<td style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;\" valign=\"top\"></td>\n<td class=\"container\" style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto !important; max-width: 580px; padding: 10px 0; width: 580px;\" width=\"580\" valign=\"top\">\n<div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px 0;\">\n\n<div class=\"header\" style=\"box-sizing: border-box; margin-bottom: 10px; margin-top: 0; width: 100%;\">\n  <table style=\"box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n    <tr>\n      <td style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;\" valign=\"top\">\n        <a href=\"https://link.baby\" target=\"_blank\" style=\"box-sizing: border-box; color: #EF4089; text-decoration: underline;\">\n          <img src=\"https://link.baby/email-logo.png\" height=\"32\" alt=\"link.baby Logo\" style=\"-ms-interpolation-mode: bicubic; max-width: 100%;\">\n        </a>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<table class=\"main login\" style=\"box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border: none; border-radius: 3px; font-size: 15px; line-height: 24px;\" width=\"100%\">\n  <tr>\n    <td class=\"panel panel-dark\" style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; vertical-align: top; border-radius: 8px; margin-top: 0; font-size: 15px; background-color: #0B486B; color: white; padding: 60px 20px;\" valign=\"top\" bgcolor=\"#0B486B\">\n      <table style=\"box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n        <tr>\n          <td style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;\" valign=\"top\">\n\n            <h1 class=\"align-center\" style=\"font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 600; line-height: 32px; margin: auto; margin-bottom: 40px; font-size: 24px; text-transform: none; max-width: 400px; text-align: center; color: #fff !important;\">\n              Tap the button below on your phone to log in to link.baby\n            </h1>\n\n            <table class=\"btn btn-primary\" cellpadding=\"0\" cellspacing=\"0\" style=\"box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: auto; margin-bottom: 25px;\" width=\"100%\">\n              <tr>\n                <td align=\"center\" style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;\" valign=\"top\">\n                  <table cellpadding=\"0\" cellspacing=\"0\" class=\"btn-inner-table\" style=\"box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n                    <tr>\n                      <td style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; background-color: #EF4089; border-radius: 5px; text-align: center;\" valign=\"top\" bgcolor=\"#EF4089\" align=\"center\">\n                        <a href=\"$data.link\" style=\"box-sizing: border-box; line-height: 22px; text-decoration: none; background-color: #EF4089; border: solid 1px #EF4089; border-radius: 5px; cursor: pointer; color: white; font-size: 17px; font-weight: 700; margin: 0; padding: 12px 38px; text-transform: none; border-color: #EF4089; display: inline-block; font-weight: bold;\">\n                          Log in to link.baby\n                        </a>\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n              </tr>\n            </table>\n            <p class=\"align-center\" style=\"font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 500; margin: 0; text-align: center; font-size: 14px; color: white; margin-bottom: 0;\">\n              Once you've logged in, feel free to delete this email.\n            </p>\n\n          </td>\n        </tr>\n      </table>\n    </td>\n  </tr>\n</table>\n</div>\n</td>\n<td style=\"box-sizing: border-box; font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;\" valign=\"top\"></td>\n</tr>\n</table>\n\n</body>\n</html>\n`;\n\n//# sourceURL=webpack:///./src/email/login/html.js?");

/***/ }),

/***/ "./src/email/login/index.js":
/*!**********************************!*\
  !*** ./src/email/login/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _html = __webpack_require__(/*! ./html */ \"./src/email/login/html.js\");\n\nvar _html2 = _interopRequireDefault(_html);\n\nvar _text = __webpack_require__(/*! ./text */ \"./src/email/login/text.js\");\n\nvar _text2 = _interopRequireDefault(_text);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst subject = ({ data }) => 'Log in to link.baby';\n\nconst html = ({ data }) => {\n\tlet template = (0, _html2.default)();\n\tObject.keys(data).forEach(key => {\n\t\ttemplate = template.split(`$data.${key}`).join(data[key]);\n\t});\n\n\treturn template;\n};\n\nconst text = ({ data }) => {\n\tlet template = (0, _text2.default)();\n\tObject.keys(data).forEach(key => {\n\t\ttemplate = template.split(`$data.${key}`).join(data[key]);\n\t});\n\n\treturn template;\n};\n\nexports.default = {\n\tsubject,\n\thtml,\n\ttext\n};\n\n//# sourceURL=webpack:///./src/email/login/index.js?");

/***/ }),

/***/ "./src/email/login/text.js":
/*!*********************************!*\
  !*** ./src/email/login/text.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = () => `( https://link.baby)\n\n**********************************************************\nTap the button below on your phone to log in to link.baby\n**********************************************************\n\nLog in to link.baby ( $data.link )\n\nOnce you've logged in, feel free to delete this email.\n`;\n\n//# sourceURL=webpack:///./src/email/login/text.js?");

/***/ }),

/***/ "./src/events/index.js":
/*!*****************************!*\
  !*** ./src/events/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst handlers = {};\n\nexports.default = handlers;\n\n//# sourceURL=webpack:///./src/events/index.js?");

/***/ }),

/***/ "./src/models/Model.js":
/*!*****************************!*\
  !*** ./src/models/Model.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nconst path = __webpack_require__(/*! path */ \"path\");\nconst { Model } = __webpack_require__(/*! objection */ \"objection\");\nconst config = __webpack_require__(/*! ./knexfile */ \"./src/models/knexfile.js\").docker;\nconst knex = __webpack_require__(/*! knex */ \"knex\")(config);\n__webpack_require__(/*! mysql */ \"mysql\"); // to ensure it gets bundled in\nModel.knex(knex);\n\nclass SplitThisModel extends Model {\n\tstatic get modelPaths() {\n\t\treturn [path.resolve(__dirname)];\n\t}\n}\n\nexports.default = SplitThisModel;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/models/Model.js?");

/***/ }),

/***/ "./src/models/Token.js":
/*!*****************************!*\
  !*** ./src/models/Token.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _Model = __webpack_require__(/*! ./Model */ \"./src/models/Model.js\");\n\nvar _Model2 = _interopRequireDefault(_Model);\n\nvar _User = __webpack_require__(/*! ./User */ \"./src/models/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Token extends _Model2.default {\n\tstatic get tableName() {\n\t\treturn 'auth_token';\n\t}\n\n\tstatic get relationMappings() {\n\t\treturn {};\n\t}\n}\n\nToken.getUser = async ({ token }) => {\n\tconst user = await _User2.default.query().select('*').where('id', Token.query().select('userId').where({ token })).first();\n\n\treturn user;\n};\n\nexports.default = Token;\n\n//# sourceURL=webpack:///./src/models/Token.js?");

/***/ }),

/***/ "./src/models/User.js":
/*!****************************!*\
  !*** ./src/models/User.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _v = __webpack_require__(/*! uuid/v4 */ \"uuid/v4\");\n\nvar _v2 = _interopRequireDefault(_v);\n\nvar _Model = __webpack_require__(/*! ./Model */ \"./src/models/Model.js\");\n\nvar _Model2 = _interopRequireDefault(_Model);\n\nvar _Token = __webpack_require__(/*! ./Token */ \"./src/models/Token.js\");\n\nvar _Token2 = _interopRequireDefault(_Token);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass User extends _Model2.default {\n\tstatic get tableName() {\n\t\treturn 'user';\n\t}\n\n\tstatic get relationMappings() {\n\t\treturn {};\n\t}\n}\n\nUser.get = async ({ id }) => {\n\tconst [user] = await Promise.all([User.query().select('*').where('id', id).first()]);\n\n\treturn user;\n};\n\nUser.merge = async ({ existingUserId, newUserId }) => {};\n\nUser.login = async ({ emailAddress }, context) => {\n\tlet userId;\n\n\tconst currentUserId = context.auth && context.auth.user && context.auth.user.id;\n\n\tif (emailAddress) {\n\t\tconst user = await User.query().select('id').where('emailAddress', emailAddress).first();\n\t\tif (user) {\n\t\t\tuserId = user.id;\n\t\t}\n\t}\n\n\tif (!userId) {\n\t\tconst user = await User.query().skipUndefined().insert({\n\t\t\tid: (0, _v2.default)(),\n\t\t\temailAddress\n\t\t});\n\n\t\tuserId = user.id;\n\t}\n\n\tif (currentUserId && userId && currentUserId !== userId) {\n\t\tawait User.merge({ existingUserId: currentUserId, newUserId: userId });\n\t}\n\n\tif (userId) {\n\t\tconst accessToken = (0, _v2.default)();\n\t\tawait _Token2.default.query().insert({\n\t\t\tid: (0, _v2.default)(),\n\t\t\tuserId,\n\t\t\ttoken: accessToken\n\t\t});\n\n\t\treturn {\n\t\t\taccessToken\n\t\t};\n\t}\n\n\tthrow new Error('invalid');\n};\n\nUser.logout = async ({ accessToken }) => {\n\tconst token = await _Token2.default.query().update({ expiredAt: _Token2.default.knex().raw('now()') }).where({ token: accessToken });\n\n\treturn token;\n};\n\nUser.update = async ({ id, firstName, lastName, emailAddress, firebaseUserId, imageUrl }, context) => {\n\tconst oldUser = await User.query().select('*').where('id', id).first();\n\tif (emailAddress) {\n\t\temailAddress = emailAddress.toLowerCase();\n\t}\n\n\tconst newObj = Object.assign({}, oldUser);\n\n\tif (firstName) {\n\t\tnewObj.firstName = firstName;\n\t\tif (!lastName) {\n\t\t\tnewObj.lastName = '';\n\t\t}\n\t}\n\tif (lastName) {\n\t\tnewObj.lastName = lastName;\n\t}\n\tif (emailAddress) {\n\t\tnewObj.emailAddress = emailAddress;\n\t}\n\tif (firebaseUserId) {\n\t\tnewObj.firebaseUserId = firebaseUserId;\n\t}\n\tif (imageUrl) {\n\t\tnewObj.imageUrl = imageUrl;\n\t}\n\n\tconst user = await User.query().update(newObj).where({ id });\n\n\tcontext.emit({ type: 'user-change', data: { user, oldUser } }).catch(console.error);\n\n\treturn User.get({ id });\n};\n\nexports.default = User;\n\n//# sourceURL=webpack:///./src/models/User.js?");

/***/ }),

/***/ "./src/models/knexfile.js":
/*!********************************!*\
  !*** ./src/models/knexfile.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst {\n\thost,\n\tuser,\n\tpassword,\n\tdatabase\n} = __webpack_require__(/*! ../config/db */ \"./src/config/db.js\");\n\nconst docker = {\n\tclient: 'mysql',\n\tconnection: {\n\t\thost,\n\t\tuser,\n\t\tpassword,\n\t\tdatabase,\n\t\tcharset: 'utf8mb4',\n\t\ttimezone: '0000'\n\t},\n\tmigrations: {\n\t\ttableName: 'knex_migrations',\n\t\tdirectory: path.resolve(__dirname, '..', '..', 'migrations')\n\t},\n\tpool: {\n\t\tmin: 0,\n\t\tmax: 10\n\t}\n};\n\nconst test = Object.assign({}, docker, {\n\t// allow multipleStatements for the messy db reset script\n\tconnection: Object.assign({}, docker.connection, { multipleStatements: true })\n});\n\nmodule.exports = {\n\tdevelopment: docker,\n\tstaging: docker,\n\tproduction: docker,\n\tdocker,\n\ttest\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/models/knexfile.js?");

/***/ }),

/***/ "./src/mutations/index.js":
/*!********************************!*\
  !*** ./src/mutations/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _login = __webpack_require__(/*! ./login */ \"./src/mutations/login.js\");\n\nvar _login2 = _interopRequireDefault(_login);\n\nvar _logout = __webpack_require__(/*! ./logout */ \"./src/mutations/logout.js\");\n\nvar _logout2 = _interopRequireDefault(_logout);\n\nvar _user = __webpack_require__(/*! ./user */ \"./src/mutations/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst mutations = {\n\tlogin: _login2.default,\n\tlogout: _logout2.default,\n\tuser: _user2.default\n};\n\nexports.default = mutations;\n\n//# sourceURL=webpack:///./src/mutations/index.js?");

/***/ }),

/***/ "./src/mutations/login.js":
/*!********************************!*\
  !*** ./src/mutations/login.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _User = __webpack_require__(/*! ../models/User */ \"./src/models/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nvar _Token = __webpack_require__(/*! ../models/Token */ \"./src/models/Token.js\");\n\nvar _Token2 = _interopRequireDefault(_Token);\n\nvar _email = __webpack_require__(/*! ../email */ \"./src/email/index.js\");\n\nvar _website = __webpack_require__(/*! ../config/website */ \"./src/config/website.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import { getFirebaseUserIdForToken } from '../firebase'\nconst login = async (parent, {\n\temailAddress\n}, context) => {\n\n\t// let firebaseUserId\n\t// if (firebaseIdToken) {\n\t// \tfirebaseUserId = await getFirebaseUserIdForToken(firebaseIdToken)\n\t// }\n\n\t// const credentials = await User.login({\n\t// \tfirebaseUserId,\n\t// }, context)\n\n\t// return credentials\n\ttry {\n\t\tconst { accessToken } = await _User2.default.login({ emailAddress }, context);\n\t\tconst link = `${_website.publicRoot}/login/callback?accessToken=${accessToken}`;\n\t\tawait (0, _email.sendEmail)({ recipient: emailAddress, data: { link }, type: 'login' });\n\t} catch (e) {\n\t\tconsole.error(e);\n\n\t\treturn {\n\t\t\tsuccess: false\n\t\t};\n\t}\n\n\treturn {\n\t\tsuccess: true\n\t};\n};\n\nexports.default = login;\n\n//# sourceURL=webpack:///./src/mutations/login.js?");

/***/ }),

/***/ "./src/mutations/logout.js":
/*!*********************************!*\
  !*** ./src/mutations/logout.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _User = __webpack_require__(/*! ../models/User */ \"./src/models/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst logout = async (parent, { accessToken }, context) => {\n\tconst status = await _User2.default.logout({ accessToken }, context);\n\n\treturn {\n\t\tsuccess: true\n\t};\n};\n\nexports.default = logout;\n\n//# sourceURL=webpack:///./src/mutations/logout.js?");

/***/ }),

/***/ "./src/mutations/user.js":
/*!*******************************!*\
  !*** ./src/mutations/user.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _User = __webpack_require__(/*! ../models/User */ \"./src/models/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import { getMeId } from '../facebook'\n// import { getFirebaseUserIdForToken } from '../firebase'\n\nconst updateUser = async (parent, { user }, context) => {\n\tif (!(context.auth && context.auth.user)) {\n\t\tthrow new Error('unauthorized');\n\t}\n\n\tif (user.id === 'me') {\n\t\tuser.id = context.auth.user.id;\n\t}\n\n\tif (user.id !== context.auth.user.id) {\n\t\tthrow new Error('unauthorized');\n\t}\n\n\t// if (user.firebaseIdToken) {\n\t// \tuser.firebaseUserId = await getFirebaseUserIdForToken(user.firebaseIdToken)\n\t// \tdelete user.firebaseIdToken\n\t// }\n\n\t// if (user.facebookAccessToken) {\n\t// \tuser.facebookUserId = await getMeId({ accessToken: user.facebookAccessToken })\n\t// \tdelete user.facebookAccessToken\n\t// }\n\n\tconst newUser = await _User2.default.update(user, context);\n\n\treturn newUser;\n};\n\nexports.default = updateUser;\n\n//# sourceURL=webpack:///./src/mutations/user.js?");

/***/ }),

/***/ "./src/queries/index.js":
/*!******************************!*\
  !*** ./src/queries/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _users = __webpack_require__(/*! ./users */ \"./src/queries/users.js\");\n\nvar _users2 = _interopRequireDefault(_users);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst queries = {\n\tusers: _users2.default\n};\n\nexports.default = queries;\n\n//# sourceURL=webpack:///./src/queries/index.js?");

/***/ }),

/***/ "./src/queries/users.js":
/*!******************************!*\
  !*** ./src/queries/users.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _User = __webpack_require__(/*! ../models/User */ \"./src/models/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst users = async (parent, { id, ids }, context) => {\n\tif (!(context.auth && context.auth.user)) {\n\t\tthrow new Error('unauthorized');\n\t}\n\n\tconst currentUserId = context.auth.user.id;\n\n\tif (!ids && id) {\n\t\tids = [id];\n\t}\n\n\tlet q = _User2.default.query().select('*');\n\n\tif (ids) {\n\t\tids = ids.map(id => {\n\t\t\tif (id === 'me') {\n\t\t\t\treturn currentUserId;\n\t\t\t}\n\n\t\t\treturn id;\n\t\t});\n\n\t\tq = q.whereIn('id', ids);\n\t}\n\n\tif (ids.length === 1 && ids[0] === currentUserId) {\n\t\treturn [context.auth.user];\n\t}\n\n\tconst usrs = await q;\n\n\tlet currentUser;\n\tif (usrs && usrs.map(u => u.id).includes(currentUserId)) {\n\t\tcurrentUser = context.auth.user;\n\t}\n\n\treturn usrs.map(user => {\n\t\tif (user.id === currentUserId) {\n\t\t\treturn currentUser;\n\t\t}\n\n\t\treturn {\n\t\t\tid: user.id,\n\t\t\tfirstName: user.firstName,\n\t\t\tlastName: user.lastName,\n\t\t\timageUrl: user.imageUrl\n\t\t};\n\t});\n};\n\nexports.default = users;\n\n//# sourceURL=webpack:///./src/queries/users.js?");

/***/ }),

/***/ "apollo-boost":
/*!*******************************!*\
  !*** external "apollo-boost" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-boost\");\n\n//# sourceURL=webpack:///external_%22apollo-boost%22?");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-express\");\n\n//# sourceURL=webpack:///external_%22apollo-server-express%22?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ }),

/***/ "graphql-import":
/*!*********************************!*\
  !*** external "graphql-import" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-import\");\n\n//# sourceURL=webpack:///external_%22graphql-import%22?");

/***/ }),

/***/ "graphql-subscriptions":
/*!****************************************!*\
  !*** external "graphql-subscriptions" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-subscriptions\");\n\n//# sourceURL=webpack:///external_%22graphql-subscriptions%22?");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tag\");\n\n//# sourceURL=webpack:///external_%22graphql-tag%22?");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tools\");\n\n//# sourceURL=webpack:///external_%22graphql-tools%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"knex\");\n\n//# sourceURL=webpack:///external_%22knex%22?");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql\");\n\n//# sourceURL=webpack:///external_%22mysql%22?");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-fetch\");\n\n//# sourceURL=webpack:///external_%22node-fetch%22?");

/***/ }),

/***/ "objection":
/*!****************************!*\
  !*** external "objection" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"objection\");\n\n//# sourceURL=webpack:///external_%22objection%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "request-promise-native":
/*!*****************************************!*\
  !*** external "request-promise-native" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request-promise-native\");\n\n//# sourceURL=webpack:///external_%22request-promise-native%22?");

/***/ }),

/***/ "subscriptions-transport-ws":
/*!*********************************************!*\
  !*** external "subscriptions-transport-ws" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"subscriptions-transport-ws\");\n\n//# sourceURL=webpack:///external_%22subscriptions-transport-ws%22?");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid/v4\");\n\n//# sourceURL=webpack:///external_%22uuid/v4%22?");

/***/ })

/******/ })));