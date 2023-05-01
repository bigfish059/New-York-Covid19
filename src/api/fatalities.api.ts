import axios from "axios";
import { FatalitiesData } from "../models/fatalities.model";

export const getFatalitiesData = async (date: any) => {
  const response = await axios.get(
    "https://health.data.ny.gov/resource/xymy-pny5.json?as_of_date=" + date
  );
  var fatalitiesData: FatalitiesData[] = [];

  for (const data of response.data) {
    fatalitiesData.push({
      county: data.geography,
      fatality: data.total_by_place_of_fatality,
    });
  }

  return fatalitiesData;
};

export const getFatalitiesBySex = async (date: any) => {
  const response = await axios.get(
    "https://health.data.ny.gov/resource/8x2e-hhui.json?report_date=" + date
  );
  console.log(response.data);
  var fatalitiesBySex: any = {
    male : 0,
    female: 0,
  };

  for (const data of response.data) {
    if (data.sex === 'Male') {
      fatalitiesBySex.male = parseInt(data.fatality_count);
    }

    if (data.sex === 'Female') {
      fatalitiesBySex.female = parseInt(data.fatality_count);
    }

    console.log(fatalitiesBySex);

  }

  return fatalitiesBySex;
}

export const getFatalitiesByAge = async (date: any) => {
  const response = await axios.get(
    "https://health.data.ny.gov/resource/du97-svf7.json?report_date=" + date
  );

  var fatalitiesByAge: any[] = [];

  for (const data of response.data) {
    if (data.age_group === 'Statewide Total' || data.age_group === 'Unknown') {
      continue;
    }

    let age = data.age_group.split(' ')[0];

    fatalitiesByAge.push({
      age_group: age,
      fatality_count: parseInt(data.fatality_count),
    });
  }

  return fatalitiesByAge;
}

