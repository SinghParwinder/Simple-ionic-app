import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/common/services/storage.service';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-bluray',
  templateUrl: './bluray.page.html',
  styleUrls: ['../../collections.page.scss'],
})
export class BlurayPage implements OnInit {

  filterVal: FormControl = new FormControl();
  blurayCollection: Movie[] = [];
  loaded: boolean = false;
  filteredItems: any;

  constructor(
    private _router: Router,
    private _storage: LocalStorageService,
    public _alertController: AlertController,
    private _actionSheetController: ActionSheetController) { 
      this._storage._oservables.cblurayLoading.subscribe(value =>
        this.loaded = value
      );
    }

  ngOnInit() {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });

    this._storage._oservables.cbluray.subscribe(data => {
      this.blurayCollection = data;
      console.log('STAMPA film', this.blurayCollection);
      this.assignCopy();
    });
  }

  async movieDetails(item: Movie) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: item.type
      }
    };
    this._router.navigate(['/menu/details'], navigationExtras);
  }

  
  async manageItem(item) {
    const actionSheet = await this._actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'Details',
          icon: 'information-circle',
          handler: () => {
            this.movieDetails(item);
          }
        }, {
          text: 'Remove item from list',
          icon: 'trash',
          handler: () => {
            this.removeFromList(item);
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }


  reset(event) {
    this.assignCopy();
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  removeFromList(item: Movie) {
    const index = this.blurayCollection.indexOf(item);
    this.loaded = false;
    this.blurayCollection.splice(index, 1);
    this._storage.updateCbluray(this.blurayCollection);
    this.presentToast('Item removed from your blueray collection!');
    this.assignCopy();
    this.loaded = true;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.blurayCollection);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.blurayCollection).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
