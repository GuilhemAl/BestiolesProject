import { Component, OnInit } from '@angular/core';
import { SpeciesService } from '../services/species.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {
  speciesList: any[] = [];
  searchForm: FormGroup;

  constructor(
    private speciesService: SpeciesService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadSpecies();

    // Watch for search input changes
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.loadSpecies(value);
    });
  }

  loadSpecies(searchTerm?: string): void {
    this.speciesService.getAll(searchTerm).subscribe(
      data => {
        this.speciesList = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  deleteSpecies(id: number): void {
    this.speciesService.delete(id).subscribe(() => {
      this.loadSpecies(); // Reload the list after deletion
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
