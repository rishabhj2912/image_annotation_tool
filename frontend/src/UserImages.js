import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserImages({ token }) {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchImages();
    }, [token, searchTerm]);  // Re-fetch when searchTerm or token changes

    const fetchImages = async () => {
        const url = searchTerm ? `http://localhost:8000/api/user-images/?search=${searchTerm}` : `http://localhost:8000/api/user-images/`;
        const response = await axios.get(url, {
            headers: { 'Authorization': `Token ${token}` }
        });
        setImages(response.data);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (imageId) => {
        try {
            await axios.delete(`http://localhost:8000/api/delete-image/${imageId}/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            fetchImages();  // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image');
        }
    };

    const handleUpdateLabel = async (imageId) => {
        const newLabel = prompt('Enter new label:');
        if (newLabel !== null && newLabel !== "") {
            try {
                await axios.patch(`http://localhost:8000/api/update-image-label/${imageId}/`, { label: newLabel }, {
                    headers: { 'Authorization': `Token ${token}` }
                });
                fetchImages();  // Refresh the list after update
            } catch (error) {
                console.error('Error updating label:', error);
                alert('Failed to update label');
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by label..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="image-container">
                {images.length > 0 ? (
                    images.map((image) => (
                        <div key={image.id} className="image-box">
                            <img src={`http://localhost:8000${image.image_file}`} alt={image.label || "No Label"} style={{ width: '100px', height: '100px' }} />
                            <p>Label: {image.label || "Pending"}</p>
                            <button onClick={() => handleDelete(image.id)}>Delete</button>
                            <button onClick={() => handleUpdateLabel(image.id)}>Update Label</button>
                        </div>
                    ))
                ) : (
                    <p>No images found</p>
                )}
            </div>
        </div>
    );
}

export default UserImages;
