import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        this._super(store, primaryModelClass, payload, id, requestType);
        let newPayLoad = JSON.stringify(payload).replace(/https:\/\/api.dongdakid.com/g, "")
        return JSON.parse(newPayLoad)
    }
});
