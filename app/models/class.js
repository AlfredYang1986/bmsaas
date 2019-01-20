import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string'),
    classTitle: DS.attr('string'),
    courseExpireCount: DS.attr('number', { defaultValue: 0}),
    courseTotalCount: DS.attr('number', { defaultValue: 0}),
    createTime: DS.attr('number'),
    endDate: DS.attr('number', { defaultValue: 0}),
    // reservableId: DS.attr('string'),
    startDate: DS.attr('number', { defaultValue: 0}),
    status: DS.attr('number', { defaultValue: 0}),
    
    yard: DS.belongsTo('yard'),
    sessioninfo: DS.belongsTo('sessioninfo'),
    students: DS.hasMany('student'),
    teachers: DS.hasMany('teacher'),
    units: DS.hasMany('unit'),
    // reservableitem: DS.belongsTo('reservableitem'),
});
