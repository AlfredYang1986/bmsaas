import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    inputVal: false,
    cur_page_idx: 0,
    showAddCourse: false,
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',
    bm_error_service: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    didInsertElement() {
        this.set(this.cur_page_idx, 0);
    },

    origin:A([{name: '学员转介绍'}, {name: '电话推广'}, {name: '小程序'}, {name: '线下活动推广'}, {name: '其他'}]),

    actions: {
        searchStud() {
            this.set('inputVal', true);
        },
        addStudCourse() {
            this.set('showAddCourse', true);
        },
        cancelAdd() {
            this.set('showAddCourse', false)
        },
        successAdd() {

        },
        searchCourse() {

        },
        cancelInputBtnClicked() {
            this.transitionToRoute("stud")
        },
    },
});
