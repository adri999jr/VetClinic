import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarVeterinarioComponent } from './validar-veterinario.component';

describe('ValidarVeterinarioComponent', () => {
  let component: ValidarVeterinarioComponent;
  let fixture: ComponentFixture<ValidarVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
