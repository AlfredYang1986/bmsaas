import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string', { defaultValue: localStorage.getItem("brandid")}),
    createTime: DS.attr('number', { defaultValue: -1}),
    endDate: DS.attr('number', { defaultValue: 1}),
    startDate: DS.attr('number', { defaultValue: 1}),
    status: DS.attr('number'),
    sessioninfo: DS.belongsTo('sessioninfo'),
    classes: DS.hasMany('class')
});
