import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    level: DS.attr('string'),
    count: DS.attr('number'),
    length: DS.attr('number'),
    category: DS.belongsTo('bmcat'),
    target: DS.attr('string'),
    planning: DS.attr('string'),
    content: DS.attr('string'),
    imgs: DS.hasMany('bmtagimg'),
    tags: DS.attr()
});
