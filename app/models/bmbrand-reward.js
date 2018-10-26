import DS from 'ember-data';

export default DS.Model.extend({
    img_src: DS.attr('string'),
    reward_des: DS.attr('string'),
    bmbrand: DS.belongsTo('bmbrand')
});
