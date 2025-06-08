import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnleitungenComponent } from './anleitungen.component';

describe('AnleitungenComponent', () => {
  let component: AnleitungenComponent;
  let fixture: ComponentFixture<AnleitungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnleitungenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnleitungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
