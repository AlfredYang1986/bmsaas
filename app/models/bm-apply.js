import DS from 'ember-data';

export default DS.Model.extend({
    applyFrom: DS.attr('string'),
    apply_time: DS.attr('number'),
    applyeeId: DS.attr('string'),
    brandId: DS.attr('string'),
    contact: DS.attr('string'),
    courseName: DS.attr('string'),
    courseType: DS.attr('number'),
    create_time: DS.attr('number'),
    except_time: DS.attr('number'),
    reservableId: DS.attr('string'),
    status: DS.attr('number'),
    Applicant: DS.belongsTo('bm-applicant', {async: false}),
    Kids: DS.hasMany('bm-kid', {async: false}),
});
