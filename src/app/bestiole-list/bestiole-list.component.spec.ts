import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestioleListComponent } from './bestiole-list.component';

describe('BestioleListComponent', () => {
  let component: BestioleListComponent;
  let fixture: ComponentFixture<BestioleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestioleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestioleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
