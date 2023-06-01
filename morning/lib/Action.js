const Actions=(function(){

    function e(type, name) {
        return bp.Event(type+" " + name, {
            type: type,
            name: name,
            lib: "ACTION"
        });
    }

    return {
        wakeUp: function(){ return e("wake up", ""); },
        wear: function(what){ return e("wear", what); },
        eat: function(what){ return e("eat", what); },
        brushTeeth: function(){ return e("brush teeth", ""); },
        tidyUp: function(){ return e("tidy up", ""); },
        goOut: function(){ return e("goOut", ""); },
        backToSleep: function(){ return e("Sleep Again", ""); },
        fail: function(what){ return e("fail: ", what);},
        any: bp.EventSet("Any Action", function(e){
            return isEvent(e) && (e.data) && (e.data.lib==="ACTION");
        })
    };
})();