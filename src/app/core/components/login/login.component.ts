import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;
  private destroy: Subject<void>;
  public password: string;
  public show: boolean;

  constructor(
    private _service: AuthService,
    private _fb: FormBuilder,
    private _route: Router,
    private _commonService: CommonService,
  ) {
    this.loginGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(10)]]
    })
    this.destroy = new Subject();
    this.password ='password'
  }
  ngOnInit(): void {
  }
  /**
   * @name onSubmit
   * @description This method is called when form is submitted
   */
  public onSubmit() {
    if (this.loginGroup.valid) {
      this._service.loginUser(this.loginGroup.value).pipe(takeUntil(this.destroy)).subscribe((data) => {
        this._commonService.user$.next(data);
        this._route.navigateByUrl('chat');
      })
    }
  }

  /**
   * @name getControls
   * @description returns control
   */
  public get getControls() {
    return this.loginGroup.controls;
  }
  /**
   * @name onClick 
   * @description password show-hide icon-Logic
   */
  public onClick(): void {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  /**
   * @name ngOnDestroy
   * @description This method is called when the component is destroyed
   */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
