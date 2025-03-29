import { Edge, Node } from 'reactflow';
import { js2xml } from 'xml-js';

// 声明模块
declare module 'bpmn-moddle';

export const exportToBPMN = (nodes: Node[], edges: Edge[]): string => {
  // 创建基本的BPMN结构
  const bpmnDiagram: any = {
    _declaration: { _attributes: { version: '1.0', encoding: 'UTF-8' } },
    'bpmn:definitions': {
      _attributes: {
        'xmlns:bpmn': 'http://www.omg.org/spec/BPMN/20100524/MODEL',
        'xmlns:bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
        'xmlns:dc': 'http://www.omg.org/spec/DD/20100524/DC',
        'xmlns:di': 'http://www.omg.org/spec/DD/20100524/DI',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        id: 'Definitions_1',
        targetNamespace: 'http://bpmn.io/schema/bpmn',
      },
      'bpmn:process': {
        _attributes: {
          id: 'Process_1',
          isExecutable: 'false',
        },
        // 节点和连线
        'bpmn:startEvent': [] as any[],
        'bpmn:task': [] as any[],
        'bpmn:endEvent': [] as any[],
        'bpmn:sequenceFlow': [] as any[],
      },
      'bpmndi:BPMNDiagram': {
        _attributes: {
          id: 'BPMNDiagram_1',
        },
        'bpmndi:BPMNPlane': {
          _attributes: {
            id: 'BPMNPlane_1',
            'bpmnElement': 'Process_1',
          },
          // 图形表示
          'bpmndi:BPMNShape': [] as any[],
          'bpmndi:BPMNEdge': [] as any[],
        },
      },
    },
  };

  // 处理节点
  nodes.forEach((node) => {
    const x = node.position.x;
    const y = node.position.y;
    const width = 100;
    const height = 80;

    if (node.type === 'start') {
      bpmnDiagram['bpmn:definitions']['bpmn:process']['bpmn:startEvent'].push({
        _attributes: {
          id: node.id,
          name: node.data.label || '开始',
        },
      });

      bpmnDiagram['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNShape'].push({
        _attributes: {
          id: `Shape_${node.id}`,
          'bpmnElement': node.id,
        },
        'dc:Bounds': {
          _attributes: {
            x: x.toString(),
            y: y.toString(),
            width: width.toString(),
            height: height.toString(),
          },
        },
      });
    } else if (node.type === 'task') {
      bpmnDiagram['bpmn:definitions']['bpmn:process']['bpmn:task'].push({
        _attributes: {
          id: node.id,
          name: node.data.label || '任务',
        },
      });

      bpmnDiagram['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNShape'].push({
        _attributes: {
          id: `Shape_${node.id}`,
          'bpmnElement': node.id,
        },
        'dc:Bounds': {
          _attributes: {
            x: x.toString(),
            y: y.toString(),
            width: width.toString(),
            height: height.toString(),
          },
        },
      });
    } else if (node.type === 'end') {
      bpmnDiagram['bpmn:definitions']['bpmn:process']['bpmn:endEvent'].push({
        _attributes: {
          id: node.id,
          name: node.data.label || '结束',
        },
      });

      bpmnDiagram['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNShape'].push({
        _attributes: {
          id: `Shape_${node.id}`,
          'bpmnElement': node.id,
        },
        'dc:Bounds': {
          _attributes: {
            x: x.toString(),
            y: y.toString(),
            width: width.toString(),
            height: height.toString(),
          },
        },
      });
    }
  });

  // 处理边
  edges.forEach((edge) => {
    bpmnDiagram['bpmn:definitions']['bpmn:process']['bpmn:sequenceFlow'].push({
      _attributes: {
        id: edge.id,
        sourceRef: edge.source,
        targetRef: edge.target,
      },
    });

    bpmnDiagram['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNEdge'].push({
      _attributes: {
        id: `Edge_${edge.id}`,
        'bpmnElement': edge.id,
      },
      'di:waypoint': [
        {
          _attributes: {
            x: '0',
            y: '0',
          },
        },
        {
          _attributes: {
            x: '0',
            y: '0',
          },
        },
      ],
    });
  });

  // 转换为XML
  const options = { compact: true, ignoreComment: true, spaces: 2 };
  return js2xml(bpmnDiagram, options);
}; 