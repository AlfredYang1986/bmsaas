import { helper } from '@ember/component/helper';

export function bmdobformat(params/*, hash*/) {
  let date = params[0];
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  return yy + '-' + mm + '-' + dd;
}

export default helper(bmdobformat);
