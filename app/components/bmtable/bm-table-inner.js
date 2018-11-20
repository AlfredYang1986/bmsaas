import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['listData' ,'type'],
    tagName: '',
    actions: {
		onClickInner: function (params) {
			this.sendAction("action", params);
		},
	}
});
