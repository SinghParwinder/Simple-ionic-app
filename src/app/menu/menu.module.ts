import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { LocalStorageService } from 'src/app/common/services/storage.service';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'explore',
        loadChildren: './pages/explore/explore.module#ExplorePageModule'
      },
      { 
        path: 'list', 
        loadChildren: './pages/list/list.module#ListPageModule' 
      },
      { 
        path: 'collections', 
        loadChildren: './pages/collections/collections.module#CollectionsPageModule' 
      },
      { 
        path: 'details', 
        loadChildren: './pages/detail/detail.module#DetailPageModule' 
      },
      { 
        path: 'scan', 
        loadChildren: './pages/scan/scan.module#ScanPageModule' 
      },
      { 
        path: 'tv', 
        loadChildren: './pages/exploretv/exploretv.module#ExploretvPageModule' 
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/explore'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage],
  providers: [LocalStorageService]
})
export class MenuPageModule { }
