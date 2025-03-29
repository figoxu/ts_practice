import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const TaskNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="task-node" style={{
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #1a192b',
      backgroundColor: '#f0f0f0',
      minWidth: '150px',
      textAlign: 'center',
    }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label || '任务'}</strong>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}; 