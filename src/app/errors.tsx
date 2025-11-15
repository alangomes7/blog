import { ErrorMessage } from '@/components';

export default function RouteErrorPage() {
  return (
    <ErrorMessage
      pageTitle='Error'
      contentTitle='Deu ruim'
      content='slug error'
    ></ErrorMessage>
  );
}
