//////////////////////구 offfice_main.js   /////////////////////////////////
var msgAlert = new validateMessage();
$j(function() {
	office.init();

	$j(".hover_box").on({
		mouseenter: function(e) {
			$j(document).unbind("click");
		},
		mouseleave: function(e) {
			$j(document).bind("click", function() {
				hover_close();
			});
		}
	});

});


var popupWindow = Array();

jQuery.fn.extend({
    showPopup : function()
    {
		if(jQuery("#alphaDiv"))	jQuery("#alphaDiv").hide();
        if( this.length ){
            this.css({'marginLeft': this.outerWidth() / 2 * -1});
            this.css({'marginTop': this.outerHeight() / 2 * -1});
            jQuery('#dimmed').show();
            this.insertAfter(jQuery("#wrap"));
            this.show();

			popupWindow.push(this);
            return this;
        }
    }
});

function showPopup(el, closeflag) 
{
	$j(el).showPopup();
}

function hidePopup(flag)
{
	var pop = popupWindow.pop();
	if(pop) {
		pop.hidePopup(false);
		if(undefined != flag) {
			popupWindow = Array();
		}
		if(pop = popupWindow.pop()) {
			$j(pop).css("z-index",1010);
			pop.showPopup();
		}
	}
}

function hover_close()
{
	$j(".hover_box").addClass("hide");
	office.schedule_detail_out();
	$j(document).unbind("click");
}

var office = {

	init: function()
	{
		if('korean' == Common.getLanguage()) {
			moment.locale('ko');
			moment().utcOffset( moment( moment()._d ).format("Z") );
			
		}else {
			moment.locale('en');
		}

		this.get_schedule_list();
	},

	get_schedule_list: function()
	{
		var URL = Common.getRoot() + "schedule/json/get_schedule_new";
		var param = {
			'accesstype': $j("#_ACCESSTYPE").val(),
			'syncflag': $j("#_SYNCFLAG").val(),
			'hid': $j("#_HID").val(),
			'birthday_show_flag': 'N',
			'start': moment().weekday(0).format('YYYY-MM-DD'),
			'end': moment().weekday(6).format('YYYY-MM-DD')
		};
		getAjaxData(URL, param, this.get_schedule_list_result.bind(this));
	},

	get_schedule_list_result: function(data)
	{
		if(data.length > 1)	sortBy(data, { prop: "start_date" }) ;
		var ul = $j("#schedule_list");
		ul.empty();
		var today = moment().format("YYYYMMDD");
		var tommorrow = moment().add(1,'days').format("YYYYMMDD");
		var list = [];
		for(var i=0; i<data.length; i++)
		{
			var item = data[i];
			if('schedule' == item.category) {
				var _date = moment(item.start_date).format('YYYYMMDD');
				var _start = moment(item.start_date).utcOffset( moment( moment()._d ).format("Z"));

				if(ul.find("#li_"+_date).length < 1) 
				{
					if(ul.children().length > 2)	continue;
					var li = document.createElement('li');
					li.id = "li_"+_date;

					if(_date == today){
						li.innerHTML = "<p class='date'>" + msgAlert.getMessage('LPToday') + "</p><ul class='sch_list plan' id='ul_"+_date+"'></ul>";
						ul.append(li);
					}else if (_date == tommorrow){
						li.innerHTML = "<p class='date'>" +msgAlert.getMessage('LPTomorrow')  + "</p><ul class='sch_list plan' id='ul_"+_date+"'></ul>";
						ul.append(li);
					}
				}

				var u = $j("#ul_"+_date);
				var li = document.createElement('li');
				
				if(item.shared_type == '1' || item.shared_type == '2'){
					$j(li).addClass('bar c'+item.color_code+' share')
				}else{
					$j(li).addClass('bar c'+item.color_code)
				}

				$j(li).attr("onclick", "office.schedule_detail("+item.basic_info_no+", "+item.no+", event)").css("cursor", "pointer");
				//var start = ('Y' == item.allday)? msgAlert.getMessage('SCHEDULE_LABEL_ALLDAY'):moment(item.start_date).format("A h:mm");
				var start = ('Y' == item.allday)? '' :moment(item.start_date).format("Ah:mm");

				var _a = document.createElement("a");

				if(start == ''){
					_a.innerHTML = start + item.subject;
				}else{
					_a.innerHTML = start + "&nbsp;" + item.subject;
				}

				$j(li).append(_a);

				if('Y' == item.allday) {
					if(u.find("li").length > 0) {
						u.find("li:first").before(li);
					}else {
						u.append(li);
					}
				}else {
					u.append(li);
				}
			}
		}

		if(ul.children().length < 1) {
			var li = document.createElement('li');
			li.innerHTML = "<p class='date'>" + msgAlert.getMessage('OFFICE_TXT_SCHEDULE_NODATA'); + "</p>";
			ul.append(li);
		}

	},

	schedule_detail_out: function()
	{
		$j("#layer_schedule_detail").removeAttr("no").empty().addClass("hide");
	},

	schedule_detail: function(basic_info_no, no, event)
	{
		event.stopPropagation();

		var layer = $j("#layer_schedule_detail");
		if( !layer.is(":visible") ) {
			layer.attr("no", no);
		}else {
			if( layer.attr("no") == no) {
				layer.addClass("hide");
				return;
			}else {
				layer.attr("no", no);
			}
		}

		$j(".hover_box").addClass("hide");
		layer.empty();
		layer.css({'position':'absolute', 'top': event.clientY+"px", 'left': '120px','z-index':1010});
		$j(document).bind("click", function() {
			hover_close();
		});

		var url = Common.getRoot() + 'schedule/json/get_Schedule_List_JustOne';
		param = {'to' : 'detailSchedule' ,
			'AccessType' : $j("#_ACCESSTYPE").val(),
			'SyncFlag' : $j("#_SYNCFLAG").val(),
			'HID' : $j("#_HID").val(),
			'BasicInfoNo' :basic_info_no,
			'No' : no,
			'SharedType' : 0,
			'repeat_no': '',
			'select_date':''};
		getAjaxData(url, param, this.schedule_detail_result.bind(this));
	},

	schedule_detail_result: function(rstData) 
	{
		var returnArr = $j.parseJSON(rstData.result);
		if(returnArr) {
			var layer = $j("#layer_schedule_detail");
			layer.empty();
			layer.append("<a href='javascript:office.schedule_detail_out();' class='icon btn_closelayer' title='레이어 닫기'><span class='blind'>레이어 닫기</span></a>");

			var ul = document.createElement("ul");
			ul.className = "sch_form schedule_detail";
			layer.append(ul);

			var l = document.createElement("li");
			$j(l).append("<span>"+msgAlert.getMessage('SCHEDULE_TXT_CALENDAR')+"</span>");
			$j(l).append("<div><button type='button' class='label'><span class='c"+returnArr.color_code+"'></span></button> <span>"+returnArr.project_name+"</span></div>");
			$j(ul).append(l);

			l = document.createElement("li");
			$j(l).append("<span>"+msgAlert.getMessage('SCHEDULE_TXT_SUBJECT')+"</span>");
			$j(l).append("<div>"+returnArr.subject+"</div>");
			$j(ul).append(l);

			var start = ('Y' == returnArr.allday)? moment(returnArr.start_date).format("YYYY. MM. DD") : moment(returnArr.start_date).format("YYYY. MM. DD A h:mm");
			var end = ('Y' == returnArr.allday)? moment(returnArr.end_date).format("YYYY. MM. DD") : moment(returnArr.end_date).format("YYYY. MM. DD A h:mm");
			l = document.createElement("li");
			$j(l).append("<span>"+msgAlert.getMessage('SCHEDULE_TXT_DATETIME')+"</span>");
			$j(l).append("<div>"+ start +" ~ "+ end +"</div>");
			$j(ul).append(l);

			l = document.createElement("li");
			$j(l).append("<span>"+msgAlert.getMessage('SCHEDULE_TXT_CONTENT')+"</span>");
			$j(l).append("<div>"+ returnArr.content +"</div>");
			$j(ul).append(l);

			$j(layer).removeClass("hide");
		}
	},

	schedule_add: function()
	{
		var layer = $j("#layer_office_schedule");
		layer.find("select").val(0);
		layer.find(".cal_date").val(moment().format("YYYY-MM-DD"));
		layer.find("#__subject").val("");
		layer.find("#__content").val("");
		layer.find("#__allday").prop("checked", false);
		layer.find("#__end_time").find("option").eq(1).prop("selected", true);
		layer.find("select").removeAttr("disabled");

		showPopup(layer);
	},

	schedule_date_update: function()
	{
		var layer = $j("#layer_office_schedule");
		layer.find("#__end_date").val( layer.find("#__start_date").val() );
	},

	schedule_time_update: function()
	{
		var layer = $j("#layer_office_schedule");
		var stime = layer.find("#__start_time").find("option:selected").index();
		var length = layer.find("#__start_time").find("option").length;
		if(stime+3 < length-1) {
			layer.find("#__end_time").find("option").eq(stime+3).prop("selected", true);
		}else {
			layer.find("#__end_time").find("option").eq(length-1).prop("selected", true);
		}
	},

	schedule_allday: function()
	{
		var layer = $j("#layer_office_schedule");
		var flag = (layer.find("#__allday").prop("checked"))? true:false;

		layer.find("#__start_time").attr("disabled", flag);
		layer.find("#__end_time").attr("disabled", flag);
	},

	schedule_save: function()
	{
		var layerbox = $j("#layer_office_schedule");
		var iSubject = layerbox.find("#__subject").val().trim();
		if(iSubject.length < 1) {
			window.alert(msgAlert.getMessage('OFFICE_TXT_SCHEDULE_NOSUBJECT'));
			return;
		}
		var iContent = layerbox.find("#__content").val().trim();

		var iBasicInfoNo = $j("#__cal_list :selected").val();
		var iAllDay = $j("#__allday").prop("checked")? "Y":"N";
		var iStartDate = $j("#__start_date").val() +" "+$j("#__start_time :selected").val();
		var iEndDate = $j("#__end_date").val();
		iEndDate += ('Y' == iAllDay)? ' 23:59:59':' '+$j("#__end_time :selected").val();
		var iSharedType = $j("#__cal_list :selected").attr("is_shared");


		if('' == iSubject)	iSubject = msgAlert.getMessage('SCHEDULE_TXT_NO_SUBJECT');
		if('' == iContent)	iContent = msgAlert.getMessage('SCHEDULE_TXT_NO_CONTENT');
		if(!iBasicInfoNo)	{
			window.alert(msgAlert.getMessage('LangMemoWrongAccess'));
			return false;
		}

		if( moment(iStartDate).unix() >= moment(iEndDate).unix() ) {
			window.alert(msgAlert.getMessage('OFFICE_TXT_SCHEDULE_ERRDATE'));
			return false;
		}

		URL = Common.getRoot() + 'schedule/json/insert_Schedule';
		param = {'to' : 'insert_schedule', 'AccessType' : $j("#_ACCESSTYPE").val(), 'SyncFlag' : $j("#_SYNCFLAG").val(), 'HID' :  $j("#_HID").val(), 'BasicInfoNo' : iBasicInfoNo, 'AllDay' : iAllDay, 'StartDate' : iStartDate, 'EndDate' : iEndDate, 'Subject' : iSubject, 'Content' : iContent, 'SharedType' : iSharedType};
		getAjaxData(URL, param, this.schedule_save_result.bind(this));
	},

	schedule_save_result: function(rstData)
	{
		this.get_schedule_list();
		hidePopup();
	},

	fav_getlist: function(rstFunc)
	{
		param = {"pMenu" : "get_link"};
		if(rstFunc) {
			getAjaxData(Common.getRoot() + 'common/ajax_favorite', param, rstFunc.bind(this));
		}else {
			getAjaxData(Common.getRoot() + 'common/ajax_favorite', param, this.fav_getlist_result.bind(this));
		}
	},

	fav_getlist_result: function(data)
	{
		if('SUCCESS' == data.resultCode) {
			var ul = $j("#fav_list").css('max-height', '230px');
			ul.empty();

			if(data.result) {
				var list = data.result;
				for(var i=0; i<list.length; i++)
				{
					var item = list[i];
					var li = document.createElement('li');
					$j(li).attr({"order":item.ordering});
					li.innerHTML = "<a href='"+item.url+"' target='_blank'>"+item.name+"</a>";
					ul.append(li);
				}
				if(list.length > 0)			$j("#btn_fav_setting").show();
			}else {
				$j("#btn_fav_setting").hide();
				var li = document.createElement('li');
				li.innerHTML = "<a href='#'>" + msgAlert.getMessage('OFFICE_TXT_BOOKMARK_NODATA') + "</a>";
				ul.append(li);
			}
		}
	},

	fav_show: function(e)
	{
		e.stopPropagation()
		if( $j("#_favLayer").is(":visible") ) {
			$j("#_favLayer").addClass("hide");
		}else {
			$j(document).bind("click", function() {
				hover_close();
			});

			$j(".hover_box").addClass("hide");
			$j("#_favLayer").removeClass("hide");
		}
	},

	layer_fav_add: function()
	{
		$j("#_favLayer").addClass("hide");
		var layer = $j("#layer_fav_add");
		layer.find("input[type=text]").val("");
		showPopup(layer);
	},

	layer_fav_save: function()
	{
		var subject = $j("#fav_subject").val().trim();
		var url = $j("#fav_url").val().trim();

		if(subject.length < 1) {
            alert(lang.getMessage("ADD_LINK_WARNING_01"));
            $j("#fav_subject").focus();
            return;
        }
        if (url.length < 1) {
            alert(lang.getMessage("ADD_LINK_WARNING_02"));
			$j("#fav_url").focus();
			return;
		}
			
        if (url.substring(0,7) != "http://" && url.substring(0,8) != "https://")	url = "http://" + url;
        var param = null;
		
        param = {"pMenu" : "insert_link", "pName" : subject, "pUrl" : url, "pTop" : '', "pCategory" : 0, "pKind" : 'P'};

		getAjaxData(Common.getRoot() + 'common/ajax_favorite', param, this.layer_fav_save_result.bind(this));
	},
	
	layer_fav_save_result: function(data)
	{
		if("SUCCESS" == data.resultCode) {
			window.alert(data.message);
			this.fav_getlist();
		}
		hidePopup();
	},

	fav_confirm: function()
	{
		hidePopup();
		this.fav_getlist();
	},

	layer_fav_set: function()
	{
		$j("#_favLayer").addClass("hide");
		showPopup($j("#layer_fav_set"));

		this.fav_getlist(this.layer_fav_set_result);
	},

	layer_fav_set_result: function(data) 
	{
		var layer = $j("#layer_fav_set");
		var u = layer.find("ul");
		u.empty();

		if("SUCCESS" == data.resultCode) {
			
			var list = data.result;
			for(var i=0; i<list.length; i++) 
			{
				var item = list[i];
				var l = document.createElement('li');
				$j(l).attr({"idx": i});
				u.append(l);

				var span = document.createElement('span');
				span.innerHTML = item.name;
				$j(l).append(span);

				span = document.createElement('span');
				span.innerHTML = item.url;
				$j(l).append(span);

				div = document.createElement('div');
				div.className = 'right_area';
				$j(div).append("<button class='btn_small modify' onclick=\"office.layer_fav_set_mod("+i+","+item.no+");\">"+msgAlert.getMessage('MODIFY')+"</button> <button class='btn_small delete' onclick=\"office.layer_fav_delete("+item.no+");\">"+msgAlert.getMessage('DELETE')+"</button>");
				$j(l).append(div);
			}
		}
	},

	layer_fav_set_mod: function(idx, no)
	{
		var layer = $j("#layer_fav_set");
		var l = layer.find("li[idx="+idx+"]");
		
		var name = l.find("span").eq(0).html();
		var url = l.find("span").eq(1).html();

		var li = document.createElement("li");
		li.className = "modify_text";
		li.id = "fav_modify";

		var span = document.createElement("span");
		span.innerHTML = "<label><input type='text' style='width:60px' value='"+name+"'></label>";
		$j(li).append(span);

		span = document.createElement("span");
		span.innerHTML = "<label><input type='text' style='width:161px' value='"+url+"'></label>";
		$j(li).append(span);

		$j(li).append("<div class=\"right_area\"><button class=\"btn_small modify\" onclick='office.layer_fav_set_update("+no+");'>"+msgAlert.getMessage('SAVE')+"</button> <button class=\"btn_small delete\" onclick='office.layer_fav_set_mod_cancel();'>"+msgAlert.getMessage('CANCEL')+"</button></div>");
		l.after(li);
		l.hide();
	},
	
	layer_fav_set_mod_cancel: function()
	{
		var layer = $j("#layer_fav_set");
		layer.find("#fav_modify").remove();
		layer.find("li").show();
	},

	layer_fav_set_update: function(no)
	{
		var subject = $j("#fav_modify").find("input").eq(0).val();
		var url = $j("#fav_modify").find("input").eq(1).val();

        param = {"pMenu" : "update_link", "pName" : subject, "pLink" : url, "pCategory" : "", "pNo":no, "pKind" : 'P'};
		getAjaxData(Common.getRoot() + 'common/ajax_favorite', param, this.layer_fav_set_update_result.bind(this));
	},

	layer_fav_set_update_result: function(data)
	{
		var layer = $j("#layer_fav_set");
		layer.find("ul").empty();

		this.fav_getlist(this.layer_fav_set_result);
	},

	layer_fav_delete: function(no)
	{
		$j("#layer_fav_set").css("z-index", 999);
		office.sel_fav_no = no;
		showPopup( $j("#layer_fav_del_alert") );	
	},

	layer_fav_delete_ok: function()
	{
		if(office.sel_fav_no > 0 ) {
			param = {"pMenu" : "delete_link", "pValue" : office.sel_fav_no, "pKind" : 'P'};
			getAjaxData(Common.getRoot() + 'common/ajax_favorite', param, this.layer_fav_delete_result.bind(this));
		}
	},
	
	layer_fav_delete_cancel: function()
	{
		office.sel_fav_no = "";
		hidePopup();
	},

	layer_fav_delete_result: function(data)
	{
		if('SUCCESS' == data.resultCode) {
			var layer = $j("#layer_fav_set");
			layer.find("ul").empty();

			this.fav_getlist(this.layer_fav_set_result);
			this.layer_fav_delete_cancel();
		}
	},

	layer_fav_order_set: function()
	{
		//hidePopup();
		$j("#layer_fav_set").hide();
		showPopup( $j("#layer_fav_order_set") );

		this.fav_getlist(this.layer_fav_order_set_result);
	},

	layer_fav_order_set_result: function(data)
	{
		var layer = $j("#layer_fav_order_set");
		var u = layer.find("ul");
		u.empty();

		if('SUCCESS' == data.resultCode)
		{
			var list = data.result;
			if(list.length > 0) {
				for(var i=0; i<list.length; i++)
				{
					var item = list[i];
					var l = document.createElement('li');
					$j(l).attr({"idx": i, "fno":item.no});
					u.append(l);

					var span = document.createElement('span');
					span.innerHTML = item.name;
					$j(l).append(span);

					span = document.createElement('span');
					span.innerHTML = item.url;
					$j(l).append(span);

					div = document.createElement('div');
					div.className = 'btn';
					$j(div).append("<button type='button' class='icon down' onclick=\"office.fav_order_set('d',"+i+");\"><span class='blind'>아래로 변경</span></button>");
					$j(div).append("<button type='button' class='icon up' onclick=\"office.fav_order_set('u',"+i+");\"><span class='blind'>위로 변경</span></button>");
					$j(l).append(div);
				}
			}
		}
	},

	fav_order_set: function(type, no)
	{
		var layer = $j("#layer_fav_order_set");
		var idx = layer.find("li[idx="+no+"]").index();
		var len = layer.find("li").length;
		if('u' == type)	{
			if(idx > 0) {
				layer.find("li[idx="+no+"]").insertBefore( layer.find("li").eq(idx-1) );
			}
		}else if('d' == type) {
			if(idx < len) {
				layer.find("li[idx="+no+"]").insertAfter( layer.find("li").eq(idx+1) );
			}
		}
	},

	fav_order_save: function()
	{
		var layer = $j("#layer_fav_order_set");
		var arr = [];
		layer.find("li").each(function() { arr.push($j(this).attr('fno')); });
		
		param = {"pMenu" : "update_oder", "pNo[]" : arr, "pCategory": 0, "pKind" : 'P'};
		getAjaxData(Common.getRoot() + 'common/ajax_favorite', param, this.fav_order_save_result.bind(this));
	},

	fav_order_save_result: function(data)
	{
		if('SUCCESS' == data.resultCode) {
			hidePopup();
			this.fav_getlist(this.layer_fav_set_result);
		}
	},

	getMailCnt: function()
	{
		var url = Common.getRoot() + "common/menu/recent_count";
		var param = {};
		
		getAjaxData(url, param, this.getMailCntResult.bind(this));
	},

	getMailCntResult: function(rstData) 
	{
		if(rstData.mail > 0)	{
			$j("#mail_stats").show();
			$j("#mail_stats").html(rstData.mail);
		}else{
			$j("#mail_stats").hide();
		}
		if(rstData.shared === 'N') {
            $j("#shared_stats").show();
            $j("#shared_stats").html(rstData.shared);
		}else{
            $j("#shared_stats").hide();
		}
	}
};

var sortBy = (function () {

  //cached privated objects
  var _toString = Object.prototype.toString,
      //the default parser function
      _parser = function (x) { return x; },
      //gets the item to be sorted
      _getItem = function (x) {
        return this.parser((_toString.call(x) === "[object Object]" && x[this.prop]) || x);
      };

  // Creates a method for sorting the Array
  // @array: the Array of elements
  // @o.prop: property name (if it is an Array of objects)
  // @o.desc: determines whether the sort is descending
  // @o.parser: function to parse the items to expected type
  return function (array, o) {
    if (!(array instanceof Array) || !array.length)
      return [];
    if (_toString.call(o) !== "[object Object]")
      o = {};
    if (typeof o.parser !== "function")
      o.parser = _parser;
    //if @o.desc is false: set 1, else -1
    o.desc = [1, -1][+!!o.desc];
    return array.sort(function (a, b) {
      a = _getItem.call(o, a);
      b = _getItem.call(o, b);
      return ((a > b) - (b > a)) * o.desc;
    });
  };

}());

//////////////////////////////////////////////////////////////////////////////
function compStringNameReverse(a, b) {
  if (a.name > b.name) return -1;
  if (b.name > a.name) return 1;
  return 0;
}
function compStringName(a, b) {
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
}

function check_img(type){
	var vailed_arr = ["image/jpeg" ,"image/png" , "image/gif" ];
	if($.inArray(type, vailed_arr) !== -1 ){
		return true;
	}else{
		return false;
	}
	
}

function no_search_area(_this){
	alert('검색기능을 제공하는 페이지가 아닙니다.');
}

function imgFileDown(){
	var tmp_arr = $j('.lb-image')[0].src.split('/');
	var param_arr = [];

	$j.each( tmp_arr , function (idx, value){
		if($j.isNumeric(value)){
			param_arr.push(value)
		}
	});

	if(param_arr.length == 2 ){
		var time_line_no = param_arr[0];
		var file_no = param_arr[1];
		var group_no = false;
	}else if(param_arr.length == 3 ){
		var time_line_no = param_arr[0];
		var file_no = param_arr[1];
		var group_no =  param_arr[2];
	}else{
		return false
	}

	if($j.isNumeric(time_line_no) && $j.isNumeric(file_no) ){
		if(group_no != false)
			time_line_no += '/'+group_no;

		window.location = Common.getRoot()+"common/office_main_ajax/file_down/"+file_no+"/"+time_line_no
	}
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);
	var cookiePath = '/';
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";path=" + cookiePath;
}

function autocompliteSetting(id, data , fnc){

	$j("#"+id).autocomplete({
		source: function( request, response ) {
				var matcher = new RegExp( "^" + $j.ui.autocomplete.escapeRegex( request.term ), "i" );
				response( $j.grep( data, function( item ){
				return matcher.test( item.value );
			}));
		},
		minLength: 1,
		select: function(event, ui) {
			$j("#"+id).autocomplete( "disable" );
			fnc(ui.item.value,ui.item.id)
		}
	});

	$j("#"+id).bind('keyup',function(){	
		if($j("#"+id).val() == ''){
			$j("#"+id).autocomplete( "enable" );
		}
	});
}

function ordering_view_fnc (li_this , order ){
	$('._ordering_li').removeClass('active')
	$('._ordering_li span').removeClass('up down')
	order = (order == 'asc') ?  'up' : 'down';
	$(li_this).addClass('active')
	$(li_this).find('span').addClass(order)
}

function valid_email(pValue)
{
	if (pValue == null || pValue == "") return false;
	var supported = 0;
	if (window.RegExp)
	{
		var tempStr = "a";
		var tempReg = new RegExp(tempStr);
		if (tempReg.test(tempStr)) supported = 1;
	}
	if (!supported) return (pValue.indexOf(".") > 2) && (pValue.indexOf("@") > 0);
	var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
	var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
	return (!r1.test(pValue) && r2.test(pValue));
}

function input_check(pValue)
{// 특수 문자 ( ' " \) , 공백 체크
	pValue = String(pValue);
	pValue = pValue.trim();

	var specialChk = true;
	
	if(pValue == ''){
		alert('입력하신 내용이 없습니다.')
		return false;
	}

	for(i=0 ; i<pValue.length ; ++i)
	{
		if(pValue.charAt(i).charCodeAt() == 39 || pValue.charAt(i).charCodeAt() == 34 || pValue.charAt(i).charCodeAt() == 92 ){
			alert('허용되지 않는 문자열이 있습니다.')
			specialChk = false;
			break;
		}
	}
	return specialChk;
}


function toggleMenu(id){
	$('#'+id).toggleClass('hide')
}

function popup_fnc( id , flag, func){

	if( func != undefined){
		func()
	}

	if(flag == 'on' ){
		$j('#'+id).show();
		$j('#dimmed').show();
	}else{
		$j('#'+id).hide();
		$j('#dimmed').hide();
	}
}

function removeThis(flag , _this){
	if(flag == 'invite_mail'){
		$(_this).parent().remove();
	}
}

function underConsruction(){
	alert('준비중입니다.')
}


function getIEVersion ()
{
	var v = navigator.appVersion;
	if (v.indexOf("MSIE") > -1)
	{
		if (v.indexOf("MSIE 6") > -1) return 6;
		else if (v.indexOf("MSIE 7") > -1) return 7;
		else if (v.indexOf("MSIE 8") > -1) return 8;
		else if (v.indexOf("MSIE 9") > -1) return 9;
		else if (v.indexOf("MSIE 10") > -1) return 10;
		else return 5;
	}else if (v.indexOf("Trident/") > -1 &&  v.indexOf("rv:")> -1)
	{
		return 11;
	}

	return false;
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
};

var groupCommon = {

	date_picker_setting : {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true
	},

	getAfterDate  : function(){
	
		var dt = new Date();
		var dt_1 = new Date();
		var dt_6 = new Date();
		var dt_12 = new Date();
		var dt_10d = new Date();

		dt_1.setMonth(dt.getMonth()-1);
		dt_6.setMonth(dt.getMonth()-6);
		dt_12.setMonth(dt.getMonth()-12);
		dt_10d.setDate(dt.getDate() - 10);
		var return_obj = {
			'cd' : dt.yyyymmdd(),
			'10d' : dt_10d.yyyymmdd(),
			'1m' : dt_1.yyyymmdd(),
			'6m' : dt_6.yyyymmdd(),
			'12m' : dt_12.yyyymmdd()
		}

		return return_obj;
	}

}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}