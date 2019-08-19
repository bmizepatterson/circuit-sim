import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class Subscriber implements OnDestroy {
    protected _subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
