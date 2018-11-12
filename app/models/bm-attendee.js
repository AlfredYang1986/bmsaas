import DS from 'ember-data';

export default DS.Model.extend({
    intro: DS.attr('string', { defaultValue: '新来的'}),
    status: DS.attr('string', { defaultValue: 'candidate' }),
    lesson_count: DS.attr('number', { defaultValue: 0}),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    icon: DS.attr('string'),
    gender: DS.attr('number'),
    contact: DS.attr('string'),
    address: DS.attr('string'),
    dob: DS.attr('number',{
        defaultValue() { return new Date().getTime(); }
    }),
    reg_date: DS.attr('date-to-yyyy-mm-dd-hh-mm-ss', {
        defaultValue() { return new Date().getTime(); }
    }),
    // Address: DS.belongsTo('bm-address', { async: false }),
    // Person: DS.belongsTo('BmPerson', { async: false }),
    Guardians: DS.hasMany('BmGuardian', { async: false })
});
