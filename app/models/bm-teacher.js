import DS from 'ember-data';

export default DS.Model.extend({

    intro: DS.attr('string'),
    brandId: DS.attr('string'),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    icon: DS.attr('string'),
    dob: DS.attr('number'),
    gender: DS.attr('number'),
    reg_date: DS.attr('number'),
    contact: DS.attr('string'),
    wechat: DS.attr('string'),
    // address: DS.attr('string'),
    // comefrom: DS.attr('string')
});
