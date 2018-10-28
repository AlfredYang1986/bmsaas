import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model(parmas) {
        this.mock_data.sureClasses();
        let cls = this.store.peekRecord('bmclass', parmas.clsid);
        if (cls == null) {
            this.transitionTo('home');
        }
    
        return RSVP.hash({
                cls: cls,
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
});
