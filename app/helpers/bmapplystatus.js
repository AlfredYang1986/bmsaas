import { helper } from '@ember/component/helper';

export function bmapplystatus(params/*, hash*/) {
	let status = params[0];
	if (status == 0) {
		return '未处理';
	} else {
		return '已处理';
	}
}

export default helper(bmapplystatus);
