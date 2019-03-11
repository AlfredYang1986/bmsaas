import DS from 'ember-data';

export default DS.Model.extend({
    img: DS.attr('string', { defaultValue: ""}),
    tag: DS.attr('string', { defaultValue: "自定义描述"}),
    flag: DS.attr('number', { defaultValue: 0}),
});
