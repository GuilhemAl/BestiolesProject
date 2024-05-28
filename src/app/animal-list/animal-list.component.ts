import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  animals: any[] = [];
  searchForm: FormGroup;

  constructor(
    private animalService: AnimalService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadAnimals();

    // Watch for search input changes
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.loadAnimals(value);
    });
  }

  loadAnimals(searchTerm?: string): void {
    this.animalService.getAll(searchTerm).subscribe(
      data => {
        this.animals = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  deleteAnimal(id: number): void {
    this.animalService.delete(id).subscribe(() => {
      this.loadAnimals(); // Reload the list after deletion
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
