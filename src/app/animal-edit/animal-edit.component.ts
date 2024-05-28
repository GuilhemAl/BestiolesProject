import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { SpeciesService } from '../services/species.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css'],
})
export class AnimalEditComponent implements OnInit {
  animalForm: FormGroup;
  id!: number;
  speciesList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private fb: FormBuilder
  ) {
    this.animalForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      color: ['', Validators.required],
      sex: ['', Validators.required],
      species: this.fb.group({
        id: [null, Validators.required],
        commonName: [''],
        latinName: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.animalService.getById(this.id).subscribe((data) => {
      this.animalForm.patchValue(data);
      this.loadSpecies(); // Load species after setting the form values
    });
  }

  loadSpecies(): void {
    this.speciesService.getAll().subscribe((data) => {
      this.speciesList = data;
      this.setSpeciesName(data);
    });
  }

  setSpeciesName(speciesList: any[]): void {
    const currentSpeciesId = this.animalForm.get('species.id')?.value;
    if (currentSpeciesId) {
      const currentSpecies = speciesList.find(
        (species) => species.id === currentSpeciesId
      );
      if (currentSpecies) {
        this.animalForm.patchValue({
          species: {
            commonName: currentSpecies.commonName,
            latinName: currentSpecies.latinName,
          },
        });
      }
    }
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      const animalData = this.animalForm.value;
      this.animalService.update(this.id, animalData).subscribe(() => {
        this.router.navigate(['/animal']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/animal']);
  }
}
