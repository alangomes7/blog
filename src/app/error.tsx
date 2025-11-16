'use client';

import ErrorMessage from '@/components/ErrorMessage';

type RouteErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RouteErrorPage({ error, reset }: RouteErrorPageProps) {
  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      content={`Ocorreu um erro... Error: ${error.message}`}
      reset={reset}
    />
  );
}
