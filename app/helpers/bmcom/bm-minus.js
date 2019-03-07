import { helper } from '@ember/component/helper';

export function bmcomBmMinus(params/*, hash*/) {
  return parseInt(params[0]) - parseInt(params[1]);
}

export default helper(bmcomBmMinus);
