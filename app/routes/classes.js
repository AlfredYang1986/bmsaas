import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import CustomError from '../adapters/error';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';


export default Route.extend({
    // bm_breadcrumb_service: service(),
    bm_error_service: service(),

    model() {
        var tmp = this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(res => {
            return new Promise(function(resolve, reject) {
                if (res.length == 0) {
                    resolve(null)
                } else {
                    resolve(res.firstObject)
                }
                reject(res)
            })
        }
        // , err => {
        //     this.bm_error_service.handleError(err.errors)
        //     this.bm_error_service.toastError()
        // }
        )
        return RSVP.hash({
            // courses: this.store.find('reservableitem',"fdsagojudfszh"),
            courses: this.store.query('reservableitem', { "brand-id": localStorage.getItem("brandid"), "status": 2}),
            yard: tmp,
        })
    },

    setupController(controller, model) {
        this._super(controller, model);
        let tempArr = A([])
        model.courses.forEach(elem => {
            let tempObj = {};
            tempObj.id = elem.id;
            elem.get('sessioninfo').then(res => {
                tempObj.title = res.title;
            }, error => {
                this.bm_error_service.handleError(error)
            });
            tempArr.pushObject(tempObj)
        });
        this.controller.set('lessons', tempArr);
    },

    activate() {
        if(this.get("controller") != undefined) {
            this.get("controller").toggleProperty("refreshFlag")
        }
    },

    // actions:{
    //     error(error, transition) {
    //         if (error instanceof CustomError) {
    //             window.console.log(error, transition);
    //             this.bm_error_service.handleError(error)
    //             this.bm_error_service.toastError()
    //             return;
    //         }
      
    //         // ...other error handling logic
    //     }
    // },
});
