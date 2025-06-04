import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCitasClienteComponent } from './mis-citas-cliente.component';

describe('MisCitasClienteComponent', () => {
  let component: MisCitasClienteComponent;
  let fixture: ComponentFixture<MisCitasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisCitasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCitasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
