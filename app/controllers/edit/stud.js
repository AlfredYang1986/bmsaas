import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  chd_name: '',
  chd_nickname: '',
  chd_gender: undefined,
  chd_gender_str: computed('chd_gender', function() {
    if (this.chd_gender == 0) return '女';
    else return '男';
  }),
  chd_gender_female: computed('chd_gender', function() {
    if (this.chd_gender == 0) return true;
    else return false;
  }),
  chd_gender_male: computed('chd_gender', function() {
    if (this.chd_gender == 0) return false;
    else return true;
  }),
  chd_school: '',

  par_name: '',
  par_nickname: '',
  par_rs: '',
  par_contact: '',
  par_wechat: '',
  par_address: '',

  urg_name: '',
  urg_nickname: '',
  urg_rs: '',
  urg_contact: '',

  stud_date: computed('dob', function() {
    // return dob.getTime();
    // return dob.getFullYear() + '-' + (dob.getMonth()+1 < 10 ? '0'+(dob.getMonth()+1) : dob.getMonth()+1) + '-' + dob.getDate();
}),

  isPushing: false,
  address_length: computed('par_address', function() {
    // return this.get('par_address').length;
  }),
  par_name_length: computed('par_name', function() {
    return this.get('par_name').length;
  }),
  school_length: computed('chd_school', function() {
    // return this.get('chd_school').length;
  }),
  chd_name_length: computed('chd_name', function() {
    return this.get('chd_name').length;
  }),
  actions: {
    saveInputBtnClicked() {
      // if (!this.studValidate()) {
      //   alert('必填项不能为空！');
      //   return;
      // }
      let stud = null;
      let guardian = null;
      if (this.isPushing) {
          stud = this.get('pmController').get('Store').createModel('bm-attendee', {
              id: this.guid(),
              name: this.chd_name,
              nickname: '仮面ライダーシリーズ',
              icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
              gender: this.chd_gender,
              dob: this.stud_date,
              reg_date: 222,
              contact: this.par_contact,
              intro: '新来的',
              status: 'candidate',
              lesson_count: 18,
          });
          stud.get('Guardians').pushObject(this.get('pmController').get('Store').createModel('bm-guardian', {
              id: this.guid(),
              relation_ship: this.par_rs,
              name: this.par_name,
              nickname: '仮面ライダーシリーズ',
              icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
              gender: this.chd_gender,
              dob: this.stud_date,
              reg_date: 222,
              contact: this.par_contact,
          }))

          stud.get('Guardians').pushObject(this.get('pmController').get('Store').createModel('bm-guardian', {
              id: this.guid(),
              relation_ship: this.par_rs,
              name: this.par_name,
              nickname: '仮面ライダーシリーズ',
              icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
              gender: this.chd_gender,
              dob: this.stud_date,
              reg_date: 222,
              contact: this.par_contact,
          }))
          //
          let json = this.get('pmController').get('Store').object2JsonApi(stud)
          this.get('logger').log(json)
          //
          this.get('pmController').get('Store').transaction('/api/v1/insertattendee/0', 'bm-attendee', json)
            .then(data => {
                this.get('logger').log(data)
            })
            .catch(data => {
                this.get('logger').log(data)
            })
      } else {
          // this.get('logger').log('Error');
          this.get('logger').log("this is model")
          this.get('logger').log(this.model)
          stud = this.get('pmController').get('Store').createModel('request', {
              id: this.guid(),
              res: "BmAttendee",
          });
          stud.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
              id: this.guid(),
              type: 'eqcond',
              key: 'id',
              val: this.model.stud.get('id'),
              category: "BmAttendee",
          }));
          stud.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
              id: this.guid(),
              type: 'upcond',
              key: 'intro',
              val: '牛',
              category: "BmAttendee",
          }));
          stud.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
              id: this.guid(),
              type: 'upcond',
              key: 'name',
              val: this.chd_name,
              category: "BmAttendee",
          }));

          let json = this.get('pmController').get('Store').object2JsonApi(stud);
          this.get('logger').log(json)
          this.get('pmController').get('Store').transaction('/api/v1/updateattendee/0', 'request', json)
            .then(data => {
                this.get('logger').log(data)
            })
            .catch(data => {
                this.get('logger').log(data)
            })

        guardian = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmGuardian',
        });
        guardian.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
            id: this.guid(),
            type: 'eqcond',
            key: "id",
            val: this.model.stud.Guardians.firstObject.get('id'),
            category: "BmGuardian",
        }));
        guardian.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
            id: this.guid(),
            type: 'upcond',
            key: "nickname",
            val: '羊羊羊',
            category: "BmGuardian",
        }));
        guardian.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
            id: this.guid(),
            type: 'upcond',
            key: "name",
            val: this.par_name,
            category: "BmGuardian",
        }));
        guardian.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
            id: this.guid(),
            type: 'upcond',
            key: "contact",
            val: this.par_contact,
            category: "BmGuardian",
        }));
        guardian.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
            id: this.guid(),
            type: 'upcond',
            key: "address",
            val: this.par_address,
            category: "BmGuardian",
        }));
        let guar = this.get('pmController').get('Store').object2JsonApi(guardian);
        this.get('logger').log(guar);
        this.get('pmController').get('Store').transaction('/api/v1/updateguardian/0', 'request', guar)
            .then(data => {
                this.get('logger').log(data);
            })
            .catch(data => {
                this.get('logger').log(data);
            })
      }

      if (this.isPushing) {
        this.transitionToRoute('stud');
      } else {
          this.get('logger').log(stud.id);
        this.transitionToRoute('detail.stud', this.model.stud.get('id'));
      }


      // let stud = null;
      // if (this.isPushing) {
      //   stud = this.store.createRecord('bmattendee', {
      //     id: this.guid();
      //   })
      //   let per_stud = this.store.createRecord('bmperson', {
      //     id: this.guid()
      //   })
      //   let per_gard = this.store.createRecord('bmperson', {
      //     id: this.guid()
      //   })
      //   let per_urg = this.store.createRecord('bmperson', {
      //     id: this.guid()
      //   })
      //   let gard = this.store.createRecord('BmGuardian', {
      //     id: this.guid()
      //   })
      //   let urg = this.store.createRecord('bmurgent', {
      //     id: this.guid()
      //   })
      //   gard.set('me', per_gard);
      //   urg.set('me', per_urg);
      //   stud.set('me', per_stud);
      //   stud.set('urgent', urg);
      //   stud.set('guardian', gard)
      // } else {
      //   stud = this.model.stud;
      // }
      this.model.stud.set('name', this.chd_name);
      stud.set('name', this.chd_name);
      // stud.set('nickname', this.chd_nickname);
      stud.set('gender', this.chd_gender);
      stud.set('dob', this.stud_date)
      stud.set('school', this.chd_school);

      // stud.Guardians.firstObject.set('name', this.par_name);
      // stud.Guardians.firstObject.set('nickname', this.par_nickname);
      // stud.Guardians.firstObject.set('rs', this.par_rs);
      // stud.Guardians.firstObject.set('contact', this.par_contact);
      // stud.Guardians.firstObject.set('wechat', this.par_wechat);
      // stud.Guardians.firstObject.set('address', this.par_address);

      // TODO: 其他的一些属性的修改都在这里解决

    },

  },

  studValidate() {
    let valiFlag = true;
    if (this.chd_name.length == 0 ||
      // this.chd_nickname.length == 0 ||
      this.chd_gender_str.length == 0 ||
      this.chd_school.length == 0 ||
      this.par_name.length == 0 ||
      // this.par_nickname.length == 0 ||
      // this.par_rs.length == 0 ||
      this.par_contact.length == 0) {
      valiFlag = false;
    }
    return valiFlag;
    // return this.chd_name.length != 0;
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
