import DS from 'ember-data';

export default DS.Model.extend({
    detail: DS.attr('string'),
    region: DS.belongsTo('bm-region', {async: false})
});
