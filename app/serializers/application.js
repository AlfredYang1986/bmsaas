import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    normalizeArrayResponse() {
        // debugger
        let normalizedDocument = this._super(...arguments);

        let tr =  normalizedDocument.meta['query-res']
        let tp =  normalizedDocument.meta['total-page']
        let tc =  normalizedDocument.meta['total-count']
        localStorage.setItem(tr, tp);
        localStorage.setItem(tr+'-count', tc);

        return normalizedDocument;
    },

    // extractErrors(store, typeClass, payload, id) {
    //     if (payload && typeof payload === 'object' && payload._problems) {
    //       payload = payload._problems;
    //       this.normalizeErrors(typeClass, payload);
    //     }
    //     window.console.log(payload);
    //     // debugger
    //     return payload;
    //   }
});
