import  { useState, useEffect } from 'react';
import { Modal, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CreateCategory, EditCategory } from '../../Services/CategoryService';
import './index.css'

const AddCategoryModal = ({ isOpen, onRequestClose, onCategoryAdded, categoryToEdit }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setImage(categoryToEdit.image);
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: categoryToEdit.image,
            }]);
        } else {
            setName('');
            setImage('');
            setFileList([]);
        }
    }, [categoryToEdit]);

    const handleSaveCategory = async () => {
        if (!name) {
            message.error('Name is required.');
            return;
        }

        try {
            if (categoryToEdit) {
                await EditCategory({
                    id: categoryToEdit.id,
                    name: name,
                    images: image,
                });
            } else {
                await CreateCategory({
                    name: name,
                    images: image,
                });
            }
            onRequestClose();
            onCategoryAdded();
        } catch (error) {
            console.error('Error saving category:', error);
            message.error('An error occurred while saving the category.');
        }
    };

    const handleImageChange = (info) => {
        if (info.fileList.length > 0) {
            const file = info.fileList[0].originFileObj;
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFileList([{
                    uid: '-1',
                    name: file.name,
                    status: 'done',
                    url: reader.result,
                }]);
            };
            reader.readAsDataURL(file);
        } else {
            setImage('');
            setFileList([]);
        }
    };

    return (
      <Modal
        open={isOpen}
        title={categoryToEdit ? "Edit Category" : "Add New Category"}
        onCancel={onRequestClose}
        onOk={handleSaveCategory}
        okText={categoryToEdit ? "Save Changes" : "Add Category"}
      >
          <div id='AddCategoryModal'>
              <div>
                  <label>Name:</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div>
                  <label>Image:</label>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleImageChange}
                    showUploadList={{showPreviewIcon: false, showRemoveIcon: true}}
                  >
                      {fileList.length < 1 && <UploadOutlined/>}
                  </Upload>
              </div>
          </div>

      </Modal>
    );
};

export default AddCategoryModal;
