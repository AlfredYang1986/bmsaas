import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['current_date', 'display_date'],
    tagName: 'th',
    classNames: ['bm-day-header', 'bm-widget-header'],
    current_date: new Date().getTime(),
    display_str: computed('display_date', function(){
        let dt = new Date();
        dt.setTime(this.display_date);
        let day = dt.getDay();
        let month = dt.getMonth() + 1;
        let date = dt.getDate();

        let result = '';
        switch (day) {
            case 1:
                result = 'Mon';
                break;
            case 2:
                result = 'Tue';
                break;
            case 3:
                result = 'Wed';
                break;
            case 4:
                result = 'Thu';
                break;
            case 5:
                result = 'Fri';
                break;
            case 6:
                result = 'Sat';
                break;
            case 0:
                result = 'Sun';
                break;
        }

        return result + ' ' + month + '/' + date;
    })
});
