"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var dataSource = [1, 2, 3, 4, 5, 6];
var UseDraglineTest = function (props) {
    var storeAllRef = react_1.useRef(null);
    var ISMOVE = react_1.useRef([]);
    var POSITIONARR = react_1.useRef([]);
    var MOUSEPOSITION = react_1.useRef([0, 0]);
    react_1.useEffect(function () {
        var Store = storeAllRef.current;
        var position = [];
        Store.forEach(function (v, i) {
            position.push([v.current.offsetLeft, v.current.offsetTop]);
            v.current.style.position = 'absolute';
            v.current.style.zIndex = 0;
            v.current.addEventListener('mousedown', function (e) { MouseDown(e, i); });
            v.current.addEventListener('mousemove', function (e) { MouseMove(e, i); });
            v.current.addEventListener('mouseup', function (e) { MouseUp(e, i); });
        });
        POSITIONARR.current = position;
        ISMOVE.current = isMoveArr;
    }, []);
    var MouseDown = function (e, index) {
        e.preventDefault();
        var isMoveArr = __spreadArrays(ISMOVE.current);
        MOUSEPOSITION.current = [e.clientX, e.clientY];
        isMoveArr[index] = true;
        ISMOVE.current = isMoveArr;
        var curPos = __spreadArrays(POSITIONARR.current);
        curPos[index][0] = storeAllRef.current[index].current.offsetLeft;
        curPos[index][1] = storeAllRef.current[index].current.offsetTop;
        POSITIONARR.current = curPos;
        storeAllRef.current[index].current.style.cursor = 'move';
        storeAllRef.current[index].current.style.zIndex = 999;
    };
    var MouseMove = function (e, index) {
        e.preventDefault();
        var isMoveArr = __spreadArrays(ISMOVE.current);
        if (isMoveArr[index] === false) {
            return;
        }
        var _a = [e.clientX, e.clientY], mouseX = _a[0], mouseY = _a[1];
        storeAllRef.current[index].current.style.left = POSITIONARR.current[index][0] + mouseX - MOUSEPOSITION.current[0] + "px";
        storeAllRef.current[index].current.style.top = POSITIONARR.current[index][1] + mouseY - MOUSEPOSITION.current[1] + "px";
    };
    var MouseUp = function (e, index) {
        var _a, _b;
        e.preventDefault();
        var isMoveArr = __spreadArrays(ISMOVE.current);
        isMoveArr[index] = false;
        ISMOVE.current = isMoveArr;
        storeAllRef.current[index].current.style.zIndex = 0;
        storeAllRef.current[index].current.style.cursor = 'default';
        console.log((_a = storeAllRef.current[index - 1]) === null || _a === void 0 ? void 0 : _a.current.offsetTop, storeAllRef.current[index].current.offsetTop, (_b = storeAllRef.current[index + 1]) === null || _b === void 0 ? void 0 : _b.current.offsetTop);
    };
    var isMoveArr = [];
    var allRef = [];
    var generateList = function (dataSource) {
        var res = dataSource.map(function (item, index) {
            allRef["" + index] = react_1.createRef();
            isMoveArr.push(false);
            return (react_1["default"].createElement("div", { key: index, style: {
                    width: 280,
                    height: 50,
                    border: '1px solid #ccc',
                    left: 17 + "px",
                    top: index * 65 + 20 + "px"
                }, onClick: function () { }, ref: allRef[index] }, item));
        });
        storeAllRef.current = allRef;
        return res;
    };
    return (react_1["default"].createElement("div", { style: { width: 300, height: 500, border: '1px solid #ccc' } }, generateList(dataSource)));
};
exports["default"] = UseDraglineTest;
