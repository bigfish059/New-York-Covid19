export interface VaccinationsData {
    region: string;
    county: string;
    first_dose: number;
    series_complete: number;
}

export interface VaccinationsMetrics {
    first_dose: number;
    series_complete: number;
}

export interface VaccinationsBase {
    vaccinationsData: VaccinationsData[];
    vaccinationsMetrics: VaccinationsMetrics;
}