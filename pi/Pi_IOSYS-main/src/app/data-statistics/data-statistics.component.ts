import { Component, OnInit } from '@angular/core';
import { Chart, Tick } from 'chart.js';
import { AuthService } from '../service/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-statistics',
  templateUrl: './data-statistics.component.html',
  styleUrls: ['./data-statistics.component.css']
})
export class DataStatisticsComponent implements OnInit {
  chart: any;
  leftChart: any;
  rightChart: any;
  data!: { ad8232: number; }[]; // Déclarez DataItem localement
  qrsPeaks: number[] = []; // Tableau pour stocker les pics QRS
  heartRate: number = 60; // Fréquence cardiaque par défaut en BPM
  threshold: number = 200; // Seuil pour une personne normale

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.showStatistics();
    this.getAllData();
  }

  showStatistics(): void {
    const leftCtx = document.getElementById('leftChart') as HTMLCanvasElement;
    const rightCtx = document.getElementById('rightChart') as HTMLCanvasElement;

    this.leftChart = new Chart(leftCtx, {
      type: 'line',
      data: {
        labels: ['amplitude,temps'],
        datasets: [
          {
            label: 'AD8232 (Seuil Bas)',
            data: [],
            fill: false,
            borderColor: '#000', // Couleur des courbes (noir)
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50, // Pas de l'échelle
              callback: function (value: string | number, index: number, values: Tick[]) {
                return value.toString(); // Formatage des valeurs
              }
            }
          }
        }
      }
    });

    this.rightChart = new Chart(rightCtx, {
      type: 'line',
      data: {
        labels: ['amplitude,temps'],
        datasets: [
          {
            label: 'AD8232 (Seuil Haut)',
            data: [],
            fill: false,
            borderColor: '#ff0000', // Couleur des courbes (rouge)
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50, // Pas de l'échelle
              callback: function (value: string | number, index: number, values: Tick[]) {
                return value.toString(); // Formatage des valeurs
              }
            }
          }
        }
      }
    });
  }

  getAllData(): void {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');

    this.authService.getAllData().subscribe(
      (data: { ad8232: number }[]) => {
        this.data = data;
        this.detectQRS(); // Appel de la fonction pour détecter les pics QRS
        this.generateRegularQRS(); // Appel de la fonction pour générer les QRS réguliers
        this.chart.update();
        this.checkThreshold(); // Vérifier si le seuil est dépassé
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  detectQRS(): void {
    // Algorithme simple de détection des pics QRS
    for (let i = 1; i < this.data.length - 1; i++) {
      if (this.data[i].ad8232 > this.data[i - 1].ad8232 && this.data[i].ad8232 > this.data[i + 1].ad8232) {
        this.qrsPeaks.push(i);
      }
    }
  }

  generateRegularQRS(): void {
    const timeBetweenPeaks = 60 / this.heartRate; // Temps entre chaque pic QRS en secondes
    const interval = timeBetweenPeaks / 50; // Intervalle de temps entre chaque point (50 points par pic)

    let time = 0;
    let leftData: number[] = [];
    let rightData: number[] = [];
    for (let i = 0; i < this.qrsPeaks.length; i++) {
      const peak = this.qrsPeaks[i];
      const amplitude = this.data[peak].ad8232;
      leftData.push(amplitude);
      rightData.push(amplitude);
      time += interval;
      this.leftChart.data.labels.push(time.toFixed(2));
      this.rightChart.data.labels.push(time.toFixed(2));
      for (let j = 1; j < 50; j++) {
        leftData.push(amplitude);
        rightData.push(amplitude);
        time += interval;
        this.leftChart.data.labels.push(time.toFixed(2));
        this.rightChart.data.labels.push(time.toFixed(2));
      }
    }

    // Ajout des données de QRS générées au graphique
    this.leftChart.data.datasets[0].data = leftData;
    this.rightChart.data.datasets[0].data = rightData;

    this.leftChart.update();
    this.rightChart.update();
  }

  checkThreshold(): void {
    let isAboveThreshold = false; // Pour suivre si la courbe est au-dessus du seuil

    // Vérifie si la valeur dépasse le seuil
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].ad8232 > this.threshold) {
        isAboveThreshold = true; // La courbe dépasse le seuil
        break; // Sort de la boucle dès qu'une valeur dépasse le seuil
      }
    }

    // Changement de couleur de la courbe selon qu'elle dépasse le seuil ou non
    if (isAboveThreshold) {
      this.leftChart.data.datasets[0].borderColor = this.data.map(item => (item.ad8232 > this.threshold) ? '#000' : '#000');
      this.rightChart.data.datasets[0].borderColor = this.data.map(item => (item.ad8232 > this.threshold) ? '#ff0000' : '#000');
      this.leftChart.update();
      this.rightChart.update();
      alert('Le seuil de fréquence cardiaque a été dépassé !'); // Affiche une alerte
    }
  }



  togglePan(direction: 'left' | 'right'): void {
    const zoomOptions = this.chart.config.options.plugins.zoom;
    zoomOptions.pan.enabled = true;
    zoomOptions.zoom.enabled = false; // Désactiver le zoom lors du défilement
    if (direction === 'left') {
      zoomOptions.pan.mode = 'x';
      zoomOptions.pan.speed = 3; // Vitesse du défilement (3 pas à gauche)
    } else if (direction === 'right') {
      zoomOptions.pan.mode = 'x';
      zoomOptions.pan.speed = -3; // Vitesse du défilement (3 pas à droite)
    }
    this.chart.update();
  }

  toggleZoom(scale: number): void {
    const zoomOptions = this.chart.config.options.plugins.zoom;
    zoomOptions.zoom.enabled = true;
    zoomOptions.pan.enabled = false; // Désactiver le défilement lors du zoom
    zoomOptions.zoom.mode = 'xy';
    zoomOptions.zoom.sensitivity = 0.5; // Augmenter la sensibilité du zoom
    zoomOptions.zoom.minInterval = 1; // Zoom minimum
    zoomOptions.zoom.maxRatio = scale; // Zoom maximum (jusqu'à 4x)
    this.chart.update();
  }


}
