import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['type' ,'switchParam','title','mainBtnText'],
    actions : {
        cancelHandled: function() {
            this.sendAction("cancelHandled");
        },
        successHandled: function () {
			this.sendAction("successHandled");
		},
    }
});
