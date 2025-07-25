const LogicLayer = (function(){
    function isInServer() {
        return (typeof __PVG_RUN_ENV__ !== "undefined") && 
                    (__PVG_RUN_ENV__=='LogicLayer');
    }

    return {
        requestData: function() {
            return isInServer() ? PARAMS : SAMPLE_PARAMS;
        }, 
        isInServer: isInServer,
        toString: function() { return "[LogicLayer]"; }
    };

})();