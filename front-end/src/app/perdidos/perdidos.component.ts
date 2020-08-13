import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../servicios/data-api.service';
import { ObjetoInterface } from './../models/objeto-interface';

@Component({
    selector: 'app-perdidos',
    templateUrl: './perdidos.component.html',
    styleUrls: ['./perdidos.component.css']
})
export class PerdidosComponent implements OnInit {


    objetosTodos;
    objetosRecientes;


    //se inyecta el dataApi

    constructor(private dataApi: DataApiService) { }

    ngOnInit() {
        this.dataApi.obtenerObjetosRecientes().subscribe(result=>{
            this.objetosRecientes=result;
            console.log(this.objetosRecientes)
        });

        this.getTodosObjetos();
    }
    
    getTodosObjetos(){
        this.dataApi.obtenerTodosObjetos()
        .subscribe(objetos=>this.objetosTodos=objetos);
        

    }

    

}
