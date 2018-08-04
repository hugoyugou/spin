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
import * as fromAnimatedImage from './reducers/animated-image.reducer';
import { AnimatedImageEffects } from './effects/animated-image.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineComponent } from './components/timeline/timeline.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimatedImageComponent,
    FrameComponent,
    ReversePipe,
    TimelineComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatButtonModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('spin', fromSpin.reducer),
    EffectsModule.forFeature([SpinEffects, PreviewEffects, AnimatedImageEffects]),
    StoreModule.forFeature('preview', fromPreview.reducer),
    StoreModule.forFeature('animatedImage', fromAnimatedImage.reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
