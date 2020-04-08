const calculator = (number, multiplyBy) => number * multiplyBy;

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;

  const resultIndays = Math.trunc(parseInt(timeToElapse, 10) / 3);
  const resultInWeeks = Math.trunc((timeToElapse * 7) / 3);
  const resultInMonths = Math.trunc((timeToElapse * 30) / 3);

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

    return {
      input,
      impact: {
        currentlyInfected,
        infectionsByRequestedTime: infectionsByWeeks
      },
      severeImpact: {
        currentlyInfected: severeCurrentlyInfected,
        infectionsByRequestedTime: severeIRTWeeks
      }
    };
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

    return {
      input,
      impact: {
        currentlyInfected,
        infectionsByRequestedTime: infectionsByMonths
      },
      severeImpact: {
        currentlyInfected: severeCurrentlyInfected,
        infectionsByRequestedTime: severeIRTMonths
      }
    };
  }

  return {
    input,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeIRT
    }
  };
};

export default covid19ImpactEstimator;
