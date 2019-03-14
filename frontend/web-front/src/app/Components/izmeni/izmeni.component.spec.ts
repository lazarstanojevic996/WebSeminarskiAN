import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniComponent } from './izmeni.component';

describe('IzmeniComponent', () => {
  let component: IzmeniComponent;
  let fixture: ComponentFixture<IzmeniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
