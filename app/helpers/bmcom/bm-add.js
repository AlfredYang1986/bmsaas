import { helper } from '@ember/component/helper';

export function bmcomBmAdd(params/*, hash*/) {
  return parseInt(params[0]) + parseInt(params[1]);
}

export default helper(bmcomBmAdd);
