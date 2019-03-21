import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
    showAddSessionDlg: false,
    codeImg: 'http://bmsass.oss-cn-beijing.aliyuncs.com/ef94a04d-5874-e2b9-bbab-9d7b15028736?OSSAccessKeyId=LTAINO7wSDoWJRfN&Expires=1552620975&Signature=XcDIa5b%2Beq3htBlb%2BUG%2FVTcWpT0%3D',
    studTitle: A(['姓名'], ['联系电话'], ['性别'], ['年龄'], ['家长称呼'], ['创建时间'], ['操作']),
    refreshFlag: false,
    type: '',
    contact: '',
    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('students'));
    }),
    actions: {
        successHandled() {
            this.set('showAddSessionDlg', false)
            this.transitionToRoute('edit.potential-stud')
        },
        cancelHandled() {
            this.set('showAddSessionDlg', false)
        },
        searchStud() {
            this.set('type', 'searchName')
            this.toggleProperty('refreshFlag')
        },
        refreshDataComplete(page) {
            this.set('page_count', page)
        }
    }
});
