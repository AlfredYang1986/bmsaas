import DS from 'ember-data';

export default DS.Model.extend({
    applyFrom: DS.attr('string'),
    applyTime: DS.attr('number'),
    applicantId: DS.attr('string'),
    brandId: DS.attr('string'),
    contact: DS.attr('string'),
    courseName: DS.attr('string'),
    courseType: DS.attr('number'),
    createTime: DS.attr('number'),
    exceptTime: DS.attr('number'),
    reservableId: DS.attr('string'),
    status: DS.attr('number'),
    applicant: DS.belongsTo('applicant'),
    kids: DS.hasMany('kid')
});
