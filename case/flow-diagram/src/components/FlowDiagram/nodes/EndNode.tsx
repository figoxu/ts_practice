import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps, useUpdateNodeInternals } from 'reactflow';

export const EndNode: React.FC<NodeProps> = ({ data, selected, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nodeText, setNodeText] = useState(data.label || '结束');
  const [nodeSize, setNodeSize] = useState(100);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textMeasureRef = useRef<HTMLDivElement>(null);
  const updateNodeInternals = useUpdateNodeInternals();
  
  // 测量文本尺寸的函数
  const measureText = (text: string) => {
    if (textMeasureRef.current) {
      textMeasureRef.current.innerText = text || '结束';
      const { width, height } = textMeasureRef.current.getBoundingClientRect();
      // 取宽高中较大的值，保证圆形节点能容纳文本
      const maxDimension = Math.max(width, height);
      return Math.max(100, maxDimension + 40); // 最小尺寸为100，加上一些内边距
    }
    return 100;
  };
  
  // 监听节点文本变化，更新数据和节点大小
  useEffect(() => {
    if (data.label !== nodeText && !isEditing) {
      data.label = nodeText;
      
      // 测量并更新节点大小
      const size = measureText(nodeText);
      setNodeSize(size);
      
      // 通知 ReactFlow 更新节点大小
      updateNodeInternals(id);
    }
  }, [nodeText, data, isEditing, id, updateNodeInternals]);

  // 自动聚焦输入框
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  // 初始化时测量并设置节点大小
  useEffect(() => {
    const size = measureText(nodeText);
    setNodeSize(size);
    updateNodeInternals(id);
  }, [nodeText, id, updateNodeInternals]);

  // 处理双击事件
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // 处理编辑完成
  const handleEditComplete = () => {
    setIsEditing(false);
    
    // 更新节点大小
    const size = measureText(nodeText);
    setNodeSize(size);
    updateNodeInternals(id);
  };

  // 处理文本变化
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNodeText(e.target.value);
  };

  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditComplete();
    }
    if (e.key === 'Escape') {
      handleEditComplete();
    }
  };

  return (
    <>
      {/* 用于测量文本大小的隐藏元素 */}
      <div 
        ref={textMeasureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxWidth: '200px',
          padding: '5px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'bold',
        }}
      />
      
      <div 
        className="end-node" 
        onDoubleClick={handleDoubleClick}
        style={{
          padding: '10px',
          borderRadius: '50%',
          border: `1px solid ${selected ? '#6366F1' : '#1a192b'}`,
          boxShadow: selected ? '0 0 0 2px #6366F1' : 'none',
          backgroundColor: '#ffbaba',
          width: `${nodeSize}px`,
          height: `${nodeSize}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        <Handle type="target" position={Position.Top} />
        <div style={{ maxWidth: `${nodeSize - 20}px` }}>
          {isEditing ? (
            <textarea
              ref={inputRef}
              value={nodeText}
              onChange={handleTextChange}
              onBlur={handleEditComplete}
              onKeyDown={handleKeyDown}
              style={{
                width: `${nodeSize * 0.7}px`,
                maxHeight: `${nodeSize * 0.7}px`,
                border: 'none',
                background: 'transparent',
                resize: 'none',
                outline: 'none',
                textAlign: 'center',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
              autoFocus
            />
          ) : (
            <strong style={{ 
              wordBreak: 'break-word', 
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              display: 'block'
            }}>
              {nodeText}
            </strong>
          )}
        </div>
      </div>
    </>
  );
};