import Controller from '@ember/controller';
import EmberObject from '@ember/object';

export default Controller.extend({
    init() {
        this._super(...arguments);
        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
        });
        request.get('FmCond').pushObject(this.get('pmController').get('Store').createModel('FmCond', {
            id: this.guid(),
        }));
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)

        this.get('pmController').get('Store').transaction('/api/v1/findattendeemulti/0', 'request', json)
            .then(data => {
                this.get('logger').log('this is query stud data');
                this.get('logger').log(data.attendees);
            })
            .catch(data => {
                this.get('logger').log(data);
            })
    },
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.stud', idx);
        },
        addStudClicked() {
            this.transitionToRoute('edit.stud', "stud/push");
        }
    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
