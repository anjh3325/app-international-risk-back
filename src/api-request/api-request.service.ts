import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Continent } from './model/continent.model';
import { CountryData } from './model/country-data.model';

@Injectable()
export class ApiRequestService {
  constructor(private readonly httpService: HttpService) {}
  url =
    'http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?';
  serviceKey =
    'serviceKey=hfY4jV%2FzCjpk50h155lj3ju6kuxtVukr064i%2F49ymXZ3BPHeRbhPckegY%2FY4b724KuPwgU%2FssMe8NwwvWwGgQA%3D%3D';
  cashe: any = null;

  async getAll(): Promise<any> {
    if (this.cashe !== null) {
      return this.cashe;
    }
    const url = this.url + this.serviceKey;
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`${url}&numOfRows=197&pageNo=1`).pipe(
        catchError((error) => {
          throw 'An error happened!';
        }),
      ),
    );
    this.cashe = data;
    return data;
  }

  async getCountryByLvl(lvl: number): Promise<Continent> {
    const countries = await this.getAll();
    let continent: Continent = {
      africa: [],
      america: [],
      asia: [],
      europe: [],
      middleEast: [],
    };

    for (let country of countries.data) {
      if (country.alarm_lvl == lvl) {
        if (country.continent_eng_nm === 'Africa') {
          continent.africa.push(country);
        } else if (country.continent_eng_nm === 'America') {
          continent.america.push(country);
        } else if (country.continent_eng_nm === 'Asia') {
          continent.asia.push(country);
        } else if (country.continent_eng_nm === 'Europe') {
          continent.europe.push(country);
        } else if (country.continent_eng_nm === 'Middle East') {
          continent.middleEast.push(country);
        }
      }
    }
    return continent;
  }

  async findCountry(isoCode: String): Promise<any> {
    const countries = await this.getAll();

    for (let country of countries.data) {
      if (country.country_iso_alp2 == isoCode) {
        return country;
      } else {
        return '없음';
      }
    }
  }
}
