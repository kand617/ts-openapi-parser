import DummyClass from '../src/ts-openapi-parser'
import * as YAML from 'yaml-ast-parser'
import fs from 'fs'
import { YAMLNode, Kind, YAMLMapping } from 'yaml-ast-parser'
import { PrinterVisitor } from '../src/parser/printer-visitor'

/**
 * Dummy test
 */
describe('YAML Parser', () => {
  it('check if parses simple yaml document', () => {
    const yamlString = fs.readFileSync(__dirname + '/sample.yaml', 'utf8')
    const node: YAMLNode = YAML.safeLoad(yamlString)
    expect(node.kind).toEqual(Kind.MAP)
    node.mappings.forEach((mapping: YAMLMapping) => {
      expect(mapping.key.value).toBeTruthy()
    })
    expect(true).toBeTruthy()
  })
})

describe('Print Visitor', () => {
  it('prints a simple mapping', () => {
    const yamlString = 'key1: value1\nkey2: value2'
    const node: YAMLNode = YAML.safeLoad(yamlString)
    let vistor: PrinterVisitor = new PrinterVisitor()
    vistor.accept(node)
    expect(vistor.getOutput()).toEqual(yamlString)
  })

  it('prints a simple sequence', () => {
    const yamlString = 'key1:\n  - value1\n  - value2'
    const node: YAMLNode = YAML.safeLoad(yamlString)
    let vistor: PrinterVisitor = new PrinterVisitor()
    vistor.accept(node)
    expect(vistor.getOutput()).toEqual(yamlString)
  })

  it('prints a simple nested mapping', () => {
    const yamlString = 'key1:\n  prop1: value1'
    const expected = 'key1:@  prop1: value1'

    const node: YAMLNode = YAML.safeLoad(yamlString)
    let vistor: PrinterVisitor = new PrinterVisitor()
    vistor.accept(node)
    expect(vistor.getOutput()).toEqual(yamlString)
  })
})

/*
key1:
  prop1: value1
*/
