import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	bmOss: service(),
    positionalParams: ['listData' ,'type'],
    tagName: '',
	dealed: false,
	iconData: null,
    actions: {
		onClickInner: function (params) {
			this.sendAction("action", params);
		},
		onEditSessionClick: function (params) {
			this.sendAction("onEditSessionClick", params);
		},
		onDeleteSessionClick: function (params) {
			this.sendAction("onDeleteSessionClick", params);
		},
		onEditRoomClick: function (params) {
			this.sendAction("onEditRoomClick", params);
		},
		onDeleteRoomClick: function (params) {
			this.sendAction("onDeleteRoomClick", params);
		},
        registerClick: function() {
        },
        addStud(params) {
            this.sendAction("addStud", params);
		},
		onRemoveTeacherClick(params) {
			this.sendAction("onRemoveTeacherClick", params);
		},
		onStudDetailClick(params) {
			this.sendAction("onStudDetailClick", params);
		},
		onRemoveStudClick(params) {
			this.sendAction("onRemoveStudClick", params);
		},
		onArrcourseClick(params) {
			this.sendAction("onArrcourseClick", params);
		},
		onEditArrcourseClick(params) {
			this.sendAction("onEditArrcourseClick", params);
		},
		onRemoveArrcourseClick(params) {
			this.sendAction("onRemoveArrcourseClick", params);
		},
	},
	didReceiveAttrs() {		
		if(this.type == "classTeacher" && this.listData != null) {
			let client = this.bmOss.get('ossClient');
			this.iconData = [];
			for(let idx = 0;idx < this.listData.length;idx++) {
				window.console.log(this.listData);
				
				// if(this.listData[idx].iconUrl) {
				// 	console.log(1)
				// 	this.set("listData[idx].iconUrl", client.signatureUrl(this.listData[idx].icon));
				// }
				// this.listData[idx].iconUrl = client.signatureUrl(this.listData[idx].icon);
				let tmpObj = {};
				if(this.listData.objectAt(idx).teacher.get("icon") != "" && this.listData.objectAt(idx).teacher.get("icon") != undefined) {
					tmpObj.iconUrl = client.signatureUrl(this.listData.objectAt(idx).teacher.get("icon"));
				} else {
					tmpObj.iconUrl = ""
				}
				this.iconData.pushObject(tmpObj);
			}
		}

		
		// let that = this
		// if(this.type == 'inbox') {
		// 	if(this.attrs.listData.value.firstObject.courseType == -1) {
		// 		this.set('type', 'preRegister');
		// 	}
		// }
    }
});
