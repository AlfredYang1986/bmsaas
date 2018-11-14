import DS from 'ember-data';

export default DS.Model.extend({
    province: DS.attr('string'),
    city: DS.attr('string'),
    district: DS.attr('string')
    // governmentArea: DS.belongsTo('bmgovernment-areas', { async: false })
});
