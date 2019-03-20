import Service from '@ember/service';

export default Service.extend({
    savePtStud(ptname, ptgender, ptschool, ptgrade, ptdob, ptgn, ptcontact, ptrs) {
        let tmp = {
            'brand-id': localStorage.getItem("brandid"),
            'name': ptname,
            'gender': ptgender,
            'school': ptschool,
            'grade': ptgrade,
            'dob': ptdob,
            'guardian-name': ptgn,
            'contact': ptcontact,
            'relation-ship': ptrs,
        }
        let dt = JSON.stringify(tmp);

        return new Promise(function(resolve, reject) {
            $.ajax({
                method: 'POST',
                url: '/v2/AddPotentialStudent',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                data: dt,
                success: function(res) {
                    return new Promise(function(){
                        if (res.status == 'error') {
                            reject(res.error)
                        } else {
                            resolve(res.result)
                        }
                    })
                },
                error: function(err) {
                    reject(err)
                }
            })
        })
    }
});
