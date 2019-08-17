import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimComponent } from './sim/sim.component';

const routes: Routes = [
    { path: '', component: SimComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
