import DS from 'ember-data';
import {computed} from '@ember/object';
import { inject as service } from '@ember/service'
import CustomError from './error';

export default DS.JSONAPIAdapter.extend({
    bm_token: service(),
    
    // host: 'http://localhost:4200',
    
    // host: 'https://demo.dongdakid.com',
    // 发布时揭开注释强制过滤掉后端返回link里的主机
    headers:  this.bm_token.bearerToken,
    namespace: "v2", // 根据后端发布版本修改命名空间
    urlForFindHasMany(id, modelName) {
        let baseUrl = this.buildURL(modelName, id);
        return `${baseUrl}/relationships`;
    },

    handleResponse(status, headers, payload) {
        if (400 === status && payload.errors) {
            return new DS.InvalidError(payload.errors);
        } else if (401 === status && payload.errors) {
            return new CustomError(payload.errors);
        } else if (200 === status) {
            return this._super(...arguments);
        } else {
            return new DS.AdapterError();
        }
        // else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // } else if (401 === status) {
        // }
        

    }
});
