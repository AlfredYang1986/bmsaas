import DS from 'ember-data';

export default DS.Model.extend({
    attendees: DS.hasMany('bm-attendee', { async: false }),
});
