import DS from 'ember-data';

export default DS.Model.extend({
    year: DS.attr('number'),
    month: DS.attr('number'),
    day: DS.attr('number')
});
