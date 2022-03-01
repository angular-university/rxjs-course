import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // este es el primer ejemplo de un stream, cada vez que el usuario toque algo en la pantalla aparece en la consola
    document.addEventListener('click', evt => {
      console.log(evt);
      // tercer ejemplo, setTimeout es otra operación asincrona que se ejecuta en segundo plano
      setTimeout(() => {
        console.log('Timeout has finished after 7 seconds');
        // segundo ejemplo, un contador que aparece en la consola
        let counter = 0;
        setInterval(() => {
          console.log(counter++);
        }, 1000);
      }, 7000);
    });




  }

}
