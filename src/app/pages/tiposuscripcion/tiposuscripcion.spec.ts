import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tiposuscripcion } from './tiposuscripcion';

describe('Tiposuscripcion', () => {
  let component: Tiposuscripcion;
  let fixture: ComponentFixture<Tiposuscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tiposuscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tiposuscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
