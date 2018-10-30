import { helper } from '@ember/component/helper';

export function bmgetyardimageurl(params, { namedArgs }/*, hash*/) {
	let imgArr = params[0]
	for (var i = 0; i < imgArr.length; i++) {
			if (imgArr.objectAt(i).position == namedArgs) {
					return imgArr.objectAt(i).img_src;
			} else {
					return '../images/yard_02.jpg';
			}
	}
}

export default helper(bmgetyardimageurl);
