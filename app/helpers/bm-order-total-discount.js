import { helper } from '@ember/component/helper';

export function bmOrderTotalDiscount(params/*, hash*/) {
    let result = 0;
    params[0].forEach(elem => {
        window.console.log(elem);
        result += elem.get("preferentialPrice");
        window.console.log(result);

    });
    return result;
}

export default helper(bmOrderTotalDiscount);
