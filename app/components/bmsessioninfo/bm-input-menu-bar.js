import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['cur_page_idx', 'cur_page_idxs', 'describe', 'guide'],
    cur_page_idx: 0,
    cur_page_idxs: 5,
    start_index: 5,
    describe: A([]),
    guide: A([]),
    actions: {
        itemClicked(idx, start_index) {
            idx = idx + start_index;
            this.set('cur_page_idx', idx);
        },
    },
});
