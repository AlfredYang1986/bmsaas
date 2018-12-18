import { helper } from '@ember/component/helper';

export function bmdobBmdob2clocktime(params/*, hash*/) {
  let span = params[0];
	let dob = new Date(span);

  return (dob.getHours() < 10 ? '0' + dob.getHours() : dob.getHours()) + ':' + (dob.getMinutes() < 10 ? '0' + dob.getMinutes() : dob.getMinutes());
}

export default helper(bmdobBmdob2clocktime);
