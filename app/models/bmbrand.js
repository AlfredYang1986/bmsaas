import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    subtitle: DS.attr('string'),
    brand_tags: DS.attr(),
    found_date: DS.belongsTo('date-format'),
    found_story: DS.attr('string'),
    rewards: DS.hasMany('bmbrand-reward')
});
