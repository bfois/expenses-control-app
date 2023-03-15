import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/Pregunta';
import { Respuesta } from 'src/app/interfaces/Respuesta';
import { Temas } from 'src/app/interfaces/Temas';
import { TriviaDataService } from 'src/app/shared/trivia-data.service';
import { AuthenticationService } from '../../signin/service/authentication.service';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  respuestasUsuario!: {pregunta: Pregunta, respuesta: Respuesta, esCorrecta: boolean}[]
  temasSeleccionados: Temas[] = [];
  nombreTemasSeleccionados: string[] = []
  currentUser: any;
  constructor(
    private triviaService: TriviaDataService,
    private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {
   this.respuestasUsuario = this.triviaService.getResultados();
   this.temasSeleccionados = this.respuestasUsuario.map(r => r.pregunta.temas);
   this.nombreTemasSeleccionados = this.temasSeleccionados.map(tema => tema.name)
  .filter((nombre, index, self) => self.indexOf(nombre) === index);


   this.authenticationService.getCurrentUser().subscribe(user => {
    if (user) {
      this.currentUser = user;
      console.log(this.currentUser)
      // Aquí puedes llamar a otro servicio para obtener más información del usuario si lo necesitas
    }

  });
   console.log(this.respuestasUsuario);
   console.log(this.temasSeleccionados);
   console.log(this.nombreTemasSeleccionados)
  }

  getRespuestasForTema(tema: Temas) {
    return this.respuestasUsuario.filter(r => r.pregunta.temas.id === tema.id);
  }

}
