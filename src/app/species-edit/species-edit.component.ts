import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpeciesService } from '../services/species.service';

@Component({
  selector: 'app-species-edit',
  templateUrl: './species-edit.component.html',
  styleUrls: ['./species-edit.component.css'],
})
export class SpeciesEditComponent implements OnInit {
  speciesForm: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private speciesService: SpeciesService,
    private fb: FormBuilder
  ) {
    this.speciesForm = this.fb.group({
      id: [null, Validators.required],
      commonName: ['', Validators.required],
      latinName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.speciesService.getById(this.id).subscribe((data) => {
      this.speciesForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.speciesForm.valid) {
      const speciesData = this.speciesForm.value;
      this.speciesService.update(this.id, speciesData).subscribe(() => {
        this.router.navigate(['/species']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/species']);
  }
}
