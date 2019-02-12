import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        var tmp = this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(res => {
            return new Promise(function(resolve, reject) {
                if (res.length == 0) {
                    resolve(null)
                } else {
                    resolve(res.firstObject)
                }
            }) 
        })
        return RSVP.hash({
            courses: this.store.query('sessioninfo', { "brand-id": localStorage.getItem("brandid"), "status": 2}),
            classes: this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2, "flag": 0}),
            yard: tmp,
        })
    },

    // setupController(controller, model) {
    //     this._super(controller, model);
    //     this.controller.set('cls', model.classes);
    //     window.console.log(this.controller.get('cls'));
        
    // }
    activate() {
        // window.console.log(this.controllerFor('classes'));
        this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2, "flag": 0}).then(res => {
            this.controllerFor('classes').set("cls", res)
        },
        () => {
            window.console.log("query failed")
        })
        // this.controllerFor('classes').set("cls", )
        // window.console.log(this.get('controller'));
        // window.console.log(this.get("controller").model);
        // if (this.controller) {
        //     this.controller.set('cls', this.model.classes);
        //     window.console.log(this.model.classes);
        //     window.console.log(this.controller.get('cls'));
        //     debugger
        // }
    }
});
