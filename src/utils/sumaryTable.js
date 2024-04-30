export const createSumaryTable = (goals, sales, mistakes) => {
  const table = [];
  for (let goal of goals) {
    const obj = {};
    obj['date'] = goal.date;
    obj['value'] = sales.reduce((accumulator, sale) => {
      if (sale.date == goal.date) {
        accumulator += sale.value;
      }
      return accumulator;
    }, 0);
    obj['goal'] = goal.value_goal;
    obj['profitloss'] = obj['value'] - obj['goal'];
    obj['transactions_goal'] = goal.transaction_goal;
    obj['transactions'] = sales.reduce((accumulator, sale) => {
      if (sale.date == goal.date) {
        accumulator += sale.transaction;
      }
      return accumulator;
    }, 0);
    obj['at_goal'] = goal.value_goal / goal.transaction_goal;
    obj['at'] = Number((obj['value'] / obj['transactions']).toFixed(2));
    obj['food_attach_goal'] = goal.food_attach_goal;
    obj['food_attach'] =
      sales.reduce((accumulator, sale) => {
        if (sale.date == goal.date) {
          accumulator += sale.food_attach * sale.value;
        }
        return accumulator;
      }, 0) / obj['value'];
    obj['addons_goal'] = goal.addons_goal;
    obj['addons'] =
      sales.reduce((accumulator, sale) => {
        if (sale.date == goal.date) {
          accumulator += sale.addons * sale.value;
        }
        return accumulator;
      }, 0) / obj['value'];
    obj['mistake'] = mistakes.reduce((accumulator, mistake) => {
      if (mistake.date == goal.date) {
        accumulator += mistake.value;
      }
      return accumulator;
    }, 0);
    table.push(obj);
  }

  return table.filter(sale => {
    return sale.value > 0;
  });
};
