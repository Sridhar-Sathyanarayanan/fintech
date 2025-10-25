import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpfCalculatorComponent } from './ppf-calculator.component';

describe('PpfCalculatorComponent', () => {
  let component: PpfCalculatorComponent;
  let fixture: ComponentFixture<PpfCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpfCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpfCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
