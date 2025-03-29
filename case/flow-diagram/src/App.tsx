import React from 'react';
import { FlowDiagramEditor } from './components/FlowDiagram/FlowDiagramEditor';

function App() {
  return (
    <div className="app">
      <h1>BPMN流程图设计器</h1>
      <div style={{ width: '100vw', height: '80vh' }}>
        <FlowDiagramEditor />
      </div>
    </div>
  );
}

export default App; 