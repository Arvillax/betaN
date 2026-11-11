/**
 * Comparator demo: destination + weights → similarity score and breakdown.
 * The math lives in score.js; this module only reads controls and writes the result.
 */
import { scoreSite } from './score.js';
import { qs, qsa, formatNumber } from '../../lib/dom.js';
import { emit, on, EVENTS } from '../../lib/events.js';

/**
 * @param {HTMLElement} root `[data-comparator]`
 * @param {{ variables: {id:string,label:string}[], destinations: any[], profiles: any[] }} data
 */
export function createComparator(root, data) {
  const form = qs('[data-comparator-form]', root);
  const sliders = qsa('input[data-variable]', root);
  const profileButtons = qsa('[data-profile]', root);
  const labelOf = Object.fromEntries(data.variables.map((v) => [v.id, v.label]));
  const slideId = root.closest('[data-slide]')?.id;

  const output = {
    site: qs('[data-site]', root),
    score: qs('[data-score]', root),
    used: qs('[data-used]', root),
    lists: {
      coincide: qs('[data-list="coincide"]', root),
      difiere: qs('[data-list="difiere"]', root),
      earthCannot: qs('[data-list="earth-cannot"]', root),
    },
  };

  const destination = () => {
    const id = /** @type {HTMLInputElement} */ (qs('input[name="destination"]:checked', root)).value;
    return data.destinations.find((d) => d.id === id) ?? data.destinations[0];
  };

  const readWeights = () => Object.fromEntries(sliders.map((s) => [s.dataset.variable, Number(s.value)]));

  function fillList(list, items) {
    list.replaceChildren(
      ...(items.length ? items : ['—']).map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }),
    );
  }

  function render() {
    const target = destination();
    const result = scoreSite(target.differences, readWeights());

    output.site.textContent = target.site;
    output.score.textContent = result.score === null ? '—' : formatNumber(result.score);
    output.used.textContent = result.total
      ? `Usa ${result.used} de ${result.total} variables con peso`
      : 'Dale peso a al menos una variable';

    result.breakdown.forEach(({ id, similarity, verdict, weight }) => {
      const row = qs(`[data-bar="${id}"]`, root);
      row.dataset.verdict = verdict;
      row.classList.toggle('is-muted', weight === 0);
      row.style.setProperty('--value', String(similarity ?? 0));
      qs('[data-bar-value]', row).textContent = similarity === null ? 'sin dato' : formatNumber(similarity);
    });

    const counted = result.breakdown.filter((v) => v.weight > 0);
    fillList(output.lists.coincide, counted.filter((v) => v.verdict === 'coincide').map((v) => labelOf[v.id]));
    fillList(output.lists.difiere, counted.filter((v) => v.verdict === 'difiere').map((v) => labelOf[v.id]));
    fillList(output.lists.earthCannot, target.earthCannot);
  }

  function setActiveProfile(id) {
    profileButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.profile === id)));
  }

  function applyProfile(id) {
    const profile = data.profiles.find((p) => p.id === id);
    if (!profile) return;
    sliders.forEach((slider) => {
      slider.value = String(profile.weights[slider.dataset.variable] ?? 0);
      syncSliderOutput(slider);
    });
    setActiveProfile(id);
    render();
  }

  function syncSliderOutput(slider) {
    const out = qs(`[data-weight-output="${slider.dataset.variable}"]`, root);
    if (out) out.textContent = slider.value;
    slider.style.setProperty('--fill', `${slider.value}%`);
  }

  const requestWorld = () => emit(EVENTS.WORLD_REQUEST, { world: destination().world });

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', (event) => {
    const target = /** @type {HTMLInputElement} */ (event.target);
    if (target.matches('input[data-variable]')) {
      syncSliderOutput(target);
      setActiveProfile(null); // manual weights no longer match a preset
    }
    if (target.name === 'destination') requestWorld();
    render();
  });
  profileButtons.forEach((button) => button.addEventListener('click', () => applyProfile(button.dataset.profile)));

  // Entering this slide shows the chosen destination's terrain, not the slide default.
  const unsubscribe = on(EVENTS.SLIDE_CHANGE, ({ id }) => {
    if (id === slideId) requestWorld();
  });

  sliders.forEach(syncSliderOutput);
  render();

  return { destroy: unsubscribe };
}
