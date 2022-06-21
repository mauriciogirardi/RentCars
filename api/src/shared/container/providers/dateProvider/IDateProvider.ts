import { ICompareDate } from "./implementations/DayJsDateProvider";

export interface IDateProvider {
  compareInHours(dates: ICompareDate): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}
