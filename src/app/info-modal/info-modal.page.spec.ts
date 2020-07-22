import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoModalPage } from './info-modal.page';

describe('InfoModalPage', () => {
  let component: InfoModalPage;
  let fixture: ComponentFixture<InfoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
