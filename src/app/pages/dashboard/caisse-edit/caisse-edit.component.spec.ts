import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseEditComponent } from './caisse-edit.component';

describe('CaisseEditComponent', () => {
  let component: CaisseEditComponent;
  let fixture: ComponentFixture<CaisseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
