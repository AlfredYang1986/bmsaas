import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.regionSource();
    this.sureBrand();
    this.sureStud();
    this.sureTech();
    this.sureYard();
    this.sureCourse();
    this.sureReserve();
    this.sureActivity();
    this.sureClasses();
    this.sureApplies();
    this.sureClsSession();
  },
  store: service(),
  regionSource() {
    window.console.info('sure regionSource');
    let provinces = ['北京'];
    let citys = ['北京'];
    let governmentArea = ["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]
    provinces.forEach((name, index) => {
      this.store.createRecord('bmprovinces', {
        id: (index + 1),
        name
      })
    });
    citys.forEach((name, index) => {
      this.store.createRecord('bmcitys', {
        id: (index + 1),
        name
      })
    });
    governmentArea.forEach((name, index) => {
      this.store.createRecord('bmgovernment-areas', {
        id: (index + 1),
        name
      })
    })
  },
  sureBrand() {
    window.console.log('sure brand');
    let brand = this.store.peekRecord('bmbrand', 'i am a brand');
    if (brand == null) {
      brand = this.store.createRecord('bmbrand', {
        id: 'i am a brand',
        title: 'PRO科学空间',
        subtitle: '彩色方块的转动中感受魔方的魅力。',
        brand_tags: A(['场景教学', '先进理念', '专业团队']),
        // found_data: '2000年7月',
        found_stroy: 'PRO科学空间是PRO集团高端幼儿教育品牌，专注于3-12岁高端幼少儿STEAM教育，在美国STEAM教育理念基础上，融合了符合中国儿童成长的语言教育，以国际幼少儿英语，数学逻辑思维，STEAM编程课程为主。旨在培养幼少儿的语言思维、创造性思维、空间想象力、逻辑思维、科学精神、动手能力及核心素养。目前在天津、北京、上海、广州、南京、武汉、苏州7个城市设立18个国际学习中心。',
        team_des: 'PRO科学空间拥有强大的师资团队，授课讲师均来自知名企业从事一线科研工作并拥有丰富的项目科研经验。教师团队均获硕士及博士学历并在科研领域行业中从业5年以上 ，我们严格把关教学品质，为孩子的科学教育奠定坚实的基础。'
      })

            let reward01 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 01',
                img_src: '../images/award_00.png',
                reward_des: '2014-全国青少年编程创新大赛'
            })

      reward01.set('bmbrand', brand);

            let reward02 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 02',
                img_src: '../images/award_01@1x.png',
                reward_des: '2014-全国青少年编程创新大赛'
            })

      reward02.set('bmbrand', brand);

            let reward03 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 03',
                img_src: '../images/award_00.png',
                reward_des: '2014-全国青少年编程创新大赛'
            })

      reward03.set('bmbrand', brand);

            let reward04 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 04',
                img_src: '../images/award_01@1x.png',
                reward_des: '2014-全国青少年编程创新大赛'
            })

      reward04.set('bmbrand', brand);

      let fd = this.store.createRecord(('date-format'), {
        id: 'brand found date',
        year: 2000,
        month: 7,
        day: 1
      })

      brand.set('found_date', fd);

      let tmp = A([reward01, reward02, reward03, reward04]);
      brand.set('rewards', tmp);
    }
  },
  sureStud() {
    window.console.log('sure stud');
    let stud_lst = this.store.peekAll('bmstud');
    if (stud_lst.length == 0) {
      // let dob_stud_01 = this.store.createRecord('date-format', {
      //     id: 'i am stud person dob 01',
      //     year: 2016,
      //     month: 7,
      //     day: 1
      // })
      let dob_stud_01 = "2016-07-01";
      let person_stud_01 = this.store.createRecord('bmperson', {
        id: 'i am stud person 01',
        icon: '../images/stud-normal.png',
        name: '王大锤',
        nickname: '锤子',
        age: 4,
        gender: 1,
        contact: '15654732563',
        register_date: new Date(),
      })
      person_stud_01.set('dob', dob_stud_01);
      let stud01 = this.store.createRecord('bmstud', {
        id: 'i am stud 01',
        school: '霍格沃茨'
      })
      stud01.set('me', person_stud_01);

      let person_parent_01 = this.store.createRecord('bmperson', {
        id: 'i am stud parent 01',
        icon: '../images/stud-normal.png',
        name: '王巨锤',
        nickname: '为什么家长需要昵称',
        age: 34,
        gender: 1,
        contact: '13720200856',
        wechat: 'father_BigHam',
        register_date: new Date(),
      })
      let guardian_01 = this.store.createRecord('bmguardian', {
        id: 'i am stud guardian 01',
        rs: '父子',
        address: '天上人间158号'
      })
      stud01.set('guardian', guardian_01);
      guardian_01.set('me', person_parent_01);
      guardian_01.set('guad', stud01);

      let person_urgent_01 = this.store.createRecord('bmperson', {
        id: 'i am stud urgent 01',
        icon: '../images/stud-normal.png',
        name: '王锤子妈',
        nickname: '为什么紧急联系人需要昵称',
        age: 34,
        gender: 1,
        contact: '13720200856',
        wechat: '',
        register_date: new Date(),
      })
      let urgent_01 = this.store.createRecord('bmurgent', {
        id: 'i am stud urgent 01',
        rs: '母子',
        address: '天上人间158号'
      })
      stud01.set('urgent', urgent_01);
      urgent_01.set('me', person_urgent_01);
      urgent_01.set('urg', stud01);

      // let dob_stud_02 = this.store.createRecord('date-format', {
      //     id: 'i am stud person dob 02',
      //     year: 2017,
      //     month: 8,
      //     day: 1
      // })
      let dob_stud_02 = "2017-08-01"
      let person_stud_02 = this.store.createRecord('bmperson', {
        id: 'i am stud person 02',
        icon: '../images/stud-normal.png',
        name: '莫小贝',
        nickname: '贝子',
        age: 3,
        gender: 0,
        contact: '13141326530',
        register_date: new Date(),
      })
      person_stud_02.set('dob', dob_stud_02);
      let stud02 = this.store.createRecord('bmstud', {
        id: 'i am stud 02',
        school: '霍格沃茨'
      })
      stud02.set('me', person_stud_02);

      let person_parent_02 = this.store.createRecord('bmperson', {
        id: 'i am stud parent 02',
        icon: '../images/stud-normal.png',
        name: '莫大老先生',
        nickname: '潇湘夜雨',
        age: 34,
        gender: 1,
        contact: '江湖人物不用电话',
        wechat: 'TheManInJiangHu',
        register_date: new Date(),
      })
      let guardian_02 = this.store.createRecord('bmguardian', {
        id: 'i am stud guardian 02',
        rs: '母子',
        address: '衡山剑派001号'
      })
      stud02.set('guardian', guardian_02);
      guardian_02.set('me', person_parent_02);
      guardian_02.set('guad', stud02);

      let person_urgent_02 = this.store.createRecord('bmperson', {
        id: 'i am stud urgent 02',
        icon: '../images/stud-normal.png',
        name: '衡山的臭尼姑',
        nickname: '为什么紧急联系人需要昵称',
        age: 34,
        gender: 1,
        contact: '13720200856',
        wechat: '',
        register_date: new Date(),
      })
      let urgent_02 = this.store.createRecord('bmurgent', {
        id: 'i am stud urgent 02',
        rs: '母子',
        address: '天上人间158号'
      })
      stud02.set('urgent', urgent_02);
      urgent_02.set('me', person_urgent_02);
      urgent_02.set('urg', stud02);
    }
  },
  sureTech() {
    window.console.log('sure tech');
    let tech_lst = this.store.peekAll('bmtech');
    if (tech_lst.length == 0) {
      let dob_tech_01 = "2011-08-01"
      let person_tech_01 = this.store.createRecord('bmperson', {
        id: 'i am tech person 01',
        icon: '../images/avatar_defautl_96px @1x.png',
        name: '司徒钟',
        nickname: '酒剑仙',
        age: 1004,
        gender: 1,
        contact: '17611245119',
        wechat: '',
        register_date: new Date(),
      })
      person_tech_01.set('dob', dob_tech_01);
      let tech_01 = this.store.createRecord('bmtech', {
        id: 'i am tech 01',
        address: '四川蜀山001',
        homeland: '人间山神庙'
      })
      tech_01.set('me', person_tech_01);

            let dob_tech_02 = "2011-08-01"
            let person_tech_02 = this.store.createRecord('bmperson', {
                id: 'i am tech person 02',
                icon: '../images/avatar_defautl_96px @1x.png',
                name: '李逍遥',
                nickname: '老婆哭哭就到手',
                age: 512,
                gender: 1,
                contact: '17611245119',
                wechat: '',
                register_date: new Date(),
            })
            person_tech_02.set('dob', dob_tech_02);
            let tech_02 = this.store.createRecord('bmtech', {
                id: 'i am tech 02',
                address: '四川蜀山007',
                homeland: '余杭小客栈'
            })
            tech_02.set('me', person_tech_02);
        }
    },
    sureYard() {
        window.console.log('sure yard');
        let yard_lst = this.store.peekAll('bmyard');
        if (yard_lst.length == 0) {
            let yard_01 = this.store.createRecord('bmyard', {
                id: 'i am yard 01',
                title: '乐高少儿建构教室',
                cover: '../images/cover_pic_2.jpeg',
                detail_address: '北京朝阳区东直门外斜街888号',
                description: '我们的场地遵循国际儿童环境友好性标准， 拥有可供孩子们认真学习的向阳空间10余间， 内置丰富的STEM教学用具，供孩子们尽情展现他们的想象力和动手动力， 餐饮区为孩子们准备了多样精美的水果和点心，当然啦！ 我们的餐点也有为来接孩子和参与体验的家长们准备，所有的食物都是用心加工， 保证绝对的干净！娱乐区是孩子们嬉戏玩耍的天堂。 我们将一切的设施家具进行圆角处理，并给予贴心的插图文字提示。 相信孩子们在娱乐区能尽情享受快乐的时光。 我们也有为课后来接送孩子和前来交流的家长们设计舒适的休息区 ～最后期待孩子和您的到来啦！',
                around: '场地距离地铁六号线两站，步行200右转即达。',
                ardes: '你妹的',
                facilities: A(['停车场']),
            });

            let province = this.store.peekRecord('bmprovinces', "1");
            let city = this.store.peekRecord('bmcitys', '1');
            let rg_area_01 = this.store.peekRecord('bmgovernment-areas', "1");
            let rg_area_02 = this.store.peekRecord('bmgovernment-areas', "2");


            let rg_01_01 = this.store.createRecord('bmregion', {
                id: '1',
                province,
                city,
                governmentArea: rg_area_01
            });
            yard_01.set('region', rg_01_01);

            let tg_01_01 = this.store.createRecord('bmtagimg', {
                id: 'tag img 01 01',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '休息区'
            })
            let tg_01_02 = this.store.createRecord('bmtagimg', {
                id: 'tag img 01 02',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '切克瑙'
            })
            yard_01.set('imgs', A([tg_01_01, tg_01_02]));

            let award_01_01 = this.store.createRecord('bmtagimg', {
                id: 'award 01 01',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '什么奖'
            })
            let award_01_02 = this.store.createRecord('bmtagimg', {
                id: 'award 01 02',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '吹牛逼'
            })
            yard_01.set('awards', A([award_01_01, award_01_02]));
            let qualific_01_01 = this.store.createRecord('bmtagimg', {
                id: 'qualific 01 01',
                img_src: '../images/qualification01.png',
                img_tag: '儿童适宜认证'
            })
            yard_01.set('qualifications', A([qualific_01_01]));

            let yard_02 = this.store.createRecord('bmyard', {
                id: 'i am yard 02',
                title: 'PRO科学空间东直门',
                cover: '../images/cover_pic_1.jpg',
                detail_address: '北京朝阳区东直门外斜街1069号',
                description: '我们的场地遵循国际儿童环境友好性标准， 拥有可供孩子们认真学习的向阳空间10余间， 内置丰富的STEM教学用具，供孩子们尽情展现他们的想象力和动手动力， 餐饮区为孩子们准备了多样精美的水果和点心，当然啦！ 我们的餐点也有为来接孩子和参与体验的家长们准备，所有的食物都是用心加工， 保证绝对的干净！娱乐区是孩子们嬉戏玩耍的天堂。 我们将一切的设施家具进行圆角处理，并给予贴心的插图文字提示。 相信孩子们在娱乐区能尽情享受快乐的时光。 我们也有为课后来接送孩子和前来交流的家长们设计舒适的休息区 ～最后期待孩子和您的到来啦！',
                around: '场地距离地铁东直门有1站公交，步行200右转即达。',
                ardes: '东直门',
                facilities: A(['停车场']),
            });

            let rg_01_02 = this.store.createRecord('bmregion', {
                id: '2',
                province,
                city,
                governmentArea: rg_area_02
            })
            yard_02.set('region', rg_01_02);

            let tg_02_01 = this.store.createRecord('bmtagimg', {
                id: 'tag img 02 01',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '休息区'
            })
            let tg_02_02 = this.store.createRecord('bmtagimg', {
                id: 'tag img 02 02',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '哇哇哇'
            })
            yard_02.set('imgs', A([tg_02_01, tg_02_02]));

            let award_02_01 = this.store.createRecord('bmtagimg', {
                id: 'award 02 01',
                img_src: '../images/cover_pic.jpg',
                img_tag: '什么奖'
            })
            let award_02_02 = this.store.createRecord('bmtagimg', {
                id: 'award 02 02',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '吹牛逼'
            })
            yard_02.set('awards', A([award_02_01, award_02_02]));
            let qualific_02_01 = this.store.createRecord('bmtagimg', {
                id: 'qualific 02 01',
                img_src: '../images/qualification01.png',
                img_tag: '儿童适宜认证'
            })
            yard_02.set('qualifications', A([qualific_02_01]));
        }
    },
    sureCourse() {
        window.console.log('sure course');
        let course_lst = this.store.peekAll('bmcourseinfo');
        if (course_lst.length == 0) {
            let course_01 = this.store.createRecord('bmcourseinfo', {
                id: 'i am course 01',
                name: '乐高机器人设计搭建课',
                alb: 6,
                aub: 12,
                count: 30,
                length: 120,
                level: '入门级',
                tags: A(['趣味教学', 'PBL项目教学', '学科乐趣培养']),
                target: '在乐高机器人设计搭建系列课程中，我们将和孩子一起通过简单工具搭建生活中常见的场景和机器人。\n让孩子们探索生活中的细节与乐趣，提升孩子们的逻辑思维能力和综合学科能力，\n同时在创建属于自己的机器人的过程中提高想象力和创造力。\n通过系统的教程对孩子提供各方面培养：动手能力、物理搭建、编程实践、团队合作等。',
                planning: '在乐高机器人设计搭建系列课程中，我们将和孩子一起通过简单工具搭建生活中常见的场景和机器人。\n让孩子们探索生活中的细节与乐趣，提升孩子们的逻辑思维能力和综合学科能力，\n同时在创建属于自己的机器人的过程中提高想象力和创造力。\n通过系统的教程对孩子提供各方面培养：动手能力、物理搭建、编程实践、团队合作等。\n通过系统的教程对孩子提供各方面培养：动手能力、物理搭建、编程实践、团队合作等。\n',
                ccontent: '由PRO科技空间的负责人刘美老师为家长和孩子们介绍乐高公益体验活动的流程及如何正确引导孩子认识乐高积木的要点。我们的课程将会分为三大阶段，面向对于乐高机器人搭建感兴趣的学员以及想要参加VEX及VEX-IQ各地区赛事的学员。\n基础的编程，全面了解ROBOTC，虚拟世界，深入学习复杂语句及其组合，以教学基础为载体，学会各种VEX-IQ 各种基本语句传感器的用法。掌握Arduino IDE 编程基本语句，通过XB硬件以及各种传感器，学习各种基本语句，加深对编程的理解。\n学习乐高WeDo2.0、EV3核心套件，完成从基础到高阶学习，可以独立搭建复杂机械机构，学习使用ROBOTC语言编程，设计物理、变量等高级知识。学习使用ARM核智能硬件开发套件。基于ARM Cortex-M4核智能硬件开发套件平台，结合舵机等打造人工智能机器人，用C/C++语言编程。综合锻炼，通过各种挑战，掌握复杂语句的编写。开放式、自由式的学习环境，培养孩子们的各种能力，为各种机器人比赛以及创客培养打下基础。',
            })
            let tag_01_01 = this.store.createRecord('bmtagimg', {
                id: 'course 01 01',
                img_src: '../images/course_tmp_img_01.png',
                img_tag: '吹牛逼'
            })
            let tag_01_02 = this.store.createRecord('bmtagimg', {
                id: 'course 01 02',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '继续'
            })
            let tag_01_03 = this.store.createRecord('bmtagimg', {
                id: 'course 01 03',
                img_src: '../images/cover_pic_2.jpeg',
                img_tag: '最终'
            })
            let cat_01 = this.store.createRecord('bmcat', {
                id: 'course cat 01',
                cat: '科学',
                sub: 'STEAM'
            })
            course_01.set('category', cat_01);
            course_01.set('imgs', A([tag_01_01, tag_01_02, tag_01_03]));

      let course_02 = this.store.createRecord('bmcourseinfo', {
        id: 'i am course 02',
        name: 'Python机器人',
        alb: 6,
        aub: 12,
        count: 60,
        length: 90,
        level: '入门级',
        tags: A(['趣味教学', 'PBL项目教学', '学科乐趣培养']),
        target: '在乐高机器人设计搭建系列课程中，我们将和孩子一起通过简单工具搭建生活中常见的场景和机器人。\n让孩子们探索生活中的细节与乐趣，提升孩子们的逻辑思维能力和综合学科能力，\n同时在创建属于自己的机器人的过程中提高想象力和创造力。\n通过系统的教程对孩子提供各方面培养：动手能力、物理搭建、编程实践、团队合作等。',
        planning: '在乐高机器人设计搭建系列课程中，我们将和孩子一起通过简单工具搭建生活中常见的场景和机器人。\n让孩子们探索生活中的细节与乐趣，提升孩子们的逻辑思维能力和综合学科能力，\n同时在创建属于自己的机器人的过程中提高想象力和创造力。\n通过系统的教程对孩子提供各方面培养：动手能力、物理搭建、编程实践、团队合作等。\n通过系统的教程对孩子提供各方面培养：动手能力、物理搭建、编程实践、团队合作等。\n',
        ccontent: '由PRO科技空间的负责人刘美老师为家长和孩子们介绍乐高公益体验活动的流程及如何正确引导孩子认识乐高积木的要点。我们的课程将会分为三大阶段，面向对于乐高机器人搭建感兴趣的学员以及想要参加VEX及VEX-IQ各地区赛事的学员。\n基础的编程，全面了解ROBOTC，虚拟世界，深入学习复杂语句及其组合，以教学基础为载体，学会各种VEX-IQ 各种基本语句传感器的用法。掌握Arduino IDE 编程基本语句，通过XB硬件以及各种传感器，学习各种基本语句，加深对编程的理解。\n学习乐高WeDo2.0、EV3核心套件，完成从基础到高阶学习，可以独立搭建复杂机械机构，学习使用ROBOTC语言编程，设计物理、变量等高级知识。学习使用ARM核智能硬件开发套件。基于ARM Cortex-M4核智能硬件开发套件平台，结合舵机等打造人工智能机器人，用C/C++语言编程。综合锻炼，通过各种挑战，掌握复杂语句的编写。开放式、自由式的学习环境，培养孩子们的各种能力，为各种机器人比赛以及创客培养打下基础。',
      })
      let tag_02_01 = this.store.createRecord('bmtagimg', {
        id: 'course 02 01',
        img_src: '../images/course_tmp_img_02.jpg',
        img_tag: '吃'
      })
      let tag_02_02 = this.store.createRecord('bmtagimg', {
        id: 'course 02 02',
        img_src: '../images/cover_pic_2.jpeg',
        img_tag: '碰'
      })
      let tag_02_03 = this.store.createRecord('bmtagimg', {
        id: 'course 02 03',
        img_src: '../images/cover_pic_2.jpeg',
        img_tag: '糊了'
      })
      let cat_02 = this.store.createRecord('bmcat', {
        id: 'course cat 02',
        cat: '运动',
        sub: '球球'
      })
      course_02.set('category', cat_02);
      course_02.set('imgs', A([tag_02_01, tag_02_02, tag_02_03]));
    }
  },
  sureReserve() {
    console.log('sure reserve');
    let reserve_lst = this.store.peekAll('bmreservable');
    if (reserve_lst.length == 0) {
      this.sureCourse();
      let reserve = this.store.createRecord('bmreservable', {
        id: 'i am reserve 01',
        start: new Date("2018-10-25"),
        end: new Date("2018-11-10"),
      })
      let course = this.store.peekRecord('bmcourseinfo', 'i am course 01');
      reserve.set('course', course);
      course.set('reserve', A([reserve]));
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
        description: '辟邪剑法，独霸一方，欲练神功，必先自宫',
        planning: '集体统一切小鸡鸡',
        ccontent: '看孩子切',
        gains: ['绝世武功', '天下第一'],
        cover: '../images/cover_pic_2.jpeg',
        offered: ['咖啡'],
        needed: ['衣服'],
        notice: '消息提醒'
      })
      let act_img_01_01 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 01 01',
        img_src: '../images/cover_pic_2.jpeg',
        img_tag: '扯鸡巴蛋'
      })
      let act_img_01_02 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 01 02',
        img_src: '../images/cover_pic_2.jpeg',
        img_tag: '扯鸡巴蛋'
      })
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
        ccontent: '看孩子切',
        gains: ['绝世武功', '天下第一'],
        cover: '../images/cover_pic_2.jpeg',
        offered: ['咖啡'],
        needed: ['衣服'],
        notice: '消息提醒'
      })
      let act_img_02_01 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 02 01',
        img_src: '../images/cover_pic_2.jpeg',
        img_tag: '扯鸡巴蛋'
      })
      let act_img_02_02 = this.store.createRecord('bmtagimg', {
        id: 'i am act img 02 02',
        img_src: '../images/cover_pic_2.jpeg',
        img_tag: '扯鸡巴蛋'
      })
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

      let attendee_01 = this.store.createRecord('bmperson', {
        id: 'i am person attendee 01',
        icon: '../images/stud-normal.png',
        name: '刘备',
        nickname: '织席小儿',
        age: 1600,
        gender: 1,
        contact: '(蜀汉) 13720200856',
        register_date: new Date(),
      });

      let applyee_01 = this.store.createRecord('bmperson', {
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

      let attendee_02 = this.store.createRecord('bmperson', {
        id: 'i am person attendee 02',
        icon: '../images/stud-normal.png',
        name: '关羽',
        nickname: '武圣',
        age: 1600,
        gender: 1,
        contact: '(蜀汉) 13720200856',
        register_date: new Date(),
      });

      let applyee_02 = this.store.createRecord('bmperson', {
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
  }
});
