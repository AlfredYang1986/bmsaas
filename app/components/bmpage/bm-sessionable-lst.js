import Component from '@ember/component';

export default Component.extend({
    classNames: ['bm-sessionable-table'],
    positionalParams: ['titles', 'listData'],
    listData: null,
    actions : {
        onClickInner: function(fieldId) {
            // this.sendAction("action", fieldId);
            this.onClickInner(fieldId);
        },
        onEditSessionClick: function (params) {
            // this.sendAction("onEditSessionClick", params);
            this.onEditSessionClick(params);
		},
		onDeleteSessionClick: function (params) {
            // this.sendAction("onDeleteSessionClick", params);
            this.onDeleteSessionClick(params);
		},
    }
});
