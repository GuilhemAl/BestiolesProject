import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpeciesService } from '../services/species.service';

@Component({
  selector: 'app-species-create',
  templateUrl: './species-create.component.html',
  styleUrls: ['./species-create.component.css'],
})
export class SpeciesCreateComponent implements OnInit {
  speciesForm: FormGroup;

  constructor(
    private router: Router,
    private speciesService: SpeciesService,
    private fb: FormBuilder
  ) {
    this.speciesForm = this.fb.group({
      commonName: ['', Validators.required],
      latinName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.speciesForm.valid) {
      const speciesData = this.speciesForm.value;
      this.speciesService.create(speciesData).subscribe(() => {
        this.router.navigate(['/species']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/species']);
  }
}
