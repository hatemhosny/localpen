import { Pen } from '../../models';
import { validateConfig } from '../validate-config';

describe('validateConfig', () => {
  test('validateConfig', () => {
    const testConfig: any = {
      baseUrl: '/localpen',
      autoupdate: 'true',
      autosave: false,
      delay: '500',
      emmet: true,
      mode: 'full',
      console: '',
      compiled: '',
      editor: {
        fontSize: 14,
        theme: 'vs-dark',
        formatOnType: false,
        tabSize: 2,
        lineNumbersMinChars: 3,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          useShadows: false,
        },
        mouseWheelZoom: true,
        automaticLayout: true,
      },
      allowLangChange: true,
      language: 'html',
      activeEditor: 'markup',
      markup: {
        language: 'html',
        content: '',
        contentUrl: '',
        selector: '',
      },
      style: {
        language: 'css',
        content: '',
        contentUrl: '',
        selector: '',
      },
      script: {
        language: 'javascript',
        content: '',
        contentUrl: '',
        selector: '',
      },
      stylesheets: [],
      scripts: [],
      cssPreset: '',
      modules: [],
      imports: {},
      types: {},
    };

    const correctConfig: any = {
      autosave: false,
      emmet: true,
      mode: 'full',
      console: '',
      compiled: '',
      allowLangChange: true,
      activeEditor: 'markup',
      markup: {
        language: 'html',
        content: '',
        contentUrl: '',
        selector: '',
      },
      style: {
        language: 'css',
        content: '',
        contentUrl: '',
        selector: '',
      },
      script: {
        language: 'javascript',
        content: '',
        contentUrl: '',
        selector: '',
      },
      cssPreset: '',
      imports: {},
      types: {},
    };
    const invalidConfig = {
      all: 'properties',
      here: 'are',
      invalid: '!',
    } as Partial<Pen>;
    expect(validateConfig(testConfig)).toEqual(correctConfig);
    expect(validateConfig(invalidConfig)).toEqual({});
  });
});
