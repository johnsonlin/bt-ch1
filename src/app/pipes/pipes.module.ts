import { NgModule } from '@angular/core';
import { FirstNamePipe } from './first-name/first-name.pipe';

@NgModule({
  declarations: [
    FirstNamePipe,
  ],
  imports: [],
  exports: [
    FirstNamePipe,
  ],
})
export class PipesModule {
}
