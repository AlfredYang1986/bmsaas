import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['listData' ,'type'],
    tagName: '',
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
	}
});
