/**
 * Created by wangxiaobin on 2017/3/13.
 */
var wytCommon = (function () {
    var getScreenHeight = function () {
        return window.screen.height-60
    };
    return {
        height: getScreenHeight()
    }
})(window)
