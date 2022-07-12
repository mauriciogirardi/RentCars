import { ISendMail } from "../dtos/ISendMail";
import { IMailProvider } from "../IMailProvider";

export class MailProviderMock implements IMailProvider {
  private massage: ISendMail[] = [];

  async sendMail({ path, subject, to, variables }: ISendMail): Promise<void> {
    this.massage.push({
      path,
      subject,
      to,
      variables,
    });
  }
}
