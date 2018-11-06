import DS from 'ember-data';

export default DS.Model.extend({
    status: DS.attr('number'),
    apply_date: DS.attr('date'),
    apply_yard: DS.belongsTo('bmyard', { async: false }),
    apply_course: DS.belongsTo('bmcourseinfo', { async: false }),
    apply_activity: DS.belongsTo('bmactivityinfo', { async: false }),

    attendee: DS.hasMany('BmPerson', { async: false }),
    applyee: DS.belongsTo('BmPerson', { async: false })
});
