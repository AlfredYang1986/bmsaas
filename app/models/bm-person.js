import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  nickname: DS.attr('string'),
  icon: DS.attr('string'),
  gender: DS.attr('number'),
  dob: DS.attr('number',{
      defaultValue() { return new Date().getTime(); }
  }),
  reg_date: DS.attr('date-to-yyyy-mm-dd-hh-mm-ss', {
      defaultValue() { return new Date().getTime(); }
  }),
  address: DS.belongsTo('bm-address', {async: false}),
  // age: DS.attr('number'),
  // contact: DS.attr('string'),
  // wechat: DS.attr('string'),
});
