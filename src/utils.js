/**
 * Spilt a float number into different parts beforeDecimal, afterDecimal
 */
export function splitDecimal(numStr) {
  const parts = numStr.split(".");
  const beforeDecimal = parts[0];
  const afterDecimal = parts[1] || "";

  return {
    beforeDecimal,
    afterDecimal,
  };
}

/**
 * Limit decimal numbers to given scale
 */
export function limitToScale(numStr, scale, fixedDecimalScale) {
  let str = "";
  const filler = fixedDecimalScale ? "0" : "";
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

/**
 * Format Decimal Number
 */
export function formatDecimalNumber(
  num,
  decimalScale = 2,
  fixedDecimalScale = false
) {
  const numStr = num.toString();
  const hasDecimalSeparator =
    numStr.indexOf(".") !== -1 || (decimalScale && fixedDecimalScale);
  let { beforeDecimal, afterDecimal } = splitDecimal(numStr);
  afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);
  return beforeDecimal + (hasDecimalSeparator ? "." : "") + afterDecimal;
}

/**
 * Get Category
 */
export function getCategory(aqi) {
  if (aqi > 400 && aqi <= 500) {
    return { slug: "severe", label: "Severe" };
  } else if (aqi > 300 && aqi <= 400) {
    return { slug: "very-poor", label: "Very Poor" };
  } else if (aqi > 200 && aqi <= 300) {
    return { slug: "poor", label: "Poor" };
  } else if (aqi > 100 && aqi <= 200) {
    return { slug: "moderate", label: "Moderate" };
  } else if (aqi > 50 && aqi <= 100) {
    return { slug: "satisfactory", label: "Satisfactory" };
  }

  return { slug: "good", label: "Good" };
}

/**
 * Get Color Code
 */
export function getColorCode(aqi) {
  const colorCode = {
    severe: "#8a0001",
    "very-poor": "#ed1421",
    poor: "#f49717",
    moderate: "#fef100",
    satisfactory: "#8dca78",
    good: "#018c3f",
  };
  const category = getCategory(aqi);
  return colorCode[category.slug];
}
