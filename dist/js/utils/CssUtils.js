"use strict";

/**
 * Created by hepen on 6/5/2017.
 */
var CssUtils = function () {
    var styleMap = void 0;

    var init = function init() {
        styleMap = new Map();
    };

    var get = function get(key) {
        return styleMap.get(key);
    };

    var getMap = function getMap() {
        return styleMap;
    };

    var setCssMap = function setCssMap(styleObj) {
        var keys = Object.keys(styleObj);
        keys.forEach(function (key) {
            return styleMap.set(key, styleObj[key]);
        });
    };

    return {
        init: init,
        setCssMap: setCssMap,
        get: get,
        getMap: getMap
    };
}();

module.exports = CssUtils;