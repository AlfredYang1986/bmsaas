import DS from 'ember-data';

export default DS.Model.extend({
    status: DS.attr('number'),
    start_date: DS.attr('number'),
    end_date: DS.attr('number'),
    SessionInfo: DS.belongsTo('bm-session-info')
});
