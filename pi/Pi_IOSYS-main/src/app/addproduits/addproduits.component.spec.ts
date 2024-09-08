import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproduitsComponent } from './addproduits.component';

describe('AddproduitsComponent', () => {
  let component: AddproduitsComponent;
  let fixture: ComponentFixture<AddproduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproduitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
