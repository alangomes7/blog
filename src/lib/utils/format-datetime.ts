import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDatetime(rawDate: string): string {
  const date = new Date(rawDate);
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR });
}

export function formatDatetimeTimeAgo(rawDate: string): string {
  const date = new Date(rawDate);
  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
}

export function formatDatetimeTimeAgoWithSuffix(rawDate: string): string {
  const date = new Date(rawDate);

  const timeAgo = formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
  const specificTime = format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });

  return `${timeAgo} em ${specificTime}`;
}
