import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMascotasHomeComponent } from './gestion-mascotas-home.component';

describe('GestionMascotasHomeComponent', () => {
  let component: GestionMascotasHomeComponent;
  let fixture: ComponentFixture<GestionMascotasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionMascotasHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMascotasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
