import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const EndNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="end-node" style={{
      padding: '10px',
      borderRadius: '50%',
      border: '1px solid #1a192b',
      backgroundColor: '#ffbaba',
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label || '结束'}</strong>
      </div>
    </div>
  );
}; 