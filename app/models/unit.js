import DS from 'ember-data';

export default DS.Model.extend({
    brandId: DS.attr('string'),
    courseTime: DS.attr('number'),
    endDate: DS.attr('number'),
    startDate: DS.attr('number'),
    status: DS.attr('number'),

    room: DS.belongsTo('room'),
    // class: DS.belongsTo('class'),  //反向绑定导致更新class时不带units的rela
    teacher: DS.belongsTo('teacher'),
});
