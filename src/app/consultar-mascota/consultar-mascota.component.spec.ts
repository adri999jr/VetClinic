import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMascotaComponent } from './consultar-mascota.component';

describe('ConsultarMascotaComponent', () => {
  let component: ConsultarMascotaComponent;
  let fixture: ComponentFixture<ConsultarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
