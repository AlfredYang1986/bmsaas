import Component from '@ember/component';
// import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['bm-sessionable-table'],
    positionalParams: ['titles', 'listData'],
    listData: null,
    // bm_sessionable_service: service(),
    actions : {
        onClick: function(fieldId) {
            this.sendAction("action", fieldId);
        },
        onEditSessionClick: function (params) {
			this.sendAction("onEditSessionClick", params);
		},
		onDeleteSessionClick: function (params) {
			this.sendAction("onDeleteSessionClick", params);
		},
    }
});
