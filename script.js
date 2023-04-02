const valueInput = document.getElementById('value-input');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const convertButton = document.getElementById('convert-btn');
const resultValue = document.getElementById('result-value');

convertButton.addEventListener('click', () => {
  const value = valueInput.value;
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;

  if (!value || isNaN(value)) {
    resultValue.textContent = 'Invalid value';
    return;
  }

  const convertedValue = convertUnit(value, fromUnit, toUnit);

  resultValue.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
});

function convertUnit(value, fromUnit, toUnit) {
  // Define conversion factors
  const factors = {
    'cm': {
      'm': 0.01,
      'in': 0.393701
    },
    'm': {
      'cm': 100,
      'in': 39.3701
    },
    'in': {
      'cm': 2.54,
      'm': 0.0254
    },
    'kg': {
      'lb': 2.20462,
      'oz': 35.274
    },
    'lb': {
      'kg': 0.453592,
      'oz': 16
    },
    'oz': {
      'kg': 0.0283495,
      'lb': 0.0625
    }
  };

  // Convert value to base unit (meters or kilograms)
  let baseValue = value;
  if (fromUnit !== 'm' && fromUnit !== 'kg') {
    baseValue = value * factors[fromUnit]['m'];
  } else if (fromUnit === 'kg' && toUnit === 'lb') {
    baseValue = value * factors[fromUnit][toUnit];
  } else if (fromUnit === 'lb' && toUnit === 'kg') {
    baseValue = value * factors[fromUnit][toUnit];
  } else {
    baseValue = value;
  }

  // Convert base unit to target unit
  let targetValue = baseValue;
  if (toUnit !== 'm' && toUnit !== 'kg') {
    targetValue = baseValue / factors[toUnit]['m'];
  } else if (fromUnit === 'kg' && toUnit === 'lb') {
    targetValue = baseValue / factors[fromUnit][toUnit];
  } else if (fromUnit === 'lb' && toUnit === 'kg') {
    targetValue = baseValue / factors[fromUnit][toUnit];
  } else {
    targetValue = baseValue;
  }

  return targetValue;
}