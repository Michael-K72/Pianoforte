export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    lessons: string;
    elena: string;
    concerts: string;
    academy: string;
    contact: string;
    cta: string;
    menu: string;
    close: string;
    impressum: string;
    privacy: string;
  };
  sound: {
    on: string;
    off: string;
    label: string;
  };
  cursor: {
    discover: string;
    play: string;
  };
  hero: {
    kicker: string;
    title: string;
    place: string;
    line: string;
    primary: string;
    secondary: string;
  };
  songs: {
    nowPlaying: string;
    play: string;
    pause: string;
    placeholder: string;
  };
  philosophy: {
    measure: string;
    title: string;
    lead: string;
    items: { title: string; text: string }[];
  };
  lessons: {
    measure: string;
    title: string;
    lead: string;
    items: { title: string; text: string }[];
  };
  elena: {
    measure: string;
    annotation: string;
    lead: string;
    body: string;
    timeline: { year: string; title: string; text: string }[];
  };
  explorer: {
    measure: string;
    title: string;
    lead: string;
    lid: { title: string; text: string };
    fallboard: { title: string; text: string };
    keys: { title: string; text: string };
    pedals: { title: string; text: string };
    strings: { title: string; text: string };
    pedalNames: { sustain: string; soft: string; sostenuto: string };
  };
  journey: {
    measure: string;
    title: string;
    stages: { n: string; title: string; text: string }[];
  };
  concert: {
    measure: string;
    title: string;
    line: string;
    body: string;
    galleryNote: string;
  };
  reviews: {
    measure: string;
    title: string;
    source: string;
    paraphrase: string;
    items: { name: string; role: string; text: string }[];
  };
  pricing: {
    measure: string;
    title: string;
    lead: string;
    from: string;
    minutes: string;
    lessons: string;
    cta: string;
    items: { id: string; title: string; detail: string }[];
  };
  location: {
    measure: string;
    title: string;
    route: string;
    call: string;
    loadMap: string;
    privacyNote: string;
  };
  contact: {
    measure: string;
    title: string;
    lead: string;
    call: string;
    whatsapp: string;
    trial: string;
    formTitle: string;
    name: string;
    contactField: string;
    age: string;
    experience: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  legal: {
    impressumTitle: string;
    impressumBody: string[];
    privacyTitle: string;
    privacyBody: string[];
  };
  a11y: {
    skip: string;
    piano: string;
    language: string;
  };
};
