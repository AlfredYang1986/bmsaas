import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            classid : params.classid,
            tabs: A(['班级教师', '学生名单', '课程安排']),
            techTitles: A(['教师', '职责', '手机', '微信', '']),
            studTitles: A(['姓名', '性别', '年龄', '联系方式', '']),
            arrTitles: A(['课时数', '时间', '教室', '']),
            class: this.store.findRecord('class', params.clsid),
            units: this.store.query('unit', { "class-id": params.clsid}),
            courses: this.store.query('sessioninfo', { "brand-id": localStorage.getItem("brandid"), "status": 2}),
            techs: this.store.query('teacher', { "brand-id": localStorage.getItem("brandid")}),
            studs: this.store.query('student', { "brand-id": localStorage.getItem("brandid")}),
            studentTableHead: [{
                title:"姓名"
            },{
                title:"性别"
            },{
                title:"年龄"
            },{
                title:"联系方式"
            },]
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.controller.set('cur_course_id', model.class.sessioninfo.get("id"));
    }
});
