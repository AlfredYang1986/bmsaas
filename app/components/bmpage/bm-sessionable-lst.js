import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['bm-sessionable-table'],
    positionalParams: ['titles', 'listData', 'resid', 'totalCount'],
    store: service(),
    listData: null,
    classes: computed('curPage', 'resid', 'totalCount', function() {
        let ps
        ps = this.store.query('class', { 'page[number]': this.curPage, 'page[size]': 20, "reservable-id": this.resid});
        ps.then(() => {
            let count = localStorage.getItem('classes-count')
            let page = Number.parseInt(localStorage.getItem('classes'));
			this.onRefreshDataComplete(count+' '+page)

        })
        return ps
    }),
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
