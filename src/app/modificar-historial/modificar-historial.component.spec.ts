import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHistorialComponent } from './modificar-historial.component';

describe('ModificarHistorialComponent', () => {
  let component: ModificarHistorialComponent;
  let fixture: ComponentFixture<ModificarHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
