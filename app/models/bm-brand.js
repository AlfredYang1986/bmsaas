import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    subtitle: DS.attr('string'),
    logo: DS.attr('string'),
    slogan: DS.attr('string'),
    brand_tags: DS.attr(),
    foundStory: DS.attr('string'),
    found: DS.attr('number'),
    edu_idea: DS.attr('string'),
    about_us: DS.attr('string'),
    Honors: DS.hasMany('BmHonor', {async: false}),
    Certifications: DS.hasMany('BmCertification', {async: false}),
    Cate: DS.belongsTo('BmCategory', {async: false}),
});
