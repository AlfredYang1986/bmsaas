import { helper } from '@ember/component/helper';

export function bmcomBmGet(params/*, hash*/) {
  let fa = params[0];
  let sub = params[1];
  return fa.get(sub);
}

export default helper(bmcomBmGet);
