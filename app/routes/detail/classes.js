import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    mock_data: service(),
    bm_session_service: service(),
    bm_class_service: service(),
    model(params) {
        this.bm_class_service.set('classId', params.clsid);
        // this.mock_data.sureClasses();
        // let cls = this.store.peekRecord('bmclass', params.clsid);
        // if (cls == null) {
        //     this.transitionTo('home');
        // }
    
        return RSVP.hash({
            classid : params.classid,
            tabs: A(['班级教师', '学生名单', '课程安排']),
            // cls: cls,
            teacherList:[{
                name:"张洒",
                tel:"15188311343"
            },{
                name:"张洒",
                tel:"15188311343"
            },{
                name:"张洒",
                tel:"15188311343"
            },{
                name:"张洒",
                tel:"15188311343"
            },],
            courseList:[{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            },{
                courseRank:"第一节",
                data:"08/08",
                week:"周二",
                time:"10：00~12：00",
                teacherName:"a老师"
            }],
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
        this.bm_class_service.set('refresh_token', this.bm_class_service.guid());
        this.bm_session_service.set('refresh_all_token', this.bm_session_service.guid());
    },

    activate() {
        if (this.controller) {
            this.controller.set('refresh_token', this.guid());
        } 
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
