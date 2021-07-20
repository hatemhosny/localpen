import { createEventsManager } from './events';
import { customConfigTypes } from './languages';

export interface Pen {
  title: string;
  autoupdate: boolean;
  autosave: boolean;
  delay: number;
  emmet: boolean;
  mode: 'full' | 'editor' | 'codeblock' | 'result';
  readonly: boolean;
  console: ToolsPaneStatus;
  compiled: ToolsPaneStatus;
  allowLangChange: boolean;
  activeEditor: EditorId | undefined;
  languages: Language[] | undefined;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  processors: {
    postcss: {
      autoprefixer: boolean;
      postcssPresetEnv: boolean;
      tailwindcss: boolean;
    };
  };
  imports: { [key: string]: string };
  types: Types;
  editor: 'monaco' | 'codemirror' | 'prism' | '';
  readonly version: string;
  showVersion: boolean;
}

export type ContentPen = Pick<
  Pen,
  | 'title'
  | 'activeEditor'
  | 'languages'
  | 'markup'
  | 'style'
  | 'script'
  | 'stylesheets'
  | 'scripts'
  | 'cssPreset'
  | 'imports'
  | 'types'
  | 'processors'
  | 'version'
>;

export type Language =
  | 'html'
  | 'htm'
  | 'markdown'
  | 'md'
  | 'mdown'
  | 'mkdn'
  | 'mdx'
  | 'pug'
  | 'jade'
  | 'haml'
  | 'asciidoc'
  | 'adoc'
  | 'asc'
  | 'css'
  | 'scss'
  | 'sass'
  | 'less'
  | 'stylus'
  | 'styl'
  | 'postcss'
  | 'javascript'
  | 'js'
  | 'babel'
  | 'es'
  | 'typescript'
  | 'ts'
  | 'jsx'
  | 'tsx'
  | 'vue'
  | 'vue3'
  | 'vue2'
  | 'svelte'
  | 'stencil'
  | 'stencil.tsx'
  | 'solid'
  | 'solid.jsx'
  | 'solid.tsx'
  | 'coffeescript'
  | 'coffee'
  | 'livescript'
  | 'ls'
  | 'assemblyscript'
  | 'as'
  | 'python'
  | 'py'
  | 'pyodide'
  | 'py3'
  | 'ruby'
  | 'rb'
  | 'php'
  | 'perl'
  | 'pl'
  | 'pm'
  | 'lua'
  | 'scheme'
  | 'scm';

export interface Editor {
  language: Language;
  content?: string;
  contentUrl?: string;
  selector?: string;
}

export type EditorId = 'markup' | 'style' | 'script';

export interface Editors {
  markup: CodeEditor;
  style: CodeEditor;
  script: CodeEditor;
}
export interface EditorLanguages {
  markup: Language;
  style: Language;
  script: Language;
}

export interface Types {
  [key: string]: TypeValue;
}

export type TypeValue =
  | string
  | {
      url: string;
      declareAsModule?: boolean;
      autoload?: boolean;
    };

export interface LanguageSpecs {
  name: Language;
  title: string;
  longTitle?: string;
  info?: string;
  parser?: Parser;
  compiler?: Compiler | Language;
  extensions: Language[];
  editor: EditorId;
  preset?: CssPresetId;
}

export interface Processors {
  name: ProcessorName | Language;
  title: string;
  longTitle?: string;
  info?: string;
  compiler: Compiler | ProcessorName | Language;
  editors?: EditorId[];
}

export type ProcessorName = 'postcss';

export type ParserName =
  | 'babel'
  | 'babel-ts'
  | 'html'
  | 'markdown'
  | 'css'
  | 'scss'
  | 'less'
  | 'pug';
export interface Parser {
  name: ParserName;
  plugins?: any[];
  pluginUrls: string[];
}
export type FormatFn = (
  value: string,
  cursorOffset: number,
) => Promise<{ formatted: string; cursorOffset: number }>;
export type CssPresetId =
  | ''
  | 'normalize.css'
  | 'reset-css'
  | 'github-markdown-css'
  | 'asciidoctor.css';

export interface CssPreset {
  id: CssPresetId;
  name: string;
  url: string;
}

export interface EditorLibrary {
  filename: string;
  content: string;
}

export type CompilerFunction = (
  code: string,
  {
    config,
    options,
    baseUrl,
  }: {
    config: Pen;
    options: CompileOptions;
    baseUrl: string;
  },
) => Promise<string>;

export interface Compiler {
  dependencies?: Language[];
  url: string;
  fn?: CompilerFunction;
  factory: (config: Pen) => CompilerFunction;
  umd?: boolean;
  editors?: EditorId[];
  styles?: string[];
  scripts?: string[];
  deferScripts?: boolean;
  inlineScript?: string;
  scriptType?:
    | 'text/python'
    | 'text/ruby'
    | 'text/x-uniter-php'
    | 'text/perl'
    | 'text/biwascheme'
    | 'application/lua';
  aliasTo?: Language;
}

export interface Compilers {
  [language: string]: Compiler;
}

export interface Template {
  name: string;
  title: string;
  thumbnail: string;
  activeEditor: EditorId;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  processors?: {
    postcss: {
      autoprefixer: boolean;
      postcssPresetEnv: boolean;
      tailwindcss: boolean;
    };
  };
  imports: { [key: string]: string };
  types: Types;
}

export interface Tool {
  title: string;
  load: () => Promise<void>;
  onActivate: () => void;
  onDeactivate: () => void;
}

export type ToolsPaneStatus = 'closed' | 'open' | 'full' | 'none' | '';

export type ToolList = Array<{
  name: 'console' | 'compiled';
  factory: (
    config: Pen,
    baseUrl: string,
    editors: Editors,
    eventsManager: ReturnType<typeof createEventsManager>,
  ) => Tool;
}>;

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string, newState?: boolean) => void;
  getLanguage: () => Language;
  setLanguage: (language: Language) => void;
  focus: () => void;
  layout?: () => void;
  addTypes?: (lib: EditorLibrary) => any;
  configureEmmet?: (enabled: boolean) => void;
  onContentChanged: (callback: () => void) => void;
  addKeyBinding: (label: string, keybinding: any, callback: () => void) => void;
  keyCodes: {
    CtrlEnter: any;
    Enter: any;
    UpArrow: any;
    DownArrow: any;
  };
  registerFormatter: (formatFn: FormatFn | undefined) => void;
  format: () => void;
  isReadonly: boolean;
  monaco?: any;
  codemirror?: any;
  prism?: any;
}

export interface EditorOptions {
  baseUrl: string;
  container: HTMLElement | null;
  language: Language;
  value: string;
  mode?: Pen['mode'];
  readonly: boolean;
  editor?: Pen['editor'];
  editorType: 'code' | 'compiled' | 'console';
}

export interface User {
  uid: string;
  token: string | null;
  displayName: string | null;
  username: string | null;
  email: string | null;
  photoURL: string | null;
}

export type GithubScope = 'gist' | 'repo' | 'public_repo';

export interface ShareData {
  url: string;
  title: string;
}
export interface CustomConfig {
  content: Record<string, any>;
  type: typeof customConfigTypes[number];
}

export interface CompileOptions {
  language: Language;
  html?: string;
  customConfigs?: CustomConfig[];
  force?: boolean;
}

export interface Screen {
  screen: 'login' | 'new' | 'open' | 'import' | 'external' | 'share' | 'deploy';
  show: () => void | Promise<unknown>;
}
