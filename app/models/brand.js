import DS from 'ember-data';

export default DS.Model.extend({
    aboutUs: DS.attr('string'),
    brandTags: DS.attr(),
    eduIdea: DS.attr('string'),
    found: DS.attr('number'),
    foundStory: DS.attr('string'),
    logo: DS.attr('string'),
    slogan: DS.attr('string'),
    subtitle: DS.attr('string'),
    title: DS.attr('string'),
    cate: DS.belongsTo('category'),
    // certifications: DS.hasMany('img'),
    // honors: DS.hasMany('img'),
    imgs: DS.hasMany('img'),
});
