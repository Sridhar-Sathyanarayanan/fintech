import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NPSCalculatorComponent } from './nps-calculator.component';

describe('TaxSlabCalculatorComponent', () => {
  let component: NPSCalculatorComponent;
  let fixture: ComponentFixture<NPSCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NPSCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NPSCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
