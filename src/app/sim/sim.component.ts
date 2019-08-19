import { Component, OnInit } from '@angular/core';
import { Path, Rectangle, Point, Color } from 'paper';
import * as paper from 'paper';

@Component({
    templateUrl: './sim.component.html',
    styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {

    ngOnInit() {
        // Setup PaperJs
        paper.install(window);
        paper.setup('sim');

        // Setup workspace
        this.setupWorkspace();
    }

    setupWorkspace() {
        const background = new Path.Rectangle(new Rectangle(new Point(0, 0), new Point(100, 100)));
        background.fillColor = new Color(0, 0, 0);
    }

}
