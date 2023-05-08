public with sharing class QuoteController {
    //Method to fetch Quote Record
    @AuraEnabled(cacheable=true)
    public static QuoteDTO getQuote(Id quoteId) {
        Quote__c quote = [SELECT 
                                Id, 
                                Name, 
                                StartDate__c, 
                                EndDate__c,
                                TotalQuotedAmount__c 
                            FROM 
                                Quote__c 
                            WHERE 
                                Id = :quoteId];
        return new QuoteDTO(quote);
    }
    //Method to Update Quote Record
    @AuraEnabled
    public static void updateQuote(QuoteDTO quoteDto) {
        Quote__c quote = (Quote__c) quoteDto.refreshSo();
        update quote;
    }
}
