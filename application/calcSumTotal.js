import { calcSum, calcTotal } from "../domain/markTable.js";

export function calcSumTotal(mark, coe, sums) {
    const sum = calcSum(mark, coe);
    const total = calcTotal(sums.concat(sum));

    return { sum: sum, total: total };
}