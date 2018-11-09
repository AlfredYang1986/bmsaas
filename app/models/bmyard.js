import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    title: DS.attr('string'),
    cover: DS.attr('string'),
    // detail_address: DS.attr('string'),
    region: DS.belongsTo('bm-region', { async: false }),
    description: DS.attr('string'),
    around: DS.attr('string'),
    ardes: DS.attr('string'),
    imgs: DS.hasMany('bmtagimg'),
    facilities: DS.attr(),
    parking: DS.attr(),
    embag: DS.attr(),
    province: DS.attr('string'),
    city: DS.attr('string'),
    district: DS.attr('string'),
    detail: DS.attr('string'),
    awards: DS.hasMany('bmtagimg'),
    Rooms: DS.hasMany('bm-room', { async: false }),
    Tagimgs: DS.hasMany('bm-tag-img', { async: false }),
    // address: computed('detail_address', 'region.province.name', 'region.city.name', 'region.governmentArea.name', function() {
    //     return `${this.region.province.name} ${this.region.city.name} ${this.region.governmentArea.name} ${this.detail_address}`
    // })
});
