import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // return this.store.query('reservableitem', { 'status': 0, "brand-id": localStorage.getItem("brandid")});
    }
});
