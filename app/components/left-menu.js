import Component from '@ember/component';

export default Component.extend({

    menuList:
        [{
            icon: '../images/email_normal.png',
            title: '收件箱',
            expond: false,
            pageUrl:'inbox'
        },
        {
            icon: '../images/working desk_normal.png',
            title: '工作台',
            expond: false,
            pageUrl:'workBench'
        },
        {
            icon: '../images/activities_normal.png',
            title: '体验开放',
            expond: false,
            pageUrl:'experienceOpen'
        },
        {
            icon: '../images/coursebooking_normal.png',
            title: '课程预约',
            expond: false,
            pageUrl:'courseReserve'
        },
        {
            icon: '../images/office_normal.png',
            title: '教研中心',
            expond: true,
        },
        {
            icon: '../images/management_normal.png',
            title: '管理中心',
            expond: true,
        }
    ]
});
