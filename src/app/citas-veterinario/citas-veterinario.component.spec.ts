import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasVeterinarioComponent } from './citas-veterinario.component';

describe('CitasVeterinarioComponent', () => {
  let component: CitasVeterinarioComponent;
  let fixture: ComponentFixture<CitasVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
