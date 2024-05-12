import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  pwChangeForm = new FormGroup ({
    old_password: new FormControl('', Validators.required()),
    new_password: new FormControl('', Validators.required()),
    new_password_again: new FormControl('', Validators.required())
  });

  deleteForm = new FormGroup ({
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  changePassword() {
    if (this.pwChangeForm.value.new_password === this.pwChangeForm.value.new_password_again) {
      this.authService.newPassword(this.pwChangeForm.value.old_password!, this.pwChangeForm.value.new_password!);
    } else {
      this.showFailure("Az új jelszó nem egyezik meg a megerősítéssel!");
    }
  }

  showFailure(message: string) {
    this.toastr.error(message, 'Jelszómódosítás', {
      closeButton: true
    });
  }

}
