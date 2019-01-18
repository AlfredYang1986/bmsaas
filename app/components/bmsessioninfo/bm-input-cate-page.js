import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    // mock_data: service(),
    positionalParams: ['session'],
    crs_cat: '',
    cat_exp: computed('crs_cat', function(){
        // return this.mock_data.queryCateCandidateExp();
        return [];
    }),
    cat_actv: computed('crs_cat', function(){
        // return this.mock_data.queryCateCandidateActv();
        return [];
    }),
});
