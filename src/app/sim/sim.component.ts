import { Component, OnInit } from '@angular/core';
import { Project, Path } from 'paper';
import * as paper from 'paper';

@Component({
    templateUrl: './sim.component.html',
    styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        window['paper'] = paper;

        const project1 = new Project('sim');
        const path = new Path.Circle({
            center: [80, 50],
            radius: 30,
            strokeColor: 'black'
        });
    }

}
