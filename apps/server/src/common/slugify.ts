export function slugify(str: string): string {
  // 1. Convertendo para minúsculas
  str = str.toLowerCase();

  // 2. Removendo acentos
  const from = 'áàâãäéèêëíìîïóòôõöúùûüçñ';
  const to = 'aaaaaeeeeiiiiooooouuuucn';
  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // 3. Substituir espaços e caracteres especiais por hífens
  str = str
    .replace(/\s+/g, '-') // espaços para hífen
    .replace(/[^a-z0-9-]/g, '') // removendo caracteres não desejados
    .replace(/-+/g, '-'); // evitando múltiplos hífens consecutivos

  return str;
}
