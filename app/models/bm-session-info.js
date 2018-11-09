import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    level: DS.attr('string'),
    Count: DS.attr('number'),
    Length: DS.attr('number'),
    Cat: DS.belongsTo('BmCategory', {async: false}),
});
