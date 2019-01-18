import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string'),
    contact: DS.attr('string'),
    dob: DS.attr('number'),
    gender: DS.attr('number'),
    icon: DS.attr('string'),
    idCardNo: DS.attr('string'),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    regDate: DS.attr('number'),
    relationShip: DS.attr('string'),
    wechat: DS.attr('string'),
    school: DS.attr('string'),
    sourceWay: DS.attr('string'),

    province: DS.attr('string'),
    city: DS.attr('string'),
    district: DS.attr('string'),
    address: DS.attr('string'),

    // applicants: DS.hasMany('applicant'),
    guardians: DS.hasMany('guardian'),

    // sessionable: DS.belongsTo('sessionable'),
});
