import DS from 'ember-data';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import CustomError from './error';

export default DS.JSONAPIAdapter.extend({
    init() {
        this._super(...arguments)
        this.addObserver('bm_token.token', this, 'tokenChanges')
    },

    bm_token: service(),

    tokenChanges() {
        // debugger
        this.set('headers', {
            'Authorization': 'bearer ' + this.bm_token.token//token验证，需要时揭开注释
        })
    },

    // host: 'http://localhost:4200',
    host: 'https://saas.dongdakid.com',
    // 发布时揭开注释强制过滤掉后端返回link里的主机

    headers: computed('bm_refresh', function() {
        return {
            'Authorization': 'bearer ' + this.bm_token.token
        };
    }),

    namespace: "v2", // 根据后端发布版本修改命名空间

    // 请求超时时间
    // ajaxOptions(url, type, options) {
    //     let hash = this._super(url, type, options);
    //     hash.timeout = 30000;
    //     return hash;
    // },

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
