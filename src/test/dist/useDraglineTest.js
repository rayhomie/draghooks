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
var fastdom_1 = require("fastdom");
var dataSource = [1, 2, 3, 4, 5, 6];
var UseDraglineTest = function (props) {
    var storeAllRef = react_1.useRef(null);
    var ISMOVE = react_1.useRef([]);
    var POSITIONARR = react_1.useRef([]);
    var MOUSEPOSITION = react_1.useRef([0, 0]);
    react_1.useEffect(function () {
        //div坐标获取
        var Store = storeAllRef.current;
        var position = [];
        Store.forEach(function (v, i) {
            position.push([v.current.offsetLeft, v.current.offsetTop]);
            v.current.style.position = "absolute";
            v.current.style.zIndex = 0;
            v.current.addEventListener("mousedown", function (e) {
                MouseDown(e, i);
            });
            v.current.addEventListener("mousemove", function (e) {
                MouseMove(e, i);
            });
            v.current.addEventListener("mouseup", function (e) {
                MouseUp(e, i);
            });
        });
        POSITIONARR.current = position;
        ISMOVE.current = isMoveArr;
    }, []);
    var MouseDown = function (e, index) {
        e.preventDefault();
        fastdom_1["default"].measure(function () {
            var isMoveArr = __spreadArrays(ISMOVE.current);
            MOUSEPOSITION.current = [e.clientX, e.clientY];
            isMoveArr[index] = true;
            ISMOVE.current = isMoveArr;
            var curPos = __spreadArrays(POSITIONARR.current);
            curPos[index][0] = storeAllRef.current[index].current.offsetLeft;
            curPos[index][1] = storeAllRef.current[index].current.offsetTop;
            POSITIONARR.current = curPos;
            storeAllRef.current[index].current.style.cursor = "move";
            storeAllRef.current[index].current.style.zIndex = 999;
        });
    };
    var MouseMove = function (e, index) {
        e.preventDefault();
        fastdom_1["default"].mutate(function () {
            var isMoveArr = __spreadArrays(ISMOVE.current);
            if (isMoveArr[index] === false) {
                return;
            }
            var _a = [e.clientX, e.clientY], mouseX = _a[0], mouseY = _a[1];
            storeAllRef.current[index].current.style.left = POSITIONARR.current[index][0] + mouseX - MOUSEPOSITION.current[0] + "px";
            storeAllRef.current[index].current.style.top = POSITIONARR.current[index][1] + mouseY - MOUSEPOSITION.current[1] + "px";
        });
    };
    var MouseUp = function (e, index) {
        e.preventDefault();
        fastdom_1["default"].measure(function () {
            var isMoveArr = __spreadArrays(ISMOVE.current);
            isMoveArr[index] = false;
            ISMOVE.current = isMoveArr;
            storeAllRef.current[index].current.style.zIndex = 0;
            storeAllRef.current[index].current.style.cursor = "default";
        });
        // const afterPre = storeAllRef.current[index - 1]?.current.offsetTop;
        // const afterCur = storeAllRef.current[index].current.offsetTop;
        // const afterNext = storeAllRef.current[index + 1]?.current.offsetTop;
        // const beforeCur = POSITIONARR.current[index];
        // console.log(afterPre, afterCur, afterNext, "beforeCur:", beforeCur[1]);
        // if (afterCur <= (afterPre + beforeCur[1]) / 2 && afterCur >= afterPre) {
        //   console.log(11);
        //   // storeAllRef.current[index].current.style.top = `${afterPre}px`
        //   // storeAllRef.current[index - 1].current.style.top = `${beforeCur[1]}px`
        //   // storeAllRef.current[index].current.style.left = `${beforeCur[0]}px`
        //   let cur = storeAllRef.current[index];
        //   storeAllRef.current[index] = storeAllRef.current[index - 1];
        //   storeAllRef.current[index - 1] = cur;
        // } else {
        //   storeAllRef.current[index].current.style.top = `${beforeCur[1]}px`;
        //   storeAllRef.current[index].current.style.left = `${beforeCur[0]}px`;
        // }
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
                    border: "1px solid #ccc",
                    left: 17 + "px",
                    top: index * 65 + 20 + "px"
                }, onClick: function () { }, ref: allRef[index] }, item));
        });
        storeAllRef.current = allRef;
        return res;
    };
    return (react_1["default"].createElement("div", { style: { width: 300, height: 500, border: "1px solid #ccc" } }, generateList(dataSource)));
};
exports["default"] = UseDraglineTest;
