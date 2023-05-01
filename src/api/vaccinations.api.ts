import axios from "axios";
import { VaccinationsData } from "../models/vaccinations.model";
import { VaccinationsMetrics } from "../models/vaccinations.model";

export const getVaccinationsData = async (date: any) => {
    const response = await axios.get(
        "https://health.data.ny.gov/resource/duk7-xrni.json?report_as_of=" + date
    );
    var vaccinationsData: VaccinationsData[] = [];
    var vaccinationsMetrics: VaccinationsMetrics = {
        first_dose: 0,
        series_complete: 0,
    };
    
    for (const data of response.data) {
        vaccinationsData.push({
        region: data.region,
        county: data.county,
        first_dose: data.first_dose,
        series_complete: data.series_complete,
        });
    
        vaccinationsMetrics.first_dose += parseInt(data.first_dose);
        vaccinationsMetrics.series_complete += parseInt(data.series_complete);
    }
    
    const vaccinationsBase = {
        vaccinationsData: vaccinationsData,
        vaccinationsMetrics: vaccinationsMetrics,
        };
    
    return vaccinationsBase;
    }