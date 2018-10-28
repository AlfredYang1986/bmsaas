import { helper } from '@ember/component/helper';

export function bmperioddateformat(params/*, hash*/) {
	let dt = params[0];
	let month = dt.getMonth() + 1;
    let day = dt.getDate();
    let hour = dt.getHours();
    let min = dt.getMinutes();
    let weekday = dt.getDay();
    return month + '/' + day + " (周" + weekday + ") " + hour + ":" + min;
}

export default helper(bmperioddateformat);
