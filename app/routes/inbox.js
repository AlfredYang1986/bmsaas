import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_apply_service: service(),

    model() {
        return RSVP.hash({
            reserveTitle: ["孩子","类别","参与内容","期望时间","申请者", "联系方式", "操作"],
            preRegisterTtitle:  ["孩子","性别","年龄","申请者", "联系方式", "操作"],
        })
    },
    activate() {
        this.bm_apply_service.set('refresh_all_token', this.bm_apply_service.guid());
    }
});
