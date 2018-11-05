import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson'),
    urg: DS.belongsTo('bmstud'),
    rs: DS.attr('string'),
});
