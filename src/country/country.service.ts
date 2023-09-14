import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Continent } from './model/continent.model';
import { ConfigService } from '@nestjs/config/dist';
import { CountryData } from './model/country-data.model';
import { CountryDetail } from './model/country_detail.model';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private countryUrl = this.configService.get<string>('COUNTRY_URL');
  private serviceKey = this.configService.get<string>('SERVICE_KEY');

  countryDetailUrl = this.configService.get<string>('COUNTRY_DETAIL_URL');

  cache: any = null;

  async getAll(): Promise<any> {
    if (this.cache !== null) {
      return this.cache;
    }
    const url = this.countryUrl + this.serviceKey;

    const { data } = await firstValueFrom(
      this.httpService.get<any>(`${url}&numOfRows=197&pageNo=1`).pipe(
        catchError((error) => {
          throw error;
        }),
      ),
    );
    this.cache = data;
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

    let target: CountryData;

    for (let country of countries.data) {
      if (country.country_iso_alp2 == isoCode) {
        target = country;
        const url = this.countryDetailUrl + this.serviceKey;
        const { data } = await firstValueFrom(
          this.httpService
            .get<any>(`${url}&cond[country_iso_alp2::EQ]=${isoCode}`)
            .pipe(
              catchError((error) => {
                throw error;
              }),
            ),
        );
        target.country_detail = data.data;
      }
    }
    return target;
  }
}
