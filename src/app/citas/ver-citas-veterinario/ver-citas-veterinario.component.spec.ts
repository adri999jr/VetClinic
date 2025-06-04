import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCitasVeterinarioComponent } from './ver-citas-veterinario.component';

describe('VerCitasVeterinarioComponent', () => {
  let component: VerCitasVeterinarioComponent;
  let fixture: ComponentFixture<VerCitasVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerCitasVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCitasVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
