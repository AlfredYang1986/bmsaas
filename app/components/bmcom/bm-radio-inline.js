import Component from '@ember/component';
import { A } from '@ember/array';
export default Component.extend({
    positionalParams: ['cur_idx', 'titles', 'judge'],
    cur_idx: 0,
    judge: null,
    titles: A([]),
    actions: {
        itemClicked(idx) {
            this.set('cur_idx', idx);
        }
    },
});
