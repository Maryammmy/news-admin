import React, { useEffect, useState } from 'react';
import { db, storage } from '../../Firebase/Firebase'; // Import Firebase storage module
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { useFormik } from 'formik';
import * as yup from 'yup';
import upload from '../../Assets/Images/user-svgrepo-com 1(1).svg';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loading from '../Loading/Loading';
import LoadingImg from '../LoadingImg/LoadingImg';
import Modal from 'react-modal';


const CreateArticle = () => {
  const [img, setImg] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [item, setItem] = useState('عام');
  const [showTextarea, setShowTextarea] = useState(true);
  const [showYoutubeUrl, setShowYoutubeUrl] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [categoryId, setCategoryId] = useState(1)
  const [showModal, setShowModal] = useState('')

  const handleImageChange = async (event) => {
    const selectedImages = event.target.files;

    // Check if any image is selected
    if (!selectedImages || selectedImages.length === 0) {
      setImageError('Image is required');
      return;
    }

    // Check if all selected files are images
    const isValidImages = Array.from(selectedImages).every((image) =>
      ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'].includes(image.type)
    );

    // If not all selected files are images, set error and return
    if (!isValidImages) {
      setImageError('Invalid file format.');
      return;
    }

    // If everything is valid, proceed with uploading
    setImg(Array.from(selectedImages));
    setLoading(true);
    setImageError(''); // Clear previous error message
    try {
      const uploadedImageUrls = await Promise.all(
        Array.from(selectedImages).map(async (image) => {
          const fileName = v4();
          const finalFileName = fileName.endsWith('.jpg') ? fileName : `${fileName}.jpg`;
          const imgRef = ref(storage, `images/${finalFileName}`);
          await uploadBytes(imgRef, image);
          const url = await getDownloadURL(imgRef);
          setLoading(false)
          return url;
        })
      );
      setImgUrl(uploadedImageUrls);
    } catch (error) {
      console.error("Error uploading images: ", error);
      setImageError('Failed to upload image(s).');
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    setItem(e.target.value);
    if (e.target.value === "مالتي ميديا") {
      setShowTextarea(false);
      setShowYoutubeUrl(true);
    } else {
      setShowTextarea(true);
      setShowYoutubeUrl(false);
    }
    switch (e.target.value) {
      case "عام":
        setCategoryId(1)
        break;
      case "السيارات":
        setCategoryId(2)
        break;
      case "صناعة و تجارة":
        setCategoryId(3)
        break;
      case "عقارات":
        setCategoryId(4)
        break;
      case "مالتي ميديا":
        setCategoryId(5)
        break;
      case "خدمات":
        setCategoryId(6)
        break;
      default:
        setCategoryId(1)
        break;
    }

  };
  const closeModal = () => {
    if (!loading) {
      setShowModal(false);
    }
  };

  const addArticleToFirestore = async (articleData) => {
    try {
      setBtnLoading(true);
  
      if (imgUrl.length > 0) {
        const articleWithImageUrlsAndCategoryId = {
          ...articleData,
          // images: imgUrl,
          categoryName: item,
          categoryId: categoryId
        };
  
        const docRef = await addDoc(collection(db, "Artciles"), articleWithImageUrlsAndCategoryId);
        console.log("Document written with ID: ", docRef.id);
  
        // Add firebaseId directly to the articleData object
        articleWithImageUrlsAndCategoryId.firebaseId = docRef.id;
  
        console.log("Article with firebaseId:", articleWithImageUrlsAndCategoryId);
        
        // Update the document with the articleData object including the firebaseId
        await updateDoc(docRef, articleWithImageUrlsAndCategoryId);
      }
  
      setBtnLoading(false);
      window.history.go(-1); 
    } catch (error) {
      console.error("Error adding document: ", error);
      setBtnLoading(false);
    }
  };
  
  useEffect(() => {
    if (imgUrl.length > 0) {
      article.setFieldValue("images", imgUrl);
    }
  }, [imgUrl]);
  function validation() {
    let schema = yup.object().shape({
      date: yup.date().required('Date is required'),
      title: yup.string().required('Title is required'),
      images: yup.mixed().required('Image is required')
    });

    if (showYoutubeUrl) {
      schema = schema.shape({
        youtubeUrl: yup.string().url('Invalid URL format for Youtube').required('Youtube URL is required'),
      });
    }
    else {
      schema = schema.shape({
        description: yup.string().required('Description is required'),
      });
    }
    return schema;
  }

  const article = useFormik({
    initialValues: {
      title: '',
      date: today,
      description: '',
      youtubeUrl: '',
      images:null
     
    },
    validationSchema: validation,
    onSubmit: (values) => addArticleToFirestore(values)
  });

  return (
    <>
      <div className='pe-lg-5'>
        <form onSubmit={article.handleSubmit} className='py-3'>
          <div className='' >
          <div className='my-2'>
              <label htmlFor="ImageUpload">

                {imgUrl ? (
                  <div className='div-img' style={{ overflow: 'hidden' }}><img src={imgUrl[0]} alt="Profile" className="uploaded-image" />
                  </div>) : (
                  <div className='div-img'>
                    <div className='placeholder-icon'> <i className="fa-solid fa-plus bg-i" ></i>
                    </div>
                  </div>

                )}


              </label>
              <input
                id="ImageUpload"
                type="file"
                accept='image/*'
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
                {article.touched.images && article.errors.images && (
              <div className='alert alert-danger form-control w-input'>{article.errors.images}</div>)}
              {imageError && <div className="alert alert-danger form-control w-input">{imageError}</div>}
            </div>
            <select
              name="categoryName"
              value={item}
              onChange={handleSelectChange}
              className='my-2 form-control w-input'
            >
              <option value="عام">عام</option>
              <option value="السيارات">السيارات</option>
              <option value="صناعة و تجارة">صناعة و تجارة</option>
              <option value="عقارات">عقارات</option>
              <option value="مالتي ميديا">مالتي ميديا</option>
              <option value="خدمات">خدمات</option>
            </select>
            <input
              type="date"
              name="date"
              value={article.values.date}
              onChange={article.handleChange}
              onBlur={article.handleBlur}
              placeholder="Date"
              className='form-control  my-2 w-input'
            />

            {article.touched.date && article.errors.date && (
              <div className='alert alert-danger form-control w-input '>{article.errors.date}</div>
            )}
            <input
              type="text"
              name="title"
              value={article.values.title}
              onChange={article.handleChange}
              placeholder="عنوان"
              className='form-control my-2 w-input'
            />
            {article.touched.title && article.errors.title && (
              <div className='alert alert-danger form-control w-input'>{article.errors.title}</div>
            )}
            {showTextarea ? <textarea
              name="description"
              cols="30"
              rows="10"
              value={article.values.description}
              onChange={article.handleChange}

              placeholder="مقال..."
              className='form-control my-2 w-input'
            /> : ''}

            {article.touched.description && article.errors.description && (
              <div className='alert alert-danger form-control w-input'>{article.errors.description}</div>
            )}




            {showYoutubeUrl ? <input
              type="text"
              name="youtubeUrl"
              value={article.values.youtubeUrl}
              onChange={article.handleChange}

              placeholder="Youtube URL"
              className='form-control my-2 w-input'
            /> : ''}

            {article.touched.youtubeUrl && article.errors.youtubeUrl && (
              <div className='alert alert-danger form-control w-input'>{article.errors.youtubeUrl}</div>
            )}

            <button className='my-2 main-bg btn  text-white fw-bolder but' type="submit" >{btnloading ? <Loading /> : 'إنشاء مقال'}</button> {/* Disable submit button during upload */}
          </div>
        </form>
      </div>
      <Modal
        isOpen={loading}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
          },
          content: {
            backgroundColor: 'rgba(250, 250, 250, 1)', // red background
            border: '1px solid #ccc', // border
            borderRadius: '8px', // border radius
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // shadow
            width: '200px', // max width
            margin: 'auto', // center horizontally
            padding: '20px',
            height: '150px',// padding
            // display: 'flex',
            // flexDirection: 'column',
          },

        }}
      >
        <div className='text-center'><LoadingImg /></div>


      </Modal>
    </>

  );
};

export default CreateArticle;



