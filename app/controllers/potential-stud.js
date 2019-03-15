import Controller from '@ember/controller';

export default Controller.extend({
    showAddSessionDlg: false,
    codeImg: 'http://bmsass.oss-cn-beijing.aliyuncs.com/ef94a04d-5874-e2b9-bbab-9d7b15028736?OSSAccessKeyId=LTAINO7wSDoWJRfN&Expires=1552620975&Signature=XcDIa5b%2Beq3htBlb%2BUG%2FVTcWpT0%3D',
    actions: {
        successHandled() {

        },
        cancelHandled() {
            this.set('showAddSessionDlg', false)
        }
    }
});
