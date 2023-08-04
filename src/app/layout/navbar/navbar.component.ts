import { Component, EventEmitter, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { navData } from './navData';
import { navBarData } from './navBarData';

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
  navData?:navBarData[];

  constructor(private navBar:NavBarService){}

  ngOnInit(){
    if(localStorage.getItem("player") !== null ){
      this.navBar.getNavBarContent("http://localhost:8080/navBarAllContent")
      .subscribe({
        next: res =>{ 
        this.navData = res,
        console.log(this.navData);
        }
      })
    } else {
      this.navBar.getNavBarContent("http://localhost:8080/navBarContent")
      .subscribe({
        next: res => { 
          this.navData = res,
          console.log(this.navData);
          }
      })
    }
  }

  ngOnLoad(){
    if(localStorage.getItem("player") !== null ){
      console.log("DOug");
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
     
    }
  }
}
