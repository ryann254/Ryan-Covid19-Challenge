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

const covid19ImpactEstimator = (input) => {
  const { reportedCases, periodType } = input;

  const currentlyInfected = calculator(reportedCases, 10);
  const severeCurrentlyInfected = calculator(reportedCases, 50);

  if (periodType === 'days') {
    const infectionsByRequestedTime = Math.trunc(
      calculator(currentlyInfected, 2 / 3)
    );
    const severeIRT = calculator(currentlyInfected, 2 / 3);

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
  } else if (periodType === 'weeks') {
    const infectionsByRequestedTime = calculator(currentlyInfected, 4);
    const severeIRT = calculator(currentlyInfected, 4);

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
  } else if (periodType === 'months') {
    const infectionsByRequestedTime = calculator(currentlyInfected, 1024);
    const severeIRT = calculator(currentlyInfected, 1024);

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
  }
};

covid19ImpactEstimator(data);

// export default covid19ImpactEstimator;
