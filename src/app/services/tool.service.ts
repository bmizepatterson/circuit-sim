import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tool } from '../model/tool';

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    private _selectedTool: BehaviorSubject<Tool> = new BehaviorSubject(null);

    constructor() { }

    get selectedTool(): BehaviorSubject<Tool> {
        return this._selectedTool;
    }

    public select(tool: Tool) {
        this._selectedTool.next(tool);
    }
}
