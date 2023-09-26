import {Message, MessageName} from "./messages"

export type PickMessageIdentifiedBy<Messages extends Message, Identifier extends MessageName> =
    Messages extends Messages
        ? "name" extends keyof Messages
            ? Identifier extends Messages['name']
                ? Messages
                : never
            : never
        : never
