import DS from 'ember-data';

export default DS.Model.extend({
    cat: DS.attr('string'),
    name: DS.attr('string'),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    length: DS.attr('number'),
    description: DS.attr('string'),
    planning: DS.attr('string'),
    ccontent: DS.attr('string'),
    gains: DS.attr(),
    cover: DS.attr('string'),
    imgs: DS.hasMany('bmtagimg'),
    offered: DS.attr(),
    needed: DS.attr(),
    notice: DS.attr('string'),
    fee: DS.belongsTo('bmprice'),
    periods: DS.hasMany('bmactperiod')
});
