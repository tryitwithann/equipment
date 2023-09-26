# Messaging

This package provides tools to design `Messages` and `Messaging` within message driven systems.

## Usage

This package assumes 4 different kinds of `Messages`:

 1. `DomainEvent`: Something that has happened that is of relevance to the system under design. 
 2. `Command`: An instruction to the system under design.
 3. `DomainQuery`: A question to the system under design.
 4. `Answer`: The answer by the system under design to a question. 

### How to declare a `Message` 

Declare a `Message` like this:

```typescript
type TicketsWereSoldPayload = {
    ticketMerchantId: string
    ticketBuyerId: string
    ticketSaleId: string
    numberOfTickets: string
    amountOfSale: string
    currencyOfSale: string 
    soldAt: string
}
type TicketsWereSold = Message<DomainEventType, "PinkTie.TicketShop.TicketsWereSold", TicketsWereSoldPayload>
```

### How to build a copy of the message with some fields initialized.

```typescript
const ticketsWereSoldExampleValues = {
    ticketMerchantId: "m:AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
    ticketBuyerId: "b:BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBBB",
    ticketSaleId: "s:11111111-1111-1111-1111-111111111111",
    numberOfTickets: "4",
    amountOfSale: "7980",
    currencyOfSale: "EUR",
    soldAt: "2023-05-12T12:28:01.098762+0000",
} as const;
const defaults = ticketsWereSoldExampleValues;

const ticketsWereSoldBuilder = MessageBuilder
    .buildFor<TicketShopBoundedContextMessages>("PinkTie.TicketShop.TicketsWereSold", defaults);
```

Now you are able to use `ticketsWereSoldExampleValues` to build messages with some of the fields set specifically, and 
with the example values as defaults. 

```typescript
ticketsWereSoldBuilder
    .andWithPayload('numberOfTickets', '2')
    .andWithPayload('amountOfSale', '3990')
    .andWithMetadata("Authentication", 'James Bond')
    .andWithMetadata("Authorization", 'license=kill')
    .andWithMetadata("Feature-Maybe-Ticket", 'on')
```
