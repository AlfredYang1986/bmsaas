import DS from 'ember-data';

export default DS.Model.extend({
    courseTime: DS.attr('number'),
    endDate: DS.attr('number'),
    startDate: DS.attr('number'),
    status: DS.attr('number'),
    room: DS.belongsTo('room'),
    class: DS.belongsTo('class'),
    teacher: DS.belongsTo('teacher'),
});
