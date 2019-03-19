import Component from '@ember/component';
import { inject as service } from '@ember/service';
// import { computed } from '@ember/object';

export default Component.extend({
    bm_error_service: service(),
    positionalParams: ['promiseObj'],

    // pro: computed('promiseObj', function(){
    //     result.then(() => {
	// 		let page = Number.parseInt(localStorage.getItem('reservableitems'));
	// 		this.onRefreshDataComplete(page)
    //     }, error => {
    //         this.bm_error_service.handleError(error)
    //     })
    // }),
    didReceiveAttrs() {
        this.promiseObj.then(() => {
            this.promiseResovled(this.promiseObj)
        }, error => {
            this.bm_error_service.handleError(error)
        })
    }
});
