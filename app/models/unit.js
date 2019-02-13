import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string', { defaultValue: localStorage.getItem("brandid")}),
    courseTime: DS.attr('number', { defaultValue: 1}),
    endDate: DS.attr('number'),
    startDate: DS.attr('number'),
    status: DS.attr('number', { defaultValue: 0}),

    room: DS.belongsTo('room'),
    class: DS.belongsTo('class'), 
    teacher: DS.belongsTo('teacher'),
});
