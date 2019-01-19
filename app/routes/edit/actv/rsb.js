import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        let act = this.store.createRecord('reservableitem');
        // this.set("status", )  // TODO: 体验课的status？1？2
        let si = this.store.createRecord('sessioninfo');

        return RSVP.hash({
                actv: act,
                si: si,
                describe: A(["活动分类","基本信息","内容介绍","与孩子互动", "活动图片",]),
                guide: A(["宝贝将获得","将为宝贝提供","参与者需自带","陪同说明", "须知",]),
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        // controller.set('cur_page_idx', 0);
    },
});
