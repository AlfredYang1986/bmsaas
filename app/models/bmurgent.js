import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('BmPerson'),
    urg: DS.belongsTo('bmstud'),
    rs: DS.attr('string'),
});
