import { collection, getDocs } from "firebase/firestore";
import { fs } from "../Firebase/config";

const getProducts = async (setProducts) => {
  const productArray: any = [];
  const querySnapshot = await getDocs(collection(fs, "Products"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    var data: any = doc.data();
    productArray.push({ ...data });
    setProducts(productArray);
  });
};

export default getProducts;
