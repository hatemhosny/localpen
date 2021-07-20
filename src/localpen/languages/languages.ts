import { LanguageSpecs } from '../models';
import { asciidoc } from './lang-asciidoc';
import { babel } from './lang-babel';
import { css } from './lang-css';
import { haml } from './lang-haml';
import { html } from './lang-html';
import { javascript } from './lang-javascript';
import { jsx } from './lang-jsx';
import { less } from './lang-less';
import { markdown } from './lang-markdown';
import { mdx } from './lang-mdx';
import { pug } from './lang-pug';
import { sass } from './lang-sass';
import { scss } from './lang-scss';
import { svelte } from './lang-svelte';
import { stylus } from './lang-stylus';
import { tsx } from './lang-tsx';
import { typescript } from './lang-typescript';
import { vue } from './lang-vue';
import { vue2 } from './lang-vue2';
import { stencil } from './lang-stencil';
import { coffeescript } from './lang-coffeescript';
import { livescript } from './lang-livescript';
import { assemblyscript } from './lang-assemblyscript';
import { python } from './lang-python';
import { ruby } from './lang-ruby';
import { php } from './lang-php';
import { perl } from './lang-perl';
import { lua } from './lang-lua';
import { scheme } from './lang-scheme';
import { solid } from './lang-solid';
import { solidTsx } from './lang-solid-tsx';
import { pyodide } from './lang-python-pyodide';

export const languages: LanguageSpecs[] = [
  html,
  markdown,
  mdx,
  pug,
  haml,
  asciidoc,
  css,
  scss,
  sass,
  less,
  stylus,
  javascript,
  babel,
  typescript,
  jsx,
  tsx,
  vue,
  vue2,
  svelte,
  stencil,
  solid,
  solidTsx,
  coffeescript,
  livescript,
  assemblyscript,
  python,
  pyodide,
  ruby,
  php,
  perl,
  lua,
  scheme,
];
