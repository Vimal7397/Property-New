"use client";


import { useActionState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/addMessage";
import SubmitMessageButton from "@/components/SubimitMessageButton";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success("Message sent successfully!");
  }, [state]);

  if (!session) return null;

  if (state.submitted) {
    return <p className="text-green-500 mb-4">Your Message has been sent</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={formAction}>
        <input type="hidden" name="property" value={property._id} />
        <input type="hidden" name="recipient" value={property.owner} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name" // ✅ added
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email" // ✅ added
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone" // ✅ added
            type="text"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="body"
            name="body" // ✅ added
            placeholder="Enter your message"
          ></textarea>
        </div>

        <div>
          <SubmitMessageButton />
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
