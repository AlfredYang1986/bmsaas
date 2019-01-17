import DS from 'ember-data';

export default DS.Model.extend({
    accompany: DS.attr('number'),
    acquisition: DS.attr(),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    brandId: DS.attr('string'),
    carrying: DS.attr(),
    count: DS.attr('number'),
    cover: DS.attr('string'),
    description: DS.attr('string'),
    harvest: DS.attr('string'),
    inc: DS.attr(),
    length: DS.attr('number'),
    level: DS.attr('string'),
    notice: DS.attr('string'),
    playChildren: DS.attr('string'),
    status: DS.attr('number'),
    subtitle: DS.attr('string'),
    title: DS.attr('string'),
    cate: DS.belongsTo('category'),
    images: DS.hasMany('image'),

    // reservableItem: DS.belongsTo('reservable-item'),
    // sessionable: DS.belongsTo('sessionable'),
});
