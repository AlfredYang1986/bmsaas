import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['type'],
    store: service(),
    course: computed(function() {
        let result;
        if(this.type == 'exp') {
            result = this.store.query('reservableitem', { 'page[number]': 1, 'page[size]': 16, 'status': 1, "brand-id": localStorage.getItem("brandid")})
        } else if(this.type == 'actv') {
            result = this.store.query('reservableitem', { 'page[number]': 1, 'page[size]': 16, 'status': 0, "brand-id": localStorage.getItem("brandid")})
        }
        result.then((res) => {
			let page = Number.parseInt(localStorage.getItem('reservableitems'));
			this.onRefreshDataComplete(page)
        })
        return result;
    }),
});
