import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMisMascotasComponent } from './consultar-mis-mascotas.component';

describe('ConsultarMisMascotasComponent', () => {
  let component: ConsultarMisMascotasComponent;
  let fixture: ComponentFixture<ConsultarMisMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarMisMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarMisMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
