import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: false,
    isPushing: false,
    cur_cate_id: '',
    savePicDoneFlag: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                // that.model.course.category.set('title', that.cur_cate_id);
                // let cate = this.store.peekRecord("category", this.model.course.category.get("id"));
                // cate.save();
                that.transitionToRoute('detail.exp', that.model.reservable.id);
            }
            let onFail = function ( /*err*/ ) {
                debug('error');
            }
            if(this.model.course.images.length === 0) {
                this.model.course.save().then(onSuccess, onFail);
            } else {
                this.model.course.images.forEach((item, index, arr) => {
                    if(index + 1 == arr.length) {
                        this.set("savePicDoneFlag", true);
                    }
                    if(item.dirtyType !== undefined) {
                        item.save().then(() => {
                            if(this.savePicDoneFlag) {
                                this.model.course.save().then(onSuccess, onFail);
                            }
                        });
                    } else {
                        if(this.savePicDoneFlag) {
                            this.model.course.save().then(onSuccess, onFail);
                        }
                    }
                });
            }
            // this.model.course.save().then(onSuccess, onFail);
        },
        reserveCourse() {
            // this.transitionToRoute('courseReserve');
        },
    },
});
