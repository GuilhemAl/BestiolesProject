import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css'],
})
export class AnimalDetailComponent implements OnInit {
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalService.getById(Number(id)).subscribe(
        (data) => {
          this.animal = data;
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }

  deleteAnimal(id: number): void {
    this.animalService.delete(id).subscribe(() => {
      this.router.navigate(['/animal']);
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
