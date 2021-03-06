import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string'),
    contact: DS.attr('string'),
    dob: DS.attr('number', { defaultValue: 0}),
    gender: DS.attr('number'),
    icon: DS.attr('string'),
    idCardNo: DS.attr('string'),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    regDate: DS.attr('number', { defaultValue: new Date().getTime()}),
    relationShip: DS.attr('string'),
    wechat: DS.attr('string'),
    school: DS.attr('string'),
    sourceWay: DS.attr('string'),

    lessonCount: DS.attr('number'),
    punchedCount: DS.attr('number'),

    province: DS.attr('string'),
    city: DS.attr('string'),
    district: DS.attr('string'),
    address: DS.attr('string'),

    // applicants: DS.hasMany('applicant'),
    teacher: DS.belongsTo('teacher'),
    guardians: DS.hasMany('guardian'),


    // sessionable: DS.belongsTo('sessionable'),
});
