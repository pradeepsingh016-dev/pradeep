/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire, track } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuote from '@salesforce/apex/QuoteController.getQuote';
import updateQuote from '@salesforce/apex/QuoteController.updateQuote';

export default class AdjustQuotePrice extends LightningElement {
  @api recordId;
  @track
  quoteData;

  closePopup(event){
    event.preventDefault();
    const cancel = new CustomEvent('cancel', {});
    this.dispatchEvent(cancel);
  }

  // Loading the Quote on component initialization
  connectedCallback(){
    this.loadQuote();
  }

  // Load Quote record using Apex controller method
  loadQuote() {
    getQuote({ quoteId: this.recordId })
      .then(result => {
          this.quoteData = {...result};
      })
      .catch(error => {
          console.error(error);
      });
  }

  // Handle start date change
  handleAmountChange(event) {
    this.quoteData.amount = event.target.value;
  }

  // Save changes to Quote record
  handleSave() {
    updateQuote({ quoteDto: this.quoteData })
        .then(() => {
            // Display success toast message
            const event = new ShowToastEvent({
                title: 'Success',
                message: 'Saved Quote Details',
                variant: 'success'
            });
            this.dispatchEvent(event);
            this.loadQuote();
        })
        .catch(error => {
            console.error(error);
        });
  }
}
