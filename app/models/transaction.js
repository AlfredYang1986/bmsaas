import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string', { defaultValue: localStorage.getItem("brandid")}),
    orderId: DS.attr('string'),
    orderTime: DS.attr('number'),
    createTime: DS.attr('number'),
    orderWay: DS.attr('string'),
    moneyReceivable: DS.attr('number'),
    moneyReceived: DS.attr('number'),
    moneyUnit: DS.attr('string'),
    payment: DS.attr('string'),
    remark: DS.attr('string'),

    attachables: DS.hasMany('attachable'),
    applicant: DS.belongsTo('applicant'),
    teacher: DS.belongsTo('teacher'),
});
