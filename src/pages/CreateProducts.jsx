import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function CreateProducts() {
    const { currentUser } = useContext(AuthContext);
    const axiosInstace = useAxiosSecure();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const price_min = form.price_min.value;
        const price_max = form.price_max.value;
        const email = currentUser.email;
        const category = form.category.value;
        const status = form.status.value;
        const location = form.location.value;
        const condition = form.condition.value;
        const usage = form.usage.value;
        const seller_name = currentUser.displayName;
        const seller_contact = form.seller_contact.value;
        const description = form.description.value;
        const image = form.image.value;
        const seller_image = currentUser.photoURL;
        const productData = {
            title,
            price_min,
            price_max,
            email,
            category,
            status,
            location,
            condition,
            usage,
            seller_name,
            seller_contact,
            description,
            image,
            seller_image,
        };

        // using axios instance (secure)
        axiosInstace.post('/products', productData)
          .then(data => console.log(data))
          .catch(err => console.log(err));

        // console.log(productData);
        // axios.post('http://localhost:3000/products', productData)
        //   .then(data => {
        //     if(data.data.insertedId){
        //         console.log('product is added');
        //     } else{
        //         console.log('product is not added');
        //     }
        //   })
        //   .catch(error => console.log(error));
    };
    return (
        <section className="hero bg-base-200 min-h-[70vh]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Create a Product</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut <br /> assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Title */}
                                <div className="col-span-2">
                                    <label className="label">Title</label>
                                    <input type="text" name="title" className="input" placeholder="Samsung 32-inch Monitor" />
                                </div>

                                {/* Price Min */}
                                <div>
                                    <label className="label">Price Min</label>
                                    <input type="number" name="price_min" className="input" placeholder="150" />
                                </div>

                                {/* Price Max */}
                                <div>
                                    <label className="label">Price Max</label>
                                    <input type="number" name="price_max" className="input" placeholder="200" />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="label">Category</label>
                                    <input type="text" name="category" className="input" placeholder="Electronics" />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="label">Status</label>
                                    <select name="status" className="select select-bordered w-full">
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="label">Location</label>
                                    <input type="text" name="location" className="input" placeholder="Rajshahi" />
                                </div>

                                {/* Condition */}
                                <div>
                                    <label className="label">Condition</label>
                                    <input type="text" name="condition" className="input" placeholder="Fresh" />
                                </div>

                                {/* Usage */}
                                <div>
                                    <label className="label">Usage</label>
                                    <input type="text" name="usage" className="input" placeholder="Unused" />
                                </div>

                                {/* Seller Contact */}
                                <div>
                                    <label className="label">Seller Contact</label>
                                    <input type="text" name="seller_contact" className="input" placeholder="+8801722339900" />
                                </div>

                                {/* Description */}
                                <div className="col-span-2">
                                    <label className="label">Description</label>
                                    <textarea
                                        name="description"
                                        className="textarea textarea-bordered"
                                        placeholder="LED Samsung curved 32'' monitor, completely unused."
                                    ></textarea>
                                </div>

                                {/* Image URLs */}
                                <div className="col-span-2">
                                    <label className="label">Product Image URL</label>
                                    <input type="text" name="image" className="input" placeholder="https://..." />
                                </div>

                                {/* Submit */}
                                <div className="col-span-2 mt-4">
                                    <button type="submit" className="btn btn-neutral w-full">Add Product</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}