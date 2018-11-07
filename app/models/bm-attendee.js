import DS from 'ember-data';

export default DS.Model.extend({
    intro: DS.attr('string', { defaultValue: '新来的'}),
    status: DS.attr('string', { defaultValue: 'candidate' }),
    lesson_count: DS.attr('number', { defaultValue: 0}),
    Person: DS.belongsTo('BmPerson', { async: false }),
    Guardians: DS.hasMany('BmGuardian', { async: false }),
});
