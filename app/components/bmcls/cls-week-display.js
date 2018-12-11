import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['start_date', 'end_date'],
    classNames: [''],
    tagName: 'span',
    display_date: computed('start_date', 'end_date', function(){
        let sdt = new Date(this.start_date);
        let edt = new Date(this.end_date);

        let sm = this.getDateMonth(sdt);
        let em = this.getDateMonth(edt);

        let sd = this.getDateDate(sdt);
        let ed = this.getDateDate(edt);

        let sy = this.getDateYear(sdt);
        let ey = this.getDateYear(edt);

        if (sm == em) {
            return sm + " " + sd + "   ~    " + ed + " " + sy;
        } else {
            return sm + " " + sd + " " + sy + "   ~    " + em + " " + ed + " " + ey; 
        }
    }),

    getDateMonth(dt) {
        return dt.getMonth() + 1;
    },

    getDateDate(dt) {
        return dt.getDate();
    },

    getDateYear(dt) {
        return dt.getFullYear();
    }
});
