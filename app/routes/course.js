import Route from '@ember/routing/route';

export default Route.extend({
    model() {

        // this.store.unloadAll('bm-session-info');
        // this.store.unloadAll('bm-category');

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmSessionInfo',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0
            })
        });
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json);

        return this.get('pmController').get('Store').queryMultipleObject('/api/v1/findsessioninfomulti/0', 'bm-session-info', json)
            .then(data => {
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
});
