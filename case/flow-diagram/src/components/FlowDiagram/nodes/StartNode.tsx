import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const StartNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="start-node" style={{
      padding: '10px',
      borderRadius: '50%',
      border: '1px solid #1a192b',
      backgroundColor: '#baffc9',
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div>
        <strong>{data.label || '开始'}</strong>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}; 