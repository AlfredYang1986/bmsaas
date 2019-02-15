import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['session', 'cur_cate'],
    cat_exp: A([{name: '数理与逻辑'}, {name: '语言与人文'}]),
    cat_course: A([{name: '数理与逻辑'}, {name: '语言与人文'}]),
    cat_actv: A([{name: '展览'}, {name: '赛事'}, {name: '亲子'}, {name: '演出'}, {name: '讲座'}, {name: '户外活动'}, {name: '市集'}, {name: '游乐场'}, {name: '其他'}]),
    cur_cate_id: '',
});
