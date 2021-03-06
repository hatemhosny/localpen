import { Editor, Pen } from '../models';

export const validateConfig = (config: Partial<Pen>): Partial<Pen> => {
  type types = 'array' | 'boolean' | 'object' | 'number' | 'string' | 'undefined';
  const is = (x: any, type: types, arrayType?: types): boolean => {
    if (type === 'array') {
      if (!Array.isArray(x)) return false;
      if (arrayType) {
        return x.filter((l) => is(l, arrayType)).length > 0;
      }
      return true;
    }
    return typeof x === type;
  };

  const includes = (arr: any[], x: any) => x != null && arr.includes(x);

  const modes = ['full', 'editor', 'codeblock', 'result'];
  const toolsPaneStatus = ['', 'full', 'closed', 'open', 'none'];
  const editors = ['monaco', 'codemirror', 'prism', ''];
  const editorIds = ['markup', 'style', 'script'];

  const isEditor = (x: any) => {
    if (!x) return false;
    if (!is(x, 'object')) return false;
    return is(x.language, 'string');
  };

  const validateEditorProps = (x: Editor): Editor => ({
    language: x.language,
    ...(is(x.content, 'string') ? { content: x.content } : {}),
    ...(is(x.contentUrl, 'string') ? { contentUrl: x.contentUrl } : {}),
    ...(is(x.selector, 'string') ? { selector: x.selector } : {}),
  });

  return {
    ...(is(config.title, 'string') ? { title: config.title } : {}),
    ...(is(config.autoupdate, 'boolean') ? { autoupdate: config.autoupdate } : {}),
    ...(is(config.autosave, 'boolean') ? { autosave: config.autosave } : {}),
    ...(is(config.delay, 'number') ? { delay: config.delay } : {}),
    ...(is(config.emmet, 'boolean') ? { emmet: config.emmet } : {}),
    ...(includes(modes, config.mode) ? { mode: config.mode } : {}),
    ...(is(config.readonly, 'boolean') ? { readonly: config.readonly } : {}),
    ...(includes(toolsPaneStatus, config.console) ? { console: config.console } : {}),
    ...(includes(toolsPaneStatus, config.compiled) ? { compiled: config.compiled } : {}),
    ...(is(config.allowLangChange, 'boolean') ? { allowLangChange: config.allowLangChange } : {}),
    ...(includes(editorIds, config.activeEditor) ? { activeEditor: config.activeEditor } : {}),
    ...(is(config.languages, 'array', 'string') ? { languages: config.languages } : {}),
    ...(isEditor(config.markup) ? { markup: validateEditorProps(config.markup as Editor) } : {}),
    ...(isEditor(config.style) ? { style: validateEditorProps(config.style as Editor) } : {}),
    ...(isEditor(config.script) ? { script: validateEditorProps(config.script as Editor) } : {}),
    ...(is(config.stylesheets, 'array', 'string') ? { stylesheets: config.stylesheets } : {}),
    ...(is(config.scripts, 'array', 'string') ? { scripts: config.scripts } : {}),
    ...(is(config.cssPreset, 'string') ? { cssPreset: config.cssPreset } : {}),
    ...(is(config.processors, 'object') ? { processors: config.processors } : {}),
    ...(includes(editors, config.editor) ? { editor: config.editor } : {}),
    ...(is(config.imports, 'object') ? { imports: config.imports } : {}),
    ...(is(config.types, 'object') ? { types: config.types } : {}),
    ...(is(config.version, 'string') ? { version: config.version } : {}),
    ...(is(config.showVersion, 'boolean') ? { showVersion: config.showVersion } : {}),
  };
};
