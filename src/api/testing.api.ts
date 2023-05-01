import axios from "axios";
import { TestingData } from "../models/testing.model";
import { TestingMetrics } from "../models/testing.model";

export const getTestingData = async (date: any) => {
  const response = await axios.get(
    "https://data.ny.gov/resource/xdss-u53e.json?test_date=" + date
  );
  var testingData: TestingData[] = [];
  var testingMetrics: TestingMetrics = {
    new_positives: 0,
    total_positives: 0,
    new_tests: 0,
    total_tests: 0,
    test_positive: 0,
  };

  for (const data of response.data) {
    testingData.push({
      county: data.county,
      new_positives: data.new_positives,
      cumulative_number_of_positives: data.cumulative_number_of_positives,
      total_number_of_tests: data.total_number_of_tests,
      cumulative_number_of_tests: data.cumulative_number_of_tests,
      test_positive: data.test_positive,
    });

    if (data.county === "STATEWIDE") {
      testingMetrics.new_positives = data.new_positives;
      testingMetrics.total_positives = data.cumulative_number_of_positives;
      testingMetrics.new_tests = data.total_number_of_tests;
      testingMetrics.total_tests = data.cumulative_number_of_tests;
      testingMetrics.test_positive = data.test_positive;
    }
  }

  const testingBase = {
    testingData: testingData,
    testingMetrics: testingMetrics,
    };

  return testingBase;
};
