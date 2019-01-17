import DS from 'ember-data';

export default DS.Model.extend({
    gender: DS.attr('number'),
    name: DS.attr('string'),
    pic: DS.attr('string'),
    regiPhone: DS.attr('string'),
    wechatBindPhone: DS.attr('string'),
    wechatOpenid: DS.attr('string'),
});
