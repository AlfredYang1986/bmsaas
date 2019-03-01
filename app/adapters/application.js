import DS from 'ember-data';
import {computed} from '@ember/object';
import { inject as service } from '@ember/service'
// import CustomError from './error';

export default DS.JSONAPIAdapter.extend({
    bm_token: service(),
    
    // host: 'http://localhost:4200',
    
    // host: 'https://demo.dongdakid.com',
    // 发布时揭开注释强制过滤掉后端返回link里的主机
    headers: computed(function() {
        return {
            'Authorization': this.bm_token.bearerToken //token验证，需要时揭开注释
        };
    }),
    namespace: "v2", // 根据后端发布版本修改命名空间
    urlForFindHasMany(id, modelName) {
        let baseUrl = this.buildURL(modelName, id);
        return `${baseUrl}/relationships`;
    },

    // handleResponse(status) {
    //     if (401 === status) {
    //         return new CustomError();
    //     }

    //     return this._super(...arguments);
    // }
});
