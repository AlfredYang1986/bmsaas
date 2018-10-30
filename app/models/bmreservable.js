import DS from 'ember-data';

export default DS.Model.extend({
    course: DS.belongsTo('bmcourseinfo'),
    start: DS.attr('date'),
    end: DS.attr('date'),
    studs: DS.hasMany('bmstud')
});
