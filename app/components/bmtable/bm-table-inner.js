import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['listData' ,'type'],
    tagName: '',
	dealed: false,
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
        registerClick: function() {
        },
        addStud(params) {
            this.sendAction("addStud", params);
        }
	}
});
