import Component from '@ember/component';
import { computed} from '@ember/object';

export default Component.extend({
    positionalParams: ['cur_page_idx', 'select_idx'],
    cur_page_idx: 0,
    active: '',
    selected: computed('select_idx', function(){
        return this.select_idx == this.cur_page_idx;
    }),
    classNameBindings: [
        'selected:cur_page_active'
    ],
    actions: {
        itemClicked() {
            debugger
            this.set('select_idx', this.cur_page_idx)
            console.log("222s");
        }
    }
});
