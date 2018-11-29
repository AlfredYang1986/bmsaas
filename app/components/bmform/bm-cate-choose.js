import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    mock_data: service(),
    positionalParams: ['crs_cat', 'crs_sub_cat'],
    crs_cat: '',
    crs_sub_cat: '',

    // cat_candi: computed('crs_cat', function(){
    //     return this.mock_data.queryCateCandidate();
    // }),

    sub_candi: computed('crs_cat', function(){
        return this.mock_data.querySubCatCondidate(this.crs_cat);
    }),

    actions: {
        catChanged() {
            let sel = document.getElementById('catselected');
            this.set('crs_cat', sel.options[sel.selectedIndex].value);
        },
        subChanged() {
            let sel = document.getElementById('subselected');
            this.set('crs_sub_cat', sel.options[sel.selectedIndex].value);
        },
    }
});
