import DS from 'ember-data';

export default DS.Model.extend({
    me: DS.belongsTo('bmperson'),
    school: DS.attr('string'),
});
