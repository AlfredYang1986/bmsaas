import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            course : this.store.findRecord('sessioninfo', params.sessionid),
            describe: A(["体验课分类","基本信息","内容介绍","与孩子互动", "体验图片",]),
            guide: A(["宝贝将获得","将为宝贝提供","参与者需自带","陪同说明", "须知",]),
        })
    },

    setupController(controller, model) {
        this._super(controller, model);
        controller.set('cur_page_idx', 0);
    },
});
