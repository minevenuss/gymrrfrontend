import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesTableComponent } from './suscripciones-table.component';

describe('SuscripcionesTableComponent', () => {
  let component: SuscripcionesTableComponent;
  let fixture: ComponentFixture<SuscripcionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
