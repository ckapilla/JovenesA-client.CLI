import {Directive, HostListener,} from '@angular/core';

@Directive({
    // This is a CSS selector.  It's confusing that the template syntax ALSO uses []
    selector: '[anchorClick]'
})
export class AnchorClickDirective {
  @HostListener('click') onClick($event: MouseEvent) {
       $event.preventDefault(); // don't navigate to href.
  }
}


