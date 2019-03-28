import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string', { defaultValue: localStorage.getItem("brandid")}),
    sessioninfoId: DS.attr('string'),
    reservableId: DS.attr('string'),
    title: DS.attr('string'),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    standardCourseCount: DS.attr('number'),
    standardPrice: DS.attr('number'),
    standardPriceUnit: DS.attr('string'),
    preferentialPrice: DS.attr('number'),
    signedPrice: DS.attr('number'),
    archive: DS.attr('number'),
    student: DS.belongsTo('student'),
});
