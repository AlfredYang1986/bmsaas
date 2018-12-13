import Component from '@ember/component';
import { computed} from '@ember/object';

export default Component.extend({
    positionalParams: ['select_idx', 'index', 'title'],
    tagName: 'span',
    radio: 'https://bm-web.oss-cn-beijing.aliyuncs.com/Radio-btn_Resting.png',
    radioSelected: 'https://bm-web.oss-cn-beijing.aliyuncs.com/Radio-btn_Selected.png',
    selected: computed('select_idx', function(){
        return this.select_idx == this.index;
    }),
    classNameBindings: [
        'selected:ib_radio_active'
    ],
    click() {
        this.onItemClicked(this.index);
    },
});
