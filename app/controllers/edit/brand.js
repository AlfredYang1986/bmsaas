import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';
import { A } from '@ember/array'

export default Controller.extend({
    bm_brand_service: service(),
    listInputs: A([]),
    cur_idx: 0,
    cateArr: A([{name: '音樂'}, {name: '藝術'}, {name: '運動'}, {name: '科學'}, {name: 'steam'}]),
    actions: {
        saveBrand() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('home');
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_brand_service.saveUpdate(callback); 
        },
        selectedCate() {
            let sel = document.getElementById("cateSelect");
            if (sel.selectedIndex == "") {
                this.set('bm_brand_service.brand.Cate.title', "");
            } else {
                this.set('bm_brand_service.brand.Cate.title', sel.options[sel.selectedIndex].value);
            }
        },
        addHonorPicOnClick() {
            let newObj = this.bm_brand_service.genNewImgObj('BmHonor');
            newObj.tag = "initTag"
            let tempArr = [];
            if (this.bm_brand_service.brand.Honors !== null) {
                tempArr = this.bm_brand_service.brand.Honors;
            }
            tempArr.pushObject(newObj);
            this.set('bm_brand_service.brand.Honors', tempArr)
        },
        deleteHonorImg(param) {
            this.bm_brand_service.brand.Honors.removeObject(param);
        },
        addCertPicOnClick() {
            let newObj = this.bm_brand_service.genNewImgObj('BmCertification');
            newObj.tag = "initTag"
            let tempArr = [];
            if (this.bm_brand_service.brand.Certifications !== null) {
                tempArr = this.bm_brand_service.brand.Certifications;
            }
            tempArr.pushObject(newObj);
            this.set('bm_brand_service.brand.Certifications', tempArr)
        },
        deleteCertImg(param) {
            this.bm_brand_service.brand.Certifications.removeObject(param);
        },
    },
});
