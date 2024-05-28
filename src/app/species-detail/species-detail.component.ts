import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesService } from '../services/species.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.css']
})
export class SpeciesDetailComponent implements OnInit {
  species: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private speciesService: SpeciesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.speciesService.getById(id).subscribe(data => {
      this.species = data;
    });
  }

  deleteSpecies(id: number): void {
    this.speciesService.delete(id).subscribe(() => {
      this.router.navigate(['/species']);
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
