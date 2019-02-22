import Component from '@ember/component';

export default Component.extend({
    classNames: ['bm-class-table'],
    positionalParams: ['titles'],
    actions : {
        onStudDetailClick: function (params) {
			this.sendAction("onStudDetailClick", params);
		},
		onRemoveStudClick: function (params) {
			this.sendAction("onRemoveStudClick", params);
		},
    }
});
