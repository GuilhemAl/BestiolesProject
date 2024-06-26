import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personne-list',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.css']
})
export class PersonneListComponent implements OnInit {
  personnes: any[] = [];
  searchForm: FormGroup;

  constructor(
    private personneService: PersonneService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadPersonnes();

    // Watch for search input changes
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.loadPersonnes(value);
    });
  }

  loadPersonnes(searchTerm?: string): void {
    this.personneService.getAll(searchTerm).subscribe(
      data => {
        this.personnes = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  deletePersonne(id: number): void {
    this.personneService.delete(id).subscribe(() => {
      this.loadPersonnes(); // Reload the list after deletion
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
