type MessageName = string

type MessagePayloadStructure = Readonly<Record<string, string>>

type RecordedAt = "Recorded-At";

type MessageId = "Message-Id";
type CausationId = "Causation-Id";
type CorrelationId = "Correlation-Id";

type Authentication = "Authentication";
type Authorization = "Authorization";

type HostSystemInformation = "Host-System-Information";
type ClientSystemInformation = "Client-System-Information";

type TenantId = "Tenant-Id";

type StreamId = "Stream-Id";
type StreamSequenceNumber = "Stream-Sequence-Number";
type CommitId = "Commit-Id";

type FeatureMetadataKey<FeatureMetadataKey extends string> = `Feature-${FeatureMetadataKey}`

type CustomMetadataKey<CustomMetadataKey extends string> = `X-${CustomMetadataKey}`

type AnyMetadataKey
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

type NativeMetadataKeys = MessageId;

type MessageMetadataStructure<
    MandatoryMetadataKeys extends AnyMetadataKey = NativeMetadataKeys,
    OptionalMetadataKeys extends AnyMetadataKey = AnyMetadataKey
> = Partial<Readonly<Record<OptionalMetadataKeys, string>>>
  & Readonly<Record<MandatoryMetadataKeys, string>>

type NativeDomainEventKeys = NativeMetadataKeys | CorrelationId | CausationId
type NativeAnswerKeys = NativeMetadataKeys | CorrelationId | CausationId
type NativeDomainEventMetadata = MessageMetadataStructure<NativeDomainEventKeys>
type NativeAnswerMetadata = MessageMetadataStructure<NativeAnswerKeys>

const DomainEventMessageType = 'DomainEvent';
const CommandMessageType = 'Command';
const DomainQueryMessageType = 'DomainQuery';
const AnswerMessageType = 'Answer';

type DomainEventType = typeof DomainEventMessageType;
type CommandType = typeof CommandMessageType;
type DomainQueryType = typeof DomainQueryMessageType;
type AnswerType = typeof AnswerMessageType;

const MessageTypes = [
    DomainEventMessageType,
    CommandMessageType,
    DomainQueryMessageType,
    AnswerMessageType,
] as const;

type AllMessageTypes = typeof MessageTypes[number]

type Message<
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

type DomainEvent<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = NativeDomainEventMetadata,
> = Message<DomainEventType, MessagePayload, Metadata, Name>

type Command<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = MessageMetadataStructure,
> = Message<CommandType, MessagePayload, Metadata, Name>

type DomainQuery<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = MessageMetadataStructure,
> = Message<DomainQueryType, MessagePayload, Metadata, Name>

type Answer<
    Name extends string = MessageName,
    MessagePayload extends MessagePayloadStructure = MessagePayloadStructure,
    Metadata extends MessageMetadataStructure = NativeAnswerMetadata,
> = Message<AnswerType, MessagePayload, Metadata, Name>
