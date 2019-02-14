import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    // mock_data: service(),
    positionalParams: ['session'],
    crs_cat: '',
    cat_exp: A(['数理与逻辑', '语言与人文']),
    cat_actv: A(['展览', '赛事', '亲子', '演出', '讲座', '户外活动', '市集', '游乐场其他'])
    // cat_exp: computed('crs_cat', function(){
    //     // return this.mock_data.queryCateCandidateExp();
    //     return [];
    // }),
    // cat_actv: computed('crs_cat', function(){
    //     // return this.mock_data.queryCateCandidateActv();
    //     return [];
    // }),
});
