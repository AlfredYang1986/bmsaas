import DS from 'ember-data';

export default DS.Model.extend({
    res: DS.attr('string'),
    FmCond: DS.hasMany('fm-cond', { async: false }),
});
