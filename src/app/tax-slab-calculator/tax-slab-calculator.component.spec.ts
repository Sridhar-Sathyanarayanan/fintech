import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSlabCalculatorComponent } from './tax-slab-calculator.component';

describe('TaxSlabCalculatorComponent', () => {
  let component: TaxSlabCalculatorComponent;
  let fixture: ComponentFixture<TaxSlabCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxSlabCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxSlabCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
