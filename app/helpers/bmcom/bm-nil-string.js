import { helper } from '@ember/component/helper';

export function bmcomBmNilString(params/*, hash*/) {
	let tmp = params[0];
	return typeof tmp == 'string' && tmp.length == 0;
}

export default helper(bmcomBmNilString);
