export interface ModelUserData {
  firstName: string;
  lastName: string;
  gender: string;
  birthday_date: string;
  residence_country: string;
  headline: string;
  profession: string;
  education: string;
  area_choices: string;
  area: string;
  current_company: string;
  current_position: string;
  phone: string;
  mobile: string;
}


export interface ModelUserLogIn {
  username: string;
  password: string;
}


export interface Profile {
  profile: ModelUserData[];
  events: Events[];
  skills: Skills[];
  interests: Interests[];
  accomplishments: Accomplishments[];
  experiences: Experiences[];
  contacts_profile_count: string;
  notifications: Notifications[];
  message_notifications: MessageNotifications[];
}



export interface MessageNotifications {
  unread_count: string;
  items: string;
}

export interface Notifications {
  unread_count: string;
  items: string;
}


export interface Experiences {
  title: string;
  company: string;
  location: string;
  init_date: string;
  end_date: string;
  currently_working: string;
  headline_experience: string;
  description_experience: string;
}

export interface Accomplishments {
  pk: string;
  id_accomplishment: string;
  accomplishment_description: string;
}

export interface Interests {
  pk: string;
  id_interest: string;
  interest_description: string;
}

export interface Events {
  id_interest: string;
  description: string;
}


export interface Skills {
  id: string;
  skill_description: string;
}
