import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HouseResponse } from '../../model/api/fiyaka_api';
import { HouseService } from '../../service/house.service';
import { HouseFormComponent } from '../house-form/house-form.component';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
})
export class HousesComponent implements OnInit {
  @ViewChild('houseForm') houseForm: HouseFormComponent;
  modalVisible = false;
  houseList: Array<HouseResponse> = [];

  constructor(
    private houseService: HouseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.refreshHouseList();
  }

  showModal(): void {
    this.modalVisible = true;
  }

  showModalWithData(house: HouseResponse): void {
    this.houseForm.populateWithHouse(house);
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
    this.houseForm.onReset();
    this.refreshHouseList();
  }

  refreshHouseList(): void {
    this.houseService.getHouseList().subscribe(
      (res) => {
        this.houseList = res;
        console.warn(this.houseList);
        this.notificationService.pushSuccess('House list refreshed!');
      },
      (error) => {
        console.error(error);
        this.notificationService.pushError('Could not get House list!');
      }
    );
  }
}
