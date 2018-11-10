import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    cover: DS.attr('string'),
    description: DS.attr('string'),
    around: DS.attr('string'),
    facilities: DS.attr(),
    province: DS.attr('string'),
    city: DS.attr('string'),
    district: DS.attr('string'),
    traffic_info: DS.attr('string'),
    attribute: DS.attr('string'),
    scenario: DS.attr('string'),
    address: DS.attr('string'),
    friendly: DS.attr(''),
    Rooms: DS.hasMany('bm-room', { async: false }),
    Tagimgs: DS.hasMany('bm-tag-img', { async: false }),
});
