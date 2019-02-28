import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        let res = null;
        let si = null;
        let cate = null;
        let isPushing = false;
        if(params.courseid === "course/push") {
            isPushing = true;
            res = this.store.createRecord('reservableitem')
            res.set("status", 2)
            si = this.store.createRecord('sessioninfo');
            si.set("status", 2)
            cate = this.store.createRecord('category');
            cate.set('title', '请选择');
            cate.set('subTitle', "")
            cate.save();
            si.set('category', cate);
            res.set("sessioninfo", si)
        } else {
            res = this.store.findRecord('reservableitem', params.resid);
            si = this.store.findRecord('sessioninfo', params.courseid);
        }
        return RSVP.hash({
            isPushing: isPushing,
            courseid: params.courseid,
            reservable : res,
            course : si,
            cate: cate,
            describe: A(["课程类别","课程名称","分类/标签","收费模式", "课程详情", "课程图片"]),
        })
    },
});
