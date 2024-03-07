import { IFormHeader } from './FormHeader';

const base: IFormHeader = {
  children: (
    <>
      <h1>HEADER TEST</h1>
    </>
  ),
  className: 'bg-gray-700 p-2 text-white'
};

export const mockFormHeaderProps = {
  base
};
