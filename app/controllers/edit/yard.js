import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
    isPushing: false,
    current_idx: 0,
    changeFlag: false,

    provinces: A(['北京']),
    citys: A(['北京市']),
    areas: A(["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]),

    yardCandidate: A(['室内', '室外', '室内 + 室外']),
    surroundings: A(['写字楼', '社区', '购物中心', '学校', '其它']),
    facilities: A(['实时监控', '防摔地板', '空气净化器', 'Wi-Fi', '门禁', '安全护栏', '新风系统', '停车场', '急救包', '安全插座', '加湿器', '电梯', '安全桌脚']),
    tagsCandi: A(['阅读区', '教学区', '家长休息区', '生活区', '寄存区', '户外活动区', '室内活动区']),

    actions: {
        cancelYardBtnClicked() {
            this.store.unloadRecord(this.model.yard);
            this.transitionToRoute("detail.yard")
        },
        saveYardBtnClicked() {
            this.model.yard.save();
            this.transitionToRoute("detail.yard")
        },
        multiCheckOnClick(value) {

            let tempArr = [];
            if (this.model.yard.facilities != null) {
                tempArr = this.model.yard.facilities;
            }

            this.toggleProperty('changeFlag');
            if (tempArr.indexOf(value) == -1) {
                tempArr.push(value)
            } else {
                tempArr.splice(tempArr.indexOf(value), 1)
            }

            this.model.yard.set('facilities', tempArr);
        },
        addCertPicOnClick() {
            // let newObj = this.bm_yard_service.genNewImgObj('BmCertification');
            // newObj.tag = "initTag"
            // let tempArr = [];
            // if (this.bm_yard_service.yard.Certifications !== null) {
            //     tempArr = this.bm_yard_service.yard.Certifications;
            // }
            // tempArr.pushObject(newObj);
            // this.set('bm_yard_service.yard.Certifications', tempArr);
            // console.log(this.bm_yard_service.yard.Certifications)
        },
        addYardPicOnClick() {
            // let newObj = this.bm_yard_service.genNewImgObj('BmTagImg');
            // newObj.tag = "initTag"
            // let tempArr = [];
            // if (this.bm_yard_service.yard.Tagimgs !== null) {
            //     tempArr = this.bm_yard_service.yard.Tagimgs;
            // }
            // tempArr.pushObject(newObj);
            // this.set('bm_yard_service.yard.Tagimgs', tempArr)
        },
        deleteCertImg(param) {
            // this.bm_yard_service.yard.Certifications.removeObject(param);
        },
        deleteYardImg(param) {
            // this.bm_yard_service.yard.Tagimgs.removeObject(param);
        }
    },
});
