import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    icon: DS.attr('string'),
    age: DS.attr('number'),
    gender: DS.attr('boolean'),
    contact: DS.attr('string'),
    wechat: DS.attr('string'),
    register_date: DS.attr('Date'),
    dob: DS.belongsTo('date-format'),
});
