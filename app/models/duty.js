import DS from 'ember-data';

export default DS.Model.extend({
    teacherDuty: DS.attr('string'),

    teacher: DS.belongsTo('teacher'),
});
