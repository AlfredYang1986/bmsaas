import { helper } from '@ember/component/helper';

export function bmcomBmNilLength(params/*, hash*/) {
    let tmp = params[0];
    if(tmp != undefined) {
        return tmp.length == 0;
    } else {
        return true;
    }

}

export default helper(bmcomBmNilLength);
