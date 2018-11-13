import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // this.store.unloadAll('bm-attendees');
        // this.store.unloadAll('bm-attendee');
        // this.store.unloadAll('bm-guardian');

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0
            })
        });

        let json = this.get('pmController').get('Store').object2JsonApi(request);

        return this.get('pmController').get('Store').queryMultipleObject('/api/v1/findattendeemulti/0', 'bm-attendees', json)
            .then(data => {
                let dabs = [];
                data.forEach((a, index) => {
                    let age = this.getAge(a.dob);
                    dabs.push(age);
                    return age;
                })

                this.get('logger').log(dabs);
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
            })
    },
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m <0 || (m === 0 && today.getDate() <birthDate.getDate())) {
            age--;
        }
        return age;
    }

});
