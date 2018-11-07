import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  chd_name: '',
  chd_nickname: '',
  chd_gender: 0,
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

  stud_date: 1470220594000,

  isPushing: false,
  address_length: computed('par_address', function() {
    return this.get('par_address').length;
  }),
  par_name_length: computed('par_name', function() {
    return this.get('par_name').length;
  }),
  school_length: computed('chd_school', function() {
    return this.get('chd_school').length;
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
      //
      let attendee = null;
      if (this.isPushing) {
          attendee = this.get('pmController').get('Store').createModel('BmAttendee', {
              id: this.guid(),
              intro: '你才是新来的',
              status: 'candidate',
              lesson_count: 18
          });
          let region = this.get('pmController').get('Store').createModel('BmRegion', {
              province: '北京',
              city: '北京',
              district: '朝阳区',
          })
          let address = this.get('pmController').get('Store').createModel('BmAddress', {
              detail: '详情',
              Region: region
          })
          let person = this.get('pmController').get('Store').createModel('BmPerson', {
              id: this.guid(),
              name: this.chd_name,
              nickname: '仮面ライダーシリーズ',
              icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
              gender: 0,
              dob: 1470220594000,
              Address: address
          });

          let person_1 = this.get('pmController').get('Store').createModel('BmPerson', {
              id: this.guid(),
              name: this.par_name,
              nickname: '逍遥',
              icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
              gender: 0,
              dob: 1470220594000,
              Address: address
          });
          let person_2 = this.get('pmController').get('Store').createModel('BmPerson', {
              id: this.guid(),
              name: this.par_name,
              nickname: '寡妇',
              icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
              gender: 1,
              dob: 1470220594000,
              Address: address
          });

          debugger
          attendee.set('Person', person);
          //
          // attendee.get('Guardians').pushObject(this.get('pmController').get('Store').createModel('BmGuardian', {
          //     id: this.guid(),
          //     relation_ship: '兄弟',
          //     person: person_1
          // }))
          //
          // attendee.get('Guardians').pushObject(this.get('pmController').get('Store').createModel('BmGuardian', {
          //     id: this.guid(),
          //     relation_ship: '姊妹',
          //     person: person_2
          // }))
          //
          // let json = this.get('pmController').get('Store').object2JsonApi(attendee, false)
          // this.get('logger').log('this is json')
          // this.get('logger').log(json)
          //
          // this.get('pmController').get('Store').transaction('/api/v1/insertattendee/0', 'bm-attendee', json)
          //   .then(data => {
          //       this.get('logger').log("data")
          //       this.get('logger').log(data)
          //   })
          //   .catch(data => {
          //       this.get('logger').log(data)
          //   })
      } else {
          this.get('logger').log('Error');
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
      // // this.model.stud.me.set('name', this.chd_name);
      // stud.me.set('name', this.chd_name);
      // stud.me.set('nickname', this.chd_nickname);
      // stud.me.set('gender', this.chd_gender);
      // stud.me.set('dob', this.stud_date)
      // stud.set('school', this.chd_school);
      //
      // stud.guardian.me.set('name', this.par_name);
      // stud.guardian.me.set('nickname', this.par_nickname);
      // stud.guardian.set('rs', this.par_rs);
      // stud.guardian.me.set('contact', this.par_contact);
      // stud.guardian.me.set('wechat', this.par_wechat);
      // stud.guardian.set('address', this.par_address);
      //
      // stud.urgent.me.set('name', this.urg_name);
      // stud.urgent.me.set('nickname', this.urg_nickname);
      // stud.urgent.set('rs', this.urg_rs);
      // stud.urgent.me.set('contact', this.urg_contact);
      // // TODO: 其他的一些属性的修改都在这里解决
      //
      if (this.isPushing) {
        this.transitionToRoute('stud');
      } else {
        this.transitionToRoute('detail.stud', stud.id);
      }


    },

  },

  studValidate() {
    let valiFlag = true;
    if (this.chd_name.length == 0 ||
      this.chd_nickname.length == 0 ||
      this.chd_gender_str.length == 0 ||
      this.chd_school.length == 0 ||
      this.par_name.length == 0 ||
      this.par_nickname.length == 0 ||
      this.par_rs.length == 0 ||
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
