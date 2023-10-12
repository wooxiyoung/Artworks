/*
 * 중복 submit 및 중복 클릭 방지 변수
 */
let isSubmit = false;  // submit 여부

/*
 * 화면 block 처리 변수
 */
let lodingExtBlock = null;   // 화면 로딩 block object
let isDimmed = false;	//dimmed 처리 여부

/*
 * 메세지 관련 변수
 */
let Message = null;		//메시지 관련 Object
let IS_SHOW_MESSAGE = false;  // 메시지 표시 여부
//var IS_ERROR_ATTRIBUTE_NAME = "_IS_ERROR";                      
//var MESSAGE_ATTRIBUTE_NAME = "_resultMessage";
//var ERROR_MESSAGE_ATTRIBUTE_NAME = "_ERROR_MESSAGE";            

/*
 * 페이징 관련 변수
 */
let AJAX_PAGING_CALLBACK = null;	//페이징 번호 클릭 시 callback 함수

let ExtValidation = null;	//validation object

//toast 그리드에서 사용할 Button
var GRID_BTN = (function() {
	function GRID_BTN(props) {
		const btnEl = document.createElement('button');
		const { btnName, btnClass, onClick } = props.columnInfo.renderer.options;
		btnEl.type = "button";
		btnEl.innerHTML = btnName;
		btnEl.className = btnClass;
		btnEl.onclick = onClick(props.rowKey);
	    
	    this.el = btnEl;
	    this.render(props);
  	}

	GRID_BTN.prototype.getElement = function() {
    	return this.el;
  	}

	GRID_BTN.prototype.render = function(props) {
    	this.el.value = String(props.value);
  	}
	
	return GRID_BTN;
})(jQuery);

//toast 그리드에서 사용할 컨텍스트 메뉴 Object
var CONTEXT_MENU = (function() {
	function CONTEXT_MENU(props) {
		const value = props.value;
		const spanEl = document.createElement('span');
		spanEl.className = "wrap_btn_more_circle";
		
		const btnEl = document.createElement('button');
		const { src,contextItems } = props.columnInfo.renderer.options;
		btnEl.type = "button";
		btnEl.className = "btn_more_circle";
		btnEl.src = src;
		
		$(spanEl).text(value);
		$(spanEl).append(btnEl);
		
	    this.el = spanEl;
	    this.render(props);
  	}

	CONTEXT_MENU.prototype.getElement = function() {
    	return this.el;
  	}

	CONTEXT_MENU.prototype.getValue = function() {
    	return this.el.value;
  	}

	CONTEXT_MENU.prototype.render = function(props) {
    	this.el.value = String(props.value);
  	}
	
	return CONTEXT_MENU;
})(jQuery);

/*
 * 브라우저 및 시스템 관련 변수
 */
const IS_WIN  = (navigator.userAgent.indexOf("Win") != -1);  // Window OS 여부
const IS_MAC  = (navigator.userAgent.indexOf("Mac") != -1);  // Mac OS 여부
const IS_UNIX = (navigator.userAgent.indexOf("X11") != -1);  // UNIX OS 여부
const IS_MSIE    = (navigator.userAgent.indexOf('MSIE')        != -1)
              || (navigator.userAgent.indexOf('Trident/7.0') != -1);  // MSIE 여부
const IS_IE11    = (navigator.userAgent.indexOf('Trident/7.0') != -1);  // IE11 여부
const IS_CHROME  = (navigator.userAgent.indexOf('Chrome')      != -1);  // Chrome 여부
const IS_FIREFOX = (navigator.userAgent.indexOf('Firefox')     != -1);  // Firefox 여부
const IS_SAFARI  = (navigator.userAgent.indexOf('Safari')      != -1);  // Safari 여부
const IS_OPERA   = (navigator.userAgent.indexOf('Opera')       != -1);  // Opera 여부
const IS_EDGE	   = (navigator.userAgent.indexOf('Edg')		 != -1);  // Edge 여부
const BROWSER_VERSION = function (userAgent, browser) {
    let rv = "UnKnown";
    let re = null;
    //------------------------------------------------------------
    if(browser == 'MSIE') {
        re = new RegExp(((IS_IE11) ? "rv:" : "MSIE ") + "([0-9]{1,}[\.0-9]{0,})");
    }
    else {
        re = new RegExp(browser + "/([0-9]{1,}[\.0-9]{0,})");
    }
    //------------------------------------------------------------
    if (re.exec(userAgent) != null) {
        rv = parseFloat(RegExp.$1);
    }
    //------------------------------------------------------------
    return rv;
}(navigator.userAgent, IS_MSIE ? 'MSIE' : IS_CHROME ? 'Chrome' : IS_SAFARI ? 'Safari' : IS_OPERA ? 'Opera' : IS_FIREFOX ? 'Firefox' : IS_EDGE ? 'Edge' : 'UnKnown');

/**
 * 확장 모듈 name space
 *
 * @class
 */
ext = {};
