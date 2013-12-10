function fct_affiche_pdf(v_url)
	{
		if (v_url != 'rien') window.open(v_url,'_blank');
	}
function fct_set_last_page_cookie (){
    var v_lastvisit = $.cookie("fis_lastvisited");
    var v_home = $.cookie("fis_home");
    if (v_lastvisit == 1 && v_home != 1){
        $( document ).bind( "pagechange", function( event, data ){
            $.cookie("fis_last_page", top.document.location, {expires: 730, path: "/", domain: "fis-ski.com"});
            $.cookie("fis_home", null,{domain: "fis-ski.com"});
        });
    }
    fct_add_favicon();
}
function fct_home (){
    $.cookie("fis_last_page", null, {expires: 730, path: "/", domain: "fis-ski.com"});
    $.cookie("fis_home", 1,{domain: "fis-ski.com"});
    fct_add_favicon('home');
}
function fct_load_setting(){
    $('#settings').bind( "pagebeforecreate", function( event, data ){
       v_lastvisit = $.cookie("fis_lastvisited");
       $("#fis_lastvisited option:selected").removeAttr("selected");
       if (v_lastvisit != null && v_lastvisit != ""){
            $("#fis_lastvisited option[value='"+v_lastvisit+"']").attr("selected","selected");
       } else {
            $("#fis_lastvisited option[value='0']").attr("selected","selected");
       }
       v_fav_nat = $.cookie("fislive_fav_nat");
       $("#fislive_fav_nat option:selected").removeAttr("selected");
       if (v_fav_nat != null && v_fav_nat != ""){
            $("#fislive_fav_nat option[value='"+v_fav_nat+"']").attr("selected","selected");
       } else {
            $("#fislive_fav_nat option[value='none']").attr("selected","selected");
       }
    });
}
function fct_save_settings(v_field,v_value){
    $.cookie(v_field, v_value, {expires: 730, path: "/", domain: "fis-ski.com"});
}
function fct_highlight_fav_nat(){
    v_fav_nat = $.cookie("fislive_fav_nat");
    if (v_fav_nat != null && v_fav_nat != ""){
        $('.result td:contains("'+v_fav_nat+'")').parent('tr').addClass('favnat');
    }
}
function fct_add_favicon(v_url){
    $( document ).bind( "pagechange", function( event, data ){
        if (v_url == null || v_url == ""){
           var v_url = new String(top.document.location); 
        }
        var v_timestamp = new Date().getTime();
        $("link[rel*='apple-touch-icon']").remove();
        $("link[rel*='shortcut icon']").remove();
        $("link[rel*='icon']").remove();
        if (v_url.indexOf("sectorcode=") > 0) {
            var v_sector = v_url.substr(v_url.indexOf("sectorcode=")+11,2)
            $('head').append('<link rel="apple-touch-icon" type="image/png" href="http://www.fis-ski.com/static/images/mobile/FIS-iPhone-'+v_sector.toLowerCase()+'.png?v='+v_timestamp+'" />');
            $('head').append('<link rel="icon" type="image/png" href="http://www.fis-ski.com/static/images/mobile/FIS-iPhone-'+v_sector.toLowerCase()+'.png?v='+v_timestamp+'" />');
            $('head').append('<link rel="shortcut icon" type="image/png" href="http://www.fis-ski.com/static/images/mobile/FIS-iPhone-'+v_sector.toLowerCase()+'.png?v='+v_timestamp+'" />');
        }else{
            $('head').append('<link rel="apple-touch-icon" type="image/png" href="http://www.fis-ski.com/static/images/mobile/FIS-iPhone.png?v='+v_timestamp+'" />');
            $('head').append('<link rel="icon" type="image/png" href="http://www.fis-ski.com/static/images/mobile/FIS-iPhone.png?v='+v_timestamp+'" />');
            $('head').append('<link rel="shortcut icon" type="image/png" href="http://www.fis-ski.com/static/images/mobile/FIS-iPhone.png?v='+v_timestamp+'" />');
        }
    });
}
function fct_init(){
    $('#home').bind("pageshow", function( event, data ){
        //$.cookie("fis_last_page", null, {expires: 730, path: "/", domain: "fis-ski.com"} );
        fct_add_favicon('home');
        //for App
        var v_inapp = $.cookie("inapp");
        if (v_inapp == "true" && /iPhone|iPad|iPod/i.test(navigator.userAgent) === false){
            $('#fis').append('<a class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-b" data-iconpos="left" data-direction="reverse" rel="external" data-transition="slide" data-theme="b" data-icon="delete" data-role="button" href="javascript:history.go(0-(history.length-1));" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner ui-btn-corner-all">Exit<span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a>');
        } else {
            $('#fis').append('<div id="fis-home"></div>');
        }
    });
}
function fct_deactivate_link(){
    //$(".link").on("load",function(){
        var v_inapp = $.cookie("inapp");
        //alert(v_inapp);
        if (v_inapp == "true"){
            $(".link").hide();
            $(".nolink").show();
        }
    //});
}
function fct_redirect(){
    var v_url = new String(top.document.location); 
    if (v_url.indexOf("fis-for-mobile") > 0) {
        var v_lastvisit = $.cookie("fis_lastvisited");
        if (v_lastvisit == 1){
            var v_last_page = $.cookie("fis_last_page");                         
            if (v_last_page != null && v_last_page != ""){
                $(window.location).attr('href', v_last_page);
            }
        }
    }
}
function fct_workarround_androidapp(){
    var v_inapp = $.cookie("inapp");
    if (v_inapp == "true" && /android/i.test(navigator.userAgent) === true){
        //$('select').selectmenu({ nativeMenu: false });
        $(document).on('mobileinit',function(){
            $.mobile.selectmenu.prototype.options.nativeMenu = false;
        });
    }
} 