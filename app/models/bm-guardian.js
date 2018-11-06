import DS from 'ember-data';

export default DS.Model.extend({
    relation_ship: DS.attr('string'),
    person: DS.belongsTo('bm-person', { async: false })
});
