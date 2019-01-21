import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.JSONAPIAdapter.extend({
    headers: computed(function() {
        return {};
    }),
    namespace: "v0",
    urlForFindHasMany(id, modelName) {
        let baseUrl = this.buildURL(modelName, id);
        return `${baseUrl}/relationships`;
      }
});
