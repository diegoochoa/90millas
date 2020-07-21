import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ignoreElements } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string;
  password: string;
  confpassword: string;
  name: string;
  constructor(private servicio: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    if(this.verificaPassword(this.password,this.confpassword)){
      this.servicio.register(this.email,this.password,this.name).then( () => {
        this.router.navigate(['/inicio'])
        
      }).catch(err => console.log(err));
    }
    else{
      alert('Las contraseñas no coinciden')
    }
   
    
  }

  verificaPassword(p1: string, p2:string): boolean{
    if(p1==p2)
      return true;
    else
     {
       return false;
     }   
  }
}
