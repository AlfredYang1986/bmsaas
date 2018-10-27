import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    chd_name: '',
    chd_nickname: '',
    chd_gender: 0,
    chd_gender_str: computed('chd_gender', function(){
        if (this.chd_gender == 0) return '女';
        else return '男';
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

    actions: {
        saveInputBtnClicked () {
            console.log('save the date');
            this.model.stud.me.set('name', this.chd_name);
            // TODO: 其他的一些属性的修改都在这里解决

            this.transitionToRoute('detail.stud', this.model.stud.id);
        }
    }
});
