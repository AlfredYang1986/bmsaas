import { helper } from '@ember/component/helper';

export function bmdobBmdobformat(params/*, hash*/) {
  let span = params[0];
	let dob = new Date(span);

	// return dob.getFullYear() + '-' + (dob.getMonth() + 1) + '-' + dob.getDate();
	return dob.getFullYear() + '-' + (dob.getMonth() + 1 < 10 ? '0' + (dob.getMonth() + 1) : dob.getMonth() + 1) + '-' + (dob.getDate() < 10 ? '0' + dob.getDate() : dob.getDate());
}

export default helper(bmdobBmdobformat);
