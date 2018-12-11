import { helper } from '@ember/component/helper';

export function bmcomBmPlusOne(params/*, hash*/) {
  return parseInt(params) + 1;
}

export default helper(bmcomBmPlusOne);
