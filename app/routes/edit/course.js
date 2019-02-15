import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        let si = null;
        let isPushing = false;
        if(params.courseid === "course/push") {
            si = this.store.createRecord('sessioninfo');
            si.set("status", 2)
            isPushing = true;
        } else {
            si = this.store.findRecord('sessioninfo', params.courseid);
        }
        return RSVP.hash({
            isPushing: isPushing,
            courseid: params.courseid,
            course : si,
            describe: A(["课程类别","课程名称","分类/标签","收费模式", "课程详情", "课程图片"]),
        })
    },
});
