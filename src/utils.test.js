import {
  splitDecimal,
  limitToScale,
  formatDecimalNumber,
  getCategory,
  getColorCode,
} from "./utils";

it("test splitDecimal function", () => {
  expect(splitDecimal("143.54146931605436")).toMatchObject({
    beforeDecimal: "143",
    afterDecimal: "54146931605436",
  });
  expect(splitDecimal("143")).toMatchObject({
    beforeDecimal: "143",
    afterDecimal: "",
  });
});

it("test limitToScale function", () => {
  expect(limitToScale("54146931605436", 2, false)).toEqual("54");
  expect(limitToScale("5", 2, true)).toEqual("50");
});

it("test formatDecimalNumber function", () => {
  expect(formatDecimalNumber(143, 2, false)).toEqual("143");
  expect(formatDecimalNumber(143, 2, true)).toEqual("143.00");
  expect(formatDecimalNumber(143.54146931605436, 2, false)).toEqual("143.54");
  expect(formatDecimalNumber(143.5, 2, true)).toEqual("143.50");
});

it("test getCategory function", () => {
  expect(getCategory(47.367984118325104)).toMatchObject({
    slug: "good",
    label: "Good",
  });
  expect(getCategory(77.81947102560198)).toMatchObject({
    slug: "satisfactory",
    label: "Satisfactory",
  });
  expect(getCategory(143.54146931605436)).toMatchObject({
    slug: "moderate",
    label: "Moderate",
  });
  expect(getCategory(219.78936369777455)).toMatchObject({
    slug: "poor",
    label: "Poor",
  });
  expect(getCategory(303.98718312702243)).toMatchObject({
    slug: "very-poor",
    label: "Very Poor",
  });
  expect(getCategory(441.98632315332154)).toMatchObject({
    slug: "severe",
    label: "Severe",
  });
});

it("test getColorCode function", () => {
  expect(getColorCode(47.367984118325104)).toEqual("#018c3f");
  expect(getColorCode(77.81947102560198)).toEqual("#8dca78");
  expect(getColorCode(143.54146931605436)).toEqual("#fef100");
  expect(getColorCode(219.78936369777455)).toEqual("#f49717");
  expect(getColorCode(303.98718312702243)).toEqual("#ed1421");
  expect(getColorCode(441.98632315332154)).toEqual("#8a0001");
});
