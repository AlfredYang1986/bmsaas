import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: '',
    years: Array.from(new Array(9), (val,index) => (index + 2010).toString()),
    months: Array.from(new Array(12),(val,index)=> { 
        let m = (index + 1).toString();
        if (m < 10) return "0" + m;
        return m;
    }),
    days:  Array.from(new Array(31),(val,index)=> {
        let d = (index + 1).toString();
        if (d < 10) return "0" + d;
        return d;
    }),


    selectedYear: computed('data', function() {
        if (this.get('data')) {
            return this.get('data').split('-')[0];
        }
    }),
    selectedMonth: computed('data', function() {
        if (this.get('data')) {
            return this.get('data').split('-')[1];
        }
        
    }),
    selectedDay: computed('data', function() {
        if (this.get('data')) {
            return this.get('data').split('-')[2];
        }
    }),

    actions: {
        changeYear(value) {
            let source = this.get('data').split("-")
            let now = value + "-" + source[1] + "-" + source[2]
            this.set('data', now)
        },
        changeMonth(value) {
            let source = this.get('data').split("-")
            let now = source[0] + "-" + value + "-" + source[2]
            this.set('data', now)
        },
        changeDay(value) {
            let source = this.get('data').split("-")
            let now = source[0] + "-" + source[1] + "-" + value
            this.set('data', now)
        }
    }
});
