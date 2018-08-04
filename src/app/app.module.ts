import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import * as fromSpin from './reducers/spin.reducer';
import { SpinEffects } from './effects/spin.effects';
import { AnimatedImageComponent } from './components/animated-image/animated-image.component';
import { FrameComponent } from './components/frame/frame.component';
import { ReversePipe } from './pipes/reverse.pipe';
import * as fromPreview from './reducers/preview.reducer';
import { PreviewEffects } from './effects/preview.effects';

@NgModule({
  declarations: [
    AppComponent,
    AnimatedImageComponent,
    FrameComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('spin', fromSpin.reducer),
    EffectsModule.forFeature([SpinEffects, PreviewEffects]),
    StoreModule.forFeature('preview', fromPreview.reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
