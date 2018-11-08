import { helper } from '@ember/component/helper';

export function bmdobBmdobformat(params/*, hash*/) {
  let span = params[0];
	let dob = new Date(span);

	return dob.getFullYear() + '-' + (dob.getMonth() + 1) + '-' + dob.getDate();
}

export default helper(bmdobBmdobformat);
