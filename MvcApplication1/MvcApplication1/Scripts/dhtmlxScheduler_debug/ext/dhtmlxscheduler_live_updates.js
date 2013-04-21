Scheduler.plugin(function(scheduler){
if (typeof(dataProcessor) !== "undefined") {
    var oldInit = dataProcessor.prototype.init;
   
    dataProcessor.prototype.init = function () {
        oldInit.apply(this, arguments);

        var self = this;
        this.attachEvent("onAfterUpdate", function (sid, action, tid, tag) {
            var item;
            if (self.obj.exists(sid))
                item = self.obj.item(sid);
            else
                item = {};

            if (typeof (item.$selected) !== 'undefined') delete item.$selected;
            if (typeof (item.$template) !== 'undefined') delete item.$template;

            self.callEvent("onLocalUpdate", [{ sid: sid, tid: tid, status: action, data: item }]);
        });
    };

    dataProcessor.prototype.applyChanges = function (update) {
        var self = this;
        var sid = update.sid;
        var tid = update.tid;
        var status = update.status;
        var data = update.data;
        // prevent selection loosing
        if (self.obj.isSelected(sid)) data.$selected = true;
        switch (status) {
            case 'updated':
            case 'update':
            case 'inserted':
            case 'insert':
                if (self.obj.exists(sid)) {
                    if (self.obj.isLUEdit(data) === sid) {
                        self.obj.stopEditBefore();
                    };
                    self.ignore(function () {
                        self.obj.update(sid, data);
                        if (sid !== tid) self.obj.changeId(sid, tid);
                    });
                } else {
                    data.id = tid;
                    self.ignore(function () {
                        self.obj.add(data);
                    });
                }
                break;
            case 'deleted':
            case 'delete':
                self.ignore(function () {
                    if (self.obj.exists(sid)) {
                        self.obj.setUserData(sid, '!nativeeditor_status', 'true_deleted');
                        self.obj.stopEditBefore();
                        self.obj.remove(sid);
                        if (self.obj.isLUEdit(data) === sid) {
                            // prevent loosing not-saved data
                            self.obj.preventLUCollision(data);
                            if (self.obj.callEvent("onLiveUpdateCollision", [sid, tid, status, data]) === false) {
                                // we have to close editor here without saving
                                self.obj.stopEditAfter();
                            }
                        }
                    }
                });
                break;
        }
    };

}


if (typeof(scheduler) !== "undefined") {
	scheduler.item = function(id) {
		var event = this.getEvent(id);
		if (!event) return {};
		var data = {};
		for (var i in event)
			data[i] = event[i];

		data.start_date = scheduler.date.date_to_str(scheduler.config.api_date)(event.start_date);
		data.end_date = scheduler.date.date_to_str(scheduler.config.api_date)(event.end_date);
		return data;
	};
	scheduler.update = function(id, data) {
		var event = this.getEvent(id);
		for (var i in data)
			if (i != 'start_date' && i!='end_date')
				event[i] = data[i];
		var convert = scheduler.date.str_to_date(scheduler.config.api_date);
		scheduler.setEventStartDate(id, convert(data.start_date));
		scheduler.setEventEndDate(id, convert(data.end_date));
		this.updateEvent(id);
	};
	scheduler.remove = function(id) {
		if (this.exists(id))
			this.deleteEvent(id, true);
	};

	scheduler.exists = function(id) {
		var event = this.getEvent(id);
		return event ? true : false;
	};

	scheduler.add = function(data) {
		return this.addEvent(data.start_date, data.end_date, data.text, data.id, data);
	};

	scheduler.changeId = function(old_id, new_id) {
		return this.changeEventId(old_id, new_id);
	};

	scheduler.stopEditBefore = function() {};

	scheduler.stopEditAfter = function() {
		this.endLightbox(false, this._lightbox);
	};

	scheduler.preventLUCollision = function(data) {
		this._new_event=this._lightbox_id;
		data.id = this._lightbox_id;
		this._events[this._lightbox_id] = data;
	};

	scheduler.isLUEdit = function(data) {
		if (this._lightbox_id)
			return this._lightbox_id;
		return null;
	};

	scheduler.isSelected = function(id) { return false; };
}

});
