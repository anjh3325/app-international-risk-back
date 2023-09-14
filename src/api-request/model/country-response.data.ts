import { CountryData } from './country-data.model';

export class CountryResponseResult {
  currentCount: number;
  totalCount: number;
  data: CountryData[];
}
