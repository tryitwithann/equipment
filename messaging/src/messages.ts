export type MessageName = string

export type MessagePayloadStructure = Readonly<Record<string, string>>

export type RecordedAt = "Recorded-At";

export type MessageId = "Message-Id";
export type CausationId = "Causation-Id";
export type CorrelationId = "Correlation-Id";

export type Authentication = "Authentication";
export type Authorization = "Authorization";

export type HostSystemInformation = "Host-System-Information";
export type ClientSystemInformation = "Client-System-Information";

export type TenantId = "Tenant-Id";

export type StreamId = "Stream-Id";
export type StreamSequenceNumber = "Stream-Sequence-Number";
export type CommitId = "Commit-Id";

export type FeatureMetadataKey<FeatureMetadataKey extends string> = `Feature-${FeatureMetadataKey}`

export type CustomMetadataKey<CustomMetadataKey extends string> = `X-${CustomMetadataKey}`

export type AnyMetadataKey
    = RecordedAt
    | MessageId
    | CausationId
    | CorrelationId
    | Authentication
    | Authorization
    | HostSystemInformation
    | ClientSystemInformation
    | TenantId
    | StreamId
    | StreamSequenceNumber
    | CommitId
    | FeatureMetadataKey<string>
    | CustomMetadataKey<string>

export type NativeMetadataKeys = MessageId;

export type MessageMetadataStructure<
    MandatoryMetadataKeys extends AnyMetadataKey = NativeMetadataKeys,
    OptionalMetadataKeys extends AnyMetadataKey = AnyMetadataKey
> = Partial<Readonly<Record<OptionalMetadataKeys, string>>>
  & Readonly<Record<MandatoryMetadataKeys, string>>

export type NativeDomainEventKeys = NativeMetadataKeys | CorrelationId | CausationId
export type NativeAnswerKeys = NativeMetadataKeys | CorrelationId | CausationId
export type NativeDomainEventMetadata = MessageMetadataStructure<NativeDomainEventKeys>
export type NativeAnswerMetadata = MessageMetadataStructure<NativeAnswerKeys>

export const DomainEventMessageType = 'DomainEvent';
export const CommandMessageType = 'Command';
export const DomainQueryMessageType = 'DomainQuery';
export const AnswerMessageType = 'Answer';

export type DomainEventType = typeof DomainEventMessageType;
export type CommandType = typeof CommandMessageType;
export type DomainQueryType = typeof DomainQueryMessageType;
export type AnswerType = typeof AnswerMessageType;

export const MessageTypes = [
    DomainEventMessageType,
    CommandMessageType,
    DomainQueryMessageType,
    AnswerMessageType,
] as const;

export type AllMessageTypes = typeof MessageTypes[number]

export type Message<
    MessageType extends AllMessageTypes = AllMessageTypes,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = MessageMetadataStructure,
    Name extends string = MessageName
> = {
    name: Name
    payload: MessagePayload
    metadata: Metadata
    type: MessageType
}

export type DomainEvent<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = NativeDomainEventMetadata,
> = Message<DomainEventType, MessagePayload, Metadata, Name>

export type Command<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = MessageMetadataStructure,
> = Message<CommandType, MessagePayload, Metadata, Name>

export type DomainQuery<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = MessageMetadataStructure,
> = Message<DomainQueryType, MessagePayload, Metadata, Name>

export type Answer<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = NativeAnswerMetadata,
> = Message<AnswerType, MessagePayload, Metadata, Name>
