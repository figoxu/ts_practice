import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps, useUpdateNodeInternals } from 'reactflow';

export const TaskNode: React.FC<NodeProps> = ({ data, selected, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nodeText, setNodeText] = useState(data.label || '任务');
  const [nodeWidth, setNodeWidth] = useState(150);
  const [nodeHeight, setNodeHeight] = useState(40);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const textMeasureRef = useRef<HTMLDivElement>(null);
  const updateNodeInternals = useUpdateNodeInternals();
  
  // 测量文本尺寸的函数
  const measureText = (text: string) => {
    if (textMeasureRef.current) {
      textMeasureRef.current.innerText = text || '任务';
      const { width, height } = textMeasureRef.current.getBoundingClientRect();
      // 添加额外的间距
      return { 
        width: Math.max(150, width + 40), 
        height: Math.max(40, height + 30) 
      };
    }
    return { width: 150, height: 40 };
  };
  
  // 监听节点文本变化，更新数据和节点大小
  useEffect(() => {
    if (data.label !== nodeText && !isEditing) {
      data.label = nodeText;
      
      // 测量并更新节点大小
      const { width, height } = measureText(nodeText);
      setNodeWidth(width);
      setNodeHeight(height);
      
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
    const { width, height } = measureText(nodeText);
    setNodeWidth(width);
    setNodeHeight(height);
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  // 处理双击事件
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // 处理编辑完成
  const handleEditComplete = () => {
    setIsEditing(false);
    
    // 更新节点大小
    const { width, height } = measureText(nodeText);
    setNodeWidth(width);
    setNodeHeight(height);
    updateNodeInternals(id);
  };

  // 处理文本变化
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNodeText(e.target.value);
    
    // 实时调整输入框大小
    if (isEditing) {
      const { width, height } = measureText(e.target.value);
      inputRef.current!.style.width = `${width - 30}px`;
      inputRef.current!.style.height = `${height - 20}px`;
    }
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
          maxWidth: '300px',
          padding: '5px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'bold',
        }}
      />
      
      <div 
        className="task-node" 
        ref={nodeRef}
        onDoubleClick={handleDoubleClick}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: `1px solid ${selected ? '#6366F1' : '#1a192b'}`,
          boxShadow: selected ? '0 0 0 2px #6366F1' : 'none',
          backgroundColor: '#f0f0f0',
          width: `${nodeWidth}px`,
          height: `${nodeHeight}px`,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        <Handle type="target" position={Position.Top} />
        <div style={{ width: '100%' }}>
          {isEditing ? (
            <textarea
              ref={inputRef}
              value={nodeText}
              onChange={handleTextChange}
              onBlur={handleEditComplete}
              onKeyDown={handleKeyDown}
              style={{
                width: `${nodeWidth - 30}px`,
                border: 'none',
                background: 'transparent',
                resize: 'none',
                outline: 'none',
                textAlign: 'center',
                minHeight: '1.5em',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'bold',
                overflow: 'hidden',
              }}
              autoFocus
            />
          ) : (
            <strong style={{ 
              wordBreak: 'break-word', 
              whiteSpace: 'pre-wrap',
              display: 'block',
              width: '100%'
            }}>
              {nodeText}
            </strong>
          )}
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
}; 