import { CustomConfig } from '../models';
import { decodeHTML, stringToValidJson } from '../utils';

export const markupConfigTypes = [
  'asciidoctor-config',
  'haml-config',
  'marked-config',
  'mdx-config',
  'pug-config',
] as const;
export const styleConfigTypes = [
  'sass-config',
  'less-config',
  'autoprefixer-config',
  'preset-env-config',
  'tailwind-config',
] as const;
export const scriptConfigTypes = [
  'babel-config',
  'coffeescript-config',
  'livescript-config',
  'solid-config',
  'stencil-config',
  'svelte-config',
  'typescript-config',
] as const;
export const customConfigTypes = [
  ...markupConfigTypes,
  ...styleConfigTypes,
  ...scriptConfigTypes,
] as const;

const createSelector = (types: typeof customConfigTypes) =>
  types.map((type) => `script[type="${type}"]`).join(',');

const customConfigsApply = (
  html: string,
  fn: (script: HTMLScriptElement) => void,
  types: typeof customConfigTypes = customConfigTypes,
) => {
  const container = document.createElement('div');
  container.style.display = 'none';
  container.innerHTML = html;
  const selector = createSelector(types);
  const scripts = container.querySelectorAll<HTMLScriptElement>(selector);
  scripts.forEach((script) => fn(script));
  const result = container.innerHTML;
  container.remove();
  return result;
};

export const extractCustomConfigs = (html: string, decode = false) => {
  const customConfigs: CustomConfig[] = [];
  customConfigsApply(html, (script) => {
    try {
      const scriptContent = decode ? decodeHTML(script.innerHTML) : script.innerHTML;
      const jsonStr = stringToValidJson(scriptContent);
      const content = JSON.parse(jsonStr) || {};
      customConfigs.push({ type: script.type as CustomConfig['type'], content });
    } catch (err) {
      //
    }
  });
  return customConfigs;
};

export const removeCustomConfigs = (html: string) =>
  customConfigsApply(html, (script) => {
    script.remove();
  });

export const getCustomConfig = (
  type: CustomConfig['type'],
  customConfigs: CustomConfig[] | undefined = [],
) =>
  customConfigs
    .filter((conf) => conf.type === type)
    .map((custom) => custom.content)
    .reduce((acc, content) => ({ ...acc, ...content }), {});
