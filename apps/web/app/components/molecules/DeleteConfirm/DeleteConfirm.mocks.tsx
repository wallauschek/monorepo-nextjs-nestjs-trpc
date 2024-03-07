import { IDeleteConfirm } from './DeleteConfirm';

const base: IDeleteConfirm = {
  setSubmittingItem: null,
  submittingItem: false,
  studentSelected: {},
  course: {},
  closeModal: () => console.log('test')
};

export const mockDeleteConfirmProps = {
  base
};
