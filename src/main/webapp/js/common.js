/**
 * 화면 초기화
 */
function initApp() {
    $(document).ready(function() {
    	Message = ext.message;  // Message 설정
    	
        //------------------------------------------------------------
        // 중복 서밋 방지 해제.
        //------------------------------------------------------------
        isSubmit = false;
        //------------------------------------------------------------
        // 컴포넌트 초기화
        //------------------------------------------------------------
        initComponent();
        //------------------------------------------------------------
        // 페이지 블럭 해제.
        //------------------------------------------------------------
        gfn_setDimmed(false);
    });
}

/**
 * 컴포넌트 초기화
 */
function initComponent() {
	//------------------------------------------------------------
    // datepicker
    //------------------------------------------------------------
	$.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        , showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        , showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        , yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        , monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        , monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        , dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        , dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
		//, changeYear: true //콤보박스에서 년 선택 가능
	    //, changeMonth: true //콤보박스에서 월 선택 가능
	    , minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
	    , maxDate: "+5Y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
	    , beforeShow: function() {
	        setTimeout(function(){
	            $('.ui-datepicker').css('z-index', 99999);
	        }, 0);
	    }
	});
}

/**
 * 로딩 Block
 * (submit 등등..)
 * @param isBlock
 */
/*function loadingBlock(isBlock, loadingText) {
	var LOADING_TEXT = "";
	var LOADING_IMAGE_PATH = "";
	
	if(!StringUtil.isEmpty(loadingText)) {
		LOADING_TEXT = "<span>" + loadingText + "</span>";
		LOADING_IMAGE_PATH = '<center><img src="' + CONTEXT_PATH + "/images/loading.gif" + '" alt="loading.." /></center>';
	}
	var LOADING_WRAP_LAYER = '<div id="loadingLayer">' + LOADING_TEXT + LOADING_IMAGE_PATH + '</div>';
	
	if(isBlock) {
        if (!lodingExtBlock) {
            lodingExtBlock = new ext.Block();
            lodingExtBlock.show(LOADING_WRAP_LAYER, {
                focus: false,
                addTop : -50
            }, null);
        }
    }
    else {
        if (lodingExtBlock) {
            lodingExtBlock.hide();
            lodingExtBlock = null;
        }
    }
}*/

/**
 * Ajax Submit 을 수행한다.
 *
 * @param uri URI
 * @param options ajax 옵션
 * @param callback callback function
 * @param isSkipSessionCheck [option] Session Check Skip 여부
 */
function gfn_ajaxCall(uri, options, callback, isSkipSessionCheck) {
    //------------------------------------------------------------
    // 중복 submit 방지
    //------------------------------------------------------------
    if(isSubmit) {
        return;
    }
    //------------------------------------------------------------
    // 현재 세션 유효성 체크
    //------------------------------------------------------------
    const sessionState = (isSkipSessionCheck) ? true : gfn_sessionChk();
    //------------------------------------------------------------
    if(sessionState) {
    	if(options.async == false) {
    		isSubmit = true;
    	}
        
        //------------------------------------------------------------
        // options object 가 비어있을 경우
        //------------------------------------------------------------
        if(Object.keys(options).length === 0) {
        	options.param = {};
        }
        //------------------------------------------------------------
        // Call Ajax
        //------------------------------------------------------------
        $.ajax({
            type: "POST",
            cache: (options && typeof(options.cache) === "boolean") ? options.cache : false,
            url: uri,
            contentType: (options && typeof(options.contentType) === "string") ? options.contentType : "application/json; charset=UTF-8",
            dataType: (options && typeof(options.dataType) === "string") ? options.dataType : "json",
            data: (options && typeof(options.param) === "object") ? JSON.stringify(options.param) : {},
            async: (options && typeof(options.async) === "boolean") ? options.async : true,
            beforeSend: (options && typeof(options.beforeSend) === "function") ? options.beforeSend : function(xmlHttpRequest) {
            	//dimmed 처리
            	gfn_setDimmed(true);
            	
            	xmlHttpRequest.setRequestHeader("AJAX", "true");
            	
            	//for csrf
            	const token = $("meta[name='_csrf']").attr("content");
            	const header = $("meta[name='_csrf_header']").attr("content");
    			//for csrf
    			if(!StringUtil.isEmpty(header)) {
    				xmlHttpRequest.setRequestHeader(header, token);
    			}
    		},
            success: (options && typeof(options.success) === "function") ? options.success : function(data, status) {
            },
            error: (options && typeof(options.error) === "function") ? options.error : function(jqXHR, textStatus, errorThrown) {
            },
            complete: (options && typeof(options.complete) === "function") ? options.complete : function(data, status) {
                //------------------------------------------------------------
                // 중복 서밋 방지 해제.
                //------------------------------------------------------------
                isSubmit = false;
                //------------------------------------------------------------
                // 페이지 블럭 해제.
                //------------------------------------------------------------
                gfn_setDimmed(false);
                //------------------------------------------------------------
                let resultJson = data.responseJSON;
                //------------------------------------------------------------
                if(status === "success") {
                    resultJson.isError = false;
                    resultJson.errorMsg = "";
                    //------------------------------------------------------------
                    // XXX 오류메시지 처리
                    //------------------------------------------------------------
                    var isError = resultJson[IS_ERROR_ATTRIBUTE_NAME];
                    //------------------------------------------------------------
                    if(isError === true || isError === "true") {
                        isError = true;
                        //------------------------------------------------------------
                        var errorMessage = resultJson[ERROR_MSG_ATTRIBUTE_NAME];
                        //------------------------------------------------------------
                        Message.error(errorMessage);
                        //------------------------------------------------------------
                        resultJson.isError = true;
                        resultJson.errorMsg = errorMessage;
                    }
                }
                else {
                	gfn_ajaxError(data);
            		
                    resultJson = {};
                    resultJson.isError = true;
                    resultJson.errorMsg = status;
                }
                //------------------------------------------------------------
                // callback function 호출
                //------------------------------------------------------------
                AJAX_PAGING_CALLBACK = null;
                //------------------------------------------------------------
                if(callback) {
                    callback(resultJson);
                }
            }
        });
    }
    else {
        Message.alert("로그인 시간이 만료되었습니다.\n로그인 화면으로 이동합니다.", null, function() {
        	$(location).attr('href', "/login");
        });
    }
}

/*
 * Ajax Error 처리
 */
function gfn_ajaxError(res) {
	if(res != null && res != undefined) {
		const status = res.status;
		
		if(status == '0') {
			Message.error('연결되지 않았습니다.\n네트워크를 확인하시길 바랍니다.');
		} else if(status == '400') {
			Message.error('잘못된 요청입니다.\n관리자에게 문의하시기 바랍니다.');
		} else if(status == '401') {
			Message.error('인증되지 않은 접근입니다.\n관리자에게 문의하시기 바랍니다.', function() {
				$(location).attr('href', "/");
			});
		} else if(status == '403') {
			Message.error('리소스에 접근할 수 없습니다.\n관리자에게 문의하시기 바랍니다.', function() {
				$(location).attr('href', "/");
			});
		} else if(status == '404') {
			Message.error('요청한 페이지를 찾을 수 없습니다.\n관리자에게 문의하시기 바랍니다.');
		} else if(status == '500') {
			Message.error('내부 서버 오류입니다.\n관리자에게 문의하시기 바랍니다.');
		} else if(status == '503') {
			Message.error('서버 접속 오류입니다.\n관리자에게 문의하시기 바랍니다.');
		} else {
			Message.error('['+status+'] 시스템 오류입니다.\n관리자에게 문의하시기 바랍니다.');
		}
	} else {
		Message.error('시스템 오류입니다.\n관리자에게 문의하시기 바랍니다.');
	}
}

/**
 * Ajax 용 paging 을 표시한다.
 *
 * @param elementId  paging 이 표현될 ElementId
 * @param pagingInfo PagingInfo
 * @param url        URL
 * @param param      Parameter[json]
 * @param callback
 * @param isSkipSessionCheck 세션체크skip여부
 */
function gfn_ajaxPaging(elementId, pagingInfo, url, options, callback, isSkipSessionCheck) {
	const AJAX_PAGING_SUBMIT_FUNC_NAME = "_pagingAjax";	//페이지 번호 클릭시 호출되는 function 명
	
	options = escape((!options || options == null) ? "{}" : JSON.stringify(options));
    //------------------------------------------------------------
    AJAX_PAGING_CALLBACK = callback;
    isSkipSessionCheck = (isSkipSessionCheck) ? true : false;
    //------------------------------------------------------------
    let pagingHtml = "";
    pagingHtml += "<ul>";
    //------------------------------------------------------------
    // 첫 페이지, 이전 페이지 버튼
    //------------------------------------------------------------
    if(pagingInfo.totalPageCount > pagingInfo.pageSize) {
        if(pagingInfo.firstPageNoOnPageList > pagingInfo.pageSize) {
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + pagingInfo.firstPageNo + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="prev_double" title="첫페이지"></a></li>';
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + (pagingInfo.currentPageNo - 1) + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="prev" title="이전 페이지"></a></li>';
        }
        else {
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + pagingInfo.firstPageNo + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="prev_double" title="첫페이지"></a></li>';
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + pagingInfo.firstPageNo + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="prev" title="이전 페이지"></a></li>';
        }
    }
    pagingHtml += '</ul>';
    pagingHtml += '<span>';
    //------------------------------------------------------------
    // 각 페이지 번호
    //------------------------------------------------------------
    for(let i=pagingInfo.firstPageNoOnPageList; i <= pagingInfo.lastPageNoOnPageList; i++) {
        if(i == pagingInfo.currentPageNo) {
            pagingHtml += '<a href="#" class="on">' + i + '</a>';
        }
        else {
            pagingHtml += '<a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + i + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');">' + i + '</a>';
        }
    }
    pagingHtml += '</span>';
    pagingHtml += '<ul>';
    //------------------------------------------------------------
    // 다음 페이지, 마지막 페이지 버튼
    //------------------------------------------------------------
    if(pagingInfo.totalPageCount > pagingInfo.pageSize) {
        if(pagingInfo.lastPageNoOnPageList < pagingInfo.totalPageCount) {
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + (pagingInfo.currentPageNo + 1) + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="next" title="다음 페이지"></a></li>';
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + pagingInfo.lastPageNo + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="next_double" title="마지막 페이지"></a></li>';
        }
        else {
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + pagingInfo.lastPageNo + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="next" title="다음 페이지"></a></li>';
            pagingHtml += '<li><a href="javascript:' + AJAX_PAGING_SUBMIT_FUNC_NAME + '(' + pagingInfo.lastPageNo + ', \'' + url + '\', \'' + options + '\', ' + isSkipSessionCheck + ');" class="next_double" title="마지막 페이지"></a></li>';
        }
    }
    pagingHtml += '</ul>';
    //------------------------------------------------------------
    const $parentElement = $("#" + elementId).parent();
    //------------------------------------------------------------
    $parentElement.find("#" + elementId).remove();
    $parentElement.append('<div id="' + elementId + '"></div>');
    $parentElement.find("#" + elementId).addClass("pagination").append(pagingHtml);
}

/**
 * Ajax 용 paging 이동 기능을 수행한다.
 * (Ajax paging 에서 내부적으로 사용된다)
 *
 * @param pageNo 페이지번호
 * @param url    URl
 * @param param  Parameter
 * @param isSkipSessionCheck  세션체크skip여부
 */
function _pagingAjax(pageNo, url, options, isSkipSessionCheck) {
	options = JSON.parse(unescape(options));
	options.param.pageIndex = pageNo;
    
    gfn_ajaxCall(url, options, AJAX_PAGING_CALLBACK, isSkipSessionCheck);
}

/**
 * submit 을 수행한다.
 *
 * @param form formName or formID
 * @param _target [option] target frameName
 */
function gfn_formSubmit(form, _action, _method, _target) {
	//if(gfn_sessionChk()) {
		const formObj = gfn_getForm(form);
	    //------------------------------------------------------------
	    // Validation Check
	    //------------------------------------------------------------
	    /*if(!ExtValidation.validate(formObj)) {
	        return;
	    }*/
	    //------------------------------------------------------------
	    // 중복 submit 방지
	    //------------------------------------------------------------
	    if(isSubmit) {
	        return;
	    }
	    //------------------------------------------------------------
	    const $formObj = $(formObj);
	    //------------------------------------------------------------
	    $formObj.attr("method", _method);
	    $formObj.attr("action", _action);
	    //------------------------------------------------------------
	    if (_target != null && _target != "") {
	        $formObj.attr("target", _target);
	    }
	    //------------------------------------------------------------
	    //isSubmit = true;
	    //------------------------------------------------------------
	    formObj.submit();
//	} else {
//		Message.alert("로그인 시간이 만료되었습니다.\n[확인] 버튼을 누르면 로그인 화면으로 이동합니다.", function() {
//        	$(location).attr('href', "/login");
//        });
//	}
}

/**
 * form DOM object 를 반환한다.
 *
 * @param form fromName or formId
 * @returns form object
 */
function gfn_getForm(form) {
    let formObj = null;
    //------------------------------------------------------------
    if(typeof(form) == "object") {
        formObj = form;
    }
    else {
    	const $formByName = $("form[name=" + form + "]");
    	const $formById = $("form").find("#" + form);
        //------------------------------------------------------------
        if($formByName.length > 0) {
            formObj = $formByName[0];
        }
        else if($formById.length > 0) {
            formObj = $formById[0];
        }
    }
    //------------------------------------------------------------
    return formObj;
}

/**
 * 로그아웃
 */
function gfn_logout() {
	
}

/**
 * 세션 체크
 */
function gfn_sessionChk(){
	let returnVal = true;
	/*$.ajax({
        type: "POST",
        url: "/sessionCheck",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: {},
        async: false,
        complete: function(data, status) {
        	returnVal = data.responseJSON.isSession;
        }
    });*/
	return returnVal;
}

/*
 * 쿠키정보를 가져온다.
 * 
 * @param cookieName cookie name
 */
function gfn_getCookie(cookieName){
	cookieName = cookieName + '=';
	const cookieData = document.cookie;
	let start = cookieData.indexOf(cookieName);
	let cookieValue = "";
	if (start != -1) { // 쿠키가 존재하면
		start += cookieName.length;
		let end = cookieData.indexOf(';', start);
		if(end == -1) // 쿠키 값의 마지막 위치 인덱스 번호 설정 
			end = cookieData.length;
		cookieValue = cookieData.substring(start, end);
	}
	return decodeURIComponent(cookieValue);
}

/*
 * 쿠키정보를 설정한다.
 * 
 * @param cookieName cookie name
 * @param value 저장할 cookie 값
 * @param exdays cookie 만료일수
 */
function gfn_setCookie( cookieName, value, exdays ) {
	const exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	const cookieValue = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
	document.cookie = cookieName + "=" + cookieValue;
}

/*
 * textArea 글자수 카운팅하여 출력
 */
function gfn_textAreaCnt(textAreaId, counterId, count){
	$('#'+textAreaId).keyup(function(e){
		const content = $(this).val();
		$('#'+counterId).html(content.length + '/'+count);
	});
	$('#'+textAreaId).keyup();
}

/*
 * datepicker from~to 유효성 체크
 * 
 * @param from element id
 * @param to element id
 */
function gfn_chkFromToDate(fromDateId, toDateId) {
	const fromVal = $("#"+fromDateId).val();
	const toVal = $("#"+toDateId).val();
	
	//시작일자에는 값이 없고, 종료일자에만 값이 있을 때
	if(StringUtil.isEmpty(fromVal) && !StringUtil.isEmpty(toVal)) {
		Message.alert("시작일자를 먼저 입력해 주세요.", null, function() {
			$("#"+toDateId).val("");
			$("#"+fromDateId).focus();
			return false;
		});
	}
	
	//시작일자, 종료일자 둘 다 값이 있지만 종료일자보다 시작일자가 더 클 때
	if(!StringUtil.isEmpty(fromVal) && !StringUtil.isEmpty(toVal)) {
		//시작일자 <= 종료일자 가 아닌경우
		if(!DateUtil.dateCompare(fromVal, toVal)) {
			Message.alert("시작일자가 종료일자보다 클 수 없습니다.", null, function() {
				$("#"+fromDateId).val("");
				$("#"+toDateId).val("");
				$("#"+fromDateId).focus();
				return false;
			});
		}
	}
	
	//시작일자에는 값이 있고, 종료일자에는 값이 없을 때
	if(!StringUtil.isEmpty(fromVal) && StringUtil.isEmpty(toVal)) {
		$("#"+toDateId).val(fromVal);		//종료일자에 시작일자와 같은 값으로 세팅
	}
	
	return true;
}

/*
 * datepicker from~to 유효성 체크를 위한 change 이벤트 적용
 * 
 * @param from element id
 * @param to element id
 */
function gfn_setFromToDate(fromDate, toDate) {
	$("#"+fromDate+", #"+toDate).change(function() {
		gfn_chkFromToDate(fromDate, toDate);
	});
}

/*
 * dimmed 처리
 * 
 * @param isDimmed dimmed 여부
 * @param loadingText dimmed 위에 올라갈 문구
 * @param target dimmed가 적용될 target
 */
function gfn_setDimmed(isDimmed, loadingText, target) {
	let LOADING_TEXT = "";
	if(!StringUtil.isEmpty(loadingText)) {
		LOADING_TEXT = "<center><span>" + loadingText + "</span><img src='" + CONTEXT_PATH + "/images/icon_loading.png" + "' alt='loading..' /></center>";
	}
	
	const LOADING_WRAP_LAYER = '<div id="loadingLayer">' + LOADING_TEXT + '</div>';
	
	if(isDimmed) {
        if (!lodingExtBlock) {
            lodingExtBlock = new ext.Dimmed();
            lodingExtBlock.show(LOADING_WRAP_LAYER, target, null);
        }
    }
    else {
        if (lodingExtBlock) {
            lodingExtBlock.hide();
            lodingExtBlock = null;
        }
    }
}

/*
 * 컨텍스트 메뉴 생성
 * (그리드가 아닌 일반 버튼 등에서 사용할 때는 사용하려는 target 요소에 아래 selector의 클래스나 id 값을 추가해준후 해당 function을 호출해야함)
 * 
 * @param item 컨텍스트 메뉴 정보
 */
function gfn_setContext(items, selector, heigth) {
	$.contextMenu("destroy");
	$.contextMenu({
        selector: selector,
        trigger: 'left',
        items: items
    });
	
	//높이값이 있으면 해당 높이값으로 지정
	if(heigth) {
		$('.context-menu-item').attr('style', 'height: ' + heigth + 'px; line-height: ' + heigth + 'px; !important');
	}
}

/**
 * relation 셀렉트박스 생성
 * 
 * @param arrData selectBox로 구성할 데이터셋(각 selectBox 데이터를 배열로 구성)
 * @param isAll selectBox 첫번째 option 태그로 '전체'를 추가할지 여부(false 일 경우 '선택')
 * @param target 생성된 selectBox 엘리먼트를 넣을 target 엘리먼트
 */
function gfn_setRelationCombo(arrData, isAll, target) {
	//arrData length 만큼 selectbox 미리 생성
	$.each(arrData, function(index){
		const selectElement = $('<select id="select' + (index + 1) + 'Depth" name="select' + (index + 1) + 'Depth"></select>');	//select 엘리먼트 생성
		
		if(isAll) {	//전체
			$(selectElement).append('<option value="">전체</option>');
		} else {	//선택
			$(selectElement).append('<option value="">선택</option>');
		}
		
		//첫번째 데이터(첫번째 select 엘리먼트)는 데이터까지 생성, 그외에는 껍데기만 생성
		if(index == 0) {
			const dataList = arrData[index];		//셀렉트박스에 들어갈 데이터
			
			//첫번째 select 엘리먼트에는 전체 데이터 추가
			for(let i = 0; i < dataList.length; i++) {
				$(selectElement).append('<option value="' + dataList[i].cmnCd + '">' + dataList[i].cdNm + '</option>');	
			}
		}
		
		//생성된 select 엘리먼트를 target에 세팅
		$("#"+target).append(selectElement);
	});

	//target의 select 엘리먼트를 반복하면서 change 이벤트 적용하여 option 엘리먼트 추가
	$("#"+target).find("select").each(function(index, item) {
		//마지막 select 엘리먼트는 이벤트 미적용 처리
		if(index < (arrData.length - 1)) {
			$(this).bind("change", function() {
				const selectedVal = $("option:selected", this).val();	//선택된 값
				const nextSelectElement = $("#"+target).find("select")[index + 1];	//다음 select 엘리먼트
				const nextDataList = arrData[index + 1];
				const arrNextEl = $(this).nextAll();	//현재 select 엘리먼트 이후에 존재하는 전체 select 엘리먼트 배열
				
				//이후의 select 엘리먼트 empty 처리
				$.each(arrNextEl, function() {
					$(this).empty();
					
					if(isAll) {	//전체
						$(this).append('<option value="">전체</option>');
					} else {	//선택
						$(this).append('<option value="">선택</option>');
					}
				});
				
				//다음 select 엘리먼트의 upCd와 현재 선택된 값이 같은 데이터만 option 추가
				for(let j = 0; j < nextDataList.length; j++) {
					if(selectedVal == nextDataList[j].upCd) {
						$(nextSelectElement).append('<option value="' + nextDataList[j].cmnCd + '">' + nextDataList[j].cdNm + '</option>');
					}
				}
			});
		}
	});
}

/**
 * Table구조 rowspan
 * 
 * desc: 첫번째 인자- rowspan 처리할 테이블ID 값
 * 		두번째 인자- rowspan 처리할 td(열)에 지정한 클래스 값(기준값)
 * 		세번째 인자- 두번째 인자에서 지정한 클래스 값 기준으로 rowspan 처리할  td(열) 클래스 배열(생략가능)
 * 		리턴 값: 두번째 인자값 기준 rowspan 후 row 수
 */
function gfn_setRowspan(targetTable, className, arrClassName) {
	let rowspanDataCnt = 0;	//rowspan 후 데이터 건수
	 
	$("#" + targetTable +  " ." + className).each(function() {
		rowspanDataCnt++;
		const rows = $("#" + targetTable +  " ." + className + ":contains('" + $(this).text() + "')");
       	if (rows.length > 1) {
       		rows.eq(0).attr("rowspan", rows.length);
    	   
       		if(arrClassName) {
       			$.each(arrClassName, function(idx, item) {
    				const siblingRow = rows.siblings("#" + targetTable +  " ." + item);
    				siblingRow.eq(0).attr("rowspan", rows.length);
    				siblingRow.not(":eq(0)").remove();
        	   	});
       		}
    	   	
    	   	rowspanDataCnt = rowspanDataCnt - rows.not(":eq(0)").length;	//rowspan 하면서 삭제될 로우만큼 전체 데이터 건수에서 뺌
    	   	rows.not(":eq(0)").remove();
        }  
	});
	
	return rowspanDataCnt;
}

/**
 * 파일 정보 조회
 * 
 * desc: 첫번째 인자- 첨부파일ID(key)
 * 		두번째 인자- 파일정보 조회 후 콜백
 */
function gfn_getFileInfo(fileId, callback) {
	const options = {
		param:{acctFileNo : fileId}
		, beforeSend: function(xmlHttpRequest) {
	    	//dimmed 처리
	    	gfn_setDimmed(false);
	    	
	    	xmlHttpRequest.setRequestHeader("AJAX", "true");
	    	
	    	//for csrf
	    	const token = $("meta[name='_csrf']").attr("content");
	    	const header = $("meta[name='_csrf_header']").attr("content");
			//for csrf
			if(!StringUtil.isEmpty(header)) {
				xmlHttpRequest.setRequestHeader(header, token);
			}
		}
	};
	gfn_ajaxCall("/fileInfo", options, callback);
}

/**
 * 파일 다운로드
 * 
 * desc: 첫번째 인자- 첨부파일ID(key)
 */
function gfn_downFile(fileId) {
	const param = {acctFileNo : fileId};
	//파일 다운로드
    $.ajax({
    	type: 'POST',
        url: '/fileDown',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
        xhrFields: {
            responseType: "blob",
        },
        data: param,
        success: function(data, textStatus, xhr) {
        	//------------------------------------------------------------
            // XXX 오류메시지 처리
            //------------------------------------------------------------
            var isError = data[IS_ERROR_ATTRIBUTE_NAME];
            //------------------------------------------------------------
            if(isError === true || isError === "true") {
                var errorMessage = data[ERROR_MSG_ATTRIBUTE_NAME];
                Message.error(errorMessage);
            } else {
            	if (xhr.readyState == 4 && xhr.status == 200) {
    				// 성공했을때만 파일 다운로드 처리하고
    				let disposition = xhr.getResponseHeader('Content-Disposition'); 
    				let filename; 
    				if (disposition && disposition.indexOf('attachment') !== -1) { 
    					let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/; 
    					let matches = filenameRegex.exec(disposition); 
    					if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, ''); 
    				} 
    				let blob = new Blob([data]); 
    				let link = document.createElement('a'); 
    				link.href = window.URL.createObjectURL(blob); 
    				link.download = decodeURI(filename); 
    				link.click(); 
    			} else{   
    				Message.error("파일 다운로드 중 에러가 발생했습니다.");
    			}
            }
        }
    });
}

/**
 * 파일 삭제
 * 
 * desc: 첫번째 인자- 첨부파일ID(key)
 * 		두번째 인자- 삭제 후 콜백함수
 */
function gfn_removeFile(fileId, callback) {
	const options = {
		param:{acctFileNo : fileId}
		, beforeSend: function(xmlHttpRequest) {
        	//dimmed 처리
        	gfn_setDimmed(false);
        	
        	xmlHttpRequest.setRequestHeader("AJAX", "true");
        	
        	//for csrf
        	const token = $("meta[name='_csrf']").attr("content");
        	const header = $("meta[name='_csrf_header']").attr("content");
			//for csrf
			if(!StringUtil.isEmpty(header)) {
				xmlHttpRequest.setRequestHeader(header, token);
			}
		}
	};
	gfn_ajaxCall("/fileRemove", options, callback);
}

/**
 * 파일 업로드
 * 
 * desc: 첫번째 인자- 업로드 옵션(fileId, fileDivRcd(필수), fileElementId(필수), allowExt, maxSize)
 * 		두번째 인자- 업로드 후 콜백함수
 */
function gfn_uploadFile(options, callback) {
	const formData = new FormData();	//폼데이터
    const uploadFileObj = $("#" + options.fileElementId);	//파일태그 obj
    const fileId = StringUtil.isEmpty(options.fileId) ? "" : options.fileId;		//파일ID
    const fileDivRcd = options.fileDivRcd;	//파일업무구분코드
    
    if(StringUtil.isEmpty(fileDivRcd)) {
    	Message.alert("파일 업무구분 코드가 없습니다.");
    	return false;
    } else {
    	//fileEl을 아이디로 갖는 파일 object 가져와서 formData 에 append
        for(let i = 0; i < uploadFileObj.length; i++) {
        	const files = uploadFileObj[i].files;
        	
        	for(let j = 0; j < files.length; j++) {
        		//업로드 용량 및 확장자 체크
        		if(!gfn_checkFile(files[j], options)) {
        			return false;
        		}
        		formData.append('uploadFile', files[j]);	//파일 object
        	}
        }
        
        formData.append('acctFileNo', fileId);		//파일ID
        formData.append('fileDivRcd', fileDivRcd);	//업무구분코드
        
        if(options.allowExt && typeof(options.allowExt) == "object") {
        	for(var i = 0; i < options.allowExt.length; i++) {
        		formData.append('allowExt', options.allowExt[i]);	//파일체크옵션(파일허용확장자)
        	}
        }
        if(options.maxSize && typeof(options.maxSize) == "number") {
        	formData.append('maxSize', options.maxSize);	//파일체크옵션(최대용량)
        }
        
        //파일 업로드
        $.ajax({
        	type: 'POST',
            url: '/fileUpload',
            processData : false,
            contentType: false,
            data: formData,
            success: function(result) {
            	//------------------------------------------------------------
                // XXX 오류메시지 처리
                //------------------------------------------------------------
                var isError = result[IS_ERROR_ATTRIBUTE_NAME];
                //------------------------------------------------------------
                if(isError === true || isError === "true") {
                    var errorMessage = result[ERROR_MSG_ATTRIBUTE_NAME];
                    Message.error(errorMessage);
                } else {
                	const data = result.fileList;
                	
                	//콜백이 존재하면 업로드 된 파일 정보 리턴
                    if(callback) {
                    	callback(data);
                    }
                }
                
                uploadFileObj.val("");
            }
        });
    }
}

/**
 * 파일 유효성검사
 * 
 * desc: 첫번째 인자- file object
 */
function gfn_checkFile(file, options) {
	const fileName = file.name;		//파일명
	const fileExtIdx = fileName.lastIndexOf(".");		//파일 확장자 index(. 기준임, 파일명에 .이 들어갈 수 있으므로 lastIndexOf) 
	const fileExt = fileName.substring(fileExtIdx+1).toLowerCase();		//파일 확장자(. 구분자 이후부터 가져와야 하므로 +1)
	const fileSize = file.size;		//파일사이즈(바이트)
	const allowExt = (options.allowExt && Array.isArray(options.allowExt)) ? options.allowExt : ['hwp', 'xlsx', 'xls', 'ppt', 'pptx', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf'];		//허용 확장자
	const sizeNum = (options.maxSize && typeof(options.maxSize) === "number") ? options.maxSize : 5;		//파일 최대용량(메가바이트 단위_최대용량 체크 시 메시지에 표출 용도)
    const maxSize = sizeNum * 1024 * 1024;		//업로드 최대용량(바이트)_5MB
    
	if(fileSize > maxSize || $.inArray(fileExt, allowExt) == -1) {
		//최대용량 체크
        if(fileSize > maxSize) {
        	Message.error("업로드 파일 용량은 " + sizeNum + "MB를 초과할 수 없습니다.", function() {
            	return false;
            });
        }
        
        //파일명 확장자 체크
        if($.inArray(fileExt, allowExt) == -1) {
            Message.error("업로드는 아래 확장자만 가능합니다.\n"+allowExt.join(" / "), function() {
            	return false;
            });
        }
    } else {
    	return true;
    }
}


initApp();	//화면초기화 수행
