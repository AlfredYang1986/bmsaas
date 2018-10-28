import DS from 'ember-data';

export default DS.Model.extend({
    img_src: DS.attr('string'),
    img_tag: DS.attr('string')
});
