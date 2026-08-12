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

  /**
   * Additional images for this detail.
   * imageUrl is always the first image.
   */
  galleryImages?: string[];
}


/**
 * Media used in the project execution / construction phase.
 *
 * Each execution stage can contain:
 * - one main image
 * - multiple additional images
 * - image or video media
 */
export interface ExecutionMedia {
  id: string;

  /**
   * English title of the execution stage.
   * Example: "Foundation"
   */
  title: string;

  /**
   * Persian title of the execution stage.
   * Example: "فونداسیون"
   */
  titleFa: string;

  /**
   * English description/caption.
   */
  caption: string;

  /**
   * Persian description/caption.
   */
  captionFa: string;

  /**
   * Main image/video of this execution stage.
   */
  imageUrl: string;

  /**
   * Additional images for the same execution stage.
   *
   * Example:
   *
   * imageUrl: "/images/foundation-01.jpg",
   * galleryImages: [
   *   "/images/foundation-02.jpg",
   *   "/images/foundation-03.jpg",
   *   "/images/foundation-04.jpg"
   * ]
   *
   * The main imageUrl is always displayed first.
   */
  galleryImages?: string[];

  /**
   * Media type.
   *
   * image = normal image
   * video = video file
   */
  type?: 'image' | 'video';
}


export interface Hotspot {
  id: string;

  /**
   * Horizontal position in percentage.
   */
  x: number;

  /**
   * Vertical position in percentage.
   */
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

  /**
   * Main hero image.
   */
  heroImage: string;

  /**
   * Optional additional hero images.
   *
   * heroImage is always considered the first image.
   */
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


  /**
   * Material / architectural details.
   */
  details: MaterialDetail[];


  /**
   * Architectural drawings.
   */
  drawings: BlueprintDrawing[];


  /**
   * -----------------------------------------
   * EXECUTION / CONSTRUCTION PHASE
   * -----------------------------------------
   *
   * Optional because not every project needs
   * an execution section.
   */

  executionSectionTitleEn?: string;

  executionSectionTitleFa?: string;

  executionNarrativeEn?: string;

  executionNarrativeFa?: string;


  /**
   * List of construction stages.
   *
   * Each stage can contain:
   * - one main image
   * - multiple additional images
   * - image or video
   */
  executionPhotos?: ExecutionMedia[];


  /**
   * Navigation between projects.
   */
  prevProjectId: string;

  nextProjectId: string;
}


export interface StudioInfo {
  name: string;

  taglineEn: string;
  taglineFa: string;

  aboutEn: string;
  aboutFa: string;

  /**
   * Short note explaining the meaning/origin of the studio's name.
   */
  nameMeaningEn?: string;
  nameMeaningFa?: string;


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

    /**
     * Optional GPS coordinates.
     */
    latitude?: number;
    longitude?: number;
  }[];
}
