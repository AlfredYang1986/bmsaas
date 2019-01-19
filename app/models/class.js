import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string'),
    classTitle: DS.attr('string'),
    courseExpireCount: DS.attr('number'),
    courseTotalCount: DS.attr('number'),
    createTime: DS.attr('number'),
    endDate: DS.attr('number'),
    // reservableId: DS.attr('string'),
    startDate: DS.attr('number'),
    status: DS.attr('number'),
    
    yard: DS.belongsTo('yard'),
    sessioninfo: DS.belongsTo('sessioninfo'),
    students: DS.hasMany('student'),
    teachers: DS.hasMany('teacher'),
    units: DS.hasMany('unit'),
    // reservableitem: DS.belongsTo('reservableitem'),
});
