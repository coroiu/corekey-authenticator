export interface Event {
  eventType: string;
}

export function isEvent(event: Record<string, any>): event is Event {
  return typeof event === "object" && "eventType" in event;
}
