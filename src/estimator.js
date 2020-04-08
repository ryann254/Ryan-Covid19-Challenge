const calculator = (number, multiplyBy) => number * multiplyBy;

const result = (duration, durationType) => {
  if (durationType === 'weeks') {
    return Math.trunc((parseInt(duration, 10) * 7) / 3);
  }
  if (durationType === 'months') {
    return Math.trunc((parseInt(duration, 10) * 30) / 3);
  }

  return Math.trunc(parseInt(duration, 10) / 3);
};

function returnFunction(
  firstField,
  impactFirstField,
  impactSecondField,
  severeFirstField,
  severeSecondField
) {
  return {
    input: firstField,
    impact: {
      currentlyInfected: impactFirstField,
      infectionsByRequestedTime: impactSecondField
    },
    severeImpact: {
      currentlyInfected: severeFirstField,
      infectionsByRequestedTime: severeSecondField
    }
  };
}

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;

  const resultIndays = result(timeToElapse);
  const resultInWeeks = result(timeToElapse, 'weeks');
  const resultInMonths = result(timeToElapse, 'months');

  const currentlyInfected = calculator(reportedCases, 10);
  const severeCurrentlyInfected = calculator(reportedCases, 50);
  const infectionsByRequestedTime = calculator(
    currentlyInfected,
    2 ** resultIndays
  );
  const severeIRT = calculator(severeCurrentlyInfected, 2 ** resultIndays);

  if (periodType === 'weeks') {
    const infectionsByWeeks = calculator(currentlyInfected, 2 ** resultInWeeks);
    const severeIRTWeeks = calculator(
      severeCurrentlyInfected,
      2 ** resultInWeeks
    );

    return returnFunction(
      input,
      currentlyInfected,
      infectionsByWeeks,
      severeCurrentlyInfected,
      severeIRTWeeks
    );
  }
  if (periodType === 'months') {
    const infectionsByMonths = calculator(
      currentlyInfected,
      2 ** resultInMonths
    );
    const severeIRTMonths = calculator(
      severeCurrentlyInfected,
      2 ** resultInMonths
    );

    return returnFunction(
      input,
      currentlyInfected,
      infectionsByMonths,
      severeCurrentlyInfected,
      severeIRTMonths
    );
  }

  return returnFunction(
    input,
    currentlyInfected,
    infectionsByRequestedTime,
    severeCurrentlyInfected,
    severeIRT
  );
};

export default covid19ImpactEstimator;
