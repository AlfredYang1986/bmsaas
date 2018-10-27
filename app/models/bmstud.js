import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson'),
    dob: DS.belongsTo('date-format'),
    school: DS.attr('string'),
});
