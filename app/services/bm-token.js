import Service from '@ember/service';
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
const { keys } = Object;

export default Service.extend({
    cookies: service(),

    allCookies: computed(function() {
        let cookieService = this.get('cookies');
        cookieService.write('now', new Date().getTime());
    
        let cookies = cookieService.read();
        return keys(cookies).reduce((acc, key) => {
            let value = cookies[key];
            acc.push({ name: key, value });
    
            return acc;
        }, []);
        // return cookies;
    }),

    token: computed('allCookies', function(){
        let tmp = this.allCookies['token']
        if (tmp !== null && tmp !== undefined && tmp.length > 0) {
            localStorage.setItem('token', t)
            return tmp
        } else {
            return ''
        }
    }),

    brandId: computed('allCookies', function(){
        let tmp = this.allCookies['brand-id']
        if (tmp !== null && tmp !== undefined && tmp.length > 0) {
            localStorage.setItem('brandid', bid)
            return tmp
        } else {
            return ''
        }
    }),

    resetData(t, bid) {
        this.set('token', t)
        this.set('brandId', bid)
        this.cookies.write('token', t) // TODO: add options
        localStorage.setItem('token', t)
        this.cookies.write('brand-id', bid) // TODO: add options
        localStorage.setItem('brandid', bid)
    },

    clearToken() {
        this.set('token', '')
        this.set('brandId', '')
        cookies.clear()
    },

    bearerToken: computed('token', function(){
        return 'bearer ' + token
    })
});
