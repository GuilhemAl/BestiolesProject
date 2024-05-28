import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpeciesService } from '../services/species.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css'],
})
export class AnimalCreateComponent implements OnInit {
  animalForm: FormGroup;
  speciesList: any[] = [];

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private fb: FormBuilder,
    private speciesService: SpeciesService
  ) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      sex: ['', Validators.required],
      species: this.fb.group({
        id: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadSpecies();
    console.log(this.animalForm);
  }

  loadSpecies(): void {
    this.speciesService.getAll().subscribe((data) => {
      this.speciesList = data;
      console.log(this.speciesList); // Ajoutez cette ligne pour déboguer
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      this.animalService.create(this.animalForm.value).subscribe(
        () => {
          this.router.navigate(['/animal']);
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/animal']);
  }
}
