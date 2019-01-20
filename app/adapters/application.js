import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: "v0",
    urlForFindHasMany(id, modelName, snapshot) {
        let baseUrl = this.buildURL(modelName, id);
        return `${baseUrl}/relationships`;
      }
});
