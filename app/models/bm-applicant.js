import DS from 'ember-data';

export default DS.Model.extend({
    gender: DS.attr('number'),
    name: DS.attr('string'),
    pic: DS.attr('string'),
    regi_phone: DS.attr('string'),
    wechat_bind_phone: DS.attr('string'),
    wechat_openid: DS.attr('string'),
});
