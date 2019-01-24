import Controller from '@ember/controller';
import { debug } from '@ember/debug';
import { A } from '@ember/array'

export default Controller.extend({
    listInputs: A([]),
    cur_idx: 0,
    cateArr: A([{name: '音樂'}, {name: '藝術'}, {name: '運動'}, {name: '科學'}, {name: 'steam'}]),

    tempHonorImgs: A(),
    tempCertImgs: A(),

    actions: {
        cancelBrandClicked() {
            this.store.unloadRecord(this.model.brand);
            this.transitionToRoute("home")
        },
        saveBrand() {
            // this.model.brand.save();
            // this.transitionToRoute("home")
            let flag1 = false;
            let flag2 = false;
            let flag1Count = 0;
            let flag2Count = 0;
            let doneFlag = false;         
            if(this.tempHonorImgs.length === 0) {
                flag1 = true;
            }
            if(this.tempCertImgs.length === 0) {
                flag2 = true;
            }
            if(this.tempHonorImgs.length === 0 && this.tempCertImgs.length === 0) {
                this.saveBrand();
            }
            this.tempHonorImgs.forEach((data, index, arr) => {
                data.save().then(() => {
                    flag1Count++
                    if(flag1Count === arr.length) {
                        flag1 = true;
                    }
                    if(flag1 && flag2 && !doneFlag) {
                        doneFlag = true;
                        this.saveBrand();
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
                        this.saveBrand();
                    }
                });
            })
        },
        selectedCate() {
            let sel = document.getElementById("cateSelect");
            if (sel.selectedIndex == "") {
                // this.set('bm_brand_service.brand.Cate.title', "");
            } else {
                // this.set('bm_brand_service.brand.Cate.title', sel.options[sel.selectedIndex].value);
            }
        },
        addHonorPicOnClick() {
            let tempHonorImg = this.store.createRecord("image", {"flag": 1})
            this.tempHonorImgs.pushObject(tempHonorImg)
        },
        addCertPicOnClick() {
            let tempCertImg = this.store.createRecord("image", {"flag": 2})
            this.tempCertImgs.pushObject(tempCertImg)
        },
        deleteHonorImg(param) {
            this.tempHonorImgs.removeObject(param);
        },
        deleteCertImg(param) {
            this.tempCertImgs.removeObject(param);
        },
    },
    saveBrand() {
        this.model.brand.set("images", this.tempHonorImgs)
        this.model.brand.get("images").pushObjects(this.tempCertImgs)
        this.model.brand.save().then(this.transitionToRoute("home"));
    }
});
