import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text input by default', () => {
    component.type = 'text';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('should render textarea when type is textarea', () => {
    component.type = 'textarea';
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should display label', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label?.textContent).toContain('Test Label');
  });

  it('should display error message when control is invalid and touched', () => {
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    component.errorMessage = 'This field is required';
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('mat-error');
    expect(error?.textContent).toContain('This field is required');
  });
});
