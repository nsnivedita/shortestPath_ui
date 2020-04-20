import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ShortestPathComponent } from './page/shortest-path/shortest-path.component';


const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "shortpath", component: ShortestPathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
