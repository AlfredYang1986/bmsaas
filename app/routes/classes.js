import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { inject as service } from '@ember/service';


export default Route.extend({
    // bm_breadcrumb_service: service(),

    model() {
        var tmp = this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(res => {
            return new Promise(function(resolve, reject) {
                if (res.length == 0) {
                    resolve(null)
                } else {
                    resolve(res.firstObject)
                }
                reject()
            })
        })
        return RSVP.hash({
            courses: this.store.query('sessioninfo', { "brand-id": localStorage.getItem("brandid"), "status": 2}),
            // courses: this.store.query('reservableitem', { "brand-id": localStorage.getItem("brandid"), "status": 2}),
            yard: tmp,
        })
    },

    activate() {
        if(this.get("controller") != undefined) {
            this.get("controller").toggleProperty("refreshFlag")
        }
    }
});
