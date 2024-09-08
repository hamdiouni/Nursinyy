import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { ComponentService } from '../service/component.service';
import { Observable } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('userReviewsChart') userReviewsChart!: ElementRef;
  @ViewChild('statsChart') statsChart!: ElementRef;

  userReviewsData: any[] = [];

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.dataService.getUserReviews().subscribe(reviews => {
      this.userReviewsData = reviews;

      // Mettre à jour le diagramme des avis des utilisateurs
      this.updateUserReviewsChart();

      // Mettre à jour le diagramme des statistiques
      this.updateStatsChart();
    });
  }

  updateUserReviewsChart() {
    new Chart(this.userReviewsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Excellent', 'Good', 'Average', 'Poor'],
        datasets: [{
          label: 'User Reviews',
          data: this.calculateUserReviewsData(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateStatsChart() {
    new Chart(this.statsChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Stats',
          data: [12, 19, 3, 5, 2, 3], // Remplacez ces données par celles calculées à partir des avis
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

  // Méthode pour calculer les données des avis des utilisateurs
  calculateUserReviewsData(): number[] {
    const excellentCount = this.userReviewsData.filter(review => review.rating === 'Excellent').length;
    const goodCount = this.userReviewsData.filter(review => review.rating === 'Good').length;
    const averageCount = this.userReviewsData.filter(review => review.rating === 'Average').length;
    const poorCount = this.userReviewsData.filter(review => review.rating === 'Poor').length;
    return [excellentCount, goodCount, averageCount, poorCount];
  }
}
