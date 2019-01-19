import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        let normalizedDocument = this._super(...arguments);
    
        let tr =  normalizedDocument.meta['query-res']
        let tp =  normalizedDocument.meta['total-page']
        localStorage.setItem(tr, tp);
    
        return normalizedDocument;
    },
});
