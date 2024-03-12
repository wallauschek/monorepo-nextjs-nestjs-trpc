import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import { action, configure, makeAutoObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

const isBrowser = typeof window !== 'undefined';

class AppStore {
  school: 'cel' | 'franco' = 'cel';
  coligada: 5 | 1 = 1;
  students: any = [];
  studentSelected: any = null;
  
  loadingStudents: 'success' | 'error' | boolean = false;
  
  constructor() {
    this.setSchool = this.setSchool.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.setStudentSelected = this.setStudentSelected.bind(this);
    this.getStudents = this.getStudents.bind(this);


    configure({
      enforceActions: 'never'
    });

    makeAutoObservable(this, {
      school: observable,
      coligada: observable,
      getSchool: action,
      setSchool: action,
      clearAll: action,
      loadingStudents: observable,
      students: observable,
      getStudents: action,
      studentSelected: observable,
      setStudentSelected: action,
    });
    makePersistable(this, {
      name: 'AppStore',
      expireIn: 1000 * 60 * 60 * 24,
      properties: [
        'school',
        'students',
        'loadingStudents',
        'studentSelected'
      ],
      storage: isBrowser ? window.localStorage : undefined
    });
  }

  setSchool(school: 'cel' | 'franco') {
    this.coligada = school === 'cel' ? 1 : 5;

    this.school = school;
  }

  getSchool = () => {
    return this.school;
  };

  
  clearAll = () => {
    console.log('limpouu');
    this.school = 'cel';
    this.coligada = 1;
    this.students = [];
    this.studentSelected = null;

    return true;
  };

  getStudents = async () => {
    this.loadingStudents = false;
    try {
      const data = await ChamadasBackEnd.getUser();

      console.log("🚀 ~ AppStore ~ getStudents= ~ data:", data)


      if (!data.alunos) throw new Error(data.message);

      if (data.alunos.length === 1) {
        this.studentSelected = data.alunos[0];
      } 

      if (this.studentSelected && data.alunos.length > 1 && !this.studentSelected.registroAcademicoExtra) {
        const findStudent = data.alunos.find((student: any) => {
          if (
            (this.studentSelected?.registroAcademicoExtra &&
              this.studentSelected.registroAcademicoExtra === student.registroAcademicoExtra) ||
            (this.studentSelected?.codPessoa &&
              this.studentSelected.codPessoa === student.codPessoa) ||
            (this.studentSelected?.registroAcademicoBasico &&
              this.studentSelected.registroAcademicoBasico === student.registroAcademicoBasico) ||
            (this.studentSelected?.idAluno && this.studentSelected.idAluno === student.idAluno)
          )
            return student;
        });
        if (findStudent) {
          this.studentSelected = findStudent;
        }
      }

      this.students = data.alunos;

      this.loadingStudents = 'success';

      return data;
    } catch (error) {
      console.log(error);
      this.loadingStudents = 'error';
    }
  };

  setStudentSelected = (data: any) => {
    this.studentSelected = data;

    return this.studentSelected;
  };
}
const appStore = new AppStore();
export default appStore;
