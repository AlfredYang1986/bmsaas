import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    bm_pt_stud_service: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    showAddSelect: false,
    showAddStud: false,
    inputVal: false,
    studList: false,
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女']),
    relaChecked: A(['父亲', '母亲', '其他']),
    grade:A([{name: '学龄前'}, {name: '小班'}, {name: '中班'}, {name: '大班'}, {name: '小学一年级'}, {name: '小学二年级'}, {name: '小学三年级'}, {name: '小学四年级'}, {name: '小学五年级'}, {name: '小学六年级'}]),
    type: '',
    contact: '',
    studs: computed("refreshFlag", 'type', function() {
        let result;
        let that = this;
        result = this.store.query('student', {'contact': this.contact});
        result.then((res) => {
            if(res.length > 0) {
                that.set('inputVal', true);
            } else {
                that.set('showAddSelect', true)
            }
        }, error => {
            this.bm_error_service.handleError(error)
        })
        return result;
    }),
    sex: computed('sex_idx', function() {
        if(this.sex_idx == 1) {
            this.model.stud.set('gender', 0);
        } else {
            this.model.stud.set('gender', 1);
        }
    }),

    rela: computed('rela_idx', function() {
        if(this.model.stud.guardians.length > 0) {
            if(this.rela_idx == 0) {
                this.model.stud.guardians.objectAt(0).set("relationShip", "爸爸")
            } else if(this.rela_idx == 1) {
                this.model.stud.guardians.objectAt(0).set("relationShip", '妈妈')
            } else {
                this.model.stud.guardians.objectAt(0).set("relationShip", '其他')
            }
        }
    }),
    actions: {
        closeProcess() {
            this.transitionToRoute('potential-stud')
        },
        successHandled() {
            this.set('showAddSelect', false);
            this.set('showAddStud', true);
        },
        cancelHandled() {
            this.set('showAddSelect', false)
        },
        cancelAdd() {
            this.set('showAddStud', false)
        },
        successAdd() {
            let that = this;
            let ptname = this.model.stud.name;
            let ptgender = this.model.stud.gender;
            let ptschool = this.model.stud.school;
            let ptgrade = this.model.stud.grade;
            let ptdob = this.model.stud.dob;
            let ptgn = this.model.stud.guardians.objectAt(0).name;
            let ptcontact = this.model.stud.guardians.objectAt(0).contact;
            let ptrs = this.model.stud.guardians.objectAt(0).relationShip;
            if(ptname == '') {
                that.toast.error('', '请填写孩子姓名', that.toastOptions);
            } else if(ptgn == '') {
                that.toast.error('', '请填写家长姓名', that.toastOptions);
            } else if(ptcontact == '') {
                that.toast.error('', '请填写正确的联系方式', that.toastOptions);
            } else {
                this.bm_pt_stud_service.savePtStud(ptname, ptgender, ptschool, ptgrade, ptdob, ptgn, ptcontact, ptrs).then(() => {
                    that.transitionToRoute('potential-stud');
                    that.toast.success('', '添加成功', that.toastOptions);
                })
            }


            // if(this.model.stud.gender == undefined || this.model.stud.gender == null) {
            //     that.model.stud.set('gender', 1);
            // }
            //
            // for(let idx = 0;idx < that.model.stud.guardians.length;idx++) {
            //     that.model.stud.guardians.objectAt(idx).save().then(() => {
            //
            //     }, error => {
            //         that.bm_error_service.handleError(error)
            //     })
            // }
            // let name = that.model.stud.name;
            // let dob = new Date(that.model.stud.dob);
            // let now = new Date();
            // function dealDate(date) {
            //     var year = date.getFullYear();
            //     var month = date.getMonth() + 1;
            //     var strDate = date.getDate();
            //     var week = date.getDay();
            //     var hour = date.getHours();
            //     var minute = date.getMinutes();
            //     function addZero(m) {
            //        return m < 10 ? '0' + m : m;
            //     }
            //     let dealDate = year + '-' + addZero(month) + '-' + (strDate);
            //     return dealDate
            // }
            // let dealDob = dealDate(dob);
            // let dealNow = dealDate(now);
            // if( name == '' || name == undefined || name.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
            //     that.toast.error('', '孩子姓名不能为空', that.toastOptions);
            // } else if(dealDob == dealNow) {
            //     that.toast.error('', '请选择正确的出生日期', that.toastOptions);
            // } else {
            //     that.model.stud.set('status', 0);
            //     that.model.stud.save().then(() => {
            //         if(that.model.stud.guardians.firstObject.relationShip == '') {
            //             that.model.stud.guardians.objectAt(0).set("relationShip", '爸爸')
            //         }
            //         that.transitionToRoute('potential-stud')
            //     }, error => {
            //         that.bm_error_service.handleError(error)
            //     })
            //     // .catch(err => window.console.info(err))
            // }
        },
        addPtStudModal() {
            this.set('showAddStud', true);
        },
        searchStud() {
            this.toggleProperty('refreshFlag');
            this.set('studList', true);
        },
        radioChange(param) {
            let that = this;
            let stud = param;
            if(stud.gender == undefined || stud.gender == null) {
                stud.set('gender', 1);
            }
            stud.set('status', 0);
            stud.save().then(() => {
                // if(stud.guardians.firstObject.relationShip == '') {
                //     that.model.stud.guardians.objectAt(0).set("relationShip", '爸爸')
                // }
                that.transitionToRoute('potential-stud')
            }, error => {
                that.bm_error_service.handleError(error)
            })

        }
    }
});
