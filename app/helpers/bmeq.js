import { helper } from '@ember/component/helper';

export function bmeq(params/*, hash*/) {
	let lhs = params[0];
	let rhs = params[1];
	return lhs == rhs;
}

export default helper(bmeq);
