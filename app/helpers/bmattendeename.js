import { helper } from '@ember/component/helper';

export function bmattendeename(params/*, hash*/) {
// debugger
	let item = params[0];
	let lst = item.get('stud');
	let tmp = null;
	if (lst.length > 0) {
		tmp = lst.objectAt(0);
	} 

	if (tmp == null) {
		return '';
	} else {
		return tmp.me.get('name');
	}
}

export default helper(bmattendeename);
