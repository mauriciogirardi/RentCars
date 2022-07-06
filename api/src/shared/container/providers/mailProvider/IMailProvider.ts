import { ISendMail } from "./dtos/ISendMail";

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}
