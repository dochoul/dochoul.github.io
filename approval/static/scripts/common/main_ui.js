$j(document).ready(function() {

    //skip navigation
    $j('.skip_menu a').click(function() {
        var cnt = $j('#contents');
        cnt.attr({tabIndex:-1}).focus();
    });

    //document click
    $j(document).click(function() {
        $j('.gnb_con').removeClass('show');
        $j('#gnb > a').removeClass('on');
        $j('.user_detail').removeClass('show');
        $j('.expand-menu').removeClass('show');
        $j('#showMoremenu').removeClass('hide');
    });


    $j('.logo').focusin(function(event) {
        $j('.gnb_con').removeClass('show');
        $j('#gnb > a').removeClass('on');
        $j('.expand-menu').removeClass('show');
        $j('#showMoremenu').removeClass('hide');
    });
    $j('.notice_icon').focusout(function(event) {
        $j('.gnb_con').removeClass('show');
        $j('#gnb > a').removeClass('on');
        $j('.expand-menu').removeClass('show');
        $j('#showMoremenu').removeClass('hide');
    });
    //gnb show-more
    $j('#showMoremenu').click(function(event){
        $j('.expand-menu').toggleClass('show');
        $j('#showMoremenu').toggleClass('hide');
    });
    $j('.gnb_con').click(function(event) {
        event.stopPropagation();
    });

    
    //launchpad height
   var lpHeight = $j('.launchpad > .menu_cir').height();
   $j('.launchpad').css('height', lpHeight+107+'px');

    //launchpad show-more

    var expandlpHeight = $j('.launchpad  .expand-launch').height(); 
    $j('#showMorelp').click(function(event){
        $j('.expand-launch').addClass('show');
        $j('#showMorelp').addClass('hide');
        $j('.launchpad').css('height', expandlpHeight+lpHeight+107+'px');
    });

    //search focus in-out
    $j('.search input[type="text"]').focus(function(){
        $j('.search').css('background-position','0 -40px');
    });
    $j('.search input[type="text"]').blur(function(){
        $j('.search').css('background-position','0 0');
    });
   
    //lnb fold
    $j('.depth1').siblings('.depth2').parent().find('.depth1 span').addClass('fold');
    
	$j(document).on("click", '.depth1 .foldtop', function(event){
        event.stopPropagation();
        var isDepth2 = $j(this).parent().parent().find('.depth2').length;
        var depth2 = $j(this).parent().parent().find('.depth2');
        if(isDepth2) {
            depth2.toggleClass('show');
            $j(this).find('.icon.fold').toggleClass('open');
        }
    });

    $j('.count').click(function(event) {
        event.stopPropagation();
    });

     $j( "#drag" ).draggable({ containment: "#drag_wrap", scroll: false, axis: "x" });

     $j( "#drag" ).draggable({
        drag: function(event) {
            var top = $j(this).position().top;
            var left = $j(this).position().left + 255;
            //console.log(left);
            $j('#leftmenu').css({'width':left});
            $j('#contents').css({'left':left});
        },
        stop: function( event, ui ) {
            setCookie( 'office_lnb_width', $j('#leftmenu').width() );
            //alert(document.cookie);
        }
    });


    //첨부파일 열기/닫기
    var isAddFilesOpen = true;
    $j('.addFiles > p > .icon').click(function(event) {
        if(isAddFilesOpen) {
            $j(this).css('background-position', '-258px -38px');
            $j('.filebox').hide();
            $j('.submit').hide();
        }else{
            $j(this).css('background-position', '-276px -38px');
            $j('.filebox').show();
            $j('.submit').show();
        }
        isAddFilesOpen = !isAddFilesOpen;
    });

    /* tooltip */
    $j('.tooltip-layer .ttip-link').click(function(){
        $j(this).siblings('.ttip_box').toggleClass('hide');
    });
    $j('.tooltip-layer .btn_closelayer').click(function(){
        $j(this).parent().addClass('hide');
    });

    $j('.disabled .tipsIcon').bind('mouseenter focusin',function() {
        $j(this).siblings('.tooltip').addClass('show');
        $j(this).siblings('.tooltip').removeClass('hide');
    });
    $j('.disabled .tipsIcon').bind('mouseleave focusout',function() {
        $j(this).siblings('.tooltip').removeClass('show');
        $j(this).siblings('.tooltip').addClass('hide');
    });

    // newsfeed comment textarea auto resize
    var newsfeedInputArea = $j('.news-comment textarea');
    //var newsfeedInputAreaVal = newsfeedInputArea.val();
    newsfeedInputArea.focusin(function() {
        $j('.btn_area').removeClass('hide');
        $j('.btn_area').addClass('show');

		var rows_cnt = newsfeedInputArea.attr('rows')

		if(rows_cnt <= 3 ){	rows_cnt = 5;	}
        newsfeedInputArea.animate({rows:rows_cnt},200);
    });

    // newsfeed photo mouseover

	$j(document).on('mouseenter','.feed-photo .scroll li' ,function(){
        $j(this).children('.hide').addClass('show');
    });

	$j(document).on('mouseleave','.feed-photo .scroll li' ,function(){
       $j(this).children('.hide').removeClass('show');
    });

    // newsfeed filelist toggle
    $j(document).on('click','.file-summary', function(event){
       $j(this).siblings('.expand').toggleClass('show');
       $j(this).toggleClass('active');
    });

    $j(document).on('click','.newsbtn_unit .more',function(event){
       if($j(this).siblings('.feed-menu').hasClass('show')){
			$j('.feed-menu').removeClass('show')
			$j(this).siblings('.feed-menu').removeClass('show')
	   }else{
			$j('.feed-menu').removeClass('show')
			$j(this).siblings('.feed-menu').addClass('show')
	   }
       return false;
    });

    $j.each($j('textarea[data-autoresize]'), function() {
        var offset = this.offsetHeight - this.clientHeight;
     
        var resizeTextarea = function(el) {
            $j(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };
        $j(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
        
    });

    // up, down
    var updownBtn = $j('.group-setting .category > ul > li');
    updownBtn.mouseenter(function(){
        $j(this).children('.updown').removeClass('hide');
        $j(this).children('.updown').addClass('show');
    }); 
    updownBtn.mouseleave(function(){
        $j(this).children('.updown').removeClass('show');
        $j(this).children('.updown').addClass('hide');
    }); 
});




