const calculator = (number, multiplyBy) => number * multiplyBy;

const result = (duration, durationType) => {
  if (durationType === 'days') {
    return Math.trunc(parseInt(duration, 10) / 3);
  }
  if (durationType === 'weeks') {
    return Math.trunc((parseInt(duration, 10) * 7) / 3);
  }
  if (durationType === 'months') {
    return Math.trunc((parseInt(duration, 10) * 30) / 3);
  }
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;

  const resultIndays = result(timeToElapse, 'days');
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

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

covid19ImpactEstimator(data);
// export default covid19ImpactEstimator;
