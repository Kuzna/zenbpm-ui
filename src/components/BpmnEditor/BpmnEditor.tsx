import { useRef, useImperativeHandle, forwardRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';

import type { BpmnEditorProps, BpmnEditorRef } from './types';
import { useBpmnEditor } from './hooks';
import {
  getContainerStyles,
  canvasContainerStyles,
  overlayStyles,
  canvasStyles,
  propertiesPanelStyles,
} from './styles';

export type { BpmnEditorProps, BpmnEditorRef };

export const BpmnEditor = forwardRef<BpmnEditorRef, BpmnEditorProps>(
  ({ initialXml, onChange, height = '100%' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const propertiesPanelRef = useRef<HTMLDivElement>(null);

    const { loading, error, getXml, importXml, createNew, updateZenFormProperty } = useBpmnEditor({
      containerRef,
      propertiesPanelRef,
      initialXml,
      onChange,
    });

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getXml,
        importXml,
        createNew,
        updateZenFormProperty,
      }),
      [getXml, importXml, createNew, updateZenFormProperty]
    );

    return (
      <Box sx={getContainerStyles(height)}>
        {/* Canvas container */}
        <Box sx={canvasContainerStyles}>
          {loading && (
            <Box sx={overlayStyles}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Box sx={{ ...overlayStyles, color: 'error.main' }}>
              {error}
            </Box>
          )}
          <Box ref={containerRef} sx={canvasStyles} />
        </Box>

        {/* Properties Panel */}
        <Box ref={propertiesPanelRef} sx={propertiesPanelStyles} />
      </Box>
    );
  }
);

BpmnEditor.displayName = 'BpmnEditor';
