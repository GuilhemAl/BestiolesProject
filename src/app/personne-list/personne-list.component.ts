import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-personne-list',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.css']
})
export class PersonneListComponent implements OnInit {
  personnes: any[] = [];

  constructor(private personneService: PersonneService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPersonnes();
  }

  loadPersonnes(): void {
    this.personneService.getAll().subscribe(
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
