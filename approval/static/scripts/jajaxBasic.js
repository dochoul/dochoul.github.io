var getAjaxData = function(URL, params, func, pSync, interID){
	var bSync = (pSync == false)?pSync : true;
	if(URL == undefined) return false;
	if(params == undefined) params = {};

	jQuery.ajax({
		url : URL,
		data : params,
		type : 'post',
		async :	bSync,
		success : function(data){
			if (typeof data == "object") {
				var data = data;
			} else {
				var data = (new Function('return ' + '(' + data + ')'))();
			}

			if (URL.indexOf("admin/Orgmain/checkMailStatus") == 0)
				if(!ajaxReturnErrorCheck(data)) return;

			if(data.resultCode !== undefined && data.resultCode === RT_LOGOUT){
				Common.showLogout(data);
				return;
			}

			func(data);
		},
		error : function(){
			func("FAIL");
			return;
		}
	});
};

function getAjaxSendData(URL, params, func, isOnly, setting) {
	if (isOnly) {
		if (managedAjax.checkDuplicate(URL)) {
			return;
		}
		managedAjax.addRunAjax(URL);
	}

	var options = {
		url : URL,
		data : params,
		type : 'post',
		async :	true,
		beforeSend	: function (xhr, opts) {
			$j('#dimmed').html('<img src="/static/ui/images/hw-loading.gif" style="position:absolute;top:45%;left:50%;">').show();
		},
		complete	: function () {
			managedAjax.delRunAjax(URL);
			$j('#dimmed').hide().html('');
		},
		success : function(data){
			if (typeof data == "object") {
				var data = data;
			} else {
				var data = (new Function('return ' + '(' + data + ')'))();
			}

			if (URL.indexOf("admin/Orgmain/checkMailStatus") == 0)
				if(!ajaxReturnErrorCheck(data)) return;

			if(data.resultCode !== undefined && data.resultCode === RT_LOGOUT){
				Common.showLogout(data);
				return;
			}
			func(data);
		},
		error : function(){
			func("FAIL");
			return;
		}
	};

	Object.assign(options, setting);
	jQuery.ajax(options);
}

var managedAjax = {
	run_ajax: [],
	checkDuplicate: function (URL) {
		if (this.run_ajax.indexOf(URL) > -1) {
			return true;
		} else {
			return false;
		}
	},
	addRunAjax: function (URL) {
		this.run_ajax.push(URL);
	},
	delRunAjax: function (URL) {
		if (this.run_ajax.length > 0) {
			var index = this.run_ajax.indexOf(URL);
			if (index > -1) {
				this.run_ajax.splice(index, 1);
			}
		}
	}
};

function ajaxReturnErrorCheck(data) {
	if (data.resultCode == 'ERROR') {
		Common._closeBackGround();
		if (data.message) alert(data.message.replace(/\\n/gi, "\n"));

		if (data.result == 'not login') {
			Common.goHome();
		}
		else if (data.result == 'memo list') {
			document.location.href = Common.getRoot() + "memo/memomain/memomain_list";
		}

		return false;
	}

	return true;
}