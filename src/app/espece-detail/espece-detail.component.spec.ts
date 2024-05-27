import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceDetailComponent } from './espece-detail.component';

describe('EspeceDetailComponent', () => {
  let component: EspeceDetailComponent;
  let fixture: ComponentFixture<EspeceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspeceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspeceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
