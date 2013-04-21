/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
Scheduler.plugin(function(d){d.config.occurrence_timestamp_in_utc=!1;d.form_blocks.recurring={render:function(){return d.__recurring_template},_ds:{},_init_set_value:function(a,b,c){function i(a){for(var b=0;b<a.length;b++){var c=a[b];c.type=="checkbox"||c.type=="radio"?(g[c.name]||(g[c.name]=[]),g[c.name].push(c)):g[c.name]=c}}function f(a){for(var b=g[a],c=0;c<b.length;c++)if(b[c].checked)return b[c].value}function e(){n("dhx_repeat_day").style.display="none";n("dhx_repeat_week").style.display=
"none";n("dhx_repeat_month").style.display="none";n("dhx_repeat_year").style.display="none";n("dhx_repeat_"+this.value).style.display="block"}function h(a){var b=[f("repeat")];for(r[b[0]](b,a);b.length<5;)b.push("");var c="";if(g.end[0].checked)a.end=new Date(9999,1,1),c="no";else if(g.end[2].checked)a.end=k(g.date_of_end.value);else{d.transpose_type(b.join("_"));var c=Math.max(1,g.occurences_count.value),e=b[0]=="week"&&b[4]&&b[4].toString().indexOf(d.config.start_on_monday?1:0)==-1?1:0;a.end=d.date.add(new Date(a.start),
c+e,b.join("_"))}return b.join("_")+"#"+c}function j(a,b){var c=a.split("#"),a=c[0].split("_");s[a[0]](a,b);var d=g.repeat[{day:0,week:1,month:2,year:3}[a[0]]];switch(c[1]){case "no":g.end[0].checked=!0;break;case "":g.end[2].checked=!0;g.date_of_end.value=m(b.end);break;default:g.end[1].checked=!0,g.occurences_count.value=c[1]}d.checked=!0;d.onclick()}d.form_blocks.recurring._ds={start:c.start_date,end:c._end_date};var l=d.date.str_to_date(d.config.repeat_date),k=function(a){var b=l(a);d.config.include_end_by&&
(b=d.date.add(b,1,"day"));return b},m=d.date.date_to_str(d.config.repeat_date),o=a.getElementsByTagName("FORM")[0],g=[];i(o.getElementsByTagName("INPUT"));i(o.getElementsByTagName("SELECT"));if(!d.config.repeat_date_of_end){var t=d.date.date_to_str(d.config.repeat_date);d.config.repeat_date_of_end=t(d.date.add(d._currentDate(),30,"day"))}g.date_of_end.value=d.config.repeat_date_of_end;var n=function(a){return document.getElementById(a)};d.form_blocks.recurring._get_repeat_code=h;var r={month:function(a,
b){f("month_type")=="d"?(a.push(Math.max(1,g.month_count.value)),b.start.setDate(g.month_day.value)):(a.push(Math.max(1,g.month_count2.value)),a.push(g.month_day2.value),a.push(Math.max(1,g.month_week2.value)),b.start.setDate(1));b._start=!0},week:function(a,b){a.push(Math.max(1,g.week_count.value));a.push("");a.push("");for(var c=[],e=g.week_day,i=0;i<e.length;i++)e[i].checked&&c.push(e[i].value);c.length||c.push(b.start.getDay());b.start=d.date.week_start(b.start);b._start=!0;a.push(c.sort().join(","))},
day:function(a){f("day_type")=="d"?a.push(Math.max(1,g.day_count.value)):(a.push("week"),a.push(1),a.push(""),a.push(""),a.push("1,2,3,4,5"),a.splice(0,1))},year:function(a,b){f("year_type")=="d"?(a.push("1"),b.start.setMonth(0),b.start.setDate(g.year_day.value),b.start.setMonth(g.year_month.value)):(a.push("1"),a.push(g.year_day2.value),a.push(g.year_week2.value),b.start.setDate(1),b.start.setMonth(g.year_month2.value));b._start=!0}},s={week:function(a){g.week_count.value=a[1];for(var b=g.week_day,
c=a[4].split(","),d={},e=0;e<c.length;e++)d[c[e]]=!0;for(e=0;e<b.length;e++)b[e].checked=!!d[b[e].value]},month:function(a,b){a[2]==""?(g.month_type[0].checked=!0,g.month_count.value=a[1],g.month_day.value=b.start.getDate()):(g.month_type[1].checked=!0,g.month_count2.value=a[1],g.month_week2.value=a[3],g.month_day2.value=a[2])},day:function(a){g.day_type[0].checked=!0;g.day_count.value=a[1]},year:function(a,b){a[2]==""?(g.year_type[0].checked=!0,g.year_day.value=b.start.getDate(),g.year_month.value=
b.start.getMonth()):(g.year_type[1].checked=!0,g.year_week2.value=a[3],g.year_day2.value=a[2],g.year_month2.value=b.start.getMonth())}};d.form_blocks.recurring._set_repeat_code=j;for(var p=0;p<o.elements.length;p++){var q=o.elements[p];switch(q.name){case "repeat":q.onclick=e}}d._lightbox._rec_init_done=!0},set_value:function(a,b,c){var i=d.form_blocks.recurring;d._lightbox._rec_init_done||i._init_set_value(a,b,c);a.open=!c.rec_type;a.blocked=c.event_pid&&c.event_pid!="0"?!0:!1;var f=i._ds;f.start=
c.start_date;f.end=c._end_date;i.button_click(0,a.previousSibling.firstChild.firstChild,a,a);b&&i._set_repeat_code(b,f)},get_value:function(a,b){if(a.open){var c=d.form_blocks.recurring._ds,i={};this.formSection("time").getValue(i);c.start=i.start_date;b.rec_type=d.form_blocks.recurring._get_repeat_code(c);c._start?(b.start_date=new Date(c.start),b._start_date=new Date(c.start),c._start=!1):b._start_date=null;b._end_date=c.end;b.rec_pattern=b.rec_type.split("#")[0]}else b.rec_type=b.rec_pattern="",
b._end_date=b.end_date;return b.rec_type},focus:function(){},button_click:function(a,b,c,i){!i.open&&!i.blocked?(i.style.height="115px",b.style.backgroundPosition="-5px 0px",b.nextSibling.innerHTML=d.locale.labels.button_recurring_open):(i.style.height="0px",b.style.backgroundPosition="-5px 20px",b.nextSibling.innerHTML=d.locale.labels.button_recurring);i.open=!i.open;d.setLightboxSize()}};d._rec_markers={};d._rec_markers_pull={};d._add_rec_marker=function(a,b){a._pid_time=b;this._rec_markers[a.id]=
a;this._rec_markers_pull[a.event_pid]||(this._rec_markers_pull[a.event_pid]={});this._rec_markers_pull[a.event_pid][b]=a};d._get_rec_marker=function(a,b){var c=this._rec_markers_pull[b];return c?c[a]:null};d._get_rec_markers=function(a){return this._rec_markers_pull[a]||[]};d._rec_temp=[];(function(){var a=d.addEvent;d.addEvent=function(b,c,i,f,e){var h=a.apply(this,arguments);if(h){var j=d.getEvent(h);j.event_pid!=0&&d._add_rec_marker(j,j.event_length*1E3);if(j.rec_type)j.rec_pattern=j.rec_type.split("#")[0]}}})();
d.attachEvent("onEventIdChange",function(a,b){if(!this._ignore_call){this._ignore_call=!0;for(var c=0;c<this._rec_temp.length;c++){var d=this._rec_temp[c];if(d.event_pid==a)d.event_pid=b,this.changeEventId(d.id,b+"#"+d.id.split("#")[1])}delete this._ignore_call}});d.attachEvent("onBeforeEventDelete",function(a){var b=this.getEvent(a);if(a.toString().indexOf("#")!=-1||b.event_pid&&b.event_pid!="0"&&b.rec_type&&b.rec_type!="none"){var a=a.split("#"),c=this.uid(),d=a[1]?a[1]:b._pid_time/1E3,f=this._copy_event(b);
f.id=c;f.event_pid=b.event_pid||a[0];var e=d;f.event_length=e;f.rec_type=f.rec_pattern="none";this.addEvent(f);this._add_rec_marker(f,e*1E3)}else{b.rec_type&&this._lightbox_id&&this._roll_back_dates(b);var h=this._get_rec_markers(a),j;for(j in h)if(h.hasOwnProperty(j))a=h[j].id,this.getEvent(a)&&this.deleteEvent(a,!0)}return!0});d.attachEvent("onEventChanged",function(a){if(this._loading)return!0;var b=this.getEvent(a);if(a.toString().indexOf("#")!=-1){var a=a.split("#"),c=this.uid();this._not_render=
!0;var d=this._copy_event(b);d.id=c;d.event_pid=a[0];var f=a[1];d.event_length=f;d.rec_type=d.rec_pattern="";this._add_rec_marker(d,f*1E3);this.addEvent(d);this._not_render=!1}else{b.rec_type&&this._lightbox_id&&this._roll_back_dates(b);var e=this._get_rec_markers(a),h;for(h in e)e.hasOwnProperty(h)&&(delete this._rec_markers[e[h].id],this.deleteEvent(e[h].id,!0));delete this._rec_markers_pull[a];for(var j=!1,l=0;l<this._rendered.length;l++)this._rendered[l].getAttribute("event_id")==a&&(j=!0);if(!j)this._select_id=
null}return!0});d.attachEvent("onEventAdded",function(a){if(!this._loading){var b=this.getEvent(a);b.rec_type&&!b.event_length&&this._roll_back_dates(b)}return!0});d.attachEvent("onEventSave",function(a,b){var c=this.getEvent(a);if(!c.rec_type&&b.rec_type&&(a+"").indexOf("#")==-1)this._select_id=null;return!0});d.attachEvent("onEventCreated",function(a){var b=this.getEvent(a);if(!b.rec_type)b.rec_type=b.rec_pattern=b.event_length=b.event_pid="";return!0});d.attachEvent("onEventCancel",function(a){var b=
this.getEvent(a);b.rec_type&&(this._roll_back_dates(b),this.render_view_data())});d._roll_back_dates=function(a){a.event_length=(a.end_date.valueOf()-a.start_date.valueOf())/1E3;a.end_date=a._end_date;a._start_date&&(a.start_date.setMonth(0),a.start_date.setDate(a._start_date.getDate()),a.start_date.setMonth(a._start_date.getMonth()),a.start_date.setFullYear(a._start_date.getFullYear()))};d.validId=function(a){return a.toString().indexOf("#")==-1};d.showLightbox_rec=d.showLightbox;d.showLightbox=
function(a){var b=this.locale,c=d.config.lightbox_recurring,i=this.getEvent(a),f=i.event_pid,e=a.toString().indexOf("#")!=-1;e&&(f=a.split("#")[0]);var h=function(a){var b=d.getEvent(a);b._end_date=b.end_date;b.end_date=new Date(b.start_date.valueOf()+b.event_length*1E3);return d.showLightbox_rec(a)};if((f||f==0)&&i.rec_type)return h(a);if(!f||f==0||!b.labels.confirm_recurring||c=="instance"||c=="series"&&!e)return this.showLightbox_rec(a);if(c=="ask"){var j=this;dhtmlx.modalbox({text:b.labels.confirm_recurring,
title:b.labels.title_confirm_recurring,width:"500px",position:"middle",buttons:[b.labels.button_edit_series,b.labels.button_edit_occurrence,b.labels.icon_cancel],callback:function(b){switch(+b){case 0:return h(f);case 1:return j.showLightbox_rec(a)}}})}else h(f)};d.get_visible_events_rec=d.get_visible_events;d.get_visible_events=function(a){for(var b=0;b<this._rec_temp.length;b++)delete this._events[this._rec_temp[b].id];this._rec_temp=[];for(var c=this.get_visible_events_rec(a),d=[],b=0;b<c.length;b++)c[b].rec_type?
c[b].rec_pattern!="none"&&this.repeat_date(c[b],d):d.push(c[b]);return d};(function(){var a=d.is_one_day_event;d.is_one_day_event=function(b){return b.rec_type?!0:a.call(this,b)};var b=d.updateEvent;d.updateEvent=function(a){var i=d.getEvent(a);i&&i.rec_type&&a.toString().indexOf("#")===-1?d.update_view():b.call(this,a)}})();d.transponse_size={day:1,week:7,month:1,year:12};d.date.day_week=function(a,b,c){a.setDate(1);var c=(c-1)*7,d=a.getDay(),f=b*1+c-d+1;a.setDate(f<=c?f+7:f)};d.transpose_day_week=
function(a,b,c,i,f){for(var e=(a.getDay()||(d.config.start_on_monday?7:0))-c,h=0;h<b.length;h++)if(b[h]>e)return a.setDate(a.getDate()+b[h]*1-e-(i?c:f));this.transpose_day_week(a,b,c+i,null,c)};d.transpose_type=function(a){var b="transpose_"+a;if(!this.date[b]){var c=a.split("_"),i=864E5,f="add_"+a,e=this.transponse_size[c[0]]*c[1];if(c[0]=="day"||c[0]=="week"){var h=null;if(c[4]&&(h=c[4].split(","),d.config.start_on_monday)){for(var j=0;j<h.length;j++)h[j]=h[j]*1||7;h.sort()}this.date[b]=function(a,
b){var c=Math.floor((b.valueOf()-a.valueOf())/(i*e));c>0&&a.setDate(a.getDate()+c*e);h&&d.transpose_day_week(a,h,1,e)};this.date[f]=function(a,b){var c=new Date(a.valueOf());if(h)for(var f=0;f<b;f++)d.transpose_day_week(c,h,0,e);else c.setDate(c.getDate()+b*e);return c}}else if(c[0]=="month"||c[0]=="year")this.date[b]=function(a,b){var f=Math.ceil((b.getFullYear()*12+b.getMonth()*1-(a.getFullYear()*12+a.getMonth()*1))/e);f>=0&&a.setMonth(a.getMonth()+f*e);c[3]&&d.date.day_week(a,c[2],c[3])},this.date[f]=
function(a,b){var f=new Date(a.valueOf());f.setMonth(f.getMonth()+b*e);c[3]&&d.date.day_week(f,c[2],c[3]);return f}}};d.repeat_date=function(a,b,c,i,f){var i=i||this._min_date,f=f||this._max_date,e=new Date(a.start_date.valueOf());if(!a.rec_pattern&&a.rec_type)a.rec_pattern=a.rec_type.split("#")[0];this.transpose_type(a.rec_pattern);for(d.date["transpose_"+a.rec_pattern](e,i);e<a.start_date||d._fix_daylight_saving_date(e,i,a,e,new Date(e.valueOf()+a.event_length*1E3)).valueOf()<=i.valueOf()||e.valueOf()+
a.event_length*1E3<=i.valueOf();)e=this.date.add(e,1,a.rec_pattern);for(;e<f&&e<a.end_date;){var h=d.config.occurrence_timestamp_in_utc?Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds()):e.valueOf(),j=this._get_rec_marker(h,a.id);if(j)c&&b.push(j);else{var l=new Date(e.valueOf()+a.event_length*1E3),k=this._copy_event(a);k.text=a.text;k.start_date=e;k.event_pid=a.id;k.id=a.id+"#"+Math.ceil(h/1E3);k.end_date=l;k.end_date=d._fix_daylight_saving_date(k.start_date,
k.end_date,a,e,k.end_date);k._timed=this.is_one_day_event(k);if(!k._timed&&!this._table_view&&!this.config.multi_day)break;b.push(k);c||(this._events[k.id]=k,this._rec_temp.push(k))}e=this.date.add(e,1,a.rec_pattern)}};d._fix_daylight_saving_date=function(a,b,c,d,f){var e=a.getTimezoneOffset()-b.getTimezoneOffset();return e?e>0?new Date(d.valueOf()+c.event_length*1E3-e*6E4):new Date(b.valueOf()-e*6E4):new Date(f.valueOf())};d.getRecDates=function(a,b){var c=typeof a=="object"?a:d.getEvent(a),i=0,
f=[],b=b||100,e=new Date(c.start_date.valueOf()),h=new Date(e.valueOf());if(!c.rec_type)return[{start_date:c.start_date,end_date:c.end_date}];if(c.rec_type=="none")return[];this.transpose_type(c.rec_pattern);for(d.date["transpose_"+c.rec_pattern](e,h);e<c.start_date||e.valueOf()+c.event_length*1E3<=h.valueOf();)e=this.date.add(e,1,c.rec_pattern);for(;e<c.end_date;){var j=this._get_rec_marker(e.valueOf(),c.id),l=!0;if(j)j.rec_type=="none"?l=!1:f.push({start_date:j.start_date,end_date:j.end_date});
else{var k=new Date(e),m=new Date(e.valueOf()+c.event_length*1E3),m=d._fix_daylight_saving_date(k,m,c,e,m);f.push({start_date:k,end_date:m})}e=this.date.add(e,1,c.rec_pattern);if(l&&(i++,i==b))break}return f};d.getEvents=function(a,b){var c=[],d;for(d in this._events){var f=this._events[d];if(f&&f.start_date<b&&f.end_date>a)if(f.rec_pattern){if(f.rec_pattern!="none"){var e=[];this.repeat_date(f,e,!0,a,b);for(var h=0;h<e.length;h++)!e[h].rec_pattern&&e[h].start_date<b&&e[h].end_date>a&&!this._rec_markers[e[h].id]&&
c.push(e[h])}}else f.id.toString().indexOf("#")==-1&&c.push(f)}return c};d.config.repeat_date="%m.%d.%Y";d.config.lightbox.sections=[{name:"description",height:130,map_to:"text",type:"textarea",focus:!0},{name:"recurring",type:"recurring",map_to:"rec_type",button:"recurring"},{name:"time",height:72,type:"time",map_to:"auto"}];d._copy_dummy=function(){var a=new Date(this.start_date),b=new Date(this.end_date);this.start_date=a;this.end_date=b;this.event_length=this.event_pid=this.rec_pattern=this.rec_type=
null};d.config.include_end_by=!1;d.config.lightbox_recurring="ask";d.attachEvent("onClearAll",function(){d._rec_markers={};d._rec_markers_pull={};d._rec_temp=[]});d.__recurring_template='<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />Daily</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>Weekly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />Monthly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />Yearly</label> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />day<br /> <label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>Every workday</label> </div> <div style="display:none;" id="dhx_repeat_week"> Repeat every<input class="dhx_repeat_text" type="text" name="week_count" value="1" />week next days:<br /> <table class="dhx_repeat_days"> <tr> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />Monday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />Thursday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />Tuesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />Friday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />Wednesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />Saturday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />Sunday</label><br /><br /> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <label><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>Repeat</label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />day every<input class="dhx_repeat_text" type="text" name="month_count" value="1" />month<br /> <label><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><select name="month_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="0">Sunday</select>every<input class="dhx_repeat_text" type="text" name="month_count2" value="1" />month<br /> </div> <div style="display:none;" id="dhx_repeat_year"> <label><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />day<select name="year_month"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select>month<br /> <label><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="7">Sunday</select>of<select name="year_month2"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select><br /> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <label><input class="dhx_repeat_radio" type="radio" name="end" checked/>No end date</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />After</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />occurrences<br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />End by</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="'+
d.config.repeat_date_of_end+'" /><br /> </div> </form> </div> <div style="clear:both"> </div>'});
