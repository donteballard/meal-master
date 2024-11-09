// Conversion utilities
export const convertHeightToMetric = (feet, inches) => {
  const totalInches = (feet * 12) + parseInt(inches);
  return Math.round(totalInches * 2.54); // Convert to cm
};

export const convertWeightToMetric = (pounds) => {
  return Math.round(pounds * 0.453592); // Convert to kg
};

export const convertWeightFromMetric = (kg) => {
  return Math.round(kg * 2.20462); // Convert to lbs
};

export const convertHeightFromMetric = (cm) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}; 