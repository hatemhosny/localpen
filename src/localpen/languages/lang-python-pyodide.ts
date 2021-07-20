import { LanguageSpecs } from '../models';

export const pyodide: LanguageSpecs = {
  name: 'pyodide',
  title: 'Pyodide',
  longTitle: 'Python (Pyodide)',
  info: `
  <h3>Python</h3>
  <div>Python with the scientific stack, compiled to WebAssembly using Pyodide.</div>
  <div class="description">
    Pyodide allows using Python scientific stack including NumPy, Pandas, Matplotlib, SciPy, scikit-learn and many more.
    In addition it’s possible to install pure Python wheels from PyPi.
  </div>
  <ul>
    <li><a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a></li>
    <li><a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a></li>
    <li><a href="https://pyodide.org/" target="_blank" rel="noopener">Pyodide documentation</a></li>
    <!-- <li><a href="#">Python usage in LocalPen</a></li> -->
    <li><a href="?template=pyodide" target="_parent" data-template="pyodide">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'assets/noop.js',
    factory: () => async (code) => code,
    scripts: ['https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js'],
    inlineScript: `window.addEventListener("load", () => {
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/python"]');
  scripts.forEach(script => code += script.innerHTML + '\\n');
  async function main() {
    await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/",
    });
  }
  let pyodideReady = main();
  async function evaluatePython() {
    await pyodideReady;
    try {
      let output = await pyodide.runPythonAsync(code);
    } catch (err) {
      console.log(err);
    }
  }
  evaluatePython();
})
`,
    scriptType: 'text/python',
  },
  extensions: ['py3'],
  editor: 'script',
};
