/** dimmed layer z-index */
var dimmedLayerZIndex = 1000;
/** dimmed instances */
var dimmedInstances = [];


(function($) {
    /**
     * Dimmed 클래스
     *
     * @class
     */
    ext.Dimmed = function () {
    	this.dimmedObj = null;
        /** dimmed class name */
        this.dimmedClassName = 'modal';
    };

    ext.Dimmed.prototype = {
		options: {
            /** dimmed style */
            dimmedStyle: {
            	/*background:"rgba(0,0,0,0.3)",
            	position:"absolute",
            	top:0,
            	left:0,
            	right:0,
            	bottom:0,*/
            	zIndex: 0
            }
        },
        show: function(element, _target, callback) {
        	let target = window.top.document.body;	//dimmed 처리가 될 target
        	this.options.dimmedStyle.zIndex = ++window.top.dimmedLayerZIndex;	//z-index 설정
        	
        	if(isDimmed == false) {
        		this.dimmedObj = document.createElement("div");	//dimmed div 생성
        		this.dimmedObj.setAttribute("id", this.options.dimmedStyle.zIndex);
                //$(this.dimmedObj).css("display", "none");
                
                //dimmed target이 있을 경우 해당 요소를 dimmed target 으로 지정하고 색상을 더 어둡게 변경
                if(_target != null) {
                	//this.options.dimmedStyle.background = "rgba(0,0,0,0.3)";
                	//this.options.dimmedStyle.top = $(_target).position().top;
                	//this.options.dimmedStyle.left = $(_target).position().left;
                	target = _target;
                }
                
                //target에 dimmed 객체를 prependTo 처리하고 css 적용
                //$(this.dimmedObj).prependTo(target).css(this.options.dimmedStyle);
                $(this.dimmedObj).prependTo(target).addClass(this.dimmedClassName).css(this.options.dimmedStyle);
        	}
        	
        	//dimmed 위에 올라갈 메시지 및 팝업이 존재하면 append
        	if(element) {
        		$(this.dimmedObj).append(element);	//생성한 div에 팝업 html append
        	}
        	
        	window.top.dimmedInstances.push(this.dimmedObj);       // dimmed 객체 저장.
        	
        	//dimmed 객체 show
        	$(this.dimmedObj).fadeIn(200, function() {
        		if(callback) {
                    callback();
                }
        	});
        },
        hide: function(callback) {
        	//console.log("remove prev ",window.top.dimmedInstances);
        	const dimmed = window.top.dimmedInstances.pop(); // 최상위의 레이어.
        	
        	if(dimmed == this.dimmedObj) {
        		$(this.dimmedObj).fadeOut(200, function() {
            		$(dimmed).remove();
            		
            		if(window.top.dimmedInstances.length == 0) {
    					isDimmed = false;
    				}
    				
            		if (callback) {
                        callback();
                    }
            	});
        	} else {
        		window.top.dimmedInstances.push(dimmed);       // dimmed 객체 다시 저장.
        	}
        	
        	//console.log("remove after ",window.top.dimmedInstances);
        }
    };
})(jQuery);
