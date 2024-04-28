import React, { useContext, useEffect, useState } from 'react';
import { db,storage } from '../../Firebase/Firebase'; // Import Firebase storage module
import { useFormik } from 'formik';
import * as yup from 'yup';
import upload from '../../Assets/Images/user-svgrepo-com 1(1).svg';
import { v4 } from 'uuid';
// import { getDownloadURL, ref, uploadBytes, collection, doc, updateDoc } from 'firebase/storage';
import Loading from '../Loading/Loading';
import LoadingImg from '../LoadingImg/LoadingImg';
import Modal from 'react-modal';
import { storecontext } from '../Context/Context';
import {  collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const UpdateArticle = () => {
  
  const { selected } = useContext(storecontext);
  const [img, setImg] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [item, setItem] = useState(selected.categoryName);
  const [showTextarea, setShowTextarea] = useState(true);
  const [showYoutubeUrl, setShowYoutubeUrl] = useState(true);
  const today = new Date().toISOString().split('T')[0];
  const [categoryId, setCategoryId] = useState(selected.categoryId)
  const [showModal,setShowModal]=useState('')
console.log('url',showYoutubeUrl)
  const handleProfileImageChange = async (event) => {
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
   
    if (e.target.value == "مالتي ميديا") {
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
    // article.setFieldValue("categoryName", item);
    //   article.setFieldValue("categoryId", categoryId);
  };
  const closeModal = () => {
    if (!loading) {
      setShowModal(false);
    }
  };
  
  const updateArticleInFirestore = async (updatedArticleData) => {
    try {
      setBtnLoading(true);
      const articleRef = doc(db, "Artciles", selected.firebaseId);
      await updateDoc(articleRef, updatedArticleData);
      setBtnLoading(false);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
      setBtnLoading(false);
    }
  };

  function validation() {
    let schema = yup.object().shape({
      date: yup.date().required('Date is required'),
      title: yup.string().required('Title is required'),
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
    // if (showTextarea) {

    // }


    return schema;
  }

  const article = useFormik({
    initialValues: {
      title:selected.title,
      date: today,
      description: selected.description ,
      youtubeUrl: selected.youtubeUrl,
      images:[selected.images[0]],
      categoryId:categoryId,
      categoryName:item,
      firebaseId:selected.firebaseId, 
    },
    validationSchema: validation,
    onSubmit: (values) =>updateArticleInFirestore(values)
  });
  useEffect(()=>{
    if(item === "مالتي ميديا"){
      setShowTextarea(false);
      setShowYoutubeUrl(true);
    }
      else {
        setShowTextarea(true);
        setShowYoutubeUrl(false);
      }
    },[])
    useEffect(() => {
      // Check if imgUrl is not empty before setting it to article values
      if (imgUrl.length > 0) {
        article.setFieldValue("images", imgUrl);
      }
    }, [imgUrl]);
    
    useEffect(() => {
      // Set article values after categoryId is updated
      article.setFieldValue("categoryName", item);
      article.setFieldValue("categoryId", categoryId);
    }, [item, categoryId]);
    
  return (
    <>
    <div className='padding' >
      <form onSubmit={article.handleSubmit} className=' py-3'>
        <div  className=''>
     


          <div className='my-2'>
            <label htmlFor="profileImageUpload">

              {imgUrl ? (
                <div className='div-img' style={{ overflow: 'hidden' }}><img src={imgUrl[0]} alt="Profile" className="uploaded-image" />
                </div>) : (
                <div className='div-img'>
                 <img src={selected?.images?.[0]} alt="Profile" className="uploaded-image" />
                 </div>

              )}


            </label>
            <input
              id="profileImageUpload"
              type="file"
              accept='image/*'
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
          
            />
            {imageError && <div className="alert alert-danger form-control w-25">{imageError}</div>}
          </div>
          <select
            name="categoryName"
           value={article.values.categoryName}
            onChange={handleSelectChange}
            className='my-2 form-control w-50'
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
            className='form-control w-50 my-2'
          />

          {article.touched.date && article.errors.date && (
            <div className='alert alert-danger form-control w-25'>{article.errors.date}</div>
          )}
          <input
            type="text"
            name="title"
            value={article.values.title}
            onChange={article.handleChange}

            placeholder="عنوان"
            className='form-control w-50 my-2'
          />
          {article.touched.title && article.errors.title && (
            <div className='alert alert-danger form-control w-25'>{article.errors.title}</div>
          )}
          {showTextarea ? <textarea
            name="description"
            cols="30"
            rows="10"
            value={article.values.description}
            onChange={article.handleChange}
            placeholder="مقال..."
            className='form-control w-50 my-2'
          /> : ''}

          {article.touched.description && article.errors.description && (
            <div className='alert alert-danger form-control w-25'>{article.errors.description}</div>
          )}




          {showYoutubeUrl  ? <input
            type="text"
            name="youtubeUrl"
            value={article.values.youtubeUrl}
            onChange={article.handleChange}

            placeholder="Youtube URL"
            className='form-control w-50 my-2'
          /> : ''}

          {article.touched.youtubeUrl && article.errors.youtubeUrl && (
            <div className='alert alert-danger form-control w-25'>{article.errors.youtubeUrl}</div>
          )}

          <button className='my-2 btn main-bg text-white fw-bolder butt' type="submit" >{btnloading ? <Loading /> : 'تعديل مقال'}</button> {/* Disable submit button during upload */}
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
        height:'150px' ,// padding
        // display: 'flex',
        // flexDirection: 'column',
      },
  
    }}
  >
    <div className='text-center'><LoadingImg/></div>
  
    
</Modal> 
</> 

  );
};

export default UpdateArticle;
