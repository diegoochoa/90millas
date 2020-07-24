import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservaModalPage } from './reserva-modal.page';

describe('ReservaModalPage', () => {
  let component: ReservaModalPage;
  let fixture: ComponentFixture<ReservaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
