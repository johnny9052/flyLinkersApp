import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
/*Tambien debe importarlo en la parte inferior
en los imports*/
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
/*Import necesario para el almacenamiento local*/
import { IonicStorageModule } from '@ionic/storage';

/*Se importa de manera global el uso de la camara*/
import { Camera } from '@ionic-native/camera/ngx';

/*Se importa de manera global el uso del plugin para CODIFICAR A BASE64 */
import { Base64 } from '@ionic-native/base64/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PipesModule } from './pipes/pipes.module';

import { DatePipe } from '@angular/common';


/*Para instalar cordova en el proyecto
ionic cordova plugin add cordova-plugin-advanced-http
npm install @ionic-native/http*/

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Base64,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    /*Como CORDOVA es un complemento externo, toca meterlo no en Imports sino en providers*/
    // HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
