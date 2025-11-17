import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cargo } from './cargo';

describe('Cargo', () => {
  let component: Cargo;
  let fixture: ComponentFixture<Cargo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cargo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cargo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
