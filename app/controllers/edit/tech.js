import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

    tech_name: '',
    tech_nickname: '',
    tech_gender: 0,
    tech_gender_str: computed('tech_gender', function(){
        if (this.tech_gender == 0) return '女';
        else return '男';
    }),
    tech_gender_male: computed('tech_gender', function(){
        if (this.tech_gender == 0) return false;
        else return true;
    }),
    tech_gender_female: computed('tech_gender', function(){
        if (this.tech_gender == 0) return true;
        else return false;
    }),
    tech_homeland: '',
    tech_contact: '',
    tech_address: '',
    tech_wechat: '',
    // tech_date:'',
    edu_name:'',
    edu_category:'',
    ca_company:'',
    ca_name:'',

    isPushing: false,
    tech_name_length: computed('tech_name', function() {
        return this.get('tech_name').length;
    }),
    tech_nickname_length: computed('tech_nickname', function() {
        return this.get('tech_nickname').length;
    }),
    actions: {
        saveTechBtnClicked() {
            console.log('save tech editing');

            // if (!this.techValidate()) {
            //     alert('必填项不能为空！');
            //     return;
            // }

            let tech = null;
            if (this.isPushing) {
                tech = this.store.createRecord('bmtech', {
                    id: this.guid()
                })
                let per_tech = this.store.createRecord('bmperson', {
                    id: this.guid()
                })
                // let per_edu = this.store.createRecord('bmedu', {
                //     id: this.guid()
                // })
                // let per_carhis = this.store.createRecord('bmcarhis', {
                //     id: this.guid()
                // })
                tech.set('me', per_tech);
                // tech.set('edu', per_edu);
                // tech.set('carhis', per_carhis);
            } else {
                tech = this.model.tech;
            }

            tech.me.set('name', this.tech_name);
            tech.me.set('nickname', this.tech_nickname);
            tech.me.set('gender', this.tech_gender);
            tech.set('homeland', this.tech_homeland);
            tech.me.set('contact', this.tech_contact);
            tech.set('address', this.tech_address);
            tech.me.set('wechat', this.tech_wechat);
            tech.edu.set('name', this.edu_name);
            tech.edu.set('category', this.edu_category);
            // tech.carhis.set('name', this.ca_name);
            // tech.carhis.set('company', this.ca_company);
            // TODO: 其他一些属性的修改

            if (this.isPushing) {
                this.transitionToRoute('tech');
            } else {
                this.transitionToRoute('detail.tech', tech.id);
            }
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
