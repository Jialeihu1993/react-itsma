/**
 * Created by hepen on 6/5/2017.
 */
let CssUtils = function() {
    let styleMap;

    let init = function() {
        styleMap = new Map();
    };

    let get = function(key) {
        return styleMap.get(key);
    };

    let getMap = function() {
        return styleMap;
    };

    let setCssMap = function(styleObj) {
        styleMap = new Map();
        let keys = Object.keys(styleObj);
        keys.forEach(key => styleMap.set(key, styleObj[key]));
    };

    return {
        init,
        setCssMap,
        get,
        getMap
    }
}();

module.exports = CssUtils;
