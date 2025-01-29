"use client";
// import React, { use, useEffect } from "react";
import React, { useEffect } from "react";
import SingleProduct from "../../../components/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import {  loadSingleProductRequest } from "@/redux/reducers/productReducer";

export default function ProductDetails({ params }) {
  const slug = params.slug
  const ProductDetails = useSelector((state) => state.product.data);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleProductRequest(slug));
  }, [dispatch, slug]);

  return (
    <div>
      <SingleProduct product={ProductDetails} quantity={quantity} />
    </div>
  );
}
