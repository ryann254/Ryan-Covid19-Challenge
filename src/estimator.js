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

// Helper function
const calculator = (number, multiplyBy) => {
  return number * multiplyBy;
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const currentlyInfected = calculator(reportedCases, 10);
  const severeCurrentlyInfected = calculator(reportedCases, 50);
  const infectionsByRequestedTime = calculator(currentlyInfected, 512);
  const severeIRT = calculator(currentlyInfected, 512);

  let impact, severeImpact;

  impact = {
    currentlyInfected,
    infectionsByRequestedTime
  };
  severeImpact = {
    currentlyInfected: severeCurrentlyInfected,
    infectionsByRequestedTime: severeIRT
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
