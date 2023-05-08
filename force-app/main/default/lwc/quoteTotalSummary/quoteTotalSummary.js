/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    handleAdjustQuote(event){
        event.preventDefault();
        const selectedEvent = new CustomEvent('adjustquote', {
            detail : 'adjustquote'
        });
        // Fire the custom event
        this.dispatchEvent(selectedEvent);
    }
}
