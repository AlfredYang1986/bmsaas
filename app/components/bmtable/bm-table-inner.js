import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	bmOss: service(),
    positionalParams: ['listData' ,'type'],
    tagName: '',
	dealed: false,
	iconData: null,
	headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',

    actions: {
		onClickInner(params) {
			// this.sendAction("action", params);
			this.onClickInner(params)
		},
		onEditSessionClick(params) {
			// this.sendAction("onEditSessionClick", params);
			this.onEditSessionClick(params);
		},
		onDeleteSessionClick(params) {
			// this.sendAction("onDeleteSessionClick", params);
			this.onDeleteSessionClick(params);
		},
		onEditRoomClick(params) {
			// this.sendAction("onEditRoomClick", params);
			this.onEditRoomClick(params);
		},
		onDeleteRoomClick(params) {
			// this.sendAction("onDeleteRoomClick", params);
			this.onDeleteRoomClick(params);
		},
        registerClick: function() {
        },
		onRemoveTeacherClick(params) {
			// this.sendAction("onRemoveTeacherClick", params);
			this.onRemoveTeacherClick(params);
		},
		// onStudDetailClick(params) {
		// 	this.sendAction("onStudDetailClick", params);
		// },
		onRemoveStudClick(params) {
			// this.sendAction("onRemoveStudClick", params);
			this.onRemoveStudClick(params);
		},
		// onArrcourseClick(params) {
		// 	this.sendAction("onArrcourseClick", params);
		// },
		// onEditArrcourseClick(params) {
		// 	this.sendAction("onEditArrcourseClick", params);
		// },
		onRemoveArrcourseClick(params) {
			// this.sendAction("onRemoveArrcourseClick", params);
			this.onRemoveArrcourseClick(params);
		},
		onRadioChange(param) {
			debugger
			this.onRadioChange(param);
        },
	},
	didReceiveAttrs() {
		if(this.type == "classTeacher" && this.listData != null) {
			let client = this.bmOss.get('ossClient');
			this.iconData = [];
			for(let idx = 0;idx < this.listData.length;idx++) {
				// window.console.log(this.listData);

				// if(this.listData[idx].iconUrl) {
				// 	console.log(1)
				// 	this.set("listData[idx].iconUrl", client.signatureUrl(this.listData[idx].icon));
				// }
				// this.listData[idx].iconUrl = client.signatureUrl(this.listData[idx].icon);
				let tmpObj = {};
				if(this.listData.objectAt(idx).teacher.get("icon") != "" && this.listData.objectAt(idx).teacher.get("icon") != undefined) {
					tmpObj.iconUrl = client.signatureUrl(this.listData.objectAt(idx).teacher.get("icon"));
				} else {
					tmpObj.iconUrl = this.headImg;
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
