import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrabajadoresComponent } from './create-trabajadores.component';

describe('CreateTrabajadoresComponent', () => {
  let component: CreateTrabajadoresComponent;
  let fixture: ComponentFixture<CreateTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
