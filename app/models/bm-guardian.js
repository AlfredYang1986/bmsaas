import DS from 'ember-data';

export default DS.Model.extend({
    relation_ship: DS.attr('string'),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    icon: DS.attr('string'),
    gender: DS.attr('number'),
    contact: DS.attr('string'),
    dob: DS.attr('number',{
        defaultValue() { return new Date().getTime(); }
    }),
    reg_date: DS.attr('date-to-yyyy-mm-dd-hh-mm-ss', {
        defaultValue() { return new Date().getTime(); }
    }),
    Address: DS.belongsTo('bm-address', {async: false}),
    // person: DS.belongsTo('bm-person', { async: false })
});
