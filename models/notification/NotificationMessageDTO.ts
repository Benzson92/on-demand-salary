export interface NotificationMessageDTO {
  to: string;
  sound?: 'default' | string;
  title: string;
  body: string;
  data?: { [key: string]: string };
}
