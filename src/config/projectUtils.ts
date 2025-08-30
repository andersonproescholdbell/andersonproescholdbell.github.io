import { projectData } from './projects';
import { getColorForTheming } from './colors';

export function getProjectColor(categoryId: string, projectId: string) {
  const category = projectData[categoryId];
  if (!category) return null;
  
  const project = category.projects.find(p => p.id === projectId);
  if (!project?.color) return null;
  
  return getColorForTheming(project.color);
}

export function getCategoryColor(categoryId: string) {
  const category = projectData[categoryId];
  if (!category) return null;
  
  return getColorForTheming(category.color);
}