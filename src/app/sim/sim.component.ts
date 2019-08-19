import { Component, OnInit } from '@angular/core';
import { Path, Rectangle, Point, Color, view } from 'paper';
import * as paper from 'paper';
import { West } from '../theme/themes';

@Component({
    templateUrl: './sim.component.html',
    styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {

    gridSize = 50;

    ngOnInit() {
        // Setup PaperJs
        paper.install(window);
        paper.setup('sim');
        paper.view.onResize = e => this.onResize(e);

        // Setup workspace
        this.drawBackground();
    }

    drawBackground() {
        const background = new Path.Rectangle(new Rectangle(new Point(0, 0), view.viewSize));
        background.fillColor = West.platinum;

        // Draw gridlines
        for (let y = this.gridSize; y < view.viewSize.height; y += this.gridSize) {
            const vertical = new Path();
            vertical.add(new Point(0, y));
            vertical.add(new Point(view.viewSize.width, y));
            vertical.strokeColor = West.tuscany;
        }
        for (let x = this.gridSize; x < view.viewSize.width; x += this.gridSize) {
            const horizontal = new Path();
            horizontal.add(new Point(x, 0));
            horizontal.add(new Point(x, view.viewSize.height));
            horizontal.strokeColor = West.tuscany;
        }
    }

    onResize(event: any) {
        this.drawBackground();
    }

}
