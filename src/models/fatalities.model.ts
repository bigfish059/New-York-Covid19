export interface FatalitiesData {
    county: string;
    fatality: number;
}

export interface FatalitiesBySex {
    male: number;
    female: number;
}

export interface FatalitiesByAge {
    age_group: string;
    fatality_count: number;
}