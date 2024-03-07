import { action, configure, makeAutoObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

const isBrowser = typeof window !== 'undefined';

class AppStore {
  school: 'cel' | 'franco' = 'cel';
  coligada: 5 | 1 = 1;

  constructor() {
    this.setSchool = this.setSchool.bind(this);
    this.clearAll = this.clearAll.bind(this);

    configure({
      enforceActions: 'never'
    });

    makeAutoObservable(this, {
      school: observable,
      coligada: observable,
      getSchool: action,
      setSchool: action,
      clearAll: action
    });
    makePersistable(this, {
      name: 'AppStore',
      expireIn: 1000 * 60 * 60 * 24,
      properties: [
        'school',
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

    return true;
  };
}
const appStore = new AppStore();
export default appStore;
