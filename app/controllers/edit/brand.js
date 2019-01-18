import Controller from '@ember/controller';
import { debug } from '@ember/debug';
import { A } from '@ember/array'

export default Controller.extend({
    listInputs: A([]),
    cur_idx: 0,
    cateArr: A([{name: '音樂'}, {name: '藝術'}, {name: '運動'}, {name: '科學'}, {name: 'steam'}]),
    actions: {
        saveBrand() {

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
            // let newObj = this.bm_brand_service.genNewImgObj('BmHonor');
            // newObj.tag = "initTag"
            // let tempArr = [];
            // if (this.bm_brand_service.brand.Honors !== null) {
            //     tempArr = this.bm_brand_service.brand.Honors;
            // }
            // tempArr.pushObject(newObj);
            // this.set('bm_brand_service.brand.Honors', tempArr)
        },
        deleteHonorImg(param) {
            // this.bm_brand_service.brand.Honors.removeObject(param);
        },
        addCertPicOnClick() {
            // let newObj = this.bm_brand_service.genNewImgObj('BmCertification');
            // newObj.tag = "initTag"
            // let tempArr = [];
            // if (this.bm_brand_service.brand.Certifications !== null) {
            //     tempArr = this.bm_brand_service.brand.Certifications;
            // }
            // tempArr.pushObject(newObj);
            // this.set('bm_brand_service.brand.Certifications', tempArr)
        },
        deleteCertImg(param) {
            // this.bm_brand_service.brand.Certifications.removeObject(param);
        },
    },
});
