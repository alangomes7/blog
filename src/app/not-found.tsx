'use server';

import { ErrorMessage } from '@/components';

export default async function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='Página não encontrada'
      contentTitle='404'
      content='Erro 404 - A página que você está tentando acessar não existe nesse site.'
    ></ErrorMessage>
  );
}
