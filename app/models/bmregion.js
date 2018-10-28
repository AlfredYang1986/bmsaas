import DS from 'ember-data';

export default DS.Model.extend({
    province: DS.belongsTo('bmprovinces', { async: false }),
    city: DS.belongsTo('bmcitys', { async: false }),
    governmentArea: DS.belongsTo('bmgovernment-areas', { async: false })
});
