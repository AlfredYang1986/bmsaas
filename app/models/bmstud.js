import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson', { async: false }),
    school: DS.attr('string'),

    guardian: DS.belongsTo('bmguardian', { async: false }),
    urgent: DS.belongsTo('bmurgent', { async: false }),
});
