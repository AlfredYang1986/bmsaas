import Component from '@ember/component';

export default Component.extend({
	classNames: ['bm-inbox-table'],
	positionalParams: ['title', 'applies'],
	actions: {
		setCurrentApply: function (params) {
			this.sendAction("action", params);
		},
	}
});
