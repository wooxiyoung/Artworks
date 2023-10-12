//================================================================================
// 공통 스크립트
// Utility 와 관련된 내용이 기술되어 있다.
//================================================================================
Utils = function($) {
    return {
    	window: {
    		/**
             * window 스크롤바 가로 사이즈 반환.
             */
            getScrollBarWidth: function() {
                var inner = document.createElement("p");
                var outer = document.createElement("div");
                //------------------------------------------------------------
                inner.style.width = "100%";
                inner.style.height = "200px";
                //------------------------------------------------------------
                outer.style.position = "absolute";
                outer.style.top = "0px";
                outer.style.left = "0px";
                outer.style.visibility = "hidden";
                outer.style.width = "200px";
                outer.style.height = "150px";
                outer.style.overflow = "hidden";
                //------------------------------------------------------------
                outer.appendChild(inner);
                document.body.appendChild(outer);
                //------------------------------------------------------------
                var w1 = inner.offsetWidth;
                outer.style.overflow = "scroll";
                var w2 = inner.offsetWidth;
                //------------------------------------------------------------
                if (w1 == w2) {
                    w2 = outer.clientWidth;
                }
                //------------------------------------------------------------
                document.body.removeChild(outer);
                return (w1 - w2);
            }
    	},
    	string: {
    		//바이트 구하기
    		getStrByte : function(strValue){
    			var nTotalByte;
    			var cOneChar;
    			nTotalByte = 0;
    			cOneChar = "";
    			if ( strValue.length == 0 ){return nTotalByte;}
    			for( var i=0; i < strValue.length; i++ ){
    				cOneChar = strValue.charAt(i);
    				if( escape(cOneChar).length > 4 ){nTotalByte += 2;}
    				else{nTotalByte ++;}
    			}
    			return nTotalByte;
    		},
    		//공백제거
    		//strValue(문자열)
    		//strTrimType(공백제거형식)
    		//1. L	: 왼쪽공백제거
    		//2. R	: 오른쪽공백제거
    		//3. B	: 양쪽공백제거
    		//3. A	: 전체공백제거
    		isTrim : function(strValue,strTrimType){
    			var strReturn;
    			strReturn = "";

    			switch ( strTrimType.toUpperCase() ){
    				case "L" : strReturn = strValue.replace(/^\s+/g,"");
    					break;
    				case "R" : strReturn = strValue.replace(/\s+$/g,"");
    					break;
    				case "B" : strReturn = strValue.replace(/^\s+/g,"").replace(/\s+$/g,"");
    					break;
    				case "A" : strReturn = strValue.replace(/\s+/g,"");
    					break;
    				default : strReturn = strValue;
    					break;
    			}
    			return strReturn;
    		},
    		//문자열에서 특정 문자로 전체 치환
    		replaceAll: function(source, oldStr, newStr) {
                return source.replace(new RegExp(oldStr, "g"), newStr);
            },
    		lengthStr : function(value, length, str){
    			if(value != null && value != '' && value.length > length){
    				value = value.substring(0, length - 1);
    				if(str != null && str != ""){
    					value += str;
    				}
    			}
    			return value;
    		},
    		//null 및 'null'를 체크
    		isNull : function(str){
    			if(str == null || str == undefined || str == 'null' || str == 'NULL'|| str == 'undefined'){
    				return true;
    			}
    			return false;
    		},
    		//null 및 공백 체크
    		isEmpty : function(str){
    			str = String(str);
    			if(str == null || str == undefined || str == '' || str.replace(/\s+/g, '') == '' || str == "null" || str == "NULL" || str == "undefined"){
    				return true;
    			}
    			return false;
    		},
    		//null 및 'null'를 체크 하여 변경할 값 리턴
    		nullToCustom : function(str, cha){
    			if(str == null || str == undefined || str == 'null' || str == 'NULL' || str == ''|| str == "undefined"){
    				if(cha == null){
    					return '';
    				}
    				return cha;
    			}
    			return str;
    		},
    		//null 및 'null'를 체크 하여 ''값으로 리턴
    		nullToBlank : function(str){
    			if(str == null || str == undefined || str == 'null' || str == 'NULL' || str == '' || str == "undefined"){
    				return '';
    			}
    			return str;
    		},
    		//null 및 'null'를 체크 하여 0값으로 리턴
    		nullToZero : function(str){
    			if(str == null || str == undefined || str == 'null' || str == 'NULL' || str == '' || str == "undefined"){
    				return 0;
    			}
    			return str;
    		},
    		//html 태그 convert
    		htmlTagConvert : function(str){
    			str = str.replace(/&amp;/g, "&");
    			str = str.replace(/&lt;/g, "<");
    			str = str.replace(/&gt;/g, ">");
    			str = str.replace(/&#34;/g, "\"");
    			str = str.replace(/&#39;/g, "\'");
    			str = str.replace(/&nbsp;/g, " ");
    			str = str.replace(/&quot;/g, "\"");
    			return str;
    		},
    		//공백 제거 후 length 반환
    		getLength : function(str){
    			str = String(str);
    			str = str.replace(/\s+/g, '');
    			return str.length;
    		},
    		getScriptConvert : function(str){
    			//스크립트 문자를 서버 방화벽에서 필터링되지 않도록 치환한다.
    			//예 : javascript -> j*a*v*a*s*c*r*i*p*t*
    			var arrScriptObj = ["onclick", "javascript"];

    			for(var i=0; i<arrScriptObj.length; i++) {

    				var arrStrTemp = arrScriptObj[i].split("");
    				var strScriptObjTemp = "";
    				for(var j=0; j<arrStrTemp.length; j++) {

    					strScriptObjTemp += arrStrTemp[j] + "@";

    				}

    				var sRegExInput = new RegExp(arrScriptObj[i], "g");

    				str = str.replace(sRegExInput, strScriptObjTemp);

    			}

    			return str;
    		},
    		//좌측 문자열 채우기
    		lpad : function(str, padLen, padStr){
    			if (padStr.length > padLen) {
    		        return str;
    		    }
    		    str += ""; // 문자로
    		    padStr += ""; // 문자로
    		    while (str.length < padLen)
    		        str = padStr + str;
    		    str = str.length >= padLen ? str.substring(0, padLen) : str;
    		    return str;
    		},
    		//우측 문자열 채우기
    		rpad : function(str, padLen, padStr){
    			if (padStr.length > padLen) {
    		        return str + "";
    		    }
    		    str += ""; // 문자로
    		    padStr += ""; // 문자로
    		    while (str.length < padLen)
    		        str += padStr;
    		    str = str.length >= padLen ? str.substring(0, padLen) : str;
    		    return str;
    		},
    		//특수문자 제거 
    		getRemoveSpecChar : function(str,reg){
    			if(reg == null || reg == ''){
    				reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    			}
    		  //특수문자 검증
    		  if(reg.test(str)){
    		    //특수문자 제거후 리턴
    		    return str.replace(reg, "");    
    		  } else {
    		    //특수문자가 없으므로 본래 문자 리턴
    		    return str;
    		  }  
    		},
    		// 숫자에 콤마를 붙임
    		formatCommas : function(str){
    			var reg = /(^[+-]?\d+)(\d{3})/;
    			str += '';
    			while (reg.test(str))
    			    str = str.replace(reg, '$1' + ',' + '$2');
    			return str;
    		},
    		//사업자 번호 format
    		formatBizNo: function(str) {
    			var reg = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/;
    			if(reg.test(str)){
    				str = stringUtil.replaceAll(str,'-','');
    				return str.replace(reg,"$1-$2-$3");
    			}else{
    				return str;
    			}
    		},
    		//핸드폰 번호 format
    		formatPhoneNumber: function(str) {
    			var reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
    			if(reg.test(str)){
    				str = StringUtil.replaceAll(str,'-','');
    				return str.replace(reg,"$1-$2-$3");
    			}else{
    				return str;
    			}
    		},
    		//숫자로
    		toNumber: function(numStr) {
                if(!numStr) {
                    return "";
                }
                //------------------------------------------------------------
                numStr = numStr + "";
                //------------------------------------------------------------
                var m = numStr.substring(0, 1) == "-";
                var ret = numStr.replace(/[^\d]/g, "");
                //------------------------------------------------------------
                return m ? ("-" + ret) : ret;
            },
            //문자열 포함 여부 반환
            isContainStr: function(val, containStr) {
            	if(val.indexOf(containStr) != -1){
            		return true;
            	}
            	return false;
            },
            //핸드폰 번호 포함 여부 반환
            isContainPhoneNum: function(val, containPhoneNum) {
            	var phone = String(StringUtil.formatPhoneNumber(containPhoneNum));
            	var lastNum  = '';
            	var midNum  = ''
            	if(containPhoneNum.indexOf('-') != -1){
            		lastNum  = (containPhoneNum.split("-"))[2];
            		midNum  = (containPhoneNum.split("-"))[1];
            	}else{
            		lastNum  = (containPhoneNum.slice(-4));
            		var tmp = (containPhoneNum.slice(-8));
            		midNum = tmp.slice(0,4);
            	}
            		
            	if(val.indexOf(lastNum) != -1 || val.indexOf(midNum) != -1) {
            		return true;
            	}
            	return false;
            },
            //동일한 숫자 및 문자가 3번 이상 반복되는지 여부 반환
            isRepeatVal: function(val) {
            	var reg = /([0-9a-zA-Z])\1{2,}/;
            	
            	return reg.test(val);
            },
            //3번 연속된 숫자 및 문자가 있는지 여부 반환(charCodeAt)
            isContinueVal: function(val) {
            	val = val.toString();
            	if (!val.trim()) {
            		return false;
            	}

            	const chrStr = [...val].map(v => v.charCodeAt());
            	let preStr = 0;
            	let chr = 0;

            	chrStr.forEach(s => {
            	  if (Math.abs(preStr - s) == 1) {
            		  chr++;
            	  } 

            	  preStr = s;
            	});

            	return chr > 1;
            }
    	},
    	
    	validate: {
    		/**
             * 숫자 형식 체크
             */
    		validNumber : function(val){
    			var reg = /[^0-9]/g;
    			if(reg.test(val)){
    				return false;
    			}
    			return true;
    		},
    		/**
             * 이메일 형식 체크
             */
            validEmail: function(param) {
                var str = (typeof param === "string") ? param : $(param).val();
                //------------------------------------------------------------
                if(str == "") {
                    return true;
                }
                //------------------------------------------------------------
                var check_email = str.search(/^\s*[\w\.\~\-]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g);
                //------------------------------------------------------------
                return (check_email == 0);
            },
            /**
             * 이메일 형식 체크(아이디 제외, @ 부터 시작 체크)
             */
            validEmail2: function(param) {
            	var str = (typeof param === "string") ? param : $(param).val();
            	//------------------------------------------------------------
            	if(str == "") {
            		return true;
            	}
            	//------------------------------------------------------------
            	var check_email = str.search(/^\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g);
            	//------------------------------------------------------------
            	return (check_email == 0);
            },
            /**
             * 도메인 형식 체크
             */
            validDomain: function(param) {
                var str = (typeof param === "string") ? param : $(param).val();
                //------------------------------------------------------------
                if(str == "") {
                    return true;
                }
                //------------------------------------------------------------
                var check_domain = str.search(/^\s*[\w\~\-]+(\.[\w\~\-]+)+\s*$/g);
                //------------------------------------------------------------
                return (check_domain == 0);
            },
            /**
             * 전화번호 형식 체크
             */
            validPhone: function(str) {
            	var reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
            	if(reg.test(str)){
    				return true;
    			}
    			return false;
            },
            /**
             * 날짜 형식 체크
             */
            validDate: function(date) {
                var val = StringUtil.toNumber(date).toString();
                //------------------------------------------------------------
                if(val.length < 4) {
                    return true;
                }
                //------------------------------------------------------------
                var reg = "";
                //------------------------------------------------------------
                if(val.length == 4) {
                    reg = /^([12][0-9]{3})$/g;
                }
                else if(val.length == 5) {
                    reg = /^([12][0-9]{3}[01])$/g;
                }
                else if(val.length == 6) {
                    reg = /^(([12][0-9]{3})(0[1-9]|1[0-2]))$/g;
                }
                else if(val.length == 7) {
                    reg = /^(([12][0-9]{3})(0[1-9]|1[0-2])([0123]))$/g;
                }
                else if(val.length == 8) {
                    reg = /^(([12][0-9]{3})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))$/g;
                }
                else {
                    return true;
                }
                //------------------------------------------------------------
                return (val.search(reg) == 0);
            },
            /**
             * 비밀번호 형식 체크(영문/숫자/특수문자 조합 & 8자리 이상)
             */
            validPassword: function(str) {
            	var reg = /^(?=.*[A-Za-z])(?=.*\d).(?=.*[$@$!%*#?&~])[A-Za-z\d$@$!%*#?&~]{7,}$/;
            	if(!reg.test(str)){
            		return false;
            	}
            	return true;
            },
            /**
             * ID 형식 체크
             */
            validUserId: function(str) {
            	var reg = /^[a-z]+[a-z0-9]{4,19}$/g;
            	if(!reg.test(str)){
            		return false;
            	}
            	return true;
            },
            /**
             * 사업자등록번호 형식 체크
             */
            validBizNo: function(str) {
            	var numberMap = str.replace(/-/gi, '').split('').map(function(d) {
        	      return parseInt(d, 10);
        	    });
            	
        	    if(numberMap.length == 10){
        	      var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
        	      var chk = 0;

        	      keyArr.forEach(function(d, i){
        	        chk += d * numberMap[i];
        	      });
        	      
        	      chk += parseInt((keyArr[8] * numberMap[8])/ 10, 10);
        	      
        	      return Math.floor(numberMap[9]) === ( (10 - (chk % 10) ) % 10);
        	    
        	    }
        	    
        	    return false;
            }
    	},
    	
    	date: {
    		/**
             * 현재 年을 YYYY형식으로 리턴
             */
            getYear: function() {
                return new Date().getFullYear();
            },
            /**
             * 현재 月을 MM형식으로 리턴
             */
            getMonth: function() {
                var month = new Date().getMonth() + 1;
                return month < 10 ? "0" + month : "" + month;
            },
            /**
             * 현재 日을 DD형식으로 반환
             */
            getDay: function() {
                var day = new Date().getDate();
                return day < 10 ? "0" + day : "" + day;
            },
            /**
             * 현재 Hour 을 HH형식으로 반환
             */
            getHour: function() {
                var hour = new Date().getHours();
                return hour < 10 ? "0" + hour : "" + hour;
            },
            /**
             * 현재 Minute 을 MM형식으로 반환
             */
            getMin: function() {
                var min = new Date().getMinutes();
                return min < 10 ? "0" + min : "" + min;
            },
            /**
             * 현재 Second 을 SS형식으로 반환
             */
            getSec: function() {
                var sec = new Date().getSeconds();
                return sec < 10 ? "0" + sec : "" + sec;
            },
            /**
             * YYYYMMDD 로 오늘 날짜 반환
             */
    		getToday : function(){
    			return this.getYear().toString() + this.getMonth().toString() + this.getDay().toString();
    		},
    		/**
             * 현재 시분초 반환
             */
    		getCurrentTime : function() {
    			return this.getHour().toString() + this.getMin().toString() + this.getSec().toString();
    		},
    		/**
             * 현재 일자 및 시분초 반환
             */
    		getCurrentDt : function() {
    			return this.getYear().toString() + this.getMonth().toString() + this.getDay().toString() 
    					+ this.getHour().toString() + this.getMin().toString() + this.getSec().toString();
    		},
    		/**
             * 날짜를 formatting 하여 반환
             * 파라미터의 date 값이 14자리이면, 일자 부분은 se 값에 맞춰 formatting 되고 시분초 부분은 콜론(:)으로 구분하여 반환
             */
    		formatDate : function(date, strLength){
    			var dateStr = String(date);
    			var re = "";
                var replace = "";
                var dateStrNoDash = StringUtil.toNumber(dateStr);
                var returnVal = "";
                var se = "-";	//날짜 fomatting 구분자
                //------------------------------------------------------------
                if(!StringUtil.isEmpty(strLength)){
                	dateStrNoDash = dateStrNoDash.substr(0, strLength);
                }
                
                if(dateStrNoDash.length == 4) {	//년도
                    re = /(\d{4})/;
                    replace = "$1";
                    returnVal = dateStrNoDash.replace(re, replace);
                }
                else if (dateStrNoDash.length == 6) {	//년월
                    re = /(\d{4})(\d{2})/;
                    replace = "$1" + se + "$2";
                    returnVal = dateStrNoDash.replace(re, replace);
                }
                else if (dateStrNoDash.length == 8) {	//년월일
                	re = /(\d{4})(\d{2})(\d{2})/;
                    replace = "$1" + se + "$2" + se + "$3";
                    returnVal = dateStrNoDash.replace(re, replace);
                }
                else if (dateStrNoDash.length == 14) {	//년월일 시분초
                	re = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
                    replace = "$1" + se + "$2" + se + "$3" + " " + "$4:$5:$6";
                    returnVal = dateStrNoDash.replace(re, replace);
                }
                else {
                    returnVal = date;
                }
                //------------------------------------------------------------
                return returnVal;
    		},
    		/**
             * 시분초를 formatting 하여 반환
             */
    		formatTime : function(time){
    			var return_val = null;
    			if(time.length == 4){	//시분
    				return_val = time.substring(0,2) + ":" + time.substring(2,4);
    			} else if(time.length == 6){	//시분초
    				return_val = time.substring(0,2) + ":" + time.substring(2,4) + ":" + time.substring(4,6);
    			} else{
    				return_val = time;
    			}
    			return return_val;
    		},
    		/**
             * 특정일자에 년을 더한 날짜를 구한다.
             */
            getAddYears: function(years, date) {
                return this.getAddMonths(parseInt(years) * 12, date);
            },
            /**
             * 특정일자에 월를 더한 날짜를 구한다.(한편 넣기)
             * EX) getAddMonths("2") 현재일 20090212 이면 return 값은 20090411
             */
            getAddMonths: function(addMonth, date) {
                var before = date ? date : this.getToday();
                var year = Number(before.substring(0, 4));
                var mon = Number(before.substring(4, 6));
                var date = Number(before.substring(6, 8));
                //------------------------------------------------------------
                // 이전/다음 월을 구함.
                //------------------------------------------------------------
                var result = new Date(year, mon + addMonth, 0);
                year = result.getFullYear();
                mon = result.getMonth() + 1;
                //------------------------------------------------------------
                // 해당월의 마지막 일자.
                //------------------------------------------------------------
                var lastDay = DateUtil.getLastDay(year, mon);
                //------------------------------------------------------------
                // 만으로 월을 계산하기 위하여 이전이면 +1 일 이후이면 -1 을 해준다.
                //------------------------------------------------------------
                if(addMonth < 0 && lastDay < (date + 1)) {
                    result = new Date(year, mon, 1);
                }
                else if(addMonth > 0 && lastDay < (date - 1)) {
                    result = new Date(year, mon - 1, lastDay);
                }
                else {
                    result = new Date(year, mon - 1, addMonth < 0 ? (date + 1) : (date - 1));
                }
                //------------------------------------------------------------
                year = result.getFullYear();
                mon  = result.getMonth() + 1;
                date = result.getDate();
                //------------------------------------------------------------
                return year + '' + (mon < 10 ? '0' + mon : mon) + '' + (date < 10 ? '0' + date : date);
            },
            /**
             * 특정일자에 일자를 더한 날짜를 구한다.
             * EX) getAddDays("2") 현재일 20090212 이면 return 값은 20090214
             */
            getAddDays: function(days, date) {
                var before = date ? date : this.getToday();
                var date   = new Date(before.substring(0, 4), Number(before.substring(4, 6)) - 1, Number(before.substring(6, 8))+ Number(days));
                var year   = String(date.getFullYear());
                var month  = String(date.getMonth() + 1);
                var day    = String(date.getDate());
                //------------------------------------------------------------
                if(month.length == 1) {
                    month = "0" + month;
                }
                //------------------------------------------------------------
                if(day.length == 1) {
                    day = "0" + day;
                }
                //------------------------------------------------------------
                return "" + year + "" + month + "" + day;
            },
            /**
             * 해당 월의 마지막일자를 구한다.
             */
            getLastDay: function(year, mon) {
                var month = mon - 1;
                var d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                //------------------------------------------------------------
                if(((0 == (year % 4)) && ((0 != (year % 100)) || (0 == (year % 400)))) && month == 1) {
                    return 29;
                }
                else {
                    return d[month];
                }
            },
            /**
             * 두개의 일자를 비교한다.
             * fromDate가 더 크면 false
             * toDate가 더 크거나 같으면 true 리턴
             */
    		dateCompare:function(fromDate,toDate){
    			if(StringUtil.isEmpty(fromDate) || StringUtil.isEmpty(toDate)){
    				return true;
    			}
    			if(!ValidUtil.validDate(fromDate) || !ValidUtil.validDate(toDate)){
    				return false;
    			}
    			var f_date = new Date(fromDate);
    			var t_date = new Date(toDate);
    			return fromDate <= toDate;
    		},
    		isDatePattern:function(date, nullable){
    			var vValue = date; 
    			var vValue_Num = vValue.replace(/[^0-9]/g, ""); 
    			if (StringUtil.isNull(vValue_Num) || vValue_Num == '') {
    				return nullable; 
    			} 
    			if (vValue_Num.length != 8) { 
    				return false; 
    			} 
    			var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; 
    			var dtArray = vValue_Num.match(rxDatePattern); 
    			if (dtArray == null) { return false; }
    			
    			dtYear = dtArray[1]; 
    			dtMonth = dtArray[2]; 
    			dtDay = dtArray[3]; 
    			//yyyymmdd 체크 
    			if (dtMonth < 1 || dtMonth > 12) { 
    				return false; 
    			} else if (dtDay < 1 || dtDay > 31) { 
    				return false; 
    			} else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
    				return false; 
    			} else if (dtMonth == 2) { 
    				var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0)); 
    				if (dtDay > 29 || (dtDay == 29 && !isleap)) { 
    					return false; 
    				} 
    			} 
    			return true;
    		}
    	},
    	
    	mask: {
    		//이름 마스킹
    		getMaskedName: function(name) {
    			var maskedName = "";
    			var firstName = "";
    			var middleName = "";
    			var lastName = "";
    			var lastNameStartPoint;

    			if(!StringUtil.isEmpty(name)) {
    				if(name.length > 1) {
    					firstName = name.substring(0, 1);
    					lastNameStartPoint = name.indexOf(firstName);

    					if(name.trim().length > 2) {
    						middleName = name.substring(lastNameStartPoint+1, name.trim().length-1);
    						lastName = name.substring(lastNameStartPoint+(name.trim().length-1), name.trim().length);
    					} else {
    						middleName = name.substring(lastNameStartPoint+1, name.trim().length);
    					}

    					var makers = "";
    					for(var i = 0; i < middleName.length; i++) {
    						makers += "*";
    					}

    					lastName = middleName.replace(middleName, makers) + lastName;
    					maskedName = firstName + lastName;
    				} else {
    					maskedName = name;
    				}
    			}

    			return maskedName;
    		},
    		//이메일 마스킹
    		getMaskedMail: function(mail) {
    			var sRslt = mail;
    		
    			if(!StringUtil.isEmpty(mail)) {
    				if(ValidUtil.validEmail(sRslt)) {
    					var emailId = sRslt.split("@")[0];
    					var emailDomain = sRslt.split("@")[1];
    					var firstEmailId = "";
    					var maskedId = "";
    		
    					if(emailId.length > 3) {
    						firstEmailId = emailId.substring(0, 3);
    		
    						for(var i = 3; i < emailId.length; i++) {
    							maskedId += "*";
    						}
    						maskedId = firstEmailId + maskedId;
    					} else {
    						firstEmailId = emailId.substring(0, emailId.length-1);
    		
    						for(var i = emailId.length-1; i < emailId.length; i++) {
    							maskedId += "*";
    						}
    						maskedId = firstEmailId + maskedId;
    					}
    					sRslt = maskedId + "@" + emailDomain;
    				}
    			}
    		
    			return sRslt;
    		},
    		//전화번호 마스킹
    		getMaskedPhoneNum: function(str) {
    			var originStr = str;
    			var phoneStr;
    			var maskingStr;

    			if(StringUtil.isEmpty(originStr)) {
    				return originStr;
    			}

    			if(originStr.toString().split('-').length != 3) {
    				phoneStr = originStr.length < 11 ? originStr.match(/\d{9,10}/gi) : originStr.match(/\d{11}/gi);
    				if(StringUtil.isEmpty(phoneStr)) {
    					return originStr;
    				}

    				if(originStr.length < 11) {
    					maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1$2****'));
    				} else {
    					maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{4})(\d{4})/gi,'$1$2****'));
    				}
    			} else {
    				phoneStr = originStr.toString().split('-');
    				maskingStr = phoneStr[0] + "-" + phoneStr[1] + "-" + phoneStr[2].replace(/\d/g, '*');
    			}

    			return maskingStr;
    		}
    	}
    };
}(jQuery);

const WindowUtil = Utils.window;
const StringUtil = Utils.string;
const ValidUtil = Utils.validate;
const DateUtil = Utils.date;
const MaskUtil = Utils.mask;
