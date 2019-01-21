import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            reserveTitle: ["孩子","类别","参与内容","意向时间","申请者", "联系方式", "操作"],
            preRegisterTtitle:  ["孩子","性别","年龄","申请者", "联系方式", "操作"],
            exp: this.store.query('reservableitem', { 'status': 1 }),
            actv: this.store.query('reservableitem', { 'status': 0 }),
        })
    },
});
