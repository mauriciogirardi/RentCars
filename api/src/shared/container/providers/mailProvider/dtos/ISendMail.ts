export interface ISendMail {
  to: string;
  subject: string;
  variables: {
    name: string;
    link: string;
  };
  path: string;
}
