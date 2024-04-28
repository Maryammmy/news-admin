import React, { useState, useEffect, useContext } from 'react';
import { storecontext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs,deleteDoc } from "firebase/firestore"; // Add these imports
import { db } from '../../Firebase/Firebase';

const Trade = () => {
  const { setSelected } = useContext(storecontext);
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(dateString) {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      localeMatcher: 'best fit',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', options);
  }

  async function fetchDataFromFirestoreByCategory() {
    try {
      // Query the Firestore collection where categoryName is equal to 'عام'
      const querySnapshot = await getDocs(query(collection(db, 'Artciles'), where('categoryName', '==','صناعة و تجارة')));
  
      // Iterate through the documents in the query snapshot
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Document data:", data);
        data.date = formatDate(data.date);
        // Update state with fetched data
        setArticleData(prevState => [...prevState, data]);
      });
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }
  
  
  useEffect(() => {
    fetchDataFromFirestoreByCategory();
  }, []);

  function handleTitleClick(item) {
    setSelected(item);
    navigate('/title');
  }
  const deleteArticleFromFirestore = async (firebaseId) => {
    try {
      const articleRef = doc(db, "Artciles", firebaseId);
      await deleteDoc(articleRef);
      console.log("Document successfully deleted:", firebaseId);
    } catch (error) {
      console.error("Error deleting document:", firebaseId, error);
    }
  };
  function UpdateClick(item) {
    setSelected(item);
    navigate('/updateArticle');
  }
  
  return (
    <div className=' w-60 bg-white my-3 shadow margin'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <h4 className=' px-2 py-2 shadow brdr-top brdr-bottom fw-bolder'>صناعة و تجارة</h4>
        <div className='container-fluid'>
         
         {articleData.map((article, index) => (
           <div key={index} className="row py-3 brdr-bottom ">
             <div className="col-md-4" onClick={()=>{
               handleTitleClick(article)
             }}>
               <div className='w-img'>
                 <img src={article?.images?.[0]} alt={`Image`} />
               </div>
             </div>
             <div className="col-md-7" onClick={()=>{
               handleTitleClick(article)
             }}>
               <h3 className='fw-bolder title '>{article.title}</h3>
              
               <p className='time'>{article.date}</p>
              
             </div>
             <div className='pt-2'>
             <button className='btn color px-0' onClick={()=>{
                 deleteArticleFromFirestore(article.firebaseId)
               }}><i className="fa-solid fa-trash-can"></i> </button>
                <button className='btn color px-4' onClick={() => UpdateClick(article)}><i className="fa-solid fa-pencil"></i></button>
              
             </div>
           </div>
         ))}
       </div>
        </>

      )}
    </div>
  );
};

export default Trade;
