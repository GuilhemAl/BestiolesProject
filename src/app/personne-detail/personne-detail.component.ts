import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonneService } from '../services/personne.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-personne-detail',
  templateUrl: './personne-detail.component.html',
  styleUrls: ['./personne-detail.component.css']
})
export class PersonneDetailComponent implements OnInit {
  personne: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personneService: PersonneService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.personneService.getById(Number(id)).subscribe(data => {
      this.personne = data;
    });
  }

  deletePersonne(id: number): void {
    this.personneService.delete(id).subscribe(() => {
      this.router.navigate(['/personnes']);
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
