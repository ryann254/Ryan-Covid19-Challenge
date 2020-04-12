const container = document.getElementById('container');

function fillData(calculatedData, timeToElapse, periodType) {
  const currentlyInfected = document.querySelector('#currentlyInfected');
  const infectionsLabel = document.querySelector('#infectionsLabel');
  const infectionsByRequestedTime = document.querySelector(
    '#infectionsByTimeRequested'
  );
  const icuCasesLabel = document.querySelector('#icuCasesLabel');
  const casesForICUByRequestedTime = document.querySelector(
    '#casesForICUByRequestedTime'
  );
  const hospitalBeds = document.querySelector('#hospitalBeds');
  const hospitalBedsByRequestedTime = document.querySelector(
    '#hospitalBedsByRequestedTime'
  );
  const ventilators = document.querySelector('#ventilators');
  const casesForVentilatorsByRequestedTime = document.querySelector(
    '#casesForVentilatorsByRequestedTime'
  );
  const dollarsInFlight = document.querySelector('#dollarsInFlight');

  const newDataArray = [calculatedData];
  const impactArray = newDataArray.map((item) => item.impact);
  impactArray.map((item) => {
    currentlyInfected.innerHTML = item.currentlyInfected;
    infectionsLabel.innerHTML = `Infections in ${timeToElapse.value} ${periodType.value}: `;
    infectionsByRequestedTime.innerHTML = item.infectionsByRequestedTime;
    icuCasesLabel.innerHTML = `People Needing ICU Care in ${timeToElapse.value} ${periodType.value}: `;
    casesForICUByRequestedTime.innerHTML = item.casesForICUByRequestedTime;
    hospitalBeds.innerHTML = `Hospital Beds Available in ${timeToElapse.value} ${periodType.value}: `;
    hospitalBedsByRequestedTime.innerHTML = item.hospitalBedsByRequestedTime;
    ventilators.innerHTML = `Ventilators Needed in ${timeToElapse.value} ${periodType.value}: `;
    casesForVentilatorsByRequestedTime.innerHTML =
      item.casesForVentilatorsByRequestedTime;
    dollarsInFlight.innerHTML = `$ ${item.dollarsInFlight}`;
  });
}

function removeWarning() {
  const overlayRight = document.querySelector('#overlay-right');
  container.classList.remove('error');
  overlayRight.classList.remove('error-message-visible');
}

// eslint-disable-no-unused-vars
function handleSave() {
  const population = document.querySelector('#population');
  const timetoElapse = document.querySelector('#timeToElapse');
  const reportedCases = document.querySelector('#reportedCases');
  const totalHospitalBeds = document.querySelector('#totalHospitalBeds');
  const periodType = document.querySelector('#periodType');

  const checkArray = [];
  checkArray.push(
    population.value,
    timetoElapse.value,
    reportedCases.value,
    totalHospitalBeds.value,
    periodType.value
  );
  checkArray.forEach((item) => {
    if (isNaN(item) || item === '...') {
      const overlayRight = document.querySelector('#overlay-right');
      container.classList.add('error');
      overlayRight.classList.add('error-message-visible');
      container.classList.remove('right-panel-active');
    } else {
      removeWarning();
      const data = {
        region: {
          name: 'Africa',
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71
        },
        periodType: periodType.value,
        timeToElapse: timetoElapse.value,
        reportedCases: reportedCases.value,
        population: population.value,
        totalHospitalBeds: totalHospitalBeds.value
      };
      const calculatedData = covid19ImpactEstimator(data);
      container.classList.add('right-panel-active');
      fillData(calculatedData, timetoElapse, periodType);
    }
  });
}

// eslint-disable-no-unused-vars
function backButton() {
  container.classList.remove('right-panel-active');
}
