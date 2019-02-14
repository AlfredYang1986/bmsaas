import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    mock_data: service(),
    positionalParams: ['crs_cat', 'crs_sub_cat', 'cat_candi'],
    crs_sub_cat: '',

    actions: {
        catChanged() {
            let sel = document.getElementById('catselected');
            this.set('crs_cat', sel.options[sel.selectedIndex].value.split(this.separator)[0]);
        },
        // subChanged() {
        //     let sel = document.getElementById('subselected');
        //     this.set('crs_sub_cat', sel.options[sel.selectedIndex].value);
        // },
    }
});
