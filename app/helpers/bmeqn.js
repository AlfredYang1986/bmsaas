import { helper } from '@ember/component/helper';

export function bmeqn(params/*, hash*/) {
	let lhs = params[0];
	let rhs = params[1];

	return lhs != rhs;
}

export default helper(bmeqn);
