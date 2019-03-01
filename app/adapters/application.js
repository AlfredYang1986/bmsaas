import DS from 'ember-data';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import CustomError from './error';

export default DS.JSONAPIAdapter.extend({
    init() {
        this._super(...arguments)
        this.addObserver('bm_token.token', this, 'tokenChanges')
    },

    tokenChanges() {
        // debugger
        this.set('headers', {
            'Authorization': 'bearer ' + this.bm_token.token//token验证，需要时揭开注释
        })
    },

    bm_token: service(),

    // host: 'http://localhost:4200',
    
    // host: 'https://demo.dongdakid.com',
    // 发布时揭开注释强制过滤掉后端返回link里的主机

    headers: computed('bm_refresh', function() {
        // debugger
        // window.console.log(this.bm_token.token)
        return {
            // 'Authorization': this.bm_token.bearerToken //token验证，需要时揭开注释
            
            'Authorization': 'bearer ' + this.bm_token.token
        };
    }),

    namespace: "v2", // 根据后端发布版本修改命名空间

    // ajaxOptions(url, type, options) {
    //     let hash = this._super(url, type, options);
    //     hash.timeout = 30000;
    //     return hash;
    // },

    urlForFindHasMany(id, modelName) {
        let baseUrl = this.buildURL(modelName, id);
        return `${baseUrl}/relationships`;
    },

    handleResponse(status, headers, payload) {
        if(200 <= status && 300 > status) {
            return this._super(...arguments);
        } else if (400 <= status && 500 > status && payload.errors) {
            return new CustomError(payload.errors);
        } else if (500 <= status && 600 >= status && payload.errors) {
            return new CustomError(payload.errors);
        } else {
            return new CustomError(payload.errors);
        }
    }
});
