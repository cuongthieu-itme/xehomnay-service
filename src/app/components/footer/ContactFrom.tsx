export default function ContactFrom() {
  return (
    <form className="mt-4 space-y-4">
      <div className="grid w-full  items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Name <span className="text-red-600">*</span>
        </label>
        <input
          className="flex h-10 w-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded"
          type="text"
          id="name"
          placeholder="Name"
          required
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Email <span className="text-red-600">*</span>
        </label>
        <input
          className="flex h-10 w-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded"
          type="email"
          id="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="message"
        >
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          className="flex h-20 w-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded"
          id="message"
          placeholder="Leave us a message"
          cols={30}
          rows={10}
          required
        ></textarea>
      </div>
      <button
        type="button"
        className="w-full rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-600 focus:ring-offset"
      >
        Send Message
      </button>
    </form>
  );
}
