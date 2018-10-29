import DS from 'ember-data';

export default DS.Model.extend({
    cls: DS.belongsTo('bmclass'),
    start_date: DS.attr('date'),
    length: DS.attr('number'),
    tech: DS.belongsTo('bmtech')
});
