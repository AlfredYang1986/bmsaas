import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_actv_service: service(),
    cur_session_idx: 0,
    tableTitle: ["参与者","孩子","生日","性别", "联系方式", "渠道", "", "操作"],
    tableContent: [
        {
            ind: "1",
            kid: "牛牛",
            birt: "1996-02-07",
            sex: "男",
            contact: "11111111111",
            channels: "小程序",
        },
        {
            ind: '2',
            kid: "王二小",
            birt: "1996-03-25",
            sex: "男",
            contact: "11111111111",
            channels: "小程序",
        }
    ]

});
