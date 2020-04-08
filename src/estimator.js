const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const calculator = (number, multiplyBy) => number * multiplyBy;

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;

  const resultIndays = Math.trunc(parseInt(timeToElapse, 10) / 3);
  const resultInWeeks = resultIndays / 2;
  const resultInMonths = resultIndays / 10;

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

covid19ImpactEstimator(data);

export default covid19ImpactEstimator;
