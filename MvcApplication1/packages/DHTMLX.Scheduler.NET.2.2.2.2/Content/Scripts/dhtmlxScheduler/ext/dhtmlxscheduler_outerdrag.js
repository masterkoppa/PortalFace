/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
Scheduler.plugin(function(a){a.attachEvent("onTemplatesReady",function(){var c=new dhtmlDragAndDropObject,f=c.stopDrag,d;c.stopDrag=function(a){d=a||event;return f.apply(this,arguments)};c.addDragLanding(a._els.dhx_cal_data[0],{_drag:function(h,c,f,i){if(!a.checkEvent("onBeforeExternalDragIn")||a.callEvent("onBeforeExternalDragIn",[h,c,f,i,d])){var j=a.attachEvent("onEventCreated",function(b){if(!a.callEvent("onExternalDragIn",[b,h,d]))this._drag_mode=this._drag_id=null,this.deleteEvent(b)}),g=a.getActionData(d),
b={start_date:new Date(g.date)};if(a.matrix&&a.matrix[a._mode]){var e=a.matrix[a._mode];b[e.y_property]=g.section;var k=a._locate_cell_timeline(d);b.start_date=e._trace_x[k.x];b.end_date=a.date.add(b.start_date,e.x_step,e.x_unit)}if(a._props&&a._props[a._mode])b[a._props[a._mode].map_to]=g.section;a.addEventNow(b);a.detachEvent(j)}},_dragIn:function(a){return a},_dragOut:function(){return this}})})});
