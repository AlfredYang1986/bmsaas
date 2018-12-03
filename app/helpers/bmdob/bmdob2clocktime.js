import { helper } from '@ember/component/helper';

export function bmdobBmdob2clocktime(params/*, hash*/) {
  let span = params[0];
	let dob = new Date(span);

  // return dob.getHours() + ':' + dob.getMinutes() + ':' + dob.getSeconds();
  return dob.getHours() + ':' + dob.getMinutes();
}

export default helper(bmdobBmdob2clocktime);
