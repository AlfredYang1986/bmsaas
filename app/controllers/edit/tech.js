import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    tech_name: '',
    tech_nickname: '',
    tech_gender: 0,
    tech_gender_male: computed('tech_gender', function(){
        if (this.tech_gender == 0) return false;
        else return true;
    }),
    tech_gender_female: computed('tech_gender', function(){
        if (this.tech_gender == 0) return true;
        else return false;
    }),
    // tech_gender_current: computed('tech_gender_male', 'tech_gender_female', function(){
    //     if (this.tech_gender_male) return 1;
    //     else return 0;
    // }),
    // tech_homeland: '',
    tech_dob: '',
    tech_contact: '',
    tech_wechat: '',
    tech_address: '',
    tech_nativePlace: '',
    // tech_date:'',
    // edu_name:'',
    // edu_category:'',
    // ca_company:'',
    // ca_name:'',
    // tech_date: computed('tech_dob', function() {
    //     return this.tech_dob.getTime();
    // }),
    
    isPushing: false,
    tech_name_length: computed('tech_name', function() {
        return this.get('tech_name').length;
    }),
    tech_nickname_length: computed('tech_nickname', function() {
        return this.get('tech_nickname').length;
    }),
    actions: {
        saveTechBtnClicked() {
            // console.log('save tech editing');

            // if (!this.techValidate()) {
            //     alert('必填项不能为空！');
            //     return;
            // }
            this.get('logger').log(this.tech_dob)

            let tech = null;
            if (this.isPushing) {
                tech = this.get('pmController').get('Store').createModel('bm-teacher', {
                    id: this.guid(),
                    intro: '新来的',
                    brandId: this.guid(),
                    name: this.tech_name,
                    nickname: this.tech_nickname,
                    // icon: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/07/03/ChMkJljlp7mIVS74AAZe51VcP4AAAbZEQJ0SDoABl7_286.jpg',
                    icon: "123",
                    gender: this.tech_gender,
                    dob: this.tech_dob,
                    // dob: 1470220594000,
                    reg_date: 222,
                    contact: this.tech_contact,
                    wechat: this.tech_wechat,
                    address: this.tech_address,
                    nativePlace: this.tech_nativePlace,
                });

                //
                let json = this.get('pmController').get('Store').object2JsonApi(tech)
                this.get('logger').log(json)
                //
                this.get('pmController').get('Store').transaction('/api/v1/pushteacher/0', 'bm-teacher', json)
                  .then(data => {
                      this.get('logger').log(data)
                  })
                  .catch(data => {
                      this.get('logger').log(data)
                  })
            } else {
                // this.get('logger').log('Error');
                tech = this.get('pmController').get('Store').createModel('request', {
                    id: this.guid(),
                    res: "BmTeacher",
                });
                tech.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                    id: this.guid(),
                    type: 'eqcond',
                    key: 'id',
                    val: this.model.tech.get('id'),
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'name',
                    val: this.tech_name,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'nickname',
                    val: this.tech_nickname,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'gender',
                    val: this.tech_gender,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: "dob",
                    // val: this.tech_dob,
                    val: 1470220594000,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'contact',
                    val: this.tech_contact,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'wechat',
                    val: this.tech_wechat,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'address',
                    val: this.tech_address,
                    category: "BmTeacher",
                }));
                tech.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'nativePlace',
                    val: this.tech_nativePlace,
                    category: "BmTeacher",
                }));
                let json = this.get('pmController').get('Store').object2JsonApi(tech);
                this.get('logger').log(json)
                this.get('pmController').get('Store').transaction('/api/v1/updateteacher/0', 'request', json)
                  .then(data => {
                      this.get('logger').log(data)
                  })
                  .catch(data => {
                      this.get('logger').log(data)
                  })
            }
      

            if (this.isPushing) {
                this.transitionToRoute('tech');
            } else {
                this.get('logger').log(tech.id);
                this.transitionToRoute('detail.tech', this.model.tech.get('id'));
            }




            // let tech = null;
            // if (this.isPushing) {
            //     tech = this.store.createRecord('bmtech', {
            //         id: this.guid()
            //     })
            //     let per_tech = this.store.createRecord('bmperson', {
            //         id: this.guid()
            //     })
            //     // let per_edu = this.store.createRecord('bmedu', {
            //     //     id: this.guid()
            //     // })
            //     // let per_carhis = this.store.createRecord('bmcarhis', {
            //     //     id: this.guid()
            //     // })
            //     tech.set('me', per_tech);
            //     // tech.set('edu', per_edu);
            //     // tech.set('carhis', per_carhis);
            // } else {
            //     tech = this.model.tech;
            // }

            // tech.me.set('name', this.tech_name);
            // tech.me.set('nickname', this.tech_nickname);
            // tech.me.set('gender', this.tech_gender);
            // tech.set('homeland', this.tech_homeland);
            // tech.me.set('contact', this.tech_contact);
            // tech.set('address', this.tech_address);
            // tech.me.set('wechat', this.tech_wechat);
            // tech.edu.set('name', this.edu_name);
            // tech.edu.set('category', this.edu_category);
            // // tech.carhis.set('name', this.ca_name);
            // // tech.carhis.set('company', this.ca_company);
            // // TODO: 其他一些属性的修改

            // if (this.isPushing) {
            //     this.transitionToRoute('tech');
            // } else {
            //     this.transitionToRoute('detail.tech', tech.id);
            // }
        },

        pushImg() {
            document
                .querySelector('#imgPicker')
                .addEventListener('change', function(){
                    //当没选中图片时，清除预览
                    if(this.files.length === 0){
                    document.querySelector('#preview').src = '';
                    return;
                    }

                    //实例化一个FileReader
                    var reader = new FileReader();

                    reader.onload = function (e) {
                    //当reader加载时，把图片的内容赋值给
                    document.querySelector('#preview').src = e.target.result;
                    };

                //读取选中的图片，并转换成dataURL格式
                reader.readAsDataURL(this.files[0]);
                }, false);
            }
    },

    techValidate() {
        let valiFlag = true;
        if (this.tech_name.length == 0 ||
          this.tech_nickname.length == 0 ||
          this.tech_gender_str.length == 0 ||
          this.tech_contact.length == 0) {
            valiFlag = false;
        }
        return valiFlag;
        // return this.tech_name.length != 0;
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
