import DS from 'ember-data';

export default DS.Model.extend({
    stud: DS.hasMany('bmstud'),
    yard: DS.belongsTo('bmyard'),
    res_date: DS.attr('date'),

    reservable: DS.belongsTo('bmreservable')
});
