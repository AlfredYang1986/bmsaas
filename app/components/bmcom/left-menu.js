import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({

    menuList:
        A([{
            icon: '/images/navbar_inbox_normal@2x.png',
            title: '收件箱',
            expond: false,
            pageUrl:'inbox',
        },
        {
            icon: '/images/icon_dashboard_normal@1x.png',
            title: '学生管理',
            expond: false,
            pageUrl:'stud',
        },
        {
            icon: '/images/navbar_activity_normal@2x.png',
            title: '营销管理',
            expond: true,
        },
        {
            icon: '/images/navbar_teach_normal@2x.png',
            title: '教学中心',
            expond: true,
        },
        {
            icon: '/images/navbar_management_normal@2x.png',
            title: '管理中心',
            expond: true,
        }
    ])
});
