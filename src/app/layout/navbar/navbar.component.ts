import { Component, EventEmitter, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  ngOnInit(){
    if(localStorage.getItem("player") !== null ){
      this.checkingConnexion();
    }
  }

  ngOnChange(change : SimpleChange){
    if(navbarData[0].routeLink !== ''){
      this.checkingConnexion();
    }
  }
  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  checkingConnexion(){
    if(localStorage.getItem("player") !== null ){
      navbarData[0].routeLink = 'play-menu';
    }
  }
}
