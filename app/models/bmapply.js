import DS from 'ember-data';

export default DS.Model.extend({
    status: DS.attr('number'),
    apply_date: DS.attr('date'),
    apply_yard: DS.belongsTo('bmyard'),
    apply_course: DS.belongsTo('bmcourseinfo'),
    apply_activity: DS.belongsTo('bmactivityinfo'),

    dispatch_yard: DS.belongsTo('bmyard'),
    dispatch_course: DS.belongsTo('bmcourseinfo'),
    dispatch_activity: DS.belongsTo('bmactivityinfo'),

    attendee: DS.hasMany('bmperson'),
    applyee: DS.belongsTo('bmperson')
});
