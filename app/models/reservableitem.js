import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string'),
    createTime: DS.attr('number'),
    endDate: DS.attr('number'),
    startDate: DS.attr('number'),
    status: DS.attr('number'),
    sessioninfo: DS.belongsTo('sessioninfo'),
    classes: DS.hasMany('class')
});
