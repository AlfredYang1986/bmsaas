import DS from 'ember-data';

export default DS.Model.extend({
	address: DS.attr('string'),
	brandId: DS.attr('string'),
	city: DS.attr('string'),
	contact: DS.attr('string'),
	createTime: DS.attr('number'),
	district: DS.attr('string'),
	dob: DS.attr('number', { defaultValue: 0 }),
	gender: DS.attr('number'),
	icon: DS.attr('string'),
	idCardNo: DS.attr('string'),
	intro: DS.attr('string'),
	jobTitle: DS.attr('string'),
	jobType: DS.attr('number'),
	major: DS.attr('string'),
	name: DS.attr('string'),
	nativePlace: DS.attr('string'),
	nickname: DS.attr('string'),
	province: DS.attr('string'),
	regDate: DS.attr('number'),
	teachYears: DS.attr('number', { defaultValue: 0 }),
	wechat: DS.attr('string'),

	// sessionable: DS.belongsTo('sessionable'),
	// courseUnit: DS.belongsTo('course-unit'),
});
