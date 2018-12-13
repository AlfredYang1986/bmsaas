import { helper } from '@ember/component/helper';

export function bmclsClsTimeCreate(params/*, hash*/) {
	let hour = params[0];
	let min = params[1];
	let noon = 'am';
	if (hour > 12) {
		noon = 'pm';
	}
	return hour + ':' + min + noon;
}

export default helper(bmclsClsTimeCreate);
