import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit, OnDestroy {
  ad8232: number = 0;
  accelX: number = 0;
  accelY: number = 0;
  accelZ: number = 0;
  dataSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Démarrez un intervalle pour récupérer les données toutes les 15 secondes
    this.dataSubscription = interval(15000).pipe(
      switchMap(() => this.authService.getAllData())
    ).subscribe(
      (data: any) => {
        // Mettez à jour les valeurs dans le formulaire
        this.ad8232 = data.ad8232;
        this.accelX = data.accelX;
        this.accelY = data.accelY;
        this.accelZ = data.accelZ;
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Assurez-vous de vous désabonner pour éviter les fuites de mémoire
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  sendData(): void {
    this.authService.sendData(this.ad8232, this.accelX, this.accelY, this.accelZ)
      .subscribe(
        response => {
          console.log('Données envoyées avec succès:', response);
          // Pas besoin de récupérer les données à nouveau, elles seront mises à jour automatiquement
        },
        error => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      );
  }
}
