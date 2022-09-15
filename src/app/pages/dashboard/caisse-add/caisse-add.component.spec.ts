import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseAddComponent } from './caisse-add.component';

describe('CaisseAddComponent', () => {
  let component: CaisseAddComponent;
  let fixture: ComponentFixture<CaisseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
