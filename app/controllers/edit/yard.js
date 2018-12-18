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
    surroundings: A(['社区', '商圈', '校区', '写字楼', '户外', '露天', '闹市区']),
    tagsCandi: A(['阅读区', '教学区', '家长休息区', '生活区', '寄存区', '户外活动区', '室内活动区']),

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
    },
});
