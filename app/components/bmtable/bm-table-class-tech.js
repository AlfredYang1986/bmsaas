import Component from '@ember/component';

export default Component.extend({
    classNames: ['bm-class-table'],
    positionalParams: ['titles', 'listData'],
    actions : {
		onRemoveTeacherClick: function (params) {
			this.sendAction("onRemoveTeacherClick", params);
		},
    }
});
