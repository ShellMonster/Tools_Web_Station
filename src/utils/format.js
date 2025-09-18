import { parse as parseToml, stringify as stringifyToml } from '@ltd/j-toml'
import he from 'he'
import beautify from 'js-beautify'
import Papa from 'papaparse'
import { format as sqlFormat } from 'sql-formatter'
import xmlFormat from 'xml-formatter'
import YAML from 'yaml'

const { js: beautifyJs, css: beautifyCss, html: beautifyHtml } = beautify

export function formatJson(value) {
  const parsed = JSON.parse(value)
  return JSON.stringify(parsed, null, 2)
}

export function minifyJson(value) {
  const parsed = JSON.parse(value)
  return JSON.stringify(parsed)
}

export function validateJson(value) {
  try {
    JSON.parse(value)
    return { valid: true }
  } catch (error) {
    return { valid: false, message: error.message }
  }
}

export function formatYaml(yamlString) {
  const doc = YAML.parse(yamlString)
  return YAML.stringify(doc)
}

export function yamlToJson(yamlString) {
  const doc = YAML.parse(yamlString)
  return JSON.stringify(doc, null, 2)
}

export function jsonToYaml(jsonString) {
  const doc = JSON.parse(jsonString)
  return YAML.stringify(doc)
}

export function tomlToJson(tomlString) {
  const doc = parseToml(tomlString, { joiner: '\n', bigint: false })
  return JSON.stringify(doc, null, 2)
}

export function jsonToToml(jsonString) {
  const doc = JSON.parse(jsonString)
  return stringifyToml(doc, {
    newline: '\n',
    indent: '  ',
    sort: false,
  })
}

export function csvToJson(csvString) {
  const parsed = Papa.parse(csvString.trim(), { header: true, skipEmptyLines: true })
  return JSON.stringify(parsed.data, null, 2)
}

export function jsonToCsv(jsonString) {
  const data = JSON.parse(jsonString)
  return Papa.unparse(data)
}

export function formatHtml(value) {
  return beautifyHtml(value, { indent_size: 2, wrap_line_length: 120 })
}

export function formatCss(value) {
  return beautifyCss(value, { indent_size: 2 })
}

export function formatJavascript(value) {
  return beautifyJs(value, { indent_size: 2 })
}

export function minifyHtml(value) {
  return value
    .replace(/<!--[^]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function minifyCss(value) {
  return value
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim()
}

export function minifyJavascript(value) {
  return value
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([=+\-*/{}();,:<>])\s*/g, '$1')
    .trim()
}

export function formatXml(value) {
  return xmlFormat(value, {
    indentation: '  ',
    collapseContent: true,
    lineSeparator: '\n',
  })
}

export function minifyXml(value) {
  return value
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function encodeHtmlEntities(value) {
  return he.encode(value)
}

export function decodeHtmlEntities(value) {
  return he.decode(value)
}

export function formatSql(value) {
  return sqlFormat(value, { language: 'sql' })
}
