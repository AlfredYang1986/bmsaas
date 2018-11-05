import DS from 'ember-data';

export default DS.Model.extend({
    amound: DS.attr('number'),
    description: DS.attr('string')
});
