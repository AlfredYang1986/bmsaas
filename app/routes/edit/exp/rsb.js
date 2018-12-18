import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_exp_service: service(),

    model() {
        this.bm_exp_service.set('expid', 'exp/push');
        return RSVP.hash({
                expid: 'exp/push',
                describe: A(["体验课分类","基本信息","内容介绍","与孩子互动", "体验图片",]),
                guide: A(["宝贝将获得","将为宝贝提供","参与者需自带","陪同说明", "须知",]),
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        // controller.set('cur_page_idx', 0);
        this.bm_exp_service.set('refresh_token', this.bm_exp_service.guid());
        // controller.set('refresh_token', this.bm_exp_service.guid());
    },
});
