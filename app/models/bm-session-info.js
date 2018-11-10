import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    subtitle: DS.attr('string'),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    level: DS.attr('string'),
    count: DS.attr('number'),
    length: DS.attr('number'),
    description: DS.attr('string'),
    harvest: DS.attr('string'),
    acquisition: DS.attr('string'),
    accompany: DS.attr('number'),
    including: DS.attr('string'),
    carrying: DS.attr('string'),
    notice: DS.attr('string'),
    Cate: DS.belongsTo('BmCategory', {async: false}),
});
