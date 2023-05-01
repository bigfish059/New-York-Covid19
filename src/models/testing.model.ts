export interface TestingData {
    county: string;
    new_positives: number;
    cumulative_number_of_positives: number;
    total_number_of_tests: number;
    cumulative_number_of_tests: number;
    test_positive: number;
}

export interface TestingMetrics {
    new_positives: number;
    total_positives: number;
    new_tests: number;
    total_tests: number;
    test_positive: number;
}

export interface TestingBase {
    testingData: TestingData[];
    testingMetrics: TestingMetrics;
}

