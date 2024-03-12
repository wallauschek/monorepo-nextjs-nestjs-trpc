import appStore from '@web/stores/app';
import { Dispatch, useEffect, useState } from 'react';

export interface ISelectStudentsItem {
  student: any;
  studentSelected: any;
  setStudentSelected: Dispatch<any>;
}


const SelectStudentsItem: React.FC<ISelectStudentsItem> = ({ student, studentSelected, setStudentSelected }) => {

  console.log("🚀 ~ student:", student)

  //iniciar router para chamar a pagina de cursos
  // const [avatarExists, setAvatarExists] = useState(false);
  const {
    setStudentSelected: setStudentSelectedStore,
  } = appStore;

  

  // useEffect(() => {
  //   fetch(`https://webfoto.sinergiaeducacao.com.br/${student.registroAcademicoBasico}.jpg`)
  //     .then(response => {
  //       if (response.ok) {
  //         setAvatarExists(true);
  //       } else {
  //         throw new Error('Avatar not found');
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setAvatarExists(false);
  //     });
  // }, [student.registroAcademicoBasico]);
  
  return (
    <div
      onClick={() => setStudentSelected(setStudentSelectedStore(student))}
      className="flex overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="flex-shrink-0 bg-white">
        <img
          className="p-2 mt-1 h-28 w-28 object-cover rounded-full "
          src={`https://webfoto.sinergiaeducacao.com.br/${student.registroAcademicoBasico}.jpg`}
          alt={student.nome}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="174px" height="148px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g><path style="opacity:1" fill="#fefefe" d="M -0.5,-0.5 C 57.5,-0.5 115.5,-0.5 173.5,-0.5C 173.5,48.8333 173.5,98.1667 173.5,147.5C 115.5,147.5 57.5,147.5 -0.5,147.5C -0.5,98.1667 -0.5,48.8333 -0.5,-0.5 Z"/></g>
              <g><path style="opacity:1" fill="#999999" d="M 77.5,4.5 C 108.581,2.78698 132.081,15.1203 148,41.5C 162.747,75.5645 156.247,104.731 128.5,129C 108.195,143.098 86.1949,146.432 62.5,139C 27.6925,122.894 13.1925,95.7277 19,57.5C 27.9139,28.0835 47.4139,10.4168 77.5,4.5 Z"/></g>
              <g><path style="opacity:1" fill="#fdfdfd" d="M 80.5,29.5 C 101.843,28.6721 110.343,38.6721 106,59.5C 98.1485,72.0331 87.6485,74.8664 74.5,68C 65.175,60.1862 63.0083,50.6862 68,39.5C 71.1908,34.8366 75.3575,31.5032 80.5,29.5 Z"/></g>
              <g><path style="opacity:1" fill="#fdfdfd" d="M 78.5,75.5 C 91.6041,74.0842 103.604,76.9175 114.5,84C 124.328,92.5354 127.328,102.869 123.5,115C 111.016,117.947 98.3492,119.113 85.5,118.5C 77.8333,118.333 70.1667,118.167 62.5,118C 58.0317,117.507 53.6983,116.507 49.5,115C 45.6133,99.7513 50.6133,88.0846 64.5,80C 69.1845,78.1702 73.8511,76.6702 78.5,75.5 Z"/></g>
              </svg>`
            )}`;
          }}
        />
      </div>
      <div className="flex-1 bg-white p-6 pt-2 flex flex-col justify-between">
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{student.nome}</p>
          <p className="mt-1 text-xs text-gray-500">{student.periodoLetivo} - {student.serie}</p>
          <p className="mt-1 text-xs text-gray-500">Turma: {student.codTurma}</p>
        </div>
      </div>
    </div>
  );

};


export default SelectStudentsItem;
