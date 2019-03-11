import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['type' ,'switchParam','title','mainBtnText'],
    actions : {
        cancelHandled: function() {
            // this.sendAction("cancelHandled");
            this.cancelHandled();
        },
        successHandled: function () {
            // this.sendAction("successHandled");
            this.successHandled();
		},
    }
});
