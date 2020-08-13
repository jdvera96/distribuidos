import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { helpers } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router:Router) { }


  onSubmit(loginForm:NgForm):void{
    var user = loginForm.value;
    console.log(user.email);
    console.log(user.password);
    
    this.httpClient.post(`http://localhost:3000/api/acceso`,{
      email:user.email,
      password:user.password
    
  },{
    headers: new HttpHeaders({
      "Access-Control-Allow-Methods":"GET, POST",
      "Access-Control-Allow-Origin":"*"
  })
})
    .subscribe(
      (data:any[]) => {
        console.log(data);

        if(data.length>0){
          let usuario_string = JSON.stringify(data[0].nombreUsuario);
          localStorage.setItem("usuarioActual",usuario_string);
          localStorage.setItem("tokenAcceso",'123');
          this.router.navigate(['/usuario/perfil'])
        }

    
    })

    /*
    fetch("http://localhost:3000/api/acceso", {
            method: 'POST',
            body: JSON.stringify({
              email:user.email,
              password:user.password
            
          }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json',
            }
        })
    .then((data) =>{ 
      data.json()
      return 
    })
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err))
    
    */
  }

  ngOnInit() {
  }



}
