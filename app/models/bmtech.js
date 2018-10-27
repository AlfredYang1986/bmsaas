import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson'),
    address: DS.attr('string'),
    homeland: DS.attr('string'),
    edu: DS.hasMany('bmedu'),
    carhis: DS.hasMany('bmcarhis')
});
