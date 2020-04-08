const calculator = (number, multiplyBy) => parseInt(number, 10) * multiplyBy;

const result = (durations, durationType) => {
  if (durationType === 'weeks') {
    return Math.trunc((parseInt(durations, 10) * 7) / 3);
  }
  if (durationType === 'months') {
    return Math.trunc((parseInt(durations, 10) * 30) / 3);
  }

  return Math.trunc(parseInt(duration, 10) / 3);
};

const hospitalized = (number) => (15 / 100) * number;

function availableHospitalBeds(totalBeds, patients) {
  const beds = (35 / 100) * totalBeds;

  return beds - patients;
}

const icuCases = (number) => (5 / 100) * number;

const ventilatorCases = (number) => (2 / 100) * number;

function calculateLostMoney(infectedPeople, population, income, duration) {
  return infectedPeople * population * income * duration;
}

function returnFunction(
  firstField,
  impactFirstField,
  impactSecondField,
  impactThirdField,
  impactFourthField,
  impactFifthField,
  impactSixthField,
  impactSeventhField,
  severeFirstField,
  severeSecondField,
  severeThirdField,
  severeFourthField,
  severeFifthField,
  severeSixthField,
  severeSeventhField
) {
  return {
    input: firstField,
    impact: {
      currentlyInfected: impactFirstField,
      infectionsByRequestedTime: impactSecondField,
      severeCasesByRequestedTime: impactThirdField,
      hospitalBedsByRequestedTime: impactFourthField,
      casesForICUByRequestedTime: impactFifthField,
      casesForVentilatorsByRequestedTime: impactSixthField,
      dollarsInFlight: impactSeventhField
    },
    severeImpact: {
      currentlyInfected: severeFirstField,
      infectionsByRequestedTime: severeSecondField,
      severeCasesByRequestedTime: severeThirdField,
      hospitalBedsByRequestedTime: severeFourthField,
      casesForICUByRequestedTime: severeFifthField,
      casesForVentilatorsByRequestedTime: severeSixthField,
      dollarsInFlight: severeSeventhField
    }
  };
}

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;
  const { totalHospitalBeds } = input;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = input.region;

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
  let toBeHospitalized = hospitalized(infectionsByRequestedTime);
  let toBeHospitalizedSevere = hospitalized(severeIRT);
  let hospitalBeds = availableHospitalBeds(totalHospitalBeds, toBeHospitalized);
  let hospitalBedsSevere = availableHospitalBeds(
    totalHospitalBeds,
    toBeHospitalizedSevere
  );
  let IcuCases = icuCases(infectionsByRequestedTime);
  let IcuCasesSevere = icuCases(severeIRT);
  let ventilatorsNeeded = ventilatorCases(infectionsByRequestedTime);
  let ventilatorsNeededSevere = ventilatorCases(severeIRT);
  let lostMoney = calculateLostMoney(
    infectionsByRequestedTime,
    avgDailyIncomePopulation,
    avgDailyIncomeInUSD,
    timeToElapse
  );
  let lostMoneySevere = calculateLostMoney(
    infectionsByRequestedTime,
    avgDailyIncomePopulation,
    avgDailyIncomeInUSD,
    timeToElapse
  );

  if (periodType === 'weeks') {
    const infectionsByWeeks = calculator(currentlyInfected, 2 ** resultInWeeks);
    const severeIRTWeeks = calculator(
      severeCurrentlyInfected,
      2 ** resultInWeeks
    );
    toBeHospitalized = hospitalized(infectionsByWeeks);
    toBeHospitalizedSevere = hospitalized(severeIRTWeeks);
    hospitalBeds = availableHospitalBeds(totalHospitalBeds, toBeHospitalized);
    hospitalBedsSevere = availableHospitalBeds(
      totalHospitalBeds,
      toBeHospitalizedSevere
    );
    IcuCases = icuCases(infectionsByWeeks);
    IcuCasesSevere = icuCases(severeIRTWeeks);
    ventilatorsNeeded = ventilatorCases(infectionsByWeeks);
    ventilatorsNeededSevere = ventilatorCases(severeIRTWeeks);
    lostMoney = calculateLostMoney(
      infectionsByWeeks,
      avgDailyIncomePopulation,
      avgDailyIncomeInUSD,
      timeToElapse
    );
    lostMoneySevere = calculateLostMoney(
      infectionsByWeeks,
      avgDailyIncomePopulation,
      avgDailyIncomeInUSD,
      timeToElapse
    );

    return returnFunction(
      input,
      currentlyInfected,
      infectionsByWeeks,
      toBeHospitalized,
      hospitalBeds,
      IcuCases,
      ventilatorsNeeded,
      lostMoney,
      severeCurrentlyInfected,
      severeIRTWeeks,
      toBeHospitalizedSevere,
      hospitalBedsSevere,
      IcuCasesSevere,
      ventilatorsNeededSevere,
      lostMoneySevere
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
    toBeHospitalized = hospitalized(infectionsByMonths);
    toBeHospitalizedSevere = hospitalized(severeIRTMonths);
    hospitalBeds = availableHospitalBeds(totalHospitalBeds, toBeHospitalized);
    hospitalBedsSevere = availableHospitalBeds(
      totalHospitalBeds,
      toBeHospitalizedSevere
    );
    IcuCases = icuCases(infectionsByMonths);
    IcuCasesSevere = icuCases(severeIRTMonths);
    ventilatorsNeeded = ventilatorCases(infectionsByMonths);
    ventilatorsNeededSevere = ventilatorCases(severeIRTMonths);
    lostMoney = calculateLostMoney(
      infectionsByMonths,
      avgDailyIncomePopulation,
      avgDailyIncomeInUSD,
      timeToElapse
    );
    lostMoneySevere = calculateLostMoney(
      infectionsByMonths,
      avgDailyIncomePopulation,
      avgDailyIncomeInUSD,
      timeToElapse
    );

    return returnFunction(
      input,
      currentlyInfected,
      infectionsByMonths,
      toBeHospitalized,
      hospitalBeds,
      IcuCases,
      ventilatorsNeeded,
      lostMoney,
      severeCurrentlyInfected,
      severeIRTMonths,
      toBeHospitalizedSevere,
      hospitalBedsSevere,
      IcuCasesSevere,
      ventilatorsNeededSevere,
      lostMoneySevere
    );
  }

  return returnFunction(
    input,
    currentlyInfected,
    infectionsByRequestedTime,
    toBeHospitalized,
    hospitalBeds,
    IcuCases,
    ventilatorsNeeded,
    lostMoney,
    severeCurrentlyInfected,
    severeIRT,
    toBeHospitalizedSevere,
    hospitalBedsSevere,
    IcuCasesSevere,
    ventilatorsNeededSevere,
    lostMoneySevere
  );
};

export default covid19ImpactEstimator;
