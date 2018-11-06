import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('BmPerson', { async: false }),
    school: DS.attr('string'),
    guardian: DS.belongsTo('BmGuardian', { async: false }),
    urgent: DS.belongsTo('bmurgent', { async: false }),
});
