/**
 * Builds the Handlebars context. Runs in Node (vite.config.js), so it must stay free of browser APIs.
 */
import { site, worlds } from './site.js';
import { slides } from './slides.js';
import { hero, challenge, notThis, method } from './challenge.js';
import { dimensions, dimensionsCopy, coverageLabels } from './dimensions.js';
import { variables, destinations, profiles, comparatorCopy } from './comparator.sample.js';
import { datasetRows, datasetsCopy } from './datasets.js';
import { milestones, roadmapCopy, statusLabels } from './roadmap.js';
import { members, teamCopy } from './team.js';

export function buildContext() {
  return {
    site,
    worlds,
    slides,
    hero,
    challenge,
    notThis,
    method,
    dimensions: dimensions.map((d) => ({ ...d, coverageLabel: coverageLabels[d.coverage] })),
    dimensionsCopy,
    comparator: {
      // Sliders start on the first profile.
      variables: variables.map((v) => ({ ...v, weight: profiles[0].weights[v.id] ?? 0 })),
      destinations,
      profiles: profiles.map((p, i) => ({ ...p, active: i === 0 })),
      copy: comparatorCopy,
    },
    datasets: { rows: datasetRows, copy: datasetsCopy },
    roadmap: {
      milestones: milestones.map((m) => ({ ...m, statusLabel: statusLabels[m.status] })),
      copy: roadmapCopy,
    },
    team: { members, copy: teamCopy },
    year: new Date().getFullYear(),
  };
}
