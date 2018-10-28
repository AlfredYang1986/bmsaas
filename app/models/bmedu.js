import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    category: DS.attr('string'),
    start: DS.attr('Date'),
    end: DS.attr('Date'),
    des: DS.attr('string')
});
