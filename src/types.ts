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
  // Kept for backward compatibility with older sample projects;
  // not shown as filter chips.
  | 'Cultural'
  | 'Interior'
  | 'Concept';

export interface MaterialDetail {
  id: string;

  title: string;
  titleFa: string;

  caption: string;
  captionFa: string;

  // Main image
  imageUrl: string;

  aspectRatio: 'square' | 'video' | 'portrait';

  // Optional: additional photos shown together
  // when this detail item is clicked.
  galleryImages?: string[];
}

/**
 * Media used in the Execution Phase.
 *
 * Each execution stage can contain:
 * - one main image
 * - multiple additional images
 * - or a video
 */
export interface ExecutionMedia {
  id: string;

  title: string;
  titleFa: string;

  caption: string;
  captionFa: string;

  // Main image of this execution stage
  imageUrl: string;

  // Additional images belonging to the same execution stage
  // Example:
  // [
  //   "/images/foundation-02.jpg",
  //   "/images/foundation-03.jpg",
  //   "/images/foundation-04.jpg"
  // ]
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

  // Main project image
  heroImage: string;

  // Optional: additional hero images shown as a slider/carousel
  heroImages?: string[];

  narrativeEn: string;
  narrativeFa: string;

  // Lighting / conceptual section
  lightSectionTitleEn: string;
  lightSectionTitleFa: string;

  lightNarrativeEn: string;
  lightNarrativeFa: string;

  lightImage: string;

  // Spatial section
  spatialSectionTitleEn: string;
  spatialSectionTitleFa: string;

  spatialNarrativeEn: string;
  spatialNarrativeFa: string;

  // Material / detail sections
  details: MaterialDetail[];

  // Architectural drawings
  drawings: BlueprintDrawing[];

  /**
   * Execution Phase
   *
   * These fields are optional.
   * If executionPhotos is not provided,
   * the Execution Phase section will not be shown.
   */
  executionSectionTitleEn?: string;
  executionSectionTitleFa?: string;

  executionNarrativeEn?: string;
  executionNarrativeFa?: string;

  /**
   * Each item represents one stage of construction.
   *
   * Every stage can have:
   * - one main image
   * - multiple additional images through galleryImages
   * - or a video
   */
  executionPhotos?: ExecutionMedia[];

  // Previous / next project navigation
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

    // Optional GPS coordinates for the map
    latitude?: number;
    longitude?: number;
  }[];
}
