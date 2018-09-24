import * as YAML from 'yaml-ast-parser'
export interface NodeVisitor {
  visitScalar(node: YAML.YAMLScalar): void
  visitMapping(node: YAML.YAMLMapping): void
  visitSequence(node: YAML.YAMLSequence): void
  visitMap(node: YAML.YamlMap): void
  visitAnchorRef(node: YAML.YAMLAnchorReference): void
  visitIncludeRef(node: YAML.YAMLNode): void
}

export abstract class AbstractVisitor implements NodeVisitor {
  // Needed in lieu of `accept` method on nodes
  accept(node: YAML.YAMLNode) {
    switch (node.kind) {
      case YAML.Kind.SCALAR: {
        return this.visitScalar(<YAML.YAMLScalar>node)
      }
      case YAML.Kind.MAP: {
        return this.visitMap(<YAML.YamlMap>node)
      }
      case YAML.Kind.MAPPING: {
        return this.visitMapping(<YAML.YAMLMapping>node)
      }
      case YAML.Kind.SEQ: {
        return this.visitSequence(<YAML.YAMLSequence>node)
      }
      case YAML.Kind.ANCHOR_REF: {
        return this.visitAnchorRef(<YAML.YAMLAnchorReference>node)
      }
      case YAML.Kind.INCLUDE_REF: {
        return this.visitIncludeRef(node)
      }
    }
    throw new Error(`Kind, ${node.kind} not implemented.`)
  }
  abstract visitScalar(node: YAML.YAMLScalar): void
  abstract visitMapping(node: YAML.YAMLMapping): void
  abstract visitSequence(node: YAML.YAMLSequence): void
  abstract visitMap(node: YAML.YamlMap): void
  abstract visitAnchorRef(node: YAML.YAMLAnchorReference): void
  abstract visitIncludeRef(node: YAML.YAMLNode): void
}
