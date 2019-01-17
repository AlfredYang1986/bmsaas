import DS from 'ember-data';

export default DS.Model.extend({
    capacity: DS.attr('number'),
    roomType: DS.attr('number'),
    title: DS.attr('string'),
    yardId: DS.attr('string'),

    // courseUnit: DS.belongsTo('course-unit'),
});
