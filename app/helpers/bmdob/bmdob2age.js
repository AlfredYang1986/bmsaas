import { helper } from '@ember/component/helper';

export function bmdobBmdob2age(params/*, hash*/) {
	let span = params[0];
	let dn = new Date();
	let dob = new Date(span);

	let age = dn.getFullYear() - dob.getFullYear();
	return age;
}

export default helper(bmdobBmdob2age);
