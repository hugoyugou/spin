import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import * as fromSpin from './reducers/spin.reducer';
import { SpinEffects } from './effects/spin.effects';
import { GifComponent } from './components/gif/gif.component';
import { FrameComponent } from './components/frame/frame.component';

@NgModule({
  declarations: [
    AppComponent,
    GifComponent,
    FrameComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('spin', fromSpin.reducer),
    EffectsModule.forFeature([SpinEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
