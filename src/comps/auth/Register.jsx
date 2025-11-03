import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
    const { createUser, updateUserProfile, continueWithGoogle, setLoading } = useContext(AuthContext);
    const [ error, setError ]  = useState('');
    function handleSubmit(e){
        e.preventDefault();
        const displayName = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const photoURL = e.target.photoURL.value.trim();
        const password = e.target.password.value.trim();
        setError('');
        if(password.length < 6){
            setError('Password should be atleast 6 characters!');
            return;
        }
        createUser(email, password)
            .then(() => {
                updateUserProfile({displayName, photoURL});
                toast.success('Welcome');
                const newUser = { name: displayName, email: email, image: photoURL }
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.insertedId){
                            console.log('user is added to db');
                        }
                    })
                    .catch(error => console.log(error.message));
                e.target.reset();
            })
            .catch(error => {
                setError(error.code);
                setLoading(false);
            });
    }
    function handleGoogleAuth(){
        continueWithGoogle()
            .then(() => toast.success('succes'))
            .catch(error => toast.warning(error.code));
    }
    return (
        <section className="hero py-10">
            <div className="hero-content flex-col lg:flex-row-reverse md:w-md">
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <div className="card-body md:p-10 w-full">
                        <h2 className="text-3xl text-center">Register</h2>
                        <p className="text-center">
                            Already an account? <Link to='/login' className="text-primary">Login Now</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" className="input w-full" placeholder="Full Name" name='name' required />
                                <label className="label">Email</label>
                                <input type="email" className="input w-full" placeholder="Email" name='email' required />
                                <label className="label">Photo URL</label>
                                <input type="url" className="input w-full" placeholder="Valid URL" name='photoURL' required />
                                <label className="label">Password</label>
                                <input type="password" className="input w-full" placeholder="Password" name='password' required />
                                {
                                    error && <p className="mt-2 text-base text-center text-red-500">{error}</p>
                                }
                                <button className="btn btn-neutral mt-4" type="submit">Register</button>
                                <p className="text-center my-2">Or</p>
                                <button className="btn bg-white text-black border-[#e5e5e5]" type="button" onClick={handleGoogleAuth}>
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Continue with Google
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}