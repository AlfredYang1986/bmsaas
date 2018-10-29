import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['data', 'needYear', 'needday', 'needhours'],
    needYear: true,
    needday: true,
    needhours: false,
    tagName: '',
    years: Array.from(new Array(9), (val,index) => (index + 2010).toString()),
    months: Array.from(new Array(12),(val,index)=> { 
        let m = (index + 1).toString();
        if (m < 10) return "0" + m;
        return m;
    }),
    days: computed('selectedYear', 'selectedMonth', function(){
        let tmp_b = [1, 3, 5, 7, 8, 10, 12];
        let tmp_s = [4, 6, 9, 11];
        let tmp_y = 2;
        let sm = parseInt(this.selectedMonth);
        let sy = parseInt(this.selectedYear);
        let base = 31;
        if (tmp_s.includes(sm)) {
            base = 30;
        } else if (tmp_y == sm) {
            if (this.isYeapYear(sy)) {
                base = 29;
            } else {
                base = 28;
            }
        }
        return Array.from(new Array(base),
                    (val,index)=> {
                        let d = (index + 1).toString();
                        if (d < 10) return "0" + d;
                        return d;
                    })
    }),

    isYeapYear(y) {
        return (y % 100 == 0 && y % 400 == 0) || y % 4 == 0;
    },

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
