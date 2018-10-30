import { helper } from '@ember/component/helper';

export function bmnormaldate(params/*, hash*/) {
  let tmp = params[0];
  return tmp.getFullYear() + '/' + (tmp.getMonth() + 1) + '/' + tmp.getDate();
}

export default helper(bmnormaldate);
