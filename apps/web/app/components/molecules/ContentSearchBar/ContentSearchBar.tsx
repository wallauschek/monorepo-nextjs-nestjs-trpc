import { CELFiliais } from '@web/lib/utils';
import { BookOpenText, CalendarDays, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import appStore from '@web/stores/app';

export interface IContentSearchBar extends React.HTMLAttributes<HTMLUListElement> {
  inputValue: string;
  data: any;
}
const ContentSearchBar: React.FC<IContentSearchBar> = ({
  data,
  inputValue,
  ...props
}) => {
  const [dataFiltered, setDataFiltered] = useState<any>([]);
  const { school } = appStore;

  useEffect(() => {
    if (inputValue !== '') {
      const newArray = filterArray();
      setDataFiltered(newArray);
    } else {
      setDataFiltered(data);
    }
  }, [inputValue]);

  function filterArray() {
    const removerAcentos = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const termoSemAcentos = removerAcentos(inputValue.toLowerCase());
    const newArray = data.filter((objeto: any) => {
      return removerAcentos(objeto.nomeCurso.toLowerCase()).includes(termoSemAcentos);
    });

    return newArray;
  }

  return (
    <ul
      {...props}
      className={`absolute left-0  right-0 top-16 z-10 grid max-h-[400px] w-full gap-5   overflow-y-auto   rounded-sm border border-gray-100 bg-white p-2 shadow-lg  md:w-[50%]  md:min-w-[500px]`}
    >
     
    </ul>
  );
};

export default ContentSearchBar;
