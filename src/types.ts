export type Language = 'EN' | 'FA';
export type ViewMode = 'project-detail' | 'projects-list' | 'about' | 'services' | 'contact';
export type ProjectCategory = 'All' | 'Residential' | 'Cultural' | 'Interior' | 'Concept';
export interface MaterialDetail {
  id: string;
  title: string;
  titleFa: string;
  caption: string;
  captionFa: string;
  imageUrl: string;
  aspectRatio: 'square' | 'video' | 'portrait';
}
export interface ExecutionMedia {
  id: string;
  title: string;
  titleFa: string;
  caption: string;
  captionFa: string;
  imageUrl: string;
  // "image" (default) shows a photo. "video" plays the file at imageUrl as a video.
  type?: 'image' | 'video';
}
export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  labelFa: string;
  description: string;
  descriptionFa: string;
}
export interface BlueprintDrawing {
  id: string;
  title: string;
  titleFa: string;
  type: 'Plan' | 'Section' | 'Elevation' | 'Axonometric';
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
  // Optional: "Execution Phase" gallery — photos AND videos of the building being built/completed.
  // Optional means you don't have to fill this in for every project right away;
  // if it's missing, the section simply won't be shown for that project.
  executionSectionTitleEn?: string;
  executionSectionTitleFa?: string;
  executionNarrativeEn?: string;
  executionNarrativeFa?: string;
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
  }[];
}
