import Component from '@ember/component';

export default Component.extend({

    menuList:
        [{
            icon: '/images/navbar_inbox_normal@2x.png',
            title: '收件箱',
            expond: false,
            pageUrl:'inbox',
            isInbox: true,
        },
        {
            icon: '/images/icon_dashboard_normal@1x.png',
            title: '工作台',
            expond: false,
            pageUrl:'home',
            isSpace: true,
        },

        {
            icon: '/images/navbar_booking_normal@2x.png',
            title: '活动',
            expond: false,
            pageUrl:'actv',

        },
        {
            icon: '/images/navbar_activity_normal@2x.png',
            title: '体验课',
            expond: false,
            pageUrl:'exp',
            isSpace: true,
        },

        {
            icon: '/images/navbar_teach_normal@2x.png',
            title: '教学中心',
            expond: true,
        },
        {
            icon: '/images/navbar_management_normal@2x.png',
            title: '管理',
            expond: true,
        }
    ]
});
