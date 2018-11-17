import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_exp_service: service(),
    cur_idx: 0,
    // tableTitle: ["参与者","孩子","生日","性别", "联系方式", "渠道", "", "操作"],
    // tableContent: [
    //     {
    //         ind: "1",
    //         kid: "牛牛",
    //         birt: "1996-02-07",
    //         sex: "男",
    //         contact: "11111111111",
    //         channels: "小程序",
    //     },
    //     {
    //         ind: '2',
    //         kid: "王二小",
    //         birt: "1996-03-25",
    //         sex: "男",
    //         contact: "11111111111",
    //         channels: "小程序",
    //     }
    // ],
    tableTitle: ["场次号","时间段","校区","报名人数", "", "操作"],
    tableContent: [
        {
            no: "01",
            time: "10：00-12：00",
            campus: "东直门",
            already: "32",
            total: "100",
        },
        {
            no: '02',
            time: "10：00-12：00",
            campus: "国贸",
            already: "13",
            total: "100",
        }
    ],
    actions: {
        linkToExpField(idx) {
            this.transitionToRoute('detail.exp-field', idx);
        },
    },

});
