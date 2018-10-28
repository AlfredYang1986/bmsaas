import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson'),
    guad: DS.belongsTo('bmstud'),
    rs: DS.attr('string'),
    address: DS.attr('string')
});
