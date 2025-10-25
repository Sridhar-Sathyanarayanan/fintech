import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorHomeComponent } from './calculator-home.component';

describe('CalculatorHomeComponent', () => {
  let component: CalculatorHomeComponent;
  let fixture: ComponentFixture<CalculatorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
