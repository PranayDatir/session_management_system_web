import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const candidate = localStorage.getItem('candidate');
  if (candidate != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
