import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    bm_session_service: service(),

    model(params) {
        this.bm_session_service.set('sessionid', params.sessionid);
        return RSVP.hash({
                courseid : params.sessionid,
                describe: A(["活动分类","基本信息","内容介绍","与孩子互动", "活动图片",]),
                guide: A(["宝贝将获得","将为宝贝提供","参与者需自带","陪同说明", "须知",]),
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.course != null) {
            controller.set('isPushing', false);
        } else {
            controller.set('isPushing', true);
        }
        controller.set('cur_page_idx', 0);
        this.bm_session_service.set('refresh_token', this.bm_session_service.guid());
        controller.set('refresh_token', this.bm_session_service.guid());
    },
});
