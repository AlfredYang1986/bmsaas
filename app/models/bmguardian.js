import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson'),
    rs: DS.belongsTo('string'),
    address: DS.belongsTo('string')
});
