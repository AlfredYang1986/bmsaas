import { helper } from '@ember/component/helper';

export function bmapplycontentname(params/*, hash*/) {

	let course = params[0];
	let activity = params[1];
	
	if (typeof course.get('id') != 'undefined') {
		return course.get('name');
	} else if (typeof activity.get('id') != 'undefined') {
		return activity.get('name');
	} else {
		return '';
	}
}

export default helper(bmapplycontentname);
