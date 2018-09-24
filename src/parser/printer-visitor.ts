import { AbstractVisitor } from './visitor'
import * as YAML from 'yaml-ast-parser'
import { Kind } from 'yaml-ast-parser'
const COLON = ':'
const NEW_LINE = '\n'
const EMPTY = ''
const HYPEN = '-'
const SPACE = ' '
export class PrinterVisitor extends AbstractVisitor {
  private output: string = ''
  private indentLevel = 0

  getOutput() {
    return this.output.trim()
  }
  appendValue(value: string, indentLevel?: number) {
    let indentedValue = indentLevel ? this.indent(value, indentLevel) : value
    this.output += `${indentedValue}`
  }
  incrementIndent() {
    this.indentLevel = this.indentLevel + 2
  }
  decrementIndent() {
    this.indentLevel = this.indentLevel - 2
  }
  indent(value: string, w: number) {
    if (1 == arguments.length) w = 2
    let padding = ''
    if ('number' == typeof w) padding = new Array(w + 1).join(' ')
    if (value == '') return padding + value
    else return value.replace(/^(?!$)/gm, padding)
  }

  visitScalar(node: YAML.YAMLScalar): void {
    this.appendValue(node.value)
  }
  visitMapping(node: YAML.YAMLMapping): void {
    this.appendValue(EMPTY, this.indentLevel)
    this.visitScalar(node.key)
    this.appendValue(COLON)
    if (node.value.kind === Kind.SCALAR) {
      this.appendValue(SPACE)
    }
    if (node.value) {
      this.accept(node.value)
    } else {
      throw new YAML.YAMLException(
        `Parsing error at at position ${node.key.endPosition} after "${node.key.value}"`
      )
    }
    this.appendValue(NEW_LINE)
  }
  visitSequence(node: YAML.YAMLSequence): void {
    this.appendValue(NEW_LINE)
    this.incrementIndent()
    node.items.forEach(n => {
      this.appendValue(HYPEN, this.indentLevel)
      this.appendValue(SPACE)
      this.accept(n)
      this.appendValue(NEW_LINE)
    })
    this.decrementIndent()
  }
  visitMap(node: YAML.YamlMap): void {
    this.appendValue(NEW_LINE)
    node.mappings.map(n => this.accept(n))
  }
  visitAnchorRef(node: YAML.YAMLAnchorReference): void {
    // console.log(node.value)
  }
  visitIncludeRef(node: YAML.YAMLNode): void {
    console.log(node.value)
  }
}
