import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    bm_error_service: service(),
    isPushing: false,
    current_idx: 0,
    changeFlag: false,
    tempCertImgs: A(),
    tempYardImgs: A(),

    provinces: A(['北京']),
    citys: A(['北京市']),
    areas: A(["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]),

    yardCandidate: A(['室内', '室外', '室内 + 室外']),
    surroundings: A(['写字楼', '社区', '购物中心', '学校', '其它']),
    facilities: A(['实时监控', '防摔地板', '空气净化器', 'Wi-Fi', '门禁', '安全护栏', '新风系统', '停车场', '急救包', '安全插座', '加湿器', '电梯', '安全桌脚']),
    tagsCandi: A(['阅读区', '教学区', '家长休息区', '生活区', '寄存区', '户外活动区', '室内活动区']),

    actions: {
        cancelYardBtnClicked() {
            this.model.yard.unloadRecord();
            this.transitionToRoute("detail.yard")
        },
        saveYardBtnClicked() {
            let flag1 = false;
            let flag2 = false;
            let flag1Count = 0;
            let flag2Count = 0;
            let doneFlag = false;
            if(this.tempYardImgs.length === 0) {
                flag1 = true;
            }
            if(this.tempCertImgs.length === 0) {
                flag2 = true;
            }
            if(this.tempYardImgs.length === 0 && this.tempCertImgs.length === 0) {
                this.saveYard();
            }
            this.tempYardImgs.forEach((data, index, arr) => {
                data.save().then(() => {
                    flag1Count++
                    if(flag1Count === arr.length) {
                        flag1 = true;
                    }
                    if(flag1 && flag2 && !doneFlag) {
                        doneFlag = true;
                        this.saveYard();
                    }
                }, error => {
                    this.bm_error_service.handleError(error)
                });
            })
            this.tempCertImgs.forEach((data, index, arr) => {
                data.save().then(() => {
                    flag2Count++
                    if(flag2Count === arr.length) {
                        flag2 = true;
                    }
                    if(flag1 && flag2 && !doneFlag) {
                        doneFlag = true;
                        this.saveYard();
                    }
                }, error => {
                    this.bm_error_service.handleError(error)
                });
            })
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
        addYardPicOnClick() {
            let tempYardImg = this.store.createRecord("image", {"flag": 0})
            this.tempYardImgs.pushObject(tempYardImg)
        },
        addCertPicOnClick() {
            let tempCertImg = this.store.createRecord("image", {"flag": 2})
            this.tempCertImgs.pushObject(tempCertImg)
        },
        deleteYardImg(param) {
            this.tempYardImgs.removeObject(param);
        },
        deleteCertImg(param) {
            this.tempCertImgs.removeObject(param);
        },
    },

    saveYard() {
        this.model.yard.set("images", this.tempYardImgs)
        this.model.yard.get("images").pushObjects(this.tempCertImgs)
        // let that = this;
        this.model.yard.save().then(() => {
            this.transitionToRoute("detail.yard")
        }, error => {
            this.bm_error_service.handleError(error)
        });
        // let that = this;
        // let onSuccess = function() {
        //     that.transitionToRoute("detail.yard");
        // }
        // let onFail = function() {}
        // this.model.yard.save().then(onSuccess, onFail);

    }
});
