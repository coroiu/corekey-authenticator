export interface EventEmitter<TEmitable> {
  extractAndEmit(entity_event: TEmitable): void;
}
