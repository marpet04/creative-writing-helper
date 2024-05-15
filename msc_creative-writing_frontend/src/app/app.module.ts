import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterEditorComponent } from './pages/character-editor/character-editor.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StarterComponent } from './pages/starter/starter.component';
import { ImgSliderComponent } from './pages/img-slider/img-slider.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidenavModule } from './pages/sidenav/sidenav.module';
import { CharactersComponent } from './pages/characters/characters.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CharacterConnectionsComponent } from './pages/character-connections/character-connections.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxEditorModule } from 'ngx-editor';
import { MatSelectModule } from '@angular/material/select';
import { StoryEditorComponent } from './pages/story-editor/story-editor.component';
import { ChaptersComponent } from './pages/chapters/chapters.component';
import { EventsComponent } from './pages/events/events.component';
import { NgxLeaderLineModule } from 'ngx-leader-line';
import { MatExpansionModule } from '@angular/material/expansion';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { EventEditorComponent } from './pages/event-editor/event-editor.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { SettingsComponent } from './pages/settings/settings.component';
import { InfoComponent } from './pages/info/info.component';
import { DemoComponent } from './pages/demo/demo.component';
import { DocEditorComponent } from './pages/doc-editor/doc-editor.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {MatRadioModule} from '@angular/material/radio';
import { ColorFormDialogComponent } from './pages/character-connections/color-form-dialog/color-form-dialog.component';
import { AianalysisComponent } from './pages/aianalysis/aianalysis.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    CharacterEditorComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    StarterComponent,
    CharactersComponent,
    CharacterConnectionsComponent,
    StoryEditorComponent,
    ChaptersComponent,
    EventsComponent,
    EventEditorComponent,
    ProfileComponent,
    SettingsComponent,
    InfoComponent,
    DemoComponent,
    NotFoundComponent,
    ColorFormDialogComponent,
    AianalysisComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ImgSliderComponent,
    MatToolbarModule,
    SidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    DragDropModule,
    MatTableModule,
    ColorPickerModule,
    NgxLeaderLineModule,
    MatExpansionModule,
    NgxLeaderLineModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot(),
    DocEditorComponent,
    MatRadioModule,
    MatDatepickerModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule { }
