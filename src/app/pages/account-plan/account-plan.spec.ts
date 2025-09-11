import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPlan } from './account-plan';

describe('AccountPlan', () => {
  let component: AccountPlan;
  let fixture: ComponentFixture<AccountPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
