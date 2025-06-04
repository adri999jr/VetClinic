import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCitaUrgenteComponent } from './crear-cita-urgente.component';

describe('CrearCitaUrgenteComponent', () => {
  let component: CrearCitaUrgenteComponent;
  let fixture: ComponentFixture<CrearCitaUrgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCitaUrgenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCitaUrgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
