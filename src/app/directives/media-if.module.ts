import { NgModule } from '@angular/core';

import { MediaIfDirective } from './media-if.directive';

export { MediaIfDirective } from './media-if.directive';

@NgModule({
  declarations: [
    MediaIfDirective
  ],
  exports: [
    MediaIfDirective
  ]
})
export class MediaIfModule {}
