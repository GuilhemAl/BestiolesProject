import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonneService } from '../services/personne.service';

@Component({
  selector: 'app-personne-create',
  templateUrl: './personne-create.component.html',
  styleUrls: ['./personne-create.component.css'],
})
export class PersonneCreateComponent implements OnInit {
  personneForm: FormGroup;

  constructor(
    private router: Router,
    private personneService: PersonneService,
    private fb: FormBuilder
  ) {
    this.personneForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]], // Ajout du champ âge avec validation
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.personneForm.valid) {
      const personneData = this.personneForm.value;
      this.personneService.create(personneData).subscribe(() => {
        this.router.navigate(['/personnes']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/personnes']);
  }
}
