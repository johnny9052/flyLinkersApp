
export interface ModelEvents {
      pk: string;
      event: string;
      event_init_date: string;
      event_end_date: string;
      author__id: string;
      location: string;
      address: string;
      event_site: string;
}

export interface ModelEventsData {
  [x: string]: ModelEvents[];

  events: ModelEvents[];

}
