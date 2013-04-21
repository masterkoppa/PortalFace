/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
Scheduler.plugin(function(a){(function(){function i(e,b,c){var a=e+"="+c+(b?"; "+b:"");document.cookie=a}function j(a){var b=a+"=";if(document.cookie.length>0){var c=document.cookie.indexOf(b);if(c!=-1){c+=b.length;var f=document.cookie.indexOf(";",c);if(f==-1)f=document.cookie.length;return document.cookie.substring(c,f)}}return""}var h=!0;a.attachEvent("onBeforeViewChange",function(e,b,c,f){var g=(a._obj.id||"scheduler")+"_settings";if(h){h=!1;var d=j(g);if(d)return d=unescape(d).split("@"),d[0]=
this.templates.xml_date(d[0]),window.setTimeout(function(){a.setCurrentView(d[0],d[1])},1),!1}var k=escape(this.templates.xml_format(f||b)+"@"+(c||e));i(g,"expires=Sun, 31 Jan 9999 22:00:00 GMT",k);return!0});var g=a._load;a._load=function(){var e=arguments;if(!a._date&&a._load_mode){var b=this;window.setTimeout(function(){g.apply(b,e)},1)}else g.apply(this,e)}})()});
