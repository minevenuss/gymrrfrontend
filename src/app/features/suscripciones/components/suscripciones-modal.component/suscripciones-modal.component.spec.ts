import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesModalComponent } from './suscripciones-modal.component';

describe('SuscripcionesModalComponent', () => {
  let component: SuscripcionesModalComponent;
  let fixture: ComponentFixture<SuscripcionesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
