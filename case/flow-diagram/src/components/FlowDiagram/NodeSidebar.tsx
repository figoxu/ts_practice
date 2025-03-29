import React from 'react';

// 侧边栏节点类型
interface NodeItem {
  type: string;
  label: string;
}

const nodeItems: NodeItem[] = [
  { type: 'task', label: '任务节点' },
  { type: 'start', label: '开始节点' },
  { type: 'end', label: '结束节点' },
];

export const NodeSidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="node-sidebar" style={{
      width: '200px',
      backgroundColor: '#f8f8f8',
      borderRight: '1px solid #ddd',
      padding: '15px',
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px',
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>节点类型</h3>
      {nodeItems.map((item) => (
        <div
          key={item.type}
          className={`node-item node-${item.type}`}
          onDragStart={(event) => onDragStart(event, item.type)}
          draggable
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            marginBottom: '8px',
            cursor: 'grab',
            backgroundColor: item.type === 'start' ? '#e6f7e6' : 
                             item.type === 'end' ? '#f8d7da' : '#fff',
            borderColor: item.type === 'start' ? '#c3e6cb' : 
                         item.type === 'end' ? '#f5c6cb' : '#ddd',
            color: item.type === 'start' ? '#155724' : 
                   item.type === 'end' ? '#721c24' : '#333',
          }}
        >
          {item.label}
        </div>
      ))}
      <div style={{ marginTop: 'auto', padding: '10px', fontSize: '12px', color: '#888' }}>
        拖拽节点到右侧画布
      </div>
    </div>
  );
}; 