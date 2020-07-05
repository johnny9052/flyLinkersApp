import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

const { MICROSERVICE_URL } = environment;

@Injectable({
  providedIn: "root",
})
export class SendEmailsService {
  url = `${MICROSERVICE_URL}/FlyLinkersNewsBackend/Controller/SendMails/CtlSendMails.php`;

  urlValidate = `${MICROSERVICE_URL}/FlyLinkersNewsBackend/Controller/ValidateEmail/CtlValidateEmail.php`;

  constructor(private http: HttpClient) {}

  sendEmails(postData: any) {
    return this.http.post(this.url, JSON.stringify(postData)).toPromise();
  }

  sendEmailsValidate(postData: any) {
    return this.http
      .post(this.urlValidate, JSON.stringify(postData))
      .toPromise();
  }
}
