import Controller from '@ember/controller';

export default Controller.extend({
    openFlag: false,
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
