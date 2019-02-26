import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            // rooms: this.store.query('room', { "brand-id": localStorage.getItem("brandid")}),
            classes: this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2}),
            techs: this.store.query('teacher', { "brand-id": localStorage.getItem("brandid")}),
        })
    },
});
