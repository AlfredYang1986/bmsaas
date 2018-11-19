import Component from '@ember/component';

export default Component.extend({
	classNames: [],
	positionalParams: ['title', 'applies'],
	actions: {
		setCurrentApply: function (params) {
			this.sendAction("action", params);
		},
	}
});
