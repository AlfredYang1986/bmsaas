import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    title: DS.attr('string'),
    cover: DS.attr('string'),
    detail_address: DS.attr('string'),
    region: DS.belongsTo('bmregion', { async: false }),
    description: DS.attr('string'),
    around: DS.attr('string'),
    ardes: DS.attr('string'),
    imgs: DS.hasMany('bmtagimg'),
    facilities: DS.attr(),
    awards: DS.hasMany('bmtagimg'),
    address: computed('detail_address', 'region.province.name', 'region.city.name', 'region.governmentArea.name', function() {
        window.console.info(this.detail_address)
        return `${this.region.province.name} ${this.region.city.name} ${this.region.governmentArea.name} ${this.detail_address}`
    })
});
