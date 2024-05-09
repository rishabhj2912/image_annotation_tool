import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function ImageUpload({ token }) {
    const [files, setFiles] = useState([]);
    const [label, setLabel] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [useCustomLabel, setUseCustomLabel] = useState(false);

    const predefinedLabels = ['None', 'Dog', 'Human', 'Airplane', 'House',  'Other']; // Example labels

    const onDrop = (acceptedFiles) => {
        setFiles(currentFiles => [...currentFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleFileChange = (event) => {
        setFiles(currentFiles => [...currentFiles, ...Array.from(event.target.files)]);
    };

    const handleLabelChange = (event) => {
        const selectedLabel = event.target.value;
        setLabel(selectedLabel);
        setUseCustomLabel(selectedLabel === 'Other');
        if (selectedLabel !== 'Other') {
            setCustomLabel(''); // Clear custom label if not using 'Other'
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        files.forEach(file => {
            formData.append('image_files', file);
        });
        formData.append('label', useCustomLabel ? customLabel : label);

        try {
            await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Images uploaded successfully!');
            setFiles([]); // Clear the files after upload
            setLabel(''); // Clear the label input
            setCustomLabel(''); // Clear the custom label input
        } catch (error) {
            alert('Upload failed!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "20px" }}>
            <div {...getRootProps()} style={{ border: "1px dashed #ccc", padding: "20px", marginBottom: "20px" }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to add files</p>
                <ul>
                    {files.map(file => (
                        <li key={file.path}>{file.path} - {file.size} bytes</li>
                    ))}
                </ul>
            </div>
            <div>
                <input type="file" multiple onChange={handleFileChange} />
            </div>
            <select value={label} onChange={handleLabelChange}>
                {predefinedLabels.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {useCustomLabel && (
                <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="Enter custom label"
                />
            )}
            <button type="submit">Upload</button>
        </form>
    );
}

export default ImageUpload;
