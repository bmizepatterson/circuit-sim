import { Component, OnInit } from '@angular/core';
import { Path, Rectangle, Point, view, Layer } from 'paper';
import * as paper from 'paper';
import { West } from '../theme/themes';

@Component({
    templateUrl: './sim.component.html',
    styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {

    gridSize = 50;

    pointer: Path.Circle;

    // Layers
    backLayer: Layer;
    pointerLayer: Layer;

    // Subscriptions
    subscriptions = [];

    ngOnInit() {
        // Setup PaperJs
        paper.install(window);
        paper.setup('sim');
        this.backLayer = new Layer();
        this.pointerLayer = new Layer();

        // Route events
        paper.view.onResize = e => this.onResize(e);
        paper.view.onMouseMove = e => this.onMouseMove(e);
        paper.view.onMouseLeave = () => this.onMouseLeave();

        // Setup workspace
        this.drawBackground();

        // Subscriptions
        this.subscriptions.push(
            
        );
    }

    drawBackground() {
        this.backLayer.activate();
        const background = new Path.Rectangle(new Rectangle(new Point(0, 0), view.viewSize));

        // Draw gridlines
        for (let y = this.gridSize; y < view.viewSize.height; y += this.gridSize) {
            const vertical = new Path();
            vertical.add(new Point(0, y));
            vertical.add(new Point(view.viewSize.width, y));
        }
        for (let x = this.gridSize; x < view.viewSize.width; x += this.gridSize) {
            const horizontal = new Path();
            horizontal.add(new Point(x, 0));
            horizontal.add(new Point(x, view.viewSize.height));
        }
        this.backLayer.fillColor = West.platinum;
        this.backLayer.strokeColor = West.tuscany;
        this.backLayer.dashArray = [this.gridSize / 5, this.gridSize / 10];
    }

    drawPointer(point: Point) {
        // Snap pointer to grid
        point.x = Math.round(point.x / this.gridSize) * this.gridSize;
        point.y = Math.round(point.y / this.gridSize) * this.gridSize;
        this.pointerLayer.activate();
        if (!this.pointer) {
            this.pointer = new Path.Circle(point, this.gridSize / 10);
        }
        this.pointer.position = point;
        this.pointerLayer.fillColor = West.copperPenny;
        this.pointerLayer.fillColor.alpha = 0.8;
    }

    onResize(event: any) {
        this.drawBackground();
    }

    onMouseMove(event: any) {
        this.drawPointer(event.point);
    }

    onMouseLeave() {
        this.pointer = null;
        this.pointerLayer.removeChildren();
    }

}
