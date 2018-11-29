import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.regionSource();
  },
  store: service(),
  regionSource() {
    let tmp = this.store.peekAll('bmprovinces');
    if (tmp.length == 0) {
      window.console.info('sure regionSource');
      let provinces = ['北京'];
      let citys = ['北京市'];
      let governmentArea = ["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]
      provinces.forEach((name, index) => {
        this.store.createRecord('bmprovinces', {
          id: (index + 1),
          name: name
        })
      });
      citys.forEach((name, index) => {
        this.store.createRecord('bmcitys', {
          id: (index + 1),
          name: name
        })
      });
      governmentArea.forEach((name, index) => {
        this.store.createRecord('bmgovernment-areas', {
          id: (index + 1),
          name: name
        })
      })
    }
  },

  queryNotReservableCourse() {
    console.log('sure not reserve course');
    let lst = this.store.peekAll('bmcourseinfo');
    if (lst.length == 0) {
      this.sureCourse();
      this.sureReserve();
      return this.queryNotReservableCourse();
    }

    function notReserveCondition(course) {
      let condi = course.get('reserve');
      return condi == null || condi.length == 0;
    }

    return lst.filter(notReserveCondition);
  },
  sureActivity() {
    console.log('sure activity');
    let acts = this.store.peekAll('bmactivityinfo')
    if (acts.length == 0) {
      let act_01 = this.store.createRecord('bmactivityinfo', {
        id: 'i am activity 01',
        cat: '体验',
        name: '剑法体验课',
        alb: 3,
        aub: 9,
        length: 90,
        description: '辟邪剑法，独霸一方，独孤九剑，无招胜有招',
        planning: '天下武功，唯快不破，如何能快，无非料敌先机，后发先至尔',
        ccontent: '化无法为有法，以有限为为无限，是以武术最高境界',
        gains: ['绝世武功', '天下第一'],
        cover: '../images/img_act_tmp_00.jpg',
        offered: ['咖啡'],
        needed: ['衣服'],
        notice: '消息提醒'
      })
      let act_img_01_01 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 01 01',
        img_src: '../images/img_act_tmp_01.jpg',
        img_tag: '图片01'
      })
      let act_img_01_02 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 01 02',
        img_src: '../images/img_act_tmp_02.jpg',
        img_tag: '图片02'
      })
      // let act_img_01_03 = this.store.createRecord('bmtagimg', {
      //   id: 'i am act img 01 03',
      //   img_src: '../images/img_act_tmp_02.jpg',
      //   img_tag: '扯鸡巴蛋'
      // })

      act_01.set('imgs', A([act_img_01_01, act_img_01_02]))
      let fee_01 = this.store.createRecord('bmprice', {
        id: 'i am price 01',
        amount: 123,
        description: ''
      })
      act_01.set('fee', fee_01);

      let period_01_01 = this.store.createRecord('bmactperiod', {
        id: 'i am period 01 01',
        start_date: new Date('2018-10-01'),
        end_date: new Date('2018-11-11'),
        can_register: 1,
        register_date: new Date('2018-11-11'),
        limits: 30,
      })
      let yard_01_01 = this.store.peekRecord('bmyard', 'i am yard 01');
      period_01_01.set('yard', yard_01_01);

      let period_01_02 = this.store.createRecord('bmactperiod', {
        id: 'i am period 01 02',
        start_date: new Date('2018-10-01'),
        end_date: new Date('2018-11-11'),
        can_register: 0,
        register_date: new Date('2018-11-11'),
        limits: 30,
      })
      let yard_01_02 = this.store.peekRecord('bmyard', 'i am yard 02');
      period_01_02.set('yard', yard_01_02);
      act_01.set('periods', A([period_01_01, period_01_02]));

      let act_02 = this.store.createRecord('bmactivityinfo', {
        id: 'i am activity 02',
        cat: '体验',
        name: '风云体验',
        alb: 3,
        aub: 9,
        length: 90,
        description: '麒麟岂是池中物，一遇风云便化龙，九霄龙吟惊天变，风云际会浅水游。',
        planning: '天霜拳，排云掌，风神腿',
        ccontent: '和孩子一起练，三分归元气',
        gains: ['绝世武功', '天下第一'],
        cover: '../images/img_act_tmp_01.jpg',
        offered: ['咖啡'],
        needed: ['衣服'],
        notice: '消息提醒'
      })
      let act_img_02_01 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 02 01',
        img_src: '../images/img_act_tmp_01.jpg',
        img_tag: '图片01'
      })
      let act_img_02_02 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 02 02',
        img_src: '../images/img_act_tmp_00.jpg',
        img_tag: '图片00'
      })
      // let act_img_02_03 = this.store.createRecord('bmtagimg', {
      //   id: 'i am act img 02 03',
      //   img_src: '../images/img_act_tmp_02.jpeg',
      //   img_tag: '扯鸡巴蛋'
      // })

      act_02.set('imgs', A([act_img_02_01, act_img_02_02]))
      let fee_02 = this.store.createRecord('bmprice', {
        id: 'i am price 02',
        amount: 321,
        description: ''
      })
      act_02.set('fee', fee_02);

      let period_02_01 = this.store.createRecord('bmactperiod', {
        id: 'i am period 02 01',
        start_date: new Date('2018-10-01'),
        end_date: new Date('2018-11-11'),
        can_register: 1,
        register_date: new Date('2018-11-11'),
        limits: 60,
      })
      let yard_02_01 = this.store.peekRecord('bmyard', 'i am yard 01');
      period_02_01.set('yard', yard_02_01);

      act_02.set('periods', A([period_02_01]));
    }
  },
  sureClasses() {
    console.log('sure classes');
    let cls = this.store.peekAll('bmclass')
    if (cls.length == 0) {
      let cls_01 = this.store.createRecord('bmclass', {
        id: 'i am class 01',
        name: '传说中的天外飞仙'
      })
      let course_01 = this.store.peekRecord('bmcourseinfo', 'i am course 01');
      let yard_01 = this.store.peekRecord('bmyard', 'i am yard 01');
      cls_01.set('course', course_01);
      cls_01.set('yard', yard_01);

      let tech = this.store.peekRecord('bmtech', 'i am tech 01');
      cls_01.set('tech', A([tech]));
    }
  },
  sureApplies() {
    console.log('sure applies');
    let applies = this.store.peekAll('bmapply');
    if (applies.length == 0) {
      let apply_01 = this.store.createRecord('bmapply', {
        id: 'i am apply 01',
        status: 0,
        apply_date: new Date(),
      })
      let yard_01 = this.store.peekRecord('bmyard', 'i am yard 01');
      let course_01 = this.store.peekRecord('bmcourseinfo', 'i am course 01');
      apply_01.set('apply_yard', yard_01);
      apply_01.set('apply_course', course_01);

      let attendee_01 = this.store.createRecord('BmPerson', {
        id: 'i am person attendee 01',
        icon: '../images/stud-normal.png',
        name: '刘备',
        nickname: '织席小儿',
        age: 1600,
        gender: 1,
        contact: '(蜀汉) 13720200856',
        register_date: new Date(),
        dob: new Date('184-01-01')
      });

      let applyee_01 = this.store.createRecord('BmPerson', {
        id: 'i am person applyee 01',
        icon: '../images/stud-normal.png',
        name: '刘邦',
        nickname: '流氓邦',
        age: 2000,
        gender: 1,
        contact: '(大汉) 17611245119',
        register_date: new Date(),
      })

      apply_01.set('attendee', A([attendee_01]));
      apply_01.set('applyee', applyee_01);

      let apply_02 = this.store.createRecord('bmapply', {
        id: 'i am apply 02',
        status: 0,
        apply_date: new Date(),
      })
      let yard_02 = this.store.peekRecord('bmyard', 'i am yard 02');
      let activity_02 = this.store.peekRecord('bmactivityinfo', 'i am activity 02');
      apply_02.set('apply_yard', yard_02);
      apply_02.set('apply_activity', activity_02);

      let attendee_02 = this.store.createRecord('BmPerson', {
        id: 'i am person attendee 02',
        icon: '../images/stud-normal.png',
        name: '关羽',
        nickname: '武圣',
        age: 1600,
        gender: 1,
        contact: '(蜀汉) 13720200856',
        register_date: new Date(),
        dob: new Date('189-01-01')
      });

      let applyee_02 = this.store.createRecord('BmPerson', {
        id: 'i am person applyee 02',
        icon: '../images/stud-normal.png',
        name: '秦琼',
        nickname: '十三太保',
        age: 1000,
        gender: 1,
        contact: '(大唐) 17611245119',
        register_date: new Date(),
      })

      apply_02.set('attendee', A([attendee_02]));
      apply_02.set('applyee', applyee_02);
    }
  },
  courseCandi() {
    return this.store.peekAll('bmreservable');
  },
  yardCondi() {
    return this.store.peekAll('bmyard');
  },
  activityCandi() {
    return this.store.peekAll('bmactivityinfo');
  },
  sessionCandi(actid) {
    if (actid == null) {
      return []
    } else {
      let act = this.store.peekRecord('bmactivityinfo', actid);
      return act.periods;
    }
  },
  todayApplies() {
    let applies = this.store.peekAll('bmapply');

    function filterTodayCondi(course) {
      let condi = course.get('apply_date');
      let d = new Date();

      return condi.getFullYear() == d.getFullYear() && condi.getMonth() == d.getMonth() && condi.getDate() == d.getDate()
    }

    return applies.filter(filterTodayCondi)
  },
  olderApplies() {
    let applies = this.store.peekAll('bmapply');

    function filterOlderCondi(course) {
      let condi = course.get('apply_date');
      let d = new Date();

      return condi.getFullYear() != d.getFullYear() || condi.getMonth() != d.getMonth() || condi.getDate() != d.getDate()
    }

    return applies.filter(filterOlderCondi)
  },
  queryAllTech() {
    return this.store.peekAll('bmtech');
  },
  queryAllStud() {
    return this.store.peekAll('bmstud');
  },
  queryAllYard() {
    return this.store.peekAll('bmyard');
  },
  queryAllCourse() {
    return this.store.peekAll('bmcourseinfo');
  },
  queryUnhandled() {
    let applies = this.store.peekAll('bmapply');

    function unhandledCondi(app) {
      let condi = app.get('status');
      return condi == 0;
    }
    return applies.filter(unhandledCondi).length;
  },
  sureClsSession() {
    let ses = this.store.peekAll('bmclssession');
    if (ses.length == 0) {
      let ses_01 = this.store.createRecord('bmclssession', {
        id: 'i am cls session 01',
        start_date: new Date('2018-10-29 08:00'),
        length: 120,
      })
      let tech = this.store.peekRecord('bmtech', 'i am tech 01');
      ses_01.set('tech', tech)
      let cls = this.store.peekRecord('bmclass', 'i am class 01');
      ses_01.set('cls', cls);
    }
  },
  queryCateCandidateExp() {
    return A(['数理与逻辑', '语⾔与⼈⽂']);
  },
  queryCateCandidateActv() {
    return A(['展览', '工作坊', '游乐场', '赛事', '亲子', '演出', '讲座', '公益', '户外教学', '其他']);
  },
  querySubCatCondidate(cat) {
    if (cat == '科学') {
        return A(['STEM', 'python']);
    } else if (cat == '运动') {
        return A(['足球', '篮球']);
	} else if (cat == '艺术') {
		return A(['画画', '唱歌']);
	} else {
		return A();
	}
  }
});
