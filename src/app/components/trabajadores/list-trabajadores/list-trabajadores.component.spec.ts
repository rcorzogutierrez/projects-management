import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrabajadoresComponent } from './list-trabajadores.component';

describe('ListTrabajadoresComponent', () => {
  let component: ListTrabajadoresComponent;
  let fixture: ComponentFixture<ListTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
