import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    course: DS.belongsTo('bmcourseinfo'),
    yard: DS.belongsTo('bmyard'),
    start_date: DS.attr('date'),
    end_date: DS.attr('date'),
    tech: DS.hasMany('bmtech'),
    stud: DS.hasMany('bmstud'),
    session: DS.hasMany('bmclssession')
});
