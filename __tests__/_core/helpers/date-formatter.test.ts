import { dateFormatter, isValidDateFormat } from "@/_core/helpers/date-formatter";

describe("dateFormatter", () => {
  it("should format the date correctly", () => {
    const date = new Date("2022-01-01");
    const formattedDate = dateFormatter(date);
    expect(formattedDate).toBe("2022-01-01");
  });
});

describe("isValidDateFormat", () => {
  it("should return true for valid date format", () => {
    const validDate = "2022-01-01";
    const isValid = isValidDateFormat(validDate);
    expect(isValid).toBe(true);
  });

  it("should return false for invalid date format", () => {
    const invalidDate = "2022/01/01";
    const isValid = isValidDateFormat(invalidDate);
    expect(isValid).toBe(false);
  });
});
