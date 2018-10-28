import { helper } from '@ember/component/helper';

export function bmperiodopen(params/*, hash*/) {
  let period = params[0];
  let cans = period.get('can_register');
  return cans != null && cans > 0;
}

export default helper(bmperiodopen);
