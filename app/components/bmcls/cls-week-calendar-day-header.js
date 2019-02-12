import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['current_date', 'display_date'],
    tagName: 'th',
    classNames: ['bm-day-header', 'bm-widget-header'],
    current_date: new Date().getTime(),
    // display_str: computed('display_date', function(){
    //     let dt = new Date();
    //     dt.setTime(this.display_date);
    //     let day = dt.getDay();
    //     let month = dt.getMonth() + 1;
    //     let date = dt.getDate();

    //     let result = '';
    //     switch (day) {
    //         case 1:
    //             result = 'Mon';
    //             break;
    //         case 2:
    //             result = 'Tue';
    //             break;
    //         case 3:
    //             result = 'Wed';
    //             break;
    //         case 4:
    //             result = 'Thu';
    //             break;
    //         case 5:
    //             result = 'Fri';
    //             break;
    //         case 6:
    //             result = 'Sat';
    //             break;
    //         case 0:
    //             result = 'Sun';
    //             break;
    //     }

    //     return result + ' ' + month + '/' + date;
    // }),
    display_day: computed('display_date', function(){
        let dt = new Date();
        dt.setTime(this.display_date);
        let month = dt.getMonth() + 1;
        let date = dt.getDate();
        return month + '/' + date;
    }),

    display_week_day: computed('display_date', function(){
        let dt = new Date();
        dt.setTime(this.display_date);
        let day = dt.getDay();
        let result = '';
        switch (day) {
            case 1:
                result = '一';
                break;
            case 2:
                result = '二';
                break;
            case 3:
                result = '三';
                break;
            case 4:
                result = '四';
                break;
            case 5:
                result = '五';
                break;
            case 6:
                result = '六';
                break;
            case 0:
                result = '日';
                break;
        }

        return result;
    })
});
