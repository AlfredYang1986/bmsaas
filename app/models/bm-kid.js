import DS from 'ember-data';

export default DS.Model.extend({
    dob: DS.attr('number'),
    gender: DS.attr('number'),
    guardian_role: DS.attr('string'),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
});
