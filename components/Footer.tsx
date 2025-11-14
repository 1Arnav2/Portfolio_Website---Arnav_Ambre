
import React from 'react';

const socialLinks = [
  { name: 'LinkedIn', href: '#' },
  { name: 'Medium', href: '#' },
  { name: 'GitHub', href: '#' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-800 pb-6">
          <div>
            <h2 className="text-5xl font-bold">Arnav Ambre</h2>
          </div>
          <div className="flex md:justify-end">
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xl text-gray-300 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-4 flex justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Arnav Ambre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
