import {DomainEvent} from "./messages"
import {PickMessageIdentifiedBy} from "./messageBuilder"

type TicketsWereIssuedPayload = {
    ticketMerchantId: string
    ticketBuyerId: string
    ticketSaleId: string
    numberOfTickets: string
    amountOfTicketPrice: string
    currencyOfTicketPrice: string
    issuedAt: string
}
type TicketsWereSoldPayload = {
    ticketMerchantId: string
    ticketBuyerId: string
    ticketSaleId: string
    numberOfTickets: string
    amountOfSale: string
    currencyOfSale: string
    soldAt: string
}
type TicketsWereIssued = DomainEvent<"PinkTie.TicketShop.TicketsWereIssued", TicketsWereIssuedPayload>
type TicketsWereSold = DomainEvent<"PinkTie.TicketShop.TicketsWereSold", TicketsWereSoldPayload>

type TicketShopBoundedContextMessages = TicketsWereIssued | TicketsWereSold

/**
 * @link https://dev.to/ecyrbe/how-to-unit-test-your-typescript-utility-types-3cnm
 */
type Assert<T, U> =
    (<V>() => V extends T ? 1 : 2) extends
    (<V>() => V extends U ? 1 : 2) ? true :
    { error: "Types are not equal"; type1: T; type2: U };

type Expected_1 = "PinkTie.TicketShop.TicketsWereIssued" | "PinkTie.TicketShop.TicketsWereSold"
type Actual_1 = TicketShopBoundedContextMessages["name"]
const test1: Assert<Expected_1, Actual_1> = true;

type Expected_2 = "PinkTie.TicketShop.TicketsWereIssued";
type Actual_2 = TicketsWereIssued;
const test2: Assert<PickMessageIdentifiedBy<TicketShopBoundedContextMessages, Expected_2>, Actual_2 > = true;

type Expected_3 = "PinkTie.TicketShop.TicketsWereSold";
type Actual_3 = TicketsWereSold;
const test3: Assert<PickMessageIdentifiedBy<TicketShopBoundedContextMessages, Expected_3>, Actual_3 > = true;
