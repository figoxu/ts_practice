import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  ConnectionLineType,
  MarkerType,
  Node,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { NodeSidebar } from './NodeSidebar';
import { TaskNode } from './nodes/TaskNode';
import { StartNode } from './nodes/StartNode';
import { EndNode } from './nodes/EndNode';
import { exportToBPMN } from './utils/bpmnExporter';

// 定义节点类型
const nodeTypes: NodeTypes = {
  task: TaskNode,
  start: StartNode,
  end: EndNode,
};

// 初始节点
const initialNodes: Node[] = [
  {
    id: 'start-1',
    type: 'start',
    position: { x: 250, y: 5 },
    data: { label: '开始' },
  },
];

// 初始边
const initialEdges: Edge[] = [];

export const FlowDiagramEditor: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // 处理连接事件
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // 处理拖拽放下事件
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // 检查是否有效的节点类型
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (reactFlowBounds && reactFlowInstance) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        
        const id = `${type}-${nodes.length + 1}`;
        let newNode: Node = {
          id,
          type,
          position,
          data: { label: `${type === 'task' ? '任务' : type === 'end' ? '结束' : ''}` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, nodes, setNodes]
  );

  // 导出为BPMN
  const handleExportBPMN = () => {
    const bpmnXml = exportToBPMN(nodes, edges);
    
    // 创建下载链接
    const element = document.createElement('a');
    const file = new Blob([bpmnXml], { type: 'text/xml' });
    element.href = URL.createObjectURL(file);
    element.download = 'process.bpmn';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flow-editor-container" style={{ display: 'flex', height: '100%' }}>
      <NodeSidebar />
      <div 
        className="reactflow-wrapper" 
        ref={reactFlowWrapper} 
        style={{ flex: 1, height: '100%' }}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
          <div className="export-button">
            <button onClick={handleExportBPMN} style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
              导出BPMN
            </button>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}; 