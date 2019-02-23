import Service from '@ember/service';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { reject } from 'rsvp';

export default Service.extend({
    accountLogin(a, p) {
        let tmp = {
            account: a,
            password: p
        }

        let dt = JSON.stringify(tmp);

        // let that = this
        return new Promise(function(resolve, rejact){
            $.ajax({
                method: 'POST',
                url: '/v2/AccountValidation',
                headers: {
                    'Content-Type': 'application/json', // 默认值
                    'Accept': 'application/json',
                },
                data: dt,
                success: function(res) {
                    return resolve(new Promise(function(reso, rejtj){
                        if (res.statue == 'error') {
                            rejtj(res.error)
                        } else {
                            reso(res.result)
                        }
                    }))
                },
                error: function(err) {
                    reject(res)
                },
            })
        })
    }
});
