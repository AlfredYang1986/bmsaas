import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            studs: this.store.query('student',  { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
        })
    },
});
