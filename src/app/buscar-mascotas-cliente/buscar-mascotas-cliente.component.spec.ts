import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMascotasClienteComponent } from './buscar-mascotas-cliente.component';

describe('BuscarMascotasClienteComponent', () => {
  let component: BuscarMascotasClienteComponent;
  let fixture: ComponentFixture<BuscarMascotasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarMascotasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarMascotasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
