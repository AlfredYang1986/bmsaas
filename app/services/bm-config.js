import Service from '@ember/service';

export default Service.extend({
    // host: 'altlys.com:8081',
    token: '8f874a970b4481894c28a4b6e4761289',
    host: '192.168.100.174:8080',
    // token: 'ce6af788112b26331e9789b0b2606cce',

    getUrl(ep) {
        return "http://" + this.host + ep;
    },

    getToken() {
        return 'bearer ' + this.token;
    }
});
