import React from 'react';

const NewContact = () => {
  return (
    <section className="py-20 text-brand-light">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4">Contact</h2>
        <p className="text-brand-gray mb-12">Like what you see? Get in touch to learn more.</p>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 text-left">
          {/* Left Side: Form */}
          <form className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full bg-transparent border border-brand-border p-3 focus:outline-none focus:border-brand-accent"/>
              <input type="text" placeholder="Last Name" className="w-full bg-transparent border border-brand-border p-3 focus:outline-none focus:border-brand-accent"/>
            </div>
            <input type="email" placeholder="Email *" required className="w-full bg-transparent border border-brand-border p-3 focus:outline-none focus:border-brand-accent"/>
          </form>

          {/* Right Side: Message & Button */}
          <div className="flex-1 flex flex-col">
            <textarea placeholder="Message" className="w-full bg-transparent border border-brand-border p-3 flex-grow focus:outline-none focus:border-brand-accent"></textarea>
            <button className="bg-brand-accent text-brand-light font-bold py-3 px-8 rounded-lg mt-4 self-end hover:opacity-80 transition-opacity">
              Send
            </button>
          </div>
        </div>
        
        {/* Address Info */}
        <div className="mt-16 text-left max-w-4xl mx-auto">
          <h4 className="font-bold text-lg">UAE Headquarter</h4>
          <p className="text-brand-gray">XCODING Solutions FZ-LLC</p>
          <p className="text-brand-gray">HD25A, First Floor, In5 Tech, Dubai Internet City</p>
          <p className="text-brand-gray">info@xcoding.ai</p>
        </div>
      </div>
    </section>
  );
};

export default NewContact;