import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function verificaConflitoHorario(cursoSelecionado: any, cursoComprado: any) {
  const conflitoDia = cursoSelecionado.diasDaSemana.some((dia: string) =>
    cursoComprado.diasDaSemana.includes(dia)
  );

  if (conflitoDia) {
    const [horaInicioCurso, minutoInicioCurso] = (
      cursoComprado.horario.split(' às ')[0].split('h') || [0, 0]
    ).map((str: string) => parseInt(str, 10));
    const [horaFimCurso, minutoFimCurso] = (
      cursoComprado.horario.split(' às ')[1].split('h') || [0, 0]
    ).map((str: string) => parseInt(str, 10));
    const [horaInicioSelecionado, minutoInicioSelecionado] = (
      cursoSelecionado.horario.split(' às ')[0].split('h') || [0, 0]
    ).map((str: string) => parseInt(str, 10));
    const [horaFimSelecionado, minutoFimSelecionado] = (
      cursoSelecionado.horario.split(' às ')[1].split('h') || [0, 0]
    ).map((str: string) => parseInt(str, 10));

    const horaMinutoInicioCurso = horaInicioCurso * 60 + (minutoInicioCurso || 0);
    const horaMinutoFimCurso = horaFimCurso * 60 + (minutoFimCurso || 0);
    const horaMinutoInicioSelecionado = horaInicioSelecionado * 60 + (minutoInicioSelecionado || 0);
    const horaMinutoFimSelecionado = horaFimSelecionado * 60 + (minutoFimSelecionado || 0);

    const conflitoHorario =
      (horaMinutoInicioCurso <= horaMinutoInicioSelecionado &&
        horaMinutoFimCurso >= horaMinutoInicioSelecionado) ||
      (horaMinutoInicioCurso <= horaMinutoFimSelecionado &&
        horaMinutoFimCurso >= horaMinutoFimSelecionado) ||
      (horaMinutoInicioCurso === horaMinutoInicioSelecionado &&
        horaMinutoFimCurso === horaMinutoFimSelecionado);

    return conflitoHorario;
  }

  return false;
}

export function calcularTempoRestante(expirationDate: string) {
  const now = new Date().getTime();

  const expiration = new Date(expirationDate).getTime();

  const differenceInMilliseconds = expiration - now;
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  if (differenceInMilliseconds <= 0) {
    return '00:00:00';
  } else {
    let timeRemaining = '';
    if (days > 0) timeRemaining += `${days == 1 ? days + ' dia, ' : days + ' dias, '}`;

    timeRemaining += `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;

    return timeRemaining;
  }
}

export const CELFiliais = [
  { value: 1, label: 'Maria Angélica' },
  { value: 2, label: 'Barra da Tijuca' },
  { value: 5, label: 'Lopes Quintas' },
  { value: 7, label: 'Norte Shopping' }
];
