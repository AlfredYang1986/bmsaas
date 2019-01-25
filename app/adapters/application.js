import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.JSONAPIAdapter.extend({
    // host: 'https://api.dongdakid.com',
    // 发布时揭开注释强制过滤掉后端返回link里的主机
    headers: computed(function() {
        return {
            // 'Authorization': 'bearer ' + document.cookie.split(";")[0].split("=")[1] //token验证，需要时揭开注释
        };
    }),
    namespace: "v2", // 根据后端发布版本修改命名空间
    urlForFindHasMany(id, modelName) {
        let baseUrl = this.buildURL(modelName, id);
        return `${baseUrl}/relationships`;
      }
});
