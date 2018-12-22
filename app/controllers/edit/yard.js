import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';

export default Controller.extend({
    bm_yard_service: service(),

    yard_provinces: null,
    yard_citys: null,
    yard_government_areas: null,

    isPushing: false,
    current_idx: 0,

    yardCandidate: A(['室内', '室外', '室内 + 室外']),
    surroundings: A(['写字楼', '社区', '购物中心', '学校', '其它']),
    facilities: A(['实时监控', '防摔地板', '空气净化器', 'Wi-Fi', '门禁', '安全护栏', '新风系统', '停车场', '急救包', '安全插座', '加湿器', '电梯', '安全桌脚']),
    tagsCandi: A(['阅读区', '教学区', '家长休息区', '生活区', '寄存区', '户外活动区', '室内活动区']),
    handledArr: A([]),

    actions: {
        saveYardBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('yard');
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_yard_service.saveUpdate(callback); 
        },
        multiCheckOnClick(value) {
            // console.log(value)
            if (this.handledArr.indexOf(value) == -1) {
                this.handledArr.push(value)
            } else {
                this.handledArr.splice(this.handledArr.indexOf(value), 1)
            }
            // console.log(this.handledArr)
            this.set('bm_yard_service.yard.facilities', this.handledArr)
            console.log(this.bm_yard_service.yard.facilities)
        }
    },
});
