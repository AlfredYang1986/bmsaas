import Component from '@ember/component';
import { computed} from '@ember/object';

export default Component.extend({
    positionalParams: ['select_idx', 'index', 'start_index', 'describe', 'guide'],
    tagName: 'span',
    selected: computed('select_idx', function(){
        return this.select_idx == this.index + this.start_index;
    }),
    classNameBindings: [
        'selected:ib_tab_btn_active',
    ],
    click() {
        this.onItemClicked(this.index, this.start_index);
    },
});
