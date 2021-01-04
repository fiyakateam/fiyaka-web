import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HouseResponse } from '../../model/api/fiyaka_api';
import { HouseService } from '../../service/house.service';

@Component({
  selector: 'app-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: ['./house-form.component.css'],
})
export class HouseFormComponent implements OnInit {
  houseForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
  });
  @Output() doneSubmit = new EventEmitter<HouseResponse>();

  isPopulated = false;
  populatedId: string;
  createdHouse: HouseResponse;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private houseService: HouseService
  ) {}

  ngOnInit(): void {}

  public populateWithHouse(house: HouseResponse): void {
    this.houseForm.setValue({
      name: house.name,
      address: house.address,
    });
    this.isPopulated = true;
    this.populatedId = house._id;
  }

  onSubmit(): void {
    const formValue = this.houseForm.value;
    const name = formValue.name;
    const address = formValue.address;
    const house: HouseResponse = {
      _id: null,
      name,
      address,
      _owner: null,
    };
    if (this.isPopulated) {
      const id = this.populatedId;
      this.houseService.updateHouse(id, house).subscribe(
        (res) => {
          this.notificationService.pushSuccess(`House updated`);
          this.onDone();
        },
        (err) => {
          console.error(err);
          this.notificationService.pushSuccess(`House update failed`);
        }
      );
    } else {
      this.houseService.createHouse(house).subscribe(
        (res) => {
          const house = res;
          this.notificationService.pushSuccess(
            `New House created: ${house.name}`
          );
          const domain: HouseResponse = {
            _id: house._id,
            name: house.name,
            address: house.address,
            _owner: house._owner,
          };
          this.createdHouse = domain;
        },
        (err) => {
          console.error(err);
          this.notificationService.pushError('House creation failed');
        }
      );
    }
  }

  isValid(): boolean {
    return this.houseForm.valid;
  }

  onDone(): void {
    this.onReset();
    this.doneSubmit.emit(this.createdHouse);
  }

  onReset(): void {
    this.houseForm.reset();
    this.createdHouse = null;
    this.isPopulated = false;
    this.populatedId = null;
  }
}
