import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissesListComponent } from './caisses-list.component';

describe('CaissesListComponent', () => {
  let component: CaissesListComponent;
  let fixture: ComponentFixture<CaissesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaissesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaissesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
