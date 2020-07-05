import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HelperService } from "../util/HelperService";
import { environment } from "../../environments/environment";

const { MICROSERVICE_URL } = environment;

@Injectable({
  providedIn: "root",
})
export class AssociatedEmailService {
  url = `${MICROSERVICE_URL}/FlyLinkersNewsBackend/Controller/AssociatedEmail/CtlAssociatedEmail.php`;
  url2 = `${MICROSERVICE_URL}/FlyLinkersNewsBackend/Controller/AssociatedEmailVerify/CtlAssociatedEmailVerify.php`;

  constructor(private http: HttpClient, private helperService: HelperService) {}

  getAssociatedEmails() {
    return this.http
      .get<any>(
        this.url + "?action=list&token=" + this.helperService.generarToken()
      )
      .toPromise();
  }
}
