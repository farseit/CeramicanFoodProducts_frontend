import { Rating } from "@mui/material";
import UserReview from "@/components/UserReview/UserReview";
import ProductActionButton from "@/components/Product/ProductInfo/ProductActionButton";
import ImageGallery from "@/components/ProductImageGallery/ImageGallery";
import { fetchProductById, fetchAllProductIds } from "@/lib/FetchProduct";

// Utility function to strip HTML tags
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

export async function generateStaticParams() {
  try {
    const products = await fetchAllProductIds();

    if (!products || products.length === 0) {
      // Return default dummy ID to avoid build error
      return [{ id: "default" }];
    }

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Fallback default ID
    return [{ id: "default" }];
  }
}

// export async function generateStaticParams() {
//   try {
//     const products = await fetchAllProductIds();

//     return products.map((product) => ({
//       id: product.id,
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

const ProductInfo = async ({ params }) => {
  const { id } = params;
  console.log("Product ID:", id);

  let product = null;
  try {
    product = await fetchProductById(id);
    console.log("Fetched product:", product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 py-10">
        Product not found or still loading...
      </div>
    );
  }

  const discountedPrice = product.price - product.price * (45 / 100);

  return (
    <div className="bg-white mb-28 lg:mb-6 h-fit">
      <div className="mx-auto max-w-screen-xl px-4 flex flex-col gap-3">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery
            image={product?.ImagePath?.[0] ?? ""}
            productName={product?.name ?? ""}
            images={product?.images ?? []}
          />

          {/* Details Panel */}
          <div className="md:py-8 space-y-4">
            <div className="mb-2 md:mb-3">
              <h2 className="text-xl font-bold text-[rgba(0,0,0,0.8)] lg:text-3xl">
                {product.name}
              </h2>
              <span className="mb-0.5 inline-block text-gray-500">
                {product.category}
              </span>
            </div>

            <div className="mb-4 space-y-3">
              <div className="flex flex-col lg:flex-row items-start gap-3 lg:items-center justify-between">
                <div className="flex flex-col">
                  {/* Ratings can be added here */}
                </div>
                <div className="flex items-center">
                  <p>Availability</p>
                  <p className="bg-[#192a56] px-3 ms-3 text-white rounded-full font-medium">
                    In Stock
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ৳{product.price}
                </span>
              </div>

              {/* <span className="text-sm text-gray-500">
                {stripHtml(product.desc)}
              </span> */}
            </div>

            <ProductActionButton product={product} />

            {/* Product Description */}
            <div className="mt-12 text-base text-gray-500 tracking-wide">
              {stripHtml(product.desc)}
            </div>
          </div>
        </div>

        <UserReview productId={product.id} />
      </div>
    </div>
  );
};

export default ProductInfo;

// import { fetchProductById, fetchAllProductIds } from "@/lib/FetchProduct";

// export async function generateStaticParams() {
//   const products = await fetchAllProductIds();
//   console.log("product", products);

//   return products.map((product) => ({
//     id: product.id, // already string
//   }));
// }

// const ProductInfo = async (props) => {
//   const { id } = props.params;

//   const product = await fetchProductById(id);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="bg-white mb-28 lg:mb-6 h-fit">
//       <div className="mx-auto max-w-screen-xl px-4 md:px-4 flex flex-col gap-3">
//         <div className="grid gap-8 md:grid-cols-2">
//           <div className="md:py-8 space-y-4">
//             <div className="mb-2 md:mb-3">
//               <h2 className="text-xl font-bold text-[rgba(0,0,0,0.8)] lg:text-3xl">
//                 {product.name}
//               </h2>
//               <span className="mb-0.5 inline-block text-gray-500">
//                 {product.category}
//               </span>
//             </div>

//             <div className="mb-4 space-y-3">
//               <div className="flex flex-col lg:flex-row items-start gap-3 lg:items-center justify-between ">
//                 <div className="flex items-center">
//                   <p>Availability sfsfs </p>
//                   <p className="bg-[#192a56] px-3 ms-3 text-white rounded-full font-medium">
//                     In Stock
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <span className="text-xl font-bold text-gray-800 md:text-2xl">
//                   ৳{product.price}
//                 </span>
//               </div>

//               <span className="text-sm text-gray-500">{product.desc}</span>
//             </div>

//             <div className="mt-12 text-base text-gray-500 tracking-wide" />
//             {product.desc}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;
