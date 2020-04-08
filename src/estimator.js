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
  const { reportedCases } = input;

  const currentlyInfected = calculator(reportedCases, 10);
  const severeCurrentlyInfected = calculator(reportedCases, 50);
  const infectionsByRequestedTime = calculator(currentlyInfected, 512);
  const severeIRT = calculator(currentlyInfected, 512);

  const impact = {
    currentlyInfected,
    infectionsByRequestedTime
  };
  const severeImpact = {
    currentlyInfected: severeCurrentlyInfected,
    infectionsByRequestedTime: severeIRT
  };

  return {
    data,
    impact,
    severeImpact
  };
};

covid19ImpactEstimator(data);

// export default covid19ImpactEstimator;
