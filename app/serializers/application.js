import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    normalizeArrayResponse() {
        let normalizedDocument = this._super(...arguments);

        let tr =  normalizedDocument.meta['query-res']
        let tp =  normalizedDocument.meta['total-page']
        let tc =  normalizedDocument.meta['total-count']
        localStorage.setItem(tr, tp);
        localStorage.setItem(tr+'-count', tc);

        return normalizedDocument;
    },
});
