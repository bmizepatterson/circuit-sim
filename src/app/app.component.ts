import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolService } from './services/tool.service';
import { Tool } from './model/tool';
import { Subscriber } from './model/subscriber';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends Subscriber implements OnInit {

    selectedTool: Tool;

    constructor(
        private tools: ToolService,
    ) {
        super();
    }

    ngOnInit() {
        this._subscriptions.push(
            this.tools.selectedTool.subscribe((tool: Tool) => this.selectedTool = tool)
        );
    }

    selectTool(tool: Tool) {
        this.tools.select(new Tool('wire'));
    }
}
