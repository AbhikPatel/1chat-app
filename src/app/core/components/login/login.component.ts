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
  public inputType: string;
  private destroy: Subject<void>;

  constructor(
    private _service: AuthService,
    private _fb: FormBuilder,
    private _route: Router,
    private _commonService: CommonService,
    private _toastr:ToasterService
  ) {
    this.inputType = 'password'
    this.loginGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(10)]]
    })
    this.destroy = new Subject();
  }

  ngOnInit(): void {

  }

  /**
   * @name showPassword
   * @description This method is called to change the type of the input to show password
   */
  public showPassword() {
    this.inputType === 'password' ? this.inputType = 'text' : this.inputType = 'password'
  }

  /**
   * @name onSubmit
   * @description This method is called when form is submitted
   */
  public onSubmit() {
    if (this.loginGroup.valid) {
      this._service.loginUser(this.loginGroup.value).pipe(takeUntil(this.destroy)).subscribe((data) => {
        this._commonService.user$.next(data);
        this._route.navigateByUrl('/home');
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
   * @name ngOnDestroy
   * @description This method is called when the component is destroyed
   */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
