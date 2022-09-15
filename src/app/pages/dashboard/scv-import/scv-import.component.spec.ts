import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScvImportComponent } from './scv-import.component';

describe('ScvImportComponent', () => {
  let component: ScvImportComponent;
  let fixture: ComponentFixture<ScvImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScvImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScvImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
