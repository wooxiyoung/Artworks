/** 팝업 레이어 객체 배열 */
var popLayerInstances = [];



(function($) {
    /**
     * 팝업 제공 팩토리.
     *
     * @class
     */
    ext.popupFactory = {
		/** 윈도우 오픈 객체 */
        winObj: null,
		/**
         * ViewPort를 가져온다.
         */
        getViewport: function() {
            return {
                width: $(window.top).outerWidth(),
                height: $(window.top).outerHeight()
            };
        },
        /**
         * window popup 을 open 한다.
         * (내부 전용 function)
         *
         * @param form    form Object
         * @param url     URL
         * @param winName window 이름
         * @param w       window 넓이
         * @param h       window 높이
         * @param x       window X 위치
         * @param y       window Y 위치
         * @param scroll  스크롤 표시 여부
         * @returns window object
         */
        abstractWindowOpen: function(form, url, winName, w, h, x, y, scroll) {
            const view = this.getViewport();
            //--------------------------------------------------------------------------------
            x = parseInt(view.width / 2) - parseInt(w / 2) + (x || 0);
            y = parseInt(view.height / 2) - parseInt(h / 2) + (y || 0);
            //--------------------------------------------------------------------------------
            x = parseInt(x, 10) + window.screenLeft;
            y = parseInt(y, 10) + window.screenTop;
            //--------------------------------------------------------------------------------
            const features = "left=" + x + ",top=" + y + ",width=" + w + ",height=" + h + ",scrollbars=" + scroll + ",menubar=no,toolbar=no,location=no,directories=no,status=no,resizable=no";
            //--------------------------------------------------------------------------------
            this.winObj = window.open("", winName, features);
            //--------------------------------------------------------------------------------
            form.action = url;
            form.target = winName;
            form.method = "post";
            form.submit();
            form.target = "_self";
            form.action = "";
            //--------------------------------------------------------------------------------
            return this.winObj;
        },
        /**
         * window popup 을 open 한다.
         *
         * @param form [object] form object
         * @param url [String] URL
         * @param winName [String] window object name
         * @param width [int] 팝업넓이
         * @param height [int] 팝업높이
         * @returns {Object} window object
         */
        openPopup: function(form, url, winName, width, height) {
        	const posX = 0;
        	const posY = 0;
            //--------------------------------------------------------------------------------
            return this.abstractWindowOpen(form, url, winName, width, height, posX, posY, "no");
        },
        /**
         * 레이어 열기
         */
        openLayer: function(uri, param, callback) {
            //--------------------------------------------------------------------------------
            // 기존 메시지가 출력중이면 출력 금지
            //--------------------------------------------------------------------------------
            if(IS_SHOW_MESSAGE) {
                return;
            }
            //--------------------------------------------------------------------------------
            // 팝업 레이어 object 생성
            //--------------------------------------------------------------------------------
            const popLayer = new ext.popupLayer();
            //--------------------------------------------------------------------------------
            // 팝업 html 가져오기(responseText)
            //--------------------------------------------------------------------------------
            this.load(uri, param, function(resultData) {
                window.top.popLayerInstances.push(popLayer);	//레이어 팝업 객체 저장
                //--------------------------------------------------------------------------------
                if(resultData.isError) {	//responseText 가져올 때 에러이면 메시지 출력
                    Message.error(resultData.errorMsg);
                }
                else {
                    popLayer.extCallback = callback;	//콜백 지정
                    popLayer.extBlock = new ext.Dimmed();	//블록 지정
                    //------------------------------------------------------------
                    popLayer.extContainer = window.top.document.createElement("div");
                    popLayer.extContainer.innerHTML = resultData.resultHtml;
                    //popLayer.extContainer = resultData.resultHtml;
                    //popLayer.extContainer = window.top.document.createElement("div");	//div 영역 생성
                    //------------------------------------------------------------
                    //$(popLayer.extContainer).attr("id", popLayer.extLayerId);		//생성한 div id 값 지정
                    //$(popLayer.extContainer).append(resultData.resultHtml);	//생성한 div에 팝업 html append
                    //------------------------------------------------------------
                    popLayer.show();
                }
            });
            //--------------------------------------------------------------------------------
            return popLayer;
        },
        /**
         * 레이어 닫기.
         */
        closeLayer: function(returnData) {
            if(IS_SHOW_MESSAGE) {
                return;
            }
            //--------------------------------------------------------------------------------
            const popLayer = window.top.popLayerInstances.pop(); // 최상위의 레이어.
            //--------------------------------------------------------------------------------
            if(popLayer) {	//최상위 레이어가 존재할 경우, close 후 콜백이 있다면 콜백 함수 실행
                popLayer.close();
                if(popLayer.extCallback) {
                	popLayer.extCallback(returnData);
                }
            }
        },
        /**
         * layer Contents html 페이지 Load
         */
        load: function(uri, param, callback, isBizSkip) {
            if(!param) {
                param = {};
            }
            //------------------------------------------------------------
            isSubmit = true;
            //------------------------------------------------------------
            // Call Layer URI
            //------------------------------------------------------------
            $.ajax({
                type: "POST",
                cache: false,
                url: uri,
                data: param,
                complete: function(data, status) {
                    let resultData = {};
                    //------------------------------------------------------------
                    if(status === "success") {
                        resultData.isError = false;
                        resultData.errorMsg = "";
                        resultData.resultHtml = data.responseText;
                    }
                    else {
                        resultData.isError = true;
                        resultData.errorMsg = "오류가 발생하였습니다.";
                        resultData.resultHtml = "";
                    }
                    //------------------------------------------------------------
                    isSubmit = false;
                    //------------------------------------------------------------
                    if(callback) {
                        callback(resultData);
                    }
                }
            });
        }
    }
})(jQuery);




/** 레이어 팝업 객체 */
var ExtPopup = ext.popupFactory;


(function($) {
    /**
     * 팝업 레이어 클래스
     *
     * @class
     * @construct
     */
    ext.popupLayer = function() {
        this.extCallback = null;
        this.extBlock = null;
        this.extLayerId = 'layerPopWrap';
        this.extContainer = null;
    };
    /**
     * 팝업 레이어 메서드.
     */
    ext.popupLayer.prototype = {
        /**
         * layer show and document blocking..
         */
        show: function(callback) {
        	const $this = this;
            //--------------------------------------------------------------------------------
            //loadingBlock(false);
            //--------------------------------------------------------------------------------
            $this.extBlock.show($this.extContainer, null, function() {
            	//$($this.extContainer).find("[class^='wrap_popup']").fadeIn();
            	$("[class^='wrap_popup']").fadeIn();
            	/*$(".wrap_popup2_1").fadeIn();
            	$(".wrap_popup2_2").fadeIn();
            	$(".wrap_popup2_3").fadeIn();
            	$(".wrap_popup2_4").fadeIn();
            	$(".wrap_popup2_5").fadeIn();
            	$(".wrap_popup2_6").fadeIn();
            	$(".wrap_popup_add").fadeIn();*/
            	
            	var popDiv = $($this.extContainer).find("[class^='wrap_popup']");
            	var initFocusObjs = popDiv.find('input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
            	var initFirstFocus = initFocusObjs.eq(0);
            	var focusObjs = popDiv.find('input:not([disabled]), a, button:not([disabled]), textarea:not([disabled]), select:not([disabled])');
            	var firstFocus = focusObjs.eq(0);
            	var lastFocus = focusObjs.eq(focusObjs.length - 1);
            	
            	popDiv.attr("tabindex", "0");
            	initFirstFocus.focus();
            	
            	popDiv.on("keydown", function(e) {
            		if(e.keyCode === 9) {
            			var activeEl = $(document.activeElement);
              	      	if(e.shiftKey) {		//SHIFT + TAB
              	      		if(activeEl[0] === firstFocus[0]) {
		              	        e.preventDefault();
		              	        lastFocus[0].focus();
              	      		}
              	      	} else {		//TAB
              	      		if (activeEl[0] === lastFocus[0]) {
              	      			e.preventDefault();
              	      			firstFocus[0].focus();
              	      		}
              	      	}
              	    }
            	});
                
            	// 닫기 이벤트
            	$(".btn_close_modal").bind("click", function(evt) {
            		ExtPopup.closeLayer();
                });
            	
            	if(callback) {
                    callback();
            	}
            });
        },
        /**
         * close layer.
         */
        close: function(callback) {
        	const $this = this;
            //--------------------------------------------------------------------------------
            $this.extBlock.hide(function() {
            	if(callback) {
                    callback();
            	}
            });
        }
    };
})(jQuery);