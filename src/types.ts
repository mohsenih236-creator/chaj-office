export type Language = 'EN' | 'FA';

export type ViewMode =
  | 'home'
  | 'project-detail'
  | 'projects-list'
  | 'about'
  | 'services'
  | 'contact';

export type ProjectCategory =
  | 'All'
  | 'Commercial'
  | 'Residential'
  | 'Administrative'
  | 'Medical'
  | 'Sports'
  | 'Educational'
  // Kept for backward compatibility with older sample projects; not shown as filter chips.
  | 'Cultural'
  | 'Interior'
  | 'Concept';

export interface MaterialDetail {
  id: string;
  title: string;
  titleFa: string;
  caption: string;
  captionFa: string;
  imageUrl: string;

  aspectRatio: 'square' | 'video' | 'portrait';

  // Optional: extra photos shown together
  // when this item is clicked.
  // imageUrl is always shown first.
  galleryImages?: string[];
}

export interface ExecutionMedia {
  id: string;

  title: string;
  titleFa: string;

  caption: string;
  captionFa: string;

  // Main image of this execution stage.
  // This image is always shown first.
  imageUrl: string;

  // Optional additional images for the same execution stage.
  // Example:
  //
  // imageUrl:
  // "/images/foundation-01.jpg"
  //
  // galleryImages:
  // [
  //   "/images/foundation-02.jpg",
  //   "/images/foundation-03.jpg",
  //   "/images/foundation-04.jpg"
  // ]
  //
  galleryImages?: string[];

  // "image" shows photos.
  // "video" plays the file at imageUrl as a video.
  type?: 'image' | 'video';
}

export interface Hotspot {
  id: string;

  x: number;
  y: number;

  label: string;
  labelFa: string;

  description: string;
  descriptionFa: string;
}

export interface BlueprintDrawing {
  id: string;

  title: string;
  titleFa: string;

  type:
    | 'Plan'
    | 'Section'
    | 'Elevation'
    | 'Axonometric';

  imageUrl: string;

  svgBlueprint?: string;

  hotspots?: Hotspot[];
}

export interface ProjectSpec {
  label: string;
  labelFa: string;

  value: string;
  valueFa: string;
}

export interface Project {
  id: string;

  title: string;
  titleFa: string;

  subtitle: string;
  subtitleFa: string;

  category: ProjectCategory;

  year: string;

  location: string;
  locationFa: string;

  status: string;
  statusFa: string;

  area: string;
  areaFa: string;

  architects: string;
  architectsFa: string;

  presenter: string;
  presenterFa: string;

  software: string;

  heroImage: string;

  // Optional: additional hero images shown as a slider/carousel.
  // heroImage is always shown first.
  heroImages?: string[];

  narrativeEn: string;
  narrativeFa: string;

  lightSectionTitleEn: string;
  lightSectionTitleFa: string;

  lightNarrativeEn: string;
  lightNarrativeFa: string;

  lightImage: string;

  spatialSectionTitleEn: string;
  spatialSectionTitleFa: string;

  spatialNarrativeEn: string;
  spatialNarrativeFa: string;

  details: MaterialDetail[];

  drawings: BlueprintDrawing[];

  // -----------------------------------------
  // EXECUTION PHASE
  // -----------------------------------------

  // Optional "Execution Phase" section.
  executionSectionTitleEn?: string;
  executionSectionTitleFa?: string;

  executionNarrativeEn?: string;
  executionNarrativeFa?: string;

  // Each execution stage can now contain:
  //
  // 1 main image
  // +
  // multiple additional images
  //
  // through the galleryImages array.
  executionPhotos?: ExecutionMedia[];

  prevProjectId: string;
  nextProjectId: string;
}

export interface StudioInfo {
  name: string;

  taglineEn: string;
  taglineFa: string;

  aboutEn: string;
  aboutFa: string;

  principals: {
    name: string;

    role: string;
    roleFa: string;

    bioEn: string;
    bioFa: string;

    image: string;
  }[];

  services: {
    id: string;

    titleEn: string;
    titleFa: string;

    descEn: string;
    descFa: string;

    iconName: string;
  }[];

  offices: {
    cityEn: string;
    cityFa: string;

    addressEn: string;
    addressFa: string;

    phone: string;
    email: string;

    // Optional: precise GPS coordinates
    // for the map pin.
    latitude?: number;
    longitude?: number;
  }[];
}
