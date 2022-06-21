import dayJs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

export interface ICompareDate {
  startDate: Date;
  endDate: Date;
}

dayJs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  public compareInHours({ endDate, startDate }: ICompareDate): number {
    const end_date_utc = this.convertToUTC(endDate);
    const start_date_utc = this.convertToUTC(startDate);

    return dayJs(end_date_utc).diff(start_date_utc, "hours");
  }

  public convertToUTC(date: Date): string {
    return dayJs(date).utc().local().format();
  }

  public dateNow(): Date {
    return dayJs().toDate();
  }
}
