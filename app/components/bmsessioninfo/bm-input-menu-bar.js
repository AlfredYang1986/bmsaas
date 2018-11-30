import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['cur_page_idx', 'describe', 'guide'],
    cur_page_idx: 0,
    describe: A([]),
    guide: A([]),
    actions: {
        itemClicked(idx) {
            this.set('cur_page_idx', idx);
        }
    },
});
