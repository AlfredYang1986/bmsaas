import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    age: DS.attr('number'),
    gender: DS.attr('boolean'),
    contact: DS.attr('string'),
    register_date: DS.attr('number')
});
