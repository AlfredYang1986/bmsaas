import DS from 'ember-data';

export default DS.Model.extend({
    yard: DS.belongsTo('bmyard'),
    start_date: DS.attr('date'),
    end_date: DS.attr('date'),
    register_date: DS.attr('date'),
    can_register: DS.attr('number'),
    limits: DS.attr('number')
});
