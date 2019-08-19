import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _selectedTool: BehaviorSubject<string> = new BehaviorSubject(null);

    get selectedTool(): BehaviorSubject<string> {
        return this._selectedTool;
    }

    selectTool(tool: string) {
        this._selectedTool.next(tool);
    }
}
