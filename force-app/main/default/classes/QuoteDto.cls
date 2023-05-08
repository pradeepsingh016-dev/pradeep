public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date startDate { get; set; }
  @AuraEnabled
  public Date endDate { get; set; }
  @AuraEnabled
  public String name { get; set; }
  @AuraEnabled
  public String Id { get; set; }
  @AuraEnabled
  public Decimal amount { get; set; }

  public QuoteDto() {
    super();
    this.sObj = new Quote__c();
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
    this.name = quote.Name;
    this.Id = quote.Id;
    this.amount = quote.TotalQuotedAmount__c;
    // Map other fields here as needed
  }

  // Overriding the refreshSo() method to create a new Quote__c object based on the DTO fields
  public override SObject refreshSo() {
    sObj.put('Id', this.Id);
    sObj.put('StartDate__c', this.startDate);
    sObj.put('EndDate__c', this.endDate);
    sObj.put('TotalQuotedAmount__c', this.amount);
    return sObj;
  }
}
