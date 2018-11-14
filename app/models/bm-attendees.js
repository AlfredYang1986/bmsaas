import DS from 'ember-data';

export default DS.Model.extend({
    Attendees: DS.hasMany('bm-attendee', { async: false }),
});
