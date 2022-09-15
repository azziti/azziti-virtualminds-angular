import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutheticationLayoutComponent } from './authetication-layout.component';

describe('AutheticationLayoutComponent', () => {
  let component: AutheticationLayoutComponent;
  let fixture: ComponentFixture<AutheticationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutheticationLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutheticationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
