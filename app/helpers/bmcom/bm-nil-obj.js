import { helper } from '@ember/component/helper';

export function bmcomBmNilObj(params/*, hash*/) {
	let tmp = params[0];
	return tmp == null;
}

export default helper(bmcomBmNilObj);
