"use strict";
exports.__esModule = true;
var react_1 = require("react");
// import UseDraggableTest from './test/useDraggableTest';
// import UseDragfaceTest from './test/useDragfaceTest';
var useDraglineTest_1 = require("./test/useDraglineTest");
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
            react_1["default"].createElement(useDraglineTest_1["default"], null))));
}
exports["default"] = App;
