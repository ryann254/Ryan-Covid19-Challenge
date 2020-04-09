const calculator = (number, multiplyBy) => parseInt(number, 10) * multiplyBy;

const result = (duration, durationType) => {
  if (durationType === 'weeks') {
    return Math.trunc((parseInt(duration, 10) * 7) / 3);
  }
  if (durationType === 'months') {
    return Math.trunc((parseInt(duration, 10) * 30) / 3);
  }

  return Math.trunc(parseInt(duration, 10) / 3);
};

const calculateICUCareNeeded = (number) => (5 / 100) * number;

const hospitalized = (number) => Math.trunc((15 / 100) * number);

function availableHospitalBeds(totalBeds, patients) {
  const beds = (35 / 100) * totalBeds;

  return Math.trunc(beds - patients);
}

function returnFunction(
  firstField,
  impactFirstField,
  impactSecondField,
  impactThirdField,
  impactFourthField,
  impactFifthField,
  severeFirstField,
  severeSecondField,
  severeThirdField,
  severeFourthField,
  severeFifthField
) {
  return {
    input: firstField,
    impact: {
      currentlyInfected: impactFirstField,
      infectionsByRequestedTime: impactSecondField,
      severeCasesByRequestedTime: impactThirdField,
      hospitalBedsByRequestedTime: impactFourthField,
      casesForICUByRequestedTime: impactFifthField
    },
    severeImpact: {
      currentlyInfected: severeFirstField,
      infectionsByRequestedTime: severeSecondField,
      severeCasesByRequestedTime: severeThirdField,
      hospitalBedsByRequestedTime: severeFourthField,
      casesForICUByRequestedTime: severeFifthField
    }
  };
}

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse } = input;
  const { totalHospitalBeds } = input;

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
  let IcuCareNeeded = calculateICUCareNeeded(infectionsByRequestedTime);
  let IcuCareNeededSevere = calculateICUCareNeeded(severeIRT);

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
    IcuCareNeeded = calculateICUCareNeeded(infectionsByWeeks);
    IcuCareNeededSevere = calculateICUCareNeeded(severeIRTWeeks);

    return returnFunction(
      input,
      currentlyInfected,
      infectionsByWeeks,
      toBeHospitalized,
      hospitalBeds,
      IcuCareNeeded,
      severeCurrentlyInfected,
      severeIRTWeeks,
      toBeHospitalizedSevere,
      hospitalBedsSevere,
      IcuCareNeededSevere
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
    IcuCareNeeded = calculateICUCareNeeded(infectionsByMonths);
    IcuCareNeededSevere = calculateICUCareNeeded(severeIRTMonths);

    return returnFunction(
      input,
      currentlyInfected,
      infectionsByMonths,
      toBeHospitalized,
      hospitalBeds,
      IcuCareNeeded,
      severeCurrentlyInfected,
      severeIRTMonths,
      toBeHospitalizedSevere,
      hospitalBedsSevere,
      IcuCareNeededSevere
    );
  }

  return returnFunction(
    input,
    currentlyInfected,
    infectionsByRequestedTime,
    toBeHospitalized,
    hospitalBeds,
    IcuCareNeeded,
    severeCurrentlyInfected,
    severeIRT,
    toBeHospitalizedSevere,
    hospitalBedsSevere,
    IcuCareNeededSevere
  );
};

export default covid19ImpactEstimator;
