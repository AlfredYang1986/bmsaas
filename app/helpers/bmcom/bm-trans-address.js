import { helper } from '@ember/component/helper';

export function bmcomBmTransAddress(params/*, hash*/) {
	let province = '';
	let city = '';
	let district = '';
	let address = '';
	if (params.length == undefined) {
		province = params.province;
		city = params.city;
		district = params.district;
		address = params.address;
	} else {
		if (params[0] != null) {
			province = params[0].province;
			city = params[0].city;
			district = params[0].district;
			address = params[0].address;
		}
	}

	if (province == "北京" || province == "上海" || province == "天津" || province == "重庆") {
		province = "";
	}

	return province + city + district + address;
}

export default helper(bmcomBmTransAddress);
