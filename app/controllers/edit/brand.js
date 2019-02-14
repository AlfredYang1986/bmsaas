import Controller from '@ember/controller';
import { debug } from '@ember/debug';
import { A } from '@ember/array'

export default Controller.extend({
    listInputs: A([]),
    cur_idx: 0,
    cateArr: A([{name: '音乐'}, {name: '艺术'}, {name: '运动'}, {name: '科学'}, {name: 'steam'}]),
    cur_cate_id: '',

    tempHonorImgs: A(),
    tempCertImgs: A(),

    actions: {
        cancelBrandClicked() {
            this.store.unloadRecord(this.model.brand);
            this.transitionToRoute("home")
        },
        saveBrand() {
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
        this.model.brand.category.set('title', this.cur_cate_id)
        let cate = this.store.peekRecord("category", this.model.brand.category.get("id"))
        cate.save()
        this.model.brand.set("images", this.tempHonorImgs)
        this.model.brand.get("images").pushObjects(this.tempCertImgs)
        this.model.brand.save().then(()=> {
            this.transitionToRoute("home")
        });
    }
});
