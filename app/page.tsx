'use client';

import { redirect } from 'next/navigation'
 
export default function ClientRedirect() {
  const redirectTo = '/home';

  redirect(redirectTo);
}
