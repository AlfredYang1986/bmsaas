import { helper } from '@ember/component/helper';

export function bmcomBmNilArray(params/*, hash*/) {
	let arr = params[0];
	return typeof arr == 'array' && arr.length == 0;
}

export default helper(bmcomBmNilArray);
