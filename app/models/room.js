import DS from 'ember-data';

export default DS.Model.extend({
    capacity: DS.attr('number', { defaultValue: 100}),
    roomType: DS.attr('number', { defaultValue: 0}),
    title: DS.attr('string', { defaultValue: ""}),

    // courseUnit: DS.belongsTo('course-unit'),
});
