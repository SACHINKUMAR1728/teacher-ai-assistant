// src/components/FileUpload.js
import React from 'react';
import { Button } from '@mui/material';

const FileUpload = ({ onFileChange }) => {
  return (
    <Button variant="contained" component="label" sx={{ mt: 2, mr: 2 }}>
      Upload File
      <input
        type="file"
        hidden
        onChange={(e) => onFileChange(e.target.files[0])}
        required
      />
    </Button>
  );
};

export default FileUpload;