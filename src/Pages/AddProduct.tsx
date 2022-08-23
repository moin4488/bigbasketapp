import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, fs, storage } from "../Firebase/config";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<any>(null);
  const [nickName, setNickName] = useState("");
  const [category, setCategory] = useState("");

  const [imageError, setImageError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data?.email);

      if (!data) {
        navigate("/");
      }
    });
  }, []);

  const handleAddProducts = (evt) => {
    evt.preventDefault();
    console.log(title, description, price, category, image.name);
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        // getDownloadURL(snapshot)
        console.log("uploaded");
        getDownloadURL(imageRef).then((url) => {
          var today = new Date();
          var sToday = (today.getMonth() + 1).toString();
          sToday += today.getDate().toString();
          sToday += today.getHours().toString();
          sToday += today.getMinutes().toString();
          sToday += today.getSeconds().toString();
          addDoc(collection(fs, "Products"), {
            id: Number(sToday),
            name: title,
            desc: description,
            nickname: nickName,
            price: Number(price),
            category: category,
            imgUrl: url,
          })
            .then(() => {
              setSuccessMsg("Product added successfully");
              setTitle("");
              setDescription("");
              setPrice("");
              setCategory("");
              setNickName("");
              (document.getElementById('file') as HTMLInputElement).value = '';
              setTimeout(() => {
                setSuccessMsg("");
              }, 3000);
            })
            .catch((error) => {
              setUploadError(error);
            });
        });
      })
      .catch((error) => {
        setUploadError(error);
      });
  };
  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h3>Add Products</h3>
      <hr></hr>
      {successMsg && (
        <>
          <h2 className="bg-success text-center">{successMsg}</h2>
          <br></br>
        </>
      )}
      <form
        autoComplete="off"
        className="form-group"
        onSubmit={handleAddProducts}
      >
        <label>Product Title</label>
        <input
          type="text"
          className="form-control"
          required
          pattern="[a-zA-Z\-]+"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <br></br>
        <label>Product Description</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <br></br>
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
        <br></br>
        <label>Product Nickname</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setNickName(e.target.value)}
          value={nickName}
        ></input>
        <br></br>
        <label htmlFor="category">Category: </label>

        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="fruits">Fruits & vegetable</option>
          <option value="beverages">Beverages</option>
          <option value="foodgrains">Foodgrains</option>
          <option value="snacks">Snacks</option>
        </select>
        <br></br>
        <br></br>
        <label>Upload Product Image</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={(e) => setImage(e.target.files![0])}
        ></input>

        {imageError && (
          <>
            <br></br>
            <div className="error-msg">{imageError}</div>
          </>
        )}
        <br></br>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-success btn-md">
            SUBMIT
          </button>
        </div>
      </form>
      {uploadError && (
        <>
          <br></br>
          <h2 className="bg-danger text-center">{uploadError}</h2>
        </>
      )}
    </div>
  );
};

export default AddProduct;
