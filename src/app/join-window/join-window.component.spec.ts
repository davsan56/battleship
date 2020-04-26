import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinWindowComponent } from './join-window.component';

describe('JoinWindowComponent', () => {
  let component: JoinWindowComponent;
  let fixture: ComponentFixture<JoinWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
