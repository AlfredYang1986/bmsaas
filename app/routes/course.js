import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // return this.store.query('sessioninfo', { 'status': 2, "brand-id": localStorage.getItem("brandid")});
    }
});
