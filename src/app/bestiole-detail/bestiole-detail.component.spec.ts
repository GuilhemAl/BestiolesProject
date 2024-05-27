import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestioleDetailComponent } from './bestiole-detail.component';

describe('BestioleDetailComponent', () => {
  let component: BestioleDetailComponent;
  let fixture: ComponentFixture<BestioleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestioleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestioleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
