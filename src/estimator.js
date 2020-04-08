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
  const infectionsByRequestedTime = Math.trunc(
    calculator(currentlyInfected, 2 / 3)
  );
  const severeIRT = Math.trunc(calculator(severeCurrentlyInfected, 2 / 3));

  if (periodType === 'weeks') {
    const infectionsByWeeks = calculator(currentlyInfected, 4);
    const severeIRTWeeks = calculator(severeCurrentlyInfected, 4);

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
    const infectionsByMonths = calculator(currentlyInfected, 1024);
    const severeIRTMonths = calculator(severeCurrentlyInfected, 1024);

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

// export default covid19ImpactEstimator;
