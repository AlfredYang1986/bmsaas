import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    // model() {
    //     this.mock_data.sureTech();
    //     let techs = this.store.peekAll('bmtech');
    //
    //     return RSVP.hash({
    //             techs: techs
    //         })
    // },
    model() {
        return {
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
        }
    }
});
