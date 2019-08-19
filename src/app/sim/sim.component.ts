import { Component, OnInit } from '@angular/core';
import { Path, Rectangle, Point, view, Layer, ToolEvent } from 'paper';
import { West } from '../theme/themes';
import { Subscriber } from '../model/subscriber';
import { ToolService } from '../services/tool.service';
import { Tool } from '../model/tool';
import * as Paper from 'paper';

@Component({
    templateUrl: './sim.component.html',
    styleUrls: ['./sim.component.scss']
})
export class SimComponent extends Subscriber implements OnInit {

    gridSize = 50;

    pointer: Path.Circle;
    pointerActive = true;

    // Layers
    backLayer: Layer;
    pointerLayer: Layer;

    selectedTool: Tool;

    constructor(
        private tools: ToolService,
    ) {
        super();
    }

    ngOnInit() {
        // Setup PaperJs
        Paper.setup('sim');
        this.backLayer = new Layer();
        this.pointerLayer = new Layer();

        // Route events
        view.onResize = e => this.onResize(e);
        view.onMouseUp = e => this.onMouseUp(e);
        view.onMouseDown = e => this.onMouseDown(e);
        view.onMouseMove = e => this.onMouseMove(e);
        view.onMouseDrag = e => this.onMouseDrag(e);
        view.onMouseLeave = () => this.onMouseLeave();

        // Setup workspace
        this.drawBackground();

        // Subscriptions
        this._subscriptions.push(
            this.tools.selectedTool.subscribe((tool: Tool) => {
                this.selectedTool = tool;
                console.log('Selected Tool:', tool);
            })
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

    clearPointer() {
        this.pointer = null;
        this.pointerLayer.removeChildren();
    }

    onResize(event: ToolEvent) {
        this.drawBackground();
    }

    onMouseMove(event: ToolEvent) {
        if (this.pointerActive) {
            this.drawPointer(event.point);
        }
    }

    onMouseLeave() {
        this.clearPointer();
    }

    onMouseDrag(event: ToolEvent) {
        if (this.pointerActive) {
            this.drawPointer(event.point);
        }
    }

    onMouseDown(event: ToolEvent) {
        if (this.selectedTool) {
            this.pointerActive = false;
            this.clearPointer();
        }
    }

    onMouseUp(event: ToolEvent) {
        this.pointerActive = true;
    }

}
