import DS from 'ember-data';

export default DS.Model.extend({
    courseTime: DS.attr('number'),
    endDate: DS.attr('number'),
    sessionableId: DS.attr('string'),
    startDate: DS.attr('number'),
    status: DS.attr('number'),
    room: DS.belongsTo('room'),
    sessionable: DS.belongsTo('sessionable'),
    teacher: DS.belongsTo('teacher'),
});
