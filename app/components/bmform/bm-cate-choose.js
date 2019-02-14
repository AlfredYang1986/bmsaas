import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    mock_data: service(),
    positionalParams: ['crs_cat', 'crs_sub_cat', 'cat_candi'],
    // crs_cat: '',
    crs_sub_cat: '',

    // cat_candi: computed('crs_cat', function(){
    //     return this.mock_data.queryCateCandidate();
    // }),
    // cat_candi: ['数理与逻辑', '语言与人文'],
    // sub_candi: computed('crs_cat', function(){
    //     return this.mock_data.querySubCatCondidate(this.crs_cat);
    // }),

    actions: {
        catChanged() {
            let sel = document.getElementById('catselected');
            this.set('sel', sel)
                if(this.type == "number") {
                    this.set('crs_cat', parseInt(sel.options[sel.selectedIndex].value));
                } else if(this.type == "id") {
                    this.set('crs_cat', sel.options[sel.selectedIndex].value);
                } else {
                    this.set('crs_cat', sel.options[sel.selectedIndex].value.split(this.separator)[0]);
                    this.set('sessionId', sel.options[sel.selectedIndex].value.split(this.separator)[1]);
                }
            // let sel = document.getElementById('catselected');
            // this.set('crs_cat', sel.options[sel.selectedIndex].value);
        },
        subChanged() {
            let sel = document.getElementById('subselected');
            this.set('crs_sub_cat', sel.options[sel.selectedIndex].value);
        },
    }
});
