import { helper } from '@ember/component/helper';

export function bmperioddateformat(params/*, hash*/) {
	let dt = params[0];
	let year = dt.getFullYear();
	let month = dt.getMonth() + 1;
    let day = dt.getDate();
    let hour = dt.getHours();
    let hour_str = '';
    if (hour < 10) {
        hour_str = '0' + hour;
    } else {
        hour_str = hour;
    }
    let min = dt.getMinutes();
    let min_str = '';
    if (min < 10) {
        min_str = '0' + min;
    } else {
        min_str = min;
    }
 
    let weekday = dt.getDay();
    // return month + '/' + day + " (周" + weekday + ") " + hour + ":" + min;
    return year + '-' + month + '-' + day + ' ' + hour_str + ':' + min_str;
}

export default helper(bmperioddateformat);
