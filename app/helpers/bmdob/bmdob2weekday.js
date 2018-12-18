import { helper } from '@ember/component/helper';

export function bmdobBmdob2weekday(params/*, hash*/) {
  let span = params[0];
	let dob = new Date(span);
  let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  return weekDay[dob.getDay()];
}

export default helper(bmdobBmdob2weekday);
