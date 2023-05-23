import { Weather } from "./weather.model";

export interface Forecast {
    city: {
        name: String;
        country: String;
        population: number;
    }
    list: Weather[];
}