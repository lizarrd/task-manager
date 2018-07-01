import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs'
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { TaskDetailComponent } from './task-list/task-item/task-detail/task-detail.component';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SortablejsModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
