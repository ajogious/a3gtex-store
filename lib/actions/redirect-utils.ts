/* eslint-disable @typescript-eslint/no-explicit-any */
export function isRedirectError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as any).digest === 'string' &&
    (error as any).digest.startsWith('NEXT_REDIRECT')
  );
}
