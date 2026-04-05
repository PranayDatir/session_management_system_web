import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loadingbutton',
  imports: [],
  template: `<button [type]="type" [disabled]="loading || disabled" class="w-full flex justify-center items-center bg-gradient-to-r bg-[#003B73] text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-[1.02] font-bold py-3 rounded-full mt-4 shadow-lg hover:scale-[1.02] active:scale-95 transition-transform">

        <!-- Loader -->
        @if(loading){
        <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
        </svg>
        }

        @if (!loading) {<span>{{ label }}</span>}
</button>`,
  styles: `
  
  `
})
export class Loadingbutton {
  @Input() label: string = 'Submit';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
}
