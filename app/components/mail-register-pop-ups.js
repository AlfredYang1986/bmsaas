import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女', '未知']),
    relaChecked: A(['父亲', '母亲', '未知']),
    sex: computed('sex_idx', function() {
        debugger
    }),
    rela: computed('rela_idx', function() {
        debugger
    }),
    origin: ['学员转介绍', '电话推广', '小程序', '线下活动推广', '其他'],

});
