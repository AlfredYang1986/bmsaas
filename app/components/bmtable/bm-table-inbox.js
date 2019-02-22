import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
	classNames: ['bm-inbox-table'],
	positionalParams: ['title', 'isPreReg', 'reserveType', 'curPage'],
	isPreReg: 0,
	reserveType: 0,
	curPage: 1,
	store: service(),

	applies: computed('isPreReg', 'reserveType', 'curPage',  function() {
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
		let result;
        if(this.isPreReg == 1 && this.reserveType == 0) {
            result = this.store.query('apply', { 'page[number]': this.curPage, 'page[size]': 20, "brand-id": localStorage.getItem("brandid"), 'course-type': -1})
        } else if(this.isPreReg == 0 && this.reserveType == 0){
            result = this.store.query('apply', { 'page[number]':  this.curPage, 'page[size]': 20, "brand-id": localStorage.getItem("brandid"), "ne[course-type]": -1});
        } else if(this.isPreReg == 1 && this.reserveType == 1) {
            result = this.store.query('apply', { 'page[number]':  this.curPage, 'page[size]': 20, "brand-id": localStorage.getItem("brandid"), 'course-type': -1, 'gte[apply-time]': today.getTime()})
        } else if (this.isPreReg == 0 && this.reserveType == 1) {
            result = this.store.query('apply', { 'page[number]':  this.curPage, 'page[size]': 20, "brand-id": localStorage.getItem("brandid"), "ne[course-type]": -1, 'gte[apply-time]': today.getTime()})
		}
		result.then(() => {
			let pageCount = localStorage.getItem('applies-count')
			let page = Number.parseInt(localStorage.getItem('applies'));
			this.onRefreshDataComplete(pageCount+' '+page)
		})
        return result
    }),
	actions: {
		setCurrentApply(params) {
			// this.sendAction("action", params);
			this.setCurrentApply(params);
		},
		onPreRegisterClick(params) {
			// this.sendAction('onPreRegisterClick', params)
			this.onPreRegisterClick(params);
		},
		handleBookPageChange() {

		}
	}
});
