import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVeterinarioComponent } from './register-veterinario.component';

describe('RegisterVeterinarioComponent', () => {
  let component: RegisterVeterinarioComponent;
  let fixture: ComponentFixture<RegisterVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
