import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVeterinarioComponent } from './home-veterinario.component';

describe('HomeVeterinarioComponent', () => {
  let component: HomeVeterinarioComponent;
  let fixture: ComponentFixture<HomeVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
