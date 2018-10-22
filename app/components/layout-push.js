import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
    positionalParams: ['direction', 'split', 'mid'],
    rowpush: computed('direction', function() {
        return this.direction == 'row' && !this.rowsplit && !this.rowmid;
    }),
    rowsplit: computed('direction', 'split', function() {
        return this.direction == 'row' && this.split == true;
    }),
    rowmid: computed('direction', 'mid', function() {
        return this.direction == 'row' &&  this.mid == true;
    }),
    colpush: computed('direction', function() {
        return this.direction == 'col' && !this.colsplit && !this.colmid;
    }),
    colsplit: computed('direction', 'split', function() {
        return this.direction == 'col' && this.split == true;
    }),
    colmid: computed('direction', 'mid', function() {
        return this.direction == 'col' &&  this.mid == true;
    }),
    classNameBindings: [
                        'colpush:v_push',
                        'colsplit:v_end',
                        'colmid:v_mid',
                        'rowpush:line_container',
                        'rowsplit:line_container_split',
                        'rowmid:line_container_mid',
                       ],
});
