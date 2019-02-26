import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['bm-sessionable-table'],
    positionalParams: ['titles', 'listData', 'resid', 'totalCount'],
    store: service(),
    hasDataFlag: false,
    attributeBindings: ['style'],
    style: computed('hasDataFlag', function(){
        if (this.hasDataFlag) {
            return "";
        } else {
            return 'height:' + "calc(100vh - 356px);" + 
            'margin-bottom:' + "0;";
        }
    }),
    listData: null,
    classes: computed('curPage', 'resid', 'totalCount', function() {
        let ps
        ps = this.store.query('class', { 'page[number]': this.curPage, 'page[size]': 20, "reservable-id": this.resid});
        ps.then(res => {
            let count = localStorage.getItem('classes-count')
            let page = Number.parseInt(localStorage.getItem('classes'));
            this.onRefreshDataComplete(count+' '+page)
            if(res.length == 0) {
                this.set("hasDataFlag", false);
            } else {
                this.set("hasDataFlag", true);
            }
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
