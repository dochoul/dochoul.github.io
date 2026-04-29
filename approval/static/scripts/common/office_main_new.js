if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
    var eventNames = ["mousedown", "mouseover", "mouseout",
        "mousemove", "mousedrag", "click", "dblclick",
        "keydown", "keypress", "keyup"];

    for (var i = 0; i < eventNames.length; i++) {
        window.addEventListener(eventNames[i], function (e) {
            window.event = e;
        }, true);
    }
}

function officeMainClass(opts) {
    this.opts = {
        available_url: [],
        page: 0,
        base_url: '/',
        insert_cnt: 0, // 더보기 에 적용할 카운트
        newsfeed_limit_over: 'N',
        total_websize_over_flag: 'N',
        total_size: 0,
        timeline_no: '',
        main_img_url: false,
        total_web_size: 0,
        init_flag: 'Y'
    }
    this.set_opts(opts);
}


var getAjaxDataWithApiV4 = function (URL, params, func) {
    if (URL == undefined) return false;
    if (params == undefined) params = {};

    jQuery.ajax({
        url: URL,
        data: params,
        type: 'post',
        xhrFields: {
            'withCredentials': true
        },
        async: true,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            func(data);
        },
        error: function () {
            func("FAIL");
            return;
        }
    });
};


(function ($) {

    $.extend(officeMainClass.prototype, {

        set_opts: function (opts) {
            this.opts = jQuery.extend(this.opts, opts || {});
            $_this = this;
        },

		init_fnc : function(){
			//console.log($_this.opts)
			//popup_fnc('group_create_popup', 'on')

			//link-preview
			$('body').append("<div class='link-preview'></div>");
			$('.link-preview').append("<div class='result-image'></div><div class='result-script'></div>");
			$('.result-script').append("<div class='title'></div><div class='description'></div>");
			//link-preview end

			if(parseInt($_this.opts.total_web_size) === 0 ){
				$('.group_lft_btn').remove()
				$_this.opts.newsfeed_limit_over = 'Y';
				$_this.opts.total_websize_over_flag = 'Y';
			}else if($_this.opts.mode == 'view'){
				$('#newsfeed_write_area').remove()
				$('.bt_center button').remove()
				$("#timeLineTemplate_one" ).tmpl($_this.opts.time_line).appendTo( "#newsfeed_area_div" );
			}else{

				if($_this.opts.mode == 'modify'){
					$('.btn_area').show()

					if($_this.opts.available_url.length !== 0  ){
						var image_url = $_this.opts.available_url.image;
						var https_regex = new RegExp('^https:\/\/[^.]+\.([^.]+(\.[^.]+)*)$');
						if(image_url == '' || !https_regex.test(image_url)){
							$("#timeLineUrlNoPhotoTemplate" ).tmpl($_this.opts.available_url).appendTo( "#_newsLink_area" );
							$_this.opts.available_url.image = '';
						}else{
							$("#timeLineUrlPhotoTemplate" ).tmpl($_this.opts.available_url).appendTo( "#_newsLink_area" );
						}
					}else{
						$_this.check_url('init');
					}
					$_this.recalculate_attach_files()
				}

				$_this.listing_timeline();
				$_this.listing_pinlist();
				$_this.upload_timeline_files()
				$_this.upload_timeline_image_files()
				$_this.upload_main_img_init()
				//$_this.init_web_alarm();
				$_this.opts.init_flag = 'N';

				if($_this.opts.more_flag == 'N' ){
					$('#more_btn').hide()
				}

				$("#sortable_image").sortable({
					update: function(event, ui) {
						$('._tmpImgList_a').removeClass('selected')
						$('._tmpImgList_a').eq(0).addClass('selected')

						var tmp_arr =[];
						$('._tmpImgListClass input').each(function(index){
							tmp_arr.push((index+1)+'_'+$(this).val())
						});

						getAjaxData($_this.opts.base_url+"common/office_main_ajax/timeline_img_sort", {upload_tmpkey : $_this.opts.upload_tmpkey , order_arr : tmp_arr  }, function(data){
							if(data.resultCode != 'SUCCESS'){
								alert(data.message)
							}
						});
					}
				}).disableSelection();
				if( window.FormData != null  && ( getIEVersion() >= 10  || getIEVersion() == false )){

					$('#newsfeed_write_area').on("dragover", function(){
						$('#newsfeed_write_area').css('border' , '3px dashed #558ed5')
						return false;
					}).on("dragleave", function(){
						$('#newsfeed_write_area').css('border' , 'none')
						$('#newsfeed_write_area').css('border-bottom' , '1px solid #dedede')
						return false;
					}).on("drop", function(e){
						$('#newsfeed_write_area').css('border' , 'none')
						$('#newsfeed_write_area').css('border-bottom' , '1px solid #dedede')
						return false;
					})
				}
			}
			// 2018-11-29 강동균 메인페이지에서 @으로 링크할 때 그룹멤버만 리스트에 나오도록
			$('#insert_newsfeed_textarea').mentionsInput({source: $_this.opts.member_list });
			$('.g_mention').each(function(index,item){
				var group_info_no = item.getAttribute('group_info_no');
                if (group_info_no == "0") {
                    $(this).mentionsInput({source: $_this.opts.member_list});
                } else {
                    $(this).mentionsInput({source: $_this.opts.group_member_list[group_info_no]});
                }
            })
            // 2018-11-29 강동균 메인페이지에서 @으로 링크할 때 그룹멤버만 리스트에 나오도록 끝

            //link-preview
            $(".link-wrap a").on('mouseover', function () {
                var $el = $(this).parent();
                var $link = $(this);
                getLinkData($el[0], $link[0]);

                $(this).on('scroll touchmove mousewheel', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                })
                isOpen = true;

            })
            $(".link-wrap a").on('mouseleave', function () {
                $('.link-preview').removeClass('show');
                $('.result-script').removeClass('fullSize');
                isOpen = false;
                $(this).off('scroll touchmove mousewheel')
            })


            //link-preview end
        },

		listing_timeline : function (){
			if($_this.opts.time_line != false){

				for(var i=0 ;$_this.opts.time_line.length > i ;i++ ){
					$_this.opts.time_line[i].contents = $_this.strip_tags($_this.opts.time_line[i].contents , $_this.opts.time_line[i].type);
				}
				$("#timeLineTemplate" ).tmpl($_this.opts.time_line).appendTo( "#newsfeed_area_div" );
			}
		},

		listing_pinlist : function(){
			if($_this.opts.pin_data.length > 0){
				$("#timeLinePinTemplate" ).tmpl($_this.opts.pin_data).appendTo( "#notices_area_div" );
			}
		},

		mentions_expend_fnc : function (){
			$('.highlighter').css('height', $('#insert_newsfeed_textarea').css('height')) // 해당기능을 좀더 다듬어보기
			$('.view_comment .highlighter').css('height', $('.view_comment textarea').css('height'))
		},

		upload_timeline_files : function (){

			if($_this.opts.init_flag != 'Y'){
				if($_this.opts.total_websize_over_flag == 'Y' || $_this.opts.newsfeed_limit_over == 'Y') {
                    alert('오피스 용량(웹용량)이 부족하여 글을 작성할 수 없습니다. ')
                    return;
                }
			}

			$('#myForm').fileupload({
                dataType: 'json',
                url: $_this.opts.news_feed_api + '/v4/public-cards/upload',
                xhrFields: {
                    'withCredentials': true
                },
                dropZone: $('#newsfeed_write_area'),
                beforeSend: function (xhr, data) {
                    xhr.setRequestHeader('Authorization', "Hiworks " + getCookie("PHPSESSID"));
                },
                add: function (e, data) {
                    var uploadErrors = [];
                    var acceptFileTypes = /^(gif|jpeg|jpg|png|ppt|pptx|doc|docx|hwp|txt|pdf|xlsx|zip|rar|mp3)$/i;
                    var tmp_name = data.originalFiles[0]['name'].split(".");


                    if (!acceptFileTypes.test(tmp_name[tmp_name.length - 1])) {
                        uploadErrors.push('허용된 파일타입이 아닙니다.');
                    }


					if(data.originalFiles[0]['size'] > 1024*1024* 10 ) {
						uploadErrors.push('단일 파일사이즈 허용초과입니다.');
					}
					if(uploadErrors.length > 0) {
						alert(uploadErrors.join("\n"));
					} else {
						data.submit();
					}
				},

				done: function (e, data) {
                    if (data.jqXHR.status == 201) {
                        $('.feed-file').show()
                        $_this.recalculate_attach_files()
                    } else {
                        alert(data.result.message);
                    }
                }
			});
		},

		upload_timeline_image_files : function (){

			if($_this.opts.init_flag != 'Y'){
				if($_this.opts.total_websize_over_flag == 'Y' || $_this.opts.newsfeed_limit_over == 'Y') {
                    alert('오피스 용량(웹용량)이 부족하여 글을 작성할 수 없습니다. ')
                    return;
                }
			}

			$('#myFormImage').fileupload({
                dataType: 'json',
                url: $_this.opts.news_feed_api + '/v4/public-cards/upload',
                xhrFields: {
                    'withCredentials': true
                },
                beforeSend: function (xhr, data) {
                    xhr.setRequestHeader('Authorization', "Hiworks " + getCookie("PHPSESSID"));
                },
                add: function (e, data) {

                    var uploadErrors = [];
                    var acceptFileTypes = /^(gif|jpeg|jpg|png)$/i;
                    var tmp_name = data.originalFiles[0]['name'].split(".");

                    if (!acceptFileTypes.test(tmp_name[tmp_name.length - 1])) {
                        uploadErrors.push('허용된 파일타입이 아닙니다.');
                    }


					if(data.originalFiles[0]['size'] > 1024*1024* 10 ) {
						uploadErrors.push('단일 파일사이즈 허용초과입니다.');
					}
					if(uploadErrors.length > 0) {
						alert(uploadErrors.join("\n"));
					} else {
						data.submit();
					}
				},

				done: function (e, data) {
                    if (data.jqXHR.status == 201) {
                        $('#sortable_image_div').show()
                        $_this.recalculate_attach_files()
                    } else {
                        alert(data.result.message);
                    }
                }
			});
		},

		upload_main_img_init : function (){
			$('#myFormGroup').fileupload({
				dataType: 'json',
				url : $_this.opts.base_url+'common/office_main_ajax/upload_main_img',
				add: function(e, data) {
					var uploadErrors = [];
					var acceptFileTypes = /^image\/(gif|jpeg|jpg|png)$/i;
					var tmp_name = data.originalFiles[0]['name'].split(".");

					if((data.originalFiles[0]['type'] != '' && !acceptFileTypes.test(data.originalFiles[0]['type'])) || !acceptFileTypes.test("image/"+tmp_name[1].toLowerCase()) ) {
						uploadErrors.push('허용된 파일타입이 아닙니다.');
					}

					if(data.originalFiles[0]['size'] > 1024*1024*2) {
						uploadErrors.push('파일사이즈 허용초과입니다.');
					}
					if(uploadErrors.length > 0) {
						alert(uploadErrors.join("\n"));
					} else {
						data.submit();
					}
				},
				done: function (e, data) {
					var img_data = data.result;
					$_this.opts.main_img_url = img_data.result.tmp_id;
					$('.group-images .large-img img').attr('src' ,$_this.opts.base_url+'common/office_main_ajax/show_tmp_img/'+$_this.opts.main_img_url)
				}
			});
		},

		upload_group_img_click : function (){
			$('#myFormGroup input[type="file"]').click()
		},

		upload_file_click : function (){
			$('#myForm input[type="file"]').click()
		},

		upload_main_img_click : function (){
			$('#myFormImage input[type="file"]').click()
		},

		recalculate_attach_files : function (){
			getAjaxData($_this.opts.base_url+"common/office_main_ajax/recalculate_attach_files", {upload_tmpkey : $_this.opts.upload_tmpkey  }, function(data){

				if(data.resultCode == 'SUCCESS'){

					$_this.opts.files = data.result.files
					$_this.opts.total_size = data.result.total_size
					$_this.opts.total_size_view = data.result.total_size_view

					if($_this.opts.total_size > (1024*1024 * 20) ){
						$_this.opts.newsfeed_limit_over = 'Y';
						alert('단일 피드 제한용량을 초과했습니다.')
					}else{
						$_this.opts.newsfeed_limit_over = 'N';
					}

					$('#total_size').text($_this.opts.total_size_view)
					$('._fileListClass').remove();
					$('._tmpImgListClass').remove();

					$("#fileListTemplate" ).tmpl($_this.opts.files).appendTo( "#timeline_file_list" );
					$("#fileListImageTemplate" ).tmpl($_this.opts.files).appendTo( "#sortable_image" );
					$("#sortable_image").sortable('refresh');

					$('._tmpImgList_a').removeClass('selected')
					$('._tmpImgList_a').eq(0).addClass('selected')

					$.each($_this.opts.files , function (idx, value){
						if(value.flag =='I'){
							$('#sortable_image_div').show()
						}else if(value.flag =='F'){
							$('.feed-file').show()
						}
					});

				}else{
					$('.feed-file').hide()
					$('.feed-photo').hide()
				}
			})
		},

		remove_newsfeed : function (time_line_no){
			if(confirm('삭제하시겠습니까?')){
				var is_attach = 'N';
				$.each( $_this.opts.time_line , function (idx, value){
					if(value.no == time_line_no){
						is_attach = value.is_attach;
					}
				});
				getAjaxData($_this.opts.base_url+"common/office_main_ajax/remove_newsfeed", { time_line_no : time_line_no , is_attach : is_attach }, function(data) {
                    //$_this.alert_fnc(data, 'Y') ;
                    if (data.resultCode == 'SUCCESS') {
                        if (data.result.type == 'group') {
                            alert(data.result.message);
                            location.href = data.result.url;
                        } else {
                            location.reload();
                        }
                    } else {
                    }
                });
			}
		},

		check_mentions_fnc : function (time_line_no){
			var mentions_textarea ;

			if(time_line_no == undefined ){
				mentions_textarea = $('#insert_newsfeed_textarea');
			}else{
				mentions_textarea = $('#comment_textarea_'+time_line_no);
			}

			var mentions  = mentions_textarea.mentionsInput('getMentions');
			var str =   mentions_textarea.val()
			var tmp = []
			if(mentions.length > 0 ){
				$.each( mentions , function (idx, value){

					if( $.inArray(value.uid, tmp)  == -1  ){	// 맨 앞에 하나만 바꿈
						tmp.push(value.uid)
						str = str.replace( value.name , '[['+value.name+']]');
						//mentions_textarea.val(str)
					}
				});
			}

			return str;

		},

		insert_reply : function (time_line_no , flag , _this , group_info_no ){
			var txt_this = _this;
			var content = _this.value.trim();
			var _hidden = 'N';
			var _fk_content_no = '';
			var _fk_board_no = '';

			var group_info_no =  typeof group_info_no !== 'undefined' ? group_info_no : '';
			var owner_flag = ( $j('.unit_'+time_line_no+' [name="owner_flag"]').val() !== 'undefined' ) ? $j('.unit_'+time_line_no+' [name="owner_flag"]').val() : '' ;

			$_this.mentions_expend_fnc()

			if (event.keyCode == '13' && content != '' ) {

				if(flag == 'news'){

					if($('#mention_open_flag').val() == 'open'){
						return;
					}
					var mentions  =  $('#comment_textarea_'+time_line_no).mentionsInput('getMentions');
					content = $_this.check_mentions_fnc(time_line_no)
					//content = _this.value.trim();
				}else{
					mentions = [];
				}

				$.each( $_this.opts.time_line , function (idx, value){
					if(value.no == time_line_no){
						_hidden = value.hidden;
						if(value.fk_content_no !== undefined){
							_fk_content_no = value.fk_content_no;
							_fk_board_no =  value.fk_board_info_no;
						}
					}
				});

				var param = { 'time_line_no' : time_line_no ,  'content' : content  , 'hidden' : _hidden ,  'fk_content_no' : _fk_content_no, 'fk_board_no': _fk_board_no , 'flag' : flag , 'mentions' : mentions , owner_flag : owner_flag } ;

				if(group_info_no != '')
					param.group_info_no = group_info_no;

				getAjaxData($_this.opts.base_url+"common/office_main_ajax/insert_reply", param , function(data){
					if(data.resultCode == 'SUCCESS' ){

						$.each( $_this.opts.time_line , function (idx, value){
							if(value.no == data.result.time_line_no){
								value.reply_data.push(data.result)
								$('#reply_div_'+data.result.time_line_no+' .comment_wrap').remove()
								if(flag == 'news'){
									$('#comment_textarea_'+data.result.time_line_no).mentionsInput('clear');
								}
								txt_this.value = '';
								$("#timeLineReplyTmpl" ).tmpl(value.reply_data).appendTo('#reply_div_'+data.result.time_line_no);

								if(data.message != 'SUCCESS'){
									alert(data.message)
								}
							}
						});
						//link-preview
						$(".link-wrap a").on('mouseover',function() {
							var $el = $(this).parent();
							var $link = $(this);
							getLinkData($el[0],$link[0]);

							$(this).on('scroll touchmove mousewheel', function(event) {
								event.preventDefault();
								event.stopPropagation();
								return false;
							})
							isOpen = true;

						})
						$(".link-wrap a").on('mouseleave', function() {
							$('.link-preview').removeClass('show');
							$('.result-script').removeClass('fullSize');
							isOpen = false;
							$(this).off('scroll touchmove mousewheel')
						})
						//link-preview
					}else{
						alert(data.message)
						txt_this.value = '';
					}
				});
			}
		},

		more_reply : function( time_line_no , flag, _this){
			var reply_cnt = parseInt($(_this).parent().find('.point_color').text());
			var limit =  'ALL' ;

			if(reply_cnt > 20){
				$(_this).parent().find('.point_color').text(reply_cnt- 20)
				limit = 23;
			}else{
				$(_this).parent().remove()
			}

			getAjaxData($_this.opts.base_url+"common/office_main_ajax/more_reply", { 'time_line_no' : time_line_no ,  'limit' : limit , 'flag' : flag }, function(data){

				if(data.resultCode == 'SUCCESS' ){

					$.each( $_this.opts.time_line , function (idx, value){
						if(value.no == time_line_no){
							value.reply_data = data.result
							$('#reply_div_'+time_line_no+' .comment_wrap').remove()
							$("#timeLineReplyTmpl" ).tmpl(value.reply_data).appendTo('#reply_div_'+time_line_no);
						}
					});

					//link-preview
					$(".link-wrap a").on('mouseover',function() {
						var $el = $(this).parent();
						var $link = $(this);
						getLinkData($el[0],$link[0]);

						$(this).on('scroll touchmove mousewheel', function(event) {
							event.preventDefault();
							event.stopPropagation();
							return false;
						})
						isOpen = true;

					})
					$(".link-wrap a").on('mouseleave', function() {
						$('.link-preview').removeClass('show');
						$('.result-script').removeClass('fullSize');
						isOpen = false;
						$(this).off('scroll touchmove mousewheel')
					})

					//link-preview
				}

			});
		},

		read_more : function(_this){
			$(_this).parent().parent().find('._time_line_over_flow').removeClass('_time_line_over_flow')
			$(_this).remove();
		},

		recover : function (group_info_no){
			if(confirm('그룹을 복원하시겠습니까? (완전삭제를 원하시는경우 슈퍼관리자에게 요청하세요)')){
				getAjaxData($_this.opts.base_url+"common/office_main_ajax/recover_group", { 'group_info_no' : group_info_no  }, function(data){
					$_this.alert_fnc(data, 'Y') ;
				});
			}
		},

		get_more_newsfeed : function() {

            if ($_this.opts.mode == 'modify') {
                alert('수정모드에서는 더보기 기능이 금지됩니다.')
                return;
            }

            $_this.opts.page += 1;
            var param = {page: $_this.opts.page, insert_cnt: $_this.opts.insert_cnt};

            getAjaxData($_this.opts.base_url + "common/office_main_ajax/get_more_newsfeed", param, function (data) {
                if (data.resultCode == 'SUCCESS') {
                    $("#timeLineTemplate").tmpl(data.result).appendTo("#newsfeed_area_div");
                    $.each(data.result, function (idx, value) {
                        $('#news_feed_' + value.no + ' .mentions').mentionsInput({
                            source: $_this.opts.member_list
                        });
                    });
					$.extend($_this.opts.time_line , data.result);

					//link-preview
					$(".link-wrap a").on('mouseover',function() {
						var $el = $(this).parent();
						var $link = $(this);
						getLinkData($el[0],$link[0]);

						$(this).on('scroll touchmove mousewheel', function(event) {
							event.preventDefault();
							event.stopPropagation();
							return false;
						})
						isOpen = true;

					})
					$(".link-wrap a").on('mouseleave', function() {
						$('.link-preview').removeClass('show');
						$('.result-script').removeClass('fullSize');
						isOpen = false;
						$(this).off('scroll touchmove mousewheel')
					})
					//link-preview end
				}else{
					$('#more_btn').hide()
					alert(data.message)
				}
			})
		},

		remove_reply : function ( reply_no , time_line_no , _this ){
			var reply_this = _this;
			var _fk_content_no = '';

			if(confirm('댓글을 삭제하시겠습니까')) {

                getAjaxData($_this.opts.base_url + "common/office_main_ajax/remove_reply", {
                    'reply_no': reply_no,
                    'time_line_no': time_line_no
                }, function (data) {
                    if (data.resultCode == 'SUCCESS') {
                        $(reply_this).parent().remove()

                        $.each($_this.opts.time_line, function (idx, value) {
                            if (value.no == time_line_no) {
                                var del_index = false;
                                $.each(value.reply_data, function (idx2, value2) {
                                    if (value2.no == reply_no) {
                                        del_index = idx2;
                                    }
								});
								if(del_index != false)
									value.reply_data.splice(del_index,1);
							}
						});
					}else{
						alert(data.message)
					}
				});
			}
		},

		tmp_file_del : function (tmp_no){
			if(confirm('해당파일을 제거하시겠습니까?')) {

                getAjaxDataWithApiV4($_this.opts.news_feed_api + "/v4/public-cards/delete-temp-file-old-feed/" + $_this.opts.upload_tmpkey + "/" + tmp_no, null, function (data) {
                    $_this.recalculate_attach_files();
                });
            }
		},

		check_url : function (mode){
			var str =$('#insert_newsfeed_textarea').val().trim();
			//var p = /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/gi;
			var p = /(([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/gi;

			$_this.mentions_expend_fnc()


			if (( (event.keyCode == '13' || event.keyCode == '32' ) &&  str != '') || mode == 'init' ) {
				var result = str.match(p);

				if(result != null && result.length > 0 ){

					getAjaxData($_this.opts.base_url+"common/office_main_ajax/get_url_link", { url : result[0] }, function(data){
						if(data.resultCode == 'SUCCESS'){
							$_this.opts.available_url = data.result;
							$('._url_tmpl').remove()
							var image_url = $_this.opts.available_url.image;
							var https_regex = new RegExp('^https:\/\/[^.]+\.([^.]+(\.[^.]+)*)$');
							if(image_url == '' || !https_regex.test(image_url)){
								$("#timeLineUrlNoPhotoTemplate" ).tmpl($_this.opts.available_url).appendTo( "#_newsLink_area" );
								$_this.opts.available_url.image = '';
							}else{
								$("#timeLineUrlPhotoTemplate" ).tmpl($_this.opts.available_url).appendTo( "#_newsLink_area" );
							}
						}
					});
				}
			}
		},

		remove_url_photo : function(){
			$_this.opts.available_url.image = '';
			$('._url_tmpl').remove();
			$("#timeLineUrlNoPhotoTemplate" ).tmpl($_this.opts.available_url).appendTo( "#_newsLink_area" );
		},

		remove_url : function(){
			$_this.opts.available_url  = [];
			$('._tmpl_form').remove()
		},

		showImgViewer : function (timeline_no){
			$('.img_show_'+timeline_no).eq(0).find('a').click()
		},

		insert_newsfeed : function (){
			if($_this.opts.total_websize_over_flag == 'Y'  || $_this.opts.newsfeed_limit_over == 'Y' ){
				alert('오피스 용량(웹용량)이 부족하여 글을 작성할 수 없습니다. ')
				return;
			}

			var n_content = $('#insert_newsfeed_textarea').val().trim();

			if(n_content == '' && $_this.opts.total_size === 0 && $_this.opts.available_url.length  != undefined  ){
				alert('입력하신 내용이 없습니다.');
				return;
			}else{
				var mentions  = $('#insert_newsfeed_textarea').mentionsInput('getMentions');

				n_content = $_this.check_mentions_fnc()
				//n_content = $('#insert_newsfeed_textarea').val().trim();

				getAjaxData($_this.opts.base_url+"common/office_main_ajax/insert_newsfeed", {n_content : n_content , mentions : mentions , url_link : $_this.opts.available_url , upload_tmpkey : $_this.opts.upload_tmpkey , total_size : $_this.opts.total_size , url_link : $_this.opts.available_url }, function(data) {
                    location.reload();
                });
			}
		},

		modify_newsfeed : function (){

			if($_this.opts.total_websize_over_flag == 'Y'  || $_this.opts.newsfeed_limit_over == 'Y' ) {
                alert('오피스 용량(웹용량)이 부족하여 글을 작성할 수 없습니다. ')
                return;
            }

			var n_content = $('#insert_newsfeed_textarea').val().trim();

			if(n_content == '' && $_this.opts.total_size === 0 && $_this.opts.available_url.length == 0  ){
				alert('입력하신 내용이 없습니다.');
				return;
			}else{

				var mentions  = $('#insert_newsfeed_textarea').mentionsInput('getMentions');

				n_content = $_this.check_mentions_fnc()
				//n_content = $('#insert_newsfeed_textarea').val().trim();

				getAjaxData($_this.opts.base_url+"common/office_main_ajax/modify_newsfeed", { timeline_no : $_this.opts.timeline_no , mentions: mentions, n_content : n_content , url_link : $_this.opts.available_url , upload_tmpkey : $_this.opts.upload_tmpkey , total_size : $_this.opts.total_size }, function(data){
					if(data.resultCode == 'SUCCESS'){
						alert(data.message)
						window.location = $_this.opts.base_url+"common/office_main/";
					}else{
						alert(data.message)
					}
				});
			}
		},

		toggle_goodjob_timeline : function (time_line_no , _this ){
			var flag = '';
			var time_line_index ='';
			var gj_index ='';

			$.each( $_this.opts.time_line , function (idx, value){

                if(value.no == time_line_no){
					time_line_index = idx;

					if(value.sub_info.G.length == 0){
						flag = 'insert';
					}else{
						$.each(value.sub_info.G , function (gidx, gvalue){
							if(gvalue.admin_user_info_no == $_this.opts.ad_user_info_no){
								flag = 'del';
								gj_index = gidx;
							}
						});

						if(flag == ''){
							flag = 'insert';
						}
					}
				}
			});

			if(flag != ''){
				getAjaxData($_this.opts.base_url+"common/office_main_ajax/toggle_goodjob_timeline", {time_line_no : time_line_no , flag : flag }, function(data){

					if(data.resultCode == 'SUCCESS'){

                        if(flag == 'del'){
							$_this.opts.time_line[time_line_index]['sub_info']['G'].splice(gj_index,1);
						}else{
							$_this.opts.time_line[time_line_index]['sub_info']['G'].push(data.result);
						}
						$_this._regenerateGj(time_line_no , $_this.opts.time_line[time_line_index]['sub_info']['G'].length , flag)
					}
				});
			}
		},

		_regenerateGj : function (time_line_no , length , flag) {
			$('.unit_'+time_line_no+' .like_no').text(length);
			var length = parseInt(length);

			if(flag == 'insert'){
				$('.unit_'+time_line_no+' .good-job').text('굿잡취소')
			}else{
				$('.unit_'+time_line_no+' .good-job').text('굿잡')
			}

			if(length == 0){
				$('.unit_'+time_line_no+' .like_sub').hide()
			}else{
				$('.unit_'+time_line_no+' .like_sub').show()
			}
		},

		toggle_goodjob_reply : function (reply_no, time_line_no , _this){
			var flag = 'insert';
			var _idx = ''
			var _gidx = ''
			var length = '';
			var _this = _this;
			var _hidden = 'N';

			$.each( $_this.opts.time_line , function (idx, value){
				if(value.no == time_line_no){
					_idx = idx;
					$.each(value.reply_data, function (gidx, gvalue){
						if(gvalue.no ==reply_no ){
							_gidx = gidx;

                            if(gvalue.my_goodjob_flag == 'Y'){
								flag = 'del';
							}
							_hidden = gvalue.hidden;
						}
					});
				}
			});

			if(flag != '' && _idx !== '' && _gidx !== ''){
				getAjaxData($_this.opts.base_url+"common/office_main_ajax/toggle_goodjob_reply", {reply_no : reply_no , flag : flag , hidden : _hidden }, function(data){
					if(data.resultCode == 'SUCCESS'){
						if(flag == 'insert'){
							$(_this).parent().find('a').text('굿잡취소')
						}else{
							$(_this).parent().find('a').text('굿잡')
						}
						$_this.opts.time_line[_idx].reply_data[_gidx].goodjob_users = data.result.goojob_list;
						$_this.opts.time_line[_idx].reply_data[_gidx].my_goodjob_flag = data.result.is_goodjob;
						length = $_this.opts.time_line[_idx].reply_data[_gidx].goodjob_users.length

						if(length == 0){
							$(_this).parent().find('.like_reply_sub').hide()
						}else{
							$(_this).parent().find('.like_reply_sub').show()
							$(_this).parent().find('.like_reply_sub span').eq(2).text(length)
						}
					}else{
						alert(data.message)
					}
				});
			}
		},

		pin_it : function (timeline_no , _this , group_info_no , ct_no){
			var flag = 'del';
			var confirm_flag = false;
			var timeline_owner = '';
			var group_info_no =  typeof group_info_no !== 'undefined' ? group_info_no : '0';
			var ct_no =  typeof ct_no !== 'undefined' ? ct_no : '0';

			if($(_this).children().eq(0).hasClass('it')){
				flag = 'del';
				confirm_flag = true;
				$(_this).children().eq(0).toggleClass('it')
			}else{
				flag = 'insert';
				confirm_flag = true;
				$(_this).children().eq(0).toggleClass('it')
				timeline_owner = $('#news_feed_'+timeline_no+' .time_line_user_name').val()
			}

			if(confirm_flag){
				getAjaxData($_this.opts.base_url+"common/office_main_ajax/pin_it", { time_line_no : timeline_no , flag : flag , timeline_owner : timeline_owner , group_info_no : group_info_no , ct_no : ct_no  }, function(data){
					if(data.resultCode == 'SUCCESS' && flag == 'del' && $_this.opts.timeline_no == '') {
                        document.location.reload();
                        return;

                        var del_index = false;
                        $.each($_this.opts.pin_data, function (idx, value) {
                            if (value.time_line_no == timeline_no) {
                                del_index = idx;
                            }
                        });

                        if (del_index !== false && $_this.opts.pin_data[del_index].type == 'NP') {	// 공지와 핀이 섞인 타입인경우
                            document.location.reload();
                            return;
                        }

                        if ($_this.opts.mode == "search" || $_this.opts.mode == "detail_search") {
                            $('#news_feed_' + timeline_no + ' ._pinClass').removeClass('it')
                            return;
                        }


                        if (del_index !== false) {
                            $_this.opts.pin_data.splice(del_index, 1);
                            $('._newfeed_pin_class').remove()
                            $_this.listing_pinlist();
                            $('.unit_' + timeline_no + ' ._pinClass').removeClass('it')
						}

					}else if (data.resultCode == 'SUCCESS' && flag == 'insert' && $_this.opts.timeline_no == '' ) {
                        document.location.reload();
                        return;

                        var insert_index = false;
                        $.each($_this.opts.pin_data, function (idx, value) {	// 공지가 이미 되어있는경우
                            if (value.time_line_no == timeline_no) {
                                insert_index = idx;
                            }
                        });

                        if (insert_index !== false && $_this.opts.pin_data[insert_index].type == 'N') {	// 공지와 핀이 섞인 타입인경우
                            document.location.reload();
                            return;
                        }

                        if ($_this.opts.mode == "search" || $_this.opts.mode == "detail_search") {
                            $('#news_feed_' + timeline_no + ' ._pinClass').addClass('it')
                            return;
                        }

                        $_this.opts.pin_data.unshift(data.result)
						$('._newfeed_pin_class').remove()
						$_this.listing_pinlist();
						$('#news_feed_'+timeline_no+' ._pinClass').addClass('it')

					}else if (data.resultCode == 'SUCCESS' && $_this.opts.timeline_no != '' ){	// 단일 글 보기

					}else{
						alert('ERROR')
					}
				});
			}
		},

		pin_it_bbs : function (timeline_no , _this , fk_board_no , fk_content_no){
			var flag = 'del';
			var sub_title = $j('#bbs_newsfeed_'+timeline_no+' .unit-title').text()

			if($(_this).children().eq(0).hasClass('it')){
				flag = 'del';
				$(_this).children().eq(0).toggleClass('it')
			}else{
				flag = 'insert';
				$(_this).children().eq(0).toggleClass('it')
			}

			getAjaxData($_this.opts.base_url+"common/office_main_ajax/pin_it", { time_line_no : timeline_no , flag : flag , sub_type : 'bbs' , sub_title : sub_title ,  fk_board_info_no : fk_board_no , fk_board_content_no : fk_content_no }, function(data){
				if(data.resultCode == 'SUCCESS' && flag == 'del' ) {
                    document.location.reload();
                    return;

                    var del_index = false;
                    $.each($_this.opts.pin_data, function (idx, value) {
                        if (value.time_line_no == timeline_no) {
                            del_index = idx;
                        }
                    });

                    if (del_index !== false) {
                        $_this.opts.pin_data.splice(del_index, 1);
						$('._newfeed_pin_class').remove()
						$_this.listing_pinlist();
						$('#news_feed_'+timeline_no+' ._pinClass').removeClass('it')
					}

				}else if (data.resultCode == 'SUCCESS' && flag == 'insert'  ) {
                    document.location.reload();
                    return;

                    $_this.opts.pin_data.unshift(data.result)
                    $('._newfeed_pin_class').remove()
                    $_this.listing_pinlist();
                    $('#news_feed_' + timeline_no + ' ._pinClass').addClass('it')
                }else{
					alert('ERROR')
				}
			});

        },

		goBbsContent : function (fk_board_info_no , fk_board_content_no) {
            window.open($_this.opts.base_url + 'bbs/board/board_view/' + fk_board_info_no + "/" + fk_board_content_no, '_blank');
        },

		goBbs : function (fk_board_info_no) {
            window.open($_this.opts.base_url + 'bbs/board/board_list/' + fk_board_info_no, '_blank');
        },


		modifyBbsContent : function (fk_board_info_no , fk_board_content_no) {
            window.open($_this.opts.base_url + 'bbs/board/board_write/modify/' + fk_board_info_no + "/" + fk_board_content_no, '_blank');
        },

		go_view : function (timeline_no){
			window.location = $_this.opts.base_url+"common/office_main/view/"+timeline_no;
		},

		removeBbsContent : function ( time_line_no , fk_board_info_no , fk_board_content_no) {
			if(confirm("삭제 하시겠습니까?")){
				getAjaxData($_this.opts.base_url+"bbs/board_ajax/boardContentsDelete", {fk_board_info_no : fk_board_info_no , fk_board_content_no : fk_board_content_no }, function(data){
					if(data.resultCode == 'SUCCESS'){
						var del_index = false;
						$.each($_this.opts.time_line , function (idx, value){
							if(value.no == time_line_no){
								del_index = idx;
							}
						});

						if(del_index !== false){
							$_this.opts.time_line.splice(del_index,1);
                            $("#bbs_newsfeed_" + time_line_no).remove()
                        }

                    } else {
                        alert(data.message)
                    }
                })
            }
        },

        url_copy_popup: function (timeline_no) {
            $_this.opts.cp_url_timeline_no = timeline_no
            popup_fnc('group_url_copy_popup', 'on')
            var url = window.location.origin + $_this.opts.base_url + "common/office_main/view/" + timeline_no;
            $('#group_url_copy_popup input').val(url)
        },

        url_copy: function () {
            var url = window.location.origin + $_this.opts.base_url + "common/office_main/view/" + $_this.opts.cp_url_timeline_no;
            if (getIEVersion() == false) {
                alert('IE에서만 제공가능한 기능입니다. 해당주소를 Ctrl+c 로 수동복사하세요');
			}else{
				alert('URL 복사완료');
				window.clipboardData.setData("Text", url);
			}
		},

		setting_notice : function (time_line_no , flag){
			getAjaxData($_this.opts.base_url+"common/office_main_ajax/setting_notice", { time_line_no : time_line_no , flag : flag }, function(data){
				if(data.resultCode == 'SUCCESS'){
					document.location.reload();
				}else{
					alert(data.message)
				}
			});
		},

		strip_tags: function(input, type) {
            if ($j.inArray(type, Array("bbs")) > -1) {
                if (input.length > 0) {
                    input = input.trim().replace(/<p>&nbsp;<\/p>/gi, "\n").replace(/&nbsp;/gi, " ");
                }
                input = input.replace(/<br[^>]*>/gi, "<br>").replace(/[\n|\r|\n\r]/gi, "").replace(/<br>(<br>)+/gi, "<br>");
                input = input.replace(/<br>(<br>)+/gi, "<p style='margin:-4px 0;'>&nbsp;</p>");
                if (input.length > 255) {
                    //input = input.substr(0, 255);
                    //input += '...'
                }
            } else {
                //input = input.replace(/\n/gi, "<br>").replace(/<br>(<br>)+/gi, "<p style='margin:-4px 0;'>&nbsp;</p>");
            }
            return input;
        },

		main_img_defalut : function (flag){	// 그룹 메인이미지를 디폴트 이미지로 바꾼다.
			$_this.opts.main_img_url = flag;
			$('.group-images .large-img img').attr('src',"/static/images/group/group-default-"+flag+".jpg");
		},

		group_make_office : function (){
			var group_name = (input_check($('#_group_name').val()) == true )  ? $('#_group_name').val().trim() : false ;
			var group_main_img_url = $_this.opts.main_img_url;

			if(group_name == false){
				$('#group_create_popup .input-error').eq(0).show();
				return;
			}

            if(group_main_img_url == false){
				alert('메인이미지를 설정해주세요');
				return;
			}

			if(group_name != false || group_main_img_url != false){

				getAjaxData($_this.opts.base_url+"common/office_main_ajax/group_make_office", {group_name : group_name , group_main_img_url :  group_main_img_url  }, function(data){
					if(data.resultCode == 'SUCCESS'){
						window.location = $_this.opts.groot+"group/"+data.result.group_info_no;
					}else{
						alert(data.message);
					}
				});
			}
		},

		alert_fnc : function (data, refreash){
			if(data.resultCode == 'SUCCESS'){
				alert(data.message)
				if(refreash == 'Y')
					document.location.reload();
			}else{
				alert(data.message)
			}
		}
	});



//link-preview
	var isOpen = false;
	function getLinkData(target,content) {
		var enc_target = encodeURIComponent(content);
		var host = "https://site-info-api.hiworks.com/";
		var endpoint = "/url-preview";
		var _url = host + endpoint + "?filter[url]=" + enc_target;
		$.ajax({
			url: _url,
			method: 'get',
			dataType: 'json',
			success: function (response) {
				$('.result-script .title').html('');
				$('.result-script .description').html('');
				$('.result-image').html('');
				if (response.data[0].image !== '') {

					$('.result-image').append("<img src=" + response.data[0].image + " alt='사이트이미지'>")
					$('.result-image').show();
				} else {
					$('.result-image').hide();
					$('.result-script').addClass('fullSize');
				}

				$('.result-script .title').html(response.data[0].title);
				$('.result-script .description').html(response.data[0].description);


				setPreviewPosition(target)

				if (isOpen) {
					$('.link-preview').addClass('show');
				}


			},
			error: function (error) {
				console.log(error);

			}
		})
	}

	function setPreviewPosition(target) {
		//preview setting
		var screenW = window.innerWidth;
		var screenH = window.innerHeight;
		var prevW = 430;
		var prevH = 95;
		var interval = 5;
		var scl = $(window).scrollTop();

		var el_pos = {};
		el_pos.top = $(target).offset().top;
		el_pos.left = $(target).offset().left;
		el_pos.width = $(target).width();
		el_pos.height = $(target).height();
		var $prev = $('.link-preview');
		console.log($prev, el_pos, scl)

		$('.link-preview').css('top', el_pos.top+el_pos.height-scl+'px');
		$('.link-preview').css('left', el_pos.left+'px');
		if(el_pos.left < 0) {
			$('.link-preview').css('left', '0px');
		}
		if(el_pos.left+prevW>screenW){
			console.log(screenW-prevW)
			$('.link-preview').css('left', screenW-prevW+'px');
			console.log($('.link-preview').css('top'))

		} //fixed right x
		if(el_pos.top+prevH+el_pos.height > screenH) {
			$('.link-preview').css('top', el_pos.top - el_pos.height - prevH - scl+ 'px');
		} // fixed bottom y
	}
//link-preview end

})(jQuery);

