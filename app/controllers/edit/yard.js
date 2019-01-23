import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
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

            let tempCertImg = this.store.createRecord("image", {"flag": 2})
            this.tempCertImgs.pushObject(tempCertImg)
            console.log(tempCertImg)
            console.log(this.tempCertImgs)
            
            // tempCertImgs()


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

    saveYard() {
        this.model.yard.set("images", this.tempYardImgs)
        this.model.yard.get("images").pushObjects(this.tempCertImgs)
        console.log(this.model.yard)
        this.model.yard.save().then(this.transitionToRoute("detail.yard"));
    }
});
