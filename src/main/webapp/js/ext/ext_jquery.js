(function($) {
    /**
     * 화면 가운데 위치 시키기
     *
     * @param top
     * @param left
     * @param mode 적용 모드 [top,left]
     */
    $.fn.center = function(top, left, mode) {
        top = top ? top : 0;
        left = left ? left : 0;
        mode = mode ? mode : [true, true]; // 적용 모드 [top,left]
        //--------------------------------------------------------------------------------
        this.css("position", "absolute");
        //--------------------------------------------------------------------------------
        if (mode[0]) {
            this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + top + "px");
        }
        //--------------------------------------------------------------------------------
        if (mode[1]) {
            this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + left + "px");
        }
        //--------------------------------------------------------------------------------
        return this;
    };

    /**
     * 시간 지연
     *
     * @param interval
     * @param callback
     * @param obj
     */
    let delayTimer = null;
    $.fn.delayTime = function(interval, callback, obj) {
        if (delayTimer) {
            clearTimeout(delayTimer);
        }
        //--------------------------------------------------------------------------------
        function next() {
            if(callback) {
                callback.call(obj);
            }
        }
        //--------------------------------------------------------------------------------
        delayTimer = setTimeout(next, interval);
        return obj;
    };

    /**
     * 시간 지연 함수
     */
    $.delayTime = function(obj, interval, callback) {
        return $(obj).delayTime(interval, callback, obj);
    };
    
    /**
     * Form 데이터를 json 데이터로 변환
     */
    $.fn.serializeObject = function() { 
        let jsonObj = null; 
        try { 
            if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) { 
                var arr = this.serializeArray(); 
                if(arr){ 
                	jsonObj = {}; 
    	            $.each(arr, function() { 
    	            	jsonObj[this.name] = this.value; 
    	            }); 
    	        } 
    	    } 
        }catch(e) { 
            Message.alert(e.message); 
        }finally {} 
        
        return jsonObj; 
    }
})(jQuery);
