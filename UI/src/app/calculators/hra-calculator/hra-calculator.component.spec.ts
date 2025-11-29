import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraCalculator } from './hra-calculator';

describe('HraCalculator', () => {
  let component: HraCalculator;
  let fixture: ComponentFixture<HraCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HraCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
