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
            describe: A(["课程分类","基本信息","内容介绍","与孩子互动", "课程图片",]),
            guide: A(["宝贝将获得","将为宝贝提供","参与者需自带","陪同说明", "须知",]),
        })
    },
});
