import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    cover: DS.attr('string'),
    address: DS.attr('string'),
    description: DS.attr('string'),
    around: DS.attr('string'),
    ardes: DS.attr('string'),
    imgs: DS.hasMany('bmtagimg'),
    facilities: DS.attr(),
    awards: DS.hasMany('bmtagimg')
});
