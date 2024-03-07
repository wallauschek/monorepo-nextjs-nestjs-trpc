import { action, makeAutoObservable, observable } from 'mobx';

class MenuToggles {
  menuMobile: boolean | undefined = false;
  profileDesktop: boolean | undefined = false;
  searchBar: boolean | undefined = false;
  confirmLogout: boolean | undefined = false;

  constructor() {
    this.setProfileDesktop = this.setProfileDesktop.bind(this);
    this.setmenuMobile = this.setmenuMobile.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.setConfirmLogout = this.setConfirmLogout.bind(this);
    this.clearAll = this.clearAll.bind(this);
    makeAutoObservable(this, {
      menuMobile: observable,
      confirmLogout: observable,
      searchBar: observable,
      profileDesktop: observable,
      setmenuMobile: action,
      setProfileDesktop: action,
      setSearchBar: action,
      setConfirmLogout: action,
      clearAll: action
    });
  }

  setProfileDesktop = (value?: any) => {
    value !== undefined
      ? (this.profileDesktop = value)
      : (this.profileDesktop = !this.profileDesktop);

    return this.profileDesktop;
  };

  setmenuMobile = (value?: any) => {
    value !== undefined ? (this.menuMobile = value) : (this.menuMobile = !this.menuMobile);

    return this.menuMobile;
  };
  setSearchBar = (value?: any) => {
    value !== undefined ? (this.searchBar = value) : (this.searchBar = !this.searchBar);

    return this.searchBar;
  };

  setConfirmLogout = (value?: any) => {
    value !== undefined ? (this.confirmLogout = value) : (this.confirmLogout = !this.confirmLogout);
    console.log(this.confirmLogout);

    return this.confirmLogout;
  };

  clearAll = () => {
    this.confirmLogout = false;
    this.menuMobile = false;
    this.profileDesktop = false;
    this.searchBar = false;

    return true;
  };
}

const menuTogglesStore = new MenuToggles();
export default menuTogglesStore;
