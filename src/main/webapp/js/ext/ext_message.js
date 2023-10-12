/* toast 팝업 timer변수  */
let toastMsgTimer = 0;


(function($) {
    /**
     * 폼의 입력값 필터링과 유효성 검사 클래스.
     *
     * @class
     */
    ext.message = {
        layerId: "container",	//메시지 레이어 div 엘리먼트 ID
        layerClass: "",	//메시지 레이어 css 클래스명
        layerStyle: "",	//메시지 레이어 스타일
        extBlock : null,	//메시지 생성 전 바닥에 깔릴 block 객체
        extContainer : null,	//block 객체 위에 올라갈 메시지 엘리먼트 객체
        msgType: "",	//메시지 타입
        btnClose: "btn_close_modal",	//닫기 버튼(x)
        btnOk: "btn_type2",	//확인 버튼(css class btn_type1: 파랑배경, btn_type2: 일반(default value), btn_type3: 빨간 테두리)
        btnCancel : 'btn_type2',	//취소 버튼
        firstBtn: "확인",		//첫번째 버튼 텍스트
        secondBtn: "취소",	//두번째 버튼 텍스트
        blockOptions: {
            esckey: true
        },
        init: function() {
        	this.btnOk = "btn_type2";
        	this.btnCancel = 'btn_type2';
        	this.firstBtn = "확인";
        	this.secondBtn = "취소";
        },
        alert: function(msg, title, callback) {
			this.msgType = "alert";
            //--------------------------------------------------------------------------------
            // 메시지 출력
            //--------------------------------------------------------------------------------
            const _options = {
                title: (title && typeof title === "string") ? title : "알림메시지",
                msg: String(msg),
                callback: callback
            };
            //--------------------------------------------------------------------------------
            this.showAlertMsg(_options);
        },
        confirm: function(msg, options, callback) {
			this.msgType = "confirm";
			if(options.firstBtn) {		//첫번째 버튼 텍스트 값이 존재할 경우
				this.firstBtn = options.firstBtn;
			}
			if(options.secondBtn) {		//두번째 버튼 텍스트 값이 존재할 경우
				this.secondBtn = options.secondBtn;
			}
			if(options.firstBtnCss) {	//첫번째 버튼 css 값이 존재할 경우
				this.btnOk = options.firstBtnCss;
			}
			if(options.secondBtnCss) {	//두번째 버튼 css 값이 존재할 경우
				this.btnCancel = options.secondBtnCss;
			}
            //--------------------------------------------------------------------------------
            // 메시지 출력
            //--------------------------------------------------------------------------------
        	const _options = {
                title: (options && typeof options.title === "string") ? options.title : "확인메시지",
                msg: String(msg),
                callback: callback,
            };
            //--------------------------------------------------------------------------------
            this.showAlertMsg(_options);
        },
        error: function(msg, callback) {
			this.msgType = "error";
            //--------------------------------------------------------------------------------
            // 메시지 출력
            //--------------------------------------------------------------------------------
        	const _options = {
                title: "에러메시지",
                msg: String(msg),
                callback: callback
            };
            //--------------------------------------------------------------------------------
            this.showAlertMsg(_options);
        },
        showBaseMsg: function(options, innerHtml) {
            //--------------------------------------------------------------------------------
            // 기존 메시지가 출력중이면 출력 금지
            //--------------------------------------------------------------------------------
            if(IS_SHOW_MESSAGE) {
                return;
            }
            //--------------------------------------------------------------------------------
            IS_SHOW_MESSAGE = true;
            //--------------------------------------------------------------------------------
            const $this = this;
            this.extBlock = new ext.Dimmed();
            //--------------------------------------------------------------------------------
            this.extContainer = window.top.document.createElement("div");
            this.extContainer.setAttribute("id", this.layerId);
            this.extContainer.innerHTML = innerHtml;
            //--------------------------------------------------------------------------------
            this.extBlock.show(this.extContainer, null, function() {
            	$(".wrap_popup").fadeIn();
            	
            	var popDiv = $($this.extContainer).find("[class^='wrap_popup']");
            	var focusObjs = popDiv.find('input, a, button');
            	var firstFocus = focusObjs.eq(0);
            	var lastFocus = focusObjs.eq(focusObjs.length - 1);
            	
            	popDiv.attr("tabindex", "0").show().focus();
            	
                firstFocus.on({
                    'keydown' : function (e) {
                        if(e.shiftKey && e.keyCode == 9) {                    
                            e.preventDefault();
                            $(lastFocus).focus();
                        } 
                    }
                });

                lastFocus.on({
                    'keydown' : function (e) {
                        if(!e.shiftKey && e.keyCode == 9) {                    
                            e.preventDefault();
                            $(firstFocus).focus();
                        } 
                    }
                });
                //--------------------------------------------------------------------------------
                // 닫기 이벤트(X 버튼)
                //--------------------------------------------------------------------------------
                $($this.extContainer).find("." + $this.btnClose).bind("click", function(evt) {
                	$this.extBlock.hide(function() {
                        IS_SHOW_MESSAGE = false;
                        //--------------------------------------------------------------------------------
                        if(options.callback) {
                            options.callback(false);
                        }
                    });
                	$this.init();	//버튼명, 클래스 초기화
                });
                //--------------------------------------------------------------------------------
                // 확인 이벤트
                //--------------------------------------------------------------------------------
                $($this.extContainer).find("#btnMsgOk").bind("click", function(evt) {
                	$this.extBlock.hide(function() {
                        IS_SHOW_MESSAGE = false;
                        //--------------------------------------------------------------------------------
                        if (options.callback) {
                            options.callback(true);
                        }
                    });
                	$this.init();	//버튼명, 클래스 초기화
                });
                //--------------------------------------------------------------------------------
                // 두번째 버튼 이벤트(취소 버튼)
                //--------------------------------------------------------------------------------
                $($this.extContainer).find("#btnMsgCancel").bind("click", function(evt) {
                	$this.extBlock.hide(function() {
                        IS_SHOW_MESSAGE = false;
                        //--------------------------------------------------------------------------------
                        if(options.callback) {
                            options.callback(false);
                        }
                    });
                	$this.init();	//버튼명, 클래스 초기화
                });
            });

        },
        showAlertMsg: function(options) {
            const _options = {
                title: options.title,
                msg: options.msg,
                callback: options.callback,
            };
            //--------------------------------------------------------------------------------
            const innerHtml = this.getAlertHtml(_options);
            //--------------------------------------------------------------------------------
            this.showBaseMsg(_options, innerHtml);
        },
        getAlertHtml: function(options) {
            options.msg = StringUtil.replaceAll(options.msg, "\n", "<br />");
            //--------------------------------------------------------------------------------
            let resultHtml = "";
            resultHtml += '        <div class="wrap_popup">';
	        resultHtml += '            <h3 class="popup_title">' + options.title;
	        resultHtml += '                <a href="javascript:void(0)" class="' + this.btnClose + ' btn_close_modal_top">close</a>';
	        resultHtml += '            </h3>';
	        resultHtml += '            <div class="wrap_pop_content min_heihgt1">';
	        resultHtml += '                <div class="pop_content">';
	        resultHtml += '                    <p class="ac">';
	        resultHtml +=				           options.msg;
	        resultHtml += '                    </p>';
	        resultHtml += '                </div>';
	        resultHtml += '            </div>';
	        resultHtml += '                <div class="btn_group_popup size01">';
	        if(this.msgType == "confirm") {	//confirm일 때
	        	resultHtml += '                    <button type="button" id="btnMsgCancel" class="' + this.btnCancel + '">' + this.secondBtn +'</button>';
	        	resultHtml += '                    <button type="button" id="btnMsgOk" class="' + this.btnOk + '">' + this.firstBtn +'</button>';
	        } else {
	        	resultHtml += '                    <button type="button" id="btnMsgOk" class="' + this.btnOk + '">' + this.firstBtn +'</button>';
	        }
	        resultHtml += '                </div>';
	        resultHtml += '        </div>';
		    
            return resultHtml;
        },
        toast: function(msg, width, align) {
        	$.toast.config.align = (align && typeof align === "string") ? align : "center";
            $.toast.config.width = (width && typeof width === "number") ? width : 224;
            $.toast(msg, {
                duration: 2000
            });
        }
    };
})(jQuery);