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
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
/*Import necesario para el almacenamiento local*/
import { IonicStorageModule } from '@ionic/storage';

/*Se importa de manera global el uso de la camara*/
import { Camera } from '@ionic-native/camera/ngx';


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
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    /*Como CORDOVA es un complemento externo, toca meterlo no en Imports sino en providers*/
    // HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
