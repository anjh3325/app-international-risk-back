import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CountryResponseResult } from './data/country-response.data';

@Injectable()
export class ApiRequestService {
  constructor(private readonly httpService: HttpService) {}

  url =
    'http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?';
  serviceKey =
    'serviceKey=hfY4jV%2FzCjpk50h155lj3ju6kuxtVukr064i%2F49ymXZ3BPHeRbhPckegY%2FY4b724KuPwgU%2FssMe8NwwvWwGgQA%3D%3D';

  async getAll(): Promise<any> {
    const url = this.url + this.serviceKey;
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`${url}&numOfRows=197&pageNo=1`).pipe(
        catchError((error) => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async getlvl1(page: number): Promise<any> {}
}
