import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // return this.store.query('reservable-item', { 'status': 1 });
        return this.store.query('reservableitem', { 'status': 1 });
    }
});
