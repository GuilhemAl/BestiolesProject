import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonneService } from '../services/personne.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-personne-edit',
  templateUrl: './personne-edit.component.html',
  styleUrls: ['./personne-edit.component.css']
})
export class PersonneEditComponent implements OnInit {
  personneForm: FormGroup;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personneService: PersonneService,
    private fb: FormBuilder
  ) {
    this.personneForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Ajoutez l'ID ici
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      animals: this.fb.array([]) // Ajoutez le FormArray pour les animaux
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.personneService.getById(this.id).subscribe(data => {
      this.personneForm.patchValue(data);
      this.setAnimals(data.animals);
    });
  }

  get animals(): FormArray {
    return this.personneForm.get('animals') as FormArray;
  }

  setAnimals(animals: any[]): void {
    const animalFGs = animals.map(animal => this.fb.group({
      id: [animal.id],
      name: [animal.name, Validators.required],
      species: [animal.species, Validators.required]
    }));
    const animalFormArray = this.fb.array(animalFGs);
    this.personneForm.setControl('animals', animalFormArray);
  }

  addAnimal(): void {
    this.animals.push(this.fb.group({
      id: [null],
      name: ['', Validators.required],
      species: ['', Validators.required]
    }));
  }

  removeAnimal(index: number): void {
    this.animals.removeAt(index);
  }

  onSubmit(): void {
    if (this.personneForm.valid) {
      const personne = this.personneForm.getRawValue(); // Récupère toutes les valeurs du formulaire, y compris l'ID
      console.log('Submitting form with values:', personne);
      this.personneService.update(this.id, personne).subscribe(
        () => {
          this.router.navigate(['/personnes']);
        },
        error => {
          console.error('There was an error!', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/personnes']);
  }
}
