import DS from 'ember-data';

export default DS.Model.extend({
    address: DS.attr('string'),
    around: DS.attr('string'),
    attribute: DS.attr('string'),
    brandId: DS.attr('string'),
    city: DS.attr('string'),
    cover: DS.attr('string'),
    description: DS.attr('string'),
    district: DS.attr('string'),
    facilities: DS.attr(),
    openTime: DS.attr('string'),
    province: DS.attr('string'),
    scenario: DS.attr('string'),
    serviceContact: DS.attr('string'),
    title: DS.attr('string'),
    trafficInfo: DS.attr('string'),
    rooms: DS.hasMany('room'),
    images: DS.hasMany('image'),
});
