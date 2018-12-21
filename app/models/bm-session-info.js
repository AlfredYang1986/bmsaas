import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    subtitle: DS.attr('string'),
    alb: DS.attr('number'),
    aub: DS.attr('number'),
    level: DS.attr('string'),
    count: DS.attr('number'),
    length: DS.attr('number'),
    description: DS.attr('string'),
    harvest: DS.attr('string'),     // 虚拟收获
    acquisition: DS.attr('string'), // 奖品
    accompany: DS.attr('number'),   // 家长陪同
    inc: DS.attr('string'),
    carrying: DS.attr('string'),
    notice: DS.attr('string'),
    cover: DS.attr('string'),
    Cate: DS.belongsTo('BmCategory', {async: false}),
    status: DS.attr('number')
});
