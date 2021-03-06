import DS from 'ember-data';

export default DS.Model.extend({
    address: DS.attr('string'),
    brandId: DS.attr('string'),
    contact: DS.attr('string'),
    dob: DS.attr('number'),
    gender: DS.attr('number'),
    icon: DS.attr('string'),
    idCardNo: DS.attr('string'),
    name: DS.attr('string'),
    nickname: DS.attr('string'),
    regDate: DS.attr('number'),
    relationShip: DS.attr('string'),
    wechat: DS.attr('string'),
});
