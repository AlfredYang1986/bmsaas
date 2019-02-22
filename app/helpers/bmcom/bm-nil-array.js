import { helper } from '@ember/component/helper';

export function bmcomBmNilArray(params/*, hash*/) {
	let arr = params[0];
	return arr instanceof Array && arr.length == 0;
}

export default helper(bmcomBmNilArray);
