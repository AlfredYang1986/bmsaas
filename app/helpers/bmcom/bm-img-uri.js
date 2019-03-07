import { helper } from '@ember/component/helper';

export function bmcomBmImgUri(params/*, hash*/) {
	let url = params[0]
	let bmOss = params[1]

	if (typeof url == 'string' && url.length > 0) {
		let client = bmOss.get('ossClient');
		return client.signatureUrl(url)
	} else {
		return ""
	}
}

export default helper(bmcomBmImgUri);
