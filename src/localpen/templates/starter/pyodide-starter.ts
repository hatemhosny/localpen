import { Template } from '../../models';

export const pyodideStarter: Template = {
  name: 'pyodide',
  title: 'Python (pyodide) Starter',
  thumbnail: 'assets/templates/python.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<h1>Python Visualizations</h1>
<div id="plot">Loading...</div>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'pyodide',
    content: `
from js import document
import pandas
import plotly.express as px
import plotly.io as pio

def show(figure, lib = 'plotly', element = ''):
  el = element
  if element == '':
    el = document.createElement('div')
    document.body.appendChild(el)
  el.innerHTML = ''

  if lib == 'plotly':
    iframe = document.createElement('iframe')
    iframe.srcdoc = pio.to_html(figure)
    iframe.style = 'border:none;'
    iframe.seamless = 'seamless'
    iframe.scrolling = 'no'
    iframe.height = '525'
    iframe.width = '100%'
    el.appendChild(iframe)

  if lib == 'matplotlib':
    iconStyles = document.createElement('link')
    iconStyles.rel = 'stylesheet'
    iconStyles.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
    document.head.appendChild(iconStyles)

    def create_root_element(self):
      return el

    figure.canvas.create_root_element = type(figure.canvas.create_root_element)(
      create_root_element, figure.canvas.__class__)
    figure.canvas.show()


# data
df = px.data.iris()

# Plotly
fig = px.scatter(df, x="sepal_length", y="sepal_width", color="species")
show(fig, 'plotly', document.getElementById('plot'))

## matplotlib
# from matplotlib import pyplot as plt

# formatter = plt.FuncFormatter(lambda i, *args: df['species'].unique()[int(i)])
# f = plt.figure(figsize=(6, 4))
# plt.scatter(df[df.columns[0]], df[df.columns[1]], c=df['species_id']-1)
# plt.colorbar(ticks=[0, 1, 2], format=formatter)
# plt.xlabel(df.columns[0])
# plt.ylabel(df.columns[1])
# plt.tight_layout()
# show(f, 'matplotlib')
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
