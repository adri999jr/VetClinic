import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCitasClienteComponent } from './calendar-citas-cliente.component';

describe('CalendarCitasClienteComponent', () => {
  let component: CalendarCitasClienteComponent;
  let fixture: ComponentFixture<CalendarCitasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarCitasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarCitasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
