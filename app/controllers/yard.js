import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    // init() {
    //     this._super(...arguments);
    //     console.log(123)
    //     this.skipListPage();
    //     console.log(123)
    // },
    // bm_yard_service: service(),
    openFlag: true,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.yard', idx);
        },
        addYard() {
            this.transitionToRoute('edit.yard')
        }
    },

    // skipListPage() {
    //     let that = this;
    //     let callback = {
    //         onSuccess: function () {
    //             that.transitionToRoute('detail.yard', that.bm_yard_service.yards.id);
    //             console.log(1)
    //             console.log(that.bm_yard_service.yards.id);
    //         },
    //         onFail: function () {
                
    //         }
    //     }
    //     this.bm_yard_service.queryMultiObjects(callback);
    // }
});
