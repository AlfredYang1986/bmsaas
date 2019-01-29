import ApplicationSerializer from '../../application';

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        this._super(store, primaryModelClass, payload, id, requestType);
        // return payload
    }
});
